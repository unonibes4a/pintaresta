   
    class GiovanniToggleAcordion {
    static _injectCSS() {
        if (document.getElementById('toggle-accordion-styles')) return;
        const style = document.createElement('style');
        style.id = 'toggle-accordion-styles';
        style.textContent = `

        .clinptunmerMove{
            position: absolute;
            left: -30px;
            top: 40px;
  }
            .accordion-item {
                background: #252525;
                border: 1px solid #3a3a3a;
                border-radius: 8px;
                overflow: visible;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 10;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                max-width: 100%;
            }

            .accordion-item.anclado {
                position: relative !important;
                left: auto !important;
                top: auto !important;
                margin-left: auto !important;
                margin-right: auto !important;
                margin-bottom: 10px;
            }

            .accordion-item.is-dragging {
                opacity: 0.85;
                cursor: grabbing;
                z-index: 10000;
                position: fixed !important;
                pointer-events: none;
                margin: 0 !important;
            }

            .accordion-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 16px;
                cursor: pointer;
                user-select: none;
                background: #2d2d2d;
                border-radius: 7px;
                flex-shrink: 0;
                transition: background 0.2s ease;
            }
            .accordion-header:hover { background: #333333; }
            .accordion-header:active { cursor: grabbing; }

            .accordion-title {
                color: #e0e0e0;
                font-size: 13px;
                font-weight: 500;
                pointer-events: none;
            }

            .accordion-chevron {
                width: 15px;
                height: 15px;
                stroke: #a0a0a0;
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
                fill: none;
                transition: transform 0.3s ease, stroke 0.2s ease;
                pointer-events: none;
            }
            .accordion-item.open > .accordion-header > .accordion-chevron {
                transform: rotate(180deg);
                stroke: #2160c7;
            }

            /* VISIBILIDAD DEL CONTENIDO */
            .accordion-content {
                display: none;
                background: #1e1e1e;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                max-height: 70vh;
                overflow-y: auto;
                overflow-x: hidden;
            }
            
            /* CLASE QUE ABRE EL CONTENIDO */
            .accordion-item.open > .accordion-content {
                display: block !important;
            }

            .accordion-body {
                padding: 12px;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                gap: 10px;
            }

            .accordion-body > .accordion-item {
                grid-column: 1 / -1;
                width: 100% !important;
            }

            /* TABLA RESPONSIVA */
            .table-responsive-wrapper {
                grid-column: 1 / -1;
                width: 100%;
                overflow-x: auto;
                border: 1px solid #333;
                border-radius: 6px;
                background: #1a1a1a;
            }

            .custom-table {
                width: 100%;
                min-width: 650px;
                border-collapse: collapse;
                font-size: 12px;
                text-align: left;
            }

            .custom-table thead th {
                position: sticky;
                top: 0;
                background: #252525;
                color: #bbb;
                padding: 10px 12px;
                font-weight: 600;
                border-bottom: 2px solid #3a3a3a;
                white-space: nowrap;
                z-index: 2;
            }

            .custom-table tbody td {
                padding: 9px 12px;
                border-bottom: 1px solid #282828;
                color: #ccc;
                white-space: nowrap;
            }

            .custom-table tbody tr:hover { background: #222; }

            .badge {
                padding: 3px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 500;
            }
            .badge-success { background: rgba(39, 174, 96, 0.2); color: #2ecc71; border: 1px solid rgba(39, 174, 96, 0.4); }
            .badge-warning { background: rgba(243, 156, 18, 0.2); color: #f1c40f; border: 1px solid rgba(243, 156, 18, 0.4); }
            .badge-danger  { background: rgba(231, 76, 60, 0.2);  color: #e74c3c; border: 1px solid rgba(231, 76, 60, 0.4); }

            .table-responsive-wrapper::-webkit-scrollbar,
            .accordion-content::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            .table-responsive-wrapper::-webkit-scrollbar-thumb,
            .accordion-content::-webkit-scrollbar-thumb {
                background: #444;
                border-radius: 3px;
            }
        `;
        document.head.appendChild(style);
    }

    constructor(text, parentElement = document.body, widthPercent = 90) {
        GiovanniToggleAcordion._injectCSS();

        this.isOpen = false;
        this.isDragging = false;
        this.widthPercent = widthPercent;

        this.element = document.createElement('div');
        this.element.className = 'accordion-item anclado';

        this.header = document.createElement('div');
        this.header.className = 'accordion-header';

        this.titleSpan = document.createElement('span');
        this.titleSpan.className = 'accordion-title';
        this.titleSpan.textContent = text;

        this.svgNS = 'http://www.w3.org/2000/svg';
        this.svg = document.createElementNS(this.svgNS, 'svg');
        this.svg.setAttribute('viewBox', '0 0 24 24');
        this.svg.classList.add('accordion-chevron');

        this.polyline = document.createElementNS(this.svgNS, 'polyline');
        this.polyline.setAttribute('points', '6 9 12 15 18 9');
        this.svg.appendChild(this.polyline);

        this.header.appendChild(this.titleSpan);
        this.header.appendChild(this.svg);

        this.content = document.createElement('div');
        this.content.className = 'accordion-content';

        this.body = document.createElement('div');
        this.body.className = 'accordion-body';

        this.content.appendChild(this.body);
        this.element.appendChild(this.header);
        this.element.appendChild(this.content);

        this._setupEvents();
        this.adaptToParent(parentElement);
    }

    adaptToParent(container, insertBeforeElement = null) {
        // Fallback defensivo si el contenedor es nulo o no es un nodo HTML válido
        if (!container || !(container instanceof HTMLElement)) {
            container = document.body;
        }

        this.parentContainer = container;
        this.element.classList.remove('is-dragging');
        this.element.classList.add('anclado');

        this.element.style.width = `${this.widthPercent}%`;
        this.element.style.left = '';
        this.element.style.top = '';

        if (insertBeforeElement && insertBeforeElement.parentNode === container) {
            container.insertBefore(this.element, insertBeforeElement);
        } else {
            container.appendChild(this.element);
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.element.classList.toggle('open', this.isOpen);
    }

    open() {
        this.isOpen = true;
        this.element.classList.add('open');
        return this;
    }

    close() {
        this.isOpen = false;
        this.element.classList.remove('open');
        return this;
    }

    /* CONTROL UNIFICADO DE CLICK Y DRAG DESACOPLADO */
    _setupEvents() {
        let startX = 0, startY = 0;
        let moveDistance = 0;
        let grabOffsetX = 0, grabOffsetY = 0;

        this.header.addEventListener('pointerdown', (e) => {
            if (e.button !== 0) return; // Solo clic izquierdo
            
            this.isDragging = true;
            moveDistance = 0;
            startX = e.clientX;
            startY = e.clientY;

            const rect = this.element.getBoundingClientRect();
            grabOffsetX = e.clientX - rect.left;
            grabOffsetY = e.clientY - rect.top;

            this.header.setPointerCapture(e.pointerId);
        });

        this.header.addEventListener('pointermove', (e) => {
            if (!this.isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            moveDistance += Math.abs(dx) + Math.abs(dy);

            // Inicia el desprendimiento visual si se mueve más de 6px
            if (moveDistance > 6) {
                const rect = this.element.getBoundingClientRect();
                if (!this.element.classList.contains('is-dragging')) {
                    this.element.style.width = `${rect.width}px`;
                    this.element.classList.remove('anclado');
                    this.element.classList.add('is-dragging');
                }

                this.element.style.left = `${e.clientX - grabOffsetX}px`;
                this.element.style.top = `${e.clientY - grabOffsetY}px`;
            }
        });

        this.header.addEventListener('pointerup', (e) => {
            if (!this.isDragging) return;
            this.isDragging = false;
            
            try {
                this.header.releasePointerCapture(e.pointerId);
            } catch (err) {}

            // CASO 1: CLIC SIMPLE (Sin arrastre) -> Abre / Cierra
            if (moveDistance <= 6) {
                this.toggle();
                return;
            }

            // CASO 2: ARRASTRE REAL -> DETECCIÓN UNIVERSAL DE CUALQUIER ELEMENTO
            const elements = document.elementsFromPoint(e.clientX, e.clientY);
            let target = null;
            let insertBefore = null;

            // Etiquetas no aptas para contener bloques directos
            const voidTags = new Set(['INPUT', 'IMG', 'CANVAS', 'VIDEO', 'AUDIO', 'BR', 'HR', 'IFRAME']);
            const ignoredTags = new Set(['HTML', 'HEAD', 'SCRIPT', 'STYLE', 'META', 'TITLE']);

            for (let el of elements) {
                // No soltar dentro de sí mismo
                if (!el || el === this.element || this.element.contains(el)) continue;

                // Si se suelta en un SVG interno, subir al elemento HTML padre
                if (el instanceof SVGElement) {
                    el = el.closest(':not(svg):not(path)');
                    if (!el) continue;
                }

                const tagName = el.tagName ? el.tagName.toUpperCase() : '';
                if (ignoredTags.has(tagName)) continue;

                // Si se suelta sobre un elemento vacío (ej: input, img), insertar junto a él en su padre
                if (voidTags.has(tagName)) {
                    target = el.parentElement;
                    insertBefore = el.nextSibling;
                    break;
                }

                // Si se suelta sobre el header de otro acordeón, insertarlo antes como hermano
                if (el.classList.contains('accordion-header')) {
                    const item = el.closest('.accordion-item');
                    if (item && item !== this.element) {
                        target = item.parentElement;
                        insertBefore = item;
                        break;
                    }
                }

                // Si cae en el cuerpo de otro acordeón, anidar adentro
                const bodyZone = el.closest('.accordion-body');
                if (bodyZone && !this.element.contains(bodyZone)) {
                    target = bodyZone;
                    break;
                }

                // CUALQUIER elemento del DOM es válido (div, section, article, p, span, label, main, li, body, etc.)
                if (el.nodeType === Node.ELEMENT_NODE) {
                    target = el;
                    break;
                }
            }

            // Si no detectó nada o cayó en la raíz html, asigna body
            if (!target || target === document.documentElement) {
                target = document.body;
            }

            this.adaptToParent(target, insertBefore);
        });
    }

    addChild(child, fullWidth = false) {
        if (!child) return this;
        let node;

        if (child instanceof HTMLElement) {
            node = child;
        } else if (child.element instanceof HTMLElement) {
            child.adaptToParent(this.body);
            return this;
        } else if (typeof child === 'string') {
            const temp = document.createElement('div');
            temp.innerHTML = child;
            node = temp.firstElementChild || temp;
        }

        if (fullWidth && node) {
            node.style.gridColumn = '1 / -1';
        }

        this.body.appendChild(node);
        return this;
    }
}
// --- Iconos SVG ---
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
    constructor() {
        this.theme = {
            backg0: '#262626',
            backg1: '#2d2d2d',
            backg2: '#333333',
            backg3: '#242424',
            borde: '#4d4d4dc0',
            slidernofill: '#4a4a4a',
            sliderfill: '#b9b9b9',
            iconoTexto: '#878787',
            texto: '#cccccc',
            textoActivo: '#e3e3e3',
            textodisable: '#60605f',
            textoActvioBlue: '#2160c7',
            textoledBrillo: '#2160c7'
        };

        this.styles = {
            container: "display: flex; flex-direction: column; gap: 20px; background: #333333; padding: 3px; border-radius: 10px; width: 290px; font-family: sans-serif;",
            btnBase: `height: 40px; border-radius: 10px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg0}; color: ${this.theme.texto}; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: 0.2s; box-sizing: border-box; outline: none;`,
            btnCircle: "width: 40px;",
            btnLong: "width: 90px;",
            labelBase: "font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 6px; font-weight: 600;"
        };
        this.element = document.createElement('div');
        this.element.style.cssText = this.styles.container;
    }

    _getSVG(iconName, size = 16, color = this.theme.texto) {
        const path = GiovanniIconDB[iconName] || GiovanniIconDB['square'];
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" style="display:block; flex-shrink:0;">${path}</svg>`;
    }

    _wrapWithLabel(label, el) {
        const wrap = document.createElement('div');
        wrap.style.cssText = "display: flex; flex-direction: column; gap: 2px; position: relative;";
        if (label) {
            const lbl = document.createElement('span');
            lbl.textContent = label;
            lbl.style.cssText = this.styles.labelBase;
            wrap.appendChild(lbl);
        }
        wrap.appendChild(el);
        this.element.appendChild(wrap);
        return wrap;
    }

    _createNumericInput(val, isFloat, onChange) {
        const wrap = document.createElement('div');
        wrap.style.cssText = `position: relative; display: flex; align-items: center; justify-content: space-between; height: 28px; width: 65px; border-radius: 6px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg3}; padding: 0 4px 0 8px; box-sizing: border-box; flex-shrink: 0;`;

        const input = document.createElement('input');
        input.type = 'text'; input.value = val;
        input.style.cssText = `background: transparent; border: none; color: ${this.theme.textoActivo}; outline: none; width: 100%; font-size: 12px; font-family: inherit; position: relative; z-index: 1;`;

        const controls = document.createElement('div');
        controls.style.cssText = "display: flex; flex-direction: column; gap: 1px; justify-content: center; position: relative; z-index: 1;";

        const btnUp = document.createElement('div');
        btnUp.innerHTML = `<svg width="8" height="5" viewBox="0 0 10 6" fill="none" stroke="${this.theme.texto}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 5 5 1 9 5"></polyline></svg>`;
        btnUp.style.cssText = "cursor: pointer; display: flex; align-items: center; justify-content: center; height: 12px; width: 12px; border-radius: 2px; transition: background 0.1s;";

        const btnDown = document.createElement('div');
        btnDown.innerHTML = `<svg width="8" height="5" viewBox="0 0 10 6" fill="none" stroke="${this.theme.texto}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 1 5 5 9 1"></polyline></svg>`;
        btnDown.style.cssText = "cursor: pointer; display: flex; align-items: center; justify-content: center; height: 12px; width: 12px; border-radius: 2px; transition: background 0.1s;";

        btnUp.addEventListener('mouseenter', () => btnUp.style.background = this.theme.borde);
        btnUp.addEventListener('mouseleave', () => btnUp.style.background = 'transparent');
        btnDown.addEventListener('mouseenter', () => btnDown.style.background = this.theme.borde);
        btnDown.addEventListener('mouseleave', () => btnDown.style.background = 'transparent');

        const stepVal = isFloat ? 0.1 : 1;
        const update = (direction) => {
            let current = isFloat ? parseFloat(input.value) : parseInt(input.value, 10);
            if (isNaN(current)) current = 0;
            current += direction * stepVal;
            if (isFloat) current = Math.round(current * 100) / 100;
            input.value = current;
            onChange(current);
        };

        btnUp.addEventListener('click', () => update(1));
        btnDown.addEventListener('click', () => update(-1));

        input.addEventListener('blur', () => {
            let val = isFloat ? parseFloat(input.value) : parseInt(input.value, 10);
            if (isNaN(val)) val = 0;
            input.value = val;
            onChange(val);
        });

        input.addEventListener('input', (e) => {
            const parsed = isFloat ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
            if (!isNaN(parsed)) onChange(parsed);
        });

        controls.appendChild(btnUp);
        controls.appendChild(btnDown);
        wrap.appendChild(input);
        wrap.appendChild(controls);
        return wrap;
    }

    createSlider({ label = 'opacidad', min = 0, max = 100, step = 1, value = 30, onChange = null } = {}) {
        const container = document.createElement('div');
        container.style.cssText = `background-color: ${this.theme.backg3}; border: none; border-radius: 6px; padding: 12px 16px; width: 100%; box-sizing: border-box; color: ${this.theme.texto}; user-select: none;`;

        const row = document.createElement('div');
        row.style.cssText = "display: flex; align-items: center; justify-content: space-between; gap: 12px; position: relative;";

        const labelEl = document.createElement('span');
        labelEl.textContent = label;
        labelEl.style.cssText = `font-size: 12px; color: ${this.theme.texto}; width: 50px; flex-shrink: 0;`;

        const sliderContainer = document.createElement('div');
        sliderContainer.style.cssText = `position: relative; flex-grow: 1; height: 3px; background-color: ${this.theme.slidernofill}; border-radius: 2px; margin: 0 4px;`;

        const track = document.createElement('div');
        track.style.cssText = `position: absolute; top: 0; left: 0; height: 100%; background-color: ${this.theme.sliderfill}; border-radius: 2px; pointer-events: none;`;

        const thumb = document.createElement('div');
        thumb.style.cssText = `position: absolute; top: 50%; transform: translate(-50%, -50%); width: 14px; height: 14px; border: 2px solid ${this.theme.texto}; border-radius: 50%; pointer-events: none; box-sizing: border-box; box-shadow: 0 0 0 2px ${this.theme.backg0}; transition: transform 0.1s, border-color 0.1s;`;

        const inputRange = document.createElement('input');
        inputRange.type = 'range'; inputRange.min = min; inputRange.max = max; inputRange.step = step; inputRange.value = value;
        inputRange.style.cssText = "position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: 100%; height: 24px; opacity: 0; cursor: pointer; margin: 0; z-index: 2;";

        sliderContainer.appendChild(track);
        sliderContainer.appendChild(thumb);
        sliderContainer.appendChild(inputRange);

        const inputNum = this._createNumericInput(value, step % 1 !== 0, (val) => {
            inputRange.value = val;
            updateUI(val);
            if (onChange) onChange(val);
        });

        var labelNum = document.createElement('label');
        labelNum.innerHTML = "123";

        const toggleIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        toggleIcon.setAttribute("viewBox", "0 0 24 24");
        toggleIcon.setAttribute("width", "20");
        toggleIcon.setAttribute("height", "20");
        toggleIcon.setAttribute("fill", `${this.theme.iconoTexto}`);
        toggleIcon.innerHTML = '<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>';
        toggleIcon.style.cssText = `cursor:pointer; flex-shrink:0; margin-left:4px; display:inline-block; vertical-align:middle; transform-origin:center; transition:transform 200ms cubic-bezier(0.4,0,0.2,1);`;

        let isOpen = false;
        toggleIcon.addEventListener('click', () => {
            isOpen = !isOpen;
            toggleIcon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        const configPanel = document.createElement('div');
        configPanel.style.cssText = "display: none; flex-direction: column; gap: 8px; margin-top: 12px; padding-top: 10px; border-top: 1px solid #333333;";

        const createConfigRow = (lblText, inputEl) => {
            const wrap = document.createElement('div');
            wrap.style.cssText = "display: flex; justify-content: space-between; align-items: center; font-size: 11px;";
            const l = document.createElement('span'); l.textContent = lblText; l.style.color = '#777777';
            wrap.appendChild(l); wrap.appendChild(inputEl); return wrap;
        };

        const minInput = this._createNumericInput(min, false, (val) => {
            inputRange.min = val;
            let cur = parseFloat(inputRange.value); if (cur < val) cur = val;
            inputRange.value = cur; updateUI(cur);
        });

        const maxInput = this._createNumericInput(max, false, (val) => {
            inputRange.max = val;
            let cur = parseFloat(inputRange.value); if (cur > val) cur = val;
            inputRange.value = cur; updateUI(cur);
        });

        const stepInput = this._createNumericInput(step, step % 1 !== 0, (val) => {
            inputRange.step = val;
        });

        configPanel.appendChild(createConfigRow('Mín', minInput));
        configPanel.appendChild(createConfigRow('Máx', maxInput));
        configPanel.appendChild(createConfigRow('Step', stepInput));
        configPanel.appendChild(createConfigRow('value', inputNum));

        row.appendChild(labelEl);
        row.appendChild(sliderContainer);
        row.appendChild(toggleIcon);
        row.appendChild(labelNum);

        toggleIcon.style.position = 'relative';
        toggleIcon.style.right = '-5px';
        toggleIcon.style.top = '8px';
        labelNum.style.zIndex = '3';
        labelNum.style.position = 'absolute';
        labelNum.style.right = '-12px';
        labelNum.style.top = '-10px';
        labelNum.style.zIndex = '3';
        labelNum.style.fontSize = "12px";
        labelNum.style.cursor = 'pointer';

        container.appendChild(row);
        container.appendChild(configPanel);

        const updateUI = (val) => {
            labelNum.innerHTML = val;
            const pct = ((val - min) / (max - min)) * 100;
            track.style.width = `${pct}%`; thumb.style.left = `${pct}%`;
        };

        inputRange.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            inputNum.querySelector('input').value = val;
            updateUI(val);
            if (onChange) onChange(val);
        });

        inputRange.addEventListener('mouseenter', () => { thumb.style.borderColor = '#fff'; thumb.style.transform = 'translate(-50%, -50%) scale(1.15)'; });
        inputRange.addEventListener('mouseleave', () => { thumb.style.borderColor = this.theme.texto; thumb.style.transform = 'translate(-50%, -50%) scale(1)'; });

        toggleIcon.addEventListener('click', () => {
            const isHidden = configPanel.style.display === 'none';
            configPanel.style.display = isHidden ? 'flex' : 'none';
            toggleIcon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        updateUI(value);
        this._wrapWithLabel('Slider con Input', container);
        return container;
    }

    createSliderUI({ label = 'opacidad', min = 0, max = 100, step = 1, value = 30, onChange = null } = {}) {
        const body = document.createElement('div');
        body.style.cssText = `background-color:${this.theme.backg0}; border:1px solid ${this.theme.borde}; border-radius:6px; padding:12px 16px; width:100%; box-sizing:border-box; color:${this.theme.texto}; user-select:none; font-family:inherit;`;

        const row = document.createElement('div');
        row.style.cssText = "display:flex; align-items:center; justify-content:space-between; gap:12px;";

        const labelEl = document.createElement('span');
        labelEl.textContent = label;
        labelEl.style.cssText = `font-size:13px; color:${this.theme.iconoTexto}; width:60px; flex-shrink:0;`;

        const sliderContainer = document.createElement('div');
        sliderContainer.style.cssText = `position:relative; flex-grow:1; height:2px; background-color:${this.theme.slidernofill}; border-radius:2px; margin:0 8px;`;

        const track = document.createElement('div');
        track.style.cssText = `position:absolute; top:0; left:0; height:100%; background-color:${this.theme.sliderfill}; border-radius:2px; pointer-events:none;`;

        const thumb = document.createElement('div');
        thumb.style.cssText = `position:absolute; top:50%; transform:translate(-50%,-50%); width:14px; height:14px; background-color:${this.theme.backg0}; border:2px solid ${this.theme.sliderfill}; border-radius:50%; pointer-events:none; box-sizing:border-box; box-shadow:0 0 0 2px ${this.theme.backg0}; transition:transform .1s, border-color .1s;`;

        const input = document.createElement('input');
        input.type = 'range'; input.min = min; input.max = max; input.step = step; input.value = value;
        input.style.cssText = `position:absolute; top:50%; left:0; transform:translateY(-50%); width:100%; height:24px; opacity:0; cursor:pointer; margin:0; z-index:2;`;

        sliderContainer.append(track, thumb, input);

        const valueEl = document.createElement('span');
        valueEl.textContent = value;
        valueEl.style.cssText = `font-size:13px; color:${this.theme.iconoTexto}; width:30px; text-align:right; flex-shrink:0;`;

        const toggleIcon = document.createElement('div');
        toggleIcon.style.cssText = `width:0; height:0; border-left:4px solid transparent; border-right:4px solid transparent; border-top:5px solid ${this.theme.iconoTexto}; cursor:pointer; flex-shrink:0; transition:transform .2s; padding:4px;`;

        const configPanel = document.createElement('div');
        configPanel.style.cssText = `display:none; flex-direction:column; gap:8px; margin-top:12px; padding-top:10px; border-top:1px solid ${this.theme.borde};`;

        const makeRow = (txt, inputEl) => {
            const w = document.createElement('div');
            w.style.cssText = "display:flex; justify-content:space-between; align-items:center; font-size:12px;";
            const l = document.createElement('span');
            l.textContent = txt;
            l.style.color = this.theme.textodisable;
            inputEl.style.cssText = `background-color:${this.theme.backg2}; border:1px solid ${this.theme.borde}; color:${this.theme.textoActivo}; padding:4px 8px; border-radius:4px; width:60px; font-size:12px; outline:none;`;
            w.append(l, inputEl);
            return w;
        };

        const minInput = document.createElement('input'); minInput.type = 'number'; minInput.value = min;
        const maxInput = document.createElement('input'); maxInput.type = 'number'; maxInput.value = max;
        const stepInput = document.createElement('input'); stepInput.type = 'number'; stepInput.value = step;

        configPanel.append(
            makeRow('Mín', minInput),
            makeRow('Máx', maxInput),
            makeRow('Step', stepInput)
        );

        row.append(labelEl, sliderContainer, valueEl, toggleIcon);
        body.append(row, configPanel);

        const updateUI = (val) => {
            valueEl.textContent = val;
            const lo = parseFloat(input.min);
            const hi = parseFloat(input.max);
            const pct = ((val - lo) / (hi - lo)) * 100;
            track.style.width = `${pct}%`;
            thumb.style.left = `${pct}%`;
        };

        input.addEventListener('input', (e) => {
            const v = parseFloat(e.target.value);
            updateUI(v);
            if (onChange) onChange(v);
        });

        input.addEventListener('mouseenter', () => {
            thumb.style.borderColor = this.theme.textoActivo;
            thumb.style.transform = 'translate(-50%,-50%) scale(1.15)';
        });
        input.addEventListener('mouseleave', () => {
            thumb.style.borderColor = this.theme.sliderfill;
            thumb.style.transform = 'translate(-50%,-50%) scale(1)';
        });

        toggleIcon.addEventListener('click', () => {
            const hidden = configPanel.style.display === 'none';
            configPanel.style.display = hidden ? 'flex' : 'none';
            toggleIcon.style.transform = hidden ? 'rotate(180deg)' : 'rotate(0deg)';
        });

        const updateConfig = () => {
            input.min = parseFloat(minInput.value) || 0;
            input.max = parseFloat(maxInput.value) || 100;
            input.step = parseFloat(stepInput.value) || 1;
            let cur = parseFloat(input.value);
            if (cur < input.min) cur = input.min;
            if (cur > input.max) cur = input.max;
            input.value = cur;
            updateUI(cur);
        };
        minInput.addEventListener('change', updateConfig);
        maxInput.addEventListener('change', updateConfig);
        stepInput.addEventListener('change', updateConfig);

        updateUI(value);
        return body;
    }

    createCheckbox(label, checked, onChange) {
        const wrap = document.createElement('label');
        wrap.style.cssText = "display: flex; align-items: center; gap: 10px; cursor: pointer; height: 40px;";

        const input = document.createElement('input');
        input.type = 'checkbox'; input.checked = checked;
        input.style.cssText = "display: none;";

        const customBox = document.createElement('div');

        const updateStyle = (isChecked) => {
            if (isChecked) {
                customBox.style.background = this.theme.textoledBrillo;
                customBox.style.boxShadow = `0px 1px 57px 13px ${this.theme.textoledBrillo}`;
                customBox.style.borderColor = this.theme.textoledBrillo;
                customBox.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            } else {
                customBox.style.background = 'transparent';
                customBox.style.boxShadow = 'none';
                customBox.style.borderColor = this.theme.borde;
                customBox.innerHTML = '';
            }
        };

        customBox.style.cssText = `width: 18px; height: 18px; border-radius: 4px; border: 1px solid ${this.theme.borde}; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; box-sizing: border-box;`;
        updateStyle(checked);

        const text = document.createElement('span');
        text.textContent = label;
        text.style.cssText = `font-size: 14px; user-select: none; color: ${this.theme.texto};`;

        input.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            updateStyle(isChecked);
            if (onChange) onChange(isChecked);
        });

        wrap.appendChild(input);
        wrap.appendChild(customBox);
        if (label) wrap.appendChild(text);
        if (label) this.element.appendChild(wrap);
        return wrap;
    }

    createToggle(label, checked, onChange) {
        const wrap = document.createElement('div');
        wrap.style.cssText = "display: flex; align-items: center; justify-content: space-between; height: 40px;";
        const text = document.createElement('span');
        text.textContent = label; text.style.cssText = `font-size: 14px; color: ${this.theme.texto};`;
        const toggleBg = document.createElement('div');

        const W = 22, H = 12, CIRCLE = 9, LEFT_ON = 11, LEFT_OFF = 1.5;

        const updateStyle = (isChecked) => {
            if (isChecked) {
                toggleBg.style.background = this.theme.textoledBrillo;
                toggleBg.style.boxShadow = `0px 1px 57px 13px ${this.theme.textoledBrillo}`;
                toggleBg.style.borderColor = this.theme.textoledBrillo;
                toggleCircle.style.left = LEFT_ON + 'px';
            } else {
                toggleBg.style.background = this.theme.backg2;
                toggleBg.style.boxShadow = 'none';
                toggleBg.style.borderColor = this.theme.borde;
                toggleCircle.style.left = LEFT_OFF + 'px';
            }
        };

        toggleBg.style.cssText = `width: ${W}px; height: ${H}px; border-radius: ${H/2}px; background: ${this.theme.backg2}; position: relative; cursor: pointer; transition: 0.3s; border: 1px solid ${this.theme.borde}; box-sizing: border-box; flex-shrink: 0;`;

        const toggleCircle = document.createElement('div');
        toggleCircle.style.cssText = `width: ${CIRCLE}px; height: ${CIRCLE}px; border-radius: 50%; background: #fff; position: absolute; top: 50%; transform: translateY(-50%); left: ${checked ? LEFT_ON : LEFT_OFF}px; transition: 0.3s;`;
        toggleBg.appendChild(toggleCircle);

        let isChecked = checked;
        updateStyle(isChecked);

        toggleBg.addEventListener('click', () => {
            isChecked = !isChecked;
            updateStyle(isChecked);
            if (onChange) onChange(isChecked);
        });
        wrap.appendChild(text); wrap.appendChild(toggleBg);
        this.element.appendChild(wrap);
        return wrap;
    }

    createRadio(options, name, selectedValue, onChange) {
        const wrap = document.createElement('div');
        wrap.style.cssText = "display: flex; flex-direction: column; gap: 8px;";

        options.forEach(opt => {
            const label = document.createElement('label');
            label.style.cssText = "display: flex; align-items: center; gap: 10px; cursor: pointer; height: 40px;";

            const input = document.createElement('input');
            input.type = 'radio'; input.name = name; input.value = opt;
            input.checked = opt === selectedValue;
            input.style.cssText = "display: none;";

            const customBox = document.createElement('div');
            const innerDot = document.createElement('div');

            const updateStyle = (isChecked) => {
                if (isChecked) {
                    customBox.style.background = this.theme.textoledBrillo;
                    customBox.style.boxShadow = `0px 1px 57px 13px ${this.theme.textoledBrillo}`;
                    customBox.style.borderColor = this.theme.textoledBrillo;
                    innerDot.style.transform = 'scale(1)';
                    innerDot.style.background = '#fff';
                } else {
                    customBox.style.background = 'transparent';
                    customBox.style.boxShadow = 'none';
                    customBox.style.borderColor = this.theme.borde;
                    innerDot.style.transform = 'scale(0)';
                }
            };

            customBox.style.cssText = `width: 18px; height: 18px; border-radius: 50%; border: 1px solid ${this.theme.borde}; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; box-sizing: border-box; flex-shrink: 0;`;
            innerDot.style.cssText = `width: 8px; height: 8px; border-radius: 50%; transition: transform 0.2s ease; transform: scale(0);`;

            updateStyle(input.checked);
            customBox.appendChild(innerDot);

            const text = document.createElement('span');
            text.textContent = opt;
            text.style.cssText = `font-size: 14px; color: ${this.theme.texto}; user-select: none;`;

            input.addEventListener('change', (e) => {
                if (e.target.checked) {
                    const allInputs = wrap.querySelectorAll('input[type="radio"]');
                    allInputs.forEach(inp => {
                        const parent = inp.nextElementSibling;
                        if (inp === e.target) {
                            parent.style.background = this.theme.textoledBrillo;
                            parent.style.boxShadow = `0px 1px 57px 13px ${this.theme.textoledBrillo}`;
                            parent.style.borderColor = this.theme.textoledBrillo;
                            parent.firstElementChild.style.transform = 'scale(1)';
                            parent.firstElementChild.style.background = '#fff';
                        } else {
                            parent.style.background = 'transparent';
                            parent.style.boxShadow = 'none';
                            parent.style.borderColor = this.theme.borde;
                            parent.firstElementChild.style.transform = 'scale(0)';
                        }
                    });
                    if (onChange) onChange(opt);
                }
            });

            label.appendChild(input);
            label.appendChild(customBox);
            label.appendChild(text);
            wrap.appendChild(label);
        });

        this._wrapWithLabel('Radio Buttons', wrap);
        return wrap;
    }

    createDate(val, onChange) {
        const input = document.createElement('input');
        input.type = 'date'; input.value = val;
        input.style.cssText = `height: 40px; border-radius: 10px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg0}; color: ${this.theme.texto}; padding: 0 12px; box-sizing: border-box; outline: none; font-family: inherit; width: 100%; font-size: 14px; transition: border-color 0.2s; color-scheme: dark;`;
        input.addEventListener('change', (e) => onChange(e.target.value));
        this.element.appendChild(input);
        return input;
    }

    createColor(val, onChange) {
        const wrap = document.createElement('div');
        wrap.style.cssText = "display: flex; align-items: center; gap: 10px; height: 40px;";
        const input = document.createElement('input');
        input.type = 'color'; input.value = val;
        input.style.cssText = `width: 40px; height: 40px; padding: 0; border: 1px solid ${this.theme.borde}; border-radius: 10px; cursor: pointer; background: transparent; box-sizing: border-box;`;
        const text = document.createElement('span');
        text.textContent = val.toUpperCase(); text.style.cssText = `font-size: 14px; color: ${this.theme.texto};`;
        input.addEventListener('input', (e) => { text.textContent = e.target.value.toUpperCase(); onChange(e.target.value); });
        wrap.appendChild(input); wrap.appendChild(text);
        this._wrapWithLabel('Color', wrap);
        return wrap;
    }

    createButton(label, type, onClick) {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.style.cssText = this.styles.btnBase + (type === 'circle' ? this.styles.btnCircle : this.styles.btnLong);
        btn.addEventListener('mouseenter', () => { btn.style.background = this.theme.backg2; btn.style.borderColor = this.theme.texto; });
        btn.addEventListener('mouseleave', () => { btn.style.background = this.theme.backg0; btn.style.borderColor = this.theme.borde; });
        btn.addEventListener('click', onClick);
        return btn;
    }

    createButtonRow(buttons) {
        const row = document.createElement('div');
        row.style.cssText = "display: flex; gap: 10px; align-items: center;";
        buttons.forEach(btn => row.appendChild(btn));
        this._wrapWithLabel('Botones', row);
        return row;
    }

    createSelectSearch(options, selected, onChange) {
        const wrap = document.createElement('div');
        wrap.style.cssText = "position: relative; width: 100%;";
        const display = document.createElement('div');
        display.style.cssText = `height: 40px; border-radius: 10px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg0}; color: ${this.theme.texto}; padding: 0 12px; box-sizing: border-box; outline: none; display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-size: 14px;`;
        display.textContent = selected;
        const arrow = document.createElement('div');
        arrow.style.cssText = "width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid #888; transition: transform 0.2s; flex-shrink: 0;";
        display.appendChild(arrow);
        const dropdown = document.createElement('div');
        dropdown.style.cssText = `position: absolute; top: 45px; left: 0; width: 100%; background: ${this.theme.backg1}; border: 1px solid ${this.theme.borde}; border-radius: 10px; display: none; flex-direction: column; overflow: hidden; z-index: 10; box-sizing: border-box;`;
        const searchWrap = document.createElement('div');
        searchWrap.style.cssText = `padding: 8px; border-bottom: 1px solid ${this.theme.borde};`;
        const searchInput = document.createElement('input');
        searchInput.type = 'text'; searchInput.placeholder = 'Buscar...';
        searchInput.style.cssText = `height: 32px; border-radius: 8px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg3}; color: ${this.theme.texto}; padding: 0 8px; font-size: 13px; outline: none; width: 100%; box-sizing: border-box;`;
        searchInput.addEventListener('click', (e) => e.stopPropagation());
        searchWrap.appendChild(searchInput);
        const listContainer = document.createElement('div');
        listContainer.style.cssText = "max-height: 150px; overflow-y: auto; display: flex; flex-direction: column;";
        let isOpen = false;
        const renderOptions = (filterText = '') => {
            listContainer.innerHTML = '';
            const filtered = options.filter(opt => opt.toLowerCase().includes(filterText.toLowerCase()));
            if (filtered.length === 0) {
                const empty = document.createElement('div');
                empty.textContent = 'No hay resultados';
                empty.style.cssText = `padding: 10px 12px; font-size: 14px; color: ${this.theme.textodisable}; text-align: center;`;
                listContainer.appendChild(empty); return;
            }
            filtered.forEach(opt => {
                const item = document.createElement('div');
                item.textContent = opt;
                item.style.cssText = `padding: 10px 12px; cursor: pointer; font-size: 14px; color: ${this.theme.texto}; transition: background 0.1s; box-sizing: border-box;`;
                item.addEventListener('mouseenter', () => item.style.background = this.theme.backg2);
                item.addEventListener('mouseleave', () => item.style.background = 'transparent');
                item.addEventListener('click', () => {
                    display.firstChild.textContent = opt;
                    dropdown.style.display = 'none'; isOpen = false;
                    arrow.style.transform = 'rotate(0deg)'; searchInput.value = ''; onChange(opt);
                });
                listContainer.appendChild(item);
            });
        };
        searchInput.addEventListener('input', (e) => renderOptions(e.target.value));
        display.addEventListener('click', (e) => {
            e.stopPropagation(); isOpen = !isOpen;
            dropdown.style.display = isOpen ? 'flex' : 'none';
            arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
            if (isOpen) { searchInput.value = ''; renderOptions(); setTimeout(() => searchInput.focus(), 50); }
        });
        document.addEventListener('click', () => {
            if (isOpen) { dropdown.style.display = 'none'; isOpen = false; arrow.style.transform = 'rotate(0deg)'; }
        });
        dropdown.appendChild(searchWrap); dropdown.appendChild(listContainer);
        wrap.appendChild(display); wrap.appendChild(dropdown);
        renderOptions();
        this._wrapWithLabel('Selector con Búsqueda', wrap);
        return wrap;
    }

    createInputText(placeholder, val, onChange) {
        const wrap = document.createElement('div');
        wrap.style.cssText = `position: relative; display: flex; align-items: center; height: 40px; border-radius: 10px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg0}; box-sizing: border-box; transition: background 0.2s, border-color 0.2s; overflow: hidden;`;
        const glow = document.createElement('div');
        glow.style.cssText = `position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: ${this.theme.textoActvioBlue}; transform: scaleX(0); transform-origin: left; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);`;
        const input = document.createElement('input');
        input.type = 'text'; input.placeholder = placeholder; input.value = val;
        input.style.cssText = `background: transparent; border: none; color: ${this.theme.texto}; outline: none; width: 100%; height: 100%; padding: 0 12px; font-size: 14px; font-family: inherit; position: relative; z-index: 1; transition: color 0.2s;`;
        input.addEventListener('mouseenter', () => { if (document.activeElement !== input) wrap.style.background = this.theme.backg1; });
        input.addEventListener('mouseleave', () => { if (document.activeElement !== input) wrap.style.background = this.theme.backg0; });
        input.addEventListener('focus', () => { wrap.style.borderColor = this.theme.borde; wrap.style.background = this.theme.backg3; glow.style.transform = 'scaleX(1)'; input.style.color = this.theme.textoActivo; });
        input.addEventListener('blur', () => { wrap.style.background = this.theme.backg0; glow.style.transform = 'scaleX(0)'; input.style.color = this.theme.texto; });
        input.addEventListener('input', (e) => onChange(e.target.value));
        wrap.appendChild(glow); wrap.appendChild(input);
        this._wrapWithLabel('Input Texto', wrap);
        return wrap;
    }

    createInputNumber(val, isFloat, onChange) {
        const wrap = document.createElement('div');
        wrap.style.cssText = `position: relative; display: flex; align-items: center; justify-content: space-between; height: 40px; border-radius: 10px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg0}; padding: 0 8px 0 12px; box-sizing: border-box; transition: background 0.2s, border-color 0.2s; overflow: hidden;`;
        const glow = document.createElement('div');
        glow.style.cssText = `position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: ${this.theme.textoActvioBlue}; transform: scaleX(0); transform-origin: left; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);`;
        const input = document.createElement('input');
        input.type = 'text'; input.value = val;
        input.style.cssText = `background: transparent; border: none; color: ${this.theme.texto}; outline: none; width: 100%; font-size: 14px; font-family: inherit; position: relative; z-index: 1; transition: color 0.2s;`;
        const controls = document.createElement('div');
        controls.style.cssText = "display: flex; flex-direction: column; gap: 2px; justify-content: center; position: relative; z-index: 1;";
        const btnUp = document.createElement('div');
        btnUp.innerHTML = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="${this.theme.texto}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 5 5 1 9 5"></polyline></svg>`;
        btnUp.style.cssText = "cursor: pointer; display: flex; align-items: center; justify-content: center; height: 14px; width: 14px; border-radius: 3px; transition: background 0.1s;";
        const btnDown = document.createElement('div');
        btnDown.innerHTML = `<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="${this.theme.texto}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 1 5 5 9 1"></polyline></svg>`;
        btnDown.style.cssText = "cursor: pointer; display: flex; align-items: center; justify-content: center; height: 14px; width: 14px; border-radius: 3px; transition: background 0.1s;";
        btnUp.addEventListener('mouseenter', () => btnUp.style.background = this.theme.backg2);
        btnUp.addEventListener('mouseleave', () => btnUp.style.background = 'transparent');
        btnDown.addEventListener('mouseenter', () => btnDown.style.background = this.theme.backg2);
        btnDown.addEventListener('mouseleave', () => btnDown.style.background = 'transparent');
        const stepVal = isFloat ? 0.1 : 1;
        const update = (direction) => {
            let current = isFloat ? parseFloat(input.value) : parseInt(input.value, 10);
            if (isNaN(current)) current = 0;
            current += direction * stepVal;
            if (isFloat) current = Math.round(current * 100) / 100;
            input.value = current;
            onChange(current);
        };
        btnUp.addEventListener('click', () => update(1));
        btnDown.addEventListener('click', () => update(-1));
        input.addEventListener('mouseenter', () => { if (document.activeElement !== input) wrap.style.background = this.theme.backg1; });
        input.addEventListener('mouseleave', () => { if (document.activeElement !== input) wrap.style.background = this.theme.backg0; });
        input.addEventListener('focus', () => { wrap.style.borderColor = this.theme.borde; wrap.style.background = this.theme.backg3; glow.style.transform = 'scaleX(1)'; input.style.color = this.theme.textoActivo; });
        input.addEventListener('blur', () => { wrap.style.background = this.theme.backg0; glow.style.transform = 'scaleX(0)'; input.style.color = this.theme.texto; });
        input.addEventListener('input', (e) => { const parsed = isFloat ? parseFloat(e.target.value) : parseInt(e.target.value, 10); onChange(isNaN(parsed) ? 0 : parsed); });
        controls.appendChild(btnUp); controls.appendChild(btnDown);
        wrap.appendChild(glow); wrap.appendChild(input); wrap.appendChild(controls);
        this._wrapWithLabel(isFloat ? 'Input Float' : 'Input Entero', wrap);
        return wrap;
    }

    createTextarea(placeholder, val, rows, onChange) {
        const wrap = document.createElement('div');
        wrap.style.cssText = `position: relative; display: flex; flex-direction: column; background: ${this.theme.backg0}; border: 1px solid ${this.theme.borde}; border-radius: 10px; overflow: hidden; transition: background 0.2s, border-color 0.2s;`;
        const glow = document.createElement('div');
        glow.style.cssText = `position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: ${this.theme.textoActvioBlue}; transform: scaleX(0); transform-origin: left; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 2;`;
        const textarea = document.createElement('textarea');
        textarea.placeholder = placeholder; textarea.value = val; textarea.rows = rows;
        textarea.style.cssText = `background: transparent; border: none; color: ${this.theme.texto}; outline: none; resize: none; padding: 12px; font-size: 14px; font-family: inherit; width: 100%; box-sizing: border-box; min-height: 80px; position: relative; z-index: 1; transition: color 0.2s;`;
        const bottomBar = document.createElement('div');
        bottomBar.style.cssText = `display: flex; justify-content: flex-end; align-items: center; padding: 4px 8px; border-top: 1px solid ${this.theme.borde}; background: ${this.theme.backg3}; position: relative; z-index: 1;`;
        const charCount = document.createElement('span');
        charCount.textContent = val.length + ' / 500';
        charCount.style.cssText = `font-size: 11px; color: ${this.theme.textodisable};`;
        bottomBar.appendChild(charCount);
        textarea.addEventListener('mouseenter', () => { if (document.activeElement !== textarea) wrap.style.background = this.theme.backg1; });
        textarea.addEventListener('mouseleave', () => { if (document.activeElement !== textarea) wrap.style.background = this.theme.backg0; });
        textarea.addEventListener('focus', () => { wrap.style.borderColor = this.theme.borde; wrap.style.background = this.theme.backg3; glow.style.transform = 'scaleX(1)'; textarea.style.color = this.theme.textoActivo; });
        textarea.addEventListener('blur', () => { wrap.style.background = this.theme.backg0; glow.style.transform = 'scaleX(0)'; textarea.style.color = this.theme.texto; });
        textarea.addEventListener('input', (e) => { let content = e.target.value; if (content.length > 500) content = content.substring(0, 500); textarea.value = content; charCount.textContent = content.length + ' / 500'; onChange(content); });
        wrap.appendChild(glow); wrap.appendChild(textarea); wrap.appendChild(bottomBar);
        this._wrapWithLabel('Textarea', wrap);
        return wrap;
    }

    createLayerManager(initialLayers, onChange) {
        const container = document.createElement('div');
        container.style.cssText = `background-color: ${this.theme.backg0}; border: 1px solid ${this.theme.borde}; border-radius: 10px; padding: 12px; width: 100%; box-sizing: border-box; display: flex; flex-direction: column; gap: 8px;`;

        const listContainer = document.createElement('div');
        listContainer.style.cssText = "display: flex; flex-direction: column; gap: 6px; width: 100%;";

        let layers = [...initialLayers];

        const updateLayout = () => {
            const width = container.clientWidth;
            if (width <= 300) {
                listContainer.style.flexDirection = 'column';
                listContainer.style.flexWrap = 'nowrap';
            } else {
                listContainer.style.flexDirection = 'row';
                listContainer.style.flexWrap = 'wrap';
            }
        };

        const renderLayers = () => {
            listContainer.innerHTML = '';
            layers.forEach((layer, index) => {
                const item = document.createElement('div');
                item.draggable = true;
                item.dataset.id = layer.id;
                item.dataset.index = index;
                item.style.cssText = `display: flex; align-items: center; justify-content: space-between; height: 40px; background: ${this.theme.backg1}; border: 1px solid ${this.theme.borde}; border-radius: 8px; padding: 0 8px; box-sizing: border-box; color: ${this.theme.texto}; font-size: 13px; cursor: grab; transition: opacity 0.2s, background 0.2s; flex: 1; min-width: 100px; max-width: 100%;`;

                const leftWrap = document.createElement('div');
                leftWrap.style.cssText = "display: flex; align-items: center; gap: 8px; pointer-events: none;";

                const dragHandle = document.createElement('div');
                dragHandle.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${this.theme.texto}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>`;

                const checkboxEl = this.createCheckbox('', layer.visible !== false, (checked) => {
                    layer.visible = checked;
                    if (onChange) onChange(layers.map(l => l.id), layers);
                });

                const checkboxInput = checkboxEl.querySelector('input');
                checkboxInput.checked = layer.visible !== false;
                const event = new Event('change');
                checkboxInput.dispatchEvent(event);

                const checkboxBox = checkboxEl.querySelector('div');
                checkboxBox.style.width = '16px';
                checkboxBox.style.height = '16px';
                checkboxEl.style.pointerEvents = 'auto';
                checkboxEl.style.height = 'auto';

                const icon = document.createElement('div');
                icon.textContent = layer.type === 'text' ? 'T' : layer.type === 'image' ? '🖼️' : '⬛';
                icon.style.cssText = `width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; background: ${this.theme.backg3}; border-radius: 4px; font-size: 10px; color: ${this.theme.textodisable};`;

                const text = document.createElement('span');
                text.textContent = layer.name;
                text.style.cssText = "white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px;";

                leftWrap.appendChild(dragHandle);
                leftWrap.appendChild(checkboxEl);
                leftWrap.appendChild(icon);
                leftWrap.appendChild(text);

                const actionBtn = document.createElement('button');
                actionBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${this.theme.texto}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
                actionBtn.style.cssText = `width: 24px; height: 24px; border-radius: 4px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg2}; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 0; flex-shrink: 0; transition: background 0.2s;`;
                actionBtn.addEventListener('mouseenter', () => actionBtn.style.background = this.theme.borde);
                actionBtn.addEventListener('mouseleave', () => actionBtn.style.background = this.theme.backg2);
                actionBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    layers = layers.filter(l => l.id !== layer.id);
                    renderLayers();
                    updateLayout();
                    if (onChange) onChange(layers.map(l => l.id), layers);
                });

                item.appendChild(leftWrap);
                item.appendChild(actionBtn);

                item.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', index);
                    setTimeout(() => item.style.opacity = '0.4', 0);
                });
                item.addEventListener('dragend', () => { item.style.opacity = '1'; });
                item.addEventListener('dragover', (e) => { e.preventDefault(); item.style.borderColor = this.theme.textoActvioBlue; });
                item.addEventListener('dragleave', () => { item.style.borderColor = this.theme.borde; });
                item.addEventListener('drop', (e) => {
                    e.preventDefault();
                    item.style.borderColor = this.theme.borde;
                    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
                    if (fromIndex !== index) {
                        const movedItem = layers.splice(fromIndex, 1)[0];
                        layers.splice(index, 0, movedItem);
                        renderLayers();
                        updateLayout();
                        if (onChange) onChange(layers.map(l => l.id), layers);
                    }
                });

                listContainer.appendChild(item);
            });
        };

        renderLayers();
        container.appendChild(listContainer);

        window.addEventListener('resize', updateLayout);
        setTimeout(updateLayout, 0);

        this._wrapWithLabel('Capas (Arrastrables)', container);
        return container;
    }

    createTreeView(data, onChange) {
        const treeContainer = document.createElement('div');
        treeContainer.style.cssText = `background: ${this.theme.backg0}; border: 1px solid ${this.theme.borde}; border-radius: 8px; padding: 6px; display: flex; flex-direction: column; gap: 2px; box-sizing: border-box; user-select: none; max-height: 350px; overflow-y: auto;`;

        let treeData = JSON.parse(JSON.stringify(data));
        let draggedId = null;

        const findAndRemove = (nodes, id) => {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === id) return nodes.splice(i, 1)[0];
                if (nodes[i].children && nodes[i].children.length) {
                    const found = findAndRemove(nodes[i].children, id);
                    if (found) return found;
                }
            }
            return null;
        };

        const isDescendant = (parent, childId) => {
            if (!parent.children) return false;
            for (let c of parent.children) {
                if (c.id === childId) return true;
                if (isDescendant(c, childId)) return true;
            }
            return false;
        };

        const insertNode = (nodes, targetId, nodeToInsert, position) => {
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].id === targetId) {
                    if (position === 'inside') {
                        nodes[i].children = nodes[i].children || [];
                        nodes[i].children.push(nodeToInsert);
                        nodes[i].expanded = true;
                    } else if (position === 'before') {
                        nodes.splice(i, 0, nodeToInsert);
                    } else if (position === 'after') {
                        nodes.splice(i + 1, 0, nodeToInsert);
                    }
                    return true;
                }
                if (nodes[i].children && nodes[i].children.length) {
                    if (insertNode(nodes[i].children, targetId, nodeToInsert, position)) return true;
                }
            }
            return false;
        };

        const renderTree = () => {
            treeContainer.innerHTML = '';

            const buildNodes = (nodes, depth = 0) => {
                if (!Array.isArray(nodes)) return [];

                return nodes.map(node => {
                    const rowWrap = document.createElement('div');
                    rowWrap.style.cssText = "display: flex; flex-direction: column; width: 100%; position: relative;";

                    const row = document.createElement('div');
                    row.draggable = true;
                    row.dataset.id = node.id;
                    row.style.cssText = `display: flex; align-items: center; gap: 6px; height: 32px; padding: 0 6px 0 ${4 + depth * 14}px; border-radius: 6px; cursor: pointer; color: ${this.theme.texto}; font-size: 13px; border: 1px solid transparent; transition: background 0.15s, border-color 0.15s; box-sizing: border-box;`;

                    const chevron = document.createElement('div');
                    const hasChildren = node.children && node.children.length > 0;
                    chevron.style.cssText = `width: 14px; height: 14px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s; ${hasChildren ? '' : 'visibility: hidden;'}`;
                    chevron.innerHTML = this._getSVG('chevronDown', 12, this.theme.textodisable);
                    chevron.style.transform = node.expanded ? 'rotate(0deg)' : 'rotate(-90deg)';

                    chevron.addEventListener('click', (e) => {
                        e.stopPropagation();
                        node.expanded = !node.expanded;
                        renderTree();
                    });

                    const check = document.createElement('div');
                    const isChecked = node.checked !== false;
                    check.style.cssText = `width: 14px; height: 14px; border-radius: 3px; border: 1px solid ${isChecked ? this.theme.textoledBrillo : this.theme.borde}; background: ${isChecked ? this.theme.textoledBrillo : 'transparent'}; box-shadow: ${isChecked ? `0 0 8px ${this.theme.textoledBrillo}` : 'none'}; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0;`;
                    if (isChecked) check.innerHTML = this._getSVG('check', 10, '#fff');

                    check.addEventListener('click', (e) => {
                        e.stopPropagation();
                        node.checked = !isChecked;
                        renderTree();
                        if (onChange) onChange(treeData);
                    });

                    const iconEl = document.createElement('div');
                    iconEl.innerHTML = this._getSVG(node.icon || 'square', 14, this.theme.textoActivo);

                    const label = document.createElement('span');
                    label.textContent = node.text;
                    label.style.cssText = "white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex-grow: 1;";

                    row.appendChild(chevron);
                    row.appendChild(check);
                    row.appendChild(iconEl);
                    row.appendChild(label);

                    row.addEventListener('mouseenter', () => { if (draggedId !== node.id) row.style.background = this.theme.backg1; });
                    row.addEventListener('mouseleave', () => { if (draggedId !== node.id) row.style.background = 'transparent'; });

                    row.addEventListener('dragstart', (e) => {
                        draggedId = node.id;
                        e.dataTransfer.setData('text/plain', node.id);
                        setTimeout(() => row.style.opacity = '0.35', 0);
                    });
                    row.addEventListener('dragend', () => {
                        draggedId = null;
                        row.style.opacity = '1';
                        renderTree();
                    });

                    row.addEventListener('dragover', (e) => {
                        e.preventDefault();
                        if (draggedId === node.id) return;
                        const rect = row.getBoundingClientRect();
                        const relY = e.clientY - rect.top;
                        row.style.borderTop = '1px solid transparent';
                        row.style.borderBottom = '1px solid transparent';
                        row.style.borderColor = 'transparent';
                        row.style.background = 'transparent';
                        if (relY < rect.height * 0.25) {
                            row.style.borderTop = `2px solid ${this.theme.textoActvioBlue}`;
                        } else if (relY > rect.height * 0.75) {
                            row.style.borderBottom = `2px solid ${this.theme.textoActvioBlue}`;
                        } else {
                            row.style.background = this.theme.backg2;
                            row.style.borderColor = this.theme.textoActvioBlue;
                        }
                    });

                    row.addEventListener('dragleave', () => {
                        row.style.borderTop = '1px solid transparent';
                        row.style.borderBottom = '1px solid transparent';
                        row.style.borderColor = 'transparent';
                        row.style.background = 'transparent';
                    });

                    row.addEventListener('drop', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!draggedId || draggedId === node.id) return;
                        const rect = row.getBoundingClientRect();
                        const relY = e.clientY - rect.top;
                        let position = 'inside';
                        if (relY < rect.height * 0.25) position = 'before';
                        else if (relY > rect.height * 0.75) position = 'after';

                        const draggedNode = findAndRemove(treeData, draggedId);
                        if (!draggedNode) return;
                        if (isDescendant(draggedNode, node.id)) {
                            insertNode(treeData, draggedId, draggedNode, 'after');
                            renderTree();
                            return;
                        }
                        insertNode(treeData, node.id, draggedNode, position);
                        renderTree();
                        if (onChange) onChange(treeData);
                    });

                    rowWrap.appendChild(row);

                    if (node.children && node.children.length && node.expanded) {
                        const childContainer = document.createElement('div');
                        childContainer.style.cssText = `display: flex; flex-direction: column; border-left: 1px dashed ${this.theme.borde}; margin-left: ${10 + depth * 14}px;`;
                        const childElements = buildNodes(node.children, depth + 1);
                        childElements.forEach(c => childContainer.appendChild(c));
                        rowWrap.appendChild(childContainer);
                    }

                    return rowWrap;
                });
            };

            const rootElements = buildNodes(treeData);
            rootElements.forEach(el => treeContainer.appendChild(el));
        };

        renderTree();
        this._wrapWithLabel('Árbol de Nodos (Drag & Drop)', treeContainer);
        return treeContainer;
    }

    createTable({ columns = [], data = [], endpoint = null, pageSize = 5, onRowDelete = null, onRowClick = null } = {}) {
        const tableCard = document.createElement('div');
        tableCard.style.cssText = `display: flex; flex-direction: column; gap: 8px; width: 100%; background: ${this.theme.backg3}; border: 1px solid ${this.theme.borde}; border-radius: 8px; padding: 10px; box-sizing: border-box; color: ${this.theme.texto}; font-size: 13px;`;

        let internalCols = [...columns];
        let tableData = [...data];
        let filteredData = [...data];
        let currentPage = 1;
        let searchQuery = '';
        let draggedColIdx = null;

        const toolbar = document.createElement('div');
        toolbar.style.cssText = "display: flex; gap: 6px; align-items: center; width: 100%;";

        const searchWrap = document.createElement('div');
        searchWrap.style.cssText = `position: relative; display: flex; align-items: center; flex: 1; height: 30px; border-radius: 6px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg0}; box-sizing: border-box; overflow: hidden;`;

        const searchGlow = document.createElement('div');
        searchGlow.style.cssText = `position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: ${this.theme.textoActvioBlue}; transform: scaleX(0); transform-origin: left; transition: transform 0.25s;`;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar...';
        searchInput.style.cssText = `background: transparent; border: none; color: ${this.theme.textoActivo}; outline: none; width: 100%; padding: 0 8px; font-size: 12px; font-family: inherit; z-index: 1;`;

        searchInput.addEventListener('focus', () => { searchWrap.style.background = this.theme.backg3; searchGlow.style.transform = 'scaleX(1)'; });
        searchInput.addEventListener('blur', () => { searchWrap.style.background = this.theme.backg0; searchGlow.style.transform = 'scaleX(0)'; });
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            currentPage = 1;
            applyFilter();
        });

        searchWrap.appendChild(searchGlow);
        searchWrap.appendChild(searchInput);

        const btnRefresh = document.createElement('button');
        btnRefresh.innerHTML = this._getSVG('reset', 14, this.theme.texto);
        btnRefresh.style.cssText = `width: 30px; height: 30px; border-radius: 6px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg0}; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; outline: none;`;
        btnRefresh.addEventListener('mouseenter', () => btnRefresh.style.background = this.theme.backg2);
        btnRefresh.addEventListener('mouseleave', () => btnRefresh.style.background = this.theme.backg0);
        btnRefresh.addEventListener('click', () => { if (endpoint) fetchData(); else render(); });

        toolbar.appendChild(searchWrap);
        toolbar.appendChild(btnRefresh);

        const scrollBox = document.createElement('div');
        scrollBox.style.cssText = "width: 100%; overflow-x: auto;";

        const table = document.createElement('table');
        table.style.cssText = "width: 100%; border-collapse: collapse; font-size: 11px; text-align: left;";

        const thead = document.createElement('thead');
        const theadTr = document.createElement('tr');
        thead.appendChild(theadTr);

        const tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        scrollBox.appendChild(table);

        const footer = document.createElement('div');
        footer.style.cssText = `display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: ${this.theme.textodisable}; padding-top: 4px;`;

        const infoSpan = document.createElement('span');
        const pagination = document.createElement('div');
        pagination.style.cssText = "display: flex; align-items: center; gap: 4px;";

        const pageLabel = document.createElement('span');
        pageLabel.style.cssText = `font-weight: 600; color: ${this.theme.textoActivo};`;

        const createPageBtn = (iconName, onClick) => {
            const btn = document.createElement('button');
            btn.innerHTML = this._getSVG(iconName, 12, this.theme.texto);
            btn.style.cssText = `width: 22px; height: 22px; border-radius: 4px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg0}; cursor: pointer; display: flex; align-items: center; justify-content: center; outline: none;`;
            btn.addEventListener('click', onClick);
            return btn;
        };

        const btnPrev = createPageBtn('chevronLeft', () => { if (currentPage > 1) { currentPage--; render(); } });
        const btnNext = createPageBtn('chevronRight', () => {
            const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
            if (currentPage < totalPages) { currentPage++; render(); }
        });

        pagination.appendChild(btnPrev);
        pagination.appendChild(pageLabel);
        pagination.appendChild(btnNext);
        footer.appendChild(infoSpan);
        footer.appendChild(pagination);

        const applyFilter = () => {
            if (!searchQuery) filteredData = [...tableData];
            else {
                filteredData = tableData.filter(row => {
                    return internalCols.some(col => String(row[col.key] !== undefined ? row[col.key] : '').toLowerCase().includes(searchQuery));
                });
            }
            render();
        };

        const fetchData = async () => {
            try {
                const res = await fetch(endpoint);
                const json = await res.json();
                tableData = Array.isArray(json) ? json : (json.data || []);
                applyFilter();
            } catch (err) {
                console.error(err);
            }
        };

        const renderHeaders = () => {
            theadTr.innerHTML = '';
            internalCols.forEach((col, idx) => {
                const th = document.createElement('th');
                th.textContent = col.label || col.key;
                th.draggable = true;
                th.style.cssText = `background: ${this.theme.backg0}; color: ${this.theme.textoActivo}; padding: 6px 8px; border-bottom: 1px solid ${this.theme.borde}; cursor: grab; font-weight: 600; white-space: nowrap;`;

                th.addEventListener('dragstart', (e) => { draggedColIdx = idx; e.dataTransfer.effectAllowed = 'move'; });
                th.addEventListener('dragover', (e) => { e.preventDefault(); th.style.borderLeft = `2px solid ${this.theme.textoActvioBlue}`; });
                th.addEventListener('dragleave', () => { th.style.borderLeft = 'none'; });
                th.addEventListener('drop', (e) => {
                    e.preventDefault();
                    th.style.borderLeft = 'none';
                    if (draggedColIdx !== null && draggedColIdx !== idx) {
                        const dragged = internalCols.splice(draggedColIdx, 1)[0];
                        internalCols.splice(idx, 0, dragged);
                        render();
                    }
                    draggedColIdx = null;
                });
                theadTr.appendChild(th);
            });

            const thAction = document.createElement('th');
            thAction.textContent = 'Acción';
            thAction.style.cssText = `background: ${this.theme.backg0}; color: ${this.theme.textoActivo}; padding: 6px 8px; border-bottom: 1px solid ${this.theme.borde}; text-align: center; width: 40px;`;
            theadTr.appendChild(thAction);
        };

        const render = () => {
            renderHeaders();
            tbody.innerHTML = '';

            const start = (currentPage - 1) * pageSize;
            const end = start + pageSize;
            const pageData = filteredData.slice(start, end);
            const totalPages = Math.ceil(filteredData.length / pageSize) || 1;

            infoSpan.textContent = `${filteredData.length} reg.`;
            pageLabel.textContent = `${currentPage}/${totalPages}`;

            if (pageData.length === 0) {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.colSpan = internalCols.length + 1;
                td.textContent = 'Sin datos';
                td.style.cssText = `text-align: center; padding: 12px; color: ${this.theme.textodisable};`;
                tr.appendChild(td);
                tbody.appendChild(tr);
                return;
            }

            pageData.forEach((row, rIdx) => {
                const tr = document.createElement('tr');
                tr.style.cssText = `border-bottom: 1px solid ${this.theme.borde};`;
                tr.addEventListener('mouseenter', () => tr.style.background = this.theme.backg1);
                tr.addEventListener('mouseleave', () => tr.style.background = 'transparent');

                if (onRowClick) {
                    tr.style.cursor = 'pointer';
                    tr.addEventListener('click', (e) => {
                        if (!e.target.closest('button')) onRowClick(row, start + rIdx);
                    });
                }

                internalCols.forEach(col => {
                    const td = document.createElement('td');
                    td.style.cssText = `padding: 6px 8px; color: ${this.theme.texto}; vertical-align: middle;`;

                    if (col.type === 'toggle') {
                        const tog = this.createToggle('', !!row[col.key], (checked) => row[col.key] = checked);
                        td.appendChild(tog);
                    } else {
                        td.textContent = row[col.key] !== undefined ? row[col.key] : '';
                    }

                    tr.appendChild(td);
                });

                const tdActions = document.createElement('td');
                tdActions.style.cssText = "padding: 6px 8px; text-align: center; vertical-align: middle;";

                const btnDel = document.createElement('button');
                btnDel.innerHTML = this._getSVG('close', 12, this.theme.texto);
                btnDel.style.cssText = `width: 22px; height: 22px; border-radius: 4px; border: 1px solid ${this.theme.borde}; background: ${this.theme.backg0}; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; outline: none;`;
                btnDel.addEventListener('mouseenter', () => btnDel.style.background = '#8a2323');
                btnDel.addEventListener('mouseleave', () => btnDel.style.background = this.theme.backg0);
                btnDel.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const origIdx = tableData.indexOf(row);
                    if (origIdx !== -1) tableData.splice(origIdx, 1);
                    if (onRowDelete) onRowDelete(row, origIdx);
                    applyFilter();
                });

                tdActions.appendChild(btnDel);
                tr.appendChild(tdActions);
                tbody.appendChild(tr);
            });
        };

        tableCard.appendChild(toolbar);
        tableCard.appendChild(scrollBox);
        tableCard.appendChild(footer);

        if (endpoint) fetchData();
        else render();

        this._wrapWithLabel('Tabla Dinámica', tableCard);
        return tableCard;
    }

    getElement() {
        return this.element;
    }
}
