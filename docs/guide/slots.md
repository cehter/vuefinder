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

### `breadcrumb-items` Slot

Replace the entire breadcrumb bar. No scoped props are passed - a custom
component calls `useBreadcrumbActions()` to reuse the built-in navigation
actions (refresh, go up, toggle tree view, copy path) and the reactive
`currentPath`.

```vue
<!-- MyBreadcrumb.vue -->
<script setup>
import { useBreadcrumbActions } from 'vuefinder';

const breadcrumb = useBreadcrumbActions();
</script>

<template>
  <div class="my-breadcrumb">
    <span>{{ breadcrumb.currentPath.path }}</span>
    <button @click="breadcrumb.refresh()">Refresh</button>
    <button @click="breadcrumb.goUp()">Go Up</button>
  </div>
</template>
```

```vue
<template #breadcrumb-items>
  <MyBreadcrumb />
</template>
```

To merge everything into a single custom bar, combine `menu-items` with
`showToolbar: false` and `showBreadcrumbBar: false` in the `config` prop - see
the "MenuBar Customization" example for a full walkthrough.

For complete slot reference, see [API Reference - Slots](../api-reference/slots.md).
