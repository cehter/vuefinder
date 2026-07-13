import { inject as Ct, reactive as Pt, watch as pe, ref as I, computed as R, shallowRef as vt, markRaw as go, defineComponent as le, onMounted as we, nextTick as De, openBlock as c, createElementBlock as p, withKeys as He, unref as i, createElementVNode as o, withModifiers as _e, normalizeStyle as Pe, normalizeClass as te, renderSlot as Me, createCommentVNode as j, toDisplayString as y, createBlock as X, resolveDynamicComponent as On, withCtx as ue, createVNode as W, Fragment as fe, renderList as ge, withDirectives as he, vModelCheckbox as lt, vModelText as Ke, onBeforeUnmount as wt, defineAsyncComponent as Ln, Suspense as Rn, vShow as qe, onUnmounted as Te, useTemplateRef as st, createStaticVNode as St, createTextVNode as ye, createSlots as yo, Teleport as bt, resolveComponent as Bn, customRef as wo, isRef as bo, vModelSelect as Kt, vModelRadio as zt, mergeProps as je, toHandlers as Qe, normalizeProps as Je, guardReactiveProps as Ze, onUpdated as ko, useModel as zn, mergeModels as $o, Transition as xo, provide as So } from "vue";
import Co from "mitt";
import { useStore as oe } from "@nanostores/vue";
import { persistentAtom as Vn } from "@nanostores/persistent";
import { toast as xt, Toaster as Fo } from "vue-sonner";
import { atom as Le, computed as Xe } from "nanostores";
import { QueryClient as Eo, isCancelledError as Po } from "@tanstack/vue-query";
import To from "@uppy/core";
import qt from "vanilla-lazyload";
import { Cropper as Do } from "vue-advanced-cropper";
import { OverlayScrollbars as ft, SizeObserverPlugin as Mo } from "overlayscrollbars";
import { computePosition as it, offset as _t, flip as pt, shift as mt, autoUpdate as Xt } from "@floating-ui/dom";
import Io from "@viselect/vanilla";
import Ao from "@uppy/xhr-upload";
const Qt = /* @__PURE__ */ new Map(), Wt = /* @__PURE__ */ Symbol("ServiceContainerId");
function Oo(s, e) {
  Qt.set(s, e);
}
function Lo(s) {
  Qt.delete(s);
}
function ae(s) {
  const e = s ?? Ct(Wt);
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
function Ro(s) {
  const e = localStorage.getItem(s + "_storage"), t = Pt(JSON.parse(e ?? "{}"));
  pe(t, n);
  function n() {
    Object.keys(t).length ? localStorage.setItem(s + "_storage", JSON.stringify(t)) : localStorage.removeItem(s + "_storage");
  }
  function a(u, v) {
    t[u] = v;
  }
  function d(u) {
    delete t[u];
  }
  function l() {
    Object.keys(t).forEach((u) => d(u));
  }
  return { getStore: (u, v = null) => u in t ? t[u] : v, setStore: a, removeStore: d, clearStore: l };
}
function Fe(s, e = "An error occurred") {
  if (!s)
    return e;
  if (typeof s == "string")
    return s || e;
  if (s instanceof Error)
    return s.message || e;
  if (typeof s == "object" && s !== null) {
    const t = s;
    if (typeof t.message == "string" && t.message)
      return t.message;
    if (typeof t.error == "string" && t.error)
      return t.error;
  }
  return e;
}
function Bo(s, e) {
  return Vn(s, e, {
    encode: JSON.stringify,
    decode: JSON.parse
  });
}
function zo(s) {
  if (!s?.config?.get)
    return !0;
  try {
    return !!s.config.get("notificationsEnabled");
  } catch {
    return !0;
  }
}
function ot(s, e, t) {
  const n = { type: e, message: t };
  if (s?.emitter?.emit?.("vf-notify", n), !!zo(s))
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
function Be(s) {
  return {
    success(e) {
      ot(s, "success", e);
    },
    error(e) {
      ot(s, "error", e);
    },
    info(e) {
      ot(s, "info", e);
    },
    warning(e) {
      ot(s, "warning", e);
    },
    emit(e, t) {
      ot(s, e, t);
    }
  };
}
const Vt = /* @__PURE__ */ new Map();
async function Ut(s, e) {
  const t = e[s];
  return typeof t == "function" ? (await t()).default : t;
}
function Vo(s, e, t, n, a) {
  const d = Be({ emitter: t, config: a }), l = "vuefinder_locale", r = "global";
  let u;
  if (Vt.has(r))
    u = Vt.get(r), e && e !== u.get() && u.set(e);
  else {
    const C = localStorage.getItem(l) ? JSON.parse(localStorage.getItem(l)) : null;
    u = Bo(l, e || C || "en"), Vt.set(r, u);
  }
  const v = "vuefinder_translations", b = (C) => {
    try {
      const F = localStorage.getItem(v);
      if (F)
        return JSON.parse(F)[C] || null;
    } catch {
    }
    return null;
  }, h = (C, F) => {
    try {
      const E = localStorage.getItem(v), L = E ? JSON.parse(E) : {};
      L[C] = F, localStorage.setItem(v, JSON.stringify(L));
    } catch {
    }
  }, _ = oe(u), k = String(_.value), w = b(k), $ = I(w || {});
  let m = !1;
  !w && Object.keys(n).length > 0 && Ut(k, n).then((C) => {
    $.value = C, h(k, C);
  }).catch(() => {
  }), pe(
    _,
    async (C, F) => {
      if (F && C === F)
        return;
      if (!m) {
        m = !0;
        const L = b(String(C));
        if (L)
          $.value = L;
        else if (Object.keys(n).length > 0)
          try {
            const q = await Ut(String(C), n);
            $.value = q, h(String(C), q);
          } catch {
          }
        return;
      }
      const E = b(String(C));
      if (E)
        $.value = E;
      else
        try {
          const L = await Ut(String(C), n);
          $.value = L, h(String(C), L);
        } catch (L) {
          const q = Fe(L, "Locale cannot be loaded!");
          d.error(q);
          return;
        }
      Object.values(n).length > 1 && (d.success("The language is set to " + C), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const g = (C, ...F) => F.length ? g(C = C.replace("%s", String(F.shift())), ...F) : C;
  function f(C, ...F) {
    return $.value && Object.prototype.hasOwnProperty.call($.value, C) ? g($.value[C] || C, ...F) : g(C, ...F);
  }
  const x = R({
    get: () => _.value,
    set: (C) => {
      u.set(C);
    }
  });
  return Pt({ t: f, locale: x, localeAtom: u });
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
  advanced: Uo.reduce((s, e) => (s[e] = !0, s), {})
};
function gn() {
  return Un.advanced;
}
function Nn(s) {
  return s ? s === "simple" || s === "advanced" ? { ...Un[s] } : { ...gn(), ...s } : gn();
}
const No = "4.6.0-cehter.1";
function Jt(s, e, t, n, a) {
  return e = Math, t = e.log, n = 1024, a = t(s) / t(n) | 0, (s / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "iB" : "B");
}
function Hn(s, e, t, n, a) {
  return e = Math, t = e.log, n = 1e3, a = t(s) / t(n) | 0, (s / e.pow(n, a)).toFixed(0) + " " + (a ? "KMGTPEZY"[--a] + "B" : "B");
}
function Ho(s) {
  if (typeof s == "number") return s;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(s);
  if (!n) return 0;
  const a = parseFloat(n[1] || "0"), d = (n[2] || "").toLowerCase(), l = e[d] ?? 0;
  return Math.round(a * Math.pow(1024, l));
}
function jo(s) {
  const e = vt(null), t = I(!1), n = I(), a = I(!1), d = vt(null);
  return {
    visible: t,
    type: e,
    data: n,
    open: (h, _ = null) => {
      s.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = h, n.value = _;
    },
    close: () => {
      s.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null, a.value = !1, d.value = null;
    },
    setEditMode: (h) => {
      a.value = h;
    },
    editMode: a,
    controls: d,
    registerControls: (h) => {
      d.value = h;
    },
    unregisterControls: (h) => {
      d.value === h && (d.value = null);
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
}, Et = {
  initialPath: null,
  maxFileSize: null,
  loadingIndicator: "circular",
  showMenuBar: !0,
  showToolbar: !0,
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
  Object.keys(Et)
);
function qo(s) {
  return s || "silver";
}
function jn(s) {
  return Ko.has(s);
}
function yn(s) {
  const e = {}, t = {}, n = s;
  for (const a in n)
    if (jn(a))
      t[a] = n[a];
    else if (a in Ft) {
      const d = a;
      e[d] = n[a];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function wn(s, e) {
  const t = { ...Ft, ...s, ...e };
  return t.theme = qo(t.theme), t;
}
function bn(s, e) {
  return { ...Et, ...e, ...s };
}
const Wo = (s, e = {}) => {
  const t = `vuefinder_config_${s}`, { persistenceConfig: n, nonPersistenceConfig: a } = yn(e), d = wn(
    n,
    Ft
  ), l = bn(
    a,
    Et
  ), r = Vn(
    t,
    d,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), u = Le(l), v = Xe(
    [r, u],
    (m, g) => ({
      ...m,
      ...g
    })
  ), b = (m = {}) => {
    const g = r.get(), f = u.get(), { persistenceConfig: x, nonPersistenceConfig: C } = yn(m), F = wn(x, g), E = bn(
      C,
      f
    );
    r.set(F), u.set(E);
  }, h = (m) => jn(m) ? u.get()[m] : r.get()[m], _ = () => ({
    ...r.get(),
    ...u.get()
  }), k = (m, g) => {
    const f = r.get();
    typeof m == "object" && m !== null ? r.set({ ...f, ...m }) : r.set({
      ...f,
      [m]: g
    });
  };
  return {
    // Store atom (combined)
    state: v,
    // Methods
    init: b,
    get: h,
    set: k,
    toggle: (m) => {
      const g = r.get();
      k(m, !g[m]);
    },
    all: _,
    reset: () => {
      r.set({ ...Ft }), u.set({ ...Et });
    }
  };
}, ke = (s) => `${s.type}:${s.path}`;
function Kn(s, e) {
  if (typeof s == "string" && typeof e == "string")
    return s.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(s) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const Go = () => {
  const s = Le(""), e = Le([]), t = Le(!1), n = Le([]), a = Le({ active: !1, column: "", order: "" }), d = Le({
    kind: "all",
    showHidden: !1
  }), l = Le(/* @__PURE__ */ new Set()), r = Le({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), u = Le(null), v = Le(0), b = Le(!1), h = Le([]), _ = Le(-1), k = Xe([s], (J) => {
    const ne = (J ?? "").trim(), ie = ne.indexOf("://"), re = ie >= 0 ? ne.slice(0, ie) : "", Ee = (ie >= 0 ? ne.slice(ie + 3) : ne).split("/").filter(Boolean);
    let Se = "";
    const We = Ee.map((Ae) => (Se = Se ? `${Se}/${Ae}` : Ae, {
      basename: Ae,
      name: Ae,
      path: re ? `${re}://${Se}` : Se,
      type: "dir"
    }));
    return { storage: re, breadcrumb: We, path: ne };
  }), w = Xe([n, a, d], (J, ne, ie) => {
    let re = J;
    ie.kind === "files" ? re = re.filter((Ae) => Ae.type === "file") : ie.kind === "folders" && (re = re.filter((Ae) => Ae.type === "dir")), ie.showHidden || (re = re.filter((Ae) => !Ae.basename.startsWith(".")));
    const { active: Ue, column: Ee, order: Se } = ne;
    if (!Ue || !Ee) return re;
    const We = Se === "asc" ? 1 : -1;
    return re.slice().sort((Ae, Rt) => Kn(Ae[Ee], Rt[Ee]) * We);
  }), $ = Xe([n, l], (J, ne) => ne.size === 0 ? [] : J.filter((ie) => ne.has(ke(ie)))), m = (J, ne) => {
    const ie = s.get();
    if ((ne ?? !0) && ie !== J) {
      const re = h.get(), Ue = _.get();
      Ue < re.length - 1 && re.splice(Ue + 1), re.length === 0 && ie && re.push(ie), re.push(J), h.set([...re]), _.set(re.length - 1);
    }
    s.set(J);
  }, g = (J) => {
    n.set(J ?? []);
  }, f = (J) => {
    e.set(J ?? []);
  }, x = (J, ne) => {
    a.set({ active: !0, column: J, order: ne });
  }, C = (J) => {
    const ne = a.get();
    ne.active && ne.column === J ? a.set({
      active: ne.order === "asc",
      column: J,
      order: "desc"
    }) : a.set({
      active: !0,
      column: J,
      order: "asc"
    });
  }, F = () => {
    a.set({ active: !1, column: "", order: "" });
  }, E = (J, ne) => {
    d.set({ kind: J, showHidden: ne });
  }, L = () => {
    d.set({ kind: "all", showHidden: !1 });
  }, q = (J, ne = "multiple") => {
    const ie = new Set(l.get());
    ne === "single" && ie.clear(), ie.add(J), l.set(ie);
  }, Z = (J, ne = "multiple") => {
    const ie = new Set(l.get());
    ne === "single" && ie.clear(), J.forEach((re) => ie.add(re)), l.set(ie);
  }, ee = (J) => {
    const ne = new Set(l.get());
    ne.delete(J), l.set(ne);
  }, Q = (J) => l.get().has(J), G = (J, ne = "multiple") => {
    const ie = new Set(l.get());
    ie.has(J) ? ie.delete(J) : (ne === "single" && ie.clear(), ie.add(J)), l.set(ie);
  }, T = (J = "multiple", ne) => {
    if (J === "single") {
      const ie = n.get()[0];
      if (ie) {
        const re = ke(ie);
        l.set(/* @__PURE__ */ new Set([re])), v.set(1);
      }
    } else {
      if (ne?.selectionFilterType || ne?.selectionFilterMimeIncludes && ne.selectionFilterMimeIncludes.length > 0) {
        const ie = n.get().filter((re) => {
          const Ue = ne.selectionFilterType, Ee = ne.selectionFilterMimeIncludes;
          return Ue === "files" && re.type === "dir" || Ue === "dirs" && re.type === "file" ? !1 : Ee && Array.isArray(Ee) && Ee.length > 0 && re.type !== "dir" ? re.mime_type ? Ee.some((Se) => re.mime_type?.startsWith(Se)) : !1 : !0;
        }).map((re) => ke(re));
        l.set(new Set(ie));
      } else {
        const ie = new Set(n.get().map((re) => ke(re)));
        l.set(ie);
      }
      Y(l.get().size);
    }
  }, M = () => {
    l.set(/* @__PURE__ */ new Set()), v.set(0);
  }, U = (J) => {
    const ne = new Set(J ?? []), ie = new Set(
      n.get().filter((re) => ne.has(re.path)).map((re) => ke(re))
    );
    l.set(ie), v.set(ie.size);
  }, Y = (J) => {
    v.set(J);
  }, ce = (J) => {
    b.set(!!J);
  }, B = () => b.get(), S = (J, ne) => {
    const ie = n.get().filter((re) => ne.has(ke(re)));
    r.set({
      type: J,
      path: k.get().path,
      items: new Set(ie)
    });
  }, z = (J) => Xe([r], (ne) => ne.type === "cut" && Array.from(ne.items).some((ie) => ke(ie) === J)), P = (J) => Xe([r], (ne) => ne.type === "copy" && Array.from(ne.items).some((ie) => ke(ie) === J)), V = (J) => {
    const ne = z(J);
    return oe(ne).value ?? !1;
  }, A = (J) => {
    const ne = P(J);
    return oe(ne).value ?? !1;
  }, O = () => {
    r.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, H = () => r.get(), D = (J) => {
    u.set(J);
  }, N = () => u.get(), de = () => {
    u.set(null);
  }, me = () => {
    const J = h.get(), ne = _.get();
    if (ne > 0) {
      const ie = ne - 1, re = J[ie];
      re && (_.set(ie), m(re, !1));
    }
  }, K = () => {
    const J = h.get(), ne = _.get();
    if (ne < J.length - 1) {
      const ie = ne + 1, re = J[ie];
      re && (_.set(ie), m(re, !1));
    }
  }, se = Xe([_], (J) => J > 0), ve = Xe(
    [h, _],
    (J, ne) => ne < J.length - 1
  );
  return {
    // Atoms (state)
    files: n,
    storages: e,
    currentPath: s,
    sort: a,
    filter: d,
    selectedKeys: l,
    selectedCount: v,
    loading: b,
    draggedItem: u,
    clipboardItems: r,
    // Computed values
    path: k,
    sortedFiles: w,
    selectedItems: $,
    // Actions
    setPath: m,
    setFiles: g,
    setStorages: f,
    setSort: x,
    toggleSort: C,
    clearSort: F,
    setFilter: E,
    clearFilter: L,
    select: q,
    selectMultiple: Z,
    deselect: ee,
    toggleSelect: G,
    selectAll: T,
    isSelected: Q,
    clearSelection: M,
    setSelection: U,
    setSelectedCount: Y,
    setLoading: ce,
    isLoading: B,
    setClipboard: S,
    createIsCut: z,
    createIsCopied: P,
    isCut: V,
    isCopied: A,
    clearClipboard: O,
    getClipboard: H,
    setDraggedItem: D,
    getDraggedItem: N,
    clearDraggedItem: de,
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
    navigationHistory: h,
    historyIndex: _
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
      const [t, ...n] = e.split("://");
      return { storage: t, path: n.join("://") };
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
    const n = e ?? "";
    return n === "" ? `${t}://` : `${t}://${n}`;
  }
  split(e) {
    return this.parsePath(e);
  }
  normalizePath(e, t = this.defaultStorage) {
    const { storage: n, path: a } = this.split(e || ""), d = n || t;
    return this.combine(a ?? "", d);
  }
  parent(e) {
    const { storage: t, path: n } = this.split(e), a = t || this.defaultStorage;
    if (!n) return this.combine("", a);
    const d = n.replace(/\/+$/g, "").replace(/^\/+/, ""), l = d.lastIndexOf("/");
    return l <= 0 ? this.combine("", a) : this.combine(d.slice(0, l), a);
  }
  join(e, t) {
    const { storage: n, path: a } = this.split(e), d = n || this.defaultStorage, l = (a ?? "").replace(/\/$/, ""), r = l ? `${l}/${t}` : t;
    return this.combine(r, d);
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
    const t = this.files.slice(), n = t.findIndex((a) => a.path === e.path);
    n === -1 ? t.push(e) : t[n] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((n) => n.path !== e);
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], n = [];
    for (const a of this.files)
      this.isInTree(a.path, e) ? t.push(a) : n.push(a);
    this.replaceAll(n);
    for (const a of t)
      this.contentStore.delete(a.path);
    return t;
  }
  isInTree(e, t) {
    return e === t || e.startsWith(`${t}/`);
  }
  getTree(e, t = this.files) {
    return t.filter((n) => this.isInTree(n.path, e)).sort((n, a) => n.path.length - a.path.length);
  }
  uniqueName(e, t, n) {
    if (!n.has(this.join(e, t))) return t;
    const a = t.lastIndexOf("."), d = a > 0 ? t.slice(0, a) : t, l = a > 0 ? t.slice(a) : "";
    let r = 1;
    for (; ; ) {
      const u = `${d} copy ${r}${l}`, v = this.join(e, u);
      if (!n.has(v)) return u;
      r++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const n = [...new Set(e)].map((d) => this.normalizePath(d, t)).filter((d) => this.findByPath(d)).sort((d, l) => d.length - l.length), a = [];
    for (const d of n)
      a.some((l) => this.isInTree(d, l)) || a.push(d);
    return a;
  }
  makeDirEntry(e, t) {
    const n = this.join(e, t), { storage: a } = this.split(n);
    return {
      storage: a || this.defaultStorage,
      dir: e,
      basename: t,
      extension: "",
      path: n,
      type: "dir",
      file_size: null,
      last_modified: Date.now(),
      mime_type: null,
      visibility: "public"
    };
  }
  makeFileEntry(e, t, n = 0, a = null) {
    const d = this.join(e, t), { storage: l } = this.split(d);
    return {
      storage: l || this.defaultStorage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: d,
      type: "file",
      file_size: n,
      last_modified: Date.now(),
      mime_type: a,
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
    const t = this.normalizePath(e.path), { storage: n } = this.split(t), a = [];
    for (const l of e.items) {
      const r = this.normalizePath(l.path, n || this.defaultStorage), u = this.findByPath(r);
      u && (u.type === "dir" ? a.push(...this.removeTree(u.path)) : (this.removeExact(u.path), this.contentStore.delete(u.path), a.push(u)));
    }
    return { ...this.resultForDir(t), deleted: a };
  }
  async rename(e) {
    this.ensureWritable(), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), { storage: n } = this.split(t), a = this.normalizePath(
      e.item || e.path,
      n || this.defaultStorage
    ), d = this.findByPath(a);
    if (!d) throw new Error("Item not found");
    const l = d.dir, r = this.join(l, e.name);
    if (r !== d.path && this.findByPath(r))
      throw new Error("Target already exists");
    if (d.type === "dir") {
      const v = d.path, b = r, h = this.files.map((_) => {
        if (_.storage !== d.storage || !this.isInTree(_.path, v)) return _;
        const k = b + _.path.slice(v.length);
        return this.cloneEntry(_, {
          path: k,
          dir: this.parent(k),
          basename: _.path === v ? e.name : _.basename,
          last_modified: Date.now()
        });
      });
      for (const [_, k] of Array.from(this.contentStore.entries()))
        this.isInTree(_, v) && (this.contentStore.delete(_), this.contentStore.set(b + _.slice(v.length), k));
      this.replaceAll(h);
    } else {
      const v = this.cloneEntry(d, {
        path: r,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(v), this.removeExact(d.path);
      const b = this.contentStore.get(d.path);
      b !== void 0 && (this.contentStore.delete(d.path), this.contentStore.set(v.path, b));
    }
    const u = e.path ? this.normalizePath(e.path, d.storage || this.defaultStorage) : l;
    return this.resultForDir(u || l);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: n } = this.split(t), a = this.topLevelSources(e.sources, n || this.defaultStorage), d = new Set(this.files.map((r) => r.path)), l = [];
    for (const r of a) {
      const u = this.findByPath(r);
      if (!u) continue;
      if (u.type === "file") {
        const _ = this.uniqueName(t, u.basename, d), k = this.makeFileEntry(
          t,
          _,
          u.file_size || 0,
          u.mime_type
        );
        l.push(k), d.add(k.path);
        const w = this.contentStore.get(u.path);
        w !== void 0 && this.contentStore.set(k.path, w);
        continue;
      }
      const v = this.getTree(u.path), b = this.uniqueName(t, u.basename, d), h = /* @__PURE__ */ new Map();
      h.set(u.path, this.join(t, b));
      for (const _ of v) {
        const k = _.path === u.path ? h.get(u.path) : this.join(h.get(_.dir), _.basename);
        h.set(_.path, k);
        const w = _.path === u.path ? t : h.get(_.dir), $ = _.path === u.path ? b : _.basename, m = this.cloneEntry(_, {
          path: k,
          dir: w,
          basename: $,
          extension: _.type === "file" ? this.getExtension($) : "",
          last_modified: Date.now()
        });
        if (l.push(m), d.add(m.path), _.type === "file") {
          const g = this.contentStore.get(_.path);
          g !== void 0 && this.contentStore.set(m.path, g);
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
    ), { storage: n } = this.split(t), a = this.topLevelSources(e.sources, n || this.defaultStorage);
    let d = this.files.slice();
    for (const l of a) {
      const r = d.find((w) => w.path === l);
      if (!r) continue;
      if (r.type === "dir" && this.isInTree(t, r.path))
        throw new Error("Cannot move directory into itself");
      if (r.dir === t)
        continue;
      const u = this.getTree(r.path, d), v = new Set(u.map((w) => w.path)), b = new Set(d.filter((w) => !v.has(w.path)).map((w) => w.path)), h = this.uniqueName(t, r.basename, b), _ = /* @__PURE__ */ new Map();
      _.set(r.path, this.join(t, h));
      const k = /* @__PURE__ */ new Map();
      for (const w of u) {
        const $ = w.path === r.path ? _.get(r.path) : this.join(_.get(w.dir), w.basename);
        _.set(w.path, $);
        const m = w.path === r.path ? t : _.get(w.dir), g = w.path === r.path ? h : w.basename;
        k.set(
          w.path,
          this.cloneEntry(w, {
            path: $,
            dir: m,
            basename: g,
            extension: w.type === "file" ? this.getExtension(g) : "",
            last_modified: Date.now()
          })
        );
      }
      d = d.map((w) => k.get(w.path) || w);
      for (const [w, $] of _.entries()) {
        if (w === $) continue;
        const m = this.contentStore.get(w);
        m !== void 0 && (this.contentStore.delete(w), this.contentStore.set($, m));
      }
    }
    return this.replaceAll(d), this.resultForDir(t);
  }
  async archive(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), n = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, a = this.makeFileEntry(t, n, 0, "application/zip");
    return this.upsert(a), this.resultForDir(t);
  }
  async unarchive(e) {
    this.ensureWritable(), this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.item), n = this.normalizePath(e.path), a = this.findByPath(t);
    if (!a) throw new Error("Archive not found");
    const d = a.basename.replace(/\.zip$/i, ""), l = this.makeDirEntry(n, d);
    return this.upsert(l), this.resultForDir(n);
  }
  async createFile(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), n = this.makeFileEntry(t, e.name, 0, null);
    return this.upsert(n), this.contentStore.set(n.path, ""), this.resultForDir(t);
  }
  async createFolder(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), n = this.makeDirEntry(t, e.name);
    return this.upsert(n), this.resultForDir(t);
  }
  getPreviewUrl(e) {
    return "";
  }
  async getContent(e) {
    this.validatePath(e.path);
    const t = this.normalizePath(e.path), n = this.contentStore.get(t);
    if (typeof n == "string" || n === void 0)
      return {
        content: n ?? "",
        mimeType: this.findByPath(t)?.mime_type || void 0
      };
    const a = new Uint8Array(n);
    let d = "";
    for (let l = 0; l < a.length; l++) d += String.fromCharCode(a[l]);
    return {
      content: btoa(d),
      mimeType: this.findByPath(t)?.mime_type || void 0
    };
  }
  getDownloadUrl(e) {
    return "";
  }
  async search(e) {
    const t = (e.filter || "").toLowerCase(), n = e.path ? this.normalizePath(e.path) : void 0;
    return this.files.filter((a) => {
      if (n) {
        if (e.deep) {
          if (!this.isInTree(a.path, n)) return !1;
        } else if (a.dir !== n)
          return !1;
      }
      return a.basename.toLowerCase().includes(t) || a.path.toLowerCase().includes(t);
    });
  }
  async save(e) {
    this.ensureWritable(), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.path), n = this.findByPath(t);
    if (!n) throw new Error("File not found");
    if (n.type !== "file") throw new Error("Can only save file content");
    return this.contentStore.set(t, e.content), this.upsert(
      this.cloneEntry(n, { file_size: e.content.length, last_modified: Date.now() })
    ), t;
  }
  // Auto-creates any missing intermediate directories for a "sub/dir/name" path,
  // so folder drag & drop / folder picker uploads recreate the dropped folder itself.
  ensureDirPath(e, t) {
    let n = e;
    for (const a of t) {
      const d = this.join(n, a);
      this.findByPath(d) || this.upsert(this.makeDirEntry(n, a)), n = d;
    }
    return n;
  }
  configureUploader(e, t) {
    e && e.addUploader(async (n) => {
      const a = n.map((d) => e.getFile(d)).filter(Boolean);
      if (a.length) {
        e.emit("upload-start", a);
        for (const d of a)
          try {
            this.ensureWritable();
            const l = this.normalizePath(t.getTargetPath()), r = d?.name || "file", u = d?.type || null, v = d?.data, b = d?.size || 0, h = r.split("/").filter(Boolean), _ = h.pop() || r, k = h.length ? this.ensureDirPath(l, h) : l, w = this.makeFileEntry(k, _, b, u);
            if (this.upsert(w), v)
              try {
                const $ = await v.arrayBuffer();
                this.contentStore.set(w.path, $);
              } catch {
                this.contentStore.set(w.path, "");
              }
            else
              this.contentStore.set(w.path, "");
            e.emit("upload-success", d, { status: 200, body: {} });
          } catch (l) {
            e.emit("upload-error", d, l instanceof Error ? l : new Error("Upload failed"));
          }
      }
    });
  }
}
function kn(s, e, t) {
  const n = `HTTP ${e}: ${t}`;
  if (!s)
    return n;
  try {
    const a = JSON.parse(s);
    if (a.message)
      return a.message;
    if (a.error) {
      if (typeof a.error == "string")
        return a.error;
      if (a.error.message)
        return a.error.message;
    }
    if (a.errors && Array.isArray(a.errors) && a.errors.length > 0) {
      const d = a.errors.map((l) => l.message).filter((l) => !!l);
      if (d.length > 0)
        return d.join(", ");
    }
    return a.detail ? a.detail : a.title ? a.title : s;
  } catch {
    return s || n;
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
    const n = this.getHeaders();
    delete n["Content-Type"], e.use(Ao, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: n,
      formData: !0
    }), e.on("upload", () => {
      const a = t.getTargetPath();
      e.getFiles().forEach((l) => {
        e.setFileMeta(l.id, { path: a });
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
    const n = `${this.config.baseURL}${e}`, a = await fetch(n, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!a.ok) {
      const l = await a.text(), r = kn(l, a.status, a.statusText);
      throw new Error(r);
    }
    return a.status === 204 || a.status === 304 ? {} : (a.headers.get("content-type") || "").includes("application/json") ? await a.json() : await a.text();
  }
  async list(e) {
    const t = new URLSearchParams();
    e?.path && t.append("path", e.path);
    const n = t.toString() ? `${this.config.url.list}?${t.toString()}` : this.config.url.list;
    return await this.request(n, { method: "GET", signal: e?.signal });
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
    const t = new URLSearchParams({ path: e.path }), n = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, a = await fetch(n, { headers: this.getHeaders(), signal: e.signal });
    if (!a.ok) {
      const l = await a.text(), r = kn(l, a.status, a.statusText);
      throw new Error(r);
    }
    return { content: await a.text(), mimeType: a.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, n = new URLSearchParams();
    e.path && n.set("path", e.path), e.filter && n.set("filter", e.filter), e.deep && n.set("deep", "1"), e.size && e.size !== "all" && n.set("size", e.size);
    const a = n.toString() ? `${t}?${n.toString()}` : t;
    return (await this.request(a, {
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
class Pp extends Zt {
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
      const n = indexedDB.open(this.dbName, this.version);
      n.onerror = () => t(n.error), n.onsuccess = () => {
        this.db = n.result, e(this.db);
      }, n.onupgradeneeded = (a) => {
        const d = a.target.result;
        if (!d.objectStoreNames.contains("files")) {
          const l = d.createObjectStore("files", { keyPath: "path" });
          l.createIndex("storage", "storage", { unique: !1 }), l.createIndex("dir", "dir", { unique: !1 });
        }
        d.objectStoreNames.contains("content") || d.createObjectStore("content", { keyPath: "path" });
      };
    }), this.dbPromise);
  }
  async getDB() {
    return this.db ? this.db : this.initDB();
  }
  requestToPromise(e) {
    return new Promise((t, n) => {
      e.onsuccess = () => t(e.result), e.onerror = () => n(e.error);
    });
  }
  waitTransaction(e) {
    return new Promise((t, n) => {
      e.oncomplete = () => t(), e.onerror = () => n(e.error), e.onabort = () => n(e.error);
    });
  }
  async loadSnapshotFromDB() {
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), n = t.objectStore("files"), a = t.objectStore("content"), [d, l] = await Promise.all([
      this.requestToPromise(n.getAll()),
      this.requestToPromise(a.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...d.filter((r) => this.isManagedStorage(r.storage))), this.contentStore.clear();
    for (const r of l)
      this.isManagedPath(r?.path) && this.contentStore.set(r.path, r.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), n = t.objectStore("files"), a = t.objectStore("content"), d = this.requestToPromise(
      n.getAll()
    ), l = this.requestToPromise(
      a.getAll()
    ), [r, u] = await Promise.all([
      d,
      l
    ]);
    n.clear(), a.clear();
    for (const v of r)
      this.isManagedStorage(v.storage) || n.put(v);
    for (const v of u)
      this.isManagedPath(v.path) || a.put(v);
    for (const v of this.entries)
      this.isManagedStorage(v.storage) && n.put(v);
    for (const [v, b] of this.contentStore.entries())
      this.isManagedPath(v) && a.put({ path: v, content: b });
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
  list: (s) => ["adapter", "list", s],
  search: (s, e, t, n) => ["adapter", "search", s, e, t, n],
  delete: (s) => ["adapter", "delete", s],
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
    const t = Nt.list(e);
    return await this.queryClient.fetchQuery({
      queryKey: t,
      queryFn: ({ signal: n }) => this.driver.list({ path: e, signal: n }),
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
      queryFn: ({ signal: n }) => this.driver.getContent({ path: e.path, signal: e.signal ?? n }),
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
      queryFn: ({ signal: n }) => this.driver.search({ ...e, signal: e.signal ?? n }),
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
function Qo(s) {
  const e = oe(s.state);
  return {
    current: R(() => e.value.theme || "silver"),
    set: (a) => {
      s.set("theme", a);
    }
  };
}
const Jo = (s, e) => {
  const t = Ro(s.id ?? "vf"), n = Co(), a = e.i18n, d = s.locale ?? e.locale, l = Wo(s.id ?? "vf", s.config ?? {}), r = Go();
  if (!s.driver)
    throw new Error("Driver is required for VueFinder");
  const u = new Xo(s.driver);
  return Pt({
    // app version
    version: No,
    // config store
    config: l,
    // Theme
    theme: (() => {
      const v = Qo(l);
      return {
        current: v.current,
        set: v.set
      };
    })(),
    // files store
    fs: r,
    // root element
    root: null,
    // app id
    debug: s.debug ?? !1,
    // Event Bus
    emitter: n,
    // storage
    storage: t,
    // localization object
    i18n: Vo(
      t,
      d,
      n,
      a,
      l
    ),
    // modal state
    modal: jo(l),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: go(u),
    // active features
    features: Nn(s.features),
    // selection mode
    selectionMode: s.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: R(() => s.selectionFilterType || "both"),
    selectionFilterMimeIncludes: R(() => s.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: l.get("metricUnits") ? Hn : Jt,
    // possible items of the context menu
    contextMenuItems: s.contextMenuItems,
    // expose custom uploader if provided
    customUploader: s.customUploader
  });
}, Zo = ["data-theme"], es = { class: "vuefinder__modal-layout__container" }, ts = { class: "vuefinder__modal-layout__content" }, ns = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, os = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, ss = { class: "vuefinder__modal-drag-message" }, ze = /* @__PURE__ */ le({
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
  setup(s) {
    const e = I(null), t = ae();
    t.config;
    const n = s, a = () => {
      n.onRequestClose ? n.onRequestClose() : t.modal.close();
    };
    we(() => {
      const l = document.querySelector(".v-f-modal input");
      l && l.focus(), De(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const r = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: r,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const d = (l) => {
      l.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (l.preventDefault(), l.stopPropagation());
    };
    return (l, r) => (c(), p("div", {
      "data-theme": i(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: r[5] || (r[5] = He((u) => a(), ["esc"]))
    }, [
      r[6] || (r[6] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", es, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: d,
          onMousedown: r[4] || (r[4] = _e((u) => a(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: te(["vuefinder__modal-layout__body", n.bodyClass]),
            style: Pe(n.bodyStyle),
            onTouchstart: r[0] || (r[0] = //@ts-ignore
            (...u) => n.onBodyTouchstart && n.onBodyTouchstart(...u)),
            onTouchmove: r[1] || (r[1] = //@ts-ignore
            (...u) => n.onBodyTouchmove && n.onBodyTouchmove(...u)),
            onTouchend: r[2] || (r[2] = //@ts-ignore
            (...u) => n.onBodyTouchend && n.onBodyTouchend(...u)),
            onTouchcancel: r[3] || (r[3] = //@ts-ignore
            (...u) => n.onBodyTouchcancel && n.onBodyTouchcancel(...u))
          }, [
            o("div", ts, [
              Me(l.$slots, "default")
            ]),
            l.$slots.buttons ? (c(), p("div", ns, [
              Me(l.$slots, "buttons")
            ])) : j("", !0)
          ], 38)
        ], 32)
      ]),
      n.showDragOverlay ? (c(), p("div", os, [
        o("div", ss, y(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : j("", !0)
    ], 40, Zo));
  }
}), is = { class: "vuefinder__modal-header" }, as = { class: "vuefinder__modal-header__icon-container" }, ls = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Ne = /* @__PURE__ */ le({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(s) {
    return (e, t) => (c(), p("div", is, [
      o("div", as, [
        (c(), X(On(s.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", ls, y(s.title), 1)
    ]));
  }
}), rs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function ds(s, e) {
  return c(), p("svg", rs, [...e[0] || (e[0] = [
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
}, hs = { class: "vuefinder__about-modal__meta" }, gs = { class: "vuefinder__about-modal__meta-item" }, ys = { class: "vuefinder__about-modal__meta-label" }, ws = { class: "vuefinder__about-modal__meta-value" }, bs = { class: "vuefinder__about-modal__meta-item" }, ks = { class: "vuefinder__about-modal__meta-label" }, Wn = /* @__PURE__ */ le({
  __name: "ModalAbout",
  setup(s) {
    const e = ae(), { t } = e.i18n;
    return (n, a) => (c(), X(ze, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: a[0] || (a[0] = (d) => i(e).modal.close())
        }, y(i(t)("Close")), 1)
      ]),
      default: ue(() => [
        o("div", cs, [
          W(Ne, {
            icon: i(en),
            title: "Vuefinder " + i(e).version
          }, null, 8, ["icon", "title"]),
          o("div", us, [
            o("div", vs, [
              o("div", fs, y(i(t)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", _s, y(i(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", ps, [
                o("a", ms, y(i(t)("Project Home")), 1),
                a[1] || (a[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", hs, [
                o("div", gs, [
                  o("span", ys, y(i(t)("Version")), 1),
                  o("span", ws, y(i(e).version), 1)
                ]),
                o("div", bs, [
                  o("span", ks, y(i(t)("License")), 1),
                  a[2] || (a[2] = o("span", { class: "vuefinder__about-modal__meta-value" }, "MIT", -1))
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
function xs(s, e) {
  return c(), p("svg", $s, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Gn = { render: xs }, Ss = { class: "vuefinder__delete-modal__content" }, Cs = { class: "vuefinder__delete-modal__form" }, Fs = { class: "vuefinder__delete-modal__description" }, Es = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ps = {
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
}, Ds = { class: "vuefinder__delete-modal__file-name" }, Ms = { class: "vuefinder__delete-modal__confirmation" }, Is = { class: "vuefinder__delete-modal__confirmation-label" }, As = { class: "vuefinder__delete-modal__confirmation-text" }, Os = ["disabled"], Tt = /* @__PURE__ */ le({
  __name: "ModalDelete",
  setup(s) {
    const e = ae(), t = Be(e), { t: n } = e.i18n, a = e.fs, d = oe(a.path), l = I(e.modal.data.items), r = I(!1), u = () => {
      l.value.length && r.value && e.adapter.delete({
        path: d.value.path,
        items: l.value.map(({ path: v, type: b }) => ({
          path: v,
          type: b
        }))
      }).then((v) => {
        t.success(n("Files deleted.")), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Fe(v, n("Failed to delete files")));
      });
    };
    return (v, b) => (c(), X(ze, null, {
      buttons: ue(() => [
        o("div", Ms, [
          o("label", Is, [
            he(o("input", {
              "onUpdate:modelValue": b[0] || (b[0] = (h) => r.value = h),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [lt, r.value]
            ]),
            o("span", As, y(i(n)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !r.value,
          onClick: u
        }, y(i(n)("Yes, Delete!")), 9, Os),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[1] || (b[1] = (h) => i(e).modal.close())
        }, y(i(n)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          W(Ne, {
            icon: i(Gn),
            title: i(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", Ss, [
            o("div", Cs, [
              o("p", Fs, y(i(n)("Are you sure you want to delete these files?")), 1),
              o("div", Es, [
                (c(!0), p(fe, null, ge(l.value, (h) => (c(), p("p", {
                  key: h.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  h.type === "dir" ? (c(), p("svg", Ps, [...b[2] || (b[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (c(), p("svg", Ts, [...b[3] || (b[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Ds, y(h.basename), 1)
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
function Rs(s, e) {
  return c(), p("svg", Ls, [...e[0] || (e[0] = [
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
}, Hs = { class: "vuefinder__rename-modal__item-name" }, Dt = /* @__PURE__ */ le({
  __name: "ModalRename",
  setup(s) {
    const e = ae(), t = Be(e), { t: n } = e.i18n, a = e.fs, d = oe(a.path), l = I(e.modal.data.items[0]), r = I(l.value.basename), u = () => {
      r.value != l.value.basename && e.adapter.rename({
        path: d.value.path,
        item: l.value.path,
        name: r.value
      }).then((v) => {
        t.success(n("%s is renamed.", r.value)), e.fs.setFiles(v.files), e.modal.close();
      }).catch((v) => {
        t.error(Fe(v, n("Failed to rename")));
      });
    };
    return (v, b) => (c(), X(ze, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: u
        }, y(i(n)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: b[1] || (b[1] = (h) => i(e).modal.close())
        }, y(i(n)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          W(Ne, {
            icon: i(Yn),
            title: i(n)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", Bs, [
            o("div", zs, [
              o("p", Vs, [
                l.value.type === "dir" ? (c(), p("svg", Us, [...b[2] || (b[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (c(), p("svg", Ns, [...b[3] || (b[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Hs, y(l.value.basename), 1)
              ]),
              he(o("input", {
                "onUpdate:modelValue": b[0] || (b[0] = (h) => r.value = h),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: He(u, ["enter"])
              }, null, 544), [
                [Ke, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Ve() {
  const s = ae(), e = R(() => s.features);
  return {
    enabled: (n) => e.value[n] ?? !1
  };
}
function js(s, e = null) {
  return new Date(s * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const Ks = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function qs(s, e) {
  return c(), p("svg", Ks, [...e[0] || (e[0] = [
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
}, Qs = { class: "vuefinder__preview-chrome__popover-label" }, Js = { class: "vuefinder__preview-chrome__popover-value" }, Zs = ["title"], ei = { class: "vuefinder__preview-chrome__actions" }, ti = ["aria-label"], ni = {
  key: 1,
  class: "vuefinder__preview-chrome__popover-host"
}, oi = ["title", "aria-label"], si = {
  key: 0,
  class: "vuefinder__preview-chrome__popover"
}, ii = ["href", "download"], ai = { class: "vuefinder__preview-chrome__popover-hint" }, li = ["title", "aria-label"], ri = /* @__PURE__ */ le({
  name: "PreviewChrome",
  __name: "PreviewChrome",
  emits: ["close-request"],
  setup(s, { emit: e }) {
    const t = e, n = ae(), { enabled: a } = Ve(), { t: d } = n.i18n, l = oe(n.fs.sortedFiles), r = R(() => l.value.filter((f) => f.type === "file")), u = R(
      () => r.value.findIndex((f) => f.path === n.modal.data.item.path)
    ), v = R(() => r.value.length), b = R(() => n.modal.controls ?? null), h = R(() => !!i(b.value?.isEditing));
    R(() => !!i(b.value?.isDirty));
    const _ = I(!1), k = I(!1), w = (f) => {
      f === "info" ? (_.value = !_.value, k.value = !1) : (k.value = !k.value, _.value = !1);
    }, $ = (f) => {
      f.target.closest(".vuefinder__preview-chrome__popover-host") || (_.value = !1, k.value = !1);
    };
    we(() => document.addEventListener("mousedown", $)), wt(() => document.removeEventListener("mousedown", $));
    const m = R(() => {
      const f = n.modal.data.item, x = [
        { label: d("File Size"), value: n.filesize(f.file_size ?? 0) },
        { label: d("Last Modified"), value: js(f.last_modified ?? 0) }
      ];
      f.mime_type && x.push({ label: d("Type"), value: f.mime_type });
      const C = i(b.value?.extraInfo);
      if (Array.isArray(C))
        for (const F of C) x.push(F);
      return x.push({ label: d("Path"), value: f.path }), x;
    }), g = R(() => n.adapter.getDownloadUrl(n.modal.data.item));
    return (f, x) => (c(), p("div", Ws, [
      o("div", Gs, [
        o("button", {
          type: "button",
          class: te(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": _.value }]),
          title: i(d)("File info"),
          "aria-label": i(d)("File info"),
          onClick: x[0] || (x[0] = (C) => w("info"))
        }, [
          W(i(en), { class: "vuefinder__preview-chrome__icon" })
        ], 10, Ys),
        _.value ? (c(), p("div", Xs, [
          (c(!0), p(fe, null, ge(m.value, (C) => (c(), p("div", {
            key: C.label,
            class: "vuefinder__preview-chrome__popover-row"
          }, [
            o("span", Qs, y(C.label), 1),
            o("span", Js, y(C.value), 1)
          ]))), 128))
        ])) : j("", !0)
      ]),
      o("div", {
        id: "modal-title",
        class: "vuefinder__preview-chrome__title",
        title: i(n).modal.data.item.path
      }, y(i(n).modal.data.item.basename), 9, Zs),
      o("div", ei, [
        v.value > 1 && !h.value ? (c(), p("span", {
          key: 0,
          class: "vuefinder__preview-chrome__counter",
          "aria-label": i(d)("File %s of %s", String(u.value + 1), String(v.value))
        }, y(u.value + 1) + " / " + y(v.value), 9, ti)) : j("", !0),
        i(a)("download") && !h.value ? (c(), p("div", ni, [
          o("button", {
            type: "button",
            class: te(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": k.value }]),
            title: i(d)("Download"),
            "aria-label": i(d)("Download"),
            onClick: x[1] || (x[1] = (C) => w("download"))
          }, [...x[3] || (x[3] = [
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
          ])], 10, oi),
          k.value ? (c(), p("div", si, [
            o("a", {
              href: g.value,
              download: g.value,
              target: "_blank",
              class: "vuefinder__preview-chrome__popover-action"
            }, [
              x[4] || (x[4] = o("svg", {
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
              o("span", null, y(i(d)("Download")), 1)
            ], 8, ii),
            o("p", ai, y(i(d)(
              `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
            )), 1)
          ])) : j("", !0)
        ])) : j("", !0),
        o("button", {
          type: "button",
          class: "vuefinder__preview-chrome__btn vuefinder__preview-chrome__btn--icon vuefinder__preview-chrome__btn--close",
          title: i(d)("Close"),
          "aria-label": i(d)("Close"),
          onClick: x[2] || (x[2] = (C) => t("close-request"))
        }, [
          W(i(Xn), { class: "vuefinder__preview-chrome__icon vuefinder__preview-chrome__icon--lg" })
        ], 8, li)
      ])
    ]));
  }
});
function tn(s) {
  const e = ae();
  we(() => {
    if (typeof e.modal.registerControls != "function") {
      console.warn(
        "[vuefinder] PreviewControls registration skipped: app.modal.registerControls is missing. Hard refresh the page to pick up the latest modal API."
      );
      return;
    }
    e.modal.registerControls(s);
  }), wt(() => {
    typeof e.modal.unregisterControls == "function" && e.modal.unregisterControls(s);
  });
}
const di = { class: "vuefinder__text-preview" }, ci = { class: "vuefinder__text-preview__body" }, ui = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, vi = /* @__PURE__ */ le({
  __name: "Text",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-Bf1lhdwe.js").then((f) => f.C),
      delay: 100
    }), n = e, a = I(""), d = I(""), l = I(!1), r = I(!1), u = ae(), v = Be(u), { enabled: b } = Ve(), { t: h } = u.i18n;
    we(async () => {
      try {
        const f = await u.adapter.getContent({ path: u.modal.data.item.path });
        a.value = f.content, d.value = f.content, n("success");
      } catch (f) {
        Fe(f, "Failed to load text content"), n("success");
      }
    });
    const _ = R(
      () => b("edit") && !u.fs.isReadOnly(u.modal.data.item)
    ), k = R(() => l.value), w = R(() => l.value && d.value !== a.value), $ = () => {
      d.value = a.value, l.value = !0, u.modal.setEditMode(!0);
    }, m = () => {
      l.value = !1, d.value = a.value, u.modal.setEditMode(!1);
    }, g = async () => {
      try {
        await u.adapter.save({
          path: u.modal.data.item.path,
          content: d.value
        }), a.value = d.value, v.success(h("Updated.")), l.value = !1, u.modal.setEditMode(!1), n("success");
      } catch (f) {
        v.error(Fe(f, h("Failed to save file")));
      }
    };
    return tn({
      isEditable: _,
      isEditing: k,
      isDirty: w,
      primaryActionLabel: R(() => h("Save")),
      enterEdit: $,
      commitEdit: g,
      cancelEdit: m
    }), (f, x) => (c(), p("div", di, [
      o("div", ci, [
        (c(), X(Rn, {
          onResolve: x[2] || (x[2] = (C) => r.value = !0)
        }, {
          fallback: ue(() => [
            l.value ? he((c(), p("textarea", {
              key: 1,
              "onUpdate:modelValue": x[1] || (x[1] = (C) => d.value = C),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [Ke, d.value]
            ]) : (c(), p("pre", ui, y(a.value), 1))
          ]),
          default: ue(() => [
            W(i(t), {
              "model-value": l.value ? d.value : a.value,
              readonly: !l.value,
              filename: i(u).modal.data.item.basename,
              "onUpdate:modelValue": x[0] || (x[0] = (C) => l.value ? d.value = C : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        he(o("span", null, y(r.value), 513), [
          [qe, !1]
        ])
      ])
    ]));
  }
}), fi = { class: "vuefinder__text-preview" }, _i = { class: "vuefinder__text-preview__body vuefinder__csv-preview__body" }, pi = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, mi = {
  key: 0,
  class: "vuefinder__csv-preview__error"
}, hi = {
  key: 1,
  class: "vuefinder__csv-preview__empty"
}, gi = {
  key: 2,
  class: "vuefinder__csv-preview__table-wrap"
}, yi = { class: "vuefinder__csv-preview__table" }, wi = ["title"], bi = { class: "vuefinder__csv-preview__row-num" }, ki = ["title"], $i = {
  key: 0,
  class: "vuefinder__csv-preview__truncated"
}, xi = {
  key: 2,
  class: "vuefinder__csv-preview__view-checkbox"
}, Ht = 1e3, Si = /* @__PURE__ */ le({
  name: "CsvPreview",
  __name: "Csv",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-Bf1lhdwe.js").then((Z) => Z.C),
      delay: 100
    }), n = e, a = I(""), d = I(""), l = vt([]), r = vt([]), u = I(null), v = I(!1), b = I(!1), h = R(() => l.value.length > Ht), _ = R(() => h.value ? l.value.slice(0, Ht) : l.value), k = ae(), w = Be(k), { enabled: $ } = Ve(), { t: m } = k.i18n;
    async function g(Z) {
      try {
        const { parse: ee } = await import("./papaparse.min-Brc8PWCw.js").then((M) => M.p), Q = ee(Z, {
          skipEmptyLines: !0,
          delimiter: ""
        });
        if (!Q.data.length) {
          r.value = [], l.value = [];
          return;
        }
        const [G, ...T] = Q.data;
        r.value = G ?? [], l.value = T, u.value = null;
      } catch (ee) {
        u.value = Fe(ee, m("Failed to parse CSV")), r.value = [], l.value = [];
      }
    }
    we(async () => {
      try {
        const Z = await k.adapter.getContent({ path: k.modal.data.item.path });
        a.value = Z.content, d.value = Z.content, await g(Z.content), n("success");
      } catch (Z) {
        Fe(Z, "Failed to load CSV content"), n("success");
      }
    });
    const f = R(() => !v.value && b.value), x = R(
      () => $("edit") && !k.fs.isReadOnly(k.modal.data.item)
    ), C = R(() => v.value), F = R(() => v.value && d.value !== a.value), E = () => {
      d.value = a.value, v.value = !0, b.value = !1, k.modal.setEditMode(!0);
    }, L = () => {
      v.value = !1, d.value = a.value, k.modal.setEditMode(!1);
    }, q = async () => {
      try {
        await k.adapter.save({ path: k.modal.data.item.path, content: d.value }), a.value = d.value, await g(a.value), w.success(m("Updated.")), v.value = !1, k.modal.setEditMode(!1), n("success");
      } catch (Z) {
        w.error(Fe(Z, m("Failed to save file")));
      }
    };
    return tn({
      isEditable: x,
      isEditing: C,
      isDirty: F,
      primaryActionLabel: R(() => m("Save")),
      enterEdit: E,
      commitEdit: q,
      cancelEdit: L
    }), (Z, ee) => (c(), p("div", fi, [
      o("div", _i, [
        f.value ? (c(), p(fe, { key: 1 }, [
          u.value ? (c(), p("div", mi, y(u.value), 1)) : !l.value.length && !r.value.length ? (c(), p("div", hi, y(i(m)("No rows to display")), 1)) : (c(), p("div", gi, [
            o("table", yi, [
              o("thead", null, [
                o("tr", null, [
                  ee[3] || (ee[3] = o("th", { class: "vuefinder__csv-preview__row-num" }, null, -1)),
                  (c(!0), p(fe, null, ge(r.value, (Q, G) => (c(), p("th", {
                    key: G,
                    title: Q
                  }, y(Q), 9, wi))), 128))
                ])
              ]),
              o("tbody", null, [
                (c(!0), p(fe, null, ge(_.value, (Q, G) => (c(), p("tr", { key: G }, [
                  o("td", bi, y(G + 1), 1),
                  (c(!0), p(fe, null, ge(Q, (T, M) => (c(), p("td", {
                    key: M,
                    title: T
                  }, y(T), 9, ki))), 128))
                ]))), 128))
              ])
            ]),
            h.value ? (c(), p("div", $i, y(i(m)("Showing first %s rows out of %s", Ht, l.value.length)), 1)) : j("", !0)
          ]))
        ], 64)) : (c(), X(Rn, { key: 0 }, {
          fallback: ue(() => [
            v.value ? he((c(), p("textarea", {
              key: 1,
              "onUpdate:modelValue": ee[1] || (ee[1] = (Q) => d.value = Q),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [Ke, d.value]
            ]) : (c(), p("pre", pi, y(a.value), 1))
          ]),
          default: ue(() => [
            W(i(t), {
              "model-value": v.value ? d.value : a.value,
              readonly: !v.value,
              filename: i(k).modal.data.item.basename,
              "onUpdate:modelValue": ee[0] || (ee[0] = (Q) => v.value ? d.value = Q : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        v.value ? j("", !0) : (c(), p("label", xi, [
          he(o("input", {
            "onUpdate:modelValue": ee[2] || (ee[2] = (Q) => b.value = Q),
            type: "checkbox"
          }, null, 512), [
            [lt, b.value]
          ]),
          o("span", null, y(i(m)("Show as table")), 1)
        ]))
      ])
    ]));
  }
}), nn = async (s, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((n) => {
        e.file(n);
      });
      s(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), n = await new Promise((a) => {
        t.readEntries(a);
      });
      for (const a of n)
        await nn(s, a);
    }
  }
}, xe = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Qn(s) {
  const e = ae(), { t } = e.i18n, n = e.fs, a = oe(n.path), d = e.config, l = I({ QUEUE_ENTRY_STATUS: xe }), r = I(null), u = I(null), v = I(null), b = I(null), h = I(null), _ = I([]), k = I(""), w = I(!1), $ = I(!1), m = I(null);
  let g;
  const f = (S) => {
    S.preventDefault(), S.stopPropagation(), $.value = !0;
  }, x = (S) => {
    S.preventDefault(), S.stopPropagation(), $.value = !0;
  }, C = (S) => {
    S.preventDefault(), S.stopPropagation(), (!S.relatedTarget || S.relatedTarget === document.body) && ($.value = !1);
  }, F = (S) => {
    S.preventDefault(), S.stopPropagation(), $.value = !1;
    const z = /^[/\\](.+)/, P = S.dataTransfer;
    P && (P.items && P.items.length ? Array.from(P.items).forEach((V) => {
      if (V.kind === "file") {
        const A = V.webkitGetAsEntry?.();
        if (A)
          nn((O, H) => {
            const D = z.exec(O?.fullPath || "");
            L(H, D ? D[1] : H.name);
          }, A);
        else {
          const O = V.getAsFile?.();
          O && L(O);
        }
      }
    }) : P.files && P.files.length && Array.from(P.files).forEach((V) => L(V)));
  }, E = (S) => _.value.findIndex((z) => z.id === S), L = (S, z) => g.addFile({ name: z || S.name, type: S.type, data: S, source: "Local" }), q = (S) => S.status === xe.DONE ? "text-green-600" : S.status === xe.ERROR || S.status === xe.CANCELED ? "text-red-600" : "", Z = (S) => S.status === xe.DONE ? "✓" : S.status === xe.ERROR || S.status === xe.CANCELED ? "!" : "...", ee = () => b.value?.click(), Q = () => e.modal.close(), G = (S) => {
    if (w.value || !_.value.filter((z) => z.status !== xe.DONE).length) {
      w.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", m.value = S || a.value, g.upload();
  }, T = () => {
    g.cancelAll(), _.value.forEach((S) => {
      S.status !== xe.DONE && (S.status = xe.CANCELED, S.statusName = t("Canceled"));
    }), w.value = !1;
  }, M = (S) => {
    w.value || (g.removeFile(S.id), _.value.splice(E(S.id), 1));
  }, U = (S) => {
    if (!w.value)
      if (g.cancelAll(), S) {
        const z = _.value.filter((P) => P.status !== xe.DONE);
        _.value = [], z.forEach((P) => L(P.originalFile, P.name));
      } else
        _.value = [];
  }, Y = (S) => {
    S.forEach((z) => {
      z instanceof File ? L(z) : L(z.file, z.name);
    });
  }, ce = (S, z) => S.endsWith("://") || S.endsWith("/") ? S + z : S + "/" + z, B = async (S, z) => {
    const P = z.trim();
    if (w.value || !P) return;
    if (P.includes("/") || P.includes("\\")) {
      k.value = t("Name cannot contain slashes.");
      return;
    }
    const V = S.name.split("/");
    V[V.length - 1] = P;
    const A = V.join("/");
    if (A === S.name) return;
    if (S.status === xe.DONE) {
      const me = m.value?.path || a.value.path, K = ce(me, S.name), se = S.name.split("/");
      se.pop();
      const ve = se.length ? ce(me, se.join("/")) : me;
      try {
        await e.adapter.rename({ path: ve, item: K, name: P }), S.name = A, e.adapter.invalidateListQuery(me), me === a.value.path && e.adapter.open(me);
      } catch (be) {
        k.value = be?.message || t("Failed to rename");
      }
      return;
    }
    const O = E(S.id);
    if (O === -1) return;
    const H = S.originalFile, D = S.name;
    g.removeFile(S.id), _.value.splice(O, 1);
    let N;
    try {
      N = L(H, A);
    } catch (me) {
      k.value = me?.message || t("Failed to rename");
      try {
        L(H, D);
      } catch {
      }
      return;
    }
    if (!N) return;
    const de = E(N);
    if (de !== -1 && de !== O) {
      const me = _.value.splice(de, 1)[0];
      me && _.value.splice(O, 0, me);
    }
  };
  return we(() => {
    g = new To({
      debug: e.debug,
      restrictions: { maxFileSize: Ho(d.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (V, A) => {
        if (A[V.id] != null) {
          const H = E(V.id);
          _.value[H]?.status === xe.PENDING && (k.value = g.i18n("noDuplicates", { fileName: V.name })), _.value = _.value.filter((D) => D.id !== V.id);
        }
        return _.value.push({
          id: V.id,
          name: V.name,
          size: e.filesize(V.size),
          status: xe.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: V.data
        }), !0;
      }
    });
    const S = {
      getTargetPath: () => (m.value || a.value).path
    };
    if (s)
      s(g, S);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(g, S);
    else
      throw new Error("No uploader configured");
    g.on("restriction-failed", (V, A) => {
      const O = _.value[E(V.id)];
      O && M(O), k.value = A.message;
    }), g.on("upload-start", (V) => {
      V.forEach((A) => {
        const O = _.value[E(A.id)];
        O && (O.status = xe.UPLOADING, O.statusName = t("Uploading"), O.percent = "0%");
      });
    }), g.on("upload-progress", (V, A) => {
      const O = A.bytesTotal ?? 1, H = Math.floor(A.bytesUploaded / O * 100), D = E(V.id);
      D !== -1 && _.value[D] && (_.value[D].percent = `${H}%`);
    }), g.on("upload-success", (V) => {
      const A = _.value[E(V.id)];
      A && (A.status = xe.DONE, A.statusName = t("Done"));
    }), g.on("upload-error", (V, A) => {
      const O = _.value[E(V.id)];
      O && (O.percent = null, O.status = xe.ERROR, O.statusName = A?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : A?.message || t("Unknown Error"));
    }), g.on("error", (V) => {
      k.value = V.message, w.value = !1;
    }), g.on("complete", (V) => {
      w.value = !1;
      const A = m.value || a.value;
      e.adapter.invalidateListQuery(A.path), e.adapter.open(A.path);
      const O = _.value.filter(
        (H) => H.status === xe.DONE && V.successful.includes(H.id)
      ).map((H) => H.name);
      e.emitter.emit("vf-upload-complete", O);
    }), b.value?.addEventListener("click", () => u.value?.click()), h.value?.addEventListener("click", () => v.value?.click());
    const z = { capture: !0 };
    document.addEventListener("dragover", f, z), document.addEventListener("dragenter", x, z), document.addEventListener("dragleave", C, z), document.addEventListener("drop", F, z);
    const P = (V) => {
      const A = V.target, O = A.files;
      if (O) {
        for (const H of O) L(H, H.webkitRelativePath || void 0);
        A.value = "";
      }
    };
    u.value?.addEventListener("change", P), v.value?.addEventListener("change", P);
  }), Te(() => {
    const S = { capture: !0 };
    document.removeEventListener("dragover", f, S), document.removeEventListener("dragenter", x, S), document.removeEventListener("dragleave", C, S), document.removeEventListener("drop", F, S);
  }), {
    container: r,
    internalFileInput: u,
    internalFolderInput: v,
    pickFiles: b,
    pickFolders: h,
    queue: _,
    message: k,
    uploading: w,
    hasFilesInDropArea: $,
    definitions: l,
    openFileSelector: ee,
    upload: G,
    cancel: T,
    remove: M,
    clear: U,
    close: Q,
    getClassNameForEntry: q,
    getIconForEntry: Z,
    addExternalFiles: Y,
    renameEntry: B
  };
}
const $n = "image/png", on = "image/jpeg", Ci = "image/webp";
function Fi(s) {
  const e = (s.split(".").pop() ?? "").toLowerCase();
  return e === "png" ? $n : e === "webp" ? Ci : e === "gif" ? $n : on;
}
function Jn(s) {
  return new Promise((e, t) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.onload = () => e(n), n.onerror = () => t(new Error("Failed to load image")), n.src = s;
  });
}
function Zn(s, e) {
  const t = document.createElement("canvas");
  t.width = s, t.height = e;
  const n = t.getContext("2d");
  if (!n) throw new Error("Could not acquire 2D canvas context");
  return { canvas: t, ctx: n };
}
async function xn(s, e, t) {
  const n = await Jn(s), { canvas: a, ctx: d } = Zn(n.naturalWidth, n.naturalHeight);
  return d.filter = e, d.drawImage(n, 0, 0), a.toDataURL(t, t === on ? 0.92 : void 0);
}
async function Ei(s, e, t, n, a) {
  const d = await Jn(s), l = d.naturalWidth, r = d.naturalHeight, u = e === 90 || e === 270, { canvas: v, ctx: b } = Zn(u ? r : l, u ? l : r);
  return b.translate(v.width / 2, v.height / 2), e && b.rotate(e * Math.PI / 180), (t || n) && b.scale(t ? -1 : 1, n ? -1 : 1), b.drawImage(d, -l / 2, -r / 2), v.toDataURL(a, a === on ? 0.92 : void 0);
}
function Pi(s, e, t) {
  const n = 1 + s / 100, a = 1 + e / 100, d = 1 + t / 100;
  return `brightness(${n}) contrast(${a}) saturate(${d})`;
}
async function Ti(s) {
  return await (await fetch(s)).blob();
}
const Di = { class: "vuefinder__image-editor" }, Mi = {
  class: "vuefinder__image-editor__strip",
  role: "tablist"
}, Ii = ["aria-selected", "onClick"], Ai = {
  key: 0,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Oi = {
  key: 1,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Li = {
  key: 2,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ri = {
  key: 3,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Bi = { class: "vuefinder__image-editor__tab-label" }, zi = {
  key: 0,
  class: "vuefinder__image-editor__panel"
}, Vi = { class: "vuefinder__image-editor__stage" }, Ui = { class: "vuefinder__image-editor__controls" }, Ni = { class: "vuefinder__image-editor__chips" }, Hi = ["onClick"], ji = ["disabled"], Ki = {
  key: 1,
  class: "vuefinder__image-editor__panel"
}, qi = { class: "vuefinder__image-editor__stage" }, Wi = ["src", "alt"], Gi = { class: "vuefinder__image-editor__controls" }, Yi = { class: "vuefinder__image-editor__rotate-btns" }, Xi = ["title"], Qi = ["title"], Ji = ["title"], Zi = ["title"], ea = ["disabled"], ta = {
  key: 2,
  class: "vuefinder__image-editor__panel"
}, na = { class: "vuefinder__image-editor__stage" }, oa = ["src", "alt"], sa = { class: "vuefinder__image-editor__controls" }, ia = { class: "vuefinder__image-editor__toggle" }, aa = ["disabled"], la = {
  key: 3,
  class: "vuefinder__image-editor__panel"
}, ra = { class: "vuefinder__image-editor__stage" }, da = ["src", "alt"], ca = { class: "vuefinder__image-editor__controls vuefinder__image-editor__controls--stacked" }, ua = { class: "vuefinder__image-editor__slider" }, va = { class: "vuefinder__image-editor__slider" }, fa = { class: "vuefinder__image-editor__slider" }, _a = { class: "vuefinder__image-editor__row" }, pa = ["disabled"], ma = /* @__PURE__ */ le({
  name: "ImageEditor",
  __name: "ImageEditor",
  props: {
    src: {},
    filename: {}
  },
  emits: ["update:src"],
  setup(s, { emit: e }) {
    const t = s, n = e, a = ae(), { t: d } = a.i18n, l = I("crop"), r = I(!1), u = I(null), v = [
      { label: "Original", value: null },
      { label: "1:1", value: 1 },
      { label: "4:3", value: 4 / 3 },
      { label: "16:9", value: 16 / 9 },
      { label: "9:16", value: 9 / 16 }
    ], b = st("cropperRef"), h = I(0), _ = I(!1), k = I(!1), w = I(!1), $ = I(0), m = I(0), g = I(0), f = R(
      () => Pi($.value, m.value, g.value)
    );
    pe([() => t.src, l], () => {
      h.value = 0, _.value = !1, k.value = !1, w.value = !1, $.value = 0, m.value = 0, g.value = 0;
    });
    const x = R(() => Fi(t.filename)), C = R(() => {
      const S = [];
      return h.value && S.push(`rotate(${h.value}deg)`), _.value && S.push("scaleX(-1)"), k.value && S.push("scaleY(-1)"), S.length ? { transform: S.join(" ") } : {};
    }), F = (S) => {
      r.value || (l.value = S);
    }, E = () => {
      const z = b.value?.getResult()?.canvas;
      if (!z) return;
      const P = z.toDataURL(x.value, x.value === "image/jpeg" ? 0.92 : void 0);
      n("update:src", P);
    }, L = async () => {
      if (Y.value) {
        r.value = !0;
        try {
          const S = await Ei(
            t.src,
            U.value,
            _.value,
            k.value,
            x.value
          );
          n("update:src", S);
        } finally {
          r.value = !1;
        }
      }
    }, q = async () => {
      if (w.value) {
        r.value = !0;
        try {
          const S = await xn(t.src, "grayscale(1)", x.value);
          n("update:src", S);
        } finally {
          r.value = !1;
        }
      }
    }, Z = async () => {
      if (!($.value === 0 && m.value === 0 && g.value === 0)) {
        r.value = !0;
        try {
          const S = await xn(t.src, f.value, x.value);
          n("update:src", S);
        } finally {
          r.value = !1;
        }
      }
    }, ee = () => {
      $.value = 0, m.value = 0, g.value = 0;
    }, Q = () => {
      h.value -= 90;
    }, G = () => {
      h.value += 90;
    }, T = () => {
      _.value = !_.value;
    }, M = () => {
      k.value = !k.value;
    }, U = R(
      () => (h.value % 360 + 360) % 360
    ), Y = R(
      () => U.value !== 0 || _.value || k.value
    ), ce = R(
      () => $.value !== 0 || m.value !== 0 || g.value !== 0
    ), B = R(() => w.value);
    return (S, z) => (c(), p("div", Di, [
      o("div", Mi, [
        (c(), p(fe, null, ge(["crop", "rotate", "grayscale", "adjust"], (P) => o("button", {
          key: P,
          type: "button",
          role: "tab",
          "aria-selected": l.value === P,
          class: te(["vuefinder__image-editor__tab", { "vuefinder__image-editor__tab--active": l.value === P }]),
          onClick: (V) => F(P)
        }, [
          P === "crop" ? (c(), p("svg", Ai, [...z[4] || (z[4] = [
            o("path", { d: "M6 2v16a2 2 0 0 0 2 2h14" }, null, -1),
            o("path", { d: "M2 6h16a2 2 0 0 1 2 2v14" }, null, -1)
          ])])) : P === "rotate" ? (c(), p("svg", Oi, [...z[5] || (z[5] = [
            o("polyline", { points: "23 4 23 10 17 10" }, null, -1),
            o("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" }, null, -1)
          ])])) : P === "grayscale" ? (c(), p("svg", Li, [...z[6] || (z[6] = [
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
          ])])) : (c(), p("svg", Ri, [...z[7] || (z[7] = [
            St('<line x1="4" y1="6" x2="14" y2="6"></line><circle cx="17" cy="6" r="2"></circle><line x1="10" y1="12" x2="20" y2="12"></line><circle cx="7" cy="12" r="2"></circle><line x1="4" y1="18" x2="14" y2="18"></line><circle cx="17" cy="18" r="2"></circle>', 6)
          ])])),
          o("span", Bi, y(P === "crop" ? i(d)("Crop") : P === "rotate" ? i(d)("Rotate") : P === "grayscale" ? i(d)("Grayscale") : i(d)("Adjust")), 1)
        ], 10, Ii)), 64))
      ]),
      l.value === "crop" ? (c(), p("div", zi, [
        o("div", Vi, [
          W(i(Do), {
            ref_key: "cropperRef",
            ref: b,
            class: "vuefinder__image-editor__cropper",
            crossorigin: "anonymous",
            src: t.src,
            "stencil-props": u.value === null ? {} : { aspectRatio: u.value },
            "auto-zoom": !0,
            priority: "image",
            transitions: !0
          }, null, 8, ["src", "stencil-props"])
        ]),
        o("div", Ui, [
          o("div", Ni, [
            (c(), p(fe, null, ge(v, (P) => o("button", {
              key: P.label,
              type: "button",
              class: te(["vuefinder__image-editor__chip", { "vuefinder__image-editor__chip--active": u.value === P.value }]),
              onClick: (V) => u.value = P.value
            }, y(i(d)(P.label)), 11, Hi)), 64))
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: r.value,
            onClick: E
          }, y(i(d)("Apply")), 9, ji)
        ])
      ])) : l.value === "rotate" ? (c(), p("div", Ki, [
        o("div", qi, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Pe(C.value),
            alt: t.filename
          }, null, 12, Wi)
        ]),
        o("div", Gi, [
          o("div", Yi, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__icon-btn",
              title: i(d)("Rotate left 90°"),
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
            ])], 8, Xi),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__icon-btn",
              title: i(d)("Rotate right 90°"),
              onClick: G
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
            ])], 8, Qi),
            o("button", {
              type: "button",
              class: te(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": _.value }]),
              title: i(d)("Flip horizontal"),
              onClick: T
            }, [...z[10] || (z[10] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 7 8 11"></polyline><polyline points="16 3 20 7 16 11"></polyline><line x1="4" y1="7" x2="20" y2="7"></line><line x1="12" y1="13" x2="12" y2="21"></line></svg>', 1)
            ])], 10, Ji),
            o("button", {
              type: "button",
              class: te(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": k.value }]),
              title: i(d)("Flip vertical"),
              onClick: M
            }, [...z[11] || (z[11] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8 7 4 11 8"></polyline><polyline points="3 16 7 20 11 16"></polyline><line x1="7" y1="4" x2="7" y2="20"></line><line x1="13" y1="12" x2="21" y2="12"></line></svg>', 1)
            ])], 10, Zi)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: r.value || !Y.value,
            onClick: L
          }, y(i(d)("Apply")), 9, ea)
        ])
      ])) : l.value === "grayscale" ? (c(), p("div", ta, [
        o("div", na, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Pe(w.value ? { filter: "grayscale(1)" } : {}),
            alt: t.filename
          }, null, 12, oa)
        ]),
        o("div", sa, [
          o("label", ia, [
            he(o("input", {
              "onUpdate:modelValue": z[0] || (z[0] = (P) => w.value = P),
              type: "checkbox"
            }, null, 512), [
              [lt, w.value]
            ]),
            o("span", null, y(i(d)("Grayscale")), 1)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: r.value || !B.value,
            onClick: q
          }, y(i(d)("Apply")), 9, aa)
        ])
      ])) : (c(), p("div", la, [
        o("div", ra, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Pe({ filter: f.value }),
            alt: t.filename
          }, null, 12, da)
        ]),
        o("div", ca, [
          o("div", ua, [
            o("label", null, [
              ye(y(i(d)("Brightness")), 1),
              o("span", null, y($.value), 1)
            ]),
            he(o("input", {
              "onUpdate:modelValue": z[1] || (z[1] = (P) => $.value = P),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                Ke,
                $.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", va, [
            o("label", null, [
              ye(y(i(d)("Contrast")), 1),
              o("span", null, y(m.value), 1)
            ]),
            he(o("input", {
              "onUpdate:modelValue": z[2] || (z[2] = (P) => m.value = P),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                Ke,
                m.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", fa, [
            o("label", null, [
              ye(y(i(d)("Saturation")), 1),
              o("span", null, y(g.value), 1)
            ]),
            he(o("input", {
              "onUpdate:modelValue": z[3] || (z[3] = (P) => g.value = P),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                Ke,
                g.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", _a, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__reset",
              onClick: ee
            }, y(i(d)("Reset")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__apply",
              disabled: r.value || !ce.value,
              onClick: Z
            }, y(i(d)("Apply")), 9, pa)
          ])
        ])
      ]))
    ]));
  }
}), ha = { class: "vuefinder__image-preview" }, ga = ["src"], ya = ["aria-label", "title"], wa = ["aria-label", "title"], ba = ["aria-label", "title"], ka = 0.5, $a = 3, Sn = 0.25, xa = /* @__PURE__ */ le({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = e, n = ae(), a = Be(n), { enabled: d } = Ve(), { t: l } = n.i18n, r = I(!1), u = I(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), v = I(u.value), b = I(!1), h = I(1), _ = I(null), k = I(0), w = I(0), $ = I(1), m = I(!1), g = I(0), f = I(0);
    let x = null, C = 0, F = 0, E = 0, L = 0;
    const { addExternalFiles: q, upload: Z, queue: ee } = Qn(n.customUploader), Q = n.fs, G = oe(Q.path), T = R(() => k.value * $.value), M = R(() => w.value * $.value), U = (K, se) => {
      const ve = _.value?.clientWidth ?? 0, be = _.value?.clientHeight ?? 0, Ie = Math.max(0, (T.value * h.value - ve) / 2), tt = Math.max(0, (M.value * h.value - be) / 2);
      return {
        x: Math.min(Ie, Math.max(-Ie, K)),
        y: Math.min(tt, Math.max(-tt, se))
      };
    }, Y = R(() => {
      if (!k.value || !w.value)
        return {};
      const { x: K, y: se } = U(g.value, f.value);
      return {
        width: `${T.value}px`,
        height: `${M.value}px`,
        transform: `translate(${K}px, ${se}px) scale(${h.value})`,
        transformOrigin: "center center"
      };
    }), ce = () => {
      if (!_.value || !k.value || !w.value) return;
      const K = _.value.getBoundingClientRect();
      !K.width || !K.height || ($.value = Math.min(K.width / k.value, K.height / w.value));
    }, B = (K) => {
      const se = K.target;
      se instanceof HTMLImageElement && (k.value = se.naturalWidth || se.clientWidth, w.value = se.naturalHeight || se.clientHeight, ce());
    }, S = (K) => Math.min($a, Math.max(ka, K)), z = () => {
      h.value = S(Number((h.value + Sn).toFixed(2)));
      const K = U(g.value, f.value);
      g.value = K.x, f.value = K.y;
    }, P = () => {
      h.value = S(Number((h.value - Sn).toFixed(2)));
      const K = U(g.value, f.value);
      g.value = K.x, f.value = K.y;
    }, V = () => {
      h.value = 1, g.value = 0, f.value = 0;
    }, A = (K) => {
      r.value || (K.deltaY > 0 ? P() : K.deltaY < 0 && z());
    }, O = (K) => {
      if (r.value) return;
      const se = K.target;
      if (se instanceof HTMLInputElement || se instanceof HTMLTextAreaElement || se?.isContentEditable)
        return;
      const ve = K.key === "=" || K.key === "+", be = K.key === "-" || K.key === "_", Ie = K.key === "0";
      if (!(!ve && !be && !Ie)) {
        if (K.preventDefault(), ve) {
          z();
          return;
        }
        if (be) {
          P();
          return;
        }
        V();
      }
    }, H = () => {
      m.value = !1;
    }, D = (K) => {
      r.value || h.value <= 1 || !_.value || (m.value = !0, C = K.clientX, F = K.clientY, E = g.value, L = f.value, K.currentTarget?.setPointerCapture?.(K.pointerId));
    }, N = (K) => {
      if (!m.value) return;
      const se = K.clientX - C, ve = K.clientY - F, be = U(E + se, L + ve);
      g.value = be.x, f.value = be.y;
    };
    tn({
      isEditable: R(
        () => d("edit") && !n.fs.isReadOnly(n.modal.data.item)
      ),
      isEditing: R(() => r.value),
      isDirty: R(() => r.value && b.value),
      primaryActionLabel: R(() => l("Save")),
      enterEdit: () => {
        v.value = u.value, b.value = !1, r.value = !0, n.modal.setEditMode(!0);
      },
      commitEdit: () => me(),
      cancelEdit: () => {
        r.value = !1, v.value = u.value, b.value = !1, n.modal.setEditMode(!1);
      },
      extraInfo: R(() => !k.value || !w.value ? [] : [{ label: l("Dimensions"), value: `${k.value} × ${w.value}` }])
    });
    const de = (K) => {
      v.value = K, b.value = !0;
    }, me = async () => {
      if (!b.value) return;
      const K = n.modal.data.item.basename, se = K.split(".").pop()?.toLowerCase() || "jpg", ve = se === "png" ? "image/png" : se === "gif" ? "image/gif" : "image/jpeg";
      try {
        const be = await Ti(v.value), Ie = new File([be], K, { type: ve }), J = n.modal.data.item.path.split("/");
        J.pop();
        const ie = {
          path: J.join("/") || (G.value?.path ?? "")
        };
        q([Ie]), await new Promise((Se) => setTimeout(Se, 100));
        const re = ee.value.find((Se) => Se.name === Ie.name);
        if (!re)
          throw new Error("File was not added to upload queue");
        Z(ie);
        let Ue = 0;
        for (; Ue < 150; ) {
          await new Promise((We) => setTimeout(We, 200));
          const Se = ee.value.find((We) => We.id === re.id);
          if (Se?.status === xe.DONE) break;
          if (Se?.status === xe.ERROR)
            throw new Error(Se.statusName || "Upload failed");
          Ue++;
        }
        a.success(l("Updated.")), await fetch(u.value, { cache: "reload", mode: "no-cors" });
        const Ee = n.root?.querySelector?.('[data-src="' + u.value + '"]');
        Ee && Ee instanceof HTMLElement && qt.resetStatus(Ee), n.emitter.emit("vf-refresh-thumbnails"), r.value = !1, b.value = !1, v.value = u.value, n.modal.setEditMode(!1), t("success");
      } catch (be) {
        a.error(Fe(be, l("Failed to save image")));
      }
    };
    return we(() => {
      x = new ResizeObserver(() => {
        ce();
      }), _.value && x.observe(_.value), window.addEventListener("keydown", O), t("success");
    }), wt(() => {
      window.removeEventListener("keydown", O), x?.disconnect();
    }), (K, se) => (c(), p("div", ha, [
      o("div", {
        ref_key: "imageContainer",
        ref: _,
        class: "vuefinder__image-preview__image-container"
      }, [
        r.value ? (c(), X(ma, {
          key: 1,
          src: v.value,
          filename: i(n).modal.data.item.basename,
          "onUpdate:src": de
        }, null, 8, ["src", "filename"])) : (c(), p("div", {
          key: 0,
          class: "vuefinder__image-preview__stage",
          onWheel: _e(A, ["prevent"])
        }, [
          o("img", {
            style: Pe(Y.value),
            src: i(n).modal.data.item.previewUrl ?? i(n).adapter.getPreviewUrl({ path: i(n).modal.data.item.path }),
            class: te(["vuefinder__image-preview__image", {
              "vuefinder__image-preview__image--zoomed": h.value > 1,
              "vuefinder__image-preview__image--panning": m.value
            }]),
            draggable: !1,
            onLoad: B,
            onPointerdown: D,
            onPointermove: N,
            onPointerup: H,
            onPointercancel: H,
            onLostpointercapture: H
          }, null, 46, ga),
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
              "aria-label": i(l)("Zoom out"),
              title: i(l)("Zoom out"),
              onClick: P
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
            ])], 8, ya),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-reset",
              "aria-label": i(l)("Reset zoom"),
              title: i(l)("Reset zoom"),
              onClick: V
            }, y(Math.round(h.value * 100)) + "% ", 9, wa),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": i(l)("Zoom in"),
              title: i(l)("Zoom in"),
              onClick: z
            }, [...se[3] || (se[3] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>', 1)
            ])], 8, ba)
          ], 32)
        ], 32))
      ], 512)
    ]));
  }
}), Sa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ca(s, e) {
  return c(), p("svg", Sa, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ht = { render: Ca }, Fa = { class: "vuefinder__default-preview" }, Ea = { class: "vuefinder__default-preview__content" }, Pa = { class: "vuefinder__default-preview__icon-container" }, Ta = ["title"], Da = /* @__PURE__ */ le({
  __name: "Default",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = ae(), n = e;
    return we(() => {
      n("success");
    }), (a, d) => (c(), p("div", Fa, [
      o("div", Ea, [
        o("div", Pa, [
          W(i(ht), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            class: "vuefinder__default-preview__file-name",
            title: i(t).modal.data.item.path
          }, y(i(t).modal.data.item.basename), 9, Ta)
        ])
      ])
    ]));
  }
}), Ma = { class: "vuefinder__video-preview" }, Ia = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Aa = ["src"], Oa = /* @__PURE__ */ le({
  __name: "Video",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = ae(), n = e, a = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return we(() => {
      n("success");
    }), (d, l) => (c(), p("div", Ma, [
      o("div", null, [
        o("video", Ia, [
          o("source", {
            src: a(),
            type: "video/mp4"
          }, null, 8, Aa),
          l[0] || (l[0] = ye(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), La = { class: "vuefinder__audio-preview" }, Ra = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Ba = ["src"], za = /* @__PURE__ */ le({
  __name: "Audio",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = e;
    ae();
    const n = () => {
      const a = ae();
      return a.adapter.getPreviewUrl({ path: a.modal.data.item.path });
    };
    return we(() => {
      t("success");
    }), (a, d) => (c(), p("div", La, [
      o("div", null, [
        o("audio", Ra, [
          o("source", {
            src: n(),
            type: "audio/mpeg"
          }, null, 8, Ba),
          d[0] || (d[0] = ye(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Va = { class: "vuefinder__pdf-preview" }, Ua = ["data"], Na = ["src"], Ha = /* @__PURE__ */ le({
  __name: "Pdf",
  emits: ["success"],
  setup(s, { emit: e }) {
    ae();
    const t = e, n = () => {
      const a = ae();
      return a.adapter.getPreviewUrl({ path: a.modal.data.item.path });
    };
    return we(() => {
      t("success");
    }), (a, d) => (c(), p("div", Va, [
      o("div", null, [
        o("object", {
          class: "vuefinder__pdf-preview__object",
          data: n(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          o("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: n(),
            width: "100%",
            height: "100%"
          }, " Your browser does not support PDFs ", 8, Na)
        ], 8, Ua)
      ])
    ]));
  }
}), ja = ["data-theme"], Ka = ["disabled", "title"], qa = ["disabled", "title"], Wa = { class: "vuefinder__preview-modal__content" }, Ga = { key: 0 }, Ya = {
  key: 1,
  class: "vuefinder__preview-modal__status-strip"
}, Xa = ["aria-label"], Qa = { class: "vuefinder__preview-modal__loading" }, Ja = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Za = { class: "vuefinder__preview-modal__edit-actions" }, el = ["disabled"], Cn = 8, tl = 1.4, nl = 0.22, dt = 220, ol = ".vuefinder__preview-chrome__title, .vuefinder__preview-modal__status-strip", Ye = /* @__PURE__ */ le({
  __name: "ModalPreview",
  setup(s) {
    const e = ae(), { enabled: t } = Ve(), { t: n } = e.i18n, a = I(!1), d = (A) => {
      const O = (A || "").split("/").pop() || "", H = O.lastIndexOf(".");
      return H >= 0 ? O.slice(H + 1).toLowerCase() : "";
    }, l = (A, O) => {
      if (!O) return !1;
      const H = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), D = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), N = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), de = /* @__PURE__ */ new Set([
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
      return A === "image" ? H.has(O) : A === "video" ? D.has(O) : A === "audio" ? N.has(O) : A === "csv" ? O === "csv" || O === "tsv" : A === "text" ? de.has(O) : A === "application/pdf" ? O === "pdf" : !1;
    }, r = (A) => {
      const O = e.modal.data.forceType;
      if (O) return O === A;
      const H = e.modal.data.item.mime_type;
      if (H && typeof H == "string" && H.startsWith(A)) return !0;
      const D = d(e.modal.data.item.path);
      return l(A, D);
    }, u = t("preview");
    u || (a.value = !0);
    const v = R(() => e.modal.data.item), b = oe(e.fs.sortedFiles), h = R(() => b.value.filter((A) => A.type === "file")), _ = R(
      () => h.value.findIndex((A) => A.path === v.value.path)
    ), k = R(() => !!i(e.modal.controls?.isEditable)), w = R(() => !!i(e.modal.controls?.isEditing)), $ = R(() => !!i(e.modal.controls?.isDirty)), m = R(
      () => i(e.modal.controls?.primaryActionLabel) ?? n("Save")
    ), g = async () => {
      await e.modal.controls?.enterEdit?.();
    }, f = async () => {
      await e.modal.controls?.commitEdit?.();
    }, x = async () => {
      $.value && !window.confirm(n("Discard unsaved changes?")) || await e.modal.controls?.cancelEdit?.();
    }, C = R(() => !w.value && _.value > 0), F = R(
      () => !w.value && _.value < h.value.length - 1
    ), E = () => {
      if (!C.value) return;
      const A = h.value[_.value - 1];
      A && (e.fs.clearSelection(), e.fs.select(A.path), e.modal.data.item = A, a.value = !1);
    }, L = () => {
      if (!F.value) return;
      const A = h.value[_.value + 1];
      A && (e.fs.clearSelection(), e.fs.select(A.path), e.modal.data.item = A, a.value = !1);
    }, q = () => {
      w.value && $.value && !window.confirm(n("Discard unsaved changes?")) || e.modal.close();
    }, Z = I(0), ee = I(!1);
    let Q = 0, G = 0, T = !1, M = !1;
    const U = R(() => ({
      transform: `translate3d(${Z.value}px, 0, 0)`,
      transition: ee.value ? `transform ${dt}ms ease-out` : "none"
    })), Y = (A, O) => {
      setTimeout(O, A);
    }, ce = (A) => {
      if (w.value || A.touches.length !== 1 || !A.target?.closest?.(ol)) return;
      const H = A.touches[0];
      H && (T = !0, M = !1, Q = H.clientX, G = H.clientY, ee.value = !1);
    }, B = (A) => {
      if (!T) return;
      const O = A.touches[0];
      if (!O) return;
      const H = O.clientX - Q, D = O.clientY - G;
      if (!M) {
        if (Math.abs(H) < Cn && Math.abs(D) < Cn) return;
        if (Math.abs(H) < Math.abs(D) * tl) {
          T = !1;
          return;
        }
        M = !0;
      }
      let N = H;
      H > 0 && !C.value && (N = H * 0.3), H < 0 && !F.value && (N = H * 0.3), Z.value = N, A.cancelable && A.preventDefault();
    }, S = (A) => {
      const O = window.innerWidth || 1, H = A === "prev" ? O : -O, D = A === "prev" ? -O : O, N = A === "prev" ? E : L;
      ee.value = !0, Z.value = H, Y(dt, () => {
        N(), ee.value = !1, Z.value = D, requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ee.value = !0, Z.value = 0, Y(dt, () => {
              ee.value = !1;
            });
          });
        });
      });
    }, z = () => {
      if (!T || (T = !1, !M)) return;
      const A = window.innerWidth || 1, O = Z.value, H = Math.abs(O) >= A * nl;
      if (H && O > 0 && C.value) {
        S("prev");
        return;
      }
      if (H && O < 0 && F.value) {
        S("next");
        return;
      }
      ee.value = !0, Z.value = 0, Y(dt, () => {
        ee.value = !1;
      });
    }, P = () => {
      T && (T = !1, M && (ee.value = !0, Z.value = 0, Y(dt, () => {
        ee.value = !1;
      })));
    }, V = (A) => {
      if (A.key === "Escape") {
        A.preventDefault(), A.stopPropagation(), q();
        return;
      }
      if ((A.metaKey || A.ctrlKey) && A.key.toLowerCase() === "s") {
        const O = e.modal.controls;
        if (O && i(O.isEditing)) {
          A.preventDefault(), O.commitEdit();
          return;
        }
      }
      w.value || (A.key === "ArrowLeft" || A.key === "ArrowRight") && (A.preventDefault(), A.stopPropagation(), A.key === "ArrowLeft" ? E() : L());
    };
    return we(() => {
      const A = document.querySelector(".vuefinder__preview-modal");
      A && A.focus();
    }), (A, O) => (c(), X(ze, {
      "on-request-close": q,
      "body-style": U.value,
      "body-class": "vuefinder__modal-layout__body--swipeable " + (w.value ? "vuefinder__modal-layout__body--editing" : ""),
      "on-body-touchstart": ce,
      "on-body-touchmove": B,
      "on-body-touchend": z,
      "on-body-touchcancel": P
    }, yo({
      default: ue(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: V
        }, [
          W(ri, { onCloseRequest: q }),
          (c(), X(bt, { to: "body" }, [
            w.value ? j("", !0) : (c(), p("div", {
              key: 0,
              class: "vuefinder__themer vuefinder__preview-modal__nav-overlay",
              "data-theme": i(e).theme.current
            }, [
              o("button", {
                disabled: !C.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
                title: i(n)("Previous file"),
                onClick: E
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
              ])], 8, Ka),
              o("button", {
                disabled: !F.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
                title: i(n)("Next file"),
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
              ])], 8, qa)
            ], 8, ja))
          ])),
          o("div", Wa, [
            i(u) ? (c(), p("div", Ga, [
              r("csv") ? (c(), X(Si, {
                key: `csv-${v.value.path}`,
                onSuccess: O[0] || (O[0] = (H) => a.value = !0)
              })) : r("text") ? (c(), X(vi, {
                key: `text-${v.value.path}`,
                onSuccess: O[1] || (O[1] = (H) => a.value = !0)
              })) : r("image") ? (c(), X(xa, {
                key: `image-${v.value.path}`,
                onSuccess: O[2] || (O[2] = (H) => a.value = !0)
              })) : r("video") ? (c(), X(Oa, {
                key: `video-${v.value.path}`,
                onSuccess: O[3] || (O[3] = (H) => a.value = !0)
              })) : r("audio") ? (c(), X(za, {
                key: `audio-${v.value.path}`,
                onSuccess: O[4] || (O[4] = (H) => a.value = !0)
              })) : r("application/pdf") ? (c(), X(Ha, {
                key: `pdf-${v.value.path}`,
                onSuccess: O[5] || (O[5] = (H) => a.value = !0)
              })) : (c(), X(Da, {
                key: `default-${v.value.path}`,
                onSuccess: O[6] || (O[6] = (H) => a.value = !0)
              }))
            ])) : j("", !0),
            w.value || h.value.length > 1 ? (c(), p("div", Ya, [
              w.value ? (c(), p("span", {
                key: 0,
                class: te(["vuefinder__preview-modal__edit-chip", { "vuefinder__preview-modal__edit-chip--dirty": $.value }])
              }, y($.value ? i(n)("Unsaved") : i(n)("Editing")), 3)) : (c(), p("span", {
                key: 1,
                class: "vuefinder__preview-modal__pagination-text",
                "aria-label": i(n)("File %s of %s", String(_.value + 1), String(h.value.length))
              }, y(_.value + 1) + " / " + y(h.value.length), 9, Xa))
            ])) : j("", !0),
            o("div", Qa, [
              a.value === !1 ? (c(), p("div", Ja, [
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
                o("span", null, y(i(n)("Loading")), 1)
              ])) : j("", !0)
            ])
          ])
        ], 32)
      ]),
      _: 2
    }, [
      k.value ? {
        name: "buttons",
        fn: ue(() => [
          o("div", Za, [
            w.value ? (c(), p(fe, { key: 1 }, [
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
                disabled: !$.value,
                onClick: f
              }, y(m.value), 9, el),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary vuefinder__preview-modal__edit-btn",
                onClick: x
              }, y(i(n)("Cancel")), 1)
            ], 64)) : (c(), p("button", {
              key: 0,
              type: "button",
              class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
              onClick: g
            }, y(i(n)("Edit")), 1))
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
function il(s, e) {
  return c(), p("svg", sl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const al = { render: il }, ll = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function rl(s, e) {
  return c(), p("svg", ll, [...e[0] || (e[0] = [
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
function cl(s, e) {
  return c(), p("svg", dl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Re = { render: cl }, ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function vl(s, e) {
  return c(), p("svg", ul, [...e[0] || (e[0] = [
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
function _l(s, e) {
  return c(), p("svg", fl, [...e[0] || (e[0] = [
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
function ml(s, e) {
  return c(), p("svg", pl, [...e[0] || (e[0] = [
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
function gl(s, e) {
  return c(), p("svg", hl, [...e[0] || (e[0] = [
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
function wl(s, e) {
  return c(), p("svg", yl, [...e[0] || (e[0] = [
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
}, Fl = 300, El = /* @__PURE__ */ le({
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
  setup(s, { emit: e }) {
    const t = ae(), { t: n } = t.i18n, a = t.fs, d = I({}), l = s, r = e;
    oe(a.path);
    const u = R(() => {
      const L = `${l.storage}:${l.folder.path}`;
      return l.expandedFolders[L] || !1;
    }), v = R(() => l.modelValue?.path === l.folder.path), b = R(() => l.currentPath?.path === l.folder.path), h = R(() => l.modalTreeData[l.folder.path] || []), _ = R(() => {
      const L = h.value, q = d.value[l.folder.path] || 50;
      return L.length > q ? L.slice(0, q) : L;
    }), k = R(() => h.value.length), w = R(() => d.value[l.folder.path] || 50), $ = R(() => k.value > w.value), m = () => {
      d.value[l.folder.path] = (w.value || 50) + 50;
    }, g = R(() => h.value.length > 0 || l.folder.type === "dir"), f = () => {
      r("toggleFolder", l.storage, l.folder.path);
    }, x = () => {
      r("update:modelValue", l.folder);
    }, C = () => {
      r("update:modelValue", l.folder), r("selectAndClose", l.folder);
    };
    let F = 0;
    const E = () => {
      const L = Date.now();
      L - F < Fl ? C() : x(), F = L;
    };
    return (L, q) => {
      const Z = Bn("ModalTreeFolderItem", !0);
      return c(), p("div", bl, [
        o("div", kl, [
          g.value ? (c(), p("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: f
          }, [
            u.value ? (c(), X(i(It), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (c(), X(i(Mt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (c(), p("div", $l)),
          o("div", {
            class: te(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": v.value,
              "vuefinder__modal-tree__folder-link--current": b.value
            }]),
            onClick: x,
            onDblclick: C,
            onTouchend: E
          }, [
            u.value ? (c(), X(i(At), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (c(), X(i(Re), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", xl, y(s.folder.basename), 1)
          ], 34)
        ]),
        u.value && g.value ? (c(), p("div", Sl, [
          (c(!0), p(fe, null, ge(_.value, (ee) => (c(), X(Z, {
            key: ee.path,
            folder: ee,
            storage: s.storage,
            "model-value": s.modelValue,
            "expanded-folders": s.expandedFolders,
            "modal-tree-data": s.modalTreeData,
            "current-path": s.currentPath,
            "onUpdate:modelValue": q[0] || (q[0] = (Q) => L.$emit("update:modelValue", Q)),
            onSelectAndClose: q[1] || (q[1] = (Q) => L.$emit("selectAndClose", Q)),
            onToggleFolder: q[2] || (q[2] = (Q, G) => L.$emit("toggleFolder", Q, G))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          $.value ? (c(), p("div", Cl, [
            o("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: m
            }, y(i(n)("load more")), 1)
          ])) : j("", !0)
        ])) : j("", !0)
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
}, Wl = ["onClick"], Fn = 300, kt = /* @__PURE__ */ le({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(s, { emit: e }) {
    const t = ae(), { t: n } = t.i18n, a = t.fs, d = t.config, l = e, r = oe(a.sortedFiles), u = oe(a.storages), v = R(() => u.value || []), b = oe(a.path), h = I(null), _ = I({}), k = I({}), w = I({});
    pe(r, (T) => {
      const M = T.filter((Y) => Y.type === "dir"), U = b.value?.path || "";
      U && (k.value[U] = M.map((Y) => ({
        ...Y,
        type: "dir"
      })));
    });
    const $ = (T, M) => {
      const U = `${T}:${M}`;
      _.value = {
        ..._.value,
        [U]: !_.value[U]
      }, _.value[U] && !k.value[M] && t.adapter.list(M).then((Y) => {
        const B = (Y.files || []).filter((S) => S.type === "dir");
        k.value[M] = B.map((S) => ({
          ...S,
          type: "dir"
        }));
      });
    }, m = (T) => k.value[T] || [], g = (T) => w.value[T] || 50, f = (T) => {
      const M = m(T), U = g(T);
      return M.length > U ? M.slice(0, U) : M;
    }, x = (T) => m(T).length, C = (T) => x(T) > g(T), F = (T) => {
      w.value[T] = g(T) + 50;
    }, E = (T) => {
      T && l("update:modelValue", T);
    }, L = (T) => {
      T && (l("update:modelValue", T), l("selectAndClose", T));
    }, q = (T) => {
      const M = {
        storage: T,
        path: T + "://",
        basename: T,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: T + "://"
      };
      l("update:modelValue", M);
    }, Z = (T) => {
      const M = {
        storage: T,
        path: T + "://",
        basename: T,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: T + "://"
      };
      l("update:modelValue", M), l("selectAndClose", M);
    };
    let ee = 0;
    const Q = (T) => {
      if (!T) return;
      const M = Date.now();
      M - ee < Fn ? L(T) : E(T), ee = M;
    }, G = (T) => {
      const M = Date.now();
      M - ee < Fn ? Z(T) : q(T), ee = M;
    };
    return we(() => {
      h.value && ft(h.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (T, M) => (c(), p("div", Pl, [
      o("div", Tl, [
        o("div", Dl, y(i(n)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: h,
        class: "vuefinder__modal-tree__content"
      }, [
        s.showPinnedFolders && i(t).features.pinned && i(d).get("pinnedFolders").length ? (c(), p("div", Ml, [
          o("div", Il, y(i(n)("Pinned Folders")), 1),
          o("div", Al, [
            (c(!0), p(fe, null, ge(i(d).get("pinnedFolders"), (U) => (c(), p("div", {
              key: U.path,
              class: te(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": s.modelValue?.path === U.path }]),
              onClick: (Y) => E(U),
              onDblclick: (Y) => L(U),
              onTouchend: (Y) => Q(U)
            }, [
              W(i(Re), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", Ll, y(U.basename), 1),
              o("div", Rl, y(U.storage), 1),
              W(i(gt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ol))), 128))
          ])
        ])) : j("", !0),
        o("div", Bl, y(i(n)("Storages")), 1),
        (c(!0), p(fe, null, ge(v.value, (U) => (c(), p("div", {
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
                  _.value[`${U}:${U}://`] ? (c(), X(i(It), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (c(), X(i(Mt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Nl),
                o("div", {
                  class: te(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": s.modelValue?.path === U + "://"
                  }]),
                  onClick: (Y) => q(U),
                  onDblclick: (Y) => Z(U),
                  onTouchend: (Y) => G(U)
                }, [
                  W(i(an), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", jl, y(U), 1)
                ], 42, Hl)
              ]),
              _.value[`${U}:${U}://`] ? (c(), p("div", Kl, [
                (c(!0), p(fe, null, ge(f(U + "://"), (Y) => (c(), X(El, {
                  key: Y.path,
                  folder: Y,
                  storage: U,
                  "model-value": s.modelValue,
                  "expanded-folders": _.value,
                  "modal-tree-data": k.value,
                  "current-path": s.currentPath,
                  "onUpdate:modelValue": E,
                  onSelectAndClose: L,
                  onToggleFolder: $
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                C(U + "://") ? (c(), p("div", ql, [
                  o("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (Y) => F(U + "://")
                  }, y(i(n)("load more")), 9, Wl)
                ])) : j("", !0)
              ])) : j("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Gl = ["title"], Gt = /* @__PURE__ */ le({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(s, { emit: e }) {
    const t = e, n = ae(), { t: a } = n.i18n, d = I(!1), l = I(null), r = I(l.value?.innerHTML);
    pe(r, () => d.value = !1);
    const u = () => {
      t("hidden"), d.value = !0;
    };
    return (v, b) => (c(), p("div", null, [
      d.value ? j("", !0) : (c(), p("div", {
        key: 0,
        ref_key: "strMessage",
        ref: l,
        class: te(["vuefinder__message", s.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Me(v.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: i(a)("Close"),
          onClick: u
        }, [...b[0] || (b[0] = [
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
}, sr = { class: "vuefinder__move-modal__target-badge" }, ir = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, ar = { class: "vuefinder__move-modal__checkbox-label" }, lr = { class: "vuefinder__move-modal__checkbox-text" }, rr = ["disabled"], dr = { class: "vuefinder__move-modal__selected-items" }, eo = /* @__PURE__ */ le({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(s) {
    const e = ae(), t = Be(e), { enabled: n } = Ve(), { t: a } = e.i18n, d = s, l = I(e.modal.data.items.from), r = I(e.modal.data.items.to), u = I(""), v = I(d.copy || !n("move")), b = R(() => v.value ? "copy" : "move"), h = I(!1), _ = oe(e.fs.path), k = R(() => v.value ? a("Copy files") : a("Move files")), w = R(
      () => v.value ? a("Are you sure you want to copy these files?") : a("Are you sure you want to move these files?")
    ), $ = R(() => v.value ? a("Yes, Copy!") : a("Yes, Move!"));
    R(() => v.value ? a("Files copied.") : a("Files moved."));
    const m = (E) => {
      E && (r.value = E);
    }, g = (E) => {
      E && (r.value = E, h.value = !1);
    }, f = R(() => {
      const E = r.value;
      return E ? l.value.some((L) => !!(E.path === L.path || L.type === "dir" && E.path.startsWith(L.path + "/"))) : !0;
    }), x = R(() => {
      if (!f.value)
        return "";
      const E = r.value;
      return E ? l.value.find((q) => E.path === q.path || q.type === "dir" && E.path.startsWith(q.path + "/")) ? a("Cannot move/copy item to itself or its own subfolder") : a("Invalid destination directory") : a("Please select a destination directory");
    }), C = () => {
      const E = r.value.path;
      if (!E) return { storage: "local", path: "" };
      if (E.endsWith("://"))
        return { storage: E.replace("://", ""), path: "" };
      const L = E.split("://");
      return {
        storage: L[0] || "local",
        path: L[1] || ""
      };
    }, F = async () => {
      if (l.value.length)
        try {
          const { files: E } = await e.adapter[b.value]({
            path: _.value.path,
            sources: l.value.map(({ path: L }) => L),
            destination: r.value.path
          });
          e.fs.setFiles(E), e.modal.close();
        } catch (E) {
          t.error(Fe(E, a("Failed to transfer files")));
        }
    };
    return (E, L) => (c(), X(ze, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: f.value,
          onClick: F
        }, y($.value), 9, rr),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: L[4] || (L[4] = (q) => i(e).modal.close())
        }, y(i(a)("Cancel")), 1),
        o("div", dr, y(i(a)("%s item(s) selected.", l.value.length)), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          W(Ne, {
            icon: v.value ? i(sn) : i(al),
            title: k.value
          }, null, 8, ["icon", "title"]),
          o("div", Yl, [
            o("p", Xl, y(w.value), 1),
            o("div", Ql, [
              (c(!0), p(fe, null, ge(l.value, (q) => (c(), p("div", {
                key: q.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  q.type === "dir" ? (c(), X(i(Re), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (c(), X(i(ht), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", Jl, y(q.path), 1)
              ]))), 128))
            ]),
            o("h4", Zl, y(i(a)("Target Directory")), 1),
            o("div", er, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: L[0] || (L[0] = (q) => h.value = !h.value)
              }, [
                o("div", tr, [
                  o("span", nr, y(C().storage) + "://", 1),
                  C().path ? (c(), p("span", or, y(C().path), 1)) : j("", !0)
                ]),
                o("span", sr, y(i(a)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: te([
                "vuefinder__move-modal__tree-selector",
                h.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              W(kt, {
                modelValue: r.value,
                "onUpdate:modelValue": [
                  L[1] || (L[1] = (q) => r.value = q),
                  m
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: g
              }, null, 8, ["modelValue"])
            ], 2),
            i(n)("copy") && i(n)("move") ? (c(), p("div", ir, [
              o("label", ar, [
                he(o("input", {
                  "onUpdate:modelValue": L[2] || (L[2] = (q) => v.value = q),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [lt, v.value]
                ]),
                o("span", lr, y(i(a)("Create a copy instead of moving")), 1)
              ])
            ])) : j("", !0),
            x.value ? (c(), X(Gt, {
              key: 1,
              error: ""
            }, {
              default: ue(() => [
                ye(y(x.value), 1)
              ]),
              _: 1
            })) : j("", !0),
            u.value.length && !x.value ? (c(), X(Gt, {
              key: 2,
              error: "",
              onHidden: L[3] || (L[3] = (q) => u.value = "")
            }, {
              default: ue(() => [
                ye(y(u.value), 1)
              ]),
              _: 1
            })) : j("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), at = /* @__PURE__ */ le({
  __name: "ModalMove",
  setup(s) {
    return (e, t) => (c(), X(eo, { copy: !1 }));
  }
}), ln = /* @__PURE__ */ le({
  __name: "ModalCopy",
  setup(s) {
    return (e, t) => (c(), X(eo, { copy: !0 }));
  }
}), cr = (s, e = 0, t = !1) => {
  let n;
  return (...a) => {
    t && !n && s(...a), clearTimeout(n), n = setTimeout(() => {
      s(...a);
    }, e);
  };
}, to = (s, e, t) => {
  const n = I(s);
  return wo((a, d) => ({
    get() {
      return a(), n.value;
    },
    set: cr(
      (l) => {
        n.value = l, d();
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
function vr(s, e) {
  return c(), p("svg", ur, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const rn = { render: vr }, fr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function _r(s, e) {
  return c(), p("svg", fr, [...e[0] || (e[0] = [
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
}, gr = /* @__PURE__ */ le({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(s, { expose: e, emit: t }) {
    const n = t, a = ae(), { t: d } = a.i18n, l = I(null), r = (v) => {
      const b = v.target;
      n("update:modelValue", b.value);
    }, u = (v) => {
      n("keydown", v);
    };
    return e({
      focus: () => {
        l.value && l.value.focus();
      }
    }), (v, b) => (c(), p("div", pr, [
      W(i(rn), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: l,
        value: s.modelValue,
        type: "text",
        placeholder: i(d)("Search files"),
        disabled: s.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: u,
        onKeyup: b[0] || (b[0] = _e(() => {
        }, ["stop"])),
        onInput: r
      }, null, 40, mr),
      s.isSearching ? (c(), p("div", hr, [
        W(i(Ot), { class: "vuefinder__search-modal__loading-icon" })
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
function wr(s, e) {
  return c(), p("svg", yr, [...e[0] || (e[0] = [
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
}, Lr = /* @__PURE__ */ le({
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
  setup(s, { expose: e, emit: t }) {
    const n = s, a = t, d = ae(), { t: l } = d.i18n, r = I(null), u = I(null);
    let v = null;
    const b = [
      { value: "name-asc", key: "Name (A-Z)" },
      { value: "name-desc", key: "Name (Z-A)" },
      { value: "size-asc", key: "Size (smallest)" },
      { value: "size-desc", key: "Size (largest)" },
      { value: "date-desc", key: "Date (newest)" },
      { value: "date-asc", key: "Date (oldest)" }
    ], h = (g) => {
      if (a("update:selectedOption", g), g.startsWith("size-")) {
        const f = g.split("-")[1];
        a("update:sizeFilter", f);
      }
    }, _ = (g) => {
      a("update:sortBy", g);
    }, k = async () => {
      n.disabled || (n.visible ? (a("update:visible", !1), v && (v(), v = null)) : (a("update:visible", !0), await De(), await w()));
    }, w = async () => {
      if (!(!r.value || !u.value) && (await De(), !(!r.value || !u.value))) {
        Object.assign(u.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: g, y: f } = await it(r.value, u.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
          });
          Object.assign(u.value.style, {
            left: `${g}px`,
            top: `${f}px`
          }), requestAnimationFrame(() => {
            u.value && Object.assign(u.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (g) {
          console.warn("Floating UI initial positioning error:", g);
          return;
        }
        try {
          v = Xt(r.value, u.value, async () => {
            if (!(!r.value || !u.value))
              try {
                const { x: g, y: f } = await it(
                  r.value,
                  u.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
                  }
                );
                Object.assign(u.value.style, {
                  left: `${g}px`,
                  top: `${f}px`
                });
              } catch (g) {
                console.warn("Floating UI positioning error:", g);
              }
          });
        } catch (g) {
          console.warn("Floating UI autoUpdate setup error:", g), v = null;
        }
      }
    }, $ = (g) => {
      if (!n.visible) return;
      const f = ["size-all", "size-small", "size-medium", "size-large"], x = f.findIndex((C) => C === n.selectedOption);
      if (g.key === "ArrowDown") {
        g.preventDefault();
        const C = (x + 1) % f.length;
        a("update:selectedOption", f[C] || null);
      } else if (g.key === "ArrowUp") {
        g.preventDefault();
        const C = x <= 0 ? f.length - 1 : x - 1;
        a("update:selectedOption", f[C] || null);
      } else g.key === "Enter" ? (g.preventDefault(), n.selectedOption?.startsWith("size-") && a(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : g.key === "Escape" && (g.preventDefault(), a("update:visible", !1), v && (v(), v = null));
    }, m = () => {
      v && (v(), v = null);
    };
    return pe(
      () => n.visible,
      (g) => {
        !g && v && (v(), v = null);
      }
    ), Te(() => {
      m();
    }), e({
      cleanup: m
    }), (g, f) => (c(), p(fe, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: r,
        class: te(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": s.visible }]),
        disabled: s.disabled,
        title: i(l)("Search Options"),
        onClick: _e(k, ["stop"])
      }, [
        W(i(no), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, br),
      (c(), X(bt, { to: "body" }, [
        s.visible ? (c(), p("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: u,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": i(d).theme.current,
          tabindex: "-1",
          onClick: f[4] || (f[4] = _e(() => {
          }, ["stop"])),
          onKeydown: $
        }, [
          o("div", $r, [
            o("div", xr, [
              o("div", Sr, y(i(l)("File Size")), 1),
              o("div", Cr, [
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "all"
                  }]),
                  onClick: f[0] || (f[0] = _e((x) => h("size-all"), ["stop"]))
                }, [
                  o("span", null, y(i(l)("All Files")), 1),
                  s.sizeFilter === "all" ? (c(), p("div", Fr, [...f[5] || (f[5] = [
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
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "small"
                  }]),
                  onClick: f[1] || (f[1] = _e((x) => h("size-small"), ["stop"]))
                }, [
                  o("span", null, y(i(l)("Small (< 1MB)")), 1),
                  s.sizeFilter === "small" ? (c(), p("div", Er, [...f[6] || (f[6] = [
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
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "medium"
                  }]),
                  onClick: f[2] || (f[2] = _e((x) => h("size-medium"), ["stop"]))
                }, [
                  o("span", null, y(i(l)("Medium (1-10MB)")), 1),
                  s.sizeFilter === "medium" ? (c(), p("div", Pr, [...f[7] || (f[7] = [
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
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "large"
                  }]),
                  onClick: f[3] || (f[3] = _e((x) => h("size-large"), ["stop"]))
                }, [
                  o("span", null, y(i(l)("Large (> 10MB)")), 1),
                  s.sizeFilter === "large" ? (c(), p("div", Tr, [...f[8] || (f[8] = [
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
              o("div", Mr, y(i(l)("Sort by")), 1),
              o("div", Ir, [
                (c(), p(fe, null, ge(b, (x) => o("div", {
                  key: x.value,
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sortBy === x.value
                  }]),
                  onClick: _e((C) => _(x.value), ["stop"])
                }, [
                  o("span", null, y(i(l)(x.key)), 1),
                  s.sortBy === x.value ? (c(), p("div", Or, [...f[9] || (f[9] = [
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
function Lt(s, e = 40) {
  const t = s.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return s;
  const n = t[1], a = t[2] ?? "", d = a.split("/").filter(Boolean), l = d.pop();
  if (!l) return n + a;
  let r = `${n}${d.join("/")}${d.length ? "/" : ""}${l}`;
  if (r.length <= e) return r;
  const u = l.split(/\.(?=[^\.]+$)/), v = u[0] ?? "", b = u[1] ?? "", h = v.length > 10 ? `${v.slice(0, 6)}...${v.slice(-5)}` : v, _ = b ? `${h}.${b}` : h;
  return r = `${n}${d.join("/")}${d.length ? "/" : ""}${_}`, r.length > e && (r = `${n}.../${_}`), r;
}
async function oo(s) {
  try {
    await navigator.clipboard.writeText(s);
  } catch {
    const e = document.createElement("textarea");
    e.value = s, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function yt(s) {
  await oo(s);
}
async function Rr(s) {
  await oo(s);
}
const Br = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function zr(s, e) {
  return c(), p("svg", Br, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const so = { render: zr }, Vr = ["title"], Ur = { class: "vuefinder__search-modal__result-icon" }, Nr = { class: "vuefinder__search-modal__result-content" }, Hr = { class: "vuefinder__search-modal__result-name" }, jr = {
  key: 1,
  class: "vuefinder__search-modal__result-size"
}, Kr = ["title"], qr = ["title"], Wr = ["data-item-dropdown", "data-theme"], Gr = { class: "vuefinder__search-modal__item-dropdown-content" }, Yr = /* @__PURE__ */ le({
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
  setup(s, { emit: e }) {
    const t = s, n = e, a = ae(), { t: d } = a.i18n, { enabled: l } = Ve(), r = oe(a.config.state), u = R(() => l("pinned")), v = R(
      () => r.value.pinnedFolders.some((T) => T.path === t.item.path)
    ), b = (T) => {
      const M = a.config.get("pinnedFolders");
      M.some((U) => U.path === T.path) ? a.config.set(
        "pinnedFolders",
        M.filter((U) => U.path !== T.path)
      ) : a.config.set("pinnedFolders", [...M, T]);
    }, h = I(null);
    let _ = null, k = null, w = [], $ = null;
    pe(
      () => t.activeDropdown,
      (T) => {
        _ && (_(), _ = null), k && (w.forEach((M) => {
          M === window ? window.removeEventListener("scroll", k, !0) : M.removeEventListener("scroll", k, !0);
        }), k = null, w = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null), T === t.item.path && h.value && De(() => {
          E(t.item.path, h.value), g(), f();
        });
      }
    );
    const m = (T) => {
      const M = [];
      let U = T;
      for (; U && U !== document.body && U !== document.documentElement; ) {
        const Y = window.getComputedStyle(U), ce = Y.overflow + Y.overflowX + Y.overflowY;
        (ce.includes("scroll") || ce.includes("auto")) && M.push(U), U = U.parentElement;
      }
      return M;
    }, g = () => {
      if (t.activeDropdown !== t.item.path) return;
      const T = m(h.value);
      w = [window, ...T], k = () => {
        t.activeDropdown === t.item.path && n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const M = k;
      M && w.forEach((U) => {
        U === window ? window.addEventListener("scroll", M, !0) : U.addEventListener("scroll", M, !0);
      });
    }, f = () => {
      t.activeDropdown === t.item.path && ($ = (T) => {
        if (t.activeDropdown !== t.item.path) return;
        const M = T.target;
        if (!M) return;
        const U = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (U && U.contains(M) || h.value && h.value.contains(M))
          return;
        const Y = a.root;
        if (Y && Y.contains(M)) {
          n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const ce = document.querySelector(".vuefinder__modal-layout");
        if (ce && ce.contains(M)) {
          n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        $ && (document.addEventListener("mousedown", $, !0), document.addEventListener("touchstart", $, !0));
      }, 100));
    };
    Te(() => {
      _ && (_(), _ = null), k && (w.forEach((T) => {
        T === window ? window.removeEventListener("scroll", k, !0) : T.removeEventListener("scroll", k, !0);
      }), k = null, w = []), $ && (document.removeEventListener("mousedown", $, !0), document.removeEventListener("touchstart", $, !0), $ = null);
    });
    const x = (T) => t.expandedPaths.has(T), C = (T) => T.type === "dir" || !T.file_size ? "" : Jt(T.file_size), F = (T, M) => {
      M.stopPropagation(), n("toggleItemDropdown", T, M);
    }, E = async (T, M) => {
      const U = document.querySelector(
        `[data-item-dropdown="${T}"]`
      );
      if (!(!U || !M) && (await De(), !(!U || !M))) {
        Object.assign(U.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: Y, y: ce } = await it(M, U, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
          });
          Object.assign(U.style, {
            left: `${Y}px`,
            top: `${ce}px`
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
          _ = Xt(M, U, async () => {
            if (!(!M || !U))
              try {
                const { x: Y, y: ce } = await it(M, U, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
                });
                Object.assign(U.style, {
                  left: `${Y}px`,
                  top: `${ce}px`
                });
              } catch (Y) {
                console.warn("Floating UI positioning error:", Y);
              }
          });
        } catch (Y) {
          console.warn("Floating UI autoUpdate setup error:", Y), _ = null;
        }
      }
    }, L = (T) => {
      n("update:selectedItemDropdownOption", T);
    }, q = async (T) => {
      await yt(T.path), n("copyPath", T);
    }, Z = (T) => {
      n("openContainingFolder", T);
    }, ee = (T) => {
      n("preview", T);
    }, Q = (T) => {
      n("open", T);
    }, G = (T) => {
      if (!t.activeDropdown) return;
      const M = ["copy-path", "open-folder", "preview"], U = t.selectedItemDropdownOption, Y = M.findIndex((ce) => U?.includes(ce));
      if (T.key === "ArrowDown") {
        T.preventDefault();
        const ce = (Y + 1) % M.length;
        n(
          "update:selectedItemDropdownOption",
          `${M[ce] || ""}-${t.activeDropdown}`
        );
      } else if (T.key === "ArrowUp") {
        T.preventDefault();
        const ce = Y <= 0 ? M.length - 1 : Y - 1;
        n(
          "update:selectedItemDropdownOption",
          `${M[ce] || ""}-${t.activeDropdown}`
        );
      } else T.key === "Enter" ? (T.preventDefault(), U && (U.includes("copy-path") ? q(t.item) : U.includes("open-folder") ? Z(t.item) : U.includes("preview") && ee(t.item))) : T.key === "Escape" && (T.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (T, M) => (c(), p("div", {
      class: te(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": s.index === s.selectedIndex }]),
      title: s.item.basename,
      onClick: M[13] || (M[13] = (U) => n("select", s.index)),
      onDblclick: M[14] || (M[14] = _e((U) => n("activate", s.item), ["stop"]))
    }, [
      o("div", Ur, [
        s.item.type === "dir" ? (c(), X(i(Re), { key: 0 })) : (c(), X(i(ht), { key: 1 }))
      ]),
      o("div", Nr, [
        o("div", Hr, [
          s.item.type === "dir" && u.value && v.value ? (c(), X(i(gt), {
            key: 0,
            class: "vuefinder__search-modal__result-pin",
            title: i(d)("Pinned")
          }, null, 8, ["title"])) : j("", !0),
          ye(" " + y(s.item.basename) + " ", 1),
          C(s.item) ? (c(), p("span", jr, y(C(s.item)), 1)) : j("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: s.item.path,
          onClick: M[0] || (M[0] = _e((U) => {
            n("select", s.index), n("togglePathExpansion", s.item.path);
          }, ["stop"]))
        }, y(x(s.item.path) ? s.item.path : i(Lt)(s.item.path)), 9, Kr)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: h,
        class: "vuefinder__search-modal__result-actions",
        title: i(d)("More actions"),
        onClick: M[1] || (M[1] = (U) => {
          n("selectWithDropdown", s.index), F(s.item.path, U);
        })
      }, [
        W(i(so), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, qr),
      (c(), X(bt, { to: "body" }, [
        s.activeDropdown === s.item.path ? (c(), p("div", {
          key: 0,
          "data-item-dropdown": s.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": i(a).theme.current,
          tabindex: "-1",
          onClick: M[12] || (M[12] = _e(() => {
          }, ["stop"])),
          onKeydown: G
        }, [
          o("div", Gr, [
            o("div", {
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `copy-path-${s.item.path}`
              }]),
              onClick: M[2] || (M[2] = (U) => {
                L(`copy-path-${s.item.path}`), q(s.item);
              }),
              onFocus: M[3] || (M[3] = (U) => L(`copy-path-${s.item.path}`))
            }, [
              W(i(sn), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(i(d)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `open-folder-${s.item.path}`
              }]),
              onClick: M[4] || (M[4] = (U) => {
                L(`open-folder-${s.item.path}`), Z(s.item);
              }),
              onFocus: M[5] || (M[5] = (U) => L(`open-folder-${s.item.path}`))
            }, [
              W(i(Re), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(i(d)("Open Containing Folder")), 1)
            ], 34),
            s.item.type === "dir" ? (c(), p("div", {
              key: 0,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `open-${s.item.path}`
              }]),
              onClick: M[6] || (M[6] = (U) => {
                L(`open-${s.item.path}`), Q(s.item);
              }),
              onFocus: M[7] || (M[7] = (U) => L(`open-${s.item.path}`))
            }, [
              W(i(Re), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(i(d)("Open")), 1)
            ], 34)) : j("", !0),
            s.item.type === "dir" && u.value ? (c(), p("div", {
              key: 1,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `pin-${s.item.path}`
              }]),
              onClick: M[8] || (M[8] = (U) => {
                L(`pin-${s.item.path}`), b(s.item);
              }),
              onFocus: M[9] || (M[9] = (U) => L(`pin-${s.item.path}`))
            }, [
              W(i(gt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(v.value ? i(d)("Unpin Folder") : i(d)("Pin Folder")), 1)
            ], 34)) : (c(), p("div", {
              key: 2,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `preview-${s.item.path}`
              }]),
              onClick: M[10] || (M[10] = (U) => {
                L(`preview-${s.item.path}`), ee(s.item);
              }),
              onFocus: M[11] || (M[11] = (U) => L(`preview-${s.item.path}`))
            }, [
              W(i(ht), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(i(d)("Preview")), 1)
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
}, ed = { class: "vuefinder__search-modal__results-header" }, et = 60, En = 5, td = /* @__PURE__ */ le({
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
  setup(s, { expose: e, emit: t }) {
    const n = s, a = t, d = ae(), { t: l } = d.i18n, r = st("scrollableContainer"), u = R(() => n.searchResults.length > 0), v = R(() => n.searchResults.length), b = I(0), h = I(600), _ = R(() => n.searchResults.length * et), k = R(() => {
      const x = Math.max(0, Math.floor(b.value / et) - En), C = Math.min(
        n.searchResults.length,
        Math.ceil((b.value + h.value) / et) + En
      );
      return { start: x, end: C };
    }), w = R(() => {
      const { start: x, end: C } = k.value;
      return n.searchResults.slice(x, C).map((F, E) => ({
        item: F,
        index: x + E,
        top: (x + E) * et
      }));
    }), $ = (x) => {
      const C = x.target;
      b.value = C.scrollTop;
    }, m = () => {
      r.value && (h.value = r.value.clientHeight);
    }, g = () => {
      if (n.selectedIndex >= 0 && r.value) {
        const x = n.selectedIndex * et, C = x + et, F = r.value.scrollTop, E = r.value.clientHeight, L = F + E;
        let q = F;
        x < F ? q = x : C > L && (q = C - E), q !== F && r.value.scrollTo({
          top: q,
          behavior: "smooth"
        });
      }
    }, f = () => {
      r.value && (r.value.scrollTop = 0, b.value = 0);
    };
    return we(() => {
      m(), window.addEventListener("resize", m);
    }), Te(() => {
      window.removeEventListener("resize", m);
    }), pe(
      () => r.value,
      () => {
        m();
      }
    ), e({
      scrollSelectedIntoView: g,
      resetScroll: f,
      getContainerHeight: () => h.value,
      scrollTop: () => b.value
    }), (x, C) => (c(), p("div", {
      class: te(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": s.resultsEnter }])
    }, [
      s.isSearching ? (c(), p("div", Xr, [
        o("div", Qr, [
          W(i(Ot), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, y(i(l)("Searching...")), 1)
      ])) : u.value ? (c(), p("div", Zr, [
        o("div", ed, [
          o("span", null, y(i(l)("Found %s results", v.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: r,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: $
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: Pe({ height: `${_.value}px`, position: "relative" })
          }, [
            (c(!0), p(fe, null, ge(w.value, (F) => (c(), p("div", {
              key: F.item.path,
              style: Pe({
                position: "absolute",
                top: `${F.top}px`,
                left: "0",
                width: "100%",
                height: `${et}px`
              })
            }, [
              W(Yr, {
                item: F.item,
                index: F.index,
                "selected-index": s.selectedIndex,
                "expanded-paths": s.expandedPaths,
                "active-dropdown": s.activeDropdown,
                "selected-item-dropdown-option": s.selectedItemDropdownOption,
                onSelect: C[0] || (C[0] = (E) => a("selectResultItem", E)),
                onSelectWithDropdown: C[1] || (C[1] = (E) => a("selectResultItemWithDropdown", E)),
                onTogglePathExpansion: C[2] || (C[2] = (E) => a("togglePathExpansion", E)),
                onToggleItemDropdown: C[3] || (C[3] = (E, L) => a("toggleItemDropdown", E, L)),
                "onUpdate:selectedItemDropdownOption": C[4] || (C[4] = (E) => a("update:selectedItemDropdownOption", E)),
                onCopyPath: C[5] || (C[5] = (E) => a("copyPath", E)),
                onOpenContainingFolder: C[6] || (C[6] = (E) => a("openContainingFolder", E)),
                onOpen: C[7] || (C[7] = (E) => a("open", E)),
                onPreview: C[8] || (C[8] = (E) => a("preview", E)),
                onActivate: C[9] || (C[9] = (E) => a("activate", E))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (c(), p("div", Jr, [
        o("span", null, y(i(l)("No results found")), 1)
      ]))
    ], 2));
  }
}), nd = { class: "vuefinder__search-modal" }, od = { class: "vuefinder__search-modal__content" }, sd = { class: "vuefinder__search-modal__search-bar" }, id = { class: "vuefinder__search-modal__search-location" }, ad = ["title"], ld = ["disabled"], rd = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, dd = { class: "vuefinder__search-modal__folder-selector-content" }, cd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ud = { class: "vuefinder__search-modal__instructions-text" }, dn = /* @__PURE__ */ le({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(s) {
    const e = ae(), t = Be(e), { t: n } = e.i18n, a = e.fs, d = I(null), l = I(null), r = I(null), u = to("", 300), v = I([]), b = I(!1), h = I(-1);
    let _ = null;
    const k = I(!1), w = I(!1), $ = I(null), m = I("all"), g = I(!1), f = I("name-asc"), x = {
      "name-asc": { column: "basename", direction: 1 },
      "name-desc": { column: "basename", direction: -1 },
      "size-asc": { column: "file_size", direction: 1 },
      "size-desc": { column: "file_size", direction: -1 },
      "date-asc": { column: "last_modified", direction: 1 },
      "date-desc": { column: "last_modified", direction: -1 }
    }, C = R(() => {
      const { column: D, direction: N } = x[f.value];
      return v.value.slice().sort((de, me) => Kn(de[D], me[D]) * N);
    }), F = I(`size-${m.value}`), E = I(null), L = I(/* @__PURE__ */ new Set()), q = I(null), Z = oe(a.path), ee = (D) => {
      L.value.has(D) ? L.value.delete(D) : L.value.add(D);
    }, Q = (D, N) => {
      N && typeof N.stopPropagation == "function" && N.stopPropagation(), q.value === D ? q.value = null : q.value = D;
    }, G = () => {
      q.value = null;
    }, T = (D) => {
      try {
        const N = D.dir || `${D.storage}://`;
        e.adapter.open(N), e.modal.close(), G();
      } catch {
        t.error(n("Failed to open containing folder"));
      }
    }, M = (D) => {
      e.modal.open(Ye, {
        storage: Z?.value?.storage ?? "local",
        item: D
      }), G();
    }, U = (D) => {
      e.adapter.open(D.path), e.modal.close(), G();
    }, Y = (D) => {
      D.type === "dir" ? U(D) : M(D);
    }, ce = (D) => {
      h.value = D, G();
    }, B = (D) => {
      h.value = D;
    }, S = async (D) => {
      await yt(D.path), G();
    };
    pe(u, async (D) => {
      D.trim() ? (await P(D.trim()), h.value = 0) : (_ && (_.abort(), _ = null), v.value = [], b.value = !1, h.value = -1);
    }), pe(m, async (D) => {
      F.value = `size-${D}`, u.value.trim() && !w.value && (await P(u.value.trim()), h.value = 0);
    }), pe(g, async () => {
      u.value.trim() && !w.value && (await P(u.value.trim()), h.value = 0);
    });
    const z = (D) => {
      if (!D || typeof D != "object") return !1;
      const N = D.name;
      return N === "AbortError" || N === "CanceledError";
    }, P = async (D) => {
      if (!D) return;
      _ && _.abort();
      const N = new AbortController();
      _ = N, b.value = !0;
      try {
        const de = $.value?.path || Z?.value?.path, me = await e.adapter.search({
          path: de,
          filter: D,
          deep: g.value,
          size: m.value,
          signal: N.signal
        });
        if (N.signal.aborted) return;
        v.value = me || [], b.value = !1;
      } catch (de) {
        if (z(de) || N.signal.aborted) return;
        t.error(Fe(de, n("Search failed"))), v.value = [], b.value = !1;
      }
    };
    we(() => {
      document.addEventListener("click", H), F.value = `size-${m.value}`;
    });
    const V = () => {
      w.value ? (w.value = !1, u.value.trim() && (P(u.value.trim()), h.value = 0)) : (k.value = !1, w.value = !0);
    }, A = (D) => {
      D && ($.value = D);
    }, O = (D) => {
      D && (A(D), w.value = !1, u.value.trim() && (P(u.value.trim()), h.value = 0));
    };
    Te(() => {
      document.removeEventListener("click", H), _ && (_.abort(), _ = null), l.value && l.value.cleanup();
    });
    const H = (D) => {
      const N = D.target;
      if (k.value && (N.closest(".vuefinder__search-modal__dropdown") || (k.value = !1, De(() => {
        d.value && d.value.focus();
      }))), q.value) {
        const de = N.closest(".vuefinder__search-modal__item-dropdown"), me = N.closest(".vuefinder__search-modal__result-item");
        !de && !me && G();
      }
    };
    return (D, N) => (c(), X(ze, { class: "vuefinder__search-modal-layout" }, {
      default: ue(() => [
        o("div", nd, [
          W(Ne, {
            icon: i(rn),
            title: i(n)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", od, [
            o("div", sd, [
              W(gr, {
                ref_key: "searchInputRef",
                ref: d,
                modelValue: i(u),
                "onUpdate:modelValue": N[0] || (N[0] = (de) => bo(u) ? u.value = de : null),
                "is-searching": b.value,
                disabled: w.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              W(Lr, {
                ref_key: "searchOptionsDropdownRef",
                ref: l,
                visible: k.value,
                "onUpdate:visible": N[1] || (N[1] = (de) => k.value = de),
                "size-filter": m.value,
                "onUpdate:sizeFilter": N[2] || (N[2] = (de) => m.value = de),
                "selected-option": F.value,
                "onUpdate:selectedOption": N[3] || (N[3] = (de) => F.value = de),
                "sort-by": f.value,
                "onUpdate:sortBy": N[4] || (N[4] = (de) => f.value = de),
                disabled: w.value
              }, null, 8, ["visible", "size-filter", "selected-option", "sort-by", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: N[8] || (N[8] = _e(() => {
              }, ["stop"]))
            }, [
              o("div", id, [
                o("button", {
                  class: te(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": w.value }]),
                  onClick: _e(V, ["stop"])
                }, [
                  W(i(Re), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: $.value?.path || i(Z).path
                  }, y(i(Lt)($.value?.path || i(Z).path)), 9, ad),
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
                  "onUpdate:modelValue": N[5] || (N[5] = (de) => g.value = de),
                  type: "checkbox",
                  disabled: w.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: N[6] || (N[6] = _e(() => {
                  }, ["stop"]))
                }, null, 8, ld), [
                  [lt, g.value]
                ]),
                o("span", null, y(i(n)("Include subfolders")), 1)
              ])
            ]),
            w.value ? (c(), p("div", rd, [
              o("div", dd, [
                W(kt, {
                  modelValue: $.value,
                  "onUpdate:modelValue": [
                    N[9] || (N[9] = (de) => $.value = de),
                    A
                  ],
                  "show-pinned-folders": !0,
                  "current-path": i(Z),
                  onSelectAndClose: O
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : j("", !0),
            !i(u).trim() && !w.value ? (c(), p("div", cd, [
              o("p", ud, y(i(n)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : j("", !0),
            i(u).trim() && !w.value ? (c(), X(td, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: r,
              "search-results": C.value,
              "is-searching": b.value,
              "selected-index": h.value,
              "expanded-paths": L.value,
              "active-dropdown": q.value,
              "selected-item-dropdown-option": E.value,
              "results-enter": !0,
              onSelectResultItem: ce,
              onSelectResultItemWithDropdown: B,
              onTogglePathExpansion: ee,
              onToggleItemDropdown: Q,
              "onUpdate:selectedItemDropdownOption": N[10] || (N[10] = (de) => E.value = de),
              onCopyPath: S,
              onOpenContainingFolder: T,
              onOpen: U,
              onPreview: M,
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
  setup(s, { emit: e, slots: t }) {
    const n = ae(), a = I(!1), { t: d } = n.i18n;
    let l = null;
    const r = () => {
      l && clearTimeout(l), a.value = !0, l = setTimeout(() => {
        a.value = !1;
      }, 2e3);
    };
    return we(() => {
      n.emitter.on(s.on, r);
    }), Te(() => {
      l && clearTimeout(l);
    }), {
      shown: a,
      t: d
    };
  }
}, fd = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [n, a] of e)
    t[n] = a;
  return t;
}, _d = { key: 1 };
function pd(s, e, t, n, a, d) {
  return c(), p("div", {
    class: te(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    s.$slots.default ? Me(s.$slots, "default", { key: 0 }) : (c(), p("span", _d, y(n.t("Saved.")), 1))
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
}, Fd = { class: "vuefinder__settings-modal__input-group" }, Ed = ["value"], Pd = { class: "vuefinder__settings-modal__reset-section" }, Td = { class: "vuefinder__settings-modal__reset-content" }, Dd = { class: "vuefinder__settings-modal__reset-title" }, Md = { class: "vuefinder__settings-modal__reset-description" }, io = /* @__PURE__ */ le({
  __name: "ModalSettings",
  setup(s) {
    const e = ae(), { enabled: t } = Ve(), n = e.config, { clearStore: a } = e.storage, { t: d, localeAtom: l } = e.i18n, r = oe(l), u = R({
      get: () => String(r.value || "en"),
      set: (m) => l.set(m || "en")
    }), v = oe(n.state), b = R(() => v.value.theme || "silver"), h = async () => {
      n.reset(), a(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, _ = (m) => {
      n.set("theme", m), e.emitter.emit("vf-theme-saved");
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
      }).filter(([m]) => Object.keys(k).includes(m))
    );
    return (m, g) => (c(), X(ze, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[2] || (g[2] = (f) => i(e).modal.close())
        }, y(i(d)("Close")), 1)
      ]),
      default: ue(() => [
        o("div", hd, [
          W(Ne, {
            icon: i(no),
            title: i(d)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", gd, [
            o("div", yd, [
              i(t)("theme") ? (c(), p("div", wd, [
                o("label", bd, [
                  ye(y(i(d)("Theme")) + " ", 1),
                  W(Pn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: ue(() => [
                      ye(y(i(d)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", kd, [
                  o("select", {
                    id: "theme",
                    value: b.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: g[0] || (g[0] = (f) => _(f.target?.value))
                  }, [
                    (c(!0), p(fe, null, ge(i(md), (f) => (c(), p("option", {
                      key: f.name,
                      value: f.name
                    }, y(f.displayName), 9, xd))), 128))
                  ], 40, $d)
                ])
              ])) : j("", !0),
              Object.keys(i($)).length > 1 ? (c(), p("div", Sd, [
                o("label", Cd, [
                  ye(y(i(d)("Language")) + " ", 1),
                  W(Pn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: ue(() => [
                      ye(y(i(d)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", Fd, [
                  he(o("select", {
                    id: "language",
                    "onUpdate:modelValue": g[1] || (g[1] = (f) => u.value = f),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (c(!0), p(fe, null, ge(i($), (f, x) => (c(), p("option", {
                      key: x,
                      value: x
                    }, y(f), 9, Ed))), 128))
                  ], 512), [
                    [Kt, u.value]
                  ])
                ])
              ])) : j("", !0)
            ]),
            o("div", Pd, [
              o("div", Td, [
                o("div", Dd, y(i(d)("Reset")), 1),
                o("div", Md, y(i(d)("Reset all settings to default")), 1)
              ]),
              o("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: h
              }, y(i(d)("Reset Settings")), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Oe = {
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
  const s = ae(), e = Be(s), t = s.fs, n = s.config, { enabled: a } = Ve(), d = oe(t.path), l = oe(t.selectedItems), r = (u) => {
    if (u.code === Oe.ESCAPE && (s.modal.close(), s.root.focus()), !s.modal.visible) {
      if (u.metaKey && u.code === Oe.KEY_R && !u.shiftKey && (s.adapter.invalidateListQuery(d.value.path), s.adapter.open(d.value.path), u.preventDefault()), u.metaKey && u.shiftKey && u.code === Oe.KEY_R && a("rename") && l.value.length === 1 && (s.modal.open(Dt, { items: l.value }), u.preventDefault()), u.code === Oe.DELETE && l.value.length !== 0 && s.modal.open(Tt, { items: l.value }), u.metaKey && u.code === Oe.BACKSLASH && s.modal.open(Wn), u.metaKey && u.code === Oe.KEY_F && a("search") && (s.modal.open(dn), u.preventDefault()), u.metaKey && u.code === Oe.KEY_E && (n.toggle("showTreeView"), u.preventDefault()), u.metaKey && u.code === Oe.KEY_S && (s.modal.open(io), u.preventDefault()), u.metaKey && u.code === Oe.ENTER && (n.toggle("fullScreen"), s.root.focus()), u.metaKey && u.code === Oe.KEY_A && (t.selectAll(s.selectionMode || "multiple", s), u.preventDefault()), u.code === Oe.SPACE && l.value.length === 1 && l.value[0]?.type !== "dir" && s.modal.open(Ye, {
        storage: t.path.get().storage,
        item: l.value[0]
      }), u.metaKey && u.code === Oe.KEY_C && a("copy")) {
        if (l.value.length === 0) {
          e.error(s.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(l.value.map((v) => ke(v)))), e.success(
          l.value.length === 1 ? s.i18n.t("Item copied to clipboard") : s.i18n.t("%s items copied to clipboard", l.value.length)
        ), u.preventDefault();
      }
      if (u.metaKey && u.code === Oe.KEY_X && a("copy")) {
        if (l.value.length === 0) {
          e.error(s.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(l.value.map((v) => ke(v)))), e.success(
          l.value.length === 1 ? s.i18n.t("Item cut to clipboard") : s.i18n.t("%s items cut to clipboard", l.value.length)
        ), u.preventDefault();
      }
      if (u.metaKey && u.code === Oe.KEY_V && a("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(s.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(s.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          s.modal.open(at, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          }), t.clearClipboard();
          return;
        }
        if (t.getClipboard().type === "copy") {
          s.modal.open(ln, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        u.preventDefault();
      }
    }
  };
  we(async () => {
    if (await De(), !s.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    s.root.addEventListener("keydown", r);
  }), wt(() => {
    s.root && s.root.removeEventListener("keydown", r);
  });
}
function Ad() {
  const s = I(!1), e = I([]);
  return {
    isDraggingExternal: s,
    externalFiles: e,
    handleDragEnter: (r) => {
      r.preventDefault(), r.stopPropagation();
      const u = r.dataTransfer?.items;
      u && Array.from(u).some((b) => b.kind === "file") && (s.value = !0, r.isExternalDrag = !0);
    },
    handleDragOver: (r) => {
      s.value && r.dataTransfer && (r.dataTransfer.dropEffect = "copy", r.preventDefault(), r.stopPropagation());
    },
    handleDragLeave: (r) => {
      r.preventDefault();
      const u = r.currentTarget.getBoundingClientRect(), v = r.clientX, b = r.clientY;
      (v < u.left || v > u.right || b < u.top || b > u.bottom) && (s.value = !1);
    },
    handleDrop: async (r) => {
      r.preventDefault(), r.stopPropagation(), s.value = !1;
      const u = r.dataTransfer?.items;
      if (u) {
        const v = Array.from(u).filter((b) => b.kind === "file");
        if (v.length > 0) {
          e.value = [];
          const b = v.map((h) => ({
            entry: h.webkitGetAsEntry?.(),
            file: h.getAsFile()
          }));
          for (const { entry: h, file: _ } of b)
            h ? await nn((k, w) => {
              const $ = k?.fullPath || w.name, m = $.startsWith("/") ? $.slice(1) : $;
              e.value.push({
                name: w.name,
                relativePath: m,
                size: w.size,
                type: w.type,
                lastModified: new Date(w.lastModified),
                file: w
              });
            }, h) : _ && e.value.push({
              name: _.name,
              relativePath: _.name,
              size: _.size,
              type: _.type,
              lastModified: new Date(_.lastModified),
              file: _
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
function Ld(s, e) {
  return c(), p("svg", Od, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ao = { render: Ld }, Rd = { class: "vuefinder__new-folder-modal__content" }, Bd = { class: "vuefinder__new-folder-modal__form" }, zd = { class: "vuefinder__new-folder-modal__description" }, Vd = ["placeholder"], cn = /* @__PURE__ */ le({
  __name: "ModalNewFolder",
  setup(s) {
    const e = ae(), t = Be(e), { t: n } = e.i18n, a = e.fs, d = oe(a.path), l = I(""), r = () => {
      l.value !== "" && e.adapter.createFolder({
        path: d.value.path,
        name: l.value
      }).then((u) => {
        t.success(n("%s is created.", l.value)), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        t.error(Fe(u, n("Failed to create folder")));
      });
    };
    return (u, v) => (c(), X(ze, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(i(n)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (b) => i(e).modal.close())
        }, y(i(n)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          W(Ne, {
            icon: i(ao),
            title: i(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Rd, [
            o("div", Bd, [
              o("p", zd, y(i(n)("Create a new folder")), 1),
              he(o("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (b) => l.value = b),
                class: "vuefinder__new-folder-modal__input",
                placeholder: i(n)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: He(r, ["enter"])
              }, null, 40, Vd), [
                [Ke, l.value]
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
function Nd(s, e) {
  return c(), p("svg", Ud, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const lo = { render: Nd }, Hd = { class: "vuefinder__new-file-modal__content" }, jd = { class: "vuefinder__new-file-modal__form" }, Kd = { class: "vuefinder__new-file-modal__description" }, qd = ["placeholder"], ro = /* @__PURE__ */ le({
  __name: "ModalNewFile",
  setup(s) {
    const e = ae(), t = Be(e), { t: n } = e.i18n, a = e.fs, d = oe(a.path), l = I(""), r = () => {
      l.value !== "" && e.adapter.createFile({
        path: d.value.path,
        name: l.value
      }).then((u) => {
        t.success(n("%s is created.", l.value)), e.fs.setFiles(u.files), e.modal.close();
      }).catch((u) => {
        t.error(Fe(u, n("Failed to create file")));
      });
    };
    return (u, v) => (c(), X(ze, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: r
        }, y(i(n)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: v[1] || (v[1] = (b) => i(e).modal.close())
        }, y(i(n)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          W(Ne, {
            icon: i(lo),
            title: i(n)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", Hd, [
            o("div", jd, [
              o("p", Kd, y(i(n)("Create a new file")), 1),
              he(o("input", {
                "onUpdate:modelValue": v[0] || (v[0] = (b) => l.value = b),
                class: "vuefinder__new-file-modal__input",
                placeholder: i(n)("File Name"),
                type: "text",
                onKeyup: He(r, ["enter"])
              }, null, 40, qd), [
                [Ke, l.value]
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
function Gd(s, e) {
  return c(), p("svg", Wd, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const co = { render: Gd };
function Yt(s, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return s.replace(new RegExp(t), "$2..$4");
}
const Yd = { class: "vuefinder__upload-modal__content relative" }, Xd = { class: "vuefinder__upload-modal__target-section" }, Qd = { class: "vuefinder__upload-modal__target-label" }, Jd = { class: "vuefinder__upload-modal__target-container" }, Zd = { class: "vuefinder__upload-modal__target-path" }, ec = { class: "vuefinder__upload-modal__target-storage" }, tc = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, nc = { class: "vuefinder__upload-modal__target-badge" }, oc = { class: "vuefinder__upload-modal__drag-hint" }, sc = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, ic = ["textContent"], ac = { class: "vuefinder__upload-modal__file-info" }, lc = {
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
}, un = /* @__PURE__ */ le({
  __name: "ModalUpload",
  setup(s) {
    const e = ae(), { t } = e.i18n, n = e.fs, a = oe(n.path), d = I(a.value), l = I(!1), r = () => {
      const H = d.value.path;
      if (!H) return { storage: "local", path: "" };
      if (H.endsWith("://"))
        return { storage: H.replace("://", ""), path: "" };
      const D = H.split("://");
      return {
        storage: D[0] || "local",
        path: D[1] || ""
      };
    }, u = (H) => {
      H && (d.value = H);
    }, v = (H) => {
      H && (d.value = H, l.value = !1);
    }, {
      container: b,
      internalFileInput: h,
      internalFolderInput: _,
      pickFiles: k,
      queue: w,
      message: $,
      uploading: m,
      hasFilesInDropArea: g,
      definitions: f,
      openFileSelector: x,
      upload: C,
      cancel: F,
      remove: E,
      clear: L,
      close: q,
      getClassNameForEntry: Z,
      getIconForEntry: ee,
      addExternalFiles: Q,
      renameEntry: G
    } = Qn(e.customUploader), T = I(null), M = I(""), U = I(null), Y = (H) => {
      const D = H.lastIndexOf("/");
      return D === -1 ? H : H.slice(D + 1);
    }, ce = (H) => {
      m.value || H.status !== f.value.QUEUE_ENTRY_STATUS.UPLOADING && (T.value = H.id, M.value = Y(H.name), De(() => {
        const D = U.value;
        if (D) {
          D.focus();
          const N = M.value.lastIndexOf(".");
          N > 0 ? D.setSelectionRange(0, N) : D.select();
        }
      }));
    }, B = () => {
      T.value = null, M.value = "";
    }, S = async (H) => {
      const D = M.value.trim();
      if (!D || D === Y(H.name)) {
        B();
        return;
      }
      await G(H, D), B();
    }, z = () => {
      C(d.value), e.config.get("closeUploadModalOnSubmit") && q();
    };
    we(() => {
      e.emitter.on("vf-external-files-dropped", (H) => {
        Q(H);
      });
    }), Te(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const P = I(!1), V = I(null), A = I(null), O = (H) => {
      if (!P.value) return;
      const D = H.target, N = V.value?.contains(D) ?? !1, de = A.value?.contains(D) ?? !1;
      !N && !de && (P.value = !1);
    };
    return we(() => document.addEventListener("click", O)), Te(() => document.removeEventListener("click", O)), (H, D) => (c(), X(ze, {
      "show-drag-overlay": i(g),
      "drag-overlay-text": i(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: ue(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: V,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: te([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              P.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: D[4] || (D[4] = (N) => i(x)())
            }, y(i(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": P.value ? "true" : "false",
              onClick: D[5] || (D[5] = _e((N) => P.value = !P.value, ["stop"]))
            }, [...D[21] || (D[21] = [
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
          P.value ? (c(), p("div", gc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[6] || (D[6] = (N) => {
                i(x)(), P.value = !1;
              })
            }, y(i(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[7] || (D[7] = (N) => {
                i(_)?.click(), P.value = !1;
              })
            }, y(i(t)("Select Folders")), 1),
            D[22] || (D[22] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: te(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[8] || (D[8] = (N) => i(m) ? null : (i(L)(!1), P.value = !1))
            }, y(i(t)("Clear all")), 3),
            o("div", {
              class: te(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[9] || (D[9] = (N) => i(m) ? null : (i(L)(!0), P.value = !1))
            }, y(i(t)("Clear only successful")), 3)
          ])) : j("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: i(m) || !i(w).length,
          onClick: _e(z, ["prevent"])
        }, y(i(t)("Upload")), 9, yc),
        i(m) ? (c(), p("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[10] || (D[10] = _e(
            //@ts-ignore
            (...N) => i(F) && i(F)(...N),
            ["prevent"]
          ))
        }, y(i(t)("Cancel")), 1)) : (c(), p("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[11] || (D[11] = _e(
            //@ts-ignore
            (...N) => i(q) && i(q)(...N),
            ["prevent"]
          ))
        }, y(i(t)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: A,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: te(["vuefinder__upload-actions", P.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              ref_key: "pickFiles",
              ref: k,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, y(i(t)("Select Files")), 513),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": P.value ? "true" : "false",
              onClick: D[12] || (D[12] = _e((N) => P.value = !P.value, ["stop"]))
            }, [...D[23] || (D[23] = [
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
          P.value ? (c(), p("div", bc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[13] || (D[13] = (N) => {
                i(x)(), P.value = !1;
              })
            }, y(i(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[14] || (D[14] = (N) => {
                i(_)?.click(), P.value = !1;
              })
            }, y(i(t)("Select Folders")), 1),
            D[24] || (D[24] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: te(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[15] || (D[15] = (N) => i(m) ? null : (i(L)(!1), P.value = !1))
            }, y(i(t)("Clear all")), 3),
            o("div", {
              class: te(["vuefinder__upload-actions__item", i(m) ? "disabled" : ""]),
              onClick: D[16] || (D[16] = (N) => i(m) ? null : (i(L)(!0), P.value = !1))
            }, y(i(t)("Clear only successful")), 3)
          ])) : j("", !0)
        ], 512)
      ]),
      default: ue(() => [
        o("div", null, [
          W(Ne, {
            icon: i(co),
            title: i(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", Yd, [
            o("div", Xd, [
              o("div", Qd, y(i(t)("Target Directory")), 1),
              o("div", Jd, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: D[0] || (D[0] = (N) => l.value = !l.value)
                }, [
                  o("div", Zd, [
                    o("span", ec, y(r().storage) + "://", 1),
                    r().path ? (c(), p("span", tc, y(r().path), 1)) : j("", !0)
                  ]),
                  o("span", nc, y(i(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: te([
                  "vuefinder__upload-modal__tree-selector",
                  l.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                W(kt, {
                  modelValue: d.value,
                  "onUpdate:modelValue": [
                    D[1] || (D[1] = (N) => d.value = N),
                    u
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: v
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", oc, y(i(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: b,
              class: "hidden"
            }, null, 512),
            o("div", sc, [
              (c(!0), p(fe, null, ge(i(w), (N) => (c(), p("div", {
                key: N.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: te(["vuefinder__upload-modal__file-icon", i(Z)(N)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(i(ee)(N))
                  }, null, 8, ic)
                ], 2),
                o("div", ac, [
                  T.value === N.id ? (c(), p("div", lc, [
                    he(o("input", {
                      ref_for: !0,
                      ref_key: "renameInputRef",
                      ref: U,
                      "onUpdate:modelValue": D[2] || (D[2] = (de) => M.value = de),
                      type: "text",
                      class: "vuefinder__upload-modal__file-rename-input",
                      placeholder: i(t)("Rename"),
                      onKeyup: [
                        He((de) => S(N), ["enter"]),
                        He(B, ["esc"])
                      ]
                    }, null, 40, rc), [
                      [Ke, M.value]
                    ]),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn vuefinder__upload-modal__file-rename-btn--save",
                      title: i(t)("Save"),
                      onClick: (de) => S(N)
                    }, [...D[17] || (D[17] = [
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
                      title: i(t)("Cancel"),
                      onClick: B
                    }, [...D[18] || (D[18] = [
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
                  ])) : (c(), p(fe, { key: 1 }, [
                    o("div", uc, y(i(Yt)(N.name, 40)) + " (" + y(N.size) + ") ", 1),
                    o("div", vc, y(i(Yt)(N.name, 16)) + " (" + y(N.size) + ") ", 1),
                    o("div", {
                      class: te(["vuefinder__upload-modal__file-status", i(Z)(N)])
                    }, [
                      ye(y(N.statusName) + " ", 1),
                      N.status === i(f).QUEUE_ENTRY_STATUS.UPLOADING ? (c(), p("b", fc, y(N.percent), 1)) : j("", !0)
                    ], 2)
                  ], 64))
                ]),
                T.value !== N.id ? (c(), p("button", {
                  key: 0,
                  type: "button",
                  class: te([
                    "vuefinder__upload-modal__file-rename-action",
                    i(m) || N.status === i(f).QUEUE_ENTRY_STATUS.UPLOADING ? "disabled" : ""
                  ]),
                  title: i(t)("Rename"),
                  disabled: i(m) || N.status === i(f).QUEUE_ENTRY_STATUS.UPLOADING,
                  onClick: (de) => ce(N)
                }, [...D[19] || (D[19] = [
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
                T.value !== N.id ? (c(), p("button", {
                  key: 1,
                  type: "button",
                  class: te(["vuefinder__upload-modal__file-remove", i(m) ? "disabled" : ""]),
                  title: i(t)("Delete"),
                  disabled: i(m),
                  onClick: (de) => i(E)(N)
                }, [...D[20] || (D[20] = [
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
              i(w).length ? j("", !0) : (c(), p("div", mc, y(i(t)("No files selected!")), 1))
            ]),
            i($).length ? (c(), X(Gt, {
              key: 0,
              error: "",
              onHidden: D[3] || (D[3] = (N) => $.value = "")
            }, {
              default: ue(() => [
                ye(y(i($)), 1)
              ]),
              _: 1
            })) : j("", !0)
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: h,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        o("input", {
          ref_key: "internalFolderInput",
          ref: _,
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
function $c(s, e) {
  return c(), p("svg", kc, [...e[0] || (e[0] = [
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
}, Ec = { class: "vuefinder__unarchive-modal__item-name" }, Pc = { class: "vuefinder__unarchive-modal__info" }, Tc = { class: "vuefinder__unarchive-modal__target" }, Dc = { class: "vuefinder__unarchive-modal__target-label" }, Mc = ["title"], Ic = {
  key: 0,
  class: "vuefinder__unarchive-modal__target-selector"
}, vn = /* @__PURE__ */ le({
  __name: "ModalUnarchive",
  setup(s) {
    const e = ae(), t = Be(e), n = e.fs, a = oe(n.path), { t: d } = e.i18n, l = I(e.modal.data.items[0]), r = I([]), u = I(null), v = I(!1), b = R(() => u.value?.path || a.value.path), h = () => {
      v.value = !v.value;
    }, _ = ($) => {
      $ && (u.value = $);
    }, k = ($) => {
      $ && (u.value = $, v.value = !1);
    }, w = () => {
      const $ = u.value?.path;
      e.adapter.unarchive({
        item: l.value.path,
        path: a.value.path,
        // Optional. Sent when the user explicitly picks a different folder.
        ...$ && $ !== a.value.path ? { destination: $ } : {}
      }).then((m) => {
        t.success(d("The file unarchived.")), e.fs.setFiles(m.files), e.modal.close();
      }).catch((m) => {
        t.error(Fe(m, d("Failed to unarchive")));
      });
    };
    return ($, m) => (c(), X(ze, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: w
        }, y(i(d)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[1] || (m[1] = (g) => i(e).modal.close())
        }, y(i(d)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          W(Ne, {
            icon: i(uo),
            title: i(d)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", xc, [
            o("div", Sc, [
              (c(!0), p(fe, null, ge(r.value, (g) => (c(), p("p", {
                key: g.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                g.type === "dir" ? (c(), p("svg", Cc, [...m[2] || (m[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (c(), p("svg", Fc, [...m[3] || (m[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Ec, y(g.basename), 1)
              ]))), 128)),
              o("p", Pc, y(i(d)("The archive will be unarchived at")) + " (" + y(b.value) + ") ", 1),
              o("div", Tc, [
                o("div", Dc, y(i(d)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: te(["vuefinder__unarchive-modal__target-btn", { "vuefinder__unarchive-modal__target-btn--open": v.value }]),
                  onClick: h
                }, [
                  W(i(Re), { class: "vuefinder__unarchive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__unarchive-modal__target-text",
                    title: b.value
                  }, y(i(Lt)(b.value)), 9, Mc),
                  m[4] || (m[4] = o("svg", {
                    class: "vuefinder__unarchive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                v.value ? (c(), p("div", Ic, [
                  W(kt, {
                    modelValue: u.value,
                    "onUpdate:modelValue": [
                      m[0] || (m[0] = (g) => u.value = g),
                      _
                    ],
                    "show-pinned-folders": !0,
                    "current-path": i(a),
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
function Oc(s, e) {
  return c(), p("svg", Ac, [...e[0] || (e[0] = [
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
}, fn = /* @__PURE__ */ le({
  __name: "ModalArchive",
  setup(s) {
    const e = ae(), t = Be(e), { t: n } = e.i18n, a = e.fs, d = oe(a.path), l = I(""), r = I(e.modal.data.items), u = I(null), v = I(!1), b = R(() => u.value?.path || d.value.path), h = () => {
      v.value = !v.value;
    }, _ = ($) => {
      $ && (u.value = $);
    }, k = ($) => {
      $ && (u.value = $, v.value = !1);
    }, w = () => {
      if (r.value.length) {
        const $ = u.value?.path;
        e.adapter.archive({
          path: d.value.path,
          items: r.value.map(({ path: m, type: g }) => ({
            path: m,
            type: g
          })),
          name: l.value,
          // Optional. Sent when the user explicitly picks a different folder.
          ...$ && $ !== d.value.path ? { destination: $ } : {}
        }).then((m) => {
          t.success(n("The file(s) archived.")), e.fs.setFiles(m.files), e.modal.close();
        }).catch((m) => {
          t.error(Fe(m, n("Failed to archive files")));
        });
      }
    };
    return ($, m) => (c(), X(ze, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: w
        }, y(i(n)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[2] || (m[2] = (g) => i(e).modal.close())
        }, y(i(n)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", null, [
          W(Ne, {
            icon: i(vo),
            title: i(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Lc, [
            o("div", Rc, [
              o("div", Bc, [
                (c(!0), p(fe, null, ge(r.value, (g) => (c(), p("p", {
                  key: g.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  g.type === "dir" ? (c(), p("svg", zc, [...m[3] || (m[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (c(), p("svg", Vc, [...m[4] || (m[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Uc, y(g.basename), 1)
                ]))), 128))
              ]),
              he(o("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (g) => l.value = g),
                class: "vuefinder__archive-modal__input",
                placeholder: i(n)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: He(w, ["enter"])
              }, null, 40, Nc), [
                [Ke, l.value]
              ]),
              o("div", Hc, [
                o("div", jc, y(i(n)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: te(["vuefinder__archive-modal__target-btn", { "vuefinder__archive-modal__target-btn--open": v.value }]),
                  onClick: h
                }, [
                  W(i(Re), { class: "vuefinder__archive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__archive-modal__target-text",
                    title: b.value
                  }, y(i(Lt)(b.value)), 9, Kc),
                  m[5] || (m[5] = o("svg", {
                    class: "vuefinder__archive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                v.value ? (c(), p("div", qc, [
                  W(kt, {
                    modelValue: u.value,
                    "onUpdate:modelValue": [
                      m[1] || (m[1] = (g) => u.value = g),
                      _
                    ],
                    "show-pinned-folders": !0,
                    "current-path": i(d),
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
}, iu = { class: "vuefinder__about-modal__shortcut" }, au = { class: "vuefinder__about-modal__shortcut" }, lu = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, ru = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, du = /* @__PURE__ */ le({
  __name: "ModalShortcuts",
  setup(s) {
    const e = ae(), { enabled: t } = Ve(), { t: n } = e.i18n;
    return (a, d) => (c(), X(ze, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[0] || (d[0] = (l) => i(e).modal.close())
        }, y(i(n)("Close")), 1)
      ]),
      default: ue(() => [
        o("div", Wc, [
          W(Ne, {
            icon: i(en),
            title: i(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", Gc, [
            o("div", Yc, [
              o("div", Xc, [
                o("div", null, y(i(n)("Refresh")), 1),
                d[1] || (d[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              i(t)("rename") ? (c(), p("div", Qc, [
                o("div", null, y(i(n)("Rename")), 1),
                d[2] || (d[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Shift"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : j("", !0),
              i(t)("delete") ? (c(), p("div", Jc, [
                o("div", null, y(i(n)("Delete")), 1),
                d[3] || (d[3] = o("kbd", null, "Del", -1))
              ])) : j("", !0),
              o("div", Zc, [
                o("div", null, y(i(n)("Escape")), 1),
                d[4] || (d[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", eu, [
                o("div", null, y(i(n)("Select All")), 1),
                d[5] || (d[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              i(t)("copy") ? (c(), p("div", tu, [
                o("div", null, y(i(n)("Cut")), 1),
                d[6] || (d[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : j("", !0),
              i(t)("copy") ? (c(), p("div", nu, [
                o("div", null, y(i(n)("Copy")), 1),
                d[7] || (d[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : j("", !0),
              i(t)("copy") ? (c(), p("div", ou, [
                o("div", null, y(i(n)("Paste")), 1),
                d[8] || (d[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : j("", !0),
              i(t)("search") ? (c(), p("div", su, [
                o("div", null, y(i(n)("Search")), 1),
                d[9] || (d[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : j("", !0),
              o("div", iu, [
                o("div", null, y(i(n)("Toggle Sidebar")), 1),
                d[10] || (d[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", au, [
                o("div", null, y(i(n)("Open Settings")), 1),
                d[11] || (d[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              i(t)("fullscreen") ? (c(), p("div", lu, [
                o("div", null, y(i(n)("Toggle Full Screen")), 1),
                d[12] || (d[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : j("", !0),
              i(t)("preview") ? (c(), p("div", ru, [
                o("div", null, y(i(n)("Preview")), 1),
                d[13] || (d[13] = o("kbd", null, "Space", -1))
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
function uu(s, e) {
  return c(), p("svg", cu, [...e[0] || (e[0] = [
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
    const s = window.localStorage.getItem(_n);
    if (!s) return [];
    const e = JSON.parse(s);
    return Array.isArray(e) ? e.filter((t) => typeof t == "string").slice(0, _o) : [];
  } catch {
    return [];
  }
}
function vu(s) {
  if (!(!pn || !s))
    try {
      const e = mn().filter((t) => t !== s);
      e.unshift(s), window.localStorage.setItem(_n, JSON.stringify(e.slice(0, _o)));
    } catch {
    }
}
function fu(s) {
  if (!(!pn || !s))
    try {
      const e = mn().filter((t) => t !== s);
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
}, Su = ["disabled"], Cu = /* @__PURE__ */ le({
  name: "ModalGoToFolder",
  __name: "ModalGoToFolder",
  setup(s) {
    const e = ae(), { t } = e.i18n, n = e.fs, a = oe(n.storages), d = I(""), l = I([]), r = I(0), u = I(!1), v = I(!1), b = I(""), h = I(null), _ = I(null);
    let k = 0;
    const w = R(() => a.value ?? []), $ = (B) => {
      const S = B ?? "", z = S.indexOf("://");
      if (z === -1)
        return { storage: null, parent: "", filter: S.trim(), hasProtocol: !1 };
      const P = S.slice(0, z), V = S.slice(z + 3), A = V.lastIndexOf("/"), O = A === -1 ? `${P}://` : `${P}://${V.slice(0, A).replace(/^\/+/, "")}`, H = A === -1 ? V : V.slice(A + 1);
      return { storage: P, parent: O, filter: H, hasProtocol: !0 };
    }, m = (B) => {
      const S = B.toLowerCase();
      l.value = w.value.filter((z) => !S || z.toLowerCase().includes(S)).map((z) => ({
        path: `${z}://`,
        label: `${z}://`,
        kind: "storage"
      })), r.value = l.value.length ? 0 : -1, b.value = "";
    }, g = () => {
      const B = mn();
      l.value = B.map((S) => ({
        path: S,
        label: S,
        kind: "recent"
      })), r.value = l.value.length ? 0 : -1, b.value = "";
    }, f = async (B, S) => {
      const z = ++k;
      u.value = !0, b.value = "";
      try {
        const P = await e.adapter.list(B);
        if (z !== k) return;
        const V = S.toLowerCase(), A = (P?.files ?? []).filter(
          (O) => O.type === "dir" && (!V || O.basename.toLowerCase().startsWith(V))
        );
        l.value = A.map(
          (O) => ({
            path: O.path,
            label: O.basename,
            kind: "dir"
          })
        ), r.value = l.value.length ? 0 : -1;
      } catch (P) {
        if (z !== k) return;
        l.value = [], r.value = -1, b.value = Fe(P, t("Folder not found"));
      } finally {
        z === k && (u.value = !1);
      }
    };
    let x = null;
    const C = (B) => {
      x && clearTimeout(x), x = setTimeout(() => F(B), 150);
    }, F = (B) => {
      const S = B.trim();
      if (!S) {
        k++, u.value = !1, g();
        return;
      }
      const { hasProtocol: z, parent: P, filter: V } = $(S);
      if (!z) {
        k++, u.value = !1, m(S);
        return;
      }
      f(P, V);
    };
    pe(d, (B) => C(B)), we(() => {
      g(), De(() => h.value?.focus());
    });
    const E = () => {
      De(() => {
        const B = _.value;
        if (!B) return;
        const S = B.children[r.value];
        if (!S) return;
        const z = B.scrollTop, P = z + B.clientHeight, V = S.offsetTop, A = V + S.offsetHeight;
        V < z ? B.scrollTop = V : A > P && (B.scrollTop = A - B.clientHeight);
      });
    }, L = (B) => {
      if (!l.value.length) return;
      const S = l.value.length;
      r.value = ((r.value + B) % S + S) % S, E();
    }, q = (B) => {
      d.value = B.kind === "dir" ? `${B.path}/` : B.path, De(() => {
        h.value?.setSelectionRange(d.value.length, d.value.length);
      });
    }, Z = (B) => {
      if (!B.includes("://"))
        return {
          ok: !1,
          reason: t("Invalid path format. Path must be in format: storage://path/to/folder")
        };
      const S = B.slice(0, B.indexOf("://"));
      return w.value.includes(S) ? { ok: !0 } : { ok: !1, reason: t('Invalid storage. Storage "%s" is not available.', S) };
    }, ee = async (B) => {
      if (v.value) return;
      const S = B.trim();
      if (!S) return;
      const z = Z(S);
      if (!z.ok) {
        b.value = z.reason ?? "";
        return;
      }
      v.value = !0;
      try {
        if (await e.adapter.open(S) === void 0)
          return;
        vu(S), e.modal.close();
      } catch (P) {
        b.value = Fe(P, t("Failed to navigate to folder")), n.setLoading(!1);
      } finally {
        v.value = !1;
      }
    }, Q = () => {
      const B = l.value[r.value];
      ee(B ? B.path : d.value);
    }, G = (B) => {
      if (!l.value.length) return;
      B.preventDefault();
      const S = l.value[r.value];
      S && q(S);
    }, T = (B) => {
      if (B.kind === "dir") {
        q(B);
        return;
      }
      ee(B.path);
    }, M = (B) => {
      ee(B.path);
    }, U = (B, S) => {
      B.stopPropagation(), B.preventDefault(), fu(S), g();
    }, Y = (B, S) => {
      B.stopPropagation(), B.preventDefault(), d.value = S, De(() => {
        h.value?.focus(), h.value?.setSelectionRange(d.value.length, d.value.length);
      });
    }, ce = R(() => {
      const B = w.value[0];
      return B ? `${B}://path/to/folder` : "storage://path/to/folder";
    });
    return (B, S) => (c(), X(ze, null, {
      buttons: ue(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: v.value,
          onClick: Q
        }, y(i(t)("Go")), 9, Su),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: S[3] || (S[3] = (z) => i(e).modal.close())
        }, y(i(t)("Cancel")), 1)
      ]),
      default: ue(() => [
        o("div", _u, [
          W(Ne, {
            icon: i(At),
            title: i(t)("Go to Folder")
          }, null, 8, ["icon", "title"]),
          o("div", pu, [
            he(o("input", {
              ref_key: "inputRef",
              ref: h,
              "onUpdate:modelValue": S[0] || (S[0] = (z) => d.value = z),
              class: "vuefinder__go-to-folder-modal__input",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: ce.value,
              onKeydown: [
                S[1] || (S[1] = He(_e((z) => L(1), ["prevent"]), ["down"])),
                S[2] || (S[2] = He(_e((z) => L(-1), ["prevent"]), ["up"])),
                He(_e(Q, ["prevent"]), ["enter"]),
                He(G, ["tab"])
              ]
            }, null, 40, mu), [
              [Ke, d.value]
            ]),
            b.value ? (c(), p("div", hu, y(b.value), 1)) : j("", !0),
            l.value.length ? (c(), p("div", {
              key: 1,
              ref_key: "suggestionListRef",
              ref: _,
              class: "vuefinder__go-to-folder-modal__suggestions"
            }, [
              (c(!0), p(fe, null, ge(l.value, (z, P) => (c(), p("div", {
                key: `${z.kind}:${z.path}`,
                class: te(["vuefinder__go-to-folder-modal__suggestion", {
                  "vuefinder__go-to-folder-modal__suggestion--active": P === r.value
                }]),
                onMouseenter: (V) => r.value = P,
                onClick: (V) => T(z),
                onDblclick: (V) => M(z)
              }, [
                W(i(Re), { class: "vuefinder__go-to-folder-modal__suggestion-icon" }),
                o("span", yu, y(z.label), 1),
                z.kind === "recent" ? (c(), p("span", wu, y(i(t)("Recent")), 1)) : j("", !0),
                z.kind === "recent" ? (c(), p("button", {
                  key: 1,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-fill",
                  title: i(t)("Edit this path"),
                  onClick: (V) => Y(V, z.path)
                }, [
                  W(i(fo), { class: "vuefinder__go-to-folder-modal__suggestion-fill-icon" })
                ], 8, bu)) : j("", !0),
                z.kind === "recent" ? (c(), p("button", {
                  key: 2,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-remove",
                  title: i(t)("Remove from recent"),
                  onClick: (V) => U(V, z.path)
                }, " × ", 8, ku)) : j("", !0)
              ], 42, gu))), 128))
            ], 512)) : u.value ? j("", !0) : (c(), p("div", $u, [
              d.value.trim() ? (c(), p(fe, { key: 1 }, [
                ye(y(i(t)("No matching folders.")), 1)
              ], 64)) : (c(), p(fe, { key: 0 }, [
                ye(y(i(t)("No recent folders yet.")), 1)
              ], 64))
            ])),
            u.value ? (c(), p("div", xu, y(i(t)("Loading…")), 1)) : j("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Fu = { class: "vuefinder__menubar__container" }, Eu = ["onClick", "onMouseenter"], Pu = { class: "vuefinder__menubar__label" }, Tu = ["onMouseenter"], Du = ["onClick"], Mu = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Iu = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Au = {
  key: 2,
  class: "vuefinder__menubar__dropdown__chevron",
  viewBox: "0 0 16 16",
  fill: "currentColor",
  "aria-hidden": "true"
}, Ou = {
  key: 3,
  class: "vuefinder__menubar__dropdown__submenu"
}, Lu = ["onClick"], Ru = { class: "vuefinder__menubar__dropdown__label" }, Bu = /* @__PURE__ */ le({
  __name: "MenuBar",
  setup(s) {
    const e = ae(), { enabled: t } = Ve(), { t: n } = e?.i18n || { t: (f) => f }, a = e?.fs, d = e?.config, l = oe(d.state), r = oe(a.selectedItems), u = oe(a?.storages || []), v = I(null), b = I(!1), h = R(() => window.opener !== null || window.name !== "" || window.history.length <= 1), _ = R(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(cn, { items: r.value }),
            hidden: () => !t("newfolder")
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(ro, { items: r.value }),
            hidden: () => !t("newfile")
          },
          {
            type: "separator",
            hidden: () => !t("newfolder") && !t("newfile") || !t("upload")
          },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(un, { items: r.value }),
            hidden: () => !t("upload")
          },
          { type: "separator", hidden: () => !t("search") },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(dn),
            hidden: () => !t("search")
          },
          { type: "separator", hidden: () => !t("archive") && !t("unarchive") },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(fn, { items: r.value });
            },
            enabled: () => r.value.length > 0,
            hidden: () => !t("archive")
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && e?.modal?.open(vn, { items: r.value });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip",
            hidden: () => !t("unarchive")
          },
          { type: "separator", hidden: () => !t("preview") },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              r.value.length === 1 && r.value[0]?.type !== "dir" && e?.modal?.open(Ye, {
                storage: a?.path?.get()?.storage,
                item: r.value[0]
              });
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir",
            hidden: () => !t("preview")
          },
          {
            id: "open-as",
            label: n("Preview as"),
            items: [
              {
                id: "open-as-text",
                label: n("Text"),
                action: () => e?.modal?.open(Ye, {
                  storage: a?.path?.get()?.storage,
                  item: r.value[0],
                  forceType: "text"
                }),
                enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
              },
              {
                id: "open-as-image",
                label: n("Image"),
                action: () => e?.modal?.open(Ye, {
                  storage: a?.path?.get()?.storage,
                  item: r.value[0],
                  forceType: "image"
                }),
                enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
              }
            ],
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir",
            hidden: () => !t("preview")
          },
          // Only show exit option if we can actually close the window
          ...h.value ? [
            { type: "separator" },
            {
              id: "exit",
              label: n("Exit"),
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
        label: n("Edit"),
        items: [
          // Only show Select All and Deselect All in multiple selection mode
          ...e?.selectionMode === "multiple" ? [
            {
              id: "select-all",
              label: n("Select All"),
              action: () => a?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: n("Deselect All"),
              action: () => a?.clearSelection(),
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...t("copy") ? [
            {
              id: "cut",
              label: n("Cut"),
              action: () => {
                r.value.length > 0 && a?.setClipboard(
                  "cut",
                  new Set(r.value.map((f) => ke(f)))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "copy",
              label: n("Copy"),
              action: () => {
                r.value.length > 0 && a?.setClipboard(
                  "copy",
                  new Set(r.value.map((f) => ke(f)))
                );
              },
              enabled: () => r.value.length > 0
            },
            {
              id: "paste",
              label: n("Paste"),
              action: () => {
                const f = a?.getClipboard();
                f?.items?.size > 0 && e?.modal?.open(f.type === "cut" ? at : ln, {
                  items: { from: Array.from(f.items), to: a?.path?.get() }
                });
              },
              enabled: () => a?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...t("move") ? [
            {
              id: "move",
              label: n("Move files"),
              action: () => {
                if (r.value.length > 0) {
                  const f = e?.fs, x = {
                    storage: f?.path?.get()?.storage || "",
                    path: f?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(at, { items: { from: r.value, to: x } });
                }
              },
              enabled: () => r.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "copy-path",
            label: n("Copy Path"),
            action: async () => {
              if (r.value.length === 1) {
                const f = r.value[0];
                await yt(f.path);
              } else {
                const f = a?.path?.get();
                f?.path && await yt(f.path);
              }
            },
            enabled: () => !0
            // Her zaman aktif
          },
          {
            id: "copy-download-url",
            label: n("Copy Download URL"),
            action: async () => {
              if (r.value.length === 1) {
                const f = r.value[0];
                a?.path?.get()?.storage;
                const x = e?.adapter?.getDownloadUrl({ path: f.path });
                x && await Rr(x);
              }
            },
            enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
          },
          { type: "separator", hidden: () => !t("rename") && !t("delete") },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              r.value.length === 1 && e?.modal?.open(Dt, { items: r.value });
            },
            enabled: () => r.value.length === 1,
            hidden: () => !t("rename")
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              r.value.length > 0 && e?.modal?.open(Tt, { items: r.value });
            },
            enabled: () => r.value.length > 0,
            hidden: () => !t("delete")
          }
        ]
      },
      {
        id: "view",
        label: n("View"),
        items: [
          {
            id: "refresh",
            label: n("Refresh"),
            action: () => {
              e.adapter.invalidateListQuery(a.path.get().path), e.adapter.open(a.path.get().path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: n("Grid View"),
            action: () => d?.set("view", "grid"),
            enabled: () => !0,
            checked: () => l.value?.view === "grid"
          },
          {
            id: "list-view",
            label: n("List View"),
            action: () => d?.set("view", "list"),
            enabled: () => !0,
            checked: () => l.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: n("Tree View"),
            action: () => d?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => l.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: n("Show Thumbnails"),
            action: () => d?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => l.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: n("Show Hidden Files"),
            action: () => d?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => l.value?.showHiddenFiles
          },
          { type: "separator", hidden: () => !t("fullscreen") },
          {
            id: "fullscreen",
            label: n("Full Screen"),
            action: () => d?.toggle("fullScreen"),
            enabled: () => t("fullscreen"),
            checked: () => l.value?.fullScreen,
            hidden: () => !t("fullscreen")
          },
          { type: "separator" },
          {
            id: "persist-path",
            label: n("Persist Path"),
            action: () => {
              d?.toggle("persist"), e.emitter.emit("vf-persist-path-saved");
            },
            enabled: () => !0,
            checked: () => l.value?.persist
          },
          {
            id: "metric-units",
            label: n("Metric Units"),
            action: () => {
              d?.toggle("metricUnits"), e.filesize = d?.get("metricUnits") ? Hn : Jt, e.emitter.emit("vf-metric-units-saved");
            },
            enabled: () => !0,
            checked: () => l.value?.metricUnits
          }
        ]
      },
      {
        id: "go",
        label: n("Go"),
        items: [
          ...t("history") ? [
            {
              id: "forward",
              label: n("Forward"),
              action: () => {
                a?.goForward();
                const f = a?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => a?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: n("Back"),
              action: () => {
                a?.goBack();
                const f = a?.path?.get();
                f?.path && e?.adapter.open(f.path);
              },
              enabled: () => a?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const f = a?.path?.get();
              if (f?.breadcrumb && f.breadcrumb.length > 1) {
                const C = f.breadcrumb[f.breadcrumb.length - 2]?.path ?? `${f.storage}://`;
                e?.adapter.open(C);
              }
            },
            enabled: () => {
              const f = a?.path?.get();
              return f?.breadcrumb && f.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(u.value || []).map((f) => ({
            id: `storage-${f}`,
            label: f,
            action: () => {
              const x = `${f}://`;
              e?.adapter.open(x);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: () => e?.modal?.open(Cu),
            enabled: () => !0
          }
        ]
      },
      {
        id: "help",
        label: n("Help"),
        items: [
          {
            id: "settings",
            label: n("Settings"),
            action: () => e?.modal?.open(io),
            enabled: () => !0
          },
          {
            id: "shortcuts",
            label: n("Shortcuts"),
            action: () => e?.modal?.open(du),
            enabled: () => !0
          },
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(Wn),
            enabled: () => !0
          }
        ]
      }
    ]), k = (f) => {
      v.value === f ? $() : (v.value = f, b.value = !0);
    }, w = (f) => {
      b.value && (v.value = f);
    }, $ = () => {
      v.value = null, b.value = !1;
    }, m = (f) => {
      $(), f();
    }, g = (f) => {
      f.target.closest(".vuefinder__menubar") || $();
    };
    return we(() => {
      document.addEventListener("click", g);
    }), Te(() => {
      document.removeEventListener("click", g);
    }), (f, x) => (c(), p("div", {
      class: "vuefinder__menubar",
      onClick: x[0] || (x[0] = _e(() => {
      }, ["stop"]))
    }, [
      o("div", Fu, [
        (c(!0), p(fe, null, ge(_.value, (C) => (c(), p("div", {
          key: C.id,
          class: te(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": v.value === C.id }]),
          onClick: (F) => k(C.id),
          onMouseenter: (F) => w(C.id)
        }, [
          o("span", Pu, y(C.label), 1),
          v.value === C.id ? (c(), p("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (F) => w(C.id)
          }, [
            (c(!0), p(fe, null, ge(C.items, (F) => (c(), p("div", {
              key: F.id || F.type,
              class: te(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": F.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": F.enabled && !F.enabled(),
                "vuefinder__menubar__dropdown__item--checked": F.checked && F.checked(),
                "vuefinder__menubar__dropdown__item--hidden": F.hidden && F.hidden(),
                "vuefinder__menubar__dropdown__item--has-children": F.items?.length
              }]),
              onClick: _e((E) => F.type !== "separator" && !F.items?.length && (!F.enabled || F.enabled()) ? m(F.action) : null, ["stop"])
            }, [
              F.type !== "separator" ? (c(), p("span", Mu, y(F.label), 1)) : j("", !0),
              F.checked && F.checked() ? (c(), p("span", Iu, " ✓ ")) : j("", !0),
              F.items?.length ? (c(), p("svg", Au, [...x[1] || (x[1] = [
                o("path", { d: "M6 4l4 4-4 4z" }, null, -1)
              ])])) : j("", !0),
              F.items?.length ? (c(), p("div", Ou, [
                (c(!0), p(fe, null, ge(F.items, (E) => (c(), p("div", {
                  key: E.id,
                  class: te(["vuefinder__menubar__dropdown__item", {
                    "vuefinder__menubar__dropdown__item--disabled": E.enabled && !E.enabled()
                  }]),
                  onClick: _e((L) => !E.enabled || E.enabled() ? m(E.action) : null, ["stop"])
                }, [
                  o("span", Ru, y(E.label), 1)
                ], 10, Lu))), 128))
              ])) : j("", !0)
            ], 10, Du))), 128))
          ], 40, Tu)) : j("", !0)
        ], 42, Eu))), 128))
      ])
    ]));
  }
}), zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Vu(s, e) {
  return c(), p("svg", zu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Uu = { render: Vu }, Nu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Hu(s, e) {
  return c(), p("svg", Nu, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const ju = { render: Hu }, Ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function qu(s, e) {
  return c(), p("svg", Ku, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Wu = { render: qu }, Gu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Yu(s, e) {
  return c(), p("svg", Gu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Xu = { render: Yu }, Qu = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ju(s, e) {
  return c(), p("svg", Qu, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const Zu = { render: Ju }, ev = { class: "vuefinder__toolbar" }, tv = { class: "vuefinder__toolbar__actions" }, nv = ["title"], ov = ["title"], sv = ["title"], iv = ["title"], av = ["title"], lv = ["title"], rv = ["title"], dv = { class: "vuefinder__toolbar__controls" }, cv = ["title"], uv = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, vv = ["title"], fv = { class: "relative" }, _v = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, pv = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, mv = { class: "vuefinder__toolbar__dropdown-content" }, hv = { class: "vuefinder__toolbar__dropdown-section" }, gv = { class: "vuefinder__toolbar__dropdown-label" }, yv = { class: "vuefinder__toolbar__dropdown-row" }, wv = { value: "name" }, bv = { value: "size" }, kv = { value: "modified" }, $v = { value: "" }, xv = { value: "asc" }, Sv = { value: "desc" }, Cv = { class: "vuefinder__toolbar__dropdown-section" }, Fv = { class: "vuefinder__toolbar__dropdown-label" }, Ev = { class: "vuefinder__toolbar__dropdown-options" }, Pv = { class: "vuefinder__toolbar__dropdown-option" }, Tv = { class: "vuefinder__toolbar__option-text" }, Dv = { class: "vuefinder__toolbar__dropdown-option" }, Mv = { class: "vuefinder__toolbar__option-text" }, Iv = { class: "vuefinder__toolbar__dropdown-option" }, Av = { class: "vuefinder__toolbar__option-text" }, Ov = { class: "vuefinder__toolbar__dropdown-toggle" }, Lv = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Rv = { class: "vuefinder__toolbar__dropdown-reset" }, Bv = ["title"], zv = ["title"], Vv = /* @__PURE__ */ le({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(s) {
    const e = ae(), { enabled: t } = Ve(), { t: n } = e.i18n, a = e.fs, d = e.config, l = oe(d.state), r = oe(a.selectedItems), u = oe(a.sort), v = oe(a.filter);
    pe(
      () => l.value.fullScreen,
      () => {
        const m = document.querySelector("body");
        m && (m.style.overflow = l.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const b = I(!1), h = (m) => {
      m.target.closest(".vuefinder__toolbar__dropdown-container") || (b.value = !1);
    };
    we(() => {
      const m = document.querySelector("body");
      m && l.value.fullScreen && setTimeout(() => m.style.overflow = "hidden"), document.addEventListener("click", h);
    }), Te(() => {
      document.removeEventListener("click", h);
    });
    const _ = I({
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
      () => _.value.sortBy,
      (m) => {
        if (!_.value.sortOrder) {
          a.clearSort();
          return;
        }
        m === "name" ? a.setSort("basename", _.value.sortOrder) : m === "size" ? a.setSort("file_size", _.value.sortOrder) : m === "modified" && a.setSort("last_modified", _.value.sortOrder);
      }
    ), pe(
      () => _.value.sortOrder,
      (m) => {
        if (!m) {
          a.clearSort();
          return;
        }
        _.value.sortBy === "name" ? a.setSort("basename", m) : _.value.sortBy === "size" ? a.setSort("file_size", m) : _.value.sortBy === "modified" && a.setSort("last_modified", m);
      }
    ), pe(
      u,
      (m) => {
        m.active ? (m.column === "basename" ? _.value.sortBy = "name" : m.column === "file_size" ? _.value.sortBy = "size" : m.column === "last_modified" && (_.value.sortBy = "modified"), _.value.sortOrder = m.order) : _.value.sortOrder = "";
      },
      { immediate: !0 }
    ), pe(
      () => _.value.filterKind,
      (m) => {
        a.setFilter(m, l.value.showHiddenFiles);
      }
    ), pe(
      () => _.value.showHidden,
      (m) => {
        d.set("showHiddenFiles", m), a.setFilter(_.value.filterKind, m);
      }
    ), pe(
      v,
      (m) => {
        _.value.filterKind = m.kind;
      },
      { immediate: !0 }
    ), pe(
      () => l.value.showHiddenFiles,
      (m) => {
        _.value.showHidden = m, a.setFilter(_.value.filterKind, m);
      },
      { immediate: !0 }
    );
    const k = () => d.set("view", l.value.view === "grid" ? "list" : "grid"), w = R(() => v.value.kind !== "all" || !l.value.showHiddenFiles || u.value.active), $ = () => {
      _.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, d.set("showHiddenFiles", !0), a.clearSort(), a.clearFilter();
    };
    return (m, g) => (c(), p("div", ev, [
      o("div", tv, [
        i(t)("newfolder") ? (c(), p("div", {
          key: 0,
          class: "mx-1.5",
          title: i(n)("New Folder"),
          onClick: g[0] || (g[0] = (f) => i(e).modal.open(cn, { items: i(r) }))
        }, [
          W(i(ao))
        ], 8, nv)) : j("", !0),
        i(t)("newfile") ? (c(), p("div", {
          key: 1,
          class: "mx-1.5",
          title: i(n)("New File"),
          onClick: g[1] || (g[1] = (f) => i(e).modal.open(ro, { items: i(r) }))
        }, [
          W(i(lo))
        ], 8, ov)) : j("", !0),
        i(t)("rename") ? (c(), p("div", {
          key: 2,
          class: "mx-1.5",
          title: i(n)("Rename"),
          onClick: g[2] || (g[2] = (f) => i(r).length !== 1 || i(e).modal.open(Dt, { items: i(r) }))
        }, [
          W(i(Yn), {
            class: te(i(r).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, sv)) : j("", !0),
        i(t)("delete") ? (c(), p("div", {
          key: 3,
          class: "mx-1.5",
          title: i(n)("Delete"),
          onClick: g[3] || (g[3] = (f) => !i(r).length || i(e).modal.open(Tt, { items: i(r) }))
        }, [
          W(i(Gn), {
            class: te(i(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, iv)) : j("", !0),
        i(t)("upload") ? (c(), p("div", {
          key: 4,
          class: "mx-1.5",
          title: i(n)("Upload"),
          onClick: g[4] || (g[4] = (f) => i(e).modal.open(un, { items: i(r) }))
        }, [
          W(i(co))
        ], 8, av)) : j("", !0),
        i(t)("unarchive") && i(r).length === 1 && i(r)[0].mime_type === "application/zip" ? (c(), p("div", {
          key: 5,
          class: "mx-1.5",
          title: i(n)("Unarchive"),
          onClick: g[5] || (g[5] = (f) => !i(r).length || i(e).modal.open(vn, { items: i(r) }))
        }, [
          W(i(uo), {
            class: te(i(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, lv)) : j("", !0),
        i(t)("archive") ? (c(), p("div", {
          key: 6,
          class: "mx-1.5",
          title: i(n)("Archive"),
          onClick: g[6] || (g[6] = (f) => !i(r).length || i(e).modal.open(fn, { items: i(r) }))
        }, [
          W(i(vo), {
            class: te(i(r).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, rv)) : j("", !0)
      ]),
      o("div", dv, [
        i(t)("search") ? (c(), p("div", {
          key: 0,
          class: "mx-1.5",
          title: i(n)("Search Files"),
          onClick: g[7] || (g[7] = (f) => i(e).modal.open(dn))
        }, [
          W(i(rn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, cv)) : j("", !0),
        o("div", uv, [
          o("div", {
            title: i(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: g[8] || (g[8] = (f) => b.value = !b.value)
          }, [
            o("div", fv, [
              W(i(Zu), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              w.value ? (c(), p("div", _v)) : j("", !0)
            ])
          ], 8, vv),
          b.value ? (c(), p("div", pv, [
            o("div", mv, [
              o("div", hv, [
                o("div", gv, y(i(n)("Sorting")), 1),
                o("div", yv, [
                  he(o("select", {
                    "onUpdate:modelValue": g[9] || (g[9] = (f) => _.value.sortBy = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", wv, y(i(n)("Name")), 1),
                    o("option", bv, y(i(n)("Size")), 1),
                    o("option", kv, y(i(n)("Date")), 1)
                  ], 512), [
                    [Kt, _.value.sortBy]
                  ]),
                  he(o("select", {
                    "onUpdate:modelValue": g[10] || (g[10] = (f) => _.value.sortOrder = f),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", $v, y(i(n)("None")), 1),
                    o("option", xv, y(i(n)("Asc")), 1),
                    o("option", Sv, y(i(n)("Desc")), 1)
                  ], 512), [
                    [Kt, _.value.sortOrder]
                  ])
                ])
              ]),
              o("div", Cv, [
                o("div", Fv, y(i(n)("Show")), 1),
                o("div", Ev, [
                  o("label", Pv, [
                    he(o("input", {
                      "onUpdate:modelValue": g[11] || (g[11] = (f) => _.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [zt, _.value.filterKind]
                    ]),
                    o("span", Tv, y(i(n)("All items")), 1)
                  ]),
                  o("label", Dv, [
                    he(o("input", {
                      "onUpdate:modelValue": g[12] || (g[12] = (f) => _.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [zt, _.value.filterKind]
                    ]),
                    o("span", Mv, y(i(n)("Files only")), 1)
                  ]),
                  o("label", Iv, [
                    he(o("input", {
                      "onUpdate:modelValue": g[13] || (g[13] = (f) => _.value.filterKind = f),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [zt, _.value.filterKind]
                    ]),
                    o("span", Av, y(i(n)("Folders only")), 1)
                  ])
                ])
              ]),
              o("div", Ov, [
                o("label", Lv, y(i(n)("Show hidden files")), 1),
                he(o("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": g[14] || (g[14] = (f) => _.value.showHidden = f),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [lt, _.value.showHidden]
                ])
              ]),
              o("div", Rv, [
                o("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: $
                }, y(i(n)("Reset")), 1)
              ])
            ])
          ])) : j("", !0)
        ]),
        i(t)("fullscreen") ? (c(), p("div", {
          key: 1,
          class: "mx-1.5",
          title: i(n)("Toggle Full Screen"),
          onClick: g[15] || (g[15] = (f) => i(d).toggle("fullScreen"))
        }, [
          i(l).fullScreen ? (c(), X(i(ju), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (c(), X(i(Uu), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Bv)) : j("", !0),
        o("div", {
          class: "mx-1.5",
          title: i(n)("Change View"),
          onClick: g[16] || (g[16] = (f) => k())
        }, [
          i(l).view === "grid" ? (c(), X(i(Wu), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : j("", !0),
          i(l).view === "list" ? (c(), X(i(Xu), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : j("", !0)
        ], 8, zv)
      ])
    ]));
  }
}), Uv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function Nv(s, e) {
  return c(), p("svg", Uv, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Hv = { render: Nv }, jv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Kv(s, e) {
  return c(), p("svg", jv, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const qv = { render: Kv }, Wv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Gv(s, e) {
  return c(), p("svg", Wv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Yv = { render: Gv }, Xv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Qv(s, e) {
  return c(), p("svg", Xv, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const Jv = { render: Qv }, Zv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ef(s, e) {
  return c(), p("svg", Zv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const tf = { render: ef };
function $t(s, e = []) {
  const t = "vfDragEnterCounter", n = s.fs, a = oe(n.selectedItems);
  function d(h, _) {
    return !!(!h || h.type !== "dir" || h.path === _ || h.path.startsWith(`${_}/`) || a.value.some((w) => w.path === _ ? !1 : !!(h.path === w.path || h.path.startsWith(`${w.path}/`))));
  }
  function l(h, _) {
    if (h.isExternalDrag)
      return;
    if (!(s.features?.move ?? !1)) {
      h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none");
      return;
    }
    h.preventDefault();
    const w = n.getDraggedItem(), $ = n.sortedFiles.get().find((m) => ke(m) === w)?.path ?? "";
    d(_, $) ? h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : (h.dataTransfer && (h.dataTransfer.dropEffect = "copy", h.dataTransfer.effectAllowed = "all"), h.currentTarget.classList.add(...e));
  }
  function r(h) {
    if (h.isExternalDrag || !(s.features?.move ?? !1))
      return;
    h.preventDefault();
    const k = h.currentTarget, w = Number(k.dataset[t] || 0);
    k.dataset[t] = String(w + 1);
  }
  function u(h) {
    if (h.isExternalDrag || !(s.features?.move ?? !1))
      return;
    h.preventDefault();
    const k = h.currentTarget, $ = Number(k.dataset[t] || 0) - 1;
    $ <= 0 ? (delete k.dataset[t], k.classList.remove(...e)) : k.dataset[t] = String($);
  }
  function v(h, _) {
    if (h.isExternalDrag || !(s.features?.move ?? !1) || !_) return;
    h.preventDefault();
    const w = h.currentTarget;
    delete w.dataset[t], w.classList.remove(...e);
    const $ = h.dataTransfer?.getData("items") || "[]", g = JSON.parse($).map((f) => n.sortedFiles.get().find((x) => ke(x) === f)).filter((f) => !!f);
    n.clearDraggedItem(), s.modal.open(at, { items: { from: g, to: _ } });
  }
  function b(h) {
    return {
      dragover: (_) => l(_, h),
      dragenter: r,
      dragleave: u,
      drop: (_) => v(_, h)
    };
  }
  return { events: b };
}
const nf = { class: "vuefinder__breadcrumb__container" }, of = ["title"], sf = ["title"], af = ["title"], lf = ["title"], rf = { class: "vuefinder__breadcrumb__path-container" }, df = { class: "vuefinder__breadcrumb__list" }, cf = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, uf = { class: "relative" }, vf = ["title", "onClick"], ff = ["title"], _f = { class: "vuefinder__breadcrumb__path-mode" }, pf = { class: "vuefinder__breadcrumb__path-mode-content" }, mf = ["title"], hf = { class: "vuefinder__breadcrumb__path-text" }, gf = ["title"], yf = ["data-theme"], wf = ["onClick"], bf = { class: "vuefinder__breadcrumb__hidden-item-content" }, kf = { class: "vuefinder__breadcrumb__hidden-item-text" }, ct = 5, Tn = 1, $f = 40, xf = /* @__PURE__ */ le({
  __name: "Breadcrumb",
  setup(s) {
    const e = ae(), t = Be(e), { t: n } = e.i18n, a = e.fs, d = e.config, l = oe(d.state), r = oe(a.path), u = oe(a.loading), v = I(null), b = to(0, 100), h = I(5), _ = I(!1), k = I(!1), w = R(() => r.value?.breadcrumb ?? []), $ = /* @__PURE__ */ new Map();
    function m(P, V) {
      return P.length > V ? [P.slice(-V), P.slice(0, -V)] : [P, []];
    }
    const g = R(
      () => m(w.value, h.value)[0]
    ), f = R(
      () => m(w.value, h.value)[1]
    );
    function x() {
      const P = w.value, V = b.value;
      if (!P.length || V <= 0) return null;
      let A = 0, O = 0;
      for (let H = P.length - 1; H >= 0; H--) {
        const D = P[H]?.name;
        if (!D) continue;
        const N = $.get(D);
        if (N === void 0) return null;
        if (A + N > V - $f || (A += N, O++, O >= ct)) break;
      }
      return O < Tn && (O = Tn), O > ct && (O = ct), O;
    }
    function C() {
      if (!v.value) return;
      const P = v.value.children, V = g.value;
      for (let A = 0; A < P.length; A++) {
        const O = V[A]?.name;
        if (!O) continue;
        const H = P[A].offsetWidth;
        H > 0 && $.set(O, H);
      }
    }
    async function F() {
      if (!w.value.length) {
        h.value = ct;
        return;
      }
      const P = x();
      if (P !== null) {
        h.value = P;
        return;
      }
      h.value = ct, await De(), C();
      const V = x();
      V !== null && (h.value = V);
    }
    pe(b, F), pe(w, F, { immediate: !0 });
    const E = () => {
      v.value && (b.value = v.value.offsetWidth);
    }, L = I(null);
    we(() => {
      L.value = new ResizeObserver(E), v.value && L.value.observe(v.value);
    }), Te(() => {
      L.value && L.value.disconnect();
    });
    const q = $t(e, ["vuefinder__drag-over"]);
    function Z(P = null) {
      P ??= w.value.length - 2;
      const V = {
        basename: r.value?.storage ?? "local",
        extension: "",
        path: (r.value?.storage ?? "local") + "://",
        storage: r.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return w.value[P] ?? V;
    }
    const ee = () => {
      e.adapter.invalidateListQuery(r.value.path), e.adapter.open(r.value.path);
    }, Q = () => {
      g.value.length > 0 && e.adapter.open(
        w.value[w.value.length - 2]?.path ?? (r.value?.storage ?? "local") + "://"
      );
    }, G = (P) => {
      e.adapter.open(P.path), _.value = !1;
    }, T = () => {
      _.value && (_.value = !1);
    }, M = {
      mounted(P, V) {
        P.clickOutsideEvent = function(A) {
          P === A.target || P.contains(A.target) || V.value();
        }, document.body.addEventListener("click", P.clickOutsideEvent);
      },
      beforeUnmount(P) {
        document.body.removeEventListener("click", P.clickOutsideEvent);
      }
    }, U = () => {
      d.toggle("showTreeView");
    }, Y = I({
      x: 0,
      y: 0
    }), ce = (P, V = null) => {
      if (P.currentTarget instanceof HTMLElement) {
        const { x: A, y: O, height: H } = P.currentTarget.getBoundingClientRect();
        Y.value = { x: A, y: O + H };
      }
      _.value = V ?? !_.value;
    }, B = () => {
      k.value = !k.value;
    }, S = async () => {
      await yt(r.value?.path || ""), t.success(n("Path copied to clipboard"));
    }, z = () => {
      k.value = !1;
    };
    return (P, V) => (c(), p("div", nf, [
      o("span", {
        title: i(n)("Toggle Tree View")
      }, [
        W(i(Jv), {
          class: te(["vuefinder__breadcrumb__toggle-tree", i(l).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: U
        }, null, 8, ["class"])
      ], 8, of),
      o("span", {
        title: i(n)("Go up a directory")
      }, [
        W(i(fo), je({
          class: w.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Qe(w.value.length ? i(q).events(Z()) : {}), { onClick: Q }), null, 16, ["class"])
      ], 8, sf),
      i(a).isLoading() ? (c(), p("span", {
        key: 1,
        title: i(n)("Cancel")
      }, [
        W(i(Xn), {
          onClick: V[0] || (V[0] = (A) => i(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, lf)) : (c(), p("span", {
        key: 0,
        title: i(n)("Refresh")
      }, [
        W(i(Hv), { onClick: ee })
      ], 8, af)),
      he(o("div", rf, [
        o("div", null, [
          W(i(qv), je({ class: "vuefinder__breadcrumb__home-icon" }, Qe(i(q).events(Z(-1))), {
            onClick: V[1] || (V[1] = _e((A) => i(e).adapter.open(i(r).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", df, [
          f.value.length ? he((c(), p("div", cf, [
            V[3] || (V[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", uf, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: V[2] || (V[2] = (A) => ce(A, !0)),
                onClick: _e(ce, ["stop"])
              }, [
                W(i(so), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [M, T]
          ]) : j("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: v,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (c(!0), p(fe, null, ge(g.value, (A, O) => (c(), p("div", { key: O }, [
            V[4] || (V[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", je({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: A.basename
            }, Qe(i(q).events(A), !0), {
              onClick: _e((H) => i(e).adapter.open(A.path), ["stop"])
            }), y(A.name), 17, vf)
          ]))), 128))
        ], 512),
        i(d).get("loadingIndicator") === "circular" && i(u) ? (c(), X(i(Ot), { key: 0 })) : j("", !0),
        o("span", {
          title: i(n)("Toggle Path Copy Mode"),
          onClick: B
        }, [
          W(i(tf), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, ff)
      ], 512), [
        [qe, !k.value]
      ]),
      he(o("div", _f, [
        o("div", pf, [
          o("div", {
            title: i(n)("Copy Path")
          }, [
            W(i(sn), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: S
            })
          ], 8, mf),
          o("div", hf, y(i(r).path), 1),
          o("div", {
            title: i(n)("Exit")
          }, [
            W(i(Yv), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: z
            })
          ], 8, gf)
        ])
      ], 512), [
        [qe, k.value]
      ]),
      (c(), X(bt, { to: "body" }, [
        o("div", null, [
          he(o("div", {
            style: Pe({
              position: "absolute",
              top: Y.value.y + "px",
              left: Y.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": i(e).theme.current
          }, [
            (c(!0), p(fe, null, ge(f.value, (A, O) => (c(), p("div", je({
              key: O,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Qe(i(q).events(A), !0), {
              onClick: (H) => G(A)
            }), [
              o("div", bf, [
                o("span", null, [
                  W(i(Re), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", kf, y(A.name), 1)
              ])
            ], 16, wf))), 128))
          ], 12, yf), [
            [qe, _.value]
          ])
        ])
      ]))
    ]));
  }
}), Sf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Cf(s, e) {
  return c(), p("svg", Sf, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Dn = { render: Cf }, Ff = { class: "vuefinder__drag-item__container" }, Ef = { class: "vuefinder__drag-item__count" }, Pf = /* @__PURE__ */ le({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(s) {
    const e = s;
    return (t, n) => (c(), p("div", Ff, [
      e.count > 1 ? (c(), X(i(Dn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : j("", !0),
      W(i(Dn), { class: "vuefinder__drag-item__icon" }),
      o("div", Ef, y(e.count), 1)
    ]));
  }
}), Tf = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Mn = /* @__PURE__ */ le({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(s) {
    const e = s, t = ae(), n = oe(t.config.state), a = R(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), d = R(() => {
      const r = a.value, u = n.value?.listIconSize, v = n.value?.gridIconSize;
      return n.value?.gridItemWidth, n.value?.gridItemHeight, e.view === "list" || r === "small" ? {
        "--vf-icon-size": `${u ?? 16}px`
      } : {
        "--vf-icon-size": `${v ?? 48}px`
      };
    }), l = {
      app: t,
      config: n.value,
      item: e.item,
      view: e.view
    };
    return (r, u) => (c(), p("div", {
      class: te(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": a.value === "small",
        "vuefinder__item-icon--large": a.value === "large",
        "vuefinder__item-icon--grid": s.view === "grid",
        "vuefinder__item-icon--list": s.view === "list"
      }]),
      style: Pe(d.value)
    }, [
      Me(r.$slots, "icon", Je(Ze(l)), () => [
        s.item.type === "dir" ? (c(), X(i(Re), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (c(), X(i(ht), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        s.ext && s.item.type !== "dir" && s.item.extension ? (c(), p("div", Tf, y(s.item.extension.substring(0, 3)), 1)) : j("", !0)
      ])
    ], 6));
  }
}), Df = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Mf(s, e) {
  return c(), p("svg", Df, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const In = { render: Mf }, If = ["data-key", "data-row", "data-col", "draggable"], Af = { key: 0 }, Of = { class: "vuefinder__explorer__item-grid-content" }, Lf = ["data-src", "alt"], Rf = { class: "vuefinder__explorer__item-title" }, Bf = {
  key: 1,
  class: "vuefinder__explorer__item-list-content"
}, zf = { class: "vuefinder__explorer__item-list-name" }, Vf = { class: "vuefinder__explorer__item-list-icon" }, Uf = { class: "vuefinder__explorer__item-name" }, Nf = {
  key: 0,
  class: "vuefinder__explorer__item-path"
}, Hf = {
  key: 1,
  class: "vuefinder__explorer__item-size"
}, jf = { key: 0 }, Kf = {
  key: 2,
  class: "vuefinder__explorer__item-date"
}, qf = /* @__PURE__ */ le({
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
  setup(s, { emit: e }) {
    const t = s, n = e, a = ae(), d = a.fs, l = a.config, r = R(() => {
      const G = a.selectionFilterType;
      return !G || G === "both" ? !0 : G === "files" && t.item.type === "file" || G === "dirs" && t.item.type === "dir";
    }), u = R(() => {
      const G = a.selectionFilterMimeIncludes;
      return !G || !G.length || t.item.type === "dir" ? !0 : t.item.mime_type ? G.some((T) => t.item.mime_type?.startsWith(T)) : !1;
    }), v = R(() => r.value && u.value), b = R(() => t.item.type === "dir" || v.value), h = R(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      // Disabled appearance: only for items the user cannot interact with at all.
      b.value ? "" : "vf-explorer-item--unselectable",
      // Excluded from rectangle selection but otherwise interactive (e.g. a
      // folder while selectionFilterType is 'files' — user can still navigate).
      b.value && !v.value ? "vf-explorer-item--no-select" : ""
    ]), _ = R(() => ({
      opacity: t.isDragging || d.isCut(ke(t.item)) || !b.value ? 0.5 : ""
    })), k = I(null);
    let w = !1, $ = null, m = null, g = !1;
    const { enabled: f } = Ve(), x = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), C = R(() => x ? !1 : f("move")), F = () => {
      $ && (clearTimeout($), $ = null), m = null;
    }, E = (G) => {
      F(), m = G, g = !1, G.stopPropagation(), $ = setTimeout(() => {
        !m || $ === null || (g = !0, m.cancelable && m.preventDefault(), m.stopPropagation(), n("contextmenu", m), F());
      }, 500);
    }, L = (G) => {
      if (g) {
        G.preventDefault(), G.stopPropagation(), F();
        return;
      }
      setTimeout(() => {
        g || (F(), Q(G));
      }, 100);
    }, q = (G) => {
      if (!m) return;
      const T = m.touches[0] || m.changedTouches[0], M = G.touches[0] || G.changedTouches[0];
      if (T && M) {
        const U = Math.abs(M.clientX - T.clientX), Y = Math.abs(M.clientY - T.clientY);
        (U > 15 || Y > 15) && F();
      }
    }, Z = (G) => {
      x && G.type !== "click" || n("click", G);
    }, ee = (G) => {
      if (g)
        return G.preventDefault(), G.stopPropagation(), !1;
      n("dragstart", G);
    }, Q = (G) => {
      if (!w)
        w = !0, n("click", G), k.value = setTimeout(() => {
          w = !1;
        }, 300);
      else
        return w = !1, n("dblclick", G), !1;
    };
    return (G, T) => (c(), p("div", {
      class: te(h.value),
      style: Pe(_.value),
      "data-key": i(ke)(s.item),
      "data-row": s.rowIndex,
      "data-col": s.colIndex,
      draggable: C.value,
      onTouchstartCapture: T[1] || (T[1] = (M) => E(M)),
      onTouchendCapture: T[2] || (T[2] = (M) => L(M)),
      onTouchmoveCapture: q,
      onTouchcancelCapture: T[3] || (T[3] = () => F()),
      onClick: Z,
      onDblclick: T[4] || (T[4] = (M) => n("dblclick", M)),
      onContextmenu: T[5] || (T[5] = _e((M) => n("contextmenu", M), ["prevent", "stop"])),
      onDragstart: ee,
      onDragend: T[6] || (T[6] = (M) => n("dragend", M))
    }, [
      s.view === "grid" ? (c(), p("div", Af, [
        i(d).isReadOnly(s.item) ? (c(), X(i(In), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : j("", !0),
        o("div", Of, [
          (s.item.mime_type ?? "").startsWith("image") && s.showThumbnails ? (c(), p("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": s.item.previewUrl ?? i(a).adapter.getPreviewUrl({ path: s.item.path }),
            alt: s.item.basename,
            onTouchstart: T[0] || (T[0] = (M) => M.preventDefault())
          }, null, 40, Lf)) : (c(), X(Mn, {
            key: 1,
            item: s.item,
            ext: !0,
            view: s.view
          }, {
            icon: ue((M) => [
              Me(G.$slots, "icon", Je(Ze(M)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        o("span", Rf, y(i(Yt)(s.item.basename)), 1)
      ])) : (c(), p("div", Bf, [
        o("div", zf, [
          o("div", Vf, [
            W(Mn, {
              item: s.item,
              view: s.view
            }, {
              icon: ue((M) => [
                Me(G.$slots, "icon", Je(Ze(M)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          o("span", Uf, y(s.item.basename), 1),
          o("div", null, [
            i(d).isReadOnly(s.item) ? (c(), X(i(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : j("", !0)
          ])
        ]),
        s.showPath ? (c(), p("div", Nf, y(s.item.path), 1)) : j("", !0),
        s.showPath ? j("", !0) : (c(), p("div", Hf, [
          s.item.file_size ? (c(), p("div", jf, y(i(a).filesize(s.item.file_size)), 1)) : j("", !0)
        ])),
        !s.showPath && s.item.last_modified ? (c(), p("div", Kf, y(new Date(s.item.last_modified * 1e3).toLocaleString()), 1)) : j("", !0)
      ])),
      i(f)("pinned") && i(l).get("pinnedFolders").find((M) => M.path === s.item.path) ? (c(), X(i(gt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : j("", !0)
    ], 46, If));
  }
}), Wf = ["data-row"], An = /* @__PURE__ */ le({
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
  setup(s, { emit: e }) {
    const t = s, n = e, a = R(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), d = R(() => ({
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
    return (r, u) => (c(), p("div", {
      class: te(a.value),
      "data-row": s.rowIndex,
      style: Pe(d.value)
    }, [
      o("div", {
        class: te(["grid justify-self-start", { "w-full": s.view === "list" }]),
        style: Pe(l.value)
      }, [
        (c(!0), p(fe, null, ge(s.items, (v, b) => (c(), X(qf, je({
          key: i(ke)(v),
          item: v,
          view: s.view,
          "show-thumbnails": s.showThumbnails,
          "show-path": s.showPath,
          "is-selected": s.isSelected(i(ke)(v)),
          "is-dragging": s.isDraggingItem(i(ke)(v)),
          "row-index": s.rowIndex,
          "col-index": b,
          "explorer-id": s.explorerId
        }, Qe(s.dragNDropEvents(v)), {
          onClick: u[0] || (u[0] = (h) => n("click", h)),
          onDblclick: u[1] || (u[1] = (h) => n("dblclick", h)),
          onContextmenu: u[2] || (u[2] = (h) => n("contextmenu", h)),
          onDragstart: u[3] || (u[3] = (h) => n("dragstart", h)),
          onDragend: u[4] || (u[4] = (h) => n("dragend", h))
        }), {
          icon: ue((h) => [
            Me(r.$slots, "icon", je({ ref_for: !0 }, h))
          ]),
          _: 3
        }, 16, ["item", "view", "show-thumbnails", "show-path", "is-selected", "is-dragging", "row-index", "col-index", "explorer-id"]))), 128))
      ], 6)
    ], 14, Wf));
  }
}), Gf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Yf(s, e) {
  return c(), p("svg", Gf, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Xf = { render: Yf }, Qf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Jf(s, e) {
  return c(), p("svg", Qf, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const Zf = { render: Jf }, jt = /* @__PURE__ */ le({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(s) {
    return (e, t) => (c(), p("div", null, [
      s.direction === "asc" ? (c(), X(i(Xf), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : j("", !0),
      s.direction === "desc" ? (c(), X(i(Zf), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : j("", !0)
    ]));
  }
}), e_ = { class: "vuefinder__explorer__header" }, t_ = /* @__PURE__ */ le({
  __name: "ExplorerHeader",
  setup(s) {
    const e = ae(), t = e.fs, { t: n } = e.i18n, a = oe(t.sort);
    return (d, l) => (c(), p("div", e_, [
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: l[0] || (l[0] = (r) => i(t).toggleSort("basename"))
      }, [
        ye(y(i(n)("Name")) + " ", 1),
        he(W(jt, {
          direction: i(a).order
        }, null, 8, ["direction"]), [
          [qe, i(a).active && i(a).column === "basename"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: l[1] || (l[1] = (r) => i(t).toggleSort("file_size"))
      }, [
        ye(y(i(n)("Size")) + " ", 1),
        he(W(jt, {
          direction: i(a).order
        }, null, 8, ["direction"]), [
          [qe, i(a).active && i(a).column === "file_size"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: l[2] || (l[2] = (r) => i(t).toggleSort("last_modified"))
      }, [
        ye(y(i(n)("Date")) + " ", 1),
        he(W(jt, {
          direction: i(a).order
        }, null, 8, ["direction"]), [
          [qe, i(a).active && i(a).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function n_(s, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: a,
    overscan: d = 2,
    containerPadding: l = 48,
    lockItemsPerRow: r
  } = e, u = s, v = () => typeof a == "number" ? a : a.value, b = () => n ? typeof n == "number" ? n : n.value : 100, h = () => l ? typeof l == "number" ? l : l.value : 0, _ = I(0), k = I(6), w = I(600);
  let $ = null;
  const m = R(() => Math.ceil(u.value.length / k.value)), g = R(() => m.value * v()), f = R(() => {
    const Q = v(), G = Math.max(0, Math.floor(_.value / Q) - d), T = Math.min(
      m.value,
      Math.ceil((_.value + w.value) / Q) + d
    );
    return { start: G, end: T };
  }), x = R(() => {
    const { start: Q, end: G } = f.value;
    return Array.from({ length: G - Q }, (T, M) => Q + M);
  }), C = () => w.value, F = () => typeof r == "object" ? r.value : !1, E = () => {
    if (F()) {
      k.value = 1;
      return;
    }
    if (t.value) {
      const Q = h(), G = t.value.clientWidth - Q, T = b();
      T > 0 && (k.value = Math.max(Math.floor(G / T), 2));
    }
  }, L = (Q) => {
    const G = Q.target;
    _.value = G.scrollTop;
  };
  pe(
    () => u.value.length,
    () => {
      E();
    }
  ), n && typeof n != "number" && pe(n, () => {
    E();
  }), l && typeof l != "number" && pe(l, () => {
    E();
  }), a && typeof a != "number" && pe(a, () => {
  });
  const q = (Q, G) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const T = G * k.value;
    return Q.slice(T, T + k.value);
  }, Z = (Q, G, T, M, U) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const Y = [];
    for (let ce = G; ce <= T; ce++)
      for (let B = M; B <= U; B++) {
        const S = ce * k.value + B;
        S < Q.length && Q[S] && Y.push(Q[S]);
      }
    return Y;
  }, ee = (Q) => ({
    row: Math.floor(Q / k.value),
    col: Q % k.value
  });
  return we(async () => {
    await De(), t.value && (w.value = t.value.clientHeight || 600), E(), window.addEventListener("resize", () => {
      t.value && (w.value = t.value.clientHeight || 600), E();
    }), t.value && "ResizeObserver" in window && ($ = new ResizeObserver((Q) => {
      const G = Q[0];
      G && (w.value = Math.round(G.contentRect.height)), E();
    }), $.observe(t.value));
  }), Te(() => {
    window.removeEventListener("resize", E), $ && ($.disconnect(), $ = null);
  }), {
    scrollTop: _,
    itemsPerRow: k,
    totalRows: m,
    totalHeight: g,
    visibleRange: f,
    visibleRows: x,
    updateItemsPerRow: E,
    handleScroll: L,
    getRowItems: q,
    getItemsInRange: Z,
    getItemPosition: ee,
    getContainerHeight: C
  };
}
function o_(s) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: n,
    getKey: a,
    selectionObject: d,
    rowHeight: l,
    itemWidth: r,
    osInstance: u
  } = s, v = () => typeof r == "number" ? r : r.value, b = Math.floor(Math.random() * 2 ** 32).toString(), h = ae(), _ = h.fs, k = oe(_.selectedKeys), w = oe(_.sortedFiles), $ = R(() => {
    const B = /* @__PURE__ */ new Map();
    return w.value && w.value.forEach((S) => {
      B.set(a(S), S);
    }), B;
  }), m = I(/* @__PURE__ */ new Set()), g = I(!1), f = I(!1), x = (B) => B.map((S) => S.getAttribute("data-key")).filter((S) => !!S), C = (B) => {
    B.selection.clearSelection(!0, !0);
  }, F = (B) => {
    if (k.value && k.value.size > 0) {
      const S = document.querySelectorAll(`.file-item-${b}[data-key]`), z = /* @__PURE__ */ new Map();
      S.forEach((V) => {
        const A = V.getAttribute("data-key");
        A && z.set(A, V);
      });
      const P = [];
      k.value.forEach((V) => {
        const A = z.get(V);
        A && E(V) && P.push(A);
      }), P.forEach((V) => {
        B.selection.select(V, !0);
      });
    }
  }, E = (B) => {
    const S = $.value.get(B);
    if (!S) return !1;
    const z = h.selectionFilterType, P = h.selectionFilterMimeIncludes;
    return z === "files" && S.type === "dir" || z === "dirs" && S.type === "file" ? !1 : P && Array.isArray(P) && P.length > 0 ? S.type === "dir" ? !0 : S.mime_type ? P.some((V) => S.mime_type?.startsWith(V)) : !1 : !0;
  }, L = (B) => {
    if (h.selectionMode === "single")
      return !1;
    g.value = !1, !B.event?.metaKey && !B.event?.ctrlKey && (f.value = !0), B.selection.resolveSelectables(), C(B), F(B);
  }, q = I(0), Z = ({ event: B, selection: S }) => {
    q.value = (d.value?.getAreaLocation().y1 ?? 0) - (h.root.getBoundingClientRect().top ?? 0);
    const z = document.querySelector(
      ".selection-area-container"
    );
    if (z && (z.dataset.theme = h.theme.current), h.selectionMode === "single")
      return;
    const P = B;
    P && "type" in P && P.type === "touchend" && P.preventDefault();
    const V = B;
    !V?.ctrlKey && !V?.metaKey && (_.clearSelection(), S.clearSelection(!0, !0)), m.value.clear();
  }, ee = (B) => {
    if (h.selectionMode === "single")
      return;
    const S = x(B.store.changed.added), z = x(B.store.changed.removed);
    f.value = !1, g.value = !0, S.forEach((P) => {
      k.value && !k.value.has(P) && E(P) && (m.value.add(P), _.select(P, h.selectionMode || "multiple"));
    }), z.forEach((P) => {
      document.querySelector(`[data-key="${P}"]`) && $.value.has(P) && m.value.delete(P), _.deselect(P);
    }), B.selection.resolveSelectables(), F(B);
  }, Q = () => {
    m.value.clear();
  }, G = (B) => {
    if (!B.event)
      return;
    const S = document.querySelector(".scroller-" + b);
    if (!S)
      return;
    const z = S.getBoundingClientRect(), P = z.left, V = z.top;
    let A = S.scrollTop;
    if (u?.value) {
      const { viewport: Ge } = u.value.elements();
      Ge && (A = Ge.scrollTop);
    }
    const O = d.value?.getAreaLocation();
    if (!O)
      return;
    const H = Math.min(O.x1, O.x2), D = A + Math.min(O.y1, O.y2), N = Math.max(O.x1, O.x2), de = A + Math.max(O.y1, O.y2), me = 4, K = v();
    let se = Math.floor((H - P - me) / K), ve = Math.floor((N - P - me) / K);
    const be = H - P - me - se * K, Ie = N - P - me - ve * K;
    be > K - me && (se = se + 1), Ie < me && (ve = ve - 1);
    const tt = Math.max(0, se), J = Math.min(e.value - 1, ve);
    let ne = Math.floor((D - V - me) / l.value), ie = Math.floor((de - V - me) / l.value);
    const re = D - V - me - ne * l.value, Ue = de - V - me - ie * l.value, Ee = Math.floor((t.value - me) / l.value);
    re > l.value - me && (ne = ne + 1), Ue < me && (ie = ie - 1);
    const Se = Math.max(0, ne), We = Math.min(ie, Ee), Ae = n(
      w.value,
      Se,
      We,
      tt,
      J
    ), Rt = document.querySelectorAll(`.file-item-${b}[data-key]`), hn = /* @__PURE__ */ new Map();
    Rt.forEach((Ge) => {
      const rt = Ge.getAttribute("data-key");
      rt && hn.set(rt, Ge);
    });
    const Bt = [];
    if (Ae.forEach((Ge) => {
      const rt = a(Ge);
      hn.get(rt) || Bt.push(rt);
    }), Bt.length > 0) {
      const Ge = h.selectionMode || "multiple";
      _.selectMultiple(Bt, Ge);
    }
  }, T = (B) => {
    G(B), C(B), F(B), _.setSelectedCount(k.value?.size || 0), g.value = !1;
  }, M = () => {
    let B = [".scroller-" + b];
    if (u?.value) {
      const { viewport: S } = u.value.elements();
      S && (B = S);
    }
    d.value = new Io({
      selectables: [
        ".file-item-" + b + ":not(.vf-explorer-item--unselectable):not(.vf-explorer-item--no-select)"
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
    }), d.value.on("beforestart", L), d.value.on("start", Z), d.value.on("move", ee), d.value.on("stop", T);
  }, U = () => {
    d.value && (d.value.destroy(), d.value = null);
  }, Y = () => {
    d.value && (Array.from(
      k.value ?? /* @__PURE__ */ new Set()
    ).forEach((S) => {
      E(S) || _.deselect(S);
    }), U(), M());
  }, ce = (B) => {
    f.value && (d.value?.clearSelection(), Q(), f.value = !1);
    const S = B;
    !m.value.size && !f.value && !S?.ctrlKey && !S?.metaKey && (_.clearSelection(), d.value?.clearSelection());
  };
  return we(() => {
    const B = (S) => {
      !S.buttons && g.value && (g.value = !1);
    };
    document.addEventListener("dragleave", B), Te(() => {
      document.removeEventListener("dragleave", B);
    });
  }), {
    explorerId: b,
    isDragging: g,
    initializeSelectionArea: M,
    updateSelectionArea: Y,
    handleContentClick: ce
  };
}
function s_(s) {
  const e = (n) => {
    if (!n)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const a = s.selectionFilterType, d = s.selectionFilterMimeIncludes, l = !a || a === "both" || a === "files" && n.type === "file" || a === "dirs" && n.type === "dir";
    let r = !0;
    return d && Array.isArray(d) && d.length > 0 && (n.type === "dir" ? r = !0 : n.mime_type ? r = d.some((u) => n.mime_type.startsWith(u)) : r = !1), { typeAllowed: l, mimeAllowed: r };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (n) => {
      const { typeAllowed: a, mimeAllowed: d } = e(n);
      return a && d;
    }
  };
}
function i_(s) {
  const e = (n) => ({
    item: n,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (n, a, d) => {
      const l = e(n);
      if (n.type === "file" && a) {
        if (s.emitter.emit("vf-file-dclick", l), l.defaultPrevented) return;
      } else if (n.type === "dir" && d && (s.emitter.emit("vf-folder-dclick", l), l.defaultPrevented))
        return;
      const r = s.contextMenuItems?.find((u) => u.show(s, {
        items: [n],
        target: n,
        searchQuery: ""
      }));
      r && r.action(s, [n]);
    }
  };
}
function a_(s, e, t, n, a, d, l) {
  const r = s.fs, { canSelectItem: u } = s_(s), { openItem: v } = i_(s), b = (m) => {
    const g = m.target?.closest(".file-item-" + e);
    if (!g) return null;
    const f = String(g.getAttribute("data-key")), x = t.value?.find((C) => ke(C) === f);
    return { key: f, item: x };
  }, h = () => {
    const m = n.value;
    return t.value?.filter((g) => m?.has(ke(g))) || [];
  };
  return {
    handleItemClick: (m) => {
      const g = b(m);
      if (!g) return;
      const { key: f, item: x } = g, C = m;
      if (!u(x)) {
        x?.type === "dir" && (r.clearSelection(), a.value?.clearSelection(!0, !0), r.setSelectedCount(0));
        return;
      }
      const F = s.selectionMode || "multiple";
      !C?.ctrlKey && !C?.metaKey && (m.type !== "touchstart" || !r.isSelected(f)) && (r.clearSelection(), a.value?.clearSelection(!0, !0)), a.value?.resolveSelectables(), m.type === "touchstart" && r.isSelected(f) ? r.select(f, F) : r.toggleSelect(f, F), r.setSelectedCount(n.value?.size || 0);
    },
    handleItemDblClick: (m) => {
      const g = b(m);
      if (!g) return;
      const { item: f } = g;
      f && (f.type === "file" && !u(f) || v(f, d, l));
    },
    handleItemContextMenu: (m) => {
      m.preventDefault(), m.stopPropagation();
      const g = b(m);
      if (!g) return;
      const { key: f, item: x } = g;
      u(x) && (n.value?.has(f) || (r.clearSelection(), r.select(f)), s.emitter.emit("vf-contextmenu-show", {
        event: m,
        items: h(),
        target: x
      }));
    },
    handleContentContextMenu: (m) => {
      m.preventDefault(), s.emitter.emit("vf-contextmenu-show", { event: m, items: h() });
    },
    getSelectedItems: h
  };
}
function l_(s, e) {
  const t = I(null);
  return we(() => {
    if (ft.plugin([Mo]), s.value) {
      const n = ft(
        s.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (a) => {
            t.value = a;
            const { viewport: d } = a.elements();
            d && d.addEventListener("scroll", e);
          },
          updated: (a) => {
            const { viewport: d } = a.elements();
          }
        }
      );
      t.value = n;
    }
  }), Te(() => {
    if (t.value) {
      const { viewport: n } = t.value.elements();
      n && n.removeEventListener("scroll", e), t.value.destroy(), t.value = null;
    }
  }), {
    osInstance: t
  };
}
const r_ = 4, d_ = 600;
function c_(s, e) {
  const t = I(null), n = /* @__PURE__ */ new WeakMap(), a = /* @__PURE__ */ new WeakMap();
  return we(() => {
    s.value && (t.value = new qt({
      elements_selector: ".lazy",
      container: s.value,
      // Put the placeholder back so the browser doesn't show a broken-image
      // icon (the "?" thumbnail) while we retry.
      restore_on_error: !0,
      callback_error: (d, l) => {
        const r = (n.get(d) ?? 0) + 1;
        if (r > r_) return;
        n.set(d, r);
        const u = d_ * 2 ** (r - 1) + Math.random() * 250, v = a.get(d);
        v && clearTimeout(v), a.set(
          d,
          setTimeout(() => {
            d.isConnected && (qt.resetStatus(d), l.update());
          }, u)
        );
      }
    })), e?.emitter && e.emitter.on("vf-refresh-thumbnails", () => {
      t.value && t.value.update();
    });
  }), ko(() => {
    t.value && t.value.update();
  }), Te(() => {
    t.value && (t.value.destroy(), t.value = null);
  }), {
    vfLazyLoad: t
  };
}
const u_ = { class: "vuefinder__explorer__container" }, v_ = {
  key: 0,
  class: "vuefinder__linear-loader"
}, f_ = /* @__PURE__ */ le({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(s) {
    const e = s, t = ae(), n = $t(t, ["vuefinder__drag-over"]), a = st("dragImage"), d = vt(null), l = st("scrollContainer"), r = st("scrollContent"), u = t.fs, v = t.config, b = oe(v.state), h = oe(u.sortedFiles), _ = oe(u.selectedKeys), k = oe(u.loading), w = (K) => _.value?.has(K) ?? !1, $ = R(() => {
      if (b.value?.view === "grid") {
        const be = b.value?.gridItemHeight ?? 80, Ie = b.value?.gridItemGap ?? 8;
        return be + Ie * 2;
      }
      const se = b.value?.listItemHeight ?? 32, ve = b.value?.listItemGap ?? 2;
      return se + ve * 2;
    }), m = R(() => {
      if (b.value?.view === "grid") {
        const se = b.value?.gridItemWidth ?? 96, ve = b.value?.gridItemGap ?? 8;
        return se + ve * 2;
      }
      return 104;
    }), g = R(() => b.value?.view === "grid" ? (b.value?.gridItemGap ?? 8) * 2 : 0), { t: f } = t.i18n, {
      itemsPerRow: x,
      totalHeight: C,
      visibleRows: F,
      handleScroll: E,
      getRowItems: L,
      getItemsInRange: q,
      updateItemsPerRow: Z
    } = n_(
      R(() => h.value ?? []),
      {
        scrollContainer: l,
        itemWidth: m,
        rowHeight: $,
        overscan: 2,
        containerPadding: g,
        lockItemsPerRow: R(() => b.value.view === "list")
      }
    ), { osInstance: ee } = l_(l, E), { explorerId: Q, isDragging: G, initializeSelectionArea: T, updateSelectionArea: M, handleContentClick: U } = o_({
      itemsPerRow: x,
      totalHeight: C,
      getItemsInRange: q,
      getKey: (K) => ke(K),
      selectionObject: d,
      rowHeight: $,
      itemWidth: m,
      osInstance: ee
    }), Y = I(null), ce = (K) => {
      if (!K || !Y.value) return !1;
      const se = _.value?.has(Y.value) ?? !1;
      return G.value && (se ? _.value?.has(K) ?? !1 : K === Y.value);
    };
    pe(
      () => v.get("view"),
      (K) => {
        K === "list" ? x.value = 1 : Z();
      },
      { immediate: !0 }
    ), pe(x, (K) => {
      v.get("view") === "list" && K !== 1 && (x.value = 1);
    });
    const B = (K) => h.value?.[K];
    c_(l, t);
    const { handleItemClick: S, handleItemDblClick: z, handleItemContextMenu: P, handleContentContextMenu: V } = a_(
      t,
      Q,
      h,
      _,
      d,
      e.onFileDclick,
      e.onFolderDclick
    );
    we(() => {
      const K = () => {
        d.value || T(), d.value && d.value.on("beforestart", ({ event: se }) => {
          const ve = se?.target === r.value;
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
          clearInterval(se), d.value || K();
        }, 500);
      }
      pe(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], M, {
        deep: !0
      });
    });
    const A = (K) => {
      if (!(t.features?.move ?? !1) || K.altKey || K.ctrlKey || K.metaKey)
        return K.preventDefault(), !1;
      G.value = !0;
      const ve = K.target?.closest(
        ".file-item-" + Q
      );
      if (Y.value = ve ? String(ve.dataset.key) : null, K.dataTransfer && Y.value) {
        K.dataTransfer.setDragImage(a.value, 0, 15), K.dataTransfer.effectAllowed = "all", K.dataTransfer.dropEffect = "copy";
        const be = _.value?.has(Y.value) ? Array.from(_.value) : [Y.value];
        K.dataTransfer.setData("items", JSON.stringify(be)), u.setDraggedItem(Y.value);
      }
    }, O = () => {
      Y.value = null;
    };
    let H = null, D = null;
    const N = (K) => {
      K.target?.closest(".file-item-" + Q) || (D = K, H && clearTimeout(H), H = setTimeout(() => {
        D && (D.cancelable && D.preventDefault(), D.stopPropagation(), V(D)), D = null, H = null;
      }, 500));
    }, de = (K) => {
      H && (clearTimeout(H), H = null), D = null;
    }, me = (K) => {
      if (!D) return;
      const se = D.touches[0] || D.changedTouches[0], ve = K.touches[0] || K.changedTouches[0];
      if (se && ve) {
        const be = Math.abs(ve.clientX - se.clientX), Ie = Math.abs(ve.clientY - se.clientY);
        (be > 15 || Ie > 15) && (H && (clearTimeout(H), H = null), D = null);
      }
    };
    return (K, se) => (c(), p("div", u_, [
      i(b).view === "list" ? (c(), X(t_, { key: 0 })) : j("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: l,
        class: te(["vuefinder__explorer__selector-area", "scroller-" + i(Q)])
      }, [
        i(v).get("loadingIndicator") === "linear" && i(k) ? (c(), p("div", v_)) : j("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: r,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Pe({ height: `${i(C)}px`, position: "relative", width: "100%" }),
          onContextmenu: se[0] || (se[0] = _e(
            //@ts-ignore
            (...ve) => i(V) && i(V)(...ve),
            ["self", "prevent"]
          )),
          onClick: se[1] || (se[1] = _e(
            //@ts-ignore
            (...ve) => i(U) && i(U)(...ve),
            ["self"]
          )),
          onTouchstartCapture: _e(N, ["self"]),
          onTouchendCapture: _e(de, ["self"]),
          onTouchmoveCapture: _e(me, ["self"]),
          onTouchcancelCapture: _e(de, ["self"])
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: a,
            class: "vuefinder__explorer__drag-item"
          }, [
            W(Pf, {
              count: Y.value && i(_).has(Y.value) ? i(_).size : 1
            }, null, 8, ["count"])
          ], 512),
          i(b).view === "grid" ? (c(!0), p(fe, { key: 0 }, ge(i(F), (ve) => (c(), X(An, {
            key: ve,
            "row-index": ve,
            "row-height": $.value,
            view: "grid",
            "items-per-row": i(x),
            items: i(L)(i(h), ve),
            "show-thumbnails": i(b).showThumbnails,
            "is-dragging-item": ce,
            "is-selected": w,
            "drag-n-drop-events": (be) => i(n).events(be),
            "explorer-id": i(Q),
            onClick: i(S),
            onDblclick: i(z),
            onContextmenu: i(P),
            onDragstart: A,
            onDragend: O
          }, {
            icon: ue((be) => [
              Me(K.$slots, "icon", je({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (c(!0), p(fe, { key: 1 }, ge(i(F), (ve) => (c(), X(An, {
            key: ve,
            "row-index": ve,
            "row-height": $.value,
            view: "list",
            items: B(ve) ? [B(ve)] : [],
            "is-dragging-item": ce,
            "is-selected": w,
            "drag-n-drop-events": (be) => i(n).events(be),
            "explorer-id": i(Q),
            onClick: i(S),
            onDblclick: i(z),
            onContextmenu: i(P),
            onDragstart: A,
            onDragend: O
          }, {
            icon: ue((be) => [
              Me(K.$slots, "icon", je({ ref_for: !0 }, be))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), __ = ["href", "download"], p_ = { class: "vuefinder__context-menu__action vuefinder__context-menu__action--parent" }, m_ = { class: "vuefinder__context-menu vuefinder__context-menu__submenu" }, h_ = ["onClick"], g_ = ["onClick"], y_ = /* @__PURE__ */ le({
  __name: "ContextMenu",
  setup(s) {
    const e = ae(), t = I(null), n = I([]);
    let a = null, d = null, l = null, r = [], u = null;
    const v = Pt({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (k) => {
      n.value = k;
    });
    const b = (k) => k.link(e, n.value), h = (k) => {
      e.emitter.emit("vf-contextmenu-hide"), k.action(e, n.value);
    };
    e.emitter.on("vf-contextmenu-show", (k) => {
      const { event: w, items: $, target: m = null } = k || {};
      v.items = (e.contextMenuItems || []).filter((g) => g.show(e, {
        items: $,
        target: m
      })).sort((g, f) => {
        const x = g.order ?? 1 / 0, C = f.order ?? 1 / 0;
        return x - C;
      }), m ? $.length > 1 && $.some((g) => g.path === m.path) ? e.emitter.emit("vf-context-selected", $) : e.emitter.emit("vf-context-selected", [m]) : e.emitter.emit("vf-context-selected", []), _(w);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      v.active = !1, a && (a(), a = null), l && (r.forEach((k) => {
        k === window ? window.removeEventListener("scroll", l, !0) : k.removeEventListener("scroll", l, !0);
      }), l = null, r = []), u && (document.removeEventListener("mousedown", u, !0), document.removeEventListener("touchstart", u, !0), u = null), d = null, v.positions = {};
    });
    const _ = async (k) => {
      a && (a(), a = null);
      const $ = ((E) => {
        if ("clientX" in E && "clientY" in E)
          return { x: E.clientX, y: E.clientY };
        const L = "touches" in E && E.touches[0] || "changedTouches" in E && E.changedTouches[0];
        return L ? { x: L.clientX, y: L.clientY } : { x: 0, y: 0 };
      })(k);
      if (d = {
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
      }, v.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, v.active = !0, await De(), !t.value || !d) return;
      await new Promise((E) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(E);
        });
      });
      const m = [
        _t(8),
        pt({
          padding: 16,
          fallbackPlacements: ["left-start", "right-end", "left-end", "top-start", "bottom-start"]
        }),
        mt({ padding: 16 })
      ];
      let g = 0, f = 0;
      try {
        const E = await it(d, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: m
        });
        g = E.x, f = E.y;
      } catch (E) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", E);
        return;
      }
      v.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${g}px`,
        top: `${f}px`,
        opacity: "0",
        visibility: "visible",
        transform: "translateY(-8px)",
        transition: "opacity 150ms ease-out, transform 150ms ease-out"
      }, requestAnimationFrame(() => {
        t.value && (v.positions = {
          ...v.positions,
          opacity: "1",
          transform: "translateY(0)"
        });
      });
      const C = ((E) => {
        const L = [];
        let q = E;
        for (; q && q !== document.body && q !== document.documentElement; ) {
          const Z = window.getComputedStyle(q), ee = Z.overflow + Z.overflowX + Z.overflowY;
          (ee.includes("scroll") || ee.includes("auto")) && L.push(q), q = q.parentElement;
        }
        return L;
      })(t.value);
      r = [window, ...C], l = () => {
        v.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const F = l;
      F && r.forEach((E) => {
        E === window ? window.addEventListener("scroll", F, !0) : E.addEventListener("scroll", F, !0);
      }), u = (E) => {
        if (!v.active) return;
        const L = E.target;
        if (!L || t.value && t.value.contains(L))
          return;
        const q = e.root;
        q && q.contains(L) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        u && (document.addEventListener("mousedown", u, !0), document.addEventListener("touchstart", u, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !d))
          try {
            a = Xt(d, t.value, async () => {
              if (!(!d || !t.value))
                try {
                  const { x: E, y: L } = await it(d, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: m
                  });
                  v.positions = {
                    ...v.positions,
                    left: `${E}px`,
                    top: `${L}px`
                  };
                } catch (E) {
                  console.warn("Floating UI positioning error:", E);
                }
            });
          } catch (E) {
            console.warn("Floating UI autoUpdate setup error:", E), a = null;
          }
      }, 200);
    };
    return Te(() => {
      a && (a(), a = null), l && (r.forEach((k) => {
        k === window ? window.removeEventListener("scroll", l, !0) : k.removeEventListener("scroll", l, !0);
      }), l = null, r = []), u && (document.removeEventListener("mousedown", u, !0), document.removeEventListener("touchstart", u, !0), u = null), d = null;
    }), (k, w) => he((c(), p("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: te([{
        "vuefinder__context-menu--active": v.active,
        "vuefinder__context-menu--inactive": !v.active
      }, "vuefinder__context-menu"]),
      style: Pe(v.positions)
    }, [
      (c(!0), p(fe, null, ge(v.items, ($) => (c(), p("li", {
        key: $.title,
        class: te(["vuefinder__context-menu__item", { "vuefinder__context-menu__item--has-children": $.children?.length }])
      }, [
        $.link ? (c(), p("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: b($),
          download: b($),
          onClick: w[0] || (w[0] = (m) => i(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, y($.title(i(e).i18n)), 1)
        ], 8, __)) : $.children?.length ? (c(), p(fe, { key: 1 }, [
          o("div", p_, [
            o("span", null, y($.title(i(e).i18n)), 1),
            w[1] || (w[1] = o("svg", {
              class: "vuefinder__context-menu__chevron",
              viewBox: "0 0 16 16",
              fill: "currentColor",
              "aria-hidden": "true"
            }, [
              o("path", { d: "M6 4l4 4-4 4z" })
            ], -1))
          ]),
          o("ul", m_, [
            (c(!0), p(fe, null, ge($.children, (m) => (c(), p("li", {
              key: m.id,
              class: "vuefinder__context-menu__item"
            }, [
              o("div", {
                class: "vuefinder__context-menu__action",
                onClick: (g) => h(m)
              }, [
                o("span", null, y(m.title(i(e).i18n)), 1)
              ], 8, h_)
            ]))), 128))
          ])
        ], 64)) : (c(), p("div", {
          key: 2,
          class: "vuefinder__context-menu__action",
          onClick: (m) => h($)
        }, [
          o("span", null, y($.title(i(e).i18n)), 1)
        ], 8, g_))
      ], 2))), 128))
    ], 6)), [
      [qe, v.active]
    ]);
  }
}), w_ = { class: "vuefinder__status-bar__wrapper" }, b_ = { class: "vuefinder__status-bar__storage" }, k_ = ["title"], $_ = { class: "vuefinder__status-bar__storage-icon" }, x_ = ["value"], S_ = ["value"], C_ = { class: "vuefinder__status-bar__info space-x-2" }, F_ = { key: 0 }, E_ = { class: "vuefinder__status-bar__size" }, P_ = { key: 1 }, T_ = { class: "vuefinder__status-bar__size" }, D_ = { class: "vuefinder__status-bar__actions" }, M_ = /* @__PURE__ */ le({
  __name: "Statusbar",
  setup(s) {
    const e = ae(), { t } = e.i18n, n = e.fs, a = oe(n.sortedFiles), d = oe(n.path), l = oe(n.selectedCount), r = oe(n.storages), u = oe(n.selectedItems), v = oe(n.path), b = (g) => {
      const f = g.target.value;
      e.adapter.open(f + "://");
    }, h = R(() => !u.value || u.value.length === 0 ? 0 : u.value.reduce((g, f) => g + (f.file_size || 0), 0)), _ = R(() => !a.value || a.value.length === 0 ? 0 : a.value.reduce((g, f) => g + (f.file_size || 0), 0)), k = R(() => r.value), w = R(() => a.value), $ = R(() => l.value || 0), m = R(() => u.value || []);
    return console.log("sortedFilesList", w), (g, f) => (c(), p("div", w_, [
      o("div", b_, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: i(t)("Storage")
        }, [
          o("div", $_, [
            W(i(an))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: i(d).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: b
          }, [
            (c(!0), p(fe, null, ge(k.value, (x) => (c(), p("option", {
              key: x,
              value: x
            }, y(x), 9, S_))), 128))
          ], 40, x_),
          f[0] || (f[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, k_),
        o("div", C_, [
          $.value === 0 ? (c(), p("span", F_, [
            ye(y(w.value.length) + " " + y(i(t)("items")) + " ", 1),
            o("span", E_, y(i(e).filesize(_.value)), 1)
          ])) : (c(), p("span", P_, [
            ye(y($.value) + " " + y(i(t)("selected")) + " ", 1),
            o("span", T_, y(i(e).filesize(h.value)), 1)
          ]))
        ])
      ]),
      o("div", D_, [
        Me(g.$slots, "actions", {
          path: i(v).path,
          count: $.value || 0,
          selected: m.value
        })
      ])
    ]));
  }
}), I_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function A_(s, e) {
  return c(), p("svg", I_, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const O_ = { render: A_ };
function po(s, e) {
  const t = s.findIndex((n) => n.path === e.path);
  t > -1 ? s[t] = e : s.push(e);
}
const L_ = { class: "vuefinder__folder-loader-indicator" }, R_ = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, mo = /* @__PURE__ */ le({
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ $o({
    storage: {},
    path: {}
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(s) {
    const e = s, t = ae(), n = zn(s, "modelValue"), a = I(!1);
    pe(
      () => n.value,
      () => d()
    );
    const d = async () => {
      a.value = !0;
      try {
        const r = (await t.adapter.list(e.path)).files.filter((u) => u.type === "dir");
        po(t.treeViewData, { path: e.path, type: "dir", folders: r });
      } catch (l) {
        Fe(l, "Failed to fetch subfolders");
      } finally {
        a.value = !1;
      }
    };
    return (l, r) => (c(), p("div", L_, [
      a.value ? (c(), X(i(Ot), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (c(), p("div", R_, [
        n.value ? (c(), X(i(It), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : j("", !0),
        n.value ? j("", !0) : (c(), X(i(Mt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), B_ = { key: 0 }, z_ = { class: "vuefinder__treesubfolderlist__no-folders" }, V_ = { class: "vuefinder__treesubfolderlist__item-content" }, U_ = ["onClick"], N_ = ["title", "onDblclick", "onClick"], H_ = { class: "vuefinder__treesubfolderlist__item-icon" }, j_ = { class: "vuefinder__treesubfolderlist__subfolder" }, K_ = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, q_ = /* @__PURE__ */ le({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(s) {
    const e = ae(), t = e.fs, n = $t(e, ["vuefinder__drag-over"]), a = I({}), d = e.config, l = oe(d.state), { t: r } = e.i18n, u = oe(t.path), v = s, b = I(null), h = I(50);
    we(() => {
      v.path === v.storage + "://" && b.value && ft(b.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const _ = R(() => {
      const x = e.treeViewData.find((C) => C.path === v.path)?.folders || [];
      return x.length > h.value ? x.slice(0, h.value) : x;
    }), k = R(() => e.treeViewData.find((x) => x.path === v.path)?.folders?.length || 0), w = R(() => k.value > h.value), $ = R(() => `${v.storage}://`), m = (f, x) => f === x || f.startsWith(`${x}/`);
    pe(
      _,
      (f) => {
        const x = l.value.expandTreeByDefault && v.path === $.value, C = l.value.expandedTreePaths || [];
        f.forEach((F) => {
          const E = C.some(
            (L) => m(L, F.path)
          );
          (x || E) && a.value[F.path] === void 0 && (a.value[F.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const g = () => {
      h.value += 50;
    };
    return (f, x) => {
      const C = Bn("TreeSubfolderList", !0);
      return c(), p("ul", {
        ref_key: "parentSubfolderList",
        ref: b,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        _.value.length ? j("", !0) : (c(), p("li", B_, [
          o("div", z_, y(i(r)("No folders")), 1)
        ])),
        (c(!0), p(fe, null, ge(_.value, (F) => (c(), p("li", {
          key: F.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", V_, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (E) => a.value[F.path] = !a.value[F.path]
            }, [
              W(mo, {
                modelValue: a.value[F.path],
                "onUpdate:modelValue": (E) => a.value[F.path] = E,
                storage: s.storage,
                path: F.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, U_),
            o("div", je({
              class: "vuefinder__treesubfolderlist__item-link",
              title: F.path
            }, Qe(
              i(n).events({
                ...F,
                dir: F.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (E) => a.value[F.path] = !a.value[F.path],
              onClick: (E) => i(e).adapter.open(F.path)
            }), [
              o("div", H_, [
                i(u)?.path === F.path ? (c(), X(i(At), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (c(), X(i(Re), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: te(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": i(u).path === F.path
                }])
              }, y(F.basename), 3)
            ], 16, N_)
          ]),
          o("div", j_, [
            he(W(C, {
              storage: v.storage,
              path: F.path
            }, null, 8, ["storage", "path"]), [
              [qe, a.value[F.path]]
            ])
          ])
        ]))), 128)),
        w.value ? (c(), p("li", K_, [
          o("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: g
          }, y(i(r)("load more")), 1)
        ])) : j("", !0)
      ], 512);
    };
  }
}), W_ = /* @__PURE__ */ le({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(s) {
    const e = ae(), t = e.fs, n = e.config, a = s, d = oe(n.state), l = R(() => {
      const k = d.value.expandedTreePaths || [], w = `${a.storage}://`;
      return k.some(
        ($) => $ === w || $.startsWith(`${w}`)
      );
    }), r = I(d.value.expandTreeByDefault || l.value), u = $t(e, ["vuefinder__drag-over"]), v = oe(t.path), b = R(() => a.storage === v.value?.storage);
    pe(
      () => ({
        expandTreeByDefault: d.value.expandTreeByDefault,
        hasExpandedPathInStorage: l.value
      }),
      (k) => {
        (k.expandTreeByDefault || k.hasExpandedPathInStorage) && (r.value = !0);
      }
    );
    const h = {
      storage: a.storage,
      path: a.storage + "://",
      dir: a.storage + "://",
      type: "dir",
      basename: a.storage,
      extension: "",
      file_size: null,
      last_modified: null,
      mime_type: null,
      visibility: "public"
    };
    function _(k) {
      k === v.value?.storage ? r.value = !r.value : e.adapter.open(k + "://");
    }
    return (k, w) => (c(), p(fe, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: w[2] || (w[2] = ($) => _(s.storage))
      }, [
        o("div", je({
          class: ["vuefinder__treestorageitem__info", b.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Qe(i(u).events(h), !0)), [
          o("div", {
            class: te(["vuefinder__treestorageitem__icon", b.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            W(i(an))
          ], 2),
          o("div", null, y(s.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: w[1] || (w[1] = _e(($) => r.value = !r.value, ["stop"]))
        }, [
          W(mo, {
            modelValue: r.value,
            "onUpdate:modelValue": w[0] || (w[0] = ($) => r.value = $),
            storage: s.storage,
            path: s.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      he(W(q_, {
        storage: s.storage,
        path: s.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [qe, r.value]
      ])
    ], 64));
  }
}), G_ = { class: "vuefinder__folder-indicator" }, Y_ = { class: "vuefinder__folder-indicator--icon" }, X_ = /* @__PURE__ */ le({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(s) {
    const e = zn(s, "modelValue");
    return (t, n) => (c(), p("div", G_, [
      o("div", Y_, [
        e.value ? (c(), X(i(It), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : j("", !0),
        e.value ? j("", !0) : (c(), X(i(Mt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), Q_ = {
  key: 0,
  class: "vuefinder__treeview__header"
}, J_ = { class: "vuefinder__treeview__pinned-label" }, Z_ = { class: "vuefinder__treeview__pin-text text-nowrap" }, ep = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, tp = ["onClick"], np = ["title"], op = ["onClick"], sp = { key: 0 }, ip = { class: "vuefinder__treeview__no-pinned" }, ap = /* @__PURE__ */ le({
  __name: "TreeView",
  setup(s) {
    const e = ae(), { enabled: t } = Ve(), { t: n } = e.i18n, { getStore: a, setStore: d } = e.storage, l = e.fs, r = e.config, u = oe(r.state), v = oe(l.sortedFiles), b = oe(l.storages), h = R(() => b.value || []), _ = oe(l.path), k = $t(e, ["vuefinder__drag-over"]), w = I(190), $ = I(a("pinned-folders-opened", !0));
    pe($, (x) => d("pinned-folders-opened", x));
    const m = (x) => {
      const C = r.get("pinnedFolders");
      r.set("pinnedFolders", C.filter((F) => F.path !== x.path));
    }, g = (x) => {
      const C = x.clientX, F = x.target.parentElement;
      if (!F) return;
      const E = F.getBoundingClientRect().width;
      F.classList.remove("transition-[width]"), F.classList.add("transition-none");
      const L = (Z) => {
        w.value = E + Z.clientX - C, w.value < 50 && (w.value = 0, r.set("showTreeView", !1)), w.value > 50 && r.set("showTreeView", !0);
      }, q = () => {
        const Z = F.getBoundingClientRect();
        w.value = Z.width, F.classList.add("transition-[width]"), F.classList.remove("transition-none"), window.removeEventListener("mousemove", L), window.removeEventListener("mouseup", q);
      };
      window.addEventListener("mousemove", L), window.addEventListener("mouseup", q);
    }, f = I(null);
    return we(() => {
      f.value && ft(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), pe(v, (x) => {
      const C = x.filter((F) => F.type === "dir");
      po(e.treeViewData, {
        path: _.value.path || "",
        folders: C.map((F) => ({
          storage: F.storage,
          path: F.path,
          basename: F.basename,
          type: "dir"
        }))
      });
    }), (x, C) => (c(), p(fe, null, [
      o("div", {
        class: te(["vuefinder__treeview__overlay", i(u).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: C[0] || (C[0] = (F) => i(r).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: Pe(
          i(u).showTreeView ? "min-width:100px;max-width:75%; width: " + w.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: f,
          class: "vuefinder__treeview__scroll"
        }, [
          i(t)("pinned") ? (c(), p("div", Q_, [
            o("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: C[2] || (C[2] = (F) => $.value = !$.value)
            }, [
              o("div", J_, [
                W(i(gt), { class: "vuefinder__treeview__pin-icon" }),
                o("div", Z_, y(i(n)("Pinned Folders")), 1)
              ]),
              W(X_, {
                modelValue: $.value,
                "onUpdate:modelValue": C[1] || (C[1] = (F) => $.value = F)
              }, null, 8, ["modelValue"])
            ]),
            $.value ? (c(), p("ul", ep, [
              (c(!0), p(fe, null, ge(i(u).pinnedFolders, (F) => (c(), p("li", {
                key: F.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", je({ class: "vuefinder__treeview__pinned-folder" }, Qe(i(k).events(F), !0), {
                  onClick: (E) => i(e).adapter.open(F.path)
                }), [
                  i(_).path !== F.path ? (c(), X(i(Re), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : j("", !0),
                  i(_).path === F.path ? (c(), X(i(At), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : j("", !0),
                  o("div", {
                    title: F.path,
                    class: te(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": i(_).path === F.path
                    }])
                  }, y(F.basename), 11, np)
                ], 16, tp),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (E) => m(F)
                }, [
                  W(i(O_), { class: "vuefinder__treeview__remove-icon" })
                ], 8, op)
              ]))), 128)),
              i(u).pinnedFolders.length ? j("", !0) : (c(), p("li", sp, [
                o("div", ip, y(i(n)("No folders pinned")), 1)
              ]))
            ])) : j("", !0)
          ])) : j("", !0),
          (c(!0), p(fe, null, ge(h.value, (F) => (c(), p("div", {
            key: F,
            class: "vuefinder__treeview__storage"
          }, [
            W(W_, { storage: F }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: g
        }, null, 32)
      ], 4)
    ], 64));
  }
}), Ce = {
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
function lp(s) {
  return s.items.length > 1 && s.items.some((e) => e.path === s.target?.path) ? "many" : s.target ? "one" : "none";
}
function $e(s) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    s
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== lp(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
}
function ut(...s) {
  return (e, t) => s.some((n) => n(e, t));
}
function nt(...s) {
  return (e, t) => s.every((n) => n(e, t));
}
const ho = [
  {
    id: Ce.openDir,
    title: ({ t: s }) => s("Open containing folder"),
    action: (s, e) => {
      const t = e[0];
      t && s.adapter.open(t.dir);
    },
    show: $e({ target: "one", needsSearchQuery: !0 }),
    order: 10
  },
  {
    id: Ce.refresh,
    title: ({ t: s }) => s("Refresh"),
    action: (s) => {
      const e = s.fs;
      s.adapter.invalidateListQuery(e.path.get().path), s.adapter.open(e.path.get().path);
    },
    show: ut($e({ target: "none" }), $e({ target: "many" })),
    order: 20
  },
  {
    id: Ce.selectAll,
    title: ({ t: s }) => s("Select All"),
    action: (s) => {
      s.fs.selectAll(s.selectionMode || "multiple");
    },
    show: (s, e) => s.selectionMode === "multiple" && $e({ target: "none" })(s, e),
    order: 30
  },
  {
    id: Ce.new_folder,
    title: ({ t: s }) => s("New Folder"),
    action: (s) => s.modal.open(cn),
    show: $e({ target: "none", feature: "newfolder" }),
    order: 40
  },
  {
    id: Ce.open,
    title: ({ t: s }) => s("Open"),
    action: (s, e) => {
      e[0] && s.adapter.open(e[0].path);
    },
    show: $e({ target: "one", targetType: "dir" }),
    order: 50
  },
  {
    id: Ce.pinFolder,
    title: ({ t: s }) => s("Pin Folder"),
    action: (s, e) => {
      const t = s.config, n = t.get("pinnedFolders"), a = n.concat(
        e.filter(
          (d) => n.findIndex((l) => l.path === d.path) === -1
        )
      );
      t.set("pinnedFolders", a);
    },
    show: nt($e({ target: "one", targetType: "dir", feature: "pinned" }), (s, e) => s.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) === -1),
    order: 60
  },
  {
    id: Ce.unpinFolder,
    title: ({ t: s }) => s("Unpin Folder"),
    action: (s, e) => {
      const t = s.config, n = t.get("pinnedFolders");
      t.set(
        "pinnedFolders",
        n.filter(
          (a) => !e.find((d) => d.path === a.path)
        )
      );
    },
    show: nt($e({ target: "one", targetType: "dir", feature: "pinned" }), (s, e) => s.config.get("pinnedFolders").findIndex((a) => a.path === e.target?.path) !== -1),
    order: 70
  },
  {
    id: Ce.preview,
    title: ({ t: s }) => s("Preview"),
    action: (s, e) => s.modal.open(Ye, { storage: e[0]?.storage, item: e[0] }),
    show: nt(
      $e({ target: "one", feature: "preview" }),
      (s, e) => e.target?.type !== "dir"
    ),
    order: 80
  },
  {
    id: Ce.openAs,
    title: ({ t: s }) => s("Preview as"),
    action: () => {
    },
    children: [
      {
        id: Ce.openAsText,
        title: ({ t: s }) => s("Text"),
        action: (s, e) => s.modal.open(Ye, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "text"
        }),
        show: () => !0
      },
      {
        id: Ce.openAsImage,
        title: ({ t: s }) => s("Image"),
        action: (s, e) => s.modal.open(Ye, {
          storage: e[0]?.storage,
          item: e[0],
          forceType: "image"
        }),
        show: () => !0
      }
    ],
    show: nt(
      $e({ target: "one", feature: "preview" }),
      (s, e) => e.target?.type !== "dir"
    ),
    order: 81
  },
  {
    id: Ce.download,
    link: (s, e) => {
      if (e[0])
        return s.adapter.getDownloadUrl(e[0]);
    },
    title: ({ t: s }) => s("Download"),
    action: () => {
    },
    show: nt(
      $e({ target: "one", feature: "download" }),
      (s, e) => e.target?.type !== "dir"
    ),
    order: 90
  },
  {
    id: Ce.rename,
    title: ({ t: s }) => s("Rename"),
    action: (s, e) => s.modal.open(Dt, { items: e }),
    show: $e({ target: "one", feature: "rename" }),
    order: 100
  },
  {
    id: Ce.move,
    title: ({ t: s }) => s("Move files"),
    action: (s, e) => {
      const t = s.fs, n = {
        storage: t.path.get().storage || "",
        path: t.path.get().path || "",
        type: "dir"
      };
      s.modal.open(at, { items: { from: e, to: n } });
    },
    show: ut(
      $e({ target: "one", feature: "move" }),
      $e({ target: "many", feature: "move" })
    ),
    order: 110
  },
  {
    id: Ce.copy,
    title: ({ t: s }) => s("Copy"),
    action: (s, e) => {
      e.length > 0 && s.fs.setClipboard("copy", new Set(e.map((t) => ke(t))));
    },
    show: ut(
      $e({ target: "one", feature: "copy" }),
      $e({ target: "many", feature: "copy" })
    ),
    order: 120
  },
  {
    id: Ce.paste,
    title: ({ t: s }) => s("Paste"),
    action: (s, e) => {
      const t = s.fs.getClipboard();
      if (t?.items?.size > 0) {
        const a = s.fs.path.get();
        let d = a.path, l = a.storage;
        e.length === 1 && e[0]?.type === "dir" && (d = e[0].path, l = e[0].storage);
        const r = {
          storage: l || "",
          path: d || "",
          type: "dir"
        };
        s.modal.open(t.type === "cut" ? at : ln, {
          items: { from: Array.from(t.items), to: r }
        });
      }
    },
    show: (s, e) => s.features?.copy ?? !1 ? s.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: Ce.archive,
    title: ({ t: s }) => s("Archive"),
    action: (s, e) => s.modal.open(fn, { items: e }),
    show: ut(
      $e({ target: "many", feature: "archive" }),
      nt(
        $e({ target: "one", feature: "archive" }),
        (s, e) => e.target?.mime_type !== "application/zip"
      )
    ),
    order: 140
  },
  {
    id: Ce.unarchive,
    title: ({ t: s }) => s("Unarchive"),
    action: (s, e) => s.modal.open(vn, { items: e }),
    show: $e({ target: "one", feature: "unarchive", mimeType: "application/zip" }),
    order: 150
  },
  {
    id: Ce.delete,
    title: ({ t: s }) => s("Delete"),
    action: (s, e) => {
      s.modal.open(Tt, { items: e });
    },
    show: ut(
      $e({ feature: "delete", target: "one" }),
      $e({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], rp = ["data-theme"], dp = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, cp = { class: "vuefinder__external-drop-message" }, up = { class: "vuefinder__main__content" }, vp = /* @__PURE__ */ le({
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
  setup(s, { emit: e }) {
    const t = e, n = s, a = ae(), d = st("root"), l = a.config;
    pe(
      () => n.features,
      (f) => {
        const x = Nn(f);
        Object.keys(a.features).forEach((C) => {
          delete a.features[C];
        }), Object.assign(a.features, x);
      },
      { deep: !0 }
    );
    const r = a.fs, u = oe(a.i18n.localeAtom), v = oe(l.state), b = R(() => {
      const f = v.value;
      return {
        "--vf-grid-item-width": `${f.gridItemWidth}px`,
        "--vf-grid-item-height": `${f.gridItemHeight}px`,
        "--vf-grid-item-gap": `${f.gridItemGap}px`,
        "--vf-grid-icon-size": `${f.gridIconSize}px`,
        "--vf-list-item-height": `${f.listItemHeight}px`,
        "--vf-list-item-gap": `${f.listItemGap}px`,
        "--vf-list-icon-size": `${f.listIconSize}px`
      };
    });
    Id();
    const { isDraggingExternal: h, handleDragEnter: _, handleDragOver: k, handleDragLeave: w, handleDrop: $ } = Ad();
    function m(f) {
      r.setPath(f.dirname), l.get("persist") && l.set("path", f.dirname), r.setReadOnly(f.read_only ?? !1), a.modal.close(), r.setFiles(f.files), r.clearSelection(), r.setSelectedCount(0), r.setStorages(f.storages);
    }
    a.adapter.onBeforeOpen = () => {
      r.setLoading(!0);
    }, a.adapter.onAfterOpen = (f) => {
      m(f), r.setLoading(!1);
    }, a.emitter.on("vf-fetch-abort", () => {
      a.adapter.cancelOpen(), r.setLoading(!1);
    }), a.emitter.on("vf-upload-complete", (f) => {
      t("upload-complete", f);
    }), a.emitter.on("vf-delete-complete", (f) => {
      t("delete-complete", f);
    }), a.emitter.on("vf-notify", (f) => {
      t("notify", f);
      const { type: x, message: C } = f ?? {};
      x === "error" && t("error", C);
    }), a.emitter.on("vf-file-dclick", (f) => {
      t("file-dclick", f);
    }), a.emitter.on("vf-folder-dclick", (f) => {
      t("folder-dclick", f);
    }), pe(
      () => n.config?.theme,
      (f) => {
        f && l.set("theme", i(f));
      },
      { immediate: !0 }
    ), pe(
      u,
      (f, x) => {
        f !== x && t("update:locale", String(f));
      },
      { immediate: !1 }
    ), we(() => {
      a.root = d.value, pe(
        () => l.get("path"),
        (x) => {
          a.adapter.open(x);
        }
      );
      const f = l.get("persist") ? l.get("path") : l.get("initialPath") ?? "";
      r.setPath(f), a.adapter.open(f), r.path.listen((x) => {
        t("path-change", x.path);
      }), r.selectedItems.listen((x) => {
        t("select", x);
      }), t("ready");
    });
    const g = async (f) => {
      const x = await $(f);
      x.length > 0 && (a.modal.open(un), setTimeout(() => {
        a.emitter.emit(
          "vf-external-files-dropped",
          x.map((C) => ({ file: C.file, name: C.relativePath }))
        );
      }, 100));
    };
    return (f, x) => (c(), p("div", {
      ref_key: "root",
      ref: d,
      tabindex: "0",
      class: te(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": i(h) }]),
      "data-theme": i(a).theme.current,
      style: Pe(b.value),
      onDragenter: x[2] || (x[2] = //@ts-ignore
      (...C) => i(_) && i(_)(...C)),
      onDragover: x[3] || (x[3] = //@ts-ignore
      (...C) => i(k) && i(k)(...C)),
      onDragleave: x[4] || (x[4] = //@ts-ignore
      (...C) => i(w) && i(w)(...C)),
      onDrop: g
    }, [
      o("div", {
        class: te(i(a).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: te([
            i(v)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: x[0] || (x[0] = (C) => i(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: x[1] || (x[1] = (C) => i(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          i(h) ? (c(), p("div", dp, [
            o("div", cp, y(i(a).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : j("", !0),
          i(v).showMenuBar ? (c(), X(Bu, { key: 1 })) : j("", !0),
          i(v).showToolbar ? (c(), X(Vv, { key: 2 })) : j("", !0),
          W(xf),
          o("div", up, [
            W(ap),
            W(f_, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: ue((C) => [
                Me(f.$slots, "icon", Je(Ze(C)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          W(M_, null, {
            actions: ue((C) => [
              Me(f.$slots, "status-bar", Je(Ze(C)))
            ]),
            _: 3
          })
        ], 34),
        (c(), X(bt, { to: "body" }, [
          W(xo, { name: "fade" }, {
            default: ue(() => [
              i(a).modal.visible ? (c(), X(On(i(a).modal.type), { key: 0 })) : j("", !0)
            ]),
            _: 1
          })
        ])),
        W(y_, { items: i(ho) }, null, 8, ["items"]),
        i(v).notificationsEnabled ? (c(), X(i(Fo), {
          key: 0,
          position: i(v).notificationPosition,
          duration: i(v).notificationDuration,
          "visible-toasts": i(v).notificationVisibleToasts,
          "rich-colors": i(v).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : j("", !0)
      ], 2)
    ], 46, rp));
  }
}), fp = /* @__PURE__ */ le({
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
  setup(s) {
    const e = s, t = e.id ?? Ct(Wt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = Jo(e, Ct("VueFinderOptions") || {});
    return pe(
      () => e.config,
      (a) => {
        if (a) {
          const d = {};
          for (const l in a) {
            const r = i(a[l]);
            r !== void 0 && (d[l] = r);
          }
          n.config.init(d);
        }
      },
      { deep: !0, immediate: !0 }
    ), pe(
      () => e.locale,
      (a) => {
        a && n.i18n.localeAtom && n.i18n.localeAtom.get() !== a && n.i18n.localeAtom.set(a);
      },
      { immediate: !0 }
    ), Oo(t, n), So(Wt, t), wt(() => {
      Lo(t);
    }), (a, d) => (c(), X(vp, Je(Ze(e)), {
      icon: ue((l) => [
        Me(a.$slots, "icon", Je(Ze(l)))
      ]),
      "status-bar": ue((l) => [
        Me(a.$slots, "status-bar", Je(Ze(l)))
      ]),
      _: 3
    }, 16));
  }
});
function Tp(s) {
  const e = ae(s), t = oe(e.fs.path), n = R(() => t.value?.path ?? ""), a = (l) => l || e.fs.path.get().path || "", d = (l) => {
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
      const r = (e.fs.files.get() || []).find((u) => u.path === l);
      !r || r.type !== "file" || e.modal.open(Ye, { storage: r.storage, item: r });
    },
    notify(l, r) {
      ot(e, l, r);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    path: n,
    select(l) {
      const r = new Set((e.fs.files.get() || []).map((v) => v.path)), u = (l || []).filter((v) => r.has(v));
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
    async createFolder(l, r) {
      const u = await e.adapter.createFolder({ path: a(r), name: l });
      d(u);
    },
    async createFile(l, r) {
      const u = await e.adapter.createFile({ path: a(r), name: l });
      d(u);
    },
    async delete(l, r) {
      const u = a(r), v = new Map(
        (e.fs.files.get() || []).map((_) => [_.path, _])
      ), b = (l || []).map((_) => v.get(_)).filter((_) => !!_).map((_) => ({ path: _.path, type: _.type })), h = await e.adapter.delete({ path: u, items: b });
      d(h);
    },
    async rename(l, r, u) {
      const v = await e.adapter.rename({
        path: a(u),
        item: l,
        name: r
      });
      d(v);
    },
    async copy(l, r, u) {
      const v = await e.adapter.copy({
        path: a(u),
        sources: l,
        destination: r
      });
      d(v);
    },
    async move(l, r, u) {
      const v = await e.adapter.move({
        path: a(u),
        sources: l,
        destination: r
      });
      d(v);
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
const Dp = {
  install(s, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", s.provide("VueFinderOptions", e), s.component("VueFinder", fp);
  }
};
export {
  Yo as A,
  Zt as B,
  Ce as C,
  Pp as I,
  qn as R,
  Dp as V,
  fp as _,
  Tp as a,
  Bo as c,
  ho as m,
  kn as p,
  ae as u
};
