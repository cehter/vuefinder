import { type Ref } from 'vue';
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
    definitions: Ref<{
        QUEUE_ENTRY_STATUS: typeof QUEUE_ENTRY_STATUS;
    }>;
    openFileSelector: () => void;
    upload: (targetFolder?: any) => void;
    cancel: () => void;
    remove: (file: QueueEntry) => void;
    clear: (onlySuccessful: boolean) => void;
    close: () => void;
    getClassNameForEntry: (entry: QueueEntry) => string;
    getIconForEntry: (entry: QueueEntry) => string;
    addExternalFiles: (files: (File | {
        file: File;
        name?: string;
    })[]) => void;
    renameEntry: (entry: QueueEntry, newName: string) => Promise<void>;
}
export default function useUpload(_customUploader?: any): UseUploadReturn;
