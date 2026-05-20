/**
 * GioCanvasPaint - Professional Canvas Paint Engine
 * A GIMP/Photoshop-inspired canvas painting library
 *
 * Usage:
 *   const paint = new GioCanvasPaint(canvasElement);
 *   paint.setCanvas(otherCanvasElement); // redirect drawing to another canvas
 *
 * Features:
 *   - Brush engine with grayscale brush loading (like GIMP/Photoshop)
 *   - Color picker, eyedropper, eraser, fill bucket
 *   - Image loading: Ctrl+Click (file dialog), drag & drop, clipboard paste
 *   - Image brush (paint using pixels of a loaded image)
 *   - Layer manager: add, delete, toggle, merge layers
 */

/* ─────────────────────────────────────────────
   GioLayerManager — manages multiple canvas layers
   ───────────────────────────────────────────── */
class GioLayerManager {
  /**
   * @param {HTMLElement} container  – DOM node that will hold layer canvases
   * @param {number}      width
   * @param {number}      height
   * @param {Function}    onUpdate   – called whenever layers change
   */
  constructor(container, width, height, onUpdate) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.onUpdate = onUpdate || (() => {});
    this.layers = [];       // [{ id, name, canvas, ctx, visible, opacity, blendMode }]
    this.activeIndex = 0;
    this._idCounter = 0;

    // Add default layer silently (no onUpdate during construction)
    this._addLayerSilent('Background');
  }

  /* ── Internal helpers ── */

  /** Add a layer without calling onUpdate (safe to use in constructor) */
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
    c.width  = this.width;
    c.height = this.height;
    // Canvas elements start transparent by default (alpha=0).
    // We do NOT fill with any color — layers are fully transparent until painted.
    return c;
  }

  _nextId() { return ++this._idCounter; }

  /* ── Public API ── */

  /** Add a new transparent layer on top */
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

  /** Delete layer at index */
  deleteLayer(index) {
    if (this.layers.length <= 1) return; // keep at least one
    this.layers.splice(index, 1);
    this.activeIndex = Math.min(this.activeIndex, this.layers.length - 1);
    this.onUpdate();
  }

  /** Toggle visibility */
  toggleVisibility(index) {
    if (this.layers[index]) {
      this.layers[index].visible = !this.layers[index].visible;
      this.onUpdate();
    }
  }

  /** Set opacity [0..1] */
  setOpacity(index, opacity) {
    if (this.layers[index]) {
      this.layers[index].opacity = Math.max(0, Math.min(1, opacity));
      this.onUpdate();
    }
  }

  /** Merge layer at index down into index-1 */
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

  /** Flatten all layers into the bottom layer */
  flattenAll() {
    for (let i = this.layers.length - 1; i >= 1; i--) {
      this.mergeDown(i);
    }
  }

  /** Move layer up */
  moveUp(index) {
    if (index >= this.layers.length - 1) return;
    [this.layers[index], this.layers[index + 1]] =
      [this.layers[index + 1], this.layers[index]];
    this.activeIndex = index + 1;
    this.onUpdate();
  }

  /** Move layer down */
  moveDown(index) {
    if (index <= 0) return;
    [this.layers[index], this.layers[index - 1]] =
      [this.layers[index - 1], this.layers[index]];
    this.activeIndex = index - 1;
    this.onUpdate();
  }

  /** Return the active layer's ctx */
  get activeCtx() {
    return this.layers[this.activeIndex]?.ctx || null;
  }

  /** Return the active layer's canvas */
  get activeCanvas() {
    return this.layers[this.activeIndex]?.canvas || null;
  }

  /** Resize all layers */
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

  /**
   * Composite all visible layers onto a destination ctx
   * @param {CanvasRenderingContext2D} destCtx
   */
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


/* ─────────────────────────────────────────────
   GioBrushEngine — grayscale brush stamp engine
   ───────────────────────────────────────────── */
class GioBrushEngine {
  constructor() {
    this.brushCanvas = null;   // the loaded grayscale brush canvas
    this.brushCtx = null;
    this.spacing = 0.25;       // fraction of brush size
    this._lastPos = null;
    this._distBuffer = 0;
    this.useImageBrush = false;
    this.imageBrushCanvas = null;
  }

  /** Load a grayscale PNG as brush tip */
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

  /** Load an image as the color source for the brush (image brush) */
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

  /**
   * Stamp the brush at canvas coords (x,y)
   * @param {CanvasRenderingContext2D} ctx   – destination layer ctx
   * @param {number} x
   * @param {number} y
   * @param {number} size     – brush diameter in px
   * @param {string} color    – CSS color (used when no brush image)
   * @param {number} opacity  – [0..1]
   * @param {number} hardness – [0..1]  (0=feathered, 1=hard)
   * @param {number} angle    – rotation in radians
   */
  stamp(ctx, x, y, size, color, opacity, hardness, angle = 0) {
    const r = size / 2;
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(x, y);
    if (angle) ctx.rotate(angle);

    if (this.brushCanvas && !this.useImageBrush) {
      // --- Grayscale brush tip: use the grayscale value as alpha mask ---
      const bw = this.brushCanvas.width;
      const bh = this.brushCanvas.height;
      const off = document.createElement('canvas');
      off.width = bw;
      off.height = bh;
      const offCtx = off.getContext('2d');

      // Fill with the paint color
      offCtx.fillStyle = color;
      offCtx.fillRect(0, 0, bw, bh);
      offCtx.globalCompositeOperation = 'destination-in';

      // Use the grayscale brush as alpha
      offCtx.drawImage(this.brushCanvas, 0, 0);
      offCtx.restore && offCtx.restore();

      ctx.drawImage(off, -size / 2, -size / 2, size, size);

    } else if (this.useImageBrush && this.imageBrushCanvas) {
      // --- Image brush: sample colors from source image at stamp point ---
      ctx.drawImage(this.imageBrushCanvas, -r, -r, size, size);

    } else {
      // --- Soft/hard round brush (default) ---
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

  /** Begin a new stroke */
  beginStroke(x, y) {
    this._lastPos = { x, y };
    this._distBuffer = 0;
  }

  /**
   * Interpolate stamps along the stroke path (respects spacing)
   */
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


/* ─────────────────────────────────────────────
   GioCanvasPaint — main painting class
   ───────────────────────────────────────────── */
class GioCanvasPaint {
  /**
   * @param {HTMLCanvasElement|string} canvasOrId
   */
  constructor(canvasOrId) {
    // Resolve canvas reference
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

    // The "target" canvas (can be swapped via setCanvas)
    this._targetCanvas = this._displayCanvas;
    this._targetCtx = this._targetCanvas.getContext('2d');

    this.width  = this._targetCanvas.width;
    this.height = this._targetCanvas.height;

    // Coordinate mapping cache — invalidated by ResizeObserver / IntersectionObserver
    this._cachedRect           = null;
    this._scaleX               = 1;   // canvas.width  / rect.width  (CSS scale)
    this._scaleY               = 1;   // canvas.height / rect.height (CSS scale)
    this._resizeObserver       = null;
    this._intersectionObserver = null;
    // Observers are attached after _buildUI (DOM must exist first)

    // Tool state
    this.tool = 'brush'; // brush | eraser | fill | eyedropper
    this.color = '#000000';
    this.secondaryColor = '#ffffff';
    this.brushSize = 20;
    this.opacity = 1;
    this.hardness = 0.8;
    this.brushAngle = 0;
    this.brushSpacing = 0.25;

    // Brush engine
    this._brush = new GioBrushEngine();
    this._brush.spacing = this.brushSpacing;

    // Layer manager — the onUpdate callback is guarded so _composite is only
    // called after _layerManager is fully assigned (avoids circular init error).
    this._layerContainer = document.createElement('div');
    this._layerManager = null;
    this._layerManager = new GioLayerManager(
      this._layerContainer,
      this.width,
      this.height,
      () => { if (this._layerManager && this._targetCtx) this._composite(); }
    );

    // ── Captura el contenido previo del canvas en la capa base ──
    // Si el canvas ya tenía algo dibujado (imagen, dibujo previo, etc.)
    // lo copiamos a la capa "Background" para que sea visible y no se pierda.
    // La capa actúa como fondo de referencia; las capas nuevas van encima en alpha 0.
    const existingImageData = this._targetCtx.getImageData(0, 0, this.width, this.height);
    const hasContent = existingImageData.data.some(v => v !== 0);
    if (hasContent) {
      this._layerManager.layers[0].ctx.putImageData(existingImageData, 0, 0);
      this._layerManager.layers[0].name = 'Background (original)';
    }

    // Interaction state
    this._painting = false;
    this._eyedropperCB = null;

    // History (undo/redo per layer)
    this._history = [];
    this._historyIndex = -1;
    this._maxHistory = 30;

    this._buildUI();
    this._bindEvents();
    this._initResizeObserver(this._displayCanvas); // must be after DOM is ready
    this._composite(); // initial render
  }

  /* ══════════════════════════════════════════════════════════════
     PUBLIC API
     ══════════════════════════════════════════════════════════════ */

  /**
   * Redirect all drawing to a different canvas element.
   * The layer system paints onto its internal offscreen canvases,
   * then composites the result into this target canvas.
   */
  /**
   * Redirige el output compuesto hacia otro canvas.
   *
   * _displayCanvas  → canvas original: recibe eventos de mouse, tiene la UI,
   *                   NUNCA cambia después de la construcción.
   * _targetCanvas   → canvas destino: recibe los pixels del composite.
   *                   Puede cambiar en cualquier momento con setCanvas().
   *
   * @param {HTMLCanvasElement} htmlCanvas  canvas destino del output
   */
  setCanvas(htmlCanvas) {
    if (!(htmlCanvas instanceof HTMLCanvasElement)) {
      throw new Error('setCanvas: expected an HTMLCanvasElement');
    }

    // Solo cambia el destino del output — _displayCanvas NUNCA se toca aquí
    this._targetCanvas = htmlCanvas;
    this._targetCtx    = htmlCanvas.getContext('2d');

    // Sincronizar dimensiones del canvas destino con las del proyecto
    htmlCanvas.width  = this.width;
    htmlCanvas.height = this.height;

    // El rect a recalcular siempre es el del _displayCanvas (donde está el mouse)
    // No hay nada que re-observar: los observers ya están sobre _displayCanvas
    this._cachedRect = null;
    this.setRecalcularRect();

    this._composite();
  }

  /** Programmatically set the active tool */
  setTool(name) {
    this.tool = name;
    this._updateToolUI();
  }

  /** Set primary color */
  setColor(cssColor) {
    this.color = cssColor;
    if (this._uiColorPicker) this._uiColorPicker.value = cssColor;
  }

  /** Set brush size */
  setBrushSize(px) {
    this.brushSize = px;
    if (this._uiBrushSize) this._uiBrushSize.value = px;
  }

  /** Load image onto the active layer */
  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const imgW = img.naturalWidth  || img.width;
        const imgH = img.naturalHeight || img.height;

        // Redimensionar el proyecto a la resolución nativa
        if (imgW > this.width || imgH > this.height) {
          this._resizeProject(imgW, imgH);
        }

        const ctx = this._layerManager.activeCtx;
        const dx  = Math.round((this.width  - imgW) / 2);
        const dy  = Math.round((this.height - imgH) / 2);
        ctx.drawImage(img, dx, dy, imgW, imgH);
        this._composite();
        resolve({ width: imgW, height: imgH });
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * Carga una imagen desde una URL y la pone en una NUEVA capa encima de las existentes.
   *
   * La imagen se escala para llenar el canvas manteniendo proporciones (object-fit: contain).
   * La nueva capa queda activa para poder pintar sobre ella inmediatamente.
   *
   * @param {string}  url         URL de la imagen (debe tener CORS habilitado)
   * @param {string}  [nombre]    Nombre de la capa (default: el filename de la URL)
   * @param {boolean} [fit=true]  true=contain (no deforma), false=stretch (llena todo)
   * @returns {Promise<{ layer, width, height }>}
   */
  setUrlCreaCapa(url, nombre, fit = true) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const layerName = nombre || url.split('/').pop().split('?')[0] || 'URL Layer';

        const imgW = img.naturalWidth  || img.width;
        const imgH = img.naturalHeight || img.height;

        // Redimensionar el proyecto a la resolución nativa si la imagen es mayor
        if (imgW > this.width || imgH > this.height) {
          this._resizeProject(imgW, imgH);
        }

        const layer = this._layerManager.addLayer(layerName);

        if (fit) {
          // contain: escalar manteniendo proporción, centrar en el canvas
          const scale = Math.min(this.width / imgW, this.height / imgH, 1);
          const dw = Math.round(imgW * scale);
          const dh = Math.round(imgH * scale);
          const dx = Math.round((this.width  - dw) / 2);
          const dy = Math.round((this.height - dh) / 2);
          layer.ctx.drawImage(img, dx, dy, dw, dh);
        } else {
          // 1:1 píxeles, centrado
          const dx = Math.round((this.width  - imgW) / 2);
          const dy = Math.round((this.height - imgH) / 2);
          layer.ctx.drawImage(img, dx, dy, imgW, imgH);
        }

        this._composite();
        this._renderLayerList();
        this._saveHistory();
        resolve({ layer, width: imgW, height: imgH });
      };

      img.onerror = () => reject(new Error(`setUrlCreaCapa: no se pudo cargar "${url}"`));
      img.src = url;
    });
  }

  /**
   * Crea una nueva capa a partir de un ImageData existente.
   *
   * Útil para recibir datos de otro contexto 2D:
   *   paint.setImagenData(otroCanvas.getContext('2d').getImageData(0, 0, w, h))
   *   paint.setImagenData(otroCtx.getImageData(0, 0, w, h), 'Mi capa')
   *
   * Si el ImageData tiene distinto tamaño al canvas, se escala automáticamente.
   *
   * @param {ImageData} imageData  datos de píxeles
   * @param {string}    [nombre]   nombre de la nueva capa
   * @returns {{ layer, imageData }}
   */
  setImagenData(imageData, nombre = 'ImageData Layer') {
    if (!(imageData instanceof ImageData)) {
      throw new TypeError('setImagenData: el primer argumento debe ser un ImageData');
    }

    const imgW = imageData.width;
    const imgH = imageData.height;

    // Redimensionar el proyecto si el ImageData es mayor al canvas actual
    if (imgW > this.width || imgH > this.height) {
      this._resizeProject(imgW, imgH);
    }

    const layer = this._layerManager.addLayer(nombre);

    if (imgW === this.width && imgH === this.height) {
      // Mismo tamaño → put directo, sin ninguna interpolación
      layer.ctx.putImageData(imageData, 0, 0);
    } else {
      // Tamaño distinto → centrar a 1:1 si cabe, o escalar si es menor
      const dx = Math.round((this.width  - imgW) / 2);
      const dy = Math.round((this.height - imgH) / 2);
      layer.ctx.putImageData(imageData, dx, dy);
    }

    this._composite();
    this._renderLayerList();
    this._saveHistory();

    return { layer, imageData };
  }

  /**
   * Separa la imagen de la capa activa (o de un ImageData dado) en 4 canales RGBA,
   * creando una nueva capa por canal en escala de grises:
   *
   *   Capa "Canal R" → solo rojos  → gris donde había rojo
   *   Capa "Canal G" → solo verdes → gris donde había verde
   *   Capa "Canal B" → solo azules → gris donde había azul
   *   Capa "Canal A" → solo alpha  → gris donde había opacidad
   *
   * Cada capa es independiente y puede ocultarse, mezclarse o exportarse.
   *
   * @param {ImageData} [sourceImageData]  si se omite, usa la capa activa actual
   * @returns {{ R: layer, G: layer, B: layer, A: layer }}
   */
  /**
   * Separa la imagen de la capa activa (o de un ImageData dado) en 4 canales RGBA,
   * creando una nueva capa por canal. Cada canal se muestra en su color real
   * (rojo, verde, azul, gris) para facilitar la identificación de mapas PBR.
   *
   * Uso para texturas PBR ORM (Occlusion/Roughness/Metallic):
   *   const { R, G, B, A } = paint.separateChannels();
   *   // R → AO (occlusion)     → capa roja
   *   // G → Roughness          → capa verde
   *   // B → Metallic           → capa azul
   *   // A → Alpha              → capa gris
   *
   * Cada capa guarda su canal de origen en layer._channel ('R'|'G'|'B'|'A')
   * para que combineChannels() pueda reconstruir la imagen correctamente.
   *
   * Las capas se crean VISIBLES y en su tinte de color para poder verlas
   * y editarlas individualmente. Podés ocultarlas desde el panel de capas.
   *
   * @param {ImageData} [sourceImageData]  si se omite, usa la capa activa
   * @param {object}    [labels]           nombres custom para cada canal
   *   labels = { R: 'AO', G: 'Roughness', B: 'Metallic', A: 'Alpha' }
   * @returns {{ R: layer, G: layer, B: layer, A: layer }}
   */
  separateChannels(sourceImageData, labels = {}) {
    // ── Fuente de píxeles ──
    let src;
    if (sourceImageData instanceof ImageData) {
      src = sourceImageData;
    } else {
      src = this._layerManager.activeCtx.getImageData(0, 0, this.width, this.height);
    }

    const w      = this.width;
    const h      = this.height;
    const pixels = src.data;

    const nameR = labels.R || 'Canal R';
    const nameG = labels.G || 'Canal G';
    const nameB = labels.B || 'Canal B';
    const nameA = labels.A || 'Canal A';

    // ── Crear ImageData para cada canal ──
    const rData = new ImageData(w, h);
    const gData = new ImageData(w, h);
    const bData = new ImageData(w, h);
    const aData = new ImageData(w, h);

    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      // Canal R → tinte rojo (R=valor, G=0, B=0) con alpha original
      rData.data[i]     = r;
      rData.data[i + 1] = 0;
      rData.data[i + 2] = 0;
      rData.data[i + 3] = 255;

      // Canal G → tinte verde (R=0, G=valor, B=0) con alpha original
      gData.data[i]     = 0;
      gData.data[i + 1] = g;
      gData.data[i + 2] = 0;
      gData.data[i + 3] = 255;

      // Canal B → tinte azul (R=0, G=0, B=valor) con alpha original
      bData.data[i]     = 0;
      bData.data[i + 1] = 0;
      bData.data[i + 2] = b;
      bData.data[i + 3] = 255;

      // Canal A → escala de grises del alpha (siempre opaco para poder verlo)
      aData.data[i]     = a;
      aData.data[i + 1] = a;
      aData.data[i + 2] = a;
      aData.data[i + 3] = 255;
    }

    // ── Crear capas ──
    const layerR = this._layerManager.addLayer(nameR);
    layerR.ctx.putImageData(rData, 0, 0);
    layerR._channel     = 'R';
    layerR._channelSrc  = src; // referencia a la fuente original para combineChannels
    layerR.visible      = true;

    const layerG = this._layerManager.addLayer(nameG);
    layerG.ctx.putImageData(gData, 0, 0);
    layerG._channel    = 'G';
    layerG._channelSrc = src;
    layerG.visible     = true;

    const layerB = this._layerManager.addLayer(nameB);
    layerB.ctx.putImageData(bData, 0, 0);
    layerB._channel    = 'B';
    layerB._channelSrc = src;
    layerB.visible     = true;

    const layerA = this._layerManager.addLayer(nameA);
    layerA.ctx.putImageData(aData, 0, 0);
    layerA._channel    = 'A';
    layerA._channelSrc = src;
    layerA.visible     = true;

    this._composite();
    this._renderLayerList();
    this._saveHistory();

    return { R: layerR, G: layerG, B: layerB, A: layerA };
  }

  /**
   * Recombina capas o ImageDatas en una nueva capa RGBA compuesta.
   *
   * Indicás qué capa (o ImageData) irá a cada canal del resultado.
   * Ideal para reconstruir una textura PBR después de editar los canales por separado.
   *
   * Uso básico — usar las capas devueltas por separateChannels():
   *   const { R, G, B, A } = paint.separateChannels();
   *   // ... editar capas ...
   *   paint.combineChannels({ R, G, B, A });
   *
   * Uso avanzado — reasignar canales entre capas distintas:
   *   paint.combineChannels({
   *     R: capaAO,          // AO  → canal rojo
   *     G: capaRoughness,   // Roughness → canal verde
   *     B: capaMetallic,    // Metallic  → canal azul
   *     A: null,            // Alpha → 255 (opaco) si se pasa null
   *   }, 'ORM_combined');
   *
   * Fuentes aceptadas por canal: layer (objeto capa), ImageData, o null (255).
   *
   * Qué canal se lee de cada fuente:
   *   - Si la fuente es una capa con _channel definido (de separateChannels),
   *     se usa ese canal original (R de rData, G de gData, etc.) para precisión.
   *   - Si es una capa genérica, se lee el canal R del ImageData (luminancia).
   *   - Si es un ImageData directamente, se lee el canal R.
   *   - Si es null, el canal queda en 255.
   *
   * @param {{ R, G, B, A }} sources  fuentes para cada canal (layer | ImageData | null)
   * @param {string} [nombre]         nombre de la capa resultante
   * @returns {{ layer, imageData }}
   */
  combineChannels({ R = null, G = null, B = null, A = null } = {}, nombre = 'Combined') {
    const w = this.width;
    const h = this.height;

    // ── Helper: extraer el valor escalar de un canal a un Uint8Array ──
    const extractChannel = (source, channel) => {
      if (!source) return null; // null → usará 255

      let imageData;

      if (source instanceof ImageData) {
        imageData = source;
      } else if (source && source.canvas) {
        // Es una capa del layer manager
        if (source._channelSrc instanceof ImageData) {
          // Tiene fuente original de separateChannels → leer con precisión total
          imageData = source._channelSrc;
        } else {
          imageData = source.ctx.getImageData(0, 0, w, h);
        }
      } else {
        return null;
      }

      // Escalar si el ImageData tiene distinto tamaño
      let data = imageData.data;
      if (imageData.width !== w || imageData.height !== h) {
        const off = document.createElement('canvas');
        off.width = w; off.height = h;
        const tmpOff = document.createElement('canvas');
        tmpOff.width = imageData.width; tmpOff.height = imageData.height;
        tmpOff.getContext('2d').putImageData(imageData, 0, 0);
        off.getContext('2d').drawImage(tmpOff, 0, 0, w, h);
        data = off.getContext('2d').getImageData(0, 0, w, h).data;
      }

      // Qué índice dentro del grupo RGBA leer
      const idx = { R: 0, G: 1, B: 2, A: 3 }[channel] ?? 0;

      // Si la capa viene de separateChannels, sabemos qué canal es canónico
      const srcChannel = (source._channel) ? { R: 0, G: 1, B: 2, A: 3 }[source._channel] : idx;

      const out = new Uint8Array(w * h);
      for (let i = 0, j = 0; i < data.length; i += 4, j++) {
        out[j] = data[i + srcChannel];
      }
      return out;
    };

    const rVals = extractChannel(R, 'R');
    const gVals = extractChannel(G, 'G');
    const bVals = extractChannel(B, 'B');
    const aVals = extractChannel(A, 'A');

    // ── Construir el ImageData combinado ──
    const result = new ImageData(w, h);
    const d      = result.data;

    for (let i = 0, j = 0; i < d.length; i += 4, j++) {
      d[i]     = rVals ? rVals[j] : 255;
      d[i + 1] = gVals ? gVals[j] : 255;
      d[i + 2] = bVals ? bVals[j] : 255;
      d[i + 3] = aVals ? aVals[j] : 255;
    }

    // ── Crear capa con el resultado ──
    const layer = this._layerManager.addLayer(nombre);
    layer.ctx.putImageData(result, 0, 0);
    layer._isCombined = true;

    this._composite();
    this._renderLayerList();
    this._saveHistory();

    console.info(`GioCanvasPaint.combineChannels(): capa "${nombre}" creada.`,
      `R←${R?._channel||'null'} G←${G?._channel||'null'} B←${B?._channel||'null'} A←${A?._channel||'null'}`);

    return { layer, imageData: result };
  }

  /** Get flat composite as data URL */
  toDataURL(type = 'image/png') {
    const off = document.createElement('canvas');
    off.width = this.width;
    off.height = this.height;
    this._layerManager.composite(off.getContext('2d'));
    return off.toDataURL(type);
  }

  /* ══════════════════════════════════════════════════════════════
     UI BUILDING
     ══════════════════════════════════════════════════════════════ */

  _buildUI() {
    // Find or create a wrapper around the canvas
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

    // ── Toolbar (left side) ──
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

        /* Right panel */
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

        /* Layer panel */
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

        /* Brush presets */
        .gio-brush-presets {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-bottom: 6px;
        }
               .postcl2005{
        position: relative;
    
          }
            .clbt200520262{
           cursor: pointer;
            border-radius: 12px; 
    width: 35px;
    height: 35px;
    background-color: #000;
    color:#1a68dd;
    font-size: 10px;
    display:  flex;
    align-items: center;
    justify-content: center;
  
    
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

        /* Cursor indicator */
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

        /* Scrollbar */
        .gio-layer-list::-webkit-scrollbar { width: 4px; }
        .gio-layer-list::-webkit-scrollbar-track { background: var(--gio-bg); }
        .gio-layer-list::-webkit-scrollbar-thumb { background: var(--gio-border); border-radius: 2px; }
      </style>

      <!-- TOOLS -->
      <div class="gio-tool-btn active" data-tool="brush" data-tip="Brush (B)" title="Brush (B)">🖌️</div>
      <div class="gio-tool-btn" data-tool="eraser" title="Eraser (E)">🧹</div>
      <div class="gio-tool-btn" data-tool="fill" title="Fill Bucket (F)">🪣</div>
      <div class="gio-tool-btn" data-tool="eyedropper" title="Eyedropper (I)">💉</div>

      <div class="gio-separator"></div>

      <!-- Primary Color -->
      <div class="gio-color-swatch" id="gio-primary-swatch" title="Primary Color" style="background:#000">
        <input type="color" id="gio-color-picker" value="#000000">
      </div>
      <div class="gio-label">FG</div>

      <!-- Secondary Color -->
      <div class="gio-color-swatch" id="gio-secondary-swatch" title="Secondary Color (right-click)" style="background:#fff">
        <input type="color" id="gio-color-picker-bg" value="#ffffff">
      </div>
      <div class="gio-label">BG</div>

      <div class="gio-separator"></div>

      <!-- Swap colors -->
      <div class="gio-tool-btn" id="gio-swap-colors" title="Swap colors (X)">⇄</div>
    `;

    // ── Right panel ──
    const panelRight = document.createElement('div');
    panelRight.className = 'gio-panel-right';
    panelRight.innerHTML = `
      <!-- BRUSH OPTIONS -->
      <div class="gio-section">
          <div class="clbt200520262 postcl2005" id="botoneditcurvas"></div>
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

      <!-- BRUSH PRESETS -->
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

      <!-- IMAGE LOAD -->
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

      <!-- HISTORY -->
      <div class="gio-section">
        <div class="gio-section-title">History</div>
        <div class="gio-row" style="gap:4px">
          <button class="gio-btn" id="gio-undo">↩ Undo</button>
          <button class="gio-btn" id="gio-redo">↪ Redo</button>
          <button class="gio-btn danger" id="gio-clear">🗑 Clear</button>
        </div>
      </div>

      <!-- LAYERS -->
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

    // Cursor overlay on display canvas
    this._cursorOverlay = document.createElement('div');
    this._cursorOverlay.className = 'gio-cursor-overlay';
    this._displayCanvas.parentElement
      ? this._displayCanvas.parentElement.appendChild(this._cursorOverlay)
      : document.body.appendChild(this._cursorOverlay);
    this._displayCanvas.style.position = 'relative';
    this._displayCanvas.style.cursor = 'crosshair';

    // Insert panels into parent
    const canvasParent = this._displayCanvas.parentElement || document.body;
    canvasParent.insertBefore(toolbar, this._displayCanvas);
    canvasParent.appendChild(panelRight);
    if (this._cursorOverlay.parentElement !== canvasParent) {
      canvasParent.appendChild(this._cursorOverlay);
    }

    // Store refs
    this._toolbar = toolbar;
    this._panelRight = panelRight;
    this._uiColorPicker = document.getElementById('gio-color-picker');
    this._uiColorPickerBg = document.getElementById('gio-color-picker-bg');
    this._uiBrushSize = document.getElementById('gio-brush-size');
     this._editorcurvasBT= document.getElementById('botoneditcurvas'); 

    this._buildBuiltinBrushPresets();
    this._renderLayerList();
  }

  /* ── Built-in brush presets ── */
  _buildBuiltinBrushPresets() {
    const container = document.getElementById('gio-brush-presets');
    if (!container) return;

    const presets = [
      { label: 'Round Soft', fn: this._makeRoundSoftBrush.bind(this) },
      { label: 'Round Hard', fn: this._makeRoundHardBrush.bind(this) },
      { label: 'Flat',       fn: this._makeFlatBrush.bind(this) },
      { label: 'Scatter',    fn: this._makeScatterBrush.bind(this) },
      { label: 'Texture',    fn: this._makeTextureBrush.bind(this) },
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
    this._currentPresetFn = null; // null = default round
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

  /* ── Layer list rendering ── */
  _renderLayerList() {
    const list = document.getElementById('gio-layer-list');
    if (!list) return;
    list.innerHTML = '';

    const layers = this._layerManager.layers;
    // render reversed (top layer first visually)
    for (let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i];
      const item = document.createElement('div');
      item.className = 'gio-layer-item' + (i === this._layerManager.activeIndex ? ' active' : '');

      // Thumbnail
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

      // Opacity mini-slider
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

      // Click to activate
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

  /* ══════════════════════════════════════════════════════════════
     EVENT BINDING
     ══════════════════════════════════════════════════════════════ */

  _bindEvents() {
    // Store bound references so they can be removed when switching canvas
    this._h = {
      mousedown:   this._onMouseDown.bind(this),
      mousemove:   this._onMouseMove.bind(this),
      mouseup:     this._onMouseUp.bind(this),
      mouseleave:  this._onMouseLeave.bind(this),
      contextmenu: e => this._onRightClick(e),
      click:       e => { if (e.ctrlKey || e.metaKey) document.getElementById('gio-load-image')?.click(); },
      dragover:    e => { e.preventDefault(); this._displayCanvas.style.outline = '2px dashed #e94560'; },
      dragleave:   () => { this._displayCanvas.style.outline = ''; },
      drop:        e => {
        e.preventDefault();
        this._displayCanvas.style.outline = '';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) this._loadImageFile(file);
      },
      touchstart:  this._onTouchStart.bind(this),
      touchmove:   this._onTouchMove.bind(this),
      touchend:    this._onTouchEnd.bind(this),
    };

    this._bindCanvasEvents(this._displayCanvas);

    // ── Clipboard paste (document-level, always active) ──
    document.addEventListener('paste', e => {
      if (!document.body.contains(this._displayCanvas)) return;
      const items = e.clipboardData?.items || [];
      for (const item of items) {
        if (item.type.startsWith('image/')) { this._loadImageFile(item.getAsFile()); break; }
      }
    });

    // ── Keyboard shortcuts ──
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

    // ── Toolbar tool buttons ──
    this._toolbar.querySelectorAll('[data-tool]').forEach(btn => {
      btn.addEventListener('click', () => this.setTool(btn.dataset.tool));
    });
        if(EditorCurvas){
   this.editorCurvas  = new  EditorCurvas();
this.editorCurvas .setCanvas(this._targetCanvas);
        }

     this._editorcurvasBT.onclick=()=>{
     
        
        if(this.editorCurvas){
    this.editorCurvas.toggle();
           console.log( this.editorCurvas,"intro");

        }
        else{
        if(EditorCurvas){
   this.editorCurvas  = new  EditorCurvas();
this.editorCurvas .setCanvas(this._targetCanvas);
        }
                
        }

    }

    // ── Color pickers ──
    document.getElementById('gio-color-picker')?.addEventListener('input', e => {
      this.color = e.target.value;
      document.getElementById('gio-primary-swatch').style.background = this.color;
    });
    document.getElementById('gio-color-picker-bg')?.addEventListener('input', e => {
      this.secondaryColor = e.target.value;
      document.getElementById('gio-secondary-swatch').style.background = this.secondaryColor;
    });
    document.getElementById('gio-swap-colors')?.addEventListener('click', () => this._swapColors());

    // ── Sliders ──
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

    // ── Load brush file(s) ──
    document.getElementById('gio-load-brush')?.addEventListener('change', e => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      // Load first file as active brush
      this._brush.loadBrushFromFile(files[0]).then(() => {
        // Deactivate presets
        document.querySelectorAll('.gio-brush-preset').forEach(el => el.classList.remove('active'));
      });
      e.target.value = '';
    });

    // ── Image brush ──
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

    // ── Load image ──
    document.getElementById('gio-load-image')?.addEventListener('change', e => {
      const file = e.target.files[0];
      if (file) this._loadImageFile(file);
      e.target.value = '';
    });

    // ── Paste ──
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
      } catch { /* not supported or no image */ }
    });

    // ── Export ──
    document.getElementById('gio-export')?.addEventListener('click', () => {
      const a = document.createElement('a');
      a.download = 'painting.png';
      a.href = this.toDataURL();
      a.click();
    });

    // ── Undo / Redo / Clear ──
    document.getElementById('gio-undo')?.addEventListener('click', () => this._undo());
    document.getElementById('gio-redo')?.addEventListener('click', () => this._redo());
    document.getElementById('gio-clear')?.addEventListener('click', () => {
      this._saveHistory();
      const ctx = this._layerManager.activeCtx;
      ctx.clearRect(0, 0, this.width, this.height);
      this._composite();
    });

    // ── Layer actions ──
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

  /** Attach all canvas-local event listeners to `canvas` */
  _bindCanvasEvents(canvas) {
    const h = this._h;
    canvas.addEventListener('mousedown',   h.mousedown);
    canvas.addEventListener('mousemove',   h.mousemove);
    canvas.addEventListener('mouseup',     h.mouseup);
    canvas.addEventListener('mouseleave',  h.mouseleave);
    canvas.addEventListener('contextmenu', h.contextmenu);
    canvas.addEventListener('click',       h.click);
    canvas.addEventListener('dragover',    h.dragover);
    canvas.addEventListener('dragleave',   h.dragleave);
    canvas.addEventListener('drop',        h.drop);
    canvas.addEventListener('touchstart',  h.touchstart, { passive: false });
    canvas.addEventListener('touchmove',   h.touchmove,  { passive: false });
    canvas.addEventListener('touchend',    h.touchend);
  }

  /** Remove all canvas-local event listeners from `canvas` */
  _unbindCanvasEvents(canvas) {
    const h = this._h;
    canvas.removeEventListener('mousedown',   h.mousedown);
    canvas.removeEventListener('mousemove',   h.mousemove);
    canvas.removeEventListener('mouseup',     h.mouseup);
    canvas.removeEventListener('mouseleave',  h.mouseleave);
    canvas.removeEventListener('contextmenu', h.contextmenu);
    canvas.removeEventListener('click',       h.click);
    canvas.removeEventListener('dragover',    h.dragover);
    canvas.removeEventListener('dragleave',   h.dragleave);
    canvas.removeEventListener('drop',        h.drop);
    canvas.removeEventListener('touchstart',  h.touchstart);
    canvas.removeEventListener('touchmove',   h.touchmove);
    canvas.removeEventListener('touchend',    h.touchend);
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

  /* ══════════════════════════════════════════════════════════════
     MOUSE / TOUCH HANDLERS
     ══════════════════════════════════════════════════════════════ */

  /**
   * Fuerza un recálculo inmediato del BoundingClientRect del canvas.
   *
   * Se llama automáticamente cuando:
   *  - ResizeObserver detecta cambio de tamaño
   *  - IntersectionObserver detecta que el canvas pasa de oculto a visible
   *  - El primer mousedown tras un rect inválido (rect.width === 0)
   *
   * También podés llamarla manualmente ante scroll, transiciones CSS, etc.
   * Preferí usar setRecalcularManualmente() para llamadas explícitas desde tu código.
   *
   * @returns {DOMRect}
   */
  /**
   * Fuerza un recálculo inmediato del BoundingClientRect del canvas.
   * Guarda también los factores de escala CSS→canvas para _getCanvasPos.
   *
   * Se llama automáticamente por ResizeObserver e IntersectionObserver.
   * Para llamadas manuales preferí setRecalcularManualmente().
   *
   * @returns {DOMRect}
   */
  setRecalcularRect() {
    const canvas = this._displayCanvas;
    const rect   = canvas.getBoundingClientRect();

    // ── Factores de escala CSS → píxeles internos del canvas ──
    // getBoundingClientRect devuelve el tamaño CSS (puede ser menor que
    // canvas.width/height si hay max-width, max-height, transform, zoom, etc.)
    // Guardamos los factores para no recalcularlos en cada mousemove.
    this._scaleX = rect.width  > 0 ? canvas.width  / rect.width  : 1;
    this._scaleY = rect.height > 0 ? canvas.height / rect.height : 1;

    this._cachedRect = rect;
    return rect;
  }

  /**
   * Recalcula manualmente la posición y escala CSS del canvas.
   *
   * Llamá esto siempre que el canvas cambie de posición o tamaño visual
   * sin que el ResizeObserver lo detecte: div oculto que se muestra,
   * zoom del navegador, panel que se expande, scroll, transiciones CSS.
   *
   * Uso típico con canvas achicado por CSS (max-width / max-height):
   *
   *   // El CSS achica el canvas visualmente pero el interno sigue siendo 825×825
   *   // Después de cualquier cambio de layout:
   *   paint.setRecalcularManualmente();
   *
   *   // Al mostrar el div que contenía el canvas oculto:
   *   miDiv.style.display = 'block';
   *   requestAnimationFrame(() => paint.setRecalcularManualmente());
   *
   * @returns {{ rect: DOMRect, scaleX: number, scaleY: number }}
   */
  setRecalcularManualmente() {
    const rect = this.setRecalcularRect();
    return { rect, scaleX: this._scaleX, scaleY: this._scaleY };
  }

  /**
   * Sincroniza el tamaño INTERNO del canvas (width/height en píxeles)
   * con el tamaño CSS real que ocupa en pantalla.
   *
   * Usá esto cuando el canvas está achicado por CSS (max-width, max-height,
   * width:100%, etc.) y querés que los píxeles internos coincidan exactamente
   * con los píxeles visuales — eliminando cualquier desface de coordenadas.
   *
   * Qué hace:
   *   1. Lee el tamaño CSS actual con getBoundingClientRect()
   *   2. Redimensiona canvas.width y canvas.height a ese tamaño
   *   3. Redimensiona todas las capas internas (GioLayerManager)
   *   4. Actualiza this.width / this.height
   *   5. Recalcula rect y escala (scaleX/scaleY quedan en 1.0)
   *   6. Repinta el composite
   *
   * Uso típico:
   *   // CSS: max-width:90% hace que el canvas de 825px quede en ~740px visual
   *   paint.setCanvasStyleSize();
   *   // Ahora canvas.width === 740, scaleX === 1.0, pintura perfectamente alineada
   *
   *   // También al hacer resize de ventana:
   *   window.addEventListener('resize', () => paint.setCanvasStyleSize());
   *
   * ATENCIÓN: redimensionar el canvas borra su contenido. El método preserva
   * el contenido de cada capa reescalándolo, pero habrá pérdida de calidad
   * si el nuevo tamaño es muy diferente al original.
   *
   * @param {boolean} [preserveContent=true]  si false, limpia las capas al redimensionar
   * @returns {{ width: number, height: number, scaleX: number, scaleY: number }}
   */
  setCanvasStyleSize(preserveContent = true) {
    const canvas = this._displayCanvas;
    const rect   = canvas.getBoundingClientRect();

    const newW = Math.round(rect.width);
    const newH = Math.round(rect.height);

    // Si el rect es inválido (canvas oculto) no hacer nada — esperar a que sea visible
    if (newW <= 0 || newH <= 0) {
      console.warn('GioCanvasPaint.setCanvasStyleSize(): el canvas no es visible aún (rect inválido). Llamalo después de mostrarlo.');
      return { width: this.width, height: this.height, scaleX: this._scaleX, scaleY: this._scaleY };
    }

    // Si el tamaño no cambió, solo recalcular rect y salir
    if (newW === this.width && newH === this.height) {
      return { width: newW, height: newH, ...this.setRecalcularManualmente() };
    }

    if (preserveContent) {
      // Preservar contenido de cada capa: copiar a offscreen → redimensionar → restaurar
      const snapshots = this._layerManager.layers.map(layer => {
        const off = document.createElement('canvas');
        off.width  = layer.canvas.width;
        off.height = layer.canvas.height;
        off.getContext('2d').drawImage(layer.canvas, 0, 0);
        return { layer, off };
      });

      // Redimensionar capas y restaurar contenido escalado
      snapshots.forEach(({ layer, off }) => {
        layer.canvas.width  = newW;
        layer.canvas.height = newH;
        layer.ctx.drawImage(off, 0, 0, off.width, off.height, 0, 0, newW, newH);
      });
    } else {
      // Solo redimensionar (borra contenido)
      this._layerManager.layers.forEach(layer => {
        layer.canvas.width  = newW;
        layer.canvas.height = newH;
      });
    }

    // Actualizar dimensiones internas del canvas display
    canvas.width  = newW;
    canvas.height = newH;

    // Actualizar dimensiones del proyecto
    this.width  = newW;
    this.height = newH;
    this._layerManager.width  = newW;
    this._layerManager.height = newH;

    // Con tamaño interno === tamaño CSS, la escala queda en exactamente 1.0
    this._scaleX = 1;
    this._scaleY = 1;
    this._cachedRect = canvas.getBoundingClientRect();

    this._composite();

    console.info(`GioCanvasPaint.setCanvasStyleSize(): ${newW}×${newH}px — scaleX/Y = 1.0`);
    return { width: newW, height: newH, scaleX: 1, scaleY: 1 };
  }

  /**
   * Imprime en consola el estado actual del rect y la escala.
   * Útil para debuggear por qué las brochas no pintan donde se hace click.
   *
   * Uso: paint.debugRect()
   */
  debugRect() {
    const c    = this._displayCanvas;
    const rect = c.getBoundingClientRect();
    console.group('GioCanvasPaint · debugRect()');
    console.log('canvas interno (px):   ', c.width, '×', c.height);
    console.log('canvas CSS (px):       ', rect.width.toFixed(1), '×', rect.height.toFixed(1));
    console.log('posición en pantalla:  ', 'top:', rect.top.toFixed(1), ' left:', rect.left.toFixed(1));
    console.log('scaleX (int/css):      ', (c.width / (rect.width  || 1)).toFixed(4));
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

  /**
   * Devuelve true si el rect cacheado es válido (canvas visible y posicionado).
   * Un rect con width===0 significa que el canvas estaba oculto cuando se midió.
   */
  _isRectValid(rect) {
    return rect && rect.width > 0 && rect.height > 0;
  }

  _getCanvasPos(e) {
    let rect = this._cachedRect;

    // Si el rect es inválido (canvas oculto al init, o nunca se midió),
    // recalcular ahora — el usuario ya está interactuando, canvas visible.
    if (!this._isRectValid(rect)) {
      rect = this.setRecalcularRect();
    }

    // Usar los factores de escala precalculados (CSS → píxeles internos).
    // Esto cubre: max-width, max-height, zoom, transform:scale, window.devicePixelRatio.
    const scaleX = this._scaleX || (this.width  / (rect.width  || this.width));
    const scaleY = this._scaleY || (this.height / (rect.height || this.height));

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY,
    };
  }

  /** Attach a ResizeObserver + IntersectionObserver to `canvas` */
  _initResizeObserver(canvas) {
    // ── Tear down previous observers ──
    if (this._resizeObserver) { this._resizeObserver.disconnect(); this._resizeObserver = null; }
    if (this._intersectionObserver) { this._intersectionObserver.disconnect(); this._intersectionObserver = null; }
    this._cachedRect = null;

    // ── ResizeObserver: detecta cambios de TAMAÑO del canvas ──
    if (typeof ResizeObserver !== 'undefined') {
      this._resizeObserver = new ResizeObserver(() => {
        this.setRecalcularRect();
        this._cursorOverlay && (this._cursorOverlay.style.display = 'none');
      });
      this._resizeObserver.observe(canvas);
    }

    // ── IntersectionObserver: detecta cuando el canvas pasa de OCULTO a VISIBLE ──
    // Esto cubre el caso de divs con display:none, tabs, modales, acordeones, etc.
    // Cuando isIntersecting cambia a true el canvas acaba de aparecer en pantalla
    // y el rect anterior (todo ceros) ya no sirve.
    if (typeof IntersectionObserver !== 'undefined') {
      this._intersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // El canvas acaba de hacerse visible — recalcular en el próximo frame
            // (requestAnimationFrame garantiza que el layout ya terminó)
            requestAnimationFrame(() => {
              this.setRecalcularRect();
              this._cursorOverlay && (this._cursorOverlay.style.display = 'none');
            });
          } else {
            // Canvas oculto — invalidar para forzar recálculo cuando vuelva
            this._cachedRect = null;
          }
        }
      }, { threshold: 0 }); // threshold:0 = dispara en cualquier pixel visible
      this._intersectionObserver.observe(canvas);
    }
  }

  _onMouseDown(e) {
    if (e.ctrlKey || e.metaKey) return; // handled by click → file dialog
    if (e.button === 2) return;         // right-click → handled by _onRightClick (copy)

    const pos = this._getCanvasPos(e);

    if (this.tool === 'eyedropper') {
      this._pickColor(pos.x, pos.y);
      return;
    }
    if (this.tool === 'fill') {
      this._saveHistory();
      this._floodFill(pos.x, pos.y, this.color);
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
      this.color, this.opacity, this.hardness, this.brushAngle);
    ctx.restore();
    this._composite();
  }

  _onMouseMove(e) {
    const pos = this._getCanvasPos(e);

    // Update cursor overlay — reuse the same cached rect _getCanvasPos already read
    const rect = this._cachedRect || this._displayCanvas.getBoundingClientRect();
    const cssW  = rect.width  || this.width;
    const scaleX = cssW / this.width;
    const co = this._cursorOverlay;
    const displaySize = this.brushSize * scaleX;
    co.style.display = 'block';
    co.style.left   = (e.clientX - rect.left) + 'px';
    co.style.top    = (e.clientY - rect.top)  + 'px';
    co.style.width  = displaySize + 'px';
    co.style.height = displaySize + 'px';

    if (!this._painting) return;
    const ctx = this._layerManager.activeCtx;
    ctx.save();
    if (this.tool === 'eraser') ctx.globalCompositeOperation = 'destination-out';
    this._brush.stroke(ctx, pos.x, pos.y, this.brushSize,
      this.color, this.opacity, this.hardness, this.brushAngle);
    ctx.restore();
    this._composite();
  }

  _onMouseUp()    { this._painting = false; this._brush.endStroke(); this._renderLayerList(); }
  _onMouseLeave() { this._painting = false; this._brush.endStroke();
    this._cursorOverlay.style.display = 'none'; }

  /**
   * Click derecho → copia la imagen compuesta (todas las capas) al portapapeles.
   * Muestra un flash visual en el canvas para confirmar la copia.
   */
  _onRightClick(e) {
    e.preventDefault();

    // Composite todas las capas en un canvas offscreen
    const off = document.createElement('canvas');
    off.width  = this.width;
    off.height = this.height;
    this._layerManager.composite(off.getContext('2d'));

    // Copiar al portapapeles usando la Clipboard API
    off.toBlob(blob => {
      if (!blob) return;
      try {
        navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]).then(() => {
          this._flashCopied();
        }).catch(() => {
          // Fallback: abrir en nueva pestaña si clipboard API no está disponible
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
          setTimeout(() => URL.revokeObjectURL(url), 10000);
        });
      } catch {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      }
    }, 'image/png');
  }

  /** Flash visual sobre el canvas para confirmar que se copió */
  _flashCopied() {
    const dc = this._displayCanvas;
    const flash = document.createElement('div');
    flash.textContent = '📋 Copiado al portapapeles';
    flash.style.cssText = `
      position:absolute;
      top:50%; left:50%;
      transform:translate(-50%,-50%);
      background:rgba(0,0,0,0.75);
      color:#fff;
      padding:10px 20px;
      border-radius:8px;
      font:700 14px/1 'Segoe UI',sans-serif;
      pointer-events:none;
      z-index:9999;
      transition:opacity 0.4s;
    `;
    const parent = dc.parentElement || document.body;
    parent.style.position = parent.style.position || 'relative';
    parent.appendChild(flash);
    setTimeout(() => { flash.style.opacity = '0'; }, 800);
    setTimeout(() => { flash.remove(); }, 1300);
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

  /* ══════════════════════════════════════════════════════════════
     TOOLS
     ══════════════════════════════════════════════════════════════ */

  _pickColor(x, y, secondary = false) {
    // Sample from the composite (flattened view)
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

  /**
   * Flood fill (scanline algorithm)
   */
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

    // Parse fill color
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
             Math.abs(data[i+1] - tG) <= tolerance &&
             Math.abs(data[i+2] - tB) <= tolerance &&
             Math.abs(data[i+3] - tA) <= tolerance;
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
      data[i]   = fc[0];
      data[i+1] = fc[1];
      data[i+2] = fc[2];
      data[i+3] = Math.round(this.opacity * 255);
      stack.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
    }

    ctx.putImageData(imageData, 0, 0);
  }

  /* ══════════════════════════════════════════════════════════════
     COMPOSITE
     ══════════════════════════════════════════════════════════════ */

  _composite() {
    this._layerManager.composite(this._targetCtx);
    // Also update display canvas if different from target
    if (this._targetCanvas !== this._displayCanvas) {
      this._layerManager.composite(this._displayCanvas.getContext('2d'));
    }
  }

  /* ══════════════════════════════════════════════════════════════
     HISTORY
     ══════════════════════════════════════════════════════════════ */

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

  /* ══════════════════════════════════════════════════════════════
     HELPERS
     ══════════════════════════════════════════════════════════════ */

  _swapColors() {
    [this.color, this.secondaryColor] = [this.secondaryColor, this.color];
    document.getElementById('gio-primary-swatch').style.background = this.color;
    document.getElementById('gio-secondary-swatch').style.background = this.secondaryColor;
    if (this._uiColorPicker) this._uiColorPicker.value = this.color;
    if (this._uiColorPickerBg) this._uiColorPickerBg.value = this.secondaryColor;
  }

  /**
   * Redimensiona el proyecto (canvas + todas las capas) al nuevo tamaño.
   * Preserva el contenido existente escalándolo al nuevo tamaño.
   * @param {number} newW
   * @param {number} newH
   */
  _resizeProject(newW, newH) {
    if (newW === this.width && newH === this.height) return;

    // Preservar cada capa
    this._layerManager.layers.forEach(layer => {
      const off = document.createElement('canvas');
      off.width  = layer.canvas.width;
      off.height = layer.canvas.height;
      off.getContext('2d').drawImage(layer.canvas, 0, 0);
      layer.canvas.width  = newW;
      layer.canvas.height = newH;
      layer.ctx.clearRect(0, 0, newW, newH);
      layer.ctx.drawImage(off, 0, 0, off.width, off.height, 0, 0, newW, newH);
    });

    this._layerManager.width  = newW;
    this._layerManager.height = newH;
    this.width  = newW;
    this.height = newH;

    // Ajustar el canvas display y target a la nueva resolución interna
    this._displayCanvas.width = newW;
    this._displayCanvas.height = newH;
    if (this._targetCanvas !== this._displayCanvas) {
      this._targetCanvas.width  = newW;
      this._targetCanvas.height = newH;
    }

    // Invalidar rect cacheado — el canvas cambió de tamaño
    this._cachedRect = null;
    this.setRecalcularRect();
  }

  /**
   * Carga un archivo de imagen en la capa activa a resolución nativa.
   *
   * Si la imagen es más grande que el canvas actual, el proyecto se
   * redimensiona para alojarla sin pérdida de calidad.
   * Si es más chica, se inserta centrada a su tamaño real (1:1 píxeles).
   *
   * @param {File|Blob} file
   * @param {object}    [opts]
   * @param {boolean}   [opts.resize=true]   redimensionar el proyecto si la imagen es mayor
   * @param {boolean}   [opts.newLayer=false] crear nueva capa en lugar de usar la activa
   */
  _loadImageFile(file, opts = {}) {
    const { resize = true, newLayer = false } = opts;
    const reader = new FileReader();

    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        this._saveHistory();

        const imgW = img.naturalWidth  || img.width;
        const imgH = img.naturalHeight || img.height;

        // ── Redimensionar proyecto a la resolución nativa de la imagen ──
        if (resize && (imgW > this.width || imgH > this.height)) {
          this._resizeProject(imgW, imgH);
        }

        const ctx = newLayer
          ? this._layerManager.addLayer(file.name || 'Imagen').ctx
          : this._layerManager.activeCtx;

        // Dibujar a 1:1 píxeles, centrado si el canvas es mayor que la imagen
        const dx = Math.round((this.width  - imgW) / 2);
        const dy = Math.round((this.height - imgH) / 2);
        ctx.drawImage(img, dx, dy, imgW, imgH);

        this._composite();
        this._renderLayerList();
        console.info(`Imagen cargada: ${imgW}×${imgH}px → canvas: ${this.width}×${this.height}px`);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }


  _updateToolUI() {
    this._toolbar.querySelectorAll('[data-tool]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tool === this.tool);
    });
    // Change cursor
    const cursors = {
      brush: 'crosshair', eraser: 'cell',
      fill: 'copy', eyedropper: 'zoom-in',
    };
    this._displayCanvas.style.cursor = cursors[this.tool] || 'crosshair';
  }
}

// Export for module use or make global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GioCanvasPaint, GioLayerManager, GioBrushEngine };
} else {
  window.GioCanvasPaint = GioCanvasPaint;
  window.GioLayerManager = GioLayerManager;
  window.GioBrushEngine = GioBrushEngine;
}