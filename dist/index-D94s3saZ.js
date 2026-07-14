import { inject as Ct, reactive as Et, watch as pe, ref as M, computed as R, shallowRef as vt, markRaw as go, defineComponent as re, onMounted as we, nextTick as Ae, openBlock as u, createElementBlock as _, withKeys as Ke, unref as a, createElementVNode as o, withModifiers as _e, normalizeStyle as Me, normalizeClass as te, renderSlot as ke, createCommentVNode as j, toDisplayString as w, createBlock as X, resolveDynamicComponent as On, withCtx as ie, createVNode as G, Fragment as fe, renderList as ge, withDirectives as he, vModelCheckbox as lt, vModelText as We, onBeforeUnmount as wt, defineAsyncComponent as Ln, Suspense as Rn, vShow as Ge, onUnmounted as Ie, useTemplateRef as st, createStaticVNode as St, createTextVNode as ye, createSlots as yo, Teleport as bt, resolveComponent as Bn, customRef as wo, isRef as bo, vModelSelect as Kt, vModelRadio as zt, mergeProps as qe, toHandlers as Ze, normalizeProps as Pe, guardReactiveProps as Ee, onUpdated as ko, useModel as zn, mergeModels as $o, Transition as xo, provide as So } from "vue";
import Co from "mitt";
import { useStore as oe } from "@nanostores/vue";
import { persistentAtom as Vn } from "@nanostores/persistent";
import { toast as xt, Toaster as Fo } from "vue-sonner";
import { atom as Be, computed as Je } from "nanostores";
import { QueryClient as Po, isCancelledError as Eo } from "@tanstack/vue-query";
import To from "@uppy/core";
import qt from "vanilla-lazyload";
import { Cropper as Do } from "vue-advanced-cropper";
import { OverlayScrollbars as ft, SizeObserverPlugin as Mo } from "overlayscrollbars";
import { computePosition as at, offset as _t, flip as pt, shift as mt, autoUpdate as Xt } from "@floating-ui/dom";
import Io from "@viselect/vanilla";
import Ao from "@uppy/xhr-upload";
const Qt = /* @__PURE__ */ new Map(), Wt = /* @__PURE__ */ Symbol("ServiceContainerId");
function Oo(n, e) {
  Qt.set(n, e);
}
function Lo(n) {
  Qt.delete(n);
}
function le(n) {
  const e = n ?? Ct(Wt);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Qt.get(e);
  if (!t)
    throw new Error(
      `VueFinder app instance with id "${e}" was not found. Make sure the VueFinder component with id="${e}" is mounted.`
    );
  return t;
}
function Ro(n) {
  const e = localStorage.getItem(n + "_storage"), t = Et(JSON.parse(e ?? "{}"));
  pe(t, s);
  function s() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function i(c, f) {
    t[c] = f;
  }
  function r(c) {
    delete t[c];
  }
  function l() {
    Object.keys(t).forEach((c) => r(c));
  }
  return { getStore: (c, f = null) => c in t ? t[c] : f, setStore: i, removeStore: r, clearStore: l };
}
function Te(n, e = "An error occurred") {
  if (!n)
    return e;
  if (typeof n == "string")
    return n || e;
  if (n instanceof Error)
    return n.message || e;
  if (typeof n == "object" && n !== null) {
    const t = n;
    if (typeof t.message == "string" && t.message)
      return t.message;
    if (typeof t.error == "string" && t.error)
      return t.error;
  }
  return e;
}
function Bo(n, e) {
  return Vn(n, e, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
}
function zo(n) {
  if (!n?.config?.get)
    return !0;
  try {
    return !!n.config.get("notificationsEnabled");
  } catch {
    return !0;
  }
}
function ot(n, e, t) {
  const s = { type: e, message: t };
  if (n?.emitter?.emit?.("vf-notify", s), !!zo(n))
    switch (e) {
      case "success":
        xt.success(t);
        break;
      case "error":
        xt.error(t);
        break;
      case "warning":
        xt.warning(t);
        break;
      default:
        xt.info(t);
        break;
    }
}
function Ve(n) {
  return {
    success(e) {
      ot(n, "success", e);
    },
    error(e) {
      ot(n, "error", e);
    },
    info(e) {
      ot(n, "info", e);
    },
    warning(e) {
      ot(n, "warning", e);
    },
    emit(e, t) {
      ot(n, e, t);
    }
  };
}
const Vt = /* @__PURE__ */ new Map();
async function Ut(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function Vo(n, e, t, s, i) {
  const r = Ve({ emitter: t, config: i }), l = "vuefinder_locale", d = "global";
  let c;
  if (Vt.has(d))
    c = Vt.get(d), e && e !== c.get() && c.set(e);
  else {
    const S = localStorage.getItem(l) ? JSON.parse(localStorage.getItem(l)) : null;
    c = Bo(l, e || S || "en"), Vt.set(d, c);
  }
  const f = "vuefinder_translations", m = (S) => {
    try {
      const I = localStorage.getItem(f);
      if (I)
        return JSON.parse(I)[S] || null;
    } catch {
    }
    return null;
  }, p = (S, I) => {
    try {
      const T = localStorage.getItem(f), L = T ? JSON.parse(T) : {};
      L[S] = I, localStorage.setItem(f, JSON.stringify(L));
    } catch {
    }
  }, v = oe(c), k = String(v.value), b = m(k), $ = M(b || {});
  let h = !1;
  !b && Object.keys(s).length > 0 && Ut(k, s).then((S) => {
    $.value = S, p(k, S);
  }).catch(() => {
  }), pe(
    v,
    async (S, I) => {
      if (I && S === I)
        return;
      if (!h) {
        h = !0;
        const L = m(String(S));
        if (L)
          $.value = L;
        else if (Object.keys(s).length > 0)
          try {
            const q = await Ut(String(S), s);
            $.value = q, p(String(S), q);
          } catch {
          }
        return;
      }
      const T = m(String(S));
      if (T)
        $.value = T;
      else
        try {
          const L = await Ut(String(S), s);
          $.value = L, p(String(S), L);
        } catch (L) {
          const q = Te(L, "Locale cannot be loaded!");
          r.error(q);
          return;
        }
      Object.values(s).length > 1 && (r.success("The language is set to " + S), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const y = (S, ...I) => I.length ? y(S = S.replace("%s", String(I.shift())), ...I) : S;
  function g(S, ...I) {
    return $.value && Object.prototype.hasOwnProperty.call($.value, S) ? y($.value[S] || S, ...I) : y(S, ...I);
  }
  const C = R({
    get: () => v.value,
    set: (S) => {
      c.set(S);
    }
  });
  return Et({ t: g, locale: C, localeAtom: c });
}
const Uo = [
  "edit",
  "newfile",
  "newfolder",
  "preview",
  "archive",
  "unarchive",
  "search",
  "rename",
  "upload",
  "delete",
  "fullscreen",
  "download",
  "language",
  "move",
  "copy",
  "history",
  "theme",
  "pinned"
], Un = {
  simple: {
    search: !0,
    preview: !0,
    rename: !0,
    upload: !0,
    delete: !0,
    newfile: !0,
    newfolder: !0,
    download: !0
  },
  advanced: Uo.reduce((n, e) => (n[e] = !0, n), {})
};
function gn() {
  return Un.advanced;
}
function Nn(n) {
  return n ? n === "simple" || n === "advanced" ? { ...Un[n] } : { ...gn(), ...n } : gn();
}
const No = "4.6.0-cehter.1";
function Jt(n, e, t, s, i) {
  return e = Math, t = e.log, s = 1024, i = t(n) / t(s) | 0, (n / e.pow(s, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function Hn(n, e, t, s, i) {
  return e = Math, t = e.log, s = 1e3, i = t(n) / t(s) | 0, (n / e.pow(s, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function Ho(n) {
  if (typeof n == "number") return n;
  const e = { k: 1, m: 2, g: 3, t: 4 }, s = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(n);
  if (!s) return 0;
  const i = parseFloat(s[1] || "0"), r = (s[2] || "").toLowerCase(), l = e[r] ?? 0;
  return Math.round(i * Math.pow(1024, l));
}
function jo(n) {
  const e = vt(null), t = M(!1), s = M(), i = M(!1), r = vt(null);
  return {
    visible: t,
    type: e,
    data: s,
    open: (p, v = null) => {
      n.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = p, s.value = v;
    },
    close: () => {
      n.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null, i.value = !1, r.value = null;
    },
    setEditMode: (p) => {
      i.value = p;
    },
    editMode: i,
    controls: r,
    registerControls: (p) => {
      r.value = p;
    },
    unregisterControls: (p) => {
      r.value === p && (r.value = null);
    }
  };
}
const Ft = {
  view: "grid",
  theme: "silver",
  fullScreen: !1,
  showTreeView: !1,
  showHiddenFiles: !0,
  metricUnits: !1,
  showThumbnails: !0,
  persist: !1,
  path: "",
  pinnedFolders: [],
  notificationsEnabled: !0,
  expandTreeByDefault: !1,
  expandedTreePaths: []
}, Pt = {
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: "circular",
  showMenuBar: !0,
  showToolbar: !0,
  showBreadcrumbBar: !0,
  gridItemWidth: 96,
  gridItemHeight: 80,
  gridItemGap: 8,
  gridIconSize: 48,
  listItemHeight: 32,
  listItemGap: 2,
  listIconSize: 16,
  notificationPosition: "bottom-center",
  notificationDuration: 3e3,
  notificationVisibleToasts: 4,
  notificationRichColors: !0,
  closeUploadModalOnSubmit: !1
}, Ko = new Set(
  Object.keys(Pt)
);
function qo(n) {
  return n || "silver";
}
function jn(n) {
  return Ko.has(n);
}
function yn(n) {
  const e = {}, t = {}, s = n;
  for (const i in s)
    if (jn(i))
      t[i] = s[i];
    else if (i in Ft) {
      const r = i;
      e[r] = s[i];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function wn(n, e) {
  const t = { ...Ft, ...n, ...e };
  return t.theme = qo(t.theme), t;
}
function bn(n, e) {
  return { ...Pt, ...e, ...n };
}
const Wo = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: s, nonPersistenceConfig: i } = yn(e), r = wn(
    s,
    Ft
  ), l = bn(
    i,
    Pt
  ), d = Vn(
    t,
    r,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = Be(l), f = Je(
    [d, c],
    (h, y) => ({
      ...h,
      ...y
    })
  ), m = (h = {}) => {
    const y = d.get(), g = c.get(), { persistenceConfig: C, nonPersistenceConfig: S } = yn(h), I = wn(C, y), T = bn(
      S,
      g
    );
    d.set(I), c.set(T);
  }, p = (h) => jn(h) ? c.get()[h] : d.get()[h], v = () => ({
    ...d.get(),
    ...c.get()
  }), k = (h, y) => {
    const g = d.get();
    typeof h == "object" && h !== null ? d.set({ ...g, ...h }) : d.set({
      ...g,
      [h]: y
    });
  };
  return {
    // Store atom (combined)
    state: f,
    // Methods
    init: m,
    get: p,
    set: k,
    toggle: (h) => {
      const y = d.get();
      k(h, !y[h]);
    },
    all: v,
    reset: () => {
      d.set({ ...Ft }), c.set({ ...Pt });
    }
  };
}, $e = (n) => `${n.type}:${n.path}`;
function Kn(n, e) {
  if (typeof n == "string" && typeof e == "string")
    return n.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(n) || 0, s = Number(e) || 0;
  return t === s ? 0 : t < s ? -1 : 1;
}
const Go = () => {
  const n = Be(""), e = Be([]), t = Be(!1), s = Be([]), i = Be({ active: !1, column: "", order: "" }), r = Be({
    kind: "all",
    showHidden: !1
  }), l = Be(/* @__PURE__ */ new Set()), d = Be({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Be(null), f = Be(0), m = Be(!1), p = Be([]), v = Be(-1), k = Je([n], (J) => {
    const ne = (J ?? "").trim(), ae = ne.indexOf("://"), de = ae >= 0 ? ne.slice(0, ae) : "", De = (ae >= 0 ? ne.slice(ae + 3) : ne).split("/").filter(Boolean);
    let Ce = "";
    const Ye = De.map((Le) => (Ce = Ce ? `${Ce}/${Le}` : Le, {
      basename: Le,
      name: Le,
      path: de ? `${de}://${Ce}` : Ce,
      type: "dir"
    }));
    return { storage: de, breadcrumb: Ye, path: ne };
  }), b = Je([s, i, r], (J, ne, ae) => {
    let de = J;
    ae.kind === "files" ? de = de.filter((Le) => Le.type === "file") : ae.kind === "folders" && (de = de.filter((Le) => Le.type === "dir")), ae.showHidden || (de = de.filter((Le) => !Le.basename.startsWith(".")));
    const { active: He, column: De, order: Ce } = ne;
    if (!He || !De) return de;
    const Ye = Ce === "asc" ? 1 : -1;
    return de.slice().sort((Le, Rt) => Kn(Le[De], Rt[De]) * Ye);
  }), $ = Je([s, l], (J, ne) => ne.size === 0 ? [] : J.filter((ae) => ne.has($e(ae)))), h = (J, ne) => {
    const ae = n.get();
    if ((ne ?? !0) && ae !== J) {
      const de = p.get(), He = v.get();
      He < de.length - 1 && de.splice(He + 1), de.length === 0 && ae && de.push(ae), de.push(J), p.set([...de]), v.set(de.length - 1);
    }
    n.set(J);
  }, y = (J) => {
    s.set(J ?? []);
  }, g = (J) => {
    e.set(J ?? []);
  }, C = (J, ne) => {
    i.set({ active: !0, column: J, order: ne });
  }, S = (J) => {
    const ne = i.get();
    ne.active && ne.column === J ? i.set({
      active: ne.order === "asc",
      column: J,
      order: "desc"
    }) : i.set({
      active: !0,
      column: J,
      order: "asc"
    });
  }, I = () => {
    i.set({ active: !1, column: "", order: "" });
  }, T = (J, ne) => {
    r.set({ kind: J, showHidden: ne });
  }, L = () => {
    r.set({ kind: "all", showHidden: !1 });
  }, q = (J, ne = "multiple") => {
    const ae = new Set(l.get());
    ne === "single" && ae.clear(), ae.add(J), l.set(ae);
  }, Z = (J, ne = "multiple") => {
    const ae = new Set(l.get());
    ne === "single" && ae.clear(), J.forEach((de) => ae.add(de)), l.set(ae);
  }, ee = (J) => {
    const ne = new Set(l.get());
    ne.delete(J), l.set(ne);
  }, Q = (J) => l.get().has(J), W = (J, ne = "multiple") => {
    const ae = new Set(l.get());
    ae.has(J) ? ae.delete(J) : (ne === "single" && ae.clear(), ae.add(J)), l.set(ae);
  }, P = (J = "multiple", ne) => {
    if (J === "single") {
      const ae = s.get()[0];
      if (ae) {
        const de = $e(ae);
        l.set(/* @__PURE__ */ new Set([de])), f.set(1);
      }
    } else {
      if (ne?.selectionFilterType || ne?.selectionFilterMimeIncludes && ne.selectionFilterMimeIncludes.length > 0) {
        const ae = s.get().filter((de) => {
          const He = ne.selectionFilterType, De = ne.selectionFilterMimeIncludes;
          return He === "files" && de.type === "dir" || He === "dirs" && de.type === "file" ? !1 : De && Array.isArray(De) && De.length > 0 && de.type !== "dir" ? de.mime_type ? De.some((Ce) => de.mime_type?.startsWith(Ce)) : !1 : !0;
        }).map((de) => $e(de));
        l.set(new Set(ae));
      } else {
        const ae = new Set(s.get().map((de) => $e(de)));
        l.set(ae);
      }
      Y(l.get().size);
    }
  }, D = () => {
    l.set(/* @__PURE__ */ new Set()), f.set(0);
  }, U = (J) => {
    const ne = new Set(J ?? []), ae = new Set(
      s.get().filter((de) => ne.has(de.path)).map((de) => $e(de))
    );
    l.set(ae), f.set(ae.size);
  }, Y = (J) => {
    f.set(J);
  }, ue = (J) => {
    m.set(!!J);
  }, B = () => m.get(), x = (J, ne) => {
    const ae = s.get().filter((de) => ne.has($e(de)));
    d.set({
      type: J,
      path: k.get().path,
      items: new Set(ae)
    });
  }, z = (J) => Je([d], (ne) => ne.type === "cut" && Array.from(ne.items).some((ae) => $e(ae) === J)), F = (J) => Je([d], (ne) => ne.type === "copy" && Array.from(ne.items).some((ae) => $e(ae) === J)), V = (J) => {
    const ne = z(J);
    return oe(ne).value ?? !1;
  }, A = (J) => {
    const ne = F(J);
    return oe(ne).value ?? !1;
  }, O = () => {
    d.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, H = () => d.get(), E = (J) => {
    c.set(J);
  }, N = () => c.get(), ce = () => {
    c.set(null);
  }, me = () => {
    const J = p.get(), ne = v.get();
    if (ne > 0) {
      const ae = ne - 1, de = J[ae];
      de && (v.set(ae), h(de, !1));
    }
  }, K = () => {
    const J = p.get(), ne = v.get();
    if (ne < J.length - 1) {
      const ae = ne + 1, de = J[ae];
      de && (v.set(ae), h(de, !1));
    }
  }, se = Je([v], (J) => J > 0), ve = Je(
    [p, v],
    (J, ne) => ne < J.length - 1
  );
  return {
    // Atoms (state)
    files: s,
    storages: e,
    currentPath: n,
    sort: i,
    filter: r,
    selectedKeys: l,
    selectedCount: f,
    loading: m,
    draggedItem: c,
    clipboardItems: d,
    // Computed values
    path: k,
    sortedFiles: b,
    selectedItems: $,
    // Actions
    setPath: h,
    setFiles: y,
    setStorages: g,
    setSort: C,
    toggleSort: S,
    clearSort: I,
    setFilter: T,
    clearFilter: L,
    select: q,
    selectMultiple: Z,
    deselect: ee,
    toggleSelect: W,
    selectAll: P,
    isSelected: Q,
    clearSelection: D,
    setSelection: U,
    setSelectedCount: Y,
    setLoading: ue,
    isLoading: B,
    setClipboard: x,
    createIsCut: z,
    createIsCopied: F,
    isCut: V,
    isCopied: A,
    clearClipboard: O,
    getClipboard: H,
    setDraggedItem: E,
    getDraggedItem: N,
    clearDraggedItem: ce,
    setReadOnly: (J) => {
      t.set(J);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (J) => t.get() ? !0 : J.read_only ?? !1,
    // Navigation
    goBack: me,
    goForward: K,
    canGoBack: se,
    canGoForward: ve,
    navigationHistory: p,
    historyIndex: v
  };
};
class Zt {
  /**
   * Validate that required parameters are provided
   */
  validateParam(e, t) {
    if (e == null)
      throw new Error(`${t} is required`);
  }
  /**
   * Validate that a file path is provided
   */
  validatePath(e) {
    if (!e)
      throw new Error("Path must be a non-empty string");
  }
  /**
   * Extract storage and path from a combined path string
   * Format: "storage://path" or just "path"
   */
  parsePath(e) {
    if (!e)
      return {};
    if (e.includes("://")) {
      const [t, ...s] = e.split("://");
      return { storage: t, path: s.join("://") };
    }
    return { path: e };
  }
  /**
   * Combine storage and path into a single path string
   */
  combinePath(e, t) {
    return e && t ? `${e}://${t}` : t || "";
  }
}
class Yo extends Zt {
  filesSource;
  defaultStorage;
  storages;
  storagesSet;
  readOnly;
  contentStore;
  constructor(e) {
    super(), this.filesSource = e.files;
    const t = e.storages && e.storages.length > 0 ? e.storages : [e.storage || "memory"];
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "memory", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.contentStore = e.contentStore || /* @__PURE__ */ new Map();
  }
  get files() {
    return Array.isArray(this.filesSource) ? this.filesSource : this.filesSource.value;
  }
  set files(e) {
    Array.isArray(this.filesSource) ? (this.filesSource.length = 0, this.filesSource.push(...e)) : this.filesSource.value = e;
  }
  ensureWritable() {
    if (this.readOnly)
      throw new Error("Driver is read-only");
  }
  ensureStorageSupported(e) {
    if (!this.storagesSet.has(e))
      throw new Error(`Unsupported storage: ${e}`);
  }
  combine(e, t = this.defaultStorage) {
    this.ensureStorageSupported(t);
    const s = e ?? "";
    return s === "" ? `${t}://` : `${t}://${s}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  normalizePath(e, t = this.defaultStorage) {
    const { storage: s, path: i } = this.split(e || ""), r = s || t;
    return this.combine(i ?? "", r);
  }
  parent(e) {
    const { storage: t, path: s } = this.split(e), i = t || this.defaultStorage;
    if (!s) return this.combine("", i);
    const r = s.replace(/\/+$/g, "").replace(/^\/+/, ""), l = r.lastIndexOf("/");
    return l <= 0 ? this.combine("", i) : this.combine(r.slice(0, l), i);
  }
  join(e, t) {
    const { storage: s, path: i } = this.split(e), r = s || this.defaultStorage, l = (i ?? "").replace(/\/$/, ""), d = l ? `${l}/${t}` : t;
    return this.combine(d, r);
  }
  getExtension(e) {
    const t = e.lastIndexOf(".");
    return t > 0 ? e.slice(t + 1) : "";
  }
  cloneEntry(e, t = {}) {
    return { ...e, ...t };
  }
  findByPath(e) {
    return this.files.find((t) => t.path === e);
  }
  listChildren(e) {
    return this.files.filter((t) => t.dir === e);
  }
  replaceAll(e) {
    this.files = e;
  }
  upsert(e) {
    const t = this.files.slice(), s = t.findIndex((i) => i.path === e.path);
    s === -1 ? t.push(e) : t[s] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((s) => s.path !== e);
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], s = [];
    for (const i of this.files)
      this.isInTree(i.path, e) ? t.push(i) : s.push(i);
    this.replaceAll(s);
    for (const i of t)
      this.contentStore.delete(i.path);
    return t;
  }
  isInTree(e, t) {
    return e === t || e.startsWith(`${t}/`);
  }
  getTree(e, t = this.files) {
    return t.filter((s) => this.isInTree(s.path, e)).sort((s, i) => s.path.length - i.path.length);
  }
  uniqueName(e, t, s) {
    if (!s.has(this.join(e, t))) return t;
    const i = t.lastIndexOf("."), r = i > 0 ? t.slice(0, i) : t, l = i > 0 ? t.slice(i) : "";
    let d = 1;
    for (; ; ) {
      const c = `${r} copy ${d}${l}`, f = this.join(e, c);
      if (!s.has(f)) return c;
      d++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const s = [...new Set(e)].map((r) => this.normalizePath(r, t)).filter((r) => this.findByPath(r)).sort((r, l) => r.length - l.length), i = [];
    for (const r of s)
      i.some((l) => this.isInTree(r, l)) || i.push(r);
    return i;
  }
  makeDirEntry(e, t) {
    const s = this.join(e, t), { storage: i } = this.split(s);
    return {
      storage: i || this.defaultStorage,
      dir: e,
      basename: t,
      extension: "",
      path: s,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, s = 0, i = null) {
    const r = this.join(e, t), { storage: l } = this.split(r);
    return {
      storage: l || this.defaultStorage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: r,
      type: "file",
      file_size: s,
      last_modified: Date.now(),
      mime_type: i,
      visibility: "public"
    };
  }
  resultForDir(e) {
    return {
      files: this.listChildren(e),
      storages: this.storages,
      read_only: this.readOnly,
      dirname: e
    };
  }
  async list(e) {
    const t = this.normalizePath(e?.path);
    return {
      storages: this.storages,
      dirname: t,
      files: this.listChildren(t),
      read_only: this.readOnly
    };
  }
  async delete(e) {
    this.ensureWritable(), this.validateParam(e.items, "items"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), { storage: s } = this.split(t), i = [];
    for (const l of e.items) {
      const d = this.normalizePath(l.path, s || this.defaultStorage), c = this.findByPath(d);
      c && (c.type === "dir" ? i.push(...this.removeTree(c.path)) : (this.removeExact(c.path), this.contentStore.delete(c.path), i.push(c)));
    }
    return { ...this.resultForDir(t), deleted: i };
  }
  async rename(e) {
    this.ensureWritable(), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), { storage: s } = this.split(t), i = this.normalizePath(
      e.item || e.path,
      s || this.defaultStorage
    ), r = this.findByPath(i);
    if (!r) throw new Error("Item not found");
    const l = r.dir, d = this.join(l, e.name);
    if (d !== r.path && this.findByPath(d))
      throw new Error("Target already exists");
    if (r.type === "dir") {
      const f = r.path, m = d, p = this.files.map((v) => {
        if (v.storage !== r.storage || !this.isInTree(v.path, f)) return v;
        const k = m + v.path.slice(f.length);
        return this.cloneEntry(v, {
          path: k,
          dir: this.parent(k),
          basename: v.path === f ? e.name : v.basename,
          last_modified: Date.now()
        });
      });
      for (const [v, k] of Array.from(this.contentStore.entries()))
        this.isInTree(v, f) && (this.contentStore.delete(v), this.contentStore.set(m + v.slice(f.length), k));
      this.replaceAll(p);
    } else {
      const f = this.cloneEntry(r, {
        path: d,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(f), this.removeExact(r.path);
      const m = this.contentStore.get(r.path);
      m !== void 0 && (this.contentStore.delete(r.path), this.contentStore.set(f.path, m));
    }
    const c = e.path ? this.normalizePath(e.path, r.storage || this.defaultStorage) : l;
    return this.resultForDir(c || l);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: s } = this.split(t), i = this.topLevelSources(e.sources, s || this.defaultStorage), r = new Set(this.files.map((d) => d.path)), l = [];
    for (const d of i) {
      const c = this.findByPath(d);
      if (!c) continue;
      if (c.type === "file") {
        const v = this.uniqueName(t, c.basename, r), k = this.makeFileEntry(
          t,
          v,
          c.file_size || 0,
          c.mime_type
        );
        l.push(k), r.add(k.path);
        const b = this.contentStore.get(c.path);
        b !== void 0 && this.contentStore.set(k.path, b);
        continue;
      }
      const f = this.getTree(c.path), m = this.uniqueName(t, c.basename, r), p = /* @__PURE__ */ new Map();
      p.set(c.path, this.join(t, m));
      for (const v of f) {
        const k = v.path === c.path ? p.get(c.path) : this.join(p.get(v.dir), v.basename);
        p.set(v.path, k);
        const b = v.path === c.path ? t : p.get(v.dir), $ = v.path === c.path ? m : v.basename, h = this.cloneEntry(v, {
          path: k,
          dir: b,
          basename: $,
          extension: v.type === "file" ? this.getExtension($) : "",
          last_modified: Date.now()
        });
        if (l.push(h), r.add(h.path), v.type === "file") {
          const y = this.contentStore.get(v.path);
          y !== void 0 && this.contentStore.set(h.path, y);
        }
      }
    }
    return this.replaceAll(this.files.concat(l)), this.resultForDir(t);
  }
  async move(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: s } = this.split(t), i = this.topLevelSources(e.sources, s || this.defaultStorage);
    let r = this.files.slice();
    for (const l of i) {
      const d = r.find((b) => b.path === l);
      if (!d) continue;
      if (d.type === "dir" && this.isInTree(t, d.path))
        throw new Error("Cannot move directory into itself");
      if (d.dir === t)
        continue;
      const c = this.getTree(d.path, r), f = new Set(c.map((b) => b.path)), m = new Set(r.filter((b) => !f.has(b.path)).map((b) => b.path)), p = this.uniqueName(t, d.basename, m), v = /* @__PURE__ */ new Map();
      v.set(d.path, this.join(t, p));
      const k = /* @__PURE__ */ new Map();
      for (const b of c) {
        const $ = b.path === d.path ? v.get(d.path) : this.join(v.get(b.dir), b.basename);
        v.set(b.path, $);
        const h = b.path === d.path ? t : v.get(b.dir), y = b.path === d.path ? p : b.basename;
        k.set(
          b.path,
          this.cloneEntry(b, {
            path: $,
            dir: h,
            basename: y,
            extension: b.type === "file" ? this.getExtension(y) : "",
            last_modified: Date.now()
          })
        );
      }
      r = r.map((b) => k.get(b.path) || b);
      for (const [b, $] of v.entries()) {
        if (b === $) continue;
        const h = this.contentStore.get(b);
        h !== void 0 && (this.contentStore.delete(b), this.contentStore.set($, h));
      }
    }
    return this.replaceAll(r), this.resultForDir(t);
  }
  async archive(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), s = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, i = this.makeFileEntry(t, s, 0, "application/zip");
    return this.upsert(i), this.resultForDir(t);
  }
  async unarchive(e) {
    this.ensureWritable(), this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.item), s = this.normalizePath(e.path), i = this.findByPath(t);
    if (!i) throw new Error("Archive not found");
    const r = i.basename.replace(/\.zip$/i, ""), l = this.makeDirEntry(s, r);
    return this.upsert(l), this.resultForDir(s);
  }
  async createFile(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), s = this.makeFileEntry(t, e.name, 0, null);
    return this.upsert(s), this.contentStore.set(s.path, ""), this.resultForDir(t);
  }
  async createFolder(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), s = this.makeDirEntry(t, e.name);
    return this.upsert(s), this.resultForDir(t);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = this.normalizePath(e.path), s = this.contentStore.get(t);
    if (typeof s == "string" || s === void 0)
      return {
        content: s ?? "",
        mimeType: this.findByPath(t)?.mime_type || void 0
      };
    const i = new Uint8Array(s);
    let r = "";
    for (let l = 0; l < i.length; l++) r += String.fromCharCode(i[l]);
    return {
      content: btoa(r),
      mimeType: this.findByPath(t)?.mime_type || void 0
    };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), s = e.path ? this.normalizePath(e.path) : void 0;
    return this.files.filter((i) => {
      if (s) {
        if (e.deep) {
          if (!this.isInTree(i.path, s)) return !1;
        } else if (i.dir !== s)
          return !1;
      }
      return i.basename.toLowerCase().includes(t) || i.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.ensureWritable(), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), s = this.findByPath(t);
    if (!s) throw new Error("File not found");
    if (s.type !== "file") throw new Error("Can only save file content");
    return this.contentStore.set(t, e.content), this.upsert(
      this.cloneEntry(s, { file_size: e.content.length, last_modified: Date.now() })
    ), t;
  }
  // Auto-creates any missing intermediate directories for a "sub/dir/name" path,
  // so folder drag & drop / folder picker uploads recreate the dropped folder itself.
  ensureDirPath(e, t) {
    let s = e;
    for (const i of t) {
      const r = this.join(s, i);
      this.findByPath(r) || this.upsert(this.makeDirEntry(s, i)), s = r;
    }
    return s;
  }
  configureUploader(e, t) {
    e && e.addUploader(async (s) => {
      const i = s.map((r) => e.getFile(r)).filter(Boolean);
      if (i.length) {
        e.emit("upload-start", i);
        for (const r of i)
          try {
            this.ensureWritable();
            const l = this.normalizePath(t.getTargetPath()), d = r?.name || "file", c = r?.type || null, f = r?.data, m = r?.size || 0, p = d.split("/").filter(Boolean), v = p.pop() || d, k = p.length ? this.ensureDirPath(l, p) : l, b = this.makeFileEntry(k, v, m, c);
            if (this.upsert(b), f)
              try {
                const $ = await f.arrayBuffer();
                this.contentStore.set(b.path, $);
              } catch {
                this.contentStore.set(b.path, "");
              }
            else
              this.contentStore.set(b.path, "");
            e.emit("upload-success", r, { status: 200, body: {} });
          } catch (l) {
            e.emit("upload-error", r, l instanceof Error ? l : new Error("Upload failed"));
          }
      }
    });
  }
}
function kn(n, e, t) {
  const s = `HTTP ${e}: ${t}`;
  if (!n)
    return s;
  try {
    const i = JSON.parse(n);
    if (i.message)
      return i.message;
    if (i.error) {
      if (typeof i.error == "string")
        return i.error;
      if (i.error.message)
        return i.error.message;
    }
    if (i.errors && Array.isArray(i.errors) && i.errors.length > 0) {
      const r = i.errors.map((l) => l.message).filter((l) => !!l);
      if (r.length > 0)
        return r.join(", ");
    }
    return i.detail ? i.detail : i.title ? i.title : n;
  } catch {
    return n || s;
  }
}
class qn extends Zt {
  config;
  /**
   * Default URL endpoints
   */
  static DEFAULT_URLS = {
    list: "",
    upload: "/upload",
    delete: "/delete",
    rename: "/rename",
    copy: "/copy",
    move: "/move",
    archive: "/archive",
    unarchive: "/unarchive",
    createFile: "/create-file",
    createFolder: "/create-folder",
    preview: "/preview",
    download: "/download",
    search: "/search",
    save: "/save"
  };
  constructor(e) {
    super();
    const t = {
      ...qn.DEFAULT_URLS,
      ...e.url || {}
    };
    this.config = {
      ...e,
      baseURL: e.baseURL || "",
      url: t
    };
  }
  /**
   * Set or update the base URL for API requests
   */
  setBaseURL(e) {
    this.config.baseURL = e || "";
  }
  /**
   * Set or update the authentication token
   * Pass undefined to remove the token
   */
  setToken(e) {
    this.config.token = e;
  }
  configureUploader(e, t) {
    const s = this.getHeaders();
    delete s["Content-Type"], e.use(Ao, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: s,
      formData: !0
    }), e.on("upload", () => {
      const i = t.getTargetPath();
      e.getFiles().forEach((l) => {
        e.setFileMeta(l.id, { path: i });
      });
    });
  }
  getHeaders() {
    const e = {
      "Content-Type": "application/json",
      ...this.config.headers
    };
    return this.config.token && (e.Authorization = `Bearer ${this.config.token}`), e;
  }
  async request(e, t = {}) {
    const s = `${this.config.baseURL}${e}`, i = await fetch(s, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!i.ok) {
      const l = await i.text(), d = kn(l, i.status, i.statusText);
      throw new Error(d);
    }
    return i.status === 204 || i.status === 304 ? {} : (i.headers.get("content-type") || "").includes("application/json") ? await i.json() : await i.text();
  }
  async list(e) {
    const t = new URLSearchParams();
    e?.path && t.append("path", e.path);
    const s = t.toString() ? `${this.config.url.list}?${t.toString()}` : this.config.url.list;
    return await this.request(s, { method: "GET", signal: e?.signal });
  }
  async delete(e) {
    return this.validateParam(e.items, "items"), this.validateParam(e.path, "path"), await this.request(this.config.url.delete, {
      method: "POST",
      body: JSON.stringify({ path: e.path, items: e.items })
    });
  }
  async rename(e) {
    return this.validateParam(e.path, "path"), this.validateParam(e.item, "item"), this.validateParam(e.name, "name"), this.validatePath(e.path), await this.request(this.config.url.rename, {
      method: "POST",
      body: JSON.stringify({ path: e.path, item: e.item, name: e.name })
    });
  }
  async copy(e) {
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), e.path && this.validatePath(e.path), await this.request(this.config.url.copy, {
      method: "POST",
      body: JSON.stringify({
        sources: e.sources,
        destination: e.destination,
        path: e.path
      })
    });
  }
  async move(e) {
    return this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination"), e.path && this.validatePath(e.path), await this.request(this.config.url.move, {
      method: "POST",
      body: JSON.stringify({
        sources: e.sources,
        destination: e.destination,
        path: e.path
      })
    });
  }
  async archive(e) {
    return this.validateParam(e.items, "items"), this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.archive, {
      method: "POST",
      body: JSON.stringify({
        items: e.items,
        path: e.path,
        name: e.name,
        // Optional. Backends that ignore unknown fields will fall back to `path`.
        ...e.destination ? { destination: e.destination } : {}
      })
    });
  }
  async unarchive(e) {
    return this.validateParam(e.item, "item"), this.validateParam(e.path, "path"), await this.request(this.config.url.unarchive, {
      method: "POST",
      body: JSON.stringify({
        item: e.item,
        path: e.path,
        // Optional. Backends that ignore unknown fields will fall back to `path`.
        ...e.destination ? { destination: e.destination } : {}
      })
    });
  }
  async createFile(e) {
    return this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.createFile, {
      method: "POST",
      body: JSON.stringify({ path: e.path, name: e.name })
    });
  }
  async createFolder(e) {
    return this.validateParam(e.name, "name"), this.validateParam(e.path, "path"), await this.request(this.config.url.createFolder, {
      method: "POST",
      body: JSON.stringify({ path: e.path, name: e.name })
    });
  }
  getPreviewUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`;
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path }), s = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, i = await fetch(s, { headers: this.getHeaders(), signal: e.signal });
    if (!i.ok) {
      const l = await i.text(), d = kn(l, i.status, i.statusText);
      throw new Error(d);
    }
    return { content: await i.text(), mimeType: i.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, s = new URLSearchParams();
    e.path && s.set("path", e.path), e.filter && s.set("filter", e.filter), e.deep && s.set("deep", "1"), e.size && e.size !== "all" && s.set("size", e.size);
    const i = s.toString() ? `${t}?${s.toString()}` : t;
    return (await this.request(i, {
      method: "GET",
      signal: e.signal
    })).files || [];
  }
  async save(e) {
    return this.validateParam(e.path, "path"), await this.request(this.config.url.save, {
      method: "POST",
      body: JSON.stringify({ path: e.path, content: e.content }),
      headers: this.getHeaders(),
      signal: e.signal
    });
  }
}
class Dp extends Zt {
  dbName;
  defaultStorage;
  storages;
  storagesSet;
  readOnly;
  version;
  db = null;
  dbPromise = null;
  entries = [];
  contentStore = /* @__PURE__ */ new Map();
  driver;
  readyPromise = null;
  constructor(e = {}) {
    super(), this.dbName = e.dbName || "vuefinder";
    const t = e.storages && e.storages.length > 0 ? e.storages : [e.storage || "indexeddb"];
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "indexeddb", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.version = e.version || 1, this.driver = new Yo({
      files: this.entries,
      storage: this.defaultStorage,
      storages: this.storages,
      readOnly: this.readOnly,
      contentStore: this.contentStore
    }), this.readyPromise = this.loadSnapshotFromDB();
  }
  isManagedStorage(e) {
    return !!(e && this.storagesSet.has(e));
  }
  isManagedPath(e) {
    if (!e) return !1;
    const { storage: t } = this.parsePath(e);
    return this.isManagedStorage(t);
  }
  async initDB() {
    return this.dbPromise ? this.dbPromise : (this.dbPromise = new Promise((e, t) => {
      const s = indexedDB.open(this.dbName, this.version);
      s.onerror = () => t(s.error), s.onsuccess = () => {
        this.db = s.result, e(this.db);
      }, s.onupgradeneeded = (i) => {
        const r = i.target.result;
        if (!r.objectStoreNames.contains("files")) {
          const l = r.createObjectStore("files", { keyPath: "path" });
          l.createIndex("storage", "storage", { unique: !1 }), l.createIndex("dir", "dir", { unique: !1 });
        }
        r.objectStoreNames.contains("content") || r.createObjectStore("content", { keyPath: "path" });
      };
    }), this.dbPromise);
  }
  async getDB() {
    return this.db ? this.db : this.initDB();
  }
  requestToPromise(e) {
    return new Promise((t, s) => {
      e.onsuccess = () => t(e.result), e.onerror = () => s(e.error);
    });
  }
  waitTransaction(e) {
    return new Promise((t, s) => {
      e.oncomplete = () => t(), e.onerror = () => s(e.error), e.onabort = () => s(e.error);
    });
  }
  async loadSnapshotFromDB() {
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), s = t.objectStore("files"), i = t.objectStore("content"), [r, l] = await Promise.all([
      this.requestToPromise(s.getAll()),
      this.requestToPromise(i.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...r.filter((d) => this.isManagedStorage(d.storage))), this.contentStore.clear();
    for (const d of l)
      this.isManagedPath(d?.path) && this.contentStore.set(d.path, d.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), s = t.objectStore("files"), i = t.objectStore("content"), r = this.requestToPromise(
      s.getAll()
    ), l = this.requestToPromise(
      i.getAll()
    ), [d, c] = await Promise.all([
      r,
      l
    ]);
    s.clear(), i.clear();
    for (const f of d)
      this.isManagedStorage(f.storage) || s.put(f);
    for (const f of c)
      this.isManagedPath(f.path) || i.put(f);
    for (const f of this.entries)
      this.isManagedStorage(f.storage) && s.put(f);
    for (const [f, m] of this.contentStore.entries())
      this.isManagedPath(f) && i.put({ path: f, content: m });
    await this.waitTransaction(t);
  }
  async ensureReady() {
    this.readyPromise || (this.readyPromise = this.loadSnapshotFromDB()), await this.readyPromise;
  }
  async list(e) {
    return await this.ensureReady(), this.driver.list(e);
  }
  async delete(e) {
    await this.ensureReady();
    const t = await this.driver.delete(e);
    return await this.persistSnapshot(), t;
  }
  async rename(e) {
    await this.ensureReady();
    const t = await this.driver.rename(e);
    return await this.persistSnapshot(), t;
  }
  async copy(e) {
    await this.ensureReady();
    const t = await this.driver.copy(e);
    return await this.persistSnapshot(), t;
  }
  async move(e) {
    await this.ensureReady();
    const t = await this.driver.move(e);
    return await this.persistSnapshot(), t;
  }
  async archive(e) {
    await this.ensureReady();
    const t = await this.driver.archive(e);
    return await this.persistSnapshot(), t;
  }
  async unarchive(e) {
    await this.ensureReady();
    const t = await this.driver.unarchive(e);
    return await this.persistSnapshot(), t;
  }
  async createFile(e) {
    await this.ensureReady();
    const t = await this.driver.createFile(e);
    return await this.persistSnapshot(), t;
  }
  async createFolder(e) {
    await this.ensureReady();
    const t = await this.driver.createFolder(e);
    return await this.persistSnapshot(), t;
  }
  getPreviewUrl(e) {
    return this.driver.getPreviewUrl(e);
  }
  async getContent(e) {
    return await this.ensureReady(), this.driver.getContent(e);
  }
  getDownloadUrl(e) {
    return this.driver.getDownloadUrl(e);
  }
  async search(e) {
    return await this.ensureReady(), this.driver.search(e);
  }
  async save(e) {
    await this.ensureReady();
    const t = await this.driver.save(e);
    return await this.persistSnapshot(), t;
  }
  configureUploader(e, t) {
    this.ensureReady(), this.driver.configureUploader?.(e, t), e && e.on("upload-success", async () => {
      try {
        await this.ensureReady(), await this.persistSnapshot();
      } catch {
      }
    });
  }
}
const Nt = {
  list: (n) => ["adapter", "list", n],
  search: (n, e, t, s) => ["adapter", "search", n, e, t, s],
  delete: (n) => ["adapter", "delete", n],
  rename: () => ["adapter", "rename"],
  copy: () => ["adapter", "copy"],
  move: () => ["adapter", "move"],
  archive: () => ["adapter", "archive"],
  unarchive: () => ["adapter", "unarchive"],
  createFile: () => ["adapter", "createFile"],
  createFolder: () => ["adapter", "createFolder"]
};
class Xo {
  driver;
  queryClient;
  config;
  onBeforeOpen;
  onAfterOpen;
  constructor(e, t = {}) {
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Po({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: t.refetchOnWindowFocus ?? !1,
          staleTime: t.staleTime ?? 300 * 1e3,
          retry: t.retry ?? 2
        },
        mutations: {
          retry: t.retry ?? 1
        }
      }
    }), this.config = {
      queryClient: this.queryClient,
      refetchOnWindowFocus: t.refetchOnWindowFocus ?? !1,
      staleTime: t.staleTime ?? 300 * 1e3,
      cacheTime: t.cacheTime ?? 600 * 1e3,
      retry: t.retry ?? 2,
      onBeforeOpen: this.onBeforeOpen ?? (() => {
      }),
      onAfterOpen: this.onAfterOpen ?? (() => {
      })
    };
  }
  /**
   * Get the underlying driver instance
   */
  getDriver() {
    return this.driver;
  }
  /**
   * Get the query client instance
   */
  getQueryClient() {
    return this.queryClient;
  }
  /**
   * List files with caching and automatic refetching
   */
  async list(e) {
    const t = Nt.list(e);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: ({ signal: s }) => this.driver.list({ path: e, signal: s }),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Open a path and optionally update state
   * @param path
   * @returns
   */
  async open(e) {
    this.onBeforeOpen && this.onBeforeOpen();
    try {
      const t = await this.list(e);
      return this.onAfterOpen && this.onAfterOpen(t), t;
    } catch (t) {
      if (Eo(t) || t?.name === "AbortError")
        return;
      throw t;
    }
  }
  /**
   * Cancel an in-flight list/open request. Aborts the underlying fetch via
   * the AbortSignal that TanStack Query passes to the query function.
   */
  cancelOpen(e) {
    const t = e === void 0 ? ["adapter", "list"] : Nt.list(e);
    this.queryClient.cancelQueries({ queryKey: t });
  }
  /**
   * Delete files with optimistic updates
   */
  async delete(e) {
    const t = await this.driver.delete(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Rename a file or folder
   */
  async rename(e) {
    const t = await this.driver.rename(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Copy files to a destination
   */
  async copy(e) {
    const t = await this.driver.copy(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Move files to a destination
   */
  async move(e) {
    const t = await this.driver.move(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a zip archive
   */
  async archive(e) {
    const t = await this.driver.archive(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Extract files from a zip archive
   */
  async unarchive(e) {
    const t = await this.driver.unarchive(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a new file
   */
  async createFile(e) {
    const t = await this.driver.createFile(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Create a new folder
   */
  async createFolder(e) {
    const t = await this.driver.createFolder(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Get file content (cached)
   */
  async getContent(e) {
    const t = ["adapter", "content", e.path];
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: ({ signal: s }) => this.driver.getContent({ path: e.path, signal: e.signal ?? s }),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Get preview URL
   */
  getPreviewUrl(e) {
    return this.driver.getPreviewUrl(e);
  }
  /**
   * Get download URL
   */
  getDownloadUrl(e) {
    return this.driver.getDownloadUrl(e);
  }
  /**
   * Search files (cached per path+filter)
   */
  async search(e) {
    const t = Nt.search(e.path, e.filter, e.deep, e.size);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: ({ signal: s }) => this.driver.search({ ...e, signal: e.signal ?? s }),
      staleTime: this.config.staleTime
    });
  }
  /**
   * Save content to file (and invalidate list cache)
   */
  async save(e) {
    const t = await this.driver.save(e);
    return this.invalidateListQueries(), t;
  }
  /**
   * Invalidate all list queries
   */
  invalidateListQueries() {
    this.queryClient.invalidateQueries({
      queryKey: ["adapter"],
      exact: !1
    });
  }
  invalidateListQuery(e) {
    this.queryClient.invalidateQueries({
      queryKey: ["adapter", "list", e],
      exact: !0
    });
  }
  /**
   * Clear all cached queries
   */
  clearCache() {
    this.queryClient.clear();
  }
}
function Qo(n) {
  const e = oe(n.state);
  return {
    current: R(() => e.value.theme || "silver"),
    set: (i) => {
      n.set("theme", i);
    }
  };
}
const Jo = (n, e) => {
  const t = Ro(n.id ?? "vf"), s = Co(), i = e.i18n, r = n.locale ?? e.locale, l = Wo(n.id ?? "vf", n.config ?? {}), d = Go();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new Xo(n.driver);
  return Et({
    // app version
    version: No,
    // config store
    config: l,
    // Theme
    theme: (() => {
      const f = Qo(l);
      return {
        current: f.current,
        set: f.set
      };
    })(),
    // files store
    fs: d,
    // root element
    root: null,
    // app id
    debug: n.debug ?? !1,
    // Event Bus
    emitter: s,
    // storage
    storage: t,
    // localization object
    i18n: Vo(
      t,
      r,
      s,
      i,
      l
    ),
    // modal state
    modal: jo(l),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: go(c),
    // active features
    features: Nn(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: R(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: R(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: l.get("metricUnits") ? Hn : Jt,
    // possible items of the context menu
    contextMenuItems: n.contextMenuItems,
    // expose custom uploader if provided
    customUploader: n.customUploader
  });
}, Zo = ["data-theme"], es = { class: "vuefinder__modal-layout__container" }, ts = { class: "vuefinder__modal-layout__content" }, ns = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, os = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, ss = { class: "vuefinder__modal-drag-message" }, Ue = /* @__PURE__ */ re({
  __name: "ModalLayout",
  props: {
    showDragOverlay: { type: Boolean },
    dragOverlayText: {},
    onRequestClose: { type: Function },
    bodyStyle: { type: [Boolean, null, String, Object, Array] },
    bodyClass: {},
    onBodyTouchstart: { type: Function },
    onBodyTouchmove: { type: Function },
    onBodyTouchend: { type: Function },
    onBodyTouchcancel: { type: Function }
  },
  setup(n) {
    const e = M(null), t = le();
    t.config;
    const s = n, i = () => {
      s.onRequestClose ? s.onRequestClose() : t.modal.close();
    };
    we(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Ae(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const d = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: d,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const r = (l) => {
      l.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (l.preventDefault(), l.stopPropagation());
    };
    return (l, d) => (u(), _("div", {
      "data-theme": a(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: d[5] || (d[5] = Ke((c) => i(), ["esc"]))
    }, [
      d[6] || (d[6] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", es, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: r,
          onMousedown: d[4] || (d[4] = _e((c) => i(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: te(["vuefinder__modal-layout__body", s.bodyClass]),
            style: Me(s.bodyStyle),
            onTouchstart: d[0] || (d[0] = //@ts-ignore
            (...c) => s.onBodyTouchstart && s.onBodyTouchstart(...c)),
            onTouchmove: d[1] || (d[1] = //@ts-ignore
            (...c) => s.onBodyTouchmove && s.onBodyTouchmove(...c)),
            onTouchend: d[2] || (d[2] = //@ts-ignore
            (...c) => s.onBodyTouchend && s.onBodyTouchend(...c)),
            onTouchcancel: d[3] || (d[3] = //@ts-ignore
            (...c) => s.onBodyTouchcancel && s.onBodyTouchcancel(...c))
          }, [
            o("div", ts, [
              ke(l.$slots, "default")
            ]),
            l.$slots.buttons ? (u(), _("div", ns, [
              ke(l.$slots, "buttons")
            ])) : j("", !0)
          ], 38)
        ], 32)
      ]),
      s.showDragOverlay ? (u(), _("div", os, [
        o("div", ss, w(s.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : j("", !0)
    ], 40, Zo));
  }
}), as = { class: "vuefinder__modal-header" }, is = { class: "vuefinder__modal-header__icon-container" }, ls = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, je = /* @__PURE__ */ re({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (u(), _("div", as, [
      o("div", is, [
        (u(), X(On(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", ls, w(n.title), 1)
    ]));
  }
}), rs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function ds(n, e) {
  return u(), _("svg", rs, [...e[0] || (e[0] = [
    o("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }, null, -1),
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 8.2h.01M10.75 11.25H12v4.5m0 0h1.25m-1.25 0h-2"
    }, null, -1)
  ])]);
}
const en = { render: ds }, cs = { class: "vuefinder__about-modal__content" }, us = { class: "vuefinder__about-modal__main" }, vs = { class: "vuefinder__about-modal__tab-content" }, fs = { class: "vuefinder__about-modal__lead" }, _s = { class: "vuefinder__about-modal__description" }, ps = { class: "vuefinder__about-modal__links" }, ms = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, hs = { class: "vuefinder__about-modal__meta" }, gs = { class: "vuefinder__about-modal__meta-item" }, ys = { class: "vuefinder__about-modal__meta-label" }, ws = { class: "vuefinder__about-modal__meta-value" }, bs = { class: "vuefinder__about-modal__meta-item" }, ks = { class: "vuefinder__about-modal__meta-label" }, Wn = /* @__PURE__ */ re({
  __name: "ModalAbout",
  setup(n) {
    const e = le(), { t } = e.i18n;
    return (s, i) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (r) => a(e).modal.close())
        }, w(a(t)("Close")), 1)
      ]),
      default: ie(() => [
        o("div", cs, [
          G(je, {
            icon: a(en),
            title: "Vuefinder " + a(e).version
          }, null, 8, ["icon", "title"]),
          o("div", us, [
            o("div", vs, [
              o("div", fs, w(a(t)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", _s, w(a(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", ps, [
                o("a", ms, w(a(t)("Project Home")), 1),
                i[1] || (i[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", hs, [
                o("div", gs, [
                  o("span", ys, w(a(t)("Version")), 1),
                  o("span", ws, w(a(e).version), 1)
                ]),
                o("div", bs, [
                  o("span", ks, w(a(t)("License")), 1),
                  i[2] || (i[2] = o("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
                ])
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), $s = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function xs(n, e) {
  return u(), _("svg", $s, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Gn = { render: xs }, Ss = { class: "vuefinder__delete-modal__content" }, Cs = { class: "vuefinder__delete-modal__form" }, Fs = { class: "vuefinder__delete-modal__description" }, Ps = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Es = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ts = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ds = { class: "vuefinder__delete-modal__file-name" }, Ms = { class: "vuefinder__delete-modal__confirmation" }, Is = { class: "vuefinder__delete-modal__confirmation-label" }, As = { class: "vuefinder__delete-modal__confirmation-text" }, Os = ["disabled"], Tt = /* @__PURE__ */ re({
  __name: "ModalDelete",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = oe(i.path), l = M(e.modal.data.items), d = M(!1), c = () => {
      l.value.length && d.value && e.adapter.delete({
        path: r.value.path,
        items: l.value.map(({ path: f, type: m }) => ({
          path: f,
          type: m
        }))
      }).then((f) => {
        t.success(s("Files deleted.")), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        t.error(Te(f, s("Failed to delete files")));
      });
    };
    return (f, m) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("div", Ms, [
          o("label", Is, [
            he(o("input", {
              "onUpdate:modelValue": m[0] || (m[0] = (p) => d.value = p),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [lt, d.value]
            ]),
            o("span", As, w(a(s)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !d.value,
          onClick: c
        }, w(a(s)("Yes, Delete!")), 9, Os),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[1] || (m[1] = (p) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(Gn),
            title: a(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", Ss, [
            o("div", Cs, [
              o("p", Fs, w(a(s)("Are you sure you want to delete these files?")), 1),
              o("div", Ps, [
                (u(!0), _(fe, null, ge(l.value, (p) => (u(), _("p", {
                  key: p.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  p.type === "dir" ? (u(), _("svg", Es, [...m[2] || (m[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), _("svg", Ts, [...m[3] || (m[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Ds, w(p.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ls = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Rs(n, e) {
  return u(), _("svg", Ls, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Yn = { render: Rs }, Bs = { class: "vuefinder__rename-modal__content" }, zs = { class: "vuefinder__rename-modal__item" }, Vs = { class: "vuefinder__rename-modal__item-info" }, Us = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ns = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hs = { class: "vuefinder__rename-modal__item-name" }, Dt = /* @__PURE__ */ re({
  __name: "ModalRename",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = oe(i.path), l = M(e.modal.data.items[0]), d = M(l.value.basename), c = () => {
      d.value != l.value.basename && e.adapter.rename({
        path: r.value.path,
        item: l.value.path,
        name: d.value
      }).then((f) => {
        t.success(s("%s is renamed.", d.value)), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        t.error(Te(f, s("Failed to rename")));
      });
    };
    return (f, m) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, w(a(s)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[1] || (m[1] = (p) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(Yn),
            title: a(s)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", Bs, [
            o("div", zs, [
              o("p", Vs, [
                l.value.type === "dir" ? (u(), _("svg", Us, [...m[2] || (m[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), _("svg", Ns, [...m[3] || (m[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Hs, w(l.value.basename), 1)
              ]),
              he(o("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (p) => d.value = p),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: Ke(c, ["enter"])
              }, null, 544), [
                [We, d.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Ne() {
  const n = le(), e = R(() => n.features);
  return {
    enabled: (s) => e.value[s] ?? !1
  };
}
function js(n, e = null) {
  return new Date(n * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Ks = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function qs(n, e) {
  return u(), _("svg", Ks, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Xn = { render: qs }, Ws = { class: "vuefinder__preview-chrome" }, Gs = { class: "vuefinder__preview-chrome__popover-host vuefinder__preview-chrome__info-host" }, Ys = ["title", "aria-label"], Xs = {
  key: 0,
  class: "vuefinder__preview-chrome__popover"
}, Qs = { class: "vuefinder__preview-chrome__popover-label" }, Js = { class: "vuefinder__preview-chrome__popover-value" }, Zs = ["title"], ea = { class: "vuefinder__preview-chrome__actions" }, ta = ["aria-label"], na = {
  key: 1,
  class: "vuefinder__preview-chrome__popover-host"
}, oa = ["title", "aria-label"], sa = {
  key: 0,
  class: "vuefinder__preview-chrome__popover"
}, aa = ["href", "download"], ia = { class: "vuefinder__preview-chrome__popover-hint" }, la = ["title", "aria-label"], ra = /* @__PURE__ */ re({
  name: "PreviewChrome",
  __name: "PreviewChrome",
  emits: ["close-request"],
  setup(n, { emit: e }) {
    const t = e, s = le(), { enabled: i } = Ne(), { t: r } = s.i18n, l = oe(s.fs.sortedFiles), d = R(() => l.value.filter((g) => g.type === "file")), c = R(
      () => d.value.findIndex((g) => g.path === s.modal.data.item.path)
    ), f = R(() => d.value.length), m = R(() => s.modal.controls ?? null), p = R(() => !!a(m.value?.isEditing));
    R(() => !!a(m.value?.isDirty));
    const v = M(!1), k = M(!1), b = (g) => {
      g === "info" ? (v.value = !v.value, k.value = !1) : (k.value = !k.value, v.value = !1);
    }, $ = (g) => {
      g.target.closest(".vuefinder__preview-chrome__popover-host") || (v.value = !1, k.value = !1);
    };
    we(() => document.addEventListener("mousedown", $)), wt(() => document.removeEventListener("mousedown", $));
    const h = R(() => {
      const g = s.modal.data.item, C = [
        { label: r("File Size"), value: s.filesize(g.file_size ?? 0) },
        { label: r("Last Modified"), value: js(g.last_modified ?? 0) }
      ];
      g.mime_type && C.push({ label: r("Type"), value: g.mime_type });
      const S = a(m.value?.extraInfo);
      if (Array.isArray(S))
        for (const I of S) C.push(I);
      return C.push({ label: r("Path"), value: g.path }), C;
    }), y = R(() => s.adapter.getDownloadUrl(s.modal.data.item));
    return (g, C) => (u(), _("div", Ws, [
      o("div", Gs, [
        o("button", {
          type: "button",
          class: te(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": v.value }]),
          title: a(r)("File info"),
          "aria-label": a(r)("File info"),
          onClick: C[0] || (C[0] = (S) => b("info"))
        }, [
          G(a(en), { class: "vuefinder__preview-chrome__icon" })
        ], 10, Ys),
        v.value ? (u(), _("div", Xs, [
          (u(!0), _(fe, null, ge(h.value, (S) => (u(), _("div", {
            key: S.label,
            class: "vuefinder__preview-chrome__popover-row"
          }, [
            o("span", Qs, w(S.label), 1),
            o("span", Js, w(S.value), 1)
          ]))), 128))
        ])) : j("", !0)
      ]),
      o("div", {
        id: "modal-title",
        class: "vuefinder__preview-chrome__title",
        title: a(s).modal.data.item.path
      }, w(a(s).modal.data.item.basename), 9, Zs),
      o("div", ea, [
        f.value > 1 && !p.value ? (u(), _("span", {
          key: 0,
          class: "vuefinder__preview-chrome__counter",
          "aria-label": a(r)("File %s of %s", String(c.value + 1), String(f.value))
        }, w(c.value + 1) + " / " + w(f.value), 9, ta)) : j("", !0),
        a(i)("download") && !p.value ? (u(), _("div", na, [
          o("button", {
            type: "button",
            class: te(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": k.value }]),
            title: a(r)("Download"),
            "aria-label": a(r)("Download"),
            onClick: C[1] || (C[1] = (S) => b("download"))
          }, [...C[3] || (C[3] = [
            o("svg", {
              class: "vuefinder__preview-chrome__icon",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.8",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, [
              o("path", { d: "M12 3v12" }),
              o("path", { d: "M7 10l5 5 5-5" }),
              o("path", { d: "M5 21h14" })
            ], -1)
          ])], 10, oa),
          k.value ? (u(), _("div", sa, [
            o("a", {
              href: y.value,
              download: y.value,
              target: "_blank",
              class: "vuefinder__preview-chrome__popover-action"
            }, [
              C[4] || (C[4] = o("svg", {
                class: "vuefinder__preview-chrome__icon",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.8",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                o("path", { d: "M12 3v12" }),
                o("path", { d: "M7 10l5 5 5-5" }),
                o("path", { d: "M5 21h14" })
              ], -1)),
              o("span", null, w(a(r)("Download")), 1)
            ], 8, aa),
            o("p", ia, w(a(r)(
              `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
            )), 1)
          ])) : j("", !0)
        ])) : j("", !0),
        o("button", {
          type: "button",
          class: "vuefinder__preview-chrome__btn vuefinder__preview-chrome__btn--icon vuefinder__preview-chrome__btn--close",
          title: a(r)("Close"),
          "aria-label": a(r)("Close"),
          onClick: C[2] || (C[2] = (S) => t("close-request"))
        }, [
          G(a(Xn), { class: "vuefinder__preview-chrome__icon vuefinder__preview-chrome__icon--lg" })
        ], 8, la)
      ])
    ]));
  }
});
function tn(n) {
  const e = le();
  we(() => {
    if (typeof e.modal.registerControls != "function") {
      console.warn(
        "[vuefinder] PreviewControls registration skipped: app.modal.registerControls is missing. Hard refresh the page to pick up the latest modal API."
      );
      return;
    }
    e.modal.registerControls(n);
  }), wt(() => {
    typeof e.modal.unregisterControls == "function" && e.modal.unregisterControls(n);
  });
}
const da = { class: "vuefinder__text-preview" }, ca = { class: "vuefinder__text-preview__body" }, ua = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, va = /* @__PURE__ */ re({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-Btq9MvRL.js").then((g) => g.C),
      delay: 100
    }), s = e, i = M(""), r = M(""), l = M(!1), d = M(!1), c = le(), f = Ve(c), { enabled: m } = Ne(), { t: p } = c.i18n;
    we(async () => {
      try {
        const g = await c.adapter.getContent({ path: c.modal.data.item.path });
        i.value = g.content, r.value = g.content, s("success");
      } catch (g) {
        Te(g, "Failed to load text content"), s("success");
      }
    });
    const v = R(
      () => m("edit") && !c.fs.isReadOnly(c.modal.data.item)
    ), k = R(() => l.value), b = R(() => l.value && r.value !== i.value), $ = () => {
      r.value = i.value, l.value = !0, c.modal.setEditMode(!0);
    }, h = () => {
      l.value = !1, r.value = i.value, c.modal.setEditMode(!1);
    }, y = async () => {
      try {
        await c.adapter.save({
          path: c.modal.data.item.path,
          content: r.value
        }), i.value = r.value, f.success(p("Updated.")), l.value = !1, c.modal.setEditMode(!1), s("success");
      } catch (g) {
        f.error(Te(g, p("Failed to save file")));
      }
    };
    return tn({
      isEditable: v,
      isEditing: k,
      isDirty: b,
      primaryActionLabel: R(() => p("Save")),
      enterEdit: $,
      commitEdit: y,
      cancelEdit: h
    }), (g, C) => (u(), _("div", da, [
      o("div", ca, [
        (u(), X(Rn, {
          onResolve: C[2] || (C[2] = (S) => d.value = !0)
        }, {
          fallback: ie(() => [
            l.value ? he((u(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": C[1] || (C[1] = (S) => r.value = S),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [We, r.value]
            ]) : (u(), _("pre", ua, w(i.value), 1))
          ]),
          default: ie(() => [
            G(a(t), {
              "model-value": l.value ? r.value : i.value,
              readonly: !l.value,
              filename: a(c).modal.data.item.basename,
              "onUpdate:modelValue": C[0] || (C[0] = (S) => l.value ? r.value = S : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        he(o("span", null, w(d.value), 513), [
          [Ge, !1]
        ])
      ])
    ]));
  }
}), fa = { class: "vuefinder__text-preview" }, _a = { class: "vuefinder__text-preview__body vuefinder__csv-preview__body" }, pa = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ma = {
  key: 0,
  class: "vuefinder__csv-preview__error"
}, ha = {
  key: 1,
  class: "vuefinder__csv-preview__empty"
}, ga = {
  key: 2,
  class: "vuefinder__csv-preview__table-wrap"
}, ya = { class: "vuefinder__csv-preview__table" }, wa = ["title"], ba = { class: "vuefinder__csv-preview__row-num" }, ka = ["title"], $a = {
  key: 0,
  class: "vuefinder__csv-preview__truncated"
}, xa = {
  key: 2,
  class: "vuefinder__csv-preview__view-checkbox"
}, Ht = 1e3, Sa = /* @__PURE__ */ re({
  name: "CsvPreview",
  __name: "Csv",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-Btq9MvRL.js").then((Z) => Z.C),
      delay: 100
    }), s = e, i = M(""), r = M(""), l = vt([]), d = vt([]), c = M(null), f = M(!1), m = M(!1), p = R(() => l.value.length > Ht), v = R(() => p.value ? l.value.slice(0, Ht) : l.value), k = le(), b = Ve(k), { enabled: $ } = Ne(), { t: h } = k.i18n;
    async function y(Z) {
      try {
        const { parse: ee } = await import("./papaparse.min-Brc8PWCw.js").then((D) => D.p), Q = ee(Z, {
          skipEmptyLines: !0,
          delimiter: ""
        });
        if (!Q.data.length) {
          d.value = [], l.value = [];
          return;
        }
        const [W, ...P] = Q.data;
        d.value = W ?? [], l.value = P, c.value = null;
      } catch (ee) {
        c.value = Te(ee, h("Failed to parse CSV")), d.value = [], l.value = [];
      }
    }
    we(async () => {
      try {
        const Z = await k.adapter.getContent({ path: k.modal.data.item.path });
        i.value = Z.content, r.value = Z.content, await y(Z.content), s("success");
      } catch (Z) {
        Te(Z, "Failed to load CSV content"), s("success");
      }
    });
    const g = R(() => !f.value && m.value), C = R(
      () => $("edit") && !k.fs.isReadOnly(k.modal.data.item)
    ), S = R(() => f.value), I = R(() => f.value && r.value !== i.value), T = () => {
      r.value = i.value, f.value = !0, m.value = !1, k.modal.setEditMode(!0);
    }, L = () => {
      f.value = !1, r.value = i.value, k.modal.setEditMode(!1);
    }, q = async () => {
      try {
        await k.adapter.save({ path: k.modal.data.item.path, content: r.value }), i.value = r.value, await y(i.value), b.success(h("Updated.")), f.value = !1, k.modal.setEditMode(!1), s("success");
      } catch (Z) {
        b.error(Te(Z, h("Failed to save file")));
      }
    };
    return tn({
      isEditable: C,
      isEditing: S,
      isDirty: I,
      primaryActionLabel: R(() => h("Save")),
      enterEdit: T,
      commitEdit: q,
      cancelEdit: L
    }), (Z, ee) => (u(), _("div", fa, [
      o("div", _a, [
        g.value ? (u(), _(fe, { key: 1 }, [
          c.value ? (u(), _("div", ma, w(c.value), 1)) : !l.value.length && !d.value.length ? (u(), _("div", ha, w(a(h)("No rows to display")), 1)) : (u(), _("div", ga, [
            o("table", ya, [
              o("thead", null, [
                o("tr", null, [
                  ee[3] || (ee[3] = o("th", { class: "vuefinder__csv-preview__row-num" }, null, -1)),
                  (u(!0), _(fe, null, ge(d.value, (Q, W) => (u(), _("th", {
                    key: W,
                    title: Q
                  }, w(Q), 9, wa))), 128))
                ])
              ]),
              o("tbody", null, [
                (u(!0), _(fe, null, ge(v.value, (Q, W) => (u(), _("tr", { key: W }, [
                  o("td", ba, w(W + 1), 1),
                  (u(!0), _(fe, null, ge(Q, (P, D) => (u(), _("td", {
                    key: D,
                    title: P
                  }, w(P), 9, ka))), 128))
                ]))), 128))
              ])
            ]),
            p.value ? (u(), _("div", $a, w(a(h)("Showing first %s rows out of %s", Ht, l.value.length)), 1)) : j("", !0)
          ]))
        ], 64)) : (u(), X(Rn, { key: 0 }, {
          fallback: ie(() => [
            f.value ? he((u(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": ee[1] || (ee[1] = (Q) => r.value = Q),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [We, r.value]
            ]) : (u(), _("pre", pa, w(i.value), 1))
          ]),
          default: ie(() => [
            G(a(t), {
              "model-value": f.value ? r.value : i.value,
              readonly: !f.value,
              filename: a(k).modal.data.item.basename,
              "onUpdate:modelValue": ee[0] || (ee[0] = (Q) => f.value ? r.value = Q : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        f.value ? j("", !0) : (u(), _("label", xa, [
          he(o("input", {
            "onUpdate:modelValue": ee[2] || (ee[2] = (Q) => m.value = Q),
            type: "checkbox"
          }, null, 512), [
            [lt, m.value]
          ]),
          o("span", null, w(a(h)("Show as table")), 1)
        ]))
      ])
    ]));
  }
}), nn = async (n, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((s) => {
        e.file(s);
      });
      n(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), s = await new Promise((i) => {
        t.readEntries(i);
      });
      for (const i of s)
        await nn(n, i);
    }
  }
}, Se = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Qn(n) {
  const e = le(), { t } = e.i18n, s = e.fs, i = oe(s.path), r = e.config, l = M({ QUEUE_ENTRY_STATUS: Se }), d = M(null), c = M(null), f = M(null), m = M(null), p = M(null), v = M([]), k = M(""), b = M(!1), $ = M(!1), h = M(null);
  let y;
  const g = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !0;
  }, C = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !0;
  }, S = (x) => {
    x.preventDefault(), x.stopPropagation(), (!x.relatedTarget || x.relatedTarget === document.body) && ($.value = !1);
  }, I = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !1;
    const z = /^[/\\](.+)/, F = x.dataTransfer;
    F && (F.items && F.items.length ? Array.from(F.items).forEach((V) => {
      if (V.kind === "file") {
        const A = V.webkitGetAsEntry?.();
        if (A)
          nn((O, H) => {
            const E = z.exec(O?.fullPath || "");
            L(H, E ? E[1] : H.name);
          }, A);
        else {
          const O = V.getAsFile?.();
          O && L(O);
        }
      }
    }) : F.files && F.files.length && Array.from(F.files).forEach((V) => L(V)));
  }, T = (x) => v.value.findIndex((z) => z.id === x), L = (x, z) => y.addFile({ name: z || x.name, type: x.type, data: x, source: "Local" }), q = (x) => x.status === Se.DONE ? "text-green-600" : x.status === Se.ERROR || x.status === Se.CANCELED ? "text-red-600" : "", Z = (x) => x.status === Se.DONE ? "✓" : x.status === Se.ERROR || x.status === Se.CANCELED ? "!" : "...", ee = () => m.value?.click(), Q = () => e.modal.close(), W = (x) => {
    if (b.value || !v.value.filter((z) => z.status !== Se.DONE).length) {
      b.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", h.value = x || i.value, y.upload();
  }, P = () => {
    y.cancelAll(), v.value.forEach((x) => {
      x.status !== Se.DONE && (x.status = Se.CANCELED, x.statusName = t("Canceled"));
    }), b.value = !1;
  }, D = (x) => {
    b.value || (y.removeFile(x.id), v.value.splice(T(x.id), 1));
  }, U = (x) => {
    if (!b.value)
      if (y.cancelAll(), x) {
        const z = v.value.filter((F) => F.status !== Se.DONE);
        v.value = [], z.forEach((F) => L(F.originalFile, F.name));
      } else
        v.value = [];
  }, Y = (x) => {
    x.forEach((z) => {
      z instanceof File ? L(z) : L(z.file, z.name);
    });
  }, ue = (x, z) => x.endsWith("://") || x.endsWith("/") ? x + z : x + "/" + z, B = async (x, z) => {
    const F = z.trim();
    if (b.value || !F) return;
    if (F.includes("/") || F.includes("\\")) {
      k.value = t("Name cannot contain slashes.");
      return;
    }
    const V = x.name.split("/");
    V[V.length - 1] = F;
    const A = V.join("/");
    if (A === x.name) return;
    if (x.status === Se.DONE) {
      const me = h.value?.path || i.value.path, K = ue(me, x.name), se = x.name.split("/");
      se.pop();
      const ve = se.length ? ue(me, se.join("/")) : me;
      try {
        await e.adapter.rename({ path: ve, item: K, name: F }), x.name = A, e.adapter.invalidateListQuery(me), me === i.value.path && e.adapter.open(me);
      } catch (be) {
        k.value = be?.message || t("Failed to rename");
      }
      return;
    }
    const O = T(x.id);
    if (O === -1) return;
    const H = x.originalFile, E = x.name;
    y.removeFile(x.id), v.value.splice(O, 1);
    let N;
    try {
      N = L(H, A);
    } catch (me) {
      k.value = me?.message || t("Failed to rename");
      try {
        L(H, E);
      } catch {
      }
      return;
    }
    if (!N) return;
    const ce = T(N);
    if (ce !== -1 && ce !== O) {
      const me = v.value.splice(ce, 1)[0];
      me && v.value.splice(O, 0, me);
    }
  };
  return we(() => {
    y = new To({
      debug: e.debug,
      restrictions: { maxFileSize: Ho(r.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (V, A) => {
        if (A[V.id] != null) {
          const H = T(V.id);
          v.value[H]?.status === Se.PENDING && (k.value = y.i18n("noDuplicates", { fileName: V.name })), v.value = v.value.filter((E) => E.id !== V.id);
        }
        return v.value.push({
          id: V.id,
          name: V.name,
          size: e.filesize(V.size),
          status: Se.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: V.data
        }), !0;
      }
    });
    const x = {
      getTargetPath: () => (h.value || i.value).path
    };
    if (n)
      n(y, x);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(y, x);
    else
      throw new Error("No uploader configured");
    y.on("restriction-failed", (V, A) => {
      const O = v.value[T(V.id)];
      O && D(O), k.value = A.message;
    }), y.on("upload-start", (V) => {
      V.forEach((A) => {
        const O = v.value[T(A.id)];
        O && (O.status = Se.UPLOADING, O.statusName = t("Uploading"), O.percent = "0%");
      });
    }), y.on("upload-progress", (V, A) => {
      const O = A.bytesTotal ?? 1, H = Math.floor(A.bytesUploaded / O * 100), E = T(V.id);
      E !== -1 && v.value[E] && (v.value[E].percent = `${H}%`);
    }), y.on("upload-success", (V) => {
      const A = v.value[T(V.id)];
      A && (A.status = Se.DONE, A.statusName = t("Done"));
    }), y.on("upload-error", (V, A) => {
      const O = v.value[T(V.id)];
      O && (O.percent = null, O.status = Se.ERROR, O.statusName = A?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : A?.message || t("Unknown Error"));
    }), y.on("error", (V) => {
      k.value = V.message, b.value = !1;
    }), y.on("complete", (V) => {
      b.value = !1;
      const A = h.value || i.value;
      e.adapter.invalidateListQuery(A.path), e.adapter.open(A.path);
      const O = v.value.filter(
        (H) => H.status === Se.DONE && V.successful.includes(H.id)
      ).map((H) => H.name);
      e.emitter.emit("vf-upload-complete", O);
    }), m.value?.addEventListener("click", () => c.value?.click()), p.value?.addEventListener("click", () => f.value?.click());
    const z = { capture: !0 };
    document.addEventListener("dragover", g, z), document.addEventListener("dragenter", C, z), document.addEventListener("dragleave", S, z), document.addEventListener("drop", I, z);
    const F = (V) => {
      const A = V.target, O = A.files;
      if (O) {
        for (const H of O) L(H, H.webkitRelativePath || void 0);
        A.value = "";
      }
    };
    c.value?.addEventListener("change", F), f.value?.addEventListener("change", F);
  }), Ie(() => {
    const x = { capture: !0 };
    document.removeEventListener("dragover", g, x), document.removeEventListener("dragenter", C, x), document.removeEventListener("dragleave", S, x), document.removeEventListener("drop", I, x);
  }), {
    container: d,
    internalFileInput: c,
    internalFolderInput: f,
    pickFiles: m,
    pickFolders: p,
    queue: v,
    message: k,
    uploading: b,
    hasFilesInDropArea: $,
    definitions: l,
    openFileSelector: ee,
    upload: W,
    cancel: P,
    remove: D,
    clear: U,
    close: Q,
    getClassNameForEntry: q,
    getIconForEntry: Z,
    addExternalFiles: Y,
    renameEntry: B
  };
}
const $n = "image/png", on = "image/jpeg", Ca = "image/webp";
function Fa(n) {
  const e = (n.split(".").pop() ?? "").toLowerCase();
  return e === "png" ? $n : e === "webp" ? Ca : e === "gif" ? $n : on;
}
function Jn(n) {
  return new Promise((e, t) => {
    const s = new Image();
    s.crossOrigin = "anonymous", s.onload = () => e(s), s.onerror = () => t(new Error("Failed to load image")), s.src = n;
  });
}
function Zn(n, e) {
  const t = document.createElement("canvas");
  t.width = n, t.height = e;
  const s = t.getContext("2d");
  if (!s) throw new Error("Could not acquire 2D canvas context");
  return { canvas: t, ctx: s };
}
async function xn(n, e, t) {
  const s = await Jn(n), { canvas: i, ctx: r } = Zn(s.naturalWidth, s.naturalHeight);
  return r.filter = e, r.drawImage(s, 0, 0), i.toDataURL(t, t === on ? 0.92 : void 0);
}
async function Pa(n, e, t, s, i) {
  const r = await Jn(n), l = r.naturalWidth, d = r.naturalHeight, c = e === 90 || e === 270, { canvas: f, ctx: m } = Zn(c ? d : l, c ? l : d);
  return m.translate(f.width / 2, f.height / 2), e && m.rotate(e * Math.PI / 180), (t || s) && m.scale(t ? -1 : 1, s ? -1 : 1), m.drawImage(r, -l / 2, -d / 2), f.toDataURL(i, i === on ? 0.92 : void 0);
}
function Ea(n, e, t) {
  const s = 1 + n / 100, i = 1 + e / 100, r = 1 + t / 100;
  return `brightness(${s}) contrast(${i}) saturate(${r})`;
}
async function Ta(n) {
  return await (await fetch(n)).blob();
}
const Da = { class: "vuefinder__image-editor" }, Ma = {
  class: "vuefinder__image-editor__strip",
  role: "tablist"
}, Ia = ["aria-selected", "onClick"], Aa = {
  key: 0,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Oa = {
  key: 1,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, La = {
  key: 2,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ra = {
  key: 3,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ba = { class: "vuefinder__image-editor__tab-label" }, za = {
  key: 0,
  class: "vuefinder__image-editor__panel"
}, Va = { class: "vuefinder__image-editor__stage" }, Ua = { class: "vuefinder__image-editor__controls" }, Na = { class: "vuefinder__image-editor__chips" }, Ha = ["onClick"], ja = ["disabled"], Ka = {
  key: 1,
  class: "vuefinder__image-editor__panel"
}, qa = { class: "vuefinder__image-editor__stage" }, Wa = ["src", "alt"], Ga = { class: "vuefinder__image-editor__controls" }, Ya = { class: "vuefinder__image-editor__rotate-btns" }, Xa = ["title"], Qa = ["title"], Ja = ["title"], Za = ["title"], ei = ["disabled"], ti = {
  key: 2,
  class: "vuefinder__image-editor__panel"
}, ni = { class: "vuefinder__image-editor__stage" }, oi = ["src", "alt"], si = { class: "vuefinder__image-editor__controls" }, ai = { class: "vuefinder__image-editor__toggle" }, ii = ["disabled"], li = {
  key: 3,
  class: "vuefinder__image-editor__panel"
}, ri = { class: "vuefinder__image-editor__stage" }, di = ["src", "alt"], ci = { class: "vuefinder__image-editor__controls vuefinder__image-editor__controls--stacked" }, ui = { class: "vuefinder__image-editor__slider" }, vi = { class: "vuefinder__image-editor__slider" }, fi = { class: "vuefinder__image-editor__slider" }, _i = { class: "vuefinder__image-editor__row" }, pi = ["disabled"], mi = /* @__PURE__ */ re({
  name: "ImageEditor",
  __name: "ImageEditor",
  props: {
    src: {},
    filename: {}
  },
  emits: ["update:src"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = le(), { t: r } = i.i18n, l = M("crop"), d = M(!1), c = M(null), f = [
      { label: "Original", value: null },
      { label: "1:1", value: 1 },
      { label: "4:3", value: 4 / 3 },
      { label: "16:9", value: 16 / 9 },
      { label: "9:16", value: 9 / 16 }
    ], m = st("cropperRef"), p = M(0), v = M(!1), k = M(!1), b = M(!1), $ = M(0), h = M(0), y = M(0), g = R(
      () => Ea($.value, h.value, y.value)
    );
    pe([() => t.src, l], () => {
      p.value = 0, v.value = !1, k.value = !1, b.value = !1, $.value = 0, h.value = 0, y.value = 0;
    });
    const C = R(() => Fa(t.filename)), S = R(() => {
      const x = [];
      return p.value && x.push(`rotate(${p.value}deg)`), v.value && x.push("scaleX(-1)"), k.value && x.push("scaleY(-1)"), x.length ? { transform: x.join(" ") } : {};
    }), I = (x) => {
      d.value || (l.value = x);
    }, T = () => {
      const z = m.value?.getResult()?.canvas;
      if (!z) return;
      const F = z.toDataURL(C.value, C.value === "image/jpeg" ? 0.92 : void 0);
      s("update:src", F);
    }, L = async () => {
      if (Y.value) {
        d.value = !0;
        try {
          const x = await Pa(
            t.src,
            U.value,
            v.value,
            k.value,
            C.value
          );
          s("update:src", x);
        } finally {
          d.value = !1;
        }
      }
    }, q = async () => {
      if (b.value) {
        d.value = !0;
        try {
          const x = await xn(t.src, "grayscale(1)", C.value);
          s("update:src", x);
        } finally {
          d.value = !1;
        }
      }
    }, Z = async () => {
      if (!($.value === 0 && h.value === 0 && y.value === 0)) {
        d.value = !0;
        try {
          const x = await xn(t.src, g.value, C.value);
          s("update:src", x);
        } finally {
          d.value = !1;
        }
      }
    }, ee = () => {
      $.value = 0, h.value = 0, y.value = 0;
    }, Q = () => {
      p.value -= 90;
    }, W = () => {
      p.value += 90;
    }, P = () => {
      v.value = !v.value;
    }, D = () => {
      k.value = !k.value;
    }, U = R(
      () => (p.value % 360 + 360) % 360
    ), Y = R(
      () => U.value !== 0 || v.value || k.value
    ), ue = R(
      () => $.value !== 0 || h.value !== 0 || y.value !== 0
    ), B = R(() => b.value);
    return (x, z) => (u(), _("div", Da, [
      o("div", Ma, [
        (u(), _(fe, null, ge(["crop", "rotate", "grayscale", "adjust"], (F) => o("button", {
          key: F,
          type: "button",
          role: "tab",
          "aria-selected": l.value === F,
          class: te(["vuefinder__image-editor__tab", { "vuefinder__image-editor__tab--active": l.value === F }]),
          onClick: (V) => I(F)
        }, [
          F === "crop" ? (u(), _("svg", Aa, [...z[4] || (z[4] = [
            o("path", { d: "M6 2v16a2 2 0 0 0 2 2h14" }, null, -1),
            o("path", { d: "M2 6h16a2 2 0 0 1 2 2v14" }, null, -1)
          ])])) : F === "rotate" ? (u(), _("svg", Oa, [...z[5] || (z[5] = [
            o("polyline", { points: "23 4 23 10 17 10" }, null, -1),
            o("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" }, null, -1)
          ])])) : F === "grayscale" ? (u(), _("svg", La, [...z[6] || (z[6] = [
            o("circle", {
              cx: "12",
              cy: "12",
              r: "9"
            }, null, -1),
            o("path", { d: "M12 3v18" }, null, -1),
            o("path", {
              d: "M12 3a9 9 0 0 0 0 18",
              fill: "currentColor"
            }, null, -1)
          ])])) : (u(), _("svg", Ra, [...z[7] || (z[7] = [
            St('<line x1="4" y1="6" x2="14" y2="6"></line><circle cx="17" cy="6" r="2"></circle><line x1="10" y1="12" x2="20" y2="12"></line><circle cx="7" cy="12" r="2"></circle><line x1="4" y1="18" x2="14" y2="18"></line><circle cx="17" cy="18" r="2"></circle>', 6)
          ])])),
          o("span", Ba, w(F === "crop" ? a(r)("Crop") : F === "rotate" ? a(r)("Rotate") : F === "grayscale" ? a(r)("Grayscale") : a(r)("Adjust")), 1)
        ], 10, Ia)), 64))
      ]),
      l.value === "crop" ? (u(), _("div", za, [
        o("div", Va, [
          G(a(Do), {
            ref_key: "cropperRef",
            ref: m,
            class: "vuefinder__image-editor__cropper",
            crossorigin: "anonymous",
            src: t.src,
            "stencil-props": c.value === null ? {} : { aspectRatio: c.value },
            "auto-zoom": !0,
            priority: "image",
            transitions: !0
          }, null, 8, ["src", "stencil-props"])
        ]),
        o("div", Ua, [
          o("div", Na, [
            (u(), _(fe, null, ge(f, (F) => o("button", {
              key: F.label,
              type: "button",
              class: te(["vuefinder__image-editor__chip", { "vuefinder__image-editor__chip--active": c.value === F.value }]),
              onClick: (V) => c.value = F.value
            }, w(a(r)(F.label)), 11, Ha)), 64))
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value,
            onClick: T
          }, w(a(r)("Apply")), 9, ja)
        ])
      ])) : l.value === "rotate" ? (u(), _("div", Ka, [
        o("div", qa, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Me(S.value),
            alt: t.filename
          }, null, 12, Wa)
        ]),
        o("div", Ga, [
          o("div", Ya, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__icon-btn",
              title: a(r)("Rotate left 90°"),
              onClick: Q
            }, [...z[8] || (z[8] = [
              o("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.8",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                o("polyline", { points: "1 4 1 10 7 10" }),
                o("path", { d: "M3.51 15a9 9 0 1 0 2.13-9.36L1 10" })
              ], -1)
            ])], 8, Xa),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__icon-btn",
              title: a(r)("Rotate right 90°"),
              onClick: W
            }, [...z[9] || (z[9] = [
              o("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.8",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                o("polyline", { points: "23 4 23 10 17 10" }),
                o("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" })
              ], -1)
            ])], 8, Qa),
            o("button", {
              type: "button",
              class: te(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": v.value }]),
              title: a(r)("Flip horizontal"),
              onClick: P
            }, [...z[10] || (z[10] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 7 8 11"></polyline><polyline points="16 3 20 7 16 11"></polyline><line x1="4" y1="7" x2="20" y2="7"></line><line x1="12" y1="13" x2="12" y2="21"></line></svg>', 1)
            ])], 10, Ja),
            o("button", {
              type: "button",
              class: te(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": k.value }]),
              title: a(r)("Flip vertical"),
              onClick: D
            }, [...z[11] || (z[11] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8 7 4 11 8"></polyline><polyline points="3 16 7 20 11 16"></polyline><line x1="7" y1="4" x2="7" y2="20"></line><line x1="13" y1="12" x2="21" y2="12"></line></svg>', 1)
            ])], 10, Za)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value || !Y.value,
            onClick: L
          }, w(a(r)("Apply")), 9, ei)
        ])
      ])) : l.value === "grayscale" ? (u(), _("div", ti, [
        o("div", ni, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Me(b.value ? { filter: "grayscale(1)" } : {}),
            alt: t.filename
          }, null, 12, oi)
        ]),
        o("div", si, [
          o("label", ai, [
            he(o("input", {
              "onUpdate:modelValue": z[0] || (z[0] = (F) => b.value = F),
              type: "checkbox"
            }, null, 512), [
              [lt, b.value]
            ]),
            o("span", null, w(a(r)("Grayscale")), 1)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value || !B.value,
            onClick: q
          }, w(a(r)("Apply")), 9, ii)
        ])
      ])) : (u(), _("div", li, [
        o("div", ri, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Me({ filter: g.value }),
            alt: t.filename
          }, null, 12, di)
        ]),
        o("div", ci, [
          o("div", ui, [
            o("label", null, [
              ye(w(a(r)("Brightness")), 1),
              o("span", null, w($.value), 1)
            ]),
            he(o("input", {
              "onUpdate:modelValue": z[1] || (z[1] = (F) => $.value = F),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                We,
                $.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", vi, [
            o("label", null, [
              ye(w(a(r)("Contrast")), 1),
              o("span", null, w(h.value), 1)
            ]),
            he(o("input", {
              "onUpdate:modelValue": z[2] || (z[2] = (F) => h.value = F),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                We,
                h.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", fi, [
            o("label", null, [
              ye(w(a(r)("Saturation")), 1),
              o("span", null, w(y.value), 1)
            ]),
            he(o("input", {
              "onUpdate:modelValue": z[3] || (z[3] = (F) => y.value = F),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                We,
                y.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", _i, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__reset",
              onClick: ee
            }, w(a(r)("Reset")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__apply",
              disabled: d.value || !ue.value,
              onClick: Z
            }, w(a(r)("Apply")), 9, pi)
          ])
        ])
      ]))
    ]));
  }
}), hi = { class: "vuefinder__image-preview" }, gi = ["src"], yi = ["aria-label", "title"], wi = ["aria-label", "title"], bi = ["aria-label", "title"], ki = 0.5, $i = 3, Sn = 0.25, xi = /* @__PURE__ */ re({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, s = le(), i = Ve(s), { enabled: r } = Ne(), { t: l } = s.i18n, d = M(!1), c = M(
      s.modal.data.item.previewUrl ?? s.adapter.getPreviewUrl({ path: s.modal.data.item.path })
    ), f = M(c.value), m = M(!1), p = M(1), v = M(null), k = M(0), b = M(0), $ = M(1), h = M(!1), y = M(0), g = M(0);
    let C = null, S = 0, I = 0, T = 0, L = 0;
    const { addExternalFiles: q, upload: Z, queue: ee } = Qn(s.customUploader), Q = s.fs, W = oe(Q.path), P = R(() => k.value * $.value), D = R(() => b.value * $.value), U = (K, se) => {
      const ve = v.value?.clientWidth ?? 0, be = v.value?.clientHeight ?? 0, Oe = Math.max(0, (P.value * p.value - ve) / 2), tt = Math.max(0, (D.value * p.value - be) / 2);
      return {
        x: Math.min(Oe, Math.max(-Oe, K)),
        y: Math.min(tt, Math.max(-tt, se))
      };
    }, Y = R(() => {
      if (!k.value || !b.value)
        return {};
      const { x: K, y: se } = U(y.value, g.value);
      return {
        width: `${P.value}px`,
        height: `${D.value}px`,
        transform: `translate(${K}px, ${se}px) scale(${p.value})`,
        transformOrigin: "center center"
      };
    }), ue = () => {
      if (!v.value || !k.value || !b.value) return;
      const K = v.value.getBoundingClientRect();
      !K.width || !K.height || ($.value = Math.min(K.width / k.value, K.height / b.value));
    }, B = (K) => {
      const se = K.target;
      se instanceof HTMLImageElement && (k.value = se.naturalWidth || se.clientWidth, b.value = se.naturalHeight || se.clientHeight, ue());
    }, x = (K) => Math.min($i, Math.max(ki, K)), z = () => {
      p.value = x(Number((p.value + Sn).toFixed(2)));
      const K = U(y.value, g.value);
      y.value = K.x, g.value = K.y;
    }, F = () => {
      p.value = x(Number((p.value - Sn).toFixed(2)));
      const K = U(y.value, g.value);
      y.value = K.x, g.value = K.y;
    }, V = () => {
      p.value = 1, y.value = 0, g.value = 0;
    }, A = (K) => {
      d.value || (K.deltaY > 0 ? F() : K.deltaY < 0 && z());
    }, O = (K) => {
      if (d.value) return;
      const se = K.target;
      if (se instanceof HTMLInputElement || se instanceof HTMLTextAreaElement || se?.isContentEditable)
        return;
      const ve = K.key === "=" || K.key === "+", be = K.key === "-" || K.key === "_", Oe = K.key === "0";
      if (!(!ve && !be && !Oe)) {
        if (K.preventDefault(), ve) {
          z();
          return;
        }
        if (be) {
          F();
          return;
        }
        V();
      }
    }, H = () => {
      h.value = !1;
    }, E = (K) => {
      d.value || p.value <= 1 || !v.value || (h.value = !0, S = K.clientX, I = K.clientY, T = y.value, L = g.value, K.currentTarget?.setPointerCapture?.(K.pointerId));
    }, N = (K) => {
      if (!h.value) return;
      const se = K.clientX - S, ve = K.clientY - I, be = U(T + se, L + ve);
      y.value = be.x, g.value = be.y;
    };
    tn({
      isEditable: R(
        () => r("edit") && !s.fs.isReadOnly(s.modal.data.item)
      ),
      isEditing: R(() => d.value),
      isDirty: R(() => d.value && m.value),
      primaryActionLabel: R(() => l("Save")),
      enterEdit: () => {
        f.value = c.value, m.value = !1, d.value = !0, s.modal.setEditMode(!0);
      },
      commitEdit: () => me(),
      cancelEdit: () => {
        d.value = !1, f.value = c.value, m.value = !1, s.modal.setEditMode(!1);
      },
      extraInfo: R(() => !k.value || !b.value ? [] : [{ label: l("Dimensions"), value: `${k.value} × ${b.value}` }])
    });
    const ce = (K) => {
      f.value = K, m.value = !0;
    }, me = async () => {
      if (!m.value) return;
      const K = s.modal.data.item.basename, se = K.split(".").pop()?.toLowerCase() || "jpg", ve = se === "png" ? "image/png" : se === "gif" ? "image/gif" : "image/jpeg";
      try {
        const be = await Ta(f.value), Oe = new File([be], K, { type: ve }), J = s.modal.data.item.path.split("/");
        J.pop();
        const ae = {
          path: J.join("/") || (W.value?.path ?? "")
        };
        q([Oe]), await new Promise((Ce) => setTimeout(Ce, 100));
        const de = ee.value.find((Ce) => Ce.name === Oe.name);
        if (!de)
          throw new Error("File was not added to upload queue");
        Z(ae);
        let He = 0;
        for (; He < 150; ) {
          await new Promise((Ye) => setTimeout(Ye, 200));
          const Ce = ee.value.find((Ye) => Ye.id === de.id);
          if (Ce?.status === Se.DONE) break;
          if (Ce?.status === Se.ERROR)
            throw new Error(Ce.statusName || "Upload failed");
          He++;
        }
        i.success(l("Updated.")), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const De = s.root?.querySelector?.('[data-src="' + c.value + '"]');
        De && De instanceof HTMLElement && qt.resetStatus(De), s.emitter.emit("vf-refresh-thumbnails"), d.value = !1, m.value = !1, f.value = c.value, s.modal.setEditMode(!1), t("success");
      } catch (be) {
        i.error(Te(be, l("Failed to save image")));
      }
    };
    return we(() => {
      C = new ResizeObserver(() => {
        ue();
      }), v.value && C.observe(v.value), window.addEventListener("keydown", O), t("success");
    }), wt(() => {
      window.removeEventListener("keydown", O), C?.disconnect();
    }), (K, se) => (u(), _("div", hi, [
      o("div", {
        ref_key: "imageContainer",
        ref: v,
        class: "vuefinder__image-preview__image-container"
      }, [
        d.value ? (u(), X(mi, {
          key: 1,
          src: f.value,
          filename: a(s).modal.data.item.basename,
          "onUpdate:src": ce
        }, null, 8, ["src", "filename"])) : (u(), _("div", {
          key: 0,
          class: "vuefinder__image-preview__stage",
          onWheel: _e(A, ["prevent"])
        }, [
          o("img", {
            style: Me(Y.value),
            src: a(s).modal.data.item.previewUrl ?? a(s).adapter.getPreviewUrl({ path: a(s).modal.data.item.path }),
            class: te(["vuefinder__image-preview__image", {
              "vuefinder__image-preview__image--zoomed": p.value > 1,
              "vuefinder__image-preview__image--panning": h.value
            }]),
            draggable: !1,
            onLoad: B,
            onPointerdown: E,
            onPointermove: N,
            onPointerup: H,
            onPointercancel: H,
            onLostpointercapture: H
          }, null, 46, gi),
          o("div", {
            class: "vuefinder__image-preview__zoom-controls",
            onPointerdown: se[0] || (se[0] = _e(() => {
            }, ["stop"])),
            onWheel: se[1] || (se[1] = _e(() => {
            }, ["stop"]))
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(l)("Zoom out"),
              title: a(l)("Zoom out"),
              onClick: F
            }, [...se[2] || (se[2] = [
              o("svg", {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                o("circle", {
                  cx: "11",
                  cy: "11",
                  r: "7"
                }),
                o("line", {
                  x1: "8",
                  y1: "11",
                  x2: "14",
                  y2: "11"
                }),
                o("line", {
                  x1: "16.5",
                  y1: "16.5",
                  x2: "21",
                  y2: "21"
                })
              ], -1)
            ])], 8, yi),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-reset",
              "aria-label": a(l)("Reset zoom"),
              title: a(l)("Reset zoom"),
              onClick: V
            }, w(Math.round(p.value * 100)) + "% ", 9, wi),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(l)("Zoom in"),
              title: a(l)("Zoom in"),
              onClick: z
            }, [...se[3] || (se[3] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>', 1)
            ])], 8, bi)
          ], 32)
        ], 32))
      ], 512)
    ]));
  }
}), Si = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ci(n, e) {
  return u(), _("svg", Si, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ht = { render: Ci }, Fi = { class: "vuefinder__default-preview" }, Pi = { class: "vuefinder__default-preview__content" }, Ei = { class: "vuefinder__default-preview__icon-container" }, Ti = ["title"], Di = /* @__PURE__ */ re({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = le(), s = e;
    return we(() => {
      s("success");
    }), (i, r) => (u(), _("div", Fi, [
      o("div", Pi, [
        o("div", Ei, [
          G(a(ht), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            class: "vuefinder__default-preview__file-name",
            title: a(t).modal.data.item.path
          }, w(a(t).modal.data.item.basename), 9, Ti)
        ])
      ])
    ]));
  }
}), Mi = { class: "vuefinder__video-preview" }, Ii = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Ai = ["src"], Oi = /* @__PURE__ */ re({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = le(), s = e, i = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return we(() => {
      s("success");
    }), (r, l) => (u(), _("div", Mi, [
      o("div", null, [
        o("video", Ii, [
          o("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, Ai),
          l[0] || (l[0] = ye(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Li = { class: "vuefinder__audio-preview" }, Ri = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Bi = ["src"], zi = /* @__PURE__ */ re({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e;
    le();
    const s = () => {
      const i = le();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return we(() => {
      t("success");
    }), (i, r) => (u(), _("div", Li, [
      o("div", null, [
        o("audio", Ri, [
          o("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Bi),
          r[0] || (r[0] = ye(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Vi = { class: "vuefinder__pdf-preview" }, Ui = ["data"], Ni = ["src"], Hi = /* @__PURE__ */ re({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    le();
    const t = e, s = () => {
      const i = le();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return we(() => {
      t("success");
    }), (i, r) => (u(), _("div", Vi, [
      o("div", null, [
        o("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          o("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Ni)
        ], 8, Ui)
      ])
    ]));
  }
}), ji = ["data-theme"], Ki = ["disabled", "title"], qi = ["disabled", "title"], Wi = { class: "vuefinder__preview-modal__content" }, Gi = { key: 0 }, Yi = {
  key: 1,
  class: "vuefinder__preview-modal__status-strip"
}, Xi = ["aria-label"], Qi = { class: "vuefinder__preview-modal__loading" }, Ji = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Zi = { class: "vuefinder__preview-modal__edit-actions" }, el = ["disabled"], Cn = 8, tl = 1.4, nl = 0.22, dt = 220, ol = ".vuefinder__preview-chrome__title, .vuefinder__preview-modal__status-strip", Qe = /* @__PURE__ */ re({
  __name: "ModalPreview",
  setup(n) {
    const e = le(), { enabled: t } = Ne(), { t: s } = e.i18n, i = M(!1), r = (A) => {
      const O = (A || "").split("/").pop() || "", H = O.lastIndexOf(".");
      return H >= 0 ? O.slice(H + 1).toLowerCase() : "";
    }, l = (A, O) => {
      if (!O) return !1;
      const H = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), E = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), N = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), ce = /* @__PURE__ */ new Set([
        "txt",
        "md",
        "markdown",
        "json",
        "jsonc",
        "js",
        "mjs",
        "cjs",
        "ts",
        "tsx",
        "jsx",
        "vue",
        "svelte",
        "css",
        "scss",
        "sass",
        "less",
        "html",
        "htm",
        "xml",
        "svg",
        "csv",
        "tsv",
        "log",
        "yml",
        "yaml",
        "toml",
        "ini",
        "conf",
        "env",
        "sh",
        "bash",
        "zsh",
        "fish",
        "py",
        "rb",
        "php",
        "go",
        "rs",
        "java",
        "kt",
        "swift",
        "c",
        "h",
        "cpp",
        "hpp",
        "cs",
        "sql",
        "graphql",
        "gql",
        "dockerfile",
        "gitignore",
        "gitattributes",
        "editorconfig",
        "prettierrc",
        "eslintrc",
        "lock"
      ]);
      return A === "image" ? H.has(O) : A === "video" ? E.has(O) : A === "audio" ? N.has(O) : A === "csv" ? O === "csv" || O === "tsv" : A === "text" ? ce.has(O) : A === "application/pdf" ? O === "pdf" : !1;
    }, d = (A) => {
      const O = e.modal.data.forceType;
      if (O) return O === A;
      const H = e.modal.data.item.mime_type;
      if (H && typeof H == "string" && H.startsWith(A)) return !0;
      const E = r(e.modal.data.item.path);
      return l(A, E);
    }, c = t("preview");
    c || (i.value = !0);
    const f = R(() => e.modal.data.item), m = oe(e.fs.sortedFiles), p = R(() => m.value.filter((A) => A.type === "file")), v = R(
      () => p.value.findIndex((A) => A.path === f.value.path)
    ), k = R(() => !!a(e.modal.controls?.isEditable)), b = R(() => !!a(e.modal.controls?.isEditing)), $ = R(() => !!a(e.modal.controls?.isDirty)), h = R(
      () => a(e.modal.controls?.primaryActionLabel) ?? s("Save")
    ), y = async () => {
      await e.modal.controls?.enterEdit?.();
    }, g = async () => {
      await e.modal.controls?.commitEdit?.();
    }, C = async () => {
      $.value && !window.confirm(s("Discard unsaved changes?")) || await e.modal.controls?.cancelEdit?.();
    }, S = R(() => !b.value && v.value > 0), I = R(
      () => !b.value && v.value < p.value.length - 1
    ), T = () => {
      if (!S.value) return;
      const A = p.value[v.value - 1];
      A && (e.fs.clearSelection(), e.fs.select(A.path), e.modal.data.item = A, i.value = !1);
    }, L = () => {
      if (!I.value) return;
      const A = p.value[v.value + 1];
      A && (e.fs.clearSelection(), e.fs.select(A.path), e.modal.data.item = A, i.value = !1);
    }, q = () => {
      b.value && $.value && !window.confirm(s("Discard unsaved changes?")) || e.modal.close();
    }, Z = M(0), ee = M(!1);
    let Q = 0, W = 0, P = !1, D = !1;
    const U = R(() => ({
      transform: `translate3d(${Z.value}px, 0, 0)`,
      transition: ee.value ? `transform ${dt}ms ease-out` : "none"
    })), Y = (A, O) => {
      setTimeout(O, A);
    }, ue = (A) => {
      if (b.value || A.touches.length !== 1 || !A.target?.closest?.(ol)) return;
      const H = A.touches[0];
      H && (P = !0, D = !1, Q = H.clientX, W = H.clientY, ee.value = !1);
    }, B = (A) => {
      if (!P) return;
      const O = A.touches[0];
      if (!O) return;
      const H = O.clientX - Q, E = O.clientY - W;
      if (!D) {
        if (Math.abs(H) < Cn && Math.abs(E) < Cn) return;
        if (Math.abs(H) < Math.abs(E) * tl) {
          P = !1;
          return;
        }
        D = !0;
      }
      let N = H;
      H > 0 && !S.value && (N = H * 0.3), H < 0 && !I.value && (N = H * 0.3), Z.value = N, A.cancelable && A.preventDefault();
    }, x = (A) => {
      const O = window.innerWidth || 1, H = A === "prev" ? O : -O, E = A === "prev" ? -O : O, N = A === "prev" ? T : L;
      ee.value = !0, Z.value = H, Y(dt, () => {
        N(), ee.value = !1, Z.value = E, requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ee.value = !0, Z.value = 0, Y(dt, () => {
              ee.value = !1;
            });
          });
        });
      });
    }, z = () => {
      if (!P || (P = !1, !D)) return;
      const A = window.innerWidth || 1, O = Z.value, H = Math.abs(O) >= A * nl;
      if (H && O > 0 && S.value) {
        x("prev");
        return;
      }
      if (H && O < 0 && I.value) {
        x("next");
        return;
      }
      ee.value = !0, Z.value = 0, Y(dt, () => {
        ee.value = !1;
      });
    }, F = () => {
      P && (P = !1, D && (ee.value = !0, Z.value = 0, Y(dt, () => {
        ee.value = !1;
      })));
    }, V = (A) => {
      if (A.key === "Escape") {
        A.preventDefault(), A.stopPropagation(), q();
        return;
      }
      if ((A.metaKey || A.ctrlKey) && A.key.toLowerCase() === "s") {
        const O = e.modal.controls;
        if (O && a(O.isEditing)) {
          A.preventDefault(), O.commitEdit();
          return;
        }
      }
      b.value || (A.key === "ArrowLeft" || A.key === "ArrowRight") && (A.preventDefault(), A.stopPropagation(), A.key === "ArrowLeft" ? T() : L());
    };
    return we(() => {
      const A = document.querySelector(".vuefinder__preview-modal");
      A && A.focus();
    }), (A, O) => (u(), X(Ue, {
      "on-request-close": q,
      "body-style": U.value,
      "body-class": "vuefinder__modal-layout__body--swipeable " + (b.value ? "vuefinder__modal-layout__body--editing" : ""),
      "on-body-touchstart": ue,
      "on-body-touchmove": B,
      "on-body-touchend": z,
      "on-body-touchcancel": F
    }, yo({
      default: ie(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: V
        }, [
          G(ra, { onCloseRequest: q }),
          (u(), X(bt, { to: "body" }, [
            b.value ? j("", !0) : (u(), _("div", {
              key: 0,
              class: "vuefinder__themer vuefinder__preview-modal__nav-overlay",
              "data-theme": a(e).theme.current
            }, [
              o("button", {
                disabled: !S.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
                title: a(s)("Previous file"),
                onClick: T
              }, [...O[7] || (O[7] = [
                o("svg", {
                  class: "vuefinder__preview-modal__nav-icon",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  o("polyline", { points: "15,18 9,12 15,6" })
                ], -1)
              ])], 8, Ki),
              o("button", {
                disabled: !I.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
                title: a(s)("Next file"),
                onClick: L
              }, [...O[8] || (O[8] = [
                o("svg", {
                  class: "vuefinder__preview-modal__nav-icon",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  o("polyline", { points: "9,18 15,12 9,6" })
                ], -1)
              ])], 8, qi)
            ], 8, ji))
          ])),
          o("div", Wi, [
            a(c) ? (u(), _("div", Gi, [
              d("csv") ? (u(), X(Sa, {
                key: `csv-${f.value.path}`,
                onSuccess: O[0] || (O[0] = (H) => i.value = !0)
              })) : d("text") ? (u(), X(va, {
                key: `text-${f.value.path}`,
                onSuccess: O[1] || (O[1] = (H) => i.value = !0)
              })) : d("image") ? (u(), X(xi, {
                key: `image-${f.value.path}`,
                onSuccess: O[2] || (O[2] = (H) => i.value = !0)
              })) : d("video") ? (u(), X(Oi, {
                key: `video-${f.value.path}`,
                onSuccess: O[3] || (O[3] = (H) => i.value = !0)
              })) : d("audio") ? (u(), X(zi, {
                key: `audio-${f.value.path}`,
                onSuccess: O[4] || (O[4] = (H) => i.value = !0)
              })) : d("application/pdf") ? (u(), X(Hi, {
                key: `pdf-${f.value.path}`,
                onSuccess: O[5] || (O[5] = (H) => i.value = !0)
              })) : (u(), X(Di, {
                key: `default-${f.value.path}`,
                onSuccess: O[6] || (O[6] = (H) => i.value = !0)
              }))
            ])) : j("", !0),
            b.value || p.value.length > 1 ? (u(), _("div", Yi, [
              b.value ? (u(), _("span", {
                key: 0,
                class: te(["vuefinder__preview-modal__edit-chip", { "vuefinder__preview-modal__edit-chip--dirty": $.value }])
              }, w($.value ? a(s)("Unsaved") : a(s)("Editing")), 3)) : (u(), _("span", {
                key: 1,
                class: "vuefinder__preview-modal__pagination-text",
                "aria-label": a(s)("File %s of %s", String(v.value + 1), String(p.value.length))
              }, w(v.value + 1) + " / " + w(p.value.length), 9, Xi))
            ])) : j("", !0),
            o("div", Qi, [
              i.value === !1 ? (u(), _("div", Ji, [
                O[9] || (O[9] = o("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  o("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  o("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                o("span", null, w(a(s)("Loading")), 1)
              ])) : j("", !0)
            ])
          ])
        ], 32)
      ]),
      _: 2
    }, [
      k.value ? {
        name: "buttons",
        fn: ie(() => [
          o("div", Zi, [
            b.value ? (u(), _(fe, { key: 1 }, [
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
                disabled: !$.value,
                onClick: g
              }, w(h.value), 9, el),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary vuefinder__preview-modal__edit-btn",
                onClick: C
              }, w(a(s)("Cancel")), 1)
            ], 64)) : (u(), _("button", {
              key: 0,
              type: "button",
              class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
              onClick: y
            }, w(a(s)("Edit")), 1))
          ])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["body-style", "body-class"]));
  }
}), sl = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function al(n, e) {
  return u(), _("svg", sl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const il = { render: al }, ll = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function rl(n, e) {
  return u(), _("svg", ll, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const sn = { render: rl }, dl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function cl(n, e) {
  return u(), _("svg", dl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const ze = { render: cl }, ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function vl(n, e) {
  return u(), _("svg", ul, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Mt = { render: vl }, fl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function _l(n, e) {
  return u(), _("svg", fl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const It = { render: _l }, pl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function ml(n, e) {
  return u(), _("svg", pl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const gt = { render: ml }, hl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function gl(n, e) {
  return u(), _("svg", hl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const an = { render: gl }, yl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function wl(n, e) {
  return u(), _("svg", yl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const At = { render: wl }, bl = { class: "vuefinder__modal-tree__folder-item" }, kl = { class: "vuefinder__modal-tree__folder-content" }, $l = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, xl = { class: "vuefinder__modal-tree__folder-text" }, Sl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Cl = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Fl = 300, Pl = /* @__PURE__ */ re({
  __name: "ModalTreeFolderItem",
  props: {
    folder: {},
    storage: {},
    modelValue: {},
    expandedFolders: {},
    modalTreeData: {},
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose", "toggleFolder"],
  setup(n, { emit: e }) {
    const t = le(), { t: s } = t.i18n, i = t.fs, r = M({}), l = n, d = e;
    oe(i.path);
    const c = R(() => {
      const L = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[L] || !1;
    }), f = R(() => l.modelValue?.path === l.folder.path), m = R(() => l.currentPath?.path === l.folder.path), p = R(() => l.modalTreeData[l.folder.path] || []), v = R(() => {
      const L = p.value, q = r.value[l.folder.path] || 50;
      return L.length > q ? L.slice(0, q) : L;
    }), k = R(() => p.value.length), b = R(() => r.value[l.folder.path] || 50), $ = R(() => k.value > b.value), h = () => {
      r.value[l.folder.path] = (b.value || 50) + 50;
    }, y = R(() => p.value.length > 0 || l.folder.type === "dir"), g = () => {
      d("toggleFolder", l.storage, l.folder.path);
    }, C = () => {
      d("update:modelValue", l.folder);
    }, S = () => {
      d("update:modelValue", l.folder), d("selectAndClose", l.folder);
    };
    let I = 0;
    const T = () => {
      const L = Date.now();
      L - I < Fl ? S() : C(), I = L;
    };
    return (L, q) => {
      const Z = Bn("ModalTreeFolderItem", !0);
      return u(), _("div", bl, [
        o("div", kl, [
          y.value ? (u(), _("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: g
          }, [
            c.value ? (u(), X(a(It), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), X(a(Mt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), _("div", $l)),
          o("div", {
            class: te(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": f.value,
              "vuefinder__modal-tree__folder-link--current": m.value
            }]),
            onClick: C,
            onDblclick: S,
            onTouchend: T
          }, [
            c.value ? (u(), X(a(At), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), X(a(ze), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", xl, w(n.folder.basename), 1)
          ], 34)
        ]),
        c.value && y.value ? (u(), _("div", Sl, [
          (u(!0), _(fe, null, ge(v.value, (ee) => (u(), X(Z, {
            key: ee.path,
            folder: ee,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": q[0] || (q[0] = (Q) => L.$emit("update:modelValue", Q)),
            onSelectAndClose: q[1] || (q[1] = (Q) => L.$emit("selectAndClose", Q)),
            onToggleFolder: q[2] || (q[2] = (Q, W) => L.$emit("toggleFolder", Q, W))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          $.value ? (u(), _("div", Cl, [
            o("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: h
            }, w(a(s)("load more")), 1)
          ])) : j("", !0)
        ])) : j("", !0)
      ]);
    };
  }
}), El = { class: "vuefinder__modal-tree" }, Tl = { class: "vuefinder__modal-tree__header" }, Dl = { class: "vuefinder__modal-tree__title" }, Ml = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Il = { class: "vuefinder__modal-tree__section-title" }, Al = { class: "vuefinder__modal-tree__list" }, Ol = ["onClick", "onDblclick", "onTouchend"], Ll = { class: "vuefinder__modal-tree__text" }, Rl = { class: "vuefinder__modal-tree__text-storage" }, Bl = { class: "vuefinder__modal-tree__section-title" }, zl = { class: "vuefinder__modal-tree__list" }, Vl = { class: "vuefinder__modal-tree__storage-item" }, Ul = { class: "vuefinder__modal-tree__storage-content" }, Nl = ["onClick"], Hl = ["onClick", "onDblclick", "onTouchend"], jl = { class: "vuefinder__modal-tree__storage-text" }, Kl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, ql = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Wl = ["onClick"], Fn = 300, kt = /* @__PURE__ */ re({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = le(), { t: s } = t.i18n, i = t.fs, r = t.config, l = e, d = oe(i.sortedFiles), c = oe(i.storages), f = R(() => c.value || []), m = oe(i.path), p = M(null), v = M({}), k = M({}), b = M({});
    pe(d, (P) => {
      const D = P.filter((Y) => Y.type === "dir"), U = m.value?.path || "";
      U && (k.value[U] = D.map((Y) => ({
        ...Y,
        type: "dir"
      })));
    });
    const $ = (P, D) => {
      const U = `${P}:${D}`;
      v.value = {
        ...v.value,
        [U]: !v.value[U]
      }, v.value[U] && !k.value[D] && t.adapter.list(D).then((Y) => {
        const B = (Y.files || []).filter((x) => x.type === "dir");
        k.value[D] = B.map((x) => ({
          ...x,
          type: "dir"
        }));
      });
    }, h = (P) => k.value[P] || [], y = (P) => b.value[P] || 50, g = (P) => {
      const D = h(P), U = y(P);
      return D.length > U ? D.slice(0, U) : D;
    }, C = (P) => h(P).length, S = (P) => C(P) > y(P), I = (P) => {
      b.value[P] = y(P) + 50;
    }, T = (P) => {
      P && l("update:modelValue", P);
    }, L = (P) => {
      P && (l("update:modelValue", P), l("selectAndClose", P));
    }, q = (P) => {
      const D = {
        storage: P,
        path: P + "://",
        basename: P,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: P + "://"
      };
      l("update:modelValue", D);
    }, Z = (P) => {
      const D = {
        storage: P,
        path: P + "://",
        basename: P,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: P + "://"
      };
      l("update:modelValue", D), l("selectAndClose", D);
    };
    let ee = 0;
    const Q = (P) => {
      if (!P) return;
      const D = Date.now();
      D - ee < Fn ? L(P) : T(P), ee = D;
    }, W = (P) => {
      const D = Date.now();
      D - ee < Fn ? Z(P) : q(P), ee = D;
    };
    return we(() => {
      p.value && ft(p.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (P, D) => (u(), _("div", El, [
      o("div", Tl, [
        o("div", Dl, w(a(s)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: p,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && a(t).features.pinned && a(r).get("pinnedFolders").length ? (u(), _("div", Ml, [
          o("div", Il, w(a(s)("Pinned Folders")), 1),
          o("div", Al, [
            (u(!0), _(fe, null, ge(a(r).get("pinnedFolders"), (U) => (u(), _("div", {
              key: U.path,
              class: te(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === U.path }]),
              onClick: (Y) => T(U),
              onDblclick: (Y) => L(U),
              onTouchend: (Y) => Q(U)
            }, [
              G(a(ze), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", Ll, w(U.basename), 1),
              o("div", Rl, w(U.storage), 1),
              G(a(gt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ol))), 128))
          ])
        ])) : j("", !0),
        o("div", Bl, w(a(s)("Storages")), 1),
        (u(!0), _(fe, null, ge(f.value, (U) => (u(), _("div", {
          key: U,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", zl, [
            o("div", Vl, [
              o("div", Ul, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: _e((Y) => $(U, U + "://"), ["stop"])
                }, [
                  v.value[`${U}:${U}://`] ? (u(), X(a(It), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), X(a(Mt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Nl),
                o("div", {
                  class: te(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === U + "://"
                  }]),
                  onClick: (Y) => q(U),
                  onDblclick: (Y) => Z(U),
                  onTouchend: (Y) => W(U)
                }, [
                  G(a(an), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", jl, w(U), 1)
                ], 42, Hl)
              ]),
              v.value[`${U}:${U}://`] ? (u(), _("div", Kl, [
                (u(!0), _(fe, null, ge(g(U + "://"), (Y) => (u(), X(Pl, {
                  key: Y.path,
                  folder: Y,
                  storage: U,
                  "model-value": n.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": k.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": T,
                  onSelectAndClose: L,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                S(U + "://") ? (u(), _("div", ql, [
                  o("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (Y) => I(U + "://")
                  }, w(a(s)("load more")), 9, Wl)
                ])) : j("", !0)
              ])) : j("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Gl = ["title"], Gt = /* @__PURE__ */ re({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, s = le(), { t: i } = s.i18n, r = M(!1), l = M(null), d = M(l.value?.innerHTML);
    pe(d, () => r.value = !1);
    const c = () => {
      t("hidden"), r.value = !0;
    };
    return (f, m) => (u(), _("div", null, [
      r.value ? j("", !0) : (u(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: te(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        ke(f.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: a(i)("Close"),
          onClick: c
        }, [...m[0] || (m[0] = [
          o("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            o("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ])], 8, Gl)
      ], 2))
    ]));
  }
}), Yl = { class: "vuefinder__move-modal__content" }, Xl = { class: "vuefinder__move-modal__description" }, Ql = { class: "vuefinder__move-modal__files vf-scrollbar" }, Jl = { class: "vuefinder__move-modal__file-name" }, Zl = { class: "vuefinder__move-modal__target-title" }, er = { class: "vuefinder__move-modal__target-container" }, tr = { class: "vuefinder__move-modal__target-path" }, nr = { class: "vuefinder__move-modal__target-storage" }, or = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, sr = { class: "vuefinder__move-modal__target-badge" }, ar = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, ir = { class: "vuefinder__move-modal__checkbox-label" }, lr = { class: "vuefinder__move-modal__checkbox-text" }, rr = ["disabled"], dr = { class: "vuefinder__move-modal__selected-items" }, eo = /* @__PURE__ */ re({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = le(), t = Ve(e), { enabled: s } = Ne(), { t: i } = e.i18n, r = n, l = M(e.modal.data.items.from), d = M(e.modal.data.items.to), c = M(""), f = M(r.copy || !s("move")), m = R(() => f.value ? "copy" : "move"), p = M(!1), v = oe(e.fs.path), k = R(() => f.value ? i("Copy files") : i("Move files")), b = R(
      () => f.value ? i("Are you sure you want to copy these files?") : i("Are you sure you want to move these files?")
    ), $ = R(() => f.value ? i("Yes, Copy!") : i("Yes, Move!"));
    R(() => f.value ? i("Files copied.") : i("Files moved."));
    const h = (T) => {
      T && (d.value = T);
    }, y = (T) => {
      T && (d.value = T, p.value = !1);
    }, g = R(() => {
      const T = d.value;
      return T ? l.value.some((L) => !!(T.path === L.path || L.type === "dir" && T.path.startsWith(L.path + "/"))) : !0;
    }), C = R(() => {
      if (!g.value)
        return "";
      const T = d.value;
      return T ? l.value.find((q) => T.path === q.path || q.type === "dir" && T.path.startsWith(q.path + "/")) ? i("Cannot move/copy item to itself or its own subfolder") : i("Invalid destination directory") : i("Please select a destination directory");
    }), S = () => {
      const T = d.value.path;
      if (!T) return { storage: "local", path: "" };
      if (T.endsWith("://"))
        return { storage: T.replace("://", ""), path: "" };
      const L = T.split("://");
      return {
        storage: L[0] || "local",
        path: L[1] || ""
      };
    }, I = async () => {
      if (l.value.length)
        try {
          const { files: T } = await e.adapter[m.value]({
            path: v.value.path,
            sources: l.value.map(({ path: L }) => L),
            destination: d.value.path
          });
          e.fs.setFiles(T), e.modal.close();
        } catch (T) {
          t.error(Te(T, i("Failed to transfer files")));
        }
    };
    return (T, L) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: I
        }, w($.value), 9, rr),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: L[4] || (L[4] = (q) => a(e).modal.close())
        }, w(a(i)("Cancel")), 1),
        o("div", dr, w(a(i)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: f.value ? a(sn) : a(il),
            title: k.value
          }, null, 8, ["icon", "title"]),
          o("div", Yl, [
            o("p", Xl, w(b.value), 1),
            o("div", Ql, [
              (u(!0), _(fe, null, ge(l.value, (q) => (u(), _("div", {
                key: q.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  q.type === "dir" ? (u(), X(a(ze), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), X(a(ht), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", Jl, w(q.path), 1)
              ]))), 128))
            ]),
            o("h4", Zl, w(a(i)("Target Directory")), 1),
            o("div", er, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: L[0] || (L[0] = (q) => p.value = !p.value)
              }, [
                o("div", tr, [
                  o("span", nr, w(S().storage) + "://", 1),
                  S().path ? (u(), _("span", or, w(S().path), 1)) : j("", !0)
                ]),
                o("span", sr, w(a(i)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: te([
                "vuefinder__move-modal__tree-selector",
                p.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              G(kt, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  L[1] || (L[1] = (q) => d.value = q),
                  h
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: y
              }, null, 8, ["modelValue"])
            ], 2),
            a(s)("copy") && a(s)("move") ? (u(), _("div", ar, [
              o("label", ir, [
                he(o("input", {
                  "onUpdate:modelValue": L[2] || (L[2] = (q) => f.value = q),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [lt, f.value]
                ]),
                o("span", lr, w(a(i)("Create a copy instead of moving")), 1)
              ])
            ])) : j("", !0),
            C.value ? (u(), X(Gt, {
              key: 1,
              error: ""
            }, {
              default: ie(() => [
                ye(w(C.value), 1)
              ]),
              _: 1
            })) : j("", !0),
            c.value.length && !C.value ? (u(), X(Gt, {
              key: 2,
              error: "",
              onHidden: L[3] || (L[3] = (q) => c.value = "")
            }, {
              default: ie(() => [
                ye(w(c.value), 1)
              ]),
              _: 1
            })) : j("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), it = /* @__PURE__ */ re({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (u(), X(eo, { copy: !1 }));
  }
}), ln = /* @__PURE__ */ re({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (u(), X(eo, { copy: !0 }));
  }
}), cr = (n, e = 0, t = !1) => {
  let s;
  return (...i) => {
    t && !s && n(...i), clearTimeout(s), s = setTimeout(() => {
      n(...i);
    }, e);
  };
}, to = (n, e, t) => {
  const s = M(n);
  return wo((i, r) => ({
    get() {
      return i(), s.value;
    },
    set: cr(
      (l) => {
        s.value = l, r();
      },
      e,
      !1
    )
  }));
}, ur = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function vr(n, e) {
  return u(), _("svg", ur, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const rn = { render: vr }, fr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function _r(n, e) {
  return u(), _("svg", fr, [...e[0] || (e[0] = [
    o("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900"
    }, null, -1),
    o("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ])]);
}
const Ot = { render: _r }, pr = { class: "vuefinder__search-modal__search-input" }, mr = ["value", "placeholder", "disabled"], hr = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, gr = /* @__PURE__ */ re({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const s = t, i = le(), { t: r } = i.i18n, l = M(null), d = (f) => {
      const m = f.target;
      s("update:modelValue", m.value);
    }, c = (f) => {
      s("keydown", f);
    };
    return e({
      focus: () => {
        l.value && l.value.focus();
      }
    }), (f, m) => (u(), _("div", pr, [
      G(a(rn), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: l,
        value: n.modelValue,
        type: "text",
        placeholder: a(r)("Search files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: m[0] || (m[0] = _e(() => {
        }, ["stop"])),
        onInput: d
      }, null, 40, mr),
      n.isSearching ? (u(), _("div", hr, [
        G(a(Ot), { class: "vuefinder__search-modal__loading-icon" })
      ])) : j("", !0)
    ]));
  }
}), yr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function wr(n, e) {
  return u(), _("svg", yr, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ])]);
}
const no = { render: wr }, br = ["disabled", "title"], kr = ["data-theme"], $r = { class: "vuefinder__search-modal__dropdown-content" }, xr = { class: "vuefinder__search-modal__dropdown-section" }, Sr = { class: "vuefinder__search-modal__dropdown-title" }, Cr = { class: "vuefinder__search-modal__dropdown-options" }, Fr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Pr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Er = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Tr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Dr = { class: "vuefinder__search-modal__dropdown-section" }, Mr = { class: "vuefinder__search-modal__dropdown-title" }, Ir = { class: "vuefinder__search-modal__dropdown-options" }, Ar = ["onClick"], Or = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Lr = /* @__PURE__ */ re({
  name: "SearchOptionsDropdown",
  __name: "SearchOptionsDropdown",
  props: {
    visible: { type: Boolean },
    disabled: { type: Boolean, default: !1 },
    sizeFilter: {},
    selectedOption: {},
    sortBy: {}
  },
  emits: ["update:visible", "update:sizeFilter", "update:selectedOption", "update:sortBy", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const s = n, i = t, r = le(), { t: l } = r.i18n, d = M(null), c = M(null);
    let f = null;
    const m = [
      { value: "name-asc", key: "Name (A-Z)" },
      { value: "name-desc", key: "Name (Z-A)" },
      { value: "size-asc", key: "Size (smallest)" },
      { value: "size-desc", key: "Size (largest)" },
      { value: "date-desc", key: "Date (newest)" },
      { value: "date-asc", key: "Date (oldest)" }
    ], p = (y) => {
      if (i("update:selectedOption", y), y.startsWith("size-")) {
        const g = y.split("-")[1];
        i("update:sizeFilter", g);
      }
    }, v = (y) => {
      i("update:sortBy", y);
    }, k = async () => {
      s.disabled || (s.visible ? (i("update:visible", !1), f && (f(), f = null)) : (i("update:visible", !0), await Ae(), await b()));
    }, b = async () => {
      if (!(!d.value || !c.value) && (await Ae(), !(!d.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: y, y: g } = await at(d.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${y}px`,
            top: `${g}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (y) {
          console.warn("Floating UI initial positioning error:", y);
          return;
        }
        try {
          f = Xt(d.value, c.value, async () => {
            if (!(!d.value || !c.value))
              try {
                const { x: y, y: g } = await at(
                  d.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${y}px`,
                  top: `${g}px`
                });
              } catch (y) {
                console.warn("Floating UI positioning error:", y);
              }
          });
        } catch (y) {
          console.warn("Floating UI autoUpdate setup error:", y), f = null;
        }
      }
    }, $ = (y) => {
      if (!s.visible) return;
      const g = ["size-all", "size-small", "size-medium", "size-large"], C = g.findIndex((S) => S === s.selectedOption);
      if (y.key === "ArrowDown") {
        y.preventDefault();
        const S = (C + 1) % g.length;
        i("update:selectedOption", g[S] || null);
      } else if (y.key === "ArrowUp") {
        y.preventDefault();
        const S = C <= 0 ? g.length - 1 : C - 1;
        i("update:selectedOption", g[S] || null);
      } else y.key === "Enter" ? (y.preventDefault(), s.selectedOption?.startsWith("size-") && i(
        "update:sizeFilter",
        s.selectedOption.split("-")[1]
      )) : y.key === "Escape" && (y.preventDefault(), i("update:visible", !1), f && (f(), f = null));
    }, h = () => {
      f && (f(), f = null);
    };
    return pe(
      () => s.visible,
      (y) => {
        !y && f && (f(), f = null);
      }
    ), Ie(() => {
      h();
    }), e({
      cleanup: h
    }), (y, g) => (u(), _(fe, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: d,
        class: te(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: a(l)("Search Options"),
        onClick: _e(k, ["stop"])
      }, [
        G(a(no), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, br),
      (u(), X(bt, { to: "body" }, [
        n.visible ? (u(), _("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(r).theme.current,
          tabindex: "-1",
          onClick: g[4] || (g[4] = _e(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          o("div", $r, [
            o("div", xr, [
              o("div", Sr, w(a(l)("File Size")), 1),
              o("div", Cr, [
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: g[0] || (g[0] = _e((C) => p("size-all"), ["stop"]))
                }, [
                  o("span", null, w(a(l)("All Files")), 1),
                  n.sizeFilter === "all" ? (u(), _("div", Fr, [...g[5] || (g[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : j("", !0)
                ], 2),
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: g[1] || (g[1] = _e((C) => p("size-small"), ["stop"]))
                }, [
                  o("span", null, w(a(l)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (u(), _("div", Pr, [...g[6] || (g[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : j("", !0)
                ], 2),
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: g[2] || (g[2] = _e((C) => p("size-medium"), ["stop"]))
                }, [
                  o("span", null, w(a(l)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (u(), _("div", Er, [...g[7] || (g[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : j("", !0)
                ], 2),
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: g[3] || (g[3] = _e((C) => p("size-large"), ["stop"]))
                }, [
                  o("span", null, w(a(l)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (u(), _("div", Tr, [...g[8] || (g[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : j("", !0)
                ], 2)
              ])
            ]),
            o("div", Dr, [
              o("div", Mr, w(a(l)("Sort by")), 1),
              o("div", Ir, [
                (u(), _(fe, null, ge(m, (C) => o("div", {
                  key: C.value,
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sortBy === C.value
                  }]),
                  onClick: _e((S) => v(C.value), ["stop"])
                }, [
                  o("span", null, w(a(l)(C.key)), 1),
                  n.sortBy === C.value ? (u(), _("div", Or, [...g[9] || (g[9] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : j("", !0)
                ], 10, Ar)), 64))
              ])
            ])
          ])
        ], 40, kr)) : j("", !0)
      ]))
    ], 64));
  }
});
function Lt(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const s = t[1], i = t[2] ?? "", r = i.split("/").filter(Boolean), l = r.pop();
  if (!l) return s + i;
  let d = `${s}${r.join("/")}${r.length ? "/" : ""}${l}`;
  if (d.length <= e) return d;
  const c = l.split(/\.(?=[^\.]+$)/), f = c[0] ?? "", m = c[1] ?? "", p = f.length > 10 ? `${f.slice(0, 6)}...${f.slice(-5)}` : f, v = m ? `${p}.${m}` : p;
  return d = `${s}${r.join("/")}${r.length ? "/" : ""}${v}`, d.length > e && (d = `${s}.../${v}`), d;
}
async function oo(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function yt(n) {
  await oo(n);
}
async function Rr(n) {
  await oo(n);
}
const Br = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function zr(n, e) {
  return u(), _("svg", Br, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const so = { render: zr }, Vr = ["title"], Ur = { class: "vuefinder__search-modal__result-icon" }, Nr = { class: "vuefinder__search-modal__result-content" }, Hr = { class: "vuefinder__search-modal__result-name" }, jr = {
  key: 1,
  class: "vuefinder__search-modal__result-size"
}, Kr = ["title"], qr = ["title"], Wr = ["data-item-dropdown", "data-theme"], Gr = { class: "vuefinder__search-modal__item-dropdown-content" }, Yr = /* @__PURE__ */ re({
  name: "SearchResultItem",
  __name: "SearchResultItem",
  props: {
    item: {},
    index: {},
    selectedIndex: {},
    expandedPaths: {},
    activeDropdown: {},
    selectedItemDropdownOption: {}
  },
  emits: ["select", "selectWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "open", "preview", "activate"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = le(), { t: r } = i.i18n, { enabled: l } = Ne(), d = oe(i.config.state), c = R(() => l("pinned")), f = R(
      () => d.value.pinnedFolders.some((P) => P.path === t.item.path)
    ), m = (P) => {
      const D = i.config.get("pinnedFolders");
      D.some((U) => U.path === P.path) ? i.config.set(
        "pinnedFolders",
        D.filter((U) => U.path !== P.path)
      ) : i.config.set("pinnedFolders", [...D, P]);
    }, p = M(null);
    let v = null, k = null, b = [], $ = null;
    pe(
      () => t.activeDropdown,
      (P) => {
        v && (v(), v = null), k && (b.forEach((D) => {
          D === window ? window.removeEventListener("scroll", k, !0) : D.removeEventListener("scroll", k, !0);
        }), k = null, b = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null), P === t.item.path && p.value && Ae(() => {
          T(t.item.path, p.value), y(), g();
        });
      }
    );
    const h = (P) => {
      const D = [];
      let U = P;
      for (; U && U !== document.body && U !== document.documentElement; ) {
        const Y = window.getComputedStyle(U), ue = Y.overflow + Y.overflowX + Y.overflowY;
        (ue.includes("scroll") || ue.includes("auto")) && D.push(U), U = U.parentElement;
      }
      return D;
    }, y = () => {
      if (t.activeDropdown !== t.item.path) return;
      const P = h(p.value);
      b = [window, ...P], k = () => {
        t.activeDropdown === t.item.path && s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const D = k;
      D && b.forEach((U) => {
        U === window ? window.addEventListener("scroll", D, !0) : U.addEventListener("scroll", D, !0);
      });
    }, g = () => {
      t.activeDropdown === t.item.path && ($ = (P) => {
        if (t.activeDropdown !== t.item.path) return;
        const D = P.target;
        if (!D) return;
        const U = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (U && U.contains(D) || p.value && p.value.contains(D))
          return;
        const Y = i.root;
        if (Y && Y.contains(D)) {
          s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const ue = document.querySelector(".vuefinder__modal-layout");
        if (ue && ue.contains(D)) {
          s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        $ && (document.addEventListener("mousedown", $, !0), document.addEventListener("touchstart", $, !0));
      }, 100));
    };
    Ie(() => {
      v && (v(), v = null), k && (b.forEach((P) => {
        P === window ? window.removeEventListener("scroll", k, !0) : P.removeEventListener("scroll", k, !0);
      }), k = null, b = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null);
    });
    const C = (P) => t.expandedPaths.has(P), S = (P) => P.type === "dir" || !P.file_size ? "" : Jt(P.file_size), I = (P, D) => {
      D.stopPropagation(), s("toggleItemDropdown", P, D);
    }, T = async (P, D) => {
      const U = document.querySelector(
        `[data-item-dropdown="${P}"]`
      );
      if (!(!U || !D) && (await Ae(), !(!U || !D))) {
        Object.assign(U.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: Y, y: ue } = await at(D, U, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
          });
          Object.assign(U.style, {
            left: `${Y}px`,
            top: `${ue}px`
          }), requestAnimationFrame(() => {
            U && Object.assign(U.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (Y) {
          console.warn("Floating UI initial positioning error:", Y);
          return;
        }
        try {
          v = Xt(D, U, async () => {
            if (!(!D || !U))
              try {
                const { x: Y, y: ue } = await at(D, U, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
                });
                Object.assign(U.style, {
                  left: `${Y}px`,
                  top: `${ue}px`
                });
              } catch (Y) {
                console.warn("Floating UI positioning error:", Y);
              }
          });
        } catch (Y) {
          console.warn("Floating UI autoUpdate setup error:", Y), v = null;
        }
      }
    }, L = (P) => {
      s("update:selectedItemDropdownOption", P);
    }, q = async (P) => {
      await yt(P.path), s("copyPath", P);
    }, Z = (P) => {
      s("openContainingFolder", P);
    }, ee = (P) => {
      s("preview", P);
    }, Q = (P) => {
      s("open", P);
    }, W = (P) => {
      if (!t.activeDropdown) return;
      const D = ["copy-path", "open-folder", "preview"], U = t.selectedItemDropdownOption, Y = D.findIndex((ue) => U?.includes(ue));
      if (P.key === "ArrowDown") {
        P.preventDefault();
        const ue = (Y + 1) % D.length;
        s(
          "update:selectedItemDropdownOption",
          `${D[ue] || ""}-${t.activeDropdown}`
        );
      } else if (P.key === "ArrowUp") {
        P.preventDefault();
        const ue = Y <= 0 ? D.length - 1 : Y - 1;
        s(
          "update:selectedItemDropdownOption",
          `${D[ue] || ""}-${t.activeDropdown}`
        );
      } else P.key === "Enter" ? (P.preventDefault(), U && (U.includes("copy-path") ? q(t.item) : U.includes("open-folder") ? Z(t.item) : U.includes("preview") && ee(t.item))) : P.key === "Escape" && (P.preventDefault(), s("update:selectedItemDropdownOption", null));
    };
    return (P, D) => (u(), _("div", {
      class: te(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: D[13] || (D[13] = (U) => s("select", n.index)),
      onDblclick: D[14] || (D[14] = _e((U) => s("activate", n.item), ["stop"]))
    }, [
      o("div", Ur, [
        n.item.type === "dir" ? (u(), X(a(ze), { key: 0 })) : (u(), X(a(ht), { key: 1 }))
      ]),
      o("div", Nr, [
        o("div", Hr, [
          n.item.type === "dir" && c.value && f.value ? (u(), X(a(gt), {
            key: 0,
            class: "vuefinder__search-modal__result-pin",
            title: a(r)("Pinned")
          }, null, 8, ["title"])) : j("", !0),
          ye(" " + w(n.item.basename) + " ", 1),
          S(n.item) ? (u(), _("span", jr, w(S(n.item)), 1)) : j("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: D[0] || (D[0] = _e((U) => {
            s("select", n.index), s("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, w(C(n.item.path) ? n.item.path : a(Lt)(n.item.path)), 9, Kr)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: p,
        class: "vuefinder__search-modal__result-actions",
        title: a(r)("More actions"),
        onClick: D[1] || (D[1] = (U) => {
          s("selectWithDropdown", n.index), I(n.item.path, U);
        })
      }, [
        G(a(so), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, qr),
      (u(), X(bt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (u(), _("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(i).theme.current,
          tabindex: "-1",
          onClick: D[12] || (D[12] = _e(() => {
          }, ["stop"])),
          onKeydown: W
        }, [
          o("div", Gr, [
            o("div", {
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: D[2] || (D[2] = (U) => {
                L(`copy-path-${n.item.path}`), q(n.item);
              }),
              onFocus: D[3] || (D[3] = (U) => L(`copy-path-${n.item.path}`))
            }, [
              G(a(sn), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(r)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: D[4] || (D[4] = (U) => {
                L(`open-folder-${n.item.path}`), Z(n.item);
              }),
              onFocus: D[5] || (D[5] = (U) => L(`open-folder-${n.item.path}`))
            }, [
              G(a(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(r)("Open Containing Folder")), 1)
            ], 34),
            n.item.type === "dir" ? (u(), _("div", {
              key: 0,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-${n.item.path}`
              }]),
              onClick: D[6] || (D[6] = (U) => {
                L(`open-${n.item.path}`), Q(n.item);
              }),
              onFocus: D[7] || (D[7] = (U) => L(`open-${n.item.path}`))
            }, [
              G(a(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(r)("Open")), 1)
            ], 34)) : j("", !0),
            n.item.type === "dir" && c.value ? (u(), _("div", {
              key: 1,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `pin-${n.item.path}`
              }]),
              onClick: D[8] || (D[8] = (U) => {
                L(`pin-${n.item.path}`), m(n.item);
              }),
              onFocus: D[9] || (D[9] = (U) => L(`pin-${n.item.path}`))
            }, [
              G(a(gt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(f.value ? a(r)("Unpin Folder") : a(r)("Pin Folder")), 1)
            ], 34)) : (u(), _("div", {
              key: 2,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: D[10] || (D[10] = (U) => {
                L(`preview-${n.item.path}`), ee(n.item);
              }),
              onFocus: D[11] || (D[11] = (U) => L(`preview-${n.item.path}`))
            }, [
              G(a(ht), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(r)("Preview")), 1)
            ], 34))
          ])
        ], 40, Wr)) : j("", !0)
      ]))
    ], 42, Vr));
  }
}), Xr = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Qr = { class: "vuefinder__search-modal__loading-icon" }, Jr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Zr = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, ed = { class: "vuefinder__search-modal__results-header" }, et = 60, Pn = 5, td = /* @__PURE__ */ re({
  name: "SearchResultsList",
  __name: "SearchResultsList",
  props: {
    searchResults: {},
    isSearching: { type: Boolean },
    selectedIndex: {},
    expandedPaths: {},
    activeDropdown: {},
    selectedItemDropdownOption: {},
    resultsEnter: { type: Boolean }
  },
  emits: ["selectResultItem", "selectResultItemWithDropdown", "togglePathExpansion", "toggleItemDropdown", "update:selectedItemDropdownOption", "copyPath", "openContainingFolder", "open", "preview", "activate"],
  setup(n, { expose: e, emit: t }) {
    const s = n, i = t, r = le(), { t: l } = r.i18n, d = st("scrollableContainer"), c = R(() => s.searchResults.length > 0), f = R(() => s.searchResults.length), m = M(0), p = M(600), v = R(() => s.searchResults.length * et), k = R(() => {
      const C = Math.max(0, Math.floor(m.value / et) - Pn), S = Math.min(
        s.searchResults.length,
        Math.ceil((m.value + p.value) / et) + Pn
      );
      return { start: C, end: S };
    }), b = R(() => {
      const { start: C, end: S } = k.value;
      return s.searchResults.slice(C, S).map((I, T) => ({
        item: I,
        index: C + T,
        top: (C + T) * et
      }));
    }), $ = (C) => {
      const S = C.target;
      m.value = S.scrollTop;
    }, h = () => {
      d.value && (p.value = d.value.clientHeight);
    }, y = () => {
      if (s.selectedIndex >= 0 && d.value) {
        const C = s.selectedIndex * et, S = C + et, I = d.value.scrollTop, T = d.value.clientHeight, L = I + T;
        let q = I;
        C < I ? q = C : S > L && (q = S - T), q !== I && d.value.scrollTo({
          top: q,
          behavior: "smooth"
        });
      }
    }, g = () => {
      d.value && (d.value.scrollTop = 0, m.value = 0);
    };
    return we(() => {
      h(), window.addEventListener("resize", h);
    }), Ie(() => {
      window.removeEventListener("resize", h);
    }), pe(
      () => d.value,
      () => {
        h();
      }
    ), e({
      scrollSelectedIntoView: y,
      resetScroll: g,
      getContainerHeight: () => p.value,
      scrollTop: () => m.value
    }), (C, S) => (u(), _("div", {
      class: te(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (u(), _("div", Xr, [
        o("div", Qr, [
          G(a(Ot), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, w(a(l)("Searching...")), 1)
      ])) : c.value ? (u(), _("div", Zr, [
        o("div", ed, [
          o("span", null, w(a(l)("Found %s results", f.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: d,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: $
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: Me({ height: `${v.value}px`, position: "relative" })
          }, [
            (u(!0), _(fe, null, ge(b.value, (I) => (u(), _("div", {
              key: I.item.path,
              style: Me({
                position: "absolute",
                top: `${I.top}px`,
                left: "0",
                width: "100%",
                height: `${et}px`
              })
            }, [
              G(Yr, {
                item: I.item,
                index: I.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: S[0] || (S[0] = (T) => i("selectResultItem", T)),
                onSelectWithDropdown: S[1] || (S[1] = (T) => i("selectResultItemWithDropdown", T)),
                onTogglePathExpansion: S[2] || (S[2] = (T) => i("togglePathExpansion", T)),
                onToggleItemDropdown: S[3] || (S[3] = (T, L) => i("toggleItemDropdown", T, L)),
                "onUpdate:selectedItemDropdownOption": S[4] || (S[4] = (T) => i("update:selectedItemDropdownOption", T)),
                onCopyPath: S[5] || (S[5] = (T) => i("copyPath", T)),
                onOpenContainingFolder: S[6] || (S[6] = (T) => i("openContainingFolder", T)),
                onOpen: S[7] || (S[7] = (T) => i("open", T)),
                onPreview: S[8] || (S[8] = (T) => i("preview", T)),
                onActivate: S[9] || (S[9] = (T) => i("activate", T))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), _("div", Jr, [
        o("span", null, w(a(l)("No results found")), 1)
      ]))
    ], 2));
  }
}), nd = { class: "vuefinder__search-modal" }, od = { class: "vuefinder__search-modal__content" }, sd = { class: "vuefinder__search-modal__search-bar" }, ad = { class: "vuefinder__search-modal__search-location" }, id = ["title"], ld = ["disabled"], rd = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, dd = { class: "vuefinder__search-modal__folder-selector-content" }, cd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ud = { class: "vuefinder__search-modal__instructions-text" }, dn = /* @__PURE__ */ re({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = M(null), l = M(null), d = M(null), c = to("", 300), f = M([]), m = M(!1), p = M(-1);
    let v = null;
    const k = M(!1), b = M(!1), $ = M(null), h = M("all"), y = M(!1), g = M("name-asc"), C = {
      "name-asc": { column: "basename", direction: 1 },
      "name-desc": { column: "basename", direction: -1 },
      "size-asc": { column: "file_size", direction: 1 },
      "size-desc": { column: "file_size", direction: -1 },
      "date-asc": { column: "last_modified", direction: 1 },
      "date-desc": { column: "last_modified", direction: -1 }
    }, S = R(() => {
      const { column: E, direction: N } = C[g.value];
      return f.value.slice().sort((ce, me) => Kn(ce[E], me[E]) * N);
    }), I = M(`size-${h.value}`), T = M(null), L = M(/* @__PURE__ */ new Set()), q = M(null), Z = oe(i.path), ee = (E) => {
      L.value.has(E) ? L.value.delete(E) : L.value.add(E);
    }, Q = (E, N) => {
      N && typeof N.stopPropagation == "function" && N.stopPropagation(), q.value === E ? q.value = null : q.value = E;
    }, W = () => {
      q.value = null;
    }, P = (E) => {
      try {
        const N = E.dir || `${E.storage}://`;
        e.adapter.open(N), e.modal.close(), W();
      } catch {
        t.error(s("Failed to open containing folder"));
      }
    }, D = (E) => {
      e.modal.open(Qe, {
        storage: Z?.value?.storage ?? "local",
        item: E
      }), W();
    }, U = (E) => {
      e.adapter.open(E.path), e.modal.close(), W();
    }, Y = (E) => {
      E.type === "dir" ? U(E) : D(E);
    }, ue = (E) => {
      p.value = E, W();
    }, B = (E) => {
      p.value = E;
    }, x = async (E) => {
      await yt(E.path), W();
    };
    pe(c, async (E) => {
      E.trim() ? (await F(E.trim()), p.value = 0) : (v && (v.abort(), v = null), f.value = [], m.value = !1, p.value = -1);
    }), pe(h, async (E) => {
      I.value = `size-${E}`, c.value.trim() && !b.value && (await F(c.value.trim()), p.value = 0);
    }), pe(y, async () => {
      c.value.trim() && !b.value && (await F(c.value.trim()), p.value = 0);
    });
    const z = (E) => {
      if (!E || typeof E != "object") return !1;
      const N = E.name;
      return N === "AbortError" || N === "CanceledError";
    }, F = async (E) => {
      if (!E) return;
      v && v.abort();
      const N = new AbortController();
      v = N, m.value = !0;
      try {
        const ce = $.value?.path || Z?.value?.path, me = await e.adapter.search({
          path: ce,
          filter: E,
          deep: y.value,
          size: h.value,
          signal: N.signal
        });
        if (N.signal.aborted) return;
        f.value = me || [], m.value = !1;
      } catch (ce) {
        if (z(ce) || N.signal.aborted) return;
        t.error(Te(ce, s("Search failed"))), f.value = [], m.value = !1;
      }
    };
    we(() => {
      document.addEventListener("click", H), I.value = `size-${h.value}`;
    });
    const V = () => {
      b.value ? (b.value = !1, c.value.trim() && (F(c.value.trim()), p.value = 0)) : (k.value = !1, b.value = !0);
    }, A = (E) => {
      E && ($.value = E);
    }, O = (E) => {
      E && (A(E), b.value = !1, c.value.trim() && (F(c.value.trim()), p.value = 0));
    };
    Ie(() => {
      document.removeEventListener("click", H), v && (v.abort(), v = null), l.value && l.value.cleanup();
    });
    const H = (E) => {
      const N = E.target;
      if (k.value && (N.closest(".vuefinder__search-modal__dropdown") || (k.value = !1, Ae(() => {
        r.value && r.value.focus();
      }))), q.value) {
        const ce = N.closest(".vuefinder__search-modal__item-dropdown"), me = N.closest(".vuefinder__search-modal__result-item");
        !ce && !me && W();
      }
    };
    return (E, N) => (u(), X(Ue, { class: "vuefinder__search-modal-layout" }, {
      default: ie(() => [
        o("div", nd, [
          G(je, {
            icon: a(rn),
            title: a(s)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", od, [
            o("div", sd, [
              G(gr, {
                ref_key: "searchInputRef",
                ref: r,
                modelValue: a(c),
                "onUpdate:modelValue": N[0] || (N[0] = (ce) => bo(c) ? c.value = ce : null),
                "is-searching": m.value,
                disabled: b.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              G(Lr, {
                ref_key: "searchOptionsDropdownRef",
                ref: l,
                visible: k.value,
                "onUpdate:visible": N[1] || (N[1] = (ce) => k.value = ce),
                "size-filter": h.value,
                "onUpdate:sizeFilter": N[2] || (N[2] = (ce) => h.value = ce),
                "selected-option": I.value,
                "onUpdate:selectedOption": N[3] || (N[3] = (ce) => I.value = ce),
                "sort-by": g.value,
                "onUpdate:sortBy": N[4] || (N[4] = (ce) => g.value = ce),
                disabled: b.value
              }, null, 8, ["visible", "size-filter", "selected-option", "sort-by", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: N[8] || (N[8] = _e(() => {
              }, ["stop"]))
            }, [
              o("div", ad, [
                o("button", {
                  class: te(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": b.value }]),
                  onClick: _e(V, ["stop"])
                }, [
                  G(a(ze), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: $.value?.path || a(Z).path
                  }, w(a(Lt)($.value?.path || a(Z).path)), 9, id),
                  N[11] || (N[11] = o("svg", {
                    class: "vuefinder__search-modal__location-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2)
              ]),
              o("label", {
                class: "vuefinder__search-modal__deep-search",
                onClick: N[7] || (N[7] = _e(() => {
                }, ["stop"]))
              }, [
                he(o("input", {
                  "onUpdate:modelValue": N[5] || (N[5] = (ce) => y.value = ce),
                  type: "checkbox",
                  disabled: b.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: N[6] || (N[6] = _e(() => {
                  }, ["stop"]))
                }, null, 8, ld), [
                  [lt, y.value]
                ]),
                o("span", null, w(a(s)("Include subfolders")), 1)
              ])
            ]),
            b.value ? (u(), _("div", rd, [
              o("div", dd, [
                G(kt, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [
                    N[9] || (N[9] = (ce) => $.value = ce),
                    A
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(Z),
                  onSelectAndClose: O
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : j("", !0),
            !a(c).trim() && !b.value ? (u(), _("div", cd, [
              o("p", ud, w(a(s)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : j("", !0),
            a(c).trim() && !b.value ? (u(), X(td, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": S.value,
              "is-searching": m.value,
              "selected-index": p.value,
              "expanded-paths": L.value,
              "active-dropdown": q.value,
              "selected-item-dropdown-option": T.value,
              "results-enter": !0,
              onSelectResultItem: ue,
              onSelectResultItemWithDropdown: B,
              onTogglePathExpansion: ee,
              onToggleItemDropdown: Q,
              "onUpdate:selectedItemDropdownOption": N[10] || (N[10] = (ce) => T.value = ce),
              onCopyPath: x,
              onOpenContainingFolder: P,
              onOpen: U,
              onPreview: D,
              onActivate: Y
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : j("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), vd = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(n, { emit: e, slots: t }) {
    const s = le(), i = M(!1), { t: r } = s.i18n;
    let l = null;
    const d = () => {
      l && clearTimeout(l), i.value = !0, l = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return we(() => {
      s.emitter.on(n.on, d);
    }), Ie(() => {
      l && clearTimeout(l);
    }), {
      shown: i,
      t: r
    };
  }
}, fd = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, _d = { key: 1 };
function pd(n, e, t, s, i, r) {
  return u(), _("div", {
    class: te(["vuefinder__action-message", { "vuefinder__action-message--hidden": !s.shown }])
  }, [
    n.$slots.default ? ke(n.$slots, "default", { key: 0 }) : (u(), _("span", _d, w(s.t("Saved.")), 1))
  ], 2);
}
const En = /* @__PURE__ */ fd(vd, [["render", pd]]), md = [
  { name: "silver", displayName: "Silver" },
  { name: "valorite", displayName: "Valorite" },
  { name: "midnight", displayName: "Midnight" },
  { name: "latte", displayName: "Latte" },
  { name: "rose", displayName: "Rose" },
  { name: "mythril", displayName: "Mythril" },
  { name: "lime", displayName: "lime" },
  { name: "sky", displayName: "Sky" },
  { name: "ocean", displayName: "Oceanic" },
  { name: "palenight", displayName: "Palenight" },
  { name: "arctic", displayName: "Arctic" },
  { name: "code", displayName: "Code" }
], hd = { class: "vuefinder__settings-modal__content" }, gd = { class: "vuefinder__settings-modal__main" }, yd = { class: "vuefinder__settings-modal__sections" }, wd = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, bd = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, kd = { class: "vuefinder__settings-modal__input-group" }, $d = ["value"], xd = ["value"], Sd = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, Cd = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, Fd = { class: "vuefinder__settings-modal__input-group" }, Pd = ["value"], Ed = { class: "vuefinder__settings-modal__reset-section" }, Td = { class: "vuefinder__settings-modal__reset-content" }, Dd = { class: "vuefinder__settings-modal__reset-title" }, Md = { class: "vuefinder__settings-modal__reset-description" }, ao = /* @__PURE__ */ re({
  __name: "ModalSettings",
  setup(n) {
    const e = le(), { enabled: t } = Ne(), s = e.config, { clearStore: i } = e.storage, { t: r, localeAtom: l } = e.i18n, d = oe(l), c = R({
      get: () => String(d.value || "en"),
      set: (h) => l.set(h || "en")
    }), f = oe(s.state), m = R(() => f.value.theme || "silver"), p = async () => {
      s.reset(), i(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, v = (h) => {
      s.set("theme", h), e.emitter.emit("vf-theme-saved");
    }, { i18n: k } = Ct("VueFinderOptions"), $ = Object.fromEntries(
      Object.entries({
        ar: "Arabic (العربيّة)",
        zhCN: "Chinese-Simplified (简体中文)",
        zhTW: "Chinese-Traditional (繁體中文)",
        nl: "Dutch (Nederlands)",
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        it: "Italian (Italiano)",
        ja: "Japanese (日本語)",
        fa: "Persian (فارسی)",
        pl: "Polish (Polski)",
        pt: "Portuguese (Português)",
        ru: "Russian (Pусский)",
        es: "Spanish (Español)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)"
      }).filter(([h]) => Object.keys(k).includes(h))
    );
    return (h, y) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: y[2] || (y[2] = (g) => a(e).modal.close())
        }, w(a(r)("Close")), 1)
      ]),
      default: ie(() => [
        o("div", hd, [
          G(je, {
            icon: a(no),
            title: a(r)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", gd, [
            o("div", yd, [
              a(t)("theme") ? (u(), _("div", wd, [
                o("label", bd, [
                  ye(w(a(r)("Theme")) + " ", 1),
                  G(En, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: ie(() => [
                      ye(w(a(r)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", kd, [
                  o("select", {
                    id: "theme",
                    value: m.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: y[0] || (y[0] = (g) => v(g.target?.value))
                  }, [
                    (u(!0), _(fe, null, ge(a(md), (g) => (u(), _("option", {
                      key: g.name,
                      value: g.name
                    }, w(g.displayName), 9, xd))), 128))
                  ], 40, $d)
                ])
              ])) : j("", !0),
              Object.keys(a($)).length > 1 ? (u(), _("div", Sd, [
                o("label", Cd, [
                  ye(w(a(r)("Language")) + " ", 1),
                  G(En, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: ie(() => [
                      ye(w(a(r)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", Fd, [
                  he(o("select", {
                    id: "language",
                    "onUpdate:modelValue": y[1] || (y[1] = (g) => c.value = g),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (u(!0), _(fe, null, ge(a($), (g, C) => (u(), _("option", {
                      key: C,
                      value: C
                    }, w(g), 9, Pd))), 128))
                  ], 512), [
                    [Kt, c.value]
                  ])
                ])
              ])) : j("", !0)
            ]),
            o("div", Ed, [
              o("div", Td, [
                o("div", Dd, w(a(r)("Reset")), 1),
                o("div", Md, w(a(r)("Reset all settings to default")), 1)
              ]),
              o("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: p
              }, w(a(r)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Re = {
  ESCAPE: "Escape",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF",
  SPACE: "Space",
  KEY_C: "KeyC",
  KEY_X: "KeyX",
  KEY_V: "KeyV",
  KEY_S: "KeyS",
  KEY_R: "KeyR"
};
function Id() {
  const n = le(), e = Ve(n), t = n.fs, s = n.config, { enabled: i } = Ne(), r = oe(t.path), l = oe(t.selectedItems), d = (c) => {
    if (c.code === Re.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (c.metaKey && c.code === Re.KEY_R && !c.shiftKey && (n.adapter.invalidateListQuery(r.value.path), n.adapter.open(r.value.path), c.preventDefault()), c.metaKey && c.shiftKey && c.code === Re.KEY_R && i("rename") && l.value.length === 1 && (n.modal.open(Dt, { items: l.value }), c.preventDefault()), c.code === Re.DELETE && l.value.length !== 0 && n.modal.open(Tt, { items: l.value }), c.metaKey && c.code === Re.BACKSLASH && n.modal.open(Wn), c.metaKey && c.code === Re.KEY_F && i("search") && (n.modal.open(dn), c.preventDefault()), c.metaKey && c.code === Re.KEY_E && (s.toggle("showTreeView"), c.preventDefault()), c.metaKey && c.code === Re.KEY_S && (n.modal.open(ao), c.preventDefault()), c.metaKey && c.code === Re.ENTER && (s.toggle("fullScreen"), n.root.focus()), c.metaKey && c.code === Re.KEY_A && (t.selectAll(n.selectionMode || "multiple", n), c.preventDefault()), c.code === Re.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && n.modal.open(Qe, {
        storage: t.path.get().storage,
        item: l.value[0]
      }), c.metaKey && c.code === Re.KEY_C && i("copy")) {
        if (l.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(l.value.map((f) => $e(f)))), e.success(
          l.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", l.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Re.KEY_X && i("copy")) {
        if (l.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(l.value.map((f) => $e(f)))), e.success(
          l.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", l.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Re.KEY_V && i("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(n.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(n.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          n.modal.open(it, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          }), t.clearClipboard();
          return;
        }
        if (t.getClipboard().type === "copy") {
          n.modal.open(ln, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        c.preventDefault();
      }
    }
  };
  we(async () => {
    if (await Ae(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), wt(() => {
    n.root && n.root.removeEventListener("keydown", d);
  });
}
function Ad() {
  const n = M(!1), e = M([]);
  return {
    isDraggingExternal: n,
    externalFiles: e,
    handleDragEnter: (d) => {
      d.preventDefault(), d.stopPropagation();
      const c = d.dataTransfer?.items;
      c && Array.from(c).some((m) => m.kind === "file") && (n.value = !0, d.isExternalDrag = !0);
    },
    handleDragOver: (d) => {
      n.value && d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.preventDefault(), d.stopPropagation());
    },
    handleDragLeave: (d) => {
      d.preventDefault();
      const c = d.currentTarget.getBoundingClientRect(), f = d.clientX, m = d.clientY;
      (f < c.left || f > c.right || m < c.top || m > c.bottom) && (n.value = !1);
    },
    handleDrop: async (d) => {
      d.preventDefault(), d.stopPropagation(), n.value = !1;
      const c = d.dataTransfer?.items;
      if (c) {
        const f = Array.from(c).filter((m) => m.kind === "file");
        if (f.length > 0) {
          e.value = [];
          const m = f.map((p) => ({
            entry: p.webkitGetAsEntry?.(),
            file: p.getAsFile()
          }));
          for (const { entry: p, file: v } of m)
            p ? await nn((k, b) => {
              const $ = k?.fullPath || b.name, h = $.startsWith("/") ? $.slice(1) : $;
              e.value.push({
                name: b.name,
                relativePath: h,
                size: b.size,
                type: b.type,
                lastModified: new Date(b.lastModified),
                file: b
              });
            }, p) : v && e.value.push({
              name: v.name,
              relativePath: v.name,
              size: v.size,
              type: v.type,
              lastModified: new Date(v.lastModified),
              file: v
            });
          return e.value;
        }
      }
      return [];
    },
    clearExternalFiles: () => {
      e.value = [];
    }
  };
}
const Od = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ld(n, e) {
  return u(), _("svg", Od, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const io = { render: Ld }, Rd = { class: "vuefinder__new-folder-modal__content" }, Bd = { class: "vuefinder__new-folder-modal__form" }, zd = { class: "vuefinder__new-folder-modal__description" }, Vd = ["placeholder"], cn = /* @__PURE__ */ re({
  __name: "ModalNewFolder",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = oe(i.path), l = M(""), d = () => {
      l.value !== "" && e.adapter.createFolder({
        path: r.value.path,
        name: l.value
      }).then((c) => {
        t.success(s("%s is created.", l.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Te(c, s("Failed to create folder")));
      });
    };
    return (c, f) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, w(a(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (m) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(io),
            title: a(s)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Rd, [
            o("div", Bd, [
              o("p", zd, w(a(s)("Create a new folder")), 1),
              he(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (m) => l.value = m),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(s)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: Ke(d, ["enter"])
              }, null, 40, Vd), [
                [We, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Nd(n, e) {
  return u(), _("svg", Ud, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const lo = { render: Nd }, Hd = { class: "vuefinder__new-file-modal__content" }, jd = { class: "vuefinder__new-file-modal__form" }, Kd = { class: "vuefinder__new-file-modal__description" }, qd = ["placeholder"], ro = /* @__PURE__ */ re({
  __name: "ModalNewFile",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = oe(i.path), l = M(""), d = () => {
      l.value !== "" && e.adapter.createFile({
        path: r.value.path,
        name: l.value
      }).then((c) => {
        t.success(s("%s is created.", l.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Te(c, s("Failed to create file")));
      });
    };
    return (c, f) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, w(a(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (m) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(lo),
            title: a(s)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", Hd, [
            o("div", jd, [
              o("p", Kd, w(a(s)("Create a new file")), 1),
              he(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (m) => l.value = m),
                class: "vuefinder__new-file-modal__input",
                placeholder: a(s)("File Name"),
                type: "text",
                onKeyup: Ke(d, ["enter"])
              }, null, 40, qd), [
                [We, l.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Wd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Gd(n, e) {
  return u(), _("svg", Wd, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const co = { render: Gd };
function Yt(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const Yd = { class: "vuefinder__upload-modal__content relative" }, Xd = { class: "vuefinder__upload-modal__target-section" }, Qd = { class: "vuefinder__upload-modal__target-label" }, Jd = { class: "vuefinder__upload-modal__target-container" }, Zd = { class: "vuefinder__upload-modal__target-path" }, ec = { class: "vuefinder__upload-modal__target-storage" }, tc = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, nc = { class: "vuefinder__upload-modal__target-badge" }, oc = { class: "vuefinder__upload-modal__drag-hint" }, sc = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, ac = ["textContent"], ic = { class: "vuefinder__upload-modal__file-info" }, lc = {
  key: 0,
  class: "vuefinder__upload-modal__file-rename"
}, rc = ["placeholder", "onKeyup"], dc = ["title", "onClick"], cc = ["title"], uc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, vc = { class: "vuefinder__upload-modal__file-name md:hidden" }, fc = {
  key: 0,
  class: "ml-auto"
}, _c = ["title", "disabled", "onClick"], pc = ["title", "disabled", "onClick"], mc = {
  key: 0,
  class: "py-2"
}, hc = ["aria-expanded"], gc = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, yc = ["disabled"], wc = ["aria-expanded"], bc = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, un = /* @__PURE__ */ re({
  __name: "ModalUpload",
  setup(n) {
    const e = le(), { t } = e.i18n, s = e.fs, i = oe(s.path), r = M(i.value), l = M(!1), d = () => {
      const H = r.value.path;
      if (!H) return { storage: "local", path: "" };
      if (H.endsWith("://"))
        return { storage: H.replace("://", ""), path: "" };
      const E = H.split("://");
      return {
        storage: E[0] || "local",
        path: E[1] || ""
      };
    }, c = (H) => {
      H && (r.value = H);
    }, f = (H) => {
      H && (r.value = H, l.value = !1);
    }, {
      container: m,
      internalFileInput: p,
      internalFolderInput: v,
      pickFiles: k,
      queue: b,
      message: $,
      uploading: h,
      hasFilesInDropArea: y,
      definitions: g,
      openFileSelector: C,
      upload: S,
      cancel: I,
      remove: T,
      clear: L,
      close: q,
      getClassNameForEntry: Z,
      getIconForEntry: ee,
      addExternalFiles: Q,
      renameEntry: W
    } = Qn(e.customUploader), P = M(null), D = M(""), U = M(null), Y = (H) => {
      const E = H.lastIndexOf("/");
      return E === -1 ? H : H.slice(E + 1);
    }, ue = (H) => {
      h.value || H.status !== g.value.QUEUE_ENTRY_STATUS.UPLOADING && (P.value = H.id, D.value = Y(H.name), Ae(() => {
        const E = U.value;
        if (E) {
          E.focus();
          const N = D.value.lastIndexOf(".");
          N > 0 ? E.setSelectionRange(0, N) : E.select();
        }
      }));
    }, B = () => {
      P.value = null, D.value = "";
    }, x = async (H) => {
      const E = D.value.trim();
      if (!E || E === Y(H.name)) {
        B();
        return;
      }
      await W(H, E), B();
    }, z = () => {
      S(r.value), e.config.get("closeUploadModalOnSubmit") && q();
    };
    we(() => {
      e.emitter.on("vf-external-files-dropped", (H) => {
        Q(H);
      });
    }), Ie(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const F = M(!1), V = M(null), A = M(null), O = (H) => {
      if (!F.value) return;
      const E = H.target, N = V.value?.contains(E) ?? !1, ce = A.value?.contains(E) ?? !1;
      !N && !ce && (F.value = !1);
    };
    return we(() => document.addEventListener("click", O)), Ie(() => document.removeEventListener("click", O)), (H, E) => (u(), X(Ue, {
      "show-drag-overlay": a(y),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: ie(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: V,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: te([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              F.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: E[4] || (E[4] = (N) => a(C)())
            }, w(a(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": F.value ? "true" : "false",
              onClick: E[5] || (E[5] = _e((N) => F.value = !F.value, ["stop"]))
            }, [...E[21] || (E[21] = [
              o("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                o("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, hc)
          ], 2),
          F.value ? (u(), _("div", gc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: E[6] || (E[6] = (N) => {
                a(C)(), F.value = !1;
              })
            }, w(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: E[7] || (E[7] = (N) => {
                a(v)?.click(), F.value = !1;
              })
            }, w(a(t)("Select Folders")), 1),
            E[22] || (E[22] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(h) ? "disabled" : ""]),
              onClick: E[8] || (E[8] = (N) => a(h) ? null : (a(L)(!1), F.value = !1))
            }, w(a(t)("Clear all")), 3),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(h) ? "disabled" : ""]),
              onClick: E[9] || (E[9] = (N) => a(h) ? null : (a(L)(!0), F.value = !1))
            }, w(a(t)("Clear only successful")), 3)
          ])) : j("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(h) || !a(b).length,
          onClick: _e(z, ["prevent"])
        }, w(a(t)("Upload")), 9, yc),
        a(h) ? (u(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: E[10] || (E[10] = _e(
            //@ts-ignore
            (...N) => a(I) && a(I)(...N),
            ["prevent"]
          ))
        }, w(a(t)("Cancel")), 1)) : (u(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: E[11] || (E[11] = _e(
            //@ts-ignore
            (...N) => a(q) && a(q)(...N),
            ["prevent"]
          ))
        }, w(a(t)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: A,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: te(["vuefinder__upload-actions", F.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              ref_key: "pickFiles",
              ref: k,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, w(a(t)("Select Files")), 513),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": F.value ? "true" : "false",
              onClick: E[12] || (E[12] = _e((N) => F.value = !F.value, ["stop"]))
            }, [...E[23] || (E[23] = [
              o("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "h-4 w-4",
                viewBox: "0 0 20 20",
                fill: "currentColor"
              }, [
                o("path", {
                  "fill-rule": "evenodd",
                  d: "M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z",
                  "clip-rule": "evenodd"
                })
              ], -1)
            ])], 8, wc)
          ], 2),
          F.value ? (u(), _("div", bc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: E[13] || (E[13] = (N) => {
                a(C)(), F.value = !1;
              })
            }, w(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: E[14] || (E[14] = (N) => {
                a(v)?.click(), F.value = !1;
              })
            }, w(a(t)("Select Folders")), 1),
            E[24] || (E[24] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(h) ? "disabled" : ""]),
              onClick: E[15] || (E[15] = (N) => a(h) ? null : (a(L)(!1), F.value = !1))
            }, w(a(t)("Clear all")), 3),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(h) ? "disabled" : ""]),
              onClick: E[16] || (E[16] = (N) => a(h) ? null : (a(L)(!0), F.value = !1))
            }, w(a(t)("Clear only successful")), 3)
          ])) : j("", !0)
        ], 512)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(co),
            title: a(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", Yd, [
            o("div", Xd, [
              o("div", Qd, w(a(t)("Target Directory")), 1),
              o("div", Jd, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: E[0] || (E[0] = (N) => l.value = !l.value)
                }, [
                  o("div", Zd, [
                    o("span", ec, w(d().storage) + "://", 1),
                    d().path ? (u(), _("span", tc, w(d().path), 1)) : j("", !0)
                  ]),
                  o("span", nc, w(a(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: te([
                  "vuefinder__upload-modal__tree-selector",
                  l.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                G(kt, {
                  modelValue: r.value,
                  "onUpdate:modelValue": [
                    E[1] || (E[1] = (N) => r.value = N),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: f
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", oc, w(a(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: m,
              class: "hidden"
            }, null, 512),
            o("div", sc, [
              (u(!0), _(fe, null, ge(a(b), (N) => (u(), _("div", {
                key: N.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: te(["vuefinder__upload-modal__file-icon", a(Z)(N)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: w(a(ee)(N))
                  }, null, 8, ac)
                ], 2),
                o("div", ic, [
                  P.value === N.id ? (u(), _("div", lc, [
                    he(o("input", {
                      ref_for: !0,
                      ref_key: "renameInputRef",
                      ref: U,
                      "onUpdate:modelValue": E[2] || (E[2] = (ce) => D.value = ce),
                      type: "text",
                      class: "vuefinder__upload-modal__file-rename-input",
                      placeholder: a(t)("Rename"),
                      onKeyup: [
                        Ke((ce) => x(N), ["enter"]),
                        Ke(B, ["esc"])
                      ]
                    }, null, 40, rc), [
                      [We, D.value]
                    ]),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn vuefinder__upload-modal__file-rename-btn--save",
                      title: a(t)("Save"),
                      onClick: (ce) => x(N)
                    }, [...E[17] || (E[17] = [
                      o("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2",
                        stroke: "currentColor",
                        class: "vuefinder__upload-modal__file-rename-icon"
                      }, [
                        o("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M4.5 12.75l6 6 9-13.5"
                        })
                      ], -1)
                    ])], 8, dc),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn",
                      title: a(t)("Cancel"),
                      onClick: B
                    }, [...E[18] || (E[18] = [
                      o("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "2",
                        stroke: "currentColor",
                        class: "vuefinder__upload-modal__file-rename-icon"
                      }, [
                        o("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1)
                    ])], 8, cc)
                  ])) : (u(), _(fe, { key: 1 }, [
                    o("div", uc, w(a(Yt)(N.name, 40)) + " (" + w(N.size) + ") ", 1),
                    o("div", vc, w(a(Yt)(N.name, 16)) + " (" + w(N.size) + ") ", 1),
                    o("div", {
                      class: te(["vuefinder__upload-modal__file-status", a(Z)(N)])
                    }, [
                      ye(w(N.statusName) + " ", 1),
                      N.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), _("b", fc, w(N.percent), 1)) : j("", !0)
                    ], 2)
                  ], 64))
                ]),
                P.value !== N.id ? (u(), _("button", {
                  key: 0,
                  type: "button",
                  class: te([
                    "vuefinder__upload-modal__file-rename-action",
                    a(h) || N.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING ? "disabled" : ""
                  ]),
                  title: a(t)("Rename"),
                  disabled: a(h) || N.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING,
                  onClick: (ce) => ue(N)
                }, [...E[19] || (E[19] = [
                  o("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-rename-icon"
                  }, [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                    })
                  ], -1)
                ])], 10, _c)) : j("", !0),
                P.value !== N.id ? (u(), _("button", {
                  key: 1,
                  type: "button",
                  class: te(["vuefinder__upload-modal__file-remove", a(h) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(h),
                  onClick: (ce) => a(T)(N)
                }, [...E[20] || (E[20] = [
                  o("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])], 10, pc)) : j("", !0)
              ]))), 128)),
              a(b).length ? j("", !0) : (u(), _("div", mc, w(a(t)("No files selected!")), 1))
            ]),
            a($).length ? (u(), X(Gt, {
              key: 0,
              error: "",
              onHidden: E[3] || (E[3] = (N) => $.value = "")
            }, {
              default: ie(() => [
                ye(w(a($)), 1)
              ]),
              _: 1
            })) : j("", !0)
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: p,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        o("input", {
          ref_key: "internalFolderInput",
          ref: v,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), kc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function $c(n, e) {
  return u(), _("svg", kc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const uo = { render: $c }, xc = { class: "vuefinder__unarchive-modal__content" }, Sc = { class: "vuefinder__unarchive-modal__items" }, Cc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pc = { class: "vuefinder__unarchive-modal__item-name" }, Ec = { class: "vuefinder__unarchive-modal__info" }, Tc = { class: "vuefinder__unarchive-modal__target" }, Dc = { class: "vuefinder__unarchive-modal__target-label" }, Mc = ["title"], Ic = {
  key: 0,
  class: "vuefinder__unarchive-modal__target-selector"
}, vn = /* @__PURE__ */ re({
  __name: "ModalUnarchive",
  setup(n) {
    const e = le(), t = Ve(e), s = e.fs, i = oe(s.path), { t: r } = e.i18n, l = M(e.modal.data.items[0]), d = M([]), c = M(null), f = M(!1), m = R(() => c.value?.path || i.value.path), p = () => {
      f.value = !f.value;
    }, v = ($) => {
      $ && (c.value = $);
    }, k = ($) => {
      $ && (c.value = $, f.value = !1);
    }, b = () => {
      const $ = c.value?.path;
      e.adapter.unarchive({
        item: l.value.path,
        path: i.value.path,
        // Optional. Sent when the user explicitly picks a different folder.
        ...$ && $ !== i.value.path ? { destination: $ } : {}
      }).then((h) => {
        t.success(r("The file unarchived.")), e.fs.setFiles(h.files), e.modal.close();
      }).catch((h) => {
        t.error(Te(h, r("Failed to unarchive")));
      });
    };
    return ($, h) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: b
        }, w(a(r)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[1] || (h[1] = (y) => a(e).modal.close())
        }, w(a(r)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(uo),
            title: a(r)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", xc, [
            o("div", Sc, [
              (u(!0), _(fe, null, ge(d.value, (y) => (u(), _("p", {
                key: y.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                y.type === "dir" ? (u(), _("svg", Cc, [...h[2] || (h[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), _("svg", Fc, [...h[3] || (h[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Pc, w(y.basename), 1)
              ]))), 128)),
              o("p", Ec, w(a(r)("The archive will be unarchived at")) + " (" + w(m.value) + ") ", 1),
              o("div", Tc, [
                o("div", Dc, w(a(r)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: te(["vuefinder__unarchive-modal__target-btn", { "vuefinder__unarchive-modal__target-btn--open": f.value }]),
                  onClick: p
                }, [
                  G(a(ze), { class: "vuefinder__unarchive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__unarchive-modal__target-text",
                    title: m.value
                  }, w(a(Lt)(m.value)), 9, Mc),
                  h[4] || (h[4] = o("svg", {
                    class: "vuefinder__unarchive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                f.value ? (u(), _("div", Ic, [
                  G(kt, {
                    modelValue: c.value,
                    "onUpdate:modelValue": [
                      h[0] || (h[0] = (y) => c.value = y),
                      v
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(i),
                    onSelectAndClose: k
                  }, null, 8, ["modelValue", "current-path"])
                ])) : j("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Oc(n, e) {
  return u(), _("svg", Ac, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const vo = { render: Oc }, Lc = { class: "vuefinder__archive-modal__content" }, Rc = { class: "vuefinder__archive-modal__form" }, Bc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, zc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Uc = { class: "vuefinder__archive-modal__file-name" }, Nc = ["placeholder"], Hc = { class: "vuefinder__archive-modal__target" }, jc = { class: "vuefinder__archive-modal__target-label" }, Kc = ["title"], qc = {
  key: 0,
  class: "vuefinder__archive-modal__target-selector"
}, fn = /* @__PURE__ */ re({
  __name: "ModalArchive",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = oe(i.path), l = M(""), d = M(e.modal.data.items), c = M(null), f = M(!1), m = R(() => c.value?.path || r.value.path), p = () => {
      f.value = !f.value;
    }, v = ($) => {
      $ && (c.value = $);
    }, k = ($) => {
      $ && (c.value = $, f.value = !1);
    }, b = () => {
      if (d.value.length) {
        const $ = c.value?.path;
        e.adapter.archive({
          path: r.value.path,
          items: d.value.map(({ path: h, type: y }) => ({
            path: h,
            type: y
          })),
          name: l.value,
          // Optional. Sent when the user explicitly picks a different folder.
          ...$ && $ !== r.value.path ? { destination: $ } : {}
        }).then((h) => {
          t.success(s("The file(s) archived.")), e.fs.setFiles(h.files), e.modal.close();
        }).catch((h) => {
          t.error(Te(h, s("Failed to archive files")));
        });
      }
    };
    return ($, h) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: b
        }, w(a(s)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[2] || (h[2] = (y) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(vo),
            title: a(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Lc, [
            o("div", Rc, [
              o("div", Bc, [
                (u(!0), _(fe, null, ge(d.value, (y) => (u(), _("p", {
                  key: y.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  y.type === "dir" ? (u(), _("svg", zc, [...h[3] || (h[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), _("svg", Vc, [...h[4] || (h[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Uc, w(y.basename), 1)
                ]))), 128))
              ]),
              he(o("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (y) => l.value = y),
                class: "vuefinder__archive-modal__input",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: Ke(b, ["enter"])
              }, null, 40, Nc), [
                [We, l.value]
              ]),
              o("div", Hc, [
                o("div", jc, w(a(s)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: te(["vuefinder__archive-modal__target-btn", { "vuefinder__archive-modal__target-btn--open": f.value }]),
                  onClick: p
                }, [
                  G(a(ze), { class: "vuefinder__archive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__archive-modal__target-text",
                    title: m.value
                  }, w(a(Lt)(m.value)), 9, Kc),
                  h[5] || (h[5] = o("svg", {
                    class: "vuefinder__archive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                f.value ? (u(), _("div", qc, [
                  G(kt, {
                    modelValue: c.value,
                    "onUpdate:modelValue": [
                      h[1] || (h[1] = (y) => c.value = y),
                      v
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(r),
                    onSelectAndClose: k
                  }, null, 8, ["modelValue", "current-path"])
                ])) : j("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Wc = { class: "vuefinder__about-modal__content" }, Gc = { class: "vuefinder__about-modal__main" }, Yc = { class: "vuefinder__about-modal__shortcuts" }, Xc = { class: "vuefinder__about-modal__shortcut" }, Qc = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, Jc = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, Zc = { class: "vuefinder__about-modal__shortcut" }, eu = { class: "vuefinder__about-modal__shortcut" }, tu = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, nu = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, ou = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, su = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, au = { class: "vuefinder__about-modal__shortcut" }, iu = { class: "vuefinder__about-modal__shortcut" }, lu = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, ru = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, du = /* @__PURE__ */ re({
  __name: "ModalShortcuts",
  setup(n) {
    const e = le(), { enabled: t } = Ne(), { t: s } = e.i18n;
    return (i, r) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: r[0] || (r[0] = (l) => a(e).modal.close())
        }, w(a(s)("Close")), 1)
      ]),
      default: ie(() => [
        o("div", Wc, [
          G(je, {
            icon: a(en),
            title: a(s)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", Gc, [
            o("div", Yc, [
              o("div", Xc, [
                o("div", null, w(a(s)("Refresh")), 1),
                r[1] || (r[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (u(), _("div", Qc, [
                o("div", null, w(a(s)("Rename")), 1),
                r[2] || (r[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Shift"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : j("", !0),
              a(t)("delete") ? (u(), _("div", Jc, [
                o("div", null, w(a(s)("Delete")), 1),
                r[3] || (r[3] = o("kbd", null, "Del", -1))
              ])) : j("", !0),
              o("div", Zc, [
                o("div", null, w(a(s)("Escape")), 1),
                r[4] || (r[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", eu, [
                o("div", null, w(a(s)("Select All")), 1),
                r[5] || (r[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (u(), _("div", tu, [
                o("div", null, w(a(s)("Cut")), 1),
                r[6] || (r[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : j("", !0),
              a(t)("copy") ? (u(), _("div", nu, [
                o("div", null, w(a(s)("Copy")), 1),
                r[7] || (r[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : j("", !0),
              a(t)("copy") ? (u(), _("div", ou, [
                o("div", null, w(a(s)("Paste")), 1),
                r[8] || (r[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : j("", !0),
              a(t)("search") ? (u(), _("div", su, [
                o("div", null, w(a(s)("Search")), 1),
                r[9] || (r[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : j("", !0),
              o("div", au, [
                o("div", null, w(a(s)("Toggle Sidebar")), 1),
                r[10] || (r[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", iu, [
                o("div", null, w(a(s)("Open Settings")), 1),
                r[11] || (r[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (u(), _("div", lu, [
                o("div", null, w(a(s)("Toggle Full Screen")), 1),
                r[12] || (r[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : j("", !0),
              a(t)("preview") ? (u(), _("div", ru, [
                o("div", null, w(a(s)("Preview")), 1),
                r[13] || (r[13] = o("kbd", null, "Space", -1))
              ])) : j("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), cu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function uu(n, e) {
  return u(), _("svg", cu, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const fo = { render: uu }, _n = "vuefinder:recent-paths", _o = 4, pn = typeof window < "u" && typeof window.localStorage < "u";
function mn() {
  if (!pn) return [];
  try {
    const n = window.localStorage.getItem(_n);
    if (!n) return [];
    const e = JSON.parse(n);
    return Array.isArray(e) ? e.filter((t) => typeof t == "string").slice(0, _o) : [];
  } catch {
    return [];
  }
}
function vu(n) {
  if (!(!pn || !n))
    try {
      const e = mn().filter((t) => t !== n);
      e.unshift(n), window.localStorage.setItem(_n, JSON.stringify(e.slice(0, _o)));
    } catch {
    }
}
function fu(n) {
  if (!(!pn || !n))
    try {
      const e = mn().filter((t) => t !== n);
      window.localStorage.setItem(_n, JSON.stringify(e));
    } catch {
    }
}
const _u = { class: "vuefinder__go-to-folder-modal" }, pu = { class: "vuefinder__go-to-folder-modal__content" }, mu = ["placeholder", "onKeydown"], hu = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__error"
}, gu = ["onMouseenter", "onClick", "onDblclick"], yu = { class: "vuefinder__go-to-folder-modal__suggestion-label" }, wu = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__suggestion-tag"
}, bu = ["title", "onClick"], ku = ["title", "onClick"], $u = {
  key: 2,
  class: "vuefinder__go-to-folder-modal__empty"
}, xu = {
  key: 3,
  class: "vuefinder__go-to-folder-modal__loading"
}, Su = ["disabled"], Cu = /* @__PURE__ */ re({
  name: "ModalGoToFolder",
  __name: "ModalGoToFolder",
  setup(n) {
    const e = le(), { t } = e.i18n, s = e.fs, i = oe(s.storages), r = M(""), l = M([]), d = M(0), c = M(!1), f = M(!1), m = M(""), p = M(null), v = M(null);
    let k = 0;
    const b = R(() => i.value ?? []), $ = (B) => {
      const x = B ?? "", z = x.indexOf("://");
      if (z === -1)
        return { storage: null, parent: "", filter: x.trim(), hasProtocol: !1 };
      const F = x.slice(0, z), V = x.slice(z + 3), A = V.lastIndexOf("/"), O = A === -1 ? `${F}://` : `${F}://${V.slice(0, A).replace(/^\/+/, "")}`, H = A === -1 ? V : V.slice(A + 1);
      return { storage: F, parent: O, filter: H, hasProtocol: !0 };
    }, h = (B) => {
      const x = B.toLowerCase();
      l.value = b.value.filter((z) => !x || z.toLowerCase().includes(x)).map((z) => ({
        path: `${z}://`,
        label: `${z}://`,
        kind: "storage"
      })), d.value = l.value.length ? 0 : -1, m.value = "";
    }, y = () => {
      const B = mn();
      l.value = B.map((x) => ({
        path: x,
        label: x,
        kind: "recent"
      })), d.value = l.value.length ? 0 : -1, m.value = "";
    }, g = async (B, x) => {
      const z = ++k;
      c.value = !0, m.value = "";
      try {
        const F = await e.adapter.list(B);
        if (z !== k) return;
        const V = x.toLowerCase(), A = (F?.files ?? []).filter(
          (O) => O.type === "dir" && (!V || O.basename.toLowerCase().startsWith(V))
        );
        l.value = A.map(
          (O) => ({
            path: O.path,
            label: O.basename,
            kind: "dir"
          })
        ), d.value = l.value.length ? 0 : -1;
      } catch (F) {
        if (z !== k) return;
        l.value = [], d.value = -1, m.value = Te(F, t("Folder not found"));
      } finally {
        z === k && (c.value = !1);
      }
    };
    let C = null;
    const S = (B) => {
      C && clearTimeout(C), C = setTimeout(() => I(B), 150);
    }, I = (B) => {
      const x = B.trim();
      if (!x) {
        k++, c.value = !1, y();
        return;
      }
      const { hasProtocol: z, parent: F, filter: V } = $(x);
      if (!z) {
        k++, c.value = !1, h(x);
        return;
      }
      g(F, V);
    };
    pe(r, (B) => S(B)), we(() => {
      y(), Ae(() => p.value?.focus());
    });
    const T = () => {
      Ae(() => {
        const B = v.value;
        if (!B) return;
        const x = B.children[d.value];
        if (!x) return;
        const z = B.scrollTop, F = z + B.clientHeight, V = x.offsetTop, A = V + x.offsetHeight;
        V < z ? B.scrollTop = V : A > F && (B.scrollTop = A - B.clientHeight);
      });
    }, L = (B) => {
      if (!l.value.length) return;
      const x = l.value.length;
      d.value = ((d.value + B) % x + x) % x, T();
    }, q = (B) => {
      r.value = B.kind === "dir" ? `${B.path}/` : B.path, Ae(() => {
        p.value?.setSelectionRange(r.value.length, r.value.length);
      });
    }, Z = (B) => {
      if (!B.includes("://"))
        return {
          ok: !1,
          reason: t("Invalid path format. Path must be in format: storage://path/to/folder")
        };
      const x = B.slice(0, B.indexOf("://"));
      return b.value.includes(x) ? { ok: !0 } : { ok: !1, reason: t('Invalid storage. Storage "%s" is not available.', x) };
    }, ee = async (B) => {
      if (f.value) return;
      const x = B.trim();
      if (!x) return;
      const z = Z(x);
      if (!z.ok) {
        m.value = z.reason ?? "";
        return;
      }
      f.value = !0;
      try {
        if (await e.adapter.open(x) === void 0)
          return;
        vu(x), e.modal.close();
      } catch (F) {
        m.value = Te(F, t("Failed to navigate to folder")), s.setLoading(!1);
      } finally {
        f.value = !1;
      }
    }, Q = () => {
      const B = l.value[d.value];
      ee(B ? B.path : r.value);
    }, W = (B) => {
      if (!l.value.length) return;
      B.preventDefault();
      const x = l.value[d.value];
      x && q(x);
    }, P = (B) => {
      if (B.kind === "dir") {
        q(B);
        return;
      }
      ee(B.path);
    }, D = (B) => {
      ee(B.path);
    }, U = (B, x) => {
      B.stopPropagation(), B.preventDefault(), fu(x), y();
    }, Y = (B, x) => {
      B.stopPropagation(), B.preventDefault(), r.value = x, Ae(() => {
        p.value?.focus(), p.value?.setSelectionRange(r.value.length, r.value.length);
      });
    }, ue = R(() => {
      const B = b.value[0];
      return B ? `${B}://path/to/folder` : "storage://path/to/folder";
    });
    return (B, x) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: f.value,
          onClick: Q
        }, w(a(t)("Go")), 9, Su),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: x[3] || (x[3] = (z) => a(e).modal.close())
        }, w(a(t)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", _u, [
          G(je, {
            icon: a(At),
            title: a(t)("Go to Folder")
          }, null, 8, ["icon", "title"]),
          o("div", pu, [
            he(o("input", {
              ref_key: "inputRef",
              ref: p,
              "onUpdate:modelValue": x[0] || (x[0] = (z) => r.value = z),
              class: "vuefinder__go-to-folder-modal__input",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: ue.value,
              onKeydown: [
                x[1] || (x[1] = Ke(_e((z) => L(1), ["prevent"]), ["down"])),
                x[2] || (x[2] = Ke(_e((z) => L(-1), ["prevent"]), ["up"])),
                Ke(_e(Q, ["prevent"]), ["enter"]),
                Ke(W, ["tab"])
              ]
            }, null, 40, mu), [
              [We, r.value]
            ]),
            m.value ? (u(), _("div", hu, w(m.value), 1)) : j("", !0),
            l.value.length ? (u(), _("div", {
              key: 1,
              ref_key: "suggestionListRef",
              ref: v,
              class: "vuefinder__go-to-folder-modal__suggestions"
            }, [
              (u(!0), _(fe, null, ge(l.value, (z, F) => (u(), _("div", {
                key: `${z.kind}:${z.path}`,
                class: te(["vuefinder__go-to-folder-modal__suggestion", {
                  "vuefinder__go-to-folder-modal__suggestion--active": F === d.value
                }]),
                onMouseenter: (V) => d.value = F,
                onClick: (V) => P(z),
                onDblclick: (V) => D(z)
              }, [
                G(a(ze), { class: "vuefinder__go-to-folder-modal__suggestion-icon" }),
                o("span", yu, w(z.label), 1),
                z.kind === "recent" ? (u(), _("span", wu, w(a(t)("Recent")), 1)) : j("", !0),
                z.kind === "recent" ? (u(), _("button", {
                  key: 1,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-fill",
                  title: a(t)("Edit this path"),
                  onClick: (V) => Y(V, z.path)
                }, [
                  G(a(fo), { class: "vuefinder__go-to-folder-modal__suggestion-fill-icon" })
                ], 8, bu)) : j("", !0),
                z.kind === "recent" ? (u(), _("button", {
                  key: 2,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-remove",
                  title: a(t)("Remove from recent"),
                  onClick: (V) => U(V, z.path)
                }, " × ", 8, ku)) : j("", !0)
              ], 42, gu))), 128))
            ], 512)) : c.value ? j("", !0) : (u(), _("div", $u, [
              r.value.trim() ? (u(), _(fe, { key: 1 }, [
                ye(w(a(t)("No matching folders.")), 1)
              ], 64)) : (u(), _(fe, { key: 0 }, [
                ye(w(a(t)("No recent folders yet.")), 1)
              ], 64))
            ])),
            c.value ? (u(), _("div", xu, w(a(t)("Loading…")), 1)) : j("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Fu() {
  const n = le(), { enabled: e } = Ne(), { t } = n?.i18n || { t: (m) => m }, s = n?.fs, i = n?.config, r = oe(i.state), l = oe(s.selectedItems), d = oe(s?.storages || []), c = R(() => window.opener !== null || window.name !== "" || window.history.length <= 1);
  return { menuItems: R(() => [
    {
      id: "file",
      label: t("File"),
      items: [
        {
          id: "new-folder",
          label: t("New Folder"),
          action: () => n?.modal?.open(cn, { items: l.value }),
          hidden: () => !e("newfolder")
        },
        {
          id: "new-file",
          label: t("New File"),
          action: () => n?.modal?.open(ro, { items: l.value }),
          hidden: () => !e("newfile")
        },
        {
          type: "separator",
          hidden: () => !e("newfolder") && !e("newfile") || !e("upload")
        },
        {
          id: "upload",
          label: t("Upload"),
          action: () => n?.modal?.open(un, { items: l.value }),
          hidden: () => !e("upload")
        },
        { type: "separator", hidden: () => !e("search") },
        {
          id: "search",
          label: t("Search"),
          action: () => n.modal.open(dn),
          hidden: () => !e("search")
        },
        { type: "separator", hidden: () => !e("archive") && !e("unarchive") },
        {
          id: "archive",
          label: t("Archive"),
          action: () => {
            l.value.length > 0 && n?.modal?.open(fn, { items: l.value });
          },
          enabled: () => l.value.length > 0,
          hidden: () => !e("archive")
        },
        {
          id: "unarchive",
          label: t("Unarchive"),
          action: () => {
            l.value.length === 1 && l.value[0]?.mime_type === "application/zip" && n?.modal?.open(vn, { items: l.value });
          },
          enabled: () => l.value.length === 1 && l.value[0]?.mime_type === "application/zip",
          hidden: () => !e("unarchive")
        },
        { type: "separator", hidden: () => !e("preview") },
        {
          id: "preview",
          label: t("Preview"),
          action: () => {
            l.value.length === 1 && l.value[0]?.type !== "dir" && n?.modal?.open(Qe, {
              storage: s?.path?.get()?.storage,
              item: l.value[0]
            });
          },
          enabled: () => l.value.length === 1 && l.value[0]?.type !== "dir",
          hidden: () => !e("preview")
        },
        {
          id: "open-as",
          label: t("Preview as"),
          items: [
            {
              id: "open-as-text",
              label: t("Text"),
              action: () => n?.modal?.open(Qe, {
                storage: s?.path?.get()?.storage,
                item: l.value[0],
                forceType: "text"
              }),
              enabled: () => l.value.length === 1 && l.value[0]?.type !== "dir"
            },
            {
              id: "open-as-image",
              label: t("Image"),
              action: () => n?.modal?.open(Qe, {
                storage: s?.path?.get()?.storage,
                item: l.value[0],
                forceType: "image"
              }),
              enabled: () => l.value.length === 1 && l.value[0]?.type !== "dir"
            }
          ],
          enabled: () => l.value.length === 1 && l.value[0]?.type !== "dir",
          hidden: () => !e("preview")
        },
        // Only show exit option if we can actually close the window
        ...c.value ? [
          { type: "separator" },
          {
            id: "exit",
            label: t("Exit"),
            action: () => {
              try {
                window.close();
              } catch {
              }
            },
            enabled: () => !0
          }
        ] : []
      ]
    },
    {
      id: "edit",
      label: t("Edit"),
      items: [
        // Only show Select All and Deselect All in multiple selection mode
        ...n?.selectionMode === "multiple" ? [
          {
            id: "select-all",
            label: t("Select All"),
            action: () => s?.selectAll(n?.selectionMode || "multiple", n),
            enabled: () => !0
          },
          {
            id: "deselect",
            label: t("Deselect All"),
            action: () => s?.clearSelection(),
            enabled: () => l.value.length > 0
          },
          { type: "separator" }
        ] : [],
        ...e("copy") ? [
          {
            id: "cut",
            label: t("Cut"),
            action: () => {
              l.value.length > 0 && s?.setClipboard(
                "cut",
                new Set(l.value.map((m) => $e(m)))
              );
            },
            enabled: () => l.value.length > 0
          },
          {
            id: "copy",
            label: t("Copy"),
            action: () => {
              l.value.length > 0 && s?.setClipboard(
                "copy",
                new Set(l.value.map((m) => $e(m)))
              );
            },
            enabled: () => l.value.length > 0
          },
          {
            id: "paste",
            label: t("Paste"),
            action: () => {
              const m = s?.getClipboard();
              m?.items?.size > 0 && n?.modal?.open(m.type === "cut" ? it : ln, {
                items: { from: Array.from(m.items), to: s?.path?.get() }
              });
            },
            enabled: () => s?.getClipboard()?.items?.size > 0
          }
        ] : [],
        ...e("move") ? [
          {
            id: "move",
            label: t("Move files"),
            action: () => {
              if (l.value.length > 0) {
                const m = {
                  storage: s?.path?.get()?.storage || "",
                  path: s?.path?.get()?.path || "",
                  type: "dir"
                };
                n?.modal?.open(it, {
                  items: { from: l.value, to: m }
                });
              }
            },
            enabled: () => l.value.length > 0
          },
          { type: "separator" }
        ] : [],
        {
          id: "copy-path",
          label: t("Copy Path"),
          action: async () => {
            if (l.value.length === 1) {
              const m = l.value[0];
              await yt(m.path);
            } else {
              const m = s?.path?.get();
              m?.path && await yt(m.path);
            }
          },
          enabled: () => !0
        },
        {
          id: "copy-download-url",
          label: t("Copy Download URL"),
          action: async () => {
            if (l.value.length === 1) {
              const m = l.value[0], p = n?.adapter?.getDownloadUrl({ path: m.path });
              p && await Rr(p);
            }
          },
          enabled: () => l.value.length === 1 && l.value[0]?.type !== "dir"
        },
        { type: "separator", hidden: () => !e("rename") && !e("delete") },
        {
          id: "rename",
          label: t("Rename"),
          action: () => {
            l.value.length === 1 && n?.modal?.open(Dt, { items: l.value });
          },
          enabled: () => l.value.length === 1,
          hidden: () => !e("rename")
        },
        {
          id: "delete",
          label: t("Delete"),
          action: () => {
            l.value.length > 0 && n?.modal?.open(Tt, { items: l.value });
          },
          enabled: () => l.value.length > 0,
          hidden: () => !e("delete")
        }
      ]
    },
    {
      id: "view",
      label: t("View"),
      items: [
        {
          id: "refresh",
          label: t("Refresh"),
          action: () => {
            n.adapter.invalidateListQuery(s.path.get().path), n.adapter.open(s.path.get().path);
          },
          enabled: () => !0
        },
        { type: "separator" },
        {
          id: "grid-view",
          label: t("Grid View"),
          action: () => i?.set("view", "grid"),
          enabled: () => !0,
          checked: () => r.value?.view === "grid"
        },
        {
          id: "list-view",
          label: t("List View"),
          action: () => i?.set("view", "list"),
          enabled: () => !0,
          checked: () => r.value?.view === "list"
        },
        { type: "separator" },
        {
          id: "tree-view",
          label: t("Tree View"),
          action: () => i?.toggle("showTreeView"),
          enabled: () => !0,
          checked: () => r.value?.showTreeView
        },
        {
          id: "thumbnails",
          label: t("Show Thumbnails"),
          action: () => i?.toggle("showThumbnails"),
          enabled: () => !0,
          checked: () => r.value?.showThumbnails
        },
        {
          id: "show-hidden-files",
          label: t("Show Hidden Files"),
          action: () => i?.toggle("showHiddenFiles"),
          enabled: () => !0,
          checked: () => r.value?.showHiddenFiles
        },
        { type: "separator", hidden: () => !e("fullscreen") },
        {
          id: "fullscreen",
          label: t("Full Screen"),
          action: () => i?.toggle("fullScreen"),
          enabled: () => e("fullscreen"),
          checked: () => r.value?.fullScreen,
          hidden: () => !e("fullscreen")
        },
        { type: "separator" },
        {
          id: "persist-path",
          label: t("Persist Path"),
          action: () => {
            i?.toggle("persist"), n.emitter.emit("vf-persist-path-saved");
          },
          enabled: () => !0,
          checked: () => r.value?.persist
        },
        {
          id: "metric-units",
          label: t("Metric Units"),
          action: () => {
            i?.toggle("metricUnits"), n.filesize = i?.get("metricUnits") ? Hn : Jt, n.emitter.emit("vf-metric-units-saved");
          },
          enabled: () => !0,
          checked: () => r.value?.metricUnits
        }
      ]
    },
    {
      id: "go",
      label: t("Go"),
      items: [
        ...e("history") ? [
          {
            id: "forward",
            label: t("Forward"),
            action: () => {
              s?.goForward();
              const m = s?.path?.get();
              m?.path && n?.adapter.open(m.path);
            },
            enabled: () => s?.canGoForward?.get() ?? !1
          },
          {
            id: "back",
            label: t("Back"),
            action: () => {
              s?.goBack();
              const m = s?.path?.get();
              m?.path && n?.adapter.open(m.path);
            },
            enabled: () => s?.canGoBack?.get() ?? !1
          }
        ] : [],
        {
          id: "open-containing-folder",
          label: t("Open containing folder"),
          action: () => {
            const m = s?.path?.get();
            if (m?.breadcrumb && m.breadcrumb.length > 1) {
              const v = m.breadcrumb[m.breadcrumb.length - 2]?.path ?? `${m.storage}://`;
              n?.adapter.open(v);
            }
          },
          enabled: () => {
            const m = s?.path?.get();
            return m?.breadcrumb && m.breadcrumb.length > 1;
          }
        },
        { type: "separator" },
        // Dynamic storage list items will be added here
        ...(d.value || []).map((m) => ({
          id: `storage-${m}`,
          label: m,
          action: () => {
            const p = `${m}://`;
            n?.adapter.open(p);
          },
          enabled: () => !0
        })),
        { type: "separator" },
        {
          id: "go-to-folder",
          label: t("Go to Folder"),
          action: () => n?.modal?.open(Cu),
          enabled: () => !0
        }
      ]
    },
    {
      id: "help",
      label: t("Help"),
      items: [
        {
          id: "settings",
          label: t("Settings"),
          action: () => n?.modal?.open(ao),
          enabled: () => !0
        },
        {
          id: "shortcuts",
          label: t("Shortcuts"),
          action: () => n?.modal?.open(du),
          enabled: () => !0
        },
        {
          id: "about",
          label: t("About"),
          action: () => n?.modal?.open(Wn),
          enabled: () => !0
        }
      ]
    }
  ]), shouldShowExit: c };
}
const Pu = { class: "vuefinder__menubar__container" }, Eu = ["onClick", "onMouseenter"], Tu = { class: "vuefinder__menubar__label" }, Du = ["onMouseenter"], Mu = ["onClick"], Iu = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Au = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Ou = {
  key: 2,
  class: "vuefinder__menubar__dropdown__chevron",
  viewBox: "0 0 16 16",
  fill: "currentColor",
  "aria-hidden": "true"
}, Lu = {
  key: 3,
  class: "vuefinder__menubar__dropdown__submenu"
}, Ru = ["onClick"], Bu = { class: "vuefinder__menubar__dropdown__label" }, zu = /* @__PURE__ */ re({
  __name: "MenuBar",
  setup(n) {
    const { menuItems: e } = Fu(), t = M(null), s = M(!1), i = (f) => {
      t.value === f ? l() : (t.value = f ?? null, s.value = !0);
    }, r = (f) => {
      s.value && (t.value = f ?? null);
    }, l = () => {
      t.value = null, s.value = !1;
    }, d = (f) => {
      l(), f?.();
    }, c = (f) => {
      f.target.closest(".vuefinder__menubar") || l();
    };
    return we(() => {
      document.addEventListener("click", c);
    }), Ie(() => {
      document.removeEventListener("click", c);
    }), (f, m) => (u(), _("div", {
      class: "vuefinder__menubar",
      onClick: m[0] || (m[0] = _e(() => {
      }, ["stop"]))
    }, [
      o("div", Pu, [
        ke(f.$slots, "menubar-start", { menuItems: a(e) }),
        ke(f.$slots, "menu-items", {
          menuItems: a(e),
          handleMenuAction: d
        }, () => [
          (u(!0), _(fe, null, ge(a(e), (p) => (u(), _("div", {
            key: p.id,
            class: te(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": t.value === p.id }]),
            onClick: (v) => i(p.id),
            onMouseenter: (v) => r(p.id)
          }, [
            o("span", Tu, w(p.label), 1),
            t.value === p.id ? (u(), _("div", {
              key: 0,
              class: "vuefinder__menubar__dropdown",
              onMouseenter: (v) => r(p.id)
            }, [
              (u(!0), _(fe, null, ge(p.items, (v) => (u(), _("div", {
                key: v.id || v.type,
                class: te(["vuefinder__menubar__dropdown__item", {
                  "vuefinder__menubar__dropdown__item--separator": v.type === "separator",
                  "vuefinder__menubar__dropdown__item--disabled": v.enabled && !v.enabled(),
                  "vuefinder__menubar__dropdown__item--checked": v.checked && v.checked(),
                  "vuefinder__menubar__dropdown__item--hidden": v.hidden && v.hidden(),
                  "vuefinder__menubar__dropdown__item--has-children": v.items?.length
                }]),
                onClick: _e((k) => v.type !== "separator" && !v.items?.length && (!v.enabled || v.enabled()) ? d(v.action) : null, ["stop"])
              }, [
                v.type !== "separator" ? (u(), _("span", Iu, w(v.label), 1)) : j("", !0),
                v.checked && v.checked() ? (u(), _("span", Au, " ✓ ")) : j("", !0),
                v.items?.length ? (u(), _("svg", Ou, [...m[1] || (m[1] = [
                  o("path", { d: "M6 4l4 4-4 4z" }, null, -1)
                ])])) : j("", !0),
                v.items?.length ? (u(), _("div", Lu, [
                  (u(!0), _(fe, null, ge(v.items, (k) => (u(), _("div", {
                    key: k.id,
                    class: te(["vuefinder__menubar__dropdown__item", {
                      "vuefinder__menubar__dropdown__item--disabled": k.enabled && !k.enabled()
                    }]),
                    onClick: _e((b) => !k.enabled || k.enabled() ? d(k.action) : null, ["stop"])
                  }, [
                    o("span", Bu, w(k.label), 1)
                  ], 10, Ru))), 128))
                ])) : j("", !0)
              ], 10, Mu))), 128))
            ], 40, Du)) : j("", !0)
          ], 42, Eu))), 128))
        ]),
        ke(f.$slots, "menubar-end", { menuItems: a(e) })
      ])
    ]));
  }
}), Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Uu(n, e) {
  return u(), _("svg", Vu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Nu = { render: Uu }, Hu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function ju(n, e) {
  return u(), _("svg", Hu, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Ku = { render: ju }, qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Wu(n, e) {
  return u(), _("svg", qu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Gu = { render: Wu }, Yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Xu(n, e) {
  return u(), _("svg", Yu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Qu = { render: Xu }, Ju = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Zu(n, e) {
  return u(), _("svg", Ju, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const ev = { render: Zu }, tv = { class: "vuefinder__toolbar" }, nv = { class: "vuefinder__toolbar__actions" }, ov = ["title"], sv = ["title"], av = ["title"], iv = ["title"], lv = ["title"], rv = ["title"], dv = ["title"], cv = { class: "vuefinder__toolbar__controls" }, uv = ["title"], vv = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, fv = ["title"], _v = { class: "relative" }, pv = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, mv = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, hv = { class: "vuefinder__toolbar__dropdown-content" }, gv = { class: "vuefinder__toolbar__dropdown-section" }, yv = { class: "vuefinder__toolbar__dropdown-label" }, wv = { class: "vuefinder__toolbar__dropdown-row" }, bv = { value: "name" }, kv = { value: "size" }, $v = { value: "modified" }, xv = { value: "" }, Sv = { value: "asc" }, Cv = { value: "desc" }, Fv = { class: "vuefinder__toolbar__dropdown-section" }, Pv = { class: "vuefinder__toolbar__dropdown-label" }, Ev = { class: "vuefinder__toolbar__dropdown-options" }, Tv = { class: "vuefinder__toolbar__dropdown-option" }, Dv = { class: "vuefinder__toolbar__option-text" }, Mv = { class: "vuefinder__toolbar__dropdown-option" }, Iv = { class: "vuefinder__toolbar__option-text" }, Av = { class: "vuefinder__toolbar__dropdown-option" }, Ov = { class: "vuefinder__toolbar__option-text" }, Lv = { class: "vuefinder__toolbar__dropdown-toggle" }, Rv = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Bv = { class: "vuefinder__toolbar__dropdown-reset" }, zv = ["title"], Vv = ["title"], Uv = /* @__PURE__ */ re({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = le(), { enabled: t } = Ne(), { t: s } = e.i18n, i = e.fs, r = e.config, l = oe(r.state), d = oe(i.selectedItems), c = oe(i.sort), f = oe(i.filter);
    pe(
      () => l.value.fullScreen,
      () => {
        const h = document.querySelector("body");
        h && (h.style.overflow = l.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const m = M(!1), p = (h) => {
      h.target.closest(".vuefinder__toolbar__dropdown-container") || (m.value = !1);
    };
    we(() => {
      const h = document.querySelector("body");
      h && l.value.fullScreen && setTimeout(() => h.style.overflow = "hidden"), document.addEventListener("click", p);
    }), Ie(() => {
      document.removeEventListener("click", p);
    });
    const v = M({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: l.value.showHiddenFiles
      // Initialize with config store default
    });
    pe(
      () => v.value.sortBy,
      (h) => {
        if (!v.value.sortOrder) {
          i.clearSort();
          return;
        }
        h === "name" ? i.setSort("basename", v.value.sortOrder) : h === "size" ? i.setSort("file_size", v.value.sortOrder) : h === "modified" && i.setSort("last_modified", v.value.sortOrder);
      }
    ), pe(
      () => v.value.sortOrder,
      (h) => {
        if (!h) {
          i.clearSort();
          return;
        }
        v.value.sortBy === "name" ? i.setSort("basename", h) : v.value.sortBy === "size" ? i.setSort("file_size", h) : v.value.sortBy === "modified" && i.setSort("last_modified", h);
      }
    ), pe(
      c,
      (h) => {
        h.active ? (h.column === "basename" ? v.value.sortBy = "name" : h.column === "file_size" ? v.value.sortBy = "size" : h.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = h.order) : v.value.sortOrder = "";
      },
      { immediate: !0 }
    ), pe(
      () => v.value.filterKind,
      (h) => {
        i.setFilter(h, l.value.showHiddenFiles);
      }
    ), pe(
      () => v.value.showHidden,
      (h) => {
        r.set("showHiddenFiles", h), i.setFilter(v.value.filterKind, h);
      }
    ), pe(
      f,
      (h) => {
        v.value.filterKind = h.kind;
      },
      { immediate: !0 }
    ), pe(
      () => l.value.showHiddenFiles,
      (h) => {
        v.value.showHidden = h, i.setFilter(v.value.filterKind, h);
      },
      { immediate: !0 }
    );
    const k = () => r.set("view", l.value.view === "grid" ? "list" : "grid"), b = R(() => f.value.kind !== "all" || !l.value.showHiddenFiles || c.value.active), $ = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, r.set("showHiddenFiles", !0), i.clearSort(), i.clearFilter();
    };
    return (h, y) => ke(h.$slots, "toolbar-items", {}, () => [
      o("div", tv, [
        o("div", nv, [
          a(t)("newfolder") ? (u(), _("div", {
            key: 0,
            class: "mx-1.5",
            title: a(s)("New Folder"),
            onClick: y[0] || (y[0] = (g) => a(e).modal.open(cn, { items: a(d) }))
          }, [
            G(a(io))
          ], 8, ov)) : j("", !0),
          a(t)("newfile") ? (u(), _("div", {
            key: 1,
            class: "mx-1.5",
            title: a(s)("New File"),
            onClick: y[1] || (y[1] = (g) => a(e).modal.open(ro, { items: a(d) }))
          }, [
            G(a(lo))
          ], 8, sv)) : j("", !0),
          a(t)("rename") ? (u(), _("div", {
            key: 2,
            class: "mx-1.5",
            title: a(s)("Rename"),
            onClick: y[2] || (y[2] = (g) => a(d).length !== 1 || a(e).modal.open(Dt, { items: a(d) }))
          }, [
            G(a(Yn), {
              class: te(a(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, av)) : j("", !0),
          a(t)("delete") ? (u(), _("div", {
            key: 3,
            class: "mx-1.5",
            title: a(s)("Delete"),
            onClick: y[3] || (y[3] = (g) => !a(d).length || a(e).modal.open(Tt, { items: a(d) }))
          }, [
            G(a(Gn), {
              class: te(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, iv)) : j("", !0),
          a(t)("upload") ? (u(), _("div", {
            key: 4,
            class: "mx-1.5",
            title: a(s)("Upload"),
            onClick: y[4] || (y[4] = (g) => a(e).modal.open(un, { items: a(d) }))
          }, [
            G(a(co))
          ], 8, lv)) : j("", !0),
          a(t)("unarchive") && a(d).length === 1 && a(d)[0].mime_type === "application/zip" ? (u(), _("div", {
            key: 5,
            class: "mx-1.5",
            title: a(s)("Unarchive"),
            onClick: y[5] || (y[5] = (g) => !a(d).length || a(e).modal.open(vn, { items: a(d) }))
          }, [
            G(a(uo), {
              class: te(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, rv)) : j("", !0),
          a(t)("archive") ? (u(), _("div", {
            key: 6,
            class: "mx-1.5",
            title: a(s)("Archive"),
            onClick: y[6] || (y[6] = (g) => !a(d).length || a(e).modal.open(fn, { items: a(d) }))
          }, [
            G(a(vo), {
              class: te(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, dv)) : j("", !0)
        ]),
        o("div", cv, [
          a(t)("search") ? (u(), _("div", {
            key: 0,
            class: "mx-1.5",
            title: a(s)("Search Files"),
            onClick: y[7] || (y[7] = (g) => a(e).modal.open(dn))
          }, [
            G(a(rn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
          ], 8, uv)) : j("", !0),
          o("div", vv, [
            o("div", {
              title: a(s)("Filter"),
              class: "vuefinder__toolbar__dropdown-trigger",
              onClick: y[8] || (y[8] = (g) => m.value = !m.value)
            }, [
              o("div", _v, [
                G(a(ev), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
                b.value ? (u(), _("div", pv)) : j("", !0)
              ])
            ], 8, fv),
            m.value ? (u(), _("div", mv, [
              o("div", hv, [
                o("div", gv, [
                  o("div", yv, w(a(s)("Sorting")), 1),
                  o("div", wv, [
                    he(o("select", {
                      "onUpdate:modelValue": y[9] || (y[9] = (g) => v.value.sortBy = g),
                      class: "vuefinder__toolbar__dropdown-select"
                    }, [
                      o("option", bv, w(a(s)("Name")), 1),
                      o("option", kv, w(a(s)("Size")), 1),
                      o("option", $v, w(a(s)("Date")), 1)
                    ], 512), [
                      [Kt, v.value.sortBy]
                    ]),
                    he(o("select", {
                      "onUpdate:modelValue": y[10] || (y[10] = (g) => v.value.sortOrder = g),
                      class: "vuefinder__toolbar__dropdown-select"
                    }, [
                      o("option", xv, w(a(s)("None")), 1),
                      o("option", Sv, w(a(s)("Asc")), 1),
                      o("option", Cv, w(a(s)("Desc")), 1)
                    ], 512), [
                      [Kt, v.value.sortOrder]
                    ])
                  ])
                ]),
                o("div", Fv, [
                  o("div", Pv, w(a(s)("Show")), 1),
                  o("div", Ev, [
                    o("label", Tv, [
                      he(o("input", {
                        "onUpdate:modelValue": y[11] || (y[11] = (g) => v.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "all",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [zt, v.value.filterKind]
                      ]),
                      o("span", Dv, w(a(s)("All items")), 1)
                    ]),
                    o("label", Mv, [
                      he(o("input", {
                        "onUpdate:modelValue": y[12] || (y[12] = (g) => v.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "files",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [zt, v.value.filterKind]
                      ]),
                      o("span", Iv, w(a(s)("Files only")), 1)
                    ]),
                    o("label", Av, [
                      he(o("input", {
                        "onUpdate:modelValue": y[13] || (y[13] = (g) => v.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "folders",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [zt, v.value.filterKind]
                      ]),
                      o("span", Ov, w(a(s)("Folders only")), 1)
                    ])
                  ])
                ]),
                o("div", Lv, [
                  o("label", Rv, w(a(s)("Show hidden files")), 1),
                  he(o("input", {
                    id: "showHidden",
                    "onUpdate:modelValue": y[14] || (y[14] = (g) => v.value.showHidden = g),
                    type: "checkbox",
                    class: "vuefinder__toolbar__checkbox"
                  }, null, 512), [
                    [lt, v.value.showHidden]
                  ])
                ]),
                o("div", Bv, [
                  o("button", {
                    class: "vuefinder__toolbar__reset-button",
                    onClick: $
                  }, w(a(s)("Reset")), 1)
                ])
              ])
            ])) : j("", !0)
          ]),
          a(t)("fullscreen") ? (u(), _("div", {
            key: 1,
            class: "mx-1.5",
            title: a(s)("Toggle Full Screen"),
            onClick: y[15] || (y[15] = (g) => a(r).toggle("fullScreen"))
          }, [
            a(l).fullScreen ? (u(), X(a(Ku), {
              key: 0,
              class: "vf-toolbar-icon"
            })) : (u(), X(a(Nu), {
              key: 1,
              class: "vf-toolbar-icon"
            }))
          ], 8, zv)) : j("", !0),
          o("div", {
            class: "mx-1.5",
            title: a(s)("Change View"),
            onClick: y[16] || (y[16] = (g) => k())
          }, [
            a(l).view === "grid" ? (u(), X(a(Gu), {
              key: 0,
              class: "vf-toolbar-icon"
            })) : j("", !0),
            a(l).view === "list" ? (u(), X(a(Qu), {
              key: 1,
              class: "vf-toolbar-icon"
            })) : j("", !0)
          ], 8, Vv)
        ])
      ])
    ]);
  }
}), Nv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Hv(n, e) {
  return u(), _("svg", Nv, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const jv = { render: Hv }, Kv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function qv(n, e) {
  return u(), _("svg", Kv, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Wv = { render: qv }, Gv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Yv(n, e) {
  return u(), _("svg", Gv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Xv = { render: Yv }, Qv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Jv(n, e) {
  return u(), _("svg", Qv, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Zv = { render: Jv }, ef = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function tf(n, e) {
  return u(), _("svg", ef, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const nf = { render: tf };
function $t(n, e = []) {
  const t = "vfDragEnterCounter", s = n.fs, i = oe(s.selectedItems);
  function r(p, v) {
    return !!(!p || p.type !== "dir" || p.path === v || p.path.startsWith(`${v}/`) || i.value.some((b) => b.path === v ? !1 : !!(p.path === b.path || p.path.startsWith(`${b.path}/`))));
  }
  function l(p, v) {
    if (p.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      p.dataTransfer && (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none");
      return;
    }
    p.preventDefault();
    const b = s.getDraggedItem(), $ = s.sortedFiles.get().find((h) => $e(h) === b)?.path ?? "";
    r(v, $) ? p.dataTransfer && (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : (p.dataTransfer && (p.dataTransfer.dropEffect = "copy", p.dataTransfer.effectAllowed = "all"), p.currentTarget.classList.add(...e));
  }
  function d(p) {
    if (p.isExternalDrag || !(n.features?.move ?? !1))
      return;
    p.preventDefault();
    const k = p.currentTarget, b = Number(k.dataset[t] || 0);
    k.dataset[t] = String(b + 1);
  }
  function c(p) {
    if (p.isExternalDrag || !(n.features?.move ?? !1))
      return;
    p.preventDefault();
    const k = p.currentTarget, $ = Number(k.dataset[t] || 0) - 1;
    $ <= 0 ? (delete k.dataset[t], k.classList.remove(...e)) : k.dataset[t] = String($);
  }
  function f(p, v) {
    if (p.isExternalDrag || !(n.features?.move ?? !1) || !v) return;
    p.preventDefault();
    const b = p.currentTarget;
    delete b.dataset[t], b.classList.remove(...e);
    const $ = p.dataTransfer?.getData("items") || "[]", y = JSON.parse($).map((g) => s.sortedFiles.get().find((C) => $e(C) === g)).filter((g) => !!g);
    s.clearDraggedItem(), n.modal.open(it, { items: { from: y, to: v } });
  }
  function m(p) {
    return {
      dragover: (v) => l(v, p),
      dragenter: d,
      dragleave: c,
      drop: (v) => f(v, p)
    };
  }
  return { events: m };
}
function of() {
  const n = le(), e = Ve(n), t = n.fs, s = n.config, { t: i } = n.i18n, r = oe(t.path), l = () => {
    const p = t.path.get().path;
    n.adapter.invalidateListQuery(p), n.adapter.open(p);
  }, d = (p) => {
    n.adapter.open(p);
  };
  return {
    currentPath: r,
    refresh: l,
    goTo: d,
    goUp: () => {
      const p = t.path.get()?.breadcrumb ?? [], v = p[p.length - 2]?.path ?? `${t.path.get()?.storage ?? "local"}://`;
      d(v);
    },
    toggleTreeView: () => {
      s.toggle("showTreeView");
    },
    copyCurrentPath: async () => {
      await yt(t.path.get()?.path || ""), e.success(i("Path copied to clipboard"));
    }
  };
}
const sf = { class: "vuefinder__breadcrumb__container" }, af = ["title"], lf = ["title"], rf = ["title"], df = ["title"], cf = { class: "vuefinder__breadcrumb__path-container" }, uf = { class: "vuefinder__breadcrumb__list" }, vf = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, ff = { class: "relative" }, _f = ["title", "onClick"], pf = ["title"], mf = { class: "vuefinder__breadcrumb__path-mode" }, hf = { class: "vuefinder__breadcrumb__path-mode-content" }, gf = ["title"], yf = { class: "vuefinder__breadcrumb__path-text" }, wf = ["title"], bf = ["data-theme"], kf = ["onClick"], $f = { class: "vuefinder__breadcrumb__hidden-item-content" }, xf = { class: "vuefinder__breadcrumb__hidden-item-text" }, ct = 5, Tn = 1, Sf = 40, Cf = /* @__PURE__ */ re({
  __name: "Breadcrumb",
  setup(n) {
    const e = le(), t = of(), { t: s } = e.i18n, i = e.fs, r = e.config, l = oe(r.state), d = oe(i.path), c = oe(i.loading), f = M(null), m = to(0, 100), p = M(5), v = M(!1), k = M(!1), b = R(() => d.value?.breadcrumb ?? []), $ = /* @__PURE__ */ new Map();
    function h(F, V) {
      return F.length > V ? [F.slice(-V), F.slice(0, -V)] : [F, []];
    }
    const y = R(
      () => h(b.value, p.value)[0]
    ), g = R(
      () => h(b.value, p.value)[1]
    );
    function C() {
      const F = b.value, V = m.value;
      if (!F.length || V <= 0) return null;
      let A = 0, O = 0;
      for (let H = F.length - 1; H >= 0; H--) {
        const E = F[H]?.name;
        if (!E) continue;
        const N = $.get(E);
        if (N === void 0) return null;
        if (A + N > V - Sf || (A += N, O++, O >= ct)) break;
      }
      return O < Tn && (O = Tn), O > ct && (O = ct), O;
    }
    function S() {
      if (!f.value) return;
      const F = f.value.children, V = y.value;
      for (let A = 0; A < F.length; A++) {
        const O = V[A]?.name;
        if (!O) continue;
        const H = F[A].offsetWidth;
        H > 0 && $.set(O, H);
      }
    }
    async function I() {
      if (!b.value.length) {
        p.value = ct;
        return;
      }
      const F = C();
      if (F !== null) {
        p.value = F;
        return;
      }
      p.value = ct, await Ae(), S();
      const V = C();
      V !== null && (p.value = V);
    }
    pe(m, I), pe(b, I, { immediate: !0 });
    const T = () => {
      f.value && (m.value = f.value.offsetWidth);
    }, L = M(null);
    we(() => {
      L.value = new ResizeObserver(T), f.value && L.value.observe(f.value);
    }), Ie(() => {
      L.value && L.value.disconnect();
    });
    const q = $t(e, ["vuefinder__drag-over"]);
    function Z(F = null) {
      F ??= b.value.length - 2;
      const V = {
        basename: d.value?.storage ?? "local",
        extension: "",
        path: (d.value?.storage ?? "local") + "://",
        storage: d.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return b.value[F] ?? V;
    }
    const ee = () => {
      t.refresh();
    }, Q = () => {
      y.value.length > 0 && t.goUp();
    }, W = (F) => {
      e.adapter.open(F.path), v.value = !1;
    }, P = () => {
      v.value && (v.value = !1);
    }, D = {
      mounted(F, V) {
        F.clickOutsideEvent = function(A) {
          F === A.target || F.contains(A.target) || V.value();
        }, document.body.addEventListener("click", F.clickOutsideEvent);
      },
      beforeUnmount(F) {
        document.body.removeEventListener("click", F.clickOutsideEvent);
      }
    }, U = () => {
      t.toggleTreeView();
    }, Y = M({
      x: 0,
      y: 0
    }), ue = (F, V = null) => {
      if (F.currentTarget instanceof HTMLElement) {
        const { x: A, y: O, height: H } = F.currentTarget.getBoundingClientRect();
        Y.value = { x: A, y: O + H };
      }
      v.value = V ?? !v.value;
    }, B = () => {
      k.value = !k.value;
    }, x = async () => {
      await t.copyCurrentPath();
    }, z = () => {
      k.value = !1;
    };
    return (F, V) => (u(), _("div", sf, [
      ke(F.$slots, "breadcrumb-actions", {}, () => [
        o("span", {
          title: a(s)("Toggle Tree View")
        }, [
          G(a(Zv), {
            class: te(["vuefinder__breadcrumb__toggle-tree", a(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
            onClick: U
          }, null, 8, ["class"])
        ], 8, af),
        o("span", {
          title: a(s)("Go up a directory")
        }, [
          G(a(fo), qe({
            class: b.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
          }, Ze(b.value.length ? a(q).events(Z()) : {}), { onClick: Q }), null, 16, ["class"])
        ], 8, lf),
        a(i).isLoading() ? (u(), _("span", {
          key: 1,
          title: a(s)("Cancel")
        }, [
          G(a(Xn), {
            onClick: V[0] || (V[0] = (A) => a(e).emitter.emit("vf-fetch-abort"))
          })
        ], 8, df)) : (u(), _("span", {
          key: 0,
          title: a(s)("Refresh")
        }, [
          G(a(jv), { onClick: ee })
        ], 8, rf))
      ]),
      he(o("div", cf, [
        o("div", null, [
          G(a(Wv), qe({ class: "vuefinder__breadcrumb__home-icon" }, Ze(a(q).events(Z(-1))), {
            onClick: V[1] || (V[1] = _e((A) => a(e).adapter.open(a(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", uf, [
          g.value.length ? he((u(), _("div", vf, [
            V[3] || (V[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", ff, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: V[2] || (V[2] = (A) => ue(A, !0)),
                onClick: _e(ue, ["stop"])
              }, [
                G(a(so), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [D, P]
          ]) : j("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: f,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), _(fe, null, ge(y.value, (A, O) => (u(), _("div", { key: O }, [
            V[4] || (V[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", qe({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: A.basename
            }, Ze(a(q).events(A), !0), {
              onClick: _e((H) => a(e).adapter.open(A.path), ["stop"])
            }), w(A.name), 17, _f)
          ]))), 128))
        ], 512),
        a(r).get("loadingIndicator") === "circular" && a(c) ? (u(), X(a(Ot), { key: 0 })) : j("", !0),
        o("span", {
          title: a(s)("Toggle Path Copy Mode"),
          onClick: B
        }, [
          G(a(nf), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, pf)
      ], 512), [
        [Ge, !k.value]
      ]),
      he(o("div", mf, [
        o("div", hf, [
          o("div", {
            title: a(s)("Copy Path")
          }, [
            G(a(sn), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: x
            })
          ], 8, gf),
          o("div", yf, w(a(d).path), 1),
          o("div", {
            title: a(s)("Exit")
          }, [
            G(a(Xv), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: z
            })
          ], 8, wf)
        ])
      ], 512), [
        [Ge, k.value]
      ]),
      (u(), X(bt, { to: "body" }, [
        o("div", null, [
          he(o("div", {
            style: Me({
              position: "absolute",
              top: Y.value.y + "px",
              left: Y.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a(e).theme.current
          }, [
            (u(!0), _(fe, null, ge(g.value, (A, O) => (u(), _("div", qe({
              key: O,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Ze(a(q).events(A), !0), {
              onClick: (H) => W(A)
            }), [
              o("div", $f, [
                o("span", null, [
                  G(a(ze), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", xf, w(A.name), 1)
              ])
            ], 16, kf))), 128))
          ], 12, bf), [
            [Ge, v.value]
          ])
        ])
      ]))
    ]));
  }
}), Ff = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Pf(n, e) {
  return u(), _("svg", Ff, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Dn = { render: Pf }, Ef = { class: "vuefinder__drag-item__container" }, Tf = { class: "vuefinder__drag-item__count" }, Df = /* @__PURE__ */ re({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, s) => (u(), _("div", Ef, [
      e.count > 1 ? (u(), X(a(Dn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : j("", !0),
      G(a(Dn), { class: "vuefinder__drag-item__icon" }),
      o("div", Tf, w(e.count), 1)
    ]));
  }
}), Mf = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Mn = /* @__PURE__ */ re({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = le(), s = oe(t.config.state), i = R(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), r = R(() => {
      const d = i.value, c = s.value?.listIconSize, f = s.value?.gridIconSize;
      return s.value?.gridItemWidth, s.value?.gridItemHeight, e.view === "list" || d === "small" ? {
        "--vf-icon-size": `${c ?? 16}px`
      } : {
        "--vf-icon-size": `${f ?? 48}px`
      };
    }), l = {
      app: t,
      config: s.value,
      item: e.item,
      view: e.view
    };
    return (d, c) => (u(), _("div", {
      class: te(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": i.value === "small",
        "vuefinder__item-icon--large": i.value === "large",
        "vuefinder__item-icon--grid": n.view === "grid",
        "vuefinder__item-icon--list": n.view === "list"
      }]),
      style: Me(r.value)
    }, [
      ke(d.$slots, "icon", Pe(Ee(l)), () => [
        n.item.type === "dir" ? (u(), X(a(ze), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), X(a(ht), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (u(), _("div", Mf, w(n.item.extension.substring(0, 3)), 1)) : j("", !0)
      ])
    ], 6));
  }
}), If = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Af(n, e) {
  return u(), _("svg", If, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const In = { render: Af }, Of = ["data-key", "data-row", "data-col", "draggable"], Lf = { key: 0 }, Rf = { class: "vuefinder__explorer__item-grid-content" }, Bf = ["data-src", "alt"], zf = { class: "vuefinder__explorer__item-title" }, Vf = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Uf = { class: "vuefinder__explorer__item-list-name" }, Nf = { class: "vuefinder__explorer__item-list-icon" }, Hf = { class: "vuefinder__explorer__item-name" }, jf = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Kf = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, qf = { key: 0 }, Wf = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, Gf = /* @__PURE__ */ re({
  __name: "FileItem",
  props: {
    item: {},
    view: {},
    showThumbnails: { type: Boolean },
    isSelected: { type: Boolean },
    isDragging: { type: Boolean },
    rowIndex: {},
    colIndex: {},
    showPath: { type: Boolean },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = le(), r = i.fs, l = i.config, d = R(() => {
      const W = i.selectionFilterType;
      return !W || W === "both" ? !0 : W === "files" && t.item.type === "file" || W === "dirs" && t.item.type === "dir";
    }), c = R(() => {
      const W = i.selectionFilterMimeIncludes;
      return !W || !W.length || t.item.type === "dir" ? !0 : t.item.mime_type ? W.some((P) => t.item.mime_type?.startsWith(P)) : !1;
    }), f = R(() => d.value && c.value), m = R(() => t.item.type === "dir" || f.value), p = R(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      // Disabled appearance: only for items the user cannot interact with at all.
      m.value ? "" : "vf-explorer-item--unselectable",
      // Excluded from rectangle selection but otherwise interactive (e.g. a
      // folder while selectionFilterType is 'files' — user can still navigate).
      m.value && !f.value ? "vf-explorer-item--no-select" : ""
    ]), v = R(() => ({
      opacity: t.isDragging || r.isCut($e(t.item)) || !m.value ? 0.5 : ""
    })), k = M(null);
    let b = !1, $ = null, h = null, y = !1;
    const { enabled: g } = Ne(), C = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), S = R(() => C ? !1 : g("move")), I = () => {
      $ && (clearTimeout($), $ = null), h = null;
    }, T = (W) => {
      I(), h = W, y = !1, W.stopPropagation(), $ = setTimeout(() => {
        !h || $ === null || (y = !0, h.cancelable && h.preventDefault(), h.stopPropagation(), s("contextmenu", h), I());
      }, 500);
    }, L = (W) => {
      if (y) {
        W.preventDefault(), W.stopPropagation(), I();
        return;
      }
      setTimeout(() => {
        y || (I(), Q(W));
      }, 100);
    }, q = (W) => {
      if (!h) return;
      const P = h.touches[0] || h.changedTouches[0], D = W.touches[0] || W.changedTouches[0];
      if (P && D) {
        const U = Math.abs(D.clientX - P.clientX), Y = Math.abs(D.clientY - P.clientY);
        (U > 15 || Y > 15) && I();
      }
    }, Z = (W) => {
      C && W.type !== "click" || s("click", W);
    }, ee = (W) => {
      if (y)
        return W.preventDefault(), W.stopPropagation(), !1;
      s("dragstart", W);
    }, Q = (W) => {
      if (!b)
        b = !0, s("click", W), k.value = setTimeout(() => {
          b = !1;
        }, 300);
      else
        return b = !1, s("dblclick", W), !1;
    };
    return (W, P) => (u(), _("div", {
      class: te(p.value),
      style: Me(v.value),
      "data-key": a($e)(n.item),
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: S.value,
      onTouchstartCapture: P[1] || (P[1] = (D) => T(D)),
      onTouchendCapture: P[2] || (P[2] = (D) => L(D)),
      onTouchmoveCapture: q,
      onTouchcancelCapture: P[3] || (P[3] = () => I()),
      onClick: Z,
      onDblclick: P[4] || (P[4] = (D) => s("dblclick", D)),
      onContextmenu: P[5] || (P[5] = _e((D) => s("contextmenu", D), ["prevent", "stop"])),
      onDragstart: ee,
      onDragend: P[6] || (P[6] = (D) => s("dragend", D))
    }, [
      n.view === "grid" ? (u(), _("div", Lf, [
        a(r).isReadOnly(n.item) ? (u(), X(a(In), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : j("", !0),
        o("div", Rf, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (u(), _("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? a(i).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: P[0] || (P[0] = (D) => D.preventDefault())
          }, null, 40, Bf)) : (u(), X(Mn, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: ie((D) => [
              ke(W.$slots, "icon", Pe(Ee(D)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        o("span", zf, w(a(Yt)(n.item.basename)), 1)
      ])) : (u(), _("div", Vf, [
        o("div", Uf, [
          o("div", Nf, [
            G(Mn, {
              item: n.item,
              view: n.view
            }, {
              icon: ie((D) => [
                ke(W.$slots, "icon", Pe(Ee(D)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          o("span", Hf, w(n.item.basename), 1),
          o("div", null, [
            a(r).isReadOnly(n.item) ? (u(), X(a(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : j("", !0)
          ])
        ]),
        n.showPath ? (u(), _("div", jf, w(n.item.path), 1)) : j("", !0),
        n.showPath ? j("", !0) : (u(), _("div", Kf, [
          n.item.file_size ? (u(), _("div", qf, w(a(i).filesize(n.item.file_size)), 1)) : j("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (u(), _("div", Wf, w(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : j("", !0)
      ])),
      a(g)("pinned") && a(l).get("pinnedFolders").find((D) => D.path === n.item.path) ? (u(), X(a(gt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : j("", !0)
    ], 46, Of));
  }
}), Yf = ["data-row"], An = /* @__PURE__ */ re({
  __name: "FileRow",
  props: {
    rowIndex: {},
    rowHeight: {},
    view: {},
    itemsPerRow: {},
    items: {},
    showThumbnails: { type: Boolean },
    showPath: { type: Boolean },
    isDraggingItem: { type: Function },
    isSelected: { type: Function },
    dragNDropEvents: { type: Function },
    explorerId: {}
  },
  emits: ["click", "dblclick", "contextmenu", "dragstart", "dragend"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = R(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), r = R(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), l = R(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (d, c) => (u(), _("div", {
      class: te(i.value),
      "data-row": n.rowIndex,
      style: Me(r.value)
    }, [
      o("div", {
        class: te(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Me(l.value)
      }, [
        (u(!0), _(fe, null, ge(n.items, (f, m) => (u(), X(Gf, qe({
          key: a($e)(f),
          item: f,
          view: n.view,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(a($e)(f)),
          "is-dragging": n.isDraggingItem(a($e)(f)),
          "row-index": n.rowIndex,
          "col-index": m,
          "explorer-id": n.explorerId
        }, Ze(n.dragNDropEvents(f)), {
          onClick: c[0] || (c[0] = (p) => s("click", p)),
          onDblclick: c[1] || (c[1] = (p) => s("dblclick", p)),
          onContextmenu: c[2] || (c[2] = (p) => s("contextmenu", p)),
          onDragstart: c[3] || (c[3] = (p) => s("dragstart", p)),
          onDragend: c[4] || (c[4] = (p) => s("dragend", p))
        }), {
          icon: ie((p) => [
            ke(d.$slots, "icon", qe({ ref_for: !0 }, p))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Yf));
  }
}), Xf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Qf(n, e) {
  return u(), _("svg", Xf, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Jf = { render: Qf }, Zf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function e_(n, e) {
  return u(), _("svg", Zf, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const t_ = { render: e_ }, jt = /* @__PURE__ */ re({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (u(), _("div", null, [
      n.direction === "asc" ? (u(), X(a(Jf), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : j("", !0),
      n.direction === "desc" ? (u(), X(a(t_), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : j("", !0)
    ]));
  }
}), n_ = { class: "vuefinder__explorer__header" }, o_ = /* @__PURE__ */ re({
  __name: "ExplorerHeader",
  setup(n) {
    const e = le(), t = e.fs, { t: s } = e.i18n, i = oe(t.sort);
    return (r, l) => (u(), _("div", n_, [
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: l[0] || (l[0] = (d) => a(t).toggleSort("basename"))
      }, [
        ye(w(a(s)("Name")) + " ", 1),
        he(G(jt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "basename"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: l[1] || (l[1] = (d) => a(t).toggleSort("file_size"))
      }, [
        ye(w(a(s)("Size")) + " ", 1),
        he(G(jt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "file_size"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: l[2] || (l[2] = (d) => a(t).toggleSort("last_modified"))
      }, [
        ye(w(a(s)("Date")) + " ", 1),
        he(G(jt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function s_(n, e) {
  const {
    scrollContainer: t,
    itemWidth: s = 100,
    rowHeight: i,
    overscan: r = 2,
    containerPadding: l = 48,
    lockItemsPerRow: d
  } = e, c = n, f = () => typeof i == "number" ? i : i.value, m = () => s ? typeof s == "number" ? s : s.value : 100, p = () => l ? typeof l == "number" ? l : l.value : 0, v = M(0), k = M(6), b = M(600);
  let $ = null;
  const h = R(() => Math.ceil(c.value.length / k.value)), y = R(() => h.value * f()), g = R(() => {
    const Q = f(), W = Math.max(0, Math.floor(v.value / Q) - r), P = Math.min(
      h.value,
      Math.ceil((v.value + b.value) / Q) + r
    );
    return { start: W, end: P };
  }), C = R(() => {
    const { start: Q, end: W } = g.value;
    return Array.from({ length: W - Q }, (P, D) => Q + D);
  }), S = () => b.value, I = () => typeof d == "object" ? d.value : !1, T = () => {
    if (I()) {
      k.value = 1;
      return;
    }
    if (t.value) {
      const Q = p(), W = t.value.clientWidth - Q, P = m();
      P > 0 && (k.value = Math.max(Math.floor(W / P), 2));
    }
  }, L = (Q) => {
    const W = Q.target;
    v.value = W.scrollTop;
  };
  pe(
    () => c.value.length,
    () => {
      T();
    }
  ), s && typeof s != "number" && pe(s, () => {
    T();
  }), l && typeof l != "number" && pe(l, () => {
    T();
  }), i && typeof i != "number" && pe(i, () => {
  });
  const q = (Q, W) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const P = W * k.value;
    return Q.slice(P, P + k.value);
  }, Z = (Q, W, P, D, U) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const Y = [];
    for (let ue = W; ue <= P; ue++)
      for (let B = D; B <= U; B++) {
        const x = ue * k.value + B;
        x < Q.length && Q[x] && Y.push(Q[x]);
      }
    return Y;
  }, ee = (Q) => ({
    row: Math.floor(Q / k.value),
    col: Q % k.value
  });
  return we(async () => {
    await Ae(), t.value && (b.value = t.value.clientHeight || 600), T(), window.addEventListener("resize", () => {
      t.value && (b.value = t.value.clientHeight || 600), T();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((Q) => {
      const W = Q[0];
      W && (b.value = Math.round(W.contentRect.height)), T();
    }), $.observe(t.value));
  }), Ie(() => {
    window.removeEventListener("resize", T), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: v,
    itemsPerRow: k,
    totalRows: h,
    totalHeight: y,
    visibleRange: g,
    visibleRows: C,
    updateItemsPerRow: T,
    handleScroll: L,
    getRowItems: q,
    getItemsInRange: Z,
    getItemPosition: ee,
    getContainerHeight: S
  };
}
function a_(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: s,
    getKey: i,
    selectionObject: r,
    rowHeight: l,
    itemWidth: d,
    osInstance: c
  } = n, f = () => typeof d == "number" ? d : d.value, m = Math.floor(Math.random() * 2 ** 32).toString(), p = le(), v = p.fs, k = oe(v.selectedKeys), b = oe(v.sortedFiles), $ = R(() => {
    const B = /* @__PURE__ */ new Map();
    return b.value && b.value.forEach((x) => {
      B.set(i(x), x);
    }), B;
  }), h = M(/* @__PURE__ */ new Set()), y = M(!1), g = M(!1), C = (B) => B.map((x) => x.getAttribute("data-key")).filter((x) => !!x), S = (B) => {
    B.selection.clearSelection(!0, !0);
  }, I = (B) => {
    if (k.value && k.value.size > 0) {
      const x = document.querySelectorAll(`.file-item-${m}[data-key]`), z = /* @__PURE__ */ new Map();
      x.forEach((V) => {
        const A = V.getAttribute("data-key");
        A && z.set(A, V);
      });
      const F = [];
      k.value.forEach((V) => {
        const A = z.get(V);
        A && T(V) && F.push(A);
      }), F.forEach((V) => {
        B.selection.select(V, !0);
      });
    }
  }, T = (B) => {
    const x = $.value.get(B);
    if (!x) return !1;
    const z = p.selectionFilterType, F = p.selectionFilterMimeIncludes;
    return z === "files" && x.type === "dir" || z === "dirs" && x.type === "file" ? !1 : F && Array.isArray(F) && F.length > 0 ? x.type === "dir" ? !0 : x.mime_type ? F.some((V) => x.mime_type?.startsWith(V)) : !1 : !0;
  }, L = (B) => {
    if (p.selectionMode === "single")
      return !1;
    y.value = !1, !B.event?.metaKey && !B.event?.ctrlKey && (g.value = !0), B.selection.resolveSelectables(), S(B), I(B);
  }, q = M(0), Z = ({ event: B, selection: x }) => {
    q.value = (r.value?.getAreaLocation().y1 ?? 0) - (p.root.getBoundingClientRect().top ?? 0);
    const z = document.querySelector(
      ".selection-area-container"
    );
    if (z && (z.dataset.theme = p.theme.current), p.selectionMode === "single")
      return;
    const F = B;
    F && "type" in F && F.type === "touchend" && F.preventDefault();
    const V = B;
    !V?.ctrlKey && !V?.metaKey && (v.clearSelection(), x.clearSelection(!0, !0)), h.value.clear();
  }, ee = (B) => {
    if (p.selectionMode === "single")
      return;
    const x = C(B.store.changed.added), z = C(B.store.changed.removed);
    g.value = !1, y.value = !0, x.forEach((F) => {
      k.value && !k.value.has(F) && T(F) && (h.value.add(F), v.select(F, p.selectionMode || "multiple"));
    }), z.forEach((F) => {
      document.querySelector(`[data-key="${F}"]`) && $.value.has(F) && h.value.delete(F), v.deselect(F);
    }), B.selection.resolveSelectables(), I(B);
  }, Q = () => {
    h.value.clear();
  }, W = (B) => {
    if (!B.event)
      return;
    const x = document.querySelector(".scroller-" + m);
    if (!x)
      return;
    const z = x.getBoundingClientRect(), F = z.left, V = z.top;
    let A = x.scrollTop;
    if (c?.value) {
      const { viewport: Xe } = c.value.elements();
      Xe && (A = Xe.scrollTop);
    }
    const O = r.value?.getAreaLocation();
    if (!O)
      return;
    const H = Math.min(O.x1, O.x2), E = A + Math.min(O.y1, O.y2), N = Math.max(O.x1, O.x2), ce = A + Math.max(O.y1, O.y2), me = 4, K = f();
    let se = Math.floor((H - F - me) / K), ve = Math.floor((N - F - me) / K);
    const be = H - F - me - se * K, Oe = N - F - me - ve * K;
    be > K - me && (se = se + 1), Oe < me && (ve = ve - 1);
    const tt = Math.max(0, se), J = Math.min(e.value - 1, ve);
    let ne = Math.floor((E - V - me) / l.value), ae = Math.floor((ce - V - me) / l.value);
    const de = E - V - me - ne * l.value, He = ce - V - me - ae * l.value, De = Math.floor((t.value - me) / l.value);
    de > l.value - me && (ne = ne + 1), He < me && (ae = ae - 1);
    const Ce = Math.max(0, ne), Ye = Math.min(ae, De), Le = s(
      b.value,
      Ce,
      Ye,
      tt,
      J
    ), Rt = document.querySelectorAll(`.file-item-${m}[data-key]`), hn = /* @__PURE__ */ new Map();
    Rt.forEach((Xe) => {
      const rt = Xe.getAttribute("data-key");
      rt && hn.set(rt, Xe);
    });
    const Bt = [];
    if (Le.forEach((Xe) => {
      const rt = i(Xe);
      hn.get(rt) || Bt.push(rt);
    }), Bt.length > 0) {
      const Xe = p.selectionMode || "multiple";
      v.selectMultiple(Bt, Xe);
    }
  }, P = (B) => {
    W(B), S(B), I(B), v.setSelectedCount(k.value?.size || 0), y.value = !1;
  }, D = () => {
    let B = [".scroller-" + m];
    if (c?.value) {
      const { viewport: x } = c.value.elements();
      x && (B = x);
    }
    r.value = new Io({
      selectables: [
        ".file-item-" + m + ":not(.vf-explorer-item--unselectable):not(.vf-explorer-item--no-select)"
      ],
      boundaries: B,
      selectionContainerClass: "selection-area-container",
      behaviour: {
        overlap: "invert",
        intersect: "touch",
        startThreshold: 0,
        triggers: [0],
        scrolling: {
          speedDivider: 10,
          manualSpeed: 750,
          startScrollMargins: { x: 0, y: 10 }
        }
      },
      features: {
        touch: !0,
        range: !0,
        deselectOnBlur: !0,
        singleTap: {
          allow: !1,
          intersect: "native"
        }
      }
    }), r.value.on("beforestart", L), r.value.on("start", Z), r.value.on("move", ee), r.value.on("stop", P);
  }, U = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, Y = () => {
    r.value && (Array.from(
      k.value ?? /* @__PURE__ */ new Set()
    ).forEach((x) => {
      T(x) || v.deselect(x);
    }), U(), D());
  }, ue = (B) => {
    g.value && (r.value?.clearSelection(), Q(), g.value = !1);
    const x = B;
    !h.value.size && !g.value && !x?.ctrlKey && !x?.metaKey && (v.clearSelection(), r.value?.clearSelection());
  };
  return we(() => {
    const B = (x) => {
      !x.buttons && y.value && (y.value = !1);
    };
    document.addEventListener("dragleave", B), Ie(() => {
      document.removeEventListener("dragleave", B);
    });
  }), {
    explorerId: m,
    isDragging: y,
    initializeSelectionArea: D,
    updateSelectionArea: Y,
    handleContentClick: ue
  };
}
function i_(n) {
  const e = (s) => {
    if (!s)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const i = n.selectionFilterType, r = n.selectionFilterMimeIncludes, l = !i || i === "both" || i === "files" && s.type === "file" || i === "dirs" && s.type === "dir";
    let d = !0;
    return r && Array.isArray(r) && r.length > 0 && (s.type === "dir" ? d = !0 : s.mime_type ? d = r.some((c) => s.mime_type.startsWith(c)) : d = !1), { typeAllowed: l, mimeAllowed: d };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (s) => {
      const { typeAllowed: i, mimeAllowed: r } = e(s);
      return i && r;
    }
  };
}
function l_(n) {
  const e = (s) => ({
    item: s,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (s, i, r) => {
      const l = e(s);
      if (s.type === "file" && i) {
        if (n.emitter.emit("vf-file-dclick", l), l.defaultPrevented) return;
      } else if (s.type === "dir" && r && (n.emitter.emit("vf-folder-dclick", l), l.defaultPrevented))
        return;
      const d = n.contextMenuItems?.find((c) => c.show(n, {
        items: [s],
        target: s,
        searchQuery: ""
      }));
      d && d.action(n, [s]);
    }
  };
}
function r_(n, e, t, s, i, r, l) {
  const d = n.fs, { canSelectItem: c } = i_(n), { openItem: f } = l_(n), m = (h) => {
    const y = h.target?.closest(".file-item-" + e);
    if (!y) return null;
    const g = String(y.getAttribute("data-key")), C = t.value?.find((S) => $e(S) === g);
    return { key: g, item: C };
  }, p = () => {
    const h = s.value;
    return t.value?.filter((y) => h?.has($e(y))) || [];
  };
  return {
    handleItemClick: (h) => {
      const y = m(h);
      if (!y) return;
      const { key: g, item: C } = y, S = h;
      if (!c(C)) {
        C?.type === "dir" && (d.clearSelection(), i.value?.clearSelection(!0, !0), d.setSelectedCount(0));
        return;
      }
      const I = n.selectionMode || "multiple";
      !S?.ctrlKey && !S?.metaKey && (h.type !== "touchstart" || !d.isSelected(g)) && (d.clearSelection(), i.value?.clearSelection(!0, !0)), i.value?.resolveSelectables(), h.type === "touchstart" && d.isSelected(g) ? d.select(g, I) : d.toggleSelect(g, I), d.setSelectedCount(s.value?.size || 0);
    },
    handleItemDblClick: (h) => {
      const y = m(h);
      if (!y) return;
      const { item: g } = y;
      g && (g.type === "file" && !c(g) || f(g, r, l));
    },
    handleItemContextMenu: (h) => {
      h.preventDefault(), h.stopPropagation();
      const y = m(h);
      if (!y) return;
      const { key: g, item: C } = y;
      c(C) && (s.value?.has(g) || (d.clearSelection(), d.select(g)), n.emitter.emit("vf-contextmenu-show", {
        event: h,
        items: p(),
        target: C
      }));
    },
    handleContentContextMenu: (h) => {
      h.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: h, items: p() });
    },
    getSelectedItems: p
  };
}
function d_(n, e) {
  const t = M(null);
  return we(() => {
    if (ft.plugin([Mo]), n.value) {
      const s = ft(
        n.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (i) => {
            t.value = i;
            const { viewport: r } = i.elements();
            r && r.addEventListener("scroll", e);
          },
          updated: (i) => {
            const { viewport: r } = i.elements();
          }
        }
      );
      t.value = s;
    }
  }), Ie(() => {
    if (t.value) {
      const { viewport: s } = t.value.elements();
      s && s.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
const c_ = 4, u_ = 600;
function v_(n, e) {
  const t = M(null), s = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  return we(() => {
    n.value && (t.value = new qt({
      elements_selector: ".lazy",
      container: n.value,
      // Put the placeholder back so the browser doesn't show a broken-image
      // icon (the "?" thumbnail) while we retry.
      restore_on_error: !0,
      callback_error: (r, l) => {
        const d = (s.get(r) ?? 0) + 1;
        if (d > c_) return;
        s.set(r, d);
        const c = u_ * 2 ** (d - 1) + Math.random() * 250, f = i.get(r);
        f && clearTimeout(f), i.set(
          r,
          setTimeout(() => {
            r.isConnected && (qt.resetStatus(r), l.update());
          }, c)
        );
      }
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), ko(() => {
    t.value && t.value.update();
  }), Ie(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const f_ = { class: "vuefinder__explorer__container" }, __ = {
  key: 0,
  class: "vuefinder__linear-loader"
}, p_ = /* @__PURE__ */ re({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = le(), s = $t(t, ["vuefinder__drag-over"]), i = st("dragImage"), r = vt(null), l = st("scrollContainer"), d = st("scrollContent"), c = t.fs, f = t.config, m = oe(f.state), p = oe(c.sortedFiles), v = oe(c.selectedKeys), k = oe(c.loading), b = (K) => v.value?.has(K) ?? !1, $ = R(() => {
      if (m.value?.view === "grid") {
        const be = m.value?.gridItemHeight ?? 80, Oe = m.value?.gridItemGap ?? 8;
        return be + Oe * 2;
      }
      const se = m.value?.listItemHeight ?? 32, ve = m.value?.listItemGap ?? 2;
      return se + ve * 2;
    }), h = R(() => {
      if (m.value?.view === "grid") {
        const se = m.value?.gridItemWidth ?? 96, ve = m.value?.gridItemGap ?? 8;
        return se + ve * 2;
      }
      return 104;
    }), y = R(() => m.value?.view === "grid" ? (m.value?.gridItemGap ?? 8) * 2 : 0), { t: g } = t.i18n, {
      itemsPerRow: C,
      totalHeight: S,
      visibleRows: I,
      handleScroll: T,
      getRowItems: L,
      getItemsInRange: q,
      updateItemsPerRow: Z
    } = s_(
      R(() => p.value ?? []),
      {
        scrollContainer: l,
        itemWidth: h,
        rowHeight: $,
        overscan: 2,
        containerPadding: y,
        lockItemsPerRow: R(() => m.value.view === "list")
      }
    ), { osInstance: ee } = d_(l, T), { explorerId: Q, isDragging: W, initializeSelectionArea: P, updateSelectionArea: D, handleContentClick: U } = a_({
      itemsPerRow: C,
      totalHeight: S,
      getItemsInRange: q,
      getKey: (K) => $e(K),
      selectionObject: r,
      rowHeight: $,
      itemWidth: h,
      osInstance: ee
    }), Y = M(null), ue = (K) => {
      if (!K || !Y.value) return !1;
      const se = v.value?.has(Y.value) ?? !1;
      return W.value && (se ? v.value?.has(K) ?? !1 : K === Y.value);
    };
    pe(
      () => f.get("view"),
      (K) => {
        K === "list" ? C.value = 1 : Z();
      },
      { immediate: !0 }
    ), pe(C, (K) => {
      f.get("view") === "list" && K !== 1 && (C.value = 1);
    });
    const B = (K) => p.value?.[K];
    v_(l, t);
    const { handleItemClick: x, handleItemDblClick: z, handleItemContextMenu: F, handleContentContextMenu: V } = r_(
      t,
      Q,
      p,
      v,
      r,
      e.onFileDclick,
      e.onFolderDclick
    );
    we(() => {
      const K = () => {
        r.value || P(), r.value && r.value.on("beforestart", ({ event: se }) => {
          const ve = se?.target === d.value;
          if (!se?.metaKey && !se?.ctrlKey && !se?.altKey && !ve)
            return !1;
        });
      };
      if (ee.value)
        K();
      else {
        const se = setInterval(() => {
          ee.value && (clearInterval(se), K());
        }, 50);
        setTimeout(() => {
          clearInterval(se), r.value || K();
        }, 500);
      }
      pe(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], D, {
        deep: !0
      });
    });
    const A = (K) => {
      if (!(t.features?.move ?? !1) || K.altKey || K.ctrlKey || K.metaKey)
        return K.preventDefault(), !1;
      W.value = !0;
      const ve = K.target?.closest(
        ".file-item-" + Q
      );
      if (Y.value = ve ? String(ve.dataset.key) : null, K.dataTransfer && Y.value) {
        K.dataTransfer.setDragImage(i.value, 0, 15), K.dataTransfer.effectAllowed = "all", K.dataTransfer.dropEffect = "copy";
        const be = v.value?.has(Y.value) ? Array.from(v.value) : [Y.value];
        K.dataTransfer.setData("items", JSON.stringify(be)), c.setDraggedItem(Y.value);
      }
    }, O = () => {
      Y.value = null;
    };
    let H = null, E = null;
    const N = (K) => {
      K.target?.closest(".file-item-" + Q) || (E = K, H && clearTimeout(H), H = setTimeout(() => {
        E && (E.cancelable && E.preventDefault(), E.stopPropagation(), V(E)), E = null, H = null;
      }, 500));
    }, ce = (K) => {
      H && (clearTimeout(H), H = null), E = null;
    }, me = (K) => {
      if (!E) return;
      const se = E.touches[0] || E.changedTouches[0], ve = K.touches[0] || K.changedTouches[0];
      if (se && ve) {
        const be = Math.abs(ve.clientX - se.clientX), Oe = Math.abs(ve.clientY - se.clientY);
        (be > 15 || Oe > 15) && (H && (clearTimeout(H), H = null), E = null);
      }
    };
    return (K, se) => (u(), _("div", f_, [
      a(m).view === "list" ? (u(), X(o_, { key: 0 })) : j("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: te(["vuefinder__explorer__selector-area", "scroller-" + a(Q)])
      }, [
        a(f).get("loadingIndicator") === "linear" && a(k) ? (u(), _("div", __)) : j("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: d,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Me({ height: `${a(S)}px`, position: "relative", width: "100%" }),
          onContextmenu: se[0] || (se[0] = _e(
            //@ts-ignore
            (...ve) => a(V) && a(V)(...ve),
            ["self", "prevent"]
          )),
          onClick: se[1] || (se[1] = _e(
            //@ts-ignore
            (...ve) => a(U) && a(U)(...ve),
            ["self"]
          )),
          onTouchstartCapture: _e(N, ["self"]),
          onTouchendCapture: _e(ce, ["self"]),
          onTouchmoveCapture: _e(me, ["self"]),
          onTouchcancelCapture: _e(ce, ["self"])
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            G(Df, {
              count: Y.value && a(v).has(Y.value) ? a(v).size : 1
            }, null, 8, ["count"])
          ], 512),
          a(m).view === "grid" ? (u(!0), _(fe, { key: 0 }, ge(a(I), (ve) => (u(), X(An, {
            key: ve,
            "row-index": ve,
            "row-height": $.value,
            view: "grid",
            "items-per-row": a(C),
            items: a(L)(a(p), ve),
            "show-thumbnails": a(m).showThumbnails,
            "is-dragging-item": ue,
            "is-selected": b,
            "drag-n-drop-events": (be) => a(s).events(be),
            "explorer-id": a(Q),
            onClick: a(x),
            onDblclick: a(z),
            onContextmenu: a(F),
            onDragstart: A,
            onDragend: O
          }, {
            icon: ie((be) => [
              ke(K.$slots, "icon", qe({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), _(fe, { key: 1 }, ge(a(I), (ve) => (u(), X(An, {
            key: ve,
            "row-index": ve,
            "row-height": $.value,
            view: "list",
            items: B(ve) ? [B(ve)] : [],
            "is-dragging-item": ue,
            "is-selected": b,
            "drag-n-drop-events": (be) => a(s).events(be),
            "explorer-id": a(Q),
            onClick: a(x),
            onDblclick: a(z),
            onContextmenu: a(F),
            onDragstart: A,
            onDragend: O
          }, {
            icon: ie((be) => [
              ke(K.$slots, "icon", qe({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), m_ = ["href", "download"], h_ = { class: "vuefinder__context-menu__action vuefinder__context-menu__action--parent" }, g_ = { class: "vuefinder__context-menu vuefinder__context-menu__submenu" }, y_ = ["onClick"], w_ = ["onClick"], b_ = /* @__PURE__ */ re({
  __name: "ContextMenu",
  setup(n) {
    const e = le(), t = M(null), s = M([]);
    let i = null, r = null, l = null, d = [], c = null;
    const f = Et({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (k) => {
      s.value = k;
    });
    const m = (k) => k.link(e, s.value), p = (k) => {
      e.emitter.emit("vf-contextmenu-hide"), k.action(e, s.value);
    };
    e.emitter.on("vf-contextmenu-show", (k) => {
      const { event: b, items: $, target: h = null } = k || {};
      f.items = (e.contextMenuItems || []).filter((y) => y.show(e, {
        items: $,
        target: h
      })).sort((y, g) => {
        const C = y.order ?? 1 / 0, S = g.order ?? 1 / 0;
        return C - S;
      }), h ? $.length > 1 && $.some((y) => y.path === h.path) ? e.emitter.emit("vf-context-selected", $) : e.emitter.emit("vf-context-selected", [h]) : e.emitter.emit("vf-context-selected", []), v(b);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      f.active = !1, i && (i(), i = null), l && (d.forEach((k) => {
        k === window ? window.removeEventListener("scroll", l, !0) : k.removeEventListener("scroll", l, !0);
      }), l = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), r = null, f.positions = {};
    });
    const v = async (k) => {
      i && (i(), i = null);
      const $ = ((T) => {
        if ("clientX" in T && "clientY" in T)
          return { x: T.clientX, y: T.clientY };
        const L = "touches" in T && T.touches[0] || "changedTouches" in T && T.changedTouches[0];
        return L ? { x: L.clientX, y: L.clientY } : { x: 0, y: 0 };
      })(k);
      if (r = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: $.x,
          y: $.y,
          top: $.y,
          left: $.x,
          right: $.x,
          bottom: $.y
        })
      }, f.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, f.active = !0, await Ae(), !t.value || !r) return;
      await new Promise((T) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(T);
        });
      });
      const h = [
        _t(8),
        pt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        mt({ padding: 16 })
      ];
      let y = 0, g = 0;
      try {
        const T = await at(r, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: h
        });
        y = T.x, g = T.y;
      } catch (T) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", T);
        return;
      }
      f.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${y}px`,
        top: `${g}px`,
        opacity: "0",
        visibility: "visible",
        transform: "translateY(-8px)",
        transition: "opacity 150ms ease-out, transform 150ms ease-out"
      }, requestAnimationFrame(() => {
        t.value && (f.positions = {
          ...f.positions,
          opacity: "1",
          transform: "translateY(0)"
        });
      });
      const S = ((T) => {
        const L = [];
        let q = T;
        for (; q && q !== document.body && q !== document.documentElement; ) {
          const Z = window.getComputedStyle(q), ee = Z.overflow + Z.overflowX + Z.overflowY;
          (ee.includes("scroll") || ee.includes("auto")) && L.push(q), q = q.parentElement;
        }
        return L;
      })(t.value);
      d = [window, ...S], l = () => {
        f.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const I = l;
      I && d.forEach((T) => {
        T === window ? window.addEventListener("scroll", I, !0) : T.addEventListener("scroll", I, !0);
      }), c = (T) => {
        if (!f.active) return;
        const L = T.target;
        if (!L || t.value && t.value.contains(L))
          return;
        const q = e.root;
        q && q.contains(L) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !r))
          try {
            i = Xt(r, t.value, async () => {
              if (!(!r || !t.value))
                try {
                  const { x: T, y: L } = await at(r, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: h
                  });
                  f.positions = {
                    ...f.positions,
                    left: `${T}px`,
                    top: `${L}px`
                  };
                } catch (T) {
                  console.warn("Floating UI positioning error:", T);
                }
            });
          } catch (T) {
            console.warn("Floating UI autoUpdate setup error:", T), i = null;
          }
      }, 200);
    };
    return Ie(() => {
      i && (i(), i = null), l && (d.forEach((k) => {
        k === window ? window.removeEventListener("scroll", l, !0) : k.removeEventListener("scroll", l, !0);
      }), l = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), r = null;
    }), (k, b) => he((u(), _("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: te([{
        "vuefinder__context-menu--active": f.active,
        "vuefinder__context-menu--inactive": !f.active
      }, "vuefinder__context-menu"]),
      style: Me(f.positions)
    }, [
      (u(!0), _(fe, null, ge(f.items, ($) => (u(), _("li", {
        key: $.title,
        class: te(["vuefinder__context-menu__item", { "vuefinder__context-menu__item--has-children": $.children?.length }])
      }, [
        $.link ? (u(), _("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: m($),
          download: m($),
          onClick: b[0] || (b[0] = (h) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, w($.title(a(e).i18n)), 1)
        ], 8, m_)) : $.children?.length ? (u(), _(fe, { key: 1 }, [
          o("div", h_, [
            o("span", null, w($.title(a(e).i18n)), 1),
            b[1] || (b[1] = o("svg", {
              class: "vuefinder__context-menu__chevron",
              viewBox: "0 0 16 16",
              fill: "currentColor",
              "aria-hidden": "true"
            }, [
              o("path", { d: "M6 4l4 4-4 4z" })
            ], -1))
          ]),
          o("ul", g_, [
            (u(!0), _(fe, null, ge($.children, (h) => (u(), _("li", {
              key: h.id,
              class: "vuefinder__context-menu__item"
            }, [
              o("div", {
                class: "vuefinder__context-menu__action",
                onClick: (y) => p(h)
              }, [
                o("span", null, w(h.title(a(e).i18n)), 1)
              ], 8, y_)
            ]))), 128))
          ])
        ], 64)) : (u(), _("div", {
          key: 2,
          class: "vuefinder__context-menu__action",
          onClick: (h) => p($)
        }, [
          o("span", null, w($.title(a(e).i18n)), 1)
        ], 8, w_))
      ], 2))), 128))
    ], 6)), [
      [Ge, f.active]
    ]);
  }
}), k_ = { class: "vuefinder__status-bar__wrapper" }, $_ = { class: "vuefinder__status-bar__storage" }, x_ = ["title"], S_ = { class: "vuefinder__status-bar__storage-icon" }, C_ = ["value"], F_ = ["value"], P_ = { class: "vuefinder__status-bar__info space-x-2" }, E_ = { key: 0 }, T_ = { class: "vuefinder__status-bar__size" }, D_ = { key: 1 }, M_ = { class: "vuefinder__status-bar__size" }, I_ = { class: "vuefinder__status-bar__actions" }, A_ = /* @__PURE__ */ re({
  __name: "Statusbar",
  setup(n) {
    const e = le(), { t } = e.i18n, s = e.fs, i = oe(s.sortedFiles), r = oe(s.path), l = oe(s.selectedCount), d = oe(s.storages), c = oe(s.selectedItems), f = oe(s.path), m = (y) => {
      const g = y.target.value;
      e.adapter.open(g + "://");
    }, p = R(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((y, g) => y + (g.file_size || 0), 0)), v = R(() => !i.value || i.value.length === 0 ? 0 : i.value.reduce((y, g) => y + (g.file_size || 0), 0)), k = R(() => d.value), b = R(() => i.value), $ = R(() => l.value || 0), h = R(() => c.value || []);
    return console.log("sortedFilesList", b), (y, g) => (u(), _("div", k_, [
      o("div", $_, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(t)("Storage")
        }, [
          o("div", S_, [
            G(a(an))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: a(r).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: m
          }, [
            (u(!0), _(fe, null, ge(k.value, (C) => (u(), _("option", {
              key: C,
              value: C
            }, w(C), 9, F_))), 128))
          ], 40, C_),
          g[0] || (g[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-": "",
            hidden: "true"
          }, null, -1))
        ], 8, x_),
        o("div", P_, [
          $.value === 0 ? (u(), _("span", E_, [
            ye(w(b.value.length) + " " + w(a(t)("items")) + " ", 1),
            o("span", T_, " - " + w(a(e).filesize(v.value)), 1)
          ])) : (u(), _("span", D_, [
            ye(w($.value) + " " + w(a(t)("selected")) + " ", 1),
            o("span", M_, w(a(e).filesize(p.value)), 1)
          ]))
        ])
      ]),
      o("div", I_, [
        ke(y.$slots, "actions", {
          path: a(f).path,
          count: $.value || 0,
          selected: h.value
        })
      ])
    ]));
  }
}), O_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function L_(n, e) {
  return u(), _("svg", O_, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const R_ = { render: L_ };
function po(n, e) {
  const t = n.findIndex((s) => s.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const B_ = { class: "vuefinder__folder-loader-indicator" }, z_ = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, mo = /* @__PURE__ */ re({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ $o({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(n) {
    const e = n, t = le(), s = zn(n, "modelValue"), i = M(!1);
    pe(
      () => s.value,
      () => r()
    );
    const r = async () => {
      i.value = !0;
      try {
        const d = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        po(t.treeViewData, { path: e.path, type: "dir", folders: d });
      } catch (l) {
        Te(l, "Failed to fetch subfolders");
      } finally {
        i.value = !1;
      }
    };
    return (l, d) => (u(), _("div", B_, [
      i.value ? (u(), X(a(Ot), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), _("div", z_, [
        s.value ? (u(), X(a(It), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : j("", !0),
        s.value ? j("", !0) : (u(), X(a(Mt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), V_ = { key: 0 }, U_ = { class: "vuefinder__treesubfolderlist__no-folders" }, N_ = { class: "vuefinder__treesubfolderlist__item-content" }, H_ = ["onClick"], j_ = ["title", "onDblclick", "onClick"], K_ = { class: "vuefinder__treesubfolderlist__item-icon" }, q_ = { class: "vuefinder__treesubfolderlist__subfolder" }, W_ = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, G_ = /* @__PURE__ */ re({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = le(), t = e.fs, s = $t(e, ["vuefinder__drag-over"]), i = M({}), r = e.config, l = oe(r.state), { t: d } = e.i18n, c = oe(t.path), f = n, m = M(null), p = M(50);
    we(() => {
      f.path === f.storage + "://" && m.value && ft(m.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const v = R(() => {
      const C = e.treeViewData.find((S) => S.path === f.path)?.folders || [];
      return C.length > p.value ? C.slice(0, p.value) : C;
    }), k = R(() => e.treeViewData.find((C) => C.path === f.path)?.folders?.length || 0), b = R(() => k.value > p.value), $ = R(() => `${f.storage}://`), h = (g, C) => g === C || g.startsWith(`${C}/`);
    pe(
      v,
      (g) => {
        const C = l.value.expandTreeByDefault && f.path === $.value, S = l.value.expandedTreePaths || [];
        g.forEach((I) => {
          const T = S.some(
            (L) => h(L, I.path)
          );
          (C || T) && i.value[I.path] === void 0 && (i.value[I.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const y = () => {
      p.value += 50;
    };
    return (g, C) => {
      const S = Bn("TreeSubfolderList", !0);
      return u(), _("ul", {
        ref_key: "parentSubfolderList",
        ref: m,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        v.value.length ? j("", !0) : (u(), _("li", V_, [
          o("div", U_, w(a(d)("No folders")), 1)
        ])),
        (u(!0), _(fe, null, ge(v.value, (I) => (u(), _("li", {
          key: I.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", N_, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (T) => i.value[I.path] = !i.value[I.path]
            }, [
              G(mo, {
                modelValue: i.value[I.path],
                "onUpdate:modelValue": (T) => i.value[I.path] = T,
                storage: n.storage,
                path: I.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, H_),
            o("div", qe({
              class: "vuefinder__treesubfolderlist__item-link",
              title: I.path
            }, Ze(
              a(s).events({
                ...I,
                dir: I.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (T) => i.value[I.path] = !i.value[I.path],
              onClick: (T) => a(e).adapter.open(I.path)
            }), [
              o("div", K_, [
                a(c)?.path === I.path ? (u(), X(a(At), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), X(a(ze), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: te(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(c).path === I.path
                }])
              }, w(I.basename), 3)
            ], 16, j_)
          ]),
          o("div", q_, [
            he(G(S, {
              storage: f.storage,
              path: I.path
            }, null, 8, ["storage", "path"]), [
              [Ge, i.value[I.path]]
            ])
          ])
        ]))), 128)),
        b.value ? (u(), _("li", W_, [
          o("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: y
          }, w(a(d)("load more")), 1)
        ])) : j("", !0)
      ], 512);
    };
  }
}), Y_ = /* @__PURE__ */ re({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = le(), t = e.fs, s = e.config, i = n, r = oe(s.state), l = R(() => {
      const k = r.value.expandedTreePaths || [], b = `${i.storage}://`;
      return k.some(
        ($) => $ === b || $.startsWith(`${b}`)
      );
    }), d = M(r.value.expandTreeByDefault || l.value), c = $t(e, ["vuefinder__drag-over"]), f = oe(t.path), m = R(() => i.storage === f.value?.storage);
    pe(
      () => ({
        expandTreeByDefault: r.value.expandTreeByDefault,
        hasExpandedPathInStorage: l.value
      }),
      (k) => {
        (k.expandTreeByDefault || k.hasExpandedPathInStorage) && (d.value = !0);
      }
    );
    const p = {
      storage: i.storage,
      path: i.storage + "://",
      dir: i.storage + "://",
      type: "dir",
      basename: i.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function v(k) {
      k === f.value?.storage ? d.value = !d.value : e.adapter.open(k + "://");
    }
    return (k, b) => (u(), _(fe, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: b[2] || (b[2] = ($) => v(n.storage))
      }, [
        o("div", qe({
          class: ["vuefinder__treestorageitem__info", m.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Ze(a(c).events(p), !0)), [
          o("div", {
            class: te(["vuefinder__treestorageitem__icon", m.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            G(a(an))
          ], 2),
          o("div", null, w(n.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: b[1] || (b[1] = _e(($) => d.value = !d.value, ["stop"]))
        }, [
          G(mo, {
            modelValue: d.value,
            "onUpdate:modelValue": b[0] || (b[0] = ($) => d.value = $),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      he(G(G_, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ge, d.value]
      ])
    ], 64));
  }
}), X_ = { class: "vuefinder__folder-indicator" }, Q_ = { class: "vuefinder__folder-indicator--icon" }, J_ = /* @__PURE__ */ re({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = zn(n, "modelValue");
    return (t, s) => (u(), _("div", X_, [
      o("div", Q_, [
        e.value ? (u(), X(a(It), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : j("", !0),
        e.value ? j("", !0) : (u(), X(a(Mt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Z_ = {
  key: 0,
  class: "vuefinder__treeview__header"
}, ep = { class: "vuefinder__treeview__pinned-label" }, tp = { class: "vuefinder__treeview__pin-text text-nowrap" }, np = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, op = ["onClick"], sp = ["title"], ap = ["onClick"], ip = { key: 0 }, lp = { class: "vuefinder__treeview__no-pinned" }, rp = /* @__PURE__ */ re({
  __name: "TreeView",
  setup(n) {
    const e = le(), { enabled: t } = Ne(), { t: s } = e.i18n, { getStore: i, setStore: r } = e.storage, l = e.fs, d = e.config, c = oe(d.state), f = oe(l.sortedFiles), m = oe(l.storages), p = R(() => m.value || []), v = oe(l.path), k = $t(e, ["vuefinder__drag-over"]), b = M(190), $ = M(i("pinned-folders-opened", !0));
    pe($, (C) => r("pinned-folders-opened", C));
    const h = (C) => {
      const S = d.get("pinnedFolders");
      d.set("pinnedFolders", S.filter((I) => I.path !== C.path));
    }, y = (C) => {
      const S = C.clientX, I = C.target.parentElement;
      if (!I) return;
      const T = I.getBoundingClientRect().width;
      I.classList.remove("transition-[width]"), I.classList.add("transition-none");
      const L = (Z) => {
        b.value = T + Z.clientX - S, b.value < 50 && (b.value = 0, d.set("showTreeView", !1)), b.value > 50 && d.set("showTreeView", !0);
      }, q = () => {
        const Z = I.getBoundingClientRect();
        b.value = Z.width, I.classList.add("transition-[width]"), I.classList.remove("transition-none"), window.removeEventListener("mousemove", L), window.removeEventListener("mouseup", q);
      };
      window.addEventListener("mousemove", L), window.addEventListener("mouseup", q);
    }, g = M(null);
    return we(() => {
      g.value && ft(g.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), pe(f, (C) => {
      const S = C.filter((I) => I.type === "dir");
      po(e.treeViewData, {
        path: v.value.path || "",
        folders: S.map((I) => ({
          storage: I.storage,
          path: I.path,
          basename: I.basename,
          type: "dir"
        }))
      });
    }), (C, S) => (u(), _(fe, null, [
      o("div", {
        class: te(["vuefinder__treeview__overlay", a(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: S[0] || (S[0] = (I) => a(d).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: Me(
          a(c).showTreeView ? "min-width:100px;max-width:75%; width: " + b.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: g,
          class: "vuefinder__treeview__scroll"
        }, [
          a(t)("pinned") ? (u(), _("div", Z_, [
            o("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: S[2] || (S[2] = (I) => $.value = !$.value)
            }, [
              o("div", ep, [
                G(a(gt), { class: "vuefinder__treeview__pin-icon" }),
                o("div", tp, w(a(s)("Pinned Folders")), 1)
              ]),
              G(J_, {
                modelValue: $.value,
                "onUpdate:modelValue": S[1] || (S[1] = (I) => $.value = I)
              }, null, 8, ["modelValue"])
            ]),
            $.value ? (u(), _("ul", np, [
              (u(!0), _(fe, null, ge(a(c).pinnedFolders, (I) => (u(), _("li", {
                key: I.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", qe({ class: "vuefinder__treeview__pinned-folder" }, Ze(a(k).events(I), !0), {
                  onClick: (T) => a(e).adapter.open(I.path)
                }), [
                  a(v).path !== I.path ? (u(), X(a(ze), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : j("", !0),
                  a(v).path === I.path ? (u(), X(a(At), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : j("", !0),
                  o("div", {
                    title: I.path,
                    class: te(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": a(v).path === I.path
                    }])
                  }, w(I.basename), 11, sp)
                ], 16, op),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (T) => h(I)
                }, [
                  G(a(R_), { class: "vuefinder__treeview__remove-icon" })
                ], 8, ap)
              ]))), 128)),
              a(c).pinnedFolders.length ? j("", !0) : (u(), _("li", ip, [
                o("div", lp, w(a(s)("No folders pinned")), 1)
              ]))
            ])) : j("", !0)
          ])) : j("", !0),
          (u(!0), _(fe, null, ge(p.value, (I) => (u(), _("div", {
            key: I,
            class: "vuefinder__treeview__storage"
          }, [
            G(Y_, { storage: I }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: y
        }, null, 32)
      ], 4)
    ], 64));
  }
}), Fe = {
  new_folder: "new_folder",
  selectAll: "selectAll",
  pinFolder: "pinFolder",
  unpinFolder: "unpinFolder",
  delete: "delete",
  refresh: "refresh",
  preview: "preview",
  openAs: "openAs",
  openAsText: "openAsText",
  openAsImage: "openAsImage",
  open: "open",
  openDir: "openDir",
  download: "download",
  download_archive: "download_archive",
  archive: "archive",
  unarchive: "unarchive",
  rename: "rename",
  move: "move",
  copy: "copy",
  paste: "paste"
};
function dp(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function xe(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, s) => !(e.needsSearchQuery !== !!s.searchQuery || e.target !== void 0 && e.target !== dp(s) || e.targetType !== void 0 && e.targetType !== s.target?.type || e.mimeType !== void 0 && e.mimeType !== s.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function ut(...n) {
  return (e, t) => n.some((s) => s(e, t));
}
function nt(...n) {
  return (e, t) => n.every((s) => s(e, t));
}
const ho = [
  {
    id: Fe.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: xe({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: Fe.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: ut(xe({ target: "none" }), xe({ target: "many" })),
    order: 20
  },
  {
    id: Fe.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && xe({ target: "none" })(n, e),
    order: 30
  },
  {
    id: Fe.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(cn),
    show: xe({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: Fe.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: xe({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: Fe.pinFolder,
    title: ({ t: n }) => n("Pin Folder"),
    action: (n, e) => {
      const t = n.config, s = t.get("pinnedFolders"), i = s.concat(
        e.filter(
          (r) => s.findIndex((l) => l.path === r.path) === -1
        )
      );
      t.set("pinnedFolders", i);
    },
    show: nt(xe({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: Fe.unpinFolder,
    title: ({ t: n }) => n("Unpin Folder"),
    action: (n, e) => {
      const t = n.config, s = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        s.filter(
          (i) => !e.find((r) => r.path === i.path)
        )
      );
    },
    show: nt(xe({ target: "one", targetType: "dir", feature: "pinned" }), (n, e) => n.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: Fe.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(Qe, { storage: e[0]?.storage, item: e[0] }),
    show: nt(
      xe({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: Fe.openAs,
    title: ({ t: n }) => n("Preview as"),
    action: () => {
    },
    children: [
      {
        id: Fe.openAsText,
        title: ({ t: n }) => n("Text"),
        action: (n, e) => n.modal.open(Qe, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "text"
        }),
        show: () => !0
      },
      {
        id: Fe.openAsImage,
        title: ({ t: n }) => n("Image"),
        action: (n, e) => n.modal.open(Qe, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "image"
        }),
        show: () => !0
      }
    ],
    show: nt(
      xe({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 81
  },
  {
    id: Fe.download,
    link: (n, e) => {
      if (e[0])
        return n.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: n }) => n("Download"),
    action: () => {
    },
    show: nt(
      xe({ target: "one", feature: "download" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: Fe.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(Dt, { items: e }),
    show: xe({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: Fe.move,
    title: ({ t: n }) => n("Move files"),
    action: (n, e) => {
      const t = n.fs, s = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      n.modal.open(it, { items: { from: e, to: s } });
    },
    show: ut(
      xe({ target: "one", feature: "move" }),
      xe({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: Fe.copy,
    title: ({ t: n }) => n("Copy"),
    action: (n, e) => {
      e.length > 0 && n.fs.setClipboard("copy", new Set(e.map((t) => $e(t))));
    },
    show: ut(
      xe({ target: "one", feature: "copy" }),
      xe({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: Fe.paste,
    title: ({ t: n }) => n("Paste"),
    action: (n, e) => {
      const t = n.fs.getClipboard();
      if (t?.items?.size > 0) {
        const i = n.fs.path.get();
        let r = i.path, l = i.storage;
        e.length === 1 && e[0]?.type === "dir" && (r = e[0].path, l = e[0].storage);
        const d = {
          storage: l || "",
          path: r || "",
          type: "dir"
        };
        n.modal.open(t.type === "cut" ? it : ln, {
          items: { from: Array.from(t.items), to: d }
        });
      }
    },
    show: (n, e) => n.features?.copy ?? !1 ? n.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: Fe.archive,
    title: ({ t: n }) => n("Archive"),
    action: (n, e) => n.modal.open(fn, { items: e }),
    show: ut(
      xe({ target: "many", feature: "archive" }),
      nt(
        xe({ target: "one", feature: "archive" }),
        (n, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: Fe.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(vn, { items: e }),
    show: xe({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: Fe.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(Tt, { items: e });
    },
    show: ut(
      xe({ feature: "delete", target: "one" }),
      xe({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], cp = ["data-theme"], up = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, vp = { class: "vuefinder__external-drop-message" }, fp = { class: "vuefinder__main__content" }, _p = /* @__PURE__ */ re({
  __name: "VueFinderView",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean },
    locale: {},
    contextMenuItems: {},
    selectionMode: {},
    selectionFilterType: {},
    selectionFilterMimeIncludes: {},
    onError: { type: Function },
    onSelect: { type: Function },
    onPathChange: { type: Function },
    onUploadComplete: { type: Function },
    onDeleteComplete: { type: Function },
    onNotify: { type: Function },
    onReady: { type: Function },
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function },
    customUploader: { type: Function }
  },
  emits: [
    "select",
    "path-change",
    "upload-complete",
    "delete-complete",
    "notify",
    "error",
    "ready",
    "file-dclick",
    "folder-dclick",
    "update:locale"
  ],
  setup(n, { emit: e }) {
    const t = e, s = n, i = le(), r = st("root"), l = i.config;
    pe(
      () => s.features,
      (g) => {
        const C = Nn(g);
        Object.keys(i.features).forEach((S) => {
          delete i.features[S];
        }), Object.assign(i.features, C);
      },
      { deep: !0 }
    );
    const d = i.fs, c = oe(i.i18n.localeAtom), f = oe(l.state), m = R(() => {
      const g = f.value;
      return {
        "--vf-grid-item-width": `${g.gridItemWidth}px`,
        "--vf-grid-item-height": `${g.gridItemHeight}px`,
        "--vf-grid-item-gap": `${g.gridItemGap}px`,
        "--vf-grid-icon-size": `${g.gridIconSize}px`,
        "--vf-list-item-height": `${g.listItemHeight}px`,
        "--vf-list-item-gap": `${g.listItemGap}px`,
        "--vf-list-icon-size": `${g.listIconSize}px`
      };
    });
    Id();
    const { isDraggingExternal: p, handleDragEnter: v, handleDragOver: k, handleDragLeave: b, handleDrop: $ } = Ad();
    function h(g) {
      d.setPath(g.dirname), l.get("persist") && l.set("path", g.dirname), d.setReadOnly(g.read_only ?? !1), i.modal.close(), d.setFiles(g.files), d.clearSelection(), d.setSelectedCount(0), d.setStorages(g.storages);
    }
    i.adapter.onBeforeOpen = () => {
      d.setLoading(!0);
    }, i.adapter.onAfterOpen = (g) => {
      h(g), d.setLoading(!1);
    }, i.emitter.on("vf-fetch-abort", () => {
      i.adapter.cancelOpen(), d.setLoading(!1);
    }), i.emitter.on("vf-upload-complete", (g) => {
      t("upload-complete", g);
    }), i.emitter.on("vf-delete-complete", (g) => {
      t("delete-complete", g);
    }), i.emitter.on("vf-notify", (g) => {
      t("notify", g);
      const { type: C, message: S } = g ?? {};
      C === "error" && t("error", S);
    }), i.emitter.on("vf-file-dclick", (g) => {
      t("file-dclick", g);
    }), i.emitter.on("vf-folder-dclick", (g) => {
      t("folder-dclick", g);
    }), pe(
      () => s.config?.theme,
      (g) => {
        g && l.set("theme", a(g));
      },
      { immediate: !0 }
    ), pe(
      c,
      (g, C) => {
        g !== C && t("update:locale", String(g));
      },
      { immediate: !1 }
    ), we(() => {
      i.root = r.value, pe(
        () => l.get("path"),
        (C) => {
          i.adapter.open(C);
        }
      );
      const g = l.get("persist") ? l.get("path") : l.get("initialPath") ?? "";
      d.setPath(g), i.adapter.open(g), d.path.listen((C) => {
        t("path-change", C.path);
      }), d.selectedItems.listen((C) => {
        t("select", C);
      }), t("ready");
    });
    const y = async (g) => {
      const C = await $(g);
      C.length > 0 && (i.modal.open(un), setTimeout(() => {
        i.emitter.emit(
          "vf-external-files-dropped",
          C.map((S) => ({ file: S.file, name: S.relativePath }))
        );
      }, 100));
    };
    return (g, C) => (u(), _("div", {
      ref_key: "root",
      ref: r,
      tabindex: "0",
      class: te(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": a(p) }]),
      "data-theme": a(i).theme.current,
      style: Me(m.value),
      onDragenter: C[2] || (C[2] = //@ts-ignore
      (...S) => a(v) && a(v)(...S)),
      onDragover: C[3] || (C[3] = //@ts-ignore
      (...S) => a(k) && a(k)(...S)),
      onDragleave: C[4] || (C[4] = //@ts-ignore
      (...S) => a(b) && a(b)(...S)),
      onDrop: y
    }, [
      o("div", {
        class: te(a(i).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: te([
            a(f)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: C[0] || (C[0] = (S) => a(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: C[1] || (C[1] = (S) => a(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          a(p) ? (u(), _("div", up, [
            o("div", vp, w(a(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : j("", !0),
          a(f).showMenuBar ? (u(), X(zu, { key: 1 }, {
            "menubar-start": ie((S) => [
              ke(g.$slots, "menubar-start", Pe(Ee(S)))
            ]),
            "menu-items": ie((S) => [
              ke(g.$slots, "menu-items", Pe(Ee(S)))
            ]),
            "menubar-end": ie((S) => [
              ke(g.$slots, "menubar-end", Pe(Ee(S)))
            ]),
            _: 3
          })) : j("", !0),
          a(f).showToolbar ? (u(), X(Uv, { key: 2 }, {
            "toolbar-items": ie((S) => [
              ke(g.$slots, "toolbar-items", Pe(Ee(S)))
            ]),
            _: 3
          })) : j("", !0),
          a(f).showBreadcrumbBar ? (u(), X(Cf, { key: 3 }, {
            "breadcrumb-actions": ie((S) => [
              ke(g.$slots, "breadcrumb-actions", Pe(Ee(S)))
            ]),
            _: 3
          })) : j("", !0),
          o("div", fp, [
            G(rp),
            G(p_, {
              "on-file-dclick": s.onFileDclick,
              "on-folder-dclick": s.onFolderDclick
            }, {
              icon: ie((S) => [
                ke(g.$slots, "icon", Pe(Ee(S)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          G(A_, null, {
            actions: ie((S) => [
              ke(g.$slots, "status-bar", Pe(Ee(S)))
            ]),
            _: 3
          })
        ], 34),
        (u(), X(bt, { to: "body" }, [
          G(xo, { name: "fade" }, {
            default: ie(() => [
              a(i).modal.visible ? (u(), X(On(a(i).modal.type), { key: 0 })) : j("", !0)
            ]),
            _: 1
          })
        ])),
        G(b_, { items: a(ho) }, null, 8, ["items"]),
        a(f).notificationsEnabled ? (u(), X(a(Fo), {
          key: 0,
          position: a(f).notificationPosition,
          duration: a(f).notificationDuration,
          "visible-toasts": a(f).notificationVisibleToasts,
          "rich-colors": a(f).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : j("", !0)
      ], 2)
    ], 46, cp));
  }
}), pp = /* @__PURE__ */ re({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => ho },
    selectionMode: { default: "multiple" },
    selectionFilterType: { default: "both" },
    selectionFilterMimeIncludes: { default: () => [] },
    onError: {},
    onSelect: {},
    onPathChange: {},
    onUploadComplete: {},
    onDeleteComplete: {},
    onNotify: {},
    onReady: {},
    onFileDclick: {},
    onFolderDclick: {},
    customUploader: {}
  },
  setup(n) {
    const e = n, t = e.id ?? Ct(Wt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const s = Jo(e, Ct("VueFinderOptions") || {});
    return pe(
      () => e.config,
      (i) => {
        if (i) {
          const r = {};
          for (const l in i) {
            const d = a(i[l]);
            d !== void 0 && (r[l] = d);
          }
          s.config.init(r);
        }
      },
      { deep: !0, immediate: !0 }
    ), pe(
      () => e.locale,
      (i) => {
        i && s.i18n.localeAtom && s.i18n.localeAtom.get() !== i && s.i18n.localeAtom.set(i);
      },
      { immediate: !0 }
    ), Oo(t, s), So(Wt, t), wt(() => {
      Lo(t);
    }), (i, r) => (u(), X(_p, Pe(Ee(e)), {
      icon: ie((l) => [
        ke(i.$slots, "icon", Pe(Ee(l)))
      ]),
      "status-bar": ie((l) => [
        ke(i.$slots, "status-bar", Pe(Ee(l)))
      ]),
      "menubar-start": ie((l) => [
        ke(i.$slots, "menubar-start", Pe(Ee(l)))
      ]),
      "menu-items": ie((l) => [
        ke(i.$slots, "menu-items", Pe(Ee(l)))
      ]),
      "menubar-end": ie((l) => [
        ke(i.$slots, "menubar-end", Pe(Ee(l)))
      ]),
      "toolbar-items": ie((l) => [
        ke(i.$slots, "toolbar-items", Pe(Ee(l)))
      ]),
      "breadcrumb-actions": ie((l) => [
        ke(i.$slots, "breadcrumb-actions", Pe(Ee(l)))
      ]),
      _: 3
    }, 16));
  }
});
function Mp(n) {
  const e = le(n), t = oe(e.fs.path), s = R(() => t.value?.path ?? ""), i = (l) => l || e.fs.path.get().path || "", r = (l) => {
    Array.isArray(l.files) && e.fs.setFiles(l.files);
  };
  return {
    async refresh() {
      const l = e.fs.path.get().path || "";
      e.adapter.invalidateListQuery(l), await e.adapter.open(l);
    },
    async open(l) {
      await e.adapter.open(l);
    },
    preview(l) {
      const d = (e.fs.files.get() || []).find((c) => c.path === l);
      !d || d.type !== "file" || e.modal.open(Qe, { storage: d.storage, item: d });
    },
    notify(l, d) {
      ot(e, l, d);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    path: s,
    select(l) {
      const d = new Set((e.fs.files.get() || []).map((f) => f.path)), c = (l || []).filter((f) => d.has(f));
      e.fs.setSelection(c);
    },
    selectOne(l) {
      new Set((e.fs.files.get() || []).map((c) => c.path)).has(l) && e.fs.setSelection([l]);
    },
    clearSelection() {
      e.fs.clearSelection();
    },
    getSelectedPaths() {
      return (e.fs.selectedItems.get() || []).map((l) => l.path);
    },
    async createFolder(l, d) {
      const c = await e.adapter.createFolder({ path: i(d), name: l });
      r(c);
    },
    async createFile(l, d) {
      const c = await e.adapter.createFile({ path: i(d), name: l });
      r(c);
    },
    async delete(l, d) {
      const c = i(d), f = new Map(
        (e.fs.files.get() || []).map((v) => [v.path, v])
      ), m = (l || []).map((v) => f.get(v)).filter((v) => !!v).map((v) => ({ path: v.path, type: v.type })), p = await e.adapter.delete({ path: c, items: m });
      r(p);
    },
    async rename(l, d, c) {
      const f = await e.adapter.rename({
        path: i(c),
        item: l,
        name: d
      });
      r(f);
    },
    async copy(l, d, c) {
      const f = await e.adapter.copy({
        path: i(c),
        sources: l,
        destination: d
      });
      r(f);
    },
    async move(l, d, c) {
      const f = await e.adapter.move({
        path: i(c),
        sources: l,
        destination: d
      });
      r(f);
    },
    getFiles() {
      return e.fs.files.get() || [];
    },
    getStorages() {
      return e.fs.storages.get() || [];
    },
    isLoading() {
      return e.fs.isLoading();
    },
    isReadOnly() {
      return e.fs.getReadOnly();
    }
  };
}
const Ip = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", pp);
  }
};
export {
  Yo as A,
  Zt as B,
  Fe as C,
  Dp as I,
  qn as R,
  Ip as V,
  pp as _,
  of as a,
  Fu as b,
  Bo as c,
  Mp as d,
  ho as m,
  kn as p,
  le as u
};
