 

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
    static set(themeObj = {}) {
        const root = document.documentElement;
        if (!root || typeof themeObj !== 'object') return;
        for (let [key, val] of Object.entries(themeObj)) {
            if (val === undefined || val === null) continue;
            let cssVar = key.trim();
            if (!cssVar.startsWith('--')) {
                cssVar = cssVar.startsWith('ui-') ? `--${cssVar}` : `--ui-${cssVar}`;
            }
            root.style.setProperty(cssVar, String(val).trim());
        }
    }

    static inject() {
        if (document.getElementById('ui-core-library-theme')) return;
        const style = document.createElement('style');
        style.id = 'ui-core-library-theme';
        style.textContent = `
            :root {
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
                --ui-panel-body-padding: 10px;
                --ui-panel-body-gap: 8px;

                --ui-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                --ui-font-family-mono: "SF Mono", Menlo, Consolas, monospace;
                --ui-font-weight-normal: 400;
                --ui-font-weight-medium: 500;
                --ui-font-weight-semibold: 600;
                --ui-font-weight-bold: 700;

                --ui-font-size-badge: 10px;
                --ui-font-size-cajon-tag: 10px;
                --ui-font-size-table-card-label: 11px;
                --ui-font-size-layout-date: 10.5px;
                --ui-font-size-label: 11px;
                --ui-font-size-seg: 11px;
                --ui-font-size-info: 11px;
                --ui-font-size-accordion-title: 11px;
                --ui-font-size-slider-label: 11.5px;
                --ui-font-size-slider-val: 11.5px;
                --ui-font-size-cajon-input: 11px;
                --ui-font-size-table-footer: 11px;
                --ui-font-size-tooltip-info: 11px;
                --ui-font-size-panel-title: 12.5px;
                --ui-font-size-btn: 11.5px;
                --ui-font-size-input: 11px;
                --ui-font-size-select: 11px;
                --ui-font-size-table: 11px;
                --ui-font-size-table-card-row: 11px;
                --ui-font-size-reorder-item: 11px;
                --ui-font-size-tooltip-title: 11.5px;
                --ui-font-size-icon-btn: 11px;
                --ui-font-size-info-close: 11px;
                --ui-font-size-layout-name: 11.5px;
                --ui-font-size-select-arrow: 9px;
                --ui-font-size-accordion-arrow: 9px;
                --ui-font-size-cajon-btn: 10px;

                --ui-letter-spacing-sm: 0.2px;
                --ui-letter-spacing-title: 0.4px;

                --ui-btn-height: 30px;
                --ui-container-w: 290px;
                --ui-container-h: calc(100vh - 48px);
                --ui-container-floating-max-h: 85vh;
                --ui-container-header-h: 36px;
                --ui-panel-width: 290px;
                --ui-panel-header-h: 36px;
                --ui-panel-collapsed-h: 36px;

                --ui-slider-card-padding: 8px 10px;
                --ui-slider-track-height: 7px;
                --ui-slider-thumb-size: 11px;

                --ui-list-max-h: 180px;
                --ui-modal-width: 330px;
                --ui-modal-header-h: 36px;
                --ui-modal-max-h: 80vh;
                --ui-modal-list-max-h: 220px;
                --ui-square-btn-size: 38px;

                --ui-bg-base: #181818;
                --ui-bg-panel: #212121;
                --ui-bg-surface: #212121;
                --ui-bg-surface-hover: #292929;
                --ui-bg-input: #212121;
                --ui-bg-input-hover: #262626;
                --ui-bg-input-focus: #242424;
                --ui-bg-cajon: #1a1a1a;
                --ui-bg-list: #1a1a1a;
                --ui-bg-tr-hover: #272727;
                --ui-bg-modal-item: #212121;
                --ui-bg-modal-item-hover: #282828;
                --ui-bg-reorder-active: #292929;
                --ui-bg-reorder-dragover: #2c2c2c;
                --ui-modal-backdrop-bg: rgba(0, 0, 0, 0.75);
                --ui-bg-dropdown-menu: #212121;
                --ui-bg-dropdown-item-hover: #2b2b2b;
                --ui-bg-dropdown-item-active: #2f2f2f;
                --ui-bg-segmented: #1a1a1a;
                --ui-bg-segmented-active: #2e2e2e;
                --ui-bg-toggle-switch: #191919;
                --ui-bg-slider-content: #212121;

                --ui-border: #3d3d3d;
                --ui-border-light: #3d3d3d;
                --ui-border-hover: #2196F3;
                --ui-border-focus: #2196F3;
                --ui-border-subtle: #2d2d2d;
                --ui-border-cajon: #3d3d3d;
                --ui-border-list: #3d3d3d;
                --ui-border-active: #2196F3;
                --ui-border-card-row: #2d2d2d;
                --ui-border-select: #3d3d3d;
                --ui-border-circle: #3d3d3d;

                --ui-radius-sm: 6px;
                --ui-radius-md: 8px;
                --ui-radius-base: 10px;
                --ui-radius-lg: 12px;
                --ui-radius-pill: 100px;

                --ui-text-main: #727272;
                --ui-text-muted: #595959;
                --ui-text-dim: #434343;
                --ui-text-subtle: #757575;
                --ui-text-bright: #e0e0e0;
                --ui-text-hover: #ffffff;
                --ui-text-accordion: #595959;
                --ui-text-accordion-open: #9a9a9a;
                --ui-text-val: #9a9a9a;
                --ui-text-panel-title: #9a9a9a;
                --ui-text-dropdown-item: #595959;
                --ui-text-dropdown-item-hover: #ffffff;

                --ui-btn-bg: #212121;
                --ui-btn-hover-bg: #262626;
                --ui-primary-bg: #212121;
                --ui-primary-hover-bg: #2195f398;
                --ui-primary-border: #3d3d3d;
                --ui-primary-text: #9a9a9a;
                --ui-primary-hover-text: #ffffff;

                --ui-danger-bg: #212121;
                --ui-danger-border: #3d3d3d;
                --ui-danger-border-hover: #f85149;
                --ui-danger-color: #f85149;
                --ui-danger-hover: #ff7b72;

                --ui-accent: #2196F3;
                --ui-accent-hover: #42a5f5;
                --ui-accent-glow: rgba(33, 149, 243, 0.38);
                --ui-accent-snap-border: #2196F3;
                --ui-accent-snap-shadow: rgba(33, 149, 243, 0.40);
                --ui-accent-placeholder-bg: rgba(33, 149, 243, 0.08);
                --ui-accent-btn-shadow: rgba(33, 149, 243, 0.38);

                --ui-toggle-switch-active-bg: #2195f35b;
                --ui-toggle-thumb-active: #ffffff;
                --ui-checkbox-box-active-bg: #2195f3a1;
                --ui-checkbox-box-active-border: #2196F3;
                --ui-checkbox-mark-color: #ffffff;
                --ui-radio-circle-active-bg: #212121;
                --ui-radio-circle-active-border: #2196F3;
                --ui-radio-dot-color: #2196F3;

                --ui-slider-bg: #151515;
                --ui-slider-fill: #2195f327;
                --ui-slider-thumb: #ffffff88;
                --ui-slider-divider: #3d3d3d;

                --ui-info-bg: #212121;
                --ui-info-border: #3d3d3d;
                --ui-info-accent: #2196F3;
                --ui-info-text: #595959;
                --ui-info-close: #595959;
                --ui-info-close-hover: #ffffff83;

                --ui-badge-bg: #191919;
                --ui-badge-text: #9a9a9a;
                --ui-scrollbar-size: 5px;
                --ui-scrollbar-thumb: #3d3d3d;
                --ui-scrollbar-thumb-hover: #2196F3;

                --ui-shadow-floating: 0 16px 36px rgba(0, 0, 0, 0.65), 0 0 0 1px var(--ui-border);
                --ui-shadow-panel: 0 16px 36px rgba(0, 0, 0, 0.65);
                --ui-shadow-static: 0 4px 14px rgba(0, 0, 0, 0.45);
                --ui-shadow-tooltip: 0 12px 24px rgba(0, 0, 0, 0.6);
                --ui-shadow-modal: 0 24px 50px rgba(0, 0, 0, 0.85);
                --ui-shadow-thumb: 0 0 6px rgba(33, 150, 243, 0.6);
                --ui-shadow-btn-floating: 0 4px 12px rgba(0, 0, 0, 0.5);
                --ui-shadow-guide: 0 0 10px rgba(33, 149, 243, 0.5);
                --ui-shadow-dropdown: 0 10px 25px rgba(0, 0, 0, 0.7);

                --ui-transition-fast: 0.25s cubic-bezier(0.23, 1, 0.320, 1);
                --ui-transition-base: 0.4s cubic-bezier(0.23, 1, 0.320, 1);
                --ui-transition-glow: 0.6s cubic-bezier(0.23, 1, 0.320, 1);
                --ui-opacity-disabled: 0.35;
                --ui-opacity-dragged: 0.95;
                --ui-opacity-drag-item: 0.30;
            }

            html, body {
                background-color: var(--ui-bg-base) !important;
                min-height: 100vh;
            }

            * { 
                scrollbar-width: thin; 
                scrollbar-color: var(--ui-scrollbar-thumb) transparent; 
                box-sizing: border-box; 
                margin: 0; 
                padding: 0; 
                font-family: var(--ui-font-family); 
            } 
            *::-webkit-scrollbar { 
                width: var(--ui-scrollbar-size); 
                height: var(--ui-scrollbar-size); 
            } 
            *::-webkit-scrollbar-track { background: transparent; } 
            *::-webkit-scrollbar-thumb { 
                background: var(--ui-scrollbar-thumb); 
                border-radius: var(--ui-radius-pill); 
            } 
            *::-webkit-scrollbar-thumb:hover { 
                background: var(--ui-scrollbar-thumb-hover); 
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
                background: var(--ui-bg-panel);
                border-radius: var(--ui-radius-lg);
                border: 1px solid var(--ui-border);
                display: flex;
                flex-direction: column;
                box-shadow: var(--ui-shadow-panel);
                position: absolute;
                z-index: 100;
            /*     user-select: none; */
                transition: border-color var(--ui-transition-fast), box-shadow var(--ui-transition-fast);
                flex-shrink: 0;
                margin: var(--ui-panel-margin);
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
                border: 1.8px solid var(--ui-border-circle);
                border-radius: var(--ui-radius-pill);
                transition: all var(--ui-transition-fast);
            }
            .ui-panel:hover .ui-panel-title::before {
                border-color: var(--ui-accent);
                box-shadow: 0 0 8px var(--ui-accent-glow);
            }

            .ui-header-tools { display: flex; align-items: center; gap: 4px; }
            
            .ui-icon-btn { 
                width: 22px; 
                height: 22px; 
                border-radius: var(--ui-radius-sm); 
                border: 1px solid transparent; 
                background: transparent; 
                color: var(--ui-text-muted); 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                cursor: pointer; 
                font-size: var(--ui-font-size-icon-btn); 
                line-height: 1; 
                transition: all var(--ui-transition-fast); 
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
                background: transparent;
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
                gap: 8px; 
                width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right))); 
                min-height: var(--ui-btn-height); 
                flex-shrink: 0; 
                margin: var(--ui-row-margin);
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
           /*      user-select: none;  */
                margin: var(--ui-label-margin);
            }

            .ui-btn { 
                background: var(--ui-btn-bg); 
                color: var(--ui-text-main); 
                border: 1px solid var(--ui-border); 
                padding: 0 14px; 
                border-radius: var(--ui-radius-pill); 
                font-size: var(--ui-font-size-btn); 
                font-weight: var(--ui-font-weight-medium); 
                cursor: pointer; 
                display: inline-flex; 
                align-items: center; 
                justify-content: center; 
                transition: all var(--ui-transition-glow); 
                height: var(--ui-btn-height); 
                gap: 6px; 
                flex-shrink: 0; 
                margin: var(--ui-btn-margin);
                box-shadow: 0 0 0 1px transparent;
            }
            .ui-btn:hover { 
                background: var(--ui-btn-hover-bg); 
                color: var(--ui-text-hover); 
                border-color: var(--ui-accent); 
                box-shadow: 0 0 0 3px var(--ui-accent-glow);
            }
            .ui-btn:active { transform: scale(0.95); }
            .ui-btn:disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; pointer-events: none; }
            
            .ui-btn-primary { 
                background: var(--ui-primary-bg); 
                border-color: var(--ui-primary-border); 
                color: var(--ui-primary-text); 
            }
            .ui-btn-primary:hover { 
                background: var(--ui-primary-hover-bg); 
                border-color: var(--ui-accent); 
                color: var(--ui-primary-hover-text);
                box-shadow: 0 0 0 4px var(--ui-accent-glow);
            }
            
            .ui-btn-danger { 
                background: var(--ui-danger-bg); 
                border-color: var(--ui-danger-border); 
                color: var(--ui-danger-color); 
            }
            .ui-btn-danger:hover { 
                border-color: var(--ui-danger-border-hover); 
                color: var(--ui-danger-hover); 
                box-shadow: 0 0 0 3px rgba(248, 81, 73, 0.25);
            }

            .ui-input { 
                background: var(--ui-bg-input); 
                border: 1px solid var(--ui-border); 
                color: var(--ui-text-bright); 
                padding: 0 10px; 
                border-radius: var(--ui-radius-sm); 
                font-size: var(--ui-font-size-input); 
                outline: none; 
                height: var(--ui-btn-height); 
                font-weight: var(--ui-font-weight-normal); 
                margin: var(--ui-input-margin);
                transition: all var(--ui-transition-fast);
            }
            .ui-input::placeholder { color: var(--ui-text-dim); }
            .ui-input:hover { border-color: var(--ui-border-hover); }
            .ui-input:focus { 
                border-color: var(--ui-border-focus); 
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

            .ui-select-wrap { 
                position: relative; 
                display: flex; 
                flex-direction: column; 
                flex: 1 1 100%; 
                width: 100%;
                min-width: 0; 
                margin: var(--ui-input-margin);
              /*   user-select: none; */
            }
            .ui-select-trigger {
                display: flex;
                align-items: center;
                gap: 8px;
                background: var(--ui-btn-bg);
                height: var(--ui-btn-height);
                padding: 0 12px;
                border-radius: var(--ui-radius-pill);
                cursor: pointer;
                transition: all var(--ui-transition-fast);
                border: 1px solid var(--ui-border);
                width: 100%;
                box-sizing: border-box;
            }
            .ui-select-trigger:hover { 
                border-color: var(--ui-border-hover); 
                box-shadow: 0 0 0 3px var(--ui-accent-glow);
            }
            .ui-select-wrap.is-open .ui-select-trigger {
                border-color: var(--ui-border-focus);
                box-shadow: 0 0 0 3px var(--ui-accent-glow);
            }
            .ui-select-icon-circle {
                width: 8px;
                height: 8px;
                border: 1.8px solid var(--ui-border-circle);
                border-radius: var(--ui-radius-pill);
                transition: all var(--ui-transition-fast);
                flex-shrink: 0;
            }
            .ui-select-trigger:hover .ui-select-icon-circle,
            .ui-select-wrap.is-open .ui-select-icon-circle {
                border-color: var(--ui-accent);
            }
            .ui-select-label-text {
                font-size: var(--ui-font-size-select);
                font-weight: var(--ui-font-weight-medium);
                letter-spacing: var(--ui-letter-spacing-title);
                color: var(--ui-text-main);
                flex: 1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .ui-select-arrow-svg {
                color: var(--ui-text-muted);
                transition: transform var(--ui-transition-base), color var(--ui-transition-fast);
                flex-shrink: 0;
            }
            .ui-select-wrap.is-open .ui-select-arrow-svg {
                transform: rotate(180deg);
                color: var(--ui-accent);
            }
            .dropdown-menu {
                display: none;
                position: relative;
                top: 4px;
                left: 0;
                width: 100%;
                box-sizing: border-box;
                background: var(--ui-bg-dropdown-menu);
                border: 1px solid var(--ui-border);
                border-radius: var(--ui-radius-md);
                padding: 4px;
                box-shadow: var(--ui-shadow-dropdown);
                flex-direction: column;
                gap: 2px;
                max-height: 180px;
                overflow-y: auto;
                margin-bottom: 4px;
            }
            .ui-select-wrap.is-open .dropdown-menu {
                display: flex;
                opacity: 1;
                visibility: visible;
            }
            .dropdown-item {
                padding: 6px 10px;
                font-size: var(--ui-font-size-select);
                border-radius: var(--ui-radius-sm);
                cursor: pointer;
                color: var(--ui-text-dropdown-item);
                transition: all var(--ui-transition-fast);
                display: flex;
                align-items: center;
                white-space: nowrap;
            }
            .dropdown-item:hover {
                background: var(--ui-bg-dropdown-item-hover);
                color: var(--ui-text-dropdown-item-hover);
            }
            .dropdown-item.active {
                background: var(--ui-bg-dropdown-item-active);
                color: var(--ui-accent);
                font-weight: var(--ui-font-weight-medium);
            }
            .ui-select-wrap.disabled {
                opacity: var(--ui-opacity-disabled);
                cursor: not-allowed;
                pointer-events: none;
            }

            .ui-segmented { 
                display: flex; 
                background: var(--ui-bg-segmented); 
                border: 1px solid var(--ui-border); 
                border-radius: var(--ui-radius-pill); 
                padding: 2px; 
                width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right))); 
                height: var(--ui-btn-height); 
                flex-shrink: 0; 
                margin: var(--ui-margin);
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
                border-radius: var(--ui-radius-pill); 
                transition: all var(--ui-transition-base); 
                padding: 0 6px;
            }
            .ui-seg-item.active { 
                background: var(--ui-bg-segmented-active); 
                color: var(--ui-accent); 
                font-weight: var(--ui-font-weight-semibold);
                box-shadow: 0 0 6px var(--ui-accent-glow);
            }

            .ui-checkbox { 
                display: flex; 
                align-items: center; 
                gap: 8px; 
                cursor: pointer; 
                margin: var(--ui-margin);
            }
            .ui-checkbox.disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; pointer-events: none; }
            .ui-checkbox-box { 
                width: 16px; 
                height: 16px; 
                background: var(--ui-bg-surface); 
                border: 1px solid var(--ui-border); 
                border-radius: var(--ui-radius-sm); 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                transition: all var(--ui-transition-fast); 
                flex-shrink: 0; 
            }
            .ui-checkbox:hover .ui-checkbox-box { 
                border-color: var(--ui-accent); 
                box-shadow: 0 0 0 3px var(--ui-accent-glow);
            }
            .ui-checkbox.checked .ui-checkbox-box { 
                background: var(--ui-checkbox-box-active-bg); 
                border-color: var(--ui-checkbox-box-active-border); 
                box-shadow: 0 0 8px var(--ui-accent-glow);
            }
            .ui-checkbox-mark { 
                display: none; 
                width: 8px; 
                height: 4.5px; 
                border-left: 2px solid var(--ui-checkbox-mark-color); 
                border-bottom: 2px solid var(--ui-checkbox-mark-color); 
                transform: rotate(-45deg) translate(0.5px, -0.5px); 
            }
            .ui-checkbox.checked .ui-checkbox-mark { display: block; }

            .ui-radio-group { 
                display: flex; 
                align-items: center; 
                gap: 12px; 
                margin: var(--ui-margin); 
            }
            .ui-radio-item { display: flex; align-items: center; gap: 6px; cursor: pointer; }
            .ui-radio-item.disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; pointer-events: none; }
            .ui-radio-circle { 
                width: 15px; 
                height: 15px; 
                border-radius: var(--ui-radius-pill); 
                background: var(--ui-bg-surface); 
                border: 1px solid var(--ui-border); 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                transition: all var(--ui-transition-fast); 
                flex-shrink: 0; 
            }
            .ui-radio-dot { 
                width: 7px; 
                height: 7px; 
                border-radius: var(--ui-radius-pill); 
                background: var(--ui-radio-dot-color); 
                display: none; 
            }
            .ui-radio-item:hover .ui-radio-circle {
                border-color: var(--ui-accent);
                box-shadow: 0 0 0 3px var(--ui-accent-glow);
            }
            .ui-radio-item.active .ui-radio-circle { 
                border-color: var(--ui-radio-circle-active-border); 
                background: var(--ui-radio-circle-active-bg); 
                box-shadow: 0 0 6px var(--ui-accent-glow);
            }
            .ui-radio-item.active .ui-radio-dot { display: block; }

            .ui-toggle { 
                display: flex; 
                align-items: center; 
                gap: 8px; 
                cursor: pointer; 
                margin: var(--ui-margin); 
            }
            .ui-toggle.disabled { opacity: var(--ui-opacity-disabled); cursor: not-allowed; pointer-events: none; }
            .ui-toggle-switch { 
                width: 32px; 
                height: 18px; 
                background: var(--ui-bg-toggle-switch); 
                border-radius: var(--ui-radius-pill); 
                position: relative; 
                transition: all var(--ui-transition-base); 
                border: 1px solid var(--ui-border); 
                flex-shrink: 0; 
            }
            .ui-toggle:hover .ui-toggle-switch {
                border-color: var(--ui-accent);
                box-shadow: 0 0 0 3px var(--ui-accent-glow);
            }
            .ui-toggle-thumb { 
                width: 12px; 
                height: 12px; 
                background: var(--ui-text-muted); 
                border-radius: var(--ui-radius-pill); 
                position: absolute; 
                top: 2px; 
                left: 2px; 
                transition: all var(--ui-transition-base); 
            }
            .ui-toggle.active .ui-toggle-switch { 
                background: var(--ui-toggle-switch-active-bg); 
                border-color: var(--ui-accent);
                box-shadow: 0 0 8px var(--ui-accent-glow);
            }
            .ui-toggle.active .ui-toggle-thumb { 
                background: var(--ui-toggle-thumb-active); 
                transform: translateX(14px); 
            }

            .ui-info-box { 
                background: var(--ui-info-bg); 
                border: 1px solid var(--ui-info-border); 
                border-left: 3px solid var(--ui-info-accent); 
                padding: 8px 12px; 
                border-radius: var(--ui-radius-md); 
                font-size: var(--ui-font-size-info); 
                color: var(--ui-info-text); 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                gap: 8px; 
                width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right))); 
                transition: opacity var(--ui-transition-base), transform var(--ui-transition-base); 
                flex-shrink: 0; 
                margin: var(--ui-info-margin);
            }
            .ui-info-box.fade-out { opacity: 0; transform: translateY(-4px); }
            .ui-info-close { 
                background: none; 
                border: none; 
                color: var(--ui-info-close); 
                cursor: pointer; 
                font-size: var(--ui-font-size-info-close); 
                line-height: 1; 
                padding: 3px; 
            }
            .ui-info-close:hover { color: var(--ui-info-close-hover); }

            .ui-accordion { 
                display: flex; 
                flex-direction: column; 
                gap: 6px; 
                width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right))); 
                flex-shrink: 0; 
                margin: var(--ui-accordion-margin);
            }
            .ui-accordion-item { 
                border: 1px solid var(--ui-border); 
                border-radius: var(--ui-radius-md); 
                background: var(--ui-bg-surface); 
                transition: border-color var(--ui-transition-base); 
                overflow: hidden;
            }
            .ui-accordion-item.open { 
                border-color: var(--ui-accent); 
            }
            .ui-accordion-header { 
                height: 32px; 
                padding: 0 10px; 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                cursor: pointer; 
                background: transparent; 
                transition: background var(--ui-transition-fast); 
            }
            .ui-accordion-header:hover { background: var(--ui-bg-surface-hover); }
            .ui-accordion-title { 
                font-size: var(--ui-font-size-accordion-title); 
                font-weight: var(--ui-font-weight-medium); 
                color: var(--ui-text-accordion); 
            }
            .ui-accordion-item.open .ui-accordion-title { color: var(--ui-text-accordion-open); }
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
                background: var(--ui-bg-list); 
            }
            .ui-accordion-item.open .ui-accordion-content { 
                grid-template-rows: 1fr; 
            }
            .ui-accordion-body { 
                overflow: hidden; 
                min-height: 0; 
                display: flex; 
                flex-direction: column; 
                gap: 6px; 
                padding: 0 10px; 
                transition: padding var(--ui-transition-base); 
            }
            .ui-accordion-item.open .ui-accordion-body { padding: 10px; }

            .ui-slider-card { 
                width: calc(100% - (var(--ui-margin-left) + var(--ui-margin-right))); 
                background: var(--ui-bg-surface); 
                border: 1px solid var(--ui-border); 
                border-radius: var(--ui-radius-md); 
                padding: var(--ui-slider-card-padding);
                display: flex; 
                flex-direction: column; 
                gap: 8px;
                flex-shrink: 0; 
                margin: var(--ui-slider-margin);
                transition: border-color var(--ui-transition-fast);
            }
            .ui-slider-card:hover { border-color: var(--ui-border-hover); }

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
                color: var(--ui-text-muted); 
                flex: 1; 
                white-space: nowrap; 
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .ui-slider-header-right { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
            .ui-slider-val { 
                font-size: var(--ui-font-size-slider-val); 
                font-weight: var(--ui-font-weight-semibold); 
                color: var(--ui-text-val); 
                font-variant-numeric: tabular-nums; 
            }
            .ui-cajon-btn { 
                width: 18px; 
                height: 18px; 
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
            }
            .ui-cajon-btn:hover { color: var(--ui-text-hover); border-color: var(--ui-border); }
            .ui-slider-card.open .ui-cajon-btn { transform: rotate(180deg); color: var(--ui-accent); }

            .ui-slider-content { display: flex; align-items: center; width: 100%; }
            .ui-slider-track { 
                width: 100%; 
                position: relative; 
                height: var(--ui-slider-track-height); 
                display: flex; 
                align-items: center; 
                cursor: pointer; 
                border-radius: var(--ui-radius-pill);
                background-color: var(--ui-slider-bg);
                border: 1px solid var(--ui-border);
            }
            .ui-slider-bg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
            .ui-slider-fill { 
                position: absolute; 
                height: 100%; 
                background: var(--ui-slider-fill); 
                border-radius: var(--ui-radius-pill); 
                width: 0%; 
                pointer-events: none; 
                box-shadow: 0 0 8px var(--ui-accent-glow);
            }
            .ui-slider-thumb { 
                width: var(--ui-slider-thumb-size); 
                height: var(--ui-slider-thumb-size); 
                background: var(--ui-slider-thumb); 
                border-radius: var(--ui-radius-pill); 
                position: absolute; 
                top: 50%; 
                transform: translate(-50%, -50%); 
                box-shadow: var(--ui-shadow-thumb); 
                pointer-events: none; 
                transition: transform var(--ui-transition-fast), box-shadow var(--ui-transition-fast);
            }
            .ui-slider-track:hover .ui-slider-thumb {
                transform: translate(-50%, -50%) scale(1.2);
                box-shadow: 0 0 10px var(--ui-accent);
            }

            .ui-slider-cajon { 
                display: grid; 
                grid-template-rows: 0fr; 
                transition: grid-template-rows var(--ui-transition-base); 
                background: var(--ui-bg-cajon); 
                border-radius: var(--ui-radius-sm); 
            }
            .ui-slider-card.open .ui-slider-cajon { 
                grid-template-rows: 1fr; 
                border: 1px solid var(--ui-border); 
                margin-top: 2px;
            }
            .ui-slider-cajon-inner { 
                overflow: hidden; 
                min-height: 0; 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                padding: 0 8px; 
                gap: 6px; 
                transition: padding var(--ui-transition-base); 
            }
            .ui-slider-card.open .ui-slider-cajon-inner { padding: 6px 8px; }
            .ui-cajon-tag { 
                font-size: var(--ui-font-size-cajon-tag); 
                font-weight: var(--ui-font-weight-medium); 
                color: var(--ui-text-muted); 
            }
            .ui-cajon-group { display: flex; align-items: center; gap: 4px; }
            .ui-cajon-input { 
                width: 44px; 
                text-align: center; 
                height: 22px; 
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
                border-radius: var(--ui-radius-md); 
                overflow: hidden; 
                flex-shrink: 0; 
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
                border-bottom: 1px solid var(--ui-border-card-row); 
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
                overflow-y: auto; 
                background: var(--ui-bg-list); 
                border: 1px solid var(--ui-border-list); 
                border-radius: var(--ui-radius-md); 
                padding: 6px; 
                box-sizing: border-box; 
                flex-shrink: 0; 
                margin: var(--ui-list-margin);
            }
            .ui-reorder-item { 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                padding: 6px 10px; 
                background: var(--ui-bg-surface); 
                border-radius: var(--ui-radius-sm); 
                cursor: grab; 
                border: 1px solid transparent; 
                font-size: var(--ui-font-size-reorder-item); 
                color: var(--ui-text-subtle); 
                touch-action: none; 
                transition: transform var(--ui-transition-fast), background-color var(--ui-transition-fast), border-color var(--ui-transition-fast); 
                width: 100%; 
                margin: var(--ui-list-item-margin);
            }
            .ui-reorder-item:active { cursor: grabbing; }
            .ui-reorder-item.active { background: var(--ui-bg-reorder-active); border-color: var(--ui-accent); color: var(--ui-text-bright); box-shadow: 0 0 6px var(--ui-accent-glow); }
            .ui-reorder-item.dragging { opacity: var(--ui-opacity-drag-item); transform: scale(0.96); }
            .ui-reorder-item.drag-over { border-color: var(--ui-accent); background: var(--ui-bg-reorder-dragover); }
            .ui-reorder-item-left { display: flex; align-items: center; gap: 8px; pointer-events: none; }
            .ui-reorder-item-left button { pointer-events: auto; }

            .ui-square-btn { 
                display: inline-flex; 
                align-items: center; 
                justify-content: center; 
                border-radius: var(--ui-radius-pill); 
                border: 1px solid var(--ui-border); 
                cursor: pointer; 
                transition: all var(--ui-transition-glow); 
                flex-shrink: 0; 
                font-weight: var(--ui-font-weight-medium); 
                line-height: 1; 
                margin: var(--ui-margin);
                -webkit-tap-highlight-color: transparent; 
                box-shadow: var(--ui-shadow-btn-floating);
                width: var(--ui-square-btn-size);
                height: var(--ui-square-btn-size);
                background-color: var(--ui-btn-bg);
                color: var(--ui-text-bright);
                font-size: var(--ui-font-size-btn);
            }
            .ui-square-btn:hover { 
                border-color: var(--ui-accent); 
                box-shadow: 0 0 0 4px var(--ui-accent-glow);
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
                background: var(--ui-bg-dropdown-menu); 
                border: 1px solid var(--ui-border); 
                border-radius: var(--ui-radius-md); 
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
                color: var(--ui-text-bright); 
            }
            .ui-square-tooltip-info { 
                font-size: var(--ui-font-size-tooltip-info); 
                color: var(--ui-text-muted); 
                line-height: 1.4; 
            }

            .ui-layout-modal-backdrop { 
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
                background: var(--ui-bg-list); 
                border: 1px solid var(--ui-border); 
                border-radius: var(--ui-radius-md); 
                padding: 6px; 
            }
            .ui-layout-item { 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                padding: 7px 10px; 
                background: var(--ui-bg-modal-item); 
                border: 1px solid transparent; 
                border-radius: var(--ui-radius-sm); 
                margin: var(--ui-modal-item-margin); 
                transition: all var(--ui-transition-fast); 
            }
            .ui-layout-item:hover { 
                border-color: var(--ui-accent); 
                background: var(--ui-bg-modal-item-hover); 
            }
            .ui-layout-meta { display: flex; flex-direction: column; gap: 3px; overflow: hidden; }
            .ui-layout-name { 
                font-size: var(--ui-font-size-layout-name); 
                font-weight: var(--ui-font-weight-medium); 
                color: var(--ui-text-bright); 
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
                color: var(--ui-badge-text); 
                padding: 2px 7px; 
                border-radius: var(--ui-radius-pill); 
                font-weight: var(--ui-font-weight-medium); 
                border: 1px solid var(--ui-border); 
            }

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

            let finalX = rawX, finalY = rawY, snapped = false;

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

                if (!dragging && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) dragging = true;
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
                    p.inResponsiveGrid = false; // 👉 Pertenece a UIContainer tradicional
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
                width: opts.minWidth ? `${opts.minWidth}px` : '290px',
                gap: opts.gap || 8,
                ...opts
            });
        }
    }
    
    class UIContainerFacil extends UIBaseComponent {
        constructor({
            id = null,
            width = 920,
            maxHeight = '84vh',
            gap = 8,
            padding = 8,
            floating = true,
            draggable = true
        } = {}) {
            super({ id }, 'cnt_facil');

            this.targetWidth = width;
            this.maxHeight = maxHeight;
            this.gap = gap;
            this.padding = padding;
            this.floating = floating;
            this.isDraggable = draggable;
            this.panels = [];
            this.isHidden = false;

            this.element = document.createElement('div');
            this.element.className = 'ui-container-facil';
            this.element.setAttribute('data-ui-id', this.id);

            this.element.style.cssText = `
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: flex-start;
                align-items: flex-start;
                gap: ${this.gap}px;
                padding: ${this.padding}px;
                box-sizing: border-box;
                background: transparent;
                width: min(${this.targetWidth}px, calc(100vw - 16px));
                max-width: 100vw;
                height: auto;
                max-height: ${this.maxHeight};
                overflow-y: auto;
                overflow-x: hidden;
            `;

            this.placeholder = document.createElement('div');
            this.placeholder.className = 'ui-panel-placeholder';
            this.placeholder.style.display = 'none';

            if (this.floating) {
                this.element.style.position = 'fixed';
                this.element.style.zIndex = '850';
                this.centerOnScreen();

                window.addEventListener('resize', () => this.handleResize());
                if (document.body) {
                    document.body.appendChild(this.element);
                } else {
                    window.addEventListener('DOMContentLoaded', () => document.body.appendChild(this.element));
                }
            }

            GlobalDock.registerContainer(this);
            if (this.isDraggable && this.floating) {
                this.bindDragEvents();
            }
        }

        centerOnScreen() {
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const isMobile = screenW <= 768;

            if (isMobile) {
                this.x = 8;
                this.y = 60;
                this.element.style.left = '8px';
                this.element.style.top = '60px';
                this.element.style.width = 'calc(100vw - 16px)';
            } else {
                const actualW = Math.min(this.targetWidth, screenW - 20);
                this.x = Math.max(10, (screenW - actualW) / 2);
                this.y = Math.max(60, (screenH - 520) / 2);
                this.element.style.left = `${this.x}px`;
                this.element.style.top = `${this.y}px`;
                this.element.style.width = `${actualW}px`;
            }
        }

        handleResize() {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                this.element.style.left = '8px';
                this.element.style.top = '60px';
                this.element.style.width = 'calc(100vw - 16px)';
            } else {
                this.element.style.width = `min(${this.targetWidth}px, calc(100vw - 16px))`;
            }
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

                    p.element.style.position = 'relative';
                    p.element.style.left = 'auto';
                    p.element.style.top = 'auto';
                    p.element.style.flex = '1 1 270px';
                    p.element.style.maxWidth = '100%';

                    if (!this.panels.includes(p)) this.panels.push(p);
                    this.element.appendChild(p.element);
                } else if (p.mount) {
                    p.mount(this.element);
                } else if (p instanceof HTMLElement) {
                    this.element.appendChild(p);
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
            this.placeholder.style.flex = '1 1 270px';

            const children = Array.from(this.element.children).filter(c => c !== this.placeholder);
            let targetChild = null;

            for (const child of children) {
                const rect = child.getBoundingClientRect();
                if (cx < rect.right && cy < rect.bottom) {
                    targetChild = child;
                    break;
                }
            }

            if (targetChild) this.element.insertBefore(this.placeholder, targetChild);
            else this.element.appendChild(this.placeholder);
        }

        showPlaceholderAt(element) {
            if (!this.placeholder.parentNode) this.element.appendChild(this.placeholder);
            this.placeholder.style.display = 'block';
            this.placeholder.style.flex = '1 1 270px';
            this.placeholder.style.height = `${element.offsetHeight || 60}px`;
            this.element.insertBefore(this.placeholder, element);
        }

        hidePlaceholder() {
            if (this.placeholder) {
                this.placeholder.style.display = 'none';
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

            panel.element.style.flex = '1 1 270px';
            panel.element.style.maxWidth = '100%';

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

            panel.element.style.flex = '1 1 270px';
            panel.element.style.maxWidth = '100%';

            const children = Array.from(this.element.children).filter(c => c !== this.placeholder);
            if (index >= 0 && index < children.length) {
                this.element.insertBefore(panel.element, children[index]);
                this.panels.splice(index, 0, panel);
            } else {
                this.element.appendChild(panel.element);
                this.panels.push(panel);
            }
        }

        bindDragEvents() {
            let startX = 0, startY = 0, initX = 0, initY = 0, isDragging = false;

            const onMove = (e) => {
                const cx = e.touches ? e.touches[0].clientX : e.clientX;
                const cy = e.touches ? e.touches[0].clientY : e.clientY;
                if (!isDragging && Math.hypot(cx - startX, cy - startY) > 5) isDragging = true;
                if (isDragging) {
                    this.x = initX + (cx - startX);
                    this.y = initY + (cy - startY);
                    this.element.style.left = `${this.x}px`;
                    this.element.style.top = `${this.y}px`;
                }
            };

            const onUp = () => {
                isDragging = false;
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', onUp);
                window.removeEventListener('touchmove', onMove);
                window.removeEventListener('touchend', onUp);
            };

            const onDown = (e) => {
                if (e.target.closest('.ui-panel, button, input, select, .ui-slider-track, .ui-select-trigger')) return;
                startX = e.touches ? e.touches[0].clientX : e.clientX;
                startY = e.touches ? e.touches[0].clientY : e.clientY;
                initX = this.element.offsetLeft;
                initY = this.element.offsetTop;
                window.addEventListener('mousemove', onMove);
                window.addEventListener('mouseup', onUp);
                window.addEventListener('touchmove', onMove, { passive: false });
                window.addEventListener('touchend', onUp);
            };

            this.element.addEventListener('mousedown', onDown);
            this.element.addEventListener('touchstart', onDown, { passive: true });
        }

        destroy() {
            GlobalDock.unregisterContainer(this);
            this.hidePlaceholder();
            this.panels.forEach(p => p.destroy());
            this.panels = [];
            super.destroy();
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
            this.inResponsiveGrid = false; // 👉 Bandera de seguridad
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
                if (document.body) document.body.appendChild(this.element);
                else window.addEventListener('DOMContentLoaded', () => document.body.appendChild(this.element));
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
                if (containerToJoin) containerToJoin.addPanel(this);
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
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                this.close();
            };
            this.handleToggleFloat = (e) => {
                e.stopPropagation();
                this.setFloating(!this.floating);
            };

            this.btnCollapse.onclick = this.handleCollapse;
            this.btnClose.onclick = this.handleClose;
            this.btnFloat.onclick = this.handleToggleFloat;

            let offsetX = 0, offsetY = 0, targetContainer = null, startClientX = 0, startClientY = 0, isTracking = false;

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
                // 👉 SI EL PANEL ESTÁ EN EL GRID RESPONSIVE, DEJAMOS QUE EL GRID MANEJE EL ARRASTRE
                // EN GIOPAINT inResponsiveGrid ES FALSE, POR LO QUE FUNCIONA 100% IDÉNTICO
                if (this.inResponsiveGrid) return;

                if (e.target.closest('button, input, select, .ui-accordion-header, .ui-cajon-btn, .ui-table th, .ui-table td, .ui-reorder-item, .ui-square-btn, .ui-select-trigger, .dropdown-menu, .ui-slider-track')) return;

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
                // Evita que el navegador seleccione texto o haga scroll durante el arrastre
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
                if (this.onChange) this.onChange(this.value, this);
            };

            const stopMove = () => {
                // Restaura la selección de texto en la página al soltar
                document.body.style.userSelect = '';
                document.body.style.webkitUserSelect = '';

                window.removeEventListener('mousemove', handleMove);
                window.removeEventListener('mouseup', stopMove);
                window.removeEventListener('touchmove', handleMove);
                window.removeEventListener('touchend', stopMove);
            };

            const startMove = (e) => {
                // Previene el inicio de selección nativa del navegador
                if (e.cancelable) e.preventDefault();

                // Bloquea temporalmente la selección en todo el documento
                document.body.style.userSelect = 'none';
                document.body.style.webkitUserSelect = 'none';

                // Si ya había texto seleccionado previamente por error, lo deselecciona
                if (window.getSelection) {
                    window.getSelection().removeAllRanges();
                }

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

        destroy() {
            if (this.toggleBtn) this.toggleBtn.removeEventListener('click', this.toggleCajon);
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
                    <div class="ui-select-icon-circle icon-circle"></div>
                    <span class="ui-select-label-text title"></span>
                    <svg class="ui-select-arrow-svg arrow-down" width="10" height="6" viewBox="0 0 10 6">
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

                itemEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.setValue(opt.value);
                    this.close();
                    if (this.onChange) this.onChange(this.value, this);
                });

                this.menu.appendChild(itemEl);
            });

            this.labelText.textContent = currentLabel || (this.options[0]?.label ?? '');
        }

        toggle() {
            if (this.disabled) return;
            this.isOpen ? this.close() : this.open();
        }

        open() {
            if (this.disabled || this.isOpen) return;
            document.querySelectorAll('.ui-select-wrap.is-open').forEach(el => {
                if (el !== this.element) el.classList.remove('is-open');
            });
            this.isOpen = true;
            this.element.classList.add('is-open');
        }

        close() {
            if (!this.isOpen) return;
            this.isOpen = false;
            this.element.classList.remove('is-open');
        }

        bindEvents() {
            this.trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });

            this.onDocClick = (e) => {
                if (!this.element.contains(e.target)) {
                    this.close();
                }
            };
            document.addEventListener('click', this.onDocClick);
        }

        getValue() { return this.value; }

        setValue(v) {
            this.value = v;
            const items = this.menu.querySelectorAll('.dropdown-item');
            this.options.forEach((opt, idx) => {
                const isSelected = String(opt.value) === String(this.value);
                if (items[idx]) items[idx].classList.toggle('active', isSelected);
                if (isSelected) this.labelText.textContent = opt.label;
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
            document.removeEventListener('click', this.onDocClick);
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
                            <span class="ui-badge-app">${appId}</span>
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
                        <span class="ui-label" style="margin-top:4px;">LAYOUTS (${appId}):</span>
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
                container.innerHTML = `<span class="ui-label" style="text-align:center; padding: 12px; color: var(--ui-text-dim);">NO HAY ESTADOS GUARDADOS</span>`;
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

            let offsetX = 0, offsetY = 0, startClientX = 0, startClientY = 0, isTracking = false;

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

    /* ===== GRID MAESTRO RESPONSIVE MULTIUSO (DESKTOP & MÓVIL) ===== */
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
            if (document.getElementById('ui-grid-responsive-style')) return;
            const st = document.createElement('style');
            st.id = 'ui-grid-responsive-style';
            st.textContent = `
                .ui-responsive-grid {
                    max-width: 100vw;
                    overflow-x: hidden;
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
                    border-color: var(--ui-accent, #2196F3) !important;
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
                    /* user-select: none; */
                    cursor: grab;
                }
                .ui-grid-card-header:active { cursor: grabbing; }
                .ui-grid-card-title {
                    font-size: var(--ui-font-size-panel-title, 12px);
                    font-weight: 600;
                    color: var(--ui-text-panel-title, #9a9a9a);
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .ui-grid-drag-handle {
                    color: var(--ui-text-dim, #555);
                    font-size: 13px;
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
                @media (max-width: 768px) {
                    .ui-responsive-grid {
                        grid-template-columns: 1fr !important;
                        padding: 8px !important;
                        gap: 10px !important;
                    }
                }
            `;
            document.head.appendChild(st);
        }

        addElement(item, { title = 'Elemento', colSpan = 1, collapsible = true, closable = true, draggable = true } = {}) {
            if (!item) return this;
            let card = null;

            // CASO 1: Si es un UISmartPanel
            if (item instanceof UISmartPanel) {
                // 👉 Activamos el modo seguro Grid para este panel
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
            } 
            // CASO 2: Si es un elemento libre (Canvas, Div, o Componente UI suelto)
            else {
                card = document.createElement('div');
                card.className = 'ui-grid-card';

                const content = (item.mount && item.element) ? item.element : (item instanceof HTMLElement ? item : null);

                card.innerHTML = `
                    <div class="ui-grid-card-header">
                        <span class="ui-grid-card-title">
                            ${draggable ? '<span class="ui-grid-drag-handle">⠿</span>' : ''}
                            <span>${title}</span>
                        </span>
                        <div class="ui-grid-card-tools">
                            ${collapsible ? '<button class="ui-icon-btn btn-col">_</button>' : ''}
                            ${closable ? '<button class="ui-icon-btn btn-cls">✕</button>' : ''}
                        </div>
                    </div>
                    <div class="ui-grid-card-body"></div>
                `;

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
            this.items.forEach(({ card }) => card.style.display = 'flex');
            return this;
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
        ResponsiveGrid: UIResponsiveGrid
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
    global.UIContainerFacil = UIContainerFacil;    
    global.UIResponsiveGrid = UIResponsiveGrid;

})(typeof window !== 'undefined' ? window : this);

 
