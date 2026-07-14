import { computed, ref, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { useApp } from './useApp';
import { useDragNDrop } from './useDragNDrop';
import type { StoreValue } from 'nanostores';
import type { ConfigState } from '../stores/config';
import type { CurrentPathState } from '../stores/files';
import type { PinnedFolder } from '../types';

/**
 * Pinned-folders / navigation actions used by `TreeView.vue`.
 *
 * Extracted into a composable so a custom component can reuse the exact same
 * behavior - e.g. to render its own layout for the tree view via the
 * `tree-view` slot while keeping pin management and navigation working.
 */
export function useTreeViewActions() {
  const app = useApp();
  const fs = app.fs;
  const config = app.config;
  const { t } = app.i18n;
  const { getStore, setStore } = app.storage;

  const configState: StoreValue<ConfigState> = useStore(config.state);
  const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);
  const storages: StoreValue<string[]> = useStore(fs.storages);

  const dragNDrop = useDragNDrop(app, ['vuefinder__drag-over']);

  const pinnedFolders = computed(
    () => configState.value.pinnedFolders as unknown as PinnedFolder[]
  );

  const pinnedFoldersOpened = ref(getStore('pinned-folders-opened', true));
  watch(pinnedFoldersOpened, (value) => setStore('pinned-folders-opened', value));

  const togglePinnedFoldersOpened = () => {
    pinnedFoldersOpened.value = !pinnedFoldersOpened.value;
  };

  const isActivePath = (path: string) => currentPath.value?.path === path;

  const openPath = (path: string) => {
    app.adapter.open(path);
  };

  const removePin = (item: PinnedFolder) => {
    const current = (config.get('pinnedFolders') as unknown as PinnedFolder[]) ?? [];
    config.set('pinnedFolders', current.filter((folder) => folder.path !== item.path) as any);
  };

  return {
    t,
    configState,
    currentPath,
    storages,
    dragNDrop,
    pinnedFolders,
    pinnedFoldersOpened,
    togglePinnedFoldersOpened,
    isActivePath,
    openPath,
    removePin,
  };
}
