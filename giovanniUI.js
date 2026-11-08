   
     class GiovanniToggleAcordion {
  static _injectCSS() {
    if (document.getElementById('gio-accordion-theme-styles')) return;
    const style = document.createElement('style');
    style.id = 'gio-accordion-theme-styles';
    style.textContent = `
      .gio-acc-item {
        background: #2d2d2d;
       border: 1px solid #ffffff18;  
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        display: flex;
        flex-direction: column;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 12px;
        transition: border-color 0.3, box-shadow 0.2s;
        overflow: visible;
        flex-shrink: 0;
      }
      .gio-acc-item:hover {
          
      }
      .gio-acc-item.is-dragging {
        position: fixed !important;
        opacity: 0.92;
        z-index: 999999 !important;
        box-shadow: 0 16px 36px rgba(0,0,0,0.8), 0 0 15px rgba(33, 96, 199, 0.4) !important;
        pointer-events: none;
        margin: 0 !important;
        border-color: #4daafc !important;
      }

      .gio-acc-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        cursor: grab;
        user-select: none;
        background: #2d2d2d;
        border-radius: 7px;
        min-height: 40px;
        transition: background 0.2s;
      }
      .gio-acc-header:hover { background: #333333; }
      .gio-acc-header:active { cursor: grabbing; }

      .gio-acc-title {
        color: #e0e0e0;
        font-size: 13px;
        font-weight: 600;
        pointer-events: none;
      }

      .gio-acc-chevron {
        width: 15px;
        height: 15px;
        stroke: #a0a0a0;
        stroke-width: 2.2;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
        transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), stroke 0.2s;
        pointer-events: none;
      }
      .gio-acc-item.open > .gio-acc-header .gio-acc-chevron {
        transform: rotate(180deg);
        stroke: #4daafc;
      }

      .gio-acc-content {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.26s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease;
        background: #1e1e1e;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      .gio-acc-item.open > .gio-acc-content {
        opacity: 1;
      }

      .gio-acc-body {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        box-sizing: border-box;
        width: 100%;
        background: #2d2d2d;
      }
    `;
    document.head.appendChild(style);
  }

  constructor(title, parentElement = null, widthPercent = 100, maxHeight = 700) {
    GiovanniToggleAcordion._injectCSS();

    this.isOpen = false;
    this.maxHeight = maxHeight;
    this.widthPercent = widthPercent;

    this.element = document.createElement('div');
    this.element.className = 'gio-acc-item';
    this.element._gioAcordion = this;

    this.header = document.createElement('div');
    this.header.className = 'gio-acc-header';

    this.titleSpan = document.createElement('span');
    this.titleSpan.className = 'gio-acc-title';
    this.titleSpan.textContent = title;

    this.chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.chevron.setAttribute('viewBox', '0 0 24 24');
    this.chevron.setAttribute('class', 'gio-acc-chevron');
    this.chevron.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';

    this.header.appendChild(this.titleSpan);
    this.header.appendChild(this.chevron);

    this.content = document.createElement('div');
    this.content.className = 'gio-acc-content';

    this.body = document.createElement('div');
    this.body.className = 'gio-acc-body';

    this.content.appendChild(this.body);
    this.element.appendChild(this.header);
    this.element.appendChild(this.content);

    this._setupResizeObserver();
    this._initMagneticDrag();

    if (parentElement) this.adaptToParent(parentElement);
  }

  _setupResizeObserver() {
    this._ro = new ResizeObserver(() => {
      if (this.isOpen) this._updateHeight(true);
    });
    this._ro.observe(this.body);
  }

  _updateHeight(open) {
    if (!open) {
      this.content.style.overflow = 'hidden';
      this.content.style.maxHeight = '0px';
      return;
    }
    const scrollH = this.body.scrollHeight;
    if (scrollH > this.maxHeight) {
      this.content.style.maxHeight = `${this.maxHeight}px`;
      this.content.style.overflowY = 'auto';
    } else {
      this.content.style.maxHeight = `${scrollH + 30}px`;
      this.content.style.overflow = 'visible'; // Permite flotar menús y tooltips
    }
  }

  adaptToParent(container, insertBefore = null) {
    if (!container || !(container instanceof HTMLElement)) container = document.body;
    this.element.classList.remove('is-dragging');
    this.element.style.width = typeof this.widthPercent === 'number' ? `${this.widthPercent}%` : this.widthPercent;
    this.element.style.position = '';
    this.element.style.left = '';
    this.element.style.top = '';

    if (insertBefore && insertBefore.parentNode === container) {
      container.insertBefore(this.element, insertBefore);
    } else {
      container.appendChild(this.element);
    }
  }

  toggle() { this.isOpen ? this.close() : this.open(); }
  open() {
    this.isOpen = true;
    this.element.classList.add('open');
    this._updateHeight(true);
    return this;
  }
  close() {
    this.isOpen = false;
    this.element.classList.remove('open');
    this._updateHeight(false);
    return this;
  }

  _initMagneticDrag() {
    let startX = 0, startY = 0, initLeft = 0, initTop = 0;
    let isDragging = false, hasMoved = false;
    const threshold = 16; // Snap magnético en px

    // Placeholder reactivo neón azul
    let placeholder = document.getElementById('gio-snap-placeholder');
    if (!placeholder) {
      placeholder = document.createElement('div');
      placeholder.id = 'gio-snap-placeholder';
      placeholder.style.cssText = 'border:2px dashed #4daafc; border-radius:8px; background:rgba(33, 96, 199, 0.15); margin-bottom:12px; display:none; pointer-events:none; width:100%; box-sizing:border-box; transition:height 0.15s;';
      document.body.appendChild(placeholder);
    }

    // Guías láser
    let guideV = document.getElementById('gio-snap-v') || (() => {
      const g = document.createElement('div'); g.id = 'gio-snap-v';
      g.style.cssText = 'position:fixed; top:0; bottom:0; width:1px; background:#4daafc; box-shadow:0 0 8px #4daafc; z-index:9999999; display:none; pointer-events:none;';
      document.body.appendChild(g); return g;
    })();

    let guideH = document.getElementById('gio-snap-h') || (() => {
      const g = document.createElement('div'); g.id = 'gio-snap-h';
      g.style.cssText = 'position:fixed; left:0; right:0; height:1px; background:#4daafc; box-shadow:0 0 8px #4daafc; z-index:9999999; display:none; pointer-events:none;';
      document.body.appendChild(g); return g;
    })();

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!hasMoved && Math.hypot(dx, dy) > 6) {
        hasMoved = true;
        const rect = this.element.getBoundingClientRect();
        placeholder.style.height = `${rect.height}px`;
        placeholder.style.display = 'block';
        if (this.element.parentNode) {
          this.element.parentNode.insertBefore(placeholder, this.element.nextSibling);
        }

        document.body.appendChild(this.element);
        this.element.classList.add('is-dragging');
        this.element.style.width = `${rect.width}px`;
        initLeft = rect.left;
        initTop = rect.top;
      }

      if (!hasMoved) return;

      let targetX = initLeft + dx;
      let targetY = initTop + dy;

      this.element.style.pointerEvents = 'none';
      const hits = document.elementsFromPoint(e.clientX, e.clientY);
      this.element.style.pointerEvents = 'auto';

      const dropTarget = hits.find(el => el !== this.element && el !== placeholder && (
        el.classList.contains('gio-acc-item') ||
        el.classList.contains('app-workspace') ||
        el.classList.contains('gio-acc-body')
      ));

      if (dropTarget) {
        guideV.style.display = 'none';
        guideH.style.display = 'none';
        const r = dropTarget.getBoundingClientRect();
        if (dropTarget.classList.contains('gio-acc-item')) {
          dropTarget.parentNode?.insertBefore(placeholder, e.clientY < r.top + r.height / 2 ? dropTarget : dropTarget.nextSibling);
        } else {
          dropTarget.appendChild(placeholder);
        }
      } else {
        // Snap magnético a bordes
        const w = this.element.offsetWidth;
        const h = this.element.offsetHeight;
        let snapX = null, snapY = null;

        if (Math.abs(targetX) < threshold) { targetX = 0; snapX = 0; }
        if (Math.abs(targetY) < threshold) { targetY = 0; snapY = 0; }
        if (Math.abs(targetX + w - window.innerWidth) < threshold) { targetX = window.innerWidth - w; snapX = window.innerWidth; }
        if (Math.abs(targetY + h - window.innerHeight) < threshold) { targetY = window.innerHeight - h; snapY = window.innerHeight; }

        guideV.style.display = snapX !== null ? 'block' : 'none';
        if (snapX !== null) guideV.style.left = `${snapX}px`;
        guideH.style.display = snapY !== null ? 'block' : 'none';
        if (snapY !== null) guideH.style.top = `${snapY}px`;
      }

      this.element.style.left = `${targetX}px`;
      this.element.style.top = `${targetY}px`;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      guideV.style.display = 'none';
      guideH.style.display = 'none';

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      if (!hasMoved) {
        this.toggle();
        return;
      }

      if (placeholder.parentNode) {
        placeholder.parentNode.insertBefore(this.element, placeholder);
        placeholder.style.display = 'none';
        placeholder.remove();
      }

      this.element.classList.remove('is-dragging');
      this.element.style.position = '';
      this.element.style.left = '';
      this.element.style.top = '';
      this.element.style.width = typeof this.widthPercent === 'number' ? `${this.widthPercent}%` : this.widthPercent;
    };

    this.header.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || e.target.closest('button, input')) return;
      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    });
  }

  append(child) { return this.addChild(child); }
  addChild(child) {
    if (!child) return this;
    const node = child.element || (child instanceof HTMLElement ? child : null);
    if (node) {
      this.body.appendChild(node);
      if (this.isOpen) this._updateHeight(true);
    }
    return this;
  }
}

 
const GiovanniIconDB = {
  pencil: '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>',
  square: '<path d="M3 3h18v18H3V3zm2 2v14h14V5H5z"/>',
  sphere: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>',
  sliders: '<path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>',
  chevronDown: '<path d="M7 10l5 5 5-5z"/>',
  chevronLeft: '<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>',
  chevronRight: '<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>',
  reset: '<path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>',
  drop: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  home: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
  mail: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
  send: '<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>',
  check: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
  close: '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
  filter: '<path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>',
  search: '<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>'
};

const injectStyles = `
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: #444; 
        border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #666;
    }
`;
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = injectStyles;
document.head.appendChild(styleSheet);

 
class Giovanni {
    static _cssInjected = false;
    static _injectGlobalStyles() {
        if (Giovanni._cssInjected) return;
        Giovanni._cssInjected = true;
        const style = document.createElement('style');
        style.id = 'gio-core-engine-styles';
        style.textContent = `
            :root {
                --backg0: #2d2d2d;
                --backg1: #2d2d2d;
                --backg2: #2d2d2d;
                --backg3: #2d2d2d;
                --backg: #303030;
                --borde: #4d4d4d;
                 
                --slidernofill: #4a4a4a;
                --sliderfill: #363636;
     
                --texto: #ccccccde;
                --textoActivo: #e3e3e3;
                --textodisable: #60605f;
                --textoActvioBlue: #4daafc;
                --textoledBrillo: #4daafc;
                --danger: #f85149;
                --radius: 6px;
                --scrollbar-size: 5px;
            }

            .gio-container *::-webkit-scrollbar,
            .gio-custom-scroll::-webkit-scrollbar {
                width: var(--scrollbar-size);
                height: var(--scrollbar-size);
            }
            .gio-container *::-webkit-scrollbar-track,
            .gio-custom-scroll::-webkit-scrollbar-track {
                background: transparent;
            }
            .gio-container *::-webkit-scrollbar-thumb,
            .gio-custom-scroll::-webkit-scrollbar-thumb {
                background: var(--borde);
                border-radius: 10px;
            }
            .gio-container *::-webkit-scrollbar-thumb:hover,
            .gio-custom-scroll::-webkit-scrollbar-thumb:hover {
                background: var(--textoledBrillo);
            }
            .gio-container * {
                scrollbar-width: thin;
                scrollbar-color: var(--borde) transparent;
            }

            .gio-container {
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                gap: 12px;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                color: var(--texto);
            }

            /* CAMPO ARRASTRABLE */
            .gio-field {
                width: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                gap: 6px;
                background: var(--backg1);
                border: 1px solid var(--borde);
                border-radius: var(--radius);
                padding: 8px 10px;
                transition: border-color 0.2s, box-shadow 0.2s;
                position: relative;
            }
            .gio-field:hover {
                border-color: #5c5c5c;
            }

            /* ESTADO ARRASTRÁNDOSE (IDÉNTICO A GIOVANNI TOGGLE ACORDION) */
            .gio-field.is-dragging {
                position: fixed !important;
                opacity: 0.92;
                z-index: 999999 !important;
                box-shadow: 0 16px 36px rgba(0,0,0,0.8), 0 0 15px rgba(33, 96, 199, 0.4) !important;
                pointer-events: none;
                margin: 0 !important;
                border-color: #4daafc !important;
                background: var(--backg1) !important;
            }

            /* ASA DE ARRASTRE */
            .gio-field-handle {
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: grab;
                user-select: none;
                padding-bottom: 4px;
                border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
                margin-bottom: 4px;
            }
            .gio-field-handle:hover {
                border-bottom-color: var(--textoActvioBlue);
            }
            .gio-field-handle:active {
                cursor: grabbing;
            }

            .gio-field-label {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                color: var(--textodisable);
                font-weight: 700;
                pointer-events: none;
            }

            .gio-grip-icon {
                width: 12px;
                height: 12px;
                fill: var(--textodisable);
                pointer-events: none;
                transition: fill 0.2s;
            }
            .gio-field-handle:hover .gio-grip-icon {
                fill: var(--textoActvioBlue);
            }

            /* EMISIÓN LED EXACTA */
            .gio-led-exacto {
                background: var(--textoledBrillo) !important;
                -webkit-box-shadow: 0px 1px 57px 13px var(--textoledBrillo) !important;
                box-shadow: 0px 1px 57px 13px var(--textoledBrillo) !important;
            }

            @keyframes gioFadeIn {
                from { opacity: 0; transform: translateY(-4px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    constructor() {
        Giovanni._injectGlobalStyles();
        this.element = document.createElement('div');
        this.element.className = 'gio-container';
    }

    /* =========================================================================
       SISTEMA DE ARRASTRE MAGNÉTICO (IDÉNTICO A GIOVANNI TOGGLE ACORDION)
       ========================================================================= */
    _initMagneticDrag(fieldElement, handleElement) {
        let startX = 0, startY = 0, initLeft = 0, initTop = 0;
        let isDragging = false, hasMoved = false;
        const threshold = 16; // Snap a bordes en px

        // Placeholder reactivo neón azul compartido
        let placeholder = document.getElementById('gio-snap-placeholder');
        if (!placeholder) {
            placeholder = document.createElement('div');
            placeholder.id = 'gio-snap-placeholder';
            placeholder.style.cssText = 'border:2px dashed #4daafc; border-radius:8px; background:rgba(33, 96, 199, 0.15); margin-bottom:12px; display:none; pointer-events:none; width:100%; box-sizing:border-box; transition:height 0.15s;';
            document.body.appendChild(placeholder);
        }

        // Guías láser compartidas
        let guideV = document.getElementById('gio-snap-v') || (() => {
            const g = document.createElement('div'); g.id = 'gio-snap-v';
            g.style.cssText = 'position:fixed; top:0; bottom:0; width:1px; background:#4daafc; box-shadow:0 0 8px #4daafc; z-index:9999999; display:none; pointer-events:none;';
            document.body.appendChild(g); return g;
        })();

        let guideH = document.getElementById('gio-snap-h') || (() => {
            const g = document.createElement('div'); g.id = 'gio-snap-h';
            g.style.cssText = 'position:fixed; left:0; right:0; height:1px; background:#4daafc; box-shadow:0 0 8px #4daafc; z-index:9999999; display:none; pointer-events:none;';
            document.body.appendChild(g); return g;
        })();

        const onPointerMove = (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            if (!hasMoved && Math.hypot(dx, dy) > 6) {
                hasMoved = true;
                const rect = fieldElement.getBoundingClientRect();
                placeholder.style.height = `${rect.height}px`;
                placeholder.style.display = 'block';

                if (fieldElement.parentNode) {
                    fieldElement.parentNode.insertBefore(placeholder, fieldElement.nextSibling);
                }

                document.body.appendChild(fieldElement);
                fieldElement.classList.add('is-dragging');
                fieldElement.style.width = `${rect.width}px`;
                initLeft = rect.left;
                initTop = rect.top;
            }

            if (!hasMoved) return;

            let targetX = initLeft + dx;
            let targetY = initTop + dy;

            fieldElement.style.pointerEvents = 'none';
            const hits = document.elementsFromPoint(e.clientX, e.clientY);
            fieldElement.style.pointerEvents = 'auto';

            // Detecta destinos: Acordeón, body del acordeón, otro campo, workspace o contenedor
            const dropTarget = hits.find(el => el !== fieldElement && el !== placeholder && (
                el.classList.contains('gio-acc-item') ||
                el.classList.contains('gio-acc-body') ||
                el.classList.contains('app-workspace') ||
                el.classList.contains('gio-container') ||
                el.classList.contains('gio-field')
            ));

            if (dropTarget) {
                guideV.style.display = 'none';
                guideH.style.display = 'none';
                placeholder.style.display = 'block';

                const r = dropTarget.getBoundingClientRect();
                if (dropTarget.classList.contains('gio-field') || dropTarget.classList.contains('gio-acc-item')) {
                    dropTarget.parentNode?.insertBefore(placeholder, e.clientY < r.top + r.height / 2 ? dropTarget : dropTarget.nextSibling);
                } else if (dropTarget.classList.contains('gio-acc-body') || dropTarget.classList.contains('gio-container') || dropTarget.classList.contains('app-workspace')) {
                    dropTarget.appendChild(placeholder);
                }
            } else {
                // Snap magnético libre a bordes de pantalla
                placeholder.style.display = 'none';
                const w = fieldElement.offsetWidth;
                const h = fieldElement.offsetHeight;
                let snapX = null, snapY = null;

                if (Math.abs(targetX) < threshold) { targetX = 0; snapX = 0; }
                if (Math.abs(targetY) < threshold) { targetY = 0; snapY = 0; }
                if (Math.abs(targetX + w - window.innerWidth) < threshold) { targetX = window.innerWidth - w; snapX = window.innerWidth; }
                if (Math.abs(targetY + h - window.innerHeight) < threshold) { targetY = window.innerHeight - h; snapY = window.innerHeight; }

                guideV.style.display = snapX !== null ? 'block' : 'none';
                if (snapX !== null) guideV.style.left = `${snapX}px`;
                guideH.style.display = snapY !== null ? 'block' : 'none';
                if (snapY !== null) guideH.style.top = `${snapY}px`;
            }

            fieldElement.style.left = `${targetX}px`;
            fieldElement.style.top = `${targetY}px`;
        };

        const onPointerUp = () => {
            if (!isDragging) return;
            isDragging = false;
            guideV.style.display = 'none';
            guideH.style.display = 'none';

            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);

            if (!hasMoved) return;

            if (placeholder.style.display !== 'none' && placeholder.parentNode) {
                // Soltado dentro de un acordeón o contenedor
                placeholder.parentNode.insertBefore(fieldElement, placeholder);
                placeholder.style.display = 'none';
                placeholder.remove();

                fieldElement.classList.remove('is-dragging');
                fieldElement.style.position = '';
                fieldElement.style.left = '';
                fieldElement.style.top = '';
                fieldElement.style.width = '100%';
            } else {
                // Soltado en cualquier lugar libre de la página web
                placeholder.style.display = 'none';
                if (placeholder.parentNode) placeholder.remove();

                fieldElement.classList.remove('is-dragging');
                fieldElement.style.position = 'fixed';
                fieldElement.style.zIndex = '999999';
                fieldElement.style.margin = '0';
            }
        };

        handleElement.addEventListener('pointerdown', (e) => {
            if (e.button !== 0 || e.target.closest('button, input, select, textarea, .gio-led-exacto')) return;
            isDragging = true;
            hasMoved = false;
            startX = e.clientX;
            startY = e.clientY;
            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
        });
    }

    _wrapWithLabel(label, el) {
        const wrap = document.createElement('div');
        wrap.className = 'gio-field';

        const handle = document.createElement('div');
        handle.className = 'gio-field-handle';

        const lbl = document.createElement('span');
        lbl.className = 'gio-field-label';
        lbl.textContent = label || 'Control';

        const grip = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        grip.setAttribute('viewBox', '0 0 24 24');
        grip.setAttribute('class', 'gio-grip-icon');
        grip.innerHTML = `
            <circle cx="8" cy="6" r="1.8"/>
            <circle cx="16" cy="6" r="1.8"/>
            <circle cx="8" cy="12" r="1.8"/>
            <circle cx="16" cy="12" r="1.8"/>
            <circle cx="8" cy="18" r="1.8"/>
            <circle cx="16" cy="18" r="1.8"/>
        `;

        handle.appendChild(lbl);
        handle.appendChild(grip);

        wrap.appendChild(handle);
        wrap.appendChild(el);

        this._initMagneticDrag(wrap, handle);

        this.element.appendChild(wrap);
        return wrap;
    }

    /* =========================================================================
       1. CHECKBOX CON EMISIÓN LED EXACTA (18x18px)
       ========================================================================= */
    createCheckbox(label = 'Habilitar Opción', checked = false, onChange = null) {
        let isChecked = !!checked;

        const container = document.createElement('div');
        container.style.cssText = "display: flex; align-items: center; width: 100%; box-sizing: border-box;";

        const labelWrapper = document.createElement('label');
        labelWrapper.style.cssText = "display: inline-flex; align-items: center; cursor: pointer; user-select: none; gap: 10px;";

        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'checkbox';
        hiddenInput.checked = isChecked;
        hiddenInput.style.display = 'none';

        const box = document.createElement('span');
        box.style.cssText = `
            position: relative;
            width: 18px;
            height: 18px;
            border-radius: 4px;
            background: transparent;
            border: 2px solid var(--textodisable);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-sizing: border-box;
            transition: all 0.25s ease;
        `;

        const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgIcon.setAttribute('viewBox', '0 0 20 20');
        svgIcon.setAttribute('fill', '#ffffff');
        svgIcon.style.cssText = `
            width: 12px;
            height: 12px;
            transform: scale(0);
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            display: block;
        `;
        svgIcon.innerHTML = `<path clip-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" fill-rule="evenodd"></path>`;
        box.appendChild(svgIcon);

        const textSpan = document.createElement('span');
        textSpan.textContent = label;
        textSpan.style.cssText = "font-size: 13px; color: var(--texto); transition: color 0.2s ease;";

        labelWrapper.addEventListener('mouseenter', () => {
            if (!isChecked) {
                box.style.borderColor = 'var(--textoActvioBlue)';
                textSpan.style.color = 'var(--textoActivo)';
            }
        });
        labelWrapper.addEventListener('mouseleave', () => {
            if (!isChecked) {
                box.style.borderColor = 'var(--textodisable)';
                textSpan.style.color = 'var(--texto)';
            }
        });

        const updateState = (state) => {
            isChecked = state;
            hiddenInput.checked = isChecked;
            if (isChecked) {
                box.style.borderColor = 'var(--textoledBrillo)';
                box.classList.add('gio-led-exacto');
                svgIcon.style.transform = 'scale(1)';
                textSpan.style.color = 'var(--textoActivo)';
            } else {
                box.style.borderColor = 'var(--textodisable)';
                box.style.background = 'transparent';
                box.classList.remove('gio-led-exacto');
                svgIcon.style.transform = 'scale(0)';
                textSpan.style.color = 'var(--texto)';
            }
        };

        updateState(isChecked);

        labelWrapper.addEventListener('click', (e) => {
            e.preventDefault();
            updateState(!isChecked);
            if (onChange) onChange(isChecked);
        });

        labelWrapper.appendChild(hiddenInput);
        labelWrapper.appendChild(box);
        labelWrapper.appendChild(textSpan);
        container.appendChild(labelWrapper);

        return this._wrapWithLabel('Checkbox', container);
    }

    /* =========================================================================
       2. RADIO BUTTONS CON EMISIÓN LED EXACTA (18x18px)
       ========================================================================= */
    createRadio(options = [], name = 'gio_radio', selectedValue = null, onChange = null) {
        let currentVal = selectedValue !== null ? selectedValue : options[0];

        const container = document.createElement('div');
        container.style.cssText = "display: flex; flex-direction: column; gap: 8px; width: 100%; box-sizing: border-box;";

        const radioElements = [];

        options.forEach(opt => {
            const labelText = typeof opt === 'object' ? opt.label : opt;
            const val = typeof opt === 'object' ? opt.value : opt;

            const item = document.createElement('div');
            item.style.cssText = "display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; width: fit-content;";

            const circle = document.createElement('div');
            circle.style.cssText = `
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: transparent;
                border: 2px solid var(--textodisable);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                transition: border-color 0.2s;
            `;

            const dot = document.createElement('div');
            dot.style.cssText = `
                width: 8px;
                height: 8px;
                border-radius: 50%;
                transform: scale(0);
                transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            `;
            circle.appendChild(dot);

            const txt = document.createElement('span');
            txt.textContent = labelText;
            txt.style.cssText = "font-size: 13px; color: var(--texto);";

            item.appendChild(circle);
            item.appendChild(txt);
            container.appendChild(item);

            radioElements.push({ val, circle, dot, txt });

            item.addEventListener('click', () => {
                currentVal = val;
                refreshUI();
                if (onChange) onChange(currentVal);
            });
        });

        const refreshUI = () => {
            radioElements.forEach(r => {
                const isActive = r.val === currentVal;
                if (isActive) {
                    r.circle.style.borderColor = "var(--textoActvioBlue)";
                    r.dot.style.transform = "scale(1)";
                    r.dot.classList.add('gio-led-exacto');
                    r.txt.style.color = "var(--textoActivo)";
                } else {
                    r.circle.style.borderColor = "var(--textodisable)";
                    r.dot.style.transform = "scale(0)";
                    r.dot.classList.remove('gio-led-exacto');
                    r.txt.style.color = "var(--texto)";
                }
            });
        };

        refreshUI();
        return this._wrapWithLabel('Selección Exclusiva', container);
    }

    /* =========================================================================
       3. TOGGLE SWITCH CON EMISIÓN LED EXACTA
       ========================================================================= */
    createToggle(label = 'Interruptor', checked = false, onChange = null) {
        let isChecked = !!checked;

        const wrap = document.createElement('div');
        wrap.style.cssText = "display: flex; align-items: center; justify-content: space-between; gap: 10px; cursor: pointer; user-select: none; width: 100%; box-sizing: border-box;";

        const lbl = document.createElement('span');
        lbl.textContent = label;
        lbl.style.cssText = "font-size: 13px; color: var(--texto); flex: 1;";

        const switchBg = document.createElement('div');
        switchBg.style.cssText = "width: 36px; height: 20px; border-radius: 20px; background: var(--backg0); border: 1px solid var(--borde); position: relative; flex-shrink: 0; transition: all 0.25s ease;";

        const thumb = document.createElement('div');
        thumb.style.cssText = `
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--textodisable);
            position: absolute;
            top: 2px;
            left: 2px;
            transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;
        switchBg.appendChild(thumb);

        const updateState = (state) => {
            if (state) {
                thumb.style.transform = "translateX(16px)";
                thumb.classList.add('gio-led-exacto');
                switchBg.style.borderColor = "var(--textoActvioBlue)";
                lbl.style.color = "var(--textoActivo)";
            } else {
                thumb.style.transform = "translateX(0px)";
                thumb.classList.remove('gio-led-exacto');
                thumb.style.background = "var(--textodisable)";
                switchBg.style.borderColor = "var(--borde)";
                lbl.style.color = "var(--texto)";
            }
        };

        updateState(isChecked);

        wrap.addEventListener('click', () => {
            isChecked = !isChecked;
            updateState(isChecked);
            if (onChange) onChange(isChecked);
        });

        wrap.appendChild(lbl);
        wrap.appendChild(switchBg);

        return this._wrapWithLabel('Estado', wrap);
    }

    /* =========================================================================
       4. SLIDER CON CAJÓN DESPLEGABLE
       ========================================================================= */
    createSlider({ label = 'Control Deslizante', min = 0, max = 100, step = 1, value = 50, onChange = null } = {}) {
        let curMin = Number(min);
        let curMax = Number(max);
        let curStep = Number(step);
        let curVal = Math.max(curMin, Math.min(curMax, Number(value)));

        const card = document.createElement('div');
        card.style.cssText = "display: flex; flex-direction: column; gap: 8px; box-sizing: border-box; width: 100%; user-select: none;";

        const header = document.createElement('div');
        header.style.cssText = "display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%;";

        const title = document.createElement('span');
        title.textContent = label;
        title.style.cssText = "font-size: 12px; font-weight: 500; color: var(--texto); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;";

        const rightTools = document.createElement('div');
        rightTools.style.cssText = "display: flex; align-items: center; gap: 6px; flex-shrink: 0;";

        const badge = document.createElement('span');
        badge.textContent = curVal;
        badge.style.cssText = "font-size: 11px; font-family: monospace; color: var(--textoActivo); background: var(--backg3); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--borde);";

        const btnCajon = document.createElement('button');
        btnCajon.innerHTML = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="1 1 5 5 9 1"></polyline></svg>`;
        btnCajon.style.cssText = "width: 22px; height: 22px; border: 1px solid transparent; background: transparent; color: var(--textodisable); cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 4px; transition: all 0.2s;";

        rightTools.appendChild(badge);
        rightTools.appendChild(btnCajon);
        header.appendChild(title);
        header.appendChild(rightTools);

        const trackWrap = document.createElement('div');
        trackWrap.style.cssText = "width: 100%; height: 18px; display: flex; align-items: center; cursor: pointer; position: relative;";

        const trackBar = document.createElement('div');
        trackBar.style.cssText = "width: 100%; height: 4px; background: var(--slidernofill); border-radius: 2px; position: relative; pointer-events: none;";

        const fillBar = document.createElement('div');
        fillBar.style.cssText = "position: absolute; left: 0; top: 0; height: 100%; background: var(--sliderfill); border-radius: 2px; width: 0%; pointer-events: none;";

        const thumb = document.createElement('div');
        thumb.style.cssText = "position: absolute; top: 50%; transform: translate(-50%, -50%); width: 13px; height: 13px; border-radius: 50%; background: var(--backg); border: 2.5px solid #ffffff86; box-shadow: 0 1px 4px rgba(0,0,0,0.6); pointer-events: none; transition: transform 0.1s;";

        trackBar.appendChild(fillBar);
        trackBar.appendChild(thumb);
        trackWrap.appendChild(trackBar);

        const cajon = document.createElement('div');
        cajon.style.cssText = "display: none; grid-template-columns: repeat(4, 1fr); gap: 6px; padding-top: 8px; border-top: 1px solid var(--borde); width: 100%; box-sizing: border-box; animation: gioFadeIn 0.2s ease-out;";

        const createCajonInput = (name, initialVal, onValChange) => {
            const col = document.createElement('div');
            col.style.cssText = "display: flex; flex-direction: column; gap: 2px;";
            const tag = document.createElement('span');
            tag.textContent = name;
            tag.style.cssText = "font-size: 10px; color: var(--textodisable); text-transform: uppercase;";

            const inp = document.createElement('input');
            inp.type = 'number';
            inp.value = initialVal;
            inp.style.cssText = "width: 100%; height: 24px; text-align: center; background: var(--backg3); border: 1px solid var(--borde); color: #fff; font-size: 11px; border-radius: 4px; outline: none;";
            inp.addEventListener('change', () => onValChange(parseFloat(inp.value)));

            col.appendChild(tag);
            col.appendChild(inp);
            return { col, inp };
        };

        const updateVisuals = (val) => {
            curVal = Number(val);
            badge.textContent = curVal;
            const pct = curMax > curMin ? Math.min(100, Math.max(0, ((curVal - curMin) / (curMax - curMin)) * 100)) : 0;
            fillBar.style.width = `${pct}%`;
            thumb.style.left = `${pct}%`;
        };

        const handleDrag = (e) => {
            const cx = e.touches ? e.touches[0].clientX : e.clientX;
            const r = trackBar.getBoundingClientRect();
            let ratio = (cx - r.left) / r.width;
            ratio = Math.max(0, Math.min(1, ratio));

            let raw = curMin + ratio * (curMax - curMin);
            const steps = Math.round((raw - curMin) / curStep);
            let calculated = Number((curMin + steps * curStep).toFixed(2));
            calculated = Math.max(curMin, Math.min(curMax, calculated));

            updateVisuals(calculated);
            inpExact.inp.value = calculated;
            if (onChange) onChange(calculated);
        };

        const stopDrag = () => {
            thumb.style.transform = "translate(-50%, -50%) scale(1)";
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', stopDrag);
            window.removeEventListener('touchmove', handleDrag);
            window.removeEventListener('touchend', stopDrag);
        };

        const startDrag = (e) => {
            e.stopPropagation();
            if (e.cancelable) e.preventDefault();
            thumb.style.transform = "translate(-50%, -50%) scale(1.2)";
            handleDrag(e);
            window.addEventListener('mousemove', handleDrag);
            window.addEventListener('mouseup', stopDrag);
            window.addEventListener('touchmove', handleDrag, { passive: false });
            window.addEventListener('touchend', stopDrag);
        };

        trackWrap.addEventListener('mousedown', startDrag);
        trackWrap.addEventListener('touchstart', startDrag, { passive: false });

        let isOpen = false;
        btnCajon.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen = !isOpen;
            cajon.style.display = isOpen ? 'grid' : 'none';
            btnCajon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
            btnCajon.style.color = isOpen ? 'var(--textoledBrillo)' : 'var(--textodisable)';
        });

        const inpMin = createCajonInput('Mín', curMin, (v) => { if (!isNaN(v)) { curMin = v; updateVisuals(curVal); } });
        const inpMax = createCajonInput('Máx', curMax, (v) => { if (!isNaN(v)) { curMax = v; updateVisuals(curVal); } });
        const inpStep = createCajonInput('Paso', curStep, (v) => { if (!isNaN(v) && v > 0) curStep = v; });
        const inpExact = createCajonInput('Val', curVal, (v) => {
            if (!isNaN(v)) {
                updateVisuals(Math.max(curMin, Math.min(curMax, v)));
                if (onChange) onChange(curVal);
            }
        });

        cajon.appendChild(inpMin.col);
        cajon.appendChild(inpMax.col);
        cajon.appendChild(inpStep.col);
        cajon.appendChild(inpExact.col);

        card.appendChild(header);
        card.appendChild(trackWrap);
        card.appendChild(cajon);

        updateVisuals(curVal);
        return this._wrapWithLabel('Ajuste Numérico', card);
    }

    /* =========================================================================
       5. SELECTOR CON BUSCADOR
       ========================================================================= */
    createSelectSearch(options = [], selected = null, onChange = null) {
        const normalized = options.map(o => typeof o === 'object' ? o : { value: o, label: String(o) });
        let currentVal = selected !== null ? selected : (normalized[0]?.value ?? '');

        const wrap = document.createElement('div');
        wrap.style.cssText = "position: relative; width: 100%; box-sizing: border-box; user-select: none;";

        const trigger = document.createElement('div');
        trigger.tabIndex = 0;
        trigger.style.cssText = "width: 100%; height: 34px; background: var(--backg0); border: 1px solid var(--borde); border-radius: var(--radius); padding: 0 12px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; box-sizing: border-box; transition: all 0.2s;";

        const labelText = document.createElement('span');
        labelText.style.cssText = "font-size: 13px; color: var(--textoActivo); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;";

        const arrow = document.createElement('div');
        arrow.innerHTML = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="1 1 5 5 9 1"></polyline></svg>`;
        arrow.style.cssText = "transition: transform 0.2s; display: flex; align-items: center; color: var(--textodisable);";

        trigger.appendChild(labelText);
        trigger.appendChild(arrow);

        const menu = document.createElement('div');
        menu.style.cssText = "position: absolute; top: calc(100% + 5px); left: 0; width: 100%; background: var(--backg1); border: 1px solid var(--borde); border-radius: var(--radius); box-shadow: 0 10px 28px rgba(0,0,0,0.7); z-index: 1000; display: none; flex-direction: column; padding: 6px; box-sizing: border-box; animation: gioFadeIn 0.15s ease-out;";

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar...';
        searchInput.style.cssText = "width: 100%; height: 28px; background: var(--backg3); border: 1px solid var(--borde); border-radius: 4px; padding: 0 8px; color: #fff; font-size: 12px; outline: none; box-sizing: border-box; margin-bottom: 4px;";

        const itemsWrap = document.createElement('div');
        itemsWrap.className = 'gio-custom-scroll';
        itemsWrap.style.cssText = "overflow-y: auto; display: flex; flex-direction: column; gap: 2px;";

        menu.appendChild(searchInput);
        menu.appendChild(itemsWrap);
        wrap.appendChild(trigger);
        wrap.appendChild(menu);

        let isOpen = false;

        const renderList = (filter = '') => {
            itemsWrap.innerHTML = '';
            const search = filter.toLowerCase().trim();
            const filtered = normalized.filter(o => o.label.toLowerCase().includes(search));

            if (filtered.length >= 8) itemsWrap.style.maxHeight = '240px';
            else itemsWrap.style.maxHeight = 'none';

            if (filtered.length === 0) {
                const empty = document.createElement('div');
                empty.textContent = 'Sin resultados';
                empty.style.cssText = "padding: 8px; font-size: 12px; color: var(--textodisable); text-align: center;";
                itemsWrap.appendChild(empty);
                return;
            }

            filtered.forEach(opt => {
                const isSelected = opt.value === currentVal;
                const row = document.createElement('div');
                row.style.cssText = `padding: 7px 10px; font-size: 12px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; color: ${isSelected ? 'var(--textoledBrillo)' : 'var(--texto)'}; background: ${isSelected ? 'rgba(77, 170, 252, 0.15)' : 'transparent'}; font-weight: ${isSelected ? '600' : '400'};`;

                row.textContent = opt.label;
                if (isSelected) {
                    const check = document.createElement('span');
                    check.innerHTML = '✓';
                    check.style.fontSize = '12px';
                    row.appendChild(check);
                }

                row.addEventListener('mouseenter', () => { if (!isSelected) row.style.background = 'var(--backg2)'; });
                row.addEventListener('mouseleave', () => { if (!isSelected) row.style.background = 'transparent'; });

                row.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentVal = opt.value;
                    labelText.textContent = opt.label;
                    closeDropdown();
                    if (onChange) onChange(currentVal);
                });

                itemsWrap.appendChild(row);
            });
        };

        const openDropdown = () => {
            isOpen = true;
            menu.style.display = 'flex';
            trigger.style.borderColor = 'var(--textoActvioBlue)';
            arrow.style.transform = 'rotate(180deg)';
            renderList();
            setTimeout(() => searchInput.focus(), 50);
        };

        const closeDropdown = () => {
            isOpen = false;
            menu.style.display = 'none';
            trigger.style.borderColor = 'var(--borde)';
            arrow.style.transform = 'rotate(0deg)';
            searchInput.value = '';
        };

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen ? closeDropdown() : openDropdown();
        });

        searchInput.addEventListener('click', (e) => e.stopPropagation());
        searchInput.addEventListener('input', (e) => renderList(e.target.value));

        document.addEventListener('click', (e) => {
            if (!wrap.contains(e.target)) closeDropdown();
        });

        const initItem = normalized.find(o => o.value === currentVal);
        labelText.textContent = initItem ? initItem.label : (normalized[0]?.label ?? '');

        return this._wrapWithLabel('Selector Desplegable', wrap);
    }

    /* =========================================================================
       6. TABLA DINÁMICA CON REORDENAMIENTO INTERNO Y DRAG EXTERNO
       ========================================================================= */
    createTable({ label = 'Tabla de Datos', columns = [], data = [], endpoint = null, pageSize = 5, onRowDelete = null, onRowClick = null } = {}) {
        const container = document.createElement('div');
        container.style.cssText = "display: flex; flex-direction: column; gap: 6px; width: 100%; box-sizing: border-box; overflow: hidden;";

        let cols = [...columns];
        let originalData = [...data];
        let displayData = [...data];
        let currentPage = 1;
        let query = '';
        let dragColIdx = null;

        const toolbar = document.createElement('div');
        toolbar.style.cssText = "display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 6px 8px; background: var(--backg2); border-bottom: 1px solid var(--borde); border-radius: 4px 4px 0 0;";

        const search = document.createElement('input');
        search.type = 'text';
        search.placeholder = 'Buscar en tabla...';
        search.style.cssText = "flex: 1; height: 26px; border-radius: 4px; border: 1px solid var(--borde); background: var(--backg3); color: #fff; padding: 0 8px; font-size: 11px; outline: none;";

        const btnRefresh = document.createElement('button');
        btnRefresh.innerHTML = '↻';
        btnRefresh.style.cssText = "width: 26px; height: 26px; border-radius: 4px; border: 1px solid var(--borde); background: var(--backg0); color: var(--texto); cursor: pointer; display: flex; align-items: center; justify-content: center;";

        toolbar.appendChild(search);
        toolbar.appendChild(btnRefresh);

        const scrollBox = document.createElement('div');
        scrollBox.className = 'gio-custom-scroll';
        scrollBox.style.cssText = "width: 100%; overflow-x: auto;";

        const table = document.createElement('table');
        table.style.cssText = "width: 100%; border-collapse: collapse; text-align: left; font-size: 12px;";

        const thead = document.createElement('thead');
        const theadTr = document.createElement('tr');
        thead.appendChild(theadTr);

        const tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        scrollBox.appendChild(table);

        const footer = document.createElement('div');
        footer.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; background: var(--backg2); border-top: 1px solid var(--borde); font-size: 11px; color: var(--textodisable); border-radius: 0 0 4px 4px;";

        const info = document.createElement('span');
        const pager = document.createElement('div');
        pager.style.cssText = "display: flex; align-items: center; gap: 4px;";

        const btnPrev = document.createElement('button');
        btnPrev.textContent = '◀';
        btnPrev.style.cssText = "background: transparent; border: 1px solid var(--borde); color: #fff; border-radius: 4px; padding: 2px 6px; cursor: pointer;";

        const pageText = document.createElement('span');
        pageText.style.cssText = "color: #fff; font-family: monospace; padding: 0 4px;";

        const btnNext = document.createElement('button');
        btnNext.textContent = '▶';
        btnNext.style.cssText = "background: transparent; border: 1px solid var(--borde); color: #fff; border-radius: 4px; padding: 2px 6px; cursor: pointer;";

        pager.appendChild(btnPrev);
        pager.appendChild(pageText);
        pager.appendChild(btnNext);
        footer.appendChild(info);
        footer.appendChild(pager);

        const applyFilter = () => {
            if (!query) displayData = [...originalData];
            else {
                displayData = originalData.filter(row =>
                    cols.some(col => String(row[col.key] !== undefined ? row[col.key] : '').toLowerCase().includes(query))
                );
            }
            renderTable();
        };

        const renderHeaders = () => {
            theadTr.innerHTML = '';
            cols.forEach((col, idx) => {
                const th = document.createElement('th');
                th.textContent = col.label || col.key;
                th.draggable = true;
                th.style.cssText = "background: var(--backg0); color: var(--texto); padding: 7px 10px; border-bottom: 1px solid var(--borde); font-weight: 600; white-space: nowrap; cursor: grab;";

                th.addEventListener('dragstart', (e) => { e.stopPropagation(); dragColIdx = idx; });
                th.addEventListener('dragover', (e) => e.preventDefault());
                th.addEventListener('drop', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (dragColIdx !== null && dragColIdx !== idx) {
                        const moved = cols.splice(dragColIdx, 1)[0];
                        cols.splice(idx, 0, moved);
                        renderTable();
                    }
                    dragColIdx = null;
                });

                theadTr.appendChild(th);
            });

            const thDel = document.createElement('th');
            thDel.textContent = '✕';
            thDel.style.cssText = "background: var(--backg0); width: 28px; text-align: center; border-bottom: 1px solid var(--borde); color: var(--textodisable);";
            theadTr.appendChild(thDel);
        };

        const renderTable = () => {
            renderHeaders();
            tbody.innerHTML = '';

            const totalPages = Math.ceil(displayData.length / pageSize) || 1;
            currentPage = Math.min(currentPage, totalPages);
            const start = (currentPage - 1) * pageSize;
            const slice = displayData.slice(start, start + pageSize);

            info.textContent = `${displayData.length} filas`;
            pageText.textContent = `${currentPage}/${totalPages}`;
            btnPrev.disabled = currentPage <= 1;
            btnNext.disabled = currentPage >= totalPages;

            if (slice.length === 0) {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.colSpan = cols.length + 1;
                td.textContent = 'Sin datos';
                td.style.cssText = "text-align: center; padding: 12px; color: var(--textodisable);";
                tr.appendChild(td);
                tbody.appendChild(tr);
                return;
            }

            slice.forEach((row, rIdx) => {
                const tr = document.createElement('tr');
                tr.style.cssText = "border-bottom: 1px solid var(--borde); transition: background 0.15s;";
                tr.addEventListener('mouseenter', () => tr.style.background = 'var(--backg2)');
                tr.addEventListener('mouseleave', () => tr.style.background = 'transparent');

                if (onRowClick) {
                    tr.style.cursor = 'pointer';
                    tr.addEventListener('click', (e) => {
                        if (!e.target.closest('button')) onRowClick(row, start + rIdx);
                    });
                }

                cols.forEach(col => {
                    const td = document.createElement('td');
                    td.style.cssText = "padding: 7px 10px; color: var(--texto); white-space: nowrap;";
                    td.textContent = row[col.key] !== undefined ? row[col.key] : '';
                    tr.appendChild(td);
                });

                const tdAction = document.createElement('td');
                tdAction.style.cssText = "text-align: center; padding: 4px;";
                const btnDel = document.createElement('button');
                btnDel.innerHTML = '✕';
                btnDel.style.cssText = "background: transparent; border: 1px solid var(--borde); color: var(--danger); border-radius: 4px; width: 22px; height: 22px; cursor: pointer;";

                btnDel.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idx = originalData.indexOf(row);
                    if (idx !== -1) originalData.splice(idx, 1);
                    if (onRowDelete) onRowDelete(row, idx);
                    applyFilter();
                });

                tdAction.appendChild(btnDel);
                tr.appendChild(tdAction);
                tbody.appendChild(tr);
            });
        };

        search.addEventListener('input', (e) => {
            query = e.target.value.toLowerCase();
            currentPage = 1;
            applyFilter();
        });

        btnPrev.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderTable(); } });
        btnNext.addEventListener('click', () => {
            const total = Math.ceil(displayData.length / pageSize) || 1;
            if (currentPage < total) { currentPage++; renderTable(); }
        });

        btnRefresh.addEventListener('click', () => {
            if (endpoint) {
                fetch(endpoint).then(r => r.json()).then(j => {
                    originalData = Array.isArray(j) ? j : (j.data || []);
                    applyFilter();
                });
            } else renderTable();
        });

        container.appendChild(toolbar);
        container.appendChild(scrollBox);
        container.appendChild(footer);

        applyFilter();
        return this._wrapWithLabel(label, container);
    }

    getElement() {
        return this.element;
    }
}
