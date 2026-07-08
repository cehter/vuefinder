import { type ComputedRef, type Ref } from 'vue';
import type { AdapterManager } from '../adapters/AdapterManager';
import type { ConfigStore } from '../stores/config';
import type { createFilesStore } from '../stores/files';
type FilesStore = ReturnType<typeof createFilesStore>;
export declare const QUEUE_ENTRY_STATUS: {
    readonly PENDING: 0;
    readonly CANCELED: 1;
    readonly UPLOADING: 2;
    readonly ERROR: 3;
    readonly DONE: 10;
};
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
    emitter: {
        emit: (type: string, event?: unknown) => void;
    };
    t: (key: string, params?: any) => string;
    filesize: (size: number) => string;
    customUploader?: (uppy: any, context: {
        getTargetPath: () => string;
    }) => void;
    debug?: boolean;
}
export interface UploadEngine {
    queue: Ref<QueueEntry[]>;
    message: Ref<string>;
    uploading: Ref<boolean>;
    definitions: Ref<{
        QUEUE_ENTRY_STATUS: typeof QUEUE_ENTRY_STATUS;
    }>;
    overallPercent: ComputedRef<number>;
    addFile: (file: File, name?: string) => string | undefined;
    upload: (targetFolder?: any) => void;
    cancel: () => void;
    remove: (file: QueueEntry) => void;
    clear: (onlySuccessful: boolean) => void;
    getClassNameForEntry: (entry: QueueEntry) => string;
    getIconForEntry: (entry: QueueEntry) => string;
    addExternalFiles: (files: (File | {
        file: File;
        name?: string;
    })[]) => void;
    renameEntry: (entry: QueueEntry, newName: string) => Promise<void>;
}
export declare function createUploadEngine(deps: UploadEngineDeps): UploadEngine;
export {};
