<script setup lang="ts">
// Demonstrates reusing the exact same actions that power the default
// TreeView.vue to build a fully custom tree layout. This component is
// rendered through TreeView's `#tree-view` slot, so `useTreeViewActions()`
// resolves against the surrounding VueFinder instance just like it does
// inside the library's own TreeView component.
import { useTreeViewActions } from '../../src';

const {
  t,
  storages,
  currentPath,
  pinnedFolders,
  pinnedFoldersOpened,
  togglePinnedFoldersOpened,
  removePin,
  openPath,
} = useTreeViewActions();
</script>

<template>
  <div class="custom-tree-view">
    <div class="custom-tree-view__section">
      <button class="custom-tree-view__toggle" @click="togglePinnedFoldersOpened">
        {{ pinnedFoldersOpened ? '▾' : '▸' }} {{ t('Pinned Folders') }}
      </button>
      <ul v-if="pinnedFoldersOpened" class="custom-tree-view__pinned">
        <li
          v-for="folder in pinnedFolders"
          :key="folder.path"
          class="custom-tree-view__pinned-item"
        >
          <span class="custom-tree-view__pinned-name" @click="openPath(folder.path)">
            📌 {{ folder.basename }}
          </span>
          <button class="custom-tree-view__pinned-remove" @click="removePin(folder)">✕</button>
        </li>
        <li v-if="!pinnedFolders.length" class="custom-tree-view__empty">
          {{ t('No folders pinned') }}
        </li>
      </ul>
    </div>

    <div class="custom-tree-view__section">
      <div
        v-for="storage in storages"
        :key="storage"
        class="custom-tree-view__storage"
        :class="{ 'custom-tree-view__storage--active': currentPath.storage === storage }"
        @click="openPath(storage + '://')"
      >
        🗄️ {{ storage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-tree-view {
  padding: 8px;
  font-size: 0.85rem;
  color: #374151;
}

.custom-tree-view__section {
  margin-bottom: 12px;
}

.custom-tree-view__toggle {
  background: none;
  border: none;
  padding: 0;
  font-weight: 600;
  cursor: pointer;
  color: inherit;
}

.custom-tree-view__pinned {
  list-style: none;
  margin: 6px 0 0;
  padding: 0;
}

.custom-tree-view__pinned-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
}

.custom-tree-view__pinned-name {
  cursor: pointer;
}

.custom-tree-view__pinned-remove {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
}

.custom-tree-view__empty {
  color: #9ca3af;
  font-style: italic;
}

.custom-tree-view__storage {
  padding: 6px 4px;
  cursor: pointer;
  border-radius: 6px;
}

.custom-tree-view__storage--active {
  background: #eef2ff;
  color: #4338ca;
  font-weight: 500;
}
</style>
