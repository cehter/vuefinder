declare var __VLS_1: {
    pinnedFolders: import("../types").PinnedFolder[];
    pinnedFoldersOpened: any;
    togglePinnedFoldersOpened: () => void;
    removePin: (item: import("../types").PinnedFolder) => void;
    storages: any;
    currentPath: any;
    openPath: (path: string) => void;
};
type __VLS_Slots = {} & {
    'tree-view'?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: import("vue").DefineComponent<{}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
