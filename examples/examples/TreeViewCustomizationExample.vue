<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Driver } from '../../src/adapters';
import CustomTreeView from './CustomTreeView.vue';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

const props = defineProps<Props>();

type Mode = 'default' | 'storage-switcher' | 'custom-component';

const mode = ref<Mode>('default');

const modes: Record<Mode, string> = {
  default: 'Default TreeView (no slot used)',
  'storage-switcher': 'Replace via "tree-view" scoped slot (inline storage switcher)',
  'custom-component': 'Replace via "tree-view" slot with a component using useTreeViewActions',
};

const computedConfig = computed(() => ({
  ...props.config,
  showTreeView: true,
}));
</script>

<template>
  <div class="treeview-customization-example">
    <div class="treeview-customization-example__controls">
      <div class="treeview-customization-example__group">
        <label
          v-for="(label, key) in modes"
          :key="key"
          class="treeview-customization-example__option"
        >
          <input v-model="mode" type="radio" :value="key" name="treeview-mode" />
          {{ label }}
        </label>
      </div>
    </div>

    <div class="treeview-customization-example__viewer">
      <!-- Mode 1: default rendering, no slot passed at all -->
      <vue-finder
        v-if="mode === 'default'"
        id="treeview_custom_default"
        :driver="driver"
        :config="computedConfig"
        :features="features"
      />

      <!-- Mode 2: replace the tree view inline, using only the scoped props
           the slot passes in (storages/currentPath/openPath) - enough for a
           simple storage switcher. -->
      <vue-finder
        v-else-if="mode === 'storage-switcher'"
        id="treeview_custom_storage_switcher"
        :driver="driver"
        :config="computedConfig"
        :features="features"
      >
        <template #tree-view="{ storages, currentPath, openPath }">
          <div class="storage-switcher">
            <button
              v-for="storage in storages"
              :key="storage"
              class="storage-switcher__item"
              :class="{ 'storage-switcher__item--active': currentPath.storage === storage }"
              @click="openPath(storage + '://')"
            >
              {{ storage }}
            </button>
          </div>
        </template>
      </vue-finder>

      <!-- Mode 3: fully replace with a standalone component that calls
           useTreeViewActions() itself, so it isn't limited to what the slot
           passes in - it reuses the exact same pinned-folders/navigation
           logic as the default TreeView.vue (see CustomTreeView.vue). -->
      <vue-finder
        v-else
        id="treeview_custom_component"
        :driver="driver"
        :config="computedConfig"
        :features="features"
      >
        <template #tree-view>
          <CustomTreeView />
        </template>
      </vue-finder>
    </div>
  </div>
</template>

<style scoped>
.treeview-customization-example {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.treeview-customization-example__controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.treeview-customization-example__group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.treeview-customization-example__option {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: #374151;
  cursor: pointer;
}

.treeview-customization-example__viewer {
  flex: 1;
  min-height: 480px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.storage-switcher {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
}

.storage-switcher__item {
  text-align: left;
  padding: 6px 10px;
  font-size: 0.85rem;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #374151;
  cursor: pointer;
}

.storage-switcher__item--active {
  background: #eef2ff;
  color: #4338ca;
  font-weight: 500;
}
</style>
