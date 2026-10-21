
(function (global) {
    'use strict';

    class ToolJavaScriptGio {
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
                if (!v.startsWith('--')) {
                    v = v.startsWith('ui-') ? `--${v}` : `--ui-${v}`;
                }
                root.style.setProperty(v, String(val).trim());
            }
        }

        static inject() {
            if (document.getElementById('ui-core-engine-styles')) return;
            const style = document.createElement('style');
            style.id = 'ui-core-engine-styles';
            style.textContent = `
                :root {
                    /* ==================== PALETA INDUSTRIAL & HARDWARE LED ==================== */
                    --gio-bg-body: #080808;
                    --gio-bg-chassis: #0d0d0d;
                    --gio-bg-surface: #1b1c1c;
                    --gio-bg-surface-hover: #242525;
                    --gio-bg-box: #2d2d2d;
                    
                    --gio-shadow-inset: inset 0 1px 2px 1px rgba(0, 0, 0, 0.8), 0 1px 0 0 rgba(255, 255, 255, 0.1);
                    --gio-shadow-plate: inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 2px 5px rgba(0, 0, 0, 0.6);
                    --gio-shadow-plate-active: inset 0 1px 2px rgba(0, 0, 0, 0.9), 0 1px 0 0 rgba(255, 255, 255, 0.05);

                    --gio-led-off: 0 0 2px rgba(0, 0, 0, 0.8);
                    --gio-led-green: 0 0 6px 2px rgba(15, 165, 70, 0.95), 0 0 3px 1px rgba(15, 165, 70, 0.95);
                    --gio-led-red: 0 0 6px 2px rgba(242, 95, 92, 0.9), 0 0 3px 1px rgba(242, 95, 92, 0.9);

                    --ui-accent: #0fa546;
                    --ui-accent-hover: #12c955;
                    --ui-accent-glow: rgba(15, 165, 70, 0.55);
                    --ui-accent-snap-border: rgba(15, 165, 70, 0.85);
                    --ui-accent-snap-shadow: rgba(15, 165, 70, 0.45);
                    --ui-accent-placeholder-bg: rgba(15, 165, 70, 0.08);
                    --ui-accent-btn-shadow: rgba(15, 165, 70, 0.4);

                    --ui-cad-bg-stage: #080808;
                    --ui-cad-hud-bg: #0d0d0d;
                    --ui-cad-hud-text: var(--ui-accent);
                    --ui-cad-preview-bg: #121313;
                    --ui-cad-layer-item-bg: rgba(15, 165, 70, 0.06);
                    --ui-cad-layer-item-active-bg: rgba(15, 165, 70, 0.16);
                    --ui-cad-layer-item-active-border: var(--ui-accent);
                    --ui-cad-grid-line: rgba(255, 255, 255, 0.05);
                    --ui-cad-osnap-color: #0fa546;
                    --ui-cad-origin-marker: #fbbf24;
                    --ui-cad-dim-color: #f43f5e;
                    --ui-cad-layer-item-button-color: #878787;

                    --ui-margin-top: 4px;
                    --ui-margin-right: 4px;
                    --ui-margin-bottom: 4px;
                    --ui-margin-left: 4px;
                    --ui-margin: var(--ui-margin-top) var(--ui-margin-right) var(--ui-margin-bottom) var(--ui-margin-left);
                    --ui-panel-margin: var(--ui-margin);
                    --ui-row-margin: var(--ui-margin-top) 0px var(--ui-margin-bottom) 0px;
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
                    --ui-panel-body-padding: 12px;
                    --ui-panel-body-gap: 8px;

                    --ui-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "JetBrains Mono", monospace;
                    --ui-font-family-mono: "JetBrains Mono", "SF Mono", Consolas, monospace;
                    --ui-font-weight-normal: 400;
                    --ui-font-weight-medium: 500;
                    --ui-font-weight-semibold: 600;
                    --ui-font-weight-bold: 700;

                    --ui-font-size-badge: 12px;
                    --ui-font-size-cajon-tag: 11px;
                    --ui-font-size-table-card-label: 12px;
                    --ui-font-size-layout-date: 11px;
                    --ui-font-size-label: 12px;
                    --ui-font-size-seg: 12px;
                    --ui-font-size-info: 12px;
                    --ui-font-size-accordion-title: 13px;
                    --ui-font-size-slider-label: 12px;
                    --ui-font-size-slider-val: 12px;
                    --ui-font-size-cajon-input: 11px;
                    --ui-font-size-table-footer: 12px;
                    --ui-font-size-tooltip-info: 12px;
                    --ui-font-size-panel-title: 12px;
                    --ui-font-size-btn: 12px;
                    --ui-font-size-input: 13px;
                    --ui-font-size-select: 13px;
                    --ui-font-size-table: 12px;
                    --ui-font-size-table-card-row: 12px;
                    --ui-font-size-reorder-item: 12px;
                    --ui-font-size-tooltip-title: 12px;
                    --ui-font-size-icon-btn: 12px;
                    --ui-font-size-info-close: 12px;
                    --ui-font-size-layout-name: 12px;
                    --ui-font-size-select-arrow: 12px;
                    --ui-font-size-accordion-arrow: 12px;
                    --ui-font-size-cajon-btn: 12px;

                    --ui-letter-spacing-sm: 0.5px;
                    --ui-letter-spacing-title: 0.8px;

                    --ui-btn-height: 36px;
                    --ui-container-w: 295px;
                    --ui-container-h: calc(100vh - 48px);
                    --ui-container-floating-max-h: 85vh;
                    --ui-container-header-h: 38px;
                    --ui-panel-width: 295px;
                    --ui-panel-header-h: 38px;
                    --ui-panel-collapsed-h: 38px;

                    --ui-slider-card-padding: 10px 12px;
                    --ui-slider-track-height: 10px;
                    --ui-slider-thumb-size: 16px;

                    --ui-list-max-h: 220px;
                    --ui-modal-width: 380px;
                    --ui-modal-header-h: 38px;
                    --ui-modal-max-h: 85vh;
                    --ui-modal-list-max-h: 260px;
                    --ui-square-btn-size: 38px;

                    --ui-bg-base: var(--gio-bg-body);
                    --ui-bg-panel: var(--gio-bg-surface);
                    --ui-bg-surface: var(--gio-bg-surface);
                    --ui-bg-surface-hover: var(--gio-bg-surface-hover);
                    --ui-bg-input: var(--gio-bg-chassis);
                    --ui-bg-input-hover: #151616;
                    --ui-bg-input-focus: #181919;
                    --ui-bg-cajon: var(--gio-bg-chassis);
                    --ui-bg-list: var(--gio-bg-chassis);
                    --ui-bg-tr-hover: #242525;
                    --ui-bg-modal-item: var(--gio-bg-surface);
                    --ui-bg-modal-item-hover: var(--gio-bg-surface-hover);
                    --ui-bg-reorder-active: #242525;
                    --ui-bg-reorder-dragover: #2c2e2e;
                    --ui-modal-backdrop-bg: rgba(0, 0, 0, 0.85);
                    --ui-bg-dropdown-menu: var(--gio-bg-chassis);
                    --ui-bg-dropdown-item-hover: var(--gio-bg-surface);
                    --ui-bg-dropdown-item-active: #151616;
                    --ui-bg-segmented: var(--gio-bg-chassis);
                    --ui-bg-segmented-active: var(--gio-bg-surface);
                    --ui-bg-segmented-active-h: var(--gio-bg-surface-hover);
                    --ui-bg-toggle-switch: var(--gio-bg-chassis);
                    --ui-bg-slider-content: var(--gio-bg-surface);

                    --ui-border: #282a2b;
                    --ui-border-light: #282a2b;
                    --ui-border-hover: rgba(15, 165, 70, 0.6);
                    --ui-border-focus: var(--ui-accent);
                    --ui-border-subtle: #1c1d1e;
                    --ui-border-cajon: #282a2b;
                    --ui-border-list: #282a2b;
                    --ui-border-active: var(--ui-accent);
                    --ui-border-card-row: #1c1d1e;
                    --ui-border-select: #282a2b;
                    --ui-border-circle: #282a2b;

                    --ui-radius-sm: 4px;
                    --ui-radius-md: 6px;
                    --ui-radius-base: 8px;
                    --ui-radius-lg: 10px;
                    --ui-radius-pill: 99px;

                    --ui-text-main: #9fa3a7;
                    --ui-text-muted: #7e8387;
                    --ui-text-dim: #54575a;
                    --ui-text-subtle: #757575;
                    --ui-text-bright: #f0f2f5;
                    --ui-text-hover: #ffffff;
                    --ui-text-accordion: #9fa3a7;
                    --ui-text-accordion-open: #f0f2f5;
                    --ui-text-val: var(--ui-accent);
                    --ui-text-panel-title: #d4d7db;
                    --ui-text-dropdown-item: #9fa3a7;
                    --ui-text-dropdown-item-hover: #ffffff;

                    --ui-btn-bg: var(--gio-bg-surface);
                    --ui-btn-hover-bg: var(--gio-bg-surface-hover);
                    --ui-primary-bg: #222424;
                    --ui-primary-hover-bg: #2d3030;
                    --ui-primary-border: #282a2b;
                    --ui-primary-text: #f0f2f5;
                    --ui-primary-hover-text: #ffffff;

                    --ui-danger-bg: var(--gio-bg-surface);
                    --ui-danger-border: #282a2b;
                    --ui-danger-border-hover: #f25f5c;
                    --ui-danger-color: #f25f5c;
                    --ui-danger-hover: #ff7b72;

                    --ui-toggle-switch-active-bg: var(--gio-bg-chassis);
                    --ui-toggle-thumb-active: #ffffff;
                    --ui-checkbox-box-active-bg: var(--gio-bg-chassis);
                    --ui-checkbox-box-active-border: var(--ui-accent);
                    --ui-checkbox-mark-color: #ffffff;
                    --ui-radio-circle-active-bg: var(--gio-bg-chassis);
                    --ui-radio-circle-active-border: var(--ui-accent);
                    --ui-radio-dot-color: var(--ui-accent);

                    --ui-slider-bg: var(--gio-bg-chassis);
                    --ui-slider-fill: #151616;
                    --ui-slider-thumb: var(--gio-bg-surface);
                    --ui-slider-divider: #282a2b;

                    --ui-info-bg: var(--gio-bg-surface);
                    --ui-info-border: rgba(255, 255, 255, 0.08);
                    --ui-info-accent: var(--ui-accent);
                    --ui-info-text: var(--ui-text-main);
                    --ui-info-close: var(--ui-text-muted);
                    --ui-info-close-hover: #ffffff;

                    --ui-badge-bg: var(--gio-bg-chassis);
                    --ui-badge-text: var(--ui-accent);
                    --ui-scrollbar-size: 6px;
                    --ui-scrollbar-thumb: #232525;
                    --ui-scrollbar-thumb-hover: var(--ui-accent);

                    --ui-shadow-floating: var(--gio-shadow-plate), 0 16px 36px rgba(0, 0, 0, 0.75);
                    --ui-shadow-panel: var(--gio-shadow-plate), 0 14px 28px rgba(0, 0, 0, 0.75);
                    --ui-shadow-static: var(--gio-shadow-plate);
                    --ui-shadow-tooltip: 0 10px 25px rgba(0, 0, 0, 0.8), var(--gio-shadow-inset);
                    --ui-shadow-modal: 0 24px 50px rgba(0, 0, 0, 0.9);
                    --ui-shadow-thumb: var(--gio-shadow-plate);
                    --ui-shadow-btn-floating: var(--gio-shadow-plate);
                    --ui-shadow-guide: var(--gio-led-green);
                    --ui-shadow-dropdown: 0 10px 25px rgba(0, 0, 0, 0.85), var(--gio-shadow-inset);

                    --ui-transition-fast: 0.15s ease;
                    --ui-transition-base: 0.25s ease;
                    --ui-transition-glow: 0.3s ease;
                    --ui-opacity-disabled: 0.35;
                    --ui-opacity-dragged: 0.95;
                    --ui-opacity-drag-item: 0.30;

                    --ui-cp-wheel-size: 210px;
                    --ui-cp-triangle-w: 130px;
                    --ui-cp-triangle-h: 115px;
                    --ui-cp-pointer-ring-size: 14px;
                    --ui-cp-pointer-tri-size: 10px;
                    --ui-cp-slider-row-h: 18px;
                    --ui-cp-preview-size: 26px;
                    --ui-cp-stat-val-color: #a8d5a8;
                    --ui-cp-stat-sat-color: #e0b96c;
                }

                *, *::before, *::after {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    font-family: var(--ui-font-family);
                    scrollbar-width: thin;
                    scrollbar-color: #232525 #0d0d0d;
                }

                *::-webkit-scrollbar { width: 6px; height: 6px; }
                *::-webkit-scrollbar-track { background: var(--gio-bg-chassis); }
                *::-webkit-scrollbar-thumb { background: #232525; border-radius: 3px; }

                html, body {
                    background-color: var(--gio-bg-body) !important;
                    color: var(--ui-text-main);
                    min-height: 100vh;
                    overflow-x: hidden;
                    -webkit-font-smoothing: antialiased;
                }

                /* ==================== DATE PICKERS INDUSTRIALES ==================== */
                .ui-date-picker-wrap {
                    position: relative;
                    width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
                    margin: var(--ui-input-margin);
                    user-select: none;
                    flex-shrink: 0 !important;
                }

                .ui-date-trigger {
                    width: 100%;
                    background-color: var(--gio-bg-surface);
                    color: var(--ui-text-bright);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: var(--gio-shadow-plate);
                    padding: 0 12px;
                    height: var(--ui-btn-height);
                    font-size: var(--ui-font-size-select);
                    border-radius: var(--ui-radius-md);
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: all var(--ui-transition-fast);
                    outline: none;
                }
                .ui-date-trigger:hover:not(:disabled) {
                    background-color: var(--gio-bg-surface-hover);
                    color: #fff;
                }
                .ui-date-picker-wrap.is-open .ui-date-trigger {
                    box-shadow: var(--gio-shadow-plate-active);
                    border-color: var(--ui-accent);
                }
                .ui-date-trigger-text { display: flex; align-items: center; gap: 8px; flex: 1; overflow: hidden; }
                .ui-date-icon { width: 14px; height: 14px; stroke: var(--ui-text-muted); flex-shrink: 0; }
                .ui-date-display { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: var(--ui-font-size-select); color: var(--ui-text-bright); }
                .ui-date-arrow-icon { width: 12px; height: 12px; stroke: var(--ui-text-muted); transition: transform var(--ui-transition-base); flex-shrink: 0; }
                .ui-date-picker-wrap.is-open .ui-date-arrow-icon { transform: rotate(180deg); stroke: var(--ui-accent); }

                .ui-calendar-dropdown {
                    position: absolute;
                    top: calc(100% + 4px);
                    left: 0;
                    width: 285px;
                    background: var(--gio-bg-chassis);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: var(--ui-radius-lg);
                    box-shadow: 0 14px 28px rgba(0,0,0,0.8), var(--gio-shadow-inset);
                    z-index: 1000;
                    padding: 12px;
                    display: none;
                    flex-direction: column;
                }
                .ui-date-picker-wrap.is-open .ui-calendar-dropdown { display: flex; }
                .ui-calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
                .ui-calendar-nav-btn {
                    background: var(--gio-bg-surface);
                    box-shadow: var(--gio-shadow-plate);
                    border: none;
                    color: var(--ui-text-muted);
                    width: 24px;
                    height: 24px;
                    border-radius: var(--ui-radius-sm);
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .ui-calendar-nav-btn:hover { background: var(--gio-bg-surface-hover); color: #fff; }
                .ui-calendar-nav-btn svg { width: 12px; height: 12px; stroke: currentColor; stroke-width: 2; fill: none; }
                .ui-calendar-month-year { font-size: var(--ui-font-size-panel-title); font-weight: 600; color: var(--ui-text-bright); }
                .ui-calendar-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; margin-bottom: 6px; }
                .ui-calendar-weekday { text-align: center; font-size: 10px; color: var(--ui-text-dim); font-weight: bold; text-transform: uppercase; }
                .ui-calendar-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
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
                }
                .ui-calendar-day:hover:not(.empty):not(.disabled) { background: var(--gio-bg-surface); color: #fff; }
                .ui-calendar-day.empty { cursor: default; opacity: 0.2; }
                .ui-calendar-day.disabled { color: var(--ui-text-dim); cursor: not-allowed; opacity: 0.3; }
                .ui-calendar-day.today { border: 1px solid var(--ui-accent); color: var(--ui-accent); }
                .ui-calendar-day.selected, .ui-calendar-day.range-start, .ui-calendar-day.range-end {
                    background: var(--ui-accent) !important;
                    box-shadow: var(--gio-led-green) !important;
                    color: #fff !important;
                    font-weight: 600;
                }
                .ui-calendar-day.in-range { background: rgba(15, 165, 70, 0.18); color: #fff; border-radius: 0; }
                .ui-calendar-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.05); }
                .ui-calendar-footer-info { font-size: 10px; color: var(--ui-text-dim); }
                .ui-calendar-btn-clear {
                    background: var(--gio-bg-surface);
                    box-shadow: var(--gio-shadow-plate);
                    border: none;
                    color: var(--ui-danger-color);
                    padding: 3px 8px;
                    font-size: 10px;
                    border-radius: var(--ui-radius-sm);
                    cursor: pointer;
                }

                /* ==================== PANELES Y CONTENEDORES ==================== */
                .ui-container {
                    display: flex;
                    box-sizing: border-box;
                    padding: var(--ui-container-padding);
                    gap: var(--ui-container-gap);
                    background: transparent;
                    position: relative;
                }
                .ui-container-column { flex-direction: column; width: var(--ui-container-w); height: var(--ui-container-h); overflow-y: auto; overflow-x: hidden; }
                .ui-container-row { flex-direction: row; height: var(--ui-container-h); width: var(--ui-container-w, 100%); overflow-x: auto; overflow-y: hidden; }
                .ui-container.is-hidden { display: none !important; }
                .ui-container.is-floating {
                    position: fixed !important;
                    z-index: 900;
                    background: var(--gio-bg-surface);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: var(--ui-radius-lg);
                    box-shadow: var(--gio-shadow-plate), 0 20px 40px rgba(0,0,0,0.8);
                }
                .ui-container-header {
                    height: var(--ui-container-header-h);
                    background: var(--gio-bg-surface);
                    border-bottom: 1px solid rgba(0,0,0,0.6);
                    box-shadow: 0 1px 0 rgba(255,255,255,0.05);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 12px;
                    cursor: grab;
                }

                .ui-panel-placeholder {
                    border: 1.5px dashed var(--ui-accent);
                    box-shadow: var(--gio-led-green);
                    border-radius: var(--ui-radius-lg);
                    background: var(--ui-accent-placeholder-bg);
                    min-height: 52px;
                    width: 100%;
                    flex-shrink: 0;
                    margin: var(--ui-panel-margin);
                }

                .ui-panel {
                    width: var(--ui-panel-width);
                    max-width: 100%;
                    max-height: calc(100vh - 48px);
                    background: var(--gio-bg-surface);
                    border-radius: var(--ui-radius-md);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: var(--gio-shadow-plate), 0 14px 28px rgba(0,0,0,0.7);
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    z-index: 100;
                    margin: var(--ui-panel-margin);
                    overflow: hidden;
                    transition: border-color var(--ui-transition-fast), box-shadow var(--ui-transition-fast);
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
                    box-shadow: var(--gio-shadow-plate) !important;
                    display: flex;
                    flex: 0 0 auto !important;
                    margin: var(--ui-panel-margin) !important;
                }
                .ui-panel.is-snapping {
                    border-color: var(--ui-accent-snap-border);
                    box-shadow: var(--gio-led-green);
                }
                .ui-panel.is-dragged { z-index: 10000 !important; opacity: 0.95; cursor: grabbing !important; }
                .ui-panel.collapsed {
                    height: var(--ui-panel-collapsed-h) !important;
                    min-height: var(--ui-panel-collapsed-h) !important;
                    max-height: var(--ui-panel-collapsed-h) !important;
                }
                .ui-panel.collapsed .ui-panel-body { display: none !important; }

                .ui-panel-header {
                    user-select: none;
                    height: var(--ui-panel-header-h);
                    background: var(--gio-bg-surface);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.6);
                    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
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
                    font-weight: 600;
                    color: var(--ui-text-panel-title);
                    letter-spacing: var(--ui-letter-spacing-title);
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                /* LED de estado del panel */
                .ui-panel-title::before {
                    content: "";
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #2a2c2c;
                    box-shadow: var(--gio-led-off);
                    border: none;
                    transition: all 0.3s ease;
                }
                .ui-panel:hover .ui-panel-title::before {
                    background: #fff;
                    box-shadow: var(--gio-led-green);
                }

                .ui-header-tools { display: flex; align-items: center; gap: 4px; }
                .ui-icon-btn {
                    width: 24px;
                    height: 24px;
                    border-radius: var(--ui-radius-sm);
                    border: none;
                    background: var(--gio-bg-surface);
                    box-shadow: var(--gio-shadow-plate);
                    color: var(--ui-text-muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: var(--ui-font-size-icon-btn);
                    line-height: 1;
                    transition: all var(--ui-transition-fast);
                }
                .ui-icon-btn:hover { background: var(--gio-bg-surface-hover); color: #fff; }
                .ui-icon-btn.active { color: var(--ui-accent); box-shadow: var(--gio-led-green); }

                .ui-panel-body {
                    padding: var(--ui-panel-body-padding);
                    display: flex;
                    flex-direction: column;
                    gap: var(--ui-panel-body-gap);
                    background: var(--gio-bg-chassis);
                    box-shadow: var(--gio-shadow-inset);
                    overflow-y: auto !important;
                    overflow-x: hidden !important;
                    flex: 1 1 auto;
                }
                .ui-panel-body > * { flex-shrink: 0 !important; }

                .ui-row {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 8px;
                    width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right)));
                    min-height: var(--ui-btn-height);
                    flex-shrink: 0 !important;
                    margin: var(--ui-row-margin);
                }
                .ui-row-align-0 { justify-content: flex-start; }
                .ui-row-align-0 > * { flex: 1 1 auto; min-width: 0; }
                .ui-row-align-0 > .ui-label { flex: 0 0 auto; }
                .ui-row-align-4 { justify-content: space-between; }

                .ui-label {
                    font-size: var(--ui-font-size-label);
                    font-family: var(--ui-font-family-mono);
                    color: var(--ui-text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    white-space: nowrap;
                    flex-shrink: 0;
                }

                /* ==================== BOTONES PULSADORES INDUSTRIALES ==================== */
                .ui-btn {
                    position: relative;
                    background: var(--gio-bg-surface);
                    color: var(--ui-text-bright);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: var(--gio-shadow-plate);
                    padding: 0 14px;
                    border-radius: var(--ui-radius-sm);
                    font-size: var(--ui-font-size-btn);
                    font-weight: 500;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 8px;
                    height: var(--ui-btn-height);
                    user-select: none;
                    transition: background 0.2s, transform 0.1s;
                    flex-shrink: 0 !important;
                }
                .ui-btn:hover { background: var(--gio-bg-surface-hover); color: #fff; }
                .ui-btn:active { box-shadow: var(--gio-shadow-plate-active); transform: translateY(1px); }
                .ui-btn:disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; pointer-events: none; }
                /* LED incorporado en botones */
                .ui-btn::after {
                    content: '';
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #2a2c2c;
                    box-shadow: var(--gio-led-off);
                    transition: all 0.25s ease;
                }
                .ui-btn:hover::after, .ui-btn.active::after {
                    background: #fff;
                    box-shadow: var(--gio-led-green);
                }
                .ui-btn-primary { background: #222424; }
                .ui-btn-primary::after { background: #fff; box-shadow: var(--gio-led-green); }
                .ui-btn-danger { color: #f25f5c; }
                .ui-btn-danger:hover { background: rgba(165, 15, 15, 0.2); }
                .ui-btn-danger::after { background: #fff; box-shadow: var(--gio-led-red); }

                /* ==================== INPUTS CON HENDIDURA ==================== */
                .ui-input {
                    background: var(--gio-bg-chassis);
                    border: none;
                    box-shadow: var(--gio-shadow-inset);
                    color: #fff;
                    padding: 0 10px;
                    border-radius: var(--ui-radius-md);
                    font-size: var(--ui-font-size-input);
                    outline: none;
                    height: var(--ui-btn-height);
                    transition: box-shadow 0.2s ease;
                }
                .ui-input:focus {
                    box-shadow: inset 0 1px 2px 1px rgba(0,0,0,0.8), 0 0 6px 1px var(--ui-accent-glow);
                }
                .ui-input-text { flex: 1; min-width: 0; }
                .ui-input-number { width: 65px; text-align: center; }

                /* ==================== DROPDOWNS SELECT ==================== */
                .ui-select-wrap { position: relative; width: 100%; user-select: none; }
                .ui-select-trigger {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: var(--gio-bg-surface);
                    box-shadow: var(--gio-shadow-plate);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    height: var(--ui-btn-height);
                    padding: 0 12px;
                    border-radius: var(--ui-radius-md);
                    cursor: pointer;
                    color: var(--ui-text-bright);
                }
                .ui-select-wrap.is-open .ui-select-trigger { box-shadow: var(--gio-shadow-plate-active); }
                .ui-select-arrow-svg { color: var(--ui-text-muted); transition: transform 0.2s; }
                .ui-select-wrap.is-open .ui-select-arrow-svg { transform: rotate(180deg); color: var(--ui-accent); }
                .dropdown-menu {
                    display: none;
                    position: absolute;
                    top: calc(100% + 4px);
                    left: 0;
                    right: 0;
                    background: var(--gio-bg-chassis);
                    border-radius: var(--ui-radius-md);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.8), var(--gio-shadow-inset);
                    padding: 4px;
                    z-index: 1000;
                    max-height: 180px;
                    overflow-y: auto;
                }
                .ui-select-wrap.is-open .dropdown-menu { display: flex; flex-direction: column; }
                .dropdown-item {
                    padding: 8px 12px;
                    font-size: 12px;
                    color: var(--ui-text-main);
                    border-radius: 3px;
                    cursor: pointer;
                }
                .dropdown-item:hover { background: var(--gio-bg-surface); color: #fff; }
                .dropdown-item.active { background: #151616; color: #fff; box-shadow: inset 2px 0 0 var(--ui-accent); }

                /* ==================== SWITCH CÁPSULA / TOGGLE ==================== */
                .ui-toggle {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    user-select: none;
                }
                .ui-toggle-switch {
                    position: relative;
                    width: 52px;
                    height: 26px;
                    padding: 3px;
                    background: var(--gio-bg-chassis);
                    border-radius: var(--ui-radius-pill);
                    box-shadow: var(--gio-shadow-inset);
                    transition: all 0.3s;
                }
                .ui-toggle-thumb {
                    position: relative;
                    width: 50%;
                    height: 100%;
                    background: var(--gio-bg-surface);
                    border-radius: var(--ui-radius-pill);
                    box-shadow: var(--gio-shadow-plate);
                    transition: all 0.35s cubic-bezier(0.2, 0.85, 0.32, 1.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .ui-toggle-thumb::before {
                    content: "";
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #2a2c2c;
                    box-shadow: var(--gio-led-off);
                    transition: all 0.3s ease;
                }
                .ui-toggle.active .ui-toggle-thumb { transform: translateX(100%); }
                .ui-toggle.active .ui-toggle-thumb::before { background: #fff; box-shadow: var(--gio-led-green); }

                /* ==================== CHECKBOXES & RADIOS ==================== */
                .ui-checkbox { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
                .ui-checkbox-box {
                    position: relative;
                    width: 18px;
                    height: 18px;
                    background: var(--gio-bg-chassis);
                    box-shadow: var(--gio-shadow-inset);
                    border-radius: 3px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .ui-checkbox-box::after {
                    content: '';
                    width: 6px;
                    height: 6px;
                    border-radius: 2px;
                    background: #fff;
                    box-shadow: var(--gio-led-off);
                    opacity: 0.15;
                    transition: all 0.25s ease;
                }
                .ui-checkbox.checked .ui-checkbox-box::after { opacity: 1; box-shadow: var(--gio-led-green); }
                .ui-checkbox-mark { display: none; }

                .ui-radio-group { display: flex; flex-direction: column; gap: 6px; }
                .ui-radio-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    background: var(--gio-bg-surface);
                    padding: 8px 12px;
                    border-radius: var(--ui-radius-sm);
                    box-shadow: var(--gio-shadow-plate);
                    user-select: none;
                }
                .ui-radio-circle {
                    width: 18px;
                    height: 18px;
                    background: var(--gio-bg-chassis);
                    box-shadow: var(--gio-shadow-inset);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .ui-radio-circle::after {
                    content: '';
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #fff;
                    box-shadow: var(--gio-led-off);
                    opacity: 0.2;
                    transition: 0.25s ease;
                }
                .ui-radio-item.active .ui-radio-circle::after { opacity: 1; box-shadow: var(--gio-led-green); }
                .ui-radio-dot { display: none; }

                /* ==================== POTENCIÓMETROS / SLIDERS ==================== */
                .ui-slider-card {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    padding: 12px 16px;
                    background: var(--gio-bg-surface);
                    border-radius: var(--ui-radius-md);
                    box-shadow: var(--gio-shadow-plate);
                    width: 100%;
                }
                .ui-slider-card-header { display: flex; justify-content: space-between; align-items: center; }
                .ui-slider-label { font-size: 12px; font-weight: 500; color: var(--gio-text-bright); }
                .ui-slider-val { font-family: var(--ui-font-family-mono); color: var(--ui-accent); font-weight: bold; font-size: 13px; }
                .ui-slider-track {
                    position: relative;
                    width: 100%;
                    height: 12px;
                    background: var(--gio-bg-chassis);
                    border-radius: 6px;
                    box-shadow: var(--gio-shadow-inset);
                    cursor: pointer;
                }
                .ui-slider-fill { position: absolute; height: 100%; background: #151616; border-radius: 6px; }
                .ui-slider-thumb {
                    position: absolute;
                    top: 50%;
                    width: 30px;
                    height: 20px;
                    background: var(--gio-bg-surface);
                    border-radius: 3px;
                    box-shadow: var(--gio-shadow-plate);
                    transform: translate(-50%, -50%);
                    cursor: grab;
                }
                .ui-slider-thumb::after {
                    content: '';
                    position: absolute;
                    top: 4px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 2px;
                    height: 12px;
                    background: var(--gio-bg-chassis);
                    box-shadow: -4px 0 0 var(--gio-bg-chassis), 4px 0 0 var(--gio-bg-chassis),
                                0 1px 0 rgba(255,255,255,0.25), -4px 1px 0 rgba(255,255,255,0.25), 4px 1px 0 rgba(255,255,255,0.25);
                }

                .ui-slider-cajon {
                    display: grid;
                    grid-template-rows: 0fr;
                    transition: grid-template-rows var(--ui-transition-base);
                    background: var(--gio-bg-chassis);
                    border-radius: var(--ui-radius-sm);
                    box-shadow: var(--gio-shadow-inset);
                }
                .ui-slider-card.open .ui-slider-cajon { grid-template-rows: 1fr; padding: 8px; margin-top: 6px; }
                .ui-slider-cajon-inner { overflow: hidden; display: flex; justify-content: space-between; gap: 6px; }
                .ui-cajon-input {
                    background: #080808;
                    border: none;
                    border-radius: 3px;
                    box-shadow: inset 0 1px 2px 1px rgba(0,0,0,0.8);
                    color: var(--ui-accent);
                    font-family: var(--ui-font-family-mono);
                    font-size: 11px;
                    font-weight: bold;
                    width: 50px;
                    text-align: center;
                    padding: 4px;
                }

                /* ==================== ACORDEÓN TÁCTIL ==================== */
                .ui-accordion { display: flex; flex-direction: column; gap: 8px; width: 100%; }
                .ui-accordion-item {
                    background: var(--gio-bg-surface);
                    border-radius: var(--ui-radius-md);
                    box-shadow: var(--gio-shadow-plate);
                    overflow: hidden;
                    transition: all 0.25s ease;
                }
                .ui-accordion-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px 14px;
                    cursor: pointer;
                    background: var(--gio-bg-surface);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
                    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
                }
                .ui-accordion-title { color: var(--gio-text-bright); font-weight: 500; font-size: 13px; }
                .ui-accordion-arrow { font-size: 10px; transition: transform 0.3s ease; color: var(--ui-text-dim); }
                .ui-accordion-item.open .ui-accordion-arrow { transform: rotate(90deg); color: var(--ui-accent); }
                .ui-accordion-body {
                    padding: 12px;
                    background: var(--gio-bg-chassis);
                    box-shadow: var(--gio-shadow-inset);
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                /* ==================== TABLAS ==================== */
                .ui-table-container {
                    width: 100%;
                    background: var(--gio-bg-surface);
                    box-shadow: var(--gio-shadow-plate);
                    border-radius: var(--ui-radius-md);
                    padding: 14px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .ui-table-toolbar { display: flex; justify-content: space-between; gap: 10px; }
                .ui-table-scroll { overflow-x: auto; background: var(--gio-bg-chassis); border-radius: 4px; box-shadow: var(--gio-shadow-inset); }
                .ui-table { width: 100%; border-collapse: collapse; text-align: left; }
                .ui-table th {
                    padding: 10px 14px;
                    color: var(--gio-text-dim);
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }
                .ui-table td { padding: 10px 14px; border-bottom: 1px solid rgba(0,0,0,0.5); font-size: 12px; }
                .ui-table tr:hover td { background: rgba(255, 255, 255, 0.02); color: #fff; }

                /* Snapping y Guías */
                .ui-snap-guide { border: 1.5px dashed var(--ui-accent); box-shadow: var(--gio-led-green); }
                .ui-guide-line { background: var(--ui-accent); box-shadow: var(--gio-led-green); }

                /* UI Color Picker Root */
                .ui-cp-root {
                    user-select: none;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
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
                }
                .ui-cp-triangle {
                    position: absolute;
                    width: var(--ui-cp-triangle-w);
                    height: var(--ui-cp-triangle-h);
                    cursor: crosshair;
                }
                .ui-cp-ring-pointer, .ui-cp-tri-pointer {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    transform: translate(-50%, -50%);
                    border: 2px solid #ffffff;
                    box-shadow: 0 0 3px rgba(0,0,0,0.8);
                    z-index: 10;
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
                }
                .ui-cp-root.mode-rect .ui-cp-wheel { display: none; }
                .ui-cp-root.mode-rect .ui-cp-rect-container { display: flex; }
                .ui-cp-rect-sv {
                    position: relative;
                    width: 210px;
                    height: 210px;
                    border-radius: var(--ui-radius-sm);
                    cursor: crosshair;
                    border: 1px solid var(--ui-border);
                }
                .ui-cp-rect-hue {
                    position: relative;
                    width: 20px;
                    height: 210px;
                    border-radius: var(--ui-radius-sm);
                    cursor: pointer;
                    border: 1px solid var(--ui-border);
                }
                .ui-cp-rect-sv-pointer, .ui-cp-rect-hue-pointer {
                    position: absolute;
                    border: 2px solid #ffffff;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                }
                .ui-cp-rect-sv-pointer { width: 12px; height: 12px; }
                .ui-cp-rect-hue-pointer { width: 14px; height: 14px; left: 50%; }

                .ui-cp-sliders { display: flex; flex-direction: column; gap: 8px; width: 100%; margin-top: 4px; }
                .ui-cp-slider-row { position: relative; height: var(--ui-cp-slider-row-h); border-radius: var(--ui-radius-pill); overflow: hidden; display: flex; align-items: center; border: 1px solid var(--ui-border); }
                .ui-cp-slider-bg { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
                .ui-cp-slider { position: relative; z-index: 2; width: 100%; -webkit-appearance: none; background: transparent; height: 100%; margin: 0; cursor: pointer; }
                .ui-cp-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 10px; height: 18px; background: #fff; border: 1px solid #000; border-radius: 2px; }

                .ui-cp-preview-bar { display: flex; align-items: center; justify-content: space-between; padding: 6px 0; border-top: 1px solid var(--ui-border-subtle); margin-top: 6px; }
                .ui-cp-preview { width: var(--ui-cp-preview-size); height: var(--ui-cp-preview-size); border-radius: var(--ui-radius-sm); border: 1px solid var(--ui-border); box-shadow: var(--gio-shadow-plate); }
                .ui-cp-stats { font-family: var(--ui-font-family-mono); font-size: 11px; display: flex; gap: 8px; color: var(--ui-text-muted); }
            `;
            (document.head || document.documentElement).appendChild(style);
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

    let _uiSeq = 0;

    class UIBaseComponent {
        constructor({ id = null } = {}, fallback = 'ui_comp') {
            UITheme.inject();
            _uiSeq++;
            this.id = id ? String(id).trim() : `${fallback}_${_uiSeq}`;
            this.element = null;
            this.isDestroyed = false;
            this.onDestroyCallback = null;
            UIRegistry.register(this.id, this);
        }
        mount(parent) {
            if (this.element && parent) {
                const p = parent.element ? parent.element : parent;
                p.appendChild(this.element);
            }
            return this;
        }
        onDestroy(cb) { this.onDestroyCallback = cb; return this; }
        destroy() {
            if (this.isDestroyed) return;
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

            return { x: finalX, y: finalY, snapped };
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
                }
                if (!snappedY) {
                    if (Math.abs(finalY - oy) < this.threshold) { finalY = oy; snappedY = true; guideYPos = oy; }
                    else if (Math.abs(finalY + dh - (oy + oh)) < this.threshold) { finalY = oy + oh - dh; snappedY = true; guideYPos = oy + oh; }
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
            if (Array.isArray(children)) children.forEach(c => this.append(c));
        }
        setAlign(align) {
            this.element.classList.remove(`ui-row-align-${this.align}`);
            this.align = Number.isInteger(align) ? align : 0;
            this.element.classList.add(`ui-row-align-${this.align}`);
            return this;
        }
        append(child) {
            if (!child) return this;
            if (child.mount) child.mount(this.element);
            else if (child instanceof HTMLElement) this.element.appendChild(child);
            return this;
        }
    }

    class UIContainer extends UIBaseComponent {
        constructor({
            id = null,
            direction = 'column',
            width = '295px',
            height = 'calc(100vh - 48px)',
            gap = 8,
            floating = false,
            draggable = false,
            title = '',
            x = 50,
            y = 50
        } = {}) {
            super({ id }, 'cnt');
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
                if (this.title || this.isDraggable) this.createHeader();
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
                <span class="ui-panel-title">${this.title || 'MÓDULO'}</span>
                <button class="ui-icon-btn btn-close-cnt">✕</button>
            `;
            this.element.prepend(this.header);
            this.header.querySelector('.btn-close-cnt').addEventListener('click', () => this.hide());
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
                    this.y = initY + dy;
                    this.element.style.left = `${this.x}px`;
                    this.element.style.top = `${this.y}px`;
                }
            };
            const onPointerUp = () => {
                dragging = false;
                window.removeEventListener('mousemove', onPointerMove);
                window.removeEventListener('mouseup', onPointerUp);
            };
            const trigger = this.header || this.element;
            trigger.addEventListener('mousedown', (e) => {
                if (e.target.closest('.ui-panel, button, input, select')) return;
                startX = e.clientX; startY = e.clientY;
                initX = this.element.offsetLeft; initY = this.element.offsetTop;
                window.addEventListener('mousemove', onPointerMove);
                window.addEventListener('mouseup', onPointerUp);
            });
        }

        addPanel(...panels) {
            panels.forEach(p => {
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
                } else if (p.mount) {
                    p.mount(this.element);
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
            if (!this.placeholder.parentNode) this.element.appendChild(this.placeholder);
            this.placeholder.style.display = 'block';
            this.element.appendChild(this.placeholder);
        }

        showPlaceholderAt(element) {
            if (!this.placeholder.parentNode) this.element.appendChild(this.placeholder);
            this.placeholder.style.display = 'block';
            this.element.insertBefore(this.placeholder, element);
        }

        hidePlaceholder() {
            if (this.placeholder) {
                this.placeholder.style.display = 'none';
                if (this.placeholder.parentNode) this.placeholder.parentNode.removeChild(this.placeholder);
            }
        }

        insertPanelAtPlaceholder(panel) {
            panel.parentContainer = this;
            panel.lastParentContainer = this;
            panel.inResponsiveGrid = false;
            if (this.placeholder && this.placeholder.parentNode === this.element) {
                this.element.insertBefore(panel.element, this.placeholder);
                this.hidePlaceholder();
            } else {
                this.element.appendChild(panel.element);
            }
            if (!this.panels.includes(panel)) this.panels.push(panel);
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
        hide() { this.isHidden = true; this.element.classList.add('is-hidden'); return this; }
        show() { this.isHidden = false; this.element.classList.remove('is-hidden'); return this; }

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
                this.x = s.x; this.y = s.y; this.applyPosition();
            }
        }
    }

    class UIPanelGroup extends UIContainer {
        constructor(opts = {}) {
            super({ direction: opts.type === 'row' ? 'row' : 'column', ...opts });
        }
    }

    class UISmartPanel extends UIBaseComponent {
        constructor({ id = null, title = 'CHASIS PANEL', x = 40, y = 40, width = 295, floating = true, onSnap, onUnsnap, onOpen, onClose } = {}) {
            super({ id }, 'panel');
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
                        <span class="ui-panel-title">${this.title}</span>
                    </div>
                    <div class="ui-header-tools">
                        <button class="ui-icon-btn btn-float" title="Alternar Flotante">⧉</button>
                        <button class="ui-icon-btn btn-collapse">_</button>
                        <button class="ui-icon-btn btn-close">✕</button>
                    </div>
                </div>
                <div class="ui-panel-body"></div>
            `;

            this.header = this.element.querySelector('.ui-panel-header');
            this.body = this.element.querySelector('.ui-panel-body');
            this.titleNode = this.element.querySelector('.ui-panel-title');
            this.btnFloat = this.element.querySelector('.btn-float');
            this.btnCollapse = this.element.querySelector('.btn-collapse');
            this.btnClose = this.element.querySelector('.btn-close');

            this.updateFloatButtonUI();
            this.bindEvents();

            if (this.floating) {
                if (document.body) document.body.appendChild(this.element);
                else window.addEventListener('DOMContentLoaded', () => document.body.appendChild(this.element));
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
                const cnt = this.lastParentContainer || Array.from(GlobalDock.containers)[0];
                if (cnt) cnt.addPanel(this);
            }
            this.updateFloatButtonUI();
            return this;
        }

        bindEvents() {
            this.btnCollapse.onclick = (e) => { e.stopPropagation(); this.toggleCollapse(); };
            this.btnClose.onclick = (e) => { e.stopPropagation(); this.close(); };
            this.btnFloat.onclick = (e) => { e.stopPropagation(); this.setFloating(!this.floating); };

            let offsetX = 0, offsetY = 0, targetContainer = null, startClientX = 0, startClientY = 0, isTracking = false;

            const onPointerMove = (e) => {
                if (!isTracking) return;
                const cx = (e.touches ? e.touches[0].pageX : e.pageX);
                const cy = (e.touches ? e.touches[0].pageY : e.pageY);

                if (!this.isDragging) {
                    const rawClientX = e.touches ? e.touches[0].clientX : e.clientX;
                    const rawClientY = e.touches ? e.touches[0].clientY : e.clientY;
                    if (Math.hypot(rawClientX - startClientX, rawClientY - startClientY) > 8) {
                        this.isDragging = true;
                        if (!this.floating) {
                            const rect = this.element.getBoundingClientRect();
                            if (this.parentContainer) {
                                this.lastParentContainer = this.parentContainer;
                                this.parentContainer.showPlaceholderAt(this.element);
                                this.parentContainer.removePanel(this);
                            }
                            document.body.appendChild(this.element);
                            this.element.classList.remove('ui-panel-static');
                            this.element.style.left = `${rect.left + window.scrollX}px`;
                            this.element.style.top = `${rect.top + window.scrollY}px`;
                            this.floating = true;
                            GlobalDock.register(this);
                            this.updateFloatButtonUI();
                        }
                        this.element.classList.add('is-dragged');
                    } else return;
                }

                if (e.cancelable) e.preventDefault();
                const rawX = cx - offsetX;
                const rawY = cy - offsetY;
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                const clientY = e.touches ? e.touches[0].clientY : e.clientY;

                targetContainer = GlobalDock.findContainerTarget(clientX, clientY);
                if (targetContainer) {
                    GlobalDock.hideGuide();
                    targetContainer.showPlaceholder(clientX, clientY);
                } else {
                    GlobalDock.hideAllPlaceholders();
                    const evaluated = GlobalDock.evaluate(this, rawX, rawY);
                    this.isSnapping = evaluated.snapped;
                    this.element.classList.toggle('is-snapping', this.isSnapping);
                    this.element.style.left = `${evaluated.x}px`;
                    this.element.style.top = `${evaluated.y}px`;
                    return;
                }
                this.element.style.left = `${rawX}px`;
                this.element.style.top = `${rawY}px`;
            };

            const onPointerUp = () => {
                if (!isTracking) return;
                isTracking = false;
                window.removeEventListener('mousemove', onPointerMove);
                window.removeEventListener('mouseup', onPointerUp);
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
                    GlobalDock.unregister(this);
                    this.updateFloatButtonUI();
                } else {
                    GlobalDock.hideAllPlaceholders();
                }
                targetContainer = null;
            };

            this.header.addEventListener('mousedown', (e) => {
                if (this.inResponsiveGrid) return;
                if (e.target.closest('button, input, select, .ui-accordion-header, .ui-slider-track, .ui-cp-wheel, .ui-cp-slider')) return;
                isTracking = true;
                this.isDragging = false;
                startClientX = e.clientX;
                startClientY = e.clientY;
                offsetX = e.pageX - this.element.offsetLeft;
                offsetY = e.pageY - this.element.offsetTop;
                window.addEventListener('mousemove', onPointerMove);
                window.addEventListener('mouseup', onPointerUp);
            });
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
            if (child.mount) child.mount(this.body);
            else if (child instanceof HTMLElement) this.body.appendChild(child);
            return this;
        }

        open() {
            if (!this.element) return this;
            this.element.style.display = 'flex';
            if (this.onOpenCallback) this.onOpenCallback(this);
            return this;
        }

        close() {
            if (!this.element) return this;
            this.element.style.display = 'none';
            if (this.onCloseCallback) this.onCloseCallback(this);
            return this;
        }

        toggle() { return this.element.style.display === 'none' ? this.open() : this.close(); }
        setTitle(t) { if (this.titleNode) this.titleNode.textContent = t; return this; }

        getState() {
            const r = this.element.getBoundingClientRect();
            return {
                type: 'SmartPanel',
                x: this.floating ? parseFloat(this.element.style.left) || r.left : 0,
                y: this.floating ? parseFloat(this.element.style.top) || r.top : 0,
                floating: this.floating,
                collapsed: this.isCollapsed,
                visible: this.element.style.display !== 'none',
                containerId: this.parentContainer ? this.parentContainer.id : null
            };
        }

        setState(s) {
            if (!s) return;
            if (s.floating !== undefined && s.floating !== this.floating) this.setFloating(s.floating, s.x, s.y);
            if (s.collapsed !== undefined && s.collapsed !== this.isCollapsed) this.toggleCollapse();
            if (s.visible !== undefined) s.visible ? this.open() : this.close();
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
                    <span class="ui-slider-label">${this.label}</span>
                    <div style="display:flex; align-items:center; gap:6px;">
                        <span class="ui-slider-val"></span>
                        <button class="ui-icon-btn ui-cajon-btn" style="width:20px; height:20px;">▼</button>
                    </div>
                </div>
                <div class="ui-slider-track">
                    <div class="ui-slider-fill"></div>
                    <div class="ui-slider-thumb"></div>
                </div>
                <div class="ui-slider-cajon">
                    <div class="ui-slider-cajon-inner">
                        <div><span class="ui-label">Min</span> <input type="number" class="ui-cajon-input input-min" value="${this.min}"></div>
                        <div><span class="ui-label">Max</span> <input type="number" class="ui-cajon-input input-max" value="${this.max}"></div>
                        <div><span class="ui-label">Paso</span> <input type="number" class="ui-cajon-input input-step" value="${this.step}"></div>
                    </div>
                </div>
            `;

            this.track = this.element.querySelector('.ui-slider-track');
            this.fill = this.element.querySelector('.ui-slider-fill');
            this.thumb = this.element.querySelector('.ui-slider-thumb');
            this.valDisplay = this.element.querySelector('.ui-slider-val');
            this.toggleBtn = this.element.querySelector('.ui-cajon-btn');

            this.inputMin = this.element.querySelector('.input-min');
            this.inputMax = this.element.querySelector('.input-max');
            this.inputStep = this.element.querySelector('.input-step');

            this.bindEvents();
            this.updateUI();
        }

        bindEvents() {
            this.toggleBtn.onclick = () => {
                this.isOpen = !this.isOpen;
                this.element.classList.toggle('open', this.isOpen);
            };

            const handleMove = (e) => {
                if (e.cancelable) e.preventDefault();
                const cx = e.touches ? e.touches[0].clientX : e.clientX;
                const rect = this.track.getBoundingClientRect();
                let pos = Math.max(0, Math.min(1, (cx - rect.left) / rect.width));
                let rawVal = this.min + pos * (this.max - this.min);
                const steps = Math.round((rawVal - this.min) / this.step);
                this.value = Number((this.min + steps * this.step).toFixed(2));
                this.value = Math.max(this.min, Math.min(this.max, this.value));
                this.updateUI();
                if (this.onChange) this.onChange(this.value, this);
            };

            let moving = false;
            this.track.addEventListener('mousedown', (e) => { moving = true; handleMove(e); });
            window.addEventListener('mousemove', (e) => { if (moving) handleMove(e); });
            window.addEventListener('mouseup', () => { moving = false; });
        }

        getValue() { return this.value; }
        setValue(v) {
            this.value = Math.max(this.min, Math.min(this.max, v));
            this.updateUI();
            if (this.onChange) this.onChange(this.value, this);
            return this;
        }

        updateUI() {
            const range = this.max - this.min;
            const percent = range > 0 ? Math.max(0, Math.min(100, ((this.value - this.min) / range) * 100)) : 0;
            this.fill.style.width = `${percent}%`;
            this.thumb.style.left = `${percent}%`;
            this.valDisplay.textContent = this.value;
        }
    }

    class UILabel extends UIBaseComponent {
        constructor({ text = '' } = {}) {
            super();
            this.element = document.createElement('span');
            this.element.className = 'ui-label';
            this.element.textContent = text;
        }
        setText(t) { if (this.element) this.element.textContent = t; return this; }
        getText() { return this.element ? this.element.textContent : ''; }
    }

    class UIButton extends UIBaseComponent {
        constructor({ id = null, text = 'PULSADOR', variant = 'default', onClick } = {}) {
            super({ id }, 'btn');
            this.element = document.createElement('button');
            this.element.className = `ui-btn ${variant === 'primary' ? 'ui-btn-primary' : variant === 'danger' ? 'ui-btn-danger' : ''}`;
            this.element.innerHTML = `<span>${text}</span>`;
            this.element.onclick = (e) => { if (onClick) onClick(e, this); };
        }
        setText(t) { if (this.element) this.element.querySelector('span').textContent = t; return this; }
        setDisabled(v) { if (this.element) this.element.disabled = !!v; return this; }
    }

    class UIInputText extends UIBaseComponent {
        constructor({ value = '', placeholder = '', onChange, onInput } = {}) {
            super();
            this.element = document.createElement('input');
            this.element.type = 'text';
            this.element.className = 'ui-input ui-input-text';
            this.element.value = value;
            this.element.placeholder = placeholder;
            this.element.oninput = (e) => { if (onInput) onInput(e.target.value, e, this); };
            this.element.onchange = (e) => { if (onChange) onChange(e.target.value, e, this); };
        }
        getValue() { return this.element ? this.element.value : ''; }
        setValue(v) { if (this.element) this.element.value = v; return this; }
        setDisabled(v) { if (this.element) this.element.disabled = !!v; return this; }
    }

    class UIInputNumberInt extends UIBaseComponent {
        constructor({ value = 0, min = -Infinity, max = Infinity, onChange, onInput } = {}) {
            super();
            this.min = Math.round(min);
            this.max = Math.round(max);
            this.value = Math.max(this.min, Math.min(this.max, Math.round(value)));
            this.element = document.createElement('input');
            this.element.type = 'number';
            this.element.className = 'ui-input ui-input-number';
            this.element.value = this.value;
            this.element.oninput = (e) => {
                let p = parseInt(e.target.value, 10);
                if (!isNaN(p)) {
                    this.value = Math.max(this.min, Math.min(this.max, p));
                    if (onInput) onInput(this.value, e, this);
                }
            };
            this.element.onchange = (e) => {
                let p = parseInt(e.target.value, 10);
                if (isNaN(p)) p = 0;
                this.value = Math.max(this.min, Math.min(this.max, p));
                this.element.value = this.value;
                if (onChange) onChange(this.value, e, this);
            };
        }
        getValue() { return this.value; }
        setValue(v) {
            const p = parseInt(v, 10);
            this.value = isNaN(p) ? 0 : Math.max(this.min, Math.min(this.max, p));
            if (this.element) this.element.value = this.value;
            return this;
        }
        setDisabled(v) { if (this.element) this.element.disabled = !!v; return this; }
    }

    class UICheckbox extends UIBaseComponent {
        constructor({ label = '', checked = false, onChange } = {}) {
            super();
            this.checked = !!checked;
            this.disabled = false;
            this.element = document.createElement('div');
            this.element.className = `ui-checkbox ${this.checked ? 'checked' : ''}`;
            this.element.innerHTML = `<div class="ui-checkbox-box"><div class="ui-checkbox-mark"></div></div><span class="ui-label">${label}</span>`;
            this.element.onclick = () => {
                if (this.disabled) return;
                this.checked = !this.checked;
                this.element.classList.toggle('checked', this.checked);
                if (onChange) onChange(this.checked, this);
            };
        }
        getValue() { return this.checked; }
        setValue(v) { this.checked = !!v; if (this.element) this.element.classList.toggle('checked', this.checked); return this; }
        setDisabled(v) { this.disabled = !!v; if (this.element) this.element.classList.toggle('disabled', this.disabled); return this; }
    }

    class UIToggle extends UIBaseComponent {
        constructor({ label = '', value = false, onChange } = {}) {
            super();
            this.value = !!value;
            this.disabled = false;
            this.element = document.createElement('div');
            this.element.className = `ui-toggle ${this.value ? 'active' : ''}`;
            this.element.innerHTML = `<div class="ui-toggle-switch"><div class="ui-toggle-thumb"></div></div><span class="ui-label">${label}</span>`;
            this.element.onclick = () => {
                if (this.disabled) return;
                this.value = !this.value;
                this.element.classList.toggle('active', this.value);
                if (onChange) onChange(this.value, this);
            };
        }
        getValue() { return this.value; }
        setValue(v) { this.value = !!v; if (this.element) this.element.classList.toggle('active', this.value); return this; }
        setDisabled(v) { this.disabled = !!v; if (this.element) this.element.classList.toggle('disabled', this.disabled); return this; }
    }

    class UISelect extends UIBaseComponent {
        constructor({ options = [], value = '', onChange } = {}) {
            super();
            this.options = Array.isArray(options) ? options.map(o => {
                if (typeof o === 'object' && o !== null) return o;
                return { value: o, label: String(o) };
            }) : [];
            this.value = value !== '' ? value : (this.options[0]?.value ?? '');
            this.onChange = onChange;
            this.isOpen = false;
            this.disabled = false;

            this.element = document.createElement('div');
            this.element.className = 'ui-select-wrap';
            this.element.innerHTML = `
                <div class="ui-select-trigger header-dropdown">
                    <span class="ui-select-label-text"></span>
                    <svg class="ui-select-arrow-svg" width="10" height="6" viewBox="0 0 10 6">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
                    </svg>
                </div>
                <div class="dropdown-menu"></div>
            `;
            this.trigger = this.element.querySelector('.ui-select-trigger');
            this.labelText = this.element.querySelector('.ui-select-label-text');
            this.menu = this.element.querySelector('.dropdown-menu');

            this.renderItems();
            this.bindEvents();
        }

        renderItems() {
            this.menu.innerHTML = '';
            let currentLabel = '';
            this.options.forEach(opt => {
                const isSelected = String(opt.value) === String(this.value);
                if (isSelected) currentLabel = opt.label;
                const itemEl = document.createElement('div');
                itemEl.className = `dropdown-item ${isSelected ? 'active' : ''}`;
                itemEl.textContent = opt.label;
                itemEl.onclick = (e) => {
                    e.stopPropagation();
                    this.setValue(opt.value);
                    this.close();
                    if (this.onChange) this.onChange(this.value, this);
                };
                this.menu.appendChild(itemEl);
            });
            this.labelText.textContent = currentLabel || (this.options[0]?.label ?? '');
        }

        bindEvents() {
            this.trigger.onclick = (e) => { e.stopPropagation(); this.toggle(); };
            document.addEventListener('click', (e) => { if (!this.element.contains(e.target)) this.close(); });
        }

        toggle() { this.isOpen ? this.close() : this.open(); }
        open() { this.isOpen = true; this.element.classList.add('is-open'); }
        close() { this.isOpen = false; this.element.classList.remove('is-open'); }
        getValue() { return this.value; }
        setValue(v) {
            this.value = v;
            this.renderItems();
            return this;
        }
        setDisabled(v) {
            this.disabled = !!v;
            this.element.classList.toggle('disabled', this.disabled);
            return this;
        }
    }

    class UISegmented extends UIBaseComponent {
        constructor({ items = [], activeIndex = 0, onChange } = {}) {
            super();
            this.items = Array.isArray(items) ? items : [];
            this.activeIndex = activeIndex;
            this.onChange = onChange;
            this.element = document.createElement('div');
            this.element.style.cssText = 'display:flex; background:var(--gio-bg-chassis); box-shadow:var(--gio-shadow-inset); border-radius:6px; padding:3px; gap:4px; width:100%;';
            this.domItems = this.items.map((item, idx) => {
                const el = document.createElement('div');
                const isAct = idx === this.activeIndex;
                el.style.cssText = `flex:1; text-align:center; padding:6px 10px; font-size:11px; cursor:pointer; border-radius:4px; font-weight:600; color:${isAct ? '#fff' : 'var(--ui-text-muted)'}; background:${isAct ? 'var(--gio-bg-surface)' : 'transparent'}; box-shadow:${isAct ? 'var(--gio-shadow-plate)' : 'none'}; transition:0.2s;`;
                el.textContent = item.label || item;
                el.onclick = () => this.select(idx);
                this.element.appendChild(el);
                return el;
            });
        }
        select(idx) {
            this.activeIndex = idx;
            this.domItems.forEach((el, i) => {
                const isAct = i === idx;
                el.style.background = isAct ? 'var(--gio-bg-surface)' : 'transparent';
                el.style.color = isAct ? '#fff' : 'var(--ui-text-muted)';
                el.style.boxShadow = isAct ? 'var(--gio-shadow-plate)' : 'none';
            });
            if (this.onChange) this.onChange(this.getValue(), idx, this);
            return this;
        }
        getValue() {
            const c = this.items[this.activeIndex];
            return c ? (c.value !== undefined ? c.value : c) : null;
        }
    }

    class UIRadioGroup extends UIBaseComponent {
        constructor({ items = [], activeIndex = 0, onChange } = {}) {
            super();
            this.items = Array.isArray(items) ? items : [];
            this.activeIndex = activeIndex;
            this.element = document.createElement('div');
            this.element.className = 'ui-radio-group';
            this.render(onChange);
        }
        render(onChange) {
            this.element.innerHTML = '';
            this.items.forEach((item, idx) => {
                const el = document.createElement('div');
                el.className = `ui-radio-item ${idx === this.activeIndex ? 'active' : ''}`;
                el.innerHTML = `<div class="ui-radio-circle"></div><span class="ui-label">${item.label || item}</span>`;
                el.onclick = () => {
                    this.activeIndex = idx;
                    this.render(onChange);
                    if (onChange) onChange(this.getValue(), idx, this);
                };
                this.element.appendChild(el);
            });
        }
        getValue() {
            const c = this.items[this.activeIndex];
            return c ? (c.value !== undefined ? c.value : c) : null;
        }
    }

    class UIBadge2 extends UILabel {}
    class UICheckbox2 extends UICheckbox {}
    class UIToggle2 extends UIToggle {}
    class UIInputText2 extends UIInputText {}
    class UIInputNumber2 extends UIInputNumberInt {}
    class UIButton2 extends UIButton {}

    class UIAccordionItem extends UIBaseComponent {
        constructor({ title = 'MÓDULO', open = false, onToggle } = {}) {
            super();
            this.isOpen = !!open;
            this.onToggleCallback = onToggle;
            this.element = document.createElement('div');
            this.element.className = `ui-accordion-item ${this.isOpen ? 'open' : ''}`;
            this.element.innerHTML = `
                <div class="ui-accordion-header">
                    <span class="ui-accordion-title">${title}</span>
                    <span class="ui-accordion-arrow">▶</span>
                </div>
                <div class="ui-accordion-body" style="${this.isOpen ? '' : 'display:none;'}"></div>
            `;
            this.header = this.element.querySelector('.ui-accordion-header');
            this.body = this.element.querySelector('.ui-accordion-body');
            this.header.onclick = () => this.toggle();
        }
        append(child) {
            if (child.mount) child.mount(this.body);
            else if (child instanceof HTMLElement) this.body.appendChild(child);
            return this;
        }
        addRow(...args) {
            let alignMode = 0;
            let children = args;
            if (typeof args[0] === 'number') { alignMode = args[0]; children = args.slice(1); }
            const row = new UIRow({ align: alignMode, children });
            row.mount(this.body);
            return row;
        }
        open() { this.isOpen = true; this.element.classList.add('open'); this.body.style.display = 'flex'; return this; }
        close() { this.isOpen = false; this.element.classList.remove('open'); this.body.style.display = 'none'; return this; }
        toggle() { return this.isOpen ? this.close() : this.open(); }
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
        addItem(opts = {}) {
            const item = new UIAccordionItem({
                ...opts,
                onToggle: (isOpen, instance) => {
                    if (isOpen && this.exclusive) {
                        this.items.forEach(other => { if (other !== instance) other.close(); });
                    }
                    if (this.onChange) this.onChange(isOpen, instance, this);
                }
            });
            this.items.push(item);
            item.mount(this.element);
            return item;
        }
    }

    class UIInfo extends UIBaseComponent {
        constructor({ text = '', duration = 0, onDismiss } = {}) {
            super();
            this.element = document.createElement('div');
            this.element.style.cssText = 'padding:10px 14px; background:var(--gio-bg-surface); border-radius:4px; box-shadow:var(--gio-shadow-plate); font-size:12px; color:var(--ui-accent); display:flex; justify-content:space-between; align-items:center;';
            this.element.innerHTML = `<span>ℹ ${text}</span><button style="background:none; border:none; color:#f25f5c; cursor:pointer;">✕</button>`;
            this.element.querySelector('button').onclick = () => {
                if (onDismiss) onDismiss(this);
                this.destroy();
            };
            if (duration > 0) setTimeout(() => this.destroy(), duration);
        }
    }

    class UISquareButton extends UIButton {
        constructor(opts = {}) {
            super({ ...opts, text: opts.text || '■' });
            this.element.style.width = '38px';
            this.element.style.justifyContent = 'center';
            this.element.style.padding = '0';
        }
    }

    class UIReorderList extends UIBaseComponent {
        constructor({ items = [], onReorder } = {}) {
            super();
            this.items = [...items];
            this.element = document.createElement('div');
            this.element.style.cssText = 'display:flex; flex-direction:column; gap:6px; background:var(--gio-bg-chassis); padding:8px; border-radius:6px; box-shadow:var(--gio-shadow-inset);';
            this.render();
        }
        render() {
            this.element.innerHTML = '';
            this.items.forEach((it, i) => {
                const el = document.createElement('div');
                el.style.cssText = 'padding:8px 12px; background:var(--gio-bg-surface); border-radius:4px; box-shadow:var(--gio-shadow-plate); font-size:12px; color:#fff; cursor:grab;';
                el.textContent = it.name || it;
                this.element.appendChild(el);
            });
        }
    }

    class UITable extends UIBaseComponent {
        constructor({ columns = [], data = [], pageSize = 5 } = {}) {
            super();
            this.columns = columns;
            this.data = [...data];
            this.pageSize = pageSize;
            this.element = document.createElement('div');
            this.element.className = 'ui-table-container';
            this.element.innerHTML = `
                <div class="ui-table-toolbar">
                    <input type="text" class="ui-input" placeholder="Buscar..." style="flex:1;">
                </div>
                <div class="ui-table-scroll">
                    <table class="ui-table"><thead><tr></tr></thead><tbody></tbody></table>
                </div>
            `;
            this.thead = this.element.querySelector('thead tr');
            this.tbody = this.element.querySelector('tbody');
            this.render();
        }
        render() {
            this.thead.innerHTML = this.columns.map(c => `<th>${c.label || c.key}</th>`).join('') + '<th>ACCIÓN</th>';
            this.tbody.innerHTML = '';
            this.data.slice(0, this.pageSize).forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = this.columns.map(c => `<td>${row[c.key] ?? ''}</td>`).join('') + `<td><button class="ui-btn ui-btn-danger" style="height:22px; padding:0 6px;">✕</button></td>`;
                this.tbody.appendChild(tr);
            });
        }
    }

    class UIResponsiveGrid extends UIBaseComponent {
        constructor({ minItemWidth = 280, gap = 12 } = {}) {
            super();
            this.element = document.createElement('div');
            this.element.style.cssText = `display:grid; grid-template-columns:repeat(auto-fill, minmax(${minItemWidth}px, 1fr)); gap:${gap}px; width:100%;`;
        }
        addElement(it) {
            if (it.mount) it.mount(this.element);
            else if (it instanceof HTMLElement) this.element.appendChild(it);
            return this;
        }
    }

    /* ==================== COLOR PICKER COMPLETO DE a.js ==================== */
    class UIColorPicker extends UIBaseComponent {
        constructor({
            id = null,
            title = 'COLOR PICKER',
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
            this.isRectMode = false;

            this.isEyedropperActive = false;
            this.isEyedropperMouseDown = false;
            this._overlayEyedropper = null;
            this._bubbleEyedropper = null;

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
            this.bindEvents();

            if (canvas) this.setCanvas(canvas);

            requestAnimationFrame(() => {
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
                try { src = src(); } catch (e) { return null; }
            }
            if (typeof src === 'string') src = document.querySelector(src);
            return (src instanceof HTMLCanvasElement) ? src : null;
        }

        refreshCanvasTarget() {
            const target = this._resolveCanvas();
            if (target !== this.currentCanvas) {
                this.currentCanvas = target;
                this.currentCtx = this.currentCanvas ? this.currentCanvas.getContext('2d', { willReadFrequently: true }) : null;
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
                r = Math.round(r * 255); g = Math.round(g * 255); b = Math.round(b * 255);
            } else {
                r = Math.round(r); g = Math.round(g); b = Math.round(b);
            }
            return {
                r: Math.max(0, Math.min(255, isNaN(r) ? 56 : r)),
                g: Math.max(0, Math.min(255, isNaN(g) ? 189 : g)),
                b: Math.max(0, Math.min(255, isNaN(b) ? 248 : b)),
                a: Math.max(0, Math.min(1, isNaN(a) ? 1.0 : a))
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
                        <button class="ui-btn btn-palette" style="height:26px; padding:0 8px; font-size:11px;">Paleta</button>
                        <button class="ui-btn btn-eyedropper" style="height:26px; padding:0 8px; font-size:11px;">Picker</button>
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
                    <span class="ui-label" style="font-size:11px;">COLOR:</span>
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
                statsSel: container.querySelector('.ui-cp-stats-sel')
            };

            this.triCtx = this.dom.triangle.getContext('2d', { willReadFrequently: true });
        }

        renderTriangle() {
            if (!this.dom || !this.dom.triangle || !this.triCtx) return;
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

        bindEvents() {
            this.dom.chkRect.onclick = () => {
                this.isRectMode = !this.isRectMode;
                this.dom.chkRect.classList.toggle('checked', this.isRectMode);
                this.dom.root.classList.toggle('mode-rect', this.isRectMode);
                this.updateUI();
            };

            this.dom.sliderHue.oninput = (e) => {
                this.hue = parseFloat(e.target.value);
                this.renderTriangle();
                this.updateUI();
            };
            this.dom.sliderSat.oninput = (e) => { this.sat = parseFloat(e.target.value); this.updateUI(); };
            this.dom.sliderVal.oninput = (e) => { this.val = parseFloat(e.target.value); this.updateUI(); };
            this.dom.sliderAlpha.oninput = (e) => { this.alpha = parseFloat(e.target.value); this.updateUI(); };

            this.dom.ring.onmousedown = (e) => { this.isDraggingRing = true; this.updateHueFromMouse(e); };
            this.dom.triangle.onmousedown = (e) => { this.isDraggingTriangle = true; this.updateSVFromMouse(e); };

            window.addEventListener('mousemove', (e) => {
                if (this.isDraggingRing) this.updateHueFromMouse(e);
                if (this.isDraggingTriangle) this.updateSVFromMouse(e);
            });
            window.addEventListener('mouseup', () => {
                this.isDraggingRing = false;
                this.isDraggingTriangle = false;
            });
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
            let my = Math.max(0, Math.min(tH - 0.001, (e.clientY - r.top) * (tH / r.height)));
            const yn = my / (tH - 1);
            let xn = mx / (tW - 1);
            this.sat = Math.max(0, Math.min(100, 100 * (xn + 0.5 - 0.5 * yn)));
            this.val = Math.max(0, Math.min(100, 100 * yn));
            this.dom.sliderSat.value = Math.round(this.sat);
            this.dom.sliderVal.value = Math.round(this.val);
            this.updateUI();
        }

        updateUI(source = null) {
            const rgb = this.hsvToRgb(this.hue, this.sat, this.val);
            this.dom.preview.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            if (source !== 'hex') this.dom.hex.value = this.rgbToHex(rgb.r, rgb.g, rgb.b);
            this.callback(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.alpha})`, rgb, this.dom.hex.value);
        }

        hsvToRgb(h, s, v) {
            h = ((h % 360) + 360) % 360 / 360;
            s /= 100; v /= 100;
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
            r /= 255; g /= 255; b /= 255;
            const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
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

        updateImageStats() {}
    }

    /* ==================== DATEPICKERS COMPLETOS DE a.js ==================== */
    const UI_MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    class UIDatePicker extends UIBaseComponent {
        constructor({ id = null, value = null, placeholder = 'Seleccionar fecha...', onChange } = {}) {
            super({ id }, 'datepicker');
            this.onChange = onChange;
            this.placeholder = placeholder;
            this.isOpen = false;
            this.selectedDate = value ? new Date(value) : null;
            const now = new Date();
            this.currentMonth = this.selectedDate ? this.selectedDate.getMonth() : now.getMonth();
            this.currentYear = this.selectedDate ? this.selectedDate.getFullYear() : now.getFullYear();

            this.element = document.createElement('div');
            this.element.className = 'ui-date-picker-wrap';
            this.element.innerHTML = `
                <button type="button" class="ui-date-trigger">
                    <span class="ui-date-display">${this.selectedDate ? this.selectedDate.toLocaleDateString() : this.placeholder}</span>
                    <span style="font-size:10px;">▼</span>
                </button>
                <div class="ui-calendar-dropdown">
                    <div class="ui-calendar-header">
                        <button class="ui-calendar-nav-btn btn-prev">◀</button>
                        <div class="ui-calendar-month-year"></div>
                        <button class="ui-calendar-nav-btn btn-next">▶</button>
                    </div>
                    <div class="ui-calendar-days"></div>
                </div>
            `;
            this.trigger = this.element.querySelector('.ui-date-trigger');
            this.display = this.element.querySelector('.ui-date-display');
            this.monthYear = this.element.querySelector('.ui-calendar-month-year');
            this.daysContainer = this.element.querySelector('.ui-calendar-days');

            this.trigger.onclick = (e) => { e.stopPropagation(); this.toggle(); };
            this.element.querySelector('.btn-prev').onclick = (e) => { e.stopPropagation(); this.currentMonth--; this.render(); };
            this.element.querySelector('.btn-next').onclick = (e) => { e.stopPropagation(); this.currentMonth++; this.render(); };
            document.addEventListener('click', () => this.close());
            this.render();
        }

        render() {
            this.monthYear.textContent = `${UI_MONTH_NAMES[(this.currentMonth + 12) % 12]} ${this.currentYear}`;
            this.daysContainer.innerHTML = '';
            for (let i = 1; i <= 31; i++) {
                const d = document.createElement('div');
                d.className = 'ui-calendar-day';
                d.textContent = i;
                d.onclick = (e) => {
                    e.stopPropagation();
                    this.selectedDate = new Date(this.currentYear, this.currentMonth, i);
                    this.display.textContent = this.selectedDate.toLocaleDateString();
                    this.close();
                    if (this.onChange) this.onChange(this.selectedDate, this);
                };
                this.daysContainer.appendChild(d);
            }
        }

        toggle() { this.isOpen ? this.close() : this.open(); }
        open() { this.isOpen = true; this.element.classList.add('is-open'); }
        close() { this.isOpen = false; this.element.classList.remove('is-open'); }
        getValue() { return this.selectedDate; }
    }

    class UIDateRangePicker extends UIDatePicker {}

    class UILayoutManagerClass {
        constructor() { this.factoryState = null; }
        open() {}
        close() {}
    }
    const GlobalLayoutManager = new UILayoutManagerClass();

    /* ============================================================================
       OBJETO GLOBAL UI (COMPATIBILIDAD TOTAL CON a.js)
       ============================================================================ */
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
