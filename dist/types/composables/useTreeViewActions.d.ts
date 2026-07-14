import type { PinnedFolder } from '../types';
/**
 * Pinned-folders / navigation actions used by `TreeView.vue`.
 *
 * Extracted into a composable so a custom component can reuse the exact same
 * behavior - e.g. to render its own layout for the tree view via the
 * `tree-view` slot while keeping pin management and navigation working.
 */
export declare function useTreeViewActions(): {
    t: any;
    configState: any;
    currentPath: any;
    storages: any;
    dragNDrop: {
        events: (item: import("./useDragNDrop").DragNDropItem) => {
            readonly dragover: (e: import("./useDragNDrop").DragNDropEvent) => void;
            readonly dragenter: (e: import("./useDragNDrop").DragNDropEvent) => void;
            readonly dragleave: (e: import("./useDragNDrop").DragNDropEvent) => void;
            readonly drop: (e: import("./useDragNDrop").DragNDropEvent) => void;
        };
    };
    pinnedFolders: import("vue").ComputedRef<PinnedFolder[]>;
    pinnedFoldersOpened: import("vue").Ref<any, any>;
    togglePinnedFoldersOpened: () => void;
    isActivePath: (path: string) => boolean;
    openPath: (path: string) => void;
    removePin: (item: PinnedFolder) => void;
};
