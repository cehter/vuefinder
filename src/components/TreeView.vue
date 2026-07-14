<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import { useApp } from '../composables/useApp';
import { useFeature } from '../composables/useFeature';
import { useTreeViewActions } from '../composables/useTreeViewActions';
import { useStore } from '@nanostores/vue';
import FolderSVG from '../assets/icons/folder.svg';
import OpenFolderSVG from '../assets/icons/open_folder.svg';
import PinSVG from '../assets/icons/pin.svg';
import XBoxSVG from '../assets/icons/x_box.svg';

import { OverlayScrollbars } from 'overlayscrollbars';
import TreeStorageItem from './TreeStorageItem.vue';
import upsert from '../utils/upsert';
import FolderIndicator from './FolderIndicator.vue';
import type { DirEntry } from '../types';
import type { StoreValue } from 'nanostores';
import type { ConfigState } from '../stores/config';
import type { CurrentPathState } from '../stores/files';

const app = useApp();
const { enabled } = useFeature();

const fs = app.fs;
const config = app.config;

// Use nanostores reactive values for template reactivity
const configState: StoreValue<ConfigState> = useStore(config.state);
const sortedFiles: StoreValue<DirEntry[]> = useStore(fs.sortedFiles);
const currentPath: StoreValue<CurrentPathState> = useStore(fs.path);

const {
  t,
  storages,
  dragNDrop,
  pinnedFolders,
  pinnedFoldersOpened,
  togglePinnedFoldersOpened,
  openPath,
  removePin,
} = useTreeViewActions();
const storagesList = computed(() => storages.value || []);

const treeViewWidth = ref(190);

const handleMouseDown = (e: MouseEvent) => {
  const startX = e.clientX;
  const element = (e.target as HTMLElement).parentElement;
  if (!element) return;

  const startWidth = element.getBoundingClientRect().width;

  // start of event remove transition-[width] and add transition-none
  element.classList.remove('transition-[width]');
  element.classList.add('transition-none');

  const handleMouseMove = (e: MouseEvent) => {
    treeViewWidth.value = startWidth + e.clientX - startX;

    if (treeViewWidth.value < 50) {
      treeViewWidth.value = 0;
      config.set('showTreeView', false);
    }
    if (treeViewWidth.value > 50) {
      config.set('showTreeView', true);
    }
  };

  const handleMouseUp = () => {
    // get the actual width of the element, update the treeViewWidth
    const elementData = element.getBoundingClientRect();
    treeViewWidth.value = elementData.width;
    // end of event add transition-[width] and remove transition-none
    element.classList.add('transition-[width]');
    element.classList.remove('transition-none');
    // remove event listeners
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  // add event listeners
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
};
const treeViewScrollElement = ref(null);

onMounted(() => {
  if (treeViewScrollElement.value) {
    OverlayScrollbars(treeViewScrollElement.value, {
      overflow: {
        x: 'hidden',
      },
      scrollbars: {
        theme: 'vf-scrollbars-theme',
      },
    });
  }
});

// watch for changes in the fs.data
// update the treeViewData
watch(sortedFiles, (newFiles) => {
  const folders = newFiles.filter((e: DirEntry) => e.type === 'dir');
  upsert(app.treeViewData, {
    path: currentPath.value.path || '',
    folders: folders.map((item: DirEntry) => {
      return {
        storage: item.storage,
        path: item.path,
        basename: item.basename,
        type: 'dir' as const,
      };
    }),
  });
});
</script>

<template>
  <div
    class="vuefinder__treeview__overlay"
    :class="configState.showTreeView ? 'vuefinder__treeview__backdrop' : 'hidden'"
    @click="config.toggle('showTreeView')"
  ></div>
  <div
    :style="
      configState.showTreeView
        ? 'min-width:100px;max-width:75%; width: ' + treeViewWidth + 'px'
        : 'width: 0'
    "
    class="vuefinder__treeview__container"
  >
    <div ref="treeViewScrollElement" class="vuefinder__treeview__scroll">
      <!--
        Extension point: replace the pinned-folders header and storage list
        entirely with a custom component. Receives the same reactive data
        and actions (from `useTreeViewActions`) that power the default
        rendering below, so a custom layout can filter/reorder storages,
        render pinned folders differently, etc.
      -->
      <slot
        name="tree-view"
        :pinned-folders="pinnedFolders"
        :pinned-folders-opened="pinnedFoldersOpened"
        :toggle-pinned-folders-opened="togglePinnedFoldersOpened"
        :remove-pin="removePin"
        :storages="storagesList"
        :current-path="currentPath"
        :open-path="openPath"
      >
        <div v-if="enabled('pinned')" class="vuefinder__treeview__header">
          <div class="vuefinder__treeview__pinned-toggle" @click="togglePinnedFoldersOpened">
            <div class="vuefinder__treeview__pinned-label">
              <PinSVG class="vuefinder__treeview__pin-icon" />
              <div class="vuefinder__treeview__pin-text text-nowrap">
                {{ t('Pinned Folders') }}
              </div>
            </div>
            <FolderIndicator v-model="pinnedFoldersOpened" />
          </div>
          <ul v-if="pinnedFoldersOpened" class="vuefinder__treeview__pinned-list">
            <li
              v-for="folder in pinnedFolders"
              :key="folder.path"
              class="vuefinder__treeview__pinned-item"
            >
              <div
                class="vuefinder__treeview__pinned-folder"
                v-on="dragNDrop.events(folder)"
                @click="openPath(folder.path)"
              >
                <FolderSVG
                  v-if="currentPath.path !== folder.path"
                  class="vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                />
                <OpenFolderSVG
                  v-if="currentPath.path === folder.path"
                  class="vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                />
                <div
                  :title="folder.path"
                  class="vuefinder__treeview__folder-name"
                  :class="{
                    'vuefinder__treeview__folder-name--active': currentPath.path === folder.path,
                  }"
                >
                  {{ folder.basename }}
                </div>
              </div>
              <div class="vuefinder__treeview__remove-folder" @click="removePin(folder)">
                <XBoxSVG class="vuefinder__treeview__remove-icon" />
              </div>
            </li>
            <li v-if="!pinnedFolders.length">
              <div class="vuefinder__treeview__no-pinned">{{ t('No folders pinned') }}</div>
            </li>
          </ul>
        </div>

        <div v-for="storage in storagesList" :key="storage" class="vuefinder__treeview__storage">
          <TreeStorageItem :storage="storage" />
        </div>
      </slot>
    </div>
    <div class="vuefinder__treeview__resize-handle" @mousedown="handleMouseDown"></div>
  </div>
</template>
