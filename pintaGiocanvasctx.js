class GioLayerManager {
  constructor(container, width, height, onUpdate) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.onUpdate = onUpdate || (() => {});
    this.layers = [];
    this.activeIndex = 0;
    this._idCounter = 0;

    this._addLayerSilent('Background');
  }

  _addLayerSilent(name) {
    const canvas = this._makeLayerCanvas();
    const layer = {
      id: this._nextId(),
      name: name || `Layer ${this.layers.length + 1}`,
      canvas,
      ctx: canvas.getContext('2d'),
      visible: true,
      opacity: 1,
      blendMode: 'source-over',
    };
    this.layers.push(layer);
    this.activeIndex = this.layers.length - 1;
    return layer;
  }

  _makeLayerCanvas() {
    const c = document.createElement('canvas');
    c.width = this.width;
    c.height = this.height;
    return c;
  }

  _nextId() { return ++this._idCounter; }

  addLayer(name) {
    const canvas = this._makeLayerCanvas();
    const layer = {
      id: this._nextId(),
      name: name || `Layer ${this.layers.length + 1}`,
      canvas,
      ctx: canvas.getContext('2d'),
      visible: true,
      opacity: 1,
      blendMode: 'source-over',
    };
    this.layers.push(layer);
    this.activeIndex = this.layers.length - 1;
    this.onUpdate();
    return layer;
  }

  deleteLayer(index) {
    if (this.layers.length <= 1) return;
    this.layers.splice(index, 1);
    this.activeIndex = Math.min(this.activeIndex, this.layers.length - 1);
    this.onUpdate();
  }

  toggleVisibility(index) {
    if (this.layers[index]) {
      this.layers[index].visible = !this.layers[index].visible;
      this.onUpdate();
    }
  }

  setOpacity(index, opacity) {
    if (this.layers[index]) {
      this.layers[index].opacity = Math.max(0, Math.min(1, opacity));
      this.onUpdate();
    }
  }

  mergeDown(index) {
    if (index < 1 || index >= this.layers.length) return;
    const top = this.layers[index];
    const bottom = this.layers[index - 1];
    bottom.ctx.save();
    bottom.ctx.globalAlpha = top.opacity;
    bottom.ctx.globalCompositeOperation = top.blendMode;
    bottom.ctx.drawImage(top.canvas, 0, 0);
    bottom.ctx.restore();
    this.deleteLayer(index);
  }

  flattenAll() {
    for (let i = this.layers.length - 1; i >= 1; i--) {
      this.mergeDown(i);
    }
  }

  moveUp(index) {
    if (index >= this.layers.length - 1) return;
    [this.layers[index], this.layers[index + 1]] =
      [this.layers[index + 1], this.layers[index]];
    this.activeIndex = index + 1;
    this.onUpdate();
  }

  moveDown(index) {
    if (index <= 0) return;
    [this.layers[index], this.layers[index - 1]] =
      [this.layers[index - 1], this.layers[index]];
    this.activeIndex = index - 1;
    this.onUpdate();
  }

  get activeCtx() {
    return this.layers[this.activeIndex]?.ctx || null;
  }

  get activeCanvas() {
    return this.layers[this.activeIndex]?.canvas || null;
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
    this.layers.forEach(layer => {
      const imageData = layer.ctx.getImageData(0, 0, layer.canvas.width, layer.canvas.height);
      layer.canvas.width = width;
      layer.canvas.height = height;
      layer.ctx.putImageData(imageData, 0, 0);
    });
    this.onUpdate();
  }

  composite(destCtx) {
    destCtx.clearRect(0, 0, this.width, this.height);
    for (const layer of this.layers) {
      if (!layer.visible) continue;
      destCtx.save();
      destCtx.globalAlpha = layer.opacity;
      destCtx.globalCompositeOperation = layer.blendMode;
      destCtx.drawImage(layer.canvas, 0, 0);
      destCtx.restore();
    }
  }
}


class GioBrushEngine {
  constructor() {
    this.brushCanvas = null;
    this.brushCtx = null;
    this.spacing = 0.25;
    this._lastPos = null;
    this._distBuffer = 0;
    this.useImageBrush = false;
    this.imageBrushCanvas = null;
  }

  loadBrushFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = img.width;
          c.height = img.height;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, 0, 0);
          this.brushCanvas = c;
          this.brushCtx = ctx;
          this.useImageBrush = false;
          resolve(c);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  loadImageBrush(imgElement) {
    const c = document.createElement('canvas');
    c.width = imgElement.naturalWidth || imgElement.width;
    c.height = imgElement.naturalHeight || imgElement.height;
    const ctx = c.getContext('2d');
    ctx.drawImage(imgElement, 0, 0);
    this.imageBrushCanvas = c;
    this.useImageBrush = true;
  }

  clearImageBrush() {
    this.imageBrushCanvas = null;
    this.useImageBrush = false;
  }

  stamp(ctx, x, y, size, color, opacity, hardness, angle = 0) {
    const r = size / 2;
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(x, y);
    if (angle) ctx.rotate(angle);

    if (this.brushCanvas && !this.useImageBrush) {
      const bw = this.brushCanvas.width;
      const bh = this.brushCanvas.height;
      const off = document.createElement('canvas');
      off.width = bw;
      off.height = bh;
      const offCtx = off.getContext('2d');

      offCtx.fillStyle = color;
      offCtx.fillRect(0, 0, bw, bh);
      offCtx.globalCompositeOperation = 'destination-in';

      offCtx.drawImage(this.brushCanvas, 0, 0);
      offCtx.restore && offCtx.restore();

      ctx.drawImage(off, -size / 2, -size / 2, size, size);

    } else if (this.useImageBrush && this.imageBrushCanvas) {
      ctx.drawImage(this.imageBrushCanvas, -r, -r, size, size);

    } else {
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
      const innerRadius = r * hardness;
      const stopHard = innerRadius / r;
      gradient.addColorStop(0, color);
      gradient.addColorStop(Math.min(stopHard, 0.99), color);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  beginStroke(x, y) {
    this._lastPos = { x, y };
    this._distBuffer = 0;
  }

  stroke(ctx, x, y, size, color, opacity, hardness, angle = 0) {
    if (!this._lastPos) {
      this.beginStroke(x, y);
      this.stamp(ctx, x, y, size, color, opacity, hardness, angle);
      return;
    }
    const dx = x - this._lastPos.x;
    const dy = y - this._lastPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const step = Math.max(1, size * this.spacing);
    let remaining = dist + this._distBuffer;
    let t = (step - this._distBuffer) / dist;

    while (t <= 1) {
      const px = this._lastPos.x + dx * t;
      const py = this._lastPos.y + dy * t;
      this.stamp(ctx, px, py, size, color, opacity, hardness, angle);
      t += step / dist;
      remaining -= step;
    }

    this._distBuffer = remaining % step;
    this._lastPos = { x, y };
  }

  endStroke() {
    this._lastPos = null;
    this._distBuffer = 0;
  }
}


class GioCanvasPaint {
  constructor(canvasOrId) {
    if (typeof canvasOrId === 'string') {
      this._displayCanvas = document.getElementById(canvasOrId);
    } else if (canvasOrId instanceof HTMLCanvasElement) {
      this._displayCanvas = canvasOrId;
    } else {
      throw new Error('GioCanvasPaint: pass an HTMLCanvasElement or a valid canvas id');
    }

    if (!this._displayCanvas) {
      throw new Error('GioCanvasPaint: canvas element not found');
    }

    this._targetCanvas = this._displayCanvas;
    this._targetCtx = this._targetCanvas.getContext('2d');

    this.width = this._targetCanvas.width;
    this.height = this._targetCanvas.height;

    this._cachedRect = null;
    this._scaleX = 1;
    this._scaleY = 1;
    this._resizeObserver = null;
    this._intersectionObserver = null;

    this.tool = 'brush';
    this.color = '#000000';
    this.secondaryColor = '#ffffff';
    this.brushSize = 20;
    this.opacity = 1;
    this.hardness = 0.8;
    this.brushAngle = 0;
    this.brushSpacing = 0.25;

    this._brush = new GioBrushEngine();
    this._brush.spacing = this.brushSpacing;

    this._layerContainer = document.createElement('div');
    this._layerManager = null;
    this._layerManager = new GioLayerManager(
      this._layerContainer,
      this.width,
      this.height,
      () => { if (this._layerManager && this._targetCtx) this._composite(); }
    );

    this._painting = false;
    this._eyedropperCB = null;

    this._history = [];
    this._historyIndex = -1;
    this._maxHistory = 30;

    this._buildUI();
    this._bindEvents();
    this._initResizeObserver(this._displayCanvas);
    this._composite();
  }

  setCanvas(htmlCanvas) {
    if (!(htmlCanvas instanceof HTMLCanvasElement)) {
      throw new Error('setCanvas: expected an HTMLCanvasElement');
    }

    this._targetCanvas = htmlCanvas;
    this._targetCtx = htmlCanvas.getContext('2d');

    htmlCanvas.width = this.width;
    htmlCanvas.height = this.height;

    this._cachedRect = null;
    this.setRecalcularRect();

    this._composite();
  }

  setTool(name) {
    this.tool = name;
    this._updateToolUI();
  }

  setColor(cssColor) {
    this.color = cssColor;
    if (this._uiColorPicker) this._uiColorPicker.value = cssColor;
  }

  setBrushSize(px) {
    this.brushSize = px;
    if (this._uiBrushSize) this._uiBrushSize.value = px;
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const ctx = this._layerManager.activeCtx;
        ctx.drawImage(img, 0, 0, this.width, this.height);
        this._composite();
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  toDataURL(type = 'image/png') {
    const off = document.createElement('canvas');
    off.width = this.width;
    off.height = this.height;
    this._layerManager.composite(off.getContext('2d'));
    return off.toDataURL(type);
  }

  _buildUI() {
    let wrapper = this._displayCanvas.parentElement;
    if (!wrapper || wrapper.dataset.gioRoot) {
      wrapper = document.createElement('div');
      this._displayCanvas.parentNode?.insertBefore(wrapper, this._displayCanvas);
      wrapper.appendChild(this._displayCanvas);
    }
    wrapper.dataset.gioRoot = '1';
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-flex';
    wrapper.style.gap = '0';

    const toolbar = document.createElement('div');
    toolbar.className = 'gio-toolbar';
    toolbar.innerHTML = `
      <style>
        :root {
          --gio-bg: #1a1a2e;
          --gio-panel: #16213e;
          --gio-border: #0f3460;
          --gio-accent: #e94560;
          --gio-text: #a8b2d8;
          --gio-text-bright: #cdd6f4;
          --gio-hover: #0f3460;
          --gio-active: #e94560;
          --gio-input-bg: #0d1b2a;
          --gio-radius: 6px;
          --gio-font: 'Segoe UI', system-ui, sans-serif;
        }
        .gio-toolbar {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 8px 6px;
          background: var(--gio-panel);
          border: 1px solid var(--gio-border);
          border-radius: var(--gio-radius) 0 0 var(--gio-radius);
          min-width: 48px;
          font-family: var(--gio-font);
          font-size: 11px;
          color: var(--gio-text);
          user-select: none;
          z-index: 10;
        }
        .gio-tool-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid transparent;
          border-radius: var(--gio-radius);
          cursor: pointer;
          background: transparent;
          color: var(--gio-text);
          font-size: 18px;
          transition: all 0.15s;
          position: relative;
          title: attr(data-tip);
        }
        .gio-tool-btn:hover { background: var(--gio-hover); color: var(--gio-text-bright); }
        .gio-tool-btn.active { background: var(--gio-accent); color: #fff; border-color: var(--gio-accent); }
        .gio-separator { width: 100%; height: 1px; background: var(--gio-border); margin: 4px 0; }
        .gio-color-swatch {
          width: 36px;
          height: 36px;
          border-radius: var(--gio-radius);
          border: 1px solid var(--gio-border);
          cursor: pointer;
          position: relative;
        }
        .gio-color-swatch input[type=color] {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
          border: none;
          padding: 0;
        }
        .gio-label { font-size: 9px; text-align: center; color: var(--gio-text); margin-top: 1px; }

        .gio-panel-right {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: var(--gio-panel);
          border: 1px solid var(--gio-border);
          border-left: none;
          border-radius: 0 var(--gio-radius) var(--gio-radius) 0;
          min-width: 200px;
          font-family: var(--gio-font);
          font-size: 11px;
          color: var(--gio-text);
          overflow: hidden;
        }
        .gio-section {
          border-bottom: 1px solid var(--gio-border);
          padding: 8px;
        }
        .gio-section-title {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--gio-accent);
          margin-bottom: 6px;
          font-weight: 600;
        }
        .gio-row { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
        .gio-row:last-child { margin-bottom: 0; }
        .gio-row label { flex: 0 0 56px; font-size: 10px; }
        .gio-slider {
          flex: 1;
          -webkit-appearance: none;
          height: 3px;
          background: var(--gio-border);
          border-radius: 2px;
          outline: none;
        }
        .gio-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--gio-accent);
          cursor: pointer;
        }
        .gio-val { font-size: 10px; min-width: 28px; text-align: right; color: var(--gio-text-bright); }
        .gio-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          background: var(--gio-input-bg);
          border: 1px solid var(--gio-border);
          border-radius: var(--gio-radius);
          color: var(--gio-text);
          font-size: 10px;
          cursor: pointer;
          transition: all 0.15s;
          font-family: var(--gio-font);
        }
        .gio-btn:hover { background: var(--gio-hover); color: var(--gio-text-bright); }
        .gio-btn.danger:hover { background: #e94560; color: #fff; border-color: #e94560; }

        .gio-layer-list {
          max-height: 200px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 6px;
        }
        .gio-layer-item {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 4px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.1s;
          border: 1px solid transparent;
        }
        .gio-layer-item:hover { background: var(--gio-hover); }
        .gio-layer-item.active { border-color: var(--gio-accent); background: rgba(233,69,96,0.1); }
        .gio-layer-thumb {
          width: 24px;
          height: 24px;
          border-radius: 3px;
          border: 1px solid var(--gio-border);
          object-fit: cover;
          flex-shrink: 0;
          background: repeating-conic-gradient(#444 0% 25%, #222 0% 50%) 0 0 / 8px 8px;
        }
        .gio-layer-thumb canvas { width: 100%; height: 100%; }
        .gio-layer-name {
          flex: 1;
          font-size: 10px;
          color: var(--gio-text-bright);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .gio-layer-vis {
          font-size: 12px;
          cursor: pointer;
          padding: 1px 2px;
          opacity: 0.6;
        }
        .gio-layer-vis:hover { opacity: 1; }
        .gio-layer-actions { display: flex; gap: 3px; flex-wrap: wrap; }

        .gio-brush-presets {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 6px;
        }
        .gio-brush-preset {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          border: 1px solid var(--gio-border);
          cursor: pointer;
          background: var(--gio-input-bg);
          overflow: hidden;
          transition: border-color 0.15s;
        }
        .gio-brush-preset:hover { border-color: var(--gio-accent); }
        .gio-brush-preset.active { border-color: var(--gio-accent); background: rgba(233,69,96,0.15); }
        .gio-brush-preset canvas { display: block; }

        .gio-cursor-overlay {
          position: absolute;
          pointer-events: none;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.7);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.5);
          transform: translate(-50%, -50%);
          display: none;
          z-index: 100;
        }

        .gio-layer-list::-webkit-scrollbar { width: 4px; }
        .gio-layer-list::-webkit-scrollbar-track { background: var(--gio-bg); }
        .gio-layer-list::-webkit-scrollbar-thumb { background: var(--gio-border); border-radius: 2px; }
      </style>

      <div class="gio-tool-btn active" data-tool="brush" data-tip="Brush (B)" title="Brush (B)">🖌️</div>
      <div class="gio-tool-btn" data-tool="eraser" title="Eraser (E)">🧹</div>
      <div class="gio-tool-btn" data-tool="fill" title="Fill Bucket (F)">🪣</div>
      <div class="gio-tool-btn" data-tool="eyedropper" title="Eyedropper (I)">💉</div>

      <div class="gio-separator"></div>

      <div class="gio-color-swatch" id="gio-primary-swatch" title="Primary Color" style="background:#000">
        <input type="color" id="gio-color-picker" value="#000000">
      </div>
      <div class="gio-label">FG</div>

      <div class="gio-color-swatch" id="gio-secondary-swatch" title="Secondary Color (right-click)" style="background:#fff">
        <input type="color" id="gio-color-picker-bg" value="#ffffff">
      </div>
      <div class="gio-label">BG</div>

      <div class="gio-separator"></div>

      <div class="gio-tool-btn" id="gio-swap-colors" title="Swap colors (X)">⇄</div>
    `;

    const panelRight = document.createElement('div');
    panelRight.className = 'gio-panel-right';
    panelRight.innerHTML = `
      <div class="gio-section">
        <div class="gio-section-title">Brush</div>
        <div class="gio-row">
          <label>Size</label>
          <input class="gio-slider" type="range" id="gio-brush-size" min="1" max="300" value="20">
          <span class="gio-val" id="gio-brush-size-val">20</span>
        </div>
        <div class="gio-row">
          <label>Opacity</label>
          <input class="gio-slider" type="range" id="gio-brush-opacity" min="1" max="100" value="100">
          <span class="gio-val" id="gio-brush-opacity-val">100%</span>
        </div>
        <div class="gio-row">
          <label>Hardness</label>
          <input class="gio-slider" type="range" id="gio-brush-hardness" min="0" max="100" value="80">
          <span class="gio-val" id="gio-brush-hardness-val">80%</span>
        </div>
        <div class="gio-row">
          <label>Spacing</label>
          <input class="gio-slider" type="range" id="gio-brush-spacing" min="1" max="200" value="25">
          <span class="gio-val" id="gio-brush-spacing-val">25%</span>
        </div>
        <div class="gio-row">
          <label>Angle</label>
          <input class="gio-slider" type="range" id="gio-brush-angle" min="0" max="360" value="0">
          <span class="gio-val" id="gio-brush-angle-val">0°</span>
        </div>
      </div>

      <div class="gio-section">
        <div class="gio-section-title">Brush Tip Presets</div>
        <div class="gio-brush-presets" id="gio-brush-presets"></div>
        <div class="gio-row" style="gap:4px;flex-wrap:wrap">
          <label for="gio-load-brush" class="gio-btn">📂 Load Brush</label>
          <input type="file" id="gio-load-brush" accept="image/*" style="display:none" multiple>
          <label for="gio-load-img-brush" class="gio-btn">🖼️ Image Brush</label>
          <input type="file" id="gio-load-img-brush" accept="image/*" style="display:none">
          <button class="gio-btn" id="gio-clear-img-brush">✕ Clear</button>
        </div>
      </div>

      <div class="gio-section">
        <div class="gio-section-title">Load Image</div>
        <div class="gio-row" style="flex-wrap:wrap;gap:4px">
          <label for="gio-load-image" class="gio-btn">📂 Open File</label>
          <input type="file" id="gio-load-image" accept="image/*" style="display:none">
          <button class="gio-btn" id="gio-paste-clipboard">📋 Paste</button>
          <button class="gio-btn" id="gio-export">💾 Export</button>
        </div>
        <div style="font-size:9px;color:var(--gio-text);margin-top:4px">
          Ctrl+Click canvas · Drag &amp; Drop · Ctrl+V
        </div>
      </div>

      <div class="gio-section">
        <div class="gio-section-title">History</div>
        <div class="gio-row" style="gap:4px">
          <button class="gio-btn" id="gio-undo">↩ Undo</button>
          <button class="gio-btn" id="gio-redo">↪ Redo</button>
          <button class="gio-btn danger" id="gio-clear">🗑 Clear</button>
        </div>
      </div>

      <div class="gio-section" style="flex:1;overflow:hidden;display:flex;flex-direction:column">
        <div class="gio-section-title">Layers</div>
        <div class="gio-layer-list" id="gio-layer-list"></div>
        <div class="gio-layer-actions">
          <button class="gio-btn" id="gio-add-layer">+ Add</button>
          <button class="gio-btn" id="gio-merge-down">⬇ Merge</button>
          <button class="gio-btn" id="gio-flatten">⊞ Flatten</button>
          <button class="gio-btn danger" id="gio-del-layer">🗑</button>
        </div>
      </div>
    `;

    this._cursorOverlay = document.createElement('div');
    this._cursorOverlay.className = 'gio-cursor-overlay';
    this._displayCanvas.parentElement
      ? this._displayCanvas.parentElement.appendChild(this._cursorOverlay)
      : document.body.appendChild(this._cursorOverlay);
    this._displayCanvas.style.position = 'relative';
    this._displayCanvas.style.cursor = 'crosshair';

    const canvasParent = this._displayCanvas.parentElement || document.body;
    canvasParent.insertBefore(toolbar, this._displayCanvas);
    canvasParent.appendChild(panelRight);
    if (this._cursorOverlay.parentElement !== canvasParent) {
      canvasParent.appendChild(this._cursorOverlay);
    }

    this._toolbar = toolbar;
    this._panelRight = panelRight;
    this._uiColorPicker = document.getElementById('gio-color-picker');
    this._uiColorPickerBg = document.getElementById('gio-color-picker-bg');
    this._uiBrushSize = document.getElementById('gio-brush-size');

    this._buildBuiltinBrushPresets();
    this._renderLayerList();
  }

  _buildBuiltinBrushPresets() {
    const container = document.getElementById('gio-brush-presets');
    if (!container) return;

    const presets = [
      { label: 'Round Soft', fn: this._makeRoundSoftBrush.bind(this) },
      { label: 'Round Hard', fn: this._makeRoundHardBrush.bind(this) },
      { label: 'Flat', fn: this._makeFlatBrush.bind(this) },
      { label: 'Scatter', fn: this._makeScatterBrush.bind(this) },
      { label: 'Texture', fn: this._makeTextureBrush.bind(this) },
    ];

    this._brushPresets = presets.map((p, i) => {
      const thumb = document.createElement('canvas');
      thumb.width = 28;
      thumb.height = 28;
      p.fn(thumb.getContext('2d'), 28);

      const wrap = document.createElement('div');
      wrap.className = 'gio-brush-preset' + (i === 0 ? ' active' : '');
      wrap.title = p.label;
      wrap.appendChild(thumb);
      wrap.addEventListener('click', () => {
        this._brush.brushCanvas = null;
        this._brush.useImageBrush = false;
        this._activeBrushPreset = i;
        this._currentPresetFn = p.fn;
        container.querySelectorAll('.gio-brush-preset').forEach((el, j) =>
          el.classList.toggle('active', j === i));
      });
      container.appendChild(wrap);
      return wrap;
    });

    this._activeBrushPreset = 0;
    this._currentPresetFn = null;
  }

  _makeRoundSoftBrush(ctx, size) {
    const r = size / 2;
    const g = ctx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0, '#fff');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.arc(r, r, r, 0, Math.PI * 2);
    ctx.fill();
  }

  _makeRoundHardBrush(ctx, size) {
    const r = size / 2;
    ctx.fillStyle = '#fff';
    ctx.arc(r, r, r * 0.9, 0, Math.PI * 2);
    ctx.fill();
  }

  _makeFlatBrush(ctx, size) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(4, size * 0.3, size - 8, size * 0.4);
  }

  _makeScatterBrush(ctx, size) {
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 12; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _makeTextureBrush(ctx, size) {
    for (let y = 0; y < size; y += 3) {
      for (let x = 0; x < size; x += 3) {
        const v = Math.random();
        ctx.fillStyle = `rgba(255,255,255,${v})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }

  _renderLayerList() {
    const list = document.getElementById('gio-layer-list');
    if (!list) return;
    list.innerHTML = '';

    const layers = this._layerManager.layers;
    for (let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i];
      const item = document.createElement('div');
      item.className = 'gio-layer-item' + (i === this._layerManager.activeIndex ? ' active' : '');

      const thumbCanvas = document.createElement('canvas');
      thumbCanvas.width = 24;
      thumbCanvas.height = 24;
      thumbCanvas.className = 'gio-layer-thumb';
      const tc = thumbCanvas.getContext('2d');
      tc.drawImage(layer.canvas, 0, 0, 24, 24);

      const vis = document.createElement('span');
      vis.className = 'gio-layer-vis';
      vis.textContent = layer.visible ? '👁' : '🚫';
      vis.title = layer.visible ? 'Hide layer' : 'Show layer';

      const name = document.createElement('span');
      name.className = 'gio-layer-name';
      name.textContent = layer.name;
      name.title = layer.name;

      const opSlider = document.createElement('input');
      opSlider.type = 'range';
      opSlider.min = 0;
      opSlider.max = 100;
      opSlider.value = Math.round(layer.opacity * 100);
      opSlider.style.cssText = 'width:40px;height:3px;cursor:pointer;accent-color:#e94560;';
      opSlider.title = 'Opacity';

      item.appendChild(thumbCanvas);
      item.appendChild(vis);
      item.appendChild(name);
      item.appendChild(opSlider);

      item.addEventListener('click', e => {
        if (e.target === vis || e.target === opSlider) return;
        this._layerManager.activeIndex = i;
        this._renderLayerList();
      });

      vis.addEventListener('click', e => {
        e.stopPropagation();
        this._layerManager.toggleVisibility(i);
        this._renderLayerList();
      });

      opSlider.addEventListener('input', e => {
        e.stopPropagation();
        this._layerManager.setOpacity(i, e.target.value / 100);
      });

      list.appendChild(item);
    }
  }

  _bindEvents() {
    this._h = {
      mousedown: this._onMouseDown.bind(this),
      mousemove: this._onMouseMove.bind(this),
      mouseup: this._onMouseUp.bind(this),
      mouseleave: this._onMouseLeave.bind(this),
      contextmenu: e => { e.preventDefault(); this._onRightClick(e); },
      click: e => { if (e.ctrlKey || e.metaKey) document.getElementById('gio-load-image')?.click(); },
      dragover: e => { e.preventDefault(); this._displayCanvas.style.outline = '2px dashed #e94560'; },
      dragleave: () => { this._displayCanvas.style.outline = ''; },
      drop: e => {
        e.preventDefault();
        this._displayCanvas.style.outline = '';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) this._loadImageFile(file);
      },
      touchstart: this._onTouchStart.bind(this),
      touchmove: this._onTouchMove.bind(this),
      touchend: this._onTouchEnd.bind(this),
    };

    this._bindCanvasEvents(this._displayCanvas);

    document.addEventListener('paste', e => {
      if (!document.body.contains(this._displayCanvas)) return;
      const items = e.clipboardData?.items || [];
      for (const item of items) {
        if (item.type.startsWith('image/')) { this._loadImageFile(item.getAsFile()); break; }
      }
    });

    document.addEventListener('keydown', e => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); this._undo(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); this._redo(); }
      if (!e.ctrlKey && !e.metaKey) {
        if (e.key === 'b') this.setTool('brush');
        if (e.key === 'e') this.setTool('eraser');
        if (e.key === 'f') this.setTool('fill');
        if (e.key === 'i') this.setTool('eyedropper');
        if (e.key === 'x') this._swapColors();
        if (e.key === '[') this.setBrushSize(Math.max(1, this.brushSize - 5));
        if (e.key === ']') this.setBrushSize(Math.min(300, this.brushSize + 5));
      }
    });

    this._toolbar.querySelectorAll('[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => this.setTool(btn.dataset.tool));
    });

    document.getElementById('gio-color-picker')?.addEventListener('input', e => {
      this.color = e.target.value;
      document.getElementById('gio-primary-swatch').style.background = this.color;
    });
    document.getElementById('gio-color-picker-bg')?.addEventListener('input', e => {
      this.secondaryColor = e.target.value;
      document.getElementById('gio-secondary-swatch').style.background = this.secondaryColor;
    });
    document.getElementById('gio-swap-colors')?.addEventListener('click', () => this._swapColors());

    this._bindSlider('gio-brush-size', 'gio-brush-size-val', v => {
      this.brushSize = v;
    }, v => v + 'px');

    this._bindSlider('gio-brush-opacity', 'gio-brush-opacity-val', v => {
      this.opacity = v / 100;
    }, v => v + '%');

    this._bindSlider('gio-brush-hardness', 'gio-brush-hardness-val', v => {
      this.hardness = v / 100;
    }, v => v + '%');

    this._bindSlider('gio-brush-spacing', 'gio-brush-spacing-val', v => {
      this._brush.spacing = v / 100;
    }, v => v + '%');

    this._bindSlider('gio-brush-angle', 'gio-brush-angle-val', v => {
      this.brushAngle = (v * Math.PI) / 180;
    }, v => v + '°');

    document.getElementById('gio-load-brush')?.addEventListener('change', e => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      this._brush.loadBrushFromFile(files[0]).then(() => {
        document.querySelectorAll('.gio-brush-preset').forEach(el => el.classList.remove('active'));
      });
      e.target.value = '';
    });

    document.getElementById('gio-load-img-brush')?.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const img = new Image();
        img.onload = () => { this._brush.loadImageBrush(img); };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    });

    document.getElementById('gio-clear-img-brush')?.addEventListener('click', () => {
      this._brush.clearImageBrush();
    });

    document.getElementById('gio-load-image')?.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) this._loadImageFile(file);
      e.target.value = '';
    });

    document.getElementById('gio-paste-clipboard')?.addEventListener('click', async () => {
      try {
        const items = await navigator.clipboard.read();
        for (const item of items) {
          const type = item.types.find(t => t.startsWith('image/'));
          if (type) {
            const blob = await item.getType(type);
            this._loadImageFile(blob);
            break;
          }
        }
      } catch { }
    });

    document.getElementById('gio-export')?.addEventListener('click', () => {
      const a = document.createElement('a');
      a.download = 'painting.png';
      a.href = this.toDataURL();
      a.click();
    });

    document.getElementById('gio-undo')?.addEventListener('click', () => this._undo());
    document.getElementById('gio-redo')?.addEventListener('click', () => this._redo());
    document.getElementById('gio-clear')?.addEventListener('click', () => {
      this._saveHistory();
      const ctx = this._layerManager.activeCtx;
      ctx.clearRect(0, 0, this.width, this.height);
      this._composite();
    });

    document.getElementById('gio-add-layer')?.addEventListener('click', () => {
      this._layerManager.addLayer();
      this._renderLayerList();
    });
    document.getElementById('gio-del-layer')?.addEventListener('click', () => {
      this._layerManager.deleteLayer(this._layerManager.activeIndex);
      this._renderLayerList();
    });
    document.getElementById('gio-merge-down')?.addEventListener('click', () => {
      this._layerManager.mergeDown(this._layerManager.activeIndex);
      this._renderLayerList();
    });
    document.getElementById('gio-flatten')?.addEventListener('click', () => {
      this._layerManager.flattenAll();
      this._renderLayerList();
    });
  }

  _bindCanvasEvents(canvas) {
    const h = this._h;
    canvas.addEventListener('mousedown', h.mousedown);
    canvas.addEventListener('mousemove', h.mousemove);
    canvas.addEventListener('mouseup', h.mouseup);
    canvas.addEventListener('mouseleave', h.mouseleave);
    canvas.addEventListener('contextmenu', h.contextmenu);
    canvas.addEventListener('click', h.click);
    canvas.addEventListener('dragover', h.dragover);
    canvas.addEventListener('dragleave', h.dragleave);
    canvas.addEventListener('drop', h.drop);
    canvas.addEventListener('touchstart', h.touchstart, { passive: false });
    canvas.addEventListener('touchmove', h.touchmove, { passive: false });
    canvas.addEventListener('touchend', h.touchend);
  }

  _unbindCanvasEvents(canvas) {
    const h = this._h;
    canvas.removeEventListener('mousedown', h.mousedown);
    canvas.removeEventListener('mousemove', h.mousemove);
    canvas.removeEventListener('mouseup', h.mouseup);
    canvas.removeEventListener('mouseleave', h.mouseleave);
    canvas.removeEventListener('contextmenu', h.contextmenu);
    canvas.removeEventListener('click', h.click);
    canvas.removeEventListener('dragover', h.dragover);
    canvas.removeEventListener('dragleave', h.dragleave);
    canvas.removeEventListener('drop', h.drop);
    canvas.removeEventListener('touchstart', h.touchstart);
    canvas.removeEventListener('touchmove', h.touchmove);
    canvas.removeEventListener('touchend', h.touchend);
  }

  _bindSlider(id, valId, setter, fmt) {
    const slider = document.getElementById(id);
    const valEl = document.getElementById(valId);
    if (!slider) return;
    slider.addEventListener('input', e => {
      const v = parseFloat(e.target.value);
      setter(v);
      if (valEl) valEl.textContent = fmt(v);
    });
  }

  setRecalcularRect() {
    const canvas = this._displayCanvas;
    const rect = canvas.getBoundingClientRect();

    this._scaleX = rect.width > 0 ? canvas.width / rect.width : 1;
    this._scaleY = rect.height > 0 ? canvas.height / rect.height : 1;

    this._cachedRect = rect;
    return rect;
  }

  setRecalcularManualmente() {
    const rect = this.setRecalcularRect();
    return { rect, scaleX: this._scaleX, scaleY: this._scaleY };
  }

  setCanvasStyleSize(preserveContent = true) {
    const canvas = this._displayCanvas;
    const rect = canvas.getBoundingClientRect();

    const newW = Math.round(rect.width);
    const newH = Math.round(rect.height);

    if (newW <= 0 || newH <= 0) {
      console.warn('GioCanvasPaint.setCanvasStyleSize(): el canvas no es visible aún (rect inválido). Llamalo después de mostrarlo.');
      return { width: this.width, height: this.height, scaleX: this._scaleX, scaleY: this._scaleY };
    }

    if (newW === this.width && newH === this.height) {
      return { width: newW, height: newH, ...this.setRecalcularManualmente() };
    }

    if (preserveContent) {
      const snapshots = this._layerManager.layers.map(layer => {
        const off = document.createElement('canvas');
        off.width = layer.canvas.width;
        off.height = layer.canvas.height;
        off.getContext('2d').drawImage(layer.canvas, 0, 0);
        return { layer, off };
      });

      snapshots.forEach(({ layer, off }) => {
        layer.canvas.width = newW;
        layer.canvas.height = newH;
        layer.ctx.drawImage(off, 0, 0, off.width, off.height, 0, 0, newW, newH);
      });
    } else {
      this._layerManager.layers.forEach(layer => {
        layer.canvas.width = newW;
        layer.canvas.height = newH;
      });
    }

    canvas.width = newW;
    canvas.height = newH;

    this.width = newW;
    this.height = newH;
    this._layerManager.width = newW;
    this._layerManager.height = newH;

    this._scaleX = 1;
    this._scaleY = 1;
    this._cachedRect = canvas.getBoundingClientRect();

    this._composite();

    console.info(`GioCanvasPaint.setCanvasStyleSize(): ${newW}×${newH}px — scaleX/Y = 1.0`);
    return { width: newW, height: newH, scaleX: 1, scaleY: 1 };
  }

  debugRect() {
    const c = this._displayCanvas;
    const rect = c.getBoundingClientRect();
    console.group('GioCanvasPaint · debugRect()');
    console.log('canvas interno (px):   ', c.width, '×', c.height);
    console.log('canvas CSS (px):       ', rect.width.toFixed(1), '×', rect.height.toFixed(1));
    console.log('posición en pantalla:  ', 'top:', rect.top.toFixed(1), ' left:', rect.left.toFixed(1));
    console.log('scaleX (int/css):      ', (c.width / (rect.width || 1)).toFixed(4));
    console.log('scaleY (int/css):      ', (c.height / (rect.height || 1)).toFixed(4));
    console.log('rect cacheado válido:  ', this._isRectValid(this._cachedRect));
    if (!this._isRectValid(this._cachedRect)) {
      console.warn('⚠ El rect cacheado es inválido (canvas estaba oculto). Llamá setRecalcularManualmente() después de mostrarlo.');
    }
    if (Math.abs(rect.width - c.width) > 2) {
      console.warn('⚠ El canvas está escalado por CSS (max-width / max-height / transform).',
        `CSS: ${rect.width.toFixed(1)}px  vs  interno: ${c.width}px`);
    }
    console.groupEnd();
    return { rect, scaleX: this._scaleX, scaleY: this._scaleY };
  }

  _isRectValid(rect) {
    return rect && rect.width > 0 && rect.height > 0;
  }

  _getCanvasPos(e) {
    let rect = this._cachedRect;

    if (!this._isRectValid(rect)) {
      rect = this.setRecalcularRect();
    }

    const scaleX = this._scaleX || (this.width / (rect.width || this.width));
    const scaleY = this._scaleY || (this.height / (rect.height || this.height));

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  _initResizeObserver(canvas) {
    if (this._resizeObserver) { this._resizeObserver.disconnect(); this._resizeObserver = null; }
    if (this._intersectionObserver) { this._intersectionObserver.disconnect(); this._intersectionObserver = null; }
    this._cachedRect = null;

    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => {
        this.setRecalcularRect();
        this._cursorOverlay && (this._cursorOverlay.style.display = 'none');
      });
      this._resizeObserver.observe(canvas);
    }

    if (typeof IntersectionObserver !== 'undefined') {
      this._intersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              this.setRecalcularRect();
              this._cursorOverlay && (this._cursorOverlay.style.display = 'none');
            });
          } else {
            this._cachedRect = null;
          }
        }
      }, { threshold: 0 });
      this._intersectionObserver.observe(canvas);
    }
  }

  _onMouseDown(e) {
    if (e.ctrlKey || e.metaKey) return;
    const pos = this._getCanvasPos(e);
    const isRight = e.button === 2;

    if (this.tool === 'eyedropper') {
      this._pickColor(pos.x, pos.y, isRight);
      return;
    }
    if (this.tool === 'fill') {
      this._saveHistory();
      this._floodFill(pos.x, pos.y, isRight ? this.secondaryColor : this.color);
      this._composite();
      return;
    }

    this._painting = true;
    this._saveHistory();
    this._brush.beginStroke(pos.x, pos.y);

    const ctx = this._layerManager.activeCtx;
    ctx.save();
    if (this.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    }
    this._brush.stamp(ctx, pos.x, pos.y, this.brushSize,
      isRight ? this.secondaryColor : this.color, this.opacity, this.hardness, this.brushAngle);
    ctx.restore();
    this._composite();
  }

  _onMouseMove(e) {
    const pos = this._getCanvasPos(e);

    const rect = this._cachedRect || this._displayCanvas.getBoundingClientRect();
    const cssW = rect.width || this.width;
    const scaleX = cssW / this.width;
    const co = this._cursorOverlay;
    const displaySize = this.brushSize * scaleX;
    co.style.display = 'block';
    co.style.left = (e.clientX - rect.left) + 'px';
    co.style.top = (e.clientY - rect.top) + 'px';
    co.style.width = displaySize + 'px';
    co.style.height = displaySize + 'px';

    if (!this._painting) return;
    const isRight = e.buttons === 2;
    const ctx = this._layerManager.activeCtx;
    ctx.save();
    if (this.tool === 'eraser') ctx.globalCompositeOperation = 'destination-out';
    this._brush.stroke(ctx, pos.x, pos.y, this.brushSize,
      isRight ? this.secondaryColor : this.color, this.opacity, this.hardness, this.brushAngle);
    ctx.restore();
    this._composite();
  }

  _onMouseUp() { this._painting = false; this._brush.endStroke(); this._renderLayerList(); }
  _onMouseLeave() {
    this._painting = false; this._brush.endStroke();
    this._cursorOverlay.style.display = 'none';
  }

  _onRightClick(e) {
    const pos = this._getCanvasPos(e);
    if (this.tool === 'eyedropper') this._pickColor(pos.x, pos.y, true);
  }

  _onTouchStart(e) {
    e.preventDefault();
    const t = e.touches[0];
    this._onMouseDown({ clientX: t.clientX, clientY: t.clientY, button: 0, ctrlKey: false, buttons: 1 });
  }
  _onTouchMove(e) {
    e.preventDefault();
    const t = e.touches[0];
    this._onMouseMove({ clientX: t.clientX, clientY: t.clientY, buttons: 1 });
  }
  _onTouchEnd(e) { this._onMouseUp(); }

  _pickColor(x, y, secondary = false) {
    const off = document.createElement('canvas');
    off.width = this.width;
    off.height = this.height;
    this._layerManager.composite(off.getContext('2d'));
    const pixel = off.getContext('2d').getImageData(Math.round(x), Math.round(y), 1, 1).data;
    const hex = '#' + [pixel[0], pixel[1], pixel[2]]
      .map(v => v.toString(16).padStart(2, '0')).join('');
    if (secondary) {
      this.secondaryColor = hex;
      document.getElementById('gio-secondary-swatch').style.background = hex;
      if (this._uiColorPickerBg) this._uiColorPickerBg.value = hex;
    } else {
      this.color = hex;
      document.getElementById('gio-primary-swatch').style.background = hex;
      if (this._uiColorPicker) this._uiColorPicker.value = hex;
    }
  }

  _floodFill(startX, startY, fillColor) {
    const ctx = this._layerManager.activeCtx;
    const imageData = ctx.getImageData(0, 0, this.width, this.height);
    const data = imageData.data;
    const w = this.width;
    const h = this.height;
    const sx = Math.round(startX);
    const sy = Math.round(startY);

    const idx = (x, y) => (y * w + x) * 4;
    const targetIdx = idx(sx, sy);
    const tR = data[targetIdx];
    const tG = data[targetIdx + 1];
    const tB = data[targetIdx + 2];
    const tA = data[targetIdx + 3];

    const tmp = document.createElement('canvas').getContext('2d');
    tmp.canvas.width = tmp.canvas.height = 1;
    tmp.fillStyle = fillColor;
    tmp.fillRect(0, 0, 1, 1);
    const fc = tmp.getImageData(0, 0, 1, 1).data;

    if (tR === fc[0] && tG === fc[1] && tB === fc[2] && tA === fc[3]) return;

    const tolerance = 30;
    const matches = (x, y) => {
      if (x < 0 || x >= w || y < 0 || y >= h) return false;
      const i = idx(x, y);
      return Math.abs(data[i] - tR) <= tolerance &&
        Math.abs(data[i + 1] - tG) <= tolerance &&
        Math.abs(data[i + 2] - tB) <= tolerance &&
        Math.abs(data[i + 3] - tA) <= tolerance;
    };

    const stack = [[sx, sy]];
    const visited = new Uint8Array(w * h);

    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      const vi = y * w + x;
      if (visited[vi] || !matches(x, y)) continue;
      visited[vi] = 1;
      const i = idx(x, y);
      data[i] = fc[0];
      data[i + 1] = fc[1];
      data[i + 2] = fc[2];
      data[i + 3] = Math.round(this.opacity * 255);
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  }

  _composite() {
    this._layerManager.composite(this._targetCtx);
    if (this._targetCanvas !== this._displayCanvas) {
      this._layerManager.composite(this._displayCanvas.getContext('2d'));
    }
  }

  _saveHistory() {
    const snapshot = this._layerManager.layers.map(l => ({
      id: l.id,
      data: l.ctx.getImageData(0, 0, this.width, this.height),
    }));
    this._history = this._history.slice(0, this._historyIndex + 1);
    this._history.push(snapshot);
    if (this._history.length > this._maxHistory) this._history.shift();
    else this._historyIndex++;
  }

  _undo() {
    if (this._historyIndex <= 0) return;
    this._historyIndex--;
    this._restoreHistory(this._history[this._historyIndex]);
  }

  _redo() {
    if (this._historyIndex >= this._history.length - 1) return;
    this._historyIndex++;
    this._restoreHistory(this._history[this._historyIndex]);
  }

  _restoreHistory(snapshot) {
    snapshot.forEach(s => {
      const layer = this._layerManager.layers.find(l => l.id === s.id);
      if (layer) layer.ctx.putImageData(s.data, 0, 0);
    });
    this._composite();
    this._renderLayerList();
  }

  _swapColors() {
    [this.color, this.secondaryColor] = [this.secondaryColor, this.color];
    document.getElementById('gio-primary-swatch').style.background = this.color;
    document.getElementById('gio-secondary-swatch').style.background = this.secondaryColor;
    if (this._uiColorPicker) this._uiColorPicker.value = this.color;
    if (this._uiColorPickerBg) this._uiColorPickerBg.value = this.secondaryColor;
  }

  _loadImageFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        this._saveHistory();
        const ctx = this._layerManager.activeCtx;
        const scale = Math.min(this.width / img.width, this.height / img.height, 1);
        const dw = img.width * scale;
        const dh = img.height * scale;
        const dx = (this.width - dw) / 2;
        const dy = (this.height - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
        this._composite();
        this._renderLayerList();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  _updateToolUI() {
    this._toolbar.querySelectorAll('[data-tool]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tool === this.tool);
    });
    const cursors = {
      brush: 'crosshair', eraser: 'cell',
      fill: 'copy', eyedropper: 'zoom-in',
    };
    this._displayCanvas.style.cursor = cursors[this.tool] || 'crosshair';
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GioCanvasPaint, GioLayerManager, GioBrushEngine };
} else {
  window.GioCanvasPaint = GioCanvasPaint;
  window.GioLayerManager = GioLayerManager;
  window.GioBrushEngine = GioBrushEngine;
}