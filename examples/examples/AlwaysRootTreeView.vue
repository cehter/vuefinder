<script setup lang="ts">
// Demonstrates the pattern needed for a file-manager integration where each
// storage's root row must always navigate back to that storage's root on
// click - never toggle-collapse like the default TreeStorageItem does once
// the storage is already active. Subfolders stay reusable via
// TreeSubfolderList, the same recursive component the default TreeView uses
// internally, so nested browsing still works without reimplementing it.
import { useTreeViewActions } from '../../src';
import TreeSubfolderList from '../../src/components/TreeSubfolderList.vue';

const { storages, currentPath, openPath } = useTreeViewActions();
</script>

<template>
  <div class="always-root-tree-view">
    <div v-for="storage in storages" :key="storage" class="always-root-tree-view__storage">
      <button
        type="button"
        class="always-root-tree-view__root"
        :class="{ 'always-root-tree-view__root--active': currentPath.storage === storage }"
        @click="openPath(storage + '://')"
      >
        🗄️ {{ storage }}
      </button>
      <TreeSubfolderList :storage="storage" :path="storage + '://'" />
    </div>
  </div>
</template>

<style scoped>
.always-root-tree-view {
  padding: 8px;
  font-size: 0.85rem;
  color: #374151;
}

.always-root-tree-view__storage {
  margin-bottom: 8px;
}

.always-root-tree-view__root {
  display: block;
  width: 100%;
  text-align: left;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font-weight: 600;
  cursor: pointer;
  color: inherit;
}

.always-root-tree-view__root--active {
  background: #eef2ff;
  color: #4338ca;
}
</style>
