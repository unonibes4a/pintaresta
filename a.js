

(function (global) {
    class ToolJavaScriptGio {
        static removeClass(elemento, clase) {
            if (!elemento || !elemento.classList) return;
            elemento.classList.remove(clase);
        }
        static addClass(elemento, clase) {
            if (!elemento || !elemento.classList) return;
            elemento.classList.add(clase);
        }
    }

    class UITheme {
        static inject() {
            if (document.getElementById('ui-core-library-theme')) return;
            const style = document.createElement('style');
            style.id = 'ui-core-library-theme';
            style.textContent = `
                * { scrollbar-width: thin; scrollbar-color: #282b33 transparent; } 
                *::-webkit-scrollbar { width: 4px; height: 4px; } 
                *::-webkit-scrollbar-track { background: transparent; } 
                *::-webkit-scrollbar-thumb { background: #282b33; border-radius: 4px; } 
                *::-webkit-scrollbar-thumb:hover { background: #3c424d; }
                * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }

                .ui-container {
                    display: flex;
                    box-sizing: border-box;
                    padding: 6px;
                    gap: var(--ui-container-gap, 8px);
                    background: transparent;
                    position: relative;
                    min-width: 0;
                    min-height: 0;
                }

                .ui-container-column {
                    flex-direction: column;
                    width: var(--ui-container-w, 296px);
                    max-width: 100%;
                    height: var(--ui-container-h, calc(100vh - 48px));
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
                    background: #14161a;
                    border: 1px solid #282b33;
                    border-radius: 6px;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.7);
                    height: auto !important;
                    max-height: 85vh;
                    overflow-y: auto;
                }

                .ui-container-header {
                    height: 24px;
                    min-height: 24px;
                    background: #181a1f;
                    border-bottom: 1px solid #282b33;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 8px;
                    cursor: grab;
                }
                .ui-container-header:active { cursor: grabbing; }

                .ui-panel-placeholder {
                    border: 1.5px dashed #5865f2;
                    border-radius: 6px;
                    background: rgba(88, 101, 242, 0.12);
                    box-sizing: border-box;
                    min-height: 48px;
                    width: 100%;
                    flex-shrink: 0;
                    pointer-events: none;
                }

                .ui-panel {
                    width: 290px;
                    background: #1d1f24;
                    border-radius: 6px;
                    border: 1px solid #282b33;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.7);
                    position: absolute;
                    z-index: 100;
                    user-select: none;
                    transition: border-color 0.15s ease, box-shadow 0.15s ease;
                    flex-shrink: 0;
                }

                .ui-panel.ui-panel-static {
                    position: relative !important;
                    left: auto !important;
                    top: auto !important;
                    width: 100% !important;
                    height: auto !important;
                    max-height: none !important;
                    z-index: 1 !important;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
                    display: flex !important;
                    flex: 0 0 auto !important;
                }

                .ui-panel.is-snapping { border-color: #5865f2aa; box-shadow: 0 0 14px rgba(88, 101, 242, 0.25); }
                .ui-panel.is-dragged { z-index: 10000 !important; opacity: 0.94; cursor: grabbing !important; }
                .ui-panel.collapsed { height: 28px !important; min-height: 28px !important; }
                .ui-panel.collapsed .ui-panel-body { display: none !important; }

                .ui-panel-header {
                    height: 26px;
                    min-height: 26px;
                    background: #181a1f;
                    border-bottom: 1px solid #282b33;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 8px;
                    cursor: grab;
                    flex-shrink: 0;
                }
                .ui-panel-header:active { cursor: grabbing; }
                .ui-header-left { display: flex; align-items: center; gap: 6px; pointer-events: none; }
                .ui-panel-title { font-size: 8.5px; font-weight: 700; color: #777d88; text-transform: uppercase; letter-spacing: 0.5px; }
                .ui-header-tools { display: flex; align-items: center; gap: 4px; }
                .ui-icon-btn { width: 14px; height: 14px; border-radius: 3px; border: none; background: transparent; color: #777d88; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 9px; line-height: 1; transition: all 0.15s; }
                .ui-icon-btn:hover { background: #2f343d; color: #ffffff; }
                .ui-icon-btn.active { color: #5865f2; font-weight: bold; }

                .ui-panel-body {
                    padding: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    background: #1d1f24;
                    overflow-y: auto;
                    overflow-x: hidden;
                    flex: 1;
                    min-height: 0;
                }

                .ui-row { 
                    display: flex; 
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 6px; 
                    width: 100%; 
                    min-height: 20px; 
                    flex-shrink: 0; 
                }

                .ui-row-align-0 { justify-content: flex-start; }
                .ui-row-align-0 > * { flex: 1 1 auto; min-width: 0; }
                .ui-row-align-0 > .ui-label { flex: 0 0 auto; }

                .ui-row-align-1 { justify-content: flex-start; }
                .ui-row-align-2 { justify-content: center; }
                .ui-row-align-3 { justify-content: flex-end; }
                .ui-row-align-4 { justify-content: space-between; }
                .ui-row-align-5 { justify-content: space-evenly; }

                .ui-label { font-size: 8px; font-weight: 600; color: #777d88; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; user-select: none; }
                .ui-btn { background: #2f343d; color: #d1d5db; border: 1px solid #3c424d; padding: 0 8px; border-radius: 4px; font-size: 8.5px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.15s ease; height: 20px; gap: 4px; flex-shrink: 0; }
                .ui-btn:hover { background: #383e49; color: #f1f3f5; border-color: #4b5260; }
                .ui-btn:active { transform: scale(0.97); }
                .ui-btn:disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
                .ui-btn-primary { background: #3b424e; border-color: #4b5463; color: #ffffff; }
                .ui-btn-primary:hover { background: #444c5a; border-color: #586273; }
                .ui-btn-danger { background: rgba(0, 0, 0, 0.25); border-color: #5a595967; color: #e65921d7; }
                .ui-btn-danger:hover { background: rgba(0, 0, 0, 0.25); border-color: #bdbdbd67; color: #f88f66d7; }

                .ui-input { background: #15171b; border: 1px solid #282b33; color: #d1d5db; padding: 0 6px; border-radius: 4px; font-size: 8.5px; outline: none; height: 20px; font-weight: 500; }
                .ui-input:focus { border-color: #4b5463; color: #ffffff; }
                .ui-input:disabled { opacity: 0.4; cursor: not-allowed; }
                .ui-input-text { flex: 1; min-width: 0; }
                .ui-input-number { width: 55px; text-align: center; font-variant-numeric: tabular-nums; flex-shrink: 0; }

                .ui-select-wrap { position: relative; display: inline-flex; align-items: center; height: 20px; background: #15171b; border: 1px solid #282b33; border-radius: 4px; padding: 0 6px; flex: 1; min-width: 0; }
                .ui-select-wrap:focus-within { border-color: #4b5463; }
                .ui-select { appearance: none; background: transparent; border: none; color: #d1d5db; font-size: 8.5px; font-weight: 600; width: 100%; outline: none; cursor: pointer; padding-right: 14px; }
                .ui-select:disabled { opacity: 0.4; cursor: not-allowed; }
                .ui-select option { background: #1d1f24; color: #d1d5db; }
                .ui-select-arrow { position: absolute; right: 6px; pointer-events: none; font-size: 7px; color: #777d88; }

                .ui-segmented { display: flex; background: #15171b; border: 1px solid #282b33; border-radius: 4px; padding: 1px; width: 100%; height: 20px; flex-shrink: 0; }
                .ui-seg-item { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 600; color: #777d88; cursor: pointer; border-radius: 3px; transition: all 0.2s; text-transform: uppercase; }
                .ui-seg-item.active { background: #2f343d; color: #ffffff; }

                .ui-checkbox { display: flex; align-items: center; gap: 6px; cursor: pointer; }
                .ui-checkbox.disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
                .ui-checkbox-box { width: 13px; height: 13px; background: #15171b; border: 1px solid #282b33; border-radius: 3px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; }
                .ui-checkbox.checked .ui-checkbox-box { background: #3b424e; border-color: #586273; }
                .ui-checkbox-mark { display: none; width: 7px; height: 4px; border-left: 1.5px solid #ffffff; border-bottom: 1.5px solid #ffffff; transform: rotate(-45deg) translate(0.5px, -0.5px); }
                .ui-checkbox.checked .ui-checkbox-mark { display: block; }

                .ui-radio-group { display: flex; align-items: center; gap: 8px; }
                .ui-radio-item { display: flex; align-items: center; gap: 4px; cursor: pointer; }
                .ui-radio-item.disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
                .ui-radio-circle { width: 12px; height: 12px; border-radius: 50%; background: #15171b; border: 1px solid #282b33; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; }
                .ui-radio-dot { width: 4px; height: 4px; border-radius: 50%; background: #ffffff; display: none; }
                .ui-radio-item.active .ui-radio-circle { border-color: #586273; background: #3b424e; }
                .ui-radio-item.active .ui-radio-dot { display: block; }

                .ui-toggle { display: flex; align-items: center; gap: 6px; cursor: pointer; }
                .ui-toggle.disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
                .ui-toggle-switch { width: 20px; height: 11px; background: #15171b; border-radius: 6px; position: relative; transition: all 0.2s; border: 1px solid #282b33; flex-shrink: 0; }
                .ui-toggle-thumb { width: 7px; height: 7px; background: #777d88; border-radius: 50%; position: absolute; top: 1px; left: 1px; transition: all 0.2s; }
                .ui-toggle.active .ui-toggle-switch { background: #3b424e; border-color: #586273; }
                .ui-toggle.active .ui-toggle-thumb { transform: translateX(9px); background: #ffffff; }

                .ui-info-box { background: #161a20; border: 1px solid #242f3d; border-left: 3px solid #486581; padding: 5px 7px; border-radius: 4px; font-size: 8px; color: #bcccdc; display: flex; align-items: center; justify-content: space-between; gap: 6px; width: 100%; transition: opacity 0.2s ease, transform 0.2s ease; flex-shrink: 0; }
                .ui-info-box.fade-out { opacity: 0; transform: translateY(-4px); }
                .ui-info-close { background: none; border: none; color: #627d98; cursor: pointer; font-size: 9px; line-height: 1; padding: 2px; }
                .ui-info-close:hover { color: #d9e2ec; }

                .ui-accordion { display: flex; flex-direction: column; gap: 4px; width: 100%; flex-shrink: 0; }
                .ui-accordion-item { border: 1px solid #282b33; border-radius: 4px; overflow: hidden; background: #181a1f; transition: border-color 0.2s ease; }
                .ui-accordion-item.open { border-color: #3c424d; }
                .ui-accordion-header { height: 22px; padding: 0 6px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; background: #181a1f; transition: background 0.15s ease; }
                .ui-accordion-header:hover { background: #20242b; }
                .ui-accordion-title { font-size: 8px; font-weight: 700; color: #8c93a0; text-transform: uppercase; letter-spacing: 0.5px; }
                .ui-accordion-item.open .ui-accordion-title { color: #e2e5e9; }
                .ui-accordion-arrow { font-size: 7px; color: #616773; transition: transform 0.2s ease; }
                .ui-accordion-item.open .ui-accordion-arrow { transform: rotate(90deg); color: #d1d5db; }
                .ui-accordion-content { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.2s cubic-bezier(0.4, 0, 0.2, 1); background: #14161a; }
                .ui-accordion-item.open .ui-accordion-content { grid-template-rows: 1fr; }
                .ui-accordion-body { overflow: hidden; min-height: 0; display: flex; flex-direction: column; gap: 5px; padding: 0 6px; transition: padding 0.2s ease; }
                .ui-accordion-item.open .ui-accordion-body { padding: 6px; }

                .ui-slider-card { width: 100%; background: #181a1f; border: 1px solid #282b33; border-radius: 4px; overflow: hidden; display: flex; flex-direction: column; flex-shrink: 0; }
                .ui-slider-row { display: flex; align-items: center; gap: 6px; width: 100%; height: 22px; padding: 0 6px; }
                .ui-slider-label { font-size: 8px; font-weight: 600; color: #777d88; width: 34px; text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0; }
                .ui-slider-track { flex: 1; position: relative; height: 14px; display: flex; align-items: center; cursor: pointer; }
                .ui-slider-bg { width: 100%; height: 3px; background: #282b33; border-radius: 2px; position: relative; overflow: hidden; }
                .ui-slider-fill { position: absolute; height: 100%; background: #525c6c; border-radius: 2px; width: 0%; pointer-events: none; }
                .ui-slider-thumb { width: 9px; height: 9px; background: #c5cbd4; border-radius: 50%; position: absolute; top: 2.5px; transform: translateX(-50%); box-shadow: 0 0 4px rgba(0,0,0,0.5); pointer-events: none; }
                .ui-slider-val { font-size: 8px; font-weight: 700; color: #9da4b0; width: 28px; text-align: right; font-variant-numeric: tabular-nums; flex-shrink: 0; }
                .ui-cajon-btn { width: 14px; height: 14px; border: none; background: transparent; color: #616773; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 7px; border-radius: 3px; transition: all 0.2s; flex-shrink: 0; }
                .ui-cajon-btn:hover { background: #282b33; color: #d1d5db; }
                .ui-slider-card.open .ui-cajon-btn { transform: rotate(180deg); color: #9da4b0; }
                .ui-slider-cajon { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.2s cubic-bezier(0.4, 0, 0.2, 1); background: #131518; border-top: 1px solid transparent; }
                .ui-slider-card.open .ui-slider-cajon { grid-template-rows: 1fr; border-top-color: #24272e; }
                .ui-slider-cajon-inner { overflow: hidden; min-height: 0; display: flex; align-items: center; justify-content: space-between; padding: 0 6px; gap: 4px; transition: padding 0.2s ease; }
                .ui-slider-card.open .ui-slider-cajon-inner { padding: 4px 6px; }
                .ui-cajon-tag { font-size: 7px; font-weight: 700; color: #616773; text-transform: uppercase; }
                .ui-cajon-group { display: flex; align-items: center; gap: 3px; }
                .ui-cajon-input { width: 38px; text-align: center; height: 18px; padding: 0 2px; font-size: 8px; }

                .ui-snap-guide { position: fixed; pointer-events: none; z-index: 99990; border: 1.5px dashed #5865f2; border-radius: 6px; background: rgba(88, 101, 242, 0.12); display: none; box-sizing: border-box; }

                .ui-table-container { width: 100%; display: flex; flex-direction: column; gap: 6px; background: #181a1f; border: 1px solid #282b33; border-radius: 4px; overflow: hidden; flex-shrink: 0; }
                .ui-table-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 6px; padding: 6px; background: #14161a; border-bottom: 1px solid #282b33; flex-wrap: wrap; }
                .ui-table-search { flex: 1; min-width: 120px; }
                .ui-table-scroll { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
                .ui-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 8.5px; }
                .ui-table th { background: #181a1f; color: #777d88; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 6px 8px; border-bottom: 1px solid #282b33; white-space: nowrap; cursor: grab; }
                .ui-table th.drag-over { background: #2f343d; border-left: 2px solid #5865f2; }
                .ui-table td { padding: 5px 8px; border-bottom: 1px solid #202329; color: #d1d5db; white-space: nowrap; vertical-align: middle; }
                .ui-table tr:hover td { background: #1e2126; }
                .ui-table-actions-cell { display: flex; align-items: center; gap: 4px; }
                .ui-table-footer { display: flex; align-items: center; justify-content: space-between; padding: 4px 6px; background: #14161a; border-top: 1px solid #282b33; font-size: 8px; color: #777d88; flex-wrap: wrap; gap: 4px; }
                .ui-table-pagination { display: flex; align-items: center; gap: 4px; margin-left: auto; }
                .ui-table-cards { display: none; flex-direction: column; gap: 6px; padding: 6px; }
                .ui-table-card { background: #14161a; border: 1px solid #282b33; border-radius: 4px; padding: 6px; display: flex; flex-direction: column; gap: 4px; }
                .ui-table-card-row { display: flex; justify-content: space-between; align-items: center; font-size: 8.5px; border-bottom: 1px solid #1d2026; padding-bottom: 2px; }
                .ui-table-card-label { color: #777d88; font-weight: 700; text-transform: uppercase; font-size: 7.5px; }
                .ui-table-card-val { color: #d1d5db; }

                .ui-reorder-list { display: flex; flex-direction: column; gap: 4px; width: 100%; max-height: var(--list-max-h, 160px); overflow-y: auto; background: #131518; border: 1px solid #24272f; border-radius: 4px; padding: 4px; box-sizing: border-box; flex-shrink: 0; }
                .ui-reorder-item { display: flex; align-items: center; justify-content: space-between; padding: 4px 6px; background: #181a1f; border-radius: 3px; cursor: grab; border: 1px solid transparent; font-size: 8.5px; color: #a6adb9; touch-action: none; transition: transform 0.15s ease, background-color 0.15s ease, border-color 0.15s ease; width: 100%; }
                .ui-reorder-item:active { cursor: grabbing; }
                .ui-reorder-item.active { background: #2b313c; border-color: #4f5869; color: #ffffff; }
                .ui-reorder-item.dragging { opacity: 0.35; transform: scale(0.96); }
                .ui-reorder-item.drag-over { border-color: #5865f2; background: #202430; }
                .ui-reorder-item-left { display: flex; align-items: center; gap: 6px; pointer-events: none; }
                .ui-reorder-item-left button { pointer-events: auto; }

                .ui-guide-line { position: fixed; pointer-events: none; z-index: 999998; background: #5865f2; box-shadow: 0 0 6px #5865f2aa; display: none; }
                .ui-guide-v { width: 1px; top: 0; bottom: 0; }
                .ui-guide-h { height: 1px; left: 0; right: 0; }

                .ui-square-btn { display: inline-flex; align-items: center; justify-content: center; border-radius: 4px; border: 1px solid #282b33; cursor: pointer; transition: border-color 0.15s ease, filter 0.15s ease; flex-shrink: 0; font-weight: 700; line-height: 1; -webkit-tap-highlight-color: transparent; }
                .ui-square-btn:hover { border-color: #4b5463; filter: brightness(1.2); }
                .ui-draggable-floating { position: absolute !important; z-index: 1000; box-shadow: 0 4px 15px rgba(0,0,0,0.5); touch-action: none; }
                .ui-draggable-floating.is-dragging { z-index: 10001 !important; opacity: 0.9; cursor: grabbing !important; }
                .ui-draggable-floating.is-snapping { border-color: #5865f2 !important; box-shadow: 0 0 10px rgba(88, 101, 242, 0.5) !important; }

                .ui-square-tooltip { position: fixed; z-index: 999999; pointer-events: none; background: #14161a; border: 1px solid #282b33; border-radius: 4px; padding: 6px 9px; box-shadow: 0 10px 25px rgba(0,0,0,0.8); max-width: 220px; opacity: 0; transform: scale(0.94); transition: all 0.15s ease; display: flex; flex-direction: column; gap: 2px; }
                .ui-square-tooltip.visible { opacity: 1; transform: scale(1); }
                .ui-square-tooltip-title { font-size: 8.5px; font-weight: 700; color: #ffffff; text-transform: uppercase; }
                .ui-square-tooltip-info { font-size: 8px; color: #777d88; line-height: 1.35; }

                .ui-layout-modal-backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(4px); z-index: 9999999; display: flex; align-items: center; justify-content: center; padding: 15px; }
                .ui-layout-modal { background: #1d1f24; border: 1px solid #282b33; border-radius: 6px; width: 340px; max-width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.8); display: flex; flex-direction: column; overflow: hidden; animation: uiModalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes uiModalIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                .ui-layout-modal-head { height: 30px; background: #181a1f; border-bottom: 1px solid #282b33; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; }
                .ui-layout-modal-body { padding: 10px; display: flex; flex-direction: column; gap: 10px; max-height: 70vh; overflow-y: auto; }
                .ui-layout-list { display: flex; flex-direction: column; gap: 4px; max-height: 180px; overflow-y: auto; background: #15171b; border: 1px solid #282b33; border-radius: 4px; padding: 4px; }
                .ui-layout-item { display: flex; align-items: center; justify-content: space-between; padding: 5px 8px; background: #1a1d22; border: 1px solid transparent; border-radius: 4px; }
                .ui-layout-item:hover { border-color: #282b33; background: #20242b; }
                .ui-layout-meta { display: flex; flex-direction: column; gap: 2px; overflow: hidden; }
                .ui-layout-name { font-size: 9px; font-weight: 700; color: #ffffff; text-transform: uppercase; white-space: nowrap; text-overflow: ellipsis; }
                .ui-layout-date { font-size: 7.5px; color: #777d88; font-variant-numeric: tabular-nums; }
                .ui-layout-actions { display: flex; align-items: center; gap: 4px; }
                .ui-badge-app { font-size: 7px; background: #2a2f3a; color: #9da4b0; padding: 2px 4px; border-radius: 3px; font-weight: bold; }

                @media (max-width: 768px) {
                    .ui-container-column { width: 100% !important; height: auto !important; max-height: 50vh !important; }
                    .ui-container-row { width: 100% !important; }
                    .ui-panel { width: 100% !important; }
                    .ui-table-scroll { display: none; }
                    .ui-table-cards { display: flex; }
                }
            `;
            const target = document.head || document.documentElement;
            if (target) target.appendChild(style);
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

    let _uiInstanceCounter = 0;

    class UIBaseComponent {
        constructor({ id = null } = {}, fallbackPrefix = 'ui_comp') {
            UITheme.inject();
            _uiInstanceCounter++;
            this.id = id ? String(id).trim() : `${fallbackPrefix}_${_uiInstanceCounter}`;
            this.element = null;
            this.isDestroyed = false;
            this.onDestroyCallback = null;
            UIRegistry.register(this.id, this);
        }
        mount(parent) {
            if (this.element && parent) {
                if (parent.element) parent.element.appendChild(this.element);
                else parent.appendChild(this.element);
            }
            return this;
        }
        onDestroy(cb) {
            this.onDestroyCallback = cb;
            return this;
        }
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

        register(panel) { this.panels.add(panel); }
        unregister(panel) { this.panels.delete(panel); }
        registerButton(btn) { this.buttons.add(btn); }
        unregisterButton(btn) { this.buttons.delete(btn); }
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

            let finalX = rawX, finalY = rawY;
            let snappedX = false, snappedY = false;
            let guideXPos = null, guideYPos = null;

            if (Math.abs(finalX) < this.threshold) { finalX = 0; snappedX = true; guideXPos = 0; }
            if (Math.abs(finalY) < this.threshold) { finalY = 0; snappedY = true; guideYPos = 0; }
            if (Math.abs(finalX + dw - vw) < this.threshold) { finalX = vw - dw; snappedX = true; guideXPos = vw; }
            if (Math.abs(finalY + dh - vh) < this.threshold) { finalY = vh - dh; snappedY = true; guideYPos = vh; }

            for (const other of this.buttons) {
                if (other === draggedItem || !other.element || other.element.style.display === 'none') continue;
                const ox = other.element.offsetLeft, oy = other.element.offsetTop, ow = other.element.offsetWidth, oh = other.element.offsetHeight;

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
            width = '296px',
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

            this.direction = direction;
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
                this.element.style.left = `${this.x}px`;
                this.element.style.top = `${this.y}px`;
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

        createHeader() {
            this.header = document.createElement('div');
            this.header.className = 'ui-container-header';
            this.header.innerHTML = `
                <span class="ui-panel-title">${this.title || 'GRUPO'}</span>
                <div class="ui-header-tools">
                    <button class="ui-icon-btn btn-close-cnt">✕</button>
                </div>
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

                if (!dragging && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
                    dragging = true;
                }
                if (dragging) {
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
                window.removeEventListener('touchmove', onPointerMove);
                window.removeEventListener('touchend', onPointerUp);
            };

            const trigger = this.header || this.element;
            trigger.addEventListener('mousedown', (e) => {
                if (e.target.closest('.ui-panel, button, input')) return;
                startX = e.clientX;
                startY = e.clientY;
                initX = this.element.offsetLeft;
                initY = this.element.offsetTop;
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
                    GlobalDock.unregister(p);
                    p.updateFloatButtonUI();
                    if (!this.panels.includes(p)) {
                        this.panels.push(p);
                    }
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

            if (targetChild) {
                this.element.insertBefore(this.placeholder, targetChild);
            } else {
                this.element.appendChild(this.placeholder);
            }
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

        // Inserción exacta guiada por la posición visual del placeholder
        insertPanelAtPlaceholder(panel) {
            panel.parentContainer = this;
            panel.lastParentContainer = this;

            const currentIdx = this.panels.indexOf(panel);
            if (currentIdx !== -1) {
                this.panels.splice(currentIdx, 1);
            }

            if (this.placeholder && this.placeholder.parentNode === this.element) {
                this.element.insertBefore(panel.element, this.placeholder);
                this.hidePlaceholder();
            } else {
                this.element.appendChild(panel.element);
            }

            // Sincronizar el array interno con el orden real del DOM
            const allElements = Array.from(this.element.children);
            this.panels = this.panels.concat(panel).sort((a, b) => {
                return allElements.indexOf(a.element) - allElements.indexOf(b.element);
            });
        }

        insertPanelAt(panel, index) {
            panel.parentContainer = this;
            panel.lastParentContainer = this;
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
                this.element.style.left = `${this.x}px`;
                this.element.style.top = `${this.y}px`;
            }
        }

        destroy() {
            this.hidePlaceholder();
            GlobalDock.unregisterContainer(this);
            this.panels.forEach(p => p.destroy());
            this.panels = [];
            super.destroy();
        }
    }

    class UIPanelGroup extends UIContainer {
        constructor(opts = {}) {
            super({
                direction: opts.type === 'row' ? 'row' : 'column',
                width: opts.minWidth ? `${opts.minWidth}px` : '296px',
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
            this.parentContainer = null;
            this.lastParentContainer = null;
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
                this.element.style.left = `${x}px`;
                this.element.style.top = `${y}px`;
                this.element.style.width = `${width}px`;
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
                if (document.body) {
                    document.body.appendChild(this.element);
                } else {
                    window.addEventListener('DOMContentLoaded', () => {
                        if (this.element && !this.element.parentNode && document.body) {
                            document.body.appendChild(this.element);
                        }
                    });
                }
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
                const rect = this.element.getBoundingClientRect();
                const px = targetX !== undefined ? targetX : rect.left + window.scrollX;
                const py = targetY !== undefined ? targetY : rect.top + window.scrollY;

                if (this.parentContainer) {
                    this.lastParentContainer = this.parentContainer;
                    this.parentContainer.removePanel(this);
                }

                document.body.appendChild(this.element);
                this.element.classList.remove('ui-panel-static');
                this.element.style.left = `${px}px`;
                this.element.style.top = `${py}px`;
                this.element.style.width = `${this.initialWidth}px`;
                GlobalDock.register(this);
            } else {
                GlobalDock.unregister(this);
                this.element.classList.add('ui-panel-static');
                this.element.style.left = '';
                this.element.style.top = '';
                this.element.style.width = '';

                const containerToJoin = this.lastParentContainer || Array.from(GlobalDock.containers)[0];
                if (containerToJoin) {
                    containerToJoin.addPanel(this);
                }
            }
            this.updateFloatButtonUI();
            return this;
        }

        bindEvents() {
            this.handleCollapse = (e) => {
                e.stopPropagation();
                this.toggleCollapse();
            };
            this.handleClose = (e) => {
                e.stopPropagation();
                this.close();
            };
            this.handleToggleFloat = (e) => {
                e.stopPropagation();
                this.setFloating(!this.floating);
            };

            this.btnCollapse.addEventListener('click', this.handleCollapse);
            this.btnClose.addEventListener('click', this.handleClose);
            this.btnFloat.addEventListener('click', this.handleToggleFloat);

            let offsetX = 0;
            let offsetY = 0;
            let targetContainer = null;
            let startClientX = 0;
            let startClientY = 0;
            let isTracking = false;

            const onPointerMove = (e) => {
                if (!isTracking) return;

                const cx = (e.touches ? e.touches[0].pageX : e.pageX);
                const cy = (e.touches ? e.touches[0].pageY : e.pageY);

                if (!this.isDragging) {
                    const rawClientX = e.touches ? e.touches[0].clientX : e.clientX;
                    const rawClientY = e.touches ? e.touches[0].clientY : e.clientY;
                    if (Math.hypot(rawClientX - startClientX, rawClientY - startClientY) > 5) {
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

                const rawX = cx - offsetX;
                const rawY = cy - offsetY;

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
                window.removeEventListener('touchmove', onPointerMove);
                window.removeEventListener('touchend', onPointerUp);

                if (!this.isDragging) return;

                this.isDragging = false;
                this.element.classList.remove('is-dragged');
                this.element.classList.remove('is-snapping');
                GlobalDock.hideGuide();

                if (targetContainer) {
                    // Inserción directa en el lugar visual del placeholder
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
                }

                targetContainer = null;
            };

            const onPointerDown = (e) => {
                if (e.target.closest('button, input, select, .ui-accordion-header, .ui-cajon-btn, .ui-table th, .ui-table td, .ui-reorder-item, .ui-square-btn')) return;

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
            };

            this.header.addEventListener('mousedown', onPointerDown);
            this.header.addEventListener('touchstart', onPointerDown, { passive: false });
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

        toggle() {
            return this.element.style.display === 'none' ? this.open() : this.close();
        }

        setTitle(t) {
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
                this.element.style.left = `${s.x}px`;
                this.element.style.top = `${s.y}px`;
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
            if (this.btnCollapse) this.btnCollapse.removeEventListener('click', this.handleCollapse);
            if (this.btnClose) this.btnClose.removeEventListener('click', this.handleClose);
            if (this.btnFloat) this.btnFloat.removeEventListener('click', this.handleToggleFloat);
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
                const data = localStorage.getItem(`ui_layouts_store_${appId}`);
                return data ? JSON.parse(data) : [];
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
                if (comp.getState) {
                    state[id] = comp.getState();
                }
            }
            return state;
        }

        applyState(state) {
            if (!state) return;
            for (const id in state) {
                const comp = UIRegistry.get(id);
                if (comp instanceof UIContainer && comp.setState) {
                    comp.setState(state[id]);
                }
            }
            for (const id in state) {
                const comp = UIRegistry.get(id);
                if (comp && !(comp instanceof UIContainer) && comp.setState) {
                    comp.setState(state[id]);
                }
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
                if (found && found.state) {
                    this.applyState(found.state);
                }
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
                        <div style="display:flex; align-items:center; gap:6px;">
                            <span class="ui-panel-title">GESTOR DE INTERFAZ</span>
                            <span class="ui-badge-app">${appId}</span>
                        </div>
                        <button class="ui-icon-btn btn-modal-close">✕</button>
                    </div>
                    <div class="ui-layout-modal-body">
                        <div class="ui-row ui-row-align-4">
                            <label class="ui-checkbox ${factoryActive ? 'checked' : ''}" id="chk-factory-mode">
                                <div class="ui-checkbox-box"><div class="ui-checkbox-mark"></div></div>
                                <span class="ui-label" style="color:#f39c12;">HABILITAR INTERFAZ DE FÁBRICA</span>
                            </label>
                        </div>
                        <div class="ui-row ui-row-align-4">
                            <label class="ui-checkbox ${this.useIndexedDB ? 'checked' : ''}" id="chk-use-idb">
                                <div class="ui-checkbox-box"><div class="ui-checkbox-mark"></div></div>
                                <span class="ui-label">USAR INDEXED-DB (OFF = LOCALSTORAGE)</span>
                            </label>
                        </div>
                        <div class="ui-row ui-row-align-0" id="save-bar-container" style="${factoryActive ? 'opacity:0.4; pointer-events:none;' : ''}">
                            <input type="text" class="ui-input" id="input-layout-name" placeholder="NOMBRE (EJ: Principal)" style="flex:1;">
                            <button class="ui-btn ui-btn-primary" id="btn-save-layout">GUARDAR</button>
                        </div>
                        <span class="ui-label" style="margin-top:4px;">LAYOUTS GUARDADOS (${appId}):</span>
                        <div class="ui-layout-list" id="layout-items-container"></div>
                    </div>
                </div>
            `;
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
                container.innerHTML = `<span class="ui-label" style="text-align:center; padding: 12px; color: #555;">NO HAY ESTADOS GUARDADOS PARA ESTA APP</span>`;
                return;
            }

            list.forEach(item => {
                const el = document.createElement('div');
                el.className = 'ui-layout-item';
                el.innerHTML = `
                    <div class="ui-layout-meta">
                        <span class="ui-layout-name">${item.name}</span>
                        <span class="ui-layout-date">${item.date || ''}</span>
                    </div>
                    <div class="ui-layout-actions">
                        <button class="ui-btn btn-apply" ${isFactory ? 'disabled' : ''}>CARGAR</button>
                        <button class="ui-btn ui-btn-danger btn-del">✕</button>
                    </div>
                `;
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
            size = 40,
            bgColor = '#1e2126',
            textColor = '#d1d5db',
            fontSize = '9px',
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
            this.bgColor = this.normalizeColor(bgColor);
            this.textColor = this.normalizeColor(textColor);
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

        normalizeColor(c) {
            if (!c) return '#ffffff';
            c = String(c).trim();
            return (!c.startsWith('#') && !c.startsWith('rgb') && !c.startsWith('hsl')) ? '#' + c : c;
        }

        updateAppearance() {
            if (!this.element) return;
            this.element.textContent = this.text;
            this.element.style.width = `${this.size}px`;
            this.element.style.height = `${this.size}px`;
            this.element.style.backgroundColor = this.bgColor;
            this.element.style.color = this.textColor;
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
            this.element.addEventListener('mouseenter', () => this.showTooltip());
            this.element.addEventListener('mouseleave', () => this.hideTooltip());

            let offsetX = 0, offsetY = 0;
            let startClientX = 0, startClientY = 0;
            let isTracking = false;

            const onPointerMove = (e) => {
                if (!isTracking) return;
                const cx = (e.touches ? e.touches[0].pageX : e.pageX);
                const cy = (e.touches ? e.touches[0].pageY : e.pageY);

                if (!this.isDragging) {
                    const rawClientX = e.touches ? e.touches[0].clientX : e.clientX;
                    const rawClientY = e.touches ? e.touches[0].clientY : e.clientY;
                    if (Math.hypot(rawClientX - startClientX, rawClientY - startClientY) > 5) {
                        this.isDragging = true;
                        this.hideTooltip();
                        this.element.classList.add('is-dragging');
                    } else {
                        return;
                    }
                }

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
                    this.element.classList.remove('is-dragging');
                    this.element.classList.remove('is-snapping');
                    GlobalDock.hideSmartGuides();
                }
                window.removeEventListener('mousemove', onPointerMove);
                window.removeEventListener('mouseup', onPointerUp);
                window.removeEventListener('touchmove', onPointerMove);
                window.removeEventListener('touchend', onPointerUp);
            };

            this.element.addEventListener('mousedown', (e) => {
                if (!this.isDraggable) return;
                isTracking = true;
                this.isDragging = false;
                startClientX = e.clientX; 
                startClientY = e.clientY;
                offsetX = e.pageX - this.element.offsetLeft;
                offsetY = e.pageY - this.element.offsetTop;
                window.addEventListener('mousemove', onPointerMove);
                window.addEventListener('mouseup', onPointerUp);
            });

            this.element.addEventListener('touchstart', (e) => {
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
                }
            }, { passive: true });

            this.element.addEventListener('touchend', (e) => {
                clearTimeout(this.touchTimer);
                if (this.isLongPress) e.preventDefault();
            });

            this.element.addEventListener('click', (e) => {
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
            GlobalDock.unregisterButton(this);
            this.hideTooltip();
            if (this.tooltip && this.tooltip.parentNode) this.tooltip.parentNode.removeChild(this.tooltip);
            super.destroy();
        }
    }

    class UIReorderList extends UIBaseComponent {
        constructor({ items = [], maxHeight = 160, onReorder, onSelect, onVisibilityChange, renderItem } = {}) {
            super();
            this.items = [...items];
            this.activeIndex = -1;
            this.onReorder = onReorder;
            this.onSelect = onSelect;
            this.onVisibilityChange = onVisibilityChange;
            this.renderItemCustom = renderItem;

            this.element = document.createElement('div');
            this.element.className = 'ui-reorder-list';
            this.element.style.setProperty('--list-max-h', `${maxHeight}px`);

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
                    rightMeta.style.fontSize = '7.5px';
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
                    itemEl.classList.remove('dragging');
                    itemEl.classList.remove('drag-over');
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
                    <input type="text" class="ui-input ui-input-text ui-table-search" placeholder="BUSCAR...">
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

        bindEvents() {
            this.searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.applyFilter();
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
            thAction.textContent = 'ACCIONES';
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

            this.infoSpan.textContent = `${this.filteredData.length} FILAS`;
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
                    this.deleteRow(row, start + rIdx);
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
                cardDelBtn.textContent = 'ELIMINAR';
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
            this.element.className = `ui-btn ${variant === 'primary' ? 'ui-btn-primary' : variant === 'danger' ? 'ui-btn-danger' : ''}`;
            this.element.textContent = text;

            this.handleClick = (e) => { if (onClick) onClick(e, this); };
            this.element.addEventListener('click', this.handleClick);
        }
        setText(t) {
            if (this.element) this.element.textContent = t;
            return this;
        }
        setDisabled(v) {
            if (this.element) this.element.disabled = !!v;
            return this;
        }
        destroy() {
            if (this.element) this.element.removeEventListener('click', this.handleClick);
            super.destroy();
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

            this.handleInput = (e) => { if (onInput) onInput(e.target.value, e, this); };
            this.handleChange = (e) => { if (onChange) onChange(e.target.value, e, this); };

            this.element.addEventListener('input', this.handleInput);
            this.element.addEventListener('change', this.handleChange);
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
        destroy() {
            if (this.element) {
                this.element.removeEventListener('input', this.handleInput);
                this.element.removeEventListener('change', this.handleChange);
            }
            super.destroy();
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

            this.handleKeyDown = (e) => { if (e.key === '.' || e.key === ',') e.preventDefault(); };
            this.handleInput = (e) => {
                let p = parseInt(e.target.value, 10);
                if (!isNaN(p)) {
                    this.value = Math.max(this.min, Math.min(this.max, p));
                    if (onInput) onInput(this.value, e, this);
                }
            };
            this.handleChange = (e) => {
                let p = parseInt(e.target.value, 10);
                if (isNaN(p)) p = 0;
                this.value = Math.max(this.min, Math.min(this.max, p));
                this.element.value = this.value;
                if (onChange) onChange(this.value, e, this);
            };

            this.element.addEventListener('keydown', this.handleKeyDown);
            this.element.addEventListener('input', this.handleInput);
            this.element.addEventListener('change', this.handleChange);
        }
        getValue() { return this.value; }
        setValue(v) {
            const p = parseInt(v, 10);
            this.value = isNaN(p) ? 0 : Math.max(this.min, Math.min(this.max, p));
            if (this.element) this.element.value = this.value;
            return this;
        }
        setDisabled(v) {
            if (this.element) this.element.disabled = !!v;
            return this;
        }
        destroy() {
            if (this.element) {
                this.element.removeEventListener('keydown', this.handleKeyDown);
                this.element.removeEventListener('input', this.handleInput);
                this.element.removeEventListener('change', this.handleChange);
            }
            super.destroy();
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
                <span class="ui-label">${label}</span>
            `;

            this.handleClick = () => {
                if (this.disabled) return;
                this.checked = !this.checked;
                this.element.classList.toggle('checked', this.checked);
                if (onChange) onChange(this.checked, this);
            };
            this.element.addEventListener('click', this.handleClick);
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
        destroy() {
            if (this.element) this.element.removeEventListener('click', this.handleClick);
            super.destroy();
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
                <span class="ui-label">${label}</span>
            `;

            this.handleClick = () => {
                if (this.disabled) return;
                this.value = !this.value;
                this.element.classList.toggle('active', this.value);
                if (onChange) onChange(this.value, this);
            };
            this.element.addEventListener('click', this.handleClick);
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
        destroy() {
            if (this.element) this.element.removeEventListener('click', this.handleClick);
            super.destroy();
        }
    }

    class UISelect extends UIBaseComponent {
        constructor({ options = [], value = '', onChange } = {}) {
            super();
            this.options = options;
            this.value = value || (options[0]?.value ?? '');

            this.element = document.createElement('div');
            this.element.className = 'ui-select-wrap';
            this.element.innerHTML = `
                <select class="ui-select">
                    ${options.map(o => `<option value="${o.value}" ${String(o.value) === String(this.value) ? 'selected' : ''}>${o.label}</option>`).join('')}
                </select>
                <span class="ui-select-arrow">▼</span>
            `;

            this.selectNode = this.element.querySelector('.ui-select');
            this.handleChange = (e) => {
                this.value = e.target.value;
                if (onChange) onChange(this.value, this);
            };
            this.selectNode.addEventListener('change', this.handleChange);
        }
        getValue() { return this.value; }
        setValue(v) {
            this.value = v;
            if (this.selectNode) this.selectNode.value = v;
            return this;
        }
        setDisabled(v) {
            if (this.selectNode) this.selectNode.disabled = !!v;
            return this;
        }
        destroy() {
            if (this.selectNode) this.selectNode.removeEventListener('change', this.handleChange);
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
                el.addEventListener('click', () => this.select(idx));
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
            this.handlers = [];

            this.element = document.createElement('div');
            this.element.className = 'ui-radio-group';

            this.domItems = this.items.map((item, idx) => {
                const el = document.createElement('div');
                el.className = `ui-radio-item ${idx === this.activeIndex ? 'active' : ''}`;
                el.innerHTML = `
                    <div class="ui-radio-circle"><div class="ui-radio-dot"></div></div>
                    <span class="ui-label">${item.label || item}</span>
                `;

                const h = () => {
                    if (this.disabled) return;
                    this.select(idx);
                    if (onChange) onChange(this.getValue(), idx, this);
                };

                el.addEventListener('click', h);
                this.handlers.push({ el, h });
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
            this.handlers.forEach(({ el, h }) => el.removeEventListener('click', h));
            this.handlers = [];
            this.domItems = [];
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
                <div class="ui-slider-row">
                    <span class="ui-slider-label">${this.label}</span>
                    <div class="ui-slider-track">
                        <div class="ui-slider-bg"><div class="ui-slider-fill"></div></div>
                        <div class="ui-slider-thumb"></div>
                    </div>
                    <span class="ui-slider-val"></span>
                    <button class="ui-cajon-btn">▼</button>
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
                const cx = e.touches ? e.touches[0].clientX : e.clientX;
                const rect = this.track.getBoundingClientRect();
                let pos = (cx - rect.left) / rect.width;
                pos = Math.max(0, Math.min(1, pos));
                let rawVal = this.min + pos * (this.max - this.min);
                const steps = Math.round((rawVal - this.min) / this.step);
                this.value = Number((this.min + steps * this.step).toFixed(3));
                this.value = Math.max(this.min, Math.min(this.max, this.value));
                this.updateUI();
                if (this.onChange) this.onChange(this.value, this);
            };

            const stopMove = () => {
                window.removeEventListener('mousemove', handleMove);
                window.removeEventListener('mouseup', stopMove);
                window.removeEventListener('touchmove', handleMove);
                window.removeEventListener('touchend', stopMove);
            };

            const startMove = (e) => {
                handleMove(e);
                window.addEventListener('mousemove', handleMove);
                window.addEventListener('mouseup', stopMove);
                window.addEventListener('touchmove', handleMove);
                window.addEventListener('touchend', stopMove);
            };

            this.track.addEventListener('mousedown', startMove);
            this.track.addEventListener('touchstart', startMove, { passive: true });

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
            if (this.onChange) this.onChange(this.value, this);
            return this;
        }

        updateUI() {
            const range = this.max - this.min;
            const percent = range > 0 ? ((this.value - this.min) / range) * 100 : 0;
            this.fill.style.width = `${percent}%`;
            this.thumb.style.left = `${percent}%`;
            this.valDisplay.textContent = this.value;
        }

        destroy() {
            if (this.toggleBtn) this.toggleBtn.removeEventListener('click', this.toggleCajon);
            super.destroy();
        }
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
                    <span class="ui-accordion-title">${title}</span>
                    <span class="ui-accordion-arrow">▶</span>
                </div>
                <div class="ui-accordion-content">
                    <div class="ui-accordion-body"></div>
                </div>
            `;

            this.header = this.element.querySelector('.ui-accordion-header');
            this.titleNode = this.element.querySelector('.ui-accordion-title');
            this.body = this.element.querySelector('.ui-accordion-body');

            this.handleHeaderClick = () => this.toggle();
            this.header.addEventListener('click', this.handleHeaderClick);
        }

        append(child) {
            if (child.mount) child.mount(this.body);
            else if (child instanceof HTMLElement) this.body.appendChild(child);
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

        destroy() {
            if (this.header) this.header.removeEventListener('click', this.handleHeaderClick);
            super.destroy();
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
            this.element.innerHTML = `
                <span>ℹ ${text}</span>
                <button class="ui-info-close">✕</button>
            `;

            this.closeBtn = this.element.querySelector('.ui-info-close');
            this.handleDismiss = () => this.dismiss();
            this.closeBtn.addEventListener('click', this.handleDismiss);

            if (this.duration > 0) {
                this.timer = setTimeout(() => this.dismiss(), this.duration);
            }
        }

        setText(t) {
            if (this.element) {
                const span = this.element.querySelector('span');
                if (span) span.textContent = `ℹ ${t}`;
            }
            return this;
        }

        dismiss() {
            if (this.isDestroyed) return;
            if (this.timer) clearTimeout(this.timer);
            if (this.closeBtn) this.closeBtn.removeEventListener('click', this.handleDismiss);

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
            if (this.timer) clearTimeout(this.timer);
            if (this.closeBtn) this.closeBtn.removeEventListener('click', this.handleDismiss);
            super.destroy();
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
        Info: UIInfo
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

})(typeof window !== 'undefined' ? window : this);
