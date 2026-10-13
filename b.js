
class UIThemeGio2026 {
  constructor(options = {}) {
    this.root = document.documentElement;
    this.styleId = 'ui-theme-gio2026-master';
    this._injected = false;
  }

  static getInstance(options = {}) {
    if (!UIThemeGio2026._instance) {
      UIThemeGio2026._instance = new UIThemeGio2026(options);
    }
    return UIThemeGio2026._instance;
  }

  inject() {
    if (this._injected) return this;
    let style = document.getElementById(this.styleId);
    if (!style) {
      style = document.createElement('style');
      style.id = this.styleId;
      style.textContent = this.getAllCSS();
      (document.head || document.documentElement).appendChild(style);
    }
    this._injected = true;
    return this;
  }

  getAllCSS() {
    return `
      /* ==================== VARIABLES Y BASE ==================== */
      :root {
        --gio-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "JetBrains Mono", monospace;
        --gio-font-mono: "JetBrains Mono", "SF Mono", Consolas, monospace;
        
        --gio-bg-body: #080808;
        --gio-bg-chassis: #0d0d0d;
        --gio-bg-surface: #1b1c1c;
        --gio-bg-surface-hover: #242525;
        --gio-bg-box: #2d2d2d;
        
        --gio-shadow-inset: inset 0 1px 2px 1px rgba(0, 0, 0, 0.7), 0 1px 0 0 rgba(255, 255, 255, 0.1);
        --gio-shadow-plate: inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 2px 5px rgba(0, 0, 0, 0.5);
        --gio-shadow-plate-active: inset 0 1px 2px rgba(0, 0, 0, 0.8), 0 1px 0 0 rgba(255, 255, 255, 0.05);

        --gio-led-red: 0 0 5px 2px rgba(0, 0, 0, 0), 0 0 3px 1px rgba(0, 0, 0, 0);
        
         --gio-led-green: 0 0 5px 2px rgba(15, 165, 70, 0.9), 0 0 3px 1px rgba(15, 165, 70, 0.9);  
 
        --gio-text: #9fa3a7;
        --gio-text-bright: #f0f2f588;
        --gio-text-dim: #54575a;
        --gio-accent: #fffff383;
        --gio-danger: #a50f0f;

        --gio-radius-sm: 4px;
        --gio-radius-md: 6px;
        --gio-radius-pill: 99px;
      }

      html, body {
        background-color: var(--gio-bg-body) !important;
        color: var(--gio-text);
        font-family: var(--gio-font);
        margin: 0;
        padding: 0;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
      }

      * { box-sizing: border-box; scrollbar-width: thin; scrollbar-color: #232525 #0d0d0d; }
      *::-webkit-scrollbar { width: 6px; height: 6px; }
      *::-webkit-scrollbar-track { background: var(--gio-bg-chassis); }
      *::-webkit-scrollbar-thumb { background: #232525; border-radius: 3px; }

      /* ==================== SWITCH CÁPSULA (SwitchGio2026) ==================== */
      .switch-gio2026 {
        position: relative; box-sizing: border-box; padding: 3px; background: var(--gio-bg-chassis);
        border-radius: var(--gio-radius-pill); box-shadow: inset 0 1px 1px 1px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1);
        display: inline-block; user-select: none; vertical-align: middle; transition: opacity 0.2s ease;
      }
      .switch-gio2026.disabled { opacity: 0.4; pointer-events: none; cursor: not-allowed; }
      .switch-gio2026 input[type="checkbox"] {
        position: absolute; z-index: 2; width: 100%; height: 100%; top: 0; left: 0; margin: 0; opacity: 0; cursor: pointer;
      }
      .switch-gio2026 input[type="checkbox"] + label {
        position: relative; display: flex; align-items: center; justify-content: center;
        left: 0; width: 50%; height: 100%; background: var(--gio-bg-surface); border-radius: var(--gio-radius-pill);
        transition: all 0.4s cubic-bezier(0.2, 0.85, 0.32, 1.2); pointer-events: none;
      }
      .switch-gio2026 input[type="checkbox"] + label:before {
        content: ""; display: inline-block; width: 5px; height: 5px;/*  background: #fff; */
        border-radius: 50%; vertical-align: middle; box-shadow: var(--gio-led-red); transition: box-shadow 0.3s ease;
      }
      .switch-gio2026 input[type="checkbox"]:checked + label {
        left: 50%; box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
      }
      .switch-gio2026 input[type="checkbox"]:checked + label:before { box-shadow: var(--gio-led-green);  background: #fff; }

      /* ==================== SWITCH INDUSTRIAL (HardwareSwitchGio2026) ==================== */
      .hw-switch-gio2026 {
        position: relative; width: 140px; height: 38px; box-sizing: border-box; padding: 3px;
        background: var(--gio-bg-chassis); border-radius: var(--gio-radius-md); box-shadow: var(--gio-shadow-inset);
        display: inline-block; user-select: none;
      }
      .hw-switch-gio2026.micro { width: 46px; height: 22px; padding: 2px; }
      .hw-switch-gio2026 input[type="checkbox"] {
        position: absolute; z-index: 2; width: 100%; height: 100%; top: 0; left: 0; margin: 0; opacity: 0; cursor: pointer;
      }
      .hw-switch-gio2026 input[type="checkbox"] + label {
        position: relative; display: flex; align-items: center; left: 0; width: 50%; height: 100%;
        background: var(--gio-bg-surface); border-radius: 3px; box-shadow: var(--gio-shadow-plate);
        transition: left 0.35s cubic-bezier(0.2, 0.85, 0.32, 1.2); pointer-events: none;
      }
      .hw-switch-gio2026 input[type="checkbox"] + label:before {
        content: ""; display: block; width: 5px; height: 5px; margin-left: 8px; /* background: #fff; */
        border-radius: 50%; box-shadow: var(--gio-led-red); transition: box-shadow 0.3s ease;
      }
      .hw-switch-gio2026.micro input[type="checkbox"] + label:before { width: 4px; height: 4px; margin-left: 4px; }
      .hw-switch-gio2026 input[type="checkbox"] + label i {
        display: block; position: absolute; top: 50%; left: 55%; width: 2px; height: 16px; margin-top: -8px;
        border-radius: 1px; background: var(--gio-bg-chassis); box-shadow: 0 1px 0 rgba(255, 255, 255, 0.25);
      }
      .hw-switch-gio2026.micro input[type="checkbox"] + label i { height: 10px; margin-top: -5px; left: 60%; }
      .hw-switch-gio2026 input[type="checkbox"] + label i:before,
      .hw-switch-gio2026 input[type="checkbox"] + label i:after {
        content: ""; display: block; position: absolute; width: 100%; height: 100%;
        border-radius: 1px; background: var(--gio-bg-chassis); box-shadow: 0 1px 0 rgba(255, 255, 255, 0.25);
      }
      .hw-switch-gio2026 input[type="checkbox"] + label i:before { left: -5px; }
      .hw-switch-gio2026 input[type="checkbox"] + label i:after { left: 5px; }
      .hw-switch-gio2026.micro input[type="checkbox"] + label i:before { left: -3px; }
      .hw-switch-gio2026.micro input[type="checkbox"] + label i:after { left: 3px; }
      .hw-switch-gio2026 input[type="checkbox"]:checked + label { left: 50%; }
      .hw-switch-gio2026 input[type="checkbox"]:checked + label:before { box-shadow: var(--gio-led-green);  background: #fff;}

      /* ==================== BOTÓN PULSADOR (GlowButtonGio2026) ==================== */
      .glow-btn-gio2026 {
        position: relative; background-color: var(--gio-bg-surface); border: none; border-radius: var(--gio-radius-sm);
        box-shadow: var(--gio-shadow-plate); cursor: pointer; display: inline-flex; align-items: center;
        justify-content: space-between; padding: 0 14px; font-family: inherit; font-size: 13px; color: var(--gio-text-bright);
        user-select: none; height: 38px; box-sizing: border-box; transition: background 0.2s;
      }
      .glow-btn-gio2026:hover { background-color: var(--gio-bg-surface-hover); }
      .glow-btn-gio2026:active { box-shadow: var(--gio-shadow-plate-active); transform: translateY(1px); }
      .glow-btn-gio2026::after {
        content: ''; width: 5px; height: 5px;  border-radius: 50%;
        box-shadow: var(--gio-led-red); transition: box-shadow 0.3s ease;
      }
      .glow-btn-gio2026.led-on::after { box-shadow: var(--gio-led-green);  background: #fff; }

      /* ==================== RADIO & CHECKBOX (RadioGio2026 & CheckboxGio2026) ==================== */
      .radio-wrap-gio2026 {
        display: flex; align-items: center; gap: 12px; cursor: pointer; user-select: none;
        color: var(--gio-text); padding: 8px 12px; border-radius: var(--gio-radius-sm); background: var(--gio-bg-surface);
        box-shadow: var(--gio-shadow-plate); margin-bottom: 6px; transition: background 0.2s, color 0.2s;
      }
      .radio-wrap-gio2026:hover { background: var(--gio-bg-surface-hover); color: #fff; }
      .radio-wrap-gio2026 input { position: absolute; opacity: 0; pointer-events: none; }
      .radio-box-gio2026 {
        position: relative; width: 18px; height: 18px; background: var(--gio-bg-chassis);
        box-shadow: var(--gio-shadow-inset); display: flex; align-items: center; justify-content: center; border-radius: 50%;
      }
      .radio-box-gio2026::after {
        content: ''; width: 5px; height: 5px; border-radius: 50%; background: #fff;
        box-shadow: var(--gio-led-red); opacity: 0.35; transition: 0.25s ease;
      }
      .radio-wrap-gio2026 input:checked + .radio-box-gio2026::after {
        opacity: 1; box-shadow: var(--gio-led-green);
      }

      /* ==================== SELECTOR CON BÚSQUEDA (SelectGio2026) ==================== */
      .select-gio2026 { position: relative; width: 100%; font-family: inherit; user-select: none; }
      .select-gio-trigger {
        display: flex; align-items: center; justify-content: space-between; padding: 8px 12px;
        background: var(--gio-bg-surface); border-radius: var(--gio-radius-md); box-shadow: var(--gio-shadow-plate);
        cursor: pointer; color: var(--gio-text-bright); font-size: 13px;
      }
      .select-gio2026.open .select-gio-arrow { transform: rotate(180deg); }
      .select-gio-panel {
        position: absolute; top: calc(100% + 5px); left: 0; right: 0; background: var(--gio-bg-chassis); border-radius: var(--gio-radius-md);
        box-shadow: 0 10px 25px rgba(0,0,0,0.8), var(--gio-shadow-inset); opacity: 0; pointer-events: none;
        transform: translateY(-5px); transition: all 0.2s ease; z-index: 9999; overflow: hidden;
      }
      .select-gio2026.open .select-gio-panel { opacity: 1; pointer-events: auto; transform: translateY(0); }
      .select-gio-search-bar {
        display: flex; align-items: center; padding: 6px 8px; background: #080808; border-bottom: 1px solid rgba(255, 255, 255, 0.05); gap: 6px;
      }
      .select-gio-search-bar input { flex: 1; background: transparent; border: none; outline: none; color: #fff; font-size: 12px; font-family: inherit; }
      .select-gio-clear-btn {
        width: 16px; height: 16px; background: var(--gio-bg-box); border-radius: 50%; border: none; color: #a0a0a0;
        cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 10px; line-height: 1;
      }
      .select-gio-clear-btn:hover { background: var(--gio-danger); color: #fff; }
      .select-gio-options { max-height: 180px; overflow-y: auto; }
      .select-gio-option { padding: 8px 12px; font-size: 12px; color: var(--gio-text); cursor: pointer; transition: background 0.15s ease; }
      .select-gio-option:hover { background: var(--gio-bg-surface); color: #fff; }
      .select-gio-option.selected { background: #151616; color: var(--gio-accent); box-shadow: inset 2px 0 0 var(--gio-accent); }

      /* ==================== SLIDER (SliderGio2026) ==================== */
      .slider-gio2026 {
        display: flex; flex-direction: column; gap: 10px; padding: 12px 16px;
        background: var(--gio-bg-surface); border-radius: var(--gio-radius-md); box-shadow: var(--gio-shadow-plate); width: 100%;
      }
      .slider-gio-header { display: flex; justify-content: space-between; align-items: center; }
      .slider-gio-label { font-weight: 500; color: var(--gio-text-bright); font-size: 13px; }
      .slider-gio-val { font-family: var(--gio-font-mono); color: var(--gio-accent); font-weight: bold; font-size: 13px; }
      .slider-gio-config {
        display: flex; flex-direction: column; gap: 8px; background: var(--gio-bg-chassis);
        box-shadow: var(--gio-shadow-inset); padding: 10px 12px; border-radius: var(--gio-radius-sm); overflow: hidden; transition: all 0.3s ease;
      }
      .slider-gio-config.hidden { max-height: 0; opacity: 0; padding-top: 0; padding-bottom: 0; margin: 0; pointer-events: none; }
      .slider-gio-config-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
      .slider-gio-config-field { display: flex; flex-direction: column; gap: 4px; }
      .slider-gio-config-field label { font-size: 10px; font-family: var(--gio-font-mono); color: var(--gio-text-dim); font-weight: 600; }
      .slider-gio-config-field input {
        width: 100%; background: #080808; border: none; border-radius: 3px; box-shadow: inset 0 1px 2px 1px rgba(0,0,0,0.8);
        color: var(--gio-accent); font-family: var(--gio-font-mono); font-size: 12px; font-weight: bold; padding: 5px; outline: none; text-align: center;
      }
      .slider-gio-track {
        position: relative; width: 100%; height: 12px; background: var(--gio-bg-chassis); border-radius: 6px;
        box-shadow: var(--gio-shadow-inset); cursor: pointer;
      }
      .slider-gio-fill { position: absolute; top: 0; left: 0; height: 100%; background: #151616; border-radius: 6px; }
      .slider-gio-thumb {
        position: absolute; top: 50%; width: 32px; height: 22px; background: var(--gio-bg-surface); border-radius: 3px;
        box-shadow: var(--gio-shadow-plate); transform: translate(-50%, -50%);
        cursor: grab; display: flex; align-items: center; justify-content: center;
      }
      .slider-gio-thumb::after {
        content: ''; width: 2px; height: 12px; background: var(--gio-bg-chassis);
        box-shadow: -4px 0 0 var(--gio-bg-chassis), 4px 0 0 var(--gio-bg-chassis), 0 1px 0 rgba(255,255,255,0.25), -4px 1px 0 rgba(255,255,255,0.25), 4px 1px 0 rgba(255,255,255,0.25);
      }

      /* ==================== CAJA DE MENSAJES (MessageBoxGio2026) ==================== */
      .messageBox-gio2026 {
        width: fit-content; height: 40px; display: flex; align-items: center; justify-content: center;
        background-color: var(--gio-bg-box); padding: 0 15px; border-radius: 10px; border: 1px solid rgb(63, 63, 63);
        box-shadow: inset 0 1px 1px 1px rgba(0, 0, 0, 0.5), 0 1px 0 0 rgba(255, 255, 255, 0.1);
        user-select: none; box-sizing: border-box; transition: border-color 0.3s;
      }
      .messageBox-gio2026:focus-within { border: 1px solid rgb(110, 110, 110); }
      .fileUploadWrapper-gio { width: fit-content; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; }
      .fileUploadWrapper-gio input[type="file"] { display: none; }
      .fileUploadWrapper-gio label { cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; }
      .fileUploadWrapper-gio label svg { height: 18px; }
      .fileUploadWrapper-gio label:hover svg path { stroke: #fff; }
      .fileUploadWrapper-gio label:hover svg circle { stroke: #fff; fill: #3c3c3c; }
      .fileUploadWrapper-gio label:hover .tooltip-gio { display: block; opacity: 1; }
      .tooltip-gio {
        position: absolute; top: -40px; left: 50%; transform: translateX(-50%); display: none; opacity: 0;
        color: white; font-size: 10px; white-space: nowrap; background-color: #000; padding: 6px 10px;
        border: 1px solid #3c3c3c; border-radius: 5px; box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.596);
        pointer-events: none; transition: all 0.3s; z-index: 1000;
      }
      .messageInput-gio { width: 220px; height: 100%; background-color: transparent; outline: none; border: none; padding-left: 10px; color: white; font-family: inherit; font-size: 13px; }
      .sendButton-gio { width: fit-content; height: 100%; background-color: transparent; outline: none; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0 4px; }
      .sendButton-gio svg { height: 18px; transition: all 0.3s; }
      .sendButton-gio:hover svg path, .messageInput-gio:focus ~ .sendButton-gio svg path { fill: #3c3c3c; stroke: white; }

      /* ==================== ACORDEÓN & PANELES (AccordionGio2026 & PanelGio2026) ==================== */
      .accordion-gio2026 { display: flex; flex-direction: column; gap: 10px; width: 100%; }
      .accordion-item-gio2026 {
        background: var(--gio-bg-surface); border-radius: var(--gio-radius-md); box-shadow: var(--gio-shadow-plate);
        overflow: hidden; transition: all 0.25s ease;
      }
      .accordion-item-gio2026.dragging-gio { opacity: 0.4; transform: scale(0.98); }
      .accordion-item-gio2026.dragover-gio { box-shadow: var(--gio-led-green); }
      .acc-item-header-gio {
        display: flex; align-items: center; justify-content: space-between; padding: 10px 15px; cursor: grab;
        user-select: none; background: var(--gio-bg-surface); border-bottom: 1px solid rgba(0, 0, 0, 0.4); box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
      }
      .acc-item-title-gio { color: var(--gio-text-bright); font-weight: 500; font-size: 13px; }
      .acc-chevron-gio svg { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); stroke: var(--gio-text); display: block; }
      .accordion-item-gio2026:not(.collapsed) .acc-chevron-gio svg { transform: rotate(180deg); stroke: var(--gio-accent); }
      .acc-item-body-gio {
        padding: 14px; background: var(--gio-bg-chassis); box-shadow: var(--gio-shadow-inset);
        overflow-y: auto; display: flex; flex-direction: column; gap: 10px;
      }
      .accordion-item-gio2026.collapsed .acc-item-body-gio { display: none; }

      /* ==================== TABLA (TableGio2026) ==================== */
      .table-gio2026 {
        display: flex; flex-direction: column; gap: 12px; width: 100%; background: var(--gio-bg-surface);
        box-shadow: var(--gio-shadow-plate); border-radius: var(--gio-radius-md); padding: 16px;
      }
      .table-gio-bar { display: flex; justify-content: space-between; gap: 12px; }
      .table-gio-search {
        flex: 1; max-width: 320px; background: var(--gio-bg-chassis); box-shadow: var(--gio-shadow-inset);
        border: none; border-radius: 3px; color: #fff; padding: 8px 12px; font-family: inherit; outline: none;
      }
      .table-gio-scroll { overflow-x: auto; background: var(--gio-bg-chassis); border-radius: 4px; box-shadow: var(--gio-shadow-inset); }
      .table-gio-el { width: 100%; border-collapse: collapse; text-align: left; }
      .table-gio-el th, .table-gio-el td { padding: 12px 16px; border-bottom: 1px solid rgba(0, 0, 0, 0.4); }
      .table-gio-el th { color: var(--gio-text-dim); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
      .table-gio-el tbody tr:hover td { background: rgba(255, 255, 255, 0.02); color: #fff; }
      .table-gio-del {
        background: var(--gio-bg-surface); border: none; box-shadow: var(--gio-shadow-plate);
        color: #f25f5c; cursor: pointer; padding: 4px 10px; border-radius: 3px; font-size: 11px;
      }
      .table-gio-del:active { transform: translateY(1px); }
      .table-gio-foot { display: flex; justify-content: space-between; align-items: center; color: var(--gio-text-dim); font-size: 12px; }
      .table-gio-foot button {
        background: var(--gio-bg-surface); box-shadow: var(--gio-shadow-plate);
        border: none; color: #fff; border-radius: 3px; padding: 4px 10px; cursor: pointer;
      }

      /* ==================== INPUTS Y TEXTAREAS ==================== */
      .input-wrap-gio2026 { display: flex; flex-direction: column; gap: 6px; width: 100%; user-select: none; }
      .input-label-gio { font-size: 11px; font-family: var(--gio-font-mono); color: var(--gio-text); text-transform: uppercase; letter-spacing: 0.5px; }
      .input-box-gio {
        position: relative; display: flex; align-items: center; background: var(--gio-bg-chassis); border-radius: var(--gio-radius-md);
        box-shadow: var(--gio-shadow-inset); padding: 0 10px; height: 38px; box-sizing: border-box; transition: box-shadow 0.2s;
      }
      .input-box-gio:focus-within { box-shadow: inset 0 1px 2px 1px rgba(0, 0, 0, 0.8), 0 0 6px 1px rgba(15, 165, 70, 0.5); }
      .input-el-gio { flex: 1; background: transparent; border: none; outline: none; color: #fff; font-family: inherit; font-size: 13px; height: 100%; width: 100%; }
      .input-el-gio[type="color"] { padding: 0; cursor: pointer; border-radius: 4px; height: 26px; }
      .input-action-btn-gio {
        background: var(--gio-bg-surface); border: none; border-radius: 3px; color: var(--gio-text); cursor: pointer;
        display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; font-size: 11px; margin-left: 6px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
      }
      .input-action-btn-gio:hover { color: #fff; background: var(--gio-bg-surface-hover); }
      .textarea-wrap-gio2026 { display: flex; flex-direction: column; gap: 6px; width: 100%; }
      .textarea-el-gio {
        width: 100%; background: var(--gio-bg-chassis); border-radius: var(--gio-radius-md); border: none; outline: none;
        box-shadow: var(--gio-shadow-inset); color: #fff; padding: 10px; font-family: inherit; font-size: 13px; box-sizing: border-box; resize: vertical;
      }
      .textarea-el-gio:focus { box-shadow: inset 0 1px 2px 1px rgba(0,0,0,0.8), 0 0 6px 1px rgba(15, 165, 70, 0.5); }

      /* ==================== ARCHIVOS (FileGio2026) ==================== */
      .file-zone-gio2026 {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        background: var(--gio-bg-chassis); border: 1px dashed rgba(255,255,255,0.2); border-radius: var(--gio-radius-md);
        padding: 20px; cursor: pointer; text-align: center; gap: 8px; box-shadow: var(--gio-shadow-inset); transition: all 0.25s;
      }
      .file-zone-gio2026:hover { border-color: var(--gio-accent); background: #121313; }
      .file-zone-gio2026 input { display: none; }
      .file-info-gio { font-size: 11px; font-family: var(--gio-font-mono); color: var(--gio-text); }

      /* ==================== SEMÁNTICOS (Fieldset, Details, Dialog) ==================== */
      .fieldset-gio2026 {
        border: 1px solid rgba(255, 255, 255, 0.1); border-radius: var(--gio-radius-md); padding: 14px;
        background: var(--gio-bg-surface); box-shadow: var(--gio-shadow-plate);
      }
      .fieldset-gio2026 legend {
        color: var(--gio-accent); font-size: 11px; font-family: var(--gio-font-mono); padding: 0 8px;
      }
      .details-gio2026 {
        background: var(--gio-bg-surface); border-radius: var(--gio-radius-md); padding: 10px 14px;
        color: #fff; box-shadow: var(--gio-shadow-plate);
      }
      .details-gio2026 summary { cursor: pointer; font-weight: 500; color: var(--gio-accent); }
      .dialog-gio2026 {
        background: var(--gio-bg-chassis); border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: var(--gio-radius-md); color: #fff; padding: 0; box-shadow: 0 20px 40px rgba(0,0,0,0.9);
        max-width: 500px; width: 90%;
      }
      .dialog-gio-head {
        display: flex; justify-content: space-between; align-items: center; padding: 12px 16px;
        background: var(--gio-bg-surface); border-bottom: 1px solid rgba(255,255,255,0.1);
      }

      /* ==================== VISORES DE IMÁGENES ==================== */
      .img-slider-gio2026 {
        position: relative; width: 100%; height: 320px; background: var(--gio-bg-chassis); border-radius: var(--gio-radius-md);
        overflow: hidden; box-shadow: var(--gio-shadow-inset); display: flex; align-items: center; justify-content: center;
      }
      .img-slider-view { width: 100%; height: 100%; object-fit: contain; }
      .img-slider-nav {
        position: absolute; top: 50%; transform: translateY(-50%); background: rgba(27, 28, 28, 0.85);
        color: #fff; border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
        display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.6);
      }
      .img-slider-nav.prev { left: 12px; }
      .img-slider-nav.next { right: 12px; }
      .img-slider-bullets { position: absolute; bottom: 12px; display: flex; gap: 6px; }
      .img-slider-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gio-text-dim); cursor: pointer; }
      .img-slider-dot.active { background: var(--gio-accent); box-shadow: var(--gio-led-green); }

      .img-grid-gio2026 { display: grid; gap: 12px; width: 100%; }
      .img-grid-thumb {
        position: relative; width: 100%; height: 110px; background: var(--gio-bg-chassis); border-radius: var(--gio-radius-md);
        overflow: hidden; cursor: pointer; box-shadow: inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 5px rgba(0,0,0,0.4);
        transition: transform 0.2s;
      }
      .img-grid-thumb:hover { transform: scale(1.03); }
      .img-grid-thumb img { width: 100%; height: 100%; object-fit: cover; }
      .img-grid-lightbox {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.9);
        display: none; align-items: center; justify-content: center; z-index: 99999;
      }
      .img-grid-lightbox.active { display: flex; }
      .img-grid-lightbox img { max-width: 90%; max-height: 90%; border-radius: var(--gio-radius-md); box-shadow: 0 0 30px rgba(0,0,0,0.8); }
    `;
  }
}

/* ============================================================================
   2. SWITCH CÁPSULA: SwitchGio2026
   ============================================================================ */
class SwitchGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.id = options.id || 'sw-capsule-' + Math.random().toString(36).substr(2, 9);
    this.initialValue = options.value !== undefined ? !!options.value : !!options.checked;
    this._checked = this.initialValue;
    this._disabled = !!options.disabled;
    this.customData = options.data || null;
    this.width = options.width || 80;
    this.height = options.height || 40;

    this._listeners = new Map();
    if (typeof options.onChange === 'function') this.on('change', options.onChange);

    if (this.target) {
      this.render();
      this.initEvents();
    }
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'switch-gio2026' + (this._disabled ? ' disabled' : '');
    this.wrapper.style.width = this.width + 'px';
    this.wrapper.style.height = this.height + 'px';

    this.input = document.createElement('input');
    this.input.type = 'checkbox';
    this.input.id = this.id;
    this.input.checked = this._checked;
    this.input.disabled = this._disabled;

    this.label = document.createElement('label');
    this.label.htmlFor = this.id;
    this.label.innerHTML = '<i></i>';

    this.wrapper.appendChild(this.input);
    this.wrapper.appendChild(this.label);

    this.target.innerHTML = '';
    this.target.appendChild(this.wrapper);
  }

  initEvents() {
    this.input.addEventListener('change', () => {
      this._checked = this.input.checked;
      this._notify();
    });
  }

  setValue(val) {
    const b = !!val;
    if (this._checked !== b) {
      this._checked = b;
      if (this.input) this.input.checked = b;
      this._notify();
    }
    return this;
  }
  setChecked(b) { return this.setValue(b); }
  toggle() { return this.setValue(!this._checked); }
  getValue() { return this._checked; }
  isChecked() { return this._checked; }
  setData(d) { this.customData = d; return this; }
  getData() { return this.customData; }
  setDisabled(st) {
    this._disabled = !!st;
    if (this.input) this.input.disabled = this._disabled;
    if (this.wrapper) this.wrapper.classList.toggle('disabled', this._disabled);
    return this;
  }
  reset() { return this.setValue(this.initialValue); }
  getState() {
    return { id: this.id, value: this._checked, checked: this._checked, data: this.customData, target: this, timestamp: Date.now() };
  }
  _notify() {
    const p = this.getState();
    this.emit('change', p);
    this.emit('toggle', p);
  }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
  destroy() { this._listeners.clear(); if (this.wrapper) this.wrapper.remove(); }
}

/* ============================================================================
   3. SWITCH INDUSTRIAL: HardwareSwitchGio2026
   ============================================================================ */
class HardwareSwitchGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.id = options.id || 'hw-sw-' + Math.random().toString(36).substr(2, 9);
    this._checked = options.value !== undefined ? !!options.value : !!options.checked;
    this.micro = !!options.micro;
    this.customData = options.data || null;

    this._listeners = new Map();
    if (typeof options.onChange === 'function') this.on('change', options.onChange);

    if (this.target) {
      this.render();
      this.initEvents();
    }
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'hw-switch-gio2026' + (this.micro ? ' micro' : '');
    this.input = document.createElement('input');
    this.input.type = 'checkbox';
    this.input.id = this.id;
    this.input.checked = this._checked;

    this.label = document.createElement('label');
    this.label.htmlFor = this.id;
    this.label.innerHTML = '<i></i>';

    this.wrapper.appendChild(this.input);
    this.wrapper.appendChild(this.label);

    this.target.innerHTML = '';
    this.target.appendChild(this.wrapper);
  }

  initEvents() {
    this.input.addEventListener('change', () => {
      this._checked = this.input.checked;
      this.emit('change', { id: this.id, value: this._checked, checked: this._checked, data: this.customData, target: this });
    });
  }

  setValue(val) {
    this._checked = !!val;
    if (this.input) this.input.checked = this._checked;
    this.emit('change', { id: this.id, value: this._checked, checked: this._checked, data: this.customData, target: this });
    return this;
  }
  getValue() { return this._checked; }
  toggle() { return this.setValue(!this._checked); }
  getElement() { return this.wrapper; }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

/* ============================================================================
   4. BOTÓN CON LED: GlowButtonGio2026
   ============================================================================ */
class GlowButtonGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.button = typeof target === 'string' ? document.getElementById(target) : target;
    this.id = options.id || 'btn-gio-' + Math.random().toString(36).substr(2, 9);
    this.label = options.label !== undefined ? options.label : 'DISPARADOR';
    this.width = options.width || 140;
    this.ledState = options.ledState === 'on' ? 'on' : 'off';
    this.customData = options.data || null;

    this._listeners = new Map();
    if (typeof options.onClick === 'function') this.on('click', options.onClick);
    if (this.button) this.init();
  }

  init() {
    this.button.classList.add('glow-btn-gio2026');
    this.button.style.width = this.width + 'px';
    this.button.innerHTML = `<span>${this.label}</span>`;
    this.button.classList.toggle('led-on', this.ledState === 'on');

    this.button.addEventListener('click', () => {
      this.toggleLed();
      this.emit('click', { id: this.id, ledState: this.ledState, data: this.customData, target: this });
    });
  }

  toggleLed() {
    this.ledState = this.ledState === 'off' ? 'on' : 'off';
    this.button.classList.toggle('led-on', this.ledState === 'on');
    return this;
  }
  setLedState(state) {
    this.ledState = state;
    this.button.classList.toggle('led-on', state === 'on');
    return this;
  }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

/* ============================================================================
   5. RADIOS & CHECKBOXES: RadioGio2026 & CheckboxGio2026
   ============================================================================ */
class RadioGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.container = typeof target === 'string' ? document.getElementById(target) : target;
    this.name = options.name || 'radio-gio-' + Date.now();
    this.items = options.items || [];
    this.selected = options.selected !== undefined ? options.selected : null;
    this.customData = options.data || null;

    this._listeners = new Map();
    if (typeof options.onChange === 'function') this.on('change', options.onChange);
    if (this.container) this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.items.forEach((item, index) => {
      const val = item.value !== undefined ? item.value : index;
      const lbl = item.label !== undefined ? item.label : String(val);

      const wrap = document.createElement('label');
      wrap.className = 'radio-wrap-gio2026';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = this.name;
      input.value = val;
      if (this.selected === val) input.checked = true;

      const box = document.createElement('span');
      box.className = 'radio-box-gio2026';
      const text = document.createElement('span');
      text.textContent = lbl;

      input.addEventListener('change', () => {
        if (input.checked) {
          this.selected = val;
          this.emit('change', { value: this.selected, label: lbl, data: this.customData, target: this });
        }
      });

      wrap.appendChild(input);
      wrap.appendChild(box);
      wrap.appendChild(text);
      this.container.appendChild(wrap);
    });
  }

  setValue(val) {
    this.selected = val;
    this.render();
    this.emit('change', { value: this.selected, data: this.customData, target: this });
    return this;
  }
  getValue() { return this.selected; }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

class CheckboxGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.container = typeof target === 'string' ? document.getElementById(target) : target;
    this.items = options.items || [];
    this.values = options.values || [];
    this.customData = options.data || null;

    this._listeners = new Map();
    if (typeof options.onChange === 'function') this.on('change', options.onChange);
    if (this.container) this.render();
  }

  render() {
    this.container.innerHTML = '';
    this.inputs = [];
    this.items.forEach((item, index) => {
      const val = item.value !== undefined ? item.value : index;
      const lbl = item.label !== undefined ? item.label : String(val);

      const wrap = document.createElement('label');
      wrap.className = 'radio-wrap-gio2026';
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = val;
      if (this.values.includes(val)) input.checked = true;

      const box = document.createElement('span');
      box.className = 'radio-box-gio2026';
      box.style.borderRadius = '3px';
      const text = document.createElement('span');
      text.textContent = lbl;

      input.addEventListener('change', () => {
        this.values = this.inputs.filter(i => i.checked).map(i => i.value);
        this.emit('change', { values: this.values, data: this.customData, target: this });
      });

      this.inputs.push(input);
      wrap.appendChild(input);
      wrap.appendChild(box);
      wrap.appendChild(text);
      this.container.appendChild(wrap);
    });
  }

  setValues(arr) {
    this.values = [...arr];
    this.render();
    this.emit('change', { values: this.values, data: this.customData, target: this });
    return this;
  }
  getValues() { return this.values; }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

/* ============================================================================
   6. SELECTOR CON BÚSQUEDA Y 'X': SelectGio2026
   ============================================================================ */
class SelectGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.id = options.id || 'sel-gio-' + Math.random().toString(36).substr(2, 9);
    this.items = options.items || [];
    this.selected = options.selected !== undefined ? options.selected : null;
    this.placeholder = options.placeholder || 'Seleccionar...';
    this.customData = options.data || null;
    this.isOpen = false;

    this._listeners = new Map();
    if (typeof options.onChange === 'function') this.on('change', options.onChange);

    if (this.target) {
      this.render();
      this.initEvents();
    }
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'select-gio2026';
    this.wrapper.innerHTML = `
      <div class="select-gio-trigger">
        <span class="trigger-label">${this.getSelectedLabel() || this.placeholder}</span>
        <span class="select-gio-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </span>
      </div>
      <div class="select-gio-panel">
        <div class="select-gio-search-bar">
          <input type="text" placeholder="Buscar..." />
          <button type="button" class="select-gio-clear-btn" title="Limpiar">✕</button>
        </div>
        <div class="select-gio-options"></div>
      </div>
    `;

    this.trigger = this.wrapper.querySelector('.select-gio-trigger');
    this.triggerLabel = this.wrapper.querySelector('.trigger-label');
    this.panel = this.wrapper.querySelector('.select-gio-panel');
    this.searchInput = this.wrapper.querySelector('input');
    this.clearBtn = this.wrapper.querySelector('.select-gio-clear-btn');
    this.optionsBox = this.wrapper.querySelector('.select-gio-options');

    this.target.innerHTML = '';
    this.target.appendChild(this.wrapper);
    this.renderOptions(this.items);
  }

  renderOptions(list) {
    this.optionsBox.innerHTML = '';
    list.forEach((item, idx) => {
      const val = item.value !== undefined ? item.value : idx;
      const lbl = item.label !== undefined ? item.label : String(val);
      const opt = document.createElement('div');
      opt.className = 'select-gio-option' + (String(this.selected) === String(val) ? ' selected' : '');
      opt.textContent = lbl;
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setValue(val);
        this.close();
      });
      this.optionsBox.appendChild(opt);
    });
  }

  initEvents() {
    this.trigger.addEventListener('click', (e) => { e.stopPropagation(); this.toggle(); });
    this.searchInput.addEventListener('input', () => {
      const q = this.searchInput.value.toLowerCase();
      this.renderOptions(this.items.filter(i => (i.label || String(i.value)).toLowerCase().includes(q)));
    });
    this.clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.searchInput.value) {
        this.searchInput.value = '';
        this.renderOptions(this.items);
      } else {
        this.setValue(null);
      }
    });
    document.addEventListener('click', () => { if (this.isOpen) this.close(); });
  }

  getSelectedLabel() {
    const f = this.items.find(i => String(i.value) === String(this.selected));
    return f ? f.label : null;
  }
  setValue(val) {
    this.selected = val;
    this.triggerLabel.textContent = this.getSelectedLabel() || this.placeholder;
    this.renderOptions(this.items);
    this.emit('change', { value: this.selected, label: this.getSelectedLabel(), data: this.customData, target: this });
    return this;
  }
  getValue() { return this.selected; }
  toggle() { this.isOpen ? this.close() : this.open(); }
  open() { this.isOpen = true; this.wrapper.classList.add('open'); setTimeout(() => this.searchInput.focus(), 50); }
  close() { this.isOpen = false; this.wrapper.classList.remove('open'); }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

/* ============================================================================
   7. SLIDER: SliderGio2026
   ============================================================================ */
class SliderGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.container = typeof target === 'string' ? document.getElementById(target) : target;
    this.label = options.label || 'POTENCIÓMETRO';
    this.min = options.min !== undefined ? Number(options.min) : 0;
    this.max = options.max !== undefined ? Number(options.max) : 100;
    this.step = options.step !== undefined ? Number(options.step) : 1;
    this.value = options.value !== undefined ? Number(options.value) : this.min;
    this.unit = options.unit || '';
    this.showConfig = !!options.showConfig;
    this.customData = options.data || null;

    this._listeners = new Map();
    if (typeof options.onChange === 'function') this.on('change', options.onChange);
    if (this.container) {
      this.render();
      this.init();
    }
  }

  render() {
    this.container.innerHTML = '';
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'slider-gio2026';

    this.header = document.createElement('div');
    this.header.className = 'slider-gio-header';
    this.header.innerHTML = `
      <span class="slider-gio-label">${this.label}</span>
      <div style="display:flex; align-items:center; gap:12px;">
        <span class="slider-gio-val">${this.value}${this.unit}</span>
      </div>
    `;

    this.configToggle = new HardwareSwitchGio2026(document.createElement('div'), {
      micro: true,
      value: this.showConfig,
      onChange: ({ value }) => {
        this.showConfig = value;
        this.configPanel.classList.toggle('hidden', !this.showConfig);
      }
    });
    this.header.querySelector('div').appendChild(this.configToggle.getElement());

    this.configPanel = document.createElement('div');
    this.configPanel.className = 'slider-gio-config' + (this.showConfig ? '' : ' hidden');
    this.configPanel.innerHTML = `
      <div style="font-size:10px; font-family:monospace; color:var(--gio-text-dim); text-transform:uppercase;">Calibración de Entrada</div>
      <div class="slider-gio-config-grid">
        <div class="slider-gio-config-field"><label>MIN</label><input type="number" class="c-min" value="${this.min}"></div>
        <div class="slider-gio-config-field"><label>MAX</label><input type="number" class="c-max" value="${this.max}"></div>
        <div class="slider-gio-config-field"><label>PASO</label><input type="number" class="c-stp" value="${this.step}" min="0.0001"></div>
      </div>
    `;

    this.trackBody = document.createElement('div');
    this.trackBody.innerHTML = `
      <div class="slider-gio-track">
        <div class="slider-gio-fill"></div>
        <div class="slider-gio-thumb"></div>
      </div>
    `;

    this.wrapper.appendChild(this.header);
    this.wrapper.appendChild(this.configPanel);
    this.wrapper.appendChild(this.trackBody);
    this.container.appendChild(this.wrapper);
  }

  init() {
    this.track = this.trackBody.querySelector('.slider-gio-track');
    this.fill = this.trackBody.querySelector('.slider-gio-fill');
    this.thumb = this.trackBody.querySelector('.slider-gio-thumb');
    this.valLabel = this.header.querySelector('.slider-gio-val');

    const inMin = this.configPanel.querySelector('.c-min');
    const inMax = this.configPanel.querySelector('.c-max');
    const inStp = this.configPanel.querySelector('.c-stp');

    const applyCfg = () => {
      let nMin = parseFloat(inMin.value);
      let nMax = parseFloat(inMax.value);
      let nStp = parseFloat(inStp.value);
      if (isNaN(nMin)) nMin = this.min;
      if (isNaN(nMax)) nMax = this.max;
      if (isNaN(nStp) || nStp <= 0) nStp = 1;
      if (nMin >= nMax) { nMax = nMin + 1; inMax.value = nMax; }
      this.min = nMin; this.max = nMax; this.step = nStp;
      this.setValue(Math.max(this.min, Math.min(this.max, this.value)));
    };

    inMin.addEventListener('change', applyCfg);
    inMax.addEventListener('change', applyCfg);
    inStp.addEventListener('change', applyCfg);

    let dragging = false;
    const calc = (e) => {
      const rect = this.track.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const raw = this.min + ratio * (this.max - this.min);
      const steps = Math.round((raw - this.min) / this.step);
      let stepped = this.min + steps * this.step;
      const dec = (this.step.toString().split('.')[1] || '').length;
      this.setValue(Number(stepped.toFixed(dec)));
    };

    this.track.addEventListener('mousedown', (e) => { dragging = true; calc(e); });
    document.addEventListener('mousemove', (e) => { if (dragging) calc(e); });
    document.addEventListener('mouseup', () => { dragging = false; });

    this.track.addEventListener('touchstart', (e) => { dragging = true; calc(e); }, { passive: true });
    document.addEventListener('touchmove', (e) => { if (dragging) calc(e); }, { passive: true });
    document.addEventListener('touchend', () => { dragging = false; });

    this.updateVisual();
  }

  setValue(val) {
    this.value = Math.max(this.min, Math.min(this.max, val));
    this.updateVisual();
    this.emit('change', { value: this.value, data: this.customData, target: this });
    return this;
  }
  getValue() { return this.value; }
  updateVisual() {
    const r = this.max - this.min;
    const p = r === 0 ? 0 : Math.max(0, Math.min(100, ((this.value - this.min) / r) * 100));
    this.fill.style.width = `${p}%`;
    this.thumb.style.left = `${p}%`;
    this.valLabel.textContent = `${this.value}${this.unit}`;
  }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

/* ============================================================================
   8. CAJA DE MENSAJES: MessageBoxGio2026
   ============================================================================ */
class MessageBoxGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.id = options.id || 'msg-gio-' + Math.random().toString(36).substr(2, 9);
    this.placeholder = options.placeholder || 'Message...';
    this.tooltipText = options.tooltipText || 'Add an image';
    this.customData = options.data || null;
    this.value = options.value || '';
    this.selectedFile = null;

    this._listeners = new Map();
    if (typeof options.onSend === 'function') this.on('send', options.onSend);
    if (this.target) {
      this.render();
      this.initEvents();
    }
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'messageBox-gio2026';
    this.wrapper.innerHTML = `
      <div class="fileUploadWrapper-gio">
        <label for="${this.id}-f">
          <svg fill="none" viewBox="0 0 337 337">
            <circle stroke-width="20" stroke="#6c6c6c" fill="none" r="158.5" cy="168.5" cx="168.5"></circle>
            <path stroke-linecap="round" stroke-width="25" stroke="#6c6c6c" d="M167.759 79V259"></path>
            <path stroke-linecap="round" stroke-width="25" stroke="#6c6c6c" d="M79 167.138H259"></path>
          </svg>
          <span class="tooltip-gio">${this.tooltipText}</span>
        </label>
        <input type="file" id="${this.id}-f" />
      </div>
      <input type="text" class="messageInput-gio" placeholder="${this.placeholder}" value="${this.value}" />
      <button class="sendButton-gio" type="button">
        <svg fill="none" viewBox="0 0 664 663">
          <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
          <path stroke-linejoin="round" stroke-linecap="round" stroke-width="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
        </svg>
      </button>
    `;

    this.input = this.wrapper.querySelector('.messageInput-gio');
    this.fileInput = this.wrapper.querySelector('input[type="file"]');
    this.sendBtn = this.wrapper.querySelector('.sendButton-gio');

    this.target.innerHTML = '';
    this.target.appendChild(this.wrapper);
  }

  initEvents() {
    this.sendBtn.addEventListener('click', () => this.send());
    this.input.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.send(); });
    this.input.addEventListener('input', () => { this.value = this.input.value; });
    this.fileInput.addEventListener('change', (e) => {
      this.selectedFile = e.target.files[0] || null;
      this.emit('file', { file: this.selectedFile, data: this.customData, target: this });
    });
  }

  send() {
    const text = this.input.value.trim();
    if (!text && !this.selectedFile) return;
    this.emit('send', { id: this.id, text, file: this.selectedFile, data: this.customData, timestamp: Date.now(), target: this });
    this.clear();
  }

  clear() {
    this.input.value = '';
    this.value = '';
    this.fileInput.value = '';
    this.selectedFile = null;
  }
  setValue(t) { this.value = t; if (this.input) this.input.value = t; return this; }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

/* ============================================================================
   9. ACORDEÓN DRAGGABLE: AccordionItemGio2026 & AccordionGio2026
   ============================================================================ */
class AccordionItemGio2026 {
  constructor(options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.id = options.id || 'acc-item-' + Math.random().toString(36).substr(2, 9);
    this.title = options.title || 'Módulo';
    this.collapsed = options.collapsed !== undefined ? !!options.collapsed : true;
    this.minHeight = options.minHeight || '40px';
    this.maxHeight = options.maxHeight || '350px';
    this.draggable = options.draggable !== undefined ? !!options.draggable : true;
    this.customData = options.data || null;
    this.parentAccordion = null;

    this._listeners = new Map();
    if (typeof options.onToggle === 'function') this.on('toggle', options.onToggle);
    this.render();
  }

  render() {
    this.el = document.createElement('div');
    this.el.className = 'accordion-item-gio2026' + (this.collapsed ? ' collapsed' : '');
    this.el.id = this.id;
    if (this.draggable) this.el.draggable = true;

    this.header = document.createElement('div');
    this.header.className = 'acc-item-header-gio';
    this.header.innerHTML = `
      <span class="acc-item-title-gio">${this.title}</span>
      <span class="acc-chevron-gio">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </span>
    `;

    this.body = document.createElement('div');
    this.body.className = 'acc-item-body-gio';
    this.body.style.minHeight = this.minHeight;
    this.body.style.maxHeight = this.maxHeight;

    this.el.appendChild(this.header);
    this.el.appendChild(this.body);

    this.header.addEventListener('click', () => this.toggle());

    if (this.draggable) {
      this.el.addEventListener('dragstart', (e) => {
        this.el.classList.add('dragging-gio');
        e.dataTransfer.setData('text/plain', this.id);
      });
      this.el.addEventListener('dragend', () => {
        this.el.classList.remove('dragging-gio');
        document.querySelectorAll('.accordion-item-gio2026').forEach(el => el.classList.remove('dragover-gio'));
      });
      this.el.addEventListener('dragover', (e) => { e.preventDefault(); this.el.classList.add('dragover-gio'); });
      this.el.addEventListener('dragleave', () => this.el.classList.remove('dragover-gio'));
      this.el.addEventListener('drop', (e) => {
        e.preventDefault();
        this.el.classList.remove('dragover-gio');
        const src = e.dataTransfer.getData('text/plain');
        if (src && src !== this.id && this.parentAccordion) this.parentAccordion.swapItems(src, this.id);
      });
    }
  }

  toggle() { this.setCollapsed(!this.collapsed); }
  setCollapsed(c) {
    if (this.parentAccordion && this.parentAccordion.singleOpen && !c) this.parentAccordion.closeOthers(this.id);
    this.collapsed = !!c;
    this.el.classList.toggle('collapsed', this.collapsed);
    this.emit('toggle', { id: this.id, collapsed: this.collapsed, data: this.customData, target: this });
  }
  append(elem) {
    if (typeof elem === 'string') this.body.innerHTML += elem;
    else if (elem instanceof HTMLElement) this.body.appendChild(elem);
    return this;
  }
  getElement() { return this.el; }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

class AccordionGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.singleOpen = !!options.singleOpen;
    this.items = new Map();
    if (this.target) this.render();
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'accordion-gio2026';
    this.target.appendChild(this.wrapper);
  }

  addItem(opts) {
    const item = opts instanceof AccordionItemGio2026 ? opts : new AccordionItemGio2026(opts);
    item.parentAccordion = this;
    this.items.set(item.id, item);
    this.wrapper.appendChild(item.getElement());
    return item;
  }

  closeOthers(exId) {
    this.items.forEach(i => { if (i.id !== exId && !i.collapsed) i.setCollapsed(true); });
  }

  swapItems(srcId, tgtId) {
    const s = document.getElementById(srcId);
    const t = document.getElementById(tgtId);
    if (!s || !t) return;
    const ch = Array.from(this.wrapper.children);
    if (ch.indexOf(s) < ch.indexOf(t)) this.wrapper.insertBefore(s, t.nextSibling);
    else this.wrapper.insertBefore(s, t);
  }
}

/* ============================================================================
   10. PANELES & GRID: PanelGio2026 & ContainerGio2026
   ============================================================================ */
class PanelGio2026 {
  constructor(options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.title = options.title || 'Módulo';
    this.id = options.id || 'pnl-' + Math.random().toString(36).substr(2, 9);
    this.collapsed = !!options.collapsed;
    this.customData = options.data || null;
    this.render();
  }

  render() {
    this.el = document.createElement('div');
    this.el.className = 'accordion-item-gio2026' + (this.collapsed ? ' collapsed' : '');
    this.el.id = this.id;

    this.header = document.createElement('div');
    this.header.className = 'acc-item-header-gio';
    this.header.style.cursor = 'default';

    this.titleEl = document.createElement('span');
    this.titleEl.className = 'acc-item-title-gio';
    this.titleEl.textContent = this.title;

    this.sw = new HardwareSwitchGio2026(document.createElement('div'), {
      micro: true,
      value: !this.collapsed,
      onChange: ({ value }) => {
        this.collapsed = !value;
        this.el.classList.toggle('collapsed', this.collapsed);
      }
    });

    this.header.appendChild(this.titleEl);
    this.header.appendChild(this.sw.getElement());

    this.body = document.createElement('div');
    this.body.className = 'acc-item-body-gio';

    this.el.appendChild(this.header);
    this.el.appendChild(this.body);
  }

  append(e) {
    if (typeof e === 'string') this.body.innerHTML += e;
    else if (e instanceof HTMLElement) this.body.appendChild(e);
    return this;
  }
  getElement() { return this.el; }
}

class ContainerGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.el = typeof target === 'string' ? document.getElementById(target) : target;
    this.gap = options.gap || 16;
    if (this.el) {
      this.el.style.display = 'grid';
      this.el.style.gap = `${this.gap}px`;
      this.el.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    }
  }

  addPanel(p) {
    this.el.appendChild(p.getElement());
    return p;
  }
}

/* ============================================================================
   11. TABLA: TableGio2026
   ============================================================================ */
class TableGio2026 {
  constructor(containerId, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    this.columns = options.columns || [];
    this.data = options.data ? [...options.data] : [];
    this.filteredData = [...this.data];
    this.pageSize = options.pageSize || 5;
    this.currentPage = 1;

    if (this.container) {
      this.render();
      this.updateView();
    }
  }

  render() {
    this.container.innerHTML = '';
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'table-gio2026';
    this.wrapper.innerHTML = `
      <div class="table-gio-bar">
        <input type="text" class="table-gio-search" placeholder="Filtrar registros...">
      </div>
      <div class="table-gio-scroll">
        <table class="table-gio-el"><thead><tr></tr></thead><tbody></tbody></table>
      </div>
      <div class="table-gio-foot">
        <span class="info"></span>
        <div>
          <button class="prev">◀</button>
          <span class="page" style="margin: 0 8px;"></span>
          <button class="next">▶</button>
        </div>
      </div>
    `;

    this.theadTr = this.wrapper.querySelector('thead tr');
    this.tbody = this.wrapper.querySelector('tbody');
    this.searchInput = this.wrapper.querySelector('.table-gio-search');
    this.btnPrev = this.wrapper.querySelector('.prev');
    this.btnNext = this.wrapper.querySelector('.next');
    this.info = this.wrapper.querySelector('.info');
    this.page = this.wrapper.querySelector('.page');

    this.searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      this.filteredData = this.data.filter(row => this.columns.some(c => String(row[c.key] || '').toLowerCase().includes(q)));
      this.currentPage = 1;
      this.updateView();
    });

    this.btnPrev.addEventListener('click', () => { if (this.currentPage > 1) { this.currentPage--; this.updateView(); } });
    this.btnNext.addEventListener('click', () => {
      const max = Math.ceil(this.filteredData.length / this.pageSize) || 1;
      if (this.currentPage < max) { this.currentPage++; this.updateView(); }
    });

    this.container.appendChild(this.wrapper);
  }

  updateView() {
    this.theadTr.innerHTML = '';
    this.columns.forEach(c => {
      const th = document.createElement('th');
      th.textContent = c.label || c.key;
      this.theadTr.appendChild(th);
    });
    const thAct = document.createElement('th');
    thAct.textContent = 'ACCIÓN';
    thAct.style.textAlign = 'right';
    this.theadTr.appendChild(thAct);

    this.tbody.innerHTML = '';
    const st = (this.currentPage - 1) * this.pageSize;
    const rows = this.filteredData.slice(st, st + this.pageSize);

    rows.forEach(row => {
      const tr = document.createElement('tr');
      this.columns.forEach(c => {
        const td = document.createElement('td');
        td.textContent = row[c.key] !== undefined ? row[c.key] : '';
        tr.appendChild(td);
      });
      const tdAct = document.createElement('td');
      tdAct.style.textAlign = 'right';
      const b = document.createElement('button');
      b.className = 'table-gio-del';
      b.textContent = '✕';
      b.addEventListener('click', () => {
        this.data = this.data.filter(r => r !== row);
        this.filteredData = this.filteredData.filter(r => r !== row);
        this.updateView();
      });
      tdAct.appendChild(b);
      tr.appendChild(tdAct);
      this.tbody.appendChild(tr);
    });

    const tot = Math.ceil(this.filteredData.length / this.pageSize) || 1;
    this.info.textContent = `${this.filteredData.length} registros`;
    this.page.textContent = `${this.currentPage} / ${tot}`;
    this.btnPrev.disabled = this.currentPage <= 1;
    this.btnNext.disabled = this.currentPage >= tot;
  }
}

/* ============================================================================
   12. INPUTS Y TEXTAREAS: InputGio2026 & TextareaGio2026
   ============================================================================ */
class InputGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.id = options.id || 'in-gio-' + Math.random().toString(36).substr(2, 9);
    this.type = options.type || 'text';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.value = options.value !== undefined ? options.value : (this.type === 'color' ? '#0fa546' : '');
    this.initialValue = this.value;
    this.disabled = !!options.disabled;
    this.required = !!options.required;
    this.customData = options.data || null;

    this._listeners = new Map();
    if (typeof options.onChange === 'function') this.on('change', options.onChange);
    if (this.target) this.render();
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'input-wrap-gio2026';

    if (this.label) {
      const lbl = document.createElement('label');
      lbl.className = 'input-label-gio';
      lbl.textContent = this.label;
      this.wrapper.appendChild(lbl);
    }

    this.box = document.createElement('div');
    this.box.className = 'input-box-gio';

    this.input = document.createElement('input');
    this.input.type = this.type;
    this.input.id = this.id;
    this.input.placeholder = this.placeholder;
    this.input.value = this.value;
    this.input.disabled = this.disabled;
    this.input.required = this.required;
    this.input.className = 'input-el-gio';
    this.box.appendChild(this.input);

    if (this.type === 'password') {
      this.eyeBtn = document.createElement('button');
      this.eyeBtn.type = 'button';
      this.eyeBtn.className = 'input-action-btn-gio';
      this.eyeBtn.innerHTML = '👁';
      this.eyeBtn.addEventListener('click', () => {
        this.input.type = this.input.type === 'password' ? 'text' : 'password';
      });
      this.box.appendChild(this.eyeBtn);
    }

    this.clearBtn = document.createElement('button');
    this.clearBtn.type = 'button';
    this.clearBtn.className = 'input-action-btn-gio';
    this.clearBtn.innerHTML = '✕';
    this.clearBtn.addEventListener('click', () => {
      this.setValue('');
      this.input.focus();
    });
    this.box.appendChild(this.clearBtn);

    this.wrapper.appendChild(this.box);
    this.target.innerHTML = '';
    this.target.appendChild(this.wrapper);

    this.input.addEventListener('input', () => {
      this.value = this.input.value;
      this.emit('input', { value: this.value, data: this.customData, target: this });
    });
    this.input.addEventListener('change', () => {
      this.value = this.input.value;
      this.emit('change', { value: this.value, data: this.customData, target: this });
    });
  }

  setValue(val) {
    this.value = val;
    if (this.input) this.input.value = val;
    this.emit('change', { value: this.value, data: this.customData, target: this });
    return this;
  }
  getValue() { return this.value; }
  reset() { return this.setValue(this.initialValue); }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

class TextareaGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.id = options.id || 'tx-gio-' + Math.random().toString(36).substr(2, 9);
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.rows = options.rows || 4;
    this.value = options.value || '';
    this.customData = options.data || null;

    this._listeners = new Map();
    if (typeof options.onChange === 'function') this.on('change', options.onChange);
    if (this.target) this.render();
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'textarea-wrap-gio2026';
    if (this.label) {
      const l = document.createElement('label');
      l.className = 'input-label-gio';
      l.textContent = this.label;
      this.wrapper.appendChild(l);
    }
    this.textarea = document.createElement('textarea');
    this.textarea.id = this.id;
    this.textarea.rows = this.rows;
    this.textarea.placeholder = this.placeholder;
    this.textarea.value = this.value;
    this.textarea.className = 'textarea-el-gio';
    this.wrapper.appendChild(this.textarea);

    this.target.innerHTML = '';
    this.target.appendChild(this.wrapper);

    this.textarea.addEventListener('input', () => {
      this.value = this.textarea.value;
      this.emit('change', { value: this.value, data: this.customData, target: this });
    });
  }

  setValue(val) { this.value = val; if (this.textarea) this.textarea.value = val; return this; }
  getValue() { return this.value; }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

/* ============================================================================
   13. ARCHIVOS: FileGio2026
   ============================================================================ */
class FileGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.id = options.id || 'fl-gio-' + Math.random().toString(36).substr(2, 9);
    this.label = options.label || 'ADJUNTAR ARCHIVO';
    this.accept = options.accept || '*/*';
    this.multiple = !!options.multiple;
    this.customData = options.data || null;

    this._listeners = new Map();
    if (typeof options.onSelect === 'function') this.on('select', options.onSelect);
    if (this.target) this.render();
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'file-zone-gio2026';
    this.wrapper.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9fa3a7" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
      <div style="font-weight: 500; color: #fff;">${this.label}</div>
      <div class="file-info-gio">Haz clic o arrastra archivos aquí</div>
      <input type="file" id="${this.id}" ${this.multiple ? 'multiple' : ''} accept="${this.accept}">
    `;

    this.input = this.wrapper.querySelector('input');
    this.info = this.wrapper.querySelector('.file-info-gio');

    this.wrapper.addEventListener('click', () => this.input.click());
    this.input.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length) {
        this.info.textContent = files.map(f => f.name).join(', ');
        this.emit('select', { files, data: this.customData, target: this });
      }
    });

    this.target.innerHTML = '';
    this.target.appendChild(this.wrapper);
  }

  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

/* ============================================================================
   14. CONTENEDORES SEMÁNTICOS: FormGio2026, FieldsetGio2026, DetailsGio2026, DialogGio2026, DatalistGio2026
   ============================================================================ */
class FormGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.id = options.id || 'form-gio-' + Math.random().toString(36).substr(2, 9);
    this._listeners = new Map();
    if (typeof options.onSubmit === 'function') this.on('submit', options.onSubmit);
    this.render();
  }

  render() {
    this.form = document.createElement('form');
    this.form.id = this.id;
    this.form.style.display = 'flex';
    this.form.style.flexDirection = 'column';
    this.form.style.gap = '14px';
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.emit('submit', { target: this, formData: new FormData(this.form) });
    });
    this.target.innerHTML = '';
    this.target.appendChild(this.form);
  }

  append(el) {
    if (el.getElement) this.form.appendChild(el.getElement());
    else if (el instanceof HTMLElement) this.form.appendChild(el);
    return this;
  }
  on(ev, cb) {
    if (!this._listeners.has(ev)) this._listeners.set(ev, []);
    this._listeners.get(ev).push(cb);
    return () => this.off(ev, cb);
  }
  off(ev, cb) {
    if (!this._listeners.has(ev)) return;
    this._listeners.set(ev, this._listeners.get(ev).filter(c => c !== cb));
  }
  emit(ev, data) {
    if (this._listeners.has(ev)) this._listeners.get(ev).forEach(cb => cb(data, this));
  }
}

class FieldsetGio2026 {
  constructor(options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.legend = options.legend || 'PARÁMETROS';
    this.render();
  }
  render() {
    this.el = document.createElement('fieldset');
    this.el.className = 'fieldset-gio2026';
    this.leg = document.createElement('legend');
    this.leg.textContent = this.legend;
    this.el.appendChild(this.leg);
  }
  append(child) {
    if (child.getElement) this.el.appendChild(child.getElement());
    else if (child instanceof HTMLElement) this.el.appendChild(child);
    return this;
  }
  getElement() { return this.el; }
}

class DetailsGio2026 {
  constructor(options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.summary = options.summary || 'Detalles';
    this.open = !!options.open;
    this.render();
  }
  render() {
    this.el = document.createElement('details');
    this.el.className = 'details-gio2026';
    this.el.open = this.open;

    this.sum = document.createElement('summary');
    this.sum.textContent = this.summary;
    this.el.appendChild(this.sum);

    this.content = document.createElement('div');
    this.content.style.marginTop = '10px';
    this.el.appendChild(this.content);
  }
  append(child) {
    if (child instanceof HTMLElement) this.content.appendChild(child);
    else this.content.innerHTML += child;
    return this;
  }
  getElement() { return this.el; }
}

class DialogGio2026 {
  constructor(options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.title = options.title || 'TERMINAL MODAL';
    this._listeners = new Map();
    this.render();
  }
  render() {
    this.dialog = document.createElement('dialog');
    this.dialog.className = 'dialog-gio2026';
    this.dialog.innerHTML = `
      <div class="dialog-gio-head">
        <span style="font-weight:600; font-size:13px;">${this.title}</span>
        <button class="dlg-close" style="background:transparent; border:none; color:var(--gio-danger); font-size:16px; cursor:pointer;">✕</button>
      </div>
      <div class="dlg-body" style="padding:16px;"></div>
    `;

    this.body = this.dialog.querySelector('.dlg-body');
    this.dialog.querySelector('.dlg-close').addEventListener('click', () => this.close());
    document.body.appendChild(this.dialog);
  }
  open() { this.dialog.showModal(); }
  close() { this.dialog.close(); }
  append(el) {
    if (el instanceof HTMLElement) this.body.appendChild(el);
    else this.body.innerHTML += el;
    return this;
  }
}

class DatalistGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.id = options.id || 'dtl-gio-' + Math.random().toString(36).substr(2, 9);
    this.options = options.options || [];
    this.placeholder = options.placeholder || 'Selecciona o escribe...';
    this.render();
  }
  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.innerHTML = `
      <div class="input-box-gio">
        <input list="${this.id}-list" class="input-el-gio" placeholder="${this.placeholder}">
      </div>
      <datalist id="${this.id}-list">
        ${this.options.map(o => `<option value="${o}">`).join('')}
      </datalist>
    `;
    this.target.innerHTML = '';
    this.target.appendChild(this.wrapper);
  }
}

/* ============================================================================
   15. VISORES DE IMÁGENES: ImageSliderViewerGio2026 & ImageGridViewerGio2026
   ============================================================================ */
class ImageSliderViewerGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.images = options.images || [];
    this.currentIndex = 0;
    if (this.target) this.render();
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'img-slider-gio2026';
    this.wrapper.innerHTML = `
      <img class="img-slider-view" src="" alt="Visor">
      <button class="img-slider-nav prev">◀</button>
      <button class="img-slider-nav next">▶</button>
      <div class="img-slider-bullets"></div>
    `;

    this.imgEl = this.wrapper.querySelector('.img-slider-view');
    this.bullets = this.wrapper.querySelector('.img-slider-bullets');

    this.wrapper.querySelector('.prev').addEventListener('click', () => this.prev());
    this.wrapper.querySelector('.next').addEventListener('click', () => this.next());

    this.target.innerHTML = '';
    this.target.appendChild(this.wrapper);
    this.update();
  }

  update() {
    if (!this.images.length) return;
    const current = this.images[this.currentIndex];
    this.imgEl.src = typeof current === 'string' ? current : current.url;

    this.bullets.innerHTML = '';
    this.images.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'img-slider-dot' + (i === this.currentIndex ? ' active' : '');
      d.addEventListener('click', () => { this.currentIndex = i; this.update(); });
      this.bullets.appendChild(d);
    });
  }

  next() { this.currentIndex = (this.currentIndex + 1) % this.images.length; this.update(); }
  prev() { this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length; this.update(); }
}

class ImageGridViewerGio2026 {
  constructor(target, options = {}) {
    UIThemeGio2026.getInstance().inject();
    this.target = typeof target === 'string' ? document.getElementById(target) : target;
    this.images = options.images || [];
    this.columns = options.columns || 3;
    if (this.target) this.render();
  }

  render() {
    this.grid = document.createElement('div');
    this.grid.className = 'img-grid-gio2026';
    this.grid.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;

    this.lightbox = document.createElement('div');
    this.lightbox.className = 'img-grid-lightbox';
    this.lightbox.innerHTML = `<img src="" alt="Enlarged">`;
    this.lightboxImg = this.lightbox.querySelector('img');
    this.lightbox.addEventListener('click', () => this.lightbox.classList.remove('active'));
    document.body.appendChild(this.lightbox);

    this.images.forEach(item => {
      const url = typeof item === 'string' ? item : item.url;
      const thumb = document.createElement('div');
      thumb.className = 'img-grid-thumb';
      thumb.innerHTML = `<img src="${url}" loading="lazy">`;
      thumb.addEventListener('click', () => {
        this.lightboxImg.src = url;
        this.lightbox.classList.add('active');
      });
      this.grid.appendChild(thumb);
    });

    this.target.innerHTML = '';
    this.target.appendChild(this.grid);
  }
}

/* ============================================================================
   REGISTRO GLOBAL COMPLETO EN WINDOW
   ============================================================================ */
window.UIThemeGio2026 = UIThemeGio2026;
window.SwitchGio2026 = SwitchGio2026;
window.HardwareSwitchGio2026 = HardwareSwitchGio2026;
window.GlowButtonGio2026 = GlowButtonGio2026;
window.RadioGio2026 = RadioGio2026;
window.CheckboxGio2026 = CheckboxGio2026;
window.SelectGio2026 = SelectGio2026;
window.SliderGio2026 = SliderGio2026;
window.MessageBoxGio2026 = MessageBoxGio2026;
window.AccordionItemGio2026 = AccordionItemGio2026;
window.AccordionGio2026 = AccordionGio2026;
window.PanelGio2026 = PanelGio2026;
window.ContainerGio2026 = ContainerGio2026;
window.TableGio2026 = TableGio2026;
window.InputGio2026 = InputGio2026;
window.TextareaGio2026 = TextareaGio2026;
window.FileGio2026 = FileGio2026;
window.FormGio2026 = FormGio2026;
window.FieldsetGio2026 = FieldsetGio2026;
window.DetailsGio2026 = DetailsGio2026;
window.DialogGio2026 = DialogGio2026;
window.DatalistGio2026 = DatalistGio2026;
window.ImageSliderViewerGio2026 = ImageSliderViewerGio2026;
window.ImageGridViewerGio2026 = ImageGridViewerGio2026;