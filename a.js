 
function hacerEditableNumerico(el, options = {}) {
  if (!el) throw new Error('Elemento no válido');

  const U = hacerEditableNumerico._utils;

  let {
    type = 'int',
    min = -Infinity,
    max = Infinity,
    step = 1,
    decimals = 2,
    trigger = 'click',
    value = undefined,
    styled = false,
    onChange = () => {}
  } = options;

  if (styled) {
    U.injectStyleOnce('inputGio-inline-num-styles', `
      .inputGio-inline-num {
        box-sizing: border-box;
        background-color: #414243;
        border: 1px solid #333333;
        border-radius: 12px;
        color: #4daafc;
        padding: 2px 10px;
        font-variant-numeric: tabular-nums;
        outline: none;
        cursor: pointer;
        transition: border-color 0.15s, background-color 0.15s, color 0.15s;
      }
      .inputGio-inline-num:hover {
        border-color: rgba(77, 170, 252, 0.1);
      }
      .inputGio-inline-num[data-editing="true"] {
        border-color: #4daafc;
        background-color: #414243;
        color: #ffffff;
        cursor: text;
      }
    `);
    el.classList.add('inputGio-inline-num');
  }

  const prevCursor = el.style.cursor;
  const prevOutline = el.style.outline;
  el.style.cursor = 'pointer';
  el.style.setProperty('outline', 'none', 'important');

  let isFloat = false;
  let factor = 1;

  const recalcType = () => {
    isFloat = type === 'float' || (step % 1 !== 0);
    factor = isFloat ? Math.pow(10, decimals) : 1;
  };
  recalcType();

  let currentValue = 0;
  const clamp = (num) => U.clampNumber(num, min, max, isFloat, factor, currentValue);
  const parseRaw = (raw) => U.parseNumber(raw, isFloat);

  currentValue = clamp(parseRaw(value !== undefined ? value : el.textContent));
  let prevValue = currentValue;
  let cancelled = false;

  if (value !== undefined) {
    el.textContent = currentValue;
  }

  const commit = (raw, triggerCallback = true) => {
    const next = clamp(parseRaw(raw));
    const changed = next !== currentValue;
    currentValue = next;
    prevValue = next;
    el.textContent = next;
    if (triggerCallback && changed) {
      onChange(currentValue, el);
    }
  };

  const startEdit = (e) => {
    e?.stopPropagation();
    if (el.isContentEditable) return;

    const synced = parseRaw(el.textContent);
    if (!Number.isNaN(synced)) {
      currentValue = clamp(synced);
    }

    cancelled = false;
    prevValue = currentValue;
    el.contentEditable = 'true';
    el.dataset.editing = 'true';
    el.style.cursor = 'text';
    el.style.setProperty('outline', 'none', 'important');
    el.focus();
    U.selectAll(el);
  };

  const onKeyDown = (e) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      e.preventDefault();
      el.blur();
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      cancelled = true;
      el.textContent = prevValue;
      el.blur();
      return;
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const mult = e.shiftKey ? 10 : 1;
      const delta = (e.key === 'ArrowUp' ? step : -step) * mult;
      const current = parseRaw(el.textContent);
      commit((Number.isNaN(current) ? prevValue : current) + delta, true);
      U.selectAll(el);
      return;
    }

    const nav = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
    if (nav.includes(e.key) || e.ctrlKey || e.metaKey) return;

    const selectedText = window.getSelection()?.toString() || '';

    if (isFloat && (e.key === '.' || e.key === ',')) {
      const hasDot = (el.textContent.includes('.') || el.textContent.includes(',')) &&
        !selectedText.includes('.') && !selectedText.includes(',');
      if (!hasDot) return;
    }

    if (min < 0 && e.key === '-') {
      const hasMinus = el.textContent.includes('-') && !selectedText.includes('-');
      if (!hasMinus) return;
    }

    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const onPaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData('text');
    const regex = isFloat ? /[^0-9.,-]/g : /[^0-9-]/g;
    const clean = pasted.replace(regex, '').replace(',', '.');
    U.insertPlainText(clean);
  };

  const onBlur = () => {
    el.contentEditable = 'false';
    delete el.dataset.editing;
    el.style.cursor = 'pointer';
    if (cancelled) {
      cancelled = false;
      currentValue = prevValue;
      el.textContent = prevValue;
      return;
    }
    commit(el.textContent, true);
  };

  el.addEventListener(trigger, startEdit);
  el.addEventListener('keydown', onKeyDown);
  el.addEventListener('paste', onPaste);
  el.addEventListener('blur', onBlur);

  return {
    getValue: () => currentValue,
    setValue: (val) => commit(val, false),
    startEdit,
    updateOptions: (newOpts = {}) => {
      if (newOpts.type !== undefined) type = newOpts.type;
      if (newOpts.min !== undefined) min = newOpts.min;
      if (newOpts.max !== undefined) max = newOpts.max;
      if (newOpts.step !== undefined) step = newOpts.step;
      if (newOpts.decimals !== undefined) decimals = newOpts.decimals;
      if (newOpts.onChange !== undefined) onChange = newOpts.onChange;
      recalcType();
    },
    destroy: () => {
      el.removeEventListener(trigger, startEdit);
      el.removeEventListener('keydown', onKeyDown);
      el.removeEventListener('paste', onPaste);
      el.removeEventListener('blur', onBlur);
      el.contentEditable = 'false';
      el.style.cursor = prevCursor;
      el.style.outline = prevOutline;
      delete el.dataset.editing;
      if (styled) el.classList.remove('inputGio-inline-num');
    }
  };
}

hacerEditableNumerico._utils = {
  PENCIL_SVG: '<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',
  injectStyleOnce(id, cssText) {
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = cssText;
    (document.head || document.documentElement).appendChild(style);
  },
  selectAll(el) {
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  },
  parseNumber(raw, isFloat) {
    const cleaned = String(raw).trim().replace(',', '.');
    return isFloat ? parseFloat(cleaned) : parseInt(cleaned, 10);
  },
  clampNumber(num, min, max, isFloat, factor = 100, fallback = 0) {
    if (Number.isNaN(num)) return fallback;
    const clamped = Math.max(min, Math.min(max, num));
    return isFloat ? Math.round(clamped * factor) / factor : Math.round(clamped);
  },
  insertPlainText(text) {
    if (typeof document.execCommand === 'function') {
      try {
        if (document.execCommand('insertText', false, text)) return;
      } catch (_) {}
    }
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    const node = document.createTextNode(text);
    range.insertNode(node);
    range.setStartAfter(node);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  },
  flashClass(el, className, duration = 500) {
    if (!el) return;
    el.classList.remove(className);
    void el.offsetWidth;
    el.classList.add(className);
    setTimeout(() => {
      if (el) el.classList.remove(className);
    }, duration);
  },
  appendChild(parentEl, child) {
    if (!child || !parentEl) return;
    if (typeof child.mount === 'function') child.mount(parentEl);
    else if (child instanceof HTMLElement) parentEl.appendChild(child);
  },
  parseDateInput(val) {
    if (!val) return null;
    if (val instanceof Date) {
      return Number.isNaN(val.getTime()) ? null : new Date(val.getTime());
    }
    if (typeof val === 'string') {
      const m = val.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    }
    const d = new Date(val);
    return Number.isNaN(d.getTime()) ? null : d;
  },
  injectInputGioSharedStyles() {
    this.injectStyleOnce('inputGio-shared-styles', `
      .inputGio-num-field,
      .inputGio-text-field {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        width: 100%;
        font-family: inherit;
      }
      .inputGio-num-label,
      .inputGio-text-label {
        font-size: 13px;
        color: #A6A0A0;
        user-select: none;
        flex-shrink: 0;
      }
      .inputGio-num-wrap,
      .inputGio-text-wrap {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-color: #414243;
        border: 1px solid #333333;
        border-radius: 12px;
        color: #A6A0A0;
        font-family: inherit;
        font-size: 13px;
        transition: border-color 0.15s, background-color 0.15s;
      }
      .inputGio-num-wrap:hover,
      .inputGio-text-wrap:hover {
        border-color: rgba(77, 170, 252, 0.5);
      }
      .inputGio-num-wrap.inputGio-num-editing,
      .inputGio-text-wrap.inputGio-text-editing {
        border-color: #4daafc;
        background-color: #414243;
      }
      .inputGio-num-icon,
      .inputGio-text-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #4daafc;
        opacity: 0.55;
        cursor: pointer;
        flex-shrink: 0;
        transition: opacity 0.15s;
      }
      .inputGio-num-editing .inputGio-num-icon,
      .inputGio-text-editing .inputGio-text-icon {
        display: none;
      }
    `);
  }
};

(function (global) {
  'use strict';

  const U = hacerEditableNumerico._utils;

  class ToolJavaScriptGio {
    static aplicarClase(target, ...clases) {
      const el = (target && target.element) ? target.element : target;
      if (el && el.classList) el.classList.add(...clases);
      return el;
    }
    static removeClass(el, cls) {
      if (el && el.classList) el.classList.remove(cls);
    }
    static addClass(el, cls) {
      if (el && el.classList) el.classList.add(cls);
    }
  }

  class UITheme {
    static set(theme = {}) {
      const root = document.documentElement;
      if (!root || typeof theme !== 'object') return;
      for (const [key, val] of Object.entries(theme)) {
        if (val === undefined || val === null) continue;
        let v = key.trim();
        if (!v.startsWith('--')) v = v.startsWith('ui-') ? `--${v}` : `--ui-${v}`;
        root.style.setProperty(v, String(val).trim());
      }
    }

    static inject() {
      U.injectStyleOnce('ui-core-engine-styles', `
        :root {
          --backg0: #262626;
          --texto: #cccccc;
          --textodisable: #60605f;
          --textoledBrillo: #4e92ff;

          --ui-cad-hud-bg: #14151f;
          --ui-cad-preview-bg: #1c1d2b;

          --ui-margin-top: 4px;
          --ui-margin-right: 4px;
          --ui-margin-bottom: 4px;
          --ui-margin-left: 4px;
          --ui-margin: var(--ui-margin-top) var(--ui-margin-right) var(--ui-margin-bottom) var(--ui-margin-left);
          --ui-panel-margin: var(--ui-margin);
          --ui-btn-margin: 0px;
          --ui-input-margin: 0px;
          --ui-label-margin: 0px;
          --ui-slider-margin: var(--ui-margin);
          --ui-accordion-margin: var(--ui-margin);
          --ui-info-margin: var(--ui-margin);
          --ui-table-margin: var(--ui-margin);
          --ui-list-margin: var(--ui-margin);
          --ui-list-item-margin: 3px 0px;
          --ui-modal-item-margin: 3px 0px;
          --ui-container-padding: 8px;
          --ui-container-gap: 8px;
          --ui-panel-body-padding: 10px;
          --ui-panel-body-gap: 8px;
          --ui-accentBt: rgba(39, 39, 39, 0.77);
          --ui-text-mainBTHover: rgba(41, 41, 41, 0.77);

          --ui-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          --ui-font-family-mono: "SF Mono", Menlo, Consolas, monospace;
          --ui-font-weight-normal: 400;
          --ui-font-weight-medium: 500;
          --ui-font-weight-semibold: 600;
          --ui-font-weight-bold: 700;

          --ui-font-size-badge: 12px;
          --ui-font-size-cajon-tag: 12px;
          --ui-font-size-table-card-label: 12px;
          --ui-font-size-layout-date: 12px;
          --ui-font-size-label: 12px;
          --ui-font-size-seg: 12px;
          --ui-font-size-info: 12px;
          --ui-font-size-accordion-title: 12px;
          --ui-font-size-slider-label: 12px;
          --ui-font-size-cajon-input: 12px;
          --ui-font-size-table-footer: 12px;
          --ui-font-size-tooltip-info: 12px;
          --ui-font-size-panel-title: 12px;
          --ui-font-size-btn: 12px;
          --ui-font-size-input: 12px;
          --ui-font-size-select: 12px;
          --ui-font-size-table: 12px;
          --ui-font-size-table-card-row: 12px;
          --ui-font-size-reorder-item: 12px;
          --ui-font-size-tooltip-title: 12px;
          --ui-font-size-icon-btn: 12px;
          --ui-font-size-info-close: 12px;
          --ui-font-size-layout-name: 12px;
          --ui-font-size-accordion-arrow: 12px;
          --ui-font-size-cajon-btn: 12px;

          --ui-letter-spacing-sm: 0.2px;
          --ui-letter-spacing-title: 0.4px;

          --ui-btn-height: 32px;
          --ui-container-w: 290px;
          --ui-container-h: calc(100vh - 48px);
          --ui-container-floating-max-h: 85vh;
          --ui-container-header-h: 36px;
          --ui-panel-width: 290px;
          --ui-panel-header-h: 36px;
          --ui-panel-collapsed-h: 36px;

          --ui-slider-card-padding: 8px 10px;

          --ui-list-max-h: 220px;
          --ui-modal-width: 380px;
          --ui-modal-header-h: 38px;
          --ui-modal-max-h: 85vh;
          --ui-modal-list-max-h: 260px;
          --ui-square-btn-size: 38px;

          --ui-bg-base: #000000;
          --ui-bg-panel: #1e1e1e;
          --ui-bg-surface: #404040a6;
          --ui-bg-surface-hover: #2e2e2e;
          --ui-bg-input: #333333;
          --ui-bg-tr-hover: #272727;
          --ui-bg-modal-item: #212121;
          --ui-bg-modal-item-hover: #282828;
          --ui-bg-reorder-active: #292929;
          --ui-modal-backdrop-bg: rgba(0, 0, 0, 0.75);
          --ui-bg-segmented: #414243;

          --ui-border: #393939;
          --ui-border-hover: #444444;
          --ui-border-subtle: #2c2c2c;
          --ui-border-list: #3a3a3a;
          --ui-accentaccordion: rgba(92, 156, 230, 0.23);

          --ui-radius-sm: 6px;
          --ui-radius-lg: 8px;
          --ui-radius-pill: 100px;

          --ui-text-main: #b8b1b1;
          --ui-text-muted: #8a8a8a;
          --ui-text-dim: #555555;
          --ui-text-subtle: #919191;
          --ui-text-hover: #ffffff;
          --ui-text-panel-title: #4daafcc9;

          --ui-btn-bg: #373737;
          --ui-danger-color: #FFAA95;

          --ui-accent: #4daafc;
          --ui-accent-glow: rgba(92, 156, 230, 0.15);
          --ui-accent-snap-border: rgba(92, 156, 230, 0.5);
          --ui-accent-snap-shadow: rgba(92, 156, 230, 0.4);
          --ui-accent-placeholder-bg: rgba(92, 156, 230, 0.08);
          --ui-accent-btn-shadow: rgba(92, 156, 230, 0.38);

          --ui-badge-bg: #191919;
          --ui-scrollbar-size: 5px;

          --ui-shadow-floating: 0 16px 36px rgba(0, 0, 0, 0.65), 0 0 0 1px var(--ui-border);
          --ui-shadow-panel: 0 16px 36px rgba(0, 0, 0, 0.65);
          --ui-shadow-static: 0 4px 14px rgba(0, 0, 0, 0.45);
          --ui-shadow-tooltip: 0 12px 24px rgba(0, 0, 0, 0.6);
          --ui-shadow-modal: 0 24px 50px rgba(0, 0, 0, 0.85);
          --ui-shadow-btn-floating: 0 4px 12px rgba(0, 0, 0, 0.5);
          --ui-shadow-guide: 0 0 10px rgba(92, 156, 230, 0.5);
          --ui-shadow-dropdown: 0 10px 30px rgba(0, 0, 0, 0.6);

          --ui-transition-fast: 0.2s ease;
          --ui-transition-base: 0.2s ease;
          --ui-opacity-disabled: 0.35;
          --ui-opacity-dragged: 0.95;
          --ui-opacity-drag-item: 0.30;

          --ui-cp-wheel-size: 210px;
          --ui-cp-triangle-w: 130px;
          --ui-cp-triangle-h: 115px;
          --ui-cp-pointer-ring-size: 14px;
          --ui-cp-pointer-tri-size: 10px;
          --ui-cp-slider-row-h: 16px;
          --ui-cp-preview-size: 24px;
          --ui-cp-stat-val-color: #a8d5a8;
          --ui-cp-stat-sat-color: #e0b96c;
        }

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: var(--ui-font-family);
          scrollbar-width: thin;
          scrollbar-color: var(--ui-border-list) transparent;
        }

        .ui-select-wrap,
        .ui-date-picker-wrap {
          position: relative;
          width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
          margin: var(--ui-input-margin);
          user-select: none;
          flex-shrink: 0 !important;
        }

        .ui-select-trigger,
        .ui-date-trigger {
          width: 100%;
          background-color: var(--ui-bg-input);
          color: var(--ui-text-main);
          border: 1px solid var(--ui-border);
          padding: 0 14px;
          height: var(--ui-btn-height);
          font-size: var(--ui-font-size-select);
          font-family: inherit;
          border-radius: var(--ui-radius-sm);
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all var(--ui-transition-fast);
          outline: none;
          box-sizing: border-box;
          text-align: left;
        }

        .ui-date-trigger {
          border-color: var(--ui-border-list);
          padding: 0 12px;
        }

        .ui-select-trigger:hover:not(:disabled),
        .ui-date-trigger:hover:not(:disabled) {
          background-color: var(--ui-bg-surface-hover);
          border-color: var(--ui-border-hover);
        }

        .ui-select-trigger:hover:not(:disabled) {
          color: rgba(92, 156, 230, 0.7);
        }

        .ui-date-trigger:hover:not(:disabled) {
          color: var(--ui-text-hover);
        }

        .ui-select-wrap.is-open .ui-select-trigger,
        .ui-date-picker-wrap.is-open .ui-date-trigger {
          background-color: var(--ui-bg-surface-hover);
          border-color: var(--ui-accent);
          box-shadow: 0 0 0 3px var(--ui-accent-glow);
        }

        .ui-select-trigger:disabled,
        .ui-date-trigger:disabled,
        .ui-select-wrap.disabled .ui-select-trigger {
          opacity: var(--ui-opacity-disabled);
          cursor: not-allowed;
          pointer-events: none;
        }

        .ui-select-label-text,
        .ui-date-display {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: var(--ui-font-size-select);
          color: var(--ui-text-main);
          flex: 1;
          text-align: left;
          transition: color 0.2s ease;
        }

        .ui-select-trigger:hover .ui-select-label-text {
          color: var(--ui-text-hover);
        }

        .ui-select-arrow-svg,
        .ui-date-arrow-icon {
          width: 12px;
          height: 12px;
          stroke: var(--ui-text-muted);
          transition: transform var(--ui-transition-base), stroke var(--ui-transition-fast);
          flex-shrink: 0;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ui-select-trigger:hover .ui-select-arrow-svg {
          stroke: rgba(92, 156, 230, 0.7);
        }

        .ui-select-wrap.is-open .ui-select-arrow-svg,
        .ui-date-picker-wrap.is-open .ui-date-arrow-icon {
          transform: rotate(180deg);
          stroke: var(--ui-accent);
        }

        .ui-select-wrap .dropdown-menu {
          position: absolute !important;
          top: calc(100% + 6px);
          left: 0;
          right: 0;
          width: 100%;
          box-sizing: border-box;
          background: var(--ui-bg-panel);
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
          box-shadow: var(--ui-shadow-dropdown);
          z-index: 1000;
          list-style: none;
          padding: 6px;
          margin: 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
          max-height: 240px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ui-select-wrap.is-open .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          padding: 9px 12px;
          font-size: var(--ui-font-size-select);
          color: var(--ui-text-muted);
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
        }

        .dropdown-item:hover {
          background: var(--ui-bg-surface-hover);
          color: rgba(92, 156, 230, 0.9);
        }

        .dropdown-item.active {
          background: rgba(92, 156, 230, 0.12) !important;
          color: var(--ui-accent) !important;
          font-weight: 500;
        }

        .dropdown-item.active::after {
          content: '';
          width: 9px;
          height: 5px;
          border-left: 2px solid var(--ui-accent);
          border-bottom: 2px solid var(--ui-accent);
          transform: rotate(-45deg);
          margin-top: -3px;
          flex-shrink: 0;
        }

        .ui-date-trigger-text {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          overflow: hidden;
        }

        .ui-date-icon {
          width: 14px;
          height: 14px;
          stroke: var(--ui-text-muted);
          transition: stroke var(--ui-transition-fast);
          flex-shrink: 0;
        }

        .ui-date-trigger:hover .ui-date-icon,
        .ui-date-picker-wrap.is-open .ui-date-icon {
          stroke: var(--ui-accent);
        }

        .ui-calendar-dropdown {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          width: 275px;
          background: var(--ui-bg-panel);
          border: 1px solid var(--ui-border-list);
          border-radius: var(--ui-radius-lg);
          box-shadow: var(--ui-shadow-dropdown);
          z-index: 1000;
          padding: 12px;
          display: none;
          flex-direction: column;
          box-sizing: border-box;
        }

        .ui-date-picker-wrap.is-open .ui-calendar-dropdown {
          display: flex;
        }

        .ui-calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .ui-calendar-nav-btn {
          background: transparent;
          border: 1px solid var(--ui-border-list);
          color: var(--ui-text-muted);
          width: 24px;
          height: 24px;
          border-radius: var(--ui-radius-sm);
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all var(--ui-transition-fast);
        }

        .ui-calendar-nav-btn:hover {
          background: var(--ui-bg-surface-hover);
          color: var(--ui-text-hover);
          border-color: var(--ui-accent);
        }

        .ui-calendar-nav-btn svg {
          width: 12px;
          height: 12px;
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
        }

        .ui-calendar-month-year {
          font-size: var(--ui-font-size-panel-title);
          font-weight: var(--ui-font-weight-semibold);
          color: var(--ui-text-main);
          text-transform: capitalize;
        }

        .ui-calendar-weekdays {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
          margin-bottom: 6px;
        }

        .ui-calendar-weekday {
          text-align: center;
          font-size: 10px;
          color: var(--ui-text-dim);
          font-weight: var(--ui-font-weight-bold);
          text-transform: uppercase;
          padding: 2px 0;
        }

        .ui-calendar-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 2px;
        }

        .ui-calendar-day {
          aspect-ratio: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 11px;
          color: var(--ui-text-muted);
          border-radius: var(--ui-radius-sm);
          cursor: pointer;
          transition: all var(--ui-transition-fast);
          border: 1px solid transparent;
        }

        .ui-calendar-day:hover:not(.empty):not(.disabled) {
          background: var(--ui-bg-surface-hover);
          color: var(--ui-text-hover);
          border-color: var(--ui-border);
        }

        .ui-calendar-day.empty {
          cursor: default;
          opacity: 0.2;
        }

        .ui-calendar-day.disabled {
          color: var(--ui-text-dim);
          cursor: not-allowed;
          opacity: var(--ui-opacity-disabled);
        }

        .ui-calendar-day.today {
          color: var(--ui-accent);
          font-weight: var(--ui-font-weight-bold);
          border-color: var(--ui-accent);
        }

        .ui-calendar-day.selected {
          background: var(--ui-accent) !important;
          color: var(--ui-text-hover) !important;
          font-weight: var(--ui-font-weight-semibold);
          border-color: var(--ui-accent) !important;
        }

        .ui-calendar-day.in-range {
          background: var(--ui-accent-placeholder-bg);
          color: var(--ui-text-main);
          border-radius: 0;
        }

        .ui-calendar-day.range-start {
          background: var(--ui-accent) !important;
          color: var(--ui-text-hover) !important;
          border-radius: var(--ui-radius-sm) 0 0 var(--ui-radius-sm);
        }

        .ui-calendar-day.range-end {
          background: var(--ui-accent) !important;
          color: var(--ui-text-hover) !important;
          border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;
        }

        .ui-calendar-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          padding-top: 8px;
          border-top: 1px solid var(--ui-border);
        }

        .ui-calendar-footer-info {
          font-size: 10px;
          color: var(--ui-text-dim);
        }

        .ui-calendar-btn-clear {
          background: transparent;
          border: 1px solid var(--ui-border-list);
          color: var(--ui-text-muted);
          padding: 2px 8px;
          font-size: 10px;
          border-radius: var(--ui-radius-sm);
          cursor: pointer;
          transition: all var(--ui-transition-fast);
        }

        .ui-calendar-btn-clear:hover {
          background: rgba(255, 107, 107, 0.1);
          color: var(--ui-danger-color);
          border-color: var(--ui-danger-color);
        }

        *::-webkit-scrollbar {
          width: var(--ui-scrollbar-size);
          height: var(--ui-scrollbar-size);
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background: var(--ui-border-list);
          border-radius: var(--ui-radius-pill);
        }
        *::-webkit-scrollbar-thumb:hover {
          background: var(--ui-accent);
        }

        html, body {
          background-color: var(--ui-bg-base);
          min-height: 100vh;
          max-width: 100vw;
          overflow-x: hidden;
        }

        #stage {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: none;
          cursor: default;
          background-color: #282a2cd2;
        }
        #stage.is-panning { cursor: grabbing; }
        #stage.is-drawing { cursor: crosshair; }

        #viewport {
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: 0 0;
          will-change: transform;
        }

        #layersStack {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .engine-canvas-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          border: 7px solid rgba(26, 135, 208, 0.08);
          border-radius: 7px;
        }

        .engine-layer-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          pointer-events: none;
        }

        #gridCanvas { pointer-events: none; z-index: 1; }
        #liveCanvas { pointer-events: none; z-index: 998; }
        #originCanvas { pointer-events: none; z-index: 999; }

        .cad-hud {
          position: fixed;
          bottom: 16px;
          right: 16px;
          background: var(--ui-cad-hud-bg, var(--ui-bg-panel));
          color: var(--ui-accent);
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
          padding: 6px 12px;
          font-family: var(--ui-font-family-mono);
          font-size: var(--ui-font-size-badge);
          font-weight: var(--ui-font-weight-medium);
          pointer-events: none;
          z-index: 99999;
          box-shadow: var(--ui-shadow-floating);
          letter-spacing: var(--ui-letter-spacing-sm);
        }

        .color-preview-pill {
          display: inline-block;
          width: 24px;
          height: 24px;
          border-radius: var(--ui-radius-sm);
          border: 1px solid var(--ui-border);
          vertical-align: middle;
          margin-left: 6px;
        }

        .preview-box {
          display: block;
          margin: 6px auto;
          background: var(--ui-cad-preview-bg, var(--ui-bg-input));
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
          box-sizing: border-box;
        }

        .editor-preview {
          display: block;
          margin: 6px 0;
          width: 100%;
          height: 60px;
          background: var(--ui-cad-preview-bg, var(--ui-bg-input));
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
        }

        .editor {
          display: block;
          margin: 8px auto;
          background: var(--ui-cad-preview-bg, var(--ui-bg-input));
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
          touch-action: none;
          cursor: crosshair;
        }

        .layer-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 8px;
          margin-bottom: 4px;
          background-color: var(--ui-bg-input);
          border-radius: 10px;
          cursor: pointer;
          font-size: var(--ui-font-size-table);
          color: var(--ui-text-main);
          transition: all var(--ui-transition-fast);
          flex-shrink: 0;
        }

        .layer-item-row:hover {
          border-color: var(--ui-border-hover);
          background: var(--ui-bg-surface-hover);
        }

        .layer-item-row.is-active {
          background-color: var(--ui-bg-input);
        }

        .layer-actions-mini {
          display: flex;
          gap: 4px;
        }

        .layer-actions-miniflexEnd {
          display: flex;
          gap: 4px;
          overflow: auto;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-end;
          align-items: center;
          align-content: space-evenly;
          color: var(--ui-text-main);
        }

        .mini-btn {
          background: var(--ui-btn-bg);
          border: 1px solid var(--ui-border);
          color: var(--ui-text-muted);
          padding: 2px 6px;
          border-radius: var(--ui-radius-sm);
          cursor: pointer;
          font-size: var(--ui-font-size-cajon-tag);
          transition: all var(--ui-transition-fast);
        }

        .mini-btn:hover {
          background: var(--ui-bg-input);
          border-color: var(--ui-accent);
          color: var(--ui-text-hover);
        }

        .ui-container {
          display: flex;
          box-sizing: border-box;
          padding: var(--ui-container-padding);
          gap: var(--ui-container-gap);
          background: transparent;
          position: relative;
          min-width: 0;
          min-height: 0;
        }

        .ui-container-column {
          flex-direction: column;
          width: var(--ui-container-w);
          max-width: 100%;
          height: var(--ui-container-h);
          overflow-y: auto;
          overflow-x: hidden;
          align-items: stretch;
        }

        .ui-container-row {
          flex-direction: row;
          height: var(--ui-container-h, auto);
          width: var(--ui-container-w, 100%);
          overflow-x: auto;
          overflow-y: hidden;
          align-items: flex-start;
        }

        .ui-container.is-hidden { display: none !important; }

        .ui-container.is-floating {
          position: fixed !important;
          z-index: 900;
          background: var(--ui-bg-panel);
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-lg);
          box-shadow: var(--ui-shadow-floating);
          height: auto !important;
          max-height: var(--ui-container-floating-max-h);
          overflow-y: auto;
        }

        .ui-container-header {
          height: var(--ui-container-header-h);
          min-height: var(--ui-container-header-h);
          background: var(--ui-bg-surface);
          border-bottom: 1px solid var(--ui-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          cursor: grab;
        }
        .ui-container-header:active { cursor: grabbing; }

        .ui-panel-placeholder {
          border: 1.5px dashed var(--ui-accent);
          border-radius: var(--ui-radius-lg);
          background: var(--ui-accent-placeholder-bg);
          box-sizing: border-box;
          min-height: 52px;
          width: 100%;
          flex-shrink: 0;
          pointer-events: none;
          margin: var(--ui-panel-margin);
        }

        .ui-panel {
          width: var(--ui-panel-width);
          max-width: 100%;
          background: var(--ui-bg-panel);
          border-radius: var(--ui-radius-lg);
          border: 1px solid var(--ui-border);
          display: flex;
          flex-direction: column;
          box-shadow: var(--ui-shadow-panel);
          position: absolute;
          z-index: 100;
          transition: border-color var(--ui-transition-fast), box-shadow var(--ui-transition-fast);
          flex-shrink: 0;
          margin: var(--ui-panel-margin);
          box-sizing: border-box;
          overflow: hidden;
          min-height: 300px;
          max-height: calc(100vh - 48px);
        }
        .ui-panel.is-hidden { display: none !important; }

        .ui-panel.ui-panel-static {
          position: relative !important;
          left: auto !important;
          top: auto !important;
          width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right))) !important;
          height: auto !important;
          max-height: none !important;
          z-index: 1 !important;
          box-shadow: var(--ui-shadow-static) !important;
          display: flex;
          flex: 0 0 auto !important;
          margin: var(--ui-panel-margin) !important;
        }

        .ui-panel.is-snapping {
          border-color: var(--ui-accent-snap-border);
          box-shadow: 0 0 16px var(--ui-accent-snap-shadow);
        }
        .ui-panel.is-dragged {
          z-index: 10000 !important;
          opacity: var(--ui-opacity-dragged);
          cursor: grabbing !important;
        }
        .ui-panel.collapsed {
          height: var(--ui-panel-collapsed-h) !important;
          min-height: var(--ui-panel-collapsed-h) !important;
          max-height: var(--ui-panel-collapsed-h) !important;
        }
        .ui-panel.collapsed .ui-panel-body { display: none !important; }

        .ui-panel-header {
          user-select: none;
          -webkit-user-select: none;
          height: var(--ui-panel-header-h);
          min-height: var(--ui-panel-header-h);
          background: var(--ui-bg-surface);
          border-bottom: 1px solid var(--ui-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          cursor: grab;
          flex-shrink: 0;
        }
        .ui-panel-header:active { cursor: grabbing; }
        .ui-header-left { display: flex; align-items: center; gap: 8px; pointer-events: none; }

        .ui-panel-title {
          font-size: var(--ui-font-size-panel-title);
          font-weight: var(--ui-font-weight-semibold);
          color: var(--ui-text-panel-title);
          letter-spacing: var(--ui-letter-spacing-title);
          margin: var(--ui-label-margin);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ui-panel-title::before {
          content: "";
          width: 7px;
          height: 7px;
          border: 1.8px solid var(--ui-border-list);
          border-radius: var(--ui-radius-pill);
          transition: all var(--ui-transition-fast);
        }
        .ui-panel:hover .ui-panel-title::before {
          border-color: var(--ui-accent);
          box-shadow: 0 0 8px var(--ui-accent-glow);
        }

        .ui-header-tools { display: flex; align-items: center; gap: 4px; }

        .ui-icon-btn {
          width: 24px;
          height: 24px;
          border-radius: var(--ui-radius-sm);
          border: 1px solid transparent;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: var(--ui-font-size-icon-btn);
          line-height: 1;
          transition: all var(--ui-transition-fast);
          touch-action: manipulation;
          color: var(--ui-accent);
          text-shadow: 0px 0px 30px var(--ui-accent);
        }
        .ui-icon-btn:hover {
          background: var(--ui-bg-surface-hover);
          border-color: var(--ui-border);
          color: var(--ui-text-hover);
        }
        .ui-icon-btn.active {
          color: var(--ui-accent);
          border-color: var(--ui-accent);
          box-shadow: 0 0 6px var(--ui-accent-glow);
        }

        .ui-panel-body {
          padding: var(--ui-panel-body-padding);
          display: flex;
          flex-direction: column;
          gap: var(--ui-panel-body-gap);
          background: #404040;//var(--ui-bg-input);
          overflow-y: auto !important;
          overflow-x: hidden !important;
          flex: 1 1 auto;
          min-height: 0;
          box-sizing: border-box;
        }
        .ui-panel-body > * {
          flex-shrink: 0 !important;
        }

        .ui-row {
          display: flex;
          flex-wrap: wrap;
          width: 87%;
          box-sizing: border-box;
        }
        .ui-row > * {
          min-width: 50px;
          flex: 1 1 50px;
          margin: 7px;
          box-sizing: border-box;
        }
        .ui-row-align-0 { justify-content: flex-start; }
        .ui-row-align-0 > * { flex: 1 1 auto; min-width: 0; }
        .ui-row-align-0 > .ui-label { flex: 0 0 auto; }
        .ui-row-align-1 { justify-content: flex-start; }
        .ui-row-align-2 { justify-content: center; }
        .ui-row-align-3 { justify-content: flex-end; }
        .ui-row-align-4 { justify-content: space-between; }
        .ui-row-align-5 { justify-content: space-evenly; }

        .ui-label {
          font-size: var(--ui-font-size-label);
          font-weight: var(--ui-font-weight-medium);
          color: var(--ui-text-muted);
          white-space: nowrap;
          margin: var(--ui-label-margin);
          flex-shrink: 0;
        }

        .ui-btn {
          background: var(--ui-bg-segmented);
          border: 4px solid #404040;
          height: 40px;
          border-radius: 10px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          align-content: center;
          color: var(--texto);
          cursor: pointer;
          font-size: 10px;
        }
        .ui-btn:hover { color: var(--ui-accent); }
        .ui-btn:active { transform: scale(0.98); }
        .ui-btn:disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; pointer-events: none; }
        .ui-btn-danger,
        .ui-btn-danger:hover { color: var(--ui-danger-color); }

        .ui-input {
          background: var(--ui-bg-input);
          border: 1px solid var(--ui-border);
          color: var(--ui-text-main);
          padding: 0 10px;
          border-radius: var(--ui-radius-sm);
          font-size: var(--ui-font-size-input);
          outline: none;
          height: var(--ui-btn-height);
          font-weight: var(--ui-font-weight-normal);
          margin: var(--ui-input-margin);
          transition: all var(--ui-transition-fast);
          max-width: 100%;
          flex-shrink: 0;
        }
        .ui-input::placeholder { color: var(--ui-text-dim); }
        .ui-input:hover { border-color: var(--ui-border-hover); }
        .ui-input:focus {
          border-color: var(--ui-accent);
          box-shadow: 0 0 0 3px var(--ui-accent-glow);
        }
        .ui-input:disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; }
        .ui-input-text { flex: 1; min-width: 0; }
        .ui-input-number {
          width: 65px;
          text-align: center;
          font-variant-numeric: tabular-nums;
          flex-shrink: 0;
        }
        textarea.ui-input {
          height: auto !important;
          min-height: 70px;
          padding: 8px 10px !important;
          line-height: 1.4;
          resize: vertical;
          flex-shrink: 0 !important;
          width: 100%;
        }

        .ui-segmented {
          display: flex;
          background: var(--ui-bg-segmented);
          border: 1px solid var(--ui-border);
          border-radius: 6px;
          padding: 2px;
          width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
          height: auto;
          min-height: var(--ui-btn-height);
          flex-shrink: 0 !important;
          margin: var(--ui-margin);
          overflow-x: auto;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: center;
          align-content: space-evenly;
        }
        .ui-seg-item {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--ui-font-size-seg);
          font-weight: var(--ui-font-weight-medium);
          color: var(--ui-text-muted);
          cursor: pointer;
          border-radius: 4px;
          transition: all var(--ui-transition-base);
          padding: 0 6px;
          touch-action: manipulation;
          min-width: 70px;
          height: 28px;
          margin: 2px;
        }
        .ui-seg-item.active { color: var(--ui-accent); }
        .ui-seg-item:hover { background: var(--ui-bg-input); }

        .ui-checkbox {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          margin: var(--ui-margin);
          touch-action: manipulation;
          flex-shrink: 0 !important;
          min-height: 24px;
          user-select: none;
        }
        .ui-checkbox.disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; pointer-events: none; }
        .ui-checkbox-box {
          width: 16px;
          height: 16px;
          background: transparent;
          border: 1.5px solid var(--ui-border);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0 !important;
        }
        .ui-checkbox:hover .ui-checkbox-box { border-color: var(--ui-text-muted); }
        .ui-checkbox.checked .ui-checkbox-box {
          background: var(--textoledBrillo);
          -webkit-box-shadow: 0px 1px 57px 13px var(--textoledBrillo);
          box-shadow: 0px 1px 57px 13px var(--textoledBrillo);
        }
        .ui-checkbox-mark {
          display: none;
          width: 8px;
          height: 4.5px;
          border-left: 2px solid var(--ui-text-hover);
          border-bottom: 2px solid var(--ui-text-hover);
          transform: rotate(-45deg) translate(0.5px, -0.5px);
        }
        .ui-checkbox.checked .ui-checkbox-mark { display: block; }

        .ui-radio-group {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin: var(--ui-margin);
          flex-shrink: 0 !important;
        }
        .ui-radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; touch-action: manipulation; flex-shrink: 0; }
        .ui-radio-item.disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; pointer-events: none; }
        .ui-radio-circle {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: transparent;
          border: 2.0px solid var(--textodisable);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0 !important;
        }
        .ui-radio-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--textoledBrillo);
          display: none;
          transform: scale(0);
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          -webkit-box-shadow: 0px 1px 57px 13px var(--textoledBrillo);
          box-shadow: 0px 1px 57px 13px var(--textoledBrillo);
        }
        .ui-radio-item:hover .ui-radio-circle { background: var(--ui-accent); }
        .ui-radio-item.active .ui-radio-circle { border-color: var(--ui-accent); }
        .ui-radio-item.active .ui-radio-dot { display: block; transform: scale(1); }

        .ui-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          cursor: pointer;
          margin: var(--ui-margin);
          touch-action: manipulation;
          flex-shrink: 0 !important;
          width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
          max-width: 100px;
        }
        .ui-toggle.disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; pointer-events: none; }
        .ui-toggle-switch {
          width: 32px;
          height: 18px;
          border-radius: 18px;
          position: relative;
          transition: 0.25s;
          flex-shrink: 0 !important;
        }
        .ui-toggle-thumb {
          width: 12px;
          height: 12px;
          background: var(--textodisable);
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 3px;
          transition: 0.25s;
        }
        .ui-toggle.active .ui-toggle-switch { background: var(--backg0); }
        .ui-toggle.active .ui-toggle-thumb {
          transform: translateX(14px);
          background: var(--textoledBrillo);
          -webkit-box-shadow: 0px 1px 57px 13px var(--textoledBrillo);
          box-shadow: 0px 1px 57px 13px var(--textoledBrillo);
        }

        @keyframes ui-highlight {
          0% { background-color: var(--ui-accent-glow); color: var(--ui-text-hover); }
          100% { background-color: rgba(92, 156, 230, 0.1); color: var(--ui-accent); }
        }
        .animate-highlight { animation: ui-highlight 0.5s ease-out; }

        @keyframes ui-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-shake { animation: ui-shake 0.4s ease-in-out; }

        .ui-status-display2 {
          font-family: var(--ui-font-family-mono);
          color: var(--ui-accent);
          font-weight: var(--ui-font-weight-bold);
          font-size: var(--ui-font-size-badge);
          padding: 3px 8px;
          background: rgba(92, 156, 230, 0.1);
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
          transition: var(--ui-transition-fast);
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
        }

        .ui-chk2-label {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: var(--ui-font-size-label);
          color: var(--ui-text-muted);
          transition: var(--ui-transition-fast);
          user-select: none;
          margin: var(--ui-margin);
          touch-action: manipulation;
          flex-shrink: 0 !important;
        }
        .ui-chk2-label:hover { color: var(--ui-text-main); }
        .ui-chk2-label.disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; pointer-events: none; }
        .ui-chk2-custom {
          width: 16px;
          height: 16px;
          border: 2px solid var(--texto);
          border-radius: 4px;
          display: grid;
          place-items: center;
          transition: all 0.2s;
          position: relative;
          flex-shrink: 0 !important;
          background: var(--ui-bg-input);
        }
        .ui-chk2-custom::after {
          content: '';
          width: 8px;
          height: 4.5px;
          border-left: 2px solid var(--ui-text-hover);
          border-bottom: 2px solid var(--ui-text-hover);
          transform: rotate(-45deg) scale(0);
          transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .ui-chk2-input { position: absolute; opacity: 0; width: 0; height: 0; }
        .ui-chk2-label.checked .ui-chk2-custom::after { transform: rotate(-45deg) scale(1); }

        .ui-tgl2-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--ui-text-muted);
          font-size: var(--ui-font-size-label);
          user-select: none;
          gap: 10px;
          margin: var(--ui-margin);
          width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
          touch-action: manipulation;
          flex-shrink: 0 !important;
        }
        .ui-tgl2-wrapper.disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; pointer-events: none; }
        .ui-tgl2-container {
          position: relative;
          width: 32px;
          height: 18px;
          cursor: pointer;
          flex-shrink: 0 !important;
        }
        .ui-tgl2-input { display: none; }
        .ui-tgl2-track {
          position: absolute;
          inset: 0;
          background-color: var(--ui-border);
          border-radius: 18px;
          transition: 0.25s;
        }
        .ui-tgl2-thumb {
          position: absolute;
          width: 12px;
          height: 12px;
          background-color: #888888;
          border-radius: 50%;
          top: 3px;
          left: 3px;
          transition: 0.25s;
        }
        .ui-tgl2-container.active .ui-tgl2-track { background-color: var(--ui-accent); }
        .ui-tgl2-container.active .ui-tgl2-thumb { left: 17px; background-color: var(--ui-text-hover); }

        .ui-input2-group {
          position: relative;
          display: flex;
          flex-direction: column;
          width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
          margin: var(--ui-input-margin);
          flex-shrink: 0 !important;
        }
        .ui-styled-input2 {
          background: transparent;
          border: none;
          border-bottom: 1.5px solid var(--ui-border);
          color: var(--ui-text-main);
          padding: 7px 0;
          font-size: var(--ui-font-size-input);
          font-family: inherit;
          width: 100%;
          transition: var(--ui-transition-fast);
          border-radius: 0;
          outline: none;
        }
        .ui-styled-input2:focus { outline: none; border-bottom-color: var(--ui-accent); }
        .ui-input-line-fx2 {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--ui-accent);
          transition: width var(--ui-transition-base) ease-out;
          box-shadow: 0 0 6px var(--ui-accent-glow);
          pointer-events: none;
        }
        .ui-styled-input2:focus ~ .ui-input-line-fx2 { width: 100%; }
        .ui-styled-input2:disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; }

        .ui-btn2 {
          flex: 1;
          padding: 0 16px;
          height: var(--ui-btn-height);
          border-radius: var(--ui-radius-sm);
          font-size: var(--ui-font-size-btn);
          font-weight: var(--ui-font-weight-semibold);
          cursor: pointer;
          transition: all var(--ui-transition-fast);
          position: relative;
          color: var(--ui-text-main);
          border: 1px solid var(--ui-border);
          overflow: hidden;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-sizing: border-box;
          margin: var(--ui-btn-margin);
          touch-action: manipulation;
          flex-shrink: 0 !important;
        }
        .ui-btn2:active { transform: scale(0.98); }
        .ui-btn2-primary {
          background: var(--ui-accentBt);
          border-radius: 10px;
          border: none;
          color: var(--ui-text-hover);
        }
        .ui-btn2-primary:hover { color: var(--ui-text-mainBTHover); }
        .ui-btn2-reset { background: transparent; color: var(--ui-text-muted); }
        .ui-btn2-reset:hover { background: rgba(255, 255, 255, 0.05); color: var(--ui-text-main); }

        .ui-info-box {
          background: var(--ui-bg-panel);
          border: 1px solid var(--ui-border-list);
          border-left: 3px solid var(--ui-accent);
          padding: 8px 12px;
          border-radius: var(--ui-radius-sm);
          font-size: var(--ui-font-size-info);
          color: var(--ui-text-muted);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
          transition: opacity var(--ui-transition-base), transform var(--ui-transition-base);
          flex-shrink: 0 !important;
          margin: var(--ui-info-margin);
          word-break: break-word;
        }
        .ui-info-box.fade-out { opacity: 0; transform: translateY(-4px); }
        .ui-info-close {
          background: none;
          border: none;
          color: var(--ui-text-muted);
          cursor: pointer;
          font-size: var(--ui-font-size-info-close);
          line-height: 1;
          padding: 6px;
          touch-action: manipulation;
        }
        .ui-info-close:hover { color: var(--ui-text-hover); }

        .ui-accordion {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
          flex-shrink: 0 !important;
          margin: var(--ui-accordion-margin);
        }
        .ui-accordion-item {
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
          background: var(--ui-bg-surface);
          transition: border-color var(--ui-transition-base);
          overflow: hidden;
          flex-shrink: 0 !important;
        }
        .ui-accordion-item.open {
          border-color: var(--ui-accentaccordion);
          border-radius: 7px;
          -webkit-box-shadow: 50px 5px 40px -2px #000000c7;
          box-shadow: 50px 5px 40px -2px #000000c7;
        }
        .ui-accordion-header {
          min-height: 36px;
          padding: 6px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          background: transparent;
          transition: background var(--ui-transition-fast);
          touch-action: manipulation;
        }
        .ui-accordion-header:hover { background: var(--ui-bg-surface-hover); }
        .ui-accordion-title {
          font-size: var(--ui-font-size-accordion-title);
          font-weight: var(--ui-font-weight-medium);
          color: var(--ui-text-muted);
        }
        .ui-accordion-item.open .ui-accordion-title { color: var(--ui-text-main); }
        .ui-accordion-arrow {
          font-size: var(--ui-font-size-accordion-arrow);
          color: var(--ui-text-dim);
          transition: transform var(--ui-transition-base);
        }
        .ui-accordion-item.open .ui-accordion-arrow { transform: rotate(90deg); color: var(--ui-accent); }
        .ui-accordion-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows var(--ui-transition-base);
          background: var(--ui-bg-input);
        }
        .ui-accordion-item.open .ui-accordion-content { grid-template-rows: 1fr; }
        .ui-accordion-body {
          overflow: hidden;
          min-height: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0 10px;
          transition: padding var(--ui-transition-base);
        }
        .ui-accordion-body > * { flex-shrink: 0 !important; }
        .ui-accordion-item.open .ui-accordion-body { padding: 10px; }

        .ui-slider-card {
          width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
          background: var(--ui-bg-surface);
          border: 4px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
          padding: var(--ui-slider-card-padding);
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-shrink: 0 !important;
          margin: var(--ui-slider-margin);
          transition: box-shadow 1s ease, border-color 1s ease;
        }
        .ui-slider-card:hover {
          -webkit-box-shadow: 20px 2px 40px 7px #000000;
          box-shadow: 20px 2px 40px 7px #000000;
        }
        .ui-slider-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          width: 100%;
        }
        .ui-slider-label {
          font-size: var(--ui-font-size-slider-label);
          font-weight: var(--ui-font-weight-medium);
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--texto);
        }
        .ui-slider-label:hover { color: var(--ui-accent); }
        .ui-slider-header-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .ui-slider-val {
          font-size: 11px;
          font-family: var(--ui-font-family-mono);
          color: var(--ui-text-main);
          background: var(--ui-bg-input);
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid var(--ui-border);
          cursor: pointer;
        }
        .ui-cajon-btn {
          width: 22px;
          height: 22px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--ui-text-dim);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--ui-font-size-cajon-btn);
          border-radius: var(--ui-radius-sm);
          transition: all var(--ui-transition-base);
          touch-action: manipulation;
        }
        .ui-cajon-btn:hover { color: var(--ui-text-hover); border-color: var(--ui-border); }
        .ui-slider-card.open .ui-cajon-btn { transform: rotate(180deg); color: var(--ui-accent); }

        .ui-slider-content { display: flex; align-items: center; width: 100%; padding: 4px 0; }
        .ui-slider-track {
          width: 100%;
          position: relative;
          height: 4px;
          display: flex;
          align-items: center;
          cursor: pointer;
          border-radius: 2px;
          background-color: var(--ui-bg-input);
          border: none;
          touch-action: none;
        }
        .ui-slider-bg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
        .ui-slider-fill {
          position: absolute;
          height: 1px;
          background: #b9b9b9;
          border-radius: 2px;
          width: 0%;
          pointer-events: none;
        }
        .ui-slider-thumb {
          width: 14px;
          height: 14px;
          background: #4a4a4a;
          border: 2.5px solid #b2b2b2;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
          pointer-events: none;
          transition: transform 0.1s, background 0.1s;
        }
        .ui-slider-track:hover .ui-slider-thumb {
          transform: translate(-50%, -50%) scale(1.1);
          background: rgb(153, 153, 150);
        }

        .ui-slider-box {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows var(--ui-transition-base);
          background: var(--ui-bg-input);
          border-radius: var(--ui-radius-sm);
        }
        .ui-slider-card.open .ui-slider-box {
          grid-template-rows: 1fr;
          border: 1px solid var(--ui-border);
          margin-top: 2px;
        }
        .ui-slider-box-inner {
          overflow: hidden;
          min-height: 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px;
          gap: 6px;
          transition: padding var(--ui-transition-base);
        }
        .ui-slider-card.open .ui-slider-box-inner { padding: 8px; }
        .ui-cajon-tag {
          font-size: var(--ui-font-size-cajon-tag);
          font-weight: var(--ui-font-weight-medium);
          color: var(--ui-text-muted);
        }
        .ui-cajon-group { display: flex; align-items: center; gap: 4px; }
        .ui-cajon-input {
          width: 50px;
          text-align: center;
          height: 24px;
          padding: 0 4px;
          font-size: var(--ui-font-size-cajon-input);
        }

        .ui-snap-guide {
          position: fixed;
          pointer-events: none;
          z-index: 99990;
          border: 1.5px dashed var(--ui-accent);
          border-radius: var(--ui-radius-lg);
          background: var(--ui-accent-placeholder-bg);
          display: none;
          box-sizing: border-box;
        }
        .ui-guide-line {
          position: fixed;
          pointer-events: none;
          z-index: 999998;
          background: var(--ui-accent);
          box-shadow: var(--ui-shadow-guide);
          display: none;
        }
        .ui-guide-v { width: 1px; top: 0; bottom: 0; }
        .ui-guide-h { height: 1px; left: 0; right: 0; }

        .ui-table-container {
          width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: var(--ui-bg-panel);
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
          overflow: hidden;
          flex-shrink: 0 !important;
          margin: var(--ui-table-margin);
        }
        .ui-table-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 8px 10px;
          background: var(--ui-bg-surface);
          border-bottom: 1px solid var(--ui-border);
          flex-wrap: wrap;
        }
        .ui-table-search { flex: 1; min-width: 140px; }
        .ui-table-scroll { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .ui-table { width: 100%; border-collapse: collapse; text-align: left; font-size: var(--ui-font-size-table); }
        .ui-table th {
          background: var(--ui-bg-surface);
          color: var(--ui-text-muted);
          font-weight: var(--ui-font-weight-medium);
          padding: 8px 10px;
          border-bottom: 1px solid var(--ui-border);
          white-space: nowrap;
          cursor: grab;
        }
        .ui-table th.drag-over { background: var(--ui-bg-reorder-active); border-left: 2px solid var(--ui-accent); }
        .ui-table td {
          padding: 8px 10px;
          border-bottom: 1px solid var(--ui-border-subtle);
          color: var(--ui-text-main);
          white-space: nowrap;
          vertical-align: middle;
        }
        .ui-table tr:hover td { background: var(--ui-bg-tr-hover); color: var(--ui-text-hover); }
        .ui-table-actions-cell { display: flex; align-items: center; gap: 6px; }
        .ui-table-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          background: var(--ui-bg-surface);
          border-top: 1px solid var(--ui-border);
          font-size: var(--ui-font-size-table-footer);
          color: var(--ui-text-muted);
          flex-wrap: wrap;
          gap: 6px;
        }
        .ui-table-pagination { display: flex; align-items: center; gap: 6px; margin-left: auto; }
        .ui-table-cards { display: none; flex-direction: column; gap: 8px; padding: 8px; }
        .ui-table-card {
          background: var(--ui-bg-surface);
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ui-table-card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: var(--ui-font-size-table-card-row);
          border-bottom: 1px solid var(--ui-border-subtle);
          padding-bottom: 4px;
        }
        .ui-table-card-label {
          color: var(--ui-text-muted);
          font-weight: var(--ui-font-weight-medium);
          font-size: var(--ui-font-size-table-card-label);
        }
        .ui-table-card-val { color: var(--ui-text-main); }

        .ui-reorder-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
          max-height: var(--ui-list-max-h);
          overflow-y: auto !important;
          overflow-x: hidden !important;
          background: var(--ui-bg-input);
          border: 1px solid var(--ui-border-list);
          border-radius: var(--ui-radius-sm);
          padding: 6px;
          box-sizing: border-box;
          flex-shrink: 0 !important;
          margin: var(--ui-list-margin);
        }
        .ui-reorder-list > * { flex-shrink: 0 !important; }
        .ui-reorder-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          background: var(--ui-bg-surface);
          border-radius: 4px;
          cursor: grab;
          border: 1px solid transparent;
          font-size: var(--ui-font-size-reorder-item);
          color: var(--ui-text-subtle);
          touch-action: pan-y;
          transition: transform var(--ui-transition-fast), background-color var(--ui-transition-fast), border-color var(--ui-transition-fast);
          width: 100%;
          margin: var(--ui-list-item-margin);
          flex-shrink: 0 !important;
        }
        .ui-reorder-item:active { cursor: grabbing; }
        .ui-reorder-item.active {
          background: var(--ui-bg-reorder-active);
          border-color: var(--ui-accent);
          color: var(--ui-text-main);
          box-shadow: 0 0 6px var(--ui-accent-glow);
        }
        .ui-reorder-item.dragging { opacity: var(--ui-opacity-drag-item); transform: scale(0.96); }
        .ui-reorder-item.drag-over { border-color: var(--ui-accent); background: var(--ui-border-subtle); }
        .ui-reorder-item-left { display: flex; align-items: center; gap: 8px; pointer-events: none; }
        .ui-reorder-item-left button { pointer-events: auto; }

        .ui-square-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--ui-radius-sm);
          border: 1px solid var(--ui-border);
          cursor: pointer;
          transition: all var(--ui-transition-fast);
          flex-shrink: 0 !important;
          font-weight: var(--ui-font-weight-medium);
          line-height: 1;
          margin: var(--ui-margin);
          -webkit-tap-highlight-color: transparent;
          box-shadow: var(--ui-shadow-btn-floating);
          width: var(--ui-square-btn-size);
          height: var(--ui-square-btn-size);
          background-color: var(--backg0);
          color: var(--texto);
          font-size: var(--ui-font-size-btn);
          touch-action: none;
        }
        .ui-square-btn:hover {
          border-color: var(--ui-accent);
          box-shadow: 0 0 0 3px var(--ui-accent-glow);
        }
        .ui-draggable-floating {
          position: absolute !important;
          z-index: 1000;
          touch-action: none;
        }
        .ui-draggable-floating.is-dragging {
          z-index: 10001 !important;
          opacity: var(--ui-opacity-dragged);
          cursor: grabbing !important;
        }
        .ui-draggable-floating.is-snapping {
          border-color: var(--ui-accent) !important;
          box-shadow: 0 0 12px var(--ui-accent-btn-shadow) !important;
        }

        .ui-square-tooltip {
          position: fixed;
          z-index: 999999;
          pointer-events: none;
          background: var(--ui-bg-panel);
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
          padding: 8px 12px;
          box-shadow: var(--ui-shadow-tooltip);
          max-width: 240px;
          opacity: 0;
          transform: scale(0.94);
          transition: all var(--ui-transition-fast);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ui-square-tooltip.visible { opacity: 1; transform: scale(1); }
        .ui-square-tooltip-title {
          font-size: var(--ui-font-size-tooltip-title);
          font-weight: var(--ui-font-weight-semibold);
          color: var(--ui-text-main);
        }
        .ui-square-tooltip-info {
          font-size: var(--ui-font-size-tooltip-info);
          color: var(--ui-text-muted);
          line-height: 1.4;
        }

        .ui-layout-modal-backdrop,
        .ui-cp-modal-backdrop {
          position: fixed;
          inset: 0;
          background: var(--ui-modal-backdrop-bg);
          z-index: 9999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px;
        }
        .ui-layout-modal {
          background: var(--ui-bg-panel);
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-lg);
          width: var(--ui-modal-width);
          max-width: 100%;
          box-shadow: var(--ui-shadow-modal);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: uiModalIn var(--ui-transition-base);
        }
        @keyframes uiModalIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .ui-layout-modal-head {
          height: var(--ui-modal-header-h);
          background: var(--ui-bg-surface);
          border-bottom: 1px solid var(--ui-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 14px;
        }
        .ui-layout-modal-body {
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: var(--ui-modal-max-h);
          overflow-y: auto;
        }
        .ui-layout-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: var(--ui-modal-list-max-h);
          overflow-y: auto;
          background: var(--ui-bg-input);
          border: 1px solid var(--ui-border);
          border-radius: var(--ui-radius-sm);
          padding: 6px;
        }
        .ui-layout-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 7px 10px;
          background: var(--ui-bg-modal-item);
          border: 1px solid transparent;
          border-radius: 4px;
          margin: var(--ui-modal-item-margin);
          transition: all var(--ui-transition-fast);
          flex-shrink: 0;
        }
        .ui-layout-item:hover {
          border-color: var(--ui-accent);
          background: var(--ui-bg-modal-item-hover);
        }
        .ui-layout-meta { display: flex; flex-direction: column; gap: 3px; overflow: hidden; }
        .ui-layout-name {
          font-size: var(--ui-font-size-layout-name);
          font-weight: var(--ui-font-weight-medium);
          color: var(--ui-text-main);
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .ui-layout-date {
          font-size: var(--ui-font-size-layout-date);
          color: var(--ui-text-muted);
          font-variant-numeric: tabular-nums;
        }
        .ui-layout-actions { display: flex; align-items: center; gap: 6px; }
        .ui-badge-app {
          font-size: var(--ui-font-size-badge);
          background: var(--ui-badge-bg);
          color: var(--ui-text-muted);
          padding: 2px 7px;
          border-radius: var(--ui-radius-pill);
          font-weight: var(--ui-font-weight-medium);
          border: 1px solid var(--ui-border);
        }

        .ui-cp-root {
          user-select: none;
          -webkit-user-select: none;
          width: 100%;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          flex-shrink: 0;
        }
        .ui-cp-wheel {
          position: relative;
          width: var(--ui-cp-wheel-size);
          height: var(--ui-cp-wheel-size);
          margin: 10px auto;
          display: flex;
          justify-content: center;
          align-items: center;
          touch-action: none;
          flex-shrink: 0;
        }
        .ui-cp-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%));
          -webkit-mask-image: radial-gradient(transparent 64%, black 65%);
          mask-image: radial-gradient(transparent 64%, black 65%);
          cursor: crosshair;
          touch-action: none;
        }
        .ui-cp-triangle {
          position: absolute;
          width: var(--ui-cp-triangle-w);
          height: var(--ui-cp-triangle-h);
          cursor: crosshair;
          touch-action: none;
        }
        .ui-cp-ring-pointer, .ui-cp-tri-pointer {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          border: 2px solid var(--ui-text-hover);
          box-shadow: 0 0 3px rgba(0,0,0,0.8);
          z-index: 10;
          left: 0;
          top: 0;
        }
        .ui-cp-ring-pointer { width: var(--ui-cp-pointer-ring-size); height: var(--ui-cp-pointer-ring-size); }
        .ui-cp-tri-pointer  { width: var(--ui-cp-pointer-tri-size); height: var(--ui-cp-pointer-tri-size); }

        .ui-cp-rect-container {
          display: none;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin: 10px auto;
          width: 240px;
          height: 210px;
          touch-action: none;
          flex-shrink: 0;
        }
        .ui-cp-root.mode-rect .ui-cp-wheel { display: none; }
        .ui-cp-root.mode-rect .ui-cp-rect-container { display: flex; }

        .ui-cp-rect-sv {
          position: relative;
          width: 210px;
          height: 210px;
          border-radius: var(--ui-radius-sm);
          cursor: crosshair;
          touch-action: none;
          border: 1px solid var(--ui-border);
          background: linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, transparent), hsl(0, 100%, 50%);
        }
        .ui-cp-rect-hue {
          position: relative;
          width: 20px;
          height: 210px;
          border-radius: var(--ui-radius-sm);
          cursor: pointer;
          touch-action: none;
          border: 1px solid var(--ui-border);
          background: linear-gradient(to bottom, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%));
        }
        .ui-cp-rect-sv-pointer,
        .ui-cp-rect-hue-pointer {
          position: absolute;
          border: 2px solid var(--ui-text-hover);
          border-radius: 50%;
          box-shadow: 0 0 3px rgba(0,0,0,0.8);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 10;
        }
        .ui-cp-rect-sv-pointer { width: 12px; height: 12px; }
        .ui-cp-rect-hue-pointer { width: 14px; height: 14px; left: 50%; }

        .ui-cp-sliders { display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 4px; flex-shrink: 0; }
        .ui-cp-slider-row { position: relative; height: var(--ui-cp-slider-row-h); border-radius: var(--ui-radius-pill); overflow: hidden; display: flex; align-items: center; border: 1px solid var(--ui-border); flex-shrink: 0; }
        .ui-cp-slider-bg { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
        .ui-cp-slider { position: relative; z-index: 2; width: 100%; -webkit-appearance: none; background: transparent; height: 100%; margin: 0; cursor: pointer; }
        .ui-cp-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 8px; height: 16px; background: #fff; border: 1px solid #000; border-radius: 2px; }
        .ui-cp-slider::-moz-range-thumb { width: 8px; height: 16px; background: #fff; border: 1px solid #000; border-radius: 2px; }

        .ui-cp-preview-bar { display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-top: 1px solid var(--ui-border-subtle); margin-top: 6px; flex-shrink: 0; }
        .ui-cp-preview { width: var(--ui-cp-preview-size); height: var(--ui-cp-preview-size); border-radius: var(--ui-radius-sm); border: 1px solid var(--ui-border); flex-shrink: 0; }
        .ui-cp-statsrgba {
          width: 130px;
          min-height: 200px;
          position: relative;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: stretch;
          align-content: space-evenly;
        }
        .colorDm { color: var(--ui-text-dim); font-family: var(--ui-font-family-mono); font-size: 14px; }
        .ui-cp-stats {
          font-family: var(--ui-font-family-mono);
          font-size: 13px;
          line-height: 1.35;
          display: flex;
          gap: 8px;
          color: var(--ui-text-muted);
          flex: 1;
          overflow: hidden;
        }
        .ui-cp-stats .k { color: var(--ui-text-dim); }
        .ui-cp-stats .v { color: var(--ui-cp-stat-val-color); }
        .ui-cp-stats .s { color: var(--ui-cp-stat-sat-color); }
        .ui-cp-stats-sel { border-left: 1px solid var(--ui-border-subtle); padding-left: 6px; }

        .ui-cp-pick-overlay { position: fixed; inset: 0; z-index: 2147483646; cursor: crosshair; background: transparent; touch-action: none; }
        .ui-cp-pick-bubble { position: fixed; z-index: 2147483648; pointer-events: none; padding: 4px 8px; background: #000; color: #fff; border: 1px solid #fff; border-radius: 4px; font-size: 13px; font-family: var(--ui-font-family-mono); }

        .ui-cp-modal { background: var(--ui-bg-panel); border: 1px solid var(--ui-border); border-radius: var(--ui-radius-lg); width: 480px; max-width: 95vw; max-height: 85vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--ui-shadow-modal); font-size: 13px; }
        .ui-cp-modal-head { height: var(--ui-panel-header-h); background: var(--ui-bg-surface); border-bottom: 1px solid var(--ui-border); display: flex; align-items: center; justify-content: space-between; padding: 0 12px; }
        .ui-cp-modal-body { padding: 12px; display: flex; flex-direction: column; gap: 6px; overflow-y: auto; max-height: 380px; background: var(--ui-bg-input); }
        .ui-cp-palette-row { display: grid; grid-template-columns: 80px 80px 1fr 30px; gap: 8px; align-items: center; }
        .ui-cp-swatch { height: 22px; border-radius: var(--ui-radius-sm); border: 1px solid var(--ui-border); cursor: pointer; }

        @media (max-width: 992px) {
          .ui-container-column { width: 100% !important; height: auto !important; max-height: 60vh !important; }
          .ui-table-scroll { display: block; overflow-x: auto; }
          .ui-panel { width: 100% !important; max-width: 100% !important; }
          .ui-layout-modal { width: 90vw !important; }
        }

        @media (max-width: 768px) {
          :root {
            --ui-btn-height: 36px;
            --ui-square-btn-size: 44px;
          }
          .ui-container-column {
            width: 100% !important;
            height: auto !important;
            max-height: 50vh !important;
          }
          .ui-container-row {
            width: 100% !important;
          }
          .ui-panel {
            width: 100% !important;
            margin: 4px 0 !important;
          }
          .ui-container.is-floating {
            left: 8px !important;
            right: 8px !important;
            width: calc(100vw - 16px) !important;
            max-width: calc(100vw - 16px) !important;
          }
          .ui-table-scroll { display: none !important; }
          .ui-table-cards { display: flex !important; }
          .ui-layout-modal-backdrop {
            padding: 8px;
            align-items: flex-end;
          }
          .ui-layout-modal {
            width: 100% !important;
            max-height: 90vh !important;
            border-radius: var(--ui-radius-lg) var(--ui-radius-lg) 0 0 !important;
          }
          .ui-row-align-0 > * {
            flex: 1 1 100%;
          }
        }
      `);
    }
  }

  class UIRegistryManager {
    constructor() { this.entities = new Map(); }
    register(id, instance) { if (id) this.entities.set(id, instance); }
    unregister(id) { if (id) this.entities.delete(id); }
    get(id) { return this.entities.get(id); }
    getAll() { return this.entities; }
  }
  const UIRegistry = new UIRegistryManager();

  const UIPopupManager = {
    popups: new Set(),
    register(inst) { this.popups.add(inst); },
    unregister(inst) { this.popups.delete(inst); },
    closeOthers(current) {
      for (const inst of this.popups) {
        if (inst !== current && inst.isOpen && typeof inst.close === 'function') {
          inst.close();
        }
      }
    }
  };

  let _uiSeq = 0;

  class UIBaseComponent {
    constructor({ id = null } = {}, fallback = 'ui_comp') {
      UITheme.inject();
      _uiSeq++;
      this.id = id ? String(id).trim() : `${fallback}_${_uiSeq}`;
      this.element = null;
      this.isDestroyed = false;
      this.onDestroyCallback = null;
      this._listeners = [];
      this._activeDragCleanup = null;
      UIRegistry.register(this.id, this);
    }
    _listen(target, type, handler, options) {
      if (!target || !target.addEventListener) return;
      target.addEventListener(type, handler, options);
      this._listeners.push({ target, type, handler, options });
    }
    _unlistenAll() {
      if (this._activeDragCleanup) {
        this._activeDragCleanup();
        this._activeDragCleanup = null;
      }
      for (let i = 0; i < this._listeners.length; i++) {
        const { target, type, handler, options } = this._listeners[i];
        target.removeEventListener(type, handler, options);
      }
      this._listeners.length = 0;
    }
    mount(parent) {
      if (this.element && parent) {
        const p = parent.element ? parent.element : parent;
        p.appendChild(this.element);
      }
      return this;
    }
    onDestroy(cb) {
      this.onDestroyCallback = cb;
      return this;
    }
    destroy() {
      if (this.isDestroyed) return;
      this._unlistenAll();
      if (this.onDestroyCallback) this.onDestroyCallback(this);
      if (this.id) UIRegistry.unregister(this.id);
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
      this.element = null;
      this.isDestroyed = true;
    }
  }

  class UIDockEngine {
    constructor() {
      this.panels = new Set();
      this.buttons = new Set();
      this.containers = new Set();
      this.threshold = 16;
      this.guide = null;
      this.guideV = null;
      this.guideH = null;

      window.addEventListener('resize', () => this.keepElementsOnScreen());
      window.addEventListener('orientationchange', () => {
        setTimeout(() => this.keepElementsOnScreen(), 200);
      });
    }

    keepElementsOnScreen() {
      const sw = window.innerWidth;
      const sh = window.innerHeight;
      const isMobile = sw <= 768;

      this.panels.forEach(p => {
        if (p.floating && p.element && p.element.style.display !== 'none') {
          if (isMobile) {
            p.element.style.width = 'calc(100vw - 16px)';
            p.element.style.left = '8px';
          } else {
            const r = p.element.getBoundingClientRect();
            if (r.right > sw) p.element.style.left = `${Math.max(10, sw - r.width - 10)}px`;
            if (r.bottom > sh) p.element.style.top = `${Math.max(10, sh - r.height - 10)}px`;
          }
        }
      });

      this.buttons.forEach(b => {
        if (b.floating && b.element && b.element.style.display !== 'none') {
          const r = b.element.getBoundingClientRect();
          if (r.right > sw) b.element.style.left = `${Math.max(10, sw - r.width - 10)}px`;
          if (r.bottom > sh) b.element.style.top = `${Math.max(10, sh - r.height - 10)}px`;
        }
      });
    }

    ensureGuide() {
      if (!this.guide) {
        this.guide = document.createElement('div');
        this.guide.className = 'ui-snap-guide';
      }
      if (!this.guide.parentNode && document.body) {
        document.body.appendChild(this.guide);
      }
      return this.guide;
    }

    ensureSmartGuides() {
      if (!this.guideV) {
        this.guideV = document.createElement('div');
        this.guideV.className = 'ui-guide-line ui-guide-v';
        this.guideH = document.createElement('div');
        this.guideH.className = 'ui-guide-line ui-guide-h';
        document.body.appendChild(this.guideV);
        document.body.appendChild(this.guideH);
      }
    }

    register(p) { this.panels.add(p); }
    unregister(p) { this.panels.delete(p); }
    registerButton(b) { this.buttons.add(b); }
    unregisterButton(b) { this.buttons.delete(b); }
    registerContainer(c) { this.containers.add(c); }
    unregisterContainer(c) { this.containers.delete(c); }

    evaluate(draggedPanel, rawX, rawY) {
      const dw = draggedPanel.element.offsetWidth;
      const dh = draggedPanel.element.offsetHeight;
      const vw = window.innerWidth + window.scrollX;
      const vh = window.innerHeight + window.scrollY;

      let finalX = rawX;
      let finalY = rawY;
      let snapped = false;

      if (Math.abs(finalX - window.scrollX) < this.threshold) { finalX = window.scrollX; snapped = true; }
      if (Math.abs(finalY - window.scrollY) < this.threshold) { finalY = window.scrollY; snapped = true; }
      if (Math.abs(finalX + dw - vw) < this.threshold) { finalX = vw - dw; snapped = true; }
      if (Math.abs(finalY + dh - vh) < this.threshold) { finalY = vh - dh; snapped = true; }

      for (const other of this.panels) {
        if (other === draggedPanel || !other.floating || !other.element || other.element.style.display === 'none') continue;

        const ox = other.element.offsetLeft;
        const oy = other.element.offsetTop;
        const ow = other.element.offsetWidth;
        const oh = other.element.offsetHeight;

        const alignLeftDist = Math.abs(finalX - ox);
        const alignTopDist = Math.abs(finalY - oy);
        const stackBottomDist = Math.abs(finalY - (oy + oh));
        const stackTopDist = Math.abs(finalY + dh - oy);
        const stackRightDist = Math.abs(finalX - (ox + ow));
        const stackLeftDist = Math.abs(finalX + dw - ox);

        if (stackBottomDist < this.threshold && (finalX + dw > ox && finalX < ox + ow)) {
          finalY = oy + oh;
          if (alignLeftDist < this.threshold) finalX = ox;
          snapped = true;
        } else if (stackTopDist < this.threshold && (finalX + dw > ox && finalX < ox + ow)) {
          finalY = oy - dh;
          if (alignLeftDist < this.threshold) finalX = ox;
          snapped = true;
        }

        if (!snapped && stackRightDist < this.threshold && (finalY + dh > oy && finalY < oy + oh)) {
          finalX = ox + ow;
          if (alignTopDist < this.threshold) finalY = oy;
          snapped = true;
        } else if (!snapped && stackLeftDist < this.threshold && (finalY + dh > oy && finalY < oy + oh)) {
          finalX = ox - dw;
          if (alignTopDist < this.threshold) finalY = oy;
          snapped = true;
        }

        if (!snapped) {
          if (alignLeftDist < this.threshold) { finalX = ox; snapped = true; }
          if (alignTopDist < this.threshold) { finalY = oy; snapped = true; }
        }
      }

      const guideNode = this.ensureGuide();
      if (snapped && guideNode) {
        guideNode.style.display = 'block';
        guideNode.style.left = `${finalX}px`;
        guideNode.style.top = `${finalY}px`;
        guideNode.style.width = `${dw}px`;
        guideNode.style.height = `${dh}px`;
      } else if (guideNode) {
        guideNode.style.display = 'none';
      }

      return { x: finalX, y: Math.max(0, finalY), snapped };
    }

    evaluateSmartSnap(draggedItem, rawX, rawY) {
      this.ensureSmartGuides();
      const el = draggedItem.element;
      const dw = el.offsetWidth;
      const dh = el.offsetHeight;
      const vw = window.innerWidth + window.scrollX;
      const vh = window.innerHeight + window.scrollY;

      let finalX = rawX;
      let finalY = rawY;
      let snappedX = false;
      let snappedY = false;
      let guideXPos = null;
      let guideYPos = null;

      if (Math.abs(finalX) < this.threshold) { finalX = 0; snappedX = true; guideXPos = 0; }
      if (Math.abs(finalY) < this.threshold) { finalY = 0; snappedY = true; guideYPos = 0; }
      if (Math.abs(finalX + dw - vw) < this.threshold) { finalX = vw - dw; snappedX = true; guideXPos = vw; }
      if (Math.abs(finalY + dh - vh) < this.threshold) { finalY = vh - dh; snappedY = true; guideYPos = vh; }

      for (const other of this.buttons) {
        if (other === draggedItem || !other.element || other.element.style.display === 'none') continue;
        const ox = other.element.offsetLeft;
        const oy = other.element.offsetTop;
        const ow = other.element.offsetWidth;
        const oh = other.element.offsetHeight;

        if (!snappedX) {
          if (Math.abs(finalX - ox) < this.threshold) { finalX = ox; snappedX = true; guideXPos = ox; }
          else if (Math.abs(finalX + dw - (ox + ow)) < this.threshold) { finalX = ox + ow - dw; snappedX = true; guideXPos = ox + ow; }
          else if (Math.abs(finalX - (ox + ow)) < this.threshold) { finalX = ox + ow; snappedX = true; guideXPos = ox + ow; }
          else if (Math.abs(finalX + dw - ox) < this.threshold) { finalX = ox - dw; snappedX = true; guideXPos = ox; }
        }
        if (!snappedY) {
          if (Math.abs(finalY - oy) < this.threshold) { finalY = oy; snappedY = true; guideYPos = oy; }
          else if (Math.abs(finalY + dh - (oy + oh)) < this.threshold) { finalY = oy + oh - dh; snappedY = true; guideYPos = oy + oh; }
          else if (Math.abs(finalY - (oy + oh)) < this.threshold) { finalY = oy + oh; snappedY = true; guideYPos = oy + oh; }
          else if (Math.abs(finalY + dh - oy) < this.threshold) { finalY = oy - dh; snappedY = true; guideYPos = oy; }
        }
      }

      if (snappedX && guideXPos !== null) {
        this.guideV.style.display = 'block';
        this.guideV.style.left = `${guideXPos}px`;
      } else if (this.guideV) this.guideV.style.display = 'none';

      if (snappedY && guideYPos !== null) {
        this.guideH.style.display = 'block';
        this.guideH.style.top = `${guideYPos}px`;
      } else if (this.guideH) this.guideH.style.display = 'none';

      return { x: finalX, y: finalY, snapped: snappedX || snappedY };
    }

    hideSmartGuides() {
      if (this.guideV) this.guideV.style.display = 'none';
      if (this.guideH) this.guideH.style.display = 'none';
    }

    findContainerTarget(cx, cy) {
      for (const container of this.containers) {
        if (container.isHidden) continue;
        const rect = container.element.getBoundingClientRect();
        if (cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom) {
          return container;
        }
      }
      return null;
    }

    hideGuide() {
      if (this.guide) this.guide.style.display = 'none';
      this.hideSmartGuides();
    }

    hideAllPlaceholders() {
      this.containers.forEach(c => c.hidePlaceholder());
    }
  }

  const GlobalDock = new UIDockEngine();

  class UIRow extends UIBaseComponent {
    constructor({ align = 0, children = [] } = {}) {
      super();
      this.align = Number.isInteger(align) ? align : 0;
      this.element = document.createElement('div');
      this.element.className = `ui-row ui-row-align-${this.align}`;
      if (Array.isArray(children)) {
        children.forEach(c => this.append(c));
      }
    }
    setAlign(align) {
      this.element.classList.remove(`ui-row-align-${this.align}`);
      this.align = Number.isInteger(align) ? align : 0;
      this.element.classList.add(`ui-row-align-${this.align}`);
      return this;
    }
    append(child) {
      U.appendChild(this.element, child);
      return this;
    }
  }

  class UIContainer extends UIBaseComponent {
    constructor({
      id = null,
      direction = 'column',
      width = '290px',
      height = 'calc(100vh - 48px)',
      gap = 8,
      floating = false,
      draggable = false,
      title = '',
      x = 50,
      y = 50
    } = {}) {
      const fallbackPrefix = title ? `cnt_${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}` : 'cnt';
      super({ id }, fallbackPrefix);

      this.direction = (typeof direction === 'boolean') ? (direction ? 'column' : 'row') : (direction === 'row' ? 'row' : 'column');
      this.width = typeof width === 'number' ? `${width}px` : width;
      this.height = typeof height === 'number' ? `${height}px` : height;
      this.gap = gap;
      this.isFloating = floating || draggable;
      this.isDraggable = draggable;
      this.title = title;
      this.x = x;
      this.y = y;
      this.panels = [];
      this.isHidden = false;

      this.element = document.createElement('div');
      this.element.className = `ui-container ui-container-${this.direction}`;
      this.element.setAttribute('data-ui-id', this.id);
      this.element.style.setProperty('--ui-container-gap', `${this.gap}px`);
      this.element.style.setProperty('--ui-container-w', this.width);
      this.element.style.setProperty('--ui-container-h', this.height);

      if (this.isFloating) {
        this.element.classList.add('is-floating');
        this.applyPosition();
        if (this.title || this.isDraggable) {
          this.createHeader();
        }
      }

      this.placeholder = document.createElement('div');
      this.placeholder.className = 'ui-panel-placeholder';
      this.placeholder.style.display = 'none';

      GlobalDock.registerContainer(this);
      this.bindEvents();
    }

    applyPosition() {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        this.element.style.left = '8px';
        this.element.style.top = '70px';
        this.element.style.width = 'calc(100vw - 16px)';
      } else {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = this.width;
      }
    }

    createHeader() {
      this.header = document.createElement('div');
      this.header.className = 'ui-container-header';
      this.header.innerHTML = `
        <span class="ui-panel-title"></span>
        <div class="ui-header-tools">
          <button class="ui-icon-btn btn-close-cnt">✕</button>
        </div>
      `;
      this.header.querySelector('.ui-panel-title').textContent = this.title || 'GRUPO';
      this.element.prepend(this.header);
      this._listen(this.header.querySelector('.btn-close-cnt'), 'click', () => this.hide());
    }

    bindEvents() {
      if (!this.isDraggable || !this.isFloating) return;

      let startX = 0, startY = 0, initX = 0, initY = 0, dragging = false;
      const onPointerMove = (e) => {
        const cx = e.touches ? e.touches[0].clientX : e.clientX;
        const cy = e.touches ? e.touches[0].clientY : e.clientY;
        const dx = cx - startX;
        const dy = cy - startY;

        if (!dragging && Math.hypot(dx, dy) > 5) dragging = true;
        if (dragging) {
          if (e.cancelable) e.preventDefault();
          this.x = initX + dx;
          this.y = Math.max(0, initY + dy);
          this.element.style.left = `${this.x}px`;
          this.element.style.top = `${this.y}px`;
        }
      };

      const onPointerUp = () => {
        dragging = false;
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchend', onPointerUp);
        this._activeDragCleanup = null;
      };

      const trigger = this.header || this.element;
      const onPointerDown = (e) => {
        if (window.innerWidth <= 768) return;
        if (e.target.closest('.ui-panel, button, input, select')) return;
        startX = e.touches ? e.touches[0].clientX : e.clientX;
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        initX = this.element.offsetLeft;
        initY = this.element.offsetTop;
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);
        window.addEventListener('touchmove', onPointerMove, { passive: false });
        window.addEventListener('touchend', onPointerUp);
        this._activeDragCleanup = onPointerUp;
      };

      this._listen(trigger, 'mousedown', onPointerDown);
      this._listen(trigger, 'touchstart', onPointerDown, { passive: true });
    }

    addPanel(...panels) {
      panels.forEach(p => {
        if (!p) {
          console.warn('UIContainer.addPanel: se recibió un panel undefined/null, ignorando.');
          return;
        }
        if (Array.isArray(p)) {
          this.addPanel(...p);
          return;
        }
        if (p instanceof UISmartPanel) {
          p.element.classList.add('ui-panel-static');
          p.floating = false;
          p.parentContainer = this;
          p.lastParentContainer = this;
          p.inResponsiveGrid = false;
          GlobalDock.unregister(p);
          p.updateFloatButtonUI();
          if (!this.panels.includes(p)) this.panels.push(p);
          this.element.appendChild(p.element);
        } else if (typeof p.mount === 'function') {
          p.mount(this.element);
        } else {
          console.warn('UIContainer.addPanel: objeto no válido (no es UISmartPanel ni tiene mount):', p);
        }
      });
      return this;
    }

    removePanel(panel) {
      const idx = this.panels.indexOf(panel);
      if (idx !== -1) this.panels.splice(idx, 1);
      panel.parentContainer = null;
      if (panel.element && panel.element.parentNode === this.element) {
        this.element.removeChild(panel.element);
      }
    }

    showPlaceholder(cx, cy) {
      if (!this.placeholder.parentNode) {
        this.element.appendChild(this.placeholder);
      }
      this.placeholder.style.display = 'block';

      const children = Array.from(this.element.children).filter(c => c !== this.placeholder && c !== this.header);
      let targetChild = null;

      for (const child of children) {
        const rect = child.getBoundingClientRect();
        if (this.direction === 'column') {
          if (cy < rect.top + (rect.height / 2)) {
            targetChild = child;
            break;
          }
        } else {
          if (cx < rect.left + (rect.width / 2)) {
            targetChild = child;
            break;
          }
        }
      }

      if (targetChild) this.element.insertBefore(this.placeholder, targetChild);
      else this.element.appendChild(this.placeholder);
    }

    showPlaceholderAt(element) {
      if (!this.placeholder.parentNode) {
        this.element.appendChild(this.placeholder);
      }
      this.placeholder.style.display = 'block';
      this.placeholder.style.height = `${element.offsetHeight || 60}px`;
      this.element.insertBefore(this.placeholder, element);
    }

    hidePlaceholder() {
      if (this.placeholder) {
        this.placeholder.style.display = 'none';
        this.placeholder.style.height = '';
        if (this.placeholder.parentNode) {
          this.placeholder.parentNode.removeChild(this.placeholder);
        }
      }
    }

    insertPanelAtPlaceholder(panel) {
      panel.parentContainer = this;
      panel.lastParentContainer = this;
      panel.inResponsiveGrid = false;

      const currentIdx = this.panels.indexOf(panel);
      if (currentIdx !== -1) this.panels.splice(currentIdx, 1);

      if (this.placeholder && this.placeholder.parentNode === this.element) {
        this.element.insertBefore(panel.element, this.placeholder);
        this.hidePlaceholder();
      } else {
        this.element.appendChild(panel.element);
      }

      const allElements = Array.from(this.element.children);
      this.panels = this.panels.concat(panel).sort((a, b) => {
        return allElements.indexOf(a.element) - allElements.indexOf(b.element);
      });
    }

    insertPanelAt(panel, index) {
      panel.parentContainer = this;
      panel.lastParentContainer = this;
      panel.inResponsiveGrid = false;
      const currentIdx = this.panels.indexOf(panel);
      if (currentIdx !== -1) this.panels.splice(currentIdx, 1);

      const children = Array.from(this.element.children).filter(c => c !== this.placeholder && c !== this.header);
      if (index >= 0 && index < children.length) {
        this.element.insertBefore(panel.element, children[index]);
        this.panels.splice(index, 0, panel);
      } else {
        this.element.appendChild(panel.element);
        this.panels.push(panel);
      }
    }

    toggle() { return this.isHidden ? this.show() : this.hide(); }

    hide() {
      this.isHidden = true;
      this.element.classList.add('is-hidden');
      return this;
    }

    show() {
      this.isHidden = false;
      this.element.classList.remove('is-hidden');
      return this;
    }

    getState() {
      return {
        type: 'Container',
        hidden: this.isHidden,
        floating: this.isFloating,
        x: this.x,
        y: this.y,
        panelIds: this.panels.map(p => p.id)
      };
    }

    setState(s) {
      if (!s) return;
      if (s.hidden !== undefined) s.hidden ? this.hide() : this.show();
      if (s.floating && s.x !== undefined && s.y !== undefined) {
        this.x = s.x;
        this.y = s.y;
        this.applyPosition();
      }
    }

    destroy() {
      this.hidePlaceholder();
      GlobalDock.unregisterContainer(this);
      this.panels.slice().forEach(p => p.destroy());
      this.panels = [];
      super.destroy();
    }
  }

  class UIPanelGroup extends UIContainer {
    constructor(opts = {}) {
      super({
        direction: opts.type === 'row' ? 'row' : 'column',
        width: opts.minWidth ? `${opts.minWidth}px` : '290px',
        gap: opts.gap || 8,
        ...opts
      });
    }
  }

  class UISmartPanel extends UIBaseComponent {
    constructor({ id = null, title = 'Panel', x = 40, y = 40, width = 290, floating = true, onSnap, onUnsnap, onOpen, onClose } = {}) {
      const fallbackPrefix = title ? `panel_${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}` : 'panel';
      super({ id }, fallbackPrefix);

      this.title = title;
      this.floating = floating;
      this.initialWidth = width;
      this.x = x;
      this.y = y;
      this.parentContainer = null;
      this.lastParentContainer = null;
      this.inResponsiveGrid = false;
      this.onSnap = onSnap;
      this.onUnsnap = onUnsnap;
      this.onOpenCallback = onOpen;
      this.onCloseCallback = onClose;
      this.isSnapping = false;
      this.isDragging = false;
      this.isCollapsed = false;

      this.element = document.createElement('div');
      this.element.className = 'ui-panel';
      this.element.setAttribute('data-ui-id', this.id);

      if (this.floating) {
        this.applyFloatingLayout();
        GlobalDock.register(this);
      } else {
        this.element.classList.add('ui-panel-static');
      }

      this.element.innerHTML = `
        <div class="ui-panel-header">
          <div class="ui-header-left">
            <span class="ui-panel-title"></span>
          </div>
          <div class="ui-header-tools">
            <button class="ui-icon-btn btn-float" style="display: none;" title="Alternar Flotante">⧉</button>
            <button class="ui-icon-btn btn-collapse">_</button>
            <button class="ui-icon-btn btn-close">✕</button>
          </div>
        </div>
        <div class="ui-panel-body"></div>
      `;

      this.header = this.element.querySelector('.ui-panel-header');
      this.body = this.element.querySelector('.ui-panel-body');
      this.titleNode = this.element.querySelector('.ui-panel-title');
      this.titleNode.textContent = this.title;
      this.btnFloat = this.element.querySelector('.btn-float');
      this.btnCollapse = this.element.querySelector('.btn-collapse');
      this.btnClose = this.element.querySelector('.btn-close');

      this.updateFloatButtonUI();
      this.bindEvents();

      if (this.floating) {
        if (document.body) document.body.appendChild(this.element);
        else window.addEventListener('DOMContentLoaded', () => {
          if (!this.isDestroyed && this.element) document.body.appendChild(this.element);
        });
      }
    }

    applyFloatingLayout() {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        this.element.style.left = '8px';
        this.element.style.width = 'calc(100vw - 16px)';
      } else {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.initialWidth}px`;
      }
    }

    updateFloatButtonUI() {
      if (!this.btnFloat) return;
      this.btnFloat.classList.toggle('active', this.floating);
      this.btnFloat.title = this.floating ? 'Fijar' : 'Flotar';
    }

    setFloating(floating, targetX, targetY) {
      if (this.floating === floating) return this;
      this.floating = floating;

      if (this.floating) {
        this.inResponsiveGrid = false;
        const rect = this.element.getBoundingClientRect();
        this.x = targetX !== undefined ? targetX : rect.left + window.scrollX;
        this.y = targetY !== undefined ? targetY : rect.top + window.scrollY;

        if (this.parentContainer) {
          this.lastParentContainer = this.parentContainer;
          this.parentContainer.removePanel(this);
        }

        document.body.appendChild(this.element);
        this.element.classList.remove('ui-panel-static');
        this.applyFloatingLayout();
        GlobalDock.register(this);
      } else {
        GlobalDock.unregister(this);
        this.element.classList.add('ui-panel-static');
        this.element.style.left = '';
        this.element.style.top = '';
        this.element.style.width = '';

        const containerToJoin = this.lastParentContainer || Array.from(GlobalDock.containers)[0];
        if (containerToJoin) containerToJoin.addPanel(this);
      }
      this.updateFloatButtonUI();
      return this;
    }

    bindEvents() {
      this._listen(this.btnCollapse, 'click', (e) => {
        e.stopPropagation();
        this.toggleCollapse();
      });
      this._listen(this.btnClose, 'click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.close();
      });
      this._listen(this.btnFloat, 'click', (e) => {
        e.stopPropagation();
        this.setFloating(!this.floating);
      });

      let offsetX = 0, offsetY = 0, targetContainer = null, startClientX = 0, startClientY = 0, isTracking = false;

      const onPointerMove = (e) => {
        if (!isTracking) return;

        const cx = e.touches ? e.touches[0].pageX : e.pageX;
        const cy = e.touches ? e.touches[0].pageY : e.pageY;

        if (!this.isDragging) {
          const rawClientX = e.touches ? e.touches[0].clientX : e.clientX;
          const rawClientY = e.touches ? e.touches[0].clientY : e.clientY;
          if (Math.hypot(rawClientX - startClientX, rawClientY - startClientY) > 8) {
            this.isDragging = true;

            if (!this.floating) {
              const rect = this.element.getBoundingClientRect();
              const originalW = rect.width;

              if (this.parentContainer) {
                this.lastParentContainer = this.parentContainer;
                this.parentContainer.showPlaceholderAt(this.element);
                this.parentContainer.removePanel(this);
              }

              document.body.appendChild(this.element);
              this.element.classList.remove('ui-panel-static');
              this.element.style.width = `${originalW}px`;
              this.element.style.left = `${rect.left + window.scrollX}px`;
              this.element.style.top = `${rect.top + window.scrollY}px`;

              this.floating = true;
              GlobalDock.register(this);
              this.updateFloatButtonUI();

              offsetX = cx - this.element.offsetLeft;
              offsetY = cy - this.element.offsetTop;
            }

            this.element.classList.add('is-dragged');
          } else {
            return;
          }
        }

        if (e.cancelable) e.preventDefault();

        const rawX = cx - offsetX;
        const rawY = Math.max(0, cy - offsetY);

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        targetContainer = GlobalDock.findContainerTarget(clientX, clientY);

        if (targetContainer) {
          GlobalDock.hideGuide();
          if (this.isSnapping) {
            this.isSnapping = false;
            this.element.classList.remove('is-snapping');
            if (this.onUnsnap) this.onUnsnap(this);
          }
          GlobalDock.containers.forEach(c => {
            if (c !== targetContainer) c.hidePlaceholder();
          });
          targetContainer.showPlaceholder(clientX, clientY);
          this.element.style.left = `${rawX}px`;
          this.element.style.top = `${rawY}px`;
        } else {
          GlobalDock.hideAllPlaceholders();
          const evaluated = GlobalDock.evaluate(this, rawX, rawY);
          if (evaluated.snapped !== this.isSnapping) {
            this.isSnapping = evaluated.snapped;
            this.element.classList.toggle('is-snapping', this.isSnapping);
            if (this.isSnapping && this.onSnap) this.onSnap(this);
            if (!this.isSnapping && this.onUnsnap) this.onUnsnap(this);
          }
          this.element.style.left = `${evaluated.x}px`;
          this.element.style.top = `${evaluated.y}px`;
        }
      };

      const onPointerUp = () => {
        if (!isTracking) return;
        isTracking = false;

        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchend', onPointerUp);
        this._activeDragCleanup = null;

        if (!this.isDragging) return;

        this.isDragging = false;
        this.element.classList.remove('is-dragged', 'is-snapping');
        GlobalDock.hideGuide();

        if (targetContainer) {
          targetContainer.insertPanelAtPlaceholder(this);
          this.floating = false;
          this.element.classList.add('ui-panel-static');
          this.element.style.left = '';
          this.element.style.top = '';
          this.element.style.width = '';
          GlobalDock.unregister(this);
          this.updateFloatButtonUI();
        } else {
          GlobalDock.hideAllPlaceholders();
          if (this.floating) {
            this.x = this.element.offsetLeft;
            this.y = this.element.offsetTop;
          }
        }

        targetContainer = null;
      };

      const onPointerDown = (e) => {
        if (this.inResponsiveGrid) return;
        if (e.target.closest('button, input, select, .ui-accordion-header, .ui-cajon-btn, .ui-table th, .ui-table td, .ui-reorder-item, .ui-square-btn, .ui-select-trigger, .dropdown-menu, .ui-slider-track, .ui-cp-wheel, .ui-cp-rect-container, .ui-cp-slider')) return;

        isTracking = true;
        this.isDragging = false;

        startClientX = e.touches ? e.touches[0].clientX : e.clientX;
        startClientY = e.touches ? e.touches[0].clientY : e.clientY;

        const cx = e.touches ? e.touches[0].pageX : e.pageX;
        const cy = e.touches ? e.touches[0].pageY : e.pageY;

        offsetX = cx - this.element.offsetLeft;
        offsetY = cy - this.element.offsetTop;

        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);
        window.addEventListener('touchmove', onPointerMove, { passive: false });
        window.addEventListener('touchend', onPointerUp);
        this._activeDragCleanup = onPointerUp;
      };

      this._listen(this.header, 'mousedown', onPointerDown);
      this._listen(this.header, 'touchstart', onPointerDown, { passive: true });
    }

    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      this.element.classList.toggle('collapsed', this.isCollapsed);
      this.btnCollapse.textContent = this.isCollapsed ? '□' : '_';
      return this;
    }

    addRow(...args) {
      let alignMode = 0;
      let children = args;
      if (typeof args[0] === 'number') {
        alignMode = args[0];
        children = args.slice(1);
      }
      const row = new UIRow({ align: alignMode, children });
      row.mount(this.body);
      return row;
    }

    append(child) {
      U.appendChild(this.body, child);
      return this;
    }

    open() {
      if (!this.element) return this;
      this.element.style.removeProperty('display');
      if (this.floating) {
        this.element.style.setProperty('display', 'flex', 'important');
      }
      if (this.onOpenCallback) this.onOpenCallback(this);
      return this;
    }

    close() {
      if (!this.element) return this;
      this.element.style.setProperty('display', 'none', 'important');
      if (this.onCloseCallback) this.onCloseCallback(this);
      return this;
    }

    toggle() {
      return this.element.style.display === 'none' ? this.open() : this.close();
    }

    setTitle(t) {
      this.title = t;
      if (this.titleNode) this.titleNode.textContent = t;
      return this;
    }

    getState() {
      const r = this.element.getBoundingClientRect();
      return {
        type: 'SmartPanel',
        x: this.floating ? parseFloat(this.element.style.left) || r.left : 0,
        y: this.floating ? parseFloat(this.element.style.top) || r.top : 0,
        floating: this.floating,
        collapsed: this.isCollapsed,
        visible: this.element.style.display !== 'none',
        containerId: this.parentContainer ? this.parentContainer.id : null,
        containerIndex: this.parentContainer ? this.parentContainer.panels.indexOf(this) : -1
      };
    }

    setState(s) {
      if (!s) return;
      if (s.floating === false && s.containerId) {
        const targetCnt = UIRegistry.get(s.containerId);
        if (targetCnt && typeof targetCnt.insertPanelAt === 'function') {
          if (this.parentContainer) this.parentContainer.removePanel(this);
          targetCnt.insertPanelAt(this, s.containerIndex !== undefined ? s.containerIndex : -1);
          this.floating = false;
          this.element.classList.add('ui-panel-static');
          this.element.style.left = '';
          this.element.style.top = '';
          this.element.style.width = '';
          GlobalDock.unregister(this);
          this.updateFloatButtonUI();
        }
      } else if (s.floating !== undefined && s.floating !== this.floating) {
        this.setFloating(s.floating, s.x, s.y);
      } else if (s.x !== undefined && this.floating) {
        this.x = s.x;
        this.y = s.y;
        this.applyFloatingLayout();
      }
      if (s.collapsed !== undefined && s.collapsed !== this.isCollapsed) {
        this.toggleCollapse();
      }
      if (s.visible !== undefined) {
        s.visible ? this.open() : this.close();
      }
    }

    destroy() {
      GlobalDock.unregister(this);
      if (this.parentContainer) this.parentContainer.removePanel(this);
      super.destroy();
    }
  }

   class UIConfigurableSlider extends UIBaseComponent {
    constructor({ label = '', min = 0, max = 100, step = 1, value = 50, onChange } = {}) {
      super();
      this.label = label;
      this.min = min;
      this.max = max;
      this.step = step;
      this.value = Math.max(this.min, Math.min(this.max, value));
      this.onChange = onChange;
      this.isOpen = false;

      this.element = document.createElement('div');
      this.element.className = 'ui-slider-card';
      this.element.innerHTML = `
        <div class="ui-slider-card-header">
          <span class="ui-slider-label"></span>
          <div class="ui-slider-header-right">
            <span class="ui-slider-val"></span>
            <button class="ui-cajon-btn" title="Configurar Min/Max">▼</button>
          </div>
        </div>
        <div class="ui-slider-content">
          <div class="ui-slider-track">
            <span class="ui-slider-track-hit" style="position:absolute;inset:-10px -8px;background:transparent;pointer-events:auto;"></span>
            <div class="ui-slider-bg"><div class="ui-slider-fill"></div></div>
            <div class="ui-slider-thumb">
              <span class="ui-slider-thumb-hit" style="position:absolute;top:50%;left:50%;width:32px;height:32px;transform:translate(-50%,-50%);border-radius:50%;background:transparent;pointer-events:auto;"></span>
            </div>
          </div>
        </div>
        <div class="ui-slider-box">
          <div class="ui-slider-box-inner">
            <div class="ui-cajon-group">
              <span class="ui-cajon-tag">Min</span>
              <input type="number" class="ui-input ui-cajon-input input-min">
            </div>
            <div class="ui-cajon-group">
              <span class="ui-cajon-tag">Max</span>
              <input type="number" class="ui-input ui-cajon-input input-max">
            </div>
            <div class="ui-cajon-group">
              <span class="ui-cajon-tag">Paso</span>
              <input type="number" class="ui-input ui-cajon-input input-step" step="any">
            </div>
          </div>
        </div>
      `;

      this.labelEl = this.element.querySelector('.ui-slider-label');
      this.labelEl.textContent = this.label;
      this.track = this.element.querySelector('.ui-slider-track');
      this.fill = this.element.querySelector('.ui-slider-fill');
      this.thumb = this.element.querySelector('.ui-slider-thumb');
      this.valDisplay = this.element.querySelector('.ui-slider-val');
      this.toggleBtn = this.element.querySelector('.ui-cajon-btn');

      this.inputMin = this.element.querySelector('.input-min');
      this.inputMax = this.element.querySelector('.input-max');
      this.inputStep = this.element.querySelector('.input-step');
      this.inputMin.value = this.min;
      this.inputMin.step = this.step;
      this.inputMax.value = this.max;
      this.inputMax.step = this.step;
      this.inputStep.value = this.step;

      this.track.style.touchAction = 'none';

      this.updateUI();
      this.editableVal = hacerEditableNumerico(this.valDisplay, {
        type: this.step % 1 !== 0 ? 'float' : 'int',
        min: this.min,
        max: this.max,
        step: this.step,
        decimals: this._calcDecimals(),
        value: this.value,
        styled: false,
        onChange: (val) => {
          this.setValue(val);
        }
      });
      this.bindEvents();
    }

    _calcDecimals() {
      const stepDecimals = (String(this.step).split('.')[1] || '').length;
      const minDecimals = (String(this.min).split('.')[1] || '').length;
      return Math.max(2, stepDecimals, minDecimals);
    }

    _syncEditableOptions() {
      if (!this.editableVal) return;
      this.editableVal.updateOptions({
        type: this.step % 1 !== 0 ? 'float' : 'int',
        min: this.min,
        max: this.max,
        step: this.step,
        decimals: this._calcDecimals()
      });
    }

    bindEvents() {
      this._listen(this.toggleBtn, 'click', () => {
        this.isOpen = !this.isOpen;
        this.element.classList.toggle('open', this.isOpen);
      });

      let trackRect = null;
      let isDragging = false;
      let isHoveringCard = false;

      const updateLabelHighlight = () => {
        if (!this.labelEl) return;
        this.labelEl.style.color = (isDragging || isHoveringCard) ? '#4daafc' : '';
      };

      this._listen(this.element, 'pointerenter', () => {
        isHoveringCard = true;
        updateLabelHighlight();
      });

      this._listen(this.element, 'pointerleave', () => {
        isHoveringCard = false;
        updateLabelHighlight();
      });

      const handleMove = (e) => {
        if (!trackRect) trackRect = this.track.getBoundingClientRect();
        if (trackRect.width <= 0) return;

        let pos = (e.clientX - trackRect.left) / trackRect.width;
        pos = Math.max(0, Math.min(1, pos));

        const rawVal = this.min + pos * (this.max - this.min);
        const steps = Math.round((rawVal - this.min) / this.step);

        const stepDecimals = (this.step.toString().split('.')[1] || '').length;
        const minDecimals = (this.min.toString().split('.')[1] || '').length;
        const decimals = Math.max(stepDecimals, minDecimals);

        let newValue = Number((this.min + steps * this.step).toFixed(decimals));
        newValue = Math.max(this.min, Math.min(this.max, newValue));

        if (newValue !== this.value) {
          this.value = newValue;
          this.updateUI();
          if (this.onChange) this.onChange(this.value, this);
        }
      };

      const stopMove = (e) => {
        isDragging = false;
        isHoveringCard = !!(this.element && this.element.matches(':hover'));
        updateLabelHighlight();
        if (this.element) this.element.classList.remove('dragging');
        document.body.style.userSelect = '';
        document.body.style.webkitUserSelect = '';
        if (e && e.pointerId !== undefined && this.track && this.track.hasPointerCapture(e.pointerId)) {
          this.track.releasePointerCapture(e.pointerId);
        }
        if (this.track) {
          this.track.removeEventListener('pointermove', handleMove);
          this.track.removeEventListener('pointerup', stopMove);
          this.track.removeEventListener('pointercancel', stopMove);
        }
        trackRect = null;
        this._activeDragCleanup = null;
      };

      const startMove = (e) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        e.preventDefault();
        e.stopPropagation();

        isDragging = true;
        updateLabelHighlight();
        this.element.classList.add('dragging');
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
        if (window.getSelection) window.getSelection().removeAllRanges();

        trackRect = this.track.getBoundingClientRect();
        this.track.setPointerCapture(e.pointerId);

        handleMove(e);
        this.track.addEventListener('pointermove', handleMove);
        this.track.addEventListener('pointerup', stopMove);
        this.track.addEventListener('pointercancel', stopMove);
        this._activeDragCleanup = stopMove;
      };

      this._listen(this.track, 'pointerdown', startMove);

      this._listen(this.inputMin, 'change', (e) => {
        let v = parseFloat(e.target.value);
        if (Number.isNaN(v)) v = 0;
        if (v >= this.max) v = this.max - this.step;
        this.min = v;
        this.inputMin.value = this.min;
        this._syncEditableOptions();
        this.setValue(this.value);
      });

      this._listen(this.inputMax, 'change', (e) => {
        let v = parseFloat(e.target.value);
        if (Number.isNaN(v)) v = 0;
        if (v <= this.min) v = this.min + this.step;
        this.max = v;
        this.inputMax.value = this.max;
        this._syncEditableOptions();
        this.setValue(this.value);
      });

      this._listen(this.inputStep, 'change', (e) => {
        let v = parseFloat(e.target.value);
        if (Number.isNaN(v) || v <= 0) v = 1;
        this.step = v;
        this.inputStep.value = this.step;
        this._syncEditableOptions();
        this.setValue(this.value);
      });
    }

    getValue() {
      return this.value;
    }

    setValue(v) {
      const num = Number(v);
      if (Number.isNaN(num)) return this;
      this.value = Math.max(this.min, Math.min(this.max, num));
      this.updateUI();
      if (this.onChange) this.onChange(this.value, this);
      return this;
    }

    updateUI() {
      const range = this.max - this.min;
      const percent = range > 0 ? Math.max(0, Math.min(100, ((this.value - this.min) / range) * 100)) : 0;
      this.fill.style.width = `${percent}%`;
      this.thumb.style.left = `${percent}%`;
      if (this.editableVal) this.editableVal.setValue(this.value);
      else this.valDisplay.textContent = this.value;
    }

    destroy() {
      if (this.editableVal) {
        this.editableVal.destroy();
        this.editableVal = null;
      }
      super.destroy();
    }
  }

  class UILabel extends UIBaseComponent {
    constructor({ text = '' } = {}) {
      super();
      this.element = document.createElement('span');
      this.element.className = 'ui-label';
      this.element.textContent = text;
    }
    setText(t) {
      if (this.element) this.element.textContent = t;
      return this;
    }
    getText() { return this.element ? this.element.textContent : ''; }
  }

  class UIButton extends UIBaseComponent {
    constructor({ id = null, text = 'Button', variant = 'default', onClick } = {}) {
      super({ id }, 'btn');
      this.element = document.createElement('button');
      this.element.className = `ui-btn ${variant === 'primary' ? 'ui-btn-primary' : variant === 'danger' ? 'ui-btn-danger' : ''}`.trim();
      this.element.textContent = text;
      this._listen(this.element, 'click', (e) => { if (onClick) onClick(e, this); });
    }
    setText(t) {
      if (this.element) this.element.textContent = t;
      return this;
    }
    setDisabled(v) {
      if (this.element) this.element.disabled = !!v;
      return this;
    }
  }

  class UIInputText extends UIBaseComponent {
    constructor({ value = '', placeholder = '', onChange, onInput } = {}) {
      super();
      this.element = document.createElement('input');
      this.element.type = 'text';
      this.element.className = 'ui-input ui-input-text';
      this.element.value = value;
      this.element.placeholder = placeholder;
      this._listen(this.element, 'input', (e) => { if (onInput) onInput(e.target.value, e, this); });
      this._listen(this.element, 'change', (e) => { if (onChange) onChange(e.target.value, e, this); });
    }
    getValue() { return this.element ? this.element.value : ''; }
    setValue(v) {
      if (this.element) this.element.value = v;
      return this;
    }
    setDisabled(v) {
      if (this.element) this.element.disabled = !!v;
      return this;
    }
  }

  class UIInputNumberInt extends UIBaseComponent {
    constructor({ value = 0, min = -Infinity, max = Infinity, onChange, onInput } = {}) {
      super();
      this.min = Math.round(min);
      this.max = Math.round(max);
      this.value = Math.max(this.min, Math.min(this.max, Math.round(value)));

      this.element = document.createElement('input');
      this.element.type = 'number';
      this.element.step = '1';
      this.element.className = 'ui-input ui-input-number';
      this.element.value = this.value;

      this._listen(this.element, 'keydown', (e) => {
        if (e.key === '.' || e.key === ',' || e.key === 'e' || e.key === 'E') e.preventDefault();
      });
      this._listen(this.element, 'input', (e) => {
        const p = parseInt(e.target.value, 10);
        if (!Number.isNaN(p)) {
          this.value = Math.max(this.min, Math.min(this.max, p));
          if (onInput) onInput(this.value, e, this);
        }
      });
      this._listen(this.element, 'change', (e) => {
        let p = parseInt(e.target.value, 10);
        if (Number.isNaN(p)) p = 0;
        this.value = Math.max(this.min, Math.min(this.max, p));
        this.element.value = this.value;
        if (onChange) onChange(this.value, e, this);
      });
    }
    getValue() { return this.value; }
    setValue(v) {
      const p = parseInt(v, 10);
      this.value = Number.isNaN(p) ? 0 : Math.max(this.min, Math.min(this.max, p));
      if (this.element) this.element.value = this.value;
      return this;
    }
    setDisabled(v) {
      if (this.element) this.element.disabled = !!v;
      return this;
    }
  }

  class UICheckbox extends UIBaseComponent {
    constructor({ label = '', checked = false, onChange } = {}) {
      super();
      this.checked = !!checked;
      this.disabled = false;
      this.element = document.createElement('div');
      this.element.className = `ui-checkbox ${this.checked ? 'checked' : ''}`;
      this.element.innerHTML = `
        <div class="ui-checkbox-box"><div class="ui-checkbox-mark"></div></div>
        <span class="ui-label"></span>
      `;
      this.element.querySelector('.ui-label').textContent = label;
      this._listen(this.element, 'click', () => {
        if (this.disabled) return;
        this.checked = !this.checked;
        this.element.classList.toggle('checked', this.checked);
        if (onChange) onChange(this.checked, this);
      });
    }
    getValue() { return this.checked; }
    setValue(v) {
      this.checked = !!v;
      if (this.element) this.element.classList.toggle('checked', this.checked);
      return this;
    }
    setDisabled(v) {
      this.disabled = !!v;
      if (this.element) this.element.classList.toggle('disabled', this.disabled);
      return this;
    }
  }

  class UIToggle extends UIBaseComponent {
    constructor({ label = '', value = false, onChange } = {}) {
      super();
      this.value = !!value;
      this.disabled = false;

      this.element = document.createElement('div');
      this.element.className = `ui-toggle ${this.value ? 'active' : ''}`;
      this.element.innerHTML = `
        <div class="ui-toggle-switch"><div class="ui-toggle-thumb"></div></div>
        <span class="ui-label"></span>
      `;
      this.element.querySelector('.ui-label').textContent = label;

      this._listen(this.element, 'click', () => {
        if (this.disabled) return;
        this.value = !this.value;
        this.element.classList.toggle('active', this.value);
        if (onChange) onChange(this.value, this);
      });
    }
    getValue() { return this.value; }
    setValue(v) {
      this.value = !!v;
      if (this.element) this.element.classList.toggle('active', this.value);
      return this;
    }
    setDisabled(v) {
      this.disabled = !!v;
      if (this.element) this.element.classList.toggle('disabled', this.disabled);
      return this;
    }
  }

  class UISelect extends UIBaseComponent {
    constructor({ options = [], value = '', onChange } = {}) {
      super();
      this.options = this._normalizeOptions(options);
      this.value = (value !== '' && value !== undefined && value !== null) ? value : (this.options[0]?.value ?? '');
      this.onChange = onChange;
      this.isOpen = false;
      this.disabled = false;

      this.element = document.createElement('div');
      this.element.className = 'ui-select-wrap';
      this.element.innerHTML = `
        <div class="ui-select-trigger header-dropdown" tabindex="0">
          <div class="ui-select-icon-circle icon-circle"></div>
          <span class="ui-select-label-text title"></span>
          <svg class="ui-select-arrow-svg arrow-down" width="10" height="6" viewBox="0 0 10 6">
            <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
          </svg>
        </div>
        <div class="dropdown-menu">
          <div class="ui-select-search-wrap" style="padding: 6px; position: sticky; top: 0; background: inherit; z-index: 2;">
            <input type="text" class="ui-select-search-input" placeholder="Buscar..." style="width: 100%; height: 30px; box-sizing: border-box; padding: 0 8px; font-size: 13px; background-color: #333333; color: #ffffff; border: 1px solid #444444; border-radius: 4px; outline: none;">
          </div>
          <div class="ui-select-items-wrap" style="overflow-y: auto;"></div>
        </div>
      `;

      this.trigger = this.element.querySelector('.ui-select-trigger');
      this.labelText = this.element.querySelector('.ui-select-label-text');
      this.menu = this.element.querySelector('.dropdown-menu');
      this.searchInput = this.element.querySelector('.ui-select-search-input');
      this.itemsWrap = this.element.querySelector('.ui-select-items-wrap');

      UIPopupManager.register(this);
      this.renderItems();
      this.bindEvents();
    }

    _normalizeOptions(options) {
      return Array.isArray(options) ? options.map(o => (typeof o === 'object' && o !== null) ? o : { value: o, label: String(o) }) : [];
    }

    setOptions(options = [], value = undefined) {
      this.options = this._normalizeOptions(options);
      if (value !== undefined) {
        this.value = value;
      } else if (!this.options.some(o => String(o.value) === String(this.value))) {
        this.value = this.options[0]?.value ?? '';
      }
      this.renderItems(this.searchInput ? this.searchInput.value : '');
      return this;
    }

    renderItems(filterText = '') {
      this.itemsWrap.innerHTML = '';
      const search = filterText.toLowerCase().trim();
      const filtered = this.options.filter(opt => String(opt.label).toLowerCase().includes(search));

      this.itemsWrap.style.maxHeight = filtered.length >= 10 ? 'min(480px, 60vh)' : 'none';

      if (filtered.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'dropdown-item disabled';
        noResults.style.opacity = '0.5';
        noResults.style.cursor = 'default';
        noResults.textContent = 'Sin resultados';
        this.itemsWrap.appendChild(noResults);
      } else {
        filtered.forEach(opt => {
          const isSelected = String(opt.value) === String(this.value);
          const itemEl = document.createElement('div');
          itemEl.className = `dropdown-item ${isSelected ? 'active' : ''}`;
          itemEl.dataset.value = String(opt.value);
          itemEl.textContent = opt.label;
          itemEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.setValue(opt.value);
            this.close();
            if (this.onChange) this.onChange(this.value, this);
          });
          this.itemsWrap.appendChild(itemEl);
        });
      }

      const currentOpt = this.options.find(o => String(o.value) === String(this.value));
      this.labelText.textContent = currentOpt ? currentOpt.label : (this.options[0]?.label ?? '');
    }

    toggle() {
      if (this.disabled) return;
      this.isOpen ? this.close() : this.open();
    }

    open() {
      if (this.disabled || this.isOpen) return;
      UIPopupManager.closeOthers(this);
      this.isOpen = true;
      this.element.classList.add('is-open');

      setTimeout(() => {
        if (!this.isOpen || this.isDestroyed) return;
        this.searchInput.focus();
        const active = this.itemsWrap.querySelector('.dropdown-item.active');
        if (active) active.scrollIntoView({ block: 'nearest' });
      }, 50);
    }

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.element.classList.remove('is-open');
      this.searchInput.value = '';
      this.renderItems();
    }

    bindEvents() {
      this._listen(this.trigger, 'click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
      this._listen(this.searchInput, 'click', (e) => e.stopPropagation());
      this._listen(this.searchInput, 'input', (e) => this.renderItems(e.target.value));
      this._listen(this.searchInput, 'keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const firstItem = this.itemsWrap.querySelector('.dropdown-item:not(.disabled)');
          if (firstItem) firstItem.click();
        } else if (e.key === 'Escape') {
          this.close();
        }
      });
      this._listen(document, 'click', (e) => {
        if (this.element && !this.element.contains(e.target)) this.close();
      });
      this._listen(document, 'keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) this.close();
      });
    }

    getValue() { return this.value; }

    setValue(v) {
      this.value = v;
      const currentOpt = this.options.find(o => String(o.value) === String(this.value));
      if (currentOpt) this.labelText.textContent = currentOpt.label;

      const items = this.itemsWrap.querySelectorAll('.dropdown-item[data-value]');
      items.forEach(el => {
        el.classList.toggle('active', el.dataset.value === String(this.value));
      });
      return this;
    }

    setDisabled(v) {
      this.disabled = !!v;
      this.element.classList.toggle('disabled', this.disabled);
      if (this.disabled) this.close();
      return this;
    }

    destroy() {
      UIPopupManager.unregister(this);
      super.destroy();
    }
  }

  class UISegmented extends UIBaseComponent {
    constructor({ items = [], activeIndex = 0, onChange } = {}) {
      super();
      this.items = items;
      this.activeIndex = activeIndex;
      this.onChange = onChange;

      this.element = document.createElement('div');
      this.element.className = 'ui-segmented';

      this.domItems = this.items.map((item, idx) => {
        const el = document.createElement('div');
        el.className = `ui-seg-item ${idx === this.activeIndex ? 'active' : ''}`;
        el.textContent = item.label || item;
        this._listen(el, 'click', () => this.select(idx));
        this.element.appendChild(el);
        return el;
      });
    }
    select(idx) {
      this.activeIndex = idx;
      this.domItems.forEach((el, i) => el.classList.toggle('active', i === idx));
      if (this.onChange) this.onChange(this.getValue(), idx, this);
      return this;
    }
    getValue() {
      const c = this.items[this.activeIndex];
      return c ? (c.value !== undefined ? c.value : c) : null;
    }
    destroy() {
      this.domItems = [];
      super.destroy();
    }
  }

  class UIRadioGroup extends UIBaseComponent {
    constructor({ items = [], activeIndex = 0, onChange } = {}) {
      super();
      this.items = items;
      this.activeIndex = activeIndex;
      this.disabled = false;

      this.element = document.createElement('div');
      this.element.className = 'ui-radio-group';

      this.domItems = this.items.map((item, idx) => {
        const el = document.createElement('div');
        el.className = `ui-radio-item ${idx === this.activeIndex ? 'active' : ''}`;
        el.innerHTML = `
          <div class="ui-radio-circle"><div class="ui-radio-dot"></div></div>
          <span class="ui-label"></span>
        `;
        el.querySelector('.ui-label').textContent = item.label || item;

        this._listen(el, 'click', () => {
          if (this.disabled) return;
          this.select(idx);
          if (onChange) onChange(this.getValue(), idx, this);
        });
        this.element.appendChild(el);
        return el;
      });
    }
    select(idx) {
      this.activeIndex = idx;
      this.domItems.forEach((el, i) => el.classList.toggle('active', i === idx));
      return this;
    }
    getValue() {
      const c = this.items[this.activeIndex];
      return c ? (c.value !== undefined ? c.value : c) : null;
    }
    setValue(v) {
      const idx = this.items.findIndex(it => (it.value !== undefined ? it.value : it) === v);
      if (idx !== -1) this.select(idx);
      return this;
    }
    setDisabled(v) {
      this.disabled = !!v;
      this.domItems.forEach(el => el.classList.toggle('disabled', this.disabled));
      return this;
    }
    destroy() {
      this.domItems = [];
      super.destroy();
    }
  }

  class UIBadge2 extends UIBaseComponent {
    constructor({ id = null, text = '', flashOnChange = true } = {}) {
      super({ id }, 'badge2');
      this.flashOnChange = flashOnChange;
      this.element = document.createElement('span');
      this.element.className = 'ui-status-display2';
      this.element.textContent = text;
    }
    setText(val) {
      if (!this.element) return this;
      this.element.textContent = val;
      if (this.flashOnChange) this.flash();
      return this;
    }
    getText() {
      return this.element ? this.element.textContent : '';
    }
    flash() {
      U.flashClass(this.element, 'animate-highlight', 500);
    }
  }

  class UICheckbox2 extends UIBaseComponent {
    constructor({ id = null, label = '', checked = false, onChange } = {}) {
      super({ id }, 'chk2');
      this.checked = !!checked;
      this.disabled = false;
      this.onChange = onChange;

      this.element = document.createElement('label');
      this.element.className = `ui-chk2-label ${this.checked ? 'checked' : ''}`;
      this.element.innerHTML = `
        <input type="checkbox" class="ui-chk2-input">
        <span class="ui-chk2-custom"></span>
        <span class="ui-label"></span>
      `;

      this.input = this.element.querySelector('.ui-chk2-input');
      this.input.checked = this.checked;
      this.labelSpan = this.element.querySelector('.ui-label');
      this.labelSpan.textContent = label;

      this._listen(this.input, 'change', () => {
        if (this.disabled) return;
        this.checked = this.input.checked;
        this.element.classList.toggle('checked', this.checked);
        if (this.onChange) this.onChange(this.checked, this);
      });
    }
    getValue() { return this.checked; }
    setValue(v) {
      this.checked = !!v;
      if (this.input) this.input.checked = this.checked;
      if (this.element) this.element.classList.toggle('checked', this.checked);
      return this;
    }
    setDisabled(v) {
      this.disabled = !!v;
      if (this.input) this.input.disabled = this.disabled;
      if (this.element) this.element.classList.toggle('disabled', this.disabled);
      return this;
    }
  }

  class UIToggle2 extends UIBaseComponent {
    constructor({ id = null, label = '', value = false, onChange } = {}) {
      super({ id }, 'tgl2');
      this.value = !!value;
      this.disabled = false;
      this.onChange = onChange;

      this.element = document.createElement('div');
      this.element.className = 'ui-tgl2-wrapper';
      this.element.innerHTML = `
        <span class="ui-label"></span>
        <div class="ui-tgl2-container ${this.value ? 'active' : ''}">
          <input type="checkbox" class="ui-tgl2-input">
          <div class="ui-tgl2-track">
            <div class="ui-tgl2-thumb"></div>
          </div>
        </div>
      `;

      this.container = this.element.querySelector('.ui-tgl2-container');
      this.input = this.element.querySelector('.ui-tgl2-input');
      this.input.checked = this.value;
      this.labelSpan = this.element.querySelector('.ui-label');
      this.labelSpan.textContent = label;

      this._listen(this.container, 'click', () => {
        if (this.disabled) return;
        this.value = !this.value;
        this.input.checked = this.value;
        this.container.classList.toggle('active', this.value);
        if (this.onChange) this.onChange(this.value, this);
      });
    }
    getValue() { return this.value; }
    setValue(v) {
      this.value = !!v;
      if (this.input) this.input.checked = this.value;
      if (this.container) this.container.classList.toggle('active', this.value);
      return this;
    }
    setDisabled(v) {
      this.disabled = !!v;
      if (this.element) this.element.classList.toggle('disabled', this.disabled);
      return this;
    }
  }

  class UIInputText2 extends UIBaseComponent {
    constructor({ id = null, value = '', placeholder = '', onChange, onInput } = {}) {
      super({ id }, 'input_text2');
      this.onChange = onChange;
      this.onInput = onInput;

      this.element = document.createElement('div');
      this.element.className = 'ui-input2-group';
      this.element.innerHTML = `
        <input type="text" class="ui-styled-input2">
        <div class="ui-input-line-fx2"></div>
      `;

      this.input = this.element.querySelector('.ui-styled-input2');
      this.input.placeholder = placeholder;
      this.input.value = value;

      this._listen(this.input, 'input', (e) => {
        if (this.onInput) this.onInput(e.target.value, e, this);
      });
      this._listen(this.input, 'change', (e) => {
        if (this.onChange) this.onChange(e.target.value, e, this);
      });
    }
    getValue() { return this.input ? this.input.value : ''; }
    setValue(v) {
      if (this.input) this.input.value = v;
      return this;
    }
    setDisabled(v) {
      if (this.input) this.input.disabled = !!v;
      return this;
    }
  }

  class UIInputNumber2 extends UIBaseComponent {
    constructor({ id = null, value = 0, step = 'any', min = null, max = null, onChange, onInput } = {}) {
      super({ id }, 'input_num2');
      this.onChange = onChange;
      this.onInput = onInput;

      this.element = document.createElement('div');
      this.element.className = 'ui-input2-group';
      this.element.innerHTML = `
        <input type="number" class="ui-styled-input2">
        <div class="ui-input-line-fx2"></div>
      `;

      this.input = this.element.querySelector('.ui-styled-input2');
      this.input.value = value;
      this.input.step = step;
      if (min !== null) this.input.min = min;
      if (max !== null) this.input.max = max;

      this._listen(this.input, 'input', (e) => {
        const v = parseFloat(e.target.value);
        if (this.onInput) this.onInput(Number.isNaN(v) ? 0 : v, e, this);
      });
      this._listen(this.input, 'change', (e) => {
        const v = parseFloat(e.target.value);
        if (this.onChange) this.onChange(Number.isNaN(v) ? 0 : v, e, this);
      });
    }
    getValue() {
      const v = parseFloat(this.input ? this.input.value : 0);
      return Number.isNaN(v) ? 0 : v;
    }
    setValue(v) {
      if (this.input) this.input.value = v;
      return this;
    }
    setDisabled(v) {
      if (this.input) this.input.disabled = !!v;
      return this;
    }
  }

  class UIButton2 extends UIBaseComponent {
    constructor({ id = null, text = 'Button', variant = 'default', onClick } = {}) {
      super({ id }, 'btn2');
      this.onClick = onClick;

      this.element = document.createElement('button');
      const vClass = variant === 'primary' ? 'ui-btn2-primary' : variant === 'reset' || variant === 'danger' ? 'ui-btn2-reset' : '';
      this.element.className = `ui-btn2 ${vClass}`.trim();
      this.element.textContent = text;
      this._listen(this.element, 'click', (e) => {
        if (this.onClick) this.onClick(e, this);
      });
    }
    setText(t) {
      if (this.element) this.element.textContent = t;
      return this;
    }
    setDisabled(v) {
      if (this.element) this.element.disabled = !!v;
      return this;
    }
    flash() { U.flashClass(this.element, 'animate-highlight', 500); }
    shake() { U.flashClass(this.element, 'animate-shake', 400); }
  }

  class UIAccordionItem extends UIBaseComponent {
    constructor({ title = 'Section', open = false, onToggle } = {}) {
      super();
      this.isOpen = !!open;
      this.onToggleCallback = onToggle;

      this.element = document.createElement('div');
      this.element.className = `ui-accordion-item ${this.isOpen ? 'open' : ''}`;
      this.element.innerHTML = `
        <div class="ui-accordion-header">
          <span class="ui-accordion-title"></span>
          <span class="ui-accordion-arrow">▶</span>
        </div>
        <div class="ui-accordion-content">
          <div class="ui-accordion-body"></div>
        </div>
      `;

      this.header = this.element.querySelector('.ui-accordion-header');
      this.titleNode = this.element.querySelector('.ui-accordion-title');
      this.titleNode.textContent = title;
      this.body = this.element.querySelector('.ui-accordion-body');

      this._listen(this.header, 'click', () => this.toggle());
    }

    append(child) {
      U.appendChild(this.body, child);
      return this;
    }

    addRow(...args) {
      let alignMode = 0;
      let children = args;
      if (typeof args[0] === 'number') {
        alignMode = args[0];
        children = args.slice(1);
      }
      const row = new UIRow({ align: alignMode, children });
      row.mount(this.body);
      return row;
    }

    open() {
      if (this.isOpen) return this;
      this.isOpen = true;
      this.element.classList.add('open');
      if (this.onToggleCallback) this.onToggleCallback(true, this);
      return this;
    }

    close() {
      if (!this.isOpen) return this;
      this.isOpen = false;
      this.element.classList.remove('open');
      if (this.onToggleCallback) this.onToggleCallback(false, this);
      return this;
    }

    toggle() {
      return this.isOpen ? this.close() : this.open();
    }

    setTitle(t) {
      if (this.titleNode) this.titleNode.textContent = t;
      return this;
    }
  }

  class UIAccordion extends UIBaseComponent {
    constructor({ exclusive = false, onChange } = {}) {
      super();
      this.exclusive = exclusive;
      this.onChange = onChange;
      this.items = [];

      this.element = document.createElement('div');
      this.element.className = 'ui-accordion';
    }

    addItem({ title = 'Section', open = false } = {}) {
      const item = new UIAccordionItem({
        title,
        open,
        onToggle: (isOpen, instance) => {
          if (isOpen && this.exclusive) {
            this.items.forEach(other => {
              if (other !== instance) other.close();
            });
          }
          if (this.onChange) this.onChange(isOpen, instance, this);
        }
      });

      this.items.push(item);
      item.mount(this.element);
      return item;
    }

    closeAll() {
      this.items.forEach(item => item.close());
      return this;
    }

    openAll() {
      if (this.exclusive) return this;
      this.items.forEach(item => item.open());
      return this;
    }

    destroy() {
      this.items.forEach(item => item.destroy());
      this.items = [];
      super.destroy();
    }
  }

  class UIInfo extends UIBaseComponent {
    constructor({ text = '', duration = 0, onDismiss } = {}) {
      super();
      this.duration = duration;
      this.timer = null;
      this.onDismiss = onDismiss;

      this.element = document.createElement('div');
      this.element.className = 'ui-info-box';
      this._textSpan = document.createElement('span');
      this._textSpan.textContent = `ℹ ${text}`;
      this.closeBtn = document.createElement('button');
      this.closeBtn.className = 'ui-info-close';
      this.closeBtn.textContent = '✕';

      this.element.appendChild(this._textSpan);
      this.element.appendChild(this.closeBtn);

      this._listen(this.closeBtn, 'click', () => this.dismiss());

      if (this.duration > 0) {
        this.timer = setTimeout(() => this.dismiss(), this.duration);
      }
    }

    setText(t) {
      if (this._textSpan) this._textSpan.textContent = `ℹ ${t}`;
      return this;
    }

    dismiss() {
      if (this.isDestroyed) return;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      if (this.element) {
        this.element.classList.add('fade-out');
        setTimeout(() => {
          if (this.onDismiss) this.onDismiss(this);
          this.destroy();
        }, 200);
      } else {
        this.destroy();
      }
    }

    destroy() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      super.destroy();
    }
  }

  class UIStorageAdapter {
    constructor() {
      this.dbName = 'UI_Layouts_DB';
      this.storeName = 'layouts';
      this.db = null;
    }
    async initIDB() {
      if (this.db) return this.db;
      return new Promise((resolve, reject) => {
        const req = indexedDB.open(this.dbName, 2);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: ['appId', 'name'] });
          }
        };
        req.onsuccess = (e) => { this.db = e.target.result; resolve(this.db); };
        req.onerror = (e) => reject(e);
      });
    }
    async getAll(appId, useIDB = false) {
      if (!useIDB) {
        try {
          const data = localStorage.getItem(`ui_layouts_store_${appId}`);
          return data ? JSON.parse(data) : [];
        } catch (_) {
          return [];
        }
      }
      const db = await this.initIDB();
      return new Promise((resolve) => {
        const tx = db.transaction(this.storeName, 'readonly');
        const store = tx.objectStore(this.storeName);
        const req = store.getAll();
        req.onsuccess = () => {
          const all = req.result || [];
          resolve(all.filter(it => it.appId === appId));
        };
        req.onerror = () => resolve([]);
      });
    }
    async save(item, useIDB = false) {
      if (!useIDB) {
        const list = await this.getAll(item.appId, false);
        const idx = list.findIndex(l => l.name === item.name);
        if (idx >= 0) list[idx] = item; else list.push(item);
        localStorage.setItem(`ui_layouts_store_${item.appId}`, JSON.stringify(list));
        return;
      }
      const db = await this.initIDB();
      return new Promise((resolve) => {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).put(item);
        tx.oncomplete = () => resolve();
      });
    }
    async delete(appId, name, useIDB = false) {
      if (!useIDB) {
        let list = await this.getAll(appId, false);
        list = list.filter(l => l.name !== name);
        localStorage.setItem(`ui_layouts_store_${appId}`, JSON.stringify(list));
        return;
      }
      const db = await this.initIDB();
      return new Promise((resolve) => {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).delete([appId, name]);
        tx.oncomplete = () => resolve();
      });
    }
  }

  class UILayoutManagerClass {
    constructor() {
      UITheme.inject();
      this.storage = new UIStorageAdapter();
      this.useIndexedDB = localStorage.getItem('ui_pref_indexeddb') === 'true';
      this.modal = null;
      this.factoryState = null;
      this.setupShortcut();

      const initRestore = () => {
        setTimeout(() => {
          this.captureFactoryState();
          this.autoRestore();
        }, 100);
      };

      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initRestore();
      } else {
        window.addEventListener('DOMContentLoaded', initRestore);
      }
    }

    getAppId() {
      return (typeof window !== 'undefined' && window.programaId) ? String(window.programaId).trim() : 'default_app';
    }

    isFactoryForced() {
      return localStorage.getItem(`ui_force_factory_${this.getAppId()}`) === 'true';
    }

    setFactoryForced(val) {
      localStorage.setItem(`ui_force_factory_${this.getAppId()}`, String(!!val));
    }

    captureFactoryState() {
      if (!this.factoryState) {
        this.factoryState = JSON.parse(JSON.stringify(this.captureCurrentState()));
      }
    }

    setupShortcut() {
      let timer = null;
      window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && !timer) {
          timer = setTimeout(() => {
            this.open();
            timer = null;
          }, 500);
        }
      });
      window.addEventListener('keyup', (e) => {
        if (!e.ctrlKey || !e.altKey) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
        }
      });
    }

    captureCurrentState() {
      const state = {};
      for (const [id, comp] of UIRegistry.getAll()) {
        if (comp.getState) state[id] = comp.getState();
      }
      return state;
    }

    applyState(state) {
      if (!state) return;
      for (const id in state) {
        const comp = UIRegistry.get(id);
        if (comp instanceof UIContainer && comp.setState) comp.setState(state[id]);
      }
      for (const id in state) {
        const comp = UIRegistry.get(id);
        if (comp && !(comp instanceof UIContainer) && comp.setState) comp.setState(state[id]);
      }
    }

    formatDate(d) {
      const pad = (n) => String(n).padStart(2, '0');
      return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }

    async saveLayout(name) {
      if (!name) return;
      const appId = this.getAppId();
      const item = {
        appId,
        name: name.trim(),
        date: this.formatDate(new Date()),
        state: this.captureCurrentState()
      };
      await this.storage.save(item, this.useIndexedDB);
      localStorage.setItem(`ui_last_active_layout_${appId}`, item.name);
      this.renderList();
    }

    async deleteLayout(name) {
      const appId = this.getAppId();
      await this.storage.delete(appId, name, this.useIndexedDB);
      this.renderList();
    }

    async loadLayout(name) {
      const appId = this.getAppId();
      const list = await this.storage.getAll(appId, this.useIndexedDB);
      const found = list.find(l => l.name === name);
      if (found && found.state) {
        this.applyState(found.state);
        localStorage.setItem(`ui_last_active_layout_${appId}`, found.name);
        this.close();
      }
    }

    async autoRestore() {
      const appId = this.getAppId();
      if (this.isFactoryForced()) {
        if (this.factoryState) this.applyState(this.factoryState);
        return;
      }
      const last = localStorage.getItem(`ui_last_active_layout_${appId}`);
      if (last) {
        const list = await this.storage.getAll(appId, this.useIndexedDB);
        const found = list.find(l => l.name === last);
        if (found && found.state) this.applyState(found.state);
      }
    }

    open() {
      if (this.modal) return;
      const appId = this.getAppId();
      const factoryActive = this.isFactoryForced();

      this.modal = document.createElement('div');
      this.modal.className = 'ui-layout-modal-backdrop';
      this.modal.innerHTML = `
        <div class="ui-layout-modal">
          <div class="ui-layout-modal-head">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="ui-panel-title">GESTOR DE INTERFAZ</span>
              <span class="ui-badge-app"></span>
            </div>
            <button class="ui-icon-btn btn-modal-close">✕</button>
          </div>
          <div class="ui-layout-modal-body">
            <div class="ui-row ui-row-align-4">
              <label class="ui-checkbox ${factoryActive ? 'checked' : ''}" id="chk-factory-mode">
                <div class="ui-checkbox-box"><div class="ui-checkbox-mark"></div></div>
                <span class="ui-label" style="color:var(--ui-accent);">MODO FÁBRICA FORZADO</span>
              </label>
            </div>
            <div class="ui-row ui-row-align-4">
              <label class="ui-checkbox ${this.useIndexedDB ? 'checked' : ''}" id="chk-use-idb">
                <div class="ui-checkbox-box"><div class="ui-checkbox-mark"></div></div>
                <span class="ui-label">INDEXED-DB (OFF = LOCALSTORAGE)</span>
              </label>
            </div>
            <div class="ui-row ui-row-align-0" id="save-bar-container" style="${factoryActive ? 'opacity:0.4; pointer-events:none;' : ''}">
              <input type="text" class="ui-input ui-input-text" id="input-layout-name" placeholder="NOMBRE (EJ: Principal)" style="flex:1;">
              <button class="ui-btn ui-btn-primary" id="btn-save-layout">GUARDAR</button>
            </div>
            <span class="ui-label" id="lbl-layouts-title" style="margin-top:4px;"></span>
            <div class="ui-layout-list" id="layout-items-container"></div>
          </div>
        </div>
      `;
      this.modal.querySelector('.ui-badge-app').textContent = appId;
      this.modal.querySelector('#lbl-layouts-title').textContent = `LAYOUTS (${appId}):`;
      document.body.appendChild(this.modal);

      this.modal.querySelector('.btn-modal-close').addEventListener('click', () => this.close());
      this.modal.addEventListener('click', (e) => { if (e.target === this.modal) this.close(); });

      const chkFactory = this.modal.querySelector('#chk-factory-mode');
      const saveBar = this.modal.querySelector('#save-bar-container');

      chkFactory.addEventListener('click', () => {
        const nowForced = !this.isFactoryForced();
        this.setFactoryForced(nowForced);
        chkFactory.classList.toggle('checked', nowForced);
        saveBar.style.opacity = nowForced ? '0.4' : '1';
        saveBar.style.pointerEvents = nowForced ? 'none' : 'auto';

        if (nowForced) {
          if (this.factoryState) this.applyState(this.factoryState);
        } else {
          this.autoRestore();
        }
        this.renderList();
      });

      const chkIdb = this.modal.querySelector('#chk-use-idb');
      chkIdb.addEventListener('click', () => {
        this.useIndexedDB = !this.useIndexedDB;
        chkIdb.classList.toggle('checked', this.useIndexedDB);
        localStorage.setItem('ui_pref_indexeddb', String(this.useIndexedDB));
        this.renderList();
      });

      const input = this.modal.querySelector('#input-layout-name');
      this.modal.querySelector('#btn-save-layout').addEventListener('click', () => {
        if (input.value) {
          this.saveLayout(input.value);
          input.value = '';
        }
      });
      this.renderList();
    }

    async renderList() {
      if (!this.modal) return;
      const appId = this.getAppId();
      const container = this.modal.querySelector('#layout-items-container');
      const isFactory = this.isFactoryForced();
      container.innerHTML = '';
      const list = await this.storage.getAll(appId, this.useIndexedDB);

      if (list.length === 0) {
        const emptyLabel = document.createElement('span');
        emptyLabel.className = 'ui-label';
        emptyLabel.style.cssText = 'text-align:center; padding: 12px; color: var(--ui-text-dim);';
        emptyLabel.textContent = 'NO HAY ESTADOS GUARDADOS';
        container.appendChild(emptyLabel);
        return;
      }

      list.forEach(item => {
        const el = document.createElement('div');
        el.className = 'ui-layout-item';
        el.innerHTML = `
          <div class="ui-layout-meta">
            <span class="ui-layout-name"></span>
            <span class="ui-layout-date"></span>
          </div>
          <div class="ui-layout-actions">
            <button class="ui-btn btn-apply" ${isFactory ? 'disabled' : ''}>CARGAR</button>
            <button class="ui-btn ui-btn-danger btn-del">✕</button>
          </div>
        `;
        el.querySelector('.ui-layout-name').textContent = item.name;
        el.querySelector('.ui-layout-date').textContent = item.date || '';
        el.querySelector('.btn-apply').addEventListener('click', () => this.loadLayout(item.name));
        el.querySelector('.btn-del').addEventListener('click', () => this.deleteLayout(item.name));
        container.appendChild(el);
      });
    }

    close() {
      if (this.modal && this.modal.parentNode) {
        this.modal.parentNode.removeChild(this.modal);
      }
      this.modal = null;
    }
  }
  const GlobalLayoutManager = new UILayoutManagerClass();

  class UISquareButton extends UIBaseComponent {
    constructor({
      id = null,
      text = 'OK',
      title = '',
      info = '',
      size = 38,
      bgColor = '#212121',
      textColor = '#595959',
      fontSize = '11px',
      draggable = false,
      floating = false,
      x = 100,
      y = 100,
      onClick
    } = {}) {
      const fallbackPrefix = title ? `sqbtn_${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}` : 'sqbtn';
      super({ id }, fallbackPrefix);

      this.text = text;
      this.titleText = title;
      this.infoText = info;
      this.size = size;
      this.bgColor = bgColor;
      this.textColor = textColor;
      this.fontSize = fontSize;
      this.isDraggable = draggable;
      this.floating = floating || draggable;
      this.x = x;
      this.y = y;
      this.onClick = onClick;

      this.isDragging = false;
      this.touchTimer = null;
      this.isLongPress = false;

      this.element = document.createElement('button');
      this.element.className = 'ui-square-btn';
      this.element.setAttribute('data-ui-id', this.id);
      this.updateAppearance();

      if (this.floating) {
        this.element.classList.add('ui-draggable-floating');
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        document.body.appendChild(this.element);
        GlobalDock.registerButton(this);
      }

      this.tooltip = document.createElement('div');
      this.tooltip.className = 'ui-square-tooltip';
      this.buildTooltip();
      document.body.appendChild(this.tooltip);

      this.bindEvents();
    }

    updateAppearance() {
      if (!this.element) return;
      this.element.textContent = this.text;
      this.element.style.setProperty('--ui-square-btn-size', `${this.size}px`);
      this.element.style.fontSize = this.fontSize;
    }

    buildTooltip() {
      this.tooltip.innerHTML = '';
      if (this.titleText) {
        const t = document.createElement('span');
        t.className = 'ui-square-tooltip-title';
        t.textContent = this.titleText;
        this.tooltip.appendChild(t);
      }
      if (this.infoText) {
        const i = document.createElement('span');
        i.className = 'ui-square-tooltip-info';
        i.textContent = this.infoText;
        this.tooltip.appendChild(i);
      }
    }

    showTooltip() {
      if (this.isDragging || (!this.titleText && !this.infoText)) return;
      const rect = this.element.getBoundingClientRect();
      this.tooltip.classList.add('visible');
      const tW = this.tooltip.offsetWidth, tH = this.tooltip.offsetHeight, gap = 8;
      const sw = window.innerWidth, sh = window.innerHeight;

      let x = 0, y = 0;
      if (sh - rect.bottom < tH + gap && rect.top >= tH) {
        x = rect.left + (rect.width / 2) - (tW / 2); y = rect.top - tH - gap;
      } else if (rect.top < tH + gap) {
        x = rect.left + (rect.width / 2) - (tW / 2); y = rect.bottom + gap;
      } else if (sw - rect.right < tW + gap) {
        x = rect.left - tW - gap; y = rect.top + (rect.height / 2) - (tH / 2);
      } else {
        x = rect.right + gap; y = rect.top + (rect.height / 2) - (tH / 2);
      }

      x = Math.max(6, Math.min(x, sw - tW - 6));
      y = Math.max(6, Math.min(y, sh - tH - 6));
      this.tooltip.style.left = `${x}px`;
      this.tooltip.style.top = `${y}px`;
    }

    hideTooltip() {
      if (this.tooltip) this.tooltip.classList.remove('visible');
    }

    bindEvents() {
      this._listen(this.element, 'mouseenter', () => this.showTooltip());
      this._listen(this.element, 'mouseleave', () => this.hideTooltip());

      let offsetX = 0, offsetY = 0, startClientX = 0, startClientY = 0, isTracking = false;

      const onPointerMove = (e) => {
        if (!isTracking) return;
        const cx = e.touches ? e.touches[0].pageX : e.pageX;
        const cy = e.touches ? e.touches[0].pageY : e.pageY;

        if (!this.isDragging) {
          const rawClientX = e.touches ? e.touches[0].clientX : e.clientX;
          const rawClientY = e.touches ? e.touches[0].clientY : e.clientY;
          if (Math.hypot(rawClientX - startClientX, rawClientY - startClientY) > 6) {
            this.isDragging = true;
            this.hideTooltip();
            this.element.classList.add('is-dragging');
          } else {
            return;
          }
        }

        if (e.cancelable) e.preventDefault();

        const evaluated = GlobalDock.evaluateSmartSnap(this, cx - offsetX, cy - offsetY);
        this.element.classList.toggle('is-snapping', evaluated.snapped);
        this.x = evaluated.x;
        this.y = evaluated.y;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
      };

      const onPointerUp = () => {
        isTracking = false;
        if (this.isDragging) {
          this.isDragging = false;
          if (this.element) this.element.classList.remove('is-dragging', 'is-snapping');
          GlobalDock.hideSmartGuides();
        }
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchend', onPointerUp);
        this._activeDragCleanup = null;
      };

      this._listen(this.element, 'mousedown', (e) => {
        if (!this.isDraggable) return;
        isTracking = true;
        this.isDragging = false;
        startClientX = e.clientX;
        startClientY = e.clientY;
        offsetX = e.pageX - this.element.offsetLeft;
        offsetY = e.pageY - this.element.offsetTop;
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerUp);
        this._activeDragCleanup = onPointerUp;
      });

      this._listen(this.element, 'touchstart', (e) => {
        const t = e.touches[0];
        isTracking = true;
        this.isDragging = false;
        startClientX = t.clientX;
        startClientY = t.clientY;
        offsetX = t.pageX - this.element.offsetLeft;
        offsetY = t.pageY - this.element.offsetTop;
        this.isLongPress = false;
        this.touchTimer = setTimeout(() => {
          if (!this.isDragging) {
            this.isLongPress = true;
            if (navigator.vibrate) navigator.vibrate(25);
            this.showTooltip();
          }
        }, 400);

        if (this.isDraggable) {
          window.addEventListener('touchmove', onPointerMove, { passive: false });
          window.addEventListener('touchend', onPointerUp);
          this._activeDragCleanup = onPointerUp;
        }
      }, { passive: true });

      this._listen(this.element, 'touchend', (e) => {
        clearTimeout(this.touchTimer);
        if (this.isLongPress) e.preventDefault();
      });

      this._listen(this.element, 'click', (e) => {
        if (this.isDragging || this.isLongPress) return;
        if (this.onClick) this.onClick(e, this);
      });
    }

    getState() {
      return {
        type: 'SquareButton',
        x: this.x,
        y: this.y,
        floating: this.floating,
        visible: this.element.style.display !== 'none'
      };
    }

    setState(s) {
      if (!s) return;
      if (s.x !== undefined) {
        this.x = s.x; this.y = s.y;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
      }
      if (s.visible !== undefined) {
        this.element.style.display = s.visible ? '' : 'none';
      }
    }

    destroy() {
      clearTimeout(this.touchTimer);
      GlobalDock.unregisterButton(this);
      this.hideTooltip();
      if (this.tooltip && this.tooltip.parentNode) this.tooltip.parentNode.removeChild(this.tooltip);
      this.tooltip = null;
      super.destroy();
    }
  }

  class UIReorderList extends UIBaseComponent {
    constructor({ items = [], maxHeight = 200, onReorder, onSelect, onVisibilityChange, renderItem } = {}) {
      super();
      this.items = [...items];
      this.activeIndex = -1;
      this.onReorder = onReorder;
      this.onSelect = onSelect;
      this.onVisibilityChange = onVisibilityChange;
      this.renderItemCustom = renderItem;

      this.element = document.createElement('div');
      this.element.className = 'ui-reorder-list';
      this.element.style.setProperty('--ui-list-max-h', `${maxHeight}px`);

      this.draggedSourceIdx = null;
      this.touchSourceIdx = null;
      this.render();
    }

    setItems(newItems, activeIdx = -1) {
      this.items = [...newItems];
      this.activeIndex = activeIdx;
      this.render();
      return this;
    }

    setActiveIndex(idx) {
      this.activeIndex = idx;
      const children = Array.from(this.element.children);
      children.forEach((c, i) => {
        const itemDataIdx = (this.items.length - 1) - i;
        c.classList.toggle('active', itemDataIdx === this.activeIndex);
      });
      return this;
    }

    render() {
      this.element.innerHTML = '';
      for (let i = this.items.length - 1; i >= 0; i--) {
        const data = this.items[i];
        const itemEl = document.createElement('div');
        itemEl.className = `ui-reorder-item ${i === this.activeIndex ? 'active' : ''}`;
        itemEl.draggable = true;

        if (this.renderItemCustom) {
          itemEl.appendChild(this.renderItemCustom(data, i));
        } else {
          const left = document.createElement('div');
          left.className = 'ui-reorder-item-left';

          const btnVis = document.createElement('button');
          btnVis.className = 'ui-icon-btn';
          btnVis.textContent = data.visible !== false ? '👁' : '✕';
          btnVis.addEventListener('click', (e) => {
            e.stopPropagation();
            data.visible = !(data.visible !== false);
            btnVis.textContent = data.visible ? '👁' : '✕';
            if (this.onVisibilityChange) this.onVisibilityChange(data, i, data.visible);
          });

          const nameSpan = document.createElement('span');
          nameSpan.textContent = data.name || `Item ${i + 1}`;

          left.appendChild(btnVis);
          left.appendChild(nameSpan);

          const rightMeta = document.createElement('small');
          rightMeta.style.opacity = '0.6';
          rightMeta.style.fontSize = '10px';
          rightMeta.textContent = data.opacity !== undefined ? `${Math.round(data.opacity * 100)}%` : '';

          itemEl.appendChild(left);
          itemEl.appendChild(rightMeta);
        }

        itemEl.addEventListener('click', () => {
          this.setActiveIndex(i);
          if (this.onSelect) this.onSelect(data, i);
        });

        itemEl.addEventListener('dragstart', (e) => {
          this.draggedSourceIdx = i;
          itemEl.classList.add('dragging');
          e.dataTransfer.effectAllowed = 'move';
        });

        itemEl.addEventListener('dragover', (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          itemEl.classList.add('drag-over');
        });

        itemEl.addEventListener('dragleave', () => itemEl.classList.remove('drag-over'));
        itemEl.addEventListener('dragend', () => {
          itemEl.classList.remove('dragging', 'drag-over');
        });

        itemEl.addEventListener('drop', (e) => {
          e.preventDefault();
          e.stopPropagation();
          itemEl.classList.remove('drag-over');

          if (this.draggedSourceIdx !== null && this.draggedSourceIdx !== i) {
            const moved = this.items.splice(this.draggedSourceIdx, 1)[0];
            this.items.splice(i, 0, moved);
            this.activeIndex = i;
            this.render();
            if (this.onReorder) this.onReorder(this.items, this.draggedSourceIdx, i);
          }
          this.draggedSourceIdx = null;
        });

        itemEl.addEventListener('touchstart', () => { this.touchSourceIdx = i; }, { passive: true });
        itemEl.addEventListener('touchend', (e) => {
          if (this.touchSourceIdx === null) return;
          const touch = e.changedTouches[0];
          const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
          const dropItem = targetEl ? targetEl.closest('.ui-reorder-item') : null;

          if (dropItem && dropItem !== itemEl) {
            const allDomItems = Array.from(this.element.children);
            const dropDomIdx = allDomItems.indexOf(dropItem);
            if (dropDomIdx !== -1) {
              const targetIdx = (this.items.length - 1) - dropDomIdx;
              const moved = this.items.splice(this.touchSourceIdx, 1)[0];
              this.items.splice(targetIdx, 0, moved);
              this.activeIndex = targetIdx;
              this.render();
              if (this.onReorder) this.onReorder(this.items, this.touchSourceIdx, targetIdx);
            }
          }
          this.touchSourceIdx = null;
        });

        this.element.appendChild(itemEl);
      }
    }
  }

  class UITable extends UIBaseComponent {
    constructor({ columns = [], data = [], endpoint = null, pageSize = 5, onRowDelete, onRowClick } = {}) {
      super();
      this.columns = columns;
      this.data = [...data];
      this.filteredData = [...data];
      this.endpoint = endpoint;
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.searchQuery = '';
      this.draggedColIdx = null;
      this.onRowDelete = onRowDelete;
      this.onRowClick = onRowClick;

      this.element = document.createElement('div');
      this.element.className = 'ui-table-container';

      this.element.innerHTML = `
        <div class="ui-table-toolbar">
          <input type="text" class="ui-input ui-input-text ui-table-search" placeholder="Buscar...">
          <button class="ui-btn btn-refresh">↻</button>
        </div>
        <div class="ui-table-scroll">
          <table class="ui-table">
            <thead><tr></tr></thead>
            <tbody></tbody>
          </table>
        </div>
        <div class="ui-table-cards"></div>
        <div class="ui-table-footer">
          <span class="ui-table-info"></span>
          <div class="ui-table-pagination">
            <button class="ui-btn btn-prev">◀</button>
            <span class="ui-label page-label"></span>
            <button class="ui-btn btn-next">▶</button>
          </div>
        </div>
      `;

      this.theadTr = this.element.querySelector('thead tr');
      this.tbody = this.element.querySelector('tbody');
      this.cardsContainer = this.element.querySelector('.ui-table-cards');
      this.searchInput = this.element.querySelector('.ui-table-search');
      this.btnRefresh = this.element.querySelector('.btn-refresh');
      this.btnPrev = this.element.querySelector('.btn-prev');
      this.btnNext = this.element.querySelector('.btn-next');
      this.infoSpan = this.element.querySelector('.ui-table-info');
      this.pageLabel = this.element.querySelector('.page-label');

      this.bindEvents();
      if (this.endpoint) this.fetchData(); else this.render();
    }

    setData(newData = []) {
      this.data = Array.isArray(newData) ? [...newData] : [];
      this.applyFilter();
      return this;
    }

    bindEvents() {
      this._listen(this.searchInput, 'input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.currentPage = 1;
        this.applyFilter();
      });
      this._listen(this.btnRefresh, 'click', () => {
        if (this.endpoint) this.fetchData(); else this.render();
      });
      this._listen(this.btnPrev, 'click', () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.render();
        }
      });
      this._listen(this.btnNext, 'click', () => {
        const totalPages = Math.ceil(this.filteredData.length / this.pageSize) || 1;
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.render();
        }
      });
    }

    async fetchData() {
      this.btnRefresh.disabled = true;
      try {
        const res = await fetch(this.endpoint);
        const json = await res.json();
        this.data = Array.isArray(json) ? json : (json.data || []);
        this.applyFilter();
      } catch (err) {
      } finally {
        if (this.btnRefresh) this.btnRefresh.disabled = false;
      }
    }

    applyFilter() {
      if (!this.searchQuery) {
        this.filteredData = [...this.data];
      } else {
        this.filteredData = this.data.filter(row => {
          return this.columns.some(col => {
            const val = row[col.key];
            return String(val !== undefined ? val : '').toLowerCase().includes(this.searchQuery);
          });
        });
      }
      const totalPages = Math.ceil(this.filteredData.length / this.pageSize) || 1;
      if (this.currentPage > totalPages) this.currentPage = totalPages;
      this.render();
    }

    deleteRow(item) {
      const originalIdx = this.data.indexOf(item);
      if (originalIdx !== -1) {
        this.data.splice(originalIdx, 1);
      }
      if (this.onRowDelete) {
        this.onRowDelete(item, originalIdx, this);
      }
      this.applyFilter();
    }

    renderHeaders() {
      this.theadTr.innerHTML = '';
      this.columns.forEach((col, idx) => {
        const th = document.createElement('th');
        th.textContent = col.label || col.key;
        th.draggable = true;

        th.addEventListener('dragstart', (e) => {
          this.draggedColIdx = idx;
          e.dataTransfer.effectAllowed = 'move';
        });
        th.addEventListener('dragover', (e) => {
          e.preventDefault();
          th.classList.add('drag-over');
        });
        th.addEventListener('dragleave', () => th.classList.remove('drag-over'));
        th.addEventListener('drop', (e) => {
          e.preventDefault();
          th.classList.remove('drag-over');
          if (this.draggedColIdx !== null && this.draggedColIdx !== idx) {
            const dragged = this.columns.splice(this.draggedColIdx, 1)[0];
            this.columns.splice(idx, 0, dragged);
            this.render();
          }
          this.draggedColIdx = null;
        });

        this.theadTr.appendChild(th);
      });

      const thAction = document.createElement('th');
      thAction.textContent = 'Acciones';
      this.theadTr.appendChild(thAction);
    }

    render() {
      this.renderHeaders();
      this.tbody.innerHTML = '';
      this.cardsContainer.innerHTML = '';

      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      const pageData = this.filteredData.slice(start, end);
      const totalPages = Math.ceil(this.filteredData.length / this.pageSize) || 1;

      this.infoSpan.textContent = `${this.filteredData.length} filas`;
      this.pageLabel.textContent = `${this.currentPage}/${totalPages}`;
      this.btnPrev.disabled = this.currentPage <= 1;
      this.btnNext.disabled = this.currentPage >= totalPages;

      pageData.forEach((row, rIdx) => {
        const tr = document.createElement('tr');
        if (this.onRowClick) {
          tr.style.cursor = 'pointer';
          tr.addEventListener('click', (e) => {
            if (!e.target.closest('button')) this.onRowClick(row, rIdx, this);
          });
        }

        this.columns.forEach(col => {
          const td = document.createElement('td');
          td.textContent = row[col.key] !== undefined ? row[col.key] : '';
          tr.appendChild(td);
        });

        const tdActions = document.createElement('td');
        tdActions.className = 'ui-table-actions-cell';
        const delBtn = document.createElement('button');
        delBtn.className = 'ui-btn ui-btn-danger';
        delBtn.textContent = '✕';
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.deleteRow(row);
        });
        tdActions.appendChild(delBtn);
        tr.appendChild(tdActions);
        this.tbody.appendChild(tr);

        const card = document.createElement('div');
        card.className = 'ui-table-card';
        if (this.onRowClick) {
          card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) this.onRowClick(row, rIdx, this);
          });
        }

        this.columns.forEach(col => {
          const crow = document.createElement('div');
          crow.className = 'ui-table-card-row';
          const lbl = document.createElement('span');
          lbl.className = 'ui-table-card-label';
          lbl.textContent = col.label || col.key;
          const val = document.createElement('span');
          val.className = 'ui-table-card-val';
          val.textContent = row[col.key] !== undefined ? row[col.key] : '';
          crow.appendChild(lbl);
          crow.appendChild(val);
          card.appendChild(crow);
        });

        const cardFooter = document.createElement('div');
        cardFooter.style.display = 'flex';
        cardFooter.style.justifyContent = 'flex-end';
        cardFooter.style.marginTop = '4px';

        const cardDelBtn = document.createElement('button');
        cardDelBtn.className = 'ui-btn ui-btn-danger';
        cardDelBtn.textContent = 'Eliminar';
        cardDelBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.deleteRow(row);
        });
        cardFooter.appendChild(cardDelBtn);
        card.appendChild(cardFooter);

        this.cardsContainer.appendChild(card);
      });
    }
  }

  class UIResponsiveGrid extends UIBaseComponent {
    constructor({ id = null, minItemWidth = 290, gap = 12, padding = 12 } = {}) {
      super({ id }, 'grid_dashboard');

      this.minWidth = typeof minItemWidth === 'number' ? `${minItemWidth}px` : minItemWidth;
      this.gap = gap;
      this.padding = padding;
      this.items = [];
      this.draggedCard = null;

      this.element = document.createElement('div');
      this.element.className = 'ui-responsive-grid';
      this.element.setAttribute('data-ui-id', this.id);

      this.element.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(${this.minWidth}, 1fr));
        gap: ${this.gap}px;
        padding: ${this.padding}px;
        width: 100%;
        box-sizing: border-box;
        align-items: start;
      `;

      this.injectStyles();
    }

    injectStyles() {
      U.injectStyleOnce('ui-grid-responsive-style', `
        .ui-responsive-grid {
          max-width: 100vw;
          overflow-x: hidden;
          box-sizing: border-box;
        }
        .ui-grid-card {
          background: var(--ui-bg-panel, #212121);
          border: 1px solid var(--ui-border, #3d3d3d);
          border-radius: var(--ui-radius-lg, 12px);
          box-shadow: var(--ui-shadow-panel, 0 10px 24px rgba(0,0,0,0.5));
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: transform var(--ui-transition-fast), border-color var(--ui-transition-fast);
          box-sizing: border-box;
          width: 100%;
        }
        .ui-grid-card.is-dragging {
          opacity: 0.35;
          transform: scale(0.97);
        }
        .ui-grid-card.drag-over {
          border-color: var(--ui-accent) !important;
          box-shadow: 0 0 12px var(--ui-accent-glow, rgba(33,149,243,0.4)) !important;
        }
        .ui-grid-card.is-collapsed .ui-panel-body,
        .ui-grid-card.is-collapsed .ui-grid-card-body {
          display: none !important;
        }
        .ui-grid-card-header {
          height: var(--ui-panel-header-h, 36px);
          background: var(--ui-bg-surface, #212121);
          border-bottom: 1px solid var(--ui-border, #3d3d3d);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 12px;
          cursor: grab;
        }
        .ui-grid-card-header:active { cursor: grabbing; }
        .ui-grid-card-title {
          font-size: var(--ui-font-size-panel-title, 14px);
          font-weight: 600;
          color: var(--ui-text-panel-title, #9a9a9a);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ui-grid-drag-handle {
          color: var(--ui-text-dim, #555);
          font-size: 14px;
          cursor: grab;
        }
        .ui-grid-card-tools {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .ui-grid-card-body {
          padding: var(--ui-panel-body-padding, 10px);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        @media (max-width: 992px) {
          .ui-responsive-grid {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)) !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 768px) {
          .ui-responsive-grid {
            grid-template-columns: 1fr !important;
            padding: 8px !important;
            gap: 10px !important;
          }
          .ui-responsive-grid .ui-grid-card {
            grid-column: 1 / -1 !important;
            width: 100% !important;
          }
        }
      `);
    }

    addElement(item, { title = 'Elemento', colSpan = 1, collapsible = true, closable = true, draggable = true } = {}) {
      if (!item) return this;
      let card = null;

      if (item instanceof UISmartPanel) {
        item.inResponsiveGrid = true;
        item.floating = false;
        GlobalDock.unregister(item);
        item.updateFloatButtonUI();

        item.element.classList.add('ui-panel-static', 'ui-grid-card');
        item.element.style.position = 'relative';
        item.element.style.removeProperty('left');
        item.element.style.removeProperty('top');
        item.element.style.left = 'auto';
        item.element.style.top = 'auto';
        item.element.style.width = '100%';
        item.element.style.margin = '0';

        card = item.element;
        card.classList.remove('collapsed');

        const prevClose = item.onCloseCallback;
        item.onCloseCallback = (p) => {
          if (prevClose) prevClose(p);
          card.style.display = 'none';
        };
      } else {
        card = document.createElement('div');
        card.className = 'ui-grid-card';

        const content = (item.mount && item.element) ? item.element : (item instanceof HTMLElement ? item : null);

        card.innerHTML = `
          <div class="ui-grid-card-header">
            <span class="ui-grid-card-title">
              ${draggable ? '<span class="ui-grid-drag-handle">⠿</span>' : ''}
              <span class="ui-grid-card-title-text"></span>
            </span>
            <div class="ui-grid-card-tools">
              ${collapsible ? '<button class="ui-icon-btn btn-col">_</button>' : ''}
              ${closable ? '<button class="ui-icon-btn btn-cls">✕</button>' : ''}
            </div>
          </div>
          <div class="ui-grid-card-body"></div>
        `;
        card.querySelector('.ui-grid-card-title-text').textContent = title;

        const body = card.querySelector('.ui-grid-card-body');
        if (content) body.appendChild(content);

        if (collapsible) {
          const btnCol = card.querySelector('.btn-col');
          btnCol.addEventListener('click', (e) => {
            e.stopPropagation();
            const isCol = card.classList.toggle('is-collapsed');
            btnCol.textContent = isCol ? '□' : '_';
          });
        }

        if (closable) {
          const btnCls = card.querySelector('.btn-cls');
          btnCls.addEventListener('click', (e) => {
            e.stopPropagation();
            card.style.display = 'none';
          });
        }
      }

      if (colSpan === 'full') {
        card.style.gridColumn = '1 / -1';
      } else if (typeof colSpan === 'number' && colSpan > 1) {
        card.style.gridColumn = `span ${colSpan}`;
      }

      if (draggable) this.setupDragEvents(card);

      this.element.appendChild(card);
      this.items.push({ item, card });
      return this;
    }

    setupDragEvents(card) {
      card.setAttribute('draggable', 'true');

      card.addEventListener('dragstart', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          return;
        }
        if (!e.target.closest('.ui-panel-header') && !e.target.closest('.ui-grid-card-header')) {
          e.preventDefault();
          return;
        }
        this.draggedCard = card;
        card.classList.add('is-dragging');
        e.dataTransfer.effectAllowed = 'move';
      });

      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (this.draggedCard && this.draggedCard !== card) {
          card.classList.add('drag-over');
        }
      });

      card.addEventListener('dragleave', () => card.classList.remove('drag-over'));

      card.addEventListener('dragend', () => {
        card.classList.remove('is-dragging');
        this.element.querySelectorAll('.ui-grid-card').forEach(c => c.classList.remove('drag-over'));
        this.draggedCard = null;
      });

      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');
        if (this.draggedCard && this.draggedCard !== card) {
          const allCards = Array.from(this.element.children);
          const fromIdx = allCards.indexOf(this.draggedCard);
          const toIdx = allCards.indexOf(card);

          if (fromIdx < toIdx) {
            this.element.insertBefore(this.draggedCard, card.nextSibling);
          } else {
            this.element.insertBefore(this.draggedCard, card);
          }
        }
      });
    }

    showAllClosed() {
      this.items.forEach(({ card }) => { card.style.display = 'flex'; });
      return this;
    }
  }

  class UIColorPicker extends UIBaseComponent {
  constructor({
    id = null,
    title = 'Color Picker',
    x = 40,
    y = 40,
    floating = true,
    initialColor = null,
    canvas = null,
    onChange = () => {},
    onEyedropperToggle = () => {}
  } = {}) {
    super({ id }, 'color_picker');

    this.title = title;
    this.floating = floating;
    this.callback = typeof onChange === 'function' ? onChange : () => {};
    this.onEyedropperToggle = typeof onEyedropperToggle === 'function' ? onEyedropperToggle : () => {};

    const initRGB = this.parseInitialRGBA(initialColor);
    const initHSV = this.rgbToHsv(initRGB.r, initRGB.g, initRGB.b);
    this.hue = initHSV.h;
    this.sat = initHSV.s;
    this.val = initHSV.v;
    this.alpha = initRGB.a;

    this.isDraggingTriangle = false;
    this.isDraggingRing = false;
    this.isDraggingRectSV = false;
    this.isDraggingRectHue = false;
    this.lastRenderedHue = -1;
    this.cachedGlobalStats = null;
    this.infoDeColores = null;

    this.canvasSource = null;
    this.currentCanvas = null;
    this.currentCtx = null;
    this.isRectMode = true;

    this.isEyedropperActive = false;
    this.isEyedropperMouseDown = false;
    this._overlayEyedropper = null;
    this._bubbleEyedropper = null;
    this._paletteModal = null;
    this._activeDrags = new Set();
    this._onEyedropperMove = null;
    this._onEyedropperUp = null;
    this._onEyedropperKey = null;

    this.panel = new UISmartPanel({
      id: `${this.id}_panel`,
      title: this.title,
      x,
      y,
      width: 310,
      floating: this.floating
    });

    this.element = this.panel.element;
    this.buildPickerUI();
    this.dom.chkRect.classList.toggle('checked', this.isRectMode);
    this.dom.root.classList.toggle('mode-rect', this.isRectMode);
    this.bindEvents();

    if (canvas) {
      this.setCanvas(canvas);
    }

    this._rafId = requestAnimationFrame(() => {
      if (this.isDestroyed) return;
      this.renderTriangle();
      this.updateUI();
    });
  }

  setCanvas(source) {
    this.canvasSource = source;
    this.refreshCanvasTarget();
    this.updateImageStats();
    this.updateUI();
    return this;
  }

  setElementoAnalizar(source) {
    this.setCanvas(source);
    return Promise.resolve();
  }

  _resolveCanvas() {
    let src = this.canvasSource;
    if (typeof src === 'function') {
      try { src = src(); } catch (_) { return null; }
    }
    if (typeof src === 'string') {
      src = document.querySelector(src);
    }
    return (src instanceof HTMLCanvasElement) ? src : null;
  }

  refreshCanvasTarget() {
    const target = this._resolveCanvas();
    if (target !== this.currentCanvas) {
      this.currentCanvas = target;
      if (this.currentCanvas) {
        try {
          this.currentCtx = this.currentCanvas.getContext('2d', { willReadFrequently: true });
        } catch (_) {
          this.currentCtx = null;
        }
      } else {
        this.currentCtx = null;
      }
    }
    return this.currentCanvas;
  }

  parseInitialRGBA(col) {
    const def = { r: 56, g: 189, b: 248, a: 1.0 };
    if (!col || typeof col !== 'object') return def;
    let r = col.r !== undefined ? Number(col.r) : 56;
    let g = col.g !== undefined ? Number(col.g) : 189;
    let b = col.b !== undefined ? Number(col.b) : 248;
    let a = col.a !== undefined ? Number(col.a) : 1.0;

    if (r <= 1 && g <= 1 && b <= 1 && (r > 0 || g > 0 || b > 0)) {
      r = Math.round(r * 255);
      g = Math.round(g * 255);
      b = Math.round(b * 255);
    } else {
      r = Math.round(r);
      g = Math.round(g);
      b = Math.round(b);
    }
    return {
      r: Math.max(0, Math.min(255, Number.isNaN(r) ? 56 : r)),
      g: Math.max(0, Math.min(255, Number.isNaN(g) ? 189 : g)),
      b: Math.max(0, Math.min(255, Number.isNaN(b) ? 248 : b)),
      a: Math.max(0, Math.min(1, Number.isNaN(a) ? 1.0 : a))
    };
  }

  buildPickerUI() {
    const container = document.createElement('div');
    container.className = 'ui-cp-root';

    container.innerHTML = `
      <div class="ui-row ui-row-align-4" style="margin-bottom: 4px;">
        <label class="ui-checkbox chk-rect-mode">
          <div class="ui-checkbox-box"><div class="ui-checkbox-mark"></div></div>
          <span class="ui-label">Rect</span>
        </label>
        <div style="display:flex; gap:6px;">
          <button class="ui-btn btn-palette" style="height:24px; padding:0 8px; font-size:13px;">Palette</button>
          <button class="ui-btn btn-eyedropper" style="height:24px; padding:0 8px; font-size:13px;">Picker</button>
        </div>
      </div>

      <div class="ui-cp-wheel">
        <div class="ui-cp-ring"></div>
        <canvas class="ui-cp-triangle" width="130" height="115"></canvas>
        <div class="ui-cp-ring-pointer"></div>
        <div class="ui-cp-tri-pointer"></div>
      </div>

      <div class="ui-cp-rect-container">
        <div class="ui-cp-rect-sv"><div class="ui-cp-rect-sv-pointer"></div></div>
        <div class="ui-cp-rect-hue"><div class="ui-cp-rect-hue-pointer"></div></div>
      </div>

      <div class="ui-cp-sliders">
        <div class="ui-cp-slider-row"><div class="ui-cp-slider-bg slider-hue-bg"></div>
          <input type="range" class="ui-cp-slider slider-hue" min="0" max="360" value="${this.hue}"></div>
        <div class="ui-cp-slider-row"><div class="ui-cp-slider-bg slider-sat-bg"></div>
          <input type="range" class="ui-cp-slider slider-sat" min="0" max="100" value="${Math.round(this.sat)}"></div>
        <div class="ui-cp-slider-row"><div class="ui-cp-slider-bg slider-val-bg"></div>
          <input type="range" class="ui-cp-slider slider-val" min="0" max="100" value="${Math.round(this.val)}"></div>
        <div class="ui-cp-slider-row"><div class="ui-cp-slider-bg slider-alpha-bg"></div>
          <input type="range" class="ui-cp-slider slider-alpha" min="0" max="1" step="0.01" value="${this.alpha}"></div>
      </div>

      <div class="ui-cp-preview-bar">
        <span class="ui-label" style="font-size:13px;">COLOR:</span>
        <div class="ui-cp-preview"></div>
      </div>

      <div class="ui-row ui-row-align-0" style="margin-top:6px; gap:4px;">
        <span class="ui-label" style="width:36px;">rgba:</span>
        <input type="number" step="0.01" min="0" max="1" class="ui-input inp-rgba-r" style="width:52px; padding:0 2px; text-align:center;">
        <input type="number" step="0.01" min="0" max="1" class="ui-input inp-rgba-g" style="width:52px; padding:0 2px; text-align:center;">
        <input type="number" step="0.01" min="0" max="1" class="ui-input inp-rgba-b" style="width:52px; padding:0 2px; text-align:center;">
        <input type="number" step="0.01" min="0" max="1" class="ui-input inp-rgba-a" style="width:52px; padding:0 2px; text-align:center;">
      </div>

      <div class="ui-row ui-row-align-0" style="gap:4px;">
        <span class="ui-label" style="width:36px;">RGBA:</span>
        <input type="number" step="1" min="0" max="255" class="ui-input inp-RGBA-r" style="width:52px; padding:0 2px; text-align:center;">
        <input type="number" step="1" min="0" max="255" class="ui-input inp-RGBA-g" style="width:52px; padding:0 2px; text-align:center;">
        <input type="number" step="1" min="0" max="255" class="ui-input inp-RGBA-b" style="width:52px; padding:0 2px; text-align:center;">
        <input type="number" step="1" min="0" max="255" class="ui-input inp-RGBA-a" style="width:52px; padding:0 2px; text-align:center;">
      </div>

      <div class="ui-row ui-row-align-0" style="gap:6px; align-items:flex-start;">
        <span class="ui-label" style="width:36px; padding-top:6px;">hex:</span>
        <input type="text" class="ui-input inp-hex" style="width:85px; font-family:var(--ui-font-family-mono); text-align:center;" maxlength="7">
        <div class="ui-cp-stats">
          <div class="ui-cp-stats-global"></div>
          <div class="ui-cp-stats-sel"></div>
        </div>
        <div class="ui-cp-statsrgba">
          <div class="mtac colorDm"></div>
          <div class="dfrg colorDm"></div>
          <div class="dfrb colorDm"></div>
        </div>
      </div>
    `;

    this.panel.append(container);
    this.dom = {
      root: container,
      chkRect: container.querySelector('.chk-rect-mode'),
      btnPalette: container.querySelector('.btn-palette'),
      btnEyedropper: container.querySelector('.btn-eyedropper'),
      wheel: container.querySelector('.ui-cp-wheel'),
      ring: container.querySelector('.ui-cp-ring'),
      triangle: container.querySelector('.ui-cp-triangle'),
      ringPointer: container.querySelector('.ui-cp-ring-pointer'),
      triPointer: container.querySelector('.ui-cp-tri-pointer'),
      rectContainer: container.querySelector('.ui-cp-rect-container'),
      rectSV: container.querySelector('.ui-cp-rect-sv'),
      rectSVPtr: container.querySelector('.ui-cp-rect-sv-pointer'),
      rectHue: container.querySelector('.ui-cp-rect-hue'),
      rectHuePtr: container.querySelector('.ui-cp-rect-hue-pointer'),
      sliderHue: container.querySelector('.slider-hue'),
      sliderSat: container.querySelector('.slider-sat'),
      sliderVal: container.querySelector('.slider-val'),
      sliderAlpha: container.querySelector('.slider-alpha'),
      hueBg: container.querySelector('.slider-hue-bg'),
      satBg: container.querySelector('.slider-sat-bg'),
      valBg: container.querySelector('.slider-val-bg'),
      alphaBg: container.querySelector('.slider-alpha-bg'),
      preview: container.querySelector('.ui-cp-preview'),
      rgbaR: container.querySelector('.inp-rgba-r'),
      rgbaG: container.querySelector('.inp-rgba-g'),
      rgbaB: container.querySelector('.inp-rgba-b'),
      rgbaA: container.querySelector('.inp-rgba-a'),
      RGBAR: container.querySelector('.inp-RGBA-r'),
      RGBAG: container.querySelector('.inp-RGBA-g'),
      RGBAB: container.querySelector('.inp-RGBA-b'),
      RGBAA: container.querySelector('.inp-RGBA-a'),
      hex: container.querySelector('.inp-hex'),
      statsGlobal: container.querySelector('.ui-cp-stats-global'),
      statsSel: container.querySelector('.ui-cp-stats-sel'),
      dfrg: container.querySelector('.dfrg'),
      dfrb: container.querySelector('.dfrb'),
      rounessRgba: container.querySelector('.mtac')
    };

    this.triCtx = this.dom.triangle.getContext('2d', { willReadFrequently: true });
  }

  renderTriangle() {
    const w = this.dom.triangle.width;
    const h = this.dom.triangle.height;
    const img = this.triCtx.createImageData(w, h);
    const data = img.data;
    const hue = this.hue;

    for (let y = 0; y < h; y++) {
      const yn = y / (h - 1);
      const halfW = 0.5 * w * yn;
      const xStart = Math.max(0, Math.floor(0.5 * w - halfW));
      const xEnd = Math.min(w - 1, Math.ceil(0.5 * w + halfW));

      for (let x = xStart; x <= xEnd; x++) {
        const xn = x / (w - 1);
        let S = 100 * (xn + 0.5 - 0.5 * yn);
        let V = 100 * yn;
        S = S < 0 ? 0 : S > 100 ? 100 : S;
        V = V < 0 ? 0 : V > 100 ? 100 : V;

        const { r, g, b } = this.hsvToRgb(hue, S, V);
        const idx = (y * w + x) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = b;
        data[idx + 3] = 255;
      }
    }
    this.triCtx.putImageData(img, 0, 0);
    this.lastRenderedHue = hue;
  }

  _bindPointerDrag(target, flagName, onUpdate) {
    const onMove = (e) => {
      if (!this[flagName]) return;
      if (e.cancelable) e.preventDefault();
      onUpdate(e);
    };
    const onUp = () => {
      this[flagName] = false;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      this._activeDrags.delete(onUp);
    };
    this._listen(target, 'pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      e.preventDefault();
      this[flagName] = true;
      onUpdate(e);
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
      this._activeDrags.add(onUp);
    });
  }

  bindEvents() {
    this._listen(this.dom.root, 'mousedown', (e) => e.stopPropagation());

    this._listen(this.dom.chkRect, 'click', () => {
      this.isRectMode = !this.isRectMode;
      this.dom.chkRect.classList.toggle('checked', this.isRectMode);
      this.dom.root.classList.toggle('mode-rect', this.isRectMode);
      this.updateUI();
    });

    this._listen(this.dom.sliderHue, 'input', (e) => {
      this.hue = parseFloat(e.target.value);
      this.renderTriangle();
      this.updateUI();
    });
    this._listen(this.dom.sliderSat, 'input', (e) => {
      this.sat = parseFloat(e.target.value);
      this.updateUI();
    });
    this._listen(this.dom.sliderVal, 'input', (e) => {
      this.val = parseFloat(e.target.value);
      this.updateUI();
    });
    this._listen(this.dom.sliderAlpha, 'input', (e) => {
      this.alpha = parseFloat(e.target.value);
      this.updateUI();
    });

    this._bindPointerDrag(this.dom.ring, 'isDraggingRing', (e) => this.updateHueFromMouse(e));
    this._bindPointerDrag(this.dom.triangle, 'isDraggingTriangle', (e) => this.updateSVFromMouse(e));
    this._bindPointerDrag(this.dom.rectSV, 'isDraggingRectSV', (e) => this.updateSVFromMouseRect(e));
    this._bindPointerDrag(this.dom.rectHue, 'isDraggingRectHue', (e) => this.updateHueFromMouseRect(e));

    const onRgbaChange = () => {
      const r = parseFloat(this.dom.rgbaR.value) || 0;
      const g = parseFloat(this.dom.rgbaG.value) || 0;
      const b = parseFloat(this.dom.rgbaB.value) || 0;
      const a = this.dom.rgbaA.value !== '' ? parseFloat(this.dom.rgbaA.value) : this.alpha;
      this.setFromRGB(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a, 'rgba');
    };
    [this.dom.rgbaR, this.dom.rgbaG, this.dom.rgbaB, this.dom.rgbaA].forEach((k) => {
      this._listen(k, 'input', onRgbaChange);
    });

    const onRGBAChange = () => {
      const r = parseFloat(this.dom.RGBAR.value) || 0;
      const g = parseFloat(this.dom.RGBAG.value) || 0;
      const b = parseFloat(this.dom.RGBAB.value) || 0;
      const a = this.dom.RGBAA.value !== '' ? parseFloat(this.dom.RGBAA.value) / 255 : this.alpha;
      this.setFromRGB(Math.round(r), Math.round(g), Math.round(b), a, 'RGBA');
    };
    [this.dom.RGBAR, this.dom.RGBAG, this.dom.RGBAB, this.dom.RGBAA].forEach((k) => {
      this._listen(k, 'input', onRGBAChange);
    });

    this._listen(this.dom.hex, 'input', () => this.setHex(this.dom.hex.value));
    this._listen(this.dom.btnEyedropper, 'click', () => this.toggleEyedropper());
    this._listen(this.dom.btnPalette, 'click', () => this.openPaletteModal());
  }

  updateHueFromMouse(e) {
    const r = this.dom.wheel.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const a = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    this.hue = (a + 90 + 360) % 360;
    this.dom.sliderHue.value = Math.round(this.hue);
    this.renderTriangle();
    this.updateUI();
  }

  updateSVFromMouse(e) {
    const r = this.dom.triangle.getBoundingClientRect();
    const tW = this.dom.triangle.width;
    const tH = this.dom.triangle.height;

    let mx = (e.clientX - r.left) * (tW / r.width);
    let my = (e.clientY - r.top) * (tH / r.height);

    my = Math.max(0, Math.min(tH - 0.001, my));
    const yn = my / (tH - 1);

    let xn = mx / (tW - 1);
    const minXn = 0.5 - 0.5 * yn;
    const maxXn = 0.5 + 0.5 * yn;
    xn = Math.max(minXn, Math.min(maxXn, xn));

    let S = 100 * (xn + 0.5 - 0.5 * yn);
    let V = 100 * yn;
    S = Math.max(0, Math.min(100, S));
    V = Math.max(0, Math.min(100, V));

    this.sat = S;
    this.val = V;
    this.dom.sliderSat.value = Math.round(S);
    this.dom.sliderVal.value = Math.round(V);
    this.updateUI();
  }

  updateSVFromMouseRect(e) {
    const r = this.dom.rectSV.getBoundingClientRect();
    let mx = (e.clientX - r.left) / r.width;
    let my = (e.clientY - r.top) / r.height;

    mx = Math.max(0, Math.min(1, mx));
    my = Math.max(0, Math.min(1, my));

    this.sat = mx * 100;
    this.val = (1 - my) * 100;

    this.dom.sliderSat.value = Math.round(this.sat);
    this.dom.sliderVal.value = Math.round(this.val);
    this.updateUI();
  }

  updateHueFromMouseRect(e) {
    const r = this.dom.rectHue.getBoundingClientRect();
    let my = (e.clientY - r.top) / r.height;
    my = Math.max(0, Math.min(1, my));

    this.hue = my * 360;
    this.dom.sliderHue.value = Math.round(this.hue);
    this.renderTriangle();
    this.updateUI();
  }

  updateUI(source = null) {
    const rgb = this.hsvToRgb(this.hue, this.sat, this.val);
    const currentColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    this.dom.preview.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.alpha})`;

    if (Math.abs(this.hue - this.lastRenderedHue) > 0.5) {
      this.renderTriangle();
    }

    this.dom.satBg.style.background = `linear-gradient(to right, hsl(${this.hue}, 0%, 50%), hsl(${this.hue}, 100%, 50%))`;
    this.dom.valBg.style.background = `linear-gradient(to right, black, hsl(${this.hue}, 100%, 50%))`;
    this.dom.alphaBg.style.background = `linear-gradient(to right, transparent, ${currentColor})`;

    const cW = this.dom.wheel.clientWidth;
    const cH = this.dom.wheel.clientHeight;
    const tW = this.dom.triangle.clientWidth;
    const tH = this.dom.triangle.clientHeight;
    if (cW && tW) {
      const cx = cW / 2;
      const cy = cH / 2;
      const rr = cW / 2 - 8;
      const aR = (this.hue - 90) * (Math.PI / 180);

      this.dom.ringPointer.style.left = `${cx + Math.cos(aR) * rr}px`;
      this.dom.ringPointer.style.top = `${cy + Math.sin(aR) * rr}px`;

      const yn = this.val / 100;
      const xn = (this.sat - 50 + this.val / 2) / 100;
      const oX = (cW - tW) / 2;
      const oY = (cH - tH) / 2;
      this.dom.triPointer.style.left = `${oX + xn * tW}px`;
      this.dom.triPointer.style.top = `${oY + yn * tH}px`;
    }

    if (this.isRectMode) {
      this.dom.rectSV.style.background = `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, transparent), hsl(${this.hue}, 100%, 50%)`;
      this.dom.rectSVPtr.style.left = `${this.sat}%`;
      this.dom.rectSVPtr.style.top = `${100 - this.val}%`;
      this.dom.rectHuePtr.style.top = `${(this.hue / 360) * 100}%`;
    }

    if (source !== 'rgba') {
      this.dom.rgbaR.value = (rgb.r / 255).toFixed(2);
      this.dom.rgbaG.value = (rgb.g / 255).toFixed(2);
      this.dom.rgbaB.value = (rgb.b / 255).toFixed(2);
      this.dom.rgbaA.value = Number(this.alpha).toFixed(2);
    }
    if (source !== 'RGBA') {
      this.dom.RGBAR.value = rgb.r;
      this.dom.RGBAG.value = rgb.g;
      this.dom.RGBAB.value = rgb.b;
      this.dom.RGBAA.value = Math.round(this.alpha * 255);
    }
    if (source !== 'hex') {
      this.dom.hex.value = this.rgbToHex(rgb.r, rgb.g, rgb.b);
    }

    const selMax = Math.max(rgb.r, rgb.g, rgb.b) / 255;
    const selMin = Math.min(rgb.r, rgb.g, rgb.b) / 255;
    const selSat = selMax > 0 ? +(selMin / selMax + 0.00001).toFixed(3) : 0;
    this.dom.statsSel.innerHTML = `
      <span class="k">max:</span><span class="v">${selMax.toFixed(3)}</span><br>
      <span class="k">min:</span><span class="v">${selMin.toFixed(3)}</span><br>
      <span class="k">sat:</span><span class="s">${selSat}</span>
    `;

    this.notifyChange();
  }

  notifyChange() {
    const rgb = this.hsvToRgb(this.hue, this.sat, this.val);
    const rgba = `vec4(${(rgb.r / 255).toFixed(2)}, ${(rgb.g / 255).toFixed(2)}, ${(rgb.b / 255).toFixed(2)}, ${Number(this.alpha).toFixed(2)})`;
    const RGBA = `vec4(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.round(this.alpha * 255)})`;
    const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
    const selMax = Math.max(rgb.r, rgb.g, rgb.b);
    const selMin = Math.min(rgb.r, rgb.g, rgb.b);
    const delta = selMax - selMin;
    const max = selMax / 255;
    const min = selMin / 255;
    const dv = min / (max + 0.00001);

    const info = {
      global: this.cachedGlobalStats ? { ...this.cachedGlobalStats } : null,
      selected: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        max: selMax,
        min: selMin,
        delta: delta,
        sat: selMax > 0 ? +(selMin / selMax).toFixed(3) : 0,
        minOverMax: selMax > 0 ? +(selMin / selMax).toFixed(4) : 0,
        maxOverMin: selMin > 0 ? +(selMax / selMin).toFixed(4) : selMax > 0 ? Infinity : 1
      },
      stats: {
        max: selMax,
        min: selMin,
        delta: delta,
        minOverMax: selMax > 0 ? +(selMin / selMax).toFixed(4) : 0,
        maxOverMin: selMin > 0 ? +(selMax / selMin).toFixed(4) : selMax > 0 ? Infinity : 1
      },
      rgba: {
        r: +(rgb.r / 255).toFixed(4),
        g: +(rgb.g / 255).toFixed(4),
        b: +(rgb.b / 255).toFixed(4),
        a: +Number(this.alpha).toFixed(4)
      },
      RGBA: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: Math.round(this.alpha * 255)
      },
      hex: hex,
      eyedropperActive: this.isEyedropperActive
    };
    this.infoDeColores = info;

    let max3 = (this.infoDeColores.selected.max / 255) * 1.3;
    if (max3 > 1) max3 = 1.0;
    const dfMaxMin = (this.infoDeColores.selected.max / 255 - this.infoDeColores.selected.min / 255).toFixed(3);

    let dfrg = (this.infoDeColores.selected.r - this.infoDeColores.selected.g) / 255;
    let dfrb = this.infoDeColores.selected.r / 255 - this.infoDeColores.selected.b / 255;
    if (dfrb < -0.13) dfrb = -0.13;
    if (dfrb > 0.33) dfrb = 0.33;
    if (dfrg < -0.13) dfrg = -0.13;
    if (dfrg > 0.33) dfrg = 0.33;

    let rounescal = 0.4 + dfrb;
    if (rounescal > 1) rounescal = 1;
    if (dv > 0.98) rounescal = (0.5 - max) * 0.5;
    const metalicval = 1 - max3;

    this.dom.dfrg.textContent = `r-g: ${dfrg.toFixed(3)}  max-min: ${dfMaxMin}`;
    this.dom.dfrb.textContent = `r-b: ${dfrb.toFixed(3)} metalic: ${metalicval.toFixed(3)}`;
    this.dom.rounessRgba.textContent = `rouness: ${rounescal.toFixed(3)}`;
    this.callback(rgba, RGBA, hex, info);
  }

  setHex(hex) {
    if (typeof hex !== 'string') return;
    hex = hex.trim().replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    if (/^[0-9a-fA-F]{6}$/.test(hex)) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      this.setFromRGB(r, g, b, this.alpha, 'hex');
    }
  }

  _unpackColorArgs(r, g, b, a, defaultA) {
    if (typeof r === 'object' && r !== null) {
      return {
        r: r.r !== undefined ? r.r : 0,
        g: r.g !== undefined ? r.g : 0,
        b: r.b !== undefined ? r.b : 0,
        a: r.a !== undefined ? r.a : defaultA
      };
    }
    return { r, g, b, a };
  }

  setrgba(r, g, b, a) {
    const c = this._unpackColorArgs(r, g, b, a, 1);
    const ir = Math.round(parseFloat(c.r || 0) * 255);
    const ig = Math.round(parseFloat(c.g || 0) * 255);
    const ib = Math.round(parseFloat(c.b || 0) * 255);
    const ia = c.a !== undefined ? parseFloat(c.a) : this.alpha;
    this.setFromRGB(ir, ig, ib, ia, 'rgba');
  }

  setRGBA(r, g, b, a) {
    const c = this._unpackColorArgs(r, g, b, a, 255);
    const ir = Math.round(parseFloat(c.r || 0));
    const ig = Math.round(parseFloat(c.g || 0));
    const ib = Math.round(parseFloat(c.b || 0));
    let ia = this.alpha;
    if (c.a !== undefined) ia = Number(c.a) > 1 ? Number(c.a) / 255 : Number(c.a);
    this.setFromRGB(ir, ig, ib, ia, 'RGBA');
  }

  setFromRGB(r, g, b, a, source) {
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    a = Math.max(0, Math.min(1, a !== undefined && a !== null ? a : this.alpha));
    const hsv = this.rgbToHsv(r, g, b);
    if (hsv.s > 0) this.hue = hsv.h;
    this.sat = hsv.s;
    this.val = hsv.v;
    this.alpha = a;
    this.dom.sliderHue.value = Math.round(this.hue);
    this.dom.sliderSat.value = Math.round(this.sat);
    this.dom.sliderVal.value = Math.round(this.val);
    this.dom.sliderAlpha.value = this.alpha;
    this.renderTriangle();
    this.updateUI(source);
  }

  hsvToRgb(h, s, v) {
    h = (((h % 360) + 360) % 360) / 360;
    s /= 100;
    v /= 100;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r, g, b;
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    const d = mx - mn;
    let h = 0;
    if (d !== 0) {
      if (mx === r) h = ((g - b) / d) % 6;
      else if (mx === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
      if (h < 0) h += 360;
    }
    return { h, s: (mx === 0 ? 0 : d / mx) * 100, v: mx * 100 };
  }

  rgbToHex(r, g, b) {
    const h = (n) => n.toString(16).padStart(2, '0');
    return `#${h(r)}${h(g)}${h(b)}`;
  }

  analyzeCanvas() {
    const act = this._resolveCanvas();
    if (!act || !(act instanceof HTMLCanvasElement)) return null;
    let actCtx;
    try {
      actCtx = act.getContext('2d', { willReadFrequently: true });
    } catch (_) {
      return null;
    }
    let imgData;
    try {
      imgData = actCtx.getImageData(0, 0, act.width, act.height);
    } catch (_) {
      return null;
    }
    const data = imgData.data;
    let mx = 0;
    let mn = 255;
    let sumMax = 0;
    let sumMin = 0;
    let count = 0;

    for (let i = 0; i < data.length; i += 16) {
      if (data[i + 3] < 128) continue;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const cMax = Math.max(r, g, b);
      const cMin = Math.min(r, g, b);
      if (cMax > mx) mx = cMax;
      if (cMin < mn) mn = cMin;
      sumMax += cMax;
      sumMin += cMin;
      count++;
    }
    if (count === 0) return null;
    return {
      max: mx,
      avgMax: +(sumMax / count).toFixed(1),
      min: mn,
      avgMin: +(sumMin / count).toFixed(1),
      sat: mx > 0 ? +(mn / mx).toFixed(3) : 0,
      pixels: count
    };
  }

  updateImageStats() {
    this.cachedGlobalStats = this.analyzeCanvas();
    if (!this.dom.statsGlobal) return;
    if (!this.cachedGlobalStats) {
      this.dom.statsGlobal.innerHTML = '';
      return;
    }
    const s = this.cachedGlobalStats;
    this.dom.statsGlobal.innerHTML = `
      <span class="k">max:</span><span class="v">${s.max}</span> <span class="k">avg:</span><span class="v">${s.avgMax}</span><br>
      <span class="k">min:</span><span class="v">${s.min}</span> <span class="k">avg:</span><span class="v">${s.avgMin}</span><br>
      <span class="k">sat:</span><span class="s">${s.sat}</span>
    `;
  }

  samplePixelFromCanvas(clientX, clientY) {
    let act = this._resolveCanvas();

    if (!act) {
      if (this._overlayEyedropper) this._overlayEyedropper.style.pointerEvents = 'none';
      const el = document.elementFromPoint(clientX, clientY);
      if (this._overlayEyedropper) this._overlayEyedropper.style.pointerEvents = 'auto';

      if (el instanceof HTMLCanvasElement) {
        act = el;
      } else if (el) {
        act = el.querySelector('canvas') || el.closest('canvas');
      }
    }

    if (!act || !(act instanceof HTMLCanvasElement)) return null;

    const rect = act.getBoundingClientRect();
    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
      return null;
    }

    const scaleX = act.width / rect.width;
    const scaleY = act.height / rect.height;
    const x = Math.floor((clientX - rect.left) * scaleX);
    const y = Math.floor((clientY - rect.top) * scaleY);

    if (x < 0 || y < 0 || x >= act.width || y >= act.height) return null;

    try {
      const ctx = act.getContext('2d', { willReadFrequently: true });
      const px = ctx.getImageData(x, y, 1, 1).data;
      return {
        r: px[0],
        g: px[1],
        b: px[2],
        a: +(px[3] / 255).toFixed(2)
      };
    } catch (_) {
      return null;
    }
  }

  toggleEyedropper() {
    this.isEyedropperActive = !this.isEyedropperActive;

    if (this.isEyedropperActive) {
      this.dom.btnEyedropper.textContent = 'Picker (ON)';
      this.dom.btnEyedropper.style.borderColor = '#38bdf8';
      this.dom.btnEyedropper.style.color = '#38bdf8';
      if (this.panel && this.panel.element) {
        this.panel.element.style.zIndex = '1000001';
      }
      this.activarOverlayEyedropper();
    } else {
      this.dom.btnEyedropper.textContent = 'Picker';
      this.dom.btnEyedropper.style.borderColor = '';
      this.dom.btnEyedropper.style.color = '';
      if (this.panel && this.panel.element) {
        this.panel.element.style.zIndex = '';
      }
      this.desactivarOverlayEyedropper();
    }
    this.onEyedropperToggle(this.isEyedropperActive);
  }

  activarOverlayEyedropper() {
    this.desactivarOverlayEyedropper();

    const overlay = document.createElement('div');
    overlay.className = 'ui-cp-pick-overlay';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '999990';
    overlay.style.cursor = 'crosshair';
    overlay.style.userSelect = 'none';

    const bubble = document.createElement('div');
    bubble.className = 'ui-cp-pick-bubble';
    bubble.style.position = 'fixed';
    bubble.style.pointerEvents = 'none';
    bubble.style.padding = '4px 8px';
    bubble.style.borderRadius = '4px';
    bubble.style.fontSize = '11px';
    bubble.style.fontFamily = 'monospace';
    bubble.style.color = '#fff';
    bubble.style.textShadow = '0 1px 2px #000';
    bubble.style.border = '1px solid rgba(255,255,255,0.7)';
    bubble.style.backgroundColor = 'rgba(0,0,0,0.85)';
    bubble.style.zIndex = '1000002';
    bubble.style.display = 'none';

    document.body.appendChild(overlay);
    document.body.appendChild(bubble);

    this._overlayEyedropper = overlay;
    this._bubbleEyedropper = bubble;

    const updateBubble = (px, clientX, clientY) => {
      bubble.style.display = 'block';
      bubble.style.backgroundColor = 'rgb(0, 0, 0)';
      bubble.textContent = `r:${(px.r / 255).toFixed(2)}, g:${(px.g / 255).toFixed(2)}, b:${(px.b / 255).toFixed(2)}, a:${px.a}`;
      bubble.style.left = `${clientX + 14}px`;
      bubble.style.top = `${clientY + 14}px`;
    };

    const isInsidePanel = (clientX, clientY) => {
      const panelRect = this.panel?.element?.getBoundingClientRect();
      return (
        panelRect &&
        clientX >= panelRect.left &&
        clientX <= panelRect.right &&
        clientY >= panelRect.top &&
        clientY <= panelRect.bottom
      );
    };

    overlay.addEventListener('pointerdown', (e) => {
      if (e.button === 2) {
        e.preventDefault();
        this.toggleEyedropper();
        return;
      }
      if (e.button !== 0) return;
      this.isEyedropperMouseDown = true;
      if (isInsidePanel(e.clientX, e.clientY)) {
        bubble.style.display = 'none';
        return;
      }
      const px = this.samplePixelFromCanvas(e.clientX, e.clientY);
      if (px) {
        this.setFromRGB(px.r, px.g, px.b, px.a, null);
        updateBubble(px, e.clientX, e.clientY);
      }
    });

    this._onEyedropperMove = (e) => {
      if (!this.isEyedropperActive) return;
      if (isInsidePanel(e.clientX, e.clientY)) {
        bubble.style.display = 'none';
        return;
      }
      const px = this.samplePixelFromCanvas(e.clientX, e.clientY);
      if (px) {
        if (this.isEyedropperMouseDown) {
          this.setFromRGB(px.r, px.g, px.b, px.a, null);
        }
        updateBubble(px, e.clientX, e.clientY);
      } else {
        bubble.style.left = `${e.clientX + 14}px`;
        bubble.style.top = `${e.clientY + 14}px`;
      }
    };
    window.addEventListener('pointermove', this._onEyedropperMove);

    this._onEyedropperUp = () => {
      this.isEyedropperMouseDown = false;
    };
    window.addEventListener('pointerup', this._onEyedropperUp);

    this._onEyedropperKey = (e) => {
      if (e.key === 'Escape') this.toggleEyedropper();
    };
    window.addEventListener('keydown', this._onEyedropperKey);

    overlay.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  desactivarOverlayEyedropper() {
    if (this._overlayEyedropper) {
      this._overlayEyedropper.remove();
      this._overlayEyedropper = null;
    }
    if (this._bubbleEyedropper) {
      this._bubbleEyedropper.remove();
      this._bubbleEyedropper = null;
    }
    if (this._onEyedropperMove) {
      window.removeEventListener('pointermove', this._onEyedropperMove);
      this._onEyedropperMove = null;
    }
    if (this._onEyedropperUp) {
      window.removeEventListener('pointerup', this._onEyedropperUp);
      this._onEyedropperUp = null;
    }
    if (this._onEyedropperKey) {
      window.removeEventListener('keydown', this._onEyedropperKey);
      this._onEyedropperKey = null;
    }
  }

  openPaletteModal() {
    if (this._paletteModal) this._paletteModal.remove();
    const overlay = document.createElement('div');
    overlay.className = 'ui-cp-modal-backdrop';
    overlay.innerHTML = `
      <div class="ui-cp-modal">
        <div class="ui-cp-modal-head">
          <span class="ui-panel-title">SUGGESTED PALETTE</span>
          <button class="ui-icon-btn btn-close-modal">✕</button>
        </div>
        <div class="ui-cp-modal-body"></div>
      </div>
    `;
    const body = overlay.querySelector('.ui-cp-modal-body');
    const colors = [
      { r: 230, g: 80, b: 80 },
      { r: 80, g: 180, b: 230 },
      { r: 90, g: 210, b: 120 },
      { r: 230, g: 200, b: 70 },
      { r: 180, g: 100, b: 230 }
    ];

    colors.forEach((c, idx) => {
      const hex = this.rgbToHex(c.r, c.g, c.b);
      const row = document.createElement('div');
      row.className = 'ui-cp-palette-row';
      row.innerHTML = `
        <span class="ui-label">Color #${idx + 1}</span>
        <input type="text" class="ui-input" readonly value="${hex}">
        <span class="ui-label" style="font-family:var(--ui-font-family-mono); font-size:13px;">${c.r}, ${c.g}, ${c.b}</span>
        <div class="ui-cp-swatch" style="background:${hex};"></div>
      `;
      row.querySelector('.ui-cp-swatch').addEventListener('click', () => {
        this.setFromRGB(c.r, c.g, c.b, this.alpha, null);
        overlay.remove();
        this._paletteModal = null;
      });
      body.appendChild(row);
    });

    overlay.querySelector('.btn-close-modal').addEventListener('click', () => {
      overlay.remove();
      this._paletteModal = null;
    });
    this._paletteModal = overlay;
    document.body.appendChild(overlay);
  }

  getState() {
    return {
      ...this.panel.getState(),
      type: 'ColorPicker',
      color: {
        h: this.hue,
        s: this.sat,
        v: this.val,
        a: this.alpha
      },
      isRectMode: this.isRectMode
    };
  }

  setState(s) {
    if (!s) return;
    this.panel.setState(s);
    if (s.color) {
      this.hue = s.color.h;
      this.sat = s.color.s;
      this.val = s.color.v;
      this.alpha = s.color.a;
      this.dom.sliderHue.value = Math.round(this.hue);
      this.dom.sliderSat.value = Math.round(this.sat);
      this.dom.sliderVal.value = Math.round(this.val);
      this.dom.sliderAlpha.value = this.alpha;
    }
    if (s.isRectMode !== undefined && s.isRectMode !== this.isRectMode) {
      this.isRectMode = s.isRectMode;
      this.dom.chkRect.classList.toggle('checked', this.isRectMode);
      this.dom.root.classList.toggle('mode-rect', this.isRectMode);
    }
    this.updateUI();
  }

  destroy() {
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
    this._activeDrags.forEach((cleanup) => cleanup());
    this._activeDrags.clear();
    if (this._paletteModal) {
      this._paletteModal.remove();
      this._paletteModal = null;
    }
    this.desactivarOverlayEyedropper();
    this.panel.destroy();
    super.destroy();
  }
}

const UI_MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
class UIDatePickerBase extends UIBaseComponent {
constructor({
id = null,
placeholder = 'Seleccionar fecha...',
minDate = null,
maxDate = null,
onChange,
footerDefaultText = 'Selecciona un día'
} = {}, fallback = 'datepicker') {
super({ id }, fallback);

this.onChange = onChange;
  this.placeholder = placeholder;
  this.minDate = U.parseDateInput(minDate);
  this.maxDate = U.parseDateInput(maxDate);
  this.disabled = false;
  this.isOpen = false;
  this._footerDefaultText = footerDefaultText;

  const now = new Date();
  this.currentMonth = now.getMonth();
  this.currentYear = now.getFullYear();

  UIPopupManager.register(this);
  this.buildUI();
  this.bindEvents();
}

buildUI() {
  this.element = document.createElement('div');
  this.element.className = 'ui-date-picker-wrap';
  this.element.innerHTML = `
    <button type="button" class="ui-date-trigger">
      <div class="ui-date-trigger-text">
        <svg class="ui-date-icon" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span class="ui-date-display"></span>
      </div>
      <svg class="ui-date-arrow-icon" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="ui-calendar-dropdown">
      <div class="ui-calendar-header">
        <button class="ui-calendar-nav-btn btn-prev"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
        <div class="ui-calendar-month-year"></div>
        <button class="ui-calendar-nav-btn btn-next"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
      </div>
      <div class="ui-calendar-weekdays">
        <div class="ui-calendar-weekday">Lu</div><div class="ui-calendar-weekday">Ma</div><div class="ui-calendar-weekday">Mi</div>
        <div class="ui-calendar-weekday">Ju</div><div class="ui-calendar-weekday">Vi</div><div class="ui-calendar-weekday">Sá</div><div class="ui-calendar-weekday">Do</div>
      </div>
      <div class="ui-calendar-days"></div>
      <div class="ui-calendar-footer">
        <span class="ui-calendar-footer-info"></span>
        <button class="ui-calendar-btn-clear">Limpiar</button>
      </div>
    </div>
  `;

  this.trigger = this.element.querySelector('.ui-date-trigger');
  this.display = this.element.querySelector('.ui-date-display');
  this.display.textContent = this.placeholder;
  this.monthYearEl = this.element.querySelector('.ui-calendar-month-year');
  this.daysEl = this.element.querySelector('.ui-calendar-days');
  this.footerInfo = this.element.querySelector('.ui-calendar-footer-info');
  this.footerInfo.textContent = this._footerDefaultText;
  this.btnClear = this.element.querySelector('.ui-calendar-btn-clear');
  this.btnPrev = this.element.querySelector('.btn-prev');
  this.btnNext = this.element.querySelector('.btn-next');
}

bindEvents() {
  this._listen(this.trigger, 'click', (e) => {
    e.stopPropagation();
    if (!this.disabled) this.toggle();
  });
  this._listen(this.btnPrev, 'click', (e) => {
    e.stopPropagation();
    this.changeMonth(-1);
  });
  this._listen(this.btnNext, 'click', (e) => {
    e.stopPropagation();
    this.changeMonth(1);
  });
  this._listen(this.btnClear, 'click', (e) => {
    e.stopPropagation();
    this.clear();
  });
  this._listen(document, 'click', (e) => {
    if (this.element && !this.element.contains(e.target)) this.close();
  });
  this._listen(document, 'keydown', (e) => {
    if (e.key === 'Escape' && this.isOpen) this.close();
  });
}

toggle() { this.isOpen ? this.close() : this.open(); }

open() {
  if (this.disabled || this.isOpen) return;
  UIPopupManager.closeOthers(this);
  this.isOpen = true;
  this.element.classList.add('is-open');
  this.renderCalendar();
}

close() {
  if (!this.isOpen) return;
  this.isOpen = false;
  this.element.classList.remove('is-open');
}

changeMonth(delta) {
  this.currentMonth += delta;
  if (this.currentMonth < 0) {
    this.currentMonth = 11;
    this.currentYear--;
  } else if (this.currentMonth > 11) {
    this.currentMonth = 0;
    this.currentYear++;
  }
  this.renderCalendar();
}

formatDate(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

_dayTime(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

isDateDisabled(date) {
  const time = date.getTime();
  if (this.minDate && time < this._dayTime(this.minDate)) return true;
  if (this.maxDate && time > this._dayTime(this.maxDate)) return true;
  return false;
}

renderCalendar() {
  this.monthYearEl.textContent = `${UI_MONTH_NAMES[this.currentMonth]} ${this.currentYear}`;
  this.daysEl.innerHTML = '';

  let firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  const prevMonthDays = new Date(this.currentYear, this.currentMonth, 0).getDate();

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = document.createElement('div');
    day.className = 'ui-calendar-day empty';
    day.textContent = prevMonthDays - i;
    this.daysEl.appendChild(day);
  }

  const todayTime = this._dayTime(new Date());

  for (let d = 1; d <= daysInMonth; d++) {
    const thisDate = new Date(this.currentYear, this.currentMonth, d);
    const thisTime = thisDate.getTime();
    const day = document.createElement('div');
    day.className = 'ui-calendar-day';
    day.textContent = d;

    if (thisTime === todayTime) day.classList.add('today');

    if (this.isDateDisabled(thisDate)) {
      day.classList.add('disabled');
    } else {
      this._renderDayCell(day, thisDate, thisTime);
    }

    this.daysEl.appendChild(day);
  }
}

setDisabled(v) {
  this.disabled = !!v;
  this.trigger.disabled = this.disabled;
  if (this.disabled) this.close();
  return this;
}

destroy() {
  UIPopupManager.unregister(this);
  super.destroy();
}
}

 class UIDatePicker extends UIDatePickerBase {
  constructor({
    id = null,
    value = null,
    placeholder = 'Seleccionar fecha...',
    minDate = null,
    maxDate = null,
    onChange
  } = {}) {
    super({ id, placeholder, minDate, maxDate, onChange, footerDefaultText: 'Selecciona un día' }, 'datepicker');
    this.selectedDate = U.parseDateInput(value);
    if (this.selectedDate) {
      this.currentMonth = this.selectedDate.getMonth();
      this.currentYear = this.selectedDate.getFullYear();
    }
    this._onDaysClick = (e) => {
      const cell = e.target.closest('.ui-calendar-day:not(.empty):not(.disabled)');
      if (!cell || !this.daysEl.contains(cell)) return;
      e.stopPropagation();
      const time = Number(cell.dataset.time);
      if (!Number.isNaN(time)) {
        this.selectDate(new Date(time));
      }
    };
    this.daysEl.addEventListener('click', this._onDaysClick);
    this.updateDisplay();
  }

  updateDisplay() {
    if (this.selectedDate) {
      this.display.textContent = this.formatDate(this.selectedDate);
      this.footerInfo.textContent = 'Fecha seleccionada';
    } else {
      this.display.textContent = this.placeholder;
      this.footerInfo.textContent = 'Selecciona un día';
    }
  }

  _renderDayCell(day, thisDate, thisTime) {
    day.dataset.time = String(thisTime);
    if (this.selectedDate && thisTime === this._dayTime(this.selectedDate)) {
      day.classList.add('selected');
    }
  }

  selectDate(date) {
    this.selectedDate = new Date(date);
    this.updateDisplay();
    this.close();
    if (this.onChange) this.onChange(this.getValue(), this);
  }

  clear() {
    this.selectedDate = null;
    this.updateDisplay();
    this.renderCalendar();
    if (this.onChange) this.onChange(null, this);
  }

  getValue() {
    return this.selectedDate ? new Date(this.selectedDate) : null;
  }

  setValue(val) {
    if (!val) {
      this.clear();
      return this;
    }
    const parsed = U.parseDateInput(val);
    if (parsed) {
      this.selectedDate = parsed;
      this.currentMonth = this.selectedDate.getMonth();
      this.currentYear = this.selectedDate.getFullYear();
      this.updateDisplay();
      if (this.isOpen) this.renderCalendar();
    }
    return this;
  }

  getState() {
    return {
      type: 'DatePicker',
      value: this.selectedDate ? this.selectedDate.toISOString() : null,
      disabled: this.disabled
    };
  }

  setState(s) {
    if (!s) return;
    if (s.value) this.setValue(s.value);
    if (s.disabled !== undefined) this.setDisabled(s.disabled);
  }

  destroy() {
    if (this.daysEl && this._onDaysClick) {
      this.daysEl.removeEventListener('click', this._onDaysClick);
    }
    super.destroy();
  }
}

class UIDateRangePicker extends UIDatePickerBase {
constructor({
id = null,
startDate = null,
endDate = null,
placeholder = 'Seleccionar rango...',
minDate = null,
maxDate = null,
onChange
} = {}) {
super({ id, placeholder, minDate, maxDate, onChange, footerDefaultText: 'Haz clic para seleccionar' }, 'daterangepicker');
this.startDate = U.parseDateInput(startDate);
  this.endDate = U.parseDateInput(endDate);

  if (this.startDate) {
    this.currentMonth = this.startDate.getMonth();
    this.currentYear = this.startDate.getFullYear();
  }
  this.updateDisplay();
}

updateDisplay() {
  if (this.startDate && this.endDate) {
    this.display.textContent = `${this.formatDate(this.startDate)} → ${this.formatDate(this.endDate)}`;
    const diff = Math.ceil(Math.abs(this._dayTime(this.endDate) - this._dayTime(this.startDate)) / (1000 * 60 * 60 * 24)) + 1;
    this.footerInfo.textContent = `${diff} día${diff > 1 ? 's' : ''} seleccionado${diff > 1 ? 's' : ''}`;
  } else if (this.startDate) {
    this.display.textContent = `${this.formatDate(this.startDate)} → ...`;
    this.footerInfo.textContent = 'Selecciona la fecha fin';
  } else {
    this.display.textContent = this.placeholder;
    this.footerInfo.textContent = 'Haz clic para seleccionar';
  }
}

_renderDayCell(day, thisDate, thisTime) {
  const sTime = this.startDate ? this._dayTime(this.startDate) : null;
  const eTime = this.endDate ? this._dayTime(this.endDate) : null;

  if (sTime && eTime) {
    if (thisTime === sTime) day.classList.add('selected', 'range-start');
    else if (thisTime === eTime) day.classList.add('selected', 'range-end');
    else if (thisTime > sTime && thisTime < eTime) day.classList.add('in-range');
  } else if (sTime && thisTime === sTime) {
    day.classList.add('selected');
  }

  day.addEventListener('click', (e) => {
    e.stopPropagation();
    this.selectDay(thisDate);
  });
}

selectDay(date) {
  if (!this.startDate || (this.startDate && this.endDate)) {
    this.startDate = date;
    this.endDate = null;
  } else {
    if (date < this.startDate) {
      this.endDate = this.startDate;
      this.startDate = date;
    } else {
      this.endDate = date;
    }
  }

  this.updateDisplay();
  this.renderCalendar();

  if (this.startDate && this.endDate) {
    if (this.onChange) this.onChange(this.getValue(), this);
  }
}

clear() {
  this.startDate = null;
  this.endDate = null;
  this.updateDisplay();
  this.renderCalendar();
  if (this.onChange) this.onChange(this.getValue(), this);
}

getValue() {
  return {
    start: this.startDate ? new Date(this.startDate) : null,
    end: this.endDate ? new Date(this.endDate) : null
  };
}

setValue(val) {
  if (!val || typeof val !== 'object') {
    this.clear();
    return this;
  }
  this.startDate = U.parseDateInput(val.start);
  this.endDate = U.parseDateInput(val.end);
  if (this.startDate) {
    this.currentMonth = this.startDate.getMonth();
    this.currentYear = this.startDate.getFullYear();
  }
  this.updateDisplay();
  if (this.isOpen) this.renderCalendar();
  return this;
}

getState() {
  return {
    type: 'DateRangePicker',
    start: this.startDate ? this.startDate.toISOString() : null,
    end: this.endDate ? this.endDate.toISOString() : null,
    disabled: this.disabled
  };
}

setState(s) {
  if (!s) return;
  this.setValue({ start: s.start, end: s.end });
  if (s.disabled !== undefined) this.setDisabled(s.disabled);
}
}

const UI = {
Theme: UITheme,
BaseComponent: UIBaseComponent,
DockEngine: GlobalDock,
Registry: UIRegistry,
LayoutManager: GlobalLayoutManager,
Container: UIContainer,
PanelGroup: UIPanelGroup,
SmartPanel: UISmartPanel,
Row: UIRow,
SquareButton: UISquareButton,
ReorderList: UIReorderList,
Table: UITable,
Label: UILabel,
Button: UIButton,
InputText: UIInputText,
InputNumberInt: UIInputNumberInt,
Checkbox: UICheckbox,
Toggle: UIToggle,
Select: UISelect,
Segmented: UISegmented,
RadioGroup: UIRadioGroup,
ConfigurableSlider: UIConfigurableSlider,
Accordion: UIAccordion,
AccordionItem: UIAccordionItem,
Info: UIInfo,
ResponsiveGrid: UIResponsiveGrid,
Badge2: UIBadge2,
Checkbox2: UICheckbox2,
Toggle2: UIToggle2,
InputText2: UIInputText2,
InputNumber2: UIInputNumber2,
Button2: UIButton2,
ColorPicker: UIColorPicker,
DatePicker: UIDatePicker,
DateRangePicker: UIDateRangePicker
};
global.UI = UI;
global.UIContainer = UIContainer;
global.UIPanelGroup = UIPanelGroup;
global.UISmartPanel = UISmartPanel;
global.UIRow = UIRow;
global.UISquareButton = UISquareButton;
global.UIReorderList = UIReorderList;
global.UITable = UITable;
global.UILabel = UILabel;
global.UIButton = UIButton;
global.UIInputText = UIInputText;
global.UIInputNumberInt = UIInputNumberInt;
global.UICheckbox = UICheckbox;
global.UIToggle = UIToggle;
global.UISelect = UISelect;
global.UISegmented = UISegmented;
global.UIRadioGroup = UIRadioGroup;
global.UIConfigurableSlider = UIConfigurableSlider;
global.UIAccordion = UIAccordion;
global.UIAccordionItem = UIAccordionItem;
global.UIInfo = UIInfo;
global.UILayoutManager = GlobalLayoutManager;
global.ToolJavaScriptGio = ToolJavaScriptGio;
global.UIResponsiveGrid = UIResponsiveGrid;
global.UIBadge2 = UIBadge2;
global.UICheckbox2 = UICheckbox2;
global.UIToggle2 = UIToggle2;
global.UIInputText2 = UIInputText2;
global.UIInputNumber2 = UIInputNumber2;
global.UIButton2 = UIButton2;
global.UIColorPicker = UIColorPicker;
global.UIDatePicker = UIDatePicker;
global.UIDateRangePicker = UIDateRangePicker;
})(typeof window !== 'undefined' ? window : this);

 class InputGioNumber {
  static injectStyles() {
    const U = hacerEditableNumerico._utils;
    U.injectInputGioSharedStyles();
    U.injectStyleOnce(
      'inputGio-number-styles',
      `
      .inputGio-num-label.inputGio-num-scrub { cursor: ew-resize; }
      .inputGio-num-label.inputGio-num-scrub:hover { color: #ffffff; }
      .inputGio-num-wrap { display: inline-flex; overflow: hidden; height: 30px; }
      .inputGio-num-btn { background-color: #2d2d2d; color: #A6A0A0; border: none; width: 28px; height: 100%; cursor: pointer; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; user-select: none; padding: 0; transition: background-color 0.15s, color 0.15s; }
      .inputGio-num-btn:hover { background-color: #333333; color: #4daafc; }
      .inputGio-num-trigger { display: inline-flex; align-items: center; gap: 4px; padding: 0 8px; height: 100%; cursor: text; }
      .inputGio-num-val { min-width: 34px; text-align: center; font-variant-numeric: tabular-nums; color: #4daafc; outline: none; white-space: nowrap; line-height: 18px; transition: color 0.15s; }
      .inputGio-num-val[contenteditable="true"] { color: #ffffff; }
      .inputGio-num-unit { font-size: 11px; color: #A6A0A0; opacity: 0.7; user-select: none; }
      .inputGio-num-trigger:hover .inputGio-num-icon { opacity: 1; }
    `
    );
  }

  constructor({
    element,
    container,
    label = '',
    value = 0,
    min = -Infinity,
    max = Infinity,
    step = 1,
    unit = '',
    allowDecimal = false,
    scrub = true,
    onChange = () => {}
  }) {
    InputGioNumber.injectStyles();
    this._u = hacerEditableNumerico._utils;
    this.ownedElement = !element;
    this.root = element || document.createElement('div');
    this.label = label;
    this.min = min;
    this.max = max;
    this.step = step;
    this.unit = unit;
    this.allowDecimal = allowDecimal || step % 1 !== 0;
    this.scrub = scrub;
    this.onChange = onChange;
    this.value = this._clamp(Number(value));
    this._prevValue = this.value;
    this._pencilSvg = this._u.PENCIL_SVG;
    this._scrubCleanup = null;
    this._build();
    this._bindEvents();

    if (container && this.ownedElement) {
      container.appendChild(this.root);
    }
  }

  _selectAll(el) {
    this._u.selectAll(el);
  }

  _clamp(num) {
    return this._u.clampNumber(num, this.min, this.max, this.allowDecimal, 100, this._prevValue ?? 0);
  }

  _build() {
    this.root.classList.add('inputGio-num-field');
    this.root.innerHTML = '';

    if (this.label) {
      this.labelEl = document.createElement('span');
      this.labelEl.className = 'inputGio-num-label';
      if (this.scrub) {
        this.labelEl.classList.add('inputGio-num-scrub');
        this.labelEl.title = 'Arrastra horizontalmente';
      }
      this.labelEl.textContent = this.label;
      this.root.appendChild(this.labelEl);
    }

    this.wrap = document.createElement('div');
    this.wrap.className = 'inputGio-num-wrap';

    this.btnMinus = document.createElement('button');
    this.btnMinus.type = 'button';
    this.btnMinus.className = 'inputGio-num-btn';
    this.btnMinus.textContent = '-';

    this.trigger = document.createElement('div');
    this.trigger.className = 'inputGio-num-trigger';
    this.trigger.title = 'Clic para editar número';

    this.valEl = document.createElement('div');
    this.valEl.className = 'inputGio-num-val';
    this.valEl.textContent = this.value;

    this.trigger.appendChild(this.valEl);

    if (this.unit) {
      this.unitEl = document.createElement('span');
      this.unitEl.className = 'inputGio-num-unit';
      this.unitEl.textContent = this.unit;
      this.trigger.appendChild(this.unitEl);
    }

    this.iconEl = document.createElement('span');
    this.iconEl.className = 'inputGio-num-icon';
    this.iconEl.innerHTML = this._pencilSvg;
    this.trigger.appendChild(this.iconEl);

    this.btnPlus = document.createElement('button');
    this.btnPlus.type = 'button';
    this.btnPlus.className = 'inputGio-num-btn';
    this.btnPlus.textContent = '+';

    this.wrap.appendChild(this.btnMinus);
    this.wrap.appendChild(this.trigger);
    this.wrap.appendChild(this.btnPlus);
    this.root.appendChild(this.wrap);
  }

  _startEdit() {
    if (this.valEl.isContentEditable) return;
    this._prevValue = this.value;
    this.valEl.contentEditable = 'true';
    this.wrap.classList.add('inputGio-num-editing');
    this.valEl.focus();
    this._selectAll(this.valEl);
  }

  _commit(raw, triggerCallback = true) {
    const parsed = this._u.parseNumber(raw, this.allowDecimal);
    const next = this._clamp(parsed);
    const changed = next !== this.value;
    this.value = next;
    this._prevValue = next;
    this.valEl.textContent = next;
    if (triggerCallback && changed) {
      this.onChange(this.value);
    }
  }

  _bindEvents() {
    this._onMinus = () => this._commit(this.value - this.step);
    this._onPlus = () => this._commit(this.value + this.step);
    this._onTriggerClick = () => this._startEdit();
    this._onKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.valEl.blur();
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        this.valEl.textContent = this._prevValue;
        this.valEl.blur();
        return;
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const mult = e.shiftKey ? 10 : 1;
        const delta = (e.key === 'ArrowUp' ? this.step : -this.step) * mult;
        const current = this._u.parseNumber(this.valEl.textContent, this.allowDecimal);
        this._commit((Number.isNaN(current) ? this._prevValue : current) + delta);
        this._selectAll(this.valEl);
        return;
      }

      const nav = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
      if (nav.includes(e.key) || e.ctrlKey || e.metaKey) return;

      const selText = window.getSelection()?.toString() || '';

      if (this.allowDecimal && (e.key === '.' || e.key === ',')) {
        const hasDot =
          (this.valEl.textContent.includes('.') || this.valEl.textContent.includes(',')) &&
          !selText.includes('.') &&
          !selText.includes(',');
        if (!hasDot) return;
      }
      if (this.min < 0 && e.key === '-') {
        const hasMinus = this.valEl.textContent.includes('-') && !selText.includes('-');
        if (!hasMinus) return;
      }
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    };

    this._onInput = () => {
      const regex = this.allowDecimal ? /[^0-9.-]/g : /[^0-9-]/g;
      const cleaned = this.valEl.textContent.replace(regex, '');
      if (cleaned !== this.valEl.textContent) {
        this.valEl.textContent = cleaned;
      }
    };

    this._onBlur = () => {
      this.valEl.contentEditable = 'false';
      this.wrap.classList.remove('inputGio-num-editing');
      this._commit(this.valEl.textContent);
    };

    this.btnMinus.addEventListener('click', this._onMinus);
    this.btnPlus.addEventListener('click', this._onPlus);
    this.trigger.addEventListener('click', this._onTriggerClick);
    this.valEl.addEventListener('keydown', this._onKeyDown);
    this.valEl.addEventListener('input', this._onInput);
    this.valEl.addEventListener('blur', this._onBlur);

    if (this.labelEl && this.scrub) {
      this.labelEl.style.touchAction = 'none';
      this._onLabelPointerDown = (e) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        e.preventDefault();
        const startX = e.clientX;
        const startVal = this.value;
        const onMove = (ev) => {
          const steps = Math.round((ev.clientX - startX) / 3);
          this._commit(startVal + steps * this.step);
        };
        const onUp = () => {
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerup', onUp);
          window.removeEventListener('pointercancel', onUp);
          this._scrubCleanup = null;
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
        this._scrubCleanup = onUp;
      };
      this.labelEl.addEventListener('pointerdown', this._onLabelPointerDown);
    }
  }

  getValue() {
    return this.value;
  }

  setValue(val) {
    this._commit(val, false);
  }

  destroy() {
    if (this._scrubCleanup) {
      this._scrubCleanup();
      this._scrubCleanup = null;
    }
    this.btnMinus.removeEventListener('click', this._onMinus);
    this.btnPlus.removeEventListener('click', this._onPlus);
    this.trigger.removeEventListener('click', this._onTriggerClick);
    this.valEl.removeEventListener('keydown', this._onKeyDown);
    this.valEl.removeEventListener('input', this._onInput);
    this.valEl.removeEventListener('blur', this._onBlur);
    if (this.labelEl && this._onLabelPointerDown) {
      this.labelEl.removeEventListener('pointerdown', this._onLabelPointerDown);
    }
    this.root.classList.remove('inputGio-num-field');
    this.root.innerHTML = '';
    if (this.ownedElement && this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }
  }
}
class InputGioText {
  static injectStyles() {
    const U = hacerEditableNumerico._utils;
    U.injectInputGioSharedStyles();
    U.injectStyleOnce(
      'inputGio-text-styles',
      `
      .inputGio-text-wrap { flex: 1; min-width: 0; min-height: 30px; padding: 3px 12px; gap: 6px; }
      .inputGio-text-val { flex: 1; min-width: 0; color: #abb1b5; outline: none; white-space: nowrap; overflow: hidden; cursor: pointer; user-select: none; line-height: 20px; transition: color 0.15s; }
      .inputGio-text-val[contenteditable="true"] { color: #ffffffbe; cursor: text; user-select: text; overflow-x: auto; }
      .inputGio-text-wrap:hover .inputGio-text-icon { opacity: 1; }
    `
    );
  }

  constructor({
    element,
    container,
    label = '',
    value = '',
    placeholder = 'Sin nombre',
    trigger = 'dblclick',
    onChange = () => {}
  }) {
    InputGioText.injectStyles();
    this._u = hacerEditableNumerico._utils;
    this.ownedElement = !element;
    this.root = element || document.createElement('div');
    this.label = label;
    this.placeholder = placeholder;
    this.trigger = trigger;
    this.onChange = onChange;
    this.value = String(value).trim() || this.placeholder;
    this._prevValue = this.value;
    this._pencilSvg = this._u.PENCIL_SVG;
    this._build();
    this._bindEvents();

    if (container && this.ownedElement) {
      container.appendChild(this.root);
    }
  }

  _selectAll(el) {
    this._u.selectAll(el);
  }

  _build() {
    this.root.classList.add('inputGio-text-field');
    this.root.innerHTML = '';

    if (this.label) {
      this.labelEl = document.createElement('span');
      this.labelEl.className = 'inputGio-text-label';
      this.labelEl.textContent = this.label;
      this.root.appendChild(this.labelEl);
    }

    this.wrap = document.createElement('div');
    this.wrap.className = 'inputGio-text-wrap';
    this.wrap.title = this.trigger === 'click' ? 'Clic para editar texto' : 'Doble clic o clic en el lápiz para editar';

    this.valEl = document.createElement('div');
    this.valEl.className = 'inputGio-text-val';
    this.valEl.textContent = this.value;

    this.iconEl = document.createElement('span');
    this.iconEl.className = 'inputGio-text-icon';
    this.iconEl.innerHTML = this._pencilSvg;

    this.wrap.appendChild(this.valEl);
    this.wrap.appendChild(this.iconEl);
    this.root.appendChild(this.wrap);
  }

  _startEdit() {
    if (this.valEl.isContentEditable) return;
    this._prevValue = this.value;
    this.valEl.contentEditable = 'true';
    this.wrap.classList.add('inputGio-text-editing');
    this.valEl.focus();
    this._selectAll(this.valEl);
  }

  _commit(raw, triggerCallback = true) {
    const cleaned = String(raw).replace(/\s+/g, ' ').trim();
    const next = cleaned || this._prevValue || this.placeholder;
    this.value = next;
    this._prevValue = next;
    this.valEl.textContent = next;
    if (triggerCallback) {
      this.onChange(this.value);
    }
  }

  _bindEvents() {
    this._onStartEdit = () => this._startEdit();
    this._onKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.valEl.blur();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        this.valEl.textContent = this._prevValue;
        this.valEl.blur();
      }
    };

    this._onBlur = () => {
      this.valEl.contentEditable = 'false';
      this.wrap.classList.remove('inputGio-text-editing');
      this._commit(this.valEl.textContent);
    };

    this.valEl.addEventListener(this.trigger, this._onStartEdit);
    this.iconEl.addEventListener('click', this._onStartEdit);
    this.valEl.addEventListener('keydown', this._onKeyDown);
    this.valEl.addEventListener('blur', this._onBlur);
  }

  getValue() {
    return this.value;
  }

  setValue(val) {
    this._commit(val, false);
  }

  destroy() {
    this.valEl.removeEventListener(this.trigger, this._onStartEdit);
    this.iconEl.removeEventListener('click', this._onStartEdit);
    this.valEl.removeEventListener('keydown', this._onKeyDown);
    this.valEl.removeEventListener('blur', this._onBlur);
    this.root.classList.remove('inputGio-text-field');
    this.root.innerHTML = '';
    if (this.ownedElement && this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }
  }
}

   class checboxAnimado {
      static contador = 0;
      static estiloId = 'checboxAnimado-estilos';

      constructor(destino, opciones = {}) {
        this.contenedor = typeof destino === 'string'
          ? document.querySelector(destino)
          : destino;

        if (!this.contenedor) return;

        this.modelo = Number(opciones.modelo) || 4;
        if (this.modelo < 1 || this.modelo > 6) this.modelo = 1;

        this.checked = Boolean(opciones.checked);
        this.texto = opciones.texto !== undefined ? String(opciones.texto) : (opciones.label !== undefined ? String(opciones.label) : '');
        this.posicionLabel = opciones.mostrarLabel === false ? 'oculto' : (opciones.posicionLabel || 'derecha');
        this.onChange = typeof opciones.onChange === 'function' ? opciones.onChange : null;

        const tamanoBase = Number(opciones.tamano);
        this.ancho = Number(opciones.ancho) || (tamanoBase > 0 ? tamanoBase : 14);
        this.alto = Number(opciones.alto) || (tamanoBase > 0 ? tamanoBase : 14);
        this.color = opciones.color || '#2A5293';
        this.colorTexto = opciones.colorTexto || '#9e9e9e';
        this.duracion = Number(opciones.duracion) > 0 ? Number(opciones.duracion) : 1.4;
        this.sombra = opciones.sombra !== undefined && !isNaN(Number(opciones.sombra)) && Number(opciones.sombra) >= 0
          ? Number(opciones.sombra)
          :4;

        checboxAnimado.contador += 1;
        this.uid = `checboxAnimado-item-${checboxAnimado.contador}`;

        this.inyectarCSS();
        this.renderizar();
        this.setTamanos(this.ancho, this.alto);
        this.setColor(this.color);
        this.setColorTexto(this.colorTexto);
        this.setDuracion(this.duracion);
        this.setSombra(this.sombra);
        this.setPosicionLabel(this.posicionLabel);
      }

      inyectarCSS() {
        if (document.getElementById(checboxAnimado.estiloId)) return;

        const style = document.createElement('style');
        style.id = checboxAnimado.estiloId;
        style.textContent = `
          .checboxAnimado-parent {
            --checboxAnimado-led: #2A5293;
            --checboxAnimado-led-rgb: 42, 82, 147;
            --checboxAnimado-nucleo: #cfdaec;
            --checboxAnimado-nucleo-borde: #a5b9dc;
            --checboxAnimado-texto-color: #9e9e9e;
            --checboxAnimado-difusor-off: rgba(20, 24, 32, 0.48);
            --checboxAnimado-difusor-on: rgba(135, 152, 172, 0.36);
            --checboxAnimado-tiempo: 1.2s;
            --checboxAnimado-sombra: 4;
            --checboxAnimado-ancho: 13px;
            --checboxAnimado-alto: 13px;
            --checboxAnimado-sx: 0.13;
            --checboxAnimado-sy: 0.13;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            position: relative;
          }

          .checboxAnimado-parent.checboxAnimado-label-izquierda {
            flex-direction: row-reverse;
          }

          .checboxAnimado-parent.checboxAnimado-label-oculto {
            gap: 0;
          }

          .checboxAnimado-parent.checboxAnimado-label-oculto .checboxAnimado-texto {
            display: none;
          }

          .checboxAnimado-parent,
          .checboxAnimado-parent * {
            box-sizing: border-box;
          }

          .checboxAnimado-input {
            display: none !important;
          }

          .checboxAnimado-wrap {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: var(--checboxAnimado-ancho);
            height: var(--checboxAnimado-alto);
            vertical-align: middle;
            flex-shrink: 0;
          }

          .checboxAnimado-label {
            position: relative;
            width: 100px;
            height: 100px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            user-select: none;
            transform: scale(var(--checboxAnimado-sx), var(--checboxAnimado-sy));
            transform-origin: center center;
          }

          .checboxAnimado-texto {
            cursor: pointer;
            user-select: none;
            color: var(--checboxAnimado-texto-color);
            font-size: 14px;
            line-height: 1.3;
            transition: color 0.3s ease, text-shadow 0.3s ease;
          }

          .checboxAnimado-texto:empty {
            display: none;
          }

          .checboxAnimado-input:checked ~ .checboxAnimado-texto {
            color: var(--checboxAnimado-texto-color);
            text-shadow: 0 0 calc(4px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.55);
          }

          .checboxAnimado-haz-rombo {
            position: absolute;
            width: 110px;
            height: 110px;
            background: radial-gradient(circle, rgba(var(--checboxAnimado-led-rgb), 0.8) 10%, rgba(var(--checboxAnimado-led-rgb), 0.3) 60%, transparent 100%);
            transform: rotate(45deg) scale(0.6);
            filter: blur(20px);
            opacity: 0;
            transition: opacity calc(var(--checboxAnimado-tiempo) * 0.4) ease calc(var(--checboxAnimado-tiempo) * 0.55), transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1);
            pointer-events: none;
            z-index: 1;
          }

          .checboxAnimado-haz-cruz::before,
          .checboxAnimado-haz-cruz::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.5);
            background: radial-gradient(ellipse, rgba(var(--checboxAnimado-led-rgb), 0.72) 0%, rgba(var(--checboxAnimado-led-rgb), 0.2) 60%, transparent 100%);
            filter: blur(15px);
            opacity: 0;
            transition: opacity calc(var(--checboxAnimado-tiempo) * 0.4) ease calc(var(--checboxAnimado-tiempo) * 0.55), transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1);
            pointer-events: none;
            z-index: 3;
            mix-blend-mode: screen;
          }

          .checboxAnimado-haz-cruz::before {
            width: 195px;
            height: 66px;
          }

          .checboxAnimado-haz-cruz::after {
            width: 66px;
            height: 195px;
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-haz-rombo {
            opacity: 1;
            transform: rotate(45deg) scale(var(--checboxAnimado-sombra));
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-haz-cruz::before,
          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-haz-cruz::after {
            opacity: 1;
            transform: translate(-50%, -50%) scale(var(--checboxAnimado-sombra));
          }

          .checboxAnimado-difusor-1 {
            position: relative;
            z-index: 2;
            width: 100px;
            height: 100px;
            border-radius: 18px;
            background: var(--checboxAnimado-difusor-off);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background var(--checboxAnimado-tiempo) ease, box-shadow var(--checboxAnimado-tiempo) ease;
          }

          .checboxAnimado-nucleo-1 {
            width: 66px;
            height: 66px;
            border-radius: 24px;
            background: radial-gradient(circle, rgba(var(--checboxAnimado-led-rgb), 0.45) 0%, #141921 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            opacity: 0;
            pointer-events: none;
            transform: translateX(calc(-115px / var(--checboxAnimado-sx))) rotate(-540deg) scale(0.7);
            transition:
              opacity 0.25s ease,
              transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1),
              background calc(var(--checboxAnimado-tiempo) * 0.8) ease-in,
              box-shadow calc(var(--checboxAnimado-tiempo) * 0.9) ease-in,
              border-color var(--checboxAnimado-tiempo) ease;
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-difusor-1 {
            background: var(--checboxAnimado-difusor-on);
            box-shadow: 0 0 calc(45px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.35);
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-nucleo-1 {
            opacity: 1;
            transform: translateX(0) rotate(0deg) scale(1);
            border-color: transparent;
            background: radial-gradient(circle, #ffffff 0%, var(--checboxAnimado-nucleo) 68%, var(--checboxAnimado-nucleo-borde) 100%);
            box-shadow:
              0 0 calc(20px * var(--checboxAnimado-sombra)) var(--checboxAnimado-nucleo),
              0 0 calc(50px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.9),
              0 0 calc(110px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.55);
            transition:
              opacity calc(var(--checboxAnimado-tiempo) * 0.35) ease-out,
              transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1),
              background calc(var(--checboxAnimado-tiempo) * 0.75) ease-in,
              box-shadow calc(var(--checboxAnimado-tiempo) * 0.85) ease-in,
              border-color var(--checboxAnimado-tiempo) ease;
          }

          .checboxAnimado-difusor-2 {
            position: relative;
            z-index: 2;
            width: 100px;
            height: 100px;
            border-radius: 18px;
            background: var(--checboxAnimado-difusor-off);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background var(--checboxAnimado-tiempo) ease, box-shadow var(--checboxAnimado-tiempo) ease;
          }

          .checboxAnimado-nucleo-2 {
            width: 66px;
            height: 66px;
            border-radius: 24px;
            background: radial-gradient(circle, rgba(var(--checboxAnimado-led-rgb), 0.45) 0%, #141921 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            transform: scale(0.5);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-difusor-2 {
            background: var(--checboxAnimado-difusor-on);
            box-shadow: 0 0 calc(45px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.35);
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-nucleo-2 {
            border-color: transparent;
            background: radial-gradient(circle, #ffffff 0%, var(--checboxAnimado-nucleo) 68%, var(--checboxAnimado-nucleo-borde) 100%);
            animation: checboxAnimado-espiralCentro var(--checboxAnimado-tiempo) cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
          }

          @keyframes checboxAnimado-espiralCentro {
            0% {
              transform: rotate(0deg) translateX(calc(95px / var(--checboxAnimado-sx))) scale(0.6);
              opacity: 0;
              box-shadow:
                0 0 calc(6px * var(--checboxAnimado-sombra)) var(--checboxAnimado-led),
                0 0 calc(16px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.5);
            }
            20% {
              opacity: 0.95;
            }
            100% {
              transform: rotate(360deg) translateX(0px) scale(1);
              opacity: 1;
              box-shadow:
                0 0 calc(20px * var(--checboxAnimado-sombra)) var(--checboxAnimado-nucleo),
                0 0 calc(50px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.9),
                0 0 calc(110px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.55);
            }
          }

          .checboxAnimado-difusor-3 {
            position: relative;
            z-index: 2;
            width: 100px;
            height: 100px;
            border-radius: 20px;
            background: var(--checboxAnimado-difusor-off);
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(180deg);
            transition:
              transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1),
              background var(--checboxAnimado-tiempo) ease,
              box-shadow var(--checboxAnimado-tiempo) ease;
          }

          .checboxAnimado-nucleo-3 {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(var(--checboxAnimado-led-rgb), 0.45) 0%, #141921 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            opacity: 0;
            pointer-events: none;
            transform: translateX(calc(-115px / var(--checboxAnimado-sx))) rotate(-540deg) scale(0.6);
            transition:
              opacity 0.25s ease,
              transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1),
              background calc(var(--checboxAnimado-tiempo) * 0.8) ease-in,
              box-shadow calc(var(--checboxAnimado-tiempo) * 0.9) ease-in;
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-difusor-3 {
            transform: rotate(0deg);
            background: var(--checboxAnimado-difusor-on);
            box-shadow: 0 0 calc(45px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.35);
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-nucleo-3 {
            opacity: 1;
            transform: translateX(0) rotate(0deg) scale(1);
            border-color: transparent;
            background: radial-gradient(circle, #ffffff 0%, var(--checboxAnimado-nucleo) 68%, var(--checboxAnimado-nucleo-borde) 100%);
            box-shadow:
              0 0 calc(20px * var(--checboxAnimado-sombra)) var(--checboxAnimado-nucleo),
              0 0 calc(50px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.92),
              0 0 calc(110px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.55);
            transition:
              opacity calc(var(--checboxAnimado-tiempo) * 0.35) ease-out,
              transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1),
              background calc(var(--checboxAnimado-tiempo) * 0.75) ease-in,
              box-shadow calc(var(--checboxAnimado-tiempo) * 0.85) ease-in;
          }

          .checboxAnimado-difusor-4 {
            position: relative;
            z-index: 2;
            width: 76px;
            height: 76px;
            border-radius: 16px;
            transform: rotate(45deg);
            background: var(--checboxAnimado-difusor-off);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background var(--checboxAnimado-tiempo) ease, box-shadow var(--checboxAnimado-tiempo) ease;
          }

          .checboxAnimado-nucleo-4 {
            width: 48px;
            height: 48px;
            border-radius: 14px;
            background: radial-gradient(circle, rgba(var(--checboxAnimado-led-rgb), 0.45) 0%, #141921 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            opacity: 0;
            pointer-events: none;
            transform: translate(calc(-85px / var(--checboxAnimado-sx)), calc(-85px / var(--checboxAnimado-sy))) rotate(-360deg) scale(0.6);
            transition:
              opacity 0.25s ease,
              transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1),
              background calc(var(--checboxAnimado-tiempo) * 0.8) ease-in,
              box-shadow calc(var(--checboxAnimado-tiempo) * 0.9) ease-in;
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-difusor-4 {
            background: var(--checboxAnimado-difusor-on);
            box-shadow: 0 0 calc(45px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.35);
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-nucleo-4 {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(1);
            border-color: transparent;
            background: radial-gradient(circle, #ffffff 0%, var(--checboxAnimado-nucleo) 68%, var(--checboxAnimado-nucleo-borde) 100%);
            box-shadow:
              0 0 calc(20px * var(--checboxAnimado-sombra)) var(--checboxAnimado-nucleo),
              0 0 calc(50px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.92),
              0 0 calc(110px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.55);
            transition:
              opacity calc(var(--checboxAnimado-tiempo) * 0.35) ease-out,
              transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1),
              background calc(var(--checboxAnimado-tiempo) * 0.75) ease-in,
              box-shadow calc(var(--checboxAnimado-tiempo) * 0.85) ease-in;
          }

          .checboxAnimado-difusor-5 {
            position: relative;
            z-index: 2;
            width: 100px;
            height: 46px;
            border-radius: 14px;
            background: var(--checboxAnimado-difusor-off);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background var(--checboxAnimado-tiempo) ease, box-shadow var(--checboxAnimado-tiempo) ease;
          }

          .checboxAnimado-nucleo-5 {
            width: 76px;
            height: 20px;
            border-radius: 9px;
            background: radial-gradient(circle, rgba(var(--checboxAnimado-led-rgb), 0.45) 0%, #141921 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            opacity: 0;
            pointer-events: none;
            transform: translateY(calc(-95px / var(--checboxAnimado-sy))) rotate(-360deg) scale(0.6);
            transition:
              opacity 0.25s ease,
              transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1),
              background calc(var(--checboxAnimado-tiempo) * 0.8) ease-in,
              box-shadow calc(var(--checboxAnimado-tiempo) * 0.9) ease-in;
          }

          .checboxAnimado-haz-5::before {
            width: 195px;
            height: 34px;
          }

          .checboxAnimado-haz-5::after {
            width: 95px;
            height: 140px;
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-difusor-5 {
            background: var(--checboxAnimado-difusor-on);
            box-shadow: 0 0 calc(45px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.35);
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-nucleo-5 {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
            border-color: transparent;
            background: linear-gradient(90deg, var(--checboxAnimado-nucleo-borde), #ffffff, var(--checboxAnimado-nucleo-borde));
            box-shadow:
              0 0 calc(18px * var(--checboxAnimado-sombra)) var(--checboxAnimado-nucleo),
              0 0 calc(48px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.9),
              0 0 calc(105px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.55);
            transition:
              opacity calc(var(--checboxAnimado-tiempo) * 0.35) ease-out,
              transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1),
              background calc(var(--checboxAnimado-tiempo) * 0.75) ease-in,
              box-shadow calc(var(--checboxAnimado-tiempo) * 0.85) ease-in;
          }

          .checboxAnimado-difusor-6 {
            position: relative;
            z-index: 2;
            width: 100px;
            height: 100px;
            border-radius: 18px;
            background: var(--checboxAnimado-difusor-off);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background var(--checboxAnimado-tiempo) ease, box-shadow var(--checboxAnimado-tiempo) ease;
          }

          .checboxAnimado-nucleo-6 {
            width: 64px;
            height: 64px;
            border-radius: 22px;
            border: 9px solid rgba(var(--checboxAnimado-led-rgb), 0.4);
            background: #040608;
            opacity: 0;
            pointer-events: none;
            transform: translateX(calc(115px / var(--checboxAnimado-sx))) rotate(540deg) scale(0.6);
            transition:
              opacity 0.25s ease,
              transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1),
              border-color calc(var(--checboxAnimado-tiempo) * 0.8) ease-in,
              background calc(var(--checboxAnimado-tiempo) * 0.8) ease-in,
              box-shadow calc(var(--checboxAnimado-tiempo) * 0.9) ease-in;
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-difusor-6 {
            background: var(--checboxAnimado-difusor-on);
            box-shadow: 0 0 calc(45px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.35);
          }

          .checboxAnimado-input:checked + .checboxAnimado-wrap .checboxAnimado-nucleo-6 {
            opacity: 1;
            transform: translateX(0) rotate(0deg) scale(1);
            border-color: var(--checboxAnimado-nucleo);
            background: rgba(var(--checboxAnimado-led-rgb), 0.14);
            box-shadow:
              0 0 calc(18px * var(--checboxAnimado-sombra)) var(--checboxAnimado-nucleo),
              0 0 calc(48px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.88),
              inset 0 0 calc(20px * var(--checboxAnimado-sombra)) rgba(var(--checboxAnimado-led-rgb), 0.75);
            transition:
              opacity calc(var(--checboxAnimado-tiempo) * 0.35) ease-out,
              transform var(--checboxAnimado-tiempo) cubic-bezier(0.22, 1, 0.36, 1),
              border-color calc(var(--checboxAnimado-tiempo) * 0.75) ease-in,
              background calc(var(--checboxAnimado-tiempo) * 0.75) ease-in,
              box-shadow calc(var(--checboxAnimado-tiempo) * 0.85) ease-in;
          }
        `;
        document.head.appendChild(style);
      }

      parsearColor(color) {
        let limpio = String(color).trim();
        if (/^[0-9a-fA-F]{6}$/.test(limpio) || /^[0-9a-fA-F]{3}$/.test(limpio)) {
          limpio = `#${limpio}`;
        }

        const ctx = document.createElement('canvas').getContext('2d');
        ctx.fillStyle = '#2A5293';
        ctx.fillStyle = limpio;
        const valor = ctx.fillStyle;

        if (valor.startsWith('#')) {
          const num = parseInt(valor.slice(1), 16);
          return {
            r: (num >> 16) & 255,
            g: (num >> 8) & 255,
            b: num & 255
          };
        }

        const partes = valor.match(/\d+/g);
        if (partes && partes.length >= 3) {
          return {
            r: Number(partes[0]),
            g: Number(partes[1]),
            b: Number(partes[2])
          };
        }

        return { r: 42, g: 82, b: 147 };
      }

      mezclarBlanco(rgb, factor) {
        const r = Math.round(rgb.r + (255 - rgb.r) * factor);
        const g = Math.round(rgb.g + (255 - rgb.g) * factor);
        const b = Math.round(rgb.b + (255 - rgb.b) * factor);
        return `rgb(${r}, ${g}, ${b})`;
      }

      setColor(color) {
        if (!this.parent || !color) return;
        this.color = color;
        const rgb = this.parsearColor(color);
        this.parent.style.setProperty('--checboxAnimado-led', `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
        this.parent.style.setProperty('--checboxAnimado-led-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        this.parent.style.setProperty('--checboxAnimado-nucleo', this.mezclarBlanco(rgb, 0.8));
        this.parent.style.setProperty('--checboxAnimado-nucleo-borde', this.mezclarBlanco(rgb, 0.62));
      }

      setColorTexto(color) {
        if (!this.parent || !color) return;
        let limpio = String(color).trim();
        if (/^[0-9a-fA-F]{6}$/.test(limpio) || /^[0-9a-fA-F]{3}$/.test(limpio)) {
          limpio = `#${limpio}`;
        }
        this.colorTexto = limpio;
        this.parent.style.setProperty('--checboxAnimado-texto-color', limpio);
      }

      setTamanos(ancho, alto) {
        if (!this.parent) return;
        const w = Number(ancho);
        const h = alto !== undefined ? Number(alto) : w;
        if (!(w > 0) || !(h > 0)) return;
        this.ancho = w;
        this.alto = h;
        this.parent.style.setProperty('--checboxAnimado-ancho', `${w}px`);
        this.parent.style.setProperty('--checboxAnimado-alto', `${h}px`);
        this.parent.style.setProperty('--checboxAnimado-sx', `${w / 100}`);
        this.parent.style.setProperty('--checboxAnimado-sy', `${h / 100}`);
      }

      setDuracion(segundos) {
        if (!this.parent) return;
        const t = Number(segundos);
        if (!(t > 0)) return;
        this.duracion = t;
        this.parent.style.setProperty('--checboxAnimado-tiempo', `${t}s`);
      }

      setSombra(escala) {
        if (!this.parent) return;
        const s = Number(escala);
        if (isNaN(s) || s < 0) return;
        this.sombra = s;
        this.parent.style.setProperty('--checboxAnimado-sombra', `${s}`);
      }

      setSombras(escala) {
        this.setSombra(escala);
      }

      setTexto(texto) {
        if (!this.textoLabel) return;
        this.texto = String(texto);
        this.textoLabel.textContent = this.texto;
        this.actualizarClaseLabel();
      }

      setPosicionLabel(posicion) {
        if (!this.parent) return;
        if (posicion === false || posicion === 'oculto' || posicion === 'none' || posicion === 'ninguno' || posicion === 'no') {
          this.posicionLabel = 'oculto';
        } else if (posicion === 'izquierda' || posicion === 'left') {
          this.posicionLabel = 'izquierda';
        } else {
          this.posicionLabel = 'derecha';
        }
        this.actualizarClaseLabel();
      }

      actualizarClaseLabel() {
        if (!this.parent) return;
        this.parent.classList.remove('checboxAnimado-label-izquierda', 'checboxAnimado-label-oculto');
        if (this.posicionLabel === 'oculto' || this.texto.trim() === '') {
          this.parent.classList.add('checboxAnimado-label-oculto');
        } else if (this.posicionLabel === 'izquierda') {
          this.parent.classList.add('checboxAnimado-label-izquierda');
        }
      }

      renderizar() {
        const parent = document.createElement('div');
        parent.className = 'checboxAnimado-parent';

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = this.uid;
        input.className = 'checboxAnimado-input';
        input.checked = this.checked;

        const wrap = document.createElement('div');
        wrap.className = 'checboxAnimado-wrap';

        const label = document.createElement('label');
        label.htmlFor = this.uid;
        label.className = 'checboxAnimado-label';

        const hazRombo = document.createElement('span');
        hazRombo.className = 'checboxAnimado-haz-rombo';

        const hazCruz = document.createElement('span');
        hazCruz.className = this.modelo === 5
          ? 'checboxAnimado-haz-cruz checboxAnimado-haz-5'
          : 'checboxAnimado-haz-cruz';

        const difusor = document.createElement('div');
        difusor.className = `checboxAnimado-difusor-${this.modelo}`;

        const nucleo = document.createElement('div');
        nucleo.className = `checboxAnimado-nucleo-${this.modelo}`;

        difusor.appendChild(nucleo);
        label.appendChild(hazRombo);
        label.appendChild(hazCruz);
        label.appendChild(difusor);
        wrap.appendChild(label);

        const textoLabel = document.createElement('label');
        textoLabel.htmlFor = this.uid;
        textoLabel.className = 'checboxAnimado-texto';
        textoLabel.textContent = this.texto;

        parent.appendChild(input);
        parent.appendChild(wrap);
        parent.appendChild(textoLabel);
        this.contenedor.appendChild(parent);

        this.parent = parent;
        this.input = input;
        this.wrap = wrap;
        this.textoLabel = textoLabel;

        this.input.addEventListener('change', () => {
          this.checked = this.input.checked;
          if (this.onChange) this.onChange(this.checked, this);
        });
      }

      obtenerEstado() {
        return this.input ? this.input.checked : false;
      }

      cambiarEstado(valor, notificar = false) {
        if (!this.input) return;
        this.input.checked = Boolean(valor);
        this.checked = this.input.checked;
        if (notificar && this.onChange) this.onChange(this.checked, this);
      }
    }
