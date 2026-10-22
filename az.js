class UITheme {
  constructor(variables = {}) {
    this._vars = Object.assign({
      '--bg-base': '#121212',
      '--bg-panel': '#1e1e1e',
      '--bg-surface': '#1e1e1e',
      '--bg-elevated': '#252526',
      '--bg-input': '#252525',
      '--bg-hover': '#333333',
      '--bg-list': '#181818',
      '--border-subtle': '#2c2c2c',
      '--border-strong': '#3a3a3a',
      '--text-primary': '#e0e0e0',
      '--text-secondary': '#8a8a8a',
      '--text-muted': '#555555',
      '--text-dim': '#444444',
      '--accent': '#242424d0',
      '--accent-alpha': 'rgba(92, 156, 230, 0.5)',
      '--accent-dim': 'rgba(92, 156, 230, 0.15)',
      '--danger-bg': '#2a1a1a',
      '--danger-border': '#5a2d2d',
      '--danger-text': '#f85149',
      '--font-main': "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      '--font-mono': '"SF Mono", Menlo, Consolas, monospace',
      '--ui-scrollbar-size': '6px',
      '--ui-scrollbar-thumb': '#3a3a3a',
      '--ui-scrollbar-thumb-hover': '#555555',
      '--ui-radius-pill': '10px'
    }, variables);
    this._styleElement = null;
    this.init();
  }

  init() {
    this._styleElement = document.createElement('style');
    this.update();
    if (document.head) {
      document.head.appendChild(this._styleElement);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.head.appendChild(this._styleElement);
      });
    }
  }

  setVariable(key, val) {
    this._vars[key] = val;
    this.update();
  }

  update() {
    let cssVars = ':root {\n';
    for (const [key, val] of Object.entries(this._vars)) {
      cssVars += `  ${key}: ${val};\n`;
    }
    cssVars += '}\n';

    const baseCSS = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      
      *::-webkit-scrollbar {
        width: var(--ui-scrollbar-size);
        height: var(--ui-scrollbar-size);
      }
      *::-webkit-scrollbar-track { background: transparent; }
      *::-webkit-scrollbar-thumb {
        background: var(--ui-scrollbar-thumb);
        border-radius: var(--ui-radius-pill);
      }
      *::-webkit-scrollbar-thumb:hover { background: var(--ui-scrollbar-thumb-hover); }

      body {
        font-family: var(--font-main);
        background: var(--bg-base);
        color: var(--text-primary);
        font-size: 12px;
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
        user-select: none;
      }

      .ui-top-bar {
        background: var(--bg-elevated);
        height: 32px;
        display: flex;
        align-items: center;
        padding: 0 12px;
        gap: 16px;
        border-bottom: 1px solid var(--border-subtle);
        font-size: 12px;
        color: var(--text-secondary);
        flex-shrink: 0;
        z-index: 1000;
      }
      .ui-top-bar-item { cursor: pointer; transition: color 0.15s; }
      .ui-top-bar-item:hover { color: var(--text-primary); }

      .ui-layout { display: flex; flex: 1; height: calc(100vh - 32px); width: 100vw; position: relative; overflow: hidden; }
      
      .ui-container {
        display: flex;
        flex-direction: column;
        background: var(--bg-panel);
        flex-shrink: 0;
        overflow-y: auto;
        overflow-x: hidden;
        gap: 8px;
        padding: 8px;
        position: relative;
        z-index: 10;
        min-width: 60px;
      }
      .ui-container.bordered-right { border-right: 1px solid var(--border-subtle); }
      .ui-container.bordered-left { border-left: 1px solid var(--border-subtle); }
      
      .ui-placeholder {
        border: 1.5px dashed var(--accent);
        border-radius: 6px;
        background: var(--accent-dim);
        min-height: 48px;
        width: 100%;
        flex-shrink: 0;
      }

      .ui-panel {
        background: var(--bg-panel);
        border: 1px solid var(--border-strong);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 10px 24px rgba(0,0,0,0.5);
        overflow: hidden;
      }
      .ui-panel.floating {
        position: fixed !important;
        z-index: 500;
        box-shadow: 0 14px 35px rgba(0,0,0,0.7);
      }
      .ui-panel.docked {
        position: relative !important;
        left: auto !important;
        top: auto !important;
        width: 100% !important;
        box-shadow: none;
        flex-shrink: 0;
      }
      .ui-panel.dragging {
        z-index: 9999 !important;
        opacity: 0.9;
        cursor: grabbing !important;
      }
      .ui-panel.snapping {
        border-color: var(--accent);
        box-shadow: 0 0 14px var(--accent-alpha);
      }
      .ui-panel.collapsed {
        height: 34px !important;
        min-height: 34px !important;
      }
      .ui-panel.collapsed .ui-panel-body { display: none !important; }

      .ui-panel-header {
        padding: 6px 10px;
        height: 34px;
        background: var(--bg-elevated);
        border-bottom: 1px solid var(--border-subtle);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: grab;
        user-select: none;
        flex-shrink: 0;
      }
      .ui-panel-header:active { cursor: grabbing; }
      .ui-panel-title {
        font-weight: 600;
        font-size: 11px;
        letter-spacing: 0.5px;
        color: var(--text-secondary);
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 6px;
        pointer-events: none;
      }
      .ui-panel-title::before {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--border-strong);
      }
      .ui-panel:hover .ui-panel-title::before { background: var(--accent); }
      .ui-panel-tools { display: flex; align-items: center; gap: 4px; }
      
      .ui-tool-btn {
        background: transparent;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        font-size: 11px;
        line-height: 1;
        transition: all 0.15s;
      }
      .ui-tool-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
      .ui-tool-btn.active { color: var(--accent); }

      .ui-panel-body {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: auto;
        max-height: 75vh;
      }
      .ui-panel.docked .ui-panel-body { max-height: none; }

      .ui-snap-guide {
        position: fixed;
        pointer-events: none;
        z-index: 99998;
        border: 1.5px dashed var(--accent);
        border-radius: 6px;
        background: var(--accent-dim);
        display: none;
      }

      .ui-viewport {
        flex: 1;
        background: var(--bg-base);
        background-image: radial-gradient(circle at center, #1c1c1c 0%, #101010 100%);
        display: flex;
        flex-direction: column;
        position: relative;
        overflow-y: auto;
        padding: 16px;
      }
      .ui-viewport-text {
        color: var(--text-muted);
        font-size: 13px;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-weight: 500;
        margin: auto;
      }

      .ui-splitter {
        width: 5px;
        cursor: col-resize;
        background: transparent;
        transition: background 0.2s ease;
        z-index: 50;
        flex-shrink: 0;
      }
      .ui-splitter:hover, .ui-splitter.resizing { background: var(--accent); }

      .ui-control-group {
        padding: 10px 0;
        border-bottom: 1px solid var(--border-subtle);
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .ui-control-group:last-child { border-bottom: none; }
      .ui-group-title {
        font-size: 11px;
        color: var(--text-secondary);
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 2px;
      }
      .ui-group-title svg { width: 13px; height: 13px; opacity: 0.6; }

      .ui-slider-container { display: flex; flex-direction: column; gap: 6px; width: 100%; }
      .ui-slider-header { display: flex; justify-content: space-between; align-items: center; }
      .ui-slider-label { color: var(--text-secondary); font-size: 11px; }
      .ui-slider-value {
        background: var(--bg-input);
        color: var(--text-primary);
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-family: var(--font-mono);
        border: 1px solid var(--border-subtle);
      }
      input[type="range"].premium-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 4px;
        background: var(--border-strong);
        border-radius: 2px;
        outline: none;
        cursor: pointer;
        margin: 4px 0;
      }
      input[type="range"].premium-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #fff;
        border: 2px solid var(--bg-panel);
        box-shadow: 0 1px 4px rgba(0,0,0,0.5);
        cursor: pointer;
        transition: transform 0.1s;
      }
      input[type="range"].premium-slider::-webkit-slider-thumb:hover {
        transform: scale(1.15);
        background: var(--accent);
      }
      input[type="range"].premium-slider::-moz-range-thumb {
        width: 14px; height: 14px; border-radius: 50%;
        background: #fff; border: 2px solid var(--bg-panel); cursor: pointer;
      }

      .toggle-container { display: flex; justify-content: space-between; align-items: center; width: 100%; }
      .toggle-label { color: var(--text-secondary); font-size: 11px; }
      .premium-toggle {
        position: relative; display: inline-block; width: 32px; height: 18px; flex-shrink: 0;
      }
      .premium-toggle input { opacity: 0; width: 0; height: 0; }
      .toggle-track {
        position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
        background-color: var(--border-strong); transition: .25s; border-radius: 18px;
      }
      .toggle-track:before {
        position: absolute; content: ""; height: 12px; width: 12px; left: 3px; bottom: 3px;
        background-color: #888; transition: .25s; border-radius: 50%;
      }
      .premium-toggle input:checked + .toggle-track { background-color: var(--accent); }
      .premium-toggle input:checked + .toggle-track:before {
        transform: translateX(14px); background-color: #fff;
      }

      .radio-container { display: flex; flex-direction: column; gap: 10px; width: 100%; }
      .premium-radio { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
      .premium-radio input { display: none; }
      .radio-circle {
        width: 16px; height: 16px; border: 1.5px solid var(--border-strong); border-radius: 50%;
        display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0;
      }
      .radio-circle::after {
        content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--accent);
        transform: scale(0); transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .premium-radio:hover .radio-circle { border-color: var(--text-secondary); }
      .premium-radio input:checked + .radio-circle { border-color: var(--accent); }
      .premium-radio input:checked + .radio-circle::after { transform: scale(1); }
      .radio-text { color: var(--text-secondary); font-size: 11px; }
      .premium-radio input:checked ~ .radio-text { color: var(--text-primary); }

      .checkbox-container { display: flex; flex-direction: column; gap: 10px; width: 100%; }
      .premium-checkbox { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
      .premium-checkbox input { display: none; }
      .check-box {
        width: 16px; height: 16px; border: 1.5px solid var(--border-strong); border-radius: 4px;
        display: flex; align-items: center; justify-content: center; background: transparent;
        transition: all 0.2s; flex-shrink: 0;
      }
      .check-box svg {
        width: 10px; height: 10px; stroke: #fff; stroke-width: 3; fill: none;
        stroke-linecap: round; stroke-linejoin: round; transform: scale(0);
        transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .premium-checkbox:hover .check-box { border-color: var(--text-secondary); }
      .premium-checkbox input:checked + .check-box { background: var(--accent); border-color: var(--accent); }
      .premium-checkbox input:checked + .check-box svg { transform: scale(1); }
      .check-text { color: var(--text-secondary); font-size: 11px; }
      .premium-checkbox input:checked ~ .check-text { color: var(--text-primary); }

      .custom-select-container { position: relative; width: 100%; user-select: none; }
      .custom-select-trigger {
        width: 100%; background-color: var(--bg-input); color: var(--text-primary);
        border: 1px solid var(--border-strong); padding: 7px 12px; font-size: 11px;
        font-family: var(--font-main); border-radius: 4px; cursor: pointer;
        display: flex; justify-content: space-between; align-items: center;
        transition: all 0.2s ease; outline: none; text-align: left;
      }
      .custom-select-trigger:hover { background-color: var(--bg-hover); border-color: #444; }
      .custom-select-container.open .custom-select-trigger {
        background-color: var(--bg-hover); border-color: var(--accent);
        box-shadow: 0 0 0 2px var(--accent-dim);
      }
      .selected-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .arrow-icon {
        width: 12px; height: 12px; transition: transform 0.3s ease, stroke 0.2s ease;
        stroke: var(--text-secondary); flex-shrink: 0;
      }
      .custom-select-trigger:hover .arrow-icon { stroke: var(--accent-alpha); }
      .custom-select-container.open .arrow-icon { transform: rotate(180deg); stroke: var(--accent); }
      .custom-select-options {
        position: absolute; top: calc(100% + 4px); left: 0; right: 0;
        background: #1e1e1e; border: 1px solid var(--border-strong); border-radius: 4px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6); z-index: 1000; list-style: none;
        padding: 4px; margin: 0; opacity: 0; visibility: hidden; transform: translateY(-6px);
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
        max-height: 240px; overflow-y: auto;
      }
      .custom-select-container.open .custom-select-options { opacity: 1; visibility: visible; transform: translateY(0); }
      .custom-select-option {
        padding: 6px 10px; font-size: 11px; color: var(--text-secondary); border-radius: 3px;
        cursor: pointer; display: flex; justify-content: space-between; align-items: center;
        transition: background 0.15s, color 0.15s;
      }
      .custom-select-option:hover { background: var(--bg-hover); color: var(--accent-alpha); }
      .custom-select-option.selected {
        background: rgba(92, 156, 230, 0.12); color: var(--accent); font-weight: 500;
      }
      .custom-select-option.selected::after {
        content: ''; width: 8px; height: 4px; border-left: 2px solid var(--accent);
        border-bottom: 2px solid var(--accent); transform: rotate(-45deg); margin-top: -3px;
      }

      .layer-list { display: flex; flex-direction: column; gap: 3px; width: 100%; overflow-y: auto; }
      .layer-item {
        display: flex; align-items: center; padding: 6px 8px; gap: 8px; cursor: grab;
        color: var(--text-secondary); background: var(--bg-surface); border: 1px solid transparent;
        border-left: 3px solid transparent; border-radius: 4px; transition: all 0.15s;
      }
      .layer-item:hover { background: rgba(255,255,255,0.03); color: var(--text-primary); }
      .layer-item.active { background: var(--accent-dim); color: var(--text-primary); border-left-color: var(--accent); }
      .layer-item.dragging { opacity: 0.35; }
      .layer-item.drag-over { border-top: 2px solid var(--accent); }
      .layer-eye { width: 14px; height: 14px; cursor: pointer; opacity: 0.4; transition: opacity 0.15s; flex-shrink: 0; }
      .layer-eye:hover, .layer-eye.visible { opacity: 1; stroke: var(--accent); }
      .layer-icon { width: 14px; height: 14px; opacity: 0.7; flex-shrink: 0; }
      .layer-title { flex: 1; font-size: 11px; font-weight: 500; }

      .ui-grid-multi { display: grid; width: 100%; transition: all 0.2s ease; }
      .ui-grid-multi.mode-columns {
        grid-template-columns: repeat(auto-fit, minmax(var(--ui-grid-min-w, 250px), 1fr));
        grid-auto-flow: dense; justify-items: stretch; align-items: stretch;
      }
      .ui-grid-multi.mode-rows {
        grid-template-columns: none; grid-auto-flow: column;
        grid-template-rows: repeat(auto-fit, minmax(var(--ui-grid-min-h, 120px), 1fr));
        overflow-x: auto; align-items: stretch;
      }
      .ui-grid-item {
        background: var(--bg-panel); border: 1px solid var(--border-subtle); border-radius: 6px;
        overflow: hidden; display: flex; flex-direction: column;
        transition: transform 0.15s ease, border-color 0.15s ease, opacity 0.15s ease; position: relative;
      }
      .ui-grid-item.dragging { opacity: 0.35; transform: scale(0.97); }
      .ui-grid-item.drag-over { border-color: var(--accent); box-shadow: 0 0 10px var(--accent-alpha); }
      .ui-grid-item-head {
        padding: 6px 10px; background: var(--bg-elevated); border-bottom: 1px solid var(--border-subtle);
        display: flex; justify-content: space-between; align-items: center; cursor: grab; user-select: none;
      }
      .ui-grid-item-head:active { cursor: grabbing; }
      .ui-grid-item-title { font-size: 11px; font-weight: 600; color: var(--text-secondary); display: flex; align-items: center; gap: 6px; }
      .ui-grid-item-handle { font-size: 11px; opacity: 0.5; cursor: grab; }
      .ui-grid-item-body { padding: 10px; flex: 1; display: flex; flex-direction: column; gap: 8px; }

      .ui-input {
        background: var(--bg-input); border: 1px solid var(--border-strong); color: var(--text-primary);
        padding: 0 8px; border-radius: 4px; font-size: 11px; outline: none; height: 26px;
        transition: all 0.15s; width: 100%; font-family: inherit;
      }
      .ui-input:focus { border-color: var(--accent); }
      .ui-row { display: flex; flex-direction: row; align-items: center; gap: 8px; width: 100%; }
      .ui-row-align-0 { justify-content: flex-start; }
      .ui-row-align-4 { justify-content: space-between; }
      .ui-label { font-size: 11px; color: var(--text-secondary); white-space: nowrap; }

      .ui-btn-bar { display: flex; gap: 8px; width: 100%; }
      .ui-btn {
        flex: 1; padding: 6px 12px; font-size: 11px; font-weight: 500; border-radius: 4px;
        cursor: pointer; border: 1px solid transparent; font-family: var(--font-main); transition: all 0.15s;
        display: inline-flex; align-items: center; justify-content: center; gap: 4px;
      }
      .ui-btn.secondary { background: transparent; border-color: var(--border-strong); color: var(--text-secondary); }
      .ui-btn.secondary:hover { background: var(--bg-hover); color: var(--text-primary); }
      .ui-btn.primary { background: var(--accent); color: #fff; }
      .ui-btn.primary:hover { background: #6fa9ec94; }
      .ui-btn.ui-btn-danger {
        background: var(--danger-bg); border-color: var(--danger-border); color: var(--danger-text);
        padding: 3px 6px; height: 22px; flex: none;
      }
      .ui-btn.ui-btn-danger:hover { background: #3e2222; border-color: var(--danger-text); }
      .ui-btn:active { transform: scale(0.98); }

      .ui-date-picker-wrap { position: relative; width: 100%; user-select: none; font-family: var(--font-main); }
      .ui-date-trigger {
        width: 100%; height: 28px; background: var(--bg-input); border: 1px solid var(--border-strong);
        border-radius: 4px; padding: 0 8px; display: flex; align-items: center; justify-content: space-between;
        cursor: pointer; color: var(--text-primary); transition: all 0.15s; font-size: 11px;
      }
      .ui-date-trigger:hover { border-color: var(--accent); }
      .ui-date-trigger:disabled { opacity: 0.5; cursor: not-allowed; }
      .ui-date-trigger-text { display: flex; align-items: center; gap: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ui-date-icon { width: 13px; height: 13px; stroke: var(--text-secondary); flex-shrink: 0; }
      .ui-date-arrow-icon { width: 12px; height: 12px; stroke: var(--text-secondary); transition: transform 0.2s ease; flex-shrink: 0; }
      .ui-date-picker-wrap.is-open .ui-date-arrow-icon { transform: rotate(180deg); }
      .ui-calendar-dropdown {
        display: none; position: absolute; top: calc(100% + 4px); right: 0; width: 250px;
        background: var(--bg-panel); border: 1px solid var(--border-strong); border-radius: 6px;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.7); z-index: 10000; padding: 10px;
        flex-direction: column; gap: 8px;
      }
      .ui-date-picker-wrap.is-open .ui-calendar-dropdown { display: flex; }
      .ui-calendar-header { display: flex; align-items: center; justify-content: space-between; }
      .ui-calendar-nav-btn {
        background: transparent; border: none; color: var(--text-secondary); cursor: pointer;
        width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;
        border-radius: 4px; padding: 2px;
      }
      .ui-calendar-nav-btn:hover { background: var(--bg-hover); color: var(--text-primary); }
      .ui-calendar-nav-btn svg { width: 14px; height: 14px; stroke: currentColor; stroke-width: 2; fill: none; }
      .ui-calendar-month-year { font-size: 11px; font-weight: 600; color: var(--text-primary); text-transform: capitalize; }
      .ui-calendar-weekdays { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 10px; font-weight: 600; color: var(--text-muted); }
      .ui-calendar-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
      .ui-calendar-day {
        aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 11px;
        border-radius: 4px; cursor: pointer; color: var(--text-primary); transition: all 0.15s;
      }
      .ui-calendar-day:hover:not(.disabled):not(.empty) { background: var(--bg-hover); }
      .ui-calendar-day.empty { opacity: 0.25; cursor: default; pointer-events: none; }
      .ui-calendar-day.today { border: 1px solid var(--accent); }
      .ui-calendar-day.disabled { opacity: 0.25; cursor: not-allowed; }
      .ui-calendar-day.selected { background: var(--accent); color: #ffffff; font-weight: 600; }
      .ui-calendar-day.in-range { background: var(--accent-dim); color: var(--accent); border-radius: 0; }
      .ui-calendar-day.range-start { border-top-right-radius: 0; border-bottom-right-radius: 0; }
      .ui-calendar-day.range-end { border-top-left-radius: 0; border-bottom-left-radius: 0; }
      .ui-calendar-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 6px; font-size: 10px; }
      .ui-calendar-footer-info { color: var(--text-secondary); }
      .ui-calendar-btn-clear { background: transparent; border: none; color: var(--accent); cursor: pointer; font-size: 10px; padding: 2px 4px; border-radius: 2px; }
      .ui-calendar-btn-clear:hover { text-decoration: underline; }

      .ui-cp-root { user-select: none; -webkit-user-select: none; width: 100%; display: flex; flex-direction: column; box-sizing: border-box; }
      .ui-cp-wheel { position: relative; width: 200px; height: 200px; margin: 6px auto; display: flex; justify-content: center; align-items: center; touch-action: none; }
      .ui-cp-ring {
        position: absolute; width: 100%; height: 100%; border-radius: 50%;
        background: conic-gradient(hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%));
        -webkit-mask-image: radial-gradient(transparent 64%, black 65%);
        mask-image: radial-gradient(transparent 64%, black 65%); cursor: crosshair;
      }
      .ui-cp-triangle { position: absolute; width: 124px; height: 110px; cursor: crosshair; }
      .ui-cp-ring-pointer, .ui-cp-tri-pointer {
        position: absolute; border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%);
        border: 2px solid #ffffff; box-shadow: 0 0 3px rgba(0,0,0,0.8); z-index: 10; left: 0; top: 0;
      }
      .ui-cp-ring-pointer { width: 14px; height: 14px; }
      .ui-cp-tri-pointer  { width: 10px; height: 10px; }
      .ui-cp-rect-container { display: none; justify-content: center; align-items: center; gap: 10px; margin: 6px auto; width: 240px; height: 180px; touch-action: none; }
      .ui-cp-root.mode-rect .ui-cp-wheel { display: none; }
      .ui-cp-root.mode-rect .ui-cp-rect-container { display: flex; }
      .ui-cp-rect-sv {
        position: relative; width: 210px; height: 180px; border-radius: 4px; cursor: crosshair;
        border: 1px solid var(--border-strong);
        background: linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, transparent), hsl(0, 100%, 50%);
      }
      .ui-cp-rect-hue {
        position: relative; width: 20px; height: 180px; border-radius: 4px; cursor: pointer;
        border: 1px solid var(--border-strong);
        background: linear-gradient(to bottom, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%));
      }
      .ui-cp-rect-sv-pointer {
        position: absolute; width: 12px; height: 12px; border: 2px solid #ffffff; border-radius: 50%;
        box-shadow: 0 0 3px rgba(0,0,0,0.8); transform: translate(-50%, -50%); pointer-events: none; z-index: 10;
      }
      .ui-cp-rect-hue-pointer {
        position: absolute; width: 14px; height: 14px; border: 2px solid #ffffff; border-radius: 50%;
        box-shadow: 0 0 3px rgba(0,0,0,0.8); transform: translate(-50%, -50%); left: 50%; pointer-events: none; z-index: 10;
      }
      .ui-cp-sliders { display: flex; flex-direction: column; gap: 6px; width: 100%; margin-top: 4px; }
      .ui-cp-slider-row { position: relative; height: 14px; border-radius: 100px; overflow: hidden; display: flex; align-items: center; border: 1px solid var(--border-strong); }
      .ui-cp-slider-bg { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
      .ui-cp-slider { position: relative; z-index: 2; width: 100%; -webkit-appearance: none; background: transparent; height: 100%; margin: 0; cursor: pointer; }
      .ui-cp-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 8px; height: 14px; background: #fff; border: 1px solid #000; border-radius: 2px; }
      .ui-cp-preview-bar { display: flex; align-items: center; justify-content: space-between; padding: 4px 0; border-top: 1px solid var(--border-subtle); margin-top: 4px; }
      .ui-cp-preview { width: 22px; height: 22px; border-radius: 4px; border: 1px solid var(--border-strong); }
      .ui-cp-statsrgba { position: relative; display: flex; flex-direction: column; justify-content: flex-start; font-family: var(--font-mono); font-size: 10px; color: var(--text-dim); line-height: 1.25; }
      .ui-cp-stats { font-family: var(--font-mono); font-size: 10px; line-height: 1.35; display: flex; gap: 6px; color: var(--text-muted); }
      .ui-cp-stats .k { color: var(--text-dim); }
      .ui-cp-stats .v { color: #a8d5a8; }
      .ui-cp-stats .s { color: #e0b96c; }
      .ui-cp-stats-sel { border-left: 1px solid var(--border-subtle); padding-left: 6px; }
      .ui-cp-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 9999999; display: flex; align-items: center; justify-content: center; padding: 15px; }
      .ui-cp-modal { background: var(--bg-panel); border: 1px solid var(--border-strong); border-radius: 8px; width: 440px; max-width: 95vw; max-height: 85vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8); font-size: 12px; }
      .ui-cp-modal-head { height: 34px; background: var(--bg-elevated); border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; padding: 0 12px; }
      .ui-cp-modal-body { padding: 12px; display: flex; flex-direction: column; gap: 6px; overflow-y: auto; max-height: 380px; background: var(--bg-list); }
      .ui-cp-palette-row { display: grid; grid-template-columns: 80px 80px 1fr 30px; gap: 8px; align-items: center; }
      .ui-cp-swatch { height: 22px; border-radius: 4px; border: 1px solid var(--border-strong); cursor: pointer; }

      .ui-table-container { width: 100%; display: flex; flex-direction: column; gap: 6px; background: var(--bg-panel); border: 1px solid var(--border-subtle); border-radius: 6px; overflow: hidden; }
      .ui-table-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 6px 8px; background: var(--bg-elevated); border-bottom: 1px solid var(--border-subtle); }
      .ui-table-search { flex: 1; min-width: 100px; height: 24px; font-size: 11px; }
      .ui-table-scroll { width: 100%; overflow-x: auto; }
      .ui-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 11px; }
      .ui-table th { background: var(--bg-elevated); color: var(--text-secondary); font-weight: 600; padding: 6px 8px; border-bottom: 1px solid var(--border-strong); white-space: nowrap; cursor: grab; user-select: none; }
      .ui-table th.drag-over { background: var(--bg-hover); border-left: 2px solid var(--accent); }
      .ui-table td { padding: 6px 8px; border-bottom: 1px solid var(--border-subtle); color: var(--text-primary); white-space: nowrap; vertical-align: middle; }
      .ui-table tr:hover td { background: var(--bg-hover); }
      .ui-table-actions-cell { display: flex; align-items: center; gap: 4px; justify-content: flex-end; }
      .ui-table-footer { display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; background: var(--bg-elevated); border-top: 1px solid var(--border-subtle); font-size: 10px; color: var(--text-muted); }
      .ui-table-pagination { display: flex; align-items: center; gap: 4px; margin-left: auto; }
      .ui-table-pagination .ui-btn { height: 22px; padding: 0 6px; font-size: 10px; flex: none; }
      .ui-table-cards { display: none; flex-direction: column; gap: 6px; padding: 6px; }
      .ui-table-card { background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 6px 8px; display: flex; flex-direction: column; gap: 4px; }
      .ui-table-card-row { display: flex; justify-content: space-between; align-items: center; font-size: 10px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 2px; }
      .ui-table-card-label { color: var(--text-muted); font-weight: 600; }
      .ui-table-card-val { color: var(--text-primary); }

      @media (max-width: 600px) {
        .ui-table-scroll { display: none; }
        .ui-table-cards { display: flex; }
      }
    `;
    this._styleElement.textContent = cssVars + baseCSS;
  }
}

class UIBaseComponent {
  constructor({ id = null } = {}, type = 'component') {
    this.id = id || `ui_${type}_${Math.random().toString(36).substr(2, 9)}`;
    this.type = type;
    this.element = null;
  }

  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

class UIButton extends UIBaseComponent {
  constructor({ text = '', variant = 'secondary', disabled = false, onClick = null } = {}) {
    super({}, 'button');
    this.text = text;
    this.variant = variant;
    this.disabled = disabled;
    this.onClick = onClick;
    this.buildUI();
  }

  buildUI() {
    this.element = document.createElement('button');
    this.element.type = 'button';
    this.element.className = `ui-btn ${this.variant}`;
    this.element.textContent = this.text;
    this.element.disabled = this.disabled;
    this.element.addEventListener('click', (e) => {
      if (this.onClick) this.onClick({ sender: this, event: e });
    });
  }

  setText(val) {
    this.text = val;
    this.element.textContent = val;
    return this;
  }

  setDisabled(state) {
    this.disabled = !!state;
    this.element.disabled = this.disabled;
    return this;
  }
}

class UITopBar extends UIBaseComponent {
  constructor({ items = ['Archivo', 'Editar', 'Acción', 'Ajustes', 'Ayuda'], onSelect = null } = {}) {
    super({}, 'topbar');
    this.items = items;
    this.onSelect = onSelect;
    this.buildUI();
  }

  buildUI() {
    this.element = document.createElement('div');
    this.element.className = 'ui-top-bar';
    this.items.forEach(name => {
      const sp = document.createElement('span');
      sp.className = 'ui-top-bar-item';
      sp.textContent = name;
      sp.addEventListener('click', (e) => {
        if (this.onSelect) this.onSelect({ item: name, event: e, sender: this });
      });
      this.element.appendChild(sp);
    });
  }
}

class UISplitter extends UIBaseComponent {
  constructor({ targetElement, side = 'right', minWidth = 160, maxWidth = 600, onResize = null, onResizeEnd = null } = {}) {
    super({}, 'splitter');
    this.targetElement = targetElement;
    this.side = side;
    this.minWidth = minWidth;
    this.maxWidth = maxWidth;
    this.onResize = onResize;
    this.onResizeEnd = onResizeEnd;
    this._isDragging = false;
    this.buildUI();
  }

  buildUI() {
    this.element = document.createElement('div');
    this.element.className = 'ui-splitter';

    const onMouseMove = (e) => {
      if (!this._isDragging) return;
      const targetDom = this.targetElement instanceof HTMLElement ? this.targetElement : this.targetElement?.element;
      if (!targetDom) return;

      const rect = targetDom.getBoundingClientRect();
      let newWidth = this.side === 'left' ? e.clientX - rect.left : rect.right - e.clientX;
      newWidth = Math.max(this.minWidth, Math.min(this.maxWidth, newWidth));
      targetDom.style.width = `${newWidth}px`;
      if (this.onResize) this.onResize({ width: newWidth, sender: this });
    };

    const onMouseUp = () => {
      if (!this._isDragging) return;
      this._isDragging = false;
      this.element.classList.remove('resizing');
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (this.onResizeEnd) this.onResizeEnd({ sender: this });
    };

    this.element.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this._isDragging = true;
      this.element.classList.add('resizing');
      document.body.style.cursor = 'col-resize';
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }
}

class UISlider extends UIBaseComponent {
  constructor({ label = 'Slider', min = 0, max = 100, step = 1, value = 50, onChange = null, onInput = null } = {}) {
    super({}, 'slider');
    this.label = label;
    this.value = value;
    this.onChange = onChange;
    this.onInput = onInput;

    this.element = document.createElement('div');
    this.element.className = 'ui-slider-container';
    this.element.innerHTML = `
      <div class="ui-slider-header">
        <span class="ui-slider-label">${this.label}</span>
        <span class="ui-slider-value">${this.value}</span>
      </div>
      <input type="range" class="premium-slider" min="${min}" max="${max}" step="${step}" value="${this.value}">
    `;

    this.input = this.element.querySelector('input');
    this.valDisplay = this.element.querySelector('.ui-slider-value');

    this.input.addEventListener('input', (e) => {
      this.value = parseFloat(e.target.value);
      this.valDisplay.textContent = this.value;
      if (this.onInput) this.onInput({ value: this.value, sender: this, event: e });
    });

    this.input.addEventListener('change', (e) => {
      if (this.onChange) this.onChange({ value: this.value, sender: this, event: e });
    });
  }

  setValue(val) {
    this.value = val;
    this.input.value = val;
    this.valDisplay.textContent = val;
    return this;
  }

  getValue() { return this.value; }
}

class UIToggle extends UIBaseComponent {
  constructor({ label = 'Interruptor', checked = false, onChange = null } = {}) {
    super({}, 'toggle');
    this.label = label;
    this.checked = checked;
    this.onChange = onChange;

    this.element = document.createElement('div');
    this.element.className = 'toggle-container';
    this.element.innerHTML = `
      <span class="toggle-label">${this.label}</span>
      <label class="premium-toggle">
        <input type="checkbox" ${this.checked ? 'checked' : ''}>
        <span class="toggle-track"></span>
      </label>
    `;

    this.input = this.element.querySelector('input');
    this.input.addEventListener('change', (e) => {
      this.checked = this.input.checked;
      if (this.onChange) this.onChange({ checked: this.checked, sender: this, event: e });
    });
  }

  setChecked(val) {
    this.checked = !!val;
    this.input.checked = this.checked;
    return this;
  }

  getValue() { return this.checked; }
}

class UIRadioGroup extends UIBaseComponent {
  constructor({ name = 'radio_' + Math.random().toString(36).substr(2, 6), options = [], value = null, onChange = null } = {}) {
    super({}, 'radiogroup');
    this.name = name;
    this.options = options;
    this.value = value || (options[0] ? options[0].value : null);
    this.onChange = onChange;

    this.element = document.createElement('div');
    this.element.className = 'radio-container';
    this.render();
  }

  render() {
    this.element.innerHTML = '';
    this.options.forEach(opt => {
      const isChecked = opt.value === this.value;
      const label = document.createElement('label');
      label.className = 'premium-radio';
      label.innerHTML = `
        <input type="radio" name="${this.name}" value="${opt.value}" ${isChecked ? 'checked' : ''}>
        <span class="radio-circle"></span>
        <span class="radio-text">${opt.label}</span>
      `;
      const inp = label.querySelector('input');
      inp.addEventListener('change', (e) => {
        if (inp.checked) {
          this.value = opt.value;
          if (this.onChange) this.onChange({ value: this.value, option: opt, sender: this, event: e });
        }
      });
      this.element.appendChild(label);
    });
  }

  setValue(val) {
    this.value = val;
    this.element.querySelectorAll('input').forEach(inp => {
      inp.checked = (inp.value === String(val));
    });
    return this;
  }

  getValue() { return this.value; }
}

class UICheckbox extends UIBaseComponent {
  constructor({ label = '', checked = false, onChange = null } = {}) {
    super({}, 'checkbox');
    this.label = label;
    this.checked = checked;
    this.onChange = onChange;

    this.element = document.createElement('label');
    this.element.className = 'premium-checkbox';
    this.element.innerHTML = `
      <input type="checkbox" ${this.checked ? 'checked' : ''}>
      <span class="check-box"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
      <span class="check-text">${this.label}</span>
    `;

    this.input = this.element.querySelector('input');
    this.input.addEventListener('change', (e) => {
      this.checked = this.input.checked;
      if (this.onChange) this.onChange({ checked: this.checked, sender: this, event: e });
    });
  }

  setChecked(val) {
    this.checked = !!val;
    this.input.checked = this.checked;
    return this;
  }

  getValue() { return this.checked; }
}

class UICustomSelect extends UIBaseComponent {
  constructor({ label = '', options = [], value = null, onChange = null, onOpen = null, onClose = null } = {}) {
    super({}, 'customselect');
    this.label = label;
    this.options = options;
    this.value = value || (options[0] ? options[0].value : null);
    this.onChange = onChange;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.isOpen = false;
    this.buildUI();
  }

  buildUI() {
    this.element = document.createElement('div');
    this.element.className = 'ui-slider-container';

    if (this.label) {
      const lbl = document.createElement('span');
      lbl.className = 'ui-slider-label';
      lbl.textContent = this.label;
      this.element.appendChild(lbl);
    }

    const wrap = document.createElement('div');
    wrap.className = 'custom-select-container';

    const selectedOpt = this.options.find(o => o.value === this.value) || this.options[0];
    wrap.innerHTML = `
      <button type="button" class="custom-select-trigger">
        <span class="selected-text">${selectedOpt ? selectedOpt.label : ''}</span>
        <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <ul class="custom-select-options"></ul>
    `;

    this.trigger = wrap.querySelector('.custom-select-trigger');
    this.textEl = wrap.querySelector('.selected-text');
    this.optionsList = wrap.querySelector('.custom-select-options');
    this.wrap = wrap;

    this.options.forEach(opt => {
      const li = document.createElement('li');
      li.className = `custom-select-option ${opt.value === this.value ? 'selected' : ''}`;
      li.textContent = opt.label;
      li.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setValue(opt.value);
        this.close();
      });
      this.optionsList.appendChild(li);
    });

    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.isOpen ? this.close() : this.open();
    });

    this._onDocClick = (e) => {
      if (!this.wrap.contains(e.target)) this.close();
    };
    document.addEventListener('click', this._onDocClick);

    this.element.appendChild(wrap);
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.wrap.classList.add('open');
    if (this.onOpen) this.onOpen({ sender: this });
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.wrap.classList.remove('open');
    if (this.onClose) this.onClose({ sender: this });
  }

  setValue(val) {
    this.value = val;
    const opt = this.options.find(o => o.value === val);
    if (opt) {
      this.textEl.textContent = opt.label;
      Array.from(this.optionsList.children).forEach((li, idx) => {
        li.classList.toggle('selected', this.options[idx].value === val);
      });
      if (this.onChange) this.onChange({ value: this.value, option: opt, sender: this });
    }
    return this;
  }

  getValue() { return this.value; }

  destroy() {
    document.removeEventListener('click', this._onDocClick);
    super.destroy();
  }
}

class UILayerList extends UIBaseComponent {
  constructor({ layers = [], activeIndex = 0, onChange = null, onSelect = null } = {}) {
    super({}, 'layerlist');
    this.layers = layers;
    this.activeIndex = activeIndex;
    this.onChange = onChange;
    this.onSelect = onSelect;
    this._draggedItem = null;
    this.element = document.createElement('div');
    this.element.className = 'layer-list';
    this.render();
  }

  render() {
    this.element.innerHTML = '';
    this.layers.forEach((layer, idx) => {
      const item = document.createElement('div');
      item.className = `layer-item ${idx === this.activeIndex ? 'active' : ''}`;
      item.draggable = true;

      const eye = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      eye.setAttribute('class', `layer-eye ${layer.visible !== false ? 'visible' : ''}`);
      eye.setAttribute('viewBox', '0 0 24 24');
      eye.setAttribute('fill', 'none');
      eye.setAttribute('stroke', 'currentColor');
      eye.setAttribute('stroke-width', '2');
      eye.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;

      eye.addEventListener('click', (e) => {
        e.stopPropagation();
        layer.visible = !(layer.visible !== false);
        eye.classList.toggle('visible', layer.visible);
        if (this.onChange) this.onChange({ action: 'toggleVisibility', layer, index: idx, sender: this });
      });

      const icon = document.createElement('div');
      icon.innerHTML = layer.iconSvg || `<svg class="layer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;

      const title = document.createElement('span');
      title.className = 'layer-title';
      title.textContent = layer.name;

      item.appendChild(eye);
      item.appendChild(icon.firstElementChild);
      item.appendChild(title);

      item.addEventListener('click', (e) => {
        this.activeIndex = idx;
        this.element.querySelectorAll('.layer-item').forEach((el, i) => el.classList.toggle('active', i === idx));
        if (this.onSelect) this.onSelect({ layer, index: idx, sender: this, event: e });
      });

      item.addEventListener('dragstart', (e) => {
        this._draggedItem = item;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (this._draggedItem && this._draggedItem !== item) item.classList.add('drag-over');
      });
      item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        this.element.querySelectorAll('.layer-item').forEach(el => el.classList.remove('drag-over'));
      });
      item.addEventListener('drop', (e) => {
        e.preventDefault();
        item.classList.remove('drag-over');
        if (this._draggedItem && this._draggedItem !== item) {
          const all = Array.from(this.element.children);
          const from = all.indexOf(this._draggedItem);
          const to = all.indexOf(item);
          const moved = this.layers.splice(from, 1)[0];
          this.layers.splice(to, 0, moved);
          this.activeIndex = to;
          this.render();
          if (this.onChange) this.onChange({ action: 'reorder', from, to, layers: this.layers, sender: this });
        }
      });

      this.element.appendChild(item);
    });
  }
}

class UIControlGroup extends UIBaseComponent {
  constructor({ title = '', iconSvg = '' } = {}) {
    super({}, 'controlgroup');
    this.title = title;
    this.iconSvg = iconSvg;
    this.element = document.createElement('div');
    this.element.className = 'ui-control-group';

    if (title) {
      const t = document.createElement('div');
      t.className = 'ui-group-title';
      t.innerHTML = `${iconSvg} <span>${title}</span>`;
      this.element.appendChild(t);
    }
  }

  append(child) {
    if (child instanceof HTMLElement) {
      this.element.appendChild(child);
    } else if (child && child.element instanceof HTMLElement) {
      this.element.appendChild(child.element);
    }
    return this;
  }
}

class UIViewport extends UIBaseComponent {
  constructor({ text = 'Visor 3D', onClick = null } = {}) {
    super({}, 'viewport');
    this.element = document.createElement('div');
    this.element.className = 'ui-viewport';
    this.element.innerHTML = `<div class="ui-viewport-text">${text}</div>`;
    if (onClick) {
      this.element.addEventListener('click', (e) => onClick({ sender: this, event: e }));
    }
  }

  setText(val) {
    const el = this.element.querySelector('.ui-viewport-text');
    if (el) el.textContent = val;
    return this;
  }
}

const UI_MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

class UIDatePicker extends UIBaseComponent {
  constructor({
    id = null,
    value = null,
    placeholder = 'Seleccionar fecha...',
    minDate = null,
    maxDate = null,
    onChange = null,
    onOpen = null,
    onClose = null
  } = {}) {
    super({ id }, 'datepicker');

    this.onChange = onChange;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.placeholder = placeholder;
    this.minDate = minDate ? new Date(minDate) : null;
    this.maxDate = maxDate ? new Date(maxDate) : null;
    this.disabled = false;
    this.isOpen = false;

    const now = new Date();
    this.currentMonth = now.getMonth();
    this.currentYear = now.getFullYear();
    this.selectedDate = value ? new Date(value) : null;

    if (this.selectedDate && !isNaN(this.selectedDate.getTime())) {
      this.currentMonth = this.selectedDate.getMonth();
      this.currentYear = this.selectedDate.getFullYear();
    } else {
      this.selectedDate = null;
    }

    this.buildUI();
    this.bindEvents();
    this.updateDisplay();
  }

  buildUI() {
    this.element = document.createElement('div');
    this.element.className = 'ui-date-picker-wrap';
    this.element.innerHTML = `
      <button type="button" class="ui-date-trigger">
        <div class="ui-date-trigger-text">
          <svg class="ui-date-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span class="ui-date-display">${this.placeholder}</span>
        </div>
        <svg class="ui-date-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <span class="ui-calendar-footer-info">Selecciona un día</span>
          <button class="ui-calendar-btn-clear">Limpiar</button>
        </div>
      </div>
    `;

    this.trigger = this.element.querySelector('.ui-date-trigger');
    this.display = this.element.querySelector('.ui-date-display');
    this.monthYearEl = this.element.querySelector('.ui-calendar-month-year');
    this.daysEl = this.element.querySelector('.ui-calendar-days');
    this.footerInfo = this.element.querySelector('.ui-calendar-footer-info');
    this.btnClear = this.element.querySelector('.ui-calendar-btn-clear');
    this.btnPrev = this.element.querySelector('.btn-prev');
    this.btnNext = this.element.querySelector('.btn-next');
  }

  bindEvents() {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!this.disabled) this.toggle();
    });

    this.btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      this.changeMonth(-1);
    });

    this.btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      this.changeMonth(1);
    });

    this.btnClear.addEventListener('click', (e) => {
      e.stopPropagation();
      this.clear();
    });

    this.onDocClick = (e) => {
      if (!this.element.contains(e.target)) this.close();
    };
    this.onDocKey = (e) => {
      if (e.key === 'Escape') this.close();
    };

    document.addEventListener('click', this.onDocClick);
    document.addEventListener('keydown', this.onDocKey);
  }

  toggle() { this.isOpen ? this.close() : this.open(); }

  open() {
    if (this.disabled || this.isOpen) return;
    this.isOpen = true;
    this.element.classList.add('is-open');
    this.renderCalendar();
    if (this.onOpen) this.onOpen({ sender: this });
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.element.classList.remove('is-open');
    if (this.onClose) this.onClose({ sender: this });
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

  updateDisplay() {
    if (this.selectedDate) {
      this.display.textContent = this.formatDate(this.selectedDate);
      this.footerInfo.textContent = 'Fecha seleccionada';
    } else {
      this.display.textContent = this.placeholder;
      this.footerInfo.textContent = 'Selecciona un día';
    }
  }

  isDateDisabled(date) {
    const time = date.getTime();
    if (this.minDate && time < new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate()).getTime()) return true;
    if (this.maxDate && time > new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate()).getTime()) return true;
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

    const today = new Date();
    const isTodayMonth = today.getFullYear() === this.currentYear && today.getMonth() === this.currentMonth;

    for (let d = 1; d <= daysInMonth; d++) {
      const thisDate = new Date(this.currentYear, this.currentMonth, d);
      const day = document.createElement('div');
      day.className = 'ui-calendar-day';
      day.textContent = d;

      if (isTodayMonth && d === today.getDate()) day.classList.add('today');

      if (this.isDateDisabled(thisDate)) {
        day.classList.add('disabled');
      } else {
        if (this.selectedDate &&
            this.selectedDate.getFullYear() === this.currentYear &&
            this.selectedDate.getMonth() === this.currentMonth &&
            this.selectedDate.getDate() === d) {
          day.classList.add('selected');
        }
        day.addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectDate(thisDate);
        });
      }

      this.daysEl.appendChild(day);
    }
  }

  selectDate(date) {
    this.selectedDate = new Date(date);
    this.updateDisplay();
    this.close();
    if (this.onChange) this.onChange({ value: this.getValue(), sender: this });
  }

  clear() {
    this.selectedDate = null;
    this.updateDisplay();
    this.renderCalendar();
    if (this.onChange) this.onChange({ value: null, sender: this });
  }

  getValue() {
    return this.selectedDate ? new Date(this.selectedDate) : null;
  }

  setValue(val) {
    if (!val) {
      this.clear();
      return this;
    }
    this.selectedDate = new Date(val);
    if (!isNaN(this.selectedDate.getTime())) {
      this.currentMonth = this.selectedDate.getMonth();
      this.currentYear = this.selectedDate.getFullYear();
      this.updateDisplay();
      if (this.isOpen) this.renderCalendar();
    }
    return this;
  }

  setDisabled(v) {
    this.disabled = !!v;
    this.trigger.disabled = this.disabled;
    if (this.disabled) this.close();
    return this;
  }

  destroy() {
    document.removeEventListener('click', this.onDocClick);
    document.removeEventListener('keydown', this.onDocKey);
    super.destroy();
  }
}

class UIDateRangePicker extends UIBaseComponent {
  constructor({
    id = null,
    startDate = null,
    endDate = null,
    placeholder = 'Seleccionar rango...',
    minDate = null,
    maxDate = null,
    onChange = null,
    onOpen = null,
    onClose = null
  } = {}) {
    super({ id }, 'daterangepicker');

    this.onChange = onChange;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.placeholder = placeholder;
    this.minDate = minDate ? new Date(minDate) : null;
    this.maxDate = maxDate ? new Date(maxDate) : null;
    this.disabled = false;
    this.isOpen = false;

    const now = new Date();
    this.currentMonth = now.getMonth();
    this.currentYear = now.getFullYear();

    this.startDate = startDate ? new Date(startDate) : null;
    this.endDate = endDate ? new Date(endDate) : null;

    if (this.startDate && !isNaN(this.startDate.getTime())) {
      this.currentMonth = this.startDate.getMonth();
      this.currentYear = this.startDate.getFullYear();
    }

    this.buildUI();
    this.bindEvents();
    this.updateDisplay();
  }

  buildUI() {
    this.element = document.createElement('div');
    this.element.className = 'ui-date-picker-wrap';
    this.element.innerHTML = `
      <button type="button" class="ui-date-trigger">
        <div class="ui-date-trigger-text">
          <svg class="ui-date-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span class="ui-date-display">${this.placeholder}</span>
        </div>
        <svg class="ui-date-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
          <span class="ui-calendar-footer-info">Haz clic para seleccionar</span>
          <button class="ui-calendar-btn-clear">Limpiar</button>
        </div>
      </div>
    `;

    this.trigger = this.element.querySelector('.ui-date-trigger');
    this.display = this.element.querySelector('.ui-date-display');
    this.monthYearEl = this.element.querySelector('.ui-calendar-month-year');
    this.daysEl = this.element.querySelector('.ui-calendar-days');
    this.footerInfo = this.element.querySelector('.ui-calendar-footer-info');
    this.btnClear = this.element.querySelector('.ui-calendar-btn-clear');
    this.btnPrev = this.element.querySelector('.btn-prev');
    this.btnNext = this.element.querySelector('.btn-next');
  }

  bindEvents() {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!this.disabled) this.toggle();
    });

    this.btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      this.changeMonth(-1);
    });

    this.btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      this.changeMonth(1);
    });

    this.btnClear.addEventListener('click', (e) => {
      e.stopPropagation();
      this.clear();
    });

    this.onDocClick = (e) => {
      if (!this.element.contains(e.target)) this.close();
    };
    this.onDocKey = (e) => {
      if (e.key === 'Escape') this.close();
    };

    document.addEventListener('click', this.onDocClick);
    document.addEventListener('keydown', this.onDocKey);
  }

  toggle() { this.isOpen ? this.close() : this.open(); }

  open() {
    if (this.disabled || this.isOpen) return;
    this.isOpen = true;
    this.element.classList.add('is-open');
    this.renderCalendar();
    if (this.onOpen) this.onOpen({ sender: this });
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.element.classList.remove('is-open');
    if (this.onClose) this.onClose({ sender: this });
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

  updateDisplay() {
    if (this.startDate && this.endDate) {
      this.display.textContent = `${this.formatDate(this.startDate)} → ${this.formatDate(this.endDate)}`;
      const diff = Math.ceil(Math.abs(this.endDate - this.startDate) / (1000 * 60 * 60 * 24)) + 1;
      this.footerInfo.textContent = `${diff} día${diff > 1 ? 's' : ''} seleccionado${diff > 1 ? 's' : ''}`;
    } else if (this.startDate) {
      this.display.textContent = `${this.formatDate(this.startDate)} → ...`;
      this.footerInfo.textContent = 'Selecciona la fecha fin';
    } else {
      this.display.textContent = this.placeholder;
      this.footerInfo.textContent = 'Haz clic para seleccionar';
    }
  }

  isDateDisabled(date) {
    const time = date.getTime();
    if (this.minDate && time < new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate()).getTime()) return true;
    if (this.maxDate && time > new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate()).getTime()) return true;
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

    const today = new Date();
    const todayTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    const sTime = this.startDate ? new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate()).getTime() : null;
    const eTime = this.endDate ? new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()).getTime() : null;

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

      this.daysEl.appendChild(day);
    }
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

    if (this.startDate && this.endDate && this.onChange) {
      this.onChange({ value: this.getValue(), sender: this });
    }
  }

  clear() {
    this.startDate = null;
    this.endDate = null;
    this.updateDisplay();
    this.renderCalendar();
    if (this.onChange) this.onChange({ value: this.getValue(), sender: this });
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
    this.startDate = val.start ? new Date(val.start) : null;
    this.endDate = val.end ? new Date(val.end) : null;
    if (this.startDate && !isNaN(this.startDate.getTime())) {
      this.currentMonth = this.startDate.getMonth();
      this.currentYear = this.startDate.getFullYear();
    }
    this.updateDisplay();
    if (this.isOpen) this.renderCalendar();
    return this;
  }

  destroy() {
    document.removeEventListener('click', this.onDocClick);
    document.removeEventListener('keydown', this.onDocKey);
    super.destroy();
  }
}

class UIGrid extends UIBaseComponent {
  constructor(options = {}) {
    super(options, 'grid');
    this.mode = options.mode || 'columns';
    this.minItemWidth = options.minItemWidth || 250;
    this.minItemHeight = options.minItemHeight || 140;
    this.gap = options.gap || 12;
    this.draggable = options.draggable !== false;
    this.onReorder = options.onReorder || null;
    this.items = [];
    this._draggedItem = null;

    this.element = document.createElement('div');
    this.element.className = `ui-grid-multi mode-${this.mode}`;
    this.element.style.gap = `${this.gap}px`;
    this.element.style.setProperty('--ui-grid-min-w', `${this.minItemWidth}px`);
    this.element.style.setProperty('--ui-grid-min-h', `${this.minItemHeight}px`);
  }

  setMode(mode) {
    this.mode = mode === 'rows' ? 'rows' : 'columns';
    this.element.className = `ui-grid-multi mode-${this.mode}`;
    return this;
  }

  addItem(content, options = {}) {
    const title = options.title || `Item ${this.items.length + 1}`;
    const colSpan = options.colSpan || 1;
    const rowSpan = options.rowSpan || 1;

    const itemEl = document.createElement('div');
    itemEl.className = 'ui-grid-item';
    if (colSpan > 1) itemEl.style.gridColumn = `span ${colSpan}`;
    if (rowSpan > 1) itemEl.style.gridRow = `span ${rowSpan}`;

    const head = document.createElement('div');
    head.className = 'ui-grid-item-head';

    const titleEl = document.createElement('span');
    titleEl.className = 'ui-grid-item-title';
    titleEl.textContent = title;

    const handle = document.createElement('span');
    handle.className = 'ui-grid-item-handle';
    handle.textContent = '⠿';

    head.appendChild(titleEl);
    head.appendChild(handle);

    const body = document.createElement('div');
    body.className = 'ui-grid-item-body';

    if (content instanceof HTMLElement) {
      body.appendChild(content);
    } else if (content && content.element instanceof HTMLElement) {
      body.appendChild(content.element);
    }

    itemEl.appendChild(head);
    itemEl.appendChild(body);

    if (this.draggable) {
      this._attachDragEvents(itemEl);
    }

    this.element.appendChild(itemEl);
    const itemData = { itemEl, content, options };
    this.items.push(itemData);
    return itemEl;
  }

  _attachDragEvents(itemEl) {
    itemEl.setAttribute('draggable', 'true');

    itemEl.addEventListener('dragstart', (e) => {
      this._draggedItem = itemEl;
      itemEl.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    itemEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (this._draggedItem && this._draggedItem !== itemEl) {
        itemEl.classList.add('drag-over');
      }
    });

    itemEl.addEventListener('dragleave', () => itemEl.classList.remove('drag-over'));

    itemEl.addEventListener('dragend', () => {
      itemEl.classList.remove('dragging');
      this.element.querySelectorAll('.ui-grid-item').forEach(c => c.classList.remove('drag-over'));
      this._draggedItem = null;
    });

    itemEl.addEventListener('drop', (e) => {
      e.preventDefault();
      itemEl.classList.remove('drag-over');
      if (this._draggedItem && this._draggedItem !== itemEl) {
        const all = Array.from(this.element.children);
        const fromIdx = all.indexOf(this._draggedItem);
        const toIdx = all.indexOf(itemEl);

        if (fromIdx < toIdx) {
          this.element.insertBefore(this._draggedItem, itemEl.nextSibling);
        } else {
          this.element.insertBefore(this._draggedItem, itemEl);
        }

        const moved = this.items.splice(fromIdx, 1)[0];
        this.items.splice(toIdx, 0, moved);

        if (this.onReorder) {
          this.onReorder({ fromIndex: fromIdx, toIndex: toIdx, items: this.items, sender: this });
        }
      }
    });
  }
}

class UITable extends UIBaseComponent {
  constructor({
    columns = [],
    data = [],
    endpoint = null,
    pageSize = 5,
    onRowDelete = null,
    onRowClick = null,
    onColumnReorder = null,
    onSearch = null
  } = {}) {
    super({}, 'table');
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
    this.onColumnReorder = onColumnReorder;
    this.onSearch = onSearch;

    this.element = document.createElement('div');
    this.element.className = 'ui-table-container';

    this.element.innerHTML = `
      <div class="ui-table-toolbar">
        <input type="text" class="ui-input ui-table-search" placeholder="Buscar...">
        <button class="ui-btn secondary btn-refresh" style="flex:none; padding: 4px 8px; height:24px;">↻</button>
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
          <button class="ui-btn secondary btn-prev">◀</button>
          <span class="page-label"></span>
          <button class="ui-btn secondary btn-next">▶</button>
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

  bindEvents() {
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.currentPage = 1;
      this.applyFilter();
      if (this.onSearch) this.onSearch({ query: this.searchQuery, sender: this });
    });

    this.btnRefresh.addEventListener('click', () => {
      if (this.endpoint) this.fetchData(); else this.render();
    });

    this.btnPrev.addEventListener('click', () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.render();
      }
    });

    this.btnNext.addEventListener('click', () => {
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
      console.error(err);
    } finally {
      this.btnRefresh.disabled = false;
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
    this.render();
  }

  deleteRow(item, index) {
    const originalIdx = this.data.indexOf(item);
    if (originalIdx !== -1) {
      this.data.splice(originalIdx, 1);
    }
    if (this.onRowDelete) {
      this.onRowDelete({ item, index: originalIdx, sender: this });
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
          if (this.onColumnReorder) {
            this.onColumnReorder({ columns: this.columns, from: this.draggedColIdx, to: idx, sender: this });
          }
        }
        this.draggedColIdx = null;
      });

      this.theadTr.appendChild(th);
    });

    const thAction = document.createElement('th');
    thAction.textContent = 'Acción';
    thAction.style.textAlign = 'right';
    this.theadTr.appendChild(thAction);
  }

  render() {
    this.renderHeaders();
    this.tbody.innerHTML = '';
    this.cardsContainer.innerHTML = '';

    const totalPages = Math.max(1, Math.ceil(this.filteredData.length / this.pageSize));
    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    const pageData = this.filteredData.slice(start, end);

    this.infoSpan.textContent = `${this.filteredData.length} items`;
    this.pageLabel.textContent = `${this.currentPage}/${totalPages}`;
    this.btnPrev.disabled = this.currentPage <= 1;
    this.btnNext.disabled = this.currentPage >= totalPages;

    pageData.forEach((row, rIdx) => {
      const tr = document.createElement('tr');
      if (this.onRowClick) {
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', (e) => {
          if (!e.target.closest('button')) this.onRowClick({ row, index: start + rIdx, sender: this, event: e });
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
        this.deleteRow(row, start + rIdx);
      });
      tdActions.appendChild(delBtn);
      tr.appendChild(tdActions);
      this.tbody.appendChild(tr);

      const card = document.createElement('div');
      card.className = 'ui-table-card';
      if (this.onRowClick) {
        card.addEventListener('click', (e) => {
          if (!e.target.closest('button')) this.onRowClick({ row, index: start + rIdx, sender: this, event: e });
        });
      }

      this.columns.forEach(col => {
        const crow = document.createElement('div');
        crow.className = 'ui-table-card-row';
        crow.innerHTML = `
          <span class="ui-table-card-label">${col.label || col.key}</span>
          <span class="ui-table-card-val">${row[col.key] !== undefined ? row[col.key] : ''}</span>
        `;
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
        this.deleteRow(row, start + rIdx);
      });
      cardFooter.appendChild(cardDelBtn);
      card.appendChild(cardFooter);
      this.cardsContainer.appendChild(card);
    });
  }
}

class UIColorPicker extends UIBaseComponent {
  constructor({
    id = null,
    initialColor = null,
    canvas = null,
    onChange = null,
    onEyedropperToggle = null,
    onModeChange = null,
    onPaletteSelect = null
  } = {}) {
    super({ id }, 'colorpicker');
    this.onChange = onChange;
    this.onEyedropperToggle = onEyedropperToggle;
    this.onModeChange = onModeChange;
    this.onPaletteSelect = onPaletteSelect;

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

    this.canvasSource = canvas;
    this.currentCanvas = null;
    this.currentCtx = null;
    this.isRectMode = true;

    this.isEyedropperActive = false;
    this.isEyedropperMouseDown = false;
    this._overlayEyedropper = null;
    this._bubbleEyedropper = null;

    this.buildUI();
    this.bindEvents();

    if (canvas) this.setCanvas(canvas);

    requestAnimationFrame(() => {
      this.renderTriangle();
      this.updateUI();
    });
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
      r: Math.max(0, Math.min(255, isNaN(r) ? 56 : r)),
      g: Math.max(0, Math.min(255, isNaN(g) ? 189 : g)),
      b: Math.max(0, Math.min(255, isNaN(b) ? 248 : b)),
      a: Math.max(0, Math.min(1, isNaN(a) ? 1.0 : a))
    };
  }

  buildUI() {
    this.element = document.createElement('div');
    this.element.className = 'ui-cp-root';

    this.element.innerHTML = `
      <div class="ui-row ui-row-align-4" style="margin-bottom: 4px;">
        <label class="premium-checkbox chk-rect-mode ${this.isRectMode ? 'checked' : ''}">
          <input type="checkbox" ${this.isRectMode ? 'checked' : ''}>
          <span class="check-box"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
          <span class="check-text">Rect Mode</span>
        </label>
        <div style="display:flex; gap:6px;">
          <button class="ui-btn secondary btn-palette" style="height:22px; padding:0 8px; font-size:11px; flex:none;">Palette</button>
          <button class="ui-btn secondary btn-eyedropper" style="height:22px; padding:0 8px; font-size:11px; flex:none;">Picker</button>
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
        <span class="ui-label">COLOR:</span>
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
        <span class="ui-label" style="width:36px; padding-top:4px;">hex:</span>
        <input type="text" class="ui-input inp-hex" style="width:75px; font-family:var(--font-mono); text-align:center;" maxlength="7">
        <div class="ui-cp-stats">
          <div class="ui-cp-stats-global"></div>
          <div class="ui-cp-stats-sel"></div>
        </div>
        <div class="ui-cp-statsrgba">
          <div class="mtac"></div>
          <div class="dfrg"></div>
          <div class="dfrb"></div>
        </div>
      </div>
    `;

    if (this.isRectMode) this.element.classList.add('mode-rect');

    this.dom = {
      chkRect: this.element.querySelector('.chk-rect-mode input'),
      btnPalette: this.element.querySelector('.btn-palette'),
      btnEyedropper: this.element.querySelector('.btn-eyedropper'),
      wheel: this.element.querySelector('.ui-cp-wheel'),
      ring: this.element.querySelector('.ui-cp-ring'),
      triangle: this.element.querySelector('.ui-cp-triangle'),
      ringPointer: this.element.querySelector('.ui-cp-ring-pointer'),
      triPointer: this.element.querySelector('.ui-cp-tri-pointer'),
      rectContainer: this.element.querySelector('.ui-cp-rect-container'),
      rectSV: this.element.querySelector('.ui-cp-rect-sv'),
      rectSVPtr: this.element.querySelector('.ui-cp-rect-sv-pointer'),
      rectHue: this.element.querySelector('.ui-cp-rect-hue'),
      rectHuePtr: this.element.querySelector('.ui-cp-rect-hue-pointer'),
      sliderHue: this.element.querySelector('.slider-hue'),
      sliderSat: this.element.querySelector('.slider-sat'),
      sliderVal: this.element.querySelector('.slider-val'),
      sliderAlpha: this.element.querySelector('.slider-alpha'),
      satBg: this.element.querySelector('.slider-sat-bg'),
      valBg: this.element.querySelector('.slider-val-bg'),
      alphaBg: this.element.querySelector('.slider-alpha-bg'),
      preview: this.element.querySelector('.ui-cp-preview'),
      rgbaR: this.element.querySelector('.inp-rgba-r'),
      rgbaG: this.element.querySelector('.inp-rgba-g'),
      rgbaB: this.element.querySelector('.inp-rgba-b'),
      rgbaA: this.element.querySelector('.inp-rgba-a'),
      RGBAR: this.element.querySelector('.inp-RGBA-r'),
      RGBAG: this.element.querySelector('.inp-RGBA-g'),
      RGBAB: this.element.querySelector('.inp-RGBA-b'),
      RGBAA: this.element.querySelector('.inp-RGBA-a'),
      hex: this.element.querySelector('.inp-hex'),
      statsGlobal: this.element.querySelector('.ui-cp-stats-global'),
      statsSel: this.element.querySelector('.ui-cp-stats-sel'),
      dfrg: this.element.querySelector('.dfrg'),
      dfrb: this.element.querySelector('.dfrb'),
      rounessRgba: this.element.querySelector('.mtac')
    };

    this.triCtx = this.dom.triangle.getContext('2d', { willReadFrequently: true });
  }

  setCanvas(source) {
    this.canvasSource = source;
    this.refreshCanvasTarget();
    this.updateImageStats();
    this.updateUI();
    return this;
  }

  _resolveCanvas() {
    let src = this.canvasSource;
    if (typeof src === 'function') {
      try { src = src(); } catch (e) { return null; }
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
        } catch (e) {
          this.currentCtx = null;
        }
      } else {
        this.currentCtx = null;
      }
    }
    return this.currentCanvas;
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

  bindEvents() {
    this.dom.chkRect.addEventListener('change', () => {
      this.isRectMode = this.dom.chkRect.checked;
      this.element.classList.toggle('mode-rect', this.isRectMode);
      this.updateUI();
      if (this.onModeChange) this.onModeChange({ isRectMode: this.isRectMode, sender: this });
    });

    this.dom.sliderHue.addEventListener('input', (e) => {
      this.hue = parseFloat(e.target.value);
      this.renderTriangle();
      this.updateUI();
    });
    this.dom.sliderSat.addEventListener('input', (e) => {
      this.sat = parseFloat(e.target.value);
      this.updateUI();
    });
    this.dom.sliderVal.addEventListener('input', (e) => {
      this.val = parseFloat(e.target.value);
      this.updateUI();
    });
    this.dom.sliderAlpha.addEventListener('input', (e) => {
      this.alpha = parseFloat(e.target.value);
      this.updateUI();
    });

    this.dom.ring.addEventListener('mousedown', (e) => {
      this.isDraggingRing = true;
      this.updateHueFromMouse(e);
      e.preventDefault();
    });

    this.dom.triangle.addEventListener('mousedown', (e) => {
      this.isDraggingTriangle = true;
      this.updateSVFromMouse(e);
      e.preventDefault();
    });

    this.dom.rectSV.addEventListener('mousedown', (e) => {
      this.isDraggingRectSV = true;
      this.updateSVFromMouseRect(e);
      e.preventDefault();
    });

    this.dom.rectHue.addEventListener('mousedown', (e) => {
      this.isDraggingRectHue = true;
      this.updateHueFromMouseRect(e);
      e.preventDefault();
    });

    this._onMouseMove = (e) => {
      if (this.isDraggingRing) this.updateHueFromMouse(e);
      if (this.isDraggingTriangle) this.updateSVFromMouse(e);
      if (this.isDraggingRectSV) this.updateSVFromMouseRect(e);
      if (this.isDraggingRectHue) this.updateHueFromMouseRect(e);
    };

    this._onMouseUp = () => {
      this.isDraggingRing = false;
      this.isDraggingTriangle = false;
      this.isDraggingRectSV = false;
      this.isDraggingRectHue = false;
    };

    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);

    const onRgbaChange = () => {
      const r = parseFloat(this.dom.rgbaR.value) || 0;
      const g = parseFloat(this.dom.rgbaG.value) || 0;
      const b = parseFloat(this.dom.rgbaB.value) || 0;
      const a = this.dom.rgbaA.value !== '' ? parseFloat(this.dom.rgbaA.value) : this.alpha;
      this.setFromRGB(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a, 'rgba');
    };
    [this.dom.rgbaR, this.dom.rgbaG, this.dom.rgbaB, this.dom.rgbaA].forEach(k => {
      k.addEventListener('input', onRgbaChange);
    });

    const onRGBAChange = () => {
      const r = parseFloat(this.dom.RGBAR.value) || 0;
      const g = parseFloat(this.dom.RGBAG.value) || 0;
      const b = parseFloat(this.dom.RGBAB.value) || 0;
      const a = this.dom.RGBAA.value !== '' ? parseFloat(this.dom.RGBAA.value) / 255 : this.alpha;
      this.setFromRGB(Math.round(r), Math.round(g), Math.round(b), a, 'RGBA');
    };
    [this.dom.RGBAR, this.dom.RGBAG, this.dom.RGBAB, this.dom.RGBAA].forEach(k => {
      k.addEventListener('input', onRGBAChange);
    });

    this.dom.hex.addEventListener('input', () => this.setHex(this.dom.hex.value));
    this.dom.btnEyedropper.addEventListener('click', () => this.toggleEyedropper());
    this.dom.btnPalette.addEventListener('click', () => this.openPaletteModal());
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
    this.sat = Math.max(0, Math.min(100, S));
    this.val = Math.max(0, Math.min(100, V));
    this.dom.sliderSat.value = Math.round(this.sat);
    this.dom.sliderVal.value = Math.round(this.val);
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
    this.dom.preview.style.backgroundColor = currentColor;

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
    const cx = cW / 2;
    const cy = cH / 2;
    const rr = (cW / 2) - 8;
    const aR = (this.hue - 90) * (Math.PI / 180);

    this.dom.ringPointer.style.left = `${cx + Math.cos(aR) * rr}px`;
    this.dom.ringPointer.style.top = `${cy + Math.sin(aR) * rr}px`;

    if (cW && tW) {
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
      <span class="k">max:</span><span class="v">${selMax}</span><br>
      <span class="k">min:</span><span class="v">${selMin}</span><br>
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
    let max = selMax / 255;
    let min = selMin / 255;
    let dv = min / (max + 0.00001);

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
        maxOverMin: selMin > 0 ? +(selMax / selMin).toFixed(4) : (selMax > 0 ? Infinity : 1)
      },
      stats: {
        max: selMax,
        min: selMin,
        delta: delta,
        minOverMax: selMax > 0 ? +(selMin / selMax).toFixed(4) : 0,
        maxOverMin: selMin > 0 ? +(selMax / selMin).toFixed(4) : (selMax > 0 ? Infinity : 1)
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
    let dfMaxMin = (this.infoDeColores.selected.max / 255 - this.infoDeColores.selected.min / 255).toFixed(3);

    let dfrg = (this.infoDeColores.selected.r - this.infoDeColores.selected.g) / 255;
    let dfrb = this.infoDeColores.selected.r / 255 - this.infoDeColores.selected.b / 255;
    if (dfrb < -0.13) dfrb = -0.13;
    if (dfrb > 0.33) dfrb = 0.33;
    if (dfrg < -0.13) dfrg = -0.13;
    if (dfrg > 0.33) dfrg = 0.33;

    let rounescal = (0.4 + dfrb);
    if (rounescal > 1) rounescal = 1;
    if (dv > 0.98) rounescal = (0.5 - max) * 0.5;
    let metalicval = 1 - max3;

    this.dom.dfrg.innerHTML = `r-g: ${dfrg.toFixed(3)} max-min: ${dfMaxMin}`;
    this.dom.dfrb.innerHTML = `r-b: ${dfrb.toFixed(3)} metalic: ${metalicval.toFixed(3)}`;
    this.dom.rounessRgba.innerHTML = `rouness: ${rounescal.toFixed(3)}`;

    if (this.onChange) {
      this.onChange({ rgba, RGBA, hex, info, sender: this });
    }
  }

  setHex(hex) {
    if (typeof hex !== 'string') return;
    hex = hex.trim().replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (/^[0-9a-fA-F]{6}$/.test(hex)) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      this.setFromRGB(r, g, b, this.alpha, 'hex');
    }
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
    h = ((h % 360) + 360) % 360 / 360;
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
    r /= 255; g /= 255; b /= 255;
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
    try { actCtx = act.getContext('2d', { willReadFrequently: true }); } catch (e) { return null; }
    let imgData;
    try { imgData = actCtx.getImageData(0, 0, act.width, act.height); } catch (e) { return null; }
    const data = imgData.data;
    let mx = 0, mn = 255, sumMax = 0, sumMin = 0, count = 0;

    for (let i = 0; i < data.length; i += 16) {
      if (data[i + 3] < 128) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const cMax = Math.max(r, g, b), cMin = Math.min(r, g, b);
      if (cMax > mx) mx = cMax;
      if (cMin < mn) mn = cMin;
      sumMax += cMax; sumMin += cMin;
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

      if (el instanceof HTMLCanvasElement) act = el;
      else if (el) act = el.querySelector('canvas') || el.closest('canvas');
    }

    if (!act || !(act instanceof HTMLCanvasElement)) return null;

    const rect = act.getBoundingClientRect();
    if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return null;

    const scaleX = act.width / rect.width;
    const scaleY = act.height / rect.height;
    const x = Math.floor((clientX - rect.left) * scaleX);
    const y = Math.floor((clientY - rect.top) * scaleY);

    if (x < 0 || y < 0 || x >= act.width || y >= act.height) return null;

    try {
      const ctx = act.getContext('2d', { willReadFrequently: true });
      const px = ctx.getImageData(x, y, 1, 1).data;
      return { r: px[0], g: px[1], b: px[2], a: +(px[3] / 255).toFixed(2) };
    } catch (e) {
      return null;
    }
  }

  toggleEyedropper() {
    this.isEyedropperActive = !this.isEyedropperActive;

    if (this.isEyedropperActive) {
      this.dom.btnEyedropper.textContent = 'Picker (ON)';
      this.dom.btnEyedropper.style.borderColor = '#38bdf8';
      this.dom.btnEyedropper.style.color = '#38bdf8';
      this.activarOverlayEyedropper();
    } else {
      this.dom.btnEyedropper.textContent = 'Picker';
      this.dom.btnEyedropper.style.borderColor = '';
      this.dom.btnEyedropper.style.color = '';
      this.desactivarOverlayEyedropper();
    }
    if (this.onEyedropperToggle) {
      this.onEyedropperToggle({ active: this.isEyedropperActive, sender: this });
    }
  }

  activarOverlayEyedropper() {
    this.desactivarOverlayEyedropper();

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '999990';
    overlay.style.cursor = 'crosshair';
    overlay.style.userSelect = 'none';

    const bubble = document.createElement('div');
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

    const sample = (clientX, clientY) => {
      const selfRect = this.element.getBoundingClientRect();
      if (clientX >= selfRect.left && clientX <= selfRect.right &&
          clientY >= selfRect.top && clientY <= selfRect.bottom) {
        bubble.style.display = 'none';
        return;
      }

      const px = this.samplePixelFromCanvas(clientX, clientY);
      if (px) {
        bubble.style.display = 'block';
        this.setFromRGB(px.r, px.g, px.b, px.a, null);
        bubble.style.backgroundColor = `rgb(${px.r}, ${px.g}, ${px.b})`;
        bubble.textContent = `r:${(px.r/255).toFixed(2)}, g:${(px.g/255).toFixed(2)}, b:${(px.b/255).toFixed(2)}, a:${px.a}`;
      }
      bubble.style.left = `${clientX + 14}px`;
      bubble.style.top = `${clientY + 14}px`;
    };

    overlay.addEventListener('pointerdown', (e) => {
      if (e.button === 2) {
        e.preventDefault();
        this.toggleEyedropper();
        return;
      }
      if (e.button !== 0) return;
      this.isEyedropperMouseDown = true;
      sample(e.clientX, e.clientY);
    });

    this._onEyedropperMove = (e) => {
      if (!this.isEyedropperActive) return;
      const selfRect = this.element.getBoundingClientRect();
      if (e.clientX >= selfRect.left && e.clientX <= selfRect.right &&
          e.clientY >= selfRect.top && e.clientY <= selfRect.bottom) {
        bubble.style.display = 'none';
        return;
      }

      if (this.isEyedropperMouseDown) {
        sample(e.clientX, e.clientY);
      } else {
        const px = this.samplePixelFromCanvas(e.clientX, e.clientY);
        if (px) {
          bubble.style.display = 'block';
          bubble.style.backgroundColor = `rgb(${px.r}, ${px.g}, ${px.b})`;
          bubble.textContent = `r:${(px.r/255).toFixed(2)}, g:${(px.g/255).toFixed(2)}, b:${(px.b/255).toFixed(2)}, a:${px.a}`;
        }
        bubble.style.left = `${e.clientX + 14}px`;
        bubble.style.top = `${e.clientY + 14}px`;
      }
    };
    window.addEventListener('pointermove', this._onEyedropperMove);

    this._onEyedropperUp = () => { this.isEyedropperMouseDown = false; };
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
    if (this._onEyedropperMove) window.removeEventListener('pointermove', this._onEyedropperMove);
    if (this._onEyedropperUp) window.removeEventListener('pointerup', this._onEyedropperUp);
    if (this._onEyedropperKey) window.removeEventListener('keydown', this._onEyedropperKey);
  }

  openPaletteModal() {
    const overlay = document.createElement('div');
    overlay.className = 'ui-cp-modal-backdrop';
    overlay.innerHTML = `
      <div class="ui-cp-modal">
        <div class="ui-cp-modal-head">
          <span class="ui-panel-title">SUGGESTED PALETTE</span>
          <button class="ui-tool-btn btn-close-modal">✕</button>
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
        <span class="ui-label" style="font-family:var(--font-mono); font-size:11px;">${c.r}, ${c.g}, ${c.b}</span>
        <div class="ui-cp-swatch" style="background:${hex};"></div>
      `;
      row.querySelector('.ui-cp-swatch').addEventListener('click', () => {
        this.setFromRGB(c.r, c.g, c.b, this.alpha, null);
        if (this.onPaletteSelect) this.onPaletteSelect({ color: c, hex, sender: this });
        overlay.remove();
      });
      body.appendChild(row);
    });

    overlay.querySelector('.btn-close-modal').addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  }

  destroy() {
    this.desactivarOverlayEyedropper();
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
    super.destroy();
  }
}

class UISmartPanel extends UIBaseComponent {
  constructor(options = {}) {
    super(options, 'panel');
    this.title = options.title || 'Panel';
    this.width = options.width || 310;
    this.x = options.x || 100;
    this.y = options.y || 100;
    this.floating = options.floating !== false;
    this.collapsed = false;

    this.onClose = options.onClose || null;
    this.onCollapse = options.onCollapse || null;
    this.onFloatChange = options.onFloatChange || null;
    this.onDragStart = options.onDragStart || null;
    this.onDragMove = options.onDragMove || null;
    this.onDragEnd = options.onDragEnd || null;

    this._isDragging = false;
    this.buildUI();
    this.bindEvents();

    if (this.floating) {
      this.setFloating(true, this.x, this.y);
    }
  }

  buildUI() {
    this.element = document.createElement('div');
    this.element.className = 'ui-panel';
    this.element.style.width = `${this.width}px`;

    this.element.innerHTML = `
      <div class="ui-panel-header">
        <span class="ui-panel-title">${this.title}</span>
        <div class="ui-panel-tools">
          <button class="ui-tool-btn btn-float">⧉</button>
          <button class="ui-tool-btn btn-collapse">_</button>
          <button class="ui-tool-btn btn-close">✕</button>
        </div>
      </div>
      <div class="ui-panel-body"></div>
    `;

    this.header = this.element.querySelector('.ui-panel-header');
    this.body = this.element.querySelector('.ui-panel-body');
    this.btnFloat = this.element.querySelector('.btn-float');
    this.btnCollapse = this.element.querySelector('.btn-collapse');
    this.btnClose = this.element.querySelector('.btn-close');
  }

  append(item) {
    if (item instanceof HTMLElement) {
      this.body.appendChild(item);
    } else if (item && item.element instanceof HTMLElement) {
      this.body.appendChild(item.element);
    }
    return this;
  }

  setFloating(state, x, y) {
    this.floating = state;
    this.btnFloat.classList.toggle('active', this.floating);

    if (this.floating) {
      this.element.classList.remove('docked');
      this.element.classList.add('floating');
      this.x = x !== undefined ? x : this.x;
      this.y = y !== undefined ? y : this.y;
      this.element.style.width = `${this.width}px`;
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      document.body.appendChild(this.element);
    } else {
      this.element.classList.remove('floating');
      this.element.classList.add('docked');
      this.element.style.left = '';
      this.element.style.top = '';
      this.element.style.width = '';
    }

    if (this.onFloatChange) {
      this.onFloatChange({ floating: this.floating, x: this.x, y: this.y, sender: this });
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.element.classList.toggle('collapsed', this.collapsed);
    this.btnCollapse.textContent = this.collapsed ? '□' : '_';
    if (this.onCollapse) {
      this.onCollapse({ collapsed: this.collapsed, sender: this });
    }
  }

  bindEvents() {
    this.btnCollapse.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleCollapse();
    });

    this.btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      this.element.style.display = 'none';
      if (this.onClose) this.onClose({ sender: this });
    });

    this.btnFloat.addEventListener('click', (e) => {
      e.stopPropagation();
      this.setFloating(!this.floating);
    });

    let startX = 0, startY = 0, initLeft = 0, initTop = 0, tracking = false;

    const onPointerMove = (e) => {
      if (!tracking) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      if (!this._isDragging) {
        if (Math.hypot(clientX - startX, clientY - startY) > 6) {
          this._isDragging = true;
          this.element.classList.add('dragging');
          if (this.onDragStart) {
            this.onDragStart({ clientX, clientY, sender: this });
          }
        } else {
          return;
        }
      }

      if (e.cancelable) e.preventDefault();
      const rawX = initLeft + (clientX - startX);
      const rawY = initTop + (clientY - startY);

      if (this.floating) {
        this.element.style.left = `${rawX}px`;
        this.element.style.top = `${rawY}px`;
        this.x = rawX;
        this.y = rawY;
      }

      if (this.onDragMove) {
        this.onDragMove({ clientX, clientY, rawX, rawY, sender: this });
      }
    };

    const onPointerUp = (e) => {
      if (!tracking) return;
      tracking = false;
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (!this._isDragging) return;
      this._isDragging = false;
      this.element.classList.remove('dragging');

      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

      if (this.onDragEnd) {
        this.onDragEnd({ clientX, clientY, x: this.x, y: this.y, sender: this });
      }
    };

    const onPointerDown = (e) => {
      if (e.target.closest('button, input, select, .ui-date-picker-wrap, .ui-cp-root, .ui-table-container')) return;
      tracking = true;
      this._isDragging = false;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      initLeft = this.element.offsetLeft;
      initTop = this.element.offsetTop;

      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
    };

    this.header.addEventListener('mousedown', onPointerDown);
    this.header.addEventListener('touchstart', onPointerDown, { passive: true });
  }
}

class UIContainer2 extends UIBaseComponent {
  constructor(options = {}) {
    super(options, 'container');
    this._width = options.width || 280;
    this._position = options.position || 'right';
    this.onPanelAdd = options.onPanelAdd || null;
    this.onPanelRemove = options.onPanelRemove || null;

    this.element = document.createElement('div');
    this.element.className = `ui-container bordered-${this._position}`;
    this.element.style.width = typeof this._width === 'number' ? `${this._width}px` : this._width;

    this._placeholder = document.createElement('div');
    this._placeholder.className = 'ui-placeholder';
    this._placeholder.style.display = 'none';
    this.element.appendChild(this._placeholder);

    this.panels = [];
  }

  showPlaceholder(clientY) {
    this._placeholder.style.display = 'block';
    const children = Array.from(this.element.children).filter(c => c !== this._placeholder);
    let target = null;
    for (const child of children) {
      const rect = child.getBoundingClientRect();
      if (clientY < rect.top + rect.height / 2) {
        target = child;
        break;
      }
    }
    if (target) this.element.insertBefore(this._placeholder, target);
    else this.element.appendChild(this._placeholder);
  }

  hidePlaceholder() {
    this._placeholder.style.display = 'none';
  }

  addPanel(panel) {
    panel.setFloating(false);
    if (this._placeholder.parentNode === this.element) {
      this.element.insertBefore(panel.element, this._placeholder);
    } else {
      this.element.appendChild(panel.element);
    }
    this.hidePlaceholder();
    if (!this.panels.includes(panel)) this.panels.push(panel);
    if (this.onPanelAdd) this.onPanelAdd({ panel, sender: this });
    return this;
  }

  removePanel(panel) {
    const idx = this.panels.indexOf(panel);
    if (idx !== -1) this.panels.splice(idx, 1);
    if (panel.element.parentNode === this.element) {
      this.element.removeChild(panel.element);
    }
    if (this.onPanelRemove) this.onPanelRemove({ panel, sender: this });
    return this;
  }
}

class UIDockEngine {
  constructor({ threshold = 18 } = {}) {
    this.panels = new Set();
    this.containers = new Set();
    this.threshold = threshold;
    this.guide = null;
    this._bindWindow();
  }

  _bindWindow() {
    window.addEventListener('resize', () => this.validateBounds());
  }

  ensureGuide() {
    if (!this.guide) {
      this.guide = document.createElement('div');
      this.guide.className = 'ui-snap-guide';
      document.body.appendChild(this.guide);
    }
    return this.guide;
  }

  hideGuide() {
    if (this.guide) this.guide.style.display = 'none';
  }

  registerPanel(panel) {
    this.panels.add(panel);
    panel.onDragMove = (e) => this.handlePanelDrag(e);
    panel.onDragEnd = (e) => this.handlePanelDragEnd(e);
  }

  unregisterPanel(panel) {
    this.panels.delete(panel);
  }

  registerContainer(container) {
    this.containers.add(container);
  }

  unregisterContainer(container) {
    this.containers.delete(container);
  }

  findContainerAt(x, y) {
    for (const container of this.containers) {
      const rect = container.element.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return container;
      }
    }
    return null;
  }

  handlePanelDrag({ clientX, clientY, rawX, rawY, sender: panel }) {
    const targetCnt = this.findContainerAt(clientX, clientY);

    if (targetCnt) {
      this.hideGuide();
      panel.element.classList.remove('snapping');
      this.containers.forEach(c => { if (c !== targetCnt) c.hidePlaceholder(); });
      targetCnt.showPlaceholder(clientY);
    } else {
      this.containers.forEach(c => c.hidePlaceholder());
      this.evaluateSnap(panel, rawX, rawY);
    }
  }

  handlePanelDragEnd({ clientX, clientY, sender: panel }) {
    const targetCnt = this.findContainerAt(clientX, clientY);
    this.hideGuide();
    this.containers.forEach(c => c.hidePlaceholder());

    if (targetCnt) {
      targetCnt.addPanel(panel);
    } else {
      panel.setFloating(true, panel.x, panel.y);
    }
  }

  evaluateSnap(draggedPanel, rawX, rawY) {
    const el = draggedPanel.element;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const maxW = window.innerWidth;
    const maxH = window.innerHeight;

    let finalX = rawX;
    let finalY = rawY;
    let snapped = false;

    if (Math.abs(finalX) < this.threshold) { finalX = 0; snapped = true; }
    if (Math.abs(finalY - 32) < this.threshold) { finalY = 32; snapped = true; }
    if (Math.abs(finalX + w - maxW) < this.threshold) { finalX = maxW - w; snapped = true; }
    if (Math.abs(finalY + h - maxH) < this.threshold) { finalY = maxH - h; snapped = true; }

    const g = this.ensureGuide();
    if (snapped) {
      g.style.display = 'block';
      g.style.left = `${finalX}px`;
      g.style.top = `${finalY}px`;
      g.style.width = `${w}px`;
      g.style.height = `${h}px`;
      draggedPanel.element.classList.add('snapping');
      draggedPanel.element.style.left = `${finalX}px`;
      draggedPanel.element.style.top = `${finalY}px`;
    } else {
      g.style.display = 'none';
      draggedPanel.element.classList.remove('snapping');
    }
  }

  validateBounds() {
    const sw = window.innerWidth;
    const sh = window.innerHeight;
    this.panels.forEach(p => {
      if (p.floating && p.element.style.display !== 'none') {
        const r = p.element.getBoundingClientRect();
        if (r.right > sw) p.element.style.left = `${Math.max(0, sw - r.width)}px`;
        if (r.bottom > sh) p.element.style.top = `${Math.max(32, sh - r.height)}px`;
      }
    });
  }
}

// Inyección de estilos específicos para UIConfigurableSlider y UIContainer flotante
 // Inyección de estilos limpia y sin conflictos
(function injectUncrushableStyles() {
  if (document.getElementById('ui-container-uncrushable-css')) return;
  const style = document.createElement('style');
  style.id = 'ui-container-uncrushable-css';
  style.textContent = `
    .ui-container {
      display: flex !important;
      flex-direction: column !important;
      box-sizing: border-box !important;
    }

    .ui-container-header {
      height: 34px !important;
      min-height: 34px !important;
      padding: 0 10px !important;
      background: var(--bg-elevated, #252526) !important;
      border-bottom: 1px solid var(--border-subtle, #2c2c2c) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      cursor: grab !important;
      user-select: none !important;
      flex-shrink: 0 !important;
      z-index: 10 !important;
    }
    .ui-container-header:active {
      cursor: grabbing !important;
    }

    .ui-container-header .ui-panel-tools {
      display: flex !important;
      align-items: center !important;
      gap: 4px !important;
    }

    /* ESTADO MINIMIZADO / COLAPSADO (Solución al bloqueo) */
    .ui-container.collapsed {
      height: 34px !important;
      min-height: 34px !important;
      max-height: 34px !important;
      overflow: hidden !important;
      box-shadow: 0 6px 16px rgba(0,0,0,0.5) !important;
    }
    .ui-container.collapsed .ui-container-body,
    .ui-container.collapsed .ui-placeholder,
    .ui-container.collapsed .ui-resizer {
      display: none !important; /* Oculta SOLO cuerpo y tiradores, jamás el header */
    }

    .ui-container-body {
      flex: 1 1 auto;
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      overflow-y: auto !important;
      overflow-x: auto !important;
      min-height: 0;
    }

    /* AUTO GRID (Respeta alturas reales de 500px, 700px sin aplastar) */
    .ui-container-body.mode-grid {
      display: grid !important;
      grid-template-columns: repeat(auto-fit, minmax(var(--grid-min-col, 300px), 1fr)) !important;
      grid-auto-rows: min-content !important;
      align-items: start !important;
      justify-items: stretch !important;
      gap: var(--grid-gap, 14px);
    }

    .ui-container-body.mode-rows {
      display: grid !important;
      grid-template-columns: none !important;
      grid-auto-flow: column !important;
      grid-auto-columns: min-content !important;
      align-items: start !important;
      gap: var(--grid-gap, 14px);
      overflow-x: auto !important;
      overflow-y: hidden !important;
    }

    .ui-container-body.mode-stack {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      gap: var(--grid-gap, 12px);
    }

    .ui-real-slot {
      box-sizing: border-box;
      flex-shrink: 0 !important;
      width: 100%;
      height: auto;
      background: var(--bg-surface, #1e1e1e);
      border: 1px solid var(--border-subtle, #2c2c2c);
      border-radius: 8px;
      padding: 12px;
      overflow: visible;
      transition: border-color 0.15s ease;
    }
    .ui-real-slot:hover {
      border-color: var(--accent, #3b82f6);
    }
  `;
  (document.head || document.documentElement).appendChild(style);
})();

class UIContainer extends UIBaseComponent {
  constructor(options = {}) {
    super(options, 'container');

    this.layoutMode = options.layoutMode || 'grid';
    this.itemMinCol = options.itemMinCol || 300;
    this.gap = options.gap !== undefined ? options.gap : 14;

    this.minWidth = options.minWidth !== undefined ? options.minWidth : 300;
    this.maxWidth = options.maxWidth || null;
    this.minHeight = options.minHeight || 150;
    this.maxHeight = options.maxHeight || null;
    this.resizable = options.resizable !== false;

    this._width = Math.max(this.minWidth, options.width || 340);
    this._height = options.height || null;
    this._savedHeight = this._height ? (typeof this._height === 'number' ? `${this._height}px` : this._height) : null;
    this.collapsed = false;

    this._position = options.position || 'right';
    this.draggable = !!options.draggable;
    this.floating = !!options.floating || this.draggable;
    this.title = options.title || '';
    this.x = options.x || 60;
    this.y = options.y || 60;
    this.snapThreshold = options.snapThreshold || 20;

    this.onPanelAdd = options.onPanelAdd || null;
    this.onPanelRemove = options.onPanelRemove || null;
    this.onResize = options.onResize || null;
    this.onCollapse = options.onCollapse || null;

    this.panels = [];
    this.buildUI();
    this.bindEvents();
    if (this.resizable) this.bindResizeEvents();
  }

  buildUI() {
    this.element = document.createElement('div');
    this.element.className = `ui-container bordered-${this._position}`;
    this.element.style.minWidth = `${this.minWidth}px`;
    this.element.style.maxWidth = '100vw';
    this.setWidth(this._width);
    if (this._height) this.setHeight(this._height);

    if (this.floating) {
      this.element.classList.add('is-floating');
      this.element.style.position = 'fixed';
      this.element.style.zIndex = '600';
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      if (document.body) document.body.appendChild(this.element);
    }

    // Cabecera permanente
    this.header = document.createElement('div');
    this.header.className = 'ui-container-header';
    this.header.innerHTML = `
      <span class="ui-panel-title">${this.title || 'CONTENEDOR'}</span>
      <div class="ui-panel-tools">
        <button type="button" class="ui-tool-btn btn-collapse" title="Minimizar / Expandir">_</button>
        <button type="button" class="ui-tool-btn btn-cls-cnt" title="Cerrar">✕</button>
      </div>
    `;
    this.element.appendChild(this.header);

    this.btnCollapse = this.header.querySelector('.btn-collapse');
    this.btnClose = this.header.querySelector('.btn-cls-cnt');

    // Evento Minimizar / Expandir
    this.btnCollapse.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleCollapse();
    });

    // Evento Cerrar
    this.btnClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.element.style.display = 'none';
    });

    // Cuerpo
    this.body = document.createElement('div');
    this.body.className = `ui-container-body mode-${this.layoutMode}`;
    this.body.style.setProperty('--grid-min-col', `${this.itemMinCol}px`);
    this.body.style.setProperty('--grid-gap', `${this.gap}px`);
    this.element.appendChild(this.body);

    this._placeholder = document.createElement('div');
    this._placeholder.className = 'ui-placeholder';
    this._placeholder.style.display = 'none';
    this.body.appendChild(this._placeholder);

    // Tiradores con clase explícita .ui-resizer
    if (this.resizable) {
      this.resizerR = document.createElement('div');
      this.resizerR.className = 'ui-resizer';
      this.resizerR.style.cssText = 'position:absolute; top:0; right:0; width:8px; height:100%; cursor:ew-resize; z-index:100; touch-action:none;';
      
      this.resizerB = document.createElement('div');
      this.resizerB.className = 'ui-resizer';
      this.resizerB.style.cssText = 'position:absolute; bottom:0; left:0; width:100%; height:8px; cursor:ns-resize; z-index:100; touch-action:none;';

      this.resizerSE = document.createElement('div');
      this.resizerSE.className = 'ui-resizer';
      this.resizerSE.style.cssText = 'position:absolute; bottom:0; right:0; width:14px; height:14px; cursor:nwse-resize; z-index:101; touch-action:none;';

      this.element.appendChild(this.resizerR);
      this.element.appendChild(this.resizerB);
      this.element.appendChild(this.resizerSE);
    }
  }

  // --- MINIMIZAR Y EXPANDIR SIN BLOQUEOS ---
  toggleCollapse() {
    this.collapsed = !this.collapsed;

    if (this.collapsed) {
      // Guardar la altura antes de cerrar
      this._savedHeight = this.element.style.height || `${this.element.offsetHeight}px`;
      this.element.classList.add('collapsed');
      this.btnCollapse.textContent = '□';
    } else {
      // Restaurar la altura que tenía
      this.element.classList.remove('collapsed');
      if (this._savedHeight) {
        this.element.style.height = this._savedHeight;
      } else {
        this.element.style.height = '';
      }
      this.btnCollapse.textContent = '_';
    }

    if (this.onCollapse) {
      this.onCollapse({ collapsed: this.collapsed, sender: this });
    }
    return this;
  }

  addItem(content, options = {}) {
    if (options.raw) {
      const dom = content.element || content;
      this.body.appendChild(dom);
      return dom;
    }

    const slot = document.createElement('div');
    slot.className = 'ui-real-slot';

    if (options.colSpan && options.colSpan > 1) slot.style.gridColumn = `span ${options.colSpan}`;
    if (options.rowSpan && options.rowSpan > 1) slot.style.gridRow = `span ${options.rowSpan}`;
    if (options.height) slot.style.height = typeof options.height === 'number' ? `${options.height}px` : options.height;
    if (options.width) slot.style.width = typeof options.width === 'number' ? `${options.width}px` : options.width;

    if (typeof content === 'string') {
      slot.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      slot.appendChild(content);
    } else if (content && content.element instanceof HTMLElement) {
      slot.appendChild(content.element);
    }

    this.body.appendChild(slot);
    return slot;
  }

  setLayoutMode(mode) {
    if (!['grid', 'rows', 'stack'].includes(mode)) return this;
    this.layoutMode = mode;
    this.body.className = `ui-container-body mode-${this.layoutMode}`;
    return this;
  }

  setWidth(w) {
    let widthVal = typeof w === 'number' ? Math.max(this.minWidth, w) : w;
    if (this.maxWidth && typeof w === 'number') widthVal = Math.min(this.maxWidth, widthVal);
    this._width = widthVal;
    this.element.style.width = typeof widthVal === 'number' ? `${widthVal}px` : widthVal;
    return this;
  }

  setHeight(h) {
    let heightVal = typeof h === 'number' ? Math.max(this.minHeight, h) : h;
    if (this.maxHeight && typeof h === 'number') heightVal = Math.min(this.maxHeight, heightVal);
    this._height = heightVal;
    this._savedHeight = `${heightVal}px`;
    this.element.style.height = typeof heightVal === 'number' ? `${heightVal}px` : heightVal;
    return this;
  }

  setSize(w, h) {
    this.setWidth(w);
    if (h !== undefined) this.setHeight(h);
    return this;
  }

  bindResizeEvents() {
    const initResize = (e, direction) => {
      if (this.collapsed) return;
      e.stopPropagation();
      e.preventDefault();

      const startX = e.touches ? e.touches[0].clientX : e.clientX;
      const startY = e.touches ? e.touches[0].clientY : e.clientY;
      const startW = this.element.offsetWidth;
      const startH = this.element.offsetHeight;

      const onPointerMove = (ev) => {
        const currentX = ev.touches ? ev.touches[0].clientX : ev.clientX;
        const currentY = ev.touches ? ev.touches[0].clientY : ev.clientY;

        if (direction === 'horizontal' || direction === 'both') {
          this.setWidth(startW + (currentX - startX));
        }
        if (direction === 'vertical' || direction === 'both') {
          this.setHeight(startH + (currentY - startY));
        }

        if (this.onResize) {
          this.onResize({ width: this.element.offsetWidth, height: this.element.offsetHeight, sender: this });
        }
      };

      const onPointerUp = () => {
        window.removeEventListener('mousemove', onPointerMove);
        window.removeEventListener('mouseup', onPointerUp);
        window.removeEventListener('touchmove', onPointerMove);
        window.removeEventListener('touchend', onPointerUp);
      };

      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
    };

    this.resizerR.addEventListener('mousedown', (e) => initResize(e, 'horizontal'));
    this.resizerR.addEventListener('touchstart', (e) => initResize(e, 'horizontal'), { passive: false });

    this.resizerB.addEventListener('mousedown', (e) => initResize(e, 'vertical'));
    this.resizerB.addEventListener('touchstart', (e) => initResize(e, 'vertical'), { passive: false });

    this.resizerSE.addEventListener('mousedown', (e) => initResize(e, 'both'));
    this.resizerSE.addEventListener('touchstart', (e) => initResize(e, 'both'), { passive: false });
  }

  _getGuide() {
    let guide = document.querySelector('.ui-snap-guide');
    if (!guide) {
      guide = document.createElement('div');
      guide.className = 'ui-snap-guide';
      document.body.appendChild(guide);
    }
    return guide;
  }

  _calculateSnap(rawX, rawY, width, height) {
    const T = this.snapThreshold;
    let finalX = rawX;
    let finalY = rawY;
    let snapped = false;

    const winW = window.innerWidth;
    const winH = window.innerHeight;

    if (Math.abs(finalX) < T) { finalX = 0; snapped = true; }
    if (Math.abs(finalY - 32) < T) { finalY = 32; snapped = true; }
    else if (Math.abs(finalY) < T) { finalY = 0; snapped = true; }
    if (Math.abs(finalX + width - winW) < T) { finalX = winW - width; snapped = true; }
    if (Math.abs(finalY + height - winH) < T) { finalY = winH - height; snapped = true; }

    const others = Array.from(document.querySelectorAll('.ui-container, .ui-panel'))
      .filter(el => el !== this.element && el.offsetParent !== null);

    for (const other of others) {
      const r = other.getBoundingClientRect();
      if (Math.abs(finalX - r.right) < T && finalY < r.bottom && finalY + height > r.top) {
        finalX = r.right; snapped = true;
      }
      if (Math.abs(finalX + width - r.left) < T && finalY < r.bottom && finalY + height > r.top) {
        finalX = r.left - width; snapped = true;
      }
      if (Math.abs(finalY - r.bottom) < T && finalX < r.right && finalX + width > r.left) {
        finalY = r.bottom; snapped = true;
      }
      if (Math.abs(finalY + height - r.top) < T && finalX < r.right && finalX + width > r.left) {
        finalY = r.top - height; snapped = true;
      }
    }

    return { finalX, finalY, snapped };
  }

  bindEvents() {
    if (!this.draggable) return;

    let shiftX = 0, shiftY = 0, dragging = false;
    const trigger = this.header; // Arrastre garantizado siempre desde la cabecera
    const guide = this._getGuide();

    const onPointerMove = (e) => {
      if (!dragging) return;
      if (e.cancelable) e.preventDefault();

      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;

      const rawX = cx - shiftX;
      const rawY = cy - shiftY;
      const w = this.element.offsetWidth;
      const h = this.element.offsetHeight;

      const snap = this._calculateSnap(rawX, rawY, w, h);

      this.x = snap.finalX;
      this.y = snap.finalY;
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;

      if (snap.snapped) {
        this.element.classList.add('snapping');
        guide.style.display = 'block';
        guide.style.left = `${this.x}px`;
        guide.style.top = `${this.y}px`;
        guide.style.width = `${w}px`;
        guide.style.height = `${h}px`;
      } else {
        this.element.classList.remove('snapping');
        guide.style.display = 'none';
      }
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      this.element.classList.remove('snapping');
      guide.style.display = 'none';

      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };

    const onPointerDown = (e) => {
      // Si se hizo clic en los botones de minimizar o cerrar, no iniciar arrastre
      if (e.target.closest('button, input, select')) return;

      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = this.element.getBoundingClientRect();

      shiftX = cx - rect.left;
      shiftY = cy - rect.top;
      dragging = true;

      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
    };

    trigger.addEventListener('mousedown', onPointerDown);
    trigger.addEventListener('touchstart', onPointerDown, { passive: true });
  }

  addPanel(panel) {
    if (panel.setFloating) panel.setFloating(false);
    this.body.appendChild(panel.element || panel);
    if (!this.panels.includes(panel)) this.panels.push(panel);
    if (this.onPanelAdd) this.onPanelAdd({ panel, sender: this });
    return this;
  }

  removePanel(panel) {
    const idx = this.panels.indexOf(panel);
    if (idx !== -1) this.panels.splice(idx, 1);
    const dom = panel.element || panel;
    if (dom.parentNode === this.body) {
      this.body.removeChild(dom);
    }
    if (this.onPanelRemove) this.onPanelRemove({ panel, sender: this });
    return this;
  }
}
class UIConfigurableSlider extends UIBaseComponent {
  constructor({ label = '', min = 0, max = 100, step = 1, value = 50, onChange = null } = {}) {
    super({}, 'configurableslider');
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
        <div class="ui-slider-header-right">
          <span class="ui-slider-val"></span>
          <button class="ui-cajon-btn" title="Configurar Min/Max">▼</button>
        </div>
      </div>
      <div class="ui-slider-content">
        <div class="ui-slider-track">
          <div class="ui-slider-bg"><div class="ui-slider-fill"></div></div>
          <div class="ui-slider-thumb"></div>
        </div>
      </div>
      <div class="ui-slider-cajon">
        <div class="ui-slider-cajon-inner">
          <div class="ui-cajon-group">
            <span class="ui-cajon-tag">Min</span>
            <input type="number" class="ui-input ui-cajon-input input-min" value="${this.min}" step="${this.step}">
          </div>
          <div class="ui-cajon-group">
            <span class="ui-cajon-tag">Max</span>
            <input type="number" class="ui-input ui-cajon-input input-max" value="${this.max}" step="${this.step}">
          </div>
          <div class="ui-cajon-group">
            <span class="ui-cajon-tag">Paso</span>
            <input type="number" class="ui-input ui-cajon-input input-step" value="${this.step}" step="any">
          </div>
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
    this.toggleCajon = () => {
      this.isOpen = !this.isOpen;
      this.element.classList.toggle('open', this.isOpen);
    };
    this.toggleBtn.addEventListener('click', this.toggleCajon);

    const handleMove = (e) => {
      if (e.cancelable) e.preventDefault();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = this.track.getBoundingClientRect();
      let pos = (cx - rect.left) / rect.width;
      pos = Math.max(0, Math.min(1, pos));
      let rawVal = this.min + pos * (this.max - this.min);
      const steps = Math.round((rawVal - this.min) / this.step);
      this.value = Number((this.min + steps * this.step).toFixed(2));
      this.value = Math.max(this.min, Math.min(this.max, this.value));
      this.updateUI();
      if (this.onChange) this.onChange({ value: this.value, sender: this });
    };

    const stopMove = () => {
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', stopMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', stopMove);
    };

    const startMove = (e) => {
      if (e.cancelable) e.preventDefault();
      document.body.style.userSelect = 'none';
      handleMove(e);
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', stopMove);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', stopMove);
    };

    this.track.addEventListener('mousedown', startMove);
    this.track.addEventListener('touchstart', startMove, { passive: false });

    this.inputMin.addEventListener('change', (e) => {
      let v = parseFloat(e.target.value);
      if (isNaN(v)) v = 0;
      if (v >= this.max) v = this.max - this.step;
      this.min = v;
      this.inputMin.value = this.min;
      this.setValue(this.value);
    });

    this.inputMax.addEventListener('change', (e) => {
      let v = parseFloat(e.target.value);
      if (isNaN(v)) v = 0;
      if (v <= this.min) v = this.min + this.step;
      this.max = v;
      this.inputMax.value = this.max;
      this.setValue(this.value);
    });

    this.inputStep.addEventListener('change', (e) => {
      let v = parseFloat(e.target.value);
      if (isNaN(v) || v <= 0) v = 1;
      this.step = v;
      this.inputStep.value = this.step;
      this.setValue(this.value);
    });
  }

  getValue() { return this.value; }

  setValue(v) {
    this.value = Math.max(this.min, Math.min(this.max, v));
    this.updateUI();
    if (this.onChange) this.onChange({ value: this.value, sender: this });
    return this;
  }

  updateUI() {
    const range = this.max - this.min;
    const percent = range > 0 ? Math.max(0, Math.min(100, ((this.value - this.min) / range) * 100)) : 0;
    this.fill.style.width = `${percent}%`;
    this.thumb.style.left = `${percent}%`;
    this.valDisplay.textContent = this.value;
  }

  destroy() {
    if (this.toggleBtn) this.toggleBtn.removeEventListener('click', this.toggleCajon);
    super.destroy();
  }
}
