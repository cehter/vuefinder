import { describe, it, expect, vi, afterEach } from 'vitest';
import { defineComponent, h, nextTick, provide } from 'vue';
import { mount } from '@vue/test-utils';
import { atom } from 'nanostores';
import { useTreeViewActions } from '../composables/useTreeViewActions';
import { registerApp, unregisterApp, ServiceContainerIdKey } from '../composables/useApp';
import type { App, PinnedFolder } from '../types';
import type { ConfigState } from '../stores/config';

const DEFAULT_CONFIG_STATE: ConfigState = {
  view: 'grid',
  theme: 'silver',
  fullScreen: false,
  showTreeView: false,
  showHiddenFiles: true,
  metricUnits: false,
  showThumbnails: true,
  persist: false,
  path: '',
  pinnedFolders: [],
  notificationsEnabled: true,
  expandTreeByDefault: false,
  expandedTreePaths: [],
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: 'circular',
  showMenuBar: true,
  showToolbar: true,
  gridItemWidth: 96,
  gridItemHeight: 80,
  gridItemGap: 8,
  gridIconSize: 48,
  listItemHeight: 32,
  listItemGap: 2,
  listIconSize: 16,
  notificationPosition: 'bottom-center',
  notificationDuration: 3000,
  notificationVisibleToasts: 4,
  notificationRichColors: true,
};

// A plain in-memory config store (no `@nanostores/persistent`/localStorage
// involved), since composable tests only need `state`/`get`/`set` to behave
// like the real thing - a fresh `atom()` per test is simpler and more
// isolated than mocking the persistence layer.
function createMockConfigStore(overrides: Partial<ConfigState> = {}) {
  const state = atom<ConfigState>({ ...DEFAULT_CONFIG_STATE, ...overrides });

  return {
    state,
    get: <K extends keyof ConfigState>(key: K) => state.get()[key],
    set: (keyOrPatch: any, value?: any) => {
      if (typeof keyOrPatch === 'object' && keyOrPatch !== null) {
        state.set({ ...state.get(), ...keyOrPatch });
      } else {
        state.set({ ...state.get(), [keyOrPatch]: value });
      }
    },
    toggle: (key: keyof ConfigState) => {
      state.set({ ...state.get(), [key]: !state.get()[key] });
    },
    all: () => state.get(),
    init: () => {},
    reset: () => {
      state.set({ ...DEFAULT_CONFIG_STATE });
    },
  };
}

// In-memory replacement for `useStorage()`, since the composable only needs
// `getStore`/`setStore` to behave like the real thing.
function createMockStorage() {
  const values: Record<string, unknown> = {};
  return {
    getStore: vi.fn((name: string, defaultValue: unknown = null) =>
      name in values ? values[name] : defaultValue
    ),
    setStore: vi.fn((name: string, value: unknown) => {
      values[name] = value;
    }),
  };
}

function createTestApp(configOverrides: Partial<ConfigState> = {}) {
  const app = {
    i18n: { t: (key: string) => key },
    fs: {
      path: atom({ storage: 'local', path: 'local://docs' }),
      storages: atom(['local', 's3']),
      selectedItems: atom([]),
      getDraggedItem: () => null,
      sortedFiles: { get: () => [] },
    },
    config: createMockConfigStore(configOverrides),
    storage: createMockStorage(),
    adapter: {
      open: vi.fn(),
    },
    features: {},
  } as unknown as App;

  return app;
}

function mountComposable<T>(id: string, setupFn: () => T) {
  let result!: T;
  const Child = defineComponent({
    setup() {
      result = setupFn();
      return () => h('div');
    },
  });
  const Parent = defineComponent({
    setup() {
      provide(ServiceContainerIdKey, id);
      return () => h(Child);
    },
  });
  const wrapper = mount(Parent);
  return {
    wrapper,
    get result() {
      return result;
    },
  };
}

describe('useTreeViewActions', () => {
  const id = 'tree-view-actions-test';

  afterEach(() => {
    unregisterApp(id);
  });

  it('exposes a reactive currentPath and storages list, for a custom tree-view component', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useTreeViewActions());

    expect(result.currentPath.value.path).toBe('local://docs');
    expect(result.storages.value).toEqual(['local', 's3']);

    (app.fs.path as any).set({ storage: 's3', path: 's3://deeper' });
    expect(result.currentPath.value.path).toBe('s3://deeper');
  });

  it('defaults pinnedFoldersOpened to true when nothing was persisted', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useTreeViewActions());

    expect(result.pinnedFoldersOpened.value).toBe(true);
  });

  it('togglePinnedFoldersOpened() flips and persists the open state', async () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useTreeViewActions());

    result.togglePinnedFoldersOpened();
    await nextTick();

    expect(result.pinnedFoldersOpened.value).toBe(false);
    expect(app.storage.setStore).toHaveBeenCalledWith('pinned-folders-opened', false);
  });

  it('openPath() opens an arbitrary path, e.g. from a custom tree-view slot', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useTreeViewActions());

    result.openPath('local://elsewhere');

    expect(app.adapter.open).toHaveBeenCalledWith('local://elsewhere');
  });

  it('removePin() removes only the matching pinned folder', () => {
    const pinA: PinnedFolder = { path: 'local://a', storage: 'local', basename: 'a', type: 'dir' };
    const pinB: PinnedFolder = { path: 'local://b', storage: 'local', basename: 'b', type: 'dir' };
    const app = createTestApp({
      pinnedFolders: [pinA, pinB] as unknown as ConfigState['pinnedFolders'],
    });
    registerApp(id, app);
    const { result } = mountComposable(id, () => useTreeViewActions());

    result.removePin(pinA);

    expect(app.config.get('pinnedFolders')).toEqual([pinB]);
  });

  it('isActivePath() reflects whether a path matches the current path', () => {
    const app = createTestApp();
    registerApp(id, app);
    const { result } = mountComposable(id, () => useTreeViewActions());

    expect(result.isActivePath('local://docs')).toBe(true);
    expect(result.isActivePath('local://other')).toBe(false);
  });
});
