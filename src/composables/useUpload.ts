import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import { useApp } from '../composables/useApp';
import { scanFiles } from '../utils/scanFiles';
import { QUEUE_ENTRY_STATUS, type QueueEntry } from './useUploadEngine';

export { QUEUE_ENTRY_STATUS };
export type { QueueEntry };

export interface UseUploadReturn {
  container: Ref<HTMLElement | null>;
  internalFileInput: Ref<HTMLInputElement | null>;
  internalFolderInput: Ref<HTMLInputElement | null>;
  pickFiles: Ref<HTMLElement | null>;
  pickFolders: Ref<HTMLElement | null>;
  queue: Ref<QueueEntry[]>;
  message: Ref<string>;
  uploading: Ref<boolean>;
  hasFilesInDropArea: Ref<boolean>;
  definitions: Ref<{ QUEUE_ENTRY_STATUS: typeof QUEUE_ENTRY_STATUS }>;
  openFileSelector: () => void;
  upload: (targetFolder?: any) => void;
  cancel: () => void;
  remove: (file: QueueEntry) => void;
  clear: (onlySuccessful: boolean) => void;
  close: () => void;
  getClassNameForEntry: (entry: QueueEntry) => string;
  getIconForEntry: (entry: QueueEntry) => string;
  addExternalFiles: (files: (File | { file: File; name?: string })[]) => void;
  renameEntry: (entry: QueueEntry, newName: string) => Promise<void>;
}

// Thin, per-mount wrapper around the app's singleton upload engine (app.upload).
// DOM refs and drag&drop wiring are local to this component instance; the actual
// queue/Uppy state lives in the engine so it survives the modal being closed —
// that's what lets an upload keep running in the background while "minimized".
export default function useUpload(_customUploader?: any): UseUploadReturn {
  const app = useApp();
  const engine = app.upload;

  const container = ref<HTMLElement | null>(null);
  const internalFileInput = ref<HTMLInputElement | null>(null);
  const internalFolderInput = ref<HTMLInputElement | null>(null);
  const pickFiles = ref<HTMLElement | null>(null);
  const pickFolders = ref<HTMLElement | null>(null);
  const hasFilesInDropArea = ref(false);

  const openFileSelector = () => pickFiles.value?.click();
  const close = () => app.modal.close();

  // Document-level drag event handlers
  const handleDocumentDragOver = (ev: DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    hasFilesInDropArea.value = true;
  };
  const handleDocumentDragEnter = (ev: DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    hasFilesInDropArea.value = true;
  };

  const handleDocumentDragLeave = (ev: DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    // Only hide if leaving the document completely
    if (!ev.relatedTarget || ev.relatedTarget === document.body) {
      hasFilesInDropArea.value = false;
    }
  };

  const handleDocumentDrop = (ev: DragEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    hasFilesInDropArea.value = false;

    // Always accept files when upload modal is open
    const trimFileName = /^[/\\](.+)/;
    const dt = ev.dataTransfer;
    if (!dt) return;

    // Prefer items for folder support; fallback to files
    if (dt.items && dt.items.length) {
      Array.from(dt.items).forEach((item) => {
        if (item.kind === 'file') {
          const getAsEntry = (item as any).webkitGetAsEntry?.();
          if (getAsEntry) {
            scanFiles((entry: any, file: File) => {
              const matched = trimFileName.exec((entry?.fullPath as string) || '');
              engine.addFile(file, matched ? matched[1] : file.name);
            }, getAsEntry);
          } else {
            const f = item.getAsFile?.();
            if (f) engine.addFile(f);
          }
        }
      });
    } else if (dt.files && dt.files.length) {
      Array.from(dt.files).forEach((file) => engine.addFile(file));
    }
  };

  onMounted(() => {
    // Event listeners
    pickFiles.value?.addEventListener('click', () => internalFileInput.value?.click());
    pickFolders.value?.addEventListener('click', () => internalFolderInput.value?.click());

    // Add document-level listeners
    const listenerOptions: AddEventListenerOptions | boolean = { capture: true };
    document.addEventListener('dragover', handleDocumentDragOver, listenerOptions);
    document.addEventListener('dragenter', handleDocumentDragEnter, listenerOptions);
    document.addEventListener('dragleave', handleDocumentDragLeave, listenerOptions);
    document.addEventListener('drop', handleDocumentDrop, listenerOptions);

    const onFileInputChange = (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      const files = target.files;
      if (!files) return;
      for (const file of files) engine.addFile(file, file.webkitRelativePath || undefined);
      target.value = '';
    };

    internalFileInput.value?.addEventListener('change', onFileInputChange);
    internalFolderInput.value?.addEventListener('change', onFileInputChange);
  });

  // Cleanup on unmount
  onUnmounted(() => {
    const listenerOptions: AddEventListenerOptions | boolean = { capture: true };
    document.removeEventListener('dragover', handleDocumentDragOver, listenerOptions);
    document.removeEventListener('dragenter', handleDocumentDragEnter, listenerOptions);
    document.removeEventListener('dragleave', handleDocumentDragLeave, listenerOptions);
    document.removeEventListener('drop', handleDocumentDrop, listenerOptions);
  });

  return {
    container,
    internalFileInput,
    internalFolderInput,
    pickFiles,
    pickFolders,
    queue: engine.queue,
    message: engine.message,
    uploading: engine.uploading,
    hasFilesInDropArea,
    definitions: engine.definitions,
    openFileSelector,
    upload: engine.upload,
    cancel: engine.cancel,
    remove: engine.remove,
    clear: engine.clear,
    close,
    getClassNameForEntry: engine.getClassNameForEntry,
    getIconForEntry: engine.getIconForEntry,
    addExternalFiles: engine.addExternalFiles,
    renameEntry: engine.renameEntry,
  };
}
