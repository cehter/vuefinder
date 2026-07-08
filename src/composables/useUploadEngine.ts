import { computed, ref, type ComputedRef, type Ref } from 'vue';
import Uppy from '@uppy/core';
import { parse } from '../utils/filesize';
import type { AdapterManager } from '../adapters/AdapterManager';
import type { ConfigStore } from '../stores/config';
import type { createFilesStore } from '../stores/files';

type FilesStore = ReturnType<typeof createFilesStore>;

export const QUEUE_ENTRY_STATUS = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10,
} as const;
export type QueueEntryStatus = (typeof QUEUE_ENTRY_STATUS)[keyof typeof QUEUE_ENTRY_STATUS];

export interface QueueEntry {
  id: string;
  name: string;
  size: string;
  status: QueueEntryStatus;
  statusName: string;
  percent: string | null;
  originalFile: File;
}

export interface UploadEngineDeps {
  fs: FilesStore;
  config: ConfigStore;
  adapter: AdapterManager;
  emitter: { emit: (type: string, event?: unknown) => void };
  t: (key: string, params?: any) => string;
  filesize: (size: number) => string;
  customUploader?: (uppy: any, context: { getTargetPath: () => string }) => void;
  debug?: boolean;
}

export interface UploadEngine {
  queue: Ref<QueueEntry[]>;
  message: Ref<string>;
  uploading: Ref<boolean>;
  definitions: Ref<{ QUEUE_ENTRY_STATUS: typeof QUEUE_ENTRY_STATUS }>;
  overallPercent: ComputedRef<number>;
  addFile: (file: File, name?: string) => string | undefined;
  upload: (targetFolder?: any) => void;
  cancel: () => void;
  remove: (file: QueueEntry) => void;
  clear: (onlySuccessful: boolean) => void;
  getClassNameForEntry: (entry: QueueEntry) => string;
  getIconForEntry: (entry: QueueEntry) => string;
  addExternalFiles: (files: (File | { file: File; name?: string })[]) => void;
  renameEntry: (entry: QueueEntry, newName: string) => Promise<void>;
}

// Created once per VueFinder instance (see ServiceContainer.ts) so the upload
// queue and its Uppy instance survive the upload modal being closed/reopened —
// that's what lets an upload keep running while the modal is "minimized".
export function createUploadEngine(deps: UploadEngineDeps): UploadEngine {
  const { fs, config, adapter, emitter, t, filesize, customUploader, debug } = deps;

  const definitions = ref({ QUEUE_ENTRY_STATUS });
  const queue = ref<QueueEntry[]>([]);
  const message = ref('');
  const uploading = ref(false);
  const uploadTargetFolder = ref<any>(null);

  const findQueueEntryIndexById = (id: string) => queue.value.findIndex((item) => item.id === id);

  const uppy = new Uppy({
    debug: debug ?? false,
    restrictions: { maxFileSize: parse(config.get('maxFileSize') ?? '10mb') },
    locale: t('uppy') as any,
    onBeforeFileAdded: (file: any, files: any) => {
      const duplicated = files[file.id] != null;
      if (duplicated) {
        const i = findQueueEntryIndexById(file.id);
        if (queue.value[i]?.status === QUEUE_ENTRY_STATUS.PENDING) {
          message.value = uppy.i18n('noDuplicates', { fileName: file.name });
        }
        queue.value = queue.value.filter((entry) => entry.id !== file.id);
      }
      queue.value.push({
        id: file.id,
        name: file.name,
        size: filesize(file.size),
        status: QUEUE_ENTRY_STATUS.PENDING,
        statusName: t('Pending upload'),
        percent: null,
        originalFile: file.data,
      });
      return true;
    },
  });

  const addFile = (file: File, name?: string) =>
    uppy.addFile({ name: name || file.name, type: file.type, data: file, source: 'Local' });

  const getClassNameForEntry = (entry: QueueEntry) =>
    entry.status === QUEUE_ENTRY_STATUS.DONE
      ? 'text-green-600'
      : entry.status === QUEUE_ENTRY_STATUS.ERROR || entry.status === QUEUE_ENTRY_STATUS.CANCELED
        ? 'text-red-600'
        : '';
  const getIconForEntry = (entry: QueueEntry) =>
    entry.status === QUEUE_ENTRY_STATUS.DONE
      ? '✓'
      : entry.status === QUEUE_ENTRY_STATUS.ERROR || entry.status === QUEUE_ENTRY_STATUS.CANCELED
        ? '!'
        : '...';

  const overallPercent = computed(() => {
    if (!queue.value.length) return 0;
    const total = queue.value.reduce((sum, entry) => {
      if (entry.status === QUEUE_ENTRY_STATUS.DONE) return sum + 100;
      const parsed = entry.percent ? parseInt(entry.percent, 10) : 0;
      return sum + (Number.isNaN(parsed) ? 0 : parsed);
    }, 0);
    return Math.floor(total / queue.value.length);
  });

  const upload = (targetFolder?: any) => {
    if (
      uploading.value ||
      !queue.value.filter((entry) => entry.status !== QUEUE_ENTRY_STATUS.DONE).length
    ) {
      if (!uploading.value) message.value = t('Please select file to upload first.');
      return;
    }
    message.value = '';

    // Store the target folder for use in the upload event handler
    uploadTargetFolder.value = targetFolder || fs.path.get();

    // todo: will look into retrying failed uploads later
    // uppy.retryAll();
    uppy.upload();
  };

  const cancel = () => {
    uppy.cancelAll();
    queue.value.forEach((entry) => {
      if (entry.status !== QUEUE_ENTRY_STATUS.DONE) {
        entry.status = QUEUE_ENTRY_STATUS.CANCELED;
        entry.statusName = t('Canceled');
      }
    });
    uploading.value = false;
  };

  const remove = (file: QueueEntry) => {
    if (uploading.value) return;
    uppy.removeFile(file.id);
    queue.value.splice(findQueueEntryIndexById(file.id), 1);
  };

  const clear = (onlySuccessful: boolean) => {
    if (uploading.value) return;
    uppy.cancelAll();
    if (onlySuccessful) {
      const retryQueue = queue.value.filter((entry) => entry.status !== QUEUE_ENTRY_STATUS.DONE);
      queue.value = [];
      retryQueue.forEach((entry) => addFile(entry.originalFile, entry.name));
    } else {
      queue.value = [];
    }
  };

  const addExternalFiles = (files: (File | { file: File; name?: string })[]) => {
    files.forEach((entry) => {
      if (entry instanceof File) {
        addFile(entry);
      } else {
        addFile(entry.file, entry.name);
      }
    });
  };

  const joinFolderAndName = (folder: string, name: string): string => {
    if (folder.endsWith('://') || folder.endsWith('/')) return folder + name;
    return folder + '/' + name;
  };

  const renameEntry = async (entry: QueueEntry, newName: string): Promise<void> => {
    const trimmed = newName.trim();
    if (uploading.value) return;
    if (!trimmed) return;
    if (trimmed.includes('/') || trimmed.includes('\\')) {
      message.value = t('Name cannot contain slashes.');
      return;
    }

    // Preserve any subfolder prefix from folder uploads (e.g. "sub/file.txt").
    const segments = entry.name.split('/');
    segments[segments.length - 1] = trimmed;
    const newEntryName = segments.join('/');
    if (newEntryName === entry.name) return;

    if (entry.status === QUEUE_ENTRY_STATUS.DONE) {
      const targetFolderPath = uploadTargetFolder.value?.path || fs.path.get().path;
      const itemPath = joinFolderAndName(targetFolderPath, entry.name);
      const parentSegments = entry.name.split('/');
      parentSegments.pop();
      const parentPath = parentSegments.length
        ? joinFolderAndName(targetFolderPath, parentSegments.join('/'))
        : targetFolderPath;

      try {
        await adapter.rename({ path: parentPath, item: itemPath, name: trimmed });
        entry.name = newEntryName;
        adapter.invalidateListQuery(targetFolderPath);
        if (targetFolderPath === fs.path.get().path) {
          adapter.open(targetFolderPath);
        }
      } catch (e: any) {
        message.value = e?.message || t('Failed to rename');
      }
      return;
    }

    // Pending / error / canceled — rename locally by re-adding to uppy with the new name.
    const idx = findQueueEntryIndexById(entry.id);
    if (idx === -1) return;
    const file = entry.originalFile;
    const originalName = entry.name;

    uppy.removeFile(entry.id);
    queue.value.splice(idx, 1);

    let newId: string | undefined;
    try {
      newId = addFile(file, newEntryName);
    } catch (e: any) {
      // Restore the original entry if uppy rejects the new name (restrictions, duplicate, ...).
      message.value = e?.message || t('Failed to rename');
      try {
        addFile(file, originalName);
      } catch {
        // Original add also failed; nothing else to recover.
      }
      return;
    }

    if (!newId) return;
    const newIdx = findQueueEntryIndexById(newId);
    if (newIdx !== -1 && newIdx !== idx) {
      const moved = queue.value.splice(newIdx, 1)[0];
      if (moved) queue.value.splice(idx, 0, moved);
    }
  };

  const context = {
    getTargetPath: () => (uploadTargetFolder.value || fs.path.get()).path,
  };

  const driver = adapter.getDriver();
  if (customUploader) {
    customUploader(uppy, context);
  } else if (driver.configureUploader) {
    driver.configureUploader(uppy, context);
  } else {
    throw new Error('No uploader configured');
  }

  uppy.on('restriction-failed', (upFile: any, error: any) => {
    const entry = queue.value[findQueueEntryIndexById(upFile.id)];
    if (entry) remove(entry);
    message.value = error.message;
  });

  uppy.on('upload-start', (upFiles: any) => {
    upFiles.forEach((upFile: any) => {
      const entry = queue.value[findQueueEntryIndexById(upFile.id)];
      if (entry) {
        entry.status = QUEUE_ENTRY_STATUS.UPLOADING;
        entry.statusName = t('Uploading');
        entry.percent = '0%';
      }
    });
  });

  uppy.on('upload-progress', (upFile: any, progress: any) => {
    const total = progress.bytesTotal ?? 1;
    const p = Math.floor((progress.bytesUploaded / total) * 100);
    const idx = findQueueEntryIndexById(upFile.id);
    if (idx !== -1 && queue.value[idx]) {
      queue.value[idx].percent = `${p}%`;
    }
  });

  uppy.on('upload-success', (upFile: any) => {
    const entry = queue.value[findQueueEntryIndexById(upFile.id)];
    if (!entry) return;
    entry.status = QUEUE_ENTRY_STATUS.DONE;
    entry.statusName = t('Done');
  });

  uppy.on('upload-error', (upFile: any, error: any) => {
    const entry = queue.value[findQueueEntryIndexById(upFile.id)];
    if (!entry) return;
    entry.percent = null;
    entry.status = QUEUE_ENTRY_STATUS.ERROR;
    entry.statusName = error?.isNetworkError
      ? t('Network Error, Unable establish connection to the server or interrupted.')
      : error?.message || t('Unknown Error');
  });

  uppy.on('error', (error: any) => {
    message.value = error.message;
    uploading.value = false;
  });

  uppy.on('complete', (result: any) => {
    uploading.value = false;

    // Use the target folder for refreshing the file list
    const targetPath = uploadTargetFolder.value || fs.path.get();

    // Refresh the target folder and emit upload complete
    adapter.invalidateListQuery(targetPath.path);
    adapter.open(targetPath.path);

    // Get uploaded file names from queue
    const uploadedFiles = queue.value
      .filter(
        (entry) => entry.status === QUEUE_ENTRY_STATUS.DONE && result.successful.includes(entry.id)
      )
      .map((entry) => entry.name);
    emitter.emit('vf-upload-complete', uploadedFiles);
  });

  uppy.on('upload', () => {
    uploading.value = true;
  });

  return {
    queue,
    message,
    uploading,
    definitions,
    overallPercent,
    addFile,
    upload,
    cancel,
    remove,
    clear,
    getClassNameForEntry,
    getIconForEntry,
    addExternalFiles,
    renameEntry,
  };
}
