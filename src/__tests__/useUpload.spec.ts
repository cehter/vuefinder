import { afterEach, describe, expect, it } from 'vitest';
import { defineComponent, h, provide } from 'vue';
import { mount } from '@vue/test-utils';
import { atom } from 'nanostores';
import useUpload, { QUEUE_ENTRY_STATUS } from '../composables/useUpload';
import { registerApp, unregisterApp, ServiceContainerIdKey } from '../composables/useApp';
import type { App } from '../types';

function createTestApp() {
  const app = {
    debug: false,
    i18n: { t: (key: string) => key },
    fs: {
      path: atom({ storage: 'local', path: 'local://docs', breadcrumb: [] }),
    },
    config: {
      get: (_key: string) => null,
    },
    filesize: (bytes: number) => `${bytes} B`,
    adapter: {
      invalidateListQuery: () => {},
      open: async () => undefined,
    },
    emitter: { emit: () => {} },
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
  return { wrapper, get result() {
    return result;
  } };
}

describe('useUpload', () => {
  const id = 'upload-test';

  afterEach(() => {
    unregisterApp(id);
  });

  it('addExternalFiles() keeps adding remaining files after one is rejected by a restriction', () => {
    const app = createTestApp();
    registerApp(id, app);

    // Mirrors a real driver's configureUploader (e.g. GcsDriver.configureUploader),
    // which restricts uploads to a fixed set of file types.
    const customUploader = (uppy: any) => {
      uppy.setOptions({ restrictions: { allowedFileTypes: ['.txt'] } });
      uppy.addUploader(async () => {});
    };

    const { result } = mountComposable(id, () => useUpload(customUploader));

    const rejected = new File(['payload'], 'malware.exe', { type: 'application/x-msdownload' });
    const allowedA = new File(['payload'], 'a.txt', { type: 'text/plain' });
    const allowedB = new File(['payload'], 'b.txt', { type: 'text/plain' });

    // The rejected file sits between two valid ones - before the fix, uppy.addFile()
    // throwing synchronously on the rejected file aborted the forEach loop entirely,
    // so b.txt (added after it) never made it into the queue.
    result.addExternalFiles([allowedA, rejected, allowedB]);

    expect(result.queue.value.map((entry) => entry.name)).toEqual(
      expect.arrayContaining(['a.txt', 'malware.exe', 'b.txt'])
    );
    expect(result.queue.value).toHaveLength(3);

    const rejectedEntry = result.queue.value.find((entry) => entry.name === 'malware.exe');
    expect(rejectedEntry?.status).toBe(QUEUE_ENTRY_STATUS.REJECTED);
    expect(rejectedEntry?.statusName).toBeTruthy();

    const okA = result.queue.value.find((entry) => entry.name === 'a.txt');
    const okB = result.queue.value.find((entry) => entry.name === 'b.txt');
    expect(okA?.status).toBe(QUEUE_ENTRY_STATUS.PENDING);
    expect(okB?.status).toBe(QUEUE_ENTRY_STATUS.PENDING);
  });

  it('addExternalFiles() only accepts .txt, .md and .pdf when restricted to those types', () => {
    const app = createTestApp();
    registerApp(id, app);

    const customUploader = (uppy: any) => {
      uppy.setOptions({ restrictions: { allowedFileTypes: ['.txt', '.md', '.pdf'] } });
      uppy.addUploader(async () => {});
    };

    const { result } = mountComposable(id, () => useUpload(customUploader));

    const notes = new File(['payload'], 'notes.txt', { type: 'text/plain' });
    const readme = new File(['payload'], 'readme.md', { type: 'text/markdown' });
    const report = new File(['payload'], 'report.pdf', { type: 'application/pdf' });
    const sheet = new File(['payload'], 'sheet.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const image = new File(['payload'], 'photo.png', { type: 'image/png' });

    result.addExternalFiles([notes, sheet, readme, image, report]);

    expect(result.queue.value).toHaveLength(5);

    const allowedNames = ['notes.txt', 'readme.md', 'report.pdf'];
    const disallowedNames = ['sheet.xlsx', 'photo.png'];

    allowedNames.forEach((name) => {
      const entry = result.queue.value.find((e) => e.name === name);
      expect(entry?.status).toBe(QUEUE_ENTRY_STATUS.PENDING);
    });

    disallowedNames.forEach((name) => {
      const entry = result.queue.value.find((e) => e.name === name);
      expect(entry?.status).toBe(QUEUE_ENTRY_STATUS.REJECTED);
      expect(entry?.statusName).toBeTruthy();
    });
  });
});
