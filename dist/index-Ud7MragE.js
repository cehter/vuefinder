import { inject as Ct, reactive as Pt, watch as pe, ref as T, computed as R, shallowRef as vt, markRaw as go, defineComponent as re, onMounted as ye, nextTick as De, openBlock as u, createElementBlock as _, withKeys as He, unref as a, createElementVNode as o, withModifiers as fe, normalizeStyle as Pe, normalizeClass as te, renderSlot as Me, createCommentVNode as z, toDisplayString as k, createBlock as X, resolveDynamicComponent as Ln, withCtx as ce, createVNode as G, Fragment as ve, renderList as he, withDirectives as me, vModelCheckbox as lt, vModelText as Ke, onBeforeUnmount as wt, defineAsyncComponent as Rn, Suspense as Bn, vShow as qe, onUnmounted as Te, useTemplateRef as st, createStaticVNode as St, createTextVNode as ge, createSlots as yo, Teleport as bt, resolveComponent as zn, customRef as wo, isRef as bo, vModelSelect as qt, vModelRadio as Vt, mergeProps as je, toHandlers as Qe, normalizeProps as Je, guardReactiveProps as Ze, onUpdated as ko, useModel as Vn, mergeModels as $o, Transition as xo, provide as So } from "vue";
import Co from "mitt";
import { useStore as oe } from "@nanostores/vue";
import { persistentAtom as Un } from "@nanostores/persistent";
import { toast as xt, Toaster as Fo } from "vue-sonner";
import Eo from "@uppy/core";
import { atom as Le, computed as Xe } from "nanostores";
import { QueryClient as Po, isCancelledError as To } from "@tanstack/vue-query";
import Wt from "vanilla-lazyload";
import { Cropper as Do } from "vue-advanced-cropper";
import { OverlayScrollbars as ft, SizeObserverPlugin as Mo } from "overlayscrollbars";
import { computePosition as at, offset as _t, flip as pt, shift as mt, autoUpdate as Qt } from "@floating-ui/dom";
import Io from "@viselect/vanilla";
import Ao from "@uppy/xhr-upload";
const Jt = /* @__PURE__ */ new Map(), Gt = /* @__PURE__ */ Symbol("ServiceContainerId");
function Oo(s, e) {
  Jt.set(s, e);
}
function Lo(s) {
  Jt.delete(s);
}
function ie(s) {
  const e = s ?? Ct(Gt);
  if (!e)
    throw new Error(
      "No VueFinder app instance found. Make sure VueFinder component is mounted and provide the id explicitly or use within a VueFinder component tree."
    );
  const t = Jt.get(e);
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
  function i(c, f) {
    t[c] = f;
  }
  function d(c) {
    delete t[c];
  }
  function r() {
    Object.keys(t).forEach((c) => d(c));
  }
  return { getStore: (c, f = null) => c in t ? t[c] : f, setStore: i, removeStore: d, clearStore: r };
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
  return Un(s, e, {
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
const Ut = /* @__PURE__ */ new Map();
async function Nt(s, e) {
  const t = e[s];
  return typeof t == "function" ? (await t()).default : t;
}
function Vo(s, e, t, n, i) {
  const d = Be({ emitter: t, config: i }), r = "vuefinder_locale", l = "global";
  let c;
  if (Ut.has(l))
    c = Ut.get(l), e && e !== c.get() && c.set(e);
  else {
    const C = localStorage.getItem(r) ? JSON.parse(localStorage.getItem(r)) : null;
    c = Bo(r, e || C || "en"), Ut.set(l, c);
  }
  const f = "vuefinder_translations", g = (C) => {
    try {
      const E = localStorage.getItem(f);
      if (E)
        return JSON.parse(E)[C] || null;
    } catch {
    }
    return null;
  }, h = (C, E) => {
    try {
      const P = localStorage.getItem(f), B = P ? JSON.parse(P) : {};
      B[C] = E, localStorage.setItem(f, JSON.stringify(B));
    } catch {
    }
  }, p = oe(c), x = String(p.value), $ = g(x), y = T($ || {});
  let m = !1;
  !$ && Object.keys(n).length > 0 && Nt(x, n).then((C) => {
    y.value = C, h(x, C);
  }).catch(() => {
  }), pe(
    p,
    async (C, E) => {
      if (E && C === E)
        return;
      if (!m) {
        m = !0;
        const B = g(String(C));
        if (B)
          y.value = B;
        else if (Object.keys(n).length > 0)
          try {
            const K = await Nt(String(C), n);
            y.value = K, h(String(C), K);
          } catch {
          }
        return;
      }
      const P = g(String(C));
      if (P)
        y.value = P;
      else
        try {
          const B = await Nt(String(C), n);
          y.value = B, h(String(C), B);
        } catch (B) {
          const K = Fe(B, "Locale cannot be loaded!");
          d.error(K);
          return;
        }
      Object.values(n).length > 1 && (d.success("The language is set to " + C), t.emit("vf-language-saved"));
    },
    { immediate: !1 }
  );
  const w = (C, ...E) => E.length ? w(C = C.replace("%s", String(E.shift())), ...E) : C;
  function v(C, ...E) {
    return y.value && Object.prototype.hasOwnProperty.call(y.value, C) ? w(y.value[C] || C, ...E) : w(C, ...E);
  }
  const S = R({
    get: () => p.value,
    set: (C) => {
      c.set(C);
    }
  });
  return Pt({ t: v, locale: S, localeAtom: c });
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
  advanced: Uo.reduce((s, e) => (s[e] = !0, s), {})
};
function yn() {
  return Nn.advanced;
}
function Hn(s) {
  return s ? s === "simple" || s === "advanced" ? { ...Nn[s] } : { ...yn(), ...s } : yn();
}
const No = "4.6.0-cehter.1";
function Zt(s, e, t, n, i) {
  return e = Math, t = e.log, n = 1024, i = t(s) / t(n) | 0, (s / e.pow(n, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "iB" : "B");
}
function jn(s, e, t, n, i) {
  return e = Math, t = e.log, n = 1e3, i = t(s) / t(n) | 0, (s / e.pow(n, i)).toFixed(0) + " " + (i ? "KMGTPEZY"[--i] + "B" : "B");
}
function Ho(s) {
  if (typeof s == "number") return s;
  const e = { k: 1, m: 2, g: 3, t: 4 }, n = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(s);
  if (!n) return 0;
  const i = parseFloat(n[1] || "0"), d = (n[2] || "").toLowerCase(), r = e[d] ?? 0;
  return Math.round(i * Math.pow(1024, r));
}
function jo(s) {
  const e = vt(null), t = T(!1), n = T(), i = T(!1), d = vt(null);
  return {
    visible: t,
    type: e,
    data: n,
    open: (h, p = null) => {
      s.get("fullScreen") || (document.querySelector("body").style.overflow = "hidden"), t.value = !0, e.value = h, n.value = p;
    },
    close: () => {
      s.get("fullScreen") || (document.querySelector("body").style.overflow = ""), t.value = !1, e.value = null, i.value = !1, d.value = null;
    },
    setEditMode: (h) => {
      i.value = h;
    },
    editMode: i,
    controls: d,
    registerControls: (h) => {
      d.value = h;
    },
    unregisterControls: (h) => {
      d.value === h && (d.value = null);
    }
  };
}
const xe = {
  PENDING: 0,
  CANCELED: 1,
  UPLOADING: 2,
  ERROR: 3,
  DONE: 10
};
function Ko(s) {
  const { fs: e, config: t, adapter: n, emitter: i, t: d, filesize: r, customUploader: l, debug: c } = s, f = T({ QUEUE_ENTRY_STATUS: xe }), g = T([]), h = T(""), p = T(!1), x = T(null), $ = (b) => g.value.findIndex((F) => F.id === b), y = new Eo({
    debug: c ?? !1,
    restrictions: { maxFileSize: Ho(t.get("maxFileSize") ?? "10mb") },
    locale: d("uppy"),
    onBeforeFileAdded: (b, F) => {
      if (F[b.id] != null) {
        const j = $(b.id);
        g.value[j]?.status === xe.PENDING && (h.value = y.i18n("noDuplicates", { fileName: b.name })), g.value = g.value.filter((le) => le.id !== b.id);
      }
      return g.value.push({
        id: b.id,
        name: b.name,
        size: r(b.size),
        status: xe.PENDING,
        statusName: d("Pending upload"),
        percent: null,
        originalFile: b.data
      }), !0;
    }
  }), m = (b, F) => y.addFile({ name: F || b.name, type: b.type, data: b, source: "Local" }), w = (b) => b.status === xe.DONE ? "text-green-600" : b.status === xe.ERROR || b.status === xe.CANCELED ? "text-red-600" : "", v = (b) => b.status === xe.DONE ? "✓" : b.status === xe.ERROR || b.status === xe.CANCELED ? "!" : "...", S = R(() => {
    if (!g.value.length) return 0;
    const b = g.value.reduce((F, M) => {
      if (M.status === xe.DONE) return F + 100;
      const j = M.percent ? parseInt(M.percent, 10) : 0;
      return F + (Number.isNaN(j) ? 0 : j);
    }, 0);
    return Math.floor(b / g.value.length);
  }), C = (b) => {
    if (p.value || !g.value.filter((F) => F.status !== xe.DONE).length) {
      p.value || (h.value = d("Please select file to upload first."));
      return;
    }
    h.value = "", x.value = b || e.path.get(), y.upload();
  }, E = () => {
    y.cancelAll(), g.value.forEach((b) => {
      b.status !== xe.DONE && (b.status = xe.CANCELED, b.statusName = d("Canceled"));
    }), p.value = !1;
  }, P = (b) => {
    p.value || (y.removeFile(b.id), g.value.splice($(b.id), 1));
  }, B = (b) => {
    if (!p.value)
      if (y.cancelAll(), b) {
        const F = g.value.filter((M) => M.status !== xe.DONE);
        g.value = [], F.forEach((M) => m(M.originalFile, M.name));
      } else
        g.value = [];
  }, K = (b) => {
    b.forEach((F) => {
      F instanceof File ? m(F) : m(F.file, F.name);
    });
  }, Z = (b, F) => b.endsWith("://") || b.endsWith("/") ? b + F : b + "/" + F, ee = async (b, F) => {
    const M = F.trim();
    if (p.value || !M) return;
    if (M.includes("/") || M.includes("\\")) {
      h.value = d("Name cannot contain slashes.");
      return;
    }
    const j = b.name.split("/");
    j[j.length - 1] = M;
    const le = j.join("/");
    if (le === b.name) return;
    if (b.status === xe.DONE) {
      const A = x.value?.path || e.path.get().path, U = Z(A, b.name), H = b.name.split("/");
      H.pop();
      const D = H.length ? Z(A, H.join("/")) : A;
      try {
        await n.rename({ path: D, item: U, name: M }), b.name = le, n.invalidateListQuery(A), A === e.path.get().path && n.open(A);
      } catch (V) {
        h.value = V?.message || d("Failed to rename");
      }
      return;
    }
    const L = $(b.id);
    if (L === -1) return;
    const O = b.originalFile, N = b.name;
    y.removeFile(b.id), g.value.splice(L, 1);
    let I;
    try {
      I = m(O, le);
    } catch (A) {
      h.value = A?.message || d("Failed to rename");
      try {
        m(O, N);
      } catch {
      }
      return;
    }
    if (!I) return;
    const W = $(I);
    if (W !== -1 && W !== L) {
      const A = g.value.splice(W, 1)[0];
      A && g.value.splice(L, 0, A);
    }
  }, Q = {
    getTargetPath: () => (x.value || e.path.get()).path
  }, Y = n.getDriver();
  if (l)
    l(y, Q);
  else if (Y.configureUploader)
    Y.configureUploader(y, Q);
  else
    throw new Error("No uploader configured");
  return y.on("restriction-failed", (b, F) => {
    const M = g.value[$(b.id)];
    M && P(M), h.value = F.message;
  }), y.on("upload-start", (b) => {
    b.forEach((F) => {
      const M = g.value[$(F.id)];
      M && (M.status = xe.UPLOADING, M.statusName = d("Uploading"), M.percent = "0%");
    });
  }), y.on("upload-progress", (b, F) => {
    const M = F.bytesTotal ?? 1, j = Math.floor(F.bytesUploaded / M * 100), le = $(b.id);
    le !== -1 && g.value[le] && (g.value[le].percent = `${j}%`);
  }), y.on("upload-success", (b) => {
    const F = g.value[$(b.id)];
    F && (F.status = xe.DONE, F.statusName = d("Done"));
  }), y.on("upload-error", (b, F) => {
    const M = g.value[$(b.id)];
    M && (M.percent = null, M.status = xe.ERROR, M.statusName = F?.isNetworkError ? d("Network Error, Unable establish connection to the server or interrupted.") : F?.message || d("Unknown Error"));
  }), y.on("error", (b) => {
    h.value = b.message, p.value = !1;
  }), y.on("complete", (b) => {
    p.value = !1;
    const F = x.value || e.path.get();
    n.invalidateListQuery(F.path), n.open(F.path);
    const M = g.value.filter(
      (j) => j.status === xe.DONE && b.successful.includes(j.id)
    ).map((j) => j.name);
    i.emit("vf-upload-complete", M);
  }), y.on("upload", () => {
    p.value = !0;
  }), {
    queue: g,
    message: h,
    uploading: p,
    definitions: f,
    overallPercent: S,
    addFile: m,
    upload: C,
    cancel: E,
    remove: P,
    clear: B,
    getClassNameForEntry: w,
    getIconForEntry: v,
    addExternalFiles: K,
    renameEntry: ee
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
  notificationRichColors: !0
}, qo = new Set(
  Object.keys(Et)
);
function Wo(s) {
  return s || "silver";
}
function Kn(s) {
  return qo.has(s);
}
function wn(s) {
  const e = {}, t = {}, n = s;
  for (const i in n)
    if (Kn(i))
      t[i] = n[i];
    else if (i in Ft) {
      const d = i;
      e[d] = n[i];
    }
  return { persistenceConfig: e, nonPersistenceConfig: t };
}
function bn(s, e) {
  const t = { ...Ft, ...s, ...e };
  return t.theme = Wo(t.theme), t;
}
function kn(s, e) {
  return { ...Et, ...e, ...s };
}
const Go = (s, e = {}) => {
  const t = `vuefinder_config_${s}`, { persistenceConfig: n, nonPersistenceConfig: i } = wn(e), d = bn(
    n,
    Ft
  ), r = kn(
    i,
    Et
  ), l = Un(
    t,
    d,
    {
      encode: JSON.stringify,
      decode: JSON.parse
    }
  ), c = Le(r), f = Xe(
    [l, c],
    (m, w) => ({
      ...m,
      ...w
    })
  ), g = (m = {}) => {
    const w = l.get(), v = c.get(), { persistenceConfig: S, nonPersistenceConfig: C } = wn(m), E = bn(S, w), P = kn(
      C,
      v
    );
    l.set(E), c.set(P);
  }, h = (m) => Kn(m) ? c.get()[m] : l.get()[m], p = () => ({
    ...l.get(),
    ...c.get()
  }), x = (m, w) => {
    const v = l.get();
    typeof m == "object" && m !== null ? l.set({ ...v, ...m }) : l.set({
      ...v,
      [m]: w
    });
  };
  return {
    // Store atom (combined)
    state: f,
    // Methods
    init: g,
    get: h,
    set: x,
    toggle: (m) => {
      const w = l.get();
      x(m, !w[m]);
    },
    all: p,
    reset: () => {
      l.set({ ...Ft }), c.set({ ...Et });
    }
  };
}, ke = (s) => `${s.type}:${s.path}`;
function qn(s, e) {
  if (typeof s == "string" && typeof e == "string")
    return s.toLowerCase().localeCompare(e.toLowerCase());
  const t = Number(s) || 0, n = Number(e) || 0;
  return t === n ? 0 : t < n ? -1 : 1;
}
const Yo = () => {
  const s = Le(""), e = Le([]), t = Le(!1), n = Le([]), i = Le({ active: !1, column: "", order: "" }), d = Le({
    kind: "all",
    showHidden: !1
  }), r = Le(/* @__PURE__ */ new Set()), l = Le({
    type: "copy",
    path: "",
    items: /* @__PURE__ */ new Set()
  }), c = Le(null), f = Le(0), g = Le(!1), h = Le([]), p = Le(-1), x = Xe([s], (J) => {
    const ne = (J ?? "").trim(), se = ne.indexOf("://"), de = se >= 0 ? ne.slice(0, se) : "", Ee = (se >= 0 ? ne.slice(se + 3) : ne).split("/").filter(Boolean);
    let Se = "";
    const We = Ee.map((Ae) => (Se = Se ? `${Se}/${Ae}` : Ae, {
      basename: Ae,
      name: Ae,
      path: de ? `${de}://${Se}` : Se,
      type: "dir"
    }));
    return { storage: de, breadcrumb: We, path: ne };
  }), $ = Xe([n, i, d], (J, ne, se) => {
    let de = J;
    se.kind === "files" ? de = de.filter((Ae) => Ae.type === "file") : se.kind === "folders" && (de = de.filter((Ae) => Ae.type === "dir")), se.showHidden || (de = de.filter((Ae) => !Ae.basename.startsWith(".")));
    const { active: Ue, column: Ee, order: Se } = ne;
    if (!Ue || !Ee) return de;
    const We = Se === "asc" ? 1 : -1;
    return de.slice().sort((Ae, Bt) => qn(Ae[Ee], Bt[Ee]) * We);
  }), y = Xe([n, r], (J, ne) => ne.size === 0 ? [] : J.filter((se) => ne.has(ke(se)))), m = (J, ne) => {
    const se = s.get();
    if ((ne ?? !0) && se !== J) {
      const de = h.get(), Ue = p.get();
      Ue < de.length - 1 && de.splice(Ue + 1), de.length === 0 && se && de.push(se), de.push(J), h.set([...de]), p.set(de.length - 1);
    }
    s.set(J);
  }, w = (J) => {
    n.set(J ?? []);
  }, v = (J) => {
    e.set(J ?? []);
  }, S = (J, ne) => {
    i.set({ active: !0, column: J, order: ne });
  }, C = (J) => {
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
  }, E = () => {
    i.set({ active: !1, column: "", order: "" });
  }, P = (J, ne) => {
    d.set({ kind: J, showHidden: ne });
  }, B = () => {
    d.set({ kind: "all", showHidden: !1 });
  }, K = (J, ne = "multiple") => {
    const se = new Set(r.get());
    ne === "single" && se.clear(), se.add(J), r.set(se);
  }, Z = (J, ne = "multiple") => {
    const se = new Set(r.get());
    ne === "single" && se.clear(), J.forEach((de) => se.add(de)), r.set(se);
  }, ee = (J) => {
    const ne = new Set(r.get());
    ne.delete(J), r.set(ne);
  }, Q = (J) => r.get().has(J), Y = (J, ne = "multiple") => {
    const se = new Set(r.get());
    se.has(J) ? se.delete(J) : (ne === "single" && se.clear(), se.add(J)), r.set(se);
  }, b = (J = "multiple", ne) => {
    if (J === "single") {
      const se = n.get()[0];
      if (se) {
        const de = ke(se);
        r.set(/* @__PURE__ */ new Set([de])), f.set(1);
      }
    } else {
      if (ne?.selectionFilterType || ne?.selectionFilterMimeIncludes && ne.selectionFilterMimeIncludes.length > 0) {
        const se = n.get().filter((de) => {
          const Ue = ne.selectionFilterType, Ee = ne.selectionFilterMimeIncludes;
          return Ue === "files" && de.type === "dir" || Ue === "dirs" && de.type === "file" ? !1 : Ee && Array.isArray(Ee) && Ee.length > 0 && de.type !== "dir" ? de.mime_type ? Ee.some((Se) => de.mime_type?.startsWith(Se)) : !1 : !0;
        }).map((de) => ke(de));
        r.set(new Set(se));
      } else {
        const se = new Set(n.get().map((de) => ke(de)));
        r.set(se);
      }
      j(r.get().size);
    }
  }, F = () => {
    r.set(/* @__PURE__ */ new Set()), f.set(0);
  }, M = (J) => {
    const ne = new Set(J ?? []), se = new Set(
      n.get().filter((de) => ne.has(de.path)).map((de) => ke(de))
    );
    r.set(se), f.set(se.size);
  }, j = (J) => {
    f.set(J);
  }, le = (J) => {
    g.set(!!J);
  }, L = () => g.get(), O = (J, ne) => {
    const se = n.get().filter((de) => ne.has(ke(de)));
    l.set({
      type: J,
      path: x.get().path,
      items: new Set(se)
    });
  }, N = (J) => Xe([l], (ne) => ne.type === "cut" && Array.from(ne.items).some((se) => ke(se) === J)), I = (J) => Xe([l], (ne) => ne.type === "copy" && Array.from(ne.items).some((se) => ke(se) === J)), W = (J) => {
    const ne = N(J);
    return oe(ne).value ?? !1;
  }, A = (J) => {
    const ne = I(J);
    return oe(ne).value ?? !1;
  }, U = () => {
    l.set({ type: "copy", path: "", items: /* @__PURE__ */ new Set() });
  }, H = () => l.get(), D = (J) => {
    c.set(J);
  }, V = () => c.get(), ue = () => {
    c.set(null);
  }, be = () => {
    const J = h.get(), ne = p.get();
    if (ne > 0) {
      const se = ne - 1, de = J[se];
      de && (p.set(se), m(de, !1));
    }
  }, q = () => {
    const J = h.get(), ne = p.get();
    if (ne < J.length - 1) {
      const se = ne + 1, de = J[se];
      de && (p.set(se), m(de, !1));
    }
  }, ae = Xe([p], (J) => J > 0), _e = Xe(
    [h, p],
    (J, ne) => ne < J.length - 1
  );
  return {
    // Atoms (state)
    files: n,
    storages: e,
    currentPath: s,
    sort: i,
    filter: d,
    selectedKeys: r,
    selectedCount: f,
    loading: g,
    draggedItem: c,
    clipboardItems: l,
    // Computed values
    path: x,
    sortedFiles: $,
    selectedItems: y,
    // Actions
    setPath: m,
    setFiles: w,
    setStorages: v,
    setSort: S,
    toggleSort: C,
    clearSort: E,
    setFilter: P,
    clearFilter: B,
    select: K,
    selectMultiple: Z,
    deselect: ee,
    toggleSelect: Y,
    selectAll: b,
    isSelected: Q,
    clearSelection: F,
    setSelection: M,
    setSelectedCount: j,
    setLoading: le,
    isLoading: L,
    setClipboard: O,
    createIsCut: N,
    createIsCopied: I,
    isCut: W,
    isCopied: A,
    clearClipboard: U,
    getClipboard: H,
    setDraggedItem: D,
    getDraggedItem: V,
    clearDraggedItem: ue,
    setReadOnly: (J) => {
      t.set(J);
    },
    getReadOnly: () => t.get(),
    isReadOnly: (J) => t.get() ? !0 : J.read_only ?? !1,
    // Navigation
    goBack: be,
    goForward: q,
    canGoBack: ae,
    canGoForward: _e,
    navigationHistory: h,
    historyIndex: p
  };
};
class en {
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
class Xo extends en {
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
    const { storage: n, path: i } = this.split(e || ""), d = n || t;
    return this.combine(i ?? "", d);
  }
  parent(e) {
    const { storage: t, path: n } = this.split(e), i = t || this.defaultStorage;
    if (!n) return this.combine("", i);
    const d = n.replace(/\/+$/g, "").replace(/^\/+/, ""), r = d.lastIndexOf("/");
    return r <= 0 ? this.combine("", i) : this.combine(d.slice(0, r), i);
  }
  join(e, t) {
    const { storage: n, path: i } = this.split(e), d = n || this.defaultStorage, r = (i ?? "").replace(/\/$/, ""), l = r ? `${r}/${t}` : t;
    return this.combine(l, d);
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
    const t = this.files.slice(), n = t.findIndex((i) => i.path === e.path);
    n === -1 ? t.push(e) : t[n] = e, this.replaceAll(t);
  }
  removeExact(e) {
    const t = this.files.filter((n) => n.path !== e);
    this.replaceAll(t);
  }
  removeTree(e) {
    const t = [], n = [];
    for (const i of this.files)
      this.isInTree(i.path, e) ? t.push(i) : n.push(i);
    this.replaceAll(n);
    for (const i of t)
      this.contentStore.delete(i.path);
    return t;
  }
  isInTree(e, t) {
    return e === t || e.startsWith(`${t}/`);
  }
  getTree(e, t = this.files) {
    return t.filter((n) => this.isInTree(n.path, e)).sort((n, i) => n.path.length - i.path.length);
  }
  uniqueName(e, t, n) {
    if (!n.has(this.join(e, t))) return t;
    const i = t.lastIndexOf("."), d = i > 0 ? t.slice(0, i) : t, r = i > 0 ? t.slice(i) : "";
    let l = 1;
    for (; ; ) {
      const c = `${d} copy ${l}${r}`, f = this.join(e, c);
      if (!n.has(f)) return c;
      l++;
    }
  }
  topLevelSources(e, t = this.defaultStorage) {
    const n = [...new Set(e)].map((d) => this.normalizePath(d, t)).filter((d) => this.findByPath(d)).sort((d, r) => d.length - r.length), i = [];
    for (const d of n)
      i.some((r) => this.isInTree(d, r)) || i.push(d);
    return i;
  }
  makeDirEntry(e, t) {
    const n = this.join(e, t), { storage: i } = this.split(n);
    return {
      storage: i || this.defaultStorage,
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
  makeFileEntry(e, t, n = 0, i = null) {
    const d = this.join(e, t), { storage: r } = this.split(d);
    return {
      storage: r || this.defaultStorage,
      dir: e,
      basename: t,
      extension: this.getExtension(t),
      path: d,
      type: "file",
      file_size: n,
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
    const t = this.normalizePath(e.path), { storage: n } = this.split(t), i = [];
    for (const r of e.items) {
      const l = this.normalizePath(r.path, n || this.defaultStorage), c = this.findByPath(l);
      c && (c.type === "dir" ? i.push(...this.removeTree(c.path)) : (this.removeExact(c.path), this.contentStore.delete(c.path), i.push(c)));
    }
    return { ...this.resultForDir(t), deleted: i };
  }
  async rename(e) {
    this.ensureWritable(), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), { storage: n } = this.split(t), i = this.normalizePath(
      e.item || e.path,
      n || this.defaultStorage
    ), d = this.findByPath(i);
    if (!d) throw new Error("Item not found");
    const r = d.dir, l = this.join(r, e.name);
    if (l !== d.path && this.findByPath(l))
      throw new Error("Target already exists");
    if (d.type === "dir") {
      const f = d.path, g = l, h = this.files.map((p) => {
        if (p.storage !== d.storage || !this.isInTree(p.path, f)) return p;
        const x = g + p.path.slice(f.length);
        return this.cloneEntry(p, {
          path: x,
          dir: this.parent(x),
          basename: p.path === f ? e.name : p.basename,
          last_modified: Date.now()
        });
      });
      for (const [p, x] of Array.from(this.contentStore.entries()))
        this.isInTree(p, f) && (this.contentStore.delete(p), this.contentStore.set(g + p.slice(f.length), x));
      this.replaceAll(h);
    } else {
      const f = this.cloneEntry(d, {
        path: l,
        basename: e.name,
        extension: this.getExtension(e.name),
        last_modified: Date.now()
      });
      this.upsert(f), this.removeExact(d.path);
      const g = this.contentStore.get(d.path);
      g !== void 0 && (this.contentStore.delete(d.path), this.contentStore.set(f.path, g));
    }
    const c = e.path ? this.normalizePath(e.path, d.storage || this.defaultStorage) : r;
    return this.resultForDir(c || r);
  }
  async copy(e) {
    this.ensureWritable(), this.validateParam(e.sources, "sources"), this.validateParam(e.destination, "destination");
    const t = this.normalizePath(
      e.destination,
      e.path ? this.split(this.normalizePath(e.path)).storage || this.defaultStorage : this.defaultStorage
    ), { storage: n } = this.split(t), i = this.topLevelSources(e.sources, n || this.defaultStorage), d = new Set(this.files.map((l) => l.path)), r = [];
    for (const l of i) {
      const c = this.findByPath(l);
      if (!c) continue;
      if (c.type === "file") {
        const p = this.uniqueName(t, c.basename, d), x = this.makeFileEntry(
          t,
          p,
          c.file_size || 0,
          c.mime_type
        );
        r.push(x), d.add(x.path);
        const $ = this.contentStore.get(c.path);
        $ !== void 0 && this.contentStore.set(x.path, $);
        continue;
      }
      const f = this.getTree(c.path), g = this.uniqueName(t, c.basename, d), h = /* @__PURE__ */ new Map();
      h.set(c.path, this.join(t, g));
      for (const p of f) {
        const x = p.path === c.path ? h.get(c.path) : this.join(h.get(p.dir), p.basename);
        h.set(p.path, x);
        const $ = p.path === c.path ? t : h.get(p.dir), y = p.path === c.path ? g : p.basename, m = this.cloneEntry(p, {
          path: x,
          dir: $,
          basename: y,
          extension: p.type === "file" ? this.getExtension(y) : "",
          last_modified: Date.now()
        });
        if (r.push(m), d.add(m.path), p.type === "file") {
          const w = this.contentStore.get(p.path);
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
    ), { storage: n } = this.split(t), i = this.topLevelSources(e.sources, n || this.defaultStorage);
    let d = this.files.slice();
    for (const r of i) {
      const l = d.find(($) => $.path === r);
      if (!l) continue;
      if (l.type === "dir" && this.isInTree(t, l.path))
        throw new Error("Cannot move directory into itself");
      if (l.dir === t)
        continue;
      const c = this.getTree(l.path, d), f = new Set(c.map(($) => $.path)), g = new Set(d.filter(($) => !f.has($.path)).map(($) => $.path)), h = this.uniqueName(t, l.basename, g), p = /* @__PURE__ */ new Map();
      p.set(l.path, this.join(t, h));
      const x = /* @__PURE__ */ new Map();
      for (const $ of c) {
        const y = $.path === l.path ? p.get(l.path) : this.join(p.get($.dir), $.basename);
        p.set($.path, y);
        const m = $.path === l.path ? t : p.get($.dir), w = $.path === l.path ? h : $.basename;
        x.set(
          $.path,
          this.cloneEntry($, {
            path: y,
            dir: m,
            basename: w,
            extension: $.type === "file" ? this.getExtension(w) : "",
            last_modified: Date.now()
          })
        );
      }
      d = d.map(($) => x.get($.path) || $);
      for (const [$, y] of p.entries()) {
        if ($ === y) continue;
        const m = this.contentStore.get($);
        m !== void 0 && (this.contentStore.delete($), this.contentStore.set(y, m));
      }
    }
    return this.replaceAll(d), this.resultForDir(t);
  }
  async archive(e) {
    this.ensureWritable(), this.validateParam(e.path, "path"), this.validateParam(e.items, "items"), this.validateParam(e.name, "name");
    const t = this.normalizePath(e.path), n = e.name.endsWith(".zip") ? e.name : `${e.name}.zip`, i = this.makeFileEntry(t, n, 0, "application/zip");
    return this.upsert(i), this.resultForDir(t);
  }
  async unarchive(e) {
    this.ensureWritable(), this.validateParam(e.item, "item"), this.validateParam(e.path, "path");
    const t = this.normalizePath(e.item), n = this.normalizePath(e.path), i = this.findByPath(t);
    if (!i) throw new Error("Archive not found");
    const d = i.basename.replace(/\.zip$/i, ""), r = this.makeDirEntry(n, d);
    return this.upsert(r), this.resultForDir(n);
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
    const i = new Uint8Array(n);
    let d = "";
    for (let r = 0; r < i.length; r++) d += String.fromCharCode(i[r]);
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
    return this.files.filter((i) => {
      if (n) {
        if (e.deep) {
          if (!this.isInTree(i.path, n)) return !1;
        } else if (i.dir !== n)
          return !1;
      }
      return i.basename.toLowerCase().includes(t) || i.path.toLowerCase().includes(t);
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
    for (const i of t) {
      const d = this.join(n, i);
      this.findByPath(d) || this.upsert(this.makeDirEntry(n, i)), n = d;
    }
    return n;
  }
  configureUploader(e, t) {
    if (!e) return;
    const n = typeof window < "u" && new URLSearchParams(window.location.search).get("slowUpload") === "1", i = (d) => new Promise((r) => setTimeout(r, d));
    e.addUploader(async (d) => {
      const r = d.map((l) => e.getFile(l)).filter(Boolean);
      if (r.length) {
        e.emit("upload-start", r);
        for (const l of r)
          try {
            this.ensureWritable();
            const c = this.normalizePath(t.getTargetPath()), f = l?.name || "file", g = l?.type || null, h = l?.data, p = l?.size || 0, x = f.split("/").filter(Boolean), $ = x.pop() || f, y = x.length ? this.ensureDirPath(c, x) : c;
            if (n)
              for (let w = 10; w <= 90; w += 10)
                await i(300), e.emit("upload-progress", l, { bytesUploaded: w, bytesTotal: 100 });
            const m = this.makeFileEntry(y, $, p, g);
            if (this.upsert(m), h)
              try {
                const w = await h.arrayBuffer();
                this.contentStore.set(m.path, w);
              } catch {
                this.contentStore.set(m.path, "");
              }
            else
              this.contentStore.set(m.path, "");
            e.emit("upload-success", l, { status: 200, body: {} });
          } catch (c) {
            e.emit("upload-error", l, c instanceof Error ? c : new Error("Upload failed"));
          }
      }
    });
  }
}
function $n(s, e, t) {
  const n = `HTTP ${e}: ${t}`;
  if (!s)
    return n;
  try {
    const i = JSON.parse(s);
    if (i.message)
      return i.message;
    if (i.error) {
      if (typeof i.error == "string")
        return i.error;
      if (i.error.message)
        return i.error.message;
    }
    if (i.errors && Array.isArray(i.errors) && i.errors.length > 0) {
      const d = i.errors.map((r) => r.message).filter((r) => !!r);
      if (d.length > 0)
        return d.join(", ");
    }
    return i.detail ? i.detail : i.title ? i.title : s;
  } catch {
    return s || n;
  }
}
class Wn extends en {
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
    const n = this.getHeaders();
    delete n["Content-Type"], e.use(Ao, {
      endpoint: `${this.config.baseURL}${this.config.url.upload}`,
      fieldName: "file",
      bundle: !1,
      headers: n,
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
    const n = `${this.config.baseURL}${e}`, i = await fetch(n, {
      ...t,
      headers: {
        ...this.getHeaders(),
        ...t.headers
      }
    });
    if (!i.ok) {
      const r = await i.text(), l = $n(r, i.status, i.statusText);
      throw new Error(l);
    }
    return i.status === 204 || i.status === 304 ? {} : (i.headers.get("content-type") || "").includes("application/json") ? await i.json() : await i.text();
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
    const t = new URLSearchParams({ path: e.path }), n = `${this.config.baseURL}${this.config.url.preview}?${t.toString()}`, i = await fetch(n, { headers: this.getHeaders(), signal: e.signal });
    if (!i.ok) {
      const r = await i.text(), l = $n(r, i.status, i.statusText);
      throw new Error(l);
    }
    return { content: await i.text(), mimeType: i.headers.get("Content-Type") || void 0 };
  }
  getDownloadUrl(e) {
    this.validatePath(e.path);
    const t = new URLSearchParams({ path: e.path });
    return `${this.config.baseURL}${this.config.url.download}?${t.toString()}`;
  }
  async search(e) {
    const t = this.config.url.search, n = new URLSearchParams();
    e.path && n.set("path", e.path), e.filter && n.set("filter", e.filter), e.deep && n.set("deep", "1"), e.size && e.size !== "all" && n.set("size", e.size);
    const i = n.toString() ? `${t}?${n.toString()}` : t;
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
class Dp extends en {
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
    this.storages = [...new Set(t)], this.defaultStorage = e.storage || this.storages[0] || "indexeddb", this.storages.includes(this.defaultStorage) || this.storages.unshift(this.defaultStorage), this.storagesSet = new Set(this.storages), this.readOnly = !!e.readOnly, this.version = e.version || 1, this.driver = new Xo({
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
      }, n.onupgradeneeded = (i) => {
        const d = i.target.result;
        if (!d.objectStoreNames.contains("files")) {
          const r = d.createObjectStore("files", { keyPath: "path" });
          r.createIndex("storage", "storage", { unique: !1 }), r.createIndex("dir", "dir", { unique: !1 });
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
    const t = (await this.getDB()).transaction(["files", "content"], "readonly"), n = t.objectStore("files"), i = t.objectStore("content"), [d, r] = await Promise.all([
      this.requestToPromise(n.getAll()),
      this.requestToPromise(i.getAll())
    ]);
    await this.waitTransaction(t), this.entries.length = 0, this.entries.push(...d.filter((l) => this.isManagedStorage(l.storage))), this.contentStore.clear();
    for (const l of r)
      this.isManagedPath(l?.path) && this.contentStore.set(l.path, l.content);
  }
  async persistSnapshot() {
    if (this.readOnly) return;
    const t = (await this.getDB()).transaction(["files", "content"], "readwrite"), n = t.objectStore("files"), i = t.objectStore("content"), d = this.requestToPromise(
      n.getAll()
    ), r = this.requestToPromise(
      i.getAll()
    ), [l, c] = await Promise.all([
      d,
      r
    ]);
    n.clear(), i.clear();
    for (const f of l)
      this.isManagedStorage(f.storage) || n.put(f);
    for (const f of c)
      this.isManagedPath(f.path) || i.put(f);
    for (const f of this.entries)
      this.isManagedStorage(f.storage) && n.put(f);
    for (const [f, g] of this.contentStore.entries())
      this.isManagedPath(f) && i.put({ path: f, content: g });
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
class Qo {
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
    const t = Ht.list(e);
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
    const t = Ht.search(e.path, e.filter, e.deep, e.size);
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
function Jo(s) {
  const e = oe(s.state);
  return {
    current: R(() => e.value.theme || "silver"),
    set: (i) => {
      s.set("theme", i);
    }
  };
}
const Zo = (s, e) => {
  const t = Ro(s.id ?? "vf"), n = Co(), i = e.i18n, d = s.locale ?? e.locale, r = Go(s.id ?? "vf", s.config ?? {}), l = Yo();
  if (!s.driver)
    throw new Error("Driver is required for VueFinder");
  const c = new Qo(s.driver), f = Vo(
    t,
    d,
    n,
    i,
    r
  ), g = r.get("metricUnits") ? jn : Zt;
  return Pt({
    // app version
    version: No,
    // config store
    config: r,
    // Theme
    theme: (() => {
      const h = Jo(r);
      return {
        current: h.current,
        set: h.set
      };
    })(),
    // files store
    fs: l,
    // root element
    root: null,
    // app id
    debug: s.debug ?? !1,
    // Event Bus
    emitter: n,
    // storage
    storage: t,
    // localization object
    i18n: f,
    // modal state
    modal: jo(r),
    // adapter for file operations (always wrapped with AdapterManager)
    // Use markRaw to prevent TanStack Query from being made reactive
    adapter: go(c),
    // upload queue/engine - created once so an upload keeps running (and can be
    // reported on in the status bar) even while the upload modal is closed
    upload: Ko({
      fs: l,
      config: r,
      adapter: c,
      emitter: n,
      t: f.t,
      filesize: g,
      customUploader: s.customUploader,
      debug: s.debug ?? !1
    }),
    // active features
    features: Hn(s.features),
    // selection mode
    selectionMode: s.selectionMode || "multiple",
    // selection filters - computed properties for better reactivity
    selectionFilterType: R(() => s.selectionFilterType || "both"),
    selectionFilterMimeIncludes: R(() => s.selectionFilterMimeIncludes || []),
    // treeViewData - temp. opened folders
    treeViewData: [],
    // human readable file sizes
    filesize: g,
    // possible items of the context menu
    contextMenuItems: s.contextMenuItems,
    // expose custom uploader if provided
    customUploader: s.customUploader
  });
}, es = ["data-theme"], ts = { class: "vuefinder__modal-layout__container" }, ns = { class: "vuefinder__modal-layout__content" }, os = {
  key: 0,
  class: "vuefinder__modal-layout__footer"
}, ss = {
  key: 0,
  class: "vuefinder__modal-drag-overlay"
}, as = { class: "vuefinder__modal-drag-message" }, ze = /* @__PURE__ */ re({
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
    const e = T(null), t = ie();
    t.config;
    const n = s, i = () => {
      n.onRequestClose ? n.onRequestClose() : t.modal.close();
    };
    ye(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), De(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768 && e.value) {
          const l = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: l,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    });
    const d = (r) => {
      r.target.classList.contains(
        "vuefinder__modal-layout__wrapper"
      ) && (r.preventDefault(), r.stopPropagation());
    };
    return (r, l) => (u(), _("div", {
      "data-theme": a(t).theme.current,
      class: "vuefinder__themer vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "0",
      onKeyup: l[5] || (l[5] = He((c) => i(), ["esc"]))
    }, [
      l[6] || (l[6] = o("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      o("div", ts, [
        o("div", {
          class: "vuefinder__modal-layout__wrapper",
          onContextmenu: d,
          onMousedown: l[4] || (l[4] = fe((c) => i(), ["self"]))
        }, [
          o("div", {
            ref_key: "modalBody",
            ref: e,
            class: te(["vuefinder__modal-layout__body", n.bodyClass]),
            style: Pe(n.bodyStyle),
            onTouchstart: l[0] || (l[0] = //@ts-ignore
            (...c) => n.onBodyTouchstart && n.onBodyTouchstart(...c)),
            onTouchmove: l[1] || (l[1] = //@ts-ignore
            (...c) => n.onBodyTouchmove && n.onBodyTouchmove(...c)),
            onTouchend: l[2] || (l[2] = //@ts-ignore
            (...c) => n.onBodyTouchend && n.onBodyTouchend(...c)),
            onTouchcancel: l[3] || (l[3] = //@ts-ignore
            (...c) => n.onBodyTouchcancel && n.onBodyTouchcancel(...c))
          }, [
            o("div", ns, [
              Me(r.$slots, "default")
            ]),
            r.$slots.buttons ? (u(), _("div", os, [
              Me(r.$slots, "buttons")
            ])) : z("", !0)
          ], 38)
        ], 32)
      ]),
      n.showDragOverlay ? (u(), _("div", ss, [
        o("div", as, k(n.dragOverlayText || "Drag and drop the files/folders to here."), 1)
      ])) : z("", !0)
    ], 40, es));
  }
}), is = { class: "vuefinder__modal-header" }, ls = { class: "vuefinder__modal-header__icon-container" }, rs = {
  id: "modal-title",
  class: "vuefinder__modal-header__title"
}, Ne = /* @__PURE__ */ re({
  __name: "ModalHeader",
  props: {
    title: {},
    icon: {}
  },
  setup(s) {
    return (e, t) => (u(), _("div", is, [
      o("div", ls, [
        (u(), X(Ln(s.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      o("div", rs, k(s.title), 1)
    ]));
  }
}), ds = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  viewBox: "0 0 24 24"
};
function cs(s, e) {
  return u(), _("svg", ds, [...e[0] || (e[0] = [
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
const tn = { render: cs }, us = { class: "vuefinder__about-modal__content" }, vs = { class: "vuefinder__about-modal__main" }, fs = { class: "vuefinder__about-modal__tab-content" }, _s = { class: "vuefinder__about-modal__lead" }, ps = { class: "vuefinder__about-modal__description" }, ms = { class: "vuefinder__about-modal__links" }, hs = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link-btn",
  target: "_blank",
  rel: "noopener noreferrer"
}, gs = { class: "vuefinder__about-modal__meta" }, ys = { class: "vuefinder__about-modal__meta-item" }, ws = { class: "vuefinder__about-modal__meta-label" }, bs = { class: "vuefinder__about-modal__meta-value" }, ks = { class: "vuefinder__about-modal__meta-item" }, $s = { class: "vuefinder__about-modal__meta-label" }, Gn = /* @__PURE__ */ re({
  __name: "ModalAbout",
  setup(s) {
    const e = ie(), { t } = e.i18n;
    return (n, i) => (u(), X(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: i[0] || (i[0] = (d) => a(e).modal.close())
        }, k(a(t)("Close")), 1)
      ]),
      default: ce(() => [
        o("div", us, [
          G(Ne, {
            icon: a(tn),
            title: "Vuefinder " + a(e).version
          }, null, 8, ["icon", "title"]),
          o("div", vs, [
            o("div", fs, [
              o("div", _s, k(a(t)("A modern, customizable file manager component built for Vue.")), 1),
              o("div", ps, k(a(t)("If you like it, please follow and ⭐ star on GitHub.")), 1),
              o("div", ms, [
                o("a", hs, k(a(t)("Project Home")), 1),
                i[1] || (i[1] = o("a", {
                  href: "https://github.com/n1crack/vuefinder",
                  class: "vuefinder__about-modal__link-btn",
                  target: "_blank",
                  rel: "noopener noreferrer"
                }, " GitHub ", -1))
              ]),
              o("div", gs, [
                o("div", ys, [
                  o("span", ws, k(a(t)("Version")), 1),
                  o("span", bs, k(a(e).version), 1)
                ]),
                o("div", ks, [
                  o("span", $s, k(a(t)("License")), 1),
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
}), xs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Ss(s, e) {
  return u(), _("svg", xs, [...e[0] || (e[0] = [
    o("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ])]);
}
const Yn = { render: Ss }, Cs = { class: "vuefinder__delete-modal__content" }, Fs = { class: "vuefinder__delete-modal__form" }, Es = { class: "vuefinder__delete-modal__description" }, Ps = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ts = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ds = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ms = { class: "vuefinder__delete-modal__file-name" }, Is = { class: "vuefinder__delete-modal__confirmation" }, As = { class: "vuefinder__delete-modal__confirmation-label" }, Os = { class: "vuefinder__delete-modal__confirmation-text" }, Ls = ["disabled"], Tt = /* @__PURE__ */ re({
  __name: "ModalDelete",
  setup(s) {
    const e = ie(), t = Be(e), { t: n } = e.i18n, i = e.fs, d = oe(i.path), r = T(e.modal.data.items), l = T(!1), c = () => {
      r.value.length && l.value && e.adapter.delete({
        path: d.value.path,
        items: r.value.map(({ path: f, type: g }) => ({
          path: f,
          type: g
        }))
      }).then((f) => {
        t.success(n("Files deleted.")), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        t.error(Fe(f, n("Failed to delete files")));
      });
    };
    return (f, g) => (u(), X(ze, null, {
      buttons: ce(() => [
        o("div", Is, [
          o("label", As, [
            me(o("input", {
              "onUpdate:modelValue": g[0] || (g[0] = (h) => l.value = h),
              type: "checkbox",
              class: "vuefinder__delete-modal__checkbox"
            }, null, 512), [
              [lt, l.value]
            ]),
            o("span", Os, k(a(n)("I'm sure delete it, This action cannot be undone.")), 1)
          ])
        ]),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-danger",
          disabled: !l.value,
          onClick: c
        }, k(a(n)("Yes, Delete!")), 9, Ls),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[1] || (g[1] = (h) => a(e).modal.close())
        }, k(a(n)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          G(Ne, {
            icon: a(Yn),
            title: a(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          o("div", Cs, [
            o("div", Fs, [
              o("p", Es, k(a(n)("Are you sure you want to delete these files?")), 1),
              o("div", Ps, [
                (u(!0), _(ve, null, he(r.value, (h) => (u(), _("p", {
                  key: h.path,
                  class: "vuefinder__delete-modal__file"
                }, [
                  h.type === "dir" ? (u(), _("svg", Ts, [...g[2] || (g[2] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), _("svg", Ds, [...g[3] || (g[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Ms, k(h.basename), 1)
                ]))), 128))
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Rs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Bs(s, e) {
  return u(), _("svg", Rs, [...e[0] || (e[0] = [
    o("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ])]);
}
const Xn = { render: Bs }, zs = { class: "vuefinder__rename-modal__content" }, Vs = { class: "vuefinder__rename-modal__item" }, Us = { class: "vuefinder__rename-modal__item-info" }, Ns = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hs = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, js = { class: "vuefinder__rename-modal__item-name" }, Dt = /* @__PURE__ */ re({
  __name: "ModalRename",
  setup(s) {
    const e = ie(), t = Be(e), { t: n } = e.i18n, i = e.fs, d = oe(i.path), r = T(e.modal.data.items[0]), l = T(r.value.basename), c = () => {
      l.value != r.value.basename && e.adapter.rename({
        path: d.value.path,
        item: r.value.path,
        name: l.value
      }).then((f) => {
        t.success(n("%s is renamed.", l.value)), e.fs.setFiles(f.files), e.modal.close();
      }).catch((f) => {
        t.error(Fe(f, n("Failed to rename")));
      });
    };
    return (f, g) => (u(), X(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: c
        }, k(a(n)("Rename")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: g[1] || (g[1] = (h) => a(e).modal.close())
        }, k(a(n)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          G(Ne, {
            icon: a(Xn),
            title: a(n)("Rename")
          }, null, 8, ["icon", "title"]),
          o("div", zs, [
            o("div", Vs, [
              o("p", Us, [
                r.value.type === "dir" ? (u(), _("svg", Ns, [...g[2] || (g[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), _("svg", Hs, [...g[3] || (g[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", js, k(r.value.basename), 1)
              ]),
              me(o("input", {
                "onUpdate:modelValue": g[0] || (g[0] = (h) => l.value = h),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text",
                onKeyup: He(c, ["enter"])
              }, null, 544), [
                [Ke, l.value]
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
  const s = ie(), e = R(() => s.features);
  return {
    enabled: (n) => e.value[n] ?? !1
  };
}
function Ks(s, e = null) {
  return new Date(s * 1e3).toLocaleString(e ?? navigator.language ?? "en-US");
}
const qs = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "vuefinder__breadcrumb__close-icon",
  viewBox: "0 0 24 24"
};
function Ws(s, e) {
  return u(), _("svg", qs, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Qn = { render: Ws }, Gs = { class: "vuefinder__preview-chrome" }, Ys = { class: "vuefinder__preview-chrome__popover-host vuefinder__preview-chrome__info-host" }, Xs = ["title", "aria-label"], Qs = {
  key: 0,
  class: "vuefinder__preview-chrome__popover"
}, Js = { class: "vuefinder__preview-chrome__popover-label" }, Zs = { class: "vuefinder__preview-chrome__popover-value" }, ea = ["title"], ta = { class: "vuefinder__preview-chrome__actions" }, na = ["aria-label"], oa = {
  key: 1,
  class: "vuefinder__preview-chrome__popover-host"
}, sa = ["title", "aria-label"], aa = {
  key: 0,
  class: "vuefinder__preview-chrome__popover"
}, ia = ["href", "download"], la = { class: "vuefinder__preview-chrome__popover-hint" }, ra = ["title", "aria-label"], da = /* @__PURE__ */ re({
  name: "PreviewChrome",
  __name: "PreviewChrome",
  emits: ["close-request"],
  setup(s, { emit: e }) {
    const t = e, n = ie(), { enabled: i } = Ve(), { t: d } = n.i18n, r = oe(n.fs.sortedFiles), l = R(() => r.value.filter((v) => v.type === "file")), c = R(
      () => l.value.findIndex((v) => v.path === n.modal.data.item.path)
    ), f = R(() => l.value.length), g = R(() => n.modal.controls ?? null), h = R(() => !!a(g.value?.isEditing));
    R(() => !!a(g.value?.isDirty));
    const p = T(!1), x = T(!1), $ = (v) => {
      v === "info" ? (p.value = !p.value, x.value = !1) : (x.value = !x.value, p.value = !1);
    }, y = (v) => {
      v.target.closest(".vuefinder__preview-chrome__popover-host") || (p.value = !1, x.value = !1);
    };
    ye(() => document.addEventListener("mousedown", y)), wt(() => document.removeEventListener("mousedown", y));
    const m = R(() => {
      const v = n.modal.data.item, S = [
        { label: d("File Size"), value: n.filesize(v.file_size ?? 0) },
        { label: d("Last Modified"), value: Ks(v.last_modified ?? 0) }
      ];
      v.mime_type && S.push({ label: d("Type"), value: v.mime_type });
      const C = a(g.value?.extraInfo);
      if (Array.isArray(C))
        for (const E of C) S.push(E);
      return S.push({ label: d("Path"), value: v.path }), S;
    }), w = R(() => n.adapter.getDownloadUrl(n.modal.data.item));
    return (v, S) => (u(), _("div", Gs, [
      o("div", Ys, [
        o("button", {
          type: "button",
          class: te(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": p.value }]),
          title: a(d)("File info"),
          "aria-label": a(d)("File info"),
          onClick: S[0] || (S[0] = (C) => $("info"))
        }, [
          G(a(tn), { class: "vuefinder__preview-chrome__icon" })
        ], 10, Xs),
        p.value ? (u(), _("div", Qs, [
          (u(!0), _(ve, null, he(m.value, (C) => (u(), _("div", {
            key: C.label,
            class: "vuefinder__preview-chrome__popover-row"
          }, [
            o("span", Js, k(C.label), 1),
            o("span", Zs, k(C.value), 1)
          ]))), 128))
        ])) : z("", !0)
      ]),
      o("div", {
        id: "modal-title",
        class: "vuefinder__preview-chrome__title",
        title: a(n).modal.data.item.path
      }, k(a(n).modal.data.item.basename), 9, ea),
      o("div", ta, [
        f.value > 1 && !h.value ? (u(), _("span", {
          key: 0,
          class: "vuefinder__preview-chrome__counter",
          "aria-label": a(d)("File %s of %s", String(c.value + 1), String(f.value))
        }, k(c.value + 1) + " / " + k(f.value), 9, na)) : z("", !0),
        a(i)("download") && !h.value ? (u(), _("div", oa, [
          o("button", {
            type: "button",
            class: te(["vuefinder__preview-chrome__info-btn", { "vuefinder__preview-chrome__info-btn--active": x.value }]),
            title: a(d)("Download"),
            "aria-label": a(d)("Download"),
            onClick: S[1] || (S[1] = (C) => $("download"))
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
          ])], 10, sa),
          x.value ? (u(), _("div", aa, [
            o("a", {
              href: w.value,
              download: w.value,
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
              o("span", null, k(a(d)("Download")), 1)
            ], 8, ia),
            o("p", la, k(a(d)(
              `Download doesn't work? You can try right-click "Download" button, select "Save link as...".`
            )), 1)
          ])) : z("", !0)
        ])) : z("", !0),
        o("button", {
          type: "button",
          class: "vuefinder__preview-chrome__btn vuefinder__preview-chrome__btn--icon vuefinder__preview-chrome__btn--close",
          title: a(d)("Close"),
          "aria-label": a(d)("Close"),
          onClick: S[2] || (S[2] = (C) => t("close-request"))
        }, [
          G(a(Qn), { class: "vuefinder__preview-chrome__icon vuefinder__preview-chrome__icon--lg" })
        ], 8, ra)
      ])
    ]));
  }
});
function nn(s) {
  const e = ie();
  ye(() => {
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
const ca = { class: "vuefinder__text-preview" }, ua = { class: "vuefinder__text-preview__body" }, va = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, fa = /* @__PURE__ */ re({
  __name: "Text",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = Rn({
      loader: () => import("./CodeMirrorEditor-B6E8tUbA.js").then((v) => v.C),
      delay: 100
    }), n = e, i = T(""), d = T(""), r = T(!1), l = T(!1), c = ie(), f = Be(c), { enabled: g } = Ve(), { t: h } = c.i18n;
    ye(async () => {
      try {
        const v = await c.adapter.getContent({ path: c.modal.data.item.path });
        i.value = v.content, d.value = v.content, n("success");
      } catch (v) {
        Fe(v, "Failed to load text content"), n("success");
      }
    });
    const p = R(
      () => g("edit") && !c.fs.isReadOnly(c.modal.data.item)
    ), x = R(() => r.value), $ = R(() => r.value && d.value !== i.value), y = () => {
      d.value = i.value, r.value = !0, c.modal.setEditMode(!0);
    }, m = () => {
      r.value = !1, d.value = i.value, c.modal.setEditMode(!1);
    }, w = async () => {
      try {
        await c.adapter.save({
          path: c.modal.data.item.path,
          content: d.value
        }), i.value = d.value, f.success(h("Updated.")), r.value = !1, c.modal.setEditMode(!1), n("success");
      } catch (v) {
        f.error(Fe(v, h("Failed to save file")));
      }
    };
    return nn({
      isEditable: p,
      isEditing: x,
      isDirty: $,
      primaryActionLabel: R(() => h("Save")),
      enterEdit: y,
      commitEdit: w,
      cancelEdit: m
    }), (v, S) => (u(), _("div", ca, [
      o("div", ua, [
        (u(), X(Bn, {
          onResolve: S[2] || (S[2] = (C) => l.value = !0)
        }, {
          fallback: ce(() => [
            r.value ? me((u(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": S[1] || (S[1] = (C) => d.value = C),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [Ke, d.value]
            ]) : (u(), _("pre", va, k(i.value), 1))
          ]),
          default: ce(() => [
            G(a(t), {
              "model-value": r.value ? d.value : i.value,
              readonly: !r.value,
              filename: a(c).modal.data.item.basename,
              "onUpdate:modelValue": S[0] || (S[0] = (C) => r.value ? d.value = C : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        me(o("span", null, k(l.value), 513), [
          [qe, !1]
        ])
      ])
    ]));
  }
}), _a = { class: "vuefinder__text-preview" }, pa = { class: "vuefinder__text-preview__body vuefinder__csv-preview__body" }, ma = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, ha = {
  key: 0,
  class: "vuefinder__csv-preview__error"
}, ga = {
  key: 1,
  class: "vuefinder__csv-preview__empty"
}, ya = {
  key: 2,
  class: "vuefinder__csv-preview__table-wrap"
}, wa = { class: "vuefinder__csv-preview__table" }, ba = ["title"], ka = { class: "vuefinder__csv-preview__row-num" }, $a = ["title"], xa = {
  key: 0,
  class: "vuefinder__csv-preview__truncated"
}, Sa = {
  key: 2,
  class: "vuefinder__csv-preview__view-checkbox"
}, jt = 1e3, Ca = /* @__PURE__ */ re({
  name: "CsvPreview",
  __name: "Csv",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = Rn({
      loader: () => import("./CodeMirrorEditor-B6E8tUbA.js").then((Z) => Z.C),
      delay: 100
    }), n = e, i = T(""), d = T(""), r = vt([]), l = vt([]), c = T(null), f = T(!1), g = T(!1), h = R(() => r.value.length > jt), p = R(() => h.value ? r.value.slice(0, jt) : r.value), x = ie(), $ = Be(x), { enabled: y } = Ve(), { t: m } = x.i18n;
    async function w(Z) {
      try {
        const { parse: ee } = await import("./papaparse.min-Brc8PWCw.js").then((F) => F.p), Q = ee(Z, {
          skipEmptyLines: !0,
          delimiter: ""
        });
        if (!Q.data.length) {
          l.value = [], r.value = [];
          return;
        }
        const [Y, ...b] = Q.data;
        l.value = Y ?? [], r.value = b, c.value = null;
      } catch (ee) {
        c.value = Fe(ee, m("Failed to parse CSV")), l.value = [], r.value = [];
      }
    }
    ye(async () => {
      try {
        const Z = await x.adapter.getContent({ path: x.modal.data.item.path });
        i.value = Z.content, d.value = Z.content, await w(Z.content), n("success");
      } catch (Z) {
        Fe(Z, "Failed to load CSV content"), n("success");
      }
    });
    const v = R(() => !f.value && g.value), S = R(
      () => y("edit") && !x.fs.isReadOnly(x.modal.data.item)
    ), C = R(() => f.value), E = R(() => f.value && d.value !== i.value), P = () => {
      d.value = i.value, f.value = !0, g.value = !1, x.modal.setEditMode(!0);
    }, B = () => {
      f.value = !1, d.value = i.value, x.modal.setEditMode(!1);
    }, K = async () => {
      try {
        await x.adapter.save({ path: x.modal.data.item.path, content: d.value }), i.value = d.value, await w(i.value), $.success(m("Updated.")), f.value = !1, x.modal.setEditMode(!1), n("success");
      } catch (Z) {
        $.error(Fe(Z, m("Failed to save file")));
      }
    };
    return nn({
      isEditable: S,
      isEditing: C,
      isDirty: E,
      primaryActionLabel: R(() => m("Save")),
      enterEdit: P,
      commitEdit: K,
      cancelEdit: B
    }), (Z, ee) => (u(), _("div", _a, [
      o("div", pa, [
        v.value ? (u(), _(ve, { key: 1 }, [
          c.value ? (u(), _("div", ha, k(c.value), 1)) : !r.value.length && !l.value.length ? (u(), _("div", ga, k(a(m)("No rows to display")), 1)) : (u(), _("div", ya, [
            o("table", wa, [
              o("thead", null, [
                o("tr", null, [
                  ee[3] || (ee[3] = o("th", { class: "vuefinder__csv-preview__row-num" }, null, -1)),
                  (u(!0), _(ve, null, he(l.value, (Q, Y) => (u(), _("th", {
                    key: Y,
                    title: Q
                  }, k(Q), 9, ba))), 128))
                ])
              ]),
              o("tbody", null, [
                (u(!0), _(ve, null, he(p.value, (Q, Y) => (u(), _("tr", { key: Y }, [
                  o("td", ka, k(Y + 1), 1),
                  (u(!0), _(ve, null, he(Q, (b, F) => (u(), _("td", {
                    key: F,
                    title: b
                  }, k(b), 9, $a))), 128))
                ]))), 128))
              ])
            ]),
            h.value ? (u(), _("div", xa, k(a(m)("Showing first %s rows out of %s", jt, r.value.length)), 1)) : z("", !0)
          ]))
        ], 64)) : (u(), X(Bn, { key: 0 }, {
          fallback: ce(() => [
            f.value ? me((u(), _("textarea", {
              key: 1,
              "onUpdate:modelValue": ee[1] || (ee[1] = (Q) => d.value = Q),
              class: "vuefinder__text-preview__textarea",
              name: "text",
              cols: "30",
              rows: "10"
            }, null, 512)), [
              [Ke, d.value]
            ]) : (u(), _("pre", ma, k(i.value), 1))
          ]),
          default: ce(() => [
            G(a(t), {
              "model-value": f.value ? d.value : i.value,
              readonly: !f.value,
              filename: a(x).modal.data.item.basename,
              "onUpdate:modelValue": ee[0] || (ee[0] = (Q) => f.value ? d.value = Q : null)
            }, null, 8, ["model-value", "readonly", "filename"])
          ]),
          _: 1
        })),
        f.value ? z("", !0) : (u(), _("label", Sa, [
          me(o("input", {
            "onUpdate:modelValue": ee[2] || (ee[2] = (Q) => g.value = Q),
            type: "checkbox"
          }, null, 512), [
            [lt, g.value]
          ]),
          o("span", null, k(a(m)("Show as table")), 1)
        ]))
      ])
    ]));
  }
}), on = async (s, e) => {
  if (e) {
    if (e.isFile) {
      const t = await new Promise((n) => {
        e.file(n);
      });
      s(e, t);
    }
    if (e.isDirectory) {
      const t = e.createReader(), n = await new Promise((i) => {
        t.readEntries(i);
      });
      for (const i of n)
        await on(s, i);
    }
  }
};
function Jn(s) {
  const e = ie(), t = e.upload, n = T(null), i = T(null), d = T(null), r = T(null), l = T(null), c = T(!1), f = () => r.value?.click(), g = () => e.modal.close(), h = (y) => {
    y.preventDefault(), y.stopPropagation(), c.value = !0;
  }, p = (y) => {
    y.preventDefault(), y.stopPropagation(), c.value = !0;
  }, x = (y) => {
    y.preventDefault(), y.stopPropagation(), (!y.relatedTarget || y.relatedTarget === document.body) && (c.value = !1);
  }, $ = (y) => {
    y.preventDefault(), y.stopPropagation(), c.value = !1;
    const m = /^[/\\](.+)/, w = y.dataTransfer;
    w && (w.items && w.items.length ? Array.from(w.items).forEach((v) => {
      if (v.kind === "file") {
        const S = v.webkitGetAsEntry?.();
        if (S)
          on((C, E) => {
            const P = m.exec(C?.fullPath || "");
            t.addFile(E, P ? P[1] : E.name);
          }, S);
        else {
          const C = v.getAsFile?.();
          C && t.addFile(C);
        }
      }
    }) : w.files && w.files.length && Array.from(w.files).forEach((v) => t.addFile(v)));
  };
  return ye(() => {
    r.value?.addEventListener("click", () => i.value?.click()), l.value?.addEventListener("click", () => d.value?.click());
    const y = { capture: !0 };
    document.addEventListener("dragover", h, y), document.addEventListener("dragenter", p, y), document.addEventListener("dragleave", x, y), document.addEventListener("drop", $, y);
    const m = (w) => {
      const v = w.target, S = v.files;
      if (S) {
        for (const C of S) t.addFile(C, C.webkitRelativePath || void 0);
        v.value = "";
      }
    };
    i.value?.addEventListener("change", m), d.value?.addEventListener("change", m);
  }), Te(() => {
    const y = { capture: !0 };
    document.removeEventListener("dragover", h, y), document.removeEventListener("dragenter", p, y), document.removeEventListener("dragleave", x, y), document.removeEventListener("drop", $, y);
  }), {
    container: n,
    internalFileInput: i,
    internalFolderInput: d,
    pickFiles: r,
    pickFolders: l,
    queue: t.queue,
    message: t.message,
    uploading: t.uploading,
    hasFilesInDropArea: c,
    definitions: t.definitions,
    openFileSelector: f,
    upload: t.upload,
    cancel: t.cancel,
    remove: t.remove,
    clear: t.clear,
    close: g,
    getClassNameForEntry: t.getClassNameForEntry,
    getIconForEntry: t.getIconForEntry,
    addExternalFiles: t.addExternalFiles,
    renameEntry: t.renameEntry
  };
}
const xn = "image/png", sn = "image/jpeg", Fa = "image/webp";
function Ea(s) {
  const e = (s.split(".").pop() ?? "").toLowerCase();
  return e === "png" ? xn : e === "webp" ? Fa : e === "gif" ? xn : sn;
}
function Zn(s) {
  return new Promise((e, t) => {
    const n = new Image();
    n.crossOrigin = "anonymous", n.onload = () => e(n), n.onerror = () => t(new Error("Failed to load image")), n.src = s;
  });
}
function eo(s, e) {
  const t = document.createElement("canvas");
  t.width = s, t.height = e;
  const n = t.getContext("2d");
  if (!n) throw new Error("Could not acquire 2D canvas context");
  return { canvas: t, ctx: n };
}
async function Sn(s, e, t) {
  const n = await Zn(s), { canvas: i, ctx: d } = eo(n.naturalWidth, n.naturalHeight);
  return d.filter = e, d.drawImage(n, 0, 0), i.toDataURL(t, t === sn ? 0.92 : void 0);
}
async function Pa(s, e, t, n, i) {
  const d = await Zn(s), r = d.naturalWidth, l = d.naturalHeight, c = e === 90 || e === 270, { canvas: f, ctx: g } = eo(c ? l : r, c ? r : l);
  return g.translate(f.width / 2, f.height / 2), e && g.rotate(e * Math.PI / 180), (t || n) && g.scale(t ? -1 : 1, n ? -1 : 1), g.drawImage(d, -r / 2, -l / 2), f.toDataURL(i, i === sn ? 0.92 : void 0);
}
function Ta(s, e, t) {
  const n = 1 + s / 100, i = 1 + e / 100, d = 1 + t / 100;
  return `brightness(${n}) contrast(${i}) saturate(${d})`;
}
async function Da(s) {
  return await (await fetch(s)).blob();
}
const Ma = { class: "vuefinder__image-editor" }, Ia = {
  class: "vuefinder__image-editor__strip",
  role: "tablist"
}, Aa = ["aria-selected", "onClick"], Oa = {
  key: 0,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, La = {
  key: 1,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ra = {
  key: 2,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ba = {
  key: 3,
  class: "vuefinder__image-editor__tab-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, za = { class: "vuefinder__image-editor__tab-label" }, Va = {
  key: 0,
  class: "vuefinder__image-editor__panel"
}, Ua = { class: "vuefinder__image-editor__stage" }, Na = { class: "vuefinder__image-editor__controls" }, Ha = { class: "vuefinder__image-editor__chips" }, ja = ["onClick"], Ka = ["disabled"], qa = {
  key: 1,
  class: "vuefinder__image-editor__panel"
}, Wa = { class: "vuefinder__image-editor__stage" }, Ga = ["src", "alt"], Ya = { class: "vuefinder__image-editor__controls" }, Xa = { class: "vuefinder__image-editor__rotate-btns" }, Qa = ["title"], Ja = ["title"], Za = ["title"], ei = ["title"], ti = ["disabled"], ni = {
  key: 2,
  class: "vuefinder__image-editor__panel"
}, oi = { class: "vuefinder__image-editor__stage" }, si = ["src", "alt"], ai = { class: "vuefinder__image-editor__controls" }, ii = { class: "vuefinder__image-editor__toggle" }, li = ["disabled"], ri = {
  key: 3,
  class: "vuefinder__image-editor__panel"
}, di = { class: "vuefinder__image-editor__stage" }, ci = ["src", "alt"], ui = { class: "vuefinder__image-editor__controls vuefinder__image-editor__controls--stacked" }, vi = { class: "vuefinder__image-editor__slider" }, fi = { class: "vuefinder__image-editor__slider" }, _i = { class: "vuefinder__image-editor__slider" }, pi = { class: "vuefinder__image-editor__row" }, mi = ["disabled"], hi = /* @__PURE__ */ re({
  name: "ImageEditor",
  __name: "ImageEditor",
  props: {
    src: {},
    filename: {}
  },
  emits: ["update:src"],
  setup(s, { emit: e }) {
    const t = s, n = e, i = ie(), { t: d } = i.i18n, r = T("crop"), l = T(!1), c = T(null), f = [
      { label: "Original", value: null },
      { label: "1:1", value: 1 },
      { label: "4:3", value: 4 / 3 },
      { label: "16:9", value: 16 / 9 },
      { label: "9:16", value: 9 / 16 }
    ], g = st("cropperRef"), h = T(0), p = T(!1), x = T(!1), $ = T(!1), y = T(0), m = T(0), w = T(0), v = R(
      () => Ta(y.value, m.value, w.value)
    );
    pe([() => t.src, r], () => {
      h.value = 0, p.value = !1, x.value = !1, $.value = !1, y.value = 0, m.value = 0, w.value = 0;
    });
    const S = R(() => Ea(t.filename)), C = R(() => {
      const O = [];
      return h.value && O.push(`rotate(${h.value}deg)`), p.value && O.push("scaleX(-1)"), x.value && O.push("scaleY(-1)"), O.length ? { transform: O.join(" ") } : {};
    }), E = (O) => {
      l.value || (r.value = O);
    }, P = () => {
      const N = g.value?.getResult()?.canvas;
      if (!N) return;
      const I = N.toDataURL(S.value, S.value === "image/jpeg" ? 0.92 : void 0);
      n("update:src", I);
    }, B = async () => {
      if (j.value) {
        l.value = !0;
        try {
          const O = await Pa(
            t.src,
            M.value,
            p.value,
            x.value,
            S.value
          );
          n("update:src", O);
        } finally {
          l.value = !1;
        }
      }
    }, K = async () => {
      if ($.value) {
        l.value = !0;
        try {
          const O = await Sn(t.src, "grayscale(1)", S.value);
          n("update:src", O);
        } finally {
          l.value = !1;
        }
      }
    }, Z = async () => {
      if (!(y.value === 0 && m.value === 0 && w.value === 0)) {
        l.value = !0;
        try {
          const O = await Sn(t.src, v.value, S.value);
          n("update:src", O);
        } finally {
          l.value = !1;
        }
      }
    }, ee = () => {
      y.value = 0, m.value = 0, w.value = 0;
    }, Q = () => {
      h.value -= 90;
    }, Y = () => {
      h.value += 90;
    }, b = () => {
      p.value = !p.value;
    }, F = () => {
      x.value = !x.value;
    }, M = R(
      () => (h.value % 360 + 360) % 360
    ), j = R(
      () => M.value !== 0 || p.value || x.value
    ), le = R(
      () => y.value !== 0 || m.value !== 0 || w.value !== 0
    ), L = R(() => $.value);
    return (O, N) => (u(), _("div", Ma, [
      o("div", Ia, [
        (u(), _(ve, null, he(["crop", "rotate", "grayscale", "adjust"], (I) => o("button", {
          key: I,
          type: "button",
          role: "tab",
          "aria-selected": r.value === I,
          class: te(["vuefinder__image-editor__tab", { "vuefinder__image-editor__tab--active": r.value === I }]),
          onClick: (W) => E(I)
        }, [
          I === "crop" ? (u(), _("svg", Oa, [...N[4] || (N[4] = [
            o("path", { d: "M6 2v16a2 2 0 0 0 2 2h14" }, null, -1),
            o("path", { d: "M2 6h16a2 2 0 0 1 2 2v14" }, null, -1)
          ])])) : I === "rotate" ? (u(), _("svg", La, [...N[5] || (N[5] = [
            o("polyline", { points: "23 4 23 10 17 10" }, null, -1),
            o("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" }, null, -1)
          ])])) : I === "grayscale" ? (u(), _("svg", Ra, [...N[6] || (N[6] = [
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
          ])])) : (u(), _("svg", Ba, [...N[7] || (N[7] = [
            St('<line x1="4" y1="6" x2="14" y2="6"></line><circle cx="17" cy="6" r="2"></circle><line x1="10" y1="12" x2="20" y2="12"></line><circle cx="7" cy="12" r="2"></circle><line x1="4" y1="18" x2="14" y2="18"></line><circle cx="17" cy="18" r="2"></circle>', 6)
          ])])),
          o("span", za, k(I === "crop" ? a(d)("Crop") : I === "rotate" ? a(d)("Rotate") : I === "grayscale" ? a(d)("Grayscale") : a(d)("Adjust")), 1)
        ], 10, Aa)), 64))
      ]),
      r.value === "crop" ? (u(), _("div", Va, [
        o("div", Ua, [
          G(a(Do), {
            ref_key: "cropperRef",
            ref: g,
            class: "vuefinder__image-editor__cropper",
            crossorigin: "anonymous",
            src: t.src,
            "stencil-props": c.value === null ? {} : { aspectRatio: c.value },
            "auto-zoom": !0,
            priority: "image",
            transitions: !0
          }, null, 8, ["src", "stencil-props"])
        ]),
        o("div", Na, [
          o("div", Ha, [
            (u(), _(ve, null, he(f, (I) => o("button", {
              key: I.label,
              type: "button",
              class: te(["vuefinder__image-editor__chip", { "vuefinder__image-editor__chip--active": c.value === I.value }]),
              onClick: (W) => c.value = I.value
            }, k(a(d)(I.label)), 11, ja)), 64))
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: l.value,
            onClick: P
          }, k(a(d)("Apply")), 9, Ka)
        ])
      ])) : r.value === "rotate" ? (u(), _("div", qa, [
        o("div", Wa, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Pe(C.value),
            alt: t.filename
          }, null, 12, Ga)
        ]),
        o("div", Ya, [
          o("div", Xa, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__icon-btn",
              title: a(d)("Rotate left 90°"),
              onClick: Q
            }, [...N[8] || (N[8] = [
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
            ])], 8, Qa),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__icon-btn",
              title: a(d)("Rotate right 90°"),
              onClick: Y
            }, [...N[9] || (N[9] = [
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
            ])], 8, Ja),
            o("button", {
              type: "button",
              class: te(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": p.value }]),
              title: a(d)("Flip horizontal"),
              onClick: b
            }, [...N[10] || (N[10] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 3 4 7 8 11"></polyline><polyline points="16 3 20 7 16 11"></polyline><line x1="4" y1="7" x2="20" y2="7"></line><line x1="12" y1="13" x2="12" y2="21"></line></svg>', 1)
            ])], 10, Za),
            o("button", {
              type: "button",
              class: te(["vuefinder__image-editor__icon-btn", { "vuefinder__image-editor__icon-btn--active": x.value }]),
              title: a(d)("Flip vertical"),
              onClick: F
            }, [...N[11] || (N[11] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8 7 4 11 8"></polyline><polyline points="3 16 7 20 11 16"></polyline><line x1="7" y1="4" x2="7" y2="20"></line><line x1="13" y1="12" x2="21" y2="12"></line></svg>', 1)
            ])], 10, ei)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: l.value || !j.value,
            onClick: B
          }, k(a(d)("Apply")), 9, ti)
        ])
      ])) : r.value === "grayscale" ? (u(), _("div", ni, [
        o("div", oi, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Pe($.value ? { filter: "grayscale(1)" } : {}),
            alt: t.filename
          }, null, 12, si)
        ]),
        o("div", ai, [
          o("label", ii, [
            me(o("input", {
              "onUpdate:modelValue": N[0] || (N[0] = (I) => $.value = I),
              type: "checkbox"
            }, null, 512), [
              [lt, $.value]
            ]),
            o("span", null, k(a(d)("Grayscale")), 1)
          ]),
          o("button", {
            type: "button",
            class: "vuefinder__image-editor__apply",
            disabled: l.value || !L.value,
            onClick: K
          }, k(a(d)("Apply")), 9, li)
        ])
      ])) : (u(), _("div", ri, [
        o("div", di, [
          o("img", {
            class: "vuefinder__image-editor__preview",
            src: t.src,
            style: Pe({ filter: v.value }),
            alt: t.filename
          }, null, 12, ci)
        ]),
        o("div", ui, [
          o("div", vi, [
            o("label", null, [
              ge(k(a(d)("Brightness")), 1),
              o("span", null, k(y.value), 1)
            ]),
            me(o("input", {
              "onUpdate:modelValue": N[1] || (N[1] = (I) => y.value = I),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                Ke,
                y.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", fi, [
            o("label", null, [
              ge(k(a(d)("Contrast")), 1),
              o("span", null, k(m.value), 1)
            ]),
            me(o("input", {
              "onUpdate:modelValue": N[2] || (N[2] = (I) => m.value = I),
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
          o("div", _i, [
            o("label", null, [
              ge(k(a(d)("Saturation")), 1),
              o("span", null, k(w.value), 1)
            ]),
            me(o("input", {
              "onUpdate:modelValue": N[3] || (N[3] = (I) => w.value = I),
              type: "range",
              min: "-100",
              max: "100",
              step: "1"
            }, null, 512), [
              [
                Ke,
                w.value,
                void 0,
                { number: !0 }
              ]
            ])
          ]),
          o("div", pi, [
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__reset",
              onClick: ee
            }, k(a(d)("Reset")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__image-editor__apply",
              disabled: l.value || !le.value,
              onClick: Z
            }, k(a(d)("Apply")), 9, mi)
          ])
        ])
      ]))
    ]));
  }
}), gi = { class: "vuefinder__image-preview" }, yi = ["src"], wi = ["aria-label", "title"], bi = ["aria-label", "title"], ki = ["aria-label", "title"], $i = 0.5, xi = 3, Cn = 0.25, Si = /* @__PURE__ */ re({
  name: "ImagePreview",
  __name: "Image",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = e, n = ie(), i = Be(n), { enabled: d } = Ve(), { t: r } = n.i18n, l = T(!1), c = T(
      n.modal.data.item.previewUrl ?? n.adapter.getPreviewUrl({ path: n.modal.data.item.path })
    ), f = T(c.value), g = T(!1), h = T(1), p = T(null), x = T(0), $ = T(0), y = T(1), m = T(!1), w = T(0), v = T(0);
    let S = null, C = 0, E = 0, P = 0, B = 0;
    const { addExternalFiles: K, upload: Z, queue: ee } = Jn(n.customUploader), Q = n.fs, Y = oe(Q.path), b = R(() => x.value * y.value), F = R(() => $.value * y.value), M = (q, ae) => {
      const _e = p.value?.clientWidth ?? 0, we = p.value?.clientHeight ?? 0, Ie = Math.max(0, (b.value * h.value - _e) / 2), tt = Math.max(0, (F.value * h.value - we) / 2);
      return {
        x: Math.min(Ie, Math.max(-Ie, q)),
        y: Math.min(tt, Math.max(-tt, ae))
      };
    }, j = R(() => {
      if (!x.value || !$.value)
        return {};
      const { x: q, y: ae } = M(w.value, v.value);
      return {
        width: `${b.value}px`,
        height: `${F.value}px`,
        transform: `translate(${q}px, ${ae}px) scale(${h.value})`,
        transformOrigin: "center center"
      };
    }), le = () => {
      if (!p.value || !x.value || !$.value) return;
      const q = p.value.getBoundingClientRect();
      !q.width || !q.height || (y.value = Math.min(q.width / x.value, q.height / $.value));
    }, L = (q) => {
      const ae = q.target;
      ae instanceof HTMLImageElement && (x.value = ae.naturalWidth || ae.clientWidth, $.value = ae.naturalHeight || ae.clientHeight, le());
    }, O = (q) => Math.min(xi, Math.max($i, q)), N = () => {
      h.value = O(Number((h.value + Cn).toFixed(2)));
      const q = M(w.value, v.value);
      w.value = q.x, v.value = q.y;
    }, I = () => {
      h.value = O(Number((h.value - Cn).toFixed(2)));
      const q = M(w.value, v.value);
      w.value = q.x, v.value = q.y;
    }, W = () => {
      h.value = 1, w.value = 0, v.value = 0;
    }, A = (q) => {
      l.value || (q.deltaY > 0 ? I() : q.deltaY < 0 && N());
    }, U = (q) => {
      if (l.value) return;
      const ae = q.target;
      if (ae instanceof HTMLInputElement || ae instanceof HTMLTextAreaElement || ae?.isContentEditable)
        return;
      const _e = q.key === "=" || q.key === "+", we = q.key === "-" || q.key === "_", Ie = q.key === "0";
      if (!(!_e && !we && !Ie)) {
        if (q.preventDefault(), _e) {
          N();
          return;
        }
        if (we) {
          I();
          return;
        }
        W();
      }
    }, H = () => {
      m.value = !1;
    }, D = (q) => {
      l.value || h.value <= 1 || !p.value || (m.value = !0, C = q.clientX, E = q.clientY, P = w.value, B = v.value, q.currentTarget?.setPointerCapture?.(q.pointerId));
    }, V = (q) => {
      if (!m.value) return;
      const ae = q.clientX - C, _e = q.clientY - E, we = M(P + ae, B + _e);
      w.value = we.x, v.value = we.y;
    };
    nn({
      isEditable: R(
        () => d("edit") && !n.fs.isReadOnly(n.modal.data.item)
      ),
      isEditing: R(() => l.value),
      isDirty: R(() => l.value && g.value),
      primaryActionLabel: R(() => r("Save")),
      enterEdit: () => {
        f.value = c.value, g.value = !1, l.value = !0, n.modal.setEditMode(!0);
      },
      commitEdit: () => be(),
      cancelEdit: () => {
        l.value = !1, f.value = c.value, g.value = !1, n.modal.setEditMode(!1);
      },
      extraInfo: R(() => !x.value || !$.value ? [] : [{ label: r("Dimensions"), value: `${x.value} × ${$.value}` }])
    });
    const ue = (q) => {
      f.value = q, g.value = !0;
    }, be = async () => {
      if (!g.value) return;
      const q = n.modal.data.item.basename, ae = q.split(".").pop()?.toLowerCase() || "jpg", _e = ae === "png" ? "image/png" : ae === "gif" ? "image/gif" : "image/jpeg";
      try {
        const we = await Da(f.value), Ie = new File([we], q, { type: _e }), J = n.modal.data.item.path.split("/");
        J.pop();
        const se = {
          path: J.join("/") || (Y.value?.path ?? "")
        };
        K([Ie]), await new Promise((Se) => setTimeout(Se, 100));
        const de = ee.value.find((Se) => Se.name === Ie.name);
        if (!de)
          throw new Error("File was not added to upload queue");
        Z(se);
        let Ue = 0;
        for (; Ue < 150; ) {
          await new Promise((We) => setTimeout(We, 200));
          const Se = ee.value.find((We) => We.id === de.id);
          if (Se?.status === xe.DONE) break;
          if (Se?.status === xe.ERROR)
            throw new Error(Se.statusName || "Upload failed");
          Ue++;
        }
        i.success(r("Updated.")), await fetch(c.value, { cache: "reload", mode: "no-cors" });
        const Ee = n.root?.querySelector?.('[data-src="' + c.value + '"]');
        Ee && Ee instanceof HTMLElement && Wt.resetStatus(Ee), n.emitter.emit("vf-refresh-thumbnails"), l.value = !1, g.value = !1, f.value = c.value, n.modal.setEditMode(!1), t("success");
      } catch (we) {
        i.error(Fe(we, r("Failed to save image")));
      }
    };
    return ye(() => {
      S = new ResizeObserver(() => {
        le();
      }), p.value && S.observe(p.value), window.addEventListener("keydown", U), t("success");
    }), wt(() => {
      window.removeEventListener("keydown", U), S?.disconnect();
    }), (q, ae) => (u(), _("div", gi, [
      o("div", {
        ref_key: "imageContainer",
        ref: p,
        class: "vuefinder__image-preview__image-container"
      }, [
        l.value ? (u(), X(hi, {
          key: 1,
          src: f.value,
          filename: a(n).modal.data.item.basename,
          "onUpdate:src": ue
        }, null, 8, ["src", "filename"])) : (u(), _("div", {
          key: 0,
          class: "vuefinder__image-preview__stage",
          onWheel: fe(A, ["prevent"])
        }, [
          o("img", {
            style: Pe(j.value),
            src: a(n).modal.data.item.previewUrl ?? a(n).adapter.getPreviewUrl({ path: a(n).modal.data.item.path }),
            class: te(["vuefinder__image-preview__image", {
              "vuefinder__image-preview__image--zoomed": h.value > 1,
              "vuefinder__image-preview__image--panning": m.value
            }]),
            draggable: !1,
            onLoad: L,
            onPointerdown: D,
            onPointermove: V,
            onPointerup: H,
            onPointercancel: H,
            onLostpointercapture: H
          }, null, 46, yi),
          o("div", {
            class: "vuefinder__image-preview__zoom-controls",
            onPointerdown: ae[0] || (ae[0] = fe(() => {
            }, ["stop"])),
            onWheel: ae[1] || (ae[1] = fe(() => {
            }, ["stop"]))
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(r)("Zoom out"),
              title: a(r)("Zoom out"),
              onClick: I
            }, [...ae[2] || (ae[2] = [
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
              onClick: W
            }, k(Math.round(h.value * 100)) + "% ", 9, bi),
            o("button", {
              type: "button",
              class: "vuefinder__image-preview__zoom-button",
              "aria-label": a(r)("Zoom in"),
              title: a(r)("Zoom in"),
              onClick: N
            }, [...ae[3] || (ae[3] = [
              St('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"></circle><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>', 1)
            ])], 8, ki)
          ], 32)
        ], 32))
      ], 512)
    ]));
  }
}), Ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Fi(s, e) {
  return u(), _("svg", Ci, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const ht = { render: Fi }, Ei = { class: "vuefinder__default-preview" }, Pi = { class: "vuefinder__default-preview__content" }, Ti = { class: "vuefinder__default-preview__icon-container" }, Di = ["title"], Mi = /* @__PURE__ */ re({
  __name: "Default",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = ie(), n = e;
    return ye(() => {
      n("success");
    }), (i, d) => (u(), _("div", Ei, [
      o("div", Pi, [
        o("div", Ti, [
          G(a(ht), { class: "vuefinder__default-preview__file-icon" }),
          o("div", {
            class: "vuefinder__default-preview__file-name",
            title: a(t).modal.data.item.path
          }, k(a(t).modal.data.item.basename), 9, Di)
        ])
      ])
    ]));
  }
}), Ii = { class: "vuefinder__video-preview" }, Ai = {
  class: "vuefinder__video-preview__video",
  preload: "metadata",
  controls: ""
}, Oi = ["src"], Li = /* @__PURE__ */ re({
  __name: "Video",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = ie(), n = e, i = () => t.adapter.getPreviewUrl({ path: t.modal.data.item.path });
    return ye(() => {
      n("success");
    }), (d, r) => (u(), _("div", Ii, [
      o("div", null, [
        o("video", Ai, [
          o("source", {
            src: i(),
            type: "video/mp4"
          }, null, 8, Oi),
          r[0] || (r[0] = ge(" Your browser does not support the video tag. ", -1))
        ])
      ])
    ]));
  }
}), Ri = { class: "vuefinder__audio-preview" }, Bi = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, zi = ["src"], Vi = /* @__PURE__ */ re({
  __name: "Audio",
  emits: ["success"],
  setup(s, { emit: e }) {
    const t = e;
    ie();
    const n = () => {
      const i = ie();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return ye(() => {
      t("success");
    }), (i, d) => (u(), _("div", Ri, [
      o("div", null, [
        o("audio", Bi, [
          o("source", {
            src: n(),
            type: "audio/mpeg"
          }, null, 8, zi),
          d[0] || (d[0] = ge(" Your browser does not support the audio element. ", -1))
        ])
      ])
    ]));
  }
}), Ui = { class: "vuefinder__pdf-preview" }, Ni = ["data"], Hi = ["src"], ji = /* @__PURE__ */ re({
  __name: "Pdf",
  emits: ["success"],
  setup(s, { emit: e }) {
    ie();
    const t = e, n = () => {
      const i = ie();
      return i.adapter.getPreviewUrl({ path: i.modal.data.item.path });
    };
    return ye(() => {
      t("success");
    }), (i, d) => (u(), _("div", Ui, [
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
          }, " Your browser does not support PDFs ", 8, Hi)
        ], 8, Ni)
      ])
    ]));
  }
}), Ki = ["data-theme"], qi = ["disabled", "title"], Wi = ["disabled", "title"], Gi = { class: "vuefinder__preview-modal__content" }, Yi = { key: 0 }, Xi = {
  key: 1,
  class: "vuefinder__preview-modal__status-strip"
}, Qi = ["aria-label"], Ji = { class: "vuefinder__preview-modal__loading" }, Zi = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, el = { class: "vuefinder__preview-modal__edit-actions" }, tl = ["disabled"], Fn = 8, nl = 1.4, ol = 0.22, dt = 220, sl = ".vuefinder__preview-chrome__title, .vuefinder__preview-modal__status-strip", Ye = /* @__PURE__ */ re({
  __name: "ModalPreview",
  setup(s) {
    const e = ie(), { enabled: t } = Ve(), { t: n } = e.i18n, i = T(!1), d = (A) => {
      const U = (A || "").split("/").pop() || "", H = U.lastIndexOf(".");
      return H >= 0 ? U.slice(H + 1).toLowerCase() : "";
    }, r = (A, U) => {
      if (!U) return !1;
      const H = /* @__PURE__ */ new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "bmp", "ico", "avif"]), D = /* @__PURE__ */ new Set(["mp4", "webm", "ogg", "ogv", "mov", "m4v"]), V = /* @__PURE__ */ new Set(["mp3", "wav", "ogg", "oga", "m4a", "flac", "aac"]), ue = /* @__PURE__ */ new Set([
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
      return A === "image" ? H.has(U) : A === "video" ? D.has(U) : A === "audio" ? V.has(U) : A === "csv" ? U === "csv" || U === "tsv" : A === "text" ? ue.has(U) : A === "application/pdf" ? U === "pdf" : !1;
    }, l = (A) => {
      const U = e.modal.data.forceType;
      if (U) return U === A;
      const H = e.modal.data.item.mime_type;
      if (H && typeof H == "string" && H.startsWith(A)) return !0;
      const D = d(e.modal.data.item.path);
      return r(A, D);
    }, c = t("preview");
    c || (i.value = !0);
    const f = R(() => e.modal.data.item), g = oe(e.fs.sortedFiles), h = R(() => g.value.filter((A) => A.type === "file")), p = R(
      () => h.value.findIndex((A) => A.path === f.value.path)
    ), x = R(() => !!a(e.modal.controls?.isEditable)), $ = R(() => !!a(e.modal.controls?.isEditing)), y = R(() => !!a(e.modal.controls?.isDirty)), m = R(
      () => a(e.modal.controls?.primaryActionLabel) ?? n("Save")
    ), w = async () => {
      await e.modal.controls?.enterEdit?.();
    }, v = async () => {
      await e.modal.controls?.commitEdit?.();
    }, S = async () => {
      y.value && !window.confirm(n("Discard unsaved changes?")) || await e.modal.controls?.cancelEdit?.();
    }, C = R(() => !$.value && p.value > 0), E = R(
      () => !$.value && p.value < h.value.length - 1
    ), P = () => {
      if (!C.value) return;
      const A = h.value[p.value - 1];
      A && (e.fs.clearSelection(), e.fs.select(A.path), e.modal.data.item = A, i.value = !1);
    }, B = () => {
      if (!E.value) return;
      const A = h.value[p.value + 1];
      A && (e.fs.clearSelection(), e.fs.select(A.path), e.modal.data.item = A, i.value = !1);
    }, K = () => {
      $.value && y.value && !window.confirm(n("Discard unsaved changes?")) || e.modal.close();
    }, Z = T(0), ee = T(!1);
    let Q = 0, Y = 0, b = !1, F = !1;
    const M = R(() => ({
      transform: `translate3d(${Z.value}px, 0, 0)`,
      transition: ee.value ? `transform ${dt}ms ease-out` : "none"
    })), j = (A, U) => {
      setTimeout(U, A);
    }, le = (A) => {
      if ($.value || A.touches.length !== 1 || !A.target?.closest?.(sl)) return;
      const H = A.touches[0];
      H && (b = !0, F = !1, Q = H.clientX, Y = H.clientY, ee.value = !1);
    }, L = (A) => {
      if (!b) return;
      const U = A.touches[0];
      if (!U) return;
      const H = U.clientX - Q, D = U.clientY - Y;
      if (!F) {
        if (Math.abs(H) < Fn && Math.abs(D) < Fn) return;
        if (Math.abs(H) < Math.abs(D) * nl) {
          b = !1;
          return;
        }
        F = !0;
      }
      let V = H;
      H > 0 && !C.value && (V = H * 0.3), H < 0 && !E.value && (V = H * 0.3), Z.value = V, A.cancelable && A.preventDefault();
    }, O = (A) => {
      const U = window.innerWidth || 1, H = A === "prev" ? U : -U, D = A === "prev" ? -U : U, V = A === "prev" ? P : B;
      ee.value = !0, Z.value = H, j(dt, () => {
        V(), ee.value = !1, Z.value = D, requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ee.value = !0, Z.value = 0, j(dt, () => {
              ee.value = !1;
            });
          });
        });
      });
    }, N = () => {
      if (!b || (b = !1, !F)) return;
      const A = window.innerWidth || 1, U = Z.value, H = Math.abs(U) >= A * ol;
      if (H && U > 0 && C.value) {
        O("prev");
        return;
      }
      if (H && U < 0 && E.value) {
        O("next");
        return;
      }
      ee.value = !0, Z.value = 0, j(dt, () => {
        ee.value = !1;
      });
    }, I = () => {
      b && (b = !1, F && (ee.value = !0, Z.value = 0, j(dt, () => {
        ee.value = !1;
      })));
    }, W = (A) => {
      if (A.key === "Escape") {
        A.preventDefault(), A.stopPropagation(), K();
        return;
      }
      if ((A.metaKey || A.ctrlKey) && A.key.toLowerCase() === "s") {
        const U = e.modal.controls;
        if (U && a(U.isEditing)) {
          A.preventDefault(), U.commitEdit();
          return;
        }
      }
      $.value || (A.key === "ArrowLeft" || A.key === "ArrowRight") && (A.preventDefault(), A.stopPropagation(), A.key === "ArrowLeft" ? P() : B());
    };
    return ye(() => {
      const A = document.querySelector(".vuefinder__preview-modal");
      A && A.focus();
    }), (A, U) => (u(), X(ze, {
      "on-request-close": K,
      "body-style": M.value,
      "body-class": "vuefinder__modal-layout__body--swipeable " + ($.value ? "vuefinder__modal-layout__body--editing" : ""),
      "on-body-touchstart": le,
      "on-body-touchmove": L,
      "on-body-touchend": N,
      "on-body-touchcancel": I
    }, yo({
      default: ce(() => [
        o("div", {
          class: "vuefinder__preview-modal",
          tabindex: "0",
          onKeydown: W
        }, [
          G(da, { onCloseRequest: K }),
          (u(), X(bt, { to: "body" }, [
            $.value ? z("", !0) : (u(), _("div", {
              key: 0,
              class: "vuefinder__themer vuefinder__preview-modal__nav-overlay",
              "data-theme": a(e).theme.current
            }, [
              o("button", {
                disabled: !C.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--left",
                title: a(n)("Previous file"),
                onClick: P
              }, [...U[7] || (U[7] = [
                o("svg", {
                  class: "vuefinder__preview-modal__nav-icon",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  o("polyline", { points: "15,18 9,12 15,6" })
                ], -1)
              ])], 8, qi),
              o("button", {
                disabled: !E.value,
                class: "vuefinder__preview-modal__nav-side vuefinder__preview-modal__nav-side--right",
                title: a(n)("Next file"),
                onClick: B
              }, [...U[8] || (U[8] = [
                o("svg", {
                  class: "vuefinder__preview-modal__nav-icon",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  o("polyline", { points: "9,18 15,12 9,6" })
                ], -1)
              ])], 8, Wi)
            ], 8, Ki))
          ])),
          o("div", Gi, [
            a(c) ? (u(), _("div", Yi, [
              l("csv") ? (u(), X(Ca, {
                key: `csv-${f.value.path}`,
                onSuccess: U[0] || (U[0] = (H) => i.value = !0)
              })) : l("text") ? (u(), X(fa, {
                key: `text-${f.value.path}`,
                onSuccess: U[1] || (U[1] = (H) => i.value = !0)
              })) : l("image") ? (u(), X(Si, {
                key: `image-${f.value.path}`,
                onSuccess: U[2] || (U[2] = (H) => i.value = !0)
              })) : l("video") ? (u(), X(Li, {
                key: `video-${f.value.path}`,
                onSuccess: U[3] || (U[3] = (H) => i.value = !0)
              })) : l("audio") ? (u(), X(Vi, {
                key: `audio-${f.value.path}`,
                onSuccess: U[4] || (U[4] = (H) => i.value = !0)
              })) : l("application/pdf") ? (u(), X(ji, {
                key: `pdf-${f.value.path}`,
                onSuccess: U[5] || (U[5] = (H) => i.value = !0)
              })) : (u(), X(Mi, {
                key: `default-${f.value.path}`,
                onSuccess: U[6] || (U[6] = (H) => i.value = !0)
              }))
            ])) : z("", !0),
            $.value || h.value.length > 1 ? (u(), _("div", Xi, [
              $.value ? (u(), _("span", {
                key: 0,
                class: te(["vuefinder__preview-modal__edit-chip", { "vuefinder__preview-modal__edit-chip--dirty": y.value }])
              }, k(y.value ? a(n)("Unsaved") : a(n)("Editing")), 3)) : (u(), _("span", {
                key: 1,
                class: "vuefinder__preview-modal__pagination-text",
                "aria-label": a(n)("File %s of %s", String(p.value + 1), String(h.value.length))
              }, k(p.value + 1) + " / " + k(h.value.length), 9, Qi))
            ])) : z("", !0),
            o("div", Ji, [
              i.value === !1 ? (u(), _("div", Zi, [
                U[9] || (U[9] = o("svg", {
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
                o("span", null, k(a(n)("Loading")), 1)
              ])) : z("", !0)
            ])
          ])
        ], 32)
      ]),
      _: 2
    }, [
      x.value ? {
        name: "buttons",
        fn: ce(() => [
          o("div", el, [
            $.value ? (u(), _(ve, { key: 1 }, [
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
                disabled: !y.value,
                onClick: v
              }, k(m.value), 9, tl),
              o("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary vuefinder__preview-modal__edit-btn",
                onClick: S
              }, k(a(n)("Cancel")), 1)
            ], 64)) : (u(), _("button", {
              key: 0,
              type: "button",
              class: "vf-btn vf-btn-primary vuefinder__preview-modal__edit-btn",
              onClick: w
            }, k(a(n)("Edit")), 1))
          ])
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["body-style", "body-class"]));
  }
}), al = {
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
  return u(), _("svg", al, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M13 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v4M16 22l5-5M21 21.5V17h-4.5" }, null, -1)
  ])]);
}
const ll = { render: il }, rl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function dl(s, e) {
  return u(), _("svg", rl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const an = { render: dl }, cl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ul(s, e) {
  return u(), _("svg", cl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ])]);
}
const Re = { render: ul }, vl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function fl(s, e) {
  return u(), _("svg", vl, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 5v14M5 12h14" }, null, -1)
  ])]);
}
const Mt = { render: fl }, _l = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function pl(s, e) {
  return u(), _("svg", _l, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M5 12h14" }, null, -1)
  ])]);
}
const It = { render: pl }, ml = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function hl(s, e) {
  return u(), _("svg", ml, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ])]);
}
const gt = { render: hl }, gl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function yl(s, e) {
  return u(), _("svg", gl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ])]);
}
const ln = { render: yl }, wl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function bl(s, e) {
  return u(), _("svg", wl, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ])]);
}
const At = { render: bl }, kl = { class: "vuefinder__modal-tree__folder-item" }, $l = { class: "vuefinder__modal-tree__folder-content" }, xl = {
  key: 1,
  class: "vuefinder__modal-tree__folder-spacer"
}, Sl = { class: "vuefinder__modal-tree__folder-text" }, Cl = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Fl = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, El = 300, Pl = /* @__PURE__ */ re({
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
    const t = ie(), { t: n } = t.i18n, i = t.fs, d = T({}), r = s, l = e;
    oe(i.path);
    const c = R(() => {
      const B = `${r.storage}:${r.folder.path}`;
      return r.expandedFolders[B] || !1;
    }), f = R(() => r.modelValue?.path === r.folder.path), g = R(() => r.currentPath?.path === r.folder.path), h = R(() => r.modalTreeData[r.folder.path] || []), p = R(() => {
      const B = h.value, K = d.value[r.folder.path] || 50;
      return B.length > K ? B.slice(0, K) : B;
    }), x = R(() => h.value.length), $ = R(() => d.value[r.folder.path] || 50), y = R(() => x.value > $.value), m = () => {
      d.value[r.folder.path] = ($.value || 50) + 50;
    }, w = R(() => h.value.length > 0 || r.folder.type === "dir"), v = () => {
      l("toggleFolder", r.storage, r.folder.path);
    }, S = () => {
      l("update:modelValue", r.folder);
    }, C = () => {
      l("update:modelValue", r.folder), l("selectAndClose", r.folder);
    };
    let E = 0;
    const P = () => {
      const B = Date.now();
      B - E < El ? C() : S(), E = B;
    };
    return (B, K) => {
      const Z = zn("ModalTreeFolderItem", !0);
      return u(), _("div", kl, [
        o("div", $l, [
          w.value ? (u(), _("div", {
            key: 0,
            class: "vuefinder__modal-tree__folder-toggle",
            onClick: v
          }, [
            c.value ? (u(), X(a(It), {
              key: 1,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            })) : (u(), X(a(Mt), {
              key: 0,
              class: "vuefinder__modal-tree__folder-toggle-icon"
            }))
          ])) : (u(), _("div", xl)),
          o("div", {
            class: te(["vuefinder__modal-tree__folder-link", {
              "vuefinder__modal-tree__folder-link--selected": f.value,
              "vuefinder__modal-tree__folder-link--current": g.value
            }]),
            onClick: S,
            onDblclick: C,
            onTouchend: P
          }, [
            c.value ? (u(), X(a(At), {
              key: 1,
              class: "vuefinder__item-icon__folder--open vuefinder__modal-tree__folder-icon"
            })) : (u(), X(a(Re), {
              key: 0,
              class: "vuefinder__modal-tree__folder-icon vuefinder__item-icon__folder"
            })),
            o("span", Sl, k(s.folder.basename), 1)
          ], 34)
        ]),
        c.value && w.value ? (u(), _("div", Cl, [
          (u(!0), _(ve, null, he(p.value, (ee) => (u(), X(Z, {
            key: ee.path,
            folder: ee,
            storage: s.storage,
            "model-value": s.modelValue,
            "expanded-folders": s.expandedFolders,
            "modal-tree-data": s.modalTreeData,
            "current-path": s.currentPath,
            "onUpdate:modelValue": K[0] || (K[0] = (Q) => B.$emit("update:modelValue", Q)),
            onSelectAndClose: K[1] || (K[1] = (Q) => B.$emit("selectAndClose", Q)),
            onToggleFolder: K[2] || (K[2] = (Q, Y) => B.$emit("toggleFolder", Q, Y))
          }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
          y.value ? (u(), _("div", Fl, [
            o("div", {
              class: "vuefinder__modal-tree__load-more",
              onClick: m
            }, k(a(n)("load more")), 1)
          ])) : z("", !0)
        ])) : z("", !0)
      ]);
    };
  }
}), Tl = { class: "vuefinder__modal-tree" }, Dl = { class: "vuefinder__modal-tree__header" }, Ml = { class: "vuefinder__modal-tree__title" }, Il = {
  key: 0,
  class: "vuefinder__modal-tree__section"
}, Al = { class: "vuefinder__modal-tree__section-title" }, Ol = { class: "vuefinder__modal-tree__list" }, Ll = ["onClick", "onDblclick", "onTouchend"], Rl = { class: "vuefinder__modal-tree__text" }, Bl = { class: "vuefinder__modal-tree__text-storage" }, zl = { class: "vuefinder__modal-tree__section-title" }, Vl = { class: "vuefinder__modal-tree__list" }, Ul = { class: "vuefinder__modal-tree__storage-item" }, Nl = { class: "vuefinder__modal-tree__storage-content" }, Hl = ["onClick"], jl = ["onClick", "onDblclick", "onTouchend"], Kl = { class: "vuefinder__modal-tree__storage-text" }, ql = {
  key: 0,
  class: "vuefinder__modal-tree__subfolders"
}, Wl = {
  key: 0,
  class: "vuefinder__modal-tree__more-note"
}, Gl = ["onClick"], En = 300, kt = /* @__PURE__ */ re({
  __name: "ModalTreeSelector",
  props: {
    modelValue: {},
    showPinnedFolders: { type: Boolean },
    currentPath: {}
  },
  emits: ["update:modelValue", "selectAndClose"],
  setup(s, { emit: e }) {
    const t = ie(), { t: n } = t.i18n, i = t.fs, d = t.config, r = e, l = oe(i.sortedFiles), c = oe(i.storages), f = R(() => c.value || []), g = oe(i.path), h = T(null), p = T({}), x = T({}), $ = T({});
    pe(l, (b) => {
      const F = b.filter((j) => j.type === "dir"), M = g.value?.path || "";
      M && (x.value[M] = F.map((j) => ({
        ...j,
        type: "dir"
      })));
    });
    const y = (b, F) => {
      const M = `${b}:${F}`;
      p.value = {
        ...p.value,
        [M]: !p.value[M]
      }, p.value[M] && !x.value[F] && t.adapter.list(F).then((j) => {
        const L = (j.files || []).filter((O) => O.type === "dir");
        x.value[F] = L.map((O) => ({
          ...O,
          type: "dir"
        }));
      });
    }, m = (b) => x.value[b] || [], w = (b) => $.value[b] || 50, v = (b) => {
      const F = m(b), M = w(b);
      return F.length > M ? F.slice(0, M) : F;
    }, S = (b) => m(b).length, C = (b) => S(b) > w(b), E = (b) => {
      $.value[b] = w(b) + 50;
    }, P = (b) => {
      b && r("update:modelValue", b);
    }, B = (b) => {
      b && (r("update:modelValue", b), r("selectAndClose", b));
    }, K = (b) => {
      const F = {
        storage: b,
        path: b + "://",
        basename: b,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: b + "://"
      };
      r("update:modelValue", F);
    }, Z = (b) => {
      const F = {
        storage: b,
        path: b + "://",
        basename: b,
        type: "dir",
        extension: "",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: "public",
        dir: b + "://"
      };
      r("update:modelValue", F), r("selectAndClose", F);
    };
    let ee = 0;
    const Q = (b) => {
      if (!b) return;
      const F = Date.now();
      F - ee < En ? B(b) : P(b), ee = F;
    }, Y = (b) => {
      const F = Date.now();
      F - ee < En ? Z(b) : K(b), ee = F;
    };
    return ye(() => {
      h.value && ft(h.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), (b, F) => (u(), _("div", Tl, [
      o("div", Dl, [
        o("div", Ml, k(a(n)("Select Target Folder")), 1)
      ]),
      o("div", {
        ref_key: "modalContentElement",
        ref: h,
        class: "vuefinder__modal-tree__content"
      }, [
        s.showPinnedFolders && a(t).features.pinned && a(d).get("pinnedFolders").length ? (u(), _("div", Il, [
          o("div", Al, k(a(n)("Pinned Folders")), 1),
          o("div", Ol, [
            (u(!0), _(ve, null, he(a(d).get("pinnedFolders"), (M) => (u(), _("div", {
              key: M.path,
              class: te(["vuefinder__modal-tree__item", { "vuefinder__modal-tree__item--selected": s.modelValue?.path === M.path }]),
              onClick: (j) => P(M),
              onDblclick: (j) => B(M),
              onTouchend: (j) => Q(M)
            }, [
              G(a(Re), { class: "vuefinder__modal-tree__icon vuefinder__item-icon__folder" }),
              o("div", Rl, k(M.basename), 1),
              o("div", Bl, k(M.storage), 1),
              G(a(gt), { class: "vuefinder__modal-tree__icon vuefinder__modal-tree__icon--pin" })
            ], 42, Ll))), 128))
          ])
        ])) : z("", !0),
        o("div", zl, k(a(n)("Storages")), 1),
        (u(!0), _(ve, null, he(f.value, (M) => (u(), _("div", {
          key: M,
          class: "vuefinder__modal-tree__section"
        }, [
          o("div", Vl, [
            o("div", Ul, [
              o("div", Nl, [
                o("div", {
                  class: "vuefinder__modal-tree__storage-toggle",
                  onClick: fe((j) => y(M, M + "://"), ["stop"])
                }, [
                  p.value[`${M}:${M}://`] ? (u(), X(a(It), {
                    key: 1,
                    class: "vuefinder__modal-tree__toggle-icon"
                  })) : (u(), X(a(Mt), {
                    key: 0,
                    class: "vuefinder__modal-tree__toggle-icon"
                  }))
                ], 8, Hl),
                o("div", {
                  class: te(["vuefinder__modal-tree__storage-link", {
                    "vuefinder__modal-tree__storage-link--selected": s.modelValue?.path === M + "://"
                  }]),
                  onClick: (j) => K(M),
                  onDblclick: (j) => Z(M),
                  onTouchend: (j) => Y(M)
                }, [
                  G(a(ln), { class: "vuefinder__modal-tree__storage-icon" }),
                  o("span", Kl, k(M), 1)
                ], 42, jl)
              ]),
              p.value[`${M}:${M}://`] ? (u(), _("div", ql, [
                (u(!0), _(ve, null, he(v(M + "://"), (j) => (u(), X(Pl, {
                  key: j.path,
                  folder: j,
                  storage: M,
                  "model-value": s.modelValue,
                  "expanded-folders": p.value,
                  "modal-tree-data": x.value,
                  "current-path": s.currentPath,
                  "onUpdate:modelValue": P,
                  onSelectAndClose: B,
                  onToggleFolder: y
                }, null, 8, ["folder", "storage", "model-value", "expanded-folders", "modal-tree-data", "current-path"]))), 128)),
                C(M + "://") ? (u(), _("div", Wl, [
                  o("div", {
                    class: "vuefinder__modal-tree__load-more",
                    onClick: (j) => E(M + "://")
                  }, k(a(n)("load more")), 9, Gl)
                ])) : z("", !0)
              ])) : z("", !0)
            ])
          ])
        ]))), 128))
      ], 512)
    ]));
  }
}), Yl = ["title"], Yt = /* @__PURE__ */ re({
  __name: "Message",
  props: {
    error: { type: Boolean }
  },
  emits: ["hidden"],
  setup(s, { emit: e }) {
    const t = e, n = ie(), { t: i } = n.i18n, d = T(!1), r = T(null), l = T(r.value?.innerHTML);
    pe(l, () => d.value = !1);
    const c = () => {
      t("hidden"), d.value = !0;
    };
    return (f, g) => (u(), _("div", null, [
      d.value ? z("", !0) : (u(), _("div", {
        key: 0,
        ref_key: "strMessage",
        ref: r,
        class: te(["vuefinder__message", s.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Me(f.$slots, "default"),
        o("div", {
          class: "vuefinder__message__close",
          title: a(i)("Close"),
          onClick: c
        }, [...g[0] || (g[0] = [
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
        ])], 8, Yl)
      ], 2))
    ]));
  }
}), Xl = { class: "vuefinder__move-modal__content" }, Ql = { class: "vuefinder__move-modal__description" }, Jl = { class: "vuefinder__move-modal__files vf-scrollbar" }, Zl = { class: "vuefinder__move-modal__file-name" }, er = { class: "vuefinder__move-modal__target-title" }, tr = { class: "vuefinder__move-modal__target-container" }, nr = { class: "vuefinder__move-modal__target-path" }, or = { class: "vuefinder__move-modal__target-storage" }, sr = {
  key: 0,
  class: "vuefinder__move-modal__destination-folder"
}, ar = { class: "vuefinder__move-modal__target-badge" }, ir = {
  key: 0,
  class: "vuefinder__move-modal__options"
}, lr = { class: "vuefinder__move-modal__checkbox-label" }, rr = { class: "vuefinder__move-modal__checkbox-text" }, dr = ["disabled"], cr = { class: "vuefinder__move-modal__selected-items" }, to = /* @__PURE__ */ re({
  __name: "ModalTransfer",
  props: {
    copy: { type: Boolean }
  },
  setup(s) {
    const e = ie(), t = Be(e), { enabled: n } = Ve(), { t: i } = e.i18n, d = s, r = T(e.modal.data.items.from), l = T(e.modal.data.items.to), c = T(""), f = T(d.copy || !n("move")), g = R(() => f.value ? "copy" : "move"), h = T(!1), p = oe(e.fs.path), x = R(() => f.value ? i("Copy files") : i("Move files")), $ = R(
      () => f.value ? i("Are you sure you want to copy these files?") : i("Are you sure you want to move these files?")
    ), y = R(() => f.value ? i("Yes, Copy!") : i("Yes, Move!"));
    R(() => f.value ? i("Files copied.") : i("Files moved."));
    const m = (P) => {
      P && (l.value = P);
    }, w = (P) => {
      P && (l.value = P, h.value = !1);
    }, v = R(() => {
      const P = l.value;
      return P ? r.value.some((B) => !!(P.path === B.path || B.type === "dir" && P.path.startsWith(B.path + "/"))) : !0;
    }), S = R(() => {
      if (!v.value)
        return "";
      const P = l.value;
      return P ? r.value.find((K) => P.path === K.path || K.type === "dir" && P.path.startsWith(K.path + "/")) ? i("Cannot move/copy item to itself or its own subfolder") : i("Invalid destination directory") : i("Please select a destination directory");
    }), C = () => {
      const P = l.value.path;
      if (!P) return { storage: "local", path: "" };
      if (P.endsWith("://"))
        return { storage: P.replace("://", ""), path: "" };
      const B = P.split("://");
      return {
        storage: B[0] || "local",
        path: B[1] || ""
      };
    }, E = async () => {
      if (r.value.length)
        try {
          const { files: P } = await e.adapter[g.value]({
            path: p.value.path,
            sources: r.value.map(({ path: B }) => B),
            destination: l.value.path
          });
          e.fs.setFiles(P), e.modal.close();
        } catch (P) {
          t.error(Fe(P, i("Failed to transfer files")));
        }
    };
    return (P, B) => (u(), X(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: v.value,
          onClick: E
        }, k(y.value), 9, dr),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: B[4] || (B[4] = (K) => a(e).modal.close())
        }, k(a(i)("Cancel")), 1),
        o("div", cr, k(a(i)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          G(Ne, {
            icon: f.value ? a(an) : a(ll),
            title: x.value
          }, null, 8, ["icon", "title"]),
          o("div", Xl, [
            o("p", Ql, k($.value), 1),
            o("div", Jl, [
              (u(!0), _(ve, null, he(r.value, (K) => (u(), _("div", {
                key: K.path,
                class: "vuefinder__move-modal__file"
              }, [
                o("div", null, [
                  K.type === "dir" ? (u(), X(a(Re), {
                    key: 0,
                    class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir"
                  })) : (u(), X(a(ht), {
                    key: 1,
                    class: "vuefinder__move-modal__icon"
                  }))
                ]),
                o("div", Zl, k(K.path), 1)
              ]))), 128))
            ]),
            o("h4", er, k(a(i)("Target Directory")), 1),
            o("div", tr, [
              o("div", {
                class: "vuefinder__move-modal__target-display",
                onClick: B[0] || (B[0] = (K) => h.value = !h.value)
              }, [
                o("div", nr, [
                  o("span", or, k(C().storage) + "://", 1),
                  C().path ? (u(), _("span", sr, k(C().path), 1)) : z("", !0)
                ]),
                o("span", ar, k(a(i)("Browse")), 1)
              ])
            ]),
            o("div", {
              class: te([
                "vuefinder__move-modal__tree-selector",
                h.value ? "vuefinder__move-modal__tree-selector--expanded" : "vuefinder__move-modal__tree-selector--collapsed"
              ])
            }, [
              G(kt, {
                modelValue: l.value,
                "onUpdate:modelValue": [
                  B[1] || (B[1] = (K) => l.value = K),
                  m
                ],
                "show-pinned-folders": !0,
                onSelectAndClose: w
              }, null, 8, ["modelValue"])
            ], 2),
            a(n)("copy") && a(n)("move") ? (u(), _("div", ir, [
              o("label", lr, [
                me(o("input", {
                  "onUpdate:modelValue": B[2] || (B[2] = (K) => f.value = K),
                  type: "checkbox",
                  class: "vuefinder__move-modal__checkbox"
                }, null, 512), [
                  [lt, f.value]
                ]),
                o("span", rr, k(a(i)("Create a copy instead of moving")), 1)
              ])
            ])) : z("", !0),
            S.value ? (u(), X(Yt, {
              key: 1,
              error: ""
            }, {
              default: ce(() => [
                ge(k(S.value), 1)
              ]),
              _: 1
            })) : z("", !0),
            c.value.length && !S.value ? (u(), X(Yt, {
              key: 2,
              error: "",
              onHidden: B[3] || (B[3] = (K) => c.value = "")
            }, {
              default: ce(() => [
                ge(k(c.value), 1)
              ]),
              _: 1
            })) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), it = /* @__PURE__ */ re({
  __name: "ModalMove",
  setup(s) {
    return (e, t) => (u(), X(to, { copy: !1 }));
  }
}), rn = /* @__PURE__ */ re({
  __name: "ModalCopy",
  setup(s) {
    return (e, t) => (u(), X(to, { copy: !0 }));
  }
}), ur = (s, e = 0, t = !1) => {
  let n;
  return (...i) => {
    t && !n && s(...i), clearTimeout(n), n = setTimeout(() => {
      s(...i);
    }, e);
  };
}, no = (s, e, t) => {
  const n = T(s);
  return wo((i, d) => ({
    get() {
      return i(), n.value;
    },
    set: ur(
      (r) => {
        n.value = r, d();
      },
      e,
      !1
    )
  }));
}, vr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function fr(s, e) {
  return u(), _("svg", vr, [...e[0] || (e[0] = [
    o("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ])]);
}
const dn = { render: fr }, _r = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function pr(s, e) {
  return u(), _("svg", _r, [...e[0] || (e[0] = [
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
const Ot = { render: pr }, mr = { class: "vuefinder__search-modal__search-input" }, hr = ["value", "placeholder", "disabled"], gr = {
  key: 0,
  class: "vuefinder__search-modal__loading"
}, yr = /* @__PURE__ */ re({
  name: "SearchInput",
  __name: "SearchInput",
  props: {
    modelValue: {},
    isSearching: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "keydown"],
  setup(s, { expose: e, emit: t }) {
    const n = t, i = ie(), { t: d } = i.i18n, r = T(null), l = (f) => {
      const g = f.target;
      n("update:modelValue", g.value);
    }, c = (f) => {
      n("keydown", f);
    };
    return e({
      focus: () => {
        r.value && r.value.focus();
      }
    }), (f, g) => (u(), _("div", mr, [
      G(a(dn), { class: "vuefinder__search-modal__search-icon" }),
      o("input", {
        ref_key: "searchInput",
        ref: r,
        value: s.modelValue,
        type: "text",
        placeholder: a(d)("Search files"),
        disabled: s.disabled,
        class: "vuefinder__search-modal__input",
        onKeydown: c,
        onKeyup: g[0] || (g[0] = fe(() => {
        }, ["stop"])),
        onInput: l
      }, null, 40, hr),
      s.isSearching ? (u(), _("div", gr, [
        G(a(Ot), { class: "vuefinder__search-modal__loading-icon" })
      ])) : z("", !0)
    ]));
  }
}), wr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function br(s, e) {
  return u(), _("svg", wr, [...e[0] || (e[0] = [
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
const oo = { render: br }, kr = ["disabled", "title"], $r = ["data-theme"], xr = { class: "vuefinder__search-modal__dropdown-content" }, Sr = { class: "vuefinder__search-modal__dropdown-section" }, Cr = { class: "vuefinder__search-modal__dropdown-title" }, Fr = { class: "vuefinder__search-modal__dropdown-options" }, Er = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Pr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Tr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Dr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Mr = { class: "vuefinder__search-modal__dropdown-section" }, Ir = { class: "vuefinder__search-modal__dropdown-title" }, Ar = { class: "vuefinder__search-modal__dropdown-options" }, Or = ["onClick"], Lr = {
  key: 0,
  class: "vuefinder__search-modal__dropdown-option-check"
}, Rr = /* @__PURE__ */ re({
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
    const n = s, i = t, d = ie(), { t: r } = d.i18n, l = T(null), c = T(null);
    let f = null;
    const g = [
      { value: "name-asc", key: "Name (A-Z)" },
      { value: "name-desc", key: "Name (Z-A)" },
      { value: "size-asc", key: "Size (smallest)" },
      { value: "size-desc", key: "Size (largest)" },
      { value: "date-desc", key: "Date (newest)" },
      { value: "date-asc", key: "Date (oldest)" }
    ], h = (w) => {
      if (i("update:selectedOption", w), w.startsWith("size-")) {
        const v = w.split("-")[1];
        i("update:sizeFilter", v);
      }
    }, p = (w) => {
      i("update:sortBy", w);
    }, x = async () => {
      n.disabled || (n.visible ? (i("update:visible", !1), f && (f(), f = null)) : (i("update:visible", !0), await De(), await $()));
    }, $ = async () => {
      if (!(!l.value || !c.value) && (await De(), !(!l.value || !c.value))) {
        Object.assign(c.value.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: w, y: v } = await at(l.value, c.value, {
            placement: "bottom-start",
            strategy: "fixed",
            middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
          });
          Object.assign(c.value.style, {
            left: `${w}px`,
            top: `${v}px`
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
          f = Qt(l.value, c.value, async () => {
            if (!(!l.value || !c.value))
              try {
                const { x: w, y: v } = await at(
                  l.value,
                  c.value,
                  {
                    placement: "bottom-start",
                    strategy: "fixed",
                    middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
                  }
                );
                Object.assign(c.value.style, {
                  left: `${w}px`,
                  top: `${v}px`
                });
              } catch (w) {
                console.warn("Floating UI positioning error:", w);
              }
          });
        } catch (w) {
          console.warn("Floating UI autoUpdate setup error:", w), f = null;
        }
      }
    }, y = (w) => {
      if (!n.visible) return;
      const v = ["size-all", "size-small", "size-medium", "size-large"], S = v.findIndex((C) => C === n.selectedOption);
      if (w.key === "ArrowDown") {
        w.preventDefault();
        const C = (S + 1) % v.length;
        i("update:selectedOption", v[C] || null);
      } else if (w.key === "ArrowUp") {
        w.preventDefault();
        const C = S <= 0 ? v.length - 1 : S - 1;
        i("update:selectedOption", v[C] || null);
      } else w.key === "Enter" ? (w.preventDefault(), n.selectedOption?.startsWith("size-") && i(
        "update:sizeFilter",
        n.selectedOption.split("-")[1]
      )) : w.key === "Escape" && (w.preventDefault(), i("update:visible", !1), f && (f(), f = null));
    }, m = () => {
      f && (f(), f = null);
    };
    return pe(
      () => n.visible,
      (w) => {
        !w && f && (f(), f = null);
      }
    ), Te(() => {
      m();
    }), e({
      cleanup: m
    }), (w, v) => (u(), _(ve, null, [
      o("button", {
        ref_key: "dropdownBtn",
        ref: l,
        class: te(["vuefinder__search-modal__dropdown-btn", { "vuefinder__search-modal__dropdown-btn--active": s.visible }]),
        disabled: s.disabled,
        title: a(r)("Search Options"),
        onClick: fe(x, ["stop"])
      }, [
        G(a(oo), { class: "vuefinder__search-modal__dropdown-icon" })
      ], 10, kr),
      (u(), X(bt, { to: "body" }, [
        s.visible ? (u(), _("div", {
          key: 0,
          ref_key: "dropdownContent",
          ref: c,
          class: "vuefinder__themer vuefinder__search-modal__dropdown vuefinder__search-modal__dropdown--visible",
          "data-theme": a(d).theme.current,
          tabindex: "-1",
          onClick: v[4] || (v[4] = fe(() => {
          }, ["stop"])),
          onKeydown: y
        }, [
          o("div", xr, [
            o("div", Sr, [
              o("div", Cr, k(a(r)("File Size")), 1),
              o("div", Fr, [
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "all"
                  }]),
                  onClick: v[0] || (v[0] = fe((S) => h("size-all"), ["stop"]))
                }, [
                  o("span", null, k(a(r)("All Files")), 1),
                  s.sizeFilter === "all" ? (u(), _("div", Er, [...v[5] || (v[5] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "small"
                  }]),
                  onClick: v[1] || (v[1] = fe((S) => h("size-small"), ["stop"]))
                }, [
                  o("span", null, k(a(r)("Small (< 1MB)")), 1),
                  s.sizeFilter === "small" ? (u(), _("div", Pr, [...v[6] || (v[6] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "medium"
                  }]),
                  onClick: v[2] || (v[2] = fe((S) => h("size-medium"), ["stop"]))
                }, [
                  o("span", null, k(a(r)("Medium (1-10MB)")), 1),
                  s.sizeFilter === "medium" ? (u(), _("div", Tr, [...v[7] || (v[7] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2),
                o("div", {
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sizeFilter === "large"
                  }]),
                  onClick: v[3] || (v[3] = fe((S) => h("size-large"), ["stop"]))
                }, [
                  o("span", null, k(a(r)("Large (> 10MB)")), 1),
                  s.sizeFilter === "large" ? (u(), _("div", Dr, [...v[8] || (v[8] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 2)
              ])
            ]),
            o("div", Mr, [
              o("div", Ir, k(a(r)("Sort by")), 1),
              o("div", Ar, [
                (u(), _(ve, null, he(g, (S) => o("div", {
                  key: S.value,
                  class: te(["vuefinder__search-modal__dropdown-option", {
                    "vuefinder__search-modal__dropdown-option--selected": s.sortBy === S.value
                  }]),
                  onClick: fe((C) => p(S.value), ["stop"])
                }, [
                  o("span", null, k(a(r)(S.key)), 1),
                  s.sortBy === S.value ? (u(), _("div", Lr, [...v[9] || (v[9] = [
                    o("svg", {
                      viewBox: "0 0 16 16",
                      fill: "currentColor"
                    }, [
                      o("path", { d: "M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" })
                    ], -1)
                  ])])) : z("", !0)
                ], 10, Or)), 64))
              ])
            ])
          ])
        ], 40, $r)) : z("", !0)
      ]))
    ], 64));
  }
});
function Lt(s, e = 40) {
  const t = s.match(/^([^:]+:\/\/)(.*)$/);
  if (!t) return s;
  const n = t[1], i = t[2] ?? "", d = i.split("/").filter(Boolean), r = d.pop();
  if (!r) return n + i;
  let l = `${n}${d.join("/")}${d.length ? "/" : ""}${r}`;
  if (l.length <= e) return l;
  const c = r.split(/\.(?=[^\.]+$)/), f = c[0] ?? "", g = c[1] ?? "", h = f.length > 10 ? `${f.slice(0, 6)}...${f.slice(-5)}` : f, p = g ? `${h}.${g}` : h;
  return l = `${n}${d.join("/")}${d.length ? "/" : ""}${p}`, l.length > e && (l = `${n}.../${p}`), l;
}
async function so(s) {
  try {
    await navigator.clipboard.writeText(s);
  } catch {
    const e = document.createElement("textarea");
    e.value = s, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
  }
}
async function yt(s) {
  await so(s);
}
async function Br(s) {
  await so(s);
}
const zr = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 448 512"
};
function Vr(s, e) {
  return u(), _("svg", zr, [...e[0] || (e[0] = [
    o("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ])]);
}
const ao = { render: Vr }, Ur = ["title"], Nr = { class: "vuefinder__search-modal__result-icon" }, Hr = { class: "vuefinder__search-modal__result-content" }, jr = { class: "vuefinder__search-modal__result-name" }, Kr = {
  key: 1,
  class: "vuefinder__search-modal__result-size"
}, qr = ["title"], Wr = ["title"], Gr = ["data-item-dropdown", "data-theme"], Yr = { class: "vuefinder__search-modal__item-dropdown-content" }, Xr = /* @__PURE__ */ re({
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
    const t = s, n = e, i = ie(), { t: d } = i.i18n, { enabled: r } = Ve(), l = oe(i.config.state), c = R(() => r("pinned")), f = R(
      () => l.value.pinnedFolders.some((b) => b.path === t.item.path)
    ), g = (b) => {
      const F = i.config.get("pinnedFolders");
      F.some((M) => M.path === b.path) ? i.config.set(
        "pinnedFolders",
        F.filter((M) => M.path !== b.path)
      ) : i.config.set("pinnedFolders", [...F, b]);
    }, h = T(null);
    let p = null, x = null, $ = [], y = null;
    pe(
      () => t.activeDropdown,
      (b) => {
        p && (p(), p = null), x && ($.forEach((F) => {
          F === window ? window.removeEventListener("scroll", x, !0) : F.removeEventListener("scroll", x, !0);
        }), x = null, $ = []), y && (document.removeEventListener("mousedown", y, !0), document.removeEventListener("touchstart", y, !0), y = null), b === t.item.path && h.value && De(() => {
          P(t.item.path, h.value), w(), v();
        });
      }
    );
    const m = (b) => {
      const F = [];
      let M = b;
      for (; M && M !== document.body && M !== document.documentElement; ) {
        const j = window.getComputedStyle(M), le = j.overflow + j.overflowX + j.overflowY;
        (le.includes("scroll") || le.includes("auto")) && F.push(M), M = M.parentElement;
      }
      return F;
    }, w = () => {
      if (t.activeDropdown !== t.item.path) return;
      const b = m(h.value);
      $ = [window, ...b], x = () => {
        t.activeDropdown === t.item.path && n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      };
      const F = x;
      F && $.forEach((M) => {
        M === window ? window.addEventListener("scroll", F, !0) : M.addEventListener("scroll", F, !0);
      });
    }, v = () => {
      t.activeDropdown === t.item.path && (y = (b) => {
        if (t.activeDropdown !== t.item.path) return;
        const F = b.target;
        if (!F) return;
        const M = document.querySelector(
          `[data-item-dropdown="${t.item.path}"]`
        );
        if (M && M.contains(F) || h.value && h.value.contains(F))
          return;
        const j = i.root;
        if (j && j.contains(F)) {
          n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        const le = document.querySelector(".vuefinder__modal-layout");
        if (le && le.contains(F)) {
          n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
          return;
        }
        n("toggleItemDropdown", t.item.path, new MouseEvent("click"));
      }, setTimeout(() => {
        y && (document.addEventListener("mousedown", y, !0), document.addEventListener("touchstart", y, !0));
      }, 100));
    };
    Te(() => {
      p && (p(), p = null), x && ($.forEach((b) => {
        b === window ? window.removeEventListener("scroll", x, !0) : b.removeEventListener("scroll", x, !0);
      }), x = null, $ = []), y && (document.removeEventListener("mousedown", y, !0), document.removeEventListener("touchstart", y, !0), y = null);
    });
    const S = (b) => t.expandedPaths.has(b), C = (b) => b.type === "dir" || !b.file_size ? "" : Zt(b.file_size), E = (b, F) => {
      F.stopPropagation(), n("toggleItemDropdown", b, F);
    }, P = async (b, F) => {
      const M = document.querySelector(
        `[data-item-dropdown="${b}"]`
      );
      if (!(!M || !F) && (await De(), !(!M || !F))) {
        Object.assign(M.style, {
          position: "fixed",
          zIndex: "10001",
          opacity: "0",
          transform: "translateY(-8px)",
          transition: "opacity 150ms ease-out, transform 150ms ease-out"
        });
        try {
          const { x: j, y: le } = await at(F, M, {
            placement: "left-start",
            strategy: "fixed",
            middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
          });
          Object.assign(M.style, {
            left: `${j}px`,
            top: `${le}px`
          }), requestAnimationFrame(() => {
            M && Object.assign(M.style, {
              opacity: "1",
              transform: "translateY(0)"
            });
          });
        } catch (j) {
          console.warn("Floating UI initial positioning error:", j);
          return;
        }
        try {
          p = Qt(F, M, async () => {
            if (!(!F || !M))
              try {
                const { x: j, y: le } = await at(F, M, {
                  placement: "left-start",
                  strategy: "fixed",
                  middleware: [_t(8), pt({ padding: 16 }), mt({ padding: 16 })]
                });
                Object.assign(M.style, {
                  left: `${j}px`,
                  top: `${le}px`
                });
              } catch (j) {
                console.warn("Floating UI positioning error:", j);
              }
          });
        } catch (j) {
          console.warn("Floating UI autoUpdate setup error:", j), p = null;
        }
      }
    }, B = (b) => {
      n("update:selectedItemDropdownOption", b);
    }, K = async (b) => {
      await yt(b.path), n("copyPath", b);
    }, Z = (b) => {
      n("openContainingFolder", b);
    }, ee = (b) => {
      n("preview", b);
    }, Q = (b) => {
      n("open", b);
    }, Y = (b) => {
      if (!t.activeDropdown) return;
      const F = ["copy-path", "open-folder", "preview"], M = t.selectedItemDropdownOption, j = F.findIndex((le) => M?.includes(le));
      if (b.key === "ArrowDown") {
        b.preventDefault();
        const le = (j + 1) % F.length;
        n(
          "update:selectedItemDropdownOption",
          `${F[le] || ""}-${t.activeDropdown}`
        );
      } else if (b.key === "ArrowUp") {
        b.preventDefault();
        const le = j <= 0 ? F.length - 1 : j - 1;
        n(
          "update:selectedItemDropdownOption",
          `${F[le] || ""}-${t.activeDropdown}`
        );
      } else b.key === "Enter" ? (b.preventDefault(), M && (M.includes("copy-path") ? K(t.item) : M.includes("open-folder") ? Z(t.item) : M.includes("preview") && ee(t.item))) : b.key === "Escape" && (b.preventDefault(), n("update:selectedItemDropdownOption", null));
    };
    return (b, F) => (u(), _("div", {
      class: te(["vuefinder__search-modal__result-item", { "vuefinder__search-modal__result-item--selected": s.index === s.selectedIndex }]),
      title: s.item.basename,
      onClick: F[13] || (F[13] = (M) => n("select", s.index)),
      onDblclick: F[14] || (F[14] = fe((M) => n("activate", s.item), ["stop"]))
    }, [
      o("div", Nr, [
        s.item.type === "dir" ? (u(), X(a(Re), { key: 0 })) : (u(), X(a(ht), { key: 1 }))
      ]),
      o("div", Hr, [
        o("div", jr, [
          s.item.type === "dir" && c.value && f.value ? (u(), X(a(gt), {
            key: 0,
            class: "vuefinder__search-modal__result-pin",
            title: a(d)("Pinned")
          }, null, 8, ["title"])) : z("", !0),
          ge(" " + k(s.item.basename) + " ", 1),
          C(s.item) ? (u(), _("span", Kr, k(C(s.item)), 1)) : z("", !0)
        ]),
        o("div", {
          class: "vuefinder__search-modal__result-path",
          title: s.item.path,
          onClick: F[0] || (F[0] = fe((M) => {
            n("select", s.index), n("togglePathExpansion", s.item.path);
          }, ["stop"]))
        }, k(S(s.item.path) ? s.item.path : a(Lt)(s.item.path)), 9, qr)
      ]),
      o("button", {
        ref_key: "buttonElementRef",
        ref: h,
        class: "vuefinder__search-modal__result-actions",
        title: a(d)("More actions"),
        onClick: F[1] || (F[1] = (M) => {
          n("selectWithDropdown", s.index), E(s.item.path, M);
        })
      }, [
        G(a(ao), { class: "vuefinder__search-modal__result-actions-icon" })
      ], 8, Wr),
      (u(), X(bt, { to: "body" }, [
        s.activeDropdown === s.item.path ? (u(), _("div", {
          key: 0,
          "data-item-dropdown": s.item.path,
          class: "vuefinder__themer vuefinder__search-modal__item-dropdown vuefinder__search-modal__item-dropdown--visible",
          "data-theme": a(i).theme.current,
          tabindex: "-1",
          onClick: F[12] || (F[12] = fe(() => {
          }, ["stop"])),
          onKeydown: Y
        }, [
          o("div", Yr, [
            o("div", {
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `copy-path-${s.item.path}`
              }]),
              onClick: F[2] || (F[2] = (M) => {
                B(`copy-path-${s.item.path}`), K(s.item);
              }),
              onFocus: F[3] || (F[3] = (M) => B(`copy-path-${s.item.path}`))
            }, [
              G(a(an), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, k(a(d)("Copy Path")), 1)
            ], 34),
            o("div", {
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `open-folder-${s.item.path}`
              }]),
              onClick: F[4] || (F[4] = (M) => {
                B(`open-folder-${s.item.path}`), Z(s.item);
              }),
              onFocus: F[5] || (F[5] = (M) => B(`open-folder-${s.item.path}`))
            }, [
              G(a(Re), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, k(a(d)("Open Containing Folder")), 1)
            ], 34),
            s.item.type === "dir" ? (u(), _("div", {
              key: 0,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `open-${s.item.path}`
              }]),
              onClick: F[6] || (F[6] = (M) => {
                B(`open-${s.item.path}`), Q(s.item);
              }),
              onFocus: F[7] || (F[7] = (M) => B(`open-${s.item.path}`))
            }, [
              G(a(Re), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, k(a(d)("Open")), 1)
            ], 34)) : z("", !0),
            s.item.type === "dir" && c.value ? (u(), _("div", {
              key: 1,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `pin-${s.item.path}`
              }]),
              onClick: F[8] || (F[8] = (M) => {
                B(`pin-${s.item.path}`), g(s.item);
              }),
              onFocus: F[9] || (F[9] = (M) => B(`pin-${s.item.path}`))
            }, [
              G(a(gt), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, k(f.value ? a(d)("Unpin Folder") : a(d)("Pin Folder")), 1)
            ], 34)) : (u(), _("div", {
              key: 2,
              class: te(["vuefinder__search-modal__item-dropdown-option", {
                "vuefinder__search-modal__item-dropdown-option--selected": s.selectedItemDropdownOption === `preview-${s.item.path}`
              }]),
              onClick: F[10] || (F[10] = (M) => {
                B(`preview-${s.item.path}`), ee(s.item);
              }),
              onFocus: F[11] || (F[11] = (M) => B(`preview-${s.item.path}`))
            }, [
              G(a(ht), { class: "vuefinder__search-modal__item-dropdown-icon" }),
              o("span", null, k(a(d)("Preview")), 1)
            ], 34))
          ])
        ], 40, Gr)) : z("", !0)
      ]))
    ], 42, Ur));
  }
}), Qr = {
  key: 0,
  class: "vuefinder__search-modal__searching"
}, Jr = { class: "vuefinder__search-modal__loading-icon" }, Zr = {
  key: 1,
  class: "vuefinder__search-modal__no-results"
}, ed = {
  key: 2,
  class: "vuefinder__search-modal__results-list"
}, td = { class: "vuefinder__search-modal__results-header" }, et = 60, Pn = 5, nd = /* @__PURE__ */ re({
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
    const n = s, i = t, d = ie(), { t: r } = d.i18n, l = st("scrollableContainer"), c = R(() => n.searchResults.length > 0), f = R(() => n.searchResults.length), g = T(0), h = T(600), p = R(() => n.searchResults.length * et), x = R(() => {
      const S = Math.max(0, Math.floor(g.value / et) - Pn), C = Math.min(
        n.searchResults.length,
        Math.ceil((g.value + h.value) / et) + Pn
      );
      return { start: S, end: C };
    }), $ = R(() => {
      const { start: S, end: C } = x.value;
      return n.searchResults.slice(S, C).map((E, P) => ({
        item: E,
        index: S + P,
        top: (S + P) * et
      }));
    }), y = (S) => {
      const C = S.target;
      g.value = C.scrollTop;
    }, m = () => {
      l.value && (h.value = l.value.clientHeight);
    }, w = () => {
      if (n.selectedIndex >= 0 && l.value) {
        const S = n.selectedIndex * et, C = S + et, E = l.value.scrollTop, P = l.value.clientHeight, B = E + P;
        let K = E;
        S < E ? K = S : C > B && (K = C - P), K !== E && l.value.scrollTo({
          top: K,
          behavior: "smooth"
        });
      }
    }, v = () => {
      l.value && (l.value.scrollTop = 0, g.value = 0);
    };
    return ye(() => {
      m(), window.addEventListener("resize", m);
    }), Te(() => {
      window.removeEventListener("resize", m);
    }), pe(
      () => l.value,
      () => {
        m();
      }
    ), e({
      scrollSelectedIntoView: w,
      resetScroll: v,
      getContainerHeight: () => h.value,
      scrollTop: () => g.value
    }), (S, C) => (u(), _("div", {
      class: te(["vuefinder__search-modal__results", { "vuefinder__search-modal__results--enter": s.resultsEnter }])
    }, [
      s.isSearching ? (u(), _("div", Qr, [
        o("div", Jr, [
          G(a(Ot), { class: "vuefinder__search-modal__loading-icon" })
        ]),
        o("span", null, k(a(r)("Searching...")), 1)
      ])) : c.value ? (u(), _("div", ed, [
        o("div", td, [
          o("span", null, k(a(r)("Found %s results", f.value)), 1)
        ]),
        o("div", {
          ref_key: "scrollableContainer",
          ref: l,
          class: "vuefinder__search-modal__results-scrollable",
          onScroll: y
        }, [
          o("div", {
            class: "vuefinder__search-modal__results-items",
            style: Pe({ height: `${p.value}px`, position: "relative" })
          }, [
            (u(!0), _(ve, null, he($.value, (E) => (u(), _("div", {
              key: E.item.path,
              style: Pe({
                position: "absolute",
                top: `${E.top}px`,
                left: "0",
                width: "100%",
                height: `${et}px`
              })
            }, [
              G(Xr, {
                item: E.item,
                index: E.index,
                "selected-index": s.selectedIndex,
                "expanded-paths": s.expandedPaths,
                "active-dropdown": s.activeDropdown,
                "selected-item-dropdown-option": s.selectedItemDropdownOption,
                onSelect: C[0] || (C[0] = (P) => i("selectResultItem", P)),
                onSelectWithDropdown: C[1] || (C[1] = (P) => i("selectResultItemWithDropdown", P)),
                onTogglePathExpansion: C[2] || (C[2] = (P) => i("togglePathExpansion", P)),
                onToggleItemDropdown: C[3] || (C[3] = (P, B) => i("toggleItemDropdown", P, B)),
                "onUpdate:selectedItemDropdownOption": C[4] || (C[4] = (P) => i("update:selectedItemDropdownOption", P)),
                onCopyPath: C[5] || (C[5] = (P) => i("copyPath", P)),
                onOpenContainingFolder: C[6] || (C[6] = (P) => i("openContainingFolder", P)),
                onOpen: C[7] || (C[7] = (P) => i("open", P)),
                onPreview: C[8] || (C[8] = (P) => i("preview", P)),
                onActivate: C[9] || (C[9] = (P) => i("activate", P))
              }, null, 8, ["item", "index", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])
            ], 4))), 128))
          ], 4)
        ], 544)
      ])) : (u(), _("div", Zr, [
        o("span", null, k(a(r)("No results found")), 1)
      ]))
    ], 2));
  }
}), od = { class: "vuefinder__search-modal" }, sd = { class: "vuefinder__search-modal__content" }, ad = { class: "vuefinder__search-modal__search-bar" }, id = { class: "vuefinder__search-modal__search-location" }, ld = ["title"], rd = ["disabled"], dd = {
  key: 0,
  class: "vuefinder__search-modal__folder-selector"
}, cd = { class: "vuefinder__search-modal__folder-selector-content" }, ud = {
  key: 1,
  class: "vuefinder__search-modal__instructions"
}, vd = { class: "vuefinder__search-modal__instructions-text" }, cn = /* @__PURE__ */ re({
  name: "ModalSearch",
  __name: "ModalSearch",
  setup(s) {
    const e = ie(), t = Be(e), { t: n } = e.i18n, i = e.fs, d = T(null), r = T(null), l = T(null), c = no("", 300), f = T([]), g = T(!1), h = T(-1);
    let p = null;
    const x = T(!1), $ = T(!1), y = T(null), m = T("all"), w = T(!1), v = T("name-asc"), S = {
      "name-asc": { column: "basename", direction: 1 },
      "name-desc": { column: "basename", direction: -1 },
      "size-asc": { column: "file_size", direction: 1 },
      "size-desc": { column: "file_size", direction: -1 },
      "date-asc": { column: "last_modified", direction: 1 },
      "date-desc": { column: "last_modified", direction: -1 }
    }, C = R(() => {
      const { column: D, direction: V } = S[v.value];
      return f.value.slice().sort((ue, be) => qn(ue[D], be[D]) * V);
    }), E = T(`size-${m.value}`), P = T(null), B = T(/* @__PURE__ */ new Set()), K = T(null), Z = oe(i.path), ee = (D) => {
      B.value.has(D) ? B.value.delete(D) : B.value.add(D);
    }, Q = (D, V) => {
      V && typeof V.stopPropagation == "function" && V.stopPropagation(), K.value === D ? K.value = null : K.value = D;
    }, Y = () => {
      K.value = null;
    }, b = (D) => {
      try {
        const V = D.dir || `${D.storage}://`;
        e.adapter.open(V), e.modal.close(), Y();
      } catch {
        t.error(n("Failed to open containing folder"));
      }
    }, F = (D) => {
      e.modal.open(Ye, {
        storage: Z?.value?.storage ?? "local",
        item: D
      }), Y();
    }, M = (D) => {
      e.adapter.open(D.path), e.modal.close(), Y();
    }, j = (D) => {
      D.type === "dir" ? M(D) : F(D);
    }, le = (D) => {
      h.value = D, Y();
    }, L = (D) => {
      h.value = D;
    }, O = async (D) => {
      await yt(D.path), Y();
    };
    pe(c, async (D) => {
      D.trim() ? (await I(D.trim()), h.value = 0) : (p && (p.abort(), p = null), f.value = [], g.value = !1, h.value = -1);
    }), pe(m, async (D) => {
      E.value = `size-${D}`, c.value.trim() && !$.value && (await I(c.value.trim()), h.value = 0);
    }), pe(w, async () => {
      c.value.trim() && !$.value && (await I(c.value.trim()), h.value = 0);
    });
    const N = (D) => {
      if (!D || typeof D != "object") return !1;
      const V = D.name;
      return V === "AbortError" || V === "CanceledError";
    }, I = async (D) => {
      if (!D) return;
      p && p.abort();
      const V = new AbortController();
      p = V, g.value = !0;
      try {
        const ue = y.value?.path || Z?.value?.path, be = await e.adapter.search({
          path: ue,
          filter: D,
          deep: w.value,
          size: m.value,
          signal: V.signal
        });
        if (V.signal.aborted) return;
        f.value = be || [], g.value = !1;
      } catch (ue) {
        if (N(ue) || V.signal.aborted) return;
        t.error(Fe(ue, n("Search failed"))), f.value = [], g.value = !1;
      }
    };
    ye(() => {
      document.addEventListener("click", H), E.value = `size-${m.value}`;
    });
    const W = () => {
      $.value ? ($.value = !1, c.value.trim() && (I(c.value.trim()), h.value = 0)) : (x.value = !1, $.value = !0);
    }, A = (D) => {
      D && (y.value = D);
    }, U = (D) => {
      D && (A(D), $.value = !1, c.value.trim() && (I(c.value.trim()), h.value = 0));
    };
    Te(() => {
      document.removeEventListener("click", H), p && (p.abort(), p = null), r.value && r.value.cleanup();
    });
    const H = (D) => {
      const V = D.target;
      if (x.value && (V.closest(".vuefinder__search-modal__dropdown") || (x.value = !1, De(() => {
        d.value && d.value.focus();
      }))), K.value) {
        const ue = V.closest(".vuefinder__search-modal__item-dropdown"), be = V.closest(".vuefinder__search-modal__result-item");
        !ue && !be && Y();
      }
    };
    return (D, V) => (u(), X(ze, { class: "vuefinder__search-modal-layout" }, {
      default: ce(() => [
        o("div", od, [
          G(Ne, {
            icon: a(dn),
            title: a(n)("Search files")
          }, null, 8, ["icon", "title"]),
          o("div", sd, [
            o("div", ad, [
              G(yr, {
                ref_key: "searchInputRef",
                ref: d,
                modelValue: a(c),
                "onUpdate:modelValue": V[0] || (V[0] = (ue) => bo(c) ? c.value = ue : null),
                "is-searching": g.value,
                disabled: $.value
              }, null, 8, ["modelValue", "is-searching", "disabled"]),
              G(Rr, {
                ref_key: "searchOptionsDropdownRef",
                ref: r,
                visible: x.value,
                "onUpdate:visible": V[1] || (V[1] = (ue) => x.value = ue),
                "size-filter": m.value,
                "onUpdate:sizeFilter": V[2] || (V[2] = (ue) => m.value = ue),
                "selected-option": E.value,
                "onUpdate:selectedOption": V[3] || (V[3] = (ue) => E.value = ue),
                "sort-by": v.value,
                "onUpdate:sortBy": V[4] || (V[4] = (ue) => v.value = ue),
                disabled: $.value
              }, null, 8, ["visible", "size-filter", "selected-option", "sort-by", "disabled"])
            ]),
            o("div", {
              class: "vuefinder__search-modal__options",
              onClick: V[8] || (V[8] = fe(() => {
              }, ["stop"]))
            }, [
              o("div", id, [
                o("button", {
                  class: te(["vuefinder__search-modal__location-btn", { "vuefinder__search-modal__location-btn--open": $.value }]),
                  onClick: fe(W, ["stop"])
                }, [
                  G(a(Re), { class: "vuefinder__search-modal__location-icon" }),
                  o("span", {
                    class: "vuefinder__search-modal__location-text",
                    title: y.value?.path || a(Z).path
                  }, k(a(Lt)(y.value?.path || a(Z).path)), 9, ld),
                  V[11] || (V[11] = o("svg", {
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
                onClick: V[7] || (V[7] = fe(() => {
                }, ["stop"]))
              }, [
                me(o("input", {
                  "onUpdate:modelValue": V[5] || (V[5] = (ue) => w.value = ue),
                  type: "checkbox",
                  disabled: $.value,
                  class: "vuefinder__search-modal__checkbox",
                  onClick: V[6] || (V[6] = fe(() => {
                  }, ["stop"]))
                }, null, 8, rd), [
                  [lt, w.value]
                ]),
                o("span", null, k(a(n)("Include subfolders")), 1)
              ])
            ]),
            $.value ? (u(), _("div", dd, [
              o("div", cd, [
                G(kt, {
                  modelValue: y.value,
                  "onUpdate:modelValue": [
                    V[9] || (V[9] = (ue) => y.value = ue),
                    A
                  ],
                  "show-pinned-folders": !0,
                  "current-path": a(Z),
                  onSelectAndClose: U
                }, null, 8, ["modelValue", "current-path"])
              ])
            ])) : z("", !0),
            !a(c).trim() && !$.value ? (u(), _("div", ud, [
              o("p", vd, k(a(n)("Start typing to search files. Use options to filter or include subfolders.")), 1)
            ])) : z("", !0),
            a(c).trim() && !$.value ? (u(), X(nd, {
              key: 2,
              ref_key: "searchResultsListRef",
              ref: l,
              "search-results": C.value,
              "is-searching": g.value,
              "selected-index": h.value,
              "expanded-paths": B.value,
              "active-dropdown": K.value,
              "selected-item-dropdown-option": P.value,
              "results-enter": !0,
              onSelectResultItem: le,
              onSelectResultItemWithDropdown: L,
              onTogglePathExpansion: ee,
              onToggleItemDropdown: Q,
              "onUpdate:selectedItemDropdownOption": V[10] || (V[10] = (ue) => P.value = ue),
              onCopyPath: O,
              onOpenContainingFolder: b,
              onOpen: M,
              onPreview: F,
              onActivate: j
            }, null, 8, ["search-results", "is-searching", "selected-index", "expanded-paths", "active-dropdown", "selected-item-dropdown-option"])) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), fd = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(s, { emit: e, slots: t }) {
    const n = ie(), i = T(!1), { t: d } = n.i18n;
    let r = null;
    const l = () => {
      r && clearTimeout(r), i.value = !0, r = setTimeout(() => {
        i.value = !1;
      }, 2e3);
    };
    return ye(() => {
      n.emitter.on(s.on, l);
    }), Te(() => {
      r && clearTimeout(r);
    }), {
      shown: i,
      t: d
    };
  }
}, _d = (s, e) => {
  const t = s.__vccOpts || s;
  for (const [n, i] of e)
    t[n] = i;
  return t;
}, pd = { key: 1 };
function md(s, e, t, n, i, d) {
  return u(), _("div", {
    class: te(["vuefinder__action-message", { "vuefinder__action-message--hidden": !n.shown }])
  }, [
    s.$slots.default ? Me(s.$slots, "default", { key: 0 }) : (u(), _("span", pd, k(n.t("Saved.")), 1))
  ], 2);
}
const Tn = /* @__PURE__ */ _d(fd, [["render", md]]), hd = [
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
], gd = { class: "vuefinder__settings-modal__content" }, yd = { class: "vuefinder__settings-modal__main" }, wd = { class: "vuefinder__settings-modal__sections" }, bd = {
  key: 0,
  class: "vuefinder__settings-modal__section"
}, kd = {
  for: "theme",
  class: "vuefinder__settings-modal__label"
}, $d = { class: "vuefinder__settings-modal__input-group" }, xd = ["value"], Sd = ["value"], Cd = {
  key: 1,
  class: "vuefinder__settings-modal__section"
}, Fd = {
  for: "language",
  class: "vuefinder__settings-modal__label"
}, Ed = { class: "vuefinder__settings-modal__input-group" }, Pd = ["value"], Td = { class: "vuefinder__settings-modal__reset-section" }, Dd = { class: "vuefinder__settings-modal__reset-content" }, Md = { class: "vuefinder__settings-modal__reset-title" }, Id = { class: "vuefinder__settings-modal__reset-description" }, io = /* @__PURE__ */ re({
  __name: "ModalSettings",
  setup(s) {
    const e = ie(), { enabled: t } = Ve(), n = e.config, { clearStore: i } = e.storage, { t: d, localeAtom: r } = e.i18n, l = oe(r), c = R({
      get: () => String(l.value || "en"),
      set: (m) => r.set(m || "en")
    }), f = oe(n.state), g = R(() => f.value.theme || "silver"), h = async () => {
      n.reset(), i(), localStorage.removeItem("vuefinder_locale"), localStorage.removeItem("vuefinder_translations"), location.reload();
    }, p = (m) => {
      n.set("theme", m), e.emitter.emit("vf-theme-saved");
    }, { i18n: x } = Ct("VueFinderOptions"), y = Object.fromEntries(
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
      }).filter(([m]) => Object.keys(x).includes(m))
    );
    return (m, w) => (u(), X(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: w[2] || (w[2] = (v) => a(e).modal.close())
        }, k(a(d)("Close")), 1)
      ]),
      default: ce(() => [
        o("div", gd, [
          G(Ne, {
            icon: a(oo),
            title: a(d)("Settings")
          }, null, 8, ["icon", "title"]),
          o("div", yd, [
            o("div", wd, [
              a(t)("theme") ? (u(), _("div", bd, [
                o("label", kd, [
                  ge(k(a(d)("Theme")) + " ", 1),
                  G(Tn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-theme-saved"
                  }, {
                    default: ce(() => [
                      ge(k(a(d)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", $d, [
                  o("select", {
                    id: "theme",
                    value: g.value,
                    class: "vuefinder__settings-modal__select",
                    onChange: w[0] || (w[0] = (v) => p(v.target?.value))
                  }, [
                    (u(!0), _(ve, null, he(a(hd), (v) => (u(), _("option", {
                      key: v.name,
                      value: v.name
                    }, k(v.displayName), 9, Sd))), 128))
                  ], 40, xd)
                ])
              ])) : z("", !0),
              Object.keys(a(y)).length > 1 ? (u(), _("div", Cd, [
                o("label", Fd, [
                  ge(k(a(d)("Language")) + " ", 1),
                  G(Tn, {
                    class: "vuefinder__settings-modal__message",
                    on: "vf-language-saved"
                  }, {
                    default: ce(() => [
                      ge(k(a(d)("Saved.")), 1)
                    ]),
                    _: 1
                  })
                ]),
                o("div", Ed, [
                  me(o("select", {
                    id: "language",
                    "onUpdate:modelValue": w[1] || (w[1] = (v) => c.value = v),
                    class: "vuefinder__settings-modal__select"
                  }, [
                    (u(!0), _(ve, null, he(a(y), (v, S) => (u(), _("option", {
                      key: S,
                      value: S
                    }, k(v), 9, Pd))), 128))
                  ], 512), [
                    [qt, c.value]
                  ])
                ])
              ])) : z("", !0)
            ]),
            o("div", Td, [
              o("div", Dd, [
                o("div", Md, k(a(d)("Reset")), 1),
                o("div", Id, k(a(d)("Reset all settings to default")), 1)
              ]),
              o("button", {
                type: "button",
                class: "vuefinder__settings-modal__reset-button",
                onClick: h
              }, k(a(d)("Reset Settings")), 1)
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
function Ad() {
  const s = ie(), e = Be(s), t = s.fs, n = s.config, { enabled: i } = Ve(), d = oe(t.path), r = oe(t.selectedItems), l = (c) => {
    if (c.code === Oe.ESCAPE && (s.modal.close(), s.root.focus()), !s.modal.visible) {
      if (c.metaKey && c.code === Oe.KEY_R && !c.shiftKey && (s.adapter.invalidateListQuery(d.value.path), s.adapter.open(d.value.path), c.preventDefault()), c.metaKey && c.shiftKey && c.code === Oe.KEY_R && i("rename") && r.value.length === 1 && (s.modal.open(Dt, { items: r.value }), c.preventDefault()), c.code === Oe.DELETE && r.value.length !== 0 && s.modal.open(Tt, { items: r.value }), c.metaKey && c.code === Oe.BACKSLASH && s.modal.open(Gn), c.metaKey && c.code === Oe.KEY_F && i("search") && (s.modal.open(cn), c.preventDefault()), c.metaKey && c.code === Oe.KEY_E && (n.toggle("showTreeView"), c.preventDefault()), c.metaKey && c.code === Oe.KEY_S && (s.modal.open(io), c.preventDefault()), c.metaKey && c.code === Oe.ENTER && (n.toggle("fullScreen"), s.root.focus()), c.metaKey && c.code === Oe.KEY_A && (t.selectAll(s.selectionMode || "multiple", s), c.preventDefault()), c.code === Oe.SPACE && r.value.length === 1 && r.value[0]?.type !== "dir" && s.modal.open(Ye, {
        storage: t.path.get().storage,
        item: r.value[0]
      }), c.metaKey && c.code === Oe.KEY_C && i("copy")) {
        if (r.value.length === 0) {
          e.error(s.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("copy", new Set(r.value.map((f) => ke(f)))), e.success(
          r.value.length === 1 ? s.i18n.t("Item copied to clipboard") : s.i18n.t("%s items copied to clipboard", r.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Oe.KEY_X && i("copy")) {
        if (r.value.length === 0) {
          e.error(s.i18n.t("No items selected"));
          return;
        }
        t.setClipboard("cut", new Set(r.value.map((f) => ke(f)))), e.success(
          r.value.length === 1 ? s.i18n.t("Item cut to clipboard") : s.i18n.t("%s items cut to clipboard", r.value.length)
        ), c.preventDefault();
      }
      if (c.metaKey && c.code === Oe.KEY_V && i("copy")) {
        if (t.getClipboard().items.size === 0) {
          e.error(s.i18n.t("No items in clipboard"));
          return;
        }
        if (t.getClipboard().path === t.path.get().path) {
          e.error(s.i18n.t("Cannot paste items to the same directory"));
          return;
        }
        if (t.getClipboard().type === "cut") {
          s.modal.open(it, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          }), t.clearClipboard();
          return;
        }
        if (t.getClipboard().type === "copy") {
          s.modal.open(rn, {
            items: { from: Array.from(t.getClipboard().items), to: t.path.get() }
          });
          return;
        }
        c.preventDefault();
      }
    }
  };
  ye(async () => {
    if (await De(), !s.root) {
      console.warn("app.root is not available. Event listeners will not be attached.");
      return;
    }
    s.root.addEventListener("keydown", l);
  }), wt(() => {
    s.root && s.root.removeEventListener("keydown", l);
  });
}
function Od() {
  const s = T(!1), e = T([]);
  return {
    isDraggingExternal: s,
    externalFiles: e,
    handleDragEnter: (l) => {
      l.preventDefault(), l.stopPropagation();
      const c = l.dataTransfer?.items;
      c && Array.from(c).some((g) => g.kind === "file") && (s.value = !0, l.isExternalDrag = !0);
    },
    handleDragOver: (l) => {
      s.value && l.dataTransfer && (l.dataTransfer.dropEffect = "copy", l.preventDefault(), l.stopPropagation());
    },
    handleDragLeave: (l) => {
      l.preventDefault();
      const c = l.currentTarget.getBoundingClientRect(), f = l.clientX, g = l.clientY;
      (f < c.left || f > c.right || g < c.top || g > c.bottom) && (s.value = !1);
    },
    handleDrop: async (l) => {
      l.preventDefault(), l.stopPropagation(), s.value = !1;
      const c = l.dataTransfer?.items;
      if (c) {
        const f = Array.from(c).filter((g) => g.kind === "file");
        if (f.length > 0) {
          e.value = [];
          const g = f.map((h) => ({
            entry: h.webkitGetAsEntry?.(),
            file: h.getAsFile()
          }));
          for (const { entry: h, file: p } of g)
            h ? await on((x, $) => {
              const y = x?.fullPath || $.name, m = y.startsWith("/") ? y.slice(1) : y;
              e.value.push({
                name: $.name,
                relativePath: m,
                size: $.size,
                type: $.type,
                lastModified: new Date($.lastModified),
                file: $
              });
            }, h) : p && e.value.push({
              name: p.name,
              relativePath: p.name,
              size: p.size,
              type: p.type,
              lastModified: new Date(p.lastModified),
              file: p
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
const Ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Rd(s, e) {
  return u(), _("svg", Ld, [...e[0] || (e[0] = [
    o("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ])]);
}
const lo = { render: Rd }, Bd = { class: "vuefinder__new-folder-modal__content" }, zd = { class: "vuefinder__new-folder-modal__form" }, Vd = { class: "vuefinder__new-folder-modal__description" }, Ud = ["placeholder"], un = /* @__PURE__ */ re({
  __name: "ModalNewFolder",
  setup(s) {
    const e = ie(), t = Be(e), { t: n } = e.i18n, i = e.fs, d = oe(i.path), r = T(""), l = () => {
      r.value !== "" && e.adapter.createFolder({
        path: d.value.path,
        name: r.value
      }).then((c) => {
        t.success(n("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Fe(c, n("Failed to create folder")));
      });
    };
    return (c, f) => (u(), X(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: l
        }, k(a(n)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (g) => a(e).modal.close())
        }, k(a(n)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          G(Ne, {
            icon: a(lo),
            title: a(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          o("div", Bd, [
            o("div", zd, [
              o("p", Vd, k(a(n)("Create a new folder")), 1),
              me(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (g) => r.value = g),
                class: "vuefinder__new-folder-modal__input",
                placeholder: a(n)("Folder Name"),
                type: "text",
                autofocus: "",
                onKeyup: He(l, ["enter"])
              }, null, 40, Ud), [
                [Ke, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Hd(s, e) {
  return u(), _("svg", Nd, [...e[0] || (e[0] = [
    o("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ])]);
}
const ro = { render: Hd }, jd = { class: "vuefinder__new-file-modal__content" }, Kd = { class: "vuefinder__new-file-modal__form" }, qd = { class: "vuefinder__new-file-modal__description" }, Wd = ["placeholder"], co = /* @__PURE__ */ re({
  __name: "ModalNewFile",
  setup(s) {
    const e = ie(), t = Be(e), { t: n } = e.i18n, i = e.fs, d = oe(i.path), r = T(""), l = () => {
      r.value !== "" && e.adapter.createFile({
        path: d.value.path,
        name: r.value
      }).then((c) => {
        t.success(n("%s is created.", r.value)), e.fs.setFiles(c.files), e.modal.close();
      }).catch((c) => {
        t.error(Fe(c, n("Failed to create file")));
      });
    };
    return (c, f) => (u(), X(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: l
        }, k(a(n)("Create")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: f[1] || (f[1] = (g) => a(e).modal.close())
        }, k(a(n)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          G(Ne, {
            icon: a(ro),
            title: a(n)("New File")
          }, null, 8, ["icon", "title"]),
          o("div", jd, [
            o("div", Kd, [
              o("p", qd, k(a(n)("Create a new file")), 1),
              me(o("input", {
                "onUpdate:modelValue": f[0] || (f[0] = (g) => r.value = g),
                class: "vuefinder__new-file-modal__input",
                placeholder: a(n)("File Name"),
                type: "text",
                onKeyup: He(l, ["enter"])
              }, null, 40, Wd), [
                [Ke, r.value]
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Gd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Yd(s, e) {
  return u(), _("svg", Gd, [...e[0] || (e[0] = [
    o("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ])]);
}
const vn = { render: Yd };
function Xt(s, e = 14) {
  const t = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return s.replace(new RegExp(t), "$2..$4");
}
const Xd = { class: "vuefinder__upload-modal__content relative" }, Qd = { class: "vuefinder__upload-modal__target-section" }, Jd = { class: "vuefinder__upload-modal__target-label" }, Zd = { class: "vuefinder__upload-modal__target-container" }, ec = { class: "vuefinder__upload-modal__target-path" }, tc = { class: "vuefinder__upload-modal__target-storage" }, nc = {
  key: 0,
  class: "vuefinder__upload-modal__target-folder"
}, oc = { class: "vuefinder__upload-modal__target-badge" }, sc = { class: "vuefinder__upload-modal__drag-hint" }, ac = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, ic = ["textContent"], lc = { class: "vuefinder__upload-modal__file-info" }, rc = {
  key: 0,
  class: "vuefinder__upload-modal__file-rename"
}, dc = ["placeholder", "onKeyup"], cc = ["title", "onClick"], uc = ["title"], vc = { class: "vuefinder__upload-modal__file-name hidden md:block" }, fc = { class: "vuefinder__upload-modal__file-name md:hidden" }, _c = {
  key: 0,
  class: "ml-auto"
}, pc = ["title", "disabled", "onClick"], mc = ["title", "disabled", "onClick"], hc = {
  key: 0,
  class: "py-2"
}, gc = ["aria-expanded"], yc = {
  key: 0,
  class: "vuefinder__upload-actions__menu absolute right-0 bottom-full left-0 mb-2"
}, wc = ["disabled"], bc = ["title"], kc = ["aria-expanded"], $c = {
  key: 0,
  class: "vuefinder__upload-actions__menu"
}, Rt = /* @__PURE__ */ re({
  __name: "ModalUpload",
  setup(s) {
    const e = ie(), { t } = e.i18n, n = e.fs, i = oe(n.path), d = T(i.value), r = T(!1), l = () => {
      const H = d.value.path;
      if (!H) return { storage: "local", path: "" };
      if (H.endsWith("://"))
        return { storage: H.replace("://", ""), path: "" };
      const D = H.split("://");
      return {
        storage: D[0] || "local",
        path: D[1] || ""
      };
    }, c = (H) => {
      H && (d.value = H);
    }, f = (H) => {
      H && (d.value = H, r.value = !1);
    }, {
      container: g,
      internalFileInput: h,
      internalFolderInput: p,
      pickFiles: x,
      queue: $,
      message: y,
      uploading: m,
      hasFilesInDropArea: w,
      definitions: v,
      openFileSelector: S,
      upload: C,
      cancel: E,
      remove: P,
      clear: B,
      close: K,
      getClassNameForEntry: Z,
      getIconForEntry: ee,
      addExternalFiles: Q,
      renameEntry: Y
    } = Jn(e.customUploader), b = T(null), F = T(""), M = T(null), j = (H) => {
      const D = H.lastIndexOf("/");
      return D === -1 ? H : H.slice(D + 1);
    }, le = (H) => {
      m.value || H.status !== v.value.QUEUE_ENTRY_STATUS.UPLOADING && (b.value = H.id, F.value = j(H.name), De(() => {
        const D = M.value;
        if (D) {
          D.focus();
          const V = F.value.lastIndexOf(".");
          V > 0 ? D.setSelectionRange(0, V) : D.select();
        }
      }));
    }, L = () => {
      b.value = null, F.value = "";
    }, O = async (H) => {
      const D = F.value.trim();
      if (!D || D === j(H.name)) {
        L();
        return;
      }
      await Y(H, D), L();
    }, N = () => {
      C(d.value);
    };
    ye(() => {
      e.emitter.on("vf-external-files-dropped", (H) => {
        Q(H);
      });
    }), Te(() => {
      e.emitter.off("vf-external-files-dropped");
    });
    const I = T(!1), W = T(null), A = T(null), U = (H) => {
      if (!I.value) return;
      const D = H.target, V = W.value?.contains(D) ?? !1, ue = A.value?.contains(D) ?? !1;
      !V && !ue && (I.value = !1);
    };
    return ye(() => document.addEventListener("click", U)), Te(() => document.removeEventListener("click", U)), (H, D) => (u(), X(ze, {
      "show-drag-overlay": a(w),
      "drag-overlay-text": a(t)("Drag and drop the files/folders to here.")
    }, {
      buttons: ce(() => [
        o("div", {
          ref_key: "actionsMenuMobileRef",
          ref: W,
          class: "relative mb-2 w-full sm:hidden"
        }, [
          o("div", {
            class: te([
              "vuefinder__upload-actions",
              "vuefinder__upload-actions--block",
              I.value ? "vuefinder__upload-actions--ring" : ""
            ])
          }, [
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__main",
              onClick: D[4] || (D[4] = (V) => a(S)())
            }, k(a(t)("Select Files")), 1),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": I.value ? "true" : "false",
              onClick: D[5] || (D[5] = fe((V) => I.value = !I.value, ["stop"]))
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
            ])], 8, gc)
          ], 2),
          I.value ? (u(), _("div", yc, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[6] || (D[6] = (V) => {
                a(S)(), I.value = !1;
              })
            }, k(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[7] || (D[7] = (V) => {
                a(p)?.click(), I.value = !1;
              })
            }, k(a(t)("Select Folders")), 1),
            D[22] || (D[22] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: D[8] || (D[8] = (V) => a(m) ? null : (a(B)(!1), I.value = !1))
            }, k(a(t)("Clear all")), 3),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: D[9] || (D[9] = (V) => a(m) ? null : (a(B)(!0), I.value = !1))
            }, k(a(t)("Clear only successful")), 3)
          ])) : z("", !0)
        ], 512),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: a(m) || !a($).length,
          onClick: fe(N, ["prevent"])
        }, k(a(t)("Upload")), 9, wc),
        a(m) ? (u(), _("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: D[10] || (D[10] = fe(
            //@ts-ignore
            (...V) => a(E) && a(E)(...V),
            ["prevent"]
          ))
        }, k(a(t)("Cancel")), 1)) : z("", !0),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          title: a(m) ? a(t)("Upload continues in the background.") : void 0,
          onClick: D[11] || (D[11] = fe(
            //@ts-ignore
            (...V) => a(K) && a(K)(...V),
            ["prevent"]
          ))
        }, k(a(t)("Close")), 9, bc),
        o("div", {
          ref_key: "actionsMenuDesktopRef",
          ref: A,
          class: "relative mr-auto hidden sm:block"
        }, [
          o("div", {
            class: te(["vuefinder__upload-actions", I.value ? "vuefinder__upload-actions--ring" : ""])
          }, [
            o("button", {
              ref_key: "pickFiles",
              ref: x,
              type: "button",
              class: "vuefinder__upload-actions__main"
            }, k(a(t)("Select Files")), 513),
            o("button", {
              type: "button",
              class: "vuefinder__upload-actions__trigger",
              "aria-haspopup": "menu",
              "aria-expanded": I.value ? "true" : "false",
              onClick: D[12] || (D[12] = fe((V) => I.value = !I.value, ["stop"]))
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
            ])], 8, kc)
          ], 2),
          I.value ? (u(), _("div", $c, [
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[13] || (D[13] = (V) => {
                a(S)(), I.value = !1;
              })
            }, k(a(t)("Select Files")), 1),
            o("div", {
              class: "vuefinder__upload-actions__item",
              onClick: D[14] || (D[14] = (V) => {
                a(p)?.click(), I.value = !1;
              })
            }, k(a(t)("Select Folders")), 1),
            D[24] || (D[24] = o("div", { class: "vuefinder__upload-actions__separator" }, null, -1)),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: D[15] || (D[15] = (V) => a(m) ? null : (a(B)(!1), I.value = !1))
            }, k(a(t)("Clear all")), 3),
            o("div", {
              class: te(["vuefinder__upload-actions__item", a(m) ? "disabled" : ""]),
              onClick: D[16] || (D[16] = (V) => a(m) ? null : (a(B)(!0), I.value = !1))
            }, k(a(t)("Clear only successful")), 3)
          ])) : z("", !0)
        ], 512)
      ]),
      default: ce(() => [
        o("div", null, [
          G(Ne, {
            icon: a(vn),
            title: a(t)("Upload Files")
          }, null, 8, ["icon", "title"]),
          o("div", Xd, [
            o("div", Qd, [
              o("div", Jd, k(a(t)("Target Directory")), 1),
              o("div", Zd, [
                o("div", {
                  class: "vuefinder__upload-modal__target-display",
                  onClick: D[0] || (D[0] = (V) => r.value = !r.value)
                }, [
                  o("div", ec, [
                    o("span", tc, k(l().storage) + "://", 1),
                    l().path ? (u(), _("span", nc, k(l().path), 1)) : z("", !0)
                  ]),
                  o("span", oc, k(a(t)("Browse")), 1)
                ])
              ]),
              o("div", {
                class: te([
                  "vuefinder__upload-modal__tree-selector",
                  r.value ? "vuefinder__upload-modal__tree-selector--expanded" : "vuefinder__upload-modal__tree-selector--collapsed"
                ])
              }, [
                G(kt, {
                  modelValue: d.value,
                  "onUpdate:modelValue": [
                    D[1] || (D[1] = (V) => d.value = V),
                    c
                  ],
                  "show-pinned-folders": !0,
                  onSelectAndClose: f
                }, null, 8, ["modelValue"])
              ], 2)
            ]),
            o("div", sc, k(a(t)("You can drag & drop files anywhere while this modal is open.")), 1),
            o("div", {
              ref_key: "container",
              ref: g,
              class: "hidden"
            }, null, 512),
            o("div", ac, [
              (u(!0), _(ve, null, he(a($), (V) => (u(), _("div", {
                key: V.id,
                class: "vuefinder__upload-modal__file-entry"
              }, [
                o("span", {
                  class: te(["vuefinder__upload-modal__file-icon", a(Z)(V)])
                }, [
                  o("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: k(a(ee)(V))
                  }, null, 8, ic)
                ], 2),
                o("div", lc, [
                  b.value === V.id ? (u(), _("div", rc, [
                    me(o("input", {
                      ref_for: !0,
                      ref_key: "renameInputRef",
                      ref: M,
                      "onUpdate:modelValue": D[2] || (D[2] = (ue) => F.value = ue),
                      type: "text",
                      class: "vuefinder__upload-modal__file-rename-input",
                      placeholder: a(t)("Rename"),
                      onKeyup: [
                        He((ue) => O(V), ["enter"]),
                        He(L, ["esc"])
                      ]
                    }, null, 40, dc), [
                      [Ke, F.value]
                    ]),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn vuefinder__upload-modal__file-rename-btn--save",
                      title: a(t)("Save"),
                      onClick: (ue) => O(V)
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
                    ])], 8, cc),
                    o("button", {
                      type: "button",
                      class: "vuefinder__upload-modal__file-rename-btn",
                      title: a(t)("Cancel"),
                      onClick: L
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
                    ])], 8, uc)
                  ])) : (u(), _(ve, { key: 1 }, [
                    o("div", vc, k(a(Xt)(V.name, 40)) + " (" + k(V.size) + ") ", 1),
                    o("div", fc, k(a(Xt)(V.name, 16)) + " (" + k(V.size) + ") ", 1),
                    o("div", {
                      class: te(["vuefinder__upload-modal__file-status", a(Z)(V)])
                    }, [
                      ge(k(V.statusName) + " ", 1),
                      V.status === a(v).QUEUE_ENTRY_STATUS.UPLOADING ? (u(), _("b", _c, k(V.percent), 1)) : z("", !0)
                    ], 2)
                  ], 64))
                ]),
                b.value !== V.id ? (u(), _("button", {
                  key: 0,
                  type: "button",
                  class: te([
                    "vuefinder__upload-modal__file-rename-action",
                    a(m) || V.status === a(v).QUEUE_ENTRY_STATUS.UPLOADING ? "disabled" : ""
                  ]),
                  title: a(t)("Rename"),
                  disabled: a(m) || V.status === a(v).QUEUE_ENTRY_STATUS.UPLOADING,
                  onClick: (ue) => le(V)
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
                ])], 10, pc)) : z("", !0),
                b.value !== V.id ? (u(), _("button", {
                  key: 1,
                  type: "button",
                  class: te(["vuefinder__upload-modal__file-remove", a(m) ? "disabled" : ""]),
                  title: a(t)("Delete"),
                  disabled: a(m),
                  onClick: (ue) => a(P)(V)
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
                ])], 10, mc)) : z("", !0)
              ]))), 128)),
              a($).length ? z("", !0) : (u(), _("div", hc, k(a(t)("No files selected!")), 1))
            ]),
            a(y).length ? (u(), X(Yt, {
              key: 0,
              error: "",
              onHidden: D[3] || (D[3] = (V) => y.value = "")
            }, {
              default: ce(() => [
                ge(k(a(y)), 1)
              ]),
              _: 1
            })) : z("", !0)
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
          ref: p,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }, 8, ["show-drag-overlay", "drag-overlay-text"]));
  }
}), xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Sc(s, e) {
  return u(), _("svg", xc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const uo = { render: Sc }, Cc = { class: "vuefinder__unarchive-modal__content" }, Fc = { class: "vuefinder__unarchive-modal__items" }, Ec = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pc = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Tc = { class: "vuefinder__unarchive-modal__item-name" }, Dc = { class: "vuefinder__unarchive-modal__info" }, Mc = { class: "vuefinder__unarchive-modal__target" }, Ic = { class: "vuefinder__unarchive-modal__target-label" }, Ac = ["title"], Oc = {
  key: 0,
  class: "vuefinder__unarchive-modal__target-selector"
}, fn = /* @__PURE__ */ re({
  __name: "ModalUnarchive",
  setup(s) {
    const e = ie(), t = Be(e), n = e.fs, i = oe(n.path), { t: d } = e.i18n, r = T(e.modal.data.items[0]), l = T([]), c = T(null), f = T(!1), g = R(() => c.value?.path || i.value.path), h = () => {
      f.value = !f.value;
    }, p = (y) => {
      y && (c.value = y);
    }, x = (y) => {
      y && (c.value = y, f.value = !1);
    }, $ = () => {
      const y = c.value?.path;
      e.adapter.unarchive({
        item: r.value.path,
        path: i.value.path,
        // Optional. Sent when the user explicitly picks a different folder.
        ...y && y !== i.value.path ? { destination: y } : {}
      }).then((m) => {
        t.success(d("The file unarchived.")), e.fs.setFiles(m.files), e.modal.close();
      }).catch((m) => {
        t.error(Fe(m, d("Failed to unarchive")));
      });
    };
    return (y, m) => (u(), X(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: $
        }, k(a(d)("Unarchive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[1] || (m[1] = (w) => a(e).modal.close())
        }, k(a(d)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          G(Ne, {
            icon: a(uo),
            title: a(d)("Unarchive")
          }, null, 8, ["icon", "title"]),
          o("div", Cc, [
            o("div", Fc, [
              (u(!0), _(ve, null, he(l.value, (w) => (u(), _("p", {
                key: w.path,
                class: "vuefinder__unarchive-modal__item"
              }, [
                w.type === "dir" ? (u(), _("svg", Ec, [...m[2] || (m[2] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ])])) : (u(), _("svg", Pc, [...m[3] || (m[3] = [
                  o("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ])])),
                o("span", Tc, k(w.basename), 1)
              ]))), 128)),
              o("p", Dc, k(a(d)("The archive will be unarchived at")) + " (" + k(g.value) + ") ", 1),
              o("div", Mc, [
                o("div", Ic, k(a(d)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: te(["vuefinder__unarchive-modal__target-btn", { "vuefinder__unarchive-modal__target-btn--open": f.value }]),
                  onClick: h
                }, [
                  G(a(Re), { class: "vuefinder__unarchive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__unarchive-modal__target-text",
                    title: g.value
                  }, k(a(Lt)(g.value)), 9, Ac),
                  m[4] || (m[4] = o("svg", {
                    class: "vuefinder__unarchive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                f.value ? (u(), _("div", Oc, [
                  G(kt, {
                    modelValue: c.value,
                    "onUpdate:modelValue": [
                      m[0] || (m[0] = (w) => c.value = w),
                      p
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(i),
                    onSelectAndClose: x
                  }, null, 8, ["modelValue", "current-path"])
                ])) : z("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Rc(s, e) {
  return u(), _("svg", Lc, [...e[0] || (e[0] = [
    o("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ])]);
}
const vo = { render: Rc }, Bc = { class: "vuefinder__archive-modal__content" }, zc = { class: "vuefinder__archive-modal__form" }, Vc = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Uc = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Nc = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Hc = { class: "vuefinder__archive-modal__file-name" }, jc = ["placeholder"], Kc = { class: "vuefinder__archive-modal__target" }, qc = { class: "vuefinder__archive-modal__target-label" }, Wc = ["title"], Gc = {
  key: 0,
  class: "vuefinder__archive-modal__target-selector"
}, _n = /* @__PURE__ */ re({
  __name: "ModalArchive",
  setup(s) {
    const e = ie(), t = Be(e), { t: n } = e.i18n, i = e.fs, d = oe(i.path), r = T(""), l = T(e.modal.data.items), c = T(null), f = T(!1), g = R(() => c.value?.path || d.value.path), h = () => {
      f.value = !f.value;
    }, p = (y) => {
      y && (c.value = y);
    }, x = (y) => {
      y && (c.value = y, f.value = !1);
    }, $ = () => {
      if (l.value.length) {
        const y = c.value?.path;
        e.adapter.archive({
          path: d.value.path,
          items: l.value.map(({ path: m, type: w }) => ({
            path: m,
            type: w
          })),
          name: r.value,
          // Optional. Sent when the user explicitly picks a different folder.
          ...y && y !== d.value.path ? { destination: y } : {}
        }).then((m) => {
          t.success(n("The file(s) archived.")), e.fs.setFiles(m.files), e.modal.close();
        }).catch((m) => {
          t.error(Fe(m, n("Failed to archive files")));
        });
      }
    };
    return (y, m) => (u(), X(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          onClick: $
        }, k(a(n)("Archive")), 1),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: m[2] || (m[2] = (w) => a(e).modal.close())
        }, k(a(n)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", null, [
          G(Ne, {
            icon: a(vo),
            title: a(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          o("div", Bc, [
            o("div", zc, [
              o("div", Vc, [
                (u(!0), _(ve, null, he(l.value, (w) => (u(), _("p", {
                  key: w.path,
                  class: "vuefinder__archive-modal__file"
                }, [
                  w.type === "dir" ? (u(), _("svg", Uc, [...m[3] || (m[3] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ])])) : (u(), _("svg", Nc, [...m[4] || (m[4] = [
                    o("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])])),
                  o("span", Hc, k(w.basename), 1)
                ]))), 128))
              ]),
              me(o("input", {
                "onUpdate:modelValue": m[0] || (m[0] = (w) => r.value = w),
                class: "vuefinder__archive-modal__input",
                placeholder: a(n)("Archive name. (.zip file will be created)"),
                type: "text",
                onKeyup: He($, ["enter"])
              }, null, 40, jc), [
                [Ke, r.value]
              ]),
              o("div", Kc, [
                o("div", qc, k(a(n)("Target folder")), 1),
                o("button", {
                  type: "button",
                  class: te(["vuefinder__archive-modal__target-btn", { "vuefinder__archive-modal__target-btn--open": f.value }]),
                  onClick: h
                }, [
                  G(a(Re), { class: "vuefinder__archive-modal__target-icon" }),
                  o("span", {
                    class: "vuefinder__archive-modal__target-text",
                    title: g.value
                  }, k(a(Lt)(g.value)), 9, Wc),
                  m[5] || (m[5] = o("svg", {
                    class: "vuefinder__archive-modal__target-arrow",
                    viewBox: "0 0 16 16",
                    fill: "currentColor"
                  }, [
                    o("path", { d: "M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" })
                  ], -1))
                ], 2),
                f.value ? (u(), _("div", Gc, [
                  G(kt, {
                    modelValue: c.value,
                    "onUpdate:modelValue": [
                      m[1] || (m[1] = (w) => c.value = w),
                      p
                    ],
                    "show-pinned-folders": !0,
                    "current-path": a(d),
                    onSelectAndClose: x
                  }, null, 8, ["modelValue", "current-path"])
                ])) : z("", !0)
              ])
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Yc = { class: "vuefinder__about-modal__content" }, Xc = { class: "vuefinder__about-modal__main" }, Qc = { class: "vuefinder__about-modal__shortcuts" }, Jc = { class: "vuefinder__about-modal__shortcut" }, Zc = {
  key: 0,
  class: "vuefinder__about-modal__shortcut"
}, eu = {
  key: 1,
  class: "vuefinder__about-modal__shortcut"
}, tu = { class: "vuefinder__about-modal__shortcut" }, nu = { class: "vuefinder__about-modal__shortcut" }, ou = {
  key: 2,
  class: "vuefinder__about-modal__shortcut"
}, su = {
  key: 3,
  class: "vuefinder__about-modal__shortcut"
}, au = {
  key: 4,
  class: "vuefinder__about-modal__shortcut"
}, iu = {
  key: 5,
  class: "vuefinder__about-modal__shortcut"
}, lu = { class: "vuefinder__about-modal__shortcut" }, ru = { class: "vuefinder__about-modal__shortcut" }, du = {
  key: 6,
  class: "vuefinder__about-modal__shortcut"
}, cu = {
  key: 7,
  class: "vuefinder__about-modal__shortcut"
}, uu = /* @__PURE__ */ re({
  __name: "ModalShortcuts",
  setup(s) {
    const e = ie(), { enabled: t } = Ve(), { t: n } = e.i18n;
    return (i, d) => (u(), X(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: d[0] || (d[0] = (r) => a(e).modal.close())
        }, k(a(n)("Close")), 1)
      ]),
      default: ce(() => [
        o("div", Yc, [
          G(Ne, {
            icon: a(tn),
            title: a(n)("Shortcuts")
          }, null, 8, ["icon", "title"]),
          o("div", Xc, [
            o("div", Qc, [
              o("div", Jc, [
                o("div", null, k(a(n)("Refresh")), 1),
                d[1] || (d[1] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ge(" + "),
                  o("kbd", null, "R")
                ], -1))
              ]),
              a(t)("rename") ? (u(), _("div", Zc, [
                o("div", null, k(a(n)("Rename")), 1),
                d[2] || (d[2] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ge(" + "),
                  o("kbd", null, "Shift"),
                  ge(" + "),
                  o("kbd", null, "R")
                ], -1))
              ])) : z("", !0),
              a(t)("delete") ? (u(), _("div", eu, [
                o("div", null, k(a(n)("Delete")), 1),
                d[3] || (d[3] = o("kbd", null, "Del", -1))
              ])) : z("", !0),
              o("div", tu, [
                o("div", null, k(a(n)("Escape")), 1),
                d[4] || (d[4] = o("kbd", null, "Esc", -1))
              ]),
              o("div", nu, [
                o("div", null, k(a(n)("Select All")), 1),
                d[5] || (d[5] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ge(" + "),
                  o("kbd", null, "A")
                ], -1))
              ]),
              a(t)("copy") ? (u(), _("div", ou, [
                o("div", null, k(a(n)("Cut")), 1),
                d[6] || (d[6] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ge(" + "),
                  o("kbd", null, "X")
                ], -1))
              ])) : z("", !0),
              a(t)("copy") ? (u(), _("div", su, [
                o("div", null, k(a(n)("Copy")), 1),
                d[7] || (d[7] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ge(" + "),
                  o("kbd", null, "C")
                ], -1))
              ])) : z("", !0),
              a(t)("copy") ? (u(), _("div", au, [
                o("div", null, k(a(n)("Paste")), 1),
                d[8] || (d[8] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ge(" + "),
                  o("kbd", null, "V")
                ], -1))
              ])) : z("", !0),
              a(t)("search") ? (u(), _("div", iu, [
                o("div", null, k(a(n)("Search")), 1),
                d[9] || (d[9] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ge(" + "),
                  o("kbd", null, "F")
                ], -1))
              ])) : z("", !0),
              o("div", lu, [
                o("div", null, k(a(n)("Toggle Sidebar")), 1),
                d[10] || (d[10] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ge(" + "),
                  o("kbd", null, "E")
                ], -1))
              ]),
              o("div", ru, [
                o("div", null, k(a(n)("Open Settings")), 1),
                d[11] || (d[11] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ge(" + "),
                  o("kbd", null, "S")
                ], -1))
              ]),
              a(t)("fullscreen") ? (u(), _("div", du, [
                o("div", null, k(a(n)("Toggle Full Screen")), 1),
                d[12] || (d[12] = o("div", null, [
                  o("kbd", null, "⌘"),
                  ge(" + "),
                  o("kbd", null, "Enter")
                ], -1))
              ])) : z("", !0),
              a(t)("preview") ? (u(), _("div", cu, [
                o("div", null, k(a(n)("Preview")), 1),
                d[13] || (d[13] = o("kbd", null, "Space", -1))
              ])) : z("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}), vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function fu(s, e) {
  return u(), _("svg", vu, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const fo = { render: fu }, pn = "vuefinder:recent-paths", _o = 4, mn = typeof window < "u" && typeof window.localStorage < "u";
function hn() {
  if (!mn) return [];
  try {
    const s = window.localStorage.getItem(pn);
    if (!s) return [];
    const e = JSON.parse(s);
    return Array.isArray(e) ? e.filter((t) => typeof t == "string").slice(0, _o) : [];
  } catch {
    return [];
  }
}
function _u(s) {
  if (!(!mn || !s))
    try {
      const e = hn().filter((t) => t !== s);
      e.unshift(s), window.localStorage.setItem(pn, JSON.stringify(e.slice(0, _o)));
    } catch {
    }
}
function pu(s) {
  if (!(!mn || !s))
    try {
      const e = hn().filter((t) => t !== s);
      window.localStorage.setItem(pn, JSON.stringify(e));
    } catch {
    }
}
const mu = { class: "vuefinder__go-to-folder-modal" }, hu = { class: "vuefinder__go-to-folder-modal__content" }, gu = ["placeholder", "onKeydown"], yu = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__error"
}, wu = ["onMouseenter", "onClick", "onDblclick"], bu = { class: "vuefinder__go-to-folder-modal__suggestion-label" }, ku = {
  key: 0,
  class: "vuefinder__go-to-folder-modal__suggestion-tag"
}, $u = ["title", "onClick"], xu = ["title", "onClick"], Su = {
  key: 2,
  class: "vuefinder__go-to-folder-modal__empty"
}, Cu = {
  key: 3,
  class: "vuefinder__go-to-folder-modal__loading"
}, Fu = ["disabled"], Eu = /* @__PURE__ */ re({
  name: "ModalGoToFolder",
  __name: "ModalGoToFolder",
  setup(s) {
    const e = ie(), { t } = e.i18n, n = e.fs, i = oe(n.storages), d = T(""), r = T([]), l = T(0), c = T(!1), f = T(!1), g = T(""), h = T(null), p = T(null);
    let x = 0;
    const $ = R(() => i.value ?? []), y = (L) => {
      const O = L ?? "", N = O.indexOf("://");
      if (N === -1)
        return { storage: null, parent: "", filter: O.trim(), hasProtocol: !1 };
      const I = O.slice(0, N), W = O.slice(N + 3), A = W.lastIndexOf("/"), U = A === -1 ? `${I}://` : `${I}://${W.slice(0, A).replace(/^\/+/, "")}`, H = A === -1 ? W : W.slice(A + 1);
      return { storage: I, parent: U, filter: H, hasProtocol: !0 };
    }, m = (L) => {
      const O = L.toLowerCase();
      r.value = $.value.filter((N) => !O || N.toLowerCase().includes(O)).map((N) => ({
        path: `${N}://`,
        label: `${N}://`,
        kind: "storage"
      })), l.value = r.value.length ? 0 : -1, g.value = "";
    }, w = () => {
      const L = hn();
      r.value = L.map((O) => ({
        path: O,
        label: O,
        kind: "recent"
      })), l.value = r.value.length ? 0 : -1, g.value = "";
    }, v = async (L, O) => {
      const N = ++x;
      c.value = !0, g.value = "";
      try {
        const I = await e.adapter.list(L);
        if (N !== x) return;
        const W = O.toLowerCase(), A = (I?.files ?? []).filter(
          (U) => U.type === "dir" && (!W || U.basename.toLowerCase().startsWith(W))
        );
        r.value = A.map(
          (U) => ({
            path: U.path,
            label: U.basename,
            kind: "dir"
          })
        ), l.value = r.value.length ? 0 : -1;
      } catch (I) {
        if (N !== x) return;
        r.value = [], l.value = -1, g.value = Fe(I, t("Folder not found"));
      } finally {
        N === x && (c.value = !1);
      }
    };
    let S = null;
    const C = (L) => {
      S && clearTimeout(S), S = setTimeout(() => E(L), 150);
    }, E = (L) => {
      const O = L.trim();
      if (!O) {
        x++, c.value = !1, w();
        return;
      }
      const { hasProtocol: N, parent: I, filter: W } = y(O);
      if (!N) {
        x++, c.value = !1, m(O);
        return;
      }
      v(I, W);
    };
    pe(d, (L) => C(L)), ye(() => {
      w(), De(() => h.value?.focus());
    });
    const P = () => {
      De(() => {
        const L = p.value;
        if (!L) return;
        const O = L.children[l.value];
        if (!O) return;
        const N = L.scrollTop, I = N + L.clientHeight, W = O.offsetTop, A = W + O.offsetHeight;
        W < N ? L.scrollTop = W : A > I && (L.scrollTop = A - L.clientHeight);
      });
    }, B = (L) => {
      if (!r.value.length) return;
      const O = r.value.length;
      l.value = ((l.value + L) % O + O) % O, P();
    }, K = (L) => {
      d.value = L.kind === "dir" ? `${L.path}/` : L.path, De(() => {
        h.value?.setSelectionRange(d.value.length, d.value.length);
      });
    }, Z = (L) => {
      if (!L.includes("://"))
        return {
          ok: !1,
          reason: t("Invalid path format. Path must be in format: storage://path/to/folder")
        };
      const O = L.slice(0, L.indexOf("://"));
      return $.value.includes(O) ? { ok: !0 } : { ok: !1, reason: t('Invalid storage. Storage "%s" is not available.', O) };
    }, ee = async (L) => {
      if (f.value) return;
      const O = L.trim();
      if (!O) return;
      const N = Z(O);
      if (!N.ok) {
        g.value = N.reason ?? "";
        return;
      }
      f.value = !0;
      try {
        if (await e.adapter.open(O) === void 0)
          return;
        _u(O), e.modal.close();
      } catch (I) {
        g.value = Fe(I, t("Failed to navigate to folder")), n.setLoading(!1);
      } finally {
        f.value = !1;
      }
    }, Q = () => {
      const L = r.value[l.value];
      ee(L ? L.path : d.value);
    }, Y = (L) => {
      if (!r.value.length) return;
      L.preventDefault();
      const O = r.value[l.value];
      O && K(O);
    }, b = (L) => {
      if (L.kind === "dir") {
        K(L);
        return;
      }
      ee(L.path);
    }, F = (L) => {
      ee(L.path);
    }, M = (L, O) => {
      L.stopPropagation(), L.preventDefault(), pu(O), w();
    }, j = (L, O) => {
      L.stopPropagation(), L.preventDefault(), d.value = O, De(() => {
        h.value?.focus(), h.value?.setSelectionRange(d.value.length, d.value.length);
      });
    }, le = R(() => {
      const L = $.value[0];
      return L ? `${L}://path/to/folder` : "storage://path/to/folder";
    });
    return (L, O) => (u(), X(ze, null, {
      buttons: ce(() => [
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: f.value,
          onClick: Q
        }, k(a(t)("Go")), 9, Fu),
        o("button", {
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: O[3] || (O[3] = (N) => a(e).modal.close())
        }, k(a(t)("Cancel")), 1)
      ]),
      default: ce(() => [
        o("div", mu, [
          G(Ne, {
            icon: a(At),
            title: a(t)("Go to Folder")
          }, null, 8, ["icon", "title"]),
          o("div", hu, [
            me(o("input", {
              ref_key: "inputRef",
              ref: h,
              "onUpdate:modelValue": O[0] || (O[0] = (N) => d.value = N),
              class: "vuefinder__go-to-folder-modal__input",
              type: "text",
              autocomplete: "off",
              spellcheck: "false",
              placeholder: le.value,
              onKeydown: [
                O[1] || (O[1] = He(fe((N) => B(1), ["prevent"]), ["down"])),
                O[2] || (O[2] = He(fe((N) => B(-1), ["prevent"]), ["up"])),
                He(fe(Q, ["prevent"]), ["enter"]),
                He(Y, ["tab"])
              ]
            }, null, 40, gu), [
              [Ke, d.value]
            ]),
            g.value ? (u(), _("div", yu, k(g.value), 1)) : z("", !0),
            r.value.length ? (u(), _("div", {
              key: 1,
              ref_key: "suggestionListRef",
              ref: p,
              class: "vuefinder__go-to-folder-modal__suggestions"
            }, [
              (u(!0), _(ve, null, he(r.value, (N, I) => (u(), _("div", {
                key: `${N.kind}:${N.path}`,
                class: te(["vuefinder__go-to-folder-modal__suggestion", {
                  "vuefinder__go-to-folder-modal__suggestion--active": I === l.value
                }]),
                onMouseenter: (W) => l.value = I,
                onClick: (W) => b(N),
                onDblclick: (W) => F(N)
              }, [
                G(a(Re), { class: "vuefinder__go-to-folder-modal__suggestion-icon" }),
                o("span", bu, k(N.label), 1),
                N.kind === "recent" ? (u(), _("span", ku, k(a(t)("Recent")), 1)) : z("", !0),
                N.kind === "recent" ? (u(), _("button", {
                  key: 1,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-fill",
                  title: a(t)("Edit this path"),
                  onClick: (W) => j(W, N.path)
                }, [
                  G(a(fo), { class: "vuefinder__go-to-folder-modal__suggestion-fill-icon" })
                ], 8, $u)) : z("", !0),
                N.kind === "recent" ? (u(), _("button", {
                  key: 2,
                  type: "button",
                  class: "vuefinder__go-to-folder-modal__suggestion-remove",
                  title: a(t)("Remove from recent"),
                  onClick: (W) => M(W, N.path)
                }, " × ", 8, xu)) : z("", !0)
              ], 42, wu))), 128))
            ], 512)) : c.value ? z("", !0) : (u(), _("div", Su, [
              d.value.trim() ? (u(), _(ve, { key: 1 }, [
                ge(k(a(t)("No matching folders.")), 1)
              ], 64)) : (u(), _(ve, { key: 0 }, [
                ge(k(a(t)("No recent folders yet.")), 1)
              ], 64))
            ])),
            c.value ? (u(), _("div", Cu, k(a(t)("Loading…")), 1)) : z("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}), Pu = { class: "vuefinder__menubar__container" }, Tu = ["onClick", "onMouseenter"], Du = { class: "vuefinder__menubar__label" }, Mu = ["onMouseenter"], Iu = ["onClick"], Au = {
  key: 0,
  class: "vuefinder__menubar__dropdown__label"
}, Ou = {
  key: 1,
  class: "vuefinder__menubar__dropdown__checkmark"
}, Lu = {
  key: 2,
  class: "vuefinder__menubar__dropdown__chevron",
  viewBox: "0 0 16 16",
  fill: "currentColor",
  "aria-hidden": "true"
}, Ru = {
  key: 3,
  class: "vuefinder__menubar__dropdown__submenu"
}, Bu = ["onClick"], zu = { class: "vuefinder__menubar__dropdown__label" }, Vu = /* @__PURE__ */ re({
  __name: "MenuBar",
  setup(s) {
    const e = ie(), { enabled: t } = Ve(), { t: n } = e?.i18n || { t: (v) => v }, i = e?.fs, d = e?.config, r = oe(d.state), l = oe(i.selectedItems), c = oe(i?.storages || []), f = T(null), g = T(!1), h = R(() => window.opener !== null || window.name !== "" || window.history.length <= 1), p = R(() => [
      {
        id: "file",
        label: n("File"),
        items: [
          {
            id: "new-folder",
            label: n("New Folder"),
            action: () => e?.modal?.open(un, { items: l.value }),
            hidden: () => !t("newfolder")
          },
          {
            id: "new-file",
            label: n("New File"),
            action: () => e?.modal?.open(co, { items: l.value }),
            hidden: () => !t("newfile")
          },
          {
            type: "separator",
            hidden: () => !t("newfolder") && !t("newfile") || !t("upload")
          },
          {
            id: "upload",
            label: n("Upload"),
            action: () => e?.modal?.open(Rt, { items: l.value }),
            hidden: () => !t("upload")
          },
          { type: "separator", hidden: () => !t("search") },
          {
            id: "search",
            label: n("Search"),
            action: () => e.modal.open(cn),
            hidden: () => !t("search")
          },
          { type: "separator", hidden: () => !t("archive") && !t("unarchive") },
          {
            id: "archive",
            label: n("Archive"),
            action: () => {
              l.value.length > 0 && e?.modal?.open(_n, { items: l.value });
            },
            enabled: () => l.value.length > 0,
            hidden: () => !t("archive")
          },
          {
            id: "unarchive",
            label: n("Unarchive"),
            action: () => {
              l.value.length === 1 && l.value[0]?.mime_type === "application/zip" && e?.modal?.open(fn, { items: l.value });
            },
            enabled: () => l.value.length === 1 && l.value[0]?.mime_type === "application/zip",
            hidden: () => !t("unarchive")
          },
          { type: "separator", hidden: () => !t("preview") },
          {
            id: "preview",
            label: n("Preview"),
            action: () => {
              l.value.length === 1 && l.value[0]?.type !== "dir" && e?.modal?.open(Ye, {
                storage: i?.path?.get()?.storage,
                item: l.value[0]
              });
            },
            enabled: () => l.value.length === 1 && l.value[0]?.type !== "dir",
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
                  storage: i?.path?.get()?.storage,
                  item: l.value[0],
                  forceType: "text"
                }),
                enabled: () => l.value.length === 1 && l.value[0]?.type !== "dir"
              },
              {
                id: "open-as-image",
                label: n("Image"),
                action: () => e?.modal?.open(Ye, {
                  storage: i?.path?.get()?.storage,
                  item: l.value[0],
                  forceType: "image"
                }),
                enabled: () => l.value.length === 1 && l.value[0]?.type !== "dir"
              }
            ],
            enabled: () => l.value.length === 1 && l.value[0]?.type !== "dir",
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
              action: () => i?.selectAll(e?.selectionMode || "multiple", e),
              enabled: () => !0
            },
            {
              id: "deselect",
              label: n("Deselect All"),
              action: () => i?.clearSelection(),
              enabled: () => l.value.length > 0
            },
            { type: "separator" }
          ] : [],
          ...t("copy") ? [
            {
              id: "cut",
              label: n("Cut"),
              action: () => {
                l.value.length > 0 && i?.setClipboard(
                  "cut",
                  new Set(l.value.map((v) => ke(v)))
                );
              },
              enabled: () => l.value.length > 0
            },
            {
              id: "copy",
              label: n("Copy"),
              action: () => {
                l.value.length > 0 && i?.setClipboard(
                  "copy",
                  new Set(l.value.map((v) => ke(v)))
                );
              },
              enabled: () => l.value.length > 0
            },
            {
              id: "paste",
              label: n("Paste"),
              action: () => {
                const v = i?.getClipboard();
                v?.items?.size > 0 && e?.modal?.open(v.type === "cut" ? it : rn, {
                  items: { from: Array.from(v.items), to: i?.path?.get() }
                });
              },
              enabled: () => i?.getClipboard()?.items?.size > 0
            }
          ] : [],
          ...t("move") ? [
            {
              id: "move",
              label: n("Move files"),
              action: () => {
                if (l.value.length > 0) {
                  const v = e?.fs, S = {
                    storage: v?.path?.get()?.storage || "",
                    path: v?.path?.get()?.path || "",
                    type: "dir"
                  };
                  e?.modal?.open(it, { items: { from: l.value, to: S } });
                }
              },
              enabled: () => l.value.length > 0
            },
            { type: "separator" }
          ] : [],
          {
            id: "copy-path",
            label: n("Copy Path"),
            action: async () => {
              if (l.value.length === 1) {
                const v = l.value[0];
                await yt(v.path);
              } else {
                const v = i?.path?.get();
                v?.path && await yt(v.path);
              }
            },
            enabled: () => !0
            // Her zaman aktif
          },
          {
            id: "copy-download-url",
            label: n("Copy Download URL"),
            action: async () => {
              if (l.value.length === 1) {
                const v = l.value[0];
                i?.path?.get()?.storage;
                const S = e?.adapter?.getDownloadUrl({ path: v.path });
                S && await Br(S);
              }
            },
            enabled: () => l.value.length === 1 && l.value[0]?.type !== "dir"
          },
          { type: "separator", hidden: () => !t("rename") && !t("delete") },
          {
            id: "rename",
            label: n("Rename"),
            action: () => {
              l.value.length === 1 && e?.modal?.open(Dt, { items: l.value });
            },
            enabled: () => l.value.length === 1,
            hidden: () => !t("rename")
          },
          {
            id: "delete",
            label: n("Delete"),
            action: () => {
              l.value.length > 0 && e?.modal?.open(Tt, { items: l.value });
            },
            enabled: () => l.value.length > 0,
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
              e.adapter.invalidateListQuery(i.path.get().path), e.adapter.open(i.path.get().path);
            },
            enabled: () => !0
          },
          { type: "separator" },
          {
            id: "grid-view",
            label: n("Grid View"),
            action: () => d?.set("view", "grid"),
            enabled: () => !0,
            checked: () => r.value?.view === "grid"
          },
          {
            id: "list-view",
            label: n("List View"),
            action: () => d?.set("view", "list"),
            enabled: () => !0,
            checked: () => r.value?.view === "list"
          },
          { type: "separator" },
          {
            id: "tree-view",
            label: n("Tree View"),
            action: () => d?.toggle("showTreeView"),
            enabled: () => !0,
            checked: () => r.value?.showTreeView
          },
          {
            id: "thumbnails",
            label: n("Show Thumbnails"),
            action: () => d?.toggle("showThumbnails"),
            enabled: () => !0,
            checked: () => r.value?.showThumbnails
          },
          {
            id: "show-hidden-files",
            label: n("Show Hidden Files"),
            action: () => d?.toggle("showHiddenFiles"),
            enabled: () => !0,
            checked: () => r.value?.showHiddenFiles
          },
          { type: "separator", hidden: () => !t("fullscreen") },
          {
            id: "fullscreen",
            label: n("Full Screen"),
            action: () => d?.toggle("fullScreen"),
            enabled: () => t("fullscreen"),
            checked: () => r.value?.fullScreen,
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
            checked: () => r.value?.persist
          },
          {
            id: "metric-units",
            label: n("Metric Units"),
            action: () => {
              d?.toggle("metricUnits"), e.filesize = d?.get("metricUnits") ? jn : Zt, e.emitter.emit("vf-metric-units-saved");
            },
            enabled: () => !0,
            checked: () => r.value?.metricUnits
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
                i?.goForward();
                const v = i?.path?.get();
                v?.path && e?.adapter.open(v.path);
              },
              enabled: () => i?.canGoForward?.get() ?? !1
            },
            {
              id: "back",
              label: n("Back"),
              action: () => {
                i?.goBack();
                const v = i?.path?.get();
                v?.path && e?.adapter.open(v.path);
              },
              enabled: () => i?.canGoBack?.get() ?? !1
            }
          ] : [],
          {
            id: "open-containing-folder",
            label: n("Open containing folder"),
            action: () => {
              const v = i?.path?.get();
              if (v?.breadcrumb && v.breadcrumb.length > 1) {
                const C = v.breadcrumb[v.breadcrumb.length - 2]?.path ?? `${v.storage}://`;
                e?.adapter.open(C);
              }
            },
            enabled: () => {
              const v = i?.path?.get();
              return v?.breadcrumb && v.breadcrumb.length > 1;
            }
          },
          { type: "separator" },
          // Dynamic storage list items will be added here
          ...(c.value || []).map((v) => ({
            id: `storage-${v}`,
            label: v,
            action: () => {
              const S = `${v}://`;
              e?.adapter.open(S);
            },
            enabled: () => !0
          })),
          { type: "separator" },
          {
            id: "go-to-folder",
            label: n("Go to Folder"),
            action: () => e?.modal?.open(Eu),
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
            action: () => e?.modal?.open(uu),
            enabled: () => !0
          },
          {
            id: "about",
            label: n("About"),
            action: () => e?.modal?.open(Gn),
            enabled: () => !0
          }
        ]
      }
    ]), x = (v) => {
      f.value === v ? y() : (f.value = v, g.value = !0);
    }, $ = (v) => {
      g.value && (f.value = v);
    }, y = () => {
      f.value = null, g.value = !1;
    }, m = (v) => {
      y(), v();
    }, w = (v) => {
      v.target.closest(".vuefinder__menubar") || y();
    };
    return ye(() => {
      document.addEventListener("click", w);
    }), Te(() => {
      document.removeEventListener("click", w);
    }), (v, S) => (u(), _("div", {
      class: "vuefinder__menubar",
      onClick: S[0] || (S[0] = fe(() => {
      }, ["stop"]))
    }, [
      o("div", Pu, [
        (u(!0), _(ve, null, he(p.value, (C) => (u(), _("div", {
          key: C.id,
          class: te(["vuefinder__menubar__item", { "vuefinder__menubar__item--active": f.value === C.id }]),
          onClick: (E) => x(C.id),
          onMouseenter: (E) => $(C.id)
        }, [
          o("span", Du, k(C.label), 1),
          f.value === C.id ? (u(), _("div", {
            key: 0,
            class: "vuefinder__menubar__dropdown",
            onMouseenter: (E) => $(C.id)
          }, [
            (u(!0), _(ve, null, he(C.items, (E) => (u(), _("div", {
              key: E.id || E.type,
              class: te(["vuefinder__menubar__dropdown__item", {
                "vuefinder__menubar__dropdown__item--separator": E.type === "separator",
                "vuefinder__menubar__dropdown__item--disabled": E.enabled && !E.enabled(),
                "vuefinder__menubar__dropdown__item--checked": E.checked && E.checked(),
                "vuefinder__menubar__dropdown__item--hidden": E.hidden && E.hidden(),
                "vuefinder__menubar__dropdown__item--has-children": E.items?.length
              }]),
              onClick: fe((P) => E.type !== "separator" && !E.items?.length && (!E.enabled || E.enabled()) ? m(E.action) : null, ["stop"])
            }, [
              E.type !== "separator" ? (u(), _("span", Au, k(E.label), 1)) : z("", !0),
              E.checked && E.checked() ? (u(), _("span", Ou, " ✓ ")) : z("", !0),
              E.items?.length ? (u(), _("svg", Lu, [...S[1] || (S[1] = [
                o("path", { d: "M6 4l4 4-4 4z" }, null, -1)
              ])])) : z("", !0),
              E.items?.length ? (u(), _("div", Ru, [
                (u(!0), _(ve, null, he(E.items, (P) => (u(), _("div", {
                  key: P.id,
                  class: te(["vuefinder__menubar__dropdown__item", {
                    "vuefinder__menubar__dropdown__item--disabled": P.enabled && !P.enabled()
                  }]),
                  onClick: fe((B) => !P.enabled || P.enabled() ? m(P.action) : null, ["stop"])
                }, [
                  o("span", zu, k(P.label), 1)
                ], 10, Bu))), 128))
              ])) : z("", !0)
            ], 10, Iu))), 128))
          ], 40, Mu)) : z("", !0)
        ], 42, Tu))), 128))
      ])
    ]));
  }
}), Uu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  viewBox: "0 0 24 24"
};
function Nu(s, e) {
  return u(), _("svg", Uu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ])]);
}
const Hu = { render: Nu }, ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ku(s, e) {
  return u(), _("svg", ju, [...e[0] || (e[0] = [
    o("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ])]);
}
const qu = { render: Ku }, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Gu(s, e) {
  return u(), _("svg", Wu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ])]);
}
const Yu = { render: Gu }, Xu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Qu(s, e) {
  return u(), _("svg", Xu, [...e[0] || (e[0] = [
    o("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ])]);
}
const Ju = { render: Qu }, Zu = {
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ev(s, e) {
  return u(), _("svg", Zu, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "1.5",
      d: "M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 4v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586z"
    }, null, -1)
  ])]);
}
const tv = { render: ev }, nv = { class: "vuefinder__toolbar" }, ov = { class: "vuefinder__toolbar__actions" }, sv = ["title"], av = ["title"], iv = ["title"], lv = ["title"], rv = ["title"], dv = ["title"], cv = ["title"], uv = { class: "vuefinder__toolbar__controls" }, vv = ["title"], fv = { class: "vuefinder__toolbar__control vuefinder__toolbar__dropdown-container" }, _v = ["title"], pv = { class: "relative" }, mv = {
  key: 0,
  class: "vuefinder__toolbar__filter-indicator"
}, hv = {
  key: 0,
  class: "vuefinder__toolbar__dropdown"
}, gv = { class: "vuefinder__toolbar__dropdown-content" }, yv = { class: "vuefinder__toolbar__dropdown-section" }, wv = { class: "vuefinder__toolbar__dropdown-label" }, bv = { class: "vuefinder__toolbar__dropdown-row" }, kv = { value: "name" }, $v = { value: "size" }, xv = { value: "modified" }, Sv = { value: "" }, Cv = { value: "asc" }, Fv = { value: "desc" }, Ev = { class: "vuefinder__toolbar__dropdown-section" }, Pv = { class: "vuefinder__toolbar__dropdown-label" }, Tv = { class: "vuefinder__toolbar__dropdown-options" }, Dv = { class: "vuefinder__toolbar__dropdown-option" }, Mv = { class: "vuefinder__toolbar__option-text" }, Iv = { class: "vuefinder__toolbar__dropdown-option" }, Av = { class: "vuefinder__toolbar__option-text" }, Ov = { class: "vuefinder__toolbar__dropdown-option" }, Lv = { class: "vuefinder__toolbar__option-text" }, Rv = { class: "vuefinder__toolbar__dropdown-toggle" }, Bv = {
  for: "showHidden",
  class: "vuefinder__toolbar__toggle-label"
}, zv = { class: "vuefinder__toolbar__dropdown-reset" }, Vv = ["title"], Uv = ["title"], Nv = /* @__PURE__ */ re({
  name: "VfToolbar",
  __name: "Toolbar",
  setup(s) {
    const e = ie(), { enabled: t } = Ve(), { t: n } = e.i18n, i = e.fs, d = e.config, r = oe(d.state), l = oe(i.selectedItems), c = oe(i.sort), f = oe(i.filter);
    pe(
      () => r.value.fullScreen,
      () => {
        const m = document.querySelector("body");
        m && (m.style.overflow = r.value.fullScreen ? "hidden" : "");
      },
      { immediate: !0 }
    );
    const g = T(!1), h = (m) => {
      m.target.closest(".vuefinder__toolbar__dropdown-container") || (g.value = !1);
    };
    ye(() => {
      const m = document.querySelector("body");
      m && r.value.fullScreen && setTimeout(() => m.style.overflow = "hidden"), document.addEventListener("click", h);
    }), Te(() => {
      document.removeEventListener("click", h);
    });
    const p = T({
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
      () => p.value.sortBy,
      (m) => {
        if (!p.value.sortOrder) {
          i.clearSort();
          return;
        }
        m === "name" ? i.setSort("basename", p.value.sortOrder) : m === "size" ? i.setSort("file_size", p.value.sortOrder) : m === "modified" && i.setSort("last_modified", p.value.sortOrder);
      }
    ), pe(
      () => p.value.sortOrder,
      (m) => {
        if (!m) {
          i.clearSort();
          return;
        }
        p.value.sortBy === "name" ? i.setSort("basename", m) : p.value.sortBy === "size" ? i.setSort("file_size", m) : p.value.sortBy === "modified" && i.setSort("last_modified", m);
      }
    ), pe(
      c,
      (m) => {
        m.active ? (m.column === "basename" ? p.value.sortBy = "name" : m.column === "file_size" ? p.value.sortBy = "size" : m.column === "last_modified" && (p.value.sortBy = "modified"), p.value.sortOrder = m.order) : p.value.sortOrder = "";
      },
      { immediate: !0 }
    ), pe(
      () => p.value.filterKind,
      (m) => {
        i.setFilter(m, r.value.showHiddenFiles);
      }
    ), pe(
      () => p.value.showHidden,
      (m) => {
        d.set("showHiddenFiles", m), i.setFilter(p.value.filterKind, m);
      }
    ), pe(
      f,
      (m) => {
        p.value.filterKind = m.kind;
      },
      { immediate: !0 }
    ), pe(
      () => r.value.showHiddenFiles,
      (m) => {
        p.value.showHidden = m, i.setFilter(p.value.filterKind, m);
      },
      { immediate: !0 }
    );
    const x = () => d.set("view", r.value.view === "grid" ? "list" : "grid"), $ = R(() => f.value.kind !== "all" || !r.value.showHiddenFiles || c.value.active), y = () => {
      p.value = {
        sortBy: "name",
        sortOrder: "",
        // No sorting by default
        filterKind: "all",
        showHidden: !0
        // Reset to default value
      }, d.set("showHiddenFiles", !0), i.clearSort(), i.clearFilter();
    };
    return (m, w) => (u(), _("div", nv, [
      o("div", ov, [
        a(t)("newfolder") ? (u(), _("div", {
          key: 0,
          class: "mx-1.5",
          title: a(n)("New Folder"),
          onClick: w[0] || (w[0] = (v) => a(e).modal.open(un, { items: a(l) }))
        }, [
          G(a(lo))
        ], 8, sv)) : z("", !0),
        a(t)("newfile") ? (u(), _("div", {
          key: 1,
          class: "mx-1.5",
          title: a(n)("New File"),
          onClick: w[1] || (w[1] = (v) => a(e).modal.open(co, { items: a(l) }))
        }, [
          G(a(ro))
        ], 8, av)) : z("", !0),
        a(t)("rename") ? (u(), _("div", {
          key: 2,
          class: "mx-1.5",
          title: a(n)("Rename"),
          onClick: w[2] || (w[2] = (v) => a(l).length !== 1 || a(e).modal.open(Dt, { items: a(l) }))
        }, [
          G(a(Xn), {
            class: te(a(l).length === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, iv)) : z("", !0),
        a(t)("delete") ? (u(), _("div", {
          key: 3,
          class: "mx-1.5",
          title: a(n)("Delete"),
          onClick: w[3] || (w[3] = (v) => !a(l).length || a(e).modal.open(Tt, { items: a(l) }))
        }, [
          G(a(Yn), {
            class: te(a(l).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, lv)) : z("", !0),
        a(t)("upload") ? (u(), _("div", {
          key: 4,
          class: "mx-1.5",
          title: a(n)("Upload"),
          onClick: w[4] || (w[4] = (v) => a(e).modal.open(Rt, { items: a(l) }))
        }, [
          G(a(vn))
        ], 8, rv)) : z("", !0),
        a(t)("unarchive") && a(l).length === 1 && a(l)[0].mime_type === "application/zip" ? (u(), _("div", {
          key: 5,
          class: "mx-1.5",
          title: a(n)("Unarchive"),
          onClick: w[5] || (w[5] = (v) => !a(l).length || a(e).modal.open(fn, { items: a(l) }))
        }, [
          G(a(uo), {
            class: te(a(l).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, dv)) : z("", !0),
        a(t)("archive") ? (u(), _("div", {
          key: 6,
          class: "mx-1.5",
          title: a(n)("Archive"),
          onClick: w[6] || (w[6] = (v) => !a(l).length || a(e).modal.open(_n, { items: a(l) }))
        }, [
          G(a(vo), {
            class: te(a(l).length ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, cv)) : z("", !0)
      ]),
      o("div", uv, [
        a(t)("search") ? (u(), _("div", {
          key: 0,
          class: "mx-1.5",
          title: a(n)("Search Files"),
          onClick: w[7] || (w[7] = (v) => a(e).modal.open(cn))
        }, [
          G(a(dn), { class: "vf-toolbar-icon text-(--vf-bg-primary)" })
        ], 8, vv)) : z("", !0),
        o("div", fv, [
          o("div", {
            title: a(n)("Filter"),
            class: "vuefinder__toolbar__dropdown-trigger",
            onClick: w[8] || (w[8] = (v) => g.value = !g.value)
          }, [
            o("div", pv, [
              G(a(tv), { class: "vf-toolbar-icon vuefinder__toolbar__icon h-6 w-6" }),
              $.value ? (u(), _("div", mv)) : z("", !0)
            ])
          ], 8, _v),
          g.value ? (u(), _("div", hv, [
            o("div", gv, [
              o("div", yv, [
                o("div", wv, k(a(n)("Sorting")), 1),
                o("div", bv, [
                  me(o("select", {
                    "onUpdate:modelValue": w[9] || (w[9] = (v) => p.value.sortBy = v),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", kv, k(a(n)("Name")), 1),
                    o("option", $v, k(a(n)("Size")), 1),
                    o("option", xv, k(a(n)("Date")), 1)
                  ], 512), [
                    [qt, p.value.sortBy]
                  ]),
                  me(o("select", {
                    "onUpdate:modelValue": w[10] || (w[10] = (v) => p.value.sortOrder = v),
                    class: "vuefinder__toolbar__dropdown-select"
                  }, [
                    o("option", Sv, k(a(n)("None")), 1),
                    o("option", Cv, k(a(n)("Asc")), 1),
                    o("option", Fv, k(a(n)("Desc")), 1)
                  ], 512), [
                    [qt, p.value.sortOrder]
                  ])
                ])
              ]),
              o("div", Ev, [
                o("div", Pv, k(a(n)("Show")), 1),
                o("div", Tv, [
                  o("label", Dv, [
                    me(o("input", {
                      "onUpdate:modelValue": w[11] || (w[11] = (v) => p.value.filterKind = v),
                      type: "radio",
                      name: "filterKind",
                      value: "all",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Vt, p.value.filterKind]
                    ]),
                    o("span", Mv, k(a(n)("All items")), 1)
                  ]),
                  o("label", Iv, [
                    me(o("input", {
                      "onUpdate:modelValue": w[12] || (w[12] = (v) => p.value.filterKind = v),
                      type: "radio",
                      name: "filterKind",
                      value: "files",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Vt, p.value.filterKind]
                    ]),
                    o("span", Av, k(a(n)("Files only")), 1)
                  ]),
                  o("label", Ov, [
                    me(o("input", {
                      "onUpdate:modelValue": w[13] || (w[13] = (v) => p.value.filterKind = v),
                      type: "radio",
                      name: "filterKind",
                      value: "folders",
                      class: "vuefinder__toolbar__radio"
                    }, null, 512), [
                      [Vt, p.value.filterKind]
                    ]),
                    o("span", Lv, k(a(n)("Folders only")), 1)
                  ])
                ])
              ]),
              o("div", Rv, [
                o("label", Bv, k(a(n)("Show hidden files")), 1),
                me(o("input", {
                  id: "showHidden",
                  "onUpdate:modelValue": w[14] || (w[14] = (v) => p.value.showHidden = v),
                  type: "checkbox",
                  class: "vuefinder__toolbar__checkbox"
                }, null, 512), [
                  [lt, p.value.showHidden]
                ])
              ]),
              o("div", zv, [
                o("button", {
                  class: "vuefinder__toolbar__reset-button",
                  onClick: y
                }, k(a(n)("Reset")), 1)
              ])
            ])
          ])) : z("", !0)
        ]),
        a(t)("fullscreen") ? (u(), _("div", {
          key: 1,
          class: "mx-1.5",
          title: a(n)("Toggle Full Screen"),
          onClick: w[15] || (w[15] = (v) => a(d).toggle("fullScreen"))
        }, [
          a(r).fullScreen ? (u(), X(a(qu), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : (u(), X(a(Hu), {
            key: 1,
            class: "vf-toolbar-icon"
          }))
        ], 8, Vv)) : z("", !0),
        o("div", {
          class: "mx-1.5",
          title: a(n)("Change View"),
          onClick: w[16] || (w[16] = (v) => x())
        }, [
          a(r).view === "grid" ? (u(), X(a(Yu), {
            key: 0,
            class: "vf-toolbar-icon"
          })) : z("", !0),
          a(r).view === "list" ? (u(), X(a(Ju), {
            key: 1,
            class: "vf-toolbar-icon"
          })) : z("", !0)
        ], 8, Uv)
      ])
    ]));
  }
}), Hv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "vuefinder__breadcrumb__refresh-icon",
  viewBox: "-40 -40 580 580"
};
function jv(s, e) {
  return u(), _("svg", Hv, [...e[0] || (e[0] = [
    o("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ])]);
}
const Kv = { render: jv }, qv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 20 20"
};
function Wv(s, e) {
  return u(), _("svg", qv, [...e[0] || (e[0] = [
    o("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ])]);
}
const Gv = { render: Wv }, Yv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Xv(s, e) {
  return u(), _("svg", Yv, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ])]);
}
const Qv = { render: Xv }, Jv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Zv(s, e) {
  return u(), _("svg", Jv, [...e[0] || (e[0] = [
    o("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ])]);
}
const ef = { render: Zv }, tf = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function nf(s, e) {
  return u(), _("svg", tf, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
    }, null, -1)
  ])]);
}
const of = { render: nf };
function $t(s, e = []) {
  const t = "vfDragEnterCounter", n = s.fs, i = oe(n.selectedItems);
  function d(h, p) {
    return !!(!h || h.type !== "dir" || h.path === p || h.path.startsWith(`${p}/`) || i.value.some(($) => $.path === p ? !1 : !!(h.path === $.path || h.path.startsWith(`${$.path}/`))));
  }
  function r(h, p) {
    if (h.isExternalDrag)
      return;
    if (!(s.features?.move ?? !1)) {
      h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none");
      return;
    }
    h.preventDefault();
    const $ = n.getDraggedItem(), y = n.sortedFiles.get().find((m) => ke(m) === $)?.path ?? "";
    d(p, y) ? h.dataTransfer && (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : (h.dataTransfer && (h.dataTransfer.dropEffect = "copy", h.dataTransfer.effectAllowed = "all"), h.currentTarget.classList.add(...e));
  }
  function l(h) {
    if (h.isExternalDrag || !(s.features?.move ?? !1))
      return;
    h.preventDefault();
    const x = h.currentTarget, $ = Number(x.dataset[t] || 0);
    x.dataset[t] = String($ + 1);
  }
  function c(h) {
    if (h.isExternalDrag || !(s.features?.move ?? !1))
      return;
    h.preventDefault();
    const x = h.currentTarget, y = Number(x.dataset[t] || 0) - 1;
    y <= 0 ? (delete x.dataset[t], x.classList.remove(...e)) : x.dataset[t] = String(y);
  }
  function f(h, p) {
    if (h.isExternalDrag || !(s.features?.move ?? !1) || !p) return;
    h.preventDefault();
    const $ = h.currentTarget;
    delete $.dataset[t], $.classList.remove(...e);
    const y = h.dataTransfer?.getData("items") || "[]", w = JSON.parse(y).map((v) => n.sortedFiles.get().find((S) => ke(S) === v)).filter((v) => !!v);
    n.clearDraggedItem(), s.modal.open(it, { items: { from: w, to: p } });
  }
  function g(h) {
    return {
      dragover: (p) => r(p, h),
      dragenter: l,
      dragleave: c,
      drop: (p) => f(p, h)
    };
  }
  return { events: g };
}
const sf = { class: "vuefinder__breadcrumb__container" }, af = ["title"], lf = ["title"], rf = ["title"], df = ["title"], cf = { class: "vuefinder__breadcrumb__path-container" }, uf = { class: "vuefinder__breadcrumb__list" }, vf = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, ff = { class: "relative" }, _f = ["title", "onClick"], pf = ["title"], mf = { class: "vuefinder__breadcrumb__path-mode" }, hf = { class: "vuefinder__breadcrumb__path-mode-content" }, gf = ["title"], yf = { class: "vuefinder__breadcrumb__path-text" }, wf = ["title"], bf = ["data-theme"], kf = ["onClick"], $f = { class: "vuefinder__breadcrumb__hidden-item-content" }, xf = { class: "vuefinder__breadcrumb__hidden-item-text" }, ct = 5, Dn = 1, Sf = 40, Cf = /* @__PURE__ */ re({
  __name: "Breadcrumb",
  setup(s) {
    const e = ie(), t = Be(e), { t: n } = e.i18n, i = e.fs, d = e.config, r = oe(d.state), l = oe(i.path), c = oe(i.loading), f = T(null), g = no(0, 100), h = T(5), p = T(!1), x = T(!1), $ = R(() => l.value?.breadcrumb ?? []), y = /* @__PURE__ */ new Map();
    function m(I, W) {
      return I.length > W ? [I.slice(-W), I.slice(0, -W)] : [I, []];
    }
    const w = R(
      () => m($.value, h.value)[0]
    ), v = R(
      () => m($.value, h.value)[1]
    );
    function S() {
      const I = $.value, W = g.value;
      if (!I.length || W <= 0) return null;
      let A = 0, U = 0;
      for (let H = I.length - 1; H >= 0; H--) {
        const D = I[H]?.name;
        if (!D) continue;
        const V = y.get(D);
        if (V === void 0) return null;
        if (A + V > W - Sf || (A += V, U++, U >= ct)) break;
      }
      return U < Dn && (U = Dn), U > ct && (U = ct), U;
    }
    function C() {
      if (!f.value) return;
      const I = f.value.children, W = w.value;
      for (let A = 0; A < I.length; A++) {
        const U = W[A]?.name;
        if (!U) continue;
        const H = I[A].offsetWidth;
        H > 0 && y.set(U, H);
      }
    }
    async function E() {
      if (!$.value.length) {
        h.value = ct;
        return;
      }
      const I = S();
      if (I !== null) {
        h.value = I;
        return;
      }
      h.value = ct, await De(), C();
      const W = S();
      W !== null && (h.value = W);
    }
    pe(g, E), pe($, E, { immediate: !0 });
    const P = () => {
      f.value && (g.value = f.value.offsetWidth);
    }, B = T(null);
    ye(() => {
      B.value = new ResizeObserver(P), f.value && B.value.observe(f.value);
    }), Te(() => {
      B.value && B.value.disconnect();
    });
    const K = $t(e, ["vuefinder__drag-over"]);
    function Z(I = null) {
      I ??= $.value.length - 2;
      const W = {
        basename: l.value?.storage ?? "local",
        extension: "",
        path: (l.value?.storage ?? "local") + "://",
        storage: l.value?.storage ?? "local",
        type: "dir",
        file_size: null,
        last_modified: null,
        mime_type: null,
        visibility: ""
      };
      return $.value[I] ?? W;
    }
    const ee = () => {
      e.adapter.invalidateListQuery(l.value.path), e.adapter.open(l.value.path);
    }, Q = () => {
      w.value.length > 0 && e.adapter.open(
        $.value[$.value.length - 2]?.path ?? (l.value?.storage ?? "local") + "://"
      );
    }, Y = (I) => {
      e.adapter.open(I.path), p.value = !1;
    }, b = () => {
      p.value && (p.value = !1);
    }, F = {
      mounted(I, W) {
        I.clickOutsideEvent = function(A) {
          I === A.target || I.contains(A.target) || W.value();
        }, document.body.addEventListener("click", I.clickOutsideEvent);
      },
      beforeUnmount(I) {
        document.body.removeEventListener("click", I.clickOutsideEvent);
      }
    }, M = () => {
      d.toggle("showTreeView");
    }, j = T({
      x: 0,
      y: 0
    }), le = (I, W = null) => {
      if (I.currentTarget instanceof HTMLElement) {
        const { x: A, y: U, height: H } = I.currentTarget.getBoundingClientRect();
        j.value = { x: A, y: U + H };
      }
      p.value = W ?? !p.value;
    }, L = () => {
      x.value = !x.value;
    }, O = async () => {
      await yt(l.value?.path || ""), t.success(n("Path copied to clipboard"));
    }, N = () => {
      x.value = !1;
    };
    return (I, W) => (u(), _("div", sf, [
      o("span", {
        title: a(n)("Toggle Tree View")
      }, [
        G(a(ef), {
          class: te(["vuefinder__breadcrumb__toggle-tree", a(r).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""]),
          onClick: M
        }, null, 8, ["class"])
      ], 8, af),
      o("span", {
        title: a(n)("Go up a directory")
      }, [
        G(a(fo), je({
          class: $.value.length ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive"
        }, Qe($.value.length ? a(K).events(Z()) : {}), { onClick: Q }), null, 16, ["class"])
      ], 8, lf),
      a(i).isLoading() ? (u(), _("span", {
        key: 1,
        title: a(n)("Cancel")
      }, [
        G(a(Qn), {
          onClick: W[0] || (W[0] = (A) => a(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, df)) : (u(), _("span", {
        key: 0,
        title: a(n)("Refresh")
      }, [
        G(a(Kv), { onClick: ee })
      ], 8, rf)),
      me(o("div", cf, [
        o("div", null, [
          G(a(Gv), je({ class: "vuefinder__breadcrumb__home-icon" }, Qe(a(K).events(Z(-1))), {
            onClick: W[1] || (W[1] = fe((A) => a(e).adapter.open(a(l).storage + "://"), ["stop"]))
          }), null, 16)
        ]),
        o("div", uf, [
          v.value.length ? me((u(), _("div", vf, [
            W[3] || (W[3] = o("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("div", ff, [
              o("span", {
                class: "vuefinder__breadcrumb__hidden-toggle",
                onDragenter: W[2] || (W[2] = (A) => le(A, !0)),
                onClick: fe(le, ["stop"])
              }, [
                G(a(ao), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [F, b]
          ]) : z("", !0)
        ]),
        o("div", {
          ref_key: "breadcrumbContainer",
          ref: f,
          class: "vuefinder__breadcrumb__visible-list pointer-events-none"
        }, [
          (u(!0), _(ve, null, he(w.value, (A, U) => (u(), _("div", { key: U }, [
            W[4] || (W[4] = o("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            o("span", je({
              class: "vuefinder__breadcrumb__item pointer-events-auto",
              title: A.basename
            }, Qe(a(K).events(A), !0), {
              onClick: fe((H) => a(e).adapter.open(A.path), ["stop"])
            }), k(A.name), 17, _f)
          ]))), 128))
        ], 512),
        a(d).get("loadingIndicator") === "circular" && a(c) ? (u(), X(a(Ot), { key: 0 })) : z("", !0),
        o("span", {
          title: a(n)("Toggle Path Copy Mode"),
          onClick: L
        }, [
          G(a(of), { class: "vuefinder__breadcrumb__toggle-icon" })
        ], 8, pf)
      ], 512), [
        [qe, !x.value]
      ]),
      me(o("div", mf, [
        o("div", hf, [
          o("div", {
            title: a(n)("Copy Path")
          }, [
            G(a(an), {
              class: "vuefinder__breadcrumb__copy-icon",
              onClick: O
            })
          ], 8, gf),
          o("div", yf, k(a(l).path), 1),
          o("div", {
            title: a(n)("Exit")
          }, [
            G(a(Qv), {
              class: "vuefinder__breadcrumb__exit-icon",
              onClick: N
            })
          ], 8, wf)
        ])
      ], 512), [
        [qe, x.value]
      ]),
      (u(), X(bt, { to: "body" }, [
        o("div", null, [
          me(o("div", {
            style: Pe({
              position: "absolute",
              top: j.value.y + "px",
              left: j.value.x + "px"
            }),
            class: "vuefinder__themer vuefinder__breadcrumb__hidden-dropdown",
            "data-theme": a(e).theme.current
          }, [
            (u(!0), _(ve, null, he(v.value, (A, U) => (u(), _("div", je({
              key: U,
              class: "vuefinder__breadcrumb__hidden-item"
            }, Qe(a(K).events(A), !0), {
              onClick: (H) => Y(A)
            }), [
              o("div", $f, [
                o("span", null, [
                  G(a(Re), { class: "vuefinder__breadcrumb__hidden-item-icon" })
                ]),
                o("span", xf, k(A.name), 1)
              ])
            ], 16, kf))), 128))
          ], 12, bf), [
            [qe, p.value]
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
function Ef(s, e) {
  return u(), _("svg", Ff, [...e[0] || (e[0] = [
    o("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ])]);
}
const Mn = { render: Ef }, Pf = { class: "vuefinder__drag-item__container" }, Tf = { class: "vuefinder__drag-item__count" }, Df = /* @__PURE__ */ re({
  __name: "DragItem",
  props: {
    count: {}
  },
  setup(s) {
    const e = s;
    return (t, n) => (u(), _("div", Pf, [
      e.count > 1 ? (u(), X(a(Mn), {
        key: 0,
        class: "vuefinder__drag-item__icon translate-x-1 translate-y-1"
      })) : z("", !0),
      G(a(Mn), { class: "vuefinder__drag-item__icon" }),
      o("div", Tf, k(e.count), 1)
    ]));
  }
}), Mf = {
  key: 2,
  class: "vuefinder__item-icon__extension"
}, In = /* @__PURE__ */ re({
  __name: "ItemIcon",
  props: {
    item: {},
    ext: { type: Boolean },
    small: { type: Boolean },
    view: {}
  },
  setup(s) {
    const e = s, t = ie(), n = oe(t.config.state), i = R(() => e.small !== void 0 ? e.small ? "small" : "large" : e.view === "list" ? "small" : "large"), d = R(() => {
      const l = i.value, c = n.value?.listIconSize, f = n.value?.gridIconSize;
      return n.value?.gridItemWidth, n.value?.gridItemHeight, e.view === "list" || l === "small" ? {
        "--vf-icon-size": `${c ?? 16}px`
      } : {
        "--vf-icon-size": `${f ?? 48}px`
      };
    }), r = {
      app: t,
      config: n.value,
      item: e.item,
      view: e.view
    };
    return (l, c) => (u(), _("div", {
      class: te(["vuefinder__item-icon", {
        "vuefinder__item-icon--small": i.value === "small",
        "vuefinder__item-icon--large": i.value === "large",
        "vuefinder__item-icon--grid": s.view === "grid",
        "vuefinder__item-icon--list": s.view === "list"
      }]),
      style: Pe(d.value)
    }, [
      Me(l.$slots, "icon", Je(Ze(r)), () => [
        s.item.type === "dir" ? (u(), X(a(Re), {
          key: 0,
          class: "vuefinder__item-icon__folder"
        })) : (u(), X(a(ht), {
          key: 1,
          class: "vuefinder__item-icon__file"
        })),
        s.ext && s.item.type !== "dir" && s.item.extension ? (u(), _("div", Mf, k(s.item.extension.substring(0, 3)), 1)) : z("", !0)
      ])
    ], 6));
  }
}), If = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  viewBox: "0 0 24 24"
};
function Af(s, e) {
  return u(), _("svg", If, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3" }, null, -1)
  ])]);
}
const An = { render: Af }, Of = ["data-key", "data-row", "data-col", "draggable"], Lf = { key: 0 }, Rf = { class: "vuefinder__explorer__item-grid-content" }, Bf = ["data-src", "alt"], zf = { class: "vuefinder__explorer__item-title" }, Vf = {
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
  setup(s, { emit: e }) {
    const t = s, n = e, i = ie(), d = i.fs, r = i.config, l = R(() => {
      const Y = i.selectionFilterType;
      return !Y || Y === "both" ? !0 : Y === "files" && t.item.type === "file" || Y === "dirs" && t.item.type === "dir";
    }), c = R(() => {
      const Y = i.selectionFilterMimeIncludes;
      return !Y || !Y.length || t.item.type === "dir" ? !0 : t.item.mime_type ? Y.some((b) => t.item.mime_type?.startsWith(b)) : !1;
    }), f = R(() => l.value && c.value), g = R(() => t.item.type === "dir" || f.value), h = R(() => [
      "file-item-" + t.explorerId,
      t.view === "grid" ? "vf-explorer-item-grid" : "vf-explorer-item-list",
      t.isSelected ? "vf-explorer-selected" : "",
      // Disabled appearance: only for items the user cannot interact with at all.
      g.value ? "" : "vf-explorer-item--unselectable",
      // Excluded from rectangle selection but otherwise interactive (e.g. a
      // folder while selectionFilterType is 'files' — user can still navigate).
      g.value && !f.value ? "vf-explorer-item--no-select" : ""
    ]), p = R(() => ({
      opacity: t.isDragging || d.isCut(ke(t.item)) || !g.value ? 0.5 : ""
    })), x = T(null);
    let $ = !1, y = null, m = null, w = !1;
    const { enabled: v } = Ve(), S = typeof window < "u" && ("ontouchstart" in window || navigator.maxTouchPoints > 0), C = R(() => S ? !1 : v("move")), E = () => {
      y && (clearTimeout(y), y = null), m = null;
    }, P = (Y) => {
      E(), m = Y, w = !1, Y.stopPropagation(), y = setTimeout(() => {
        !m || y === null || (w = !0, m.cancelable && m.preventDefault(), m.stopPropagation(), n("contextmenu", m), E());
      }, 500);
    }, B = (Y) => {
      if (w) {
        Y.preventDefault(), Y.stopPropagation(), E();
        return;
      }
      setTimeout(() => {
        w || (E(), Q(Y));
      }, 100);
    }, K = (Y) => {
      if (!m) return;
      const b = m.touches[0] || m.changedTouches[0], F = Y.touches[0] || Y.changedTouches[0];
      if (b && F) {
        const M = Math.abs(F.clientX - b.clientX), j = Math.abs(F.clientY - b.clientY);
        (M > 15 || j > 15) && E();
      }
    }, Z = (Y) => {
      S && Y.type !== "click" || n("click", Y);
    }, ee = (Y) => {
      if (w)
        return Y.preventDefault(), Y.stopPropagation(), !1;
      n("dragstart", Y);
    }, Q = (Y) => {
      if (!$)
        $ = !0, n("click", Y), x.value = setTimeout(() => {
          $ = !1;
        }, 300);
      else
        return $ = !1, n("dblclick", Y), !1;
    };
    return (Y, b) => (u(), _("div", {
      class: te(h.value),
      style: Pe(p.value),
      "data-key": a(ke)(s.item),
      "data-row": s.rowIndex,
      "data-col": s.colIndex,
      draggable: C.value,
      onTouchstartCapture: b[1] || (b[1] = (F) => P(F)),
      onTouchendCapture: b[2] || (b[2] = (F) => B(F)),
      onTouchmoveCapture: K,
      onTouchcancelCapture: b[3] || (b[3] = () => E()),
      onClick: Z,
      onDblclick: b[4] || (b[4] = (F) => n("dblclick", F)),
      onContextmenu: b[5] || (b[5] = fe((F) => n("contextmenu", F), ["prevent", "stop"])),
      onDragstart: ee,
      onDragend: b[6] || (b[6] = (F) => n("dragend", F))
    }, [
      s.view === "grid" ? (u(), _("div", Lf, [
        a(d).isReadOnly(s.item) ? (u(), X(a(An), {
          key: 0,
          class: "vuefinder__item--readonly vuefinder__item--readonly--left",
          title: "Read Only"
        })) : z("", !0),
        o("div", Rf, [
          (s.item.mime_type ?? "").startsWith("image") && s.showThumbnails ? (u(), _("img", {
            key: 0,
            src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            class: "vuefinder__explorer__item-thumbnail lazy",
            "data-src": s.item.previewUrl ?? a(i).adapter.getPreviewUrl({ path: s.item.path }),
            alt: s.item.basename,
            onTouchstart: b[0] || (b[0] = (F) => F.preventDefault())
          }, null, 40, Bf)) : (u(), X(In, {
            key: 1,
            item: s.item,
            ext: !0,
            view: s.view
          }, {
            icon: ce((F) => [
              Me(Y.$slots, "icon", Je(Ze(F)))
            ]),
            _: 3
          }, 8, ["item", "view"]))
        ]),
        o("span", zf, k(a(Xt)(s.item.basename)), 1)
      ])) : (u(), _("div", Vf, [
        o("div", Uf, [
          o("div", Nf, [
            G(In, {
              item: s.item,
              view: s.view
            }, {
              icon: ce((F) => [
                Me(Y.$slots, "icon", Je(Ze(F)))
              ]),
              _: 3
            }, 8, ["item", "view"])
          ]),
          o("span", Hf, k(s.item.basename), 1),
          o("div", null, [
            a(d).isReadOnly(s.item) ? (u(), X(a(An), {
              key: 0,
              class: "vuefinder__item--readonly vuefinder__item--readonly--list",
              title: "Read Only"
            })) : z("", !0)
          ])
        ]),
        s.showPath ? (u(), _("div", jf, k(s.item.path), 1)) : z("", !0),
        s.showPath ? z("", !0) : (u(), _("div", Kf, [
          s.item.file_size ? (u(), _("div", qf, k(a(i).filesize(s.item.file_size)), 1)) : z("", !0)
        ])),
        !s.showPath && s.item.last_modified ? (u(), _("div", Wf, k(new Date(s.item.last_modified * 1e3).toLocaleString()), 1)) : z("", !0)
      ])),
      a(v)("pinned") && a(r).get("pinnedFolders").find((F) => F.path === s.item.path) ? (u(), X(a(gt), {
        key: 2,
        class: "vuefinder__item--pinned"
      })) : z("", !0)
    ], 46, Of));
  }
}), Yf = ["data-row"], On = /* @__PURE__ */ re({
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
    const t = s, n = e, i = R(() => [
      t.view === "grid" ? "vf-explorer-item-grid-row" : "vf-explorer-item-list-row",
      "pointer-events-none"
    ]), d = R(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: `${t.rowHeight}px`,
      transform: `translateY(${t.rowIndex * t.rowHeight}px)`
    })), r = R(() => t.view === "grid" ? {
      gridTemplateColumns: `repeat(${t.itemsPerRow || 1}, 1fr)`
    } : {
      gridTemplateColumns: "1fr"
    });
    return (l, c) => (u(), _("div", {
      class: te(i.value),
      "data-row": s.rowIndex,
      style: Pe(d.value)
    }, [
      o("div", {
        class: te(["grid justify-self-start", { "w-full": s.view === "list" }]),
        style: Pe(r.value)
      }, [
        (u(!0), _(ve, null, he(s.items, (f, g) => (u(), X(Gf, je({
          key: a(ke)(f),
          item: f,
          view: s.view,
          "show-thumbnails": s.showThumbnails,
          "show-path": s.showPath,
          "is-selected": s.isSelected(a(ke)(f)),
          "is-dragging": s.isDraggingItem(a(ke)(f)),
          "row-index": s.rowIndex,
          "col-index": g,
          "explorer-id": s.explorerId
        }, Qe(s.dragNDropEvents(f)), {
          onClick: c[0] || (c[0] = (h) => n("click", h)),
          onDblclick: c[1] || (c[1] = (h) => n("dblclick", h)),
          onContextmenu: c[2] || (c[2] = (h) => n("contextmenu", h)),
          onDragstart: c[3] || (c[3] = (h) => n("dragstart", h)),
          onDragend: c[4] || (c[4] = (h) => n("dragend", h))
        }), {
          icon: ce((h) => [
            Me(l.$slots, "icon", je({ ref_for: !0 }, h))
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
function Qf(s, e) {
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
function e_(s, e) {
  return u(), _("svg", Zf, [...e[0] || (e[0] = [
    o("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ])]);
}
const t_ = { render: e_ }, Kt = /* @__PURE__ */ re({
  __name: "SortIcon",
  props: {
    direction: {}
  },
  setup(s) {
    return (e, t) => (u(), _("div", null, [
      s.direction === "asc" ? (u(), X(a(Jf), {
        key: 0,
        class: "vuefinder__explorer__sort-icon"
      })) : z("", !0),
      s.direction === "desc" ? (u(), X(a(t_), {
        key: 1,
        class: "vuefinder__explorer__sort-icon"
      })) : z("", !0)
    ]));
  }
}), n_ = { class: "vuefinder__explorer__header" }, o_ = /* @__PURE__ */ re({
  __name: "ExplorerHeader",
  setup(s) {
    const e = ie(), t = e.fs, { t: n } = e.i18n, i = oe(t.sort);
    return (d, r) => (u(), _("div", n_, [
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button",
        onClick: r[0] || (r[0] = (l) => a(t).toggleSort("basename"))
      }, [
        ge(k(a(n)("Name")) + " ", 1),
        me(G(Kt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [qe, a(i).active && a(i).column === "basename"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button",
        onClick: r[1] || (r[1] = (l) => a(t).toggleSort("file_size"))
      }, [
        ge(k(a(n)("Size")) + " ", 1),
        me(G(Kt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [qe, a(i).active && a(i).column === "file_size"]
        ])
      ]),
      o("div", {
        class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button",
        onClick: r[2] || (r[2] = (l) => a(t).toggleSort("last_modified"))
      }, [
        ge(k(a(n)("Date")) + " ", 1),
        me(G(Kt, {
          direction: a(i).order
        }, null, 8, ["direction"]), [
          [qe, a(i).active && a(i).column === "last_modified"]
        ])
      ])
    ]));
  }
});
function s_(s, e) {
  const {
    scrollContainer: t,
    itemWidth: n = 100,
    rowHeight: i,
    overscan: d = 2,
    containerPadding: r = 48,
    lockItemsPerRow: l
  } = e, c = s, f = () => typeof i == "number" ? i : i.value, g = () => n ? typeof n == "number" ? n : n.value : 100, h = () => r ? typeof r == "number" ? r : r.value : 0, p = T(0), x = T(6), $ = T(600);
  let y = null;
  const m = R(() => Math.ceil(c.value.length / x.value)), w = R(() => m.value * f()), v = R(() => {
    const Q = f(), Y = Math.max(0, Math.floor(p.value / Q) - d), b = Math.min(
      m.value,
      Math.ceil((p.value + $.value) / Q) + d
    );
    return { start: Y, end: b };
  }), S = R(() => {
    const { start: Q, end: Y } = v.value;
    return Array.from({ length: Y - Q }, (b, F) => Q + F);
  }), C = () => $.value, E = () => typeof l == "object" ? l.value : !1, P = () => {
    if (E()) {
      x.value = 1;
      return;
    }
    if (t.value) {
      const Q = h(), Y = t.value.clientWidth - Q, b = g();
      b > 0 && (x.value = Math.max(Math.floor(Y / b), 2));
    }
  }, B = (Q) => {
    const Y = Q.target;
    p.value = Y.scrollTop;
  };
  pe(
    () => c.value.length,
    () => {
      P();
    }
  ), n && typeof n != "number" && pe(n, () => {
    P();
  }), r && typeof r != "number" && pe(r, () => {
    P();
  }), i && typeof i != "number" && pe(i, () => {
  });
  const K = (Q, Y) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const b = Y * x.value;
    return Q.slice(b, b + x.value);
  }, Z = (Q, Y, b, F, M) => {
    if (!Q || !Array.isArray(Q))
      return [];
    const j = [];
    for (let le = Y; le <= b; le++)
      for (let L = F; L <= M; L++) {
        const O = le * x.value + L;
        O < Q.length && Q[O] && j.push(Q[O]);
      }
    return j;
  }, ee = (Q) => ({
    row: Math.floor(Q / x.value),
    col: Q % x.value
  });
  return ye(async () => {
    await De(), t.value && ($.value = t.value.clientHeight || 600), P(), window.addEventListener("resize", () => {
      t.value && ($.value = t.value.clientHeight || 600), P();
    }), t.value && "ResizeObserver" in window && (y = new ResizeObserver((Q) => {
      const Y = Q[0];
      Y && ($.value = Math.round(Y.contentRect.height)), P();
    }), y.observe(t.value));
  }), Te(() => {
    window.removeEventListener("resize", P), y && (y.disconnect(), y = null);
  }), {
    scrollTop: p,
    itemsPerRow: x,
    totalRows: m,
    totalHeight: w,
    visibleRange: v,
    visibleRows: S,
    updateItemsPerRow: P,
    handleScroll: B,
    getRowItems: K,
    getItemsInRange: Z,
    getItemPosition: ee,
    getContainerHeight: C
  };
}
function a_(s) {
  const {
    itemsPerRow: e,
    totalHeight: t,
    getItemsInRange: n,
    getKey: i,
    selectionObject: d,
    rowHeight: r,
    itemWidth: l,
    osInstance: c
  } = s, f = () => typeof l == "number" ? l : l.value, g = Math.floor(Math.random() * 2 ** 32).toString(), h = ie(), p = h.fs, x = oe(p.selectedKeys), $ = oe(p.sortedFiles), y = R(() => {
    const L = /* @__PURE__ */ new Map();
    return $.value && $.value.forEach((O) => {
      L.set(i(O), O);
    }), L;
  }), m = T(/* @__PURE__ */ new Set()), w = T(!1), v = T(!1), S = (L) => L.map((O) => O.getAttribute("data-key")).filter((O) => !!O), C = (L) => {
    L.selection.clearSelection(!0, !0);
  }, E = (L) => {
    if (x.value && x.value.size > 0) {
      const O = document.querySelectorAll(`.file-item-${g}[data-key]`), N = /* @__PURE__ */ new Map();
      O.forEach((W) => {
        const A = W.getAttribute("data-key");
        A && N.set(A, W);
      });
      const I = [];
      x.value.forEach((W) => {
        const A = N.get(W);
        A && P(W) && I.push(A);
      }), I.forEach((W) => {
        L.selection.select(W, !0);
      });
    }
  }, P = (L) => {
    const O = y.value.get(L);
    if (!O) return !1;
    const N = h.selectionFilterType, I = h.selectionFilterMimeIncludes;
    return N === "files" && O.type === "dir" || N === "dirs" && O.type === "file" ? !1 : I && Array.isArray(I) && I.length > 0 ? O.type === "dir" ? !0 : O.mime_type ? I.some((W) => O.mime_type?.startsWith(W)) : !1 : !0;
  }, B = (L) => {
    if (h.selectionMode === "single")
      return !1;
    w.value = !1, !L.event?.metaKey && !L.event?.ctrlKey && (v.value = !0), L.selection.resolveSelectables(), C(L), E(L);
  }, K = T(0), Z = ({ event: L, selection: O }) => {
    K.value = (d.value?.getAreaLocation().y1 ?? 0) - (h.root.getBoundingClientRect().top ?? 0);
    const N = document.querySelector(
      ".selection-area-container"
    );
    if (N && (N.dataset.theme = h.theme.current), h.selectionMode === "single")
      return;
    const I = L;
    I && "type" in I && I.type === "touchend" && I.preventDefault();
    const W = L;
    !W?.ctrlKey && !W?.metaKey && (p.clearSelection(), O.clearSelection(!0, !0)), m.value.clear();
  }, ee = (L) => {
    if (h.selectionMode === "single")
      return;
    const O = S(L.store.changed.added), N = S(L.store.changed.removed);
    v.value = !1, w.value = !0, O.forEach((I) => {
      x.value && !x.value.has(I) && P(I) && (m.value.add(I), p.select(I, h.selectionMode || "multiple"));
    }), N.forEach((I) => {
      document.querySelector(`[data-key="${I}"]`) && y.value.has(I) && m.value.delete(I), p.deselect(I);
    }), L.selection.resolveSelectables(), E(L);
  }, Q = () => {
    m.value.clear();
  }, Y = (L) => {
    if (!L.event)
      return;
    const O = document.querySelector(".scroller-" + g);
    if (!O)
      return;
    const N = O.getBoundingClientRect(), I = N.left, W = N.top;
    let A = O.scrollTop;
    if (c?.value) {
      const { viewport: Ge } = c.value.elements();
      Ge && (A = Ge.scrollTop);
    }
    const U = d.value?.getAreaLocation();
    if (!U)
      return;
    const H = Math.min(U.x1, U.x2), D = A + Math.min(U.y1, U.y2), V = Math.max(U.x1, U.x2), ue = A + Math.max(U.y1, U.y2), be = 4, q = f();
    let ae = Math.floor((H - I - be) / q), _e = Math.floor((V - I - be) / q);
    const we = H - I - be - ae * q, Ie = V - I - be - _e * q;
    we > q - be && (ae = ae + 1), Ie < be && (_e = _e - 1);
    const tt = Math.max(0, ae), J = Math.min(e.value - 1, _e);
    let ne = Math.floor((D - W - be) / r.value), se = Math.floor((ue - W - be) / r.value);
    const de = D - W - be - ne * r.value, Ue = ue - W - be - se * r.value, Ee = Math.floor((t.value - be) / r.value);
    de > r.value - be && (ne = ne + 1), Ue < be && (se = se - 1);
    const Se = Math.max(0, ne), We = Math.min(se, Ee), Ae = n(
      $.value,
      Se,
      We,
      tt,
      J
    ), Bt = document.querySelectorAll(`.file-item-${g}[data-key]`), gn = /* @__PURE__ */ new Map();
    Bt.forEach((Ge) => {
      const rt = Ge.getAttribute("data-key");
      rt && gn.set(rt, Ge);
    });
    const zt = [];
    if (Ae.forEach((Ge) => {
      const rt = i(Ge);
      gn.get(rt) || zt.push(rt);
    }), zt.length > 0) {
      const Ge = h.selectionMode || "multiple";
      p.selectMultiple(zt, Ge);
    }
  }, b = (L) => {
    Y(L), C(L), E(L), p.setSelectedCount(x.value?.size || 0), w.value = !1;
  }, F = () => {
    let L = [".scroller-" + g];
    if (c?.value) {
      const { viewport: O } = c.value.elements();
      O && (L = O);
    }
    d.value = new Io({
      selectables: [
        ".file-item-" + g + ":not(.vf-explorer-item--unselectable):not(.vf-explorer-item--no-select)"
      ],
      boundaries: L,
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
    }), d.value.on("beforestart", B), d.value.on("start", Z), d.value.on("move", ee), d.value.on("stop", b);
  }, M = () => {
    d.value && (d.value.destroy(), d.value = null);
  }, j = () => {
    d.value && (Array.from(
      x.value ?? /* @__PURE__ */ new Set()
    ).forEach((O) => {
      P(O) || p.deselect(O);
    }), M(), F());
  }, le = (L) => {
    v.value && (d.value?.clearSelection(), Q(), v.value = !1);
    const O = L;
    !m.value.size && !v.value && !O?.ctrlKey && !O?.metaKey && (p.clearSelection(), d.value?.clearSelection());
  };
  return ye(() => {
    const L = (O) => {
      !O.buttons && w.value && (w.value = !1);
    };
    document.addEventListener("dragleave", L), Te(() => {
      document.removeEventListener("dragleave", L);
    });
  }), {
    explorerId: g,
    isDragging: w,
    initializeSelectionArea: F,
    updateSelectionArea: j,
    handleContentClick: le
  };
}
function i_(s) {
  const e = (n) => {
    if (!n)
      return { typeAllowed: !1, mimeAllowed: !1 };
    const i = s.selectionFilterType, d = s.selectionFilterMimeIncludes, r = !i || i === "both" || i === "files" && n.type === "file" || i === "dirs" && n.type === "dir";
    let l = !0;
    return d && Array.isArray(d) && d.length > 0 && (n.type === "dir" ? l = !0 : n.mime_type ? l = d.some((c) => n.mime_type.startsWith(c)) : l = !1), { typeAllowed: r, mimeAllowed: l };
  };
  return {
    isItemSelectable: e,
    canSelectItem: (n) => {
      const { typeAllowed: i, mimeAllowed: d } = e(n);
      return i && d;
    }
  };
}
function l_(s) {
  const e = (n) => ({
    item: n,
    defaultPrevented: !1,
    preventDefault() {
      this.defaultPrevented = !0;
    }
  });
  return {
    createCancelableEvent: e,
    openItem: (n, i, d) => {
      const r = e(n);
      if (n.type === "file" && i) {
        if (s.emitter.emit("vf-file-dclick", r), r.defaultPrevented) return;
      } else if (n.type === "dir" && d && (s.emitter.emit("vf-folder-dclick", r), r.defaultPrevented))
        return;
      const l = s.contextMenuItems?.find((c) => c.show(s, {
        items: [n],
        target: n,
        searchQuery: ""
      }));
      l && l.action(s, [n]);
    }
  };
}
function r_(s, e, t, n, i, d, r) {
  const l = s.fs, { canSelectItem: c } = i_(s), { openItem: f } = l_(s), g = (m) => {
    const w = m.target?.closest(".file-item-" + e);
    if (!w) return null;
    const v = String(w.getAttribute("data-key")), S = t.value?.find((C) => ke(C) === v);
    return { key: v, item: S };
  }, h = () => {
    const m = n.value;
    return t.value?.filter((w) => m?.has(ke(w))) || [];
  };
  return {
    handleItemClick: (m) => {
      const w = g(m);
      if (!w) return;
      const { key: v, item: S } = w, C = m;
      if (!c(S)) {
        S?.type === "dir" && (l.clearSelection(), i.value?.clearSelection(!0, !0), l.setSelectedCount(0));
        return;
      }
      const E = s.selectionMode || "multiple";
      !C?.ctrlKey && !C?.metaKey && (m.type !== "touchstart" || !l.isSelected(v)) && (l.clearSelection(), i.value?.clearSelection(!0, !0)), i.value?.resolveSelectables(), m.type === "touchstart" && l.isSelected(v) ? l.select(v, E) : l.toggleSelect(v, E), l.setSelectedCount(n.value?.size || 0);
    },
    handleItemDblClick: (m) => {
      const w = g(m);
      if (!w) return;
      const { item: v } = w;
      v && (v.type === "file" && !c(v) || f(v, d, r));
    },
    handleItemContextMenu: (m) => {
      m.preventDefault(), m.stopPropagation();
      const w = g(m);
      if (!w) return;
      const { key: v, item: S } = w;
      c(S) && (n.value?.has(v) || (l.clearSelection(), l.select(v)), s.emitter.emit("vf-contextmenu-show", {
        event: m,
        items: h(),
        target: S
      }));
    },
    handleContentContextMenu: (m) => {
      m.preventDefault(), s.emitter.emit("vf-contextmenu-show", { event: m, items: h() });
    },
    getSelectedItems: h
  };
}
function d_(s, e) {
  const t = T(null);
  return ye(() => {
    if (ft.plugin([Mo]), s.value) {
      const n = ft(
        s.value,
        {
          scrollbars: { theme: "vf-scrollbars-theme" }
        },
        {
          initialized: (i) => {
            t.value = i;
            const { viewport: d } = i.elements();
            d && d.addEventListener("scroll", e);
          },
          updated: (i) => {
            const { viewport: d } = i.elements();
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
const c_ = 4, u_ = 600;
function v_(s, e) {
  const t = T(null), n = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap();
  return ye(() => {
    s.value && (t.value = new Wt({
      elements_selector: ".lazy",
      container: s.value,
      // Put the placeholder back so the browser doesn't show a broken-image
      // icon (the "?" thumbnail) while we retry.
      restore_on_error: !0,
      callback_error: (d, r) => {
        const l = (n.get(d) ?? 0) + 1;
        if (l > c_) return;
        n.set(d, l);
        const c = u_ * 2 ** (l - 1) + Math.random() * 250, f = i.get(d);
        f && clearTimeout(f), i.set(
          d,
          setTimeout(() => {
            d.isConnected && (Wt.resetStatus(d), r.update());
          }, c)
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
const f_ = { class: "vuefinder__explorer__container" }, __ = {
  key: 0,
  class: "vuefinder__linear-loader"
}, p_ = /* @__PURE__ */ re({
  __name: "Explorer",
  props: {
    onFileDclick: { type: Function },
    onFolderDclick: { type: Function }
  },
  setup(s) {
    const e = s, t = ie(), n = $t(t, ["vuefinder__drag-over"]), i = st("dragImage"), d = vt(null), r = st("scrollContainer"), l = st("scrollContent"), c = t.fs, f = t.config, g = oe(f.state), h = oe(c.sortedFiles), p = oe(c.selectedKeys), x = oe(c.loading), $ = (q) => p.value?.has(q) ?? !1, y = R(() => {
      if (g.value?.view === "grid") {
        const we = g.value?.gridItemHeight ?? 80, Ie = g.value?.gridItemGap ?? 8;
        return we + Ie * 2;
      }
      const ae = g.value?.listItemHeight ?? 32, _e = g.value?.listItemGap ?? 2;
      return ae + _e * 2;
    }), m = R(() => {
      if (g.value?.view === "grid") {
        const ae = g.value?.gridItemWidth ?? 96, _e = g.value?.gridItemGap ?? 8;
        return ae + _e * 2;
      }
      return 104;
    }), w = R(() => g.value?.view === "grid" ? (g.value?.gridItemGap ?? 8) * 2 : 0), { t: v } = t.i18n, {
      itemsPerRow: S,
      totalHeight: C,
      visibleRows: E,
      handleScroll: P,
      getRowItems: B,
      getItemsInRange: K,
      updateItemsPerRow: Z
    } = s_(
      R(() => h.value ?? []),
      {
        scrollContainer: r,
        itemWidth: m,
        rowHeight: y,
        overscan: 2,
        containerPadding: w,
        lockItemsPerRow: R(() => g.value.view === "list")
      }
    ), { osInstance: ee } = d_(r, P), { explorerId: Q, isDragging: Y, initializeSelectionArea: b, updateSelectionArea: F, handleContentClick: M } = a_({
      itemsPerRow: S,
      totalHeight: C,
      getItemsInRange: K,
      getKey: (q) => ke(q),
      selectionObject: d,
      rowHeight: y,
      itemWidth: m,
      osInstance: ee
    }), j = T(null), le = (q) => {
      if (!q || !j.value) return !1;
      const ae = p.value?.has(j.value) ?? !1;
      return Y.value && (ae ? p.value?.has(q) ?? !1 : q === j.value);
    };
    pe(
      () => f.get("view"),
      (q) => {
        q === "list" ? S.value = 1 : Z();
      },
      { immediate: !0 }
    ), pe(S, (q) => {
      f.get("view") === "list" && q !== 1 && (S.value = 1);
    });
    const L = (q) => h.value?.[q];
    v_(r, t);
    const { handleItemClick: O, handleItemDblClick: N, handleItemContextMenu: I, handleContentContextMenu: W } = r_(
      t,
      Q,
      h,
      p,
      d,
      e.onFileDclick,
      e.onFolderDclick
    );
    ye(() => {
      const q = () => {
        d.value || b(), d.value && d.value.on("beforestart", ({ event: ae }) => {
          const _e = ae?.target === l.value;
          if (!ae?.metaKey && !ae?.ctrlKey && !ae?.altKey && !_e)
            return !1;
        });
      };
      if (ee.value)
        q();
      else {
        const ae = setInterval(() => {
          ee.value && (clearInterval(ae), q());
        }, 50);
        setTimeout(() => {
          clearInterval(ae), d.value || q();
        }, 500);
      }
      pe(() => [t.selectionFilterType, t.selectionFilterMimeIncludes], F, {
        deep: !0
      });
    });
    const A = (q) => {
      if (!(t.features?.move ?? !1) || q.altKey || q.ctrlKey || q.metaKey)
        return q.preventDefault(), !1;
      Y.value = !0;
      const _e = q.target?.closest(
        ".file-item-" + Q
      );
      if (j.value = _e ? String(_e.dataset.key) : null, q.dataTransfer && j.value) {
        q.dataTransfer.setDragImage(i.value, 0, 15), q.dataTransfer.effectAllowed = "all", q.dataTransfer.dropEffect = "copy";
        const we = p.value?.has(j.value) ? Array.from(p.value) : [j.value];
        q.dataTransfer.setData("items", JSON.stringify(we)), c.setDraggedItem(j.value);
      }
    }, U = () => {
      j.value = null;
    };
    let H = null, D = null;
    const V = (q) => {
      q.target?.closest(".file-item-" + Q) || (D = q, H && clearTimeout(H), H = setTimeout(() => {
        D && (D.cancelable && D.preventDefault(), D.stopPropagation(), W(D)), D = null, H = null;
      }, 500));
    }, ue = (q) => {
      H && (clearTimeout(H), H = null), D = null;
    }, be = (q) => {
      if (!D) return;
      const ae = D.touches[0] || D.changedTouches[0], _e = q.touches[0] || q.changedTouches[0];
      if (ae && _e) {
        const we = Math.abs(_e.clientX - ae.clientX), Ie = Math.abs(_e.clientY - ae.clientY);
        (we > 15 || Ie > 15) && (H && (clearTimeout(H), H = null), D = null);
      }
    };
    return (q, ae) => (u(), _("div", f_, [
      a(g).view === "list" ? (u(), X(o_, { key: 0 })) : z("", !0),
      o("div", {
        ref_key: "scrollContainer",
        ref: r,
        class: te(["vuefinder__explorer__selector-area", "scroller-" + a(Q)])
      }, [
        a(f).get("loadingIndicator") === "linear" && a(x) ? (u(), _("div", __)) : z("", !0),
        o("div", {
          ref_key: "scrollContent",
          ref: l,
          class: "scrollContent vuefinder__explorer__scroll-content",
          style: Pe({ height: `${a(C)}px`, position: "relative", width: "100%" }),
          onContextmenu: ae[0] || (ae[0] = fe(
            //@ts-ignore
            (..._e) => a(W) && a(W)(..._e),
            ["self", "prevent"]
          )),
          onClick: ae[1] || (ae[1] = fe(
            //@ts-ignore
            (..._e) => a(M) && a(M)(..._e),
            ["self"]
          )),
          onTouchstartCapture: fe(V, ["self"]),
          onTouchendCapture: fe(ue, ["self"]),
          onTouchmoveCapture: fe(be, ["self"]),
          onTouchcancelCapture: fe(ue, ["self"])
        }, [
          o("div", {
            ref_key: "dragImage",
            ref: i,
            class: "vuefinder__explorer__drag-item"
          }, [
            G(Df, {
              count: j.value && a(p).has(j.value) ? a(p).size : 1
            }, null, 8, ["count"])
          ], 512),
          a(g).view === "grid" ? (u(!0), _(ve, { key: 0 }, he(a(E), (_e) => (u(), X(On, {
            key: _e,
            "row-index": _e,
            "row-height": y.value,
            view: "grid",
            "items-per-row": a(S),
            items: a(B)(a(h), _e),
            "show-thumbnails": a(g).showThumbnails,
            "is-dragging-item": le,
            "is-selected": $,
            "drag-n-drop-events": (we) => a(n).events(we),
            "explorer-id": a(Q),
            onClick: a(O),
            onDblclick: a(N),
            onContextmenu: a(I),
            onDragstart: A,
            onDragend: U
          }, {
            icon: ce((we) => [
              Me(q.$slots, "icon", je({ ref_for: !0 }, we))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items-per-row", "items", "show-thumbnails", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128)) : (u(!0), _(ve, { key: 1 }, he(a(E), (_e) => (u(), X(On, {
            key: _e,
            "row-index": _e,
            "row-height": y.value,
            view: "list",
            items: L(_e) ? [L(_e)] : [],
            "is-dragging-item": le,
            "is-selected": $,
            "drag-n-drop-events": (we) => a(n).events(we),
            "explorer-id": a(Q),
            onClick: a(O),
            onDblclick: a(N),
            onContextmenu: a(I),
            onDragstart: A,
            onDragend: U
          }, {
            icon: ce((we) => [
              Me(q.$slots, "icon", je({ ref_for: !0 }, we))
            ]),
            _: 3
          }, 8, ["row-index", "row-height", "items", "drag-n-drop-events", "explorer-id", "onClick", "onDblclick", "onContextmenu"]))), 128))
        ], 36)
      ], 2)
    ]));
  }
}), m_ = ["href", "download"], h_ = { class: "vuefinder__context-menu__action vuefinder__context-menu__action--parent" }, g_ = { class: "vuefinder__context-menu vuefinder__context-menu__submenu" }, y_ = ["onClick"], w_ = ["onClick"], b_ = /* @__PURE__ */ re({
  __name: "ContextMenu",
  setup(s) {
    const e = ie(), t = T(null), n = T([]);
    let i = null, d = null, r = null, l = [], c = null;
    const f = Pt({
      active: !1,
      items: [],
      positions: {}
    });
    e.emitter.on("vf-context-selected", (x) => {
      n.value = x;
    });
    const g = (x) => x.link(e, n.value), h = (x) => {
      e.emitter.emit("vf-contextmenu-hide"), x.action(e, n.value);
    };
    e.emitter.on("vf-contextmenu-show", (x) => {
      const { event: $, items: y, target: m = null } = x || {};
      f.items = (e.contextMenuItems || []).filter((w) => w.show(e, {
        items: y,
        target: m
      })).sort((w, v) => {
        const S = w.order ?? 1 / 0, C = v.order ?? 1 / 0;
        return S - C;
      }), m ? y.length > 1 && y.some((w) => w.path === m.path) ? e.emitter.emit("vf-context-selected", y) : e.emitter.emit("vf-context-selected", [m]) : e.emitter.emit("vf-context-selected", []), p($);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      f.active = !1, i && (i(), i = null), r && (l.forEach((x) => {
        x === window ? window.removeEventListener("scroll", r, !0) : x.removeEventListener("scroll", r, !0);
      }), r = null, l = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), d = null, f.positions = {};
    });
    const p = async (x) => {
      i && (i(), i = null);
      const y = ((P) => {
        if ("clientX" in P && "clientY" in P)
          return { x: P.clientX, y: P.clientY };
        const B = "touches" in P && P.touches[0] || "changedTouches" in P && P.changedTouches[0];
        return B ? { x: B.clientX, y: B.clientY } : { x: 0, y: 0 };
      })(x);
      if (d = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          x: y.x,
          y: y.y,
          top: y.y,
          left: y.x,
          right: y.x,
          bottom: y.y
        })
      }, f.positions = {
        position: "fixed",
        zIndex: "10001",
        opacity: "0",
        visibility: "hidden",
        left: "-9999px",
        top: "-9999px"
      }, f.active = !0, await De(), !t.value || !d) return;
      await new Promise((P) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(P);
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
      let w = 0, v = 0;
      try {
        const P = await at(d, t.value, {
          placement: "right-start",
          strategy: "fixed",
          middleware: m
        });
        w = P.x, v = P.y;
      } catch (P) {
        console.warn("[ContextMenu] Floating UI initial positioning error:", P);
        return;
      }
      f.positions = {
        position: "fixed",
        zIndex: "10001",
        left: `${w}px`,
        top: `${v}px`,
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
      const C = ((P) => {
        const B = [];
        let K = P;
        for (; K && K !== document.body && K !== document.documentElement; ) {
          const Z = window.getComputedStyle(K), ee = Z.overflow + Z.overflowX + Z.overflowY;
          (ee.includes("scroll") || ee.includes("auto")) && B.push(K), K = K.parentElement;
        }
        return B;
      })(t.value);
      l = [window, ...C], r = () => {
        f.active && e.emitter.emit("vf-contextmenu-hide");
      };
      const E = r;
      E && l.forEach((P) => {
        P === window ? window.addEventListener("scroll", E, !0) : P.addEventListener("scroll", E, !0);
      }), c = (P) => {
        if (!f.active) return;
        const B = P.target;
        if (!B || t.value && t.value.contains(B))
          return;
        const K = e.root;
        K && K.contains(B) || e.emitter.emit("vf-contextmenu-hide");
      }, setTimeout(() => {
        c && (document.addEventListener("mousedown", c, !0), document.addEventListener("touchstart", c, !0));
      }, 100), setTimeout(() => {
        if (!(!t.value || !d))
          try {
            i = Qt(d, t.value, async () => {
              if (!(!d || !t.value))
                try {
                  const { x: P, y: B } = await at(d, t.value, {
                    placement: "right-start",
                    strategy: "fixed",
                    middleware: m
                  });
                  f.positions = {
                    ...f.positions,
                    left: `${P}px`,
                    top: `${B}px`
                  };
                } catch (P) {
                  console.warn("Floating UI positioning error:", P);
                }
            });
          } catch (P) {
            console.warn("Floating UI autoUpdate setup error:", P), i = null;
          }
      }, 200);
    };
    return Te(() => {
      i && (i(), i = null), r && (l.forEach((x) => {
        x === window ? window.removeEventListener("scroll", r, !0) : x.removeEventListener("scroll", r, !0);
      }), r = null, l = []), c && (document.removeEventListener("mousedown", c, !0), document.removeEventListener("touchstart", c, !0), c = null), d = null;
    }), (x, $) => me((u(), _("ul", {
      ref_key: "contextmenu",
      ref: t,
      class: te([{
        "vuefinder__context-menu--active": f.active,
        "vuefinder__context-menu--inactive": !f.active
      }, "vuefinder__context-menu"]),
      style: Pe(f.positions)
    }, [
      (u(!0), _(ve, null, he(f.items, (y) => (u(), _("li", {
        key: y.title,
        class: te(["vuefinder__context-menu__item", { "vuefinder__context-menu__item--has-children": y.children?.length }])
      }, [
        y.link ? (u(), _("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: g(y),
          download: g(y),
          onClick: $[0] || ($[0] = (m) => a(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          o("span", null, k(y.title(a(e).i18n)), 1)
        ], 8, m_)) : y.children?.length ? (u(), _(ve, { key: 1 }, [
          o("div", h_, [
            o("span", null, k(y.title(a(e).i18n)), 1),
            $[1] || ($[1] = o("svg", {
              class: "vuefinder__context-menu__chevron",
              viewBox: "0 0 16 16",
              fill: "currentColor",
              "aria-hidden": "true"
            }, [
              o("path", { d: "M6 4l4 4-4 4z" })
            ], -1))
          ]),
          o("ul", g_, [
            (u(!0), _(ve, null, he(y.children, (m) => (u(), _("li", {
              key: m.id,
              class: "vuefinder__context-menu__item"
            }, [
              o("div", {
                class: "vuefinder__context-menu__action",
                onClick: (w) => h(m)
              }, [
                o("span", null, k(m.title(a(e).i18n)), 1)
              ], 8, y_)
            ]))), 128))
          ])
        ], 64)) : (u(), _("div", {
          key: 2,
          class: "vuefinder__context-menu__action",
          onClick: (m) => h(y)
        }, [
          o("span", null, k(y.title(a(e).i18n)), 1)
        ], 8, w_))
      ], 2))), 128))
    ], 6)), [
      [qe, f.active]
    ]);
  }
}), k_ = { class: "vuefinder__status-bar__wrapper" }, $_ = { class: "vuefinder__status-bar__storage" }, x_ = ["title"], S_ = { class: "vuefinder__status-bar__storage-icon" }, C_ = ["value"], F_ = ["value"], E_ = { class: "vuefinder__status-bar__info space-x-2" }, P_ = { key: 0 }, T_ = { key: 1 }, D_ = {
  key: 0,
  class: "vuefinder__status-bar__size"
}, M_ = { class: "vuefinder__status-bar__actions" }, I_ = ["title"], A_ = /* @__PURE__ */ re({
  __name: "Statusbar",
  setup(s) {
    const e = ie(), { t } = e.i18n, n = e.fs, i = R(() => e.upload.uploading && !e.modal.visible), d = () => e.modal.open(Rt), r = oe(n.sortedFiles), l = oe(n.path), c = oe(n.selectedCount), f = oe(n.storages), g = oe(n.selectedItems), h = oe(n.path), p = (v) => {
      const S = v.target.value;
      e.adapter.open(S + "://");
    }, x = R(() => !g.value || g.value.length === 0 ? 0 : g.value.reduce((v, S) => v + (S.file_size || 0), 0)), $ = R(() => f.value), y = R(() => r.value), m = R(() => c.value || 0), w = R(() => g.value || []);
    return (v, S) => (u(), _("div", k_, [
      o("div", $_, [
        o("div", {
          class: "vuefinder__status-bar__storage-container",
          title: a(t)("Storage")
        }, [
          o("div", S_, [
            G(a(ln))
          ]),
          o("select", {
            name: "vuefinder-media-selector",
            value: a(l).storage,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1",
            onChange: p
          }, [
            (u(!0), _(ve, null, he($.value, (C) => (u(), _("option", {
              key: C,
              value: C
            }, k(C), 9, F_))), 128))
          ], 40, C_),
          S[0] || (S[0] = o("span", {
            class: "vuefinder__status-bar__storage-caret",
            "aria-hidden": "true"
          }, null, -1))
        ], 8, x_),
        o("div", E_, [
          m.value === 0 ? (u(), _("span", P_, k(y.value.length) + " " + k(a(t)("items")), 1)) : (u(), _("span", T_, [
            ge(k(m.value) + " " + k(a(t)("selected")) + " ", 1),
            x.value ? (u(), _("span", D_, k(a(e).filesize(x.value)), 1)) : z("", !0)
          ]))
        ])
      ]),
      o("div", M_, [
        i.value ? (u(), _("button", {
          key: 0,
          type: "button",
          class: "vuefinder__status-bar__upload",
          title: a(t)("Show upload progress"),
          onClick: d
        }, [
          G(a(vn), { class: "vuefinder__status-bar__upload-icon" }),
          o("span", null, k(a(t)("Uploading")) + "… " + k(a(e).upload.overallPercent) + "%", 1)
        ], 8, I_)) : z("", !0),
        Me(v.$slots, "actions", {
          path: a(h).path,
          count: m.value || 0,
          selected: w.value
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
function L_(s, e) {
  return u(), _("svg", O_, [...e[0] || (e[0] = [
    o("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    o("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ])]);
}
const R_ = { render: L_ };
function po(s, e) {
  const t = s.findIndex((n) => n.path === e.path);
  t > -1 ? s[t] = e : s.push(e);
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
  setup(s) {
    const e = s, t = ie(), n = Vn(s, "modelValue"), i = T(!1);
    pe(
      () => n.value,
      () => d()
    );
    const d = async () => {
      i.value = !0;
      try {
        const l = (await t.adapter.list(e.path)).files.filter((c) => c.type === "dir");
        po(t.treeViewData, { path: e.path, type: "dir", folders: l });
      } catch (r) {
        Fe(r, "Failed to fetch subfolders");
      } finally {
        i.value = !1;
      }
    };
    return (r, l) => (u(), _("div", B_, [
      i.value ? (u(), X(a(Ot), {
        key: 0,
        class: "vuefinder__folder-loader-indicator--loading"
      })) : (u(), _("div", z_, [
        n.value ? (u(), X(a(It), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--minus"
        })) : z("", !0),
        n.value ? z("", !0) : (u(), X(a(Mt), {
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
  setup(s) {
    const e = ie(), t = e.fs, n = $t(e, ["vuefinder__drag-over"]), i = T({}), d = e.config, r = oe(d.state), { t: l } = e.i18n, c = oe(t.path), f = s, g = T(null), h = T(50);
    ye(() => {
      f.path === f.storage + "://" && g.value && ft(g.value, {
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    });
    const p = R(() => {
      const S = e.treeViewData.find((C) => C.path === f.path)?.folders || [];
      return S.length > h.value ? S.slice(0, h.value) : S;
    }), x = R(() => e.treeViewData.find((S) => S.path === f.path)?.folders?.length || 0), $ = R(() => x.value > h.value), y = R(() => `${f.storage}://`), m = (v, S) => v === S || v.startsWith(`${S}/`);
    pe(
      p,
      (v) => {
        const S = r.value.expandTreeByDefault && f.path === y.value, C = r.value.expandedTreePaths || [];
        v.forEach((E) => {
          const P = C.some(
            (B) => m(B, E.path)
          );
          (S || P) && i.value[E.path] === void 0 && (i.value[E.path] = !0);
        });
      },
      { immediate: !0 }
    );
    const w = () => {
      h.value += 50;
    };
    return (v, S) => {
      const C = zn("TreeSubfolderList", !0);
      return u(), _("ul", {
        ref_key: "parentSubfolderList",
        ref: g,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        p.value.length ? z("", !0) : (u(), _("li", V_, [
          o("div", U_, k(a(l)("No folders")), 1)
        ])),
        (u(!0), _(ve, null, he(p.value, (E) => (u(), _("li", {
          key: E.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          o("div", N_, [
            o("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (P) => i.value[E.path] = !i.value[E.path]
            }, [
              G(mo, {
                modelValue: i.value[E.path],
                "onUpdate:modelValue": (P) => i.value[E.path] = P,
                storage: s.storage,
                path: E.path
              }, null, 8, ["modelValue", "onUpdate:modelValue", "storage", "path"])
            ], 8, H_),
            o("div", je({
              class: "vuefinder__treesubfolderlist__item-link",
              title: E.path
            }, Qe(
              a(n).events({
                ...E,
                dir: E.path,
                extension: "",
                file_size: null,
                last_modified: null,
                mime_type: null,
                visibility: "public"
              }),
              !0
            ), {
              onDblclick: (P) => i.value[E.path] = !i.value[E.path],
              onClick: (P) => a(e).adapter.open(E.path)
            }), [
              o("div", K_, [
                a(c)?.path === E.path ? (u(), X(a(At), {
                  key: 0,
                  class: "vuefinder__item-icon__folder--open"
                })) : (u(), X(a(Re), {
                  key: 1,
                  class: "vuefinder__item-icon__folder"
                }))
              ]),
              o("div", {
                class: te(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": a(c).path === E.path
                }])
              }, k(E.basename), 3)
            ], 16, j_)
          ]),
          o("div", q_, [
            me(G(C, {
              storage: f.storage,
              path: E.path
            }, null, 8, ["storage", "path"]), [
              [qe, i.value[E.path]]
            ])
          ])
        ]))), 128)),
        $.value ? (u(), _("li", W_, [
          o("div", {
            class: "vuefinder__treesubfolderlist__load-more",
            onClick: w
          }, k(a(l)("load more")), 1)
        ])) : z("", !0)
      ], 512);
    };
  }
}), Y_ = /* @__PURE__ */ re({
  __name: "TreeStorageItem",
  props: {
    storage: {}
  },
  setup(s) {
    const e = ie(), t = e.fs, n = e.config, i = s, d = oe(n.state), r = R(() => {
      const x = d.value.expandedTreePaths || [], $ = `${i.storage}://`;
      return x.some(
        (y) => y === $ || y.startsWith(`${$}`)
      );
    }), l = T(d.value.expandTreeByDefault || r.value), c = $t(e, ["vuefinder__drag-over"]), f = oe(t.path), g = R(() => i.storage === f.value?.storage);
    pe(
      () => ({
        expandTreeByDefault: d.value.expandTreeByDefault,
        hasExpandedPathInStorage: r.value
      }),
      (x) => {
        (x.expandTreeByDefault || x.hasExpandedPathInStorage) && (l.value = !0);
      }
    );
    const h = {
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
    function p(x) {
      x === f.value?.storage ? l.value = !l.value : e.adapter.open(x + "://");
    }
    return (x, $) => (u(), _(ve, null, [
      o("div", {
        class: "vuefinder__treestorageitem__header",
        onClick: $[2] || ($[2] = (y) => p(s.storage))
      }, [
        o("div", je({
          class: ["vuefinder__treestorageitem__info", g.value ? "vuefinder__treestorageitem__info--active" : ""]
        }, Qe(a(c).events(h), !0)), [
          o("div", {
            class: te(["vuefinder__treestorageitem__icon", g.value ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            G(a(ln))
          ], 2),
          o("div", null, k(s.storage), 1)
        ], 16),
        o("div", {
          class: "vuefinder__treestorageitem__loader",
          onClick: $[1] || ($[1] = fe((y) => l.value = !l.value, ["stop"]))
        }, [
          G(mo, {
            modelValue: l.value,
            "onUpdate:modelValue": $[0] || ($[0] = (y) => l.value = y),
            storage: s.storage,
            path: s.storage + "://"
          }, null, 8, ["modelValue", "storage", "path"])
        ])
      ]),
      me(G(G_, {
        storage: s.storage,
        path: s.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["storage", "path"]), [
        [qe, l.value]
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
  setup(s) {
    const e = Vn(s, "modelValue");
    return (t, n) => (u(), _("div", X_, [
      o("div", Q_, [
        e.value ? (u(), X(a(It), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : z("", !0),
        e.value ? z("", !0) : (u(), X(a(Mt), {
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
  setup(s) {
    const e = ie(), { enabled: t } = Ve(), { t: n } = e.i18n, { getStore: i, setStore: d } = e.storage, r = e.fs, l = e.config, c = oe(l.state), f = oe(r.sortedFiles), g = oe(r.storages), h = R(() => g.value || []), p = oe(r.path), x = $t(e, ["vuefinder__drag-over"]), $ = T(190), y = T(i("pinned-folders-opened", !0));
    pe(y, (S) => d("pinned-folders-opened", S));
    const m = (S) => {
      const C = l.get("pinnedFolders");
      l.set("pinnedFolders", C.filter((E) => E.path !== S.path));
    }, w = (S) => {
      const C = S.clientX, E = S.target.parentElement;
      if (!E) return;
      const P = E.getBoundingClientRect().width;
      E.classList.remove("transition-[width]"), E.classList.add("transition-none");
      const B = (Z) => {
        $.value = P + Z.clientX - C, $.value < 50 && ($.value = 0, l.set("showTreeView", !1)), $.value > 50 && l.set("showTreeView", !0);
      }, K = () => {
        const Z = E.getBoundingClientRect();
        $.value = Z.width, E.classList.add("transition-[width]"), E.classList.remove("transition-none"), window.removeEventListener("mousemove", B), window.removeEventListener("mouseup", K);
      };
      window.addEventListener("mousemove", B), window.addEventListener("mouseup", K);
    }, v = T(null);
    return ye(() => {
      v.value && ft(v.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-scrollbars-theme"
        }
      });
    }), pe(f, (S) => {
      const C = S.filter((E) => E.type === "dir");
      po(e.treeViewData, {
        path: p.value.path || "",
        folders: C.map((E) => ({
          storage: E.storage,
          path: E.path,
          basename: E.basename,
          type: "dir"
        }))
      });
    }), (S, C) => (u(), _(ve, null, [
      o("div", {
        class: te(["vuefinder__treeview__overlay", a(c).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"]),
        onClick: C[0] || (C[0] = (E) => a(l).toggle("showTreeView"))
      }, null, 2),
      o("div", {
        style: Pe(
          a(c).showTreeView ? "min-width:100px;max-width:75%; width: " + $.value + "px" : "width: 0"
        ),
        class: "vuefinder__treeview__container"
      }, [
        o("div", {
          ref_key: "treeViewScrollElement",
          ref: v,
          class: "vuefinder__treeview__scroll"
        }, [
          a(t)("pinned") ? (u(), _("div", Z_, [
            o("div", {
              class: "vuefinder__treeview__pinned-toggle",
              onClick: C[2] || (C[2] = (E) => y.value = !y.value)
            }, [
              o("div", ep, [
                G(a(gt), { class: "vuefinder__treeview__pin-icon" }),
                o("div", tp, k(a(n)("Pinned Folders")), 1)
              ]),
              G(J_, {
                modelValue: y.value,
                "onUpdate:modelValue": C[1] || (C[1] = (E) => y.value = E)
              }, null, 8, ["modelValue"])
            ]),
            y.value ? (u(), _("ul", np, [
              (u(!0), _(ve, null, he(a(c).pinnedFolders, (E) => (u(), _("li", {
                key: E.path,
                class: "vuefinder__treeview__pinned-item"
              }, [
                o("div", je({ class: "vuefinder__treeview__pinned-folder" }, Qe(a(x).events(E), !0), {
                  onClick: (P) => a(e).adapter.open(E.path)
                }), [
                  a(p).path !== E.path ? (u(), X(a(Re), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon vuefinder__item-icon__folder"
                  })) : z("", !0),
                  a(p).path === E.path ? (u(), X(a(At), {
                    key: 1,
                    class: "vuefinder__item-icon__folder--open vuefinder__treeview__open-folder-icon"
                  })) : z("", !0),
                  o("div", {
                    title: E.path,
                    class: te(["vuefinder__treeview__folder-name", {
                      "vuefinder__treeview__folder-name--active": a(p).path === E.path
                    }])
                  }, k(E.basename), 11, sp)
                ], 16, op),
                o("div", {
                  class: "vuefinder__treeview__remove-folder",
                  onClick: (P) => m(E)
                }, [
                  G(a(R_), { class: "vuefinder__treeview__remove-icon" })
                ], 8, ap)
              ]))), 128)),
              a(c).pinnedFolders.length ? z("", !0) : (u(), _("li", ip, [
                o("div", lp, k(a(n)("No folders pinned")), 1)
              ]))
            ])) : z("", !0)
          ])) : z("", !0),
          (u(!0), _(ve, null, he(h.value, (E) => (u(), _("div", {
            key: E,
            class: "vuefinder__treeview__storage"
          }, [
            G(Y_, { storage: E }, null, 8, ["storage"])
          ]))), 128))
        ], 512),
        o("div", {
          class: "vuefinder__treeview__resize-handle",
          onMousedown: w
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
function dp(s) {
  return s.items.length > 1 && s.items.some((e) => e.path === s.target?.path) ? "many" : s.target ? "one" : "none";
}
function $e(s) {
  const e = Object.assign(
    {
      needsSearchQuery: !1
    },
    s
  );
  return (t, n) => !(e.needsSearchQuery !== !!n.searchQuery || e.target !== void 0 && e.target !== dp(n) || e.targetType !== void 0 && e.targetType !== n.target?.type || e.mimeType !== void 0 && e.mimeType !== n.target?.mime_type || e.feature !== void 0 && !(t.features[e.feature] ?? !1));
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
    action: (s) => s.modal.open(un),
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
      const t = s.config, n = t.get("pinnedFolders"), i = n.concat(
        e.filter(
          (d) => n.findIndex((r) => r.path === d.path) === -1
        )
      );
      t.set("pinnedFolders", i);
    },
    show: nt($e({ target: "one", targetType: "dir", feature: "pinned" }), (s, e) => s.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) === -1),
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
          (i) => !e.find((d) => d.path === i.path)
        )
      );
    },
    show: nt($e({ target: "one", targetType: "dir", feature: "pinned" }), (s, e) => s.config.get("pinnedFolders").findIndex((i) => i.path === e.target?.path) !== -1),
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
      s.modal.open(it, { items: { from: e, to: n } });
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
        const i = s.fs.path.get();
        let d = i.path, r = i.storage;
        e.length === 1 && e[0]?.type === "dir" && (d = e[0].path, r = e[0].storage);
        const l = {
          storage: r || "",
          path: d || "",
          type: "dir"
        };
        s.modal.open(t.type === "cut" ? it : rn, {
          items: { from: Array.from(t.items), to: l }
        });
      }
    },
    show: (s, e) => s.features?.copy ?? !1 ? s.fs.getClipboard()?.items?.size > 0 : !1,
    order: 130
  },
  {
    id: Ce.archive,
    title: ({ t: s }) => s("Archive"),
    action: (s, e) => s.modal.open(_n, { items: e }),
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
    action: (s, e) => s.modal.open(fn, { items: e }),
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
  setup(s, { emit: e }) {
    const t = e, n = s, i = ie(), d = st("root"), r = i.config;
    pe(
      () => n.features,
      (v) => {
        const S = Hn(v);
        Object.keys(i.features).forEach((C) => {
          delete i.features[C];
        }), Object.assign(i.features, S);
      },
      { deep: !0 }
    );
    const l = i.fs, c = oe(i.i18n.localeAtom), f = oe(r.state), g = R(() => {
      const v = f.value;
      return {
        "--vf-grid-item-width": `${v.gridItemWidth}px`,
        "--vf-grid-item-height": `${v.gridItemHeight}px`,
        "--vf-grid-item-gap": `${v.gridItemGap}px`,
        "--vf-grid-icon-size": `${v.gridIconSize}px`,
        "--vf-list-item-height": `${v.listItemHeight}px`,
        "--vf-list-item-gap": `${v.listItemGap}px`,
        "--vf-list-icon-size": `${v.listIconSize}px`
      };
    });
    Ad();
    const { isDraggingExternal: h, handleDragEnter: p, handleDragOver: x, handleDragLeave: $, handleDrop: y } = Od();
    function m(v) {
      l.setPath(v.dirname), r.get("persist") && r.set("path", v.dirname), l.setReadOnly(v.read_only ?? !1), i.modal.close(), l.setFiles(v.files), l.clearSelection(), l.setSelectedCount(0), l.setStorages(v.storages);
    }
    i.adapter.onBeforeOpen = () => {
      l.setLoading(!0);
    }, i.adapter.onAfterOpen = (v) => {
      m(v), l.setLoading(!1);
    }, i.emitter.on("vf-fetch-abort", () => {
      i.adapter.cancelOpen(), l.setLoading(!1);
    }), i.emitter.on("vf-upload-complete", (v) => {
      t("upload-complete", v);
    }), i.emitter.on("vf-delete-complete", (v) => {
      t("delete-complete", v);
    }), i.emitter.on("vf-notify", (v) => {
      t("notify", v);
      const { type: S, message: C } = v ?? {};
      S === "error" && t("error", C);
    }), i.emitter.on("vf-file-dclick", (v) => {
      t("file-dclick", v);
    }), i.emitter.on("vf-folder-dclick", (v) => {
      t("folder-dclick", v);
    }), pe(
      () => n.config?.theme,
      (v) => {
        v && r.set("theme", a(v));
      },
      { immediate: !0 }
    ), pe(
      c,
      (v, S) => {
        v !== S && t("update:locale", String(v));
      },
      { immediate: !1 }
    ), ye(() => {
      i.root = d.value, pe(
        () => r.get("path"),
        (S) => {
          i.adapter.open(S);
        }
      );
      const v = r.get("persist") ? r.get("path") : r.get("initialPath") ?? "";
      l.setPath(v), i.adapter.open(v), l.path.listen((S) => {
        t("path-change", S.path);
      }), l.selectedItems.listen((S) => {
        t("select", S);
      }), t("ready");
    });
    const w = async (v) => {
      const S = await y(v);
      S.length > 0 && (i.modal.open(Rt), setTimeout(() => {
        i.emitter.emit(
          "vf-external-files-dropped",
          S.map((C) => ({ file: C.file, name: C.relativePath }))
        );
      }, 100));
    };
    return (v, S) => (u(), _("div", {
      ref_key: "root",
      ref: d,
      tabindex: "0",
      class: te(["vuefinder vuefinder__main vuefinder__themer", { "vuefinder--dragging-external": a(h) }]),
      "data-theme": a(i).theme.current,
      style: Pe(g.value),
      onDragenter: S[2] || (S[2] = //@ts-ignore
      (...C) => a(p) && a(p)(...C)),
      onDragover: S[3] || (S[3] = //@ts-ignore
      (...C) => a(x) && a(x)(...C)),
      onDragleave: S[4] || (S[4] = //@ts-ignore
      (...C) => a($) && a($)(...C)),
      onDrop: w
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
          onMousedown: S[0] || (S[0] = (C) => a(i).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: S[1] || (S[1] = (C) => a(i).emitter.emit("vf-contextmenu-hide"))
        }, [
          a(h) ? (u(), _("div", up, [
            o("div", vp, k(a(i).i18n.t("Drag and drop the files/folders to here.")), 1)
          ])) : z("", !0),
          a(f).showMenuBar ? (u(), X(Vu, { key: 1 })) : z("", !0),
          a(f).showToolbar ? (u(), X(Nv, { key: 2 })) : z("", !0),
          G(Cf),
          o("div", fp, [
            G(rp),
            G(p_, {
              "on-file-dclick": n.onFileDclick,
              "on-folder-dclick": n.onFolderDclick
            }, {
              icon: ce((C) => [
                Me(v.$slots, "icon", Je(Ze(C)))
              ]),
              _: 3
            }, 8, ["on-file-dclick", "on-folder-dclick"])
          ]),
          G(A_, null, {
            actions: ce((C) => [
              Me(v.$slots, "status-bar", Je(Ze(C)))
            ]),
            _: 3
          })
        ], 34),
        (u(), X(bt, { to: "body" }, [
          G(xo, { name: "fade" }, {
            default: ce(() => [
              a(i).modal.visible ? (u(), X(Ln(a(i).modal.type), { key: 0 })) : z("", !0)
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
        }, null, 8, ["position", "duration", "visible-toasts", "rich-colors"])) : z("", !0)
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
  setup(s) {
    const e = s, t = e.id ?? Ct(Gt);
    if (!t)
      throw new Error('VueFinderProvider requires an "id" prop.');
    const n = Zo(e, Ct("VueFinderOptions") || {});
    return pe(
      () => e.config,
      (i) => {
        if (i) {
          const d = {};
          for (const r in i) {
            const l = a(i[r]);
            l !== void 0 && (d[r] = l);
          }
          n.config.init(d);
        }
      },
      { deep: !0, immediate: !0 }
    ), pe(
      () => e.locale,
      (i) => {
        i && n.i18n.localeAtom && n.i18n.localeAtom.get() !== i && n.i18n.localeAtom.set(i);
      },
      { immediate: !0 }
    ), Oo(t, n), So(Gt, t), wt(() => {
      Lo(t);
    }), (i, d) => (u(), X(_p, Je(Ze(e)), {
      icon: ce((r) => [
        Me(i.$slots, "icon", Je(Ze(r)))
      ]),
      "status-bar": ce((r) => [
        Me(i.$slots, "status-bar", Je(Ze(r)))
      ]),
      _: 3
    }, 16));
  }
});
function Mp(s) {
  const e = ie(s), t = oe(e.fs.path), n = R(() => t.value?.path ?? ""), i = (r) => r || e.fs.path.get().path || "", d = (r) => {
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
      const l = (e.fs.files.get() || []).find((c) => c.path === r);
      !l || l.type !== "file" || e.modal.open(Ye, { storage: l.storage, item: l });
    },
    notify(r, l) {
      ot(e, r, l);
    },
    getPath() {
      return e.fs.path.get().path || "";
    },
    path: n,
    select(r) {
      const l = new Set((e.fs.files.get() || []).map((f) => f.path)), c = (r || []).filter((f) => l.has(f));
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
    async createFolder(r, l) {
      const c = await e.adapter.createFolder({ path: i(l), name: r });
      d(c);
    },
    async createFile(r, l) {
      const c = await e.adapter.createFile({ path: i(l), name: r });
      d(c);
    },
    async delete(r, l) {
      const c = i(l), f = new Map(
        (e.fs.files.get() || []).map((p) => [p.path, p])
      ), g = (r || []).map((p) => f.get(p)).filter((p) => !!p).map((p) => ({ path: p.path, type: p.type })), h = await e.adapter.delete({ path: c, items: g });
      d(h);
    },
    async rename(r, l, c) {
      const f = await e.adapter.rename({
        path: i(c),
        item: r,
        name: l
      });
      d(f);
    },
    async copy(r, l, c) {
      const f = await e.adapter.copy({
        path: i(c),
        sources: r,
        destination: l
      });
      d(f);
    },
    async move(r, l, c) {
      const f = await e.adapter.move({
        path: i(c),
        sources: r,
        destination: l
      });
      d(f);
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
  install(s, e = {}) {
    e.i18n = e.i18n ?? {};
    const [t] = Object.keys(e.i18n);
    e.locale = e.locale ?? t ?? "en", s.provide("VueFinderOptions", e), s.component("VueFinder", pp);
  }
};
export {
  Xo as A,
  en as B,
  Ce as C,
  Dp as I,
  Wn as R,
  Ip as V,
  pp as _,
  Mp as a,
  Bo as c,
  ho as m,
  $n as p,
  ie as u
};
