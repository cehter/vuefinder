import { inject as Ct, reactive as Pt, watch as pe, ref as D, computed as z, shallowRef as vt, markRaw as wo, defineComponent as de, onMounted as be, nextTick as Oe, openBlock as u, createElementBlock as p, withKeys as Ke, unref as a, createElementVNode as o, withModifiers as _e, normalizeStyle as Ie, normalizeClass as oe, renderSlot as ge, createCommentVNode as H, toDisplayString as y, createBlock as X, resolveDynamicComponent as On, withCtx as ie, createVNode as G, Fragment as fe, renderList as he, withDirectives as me, vModelCheckbox as rt, vModelText as We, onBeforeUnmount as yt, defineAsyncComponent as Ln, Suspense as Rn, vShow as Ge, onUnmounted as Ae, useTemplateRef as st, createStaticVNode as St, createTextVNode as ye, createSlots as yo, Teleport as bt, resolveComponent as Bn, customRef as bo, isRef as zn, vModelSelect as Kt, vModelRadio as zt, mergeProps as qe, toHandlers as et, normalizeProps as Ce, guardReactiveProps as Fe, onUpdated as ko, useModel as Vn, mergeModels as $o, Transition as xo, provide as So } from "vue";
import Co from "mitt";
import { useStore as ne } from "@nanostores/vue";
import { persistentAtom as Un } from "@nanostores/persistent";
import { toast as xt, Toaster as Fo } from "vue-sonner";
import { atom as Be, computed as Ze } from "nanostores";
import { QueryClient as Eo, isCancelledError as Po } from "@tanstack/vue-query";
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
  const e = localStorage.getItem(n + "_storage"), t = Pt(JSON.parse(e ?? "{}"));
  pe(t, s);
  function s() {
    Object.keys(t).length ? localStorage.setItem(n + "_storage", JSON.stringify(t)) : localStorage.removeItem(n + "_storage");
  }
  function i(c, f) {
    t[c] = f;
  }
  function l(c) {
    delete t[c];
  }
  function r() {
    Object.keys(t).forEach((c) => l(c));
  }
  return { getStore: (c, f = null) => c in t ? t[c] : f, setStore: i, removeStore: l, clearStore: r };
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
  const l = Ve({ emitter: t, config: i }), r = "vuefinder_locale", d = "global";
  let c;
  if (Vt.has(d))
    c = Vt.get(d), e && e !== c.get() && c.set(e);
  else {
    const C = localStorage.getItem(r) ? JSON.parse(localStorage.getItem(r)) : null;
    c = Bo(r, e || C || "en"), Vt.set(d, c);
  }
  const f = "vuefinder_translations", h = (C) => {
    try {
      const L = localStorage.getItem(f);
      if (L)
        return JSON.parse(L)[C] || null;
    } catch {
    }
    return null;
  }, _ = (C, L) => {
    try {
      const S = localStorage.getItem(f), R = S ? JSON.parse(S) : {};
      R[C] = L, localStorage.setItem(f, JSON.stringify(R));
    } catch {
    }
  }, v = ne(c), k = String(v.value), b = h(k), x = D(b || {});
  let m = !1;
  !b && Object.keys(s).length > 0 && Ut(k, s).then((C) => {
    x.value = C, _(k, C);
  }).catch(() => {
  }), pe(
    v,
    async (C, L) => {
      if (L && C === L)
        return;
      if (!m) {
        m = !0;
        const R = h(String(C));
        if (R)
          x.value = R;
        else if (Object.keys(s).length > 0)
          try {
            const j = await Ut(String(C), s);
            x.value = j, _(String(C), j);
          } catch {
          }
        return;
      }
      const S = h(String(C));
      if (S)
        x.value = S;
      else
        try {
          const R = await Ut(String(C), s);
          x.value = R, _(String(C), R);
        } catch (R) {
          const j = Te(R, "Locale cannot be loaded!");
          l.error(j);
          return;
        }
      Object.values(s).length > 1 && (l.success("The language is set to " + C), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const w = (C, ...L) => L.length ? w(C = C.replace("%s", String(L.shift())), ...L) : C;
  function g(C, ...L) {
    return x.value && Object.prototype.hasOwnProperty.call(x.value, C) ? w(x.value[C] || C, ...L) : w(C, ...L);
  }
  const E = z({
    get: () => v.value,
    set: (C) => {
      c.set(C);
    }
  });
  return Pt({ t: g, locale: E, localeAtom: c });
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
  const i = parseFloat(s[1] || "0"), l = (s[2] || "").toLowerCase(), r = e[l] ?? 0;
  return Math.round(i * Math.pow(1024, r));
}
function jo(n) {
  const e = vt(null), t = D(!1), s = D(), i = D(!1), l = vt(null);
  return {
    visible: t,
    type: e,
    data: s,
    open: (_, v = null) => {
      n.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = _, s.value = v;
    },
    close: () => {
      n.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null, i.value = !1, l.value = null;
    },
    setEditMode: (_) => {
      i.value = _;
    },
    editMode: i,
    controls: l,
    registerControls: (_) => {
      l.value = _;
    },
    unregisterControls: (_) => {
      l.value === _ && (l.value = null);
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
  Object.keys(Et)
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
    else if (i in Ft) {
      const l = i;
      e[l] = s[i];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function yn(n, e) {
  const t = { ...Ft, ...n, ...e };
  return t.theme = qo(t.theme), t;
}
function bn(n, e) {
  return { ...Et, ...e, ...n };
}
const Wo = (n, e = {}) => {
  const t = `vuefinder_config_${n}`, { persistenceConfig: s, nonPersistenceConfig: i } = wn(e), l = yn(
    s,
    Ft
  ), r = bn(
    i,
    Et
  ), d = Un(
    t,
    l,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = Be(r), f = Ze(
    [d, c],
    (m, w) => ({
      ...m,
      ...w
    })
  ), h = (m = {}) => {
    const w = d.get(), g = c.get(), { persistenceConfig: E, nonPersistenceConfig: C } = wn(m), L = yn(E, w), S = bn(
      C,
      g
    );
    d.set(L), c.set(S);
  }, _ = (m) => Kn(m) ? c.get()[m] : d.get()[m], v = () => ({
    ...d.get(),
    ...c.get()
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
    get: _,
    set: k,
    toggle: (m) => {
      const w = d.get();
      k(m, !w[m]);
    },
    all: v,
    reset: () => {
      d.set({ ...Ft }), c.set({ ...Et });
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
  const n = Be(""), e = Be([]), t = Be(!1), s = Be([]), i = Be({ active: !1, column: "", order: "" }), l = Be({
    kind: "all",
    showHidden: !1
  }), r = Be(/* @__PURE__ */ new Set()), d = Be({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Be(null), f = Be(0), h = Be(!1), _ = Be([]), v = Be(-1), k = Ze([n], (J) => {
    const se = (J ?? "").trim(), ae = se.indexOf("://"), ce = ae >= 0 ? se.slice(0, ae) : "", Me = (ae >= 0 ? se.slice(ae + 3) : se).split("/").filter(Boolean);
    let Ee = "";
    const Ye = Me.map((Le) => (Ee = Ee ? `${Ee}/${Le}` : Le, {
      basename: Le,
      name: Le,
      path: ce ? `${ce}://${Ee}` : Ee,
      type: "dir"
    }));
    return { storage: ce, breadcrumb: Ye, path: se };
  }), b = Ze([s, i, l], (J, se, ae) => {
    let ce = J;
    ae.kind === "files" ? ce = ce.filter((Le) => Le.type === "file") : ae.kind === "folders" && (ce = ce.filter((Le) => Le.type === "dir")), ae.showHidden || (ce = ce.filter((Le) => !Le.basename.startsWith(".")));
    const { active: He, column: Me, order: Ee } = se;
    if (!He || !Me) return ce;
    const Ye = Ee === "asc" ? 1 : -1;
    return ce.slice().sort((Le, Rt) => qn(Le[Me], Rt[Me]) * Ye);
  }), x = Ze([s, r], (J, se) => se.size === 0 ? [] : J.filter((ae) => se.has($e(ae)))), m = (J, se) => {
    const ae = n.get();
    if ((se ?? !0) && ae !== J) {
      const ce = _.get(), He = v.get();
      He < ce.length - 1 && ce.splice(He + 1), ce.length === 0 && ae && ce.push(ae), ce.push(J), _.set([...ce]), v.set(ce.length - 1);
    }
    n.set(J);
  }, w = (J) => {
    s.set(J ?? []);
  }, g = (J) => {
    e.set(J ?? []);
  }, E = (J, se) => {
    i.set({ active: !0, column: J, order: se });
  }, C = (J) => {
    const se = i.get();
    se.active && se.column === J ? i.set({
      active: se.order === "asc",
      column: J,
      order: "desc"
    }) : i.set({
      active: !0,
      column: J,
      order: "asc"
    });
  }, L = () => {
    i.set({ active: !1, column: "", order: "" });
  }, S = (J, se) => {
    l.set({ kind: J, showHidden: se });
  }, R = () => {
    l.set({ kind: "all", showHidden: !1 });
  }, j = (J, se = "multiple") => {
    const ae = new Set(r.get());
    se === "single" && ae.clear(), ae.add(J), r.set(ae);
  }, te = (J, se = "multiple") => {
    const ae = new Set(r.get());
    se === "single" && ae.clear(), J.forEach((ce) => ae.add(ce)), r.set(ae);
  }, Z = (J) => {
    const se = new Set(r.get());
    se.delete(J), r.set(se);
  }, Q = (J) => r.get().has(J), W = (J, se = "multiple") => {
    const ae = new Set(r.get());
    ae.has(J) ? ae.delete(J) : (se === "single" && ae.clear(), ae.add(J)), r.set(ae);
  }, P = (J = "multiple", se) => {
    if (J === "single") {
      const ae = s.get()[0];
      if (ae) {
        const ce = $e(ae);
        r.set(/* @__PURE__ */ new Set([ce])), f.set(1);
      }
    } else {
      if (se?.selectionFilterType || se?.selectionFilterMimeIncludes && se.selectionFilterMimeIncludes.length > 0) {
        const ae = s.get().filter((ce) => {
          const He = se.selectionFilterType, Me = se.selectionFilterMimeIncludes;
          return He === "files" && ce.type === "dir" || He === "dirs" && ce.type === "file" ? !1 : Me && Array.isArray(Me) && Me.length > 0 && ce.type !== "dir" ? ce.mime_type ? Me.some((Ee) => ce.mime_type?.startsWith(Ee)) : !1 : !0;
        }).map((ce) => $e(ce));
        r.set(new Set(ae));
      } else {
        const ae = new Set(s.get().map((ce) => $e(ce)));
        r.set(ae);
      }
      Y(r.get().size);
    }
  }, T = () => {
    r.set(/* @__PURE__ */ new Set()), f.set(0);
  }, U = (J) => {
    const se = new Set(J ?? []), ae = new Set(
      s.get().filter((ce) => se.has(ce.path)).map((ce) => $e(ce))
    );
    r.set(ae), f.set(ae.size);
  }, Y = (J) => {
    f.set(J);
  }, ue = (J) => {
    h.set(!!J);
  }, V = () => h.get(), O = (J, se) => {
    const ae = s.get().filter((ce) => se.has($e(ce)));
    d.set({
      type: J,
      path: k.get().path,
      items: new Set(ae)
    });
  }, K = (J) => Ze([d], (se) => se.type === "cut" && Array.from(se.items).some((ae) => $e(ae) === J)), $ = (J) => Ze([d], (se) => se.type === "copy" && Array.from(se.items).some((ae) => $e(ae) === J)), N = (J) => {
    const se = K(J);
    return ne(se).value ?? !1;
  }, M = (J) => {
    const se = $(J);
    return ne(se).value ?? !1;
  }, I = () => {
    d.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, B = () => d.get(), F = (J) => {
    c.set(J);
  }, A = () => c.get(), re = () => {
    c.set(null);
  }, ke = () => {
    const J = _.get(), se = v.get();
    if (se > 0) {
      const ae = se - 1, ce = J[ae];
      ce && (v.set(ae), m(ce, !1));
    }
  }, q = () => {
    const J = _.get(), se = v.get();
    if (se < J.length - 1) {
      const ae = se + 1, ce = J[ae];
      ce && (v.set(ae), m(ce, !1));
    }
  }, ee = Ze([v], (J) => J > 0), ve = Ze(
    [_, v],
    (J, se) => se < J.length - 1
  );
  return {
    // Atoms (state)
    files: s,
    storages: e,
    currentPath: n,
    sort: i,
    filter: l,
    selectedKeys: r,
    selectedCount: f,
    loading: h,
    draggedItem: c,
    clipboardItems: d,
    // Computed values
    path: k,
    sortedFiles: b,
    selectedItems: x,
    // Actions
    setPath: m,
    setFiles: w,
    setStorages: g,
    setSort: E,
    toggleSort: C,
    clearSort: L,
    setFilter: S,
    clearFilter: R,
    select: j,
    selectMultiple: te,
    deselect: Z,
    toggleSelect: W,
    selectAll: P,
    isSelected: Q,
    clearSelection: T,
    setSelection: U,
    setSelectedCount: Y,
    setLoading: ue,
    isLoading: V,
    setClipboard: O,
    createIsCut: K,
    createIsCopied: $,
    isCut: N,
    isCopied: M,
    clearClipboard: I,
    getClipboard: B,
    setDraggedItem: F,
    getDraggedItem: A,
    clearDraggedItem: re,
    setReadOnly: (J) => {
      t.set(J);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (J) => t.get() ? !0 : J.read_only ?? !1,
    // Navigation
    goBack: ke,
    goForward: q,
    canGoBack: ee,
    canGoForward: ve,
    navigationHistory: _,
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
    const { storage: s, path: i } = this.split(e || ""), l = s || t;
    return this.combine(i ?? "", l);
  }
  parent(e) {
    const { storage: t, path: s } = this.split(e), i = t || this.defaultStorage;
    if (!s) return this.combine("", i);
    const l = s.replace(/\/+$/g, "").replace(/^\/+/, ""), r = l.lastIndexOf("/");
    return r <= 0 ? this.combine("", i) : this.combine(l.slice(0, r), i);
  }
  join(e, t) {
    const { storage: s, path: i } = this.split(e), l = s || this.defaultStorage, r = (i ?? "").replace(/\/$/, ""), d = r ? `${r}/${t}` : t;
    return this.combine(d, l);
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
    const i = t.lastIndexOf("."), l = i > 0 ? t.slice(0, i) : t, r = i > 0 ? t.slice(i) : "";
    let d = 1;
    for (; ; ) {
      const c = `${l} copy ${d}${r}`, f = this.join(e, c);
      if (!s.has(f)) return c;
      d++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const s = [...new Set(e)].map((l) => this.normalizePath(l, t)).filter((l) => this.findByPath(l)).sort((l, r) => l.length - r.length), i = [];
    for (const l of s)
      i.some((r) => this.isInTree(l, r)) || i.push(l);
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
    const l = this.join(e, t), { storage: r } = this.split(l);
    return {
      storage: r || this.defaultStorage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: l,
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
    for (const r of e.items) {
      const d = this.normalizePath(r.path, s || this.defaultStorage), c = this.findByPath(d);
      c && (c.type === "dir" ? i.push(...this.removeTree(c.path)) : (this.removeExact(c.path), this.contentStore.delete(c.path), i.push(c)));
    }
    return { ...this.resultForDir(t), deleted: i };
  }
  async rename(e) {
    this.ensureWritable(), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), { storage: s } = this.split(t), i = this.normalizePath(
      e.item || e.path,
      s || this.defaultStorage
    ), l = this.findByPath(i);
    if (!l) throw new Error("Item not found");
    const r = l.dir, d = this.join(r, e.name);
    if (d !== l.path && this.findByPath(d))
      throw new Error("Target already exists");
    if (l.type === "dir") {
      const f = l.path, h = d, _ = this.files.map((v) => {
        if (v.storage !== l.storage || !this.isInTree(v.path, f)) return v;
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
      this.replaceAll(_);
    } else {
      const f = this.cloneEntry(l, {
        path: d,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(f), this.removeExact(l.path);
      const h = this.contentStore.get(l.path);
      h !== void 0 && (this.contentStore.delete(l.path), this.contentStore.set(f.path, h));
    }
    const c = e.path ? this.normalizePath(e.path, l.storage || this.defaultStorage) : r;
    return this.resultForDir(c || r);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: s } = this.split(t), i = this.topLevelSources(e.sources, s || this.defaultStorage), l = new Set(this.files.map((d) => d.path)), r = [];
    for (const d of i) {
      const c = this.findByPath(d);
      if (!c) continue;
      if (c.type === "file") {
        const v = this.uniqueName(t, c.basename, l), k = this.makeFileEntry(
          t,
          v,
          c.file_size || 0,
          c.mime_type
        );
        r.push(k), l.add(k.path);
        const b = this.contentStore.get(c.path);
        b !== void 0 && this.contentStore.set(k.path, b);
        continue;
      }
      const f = this.getTree(c.path), h = this.uniqueName(t, c.basename, l), _ = /* @__PURE__ */ new Map();
      _.set(c.path, this.join(t, h));
      for (const v of f) {
        const k = v.path === c.path ? _.get(c.path) : this.join(_.get(v.dir), v.basename);
        _.set(v.path, k);
        const b = v.path === c.path ? t : _.get(v.dir), x = v.path === c.path ? h : v.basename, m = this.cloneEntry(v, {
          path: k,
          dir: b,
          basename: x,
          extension: v.type === "file" ? this.getExtension(x) : "",
          last_modified: Date.now()
        });
        if (r.push(m), l.add(m.path), v.type === "file") {
          const w = this.contentStore.get(v.path);
          w !== void 0 && this.contentStore.set(m.path, w);
        }
      }
    }
    return this.replaceAll(this.files.concat(r)), this.resultForDir(t);
  }
  async move(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: s } = this.split(t), i = this.topLevelSources(e.sources, s || this.defaultStorage);
    let l = this.files.slice();
    for (const r of i) {
      const d = l.find((b) => b.path === r);
      if (!d) continue;
      if (d.type === "dir" && this.isInTree(t, d.path))
        throw new Error("Cannot move directory into itself");
      if (d.dir === t)
        continue;
      const c = this.getTree(d.path, l), f = new Set(c.map((b) => b.path)), h = new Set(l.filter((b) => !f.has(b.path)).map((b) => b.path)), _ = this.uniqueName(t, d.basename, h), v = /* @__PURE__ */ new Map();
      v.set(d.path, this.join(t, _));
      const k = /* @__PURE__ */ new Map();
      for (const b of c) {
        const x = b.path === d.path ? v.get(d.path) : this.join(v.get(b.dir), b.basename);
        v.set(b.path, x);
        const m = b.path === d.path ? t : v.get(b.dir), w = b.path === d.path ? _ : b.basename;
        k.set(
          b.path,
          this.cloneEntry(b, {
            path: x,
            dir: m,
            basename: w,
            extension: b.type === "file" ? this.getExtension(w) : "",
            last_modified: Date.now()
          })
        );
      }
      l = l.map((b) => k.get(b.path) || b);
      for (const [b, x] of v.entries()) {
        if (b === x) continue;
        const m = this.contentStore.get(b);
        m !== void 0 && (this.contentStore.delete(b), this.contentStore.set(x, m));
      }
    }
    return this.replaceAll(l), this.resultForDir(t);
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
    const l = i.basename.replace(/\.zip$/i, ""), r = this.makeDirEntry(s, l);
    return this.upsert(r), this.resultForDir(s);
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
    let l = "";
    for (let r = 0; r < i.length; r++) l += String.fromCharCode(i[r]);
    return {
      content: btoa(l),
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
      const l = this.join(s, i);
      this.findByPath(l) || this.upsert(this.makeDirEntry(s, i)), s = l;
    }
    return s;
  }
  configureUploader(e, t) {
    e && e.addUploader(async (s) => {
      const i = s.map((l) => e.getFile(l)).filter(Boolean);
      if (i.length) {
        e.emit("upload-start", i);
        for (const l of i)
          try {
            this.ensureWritable();
            const r = this.normalizePath(t.getTargetPath()), d = l?.name || "file", c = l?.type || null, f = l?.data, h = l?.size || 0, _ = d.split("/").filter(Boolean), v = _.pop() || d, k = _.length ? this.ensureDirPath(r, _) : r, b = this.makeFileEntry(k, v, h, c);
            if (this.upsert(b), f)
              try {
                const x = await f.arrayBuffer();
                this.contentStore.set(b.path, x);
              } catch {
                this.contentStore.set(b.path, "");
              }
            else
              this.contentStore.set(b.path, "");
            e.emit("upload-success", l, { status: 200, body: {} });
          } catch (r) {
            e.emit("upload-error", l, r instanceof Error ? r : new Error("Upload failed"));
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
      const l = i.errors.map((r) => r.message).filter((r) => !!r);
      if (l.length > 0)
        return l.join(", ");
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
      e.getFiles().forEach((r) => {
        e.setFileMeta(r.id, { path: i });
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
      const r = await i.text(), d = kn(r, i.status, i.statusText);
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
      const r = await i.text(), d = kn(r, i.status, i.statusText);
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
class Mp extends Zt {
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
        const l = i.target.result;
        if (!l.objectStoreNames.contains("files")) {
          const r = l.createObjectStore("files", { keyPath: "path" });
          r.createIndex("storage", "storage", { unique: !1 }), r.createIndex("dir", "dir", { unique: !1 });
        }
        l.objectStoreNames.contains("content") || l.createObjectStore("content", { keyPath: "path" });
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
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), s = t.objectStore("files"), i = t.objectStore("content"), [l, r] = await Promise.all([
      this.requestToPromise(s.getAll()),
      this.requestToPromise(i.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...l.filter((d) => this.isManagedStorage(d.storage))), this.contentStore.clear();
    for (const d of r)
      this.isManagedPath(d?.path) && this.contentStore.set(d.path, d.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), s = t.objectStore("files"), i = t.objectStore("content"), l = this.requestToPromise(
      s.getAll()
    ), r = this.requestToPromise(
      i.getAll()
    ), [d, c] = await Promise.all([
      l,
      r
    ]);
    s.clear(), i.clear();
    for (const f of d)
      this.isManagedStorage(f.storage) || s.put(f);
    for (const f of c)
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
  const e = ne(n.state);
  return {
    current: z(() => e.value.theme || "silver"),
    set: (i) => {
      n.set("theme", i);
    }
  };
}
const Jo = (n, e) => {
  const t = Ro(n.id ?? "vf"), s = Co(), i = e.i18n, l = n.locale ?? e.locale, r = Wo(n.id ?? "vf", n.config ?? {}), d = Go();
  if (!n.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new Xo(n.driver);
  return Pt({
    // app version
    version: No,
    // config store
    config: r,
    // Theme
    theme: (() => {
      const f = Qo(r);
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
      l,
      s,
      i,
      r
    ),
    // modal state
    modal: jo(r),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: wo(c),
    // active features
    features: Hn(n.features),
    // selection mode
    selectionMode: n.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: z(() => n.selectionFilterType || "both"),
    selectionFilterMimeIncludes: z(() => n.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: r.get("metricUnits") ? jn : Jt,
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
}, ss = { class: "vuefinder__modal-drag-message" }, Ue = /* @__PURE__ */ de({
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
    const e = D(null), t = le();
    t.config;
    const s = n, i = () => {
      s.onRequestClose ? s.onRequestClose() : t.modal.close();
    };
    be(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), Oe(() => {
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
    const l = (r) => {
      r.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (r.preventDefault(), r.stopPropagation());
    };
    return (r, d) => (u(), p("div", {
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
          onContextmenu: l,
          onMousedown: d[4] || (d[4] = _e((c) => i(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: oe(["vuefinder__modal-layout__body", s.bodyClass]),
            style: Ie(s.bodyStyle),
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
              ge(r.$slots, "default")
            ]),
            r.$slots.buttons ? (u(), p("div", ns, [
              ge(r.$slots, "buttons")
            ])) : H("", !0)
          ], 38)
        ], 32)
      ]),
      s.showDragOverlay ? (u(), p("div", os, [
        o("div", ss, y(s.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : H("", !0)
    ], 40, Zo));
  }
}), as = { class: "vuefinder__modal-header" }, is = { class: "vuefinder__modal-header__icon-container" }, rs = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, je = /* @__PURE__ */ de({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(n) {
    return (e, t) => (u(), p("div", as, [
      o("div", is, [
        (u(), X(On(n.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", rs, y(n.title), 1)
    ]));
  }
}), ls = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function ds(n, e) {
  return u(), p("svg", ls, [...e[0] || (e[0] = [
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
}, hs = { class: "vuefinder__about-modal__meta" }, gs = { class: "vuefinder__about-modal__meta-item" }, ws = { class: "vuefinder__about-modal__meta-label" }, ys = { class: "vuefinder__about-modal__meta-value" }, bs = { class: "vuefinder__about-modal__meta-item" }, ks = { class: "vuefinder__about-modal__meta-label" }, Gn = /* @__PURE__ */ de({
  __name: "ModalAbout",
  setup(n) {
    const e = le(), { t } = e.i18n;
    return (s, i) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (l) => a(e).modal.close())
        }, y(a(t)("Close")), 1)
      ]),
      default: ie(() => [
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
  return u(), p("svg", $s, [...e[0] || (e[0] = [
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
}, Ds = { class: "vuefinder__delete-modal__file-name" }, Ms = { class: "vuefinder__delete-modal__confirmation" }, Is = { class: "vuefinder__delete-modal__confirmation-label" }, As = { class: "vuefinder__delete-modal__confirmation-text" }, Os = ["disabled"], Tt = /* @__PURE__ */ de({
  __name: "ModalDelete",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, l = ne(i.path), r = D(e.modal.data.items), d = D(!1), c = () => {
      r.value.length && d.value && e.adapter.delete({
        path: l.value.path,
        items: r.value.map(({ path: f, type: h }) => ({
          path: f,
          type: h
        }))
      }).then((f) => {
        t.success(s("Files deleted.")), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        t.error(Te(f, s("Failed to delete files")));
      });
    };
    return (f, h) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("div", Ms, [
          o("label", Is, [
            me(o("input", {
              "onUpdate:modelValue": h[0] || (h[0] = (_) => d.value = _),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [rt, d.value]
            ]),
            o("span", As, y(a(s)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !d.value,
          onClick: c
        }, y(a(s)("Yes, Delete!")), 9, Os),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[1] || (h[1] = (_) => a(e).modal.close())
        }, y(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(Yn),
            title: a(s)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", Ss, [
            o("div", Cs, [
              o("p", Fs, y(a(s)("Are you sure you want to delete these files?")), 1),
              o("div", Es, [
                (u(!0), p(fe, null, he(r.value, (_) => (u(), p("p", {
                  key: _.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  _.type === "dir" ? (u(), p("svg", Ps, [...h[2] || (h[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), p("svg", Ts, [...h[3] || (h[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Ds, y(_.basename), 1)
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
  return u(), p("svg", Ls, [...e[0] || (e[0] = [
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
}, Hs = { class: "vuefinder__rename-modal__item-name" }, Dt = /* @__PURE__ */ de({
  __name: "ModalRename",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, l = ne(i.path), r = D(e.modal.data.items[0]), d = D(r.value.basename), c = () => {
      d.value != r.value.basename && e.adapter.rename({
        path: l.value.path,
        item: r.value.path,
        name: d.value
      }).then((f) => {
        t.success(s("%s is renamed.", d.value)), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        t.error(Te(f, s("Failed to rename")));
      });
    };
    return (f, h) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, y(a(s)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: h[1] || (h[1] = (_) => a(e).modal.close())
        }, y(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(Xn),
            title: a(s)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", Bs, [
            o("div", zs, [
              o("p", Vs, [
                r.value.type === "dir" ? (u(), p("svg", Us, [...h[2] || (h[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), p("svg", Ns, [...h[3] || (h[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Hs, y(r.value.basename), 1)
              ]),
              me(o("input", {
                "onUpdate:modelValue": h[0] || (h[0] = (_) => d.value = _),
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
  const n = le(), e = z(() => n.features);
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
  return u(), p("svg", Ks, [...e[0] || (e[0] = [
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
}, aa = ["href", "download"], ia = { class: "vuefinder__preview-chrome__popover-hint" }, ra = ["title", "aria-label"], la = /* @__PURE__ */ de({
  name: "PreviewChrome",
  __name: "PreviewChrome",
  emits: ["close-request"],
  setup(n, { emit: e }) {
    const t = e, s = le(), { enabled: i } = Ne(), { t: l } = s.i18n, r = ne(s.fs.sortedFiles), d = z(() => r.value.filter((g) => g.type === "file")), c = z(
      () => d.value.findIndex((g) => g.path === s.modal.data.item.path)
    ), f = z(() => d.value.length), h = z(() => s.modal.controls ?? null), _ = z(() => !!a(h.value?.isEditing));
    z(() => !!a(h.value?.isDirty));
    const v = D(!1), k = D(!1), b = (g) => {
      g === "info" ? (v.value = !v.value, k.value = !1) : (k.value = !k.value, v.value = !1);
    }, x = (g) => {
      g.target.closest(".vuefinder__preview-chrome__popover-host") || (v.value = !1, k.value = !1);
    };
    be(() => document.addEventListener("mousedown", x)), yt(() => document.removeEventListener("mousedown", x));
    const m = z(() => {
      const g = s.modal.data.item, E = [
        { label: l("File Size"), value: s.filesize(g.file_size ?? 0) },
        { label: l("Last Modified"), value: js(g.last_modified ?? 0) }
      ];
      g.mime_type && E.push({ label: l("Type"), value: g.mime_type });
      const C = a(h.value?.extraInfo);
      if (Array.isArray(C))
        for (const L of C) E.push(L);
      return E.push({ label: l("Path"), value: g.path }), E;
    }), w = z(() => s.adapter.getDownloadUrl(s.modal.data.item));
    return (g, E) => (u(), p("div", Ws, [
      o("div", Gs, [
        o("button", {
          type: "button",
          class: oe(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": v.value }]),
          title: a(l)("File info"),
          "aria-label": a(l)("File info"),
          onClick: E[0] || (E[0] = (C) => b("info"))
        }, [
          G(a(en), { class: "vuefinder__preview-chrome__icon" })
        ], 10, Ys),
        v.value ? (u(), p("div", Xs, [
          (u(!0), p(fe, null, he(m.value, (C) => (u(), p("div", {
            key: C.label,
            class: "vuefinder__preview-chrome__popover-row"
          }, [
            o("span", Qs, y(C.label), 1),
            o("span", Js, y(C.value), 1)
          ]))), 128))
        ])) : H("", !0)
      ]),
      o("div", {
        id: "modal-title",
        class: "vuefinder__preview-chrome__title",
        title: a(s).modal.data.item.path
      }, y(a(s).modal.data.item.basename), 9, Zs),
      o("div", ea, [
        f.value > 1 && !_.value ? (u(), p("span", {
          key: 0,
          class: "vuefinder__preview-chrome__counter",
          "aria-label": a(l)("File %s of %s", String(c.value + 1), String(f.value))
        }, y(c.value + 1) + " / " + y(f.value), 9, ta)) : H("", !0),
        a(i)("download") && !_.value ? (u(), p("div", na, [
          o("button", {
            type: "button",
            class: oe(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": k.value }]),
            title: a(l)("Download"),
            "aria-label": a(l)("Download"),
            onClick: E[1] || (E[1] = (C) => b("download"))
          }, [...E[3] || (E[3] = [
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
          k.value ? (u(), p("div", sa, [
            o("a", {
              href: w.value,
              download: w.value,
              target: "_blank",
              class: "vuefinder__preview-chrome__popover-action"
            }, [
              E[4] || (E[4] = o("svg", {
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
              o("span", null, y(a(l)("Download")), 1)
            ], 8, aa),
            o("p", ia, y(a(l)(
              `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
            )), 1)
          ])) : H("", !0)
        ])) : H("", !0),
        o("button", {
          type: "button",
          class: "vuefinder__preview-chrome__btn vuefinder__preview-chrome__btn--icon vuefinder__preview-chrome__btn--close",
          title: a(l)("Close"),
          "aria-label": a(l)("Close"),
          onClick: E[2] || (E[2] = (C) => t("close-request"))
        }, [
          G(a(Qn), { class: "vuefinder__preview-chrome__icon vuefinder__preview-chrome__icon--lg" })
        ], 8, ra)
      ])
    ]));
  }
});
function tn(n) {
  const e = le();
  be(() => {
    if (typeof e.modal.registerControls != "function") {
      console.warn(
        "[vuefinder] PreviewControls registration skipped: app.modal.registerControls is missing. Hard refresh the page to pick up the latest modal API."
      );
      return;
    }
    e.modal.registerControls(n);
  }), yt(() => {
    typeof e.modal.unregisterControls == "function" && e.modal.unregisterControls(n);
  });
}
const da = { class: "vuefinder__text-preview" }, ca = { class: "vuefinder__text-preview__body" }, ua = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, va = /* @__PURE__ */ de({
  __name: "Text",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-CkLyKauQ.js").then((g) => g.C),
      delay: 100
    }), s = e, i = D(""), l = D(""), r = D(!1), d = D(!1), c = le(), f = Ve(c), { enabled: h } = Ne(), { t: _ } = c.i18n;
    be(async () => {
      try {
        const g = await c.adapter.getContent({ path: c.modal.data.item.path });
        i.value = g.content, l.value = g.content, s("success");
      } catch (g) {
        Te(g, "Failed to load text content"), s("success");
      }
    });
    const v = z(
      () => h("edit") && !c.fs.isReadOnly(c.modal.data.item)
    ), k = z(() => r.value), b = z(() => r.value && l.value !== i.value), x = () => {
      l.value = i.value, r.value = !0, c.modal.setEditMode(!0);
    }, m = () => {
      r.value = !1, l.value = i.value, c.modal.setEditMode(!1);
    }, w = async () => {
      try {
        await c.adapter.save({
          path: c.modal.data.item.path,
          content: l.value
        }), i.value = l.value, f.success(_("Updated.")), r.value = !1, c.modal.setEditMode(!1), s("success");
      } catch (g) {
        f.error(Te(g, _("Failed to save file")));
      }
    };
    return tn({
      isEditable: v,
      isEditing: k,
      isDirty: b,
      primaryActionLabel: z(() => _("Save")),
      enterEdit: x,
      commitEdit: w,
      cancelEdit: m
    }), (g, E) => (u(), p("div", da, [
      o("div", ca, [
        (u(), X(Rn, {
          onResolve: E[2] || (E[2] = (C) => d.value = !0)
        }, {
          fallback: ie(() => [
            r.value ? me((u(), p("textarea", {
              key: 1,
              "onUpdate:modelValue": E[1] || (E[1] = (C) => l.value = C),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [We, l.value]
            ]) : (u(), p("pre", ua, y(i.value), 1))
          ]),
          default: ie(() => [
            G(a(t), {
              "model-value": r.value ? l.value : i.value,
              readonly: !r.value,
              filename: a(c).modal.data.item.basename,
              "onUpdate:modelValue": E[0] || (E[0] = (C) => r.value ? l.value = C : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        me(o("span", null, y(d.value), 513), [
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
}, Ht = 1e3, Sa = /* @__PURE__ */ de({
  name: "CsvPreview",
  __name: "Csv",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = Ln({
      loader: () => import("./CodeMirrorEditor-CkLyKauQ.js").then((te) => te.C),
      delay: 100
    }), s = e, i = D(""), l = D(""), r = vt([]), d = vt([]), c = D(null), f = D(!1), h = D(!1), _ = z(() => r.value.length > Ht), v = z(() => _.value ? r.value.slice(0, Ht) : r.value), k = le(), b = Ve(k), { enabled: x } = Ne(), { t: m } = k.i18n;
    async function w(te) {
      try {
        const { parse: Z } = await import("./papaparse.min-Brc8PWCw.js").then((T) => T.p), Q = Z(te, {
          skipEmptyLines: !0,
          delimiter: ""
        });
        if (!Q.data.length) {
          d.value = [], r.value = [];
          return;
        }
        const [W, ...P] = Q.data;
        d.value = W ?? [], r.value = P, c.value = null;
      } catch (Z) {
        c.value = Te(Z, m("Failed to parse CSV")), d.value = [], r.value = [];
      }
    }
    be(async () => {
      try {
        const te = await k.adapter.getContent({ path: k.modal.data.item.path });
        i.value = te.content, l.value = te.content, await w(te.content), s("success");
      } catch (te) {
        Te(te, "Failed to load CSV content"), s("success");
      }
    });
    const g = z(() => !f.value && h.value), E = z(
      () => x("edit") && !k.fs.isReadOnly(k.modal.data.item)
    ), C = z(() => f.value), L = z(() => f.value && l.value !== i.value), S = () => {
      l.value = i.value, f.value = !0, h.value = !1, k.modal.setEditMode(!0);
    }, R = () => {
      f.value = !1, l.value = i.value, k.modal.setEditMode(!1);
    }, j = async () => {
      try {
        await k.adapter.save({ path: k.modal.data.item.path, content: l.value }), i.value = l.value, await w(i.value), b.success(m("Updated.")), f.value = !1, k.modal.setEditMode(!1), s("success");
      } catch (te) {
        b.error(Te(te, m("Failed to save file")));
      }
    };
    return tn({
      isEditable: E,
      isEditing: C,
      isDirty: L,
      primaryActionLabel: z(() => m("Save")),
      enterEdit: S,
      commitEdit: j,
      cancelEdit: R
    }), (te, Z) => (u(), p("div", fa, [
      o("div", _a, [
        g.value ? (u(), p(fe, { key: 1 }, [
          c.value ? (u(), p("div", ma, y(c.value), 1)) : !r.value.length && !d.value.length ? (u(), p("div", ha, y(a(m)("No rows to display")), 1)) : (u(), p("div", ga, [
            o("table", wa, [
              o("thead", null, [
                o("tr", null, [
                  Z[3] || (Z[3] = o("th", { class: "vuefinder__csv-preview__row-num" }, null, -1)),
                  (u(!0), p(fe, null, he(d.value, (Q, W) => (u(), p("th", {
                    key: W,
                    title: Q
                  }, y(Q), 9, ya))), 128))
                ])
              ]),
              o("tbody", null, [
                (u(!0), p(fe, null, he(v.value, (Q, W) => (u(), p("tr", { key: W }, [
                  o("td", ba, y(W + 1), 1),
                  (u(!0), p(fe, null, he(Q, (P, T) => (u(), p("td", {
                    key: T,
                    title: P
                  }, y(P), 9, ka))), 128))
                ]))), 128))
              ])
            ]),
            _.value ? (u(), p("div", $a, y(a(m)("Showing first %s rows out of %s", Ht, r.value.length)), 1)) : H("", !0)
          ]))
        ], 64)) : (u(), X(Rn, { key: 0 }, {
          fallback: ie(() => [
            f.value ? me((u(), p("textarea", {
              key: 1,
              "onUpdate:modelValue": Z[1] || (Z[1] = (Q) => l.value = Q),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [We, l.value]
            ]) : (u(), p("pre", pa, y(i.value), 1))
          ]),
          default: ie(() => [
            G(a(t), {
              "model-value": f.value ? l.value : i.value,
              readonly: !f.value,
              filename: a(k).modal.data.item.basename,
              "onUpdate:modelValue": Z[0] || (Z[0] = (Q) => f.value ? l.value = Q : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        f.value ? H("", !0) : (u(), p("label", xa, [
          me(o("input", {
            "onUpdate:modelValue": Z[2] || (Z[2] = (Q) => h.value = Q),
            type: "checkbox"
          }, null, 512), [
            [rt, h.value]
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
  const e = le(), { t } = e.i18n, s = e.fs, i = ne(s.path), l = e.config, r = D({ QUEUE_ENTRY_STATUS: Se }), d = D(null), c = D(null), f = D(null), h = D(null), _ = D(null), v = D([]), k = D(""), b = D(!1), x = D(!1), m = D(null);
  let w;
  const g = ($) => {
    $.preventDefault(), $.stopPropagation(), x.value = !0;
  }, E = ($) => {
    $.preventDefault(), $.stopPropagation(), x.value = !0;
  }, C = ($) => {
    $.preventDefault(), $.stopPropagation(), (!$.relatedTarget || $.relatedTarget === document.body) && (x.value = !1);
  }, L = ($) => {
    $.preventDefault(), $.stopPropagation(), x.value = !1;
    const N = /^[/\\](.+)/, M = $.dataTransfer;
    M && (M.items && M.items.length ? Array.from(M.items).forEach((I) => {
      if (I.kind === "file") {
        const B = I.webkitGetAsEntry?.();
        if (B)
          nn((F, A) => {
            const re = N.exec(F?.fullPath || "");
            j(A, re ? re[1] : A.name);
          }, B);
        else {
          const F = I.getAsFile?.();
          F && j(F);
        }
      }
    }) : M.files && M.files.length && Array.from(M.files).forEach((I) => j(I)));
  }, S = ($) => v.value.findIndex((N) => N.id === $), R = ($, N) => w.addFile({ name: N || $.name, type: $.type, data: $, source: "Local" }), j = ($, N) => {
    try {
      return R($, N);
    } catch {
      return;
    }
  }, te = ($) => $.status === Se.ERROR || $.status === Se.CANCELED || $.status === Se.REJECTED, Z = ($) => $.status === Se.DONE ? "text-green-600" : te($) ? "text-red-600" : "", Q = ($) => $.status === Se.DONE ? "✓" : te($) ? "!" : "...", W = () => h.value?.click(), P = () => e.modal.close(), T = ($) => {
    if (b.value || !v.value.filter((N) => N.status !== Se.DONE).length) {
      b.value || (k.value = t("Please select file to upload first."));
      return;
    }
    k.value = "", m.value = $ || i.value, w.upload();
  }, U = () => {
    w.cancelAll(), v.value.forEach(($) => {
      $.status !== Se.DONE && ($.status = Se.CANCELED, $.statusName = t("Canceled"));
    }), b.value = !1;
  }, Y = ($) => {
    b.value || (w.removeFile($.id), v.value.splice(S($.id), 1));
  }, ue = ($) => {
    if (!b.value)
      if (w.cancelAll(), $) {
        const N = v.value.filter((M) => M.status !== Se.DONE);
        v.value = [], N.forEach((M) => j(M.originalFile, M.name));
      } else
        v.value = [];
  }, V = ($) => {
    $.forEach((N) => {
      N instanceof File ? j(N) : j(N.file, N.name);
    });
  }, O = ($, N) => $.endsWith("://") || $.endsWith("/") ? $ + N : $ + "/" + N, K = async ($, N) => {
    const M = N.trim();
    if (b.value || !M) return;
    if (M.includes("/") || M.includes("\\")) {
      k.value = t("Name cannot contain slashes.");
      return;
    }
    const I = $.name.split("/");
    I[I.length - 1] = M;
    const B = I.join("/");
    if (B === $.name) return;
    if ($.status === Se.DONE) {
      const ee = m.value?.path || i.value.path, ve = O(ee, $.name), we = $.name.split("/");
      we.pop();
      const De = we.length ? O(ee, we.join("/")) : ee;
      try {
        await e.adapter.rename({ path: De, item: ve, name: M }), $.name = B, e.adapter.invalidateListQuery(ee), ee === i.value.path && e.adapter.open(ee);
      } catch (Je) {
        k.value = Je?.message || t("Failed to rename");
      }
      return;
    }
    const F = S($.id);
    if (F === -1) return;
    const A = $.originalFile, re = $.name;
    w.removeFile($.id), v.value.splice(F, 1);
    let ke;
    try {
      ke = R(A, B);
    } catch (ee) {
      k.value = ee?.message || t("Failed to rename");
      try {
        R(A, re);
      } catch {
      }
      return;
    }
    if (!ke) return;
    const q = S(ke);
    if (q !== -1 && q !== F) {
      const ee = v.value.splice(q, 1)[0];
      ee && v.value.splice(F, 0, ee);
    }
  };
  return be(() => {
    w = new To({
      debug: e.debug,
      restrictions: { maxFileSize: Ho(l.get("maxFileSize") ?? "10mb") },
      locale: e.i18n.t("uppy"),
      onBeforeFileAdded: (I, B) => {
        if (B[I.id] != null) {
          const A = S(I.id);
          v.value[A]?.status === Se.PENDING && (k.value = w.i18n("noDuplicates", { fileName: I.name })), v.value = v.value.filter((re) => re.id !== I.id);
        }
        return v.value.push({
          id: I.id,
          name: I.name,
          size: e.filesize(I.size),
          status: Se.PENDING,
          statusName: t("Pending upload"),
          percent: null,
          originalFile: I.data
        }), !0;
      }
    });
    const $ = {
      getTargetPath: () => (m.value || i.value).path
    };
    if (n)
      n(w, $);
    else if (e.adapter.getDriver().configureUploader)
      e.adapter.getDriver().configureUploader(w, $);
    else
      throw new Error("No uploader configured");
    w.on("restriction-failed", (I, B) => {
      const F = v.value[S(I.id)];
      F && (F.status = Se.REJECTED, F.statusName = B.message);
    }), w.on("upload-start", (I) => {
      I.forEach((B) => {
        const F = v.value[S(B.id)];
        F && (F.status = Se.UPLOADING, F.statusName = t("Uploading"), F.percent = "0%");
      });
    }), w.on("upload-progress", (I, B) => {
      const F = B.bytesTotal ?? 1, A = Math.floor(B.bytesUploaded / F * 100), re = S(I.id);
      re !== -1 && v.value[re] && (v.value[re].percent = `${A}%`);
    }), w.on("upload-success", (I) => {
      const B = v.value[S(I.id)];
      B && (B.status = Se.DONE, B.statusName = t("Done"));
    }), w.on("upload-error", (I, B) => {
      const F = v.value[S(I.id)];
      F && (F.percent = null, F.status = Se.ERROR, F.statusName = B?.isNetworkError ? t("Network Error, Unable establish connection to the server or interrupted.") : B?.message || t("Unknown Error"));
    }), w.on("error", (I) => {
      k.value = I.message, b.value = !1;
    }), w.on("complete", (I) => {
      b.value = !1;
      const B = m.value || i.value;
      e.adapter.invalidateListQuery(B.path), e.adapter.open(B.path);
      const F = v.value.filter(
        (A) => A.status === Se.DONE && I.successful.includes(A.id)
      ).map((A) => A.name);
      e.emitter.emit("vf-upload-complete", F);
    }), h.value?.addEventListener("click", () => c.value?.click()), _.value?.addEventListener("click", () => f.value?.click());
    const N = { capture: !0 };
    document.addEventListener("dragover", g, N), document.addEventListener("dragenter", E, N), document.addEventListener("dragleave", C, N), document.addEventListener("drop", L, N);
    const M = (I) => {
      const B = I.target, F = B.files;
      if (F) {
        for (const A of F) j(A, A.webkitRelativePath || void 0);
        B.value = "";
      }
    };
    c.value?.addEventListener("change", M), f.value?.addEventListener("change", M);
  }), Ae(() => {
    const $ = { capture: !0 };
    document.removeEventListener("dragover", g, $), document.removeEventListener("dragenter", E, $), document.removeEventListener("dragleave", C, $), document.removeEventListener("drop", L, $);
  }), {
    container: d,
    internalFileInput: c,
    internalFolderInput: f,
    pickFiles: h,
    pickFolders: _,
    queue: v,
    message: k,
    uploading: b,
    hasFilesInDropArea: x,
    definitions: r,
    openFileSelector: W,
    upload: T,
    cancel: U,
    remove: Y,
    clear: ue,
    close: P,
    getClassNameForEntry: Z,
    getIconForEntry: Q,
    addExternalFiles: V,
    renameEntry: K
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
  const s = await Zn(n), { canvas: i, ctx: l } = eo(s.naturalWidth, s.naturalHeight);
  return l.filter = e, l.drawImage(s, 0, 0), i.toDataURL(t, t === on ? 0.92 : void 0);
}
async function Ea(n, e, t, s, i) {
  const l = await Zn(n), r = l.naturalWidth, d = l.naturalHeight, c = e === 90 || e === 270, { canvas: f, ctx: h } = eo(c ? d : r, c ? r : d);
  return h.translate(f.width / 2, f.height / 2), e && h.rotate(e * Math.PI / 180), (t || s) && h.scale(t ? -1 : 1, s ? -1 : 1), h.drawImage(l, -r / 2, -d / 2), f.toDataURL(i, i === on ? 0.92 : void 0);
}
function Pa(n, e, t) {
  const s = 1 + n / 100, i = 1 + e / 100, l = 1 + t / 100;
  return `brightness(${s}) contrast(${i}) saturate(${l})`;
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
}, ni = { class: "vuefinder__image-editor__stage" }, oi = ["src", "alt"], si = { class: "vuefinder__image-editor__controls" }, ai = { class: "vuefinder__image-editor__toggle" }, ii = ["disabled"], ri = {
  key: 3,
  class: "vuefinder__image-editor__panel"
}, li = { class: "vuefinder__image-editor__stage" }, di = ["src", "alt"], ci = { class: "vuefinder__image-editor__controls vuefinder__image-editor__controls--stacked" }, ui = { class: "vuefinder__image-editor__slider" }, vi = { class: "vuefinder__image-editor__slider" }, fi = { class: "vuefinder__image-editor__slider" }, _i = { class: "vuefinder__image-editor__row" }, pi = ["disabled"], mi = /* @__PURE__ */ de({
  name: "ImageEditor",
  __name: "ImageEditor",
  props: {
    src: {},
    filename: {}
  },
  emits: ["update:src"],
  setup(n, { emit: e }) {
    const t = n, s = e, i = le(), { t: l } = i.i18n, r = D("crop"), d = D(!1), c = D(null), f = [
      { label: "Original", value: null },
      { label: "1:1", value: 1 },
      { label: "4:3", value: 4 / 3 },
      { label: "16:9", value: 16 / 9 },
      { label: "9:16", value: 9 / 16 }
    ], h = st("cropperRef"), _ = D(0), v = D(!1), k = D(!1), b = D(!1), x = D(0), m = D(0), w = D(0), g = z(
      () => Pa(x.value, m.value, w.value)
    );
    pe([() => t.src, r], () => {
      _.value = 0, v.value = !1, k.value = !1, b.value = !1, x.value = 0, m.value = 0, w.value = 0;
    });
    const E = z(() => Fa(t.filename)), C = z(() => {
      const O = [];
      return _.value && O.push(`rotate(${_.value}deg)`), v.value && O.push("scaleX(-1)"), k.value && O.push("scaleY(-1)"), O.length ? { transform: O.join(" ") } : {};
    }), L = (O) => {
      d.value || (r.value = O);
    }, S = () => {
      const K = h.value?.getResult()?.canvas;
      if (!K) return;
      const $ = K.toDataURL(E.value, E.value === "image/jpeg" ? 0.92 : void 0);
      s("update:src", $);
    }, R = async () => {
      if (Y.value) {
        d.value = !0;
        try {
          const O = await Ea(
            t.src,
            U.value,
            v.value,
            k.value,
            E.value
          );
          s("update:src", O);
        } finally {
          d.value = !1;
        }
      }
    }, j = async () => {
      if (b.value) {
        d.value = !0;
        try {
          const O = await xn(t.src, "grayscale(1)", E.value);
          s("update:src", O);
        } finally {
          d.value = !1;
        }
      }
    }, te = async () => {
      if (!(x.value === 0 && m.value === 0 && w.value === 0)) {
        d.value = !0;
        try {
          const O = await xn(t.src, g.value, E.value);
          s("update:src", O);
        } finally {
          d.value = !1;
        }
      }
    }, Z = () => {
      x.value = 0, m.value = 0, w.value = 0;
    }, Q = () => {
      _.value -= 90;
    }, W = () => {
      _.value += 90;
    }, P = () => {
      v.value = !v.value;
    }, T = () => {
      k.value = !k.value;
    }, U = z(
      () => (_.value % 360 + 360) % 360
    ), Y = z(
      () => U.value !== 0 || v.value || k.value
    ), ue = z(
      () => x.value !== 0 || m.value !== 0 || w.value !== 0
    ), V = z(() => b.value);
    return (O, K) => (u(), p("div", Da, [
      o("div", Ma, [
        (u(), p(fe, null, he(["crop", "rotate", "grayscale", "adjust"], ($) => o("button", {
          key: $,
          type: "button",
          role: "tab",
          "aria-selected": r.value === $,
          class: oe(["vuefinder__image-editor__tab", { "vuefinder__image-editor__tab--active": r.value === $ }]),
          onClick: (N) => L($)
        }, [
          $ === "crop" ? (u(), p("svg", Aa, [...K[4] || (K[4] = [
            o("path", { d: "M6 2v16a2 2 0 0 0 2 2h14" }, null, -1),
            o("path", { d: "M2 6h16a2 2 0 0 1 2 2v14" }, null, -1)
          ])])) : $ === "rotate" ? (u(), p("svg", Oa, [...K[5] || (K[5] = [
            o("polyline", { points: "23 4 23 10 17 10" }, null, -1),
            o("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" }, null, -1)
          ])])) : $ === "grayscale" ? (u(), p("svg", La, [...K[6] || (K[6] = [
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
          ])])) : (u(), p("svg", Ra, [...K[7] || (K[7] = [
            St('<line x1="4" y1="6" x2="14" y2="6"></line><circle cx="17" cy="6" r="2"></circle><line x1="10" y1="12" x2="20" y2="12"></line><circle cx="7" cy="12" r="2"></circle><line x1="4" y1="18" x2="14" y2="18"></line><circle cx="17" cy="18" r="2"></circle>', 6)
          ])])),
          o("span", Ba, y($ === "crop" ? a(l)("Crop") : $ === "rotate" ? a(l)("Rotate") : $ === "grayscale" ? a(l)("Grayscale") : a(l)("Adjust")), 1)
        ], 10, Ia)), 64))
      ]),
      r.value === "crop" ? (u(), p("div", za, [
        o("div", Va, [
          G(a(Do), {
            ref_key: "cropperRef",
            ref: h,
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
            (u(), p(fe, null, he(f, ($) => o("button", {
              key: $.label,
              type: "button",
              class: oe(["vuefinder__image-editor__chip", { "vuefinder__image-editor__chip--active": c.value === $.value }]),
              onClick: (N) => c.value = $.value
            }, y(a(l)($.label)), 11, Ha)), 64))
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value,
            onClick: S
          }, y(a(l)("Apply")), 9, ja)
        ])
      ])) : r.value === "rotate" ? (u(), p("div", Ka, [
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
              title: a(l)("Rotate left 90°"),
              onClick: Q
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
              title: a(l)("Rotate right 90°"),
              onClick: W
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
              class: oe(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": v.value }]),
              title: a(l)("Flip horizontal"),
              onClick: P
            }, [...K[10] || (K[10] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 7 8 11"></polyline><polyline points="16 3 20 7 16 11"></polyline><line x1="4" y1="7" x2="20" y2="7"></line><line x1="12" y1="13" x2="12" y2="21"></line></svg>', 1)
            ])], 10, Ja),
            o("button", {
              type: "button",
              class: oe(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": k.value }]),
              title: a(l)("Flip vertical"),
              onClick: T
            }, [...K[11] || (K[11] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8 7 4 11 8"></polyline><polyline points="3 16 7 20 11 16"></polyline><line x1="7" y1="4" x2="7" y2="20"></line><line x1="13" y1="12" x2="21" y2="12"></line></svg>', 1)
            ])], 10, Za)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value || !Y.value,
            onClick: R
          }, y(a(l)("Apply")), 9, ei)
        ])
      ])) : r.value === "grayscale" ? (u(), p("div", ti, [
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
            me(o("input", {
              "onUpdate:modelValue": K[0] || (K[0] = ($) => b.value = $),
              type: "checkbox"
            }, null, 512), [
              [rt, b.value]
            ]),
            o("span", null, y(a(l)("Grayscale")), 1)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: d.value || !V.value,
            onClick: j
          }, y(a(l)("Apply")), 9, ii)
        ])
      ])) : (u(), p("div", ri, [
        o("div", li, [
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
              ye(y(a(l)("Brightness")), 1),
              o("span", null, y(x.value), 1)
            ]),
            me(o("input", {
              "onUpdate:modelValue": K[1] || (K[1] = ($) => x.value = $),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                We,
                x.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", vi, [
            o("label", null, [
              ye(y(a(l)("Contrast")), 1),
              o("span", null, y(m.value), 1)
            ]),
            me(o("input", {
              "onUpdate:modelValue": K[2] || (K[2] = ($) => m.value = $),
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
              ye(y(a(l)("Saturation")), 1),
              o("span", null, y(w.value), 1)
            ]),
            me(o("input", {
              "onUpdate:modelValue": K[3] || (K[3] = ($) => w.value = $),
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
              onClick: Z
            }, y(a(l)("Reset")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__apply",
              disabled: d.value || !ue.value,
              onClick: te
            }, y(a(l)("Apply")), 9, pi)
          ])
        ])
      ]))
    ]));
  }
}), hi = { class: "vuefinder__image-preview" }, gi = ["src"], wi = ["aria-label", "title"], yi = ["aria-label", "title"], bi = ["aria-label", "title"], ki = 0.5, $i = 3, Sn = 0.25, xi = /* @__PURE__ */ de({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e, s = le(), i = Ve(s), { enabled: l } = Ne(), { t: r } = s.i18n, d = D(!1), c = D(
      s.modal.data.item.previewUrl ?? s.adapter.getPreviewUrl({ path: s.modal.data.item.path })
    ), f = D(c.value), h = D(!1), _ = D(1), v = D(null), k = D(0), b = D(0), x = D(1), m = D(!1), w = D(0), g = D(0);
    let E = null, C = 0, L = 0, S = 0, R = 0;
    const { addExternalFiles: j, upload: te, queue: Z } = Jn(s.customUploader), Q = s.fs, W = ne(Q.path), P = z(() => k.value * x.value), T = z(() => b.value * x.value), U = (q, ee) => {
      const ve = v.value?.clientWidth ?? 0, we = v.value?.clientHeight ?? 0, De = Math.max(0, (P.value * _.value - ve) / 2), Je = Math.max(0, (T.value * _.value - we) / 2);
      return {
        x: Math.min(De, Math.max(-De, q)),
        y: Math.min(Je, Math.max(-Je, ee))
      };
    }, Y = z(() => {
      if (!k.value || !b.value)
        return {};
      const { x: q, y: ee } = U(w.value, g.value);
      return {
        width: `${P.value}px`,
        height: `${T.value}px`,
        transform: `translate(${q}px, ${ee}px) scale(${_.value})`,
        transformOrigin: "center center"
      };
    }), ue = () => {
      if (!v.value || !k.value || !b.value) return;
      const q = v.value.getBoundingClientRect();
      !q.width || !q.height || (x.value = Math.min(q.width / k.value, q.height / b.value));
    }, V = (q) => {
      const ee = q.target;
      ee instanceof HTMLImageElement && (k.value = ee.naturalWidth || ee.clientWidth, b.value = ee.naturalHeight || ee.clientHeight, ue());
    }, O = (q) => Math.min($i, Math.max(ki, q)), K = () => {
      _.value = O(Number((_.value + Sn).toFixed(2)));
      const q = U(w.value, g.value);
      w.value = q.x, g.value = q.y;
    }, $ = () => {
      _.value = O(Number((_.value - Sn).toFixed(2)));
      const q = U(w.value, g.value);
      w.value = q.x, g.value = q.y;
    }, N = () => {
      _.value = 1, w.value = 0, g.value = 0;
    }, M = (q) => {
      d.value || (q.deltaY > 0 ? $() : q.deltaY < 0 && K());
    }, I = (q) => {
      if (d.value) return;
      const ee = q.target;
      if (ee instanceof HTMLInputElement || ee instanceof HTMLTextAreaElement || ee?.isContentEditable)
        return;
      const ve = q.key === "=" || q.key === "+", we = q.key === "-" || q.key === "_", De = q.key === "0";
      if (!(!ve && !we && !De)) {
        if (q.preventDefault(), ve) {
          K();
          return;
        }
        if (we) {
          $();
          return;
        }
        N();
      }
    }, B = () => {
      m.value = !1;
    }, F = (q) => {
      d.value || _.value <= 1 || !v.value || (m.value = !0, C = q.clientX, L = q.clientY, S = w.value, R = g.value, q.currentTarget?.setPointerCapture?.(q.pointerId));
    }, A = (q) => {
      if (!m.value) return;
      const ee = q.clientX - C, ve = q.clientY - L, we = U(S + ee, R + ve);
      w.value = we.x, g.value = we.y;
    };
    tn({
      isEditable: z(
        () => l("edit") && !s.fs.isReadOnly(s.modal.data.item)
      ),
      isEditing: z(() => d.value),
      isDirty: z(() => d.value && h.value),
      primaryActionLabel: z(() => r("Save")),
      enterEdit: () => {
        f.value = c.value, h.value = !1, d.value = !0, s.modal.setEditMode(!0);
      },
      commitEdit: () => ke(),
      cancelEdit: () => {
        d.value = !1, f.value = c.value, h.value = !1, s.modal.setEditMode(!1);
      },
      extraInfo: z(() => !k.value || !b.value ? [] : [{ label: r("Dimensions"), value: `${k.value} × ${b.value}` }])
    });
    const re = (q) => {
      f.value = q, h.value = !0;
    }, ke = async () => {
      if (!h.value) return;
      const q = s.modal.data.item.basename, ee = q.split(".").pop()?.toLowerCase() || "jpg", ve = ee === "png" ? "image/png" : ee === "gif" ? "image/gif" : "image/jpeg";
      try {
        const we = await Ta(f.value), De = new File([we], q, { type: ve }), J = s.modal.data.item.path.split("/");
        J.pop();
        const ae = {
          path: J.join("/") || (W.value?.path ?? "")
        };
        j([De]), await new Promise((Ee) => setTimeout(Ee, 100));
        const ce = Z.value.find((Ee) => Ee.name === De.name);
        if (!ce)
          throw new Error("File was not added to upload queue");
        te(ae);
        let He = 0;
        for (; He < 150; ) {
          await new Promise((Ye) => setTimeout(Ye, 200));
          const Ee = Z.value.find((Ye) => Ye.id === ce.id);
          if (Ee?.status === Se.DONE) break;
          if (Ee?.status === Se.ERROR)
            throw new Error(Ee.statusName || "Upload failed");
          He++;
        }
        i.success(r("Updated.")), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const Me = s.root?.querySelector?.('[data-src="' + c.value + '"]');
        Me && Me instanceof HTMLElement && qt.resetStatus(Me), s.emitter.emit("vf-refresh-thumbnails"), d.value = !1, h.value = !1, f.value = c.value, s.modal.setEditMode(!1), t("success");
      } catch (we) {
        i.error(Te(we, r("Failed to save image")));
      }
    };
    return be(() => {
      E = new ResizeObserver(() => {
        ue();
      }), v.value && E.observe(v.value), window.addEventListener("keydown", I), t("success");
    }), yt(() => {
      window.removeEventListener("keydown", I), E?.disconnect();
    }), (q, ee) => (u(), p("div", hi, [
      o("div", {
        ref_key: "imageContainer",
        ref: v,
        class: "vuefinder__image-preview__image-container"
      }, [
        d.value ? (u(), X(mi, {
          key: 1,
          src: f.value,
          filename: a(s).modal.data.item.basename,
          "onUpdate:src": re
        }, null, 8, ["src", "filename"])) : (u(), p("div", {
          key: 0,
          class: "vuefinder__image-preview__stage",
          onWheel: _e(M, ["prevent"])
        }, [
          o("img", {
            style: Ie(Y.value),
            src: a(s).modal.data.item.previewUrl ?? a(s).adapter.getPreviewUrl({ path: a(s).modal.data.item.path }),
            class: oe(["vuefinder__image-preview__image", {
              "vuefinder__image-preview__image--zoomed": _.value > 1,
              "vuefinder__image-preview__image--panning": m.value
            }]),
            draggable: !1,
            onLoad: V,
            onPointerdown: F,
            onPointermove: A,
            onPointerup: B,
            onPointercancel: B,
            onLostpointercapture: B
          }, null, 46, gi),
          o("div", {
            class: "vuefinder__image-preview__zoom-controls",
            onPointerdown: ee[0] || (ee[0] = _e(() => {
            }, ["stop"])),
            onWheel: ee[1] || (ee[1] = _e(() => {
            }, ["stop"]))
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(r)("Zoom out"),
              title: a(r)("Zoom out"),
              onClick: $
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
              "aria-label": a(r)("Reset zoom"),
              title: a(r)("Reset zoom"),
              onClick: N
            }, y(Math.round(_.value * 100)) + "% ", 9, yi),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(r)("Zoom in"),
              title: a(r)("Zoom in"),
              onClick: K
            }, [...ee[3] || (ee[3] = [
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
  return u(), p("svg", Si, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ht = { render: Ci }, Fi = { class: "vuefinder__default-preview" }, Ei = { class: "vuefinder__default-preview__content" }, Pi = { class: "vuefinder__default-preview__icon-container" }, Ti = ["title"], Di = /* @__PURE__ */ de({
  __name: "Default",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = le(), s = e;
    return be(() => {
      s("success");
    }), (i, l) => (u(), p("div", Fi, [
      o("div", Ei, [
        o("div", Pi, [
          G(a(ht), { class: "vuefinder__default-preview__file-icon" }),
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
}, Ai = ["src"], Oi = /* @__PURE__ */ de({
  __name: "Video",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = le(), s = e, i = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return be(() => {
      s("success");
    }), (l, r) => (u(), p("div", Mi, [
      o("div", null, [
        o("video", Ii, [
          o("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, Ai),
          r[0] || (r[0] = ye(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Li = { class: "vuefinder__audio-preview" }, Ri = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Bi = ["src"], zi = /* @__PURE__ */ de({
  __name: "Audio",
  emits: ["success"],
  setup(n, { emit: e }) {
    const t = e;
    le();
    const s = () => {
      const i = le();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return be(() => {
      t("success");
    }), (i, l) => (u(), p("div", Li, [
      o("div", null, [
        o("audio", Ri, [
          o("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Bi),
          l[0] || (l[0] = ye(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Vi = { class: "vuefinder__pdf-preview" }, Ui = ["data"], Ni = ["src"], Hi = /* @__PURE__ */ de({
  __name: "Pdf",
  emits: ["success"],
  setup(n, { emit: e }) {
    le();
    const t = e, s = () => {
      const i = le();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return be(() => {
      t("success");
    }), (i, l) => (u(), p("div", Vi, [
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
}, Zi = { class: "vuefinder__preview-modal__edit-actions" }, er = ["disabled"], Cn = 8, tr = 1.4, nr = 0.22, dt = 220, or = ".vuefinder__preview-chrome__title, .vuefinder__preview-modal__status-strip", Qe = /* @__PURE__ */ de({
  __name: "ModalPreview",
  setup(n) {
    const e = le(), { enabled: t } = Ne(), { t: s } = e.i18n, i = D(!1), l = (M) => {
      const I = (M || "").split("/").pop() || "", B = I.lastIndexOf(".");
      return B >= 0 ? I.slice(B + 1).toLowerCase() : "";
    }, r = (M, I) => {
      if (!I) return !1;
      const B = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), F = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), A = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), re = /* @__PURE__ */ new Set([
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
      return M === "image" ? B.has(I) : M === "video" ? F.has(I) : M === "audio" ? A.has(I) : M === "csv" ? I === "csv" || I === "tsv" : M === "text" ? re.has(I) : M === "application/pdf" ? I === "pdf" : !1;
    }, d = (M) => {
      const I = e.modal.data.forceType;
      if (I) return I === M;
      const B = e.modal.data.item.mime_type;
      if (B && typeof B == "string" && B.startsWith(M)) return !0;
      const F = l(e.modal.data.item.path);
      return r(M, F);
    }, c = t("preview");
    c || (i.value = !0);
    const f = z(() => e.modal.data.item), h = ne(e.fs.sortedFiles), _ = z(() => h.value.filter((M) => M.type === "file")), v = z(
      () => _.value.findIndex((M) => M.path === f.value.path)
    ), k = z(() => !!a(e.modal.controls?.isEditable)), b = z(() => !!a(e.modal.controls?.isEditing)), x = z(() => !!a(e.modal.controls?.isDirty)), m = z(
      () => a(e.modal.controls?.primaryActionLabel) ?? s("Save")
    ), w = async () => {
      await e.modal.controls?.enterEdit?.();
    }, g = async () => {
      await e.modal.controls?.commitEdit?.();
    }, E = async () => {
      x.value && !window.confirm(s("Discard unsaved changes?")) || await e.modal.controls?.cancelEdit?.();
    }, C = z(() => !b.value && v.value > 0), L = z(
      () => !b.value && v.value < _.value.length - 1
    ), S = () => {
      if (!C.value) return;
      const M = _.value[v.value - 1];
      M && (e.fs.clearSelection(), e.fs.select(M.path), e.modal.data.item = M, i.value = !1);
    }, R = () => {
      if (!L.value) return;
      const M = _.value[v.value + 1];
      M && (e.fs.clearSelection(), e.fs.select(M.path), e.modal.data.item = M, i.value = !1);
    }, j = () => {
      b.value && x.value && !window.confirm(s("Discard unsaved changes?")) || e.modal.close();
    }, te = D(0), Z = D(!1);
    let Q = 0, W = 0, P = !1, T = !1;
    const U = z(() => ({
      transform: `translate3d(${te.value}px, 0, 0)`,
      transition: Z.value ? `transform ${dt}ms ease-out` : "none"
    })), Y = (M, I) => {
      setTimeout(I, M);
    }, ue = (M) => {
      if (b.value || M.touches.length !== 1 || !M.target?.closest?.(or)) return;
      const B = M.touches[0];
      B && (P = !0, T = !1, Q = B.clientX, W = B.clientY, Z.value = !1);
    }, V = (M) => {
      if (!P) return;
      const I = M.touches[0];
      if (!I) return;
      const B = I.clientX - Q, F = I.clientY - W;
      if (!T) {
        if (Math.abs(B) < Cn && Math.abs(F) < Cn) return;
        if (Math.abs(B) < Math.abs(F) * tr) {
          P = !1;
          return;
        }
        T = !0;
      }
      let A = B;
      B > 0 && !C.value && (A = B * 0.3), B < 0 && !L.value && (A = B * 0.3), te.value = A, M.cancelable && M.preventDefault();
    }, O = (M) => {
      const I = window.innerWidth || 1, B = M === "prev" ? I : -I, F = M === "prev" ? -I : I, A = M === "prev" ? S : R;
      Z.value = !0, te.value = B, Y(dt, () => {
        A(), Z.value = !1, te.value = F, requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            Z.value = !0, te.value = 0, Y(dt, () => {
              Z.value = !1;
            });
          });
        });
      });
    }, K = () => {
      if (!P || (P = !1, !T)) return;
      const M = window.innerWidth || 1, I = te.value, B = Math.abs(I) >= M * nr;
      if (B && I > 0 && C.value) {
        O("prev");
        return;
      }
      if (B && I < 0 && L.value) {
        O("next");
        return;
      }
      Z.value = !0, te.value = 0, Y(dt, () => {
        Z.value = !1;
      });
    }, $ = () => {
      P && (P = !1, T && (Z.value = !0, te.value = 0, Y(dt, () => {
        Z.value = !1;
      })));
    }, N = (M) => {
      if (M.key === "Escape") {
        M.preventDefault(), M.stopPropagation(), j();
        return;
      }
      if ((M.metaKey || M.ctrlKey) && M.key.toLowerCase() === "s") {
        const I = e.modal.controls;
        if (I && a(I.isEditing)) {
          M.preventDefault(), I.commitEdit();
          return;
        }
      }
      b.value || (M.key === "ArrowLeft" || M.key === "ArrowRight") && (M.preventDefault(), M.stopPropagation(), M.key === "ArrowLeft" ? S() : R());
    };
    return be(() => {
      const M = document.querySelector(".vuefinder__preview-modal");
      M && M.focus();
    }), (M, I) => (u(), X(Ue, {
      "on-request-close": j,
      "body-style": U.value,
      "body-class": "vuefinder__modal-layout__body--swipeable " + (b.value ? "vuefinder__modal-layout__body--editing" : ""),
      "on-body-touchstart": ue,
      "on-body-touchmove": V,
      "on-body-touchend": K,
      "on-body-touchcancel": $
    }, yo({
      default: ie(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: N
        }, [
          G(la, { onCloseRequest: j }),
          (u(), X(bt, { to: "body" }, [
            b.value ? H("", !0) : (u(), p("div", {
              key: 0,
              class: "vuefinder__themer vuefinder__preview-modal__nav-overlay",
              "data-theme": a(e).theme.current
            }, [
              o("button", {
                disabled: !C.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
                title: a(s)("Previous file"),
                onClick: S
              }, [...I[7] || (I[7] = [
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
              }, [...I[8] || (I[8] = [
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
            a(c) ? (u(), p("div", Gi, [
              d("csv") ? (u(), X(Sa, {
                key: `csv-${f.value.path}`,
                onSuccess: I[0] || (I[0] = (B) => i.value = !0)
              })) : d("text") ? (u(), X(va, {
                key: `text-${f.value.path}`,
                onSuccess: I[1] || (I[1] = (B) => i.value = !0)
              })) : d("image") ? (u(), X(xi, {
                key: `image-${f.value.path}`,
                onSuccess: I[2] || (I[2] = (B) => i.value = !0)
              })) : d("video") ? (u(), X(Oi, {
                key: `video-${f.value.path}`,
                onSuccess: I[3] || (I[3] = (B) => i.value = !0)
              })) : d("audio") ? (u(), X(zi, {
                key: `audio-${f.value.path}`,
                onSuccess: I[4] || (I[4] = (B) => i.value = !0)
              })) : d("application/pdf") ? (u(), X(Hi, {
                key: `pdf-${f.value.path}`,
                onSuccess: I[5] || (I[5] = (B) => i.value = !0)
              })) : (u(), X(Di, {
                key: `default-${f.value.path}`,
                onSuccess: I[6] || (I[6] = (B) => i.value = !0)
              }))
            ])) : H("", !0),
            b.value || _.value.length > 1 ? (u(), p("div", Yi, [
              b.value ? (u(), p("span", {
                key: 0,
                class: oe(["vuefinder__preview-modal__edit-chip", { "vuefinder__preview-modal__edit-chip--dirty": x.value }])
              }, y(x.value ? a(s)("Unsaved") : a(s)("Editing")), 3)) : (u(), p("span", {
                key: 1,
                class: "vuefinder__preview-modal__pagination-text",
                "aria-label": a(s)("File %s of %s", String(v.value + 1), String(_.value.length))
              }, y(v.value + 1) + " / " + y(_.value.length), 9, Xi))
            ])) : H("", !0),
            o("div", Qi, [
              i.value === !1 ? (u(), p("div", Ji, [
                I[9] || (I[9] = o("svg", {
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
              ])) : H("", !0)
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
            b.value ? (u(), p(fe, { key: 1 }, [
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
                disabled: !x.value,
                onClick: g
              }, y(m.value), 9, er),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary vuefinder__preview-modal__edit-btn",
                onClick: E
              }, y(a(s)("Cancel")), 1)
            ], 64)) : (u(), p("button", {
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
}), sr = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2"
};
function ar(n, e) {
  return u(), p("svg", sr, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const ir = { render: ar }, rr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function lr(n, e) {
  return u(), p("svg", rr, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const sn = { render: lr }, dr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function cr(n, e) {
  return u(), p("svg", dr, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const ze = { render: cr }, ur = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function vr(n, e) {
  return u(), p("svg", ur, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Mt = { render: vr }, fr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function _r(n, e) {
  return u(), p("svg", fr, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const It = { render: _r }, pr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function mr(n, e) {
  return u(), p("svg", pr, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const gt = { render: mr }, hr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function gr(n, e) {
  return u(), p("svg", hr, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const an = { render: gr }, wr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function yr(n, e) {
  return u(), p("svg", wr, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const At = { render: yr }, br = { class: "vuefinder__modal-tree__folder-item" }, kr = { class: "vuefinder__modal-tree__folder-content" }, $r = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, xr = { class: "vuefinder__modal-tree__folder-text" }, Sr = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Cr = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Fr = 300, Er = /* @__PURE__ */ de({
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
    const t = le(), { t: s } = t.i18n, i = t.fs, l = D({}), r = n, d = e;
    ne(i.path);
    const c = z(() => {
      const R = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[R] || !1;
    }), f = z(() => r.modelValue?.path === r.folder.path), h = z(() => r.currentPath?.path === r.folder.path), _ = z(() => r.modalTreeData[r.folder.path] || []), v = z(() => {
      const R = _.value, j = l.value[r.folder.path] || 50;
      return R.length > j ? R.slice(0, j) : R;
    }), k = z(() => _.value.length), b = z(() => l.value[r.folder.path] || 50), x = z(() => k.value > b.value), m = () => {
      l.value[r.folder.path] = (b.value || 50) + 50;
    }, w = z(() => _.value.length > 0 || r.folder.type === "dir"), g = () => {
      d("toggleFolder", r.storage, r.folder.path);
    }, E = () => {
      d("update:modelValue", r.folder);
    }, C = () => {
      d("update:modelValue", r.folder), d("selectAndClose", r.folder);
    };
    let L = 0;
    const S = () => {
      const R = Date.now();
      R - L < Fr ? C() : E(), L = R;
    };
    return (R, j) => {
      const te = Bn("ModalTreeFolderItem", !0);
      return u(), p("div", br, [
        o("div", kr, [
          w.value ? (u(), p("div", {
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
          ])) : (u(), p("div", $r)),
          o("div", {
            class: oe(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": f.value,
              "vuefinder__modal-tree__folder-link--current": h.value
            }]),
            onClick: E,
            onDblclick: C,
            onTouchend: S
          }, [
            c.value ? (u(), X(a(At), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), X(a(ze), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", xr, y(n.folder.basename), 1)
          ], 34)
        ]),
        c.value && w.value ? (u(), p("div", Sr, [
          (u(!0), p(fe, null, he(v.value, (Z) => (u(), X(te, {
            key: Z.path,
            folder: Z,
            storage: n.storage,
            "model-value": n.modelValue,
            "expanded-folders": n.expandedFolders,
            "modal-tree-data": n.modalTreeData,
            "current-path": n.currentPath,
            "onUpdate:modelValue": j[0] || (j[0] = (Q) => R.$emit("update:modelValue", Q)),
            onSelectAndClose: j[1] || (j[1] = (Q) => R.$emit("selectAndClose", Q)),
            onToggleFolder: j[2] || (j[2] = (Q, W) => R.$emit("toggleFolder", Q, W))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          x.value ? (u(), p("div", Cr, [
            o("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: m
            }, y(a(s)("load more")), 1)
          ])) : H("", !0)
        ])) : H("", !0)
      ]);
    };
  }
}), Pr = { class: "vuefinder__modal-tree" }, Tr = { class: "vuefinder__modal-tree__header" }, Dr = { class: "vuefinder__modal-tree__title" }, Mr = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Ir = { class: "vuefinder__modal-tree__section-title" }, Ar = { class: "vuefinder__modal-tree__list" }, Or = ["onClick", "onDblclick", "onTouchend"], Lr = { class: "vuefinder__modal-tree__text" }, Rr = { class: "vuefinder__modal-tree__text-storage" }, Br = { class: "vuefinder__modal-tree__section-title" }, zr = { class: "vuefinder__modal-tree__list" }, Vr = { class: "vuefinder__modal-tree__storage-item" }, Ur = { class: "vuefinder__modal-tree__storage-content" }, Nr = ["onClick"], Hr = ["onClick", "onDblclick", "onTouchend"], jr = { class: "vuefinder__modal-tree__storage-text" }, Kr = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, qr = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Wr = ["onClick"], Fn = 300, kt = /* @__PURE__ */ de({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(n, { emit: e }) {
    const t = le(), { t: s } = t.i18n, i = t.fs, l = t.config, r = e, d = ne(i.sortedFiles), c = ne(i.storages), f = z(() => c.value || []), h = ne(i.path), _ = D(null), v = D({}), k = D({}), b = D({});
    pe(d, (P) => {
      const T = P.filter((Y) => Y.type === "dir"), U = h.value?.path || "";
      U && (k.value[U] = T.map((Y) => ({
        ...Y,
        type: "dir"
      })));
    });
    const x = (P, T) => {
      const U = `${P}:${T}`;
      v.value = {
        ...v.value,
        [U]: !v.value[U]
      }, v.value[U] && !k.value[T] && t.adapter.list(T).then((Y) => {
        const V = (Y.files || []).filter((O) => O.type === "dir");
        k.value[T] = V.map((O) => ({
          ...O,
          type: "dir"
        }));
      });
    }, m = (P) => k.value[P] || [], w = (P) => b.value[P] || 50, g = (P) => {
      const T = m(P), U = w(P);
      return T.length > U ? T.slice(0, U) : T;
    }, E = (P) => m(P).length, C = (P) => E(P) > w(P), L = (P) => {
      b.value[P] = w(P) + 50;
    }, S = (P) => {
      P && r("update:modelValue", P);
    }, R = (P) => {
      P && (r("update:modelValue", P), r("selectAndClose", P));
    }, j = (P) => {
      const T = {
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
      r("update:modelValue", T);
    }, te = (P) => {
      const T = {
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
      r("update:modelValue", T), r("selectAndClose", T);
    };
    let Z = 0;
    const Q = (P) => {
      if (!P) return;
      const T = Date.now();
      T - Z < Fn ? R(P) : S(P), Z = T;
    }, W = (P) => {
      const T = Date.now();
      T - Z < Fn ? te(P) : j(P), Z = T;
    };
    return be(() => {
      _.value && ft(_.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (P, T) => (u(), p("div", Pr, [
      o("div", Tr, [
        o("div", Dr, y(a(s)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: _,
        class: "vuefinder__modal-tree__content"
      }, [
        n.showPinnedFolders && a(t).features.pinned && a(l).get("pinnedFolders").length ? (u(), p("div", Mr, [
          o("div", Ir, y(a(s)("Pinned Folders")), 1),
          o("div", Ar, [
            (u(!0), p(fe, null, he(a(l).get("pinnedFolders"), (U) => (u(), p("div", {
              key: U.path,
              class: oe(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": n.modelValue?.path === U.path }]),
              onClick: (Y) => S(U),
              onDblclick: (Y) => R(U),
              onTouchend: (Y) => Q(U)
            }, [
              G(a(ze), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", Lr, y(U.basename), 1),
              o("div", Rr, y(U.storage), 1),
              G(a(gt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Or))), 128))
          ])
        ])) : H("", !0),
        o("div", Br, y(a(s)("Storages")), 1),
        (u(!0), p(fe, null, he(f.value, (U) => (u(), p("div", {
          key: U,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", zr, [
            o("div", Vr, [
              o("div", Ur, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: _e((Y) => x(U, U + "://"), ["stop"])
                }, [
                  v.value[`${U}:${U}://`] ? (u(), X(a(It), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), X(a(Mt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Nr),
                o("div", {
                  class: oe(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": n.modelValue?.path === U + "://"
                  }]),
                  onClick: (Y) => j(U),
                  onDblclick: (Y) => te(U),
                  onTouchend: (Y) => W(U)
                }, [
                  G(a(an), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", jr, y(U), 1)
                ], 42, Hr)
              ]),
              v.value[`${U}:${U}://`] ? (u(), p("div", Kr, [
                (u(!0), p(fe, null, he(g(U + "://"), (Y) => (u(), X(Er, {
                  key: Y.path,
                  folder: Y,
                  storage: U,
                  "model-value": n.modelValue,
                  "expanded-folders": v.value,
                  "modal-tree-data": k.value,
                  "current-path": n.currentPath,
                  "onUpdate:modelValue": S,
                  onSelectAndClose: R,
                  onToggleFolder: x
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                C(U + "://") ? (u(), p("div", qr, [
                  o("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (Y) => L(U + "://")
                  }, y(a(s)("load more")), 9, Wr)
                ])) : H("", !0)
              ])) : H("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Gr = ["title"], Gt = /* @__PURE__ */ de({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(n, { emit: e }) {
    const t = e, s = le(), { t: i } = s.i18n, l = D(!1), r = D(null), d = D(r.value?.innerHTML);
    pe(d, () => l.value = !1);
    const c = () => {
      t("hidden"), l.value = !0;
    };
    return (f, h) => (u(), p("div", null, [
      l.value ? H("", !0) : (u(), p("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: oe(["vuefinder__message", n.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        ge(f.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: a(i)("Close"),
          onClick: c
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
        ])], 8, Gr)
      ], 2))
    ]));
  }
}), Yr = { class: "vuefinder__move-modal__content" }, Xr = { class: "vuefinder__move-modal__description" }, Qr = { class: "vuefinder__move-modal__files vf-scrollbar" }, Jr = { class: "vuefinder__move-modal__file-name" }, Zr = { class: "vuefinder__move-modal__target-title" }, el = { class: "vuefinder__move-modal__target-container" }, tl = { class: "vuefinder__move-modal__target-path" }, nl = { class: "vuefinder__move-modal__target-storage" }, ol = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, sl = { class: "vuefinder__move-modal__target-badge" }, al = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, il = { class: "vuefinder__move-modal__checkbox-label" }, rl = { class: "vuefinder__move-modal__checkbox-text" }, ll = ["disabled"], dl = { class: "vuefinder__move-modal__selected-items" }, to = /* @__PURE__ */ de({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(n) {
    const e = le(), t = Ve(e), { enabled: s } = Ne(), { t: i } = e.i18n, l = n, r = D(e.modal.data.items.from), d = D(e.modal.data.items.to), c = D(""), f = D(l.copy || !s("move")), h = z(() => f.value ? "copy" : "move"), _ = D(!1), v = ne(e.fs.path), k = z(() => f.value ? i("Copy files") : i("Move files")), b = z(
      () => f.value ? i("Are you sure you want to copy these files?") : i("Are you sure you want to move these files?")
    ), x = z(() => f.value ? i("Yes, Copy!") : i("Yes, Move!"));
    z(() => f.value ? i("Files copied.") : i("Files moved."));
    const m = (S) => {
      S && (d.value = S);
    }, w = (S) => {
      S && (d.value = S, _.value = !1);
    }, g = z(() => {
      const S = d.value;
      return S ? r.value.some((R) => !!(S.path === R.path || R.type === "dir" && S.path.startsWith(R.path + "/"))) : !0;
    }), E = z(() => {
      if (!g.value)
        return "";
      const S = d.value;
      return S ? r.value.find((j) => S.path === j.path || j.type === "dir" && S.path.startsWith(j.path + "/")) ? i("Cannot move/copy item to itself or its own subfolder") : i("Invalid destination directory") : i("Please select a destination directory");
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
      if (r.value.length)
        try {
          const { files: S } = await e.adapter[h.value]({
            path: v.value.path,
            sources: r.value.map(({ path: R }) => R),
            destination: d.value.path
          });
          e.fs.setFiles(S), e.modal.close();
        } catch (S) {
          t.error(Te(S, i("Failed to transfer files")));
        }
    };
    return (S, R) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: g.value,
          onClick: L
        }, y(x.value), 9, ll),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: R[4] || (R[4] = (j) => a(e).modal.close())
        }, y(a(i)("Cancel")), 1),
        o("div", dl, y(a(i)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: f.value ? a(sn) : a(ir),
            title: k.value
          }, null, 8, ["icon", "title"]),
          o("div", Yr, [
            o("p", Xr, y(b.value), 1),
            o("div", Qr, [
              (u(!0), p(fe, null, he(r.value, (j) => (u(), p("div", {
                key: j.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  j.type === "dir" ? (u(), X(a(ze), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), X(a(ht), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", Jr, y(j.path), 1)
              ]))), 128))
            ]),
            o("h4", Zr, y(a(i)("Target Directory")), 1),
            o("div", el, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: R[0] || (R[0] = (j) => _.value = !_.value)
              }, [
                o("div", tl, [
                  o("span", nl, y(C().storage) + "://", 1),
                  C().path ? (u(), p("span", ol, y(C().path), 1)) : H("", !0)
                ]),
                o("span", sl, y(a(i)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: oe([
                "vuefinder__move-modal__tree-selector",
                _.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              G(kt, {
                modelValue: d.value,
                "onUpdate:modelValue": [
                  R[1] || (R[1] = (j) => d.value = j),
                  m
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: w
              }, null, 8, ["modelValue"])
            ], 2),
            a(s)("copy") && a(s)("move") ? (u(), p("div", al, [
              o("label", il, [
                me(o("input", {
                  "onUpdate:modelValue": R[2] || (R[2] = (j) => f.value = j),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [rt, f.value]
                ]),
                o("span", rl, y(a(i)("Create a copy instead of moving")), 1)
              ])
            ])) : H("", !0),
            E.value ? (u(), X(Gt, {
              key: 1,
              error: ""
            }, {
              default: ie(() => [
                ye(y(E.value), 1)
              ]),
              _: 1
            })) : H("", !0),
            c.value.length && !E.value ? (u(), X(Gt, {
              key: 2,
              error: "",
              onHidden: R[3] || (R[3] = (j) => c.value = "")
            }, {
              default: ie(() => [
                ye(y(c.value), 1)
              ]),
              _: 1
            })) : H("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), it = /* @__PURE__ */ de({
  __name: "ModalMove",
  setup(n) {
    return (e, t) => (u(), X(to, { copy: !1 }));
  }
}), rn = /* @__PURE__ */ de({
  __name: "ModalCopy",
  setup(n) {
    return (e, t) => (u(), X(to, { copy: !0 }));
  }
}), cl = (n, e = 0, t = !1) => {
  let s;
  return (...i) => {
    t && !s && n(...i), clearTimeout(s), s = setTimeout(() => {
      n(...i);
    }, e);
  };
}, no = (n, e, t) => {
  const s = D(n);
  return bo((i, l) => ({
    get() {
      return i(), s.value;
    },
    set: cl(
      (r) => {
        s.value = r, l();
      },
      e,
      !1
    )
  }));
}, ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function vl(n, e) {
  return u(), p("svg", ul, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const ln = { render: vl }, fl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function _l(n, e) {
  return u(), p("svg", fl, [...e[0] || (e[0] = [
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
const Ot = { render: _l }, pl = { class: "vuefinder__search-modal__search-input" }, ml = ["value", "placeholder", "disabled"], hl = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, gl = /* @__PURE__ */ de({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(n, { expose: e, emit: t }) {
    const s = t, i = le(), { t: l } = i.i18n, r = D(null), d = (f) => {
      const h = f.target;
      s("update:modelValue", h.value);
    }, c = (f) => {
      s("keydown", f);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (f, h) => (u(), p("div", pl, [
      G(a(ln), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: r,
        value: n.modelValue,
        type: "text",
        placeholder: a(l)("Search files"),
        disabled: n.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: h[0] || (h[0] = _e(() => {
        }, ["stop"])),
        onInput: d
      }, null, 40, ml),
      n.isSearching ? (u(), p("div", hl, [
        G(a(Ot), { class: "vuefinder__search-modal__loading-icon" })
      ])) : H("", !0)
    ]));
  }
}), wl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function yl(n, e) {
  return u(), p("svg", wl, [...e[0] || (e[0] = [
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
const oo = { render: yl }, bl = ["disabled", "title"], kl = ["data-theme"], $l = { class: "vuefinder__search-modal__dropdown-content" }, xl = { class: "vuefinder__search-modal__dropdown-section" }, Sl = { class: "vuefinder__search-modal__dropdown-title" }, Cl = { class: "vuefinder__search-modal__dropdown-options" }, Fl = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, El = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Pl = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Tl = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Dl = { class: "vuefinder__search-modal__dropdown-section" }, Ml = { class: "vuefinder__search-modal__dropdown-title" }, Il = { class: "vuefinder__search-modal__dropdown-options" }, Al = ["onClick"], Ol = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Ll = /* @__PURE__ */ de({
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
    const s = n, i = t, l = le(), { t: r } = l.i18n, d = D(null), c = D(null);
    let f = null;
    const h = [
      { value: "name-asc", key: "Name (A-Z)" },
      { value: "name-desc", key: "Name (Z-A)" },
      { value: "size-asc", key: "Size (smallest)" },
      { value: "size-desc", key: "Size (largest)" },
      { value: "date-desc", key: "Date (newest)" },
      { value: "date-asc", key: "Date (oldest)" }
    ], _ = (w) => {
      if (i("update:selectedOption", w), w.startsWith("size-")) {
        const g = w.split("-")[1];
        i("update:sizeFilter", g);
      }
    }, v = (w) => {
      i("update:sortBy", w);
    }, k = async () => {
      s.disabled || (s.visible ? (i("update:visible", !1), f && (f(), f = null)) : (i("update:visible", !0), await Oe(), await b()));
    }, b = async () => {
      if (!(!d.value || !c.value) && (await Oe(), !(!d.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: w, y: g } = await at(d.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${w}px`,
            top: `${g}px`
          }), requestAnimationFrame(() => {
            c.value && Object.assign(c.value.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (w) {
          console.warn("Floating UI initial positioning error:", w);
          return;
        }
        try {
          f = Xt(d.value, c.value, async () => {
            if (!(!d.value || !c.value))
              try {
                const { x: w, y: g } = await at(
                  d.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
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
    }, x = (w) => {
      if (!s.visible) return;
      const g = ["size-all", "size-small", "size-medium", "size-large"], E = g.findIndex((C) => C === s.selectedOption);
      if (w.key === "ArrowDown") {
        w.preventDefault();
        const C = (E + 1) % g.length;
        i("update:selectedOption", g[C] || null);
      } else if (w.key === "ArrowUp") {
        w.preventDefault();
        const C = E <= 0 ? g.length - 1 : E - 1;
        i("update:selectedOption", g[C] || null);
      } else w.key === "Enter" ? (w.preventDefault(), s.selectedOption?.startsWith("size-") && i(
        "update:sizeFilter",
        s.selectedOption.split("-")[1]
      )) : w.key === "Escape" && (w.preventDefault(), i("update:visible", !1), f && (f(), f = null));
    }, m = () => {
      f && (f(), f = null);
    };
    return pe(
      () => s.visible,
      (w) => {
        !w && f && (f(), f = null);
      }
    ), Ae(() => {
      m();
    }), e({
      cleanup: m
    }), (w, g) => (u(), p(fe, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: d,
        class: oe(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": n.visible }]),
        disabled: n.disabled,
        title: a(r)("Search Options"),
        onClick: _e(k, ["stop"])
      }, [
        G(a(oo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, bl),
      (u(), X(bt, { to: "body" }, [
        n.visible ? (u(), p("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(l).theme.current,
          tabindex: "-1",
          onClick: g[4] || (g[4] = _e(() => {
          }, ["stop"])),
          onKeydown: x
        }, [
          o("div", $l, [
            o("div", xl, [
              o("div", Sl, y(a(r)("File Size")), 1),
              o("div", Cl, [
                o("div", {
                  class: oe(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "all"
                  }]),
                  onClick: g[0] || (g[0] = _e((E) => _("size-all"), ["stop"]))
                }, [
                  o("span", null, y(a(r)("All Files")), 1),
                  n.sizeFilter === "all" ? (u(), p("div", Fl, [...g[5] || (g[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 2),
                o("div", {
                  class: oe(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "small"
                  }]),
                  onClick: g[1] || (g[1] = _e((E) => _("size-small"), ["stop"]))
                }, [
                  o("span", null, y(a(r)("Small (< 1MB)")), 1),
                  n.sizeFilter === "small" ? (u(), p("div", El, [...g[6] || (g[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 2),
                o("div", {
                  class: oe(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "medium"
                  }]),
                  onClick: g[2] || (g[2] = _e((E) => _("size-medium"), ["stop"]))
                }, [
                  o("span", null, y(a(r)("Medium (1-10MB)")), 1),
                  n.sizeFilter === "medium" ? (u(), p("div", Pl, [...g[7] || (g[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 2),
                o("div", {
                  class: oe(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sizeFilter === "large"
                  }]),
                  onClick: g[3] || (g[3] = _e((E) => _("size-large"), ["stop"]))
                }, [
                  o("span", null, y(a(r)("Large (> 10MB)")), 1),
                  n.sizeFilter === "large" ? (u(), p("div", Tl, [...g[8] || (g[8] = [
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
            o("div", Dl, [
              o("div", Ml, y(a(r)("Sort by")), 1),
              o("div", Il, [
                (u(), p(fe, null, he(h, (E) => o("div", {
                  key: E.value,
                  class: oe(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": n.sortBy === E.value
                  }]),
                  onClick: _e((C) => v(E.value), ["stop"])
                }, [
                  o("span", null, y(a(r)(E.key)), 1),
                  n.sortBy === E.value ? (u(), p("div", Ol, [...g[9] || (g[9] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : H("", !0)
                ], 10, Al)), 64))
              ])
            ])
          ])
        ], 40, kl)) : H("", !0)
      ]))
    ], 64));
  }
});
function Lt(n, e = 40) {
  const t = n.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return n;
  const s = t[1], i = t[2] ?? "", l = i.split("/").filter(Boolean), r = l.pop();
  if (!r) return s + i;
  let d = `${s}${l.join("/")}${l.length ? "/" : ""}${r}`;
  if (d.length <= e) return d;
  const c = r.split(/\.(?=[^\.]+$)/), f = c[0] ?? "", h = c[1] ?? "", _ = f.length > 10 ? `${f.slice(0, 6)}...${f.slice(-5)}` : f, v = h ? `${_}.${h}` : _;
  return d = `${s}${l.join("/")}${l.length ? "/" : ""}${v}`, d.length > e && (d = `${s}.../${v}`), d;
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
async function Rl(n) {
  await so(n);
}
const Bl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function zl(n, e) {
  return u(), p("svg", Bl, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const ao = { render: zl }, Vl = ["title"], Ul = { class: "vuefinder__search-modal__result-icon" }, Nl = { class: "vuefinder__search-modal__result-content" }, Hl = { class: "vuefinder__search-modal__result-name" }, jl = {
  key: 1,
  class: "vuefinder__search-modal__result-size"
}, Kl = ["title"], ql = ["title"], Wl = ["data-item-dropdown", "data-theme"], Gl = { class: "vuefinder__search-modal__item-dropdown-content" }, Yl = /* @__PURE__ */ de({
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
    const t = n, s = e, i = le(), { t: l } = i.i18n, { enabled: r } = Ne(), d = ne(i.config.state), c = z(() => r("pinned")), f = z(
      () => d.value.pinnedFolders.some((P) => P.path === t.item.path)
    ), h = (P) => {
      const T = i.config.get("pinnedFolders");
      T.some((U) => U.path === P.path) ? i.config.set(
        "pinnedFolders",
        T.filter((U) => U.path !== P.path)
      ) : i.config.set("pinnedFolders", [...T, P]);
    }, _ = D(null);
    let v = null, k = null, b = [], x = null;
    pe(
      () => t.activeDropdown,
      (P) => {
        v && (v(), v = null), k && (b.forEach((T) => {
          T === window ? window.removeEventListener("scroll", k, !0) : T.removeEventListener("scroll", k, !0);
        }), k = null, b = []), x && (document.removeEventListener("mousedown", x, !0), document.removeEventListener("touchstart", x, !0), x = null), P === t.item.path && _.value && Oe(() => {
          S(t.item.path, _.value), w(), g();
        });
      }
    );
    const m = (P) => {
      const T = [];
      let U = P;
      for (; U && U !== document.body && U !== document.documentElement; ) {
        const Y = window.getComputedStyle(U), ue = Y.overflow + Y.overflowX + Y.overflowY;
        (ue.includes("scroll") || ue.includes("auto")) && T.push(U), U = U.parentElement;
      }
      return T;
    }, w = () => {
      if (t.activeDropdown !== t.item.path) return;
      const P = m(_.value);
      b = [window, ...P], k = () => {
        t.activeDropdown === t.item.path && s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const T = k;
      T && b.forEach((U) => {
        U === window ? window.addEventListener("scroll", T, !0) : U.addEventListener("scroll", T, !0);
      });
    }, g = () => {
      t.activeDropdown === t.item.path && (x = (P) => {
        if (t.activeDropdown !== t.item.path) return;
        const T = P.target;
        if (!T) return;
        const U = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (U && U.contains(T) || _.value && _.value.contains(T))
          return;
        const Y = i.root;
        if (Y && Y.contains(T)) {
          s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const ue = document.querySelector(".vuefinder__modal-layout");
        if (ue && ue.contains(T)) {
          s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        s("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        x && (document.addEventListener("mousedown", x, !0), document.addEventListener("touchstart", x, !0));
      }, 100));
    };
    Ae(() => {
      v && (v(), v = null), k && (b.forEach((P) => {
        P === window ? window.removeEventListener("scroll", k, !0) : P.removeEventListener("scroll", k, !0);
      }), k = null, b = []), x && (document.removeEventListener("mousedown", x, !0), document.removeEventListener("touchstart", x, !0), x = null);
    });
    const E = (P) => t.expandedPaths.has(P), C = (P) => P.type === "dir" || !P.file_size ? "" : Jt(P.file_size), L = (P, T) => {
      T.stopPropagation(), s("toggleItemDropdown", P, T);
    }, S = async (P, T) => {
      const U = document.querySelector(
        `[data-item-dropdown="${P}"]`
      );
      if (!(!U || !T) && (await Oe(), !(!U || !T))) {
        Object.assign(U.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: Y, y: ue } = await at(T, U, {
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
          v = Xt(T, U, async () => {
            if (!(!T || !U))
              try {
                const { x: Y, y: ue } = await at(T, U, {
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
    }, R = (P) => {
      s("update:selectedItemDropdownOption", P);
    }, j = async (P) => {
      await wt(P.path), s("copyPath", P);
    }, te = (P) => {
      s("openContainingFolder", P);
    }, Z = (P) => {
      s("preview", P);
    }, Q = (P) => {
      s("open", P);
    }, W = (P) => {
      if (!t.activeDropdown) return;
      const T = ["copy-path", "open-folder", "preview"], U = t.selectedItemDropdownOption, Y = T.findIndex((ue) => U?.includes(ue));
      if (P.key === "ArrowDown") {
        P.preventDefault();
        const ue = (Y + 1) % T.length;
        s(
          "update:selectedItemDropdownOption",
          `${T[ue] || ""}-${t.activeDropdown}`
        );
      } else if (P.key === "ArrowUp") {
        P.preventDefault();
        const ue = Y <= 0 ? T.length - 1 : Y - 1;
        s(
          "update:selectedItemDropdownOption",
          `${T[ue] || ""}-${t.activeDropdown}`
        );
      } else P.key === "Enter" ? (P.preventDefault(), U && (U.includes("copy-path") ? j(t.item) : U.includes("open-folder") ? te(t.item) : U.includes("preview") && Z(t.item))) : P.key === "Escape" && (P.preventDefault(), s("update:selectedItemDropdownOption", null));
    };
    return (P, T) => (u(), p("div", {
      class: oe(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": n.index === n.selectedIndex }]),
      title: n.item.basename,
      onClick: T[13] || (T[13] = (U) => s("select", n.index)),
      onDblclick: T[14] || (T[14] = _e((U) => s("activate", n.item), ["stop"]))
    }, [
      o("div", Ul, [
        n.item.type === "dir" ? (u(), X(a(ze), { key: 0 })) : (u(), X(a(ht), { key: 1 }))
      ]),
      o("div", Nl, [
        o("div", Hl, [
          n.item.type === "dir" && c.value && f.value ? (u(), X(a(gt), {
            key: 0,
            class: "vuefinder__search-modal__result-pin",
            title: a(l)("Pinned")
          }, null, 8, ["title"])) : H("", !0),
          ye(" " + y(n.item.basename) + " ", 1),
          C(n.item) ? (u(), p("span", jl, y(C(n.item)), 1)) : H("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: n.item.path,
          onClick: T[0] || (T[0] = _e((U) => {
            s("select", n.index), s("togglePathExpansion", n.item.path);
          }, ["stop"]))
        }, y(E(n.item.path) ? n.item.path : a(Lt)(n.item.path)), 9, Kl)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: _,
        class: "vuefinder__search-modal__result-actions",
        title: a(l)("More actions"),
        onClick: T[1] || (T[1] = (U) => {
          s("selectWithDropdown", n.index), L(n.item.path, U);
        })
      }, [
        G(a(ao), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, ql),
      (u(), X(bt, { to: "body" }, [
        n.activeDropdown === n.item.path ? (u(), p("div", {
          key: 0,
          "data-item-dropdown": n.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(i).theme.current,
          tabindex: "-1",
          onClick: T[12] || (T[12] = _e(() => {
          }, ["stop"])),
          onKeydown: W
        }, [
          o("div", Gl, [
            o("div", {
              class: oe(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `copy-path-${n.item.path}`
              }]),
              onClick: T[2] || (T[2] = (U) => {
                R(`copy-path-${n.item.path}`), j(n.item);
              }),
              onFocus: T[3] || (T[3] = (U) => R(`copy-path-${n.item.path}`))
            }, [
              G(a(sn), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(a(l)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: oe(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-folder-${n.item.path}`
              }]),
              onClick: T[4] || (T[4] = (U) => {
                R(`open-folder-${n.item.path}`), te(n.item);
              }),
              onFocus: T[5] || (T[5] = (U) => R(`open-folder-${n.item.path}`))
            }, [
              G(a(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(a(l)("Open Containing Folder")), 1)
            ], 34),
            n.item.type === "dir" ? (u(), p("div", {
              key: 0,
              class: oe(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `open-${n.item.path}`
              }]),
              onClick: T[6] || (T[6] = (U) => {
                R(`open-${n.item.path}`), Q(n.item);
              }),
              onFocus: T[7] || (T[7] = (U) => R(`open-${n.item.path}`))
            }, [
              G(a(ze), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(a(l)("Open")), 1)
            ], 34)) : H("", !0),
            n.item.type === "dir" && c.value ? (u(), p("div", {
              key: 1,
              class: oe(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `pin-${n.item.path}`
              }]),
              onClick: T[8] || (T[8] = (U) => {
                R(`pin-${n.item.path}`), h(n.item);
              }),
              onFocus: T[9] || (T[9] = (U) => R(`pin-${n.item.path}`))
            }, [
              G(a(gt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(f.value ? a(l)("Unpin Folder") : a(l)("Pin Folder")), 1)
            ], 34)) : (u(), p("div", {
              key: 2,
              class: oe(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": n.selectedItemDropdownOption === `preview-${n.item.path}`
              }]),
              onClick: T[10] || (T[10] = (U) => {
                R(`preview-${n.item.path}`), Z(n.item);
              }),
              onFocus: T[11] || (T[11] = (U) => R(`preview-${n.item.path}`))
            }, [
              G(a(ht), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, y(a(l)("Preview")), 1)
            ], 34))
          ])
        ], 40, Wl)) : H("", !0)
      ]))
    ], 42, Vl));
  }
}), Xl = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Ql = { class: "vuefinder__search-modal__loading-icon" }, Jl = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, Zl = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, ed = { class: "vuefinder__search-modal__results-header" }, tt = 60, En = 5, td = /* @__PURE__ */ de({
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
    const s = n, i = t, l = le(), { t: r } = l.i18n, d = st("scrollableContainer"), c = z(() => s.searchResults.length > 0), f = z(() => s.searchResults.length), h = D(0), _ = D(600), v = z(() => s.searchResults.length * tt), k = z(() => {
      const E = Math.max(0, Math.floor(h.value / tt) - En), C = Math.min(
        s.searchResults.length,
        Math.ceil((h.value + _.value) / tt) + En
      );
      return { start: E, end: C };
    }), b = z(() => {
      const { start: E, end: C } = k.value;
      return s.searchResults.slice(E, C).map((L, S) => ({
        item: L,
        index: E + S,
        top: (E + S) * tt
      }));
    }), x = (E) => {
      const C = E.target;
      h.value = C.scrollTop;
    }, m = () => {
      d.value && (_.value = d.value.clientHeight);
    }, w = () => {
      if (s.selectedIndex >= 0 && d.value) {
        const E = s.selectedIndex * tt, C = E + tt, L = d.value.scrollTop, S = d.value.clientHeight, R = L + S;
        let j = L;
        E < L ? j = E : C > R && (j = C - S), j !== L && d.value.scrollTo({
          top: j,
          behavior: "smooth"
        });
      }
    }, g = () => {
      d.value && (d.value.scrollTop = 0, h.value = 0);
    };
    return be(() => {
      m(), window.addEventListener("resize", m);
    }), Ae(() => {
      window.removeEventListener("resize", m);
    }), pe(
      () => d.value,
      () => {
        m();
      }
    ), e({
      scrollSelectedIntoView: w,
      resetScroll: g,
      getContainerHeight: () => _.value,
      scrollTop: () => h.value
    }), (E, C) => (u(), p("div", {
      class: oe(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": n.resultsEnter }])
    }, [
      n.isSearching ? (u(), p("div", Xl, [
        o("div", Ql, [
          G(a(Ot), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, y(a(r)("Searching...")), 1)
      ])) : c.value ? (u(), p("div", Zl, [
        o("div", ed, [
          o("span", null, y(a(r)("Found %s results", f.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: d,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: x
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: Ie({ height: `${v.value}px`, position: "relative" })
          }, [
            (u(!0), p(fe, null, he(b.value, (L) => (u(), p("div", {
              key: L.item.path,
              style: Ie({
                position: "absolute",
                top: `${L.top}px`,
                left: "0",
                width: "100%",
                height: `${tt}px`
              })
            }, [
              G(Yl, {
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
      ])) : (u(), p("div", Jl, [
        o("span", null, y(a(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), nd = { class: "vuefinder__search-modal" }, od = { class: "vuefinder__search-modal__content" }, sd = { class: "vuefinder__search-modal__search-bar" }, ad = { class: "vuefinder__search-modal__search-location" }, id = ["title"], rd = ["disabled"], ld = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, dd = { class: "vuefinder__search-modal__folder-selector-content" }, cd = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, ud = { class: "vuefinder__search-modal__instructions-text" }, dn = /* @__PURE__ */ de({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, l = D(null), r = D(null), d = D(null), c = no("", 300), f = D([]), h = D(!1), _ = D(-1);
    let v = null;
    const k = D(!1), b = D(!1), x = D(null), m = D("all"), w = D(!1), g = D("name-asc"), E = {
      "name-asc": { column: "basename", direction: 1 },
      "name-desc": { column: "basename", direction: -1 },
      "size-asc": { column: "file_size", direction: 1 },
      "size-desc": { column: "file_size", direction: -1 },
      "date-asc": { column: "last_modified", direction: 1 },
      "date-desc": { column: "last_modified", direction: -1 }
    }, C = z(() => {
      const { column: F, direction: A } = E[g.value];
      return f.value.slice().sort((re, ke) => qn(re[F], ke[F]) * A);
    }), L = D(`size-${m.value}`), S = D(null), R = D(/* @__PURE__ */ new Set()), j = D(null), te = ne(i.path), Z = (F) => {
      R.value.has(F) ? R.value.delete(F) : R.value.add(F);
    }, Q = (F, A) => {
      A && typeof A.stopPropagation == "function" && A.stopPropagation(), j.value === F ? j.value = null : j.value = F;
    }, W = () => {
      j.value = null;
    }, P = (F) => {
      try {
        const A = F.dir || `${F.storage}://`;
        e.adapter.open(A), e.modal.close(), W();
      } catch {
        t.error(s("Failed to open containing folder"));
      }
    }, T = (F) => {
      e.modal.open(Qe, {
        storage: te?.value?.storage ?? "local",
        item: F
      }), W();
    }, U = (F) => {
      e.adapter.open(F.path), e.modal.close(), W();
    }, Y = (F) => {
      F.type === "dir" ? U(F) : T(F);
    }, ue = (F) => {
      _.value = F, W();
    }, V = (F) => {
      _.value = F;
    }, O = async (F) => {
      await wt(F.path), W();
    };
    pe(c, async (F) => {
      F.trim() ? (await $(F.trim()), _.value = 0) : (v && (v.abort(), v = null), f.value = [], h.value = !1, _.value = -1);
    }), pe(m, async (F) => {
      L.value = `size-${F}`, c.value.trim() && !b.value && (await $(c.value.trim()), _.value = 0);
    }), pe(w, async () => {
      c.value.trim() && !b.value && (await $(c.value.trim()), _.value = 0);
    });
    const K = (F) => {
      if (!F || typeof F != "object") return !1;
      const A = F.name;
      return A === "AbortError" || A === "CanceledError";
    }, $ = async (F) => {
      if (!F) return;
      v && v.abort();
      const A = new AbortController();
      v = A, h.value = !0;
      try {
        const re = x.value?.path || te?.value?.path, ke = await e.adapter.search({
          path: re,
          filter: F,
          deep: w.value,
          size: m.value,
          signal: A.signal
        });
        if (A.signal.aborted) return;
        f.value = ke || [], h.value = !1;
      } catch (re) {
        if (K(re) || A.signal.aborted) return;
        t.error(Te(re, s("Search failed"))), f.value = [], h.value = !1;
      }
    };
    be(() => {
      document.addEventListener("click", B), L.value = `size-${m.value}`;
    });
    const N = () => {
      b.value ? (b.value = !1, c.value.trim() && ($(c.value.trim()), _.value = 0)) : (k.value = !1, b.value = !0);
    }, M = (F) => {
      F && (x.value = F);
    }, I = (F) => {
      F && (M(F), b.value = !1, c.value.trim() && ($(c.value.trim()), _.value = 0));
    };
    Ae(() => {
      document.removeEventListener("click", B), v && (v.abort(), v = null), r.value && r.value.cleanup();
    });
    const B = (F) => {
      const A = F.target;
      if (k.value && (A.closest(".vuefinder__search-modal__dropdown") || (k.value = !1, Oe(() => {
        l.value && l.value.focus();
      }))), j.value) {
        const re = A.closest(".vuefinder__search-modal__item-dropdown"), ke = A.closest(".vuefinder__search-modal__result-item");
        !re && !ke && W();
      }
    };
    return (F, A) => (u(), X(Ue, { class: "vuefinder__search-modal-layout" }, {
      default: ie(() => [
        o("div", nd, [
          G(je, {
            icon: a(ln),
            title: a(s)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", od, [
            o("div", sd, [
              G(gl, {
                ref_key: "searchInputRef",
                ref: l,
                modelValue: a(c),
                "onUpdate:modelValue": A[0] || (A[0] = (re) => zn(c) ? c.value = re : null),
                "is-searching": h.value,
                disabled: b.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              G(Ll, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: k.value,
                "onUpdate:visible": A[1] || (A[1] = (re) => k.value = re),
                "size-filter": m.value,
                "onUpdate:sizeFilter": A[2] || (A[2] = (re) => m.value = re),
                "selected-option": L.value,
                "onUpdate:selectedOption": A[3] || (A[3] = (re) => L.value = re),
                "sort-by": g.value,
                "onUpdate:sortBy": A[4] || (A[4] = (re) => g.value = re),
                disabled: b.value
              }, null, 8, ["visible", "size-filter", "selected-option", "sort-by", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: A[8] || (A[8] = _e(() => {
              }, ["stop"]))
            }, [
              o("div", ad, [
                o("button", {
                  class: oe(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": b.value }]),
                  onClick: _e(N, ["stop"])
                }, [
                  G(a(ze), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: x.value?.path || a(te).path
                  }, y(a(Lt)(x.value?.path || a(te).path)), 9, id),
                  A[11] || (A[11] = o("svg", {
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
                onClick: A[7] || (A[7] = _e(() => {
                }, ["stop"]))
              }, [
                me(o("input", {
                  "onUpdate:modelValue": A[5] || (A[5] = (re) => w.value = re),
                  type: "checkbox",
                  disabled: b.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: A[6] || (A[6] = _e(() => {
                  }, ["stop"]))
                }, null, 8, rd), [
                  [rt, w.value]
                ]),
                o("span", null, y(a(s)("Include subfolders")), 1)
              ])
            ]),
            b.value ? (u(), p("div", ld, [
              o("div", dd, [
                G(kt, {
                  modelValue: x.value,
                  "onUpdate:modelValue": [
                    A[9] || (A[9] = (re) => x.value = re),
                    M
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(te),
                  onSelectAndClose: I
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : H("", !0),
            !a(c).trim() && !b.value ? (u(), p("div", cd, [
              o("p", ud, y(a(s)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : H("", !0),
            a(c).trim() && !b.value ? (u(), X(td, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: d,
              "search-results": C.value,
              "is-searching": h.value,
              "selected-index": _.value,
              "expanded-paths": R.value,
              "active-dropdown": j.value,
              "selected-item-dropdown-option": S.value,
              "results-enter": !0,
              onSelectResultItem: ue,
              onSelectResultItemWithDropdown: V,
              onTogglePathExpansion: Z,
              onToggleItemDropdown: Q,
              "onUpdate:selectedItemDropdownOption": A[10] || (A[10] = (re) => S.value = re),
              onCopyPath: O,
              onOpenContainingFolder: P,
              onOpen: U,
              onPreview: T,
              onActivate: Y
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
    const s = le(), i = D(!1), { t: l } = s.i18n;
    let r = null;
    const d = () => {
      r && clearTimeout(r), i.value = !0, r = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return be(() => {
      s.emitter.on(n.on, d);
    }), Ae(() => {
      r && clearTimeout(r);
    }), {
      shown: i,
      t: l
    };
  }
}, fd = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [s, i] of e)
    t[s] = i;
  return t;
}, _d = { key: 1 };
function pd(n, e, t, s, i, l) {
  return u(), p("div", {
    class: oe(["vuefinder__action-message", { "vuefinder__action-message--hidden": !s.shown }])
  }, [
    n.$slots.default ? ge(n.$slots, "default", { key: 0 }) : (u(), p("span", _d, y(s.t("Saved.")), 1))
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
}, Fd = { class: "vuefinder__settings-modal__input-group" }, Ed = ["value"], Pd = { class: "vuefinder__settings-modal__reset-section" }, Td = { class: "vuefinder__settings-modal__reset-content" }, Dd = { class: "vuefinder__settings-modal__reset-title" }, Md = { class: "vuefinder__settings-modal__reset-description" }, io = /* @__PURE__ */ de({
  __name: "ModalSettings",
  setup(n) {
    const e = le(), { enabled: t } = Ne(), s = e.config, { clearStore: i } = e.storage, { t: l, localeAtom: r } = e.i18n, d = ne(r), c = z({
      get: () => String(d.value || "en"),
      set: (m) => r.set(m || "en")
    }), f = ne(s.state), h = z(() => f.value.theme || "silver"), _ = async () => {
      s.reset(), i(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, v = (m) => {
      s.set("theme", m), e.emitter.emit("vf-theme-saved");
    }, { i18n: k } = Ct("VueFinderOptions"), x = Object.fromEntries(
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
    return (m, w) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: w[2] || (w[2] = (g) => a(e).modal.close())
        }, y(a(l)("Close")), 1)
      ]),
      default: ie(() => [
        o("div", hd, [
          G(je, {
            icon: a(oo),
            title: a(l)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", gd, [
            o("div", wd, [
              a(t)("theme") ? (u(), p("div", yd, [
                o("label", bd, [
                  ye(y(a(l)("Theme")) + " ", 1),
                  G(Pn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: ie(() => [
                      ye(y(a(l)("Saved.")), 1)
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
                    (u(!0), p(fe, null, he(a(md), (g) => (u(), p("option", {
                      key: g.name,
                      value: g.name
                    }, y(g.displayName), 9, xd))), 128))
                  ], 40, $d)
                ])
              ])) : H("", !0),
              Object.keys(a(x)).length > 1 ? (u(), p("div", Sd, [
                o("label", Cd, [
                  ye(y(a(l)("Language")) + " ", 1),
                  G(Pn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: ie(() => [
                      ye(y(a(l)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", Fd, [
                  me(o("select", {
                    id: "language",
                    "onUpdate:modelValue": w[1] || (w[1] = (g) => c.value = g),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (u(!0), p(fe, null, he(a(x), (g, E) => (u(), p("option", {
                      key: E,
                      value: E
                    }, y(g), 9, Ed))), 128))
                  ], 512), [
                    [Kt, c.value]
                  ])
                ])
              ])) : H("", !0)
            ]),
            o("div", Pd, [
              o("div", Td, [
                o("div", Dd, y(a(l)("Reset")), 1),
                o("div", Md, y(a(l)("Reset all settings to default")), 1)
              ]),
              o("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: _
              }, y(a(l)("Reset Settings")), 1)
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
  const n = le(), e = Ve(n), t = n.fs, s = n.config, { enabled: i } = Ne(), l = ne(t.path), r = ne(t.selectedItems), d = (c) => {
    if (c.code === Re.ESCAPE && (n.modal.close(), n.root.focus()), !n.modal.visible) {
      if (c.metaKey && c.code === Re.KEY_R && !c.shiftKey && (n.adapter.invalidateListQuery(l.value.path), n.adapter.open(l.value.path), c.preventDefault()), c.metaKey && c.shiftKey && c.code === Re.KEY_R && i("rename") && r.value.length === 1 && (n.modal.open(Dt, { items: r.value }), c.preventDefault()), c.code === Re.DELETE && r.value.length !== 0 && n.modal.open(Tt, { items: r.value }), c.metaKey && c.code === Re.BACKSLASH && n.modal.open(Gn), c.metaKey && c.code === Re.KEY_F && i("search") && (n.modal.open(dn), c.preventDefault()), c.metaKey && c.code === Re.KEY_E && (s.toggle("showTreeView"), c.preventDefault()), c.metaKey && c.code === Re.KEY_S && (n.modal.open(io), c.preventDefault()), c.metaKey && c.code === Re.ENTER && (s.toggle("fullScreen"), n.root.focus()), c.metaKey && c.code === Re.KEY_A && (t.selectAll(n.selectionMode || "multiple", n), c.preventDefault()), c.code === Re.SPACE && r.value.length === 1 && r.value[0]?.type !== "dir" && n.modal.open(Qe, {
        storage: t.path.get().storage,
        item: r.value[0]
      }), c.metaKey && c.code === Re.KEY_C && i("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(r.value.map((f) => $e(f)))), e.success(
          r.value.length === 1 ? n.i18n.t("Item copied to clipboard") : n.i18n.t("%s items copied to clipboard", r.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Re.KEY_X && i("copy")) {
        if (r.value.length === 0) {
          e.error(n.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(r.value.map((f) => $e(f)))), e.success(
          r.value.length === 1 ? n.i18n.t("Item cut to clipboard") : n.i18n.t("%s items cut to clipboard", r.value.length)
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
          n.modal.open(rn, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        c.preventDefault();
      }
    }
  };
  be(async () => {
    if (await Oe(), !n.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    n.root.addEventListener("keydown", d);
  }), yt(() => {
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
      const c = d.dataTransfer?.items;
      c && Array.from(c).some((h) => h.kind === "file") && (n.value = !0, d.isExternalDrag = !0);
    },
    handleDragOver: (d) => {
      n.value && d.dataTransfer && (d.dataTransfer.dropEffect = "copy", d.preventDefault(), d.stopPropagation());
    },
    handleDragLeave: (d) => {
      d.preventDefault();
      const c = d.currentTarget.getBoundingClientRect(), f = d.clientX, h = d.clientY;
      (f < c.left || f > c.right || h < c.top || h > c.bottom) && (n.value = !1);
    },
    handleDrop: async (d) => {
      d.preventDefault(), d.stopPropagation(), n.value = !1;
      const c = d.dataTransfer?.items;
      if (c) {
        const f = Array.from(c).filter((h) => h.kind === "file");
        if (f.length > 0) {
          e.value = [];
          const h = f.map((_) => ({
            entry: _.webkitGetAsEntry?.(),
            file: _.getAsFile()
          }));
          for (const { entry: _, file: v } of h)
            _ ? await nn((k, b) => {
              const x = k?.fullPath || b.name, m = x.startsWith("/") ? x.slice(1) : x;
              e.value.push({
                name: b.name,
                relativePath: m,
                size: b.size,
                type: b.type,
                lastModified: new Date(b.lastModified),
                file: b
              });
            }, _) : v && e.value.push({
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
  return u(), p("svg", Od, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const ro = { render: Ld }, Rd = { class: "vuefinder__new-folder-modal__content" }, Bd = { class: "vuefinder__new-folder-modal__form" }, zd = { class: "vuefinder__new-folder-modal__description" }, Vd = ["placeholder"], cn = /* @__PURE__ */ de({
  __name: "ModalNewFolder",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, l = ne(i.path), r = D(""), d = () => {
      r.value !== "" && e.adapter.createFolder({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        t.success(s("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
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
        }, y(a(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (h) => a(e).modal.close())
        }, y(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(ro),
            title: a(s)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Rd, [
            o("div", Bd, [
              o("p", zd, y(a(s)("Create a new folder")), 1),
              me(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (h) => r.value = h),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(s)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: Ke(d, ["enter"])
              }, null, 40, Vd), [
                [We, r.value]
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
  return u(), p("svg", Ud, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const lo = { render: Nd }, Hd = { class: "vuefinder__new-file-modal__content" }, jd = { class: "vuefinder__new-file-modal__form" }, Kd = { class: "vuefinder__new-file-modal__description" }, qd = ["placeholder"], co = /* @__PURE__ */ de({
  __name: "ModalNewFile",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, l = ne(i.path), r = D(""), d = () => {
      r.value !== "" && e.adapter.createFile({
        path: l.value.path,
        name: r.value
      }).then((c) => {
        t.success(s("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
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
        }, y(a(s)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (h) => a(e).modal.close())
        }, y(a(s)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(lo),
            title: a(s)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", Hd, [
            o("div", jd, [
              o("p", Kd, y(a(s)("Create a new file")), 1),
              me(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (h) => r.value = h),
                class: "vuefinder__new-file-modal__input",
                placeholder: a(s)("File Name"),
                type: "text",
                onKeyup: Ke(d, ["enter"])
              }, null, 40, qd), [
                [We, r.value]
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
  return u(), p("svg", Wd, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const uo = { render: Gd };
function Yt(n, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return n.replace(new RegExp(t), "$2..$4");
}
const Yd = { class: "vuefinder__upload-modal__content relative" }, Xd = { class: "vuefinder__upload-modal__target-section" }, Qd = { class: "vuefinder__upload-modal__target-label" }, Jd = { class: "vuefinder__upload-modal__target-container" }, Zd = { class: "vuefinder__upload-modal__target-path" }, ec = { class: "vuefinder__upload-modal__target-storage" }, tc = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, nc = { class: "vuefinder__upload-modal__target-badge" }, oc = { class: "vuefinder__upload-modal__drag-hint" }, sc = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, ac = ["textContent"], ic = { class: "vuefinder__upload-modal__file-info" }, rc = {
  key: 0,
  class: "vuefinder__upload-modal__file-rename"
}, lc = ["placeholder", "onKeyup"], dc = ["title", "onClick"], cc = ["title"], uc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, vc = { class: "vuefinder__upload-modal__file-name md:hidden" }, fc = {
  key: 0,
  class: "ml-auto"
}, _c = ["title", "disabled", "onClick"], pc = ["title", "disabled", "onClick"], mc = {
  key: 0,
  class: "py-2"
}, hc = ["aria-expanded"], gc = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, wc = ["disabled"], yc = ["aria-expanded"], bc = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, un = /* @__PURE__ */ de({
  __name: "ModalUpload",
  setup(n) {
    const e = le(), { t } = e.i18n, s = e.fs, i = ne(s.path), l = D(i.value), r = D(!1), d = () => {
      const B = l.value.path;
      if (!B) return { storage: "local", path: "" };
      if (B.endsWith("://"))
        return { storage: B.replace("://", ""), path: "" };
      const F = B.split("://");
      return {
        storage: F[0] || "local",
        path: F[1] || ""
      };
    }, c = (B) => {
      B && (l.value = B);
    }, f = (B) => {
      B && (l.value = B, r.value = !1);
    }, {
      container: h,
      internalFileInput: _,
      internalFolderInput: v,
      pickFiles: k,
      queue: b,
      message: x,
      uploading: m,
      hasFilesInDropArea: w,
      definitions: g,
      openFileSelector: E,
      upload: C,
      cancel: L,
      remove: S,
      clear: R,
      close: j,
      getClassNameForEntry: te,
      getIconForEntry: Z,
      addExternalFiles: Q,
      renameEntry: W
    } = Jn(e.customUploader), P = D(null), T = D(""), U = D(null), Y = (B) => {
      const F = B.lastIndexOf("/");
      return F === -1 ? B : B.slice(F + 1);
    }, ue = (B) => {
      m.value || B.status !== g.value.QUEUE_ENTRY_STATUS.UPLOADING && B.status !== g.value.QUEUE_ENTRY_STATUS.REJECTED && (P.value = B.id, T.value = Y(B.name), Oe(() => {
        const F = U.value;
        if (F) {
          F.focus();
          const A = T.value.lastIndexOf(".");
          A > 0 ? F.setSelectionRange(0, A) : F.select();
        }
      }));
    }, V = () => {
      P.value = null, T.value = "";
    }, O = async (B) => {
      const F = T.value.trim();
      if (!F || F === Y(B.name)) {
        V();
        return;
      }
      await W(B, F), V();
    }, K = () => {
      C(l.value), e.config.get("closeUploadModalOnSubmit") && j();
    };
    be(() => {
      e.emitter.on("vf-external-files-dropped", (B) => {
        Q(B);
      });
    }), Ae(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const $ = D(!1), N = D(null), M = D(null), I = (B) => {
      if (!$.value) return;
      const F = B.target, A = N.value?.contains(F) ?? !1, re = M.value?.contains(F) ?? !1;
      !A && !re && ($.value = !1);
    };
    return be(() => document.addEventListener("click", I)), Ae(() => document.removeEventListener("click", I)), (B, F) => (u(), X(Ue, {
      "show-drag-overlay": a(w),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: ie(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: N,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: oe([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              $.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: F[4] || (F[4] = (A) => a(E)())
            }, y(a(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": $.value ? "true" : "false",
              onClick: F[5] || (F[5] = _e((A) => $.value = !$.value, ["stop"]))
            }, [...F[21] || (F[21] = [
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
          $.value ? (u(), p("div", gc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[6] || (F[6] = (A) => {
                a(E)(), $.value = !1;
              })
            }, y(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[7] || (F[7] = (A) => {
                a(v)?.click(), $.value = !1;
              })
            }, y(a(t)("Select Folders")), 1),
            F[22] || (F[22] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: oe(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: F[8] || (F[8] = (A) => a(m) ? null : (a(R)(!1), $.value = !1))
            }, y(a(t)("Clear all")), 3),
            o("div", {
              class: oe(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: F[9] || (F[9] = (A) => a(m) ? null : (a(R)(!0), $.value = !1))
            }, y(a(t)("Clear only successful")), 3)
          ])) : H("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(m) || !a(b).length,
          onClick: _e(K, ["prevent"])
        }, y(a(t)("Upload")), 9, wc),
        a(m) ? (u(), p("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: F[10] || (F[10] = _e(
            //@ts-ignore
            (...A) => a(L) && a(L)(...A),
            ["prevent"]
          ))
        }, y(a(t)("Cancel")), 1)) : (u(), p("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: F[11] || (F[11] = _e(
            //@ts-ignore
            (...A) => a(j) && a(j)(...A),
            ["prevent"]
          ))
        }, y(a(t)("Close")), 1)),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: M,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: oe(["vuefinder__upload-actions", $.value ? "vuefinder__upload-actions--ring" : ""])
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
              "aria-expanded": $.value ? "true" : "false",
              onClick: F[12] || (F[12] = _e((A) => $.value = !$.value, ["stop"]))
            }, [...F[23] || (F[23] = [
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
            ])], 8, yc)
          ], 2),
          $.value ? (u(), p("div", bc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[13] || (F[13] = (A) => {
                a(E)(), $.value = !1;
              })
            }, y(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: F[14] || (F[14] = (A) => {
                a(v)?.click(), $.value = !1;
              })
            }, y(a(t)("Select Folders")), 1),
            F[24] || (F[24] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: oe(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: F[15] || (F[15] = (A) => a(m) ? null : (a(R)(!1), $.value = !1))
            }, y(a(t)("Clear all")), 3),
            o("div", {
              class: oe(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: F[16] || (F[16] = (A) => a(m) ? null : (a(R)(!0), $.value = !1))
            }, y(a(t)("Clear only successful")), 3)
          ])) : H("", !0)
        ], 512)
      ]),
      default: ie(() => [
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
                  onClick: F[0] || (F[0] = (A) => r.value = !r.value)
                }, [
                  o("div", Zd, [
                    o("span", ec, y(d().storage) + "://", 1),
                    d().path ? (u(), p("span", tc, y(d().path), 1)) : H("", !0)
                  ]),
                  o("span", nc, y(a(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: oe([
                  "vuefinder__upload-modal__tree-selector",
                  r.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                G(kt, {
                  modelValue: l.value,
                  "onUpdate:modelValue": [
                    F[1] || (F[1] = (A) => l.value = A),
                    c
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
            o("div", sc, [
              (u(!0), p(fe, null, he(a(b), (A) => (u(), p("div", {
                key: A.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: oe(["vuefinder__upload-modal__file-icon", a(te)(A)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: y(a(Z)(A))
                  }, null, 8, ac)
                ], 2),
                o("div", ic, [
                  P.value === A.id ? (u(), p("div", rc, [
                    me(o("input", {
                      ref_for: !0,
                      ref_key: "renameInputRef",
                      ref: U,
                      "onUpdate:modelValue": F[2] || (F[2] = (re) => T.value = re),
                      type: "text",
                      class: "vuefinder__upload-modal__file-rename-input",
                      placeholder: a(t)("Rename"),
                      onKeyup: [
                        Ke((re) => O(A), ["enter"]),
                        Ke(V, ["esc"])
                      ]
                    }, null, 40, lc), [
                      [We, T.value]
                    ]),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn vuefinder__upload-modal__file-rename-btn--save",
                      title: a(t)("Save"),
                      onClick: (re) => O(A)
                    }, [...F[17] || (F[17] = [
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
                      onClick: V
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
                          d: "M6 18L18 6M6 6l12 12"
                        })
                      ], -1)
                    ])], 8, cc)
                  ])) : (u(), p(fe, { key: 1 }, [
                    o("div", uc, y(a(Yt)(A.name, 40)) + " (" + y(A.size) + ") ", 1),
                    o("div", vc, y(a(Yt)(A.name, 16)) + " (" + y(A.size) + ") ", 1),
                    o("div", {
                      class: oe(["vuefinder__upload-modal__file-status", a(te)(A)])
                    }, [
                      ye(y(A.statusName) + " ", 1),
                      A.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), p("b", fc, y(A.percent), 1)) : H("", !0)
                    ], 2)
                  ], 64))
                ]),
                P.value !== A.id && A.status !== a(g).QUEUE_ENTRY_STATUS.REJECTED ? (u(), p("button", {
                  key: 0,
                  type: "button",
                  class: oe([
                    "vuefinder__upload-modal__file-rename-action",
                    a(m) || A.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING ? "disabled" : ""
                  ]),
                  title: a(t)("Rename"),
                  disabled: a(m) || A.status === a(g).QUEUE_ENTRY_STATUS.UPLOADING,
                  onClick: (re) => ue(A)
                }, [...F[19] || (F[19] = [
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
                ])], 10, _c)) : H("", !0),
                P.value !== A.id ? (u(), p("button", {
                  key: 1,
                  type: "button",
                  class: oe(["vuefinder__upload-modal__file-remove", a(m) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(m),
                  onClick: (re) => a(S)(A)
                }, [...F[20] || (F[20] = [
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
                ])], 10, pc)) : H("", !0)
              ]))), 128)),
              a(b).length ? H("", !0) : (u(), p("div", mc, y(a(t)("No files selected!")), 1))
            ]),
            a(x).length ? (u(), X(Gt, {
              key: 0,
              error: "",
              onHidden: F[3] || (F[3] = (A) => x.value = "")
            }, {
              default: ie(() => [
                ye(y(a(x)), 1)
              ]),
              _: 1
            })) : H("", !0)
          ])
        ]),
        o("input", {
          ref_key: "internalFileInput",
          ref: _,
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
  return u(), p("svg", kc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const vo = { render: $c }, xc = { class: "vuefinder__unarchive-modal__content" }, Sc = { class: "vuefinder__unarchive-modal__items" }, Cc = {
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
}, vn = /* @__PURE__ */ de({
  __name: "ModalUnarchive",
  setup(n) {
    const e = le(), t = Ve(e), s = e.fs, i = ne(s.path), { t: l } = e.i18n, r = D(e.modal.data.items[0]), d = D([]), c = D(null), f = D(!1), h = z(() => c.value?.path || i.value.path), _ = () => {
      f.value = !f.value;
    }, v = (x) => {
      x && (c.value = x);
    }, k = (x) => {
      x && (c.value = x, f.value = !1);
    }, b = () => {
      const x = c.value?.path;
      e.adapter.unarchive({
        item: r.value.path,
        path: i.value.path,
        // Optional. Sent when the user explicitly picks a different folder.
        ...x && x !== i.value.path ? { destination: x } : {}
      }).then((m) => {
        t.success(l("The file unarchived.")), e.fs.setFiles(m.files), e.modal.close();
      }).catch((m) => {
        t.error(Te(m, l("Failed to unarchive")));
      });
    };
    return (x, m) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: b
        }, y(a(l)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[1] || (m[1] = (w) => a(e).modal.close())
        }, y(a(l)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(vo),
            title: a(l)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", xc, [
            o("div", Sc, [
              (u(!0), p(fe, null, he(d.value, (w) => (u(), p("p", {
                key: w.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                w.type === "dir" ? (u(), p("svg", Cc, [...m[2] || (m[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), p("svg", Fc, [...m[3] || (m[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Ec, y(w.basename), 1)
              ]))), 128)),
              o("p", Pc, y(a(l)("The archive will be unarchived at")) + " (" + y(h.value) + ") ", 1),
              o("div", Tc, [
                o("div", Dc, y(a(l)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: oe(["vuefinder__unarchive-modal__target-btn", { "vuefinder__unarchive-modal__target-btn--open": f.value }]),
                  onClick: _
                }, [
                  G(a(ze), { class: "vuefinder__unarchive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__unarchive-modal__target-text",
                    title: h.value
                  }, y(a(Lt)(h.value)), 9, Mc),
                  m[4] || (m[4] = o("svg", {
                    class: "vuefinder__unarchive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                f.value ? (u(), p("div", Ic, [
                  G(kt, {
                    modelValue: c.value,
                    "onUpdate:modelValue": [
                      m[0] || (m[0] = (w) => c.value = w),
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
}), Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Oc(n, e) {
  return u(), p("svg", Ac, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const fo = { render: Oc }, Lc = { class: "vuefinder__archive-modal__content" }, Rc = { class: "vuefinder__archive-modal__form" }, Bc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, zc = {
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
}, fn = /* @__PURE__ */ de({
  __name: "ModalArchive",
  setup(n) {
    const e = le(), t = Ve(e), { t: s } = e.i18n, i = e.fs, l = ne(i.path), r = D(""), d = D(e.modal.data.items), c = D(null), f = D(!1), h = z(() => c.value?.path || l.value.path), _ = () => {
      f.value = !f.value;
    }, v = (x) => {
      x && (c.value = x);
    }, k = (x) => {
      x && (c.value = x, f.value = !1);
    }, b = () => {
      if (d.value.length) {
        const x = c.value?.path;
        e.adapter.archive({
          path: l.value.path,
          items: d.value.map(({ path: m, type: w }) => ({
            path: m,
            type: w
          })),
          name: r.value,
          // Optional. Sent when the user explicitly picks a different folder.
          ...x && x !== l.value.path ? { destination: x } : {}
        }).then((m) => {
          t.success(s("The file(s) archived.")), e.fs.setFiles(m.files), e.modal.close();
        }).catch((m) => {
          t.error(Te(m, s("Failed to archive files")));
        });
      }
    };
    return (x, m) => (u(), X(Ue, null, {
      buttons: ie(() => [
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
      default: ie(() => [
        o("div", null, [
          G(je, {
            icon: a(fo),
            title: a(s)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Lc, [
            o("div", Rc, [
              o("div", Bc, [
                (u(!0), p(fe, null, he(d.value, (w) => (u(), p("p", {
                  key: w.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  w.type === "dir" ? (u(), p("svg", zc, [...m[3] || (m[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), p("svg", Vc, [...m[4] || (m[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Uc, y(w.basename), 1)
                ]))), 128))
              ]),
              me(o("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (w) => r.value = w),
                class: "vuefinder__archive-modal__input",
                placeholder: a(s)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: Ke(b, ["enter"])
              }, null, 40, Nc), [
                [We, r.value]
              ]),
              o("div", Hc, [
                o("div", jc, y(a(s)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: oe(["vuefinder__archive-modal__target-btn", { "vuefinder__archive-modal__target-btn--open": f.value }]),
                  onClick: _
                }, [
                  G(a(ze), { class: "vuefinder__archive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__archive-modal__target-text",
                    title: h.value
                  }, y(a(Lt)(h.value)), 9, Kc),
                  m[5] || (m[5] = o("svg", {
                    class: "vuefinder__archive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                f.value ? (u(), p("div", qc, [
                  G(kt, {
                    modelValue: c.value,
                    "onUpdate:modelValue": [
                      m[1] || (m[1] = (w) => c.value = w),
                      v
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(l),
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
}, au = { class: "vuefinder__about-modal__shortcut" }, iu = { class: "vuefinder__about-modal__shortcut" }, ru = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, lu = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, du = /* @__PURE__ */ de({
  __name: "ModalShortcuts",
  setup(n) {
    const e = le(), { enabled: t } = Ne(), { t: s } = e.i18n;
    return (i, l) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: l[0] || (l[0] = (r) => a(e).modal.close())
        }, y(a(s)("Close")), 1)
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
                o("div", null, y(a(s)("Refresh")), 1),
                l[1] || (l[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (u(), p("div", Qc, [
                o("div", null, y(a(s)("Rename")), 1),
                l[2] || (l[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Shift"),
                  ye(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : H("", !0),
              a(t)("delete") ? (u(), p("div", Jc, [
                o("div", null, y(a(s)("Delete")), 1),
                l[3] || (l[3] = o("kbd", null, "Del", -1))
              ])) : H("", !0),
              o("div", Zc, [
                o("div", null, y(a(s)("Escape")), 1),
                l[4] || (l[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", eu, [
                o("div", null, y(a(s)("Select All")), 1),
                l[5] || (l[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (u(), p("div", tu, [
                o("div", null, y(a(s)("Cut")), 1),
                l[6] || (l[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : H("", !0),
              a(t)("copy") ? (u(), p("div", nu, [
                o("div", null, y(a(s)("Copy")), 1),
                l[7] || (l[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : H("", !0),
              a(t)("copy") ? (u(), p("div", ou, [
                o("div", null, y(a(s)("Paste")), 1),
                l[8] || (l[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : H("", !0),
              a(t)("search") ? (u(), p("div", su, [
                o("div", null, y(a(s)("Search")), 1),
                l[9] || (l[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : H("", !0),
              o("div", au, [
                o("div", null, y(a(s)("Toggle Sidebar")), 1),
                l[10] || (l[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", iu, [
                o("div", null, y(a(s)("Open Settings")), 1),
                l[11] || (l[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (u(), p("div", ru, [
                o("div", null, y(a(s)("Toggle Full Screen")), 1),
                l[12] || (l[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ye(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : H("", !0),
              a(t)("preview") ? (u(), p("div", lu, [
                o("div", null, y(a(s)("Preview")), 1),
                l[13] || (l[13] = o("kbd", null, "Space", -1))
              ])) : H("", !0)
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
  return u(), p("svg", cu, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const _o = { render: uu }, _n = "vuefinder:recent-paths", po = 4, pn = typeof window < "u" && typeof window.localStorage < "u";
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
function vu(n) {
  if (!(!pn || !n))
    try {
      const e = mn().filter((t) => t !== n);
      e.unshift(n), window.localStorage.setItem(_n, JSON.stringify(e.slice(0, po)));
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
}, gu = ["onMouseenter", "onClick", "onDblclick"], wu = { class: "vuefinder__go-to-folder-modal__suggestion-label" }, yu = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__suggestion-tag"
}, bu = ["title", "onClick"], ku = ["title", "onClick"], $u = {
  key: 2,
  class: "vuefinder__go-to-folder-modal__empty"
}, xu = {
  key: 3,
  class: "vuefinder__go-to-folder-modal__loading"
}, Su = ["disabled"], Cu = /* @__PURE__ */ de({
  name: "ModalGoToFolder",
  __name: "ModalGoToFolder",
  setup(n) {
    const e = le(), { t } = e.i18n, s = e.fs, i = ne(s.storages), l = D(""), r = D([]), d = D(0), c = D(!1), f = D(!1), h = D(""), _ = D(null), v = D(null);
    let k = 0;
    const b = z(() => i.value ?? []), x = (V) => {
      const O = V ?? "", K = O.indexOf("://");
      if (K === -1)
        return { storage: null, parent: "", filter: O.trim(), hasProtocol: !1 };
      const $ = O.slice(0, K), N = O.slice(K + 3), M = N.lastIndexOf("/"), I = M === -1 ? `${$}://` : `${$}://${N.slice(0, M).replace(/^\/+/, "")}`, B = M === -1 ? N : N.slice(M + 1);
      return { storage: $, parent: I, filter: B, hasProtocol: !0 };
    }, m = (V) => {
      const O = V.toLowerCase();
      r.value = b.value.filter((K) => !O || K.toLowerCase().includes(O)).map((K) => ({
        path: `${K}://`,
        label: `${K}://`,
        kind: "storage"
      })), d.value = r.value.length ? 0 : -1, h.value = "";
    }, w = () => {
      const V = mn();
      r.value = V.map((O) => ({
        path: O,
        label: O,
        kind: "recent"
      })), d.value = r.value.length ? 0 : -1, h.value = "";
    }, g = async (V, O) => {
      const K = ++k;
      c.value = !0, h.value = "";
      try {
        const $ = await e.adapter.list(V);
        if (K !== k) return;
        const N = O.toLowerCase(), M = ($?.files ?? []).filter(
          (I) => I.type === "dir" && (!N || I.basename.toLowerCase().startsWith(N))
        );
        r.value = M.map(
          (I) => ({
            path: I.path,
            label: I.basename,
            kind: "dir"
          })
        ), d.value = r.value.length ? 0 : -1;
      } catch ($) {
        if (K !== k) return;
        r.value = [], d.value = -1, h.value = Te($, t("Folder not found"));
      } finally {
        K === k && (c.value = !1);
      }
    };
    let E = null;
    const C = (V) => {
      E && clearTimeout(E), E = setTimeout(() => L(V), 150);
    }, L = (V) => {
      const O = V.trim();
      if (!O) {
        k++, c.value = !1, w();
        return;
      }
      const { hasProtocol: K, parent: $, filter: N } = x(O);
      if (!K) {
        k++, c.value = !1, m(O);
        return;
      }
      g($, N);
    };
    pe(l, (V) => C(V)), be(() => {
      w(), Oe(() => _.value?.focus());
    });
    const S = () => {
      Oe(() => {
        const V = v.value;
        if (!V) return;
        const O = V.children[d.value];
        if (!O) return;
        const K = V.scrollTop, $ = K + V.clientHeight, N = O.offsetTop, M = N + O.offsetHeight;
        N < K ? V.scrollTop = N : M > $ && (V.scrollTop = M - V.clientHeight);
      });
    }, R = (V) => {
      if (!r.value.length) return;
      const O = r.value.length;
      d.value = ((d.value + V) % O + O) % O, S();
    }, j = (V) => {
      l.value = V.kind === "dir" ? `${V.path}/` : V.path, Oe(() => {
        _.value?.setSelectionRange(l.value.length, l.value.length);
      });
    }, te = (V) => {
      if (!V.includes("://"))
        return {
          ok: !1,
          reason: t("Invalid path format. Path must be in format: storage://path/to/folder")
        };
      const O = V.slice(0, V.indexOf("://"));
      return b.value.includes(O) ? { ok: !0 } : { ok: !1, reason: t('Invalid storage. Storage "%s" is not available.', O) };
    }, Z = async (V) => {
      if (f.value) return;
      const O = V.trim();
      if (!O) return;
      const K = te(O);
      if (!K.ok) {
        h.value = K.reason ?? "";
        return;
      }
      f.value = !0;
      try {
        if (await e.adapter.open(O) === void 0)
          return;
        vu(O), e.modal.close();
      } catch ($) {
        h.value = Te($, t("Failed to navigate to folder")), s.setLoading(!1);
      } finally {
        f.value = !1;
      }
    }, Q = () => {
      const V = r.value[d.value];
      Z(V ? V.path : l.value);
    }, W = (V) => {
      if (!r.value.length) return;
      V.preventDefault();
      const O = r.value[d.value];
      O && j(O);
    }, P = (V) => {
      if (V.kind === "dir") {
        j(V);
        return;
      }
      Z(V.path);
    }, T = (V) => {
      Z(V.path);
    }, U = (V, O) => {
      V.stopPropagation(), V.preventDefault(), fu(O), w();
    }, Y = (V, O) => {
      V.stopPropagation(), V.preventDefault(), l.value = O, Oe(() => {
        _.value?.focus(), _.value?.setSelectionRange(l.value.length, l.value.length);
      });
    }, ue = z(() => {
      const V = b.value[0];
      return V ? `${V}://path/to/folder` : "storage://path/to/folder";
    });
    return (V, O) => (u(), X(Ue, null, {
      buttons: ie(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: f.value,
          onClick: Q
        }, y(a(t)("Go")), 9, Su),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: O[3] || (O[3] = (K) => a(e).modal.close())
        }, y(a(t)("Cancel")), 1)
      ]),
      default: ie(() => [
        o("div", _u, [
          G(je, {
            icon: a(At),
            title: a(t)("Go to Folder")
          }, null, 8, ["icon", "title"]),
          o("div", pu, [
            me(o("input", {
              ref_key: "inputRef",
              ref: _,
              "onUpdate:modelValue": O[0] || (O[0] = (K) => l.value = K),
              class: "vuefinder__go-to-folder-modal__input",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: ue.value,
              onKeydown: [
                O[1] || (O[1] = Ke(_e((K) => R(1), ["prevent"]), ["down"])),
                O[2] || (O[2] = Ke(_e((K) => R(-1), ["prevent"]), ["up"])),
                Ke(_e(Q, ["prevent"]), ["enter"]),
                Ke(W, ["tab"])
              ]
            }, null, 40, mu), [
              [We, l.value]
            ]),
            h.value ? (u(), p("div", hu, y(h.value), 1)) : H("", !0),
            r.value.length ? (u(), p("div", {
              key: 1,
              ref_key: "suggestionListRef",
              ref: v,
              class: "vuefinder__go-to-folder-modal__suggestions"
            }, [
              (u(!0), p(fe, null, he(r.value, (K, $) => (u(), p("div", {
                key: `${K.kind}:${K.path}`,
                class: oe(["vuefinder__go-to-folder-modal__suggestion", {
                  "vuefinder__go-to-folder-modal__suggestion--active": $ === d.value
                }]),
                onMouseenter: (N) => d.value = $,
                onClick: (N) => P(K),
                onDblclick: (N) => T(K)
              }, [
                G(a(ze), { class: "vuefinder__go-to-folder-modal__suggestion-icon" }),
                o("span", wu, y(K.label), 1),
                K.kind === "recent" ? (u(), p("span", yu, y(a(t)("Recent")), 1)) : H("", !0),
                K.kind === "recent" ? (u(), p("button", {
                  key: 1,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-fill",
                  title: a(t)("Edit this path"),
                  onClick: (N) => Y(N, K.path)
                }, [
                  G(a(_o), { class: "vuefinder__go-to-folder-modal__suggestion-fill-icon" })
                ], 8, bu)) : H("", !0),
                K.kind === "recent" ? (u(), p("button", {
                  key: 2,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-remove",
                  title: a(t)("Remove from recent"),
                  onClick: (N) => U(N, K.path)
                }, " × ", 8, ku)) : H("", !0)
              ], 42, gu))), 128))
            ], 512)) : c.value ? H("", !0) : (u(), p("div", $u, [
              l.value.trim() ? (u(), p(fe, { key: 1 }, [
                ye(y(a(t)("No matching folders.")), 1)
              ], 64)) : (u(), p(fe, { key: 0 }, [
                ye(y(a(t)("No recent folders yet.")), 1)
              ], 64))
            ])),
            c.value ? (u(), p("div", xu, y(a(t)("Loading…")), 1)) : H("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
});
function Fu() {
  const n = le(), { enabled: e } = Ne(), { t } = n?.i18n || { t: (h) => h }, s = n?.fs, i = n?.config, l = ne(i.state), r = ne(s.selectedItems), d = ne(s?.storages || []), c = z(() => window.opener !== null || window.name !== "" || window.history.length <= 1);
  return { menuItems: z(() => [
    {
      id: "file",
      label: t("File"),
      items: [
        {
          id: "new-folder",
          label: t("New Folder"),
          action: () => n?.modal?.open(cn, { items: r.value }),
          hidden: () => !e("newfolder")
        },
        {
          id: "new-file",
          label: t("New File"),
          action: () => n?.modal?.open(co, { items: r.value }),
          hidden: () => !e("newfile")
        },
        {
          type: "separator",
          hidden: () => !e("newfolder") && !e("newfile") || !e("upload")
        },
        {
          id: "upload",
          label: t("Upload"),
          action: () => n?.modal?.open(un, { items: r.value }),
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
            r.value.length > 0 && n?.modal?.open(fn, { items: r.value });
          },
          enabled: () => r.value.length > 0,
          hidden: () => !e("archive")
        },
        {
          id: "unarchive",
          label: t("Unarchive"),
          action: () => {
            r.value.length === 1 && r.value[0]?.mime_type === "application/zip" && n?.modal?.open(vn, { items: r.value });
          },
          enabled: () => r.value.length === 1 && r.value[0]?.mime_type === "application/zip",
          hidden: () => !e("unarchive")
        },
        { type: "separator", hidden: () => !e("preview") },
        {
          id: "preview",
          label: t("Preview"),
          action: () => {
            r.value.length === 1 && r.value[0]?.type !== "dir" && n?.modal?.open(Qe, {
              storage: s?.path?.get()?.storage,
              item: r.value[0]
            });
          },
          enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir",
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
                item: r.value[0],
                forceType: "text"
              }),
              enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
            },
            {
              id: "open-as-image",
              label: t("Image"),
              action: () => n?.modal?.open(Qe, {
                storage: s?.path?.get()?.storage,
                item: r.value[0],
                forceType: "image"
              }),
              enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
            }
          ],
          enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir",
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
            enabled: () => r.value.length > 0
          },
          { type: "separator" }
        ] : [],
        ...e("copy") ? [
          {
            id: "cut",
            label: t("Cut"),
            action: () => {
              r.value.length > 0 && s?.setClipboard(
                "cut",
                new Set(r.value.map((h) => $e(h)))
              );
            },
            enabled: () => r.value.length > 0
          },
          {
            id: "copy",
            label: t("Copy"),
            action: () => {
              r.value.length > 0 && s?.setClipboard(
                "copy",
                new Set(r.value.map((h) => $e(h)))
              );
            },
            enabled: () => r.value.length > 0
          },
          {
            id: "paste",
            label: t("Paste"),
            action: () => {
              const h = s?.getClipboard();
              h?.items?.size > 0 && n?.modal?.open(h.type === "cut" ? it : rn, {
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
              if (r.value.length > 0) {
                const h = {
                  storage: s?.path?.get()?.storage || "",
                  path: s?.path?.get()?.path || "",
                  type: "dir"
                };
                n?.modal?.open(it, {
                  items: { from: r.value, to: h }
                });
              }
            },
            enabled: () => r.value.length > 0
          },
          { type: "separator" }
        ] : [],
        {
          id: "copy-path",
          label: t("Copy Path"),
          action: async () => {
            if (r.value.length === 1) {
              const h = r.value[0];
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
            if (r.value.length === 1) {
              const h = r.value[0], _ = n?.adapter?.getDownloadUrl({ path: h.path });
              _ && await Rl(_);
            }
          },
          enabled: () => r.value.length === 1 && r.value[0]?.type !== "dir"
        },
        { type: "separator", hidden: () => !e("rename") && !e("delete") },
        {
          id: "rename",
          label: t("Rename"),
          action: () => {
            r.value.length === 1 && n?.modal?.open(Dt, { items: r.value });
          },
          enabled: () => r.value.length === 1,
          hidden: () => !e("rename")
        },
        {
          id: "delete",
          label: t("Delete"),
          action: () => {
            r.value.length > 0 && n?.modal?.open(Tt, { items: r.value });
          },
          enabled: () => r.value.length > 0,
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
          checked: () => l.value?.view === "grid"
        },
        {
          id: "list-view",
          label: t("List View"),
          action: () => i?.set("view", "list"),
          enabled: () => !0,
          checked: () => l.value?.view === "list"
        },
        { type: "separator" },
        {
          id: "tree-view",
          label: t("Tree View"),
          action: () => i?.toggle("showTreeView"),
          enabled: () => !0,
          checked: () => l.value?.showTreeView
        },
        {
          id: "thumbnails",
          label: t("Show Thumbnails"),
          action: () => i?.toggle("showThumbnails"),
          enabled: () => !0,
          checked: () => l.value?.showThumbnails
        },
        {
          id: "show-hidden-files",
          label: t("Show Hidden Files"),
          action: () => i?.toggle("showHiddenFiles"),
          enabled: () => !0,
          checked: () => l.value?.showHiddenFiles
        },
        { type: "separator", hidden: () => !e("fullscreen") },
        {
          id: "fullscreen",
          label: t("Full Screen"),
          action: () => i?.toggle("fullScreen"),
          enabled: () => e("fullscreen"),
          checked: () => l.value?.fullScreen,
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
          checked: () => l.value?.persist
        },
        {
          id: "metric-units",
          label: t("Metric Units"),
          action: () => {
            i?.toggle("metricUnits"), n.filesize = i?.get("metricUnits") ? jn : Jt, n.emitter.emit("vf-metric-units-saved");
          },
          enabled: () => !0,
          checked: () => l.value?.metricUnits
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
            const _ = `${h}://`;
            n?.adapter.open(_);
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
          action: () => n?.modal?.open(io),
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
          action: () => n?.modal?.open(Gn),
          enabled: () => !0
        }
      ]
    }
  ]), shouldShowExit: c };
}
const Eu = { class: "vuefinder__menubar__container" }, Pu = ["onClick", "onMouseenter"], Tu = { class: "vuefinder__menubar__label" }, Du = ["onMouseenter"], Mu = ["onClick"], Iu = {
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
}, Ru = ["onClick"], Bu = { class: "vuefinder__menubar__dropdown__label" }, zu = /* @__PURE__ */ de({
  __name: "MenuBar",
  setup(n) {
    const { menuItems: e } = Fu(), t = D(null), s = D(!1), i = (f) => {
      t.value === f ? r() : (t.value = f ?? null, s.value = !0);
    }, l = (f) => {
      s.value && (t.value = f ?? null);
    }, r = () => {
      t.value = null, s.value = !1;
    }, d = (f) => {
      r(), f?.();
    }, c = (f) => {
      f.target.closest(".vuefinder__menubar") || r();
    };
    return be(() => {
      document.addEventListener("click", c);
    }), Ae(() => {
      document.removeEventListener("click", c);
    }), (f, h) => (u(), p("div", {
      class: "vuefinder__menubar",
      onClick: h[0] || (h[0] = _e(() => {
      }, ["stop"]))
    }, [
      o("div", Eu, [
        ge(f.$slots, "menubar-start", { menuItems: a(e) }),
        ge(f.$slots, "menu-items", {
          menuItems: a(e),
          handleMenuAction: d
        }, () => [
          (u(!0), p(fe, null, he(a(e), (_) => (u(), p("div", {
            key: _.id,
            class: oe(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": t.value === _.id }]),
            onClick: (v) => i(_.id),
            onMouseenter: (v) => l(_.id)
          }, [
            o("span", Tu, y(_.label), 1),
            t.value === _.id ? (u(), p("div", {
              key: 0,
              class: "vuefinder__menubar__dropdown",
              onMouseenter: (v) => l(_.id)
            }, [
              (u(!0), p(fe, null, he(_.items, (v) => (u(), p("div", {
                key: v.id || v.type,
                class: oe(["vuefinder__menubar__dropdown__item", {
                  "vuefinder__menubar__dropdown__item--separator": v.type === "separator",
                  "vuefinder__menubar__dropdown__item--disabled": v.enabled && !v.enabled(),
                  "vuefinder__menubar__dropdown__item--checked": v.checked && v.checked(),
                  "vuefinder__menubar__dropdown__item--hidden": v.hidden && v.hidden(),
                  "vuefinder__menubar__dropdown__item--has-children": v.items?.length
                }]),
                onClick: _e((k) => v.type !== "separator" && !v.items?.length && (!v.enabled || v.enabled()) ? d(v.action) : null, ["stop"])
              }, [
                v.type !== "separator" ? (u(), p("span", Iu, y(v.label), 1)) : H("", !0),
                v.checked && v.checked() ? (u(), p("span", Au, " ✓ ")) : H("", !0),
                v.items?.length ? (u(), p("svg", Ou, [...h[1] || (h[1] = [
                  o("path", { d: "M6 4l4 4-4 4z" }, null, -1)
                ])])) : H("", !0),
                v.items?.length ? (u(), p("div", Lu, [
                  (u(!0), p(fe, null, he(v.items, (k) => (u(), p("div", {
                    key: k.id,
                    class: oe(["vuefinder__menubar__dropdown__item", {
                      "vuefinder__menubar__dropdown__item--disabled": k.enabled && !k.enabled()
                    }]),
                    onClick: _e((b) => !k.enabled || k.enabled() ? d(k.action) : null, ["stop"])
                  }, [
                    o("span", Bu, y(k.label), 1)
                  ], 10, Ru))), 128))
                ])) : H("", !0)
              ], 10, Mu))), 128))
            ], 40, Du)) : H("", !0)
          ], 42, Pu))), 128))
        ]),
        ge(f.$slots, "menubar-end", { menuItems: a(e) })
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
  return u(), p("svg", Vu, [...e[0] || (e[0] = [
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
  return u(), p("svg", Hu, [...e[0] || (e[0] = [
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
  return u(), p("svg", qu, [...e[0] || (e[0] = [
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
  return u(), p("svg", Yu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Qu = { render: Xu }, Ju = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Zu(n, e) {
  return u(), p("svg", Ju, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const ev = { render: Zu }, tv = { class: "vuefinder__toolbar" }, nv = { class: "vuefinder__toolbar__actions" }, ov = ["title"], sv = ["title"], av = ["title"], iv = ["title"], rv = ["title"], lv = ["title"], dv = ["title"], cv = { class: "vuefinder__toolbar__controls" }, uv = ["title"], vv = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, fv = ["title"], _v = { class: "relative" }, pv = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, mv = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, hv = { class: "vuefinder__toolbar__dropdown-content" }, gv = { class: "vuefinder__toolbar__dropdown-section" }, wv = { class: "vuefinder__toolbar__dropdown-label" }, yv = { class: "vuefinder__toolbar__dropdown-row" }, bv = { value: "name" }, kv = { value: "size" }, $v = { value: "modified" }, xv = { value: "" }, Sv = { value: "asc" }, Cv = { value: "desc" }, Fv = { class: "vuefinder__toolbar__dropdown-section" }, Ev = { class: "vuefinder__toolbar__dropdown-label" }, Pv = { class: "vuefinder__toolbar__dropdown-options" }, Tv = { class: "vuefinder__toolbar__dropdown-option" }, Dv = { class: "vuefinder__toolbar__option-text" }, Mv = { class: "vuefinder__toolbar__dropdown-option" }, Iv = { class: "vuefinder__toolbar__option-text" }, Av = { class: "vuefinder__toolbar__dropdown-option" }, Ov = { class: "vuefinder__toolbar__option-text" }, Lv = { class: "vuefinder__toolbar__dropdown-toggle" }, Rv = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, Bv = { class: "vuefinder__toolbar__dropdown-reset" }, zv = ["title"], Vv = ["title"], Uv = /* @__PURE__ */ de({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(n) {
    const e = le(), { enabled: t } = Ne(), { t: s } = e.i18n, i = e.fs, l = e.config, r = ne(l.state), d = ne(i.selectedItems), c = ne(i.sort), f = ne(i.filter);
    pe(
      () => r.value.fullScreen,
      () => {
        const m = document.querySelector("body");
        m && (m.style.overflow = r.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const h = D(!1), _ = (m) => {
      m.target.closest(".vuefinder__toolbar__dropdown-container") || (h.value = !1);
    };
    be(() => {
      const m = document.querySelector("body");
      m && r.value.fullScreen && setTimeout(() => m.style.overflow = "hidden"), document.addEventListener("click", _);
    }), Ae(() => {
      document.removeEventListener("click", _);
    });
    const v = D({
      sortBy: "name",
      // name | size | type | modified
      sortOrder: "",
      // '' | asc | desc (empty means no sorting)
      filterKind: "all",
      // all | files | folders
      showHidden: r.value.showHiddenFiles
      // Initialize with config store default
    });
    pe(
      () => v.value.sortBy,
      (m) => {
        if (!v.value.sortOrder) {
          i.clearSort();
          return;
        }
        m === "name" ? i.setSort("basename", v.value.sortOrder) : m === "size" ? i.setSort("file_size", v.value.sortOrder) : m === "modified" && i.setSort("last_modified", v.value.sortOrder);
      }
    ), pe(
      () => v.value.sortOrder,
      (m) => {
        if (!m) {
          i.clearSort();
          return;
        }
        v.value.sortBy === "name" ? i.setSort("basename", m) : v.value.sortBy === "size" ? i.setSort("file_size", m) : v.value.sortBy === "modified" && i.setSort("last_modified", m);
      }
    ), pe(
      c,
      (m) => {
        m.active ? (m.column === "basename" ? v.value.sortBy = "name" : m.column === "file_size" ? v.value.sortBy = "size" : m.column === "last_modified" && (v.value.sortBy = "modified"), v.value.sortOrder = m.order) : v.value.sortOrder = "";
      },
      { immediate: !0 }
    ), pe(
      () => v.value.filterKind,
      (m) => {
        i.setFilter(m, r.value.showHiddenFiles);
      }
    ), pe(
      () => v.value.showHidden,
      (m) => {
        l.set("showHiddenFiles", m), i.setFilter(v.value.filterKind, m);
      }
    ), pe(
      f,
      (m) => {
        v.value.filterKind = m.kind;
      },
      { immediate: !0 }
    ), pe(
      () => r.value.showHiddenFiles,
      (m) => {
        v.value.showHidden = m, i.setFilter(v.value.filterKind, m);
      },
      { immediate: !0 }
    );
    const k = () => l.set("view", r.value.view === "grid" ? "list" : "grid"), b = z(() => f.value.kind !== "all" || !r.value.showHiddenFiles || c.value.active), x = () => {
      v.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, l.set("showHiddenFiles", !0), i.clearSort(), i.clearFilter();
    };
    return (m, w) => ge(m.$slots, "toolbar-items", {}, () => [
      o("div", tv, [
        o("div", nv, [
          a(t)("newfolder") ? (u(), p("div", {
            key: 0,
            class: "mx-1.5",
            title: a(s)("New Folder"),
            onClick: w[0] || (w[0] = (g) => a(e).modal.open(cn, { items: a(d) }))
          }, [
            G(a(ro))
          ], 8, ov)) : H("", !0),
          a(t)("newfile") ? (u(), p("div", {
            key: 1,
            class: "mx-1.5",
            title: a(s)("New File"),
            onClick: w[1] || (w[1] = (g) => a(e).modal.open(co, { items: a(d) }))
          }, [
            G(a(lo))
          ], 8, sv)) : H("", !0),
          a(t)("rename") ? (u(), p("div", {
            key: 2,
            class: "mx-1.5",
            title: a(s)("Rename"),
            onClick: w[2] || (w[2] = (g) => a(d).length !== 1 || a(e).modal.open(Dt, { items: a(d) }))
          }, [
            G(a(Xn), {
              class: oe(a(d).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, av)) : H("", !0),
          a(t)("delete") ? (u(), p("div", {
            key: 3,
            class: "mx-1.5",
            title: a(s)("Delete"),
            onClick: w[3] || (w[3] = (g) => !a(d).length || a(e).modal.open(Tt, { items: a(d) }))
          }, [
            G(a(Yn), {
              class: oe(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, iv)) : H("", !0),
          a(t)("upload") ? (u(), p("div", {
            key: 4,
            class: "mx-1.5",
            title: a(s)("Upload"),
            onClick: w[4] || (w[4] = (g) => a(e).modal.open(un, { items: a(d) }))
          }, [
            G(a(uo))
          ], 8, rv)) : H("", !0),
          a(t)("unarchive") && a(d).length === 1 && a(d)[0].mime_type === "application/zip" ? (u(), p("div", {
            key: 5,
            class: "mx-1.5",
            title: a(s)("Unarchive"),
            onClick: w[5] || (w[5] = (g) => !a(d).length || a(e).modal.open(vn, { items: a(d) }))
          }, [
            G(a(vo), {
              class: oe(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, lv)) : H("", !0),
          a(t)("archive") ? (u(), p("div", {
            key: 6,
            class: "mx-1.5",
            title: a(s)("Archive"),
            onClick: w[6] || (w[6] = (g) => !a(d).length || a(e).modal.open(fn, { items: a(d) }))
          }, [
            G(a(fo), {
              class: oe(a(d).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
            }, null, 8, ["class"])
          ], 8, dv)) : H("", !0)
        ]),
        o("div", cv, [
          a(t)("search") ? (u(), p("div", {
            key: 0,
            class: "mx-1.5",
            title: a(s)("Search Files"),
            onClick: w[7] || (w[7] = (g) => a(e).modal.open(dn))
          }, [
            G(a(ln), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
          ], 8, uv)) : H("", !0),
          o("div", vv, [
            o("div", {
              title: a(s)("Filter"),
              class: "vuefinder__toolbar__dropdown-trigger",
              onClick: w[8] || (w[8] = (g) => h.value = !h.value)
            }, [
              o("div", _v, [
                G(a(ev), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
                b.value ? (u(), p("div", pv)) : H("", !0)
              ])
            ], 8, fv),
            h.value ? (u(), p("div", mv, [
              o("div", hv, [
                o("div", gv, [
                  o("div", wv, y(a(s)("Sorting")), 1),
                  o("div", yv, [
                    me(o("select", {
                      "onUpdate:modelValue": w[9] || (w[9] = (g) => v.value.sortBy = g),
                      class: "vuefinder__toolbar__dropdown-select"
                    }, [
                      o("option", bv, y(a(s)("Name")), 1),
                      o("option", kv, y(a(s)("Size")), 1),
                      o("option", $v, y(a(s)("Date")), 1)
                    ], 512), [
                      [Kt, v.value.sortBy]
                    ]),
                    me(o("select", {
                      "onUpdate:modelValue": w[10] || (w[10] = (g) => v.value.sortOrder = g),
                      class: "vuefinder__toolbar__dropdown-select"
                    }, [
                      o("option", xv, y(a(s)("None")), 1),
                      o("option", Sv, y(a(s)("Asc")), 1),
                      o("option", Cv, y(a(s)("Desc")), 1)
                    ], 512), [
                      [Kt, v.value.sortOrder]
                    ])
                  ])
                ]),
                o("div", Fv, [
                  o("div", Ev, y(a(s)("Show")), 1),
                  o("div", Pv, [
                    o("label", Tv, [
                      me(o("input", {
                        "onUpdate:modelValue": w[11] || (w[11] = (g) => v.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "all",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [zt, v.value.filterKind]
                      ]),
                      o("span", Dv, y(a(s)("All items")), 1)
                    ]),
                    o("label", Mv, [
                      me(o("input", {
                        "onUpdate:modelValue": w[12] || (w[12] = (g) => v.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "files",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [zt, v.value.filterKind]
                      ]),
                      o("span", Iv, y(a(s)("Files only")), 1)
                    ]),
                    o("label", Av, [
                      me(o("input", {
                        "onUpdate:modelValue": w[13] || (w[13] = (g) => v.value.filterKind = g),
                        type: "radio",
                        name: "filterKind",
                        value: "folders",
                        class: "vuefinder__toolbar__radio"
                      }, null, 512), [
                        [zt, v.value.filterKind]
                      ]),
                      o("span", Ov, y(a(s)("Folders only")), 1)
                    ])
                  ])
                ]),
                o("div", Lv, [
                  o("label", Rv, y(a(s)("Show hidden files")), 1),
                  me(o("input", {
                    id: "showHidden",
                    "onUpdate:modelValue": w[14] || (w[14] = (g) => v.value.showHidden = g),
                    type: "checkbox",
                    class: "vuefinder__toolbar__checkbox"
                  }, null, 512), [
                    [rt, v.value.showHidden]
                  ])
                ]),
                o("div", Bv, [
                  o("button", {
                    class: "vuefinder__toolbar__reset-button",
                    onClick: x
                  }, y(a(s)("Reset")), 1)
                ])
              ])
            ])) : H("", !0)
          ]),
          a(t)("fullscreen") ? (u(), p("div", {
            key: 1,
            class: "mx-1.5",
            title: a(s)("Toggle Full Screen"),
            onClick: w[15] || (w[15] = (g) => a(l).toggle("fullScreen"))
          }, [
            a(r).fullScreen ? (u(), X(a(Ku), {
              key: 0,
              class: "vf-toolbar-icon"
            })) : (u(), X(a(Nu), {
              key: 1,
              class: "vf-toolbar-icon"
            }))
          ], 8, zv)) : H("", !0),
          o("div", {
            class: "mx-1.5",
            title: a(s)("Change View"),
            onClick: w[16] || (w[16] = (g) => k())
          }, [
            a(r).view === "grid" ? (u(), X(a(Gu), {
              key: 0,
              class: "vf-toolbar-icon"
            })) : H("", !0),
            a(r).view === "list" ? (u(), X(a(Qu), {
              key: 1,
              class: "vf-toolbar-icon"
            })) : H("", !0)
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
  return u(), p("svg", Nv, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const jv = { render: Hv }, Kv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function qv(n, e) {
  return u(), p("svg", Kv, [...e[0] || (e[0] = [
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
  return u(), p("svg", Gv, [...e[0] || (e[0] = [
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
  return u(), p("svg", Qv, [...e[0] || (e[0] = [
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
  return u(), p("svg", ef, [...e[0] || (e[0] = [
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
  const t = "vfDragEnterCounter", s = n.fs, i = ne(s.selectedItems);
  function l(_, v) {
    return !!(!_ || _.type !== "dir" || _.path === v || _.path.startsWith(`${v}/`) || i.value.some((b) => b.path === v ? !1 : !!(_.path === b.path || _.path.startsWith(`${b.path}/`))));
  }
  function r(_, v) {
    if (_.isExternalDrag)
      return;
    if (!(n.features?.move ?? !1)) {
      _.dataTransfer && (_.dataTransfer.dropEffect = "none", _.dataTransfer.effectAllowed = "none");
      return;
    }
    _.preventDefault();
    const b = s.getDraggedItem(), x = s.sortedFiles.get().find((m) => $e(m) === b)?.path ?? "";
    l(v, x) ? _.dataTransfer && (_.dataTransfer.dropEffect = "none", _.dataTransfer.effectAllowed = "none") : (_.dataTransfer && (_.dataTransfer.dropEffect = "copy", _.dataTransfer.effectAllowed = "all"), _.currentTarget.classList.add(...e));
  }
  function d(_) {
    if (_.isExternalDrag || !(n.features?.move ?? !1))
      return;
    _.preventDefault();
    const k = _.currentTarget, b = Number(k.dataset[t] || 0);
    k.dataset[t] = String(b + 1);
  }
  function c(_) {
    if (_.isExternalDrag || !(n.features?.move ?? !1))
      return;
    _.preventDefault();
    const k = _.currentTarget, x = Number(k.dataset[t] || 0) - 1;
    x <= 0 ? (delete k.dataset[t], k.classList.remove(...e)) : k.dataset[t] = String(x);
  }
  function f(_, v) {
    if (_.isExternalDrag || !(n.features?.move ?? !1) || !v) return;
    _.preventDefault();
    const b = _.currentTarget;
    delete b.dataset[t], b.classList.remove(...e);
    const x = _.dataTransfer?.getData("items") || "[]", w = JSON.parse(x).map((g) => s.sortedFiles.get().find((E) => $e(E) === g)).filter((g) => !!g);
    s.clearDraggedItem(), n.modal.open(it, { items: { from: w, to: v } });
  }
  function h(_) {
    return {
      dragover: (v) => r(v, _),
      dragenter: d,
      dragleave: c,
      drop: (v) => f(v, _)
    };
  }
  return { events: h };
}
function of() {
  const n = le(), e = Ve(n), t = n.fs, s = n.config, { t: i } = n.i18n, l = ne(t.path), r = () => {
    const _ = t.path.get().path;
    n.adapter.invalidateListQuery(_), n.adapter.open(_);
  }, d = (_) => {
    n.adapter.open(_);
  };
  return {
    currentPath: l,
    refresh: r,
    goTo: d,
    goUp: () => {
      const _ = t.path.get()?.breadcrumb ?? [], v = _[_.length - 2]?.path ?? `${t.path.get()?.storage ?? "local"}://`;
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
const sf = { class: "vuefinder__breadcrumb__container" }, af = ["title"], rf = ["title"], lf = ["title"], df = ["title"], cf = { class: "vuefinder__breadcrumb__path-container" }, uf = { class: "vuefinder__breadcrumb__list" }, vf = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, ff = { class: "relative" }, _f = ["title", "onClick"], pf = ["title"], mf = { class: "vuefinder__breadcrumb__path-mode" }, hf = { class: "vuefinder__breadcrumb__path-mode-content" }, gf = ["title"], wf = { class: "vuefinder__breadcrumb__path-text" }, yf = ["title"], bf = ["data-theme"], kf = ["onClick"], $f = { class: "vuefinder__breadcrumb__hidden-item-content" }, xf = { class: "vuefinder__breadcrumb__hidden-item-text" }, ct = 5, Tn = 1, Sf = 40, Cf = /* @__PURE__ */ de({
  __name: "Breadcrumb",
  setup(n) {
    const e = le(), t = of(), { t: s } = e.i18n, i = e.fs, l = e.config, r = ne(l.state), d = ne(i.path), c = ne(i.loading), f = D(null), h = no(0, 100), _ = D(5), v = D(!1), k = D(!1), b = z(() => d.value?.breadcrumb ?? []), x = /* @__PURE__ */ new Map();
    function m($, N) {
      return $.length > N ? [$.slice(-N), $.slice(0, -N)] : [$, []];
    }
    const w = z(
      () => m(b.value, _.value)[0]
    ), g = z(
      () => m(b.value, _.value)[1]
    );
    function E() {
      const $ = b.value, N = h.value;
      if (!$.length || N <= 0) return null;
      let M = 0, I = 0;
      for (let B = $.length - 1; B >= 0; B--) {
        const F = $[B]?.name;
        if (!F) continue;
        const A = x.get(F);
        if (A === void 0) return null;
        if (M + A > N - Sf || (M += A, I++, I >= ct)) break;
      }
      return I < Tn && (I = Tn), I > ct && (I = ct), I;
    }
    function C() {
      if (!f.value) return;
      const $ = f.value.children, N = w.value;
      for (let M = 0; M < $.length; M++) {
        const I = N[M]?.name;
        if (!I) continue;
        const B = $[M].offsetWidth;
        B > 0 && x.set(I, B);
      }
    }
    async function L() {
      if (!b.value.length) {
        _.value = ct;
        return;
      }
      const $ = E();
      if ($ !== null) {
        _.value = $;
        return;
      }
      _.value = ct, await Oe(), C();
      const N = E();
      N !== null && (_.value = N);
    }
    pe(h, L), pe(b, L, { immediate: !0 });
    const S = () => {
      f.value && (h.value = f.value.offsetWidth);
    }, R = D(null);
    be(() => {
      R.value = new ResizeObserver(S), f.value && R.value.observe(f.value);
    }), Ae(() => {
      R.value && R.value.disconnect();
    });
    const j = $t(e, ["vuefinder__drag-over"]);
    function te($ = null) {
      $ ??= b.value.length - 2;
      const N = {
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
      return b.value[$] ?? N;
    }
    const Z = () => {
      t.refresh();
    }, Q = () => {
      w.value.length > 0 && t.goUp();
    }, W = ($) => {
      e.adapter.open($.path), v.value = !1;
    }, P = () => {
      v.value && (v.value = !1);
    }, T = {
      mounted($, N) {
        $.clickOutsideEvent = function(M) {
          $ === M.target || $.contains(M.target) || N.value();
        }, document.body.addEventListener("click", $.clickOutsideEvent);
      },
      beforeUnmount($) {
        document.body.removeEventListener("click", $.clickOutsideEvent);
      }
    }, U = () => {
      t.toggleTreeView();
    }, Y = D({
      x: 0,
      y: 0
    }), ue = ($, N = null) => {
      if ($.currentTarget instanceof HTMLElement) {
        const { x: M, y: I, height: B } = $.currentTarget.getBoundingClientRect();
        Y.value = { x: M, y: I + B };
      }
      v.value = N ?? !v.value;
    }, V = () => {
      k.value = !k.value;
    }, O = async () => {
      await t.copyCurrentPath();
    }, K = () => {
      k.value = !1;
    };
    return ($, N) => (u(), p("div", sf, [
      ge($.$slots, "breadcrumb-actions", {}, () => [
        o("span", {
          title: a(s)("Toggle Tree View")
        }, [
          G(a(Zv), {
            class: oe(["vuefinder__breadcrumb__toggle-tree", a(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
            onClick: U
          }, null, 8, ["class"])
        ], 8, af),
        o("span", {
          title: a(s)("Go up a directory")
        }, [
          G(a(_o), qe({
            class: b.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
          }, et(b.value.length ? a(j).events(te()) : {}), { onClick: Q }), null, 16, ["class"])
        ], 8, rf),
        a(i).isLoading() ? (u(), p("span", {
          key: 1,
          title: a(s)("Cancel")
        }, [
          G(a(Qn), {
            onClick: N[0] || (N[0] = (M) => a(e).emitter.emit("vf-fetch-abort"))
          })
        ], 8, df)) : (u(), p("span", {
          key: 0,
          title: a(s)("Refresh")
        }, [
          G(a(jv), { onClick: Z })
        ], 8, lf))
      ]),
      me(o("div", cf, [
        o("div", null, [
          G(a(Wv), qe({ class: "vuefinder__breadcrumb__home-icon" }, et(a(j).events(te(-1))), {
            onClick: N[1] || (N[1] = _e((M) => a(e).adapter.open(a(d).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", uf, [
          g.value.length ? me((u(), p("div", vf, [
            N[3] || (N[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", ff, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: N[2] || (N[2] = (M) => ue(M, !0)),
                onClick: _e(ue, ["stop"])
              }, [
                G(a(ao), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [T, P]
          ]) : H("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: f,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), p(fe, null, he(w.value, (M, I) => (u(), p("div", { key: I }, [
            N[4] || (N[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", qe({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: M.basename
            }, et(a(j).events(M), !0), {
              onClick: _e((B) => a(e).adapter.open(M.path), ["stop"])
            }), y(M.name), 17, _f)
          ]))), 128))
        ], 512),
        a(l).get("loadingIndicator") === "circular" && a(c) ? (u(), X(a(Ot), { key: 0 })) : H("", !0),
        o("span", {
          title: a(s)("Toggle Path Copy Mode"),
          onClick: V
        }, [
          G(a(nf), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, pf)
      ], 512), [
        [Ge, !k.value]
      ]),
      me(o("div", mf, [
        o("div", hf, [
          o("div", {
            title: a(s)("Copy Path")
          }, [
            G(a(sn), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: O
            })
          ], 8, gf),
          o("div", wf, y(a(d).path), 1),
          o("div", {
            title: a(s)("Exit")
          }, [
            G(a(Xv), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: K
            })
          ], 8, yf)
        ])
      ], 512), [
        [Ge, k.value]
      ]),
      (u(), X(bt, { to: "body" }, [
        o("div", null, [
          me(o("div", {
            style: Ie({
              position: "absolute",
              top: Y.value.y + "px",
              left: Y.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a(e).theme.current
          }, [
            (u(!0), p(fe, null, he(g.value, (M, I) => (u(), p("div", qe({
              key: I,
              class: "vuefinder__breadcrumb__hidden-item"
            }, et(a(j).events(M), !0), {
              onClick: (B) => W(M)
            }), [
              o("div", $f, [
                o("span", null, [
                  G(a(ze), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", xf, y(M.name), 1)
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
function Ef(n, e) {
  return u(), p("svg", Ff, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Dn = { render: Ef }, Pf = { class: "vuefinder__drag-item__container" }, Tf = { class: "vuefinder__drag-item__count" }, Df = /* @__PURE__ */ de({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(n) {
    const e = n;
    return (t, s) => (u(), p("div", Pf, [
      e.count > 1 ? (u(), X(a(Dn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : H("", !0),
      G(a(Dn), { class: "vuefinder__drag-item__icon" }),
      o("div", Tf, y(e.count), 1)
    ]));
  }
}), Mf = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, Mn = /* @__PURE__ */ de({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(n) {
    const e = n, t = le(), s = ne(t.config.state), i = z(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), l = z(() => {
      const d = i.value, c = s.value?.listIconSize, f = s.value?.gridIconSize;
      return s.value?.gridItemWidth, s.value?.gridItemHeight, e.view === "list" || d === "small" ? {
        "--vf-icon-size": `${c ?? 16}px`
      } : {
        "--vf-icon-size": `${f ?? 48}px`
      };
    }), r = {
      app: t,
      config: s.value,
      item: e.item,
      view: e.view
    };
    return (d, c) => (u(), p("div", {
      class: oe(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": i.value === "small",
        "vuefinder__item-icon--large": i.value === "large",
        "vuefinder__item-icon--grid": n.view === "grid",
        "vuefinder__item-icon--list": n.view === "list"
      }]),
      style: Ie(l.value)
    }, [
      ge(d.$slots, "icon", Ce(Fe(r)), () => [
        n.item.type === "dir" ? (u(), X(a(ze), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), X(a(ht), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        n.ext && n.item.type !== "dir" && n.item.extension ? (u(), p("div", Mf, y(n.item.extension.substring(0, 3)), 1)) : H("", !0)
      ])
    ], 6));
  }
}), If = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Af(n, e) {
  return u(), p("svg", If, [...e[0] || (e[0] = [
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
}, Gf = /* @__PURE__ */ de({
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
    const t = n, s = e, i = le(), l = i.fs, r = i.config, d = z(() => {
      const W = i.selectionFilterType;
      return !W || W === "both" ? !0 : W === "files" && t.item.type === "file" || W === "dirs" && t.item.type === "dir";
    }), c = z(() => {
      const W = i.selectionFilterMimeIncludes;
      return !W || !W.length || t.item.type === "dir" ? !0 : t.item.mime_type ? W.some((P) => t.item.mime_type?.startsWith(P)) : !1;
    }), f = z(() => d.value && c.value), h = z(() => t.item.type === "dir" || f.value), _ = z(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      // Disabled appearance: only for items the user cannot interact with at all.
      h.value ? "" : "vf-explorer-item--unselectable",
      // Excluded from rectangle selection but otherwise interactive (e.g. a
      // folder while selectionFilterType is 'files' — user can still navigate).
      h.value && !f.value ? "vf-explorer-item--no-select" : ""
    ]), v = z(() => ({
      opacity: t.isDragging || l.isCut($e(t.item)) || !h.value ? 0.5 : ""
    })), k = D(null);
    let b = !1, x = null, m = null, w = !1;
    const { enabled: g } = Ne(), E = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), C = z(() => E ? !1 : g("move")), L = () => {
      x && (clearTimeout(x), x = null), m = null;
    }, S = (W) => {
      L(), m = W, w = !1, W.stopPropagation(), x = setTimeout(() => {
        !m || x === null || (w = !0, m.cancelable && m.preventDefault(), m.stopPropagation(), s("contextmenu", m), L());
      }, 500);
    }, R = (W) => {
      if (w) {
        W.preventDefault(), W.stopPropagation(), L();
        return;
      }
      setTimeout(() => {
        w || (L(), Q(W));
      }, 100);
    }, j = (W) => {
      if (!m) return;
      const P = m.touches[0] || m.changedTouches[0], T = W.touches[0] || W.changedTouches[0];
      if (P && T) {
        const U = Math.abs(T.clientX - P.clientX), Y = Math.abs(T.clientY - P.clientY);
        (U > 15 || Y > 15) && L();
      }
    }, te = (W) => {
      E && W.type !== "click" || s("click", W);
    }, Z = (W) => {
      if (w)
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
    return (W, P) => (u(), p("div", {
      class: oe(_.value),
      style: Ie(v.value),
      "data-key": a($e)(n.item),
      "data-row": n.rowIndex,
      "data-col": n.colIndex,
      draggable: C.value,
      onTouchstartCapture: P[1] || (P[1] = (T) => S(T)),
      onTouchendCapture: P[2] || (P[2] = (T) => R(T)),
      onTouchmoveCapture: j,
      onTouchcancelCapture: P[3] || (P[3] = () => L()),
      onClick: te,
      onDblclick: P[4] || (P[4] = (T) => s("dblclick", T)),
      onContextmenu: P[5] || (P[5] = _e((T) => s("contextmenu", T), ["prevent", "stop"])),
      onDragstart: Z,
      onDragend: P[6] || (P[6] = (T) => s("dragend", T))
    }, [
      n.view === "grid" ? (u(), p("div", Lf, [
        a(l).isReadOnly(n.item) ? (u(), X(a(In), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : H("", !0),
        o("div", Rf, [
          (n.item.mime_type ?? "").startsWith("image") && n.showThumbnails ? (u(), p("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": n.item.previewUrl ?? a(i).adapter.getPreviewUrl({ path: n.item.path }),
            alt: n.item.basename,
            onTouchstart: P[0] || (P[0] = (T) => T.preventDefault())
          }, null, 40, Bf)) : (u(), X(Mn, {
            key: 1,
            item: n.item,
            ext: !0,
            view: n.view
          }, {
            icon: ie((T) => [
              ge(W.$slots, "icon", Ce(Fe(T)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        o("span", zf, y(a(Yt)(n.item.basename)), 1)
      ])) : (u(), p("div", Vf, [
        o("div", Uf, [
          o("div", Nf, [
            G(Mn, {
              item: n.item,
              view: n.view
            }, {
              icon: ie((T) => [
                ge(W.$slots, "icon", Ce(Fe(T)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          o("span", Hf, y(n.item.basename), 1),
          o("div", null, [
            a(l).isReadOnly(n.item) ? (u(), X(a(In), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : H("", !0)
          ])
        ]),
        n.showPath ? (u(), p("div", jf, y(n.item.path), 1)) : H("", !0),
        n.showPath ? H("", !0) : (u(), p("div", Kf, [
          n.item.file_size ? (u(), p("div", qf, y(a(i).filesize(n.item.file_size)), 1)) : H("", !0)
        ])),
        !n.showPath && n.item.last_modified ? (u(), p("div", Wf, y(new Date(n.item.last_modified * 1e3).toLocaleString()), 1)) : H("", !0)
      ])),
      a(g)("pinned") && a(r).get("pinnedFolders").find((T) => T.path === n.item.path) ? (u(), X(a(gt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : H("", !0)
    ], 46, Of));
  }
}), Yf = ["data-row"], An = /* @__PURE__ */ de({
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
    const t = n, s = e, i = z(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), l = z(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), r = z(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (d, c) => (u(), p("div", {
      class: oe(i.value),
      "data-row": n.rowIndex,
      style: Ie(l.value)
    }, [
      o("div", {
        class: oe(["grid justify-self-start", { "w-full": n.view === "list" }]),
        style: Ie(r.value)
      }, [
        (u(!0), p(fe, null, he(n.items, (f, h) => (u(), X(Gf, qe({
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
          onClick: c[0] || (c[0] = (_) => s("click", _)),
          onDblclick: c[1] || (c[1] = (_) => s("dblclick", _)),
          onContextmenu: c[2] || (c[2] = (_) => s("contextmenu", _)),
          onDragstart: c[3] || (c[3] = (_) => s("dragstart", _)),
          onDragend: c[4] || (c[4] = (_) => s("dragend", _))
        }), {
          icon: ie((_) => [
            ge(d.$slots, "icon", qe({ ref_for: !0 }, _))
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
  return u(), p("svg", Xf, [...e[0] || (e[0] = [
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
  return u(), p("svg", Zf, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const t_ = { render: e_ }, jt = /* @__PURE__ */ de({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(n) {
    return (e, t) => (u(), p("div", null, [
      n.direction === "asc" ? (u(), X(a(Jf), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : H("", !0),
      n.direction === "desc" ? (u(), X(a(t_), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : H("", !0)
    ]));
  }
}), n_ = { class: "vuefinder__explorer__header" }, o_ = /* @__PURE__ */ de({
  __name: "ExplorerHeader",
  setup(n) {
    const e = le(), t = e.fs, { t: s } = e.i18n, i = ne(t.sort);
    return (l, r) => (u(), p("div", n_, [
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: r[0] || (r[0] = (d) => a(t).toggleSort("basename"))
      }, [
        ye(y(a(s)("Name")) + " ", 1),
        me(G(jt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "basename"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: r[1] || (r[1] = (d) => a(t).toggleSort("file_size"))
      }, [
        ye(y(a(s)("Size")) + " ", 1),
        me(G(jt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [Ge, a(i).active && a(i).column === "file_size"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: r[2] || (r[2] = (d) => a(t).toggleSort("last_modified"))
      }, [
        ye(y(a(s)("Date")) + " ", 1),
        me(G(jt, {
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
    overscan: l = 2,
    containerPadding: r = 48,
    lockItemsPerRow: d
  } = e, c = n, f = () => typeof i == "number" ? i : i.value, h = () => s ? typeof s == "number" ? s : s.value : 100, _ = () => r ? typeof r == "number" ? r : r.value : 0, v = D(0), k = D(6), b = D(600);
  let x = null;
  const m = z(() => Math.ceil(c.value.length / k.value)), w = z(() => m.value * f()), g = z(() => {
    const Q = f(), W = Math.max(0, Math.floor(v.value / Q) - l), P = Math.min(
      m.value,
      Math.ceil((v.value + b.value) / Q) + l
    );
    return { start: W, end: P };
  }), E = z(() => {
    const { start: Q, end: W } = g.value;
    return Array.from({ length: W - Q }, (P, T) => Q + T);
  }), C = () => b.value, L = () => typeof d == "object" ? d.value : !1, S = () => {
    if (L()) {
      k.value = 1;
      return;
    }
    if (t.value) {
      const Q = _(), W = t.value.clientWidth - Q, P = h();
      P > 0 && (k.value = Math.max(Math.floor(W / P), 2));
    }
  }, R = (Q) => {
    const W = Q.target;
    v.value = W.scrollTop;
  };
  pe(
    () => c.value.length,
    () => {
      S();
    }
  ), s && typeof s != "number" && pe(s, () => {
    S();
  }), r && typeof r != "number" && pe(r, () => {
    S();
  }), i && typeof i != "number" && pe(i, () => {
  });
  const j = (Q, W) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const P = W * k.value;
    return Q.slice(P, P + k.value);
  }, te = (Q, W, P, T, U) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const Y = [];
    for (let ue = W; ue <= P; ue++)
      for (let V = T; V <= U; V++) {
        const O = ue * k.value + V;
        O < Q.length && Q[O] && Y.push(Q[O]);
      }
    return Y;
  }, Z = (Q) => ({
    row: Math.floor(Q / k.value),
    col: Q % k.value
  });
  return be(async () => {
    await Oe(), t.value && (b.value = t.value.clientHeight || 600), S(), window.addEventListener("resize", () => {
      t.value && (b.value = t.value.clientHeight || 600), S();
    }), t.value && "ResizeObserver" in window && (x = new ResizeObserver((Q) => {
      const W = Q[0];
      W && (b.value = Math.round(W.contentRect.height)), S();
    }), x.observe(t.value));
  }), Ae(() => {
    window.removeEventListener("resize", S), x && (x.disconnect(), x = null);
  }), {
    scrollTop: v,
    itemsPerRow: k,
    totalRows: m,
    totalHeight: w,
    visibleRange: g,
    visibleRows: E,
    updateItemsPerRow: S,
    handleScroll: R,
    getRowItems: j,
    getItemsInRange: te,
    getItemPosition: Z,
    getContainerHeight: C
  };
}
function a_(n) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: s,
    getKey: i,
    selectionObject: l,
    rowHeight: r,
    itemWidth: d,
    osInstance: c
  } = n, f = () => typeof d == "number" ? d : d.value, h = Math.floor(Math.random() * 2 ** 32).toString(), _ = le(), v = _.fs, k = ne(v.selectedKeys), b = ne(v.sortedFiles), x = z(() => {
    const V = /* @__PURE__ */ new Map();
    return b.value && b.value.forEach((O) => {
      V.set(i(O), O);
    }), V;
  }), m = D(/* @__PURE__ */ new Set()), w = D(!1), g = D(!1), E = (V) => V.map((O) => O.getAttribute("data-key")).filter((O) => !!O), C = (V) => {
    V.selection.clearSelection(!0, !0);
  }, L = (V) => {
    if (k.value && k.value.size > 0) {
      const O = document.querySelectorAll(`.file-item-${h}[data-key]`), K = /* @__PURE__ */ new Map();
      O.forEach((N) => {
        const M = N.getAttribute("data-key");
        M && K.set(M, N);
      });
      const $ = [];
      k.value.forEach((N) => {
        const M = K.get(N);
        M && S(N) && $.push(M);
      }), $.forEach((N) => {
        V.selection.select(N, !0);
      });
    }
  }, S = (V) => {
    const O = x.value.get(V);
    if (!O) return !1;
    const K = _.selectionFilterType, $ = _.selectionFilterMimeIncludes;
    return K === "files" && O.type === "dir" || K === "dirs" && O.type === "file" ? !1 : $ && Array.isArray($) && $.length > 0 ? O.type === "dir" ? !0 : O.mime_type ? $.some((N) => O.mime_type?.startsWith(N)) : !1 : !0;
  }, R = (V) => {
    if (_.selectionMode === "single")
      return !1;
    w.value = !1, !V.event?.metaKey && !V.event?.ctrlKey && (g.value = !0), V.selection.resolveSelectables(), C(V), L(V);
  }, j = D(0), te = ({ event: V, selection: O }) => {
    j.value = (l.value?.getAreaLocation().y1 ?? 0) - (_.root.getBoundingClientRect().top ?? 0);
    const K = document.querySelector(
      ".selection-area-container"
    );
    if (K && (K.dataset.theme = _.theme.current), _.selectionMode === "single")
      return;
    const $ = V;
    $ && "type" in $ && $.type === "touchend" && $.preventDefault();
    const N = V;
    !N?.ctrlKey && !N?.metaKey && (v.clearSelection(), O.clearSelection(!0, !0)), m.value.clear();
  }, Z = (V) => {
    if (_.selectionMode === "single")
      return;
    const O = E(V.store.changed.added), K = E(V.store.changed.removed);
    g.value = !1, w.value = !0, O.forEach(($) => {
      k.value && !k.value.has($) && S($) && (m.value.add($), v.select($, _.selectionMode || "multiple"));
    }), K.forEach(($) => {
      document.querySelector(`[data-key="${$}"]`) && x.value.has($) && m.value.delete($), v.deselect($);
    }), V.selection.resolveSelectables(), L(V);
  }, Q = () => {
    m.value.clear();
  }, W = (V) => {
    if (!V.event)
      return;
    const O = document.querySelector(".scroller-" + h);
    if (!O)
      return;
    const K = O.getBoundingClientRect(), $ = K.left, N = K.top;
    let M = O.scrollTop;
    if (c?.value) {
      const { viewport: Xe } = c.value.elements();
      Xe && (M = Xe.scrollTop);
    }
    const I = l.value?.getAreaLocation();
    if (!I)
      return;
    const B = Math.min(I.x1, I.x2), F = M + Math.min(I.y1, I.y2), A = Math.max(I.x1, I.x2), re = M + Math.max(I.y1, I.y2), ke = 4, q = f();
    let ee = Math.floor((B - $ - ke) / q), ve = Math.floor((A - $ - ke) / q);
    const we = B - $ - ke - ee * q, De = A - $ - ke - ve * q;
    we > q - ke && (ee = ee + 1), De < ke && (ve = ve - 1);
    const Je = Math.max(0, ee), J = Math.min(e.value - 1, ve);
    let se = Math.floor((F - N - ke) / r.value), ae = Math.floor((re - N - ke) / r.value);
    const ce = F - N - ke - se * r.value, He = re - N - ke - ae * r.value, Me = Math.floor((t.value - ke) / r.value);
    ce > r.value - ke && (se = se + 1), He < ke && (ae = ae - 1);
    const Ee = Math.max(0, se), Ye = Math.min(ae, Me), Le = s(
      b.value,
      Ee,
      Ye,
      Je,
      J
    ), Rt = document.querySelectorAll(`.file-item-${h}[data-key]`), hn = /* @__PURE__ */ new Map();
    Rt.forEach((Xe) => {
      const lt = Xe.getAttribute("data-key");
      lt && hn.set(lt, Xe);
    });
    const Bt = [];
    if (Le.forEach((Xe) => {
      const lt = i(Xe);
      hn.get(lt) || Bt.push(lt);
    }), Bt.length > 0) {
      const Xe = _.selectionMode || "multiple";
      v.selectMultiple(Bt, Xe);
    }
  }, P = (V) => {
    W(V), C(V), L(V), v.setSelectedCount(k.value?.size || 0), w.value = !1;
  }, T = () => {
    let V = [".scroller-" + h];
    if (c?.value) {
      const { viewport: O } = c.value.elements();
      O && (V = O);
    }
    l.value = new Io({
      selectables: [
        ".file-item-" + h + ":not(.vf-explorer-item--unselectable):not(.vf-explorer-item--no-select)"
      ],
      boundaries: V,
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
    }), l.value.on("beforestart", R), l.value.on("start", te), l.value.on("move", Z), l.value.on("stop", P);
  }, U = () => {
    l.value && (l.value.destroy(), l.value = null);
  }, Y = () => {
    l.value && (Array.from(
      k.value ?? /* @__PURE__ */ new Set()
    ).forEach((O) => {
      S(O) || v.deselect(O);
    }), U(), T());
  }, ue = (V) => {
    g.value && (l.value?.clearSelection(), Q(), g.value = !1);
    const O = V;
    !m.value.size && !g.value && !O?.ctrlKey && !O?.metaKey && (v.clearSelection(), l.value?.clearSelection());
  };
  return be(() => {
    const V = (O) => {
      !O.buttons && w.value && (w.value = !1);
    };
    document.addEventListener("dragleave", V), Ae(() => {
      document.removeEventListener("dragleave", V);
    });
  }), {
    explorerId: h,
    isDragging: w,
    initializeSelectionArea: T,
    updateSelectionArea: Y,
    handleContentClick: ue
  };
}
function i_(n) {
  const e = (s) => {
    if (!s)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const i = n.selectionFilterType, l = n.selectionFilterMimeIncludes, r = !i || i === "both" || i === "files" && s.type === "file" || i === "dirs" && s.type === "dir";
    let d = !0;
    return l && Array.isArray(l) && l.length > 0 && (s.type === "dir" ? d = !0 : s.mime_type ? d = l.some((c) => s.mime_type.startsWith(c)) : d = !1), { typeAllowed: r, mimeAllowed: d };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (s) => {
      const { typeAllowed: i, mimeAllowed: l } = e(s);
      return i && l;
    }
  };
}
function r_(n) {
  const e = (s) => ({
    item: s,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (s, i, l) => {
      const r = e(s);
      if (s.type === "file" && i) {
        if (n.emitter.emit("vf-file-dclick", r), r.defaultPrevented) return;
      } else if (s.type === "dir" && l && (n.emitter.emit("vf-folder-dclick", r), r.defaultPrevented))
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
function l_(n, e, t, s, i, l, r) {
  const d = n.fs, { canSelectItem: c } = i_(n), { openItem: f } = r_(n), h = (m) => {
    const w = m.target?.closest(".file-item-" + e);
    if (!w) return null;
    const g = String(w.getAttribute("data-key")), E = t.value?.find((C) => $e(C) === g);
    return { key: g, item: E };
  }, _ = () => {
    const m = s.value;
    return t.value?.filter((w) => m?.has($e(w))) || [];
  };
  return {
    handleItemClick: (m) => {
      const w = h(m);
      if (!w) return;
      const { key: g, item: E } = w, C = m;
      if (!c(E)) {
        E?.type === "dir" && (d.clearSelection(), i.value?.clearSelection(!0, !0), d.setSelectedCount(0));
        return;
      }
      const L = n.selectionMode || "multiple";
      !C?.ctrlKey && !C?.metaKey && (m.type !== "touchstart" || !d.isSelected(g)) && (d.clearSelection(), i.value?.clearSelection(!0, !0)), i.value?.resolveSelectables(), m.type === "touchstart" && d.isSelected(g) ? d.select(g, L) : d.toggleSelect(g, L), d.setSelectedCount(s.value?.size || 0);
    },
    handleItemDblClick: (m) => {
      const w = h(m);
      if (!w) return;
      const { item: g } = w;
      g && (g.type === "file" && !c(g) || f(g, l, r));
    },
    handleItemContextMenu: (m) => {
      m.preventDefault(), m.stopPropagation();
      const w = h(m);
      if (!w) return;
      const { key: g, item: E } = w;
      c(E) && (s.value?.has(g) || (d.clearSelection(), d.select(g)), n.emitter.emit("vf-contextmenu-show", {
        event: m,
        items: _(),
        target: E
      }));
    },
    handleContentContextMenu: (m) => {
      m.preventDefault(), n.emitter.emit("vf-contextmenu-show", { event: m, items: _() });
    },
    getSelectedItems: _
  };
}
function d_(n, e) {
  const t = D(null);
  return be(() => {
    if (ft.plugin([Mo]), n.value) {
      const s = ft(
        n.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (i) => {
            t.value = i;
            const { viewport: l } = i.elements();
            l && l.addEventListener("scroll", e);
          },
          updated: (i) => {
            const { viewport: l } = i.elements();
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
const c_ = 4, u_ = 600;
function v_(n, e) {
  const t = D(null), s = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  return be(() => {
    n.value && (t.value = new qt({
      elements_selector: ".lazy",
      container: n.value,
      // Put the placeholder back so the browser doesn't show a broken-image
      // icon (the "?" thumbnail) while we retry.
      restore_on_error: !0,
      callback_error: (l, r) => {
        const d = (s.get(l) ?? 0) + 1;
        if (d > c_) return;
        s.set(l, d);
        const c = u_ * 2 ** (d - 1) + Math.random() * 250, f = i.get(l);
        f && clearTimeout(f), i.set(
          l,
          setTimeout(() => {
            l.isConnected && (qt.resetStatus(l), r.update());
          }, c)
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
const f_ = { class: "vuefinder__explorer__container" }, __ = {
  key: 0,
  class: "vuefinder__linear-loader"
}, p_ = /* @__PURE__ */ de({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(n) {
    const e = n, t = le(), s = $t(t, ["vuefinder__drag-over"]), i = st("dragImage"), l = vt(null), r = st("scrollContainer"), d = st("scrollContent"), c = t.fs, f = t.config, h = ne(f.state), _ = ne(c.sortedFiles), v = ne(c.selectedKeys), k = ne(c.loading), b = (q) => v.value?.has(q) ?? !1, x = z(() => {
      if (h.value?.view === "grid") {
        const we = h.value?.gridItemHeight ?? 80, De = h.value?.gridItemGap ?? 8;
        return we + De * 2;
      }
      const ee = h.value?.listItemHeight ?? 32, ve = h.value?.listItemGap ?? 2;
      return ee + ve * 2;
    }), m = z(() => {
      if (h.value?.view === "grid") {
        const ee = h.value?.gridItemWidth ?? 96, ve = h.value?.gridItemGap ?? 8;
        return ee + ve * 2;
      }
      return 104;
    }), w = z(() => h.value?.view === "grid" ? (h.value?.gridItemGap ?? 8) * 2 : 0), { t: g } = t.i18n, {
      itemsPerRow: E,
      totalHeight: C,
      visibleRows: L,
      handleScroll: S,
      getRowItems: R,
      getItemsInRange: j,
      updateItemsPerRow: te
    } = s_(
      z(() => _.value ?? []),
      {
        scrollContainer: r,
        itemWidth: m,
        rowHeight: x,
        overscan: 2,
        containerPadding: w,
        lockItemsPerRow: z(() => h.value.view === "list")
      }
    ), { osInstance: Z } = d_(r, S), { explorerId: Q, isDragging: W, initializeSelectionArea: P, updateSelectionArea: T, handleContentClick: U } = a_({
      itemsPerRow: E,
      totalHeight: C,
      getItemsInRange: j,
      getKey: (q) => $e(q),
      selectionObject: l,
      rowHeight: x,
      itemWidth: m,
      osInstance: Z
    }), Y = D(null), ue = (q) => {
      if (!q || !Y.value) return !1;
      const ee = v.value?.has(Y.value) ?? !1;
      return W.value && (ee ? v.value?.has(q) ?? !1 : q === Y.value);
    };
    pe(
      () => f.get("view"),
      (q) => {
        q === "list" ? E.value = 1 : te();
      },
      { immediate: !0 }
    ), pe(E, (q) => {
      f.get("view") === "list" && q !== 1 && (E.value = 1);
    });
    const V = (q) => _.value?.[q];
    v_(r, t);
    const { handleItemClick: O, handleItemDblClick: K, handleItemContextMenu: $, handleContentContextMenu: N } = l_(
      t,
      Q,
      _,
      v,
      l,
      e.onFileDclick,
      e.onFolderDclick
    );
    be(() => {
      const q = () => {
        l.value || P(), l.value && l.value.on("beforestart", ({ event: ee }) => {
          const ve = ee?.target === d.value;
          if (!ee?.metaKey && !ee?.ctrlKey && !ee?.altKey && !ve)
            return !1;
        });
      };
      if (Z.value)
        q();
      else {
        const ee = setInterval(() => {
          Z.value && (clearInterval(ee), q());
        }, 50);
        setTimeout(() => {
          clearInterval(ee), l.value || q();
        }, 500);
      }
      pe(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], T, {
        deep: !0
      });
    });
    const M = (q) => {
      if (!(t.features?.move ?? !1) || q.altKey || q.ctrlKey || q.metaKey)
        return q.preventDefault(), !1;
      W.value = !0;
      const ve = q.target?.closest(
        ".file-item-" + Q
      );
      if (Y.value = ve ? String(ve.dataset.key) : null, q.dataTransfer && Y.value) {
        q.dataTransfer.setDragImage(i.value, 0, 15), q.dataTransfer.effectAllowed = "all", q.dataTransfer.dropEffect = "copy";
        const we = v.value?.has(Y.value) ? Array.from(v.value) : [Y.value];
        q.dataTransfer.setData("items", JSON.stringify(we)), c.setDraggedItem(Y.value);
      }
    }, I = () => {
      Y.value = null;
    };
    let B = null, F = null;
    const A = (q) => {
      q.target?.closest(".file-item-" + Q) || (F = q, B && clearTimeout(B), B = setTimeout(() => {
        F && (F.cancelable && F.preventDefault(), F.stopPropagation(), N(F)), F = null, B = null;
      }, 500));
    }, re = (q) => {
      B && (clearTimeout(B), B = null), F = null;
    }, ke = (q) => {
      if (!F) return;
      const ee = F.touches[0] || F.changedTouches[0], ve = q.touches[0] || q.changedTouches[0];
      if (ee && ve) {
        const we = Math.abs(ve.clientX - ee.clientX), De = Math.abs(ve.clientY - ee.clientY);
        (we > 15 || De > 15) && (B && (clearTimeout(B), B = null), F = null);
      }
    };
    return (q, ee) => (u(), p("div", f_, [
      a(h).view === "list" ? (u(), X(o_, { key: 0 })) : H("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: oe(["vuefinder__explorer__selector-area", "scroller-" + a(Q)])
      }, [
        a(f).get("loadingIndicator") === "linear" && a(k) ? (u(), p("div", __)) : H("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: d,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Ie({ height: `${a(C)}px`, position: "relative", width: "100%" }),
          onContextmenu: ee[0] || (ee[0] = _e(
            //@ts-ignore
            (...ve) => a(N) && a(N)(...ve),
            ["self", "prevent"]
          )),
          onClick: ee[1] || (ee[1] = _e(
            //@ts-ignore
            (...ve) => a(U) && a(U)(...ve),
            ["self"]
          )),
          onTouchstartCapture: _e(A, ["self"]),
          onTouchendCapture: _e(re, ["self"]),
          onTouchmoveCapture: _e(ke, ["self"]),
          onTouchcancelCapture: _e(re, ["self"])
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
          a(h).view === "grid" ? (u(!0), p(fe, { key: 0 }, he(a(L), (ve) => (u(), X(An, {
            key: ve,
            "row-index": ve,
            "row-height": x.value,
            view: "grid",
            "items-per-row": a(E),
            items: a(R)(a(_), ve),
            "show-thumbnails": a(h).showThumbnails,
            "is-dragging-item": ue,
            "is-selected": b,
            "drag-n-drop-events": (we) => a(s).events(we),
            "explorer-id": a(Q),
            onClick: a(O),
            onDblclick: a(K),
            onContextmenu: a($),
            onDragstart: M,
            onDragend: I
          }, {
            icon: ie((we) => [
              ge(q.$slots, "icon", qe({ ref_for: !0 }, we))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), p(fe, { key: 1 }, he(a(L), (ve) => (u(), X(An, {
            key: ve,
            "row-index": ve,
            "row-height": x.value,
            view: "list",
            items: V(ve) ? [V(ve)] : [],
            "is-dragging-item": ue,
            "is-selected": b,
            "drag-n-drop-events": (we) => a(s).events(we),
            "explorer-id": a(Q),
            onClick: a(O),
            onDblclick: a(K),
            onContextmenu: a($),
            onDragstart: M,
            onDragend: I
          }, {
            icon: ie((we) => [
              ge(q.$slots, "icon", qe({ ref_for: !0 }, we))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), m_ = ["href", "download"], h_ = { class: "vuefinder__context-menu__action vuefinder__context-menu__action--parent" }, g_ = { class: "vuefinder__context-menu vuefinder__context-menu__submenu" }, w_ = ["onClick"], y_ = ["onClick"], b_ = /* @__PURE__ */ de({
  __name: "ContextMenu",
  setup(n) {
    const e = le(), t = D(null), s = D([]);
    let i = null, l = null, r = null, d = [], c = null;
    const f = Pt({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (k) => {
      s.value = k;
    });
    const h = (k) => k.link(e, s.value), _ = (k) => {
      e.emitter.emit("vf-contextmenu-hide"), k.action(e, s.value);
    };
    e.emitter.on("vf-contextmenu-show", (k) => {
      const { event: b, items: x, target: m = null } = k || {};
      f.items = (e.contextMenuItems || []).filter((w) => w.show(e, {
        items: x,
        target: m
      })).sort((w, g) => {
        const E = w.order ?? 1 / 0, C = g.order ?? 1 / 0;
        return E - C;
      }), m ? x.length > 1 && x.some((w) => w.path === m.path) ? e.emitter.emit("vf-context-selected", x) : e.emitter.emit("vf-context-selected", [m]) : e.emitter.emit("vf-context-selected", []), v(b);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      f.active = !1, i && (i(), i = null), r && (d.forEach((k) => {
        k === window ? window.removeEventListener("scroll", r, !0) : k.removeEventListener("scroll", r, !0);
      }), r = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null, f.positions = {};
    });
    const v = async (k) => {
      i && (i(), i = null);
      const x = ((S) => {
        if ("clientX" in S && "clientY" in S)
          return { x: S.clientX, y: S.clientY };
        const R = "touches" in S && S.touches[0] || "changedTouches" in S && S.changedTouches[0];
        return R ? { x: R.clientX, y: R.clientY } : { x: 0, y: 0 };
      })(k);
      if (l = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: x.x,
          y: x.y,
          top: x.y,
          left: x.x,
          right: x.x,
          bottom: x.y
        })
      }, f.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, f.active = !0, await Oe(), !t.value || !l) return;
      await new Promise((S) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(S);
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
      let w = 0, g = 0;
      try {
        const S = await at(l, t.value, {
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
        let j = S;
        for (; j && j !== document.body && j !== document.documentElement; ) {
          const te = window.getComputedStyle(j), Z = te.overflow + te.overflowX + te.overflowY;
          (Z.includes("scroll") || Z.includes("auto")) && R.push(j), j = j.parentElement;
        }
        return R;
      })(t.value);
      d = [window, ...C], r = () => {
        f.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const L = r;
      L && d.forEach((S) => {
        S === window ? window.addEventListener("scroll", L, !0) : S.addEventListener("scroll", L, !0);
      }), c = (S) => {
        if (!f.active) return;
        const R = S.target;
        if (!R || t.value && t.value.contains(R))
          return;
        const j = e.root;
        j && j.contains(R) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !l))
          try {
            i = Xt(l, t.value, async () => {
              if (!(!l || !t.value))
                try {
                  const { x: S, y: R } = await at(l, t.value, {
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
      i && (i(), i = null), r && (d.forEach((k) => {
        k === window ? window.removeEventListener("scroll", r, !0) : k.removeEventListener("scroll", r, !0);
      }), r = null, d = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), l = null;
    }), (k, b) => me((u(), p("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: oe([{
        "vuefinder__context-menu--active": f.active,
        "vuefinder__context-menu--inactive": !f.active
      }, "vuefinder__context-menu"]),
      style: Ie(f.positions)
    }, [
      (u(!0), p(fe, null, he(f.items, (x) => (u(), p("li", {
        key: x.title,
        class: oe(["vuefinder__context-menu__item", { "vuefinder__context-menu__item--has-children": x.children?.length }])
      }, [
        x.link ? (u(), p("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: h(x),
          download: h(x),
          onClick: b[0] || (b[0] = (m) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, y(x.title(a(e).i18n)), 1)
        ], 8, m_)) : x.children?.length ? (u(), p(fe, { key: 1 }, [
          o("div", h_, [
            o("span", null, y(x.title(a(e).i18n)), 1),
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
            (u(!0), p(fe, null, he(x.children, (m) => (u(), p("li", {
              key: m.id,
              class: "vuefinder__context-menu__item"
            }, [
              o("div", {
                class: "vuefinder__context-menu__action",
                onClick: (w) => _(m)
              }, [
                o("span", null, y(m.title(a(e).i18n)), 1)
              ], 8, w_)
            ]))), 128))
          ])
        ], 64)) : (u(), p("div", {
          key: 2,
          class: "vuefinder__context-menu__action",
          onClick: (m) => _(x)
        }, [
          o("span", null, y(x.title(a(e).i18n)), 1)
        ], 8, y_))
      ], 2))), 128))
    ], 6)), [
      [Ge, f.active]
    ]);
  }
}), k_ = { class: "vuefinder__status-bar__wrapper" }, $_ = { class: "vuefinder__status-bar__storage" }, x_ = ["title"], S_ = { class: "vuefinder__status-bar__storage-icon" }, C_ = ["value"], F_ = ["value"], E_ = { class: "vuefinder__status-bar__info space-x-2" }, P_ = { key: 0 }, T_ = { class: "vuefinder__status-bar__size" }, D_ = { key: 1 }, M_ = { class: "vuefinder__status-bar__size" }, I_ = { class: "vuefinder__status-bar__actions" }, A_ = /* @__PURE__ */ de({
  __name: "Statusbar",
  setup(n) {
    const e = le(), { t } = e.i18n, s = e.fs, i = ne(s.sortedFiles), l = ne(s.path), r = ne(s.selectedCount), d = ne(s.storages), c = ne(s.selectedItems), f = ne(s.path), h = (w) => {
      const g = w.target.value;
      e.adapter.open(g + "://");
    }, _ = z(() => !c.value || c.value.length === 0 ? 0 : c.value.reduce((w, g) => w + (g.file_size || 0), 0)), v = z(() => !i.value || i.value.length === 0 ? 0 : i.value.reduce((w, g) => w + (g.file_size || 0), 0)), k = z(() => d.value), b = z(() => i.value), x = z(() => r.value || 0), m = z(() => c.value || []);
    return console.log("sortedFilesList", b), (w, g) => (u(), p("div", k_, [
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
            value: a(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: h
          }, [
            (u(!0), p(fe, null, he(k.value, (E) => (u(), p("option", {
              key: E,
              value: E
            }, y(E), 9, F_))), 128))
          ], 40, C_),
          g[0] || (g[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-": "",
            hidden: "true"
          }, null, -1))
        ], 8, x_),
        o("div", E_, [
          x.value === 0 ? (u(), p("span", P_, [
            ye(y(b.value.length) + " " + y(a(t)("items")) + " ", 1),
            o("span", T_, " - " + y(a(e).filesize(v.value)), 1)
          ])) : (u(), p("span", D_, [
            ye(y(x.value) + " " + y(a(t)("selected")) + " ", 1),
            o("span", M_, y(a(e).filesize(_.value)), 1)
          ]))
        ])
      ]),
      o("div", I_, [
        ge(w.$slots, "actions", {
          path: a(f).path,
          count: x.value || 0,
          selected: m.value
        })
      ])
    ]));
  }
});
function O_() {
  const n = le(), e = n.fs, t = n.config, { t: s } = n.i18n, { getStore: i, setStore: l } = n.storage, r = ne(t.state), d = ne(e.path), c = ne(e.storages), f = $t(n, ["vuefinder__drag-over"]), h = z(
    () => r.value.pinnedFolders
  ), _ = D(i("pinned-folders-opened", !0));
  return pe(_, (m) => l("pinned-folders-opened", m)), {
    t: s,
    configState: r,
    currentPath: d,
    storages: c,
    dragNDrop: f,
    pinnedFolders: h,
    pinnedFoldersOpened: _,
    togglePinnedFoldersOpened: () => {
      _.value = !_.value;
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
const L_ = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function R_(n, e) {
  return u(), p("svg", L_, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const B_ = { render: R_ };
function mo(n, e) {
  const t = n.findIndex((s) => s.path === e.path);
  t > -1 ? n[t] = e : n.push(e);
}
const z_ = { class: "vuefinder__folder-loader-indicator" }, V_ = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, ho = /* @__PURE__ */ de({
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
    const e = n, t = le(), s = Vn(n, "modelValue"), i = D(!1);
    pe(
      () => s.value,
      () => l()
    );
    const l = async () => {
      i.value = !0;
      try {
        const d = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        mo(t.treeViewData, { path: e.path, type: "dir", folders: d });
      } catch (r) {
        Te(r, "Failed to fetch subfolders");
      } finally {
        i.value = !1;
      }
    };
    return (r, d) => (u(), p("div", z_, [
      i.value ? (u(), X(a(Ot), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), p("div", V_, [
        s.value ? (u(), X(a(It), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : H("", !0),
        s.value ? H("", !0) : (u(), X(a(Mt), {
          key: 1,
          class: "vuefinder__folder-loader-indicator--plus"
        }))
      ]))
    ]));
  }
}), U_ = { key: 0 }, N_ = { class: "vuefinder__treesubfolderlist__no-folders" }, H_ = { class: "vuefinder__treesubfolderlist__item-content" }, j_ = ["onClick"], K_ = ["title", "onDblclick", "onClick"], q_ = { class: "vuefinder__treesubfolderlist__item-icon" }, W_ = { class: "vuefinder__treesubfolderlist__subfolder" }, G_ = {
  key: 1,
  class: "vuefinder__treesubfolderlist__more-note"
}, Y_ = /* @__PURE__ */ de({
  __name: "TreeSubfolderList",
  props: {
    storage: {},
    path: {}
  },
  setup(n) {
    const e = le(), t = e.fs, s = $t(e, ["vuefinder__drag-over"]), i = D({}), l = e.config, r = ne(l.state), { t: d } = e.i18n, c = ne(t.path), f = n, h = D(null), _ = D(50);
    be(() => {
      f.path === f.storage + "://" && h.value && ft(h.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const v = z(() => {
      const E = e.treeViewData.find((C) => C.path === f.path)?.folders || [];
      return E.length > _.value ? E.slice(0, _.value) : E;
    }), k = z(() => e.treeViewData.find((E) => E.path === f.path)?.folders?.length || 0), b = z(() => k.value > _.value), x = z(() => `${f.storage}://`), m = (g, E) => g === E || g.startsWith(`${E}/`);
    pe(
      v,
      (g) => {
        const E = r.value.expandTreeByDefault && f.path === x.value, C = r.value.expandedTreePaths || [];
        g.forEach((L) => {
          const S = C.some(
            (R) => m(R, L.path)
          );
          (E || S) && i.value[L.path] === void 0 && (i.value[L.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const w = () => {
      _.value += 50;
    };
    return (g, E) => {
      const C = Bn("TreeSubfolderList", !0);
      return u(), p("ul", {
        ref_key: "parentSubfolderList",
        ref: h,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        v.value.length ? H("", !0) : (u(), p("li", U_, [
          o("div", N_, y(a(d)("No folders")), 1)
        ])),
        (u(!0), p(fe, null, he(v.value, (L) => (u(), p("li", {
          key: L.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", H_, [
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
            ], 8, j_),
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
              o("div", q_, [
                a(c)?.path === L.path ? (u(), X(a(At), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), X(a(ze), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: oe(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(c).path === L.path
                }])
              }, y(L.basename), 3)
            ], 16, K_)
          ]),
          o("div", W_, [
            me(G(C, {
              storage: f.storage,
              path: L.path
            }, null, 8, ["storage", "path"]), [
              [Ge, i.value[L.path]]
            ])
          ])
        ]))), 128)),
        b.value ? (u(), p("li", G_, [
          o("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: w
          }, y(a(d)("load more")), 1)
        ])) : H("", !0)
      ], 512);
    };
  }
}), X_ = /* @__PURE__ */ de({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(n) {
    const e = le(), t = e.fs, s = e.config, i = n, l = ne(s.state), r = z(() => {
      const k = l.value.expandedTreePaths || [], b = `${i.storage}://`;
      return k.some(
        (x) => x === b || x.startsWith(`${b}`)
      );
    }), d = D(l.value.expandTreeByDefault || r.value), c = $t(e, ["vuefinder__drag-over"]), f = ne(t.path), h = z(() => i.storage === f.value?.storage);
    pe(
      () => ({
        expandTreeByDefault: l.value.expandTreeByDefault,
        hasExpandedPathInStorage: r.value
      }),
      (k) => {
        (k.expandTreeByDefault || k.hasExpandedPathInStorage) && (d.value = !0);
      }
    );
    const _ = {
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
    return (k, b) => (u(), p(fe, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: b[2] || (b[2] = (x) => v(n.storage))
      }, [
        o("div", qe({
          class: ["vuefinder__treestorageitem__info", h.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, et(a(c).events(_), !0)), [
          o("div", {
            class: oe(["vuefinder__treestorageitem__icon", h.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            G(a(an))
          ], 2),
          o("div", null, y(n.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: b[1] || (b[1] = _e((x) => d.value = !d.value, ["stop"]))
        }, [
          G(ho, {
            modelValue: d.value,
            "onUpdate:modelValue": b[0] || (b[0] = (x) => d.value = x),
            storage: n.storage,
            path: n.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      me(G(Y_, {
        storage: n.storage,
        path: n.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [Ge, d.value]
      ])
    ], 64));
  }
}), Q_ = { class: "vuefinder__folder-indicator" }, J_ = { class: "vuefinder__folder-indicator--icon" }, Z_ = /* @__PURE__ */ de({
  __name: "FolderIndicator",
  props: {
    modelValue: { type: Boolean },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(n) {
    const e = Vn(n, "modelValue");
    return (t, s) => (u(), p("div", Q_, [
      o("div", J_, [
        e.value ? (u(), X(a(It), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : H("", !0),
        e.value ? H("", !0) : (u(), X(a(Mt), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}), ep = {
  key: 0,
  class: "vuefinder__treeview__header"
}, tp = { class: "vuefinder__treeview__pinned-label" }, np = { class: "vuefinder__treeview__pin-text text-nowrap" }, op = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, sp = ["onClick"], ap = ["title"], ip = ["onClick"], rp = { key: 0 }, lp = { class: "vuefinder__treeview__no-pinned" }, dp = /* @__PURE__ */ de({
  __name: "TreeView",
  setup(n) {
    const e = le(), { enabled: t } = Ne(), s = e.fs, i = e.config, l = ne(i.state), r = ne(s.sortedFiles), d = ne(s.path), {
      t: c,
      storages: f,
      dragNDrop: h,
      pinnedFolders: _,
      pinnedFoldersOpened: v,
      togglePinnedFoldersOpened: k,
      openPath: b,
      removePin: x
    } = O_(), m = z(() => f.value || []), w = D(190), g = (C) => {
      const L = C.clientX, S = C.target.parentElement;
      if (!S) return;
      const R = S.getBoundingClientRect().width;
      S.classList.remove("transition-[width]"), S.classList.add("transition-none");
      const j = (Z) => {
        w.value = R + Z.clientX - L, w.value < 50 && (w.value = 0, i.set("showTreeView", !1)), w.value > 50 && i.set("showTreeView", !0);
      }, te = () => {
        const Z = S.getBoundingClientRect();
        w.value = Z.width, S.classList.add("transition-[width]"), S.classList.remove("transition-none"), window.removeEventListener("mousemove", j), window.removeEventListener("mouseup", te);
      };
      window.addEventListener("mousemove", j), window.addEventListener("mouseup", te);
    }, E = D(null);
    return be(() => {
      E.value && ft(E.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), pe(r, (C) => {
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
    }), (C, L) => (u(), p(fe, null, [
      o("div", {
        class: oe(["vuefinder__treeview__overlay", a(l).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: L[0] || (L[0] = (S) => a(i).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: Ie(
          a(l).showTreeView ? "min-width:100px;max-width:75%; width: " + w.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: E,
          class: "vuefinder__treeview__scroll"
        }, [
          ge(C.$slots, "tree-view", {
            pinnedFolders: a(_),
            pinnedFoldersOpened: a(v),
            togglePinnedFoldersOpened: a(k),
            removePin: a(x),
            storages: m.value,
            currentPath: a(d),
            openPath: a(b)
          }, () => [
            a(t)("pinned") ? (u(), p("div", ep, [
              o("div", {
                class: "vuefinder__treeview__pinned-toggle",
                onClick: L[2] || (L[2] = //@ts-ignore
                (...S) => a(k) && a(k)(...S))
              }, [
                o("div", tp, [
                  G(a(gt), { class: "vuefinder__treeview__pin-icon" }),
                  o("div", np, y(a(c)("Pinned Folders")), 1)
                ]),
                G(Z_, {
                  modelValue: a(v),
                  "onUpdate:modelValue": L[1] || (L[1] = (S) => zn(v) ? v.value = S : null)
                }, null, 8, ["modelValue"])
              ]),
              a(v) ? (u(), p("ul", op, [
                (u(!0), p(fe, null, he(a(_), (S) => (u(), p("li", {
                  key: S.path,
                  class: "vuefinder__treeview__pinned-item"
                }, [
                  o("div", qe({ class: "vuefinder__treeview__pinned-folder" }, et(a(h).events(S), !0), {
                    onClick: (R) => a(b)(S.path)
                  }), [
                    a(d).path !== S.path ? (u(), X(a(ze), {
                      key: 0,
                      class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                    })) : H("", !0),
                    a(d).path === S.path ? (u(), X(a(At), {
                      key: 1,
                      class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                    })) : H("", !0),
                    o("div", {
                      title: S.path,
                      class: oe(["vuefinder__treeview__folder-name", {
                        "vuefinder__treeview__folder-name--active": a(d).path === S.path
                      }])
                    }, y(S.basename), 11, ap)
                  ], 16, sp),
                  o("div", {
                    class: "vuefinder__treeview__remove-folder",
                    onClick: (R) => a(x)(S)
                  }, [
                    G(a(B_), { class: "vuefinder__treeview__remove-icon" })
                  ], 8, ip)
                ]))), 128)),
                a(_).length ? H("", !0) : (u(), p("li", rp, [
                  o("div", lp, y(a(c)("No folders pinned")), 1)
                ]))
              ])) : H("", !0)
            ])) : H("", !0),
            (u(!0), p(fe, null, he(m.value, (S) => (u(), p("div", {
              key: S,
              class: "vuefinder__treeview__storage"
            }, [
              G(X_, { storage: S }, null, 8, ["storage"])
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
function cp(n) {
  return n.items.length > 1 && n.items.some((e) => e.path === n.target?.path) ? "many" : n.target ? "one" : "none";
}
function xe(n) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    n
  );
  return (t, s) => !(e.needsSearchQuery !== !!s.searchQuery || e.target !== void 0 && e.target !== cp(s) || e.targetType !== void 0 && e.targetType !== s.target?.type || e.mimeType !== void 0 && e.mimeType !== s.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
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
          (l) => s.findIndex((r) => r.path === l.path) === -1
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
          (i) => !e.find((l) => l.path === i.path)
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
    action: (n, e) => n.modal.open(Dt, { items: e }),
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
        let l = i.path, r = i.storage;
        e.length === 1 && e[0]?.type === "dir" && (l = e[0].path, r = e[0].storage);
        const d = {
          storage: r || "",
          path: l || "",
          type: "dir"
        };
        n.modal.open(t.type === "cut" ? it : rn, {
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
      n.modal.open(Tt, { items: e });
    },
    show: ut(
      xe({ feature: "delete", target: "one" }),
      xe({ feature: "delete", target: "many" })
    ),
    order: 160
  }
], up = ["data-theme"], vp = {
  key: 0,
  class: "vuefinder__external-drop-overlay vuefinder__external-drop-overlay--relative"
}, fp = { class: "vuefinder__external-drop-message" }, _p = { class: "vuefinder__main__content" }, pp = /* @__PURE__ */ de({
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
    const t = e, s = n, i = le(), l = st("root"), r = i.config;
    pe(
      () => s.features,
      (g) => {
        const E = Hn(g);
        Object.keys(i.features).forEach((C) => {
          delete i.features[C];
        }), Object.assign(i.features, E);
      },
      { deep: !0 }
    );
    const d = i.fs, c = ne(i.i18n.localeAtom), f = ne(r.state), h = z(() => {
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
    const { isDraggingExternal: _, handleDragEnter: v, handleDragOver: k, handleDragLeave: b, handleDrop: x } = Ad();
    function m(g) {
      d.setPath(g.dirname), r.get("persist") && r.set("path", g.dirname), d.setReadOnly(g.read_only ?? !1), i.modal.close(), d.setFiles(g.files), d.clearSelection(), d.setSelectedCount(0), d.setStorages(g.storages);
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
      const { type: E, message: C } = g ?? {};
      E === "error" && t("error", C);
    }), i.emitter.on("vf-file-dclick", (g) => {
      t("file-dclick", g);
    }), i.emitter.on("vf-folder-dclick", (g) => {
      t("folder-dclick", g);
    }), pe(
      () => s.config?.theme,
      (g) => {
        g && r.set("theme", a(g));
      },
      { immediate: !0 }
    ), pe(
      c,
      (g, E) => {
        g !== E && t("update:locale", String(g));
      },
      { immediate: !1 }
    ), be(() => {
      i.root = l.value, pe(
        () => r.get("path"),
        (E) => {
          i.adapter.open(E);
        }
      );
      const g = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      d.setPath(g), i.adapter.open(g), d.path.listen((E) => {
        t("path-change", E.path);
      }), d.selectedItems.listen((E) => {
        t("select", E);
      }), t("ready");
    });
    const w = async (g) => {
      const E = await x(g);
      E.length > 0 && (i.modal.open(un), setTimeout(() => {
        i.emitter.emit(
          "vf-external-files-dropped",
          E.map((C) => ({ file: C.file, name: C.relativePath }))
        );
      }, 100));
    };
    return (g, E) => (u(), p("div", {
      ref_key: "root",
      ref: l,
      tabindex: "0",
      class: oe(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": a(_) }]),
      "data-theme": a(i).theme.current,
      style: Ie(h.value),
      onDragenter: E[2] || (E[2] = //@ts-ignore
      (...C) => a(v) && a(v)(...C)),
      onDragover: E[3] || (E[3] = //@ts-ignore
      (...C) => a(k) && a(k)(...C)),
      onDragleave: E[4] || (E[4] = //@ts-ignore
      (...C) => a(b) && a(b)(...C)),
      onDrop: w
    }, [
      o("div", {
        class: oe(a(i).theme.current),
        style: { height: "100%", width: "100%" }
      }, [
        o("div", {
          class: oe([
            a(f)?.fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative",
            "vuefinder__main__container"
          ]),
          onMousedown: E[0] || (E[0] = (C) => a(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: E[1] || (E[1] = (C) => a(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          a(_) ? (u(), p("div", vp, [
            o("div", fp, y(a(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : H("", !0),
          a(f).showMenuBar ? (u(), X(zu, { key: 1 }, {
            "menubar-start": ie((C) => [
              ge(g.$slots, "menubar-start", Ce(Fe(C)))
            ]),
            "menu-items": ie((C) => [
              ge(g.$slots, "menu-items", Ce(Fe(C)))
            ]),
            "menubar-end": ie((C) => [
              ge(g.$slots, "menubar-end", Ce(Fe(C)))
            ]),
            _: 3
          })) : H("", !0),
          a(f).showToolbar ? (u(), X(Uv, { key: 2 }, {
            "toolbar-items": ie((C) => [
              ge(g.$slots, "toolbar-items", Ce(Fe(C)))
            ]),
            _: 3
          })) : H("", !0),
          a(f).showBreadcrumbBar ? (u(), X(Cf, { key: 3 }, {
            "breadcrumb-actions": ie((C) => [
              ge(g.$slots, "breadcrumb-actions", Ce(Fe(C)))
            ]),
            _: 3
          })) : H("", !0),
          o("div", _p, [
            G(dp, null, {
              "tree-view": ie((C) => [
                ge(g.$slots, "tree-view", Ce(Fe(C)))
              ]),
              _: 3
            }),
            G(p_, {
              "on-file-dclick": s.onFileDclick,
              "on-folder-dclick": s.onFolderDclick
            }, {
              icon: ie((C) => [
                ge(g.$slots, "icon", Ce(Fe(C)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          G(A_, null, {
            actions: ie((C) => [
              ge(g.$slots, "status-bar", Ce(Fe(C)))
            ]),
            _: 3
          })
        ], 34),
        (u(), X(bt, { to: "body" }, [
          G(xo, { name: "fade" }, {
            default: ie(() => [
              a(i).modal.visible ? (u(), X(On(a(i).modal.type), { key: 0 })) : H("", !0)
            ]),
            _: 1
          })
        ])),
        G(b_, { items: a(go) }, null, 8, ["items"]),
        a(f).notificationsEnabled ? (u(), X(a(Fo), {
          key: 0,
          position: a(f).notificationPosition,
          duration: a(f).notificationDuration,
          "visible-toasts": a(f).notificationVisibleToasts,
          "rich-colors": a(f).notificationRichColors
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : H("", !0)
      ], 2)
    ], 46, up));
  }
}), mp = /* @__PURE__ */ de({
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
    const e = n, t = e.id ?? Ct(Wt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const s = Jo(e, Ct("VueFinderOptions") || {});
    return pe(
      () => e.config,
      (i) => {
        if (i) {
          const l = {};
          for (const r in i) {
            const d = a(i[r]);
            d !== void 0 && (l[r] = d);
          }
          s.config.init(l);
        }
      },
      { deep: !0, immediate: !0 }
    ), pe(
      () => e.locale,
      (i) => {
        i && s.i18n.localeAtom && s.i18n.localeAtom.get() !== i && s.i18n.localeAtom.set(i);
      },
      { immediate: !0 }
    ), Oo(t, s), So(Wt, t), yt(() => {
      Lo(t);
    }), (i, l) => (u(), X(pp, Ce(Fe(e)), {
      icon: ie((r) => [
        ge(i.$slots, "icon", Ce(Fe(r)))
      ]),
      "status-bar": ie((r) => [
        ge(i.$slots, "status-bar", Ce(Fe(r)))
      ]),
      "menubar-start": ie((r) => [
        ge(i.$slots, "menubar-start", Ce(Fe(r)))
      ]),
      "menu-items": ie((r) => [
        ge(i.$slots, "menu-items", Ce(Fe(r)))
      ]),
      "menubar-end": ie((r) => [
        ge(i.$slots, "menubar-end", Ce(Fe(r)))
      ]),
      "toolbar-items": ie((r) => [
        ge(i.$slots, "toolbar-items", Ce(Fe(r)))
      ]),
      "breadcrumb-actions": ie((r) => [
        ge(i.$slots, "breadcrumb-actions", Ce(Fe(r)))
      ]),
      "tree-view": ie((r) => [
        ge(i.$slots, "tree-view", Ce(Fe(r)))
      ]),
      _: 3
    }, 16));
  }
});
function Ip(n) {
  const e = le(n), t = ne(e.fs.path), s = z(() => t.value?.path ?? ""), i = (r) => r || e.fs.path.get().path || "", l = (r) => {
    Array.isArray(r.files) && e.fs.setFiles(r.files);
  };
  return {
    async refresh() {
      const r = e.fs.path.get().path || "";
      e.adapter.invalidateListQuery(r), await e.adapter.open(r);
    },
    async open(r) {
      await e.adapter.open(r);
    },
    preview(r) {
      const d = (e.fs.files.get() || []).find((c) => c.path === r);
      !d || d.type !== "file" || e.modal.open(Qe, { storage: d.storage, item: d });
    },
    notify(r, d) {
      ot(e, r, d);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    path: s,
    select(r) {
      const d = new Set((e.fs.files.get() || []).map((f) => f.path)), c = (r || []).filter((f) => d.has(f));
      e.fs.setSelection(c);
    },
    selectOne(r) {
      new Set((e.fs.files.get() || []).map((c) => c.path)).has(r) && e.fs.setSelection([r]);
    },
    clearSelection() {
      e.fs.clearSelection();
    },
    getSelectedPaths() {
      return (e.fs.selectedItems.get() || []).map((r) => r.path);
    },
    async createFolder(r, d) {
      const c = await e.adapter.createFolder({ path: i(d), name: r });
      l(c);
    },
    async createFile(r, d) {
      const c = await e.adapter.createFile({ path: i(d), name: r });
      l(c);
    },
    async delete(r, d) {
      const c = i(d), f = new Map(
        (e.fs.files.get() || []).map((v) => [v.path, v])
      ), h = (r || []).map((v) => f.get(v)).filter((v) => !!v).map((v) => ({ path: v.path, type: v.type })), _ = await e.adapter.delete({ path: c, items: h });
      l(_);
    },
    async rename(r, d, c) {
      const f = await e.adapter.rename({
        path: i(c),
        item: r,
        name: d
      });
      l(f);
    },
    async copy(r, d, c) {
      const f = await e.adapter.copy({
        path: i(c),
        sources: r,
        destination: d
      });
      l(f);
    },
    async move(r, d, c) {
      const f = await e.adapter.move({
        path: i(c),
        sources: r,
        destination: d
      });
      l(f);
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
const Ap = {
  install(n, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", n.provide("VueFinderOptions", e), n.component("VueFinder", mp);
  }
};
export {
  Yo as A,
  Zt as B,
  Pe as C,
  Mp as I,
  Wn as R,
  Ap as V,
  Y_ as _,
  mp as a,
  of as b,
  Bo as c,
  Fu as d,
  O_ as e,
  Ip as f,
  go as m,
  kn as p,
  le as u
};
