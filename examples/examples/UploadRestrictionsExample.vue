<script setup lang="ts">
import { ref } from 'vue';
import type { Driver } from '../../src/adapters';

interface Props {
  driver: Driver;
  config: Record<string, unknown>;
  features: unknown;
}

const props = defineProps<Props>();

// Only these extensions may be uploaded - everything else is rejected by
// Uppy's `restrictions.allowedFileTypes` inside customUploader below.
const allowedFileTypes = ref<string[]>(['.txt', '.md', '.pdf']);
const newExtension = ref('');
const uploadedFiles = ref<string[]>([]);

const addExtension = () => {
  const ext = newExtension.value.trim().toLowerCase();
  if (!ext) return;
  const normalized = ext.startsWith('.') ? ext : `.${ext}`;
  if (!allowedFileTypes.value.includes(normalized)) {
    allowedFileTypes.value.push(normalized);
  }
  newExtension.value = '';
};

const removeExtension = (ext: string) => {
  const index = allowedFileTypes.value.indexOf(ext);
  if (index > -1) allowedFileTypes.value.splice(index, 1);
};

// Applies the restriction on top of whatever the real driver needs for the
// actual upload (XHR endpoint, IndexedDB persistence, ...), so this demo
// still performs a real upload for allowed files instead of a dead end.
const customUploader = (uppy: any, context: { getTargetPath: () => string }) => {
  uppy.setOptions({ restrictions: { allowedFileTypes: allowedFileTypes.value } });
  props.driver.configureUploader?.(uppy, context);
};

const handleUploadComplete = (files: { basename?: string; path: string }[]) => {
  uploadedFiles.value = files.map((f) => f.basename || f.path.split('/').pop() || f.path);
};
</script>

<template>
  <div class="upload-restrictions-example">
    <div class="upload-restrictions-example__header">
      <h2 class="upload-restrictions-example__title">Upload File Type Restrictions Demo</h2>
      <p class="upload-restrictions-example__description">
        This example restricts <em>uploads</em> to a fixed set of file extensions via
        <code>customUploader</code> + Uppy's <code>restrictions.allowedFileTypes</code>. Drop a
        batch that mixes allowed and disallowed files - the disallowed ones are marked as errored
        in the upload dialog, while the allowed ones still get queued and uploaded.
      </p>
    </div>

    <div class="upload-restrictions-example__viewer">
      <vue-finder
        id="upload-restrictions-vuefinder"
        :driver="driver"
        :config="config"
        :features="{ ...features, upload: true }"
        :custom-uploader="customUploader"
        @upload-complete="handleUploadComplete"
      />
    </div>

    <div class="upload-restrictions-example__section">
      <div class="upload-restrictions-example__section-header">
        <h3 class="upload-restrictions-example__section-title">Allowed File Types</h3>
      </div>

      <div class="upload-restrictions-example__badge-list">
        <span
          v-for="ext in allowedFileTypes"
          :key="ext"
          class="upload-restrictions-example__badge"
        >
          {{ ext }}
          <button
            type="button"
            class="upload-restrictions-example__badge-remove"
            @click="removeExtension(ext)"
          >
            ×
          </button>
        </span>
        <span v-if="!allowedFileTypes.length" class="upload-restrictions-example__empty">
          No restriction - all file types are accepted
        </span>
      </div>

      <div class="upload-restrictions-example__field">
        <input
          v-model="newExtension"
          type="text"
          class="upload-restrictions-example__input"
          placeholder=".png"
          @keyup.enter="addExtension"
        />
        <button
          type="button"
          class="upload-restrictions-example__filter-btn"
          @click="addExtension"
        >
          + Add Extension
        </button>
      </div>
    </div>

    <div class="upload-restrictions-example__info-section">
      <h3 class="upload-restrictions-example__info-title">
        Uploaded ({{ uploadedFiles.length }} files):
      </h3>
      <div v-if="uploadedFiles.length" class="upload-restrictions-example__selection-list">
        <div
          v-for="name in uploadedFiles"
          :key="name"
          class="upload-restrictions-example__selection-item"
        >
          {{ name }}
        </div>
      </div>
      <div v-else class="upload-restrictions-example__empty">Nothing uploaded yet</div>
    </div>

    <div class="upload-restrictions-example__instructions">
      <h3 class="upload-restrictions-example__instructions-title">How to Test:</h3>
      <ol class="upload-restrictions-example__instructions-list">
        <li>Open the upload dialog and select or drop a mix of e.g. a .txt, a .md/.pdf and a .png file</li>
        <li>The .png entry is marked as an error in the dialog and stays visible - it is not silently dropped</li>
        <li>The .txt/.md/.pdf entries stay pending and can still be uploaded from the same batch</li>
        <li>Add/remove extensions above to change what's allowed and try again</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.upload-restrictions-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.upload-restrictions-example__header {
  margin-bottom: 0.5rem;
}

.upload-restrictions-example__title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
}

.upload-restrictions-example__description {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}

.upload-restrictions-example__description code {
  background: #f3f4f6;
  padding: 0.0625rem 0.3125rem;
  border-radius: 3px;
  font-size: 0.8125rem;
}

.upload-restrictions-example__viewer {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
}

.upload-restrictions-example__section {
  padding: 0.75rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #4caf50;
  border-radius: 8px;
}

.upload-restrictions-example__section-header {
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.upload-restrictions-example__section-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.upload-restrictions-example__badge-list {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.upload-restrictions-example__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.1875rem 0.5rem;
  background: #374151;
  color: #ffffff;
  border-radius: 10px;
  font-size: 0.6875rem;
  font-weight: 500;
}

.upload-restrictions-example__badge-remove {
  padding: 0;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.upload-restrictions-example__badge-remove:hover {
  opacity: 0.7;
}

.upload-restrictions-example__field {
  display: flex;
  gap: 0.5rem;
}

.upload-restrictions-example__input {
  flex: 1;
  padding: 0.375rem 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  font-size: 0.75rem;
}

.upload-restrictions-example__input:focus {
  outline: none;
  border-color: #374151;
  box-shadow: 0 0 0 3px rgba(55, 65, 81, 0.1);
}

.upload-restrictions-example__filter-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: #ffffff;
  color: #374151;
  font-size: 0.6875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.upload-restrictions-example__filter-btn:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.upload-restrictions-example__info-section {
  padding: 0.75rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.upload-restrictions-example__info-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.upload-restrictions-example__selection-list {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 0.5rem;
}

.upload-restrictions-example__selection-item {
  padding: 0.375rem 0.5rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  color: #374151;
}

.upload-restrictions-example__selection-item:last-child {
  margin-bottom: 0;
}

.upload-restrictions-example__empty {
  color: #6b7280;
  font-style: italic;
  font-size: 0.75rem;
}

.upload-restrictions-example__instructions {
  padding: 0.75rem;
  background: #fff3e0;
  border: 1px solid #ff9800;
  border-left: 4px solid #ff9800;
  border-radius: 8px;
}

.upload-restrictions-example__instructions-title {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.upload-restrictions-example__instructions-list {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.75rem;
  color: #374151;
  line-height: 1.6;
}

.upload-restrictions-example__instructions-list li {
  margin-bottom: 0.375rem;
}

.upload-restrictions-example__instructions-list li:last-child {
  margin-bottom: 0;
}
</style>
