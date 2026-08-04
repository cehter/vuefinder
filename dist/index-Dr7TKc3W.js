import { inject as Ft, reactive as Tt, watch as me, ref as D, computed as O, shallowRef as ft, markRaw as wo, defineComponent as ce, onMounted as ke, nextTick as Oe, openBlock as c, createElementBlock as _, withKeys as Ke, unref as a, createElementVNode as o, withModifiers as pe, normalizeStyle as Ie, normalizeClass as ae, renderSlot as we, createCommentVNode as N, toDisplayString as y, createBlock as Q, resolveDynamicComponent as On, withCtx as re, createVNode as G, Fragment as fe, renderList as he, withDirectives as ge, vModelCheckbox as lt, vModelText as We, onBeforeUnmount as bt, defineAsyncComponent as Ln, Suspense as Rn, vShow as Ge, onUnmounted as Ae, useTemplateRef as st, createStaticVNode as Ct, createTextVNode as be, createSlots as yo, Teleport as kt, resolveComponent as Bn, customRef as bo, isRef as zn, vModelSelect as qt, vModelRadio as Vt, mergeProps as qe, toHandlers as et, normalizeProps as Ce, guardReactiveProps as Fe, onUpdated as ko, useModel as Vn, mergeModels as $o, Transition as xo, provide as So } from "vue";
import Co from "mitt";
import { useStore as se } from "@nanostores/vue";
import { persistentAtom as Un } from "@nanostores/persistent";
import { toast as St, Toaster as Fo } from "vue-sonner";
import { atom as Be, computed as Ze } from "nanostores";
import { QueryClient as Eo, isCancelledError as Po } from "@tanstack/vue-query";
import To from "@uppy/core";
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
function de(n) {
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
  const e = localStorage.getItem(n + "_storage"), t = Tt(JSON.parse(e ?? "{}"));
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
    const C = localStorage.getItem(l) ? JSON.parse(localStorage.getItem(l)) : null;
    u = Bo(l, e || C || "en"), Ut.set(d, u);
  }
  const f = "vuefinder_translations", h = (C) => {
    try {
      const L = localStorage.getItem(f);
      if (L)
        return JSON.parse(L)[C] || null;
    } catch {
    }
    return null;
  }, p = (C, L) => {
    try {
      const S = localStorage.getItem(f), R = S ? JSON.parse(S) : {};
      R[C] = L, localStorage.setItem(f, JSON.stringify(R));
    } catch {
    }
  }, v = se(u), k = String(v.value), b = h(k), $ = D(b || {});
  let m = !1;
  !b && Object.keys(s).length > 0 && Nt(k, s).then((C) => {
    $.value = C, p(k, C);
  }).catch(() => {
  }), me(
    v,
    async (C, L) => {
      if (L && C === L)
        return;
      if (!m) {
        m = !0;
        const R = h(String(C));
        if (R)
          $.value = R;
        else if (Object.keys(s).length > 0)
          try {
            const H = await Nt(String(C), s);
            $.value = H, p(String(C), H);
          } catch {
          }
        return;
      }
      const S = h(String(C));
      if (S)
        $.value = S;
      else
        try {
          const R = await Nt(String(C), s);
          $.value = R, p(String(C), R);
        } catch (R) {
          const H = Te(R, "Locale cannot be loaded!");
          r.error(H);
          return;
        }
      Object.values(s).length > 1 && (r.success("The language is set to " + C), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const w = (C, ...L) => L.length ? w(C = C.replace("%s", String(L.shift())), ...L) : C;
  function g(C, ...L) {
    return $.value && Object.prototype.hasOwnProperty.call($.value, C) ? w($.value[C] || C, ...L) : w(C, ...L);
  }
  const F = O({
    get: () => v.value,
    set: (C) => {
      u.set(C);
    }
  });
  return Tt({ t: g, locale: F, localeAtom: u });
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
const No = "4.6.0-cehter.2.3.3";
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
  const e = ft(null), t = D(!1), s = D(), i = D(!1), r = ft(null);
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
function Kn(n) {
  return Ko.has(n);
}
function wn(n) {
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
function yn(n, e) {
  const t = { ...Et, ...n, ...e };
  return t.theme = qo(t.theme), t;
}
function bn(n, e) {
  return { ...Pt, ...e, ...n };
}
const Wo = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: s, nonPersistenceConfig: i } = wn(e), r = yn(
    s,
    Et
  ), l = bn(
    i,
    Pt
  ), d = Un(
    t,
    r,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), u = Be(l), f = Ze(
    [d, u],
    (m, w) => ({
      ...m,
      ...w
    })
  ), h = (m = {}) => {
    const w = d.get(), g = u.get(), { persistenceConfig: F, nonPersistenceConfig: C } = wn(m), L = yn(F, w), S = bn(
      C,
      g
    );
    d.set(L), u.set(S);
  }, p = (m) => Kn(m) ? u.get()[m] : d.get()[m], v = () => ({
    ...d.get(),
    ...u.get()
  }), k = (m, w) => {
    const g = d.get();
    typeof m == "object" && m !== null ? d.set({ ...g, ...m }) : d.set({
      ...g,
      [m]: w
    });
  };
  return {
    // Store atom (combined)
    state: f,
    // Methods
    init: h,
    get: p,
    set: k,
    toggle: (m) => {
      const w = d.get();
      k(m, !w[m]);
    },
    all: v,
    reset: () => {
      d.set({ ...Et }), u.set({ ...Pt });
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
  }), u = Be(null), f = Be(0), h = Be(!1), p = Be([]), v = Be(-1), k = Ze([n], (te) => {
    const ie = (te ?? "").trim(), le = ie.indexOf("://"), ue = le >= 0 ? ie.slice(0, le) : "", Me = (le >= 0 ? ie.slice(le + 3) : ie).split("/").filter(Boolean);
    let Ee = "";
    const Ye = Me.map((Le) => (Ee = Ee ? `${Ee}/${Le}` : Le, {
      basename: Le,
      name: Le,
      path: ue ? `${ue}://${Ee}` : Ee,
      type: "dir"
    }));
    return { storage: ue, breadcrumb: Ye, path: ie };
  }), b = Ze([s, i, r], (te, ie, le) => {
    let ue = te;
    le.kind === "files" ? ue = ue.filter((Le) => Le.type === "file") : le.kind === "folders" && (ue = ue.filter((Le) => Le.type === "dir")), le.showHidden || (ue = ue.filter((Le) => !Le.basename.startsWith(".")));
    const { active: He, column: Me, order: Ee } = ie;
    if (!He || !Me) return ue;
    const Ye = Ee === "asc" ? 1 : -1;
    return ue.slice().sort((Le, Bt) => qn(Le[Me], Bt[Me]) * Ye);
  }), $ = Ze([s, l], (te, ie) => ie.size === 0 ? [] : te.filter((le) => ie.has($e(le)))), m = (te, ie) => {
    const le = n.get();
    if ((ie ?? !0) && le !== te) {
      const ue = p.get(), He = v.get();
      He < ue.length - 1 && ue.splice(He + 1), ue.length === 0 && le && ue.push(le), ue.push(te), p.set([...ue]), v.set(ue.length - 1);
    }
    n.set(te);
  }, w = (te) => {
    s.set(te ?? []);
  }, g = (te) => {
    e.set(te ?? []);
  }, F = (te, ie) => {
    i.set({ active: !0, column: te, order: ie });
  }, C = (te) => {
    const ie = i.get();
    ie.active && ie.column === te ? i.set({
      active: ie.order === "asc",
      column: te,
      order: "desc"
    }) : i.set({
      active: !0,
      column: te,
      order: "asc"
    });
  }, L = () => {
    i.set({ active: !1, column: "", order: "" });
  }, S = (te, ie) => {
    r.set({ kind: te, showHidden: ie });
  }, R = () => {
    r.set({ kind: "all", showHidden: !1 });
  }, H = (te, ie = "multiple") => {
    const le = new Set(l.get());
    ie === "single" && le.clear(), le.add(te), l.set(le);
  }, oe = (te, ie = "multiple") => {
    const le = new Set(l.get());
    ie === "single" && le.clear(), te.forEach((ue) => le.add(ue)), l.set(le);
  }, ne = (te) => {
    const ie = new Set(l.get());
    ie.delete(te), l.set(ie);
  }, J = (te) => l.get().has(te), W = (te, ie = "multiple") => {
    const le = new Set(l.get());
    le.has(te) ? le.delete(te) : (ie === "single" && le.clear(), le.add(te)), l.set(le);
  }, E = (te = "multiple", ie) => {
    if (te === "single") {
      const le = s.get()[0];
      if (le) {
        const ue = $e(le);
        l.set(/* @__PURE__ */ new Set([ue])), f.set(1);
      }
    } else {
      if (ie?.selectionFilterType || ie?.selectionFilterMimeIncludes && ie.selectionFilterMimeIncludes.length > 0) {
        const le = s.get().filter((ue) => {
          const He = ie.selectionFilterType, Me = ie.selectionFilterMimeIncludes;
          return He === "files" && ue.type === "dir" || He === "dirs" && ue.type === "file" ? !1 : Me && Array.isArray(Me) && Me.length > 0 && ue.type !== "dir" ? ue.mime_type ? Me.some((Ee) => ue.mime_type?.startsWith(Ee)) : !1 : !0;
        }).map((ue) => $e(ue));
        l.set(new Set(le));
      } else {
        const le = new Set(s.get().map((ue) => $e(ue)));
        l.set(le);
      }
      X(l.get().size);
    }
  }, T = () => {
    l.set(/* @__PURE__ */ new Set()), f.set(0);
  }, z = (te) => {
    const ie = new Set(te ?? []), le = new Set(
      s.get().filter((ue) => ie.has(ue.path)).map((ue) => $e(ue))
    );
    l.set(le), f.set(le.size);
  }, X = (te) => {
    f.set(te);
  }, ve = (te) => {
    h.set(!!te);
  }, B = () => h.get(), A = (te, ie) => {
    const le = s.get().filter((ue) => ie.has($e(ue)));
    d.set({
      type: te,
      path: k.get().path,
      items: new Set(le)
    });
  }, q = (te) => Ze([d], (ie) => ie.type === "cut" && Array.from(ie.items).some((le) => $e(le) === te)), x = (te) => Ze([d], (ie) => ie.type === "copy" && Array.from(ie.items).some((le) => $e(le) === te)), V = (te) => {
    const ie = q(te);
    return se(ie).value ?? !1;
  }, I = (te) => {
    const ie = x(te);
    return se(ie).value ?? !1;
  }, P = () => {
    d.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, j = () => d.get(), U = (te) => {
    u.set(te);
  }, Y = () => u.get(), Z = () => {
    u.set(null);
  }, K = () => {
    const te = p.get(), ie = v.get();
    if (ie > 0) {
      const le = ie - 1, ue = te[le];
      ue && (v.set(le), m(ue, !1));
    }
  }, M = () => {
    const te = p.get(), ie = v.get();
    if (ie < te.length - 1) {
      const le = ie + 1, ue = te[le];
      ue && (v.set(le), m(ue, !1));
    }
  }, ee = Ze([v], (te) => te > 0), _e = Ze(
    [p, v],
    (te, ie) => ie < te.length - 1
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
    setPath: m,
    setFiles: w,
    setStorages: g,
    setSort: F,
    toggleSort: C,
    clearSort: L,
    setFilter: S,
    clearFilter: R,
    select: H,
    selectMultiple: oe,
    deselect: ne,
    toggleSelect: W,
    selectAll: E,
    isSelected: J,
    clearSelection: T,
    setSelection: z,
    setSelectedCount: X,
    setLoading: ve,
    isLoading: B,
    setClipboard: A,
    createIsCut: q,
    createIsCopied: x,
    isCut: V,
    isCopied: I,
    clearClipboard: P,
    getClipboard: j,
    setDraggedItem: U,
    getDraggedItem: Y,
    clearDraggedItem: Z,
    setReadOnly: (te) => {
      t.set(te);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (te) => t.get() ? !0 : te.read_only ?? !1,
    // Navigation
    goBack: K,
    goForward: M,
    canGoBack: ee,
    canGoForward: _e,
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
        const b = v.path === u.path ? t : p.get(v.dir), $ = v.path === u.path ? h : v.basename, m = this.cloneEntry(v, {
          path: k,
          dir: b,
          basename: $,
          extension: v.type === "file" ? this.getExtension($) : "",
          last_modified: Date.now()
        });
        if (l.push(m), r.add(m.path), v.type === "file") {
          const w = this.contentStore.get(v.path);
          w !== void 0 && this.contentStore.set(m.path, w);
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
        const m = b.path === d.path ? t : v.get(b.dir), w = b.path === d.path ? p : b.basename;
        k.set(
          b.path,
          this.cloneEntry(b, {
            path: $,
            dir: m,
            basename: w,
            extension: b.type === "file" ? this.getExtension(w) : "",
            last_modified: Date.now()
          })
        );
      }
      r = r.map((b) => k.get(b.path) || b);
      for (const [b, $] of v.entries()) {
        if (b === $) continue;
        const m = this.contentStore.get(b);
        m !== void 0 && (this.contentStore.delete(b), this.contentStore.set($, m));
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
class Vp extends Zt {
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
      if (Po(t) || t?.name === "AbortError")
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
  const e = se(n.state);
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
  return Tt({
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
    adapter: wo(u),
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
}, ss = { class: "vuefinder__modal-drag-message" }, Ue = /* @__PURE__ */ ce({
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
    const e = D(null), t = de();
    t.config;
    const s = n, i = () => {
      s.onRequestClose ? s.onRequestClose() : t.modal.close();
    };
    ke(() => {
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
            class: ae(["vuefinder__modal-layout__body", s.bodyClass]),
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
            ])) : N("", !0)
          ], 38)
        ], 32)
      ]),
      s.showDragOverlay ? (c(), _("div", os, [
        o("div", ss, y(s.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : N("", !0)
    ], 40, Zo));
  }
}), as = { class: "vuefinder__modal-header" }, is = { class: "vuefinder__modal-header__icon-container" }, ls = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, je = /* @__PURE__ */ ce({
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
      o("div", ls, y(n.title), 1)
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
}, hs = { class: "vuefinder__about-modal__meta" }, gs = { class: "vuefinder__about-modal__meta-item" }, ws = { class: "vuefinder__about-modal__meta-label" }, ys = { class: "vuefinder__about-modal__meta-value" }, bs = { class: "vuefinder__about-modal__meta-item" }, ks = { class: "vuefinder__about-modal__meta-label" }, Gn = /* @__PURE__ */ ce({
  __name: "ModalAbout",
  setup(n) {
    const e = de(), { t } = e.i18n;
    return (s, i) => (c(), Q(Ue, null, {
      buttons: re(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (r) => a(e).modal.close())
        }, y(a(t)("Close")), 1)
      ]),
      default: re(() => [
        o("div", cs, [
          G(je, {
            icon: a(en),
            title: "Vuefinder " + a(e).version
          }, null, 8, ["icon", "title"]),
          o("div", us, [
            o("div", vs, [
              o("div", fs, y(a(t)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", _s, y(a(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", ps, [
                o("a", ms, y(a(t)("Project Home")), 1),
                i[1] || (i[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", hs, [
                o("div", gs, [
                  o("span", ws, y(a(t)("Version")), 1),
                  o("span", ys, y(a(e).version), 1)
                ]),
                o("div", bs, [
                  o("span", ks, y(a(t)("License")), 1),
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
const Yn = { render: xs }, Ss = { class: "vuefinder__delete-modal__content" }, Cs = { class: "vuefinder__delete-modal__form" }, Fs = { class: "vuefinder__delete-modal__description" }, Es = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ps = {
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
}, Ds = { class: "vuefinder__delete-modal__file-name" }, Ms = { class: "vuefinder__delete-modal__confirmation" }, Is = { class: "vuefinder__delete-modal__confirmation-label" }, As = { class: "vuefinder__delete-modal__confirmation-text" }, Os = ["disabled"], Dt = /* @__PURE__ */ ce({
  __name: "ModalDelete",
  setup(n) {
    const e = de(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = se(i.path), l = D(e.modal.data.items), d = D(!1), u = () => {
      l.value.length && d.value && e.adapter.delete({
        path: r.value.path,
        items: l.value.map(({ path: f, type: h }) => ({
          path: f,
          type: h
        }))
      }).then((f) => {
        t.success(s("Files deleted.")), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        t.error(Te(f, s("Failed to delete files")));
      });
    };
    return (f, h) => (c(), Q(Ue, null, {
      buttons: re(() => [
        o("div", Ms, [
          o("label", Is, [
            ge(o("input", {
              "onUpdate:modelValue": h[0] || (h[0] = (p) => d.value = p),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [lt, d.value]
            ]),
            o("span", As, y(a(s)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !d.value,
          onClick: u
        }, y(a(s)("Yes, Delete!")), 9, Os),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[1] || (h[1] = (p) => a(e).modal.close())
        }, y(a(s)("Cancel")), 1)
      ]),
      default: re(() => [
        o("div", null, [
          G(je, {
            icon: a(Yn),
            title: a(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", Ss, [
            o("div", Cs, [
              o("p", Fs, y(a(s)("Are you sure you want to delete these files?")), 1),
              o("div", Es, [
                (c(!0), _(fe, null, he(l.value, (p) => (c(), _("p", {
                  key: p.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  p.type === "dir" ? (c(), _("svg", Ps, [...h[2] || (h[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (c(), _("svg", Ts, [...h[3] || (h[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Ds, y(p.basename), 1)
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
}, Hs = { class: "vuefinder__rename-modal__item-name" }, Mt = /* @__PURE__ */ ce({
  __name: "ModalRename",
  setup(n) {
    const e = de(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = se(i.path), l = D(e.modal.data.items[0]), d = D(l.value.basename), u = () => {
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
    return (f, h) => (c(), Q(Ue, null, {
      buttons: re(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: u
        }, y(a(s)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[1] || (h[1] = (p) => a(e).modal.close())
        }, y(a(s)("Cancel")), 1)
      ]),
      default: re(() => [
        o("div", null, [
          G(je, {
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
                o("span", Hs, y(l.value.basename), 1)
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
  const n = de(), e = O(() => n.features);
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
}, aa = ["href", "download"], ia = { class: "vuefinder__preview-chrome__popover-hint" }, la = ["title", "aria-label"], ra = /* @__PURE__ */ ce({
  name: "PreviewChrome",
  __name: "PreviewChrome",
  emits: ["close-request"],
  setup(n, { emit: e }) {
    const t = e, s = de(), { enabled: i } = Ne(), { t: r } = s.i18n, l = se(s.fs.sortedFiles), d = O(() => l.value.filter((g) => g.type === "file")), u = O(
      () => d.value.findIndex((g) => g.path === s.modal.data.item.path)
    ), f = O(() => d.value.length), h = O(() => s.modal.controls ?? null), p = O(() => !!a(h.value?.isEditing));
    O(() => !!a(h.value?.isDirty));
    const v = D(!1), k = D(!1), b = (g) => {
      g === "info" ? (v.value = !v.value, k.value = !1) : (k.value = !k.value, v.value = !1);
    }, $ = (g) => {
      g.target.closest(".vuefinder__preview-chrome__popover-host") || (v.value = !1, k.value = !1);
    };
    ke(() => document.addEventListener("mousedown", $)), bt(() => document.removeEventListener("mousedown", $));
    const m = O(() => {
      const g = s.modal.data.item, F = [
        { label: r("File Size"), value: s.filesize(g.file_size ?? 0) },
        { label: r("Last Modified"), value: js(g.last_modified ?? 0) }
      ];
      g.mime_type && F.push({ label: r("Type"), value: g.mime_type });
      const C = a(h.value?.extraInfo);
      if (Array.isArray(C))
        for (const L of C) F.push(L);
      return F.push({ label: r("Path"), value: g.path }), F;
    }), w = O(() => s.adapter.getDownloadUrl(s.modal.data.item));
    return (g, F) => (c(), _("div", Ws, [
      o("div", Gs, [
        o("button", {
          type: "button",
          class: ae(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": v.value }]),
          title: a(r)("File info"),
          "aria-label": a(r)("File info"),
          onClick: F[0] || (F[0] = (C) => b("info"))
        }, [
          G(a(en), { class: "vuefinder__preview-chrome__icon" })
        ], 10, Ys),
        v.value ? (c(), _("div", Xs, [
          (c(!0), _(fe, null, he(m.value, (C) => (c(), _("div", {
            key: C.label,
            class: "vuefinder__preview-chrome__popover-row"
          }, [
            o("span", Qs, y(C.label), 1),
            o("span", Js, y(C.value), 1)
          ]))), 128))
        ])) : N("", !0)
      ]),
      o("div", {
        id: "modal-title",
        class: "vuefinder__preview-chrome__title",
        title: a(s).modal.data.item.path
      }, y(a(s).modal.data.item.basename), 9, Zs),
      o("div", ea, [
        f.value > 1 && !p.value ? (c(), _("span", {
          key: 0,
          class: "vuefinder__preview-chrome__counter",
          "aria-label": a(r)("File %s of %s", String(u.value + 1), String(f.value))
        }, y(u.value + 1) + " / " + y(f.value), 9, ta)) : N("", !0),
        a(i)("download") && !p.value ? (c(), _("div", na, [
          o("button", {
            type: "button",
            class: ae(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": k.value }]),
            title: a(r)("Download"),
            "aria-label": a(r)("Download"),
            onClick: F[1] || (F[1] = (C) => b("download"))
          }, [...F[3] || (F[3] = [
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
              href: w.value,
              download: w.value,
              target: "_blank",
              class: "vuefinder__preview-chrome__popover-action"
            }, [
              F[4] || (F[4] = o("svg", {
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
              o("span", null, y(a(r)("Download")), 1)
            ], 8, aa),
            o("p", ia, y(a(r)(
              `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
            )), 1)
          ])) : N("", !0)
        ])) : N("", !0),
        o("button", {
          type: "button",
          class: "vuefinder__preview-chrome__btn vuefinder__preview-chrome__btn--icon vuefinder__preview-chrome__btn--close",
          title: a(r)("Close"),
          "aria-label": a(r)("Close"),
          onClick: F[2] || (F[2] = (C) => t("close-request"))
        }, [
          G(a(Qn), { class: "vuefinder__preview-chrome__icon vuefinder__preview-chrome__icon--lg" })
        ], 8, la)
      ])
    ]));
  }
});
function tn(n) {
  const e = de();
  ke(() => {
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
}, va = /* @__PURE__ */ ce({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-DIgqVTXy.js").then((g) => g.C),
      delay: 100
    }), s = e, i = D(""), r = D(""), l = D(!1), d = D(!1), u = de(), f = Ve(u), { enabled: h } = Ne(), { t: p } = u.i18n;
    ke(async () => {
      try {
        const g = await u.adapter.getContent({ path: u.modal.data.item.path });
        i.value = g.content, r.value = g.content, s("success");
      } catch (g) {
        Te(g, "Failed to load text content"), s("success");
      }
    });
    const v = O(
      () => h("edit") && !u.fs.isReadOnly(u.modal.data.item)
    ), k = O(() => l.value), b = O(() => l.value && r.value !== i.value), $ = () => {
      r.value = i.value, l.value = !0, u.modal.setEditMode(!0);
    }, m = () => {
      l.value = !1, r.value = i.value, u.modal.setEditMode(!1);
    }, w = async () => {
      try {
        await u.adapter.save({
          path: u.modal.data.item.path,
          content: r.value
        }), i.value = r.value, f.success(p("Updated.")), l.value = !1, u.modal.setEditMode(!1), s("success");
      } catch (g) {
        f.error(Te(g, p("Failed to save file")));
      }
    };
    return tn({
      isEditable: v,
      isEditing: k,
      isDirty: b,
      primaryActionLabel: O(() => p("Save")),
      enterEdit: $,
      commitEdit: w,
      cancelEdit: m
    }), (g, F) => (c(), _("div", da, [
      o("div", ca, [
        (c(), Q(Rn, {
          onResolve: F[2] || (F[2] = (C) => d.value = !0)
        }, {
          fallback: re(() => [
            l.value ? ge((c(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": F[1] || (F[1] = (C) => r.value = C),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [We, r.value]
            ]) : (c(), _("pre", ua, y(i.value), 1))
          ]),
          default: re(() => [
            G(a(t), {
              "model-value": l.value ? r.value : i.value,
              readonly: !l.value,
              filename: a(u).modal.data.item.basename,
              "onUpdate:modelValue": F[0] || (F[0] = (C) => l.value ? r.value = C : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        ge(o("span", null, y(d.value), 513), [
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
}, wa = { class: "vuefinder__csv-preview__table" }, ya = ["title"], ba = { class: "vuefinder__csv-preview__row-num" }, ka = ["title"], $a = {
  key: 0,
  class: "vuefinder__csv-preview__truncated"
}, xa = {
  key: 2,
  class: "vuefinder__csv-preview__view-checkbox"
}, jt = 1e3, Sa = /* @__PURE__ */ ce({
  name: "CsvPreview",
  __name: "Csv",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-DIgqVTXy.js").then((oe) => oe.C),
      delay: 100
    }), s = e, i = D(""), r = D(""), l = ft([]), d = ft([]), u = D(null), f = D(!1), h = D(!1), p = O(() => l.value.length > jt), v = O(() => p.value ? l.value.slice(0, jt) : l.value), k = de(), b = Ve(k), { enabled: $ } = Ne(), { t: m } = k.i18n;
    async function w(oe) {
      try {
        const { parse: ne } = await import("./papaparse.min-Brc8PWCw.js").then((T) => T.p), J = ne(oe, {
          skipEmptyLines: !0,
          delimiter: ""
        });
        if (!J.data.length) {
          d.value = [], l.value = [];
          return;
        }
        const [W, ...E] = J.data;
        d.value = W ?? [], l.value = E, u.value = null;
      } catch (ne) {
        u.value = Te(ne, m("Failed to parse CSV")), d.value = [], l.value = [];
      }
    }
    ke(async () => {
      try {
        const oe = await k.adapter.getContent({ path: k.modal.data.item.path });
        i.value = oe.content, r.value = oe.content, await w(oe.content), s("success");
      } catch (oe) {
        Te(oe, "Failed to load CSV content"), s("success");
      }
    });
    const g = O(() => !f.value && h.value), F = O(
      () => $("edit") && !k.fs.isReadOnly(k.modal.data.item)
    ), C = O(() => f.value), L = O(() => f.value && r.value !== i.value), S = () => {
      r.value = i.value, f.value = !0, h.value = !1, k.modal.setEditMode(!0);
    }, R = () => {
      f.value = !1, r.value = i.value, k.modal.setEditMode(!1);
    }, H = async () => {
      try {
        await k.adapter.save({ path: k.modal.data.item.path, content: r.value }), i.value = r.value, await w(i.value), b.success(m("Updated.")), f.value = !1, k.modal.setEditMode(!1), s("success");
      } catch (oe) {
        b.error(Te(oe, m("Failed to save file")));
      }
    };
    return tn({
      isEditable: F,
      isEditing: C,
      isDirty: L,
      primaryActionLabel: O(() => m("Save")),
      enterEdit: S,
      commitEdit: H,
      cancelEdit: R
    }), (oe, ne) => (c(), _("div", fa, [
      o("div", _a, [
        g.value ? (c(), _(fe, { key: 1 }, [
          u.value ? (c(), _("div", ma, y(u.value), 1)) : !l.value.length && !d.value.length ? (c(), _("div", ha, y(a(m)("No rows to display")), 1)) : (c(), _("div", ga, [
            o("table", wa, [
              o("thead", null, [
                o("tr", null, [
                  ne[3] || (ne[3] = o("th", { class: "vuefinder__csv-preview__row-num" }, null, -1)),
                  (c(!0), _(fe, null, he(d.value, (J, W) => (c(), _("th", {
                    key: W,
                    title: J
                  }, y(J), 9, ya))), 128))
                ])
              ]),
              o("tbody", null, [
                (c(!0), _(fe, null, he(v.value, (J, W) => (c(), _("tr", { key: W }, [
                  o("td", ba, y(W + 1), 1),
                  (c(!0), _(fe, null, he(J, (E, T) => (c(), _("td", {
                    key: T,
                    title: E
                  }, y(E), 9, ka))), 128))
                ]))), 128))
              ])
            ]),
            p.value ? (c(), _("div", $a, y(a(m)("Showing first %s rows out of %s", jt, l.value.length)), 1)) : N("", !0)
          ]))
        ], 64)) : (c(), Q(Rn, { key: 0 }, {
          fallback: re(() => [
            f.value ? ge((c(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": ne[1] || (ne[1] = (J) => r.value = J),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [We, r.value]
            ]) : (c(), _("pre", pa, y(i.value), 1))
          ]),
          default: re(() => [
            G(a(t), {
              "model-value": f.value ? r.value : i.value,
              readonly: !f.value,
              filename: a(k).modal.data.item.basename,
              "onUpdate:modelValue": ne[0] || (ne[0] = (J) => f.value ? r.value = J : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        f.value ? N("", !0) : (c(), _("label", xa, [
          ge(o("input", {
            "onUpdate:modelValue": ne[2] || (ne[2] = (J) => h.value = J),
            type: "checkbox"
          }, null, 512), [
            [lt, h.value]
          ]),
          o("span", null, y(a(m)("Show as table")), 1)
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
  const e = de(), { t } = e.i18n, s = e.fs, i = se(s.path), r = e.config, l = D({ QUEUE_ENTRY_STATUS: Se }), d = D(null), u = D(null), f = D(null), h = D(null), p = D(null), v = D([]), k = D(""), b = D(!1), $ = D(!1), m = D(null);
  let w;
  const g = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !0;
  }, F = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !0;
  }, C = (x) => {
    x.preventDefault(), x.stopPropagation(), (!x.relatedTarget || x.relatedTarget === document.body) && ($.value = !1);
  }, L = (x) => {
    x.preventDefault(), x.stopPropagation(), $.value = !1;
    const V = /^[/\\](.+)/, I = x.dataTransfer;
    I && (I.items && I.items.length ? Array.from(I.items).forEach((P) => {
      if (P.kind === "file") {
        const j = P.webkitGetAsEntry?.();
        if (j)
          nn((U, Y) => {
            const Z = V.exec(U?.fullPath || "");
            H(Y, Z ? Z[1] : Y.name);
          }, j);
        else {
          const U = P.getAsFile?.();
          U && H(U);
        }
      }
    }) : I.files && I.files.length && Array.from(I.files).forEach((P) => H(P)));
  }, S = (x) => v.value.findIndex((V) => V.id === x), R = (x, V) => w.addFile({ name: V || x.name, type: x.type, data: x, source: "Local" }), H = (x, V) => {
    try {
      return R(x, V);
    } catch {
      return;
    }
  }, oe = (x) => x.status === Se.ERROR || x.status === Se.CANCELED || x.status === Se.REJECTED, ne = (x) => x.status === Se.DONE ? "text-green-600" : oe(x) ? "text-red-600" : "", J = (x) => x.status === Se.DONE ? "✓" : oe(x) ? "!" : "...", W = () => h.value?.click(), E = () => e.modal.close(), T = (x) => {
    if (b.value || !v.value.filter((V) => V.status !== Se.DONE).length) {
      b.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", m.value = x || i.value, w.upload();
  }, z = () => {
    w.cancelAll(), v.value.forEach((x) => {
      x.status !== Se.DONE && (x.status = Se.CANCELED, x.statusName = t("Canceled"));
    }), b.value = !1;
  }, X = (x) => {
    b.value || (w.removeFile(x.id), v.value.splice(S(x.id), 1));
  }, ve = (x) => {
    if (!b.value)
      if (w.cancelAll(), x) {
        const V = v.value.filter((I) => I.status !== Se.DONE);
        v.value = [], V.forEach((I) => H(I.originalFile, I.name));
      } else
        v.value = [];
  }, B = (x) => {
    x.forEach((V) => {
      V instanceof File ? H(V) : H(V.file, V.name);
    });
  }, A = (x, V) => x.endsWith("://") || x.endsWith("/") ? x + V : x + "/" + V, q = async (x, V) => {
    const I = V.trim();
    if (b.value || !I) return;
    if (I.includes("/") || I.includes("\\")) {
      k.value = t("Name cannot contain slashes.");
      return;
    }
    const P = x.name.split("/");
    P[P.length - 1] = I;
    const j = P.join("/");
    if (j === x.name) return;
    if (x.status === Se.DONE) {
      const ee = m.value?.path || i.value.path, _e = A(ee, x.name), ye = x.name.split("/");
      ye.pop();
      const De = ye.length ? A(ee, ye.join("/")) : ee;
      try {
        await e.adapter.rename({ path: De, item: _e, name: I }), x.name = j, e.adapter.invalidateListQuery(ee), ee === i.value.path && e.adapter.open(ee);
      } catch (Je) {
        k.value = Je?.message || t("Failed to rename");
      }
      return;
    }
    const U = S(x.id);
    if (U === -1) return;
    const Y = x.originalFile, Z = x.name;
    w.removeFile(x.id), v.value.splice(U, 1);
    let K;
    try {
      K = R(Y, j);
    } catch (ee) {
      k.value = ee?.message || t("Failed to rename");
      try {
        R(Y, Z);
      } catch {
      }
      return;
    }
    if (!K) return;
    const M = S(K);
    if (M !== -1 && M !== U) {
      const ee = v.value.splice(M, 1)[0];
      ee && v.value.splice(U, 0, ee);
    }
  };
  return ke(() => {
    w = new To({
      debug: e.debug,
      restrictions: { maxFileSize: Ho(r.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (P, j) => {
        if (j[P.id] != null) {
          const Y = S(P.id);
          v.value[Y]?.status === Se.PENDING && (k.value = w.i18n("noDuplicates", { fileName: P.name })), v.value = v.value.filter((Z) => Z.id !== P.id);
        }
        return v.value.push({
          id: P.id,
          name: P.name,
          size: e.filesize(P.size),
          status: Se.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: P.data
        }), !0;
      }
    });
    const x = {
      getTargetPath: () => (m.value || i.value).path
    };
    if (n)
      n(w, x);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(w, x);
    else
      throw new Error("No uploader configured");
    w.on("restriction-failed", (P, j) => {
      const U = v.value[S(P.id)];
      U && (U.status = Se.REJECTED, U.statusName = j.message);
    }), w.on("upload-start", (P) => {
      P.forEach((j) => {
        const U = v.value[S(j.id)];
        U && (U.status = Se.UPLOADING, U.statusName = t("Uploading"), U.percent = "0%");
      });
    }), w.on("upload-progress", (P, j) => {
      const U = j.bytesTotal ?? 1, Y = Math.floor(j.bytesUploaded / U * 100), Z = S(P.id);
      Z !== -1 && v.value[Z] && (v.value[Z].percent = `${Y}%`);
    }), w.on("upload-success", (P) => {
      const j = v.value[S(P.id)];
      j && (j.status = Se.DONE, j.statusName = t("Done"));
    }), w.on("upload-error", (P, j) => {
      const U = v.value[S(P.id)];
      U && (U.percent = null, U.status = Se.ERROR, U.statusName = j?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : j?.message || t("Unknown Error"));
    }), w.on("error", (P) => {
      k.value = P.message, b.value = !1;
    }), w.on("complete", (P) => {
      b.value = !1;
      const j = m.value || i.value;
      e.adapter.invalidateListQuery(j.path), e.adapter.open(j.path);
      const U = v.value.filter(
        (Y) => Y.status === Se.DONE && P.successful.includes(Y.id)
      ).map((Y) => Y.name);
      e.emitter.emit("vf-upload-complete", U);
    }), h.value?.addEventListener("click", () => u.value?.click()), p.value?.addEventListener("click", () => f.value?.click());
    const V = { capture: !0 };
    document.addEventListener("dragover", g, V), document.addEventListener("dragenter", F, V), document.addEventListener("dragleave", C, V), document.addEventListener("drop", L, V);
    const I = (P) => {
      const j = P.target, U = j.files;
      if (U) {
        for (const Y of U) H(Y, Y.webkitRelativePath || void 0);
        j.value = "";
      }
    };
    u.value?.addEventListener("change", I), f.value?.addEventListener("change", I);
  }), Ae(() => {
    const x = { capture: !0 };
    document.removeEventListener("dragover", g, x), document.removeEventListener("dragenter", F, x), document.removeEventListener("dragleave", C, x), document.removeEventListener("drop", L, x);
  }), {
    container: d,
    internalFileInput: u,
    internalFolderInput: f,
    pickFiles: h,
    pickFolders: p,
    queue: v,
    message: k,
    uploading: b,
    hasFilesInDropArea: $,
    definitions: l,
    openFileSelector: W,
    upload: T,
    cancel: z,
    remove: X,
    clear: ve,
    close: E,
    getClassNameForEntry: ne,
    getIconForEntry: J,
    addExternalFiles: B,
    renameEntry: q
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
function Pa(n, e, t) {
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
}, ri = { class: "vuefinder__image-editor__stage" }, di = ["src", "alt"], ci = { class: "vuefinder__image-editor__controls vuefinder__image-editor__controls--stacked" }, ui = { class: "vuefinder__image-editor__slider" }, vi = { class: "vuefinder__image-editor__slider" }, fi = { class: "vuefinder__image-editor__slider" }, _i = { class: "vuefinder__image-editor__row" }, pi = ["disabled"], mi = /* @__PURE__ */ ce({
  name: "ImageEditor",
  __name: "ImageEditor",
  props: {
    src: {},
    filename: {}
  },
  emits: ["update:src"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = de(), { t: r } = i.i18n, l = D("crop"), d = D(!1), u = D(null), f = [
      { label: "Original", value: null },
      { label: "1:1", value: 1 },
      { label: "4:3", value: 4 / 3 },
      { label: "16:9", value: 16 / 9 },
      { label: "9:16", value: 9 / 16 }
    ], h = st("cropperRef"), p = D(0), v = D(!1), k = D(!1), b = D(!1), $ = D(0), m = D(0), w = D(0), g = O(
      () => Pa($.value, m.value, w.value)
    );
    me([() => t.src, l], () => {
      p.value = 0, v.value = !1, k.value = !1, b.value = !1, $.value = 0, m.value = 0, w.value = 0;
    });
    const F = O(() => Fa(t.filename)), C = O(() => {
      const A = [];
      return p.value && A.push(`rotate(${p.value}deg)`), v.value && A.push("scaleX(-1)"), k.value && A.push("scaleY(-1)"), A.length ? { transform: A.join(" ") } : {};
    }), L = (A) => {
      d.value || (l.value = A);
    }, S = () => {
      const q = h.value?.getResult()?.canvas;
      if (!q) return;
      const x = q.toDataURL(F.value, F.value === "image/jpeg" ? 0.92 : void 0);
      s("update:src", x);
    }, R = async () => {
      if (X.value) {
        d.value = !0;
        try {
          const A = await Ea(
            t.src,
            z.value,
            v.value,
            k.value,
            F.value
          );
          s("update:src", A);
        } finally {
          d.value = !1;
        }
      }
    }, H = async () => {
      if (b.value) {
        d.value = !0;
        try {
          const A = await xn(t.src, "grayscale(1)", F.value);
          s("update:src", A);
        } finally {
          d.value = !1;
        }
      }
    }, oe = async () => {
      if (!($.value === 0 && m.value === 0 && w.value === 0)) {
        d.value = !0;
        try {
          const A = await xn(t.src, g.value, F.value);
          s("update:src", A);
        } finally {
          d.value = !1;
        }
      }
    }, ne = () => {
      $.value = 0, m.value = 0, w.value = 0;
    }, J = () => {
      p.value -= 90;
    }, W = () => {
      p.value += 90;
    }, E = () => {
      v.value = !v.value;
    }, T = () => {
      k.value = !k.value;
    }, z = O(
      () => (p.value % 360 + 360) % 360
    ), X = O(
      () => z.value !== 0 || v.value || k.value
    ), ve = O(
      () => $.value !== 0 || m.value !== 0 || w.value !== 0
    ), B = O(() => b.value);
    return (A, q) => (c(), _("div", Da, [
      o("div", Ma, [
        (c(), _(fe, null, he(["crop", "rotate", "grayscale", "adjust"], (x) => o("button", {
          key: x,
          type: "button",
          role: "tab",
          "aria-selected": l.value === x,
          class: ae(["vuefinder__image-editor__tab", { "vuefinder__image-editor__tab--active": l.value === x }]),
          onClick: (V) => L(x)
        }, [
          x === "crop" ? (c(), _("svg", Aa, [...q[4] || (q[4] = [
            o("path", { d: "M6 2v16a2 2 0 0 0 2 2h14" }, null, -1),
            o("path", { d: "M2 6h16a2 2 0 0 1 2 2v14" }, null, -1)
          ])])) : x === "rotate" ? (c(), _("svg", Oa, [...q[5] || (q[5] = [
            o("polyline", { points: "23 4 23 10 17 10" }, null, -1),
            o("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" }, null, -1)
          ])])) : x === "grayscale" ? (c(), _("svg", La, [...q[6] || (q[6] = [
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
          ])])) : (c(), _("svg", Ra, [...q[7] || (q[7] = [
            Ct('<line x1="4" y1="6" x2="14" y2="6"></line><circle cx="17" cy="6" r="2"></circle><line x1="10" y1="12" x2="20" y2="12"></line><circle cx="7" cy="12" r="2"></circle><line x1="4" y1="18" x2="14" y2="18"></line><circle cx="17" cy="18" r="2"></circle>', 6)
          ])])),
          o("span", Ba, y(x === "crop" ? a(r)("Crop") : x === "rotate" ? a(r)("Rotate") : x === "grayscale" ? a(r)("Grayscale") : a(r)("Adjust")), 1)
        ], 10, Ia)), 64))
      ]),
      l.value === "crop" ? (c(), _("div", za, [
        o("div", Va, [
          G(a(Do), {
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
            (c(), _(fe, null, he(f, (x) => o("button", {
              key: x.label,
              type: "button",
              class: ae(["vuefinder__image-editor__chip", { "vuefinder__image-editor__chip--active": u.value === x.value }]),
              onClick: (V) => u.value = x.value
            }, y(a(r)(x.label)), 11, Ha)), 64))
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value,
            onClick: S
          }, y(a(r)("Apply")), 9, ja)
        ])
      ])) : l.value === "rotate" ? (c(), _("div", Ka, [
        o("div", qa, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Ie(C.value),
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
            }, [...q[8] || (q[8] = [
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
            }, [...q[9] || (q[9] = [
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
              class: ae(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": v.value }]),
              title: a(r)("Flip horizontal"),
              onClick: E
            }, [...q[10] || (q[10] = [
              Ct('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 7 8 11"></polyline><polyline points="16 3 20 7 16 11"></polyline><line x1="4" y1="7" x2="20" y2="7"></line><line x1="12" y1="13" x2="12" y2="21"></line></svg>', 1)
            ])], 10, Ja),
            o("button", {
              type: "button",
              class: ae(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": k.value }]),
              title: a(r)("Flip vertical"),
              onClick: T
            }, [...q[11] || (q[11] = [
              Ct('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8 7 4 11 8"></polyline><polyline points="3 16 7 20 11 16"></polyline><line x1="7" y1="4" x2="7" y2="20"></line><line x1="13" y1="12" x2="21" y2="12"></line></svg>', 1)
            ])], 10, Za)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value || !X.value,
            onClick: R
          }, y(a(r)("Apply")), 9, ei)
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
              "onUpdate:modelValue": q[0] || (q[0] = (x) => b.value = x),
              type: "checkbox"
            }, null, 512), [
              [lt, b.value]
            ]),
            o("span", null, y(a(r)("Grayscale")), 1)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value || !B.value,
            onClick: H
          }, y(a(r)("Apply")), 9, ii)
        ])
      ])) : (c(), _("div", li, [
        o("div", ri, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Ie({ filter: g.value }),
            alt: t.filename
          }, null, 12, di)
        ]),
        o("div", ci, [
          o("div", ui, [
            o("label", null, [
              be(y(a(r)("Brightness")), 1),
              o("span", null, y($.value), 1)
            ]),
            ge(o("input", {
              "onUpdate:modelValue": q[1] || (q[1] = (x) => $.value = x),
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
              be(y(a(r)("Contrast")), 1),
              o("span", null, y(m.value), 1)
            ]),
            ge(o("input", {
              "onUpdate:modelValue": q[2] || (q[2] = (x) => m.value = x),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                We,
                m.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", fi, [
            o("label", null, [
              be(y(a(r)("Saturation")), 1),
              o("span", null, y(w.value), 1)
            ]),
            ge(o("input", {
              "onUpdate:modelValue": q[3] || (q[3] = (x) => w.value = x),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                We,
                w.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", _i, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__reset",
              onClick: ne
            }, y(a(r)("Reset")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__apply",
              disabled: d.value || !ve.value,
              onClick: oe
            }, y(a(r)("Apply")), 9, pi)
          ])
        ])
      ]))
    ]));
  }
}), hi = { class: "vuefinder__image-preview" }, gi = ["src"], wi = ["aria-label", "title"], yi = ["aria-label", "title"], bi = ["aria-label", "title"], ki = 0.5, $i = 3, Sn = 0.25, xi = /* @__PURE__ */ ce({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, s = de(), i = Ve(s), { enabled: r } = Ne(), { t: l } = s.i18n, d = D(!1), u = D(
      s.modal.data.item.previewUrl ?? s.adapter.getPreviewUrl({ path: s.modal.data.item.path })
    ), f = D(u.value), h = D(!1), p = D(1), v = D(null), k = D(0), b = D(0), $ = D(1), m = D(!1), w = D(0), g = D(0);
    let F = null, C = 0, L = 0, S = 0, R = 0;
    const { addExternalFiles: H, upload: oe, queue: ne } = Jn(s.customUploader), J = s.fs, W = se(J.path), E = O(() => k.value * $.value), T = O(() => b.value * $.value), z = (M, ee) => {
      const _e = v.value?.clientWidth ?? 0, ye = v.value?.clientHeight ?? 0, De = Math.max(0, (E.value * p.value - _e) / 2), Je = Math.max(0, (T.value * p.value - ye) / 2);
      return {
        x: Math.min(De, Math.max(-De, M)),
        y: Math.min(Je, Math.max(-Je, ee))
      };
    }, X = O(() => {
      if (!k.value || !b.value)
        return {};
      const { x: M, y: ee } = z(w.value, g.value);
      return {
        width: `${E.value}px`,
        height: `${T.value}px`,
        transform: `translate(${M}px, ${ee}px) scale(${p.value})`,
        transformOrigin: "center center"
      };
    }), ve = () => {
      if (!v.value || !k.value || !b.value) return;
      const M = v.value.getBoundingClientRect();
      !M.width || !M.height || ($.value = Math.min(M.width / k.value, M.height / b.value));
    }, B = (M) => {
      const ee = M.target;
      ee instanceof HTMLImageElement && (k.value = ee.naturalWidth || ee.clientWidth, b.value = ee.naturalHeight || ee.clientHeight, ve());
    }, A = (M) => Math.min($i, Math.max(ki, M)), q = () => {
      p.value = A(Number((p.value + Sn).toFixed(2)));
      const M = z(w.value, g.value);
      w.value = M.x, g.value = M.y;
    }, x = () => {
      p.value = A(Number((p.value - Sn).toFixed(2)));
      const M = z(w.value, g.value);
      w.value = M.x, g.value = M.y;
    }, V = () => {
      p.value = 1, w.value = 0, g.value = 0;
    }, I = (M) => {
      d.value || (M.deltaY > 0 ? x() : M.deltaY < 0 && q());
    }, P = (M) => {
      if (d.value) return;
      const ee = M.target;
      if (ee instanceof HTMLInputElement || ee instanceof HTMLTextAreaElement || ee?.isContentEditable)
        return;
      const _e = M.key === "=" || M.key === "+", ye = M.key === "-" || M.key === "_", De = M.key === "0";
      if (!(!_e && !ye && !De)) {
        if (M.preventDefault(), _e) {
          q();
          return;
        }
        if (ye) {
          x();
          return;
        }
        V();
      }
    }, j = () => {
      m.value = !1;
    }, U = (M) => {
      d.value || p.value <= 1 || !v.value || (m.value = !0, C = M.clientX, L = M.clientY, S = w.value, R = g.value, M.currentTarget?.setPointerCapture?.(M.pointerId));
    }, Y = (M) => {
      if (!m.value) return;
      const ee = M.clientX - C, _e = M.clientY - L, ye = z(S + ee, R + _e);
      w.value = ye.x, g.value = ye.y;
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
      commitEdit: () => K(),
      cancelEdit: () => {
        d.value = !1, f.value = u.value, h.value = !1, s.modal.setEditMode(!1);
      },
      extraInfo: O(() => !k.value || !b.value ? [] : [{ label: l("Dimensions"), value: `${k.value} × ${b.value}` }])
    });
    const Z = (M) => {
      f.value = M, h.value = !0;
    }, K = async () => {
      if (!h.value) return;
      const M = s.modal.data.item.basename, ee = M.split(".").pop()?.toLowerCase() || "jpg", _e = ee === "png" ? "image/png" : ee === "gif" ? "image/gif" : "image/jpeg";
      try {
        const ye = await Ta(f.value), De = new File([ye], M, { type: _e }), te = s.modal.data.item.path.split("/");
        te.pop();
        const le = {
          path: te.join("/") || (W.value?.path ?? "")
        };
        H([De]), await new Promise((Ee) => setTimeout(Ee, 100));
        const ue = ne.value.find((Ee) => Ee.name === De.name);
        if (!ue)
          throw new Error("File was not added to upload queue");
        oe(le);
        let He = 0;
        for (; He < 150; ) {
          await new Promise((Ye) => setTimeout(Ye, 200));
          const Ee = ne.value.find((Ye) => Ye.id === ue.id);
          if (Ee?.status === Se.DONE) break;
          if (Ee?.status === Se.ERROR)
            throw new Error(Ee.statusName || "Upload failed");
          He++;
        }
        i.success(l("Updated.")), await fetch(u.value, { cache: "reload", mode: "no-cors" });
        const Me = s.root?.querySelector?.('[data-src="' + u.value + '"]');
        Me && Me instanceof HTMLElement && Wt.resetStatus(Me), s.emitter.emit("vf-refresh-thumbnails"), d.value = !1, h.value = !1, f.value = u.value, s.modal.setEditMode(!1), t("success");
      } catch (ye) {
        i.error(Te(ye, l("Failed to save image")));
      }
    };
    return ke(() => {
      F = new ResizeObserver(() => {
        ve();
      }), v.value && F.observe(v.value), window.addEventListener("keydown", P), t("success");
    }), bt(() => {
      window.removeEventListener("keydown", P), F?.disconnect();
    }), (M, ee) => (c(), _("div", hi, [
      o("div", {
        ref_key: "imageContainer",
        ref: v,
        class: "vuefinder__image-preview__image-container"
      }, [
        d.value ? (c(), Q(mi, {
          key: 1,
          src: f.value,
          filename: a(s).modal.data.item.basename,
          "onUpdate:src": Z
        }, null, 8, ["src", "filename"])) : (c(), _("div", {
          key: 0,
          class: "vuefinder__image-preview__stage",
          onWheel: pe(I, ["prevent"])
        }, [
          o("img", {
            style: Ie(X.value),
            src: a(s).modal.data.item.previewUrl ?? a(s).adapter.getPreviewUrl({ path: a(s).modal.data.item.path }),
            class: ae(["vuefinder__image-preview__image", {
              "vuefinder__image-preview__image--zoomed": p.value > 1,
              "vuefinder__image-preview__image--panning": m.value
            }]),
            draggable: !1,
            onLoad: B,
            onPointerdown: U,
            onPointermove: Y,
            onPointerup: j,
            onPointercancel: j,
            onLostpointercapture: j
          }, null, 46, gi),
          o("div", {
            class: "vuefinder__image-preview__zoom-controls",
            onPointerdown: ee[0] || (ee[0] = pe(() => {
            }, ["stop"])),
            onWheel: ee[1] || (ee[1] = pe(() => {
            }, ["stop"]))
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(l)("Zoom out"),
              title: a(l)("Zoom out"),
              onClick: x
            }, [...ee[2] || (ee[2] = [
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
            ])], 8, wi),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-reset",
              "aria-label": a(l)("Reset zoom"),
              title: a(l)("Reset zoom"),
              onClick: V
            }, y(Math.round(p.value * 100)) + "% ", 9, yi),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(l)("Zoom in"),
              title: a(l)("Zoom in"),
              onClick: q
            }, [...ee[3] || (ee[3] = [
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
const gt = { render: Ci }, Fi = { class: "vuefinder__default-preview" }, Ei = { class: "vuefinder__default-preview__content" }, Pi = { class: "vuefinder__default-preview__icon-container" }, Ti = ["title"], Di = /* @__PURE__ */ ce({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = de(), s = e;
    return ke(() => {
      s("success");
    }), (i, r) => (c(), _("div", Fi, [
      o("div", Ei, [
        o("div", Pi, [
          G(a(gt), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            class: "vuefinder__default-preview__file-name",
            title: a(t).modal.data.item.path
          }, y(a(t).modal.data.item.basename), 9, Ti)
        ])
      ])
    ]));
  }
}), Mi = { class: "vuefinder__video-preview" }, Ii = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Ai = ["src"], Oi = /* @__PURE__ */ ce({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = de(), s = e, i = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return ke(() => {
      s("success");
    }), (r, l) => (c(), _("div", Mi, [
      o("div", null, [
        o("video", Ii, [
          o("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, Ai),
          l[0] || (l[0] = be(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Li = { class: "vuefinder__audio-preview" }, Ri = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Bi = ["src"], zi = /* @__PURE__ */ ce({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e;
    de();
    const s = () => {
      const i = de();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return ke(() => {
      t("success");
    }), (i, r) => (c(), _("div", Li, [
      o("div", null, [
        o("audio", Ri, [
          o("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Bi),
          r[0] || (r[0] = be(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Vi = { class: "vuefinder__pdf-preview" }, Ui = ["data"], Ni = ["src"], Hi = /* @__PURE__ */ ce({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    de();
    const t = e, s = () => {
      const i = de();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return ke(() => {
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
}, Zi = { class: "vuefinder__preview-modal__edit-actions" }, el = ["disabled"], Cn = 8, tl = 1.4, nl = 0.22, dt = 220, ol = ".vuefinder__preview-chrome__title, .vuefinder__preview-modal__status-strip", Qe = /* @__PURE__ */ ce({
  __name: "ModalPreview",
  setup(n) {
    const e = de(), { enabled: t } = Ne(), { t: s } = e.i18n, i = D(!1), r = (I) => {
      const P = (I || "").split("/").pop() || "", j = P.lastIndexOf(".");
      return j >= 0 ? P.slice(j + 1).toLowerCase() : "";
    }, l = (I, P) => {
      if (!P) return !1;
      const j = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), U = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), Y = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), Z = /* @__PURE__ */ new Set([
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
      return I === "image" ? j.has(P) : I === "video" ? U.has(P) : I === "audio" ? Y.has(P) : I === "csv" ? P === "csv" || P === "tsv" : I === "text" ? Z.has(P) : I === "application/pdf" ? P === "pdf" : !1;
    }, d = (I) => {
      const P = e.modal.data.forceType;
      if (P) return P === I;
      const j = e.modal.data.item.mime_type;
      if (j && typeof j == "string" && j.startsWith(I)) return !0;
      const U = r(e.modal.data.item.path);
      return l(I, U);
    }, u = t("preview");
    u || (i.value = !0);
    const f = O(() => e.modal.data.item), h = se(e.fs.sortedFiles), p = O(() => h.value.filter((I) => I.type === "file")), v = O(
      () => p.value.findIndex((I) => I.path === f.value.path)
    ), k = O(() => !!a(e.modal.controls?.isEditable)), b = O(() => !!a(e.modal.controls?.isEditing)), $ = O(() => !!a(e.modal.controls?.isDirty)), m = O(
      () => a(e.modal.controls?.primaryActionLabel) ?? s("Save")
    ), w = async () => {
      await e.modal.controls?.enterEdit?.();
    }, g = async () => {
      await e.modal.controls?.commitEdit?.();
    }, F = async () => {
      $.value && !window.confirm(s("Discard unsaved changes?")) || await e.modal.controls?.cancelEdit?.();
    }, C = O(() => !b.value && v.value > 0), L = O(
      () => !b.value && v.value < p.value.length - 1
    ), S = () => {
      if (!C.value) return;
      const I = p.value[v.value - 1];
      I && (e.fs.clearSelection(), e.fs.select(I.path), e.modal.data.item = I, i.value = !1);
    }, R = () => {
      if (!L.value) return;
      const I = p.value[v.value + 1];
      I && (e.fs.clearSelection(), e.fs.select(I.path), e.modal.data.item = I, i.value = !1);
    }, H = () => {
      b.value && $.value && !window.confirm(s("Discard unsaved changes?")) || e.modal.close();
    }, oe = D(0), ne = D(!1);
    let J = 0, W = 0, E = !1, T = !1;
    const z = O(() => ({
      transform: `translate3d(${oe.value}px, 0, 0)`,
      transition: ne.value ? `transform ${dt}ms ease-out` : "none"
    })), X = (I, P) => {
      setTimeout(P, I);
    }, ve = (I) => {
      if (b.value || I.touches.length !== 1 || !I.target?.closest?.(ol)) return;
      const j = I.touches[0];
      j && (E = !0, T = !1, J = j.clientX, W = j.clientY, ne.value = !1);
    }, B = (I) => {
      if (!E) return;
      const P = I.touches[0];
      if (!P) return;
      const j = P.clientX - J, U = P.clientY - W;
      if (!T) {
        if (Math.abs(j) < Cn && Math.abs(U) < Cn) return;
        if (Math.abs(j) < Math.abs(U) * tl) {
          E = !1;
          return;
        }
        T = !0;
      }
      let Y = j;
      j > 0 && !C.value && (Y = j * 0.3), j < 0 && !L.value && (Y = j * 0.3), oe.value = Y, I.cancelable && I.preventDefault();
    }, A = (I) => {
      const P = window.innerWidth || 1, j = I === "prev" ? P : -P, U = I === "prev" ? -P : P, Y = I === "prev" ? S : R;
      ne.value = !0, oe.value = j, X(dt, () => {
        Y(), ne.value = !1, oe.value = U, requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ne.value = !0, oe.value = 0, X(dt, () => {
              ne.value = !1;
            });
          });
        });
      });
    }, q = () => {
      if (!E || (E = !1, !T)) return;
      const I = window.innerWidth || 1, P = oe.value, j = Math.abs(P) >= I * nl;
      if (j && P > 0 && C.value) {
        A("prev");
        return;
      }
      if (j && P < 0 && L.value) {
        A("next");
        return;
      }
      ne.value = !0, oe.value = 0, X(dt, () => {
        ne.value = !1;
      });
    }, x = () => {
      E && (E = !1, T && (ne.value = !0, oe.value = 0, X(dt, () => {
        ne.value = !1;
      })));
    }, V = (I) => {
      if (I.key === "Escape") {
        I.preventDefault(), I.stopPropagation(), H();
        return;
      }
      if ((I.metaKey || I.ctrlKey) && I.key.toLowerCase() === "s") {
        const P = e.modal.controls;
        if (P && a(P.isEditing)) {
          I.preventDefault(), P.commitEdit();
          return;
        }
      }
      b.value || (I.key === "ArrowLeft" || I.key === "ArrowRight") && (I.preventDefault(), I.stopPropagation(), I.key === "ArrowLeft" ? S() : R());
    };
    return ke(() => {
      const I = document.querySelector(".vuefinder__preview-modal");
      I && I.focus();
    }), (I, P) => (c(), Q(Ue, {
      "on-request-close": H,
      "body-style": z.value,
      "body-class": "vuefinder__modal-layout__body--swipeable " + (b.value ? "vuefinder__modal-layout__body--editing" : ""),
      "on-body-touchstart": ve,
      "on-body-touchmove": B,
      "on-body-touchend": q,
      "on-body-touchcancel": x
    }, yo({
      default: re(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: V
        }, [
          G(ra, { onCloseRequest: H }),
          (c(), Q(kt, { to: "body" }, [
            b.value ? N("", !0) : (c(), _("div", {
              key: 0,
              class: "vuefinder__themer vuefinder__preview-modal__nav-overlay",
              "data-theme": a(e).theme.current
            }, [
              o("button", {
                disabled: !C.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
                title: a(s)("Previous file"),
                onClick: S
              }, [...P[7] || (P[7] = [
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
                onClick: R
              }, [...P[8] || (P[8] = [
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
                onSuccess: P[0] || (P[0] = (j) => i.value = !0)
              })) : d("text") ? (c(), Q(va, {
                key: `text-${f.value.path}`,
                onSuccess: P[1] || (P[1] = (j) => i.value = !0)
              })) : d("image") ? (c(), Q(xi, {
                key: `image-${f.value.path}`,
                onSuccess: P[2] || (P[2] = (j) => i.value = !0)
              })) : d("video") ? (c(), Q(Oi, {
                key: `video-${f.value.path}`,
                onSuccess: P[3] || (P[3] = (j) => i.value = !0)
              })) : d("audio") ? (c(), Q(zi, {
                key: `audio-${f.value.path}`,
                onSuccess: P[4] || (P[4] = (j) => i.value = !0)
              })) : d("application/pdf") ? (c(), Q(Hi, {
                key: `pdf-${f.value.path}`,
                onSuccess: P[5] || (P[5] = (j) => i.value = !0)
              })) : (c(), Q(Di, {
                key: `default-${f.value.path}`,
                onSuccess: P[6] || (P[6] = (j) => i.value = !0)
              }))
            ])) : N("", !0),
            b.value || p.value.length > 1 ? (c(), _("div", Yi, [
              b.value ? (c(), _("span", {
                key: 0,
                class: ae(["vuefinder__preview-modal__edit-chip", { "vuefinder__preview-modal__edit-chip--dirty": $.value }])
              }, y($.value ? a(s)("Unsaved") : a(s)("Editing")), 3)) : (c(), _("span", {
                key: 1,
                class: "vuefinder__preview-modal__pagination-text",
                "aria-label": a(s)("File %s of %s", String(v.value + 1), String(p.value.length))
              }, y(v.value + 1) + " / " + y(p.value.length), 9, Xi))
            ])) : N("", !0),
            o("div", Qi, [
              i.value === !1 ? (c(), _("div", Ji, [
                P[9] || (P[9] = o("svg", {
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
                o("span", null, y(a(s)("Loading")), 1)
              ])) : N("", !0)
            ])
          ])
        ], 32)
      ]),
      _: 2
    }, [
      k.value ? {
        name: "buttons",
        fn: re(() => [
          o("div", Zi, [
            b.value ? (c(), _(fe, { key: 1 }, [
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
                disabled: !$.value,
                onClick: g
              }, y(m.value), 9, el),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary vuefinder__preview-modal__edit-btn",
                onClick: F
              }, y(a(s)("Cancel")), 1)
            ], 64)) : (c(), _("button", {
              key: 0,
              type: "button",
              class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
              onClick: w
            }, y(a(s)("Edit")), 1))
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
const wt = { render: ml }, hl = {
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
const an = { render: gl }, wl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function yl(n, e) {
  return c(), _("svg", wl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const Ot = { render: yl }, bl = { class: "vuefinder__modal-tree__folder-item" }, kl = { class: "vuefinder__modal-tree__folder-content" }, $l = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, xl = { class: "vuefinder__modal-tree__folder-text" }, Sl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Cl = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Fl = 300, El = /* @__PURE__ */ ce({
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
    const t = de(), { t: s } = t.i18n, i = t.fs, r = D({}), l = n, d = e;
    se(i.path);
    const u = O(() => {
      const R = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[R] || !1;
    }), f = O(() => l.modelValue?.path === l.folder.path), h = O(() => l.currentPath?.path === l.folder.path), p = O(() => l.modalTreeData[l.folder.path] || []), v = O(() => {
      const R = p.value, H = r.value[l.folder.path] || 50;
      return R.length > H ? R.slice(0, H) : R;
    }), k = O(() => p.value.length), b = O(() => r.value[l.folder.path] || 50), $ = O(() => k.value > b.value), m = () => {
      r.value[l.folder.path] = (b.value || 50) + 50;
    }, w = O(() => p.value.length > 0 || l.folder.type === "dir"), g = () => {
      d("toggleFolder", l.storage, l.folder.path);
    }, F = () => {
      d("update:modelValue", l.folder);
    }, C = () => {
      d("update:modelValue", l.folder), d("selectAndClose", l.folder);
    };
    let L = 0;
    const S = () => {
      const R = Date.now();
      R - L < Fl ? C() : F(), L = R;
    };
    return (R, H) => {
      const oe = Bn("ModalTreeFolderItem", !0);
      return c(), _("div", bl, [
        o("div", kl, [
          w.value ? (c(), _("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: g
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
            class: ae(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": f.value,
              "vuefinder__modal-tree__folder-link--current": h.value
            }]),
            onClick: F,
            onDblclick: C,
            onTouchend: S
          }, [
            u.value ? (c(), Q(a(Ot), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (c(), Q(a(ze), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", xl, y(n.folder.basename), 1)
          ], 34)
        ]),
        u.value && w.value ? (c(), _("div", Sl, [
          (c(!0), _(fe, null, he(v.value, (ne) => (c(), Q(oe, {
            key: ne.path,
            folder: ne,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": H[0] || (H[0] = (J) => R.$emit("update:modelValue", J)),
            onSelectAndClose: H[1] || (H[1] = (J) => R.$emit("selectAndClose", J)),
            onToggleFolder: H[2] || (H[2] = (J, W) => R.$emit("toggleFolder", J, W))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          $.value ? (c(), _("div", Cl, [
            o("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: m
            }, y(a(s)("load more")), 1)
          ])) : N("", !0)
        ])) : N("", !0)
      ]);
    };
  }
}), Pl = { class: "vuefinder__modal-tree" }, Tl = { class: "vuefinder__modal-tree__header" }, Dl = { class: "vuefinder__modal-tree__title" }, Ml = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Il = { class: "vuefinder__modal-tree__section-title" }, Al = { class: "vuefinder__modal-tree__list" }, Ol = ["onClick", "onDblclick", "onTouchend"], Ll = { class: "vuefinder__modal-tree__text" }, Rl = { class: "vuefinder__modal-tree__text-storage" }, Bl = { class: "vuefinder__modal-tree__section-title" }, zl = { class: "vuefinder__modal-tree__list" }, Vl = { class: "vuefinder__modal-tree__storage-item" }, Ul = { class: "vuefinder__modal-tree__storage-content" }, Nl = ["onClick"], Hl = ["onClick", "onDblclick", "onTouchend"], jl = { class: "vuefinder__modal-tree__storage-text" }, Kl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, ql = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Wl = ["onClick"], Fn = 300, $t = /* @__PURE__ */ ce({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = de(), { t: s } = t.i18n, i = t.fs, r = t.config, l = e, d = se(i.sortedFiles), u = se(i.storages), f = O(() => u.value || []), h = se(i.path), p = D(null), v = D({}), k = D({}), b = D({});
    me(d, (E) => {
      const T = E.filter((X) => X.type === "dir"), z = h.value?.path || "";
      z && (k.value[z] = T.map((X) => ({
        ...X,
        type: "dir"
      })));
    });
    const $ = (E, T) => {
      const z = `${E}:${T}`;
      v.value = {
        ...v.value,
        [z]: !v.value[z]
      }, v.value[z] && !k.value[T] && t.adapter.list(T).then((X) => {
        const B = (X.files || []).filter((A) => A.type === "dir");
        k.value[T] = B.map((A) => ({
          ...A,
          type: "dir"
        }));
      });
    }, m = (E) => k.value[E] || [], w = (E) => b.value[E] || 50, g = (E) => {
      const T = m(E), z = w(E);
      return T.length > z ? T.slice(0, z) : T;
    }, F = (E) => m(E).length, C = (E) => F(E) > w(E), L = (E) => {
      b.value[E] = w(E) + 50;
    }, S = (E) => {
      E && l("update:modelValue", E);
    }, R = (E) => {
      E && (l("update:modelValue", E), l("selectAndClose", E));
    }, H = (E) => {
      const T = {
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
      l("update:modelValue", T);
    }, oe = (E) => {
      const T = {
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
      l("update:modelValue", T), l("selectAndClose", T);
    };
    let ne = 0;
    const J = (E) => {
      if (!E) return;
      const T = Date.now();
      T - ne < Fn ? R(E) : S(E), ne = T;
    }, W = (E) => {
      const T = Date.now();
      T - ne < Fn ? oe(E) : H(E), ne = T;
    };
    return ke(() => {
      p.value && _t(p.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (E, T) => (c(), _("div", Pl, [
      o("div", Tl, [
        o("div", Dl, y(a(s)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: p,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && a(t).features.pinned && a(r).get("pinnedFolders").length ? (c(), _("div", Ml, [
          o("div", Il, y(a(s)("Pinned Folders")), 1),
          o("div", Al, [
            (c(!0), _(fe, null, he(a(r).get("pinnedFolders"), (z) => (c(), _("div", {
              key: z.path,
              class: ae(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === z.path }]),
              onClick: (X) => S(z),
              onDblclick: (X) => R(z),
              onTouchend: (X) => J(z)
            }, [
              G(a(ze), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", Ll, y(z.basename), 1),
              o("div", Rl, y(z.storage), 1),
              G(a(wt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ol))), 128))
          ])
        ])) : N("", !0),
        o("div", Bl, y(a(s)("Storages")), 1),
        (c(!0), _(fe, null, he(f.value, (z) => (c(), _("div", {
          key: z,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", zl, [
            o("div", Vl, [
              o("div", Ul, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: pe((X) => $(z, z + "://"), ["stop"])
                }, [
                  v.value[`${z}:${z}://`] ? (c(), Q(a(At), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (c(), Q(a(It), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Nl),
                o("div", {
                  class: ae(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === z + "://"
                  }]),
                  onClick: (X) => H(z),
                  onDblclick: (X) => oe(z),
                  onTouchend: (X) => W(z)
                }, [
                  G(a(an), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", jl, y(z), 1)
                ], 42, Hl)
              ]),
              v.value[`${z}:${z}://`] ? (c(), _("div", Kl, [
                (c(!0), _(fe, null, he(g(z + "://"), (X) => (c(), Q(El, {
                  key: X.path,
                  folder: X,
                  storage: z,
                  "model-value": n.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": k.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": S,
                  onSelectAndClose: R,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                C(z + "://") ? (c(), _("div", ql, [
                  o("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (X) => L(z + "://")
                  }, y(a(s)("load more")), 9, Wl)
                ])) : N("", !0)
              ])) : N("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Gl = ["title"], Yt = /* @__PURE__ */ ce({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, s = de(), { t: i } = s.i18n, r = D(!1), l = D(null), d = D(l.value?.innerHTML);
    me(d, () => r.value = !1);
    const u = () => {
      t("hidden"), r.value = !0;
    };
    return (f, h) => (c(), _("div", null, [
      r.value ? N("", !0) : (c(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: ae(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
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
}, ir = { class: "vuefinder__move-modal__checkbox-label" }, lr = { class: "vuefinder__move-modal__checkbox-text" }, rr = ["disabled"], dr = { class: "vuefinder__move-modal__selected-items" }, to = /* @__PURE__ */ ce({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = de(), t = Ve(e), { enabled: s } = Ne(), { t: i } = e.i18n, r = n, l = D(e.modal.data.items.from), d = D(e.modal.data.items.to), u = D(""), f = D(r.copy || !s("move")), h = O(() => f.value ? "copy" : "move"), p = D(!1), v = se(e.fs.path), k = O(() => f.value ? i("Copy files") : i("Move files")), b = O(
      () => f.value ? i("Are you sure you want to copy these files?") : i("Are you sure you want to move these files?")
    ), $ = O(() => f.value ? i("Yes, Copy!") : i("Yes, Move!"));
    O(() => f.value ? i("Files copied.") : i("Files moved."));
    const m = (S) => {
      S && (d.value = S);
    }, w = (S) => {
      S && (d.value = S, p.value = !1);
    }, g = O(() => {
      const S = d.value;
      return S ? l.value.some((R) => !!(S.path === R.path || R.type === "dir" && S.path.startsWith(R.path + "/"))) : !0;
    }), F = O(() => {
      if (!g.value)
        return "";
      const S = d.value;
      return S ? l.value.find((H) => S.path === H.path || H.type === "dir" && S.path.startsWith(H.path + "/")) ? i("Cannot move/copy item to itself or its own subfolder") : i("Invalid destination directory") : i("Please select a destination directory");
    }), C = () => {
      const S = d.value.path;
      if (!S) return { storage: "local", path: "" };
      if (S.endsWith("://"))
        return { storage: S.replace("://", ""), path: "" };
      const R = S.split("://");
      return {
        storage: R[0] || "local",
        path: R[1] || ""
      };
    }, L = async () => {
      if (l.value.length)
        try {
          const { files: S } = await e.adapter[h.value]({
            path: v.value.path,
            sources: l.value.map(({ path: R }) => R),
            destination: d.value.path
          });
          e.fs.setFiles(S), e.modal.close();
        } catch (S) {
          t.error(Te(S, i("Failed to transfer files")));
        }
    };
    return (S, R) => (c(), Q(Ue, null, {
      buttons: re(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: L
        }, y($.value), 9, rr),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: R[4] || (R[4] = (H) => a(e).modal.close())
        }, y(a(i)("Cancel")), 1),
        o("div", dr, y(a(i)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: re(() => [
        o("div", null, [
          G(je, {
            icon: f.value ? a(sn) : a(il),
            title: k.value
          }, null, 8, ["icon", "title"]),
          o("div", Yl, [
            o("p", Xl, y(b.value), 1),
            o("div", Ql, [
              (c(!0), _(fe, null, he(l.value, (H) => (c(), _("div", {
                key: H.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  H.type === "dir" ? (c(), Q(a(ze), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (c(), Q(a(gt), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", Jl, y(H.path), 1)
              ]))), 128))
            ]),
            o("h4", Zl, y(a(i)("Target Directory")), 1),
            o("div", er, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: R[0] || (R[0] = (H) => p.value = !p.value)
              }, [
                o("div", tr, [
                  o("span", nr, y(C().storage) + "://", 1),
                  C().path ? (c(), _("span", or, y(C().path), 1)) : N("", !0)
                ]),
                o("span", sr, y(a(i)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: ae([
                "vuefinder__move-modal__tree-selector",
                p.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              G($t, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  R[1] || (R[1] = (H) => d.value = H),
                  m
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: w
              }, null, 8, ["modelValue"])
            ], 2),
            a(s)("copy") && a(s)("move") ? (c(), _("div", ar, [
              o("label", ir, [
                ge(o("input", {
                  "onUpdate:modelValue": R[2] || (R[2] = (H) => f.value = H),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [lt, f.value]
                ]),
                o("span", lr, y(a(i)("Create a copy instead of moving")), 1)
              ])
            ])) : N("", !0),
            F.value ? (c(), Q(Yt, {
              key: 1,
              error: ""
            }, {
              default: re(() => [
                be(y(F.value), 1)
              ]),
              _: 1
            })) : N("", !0),
            u.value.length && !F.value ? (c(), Q(Yt, {
              key: 2,
              error: "",
              onHidden: R[3] || (R[3] = (H) => u.value = "")
            }, {
              default: re(() => [
                be(y(u.value), 1)
              ]),
              _: 1
            })) : N("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), it = /* @__PURE__ */ ce({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (c(), Q(to, { copy: !1 }));
  }
}), ln = /* @__PURE__ */ ce({
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
  const s = D(n);
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
}, gr = /* @__PURE__ */ ce({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const s = t, i = de(), { t: r } = i.i18n, l = D(null), d = (f) => {
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
      G(a(rn), { class: "vuefinder__search-modal__search-icon" }),
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
        G(a(Lt), { class: "vuefinder__search-modal__loading-icon" })
      ])) : N("", !0)
    ]));
  }
}), wr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function yr(n, e) {
  return c(), _("svg", wr, [...e[0] || (e[0] = [
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
const oo = { render: yr }, br = ["disabled", "title"], kr = ["data-theme"], $r = { class: "vuefinder__search-modal__dropdown-content" }, xr = { class: "vuefinder__search-modal__dropdown-section" }, Sr = { class: "vuefinder__search-modal__dropdown-title" }, Cr = { class: "vuefinder__search-modal__dropdown-options" }, Fr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Er = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Pr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Tr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Dr = { class: "vuefinder__search-modal__dropdown-section" }, Mr = { class: "vuefinder__search-modal__dropdown-title" }, Ir = { class: "vuefinder__search-modal__dropdown-options" }, Ar = ["onClick"], Or = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Lr = /* @__PURE__ */ ce({
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
    const s = n, i = t, r = de(), { t: l } = r.i18n, d = D(null), u = D(null);
    let f = null;
    const h = [
      { value: "name-asc", key: "Name (A-Z)" },
      { value: "name-desc", key: "Name (Z-A)" },
      { value: "size-asc", key: "Size (smallest)" },
      { value: "size-desc", key: "Size (largest)" },
      { value: "date-desc", key: "Date (newest)" },
      { value: "date-asc", key: "Date (oldest)" }
    ], p = (w) => {
      if (i("update:selectedOption", w), w.startsWith("size-")) {
        const g = w.split("-")[1];
        i("update:sizeFilter", g);
      }
    }, v = (w) => {
      i("update:sortBy", w);
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
          const { x: w, y: g } = await at(d.value, u.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [pt(8), mt({ padding: 16 }), ht({ padding: 16 })]
          });
          Object.assign(u.value.style, {
            left: `${w}px`,
            top: `${g}px`
          }), requestAnimationFrame(() => {
            u.value && Object.assign(u.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (w) {
          console.warn("Floating UI initial positioning error:", w);
          return;
        }
        try {
          f = Xt(d.value, u.value, async () => {
            if (!(!d.value || !u.value))
              try {
                const { x: w, y: g } = await at(
                  d.value,
                  u.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [pt(8), mt({ padding: 16 }), ht({ padding: 16 })]
                  }
                );
                Object.assign(u.value.style, {
                  left: `${w}px`,
                  top: `${g}px`
                });
              } catch (w) {
                console.warn("Floating UI positioning error:", w);
              }
          });
        } catch (w) {
          console.warn("Floating UI autoUpdate setup error:", w), f = null;
        }
      }
    }, $ = (w) => {
      if (!s.visible) return;
      const g = ["size-all", "size-small", "size-medium", "size-large"], F = g.findIndex((C) => C === s.selectedOption);
      if (w.key === "ArrowDown") {
        w.preventDefault();
        const C = (F + 1) % g.length;
        i("update:selectedOption", g[C] || null);
      } else if (w.key === "ArrowUp") {
        w.preventDefault();
        const C = F <= 0 ? g.length - 1 : F - 1;
        i("update:selectedOption", g[C] || null);
      } else w.key === "Enter" ? (w.preventDefault(), s.selectedOption?.startsWith("size-") && i(
        "update:sizeFilter",
        s.selectedOption.split("-")[1]
      )) : w.key === "Escape" && (w.preventDefault(), i("update:visible", !1), f && (f(), f = null));
    }, m = () => {
      f && (f(), f = null);
    };
    return me(
      () => s.visible,
      (w) => {
        !w && f && (f(), f = null);
      }
    ), Ae(() => {
      m();
    }), e({
      cleanup: m
    }), (w, g) => (c(), _(fe, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: d,
        class: ae(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: a(l)("Search Options"),
        onClick: pe(k, ["stop"])
      }, [
        G(a(oo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, br),
      (c(), Q(kt, { to: "body" }, [
        n.visible ? (c(), _("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: u,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(r).theme.current,
          tabindex: "-1",
          onClick: g[4] || (g[4] = pe(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          o("div", $r, [
            o("div", xr, [
              o("div", Sr, y(a(l)("File Size")), 1),
              o("div", Cr, [
                o("div", {
                  class: ae(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: g[0] || (g[0] = pe((F) => p("size-all"), ["stop"]))
                }, [
                  o("span", null, y(a(l)("All Files")), 1),
                  n.sizeFilter === "all" ? (c(), _("div", Fr, [...g[5] || (g[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : N("", !0)
                ], 2),
                o("div", {
                  class: ae(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: g[1] || (g[1] = pe((F) => p("size-small"), ["stop"]))
                }, [
                  o("span", null, y(a(l)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (c(), _("div", Er, [...g[6] || (g[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : N("", !0)
                ], 2),
                o("div", {
                  class: ae(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: g[2] || (g[2] = pe((F) => p("size-medium"), ["stop"]))
                }, [
                  o("span", null, y(a(l)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (c(), _("div", Pr, [...g[7] || (g[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : N("", !0)
                ], 2),
                o("div", {
                  class: ae(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: g[3] || (g[3] = pe((F) => p("size-large"), ["stop"]))
                }, [
                  o("span", null, y(a(l)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (c(), _("div", Tr, [...g[8] || (g[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : N("", !0)
                ], 2)
              ])
            ]),
            o("div", Dr, [
              o("div", Mr, y(a(l)("Sort by")), 1),
              o("div", Ir, [
                (c(), _(fe, null, he(h, (F) => o("div", {
                  key: F.value,
                  class: ae(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sortBy === F.value
                  }]),
                  onClick: pe((C) => v(F.value), ["stop"])
                }, [
                  o("span", null, y(a(l)(F.key)), 1),
                  n.sortBy === F.value ? (c(), _("div", Or, [...g[9] || (g[9] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : N("", !0)
                ], 10, Ar)), 64))
              ])
            ])
          ])
        ], 40, kr)) : N("", !0)
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
async function yt(n) {
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
}, Kr = ["title"], qr = ["title"], Wr = ["data-item-dropdown", "data-theme"], Gr = { class: "vuefinder__search-modal__item-dropdown-content" }, Yr = /* @__PURE__ */ ce({
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
    const t = n, s = e, i = de(), { t: r } = i.i18n, { enabled: l } = Ne(), d = se(i.config.state), u = O(() => l("pinned")), f = O(
      () => d.value.pinnedFolders.some((E) => E.path === t.item.path)
    ), h = (E) => {
      const T = i.config.get("pinnedFolders");
      T.some((z) => z.path === E.path) ? i.config.set(
        "pinnedFolders",
        T.filter((z) => z.path !== E.path)
      ) : i.config.set("pinnedFolders", [...T, E]);
    }, p = D(null);
    let v = null, k = null, b = [], $ = null;
    me(
      () => t.activeDropdown,
      (E) => {
        v && (v(), v = null), k && (b.forEach((T) => {
          T === window ? window.removeEventListener("scroll", k, !0) : T.removeEventListener("scroll", k, !0);
        }), k = null, b = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null), E === t.item.path && p.value && Oe(() => {
          S(t.item.path, p.value), w(), g();
        });
      }
    );
    const m = (E) => {
      const T = [];
      let z = E;
      for (; z && z !== document.body && z !== document.documentElement; ) {
        const X = window.getComputedStyle(z), ve = X.overflow + X.overflowX + X.overflowY;
        (ve.includes("scroll") || ve.includes("auto")) && T.push(z), z = z.parentElement;
      }
      return T;
    }, w = () => {
      if (t.activeDropdown !== t.item.path) return;
      const E = m(p.value);
      b = [window, ...E], k = () => {
        t.activeDropdown === t.item.path && s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const T = k;
      T && b.forEach((z) => {
        z === window ? window.addEventListener("scroll", T, !0) : z.addEventListener("scroll", T, !0);
      });
    }, g = () => {
      t.activeDropdown === t.item.path && ($ = (E) => {
        if (t.activeDropdown !== t.item.path) return;
        const T = E.target;
        if (!T) return;
        const z = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (z && z.contains(T) || p.value && p.value.contains(T))
          return;
        const X = i.root;
        if (X && X.contains(T)) {
          s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const ve = document.querySelector(".vuefinder__modal-layout");
        if (ve && ve.contains(T)) {
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
    const F = (E) => t.expandedPaths.has(E), C = (E) => E.type === "dir" || !E.file_size ? "" : Jt(E.file_size), L = (E, T) => {
      T.stopPropagation(), s("toggleItemDropdown", E, T);
    }, S = async (E, T) => {
      const z = document.querySelector(
        `[data-item-dropdown="${E}"]`
      );
      if (!(!z || !T) && (await Oe(), !(!z || !T))) {
        Object.assign(z.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: X, y: ve } = await at(T, z, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [pt(8), mt({ padding: 16 }), ht({ padding: 16 })]
          });
          Object.assign(z.style, {
            left: `${X}px`,
            top: `${ve}px`
          }), requestAnimationFrame(() => {
            z && Object.assign(z.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (X) {
          console.warn("Floating UI initial positioning error:", X);
          return;
        }
        try {
          v = Xt(T, z, async () => {
            if (!(!T || !z))
              try {
                const { x: X, y: ve } = await at(T, z, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [pt(8), mt({ padding: 16 }), ht({ padding: 16 })]
                });
                Object.assign(z.style, {
                  left: `${X}px`,
                  top: `${ve}px`
                });
              } catch (X) {
                console.warn("Floating UI positioning error:", X);
              }
          });
        } catch (X) {
          console.warn("Floating UI autoUpdate setup error:", X), v = null;
        }
      }
    }, R = (E) => {
      s("update:selectedItemDropdownOption", E);
    }, H = async (E) => {
      await yt(E.path), s("copyPath", E);
    }, oe = (E) => {
      s("openContainingFolder", E);
    }, ne = (E) => {
      s("preview", E);
    }, J = (E) => {
      s("open", E);
    }, W = (E) => {
      if (!t.activeDropdown) return;
      const T = ["copy-path", "open-folder", "preview"], z = t.selectedItemDropdownOption, X = T.findIndex((ve) => z?.includes(ve));
      if (E.key === "ArrowDown") {
        E.preventDefault();
        const ve = (X + 1) % T.length;
        s(
          "update:selectedItemDropdownOption",
          `${T[ve] || ""}-${t.activeDropdown}`
        );
      } else if (E.key === "ArrowUp") {
        E.preventDefault();
        const ve = X <= 0 ? T.length - 1 : X - 1;
        s(
          "update:selectedItemDropdownOption",
          `${T[ve] || ""}-${t.activeDropdown}`
        );
      } else E.key === "Enter" ? (E.preventDefault(), z && (z.includes("copy-path") ? H(t.item) : z.includes("open-folder") ? oe(t.item) : z.includes("preview") && ne(t.item))) : E.key === "Escape" && (E.preventDefault(), s("update:selectedItemDropdownOption", null));
    };
    return (E, T) => (c(), _("div", {
      class: ae(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: T[13] || (T[13] = (z) => s("select", n.index)),
      onDblclick: T[14] || (T[14] = pe((z) => s("activate", n.item), ["stop"]))
    }, [
      o("div", Ur, [
        n.item.type === "dir" ? (c(), Q(a(ze), { key: 0 })) : (c(), Q(a(gt), { key: 1 }))
      ]),
      o("div", Nr, [
        o("div", Hr, [
          n.item.type === "dir" && u.value && f.value ? (c(), Q(a(wt), {
            key: 0,
            class: "vuefinder__search-modal__result-pin",
            title: a(r)("Pinned")
          }, null, 8, ["title"])) : N("", !0),
          be(" " + y(n.item.basename) + " ", 1),
          C(n.item) ? (c(), _("span", jr, y(C(n.item)), 1)) : N("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: T[0] || (T[0] = pe((z) => {
            s("select", n.index), s("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, y(F(n.item.path) ? n.item.path : a(Rt)(n.item.path)), 9, Kr)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: p,
        class: "vuefinder__search-modal__result-actions",
        title: a(r)("More actions"),
        onClick: T[1] || (T[1] = (z) => {
          s("selectWithDropdown", n.index), L(n.item.path, z);
        })
      }, [
        G(a(ao), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, qr),
      (c(), Q(kt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (c(), _("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(i).theme.current,
          tabindex: "-1",
          onClick: T[12] || (T[12] = pe(() => {
          }, ["stop"])),
          onKeydown: W
        }, [
          o("div", Gr, [
            o("div", {
              class: ae(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: T[2] || (T[2] = (z) => {
                R(`copy-path-${n.item.path}`), H(n.item);
              }),
              onFocus: T[3] || (T[3] = (z) => R(`copy-path-${n.item.path}`))
            }, [
              G(a(sn), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(a(r)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: ae(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: T[4] || (T[4] = (z) => {
                R(`open-folder-${n.item.path}`), oe(n.item);
              }),
              onFocus: T[5] || (T[5] = (z) => R(`open-folder-${n.item.path}`))
            }, [
              G(a(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(a(r)("Open Containing Folder")), 1)
            ], 34),
            n.item.type === "dir" ? (c(), _("div", {
              key: 0,
              class: ae(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-${n.item.path}`
              }]),
              onClick: T[6] || (T[6] = (z) => {
                R(`open-${n.item.path}`), J(n.item);
              }),
              onFocus: T[7] || (T[7] = (z) => R(`open-${n.item.path}`))
            }, [
              G(a(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(a(r)("Open")), 1)
            ], 34)) : N("", !0),
            n.item.type === "dir" && u.value ? (c(), _("div", {
              key: 1,
              class: ae(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `pin-${n.item.path}`
              }]),
              onClick: T[8] || (T[8] = (z) => {
                R(`pin-${n.item.path}`), h(n.item);
              }),
              onFocus: T[9] || (T[9] = (z) => R(`pin-${n.item.path}`))
            }, [
              G(a(wt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(f.value ? a(r)("Unpin Folder") : a(r)("Pin Folder")), 1)
            ], 34)) : (c(), _("div", {
              key: 2,
              class: ae(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: T[10] || (T[10] = (z) => {
                R(`preview-${n.item.path}`), ne(n.item);
              }),
              onFocus: T[11] || (T[11] = (z) => R(`preview-${n.item.path}`))
            }, [
              G(a(gt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(a(r)("Preview")), 1)
            ], 34))
          ])
        ], 40, Wr)) : N("", !0)
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
}, ed = { class: "vuefinder__search-modal__results-header" }, tt = 60, En = 5, td = /* @__PURE__ */ ce({
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
    const s = n, i = t, r = de(), { t: l } = r.i18n, d = st("scrollableContainer"), u = O(() => s.searchResults.length > 0), f = O(() => s.searchResults.length), h = D(0), p = D(600), v = O(() => s.searchResults.length * tt), k = O(() => {
      const F = Math.max(0, Math.floor(h.value / tt) - En), C = Math.min(
        s.searchResults.length,
        Math.ceil((h.value + p.value) / tt) + En
      );
      return { start: F, end: C };
    }), b = O(() => {
      const { start: F, end: C } = k.value;
      return s.searchResults.slice(F, C).map((L, S) => ({
        item: L,
        index: F + S,
        top: (F + S) * tt
      }));
    }), $ = (F) => {
      const C = F.target;
      h.value = C.scrollTop;
    }, m = () => {
      d.value && (p.value = d.value.clientHeight);
    }, w = () => {
      if (s.selectedIndex >= 0 && d.value) {
        const F = s.selectedIndex * tt, C = F + tt, L = d.value.scrollTop, S = d.value.clientHeight, R = L + S;
        let H = L;
        F < L ? H = F : C > R && (H = C - S), H !== L && d.value.scrollTo({
          top: H,
          behavior: "smooth"
        });
      }
    }, g = () => {
      d.value && (d.value.scrollTop = 0, h.value = 0);
    };
    return ke(() => {
      m(), window.addEventListener("resize", m);
    }), Ae(() => {
      window.removeEventListener("resize", m);
    }), me(
      () => d.value,
      () => {
        m();
      }
    ), e({
      scrollSelectedIntoView: w,
      resetScroll: g,
      getContainerHeight: () => p.value,
      scrollTop: () => h.value
    }), (F, C) => (c(), _("div", {
      class: ae(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (c(), _("div", Xr, [
        o("div", Qr, [
          G(a(Lt), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, y(a(l)("Searching...")), 1)
      ])) : u.value ? (c(), _("div", Zr, [
        o("div", ed, [
          o("span", null, y(a(l)("Found %s results", f.value)), 1)
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
            (c(!0), _(fe, null, he(b.value, (L) => (c(), _("div", {
              key: L.item.path,
              style: Ie({
                position: "absolute",
                top: `${L.top}px`,
                left: "0",
                width: "100%",
                height: `${tt}px`
              })
            }, [
              G(Yr, {
                item: L.item,
                index: L.index,
                "selected-index": n.selectedIndex,
                "expanded-paths": n.expandedPaths,
                "active-dropdown": n.activeDropdown,
                "selected-item-dropdown-option": n.selectedItemDropdownOption,
                onSelect: C[0] || (C[0] = (S) => i("selectResultItem", S)),
                onSelectWithDropdown: C[1] || (C[1] = (S) => i("selectResultItemWithDropdown", S)),
                onTogglePathExpansion: C[2] || (C[2] = (S) => i("togglePathExpansion", S)),
                onToggleItemDropdown: C[3] || (C[3] = (S, R) => i("toggleItemDropdown", S, R)),
                "onUpdate:selectedItemDropdownOption": C[4] || (C[4] = (S) => i("update:selectedItemDropdownOption", S)),
                onCopyPath: C[5] || (C[5] = (S) => i("copyPath", S)),
                onOpenContainingFolder: C[6] || (C[6] = (S) => i("openContainingFolder", S)),
                onOpen: C[7] || (C[7] = (S) => i("open", S)),
                onPreview: C[8] || (C[8] = (S) => i("preview", S)),
                onActivate: C[9] || (C[9] = (S) => i("activate", S))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (c(), _("div", Jr, [
        o("span", null, y(a(l)("No results found")), 1)
      ]))
    ], 2));
  }
}), nd = { class: "vuefinder__search-modal" }, od = { class: "vuefinder__search-modal__content" }, sd = { class: "vuefinder__search-modal__search-bar" }, ad = { class: "vuefinder__search-modal__search-location" }, id = ["title"], ld = ["disabled"], rd = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, dd = { class: "vuefinder__search-modal__folder-selector-content" }, cd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ud = { class: "vuefinder__search-modal__instructions-text" }, dn = /* @__PURE__ */ ce({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = de(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = D(null), l = D(null), d = D(null), u = no("", 300), f = D([]), h = D(!1), p = D(-1);
    let v = null;
    const k = D(!1), b = D(!1), $ = D(null), m = D("all"), w = D(!1), g = D("name-asc"), F = {
      "name-asc": { column: "basename", direction: 1 },
      "name-desc": { column: "basename", direction: -1 },
      "size-asc": { column: "file_size", direction: 1 },
      "size-desc": { column: "file_size", direction: -1 },
      "date-asc": { column: "last_modified", direction: 1 },
      "date-desc": { column: "last_modified", direction: -1 }
    }, C = O(() => {
      const { column: U, direction: Y } = F[g.value];
      return f.value.slice().sort((Z, K) => qn(Z[U], K[U]) * Y);
    }), L = D(`size-${m.value}`), S = D(null), R = D(/* @__PURE__ */ new Set()), H = D(null), oe = se(i.path), ne = (U) => {
      R.value.has(U) ? R.value.delete(U) : R.value.add(U);
    }, J = (U, Y) => {
      Y && typeof Y.stopPropagation == "function" && Y.stopPropagation(), H.value === U ? H.value = null : H.value = U;
    }, W = () => {
      H.value = null;
    }, E = (U) => {
      try {
        const Y = U.dir || `${U.storage}://`;
        e.adapter.open(Y), e.modal.close(), W();
      } catch {
        t.error(s("Failed to open containing folder"));
      }
    }, T = (U) => {
      e.modal.open(Qe, {
        storage: oe?.value?.storage ?? "local",
        item: U
      }), W();
    }, z = (U) => {
      e.adapter.open(U.path), e.modal.close(), W();
    }, X = (U) => {
      U.type === "dir" ? z(U) : T(U);
    }, ve = (U) => {
      p.value = U, W();
    }, B = (U) => {
      p.value = U;
    }, A = async (U) => {
      await yt(U.path), W();
    };
    me(u, async (U) => {
      U.trim() ? (await x(U.trim()), p.value = 0) : (v && (v.abort(), v = null), f.value = [], h.value = !1, p.value = -1);
    }), me(m, async (U) => {
      L.value = `size-${U}`, u.value.trim() && !b.value && (await x(u.value.trim()), p.value = 0);
    }), me(w, async () => {
      u.value.trim() && !b.value && (await x(u.value.trim()), p.value = 0);
    });
    const q = (U) => {
      if (!U || typeof U != "object") return !1;
      const Y = U.name;
      return Y === "AbortError" || Y === "CanceledError";
    }, x = async (U) => {
      if (!U) return;
      v && v.abort();
      const Y = new AbortController();
      v = Y, h.value = !0;
      try {
        const Z = $.value?.path || oe?.value?.path, K = await e.adapter.search({
          path: Z,
          filter: U,
          deep: w.value,
          size: m.value,
          signal: Y.signal
        });
        if (Y.signal.aborted) return;
        f.value = K || [], h.value = !1;
      } catch (Z) {
        if (q(Z) || Y.signal.aborted) return;
        t.error(Te(Z, s("Search failed"))), f.value = [], h.value = !1;
      }
    };
    ke(() => {
      document.addEventListener("click", j), L.value = `size-${m.value}`;
    });
    const V = () => {
      b.value ? (b.value = !1, u.value.trim() && (x(u.value.trim()), p.value = 0)) : (k.value = !1, b.value = !0);
    }, I = (U) => {
      U && ($.value = U);
    }, P = (U) => {
      U && (I(U), b.value = !1, u.value.trim() && (x(u.value.trim()), p.value = 0));
    };
    Ae(() => {
      document.removeEventListener("click", j), v && (v.abort(), v = null), l.value && l.value.cleanup();
    });
    const j = (U) => {
      const Y = U.target;
      if (k.value && (Y.closest(".vuefinder__search-modal__dropdown") || (k.value = !1, Oe(() => {
        r.value && r.value.focus();
      }))), H.value) {
        const Z = Y.closest(".vuefinder__search-modal__item-dropdown"), K = Y.closest(".vuefinder__search-modal__result-item");
        !Z && !K && W();
      }
    };
    return (U, Y) => (c(), Q(Ue, { class: "vuefinder__search-modal-layout" }, {
      default: re(() => [
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
                modelValue: a(u),
                "onUpdate:modelValue": Y[0] || (Y[0] = (Z) => zn(u) ? u.value = Z : null),
                "is-searching": h.value,
                disabled: b.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              G(Lr, {
                ref_key: "searchOptionsDropdownRef",
                ref: l,
                visible: k.value,
                "onUpdate:visible": Y[1] || (Y[1] = (Z) => k.value = Z),
                "size-filter": m.value,
                "onUpdate:sizeFilter": Y[2] || (Y[2] = (Z) => m.value = Z),
                "selected-option": L.value,
                "onUpdate:selectedOption": Y[3] || (Y[3] = (Z) => L.value = Z),
                "sort-by": g.value,
                "onUpdate:sortBy": Y[4] || (Y[4] = (Z) => g.value = Z),
                disabled: b.value
              }, null, 8, ["visible", "size-filter", "selected-option", "sort-by", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: Y[8] || (Y[8] = pe(() => {
              }, ["stop"]))
            }, [
              o("div", ad, [
                o("button", {
                  class: ae(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": b.value }]),
                  onClick: pe(V, ["stop"])
                }, [
                  G(a(ze), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: $.value?.path || a(oe).path
                  }, y(a(Rt)($.value?.path || a(oe).path)), 9, id),
                  Y[11] || (Y[11] = o("svg", {
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
                onClick: Y[7] || (Y[7] = pe(() => {
                }, ["stop"]))
              }, [
                ge(o("input", {
                  "onUpdate:modelValue": Y[5] || (Y[5] = (Z) => w.value = Z),
                  type: "checkbox",
                  disabled: b.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: Y[6] || (Y[6] = pe(() => {
                  }, ["stop"]))
                }, null, 8, ld), [
                  [lt, w.value]
                ]),
                o("span", null, y(a(s)("Include subfolders")), 1)
              ])
            ]),
            b.value ? (c(), _("div", rd, [
              o("div", dd, [
                G($t, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [
                    Y[9] || (Y[9] = (Z) => $.value = Z),
                    I
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(oe),
                  onSelectAndClose: P
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : N("", !0),
            !a(u).trim() && !b.value ? (c(), _("div", cd, [
              o("p", ud, y(a(s)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : N("", !0),
            a(u).trim() && !b.value ? (c(), Q(td, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": C.value,
              "is-searching": h.value,
              "selected-index": p.value,
              "expanded-paths": R.value,
              "active-dropdown": H.value,
              "selected-item-dropdown-option": S.value,
              "results-enter": !0,
              onSelectResultItem: ve,
              onSelectResultItemWithDropdown: B,
              onTogglePathExpansion: ne,
              onToggleItemDropdown: J,
              "onUpdate:selectedItemDropdownOption": Y[10] || (Y[10] = (Z) => S.value = Z),
              onCopyPath: A,
              onOpenContainingFolder: E,
              onOpen: z,
              onPreview: T,
              onActivate: X
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : N("", !0)
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
    const s = de(), i = D(!1), { t: r } = s.i18n;
    let l = null;
    const d = () => {
      l && clearTimeout(l), i.value = !0, l = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return ke(() => {
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
    class: ae(["vuefinder__action-message", { "vuefinder__action-message--hidden": !s.shown }])
  }, [
    n.$slots.default ? we(n.$slots, "default", { key: 0 }) : (c(), _("span", _d, y(s.t("Saved.")), 1))
  ], 2);
}
const Pn = /* @__PURE__ */ fd(vd, [["render", pd]]), md = [
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
], hd = { class: "vuefinder__settings-modal__content" }, gd = { class: "vuefinder__settings-modal__main" }, wd = { class: "vuefinder__settings-modal__sections" }, yd = {
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
}, Fd = { class: "vuefinder__settings-modal__input-group" }, Ed = ["value"], Pd = { class: "vuefinder__settings-modal__reset-section" }, Td = { class: "vuefinder__settings-modal__reset-content" }, Dd = { class: "vuefinder__settings-modal__reset-title" }, Md = { class: "vuefinder__settings-modal__reset-description" }, io = /* @__PURE__ */ ce({
  __name: "ModalSettings",
  setup(n) {
    const e = de(), { enabled: t } = Ne(), s = e.config, { clearStore: i } = e.storage, { t: r, localeAtom: l } = e.i18n, d = se(l), u = O({
      get: () => String(d.value || "en"),
      set: (m) => l.set(m || "en")
    }), f = se(s.state), h = O(() => f.value.theme || "silver"), p = async () => {
      s.reset(), i(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, v = (m) => {
      s.set("theme", m), e.emitter.emit("vf-theme-saved");
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
      }).filter(([m]) => Object.keys(k).includes(m))
    );
    return (m, w) => (c(), Q(Ue, null, {
      buttons: re(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: w[2] || (w[2] = (g) => a(e).modal.close())
        }, y(a(r)("Close")), 1)
      ]),
      default: re(() => [
        o("div", hd, [
          G(je, {
            icon: a(oo),
            title: a(r)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", gd, [
            o("div", wd, [
              a(t)("theme") ? (c(), _("div", yd, [
                o("label", bd, [
                  be(y(a(r)("Theme")) + " ", 1),
                  G(Pn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: re(() => [
                      be(y(a(r)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", kd, [
                  o("select", {
                    id: "theme",
                    value: h.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: w[0] || (w[0] = (g) => v(g.target?.value))
                  }, [
                    (c(!0), _(fe, null, he(a(md), (g) => (c(), _("option", {
                      key: g.name,
                      value: g.name
                    }, y(g.displayName), 9, xd))), 128))
                  ], 40, $d)
                ])
              ])) : N("", !0),
              Object.keys(a($)).length > 1 ? (c(), _("div", Sd, [
                o("label", Cd, [
                  be(y(a(r)("Language")) + " ", 1),
                  G(Pn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: re(() => [
                      be(y(a(r)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", Fd, [
                  ge(o("select", {
                    id: "language",
                    "onUpdate:modelValue": w[1] || (w[1] = (g) => u.value = g),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (c(!0), _(fe, null, he(a($), (g, F) => (c(), _("option", {
                      key: F,
                      value: F
                    }, y(g), 9, Ed))), 128))
                  ], 512), [
                    [qt, u.value]
                  ])
                ])
              ])) : N("", !0)
            ]),
            o("div", Pd, [
              o("div", Td, [
                o("div", Dd, y(a(r)("Reset")), 1),
                o("div", Md, y(a(r)("Reset all settings to default")), 1)
              ]),
              o("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: p
              }, y(a(r)("Reset Settings")), 1)
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
  const n = de(), e = Ve(n), t = n.fs, s = n.config, { enabled: i } = Ne(), r = se(t.path), l = se(t.selectedItems), d = (u) => {
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
  ke(async () => {
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
  const n = D(!1), e = D([]);
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
              const $ = k?.fullPath || b.name, m = $.startsWith("/") ? $.slice(1) : $;
              e.value.push({
                name: b.name,
                relativePath: m,
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
const lo = { render: Ld }, Rd = { class: "vuefinder__new-folder-modal__content" }, Bd = { class: "vuefinder__new-folder-modal__form" }, zd = { class: "vuefinder__new-folder-modal__description" }, Vd = ["placeholder"], cn = /* @__PURE__ */ ce({
  __name: "ModalNewFolder",
  setup(n) {
    const e = de(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = se(i.path), l = D(""), d = () => {
      l.value !== "" && e.adapter.createFolder({
        path: r.value.path,
        name: l.value
      }).then((u) => {
        t.success(s("%s is created.", l.value)), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        t.error(Te(u, s("Failed to create folder")));
      });
    };
    return (u, f) => (c(), Q(Ue, null, {
      buttons: re(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(a(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (h) => a(e).modal.close())
        }, y(a(s)("Cancel")), 1)
      ]),
      default: re(() => [
        o("div", null, [
          G(je, {
            icon: a(lo),
            title: a(s)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Rd, [
            o("div", Bd, [
              o("p", zd, y(a(s)("Create a new folder")), 1),
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
const ro = { render: Nd }, Hd = { class: "vuefinder__new-file-modal__content" }, jd = { class: "vuefinder__new-file-modal__form" }, Kd = { class: "vuefinder__new-file-modal__description" }, qd = ["placeholder"], co = /* @__PURE__ */ ce({
  __name: "ModalNewFile",
  setup(n) {
    const e = de(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = se(i.path), l = D(""), d = () => {
      l.value !== "" && e.adapter.createFile({
        path: r.value.path,
        name: l.value
      }).then((u) => {
        t.success(s("%s is created.", l.value)), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        t.error(Te(u, s("Failed to create file")));
      });
    };
    return (u, f) => (c(), Q(Ue, null, {
      buttons: re(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: d
        }, y(a(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (h) => a(e).modal.close())
        }, y(a(s)("Cancel")), 1)
      ]),
      default: re(() => [
        o("div", null, [
          G(je, {
            icon: a(ro),
            title: a(s)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", Hd, [
            o("div", jd, [
              o("p", Kd, y(a(s)("Create a new file")), 1),
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
}, ac = { class: "vuefinder__upload-modal__bulk-summary" }, ic = { class: "vuefinder__upload-modal__bulk-summary text-red-600" }, lc = { class: "vuefinder__upload-modal__file-info" }, rc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, dc = { class: "vuefinder__upload-modal__file-name md:hidden" }, cc = { class: "vuefinder__upload-modal__file-status text-red-600" }, uc = {
  key: 1,
  class: "vuefinder__upload-modal__file-list vf-scrollbar"
}, vc = ["textContent"], fc = { class: "vuefinder__upload-modal__file-info" }, _c = {
  key: 0,
  class: "vuefinder__upload-modal__file-rename"
}, pc = ["placeholder", "onKeyup"], mc = ["title", "onClick"], hc = ["title"], gc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, wc = { class: "vuefinder__upload-modal__file-name md:hidden" }, yc = {
  key: 0,
  class: "ml-auto"
}, bc = ["title", "disabled", "onClick"], kc = ["title", "disabled", "onClick"], $c = {
  key: 0,
  class: "py-2"
}, xc = ["aria-expanded"], Sc = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, Cc = ["disabled"], Fc = ["aria-expanded"], Ec = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Pc = 20, un = /* @__PURE__ */ ce({
  __name: "ModalUpload",
  setup(n) {
    const e = de(), { t } = e.i18n, s = e.fs, i = se(s.path), r = D(i.value), l = D(!1), d = () => {
      const Z = r.value.path;
      if (!Z) return { storage: "local", path: "" };
      if (Z.endsWith("://"))
        return { storage: Z.replace("://", ""), path: "" };
      const K = Z.split("://");
      return {
        storage: K[0] || "local",
        path: K[1] || ""
      };
    }, u = (Z) => {
      Z && (r.value = Z);
    }, f = (Z) => {
      Z && (r.value = Z, l.value = !1);
    }, {
      container: h,
      internalFileInput: p,
      internalFolderInput: v,
      pickFiles: k,
      queue: b,
      message: $,
      uploading: m,
      hasFilesInDropArea: w,
      definitions: g,
      openFileSelector: F,
      upload: C,
      cancel: L,
      remove: S,
      clear: R,
      close: H,
      getClassNameForEntry: oe,
      getIconForEntry: ne,
      addExternalFiles: J,
      renameEntry: W
    } = Jn(e.customUploader), E = D(null), T = D(""), z = D(null), X = (Z) => {
      const K = Z.lastIndexOf("/");
      return K === -1 ? Z : Z.slice(K + 1);
    }, ve = (Z) => {
      m.value || Z.status !== g.value.QUEUE_ENTRY_STATUS.UPLOADING && Z.status !== g.value.QUEUE_ENTRY_STATUS.REJECTED && (E.value = Z.id, T.value = X(Z.name), Oe(() => {
        const K = z.value;
        if (K) {
          K.focus();
          const M = T.value.lastIndexOf(".");
          M > 0 ? K.setSelectionRange(0, M) : K.select();
        }
      }));
    }, B = () => {
      E.value = null, T.value = "";
    }, A = async (Z) => {
      const K = T.value.trim();
      if (!K || K === X(Z.name)) {
        B();
        return;
      }
      await W(Z, K), B();
    }, q = () => {
      C(r.value), e.config.get("closeUploadModalOnSubmit") && H();
    };
    ke(() => {
      e.emitter.on("vf-external-files-dropped", (Z) => {
        J(Z);
      });
    }), Ae(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const x = O(() => b.value.length > Pc), V = O(
      () => b.value.filter((Z) => Z.status === g.value.QUEUE_ENTRY_STATUS.REJECTED)
    ), I = O(() => b.value.length - V.value.length), P = D(!1), j = D(null), U = D(null), Y = (Z) => {
      if (!P.value) return;
      const K = Z.target, M = j.value?.contains(K) ?? !1, ee = U.value?.contains(K) ?? !1;
      !M && !ee && (P.value = !1);
    };
    return ke(() => document.addEventListener("click", Y)), Ae(() => document.removeEventListener("click", Y)), (Z, K) => (c(), Q(Ue, {
      "show-drag-overlay": a(w),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: re(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: j,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: ae([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              P.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: K[4] || (K[4] = (M) => a(F)())
            }, y(a(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": P.value ? "true" : "false",
              onClick: K[5] || (K[5] = pe((M) => P.value = !P.value, ["stop"]))
            }, [...K[22] || (K[22] = [
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
            ])], 8, xc)
          ], 2),
          P.value ? (c(), _("div", Sc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: K[6] || (K[6] = (M) => {
                a(F)(), P.value = !1;
              })
            }, y(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: K[7] || (K[7] = (M) => {
                a(v)?.click(), P.value = !1;
              })
            }, y(a(t)("Select Folders")), 1),
            K[23] || (K[23] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: ae(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: K[8] || (K[8] = (M) => a(m) ? null : (a(R)(!1), P.value = !1))
            }, y(a(t)("Clear all")), 3),
            o("div", {
              class: ae(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: K[9] || (K[9] = (M) => a(m) ? null : (a(R)(!0), P.value = !1))
            }, y(a(t)("Clear only successful")), 3)
          ])) : N("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(m) || !a(b).length,
          onClick: pe(q, ["prevent"])
        }, y(a(t)("Upload")), 9, Cc),
        a(m) ? (c(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: K[10] || (K[10] = pe(
            //@ts-ignore
            (...M) => a(L) && a(L)(...M),
            ["prevent"]
          ))
        }, y(a(t)("Cancel")), 1)) : (c(), _("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: K[11] || (K[11] = pe(
            //@ts-ignore
            (...M) => a(H) && a(H)(...M),
            ["prevent"]
          ))
        }, y(a(t)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: U,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: ae(["vuefinder__upload-actions", P.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              ref_key: "pickFiles",
              ref: k,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(a(t)("Select Files")), 513),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": P.value ? "true" : "false",
              onClick: K[12] || (K[12] = pe((M) => P.value = !P.value, ["stop"]))
            }, [...K[24] || (K[24] = [
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
            ])], 8, Fc)
          ], 2),
          P.value ? (c(), _("div", Ec, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: K[13] || (K[13] = (M) => {
                a(F)(), P.value = !1;
              })
            }, y(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: K[14] || (K[14] = (M) => {
                a(v)?.click(), P.value = !1;
              })
            }, y(a(t)("Select Folders")), 1),
            K[25] || (K[25] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: ae(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: K[15] || (K[15] = (M) => a(m) ? null : (a(R)(!1), P.value = !1))
            }, y(a(t)("Clear all")), 3),
            o("div", {
              class: ae(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: K[16] || (K[16] = (M) => a(m) ? null : (a(R)(!0), P.value = !1))
            }, y(a(t)("Clear only successful")), 3)
          ])) : N("", !0)
        ], 512)
      ]),
      default: re(() => [
        o("div", null, [
          G(je, {
            icon: a(uo),
            title: a(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", Yd, [
            o("div", Xd, [
              o("div", Qd, y(a(t)("Target Directory")), 1),
              o("div", Jd, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: K[0] || (K[0] = (M) => l.value = !l.value)
                }, [
                  o("div", Zd, [
                    o("span", ec, y(d().storage) + "://", 1),
                    d().path ? (c(), _("span", tc, y(d().path), 1)) : N("", !0)
                  ]),
                  o("span", nc, y(a(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: ae([
                  "vuefinder__upload-modal__tree-selector",
                  l.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                G($t, {
                  modelValue: r.value,
                  "onUpdate:modelValue": [
                    K[1] || (K[1] = (M) => r.value = M),
                    u
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: f
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", oc, y(a(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: h,
              class: "hidden"
            }, null, 512),
            x.value ? (c(), _("div", sc, [
              o("div", ac, y(a(t)("Uploading %s files.", I.value)), 1),
              V.value.length ? (c(), _(fe, { key: 0 }, [
                o("div", ic, y(a(t)("%s files will not be uploaded because of an invalid file type:", V.value.length)), 1),
                (c(!0), _(fe, null, he(V.value, (M) => (c(), _("div", {
                  key: M.id,
                  class: "vuefinder__upload-modal__file-entry"
                }, [
                  K[17] || (K[17] = o("span", { class: "vuefinder__upload-modal__file-icon text-red-600" }, [
                    o("span", {
                      class: "vuefinder__upload-modal__file-icon-text",
                      textContent: "!"
                    })
                  ], -1)),
                  o("div", lc, [
                    o("div", rc, y(a(vt)(M.name, 40)) + " (" + y(M.size) + ") ", 1),
                    o("div", dc, y(a(vt)(M.name, 16)) + " (" + y(M.size) + ") ", 1),
                    o("div", cc, y(M.statusName), 1)
                  ])
                ]))), 128))
              ], 64)) : N("", !0)
            ])) : (c(), _("div", uc, [
              (c(!0), _(fe, null, he(a(b), (M) => (c(), _("div", {
                key: M.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: ae(["vuefinder__upload-modal__file-icon", a(oe)(M)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(a(ne)(M))
                  }, null, 8, vc)
                ], 2),
                o("div", fc, [
                  E.value === M.id ? (c(), _("div", _c, [
                    ge(o("input", {
                      ref_for: !0,
                      ref_key: "renameInputRef",
                      ref: z,
                      "onUpdate:modelValue": K[2] || (K[2] = (ee) => T.value = ee),
                      type: "text",
                      class: "vuefinder__upload-modal__file-rename-input",
                      placeholder: a(t)("Rename"),
                      onKeyup: [
                        Ke((ee) => A(M), ["enter"]),
                        Ke(B, ["esc"])
                      ]
                    }, null, 40, pc), [
                      [We, T.value]
                    ]),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn vuefinder__upload-modal__file-rename-btn--save",
                      title: a(t)("Save"),
                      onClick: (ee) => A(M)
                    }, [...K[18] || (K[18] = [
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
                    ])], 8, mc),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn",
                      title: a(t)("Cancel"),
                      onClick: B
                    }, [...K[19] || (K[19] = [
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
                    ])], 8, hc)
                  ])) : (c(), _(fe, { key: 1 }, [
                    o("div", gc, y(a(vt)(M.name, 40)) + " (" + y(M.size) + ") ", 1),
                    o("div", wc, y(a(vt)(M.name, 16)) + " (" + y(M.size) + ") ", 1),
                    o("div", {
                      class: ae(["vuefinder__upload-modal__file-status", a(oe)(M)])
                    }, [
                      be(y(M.statusName) + " ", 1),
                      M.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING ? (c(), _("b", yc, y(M.percent), 1)) : N("", !0)
                    ], 2)
                  ], 64))
                ]),
                E.value !== M.id && M.status !== a(g).QUEUE_ENTRY_STATUS.REJECTED ? (c(), _("button", {
                  key: 0,
                  type: "button",
                  class: ae([
                    "vuefinder__upload-modal__file-rename-action",
                    a(m) || M.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING ? "disabled" : ""
                  ]),
                  title: a(t)("Rename"),
                  disabled: a(m) || M.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING,
                  onClick: (ee) => ve(M)
                }, [...K[20] || (K[20] = [
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
                ])], 10, bc)) : N("", !0),
                E.value !== M.id ? (c(), _("button", {
                  key: 1,
                  type: "button",
                  class: ae(["vuefinder__upload-modal__file-remove", a(m) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(m),
                  onClick: (ee) => a(S)(M)
                }, [...K[21] || (K[21] = [
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
                ])], 10, kc)) : N("", !0)
              ]))), 128)),
              a(b).length ? N("", !0) : (c(), _("div", $c, y(a(t)("No files selected!")), 1))
            ])),
            a($).length ? (c(), Q(Yt, {
              key: 2,
              error: "",
              onHidden: K[3] || (K[3] = (M) => $.value = "")
            }, {
              default: re(() => [
                be(y(a($)), 1)
              ]),
              _: 1
            })) : N("", !0)
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
}), Tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Dc(n, e) {
  return c(), _("svg", Tc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const vo = { render: Dc }, Mc = { class: "vuefinder__unarchive-modal__content" }, Ic = { class: "vuefinder__unarchive-modal__items" }, Ac = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Oc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Lc = { class: "vuefinder__unarchive-modal__item-name" }, Rc = { class: "vuefinder__unarchive-modal__info" }, Bc = { class: "vuefinder__unarchive-modal__target" }, zc = { class: "vuefinder__unarchive-modal__target-label" }, Vc = ["title"], Uc = {
  key: 0,
  class: "vuefinder__unarchive-modal__target-selector"
}, vn = /* @__PURE__ */ ce({
  __name: "ModalUnarchive",
  setup(n) {
    const e = de(), t = Ve(e), s = e.fs, i = se(s.path), { t: r } = e.i18n, l = D(e.modal.data.items[0]), d = D([]), u = D(null), f = D(!1), h = O(() => u.value?.path || i.value.path), p = () => {
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
      }).then((m) => {
        t.success(r("The file unarchived.")), e.fs.setFiles(m.files), e.modal.close();
      }).catch((m) => {
        t.error(Te(m, r("Failed to unarchive")));
      });
    };
    return ($, m) => (c(), Q(Ue, null, {
      buttons: re(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: b
        }, y(a(r)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[1] || (m[1] = (w) => a(e).modal.close())
        }, y(a(r)("Cancel")), 1)
      ]),
      default: re(() => [
        o("div", null, [
          G(je, {
            icon: a(vo),
            title: a(r)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", Mc, [
            o("div", Ic, [
              (c(!0), _(fe, null, he(d.value, (w) => (c(), _("p", {
                key: w.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                w.type === "dir" ? (c(), _("svg", Ac, [...m[2] || (m[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (c(), _("svg", Oc, [...m[3] || (m[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Lc, y(w.basename), 1)
              ]))), 128)),
              o("p", Rc, y(a(r)("The archive will be unarchived at")) + " (" + y(h.value) + ") ", 1),
              o("div", Bc, [
                o("div", zc, y(a(r)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: ae(["vuefinder__unarchive-modal__target-btn", { "vuefinder__unarchive-modal__target-btn--open": f.value }]),
                  onClick: p
                }, [
                  G(a(ze), { class: "vuefinder__unarchive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__unarchive-modal__target-text",
                    title: h.value
                  }, y(a(Rt)(h.value)), 9, Vc),
                  m[4] || (m[4] = o("svg", {
                    class: "vuefinder__unarchive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                f.value ? (c(), _("div", Uc, [
                  G($t, {
                    modelValue: u.value,
                    "onUpdate:modelValue": [
                      m[0] || (m[0] = (w) => u.value = w),
                      v
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(i),
                    onSelectAndClose: k
                  }, null, 8, ["modelValue", "current-path"])
                ])) : N("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Hc(n, e) {
  return c(), _("svg", Nc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const fo = { render: Hc }, jc = { class: "vuefinder__archive-modal__content" }, Kc = { class: "vuefinder__archive-modal__form" }, qc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Wc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Yc = { class: "vuefinder__archive-modal__file-name" }, Xc = ["placeholder"], Qc = { class: "vuefinder__archive-modal__target" }, Jc = { class: "vuefinder__archive-modal__target-label" }, Zc = ["title"], eu = {
  key: 0,
  class: "vuefinder__archive-modal__target-selector"
}, fn = /* @__PURE__ */ ce({
  __name: "ModalArchive",
  setup(n) {
    const e = de(), t = Ve(e), { t: s } = e.i18n, i = e.fs, r = se(i.path), l = D(""), d = D(e.modal.data.items), u = D(null), f = D(!1), h = O(() => u.value?.path || r.value.path), p = () => {
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
          items: d.value.map(({ path: m, type: w }) => ({
            path: m,
            type: w
          })),
          name: l.value,
          // Optional. Sent when the user explicitly picks a different folder.
          ...$ && $ !== r.value.path ? { destination: $ } : {}
        }).then((m) => {
          t.success(s("The file(s) archived.")), e.fs.setFiles(m.files), e.modal.close();
        }).catch((m) => {
          t.error(Te(m, s("Failed to archive files")));
        });
      }
    };
    return ($, m) => (c(), Q(Ue, null, {
      buttons: re(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: b
        }, y(a(s)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[2] || (m[2] = (w) => a(e).modal.close())
        }, y(a(s)("Cancel")), 1)
      ]),
      default: re(() => [
        o("div", null, [
          G(je, {
            icon: a(fo),
            title: a(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", jc, [
            o("div", Kc, [
              o("div", qc, [
                (c(!0), _(fe, null, he(d.value, (w) => (c(), _("p", {
                  key: w.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  w.type === "dir" ? (c(), _("svg", Wc, [...m[3] || (m[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (c(), _("svg", Gc, [...m[4] || (m[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Yc, y(w.basename), 1)
                ]))), 128))
              ]),
              ge(o("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (w) => l.value = w),
                class: "vuefinder__archive-modal__input",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: Ke(b, ["enter"])
              }, null, 40, Xc), [
                [We, l.value]
              ]),
              o("div", Qc, [
                o("div", Jc, y(a(s)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: ae(["vuefinder__archive-modal__target-btn", { "vuefinder__archive-modal__target-btn--open": f.value }]),
                  onClick: p
                }, [
                  G(a(ze), { class: "vuefinder__archive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__archive-modal__target-text",
                    title: h.value
                  }, y(a(Rt)(h.value)), 9, Zc),
                  m[5] || (m[5] = o("svg", {
                    class: "vuefinder__archive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                f.value ? (c(), _("div", eu, [
                  G($t, {
                    modelValue: u.value,
                    "onUpdate:modelValue": [
                      m[1] || (m[1] = (w) => u.value = w),
                      v
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(r),
                    onSelectAndClose: k
                  }, null, 8, ["modelValue", "current-path"])
                ])) : N("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), tu = { class: "vuefinder__about-modal__content" }, nu = { class: "vuefinder__about-modal__main" }, ou = { class: "vuefinder__about-modal__shortcuts" }, su = { class: "vuefinder__about-modal__shortcut" }, au = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, iu = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, lu = { class: "vuefinder__about-modal__shortcut" }, ru = { class: "vuefinder__about-modal__shortcut" }, du = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, cu = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, uu = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, vu = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, fu = { class: "vuefinder__about-modal__shortcut" }, _u = { class: "vuefinder__about-modal__shortcut" }, pu = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, mu = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, hu = /* @__PURE__ */ ce({
  __name: "ModalShortcuts",
  setup(n) {
    const e = de(), { enabled: t } = Ne(), { t: s } = e.i18n;
    return (i, r) => (c(), Q(Ue, null, {
      buttons: re(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: r[0] || (r[0] = (l) => a(e).modal.close())
        }, y(a(s)("Close")), 1)
      ]),
      default: re(() => [
        o("div", tu, [
          G(je, {
            icon: a(en),
            title: a(s)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", nu, [
            o("div", ou, [
              o("div", su, [
                o("div", null, y(a(s)("Refresh")), 1),
                r[1] || (r[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  be(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (c(), _("div", au, [
                o("div", null, y(a(s)("Rename")), 1),
                r[2] || (r[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  be(" + "),
                  o("kbd", null, "Shift"),
                  be(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : N("", !0),
              a(t)("delete") ? (c(), _("div", iu, [
                o("div", null, y(a(s)("Delete")), 1),
                r[3] || (r[3] = o("kbd", null, "Del", -1))
              ])) : N("", !0),
              o("div", lu, [
                o("div", null, y(a(s)("Escape")), 1),
                r[4] || (r[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", ru, [
                o("div", null, y(a(s)("Select All")), 1),
                r[5] || (r[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  be(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (c(), _("div", du, [
                o("div", null, y(a(s)("Cut")), 1),
                r[6] || (r[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  be(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : N("", !0),
              a(t)("copy") ? (c(), _("div", cu, [
                o("div", null, y(a(s)("Copy")), 1),
                r[7] || (r[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  be(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : N("", !0),
              a(t)("copy") ? (c(), _("div", uu, [
                o("div", null, y(a(s)("Paste")), 1),
                r[8] || (r[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  be(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : N("", !0),
              a(t)("search") ? (c(), _("div", vu, [
                o("div", null, y(a(s)("Search")), 1),
                r[9] || (r[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  be(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : N("", !0),
              o("div", fu, [
                o("div", null, y(a(s)("Toggle Sidebar")), 1),
                r[10] || (r[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  be(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", _u, [
                o("div", null, y(a(s)("Open Settings")), 1),
                r[11] || (r[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  be(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (c(), _("div", pu, [
                o("div", null, y(a(s)("Toggle Full Screen")), 1),
                r[12] || (r[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  be(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : N("", !0),
              a(t)("preview") ? (c(), _("div", mu, [
                o("div", null, y(a(s)("Preview")), 1),
                r[13] || (r[13] = o("kbd", null, "Space", -1))
              ])) : N("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), gu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function wu(n, e) {
  return c(), _("svg", gu, [...e[0] || (e[0] = [
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
function yu(n) {
  if (!(!pn || !n))
    try {
      const e = mn().filter((t) => t !== n);
      e.unshift(n), window.localStorage.setItem(_n, JSON.stringify(e.slice(0, po)));
    } catch {
    }
}
function bu(n) {
  if (!(!pn || !n))
    try {
      const e = mn().filter((t) => t !== n);
      window.localStorage.setItem(_n, JSON.stringify(e));
    } catch {
    }
}
const ku = { class: "vuefinder__go-to-folder-modal" }, $u = { class: "vuefinder__go-to-folder-modal__content" }, xu = ["placeholder", "onKeydown"], Su = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__error"
}, Cu = ["onMouseenter", "onClick", "onDblclick"], Fu = { class: "vuefinder__go-to-folder-modal__suggestion-label" }, Eu = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__suggestion-tag"
}, Pu = ["title", "onClick"], Tu = ["title", "onClick"], Du = {
  key: 2,
  class: "vuefinder__go-to-folder-modal__empty"
}, Mu = {
  key: 3,
  class: "vuefinder__go-to-folder-modal__loading"
}, Iu = ["disabled"], Au = /* @__PURE__ */ ce({
  name: "ModalGoToFolder",
  __name: "ModalGoToFolder",
  setup(n) {
    const e = de(), { t } = e.i18n, s = e.fs, i = se(s.storages), r = D(""), l = D([]), d = D(0), u = D(!1), f = D(!1), h = D(""), p = D(null), v = D(null);
    let k = 0;
    const b = O(() => i.value ?? []), $ = (B) => {
      const A = B ?? "", q = A.indexOf("://");
      if (q === -1)
        return { storage: null, parent: "", filter: A.trim(), hasProtocol: !1 };
      const x = A.slice(0, q), V = A.slice(q + 3), I = V.lastIndexOf("/"), P = I === -1 ? `${x}://` : `${x}://${V.slice(0, I).replace(/^\/+/, "")}`, j = I === -1 ? V : V.slice(I + 1);
      return { storage: x, parent: P, filter: j, hasProtocol: !0 };
    }, m = (B) => {
      const A = B.toLowerCase();
      l.value = b.value.filter((q) => !A || q.toLowerCase().includes(A)).map((q) => ({
        path: `${q}://`,
        label: `${q}://`,
        kind: "storage"
      })), d.value = l.value.length ? 0 : -1, h.value = "";
    }, w = () => {
      const B = mn();
      l.value = B.map((A) => ({
        path: A,
        label: A,
        kind: "recent"
      })), d.value = l.value.length ? 0 : -1, h.value = "";
    }, g = async (B, A) => {
      const q = ++k;
      u.value = !0, h.value = "";
      try {
        const x = await e.adapter.list(B);
        if (q !== k) return;
        const V = A.toLowerCase(), I = (x?.files ?? []).filter(
          (P) => P.type === "dir" && (!V || P.basename.toLowerCase().startsWith(V))
        );
        l.value = I.map(
          (P) => ({
            path: P.path,
            label: P.basename,
            kind: "dir"
          })
        ), d.value = l.value.length ? 0 : -1;
      } catch (x) {
        if (q !== k) return;
        l.value = [], d.value = -1, h.value = Te(x, t("Folder not found"));
      } finally {
        q === k && (u.value = !1);
      }
    };
    let F = null;
    const C = (B) => {
      F && clearTimeout(F), F = setTimeout(() => L(B), 150);
    }, L = (B) => {
      const A = B.trim();
      if (!A) {
        k++, u.value = !1, w();
        return;
      }
      const { hasProtocol: q, parent: x, filter: V } = $(A);
      if (!q) {
        k++, u.value = !1, m(A);
        return;
      }
      g(x, V);
    };
    me(r, (B) => C(B)), ke(() => {
      w(), Oe(() => p.value?.focus());
    });
    const S = () => {
      Oe(() => {
        const B = v.value;
        if (!B) return;
        const A = B.children[d.value];
        if (!A) return;
        const q = B.scrollTop, x = q + B.clientHeight, V = A.offsetTop, I = V + A.offsetHeight;
        V < q ? B.scrollTop = V : I > x && (B.scrollTop = I - B.clientHeight);
      });
    }, R = (B) => {
      if (!l.value.length) return;
      const A = l.value.length;
      d.value = ((d.value + B) % A + A) % A, S();
    }, H = (B) => {
      r.value = B.kind === "dir" ? `${B.path}/` : B.path, Oe(() => {
        p.value?.setSelectionRange(r.value.length, r.value.length);
      });
    }, oe = (B) => {
      if (!B.includes("://"))
        return {
          ok: !1,
          reason: t("Invalid path format. Path must be in format: storage://path/to/folder")
        };
      const A = B.slice(0, B.indexOf("://"));
      return b.value.includes(A) ? { ok: !0 } : { ok: !1, reason: t('Invalid storage. Storage "%s" is not available.', A) };
    }, ne = async (B) => {
      if (f.value) return;
      const A = B.trim();
      if (!A) return;
      const q = oe(A);
      if (!q.ok) {
        h.value = q.reason ?? "";
        return;
      }
      f.value = !0;
      try {
        if (await e.adapter.open(A) === void 0)
          return;
        yu(A), e.modal.close();
      } catch (x) {
        h.value = Te(x, t("Failed to navigate to folder")), s.setLoading(!1);
      } finally {
        f.value = !1;
      }
    }, J = () => {
      const B = l.value[d.value];
      ne(B ? B.path : r.value);
    }, W = (B) => {
      if (!l.value.length) return;
      B.preventDefault();
      const A = l.value[d.value];
      A && H(A);
    }, E = (B) => {
      if (B.kind === "dir") {
        H(B);
        return;
      }
      ne(B.path);
    }, T = (B) => {
      ne(B.path);
    }, z = (B, A) => {
      B.stopPropagation(), B.preventDefault(), bu(A), w();
    }, X = (B, A) => {
      B.stopPropagation(), B.preventDefault(), r.value = A, Oe(() => {
        p.value?.focus(), p.value?.setSelectionRange(r.value.length, r.value.length);
      });
    }, ve = O(() => {
      const B = b.value[0];
      return B ? `${B}://path/to/folder` : "storage://path/to/folder";
    });
    return (B, A) => (c(), Q(Ue, null, {
      buttons: re(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: f.value,
          onClick: J
        }, y(a(t)("Go")), 9, Iu),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: A[3] || (A[3] = (q) => a(e).modal.close())
        }, y(a(t)("Cancel")), 1)
      ]),
      default: re(() => [
        o("div", ku, [
          G(je, {
            icon: a(Ot),
            title: a(t)("Go to Folder")
          }, null, 8, ["icon", "title"]),
          o("div", $u, [
            ge(o("input", {
              ref_key: "inputRef",
              ref: p,
              "onUpdate:modelValue": A[0] || (A[0] = (q) => r.value = q),
              class: "vuefinder__go-to-folder-modal__input",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: ve.value,
              onKeydown: [
                A[1] || (A[1] = Ke(pe((q) => R(1), ["prevent"]), ["down"])),
                A[2] || (A[2] = Ke(pe((q) => R(-1), ["prevent"]), ["up"])),
                Ke(pe(J, ["prevent"]), ["enter"]),
                Ke(W, ["tab"])
              ]
            }, null, 40, xu), [
              [We, r.value]
            ]),
            h.value ? (c(), _("div", Su, y(h.value), 1)) : N("", !0),
            l.value.length ? (c(), _("div", {
              key: 1,
              ref_key: "suggestionListRef",
              ref: v,
              class: "vuefinder__go-to-folder-modal__suggestions"
            }, [
              (c(!0), _(fe, null, he(l.value, (q, x) => (c(), _("div", {
                key: `${q.kind}:${q.path}`,
                class: ae(["vuefinder__go-to-folder-modal__suggestion", {
                  "vuefinder__go-to-folder-modal__suggestion--active": x === d.value
                }]),
                onMouseenter: (V) => d.value = x,
                onClick: (V) => E(q),
                onDblclick: (V) => T(q)
              }, [
                G(a(ze), { class: "vuefinder__go-to-folder-modal__suggestion-icon" }),
                o("span", Fu, y(q.label), 1),
                q.kind === "recent" ? (c(), _("span", Eu, y(a(t)("Recent")), 1)) : N("", !0),
                q.kind === "recent" ? (c(), _("button", {
                  key: 1,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-fill",
                  title: a(t)("Edit this path"),
                  onClick: (V) => X(V, q.path)
                }, [
                  G(a(_o), { class: "vuefinder__go-to-folder-modal__suggestion-fill-icon" })
                ], 8, Pu)) : N("", !0),
                q.kind === "recent" ? (c(), _("button", {
                  key: 2,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-remove",
                  title: a(t)("Remove from recent"),
                  onClick: (V) => z(V, q.path)
                }, " × ", 8, Tu)) : N("", !0)
              ], 42, Cu))), 128))
            ], 512)) : u.value ? N("", !0) : (c(), _("div", Du, [
              r.value.trim() ? (c(), _(fe, { key: 1 }, [
                be(y(a(t)("No matching folders.")), 1)
              ], 64)) : (c(), _(fe, { key: 0 }, [
                be(y(a(t)("No recent folders yet.")), 1)
              ], 64))
            ])),
            u.value ? (c(), _("div", Mu, y(a(t)("Loading…")), 1)) : N("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Ou() {
  const n = de(), { enabled: e } = Ne(), { t } = n?.i18n || { t: (h) => h }, s = n?.fs, i = n?.config, r = se(i.state), l = se(s.selectedItems), d = se(s?.storages || []), u = O(() => window.opener !== null || window.name !== "" || window.history.length <= 1);
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
              await yt(h.path);
            } else {
              const h = s?.path?.get();
              h?.path && await yt(h.path);
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
          action: () => n?.modal?.open(Au),
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
          action: () => n?.modal?.open(hu),
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
const Lu = { class: "vuefinder__menubar__container" }, Ru = ["onClick", "onMouseenter"], Bu = { class: "vuefinder__menubar__label" }, zu = ["onMouseenter"], Vu = ["onClick"], Uu = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Nu = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Hu = {
  key: 2,
  class: "vuefinder__menubar__dropdown__chevron",
  viewBox: "0 0 16 16",
  fill: "currentColor",
  "aria-hidden": "true"
}, ju = {
  key: 3,
  class: "vuefinder__menubar__dropdown__submenu"
}, Ku = ["onClick"], qu = { class: "vuefinder__menubar__dropdown__label" }, Wu = /* @__PURE__ */ ce({
  __name: "MenuBar",
  setup(n) {
    const { menuItems: e } = Ou(), t = D(null), s = D(!1), i = (f) => {
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
    return ke(() => {
      document.addEventListener("click", u);
    }), Ae(() => {
      document.removeEventListener("click", u);
    }), (f, h) => (c(), _("div", {
      class: "vuefinder__menubar",
      onClick: h[0] || (h[0] = pe(() => {
      }, ["stop"]))
    }, [
      o("div", Lu, [
        we(f.$slots, "menubar-start", { menuItems: a(e) }),
        we(f.$slots, "menu-items", {
          menuItems: a(e),
          handleMenuAction: d
        }, () => [
          (c(!0), _(fe, null, he(a(e), (p) => (c(), _("div", {
            key: p.id,
            class: ae(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": t.value === p.id }]),
            onClick: (v) => i(p.id),
            onMouseenter: (v) => r(p.id)
          }, [
            o("span", Bu, y(p.label), 1),
            t.value === p.id ? (c(), _("div", {
              key: 0,
              class: "vuefinder__menubar__dropdown",
              onMouseenter: (v) => r(p.id)
            }, [
              (c(!0), _(fe, null, he(p.items, (v) => (c(), _("div", {
                key: v.id || v.type,
                class: ae(["vuefinder__menubar__dropdown__item", {
                  "vuefinder__menubar__dropdown__item--separator": v.type === "separator",
                  "vuefinder__menubar__dropdown__item--disabled": v.enabled && !v.enabled(),
                  "vuefinder__menubar__dropdown__item--checked": v.checked && v.checked(),
                  "vuefinder__menubar__dropdown__item--hidden": v.hidden && v.hidden(),
                  "vuefinder__menubar__dropdown__item--has-children": v.items?.length
                }]),
                onClick: pe((k) => v.type !== "separator" && !v.items?.length && (!v.enabled || v.enabled()) ? d(v.action) : null, ["stop"])
              }, [
                v.type !== "separator" ? (c(), _("span", Uu, y(v.label), 1)) : N("", !0),
                v.checked && v.checked() ? (c(), _("span", Nu, " ✓ ")) : N("", !0),
                v.items?.length ? (c(), _("svg", Hu, [...h[1] || (h[1] = [
                  o("path", { d: "M6 4l4 4-4 4z" }, null, -1)
                ])])) : N("", !0),
                v.items?.length ? (c(), _("div", ju, [
                  (c(!0), _(fe, null, he(v.items, (k) => (c(), _("div", {
                    key: k.id,
                    class: ae(["vuefinder__menubar__dropdown__item", {
                      "vuefinder__menubar__dropdown__item--disabled": k.enabled && !k.enabled()
                    }]),
                    onClick: pe((b) => !k.enabled || k.enabled() ? d(k.action) : null, ["stop"])
                  }, [
                    o("span", qu, y(k.label), 1)
                  ], 10, Ku))), 128))
                ])) : N("", !0)
              ], 10, Vu))), 128))
            ], 40, zu)) : N("", !0)
          ], 42, Ru))), 128))
        ]),
        we(f.$slots, "menubar-end", { menuItems: a(e) })
      ])
    ]));
  }
}), Gu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Yu(n, e) {
  return c(), _("svg", Gu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Xu = { render: Yu }, Qu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ju(n, e) {
  return c(), _("svg", Qu, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const Zu = { render: Ju }, ev = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function tv(n, e) {
  return c(), _("svg", ev, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const nv = { render: tv }, ov = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function sv(n, e) {
  return c(), _("svg", ov, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const av = { render: sv }, iv = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function lv(n, e) {
  return c(), _("svg", iv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const rv = { render: lv }, dv = { class: "vuefinder__toolbar" }, cv = { class: "vuefinder__toolbar__actions" }, uv = ["title"], vv = ["title"], fv = ["title"], _v = ["title"], pv = ["title"], mv = ["title"], hv = ["title"], gv = { class: "vuefinder__toolbar__controls" }, wv = ["title"], yv = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, bv = ["title"], kv = { class: "relative" }, $v = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, xv = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, Sv = { class: "vuefinder__toolbar__dropdown-content" }, Cv = { class: "vuefinder__toolbar__dropdown-section" }, Fv = { class: "vuefinder__toolbar__dropdown-label" }, Ev = { class: "vuefinder__toolbar__dropdown-row" }, Pv = { value: "name" }, Tv = { value: "size" }, Dv = { value: "modified" }, Mv = { value: "" }, Iv = { value: "asc" }, Av = { value: "desc" }, Ov = { class: "vuefinder__toolbar__dropdown-section" }, Lv = { class: "vuefinder__toolbar__dropdown-label" }, Rv = { class: "vuefinder__toolbar__dropdown-options" }, Bv = { class: "vuefinder__toolbar__dropdown-option" }, zv = { class: "vuefinder__toolbar__option-text" }, Vv = { class: "vuefinder__toolbar__dropdown-option" }, Uv = { class: "vuefinder__toolbar__option-text" }, Nv = { class: "vuefinder__toolbar__dropdown-option" }, Hv = { class: "vuefinder__toolbar__option-text" }, jv = { class: "vuefinder__toolbar__dropdown-toggle" }, Kv = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, qv = { class: "vuefinder__toolbar__dropdown-reset" }, Wv = ["title"], Gv = ["title"], Yv = /* @__PURE__ */ ce({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = de(), { enabled: t } = Ne(), { t: s } = e.i18n, i = e.fs, r = e.config, l = se(r.state), d = se(i.selectedItems), u = se(i.sort), f = se(i.filter);
    me(
      () => l.value.fullScreen,
      () => {
        const m = document.querySelector("body");
        m && (m.style.overflow = l.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const h = D(!1), p = (m) => {
      m.target.closest(".vuefinder__toolbar__dropdown-container") || (h.value = !1);
    };
    ke(() => {
      const m = document.querySelector("body");
      m && l.value.fullScreen && setTimeout(() => m.style.overflow = "hidden"), document.addEventListener("click", p);
    }), Ae(() => {
      document.removeEventListener("click", p);
    });
    const v = D({
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
      (m) => {
        if (!v.value.sortOrder) {
          i.clearSort();
          return;
        }
        m === "name" ? i.setSort("basename", v.value.sortOrder) : m === "size" ? i.setSort("file_size", v.value.sortOrder) : m === "modified" && i.setSort("last_modified", v.value.sortOrder);
      }
    ), me(
      () => v.value.sortOrder,
      (m) => {
        if (!m) {
          i.clearSort();
          return;
        }
        v.value.sortBy === "name" ? i.setSort("basename", m) : v.value.sortBy === "size" ? i.setSort("file_size", m) : v.value.sortBy === "modified" && i.setSort("last_modified", m);
      }
    ), me(
      u,
      (m) => {
        m.active ? (m.column === "basename" ? v.value.sortBy = "name" : m.column === "file_size" ? v.value.sortBy = "size" : m.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = m.order) : v.value.sortOrder = "";
      },
      { immediate: !0 }
    ), me(
      () => v.value.filterKind,
      (m) => {
        i.setFilter(m, l.value.showHiddenFiles);
      }
    ), me(
      () => v.value.showHidden,
      (m) => {
        r.set("showHiddenFiles", m), i.setFilter(v.value.filterKind, m);
      }
    ), me(
      f,
      (m) => {
        v.value.filterKind = m.kind;
      },
      { immediate: !0 }
    ), me(
      () => l.value.showHiddenFiles,
      (m) => {
        v.value.showHidden = m, i.setFilter(v.value.filterKind, m);
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
    return (m, w) => we(m.$slots, "toolbar-items", {}, () => [
      o("div", dv, [
        o("div", cv, [
          a(t)("newfolder") ? (c(), _("div", {
            key: 0,
            class: "mx-1.5",
            title: a(s)("New Folder"),
            onClick: w[0] || (w[0] = (g) => a(e).modal.open(cn, { items: a(d) }))
          }, [
            G(a(lo))
          ], 8, uv)) : N("", !0),
          a(t)("newfile") ? (c(), _("div", {
            key: 1,
            class: "mx-1.5",
            title: a(s)("New File"),
            onClick: w[1] || (w[1] = (g) => a(e).modal.open(co, { items: a(d) }))
          }, [
            G(a(ro))
          ], 8, vv)) : N("", !0),
          a(t)("rename") ? (c(), _("div", {
            key: 2,
            class: "mx-1.5",
            title: a(s)("Rename"),
            onClick: w[2] || (w[2] = (g) => a(d).length !== 1 || a(e).modal.open(Mt, { items: a(d) }))
          }, [
            G(a(Xn), {
              class: ae(a(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, fv)) : N("", !0),
          a(t)("delete") ? (c(), _("div", {
            key: 3,
            class: "mx-1.5",
            title: a(s)("Delete"),
            onClick: w[3] || (w[3] = (g) => !a(d).length || a(e).modal.open(Dt, { items: a(d) }))
          }, [
            G(a(Yn), {
              class: ae(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, _v)) : N("", !0),
          a(t)("upload") ? (c(), _("div", {
            key: 4,
            class: "mx-1.5",
            title: a(s)("Upload"),
            onClick: w[4] || (w[4] = (g) => a(e).modal.open(un, { items: a(d) }))
          }, [
            G(a(uo))
          ], 8, pv)) : N("", !0),
          a(t)("unarchive") && a(d).length === 1 && a(d)[0].mime_type === "application/zip" ? (c(), _("div", {
            key: 5,
            class: "mx-1.5",
            title: a(s)("Unarchive"),
            onClick: w[5] || (w[5] = (g) => !a(d).length || a(e).modal.open(vn, { items: a(d) }))
          }, [
            G(a(vo), {
              class: ae(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, mv)) : N("", !0),
          a(t)("archive") ? (c(), _("div", {
            key: 6,
            class: "mx-1.5",
            title: a(s)("Archive"),
            onClick: w[6] || (w[6] = (g) => !a(d).length || a(e).modal.open(fn, { items: a(d) }))
          }, [
            G(a(fo), {
              class: ae(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, hv)) : N("", !0)
        ]),
        o("div", gv, [
          a(t)("search") ? (c(), _("div", {
            key: 0,
            class: "mx-1.5",
            title: a(s)("Search Files"),
            onClick: w[7] || (w[7] = (g) => a(e).modal.open(dn))
          }, [
            G(a(rn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
          ], 8, wv)) : N("", !0),
          o("div", yv, [
            o("div", {
              title: a(s)("Filter"),
              class: "vuefinder__toolbar__dropdown-trigger",
              onClick: w[8] || (w[8] = (g) => h.value = !h.value)
            }, [
              o("div", kv, [
                G(a(rv), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
                b.value ? (c(), _("div", $v)) : N("", !0)
              ])
            ], 8, bv),
            h.value ? (c(), _("div", xv, [
              o("div", Sv, [
                o("div", Cv, [
                  o("div", Fv, y(a(s)("Sorting")), 1),
                  o("div", Ev, [
                    ge(o("select", {
                      "onUpdate:modelValue": w[9] || (w[9] = (g) => v.value.sortBy = g),
                      class: "vuefinder__toolbar__dropdown-select"
                    }, [
                      o("option", Pv, y(a(s)("Name")), 1),
                      o("option", Tv, y(a(s)("Size")), 1),
                      o("option", Dv, y(a(s)("Date")), 1)
                    ], 512), [
                      [qt, v.value.sortBy]
                    ]),
                    ge(o("select", {
                      "onUpdate:modelValue": w[10] || (w[10] = (g) => v.value.sortOrder = g),
                      class: "vuefinder__toolbar__dropdown-select"
                    }, [
                      o("option", Mv, y(a(s)("None")), 1),
                      o("option", Iv, y(a(s)("Asc")), 1),
                      o("option", Av, y(a(s)("Desc")), 1)
                    ], 512), [
                      [qt, v.value.sortOrder]
                    ])
                  ])
                ]),
                o("div", Ov, [
                  o("div", Lv, y(a(s)("Show")), 1),
                  o("div", Rv, [
                    o("label", Bv, [
                      ge(o("input", {
                        "onUpdate:modelValue": w[11] || (w[11] = (g) => v.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "all",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [Vt, v.value.filterKind]
                      ]),
                      o("span", zv, y(a(s)("All items")), 1)
                    ]),
                    o("label", Vv, [
                      ge(o("input", {
                        "onUpdate:modelValue": w[12] || (w[12] = (g) => v.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "files",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [Vt, v.value.filterKind]
                      ]),
                      o("span", Uv, y(a(s)("Files only")), 1)
                    ]),
                    o("label", Nv, [
                      ge(o("input", {
                        "onUpdate:modelValue": w[13] || (w[13] = (g) => v.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "folders",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [Vt, v.value.filterKind]
                      ]),
                      o("span", Hv, y(a(s)("Folders only")), 1)
                    ])
                  ])
                ]),
                o("div", jv, [
                  o("label", Kv, y(a(s)("Show hidden files")), 1),
                  ge(o("input", {
                    id: "showHidden",
                    "onUpdate:modelValue": w[14] || (w[14] = (g) => v.value.showHidden = g),
                    type: "checkbox",
                    class: "vuefinder__toolbar__checkbox"
                  }, null, 512), [
                    [lt, v.value.showHidden]
                  ])
                ]),
                o("div", qv, [
                  o("button", {
                    class: "vuefinder__toolbar__reset-button",
                    onClick: $
                  }, y(a(s)("Reset")), 1)
                ])
              ])
            ])) : N("", !0)
          ]),
          a(t)("fullscreen") ? (c(), _("div", {
            key: 1,
            class: "mx-1.5",
            title: a(s)("Toggle Full Screen"),
            onClick: w[15] || (w[15] = (g) => a(r).toggle("fullScreen"))
          }, [
            a(l).fullScreen ? (c(), Q(a(Zu), {
              key: 0,
              class: "vf-toolbar-icon"
            })) : (c(), Q(a(Xu), {
              key: 1,
              class: "vf-toolbar-icon"
            }))
          ], 8, Wv)) : N("", !0),
          o("div", {
            class: "mx-1.5",
            title: a(s)("Change View"),
            onClick: w[16] || (w[16] = (g) => k())
          }, [
            a(l).view === "grid" ? (c(), Q(a(nv), {
              key: 0,
              class: "vf-toolbar-icon"
            })) : N("", !0),
            a(l).view === "list" ? (c(), Q(a(av), {
              key: 1,
              class: "vf-toolbar-icon"
            })) : N("", !0)
          ], 8, Gv)
        ])
      ])
    ]);
  }
}), Xv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Qv(n, e) {
  return c(), _("svg", Xv, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Jv = { render: Qv }, Zv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function ef(n, e) {
  return c(), _("svg", Zv, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const tf = { render: ef }, nf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function of(n, e) {
  return c(), _("svg", nf, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const sf = { render: of }, af = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function lf(n, e) {
  return c(), _("svg", af, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const rf = { render: lf }, df = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function cf(n, e) {
  return c(), _("svg", df, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const uf = { render: cf };
function xt(n, e = []) {
  const t = "vfDragEnterCounter", s = n.fs, i = se(s.selectedItems);
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
    const b = s.getDraggedItem(), $ = s.sortedFiles.get().find((m) => $e(m) === b)?.path ?? "";
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
    const $ = p.dataTransfer?.getData("items") || "[]", w = JSON.parse($).map((g) => s.sortedFiles.get().find((F) => $e(F) === g)).filter((g) => !!g);
    s.clearDraggedItem(), n.modal.open(it, { items: { from: w, to: v } });
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
function vf() {
  const n = de(), e = Ve(n), t = n.fs, s = n.config, { t: i } = n.i18n, r = se(t.path), l = () => {
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
const ff = { class: "vuefinder__breadcrumb__container" }, _f = ["title"], pf = ["title"], mf = ["title"], hf = ["title"], gf = { class: "vuefinder__breadcrumb__path-container" }, wf = { class: "vuefinder__breadcrumb__list" }, yf = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, bf = { class: "relative" }, kf = ["title", "onClick"], $f = ["title"], xf = { class: "vuefinder__breadcrumb__path-mode" }, Sf = { class: "vuefinder__breadcrumb__path-mode-content" }, Cf = ["title"], Ff = { class: "vuefinder__breadcrumb__path-text" }, Ef = ["title"], Pf = ["data-theme"], Tf = ["onClick"], Df = { class: "vuefinder__breadcrumb__hidden-item-content" }, Mf = { class: "vuefinder__breadcrumb__hidden-item-text" }, ct = 5, Tn = 1, If = 40, Af = /* @__PURE__ */ ce({
  __name: "Breadcrumb",
  setup(n) {
    const e = de(), t = vf(), { t: s } = e.i18n, i = e.fs, r = e.config, l = se(r.state), d = se(i.path), u = se(i.loading), f = D(null), h = no(0, 100), p = D(5), v = D(!1), k = D(!1), b = O(() => d.value?.breadcrumb ?? []), $ = /* @__PURE__ */ new Map();
    function m(x, V) {
      return x.length > V ? [x.slice(-V), x.slice(0, -V)] : [x, []];
    }
    const w = O(
      () => m(b.value, p.value)[0]
    ), g = O(
      () => m(b.value, p.value)[1]
    );
    function F() {
      const x = b.value, V = h.value;
      if (!x.length || V <= 0) return null;
      let I = 0, P = 0;
      for (let j = x.length - 1; j >= 0; j--) {
        const U = x[j]?.name;
        if (!U) continue;
        const Y = $.get(U);
        if (Y === void 0) return null;
        if (I + Y > V - If || (I += Y, P++, P >= ct)) break;
      }
      return P < Tn && (P = Tn), P > ct && (P = ct), P;
    }
    function C() {
      if (!f.value) return;
      const x = f.value.children, V = w.value;
      for (let I = 0; I < x.length; I++) {
        const P = V[I]?.name;
        if (!P) continue;
        const j = x[I].offsetWidth;
        j > 0 && $.set(P, j);
      }
    }
    async function L() {
      if (!b.value.length) {
        p.value = ct;
        return;
      }
      const x = F();
      if (x !== null) {
        p.value = x;
        return;
      }
      p.value = ct, await Oe(), C();
      const V = F();
      V !== null && (p.value = V);
    }
    me(h, L), me(b, L, { immediate: !0 });
    const S = () => {
      f.value && (h.value = f.value.offsetWidth);
    }, R = D(null);
    ke(() => {
      R.value = new ResizeObserver(S), f.value && R.value.observe(f.value);
    }), Ae(() => {
      R.value && R.value.disconnect();
    });
    const H = xt(e, ["vuefinder__drag-over"]);
    function oe(x = null) {
      x ??= b.value.length - 2;
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
      return b.value[x] ?? V;
    }
    const ne = () => {
      t.refresh();
    }, J = () => {
      w.value.length > 0 && t.goUp();
    }, W = (x) => {
      e.adapter.open(x.path), v.value = !1;
    }, E = () => {
      v.value && (v.value = !1);
    }, T = {
      mounted(x, V) {
        x.clickOutsideEvent = function(I) {
          x === I.target || x.contains(I.target) || V.value();
        }, document.body.addEventListener("click", x.clickOutsideEvent);
      },
      beforeUnmount(x) {
        document.body.removeEventListener("click", x.clickOutsideEvent);
      }
    }, z = () => {
      t.toggleTreeView();
    }, X = D({
      x: 0,
      y: 0
    }), ve = (x, V = null) => {
      if (x.currentTarget instanceof HTMLElement) {
        const { x: I, y: P, height: j } = x.currentTarget.getBoundingClientRect();
        X.value = { x: I, y: P + j };
      }
      v.value = V ?? !v.value;
    }, B = () => {
      k.value = !k.value;
    }, A = async () => {
      await t.copyCurrentPath();
    }, q = () => {
      k.value = !1;
    };
    return (x, V) => (c(), _("div", ff, [
      we(x.$slots, "breadcrumb-actions", {}, () => [
        o("span", {
          title: a(s)("Toggle Tree View")
        }, [
          G(a(rf), {
            class: ae(["vuefinder__breadcrumb__toggle-tree", a(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
            onClick: z
          }, null, 8, ["class"])
        ], 8, _f),
        o("span", {
          title: a(s)("Go up a directory")
        }, [
          G(a(_o), qe({
            class: b.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
          }, et(b.value.length ? a(H).events(oe()) : {}), { onClick: J }), null, 16, ["class"])
        ], 8, pf),
        a(i).isLoading() ? (c(), _("span", {
          key: 1,
          title: a(s)("Cancel")
        }, [
          G(a(Qn), {
            onClick: V[0] || (V[0] = (I) => a(e).emitter.emit("vf-fetch-abort"))
          })
        ], 8, hf)) : (c(), _("span", {
          key: 0,
          title: a(s)("Refresh")
        }, [
          G(a(Jv), { onClick: ne })
        ], 8, mf))
      ]),
      ge(o("div", gf, [
        o("div", null, [
          G(a(tf), qe({ class: "vuefinder__breadcrumb__home-icon" }, et(a(H).events(oe(-1))), {
            onClick: V[1] || (V[1] = pe((I) => a(e).adapter.open(a(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", wf, [
          g.value.length ? ge((c(), _("div", yf, [
            V[3] || (V[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", bf, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: V[2] || (V[2] = (I) => ve(I, !0)),
                onClick: pe(ve, ["stop"])
              }, [
                G(a(ao), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [T, E]
          ]) : N("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: f,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (c(!0), _(fe, null, he(w.value, (I, P) => (c(), _("div", { key: P }, [
            V[4] || (V[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", qe({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: I.basename
            }, et(a(H).events(I), !0), {
              onClick: pe((j) => a(e).adapter.open(I.path), ["stop"])
            }), y(I.name), 17, kf)
          ]))), 128))
        ], 512),
        a(r).get("loadingIndicator") === "circular" && a(u) ? (c(), Q(a(Lt), { key: 0 })) : N("", !0),
        o("span", {
          title: a(s)("Toggle Path Copy Mode"),
          onClick: B
        }, [
          G(a(uf), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, $f)
      ], 512), [
        [Ge, !k.value]
      ]),
      ge(o("div", xf, [
        o("div", Sf, [
          o("div", {
            title: a(s)("Copy Path")
          }, [
            G(a(sn), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: A
            })
          ], 8, Cf),
          o("div", Ff, y(a(d).path), 1),
          o("div", {
            title: a(s)("Exit")
          }, [
            G(a(sf), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: q
            })
          ], 8, Ef)
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
            (c(!0), _(fe, null, he(g.value, (I, P) => (c(), _("div", qe({
              key: P,
              class: "vuefinder__breadcrumb__hidden-item"
            }, et(a(H).events(I), !0), {
              onClick: (j) => W(I)
            }), [
              o("div", Df, [
                o("span", null, [
                  G(a(ze), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", Mf, y(I.name), 1)
              ])
            ], 16, Tf))), 128))
          ], 12, Pf), [
            [Ge, v.value]
          ])
        ])
      ]))
    ]));
  }
}), Of = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Lf(n, e) {
  return c(), _("svg", Of, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Dn = { render: Lf }, Rf = { class: "vuefinder__drag-item__container" }, Bf = { class: "vuefinder__drag-item__count" }, zf = /* @__PURE__ */ ce({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, s) => (c(), _("div", Rf, [
      e.count > 1 ? (c(), Q(a(Dn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : N("", !0),
      G(a(Dn), { class: "vuefinder__drag-item__icon" }),
      o("div", Bf, y(e.count), 1)
    ]));
  }
}), Vf = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Mn = /* @__PURE__ */ ce({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = de(), s = se(t.config.state), i = O(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), r = O(() => {
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
      class: ae(["vuefinder__item-icon", {
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
        n.ext && n.item.type !== "dir" && n.item.extension ? (c(), _("div", Vf, y(n.item.extension.substring(0, 3)), 1)) : N("", !0)
      ])
    ], 6));
  }
}), Uf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Nf(n, e) {
  return c(), _("svg", Uf, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const In = { render: Nf }, Hf = ["data-key", "data-row", "data-col", "draggable"], jf = { key: 0 }, Kf = { class: "vuefinder__explorer__item-grid-content" }, qf = ["data-src", "alt"], Wf = { class: "vuefinder__explorer__item-title" }, Gf = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, Yf = { class: "vuefinder__explorer__item-list-name" }, Xf = { class: "vuefinder__explorer__item-list-icon" }, Qf = { class: "vuefinder__explorer__item-name" }, Jf = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Zf = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, e_ = { key: 0 }, t_ = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, n_ = /* @__PURE__ */ ce({
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
    const t = n, s = e, i = de(), r = i.fs, l = i.config, d = O(() => {
      const W = i.selectionFilterType;
      return !W || W === "both" ? !0 : W === "files" && t.item.type === "file" || W === "dirs" && t.item.type === "dir";
    }), u = O(() => {
      const W = i.selectionFilterMimeIncludes;
      return !W || !W.length || t.item.type === "dir" ? !0 : t.item.mime_type ? W.some((E) => t.item.mime_type?.startsWith(E)) : !1;
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
    })), k = D(null);
    let b = !1, $ = null, m = null, w = !1;
    const { enabled: g } = Ne(), F = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), C = O(() => F ? !1 : g("move")), L = () => {
      $ && (clearTimeout($), $ = null), m = null;
    }, S = (W) => {
      L(), m = W, w = !1, W.stopPropagation(), $ = setTimeout(() => {
        !m || $ === null || (w = !0, m.cancelable && m.preventDefault(), m.stopPropagation(), s("contextmenu", m), L());
      }, 500);
    }, R = (W) => {
      if (w) {
        W.preventDefault(), W.stopPropagation(), L();
        return;
      }
      setTimeout(() => {
        w || (L(), J(W));
      }, 100);
    }, H = (W) => {
      if (!m) return;
      const E = m.touches[0] || m.changedTouches[0], T = W.touches[0] || W.changedTouches[0];
      if (E && T) {
        const z = Math.abs(T.clientX - E.clientX), X = Math.abs(T.clientY - E.clientY);
        (z > 15 || X > 15) && L();
      }
    }, oe = (W) => {
      F && W.type !== "click" || s("click", W);
    }, ne = (W) => {
      if (w)
        return W.preventDefault(), W.stopPropagation(), !1;
      s("dragstart", W);
    }, J = (W) => {
      if (!b)
        b = !0, s("click", W), k.value = setTimeout(() => {
          b = !1;
        }, 300);
      else
        return b = !1, s("dblclick", W), !1;
    };
    return (W, E) => (c(), _("div", {
      class: ae(p.value),
      style: Ie(v.value),
      "data-key": a($e)(n.item),
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: C.value,
      onTouchstartCapture: E[1] || (E[1] = (T) => S(T)),
      onTouchendCapture: E[2] || (E[2] = (T) => R(T)),
      onTouchmoveCapture: H,
      onTouchcancelCapture: E[3] || (E[3] = () => L()),
      onClick: oe,
      onDblclick: E[4] || (E[4] = (T) => s("dblclick", T)),
      onContextmenu: E[5] || (E[5] = pe((T) => s("contextmenu", T), ["prevent", "stop"])),
      onDragstart: ne,
      onDragend: E[6] || (E[6] = (T) => s("dragend", T))
    }, [
      n.view === "grid" ? (c(), _("div", jf, [
        a(r).isReadOnly(n.item) ? (c(), Q(a(In), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : N("", !0),
        o("div", Kf, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (c(), _("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? a(i).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: E[0] || (E[0] = (T) => T.preventDefault())
          }, null, 40, qf)) : (c(), Q(Mn, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: re((T) => [
              we(W.$slots, "icon", Ce(Fe(T)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        o("span", Wf, y(a(vt)(n.item.basename)), 1)
      ])) : (c(), _("div", Gf, [
        o("div", Yf, [
          o("div", Xf, [
            G(Mn, {
              item: n.item,
              view: n.view
            }, {
              icon: re((T) => [
                we(W.$slots, "icon", Ce(Fe(T)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          o("span", Qf, y(n.item.basename), 1),
          o("div", null, [
            a(r).isReadOnly(n.item) ? (c(), Q(a(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : N("", !0)
          ])
        ]),
        n.showPath ? (c(), _("div", Jf, y(n.item.path), 1)) : N("", !0),
        n.showPath ? N("", !0) : (c(), _("div", Zf, [
          n.item.file_size ? (c(), _("div", e_, y(a(i).filesize(n.item.file_size)), 1)) : N("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (c(), _("div", t_, y(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : N("", !0)
      ])),
      a(g)("pinned") && a(l).get("pinnedFolders").find((T) => T.path === n.item.path) ? (c(), Q(a(wt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : N("", !0)
    ], 46, Hf));
  }
}), o_ = ["data-row"], An = /* @__PURE__ */ ce({
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
      class: ae(i.value),
      "data-row": n.rowIndex,
      style: Ie(r.value)
    }, [
      o("div", {
        class: ae(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Ie(l.value)
      }, [
        (c(!0), _(fe, null, he(n.items, (f, h) => (c(), Q(n_, qe({
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
          icon: re((p) => [
            we(d.$slots, "icon", qe({ ref_for: !0 }, p))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, o_));
  }
}), s_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function a_(n, e) {
  return c(), _("svg", s_, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const i_ = { render: a_ }, l_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function r_(n, e) {
  return c(), _("svg", l_, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const d_ = { render: r_ }, Kt = /* @__PURE__ */ ce({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (c(), _("div", null, [
      n.direction === "asc" ? (c(), Q(a(i_), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : N("", !0),
      n.direction === "desc" ? (c(), Q(a(d_), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : N("", !0)
    ]));
  }
}), c_ = { class: "vuefinder__explorer__header" }, u_ = /* @__PURE__ */ ce({
  __name: "ExplorerHeader",
  setup(n) {
    const e = de(), t = e.fs, { t: s } = e.i18n, i = se(t.sort);
    return (r, l) => (c(), _("div", c_, [
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: l[0] || (l[0] = (d) => a(t).toggleSort("basename"))
      }, [
        be(y(a(s)("Name")) + " ", 1),
        ge(G(Kt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "basename"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: l[1] || (l[1] = (d) => a(t).toggleSort("file_size"))
      }, [
        be(y(a(s)("Size")) + " ", 1),
        ge(G(Kt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "file_size"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: l[2] || (l[2] = (d) => a(t).toggleSort("last_modified"))
      }, [
        be(y(a(s)("Date")) + " ", 1),
        ge(G(Kt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function v_(n, e) {
  const {
    scrollContainer: t,
    itemWidth: s = 100,
    rowHeight: i,
    overscan: r = 2,
    containerPadding: l = 48,
    lockItemsPerRow: d
  } = e, u = n, f = () => typeof i == "number" ? i : i.value, h = () => s ? typeof s == "number" ? s : s.value : 100, p = () => l ? typeof l == "number" ? l : l.value : 0, v = D(0), k = D(6), b = D(600);
  let $ = null;
  const m = O(() => Math.ceil(u.value.length / k.value)), w = O(() => m.value * f()), g = O(() => {
    const J = f(), W = Math.max(0, Math.floor(v.value / J) - r), E = Math.min(
      m.value,
      Math.ceil((v.value + b.value) / J) + r
    );
    return { start: W, end: E };
  }), F = O(() => {
    const { start: J, end: W } = g.value;
    return Array.from({ length: W - J }, (E, T) => J + T);
  }), C = () => b.value, L = () => typeof d == "object" ? d.value : !1, S = () => {
    if (L()) {
      k.value = 1;
      return;
    }
    if (t.value) {
      const J = p(), W = t.value.clientWidth - J, E = h();
      E > 0 && (k.value = Math.max(Math.floor(W / E), 2));
    }
  }, R = (J) => {
    const W = J.target;
    v.value = W.scrollTop;
  };
  me(
    () => u.value.length,
    () => {
      S();
    }
  ), s && typeof s != "number" && me(s, () => {
    S();
  }), l && typeof l != "number" && me(l, () => {
    S();
  }), i && typeof i != "number" && me(i, () => {
  });
  const H = (J, W) => {
    if (!J || !Array.isArray(J))
      return [];
    const E = W * k.value;
    return J.slice(E, E + k.value);
  }, oe = (J, W, E, T, z) => {
    if (!J || !Array.isArray(J))
      return [];
    const X = [];
    for (let ve = W; ve <= E; ve++)
      for (let B = T; B <= z; B++) {
        const A = ve * k.value + B;
        A < J.length && J[A] && X.push(J[A]);
      }
    return X;
  }, ne = (J) => ({
    row: Math.floor(J / k.value),
    col: J % k.value
  });
  return ke(async () => {
    await Oe(), t.value && (b.value = t.value.clientHeight || 600), S(), window.addEventListener("resize", () => {
      t.value && (b.value = t.value.clientHeight || 600), S();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((J) => {
      const W = J[0];
      W && (b.value = Math.round(W.contentRect.height)), S();
    }), $.observe(t.value));
  }), Ae(() => {
    window.removeEventListener("resize", S), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: v,
    itemsPerRow: k,
    totalRows: m,
    totalHeight: w,
    visibleRange: g,
    visibleRows: F,
    updateItemsPerRow: S,
    handleScroll: R,
    getRowItems: H,
    getItemsInRange: oe,
    getItemPosition: ne,
    getContainerHeight: C
  };
}
function f_(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: s,
    getKey: i,
    selectionObject: r,
    rowHeight: l,
    itemWidth: d,
    osInstance: u
  } = n, f = () => typeof d == "number" ? d : d.value, h = Math.floor(Math.random() * 2 ** 32).toString(), p = de(), v = p.fs, k = se(v.selectedKeys), b = se(v.sortedFiles), $ = O(() => {
    const B = /* @__PURE__ */ new Map();
    return b.value && b.value.forEach((A) => {
      B.set(i(A), A);
    }), B;
  }), m = D(/* @__PURE__ */ new Set()), w = D(!1), g = D(!1), F = (B) => B.map((A) => A.getAttribute("data-key")).filter((A) => !!A), C = (B) => {
    B.selection.clearSelection(!0, !0);
  }, L = (B) => {
    if (k.value && k.value.size > 0) {
      const A = document.querySelectorAll(`.file-item-${h}[data-key]`), q = /* @__PURE__ */ new Map();
      A.forEach((V) => {
        const I = V.getAttribute("data-key");
        I && q.set(I, V);
      });
      const x = [];
      k.value.forEach((V) => {
        const I = q.get(V);
        I && S(V) && x.push(I);
      }), x.forEach((V) => {
        B.selection.select(V, !0);
      });
    }
  }, S = (B) => {
    const A = $.value.get(B);
    if (!A) return !1;
    const q = p.selectionFilterType, x = p.selectionFilterMimeIncludes;
    return q === "files" && A.type === "dir" || q === "dirs" && A.type === "file" ? !1 : x && Array.isArray(x) && x.length > 0 ? A.type === "dir" ? !0 : A.mime_type ? x.some((V) => A.mime_type?.startsWith(V)) : !1 : !0;
  }, R = (B) => {
    if (p.selectionMode === "single")
      return !1;
    w.value = !1, !B.event?.metaKey && !B.event?.ctrlKey && (g.value = !0), B.selection.resolveSelectables(), C(B), L(B);
  }, H = D(0), oe = ({ event: B, selection: A }) => {
    H.value = (r.value?.getAreaLocation().y1 ?? 0) - (p.root.getBoundingClientRect().top ?? 0);
    const q = document.querySelector(
      ".selection-area-container"
    );
    if (q && (q.dataset.theme = p.theme.current), p.selectionMode === "single")
      return;
    const x = B;
    x && "type" in x && x.type === "touchend" && x.preventDefault();
    const V = B;
    !V?.ctrlKey && !V?.metaKey && (v.clearSelection(), A.clearSelection(!0, !0)), m.value.clear();
  }, ne = (B) => {
    if (p.selectionMode === "single")
      return;
    const A = F(B.store.changed.added), q = F(B.store.changed.removed);
    g.value = !1, w.value = !0, A.forEach((x) => {
      k.value && !k.value.has(x) && S(x) && (m.value.add(x), v.select(x, p.selectionMode || "multiple"));
    }), q.forEach((x) => {
      document.querySelector(`[data-key="${x}"]`) && $.value.has(x) && m.value.delete(x), v.deselect(x);
    }), B.selection.resolveSelectables(), L(B);
  }, J = () => {
    m.value.clear();
  }, W = (B) => {
    if (!B.event)
      return;
    const A = document.querySelector(".scroller-" + h);
    if (!A)
      return;
    const q = A.getBoundingClientRect(), x = q.left, V = q.top;
    let I = A.scrollTop;
    if (u?.value) {
      const { viewport: Xe } = u.value.elements();
      Xe && (I = Xe.scrollTop);
    }
    const P = r.value?.getAreaLocation();
    if (!P)
      return;
    const j = Math.min(P.x1, P.x2), U = I + Math.min(P.y1, P.y2), Y = Math.max(P.x1, P.x2), Z = I + Math.max(P.y1, P.y2), K = 4, M = f();
    let ee = Math.floor((j - x - K) / M), _e = Math.floor((Y - x - K) / M);
    const ye = j - x - K - ee * M, De = Y - x - K - _e * M;
    ye > M - K && (ee = ee + 1), De < K && (_e = _e - 1);
    const Je = Math.max(0, ee), te = Math.min(e.value - 1, _e);
    let ie = Math.floor((U - V - K) / l.value), le = Math.floor((Z - V - K) / l.value);
    const ue = U - V - K - ie * l.value, He = Z - V - K - le * l.value, Me = Math.floor((t.value - K) / l.value);
    ue > l.value - K && (ie = ie + 1), He < K && (le = le - 1);
    const Ee = Math.max(0, ie), Ye = Math.min(le, Me), Le = s(
      b.value,
      Ee,
      Ye,
      Je,
      te
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
  }, E = (B) => {
    W(B), C(B), L(B), v.setSelectedCount(k.value?.size || 0), w.value = !1;
  }, T = () => {
    let B = [".scroller-" + h];
    if (u?.value) {
      const { viewport: A } = u.value.elements();
      A && (B = A);
    }
    r.value = new Io({
      selectables: [
        ".file-item-" + h + ":not(.vf-explorer-item--unselectable):not(.vf-explorer-item--no-select)"
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
    }), r.value.on("beforestart", R), r.value.on("start", oe), r.value.on("move", ne), r.value.on("stop", E);
  }, z = () => {
    r.value && (r.value.destroy(), r.value = null);
  }, X = () => {
    r.value && (Array.from(
      k.value ?? /* @__PURE__ */ new Set()
    ).forEach((A) => {
      S(A) || v.deselect(A);
    }), z(), T());
  }, ve = (B) => {
    g.value && (r.value?.clearSelection(), J(), g.value = !1);
    const A = B;
    !m.value.size && !g.value && !A?.ctrlKey && !A?.metaKey && (v.clearSelection(), r.value?.clearSelection());
  };
  return ke(() => {
    const B = (A) => {
      !A.buttons && w.value && (w.value = !1);
    };
    document.addEventListener("dragleave", B), Ae(() => {
      document.removeEventListener("dragleave", B);
    });
  }), {
    explorerId: h,
    isDragging: w,
    initializeSelectionArea: T,
    updateSelectionArea: X,
    handleContentClick: ve
  };
}
function __(n) {
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
function p_(n) {
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
function m_(n, e, t, s, i, r, l) {
  const d = n.fs, { canSelectItem: u } = __(n), { openItem: f } = p_(n), h = (m) => {
    const w = m.target?.closest(".file-item-" + e);
    if (!w) return null;
    const g = String(w.getAttribute("data-key")), F = t.value?.find((C) => $e(C) === g);
    return { key: g, item: F };
  }, p = () => {
    const m = s.value;
    return t.value?.filter((w) => m?.has($e(w))) || [];
  };
  return {
    handleItemClick: (m) => {
      const w = h(m);
      if (!w) return;
      const { key: g, item: F } = w, C = m;
      if (!u(F)) {
        F?.type === "dir" && (d.clearSelection(), i.value?.clearSelection(!0, !0), d.setSelectedCount(0));
        return;
      }
      const L = n.selectionMode || "multiple";
      !C?.ctrlKey && !C?.metaKey && (m.type !== "touchstart" || !d.isSelected(g)) && (d.clearSelection(), i.value?.clearSelection(!0, !0)), i.value?.resolveSelectables(), m.type === "touchstart" && d.isSelected(g) ? d.select(g, L) : d.toggleSelect(g, L), d.setSelectedCount(s.value?.size || 0);
    },
    handleItemDblClick: (m) => {
      const w = h(m);
      if (!w) return;
      const { item: g } = w;
      g && (g.type === "file" && !u(g) || f(g, r, l));
    },
    handleItemContextMenu: (m) => {
      m.preventDefault(), m.stopPropagation();
      const w = h(m);
      if (!w) return;
      const { key: g, item: F } = w;
      u(F) && (s.value?.has(g) || (d.clearSelection(), d.select(g)), n.emitter.emit("vf-contextmenu-show", {
        event: m,
        items: p(),
        target: F
      }));
    },
    handleContentContextMenu: (m) => {
      m.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: m, items: p() });
    },
    getSelectedItems: p
  };
}
function h_(n, e) {
  const t = D(null);
  return ke(() => {
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
const g_ = 4, w_ = 600;
function y_(n, e) {
  const t = D(null), s = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  return ke(() => {
    n.value && (t.value = new Wt({
      elements_selector: ".lazy",
      container: n.value,
      // Put the placeholder back so the browser doesn't show a broken-image
      // icon (the "?" thumbnail) while we retry.
      restore_on_error: !0,
      callback_error: (r, l) => {
        const d = (s.get(r) ?? 0) + 1;
        if (d > g_) return;
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
const b_ = { class: "vuefinder__explorer__container" }, k_ = {
  key: 0,
  class: "vuefinder__linear-loader"
}, $_ = /* @__PURE__ */ ce({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = de(), s = xt(t, ["vuefinder__drag-over"]), i = st("dragImage"), r = ft(null), l = st("scrollContainer"), d = st("scrollContent"), u = t.fs, f = t.config, h = se(f.state), p = se(u.sortedFiles), v = se(u.selectedKeys), k = se(u.loading), b = (M) => v.value?.has(M) ?? !1, $ = O(() => {
      if (h.value?.view === "grid") {
        const ye = h.value?.gridItemHeight ?? 80, De = h.value?.gridItemGap ?? 8;
        return ye + De * 2;
      }
      const ee = h.value?.listItemHeight ?? 32, _e = h.value?.listItemGap ?? 2;
      return ee + _e * 2;
    }), m = O(() => {
      if (h.value?.view === "grid") {
        const ee = h.value?.gridItemWidth ?? 96, _e = h.value?.gridItemGap ?? 8;
        return ee + _e * 2;
      }
      return 104;
    }), w = O(() => h.value?.view === "grid" ? (h.value?.gridItemGap ?? 8) * 2 : 0), { t: g } = t.i18n, {
      itemsPerRow: F,
      totalHeight: C,
      visibleRows: L,
      handleScroll: S,
      getRowItems: R,
      getItemsInRange: H,
      updateItemsPerRow: oe
    } = v_(
      O(() => p.value ?? []),
      {
        scrollContainer: l,
        itemWidth: m,
        rowHeight: $,
        overscan: 2,
        containerPadding: w,
        lockItemsPerRow: O(() => h.value.view === "list")
      }
    ), { osInstance: ne } = h_(l, S), { explorerId: J, isDragging: W, initializeSelectionArea: E, updateSelectionArea: T, handleContentClick: z } = f_({
      itemsPerRow: F,
      totalHeight: C,
      getItemsInRange: H,
      getKey: (M) => $e(M),
      selectionObject: r,
      rowHeight: $,
      itemWidth: m,
      osInstance: ne
    }), X = D(null), ve = (M) => {
      if (!M || !X.value) return !1;
      const ee = v.value?.has(X.value) ?? !1;
      return W.value && (ee ? v.value?.has(M) ?? !1 : M === X.value);
    };
    me(
      () => f.get("view"),
      (M) => {
        M === "list" ? F.value = 1 : oe();
      },
      { immediate: !0 }
    ), me(F, (M) => {
      f.get("view") === "list" && M !== 1 && (F.value = 1);
    });
    const B = (M) => p.value?.[M];
    y_(l, t);
    const { handleItemClick: A, handleItemDblClick: q, handleItemContextMenu: x, handleContentContextMenu: V } = m_(
      t,
      J,
      p,
      v,
      r,
      e.onFileDclick,
      e.onFolderDclick
    );
    ke(() => {
      const M = () => {
        r.value || E(), r.value && r.value.on("beforestart", ({ event: ee }) => {
          const _e = ee?.target === d.value;
          if (!ee?.metaKey && !ee?.ctrlKey && !ee?.altKey && !_e)
            return !1;
        });
      };
      if (ne.value)
        M();
      else {
        const ee = setInterval(() => {
          ne.value && (clearInterval(ee), M());
        }, 50);
        setTimeout(() => {
          clearInterval(ee), r.value || M();
        }, 500);
      }
      me(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], T, {
        deep: !0
      });
    });
    const I = (M) => {
      if (!(t.features?.move ?? !1) || M.altKey || M.ctrlKey || M.metaKey)
        return M.preventDefault(), !1;
      W.value = !0;
      const _e = M.target?.closest(
        ".file-item-" + J
      );
      if (X.value = _e ? String(_e.dataset.key) : null, M.dataTransfer && X.value) {
        M.dataTransfer.setDragImage(i.value, 0, 15), M.dataTransfer.effectAllowed = "all", M.dataTransfer.dropEffect = "copy";
        const ye = v.value?.has(X.value) ? Array.from(v.value) : [X.value];
        M.dataTransfer.setData("items", JSON.stringify(ye)), u.setDraggedItem(X.value);
      }
    }, P = () => {
      X.value = null;
    };
    let j = null, U = null;
    const Y = (M) => {
      M.target?.closest(".file-item-" + J) || (U = M, j && clearTimeout(j), j = setTimeout(() => {
        U && (U.cancelable && U.preventDefault(), U.stopPropagation(), V(U)), U = null, j = null;
      }, 500));
    }, Z = (M) => {
      j && (clearTimeout(j), j = null), U = null;
    }, K = (M) => {
      if (!U) return;
      const ee = U.touches[0] || U.changedTouches[0], _e = M.touches[0] || M.changedTouches[0];
      if (ee && _e) {
        const ye = Math.abs(_e.clientX - ee.clientX), De = Math.abs(_e.clientY - ee.clientY);
        (ye > 15 || De > 15) && (j && (clearTimeout(j), j = null), U = null);
      }
    };
    return (M, ee) => (c(), _("div", b_, [
      a(h).view === "list" ? (c(), Q(u_, { key: 0 })) : N("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: ae(["vuefinder__explorer__selector-area", "scroller-" + a(J)])
      }, [
        a(f).get("loadingIndicator") === "linear" && a(k) ? (c(), _("div", k_)) : N("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: d,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ie({ height: `${a(C)}px`, position: "relative", width: "100%" }),
          onContextmenu: ee[0] || (ee[0] = pe(
            //@ts-ignore
            (..._e) => a(V) && a(V)(..._e),
            ["self", "prevent"]
          )),
          onClick: ee[1] || (ee[1] = pe(
            //@ts-ignore
            (..._e) => a(z) && a(z)(..._e),
            ["self"]
          )),
          onTouchstartCapture: pe(Y, ["self"]),
          onTouchendCapture: pe(Z, ["self"]),
          onTouchmoveCapture: pe(K, ["self"]),
          onTouchcancelCapture: pe(Z, ["self"])
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            G(zf, {
              count: X.value && a(v).has(X.value) ? a(v).size : 1
            }, null, 8, ["count"])
          ], 512),
          a(h).view === "grid" ? (c(!0), _(fe, { key: 0 }, he(a(L), (_e) => (c(), Q(An, {
            key: _e,
            "row-index": _e,
            "row-height": $.value,
            view: "grid",
            "items-per-row": a(F),
            items: a(R)(a(p), _e),
            "show-thumbnails": a(h).showThumbnails,
            "is-dragging-item": ve,
            "is-selected": b,
            "drag-n-drop-events": (ye) => a(s).events(ye),
            "explorer-id": a(J),
            onClick: a(A),
            onDblclick: a(q),
            onContextmenu: a(x),
            onDragstart: I,
            onDragend: P
          }, {
            icon: re((ye) => [
              we(M.$slots, "icon", qe({ ref_for: !0 }, ye))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (c(!0), _(fe, { key: 1 }, he(a(L), (_e) => (c(), Q(An, {
            key: _e,
            "row-index": _e,
            "row-height": $.value,
            view: "list",
            items: B(_e) ? [B(_e)] : [],
            "is-dragging-item": ve,
            "is-selected": b,
            "drag-n-drop-events": (ye) => a(s).events(ye),
            "explorer-id": a(J),
            onClick: a(A),
            onDblclick: a(q),
            onContextmenu: a(x),
            onDragstart: I,
            onDragend: P
          }, {
            icon: re((ye) => [
              we(M.$slots, "icon", qe({ ref_for: !0 }, ye))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), x_ = ["href", "download"], S_ = { class: "vuefinder__context-menu__action vuefinder__context-menu__action--parent" }, C_ = { class: "vuefinder__context-menu vuefinder__context-menu__submenu" }, F_ = ["onClick"], E_ = ["onClick"], P_ = /* @__PURE__ */ ce({
  __name: "ContextMenu",
  setup(n) {
    const e = de(), t = D(null), s = D([]);
    let i = null, r = null, l = null, d = [], u = null;
    const f = Tt({
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
      const { event: b, items: $, target: m = null } = k || {};
      f.items = (e.contextMenuItems || []).filter((w) => w.show(e, {
        items: $,
        target: m
      })).sort((w, g) => {
        const F = w.order ?? 1 / 0, C = g.order ?? 1 / 0;
        return F - C;
      }), m ? $.length > 1 && $.some((w) => w.path === m.path) ? e.emitter.emit("vf-context-selected", $) : e.emitter.emit("vf-context-selected", [m]) : e.emitter.emit("vf-context-selected", []), v(b);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      f.active = !1, i && (i(), i = null), l && (d.forEach((k) => {
        k === window ? window.removeEventListener("scroll", l, !0) : k.removeEventListener("scroll", l, !0);
      }), l = null, d = []), u && (document.removeEventListener("mousedown", u, !0), document.removeEventListener("touchstart", u, !0), u = null), r = null, f.positions = {};
    });
    const v = async (k) => {
      i && (i(), i = null);
      const $ = ((S) => {
        if ("clientX" in S && "clientY" in S)
          return { x: S.clientX, y: S.clientY };
        const R = "touches" in S && S.touches[0] || "changedTouches" in S && S.changedTouches[0];
        return R ? { x: R.clientX, y: R.clientY } : { x: 0, y: 0 };
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
      await new Promise((S) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(S);
        });
      });
      const m = [
        pt(8),
        mt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        ht({ padding: 16 })
      ];
      let w = 0, g = 0;
      try {
        const S = await at(r, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: m
        });
        w = S.x, g = S.y;
      } catch (S) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", S);
        return;
      }
      f.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${w}px`,
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
      const C = ((S) => {
        const R = [];
        let H = S;
        for (; H && H !== document.body && H !== document.documentElement; ) {
          const oe = window.getComputedStyle(H), ne = oe.overflow + oe.overflowX + oe.overflowY;
          (ne.includes("scroll") || ne.includes("auto")) && R.push(H), H = H.parentElement;
        }
        return R;
      })(t.value);
      d = [window, ...C], l = () => {
        f.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const L = l;
      L && d.forEach((S) => {
        S === window ? window.addEventListener("scroll", L, !0) : S.addEventListener("scroll", L, !0);
      }), u = (S) => {
        if (!f.active) return;
        const R = S.target;
        if (!R || t.value && t.value.contains(R))
          return;
        const H = e.root;
        H && H.contains(R) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        u && (document.addEventListener("mousedown", u, !0), document.addEventListener("touchstart", u, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !r))
          try {
            i = Xt(r, t.value, async () => {
              if (!(!r || !t.value))
                try {
                  const { x: S, y: R } = await at(r, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: m
                  });
                  f.positions = {
                    ...f.positions,
                    left: `${S}px`,
                    top: `${R}px`
                  };
                } catch (S) {
                  console.warn("Floating UI positioning error:", S);
                }
            });
          } catch (S) {
            console.warn("Floating UI autoUpdate setup error:", S), i = null;
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
      class: ae([{
        "vuefinder__context-menu--active": f.active,
        "vuefinder__context-menu--inactive": !f.active
      }, "vuefinder__context-menu"]),
      style: Ie(f.positions)
    }, [
      (c(!0), _(fe, null, he(f.items, ($) => (c(), _("li", {
        key: $.title,
        class: ae(["vuefinder__context-menu__item", { "vuefinder__context-menu__item--has-children": $.children?.length }])
      }, [
        $.link ? (c(), _("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: h($),
          download: h($),
          onClick: b[0] || (b[0] = (m) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, y($.title(a(e).i18n)), 1)
        ], 8, x_)) : $.children?.length ? (c(), _(fe, { key: 1 }, [
          o("div", S_, [
            o("span", null, y($.title(a(e).i18n)), 1),
            b[1] || (b[1] = o("svg", {
              class: "vuefinder__context-menu__chevron",
              viewBox: "0 0 16 16",
              fill: "currentColor",
              "aria-hidden": "true"
            }, [
              o("path", { d: "M6 4l4 4-4 4z" })
            ], -1))
          ]),
          o("ul", C_, [
            (c(!0), _(fe, null, he($.children, (m) => (c(), _("li", {
              key: m.id,
              class: "vuefinder__context-menu__item"
            }, [
              o("div", {
                class: "vuefinder__context-menu__action",
                onClick: (w) => p(m)
              }, [
                o("span", null, y(m.title(a(e).i18n)), 1)
              ], 8, F_)
            ]))), 128))
          ])
        ], 64)) : (c(), _("div", {
          key: 2,
          class: "vuefinder__context-menu__action",
          onClick: (m) => p($)
        }, [
          o("span", null, y($.title(a(e).i18n)), 1)
        ], 8, E_))
      ], 2))), 128))
    ], 6)), [
      [Ge, f.active]
    ]);
  }
}), T_ = { class: "vuefinder__status-bar__wrapper" }, D_ = { class: "vuefinder__status-bar__storage" }, M_ = ["title"], I_ = { class: "vuefinder__status-bar__storage-icon" }, A_ = ["value"], O_ = ["value"], L_ = { class: "vuefinder__status-bar__info space-x-2" }, R_ = { key: 0 }, B_ = { class: "vuefinder__status-bar__size" }, z_ = { key: 1 }, V_ = { class: "vuefinder__status-bar__size" }, U_ = { class: "vuefinder__status-bar__actions" }, N_ = /* @__PURE__ */ ce({
  __name: "Statusbar",
  setup(n) {
    const e = de(), { t } = e.i18n, s = e.fs, i = se(s.sortedFiles), r = se(s.path), l = se(s.selectedCount), d = se(s.storages), u = se(s.selectedItems), f = se(s.path), h = (w) => {
      const g = w.target.value;
      e.adapter.open(g + "://");
    }, p = O(() => !u.value || u.value.length === 0 ? 0 : u.value.reduce((w, g) => w + (g.file_size || 0), 0)), v = O(() => !i.value || i.value.length === 0 ? 0 : i.value.reduce((w, g) => w + (g.file_size || 0), 0)), k = O(() => d.value), b = O(() => i.value), $ = O(() => l.value || 0), m = O(() => u.value || []);
    return console.log("sortedFilesList", b), (w, g) => (c(), _("div", T_, [
      o("div", D_, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(t)("Storage")
        }, [
          o("div", I_, [
            G(a(an))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: a(r).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: h
          }, [
            (c(!0), _(fe, null, he(k.value, (F) => (c(), _("option", {
              key: F,
              value: F
            }, y(F), 9, O_))), 128))
          ], 40, A_),
          g[0] || (g[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-": "",
            hidden: "true"
          }, null, -1))
        ], 8, M_),
        o("div", L_, [
          $.value === 0 ? (c(), _("span", R_, [
            be(y(b.value.length) + " " + y(a(t)("items")) + " ", 1),
            o("span", B_, " - " + y(a(e).filesize(v.value)), 1)
          ])) : (c(), _("span", z_, [
            be(y($.value) + " " + y(a(t)("selected")) + " ", 1),
            o("span", V_, y(a(e).filesize(p.value)), 1)
          ]))
        ])
      ]),
      o("div", U_, [
        we(w.$slots, "actions", {
          path: a(f).path,
          count: $.value || 0,
          selected: m.value
        })
      ])
    ]));
  }
});
function H_() {
  const n = de(), e = n.fs, t = n.config, { t: s } = n.i18n, { getStore: i, setStore: r } = n.storage, l = se(t.state), d = se(e.path), u = se(e.storages), f = xt(n, ["vuefinder__drag-over"]), h = O(
    () => l.value.pinnedFolders
  ), p = D(i("pinned-folders-opened", !0));
  return me(p, (m) => r("pinned-folders-opened", m)), {
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
    isActivePath: (m) => d.value?.path === m,
    openPath: (m) => {
      n.adapter.open(m);
    },
    removePin: (m) => {
      const w = t.get("pinnedFolders") ?? [];
      t.set("pinnedFolders", w.filter((g) => g.path !== m.path));
    }
  };
}
const j_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function K_(n, e) {
  return c(), _("svg", j_, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const q_ = { render: K_ };
function mo(n, e) {
  const t = n.findIndex((s) => s.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const W_ = { class: "vuefinder__folder-loader-indicator" }, G_ = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, ho = /* @__PURE__ */ ce({
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
    const e = n, t = de(), s = Vn(n, "modelValue"), i = D(!1);
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
        Te(l, "Failed to fetch subfolders");
      } finally {
        i.value = !1;
      }
    };
    return (l, d) => (c(), _("div", W_, [
      i.value ? (c(), Q(a(Lt), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (c(), _("div", G_, [
        s.value ? (c(), Q(a(At), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : N("", !0),
        s.value ? N("", !0) : (c(), Q(a(It), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), Y_ = { key: 0 }, X_ = { class: "vuefinder__treesubfolderlist__no-folders" }, Q_ = { class: "vuefinder__treesubfolderlist__item-content" }, J_ = ["onClick"], Z_ = ["title", "onDblclick", "onClick"], ep = { class: "vuefinder__treesubfolderlist__item-icon" }, tp = { class: "vuefinder__treesubfolderlist__subfolder" }, np = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, op = /* @__PURE__ */ ce({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = de(), t = e.fs, s = xt(e, ["vuefinder__drag-over"]), i = D({}), r = e.config, l = se(r.state), { t: d } = e.i18n, u = se(t.path), f = n, h = D(null), p = D(50);
    ke(() => {
      f.path === f.storage + "://" && h.value && _t(h.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const v = O(() => {
      const F = e.treeViewData.find((C) => C.path === f.path)?.folders || [];
      return F.length > p.value ? F.slice(0, p.value) : F;
    }), k = O(() => e.treeViewData.find((F) => F.path === f.path)?.folders?.length || 0), b = O(() => k.value > p.value), $ = O(() => `${f.storage}://`), m = (g, F) => g === F || g.startsWith(`${F}/`);
    me(
      v,
      (g) => {
        const F = l.value.expandTreeByDefault && f.path === $.value, C = l.value.expandedTreePaths || [];
        g.forEach((L) => {
          const S = C.some(
            (R) => m(R, L.path)
          );
          (F || S) && i.value[L.path] === void 0 && (i.value[L.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const w = () => {
      p.value += 50;
    };
    return (g, F) => {
      const C = Bn("TreeSubfolderList", !0);
      return c(), _("ul", {
        ref_key: "parentSubfolderList",
        ref: h,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        v.value.length ? N("", !0) : (c(), _("li", Y_, [
          o("div", X_, y(a(d)("No folders")), 1)
        ])),
        (c(!0), _(fe, null, he(v.value, (L) => (c(), _("li", {
          key: L.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", Q_, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (S) => i.value[L.path] = !i.value[L.path]
            }, [
              G(ho, {
                modelValue: i.value[L.path],
                "onUpdate:modelValue": (S) => i.value[L.path] = S,
                storage: n.storage,
                path: L.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, J_),
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
              onDblclick: (S) => i.value[L.path] = !i.value[L.path],
              onClick: (S) => a(e).adapter.open(L.path)
            }), [
              o("div", ep, [
                a(u)?.path === L.path ? (c(), Q(a(Ot), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (c(), Q(a(ze), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: ae(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(u).path === L.path
                }])
              }, y(L.basename), 3)
            ], 16, Z_)
          ]),
          o("div", tp, [
            ge(G(C, {
              storage: f.storage,
              path: L.path
            }, null, 8, ["storage", "path"]), [
              [Ge, i.value[L.path]]
            ])
          ])
        ]))), 128)),
        b.value ? (c(), _("li", np, [
          o("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: w
          }, y(a(d)("load more")), 1)
        ])) : N("", !0)
      ], 512);
    };
  }
}), sp = /* @__PURE__ */ ce({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = de(), t = e.fs, s = e.config, i = n, r = se(s.state), l = O(() => {
      const k = r.value.expandedTreePaths || [], b = `${i.storage}://`;
      return k.some(
        ($) => $ === b || $.startsWith(`${b}`)
      );
    }), d = D(r.value.expandTreeByDefault || l.value), u = xt(e, ["vuefinder__drag-over"]), f = se(t.path), h = O(() => i.storage === f.value?.storage);
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
    return (k, b) => (c(), _(fe, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: b[2] || (b[2] = ($) => v(n.storage))
      }, [
        o("div", qe({
          class: ["vuefinder__treestorageitem__info", h.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, et(a(u).events(p), !0)), [
          o("div", {
            class: ae(["vuefinder__treestorageitem__icon", h.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            G(a(an))
          ], 2),
          o("div", null, y(n.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: b[1] || (b[1] = pe(($) => d.value = !d.value, ["stop"]))
        }, [
          G(ho, {
            modelValue: d.value,
            "onUpdate:modelValue": b[0] || (b[0] = ($) => d.value = $),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      ge(G(op, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ge, d.value]
      ])
    ], 64));
  }
}), ap = { class: "vuefinder__folder-indicator" }, ip = { class: "vuefinder__folder-indicator--icon" }, lp = /* @__PURE__ */ ce({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = Vn(n, "modelValue");
    return (t, s) => (c(), _("div", ap, [
      o("div", ip, [
        e.value ? (c(), Q(a(At), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : N("", !0),
        e.value ? N("", !0) : (c(), Q(a(It), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), rp = {
  key: 0,
  class: "vuefinder__treeview__header"
}, dp = { class: "vuefinder__treeview__pinned-label" }, cp = { class: "vuefinder__treeview__pin-text text-nowrap" }, up = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, vp = ["onClick"], fp = ["title"], _p = ["onClick"], pp = { key: 0 }, mp = { class: "vuefinder__treeview__no-pinned" }, hp = /* @__PURE__ */ ce({
  __name: "TreeView",
  setup(n) {
    const e = de(), { enabled: t } = Ne(), s = e.fs, i = e.config, r = se(i.state), l = se(s.sortedFiles), d = se(s.path), {
      t: u,
      storages: f,
      dragNDrop: h,
      pinnedFolders: p,
      pinnedFoldersOpened: v,
      togglePinnedFoldersOpened: k,
      openPath: b,
      removePin: $
    } = H_(), m = O(() => f.value || []), w = D(190), g = (C) => {
      const L = C.clientX, S = C.target.parentElement;
      if (!S) return;
      const R = S.getBoundingClientRect().width;
      S.classList.remove("transition-[width]"), S.classList.add("transition-none");
      const H = (ne) => {
        w.value = R + ne.clientX - L, w.value < 50 && (w.value = 0, i.set("showTreeView", !1)), w.value > 50 && i.set("showTreeView", !0);
      }, oe = () => {
        const ne = S.getBoundingClientRect();
        w.value = ne.width, S.classList.add("transition-[width]"), S.classList.remove("transition-none"), window.removeEventListener("mousemove", H), window.removeEventListener("mouseup", oe);
      };
      window.addEventListener("mousemove", H), window.addEventListener("mouseup", oe);
    }, F = D(null);
    return ke(() => {
      F.value && _t(F.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), me(l, (C) => {
      const L = C.filter((S) => S.type === "dir");
      mo(e.treeViewData, {
        path: d.value.path || "",
        folders: L.map((S) => ({
          storage: S.storage,
          path: S.path,
          basename: S.basename,
          type: "dir"
        }))
      });
    }), (C, L) => (c(), _(fe, null, [
      o("div", {
        class: ae(["vuefinder__treeview__overlay", a(r).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: L[0] || (L[0] = (S) => a(i).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: Ie(
          a(r).showTreeView ? "min-width:100px;max-width:75%; width: " + w.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: F,
          class: "vuefinder__treeview__scroll"
        }, [
          we(C.$slots, "tree-view", {
            pinnedFolders: a(p),
            pinnedFoldersOpened: a(v),
            togglePinnedFoldersOpened: a(k),
            removePin: a($),
            storages: m.value,
            currentPath: a(d),
            openPath: a(b)
          }, () => [
            a(t)("pinned") ? (c(), _("div", rp, [
              o("div", {
                class: "vuefinder__treeview__pinned-toggle",
                onClick: L[2] || (L[2] = //@ts-ignore
                (...S) => a(k) && a(k)(...S))
              }, [
                o("div", dp, [
                  G(a(wt), { class: "vuefinder__treeview__pin-icon" }),
                  o("div", cp, y(a(u)("Pinned Folders")), 1)
                ]),
                G(lp, {
                  modelValue: a(v),
                  "onUpdate:modelValue": L[1] || (L[1] = (S) => zn(v) ? v.value = S : null)
                }, null, 8, ["modelValue"])
              ]),
              a(v) ? (c(), _("ul", up, [
                (c(!0), _(fe, null, he(a(p), (S) => (c(), _("li", {
                  key: S.path,
                  class: "vuefinder__treeview__pinned-item"
                }, [
                  o("div", qe({ class: "vuefinder__treeview__pinned-folder" }, et(a(h).events(S), !0), {
                    onClick: (R) => a(b)(S.path)
                  }), [
                    a(d).path !== S.path ? (c(), Q(a(ze), {
                      key: 0,
                      class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                    })) : N("", !0),
                    a(d).path === S.path ? (c(), Q(a(Ot), {
                      key: 1,
                      class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                    })) : N("", !0),
                    o("div", {
                      title: S.path,
                      class: ae(["vuefinder__treeview__folder-name", {
                        "vuefinder__treeview__folder-name--active": a(d).path === S.path
                      }])
                    }, y(S.basename), 11, fp)
                  ], 16, vp),
                  o("div", {
                    class: "vuefinder__treeview__remove-folder",
                    onClick: (R) => a($)(S)
                  }, [
                    G(a(q_), { class: "vuefinder__treeview__remove-icon" })
                  ], 8, _p)
                ]))), 128)),
                a(p).length ? N("", !0) : (c(), _("li", pp, [
                  o("div", mp, y(a(u)("No folders pinned")), 1)
                ]))
              ])) : N("", !0)
            ])) : N("", !0),
            (c(!0), _(fe, null, he(m.value, (S) => (c(), _("div", {
              key: S,
              class: "vuefinder__treeview__storage"
            }, [
              G(sp, { storage: S }, null, 8, ["storage"])
            ]))), 128))
          ])
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: g
        }, null, 32)
      ], 4)
    ], 64));
  }
}), Pe = {
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
function gp(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function xe(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, s) => !(e.needsSearchQuery !== !!s.searchQuery || e.target !== void 0 && e.target !== gp(s) || e.targetType !== void 0 && e.targetType !== s.target?.type || e.mimeType !== void 0 && e.mimeType !== s.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function ut(...n) {
  return (e, t) => n.some((s) => s(e, t));
}
function nt(...n) {
  return (e, t) => n.every((s) => s(e, t));
}
const go = [
  {
    id: Pe.openDir,
    title: ({ t: n }) => n("Open containing folder"),
    action: (n, e) => {
      const t = e[0];
      t && n.adapter.open(t.dir);
    },
    show: xe({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: Pe.refresh,
    title: ({ t: n }) => n("Refresh"),
    action: (n) => {
      const e = n.fs;
      n.adapter.invalidateListQuery(e.path.get().path), n.adapter.open(e.path.get().path);
    },
    show: ut(xe({ target: "none" }), xe({ target: "many" })),
    order: 20
  },
  {
    id: Pe.selectAll,
    title: ({ t: n }) => n("Select All"),
    action: (n) => {
      n.fs.selectAll(n.selectionMode || "multiple");
    },
    show: (n, e) => n.selectionMode === "multiple" && xe({ target: "none" })(n, e),
    order: 30
  },
  {
    id: Pe.new_folder,
    title: ({ t: n }) => n("New Folder"),
    action: (n) => n.modal.open(cn),
    show: xe({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: Pe.open,
    title: ({ t: n }) => n("Open"),
    action: (n, e) => {
      e[0] && n.adapter.open(e[0].path);
    },
    show: xe({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: Pe.pinFolder,
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
    id: Pe.unpinFolder,
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
    id: Pe.preview,
    title: ({ t: n }) => n("Preview"),
    action: (n, e) => n.modal.open(Qe, { storage: e[0]?.storage, item: e[0] }),
    show: nt(
      xe({ target: "one", feature: "preview" }),
      (n, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: Pe.openAs,
    title: ({ t: n }) => n("Preview as"),
    action: () => {
    },
    children: [
      {
        id: Pe.openAsText,
        title: ({ t: n }) => n("Text"),
        action: (n, e) => n.modal.open(Qe, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "text"
        }),
        show: () => !0
      },
      {
        id: Pe.openAsImage,
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
    id: Pe.download,
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
    id: Pe.rename,
    title: ({ t: n }) => n("Rename"),
    action: (n, e) => n.modal.open(Mt, { items: e }),
    show: xe({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: Pe.move,
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
    id: Pe.copy,
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
    id: Pe.paste,
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
    id: Pe.archive,
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
    id: Pe.unarchive,
    title: ({ t: n }) => n("Unarchive"),
    action: (n, e) => n.modal.open(vn, { items: e }),
    show: xe({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: Pe.delete,
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
], wp = ["data-theme"], yp = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, bp = { class: "vuefinder__external-drop-message" }, kp = { class: "vuefinder__main__content" }, $p = /* @__PURE__ */ ce({
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
    const t = e, s = n, i = de(), r = st("root"), l = i.config;
    me(
      () => s.features,
      (g) => {
        const F = Hn(g);
        Object.keys(i.features).forEach((C) => {
          delete i.features[C];
        }), Object.assign(i.features, F);
      },
      { deep: !0 }
    );
    const d = i.fs, u = se(i.i18n.localeAtom), f = se(l.state), h = O(() => {
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
    function m(g) {
      d.setPath(g.dirname), l.get("persist") && l.set("path", g.dirname), d.setReadOnly(g.read_only ?? !1), i.modal.close(), d.setFiles(g.files), d.clearSelection(), d.setSelectedCount(0), d.setStorages(g.storages);
    }
    i.adapter.onBeforeOpen = () => {
      d.setLoading(!0);
    }, i.adapter.onAfterOpen = (g) => {
      m(g), d.setLoading(!1);
    }, i.emitter.on("vf-fetch-abort", () => {
      i.adapter.cancelOpen(), d.setLoading(!1);
    }), i.emitter.on("vf-upload-complete", (g) => {
      t("upload-complete", g);
    }), i.emitter.on("vf-delete-complete", (g) => {
      t("delete-complete", g);
    }), i.emitter.on("vf-notify", (g) => {
      t("notify", g);
      const { type: F, message: C } = g ?? {};
      F === "error" && t("error", C);
    }), i.emitter.on("vf-file-dclick", (g) => {
      t("file-dclick", g);
    }), i.emitter.on("vf-folder-dclick", (g) => {
      t("folder-dclick", g);
    }), me(
      () => s.config?.theme,
      (g) => {
        g && l.set("theme", a(g));
      },
      { immediate: !0 }
    ), me(
      u,
      (g, F) => {
        g !== F && t("update:locale", String(g));
      },
      { immediate: !1 }
    ), ke(() => {
      i.root = r.value, me(
        () => l.get("path"),
        (F) => {
          i.adapter.open(F);
        }
      );
      const g = l.get("persist") ? l.get("path") : l.get("initialPath") ?? "";
      d.setPath(g), i.adapter.open(g), d.path.listen((F) => {
        t("path-change", F.path);
      }), d.selectedItems.listen((F) => {
        t("select", F);
      }), t("ready");
    });
    const w = async (g) => {
      const F = await $(g);
      F.length > 0 && (i.modal.open(un), setTimeout(() => {
        i.emitter.emit(
          "vf-external-files-dropped",
          F.map((C) => ({ file: C.file, name: C.relativePath }))
        );
      }, 100));
    };
    return (g, F) => (c(), _("div", {
      ref_key: "root",
      ref: r,
      tabindex: "0",
      class: ae(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": a(p) }]),
      "data-theme": a(i).theme.current,
      style: Ie(h.value),
      onDragenter: F[2] || (F[2] = //@ts-ignore
      (...C) => a(v) && a(v)(...C)),
      onDragover: F[3] || (F[3] = //@ts-ignore
      (...C) => a(k) && a(k)(...C)),
      onDragleave: F[4] || (F[4] = //@ts-ignore
      (...C) => a(b) && a(b)(...C)),
      onDrop: w
    }, [
      o("div", {
        class: ae(a(i).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: ae([
            a(f)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: F[0] || (F[0] = (C) => a(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: F[1] || (F[1] = (C) => a(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          a(p) ? (c(), _("div", yp, [
            o("div", bp, y(a(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : N("", !0),
          a(f).showMenuBar ? (c(), Q(Wu, { key: 1 }, {
            "menubar-start": re((C) => [
              we(g.$slots, "menubar-start", Ce(Fe(C)))
            ]),
            "menu-items": re((C) => [
              we(g.$slots, "menu-items", Ce(Fe(C)))
            ]),
            "menubar-end": re((C) => [
              we(g.$slots, "menubar-end", Ce(Fe(C)))
            ]),
            _: 3
          })) : N("", !0),
          a(f).showToolbar ? (c(), Q(Yv, { key: 2 }, {
            "toolbar-items": re((C) => [
              we(g.$slots, "toolbar-items", Ce(Fe(C)))
            ]),
            _: 3
          })) : N("", !0),
          a(f).showBreadcrumbBar ? (c(), Q(Af, { key: 3 }, {
            "breadcrumb-actions": re((C) => [
              we(g.$slots, "breadcrumb-actions", Ce(Fe(C)))
            ]),
            _: 3
          })) : N("", !0),
          o("div", kp, [
            G(hp, null, {
              "tree-view": re((C) => [
                we(g.$slots, "tree-view", Ce(Fe(C)))
              ]),
              _: 3
            }),
            G($_, {
              "on-file-dclick": s.onFileDclick,
              "on-folder-dclick": s.onFolderDclick
            }, {
              icon: re((C) => [
                we(g.$slots, "icon", Ce(Fe(C)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          G(N_, null, {
            actions: re((C) => [
              we(g.$slots, "status-bar", Ce(Fe(C)))
            ]),
            _: 3
          })
        ], 34),
        (c(), Q(kt, { to: "body" }, [
          G(xo, { name: "fade" }, {
            default: re(() => [
              a(i).modal.visible ? (c(), Q(On(a(i).modal.type), { key: 0 })) : N("", !0)
            ]),
            _: 1
          })
        ])),
        G(P_, { items: a(go) }, null, 8, ["items"]),
        a(f).notificationsEnabled ? (c(), Q(a(Fo), {
          key: 0,
          position: a(f).notificationPosition,
          duration: a(f).notificationDuration,
          "visible-toasts": a(f).notificationVisibleToasts,
          "rich-colors": a(f).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : N("", !0)
      ], 2)
    ], 46, wp));
  }
}), xp = /* @__PURE__ */ ce({
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
    }), (i, r) => (c(), Q($p, Ce(Fe(e)), {
      icon: re((l) => [
        we(i.$slots, "icon", Ce(Fe(l)))
      ]),
      "status-bar": re((l) => [
        we(i.$slots, "status-bar", Ce(Fe(l)))
      ]),
      "menubar-start": re((l) => [
        we(i.$slots, "menubar-start", Ce(Fe(l)))
      ]),
      "menu-items": re((l) => [
        we(i.$slots, "menu-items", Ce(Fe(l)))
      ]),
      "menubar-end": re((l) => [
        we(i.$slots, "menubar-end", Ce(Fe(l)))
      ]),
      "toolbar-items": re((l) => [
        we(i.$slots, "toolbar-items", Ce(Fe(l)))
      ]),
      "breadcrumb-actions": re((l) => [
        we(i.$slots, "breadcrumb-actions", Ce(Fe(l)))
      ]),
      "tree-view": re((l) => [
        we(i.$slots, "tree-view", Ce(Fe(l)))
      ]),
      _: 3
    }, 16));
  }
});
function Up(n) {
  const e = de(n), t = se(e.fs.path), s = O(() => t.value?.path ?? ""), i = (l) => l || e.fs.path.get().path || "", r = (l) => {
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
const Np = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", xp);
  }
};
export {
  Yo as A,
  Zt as B,
  Pe as C,
  Vp as I,
  Wn as R,
  Np as V,
  op as _,
  xp as a,
  vf as b,
  Bo as c,
  Ou as d,
  H_ as e,
  Up as f,
  go as m,
  kn as p,
  de as u
};
