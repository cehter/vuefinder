---
outline: deep
---

# Slots

Complete reference of all VueFinder slots.

## Available Slots

| Slot         | Scoped Props                | Description                  |
| ------------ | --------------------------- | ---------------------------- |
| `status-bar` | `{ selected, count, path }` | Customize status bar content |
| `icon`       | `{ item }`                  | Customize file/folder icons  |
| `tree-view`  | `{ pinnedFolders, pinnedFoldersOpened, togglePinnedFoldersOpened, removePin, storages, currentPath, openPath }` | Replace the tree view's content (pinned folders + storage list) |

## Slot Details

### `status-bar`

Customize the status bar with your own content.

**Scoped Props:**

- `selected` - `DirEntry[]` - Currently selected items
- `count` - `number` - Number of selected items
- `path` - `string` - Current path

```vue
<template #status-bar="{ selected, count, path }">
  <div class="custom-status">
    <button @click="handleAction(selected)">Action ({{ count }})</button>
    <span>{{ path }}</span>
  </div>
</template>
```

### `icon`

Customize the icon displayed for files and folders.

**Scoped Props:**

- `item` - `DirEntry` - The file or folder entry

```vue
<template #icon="{ item }">
  <CustomIcon :item="item" />
</template>
```

### `tree-view`

Replace the tree view's content (the pinned-folders header and storage list) with your own component. Falls back to the default rendering if left unused.

**Scoped Props:**

- `pinnedFolders` - `PinnedFolder[]` - Currently pinned folders
- `pinnedFoldersOpened` - `boolean` - Whether the pinned-folders section is expanded
- `togglePinnedFoldersOpened` - `() => void` - Toggle the pinned-folders section
- `removePin` - `(folder: PinnedFolder) => void` - Unpin a folder
- `storages` - `string[]` - Configured storage names
- `currentPath` - `CurrentPathState` - Current path state (`{ storage, path, breadcrumb }`)
- `openPath` - `(path: string) => void` - Navigate to a path

```vue
<template #tree-view="{ storages, openPath }">
  <button v-for="storage in storages" :key="storage" @click="openPath(storage + '://')">
    {{ storage }}
  </button>
</template>
```

For a fully custom tree, reuse [`useTreeViewActions`](../guide/slots.md#tree-view-slot) directly instead of relying only on the scoped props.

For usage examples and common patterns, see [Guide - Slots](../guide/slots.md).
