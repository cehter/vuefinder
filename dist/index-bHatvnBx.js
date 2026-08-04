import { inject as Ft, reactive as Pt, watch as me, ref as P, computed as O, shallowRef as ft, markRaw as yo, defineComponent as ue, onMounted as be, nextTick as Oe, openBlock as c, createElementBlock as _, withKeys as Ke, unref as a, createElementVNode as o, withModifiers as pe, normalizeStyle as Ie, normalizeClass as se, renderSlot as we, createCommentVNode as H, toDisplayString as w, createBlock as Q, resolveDynamicComponent as On, withCtx as de, createVNode as Y, Fragment as _e, renderList as he, withDirectives as ge, vModelCheckbox as lt, vModelText as We, onBeforeUnmount as bt, defineAsyncComponent as Ln, Suspense as Rn, vShow as Ge, onUnmounted as Ae, useTemplateRef as st, createStaticVNode as Ct, createTextVNode as ye, createSlots as wo, Teleport as kt, resolveComponent as Bn, customRef as bo, isRef as zn, vModelSelect as qt, vModelRadio as Vt, mergeProps as qe, toHandlers as et, normalizeProps as Ce, guardReactiveProps as Fe, onUpdated as ko, useModel as Vn, mergeModels as $o, Transition as xo, provide as So } from "vue";
import Co from "mitt";
import { useStore as oe } from "@nanostores/vue";
import { persistentAtom as Un } from "@nanostores/persistent";
import { toast as St, Toaster as Fo } from "vue-sonner";
import { atom as Be, computed as Ze } from "nanostores";
import { QueryClient as Eo, isCancelledError as To } from "@tanstack/vue-query";
import Po from "@uppy/core";
import Wt from "vanilla-lazyload";
import { Cropper as Do } from "vue-advanced-cropper";
import { OverlayScrollbars as _t, SizeObserverPlugin as Mo } from "overlayscrollbars";
import { computePosition as at, offset as pt, flip as mt, shift as ht, autoUpdate as Xt } from "@floating-ui/dom";
import Io from "@viselect/vanilla";
import Ao from "@uppy/xhr-upload";
const Qt = /* @__PURE__ */ new Map(), Gt = /* @__PURE__ */ Symbol("ServiceContainerId");
function Oo(n, e) {
  Qt.set(n, e);
}
function Lo(n) {
  Qt.delete(n);
}
function ce(n) {
  const e = n ?? Ft(Gt);
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
  const e = localStorage.getItem(n + "_storage"), t = Pt(JSON.parse(e ?? "{}"));
  me(t, s);
  function s() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function i(u, f) {
    t[u] = f;
  }
  function r(u) {
    delete t[u];
  }
  function l() {
    Object.keys(t).forEach((u) => r(u));
  }
  return { getStore: (u, f = null) => u in t ? t[u] : f, setStore: i, removeStore: r, clearStore: l };
}
function De(n, e = "An error occurred") {
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
  return Un(n, e, {
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
        St.success(t);
        break;
      case "error":
        St.error(t);
        break;
      case "warning":
        St.warning(t);
        break;
      default:
        St.info(t);
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
const Ut = /* @__PURE__ */ new Map();
async function Nt(n, e) {
  const t = e[n];
  return typeof t == "function" ? (await t()).default : t;
}
function Vo(n, e, t, s, i) {
  const r = Ve({ emitter: t, config: i }), l = "vuefinder_locale", d = "global";
  let u;
  if (Ut.has(d))
    u = Ut.get(d), e && e !== u.get() && u.set(e);
  else {
    const x = localStorage.getItem(l) ? JSON.parse(localStorage.getItem(l)) : null;
    u = Bo(l, e || x || "en"), Ut.set(d, u);
  }
  const f = "vuefinder_translations", h = (x) => {
    try {
      const L = localStorage.getItem(f);
      if (L)
        return JSON.parse(L)[x] || null;
    } catch {
    }
    return null;
  }, p = (x, L) => {
    try {
      const C = localStorage.getItem(f), A = C ? JSON.parse(C) : {};
      A[x] = L, localStorage.setItem(f, JSON.stringify(A));
    } catch {
    }
  }, v = oe(u), k = String(v.value), b = h(k), $ = P(b || {});
  let g = !1;
  !b && Object.keys(s).length > 0 && Nt(k, s).then((x) => {
    $.value = x, p(k, x);
  }).catch(() => {
  }), me(
    v,
    async (x, L) => {
      if (L && x === L)
        return;
      if (!g) {
        g = !0;
        const A = h(String(x));
        if (A)
          $.value = A;
        else if (Object.keys(s).length > 0)
          try {
            const W = await Nt(String(x), s);
            $.value = W, p(String(x), W);
          } catch {
          }
        return;
      }
      const C = h(String(x));
      if (C)
        $.value = C;
      else
        try {
          const A = await Nt(String(x), s);
          $.value = A, p(String(x), A);
        } catch (A) {
          const W = De(A, "Locale cannot be loaded!");
          r.error(W);
          return;
        }
      Object.values(s).length > 1 && (r.success("The language is set to " + x), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const y = (x, ...L) => L.length ? y(x = x.replace("%s", String(L.shift())), ...L) : x;
  function m(x, ...L) {
    return $.value && Object.prototype.hasOwnProperty.call($.value, x) ? y($.value[x] || x, ...L) : y(x, ...L);
  }
  const S = O({
    get: () => v.value,
    set: (x) => {
      u.set(x);
    }
  });
  return Pt({ t: m, locale: S, localeAtom: u });
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
], Nn = {
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
  return Nn.advanced;
}
function Hn(n) {
  return n ? n === "simple" || n === "advanced" ? { ...Nn[n] } : { ...gn(), ...n } : gn();
}
const No = "4.6.0-cehter.2.3.4";
function Jt(n, e, t, s, i) {
  return e = Math, t = e.log, s = 1024, i = t(n) / t(s) | 0, (n / e.pow(s, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function jn(n, e, t, s, i) {
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
  const e = ft(null), t = P(!1), s = P(), i = P(!1), r = ft(null);
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
const Et = {
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
}, Tt = {
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
  Object.keys(Tt)
);
function qo(n) {
  return n || "silver";
}
function Kn(n) {
  return Ko.has(n);
}
function yn(n) {
  const e = {}, t = {}, s = n;
  for (const i in s)
    if (Kn(i))
      t[i] = s[i];
    else if (i in Et) {
      const r = i;
      e[r] = s[i];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function wn(n, e) {
  const t = { ...Et, ...n, ...e };
  return t.theme = qo(t.theme), t;
}
function bn(n, e) {
  return { ...Tt, ...e, ...n };
}
const Wo = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: s, nonPersistenceConfig: i } = yn(e), r = wn(
    s,
    Et
  ), l = bn(
    i,
    Tt
  ), d = Un(
    t,
    r,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), u = Be(l), f = Ze(
    [d, u],
    (g, y) => ({
      ...g,
      ...y
    })
  ), h = (g = {}) => {
    const y = d.get(), m = u.get(), { persistenceConfig: S, nonPersistenceConfig: x } = yn(g), L = wn(S, y), C = bn(
      x,
      m
    );
    d.set(L), u.set(C);
  }, p = (g) => Kn(g) ? u.get()[g] : d.get()[g], v = () => ({
    ...d.get(),
    ...u.get()
  }), k = (g, y) => {
    const m = d.get();
    typeof g == "object" && g !== null ? d.set({ ...m, ...g }) : d.set({
      ...m,
      [g]: y
    });
  };
  return {
    // Store atom (combined)
    state: f,
    // Methods
    init: h,
    get: p,
    set: k,
    toggle: (g) => {
      const y = d.get();
      k(g, !y[g]);
    },
    all: v,
    reset: () => {
      d.set({ ...Et }), u.set({ ...Tt });
    }
  };
}, $e = (n) => `${n.type}:${n.path}`;
function qn(n, e) {
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
  }), u = Be(null), f = Be(0), h = Be(!1), p = Be([]), v = Be(-1), k = Ze([n], (ee) => {
    const ae = (ee ?? "").trim(), le = ae.indexOf("://"), ve = le >= 0 ? ae.slice(0, le) : "", Me = (le >= 0 ? ae.slice(le + 3) : ae).split("/").filter(Boolean);
    let Ee = "";
    const Ye = Me.map((Le) => (Ee = Ee ? `${Ee}/${Le}` : Le, {
      basename: Le,
      name: Le,
      path: ve ? `${ve}://${Ee}` : Ee,
      type: "dir"
    }));
    return { storage: ve, breadcrumb: Ye, path: ae };
  }), b = Ze([s, i, r], (ee, ae, le) => {
    let ve = ee;
    le.kind === "files" ? ve = ve.filter((Le) => Le.type === "file") : le.kind === "folders" && (ve = ve.filter((Le) => Le.type === "dir")), le.showHidden || (ve = ve.filter((Le) => !Le.basename.startsWith(".")));
    const { active: He, column: Me, order: Ee } = ae;
    if (!He || !Me) return ve;
    const Ye = Ee === "asc" ? 1 : -1;
    return ve.slice().sort((Le, Bt) => qn(Le[Me], Bt[Me]) * Ye);
  }), $ = Ze([s, l], (ee, ae) => ae.size === 0 ? [] : ee.filter((le) => ae.has($e(le)))), g = (ee, ae) => {
    const le = n.get();
    if ((ae ?? !0) && le !== ee) {
      const ve = p.get(), He = v.get();
      He < ve.length - 1 && ve.splice(He + 1), ve.length === 0 && le && ve.push(le), ve.push(ee), p.set([...ve]), v.set(ve.length - 1);
    }
    n.set(ee);
  }, y = (ee) => {
    s.set(ee ?? []);
  }, m = (ee) => {
    e.set(ee ?? []);
  }, S = (ee, ae) => {
    i.set({ active: !0, column: ee, order: ae });
  }, x = (ee) => {
    const ae = i.get();
    ae.active && ae.column === ee ? i.set({
      active: ae.order === "asc",
      column: ee,
      order: "desc"
    }) : i.set({
      active: !0,
      column: ee,
      order: "asc"
    });
  }, L = () => {
    i.set({ active: !1, column: "", order: "" });
  }, C = (ee, ae) => {
    r.set({ kind: ee, showHidden: ae });
  }, A = () => {
    r.set({ kind: "all", showHidden: !1 });
  }, W = (ee, ae = "multiple") => {
    const le = new Set(l.get());
    ae === "single" && le.clear(), le.add(ee), l.set(le);
  }, Z = (ee, ae = "multiple") => {
    const le = new Set(l.get());
    ae === "single" && le.clear(), ee.forEach((ve) => le.add(ve)), l.set(le);
  }, te = (ee) => {
    const ae = new Set(l.get());
    ae.delete(ee), l.set(ae);
  }, J = (ee) => l.get().has(ee), G = (ee, ae = "multiple") => {
    const le = new Set(l.get());
    le.has(ee) ? le.delete(ee) : (ae === "single" && le.clear(), le.add(ee)), l.set(le);
  }, E = (ee = "multiple", ae) => {
    if (ee === "single") {
      const le = s.get()[0];
      if (le) {
        const ve = $e(le);
        l.set(/* @__PURE__ */ new Set([ve])), f.set(1);
      }
    } else {
      if (ae?.selectionFilterType || ae?.selectionFilterMimeIncludes && ae.selectionFilterMimeIncludes.length > 0) {
        const le = s.get().filter((ve) => {
          const He = ae.selectionFilterType, Me = ae.selectionFilterMimeIncludes;
          return He === "files" && ve.type === "dir" || He === "dirs" && ve.type === "file" ? !1 : Me && Array.isArray(Me) && Me.length > 0 && ve.type !== "dir" ? ve.mime_type ? Me.some((Ee) => ve.mime_type?.startsWith(Ee)) : !1 : !0;
        }).map((ve) => $e(ve));
        l.set(new Set(le));
      } else {
        const le = new Set(s.get().map((ve) => $e(ve)));
        l.set(le);
      }
      X(l.get().size);
    }
  }, D = () => {
    l.set(/* @__PURE__ */ new Set()), f.set(0);
  }, V = (ee) => {
    const ae = new Set(ee ?? []), le = new Set(
      s.get().filter((ve) => ae.has(ve.path)).map((ve) => $e(ve))
    );
    l.set(le), f.set(le.size);
  }, X = (ee) => {
    f.set(ee);
  }, fe = (ee) => {
    h.set(!!ee);
  }, U = () => h.get(), I = (ee, ae) => {
    const le = s.get().filter((ve) => ae.has($e(ve)));
    d.set({
      type: ee,
      path: k.get().path,
      items: new Set(le)
    });
  }, K = (ee) => Ze([d], (ae) => ae.type === "cut" && Array.from(ae.items).some((le) => $e(le) === ee)), R = (ee) => Ze([d], (ae) => ae.type === "copy" && Array.from(ae.items).some((le) => $e(le) === ee)), T = (ee) => {
    const ae = K(ee);
    return oe(ae).value ?? !1;
  }, M = (ee) => {
    const ae = R(ee);
    return oe(ae).value ?? !1;
  }, z = () => {
    d.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, B = () => d.get(), j = (ee) => {
    u.set(ee);
  }, q = () => u.get(), re = () => {
    u.set(null);
  }, ne = () => {
    const ee = p.get(), ae = v.get();
    if (ae > 0) {
      const le = ae - 1, ve = ee[le];
      ve && (v.set(le), g(ve, !1));
    }
  }, F = () => {
    const ee = p.get(), ae = v.get();
    if (ae < ee.length - 1) {
      const le = ae + 1, ve = ee[le];
      ve && (v.set(le), g(ve, !1));
    }
  }, N = Ze([v], (ee) => ee > 0), ie = Ze(
    [p, v],
    (ee, ae) => ae < ee.length - 1
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
    loading: h,
    draggedItem: u,
    clipboardItems: d,
    // Computed values
    path: k,
    sortedFiles: b,
    selectedItems: $,
    // Actions
    setPath: g,
    setFiles: y,
    setStorages: m,
    setSort: S,
    toggleSort: x,
    clearSort: L,
    setFilter: C,
    clearFilter: A,
    select: W,
    selectMultiple: Z,
    deselect: te,
    toggleSelect: G,
    selectAll: E,
    isSelected: J,
    clearSelection: D,
    setSelection: V,
    setSelectedCount: X,
    setLoading: fe,
    isLoading: U,
    setClipboard: I,
    createIsCut: K,
    createIsCopied: R,
    isCut: T,
    isCopied: M,
    clearClipboard: z,
    getClipboard: B,
    setDraggedItem: j,
    getDraggedItem: q,
    clearDraggedItem: re,
    setReadOnly: (ee) => {
      t.set(ee);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (ee) => t.get() ? !0 : ee.read_only ?? !1,
    // Navigation
    goBack: ne,
    goForward: F,
    canGoBack: N,
    canGoForward: ie,
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
      const u = `${r} copy ${d}${l}`, f = this.join(e, u);
      if (!s.has(f)) return u;
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
      const d = this.normalizePath(l.path, s || this.defaultStorage), u = this.findByPath(d);
      u && (u.type === "dir" ? i.push(...this.removeTree(u.path)) : (this.removeExact(u.path), this.contentStore.delete(u.path), i.push(u)));
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
      const f = r.path, h = d, p = this.files.map((v) => {
        if (v.storage !== r.storage || !this.isInTree(v.path, f)) return v;
        const k = h + v.path.slice(f.length);
        return this.cloneEntry(v, {
          path: k,
          dir: this.parent(k),
          basename: v.path === f ? e.name : v.basename,
          last_modified: Date.now()
        });
      });
      for (const [v, k] of Array.from(this.contentStore.entries()))
        this.isInTree(v, f) && (this.contentStore.delete(v), this.contentStore.set(h + v.slice(f.length), k));
      this.replaceAll(p);
    } else {
      const f = this.cloneEntry(r, {
        path: d,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(f), this.removeExact(r.path);
      const h = this.contentStore.get(r.path);
      h !== void 0 && (this.contentStore.delete(r.path), this.contentStore.set(f.path, h));
    }
    const u = e.path ? this.normalizePath(e.path, r.storage || this.defaultStorage) : l;
    return this.resultForDir(u || l);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: s } = this.split(t), i = this.topLevelSources(e.sources, s || this.defaultStorage), r = new Set(this.files.map((d) => d.path)), l = [];
    for (const d of i) {
      const u = this.findByPath(d);
      if (!u) continue;
      if (u.type === "file") {
        const v = this.uniqueName(t, u.basename, r), k = this.makeFileEntry(
          t,
          v,
          u.file_size || 0,
          u.mime_type
        );
        l.push(k), r.add(k.path);
        const b = this.contentStore.get(u.path);
        b !== void 0 && this.contentStore.set(k.path, b);
        continue;
      }
      const f = this.getTree(u.path), h = this.uniqueName(t, u.basename, r), p = /* @__PURE__ */ new Map();
      p.set(u.path, this.join(t, h));
      for (const v of f) {
        const k = v.path === u.path ? p.get(u.path) : this.join(p.get(v.dir), v.basename);
        p.set(v.path, k);
        const b = v.path === u.path ? t : p.get(v.dir), $ = v.path === u.path ? h : v.basename, g = this.cloneEntry(v, {
          path: k,
          dir: b,
          basename: $,
          extension: v.type === "file" ? this.getExtension($) : "",
          last_modified: Date.now()
        });
        if (l.push(g), r.add(g.path), v.type === "file") {
          const y = this.contentStore.get(v.path);
          y !== void 0 && this.contentStore.set(g.path, y);
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
      const u = this.getTree(d.path, r), f = new Set(u.map((b) => b.path)), h = new Set(r.filter((b) => !f.has(b.path)).map((b) => b.path)), p = this.uniqueName(t, d.basename, h), v = /* @__PURE__ */ new Map();
      v.set(d.path, this.join(t, p));
      const k = /* @__PURE__ */ new Map();
      for (const b of u) {
        const $ = b.path === d.path ? v.get(d.path) : this.join(v.get(b.dir), b.basename);
        v.set(b.path, $);
        const g = b.path === d.path ? t : v.get(b.dir), y = b.path === d.path ? p : b.basename;
        k.set(
          b.path,
          this.cloneEntry(b, {
            path: $,
            dir: g,
            basename: y,
            extension: b.type === "file" ? this.getExtension(y) : "",
            last_modified: Date.now()
          })
        );
      }
      r = r.map((b) => k.get(b.path) || b);
      for (const [b, $] of v.entries()) {
        if (b === $) continue;
        const g = this.contentStore.get(b);
        g !== void 0 && (this.contentStore.delete(b), this.contentStore.set($, g));
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
            const l = this.normalizePath(t.getTargetPath()), d = r?.name || "file", u = r?.type || null, f = r?.data, h = r?.size || 0, p = d.split("/").filter(Boolean), v = p.pop() || d, k = p.length ? this.ensureDirPath(l, p) : l, b = this.makeFileEntry(k, v, h, u);
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
class Wn extends Zt {
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
      ...Wn.DEFAULT_URLS,
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
class Up extends Zt {
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
    ), [d, u] = await Promise.all([
      r,
      l
    ]);
    s.clear(), i.clear();
    for (const f of d)
      this.isManagedStorage(f.storage) || s.put(f);
    for (const f of u)
      this.isManagedPath(f.path) || i.put(f);
    for (const f of this.entries)
      this.isManagedStorage(f.storage) && s.put(f);
    for (const [f, h] of this.contentStore.entries())
      this.isManagedPath(f) && i.put({ path: f, content: h });
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
const Ht = {
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
    this.driver = e, this.onBeforeOpen = t.onBeforeOpen, this.onAfterOpen = t.onAfterOpen, this.queryClient = t.queryClient || new Eo({
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
    const t = Ht.list(e);
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
      if (To(t) || t?.name === "AbortError")
        return;
      throw t;
    }
  }
  /**
   * Cancel an in-flight list/open request. Aborts the underlying fetch via
   * the AbortSignal that TanStack Query passes to the query function.
   */
  cancelOpen(e) {
    const t = e === void 0 ? ["adapter", "list"] : Ht.list(e);
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
    const t = Ht.search(e.path, e.filter, e.deep, e.size);
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
    current: O(() => e.value.theme || "silver"),
    set: (i) => {
      n.set("theme", i);
    }
  };
}
const Jo = (n, e) => {
  const t = Ro(n.id ?? "vf"), s = Co(), i = e.i18n, r = n.locale ?? e.locale, l = Wo(n.id ?? "vf", n.config ?? {}), d = Go();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const u = new Xo(n.driver);
  return Pt({
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
    adapter: yo(u),
    // active features
    features: Hn(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: O(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: O(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: l.get("metricUnits") ? jn : Jt,
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
}, ss = { class: "vuefinder__modal-drag-message" }, Ue = /* @__PURE__ */ ue({
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
    const e = P(null), t = ce();
    t.config;
    const s = n, i = () => {
      s.onRequestClose ? s.onRequestClose() : t.modal.close();
    };
    be(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), Oe(() => {
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
    return (l, d) => (c(), _("div", {
      "data-theme": a(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: d[5] || (d[5] = Ke((u) => i(), ["esc"]))
    }, [
      d[6] || (d[6] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", es, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: r,
          onMousedown: d[4] || (d[4] = pe((u) => i(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: se(["vuefinder__modal-layout__body", s.bodyClass]),
            style: Ie(s.bodyStyle),
            onTouchstart: d[0] || (d[0] = //@ts-ignore
            (...u) => s.onBodyTouchstart && s.onBodyTouchstart(...u)),
            onTouchmove: d[1] || (d[1] = //@ts-ignore
            (...u) => s.onBodyTouchmove && s.onBodyTouchmove(...u)),
            onTouchend: d[2] || (d[2] = //@ts-ignore
            (...u) => s.onBodyTouchend && s.onBodyTouchend(...u)),
            onTouchcancel: d[3] || (d[3] = //@ts-ignore
            (...u) => s.onBodyTouchcancel && s.onBodyTouchcancel(...u))
          }, [
            o("div", ts, [
              we(l.$slots, "default")
            ]),
            l.$slots.buttons ? (c(), _("div", ns, [
              we(l.$slots, "buttons")
            ])) : H("", !0)
          ], 38)
        ], 32)
      ]),
      s.showDragOverlay ? (c(), _("div", os, [
        o("div", ss, w(s.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : H("", !0)
    ], 40, Zo));
  }
}), as = { class: "vuefinder__modal-header" }, is = { class: "vuefinder__modal-header__icon-container" }, ls = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, je = /* @__PURE__ */ ue({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (c(), _("div", as, [
      o("div", is, [
        (c(), Q(On(n.icon), { class: "vuefinder__modal-header__icon" }))
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
  return c(), _("svg", rs, [...e[0] || (e[0] = [
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
}, hs = { class: "vuefinder__about-modal__meta" }, gs = { class: "vuefinder__about-modal__meta-item" }, ys = { class: "vuefinder__about-modal__meta-label" }, ws = { class: "vuefinder__about-modal__meta-value" }, bs = { class: "vuefinder__about-modal__meta-item" }, ks = { class: "vuefinder__about-modal__meta-label" }, Gn = /* @__PURE__ */ ue({
  __name: "ModalAbout",
  setup(n) {
    const e = ce(), { t } = e.i18n;
    return (s, i) => (c(), Q(Ue, null, {
      buttons: de(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (r) => a(e).modal.close())
        }, w(a(t)("Close")), 1)
      ]),
      default: de(() => [
        o("div", cs, [
          Y(je, {
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
  return c(), _("svg", $s, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Yn = { render: xs }, Ss = { class: "vuefinder__delete-modal__content" }, Cs = { class: "vuefinder__delete-modal__form" }, Fs = { class: "vuefinder__delete-modal__description" }, Es = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ts = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ps = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ds = { class: "vuefinder__delete-modal__file-name" }, Ms = { class: "vuefinder__delete-modal__confirmation" }, Is = { class: "vuefinder__delete-modal__confirmation-label" }, As = { class: "vuefinder__delete-modal__confirmation-text" }, Os = ["disabled"], Dt = /* @__PURE__ */ ue({
  __name: "ModalDelete",
  setup(n) {
    const e = ce(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = oe(i.path), l = P(e.modal.data.items), d = P(!1), u = () => {
      l.value.length && d.value && e.adapter.delete({
        path: r.value.path,
        items: l.value.map(({ path: f, type: h }) => ({
          path: f,
          type: h
        }))
      }).then((f) => {
        t.success(s("Files deleted.")), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        t.error(De(f, s("Failed to delete files")));
      });
    };
    return (f, h) => (c(), Q(Ue, null, {
      buttons: de(() => [
        o("div", Ms, [
          o("label", Is, [
            ge(o("input", {
              "onUpdate:modelValue": h[0] || (h[0] = (p) => d.value = p),
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
          onClick: u
        }, w(a(s)("Yes, Delete!")), 9, Os),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[1] || (h[1] = (p) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: de(() => [
        o("div", null, [
          Y(je, {
            icon: a(Yn),
            title: a(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", Ss, [
            o("div", Cs, [
              o("p", Fs, w(a(s)("Are you sure you want to delete these files?")), 1),
              o("div", Es, [
                (c(!0), _(_e, null, he(l.value, (p) => (c(), _("p", {
                  key: p.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  p.type === "dir" ? (c(), _("svg", Ts, [...h[2] || (h[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (c(), _("svg", Ps, [...h[3] || (h[3] = [
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
  return c(), _("svg", Ls, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Xn = { render: Rs }, Bs = { class: "vuefinder__rename-modal__content" }, zs = { class: "vuefinder__rename-modal__item" }, Vs = { class: "vuefinder__rename-modal__item-info" }, Us = {
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
}, Hs = { class: "vuefinder__rename-modal__item-name" }, Mt = /* @__PURE__ */ ue({
  __name: "ModalRename",
  setup(n) {
    const e = ce(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = oe(i.path), l = P(e.modal.data.items[0]), d = P(l.value.basename), u = () => {
      d.value != l.value.basename && e.adapter.rename({
        path: r.value.path,
        item: l.value.path,
        name: d.value
      }).then((f) => {
        t.success(s("%s is renamed.", d.value)), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        t.error(De(f, s("Failed to rename")));
      });
    };
    return (f, h) => (c(), Q(Ue, null, {
      buttons: de(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: u
        }, w(a(s)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[1] || (h[1] = (p) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: de(() => [
        o("div", null, [
          Y(je, {
            icon: a(Xn),
            title: a(s)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", Bs, [
            o("div", zs, [
              o("p", Vs, [
                l.value.type === "dir" ? (c(), _("svg", Us, [...h[2] || (h[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (c(), _("svg", Ns, [...h[3] || (h[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Hs, w(l.value.basename), 1)
              ]),
              ge(o("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (p) => d.value = p),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: Ke(u, ["enter"])
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
  const n = ce(), e = O(() => n.features);
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
  return c(), _("svg", Ks, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Qn = { render: qs }, Ws = { class: "vuefinder__preview-chrome" }, Gs = { class: "vuefinder__preview-chrome__popover-host vuefinder__preview-chrome__info-host" }, Ys = ["title", "aria-label"], Xs = {
  key: 0,
  class: "vuefinder__preview-chrome__popover"
}, Qs = { class: "vuefinder__preview-chrome__popover-label" }, Js = { class: "vuefinder__preview-chrome__popover-value" }, Zs = ["title"], ea = { class: "vuefinder__preview-chrome__actions" }, ta = ["aria-label"], na = {
  key: 1,
  class: "vuefinder__preview-chrome__popover-host"
}, oa = ["title", "aria-label"], sa = {
  key: 0,
  class: "vuefinder__preview-chrome__popover"
}, aa = ["href", "download"], ia = { class: "vuefinder__preview-chrome__popover-hint" }, la = ["title", "aria-label"], ra = /* @__PURE__ */ ue({
  name: "PreviewChrome",
  __name: "PreviewChrome",
  emits: ["close-request"],
  setup(n, { emit: e }) {
    const t = e, s = ce(), { enabled: i } = Ne(), { t: r } = s.i18n, l = oe(s.fs.sortedFiles), d = O(() => l.value.filter((m) => m.type === "file")), u = O(
      () => d.value.findIndex((m) => m.path === s.modal.data.item.path)
    ), f = O(() => d.value.length), h = O(() => s.modal.controls ?? null), p = O(() => !!a(h.value?.isEditing));
    O(() => !!a(h.value?.isDirty));
    const v = P(!1), k = P(!1), b = (m) => {
      m === "info" ? (v.value = !v.value, k.value = !1) : (k.value = !k.value, v.value = !1);
    }, $ = (m) => {
      m.target.closest(".vuefinder__preview-chrome__popover-host") || (v.value = !1, k.value = !1);
    };
    be(() => document.addEventListener("mousedown", $)), bt(() => document.removeEventListener("mousedown", $));
    const g = O(() => {
      const m = s.modal.data.item, S = [
        { label: r("File Size"), value: s.filesize(m.file_size ?? 0) },
        { label: r("Last Modified"), value: js(m.last_modified ?? 0) }
      ];
      m.mime_type && S.push({ label: r("Type"), value: m.mime_type });
      const x = a(h.value?.extraInfo);
      if (Array.isArray(x))
        for (const L of x) S.push(L);
      return S.push({ label: r("Path"), value: m.path }), S;
    }), y = O(() => s.adapter.getDownloadUrl(s.modal.data.item));
    return (m, S) => (c(), _("div", Ws, [
      o("div", Gs, [
        o("button", {
          type: "button",
          class: se(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": v.value }]),
          title: a(r)("File info"),
          "aria-label": a(r)("File info"),
          onClick: S[0] || (S[0] = (x) => b("info"))
        }, [
          Y(a(en), { class: "vuefinder__preview-chrome__icon" })
        ], 10, Ys),
        v.value ? (c(), _("div", Xs, [
          (c(!0), _(_e, null, he(g.value, (x) => (c(), _("div", {
            key: x.label,
            class: "vuefinder__preview-chrome__popover-row"
          }, [
            o("span", Qs, w(x.label), 1),
            o("span", Js, w(x.value), 1)
          ]))), 128))
        ])) : H("", !0)
      ]),
      o("div", {
        id: "modal-title",
        class: "vuefinder__preview-chrome__title",
        title: a(s).modal.data.item.path
      }, w(a(s).modal.data.item.basename), 9, Zs),
      o("div", ea, [
        f.value > 1 && !p.value ? (c(), _("span", {
          key: 0,
          class: "vuefinder__preview-chrome__counter",
          "aria-label": a(r)("File %s of %s", String(u.value + 1), String(f.value))
        }, w(u.value + 1) + " / " + w(f.value), 9, ta)) : H("", !0),
        a(i)("download") && !p.value ? (c(), _("div", na, [
          o("button", {
            type: "button",
            class: se(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": k.value }]),
            title: a(r)("Download"),
            "aria-label": a(r)("Download"),
            onClick: S[1] || (S[1] = (x) => b("download"))
          }, [...S[3] || (S[3] = [
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
          k.value ? (c(), _("div", sa, [
            o("a", {
              href: y.value,
              download: y.value,
              target: "_blank",
              class: "vuefinder__preview-chrome__popover-action"
            }, [
              S[4] || (S[4] = o("svg", {
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
          ])) : H("", !0)
        ])) : H("", !0),
        o("button", {
          type: "button",
          class: "vuefinder__preview-chrome__btn vuefinder__preview-chrome__btn--icon vuefinder__preview-chrome__btn--close",
          title: a(r)("Close"),
          "aria-label": a(r)("Close"),
          onClick: S[2] || (S[2] = (x) => t("close-request"))
        }, [
          Y(a(Qn), { class: "vuefinder__preview-chrome__icon vuefinder__preview-chrome__icon--lg" })
        ], 8, la)
      ])
    ]));
  }
});
function tn(n) {
  const e = ce();
  be(() => {
    if (typeof e.modal.registerControls != "function") {
      console.warn(
        "[vuefinder] PreviewControls registration skipped: app.modal.registerControls is missing. Hard refresh the page to pick up the latest modal API."
      );
      return;
    }
    e.modal.registerControls(n);
  }), bt(() => {
    typeof e.modal.unregisterControls == "function" && e.modal.unregisterControls(n);
  });
}
const da = { class: "vuefinder__text-preview" }, ca = { class: "vuefinder__text-preview__body" }, ua = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, va = /* @__PURE__ */ ue({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-wfCgiWp4.js").then((m) => m.C),
      delay: 100
    }), s = e, i = P(""), r = P(""), l = P(!1), d = P(!1), u = ce(), f = Ve(u), { enabled: h } = Ne(), { t: p } = u.i18n;
    be(async () => {
      try {
        const m = await u.adapter.getContent({ path: u.modal.data.item.path });
        i.value = m.content, r.value = m.content, s("success");
      } catch (m) {
        De(m, "Failed to load text content"), s("success");
      }
    });
    const v = O(
      () => h("edit") && !u.fs.isReadOnly(u.modal.data.item)
    ), k = O(() => l.value), b = O(() => l.value && r.value !== i.value), $ = () => {
      r.value = i.value, l.value = !0, u.modal.setEditMode(!0);
    }, g = () => {
      l.value = !1, r.value = i.value, u.modal.setEditMode(!1);
    }, y = async () => {
      try {
        await u.adapter.save({
          path: u.modal.data.item.path,
          content: r.value
        }), i.value = r.value, f.success(p("Updated.")), l.value = !1, u.modal.setEditMode(!1), s("success");
      } catch (m) {
        f.error(De(m, p("Failed to save file")));
      }
    };
    return tn({
      isEditable: v,
      isEditing: k,
      isDirty: b,
      primaryActionLabel: O(() => p("Save")),
      enterEdit: $,
      commitEdit: y,
      cancelEdit: g
    }), (m, S) => (c(), _("div", da, [
      o("div", ca, [
        (c(), Q(Rn, {
          onResolve: S[2] || (S[2] = (x) => d.value = !0)
        }, {
          fallback: de(() => [
            l.value ? ge((c(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": S[1] || (S[1] = (x) => r.value = x),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [We, r.value]
            ]) : (c(), _("pre", ua, w(i.value), 1))
          ]),
          default: de(() => [
            Y(a(t), {
              "model-value": l.value ? r.value : i.value,
              readonly: !l.value,
              filename: a(u).modal.data.item.basename,
              "onUpdate:modelValue": S[0] || (S[0] = (x) => l.value ? r.value = x : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        ge(o("span", null, w(d.value), 513), [
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
}, jt = 1e3, Sa = /* @__PURE__ */ ue({
  name: "CsvPreview",
  __name: "Csv",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-wfCgiWp4.js").then((Z) => Z.C),
      delay: 100
    }), s = e, i = P(""), r = P(""), l = ft([]), d = ft([]), u = P(null), f = P(!1), h = P(!1), p = O(() => l.value.length > jt), v = O(() => p.value ? l.value.slice(0, jt) : l.value), k = ce(), b = Ve(k), { enabled: $ } = Ne(), { t: g } = k.i18n;
    async function y(Z) {
      try {
        const { parse: te } = await import("./papaparse.min-Brc8PWCw.js").then((D) => D.p), J = te(Z, {
          skipEmptyLines: !0,
          delimiter: ""
        });
        if (!J.data.length) {
          d.value = [], l.value = [];
          return;
        }
        const [G, ...E] = J.data;
        d.value = G ?? [], l.value = E, u.value = null;
      } catch (te) {
        u.value = De(te, g("Failed to parse CSV")), d.value = [], l.value = [];
      }
    }
    be(async () => {
      try {
        const Z = await k.adapter.getContent({ path: k.modal.data.item.path });
        i.value = Z.content, r.value = Z.content, await y(Z.content), s("success");
      } catch (Z) {
        De(Z, "Failed to load CSV content"), s("success");
      }
    });
    const m = O(() => !f.value && h.value), S = O(
      () => $("edit") && !k.fs.isReadOnly(k.modal.data.item)
    ), x = O(() => f.value), L = O(() => f.value && r.value !== i.value), C = () => {
      r.value = i.value, f.value = !0, h.value = !1, k.modal.setEditMode(!0);
    }, A = () => {
      f.value = !1, r.value = i.value, k.modal.setEditMode(!1);
    }, W = async () => {
      try {
        await k.adapter.save({ path: k.modal.data.item.path, content: r.value }), i.value = r.value, await y(i.value), b.success(g("Updated.")), f.value = !1, k.modal.setEditMode(!1), s("success");
      } catch (Z) {
        b.error(De(Z, g("Failed to save file")));
      }
    };
    return tn({
      isEditable: S,
      isEditing: x,
      isDirty: L,
      primaryActionLabel: O(() => g("Save")),
      enterEdit: C,
      commitEdit: W,
      cancelEdit: A
    }), (Z, te) => (c(), _("div", fa, [
      o("div", _a, [
        m.value ? (c(), _(_e, { key: 1 }, [
          u.value ? (c(), _("div", ma, w(u.value), 1)) : !l.value.length && !d.value.length ? (c(), _("div", ha, w(a(g)("No rows to display")), 1)) : (c(), _("div", ga, [
            o("table", ya, [
              o("thead", null, [
                o("tr", null, [
                  te[3] || (te[3] = o("th", { class: "vuefinder__csv-preview__row-num" }, null, -1)),
                  (c(!0), _(_e, null, he(d.value, (J, G) => (c(), _("th", {
                    key: G,
                    title: J
                  }, w(J), 9, wa))), 128))
                ])
              ]),
              o("tbody", null, [
                (c(!0), _(_e, null, he(v.value, (J, G) => (c(), _("tr", { key: G }, [
                  o("td", ba, w(G + 1), 1),
                  (c(!0), _(_e, null, he(J, (E, D) => (c(), _("td", {
                    key: D,
                    title: E
                  }, w(E), 9, ka))), 128))
                ]))), 128))
              ])
            ]),
            p.value ? (c(), _("div", $a, w(a(g)("Showing first %s rows out of %s", jt, l.value.length)), 1)) : H("", !0)
          ]))
        ], 64)) : (c(), Q(Rn, { key: 0 }, {
          fallback: de(() => [
            f.value ? ge((c(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": te[1] || (te[1] = (J) => r.value = J),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [We, r.value]
            ]) : (c(), _("pre", pa, w(i.value), 1))
          ]),
          default: de(() => [
            Y(a(t), {
              "model-value": f.value ? r.value : i.value,
              readonly: !f.value,
              filename: a(k).modal.data.item.basename,
              "onUpdate:modelValue": te[0] || (te[0] = (J) => f.value ? r.value = J : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        f.value ? H("", !0) : (c(), _("label", xa, [
          ge(o("input", {
            "onUpdate:modelValue": te[2] || (te[2] = (J) => h.value = J),
            type: "checkbox"
          }, null, 512), [
            [lt, h.value]
          ]),
          o("span", null, w(a(g)("Show as table")), 1)
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
  DONE: 10,
  // A restriction (e.g. allowedFileTypes) rejected the file before any upload
  // attempt was made - distinct from ERROR (which is a failed upload attempt),
  // since renaming can't fix a rejected file the way it could a transient
  // network failure.
  REJECTED: 4
};
function Jn(n) {
  const e = ce(), { t } = e.i18n, s = e.fs, i = oe(s.path), r = e.config, l = P({ QUEUE_ENTRY_STATUS: Se }), d = P(null), u = P(null), f = P(null), h = P(null), p = P(null), v = P([]), k = P(null), b = P(""), $ = P(!1), g = P(!1), y = P(null);
  let m;
  const S = (T) => {
    T.preventDefault(), T.stopPropagation(), g.value = !0;
  }, x = (T) => {
    T.preventDefault(), T.stopPropagation(), g.value = !0;
  }, L = (T) => {
    T.preventDefault(), T.stopPropagation(), (!T.relatedTarget || T.relatedTarget === document.body) && (g.value = !1);
  }, C = (T) => {
    T.preventDefault(), T.stopPropagation(), g.value = !1;
    const M = /^[/\\](.+)/, z = T.dataTransfer;
    z && (z.items && z.items.length ? Array.from(z.items).forEach((B) => {
      if (B.kind === "file") {
        const j = B.webkitGetAsEntry?.();
        if (j)
          nn((q, re) => {
            const ne = M.exec(q?.fullPath || "");
            Z(re, ne ? ne[1] : re.name);
          }, j);
        else {
          const q = B.getAsFile?.();
          q && Z(q);
        }
      }
    }) : z.files && z.files.length && Array.from(z.files).forEach((B) => Z(B)));
  }, A = (T) => v.value.findIndex((M) => M.id === T), W = (T, M) => m.addFile({ name: M || T.name, type: T.type, data: T, source: "Local" }), Z = (T, M) => {
    try {
      return W(T, M);
    } catch {
      return;
    }
  }, te = (T) => T.status === Se.ERROR || T.status === Se.CANCELED || T.status === Se.REJECTED, J = (T) => T.status === Se.DONE ? "text-green-600" : te(T) ? "text-red-600" : "", G = (T) => T.status === Se.DONE ? "✓" : te(T) ? "!" : "...", E = () => h.value?.click(), D = () => e.modal.close(), V = (T) => {
    if ($.value || !v.value.filter((M) => M.status !== Se.DONE).length) {
      $.value || (b.value = t("Please select file to upload first."));
      return;
    }
    b.value = "", y.value = T || i.value, m.upload();
  }, X = () => {
    m.cancelAll(), v.value.forEach((T) => {
      T.status !== Se.DONE && (T.status = Se.CANCELED, T.statusName = t("Canceled"));
    }), $.value = !1;
  }, fe = (T) => {
    $.value || (m.removeFile(T.id), v.value.splice(A(T.id), 1));
  }, U = (T) => {
    if (!$.value)
      if (m.cancelAll(), T) {
        const M = v.value.filter((z) => z.status !== Se.DONE);
        v.value = [], M.forEach((z) => Z(z.originalFile, z.name));
      } else
        v.value = [];
  }, I = (T) => {
    T.forEach((M) => {
      M instanceof File ? Z(M) : Z(M.file, M.name);
    });
  }, K = (T, M) => T.endsWith("://") || T.endsWith("/") ? T + M : T + "/" + M, R = async (T, M) => {
    const z = M.trim();
    if ($.value || !z) return;
    if (z.includes("/") || z.includes("\\")) {
      b.value = t("Name cannot contain slashes.");
      return;
    }
    const B = T.name.split("/");
    B[B.length - 1] = z;
    const j = B.join("/");
    if (j === T.name) return;
    if (T.status === Se.DONE) {
      const ie = y.value?.path || i.value.path, ke = K(ie, T.name), Pe = T.name.split("/");
      Pe.pop();
      const Je = Pe.length ? K(ie, Pe.join("/")) : ie;
      try {
        await e.adapter.rename({ path: Je, item: ke, name: z }), T.name = j, e.adapter.invalidateListQuery(ie), ie === i.value.path && e.adapter.open(ie);
      } catch (ee) {
        b.value = ee?.message || t("Failed to rename");
      }
      return;
    }
    const q = A(T.id);
    if (q === -1) return;
    const re = T.originalFile, ne = T.name;
    m.removeFile(T.id), v.value.splice(q, 1);
    let F;
    try {
      F = W(re, j);
    } catch (ie) {
      b.value = ie?.message || t("Failed to rename");
      try {
        W(re, ne);
      } catch {
      }
      return;
    }
    if (!F) return;
    const N = A(F);
    if (N !== -1 && N !== q) {
      const ie = v.value.splice(N, 1)[0];
      ie && v.value.splice(q, 0, ie);
    }
  };
  return be(() => {
    m = new Po({
      debug: e.debug,
      restrictions: { maxFileSize: Ho(r.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (B, j) => {
        if (j[B.id] != null) {
          const re = A(B.id);
          v.value[re]?.status === Se.PENDING && (b.value = m.i18n("noDuplicates", { fileName: B.name })), v.value = v.value.filter((ne) => ne.id !== B.id);
        }
        return v.value.push({
          id: B.id,
          name: B.name,
          size: e.filesize(B.size),
          status: Se.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: B.data
        }), !0;
      }
    });
    const T = {
      getTargetPath: () => (y.value || i.value).path
    };
    if (n)
      n(m, T);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(m, T);
    else
      throw new Error("No uploader configured");
    k.value = m.opts.restrictions?.allowedFileTypes ?? null, m.on("restriction-failed", (B, j) => {
      const q = v.value[A(B.id)];
      q && (q.status = Se.REJECTED, q.statusName = j.message);
    }), m.on("upload-start", (B) => {
      B.forEach((j) => {
        const q = v.value[A(j.id)];
        q && (q.status = Se.UPLOADING, q.statusName = t("Uploading"), q.percent = "0%");
      });
    }), m.on("upload-progress", (B, j) => {
      const q = j.bytesTotal ?? 1, re = Math.floor(j.bytesUploaded / q * 100), ne = A(B.id);
      ne !== -1 && v.value[ne] && (v.value[ne].percent = `${re}%`);
    }), m.on("upload-success", (B) => {
      const j = v.value[A(B.id)];
      j && (j.status = Se.DONE, j.statusName = t("Done"));
    }), m.on("upload-error", (B, j) => {
      const q = v.value[A(B.id)];
      q && (q.percent = null, q.status = Se.ERROR, q.statusName = j?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : j?.message || t("Unknown Error"));
    }), m.on("error", (B) => {
      b.value = B.message, $.value = !1;
    }), m.on("complete", (B) => {
      $.value = !1;
      const j = y.value || i.value;
      e.adapter.invalidateListQuery(j.path), e.adapter.open(j.path);
      const q = v.value.filter(
        (re) => re.status === Se.DONE && B.successful.includes(re.id)
      ).map((re) => re.name);
      e.emitter.emit("vf-upload-complete", q);
    }), h.value?.addEventListener("click", () => u.value?.click()), p.value?.addEventListener("click", () => f.value?.click());
    const M = { capture: !0 };
    document.addEventListener("dragover", S, M), document.addEventListener("dragenter", x, M), document.addEventListener("dragleave", L, M), document.addEventListener("drop", C, M);
    const z = (B) => {
      const j = B.target, q = j.files;
      if (q) {
        for (const re of q) Z(re, re.webkitRelativePath || void 0);
        j.value = "";
      }
    };
    u.value?.addEventListener("change", z), f.value?.addEventListener("change", z);
  }), Ae(() => {
    const T = { capture: !0 };
    document.removeEventListener("dragover", S, T), document.removeEventListener("dragenter", x, T), document.removeEventListener("dragleave", L, T), document.removeEventListener("drop", C, T);
  }), {
    container: d,
    internalFileInput: u,
    internalFolderInput: f,
    pickFiles: h,
    pickFolders: p,
    queue: v,
    allowedFileTypes: k,
    message: b,
    uploading: $,
    hasFilesInDropArea: g,
    definitions: l,
    openFileSelector: E,
    upload: V,
    cancel: X,
    remove: fe,
    clear: U,
    close: D,
    getClassNameForEntry: J,
    getIconForEntry: G,
    addExternalFiles: I,
    renameEntry: R
  };
}
const $n = "image/png", on = "image/jpeg", Ca = "image/webp";
function Fa(n) {
  const e = (n.split(".").pop() ?? "").toLowerCase();
  return e === "png" ? $n : e === "webp" ? Ca : e === "gif" ? $n : on;
}
function Zn(n) {
  return new Promise((e, t) => {
    const s = new Image();
    s.crossOrigin = "anonymous", s.onload = () => e(s), s.onerror = () => t(new Error("Failed to load image")), s.src = n;
  });
}
function eo(n, e) {
  const t = document.createElement("canvas");
  t.width = n, t.height = e;
  const s = t.getContext("2d");
  if (!s) throw new Error("Could not acquire 2D canvas context");
  return { canvas: t, ctx: s };
}
async function xn(n, e, t) {
  const s = await Zn(n), { canvas: i, ctx: r } = eo(s.naturalWidth, s.naturalHeight);
  return r.filter = e, r.drawImage(s, 0, 0), i.toDataURL(t, t === on ? 0.92 : void 0);
}
async function Ea(n, e, t, s, i) {
  const r = await Zn(n), l = r.naturalWidth, d = r.naturalHeight, u = e === 90 || e === 270, { canvas: f, ctx: h } = eo(u ? d : l, u ? l : d);
  return h.translate(f.width / 2, f.height / 2), e && h.rotate(e * Math.PI / 180), (t || s) && h.scale(t ? -1 : 1, s ? -1 : 1), h.drawImage(r, -l / 2, -d / 2), f.toDataURL(i, i === on ? 0.92 : void 0);
}
function Ta(n, e, t) {
  const s = 1 + n / 100, i = 1 + e / 100, r = 1 + t / 100;
  return `brightness(${s}) contrast(${i}) saturate(${r})`;
}
async function Pa(n) {
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
}, ri = { class: "vuefinder__image-editor__stage" }, di = ["src", "alt"], ci = { class: "vuefinder__image-editor__controls vuefinder__image-editor__controls--stacked" }, ui = { class: "vuefinder__image-editor__slider" }, vi = { class: "vuefinder__image-editor__slider" }, fi = { class: "vuefinder__image-editor__slider" }, _i = { class: "vuefinder__image-editor__row" }, pi = ["disabled"], mi = /* @__PURE__ */ ue({
  name: "ImageEditor",
  __name: "ImageEditor",
  props: {
    src: {},
    filename: {}
  },
  emits: ["update:src"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = ce(), { t: r } = i.i18n, l = P("crop"), d = P(!1), u = P(null), f = [
      { label: "Original", value: null },
      { label: "1:1", value: 1 },
      { label: "4:3", value: 4 / 3 },
      { label: "16:9", value: 16 / 9 },
      { label: "9:16", value: 9 / 16 }
    ], h = st("cropperRef"), p = P(0), v = P(!1), k = P(!1), b = P(!1), $ = P(0), g = P(0), y = P(0), m = O(
      () => Ta($.value, g.value, y.value)
    );
    me([() => t.src, l], () => {
      p.value = 0, v.value = !1, k.value = !1, b.value = !1, $.value = 0, g.value = 0, y.value = 0;
    });
    const S = O(() => Fa(t.filename)), x = O(() => {
      const I = [];
      return p.value && I.push(`rotate(${p.value}deg)`), v.value && I.push("scaleX(-1)"), k.value && I.push("scaleY(-1)"), I.length ? { transform: I.join(" ") } : {};
    }), L = (I) => {
      d.value || (l.value = I);
    }, C = () => {
      const K = h.value?.getResult()?.canvas;
      if (!K) return;
      const R = K.toDataURL(S.value, S.value === "image/jpeg" ? 0.92 : void 0);
      s("update:src", R);
    }, A = async () => {
      if (X.value) {
        d.value = !0;
        try {
          const I = await Ea(
            t.src,
            V.value,
            v.value,
            k.value,
            S.value
          );
          s("update:src", I);
        } finally {
          d.value = !1;
        }
      }
    }, W = async () => {
      if (b.value) {
        d.value = !0;
        try {
          const I = await xn(t.src, "grayscale(1)", S.value);
          s("update:src", I);
        } finally {
          d.value = !1;
        }
      }
    }, Z = async () => {
      if (!($.value === 0 && g.value === 0 && y.value === 0)) {
        d.value = !0;
        try {
          const I = await xn(t.src, m.value, S.value);
          s("update:src", I);
        } finally {
          d.value = !1;
        }
      }
    }, te = () => {
      $.value = 0, g.value = 0, y.value = 0;
    }, J = () => {
      p.value -= 90;
    }, G = () => {
      p.value += 90;
    }, E = () => {
      v.value = !v.value;
    }, D = () => {
      k.value = !k.value;
    }, V = O(
      () => (p.value % 360 + 360) % 360
    ), X = O(
      () => V.value !== 0 || v.value || k.value
    ), fe = O(
      () => $.value !== 0 || g.value !== 0 || y.value !== 0
    ), U = O(() => b.value);
    return (I, K) => (c(), _("div", Da, [
      o("div", Ma, [
        (c(), _(_e, null, he(["crop", "rotate", "grayscale", "adjust"], (R) => o("button", {
          key: R,
          type: "button",
          role: "tab",
          "aria-selected": l.value === R,
          class: se(["vuefinder__image-editor__tab", { "vuefinder__image-editor__tab--active": l.value === R }]),
          onClick: (T) => L(R)
        }, [
          R === "crop" ? (c(), _("svg", Aa, [...K[4] || (K[4] = [
            o("path", { d: "M6 2v16a2 2 0 0 0 2 2h14" }, null, -1),
            o("path", { d: "M2 6h16a2 2 0 0 1 2 2v14" }, null, -1)
          ])])) : R === "rotate" ? (c(), _("svg", Oa, [...K[5] || (K[5] = [
            o("polyline", { points: "23 4 23 10 17 10" }, null, -1),
            o("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" }, null, -1)
          ])])) : R === "grayscale" ? (c(), _("svg", La, [...K[6] || (K[6] = [
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
          ])])) : (c(), _("svg", Ra, [...K[7] || (K[7] = [
            Ct('<line x1="4" y1="6" x2="14" y2="6"></line><circle cx="17" cy="6" r="2"></circle><line x1="10" y1="12" x2="20" y2="12"></line><circle cx="7" cy="12" r="2"></circle><line x1="4" y1="18" x2="14" y2="18"></line><circle cx="17" cy="18" r="2"></circle>', 6)
          ])])),
          o("span", Ba, w(R === "crop" ? a(r)("Crop") : R === "rotate" ? a(r)("Rotate") : R === "grayscale" ? a(r)("Grayscale") : a(r)("Adjust")), 1)
        ], 10, Ia)), 64))
      ]),
      l.value === "crop" ? (c(), _("div", za, [
        o("div", Va, [
          Y(a(Do), {
            ref_key: "cropperRef",
            ref: h,
            class: "vuefinder__image-editor__cropper",
            crossorigin: "anonymous",
            src: t.src,
            "stencil-props": u.value === null ? {} : { aspectRatio: u.value },
            "auto-zoom": !0,
            priority: "image",
            transitions: !0
          }, null, 8, ["src", "stencil-props"])
        ]),
        o("div", Ua, [
          o("div", Na, [
            (c(), _(_e, null, he(f, (R) => o("button", {
              key: R.label,
              type: "button",
              class: se(["vuefinder__image-editor__chip", { "vuefinder__image-editor__chip--active": u.value === R.value }]),
              onClick: (T) => u.value = R.value
            }, w(a(r)(R.label)), 11, Ha)), 64))
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value,
            onClick: C
          }, w(a(r)("Apply")), 9, ja)
        ])
      ])) : l.value === "rotate" ? (c(), _("div", Ka, [
        o("div", qa, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Ie(x.value),
            alt: t.filename
          }, null, 12, Wa)
        ]),
        o("div", Ga, [
          o("div", Ya, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__icon-btn",
              title: a(r)("Rotate left 90°"),
              onClick: J
            }, [...K[8] || (K[8] = [
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
              onClick: G
            }, [...K[9] || (K[9] = [
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
              class: se(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": v.value }]),
              title: a(r)("Flip horizontal"),
              onClick: E
            }, [...K[10] || (K[10] = [
              Ct('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 7 8 11"></polyline><polyline points="16 3 20 7 16 11"></polyline><line x1="4" y1="7" x2="20" y2="7"></line><line x1="12" y1="13" x2="12" y2="21"></line></svg>', 1)
            ])], 10, Ja),
            o("button", {
              type: "button",
              class: se(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": k.value }]),
              title: a(r)("Flip vertical"),
              onClick: D
            }, [...K[11] || (K[11] = [
              Ct('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8 7 4 11 8"></polyline><polyline points="3 16 7 20 11 16"></polyline><line x1="7" y1="4" x2="7" y2="20"></line><line x1="13" y1="12" x2="21" y2="12"></line></svg>', 1)
            ])], 10, Za)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value || !X.value,
            onClick: A
          }, w(a(r)("Apply")), 9, ei)
        ])
      ])) : l.value === "grayscale" ? (c(), _("div", ti, [
        o("div", ni, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Ie(b.value ? { filter: "grayscale(1)" } : {}),
            alt: t.filename
          }, null, 12, oi)
        ]),
        o("div", si, [
          o("label", ai, [
            ge(o("input", {
              "onUpdate:modelValue": K[0] || (K[0] = (R) => b.value = R),
              type: "checkbox"
            }, null, 512), [
              [lt, b.value]
            ]),
            o("span", null, w(a(r)("Grayscale")), 1)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value || !U.value,
            onClick: W
          }, w(a(r)("Apply")), 9, ii)
        ])
      ])) : (c(), _("div", li, [
        o("div", ri, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Ie({ filter: m.value }),
            alt: t.filename
          }, null, 12, di)
        ]),
        o("div", ci, [
          o("div", ui, [
            o("label", null, [
              ye(w(a(r)("Brightness")), 1),
              o("span", null, w($.value), 1)
            ]),
            ge(o("input", {
              "onUpdate:modelValue": K[1] || (K[1] = (R) => $.value = R),
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
              o("span", null, w(g.value), 1)
            ]),
            ge(o("input", {
              "onUpdate:modelValue": K[2] || (K[2] = (R) => g.value = R),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                We,
                g.value,
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
            ge(o("input", {
              "onUpdate:modelValue": K[3] || (K[3] = (R) => y.value = R),
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
              onClick: te
            }, w(a(r)("Reset")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__apply",
              disabled: d.value || !fe.value,
              onClick: Z
            }, w(a(r)("Apply")), 9, pi)
          ])
        ])
      ]))
    ]));
  }
}), hi = { class: "vuefinder__image-preview" }, gi = ["src"], yi = ["aria-label", "title"], wi = ["aria-label", "title"], bi = ["aria-label", "title"], ki = 0.5, $i = 3, Sn = 0.25, xi = /* @__PURE__ */ ue({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, s = ce(), i = Ve(s), { enabled: r } = Ne(), { t: l } = s.i18n, d = P(!1), u = P(
      s.modal.data.item.previewUrl ?? s.adapter.getPreviewUrl({ path: s.modal.data.item.path })
    ), f = P(u.value), h = P(!1), p = P(1), v = P(null), k = P(0), b = P(0), $ = P(1), g = P(!1), y = P(0), m = P(0);
    let S = null, x = 0, L = 0, C = 0, A = 0;
    const { addExternalFiles: W, upload: Z, queue: te } = Jn(s.customUploader), J = s.fs, G = oe(J.path), E = O(() => k.value * $.value), D = O(() => b.value * $.value), V = (F, N) => {
      const ie = v.value?.clientWidth ?? 0, ke = v.value?.clientHeight ?? 0, Pe = Math.max(0, (E.value * p.value - ie) / 2), Je = Math.max(0, (D.value * p.value - ke) / 2);
      return {
        x: Math.min(Pe, Math.max(-Pe, F)),
        y: Math.min(Je, Math.max(-Je, N))
      };
    }, X = O(() => {
      if (!k.value || !b.value)
        return {};
      const { x: F, y: N } = V(y.value, m.value);
      return {
        width: `${E.value}px`,
        height: `${D.value}px`,
        transform: `translate(${F}px, ${N}px) scale(${p.value})`,
        transformOrigin: "center center"
      };
    }), fe = () => {
      if (!v.value || !k.value || !b.value) return;
      const F = v.value.getBoundingClientRect();
      !F.width || !F.height || ($.value = Math.min(F.width / k.value, F.height / b.value));
    }, U = (F) => {
      const N = F.target;
      N instanceof HTMLImageElement && (k.value = N.naturalWidth || N.clientWidth, b.value = N.naturalHeight || N.clientHeight, fe());
    }, I = (F) => Math.min($i, Math.max(ki, F)), K = () => {
      p.value = I(Number((p.value + Sn).toFixed(2)));
      const F = V(y.value, m.value);
      y.value = F.x, m.value = F.y;
    }, R = () => {
      p.value = I(Number((p.value - Sn).toFixed(2)));
      const F = V(y.value, m.value);
      y.value = F.x, m.value = F.y;
    }, T = () => {
      p.value = 1, y.value = 0, m.value = 0;
    }, M = (F) => {
      d.value || (F.deltaY > 0 ? R() : F.deltaY < 0 && K());
    }, z = (F) => {
      if (d.value) return;
      const N = F.target;
      if (N instanceof HTMLInputElement || N instanceof HTMLTextAreaElement || N?.isContentEditable)
        return;
      const ie = F.key === "=" || F.key === "+", ke = F.key === "-" || F.key === "_", Pe = F.key === "0";
      if (!(!ie && !ke && !Pe)) {
        if (F.preventDefault(), ie) {
          K();
          return;
        }
        if (ke) {
          R();
          return;
        }
        T();
      }
    }, B = () => {
      g.value = !1;
    }, j = (F) => {
      d.value || p.value <= 1 || !v.value || (g.value = !0, x = F.clientX, L = F.clientY, C = y.value, A = m.value, F.currentTarget?.setPointerCapture?.(F.pointerId));
    }, q = (F) => {
      if (!g.value) return;
      const N = F.clientX - x, ie = F.clientY - L, ke = V(C + N, A + ie);
      y.value = ke.x, m.value = ke.y;
    };
    tn({
      isEditable: O(
        () => r("edit") && !s.fs.isReadOnly(s.modal.data.item)
      ),
      isEditing: O(() => d.value),
      isDirty: O(() => d.value && h.value),
      primaryActionLabel: O(() => l("Save")),
      enterEdit: () => {
        f.value = u.value, h.value = !1, d.value = !0, s.modal.setEditMode(!0);
      },
      commitEdit: () => ne(),
      cancelEdit: () => {
        d.value = !1, f.value = u.value, h.value = !1, s.modal.setEditMode(!1);
      },
      extraInfo: O(() => !k.value || !b.value ? [] : [{ label: l("Dimensions"), value: `${k.value} × ${b.value}` }])
    });
    const re = (F) => {
      f.value = F, h.value = !0;
    }, ne = async () => {
      if (!h.value) return;
      const F = s.modal.data.item.basename, N = F.split(".").pop()?.toLowerCase() || "jpg", ie = N === "png" ? "image/png" : N === "gif" ? "image/gif" : "image/jpeg";
      try {
        const ke = await Pa(f.value), Pe = new File([ke], F, { type: ie }), ee = s.modal.data.item.path.split("/");
        ee.pop();
        const le = {
          path: ee.join("/") || (G.value?.path ?? "")
        };
        W([Pe]), await new Promise((Ee) => setTimeout(Ee, 100));
        const ve = te.value.find((Ee) => Ee.name === Pe.name);
        if (!ve)
          throw new Error("File was not added to upload queue");
        Z(le);
        let He = 0;
        for (; He < 150; ) {
          await new Promise((Ye) => setTimeout(Ye, 200));
          const Ee = te.value.find((Ye) => Ye.id === ve.id);
          if (Ee?.status === Se.DONE) break;
          if (Ee?.status === Se.ERROR)
            throw new Error(Ee.statusName || "Upload failed");
          He++;
        }
        i.success(l("Updated.")), await fetch(u.value, { cache: "reload", mode: "no-cors" });
        const Me = s.root?.querySelector?.('[data-src="' + u.value + '"]');
        Me && Me instanceof HTMLElement && Wt.resetStatus(Me), s.emitter.emit("vf-refresh-thumbnails"), d.value = !1, h.value = !1, f.value = u.value, s.modal.setEditMode(!1), t("success");
      } catch (ke) {
        i.error(De(ke, l("Failed to save image")));
      }
    };
    return be(() => {
      S = new ResizeObserver(() => {
        fe();
      }), v.value && S.observe(v.value), window.addEventListener("keydown", z), t("success");
    }), bt(() => {
      window.removeEventListener("keydown", z), S?.disconnect();
    }), (F, N) => (c(), _("div", hi, [
      o("div", {
        ref_key: "imageContainer",
        ref: v,
        class: "vuefinder__image-preview__image-container"
      }, [
        d.value ? (c(), Q(mi, {
          key: 1,
          src: f.value,
          filename: a(s).modal.data.item.basename,
          "onUpdate:src": re
        }, null, 8, ["src", "filename"])) : (c(), _("div", {
          key: 0,
          class: "vuefinder__image-preview__stage",
          onWheel: pe(M, ["prevent"])
        }, [
          o("img", {
            style: Ie(X.value),
            src: a(s).modal.data.item.previewUrl ?? a(s).adapter.getPreviewUrl({ path: a(s).modal.data.item.path }),
            class: se(["vuefinder__image-preview__image", {
              "vuefinder__image-preview__image--zoomed": p.value > 1,
              "vuefinder__image-preview__image--panning": g.value
            }]),
            draggable: !1,
            onLoad: U,
            onPointerdown: j,
            onPointermove: q,
            onPointerup: B,
            onPointercancel: B,
            onLostpointercapture: B
          }, null, 46, gi),
          o("div", {
            class: "vuefinder__image-preview__zoom-controls",
            onPointerdown: N[0] || (N[0] = pe(() => {
            }, ["stop"])),
            onWheel: N[1] || (N[1] = pe(() => {
            }, ["stop"]))
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(l)("Zoom out"),
              title: a(l)("Zoom out"),
              onClick: R
            }, [...N[2] || (N[2] = [
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
              onClick: T
            }, w(Math.round(p.value * 100)) + "% ", 9, wi),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(l)("Zoom in"),
              title: a(l)("Zoom in"),
              onClick: K
            }, [...N[3] || (N[3] = [
              Ct('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>', 1)
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
  return c(), _("svg", Si, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const gt = { render: Ci }, Fi = { class: "vuefinder__default-preview" }, Ei = { class: "vuefinder__default-preview__content" }, Ti = { class: "vuefinder__default-preview__icon-container" }, Pi = ["title"], Di = /* @__PURE__ */ ue({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ce(), s = e;
    return be(() => {
      s("success");
    }), (i, r) => (c(), _("div", Fi, [
      o("div", Ei, [
        o("div", Ti, [
          Y(a(gt), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            class: "vuefinder__default-preview__file-name",
            title: a(t).modal.data.item.path
          }, w(a(t).modal.data.item.basename), 9, Pi)
        ])
      ])
    ]));
  }
}), Mi = { class: "vuefinder__video-preview" }, Ii = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Ai = ["src"], Oi = /* @__PURE__ */ ue({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = ce(), s = e, i = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return be(() => {
      s("success");
    }), (r, l) => (c(), _("div", Mi, [
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
}, Bi = ["src"], zi = /* @__PURE__ */ ue({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e;
    ce();
    const s = () => {
      const i = ce();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return be(() => {
      t("success");
    }), (i, r) => (c(), _("div", Li, [
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
}), Vi = { class: "vuefinder__pdf-preview" }, Ui = ["data"], Ni = ["src"], Hi = /* @__PURE__ */ ue({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    ce();
    const t = e, s = () => {
      const i = ce();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return be(() => {
      t("success");
    }), (i, r) => (c(), _("div", Vi, [
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
}, Zi = { class: "vuefinder__preview-modal__edit-actions" }, el = ["disabled"], Cn = 8, tl = 1.4, nl = 0.22, dt = 220, ol = ".vuefinder__preview-chrome__title, .vuefinder__preview-modal__status-strip", Qe = /* @__PURE__ */ ue({
  __name: "ModalPreview",
  setup(n) {
    const e = ce(), { enabled: t } = Ne(), { t: s } = e.i18n, i = P(!1), r = (M) => {
      const z = (M || "").split("/").pop() || "", B = z.lastIndexOf(".");
      return B >= 0 ? z.slice(B + 1).toLowerCase() : "";
    }, l = (M, z) => {
      if (!z) return !1;
      const B = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), j = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), q = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), re = /* @__PURE__ */ new Set([
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
      return M === "image" ? B.has(z) : M === "video" ? j.has(z) : M === "audio" ? q.has(z) : M === "csv" ? z === "csv" || z === "tsv" : M === "text" ? re.has(z) : M === "application/pdf" ? z === "pdf" : !1;
    }, d = (M) => {
      const z = e.modal.data.forceType;
      if (z) return z === M;
      const B = e.modal.data.item.mime_type;
      if (B && typeof B == "string" && B.startsWith(M)) return !0;
      const j = r(e.modal.data.item.path);
      return l(M, j);
    }, u = t("preview");
    u || (i.value = !0);
    const f = O(() => e.modal.data.item), h = oe(e.fs.sortedFiles), p = O(() => h.value.filter((M) => M.type === "file")), v = O(
      () => p.value.findIndex((M) => M.path === f.value.path)
    ), k = O(() => !!a(e.modal.controls?.isEditable)), b = O(() => !!a(e.modal.controls?.isEditing)), $ = O(() => !!a(e.modal.controls?.isDirty)), g = O(
      () => a(e.modal.controls?.primaryActionLabel) ?? s("Save")
    ), y = async () => {
      await e.modal.controls?.enterEdit?.();
    }, m = async () => {
      await e.modal.controls?.commitEdit?.();
    }, S = async () => {
      $.value && !window.confirm(s("Discard unsaved changes?")) || await e.modal.controls?.cancelEdit?.();
    }, x = O(() => !b.value && v.value > 0), L = O(
      () => !b.value && v.value < p.value.length - 1
    ), C = () => {
      if (!x.value) return;
      const M = p.value[v.value - 1];
      M && (e.fs.clearSelection(), e.fs.select(M.path), e.modal.data.item = M, i.value = !1);
    }, A = () => {
      if (!L.value) return;
      const M = p.value[v.value + 1];
      M && (e.fs.clearSelection(), e.fs.select(M.path), e.modal.data.item = M, i.value = !1);
    }, W = () => {
      b.value && $.value && !window.confirm(s("Discard unsaved changes?")) || e.modal.close();
    }, Z = P(0), te = P(!1);
    let J = 0, G = 0, E = !1, D = !1;
    const V = O(() => ({
      transform: `translate3d(${Z.value}px, 0, 0)`,
      transition: te.value ? `transform ${dt}ms ease-out` : "none"
    })), X = (M, z) => {
      setTimeout(z, M);
    }, fe = (M) => {
      if (b.value || M.touches.length !== 1 || !M.target?.closest?.(ol)) return;
      const B = M.touches[0];
      B && (E = !0, D = !1, J = B.clientX, G = B.clientY, te.value = !1);
    }, U = (M) => {
      if (!E) return;
      const z = M.touches[0];
      if (!z) return;
      const B = z.clientX - J, j = z.clientY - G;
      if (!D) {
        if (Math.abs(B) < Cn && Math.abs(j) < Cn) return;
        if (Math.abs(B) < Math.abs(j) * tl) {
          E = !1;
          return;
        }
        D = !0;
      }
      let q = B;
      B > 0 && !x.value && (q = B * 0.3), B < 0 && !L.value && (q = B * 0.3), Z.value = q, M.cancelable && M.preventDefault();
    }, I = (M) => {
      const z = window.innerWidth || 1, B = M === "prev" ? z : -z, j = M === "prev" ? -z : z, q = M === "prev" ? C : A;
      te.value = !0, Z.value = B, X(dt, () => {
        q(), te.value = !1, Z.value = j, requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            te.value = !0, Z.value = 0, X(dt, () => {
              te.value = !1;
            });
          });
        });
      });
    }, K = () => {
      if (!E || (E = !1, !D)) return;
      const M = window.innerWidth || 1, z = Z.value, B = Math.abs(z) >= M * nl;
      if (B && z > 0 && x.value) {
        I("prev");
        return;
      }
      if (B && z < 0 && L.value) {
        I("next");
        return;
      }
      te.value = !0, Z.value = 0, X(dt, () => {
        te.value = !1;
      });
    }, R = () => {
      E && (E = !1, D && (te.value = !0, Z.value = 0, X(dt, () => {
        te.value = !1;
      })));
    }, T = (M) => {
      if (M.key === "Escape") {
        M.preventDefault(), M.stopPropagation(), W();
        return;
      }
      if ((M.metaKey || M.ctrlKey) && M.key.toLowerCase() === "s") {
        const z = e.modal.controls;
        if (z && a(z.isEditing)) {
          M.preventDefault(), z.commitEdit();
          return;
        }
      }
      b.value || (M.key === "ArrowLeft" || M.key === "ArrowRight") && (M.preventDefault(), M.stopPropagation(), M.key === "ArrowLeft" ? C() : A());
    };
    return be(() => {
      const M = document.querySelector(".vuefinder__preview-modal");
      M && M.focus();
    }), (M, z) => (c(), Q(Ue, {
      "on-request-close": W,
      "body-style": V.value,
      "body-class": "vuefinder__modal-layout__body--swipeable " + (b.value ? "vuefinder__modal-layout__body--editing" : ""),
      "on-body-touchstart": fe,
      "on-body-touchmove": U,
      "on-body-touchend": K,
      "on-body-touchcancel": R
    }, wo({
      default: de(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: T
        }, [
          Y(ra, { onCloseRequest: W }),
          (c(), Q(kt, { to: "body" }, [
            b.value ? H("", !0) : (c(), _("div", {
              key: 0,
              class: "vuefinder__themer vuefinder__preview-modal__nav-overlay",
              "data-theme": a(e).theme.current
            }, [
              o("button", {
                disabled: !x.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
                title: a(s)("Previous file"),
                onClick: C
              }, [...z[7] || (z[7] = [
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
                disabled: !L.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
                title: a(s)("Next file"),
                onClick: A
              }, [...z[8] || (z[8] = [
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
            a(u) ? (c(), _("div", Gi, [
              d("csv") ? (c(), Q(Sa, {
                key: `csv-${f.value.path}`,
                onSuccess: z[0] || (z[0] = (B) => i.value = !0)
              })) : d("text") ? (c(), Q(va, {
                key: `text-${f.value.path}`,
                onSuccess: z[1] || (z[1] = (B) => i.value = !0)
              })) : d("image") ? (c(), Q(xi, {
                key: `image-${f.value.path}`,
                onSuccess: z[2] || (z[2] = (B) => i.value = !0)
              })) : d("video") ? (c(), Q(Oi, {
                key: `video-${f.value.path}`,
                onSuccess: z[3] || (z[3] = (B) => i.value = !0)
              })) : d("audio") ? (c(), Q(zi, {
                key: `audio-${f.value.path}`,
                onSuccess: z[4] || (z[4] = (B) => i.value = !0)
              })) : d("application/pdf") ? (c(), Q(Hi, {
                key: `pdf-${f.value.path}`,
                onSuccess: z[5] || (z[5] = (B) => i.value = !0)
              })) : (c(), Q(Di, {
                key: `default-${f.value.path}`,
                onSuccess: z[6] || (z[6] = (B) => i.value = !0)
              }))
            ])) : H("", !0),
            b.value || p.value.length > 1 ? (c(), _("div", Yi, [
              b.value ? (c(), _("span", {
                key: 0,
                class: se(["vuefinder__preview-modal__edit-chip", { "vuefinder__preview-modal__edit-chip--dirty": $.value }])
              }, w($.value ? a(s)("Unsaved") : a(s)("Editing")), 3)) : (c(), _("span", {
                key: 1,
                class: "vuefinder__preview-modal__pagination-text",
                "aria-label": a(s)("File %s of %s", String(v.value + 1), String(p.value.length))
              }, w(v.value + 1) + " / " + w(p.value.length), 9, Xi))
            ])) : H("", !0),
            o("div", Qi, [
              i.value === !1 ? (c(), _("div", Ji, [
                z[9] || (z[9] = o("svg", {
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
              ])) : H("", !0)
            ])
          ])
        ], 32)
      ]),
      _: 2
    }, [
      k.value ? {
        name: "buttons",
        fn: de(() => [
          o("div", Zi, [
            b.value ? (c(), _(_e, { key: 1 }, [
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
                disabled: !$.value,
                onClick: m
              }, w(g.value), 9, el),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary vuefinder__preview-modal__edit-btn",
                onClick: S
              }, w(a(s)("Cancel")), 1)
            ], 64)) : (c(), _("button", {
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
  return c(), _("svg", sl, [...e[0] || (e[0] = [
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
  return c(), _("svg", ll, [...e[0] || (e[0] = [
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
  return c(), _("svg", dl, [...e[0] || (e[0] = [
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
  return c(), _("svg", ul, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const It = { render: vl }, fl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function _l(n, e) {
  return c(), _("svg", fl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const At = { render: _l }, pl = {
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
  return c(), _("svg", pl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const yt = { render: ml }, hl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function gl(n, e) {
  return c(), _("svg", hl, [...e[0] || (e[0] = [
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
  return c(), _("svg", yl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Ot = { render: wl }, bl = { class: "vuefinder__modal-tree__folder-item" }, kl = { class: "vuefinder__modal-tree__folder-content" }, $l = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, xl = { class: "vuefinder__modal-tree__folder-text" }, Sl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Cl = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Fl = 300, El = /* @__PURE__ */ ue({
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
    const t = ce(), { t: s } = t.i18n, i = t.fs, r = P({}), l = n, d = e;
    oe(i.path);
    const u = O(() => {
      const A = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[A] || !1;
    }), f = O(() => l.modelValue?.path === l.folder.path), h = O(() => l.currentPath?.path === l.folder.path), p = O(() => l.modalTreeData[l.folder.path] || []), v = O(() => {
      const A = p.value, W = r.value[l.folder.path] || 50;
      return A.length > W ? A.slice(0, W) : A;
    }), k = O(() => p.value.length), b = O(() => r.value[l.folder.path] || 50), $ = O(() => k.value > b.value), g = () => {
      r.value[l.folder.path] = (b.value || 50) + 50;
    }, y = O(() => p.value.length > 0 || l.folder.type === "dir"), m = () => {
      d("toggleFolder", l.storage, l.folder.path);
    }, S = () => {
      d("update:modelValue", l.folder);
    }, x = () => {
      d("update:modelValue", l.folder), d("selectAndClose", l.folder);
    };
    let L = 0;
    const C = () => {
      const A = Date.now();
      A - L < Fl ? x() : S(), L = A;
    };
    return (A, W) => {
      const Z = Bn("ModalTreeFolderItem", !0);
      return c(), _("div", bl, [
        o("div", kl, [
          y.value ? (c(), _("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: m
          }, [
            u.value ? (c(), Q(a(At), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (c(), Q(a(It), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (c(), _("div", $l)),
          o("div", {
            class: se(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": f.value,
              "vuefinder__modal-tree__folder-link--current": h.value
            }]),
            onClick: S,
            onDblclick: x,
            onTouchend: C
          }, [
            u.value ? (c(), Q(a(Ot), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (c(), Q(a(ze), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", xl, w(n.folder.basename), 1)
          ], 34)
        ]),
        u.value && y.value ? (c(), _("div", Sl, [
          (c(!0), _(_e, null, he(v.value, (te) => (c(), Q(Z, {
            key: te.path,
            folder: te,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": W[0] || (W[0] = (J) => A.$emit("update:modelValue", J)),
            onSelectAndClose: W[1] || (W[1] = (J) => A.$emit("selectAndClose", J)),
            onToggleFolder: W[2] || (W[2] = (J, G) => A.$emit("toggleFolder", J, G))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          $.value ? (c(), _("div", Cl, [
            o("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: g
            }, w(a(s)("load more")), 1)
          ])) : H("", !0)
        ])) : H("", !0)
      ]);
    };
  }
}), Tl = { class: "vuefinder__modal-tree" }, Pl = { class: "vuefinder__modal-tree__header" }, Dl = { class: "vuefinder__modal-tree__title" }, Ml = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Il = { class: "vuefinder__modal-tree__section-title" }, Al = { class: "vuefinder__modal-tree__list" }, Ol = ["onClick", "onDblclick", "onTouchend"], Ll = { class: "vuefinder__modal-tree__text" }, Rl = { class: "vuefinder__modal-tree__text-storage" }, Bl = { class: "vuefinder__modal-tree__section-title" }, zl = { class: "vuefinder__modal-tree__list" }, Vl = { class: "vuefinder__modal-tree__storage-item" }, Ul = { class: "vuefinder__modal-tree__storage-content" }, Nl = ["onClick"], Hl = ["onClick", "onDblclick", "onTouchend"], jl = { class: "vuefinder__modal-tree__storage-text" }, Kl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, ql = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Wl = ["onClick"], Fn = 300, $t = /* @__PURE__ */ ue({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = ce(), { t: s } = t.i18n, i = t.fs, r = t.config, l = e, d = oe(i.sortedFiles), u = oe(i.storages), f = O(() => u.value || []), h = oe(i.path), p = P(null), v = P({}), k = P({}), b = P({});
    me(d, (E) => {
      const D = E.filter((X) => X.type === "dir"), V = h.value?.path || "";
      V && (k.value[V] = D.map((X) => ({
        ...X,
        type: "dir"
      })));
    });
    const $ = (E, D) => {
      const V = `${E}:${D}`;
      v.value = {
        ...v.value,
        [V]: !v.value[V]
      }, v.value[V] && !k.value[D] && t.adapter.list(D).then((X) => {
        const U = (X.files || []).filter((I) => I.type === "dir");
        k.value[D] = U.map((I) => ({
          ...I,
          type: "dir"
        }));
      });
    }, g = (E) => k.value[E] || [], y = (E) => b.value[E] || 50, m = (E) => {
      const D = g(E), V = y(E);
      return D.length > V ? D.slice(0, V) : D;
    }, S = (E) => g(E).length, x = (E) => S(E) > y(E), L = (E) => {
      b.value[E] = y(E) + 50;
    }, C = (E) => {
      E && l("update:modelValue", E);
    }, A = (E) => {
      E && (l("update:modelValue", E), l("selectAndClose", E));
    }, W = (E) => {
      const D = {
        storage: E,
        path: E + "://",
        basename: E,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: E + "://"
      };
      l("update:modelValue", D);
    }, Z = (E) => {
      const D = {
        storage: E,
        path: E + "://",
        basename: E,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: E + "://"
      };
      l("update:modelValue", D), l("selectAndClose", D);
    };
    let te = 0;
    const J = (E) => {
      if (!E) return;
      const D = Date.now();
      D - te < Fn ? A(E) : C(E), te = D;
    }, G = (E) => {
      const D = Date.now();
      D - te < Fn ? Z(E) : W(E), te = D;
    };
    return be(() => {
      p.value && _t(p.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (E, D) => (c(), _("div", Tl, [
      o("div", Pl, [
        o("div", Dl, w(a(s)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: p,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && a(t).features.pinned && a(r).get("pinnedFolders").length ? (c(), _("div", Ml, [
          o("div", Il, w(a(s)("Pinned Folders")), 1),
          o("div", Al, [
            (c(!0), _(_e, null, he(a(r).get("pinnedFolders"), (V) => (c(), _("div", {
              key: V.path,
              class: se(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === V.path }]),
              onClick: (X) => C(V),
              onDblclick: (X) => A(V),
              onTouchend: (X) => J(V)
            }, [
              Y(a(ze), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", Ll, w(V.basename), 1),
              o("div", Rl, w(V.storage), 1),
              Y(a(yt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ol))), 128))
          ])
        ])) : H("", !0),
        o("div", Bl, w(a(s)("Storages")), 1),
        (c(!0), _(_e, null, he(f.value, (V) => (c(), _("div", {
          key: V,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", zl, [
            o("div", Vl, [
              o("div", Ul, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: pe((X) => $(V, V + "://"), ["stop"])
                }, [
                  v.value[`${V}:${V}://`] ? (c(), Q(a(At), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (c(), Q(a(It), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Nl),
                o("div", {
                  class: se(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === V + "://"
                  }]),
                  onClick: (X) => W(V),
                  onDblclick: (X) => Z(V),
                  onTouchend: (X) => G(V)
                }, [
                  Y(a(an), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", jl, w(V), 1)
                ], 42, Hl)
              ]),
              v.value[`${V}:${V}://`] ? (c(), _("div", Kl, [
                (c(!0), _(_e, null, he(m(V + "://"), (X) => (c(), Q(El, {
                  key: X.path,
                  folder: X,
                  storage: V,
                  "model-value": n.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": k.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": C,
                  onSelectAndClose: A,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                x(V + "://") ? (c(), _("div", ql, [
                  o("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (X) => L(V + "://")
                  }, w(a(s)("load more")), 9, Wl)
                ])) : H("", !0)
              ])) : H("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Gl = ["title"], Yt = /* @__PURE__ */ ue({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, s = ce(), { t: i } = s.i18n, r = P(!1), l = P(null), d = P(l.value?.innerHTML);
    me(d, () => r.value = !1);
    const u = () => {
      t("hidden"), r.value = !0;
    };
    return (f, h) => (c(), _("div", null, [
      r.value ? H("", !0) : (c(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: se(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        we(f.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: a(i)("Close"),
          onClick: u
        }, [...h[0] || (h[0] = [
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
}, ir = { class: "vuefinder__move-modal__checkbox-label" }, lr = { class: "vuefinder__move-modal__checkbox-text" }, rr = ["disabled"], dr = { class: "vuefinder__move-modal__selected-items" }, to = /* @__PURE__ */ ue({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = ce(), t = Ve(e), { enabled: s } = Ne(), { t: i } = e.i18n, r = n, l = P(e.modal.data.items.from), d = P(e.modal.data.items.to), u = P(""), f = P(r.copy || !s("move")), h = O(() => f.value ? "copy" : "move"), p = P(!1), v = oe(e.fs.path), k = O(() => f.value ? i("Copy files") : i("Move files")), b = O(
      () => f.value ? i("Are you sure you want to copy these files?") : i("Are you sure you want to move these files?")
    ), $ = O(() => f.value ? i("Yes, Copy!") : i("Yes, Move!"));
    O(() => f.value ? i("Files copied.") : i("Files moved."));
    const g = (C) => {
      C && (d.value = C);
    }, y = (C) => {
      C && (d.value = C, p.value = !1);
    }, m = O(() => {
      const C = d.value;
      return C ? l.value.some((A) => !!(C.path === A.path || A.type === "dir" && C.path.startsWith(A.path + "/"))) : !0;
    }), S = O(() => {
      if (!m.value)
        return "";
      const C = d.value;
      return C ? l.value.find((W) => C.path === W.path || W.type === "dir" && C.path.startsWith(W.path + "/")) ? i("Cannot move/copy item to itself or its own subfolder") : i("Invalid destination directory") : i("Please select a destination directory");
    }), x = () => {
      const C = d.value.path;
      if (!C) return { storage: "local", path: "" };
      if (C.endsWith("://"))
        return { storage: C.replace("://", ""), path: "" };
      const A = C.split("://");
      return {
        storage: A[0] || "local",
        path: A[1] || ""
      };
    }, L = async () => {
      if (l.value.length)
        try {
          const { files: C } = await e.adapter[h.value]({
            path: v.value.path,
            sources: l.value.map(({ path: A }) => A),
            destination: d.value.path
          });
          e.fs.setFiles(C), e.modal.close();
        } catch (C) {
          t.error(De(C, i("Failed to transfer files")));
        }
    };
    return (C, A) => (c(), Q(Ue, null, {
      buttons: de(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: m.value,
          onClick: L
        }, w($.value), 9, rr),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: A[4] || (A[4] = (W) => a(e).modal.close())
        }, w(a(i)("Cancel")), 1),
        o("div", dr, w(a(i)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: de(() => [
        o("div", null, [
          Y(je, {
            icon: f.value ? a(sn) : a(il),
            title: k.value
          }, null, 8, ["icon", "title"]),
          o("div", Yl, [
            o("p", Xl, w(b.value), 1),
            o("div", Ql, [
              (c(!0), _(_e, null, he(l.value, (W) => (c(), _("div", {
                key: W.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  W.type === "dir" ? (c(), Q(a(ze), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (c(), Q(a(gt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", Jl, w(W.path), 1)
              ]))), 128))
            ]),
            o("h4", Zl, w(a(i)("Target Directory")), 1),
            o("div", er, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: A[0] || (A[0] = (W) => p.value = !p.value)
              }, [
                o("div", tr, [
                  o("span", nr, w(x().storage) + "://", 1),
                  x().path ? (c(), _("span", or, w(x().path), 1)) : H("", !0)
                ]),
                o("span", sr, w(a(i)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: se([
                "vuefinder__move-modal__tree-selector",
                p.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              Y($t, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  A[1] || (A[1] = (W) => d.value = W),
                  g
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: y
              }, null, 8, ["modelValue"])
            ], 2),
            a(s)("copy") && a(s)("move") ? (c(), _("div", ar, [
              o("label", ir, [
                ge(o("input", {
                  "onUpdate:modelValue": A[2] || (A[2] = (W) => f.value = W),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [lt, f.value]
                ]),
                o("span", lr, w(a(i)("Create a copy instead of moving")), 1)
              ])
            ])) : H("", !0),
            S.value ? (c(), Q(Yt, {
              key: 1,
              error: ""
            }, {
              default: de(() => [
                ye(w(S.value), 1)
              ]),
              _: 1
            })) : H("", !0),
            u.value.length && !S.value ? (c(), Q(Yt, {
              key: 2,
              error: "",
              onHidden: A[3] || (A[3] = (W) => u.value = "")
            }, {
              default: de(() => [
                ye(w(u.value), 1)
              ]),
              _: 1
            })) : H("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), it = /* @__PURE__ */ ue({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (c(), Q(to, { copy: !1 }));
  }
}), ln = /* @__PURE__ */ ue({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (c(), Q(to, { copy: !0 }));
  }
}), cr = (n, e = 0, t = !1) => {
  let s;
  return (...i) => {
    t && !s && n(...i), clearTimeout(s), s = setTimeout(() => {
      n(...i);
    }, e);
  };
}, no = (n, e, t) => {
  const s = P(n);
  return bo((i, r) => ({
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
  return c(), _("svg", ur, [...e[0] || (e[0] = [
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
  return c(), _("svg", fr, [...e[0] || (e[0] = [
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
const Lt = { render: _r }, pr = { class: "vuefinder__search-modal__search-input" }, mr = ["value", "placeholder", "disabled"], hr = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, gr = /* @__PURE__ */ ue({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const s = t, i = ce(), { t: r } = i.i18n, l = P(null), d = (f) => {
      const h = f.target;
      s("update:modelValue", h.value);
    }, u = (f) => {
      s("keydown", f);
    };
    return e({
      focus: () => {
        l.value && l.value.focus();
      }
    }), (f, h) => (c(), _("div", pr, [
      Y(a(rn), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: l,
        value: n.modelValue,
        type: "text",
        placeholder: a(r)("Search files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: u,
        onKeyup: h[0] || (h[0] = pe(() => {
        }, ["stop"])),
        onInput: d
      }, null, 40, mr),
      n.isSearching ? (c(), _("div", hr, [
        Y(a(Lt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : H("", !0)
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
  return c(), _("svg", yr, [...e[0] || (e[0] = [
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
const oo = { render: wr }, br = ["disabled", "title"], kr = ["data-theme"], $r = { class: "vuefinder__search-modal__dropdown-content" }, xr = { class: "vuefinder__search-modal__dropdown-section" }, Sr = { class: "vuefinder__search-modal__dropdown-title" }, Cr = { class: "vuefinder__search-modal__dropdown-options" }, Fr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Er = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Tr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Pr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Dr = { class: "vuefinder__search-modal__dropdown-section" }, Mr = { class: "vuefinder__search-modal__dropdown-title" }, Ir = { class: "vuefinder__search-modal__dropdown-options" }, Ar = ["onClick"], Or = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Lr = /* @__PURE__ */ ue({
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
    const s = n, i = t, r = ce(), { t: l } = r.i18n, d = P(null), u = P(null);
    let f = null;
    const h = [
      { value: "name-asc", key: "Name (A-Z)" },
      { value: "name-desc", key: "Name (Z-A)" },
      { value: "size-asc", key: "Size (smallest)" },
      { value: "size-desc", key: "Size (largest)" },
      { value: "date-desc", key: "Date (newest)" },
      { value: "date-asc", key: "Date (oldest)" }
    ], p = (y) => {
      if (i("update:selectedOption", y), y.startsWith("size-")) {
        const m = y.split("-")[1];
        i("update:sizeFilter", m);
      }
    }, v = (y) => {
      i("update:sortBy", y);
    }, k = async () => {
      s.disabled || (s.visible ? (i("update:visible", !1), f && (f(), f = null)) : (i("update:visible", !0), await Oe(), await b()));
    }, b = async () => {
      if (!(!d.value || !u.value) && (await Oe(), !(!d.value || !u.value))) {
        Object.assign(u.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: y, y: m } = await at(d.value, u.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [pt(8), mt({ padding: 16 }), ht({ padding: 16 })]
          });
          Object.assign(u.value.style, {
            left: `${y}px`,
            top: `${m}px`
          }), requestAnimationFrame(() => {
            u.value && Object.assign(u.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (y) {
          console.warn("Floating UI initial positioning error:", y);
          return;
        }
        try {
          f = Xt(d.value, u.value, async () => {
            if (!(!d.value || !u.value))
              try {
                const { x: y, y: m } = await at(
                  d.value,
                  u.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [pt(8), mt({ padding: 16 }), ht({ padding: 16 })]
                  }
                );
                Object.assign(u.value.style, {
                  left: `${y}px`,
                  top: `${m}px`
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
      const m = ["size-all", "size-small", "size-medium", "size-large"], S = m.findIndex((x) => x === s.selectedOption);
      if (y.key === "ArrowDown") {
        y.preventDefault();
        const x = (S + 1) % m.length;
        i("update:selectedOption", m[x] || null);
      } else if (y.key === "ArrowUp") {
        y.preventDefault();
        const x = S <= 0 ? m.length - 1 : S - 1;
        i("update:selectedOption", m[x] || null);
      } else y.key === "Enter" ? (y.preventDefault(), s.selectedOption?.startsWith("size-") && i(
        "update:sizeFilter",
        s.selectedOption.split("-")[1]
      )) : y.key === "Escape" && (y.preventDefault(), i("update:visible", !1), f && (f(), f = null));
    }, g = () => {
      f && (f(), f = null);
    };
    return me(
      () => s.visible,
      (y) => {
        !y && f && (f(), f = null);
      }
    ), Ae(() => {
      g();
    }), e({
      cleanup: g
    }), (y, m) => (c(), _(_e, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: d,
        class: se(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: a(l)("Search Options"),
        onClick: pe(k, ["stop"])
      }, [
        Y(a(oo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, br),
      (c(), Q(kt, { to: "body" }, [
        n.visible ? (c(), _("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: u,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(r).theme.current,
          tabindex: "-1",
          onClick: m[4] || (m[4] = pe(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          o("div", $r, [
            o("div", xr, [
              o("div", Sr, w(a(l)("File Size")), 1),
              o("div", Cr, [
                o("div", {
                  class: se(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: m[0] || (m[0] = pe((S) => p("size-all"), ["stop"]))
                }, [
                  o("span", null, w(a(l)("All Files")), 1),
                  n.sizeFilter === "all" ? (c(), _("div", Fr, [...m[5] || (m[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 2),
                o("div", {
                  class: se(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: m[1] || (m[1] = pe((S) => p("size-small"), ["stop"]))
                }, [
                  o("span", null, w(a(l)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (c(), _("div", Er, [...m[6] || (m[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 2),
                o("div", {
                  class: se(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: m[2] || (m[2] = pe((S) => p("size-medium"), ["stop"]))
                }, [
                  o("span", null, w(a(l)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (c(), _("div", Tr, [...m[7] || (m[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 2),
                o("div", {
                  class: se(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: m[3] || (m[3] = pe((S) => p("size-large"), ["stop"]))
                }, [
                  o("span", null, w(a(l)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (c(), _("div", Pr, [...m[8] || (m[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 2)
              ])
            ]),
            o("div", Dr, [
              o("div", Mr, w(a(l)("Sort by")), 1),
              o("div", Ir, [
                (c(), _(_e, null, he(h, (S) => o("div", {
                  key: S.value,
                  class: se(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sortBy === S.value
                  }]),
                  onClick: pe((x) => v(S.value), ["stop"])
                }, [
                  o("span", null, w(a(l)(S.key)), 1),
                  n.sortBy === S.value ? (c(), _("div", Or, [...m[9] || (m[9] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 10, Ar)), 64))
              ])
            ])
          ])
        ], 40, kr)) : H("", !0)
      ]))
    ], 64));
  }
});
function Rt(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const s = t[1], i = t[2] ?? "", r = i.split("/").filter(Boolean), l = r.pop();
  if (!l) return s + i;
  let d = `${s}${r.join("/")}${r.length ? "/" : ""}${l}`;
  if (d.length <= e) return d;
  const u = l.split(/\.(?=[^\.]+$)/), f = u[0] ?? "", h = u[1] ?? "", p = f.length > 10 ? `${f.slice(0, 6)}...${f.slice(-5)}` : f, v = h ? `${p}.${h}` : p;
  return d = `${s}${r.join("/")}${r.length ? "/" : ""}${v}`, d.length > e && (d = `${s}.../${v}`), d;
}
async function so(n) {
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const e = document.createElement("textarea");
    e.value = n, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function wt(n) {
  await so(n);
}
async function Rr(n) {
  await so(n);
}
const Br = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function zr(n, e) {
  return c(), _("svg", Br, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const ao = { render: zr }, Vr = ["title"], Ur = { class: "vuefinder__search-modal__result-icon" }, Nr = { class: "vuefinder__search-modal__result-content" }, Hr = { class: "vuefinder__search-modal__result-name" }, jr = {
  key: 1,
  class: "vuefinder__search-modal__result-size"
}, Kr = ["title"], qr = ["title"], Wr = ["data-item-dropdown", "data-theme"], Gr = { class: "vuefinder__search-modal__item-dropdown-content" }, Yr = /* @__PURE__ */ ue({
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
    const t = n, s = e, i = ce(), { t: r } = i.i18n, { enabled: l } = Ne(), d = oe(i.config.state), u = O(() => l("pinned")), f = O(
      () => d.value.pinnedFolders.some((E) => E.path === t.item.path)
    ), h = (E) => {
      const D = i.config.get("pinnedFolders");
      D.some((V) => V.path === E.path) ? i.config.set(
        "pinnedFolders",
        D.filter((V) => V.path !== E.path)
      ) : i.config.set("pinnedFolders", [...D, E]);
    }, p = P(null);
    let v = null, k = null, b = [], $ = null;
    me(
      () => t.activeDropdown,
      (E) => {
        v && (v(), v = null), k && (b.forEach((D) => {
          D === window ? window.removeEventListener("scroll", k, !0) : D.removeEventListener("scroll", k, !0);
        }), k = null, b = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null), E === t.item.path && p.value && Oe(() => {
          C(t.item.path, p.value), y(), m();
        });
      }
    );
    const g = (E) => {
      const D = [];
      let V = E;
      for (; V && V !== document.body && V !== document.documentElement; ) {
        const X = window.getComputedStyle(V), fe = X.overflow + X.overflowX + X.overflowY;
        (fe.includes("scroll") || fe.includes("auto")) && D.push(V), V = V.parentElement;
      }
      return D;
    }, y = () => {
      if (t.activeDropdown !== t.item.path) return;
      const E = g(p.value);
      b = [window, ...E], k = () => {
        t.activeDropdown === t.item.path && s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const D = k;
      D && b.forEach((V) => {
        V === window ? window.addEventListener("scroll", D, !0) : V.addEventListener("scroll", D, !0);
      });
    }, m = () => {
      t.activeDropdown === t.item.path && ($ = (E) => {
        if (t.activeDropdown !== t.item.path) return;
        const D = E.target;
        if (!D) return;
        const V = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (V && V.contains(D) || p.value && p.value.contains(D))
          return;
        const X = i.root;
        if (X && X.contains(D)) {
          s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const fe = document.querySelector(".vuefinder__modal-layout");
        if (fe && fe.contains(D)) {
          s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        $ && (document.addEventListener("mousedown", $, !0), document.addEventListener("touchstart", $, !0));
      }, 100));
    };
    Ae(() => {
      v && (v(), v = null), k && (b.forEach((E) => {
        E === window ? window.removeEventListener("scroll", k, !0) : E.removeEventListener("scroll", k, !0);
      }), k = null, b = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null);
    });
    const S = (E) => t.expandedPaths.has(E), x = (E) => E.type === "dir" || !E.file_size ? "" : Jt(E.file_size), L = (E, D) => {
      D.stopPropagation(), s("toggleItemDropdown", E, D);
    }, C = async (E, D) => {
      const V = document.querySelector(
        `[data-item-dropdown="${E}"]`
      );
      if (!(!V || !D) && (await Oe(), !(!V || !D))) {
        Object.assign(V.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: X, y: fe } = await at(D, V, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [pt(8), mt({ padding: 16 }), ht({ padding: 16 })]
          });
          Object.assign(V.style, {
            left: `${X}px`,
            top: `${fe}px`
          }), requestAnimationFrame(() => {
            V && Object.assign(V.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (X) {
          console.warn("Floating UI initial positioning error:", X);
          return;
        }
        try {
          v = Xt(D, V, async () => {
            if (!(!D || !V))
              try {
                const { x: X, y: fe } = await at(D, V, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [pt(8), mt({ padding: 16 }), ht({ padding: 16 })]
                });
                Object.assign(V.style, {
                  left: `${X}px`,
                  top: `${fe}px`
                });
              } catch (X) {
                console.warn("Floating UI positioning error:", X);
              }
          });
        } catch (X) {
          console.warn("Floating UI autoUpdate setup error:", X), v = null;
        }
      }
    }, A = (E) => {
      s("update:selectedItemDropdownOption", E);
    }, W = async (E) => {
      await wt(E.path), s("copyPath", E);
    }, Z = (E) => {
      s("openContainingFolder", E);
    }, te = (E) => {
      s("preview", E);
    }, J = (E) => {
      s("open", E);
    }, G = (E) => {
      if (!t.activeDropdown) return;
      const D = ["copy-path", "open-folder", "preview"], V = t.selectedItemDropdownOption, X = D.findIndex((fe) => V?.includes(fe));
      if (E.key === "ArrowDown") {
        E.preventDefault();
        const fe = (X + 1) % D.length;
        s(
          "update:selectedItemDropdownOption",
          `${D[fe] || ""}-${t.activeDropdown}`
        );
      } else if (E.key === "ArrowUp") {
        E.preventDefault();
        const fe = X <= 0 ? D.length - 1 : X - 1;
        s(
          "update:selectedItemDropdownOption",
          `${D[fe] || ""}-${t.activeDropdown}`
        );
      } else E.key === "Enter" ? (E.preventDefault(), V && (V.includes("copy-path") ? W(t.item) : V.includes("open-folder") ? Z(t.item) : V.includes("preview") && te(t.item))) : E.key === "Escape" && (E.preventDefault(), s("update:selectedItemDropdownOption", null));
    };
    return (E, D) => (c(), _("div", {
      class: se(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: D[13] || (D[13] = (V) => s("select", n.index)),
      onDblclick: D[14] || (D[14] = pe((V) => s("activate", n.item), ["stop"]))
    }, [
      o("div", Ur, [
        n.item.type === "dir" ? (c(), Q(a(ze), { key: 0 })) : (c(), Q(a(gt), { key: 1 }))
      ]),
      o("div", Nr, [
        o("div", Hr, [
          n.item.type === "dir" && u.value && f.value ? (c(), Q(a(yt), {
            key: 0,
            class: "vuefinder__search-modal__result-pin",
            title: a(r)("Pinned")
          }, null, 8, ["title"])) : H("", !0),
          ye(" " + w(n.item.basename) + " ", 1),
          x(n.item) ? (c(), _("span", jr, w(x(n.item)), 1)) : H("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: D[0] || (D[0] = pe((V) => {
            s("select", n.index), s("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, w(S(n.item.path) ? n.item.path : a(Rt)(n.item.path)), 9, Kr)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: p,
        class: "vuefinder__search-modal__result-actions",
        title: a(r)("More actions"),
        onClick: D[1] || (D[1] = (V) => {
          s("selectWithDropdown", n.index), L(n.item.path, V);
        })
      }, [
        Y(a(ao), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, qr),
      (c(), Q(kt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (c(), _("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(i).theme.current,
          tabindex: "-1",
          onClick: D[12] || (D[12] = pe(() => {
          }, ["stop"])),
          onKeydown: G
        }, [
          o("div", Gr, [
            o("div", {
              class: se(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: D[2] || (D[2] = (V) => {
                A(`copy-path-${n.item.path}`), W(n.item);
              }),
              onFocus: D[3] || (D[3] = (V) => A(`copy-path-${n.item.path}`))
            }, [
              Y(a(sn), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(r)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: se(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: D[4] || (D[4] = (V) => {
                A(`open-folder-${n.item.path}`), Z(n.item);
              }),
              onFocus: D[5] || (D[5] = (V) => A(`open-folder-${n.item.path}`))
            }, [
              Y(a(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(r)("Open Containing Folder")), 1)
            ], 34),
            n.item.type === "dir" ? (c(), _("div", {
              key: 0,
              class: se(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-${n.item.path}`
              }]),
              onClick: D[6] || (D[6] = (V) => {
                A(`open-${n.item.path}`), J(n.item);
              }),
              onFocus: D[7] || (D[7] = (V) => A(`open-${n.item.path}`))
            }, [
              Y(a(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(r)("Open")), 1)
            ], 34)) : H("", !0),
            n.item.type === "dir" && u.value ? (c(), _("div", {
              key: 1,
              class: se(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `pin-${n.item.path}`
              }]),
              onClick: D[8] || (D[8] = (V) => {
                A(`pin-${n.item.path}`), h(n.item);
              }),
              onFocus: D[9] || (D[9] = (V) => A(`pin-${n.item.path}`))
            }, [
              Y(a(yt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(f.value ? a(r)("Unpin Folder") : a(r)("Pin Folder")), 1)
            ], 34)) : (c(), _("div", {
              key: 2,
              class: se(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: D[10] || (D[10] = (V) => {
                A(`preview-${n.item.path}`), te(n.item);
              }),
              onFocus: D[11] || (D[11] = (V) => A(`preview-${n.item.path}`))
            }, [
              Y(a(gt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, w(a(r)("Preview")), 1)
            ], 34))
          ])
        ], 40, Wr)) : H("", !0)
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
}, ed = { class: "vuefinder__search-modal__results-header" }, tt = 60, En = 5, td = /* @__PURE__ */ ue({
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
    const s = n, i = t, r = ce(), { t: l } = r.i18n, d = st("scrollableContainer"), u = O(() => s.searchResults.length > 0), f = O(() => s.searchResults.length), h = P(0), p = P(600), v = O(() => s.searchResults.length * tt), k = O(() => {
      const S = Math.max(0, Math.floor(h.value / tt) - En), x = Math.min(
        s.searchResults.length,
        Math.ceil((h.value + p.value) / tt) + En
      );
      return { start: S, end: x };
    }), b = O(() => {
      const { start: S, end: x } = k.value;
      return s.searchResults.slice(S, x).map((L, C) => ({
        item: L,
        index: S + C,
        top: (S + C) * tt
      }));
    }), $ = (S) => {
      const x = S.target;
      h.value = x.scrollTop;
    }, g = () => {
      d.value && (p.value = d.value.clientHeight);
    }, y = () => {
      if (s.selectedIndex >= 0 && d.value) {
        const S = s.selectedIndex * tt, x = S + tt, L = d.value.scrollTop, C = d.value.clientHeight, A = L + C;
        let W = L;
        S < L ? W = S : x > A && (W = x - C), W !== L && d.value.scrollTo({
          top: W,
          behavior: "smooth"
        });
      }
    }, m = () => {
      d.value && (d.value.scrollTop = 0, h.value = 0);
    };
    return be(() => {
      g(), window.addEventListener("resize", g);
    }), Ae(() => {
      window.removeEventListener("resize", g);
    }), me(
      () => d.value,
      () => {
        g();
      }
    ), e({
      scrollSelectedIntoView: y,
      resetScroll: m,
      getContainerHeight: () => p.value,
      scrollTop: () => h.value
    }), (S, x) => (c(), _("div", {
      class: se(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (c(), _("div", Xr, [
        o("div", Qr, [
          Y(a(Lt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, w(a(l)("Searching...")), 1)
      ])) : u.value ? (c(), _("div", Zr, [
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
            style: Ie({ height: `${v.value}px`, position: "relative" })
          }, [
            (c(!0), _(_e, null, he(b.value, (L) => (c(), _("div", {
              key: L.item.path,
              style: Ie({
                position: "absolute",
                top: `${L.top}px`,
                left: "0",
                width: "100%",
                height: `${tt}px`
              })
            }, [
              Y(Yr, {
                item: L.item,
                index: L.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: x[0] || (x[0] = (C) => i("selectResultItem", C)),
                onSelectWithDropdown: x[1] || (x[1] = (C) => i("selectResultItemWithDropdown", C)),
                onTogglePathExpansion: x[2] || (x[2] = (C) => i("togglePathExpansion", C)),
                onToggleItemDropdown: x[3] || (x[3] = (C, A) => i("toggleItemDropdown", C, A)),
                "onUpdate:selectedItemDropdownOption": x[4] || (x[4] = (C) => i("update:selectedItemDropdownOption", C)),
                onCopyPath: x[5] || (x[5] = (C) => i("copyPath", C)),
                onOpenContainingFolder: x[6] || (x[6] = (C) => i("openContainingFolder", C)),
                onOpen: x[7] || (x[7] = (C) => i("open", C)),
                onPreview: x[8] || (x[8] = (C) => i("preview", C)),
                onActivate: x[9] || (x[9] = (C) => i("activate", C))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (c(), _("div", Jr, [
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
}, ud = { class: "vuefinder__search-modal__instructions-text" }, dn = /* @__PURE__ */ ue({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = ce(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = P(null), l = P(null), d = P(null), u = no("", 300), f = P([]), h = P(!1), p = P(-1);
    let v = null;
    const k = P(!1), b = P(!1), $ = P(null), g = P("all"), y = P(!1), m = P("name-asc"), S = {
      "name-asc": { column: "basename", direction: 1 },
      "name-desc": { column: "basename", direction: -1 },
      "size-asc": { column: "file_size", direction: 1 },
      "size-desc": { column: "file_size", direction: -1 },
      "date-asc": { column: "last_modified", direction: 1 },
      "date-desc": { column: "last_modified", direction: -1 }
    }, x = O(() => {
      const { column: j, direction: q } = S[m.value];
      return f.value.slice().sort((re, ne) => qn(re[j], ne[j]) * q);
    }), L = P(`size-${g.value}`), C = P(null), A = P(/* @__PURE__ */ new Set()), W = P(null), Z = oe(i.path), te = (j) => {
      A.value.has(j) ? A.value.delete(j) : A.value.add(j);
    }, J = (j, q) => {
      q && typeof q.stopPropagation == "function" && q.stopPropagation(), W.value === j ? W.value = null : W.value = j;
    }, G = () => {
      W.value = null;
    }, E = (j) => {
      try {
        const q = j.dir || `${j.storage}://`;
        e.adapter.open(q), e.modal.close(), G();
      } catch {
        t.error(s("Failed to open containing folder"));
      }
    }, D = (j) => {
      e.modal.open(Qe, {
        storage: Z?.value?.storage ?? "local",
        item: j
      }), G();
    }, V = (j) => {
      e.adapter.open(j.path), e.modal.close(), G();
    }, X = (j) => {
      j.type === "dir" ? V(j) : D(j);
    }, fe = (j) => {
      p.value = j, G();
    }, U = (j) => {
      p.value = j;
    }, I = async (j) => {
      await wt(j.path), G();
    };
    me(u, async (j) => {
      j.trim() ? (await R(j.trim()), p.value = 0) : (v && (v.abort(), v = null), f.value = [], h.value = !1, p.value = -1);
    }), me(g, async (j) => {
      L.value = `size-${j}`, u.value.trim() && !b.value && (await R(u.value.trim()), p.value = 0);
    }), me(y, async () => {
      u.value.trim() && !b.value && (await R(u.value.trim()), p.value = 0);
    });
    const K = (j) => {
      if (!j || typeof j != "object") return !1;
      const q = j.name;
      return q === "AbortError" || q === "CanceledError";
    }, R = async (j) => {
      if (!j) return;
      v && v.abort();
      const q = new AbortController();
      v = q, h.value = !0;
      try {
        const re = $.value?.path || Z?.value?.path, ne = await e.adapter.search({
          path: re,
          filter: j,
          deep: y.value,
          size: g.value,
          signal: q.signal
        });
        if (q.signal.aborted) return;
        f.value = ne || [], h.value = !1;
      } catch (re) {
        if (K(re) || q.signal.aborted) return;
        t.error(De(re, s("Search failed"))), f.value = [], h.value = !1;
      }
    };
    be(() => {
      document.addEventListener("click", B), L.value = `size-${g.value}`;
    });
    const T = () => {
      b.value ? (b.value = !1, u.value.trim() && (R(u.value.trim()), p.value = 0)) : (k.value = !1, b.value = !0);
    }, M = (j) => {
      j && ($.value = j);
    }, z = (j) => {
      j && (M(j), b.value = !1, u.value.trim() && (R(u.value.trim()), p.value = 0));
    };
    Ae(() => {
      document.removeEventListener("click", B), v && (v.abort(), v = null), l.value && l.value.cleanup();
    });
    const B = (j) => {
      const q = j.target;
      if (k.value && (q.closest(".vuefinder__search-modal__dropdown") || (k.value = !1, Oe(() => {
        r.value && r.value.focus();
      }))), W.value) {
        const re = q.closest(".vuefinder__search-modal__item-dropdown"), ne = q.closest(".vuefinder__search-modal__result-item");
        !re && !ne && G();
      }
    };
    return (j, q) => (c(), Q(Ue, { class: "vuefinder__search-modal-layout" }, {
      default: de(() => [
        o("div", nd, [
          Y(je, {
            icon: a(rn),
            title: a(s)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", od, [
            o("div", sd, [
              Y(gr, {
                ref_key: "searchInputRef",
                ref: r,
                modelValue: a(u),
                "onUpdate:modelValue": q[0] || (q[0] = (re) => zn(u) ? u.value = re : null),
                "is-searching": h.value,
                disabled: b.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              Y(Lr, {
                ref_key: "searchOptionsDropdownRef",
                ref: l,
                visible: k.value,
                "onUpdate:visible": q[1] || (q[1] = (re) => k.value = re),
                "size-filter": g.value,
                "onUpdate:sizeFilter": q[2] || (q[2] = (re) => g.value = re),
                "selected-option": L.value,
                "onUpdate:selectedOption": q[3] || (q[3] = (re) => L.value = re),
                "sort-by": m.value,
                "onUpdate:sortBy": q[4] || (q[4] = (re) => m.value = re),
                disabled: b.value
              }, null, 8, ["visible", "size-filter", "selected-option", "sort-by", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: q[8] || (q[8] = pe(() => {
              }, ["stop"]))
            }, [
              o("div", ad, [
                o("button", {
                  class: se(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": b.value }]),
                  onClick: pe(T, ["stop"])
                }, [
                  Y(a(ze), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: $.value?.path || a(Z).path
                  }, w(a(Rt)($.value?.path || a(Z).path)), 9, id),
                  q[11] || (q[11] = o("svg", {
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
                onClick: q[7] || (q[7] = pe(() => {
                }, ["stop"]))
              }, [
                ge(o("input", {
                  "onUpdate:modelValue": q[5] || (q[5] = (re) => y.value = re),
                  type: "checkbox",
                  disabled: b.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: q[6] || (q[6] = pe(() => {
                  }, ["stop"]))
                }, null, 8, ld), [
                  [lt, y.value]
                ]),
                o("span", null, w(a(s)("Include subfolders")), 1)
              ])
            ]),
            b.value ? (c(), _("div", rd, [
              o("div", dd, [
                Y($t, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [
                    q[9] || (q[9] = (re) => $.value = re),
                    M
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(Z),
                  onSelectAndClose: z
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : H("", !0),
            !a(u).trim() && !b.value ? (c(), _("div", cd, [
              o("p", ud, w(a(s)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : H("", !0),
            a(u).trim() && !b.value ? (c(), Q(td, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": x.value,
              "is-searching": h.value,
              "selected-index": p.value,
              "expanded-paths": A.value,
              "active-dropdown": W.value,
              "selected-item-dropdown-option": C.value,
              "results-enter": !0,
              onSelectResultItem: fe,
              onSelectResultItemWithDropdown: U,
              onTogglePathExpansion: te,
              onToggleItemDropdown: J,
              "onUpdate:selectedItemDropdownOption": q[10] || (q[10] = (re) => C.value = re),
              onCopyPath: I,
              onOpenContainingFolder: E,
              onOpen: V,
              onPreview: D,
              onActivate: X
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : H("", !0)
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
    const s = ce(), i = P(!1), { t: r } = s.i18n;
    let l = null;
    const d = () => {
      l && clearTimeout(l), i.value = !0, l = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return be(() => {
      s.emitter.on(n.on, d);
    }), Ae(() => {
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
  return c(), _("div", {
    class: se(["vuefinder__action-message", { "vuefinder__action-message--hidden": !s.shown }])
  }, [
    n.$slots.default ? we(n.$slots, "default", { key: 0 }) : (c(), _("span", _d, w(s.t("Saved.")), 1))
  ], 2);
}
const Tn = /* @__PURE__ */ fd(vd, [["render", pd]]), md = [
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
}, Fd = { class: "vuefinder__settings-modal__input-group" }, Ed = ["value"], Td = { class: "vuefinder__settings-modal__reset-section" }, Pd = { class: "vuefinder__settings-modal__reset-content" }, Dd = { class: "vuefinder__settings-modal__reset-title" }, Md = { class: "vuefinder__settings-modal__reset-description" }, io = /* @__PURE__ */ ue({
  __name: "ModalSettings",
  setup(n) {
    const e = ce(), { enabled: t } = Ne(), s = e.config, { clearStore: i } = e.storage, { t: r, localeAtom: l } = e.i18n, d = oe(l), u = O({
      get: () => String(d.value || "en"),
      set: (g) => l.set(g || "en")
    }), f = oe(s.state), h = O(() => f.value.theme || "silver"), p = async () => {
      s.reset(), i(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, v = (g) => {
      s.set("theme", g), e.emitter.emit("vf-theme-saved");
    }, { i18n: k } = Ft("VueFinderOptions"), $ = Object.fromEntries(
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
      }).filter(([g]) => Object.keys(k).includes(g))
    );
    return (g, y) => (c(), Q(Ue, null, {
      buttons: de(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: y[2] || (y[2] = (m) => a(e).modal.close())
        }, w(a(r)("Close")), 1)
      ]),
      default: de(() => [
        o("div", hd, [
          Y(je, {
            icon: a(oo),
            title: a(r)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", gd, [
            o("div", yd, [
              a(t)("theme") ? (c(), _("div", wd, [
                o("label", bd, [
                  ye(w(a(r)("Theme")) + " ", 1),
                  Y(Tn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: de(() => [
                      ye(w(a(r)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", kd, [
                  o("select", {
                    id: "theme",
                    value: h.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: y[0] || (y[0] = (m) => v(m.target?.value))
                  }, [
                    (c(!0), _(_e, null, he(a(md), (m) => (c(), _("option", {
                      key: m.name,
                      value: m.name
                    }, w(m.displayName), 9, xd))), 128))
                  ], 40, $d)
                ])
              ])) : H("", !0),
              Object.keys(a($)).length > 1 ? (c(), _("div", Sd, [
                o("label", Cd, [
                  ye(w(a(r)("Language")) + " ", 1),
                  Y(Tn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: de(() => [
                      ye(w(a(r)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", Fd, [
                  ge(o("select", {
                    id: "language",
                    "onUpdate:modelValue": y[1] || (y[1] = (m) => u.value = m),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (c(!0), _(_e, null, he(a($), (m, S) => (c(), _("option", {
                      key: S,
                      value: S
                    }, w(m), 9, Ed))), 128))
                  ], 512), [
                    [qt, u.value]
                  ])
                ])
              ])) : H("", !0)
            ]),
            o("div", Td, [
              o("div", Pd, [
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
  const n = ce(), e = Ve(n), t = n.fs, s = n.config, { enabled: i } = Ne(), r = oe(t.path), l = oe(t.selectedItems), d = (u) => {
    if (u.code === Re.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (u.metaKey && u.code === Re.KEY_R && !u.shiftKey && (n.adapter.invalidateListQuery(r.value.path), n.adapter.open(r.value.path), u.preventDefault()), u.metaKey && u.shiftKey && u.code === Re.KEY_R && i("rename") && l.value.length === 1 && (n.modal.open(Mt, { items: l.value }), u.preventDefault()), u.code === Re.DELETE && l.value.length !== 0 && n.modal.open(Dt, { items: l.value }), u.metaKey && u.code === Re.BACKSLASH && n.modal.open(Gn), u.metaKey && u.code === Re.KEY_F && i("search") && (n.modal.open(dn), u.preventDefault()), u.metaKey && u.code === Re.KEY_E && (s.toggle("showTreeView"), u.preventDefault()), u.metaKey && u.code === Re.KEY_S && (n.modal.open(io), u.preventDefault()), u.metaKey && u.code === Re.ENTER && (s.toggle("fullScreen"), n.root.focus()), u.metaKey && u.code === Re.KEY_A && (t.selectAll(n.selectionMode || "multiple", n), u.preventDefault()), u.code === Re.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && n.modal.open(Qe, {
        storage: t.path.get().storage,
        item: l.value[0]
      }), u.metaKey && u.code === Re.KEY_C && i("copy")) {
        if (l.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(l.value.map((f) => $e(f)))), e.success(
          l.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", l.value.length)
        ), u.preventDefault();
      }
      if (u.metaKey && u.code === Re.KEY_X && i("copy")) {
        if (l.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(l.value.map((f) => $e(f)))), e.success(
          l.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", l.value.length)
        ), u.preventDefault();
      }
      if (u.metaKey && u.code === Re.KEY_V && i("copy")) {
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
        u.preventDefault();
      }
    }
  };
  be(async () => {
    if (await Oe(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), bt(() => {
    n.root && n.root.removeEventListener("keydown", d);
  });
}
function Ad() {
  const n = P(!1), e = P([]);
  return {
    isDraggingExternal: n,
    externalFiles: e,
    handleDragEnter: (d) => {
      d.preventDefault(), d.stopPropagation();
      const u = d.dataTransfer?.items;
      u && Array.from(u).some((h) => h.kind === "file") && (n.value = !0, d.isExternalDrag = !0);
    },
    handleDragOver: (d) => {
      n.value && d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.preventDefault(), d.stopPropagation());
    },
    handleDragLeave: (d) => {
      d.preventDefault();
      const u = d.currentTarget.getBoundingClientRect(), f = d.clientX, h = d.clientY;
      (f < u.left || f > u.right || h < u.top || h > u.bottom) && (n.value = !1);
    },
    handleDrop: async (d) => {
      d.preventDefault(), d.stopPropagation(), n.value = !1;
      const u = d.dataTransfer?.items;
      if (u) {
        const f = Array.from(u).filter((h) => h.kind === "file");
        if (f.length > 0) {
          e.value = [];
          const h = f.map((p) => ({
            entry: p.webkitGetAsEntry?.(),
            file: p.getAsFile()
          }));
          for (const { entry: p, file: v } of h)
            p ? await nn((k, b) => {
              const $ = k?.fullPath || b.name, g = $.startsWith("/") ? $.slice(1) : $;
              e.value.push({
                name: b.name,
                relativePath: g,
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
  return c(), _("svg", Od, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const lo = { render: Ld }, Rd = { class: "vuefinder__new-folder-modal__content" }, Bd = { class: "vuefinder__new-folder-modal__form" }, zd = { class: "vuefinder__new-folder-modal__description" }, Vd = ["placeholder"], cn = /* @__PURE__ */ ue({
  __name: "ModalNewFolder",
  setup(n) {
    const e = ce(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = oe(i.path), l = P(""), d = () => {
      l.value !== "" && e.adapter.createFolder({
        path: r.value.path,
        name: l.value
      }).then((u) => {
        t.success(s("%s is created.", l.value)), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        t.error(De(u, s("Failed to create folder")));
      });
    };
    return (u, f) => (c(), Q(Ue, null, {
      buttons: de(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, w(a(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (h) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: de(() => [
        o("div", null, [
          Y(je, {
            icon: a(lo),
            title: a(s)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Rd, [
            o("div", Bd, [
              o("p", zd, w(a(s)("Create a new folder")), 1),
              ge(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (h) => l.value = h),
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
  return c(), _("svg", Ud, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const ro = { render: Nd }, Hd = { class: "vuefinder__new-file-modal__content" }, jd = { class: "vuefinder__new-file-modal__form" }, Kd = { class: "vuefinder__new-file-modal__description" }, qd = ["placeholder"], co = /* @__PURE__ */ ue({
  __name: "ModalNewFile",
  setup(n) {
    const e = ce(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = oe(i.path), l = P(""), d = () => {
      l.value !== "" && e.adapter.createFile({
        path: r.value.path,
        name: l.value
      }).then((u) => {
        t.success(s("%s is created.", l.value)), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        t.error(De(u, s("Failed to create file")));
      });
    };
    return (u, f) => (c(), Q(Ue, null, {
      buttons: de(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, w(a(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (h) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: de(() => [
        o("div", null, [
          Y(je, {
            icon: a(ro),
            title: a(s)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", Hd, [
            o("div", jd, [
              o("p", Kd, w(a(s)("Create a new file")), 1),
              ge(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (h) => l.value = h),
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
  return c(), _("svg", Wd, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const uo = { render: Gd };
function vt(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const Yd = { class: "vuefinder__upload-modal__content relative" }, Xd = { class: "vuefinder__upload-modal__target-section" }, Qd = { class: "vuefinder__upload-modal__target-label" }, Jd = { class: "vuefinder__upload-modal__target-container" }, Zd = { class: "vuefinder__upload-modal__target-path" }, ec = { class: "vuefinder__upload-modal__target-storage" }, tc = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, nc = { class: "vuefinder__upload-modal__target-badge" }, oc = { class: "vuefinder__upload-modal__drag-hint" }, sc = {
  key: 0,
  class: "vuefinder__upload-modal__file-list vf-scrollbar"
}, ac = { class: "vuefinder__upload-modal__bulk-summary" }, ic = { class: "vuefinder__upload-modal__bulk-summary text-red-600" }, lc = { class: "text-red-600" }, rc = { key: 0 }, dc = { class: "vuefinder__upload-modal__file-info" }, cc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, uc = { class: "vuefinder__upload-modal__file-name md:hidden" }, vc = {
  key: 1,
  class: "vuefinder__upload-modal__file-list vf-scrollbar"
}, fc = ["textContent"], _c = { class: "vuefinder__upload-modal__file-info" }, pc = {
  key: 0,
  class: "vuefinder__upload-modal__file-rename"
}, mc = ["placeholder", "onKeyup"], hc = ["title", "onClick"], gc = ["title"], yc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, wc = { class: "vuefinder__upload-modal__file-name md:hidden" }, bc = {
  key: 0,
  class: "ml-auto"
}, kc = ["title", "disabled", "onClick"], $c = ["title", "disabled", "onClick"], xc = {
  key: 0,
  class: "py-2"
}, Sc = ["aria-expanded"], Cc = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Fc = ["disabled"], Ec = ["aria-expanded"], Tc = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Pc = 20, un = /* @__PURE__ */ ue({
  __name: "ModalUpload",
  setup(n) {
    const e = ce(), { t } = e.i18n, s = e.fs, i = oe(s.path), r = P(i.value), l = P(!1), d = () => {
      const ne = r.value.path;
      if (!ne) return { storage: "local", path: "" };
      if (ne.endsWith("://"))
        return { storage: ne.replace("://", ""), path: "" };
      const F = ne.split("://");
      return {
        storage: F[0] || "local",
        path: F[1] || ""
      };
    }, u = (ne) => {
      ne && (r.value = ne);
    }, f = (ne) => {
      ne && (r.value = ne, l.value = !1);
    }, {
      container: h,
      internalFileInput: p,
      internalFolderInput: v,
      pickFiles: k,
      queue: b,
      allowedFileTypes: $,
      message: g,
      uploading: y,
      hasFilesInDropArea: m,
      definitions: S,
      openFileSelector: x,
      upload: L,
      cancel: C,
      remove: A,
      clear: W,
      close: Z,
      getClassNameForEntry: te,
      getIconForEntry: J,
      addExternalFiles: G,
      renameEntry: E
    } = Jn(e.customUploader), D = P(null), V = P(""), X = P(null), fe = (ne) => {
      const F = ne.lastIndexOf("/");
      return F === -1 ? ne : ne.slice(F + 1);
    }, U = (ne) => {
      y.value || ne.status !== S.value.QUEUE_ENTRY_STATUS.UPLOADING && ne.status !== S.value.QUEUE_ENTRY_STATUS.REJECTED && (D.value = ne.id, V.value = fe(ne.name), Oe(() => {
        const F = X.value;
        if (F) {
          F.focus();
          const N = V.value.lastIndexOf(".");
          N > 0 ? F.setSelectionRange(0, N) : F.select();
        }
      }));
    }, I = () => {
      D.value = null, V.value = "";
    }, K = async (ne) => {
      const F = V.value.trim();
      if (!F || F === fe(ne.name)) {
        I();
        return;
      }
      await E(ne, F), I();
    }, R = () => {
      L(r.value), e.config.get("closeUploadModalOnSubmit") && Z();
    };
    be(() => {
      e.emitter.on("vf-external-files-dropped", (ne) => {
        G(ne);
      });
    }), Ae(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const T = O(() => b.value.length > Pc), M = O(
      () => b.value.filter((ne) => ne.status === S.value.QUEUE_ENTRY_STATUS.REJECTED)
    ), z = O(() => b.value.length - M.value.length), B = P(!1), j = P(null), q = P(null), re = (ne) => {
      if (!B.value) return;
      const F = ne.target, N = j.value?.contains(F) ?? !1, ie = q.value?.contains(F) ?? !1;
      !N && !ie && (B.value = !1);
    };
    return be(() => document.addEventListener("click", re)), Ae(() => document.removeEventListener("click", re)), (ne, F) => (c(), Q(Ue, {
      "show-drag-overlay": a(m),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: de(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: j,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: se([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              B.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: F[4] || (F[4] = (N) => a(x)())
            }, w(a(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": B.value ? "true" : "false",
              onClick: F[5] || (F[5] = pe((N) => B.value = !B.value, ["stop"]))
            }, [...F[22] || (F[22] = [
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
            ])], 8, Sc)
          ], 2),
          B.value ? (c(), _("div", Cc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[6] || (F[6] = (N) => {
                a(x)(), B.value = !1;
              })
            }, w(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[7] || (F[7] = (N) => {
                a(v)?.click(), B.value = !1;
              })
            }, w(a(t)("Select Folders")), 1),
            F[23] || (F[23] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: se(["vuefinder__upload-actions__item", a(y) ? "disabled" : ""]),
              onClick: F[8] || (F[8] = (N) => a(y) ? null : (a(W)(!1), B.value = !1))
            }, w(a(t)("Clear all")), 3),
            o("div", {
              class: se(["vuefinder__upload-actions__item", a(y) ? "disabled" : ""]),
              onClick: F[9] || (F[9] = (N) => a(y) ? null : (a(W)(!0), B.value = !1))
            }, w(a(t)("Clear only successful")), 3)
          ])) : H("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(y) || !a(b).length,
          onClick: pe(R, ["prevent"])
        }, w(a(t)("Upload")), 9, Fc),
        a(y) ? (c(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: F[10] || (F[10] = pe(
            //@ts-ignore
            (...N) => a(C) && a(C)(...N),
            ["prevent"]
          ))
        }, w(a(t)("Cancel")), 1)) : (c(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: F[11] || (F[11] = pe(
            //@ts-ignore
            (...N) => a(Z) && a(Z)(...N),
            ["prevent"]
          ))
        }, w(a(t)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: q,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: se(["vuefinder__upload-actions", B.value ? "vuefinder__upload-actions--ring" : ""])
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
              "aria-expanded": B.value ? "true" : "false",
              onClick: F[12] || (F[12] = pe((N) => B.value = !B.value, ["stop"]))
            }, [...F[24] || (F[24] = [
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
            ])], 8, Ec)
          ], 2),
          B.value ? (c(), _("div", Tc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[13] || (F[13] = (N) => {
                a(x)(), B.value = !1;
              })
            }, w(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[14] || (F[14] = (N) => {
                a(v)?.click(), B.value = !1;
              })
            }, w(a(t)("Select Folders")), 1),
            F[25] || (F[25] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: se(["vuefinder__upload-actions__item", a(y) ? "disabled" : ""]),
              onClick: F[15] || (F[15] = (N) => a(y) ? null : (a(W)(!1), B.value = !1))
            }, w(a(t)("Clear all")), 3),
            o("div", {
              class: se(["vuefinder__upload-actions__item", a(y) ? "disabled" : ""]),
              onClick: F[16] || (F[16] = (N) => a(y) ? null : (a(W)(!0), B.value = !1))
            }, w(a(t)("Clear only successful")), 3)
          ])) : H("", !0)
        ], 512)
      ]),
      default: de(() => [
        o("div", null, [
          Y(je, {
            icon: a(uo),
            title: a(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", Yd, [
            o("div", Xd, [
              o("div", Qd, w(a(t)("Target Directory")), 1),
              o("div", Jd, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: F[0] || (F[0] = (N) => l.value = !l.value)
                }, [
                  o("div", Zd, [
                    o("span", ec, w(d().storage) + "://", 1),
                    d().path ? (c(), _("span", tc, w(d().path), 1)) : H("", !0)
                  ]),
                  o("span", nc, w(a(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: se([
                  "vuefinder__upload-modal__tree-selector",
                  l.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                Y($t, {
                  modelValue: r.value,
                  "onUpdate:modelValue": [
                    F[1] || (F[1] = (N) => r.value = N),
                    u
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: f
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", oc, w(a(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: h,
              class: "hidden"
            }, null, 512),
            T.value ? (c(), _("div", sc, [
              o("div", ac, w(a(t)("Uploading %s files.", z.value)), 1),
              M.value.length ? (c(), _(_e, { key: 0 }, [
                o("div", ic, [
                  o("span", lc, w(a(t)("%s files ", M.value.length)), 1),
                  ye(w(a(t)("will not be uploaded because of an invalid file type:")) + " ", 1),
                  a($) && a($).length ? (c(), _("div", rc, w(a(t)("Allowed file types: %s", a($).join(", "))), 1)) : H("", !0)
                ]),
                (c(!0), _(_e, null, he(M.value, (N) => (c(), _("div", {
                  key: N.id,
                  class: "vuefinder__upload-modal__file-entry"
                }, [
                  F[17] || (F[17] = o("span", { class: "vuefinder__upload-modal__file-icon text-red-600" }, [
                    o("span", {
                      class: "vuefinder__upload-modal__file-icon-text",
                      textContent: "!"
                    })
                  ], -1)),
                  o("div", dc, [
                    o("div", cc, w(a(vt)(N.name, 40)) + " (" + w(N.size) + ") ", 1),
                    o("div", uc, w(a(vt)(N.name, 16)) + " (" + w(N.size) + ") ", 1)
                  ])
                ]))), 128))
              ], 64)) : H("", !0)
            ])) : (c(), _("div", vc, [
              (c(!0), _(_e, null, he(a(b), (N) => (c(), _("div", {
                key: N.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: se(["vuefinder__upload-modal__file-icon", a(te)(N)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: w(a(J)(N))
                  }, null, 8, fc)
                ], 2),
                o("div", _c, [
                  D.value === N.id ? (c(), _("div", pc, [
                    ge(o("input", {
                      ref_for: !0,
                      ref_key: "renameInputRef",
                      ref: X,
                      "onUpdate:modelValue": F[2] || (F[2] = (ie) => V.value = ie),
                      type: "text",
                      class: "vuefinder__upload-modal__file-rename-input",
                      placeholder: a(t)("Rename"),
                      onKeyup: [
                        Ke((ie) => K(N), ["enter"]),
                        Ke(I, ["esc"])
                      ]
                    }, null, 40, mc), [
                      [We, V.value]
                    ]),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn vuefinder__upload-modal__file-rename-btn--save",
                      title: a(t)("Save"),
                      onClick: (ie) => K(N)
                    }, [...F[18] || (F[18] = [
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
                    ])], 8, hc),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn",
                      title: a(t)("Cancel"),
                      onClick: I
                    }, [...F[19] || (F[19] = [
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
                    ])], 8, gc)
                  ])) : (c(), _(_e, { key: 1 }, [
                    o("div", yc, w(a(vt)(N.name, 40)) + " (" + w(N.size) + ") ", 1),
                    o("div", wc, w(a(vt)(N.name, 16)) + " (" + w(N.size) + ") ", 1),
                    o("div", {
                      class: se(["vuefinder__upload-modal__file-status", a(te)(N)])
                    }, [
                      ye(w(N.statusName) + " ", 1),
                      N.status === a(S).QUEUE_ENTRY_STATUS.UPLOADING ? (c(), _("b", bc, w(N.percent), 1)) : H("", !0)
                    ], 2)
                  ], 64))
                ]),
                D.value !== N.id && N.status !== a(S).QUEUE_ENTRY_STATUS.REJECTED ? (c(), _("button", {
                  key: 0,
                  type: "button",
                  class: se([
                    "vuefinder__upload-modal__file-rename-action",
                    a(y) || N.status === a(S).QUEUE_ENTRY_STATUS.UPLOADING ? "disabled" : ""
                  ]),
                  title: a(t)("Rename"),
                  disabled: a(y) || N.status === a(S).QUEUE_ENTRY_STATUS.UPLOADING,
                  onClick: (ie) => U(N)
                }, [...F[20] || (F[20] = [
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
                ])], 10, kc)) : H("", !0),
                D.value !== N.id ? (c(), _("button", {
                  key: 1,
                  type: "button",
                  class: se(["vuefinder__upload-modal__file-remove", a(y) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(y),
                  onClick: (ie) => a(A)(N)
                }, [...F[21] || (F[21] = [
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
                ])], 10, $c)) : H("", !0)
              ]))), 128)),
              a(b).length ? H("", !0) : (c(), _("div", xc, w(a(t)("No files selected!")), 1))
            ])),
            a(g).length ? (c(), Q(Yt, {
              key: 2,
              error: "",
              onHidden: F[3] || (F[3] = (N) => g.value = "")
            }, {
              default: de(() => [
                ye(w(a(g)), 1)
              ]),
              _: 1
            })) : H("", !0)
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
}), Dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Mc(n, e) {
  return c(), _("svg", Dc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const vo = { render: Mc }, Ic = { class: "vuefinder__unarchive-modal__content" }, Ac = { class: "vuefinder__unarchive-modal__items" }, Oc = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Lc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Rc = { class: "vuefinder__unarchive-modal__item-name" }, Bc = { class: "vuefinder__unarchive-modal__info" }, zc = { class: "vuefinder__unarchive-modal__target" }, Vc = { class: "vuefinder__unarchive-modal__target-label" }, Uc = ["title"], Nc = {
  key: 0,
  class: "vuefinder__unarchive-modal__target-selector"
}, vn = /* @__PURE__ */ ue({
  __name: "ModalUnarchive",
  setup(n) {
    const e = ce(), t = Ve(e), s = e.fs, i = oe(s.path), { t: r } = e.i18n, l = P(e.modal.data.items[0]), d = P([]), u = P(null), f = P(!1), h = O(() => u.value?.path || i.value.path), p = () => {
      f.value = !f.value;
    }, v = ($) => {
      $ && (u.value = $);
    }, k = ($) => {
      $ && (u.value = $, f.value = !1);
    }, b = () => {
      const $ = u.value?.path;
      e.adapter.unarchive({
        item: l.value.path,
        path: i.value.path,
        // Optional. Sent when the user explicitly picks a different folder.
        ...$ && $ !== i.value.path ? { destination: $ } : {}
      }).then((g) => {
        t.success(r("The file unarchived.")), e.fs.setFiles(g.files), e.modal.close();
      }).catch((g) => {
        t.error(De(g, r("Failed to unarchive")));
      });
    };
    return ($, g) => (c(), Q(Ue, null, {
      buttons: de(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: b
        }, w(a(r)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[1] || (g[1] = (y) => a(e).modal.close())
        }, w(a(r)("Cancel")), 1)
      ]),
      default: de(() => [
        o("div", null, [
          Y(je, {
            icon: a(vo),
            title: a(r)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", Ic, [
            o("div", Ac, [
              (c(!0), _(_e, null, he(d.value, (y) => (c(), _("p", {
                key: y.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                y.type === "dir" ? (c(), _("svg", Oc, [...g[2] || (g[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (c(), _("svg", Lc, [...g[3] || (g[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Rc, w(y.basename), 1)
              ]))), 128)),
              o("p", Bc, w(a(r)("The archive will be unarchived at")) + " (" + w(h.value) + ") ", 1),
              o("div", zc, [
                o("div", Vc, w(a(r)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: se(["vuefinder__unarchive-modal__target-btn", { "vuefinder__unarchive-modal__target-btn--open": f.value }]),
                  onClick: p
                }, [
                  Y(a(ze), { class: "vuefinder__unarchive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__unarchive-modal__target-text",
                    title: h.value
                  }, w(a(Rt)(h.value)), 9, Uc),
                  g[4] || (g[4] = o("svg", {
                    class: "vuefinder__unarchive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                f.value ? (c(), _("div", Nc, [
                  Y($t, {
                    modelValue: u.value,
                    "onUpdate:modelValue": [
                      g[0] || (g[0] = (y) => u.value = y),
                      v
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(i),
                    onSelectAndClose: k
                  }, null, 8, ["modelValue", "current-path"])
                ])) : H("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function jc(n, e) {
  return c(), _("svg", Hc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const fo = { render: jc }, Kc = { class: "vuefinder__archive-modal__content" }, qc = { class: "vuefinder__archive-modal__form" }, Wc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Gc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Xc = { class: "vuefinder__archive-modal__file-name" }, Qc = ["placeholder"], Jc = { class: "vuefinder__archive-modal__target" }, Zc = { class: "vuefinder__archive-modal__target-label" }, eu = ["title"], tu = {
  key: 0,
  class: "vuefinder__archive-modal__target-selector"
}, fn = /* @__PURE__ */ ue({
  __name: "ModalArchive",
  setup(n) {
    const e = ce(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = oe(i.path), l = P(""), d = P(e.modal.data.items), u = P(null), f = P(!1), h = O(() => u.value?.path || r.value.path), p = () => {
      f.value = !f.value;
    }, v = ($) => {
      $ && (u.value = $);
    }, k = ($) => {
      $ && (u.value = $, f.value = !1);
    }, b = () => {
      if (d.value.length) {
        const $ = u.value?.path;
        e.adapter.archive({
          path: r.value.path,
          items: d.value.map(({ path: g, type: y }) => ({
            path: g,
            type: y
          })),
          name: l.value,
          // Optional. Sent when the user explicitly picks a different folder.
          ...$ && $ !== r.value.path ? { destination: $ } : {}
        }).then((g) => {
          t.success(s("The file(s) archived.")), e.fs.setFiles(g.files), e.modal.close();
        }).catch((g) => {
          t.error(De(g, s("Failed to archive files")));
        });
      }
    };
    return ($, g) => (c(), Q(Ue, null, {
      buttons: de(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: b
        }, w(a(s)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[2] || (g[2] = (y) => a(e).modal.close())
        }, w(a(s)("Cancel")), 1)
      ]),
      default: de(() => [
        o("div", null, [
          Y(je, {
            icon: a(fo),
            title: a(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Kc, [
            o("div", qc, [
              o("div", Wc, [
                (c(!0), _(_e, null, he(d.value, (y) => (c(), _("p", {
                  key: y.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  y.type === "dir" ? (c(), _("svg", Gc, [...g[3] || (g[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (c(), _("svg", Yc, [...g[4] || (g[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Xc, w(y.basename), 1)
                ]))), 128))
              ]),
              ge(o("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (y) => l.value = y),
                class: "vuefinder__archive-modal__input",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: Ke(b, ["enter"])
              }, null, 40, Qc), [
                [We, l.value]
              ]),
              o("div", Jc, [
                o("div", Zc, w(a(s)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: se(["vuefinder__archive-modal__target-btn", { "vuefinder__archive-modal__target-btn--open": f.value }]),
                  onClick: p
                }, [
                  Y(a(ze), { class: "vuefinder__archive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__archive-modal__target-text",
                    title: h.value
                  }, w(a(Rt)(h.value)), 9, eu),
                  g[5] || (g[5] = o("svg", {
                    class: "vuefinder__archive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                f.value ? (c(), _("div", tu, [
                  Y($t, {
                    modelValue: u.value,
                    "onUpdate:modelValue": [
                      g[1] || (g[1] = (y) => u.value = y),
                      v
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(r),
                    onSelectAndClose: k
                  }, null, 8, ["modelValue", "current-path"])
                ])) : H("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), nu = { class: "vuefinder__about-modal__content" }, ou = { class: "vuefinder__about-modal__main" }, su = { class: "vuefinder__about-modal__shortcuts" }, au = { class: "vuefinder__about-modal__shortcut" }, iu = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, lu = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, ru = { class: "vuefinder__about-modal__shortcut" }, du = { class: "vuefinder__about-modal__shortcut" }, cu = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, uu = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, vu = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, fu = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, _u = { class: "vuefinder__about-modal__shortcut" }, pu = { class: "vuefinder__about-modal__shortcut" }, mu = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, hu = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, gu = /* @__PURE__ */ ue({
  __name: "ModalShortcuts",
  setup(n) {
    const e = ce(), { enabled: t } = Ne(), { t: s } = e.i18n;
    return (i, r) => (c(), Q(Ue, null, {
      buttons: de(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: r[0] || (r[0] = (l) => a(e).modal.close())
        }, w(a(s)("Close")), 1)
      ]),
      default: de(() => [
        o("div", nu, [
          Y(je, {
            icon: a(en),
            title: a(s)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", ou, [
            o("div", su, [
              o("div", au, [
                o("div", null, w(a(s)("Refresh")), 1),
                r[1] || (r[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (c(), _("div", iu, [
                o("div", null, w(a(s)("Rename")), 1),
                r[2] || (r[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Shift"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : H("", !0),
              a(t)("delete") ? (c(), _("div", lu, [
                o("div", null, w(a(s)("Delete")), 1),
                r[3] || (r[3] = o("kbd", null, "Del", -1))
              ])) : H("", !0),
              o("div", ru, [
                o("div", null, w(a(s)("Escape")), 1),
                r[4] || (r[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", du, [
                o("div", null, w(a(s)("Select All")), 1),
                r[5] || (r[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (c(), _("div", cu, [
                o("div", null, w(a(s)("Cut")), 1),
                r[6] || (r[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : H("", !0),
              a(t)("copy") ? (c(), _("div", uu, [
                o("div", null, w(a(s)("Copy")), 1),
                r[7] || (r[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : H("", !0),
              a(t)("copy") ? (c(), _("div", vu, [
                o("div", null, w(a(s)("Paste")), 1),
                r[8] || (r[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : H("", !0),
              a(t)("search") ? (c(), _("div", fu, [
                o("div", null, w(a(s)("Search")), 1),
                r[9] || (r[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : H("", !0),
              o("div", _u, [
                o("div", null, w(a(s)("Toggle Sidebar")), 1),
                r[10] || (r[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", pu, [
                o("div", null, w(a(s)("Open Settings")), 1),
                r[11] || (r[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (c(), _("div", mu, [
                o("div", null, w(a(s)("Toggle Full Screen")), 1),
                r[12] || (r[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : H("", !0),
              a(t)("preview") ? (c(), _("div", hu, [
                o("div", null, w(a(s)("Preview")), 1),
                r[13] || (r[13] = o("kbd", null, "Space", -1))
              ])) : H("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function wu(n, e) {
  return c(), _("svg", yu, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const _o = { render: wu }, _n = "vuefinder:recent-paths", po = 4, pn = typeof window < "u" && typeof window.localStorage < "u";
function mn() {
  if (!pn) return [];
  try {
    const n = window.localStorage.getItem(_n);
    if (!n) return [];
    const e = JSON.parse(n);
    return Array.isArray(e) ? e.filter((t) => typeof t == "string").slice(0, po) : [];
  } catch {
    return [];
  }
}
function bu(n) {
  if (!(!pn || !n))
    try {
      const e = mn().filter((t) => t !== n);
      e.unshift(n), window.localStorage.setItem(_n, JSON.stringify(e.slice(0, po)));
    } catch {
    }
}
function ku(n) {
  if (!(!pn || !n))
    try {
      const e = mn().filter((t) => t !== n);
      window.localStorage.setItem(_n, JSON.stringify(e));
    } catch {
    }
}
const $u = { class: "vuefinder__go-to-folder-modal" }, xu = { class: "vuefinder__go-to-folder-modal__content" }, Su = ["placeholder", "onKeydown"], Cu = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__error"
}, Fu = ["onMouseenter", "onClick", "onDblclick"], Eu = { class: "vuefinder__go-to-folder-modal__suggestion-label" }, Tu = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__suggestion-tag"
}, Pu = ["title", "onClick"], Du = ["title", "onClick"], Mu = {
  key: 2,
  class: "vuefinder__go-to-folder-modal__empty"
}, Iu = {
  key: 3,
  class: "vuefinder__go-to-folder-modal__loading"
}, Au = ["disabled"], Ou = /* @__PURE__ */ ue({
  name: "ModalGoToFolder",
  __name: "ModalGoToFolder",
  setup(n) {
    const e = ce(), { t } = e.i18n, s = e.fs, i = oe(s.storages), r = P(""), l = P([]), d = P(0), u = P(!1), f = P(!1), h = P(""), p = P(null), v = P(null);
    let k = 0;
    const b = O(() => i.value ?? []), $ = (U) => {
      const I = U ?? "", K = I.indexOf("://");
      if (K === -1)
        return { storage: null, parent: "", filter: I.trim(), hasProtocol: !1 };
      const R = I.slice(0, K), T = I.slice(K + 3), M = T.lastIndexOf("/"), z = M === -1 ? `${R}://` : `${R}://${T.slice(0, M).replace(/^\/+/, "")}`, B = M === -1 ? T : T.slice(M + 1);
      return { storage: R, parent: z, filter: B, hasProtocol: !0 };
    }, g = (U) => {
      const I = U.toLowerCase();
      l.value = b.value.filter((K) => !I || K.toLowerCase().includes(I)).map((K) => ({
        path: `${K}://`,
        label: `${K}://`,
        kind: "storage"
      })), d.value = l.value.length ? 0 : -1, h.value = "";
    }, y = () => {
      const U = mn();
      l.value = U.map((I) => ({
        path: I,
        label: I,
        kind: "recent"
      })), d.value = l.value.length ? 0 : -1, h.value = "";
    }, m = async (U, I) => {
      const K = ++k;
      u.value = !0, h.value = "";
      try {
        const R = await e.adapter.list(U);
        if (K !== k) return;
        const T = I.toLowerCase(), M = (R?.files ?? []).filter(
          (z) => z.type === "dir" && (!T || z.basename.toLowerCase().startsWith(T))
        );
        l.value = M.map(
          (z) => ({
            path: z.path,
            label: z.basename,
            kind: "dir"
          })
        ), d.value = l.value.length ? 0 : -1;
      } catch (R) {
        if (K !== k) return;
        l.value = [], d.value = -1, h.value = De(R, t("Folder not found"));
      } finally {
        K === k && (u.value = !1);
      }
    };
    let S = null;
    const x = (U) => {
      S && clearTimeout(S), S = setTimeout(() => L(U), 150);
    }, L = (U) => {
      const I = U.trim();
      if (!I) {
        k++, u.value = !1, y();
        return;
      }
      const { hasProtocol: K, parent: R, filter: T } = $(I);
      if (!K) {
        k++, u.value = !1, g(I);
        return;
      }
      m(R, T);
    };
    me(r, (U) => x(U)), be(() => {
      y(), Oe(() => p.value?.focus());
    });
    const C = () => {
      Oe(() => {
        const U = v.value;
        if (!U) return;
        const I = U.children[d.value];
        if (!I) return;
        const K = U.scrollTop, R = K + U.clientHeight, T = I.offsetTop, M = T + I.offsetHeight;
        T < K ? U.scrollTop = T : M > R && (U.scrollTop = M - U.clientHeight);
      });
    }, A = (U) => {
      if (!l.value.length) return;
      const I = l.value.length;
      d.value = ((d.value + U) % I + I) % I, C();
    }, W = (U) => {
      r.value = U.kind === "dir" ? `${U.path}/` : U.path, Oe(() => {
        p.value?.setSelectionRange(r.value.length, r.value.length);
      });
    }, Z = (U) => {
      if (!U.includes("://"))
        return {
          ok: !1,
          reason: t("Invalid path format. Path must be in format: storage://path/to/folder")
        };
      const I = U.slice(0, U.indexOf("://"));
      return b.value.includes(I) ? { ok: !0 } : { ok: !1, reason: t('Invalid storage. Storage "%s" is not available.', I) };
    }, te = async (U) => {
      if (f.value) return;
      const I = U.trim();
      if (!I) return;
      const K = Z(I);
      if (!K.ok) {
        h.value = K.reason ?? "";
        return;
      }
      f.value = !0;
      try {
        if (await e.adapter.open(I) === void 0)
          return;
        bu(I), e.modal.close();
      } catch (R) {
        h.value = De(R, t("Failed to navigate to folder")), s.setLoading(!1);
      } finally {
        f.value = !1;
      }
    }, J = () => {
      const U = l.value[d.value];
      te(U ? U.path : r.value);
    }, G = (U) => {
      if (!l.value.length) return;
      U.preventDefault();
      const I = l.value[d.value];
      I && W(I);
    }, E = (U) => {
      if (U.kind === "dir") {
        W(U);
        return;
      }
      te(U.path);
    }, D = (U) => {
      te(U.path);
    }, V = (U, I) => {
      U.stopPropagation(), U.preventDefault(), ku(I), y();
    }, X = (U, I) => {
      U.stopPropagation(), U.preventDefault(), r.value = I, Oe(() => {
        p.value?.focus(), p.value?.setSelectionRange(r.value.length, r.value.length);
      });
    }, fe = O(() => {
      const U = b.value[0];
      return U ? `${U}://path/to/folder` : "storage://path/to/folder";
    });
    return (U, I) => (c(), Q(Ue, null, {
      buttons: de(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: f.value,
          onClick: J
        }, w(a(t)("Go")), 9, Au),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: I[3] || (I[3] = (K) => a(e).modal.close())
        }, w(a(t)("Cancel")), 1)
      ]),
      default: de(() => [
        o("div", $u, [
          Y(je, {
            icon: a(Ot),
            title: a(t)("Go to Folder")
          }, null, 8, ["icon", "title"]),
          o("div", xu, [
            ge(o("input", {
              ref_key: "inputRef",
              ref: p,
              "onUpdate:modelValue": I[0] || (I[0] = (K) => r.value = K),
              class: "vuefinder__go-to-folder-modal__input",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: fe.value,
              onKeydown: [
                I[1] || (I[1] = Ke(pe((K) => A(1), ["prevent"]), ["down"])),
                I[2] || (I[2] = Ke(pe((K) => A(-1), ["prevent"]), ["up"])),
                Ke(pe(J, ["prevent"]), ["enter"]),
                Ke(G, ["tab"])
              ]
            }, null, 40, Su), [
              [We, r.value]
            ]),
            h.value ? (c(), _("div", Cu, w(h.value), 1)) : H("", !0),
            l.value.length ? (c(), _("div", {
              key: 1,
              ref_key: "suggestionListRef",
              ref: v,
              class: "vuefinder__go-to-folder-modal__suggestions"
            }, [
              (c(!0), _(_e, null, he(l.value, (K, R) => (c(), _("div", {
                key: `${K.kind}:${K.path}`,
                class: se(["vuefinder__go-to-folder-modal__suggestion", {
                  "vuefinder__go-to-folder-modal__suggestion--active": R === d.value
                }]),
                onMouseenter: (T) => d.value = R,
                onClick: (T) => E(K),
                onDblclick: (T) => D(K)
              }, [
                Y(a(ze), { class: "vuefinder__go-to-folder-modal__suggestion-icon" }),
                o("span", Eu, w(K.label), 1),
                K.kind === "recent" ? (c(), _("span", Tu, w(a(t)("Recent")), 1)) : H("", !0),
                K.kind === "recent" ? (c(), _("button", {
                  key: 1,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-fill",
                  title: a(t)("Edit this path"),
                  onClick: (T) => X(T, K.path)
                }, [
                  Y(a(_o), { class: "vuefinder__go-to-folder-modal__suggestion-fill-icon" })
                ], 8, Pu)) : H("", !0),
                K.kind === "recent" ? (c(), _("button", {
                  key: 2,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-remove",
                  title: a(t)("Remove from recent"),
                  onClick: (T) => V(T, K.path)
                }, " × ", 8, Du)) : H("", !0)
              ], 42, Fu))), 128))
            ], 512)) : u.value ? H("", !0) : (c(), _("div", Mu, [
              r.value.trim() ? (c(), _(_e, { key: 1 }, [
                ye(w(a(t)("No matching folders.")), 1)
              ], 64)) : (c(), _(_e, { key: 0 }, [
                ye(w(a(t)("No recent folders yet.")), 1)
              ], 64))
            ])),
            u.value ? (c(), _("div", Iu, w(a(t)("Loading…")), 1)) : H("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Lu() {
  const n = ce(), { enabled: e } = Ne(), { t } = n?.i18n || { t: (h) => h }, s = n?.fs, i = n?.config, r = oe(i.state), l = oe(s.selectedItems), d = oe(s?.storages || []), u = O(() => window.opener !== null || window.name !== "" || window.history.length <= 1);
  return { menuItems: O(() => [
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
          action: () => n?.modal?.open(co, { items: l.value }),
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
        ...u.value ? [
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
                new Set(l.value.map((h) => $e(h)))
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
                new Set(l.value.map((h) => $e(h)))
              );
            },
            enabled: () => l.value.length > 0
          },
          {
            id: "paste",
            label: t("Paste"),
            action: () => {
              const h = s?.getClipboard();
              h?.items?.size > 0 && n?.modal?.open(h.type === "cut" ? it : ln, {
                items: { from: Array.from(h.items), to: s?.path?.get() }
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
                const h = {
                  storage: s?.path?.get()?.storage || "",
                  path: s?.path?.get()?.path || "",
                  type: "dir"
                };
                n?.modal?.open(it, {
                  items: { from: l.value, to: h }
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
              const h = l.value[0];
              await wt(h.path);
            } else {
              const h = s?.path?.get();
              h?.path && await wt(h.path);
            }
          },
          enabled: () => !0
        },
        {
          id: "copy-download-url",
          label: t("Copy Download URL"),
          action: async () => {
            if (l.value.length === 1) {
              const h = l.value[0], p = n?.adapter?.getDownloadUrl({ path: h.path });
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
            l.value.length === 1 && n?.modal?.open(Mt, { items: l.value });
          },
          enabled: () => l.value.length === 1,
          hidden: () => !e("rename")
        },
        {
          id: "delete",
          label: t("Delete"),
          action: () => {
            l.value.length > 0 && n?.modal?.open(Dt, { items: l.value });
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
            i?.toggle("metricUnits"), n.filesize = i?.get("metricUnits") ? jn : Jt, n.emitter.emit("vf-metric-units-saved");
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
              const h = s?.path?.get();
              h?.path && n?.adapter.open(h.path);
            },
            enabled: () => s?.canGoForward?.get() ?? !1
          },
          {
            id: "back",
            label: t("Back"),
            action: () => {
              s?.goBack();
              const h = s?.path?.get();
              h?.path && n?.adapter.open(h.path);
            },
            enabled: () => s?.canGoBack?.get() ?? !1
          }
        ] : [],
        {
          id: "open-containing-folder",
          label: t("Open containing folder"),
          action: () => {
            const h = s?.path?.get();
            if (h?.breadcrumb && h.breadcrumb.length > 1) {
              const v = h.breadcrumb[h.breadcrumb.length - 2]?.path ?? `${h.storage}://`;
              n?.adapter.open(v);
            }
          },
          enabled: () => {
            const h = s?.path?.get();
            return h?.breadcrumb && h.breadcrumb.length > 1;
          }
        },
        { type: "separator" },
        // Dynamic storage list items will be added here
        ...(d.value || []).map((h) => ({
          id: `storage-${h}`,
          label: h,
          action: () => {
            const p = `${h}://`;
            n?.adapter.open(p);
          },
          enabled: () => !0
        })),
        { type: "separator" },
        {
          id: "go-to-folder",
          label: t("Go to Folder"),
          action: () => n?.modal?.open(Ou),
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
          action: () => n?.modal?.open(io),
          enabled: () => !0
        },
        {
          id: "shortcuts",
          label: t("Shortcuts"),
          action: () => n?.modal?.open(gu),
          enabled: () => !0
        },
        {
          id: "about",
          label: t("About"),
          action: () => n?.modal?.open(Gn),
          enabled: () => !0
        }
      ]
    }
  ]), shouldShowExit: u };
}
const Ru = { class: "vuefinder__menubar__container" }, Bu = ["onClick", "onMouseenter"], zu = { class: "vuefinder__menubar__label" }, Vu = ["onMouseenter"], Uu = ["onClick"], Nu = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Hu = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, ju = {
  key: 2,
  class: "vuefinder__menubar__dropdown__chevron",
  viewBox: "0 0 16 16",
  fill: "currentColor",
  "aria-hidden": "true"
}, Ku = {
  key: 3,
  class: "vuefinder__menubar__dropdown__submenu"
}, qu = ["onClick"], Wu = { class: "vuefinder__menubar__dropdown__label" }, Gu = /* @__PURE__ */ ue({
  __name: "MenuBar",
  setup(n) {
    const { menuItems: e } = Lu(), t = P(null), s = P(!1), i = (f) => {
      t.value === f ? l() : (t.value = f ?? null, s.value = !0);
    }, r = (f) => {
      s.value && (t.value = f ?? null);
    }, l = () => {
      t.value = null, s.value = !1;
    }, d = (f) => {
      l(), f?.();
    }, u = (f) => {
      f.target.closest(".vuefinder__menubar") || l();
    };
    return be(() => {
      document.addEventListener("click", u);
    }), Ae(() => {
      document.removeEventListener("click", u);
    }), (f, h) => (c(), _("div", {
      class: "vuefinder__menubar",
      onClick: h[0] || (h[0] = pe(() => {
      }, ["stop"]))
    }, [
      o("div", Ru, [
        we(f.$slots, "menubar-start", { menuItems: a(e) }),
        we(f.$slots, "menu-items", {
          menuItems: a(e),
          handleMenuAction: d
        }, () => [
          (c(!0), _(_e, null, he(a(e), (p) => (c(), _("div", {
            key: p.id,
            class: se(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": t.value === p.id }]),
            onClick: (v) => i(p.id),
            onMouseenter: (v) => r(p.id)
          }, [
            o("span", zu, w(p.label), 1),
            t.value === p.id ? (c(), _("div", {
              key: 0,
              class: "vuefinder__menubar__dropdown",
              onMouseenter: (v) => r(p.id)
            }, [
              (c(!0), _(_e, null, he(p.items, (v) => (c(), _("div", {
                key: v.id || v.type,
                class: se(["vuefinder__menubar__dropdown__item", {
                  "vuefinder__menubar__dropdown__item--separator": v.type === "separator",
                  "vuefinder__menubar__dropdown__item--disabled": v.enabled && !v.enabled(),
                  "vuefinder__menubar__dropdown__item--checked": v.checked && v.checked(),
                  "vuefinder__menubar__dropdown__item--hidden": v.hidden && v.hidden(),
                  "vuefinder__menubar__dropdown__item--has-children": v.items?.length
                }]),
                onClick: pe((k) => v.type !== "separator" && !v.items?.length && (!v.enabled || v.enabled()) ? d(v.action) : null, ["stop"])
              }, [
                v.type !== "separator" ? (c(), _("span", Nu, w(v.label), 1)) : H("", !0),
                v.checked && v.checked() ? (c(), _("span", Hu, " ✓ ")) : H("", !0),
                v.items?.length ? (c(), _("svg", ju, [...h[1] || (h[1] = [
                  o("path", { d: "M6 4l4 4-4 4z" }, null, -1)
                ])])) : H("", !0),
                v.items?.length ? (c(), _("div", Ku, [
                  (c(!0), _(_e, null, he(v.items, (k) => (c(), _("div", {
                    key: k.id,
                    class: se(["vuefinder__menubar__dropdown__item", {
                      "vuefinder__menubar__dropdown__item--disabled": k.enabled && !k.enabled()
                    }]),
                    onClick: pe((b) => !k.enabled || k.enabled() ? d(k.action) : null, ["stop"])
                  }, [
                    o("span", Wu, w(k.label), 1)
                  ], 10, qu))), 128))
                ])) : H("", !0)
              ], 10, Uu))), 128))
            ], 40, Vu)) : H("", !0)
          ], 42, Bu))), 128))
        ]),
        we(f.$slots, "menubar-end", { menuItems: a(e) })
      ])
    ]));
  }
}), Yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Xu(n, e) {
  return c(), _("svg", Yu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Qu = { render: Xu }, Ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Zu(n, e) {
  return c(), _("svg", Ju, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const ev = { render: Zu }, tv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function nv(n, e) {
  return c(), _("svg", tv, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const ov = { render: nv }, sv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function av(n, e) {
  return c(), _("svg", sv, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const iv = { render: av }, lv = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function rv(n, e) {
  return c(), _("svg", lv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const dv = { render: rv }, cv = { class: "vuefinder__toolbar" }, uv = { class: "vuefinder__toolbar__actions" }, vv = ["title"], fv = ["title"], _v = ["title"], pv = ["title"], mv = ["title"], hv = ["title"], gv = ["title"], yv = { class: "vuefinder__toolbar__controls" }, wv = ["title"], bv = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, kv = ["title"], $v = { class: "relative" }, xv = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, Sv = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Cv = { class: "vuefinder__toolbar__dropdown-content" }, Fv = { class: "vuefinder__toolbar__dropdown-section" }, Ev = { class: "vuefinder__toolbar__dropdown-label" }, Tv = { class: "vuefinder__toolbar__dropdown-row" }, Pv = { value: "name" }, Dv = { value: "size" }, Mv = { value: "modified" }, Iv = { value: "" }, Av = { value: "asc" }, Ov = { value: "desc" }, Lv = { class: "vuefinder__toolbar__dropdown-section" }, Rv = { class: "vuefinder__toolbar__dropdown-label" }, Bv = { class: "vuefinder__toolbar__dropdown-options" }, zv = { class: "vuefinder__toolbar__dropdown-option" }, Vv = { class: "vuefinder__toolbar__option-text" }, Uv = { class: "vuefinder__toolbar__dropdown-option" }, Nv = { class: "vuefinder__toolbar__option-text" }, Hv = { class: "vuefinder__toolbar__dropdown-option" }, jv = { class: "vuefinder__toolbar__option-text" }, Kv = { class: "vuefinder__toolbar__dropdown-toggle" }, qv = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Wv = { class: "vuefinder__toolbar__dropdown-reset" }, Gv = ["title"], Yv = ["title"], Xv = /* @__PURE__ */ ue({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = ce(), { enabled: t } = Ne(), { t: s } = e.i18n, i = e.fs, r = e.config, l = oe(r.state), d = oe(i.selectedItems), u = oe(i.sort), f = oe(i.filter);
    me(
      () => l.value.fullScreen,
      () => {
        const g = document.querySelector("body");
        g && (g.style.overflow = l.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const h = P(!1), p = (g) => {
      g.target.closest(".vuefinder__toolbar__dropdown-container") || (h.value = !1);
    };
    be(() => {
      const g = document.querySelector("body");
      g && l.value.fullScreen && setTimeout(() => g.style.overflow = "hidden"), document.addEventListener("click", p);
    }), Ae(() => {
      document.removeEventListener("click", p);
    });
    const v = P({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: l.value.showHiddenFiles
      // Initialize with config store default
    });
    me(
      () => v.value.sortBy,
      (g) => {
        if (!v.value.sortOrder) {
          i.clearSort();
          return;
        }
        g === "name" ? i.setSort("basename", v.value.sortOrder) : g === "size" ? i.setSort("file_size", v.value.sortOrder) : g === "modified" && i.setSort("last_modified", v.value.sortOrder);
      }
    ), me(
      () => v.value.sortOrder,
      (g) => {
        if (!g) {
          i.clearSort();
          return;
        }
        v.value.sortBy === "name" ? i.setSort("basename", g) : v.value.sortBy === "size" ? i.setSort("file_size", g) : v.value.sortBy === "modified" && i.setSort("last_modified", g);
      }
    ), me(
      u,
      (g) => {
        g.active ? (g.column === "basename" ? v.value.sortBy = "name" : g.column === "file_size" ? v.value.sortBy = "size" : g.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = g.order) : v.value.sortOrder = "";
      },
      { immediate: !0 }
    ), me(
      () => v.value.filterKind,
      (g) => {
        i.setFilter(g, l.value.showHiddenFiles);
      }
    ), me(
      () => v.value.showHidden,
      (g) => {
        r.set("showHiddenFiles", g), i.setFilter(v.value.filterKind, g);
      }
    ), me(
      f,
      (g) => {
        v.value.filterKind = g.kind;
      },
      { immediate: !0 }
    ), me(
      () => l.value.showHiddenFiles,
      (g) => {
        v.value.showHidden = g, i.setFilter(v.value.filterKind, g);
      },
      { immediate: !0 }
    );
    const k = () => r.set("view", l.value.view === "grid" ? "list" : "grid"), b = O(() => f.value.kind !== "all" || !l.value.showHiddenFiles || u.value.active), $ = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, r.set("showHiddenFiles", !0), i.clearSort(), i.clearFilter();
    };
    return (g, y) => we(g.$slots, "toolbar-items", {}, () => [
      o("div", cv, [
        o("div", uv, [
          a(t)("newfolder") ? (c(), _("div", {
            key: 0,
            class: "mx-1.5",
            title: a(s)("New Folder"),
            onClick: y[0] || (y[0] = (m) => a(e).modal.open(cn, { items: a(d) }))
          }, [
            Y(a(lo))
          ], 8, vv)) : H("", !0),
          a(t)("newfile") ? (c(), _("div", {
            key: 1,
            class: "mx-1.5",
            title: a(s)("New File"),
            onClick: y[1] || (y[1] = (m) => a(e).modal.open(co, { items: a(d) }))
          }, [
            Y(a(ro))
          ], 8, fv)) : H("", !0),
          a(t)("rename") ? (c(), _("div", {
            key: 2,
            class: "mx-1.5",
            title: a(s)("Rename"),
            onClick: y[2] || (y[2] = (m) => a(d).length !== 1 || a(e).modal.open(Mt, { items: a(d) }))
          }, [
            Y(a(Xn), {
              class: se(a(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, _v)) : H("", !0),
          a(t)("delete") ? (c(), _("div", {
            key: 3,
            class: "mx-1.5",
            title: a(s)("Delete"),
            onClick: y[3] || (y[3] = (m) => !a(d).length || a(e).modal.open(Dt, { items: a(d) }))
          }, [
            Y(a(Yn), {
              class: se(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, pv)) : H("", !0),
          a(t)("upload") ? (c(), _("div", {
            key: 4,
            class: "mx-1.5",
            title: a(s)("Upload"),
            onClick: y[4] || (y[4] = (m) => a(e).modal.open(un, { items: a(d) }))
          }, [
            Y(a(uo))
          ], 8, mv)) : H("", !0),
          a(t)("unarchive") && a(d).length === 1 && a(d)[0].mime_type === "application/zip" ? (c(), _("div", {
            key: 5,
            class: "mx-1.5",
            title: a(s)("Unarchive"),
            onClick: y[5] || (y[5] = (m) => !a(d).length || a(e).modal.open(vn, { items: a(d) }))
          }, [
            Y(a(vo), {
              class: se(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, hv)) : H("", !0),
          a(t)("archive") ? (c(), _("div", {
            key: 6,
            class: "mx-1.5",
            title: a(s)("Archive"),
            onClick: y[6] || (y[6] = (m) => !a(d).length || a(e).modal.open(fn, { items: a(d) }))
          }, [
            Y(a(fo), {
              class: se(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, gv)) : H("", !0)
        ]),
        o("div", yv, [
          a(t)("search") ? (c(), _("div", {
            key: 0,
            class: "mx-1.5",
            title: a(s)("Search Files"),
            onClick: y[7] || (y[7] = (m) => a(e).modal.open(dn))
          }, [
            Y(a(rn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
          ], 8, wv)) : H("", !0),
          o("div", bv, [
            o("div", {
              title: a(s)("Filter"),
              class: "vuefinder__toolbar__dropdown-trigger",
              onClick: y[8] || (y[8] = (m) => h.value = !h.value)
            }, [
              o("div", $v, [
                Y(a(dv), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
                b.value ? (c(), _("div", xv)) : H("", !0)
              ])
            ], 8, kv),
            h.value ? (c(), _("div", Sv, [
              o("div", Cv, [
                o("div", Fv, [
                  o("div", Ev, w(a(s)("Sorting")), 1),
                  o("div", Tv, [
                    ge(o("select", {
                      "onUpdate:modelValue": y[9] || (y[9] = (m) => v.value.sortBy = m),
                      class: "vuefinder__toolbar__dropdown-select"
                    }, [
                      o("option", Pv, w(a(s)("Name")), 1),
                      o("option", Dv, w(a(s)("Size")), 1),
                      o("option", Mv, w(a(s)("Date")), 1)
                    ], 512), [
                      [qt, v.value.sortBy]
                    ]),
                    ge(o("select", {
                      "onUpdate:modelValue": y[10] || (y[10] = (m) => v.value.sortOrder = m),
                      class: "vuefinder__toolbar__dropdown-select"
                    }, [
                      o("option", Iv, w(a(s)("None")), 1),
                      o("option", Av, w(a(s)("Asc")), 1),
                      o("option", Ov, w(a(s)("Desc")), 1)
                    ], 512), [
                      [qt, v.value.sortOrder]
                    ])
                  ])
                ]),
                o("div", Lv, [
                  o("div", Rv, w(a(s)("Show")), 1),
                  o("div", Bv, [
                    o("label", zv, [
                      ge(o("input", {
                        "onUpdate:modelValue": y[11] || (y[11] = (m) => v.value.filterKind = m),
                        type: "radio",
                        name: "filterKind",
                        value: "all",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [Vt, v.value.filterKind]
                      ]),
                      o("span", Vv, w(a(s)("All items")), 1)
                    ]),
                    o("label", Uv, [
                      ge(o("input", {
                        "onUpdate:modelValue": y[12] || (y[12] = (m) => v.value.filterKind = m),
                        type: "radio",
                        name: "filterKind",
                        value: "files",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [Vt, v.value.filterKind]
                      ]),
                      o("span", Nv, w(a(s)("Files only")), 1)
                    ]),
                    o("label", Hv, [
                      ge(o("input", {
                        "onUpdate:modelValue": y[13] || (y[13] = (m) => v.value.filterKind = m),
                        type: "radio",
                        name: "filterKind",
                        value: "folders",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [Vt, v.value.filterKind]
                      ]),
                      o("span", jv, w(a(s)("Folders only")), 1)
                    ])
                  ])
                ]),
                o("div", Kv, [
                  o("label", qv, w(a(s)("Show hidden files")), 1),
                  ge(o("input", {
                    id: "showHidden",
                    "onUpdate:modelValue": y[14] || (y[14] = (m) => v.value.showHidden = m),
                    type: "checkbox",
                    class: "vuefinder__toolbar__checkbox"
                  }, null, 512), [
                    [lt, v.value.showHidden]
                  ])
                ]),
                o("div", Wv, [
                  o("button", {
                    class: "vuefinder__toolbar__reset-button",
                    onClick: $
                  }, w(a(s)("Reset")), 1)
                ])
              ])
            ])) : H("", !0)
          ]),
          a(t)("fullscreen") ? (c(), _("div", {
            key: 1,
            class: "mx-1.5",
            title: a(s)("Toggle Full Screen"),
            onClick: y[15] || (y[15] = (m) => a(r).toggle("fullScreen"))
          }, [
            a(l).fullScreen ? (c(), Q(a(ev), {
              key: 0,
              class: "vf-toolbar-icon"
            })) : (c(), Q(a(Qu), {
              key: 1,
              class: "vf-toolbar-icon"
            }))
          ], 8, Gv)) : H("", !0),
          o("div", {
            class: "mx-1.5",
            title: a(s)("Change View"),
            onClick: y[16] || (y[16] = (m) => k())
          }, [
            a(l).view === "grid" ? (c(), Q(a(ov), {
              key: 0,
              class: "vf-toolbar-icon"
            })) : H("", !0),
            a(l).view === "list" ? (c(), Q(a(iv), {
              key: 1,
              class: "vf-toolbar-icon"
            })) : H("", !0)
          ], 8, Yv)
        ])
      ])
    ]);
  }
}), Qv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Jv(n, e) {
  return c(), _("svg", Qv, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Zv = { render: Jv }, ef = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function tf(n, e) {
  return c(), _("svg", ef, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const nf = { render: tf }, of = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function sf(n, e) {
  return c(), _("svg", of, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const af = { render: sf }, lf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function rf(n, e) {
  return c(), _("svg", lf, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const df = { render: rf }, cf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function uf(n, e) {
  return c(), _("svg", cf, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const vf = { render: uf };
function xt(n, e = []) {
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
    const b = s.getDraggedItem(), $ = s.sortedFiles.get().find((g) => $e(g) === b)?.path ?? "";
    r(v, $) ? p.dataTransfer && (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : (p.dataTransfer && (p.dataTransfer.dropEffect = "copy", p.dataTransfer.effectAllowed = "all"), p.currentTarget.classList.add(...e));
  }
  function d(p) {
    if (p.isExternalDrag || !(n.features?.move ?? !1))
      return;
    p.preventDefault();
    const k = p.currentTarget, b = Number(k.dataset[t] || 0);
    k.dataset[t] = String(b + 1);
  }
  function u(p) {
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
    const $ = p.dataTransfer?.getData("items") || "[]", y = JSON.parse($).map((m) => s.sortedFiles.get().find((S) => $e(S) === m)).filter((m) => !!m);
    s.clearDraggedItem(), n.modal.open(it, { items: { from: y, to: v } });
  }
  function h(p) {
    return {
      dragover: (v) => l(v, p),
      dragenter: d,
      dragleave: u,
      drop: (v) => f(v, p)
    };
  }
  return { events: h };
}
function ff() {
  const n = ce(), e = Ve(n), t = n.fs, s = n.config, { t: i } = n.i18n, r = oe(t.path), l = () => {
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
      await wt(t.path.get()?.path || ""), e.success(i("Path copied to clipboard"));
    }
  };
}
const _f = { class: "vuefinder__breadcrumb__container" }, pf = ["title"], mf = ["title"], hf = ["title"], gf = ["title"], yf = { class: "vuefinder__breadcrumb__path-container" }, wf = { class: "vuefinder__breadcrumb__list" }, bf = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, kf = { class: "relative" }, $f = ["title", "onClick"], xf = ["title"], Sf = { class: "vuefinder__breadcrumb__path-mode" }, Cf = { class: "vuefinder__breadcrumb__path-mode-content" }, Ff = ["title"], Ef = { class: "vuefinder__breadcrumb__path-text" }, Tf = ["title"], Pf = ["data-theme"], Df = ["onClick"], Mf = { class: "vuefinder__breadcrumb__hidden-item-content" }, If = { class: "vuefinder__breadcrumb__hidden-item-text" }, ct = 5, Pn = 1, Af = 40, Of = /* @__PURE__ */ ue({
  __name: "Breadcrumb",
  setup(n) {
    const e = ce(), t = ff(), { t: s } = e.i18n, i = e.fs, r = e.config, l = oe(r.state), d = oe(i.path), u = oe(i.loading), f = P(null), h = no(0, 100), p = P(5), v = P(!1), k = P(!1), b = O(() => d.value?.breadcrumb ?? []), $ = /* @__PURE__ */ new Map();
    function g(R, T) {
      return R.length > T ? [R.slice(-T), R.slice(0, -T)] : [R, []];
    }
    const y = O(
      () => g(b.value, p.value)[0]
    ), m = O(
      () => g(b.value, p.value)[1]
    );
    function S() {
      const R = b.value, T = h.value;
      if (!R.length || T <= 0) return null;
      let M = 0, z = 0;
      for (let B = R.length - 1; B >= 0; B--) {
        const j = R[B]?.name;
        if (!j) continue;
        const q = $.get(j);
        if (q === void 0) return null;
        if (M + q > T - Af || (M += q, z++, z >= ct)) break;
      }
      return z < Pn && (z = Pn), z > ct && (z = ct), z;
    }
    function x() {
      if (!f.value) return;
      const R = f.value.children, T = y.value;
      for (let M = 0; M < R.length; M++) {
        const z = T[M]?.name;
        if (!z) continue;
        const B = R[M].offsetWidth;
        B > 0 && $.set(z, B);
      }
    }
    async function L() {
      if (!b.value.length) {
        p.value = ct;
        return;
      }
      const R = S();
      if (R !== null) {
        p.value = R;
        return;
      }
      p.value = ct, await Oe(), x();
      const T = S();
      T !== null && (p.value = T);
    }
    me(h, L), me(b, L, { immediate: !0 });
    const C = () => {
      f.value && (h.value = f.value.offsetWidth);
    }, A = P(null);
    be(() => {
      A.value = new ResizeObserver(C), f.value && A.value.observe(f.value);
    }), Ae(() => {
      A.value && A.value.disconnect();
    });
    const W = xt(e, ["vuefinder__drag-over"]);
    function Z(R = null) {
      R ??= b.value.length - 2;
      const T = {
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
      return b.value[R] ?? T;
    }
    const te = () => {
      t.refresh();
    }, J = () => {
      y.value.length > 0 && t.goUp();
    }, G = (R) => {
      e.adapter.open(R.path), v.value = !1;
    }, E = () => {
      v.value && (v.value = !1);
    }, D = {
      mounted(R, T) {
        R.clickOutsideEvent = function(M) {
          R === M.target || R.contains(M.target) || T.value();
        }, document.body.addEventListener("click", R.clickOutsideEvent);
      },
      beforeUnmount(R) {
        document.body.removeEventListener("click", R.clickOutsideEvent);
      }
    }, V = () => {
      t.toggleTreeView();
    }, X = P({
      x: 0,
      y: 0
    }), fe = (R, T = null) => {
      if (R.currentTarget instanceof HTMLElement) {
        const { x: M, y: z, height: B } = R.currentTarget.getBoundingClientRect();
        X.value = { x: M, y: z + B };
      }
      v.value = T ?? !v.value;
    }, U = () => {
      k.value = !k.value;
    }, I = async () => {
      await t.copyCurrentPath();
    }, K = () => {
      k.value = !1;
    };
    return (R, T) => (c(), _("div", _f, [
      we(R.$slots, "breadcrumb-actions", {}, () => [
        o("span", {
          title: a(s)("Toggle Tree View")
        }, [
          Y(a(df), {
            class: se(["vuefinder__breadcrumb__toggle-tree", a(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
            onClick: V
          }, null, 8, ["class"])
        ], 8, pf),
        o("span", {
          title: a(s)("Go up a directory")
        }, [
          Y(a(_o), qe({
            class: b.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
          }, et(b.value.length ? a(W).events(Z()) : {}), { onClick: J }), null, 16, ["class"])
        ], 8, mf),
        a(i).isLoading() ? (c(), _("span", {
          key: 1,
          title: a(s)("Cancel")
        }, [
          Y(a(Qn), {
            onClick: T[0] || (T[0] = (M) => a(e).emitter.emit("vf-fetch-abort"))
          })
        ], 8, gf)) : (c(), _("span", {
          key: 0,
          title: a(s)("Refresh")
        }, [
          Y(a(Zv), { onClick: te })
        ], 8, hf))
      ]),
      ge(o("div", yf, [
        o("div", null, [
          Y(a(nf), qe({ class: "vuefinder__breadcrumb__home-icon" }, et(a(W).events(Z(-1))), {
            onClick: T[1] || (T[1] = pe((M) => a(e).adapter.open(a(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", wf, [
          m.value.length ? ge((c(), _("div", bf, [
            T[3] || (T[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", kf, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: T[2] || (T[2] = (M) => fe(M, !0)),
                onClick: pe(fe, ["stop"])
              }, [
                Y(a(ao), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [D, E]
          ]) : H("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: f,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (c(!0), _(_e, null, he(y.value, (M, z) => (c(), _("div", { key: z }, [
            T[4] || (T[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", qe({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: M.basename
            }, et(a(W).events(M), !0), {
              onClick: pe((B) => a(e).adapter.open(M.path), ["stop"])
            }), w(M.name), 17, $f)
          ]))), 128))
        ], 512),
        a(r).get("loadingIndicator") === "circular" && a(u) ? (c(), Q(a(Lt), { key: 0 })) : H("", !0),
        o("span", {
          title: a(s)("Toggle Path Copy Mode"),
          onClick: U
        }, [
          Y(a(vf), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, xf)
      ], 512), [
        [Ge, !k.value]
      ]),
      ge(o("div", Sf, [
        o("div", Cf, [
          o("div", {
            title: a(s)("Copy Path")
          }, [
            Y(a(sn), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: I
            })
          ], 8, Ff),
          o("div", Ef, w(a(d).path), 1),
          o("div", {
            title: a(s)("Exit")
          }, [
            Y(a(af), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: K
            })
          ], 8, Tf)
        ])
      ], 512), [
        [Ge, k.value]
      ]),
      (c(), Q(kt, { to: "body" }, [
        o("div", null, [
          ge(o("div", {
            style: Ie({
              position: "absolute",
              top: X.value.y + "px",
              left: X.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a(e).theme.current
          }, [
            (c(!0), _(_e, null, he(m.value, (M, z) => (c(), _("div", qe({
              key: z,
              class: "vuefinder__breadcrumb__hidden-item"
            }, et(a(W).events(M), !0), {
              onClick: (B) => G(M)
            }), [
              o("div", Mf, [
                o("span", null, [
                  Y(a(ze), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", If, w(M.name), 1)
              ])
            ], 16, Df))), 128))
          ], 12, Pf), [
            [Ge, v.value]
          ])
        ])
      ]))
    ]));
  }
}), Lf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Rf(n, e) {
  return c(), _("svg", Lf, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Dn = { render: Rf }, Bf = { class: "vuefinder__drag-item__container" }, zf = { class: "vuefinder__drag-item__count" }, Vf = /* @__PURE__ */ ue({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, s) => (c(), _("div", Bf, [
      e.count > 1 ? (c(), Q(a(Dn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : H("", !0),
      Y(a(Dn), { class: "vuefinder__drag-item__icon" }),
      o("div", zf, w(e.count), 1)
    ]));
  }
}), Uf = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Mn = /* @__PURE__ */ ue({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = ce(), s = oe(t.config.state), i = O(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), r = O(() => {
      const d = i.value, u = s.value?.listIconSize, f = s.value?.gridIconSize;
      return s.value?.gridItemWidth, s.value?.gridItemHeight, e.view === "list" || d === "small" ? {
        "--vf-icon-size": `${u ?? 16}px`
      } : {
        "--vf-icon-size": `${f ?? 48}px`
      };
    }), l = {
      app: t,
      config: s.value,
      item: e.item,
      view: e.view
    };
    return (d, u) => (c(), _("div", {
      class: se(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": i.value === "small",
        "vuefinder__item-icon--large": i.value === "large",
        "vuefinder__item-icon--grid": n.view === "grid",
        "vuefinder__item-icon--list": n.view === "list"
      }]),
      style: Ie(r.value)
    }, [
      we(d.$slots, "icon", Ce(Fe(l)), () => [
        n.item.type === "dir" ? (c(), Q(a(ze), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (c(), Q(a(gt), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (c(), _("div", Uf, w(n.item.extension.substring(0, 3)), 1)) : H("", !0)
      ])
    ], 6));
  }
}), Nf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Hf(n, e) {
  return c(), _("svg", Nf, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const In = { render: Hf }, jf = ["data-key", "data-row", "data-col", "draggable"], Kf = { key: 0 }, qf = { class: "vuefinder__explorer__item-grid-content" }, Wf = ["data-src", "alt"], Gf = { class: "vuefinder__explorer__item-title" }, Yf = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Xf = { class: "vuefinder__explorer__item-list-name" }, Qf = { class: "vuefinder__explorer__item-list-icon" }, Jf = { class: "vuefinder__explorer__item-name" }, Zf = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, e_ = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, t_ = { key: 0 }, n_ = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, o_ = /* @__PURE__ */ ue({
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
    const t = n, s = e, i = ce(), r = i.fs, l = i.config, d = O(() => {
      const G = i.selectionFilterType;
      return !G || G === "both" ? !0 : G === "files" && t.item.type === "file" || G === "dirs" && t.item.type === "dir";
    }), u = O(() => {
      const G = i.selectionFilterMimeIncludes;
      return !G || !G.length || t.item.type === "dir" ? !0 : t.item.mime_type ? G.some((E) => t.item.mime_type?.startsWith(E)) : !1;
    }), f = O(() => d.value && u.value), h = O(() => t.item.type === "dir" || f.value), p = O(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      // Disabled appearance: only for items the user cannot interact with at all.
      h.value ? "" : "vf-explorer-item--unselectable",
      // Excluded from rectangle selection but otherwise interactive (e.g. a
      // folder while selectionFilterType is 'files' — user can still navigate).
      h.value && !f.value ? "vf-explorer-item--no-select" : ""
    ]), v = O(() => ({
      opacity: t.isDragging || r.isCut($e(t.item)) || !h.value ? 0.5 : ""
    })), k = P(null);
    let b = !1, $ = null, g = null, y = !1;
    const { enabled: m } = Ne(), S = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), x = O(() => S ? !1 : m("move")), L = () => {
      $ && (clearTimeout($), $ = null), g = null;
    }, C = (G) => {
      L(), g = G, y = !1, G.stopPropagation(), $ = setTimeout(() => {
        !g || $ === null || (y = !0, g.cancelable && g.preventDefault(), g.stopPropagation(), s("contextmenu", g), L());
      }, 500);
    }, A = (G) => {
      if (y) {
        G.preventDefault(), G.stopPropagation(), L();
        return;
      }
      setTimeout(() => {
        y || (L(), J(G));
      }, 100);
    }, W = (G) => {
      if (!g) return;
      const E = g.touches[0] || g.changedTouches[0], D = G.touches[0] || G.changedTouches[0];
      if (E && D) {
        const V = Math.abs(D.clientX - E.clientX), X = Math.abs(D.clientY - E.clientY);
        (V > 15 || X > 15) && L();
      }
    }, Z = (G) => {
      S && G.type !== "click" || s("click", G);
    }, te = (G) => {
      if (y)
        return G.preventDefault(), G.stopPropagation(), !1;
      s("dragstart", G);
    }, J = (G) => {
      if (!b)
        b = !0, s("click", G), k.value = setTimeout(() => {
          b = !1;
        }, 300);
      else
        return b = !1, s("dblclick", G), !1;
    };
    return (G, E) => (c(), _("div", {
      class: se(p.value),
      style: Ie(v.value),
      "data-key": a($e)(n.item),
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: x.value,
      onTouchstartCapture: E[1] || (E[1] = (D) => C(D)),
      onTouchendCapture: E[2] || (E[2] = (D) => A(D)),
      onTouchmoveCapture: W,
      onTouchcancelCapture: E[3] || (E[3] = () => L()),
      onClick: Z,
      onDblclick: E[4] || (E[4] = (D) => s("dblclick", D)),
      onContextmenu: E[5] || (E[5] = pe((D) => s("contextmenu", D), ["prevent", "stop"])),
      onDragstart: te,
      onDragend: E[6] || (E[6] = (D) => s("dragend", D))
    }, [
      n.view === "grid" ? (c(), _("div", Kf, [
        a(r).isReadOnly(n.item) ? (c(), Q(a(In), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : H("", !0),
        o("div", qf, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (c(), _("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? a(i).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: E[0] || (E[0] = (D) => D.preventDefault())
          }, null, 40, Wf)) : (c(), Q(Mn, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: de((D) => [
              we(G.$slots, "icon", Ce(Fe(D)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        o("span", Gf, w(a(vt)(n.item.basename)), 1)
      ])) : (c(), _("div", Yf, [
        o("div", Xf, [
          o("div", Qf, [
            Y(Mn, {
              item: n.item,
              view: n.view
            }, {
              icon: de((D) => [
                we(G.$slots, "icon", Ce(Fe(D)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          o("span", Jf, w(n.item.basename), 1),
          o("div", null, [
            a(r).isReadOnly(n.item) ? (c(), Q(a(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : H("", !0)
          ])
        ]),
        n.showPath ? (c(), _("div", Zf, w(n.item.path), 1)) : H("", !0),
        n.showPath ? H("", !0) : (c(), _("div", e_, [
          n.item.file_size ? (c(), _("div", t_, w(a(i).filesize(n.item.file_size)), 1)) : H("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (c(), _("div", n_, w(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : H("", !0)
      ])),
      a(m)("pinned") && a(l).get("pinnedFolders").find((D) => D.path === n.item.path) ? (c(), Q(a(yt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : H("", !0)
    ], 46, jf));
  }
}), s_ = ["data-row"], An = /* @__PURE__ */ ue({
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
    const t = n, s = e, i = O(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), r = O(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), l = O(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (d, u) => (c(), _("div", {
      class: se(i.value),
      "data-row": n.rowIndex,
      style: Ie(r.value)
    }, [
      o("div", {
        class: se(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Ie(l.value)
      }, [
        (c(!0), _(_e, null, he(n.items, (f, h) => (c(), Q(o_, qe({
          key: a($e)(f),
          item: f,
          view: n.view,
          "show-thumbnails": n.showThumbnails,
          "show-path": n.showPath,
          "is-selected": n.isSelected(a($e)(f)),
          "is-dragging": n.isDraggingItem(a($e)(f)),
          "row-index": n.rowIndex,
          "col-index": h,
          "explorer-id": n.explorerId
        }, et(n.dragNDropEvents(f)), {
          onClick: u[0] || (u[0] = (p) => s("click", p)),
          onDblclick: u[1] || (u[1] = (p) => s("dblclick", p)),
          onContextmenu: u[2] || (u[2] = (p) => s("contextmenu", p)),
          onDragstart: u[3] || (u[3] = (p) => s("dragstart", p)),
          onDragend: u[4] || (u[4] = (p) => s("dragend", p))
        }), {
          icon: de((p) => [
            we(d.$slots, "icon", qe({ ref_for: !0 }, p))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, s_));
  }
}), a_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function i_(n, e) {
  return c(), _("svg", a_, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const l_ = { render: i_ }, r_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function d_(n, e) {
  return c(), _("svg", r_, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const c_ = { render: d_ }, Kt = /* @__PURE__ */ ue({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (c(), _("div", null, [
      n.direction === "asc" ? (c(), Q(a(l_), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : H("", !0),
      n.direction === "desc" ? (c(), Q(a(c_), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : H("", !0)
    ]));
  }
}), u_ = { class: "vuefinder__explorer__header" }, v_ = /* @__PURE__ */ ue({
  __name: "ExplorerHeader",
  setup(n) {
    const e = ce(), t = e.fs, { t: s } = e.i18n, i = oe(t.sort);
    return (r, l) => (c(), _("div", u_, [
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: l[0] || (l[0] = (d) => a(t).toggleSort("basename"))
      }, [
        ye(w(a(s)("Name")) + " ", 1),
        ge(Y(Kt, {
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
        ge(Y(Kt, {
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
        ge(Y(Kt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function f_(n, e) {
  const {
    scrollContainer: t,
    itemWidth: s = 100,
    rowHeight: i,
    overscan: r = 2,
    containerPadding: l = 48,
    lockItemsPerRow: d
  } = e, u = n, f = () => typeof i == "number" ? i : i.value, h = () => s ? typeof s == "number" ? s : s.value : 100, p = () => l ? typeof l == "number" ? l : l.value : 0, v = P(0), k = P(6), b = P(600);
  let $ = null;
  const g = O(() => Math.ceil(u.value.length / k.value)), y = O(() => g.value * f()), m = O(() => {
    const J = f(), G = Math.max(0, Math.floor(v.value / J) - r), E = Math.min(
      g.value,
      Math.ceil((v.value + b.value) / J) + r
    );
    return { start: G, end: E };
  }), S = O(() => {
    const { start: J, end: G } = m.value;
    return Array.from({ length: G - J }, (E, D) => J + D);
  }), x = () => b.value, L = () => typeof d == "object" ? d.value : !1, C = () => {
    if (L()) {
      k.value = 1;
      return;
    }
    if (t.value) {
      const J = p(), G = t.value.clientWidth - J, E = h();
      E > 0 && (k.value = Math.max(Math.floor(G / E), 2));
    }
  }, A = (J) => {
    const G = J.target;
    v.value = G.scrollTop;
  };
  me(
    () => u.value.length,
    () => {
      C();
    }
  ), s && typeof s != "number" && me(s, () => {
    C();
  }), l && typeof l != "number" && me(l, () => {
    C();
  }), i && typeof i != "number" && me(i, () => {
  });
  const W = (J, G) => {
    if (!J || !Array.isArray(J))
      return [];
    const E = G * k.value;
    return J.slice(E, E + k.value);
  }, Z = (J, G, E, D, V) => {
    if (!J || !Array.isArray(J))
      return [];
    const X = [];
    for (let fe = G; fe <= E; fe++)
      for (let U = D; U <= V; U++) {
        const I = fe * k.value + U;
        I < J.length && J[I] && X.push(J[I]);
      }
    return X;
  }, te = (J) => ({
    row: Math.floor(J / k.value),
    col: J % k.value
  });
  return be(async () => {
    await Oe(), t.value && (b.value = t.value.clientHeight || 600), C(), window.addEventListener("resize", () => {
      t.value && (b.value = t.value.clientHeight || 600), C();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((J) => {
      const G = J[0];
      G && (b.value = Math.round(G.contentRect.height)), C();
    }), $.observe(t.value));
  }), Ae(() => {
    window.removeEventListener("resize", C), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: v,
    itemsPerRow: k,
    totalRows: g,
    totalHeight: y,
    visibleRange: m,
    visibleRows: S,
    updateItemsPerRow: C,
    handleScroll: A,
    getRowItems: W,
    getItemsInRange: Z,
    getItemPosition: te,
    getContainerHeight: x
  };
}
function __(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: s,
    getKey: i,
    selectionObject: r,
    rowHeight: l,
    itemWidth: d,
    osInstance: u
  } = n, f = () => typeof d == "number" ? d : d.value, h = Math.floor(Math.random() * 2 ** 32).toString(), p = ce(), v = p.fs, k = oe(v.selectedKeys), b = oe(v.sortedFiles), $ = O(() => {
    const U = /* @__PURE__ */ new Map();
    return b.value && b.value.forEach((I) => {
      U.set(i(I), I);
    }), U;
  }), g = P(/* @__PURE__ */ new Set()), y = P(!1), m = P(!1), S = (U) => U.map((I) => I.getAttribute("data-key")).filter((I) => !!I), x = (U) => {
    U.selection.clearSelection(!0, !0);
  }, L = (U) => {
    if (k.value && k.value.size > 0) {
      const I = document.querySelectorAll(`.file-item-${h}[data-key]`), K = /* @__PURE__ */ new Map();
      I.forEach((T) => {
        const M = T.getAttribute("data-key");
        M && K.set(M, T);
      });
      const R = [];
      k.value.forEach((T) => {
        const M = K.get(T);
        M && C(T) && R.push(M);
      }), R.forEach((T) => {
        U.selection.select(T, !0);
      });
    }
  }, C = (U) => {
    const I = $.value.get(U);
    if (!I) return !1;
    const K = p.selectionFilterType, R = p.selectionFilterMimeIncludes;
    return K === "files" && I.type === "dir" || K === "dirs" && I.type === "file" ? !1 : R && Array.isArray(R) && R.length > 0 ? I.type === "dir" ? !0 : I.mime_type ? R.some((T) => I.mime_type?.startsWith(T)) : !1 : !0;
  }, A = (U) => {
    if (p.selectionMode === "single")
      return !1;
    y.value = !1, !U.event?.metaKey && !U.event?.ctrlKey && (m.value = !0), U.selection.resolveSelectables(), x(U), L(U);
  }, W = P(0), Z = ({ event: U, selection: I }) => {
    W.value = (r.value?.getAreaLocation().y1 ?? 0) - (p.root.getBoundingClientRect().top ?? 0);
    const K = document.querySelector(
      ".selection-area-container"
    );
    if (K && (K.dataset.theme = p.theme.current), p.selectionMode === "single")
      return;
    const R = U;
    R && "type" in R && R.type === "touchend" && R.preventDefault();
    const T = U;
    !T?.ctrlKey && !T?.metaKey && (v.clearSelection(), I.clearSelection(!0, !0)), g.value.clear();
  }, te = (U) => {
    if (p.selectionMode === "single")
      return;
    const I = S(U.store.changed.added), K = S(U.store.changed.removed);
    m.value = !1, y.value = !0, I.forEach((R) => {
      k.value && !k.value.has(R) && C(R) && (g.value.add(R), v.select(R, p.selectionMode || "multiple"));
    }), K.forEach((R) => {
      document.querySelector(`[data-key="${R}"]`) && $.value.has(R) && g.value.delete(R), v.deselect(R);
    }), U.selection.resolveSelectables(), L(U);
  }, J = () => {
    g.value.clear();
  }, G = (U) => {
    if (!U.event)
      return;
    const I = document.querySelector(".scroller-" + h);
    if (!I)
      return;
    const K = I.getBoundingClientRect(), R = K.left, T = K.top;
    let M = I.scrollTop;
    if (u?.value) {
      const { viewport: Xe } = u.value.elements();
      Xe && (M = Xe.scrollTop);
    }
    const z = r.value?.getAreaLocation();
    if (!z)
      return;
    const B = Math.min(z.x1, z.x2), j = M + Math.min(z.y1, z.y2), q = Math.max(z.x1, z.x2), re = M + Math.max(z.y1, z.y2), ne = 4, F = f();
    let N = Math.floor((B - R - ne) / F), ie = Math.floor((q - R - ne) / F);
    const ke = B - R - ne - N * F, Pe = q - R - ne - ie * F;
    ke > F - ne && (N = N + 1), Pe < ne && (ie = ie - 1);
    const Je = Math.max(0, N), ee = Math.min(e.value - 1, ie);
    let ae = Math.floor((j - T - ne) / l.value), le = Math.floor((re - T - ne) / l.value);
    const ve = j - T - ne - ae * l.value, He = re - T - ne - le * l.value, Me = Math.floor((t.value - ne) / l.value);
    ve > l.value - ne && (ae = ae + 1), He < ne && (le = le - 1);
    const Ee = Math.max(0, ae), Ye = Math.min(le, Me), Le = s(
      b.value,
      Ee,
      Ye,
      Je,
      ee
    ), Bt = document.querySelectorAll(`.file-item-${h}[data-key]`), hn = /* @__PURE__ */ new Map();
    Bt.forEach((Xe) => {
      const rt = Xe.getAttribute("data-key");
      rt && hn.set(rt, Xe);
    });
    const zt = [];
    if (Le.forEach((Xe) => {
      const rt = i(Xe);
      hn.get(rt) || zt.push(rt);
    }), zt.length > 0) {
      const Xe = p.selectionMode || "multiple";
      v.selectMultiple(zt, Xe);
    }
  }, E = (U) => {
    G(U), x(U), L(U), v.setSelectedCount(k.value?.size || 0), y.value = !1;
  }, D = () => {
    let U = [".scroller-" + h];
    if (u?.value) {
      const { viewport: I } = u.value.elements();
      I && (U = I);
    }
    r.value = new Io({
      selectables: [
        ".file-item-" + h + ":not(.vf-explorer-item--unselectable):not(.vf-explorer-item--no-select)"
      ],
      boundaries: U,
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
    }), r.value.on("beforestart", A), r.value.on("start", Z), r.value.on("move", te), r.value.on("stop", E);
  }, V = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, X = () => {
    r.value && (Array.from(
      k.value ?? /* @__PURE__ */ new Set()
    ).forEach((I) => {
      C(I) || v.deselect(I);
    }), V(), D());
  }, fe = (U) => {
    m.value && (r.value?.clearSelection(), J(), m.value = !1);
    const I = U;
    !g.value.size && !m.value && !I?.ctrlKey && !I?.metaKey && (v.clearSelection(), r.value?.clearSelection());
  };
  return be(() => {
    const U = (I) => {
      !I.buttons && y.value && (y.value = !1);
    };
    document.addEventListener("dragleave", U), Ae(() => {
      document.removeEventListener("dragleave", U);
    });
  }), {
    explorerId: h,
    isDragging: y,
    initializeSelectionArea: D,
    updateSelectionArea: X,
    handleContentClick: fe
  };
}
function p_(n) {
  const e = (s) => {
    if (!s)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const i = n.selectionFilterType, r = n.selectionFilterMimeIncludes, l = !i || i === "both" || i === "files" && s.type === "file" || i === "dirs" && s.type === "dir";
    let d = !0;
    return r && Array.isArray(r) && r.length > 0 && (s.type === "dir" ? d = !0 : s.mime_type ? d = r.some((u) => s.mime_type.startsWith(u)) : d = !1), { typeAllowed: l, mimeAllowed: d };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (s) => {
      const { typeAllowed: i, mimeAllowed: r } = e(s);
      return i && r;
    }
  };
}
function m_(n) {
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
      const d = n.contextMenuItems?.find((u) => u.show(n, {
        items: [s],
        target: s,
        searchQuery: ""
      }));
      d && d.action(n, [s]);
    }
  };
}
function h_(n, e, t, s, i, r, l) {
  const d = n.fs, { canSelectItem: u } = p_(n), { openItem: f } = m_(n), h = (g) => {
    const y = g.target?.closest(".file-item-" + e);
    if (!y) return null;
    const m = String(y.getAttribute("data-key")), S = t.value?.find((x) => $e(x) === m);
    return { key: m, item: S };
  }, p = () => {
    const g = s.value;
    return t.value?.filter((y) => g?.has($e(y))) || [];
  };
  return {
    handleItemClick: (g) => {
      const y = h(g);
      if (!y) return;
      const { key: m, item: S } = y, x = g;
      if (!u(S)) {
        S?.type === "dir" && (d.clearSelection(), i.value?.clearSelection(!0, !0), d.setSelectedCount(0));
        return;
      }
      const L = n.selectionMode || "multiple";
      !x?.ctrlKey && !x?.metaKey && (g.type !== "touchstart" || !d.isSelected(m)) && (d.clearSelection(), i.value?.clearSelection(!0, !0)), i.value?.resolveSelectables(), g.type === "touchstart" && d.isSelected(m) ? d.select(m, L) : d.toggleSelect(m, L), d.setSelectedCount(s.value?.size || 0);
    },
    handleItemDblClick: (g) => {
      const y = h(g);
      if (!y) return;
      const { item: m } = y;
      m && (m.type === "file" && !u(m) || f(m, r, l));
    },
    handleItemContextMenu: (g) => {
      g.preventDefault(), g.stopPropagation();
      const y = h(g);
      if (!y) return;
      const { key: m, item: S } = y;
      u(S) && (s.value?.has(m) || (d.clearSelection(), d.select(m)), n.emitter.emit("vf-contextmenu-show", {
        event: g,
        items: p(),
        target: S
      }));
    },
    handleContentContextMenu: (g) => {
      g.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: g, items: p() });
    },
    getSelectedItems: p
  };
}
function g_(n, e) {
  const t = P(null);
  return be(() => {
    if (_t.plugin([Mo]), n.value) {
      const s = _t(
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
  }), Ae(() => {
    if (t.value) {
      const { viewport: s } = t.value.elements();
      s && s.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
const y_ = 4, w_ = 600;
function b_(n, e) {
  const t = P(null), s = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  return be(() => {
    n.value && (t.value = new Wt({
      elements_selector: ".lazy",
      container: n.value,
      // Put the placeholder back so the browser doesn't show a broken-image
      // icon (the "?" thumbnail) while we retry.
      restore_on_error: !0,
      callback_error: (r, l) => {
        const d = (s.get(r) ?? 0) + 1;
        if (d > y_) return;
        s.set(r, d);
        const u = w_ * 2 ** (d - 1) + Math.random() * 250, f = i.get(r);
        f && clearTimeout(f), i.set(
          r,
          setTimeout(() => {
            r.isConnected && (Wt.resetStatus(r), l.update());
          }, u)
        );
      }
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), ko(() => {
    t.value && t.value.update();
  }), Ae(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const k_ = { class: "vuefinder__explorer__container" }, $_ = {
  key: 0,
  class: "vuefinder__linear-loader"
}, x_ = /* @__PURE__ */ ue({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = ce(), s = xt(t, ["vuefinder__drag-over"]), i = st("dragImage"), r = ft(null), l = st("scrollContainer"), d = st("scrollContent"), u = t.fs, f = t.config, h = oe(f.state), p = oe(u.sortedFiles), v = oe(u.selectedKeys), k = oe(u.loading), b = (F) => v.value?.has(F) ?? !1, $ = O(() => {
      if (h.value?.view === "grid") {
        const ke = h.value?.gridItemHeight ?? 80, Pe = h.value?.gridItemGap ?? 8;
        return ke + Pe * 2;
      }
      const N = h.value?.listItemHeight ?? 32, ie = h.value?.listItemGap ?? 2;
      return N + ie * 2;
    }), g = O(() => {
      if (h.value?.view === "grid") {
        const N = h.value?.gridItemWidth ?? 96, ie = h.value?.gridItemGap ?? 8;
        return N + ie * 2;
      }
      return 104;
    }), y = O(() => h.value?.view === "grid" ? (h.value?.gridItemGap ?? 8) * 2 : 0), { t: m } = t.i18n, {
      itemsPerRow: S,
      totalHeight: x,
      visibleRows: L,
      handleScroll: C,
      getRowItems: A,
      getItemsInRange: W,
      updateItemsPerRow: Z
    } = f_(
      O(() => p.value ?? []),
      {
        scrollContainer: l,
        itemWidth: g,
        rowHeight: $,
        overscan: 2,
        containerPadding: y,
        lockItemsPerRow: O(() => h.value.view === "list")
      }
    ), { osInstance: te } = g_(l, C), { explorerId: J, isDragging: G, initializeSelectionArea: E, updateSelectionArea: D, handleContentClick: V } = __({
      itemsPerRow: S,
      totalHeight: x,
      getItemsInRange: W,
      getKey: (F) => $e(F),
      selectionObject: r,
      rowHeight: $,
      itemWidth: g,
      osInstance: te
    }), X = P(null), fe = (F) => {
      if (!F || !X.value) return !1;
      const N = v.value?.has(X.value) ?? !1;
      return G.value && (N ? v.value?.has(F) ?? !1 : F === X.value);
    };
    me(
      () => f.get("view"),
      (F) => {
        F === "list" ? S.value = 1 : Z();
      },
      { immediate: !0 }
    ), me(S, (F) => {
      f.get("view") === "list" && F !== 1 && (S.value = 1);
    });
    const U = (F) => p.value?.[F];
    b_(l, t);
    const { handleItemClick: I, handleItemDblClick: K, handleItemContextMenu: R, handleContentContextMenu: T } = h_(
      t,
      J,
      p,
      v,
      r,
      e.onFileDclick,
      e.onFolderDclick
    );
    be(() => {
      const F = () => {
        r.value || E(), r.value && r.value.on("beforestart", ({ event: N }) => {
          const ie = N?.target === d.value;
          if (!N?.metaKey && !N?.ctrlKey && !N?.altKey && !ie)
            return !1;
        });
      };
      if (te.value)
        F();
      else {
        const N = setInterval(() => {
          te.value && (clearInterval(N), F());
        }, 50);
        setTimeout(() => {
          clearInterval(N), r.value || F();
        }, 500);
      }
      me(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], D, {
        deep: !0
      });
    });
    const M = (F) => {
      if (!(t.features?.move ?? !1) || F.altKey || F.ctrlKey || F.metaKey)
        return F.preventDefault(), !1;
      G.value = !0;
      const ie = F.target?.closest(
        ".file-item-" + J
      );
      if (X.value = ie ? String(ie.dataset.key) : null, F.dataTransfer && X.value) {
        F.dataTransfer.setDragImage(i.value, 0, 15), F.dataTransfer.effectAllowed = "all", F.dataTransfer.dropEffect = "copy";
        const ke = v.value?.has(X.value) ? Array.from(v.value) : [X.value];
        F.dataTransfer.setData("items", JSON.stringify(ke)), u.setDraggedItem(X.value);
      }
    }, z = () => {
      X.value = null;
    };
    let B = null, j = null;
    const q = (F) => {
      F.target?.closest(".file-item-" + J) || (j = F, B && clearTimeout(B), B = setTimeout(() => {
        j && (j.cancelable && j.preventDefault(), j.stopPropagation(), T(j)), j = null, B = null;
      }, 500));
    }, re = (F) => {
      B && (clearTimeout(B), B = null), j = null;
    }, ne = (F) => {
      if (!j) return;
      const N = j.touches[0] || j.changedTouches[0], ie = F.touches[0] || F.changedTouches[0];
      if (N && ie) {
        const ke = Math.abs(ie.clientX - N.clientX), Pe = Math.abs(ie.clientY - N.clientY);
        (ke > 15 || Pe > 15) && (B && (clearTimeout(B), B = null), j = null);
      }
    };
    return (F, N) => (c(), _("div", k_, [
      a(h).view === "list" ? (c(), Q(v_, { key: 0 })) : H("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: se(["vuefinder__explorer__selector-area", "scroller-" + a(J)])
      }, [
        a(f).get("loadingIndicator") === "linear" && a(k) ? (c(), _("div", $_)) : H("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: d,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ie({ height: `${a(x)}px`, position: "relative", width: "100%" }),
          onContextmenu: N[0] || (N[0] = pe(
            //@ts-ignore
            (...ie) => a(T) && a(T)(...ie),
            ["self", "prevent"]
          )),
          onClick: N[1] || (N[1] = pe(
            //@ts-ignore
            (...ie) => a(V) && a(V)(...ie),
            ["self"]
          )),
          onTouchstartCapture: pe(q, ["self"]),
          onTouchendCapture: pe(re, ["self"]),
          onTouchmoveCapture: pe(ne, ["self"]),
          onTouchcancelCapture: pe(re, ["self"])
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            Y(Vf, {
              count: X.value && a(v).has(X.value) ? a(v).size : 1
            }, null, 8, ["count"])
          ], 512),
          a(h).view === "grid" ? (c(!0), _(_e, { key: 0 }, he(a(L), (ie) => (c(), Q(An, {
            key: ie,
            "row-index": ie,
            "row-height": $.value,
            view: "grid",
            "items-per-row": a(S),
            items: a(A)(a(p), ie),
            "show-thumbnails": a(h).showThumbnails,
            "is-dragging-item": fe,
            "is-selected": b,
            "drag-n-drop-events": (ke) => a(s).events(ke),
            "explorer-id": a(J),
            onClick: a(I),
            onDblclick: a(K),
            onContextmenu: a(R),
            onDragstart: M,
            onDragend: z
          }, {
            icon: de((ke) => [
              we(F.$slots, "icon", qe({ ref_for: !0 }, ke))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (c(!0), _(_e, { key: 1 }, he(a(L), (ie) => (c(), Q(An, {
            key: ie,
            "row-index": ie,
            "row-height": $.value,
            view: "list",
            items: U(ie) ? [U(ie)] : [],
            "is-dragging-item": fe,
            "is-selected": b,
            "drag-n-drop-events": (ke) => a(s).events(ke),
            "explorer-id": a(J),
            onClick: a(I),
            onDblclick: a(K),
            onContextmenu: a(R),
            onDragstart: M,
            onDragend: z
          }, {
            icon: de((ke) => [
              we(F.$slots, "icon", qe({ ref_for: !0 }, ke))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), S_ = ["href", "download"], C_ = { class: "vuefinder__context-menu__action vuefinder__context-menu__action--parent" }, F_ = { class: "vuefinder__context-menu vuefinder__context-menu__submenu" }, E_ = ["onClick"], T_ = ["onClick"], P_ = /* @__PURE__ */ ue({
  __name: "ContextMenu",
  setup(n) {
    const e = ce(), t = P(null), s = P([]);
    let i = null, r = null, l = null, d = [], u = null;
    const f = Pt({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (k) => {
      s.value = k;
    });
    const h = (k) => k.link(e, s.value), p = (k) => {
      e.emitter.emit("vf-contextmenu-hide"), k.action(e, s.value);
    };
    e.emitter.on("vf-contextmenu-show", (k) => {
      const { event: b, items: $, target: g = null } = k || {};
      f.items = (e.contextMenuItems || []).filter((y) => y.show(e, {
        items: $,
        target: g
      })).sort((y, m) => {
        const S = y.order ?? 1 / 0, x = m.order ?? 1 / 0;
        return S - x;
      }), g ? $.length > 1 && $.some((y) => y.path === g.path) ? e.emitter.emit("vf-context-selected", $) : e.emitter.emit("vf-context-selected", [g]) : e.emitter.emit("vf-context-selected", []), v(b);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      f.active = !1, i && (i(), i = null), l && (d.forEach((k) => {
        k === window ? window.removeEventListener("scroll", l, !0) : k.removeEventListener("scroll", l, !0);
      }), l = null, d = []), u && (document.removeEventListener("mousedown", u, !0), document.removeEventListener("touchstart", u, !0), u = null), r = null, f.positions = {};
    });
    const v = async (k) => {
      i && (i(), i = null);
      const $ = ((C) => {
        if ("clientX" in C && "clientY" in C)
          return { x: C.clientX, y: C.clientY };
        const A = "touches" in C && C.touches[0] || "changedTouches" in C && C.changedTouches[0];
        return A ? { x: A.clientX, y: A.clientY } : { x: 0, y: 0 };
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
      }, f.active = !0, await Oe(), !t.value || !r) return;
      await new Promise((C) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(C);
        });
      });
      const g = [
        pt(8),
        mt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        ht({ padding: 16 })
      ];
      let y = 0, m = 0;
      try {
        const C = await at(r, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: g
        });
        y = C.x, m = C.y;
      } catch (C) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", C);
        return;
      }
      f.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${y}px`,
        top: `${m}px`,
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
      const x = ((C) => {
        const A = [];
        let W = C;
        for (; W && W !== document.body && W !== document.documentElement; ) {
          const Z = window.getComputedStyle(W), te = Z.overflow + Z.overflowX + Z.overflowY;
          (te.includes("scroll") || te.includes("auto")) && A.push(W), W = W.parentElement;
        }
        return A;
      })(t.value);
      d = [window, ...x], l = () => {
        f.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const L = l;
      L && d.forEach((C) => {
        C === window ? window.addEventListener("scroll", L, !0) : C.addEventListener("scroll", L, !0);
      }), u = (C) => {
        if (!f.active) return;
        const A = C.target;
        if (!A || t.value && t.value.contains(A))
          return;
        const W = e.root;
        W && W.contains(A) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        u && (document.addEventListener("mousedown", u, !0), document.addEventListener("touchstart", u, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !r))
          try {
            i = Xt(r, t.value, async () => {
              if (!(!r || !t.value))
                try {
                  const { x: C, y: A } = await at(r, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: g
                  });
                  f.positions = {
                    ...f.positions,
                    left: `${C}px`,
                    top: `${A}px`
                  };
                } catch (C) {
                  console.warn("Floating UI positioning error:", C);
                }
            });
          } catch (C) {
            console.warn("Floating UI autoUpdate setup error:", C), i = null;
          }
      }, 200);
    };
    return Ae(() => {
      i && (i(), i = null), l && (d.forEach((k) => {
        k === window ? window.removeEventListener("scroll", l, !0) : k.removeEventListener("scroll", l, !0);
      }), l = null, d = []), u && (document.removeEventListener("mousedown", u, !0), document.removeEventListener("touchstart", u, !0), u = null), r = null;
    }), (k, b) => ge((c(), _("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: se([{
        "vuefinder__context-menu--active": f.active,
        "vuefinder__context-menu--inactive": !f.active
      }, "vuefinder__context-menu"]),
      style: Ie(f.positions)
    }, [
      (c(!0), _(_e, null, he(f.items, ($) => (c(), _("li", {
        key: $.title,
        class: se(["vuefinder__context-menu__item", { "vuefinder__context-menu__item--has-children": $.children?.length }])
      }, [
        $.link ? (c(), _("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: h($),
          download: h($),
          onClick: b[0] || (b[0] = (g) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, w($.title(a(e).i18n)), 1)
        ], 8, S_)) : $.children?.length ? (c(), _(_e, { key: 1 }, [
          o("div", C_, [
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
          o("ul", F_, [
            (c(!0), _(_e, null, he($.children, (g) => (c(), _("li", {
              key: g.id,
              class: "vuefinder__context-menu__item"
            }, [
              o("div", {
                class: "vuefinder__context-menu__action",
                onClick: (y) => p(g)
              }, [
                o("span", null, w(g.title(a(e).i18n)), 1)
              ], 8, E_)
            ]))), 128))
          ])
        ], 64)) : (c(), _("div", {
          key: 2,
          class: "vuefinder__context-menu__action",
          onClick: (g) => p($)
        }, [
          o("span", null, w($.title(a(e).i18n)), 1)
        ], 8, T_))
      ], 2))), 128))
    ], 6)), [
      [Ge, f.active]
    ]);
  }
}), D_ = { class: "vuefinder__status-bar__wrapper" }, M_ = { class: "vuefinder__status-bar__storage" }, I_ = ["title"], A_ = { class: "vuefinder__status-bar__storage-icon" }, O_ = ["value"], L_ = ["value"], R_ = { class: "vuefinder__status-bar__info space-x-2" }, B_ = { key: 0 }, z_ = { class: "vuefinder__status-bar__size" }, V_ = { key: 1 }, U_ = { class: "vuefinder__status-bar__size" }, N_ = { class: "vuefinder__status-bar__actions" }, H_ = /* @__PURE__ */ ue({
  __name: "Statusbar",
  setup(n) {
    const e = ce(), { t } = e.i18n, s = e.fs, i = oe(s.sortedFiles), r = oe(s.path), l = oe(s.selectedCount), d = oe(s.storages), u = oe(s.selectedItems), f = oe(s.path), h = (y) => {
      const m = y.target.value;
      e.adapter.open(m + "://");
    }, p = O(() => !u.value || u.value.length === 0 ? 0 : u.value.reduce((y, m) => y + (m.file_size || 0), 0)), v = O(() => !i.value || i.value.length === 0 ? 0 : i.value.reduce((y, m) => y + (m.file_size || 0), 0)), k = O(() => d.value), b = O(() => i.value), $ = O(() => l.value || 0), g = O(() => u.value || []);
    return console.log("sortedFilesList", b), (y, m) => (c(), _("div", D_, [
      o("div", M_, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(t)("Storage")
        }, [
          o("div", A_, [
            Y(a(an))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: a(r).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: h
          }, [
            (c(!0), _(_e, null, he(k.value, (S) => (c(), _("option", {
              key: S,
              value: S
            }, w(S), 9, L_))), 128))
          ], 40, O_),
          m[0] || (m[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-": "",
            hidden: "true"
          }, null, -1))
        ], 8, I_),
        o("div", R_, [
          $.value === 0 ? (c(), _("span", B_, [
            ye(w(b.value.length) + " " + w(a(t)("items")) + " ", 1),
            o("span", z_, " - " + w(a(e).filesize(v.value)), 1)
          ])) : (c(), _("span", V_, [
            ye(w($.value) + " " + w(a(t)("selected")) + " ", 1),
            o("span", U_, w(a(e).filesize(p.value)), 1)
          ]))
        ])
      ]),
      o("div", N_, [
        we(y.$slots, "actions", {
          path: a(f).path,
          count: $.value || 0,
          selected: g.value
        })
      ])
    ]));
  }
});
function j_() {
  const n = ce(), e = n.fs, t = n.config, { t: s } = n.i18n, { getStore: i, setStore: r } = n.storage, l = oe(t.state), d = oe(e.path), u = oe(e.storages), f = xt(n, ["vuefinder__drag-over"]), h = O(
    () => l.value.pinnedFolders
  ), p = P(i("pinned-folders-opened", !0));
  return me(p, (g) => r("pinned-folders-opened", g)), {
    t: s,
    configState: l,
    currentPath: d,
    storages: u,
    dragNDrop: f,
    pinnedFolders: h,
    pinnedFoldersOpened: p,
    togglePinnedFoldersOpened: () => {
      p.value = !p.value;
    },
    isActivePath: (g) => d.value?.path === g,
    openPath: (g) => {
      n.adapter.open(g);
    },
    removePin: (g) => {
      const y = t.get("pinnedFolders") ?? [];
      t.set("pinnedFolders", y.filter((m) => m.path !== g.path));
    }
  };
}
const K_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function q_(n, e) {
  return c(), _("svg", K_, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const W_ = { render: q_ };
function mo(n, e) {
  const t = n.findIndex((s) => s.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const G_ = { class: "vuefinder__folder-loader-indicator" }, Y_ = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, ho = /* @__PURE__ */ ue({
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
    const e = n, t = ce(), s = Vn(n, "modelValue"), i = P(!1);
    me(
      () => s.value,
      () => r()
    );
    const r = async () => {
      i.value = !0;
      try {
        const d = (await t.adapter.list(e.path)).files.filter((u) => u.type === "dir");
        mo(t.treeViewData, { path: e.path, type: "dir", folders: d });
      } catch (l) {
        De(l, "Failed to fetch subfolders");
      } finally {
        i.value = !1;
      }
    };
    return (l, d) => (c(), _("div", G_, [
      i.value ? (c(), Q(a(Lt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (c(), _("div", Y_, [
        s.value ? (c(), Q(a(At), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : H("", !0),
        s.value ? H("", !0) : (c(), Q(a(It), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), X_ = { key: 0 }, Q_ = { class: "vuefinder__treesubfolderlist__no-folders" }, J_ = { class: "vuefinder__treesubfolderlist__item-content" }, Z_ = ["onClick"], ep = ["title", "onDblclick", "onClick"], tp = { class: "vuefinder__treesubfolderlist__item-icon" }, np = { class: "vuefinder__treesubfolderlist__subfolder" }, op = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, sp = /* @__PURE__ */ ue({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = ce(), t = e.fs, s = xt(e, ["vuefinder__drag-over"]), i = P({}), r = e.config, l = oe(r.state), { t: d } = e.i18n, u = oe(t.path), f = n, h = P(null), p = P(50);
    be(() => {
      f.path === f.storage + "://" && h.value && _t(h.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const v = O(() => {
      const S = e.treeViewData.find((x) => x.path === f.path)?.folders || [];
      return S.length > p.value ? S.slice(0, p.value) : S;
    }), k = O(() => e.treeViewData.find((S) => S.path === f.path)?.folders?.length || 0), b = O(() => k.value > p.value), $ = O(() => `${f.storage}://`), g = (m, S) => m === S || m.startsWith(`${S}/`);
    me(
      v,
      (m) => {
        const S = l.value.expandTreeByDefault && f.path === $.value, x = l.value.expandedTreePaths || [];
        m.forEach((L) => {
          const C = x.some(
            (A) => g(A, L.path)
          );
          (S || C) && i.value[L.path] === void 0 && (i.value[L.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const y = () => {
      p.value += 50;
    };
    return (m, S) => {
      const x = Bn("TreeSubfolderList", !0);
      return c(), _("ul", {
        ref_key: "parentSubfolderList",
        ref: h,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        v.value.length ? H("", !0) : (c(), _("li", X_, [
          o("div", Q_, w(a(d)("No folders")), 1)
        ])),
        (c(!0), _(_e, null, he(v.value, (L) => (c(), _("li", {
          key: L.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", J_, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (C) => i.value[L.path] = !i.value[L.path]
            }, [
              Y(ho, {
                modelValue: i.value[L.path],
                "onUpdate:modelValue": (C) => i.value[L.path] = C,
                storage: n.storage,
                path: L.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, Z_),
            o("div", qe({
              class: "vuefinder__treesubfolderlist__item-link",
              title: L.path
            }, et(
              a(s).events({
                ...L,
                dir: L.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (C) => i.value[L.path] = !i.value[L.path],
              onClick: (C) => a(e).adapter.open(L.path)
            }), [
              o("div", tp, [
                a(u)?.path === L.path ? (c(), Q(a(Ot), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (c(), Q(a(ze), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: se(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(u).path === L.path
                }])
              }, w(L.basename), 3)
            ], 16, ep)
          ]),
          o("div", np, [
            ge(Y(x, {
              storage: f.storage,
              path: L.path
            }, null, 8, ["storage", "path"]), [
              [Ge, i.value[L.path]]
            ])
          ])
        ]))), 128)),
        b.value ? (c(), _("li", op, [
          o("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: y
          }, w(a(d)("load more")), 1)
        ])) : H("", !0)
      ], 512);
    };
  }
}), ap = /* @__PURE__ */ ue({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = ce(), t = e.fs, s = e.config, i = n, r = oe(s.state), l = O(() => {
      const k = r.value.expandedTreePaths || [], b = `${i.storage}://`;
      return k.some(
        ($) => $ === b || $.startsWith(`${b}`)
      );
    }), d = P(r.value.expandTreeByDefault || l.value), u = xt(e, ["vuefinder__drag-over"]), f = oe(t.path), h = O(() => i.storage === f.value?.storage);
    me(
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
    return (k, b) => (c(), _(_e, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: b[2] || (b[2] = ($) => v(n.storage))
      }, [
        o("div", qe({
          class: ["vuefinder__treestorageitem__info", h.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, et(a(u).events(p), !0)), [
          o("div", {
            class: se(["vuefinder__treestorageitem__icon", h.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            Y(a(an))
          ], 2),
          o("div", null, w(n.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: b[1] || (b[1] = pe(($) => d.value = !d.value, ["stop"]))
        }, [
          Y(ho, {
            modelValue: d.value,
            "onUpdate:modelValue": b[0] || (b[0] = ($) => d.value = $),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      ge(Y(sp, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ge, d.value]
      ])
    ], 64));
  }
}), ip = { class: "vuefinder__folder-indicator" }, lp = { class: "vuefinder__folder-indicator--icon" }, rp = /* @__PURE__ */ ue({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = Vn(n, "modelValue");
    return (t, s) => (c(), _("div", ip, [
      o("div", lp, [
        e.value ? (c(), Q(a(At), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : H("", !0),
        e.value ? H("", !0) : (c(), Q(a(It), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), dp = {
  key: 0,
  class: "vuefinder__treeview__header"
}, cp = { class: "vuefinder__treeview__pinned-label" }, up = { class: "vuefinder__treeview__pin-text text-nowrap" }, vp = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, fp = ["onClick"], _p = ["title"], pp = ["onClick"], mp = { key: 0 }, hp = { class: "vuefinder__treeview__no-pinned" }, gp = /* @__PURE__ */ ue({
  __name: "TreeView",
  setup(n) {
    const e = ce(), { enabled: t } = Ne(), s = e.fs, i = e.config, r = oe(i.state), l = oe(s.sortedFiles), d = oe(s.path), {
      t: u,
      storages: f,
      dragNDrop: h,
      pinnedFolders: p,
      pinnedFoldersOpened: v,
      togglePinnedFoldersOpened: k,
      openPath: b,
      removePin: $
    } = j_(), g = O(() => f.value || []), y = P(190), m = (x) => {
      const L = x.clientX, C = x.target.parentElement;
      if (!C) return;
      const A = C.getBoundingClientRect().width;
      C.classList.remove("transition-[width]"), C.classList.add("transition-none");
      const W = (te) => {
        y.value = A + te.clientX - L, y.value < 50 && (y.value = 0, i.set("showTreeView", !1)), y.value > 50 && i.set("showTreeView", !0);
      }, Z = () => {
        const te = C.getBoundingClientRect();
        y.value = te.width, C.classList.add("transition-[width]"), C.classList.remove("transition-none"), window.removeEventListener("mousemove", W), window.removeEventListener("mouseup", Z);
      };
      window.addEventListener("mousemove", W), window.addEventListener("mouseup", Z);
    }, S = P(null);
    return be(() => {
      S.value && _t(S.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), me(l, (x) => {
      const L = x.filter((C) => C.type === "dir");
      mo(e.treeViewData, {
        path: d.value.path || "",
        folders: L.map((C) => ({
          storage: C.storage,
          path: C.path,
          basename: C.basename,
          type: "dir"
        }))
      });
    }), (x, L) => (c(), _(_e, null, [
      o("div", {
        class: se(["vuefinder__treeview__overlay", a(r).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: L[0] || (L[0] = (C) => a(i).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: Ie(
          a(r).showTreeView ? "min-width:100px;max-width:75%; width: " + y.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: S,
          class: "vuefinder__treeview__scroll"
        }, [
          we(x.$slots, "tree-view", {
            pinnedFolders: a(p),
            pinnedFoldersOpened: a(v),
            togglePinnedFoldersOpened: a(k),
            removePin: a($),
            storages: g.value,
            currentPath: a(d),
            openPath: a(b)
          }, () => [
            a(t)("pinned") ? (c(), _("div", dp, [
              o("div", {
                class: "vuefinder__treeview__pinned-toggle",
                onClick: L[2] || (L[2] = //@ts-ignore
                (...C) => a(k) && a(k)(...C))
              }, [
                o("div", cp, [
                  Y(a(yt), { class: "vuefinder__treeview__pin-icon" }),
                  o("div", up, w(a(u)("Pinned Folders")), 1)
                ]),
                Y(rp, {
                  modelValue: a(v),
                  "onUpdate:modelValue": L[1] || (L[1] = (C) => zn(v) ? v.value = C : null)
                }, null, 8, ["modelValue"])
              ]),
              a(v) ? (c(), _("ul", vp, [
                (c(!0), _(_e, null, he(a(p), (C) => (c(), _("li", {
                  key: C.path,
                  class: "vuefinder__treeview__pinned-item"
                }, [
                  o("div", qe({ class: "vuefinder__treeview__pinned-folder" }, et(a(h).events(C), !0), {
                    onClick: (A) => a(b)(C.path)
                  }), [
                    a(d).path !== C.path ? (c(), Q(a(ze), {
                      key: 0,
                      class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                    })) : H("", !0),
                    a(d).path === C.path ? (c(), Q(a(Ot), {
                      key: 1,
                      class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                    })) : H("", !0),
                    o("div", {
                      title: C.path,
                      class: se(["vuefinder__treeview__folder-name", {
                        "vuefinder__treeview__folder-name--active": a(d).path === C.path
                      }])
                    }, w(C.basename), 11, _p)
                  ], 16, fp),
                  o("div", {
                    class: "vuefinder__treeview__remove-folder",
                    onClick: (A) => a($)(C)
                  }, [
                    Y(a(W_), { class: "vuefinder__treeview__remove-icon" })
                  ], 8, pp)
                ]))), 128)),
                a(p).length ? H("", !0) : (c(), _("li", mp, [
                  o("div", hp, w(a(u)("No folders pinned")), 1)
                ]))
              ])) : H("", !0)
            ])) : H("", !0),
            (c(!0), _(_e, null, he(g.value, (C) => (c(), _("div", {
              key: C,
              class: "vuefinder__treeview__storage"
            }, [
              Y(ap, { storage: C }, null, 8, ["storage"])
            ]))), 128))
          ])
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: m
        }, null, 32)
      ], 4)
    ], 64));
  }
}), Te = {
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
function yp(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function xe(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, s) => !(e.needsSearchQuery !== !!s.searchQuery || e.target !== void 0 && e.target !== yp(s) || e.targetType !== void 0 && e.targetType !== s.target?.type || e.mimeType !== void 0 && e.mimeType !== s.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function ut(...n) {
  return (e, t) => n.some((s) => s(e, t));
}
function nt(...n) {
  return (e, t) => n.every((s) => s(e, t));
}
const go = [
  {
    id: Te.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: xe({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: Te.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: ut(xe({ target: "none" }), xe({ target: "many" })),
    order: 20
  },
  {
    id: Te.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && xe({ target: "none" })(n, e),
    order: 30
  },
  {
    id: Te.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(cn),
    show: xe({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: Te.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: xe({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: Te.pinFolder,
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
    id: Te.unpinFolder,
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
    id: Te.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(Qe, { storage: e[0]?.storage, item: e[0] }),
    show: nt(
      xe({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: Te.openAs,
    title: ({ t: n }) => n("Preview as"),
    action: () => {
    },
    children: [
      {
        id: Te.openAsText,
        title: ({ t: n }) => n("Text"),
        action: (n, e) => n.modal.open(Qe, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "text"
        }),
        show: () => !0
      },
      {
        id: Te.openAsImage,
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
    id: Te.download,
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
    id: Te.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(Mt, { items: e }),
    show: xe({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: Te.move,
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
    id: Te.copy,
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
    id: Te.paste,
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
    id: Te.archive,
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
    id: Te.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(vn, { items: e }),
    show: xe({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: Te.delete,
    title: ({ t: n }) => n("Delete"),
    action: (n, e) => {
      n.modal.open(Dt, { items: e });
    },
    show: ut(
      xe({ feature: "delete", target: "one" }),
      xe({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], wp = ["data-theme"], bp = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, kp = { class: "vuefinder__external-drop-message" }, $p = { class: "vuefinder__main__content" }, xp = /* @__PURE__ */ ue({
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
    const t = e, s = n, i = ce(), r = st("root"), l = i.config;
    me(
      () => s.features,
      (m) => {
        const S = Hn(m);
        Object.keys(i.features).forEach((x) => {
          delete i.features[x];
        }), Object.assign(i.features, S);
      },
      { deep: !0 }
    );
    const d = i.fs, u = oe(i.i18n.localeAtom), f = oe(l.state), h = O(() => {
      const m = f.value;
      return {
        "--vf-grid-item-width": `${m.gridItemWidth}px`,
        "--vf-grid-item-height": `${m.gridItemHeight}px`,
        "--vf-grid-item-gap": `${m.gridItemGap}px`,
        "--vf-grid-icon-size": `${m.gridIconSize}px`,
        "--vf-list-item-height": `${m.listItemHeight}px`,
        "--vf-list-item-gap": `${m.listItemGap}px`,
        "--vf-list-icon-size": `${m.listIconSize}px`
      };
    });
    Id();
    const { isDraggingExternal: p, handleDragEnter: v, handleDragOver: k, handleDragLeave: b, handleDrop: $ } = Ad();
    function g(m) {
      d.setPath(m.dirname), l.get("persist") && l.set("path", m.dirname), d.setReadOnly(m.read_only ?? !1), i.modal.close(), d.setFiles(m.files), d.clearSelection(), d.setSelectedCount(0), d.setStorages(m.storages);
    }
    i.adapter.onBeforeOpen = () => {
      d.setLoading(!0);
    }, i.adapter.onAfterOpen = (m) => {
      g(m), d.setLoading(!1);
    }, i.emitter.on("vf-fetch-abort", () => {
      i.adapter.cancelOpen(), d.setLoading(!1);
    }), i.emitter.on("vf-upload-complete", (m) => {
      t("upload-complete", m);
    }), i.emitter.on("vf-delete-complete", (m) => {
      t("delete-complete", m);
    }), i.emitter.on("vf-notify", (m) => {
      t("notify", m);
      const { type: S, message: x } = m ?? {};
      S === "error" && t("error", x);
    }), i.emitter.on("vf-file-dclick", (m) => {
      t("file-dclick", m);
    }), i.emitter.on("vf-folder-dclick", (m) => {
      t("folder-dclick", m);
    }), me(
      () => s.config?.theme,
      (m) => {
        m && l.set("theme", a(m));
      },
      { immediate: !0 }
    ), me(
      u,
      (m, S) => {
        m !== S && t("update:locale", String(m));
      },
      { immediate: !1 }
    ), be(() => {
      i.root = r.value, me(
        () => l.get("path"),
        (S) => {
          i.adapter.open(S);
        }
      );
      const m = l.get("persist") ? l.get("path") : l.get("initialPath") ?? "";
      d.setPath(m), i.adapter.open(m), d.path.listen((S) => {
        t("path-change", S.path);
      }), d.selectedItems.listen((S) => {
        t("select", S);
      }), t("ready");
    });
    const y = async (m) => {
      const S = await $(m);
      S.length > 0 && (i.modal.open(un), setTimeout(() => {
        i.emitter.emit(
          "vf-external-files-dropped",
          S.map((x) => ({ file: x.file, name: x.relativePath }))
        );
      }, 100));
    };
    return (m, S) => (c(), _("div", {
      ref_key: "root",
      ref: r,
      tabindex: "0",
      class: se(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": a(p) }]),
      "data-theme": a(i).theme.current,
      style: Ie(h.value),
      onDragenter: S[2] || (S[2] = //@ts-ignore
      (...x) => a(v) && a(v)(...x)),
      onDragover: S[3] || (S[3] = //@ts-ignore
      (...x) => a(k) && a(k)(...x)),
      onDragleave: S[4] || (S[4] = //@ts-ignore
      (...x) => a(b) && a(b)(...x)),
      onDrop: y
    }, [
      o("div", {
        class: se(a(i).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: se([
            a(f)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: S[0] || (S[0] = (x) => a(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: S[1] || (S[1] = (x) => a(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          a(p) ? (c(), _("div", bp, [
            o("div", kp, w(a(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : H("", !0),
          a(f).showMenuBar ? (c(), Q(Gu, { key: 1 }, {
            "menubar-start": de((x) => [
              we(m.$slots, "menubar-start", Ce(Fe(x)))
            ]),
            "menu-items": de((x) => [
              we(m.$slots, "menu-items", Ce(Fe(x)))
            ]),
            "menubar-end": de((x) => [
              we(m.$slots, "menubar-end", Ce(Fe(x)))
            ]),
            _: 3
          })) : H("", !0),
          a(f).showToolbar ? (c(), Q(Xv, { key: 2 }, {
            "toolbar-items": de((x) => [
              we(m.$slots, "toolbar-items", Ce(Fe(x)))
            ]),
            _: 3
          })) : H("", !0),
          a(f).showBreadcrumbBar ? (c(), Q(Of, { key: 3 }, {
            "breadcrumb-actions": de((x) => [
              we(m.$slots, "breadcrumb-actions", Ce(Fe(x)))
            ]),
            _: 3
          })) : H("", !0),
          o("div", $p, [
            Y(gp, null, {
              "tree-view": de((x) => [
                we(m.$slots, "tree-view", Ce(Fe(x)))
              ]),
              _: 3
            }),
            Y(x_, {
              "on-file-dclick": s.onFileDclick,
              "on-folder-dclick": s.onFolderDclick
            }, {
              icon: de((x) => [
                we(m.$slots, "icon", Ce(Fe(x)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          Y(H_, null, {
            actions: de((x) => [
              we(m.$slots, "status-bar", Ce(Fe(x)))
            ]),
            _: 3
          })
        ], 34),
        (c(), Q(kt, { to: "body" }, [
          Y(xo, { name: "fade" }, {
            default: de(() => [
              a(i).modal.visible ? (c(), Q(On(a(i).modal.type), { key: 0 })) : H("", !0)
            ]),
            _: 1
          })
        ])),
        Y(P_, { items: a(go) }, null, 8, ["items"]),
        a(f).notificationsEnabled ? (c(), Q(a(Fo), {
          key: 0,
          position: a(f).notificationPosition,
          duration: a(f).notificationDuration,
          "visible-toasts": a(f).notificationVisibleToasts,
          "rich-colors": a(f).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : H("", !0)
      ], 2)
    ], 46, wp));
  }
}), Sp = /* @__PURE__ */ ue({
  __name: "VueFinderProvider",
  props: {
    id: {},
    driver: {},
    config: {},
    features: {},
    debug: { type: Boolean, default: !1 },
    locale: {},
    contextMenuItems: { default: () => go },
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
    const e = n, t = e.id ?? Ft(Gt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const s = Jo(e, Ft("VueFinderOptions") || {});
    return me(
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
    ), me(
      () => e.locale,
      (i) => {
        i && s.i18n.localeAtom && s.i18n.localeAtom.get() !== i && s.i18n.localeAtom.set(i);
      },
      { immediate: !0 }
    ), Oo(t, s), So(Gt, t), bt(() => {
      Lo(t);
    }), (i, r) => (c(), Q(xp, Ce(Fe(e)), {
      icon: de((l) => [
        we(i.$slots, "icon", Ce(Fe(l)))
      ]),
      "status-bar": de((l) => [
        we(i.$slots, "status-bar", Ce(Fe(l)))
      ]),
      "menubar-start": de((l) => [
        we(i.$slots, "menubar-start", Ce(Fe(l)))
      ]),
      "menu-items": de((l) => [
        we(i.$slots, "menu-items", Ce(Fe(l)))
      ]),
      "menubar-end": de((l) => [
        we(i.$slots, "menubar-end", Ce(Fe(l)))
      ]),
      "toolbar-items": de((l) => [
        we(i.$slots, "toolbar-items", Ce(Fe(l)))
      ]),
      "breadcrumb-actions": de((l) => [
        we(i.$slots, "breadcrumb-actions", Ce(Fe(l)))
      ]),
      "tree-view": de((l) => [
        we(i.$slots, "tree-view", Ce(Fe(l)))
      ]),
      _: 3
    }, 16));
  }
});
function Np(n) {
  const e = ce(n), t = oe(e.fs.path), s = O(() => t.value?.path ?? ""), i = (l) => l || e.fs.path.get().path || "", r = (l) => {
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
      const d = (e.fs.files.get() || []).find((u) => u.path === l);
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
      const d = new Set((e.fs.files.get() || []).map((f) => f.path)), u = (l || []).filter((f) => d.has(f));
      e.fs.setSelection(u);
    },
    selectOne(l) {
      new Set((e.fs.files.get() || []).map((u) => u.path)).has(l) && e.fs.setSelection([l]);
    },
    clearSelection() {
      e.fs.clearSelection();
    },
    getSelectedPaths() {
      return (e.fs.selectedItems.get() || []).map((l) => l.path);
    },
    async createFolder(l, d) {
      const u = await e.adapter.createFolder({ path: i(d), name: l });
      r(u);
    },
    async createFile(l, d) {
      const u = await e.adapter.createFile({ path: i(d), name: l });
      r(u);
    },
    async delete(l, d) {
      const u = i(d), f = new Map(
        (e.fs.files.get() || []).map((v) => [v.path, v])
      ), h = (l || []).map((v) => f.get(v)).filter((v) => !!v).map((v) => ({ path: v.path, type: v.type })), p = await e.adapter.delete({ path: u, items: h });
      r(p);
    },
    async rename(l, d, u) {
      const f = await e.adapter.rename({
        path: i(u),
        item: l,
        name: d
      });
      r(f);
    },
    async copy(l, d, u) {
      const f = await e.adapter.copy({
        path: i(u),
        sources: l,
        destination: d
      });
      r(f);
    },
    async move(l, d, u) {
      const f = await e.adapter.move({
        path: i(u),
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
const Hp = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", Sp);
  }
};
export {
  Yo as A,
  Zt as B,
  Te as C,
  Up as I,
  Wn as R,
  Hp as V,
  sp as _,
  Sp as a,
  ff as b,
  Bo as c,
  Lu as d,
  j_ as e,
  Np as f,
  go as m,
  kn as p,
  ce as u
};
