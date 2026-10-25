class GiovanniContainerSimple {
  constructor({ title, isOpen = true, showReset = false, onReset = null }) {
    this.options = { title, isOpen, showReset, onReset };

    this.element = document.createElement('div');
    this.element.className = 'giovanni-container-host';
    this.shadow = this.element.attachShadow({ mode: 'open' });

    this._injectStyles();
    this._buildDOM();
    this._bindEvents();
    this._initDragAndSnap();

    if (this.options.isOpen) {
      this.contentElement.classList.add('open');
      this.chevron.classList.add('open');
      this.contentElement.style.maxHeight = '2000px';
    }
  }

  _injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: system-ui, -apple-system, sans-serif;
        color: #e0e0e0;
        font-size: 13px;
        box-sizing: border-box;
        background: #2d2d2d;
        border-radius: 6px;
        margin-bottom: 8px;
        width: 100%;
        max-width: 100%;
        touch-action: none;
      }

      * { box-sizing: border-box; }

      .giovanni-container-header {
        display: flex;
        align-items: center;
        padding: 10px 12px;
        cursor: grab;
        user-select: none;
        background: #2d2d2d;
        border-radius: 6px;
        transition: background 0.2s;
        min-height: 40px;
      }

      .giovanni-container-header:active {
        cursor: grabbing;
      }

      .giovanni-container-header:hover {
        background: #333333;
      }

      .giovanni-container-left {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        pointer-events: none;
        overflow: hidden;
      }

      .giovanni-chevron {
        width: 14px;
        height: 14px;
        fill: #888;
        transition: transform 0.2s ease;
        transform: rotate(-90deg);
        flex-shrink: 0;
        pointer-events: auto;
        cursor: pointer;
      }

      .giovanni-chevron.open {
        transform: rotate(0deg);
      }

      .giovanni-title {
        font-weight: 600;
        color: #e0e0e0;
        font-size: 13px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .giovanni-reset-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        fill: #888;
        transition: all 0.2s;
        opacity: 0.7;
        flex-shrink: 0;
        pointer-events: auto;
      }

      .giovanni-reset-btn:hover {
        fill: #e0e0e0;
        background: #444;
        opacity: 1;
      }

      .giovanni-container-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 0 12px;
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
      }

      .giovanni-container-content.open {
        max-height: 2000px;
        opacity: 1;
        padding: 12px;
      }

      ::slotted(*) {
        width: 100% !important;
        min-width: 0 !important;
        box-sizing: border-box !important;
      }
    `;
    this.shadow.appendChild(style);
  }

  _buildDOM() {
    const header = document.createElement('div');
    header.className = 'giovanni-container-header';

    const leftGroup = document.createElement('div');
    leftGroup.className = 'giovanni-container-left';

    const svgNS = "http://www.w3.org/2000/svg";
    this.chevron = document.createElementNS(svgNS, "svg");
    this.chevron.setAttribute("viewBox", "0 0 24 24");
    this.chevron.setAttribute("class", "giovanni-chevron");
    this.chevron.innerHTML = '<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />';

    const titleEl = document.createElement('span');
    titleEl.className = 'giovanni-title';
    titleEl.textContent = this.options.title;

    leftGroup.appendChild(this.chevron);
    leftGroup.appendChild(titleEl);
    header.appendChild(leftGroup);

    if (this.options.showReset) {
      const resetBtn = document.createElement('button');
      resetBtn.className = 'giovanni-reset-btn';
      resetBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="14" height="14">
          <path d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-2.97 2.17-5.43 5-5.91V5.07C7.05 5.56 4 8.92 4 13c0 4.42 3.58 8 8 8v-2z"/>
        </svg>
      `;
      resetBtn.onclick = (e) => {
        e.stopPropagation();
        if (this.options.onReset) this.options.onReset();
      };
      header.appendChild(resetBtn);
    }

    this.contentElement = document.createElement('div');
    this.contentElement.className = 'giovanni-container-content';

    this.slot = document.createElement('slot');
    this.contentElement.appendChild(this.slot);

    this.shadow.appendChild(header);
    this.shadow.appendChild(this.contentElement);

    this.headerElement = header;
  }

  _bindEvents() {
    this.chevron.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
  }

  toggle() {
    const isOpen = this.contentElement.classList.contains('open');

    if (isOpen) {
      this.contentElement.style.maxHeight = this.contentElement.scrollHeight + 'px';
      requestAnimationFrame(() => {
        this.contentElement.classList.remove('open');
        this.contentElement.style.maxHeight = '0';
      });
    } else {
      this.contentElement.classList.add('open');
      this.contentElement.style.maxHeight = this.contentElement.scrollHeight + 'px';

      setTimeout(() => {
        if (this.contentElement.classList.contains('open')) {
          this.contentElement.style.maxHeight = '2000px';
        }
      }, 300);
    }

    this.chevron.classList.toggle('open');
  }

  _initDragAndSnap() {
    let startX = 0, startY = 0;
    let initialLeft = 0, initialTop = 0;
    let isDragging = false;
    let hasMoved = false;
    let activeDropTarget = null;
    let originalParent = null;
    let originalNextSibling = null;
    const threshold = 16;

    let placeholder = document.getElementById('gio-global-placeholder');
    if (!placeholder) {
      placeholder = document.createElement('div');
      placeholder.id = 'gio-global-placeholder';
      placeholder.style.cssText = 'border:2px dashed #5c9ce6;border-radius:6px;background:rgba(92,156,230,0.1);box-sizing:border-box;margin-bottom:8px;display:none;pointer-events:none;width:100%;';
      document.body.appendChild(placeholder);
    }

    let guideV = document.getElementById('gio-snap-v');
    let guideH = document.getElementById('gio-snap-h');
    if (!guideV) {
      guideV = document.createElement('div');
      guideV.id = 'gio-snap-v';
      guideV.style.cssText = 'position:fixed;top:0;bottom:0;width:1px;background:#5c9ce6;box-shadow:0 0 6px #5c9ce6;z-index:999999;display:none;pointer-events:none;';
      document.body.appendChild(guideV);
    }
    if (!guideH) {
      guideH = document.createElement('div');
      guideH.id = 'gio-snap-h';
      guideH.style.cssText = 'position:fixed;left:0;right:0;height:1px;background:#5c9ce6;box-shadow:0 0 6px #5c9ce6;z-index:999999;display:none;pointer-events:none;';
      document.body.appendChild(guideH);
    }

    const findDropTarget = (clientX, clientY) => {
      this.element.style.pointerEvents = 'none';
      const hits = document.elementsFromPoint(clientX, clientY);
      this.element.style.pointerEvents = 'auto';

      for (const el of hits) {
        if (el === this.element || el === placeholder || this.element.contains(el)) continue;

        if (el.classList.contains('giovanni-container-host')) {
          return { target: el, mode: 'sibling' };
        }

        if (
          el.id === 'app' ||
          el.classList.contains('app-wrapper') ||
          el.dataset.dropContainer !== undefined ||
          ['MAIN', 'SECTION', 'ARTICLE', 'ASIDE'].includes(el.tagName)
        ) {
          return { target: el, mode: 'container' };
        }
      }
      return null;
    };

    const placeHolderAt = (dropInfo, clientY) => {
      placeholder.style.height = `${this.element.offsetHeight || 42}px`;
      placeholder.style.display = 'block';

      if (dropInfo.mode === 'sibling') {
        const r = dropInfo.target.getBoundingClientRect();
        const parent = dropInfo.target.parentNode;
        if (clientY < r.top + r.height / 2) {
          parent.insertBefore(placeholder, dropInfo.target);
        } else {
          parent.insertBefore(placeholder, dropInfo.target.nextSibling);
        }
      } else {
        const container = dropInfo.target;
        const children = Array.from(container.children).filter(c => c !== placeholder && c !== this.element);
        let inserted = false;
        for (const child of children) {
          const r = child.getBoundingClientRect();
          if (clientY < r.top + r.height / 2) {
            container.insertBefore(placeholder, child);
            inserted = true;
            break;
          }
        }
        if (!inserted) {
          container.appendChild(placeholder);
        }
      }
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startX;
      const dy = clientY - startY;

      if (!hasMoved && Math.hypot(dx, dy) > 5) {
        hasMoved = true;
        originalParent = this.element.parentNode;
        originalNextSibling = this.element.nextSibling;

        const rect = this.element.getBoundingClientRect();
        placeholder.style.height = `${rect.height}px`;
        placeholder.style.display = 'block';
        if (originalParent) {
          originalParent.insertBefore(placeholder, originalNextSibling);
        }

        document.body.appendChild(this.element);
        this.element.style.position = 'fixed';
        this.element.style.zIndex = '99999';
        this.element.style.margin = '0';
        this.element.style.width = 'min(380px, calc(100vw - 32px))';
        this.element.style.boxShadow = '0 12px 28px rgba(0,0,0,0.6)';

        const newRect = this.element.getBoundingClientRect();
        let initX = rect.left;
        if (initX + newRect.width > window.innerWidth) {
          initX = Math.max(8, window.innerWidth - newRect.width - 8);
        }

        this.element.style.left = `${initX}px`;
        this.element.style.top = `${rect.top}px`;
        initialLeft = initX;
        initialTop = rect.top;
      }

      if (!hasMoved) return;
      if (e.cancelable) e.preventDefault();

      let targetX = initialLeft + dx;
      let targetY = initialTop + dy;

      activeDropTarget = findDropTarget(clientX, clientY);

      if (activeDropTarget) {
        guideV.style.display = 'none';
        guideH.style.display = 'none';
        placeHolderAt(activeDropTarget, clientY);
      } else {
        if (placeholder.parentNode) {
          placeholder.style.display = 'none';
          placeholder.remove();
        }

        const rect = this.element.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        let snapX = null;
        let snapY = null;

        if (Math.abs(targetX) < threshold) { targetX = 0; snapX = 0; }
        if (Math.abs(targetY) < threshold) { targetY = 0; snapY = 0; }
        if (Math.abs(targetX + w - vw) < threshold) { targetX = vw - w; snapX = vw; }
        if (Math.abs(targetY + h - vh) < threshold) { targetY = vh - h; snapY = vh; }

        const candidates = Array.from(document.querySelectorAll('.giovanni-container-host, .ui-panel, .ui-container, .ui-square-btn'))
          .filter(el => el !== this.element && el.offsetParent !== null);

        for (const el of candidates) {
          const r = el.getBoundingClientRect();

          if (snapX === null) {
            if (Math.abs(targetX - r.left) < threshold) { targetX = r.left; snapX = r.left; }
            else if (Math.abs(targetX + w - r.right) < threshold) { targetX = r.right - w; snapX = r.right; }
            else if (Math.abs(targetX - r.right) < threshold) { targetX = r.right; snapX = r.right; }
            else if (Math.abs(targetX + w - r.left) < threshold) { targetX = r.left - w; snapX = r.left; }
          }

          if (snapY === null) {
            if (Math.abs(targetY - r.top) < threshold) { targetY = r.top; snapY = r.top; }
            else if (Math.abs(targetY + h - r.bottom) < threshold) { targetY = r.bottom - h; snapY = r.bottom; }
            else if (Math.abs(targetY - r.bottom) < threshold) { targetY = r.bottom; snapY = r.bottom; }
            else if (Math.abs(targetY + h - r.top) < threshold) { targetY = r.top - h; snapY = r.top; }
          }
        }

        if (snapX !== null) {
          guideV.style.left = `${snapX}px`;
          guideV.style.display = 'block';
        } else {
          guideV.style.display = 'none';
        }

        if (snapY !== null) {
          guideH.style.top = `${snapY}px`;
          guideH.style.display = 'block';
        } else {
          guideH.style.display = 'none';
        }
      }

      this.element.style.left = `${targetX}px`;
      this.element.style.top = `${targetY}px`;
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;

      guideV.style.display = 'none';
      guideH.style.display = 'none';

      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (!hasMoved) return;

      if (placeholder.parentNode) {
        placeholder.parentNode.insertBefore(this.element, placeholder);
        placeholder.style.display = 'none';
        placeholder.remove();

        this.element.style.position = '';
        this.element.style.zIndex = '';
        this.element.style.margin = '';
        this.element.style.width = '100%';
        this.element.style.maxWidth = '100%';
        this.element.style.left = '';
        this.element.style.top = '';
        this.element.style.boxShadow = '';
      } else {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const r = this.element.getBoundingClientRect();
        if (r.right > vw) this.element.style.left = `${Math.max(8, vw - r.width - 8)}px`;
        if (r.bottom > vh) this.element.style.top = `${Math.max(8, vh - r.height - 8)}px`;
      }

      activeDropTarget = null;
    };

    const onPointerDown = (e) => {
      if (e.target.closest('.giovanni-chevron, .giovanni-reset-btn, button, input, select')) return;
      isDragging = true;
      hasMoved = false;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startY = e.touches ? e.touches[0].clientY : e.clientY;

      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
    };

    this.headerElement.addEventListener('mousedown', onPointerDown);
    this.headerElement.addEventListener('touchstart', onPointerDown, { passive: true });
  }

  append(childElement) {
    this.appendChild(childElement);
  }

  appendChild(childElement) {
    this.slot.appendChild(childElement);
  }
}

     class GiovanniSlider {
      constructor({ label, min = 0, max = 100, step = 1, value = 0, onInput, onChange }) {
        this.options = { label, min, max, step, value, onInput, onChange };
        
        this.element = document.createElement('div');
        this.element.className = 'giovanni-slider-host';
        this.shadow = this.element.attachShadow({ mode: 'open' });
        
        this._injectStyles();
        this._buildDOM();
        this._bindEvents();
        this._updateValue(this.options.value);
      }

      _injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
          :host {
            display: block;
            font-family: system-ui, -apple-system, sans-serif;
            color: #e0e0e0;
            font-size: 13px;
            position: relative;
            padding: 8px 0;
            box-sizing: border-box;
            width: 100%;
          }

          * { box-sizing: border-box; }

          .giovanni-slider-wrapper {
            display: flex;
            flex-direction: column;
            gap: 6px;
            width: 100%;
          }

          .giovanni-slider-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            user-select: none;
          }

          .giovanni-slider-label {
            font-weight: 500;
            color: #b0b0b0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .giovanni-slider-value-group {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
          }

          .giovanni-slider-value {
            background: transparent;
            border: 1px solid transparent;
            color: #fff;
            font-size: 13px;
            width: 40px;
            text-align: right;
            outline: none;
            font-weight: 600;
            padding: 2px 4px;
            border-radius: 4px;
            transition: all 0.2s;
          }

          .giovanni-slider-value:hover, .giovanni-slider-value:focus {
            background: #2a2a2a;
            border-color: #444;
          }

          .giovanni-slider-chevron {
            width: 12px;
            height: 12px;
            fill: #888;
            transition: transform 0.2s ease;
          }

          .giovanni-slider-chevron.open {
            transform: rotate(180deg);
          }

          .giovanni-slider-range {
            -webkit-appearance: none;
            width: 100%;
            height: 4px;
            background: #444;
            border-radius: 2px;
            outline: none;
            margin: 4px 0;
          }

          .giovanni-slider-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: transparent;
            cursor: pointer;
            border: 3px solid #e0e0e0;
            box-shadow: 0 0 4px rgba(0,0,0,0.3);
            transition: transform 0.1s, border-color 0.1s;
            box-sizing: border-box;
          }

          .giovanni-slider-range::-webkit-slider-thumb:hover {
            transform: scale(1.2);
            border-color: #ffffff;
          }

          .giovanni-slider-advanced {
            display: none;
            position: fixed;
            z-index: 9999;
            background: #252526;
            border: 1px solid #3c3c3c;
            border-radius: 6px;
            padding: 10px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.8);
            flex-direction: column;
            gap: 8px;
            min-width: 140px;
            opacity: 0;
            transform: translateY(-5px);
            transition: opacity 0.15s ease, transform 0.15s ease;
          }

          .giovanni-slider-advanced.show {
            display: flex;
            opacity: 1;
            transform: translateY(0);
          }

          .giovanni-slider-adv-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
          }

          .giovanni-slider-adv-row label {
            color: #999;
            font-size: 12px;
          }

          .giovanni-slider-adv-row input {
            background: #1e1e1e;
            border: 1px solid #444;
            color: #ddd;
            width: 60px;
            padding: 4px;
            border-radius: 4px;
            font-size: 12px;
            outline: none;
          }

          .giovanni-slider-adv-row input:focus {
            border-color: #888;
          }
        `;
        this.shadow.appendChild(style);
      }

      _buildDOM() {
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'giovanni-slider-wrapper';

        const header = document.createElement('div');
        header.className = 'giovanni-slider-header';
        
        const lbl = document.createElement('span');
        lbl.className = 'giovanni-slider-label';
        lbl.textContent = this.options.label;

        const valueGroup = document.createElement('div');
        valueGroup.className = 'giovanni-slider-value-group';

        this.inputValue = document.createElement('input');
        this.inputValue.type = 'text';
        this.inputValue.className = 'giovanni-slider-value';
        
        const svgNS = "http://www.w3.org/2000/svg";
        this.chevron = document.createElementNS(svgNS, "svg");
        this.chevron.setAttribute("viewBox", "0 0 24 24");
        this.chevron.setAttribute("class", "giovanni-slider-chevron");
        this.chevron.innerHTML = '<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />';

        valueGroup.appendChild(this.inputValue);
        valueGroup.appendChild(this.chevron);
        header.appendChild(lbl);
        header.appendChild(valueGroup);

        this.range = document.createElement('input');
        this.range.type = 'range';
        this.range.className = 'giovanni-slider-range';
        this.range.min = this.options.min;
        this.range.max = this.options.max;
        this.range.step = this.options.step;
        this.range.value = this.options.value;

        this.advancedPanel = document.createElement('div');
        this.advancedPanel.className = 'giovanni-slider-advanced';

        this.inputMin = this._createAdvancedInput('Min', this.options.min);
        this.inputMax = this._createAdvancedInput('Max', this.options.max);
        this.inputStep = this._createAdvancedInput('Step', this.options.step, true);

        this.advancedPanel.appendChild(this.inputMin._parentRow);
        this.advancedPanel.appendChild(this.inputMax._parentRow);
        this.advancedPanel.appendChild(this.inputStep._parentRow);

        this.wrapper.appendChild(header);
        this.wrapper.appendChild(this.range);
        
        this.shadow.appendChild(this.wrapper);
        this.shadow.appendChild(this.advancedPanel);
      }

      _createAdvancedInput(labelText, value, isStep = false) {
        const row = document.createElement('div');
        row.className = 'giovanni-slider-adv-row';

        const lbl = document.createElement('label');
        lbl.textContent = labelText;

        const input = document.createElement('input');
        input.type = 'number';
        input.value = value;
        if (isStep) input.step = 'any';

        row.appendChild(lbl);
        row.appendChild(input);
        
        input._parentRow = row;
        return input;
      }

      _bindEvents() {
        const header = this.wrapper.querySelector('.giovanni-slider-header');
        header.addEventListener('click', (e) => {
          if (e.target === this.inputValue) return;
          
          const isShowing = this.advancedPanel.classList.contains('show');
          
          if (isShowing) {
            this.advancedPanel.classList.remove('show');
            this.chevron.classList.remove('open');
          } else {
            this._positionPanel();
            this.advancedPanel.classList.add('show');
            this.chevron.classList.add('open');
          }
        });

        window.addEventListener('mousedown', (e) => {
          const path = e.composedPath();
          if (!path.includes(this.element)) {
            this.advancedPanel.classList.remove('show');
            this.chevron.classList.remove('open');
          }
        });

        this.range.addEventListener('input', (e) => {
          this._updateValue(parseFloat(e.target.value), false);
          if (this.options.onInput) this.options.onInput(parseFloat(e.target.value));
        });

        this.range.addEventListener('change', (e) => {
          if (this.options.onChange) this.options.onChange(parseFloat(e.target.value));
        });

        this.inputValue.addEventListener('change', (e) => {
          let val = parseFloat(e.target.value);
          if (isNaN(val)) val = this.options.value;
          this._updateValue(val, true);
        });

        this.inputValue.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') this.inputValue.blur();
        });

        const handleAdvancedChange = () => {
          const newMin = parseFloat(this.inputMin.value) || 0;
          const newMax = parseFloat(this.inputMax.value) || 100;
          const newStep = parseFloat(this.inputStep.value) || 1;

          this.options.min = newMin;
          this.options.max = newMax;
          this.options.step = newStep;

          this.range.min = newMin;
          this.range.max = newMax;
          this.range.step = newStep;

          let currentVal = parseFloat(this.range.value);
          if (currentVal < newMin) currentVal = newMin;
          if (currentVal > newMax) currentVal = newMax;
          
          this._updateValue(currentVal, true);
        };

        this.inputMin.addEventListener('change', handleAdvancedChange);
        this.inputMax.addEventListener('change', handleAdvancedChange);
        this.inputStep.addEventListener('change', handleAdvancedChange);
      }

      _positionPanel() {
        const rect = this.inputValue.getBoundingClientRect();
        const panelHeight = 110;
        const windowHeight = window.innerHeight;
        
        this.advancedPanel.style.left = 'auto';
        this.advancedPanel.style.right = (window.innerWidth - rect.right) + 'px';

        if (rect.bottom + panelHeight > windowHeight) {
          this.advancedPanel.style.top = 'auto';
          this.advancedPanel.style.bottom = (windowHeight - rect.top + 5) + 'px';
        } else {
          this.advancedPanel.style.bottom = 'auto';
          this.advancedPanel.style.top = (rect.bottom + 5) + 'px';
        }
      }

      _updateValue(val, triggerChange = false) {
        if (val < this.options.min) val = this.options.min;
        if (val > this.options.max) val = this.options.max;

        this.options.value = val;
        this.range.value = val;
        this.inputValue.value = val;

        if (triggerChange) {
          if (this.options.onInput) this.options.onInput(val);
          if (this.options.onChange) this.options.onChange(val);
        }
      }

      setValue(val) {
        this._updateValue(val, false);
      }

      getValue() {
        return this.options.value;
      }
    }

    class GiovanniCheckbox {
      constructor({ label, checked = false, onChange }) {
        this.options = { label, checked, onChange };
        this.element = document.createElement('div');
        this.element.className = 'giovanni-checkbox-host';
        this.shadow = this.element.attachShadow({ mode: 'open' });
        this._injectStyles();
        this._buildDOM();
        this._bindEvents();
      }

      _injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
          :host {
            display: block;
            font-family: system-ui, -apple-system, sans-serif;
            color: #e0e0e0;
            font-size: 13px;
            box-sizing: border-box;
            width: 100%;
          }
          * { box-sizing: border-box; }
          
          .giovanni-input-container {
            display: flex;
            align-items: center;
            cursor: pointer;
            user-select: none;
            position: relative;
            gap: 10px;
            padding: 4px 0;
          }

          .giovanni-input-native {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          .giovanni-checkbox-box {
            width: 18px;
            height: 18px;
            background: #1a1a1a;
            border: 1.5px solid #555;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            flex-shrink: 0;
          }

          .giovanni-input-container:hover .giovanni-checkbox-box {
            border-color: #888;
          }

          .giovanni-input-native:checked ~ .giovanni-checkbox-box {
            background: #777777;
            border-color: #777777;
          }

          .giovanni-check-icon {
            width: 12px;
            height: 12px;
            stroke: #ffffff;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
            stroke-dasharray: 24;
            stroke-dashoffset: 24;
            transition: stroke-dashoffset 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          }

          .giovanni-input-native:checked ~ .giovanni-checkbox-box .giovanni-check-icon {
            stroke-dashoffset: 0;
          }

          .giovanni-label {
            font-weight: 500;
            color: #b0b0b0;
            transition: color 0.2s;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .giovanni-input-container:hover .giovanni-label {
            color: #e0e0e0;
          }
        `;
        this.shadow.appendChild(style);
      }

      _buildDOM() {
        const container = document.createElement('label');
        container.className = 'giovanni-input-container';

        this.input = document.createElement('input');
        this.input.type = 'checkbox';
        this.input.className = 'giovanni-input-native';
        this.input.checked = this.options.checked;

        const box = document.createElement('div');
        box.className = 'giovanni-checkbox-box';
        box.innerHTML = `
          <svg class="giovanni-check-icon" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;

        const lbl = document.createElement('span');
        lbl.className = 'giovanni-label';
        lbl.textContent = this.options.label;

        container.appendChild(this.input);
        container.appendChild(box);
        container.appendChild(lbl);
        this.shadow.appendChild(container);
      }

      _bindEvents() {
        this.input.addEventListener('change', (e) => {
          if (this.options.onChange) this.options.onChange(e.target.checked);
        });
      }

      setValue(checked) { this.input.checked = checked; }
      getValue() { return this.input.checked; }
    }

    class GiovanniRadio {
      static grupos = {};

      constructor({ label, name, checked = false, onChange }) {
        this.options = { label, name, checked, onChange };
        
        this.element = document.createElement('div');
        this.element.className = 'giovanni-radio-host';
        this.shadow = this.element.attachShadow({ mode: 'open' });
        
        this._injectStyles();
        this._buildDOM();
        this._bindEvents();

        if (!GiovanniRadio.grupos[name]) GiovanniRadio.grupos[name] = [];
        GiovanniRadio.grupos[name].push(this);
      }

      _injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
          :host {
            display: block;
            font-family: system-ui, -apple-system, sans-serif;
            color: #e0e0e0;
            font-size: 13px;
            box-sizing: border-box;
            width: 100%;
          }
          * { box-sizing: border-box; }
          
          .giovanni-input-container {
            display: flex;
            align-items: center;
            cursor: pointer;
            user-select: none;
            position: relative;
            gap: 10px;
            padding: 4px 0;
          }

          .giovanni-input-native {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          .giovanni-radio-circle {
            width: 18px;
            height: 18px;
            background: #1a1a1a;
            border: 1.5px solid #555;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            flex-shrink: 0;
          }

          .giovanni-input-container:hover .giovanni-radio-circle {
            border-color: #888;
          }

          .giovanni-input-native:checked ~ .giovanni-radio-circle {
            border-color: #777777;
          }

          .giovanni-radio-circle::after {
            content: "";
            width: 8px;
            height: 8px;
            background: #777777;
            border-radius: 50%;
            transform: scale(0);
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .giovanni-input-native:checked ~ .giovanni-radio-circle::after {
            transform: scale(1);
          }

          .giovanni-label {
            font-weight: 500;
            color: #b0b0b0;
            transition: color 0.2s;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .giovanni-input-container:hover .giovanni-label {
            color: #e0e0e0;
          }
        `;
        this.shadow.appendChild(style);
      }

      _buildDOM() {
        const container = document.createElement('label');
        container.className = 'giovanni-input-container';

        this.input = document.createElement('input');
        this.input.type = 'radio';
        this.input.className = 'giovanni-input-native';
        this.input.name = this.options.name;
        this.input.checked = this.options.checked;

        const circle = document.createElement('div');
        circle.className = 'giovanni-radio-circle';

        const lbl = document.createElement('span');
        lbl.className = 'giovanni-label';
        lbl.textContent = this.options.label;

        container.appendChild(this.input);
        container.appendChild(circle);
        container.appendChild(lbl);
        this.shadow.appendChild(container);
      }

      _bindEvents() {
        this.input.addEventListener('change', (e) => {
          if (e.target.checked) {
            const grupo = GiovanniRadio.grupos[this.options.name] || [];
            grupo.forEach(radio => {
              if (radio !== this) radio.setValue(false);
            });
            if (this.options.onChange) this.options.onChange(true);
          }
        });
      }

      setValue(checked) { this.input.checked = checked; }
      getValue() { return this.input.checked; }
    }

class GiovanniBoton {
  constructor({
    svg,
    ancho = 45,
    alto = 45,
    texto = '',
    onClick = null,
    className = 'clbtgiovanni',
    top = null,
    left = null,
    position = 'relative',
    background = null,
    color = null,
    hover = true,
    radius = null
  } = {}) {
    if (!svg) throw new Error('Boton: falta el parámetro "svg"');

    this.ancho = ancho;
    this.alto = alto;
    this.texto = texto;
    this.className = className;
    this.position = position;
    this.hover = hover;

    this.el = document.createElement('button');
    this.el.type = 'button';
    this.el.className = className;

    const svgFinal = svg
      .replace(/\$\{ancho\}/g, ancho)
      .replace(/\$\{alto\}/g, alto);

    this.el.innerHTML = svgFinal;

    const span = document.createElement('span');
    span.textContent = texto;
    span.style.cssText = 'font-size:11px; overflow:hidden; white-space:nowrap;';
    this.el.appendChild(span);

    const baseStyle = {
      backgroundColor: background ?? '#2d2d2d',
      color: color ?? '#6d6b6b',
      position,
      zIndex: position === 'absolute' ? '999999' : 'auto',
      borderRadius: radius ?? (position === 'absolute' ? '10px' : '6px'),
      width: ancho + 'px',
      height: alto + 'px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      transition: 'background-color .15s, color .15s'
    };

    if (position === 'absolute') {
      baseStyle.top = top ?? '0%';
      if (left !== null) baseStyle.left = left;
    } else if (position === 'fixed') {
      baseStyle.top = top ?? '0%';
      if (left !== null) baseStyle.left = left;
    } else {
      if (top !== null) baseStyle.top = top;
      if (left !== null) baseStyle.left = left;
    }

    Object.assign(this.el.style, baseStyle);

    this._bg = baseStyle.backgroundColor;
    this._fg = baseStyle.color;

    if (hover) {
      this.el.addEventListener('mouseenter', () => {
        this.el.style.backgroundColor = '#333333';
        this.el.style.color = '#797979';
      });
      this.el.addEventListener('mouseleave', () => {
        this.el.style.backgroundColor = this._bg;
        this.el.style.color = this._fg;
      });
    }

    if (typeof onClick === 'function') this.el.addEventListener('click', onClick);

    this.el.querySelectorAll('svg').forEach(s => {
      s.style.fill = 'currentColor';
      s.setAttribute('width', ancho);
      s.setAttribute('height', alto);
    });

    this.el.setAttribute('aria-label', texto || 'botón');
    this.el.title = texto;
  }

  setTexto(t) {
    this.texto = t;
    const s = this.el.querySelector('span');
    if (s) s.textContent = t;
    this.el.setAttribute('aria-label', t || 'botón');
    this.el.title = t;
  }

  setStyle(styles = {}) {
    if (styles.backgroundColor !== undefined) this._bg = styles.backgroundColor;
    if (styles.color !== undefined) this._fg = styles.color;
    Object.assign(this.el.style, styles);
  }

  montar(contenedor = document.body) {
    contenedor.appendChild(this.el);
    return this;
  }

  destruir() { this.el.remove(); }
}

      class GiovanniInputNumber {
      constructor({ label, min = 0, max = 100, step = 1, value = 0, onChange }) {
        this.options = { label, min, max, step, value, onChange };
        
        this.element = document.createElement('div');
        this.element.className = 'giovanni-input-host';
        this.shadow = this.element.attachShadow({ mode: 'open' });
        
        this._injectStyles();
        this._buildDOM();
        this._bindEvents();
        this._updateValue(this.options.value, false);
      }

      _injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
          :host {
            display: block;
            font-family: system-ui, -apple-system, sans-serif;
            color: #e0e0e0;
            font-size: 13px;
            box-sizing: border-box;
            width: 100%;
            padding: 8px 0;
          }

          * { box-sizing: border-box; }

          .giovanni-input-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
          }

          .giovanni-input-label {
            font-weight: 500;
            color: #b0b0b0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .giovanni-number-control {
            display: flex;
            align-items: center;
            background: #3D3D3D;
            border: 1px solid transparent;
            border-radius: 12px;
            overflow: hidden;
            transition: border-color 0.2s, background 0.2s;
            flex-shrink: 0;
          }

          .giovanni-number-control:hover {
            border-color: gray;
          }

          .giovanni-number-control:focus-within {
            background: #464646;
            border-color: gray;
          }

          .giovanni-btn-step {
            background: transparent;
            border: none;
            color: #888;
            font-size: 16px;
            width: 28px;
            height: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s;
            user-select: none;
            outline: none;
          }

          .giovanni-btn-step:hover {
            color: #fff;
            background: rgba(0,0,0,0.2);
          }

          .giovanni-btn-step:active {
            background: rgba(0,0,0,0.4);
          }

          .giovanni-number-input {
            background: transparent;
            border: none;
            color: rgb(162, 162, 162);
            font-size: 13px;
            font-weight: 600;
            width: 50px;
            text-align: center;
            outline: none;
            padding: 0;
            -moz-appearance: textfield;
          }

          .giovanni-number-input::-webkit-outer-spin-button,
          .giovanni-number-input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        `;
        this.shadow.appendChild(style);
      }

      _buildDOM() {
        const wrapper = document.createElement('div');
        wrapper.className = 'giovanni-input-wrapper';

        const lbl = document.createElement('span');
        lbl.className = 'giovanni-input-label';
        lbl.textContent = this.options.label;

        const control = document.createElement('div');
        control.className = 'giovanni-number-control';

        this.btnMinus = document.createElement('button');
        this.btnMinus.className = 'giovanni-btn-step';
        this.btnMinus.innerHTML = '&minus;';

        this.input = document.createElement('input');
        this.input.type = 'number';
        this.input.className = 'giovanni-number-input';
        this.input.min = this.options.min;
        this.input.max = this.options.max;
        this.input.step = this.options.step;

        this.btnPlus = document.createElement('button');
        this.btnPlus.className = 'giovanni-btn-step';
        this.btnPlus.innerHTML = '&plus;';

        control.appendChild(this.btnMinus);
        control.appendChild(this.input);
        control.appendChild(this.btnPlus);

        wrapper.appendChild(lbl);
        wrapper.appendChild(control);

        this.shadow.appendChild(wrapper);
      }

      _bindEvents() {
        this.input.addEventListener('change', (e) => {
          let val = parseFloat(e.target.value);
          if (isNaN(val)) val = this.options.value;
          this._updateValue(val, true);
        });

        this.input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') this.input.blur();
        });

        this.btnMinus.addEventListener('click', () => {
          const current = parseFloat(this.input.value) || 0;
          const val = current - this.options.step;
          this._updateValue(val, true);
        });

        this.btnPlus.addEventListener('click', () => {
          const current = parseFloat(this.input.value) || 0;
          const val = current + this.options.step;
          this._updateValue(val, true);
        });
      }

      _updateValue(val, triggerChange = false) {
        if (val < this.options.min) val = this.options.min;
        if (val > this.options.max) val = this.options.max;

        this.options.value = val;
        this.input.value = val;

        if (triggerChange) {
          if (this.options.onChange) this.options.onChange(val);
        }
      }

      setValue(val) {
        this._updateValue(val, false);
      }

      getValue() {
        return this.options.value;
      }
    }

    
    class GiovanniInputText {
  constructor({ label, value = "", onChange }) {
    this.options = { label, value, onChange };
    
    this.element = document.createElement('div');
    this.element.className = 'giovanni-text-host';
    this.shadow = this.element.attachShadow({ mode: 'open' });
    
    this._injectStyles();
    this._buildDOM();
    this._bindEvents();
    
    if (this.options.value) {
      this.input.value = this.options.value;
      this.label.classList.add('float');
    }
  }

  _injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: system-ui, -apple-system, sans-serif;
        color: #e0e0e0;
        font-size: 13px;
        box-sizing: border-box;
        width: 100%;
        padding: 8px 0;
      }

      * { box-sizing: border-box; }

      .giovanni-input-wrapper {
        position: relative;
        width: 100%;
      }

      .giovanni-input-field {
        width: 100%;
        background: #3D3D3D;
        border: 1px solid transparent;
        border-radius: 12px;
        padding: 18px 12px 6px 12px;
        color: #e0e0e0;
        font-size: 13px;
        outline: none;
        font-family: inherit;
        transition: background 0.2s, border-color 0.2s;
      }

      .giovanni-input-field:hover {
        border-color: gray;
      }

      .giovanni-input-field:focus {
        background: #464646;
        border-color: gray;
      }

      .giovanni-input-label {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #888;
        font-size: 13px;
        pointer-events: none;
        transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        font-weight: 500;
      }

      .giovanni-input-field:focus ~ .giovanni-input-label,
      .giovanni-input-field:not(:placeholder-shown) ~ .giovanni-input-label,
      .giovanni-input-label.float {
        top: 6px;
        transform: translateY(0);
        font-size: 10px;
        color: #b0b0b0;
      }
    `;
    this.shadow.appendChild(style);
  }

  _buildDOM() {
    const wrapper = document.createElement('div');
    wrapper.className = 'giovanni-input-wrapper';

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.className = 'giovanni-input-field';
    this.input.placeholder = ' '; 

    this.label = document.createElement('span');
    this.label.className = 'giovanni-input-label';
    this.label.textContent = this.options.label;

    wrapper.appendChild(this.input);
    wrapper.appendChild(this.label);

    this.shadow.appendChild(wrapper);
  }

  _bindEvents() {
    this.input.addEventListener('input', (e) => {
      if (e.target.value.length > 0) {
        this.label.classList.add('float');
      } else {
        this.label.classList.remove('float');
      }
      if (this.options.onChange) this.options.onChange(e.target.value);
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.input.blur();
    });
  }

  setValue(val) {
    this.input.value = val;
    if (val.length > 0) this.label.classList.add('float');
    else this.label.classList.remove('float');
  }

  getValue() {
    return this.input.value;
  }
}

 class GiovanniSearchInput {
  constructor({ placeholder = 'Buscar...', onSearch } = {}) {
    this.onSearch = onSearch;
    this.element = document.createElement('input');
    this.element.type = 'search';
    this.element.placeholder = placeholder;
    this.element.style.cssText = `
      width: 100%;
      box-sizing: border-box;
      background: #1a1a1a;
      border: 1px solid #3c3c3c;
      border-radius: 4px;
      color: #ddd;
      padding: 6px 10px;
      font-size: 12px;
      outline: none;
    `;
    let t = null;
    this.element.addEventListener('input', (e) => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (typeof this.onSearch === 'function') this.onSearch(e.target.value);
      }, 200);
    });
  }
  getValue() { return this.element.value; }
  setValue(v) { this.element.value = v; }
}
class GiovanniTable {
  constructor({ columns = [], data = [], endpoint = null, pageSize = 5, onRowDelete = null, onRowClick = null } = {}) {
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
    this.element.className = 'giovanni-table-host';
    this.shadow = this.element.attachShadow({ mode: 'open' });

    this._injectStyles();
    this._buildDOM();
    this._bindEvents();

    if (this.endpoint) {
      this.fetchData();
    } else {
      this.render();
    }
  }

  _injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: system-ui, -apple-system, sans-serif;
        color: #e0e0e0;
        font-size: 13px;
        box-sizing: border-box;
        width: 100%;
        background: #252526;
        border-radius: 6px;
        padding: 10px;
        overflow: hidden;
      }
      * { box-sizing: border-box; }

      .gio-table-toolbar {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 10px;
      }

      .gio-table-scroll {
        width: 100%;
        overflow-x: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
        text-align: left;
      }

      th {
        background: #1e1e1e;
        color: #aaa;
        padding: 8px 10px;
        border-bottom: 1px solid #3c3c3c;
        user-select: none;
        cursor: grab;
      }

      th.drag-over {
        border-left: 2px solid #5c9ce6;
        background: #2a2d32;
      }

      td {
        padding: 8px 10px;
        border-bottom: 1px solid #333333;
        color: #ddd;
      }

      tbody tr:hover {
        background: #2d2d2d;
      }

      .gio-action-cell {
        display: flex;
        gap: 4px;
        align-items: center;
      }

      .gio-table-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        font-size: 11px;
        color: #888;
      }

      .gio-table-pagination {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .page-label {
        font-weight: 600;
        color: #ccc;
      }
    `;
    this.shadow.appendChild(style);
  }

  _buildDOM() {
    this.container = document.createElement('div');
    this.container.className = 'gio-table-wrapper';

    // 1. TOOLBAR: Usa GiovanniSearchInput y GiovanniBoton
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'gio-table-toolbar';

    this.searchInput = new GiovanniSearchInput({
      placeholder: 'Buscar en tabla...',
      onSearch: (query) => {
        this.searchQuery = query.toLowerCase();
        this.currentPage = 1;
        this.applyFilter();
      }
    });

    const refreshIcon = `<svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>`;
    this.btnRefresh = new GiovanniBoton({
      svg: refreshIcon,
      ancho: 30,
      alto: 30,
      onClick: () => (this.endpoint ? this.fetchData() : this.render())
    });
    this.btnRefresh.el.style.position = 'static'; // Anular posición absolute para que fluya

    this.toolbar.appendChild(this.searchInput.element);
    this.toolbar.appendChild(this.btnRefresh.el);

    // 2. TABLA
    const scrollBox = document.createElement('div');
    scrollBox.className = 'gio-table-scroll';

    this.table = document.createElement('table');
    this.theadTr = document.createElement('tr');
    const thead = document.createElement('thead');
    thead.appendChild(this.theadTr);

    this.tbody = document.createElement('tbody');
    this.table.appendChild(thead);
    this.table.appendChild(this.tbody);
    scrollBox.appendChild(this.table);

    // 3. FOOTER Y PAGINACIÓN: Usa GiovanniBoton
    this.footer = document.createElement('div');
    this.footer.className = 'gio-table-footer';

    this.infoSpan = document.createElement('span');

    const pagination = document.createElement('div');
    pagination.className = 'gio-table-pagination';

    const prevIcon = `<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;
    this.btnPrev = new GiovanniBoton({
      svg: prevIcon,
      ancho: 24,
      alto: 24,
      onClick: () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.render();
        }
      }
    });
    this.btnPrev.el.style.position = 'static';

    this.pageLabel = document.createElement('span');
    this.pageLabel.className = 'page-label';

    const nextIcon = `<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;
    this.btnNext = new GiovanniBoton({
      svg: nextIcon,
      ancho: 24,
      alto: 24,
      onClick: () => {
        const totalPages = Math.ceil(this.filteredData.length / this.pageSize) || 1;
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.render();
        }
      }
    });
    this.btnNext.el.style.position = 'static';

    pagination.appendChild(this.btnPrev.el);
    pagination.appendChild(this.pageLabel);
    pagination.appendChild(this.btnNext.el);

    this.footer.appendChild(this.infoSpan);
    this.footer.appendChild(pagination);

    this.container.appendChild(this.toolbar);
    this.container.appendChild(scrollBox);
    this.container.appendChild(this.footer);

    this.shadow.appendChild(this.container);
  }

  _bindEvents() {
    // Los eventos de inputs y botones se manejan internamente por sus clases
  }

  async fetchData() {
    try {
      const res = await fetch(this.endpoint);
      const json = await res.json();
      this.data = Array.isArray(json) ? json : (json.data || []);
      this.applyFilter();
    } catch (err) {
      console.error("Error al cargar datos:", err);
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
    thAction.textContent = 'Acción';
    this.theadTr.appendChild(thAction);
  }

  render() {
    this.renderHeaders();
    this.tbody.innerHTML = '';

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    const pageData = this.filteredData.slice(start, end);
    const totalPages = Math.ceil(this.filteredData.length / this.pageSize) || 1;

    this.infoSpan.textContent = `${this.filteredData.length} registros`;
    this.pageLabel.textContent = `${this.currentPage} / ${totalPages}`;

    pageData.forEach((row, rIdx) => {
      const tr = document.createElement('tr');
      if (this.onRowClick) {
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', (e) => {
          if (!e.target.closest('button')) this.onRowClick(row, start + rIdx, this);
        });
      }

      this.columns.forEach(col => {
        const td = document.createElement('td');
        td.textContent = row[col.key] !== undefined ? row[col.key] : '';
        tr.appendChild(td);
      });

      // Botón Eliminar fila reutilizando GiovanniBoton
      const tdActions = document.createElement('td');
      const delIcon = `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;
      const btnDel = new GiovanniBoton({
        svg: delIcon,
        ancho: 24,
        alto: 24,
        onClick: (e) => {
          e.stopPropagation();
          this.deleteRow(row);
        }
      });
      btnDel.el.style.position = 'static';

      tdActions.appendChild(btnDel.el);
      tr.appendChild(tdActions);
      this.tbody.appendChild(tr);
    });
  }

  setData(newData) {
    this.data = [...newData];
    this.applyFilter();
  }
}


class GiovanniLayerManager {
  constructor({ onActiveLayerChange = null } = {}) {
    this.layers = [];
    this.activeLayer = null;
    this.onActiveLayerChange = onActiveLayerChange;

    this.element = document.createElement('div');
    this.element.className = 'giovanni-layer-manager-host';
    this.shadow = this.element.attachShadow({ mode: 'open' });

    this._injectStyles();
    this._buildDOM();
  }

  _getIcon(name) {
    const p = (typeof GiovanniIconDB !== 'undefined' && GiovanniIconDB[name]) 
      ? GiovanniIconDB[name] 
      : '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>';
    return `<svg viewBox="0 0 24 24">${p}</svg>`;
  }

  _injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: flex;
        flex-direction: column;
        gap: 8px;
        font-family: system-ui, -apple-system, sans-serif;
        color: #e0e0e0;
        font-size: 12px;
        box-sizing: border-box;
        width: 100%;
      }
      * { box-sizing: border-box; }

      /* FILA MAESTRA ÚNICA (Master Row) */
      .gio-master-row {
        background: #202020;
        border: 1px solid #383838;
        border-radius: 6px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .gio-master-controls {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        align-items: center;
      }

      /* PILA DE CAPAS */
      .gio-layers-stack {
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-height: 250px;
        overflow-y: auto;
        padding-right: 2px;
      }

      /* ITEM DE CAPA */
      .gio-layer-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 8px;
        background: #282828;
        border: 1px solid transparent;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
        transition: background 0.15s, border-color 0.15s;
      }

      .gio-layer-item:hover {
        background: #303030;
      }

      .gio-layer-item.active {
        background: #313842;
        border-color: #5c9ce6;
      }

      .gio-layer-item.is-mask .gio-layer-name::before {
        content: "↳ ";
        color: #5c9ce6;
        font-weight: 700;
      }

      .gio-layer-name {
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 500;
        color: #ddd;
      }

      /* BARRA INFERIOR DE ACCIONES */
      .gio-stack-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
        padding-top: 4px;
        border-top: 1px solid #333333;
      }
    `;
    this.shadow.appendChild(style);
  }

  _buildDOM() {
    // 1. BARRA MAESTRA SUPERIOR ÚNICA
    this.masterRow = document.createElement('div');
    this.masterRow.className = 'gio-master-row';

    // Fila 1: Select de Fusión + Toggle de Máscara
    const controlsRow = document.createElement('div');
    controlsRow.className = 'gio-master-controls';

    this.selectBlend = new GiovanniSelect({
      label: 'Fusión',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Multiplicar', value: 'multiply' },
        { label: 'Trama (Screen)', value: 'screen' },
        { label: 'Superponer (Overlay)', value: 'overlay' },
        { label: 'Oscurecer', value: 'darken' },
        { label: 'Aclarar', value: 'lighten' }
      ],
      value: 'normal',
      onChange: (val) => {
        if (!this.activeLayer) return;
        this.activeLayer.blendMode = val;
        this._notify();
      }
    });

    this.toggleMask = new GiovanniToggle({
      label: 'Máscara Recorte',
      checked: false,
      onChange: (checked) => {
        if (!this.activeLayer) return;
        this.activeLayer.isMask = checked;
        this.renderStack();
        this._notify();
      }
    });

    controlsRow.appendChild(this.selectBlend.element);
    controlsRow.appendChild(this.toggleMask.element);

    // Fila 2: Slider de Opacidad único
    this.sliderOpacity = new GiovanniSlider({
      label: 'Opacidad',
      min: 0,
      max: 100,
      step: 1,
      value: 100,
      onInput: (val) => {
        if (!this.activeLayer) return;
        this.activeLayer.opacity = val;
        this._notify();
      }
    });

    this.masterRow.appendChild(controlsRow);
    this.masterRow.appendChild(this.sliderOpacity.element);

    // 2. CONTENEDOR DE CAPAS ACUMULADAS
    this.stackContainer = document.createElement('div');
    this.stackContainer.className = 'gio-layers-stack';

    // 3. BARRA INFERIOR DE ACCIONES (Nueva, Subir, Bajar, Borrar)
    const footer = document.createElement('div');
    footer.className = 'gio-stack-footer';

    const btnAdd = new GiovanniBoton({
      svg: this._getIcon('add'), ancho: 26, alto: 26,
      onClick: () => this.addLayer(`Capa ${this.layers.length + 1}`)
    });
    btnAdd.el.style.position = 'static';

    const btnUp = new GiovanniBoton({
      svg: this._getIcon('chevronUp'), ancho: 26, alto: 26,
      onClick: () => this.moveActiveLayer(-1)
    });
    btnUp.el.style.position = 'static';

    const btnDown = new GiovanniBoton({
      svg: this._getIcon('chevronDown'), ancho: 26, alto: 26,
      onClick: () => this.moveActiveLayer(1)
    });
    btnDown.el.style.position = 'static';

    const btnDel = new GiovanniBoton({
      svg: this._getIcon('delete'), ancho: 26, alto: 26,
      onClick: () => this.deleteActiveLayer()
    });
    btnDel.el.style.position = 'static';

    footer.appendChild(btnAdd.el);
    footer.appendChild(btnUp.el);
    footer.appendChild(btnDown.el);
    footer.appendChild(btnDel.el);

    this.shadow.appendChild(this.masterRow);
    this.shadow.appendChild(this.stackContainer);
    this.shadow.appendChild(footer);
  }

  addLayer(name = 'Nueva Capa') {
    const layer = {
      id: 'layer_' + Date.now() + Math.random(),
      name,
      visible: true,
      locked: false,
      opacity: 100,
      isMask: false,
      blendMode: 'normal'
    };

    this.layers.unshift(layer); // Apilar arriba como Photoshop
    this.selectLayer(layer);
  }

  selectLayer(layer) {
    this.activeLayer = layer;

    // Sincronizar los controles maestros con los datos de esta capa
    this.sliderOpacity.setValue(layer.opacity);
    this.toggleMask.setValue(layer.isMask);
    this.selectBlend.setValue(layer.blendMode);

    this.renderStack();
    this._notify();
  }

  moveActiveLayer(dir) {
    if (!this.activeLayer) return;
    const idx = this.layers.indexOf(this.activeLayer);
    const target = idx + dir;
    if (target < 0 || target >= this.layers.length) return;

    const item = this.layers.splice(idx, 1)[0];
    this.layers.splice(target, 0, item);
    this.renderStack();
    this._notify();
  }

  deleteActiveLayer() {
    if (!this.activeLayer) return;
    const idx = this.layers.indexOf(this.activeLayer);
    this.layers.splice(idx, 1);
    this.activeLayer = this.layers[0] || null;
    if (this.activeLayer) this.selectLayer(this.activeLayer);
    else this.renderStack();
    this._notify();
  }

  renderStack() {
    this.stackContainer.innerHTML = '';

    this.layers.forEach((layer) => {
      const row = document.createElement('div');
      row.className = `gio-layer-item ${layer === this.activeLayer ? 'active' : ''} ${layer.isMask ? 'is-mask' : ''}`;
      row.onclick = () => this.selectLayer(layer);

      // Botón Visibilidad con icono de GiovanniIconDB
      const btnVis = new GiovanniBoton({
        svg: this._getIcon(layer.visible ? 'visibility' : 'visibilityOff'),
        ancho: 22, alto: 22,
        onClick: (e) => {
          e.stopPropagation();
          layer.visible = !layer.visible;
          btnVis.el.innerHTML = this._getIcon(layer.visible ? 'visibility' : 'visibilityOff');
          this._notify();
        }
      });
      btnVis.el.style.position = 'static';

      // Nombre de la capa
      const title = document.createElement('span');
      title.className = 'gio-layer-name';
      title.textContent = layer.name;

      // Botón Candado con icono de GiovanniIconDB
      const btnLock = new GiovanniBoton({
        svg: this._getIcon(layer.locked ? 'lock' : 'unlock'),
        ancho: 22, alto: 22,
        onClick: (e) => {
          e.stopPropagation();
          layer.locked = !layer.locked;
          btnLock.el.innerHTML = this._getIcon(layer.locked ? 'lock' : 'unlock');
          btnLock.el.style.color = layer.locked ? '#5c9ce6' : '#6d6b6b';
          this._notify();
        }
      });
      btnLock.el.style.position = 'static';
      if (layer.locked) btnLock.el.style.color = '#5c9ce6';

      row.appendChild(btnVis.el);
      row.appendChild(title);
      row.appendChild(btnLock.el);

      this.stackContainer.appendChild(row);
    });
  }

  _notify() {
    if (this.onActiveLayerChange) {
      this.onActiveLayerChange(this.activeLayer, this.layers);
    }
  }
}

class GiovanniSelect {
  constructor({ label = '', options = [], value = null, placeholder = 'Seleccionar...', onChange = null } = {}) {
    this.options = { label, options, value, placeholder, onChange };
    this.selectedValue = value !== null ? value : (options[0]?.value ?? null);

    this.element = document.createElement('div');
    this.element.className = 'giovanni-select-host';
    this.shadow = this.element.attachShadow({ mode: 'open' });

    this._injectStyles();
    this._buildDOM();
    this._bindEvents();
    this._syncTrigger();
  }

  _injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: system-ui, -apple-system, sans-serif;
        color: #e0e0e0;
        font-size: 13px;
        box-sizing: border-box;
        width: 100%;
      }
      * { box-sizing: border-box; }

      .giovanni-select-label {
        display: block;
        color: #b0b0b0;
        font-size: 12px;
        margin-bottom: 6px;
        font-weight: 500;
      }

      .giovanni-select-container { position: relative; width: 100%; user-select: none; }

      .giovanni-select-trigger {
        width: 100%;
        background-color: #252525;
        color: #e0e0e0;
        border: 1px solid #3a3a3a;
        padding: 9px 14px;
        font-size: 12px;
        font-family: inherit;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.2s ease;
        outline: none;
        text-align: left;
      }
      .giovanni-select-trigger:hover { background-color: #333333; border-color: #444; }
      .giovanni-select-container.open .giovanni-select-trigger {
        background-color: #333333;
        border-color: #5c9ce6;
        box-shadow: 0 0 0 3px rgba(92, 156, 230, 0.15);
      }

      .giovanni-select-text {
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }

      .giovanni-select-arrow {
        width: 12px; height: 12px;
        stroke: #8a8a8a; fill: none; stroke-width: 2;
        flex-shrink: 0;
        transition: transform 0.3s ease, stroke 0.2s ease;
      }
      .giovanni-select-container.open .giovanni-select-arrow {
        transform: rotate(180deg); stroke: #5c9ce6;
      }

      .giovanni-select-options {
        position: absolute;
        top: calc(100% + 6px);
        left: 0; right: 0;
        background: #1e1e1e;
        border: 1px solid #3a3a3a;
        border-radius: 6px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
        z-index: 100;
        list-style: none;
        padding: 6px;
        margin: 0;
        opacity: 0; visibility: hidden;
        transform: translateY(-8px);
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
        max-height: 240px;
        overflow-y: auto;
      }
      .giovanni-select-container.open .giovanni-select-options {
        opacity: 1; visibility: visible; transform: translateY(0);
      }

      .giovanni-select-option {
        padding: 9px 12px;
        font-size: 12px;
        color: #8a8a8a;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background 0.15s, color 0.15s;
      }
      .giovanni-select-option:hover { background: #333333; color: #e0e0e0; }
      .giovanni-select-option.selected {
        background: rgba(92, 156, 230, 0.12);
        color: #5c9ce6;
        font-weight: 500;
      }
      .giovanni-select-option.selected::after {
        content: '';
        width: 10px; height: 6px;
        border-left: 2px solid #5c9ce6;
        border-bottom: 2px solid #5c9ce6;
        transform: rotate(-45deg);
        margin-top: -3px;
      }
    `;
    this.shadow.appendChild(style);
  }

  _buildDOM() {
    this.container = document.createElement('div');
    this.container.className = 'giovanni-select-container';

    if (this.options.label) {
      const lbl = document.createElement('span');
      lbl.className = 'giovanni-select-label';
      lbl.textContent = this.options.label;
      this.shadow.appendChild(lbl);
    }

    this.trigger = document.createElement('button');
    this.trigger.type = 'button';
    this.trigger.className = 'giovanni-select-trigger';

    this.textEl = document.createElement('span');
    this.textEl.className = 'giovanni-select-text';

    this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.arrow.setAttribute('viewBox', '0 0 24 24');
    this.arrow.setAttribute('class', 'giovanni-select-arrow');
    this.arrow.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';

    this.trigger.appendChild(this.textEl);
    this.trigger.appendChild(this.arrow);
    this.container.appendChild(this.trigger);

    this.optionsList = document.createElement('ul');
    this.optionsList.className = 'giovanni-select-options';
    this._renderOptions();

    this.container.appendChild(this.optionsList);
    this.shadow.appendChild(this.container);
  }

  _renderOptions() {
    this.optionsList.innerHTML = '';
    this.options.options.forEach(opt => {
      const li = document.createElement('li');
      li.className = 'giovanni-select-option';
      if (opt.value === this.selectedValue) li.classList.add('selected');
      li.textContent = opt.label;
      li.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setValue(opt.value, true);
        this._close();
      });
      this.optionsList.appendChild(li);
    });
  }

  _bindEvents() {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = this.container.classList.contains('open');
      document.querySelectorAll('.giovanni-select-host').forEach(h => {
        if (h !== this.element) h.shadowRoot?.querySelector('.giovanni-select-container')?.classList.remove('open');
      });
      this.container.classList.toggle('open', !isOpen);
    });

    this._outsideHandler = (e) => {
      if (!e.composedPath().includes(this.element)) this._close();
    };
    document.addEventListener('click', this._outsideHandler);
  }

  _close() { this.container.classList.remove('open'); }

  _syncTrigger() {
    const found = this.options.options.find(o => o.value === this.selectedValue);
    this.textEl.textContent = found ? found.label : this.options.placeholder;
  }

  setValue(val, trigger = false) {
    this.selectedValue = val;
    this._syncTrigger();
    this.optionsList.querySelectorAll('.giovanni-select-option').forEach((li, i) => {
      li.classList.toggle('selected', this.options.options[i].value === val);
    });
    if (trigger && this.options.onChange) this.options.onChange(val);
  }

  getValue() { return this.selectedValue; }
}
  
class GiovanniDatePicker {
  constructor({ label = '', mode = 'single', value = null, onChange = null } = {}) {
    this.options = { label, mode, value, onChange };

    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.startDate = null;
    this.endDate = null;

    if (mode === 'single' && value instanceof Date) this.startDate = value;
    if (mode === 'range' && value && value.start && value.end) {
      this.startDate = value.start;
      this.endDate = value.end;
    }

    this.element = document.createElement('div');
    this.element.className = 'giovanni-datepicker-host';
    this.shadow = this.element.attachShadow({ mode: 'open' });

    this._injectStyles();
    this._buildDOM();
    this._bindEvents();
    this._updateTrigger();
    this._renderCalendar();
  }

  _injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: system-ui, -apple-system, sans-serif;
        color: #e0e0e0;
        font-size: 13px;
        box-sizing: border-box;
        width: 100%;
      }
      * { box-sizing: border-box; }

      .giovanni-datepicker-label {
        display: block;
        color: #b0b0b0;
        font-size: 12px;
        margin-bottom: 6px;
        font-weight: 500;
      }

      .giovanni-datepicker-container { position: relative; width: 100%; user-select: none; }

      .giovanni-datepicker-trigger {
        width: 100%;
        background-color: #252525;
        color: #e0e0e0;
        border: 1px solid #3a3a3a;
        padding: 9px 14px;
        font-size: 12px;
        font-family: inherit;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.2s ease;
        outline: none;
        text-align: left;
      }
      .giovanni-datepicker-trigger:hover { background-color: #333333; border-color: #444; }
      .giovanni-datepicker-container.open .giovanni-datepicker-trigger {
        background-color: #333333;
        border-color: #5c9ce6;
        box-shadow: 0 0 0 3px rgba(92, 156, 230, 0.15);
      }

      .giovanni-datepicker-trigger-text {
        display: flex; align-items: center; gap: 8px; overflow: hidden;
      }
      .giovanni-datepicker-trigger-text span {
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }

      .giovanni-datepicker-icon {
        width: 14px; height: 14px;
        stroke: #8a8a8a; fill: none; stroke-width: 2;
        flex-shrink: 0;
      }

      .giovanni-datepicker-arrow {
        width: 12px; height: 12px;
        stroke: #8a8a8a; fill: none; stroke-width: 2;
        flex-shrink: 0;
        transition: transform 0.3s ease;
      }
      .giovanni-datepicker-container.open .giovanni-datepicker-arrow {
        transform: rotate(180deg); stroke: #5c9ce6;
      }

      .giovanni-datepicker-calendar {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        width: 280px;
        background: #1e1e1e;
        border: 1px solid #3a3a3a;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
        z-index: 100;
        padding: 14px;
        opacity: 0; visibility: hidden;
        transform: translateY(-8px);
        transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
      }
      .giovanni-datepicker-container.open .giovanni-datepicker-calendar {
        opacity: 1; visibility: visible; transform: translateY(0);
      }

      .giovanni-cal-header {
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 10px;
      }
      .giovanni-cal-nav {
        background: transparent;
        border: 1px solid #3a3a3a;
        color: #8a8a8a;
        width: 24px; height: 24px;
        border-radius: 4px;
        cursor: pointer;
        display: flex; justify-content: center; align-items: center;
        transition: all 0.2s;
      }
      .giovanni-cal-nav:hover { background: #333; color: #5c9ce6; border-color: #5c9ce6; }
      .giovanni-cal-nav svg { width: 12px; height: 12px; stroke: currentColor; stroke-width: 2; fill: none; }
      .giovanni-cal-month-year { font-size: 12px; font-weight: 600; color: #e0e0e0; text-transform: capitalize; }

      .giovanni-cal-weekdays {
        display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px;
        margin-bottom: 6px;
      }
      .giovanni-cal-weekday {
        text-align: center; font-size: 9px; color: #555;
        font-weight: 600; text-transform: uppercase; padding: 2px 0;
      }

      .giovanni-cal-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
      .giovanni-cal-day {
        aspect-ratio: 1;
        display: flex; justify-content: center; align-items: center;
        font-size: 11px; color: #8a8a8a;
        border-radius: 4px; cursor: pointer;
        transition: all 0.15s;
        border: 1px solid transparent;
      }
      .giovanni-cal-day:hover:not(.empty):not(.disabled) {
        background: #333; color: #e0e0e0; border-color: #3a3a3a;
      }
      .giovanni-cal-day.empty { cursor: default; }
      .giovanni-cal-day.today { color: #5c9ce6; font-weight: 700; border-color: #5c9ce6; }
      .giovanni-cal-day.selected {
        background: #5c9ce6 !important; color: #fff !important;
        font-weight: 600; border-color: #5c9ce6 !important;
      }
      .giovanni-cal-day.in-range {
        background: rgba(92, 156, 230, 0.15);
        color: #e0e0e0; border-radius: 0;
      }
      .giovanni-cal-day.range-start {
        background: #5c9ce6 !important; color: #fff !important;
        border-radius: 4px 0 0 4px;
      }
      .giovanni-cal-day.range-end {
        background: #5c9ce6 !important; color: #fff !important;
        border-radius: 0 4px 4px 0;
      }

      .giovanni-cal-footer {
        display: flex; justify-content: space-between; align-items: center;
        margin-top: 10px; padding-top: 10px;
        border-top: 1px solid #2c2c2c;
      }
      .giovanni-cal-info { font-size: 10px; color: #555; }
      .giovanni-cal-clear {
        background: transparent;
        border: 1px solid #3a3a3a;
        color: #8a8a8a;
        padding: 3px 8px; font-size: 10px;
        border-radius: 4px; cursor: pointer;
        transition: all 0.2s; font-family: inherit;
      }
      .giovanni-cal-clear:hover { background: rgba(255, 70, 70, 0.1); color: #ff6b6b; border-color: #ff6b6b; }
    `;
    this.shadow.appendChild(style);
  }

  _buildDOM() {
    this.container = document.createElement('div');
    this.container.className = 'giovanni-datepicker-container';

    if (this.options.label) {
      const lbl = document.createElement('span');
      lbl.className = 'giovanni-datepicker-label';
      lbl.textContent = this.options.label;
      this.shadow.appendChild(lbl);
    }

    this.trigger = document.createElement('button');
    this.trigger.type = 'button';
    this.trigger.className = 'giovanni-datepicker-trigger';

    const trigText = document.createElement('div');
    trigText.className = 'giovanni-datepicker-trigger-text';
    trigText.innerHTML = `
      <svg class="giovanni-datepicker-icon" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      <span class="giovanni-datepicker-display"></span>
    `;
    this.displayEl = trigText.querySelector('.giovanni-datepicker-display');

    this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.arrow.setAttribute('viewBox', '0 0 24 24');
    this.arrow.setAttribute('class', 'giovanni-datepicker-arrow');
    this.arrow.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';

    this.trigger.appendChild(trigText);
    this.trigger.appendChild(this.arrow);
    this.container.appendChild(this.trigger);

    this.calendar = document.createElement('div');
    this.calendar.className = 'giovanni-datepicker-calendar';
    this.calendar.innerHTML = `
      <div class="giovanni-cal-header">
        <button class="giovanni-cal-nav giovanni-cal-prev" type="button">
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <div class="giovanni-cal-month-year"></div>
        <button class="giovanni-cal-nav giovanni-cal-next" type="button">
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
      <div class="giovanni-cal-weekdays">
        <div class="giovanni-cal-weekday">Lu</div><div class="giovanni-cal-weekday">Ma</div>
        <div class="giovanni-cal-weekday">Mi</div><div class="giovanni-cal-weekday">Ju</div>
        <div class="giovanni-cal-weekday">Vi</div><div class="giovanni-cal-weekday">Sá</div>
        <div class="giovanni-cal-weekday">Do</div>
      </div>
      <div class="giovanni-cal-days"></div>
      <div class="giovanni-cal-footer">
        <span class="giovanni-cal-info"></span>
        <button class="giovanni-cal-clear" type="button">Limpiar</button>
      </div>
    `;
    this.container.appendChild(this.calendar);
    this.shadow.appendChild(this.container);

    this.monthYearEl = this.calendar.querySelector('.giovanni-cal-month-year');
    this.daysEl = this.calendar.querySelector('.giovanni-cal-days');
    this.infoEl = this.calendar.querySelector('.giovanni-cal-info');
  }

  _bindEvents() {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.giovanni-datepicker-host').forEach(h => {
        if (h !== this.element) h.shadowRoot?.querySelector('.giovanni-datepicker-container')?.classList.remove('open');
      });
      this.container.classList.toggle('open');
    });

    this.calendar.querySelector('.giovanni-cal-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      this._changeMonth(-1);
    });
    this.calendar.querySelector('.giovanni-cal-next').addEventListener('click', (e) => {
      e.stopPropagation();
      this._changeMonth(1);
    });
    this.calendar.querySelector('.giovanni-cal-clear').addEventListener('click', (e) => {
      e.stopPropagation();
      this.clear();
    });

    this._outsideHandler = (e) => {
      if (!e.composedPath().includes(this.element)) {
        this.container.classList.remove('open');
      }
    };
    document.addEventListener('click', this._outsideHandler);
  }

  _changeMonth(dir) {
    this.currentMonth += dir;
    if (this.currentMonth < 0) { this.currentMonth = 11; this.currentYear--; }
    else if (this.currentMonth > 11) { this.currentMonth = 0; this.currentYear++; }
    this._renderCalendar();
  }

  _renderCalendar() {
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    this.monthYearEl.textContent = `${meses[this.currentMonth]} ${this.currentYear}`;
    this.daysEl.innerHTML = '';

    let firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(this.currentYear, this.currentMonth, 0).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      const d = document.createElement('div');
      d.className = 'giovanni-cal-day empty';
      d.textContent = prevMonthDays - i;
      this.daysEl.appendChild(d);
    }

    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    for (let d = 1; d <= daysInMonth; d++) {
      const day = document.createElement('div');
      day.className = 'giovanni-cal-day';
      day.textContent = d;
      const thisDate = new Date(this.currentYear, this.currentMonth, d);

      if (thisDate.getTime() === todayDate.getTime()) day.classList.add('today');

      if (this.startDate && this.endDate) {
        if (thisDate.getTime() === this.startDate.getTime()) day.classList.add('selected', 'range-start');
        else if (thisDate.getTime() === this.endDate.getTime()) day.classList.add('selected', 'range-end');
        else if (thisDate > this.startDate && thisDate < this.endDate) day.classList.add('in-range');
      } else if (this.startDate) {
        if (thisDate.getTime() === this.startDate.getTime()) day.classList.add('selected');
      }

      day.addEventListener('click', (e) => {
        e.stopPropagation();
        this._selectDay(thisDate);
      });
      this.daysEl.appendChild(day);
    }

    this._updateInfo();
  }

  _selectDay(date) {
    if (this.options.mode === 'single') {
      this.startDate = date;
      this.endDate = null;
      this._updateTrigger();
      this.container.classList.remove('open');
      this._renderCalendar();
      if (this.options.onChange) this.options.onChange(date);
    } else {
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
      this._updateTrigger();
      this._renderCalendar();
      if (this.startDate && this.endDate && this.options.onChange) {
        this.options.onChange({ start: this.startDate, end: this.endDate });
      }
    }
  }

  _formatDate(date) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    return `${d}/${m}/${date.getFullYear()}`;
  }

  _updateTrigger() {
    if (this.options.mode === 'single') {
      this.displayEl.textContent = this.startDate ? this._formatDate(this.startDate) : 'Seleccionar fecha...';
    } else {
      if (this.startDate && this.endDate) {
        this.displayEl.textContent = `${this._formatDate(this.startDate)} → ${this._formatDate(this.endDate)}`;
      } else if (this.startDate) {
        this.displayEl.textContent = `${this._formatDate(this.startDate)} → ...`;
      } else {
        this.displayEl.textContent = 'Seleccionar rango...';
      }
    }
  }

  _updateInfo() {
    if (!this.startDate) {
      this.infoEl.textContent = this.options.mode === 'single' ? 'Selecciona un día' : 'Haz clic para seleccionar';
    } else if (this.startDate && !this.endDate) {
      this.infoEl.textContent = this.options.mode === 'single' ? 'Fecha seleccionada' : 'Selecciona la fecha fin';
    } else {
      const diff = Math.ceil(Math.abs(this.endDate - this.startDate) / (1000 * 60 * 60 * 24)) + 1;
      this.infoEl.textContent = `${diff} día${diff > 1 ? 's' : ''} seleccionado${diff > 1 ? 's' : ''}`;
    }
  }

  clear() {
    this.startDate = null;
    this.endDate = null;
    this._updateTrigger();
    this._renderCalendar();
    if (this.options.onChange) this.options.onChange(null);
  }

  setValue(val, trigger = false) {
    this.startDate = null;
    this.endDate = null;
    if (this.options.mode === 'single' && val instanceof Date) {
      this.startDate = val;
    } else if (this.options.mode === 'range' && val && val.start && val.end) {
      this.startDate = val.start;
      this.endDate = val.end;
    }
    this._updateTrigger();
    this._renderCalendar();
    if (trigger && this.options.onChange) this.options.onChange(val);
  }

  getValue() {
    return this.options.mode === 'single'
      ? this.startDate
      : (this.startDate && this.endDate ? { start: this.startDate, end: this.endDate } : null);
  }
}
  
class GiovanniToggle {
  constructor({ label = '', checked = false, onChange = null } = {}) {
    this.options = { label, checked, onChange };

    this.element = document.createElement('div');
    this.element.className = 'giovanni-toggle-host';
    this.shadow = this.element.attachShadow({ mode: 'open' });

    this._injectStyles();
    this._buildDOM();
    this._bindEvents();
  }

  _injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: system-ui, -apple-system, sans-serif;
        color: #e0e0e0;
        font-size: 13px;
        box-sizing: border-box;
        width: 100%;
      }
      * { box-sizing: border-box; }

      .giovanni-toggle-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        user-select: none;
      }

      .giovanni-toggle-label {
        color: #b0b0b0;
        font-size: 12px;
        font-weight: 500;
        transition: color 0.2s;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .giovanni-toggle-container:hover .giovanni-toggle-label { color: #e0e0e0; }

      .giovanni-toggle-switch {
        position: relative;
        display: inline-block;
        width: 32px;
        height: 18px;
        flex-shrink: 0;
      }
      .giovanni-toggle-switch input { opacity: 0; width: 0; height: 0; }

      .giovanni-toggle-track {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #3a3a3a;
        transition: 0.25s;
        border-radius: 18px;
      }
      .giovanni-toggle-track:before {
        position: absolute;
        content: "";
        height: 12px;
        width: 12px;
        left: 3px;
        bottom: 3px;
        background-color: #888;
        transition: 0.25s;
        border-radius: 50%;
      }
      .giovanni-toggle-switch input:checked + .giovanni-toggle-track {
        background-color: #5c9ce6;
      }
      .giovanni-toggle-switch input:checked + .giovanni-toggle-track:before {
        transform: translateX(14px);
        background-color: #fff;
      }
    `;
    this.shadow.appendChild(style);
  }

  _buildDOM() {
    const container = document.createElement('label');
    container.className = 'giovanni-toggle-container';

    this.labelEl = document.createElement('span');
    this.labelEl.className = 'giovanni-toggle-label';
    this.labelEl.textContent = this.options.label;

    const switchEl = document.createElement('span');
    switchEl.className = 'giovanni-toggle-switch';

    this.input = document.createElement('input');
    this.input.type = 'checkbox';
    this.input.checked = this.options.checked;

    const track = document.createElement('span');
    track.className = 'giovanni-toggle-track';

    switchEl.appendChild(this.input);
    switchEl.appendChild(track);

    container.appendChild(this.labelEl);
    container.appendChild(switchEl);

    this.shadow.appendChild(container);
  }

  _bindEvents() {
    this.input.addEventListener('change', (e) => {
      if (this.options.onChange) this.options.onChange(e.target.checked);
    });
  }

  setValue(checked) { this.input.checked = checked; }
  getValue() { return this.input.checked; }
}
 


 var cssthema = `
   

 /* Para navegadores basados en Webkit (Chrome, Edge, Safari, Opera) */
::-webkit-scrollbar {
  width: 6px;  /* Ancho para scroll vertical */
  height: 6px; /* Alto para scroll horizontal */
}

::-webkit-scrollbar-track {
  background: transparent; /* O el color de fondo de tu web */
}

::-webkit-scrollbar-thumb {
  background: #444; 
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #666; /* Un tono más claro al pasar el ratón (opcional) */
}

` ;

 class ThemeCSS {
        static css(id = 'custom-theme-css2026') {
            this.id = id;
            this.styleElement = document.getElementById(this.id);
            if (!this.styleElement) {
                this.styleElement = document.createElement('style');
                this.styleElement.id = this.id;
                this.styleElement.textContent = cssthema;
                document.head.appendChild(this.styleElement);
                
            }
        }
        
    }

window.addEventListener("load",()=>{ setTimeout(()=>{ThemeCSS.css(); },1000);});


 
