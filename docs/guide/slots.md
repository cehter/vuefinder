---
outline: deep
---

# Slots

VueFinder provides slots that allow you to customize specific parts of the component.

## Available Slots

### `status-bar` Slot

Customize the status bar with your own content. This is useful for adding custom buttons or displaying additional information.

**Scoped Props:**

- `selected` - `DirEntry[]` - Currently selected items
- `count` - `number` - Number of selected items
- `path` - `string` - Current path

#### Example: Custom Action Button

```vue
<template>
  <vue-finder id="status-example" :driver="driver">
    <template #status-bar="{ selected, count, path }">
      <div class="custom-status">
        <button @click="handleAction(selected)">Process Selected ({{ count }})</button>
        <span class="path-info">Current: {{ path }}</span>
      </div>
    </template>
  </vue-finder>
</template>

<script setup>
const handleAction = (selected) => {
  if (selected.length === 0) {
    alert('No items selected');
    return;
  }
  console.log('Processing:', selected);
  // Your custom logic here
};
</script>
```

#### Example: Multiple Actions

```vue
<template>
  <vue-finder id="multi-action" :driver="driver">
    <template #status-bar="{ selected, count }">
      <div class="action-buttons">
        <button :disabled="count === 0" @click="downloadSelected(selected)">
          Download ({{ count }})
        </button>
        <button :disabled="count === 0" @click="shareSelected(selected)">Share</button>
        <button :disabled="count === 0" @click="deleteSelected(selected)">Delete</button>
      </div>
    </template>
  </vue-finder>
</template>
```

### `icon` Slot

Customize the icon displayed for files and folders. This allows you to use custom icons or styling.

**Scoped Props:**

- `item` - `DirEntry` - The file or folder entry

#### Example: Custom Icon Component

```vue
<template>
  <vue-finder id="icon-example" :driver="driver">
    <template #icon="{ item }">
      <CustomIcon :item="item" />
    </template>
  </vue-finder>
</template>

<script setup>
import CustomIcon from './CustomIcon.vue';

// CustomIcon receives the item and can render custom icons
</script>
```

#### Example: Conditional Icons

```vue
<template>
  <vue-finder id="conditional-icons" :driver="driver">
    <template #icon="{ item }">
      <TextIcon v-if="item.extension === 'txt'" />
      <PDFIcon v-else-if="item.extension === 'pdf'" />
    </template>
  </vue-finder>
</template>

<script setup>
import TextIcon from './TextIcon.vue';
import PDFIcon from './PDFIcon.vue';
</script>
```

If the condition doesn't match, the default icon will be shown automatically.

### MenuBar Slots: `menubar-start`, `menu-items`, `menubar-end`

Add content around the default menu bar, or replace it entirely.

**Scoped Props (all three):**

- `menuItems` - `MenuItem[]` - the default File/Edit/View/Go/Help structure
- `handleMenuAction` - only passed to `menu-items` - closes the open dropdown, then runs the action

#### Example: Add a button after the default menus

```vue
<template>
  <vue-finder id="menubar-extra" :driver="driver">
    <template #menubar-end="{ menuItems }">
      <div class="menubar-chip">{{ menuItems.length }} menus</div>
    </template>
  </vue-finder>
</template>
```

#### Example: Fully replace the menu bar layout

A custom component doesn't have to rely on the scoped props - it can call
`useMenuItems()` directly to get the exact same data (and modal-opening
actions) `MenuBar.vue` uses internally:

```vue
<!-- MyMenuBar.vue -->
<script setup>
import { useMenuItems } from 'vuefinder';

const { menuItems } = useMenuItems();
</script>

<template>
  <div class="my-menu-bar">
    <button v-for="menu in menuItems" :key="menu.id">{{ menu.label }}</button>
  </div>
</template>
```

```vue
<template #menu-items>
  <MyMenuBar />
</template>
```

### `toolbar-items` Slot

Replace the entire toolbar. No scoped props are passed - a custom component
calls `useMenuItems()`/`useFeature()`/`useApp()` itself to reuse the built-in
actions (new folder, upload, rename, delete, archive, view toggles, ...).

```vue
<template #toolbar-items>
  <MyCustomToolbar />
</template>
```

### `breadcrumb-actions` Slot

Replace the action buttons shown before the breadcrumb path - tree-view
toggle, go up, refresh/cancel. No scoped props are passed - a custom
component calls `useBreadcrumbActions()` to reuse the built-in actions
(refresh, go up, toggle tree view) and the reactive `currentPath`.

The path container itself (the breadcrumb trail, with overflow measurement,
drag & drop, the hidden-item dropdown, and path-copy mode) is intentionally
**not** slotted - it's complex enough that reimplementing it wouldn't make
sense, so it always renders as-is, right after this slot.

```vue
<!-- MyBreadcrumbActions.vue -->
<script setup>
import { useBreadcrumbActions } from 'vuefinder';

const breadcrumb = useBreadcrumbActions();
</script>

<template>
  <div class="my-breadcrumb-actions">
    <button @click="breadcrumb.toggleTreeView()">Tree</button>
    <button @click="breadcrumb.goUp()">Go Up</button>
    <button @click="breadcrumb.refresh()">Refresh</button>
  </div>
</template>
```

```vue
<template #breadcrumb-actions>
  <MyBreadcrumbActions />
</template>
```

To merge menu bar, toolbar and breadcrumb actions into a single custom bar,
combine `menu-items` with `showToolbar: false` in the `config` prop (add
`showBreadcrumbBar: false` too if you don't need the default path trail
alongside it) - see the "MenuBar Customization" example for a full
walkthrough.

### `tree-view` Slot

Replace the tree view's content (the pinned-folders header and the storage list) with your own component. This is useful for a fully custom tree layout - e.g. grouping storages differently, or rendering pinned folders as chips instead of a list.

**Scoped Props:**

- `pinnedFolders` - `PinnedFolder[]` - Currently pinned folders
- `pinnedFoldersOpened` - `boolean` - Whether the pinned-folders section is expanded
- `togglePinnedFoldersOpened` - `() => void` - Toggle the pinned-folders section
- `removePin` - `(folder: PinnedFolder) => void` - Unpin a folder
- `storages` - `string[]` - Configured storage names
- `currentPath` - `CurrentPathState` - Current path state (`{ storage, path, breadcrumb }`)
- `openPath` - `(path: string) => void` - Navigate to a path

#### Example: Simple Storage Switcher

```vue
<template>
  <vue-finder id="tree-view-example" :driver="driver" :config="{ showTreeView: true }">
    <template #tree-view="{ storages, currentPath, openPath }">
      <div class="storage-switcher">
        <button
          v-for="storage in storages"
          :key="storage"
          :class="{ active: currentPath.storage === storage }"
          @click="openPath(storage + '://')"
        >
          {{ storage }}
        </button>
      </div>
    </template>
  </vue-finder>
</template>
```

#### Example: Custom Component via `useTreeViewActions`

For anything beyond what the scoped props expose, a custom component can call `useTreeViewActions()` itself - it reuses the exact same pinned-folders and navigation logic as the default `TreeView.vue`, so it isn't limited to the props passed through the slot.

```vue
<!-- CustomTreeView.vue -->
<script setup>
import { useTreeViewActions } from 'vuefinder';

const {
  storages,
  currentPath,
  pinnedFoldersOpened,
  togglePinnedFoldersOpened,
  removePin,
  openPath,
} = useTreeViewActions();
</script>

<template>
  <div class="custom-tree-view">
    <button @click="togglePinnedFoldersOpened">
      {{ pinnedFoldersOpened ? 'Hide' : 'Show' }} Pinned
    </button>
    <ul v-for="storage in storages" :key="storage">
      <li :class="{ active: currentPath.storage === storage }" @click="openPath(storage + '://')">
        {{ storage }}
      </li>
    </ul>
  </div>
</template>
```

```vue
<template>
  <vue-finder id="tree-view-custom" :driver="driver" :config="{ showTreeView: true }">
    <template #tree-view>
      <CustomTreeView />
    </template>
  </vue-finder>
</template>

<script setup>
import CustomTreeView from './CustomTreeView.vue';
</script>
```

For complete slot reference, see [API Reference - Slots](../api-reference/slots.md).
