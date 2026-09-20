(function injectEditorStyles() {
  if (document.getElementById('editor-base-styles-gio')) return;
  const style = document.createElement('style');
  style.id = 'editor-base-styles-gio';
  style.textContent = `
    .aps {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1000000;
      background-color: rgba(10, 10, 10, 0.92);
      backdrop-filter: blur(8px);
      display: flex;
      overflow: hidden;
    }

    .giodefaultimgeditor-app-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
    }

    .giodefaultimgeditor-sidebar {
      width: 320px;
      height: 100%;
      background: var(--ui-bg-panel, #181818);
      border-right: 1px solid var(--ui-border, #3d3d3d);
      box-sizing: border-box;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 100;
      transition: transform var(--ui-transition-base, 0.3s ease);
    }

    .giodefaultimgeditor-sidebar.hidden {
      transform: translateX(-100%);
      position: absolute;
    }

    .giodefaultimgeditor-main-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
    }

    .giodefaultimgeditor-canvas {
      max-width: calc(100vw - 380px);
      max-height: calc(100vh - 160px);
      border-radius: var(--ui-radius-lg, 12px);
      box-shadow: var(--ui-shadow-modal, 0 20px 50px rgba(0,0,0,0.8));
      background: repeating-conic-gradient(#1e1e1e 0% 25%, #141414 0% 50%) 50% / 20px 20px;
    }

    .cldivcont {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      height: 85px;
      background: rgba(20, 20, 20, 0.85);
      border: 1px solid var(--ui-border, #3d3d3d);
      border-radius: var(--ui-radius-md, 8px);
      z-index: 1000;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      overflow-x: auto;
      width: 65%;
      gap: 10px;
      padding: 0 10px;
      box-sizing: border-box;
      backdrop-filter: blur(6px);
    }

    .cldivcont img {
      width: 65px;
      height: 65px;
      object-fit: cover;
      flex-shrink: 0;
      border-radius: var(--ui-radius-sm, 6px);
      border: 1px solid var(--ui-border, #3d3d3d);
      cursor: pointer;
      transition: transform var(--ui-transition-fast, 0.2s), border-color var(--ui-transition-fast, 0.2s);
    }

    .cldivcont img:hover {
      transform: scale(1.15);
      border-color: var(--ui-accent, #2196F3);
      z-index: 10;
    }

    .giodefaultimgeditor-hamburger-btn {
      position: fixed;
      top: 15px;
      left: 15px;
      z-index: 1001;
    }

    @media screen and (max-width: 768px) {
      .giodefaultimgeditor-sidebar {
        position: fixed;
        width: 280px;
      }
      .cldivcont {
        width: 90%;
        height: 75px;
      }
      .giodefaultimgeditor-canvas {
        max-width: 95vw;
        max-height: calc(100vh - 220px);
      }
    }
  `;
  document.head.appendChild(style);
})();

class FiltrosUnificados0920 {
  constructor(canvas) {
    this.canvas = typeof canvas === 'string' ? document.querySelector(canvas) : canvas;
    if (!this.canvas) throw new Error('Se requiere un canvas válido.');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.originalImage = null;
    this.aspectRatio = 1;
  }

  async cargarImagen(fuente) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.originalImage = img;
        this.aspectRatio = img.width / img.height;
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0);
        resolve(img);
      };
      img.onerror = reject;

      if (fuente instanceof Blob) {
        img.src = URL.createObjectURL(fuente);
      } else if (typeof fuente === 'string') {
        img.src = fuente;
      } else if (fuente instanceof HTMLImageElement) {
        img.src = fuente.src;
      }
    });
  }

  cambiarResolucion(ancho, alto, mantenerAspecto = false) {
    if (!this.originalImage) return;
    let w = ancho;
    let h = alto;

    if (mantenerAspecto) {
      h = Math.round(w / this.aspectRatio);
    }

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    tempCanvas.getContext('2d').drawImage(this.canvas, 0, 0);

    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx.drawImage(tempCanvas, 0, 0, w, h);
  }

  centrarImagen(resolucion = 2048, margen = 45, colorFondo = '#000000') {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');

    tempCanvas.width = resolucion;
    tempCanvas.height = resolucion;

    tempCtx.fillStyle = colorFondo;
    tempCtx.fillRect(0, 0, resolucion, resolucion);

    const currentWidth = this.canvas.width;
    const currentHeight = this.canvas.height;
    const maxDimension = resolucion - (margen * 2);

    let scaledWidth, scaledHeight;
    if (currentWidth > currentHeight) {
      scaledWidth = maxDimension;
      scaledHeight = (currentHeight * maxDimension) / currentWidth;
    } else {
      scaledHeight = maxDimension;
      scaledWidth = (currentWidth * maxDimension) / currentHeight;
    }

    const x = (resolucion - scaledWidth) / 2;
    const y = (resolucion - scaledHeight) / 2;

    tempCtx.drawImage(this.canvas, x, y, scaledWidth, scaledHeight);

    this.canvas.width = resolucion;
    this.canvas.height = resolucion;
    this.ctx.clearRect(0, 0, resolucion, resolucion);
    this.ctx.drawImage(tempCanvas, 0, 0);
  }

  aplicarFiltrosBasicos({ brillo = 100, contraste = 100, saturacion = 100, tono = 0, blur = 0 } = {}) {
    if (!this.originalImage) return;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    tempCanvas.getContext('2d').drawImage(this.canvas, 0, 0);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.filter = `brightness(${brillo}%) contrast(${contraste}%) saturate(${saturacion}%) hue-rotate(${tono}deg) blur(${blur}px)`;
    this.ctx.drawImage(tempCanvas, 0, 0);
    this.ctx.filter = 'none';
  }

  mejorarImagen() {
    if (!this.originalImage) return;

    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = this.canvas.width * 2;
    tempCanvas.height = this.canvas.height * 2;

    tempCtx.imageSmoothingEnabled = true;
    tempCtx.imageSmoothingQuality = 'high';
    tempCtx.filter = 'contrast(110%) brightness(105%) saturate(110%)';
    tempCtx.drawImage(this.canvas, 0, 0, tempCanvas.width, tempCanvas.height);

    this.canvas.width = tempCanvas.width;
    this.canvas.height = tempCanvas.height;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(tempCanvas, 0, 0);
  }

  fillBlack() {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    tempCtx.fillStyle = '#000000';
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(this.canvas, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(tempCanvas, 0, 0);
  }

  async removerFondo(onProgress = null) {
    const { removeBackground } = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.6.0/+esm');
    const blob = await new Promise(res => this.canvas.toBlob(res, 'image/png'));
    const blobResult = await removeBackground(blob, {
      progress: (k, curr, tot) => {
        if (onProgress) onProgress(curr, tot);
      }
    });
    await this.cargarImagen(blobResult);
  }

  filtroNoFunciona(paso2 = false, sum = 0.1) {
    let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let data = imageData.data;
    let rgba = { r: 0, g: 0, b: 0 };

    for (let i = 0; i < data.length; i += 4) {
      rgba.r = data[i] / 255;
      rgba.g = data[i + 1] / 255;
      rgba.b = data[i + 2] / 255;
      let maxpx = Math.max(rgba.r, rgba.g, rgba.b);

      if (!paso2) {
        this._operacionMatematica(rgba, this._simpleLinealFuncion(1, -0.3, 0, sum, maxpx), "+");
        for (let i2 = 0; i2 < 2; i2++) {
          let dv = this._colorDivide(rgba);
          this._saturationGio(rgba, 0.5 - dv);
        }
      } else {
        this._operacionMatematica(rgba, this._simpleLinealFuncion(1, 0.67, 0, 1.5, this._limit(maxpx * 2, 0, 1)), "*");
        this._operacionMatematica(rgba, (1 - maxpx) * (0.1 + sum) * maxpx, "+");
        for (let i2 = 0; i2 < 2; i2++) {
          let dv = this._colorDivide(rgba);
          this._saturationGio(rgba, 0.5 - dv);
        }
      }

      data[i] = rgba.r * 255;
      data[i + 1] = rgba.g * 255;
      data[i + 2] = rgba.b * 255;
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  meshPaintColor(noEsParaBlender = false) {
    let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let data = imageData.data;
    let rgba = { r: 0, g: 0, b: 0 };

    for (let i = 0; i < data.length; i += 4) {
      rgba.r = data[i] / 255;
      rgba.g = data[i + 1] / 255;
      rgba.b = data[i + 2] / 255;

      if (noEsParaBlender) {
        let maxpx = Math.max(rgba.r, rgba.g, rgba.b);
        this._operacionMatematica(rgba, this._simpleLinealFuncion(1, 0, 0, 0.2, maxpx), "+");
        let dv = this._colorDivide(rgba);
        this._saturationGio(rgba, 0.5 - dv);
        maxpx = Math.max(rgba.r, rgba.g, rgba.b);
        if (maxpx > 0.67) {
          this._operacionMatematica(rgba, 0.67 / (maxpx + 0.000001), "*");
        }
        dv = this._colorDivide(rgba);
        this._saturationGio(rgba, -dv * 0.3);
      } else {
        let maxpx = Math.max(rgba.r, rgba.g, rgba.b);
        this._operacionMatematica(rgba, (1 - maxpx) * 0.2 * maxpx, "+");
        maxpx = Math.max(rgba.r, rgba.g, rgba.b);
        this._operacionMatematica(rgba, (1 - maxpx) * 0.2 * maxpx, "+");
        maxpx = Math.max(rgba.r, rgba.g, rgba.b);
        this._operacionMatematica(rgba, (maxpx) * 0.2 * -maxpx, "+");
      }

      data[i] = rgba.r * 255;
      data[i + 1] = rgba.g * 255;
      data[i + 2] = rgba.b * 255;
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  colorPasoColor3DMesh(esMultiplicacion = true) {
    let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let data = imageData.data;
    let rgba = { r: 0, g: 0, b: 0 };

    for (let i = 0; i < data.length; i += 4) {
      rgba.r = data[i] / 255;
      rgba.g = data[i + 1] / 255;
      rgba.b = data[i + 2] / 255;
      let maxpx = Math.max(rgba.r, rgba.g, rgba.b);

      if (esMultiplicacion) {
        this._operacionMatematica(rgba, this._simpleLinealFuncion(1, 0.7, 0, 0.09, maxpx) / (maxpx + 0.000001), "*");
      } else {
        this._operacionMatematica(rgba, 0.05, "+");
        maxpx = Math.max(rgba.r, rgba.g, rgba.b);
        if (maxpx > 0.5) {
          this._operacionMatematica(rgba, 0.5 / (maxpx + 0.00001), "*");
        }
        let dv = this._colorDivide(rgba);
        this._saturationGio(rgba, 0.3 - dv);
        dv = this._colorDivide(rgba);
        this._saturationGio(rgba, 0.3 - dv);
      }

      data[i] = rgba.r * 255;
      data[i + 1] = rgba.g * 255;
      data[i + 2] = rgba.b * 255;
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  saturacionIdeal() {
    let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    let data = imageData.data;
    let rgba = { r: 0, g: 0, b: 0 };

    for (let i = 0; i < data.length; i += 4) {
      rgba.r = data[i] / 255;
      rgba.g = data[i + 1] / 255;
      rgba.b = data[i + 2] / 255;
      let maxpx = Math.max(rgba.r, rgba.g, rgba.b);
      this._operacionMatematica(rgba, this._simpleLinealFuncion(1, 0.7, 0.0, 1.25, maxpx), "*");
      let dv = this._colorDivide(rgba);
      this._saturationGio(rgba, 0.28 - dv);
      data[i] = rgba.r * 255;
      data[i + 1] = rgba.g * 255;
      data[i + 2] = rgba.b * 255;
    }

    this.ctx.putImageData(imageData, 0, 0);
  }

  crearNormalMap({ bias = 10, strength = 50, invert = false, useRed = true, useGreen = true } = {}) {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    const newData = new Uint8ClampedArray(data.length);

    const b = parseFloat(bias) / 100.0;
    const s = parseFloat(strength) / 10.0;
    const invR = invert ? -1.0 : 1.0;
    const invG = invert ? -1.0 : 1.0;

    const getR = (x, y) => {
      if (x < 0 || x >= this.canvas.width || y < 0 || y >= this.canvas.height) return 0;
      return data[(y * this.canvas.width + x) * 4];
    };

    for (let y = 0; y < this.canvas.height; y++) {
      for (let x = 0; x < this.canvas.width; x++) {
        const idx = (y * this.canvas.width + x) * 4;

        const d1 = getR(x + 1, y) / 255.0;
        const d2 = getR(x - 1, y) / 255.0;
        const d3 = getR(x, y + 1) / 255.0;
        const d4 = getR(x, y - 1) / 255.0;

        let dx = (d2 - d1) * s * invR;
        let dy = (d4 - d3) * s * invG;
        const dz = 1.0 / Math.max(b, 0.01);

        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const nx = dx / len;
        const ny = dy / len;
        const nz = dz / len;

        newData[idx] = useRed ? Math.floor(Math.max(0, Math.min(255, (nx * 0.5 + 0.5) * 255))) : data[idx];
        newData[idx + 1] = useGreen ? Math.floor(Math.max(0, Math.min(255, (ny * 0.5 + 0.5) * 255))) : data[idx + 1];
        newData[idx + 2] = Math.floor(Math.max(0, Math.min(255, (nz * 0.5 + 0.5) * 255)));
        newData[idx + 3] = 255;
      }
    }
    this.ctx.putImageData(new ImageData(newData, this.canvas.width, this.canvas.height), 0, 0);
  }

  rotar(grados = 90) {
    const rad = (grados * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));

    const w = this.canvas.width;
    const h = this.canvas.height;
    const newW = Math.floor(w * cos + h * sin);
    const newH = Math.floor(h * cos + w * sin);

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = newW;
    tempCanvas.height = newH;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.translate(newW / 2, newH / 2);
    tempCtx.rotate(rad);
    tempCtx.drawImage(this.canvas, -w / 2, -h / 2);

    this.canvas.width = newW;
    this.canvas.height = newH;
    this.ctx.clearRect(0, 0, newW, newH);
    this.ctx.drawImage(tempCanvas, 0, 0);
  }

  espejar(horizontal = true, vertical = false) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = this.canvas.width;
    tempCanvas.height = this.canvas.height;
    tempCanvas.getContext('2d').drawImage(this.canvas, 0, 0);

    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.scale(horizontal ? -1 : 1, vertical ? -1 : 1);
    this.ctx.drawImage(
      tempCanvas,
      horizontal ? -this.canvas.width : 0,
      vertical ? -this.canvas.height : 0
    );
    this.ctx.restore();
  }

  autoCrop(toleranciaAlfa = 0) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const data = this.ctx.getImageData(0, 0, w, h).data;

    let minX = w, minY = h, maxX = 0, maxY = 0;
    let encontrado = false;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const alpha = data[(y * w + x) * 4 + 3];
        if (alpha > toleranciaAlfa) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          encontrado = true;
        }
      }
    }

    if (!encontrado) return;

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    const cutData = this.ctx.getImageData(minX, minY, cropW, cropH);

    this.canvas.width = cropW;
    this.canvas.height = cropH;
    this.ctx.putImageData(cutData, 0, 0);
  }

  restablecer() {
    if (!this.originalImage) return;
    this.canvas.width = this.originalImage.width;
    this.canvas.height = this.originalImage.height;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.originalImage, 0, 0);
  }

  descargar(nombreArchivo = 'imagen-procesada.png', tipo = 'image/png') {
    const enlace = document.createElement('a');
    enlace.download = nombreArchivo;
    enlace.href = this.canvas.toDataURL(tipo);
    enlace.click();
  }

  _saturationGio(tex_color, ec5) {
    const valLim = x => Math.max(0.0, Math.min(1.0, x));
    const maxx = Math.max(tex_color.r, tex_color.g, tex_color.b);
    if (tex_color.r !== maxx) tex_color.r += (maxx - tex_color.r) * ec5;
    if (tex_color.g !== maxx) tex_color.g += (maxx - tex_color.g) * ec5;
    if (tex_color.b !== maxx) tex_color.b += (maxx - tex_color.b) * ec5;
    tex_color.r = valLim(tex_color.r);
    tex_color.g = valLim(tex_color.g);
    tex_color.b = valLim(tex_color.b);
    return tex_color;
  }

  _colorDivide(c) {
    return (Math.min(c.r, c.g, c.b)) / (Math.max(c.r, c.g, c.b) + 0.000001);
  }

  _simpleLinealFuncion(x1, y1, x2, y2, val) {
    let dx = (x2 - x1) + 0.00001;
    let m = (y2 - y1) / dx;
    return m * val + (y2 - m * x2);
  }

  _limit(num, min = 0.0, max = 1.0) {
    return Math.max(min, Math.min(max, num));
  }

  _operacionMatematica(rgba, val, operacion) {
    const v = x => Math.max(0, Math.min(1, x));
    if (operacion === "*" || operacion === "multiplicar") {
      rgba.r = v(rgba.r * val);
      rgba.g = v(rgba.g * val);
      rgba.b = v(rgba.b * val);
    } else if (operacion === "+") {
      rgba.r = v(rgba.r + val);
      rgba.g = v(rgba.g + val);
      rgba.b = v(rgba.b + val);
    } else if (operacion === "pow" || operacion === "potencia") {
      rgba.r = v(Math.pow(rgba.r, val));
      rgba.g = v(Math.pow(rgba.g, val));
      rgba.b = v(Math.pow(rgba.b, val));
    }
    return rgba;
  }
}

class CarbonDrawingFilter {
  constructor(canvas, onUpdate, accordion) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.onUpdate = onUpdate;
    this.isActive = false;
    this.controls = {};

    this.item = accordion.addItem({ title: 'Dibujo a Carbón', open: false });

    this.toggle = new UIToggle({
      label: 'Activar Carbón',
      value: false,
      onChange: (val) => { this.isActive = val; this.onUpdate(); }
    });
    this.item.append(this.toggle);

    const onSlide = () => { if (this.isActive) this.onUpdate(); };

    this.controls.carbonIntensity = new UIConfigurableSlider({ label: 'Intensidad', min: -10, max: 100, step: 1, value: 10, onChange: onSlide });
    this.controls.strokeWidth = new UIConfigurableSlider({ label: 'Grosor Trazo', min: -10, max: 100, step: 1, value: 1, onChange: onSlide });
    this.controls.contrast = new UIConfigurableSlider({ label: 'Contraste', min: -100, max: 100, step: 1, value: 1, onChange: onSlide });
    this.controls.depth3D = new UIConfigurableSlider({ label: 'Profundidad 3D', min: -160, max: 100, step: 1, value: 7, onChange: onSlide });
    this.controls.paperTexture = new UIConfigurableSlider({ label: 'Textura Papel', min: -200, max: 100, step: 1, value: -200, onChange: onSlide });
    this.controls.smoothing = new UIConfigurableSlider({ label: 'Suavizado', min: 0, max: 10, step: 1, value: 0, onChange: onSlide });

    Object.values(this.controls).forEach(c => this.item.append(c));
  }

  applyFilter(imageData) {
    if (!this.isActive) return imageData;
    const carbon = this.controls.carbonIntensity.getValue();
    const stroke = this.controls.strokeWidth.getValue();
    const contrast = this.controls.contrast.getValue();
    const depth = this.controls.depth3D.getValue();
    const texture = this.controls.paperTexture.getValue();
    const smooth = this.controls.smoothing.getValue();

    let result = imageData;
    if (texture > 0) result = this._applyPaperTexture(result, texture);
    result = this._toGrayscaleWithContrast(result, contrast);
    if (smooth > 0) result = this._gaussianBlur(result, smooth);

    const edges = this._enhancedSobelDetection(result, stroke);
    const depthMap = this._createDepthMap(result, depth);
    const volumeData = this._apply3DVolume(edges, depthMap, depth);
    return this.faicolor(this._applyCarbonTexture(volumeData, carbon, stroke));
  }

  faicolor(imageData) {
    let data = imageData.data;
    let rgba = { r: 0, g: 0, b: 0 };
    for (let i = 0; i < data.length; i += 4) {
      rgba.r = data[i] / 255; rgba.g = data[i + 1] / 255; rgba.b = data[i + 2] / 255;
      let maxpx2 = Math.max(rgba.r, rgba.g, rgba.b);
      this.operacionMatematica(rgba, maxpx2 * maxpx2, "*");
      this.operacionMatematica(rgba, maxpx2 * maxpx2, "*");
      this.operacionMatematica(rgba, 0.5, "pow");
      data[i] = rgba.r * 255; data[i + 1] = rgba.g * 255; data[i + 2] = rgba.b * 255;
    }
    return imageData;
  }

  operacionMatematica(rgba, val, op) {
    const clamp = v => Math.max(0, Math.min(1, v));
    if (op === "*") { rgba.r = clamp(rgba.r * val); rgba.g = clamp(rgba.g * val); rgba.b = clamp(rgba.b * val); }
    else if (op === "pow") { rgba.r = clamp(Math.pow(rgba.r, val)); rgba.g = clamp(Math.pow(rgba.g, val)); rgba.b = clamp(Math.pow(rgba.b, val)); }
  }

  _applyPaperTexture(imageData, intensity) {
    const data = new Uint8ClampedArray(imageData.data);
    const noise = intensity / 10;
    for (let i = 0; i < data.length; i += 4) {
      const r = (Math.random() - 0.5) * noise * 20;
      data[i] = Math.max(0, Math.min(255, data[i] + r));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + r));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + r));
    }
    return new ImageData(data, imageData.width, imageData.height);
  }

  _toGrayscaleWithContrast(imageData, contrastLevel) {
    const data = new Uint8ClampedArray(imageData.data);
    const factor = (259 * (contrastLevel * 25.5 + 255)) / (255 * (259 - contrastLevel * 25.5));
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const final = Math.max(0, Math.min(255, factor * (gray - 128) + 128));
      data[i] = data[i + 1] = data[i + 2] = final;
    }
    return new ImageData(data, imageData.width, imageData.height);
  }

  _gaussianBlur(imageData, radius) {
    const { width, height, data } = imageData;
    const output = this.ctx.createImageData(width, height);
    const outData = output.data;
    const sigma = radius / 3;
    const size = radius * 2 + 1;
    const kernel = Array(size).fill(0).map(() => Array(size).fill(0));
    let sum = 0;
    for (let y = -radius; y <= radius; y++) {
      for (let x = -radius; x <= radius; x++) {
        const v = Math.exp(-(x * x + y * y) / (2 * sigma * sigma));
        kernel[y + radius][x + radius] = v;
        sum += v;
      }
    }
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) kernel[y][x] /= sum;
    const half = Math.floor(size / 2);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let val = 0;
        for (let ky = -half; ky <= half; ky++) {
          for (let kx = -half; kx <= half; kx++) {
            const px = Math.min(Math.max(x + kx, 0), width - 1);
            const py = Math.min(Math.max(y + ky, 0), height - 1);
            val += data[(py * width + px) * 4] * kernel[ky + half][kx + half];
          }
        }
        const idx = (y * width + x) * 4;
        outData[idx] = outData[idx + 1] = outData[idx + 2] = val;
        outData[idx + 3] = 255;
      }
    }
    return output;
  }

  _enhancedSobelDetection(imageData, edgeStrength) {
    const { width, height, data } = imageData;
    const output = this.ctx.createImageData(width, height);
    const outData = output.data;
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const gray = data[((y + ky) * width + (x + kx)) * 4];
            const kidx = (ky + 1) * 3 + (kx + 1);
            gx += gray * sobelX[kidx];
            gy += gray * sobelY[kidx];
          }
        }
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        const idx = (y * width + x) * 4;
        outData[idx] = outData[idx + 1] = outData[idx + 2] = Math.min(255, magnitude * edgeStrength / 3);
        outData[idx + 3] = 255;
      }
    }
    return output;
  }

  _createDepthMap(imageData, depthLevel) {
    const { width, height, data } = imageData;
    const depthMap = this.ctx.createImageData(width, height);
    const depthData = depthMap.data;
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const center = data[idx];
        let grad = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            grad += Math.abs(data[((y + dy) * width + (x + dx)) * 4] - center);
          }
        }
        const val = Math.min(255, grad * depthLevel / 5);
        depthData[idx] = depthData[idx + 1] = depthData[idx + 2] = val;
        depthData[idx + 3] = 255;
      }
    }
    return depthMap;
  }

  _apply3DVolume(edges, depthMap, volumeLevel) {
    const { width, height } = edges;
    const edgeData = edges.data;
    const depthData = depthMap.data;
    const output = this.ctx.createImageData(width, height);
    const outData = output.data;
    const lightX = Math.cos(Math.PI / 4);
    const lightY = Math.sin(Math.PI / 4);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const edge = edgeData[idx];
        const depth = depthData[idx] / 255;
        const dX = (depthData[(y * width + (x + 1)) * 4] - depthData[(y * width + (x - 1)) * 4]) / 510;
        const dY = (depthData[((y + 1) * width + x) * 4] - depthData[((y - 1) * width + x) * 4]) / 510;
        const lighting = Math.max(0, lightX * dX + lightY * dY + 0.5);
        const volume = edge * (0.5 + lighting * depth * volumeLevel / 10);
        outData[idx] = outData[idx + 1] = outData[idx + 2] = 255 - Math.min(255, volume);
        outData[idx + 3] = 255;
      }
    }
    return output;
  }

  _applyCarbonTexture(imageData, intensity, grain) {
    const data = new Uint8ClampedArray(imageData.data);
    const carbonFactor = intensity / 10;
    for (let i = 0; i < data.length; i += 4) {
      let val = data[i];
      if (val < 200 && Math.random() < grain / 50) {
        val = Math.max(0, val - Math.random() * 30 * carbonFactor);
      }
      if (val < 128) val = val * (1 - carbonFactor * 0.3);
      data[i] = data[i + 1] = data[i + 2] = val;
    }
    return new ImageData(data, imageData.width, imageData.height);
  }
}

class EscalaDeGrisFilter {
  constructor(canvas, onUpdate, accordion) {
    this.canvas = canvas;
    this.onUpdate = onUpdate;
    this.isActive = false;

    this.item = accordion.addItem({ title: 'Saturación', open: false });

    this.toggle = new UIToggle({
      label: 'Activar Saturación',
      value: false,
      onChange: (val) => { this.isActive = val; this.onUpdate(); }
    });
    this.item.append(this.toggle);

    this.slider = new UIConfigurableSlider({
      label: 'Intensidad', min: -300, max: 200, step: 1, value: 0,
      onChange: () => { if (this.isActive) this.onUpdate(); }
    });
    this.item.append(this.slider);
  }

  applyFilter(imageData) {
    if (!this.isActive) return imageData;
    const intensity = this.slider.getValue();
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const gray = (r * 0.299 + g * 0.587 + b * 0.114);
      data[i]     = r + (gray - r) * (intensity / 100);
      data[i + 1] = g + (gray - g) * (intensity / 100);
      data[i + 2] = b + (gray - b) * (intensity / 100);
    }
    return imageData;
  }
}

class NormalMapFilter {
  constructor(canvas, onUpdate, accordion) {
    this.canvas = canvas;
    this.onUpdate = onUpdate;
    this.isActive = false;
    this.blurEnabled = false;
    this.format = 'opengl';

    this.item = accordion.addItem({ title: 'Normal Map', open: false });

    this.toggle = new UIToggle({
      label: 'Activar Normal Map',
      value: false,
      onChange: (val) => { this.isActive = val; this.onUpdate(); }
    });
    this.item.append(this.toggle);

    this.formatSeg = new UISegmented({
      items: [{ label: 'OpenGL', value: 'opengl' }, { label: 'DirectX', value: 'directx' }],
      activeIndex: 0,
      onChange: (val) => {
        this.format = val;
        this.chkInvertG.setValue(this.format === 'directx');
        if (this.isActive) this.onUpdate();
      }
    });
    this.item.append(this.formatSeg);

    const onSlide = () => { if (this.isActive) this.onUpdate(); };

    this.chkBlur = new UICheckbox({
      label: 'Blur Pre-proceso',
      checked: false,
      onChange: (v) => {
        this.blurEnabled = v;
        this.sliderBlur.element.style.display = v ? 'flex' : 'none';
        onSlide();
      }
    });
    this.item.append(this.chkBlur);

    this.sliderBlur = new UIConfigurableSlider({ label: 'Radio Blur', min: 1, max: 20, step: 1, value: 3, onChange: onSlide });
    this.sliderBlur.element.style.display = 'none';
    this.item.append(this.sliderBlur);

    this.sliderStrength = new UIConfigurableSlider({ label: 'Fuerza', min: 1, max: 100, step: 1, value: 10, onChange: onSlide });
    this.sliderBias = new UIConfigurableSlider({ label: 'Bias Profundidad', min: 1, max: 200, step: 1, value: 100, onChange: onSlide });
    this.item.append(this.sliderStrength);
    this.item.append(this.sliderBias);

    this.chkInvertR = new UICheckbox({ label: 'Invertir X (Rojo)', checked: false, onChange: onSlide });
    this.chkInvertG = new UICheckbox({ label: 'Invertir Y (Verde)', checked: false, onChange: onSlide });
    this.chkUseRed = new UICheckbox({ label: 'Usar Canal Rojo', checked: true, onChange: onSlide });
    this.chkUseGreen = new UICheckbox({ label: 'Usar Canal Verde', checked: true, onChange: onSlide });

    this.item.append(this.chkInvertR);
    this.item.append(this.chkInvertG);
    this.item.append(this.chkUseRed);
    this.item.append(this.chkUseGreen);
  }

  applyFilter(imageData) {
    if (!this.isActive) return imageData;
    let data = imageData;
    if (this.blurEnabled) data = this._applyBlur(data);
    return this._createNormalMap(data);
  }

  _applyBlur(imageData) {
    const radius = this.sliderBlur.getValue();
    const { width, height, data } = imageData;
    const newData = new Uint8ClampedArray(data.length);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0, g = 0, b = 0, count = 0;
        for (let ky = -radius; ky <= radius; ky++) {
          for (let kx = -radius; kx <= radius; kx++) {
            const px = x + kx, py = y + ky;
            if (px >= 0 && px < width && py >= 0 && py < height) {
              const idx = (py * width + px) * 4;
              r += data[idx]; g += data[idx + 1]; b += data[idx + 2];
              count++;
            }
          }
        }
        const i = (y * width + x) * 4;
        newData[i] = r / count; newData[i + 1] = g / count; newData[i + 2] = b / count; newData[i + 3] = data[i + 3];
      }
    }
    return new ImageData(newData, width, height);
  }

  _createNormalMap(imageData) {
    const { width, height, data } = imageData;
    const newData = new Uint8ClampedArray(data.length);
    const bias = this.sliderBias.getValue() / 100.0;
    const strength = this.sliderStrength.getValue() / 10.0;
    const invertR = this.chkInvertR.getValue() ? -1.0 : 1.0;
    let invertG = this.chkInvertG.getValue() ? -1.0 : 1.0;
    if (this.format === 'directx') invertG = -1.0;

    const useRed = this.chkUseRed.getValue();
    const useGreen = this.chkUseGreen.getValue();

    const getR = (x, y) => {
      if (x < 0 || x >= width || y < 0 || y >= height) return 0;
      return data[(y * width + x) * 4] / 255.0;
    };

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const d1 = getR(x + 1, y), d2 = getR(x - 1, y);
        const d3 = getR(x, y + 1), d4 = getR(x, y - 1);

        let dx = (d2 - d1) * strength * invertR;
        let dy = (d4 - d3) * strength * invertG;
        const dz = 1.0 / Math.max(bias, 0.01);

        const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const normX = dx / len, normY = dy / len, normZ = dz / len;

        newData[idx]     = useRed ? Math.floor((normX * 0.5 + 0.5) * 255) : data[idx];
        newData[idx + 1] = useGreen ? Math.floor((normY * 0.5 + 0.5) * 255) : data[idx + 1];
        newData[idx + 2] = Math.floor((normZ * 0.5 + 0.5) * 255);
        newData[idx + 3] = 255;
      }
    }
    return new ImageData(newData, width, height);
  }
}

class StreaksBloomFilter {
  constructor(canvas, onUpdate, accordion) {
    this.canvas = canvas;
    this.onUpdate = onUpdate;
    this.isActive = false;

    this.item = accordion.addItem({ title: 'Streaks Bloom', open: false });

    this.toggle = new UIToggle({
      label: 'Activar Streaks',
      value: false,
      onChange: (val) => { this.isActive = val; this.onUpdate(); }
    });
    this.item.append(this.toggle);

    const onSlide = () => { if (this.isActive) this.onUpdate(); };

    this.sliderThreshold = new UIConfigurableSlider({ label: 'Umbral Brillo', min: 100, max: 254, step: 1, value: 220, onChange: onSlide });
    this.sliderLength = new UIConfigurableSlider({ label: 'Longitud Streak', min: 20, max: 400, step: 1, value: 120, onChange: onSlide });
    this.sliderAngle = new UIConfigurableSlider({ label: 'Ángulo (°)', min: -90, max: 90, step: 1, value: 0, onChange: onSlide });
    this.sliderIntensity = new UIConfigurableSlider({ label: 'Intensidad', min: 0.3, max: 3.0, step: 0.05, value: 1.0, onChange: onSlide });
    this.sliderSpread = new UIConfigurableSlider({ label: 'Dispersión', min: 1, max: 24, step: 1, value: 6, onChange: onSlide });

    this.item.append(this.sliderThreshold);
    this.item.append(this.sliderLength);
    this.item.append(this.sliderAngle);
    this.item.append(this.sliderIntensity);
    this.item.append(this.sliderSpread);
  }

  applyFilter(imageData) {
    if (!this.isActive) return imageData;
    const { width, height } = imageData;
    const srcData = imageData.data;
    const threshold = this.sliderThreshold.getValue();
    const streakLen = this.sliderLength.getValue();
    const angleRad = (this.sliderAngle.getValue() * Math.PI) / 180;
    const intensity = this.sliderIntensity.getValue();
    const spread = this.sliderSpread.getValue();

    const dx = Math.cos(angleRad), dy = Math.sin(angleRad);
    const bloom = new Float32Array(width * height * 4);
    const brightPixels = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4;
        const r = srcData[i], g = srcData[i + 1], b = srcData[i + 2];
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const dv = Math.min(r, g, b) / (Math.max(r, g, b) + 0.000001);
        if (lum >= threshold && dv <= 0.4) {
          brightPixels.push({ x, y, r, g, b, excess: (lum - threshold) / (255 - threshold) });
        }
      }
    }

    for (let k = 0; k < brightPixels.length; k++) {
      const { x, y, r, g, b, excess } = brightPixels[k];
      const streakAlpha = Math.min(1, excess * intensity);

      for (let s = 0; s < spread; s++) {
        const offset = (s - spread / 2) * 0.7;
        const perpX = -dy * offset, perpY = dx * offset;
        const spreadFade = Math.exp(-(offset * offset) / (2 * (spread * 0.8) * (spread * 0.8)));

        for (let t = 0; t < streakLen; t++) {
          const decay = Math.min(1, t / (streakLen * 0.08)) * Math.pow(1 - t / streakLen, 2.2);
          const nx = Math.round(x + dx * t + perpX), ny = Math.round(y + dy * t + perpY);
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) break;
          const alpha = Math.min(1, streakAlpha * decay * spreadFade * intensity);
          const bi = (ny * width + nx) * 4;
          bloom[bi] += r * alpha; bloom[bi + 1] += g * alpha; bloom[bi + 2] += b * alpha; bloom[bi + 3] += alpha;
        }
      }
    }

    const outputData = new Uint8ClampedArray(srcData);
    for (let i = 0; i < width * height; i++) {
      const bi = i * 4;
      const a = bloom[bi + 3];
      if (a <= 0) continue;
      const bR = Math.min(255, (bloom[bi] / (a + 0.001)) * Math.min(a, 1));
      const bG = Math.min(255, (bloom[bi + 1] / (a + 0.001)) * Math.min(a, 1));
      const bB = Math.min(255, (bloom[bi + 2] / (a + 0.001)) * Math.min(a, 1));

      outputData[bi]     = Math.min(255, Math.round(255 - (255 - outputData[bi]) * (255 - bR) / 255));
      outputData[bi + 1] = Math.min(255, Math.round(255 - (255 - outputData[bi + 1]) * (255 - bG) / 255));
      outputData[bi + 2] = Math.min(255, Math.round(255 - (255 - outputData[bi + 2]) * (255 - bB) / 255));
    }
    return new ImageData(outputData, width, height);
  }
}

class PixelArtFilter {
  constructor(canvas, onUpdate, accordion) {
    this.canvas = canvas;
    this.onUpdate = onUpdate;
    this.isActive = false;

    this.item = accordion.addItem({ title: 'Pixel Art', open: false });

    this.toggle = new UIToggle({
      label: 'Activar Pixel Art',
      value: false,
      onChange: (val) => { this.isActive = val; this.onUpdate(); }
    });
    this.item.append(this.toggle);

    this.sliderSize = new UIConfigurableSlider({
      label: 'Tamaño Píxel', min: 1, max: 40, step: 1, value: 4,
      onChange: () => { if (this.isActive) this.onUpdate(); }
    });
    this.item.append(this.sliderSize);
  }

  applyFilter(imageData) {
    if (!this.isActive) return imageData;
    const pixelSize = Math.max(1, Math.floor(this.sliderSize.getValue()));
    if (pixelSize === 1) return imageData;

    const { width, height } = imageData;
    const data = new Uint8ClampedArray(imageData.data);

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        let r = 0, g = 0, b = 0, count = 0;
        const maxY = Math.min(y + pixelSize, height);
        const maxX = Math.min(x + pixelSize, width);

        for (let j = y; j < maxY; j++) {
          for (let i = x; i < maxX; i++) {
            const idx = (j * width + i) * 4;
            r += data[idx]; g += data[idx + 1]; b += data[idx + 2];
            count++;
          }
        }
        r = Math.round(r / count); g = Math.round(g / count); b = Math.round(b / count);

        for (let j = y; j < maxY; j++) {
          for (let i = x; i < maxX; i++) {
            const idx = (j * width + i) * 4;
            data[idx] = r; data[idx + 1] = g; data[idx + 2] = b; data[idx + 3] = 255;
          }
        }
      }
    }
    return new ImageData(data, width, height);
  }
}

class UnifiedToolboxFilter {
  constructor(canvas, onUpdate, accordion) {
    this.canvas = canvas;
    this.onUpdate = onUpdate;
    this.fu = new FiltrosUnificados0920(this.canvas);
    this.item = accordion.addItem({ title: 'Filtros Unificados 0920', open: false });

    this.btnCentrar = new UIButton({
      text: 'Centrar Imagen',
      onClick: () => {
        const resolution = parseInt(prompt('Ingresa la resolución de salida:', '2048'));
        if (isNaN(resolution) || resolution <= 0) {
          alert('Por favor, ingresa una resolución válida.');
          return;
        }

        const margin = parseInt(prompt('Ingresa el margen de centrado (en píxeles):', '45'));
        if (isNaN(margin) || margin < 0) {
          alert('Por favor, ingresa un margen válido.');
          return;
        }

        const colorFondo = confirm("background white") ? '#ffffff' : '#000000';
        this.fu.centrarImagen(resolution, margin, colorFondo);
        this.onUpdate();

        setTimeout(() => {
          if (confirm("lineal saturacion")) {
            this.fu.saturacionIdeal();
            this.onUpdate();
          }
        }, 500);
      }
    });

    this.btnFillBlack = new UIButton({
      text: 'Fill Black',
      onClick: () => {
        this.fu.fillBlack();
        this.onUpdate();
      }
    });

    this.btnMejorar = new UIButton({
      text: 'Mejorar Imagen (x2)',
      onClick: () => {
        this.fu.mejorarImagen();
        this.onUpdate();
      }
    });

    this.btnPasoMeshPaint = new UIButton({
      text: 'paint3d272025Ymesh3d',
      onClick: () => {
        const vuelta = confirm("no espara blender");
        this.fu.meshPaintColor(vuelta);
        this.onUpdate();
      }
    });

    this.btnPasoColor3D = new UIButton({
      text: 'imgTo3dmeshCreator',
      onClick: () => {
        const mul = confirm("sum");
        this.fu.colorPasoColor3DMesh(mul);
        this.onUpdate();
      }
    });

    this.btnFiltroGioP1 = new UIButton({
      text: 'nofunciona',
      onClick: () => {
        const paso2 = confirm("mesh creator calcelar paint");
        const sum = parseFloat(prompt("suma", "0.1"));
        this.fu.filtroNoFunciona(paso2, isNaN(sum) ? 0.1 : sum);
        this.onUpdate();
      }
    });

    this.btnRemoverFondo = new UIButton({
      text: 'Remover Fondo (IA)',
      variant: 'secondary',
      onClick: async () => {
        await this.fu.removerFondo();
        this.onUpdate();
      }
    });

    this.btnRotar = new UIButton({
      text: 'Rotar 90°',
      onClick: () => {
        this.fu.rotar(90);
        this.onUpdate();
      }
    });

    this.btnEspejoH = new UIButton({
      text: 'Espejar H',
      onClick: () => {
        this.fu.espejar(true, false);
        this.onUpdate();
      }
    });

    this.btnAutoCrop = new UIButton({
      text: 'Auto Crop',
      onClick: () => {
        this.fu.autoCrop(0);
        this.onUpdate();
      }
    });

    this.btnRestablecer = new UIButton({
      text: 'Restablecer Base',
      variant: 'danger',
      onClick: () => {
        this.fu.restablecer();
        this.onUpdate();
      }
    });

    this.item.append(this.btnCentrar);
    this.item.append(this.btnFillBlack);
    this.item.append(this.btnMejorar);
    this.item.append(this.btnPasoMeshPaint);
    this.item.append(this.btnPasoColor3D);
    this.item.append(this.btnFiltroGioP1);
    this.item.append(this.btnRemoverFondo);
    this.item.append(this.btnRotar);
    this.item.append(this.btnEspejoH);
    this.item.append(this.btnAutoCrop);
    this.item.append(this.btnRestablecer);
  }

  setImage(img) {
    this.fu.cargarImagen(img);
  }
}

function loadGLFX2025() {
  if (window.fx) return;
  const script = document.createElement('script');
  script.src = 'https://evanw.github.io/glfx.js/glfx.js';
  script.type = 'text/javascript';
  script.async = true;
  document.head.appendChild(script);
}
loadGLFX2025();

class GLFXFilterManager {
  constructor(onUpdate, accordion) {
    this.onUpdate = onUpdate;
    this.isActive = false;
    this.currentFilter = null;
    this.controls = {};
    this.glfxCanvas = null;
    this.glfxTexture = null;

    this.filterDefinitions = {
      'brightnessContrast': {
        name: 'Brightness / Contrast',
        category: 'Ajustes',
        params: [
          { id: 'brightness', label: 'Brillo', min: -1, max: 1, default: 0, step: 0.01 },
          { id: 'contrast', label: 'Contraste', min: -1, max: 1, default: 0, step: 0.01 }
        ]
      },
      'hueSaturation': {
        name: 'Hue / Saturation',
        category: 'Ajustes',
        params: [
          { id: 'hue', label: 'Matiz', min: -1, max: 1, default: 0, step: 0.01 },
          { id: 'saturation', label: 'Saturación', min: -1, max: 1, default: 0, step: 0.01 }
        ]
      },
      'vibrance': {
        name: 'Vibrance',
        category: 'Ajustes',
        params: [
          { id: 'amount', label: 'Cantidad', min: -1, max: 1, default: 0.5, step: 0.01 }
        ]
      },
      'denoise': {
        name: 'Denoise',
        category: 'Ajustes',
        params: [
          { id: 'exponent', label: 'Exponente', min: 0, max: 50, default: 20, step: 1 }
        ]
      },
      'unsharpMask': {
        name: 'Unsharp Mask',
        category: 'Ajustes',
        params: [
          { id: 'radius', label: 'Radio', min: 0, max: 200, default: 20, step: 1 },
          { id: 'strength', label: 'Fuerza', min: 0, max: 5, default: 2, step: 0.1 }
        ]
      },
      'noise': {
        name: 'Noise',
        category: 'Ajustes',
        params: [
          { id: 'amount', label: 'Cantidad', min: 0, max: 1, default: 0.5, step: 0.01 }
        ]
      },
      'sepia': {
        name: 'Sepia',
        category: 'Ajustes',
        params: [
          { id: 'amount', label: 'Cantidad', min: 0, max: 1, default: 1, step: 0.01 }
        ]
      },
      'vignette': {
        name: 'Vignette',
        category: 'Ajustes',
        params: [
          { id: 'size', label: 'Tamaño', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'amount', label: 'Cantidad', min: 0, max: 1, default: 0.5, step: 0.01 }
        ]
      },
      'zoomBlur': {
        name: 'Zoom Blur',
        category: 'Blur',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'strength', label: 'Fuerza', min: 0, max: 1, default: 0.3, step: 0.01 }
        ]
      },
      'triangleBlur': {
        name: 'Triangle Blur',
        category: 'Blur',
        params: [
          { id: 'radius', label: 'Radio', min: 0, max: 200, default: 50, step: 1 }
        ]
      },
      'tiltShift': {
        name: 'Tilt Shift',
        category: 'Blur',
        params: [
          { id: 'startX', label: 'Inicio X', min: 0, max: 1, default: 0.15, step: 0.01 },
          { id: 'startY', label: 'Inicio Y', min: 0, max: 1, default: 0.75, step: 0.01 },
          { id: 'endX', label: 'Fin X', min: 0, max: 1, default: 0.85, step: 0.01 },
          { id: 'endY', label: 'Fin Y', min: 0, max: 1, default: 0.25, step: 0.01 },
          { id: 'blurRadius', label: 'Radio Blur', min: 0, max: 50, default: 15, step: 1 },
          { id: 'gradientRadius', label: 'Radio Gradiente', min: 0, max: 400, default: 200, step: 1 }
        ]
      },
      'lensBlur': {
        name: 'Lens Blur',
        category: 'Blur',
        params: [
          { id: 'radius', label: 'Radio', min: 0, max: 50, default: 10, step: 1 },
          { id: 'brightness', label: 'Brillo', min: -1, max: 1, default: 0.75, step: 0.01 },
          { id: 'angle', label: 'Ángulo', min: 0, max: 6.28, default: 0, step: 0.01 }
        ]
      },
      'swirl': {
        name: 'Swirl',
        category: 'Warp',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'radius', label: 'Radio', min: 0, max: 600, default: 200, step: 1 },
          { id: 'angle', label: 'Ángulo', min: -25, max: 25, default: 3, step: 0.1 }
        ]
      },
      'bulgePinch': {
        name: 'Bulge / Pinch',
        category: 'Warp',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'radius', label: 'Radio', min: 0, max: 600, default: 200, step: 1 },
          { id: 'strength', label: 'Fuerza', min: -1, max: 1, default: 0.5, step: 0.01 }
        ]
      },
      'ink': {
        name: 'Ink',
        category: 'Efectos',
        params: [
          { id: 'strength', label: 'Fuerza', min: 0, max: 1, default: 0.25, step: 0.01 }
        ]
      },
      'edgeWork': {
        name: 'Edge Work',
        category: 'Efectos',
        params: [
          { id: 'radius', label: 'Radio', min: 0, max: 200, default: 2, step: 1 }
        ]
      },
      'hexagonalPixelate': {
        name: 'Hexagonal Pixelate',
        category: 'Efectos',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'scale', label: 'Escala', min: 1, max: 100, default: 10, step: 1 }
        ]
      },
      'dotScreen': {
        name: 'Dot Screen',
        category: 'Efectos',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'angle', label: 'Ángulo', min: 0, max: 6.28, default: 1.1, step: 0.01 },
          { id: 'size', label: 'Tamaño', min: 1, max: 50, default: 3, step: 0.1 }
        ]
      },
      'colorHalftone': {
        name: 'Color Halftone',
        category: 'Efectos',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'angle', label: 'Ángulo', min: 0, max: 6.28, default: 1.1, step: 0.01 },
          { id: 'size', label: 'Tamaño', min: 1, max: 50, default: 4, step: 0.1 }
        ]
      }
    };

    this.initUI(accordion);
  }

  initUI(accordion) {
    this.item = accordion.addItem({ title: 'Filtros GPU (GLFX)', open: false });

    this.toggle = new UIToggle({
      label: 'Activar Motor GLFX',
      value: false,
      onChange: (val) => {
        this.isActive = val;
        this.onUpdate();
      }
    });
    this.item.append(this.toggle);

    const selectOptions = [{ value: '', label: '-- Selecciona un Filtro --' }];
    for (const [key, def] of Object.entries(this.filterDefinitions)) {
      selectOptions.push({
        value: key,
        label: `[${def.category}] ${def.name}`
      });
    }

    this.select = new UISelect({
      options: selectOptions,
      value: '',
      onChange: (key) => this.onFilterChange(key)
    });
    this.item.append(this.select);

    this.dynamicControls = document.createElement('div');
    this.dynamicControls.style.display = 'flex';
    this.dynamicControls.style.flexDirection = 'column';
    this.dynamicControls.style.gap = '6px';
    this.dynamicControls.style.marginTop = '8px';
    this.item.append(this.dynamicControls);
  }

  onFilterChange(key) {
    this.dynamicControls.innerHTML = '';
    this.controls = {};
    this.currentFilter = key || null;

    if (!key || !this.filterDefinitions[key]) {
      this.onUpdate();
      return;
    }

    const def = this.filterDefinitions[key];

    def.params.forEach(p => {
      const slider = new UIConfigurableSlider({
        label: p.label,
        min: p.min,
        max: p.max,
        step: p.step,
        value: p.default,
        onChange: () => {
          if (this.isActive) this.onUpdate();
        }
      });
      this.controls[p.id] = slider;
      slider.mount(this.dynamicControls);
    });

    if (this.isActive) this.onUpdate();
  }

  initGLFX(width, height) {
    try {
      if (!window.fx) return;
      this.glfxTexture?.destroy();
      this.glfxTexture = null;
      this.glfxCanvas = window.fx.canvas();
      this.glfxCanvas.width = width;
      this.glfxCanvas.height = height;
    } catch (e) {
      console.error('Error inicializando GLFX WebGL:', e);
      this.glfxCanvas = null;
    }
  }

  applyFilter(sourceCanvas) {
    if (!this.isActive || !this.currentFilter || !window.fx) {
      return sourceCanvas;
    }

    try {
      if (!this.glfxCanvas || this.glfxCanvas.width !== sourceCanvas.width || this.glfxCanvas.height !== sourceCanvas.height) {
        this.initGLFX(sourceCanvas.width, sourceCanvas.height);
      }
      if (!this.glfxCanvas) return sourceCanvas;

      this.glfxTexture?.destroy();
      this.glfxTexture = this.glfxCanvas.texture(sourceCanvas);
      this.glfxCanvas.draw(this.glfxTexture);

      const def = this.filterDefinitions[this.currentFilter];
      if (!def) return sourceCanvas;

      const params = def.params.map(p => {
        const val = this.controls[p.id] ? this.controls[p.id].getValue() : p.default;

        if (['centerX', 'startX', 'endX'].includes(p.id)) {
          return val * this.glfxCanvas.width;
        } else if (['centerY', 'startY', 'endY'].includes(p.id)) {
          return val * this.glfxCanvas.height;
        } else {
          return val;
        }
      });

      this.glfxCanvas[this.currentFilter](...params);
      this.glfxCanvas.update();

      return this.glfxCanvas;
    } catch (e) {
      console.error('Error aplicando GLFX:', e);
      return sourceCanvas;
    }
  }
}

class FilterManager {
  constructor(canvas, parentAccordion, onUpdate) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.onUpdateCallback = onUpdate;
    this.originalImage = null;

    this.unifiedToolbox = new UnifiedToolboxFilter(this.canvas, () => this.updateCanvas(false), parentAccordion);
    this.escalaDeGrisFilter = new EscalaDeGrisFilter(this.canvas, () => this.updateCanvas(), parentAccordion);
    this.carbonFilter = new CarbonDrawingFilter(this.canvas, () => this.updateCanvas(), parentAccordion);
    this.normalMapFilter = new NormalMapFilter(this.canvas, () => this.updateCanvas(), parentAccordion);
    this.streaksBloomFilter = new StreaksBloomFilter(this.canvas, () => this.updateCanvas(), parentAccordion);
    this.pixelArtFilter = new PixelArtFilter(this.canvas, () => this.updateCanvas(), parentAccordion);
    this.glfxManager = new GLFXFilterManager(() => this.updateCanvas(), parentAccordion);
  }

  setImage(img) {
    this.originalImage = img;
    this.canvas.width = img.width;
    this.canvas.height = img.height;
    this.unifiedToolbox.setImage(img);
    this.updateCanvas();
  }

  updateCanvas(redrawOriginal = true) {
    if (redrawOriginal) {
      if (!this.originalImage) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.originalImage, 0, 0);
    }

    let imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

    if (this.escalaDeGrisFilter.isActive) imgData = this.escalaDeGrisFilter.applyFilter(imgData);
    if (this.carbonFilter.isActive) imgData = this.carbonFilter.applyFilter(imgData);
    if (this.normalMapFilter.isActive) imgData = this.normalMapFilter.applyFilter(imgData);
    if (this.streaksBloomFilter.isActive) imgData = this.streaksBloomFilter.applyFilter(imgData);
    if (this.pixelArtFilter.isActive) imgData = this.pixelArtFilter.applyFilter(imgData);

    this.ctx.putImageData(imgData, 0, 0);

    if (this.glfxManager.isActive && this.glfxManager.currentFilter) {
      const gpuCanvas = this.glfxManager.applyFilter(this.canvas);
      if (gpuCanvas && gpuCanvas !== this.canvas) {
        this.ctx.drawImage(gpuCanvas, 0, 0);
      }
    }

    if (this.onUpdateCallback) this.onUpdateCallback(this.canvas);
  }
}

class AppEditorDefaultImg {
  constructor(idGenerico = 'app1', textEdi = 'Gio', event = {}) {
    UI.Theme.inject();

    this.idGenerico = idGenerico;
    this.textoedi = textEdi;
    this.currentImagenUrlInOpenEdit = "";
    this.currenurlHover = "";
    this.arrayImgs = [];

    this.parentElement = document.createElement("div");
    this.parentElement.id = idGenerico + "idSoporteApp";
    this.parentElement.classList.add('aps');
    document.body.appendChild(this.parentElement);

    this.parentElement.innerHTML = `
      <div class="giodefaultimgeditor-app-container">
        <button class="ui-square-btn giodefaultimgeditor-hamburger-btn" id="${this.idGenerico}_hamburger_btn">☰</button>
        
        <div class="giodefaultimgeditor-sidebar" id="${this.idGenerico}_sidebar">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
            <span class="ui-panel-title" style="font-size:14px;">${this.textoedi} Editor</span>
            <button class="ui-icon-btn" id="${this.idGenerico}_btn_close_header">✕</button>
          </div>
          
          <div id="${this.idGenerico}_action_buttons" style="display:flex; flex-direction:column; gap:8px;"></div>
          <div id="${this.idGenerico}_filters_accordion"></div>
        </div>

        <div class="giodefaultimgeditor-main-content">
          <canvas class="giodefaultimgeditor-canvas" id="${this.idGenerico}_canvas" width="800" height="600"></canvas>
        </div>

        <div class="cldivcont" id="${this.idGenerico}minislider"></div>
      </div>
      <input type="file" id="${this.idGenerico}_file_input" accept="image/*" style="display:none;">
    `;

    this.sidebar = document.getElementById(`${this.idGenerico}_sidebar`);
    this.hamburgerBtn = document.getElementById(`${this.idGenerico}_hamburger_btn`);
    this.canvas = document.getElementById(`${this.idGenerico}_canvas`);
    this.contenedorimgsl = document.getElementById(`${this.idGenerico}minislider`);
    this.fileInput = document.getElementById(`${this.idGenerico}_file_input`);

    const actionsContainer = document.getElementById(`${this.idGenerico}_action_buttons`);
    
    this.btnUpload = new UIButton({
      text: 'Subir Imagen',
      variant: 'primary',
      onClick: () => this.fileInput.click()
    });

    this.btnPaste = new UIButton({
      text: 'Pegar del Portapapeles',
      onClick: () => this.pasteFromClipboard()
    });

    this.btnClose = new UIButton({
      text: 'Cerrar Editor',
      variant: 'danger',
      onClick: () => this.closeappf()
    });

    this.btnUpload.mount(actionsContainer);
    this.btnPaste.mount(actionsContainer);
    this.btnClose.mount(actionsContainer);

    document.getElementById(`${this.idGenerico}_btn_close_header`).addEventListener('click', () => this.closeappf());
    this.hamburgerBtn.addEventListener('click', () => this.toggleSidebar());

    this.accordion = new UIAccordion({ exclusive: true });
    this.accordion.mount(document.getElementById(`${this.idGenerico}_filters_accordion`));

    this.filterManager = new FilterManager(this.canvas, this.accordion);

    this.fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this.loadImageFromFile(file);
    });

    window.addEventListener('paste', (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          this.loadImageFromFile(item.getAsFile());
          break;
        }
      }
    });

    if (this.contenedorimgsl) {
      this.contenedorimgsl.addEventListener('mouseover', (event) => {
        if (event.target.tagName === 'IMG') {
          this.setImageHover(event.target.src);
        }
      });

      this.contenedorimgsl.addEventListener('mouseout', (event) => {
        if (event.target.tagName === 'IMG') {
          this.setImageHover();
        }
      });
    }

    this._initResponsive();
  }

  cargarImagenes(listaImagenes) {
    var contenedor = this.contenedorimgsl;
    if (!contenedor) return;

    listaImagenes.forEach((elemento) => {
      if (elemento && elemento.url) {
        const nuevaImagen = document.createElement('img');
        nuevaImagen.src = elemento.url;
        nuevaImagen.alt = elemento.nombre || 'Imagen';
        contenedor.appendChild(nuevaImagen);
      }
    });
  }

  cargarImagenesSimple = (listaImagenes, booClear = false) => {
    if (booClear) { this.contenedorimgsl.innerHTML = ""; }
    var contenedor = this.contenedorimgsl;

    listaImagenes.forEach((elemento) => {
      if (elemento && elemento.url) {
        const nuevaImagen = document.createElement('img');
        nuevaImagen.src = elemento.url;
        nuevaImagen.alt = 'Imagen';
        nuevaImagen.onclick = () => {
          this.setImage(nuevaImagen.src);
        };
        contenedor.appendChild(nuevaImagen);
      }
    });
  }

  openappf = () => {
    const soporteApp = this.parentElement;
    soporteApp.style.display = soporteApp.style.display === 'none' ? 'flex' : 'none';
    this.onOpenEditor(this.currentImagenUrlInOpenEdit);
  }

  onOpenEditor = (e) => {
  }

  closeappf = (e) => {
    var soporteApp = this.parentElement;
    soporteApp.style.display = 'none';
  }

  _initResponsive() {
    this._handleResize();
    window.addEventListener('resize', () => this._handleResize());
  }

  _handleResize() {
    if (window.innerWidth <= 768) {
      this.sidebar.classList.add('hidden');
    } else {
      this.sidebar.classList.remove('hidden');
    }
  }

  toggleSidebar() {
    this.sidebar.classList.toggle('hidden');
  }

  async setImageHover(imageSource = this.currenurlHover) {
    if (!imageSource) return;
    this.loadImageFromSource(imageSource);
  }

  async setImage(imageSource) {
    this.currenurlHover = imageSource;
    this.currentImagenUrlInOpenEdit = imageSource;
    this.loadImageFromSource(imageSource);
  }

  async setArrayImg(array) {
    this.arrayImgs = array;
  }

  loadImageFromSource(src) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.filterManager.setImage(img);
    };
    img.src = src;
  }

  loadImageFromFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.currenurlHover = e.target.result;
      this.currentImagenUrlInOpenEdit = e.target.result;
      this.loadImageFromSource(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  async pasteFromClipboard() {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            this.loadImageFromFile(blob);
            return;
          }
        }
      }
      alert('No se encontró ninguna imagen en el portapapeles.');
    } catch (err) {
      alert('Usa Ctrl+V directamente sobre la pantalla para pegar la imagen.');
    }
  }
}

window.appEditorgioBasico = null;
document.addEventListener('DOMContentLoaded', () => {
  window.appEditorgioBasico = new AppEditorDefaultImg('app1', 'Gio');
  setTimeout(() => {
    window.appEditorgioBasico.closeappf();
  }, 50);
});