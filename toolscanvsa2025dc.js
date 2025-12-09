
    
    
    
  /* ini de filtros efectfgx otros */
function loadGLFX2025() {
  const script = document.createElement('script');
  script.src = 'https://evanw.github.io/glfx.js/glfx.js';
  script.type = 'text/javascript';
  
 
  script.async = true;
  script.defer = false;
  
 
  document.head.appendChild(script);
  
  console.log('GLFX.js cargando...');
}

 
loadGLFX2025();

 
const styleefectoseditorglfx = document.createElement('style');

 
styleefectoseditorglfx.textContent = `
   .aps {
      position: fixed;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;
      z-index: 1000000090;
      background-color: #080e08be;

    }

    

    ::-webkit-scrollbar {
      width: 10px;
    }


    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }


    ::-webkit-scrollbar-thumb {
      background: #888;
    }


    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .giodefaultimgeditor-classlesfttextR {
      margin-top: 6rem;
      position: relative;
      right: 2%;
      top: 3%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: stretch;
      align-content: stretch;
      font-size: 12px;
      color: #fff;
    }

    .giodefaultimgeditor-upload-btn-primary:hover {

      color: #5587dd;
      font-size: 14px;
    }

    .giodefaultimgeditor-upload-btn-secondary:hover {
      font-size: 15px;
      color: #5587dd;
    }

    .giodefaultimgeditor-classlesfttext {
      position: absolute;
      right: 2%;
      top: 2%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: stretch;
      align-content: stretch;
      font-size: 14px;
      color: #fff;
    }

    .giodefaultimgeditor-app-container {
      position: relative;
      width: 100%;
      min-height: 100vh;
      display: flex;
    }

    .giodefaultimgeditor-sidebar {
      position: fixed;
      left: 0;
      top: 0;
      width: 320px;
      height: 100vh;
      background: rgba(19, 19, 19, 0.863);
      backdrop-filter: blur(20px);
      overflow-y: auto;
      padding: 24px;
      z-index: 100;
      transform: translateX(0);
      transition: transform 0.3s ease-in-out;
    }

    .giodefaultimgeditor-sidebar.hidden {
      transform: translateX(-100%);
    }

    .giodefaultimgeditor-sidebar-header {
      margin-bottom: 32px;
    }

    .giodefaultimgeditor-sidebar-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .giodefaultimgeditor-sidebar-subtitle {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.6);
    }

    .giodefaultimgeditor-upload-section {
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .giodefaultimgeditor-upload-btn {
      width: 100%;
      padding: 12px 16px;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 12px;
    }

    .giodefaultimgeditor-upload-btn-primary {
      background: #252525;
      color: #fff;
    }

    .giodefaultimgeditor-upload-btn-secondary {
      background: #252525;
      color: #fff;
    }

    .giodefaultimgeditor-upload-info {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      margin-top: 8px;
    }

    .giodefaultimgeditor-filters-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .giodefaultimgeditor-filter-section {
      margin-bottom: 16px;
    }

    .giodefaultimgeditor-filter-toggle-btn {
      width: 100%;
      padding: 14px 16px;
      background: rgba(255, 255, 255, 0.08);
      border: 2px solid rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: left;
    }

    .giodefaultimgeditor-filter-toggle-btn.giodefaultimgeditor-active {
      background: rgba(59, 130, 246, 0.25);
      border-color: #32476a;
    }

    .giodefaultimgeditor-filter-controls {
      margin-top: 12px;
      padding: 16px;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      display: none;
    }

    .giodefaultimgeditor-filter-select-wrapper {
      margin-bottom: 16px;
    }

    .giodefaultimgeditor-filter-select-label {
      display: block;
      margin-bottom: 8px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
    }

    .giodefaultimgeditor-filter-select {
      width: 100%;
      padding: 10px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 13px;
      cursor: pointer;
      outline: none;
    }

    .giodefaultimgeditor-filter-select option {
      background: #1f2937;
      color: #fff;
    }

    .giodefaultimgeditor-control-group {
      background: rgba(255, 255, 255, 0.05);
      padding: 14px;
      border-radius: 10px;
      margin-bottom: 12px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .giodefaultimgeditor-control-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
    }

    .giodefaultimgeditor-value-display {
      background: rgba(59, 130, 246, 0.3);
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 11px;
      color: #60a5fa;
      font-weight: 600;
    }

    .giodefaultimgeditor-range-input {
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.1);
      outline: none;
      -webkit-appearance: none;
    }

    .giodefaultimgeditor-range-input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #32476a;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
    }

    .giodefaultimgeditor-range-input::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #32476a;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
    }

    .giodefaultimgeditor-main-content {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 40px;
      margin-left: 320px;
      transition: margin-left 0.3s ease-in-out;
    }

    .giodefaultimgeditor-main-content.sidebar-hidden {
      margin-left: 0;
    }

    .giodefaultimgeditor-canvas-wrapper {
      position: relative;
      max-width: 100%;
      max-height: calc(100vh - 80px);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .giodefaultimgeditor-canvas {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      background: #fff;
    }

    .giodefaultimgeditor-drop-zone {
      position: none;
      top: 0;
      left: 0;
      width: 0%;
      height: 0%;
      background: rgba(59, 131, 246, 0);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 200;
      backdrop-filter: blur(10px);
      z-index: -100;
    }

    .giodefaultimgeditor-drop-zone.giodefaultimgeditor-active {
      display: none;
    }

    .giodefaultimgeditor-drop-message {
      font-size: 32px;
      font-weight: 700;
      color: #fff;
      text-align: center;
      padding: 60px;
      border: 4px dashed #fff;
      border-radius: 24px;
    }

    .giodefaultimgeditor-file-input {
      display: none;
    }

    .giodefaultimgeditor-hamburger-btn {
      position: fixed;
      top: 20px;
      left: 20px;
      width: 40px;
      height: 40px;
      background: #32476a;
      border: none;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      padding: 8px;
      cursor: pointer;
      z-index: 101;
      transition: background 0.3s ease;
    }

    .giodefaultimgeditor-hamburger-btn span {
      display: block;
      width: 24px;
      height: 2px;
      background: #fff;
      border-radius: 1px;
      transition: all 0.3s ease;
    }

    .giodefaultimgeditor-hamburger-btn.active span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .giodefaultimgeditor-hamburger-btn.active span:nth-child(2) {
      opacity: 0;
    }

    .giodefaultimgeditor-hamburger-btn.active span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    @media screen and (max-width: 768px) {
      .giodefaultimgeditor-sidebar {
        width: 280px;
        padding: 16px;
      }

      .giodefaultimgeditor-main-content {
        margin-left: 0;
        padding: 20px;
        width: 100%;
        height: 100%;
        min-width: unset;
        min-height: unset;
      }

      .giodefaultimgeditor-main-content.sidebar-hidden {
        margin-left: 0;
      }

      .giodefaultimgeditor-canvas {
        max-width: 90%;
        max-height: 80vh;
      }

      .giodefaultimgeditor-hamburger-btn {
        left: 10px;
        top: 10px;
      }
    }
`; 
document.head.appendChild(styleefectoseditorglfx);



class GioUISliderBasico {
  constructor(parentHtml, min, max, eventos, idGenerico, labelText, initialValue = 5, step = 1) {
    this.id = `${idGenerico}_slider`;
    this.idLabel = `${idGenerico}_label`;
    this.idValue = `${idGenerico}_value`;
    this.idInput = `${idGenerico}_input`;
    this.min = min;
    this.max = max;
    this.eventos = eventos;
    this.labelText = labelText;
    this.initialValue = initialValue;
    this.step = step;

    const sliderHTML = `
      <div class="giodefaultimgeditor-control-label">
        <span id="${this.idLabel}">${this.labelText}</span>
        <span class="giodefaultimgeditor-value-display" id="${this.idValue}">${this.initialValue}</span>
      </div>
      <input type="range" class="giodefaultimgeditor-range-input" id="${this.idInput}" min="${this.min}" max="${this.max}" step="${this.step}" value="${this.initialValue}">
    `;

    this.controlGroup = document.createElement('div');
    this.controlGroup.classList.add('giodefaultimgeditor-control-group');
    this.controlGroup.id = this.id;
    this.controlGroup.innerHTML = sliderHTML;

    parentHtml.appendChild(this.controlGroup);

    this.spanText = this.controlGroup.querySelector(`#${this.idLabel}`);
    this.spanValue = this.controlGroup.querySelector(`#${this.idValue}`);
    this.inputRange = this.controlGroup.querySelector(`#${this.idInput}`);

    this.inputRange.addEventListener('input', this.handleInput.bind(this));

    if (this.eventos?.onChange instanceof Function) {
      this.inputRange.addEventListener('input', this.eventos.onChange);
    }
  }

  handleInput(event) {
    this.spanValue.textContent = event.target.value;
  }

  getValue() {
    return parseFloat(this.inputRange.value);
  }

  setValue(value) {
    this.inputRange.value = value;
    this.spanValue.textContent = value;
  }

  destroy() {
    this.controlGroup?.parentNode?.removeChild(this.controlGroup);
  }
}

class ImageLoader {
  constructor(callbacks, idPrefix) {
    this.prefix = idPrefix;
    this.idFileInput = `${this.prefix}_file_input`;
    this.idUploadBtn = `${this.prefix}_upload_btn`;
    this.idPasteBtn = `${this.prefix}_paste_btn`;
    this.idDropZone = `${this.prefix}_drop_zone`;
    this.callbacks = callbacks;
    this.originalImage = null;
  }

  init() {
    this._initFileInput();
    this._initDragDrop();
    this._initPasteFromClipboard();
  }

  _initFileInput() {
    const fileInput = document.getElementById(this.idFileInput);
    const uploadBtn = document.getElementById(this.idUploadBtn);
    const pasteBtn = document.getElementById(this.idPasteBtn);

    uploadBtn?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', e => this._handleImageUpload(e));
    pasteBtn?.addEventListener('click', () => this._pasteFromClipboard());
  }

  _initDragDrop() {
    const dropZone = document.getElementById(this.idDropZone);
    const body = document.body;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      body.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      body.addEventListener(eventName, () => {
        dropZone?.classList.add('giodefaultimgeditor-active');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      body.addEventListener(eventName, () => {
        dropZone?.classList.remove('giodefaultimgeditor-active');
      });
    });

    body.addEventListener('drop', e => {
      const files = e.dataTransfer.files;
      if (files.length > 0 && files[0].type.startsWith('image/')) {
        this._loadImageFromFile(files[0]);
      }
    });
  }

  _initPasteFromClipboard() {
    document.addEventListener('paste', e => this._handlePaste(e));
  }

  async _handlePaste(e) {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        this._loadImageFromFile(blob);
        break;
      }
    }
  }

  async _pasteFromClipboard() {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            this._loadImageFromFile(blob);
            return;
          }
        }
      }
      alert('No se encontro ninguna imagen en el portapapeles');
    } catch (err) {
      alert('No se pudo acceder al portapapeles. Usa Ctrl+V para pegar.');
    }
  }

  _handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
      this._loadImageFromFile(file);
    }
  }

  _loadImageFromFile(file) {
    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.onload = () => {
        this.originalImage = img;
        this.callbacks.onImageLoad?.(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  getOriginalImage() {
    return this.originalImage;
  }
}

class CarbonDrawingFilter {
  constructor(canvas, onUpdate, idPrefix) {
    this.prefix = idPrefix;
    this.idSection = `${this.prefix}_carbon_sect`;
    this.idToggleBtn = `${this.prefix}_carbon_toggle_btn`;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.onUpdate = onUpdate;
    this.controls = {};
    this.isActive = false;
    this.controlsContainer = null;
  }

  createUI(parentElement) {
    const section = document.createElement('div');
    section.id = this.idSection;
    section.className = 'giodefaultimgeditor-filter-section';
    section.innerHTML = `
      <button class="giodefaultimgeditor-filter-toggle-btn" id="${this.idToggleBtn}">
        Dibujo a Carbon
      </button>
      <div class="giodefaultimgeditor-filter-controls" id="${this.prefix}_carbon_controls">
      </div>
    `;
    parentElement.appendChild(section);
    this.controlsContainer = document.getElementById(`${this.prefix}_carbon_controls`);
    document.getElementById(this.idToggleBtn).addEventListener('click', () => this.toggle());
    this._createControls();
  }

  _createControls() {
    const onChange = () => this.isActive && this.onUpdate?.();

    this.controls.carbonIntensity = new GioUISliderBasico(
      this.controlsContainer, -10, 100, { onChange },
      `${this.prefix}_carbon_intensity`, 'Coal Intensity', 10, 1
    );

    this.controls.strokeWidth = new GioUISliderBasico(
      this.controlsContainer, -10, 100, { onChange },
      `${this.prefix}_carbon_stroke`, 'Stroke Thickness', 7, 1
    );

    this.controls.contrast = new GioUISliderBasico(
      this.controlsContainer, -100, 100, { onChange },
      `${this.prefix}_carbon_contrast`, 'Contrast', 1, 1
    );

    this.controls.depth3D = new GioUISliderBasico(
      this.controlsContainer, -160, 100, { onChange },
      `${this.prefix}_carbon_depth`, '3D Depth', 7, 1
    );

    this.controls.paperTexture = new GioUISliderBasico(
      this.controlsContainer, -100, 100, { onChange },
      `${this.prefix}_carbon_texture`, 'Paper Texture', -70, 1
    );

    this.controls.smoothing = new GioUISliderBasico(
      this.controlsContainer, 0, 10, { onChange },
      `${this.prefix}_carbon_smooth`, 'Softening', 3, 1
    );
  }

  toggle() {
    this.isActive = !this.isActive;
    if (this.controlsContainer) {
      this.controlsContainer.style.display = this.isActive ? 'block' : 'none';
    }
    const btn = document.getElementById(this.idToggleBtn);
    btn?.classList.toggle('giodefaultimgeditor-active', this.isActive);
    this.onUpdate?.();
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

    if (texture > 0) {
      result = this._applyPaperTexture(result, texture);
    }

    result = this._toGrayscaleWithContrast(result, contrast);

    if (smooth > 0) {
      result = this._gaussianBlur(result, smooth);
    }

    const edges = this._enhancedSobelDetection(result, stroke);
    const depthMap = this._createDepthMap(result, depth);
    const volumeData = this._apply3DVolume(edges, depthMap, depth);
    var finalData = this._applyCarbonTexture(volumeData, carbon, stroke);

    finalData = this.faicolor(finalData);

    return finalData;
  }

  faicolor = (imageData) => {
    let data = imageData.data;
    let rgba = { r: 0, g: 0, b: 0 };

    for (let i = 0; i < data.length; i += 4) {
      rgba.r = data[i] / 255;
      rgba.g = data[i + 1] / 255;
      rgba.b = data[i + 2] / 255;

      let maxpx2 = Math.max(rgba.r, rgba.g, rgba.b);
      let minx2 = Math.min(rgba.r, rgba.g, rgba.b);
      let dv2 = minx2 / (maxpx2 + 0.00001);

      this.operacionMatematica(rgba, maxpx2 * maxpx2, "*");
      this.operacionMatematica(rgba, maxpx2 * maxpx2, "*");
      this.operacionMatematica(rgba, 0.5, "pow");

      data[i] = rgba.r * 255;
      data[i + 1] = rgba.g * 255;
      data[i + 2] = rgba.b * 255;
    }
    return imageData;
  }

  operacionMatematica = (rgba, val, operacion) => {
    const value1o0 = v => Math.max(0, Math.min(1, v));

    switch (operacion) {
      case "multiplicar":
      case "*":
        rgba.r *= val; rgba.r = value1o0(rgba.r);
        rgba.g *= val; rgba.g = value1o0(rgba.g);
        rgba.b *= val; rgba.b = value1o0(rgba.b);
        break;
      case "+":
        rgba.r += val; rgba.r = value1o0(rgba.r);
        rgba.g += val; rgba.g = value1o0(rgba.g);
        rgba.b += val; rgba.b = value1o0(rgba.b);
        break;
      case "potencia":
      case "pow":
        rgba.r = Math.pow(rgba.r, val); rgba.r = value1o0(rgba.r);
        rgba.g = Math.pow(rgba.g, val); rgba.g = value1o0(rgba.g);
        rgba.b = Math.pow(rgba.b, val); rgba.b = value1o0(rgba.b);
        break;
      case "asigna":
      case "=":
        rgba.r = val.r; rgba.r = value1o0(rgba.r);
        rgba.g = val.g; rgba.g = value1o0(rgba.g);
        rgba.b = val.b; rgba.b = value1o0(rgba.b);
        break;
      case "srgba":
        rgba.r += rgba.r; rgba.r = value1o0(rgba.r);
        rgba.g += rgba.g; rgba.g = value1o0(rgba.g);
        rgba.b += rgba.b; rgba.b = value1o0(rgba.b);
        break;
    }
    return rgba;
  }

  _applyPaperTexture(imageData, intensity) {
    const data = new Uint8ClampedArray(imageData.data);
    const noise = intensity / 10;
    for (let i = 0; i < data.length; i += 4) {
      const random = (Math.random() - 0.5) * noise * 20;
      data[i] = Math.max(0, Math.min(255, data[i] + random));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + random));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + random));
    }
    return new ImageData(data, imageData.width, imageData.height);
  }

  _toGrayscaleWithContrast(imageData, contrastLevel) {
    const data = new Uint8ClampedArray(imageData.data);
    const factor = (259 * (contrastLevel * 25.5 + 255)) / (255 * (259 - contrastLevel * 25.5));
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const contrasted = factor * (gray - 128) + 128;
      const final = Math.max(0, Math.min(255, contrasted));
      data[i] = data[i + 1] = data[i + 2] = final;
    }
    return new ImageData(data, imageData.width, imageData.height);
  }

  _gaussianBlur(imageData, radius) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const output = this.ctx.createImageData(width, height);
    const outputData = output.data;
    const sigma = radius / 3;
    const kernel = this._createGaussianKernel(radius, sigma);
    const kernelSize = kernel.length;
    const half = Math.floor(kernelSize / 2);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let sum = 0;
        let weightSum = 0;
        for (let ky = -half; ky <= half; ky++) {
          for (let kx = -half; kx <= half; kx++) {
            const px = Math.min(Math.max(x + kx, 0), width - 1);
            const py = Math.min(Math.max(y + ky, 0), height - 1);
            const idx = (py * width + px) * 4;
            const weight = kernel[ky + half][kx + half];
            sum += data[idx] * weight;
            weightSum += weight;
          }
        }
        const idx = (y * width + x) * 4;
        const value = sum / weightSum;
        outputData[idx] = outputData[idx + 1] = outputData[idx + 2] = value;
        outputData[idx + 3] = 255;
      }
    }
    return output;
  }

  _createGaussianKernel(radius, sigma) {
    const size = radius * 2 + 1;
    const kernel = Array(size).fill(0).map(() => Array(size).fill(0));
    let sum = 0;
    for (let y = -radius; y <= radius; y++) {
      for (let x = -radius; x <= radius; x++) {
        const value = Math.exp(-(x * x + y * y) / (2 * sigma * sigma));
        kernel[y + radius][x + radius] = value;
        sum += value;
      }
    }
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        kernel[y][x] /= sum;
      }
    }
    return kernel;
  }

  _enhancedSobelDetection(imageData, edgeStrength) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const output = this.ctx.createImageData(width, height);
    const outputData = output.data;
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0, gy = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4;
            const gray = data[idx];
            const kernelIdx = (ky + 1) * 3 + (kx + 1);
            gx += gray * sobelX[kernelIdx];
            gy += gray * sobelY[kernelIdx];
          }
        }
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        const enhanced = Math.min(255, magnitude * edgeStrength / 3);
        const idx = (y * width + x) * 4;
        outputData[idx] = outputData[idx + 1] = outputData[idx + 2] = enhanced;
        outputData[idx + 3] = 255;
      }
    }
    return output;
  }

  _createDepthMap(imageData, depthLevel) {
    const width = imageData.width;
    const height = imageData.height;
    const data = imageData.data;
    const depthMap = this.ctx.createImageData(width, height);
    const depthData = depthMap.data;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const center = data[idx];
        let gradient = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nIdx = ((y + dy) * width + (x + dx)) * 4;
            gradient += Math.abs(data[nIdx] - center);
          }
        }
        const depth = Math.min(255, gradient * depthLevel / 5);
        depthData[idx] = depthData[idx + 1] = depthData[idx + 2] = depth;
        depthData[idx + 3] = 255;
      }
    }
    return depthMap;
  }

  _apply3DVolume(edges, depthMap, volumeLevel) {
    const width = edges.width;
    const height = edges.height;
    const edgeData = edges.data;
    const depthData = depthMap.data;
    const output = this.ctx.createImageData(width, height);
    const outputData = output.data;
    const lightAngle = Math.PI / 4;
    const lightX = Math.cos(lightAngle);
    const lightY = Math.sin(lightAngle);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const edge = edgeData[idx];
        const depth = depthData[idx] / 255;
        const idxLeft = (y * width + (x - 1)) * 4;
        const idxRight = (y * width + (x + 1)) * 4;
        const idxUp = ((y - 1) * width + x) * 4;
        const idxDown = ((y + 1) * width + x) * 4;
        const dDepthX = (depthData[idxRight] - depthData[idxLeft]) / 510;
        const dDepthY = (depthData[idxDown] - depthData[idxUp]) / 510;
        const lighting = Math.max(0, lightX * dDepthX + lightY * dDepthY + 0.5);
        const volume = edge * (0.5 + lighting * depth * volumeLevel / 10);
        const final = 255 - Math.min(255, volume);
        outputData[idx] = outputData[idx + 1] = outputData[idx + 2] = final;
        outputData[idx + 3] = 255;
      }
    }
    return output;
  }

  _applyCarbonTexture(imageData, intensity, grain) {
    const data = new Uint8ClampedArray(imageData.data);
    const carbonFactor = intensity / 10;
    for (let i = 0; i < data.length; i += 4) {
      let value = data[i];
      if (value < 200 && Math.random() < grain / 50) {
        const carbonGrain = Math.random() * 30 * carbonFactor;
        value = Math.max(0, value - carbonGrain);
      }
      if (value < 128) {
        value = value * (1 - carbonFactor * 0.3);
      }
      data[i] = data[i + 1] = data[i + 2] = value;
    }
    return new ImageData(data, imageData.width, imageData.height);
  }
}

class EscalaDeGrisFilter {
  constructor(canvas, onUpdate, idPrefix) {
    this.prefix = idPrefix;
    this.idSection = `${this.prefix}_grayscale_sect`;
    this.idToggleBtn = `${this.prefix}_grayscale_toggle_btn`;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.onUpdate = onUpdate;
    this.controls = {};
    this.isActive = false;
    this.controlsContainer = null;
  }

  createUI(parentElement) {
    const section = document.createElement('div');
    section.id = this.idSection;
    section.className = 'giodefaultimgeditor-filter-section';
    section.innerHTML = `
      <button class="giodefaultimgeditor-filter-toggle-btn" id="${this.idToggleBtn}">
        Escala de Grises
      </button>
      <div class="giodefaultimgeditor-filter-controls" id="${this.prefix}_grayscale_controls">
      </div>
    `;
    parentElement.appendChild(section);
    this.controlsContainer = document.getElementById(`${this.prefix}_grayscale_controls`);
    document.getElementById(this.idToggleBtn).addEventListener('click', () => this.toggle());
    this._createControls();
  }

  _createControls() {
    const onChange = () => this.isActive && this.onUpdate?.();

    this.controls.intensity = new GioUISliderBasico(
      this.controlsContainer, 0, 100, { onChange },
      `${this.prefix}_grayscale_intensity`, 'Intensidad', 100, 1
    );
  }

  toggle() {
    this.isActive = !this.isActive;
    if (this.controlsContainer) {
      this.controlsContainer.style.display = this.isActive ? 'block' : 'none';
    }
    const btn = document.getElementById(this.idToggleBtn);
    btn?.classList.toggle('giodefaultimgeditor-active', this.isActive);
    this.onUpdate?.();
  }

  applyFilter(imageData) {
    if (!this.isActive) return imageData;

    const intensity = this.controls.intensity.getValue();
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const gray = (r * 0.299 + g * 0.587 + b * 0.114);

      data[i] = r + (gray - r) * (intensity / 100);
      data[i + 1] = g + (gray - g) * (intensity / 100);
      data[i + 2] = b + (gray - b) * (intensity / 100);
    }
    return imageData;
  }
}

class GLFXFilterManager {
  constructor(onUpdate, idPrefix) {
    this.prefix = idPrefix;
    this.idSection = `${this.prefix}_glfx_sect`;
    this.idToggleBtn = `${this.prefix}_glfx_toggle_btn`;
    this.idFilterSelect = `${this.prefix}_glfx_filter_select`;
    this.onUpdate = onUpdate;
    this.isActive = false;
    this.controlsContainer = null;
    this.currentFilterControls = null;
    this.currentFilter = null;
    this.controls = {};
    this.glfxCanvas = null;
    this.glfxTexture = null;
    this.filterDefinitions = {
      'brightnessContrast': {
        name: 'Brightness / Contrast',
        category: 'adjust',
        params: [
          { id: 'brightness', label: 'Brillo', min: -1, max: 1, default: 0, step: 0.01 },
          { id: 'contrast', label: 'Contraste', min: -1, max: 1, default: 0, step: 0.01 }
        ]
      },
      'hueSaturation': {
        name: 'Hue / Saturation',
        category: 'adjust',
        params: [
          { id: 'hue', label: 'Matiz', min: -1, max: 1, default: 0, step: 0.01 },
          { id: 'saturation', label: 'Saturacion', min: -1, max: 1, default: 0, step: 0.01 }
        ]
      },
      'vibrance': {
        name: 'Vibrance',
        category: 'adjust',
        params: [
          { id: 'amount', label: 'Cantidad', min: -1, max: 1, default: 0.5, step: 0.01 }
        ]
      },
      'denoise': {
        name: 'Denoise',
        category: 'adjust',
        params: [
          { id: 'exponent', label: 'Exponente', min: 0, max: 50, default: 20, step: 1 }
        ]
      },
      'unsharpMask': {
        name: 'Unsharp Mask',
        category: 'adjust',
        params: [
          { id: 'radius', label: 'Radio', min: 0, max: 200, default: 20, step: 1 },
          { id: 'strength', label: 'Fuerza', min: 0, max: 5, default: 2, step: 0.1 }
        ]
      },
      'noise': {
        name: 'Noise',
        category: 'adjust',
        params: [
          { id: 'amount', label: 'Cantidad', min: 0, max: 1, default: 0.5, step: 0.01 }
        ]
      },
      'sepia': {
        name: 'Sepia',
        category: 'adjust',
        params: [
          { id: 'amount', label: 'Cantidad', min: 0, max: 1, default: 1, step: 0.01 }
        ]
      },
      'vignette': {
        name: 'Vignette',
        category: 'adjust',
        params: [
          { id: 'size', label: 'Tamano', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'amount', label: 'Cantidad', min: 0, max: 1, default: 0.5, step: 0.01 }
        ]
      },
      'zoomBlur': {
        name: 'Zoom Blur',
        category: 'blur',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'strength', label: 'Fuerza', min: 0, max: 1, default: 0.3, step: 0.01 }
        ]
      },
      'triangleBlur': {
        name: 'Triangle Blur',
        category: 'blur',
        params: [
          { id: 'radius', label: 'Radio', min: 0, max: 200, default: 50, step: 1 }
        ]
      },
      'tiltShift': {
        name: 'Tilt Shift',
        category: 'blur',
        params: [
          { id: 'startX', label: 'Inicio X', min: 0,
          max: 1, default: 0.15, step: 0.01 },
          { id: 'startY', label: 'Inicio Y', min: 0, max: 1, default: 0.75, step: 0.01 },
          { id: 'endX', label: 'Fin X', min: 0, max: 1, default: 0.85, step: 0.01 },
          { id: 'endY', label: 'Fin Y', min: 0, max: 1, default: 0.25, step: 0.01 },
          { id: 'blurRadius', label: 'Radio Blur', min: 0, max: 50, default: 15, step: 1 },
          { id: 'gradientRadius', label: 'Radio Gradiente', min: 0, max: 400, default: 200, step: 1 }
        ]
      },
      'lensBlur': {
        name: 'Lens Blur',
        category: 'blur',
        params: [
          { id: 'radius', label: 'Radio', min: 0, max: 50, default: 10, step: 1 },
          { id: 'brightness', label: 'Brillo', min: -1, max: 1, default: 0.75, step: 0.01 },
          { id: 'angle', label: 'Angulo', min: 0, max: 6.28, default: 0, step: 0.01 }
        ]
      },
      'swirl': {
        name: 'Swirl',
        category: 'warp',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'radius', label: 'Radio', min: 0, max: 600, default: 200, step: 1 },
          { id: 'angle', label: 'Angulo', min: -25, max: 25, default: 3, step: 0.1 }
        ]
      },
      'bulgePinch': {
        name: 'Bulge / Pinch',
        category: 'warp',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'radius', label: 'Radio', min: 0, max: 600, default: 200, step: 1 },
          { id: 'strength', label: 'Fuerza', min: -1, max: 1, default: 0.5, step: 0.01 }
        ]
      },
      'ink': {
        name: 'Ink',
        category: 'fun',
        params: [
          { id: 'strength', label: 'Fuerza', min: 0, max: 1, default: 0.25, step: 0.01 }
        ]
      },
      'edgeWork': {
        name: 'Edge Work',
        category: 'fun',
        params: [
          { id: 'radius', label: 'Radio', min: 0, max: 200, default: 2, step: 1 }
        ]
      },
      'hexagonalPixelate': {
        name: 'Hexagonal Pixelate',
        category: 'fun',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'scale', label: 'Escala', min: 1, max: 100, default: 10, step: 1 }
        ]
      },
      'dotScreen': {
        name: 'Dot Screen',
        category: 'fun',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'angle', label: 'Angulo', min: 0, max: 6.28, default: 1.1, step: 0.01 },
          { id: 'size', label: 'Tamano', min: 1, max: 50, default: 3, step: 0.1 }
        ]
      },
      'colorHalftone': {
        name: 'Color Halftone',
        category: 'fun',
        params: [
          { id: 'centerX', label: 'Centro X', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'centerY', label: 'Centro Y', min: 0, max: 1, default: 0.5, step: 0.01 },
          { id: 'angle', label: 'Angulo', min: 0, max: 6.28, default: 1.1, step: 0.01 },
          { id: 'size', label: 'Tamano', min: 1, max: 50, default: 4, step: 0.1 }
        ]
      }
    };
  }

  createUI(parentElement) {
    const section = document.createElement('div');
    section.id = this.idSection;
    section.className = 'giodefaultimgeditor-filter-section';
    const selectHTML = this._generateSelectHTML();
    section.innerHTML = `
      <button class="giodefaultimgeditor-filter-toggle-btn" id="${this.idToggleBtn}">
        GLFX
      </button>
      <div class="giodefaultimgeditor-filter-controls" id="${this.prefix}_glfx_controls">
        <div class="giodefaultimgeditor-filter-select-wrapper">
          <label class="giodefaultimgeditor-filter-select-label">Select Filter:</label>
          <select id="${this.idFilterSelect}" class="giodefaultimgeditor-filter-select">
            <option value="">-- None --</option>
            ${selectHTML}
          </select>
        </div>
        <div id="${this.prefix}_glfx_dynamic_controls"></div>
      </div>
    `;
    parentElement.appendChild(section);
    this.controlsContainer = document.getElementById(`${this.prefix}_glfx_controls`);
    this.currentFilterControls = document.getElementById(`${this.prefix}_glfx_dynamic_controls`);
    document.getElementById(this.idToggleBtn).addEventListener('click', () => this.toggle());
    document.getElementById(this.idFilterSelect).addEventListener('change', e => {
      this._onFilterChange(e.target.value);
    });
  }

  _generateSelectHTML() {
    const categories = {
      adjust: '---- Adjust -----',
      blur: '---- Blur -----',
      warp: '---- Warp -----',
      fun: '---- Fun -----'
    };
    let html = '';
    for (const [catKey, catLabel] of Object.entries(categories)) {
      html += `<option disabled="true">${catLabel}</option>`;
      for (const [filterKey, filterDef] of Object.entries(this.filterDefinitions)) {
        if (filterDef.category === catKey) {
          html += `<option value="${filterKey}">${filterDef.name}</option>`;
        }
      }
    }
    return html;
  }

  _onFilterChange(filterKey) {
    if (this.currentFilterControls) {
      this.currentFilterControls.innerHTML = '';
    }
    for (const key in this.controls) {
      this.controls[key]?.destroy();
    }
    this.controls = {};
    if (!filterKey) {
      this.currentFilter = null;
      this.onUpdate?.();
      return;
    }
    this.currentFilter = filterKey;
    const filterDef = this.filterDefinitions[filterKey];
    if (!filterDef) return;
    const onChange = () => this.isActive && this.onUpdate?.();
    filterDef.params.forEach(param => {
      const sliderId = `${this.prefix}_glfx_${filterKey}_${param.id}`;
      this.controls[param.id] = new GioUISliderBasico(
        this.currentFilterControls,
        param.min,
        param.max,
        { onChange },
        sliderId,
        param.label,
        param.default,
        param.step
      );
    });
    this.onUpdate?.();
  }

  toggle() {
    this.isActive = !this.isActive;
    if (this.controlsContainer) {
      this.controlsContainer.style.display = this.isActive ? 'block' : 'none';
    }
    const btn = document.getElementById(this.idToggleBtn);
    btn?.classList.toggle('giodefaultimgeditor-active', this.isActive);
    this.onUpdate?.();
  }

  initGLFX(width, height) {
    try {
      this.glfxTexture?.destroy();
      this.glfxTexture = null;
      this.glfxCanvas = fx.canvas();
      this.glfxCanvas.width = width;
      this.glfxCanvas.height = height;
    } catch (e) {
      console.error('Error initializing GLFX:', e);
      this.glfxCanvas = null;
    }
  }

  applyFilter(sourceCanvas) {
    if (!this.isActive || !this.currentFilter || !this.glfxCanvas) {
      return sourceCanvas;
    }

    try {
      if (this.glfxCanvas.width !== sourceCanvas.width || this.glfxCanvas.height !== sourceCanvas.height) {
        this.initGLFX(sourceCanvas.width, sourceCanvas.height);
      }

      this.glfxTexture?.destroy();
      this.glfxTexture = this.glfxCanvas.texture(sourceCanvas);

      this.glfxCanvas.draw(this.glfxTexture);

      const filterDef = this.filterDefinitions[this.currentFilter];
      if (!filterDef) return sourceCanvas;

      const params = filterDef.params.map(param => {
        const value = this.controls[param.id]?.getValue() ?? param.default;
        if (['centerX', 'startX', 'endX'].includes(param.id)) {
          return value * this.glfxCanvas.width;
        } else if (['centerY', 'startY', 'endY'].includes(param.id)) {
          return value * this.glfxCanvas.height;
        } else {
          return value;
        }
      });

      this.glfxCanvas[this.currentFilter](...params);
      this.glfxCanvas.update();

      return this.glfxCanvas;
    } catch (e) {
      console.error('Error applying GLFX filter:', e);
      return sourceCanvas;
    }
  }
}

class FilterManager {
  constructor(idPrefix) {
    this.prefix = idPrefix;
    this.idCanvas = `${this.prefix}_canvas`;
    this.idFiltersContainer = `${this.prefix}_filters_container`;
    this.canvas = null;
    this.ctx = null;
    this.originalImage = null;
    this.imageLoader = null;
    this.carbonFilter = null;
    this.glfxManager = null;
    this.escalaDeGrisFilter = null;
    this.tempCanvas = null;
    this.tempCtx = null;
  }

  init() {
    this.canvas = document.getElementById(this.idCanvas);
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });

    this.tempCanvas = document.createElement('canvas');
    this.tempCtx = this.tempCanvas.getContext('2d', { willReadFrequently: true });

    this.imageLoader = new ImageLoader({
      onImageLoad: img => this._onImageLoaded(img)
    }, this.prefix);

    this.imageLoader.init();

    const filtersContainer = document.getElementById(this.idFiltersContainer);

    this.carbonFilter = new CarbonDrawingFilter(this.canvas, () => this._updateCanvas(), this.prefix);
    this.carbonFilter.createUI(filtersContainer);

    this.glfxManager = new GLFXFilterManager(() => this._updateCanvas(), this.prefix);
    this.glfxManager.createUI(filtersContainer);

    this.escalaDeGrisFilter = new EscalaDeGrisFilter(this.canvas, () => this._updateCanvas(), this.prefix);
    this.escalaDeGrisFilter.createUI(filtersContainer);
  }

  async setImage(imageSource) {
    let img = new Image();
    if (typeof imageSource === 'string') {
      img.crossOrigin = 'anonymous';
      img.src = imageSource;
      await img.decode();
    } else if (imageSource instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(imageSource);
      await new Promise(resolve => reader.onload = () => {
        img.src = reader.result;
        resolve();
      });
      await img.decode();
    } else if (imageSource instanceof HTMLImageElement) {
      img = imageSource;
    } else if (imageSource instanceof ImageData) {
      this.tempCanvas.width = imageSource.width;
      this.tempCanvas.height = imageSource.height;
      this.tempCtx.putImageData(imageSource, 0, 0);
      img.src = this.tempCanvas.toDataURL();
      await img.decode();
    } else if (imageSource instanceof HTMLCanvasElement) {
      img.src = imageSource.toDataURL();
      await img.decode();
    } else {
      console.error("Unsupported image source type.");
      return;
    }
    this._onImageLoaded(img);
  }

  _onImageLoaded(img) {
    this.originalImage = img;
    this._resizeCanvas(img);
    this._updateCanvas();
  }

  _resizeCanvas(img) {
    const maxWidth = window.innerWidth > 768 ? 1200 : window.innerWidth - 40;
    const maxHeight = window.innerHeight - 120;
    let width = img.width;
    let height = img.height;
    const aspectRatio = width / height;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    this.canvas.width = width;
    this.canvas.height = height;
    this.tempCanvas.width = width;
    this.tempCanvas.height = height;

    if (this.glfxManager.isActive) {
      this.glfxManager.initGLFX(width, height);
    }
  }

  _updateCanvas() {
    if (!this.originalImage) return;

    try {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.originalImage, 0, 0, this.canvas.width, this.canvas.height);

      if (this.escalaDeGrisFilter.isActive) {
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        imageData = this.escalaDeGrisFilter.applyFilter(imageData);
        this.ctx.putImageData(imageData, 0, 0);
      }

      if (this.carbonFilter.isActive) {
        let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        imageData = this.carbonFilter.applyFilter(imageData);
        this.ctx.putImageData(imageData, 0, 0);
      }

      if (this.glfxManager.isActive && this.glfxManager.currentFilter) {
        if (!this.glfxManager.glfxCanvas) {
          this.glfxManager.initGLFX(this.canvas.width, this.canvas.height);
        }

        const resultCanvas = this.glfxManager.applyFilter(this.canvas);

        if (resultCanvas && resultCanvas !== this.canvas) {
          this.ctx.drawImage(resultCanvas, 0, 0);
        }
      }
    } catch (error) {
      console.error('Error updating canvas:', error);
    }
  }
}

class AppEditorDefaultImg {
  constructor(parentElement, idGenerico, textEdi = "Gio", event = {}) {
    this.idGenerico = idGenerico;
    this.parentElement = parentElement;
    this.textoedi = textEdi;
 
      this.parentElement=document.createElement("div"); 
   this.parentElement.id=idGenerico+"idSoporteApp";
   this.parentElement.classList.add('aps');
     document.body.appendChild(   this.parentElement);
      

    const appHTML = `
      <div class="giodefaultimgeditor-app-container">
        <button class="giodefaultimgeditor-hamburger-btn" id="${this.idGenerico}_hamburger_btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div class="giodefaultimgeditor-sidebar" id="${this.idGenerico}_sidebar">
          <div class="giodefaultimgeditor-sidebar-header">
            <div class="giodefaultimgeditor-sidebar-titl giodefaultimgeditor-classlesfttext" id="${this.idGenerico}textoedi">${this.textoedi}</div>
            <div class="giodefaultimgeditor-sidebar-subtitle giodefaultimgeditor-classlesfttextR">Load and apply professional effects</div>
          </div>

          <div class="giodefaultimgeditor-upload-section">
            <button class="giodefaultimgeditor-upload-btn giodefaultimgeditor-upload-btn-primary" id="${this.idGenerico}_upload_btn">
              Upload Image
            </button>
            <button class="giodefaultimgeditor-upload-btn giodefaultimgeditor-upload-btn-secondary" id="${this.idGenerico}_paste_btn">
              Paste
            </button>
            <button class="giodefaultimgeditor-upload-btn giodefaultimgeditor-upload-btn-secondary" id="${this.idGenerico}closeImageEditor">
              Close
            </button>
            <input type="file" class="giodefaultimgeditor-file-input" id="${this.idGenerico}_file_input" accept="image/*">
            <div class="giodefaultimgeditor-upload-info">Drag an image or use Ctrl+V</div>
          </div>

          <div class="giodefaultimgeditor-filters-title">Available Filters</div>
          <div id="${this.idGenerico}_filters_container"></div>
        </div>

        <div class="giodefaultimgeditor-main-content" id="${this.idGenerico}_main_content">
          <div class="giodefaultimgeditor-canvas-wrapper">
            <canvas class="giodefaultimgeditor-canvas" id="${this.idGenerico}_canvas" width="800" height="600"></canvas>
          </div>
        </div>

        <div class="giodefaultimgeditor-drop-zone" id="${this.idGenerico}_drop_zone">
          <div class="giodefaultimgeditor-drop-message">Drop the image here</div>
        </div>
      </div>
    `;

    this.parentElement.innerHTML = appHTML;

    this.sidebar = document.getElementById(`${this.idGenerico}_sidebar`);
    this.hamburgerBtn = document.getElementById(`${this.idGenerico}_hamburger_btn`);
    this.mainContent = document.getElementById(`${this.idGenerico}_main_content`);

    this.hamburgerBtn.addEventListener('click', () => this.toggleSidebar());

    this.filterManager = new FilterManager(this.idGenerico);
    this.filterManager.init();
    this.LabelEdit = document.getElementById(`${this.idGenerico}textoedi`);
    this.botonCloseEditor = document.getElementById(`${this.idGenerico}closeImageEditor`);
    this.botonCloseEditor.onclick = (e) => {
     
      this.closeappf();
    }
    this._initResponsive();
  }
  openappf=()=>{
     const soporteApp =this.parentElement;
        soporteApp.style.display = soporteApp.style.display === 'none' ? 'block' : 'none';  
  }
closeappf= (e) => {
      var soporteApp = this.parentElement;
      soporteApp.style.display = soporteApp.style.display === 'none' ? 'block' : 'none';
    }
  _initResponsive() {
    this._handleResize();
    window.addEventListener('resize', () => this._handleResize());
  }

  _handleResize() {
    if (window.innerWidth <= 768) {
      this.sidebar.classList.add('hidden');
      this.hamburgerBtn.classList.remove('active');
      this.mainContent.classList.add('sidebar-hidden');
    } else {
      this.sidebar.classList.remove('hidden');
      this.hamburgerBtn.classList.remove('active');
      this.mainContent.classList.remove('sidebar-hidden');
    }
  }

  toggleSidebar() {
    this.sidebar.classList.toggle('hidden');
    this.hamburgerBtn.classList.toggle('active');
    this.mainContent.classList.toggle('sidebar-hidden');
  }

  async setImage(imageSource) {
    await this.filterManager.setImage(imageSource);
  }
}

window.appEditorgioBasico = null;
document.addEventListener('DOMContentLoaded', () => {
 
  window.appEditorgioBasico = new AppEditorDefaultImg( 'app1', "Edit");
  setTimeout(() => {
      window.appEditorgioBasico .closeappf();
  }, 100);
});   
/* fin de filtros efectfgx otros */

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    class Toolsjs {
      applyStylesToElement = (element, stylesObject) => {
        for (const property in stylesObject) {
          if (stylesObject.hasOwnProperty(property)) {
            element.style[property] = stylesObject[property];
          }
        }
      }

      applyStylesFromString = (element, cssString) => {
        let cleanCssString = cssString.trim().slice(1, -1);
        const stylesObject = {};
        const declarations = cleanCssString.split(';').filter(Boolean);

        declarations.forEach(decl => {
          const parts = decl.split(':').map(part => part.trim());
          if (parts.length === 2) {
            const propertyName = this._kebabCaseToCamelCase(parts[0]);
            stylesObject[propertyName] = parts[1];
          }
        });

        this.applyStylesToElement(element, stylesObject);
      }

      _kebabCaseToCamelCase = (s) => {
        return s.replace(/-./g, x => x[1].toUpperCase());
      }
    }


    let toolsjs = new Toolsjs();



    class BackgroundRemover {
      constructor(toolsjs) {
        this.canvas = null;
        this.ctx = null;
        this.toolsjs = toolsjs;
        this.loading = this.crearElementoDeCarga();
        this.removeBackgroundLib = null;
        this.canvas2 = document.createElement("canvas");
      }

      crearElementoDeCarga() {
        const loading = document.createElement("div");
        loading.innerHTML = "⌛";
        loading.style.position = "fixed";
        loading.style.bottom = "20px";
        loading.style.right = "20px";
        loading.style.width = "80px";
        loading.style.height = "80px";
        loading.style.fontSize = "40px";
        loading.style.backgroundColor = "#00000093";
        loading.style.borderRadius = "15px";
        loading.style.color = "#ffffff";
        loading.style.display = "flex";
        loading.style.justifyContent = "center";
        loading.style.alignItems = "center";
        loading.style.zIndex = "10000";
        loading.style.display = "none";

        document.body.appendChild(loading);
        return loading;
      }

      async cargarLibreria() {
        if (!this.removeBackgroundLib) {
          console.log("Cargando librería @imgly/background-removal...");
          const modulo = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.6.0/+esm');
          this.removeBackgroundLib = modulo.removeBackground;
          console.log("Librería cargada.");
        }
        return this.removeBackgroundLib;
      }

      async remove(inputCanvas) {
        this.canvas = inputCanvas;
        this.ctx = this.canvas.getContext("2d");

        this.canvas2.width = this.canvas.width;
        this.canvas2.height = this.canvas.height;
        let ctx2 = this.canvas2.getContext("2d");

        this.loading.style.display = 'flex';
        console.log("Iniciando eliminación de fondo...");

        try {
          const removeBackground = await this.cargarLibreria();

          const ancho = this.canvas.width;
          const alto = this.canvas.height;

          const imagenOriginalData = this.ctx.getImageData(0, 0, ancho, alto);
          const pixelesOriginales = imagenOriginalData.data;

          const blobActual = await new Promise((resolve) => {
            this.canvas.toBlob(resolve);
          });

          const blobSinFondo = await removeBackground(blobActual);

          const imgAI = new Image();
          const url = URL.createObjectURL(blobSinFondo);

          await new Promise((resolve, reject) => {
            imgAI.onload = () => {
              this.ctx.clearRect(0, 0, ancho, alto);
              this.ctx.drawImage(imgAI, 0, 0, ancho, alto);

              const aiImageData = this.ctx.getImageData(0, 0, ancho, alto);
              const aiPixeles = aiImageData.data;

              for (let i = 0; i < pixelesOriginales.length; i += 4) {
                if (pixelesOriginales[i + 3] === 0) {
                  aiPixeles[i + 3] = 0;
                }
              }

              this.ctx.putImageData(aiImageData, 0, 0);
              ctx2.putImageData(aiImageData, 0, 0);

              URL.revokeObjectURL(url);
              resolve();
            };

            imgAI.onerror = (error) => {
              URL.revokeObjectURL(url);
              reject(new Error("Error al cargar la imagen procesada"));
            };

            imgAI.src = url;
          });

          console.log("Fondo eliminado con éxito.");
          return this.canvas2;

        } catch (error) {
          console.error("Error al remover fondo:", error);
          alert("Error al remover el fondo: " + error.message);
          throw error;
        } finally {
          this.loading.style.display = 'none';
        }
      }

      async removeAndGetResultados(opciones = {}) {
        const {
          returnCanvas = true,
          returnImageData = false,
          returnBlob = false,
          blobFormat = 'image/png',
          blobQuality = 1.0
        } = opciones;

        this.loading.style.display = 'flex';

        try {
          if (!this.canvas || !this.ctx) {
            throw new Error("No hay un canvas de entrada configurado para procesar.");
          }
          const processedCanvas = await this.remove(this.canvas);
          const resultados = {};

          if (returnCanvas) {
            resultados.canvas = processedCanvas;
          }

          if (returnImageData) {
            const ancho = processedCanvas.width;
            const alto = processedCanvas.height;
            resultados.imageData = processedCanvas.getContext("2d").getImageData(0, 0, ancho, alto);
          }

          if (returnBlob) {
            resultados.blob = await new Promise((resolve) => {
              processedCanvas.toBlob(resolve, blobFormat, blobQuality);
            });
          }


          const keys = Object.keys(resultados);
          if (keys.length === 1) {
            return resultados[keys[0]];
          }

          return resultados;

        } finally {
          this.loading.style.display = 'none';
        }
      }


      limpiar() {
        if (this.loading && this.loading.parentNode) {
          this.loading.parentNode.removeChild(this.loading);
        }
      }
    }
    class MathCanvas {
      constructor() {
        this.currentCanvas = null;
        this.arrayCanvas = [];
        this.count = 0;
        document.onpaste = this.pasteTodcument;
         document.addEventListener('click', (e) => {
      if (this.toolsDiv && !this.toolsDiv.contains(e.target) && !e.target.closest('.bodercolorcanvas')) {
        this.toolsDiv.style.display = 'none';
        this.removeCssClassFromAllElements("canvasactivocss");
         this.removecssClass(this.menuDefault,"shomenudefaul2025");
 this.addCssClassToElement( this.menuDefault,"displayNonedc2025");
      }
    });
    this.initializeToolsDiv();
    this.menuDefault=document.getElementById("idbtonesparacanvsa");
        if(! this.menuDefault){
document.getElementById("idbtonesparacanvsa");
this.menuDefault=document.createElement("div");
this.menuDefault.id="idbtonesparacanvsa";
 this.addCssClassToElement(this.menuDefault,"displayNonedc2025");
 document.body.appendChild(this.menuDefault);
        }
      }
addCssClassToElement=(element, classNameToAdd) =>{
  
  if (element instanceof Element) { 
    element.classList.add(classNameToAdd);
  }  
}
      removeCssClassFromAllElements=(classNameToRemove) =>{   
  const elements = document.querySelectorAll(`.${classNameToRemove}`); 
  elements.forEach(element => {
    element.classList.remove(classNameToRemove);
  });
}
      pasteTodcument=(e)=>{
        
          const items = e.clipboardData.items;
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.startsWith('image/')) {
              const blob = items[i].getAsFile();

              const reader = new FileReader();
              reader.onload =   (event)=> {
                this.loadImageToCanvas(this.currentCanvas, event.target.result);
              };
              reader.readAsDataURL(blob);
              return;
            }
          }
          const text = e.clipboardData.getData('text/plain');
          if (text && (text.startsWith('http://') || text.startsWith('https://')) && /\.(jpeg|jpg|gif|png|webp|bmp)$/i.test(text)) {
           
          }

      }
      getAllcanvasPage() {this.arrayCanvas = { ...document.getElementsByTagName("canvas") }   }
       initializeToolsDiv() {
    this.toolsDiv = document.getElementById('canvas-tools-panel');
    if (!this.toolsDiv) {
      this.toolsDiv = document.createElement('div');
      this.toolsDiv.id = 'canvas-tools-panel';
      Object.assign(this.toolsDiv.style, {
        position: 'absolute',
        width: '120px',
        height: '270px',
        backgroundColor: '#323232',
        overflowY: 'auto',
        display: 'none',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        padding: '5px',
        boxSizing: 'border-box',
        zIndex: '1000'
      });
      document.body.appendChild(this.toolsDiv);

      for (let i = 0; i < 3; i++) {
        const button = document.createElement('button');
        button.textContent = `Herramienta ${i + 1}`;
        Object.assign(button.style, {
          margin: '5px 0',
          padding: '8px',
          backgroundColor: '#555',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        });
        button.onmouseover = () => button.style.backgroundColor = '#777';
        button.onmouseout = () => button.style.backgroundColor = '#555';
        this.toolsDiv.appendChild(button);
      }
    }
  }

  positionToolsDiv(targetCanvas) {
    if (!this.toolsDiv || !targetCanvas) return;

    const rect = targetCanvas.getBoundingClientRect();

    const newLeft = rect.left - this.toolsDiv.offsetWidth;
    const newTop = rect.top;

    Object.assign(this.toolsDiv.style, {
      left: `${newLeft}px`,
      top: `${newTop + window.scrollY}px`,
      display: 'flex'
    });

    this.removecssClass(this.menuDefault,"displayNonedc2025");
 this.addCssClassToElement( this.menuDefault,"shomenudefaul2025");
     
  }
  removecssClass=(e,classNameToRemove)=>{
    e.classList.remove(classNameToRemove);
  };

  clickTocanvasArray = (callback) => {
    this.count = 0;

    Object.values(this.arrayCanvas).forEach(element => {
      this.addCssClassToElement(element, "bodercolorcanvas");

      element.onclick = (e) => {
        this.removeCssClassFromAllElements("canvasactivocss");

        this.currentCanvas = element;
        this.addCssClassToElement(element, "canvasactivocss");

        this.positionToolsDiv(element);

        if (callback) {
          callback(element);
        }
      }
    });

    
  }

      clickTocanvasArray = (callback) => {
        this.count = 0;
        console.log(this.arrayCanvas, ' this.arrayCanvas f');
        Object.values(this.arrayCanvas).forEach(element => {
             this.addCssClassToElement(element,"bodercolorcanvas" )  

          element.onclick = (e) => {
            this.removeCssClassFromAllElements("canvasactivocss");
            this.currentCanvas = element;
            this.addCssClassToElement(element,"canvasactivocss" );
            this.positionToolsDiv(element);  
            if (callback) { callback(element); }
            
          }

        });

      }
      BotonpasteImg = async (canvas = this.currentCanvas) => {
        try {
          const clipboardItems = await navigator.clipboard.read();

          for (const clipboardItem of clipboardItems) {
            for (const type of clipboardItem.types) {
              if (type.startsWith('image/')) {
                const blob = await clipboardItem.getType(type);
                const url = URL.createObjectURL(blob);

                this.loadImageToCanvas(canvas, url)
                return;
              }
            }
          }

       

        } catch (error) {
   
        }
      }
      loadImageToCanvas = async (canvas, imageSource) => {
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error('The first argument must be an HTMLCanvasElement.');
  }

  const ctx = canvas.getContext('2d');
  // No limpiar el canvas aquí, ya que su tamaño cambiará.

  return new Promise((resolve, reject) => {
    const drawOnCanvas = (img) => {
      // Redimensionar el canvas para que coincida con las dimensiones de la imagen
      canvas.width = img.width;
      canvas.height = img.height;

      // Limpiar el canvas *después* de cambiar su tamaño
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dibujar la imagen en el canvas a su tamaño original
      ctx.drawImage(img, 0, 0);
      resolve(canvas);
    };

    if (imageSource instanceof ImageData) {
      // En el caso de ImageData, la imagen ya tiene un tamaño inherente
      canvas.width = imageSource.width;
      canvas.height = imageSource.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(imageSource, 0, 0);
      resolve(canvas);
    } else if (imageSource instanceof HTMLImageElement ||
      imageSource instanceof HTMLVideoElement ||
      imageSource instanceof HTMLCanvasElement ||
      imageSource instanceof ImageBitmap) {
      drawOnCanvas(imageSource);
    } else if (imageSource instanceof File || imageSource instanceof Blob) {
      const url = URL.createObjectURL(imageSource);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        drawOnCanvas(img);
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject('Error loading image from File/Blob.');
      };
      img.src = url;
    } else if (typeof imageSource === 'string') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => drawOnCanvas(img);
      img.onerror = () => reject('Error loading image from URL.');
      img.src = imageSource;
    } else if (imageSource instanceof Event && imageSource.dataTransfer && imageSource.dataTransfer.files.length > 0) {
      const file = imageSource.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        drawOnCanvas(img);
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject('Error loading image from Drag and Drop event.');
      };
      img.src = url;
    } else if (imageSource instanceof HTMLInputElement && imageSource.type === 'file' && imageSource.files.length > 0) {
      const file = imageSource.files[0];
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        drawOnCanvas(img);
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject('Error loading image from file input.');
      };
      img.src = url;
    } else {
      reject('Unsupported or invalid image source type.');
    }
  });
}

      setupCanvasDragAndDrop = (canvas) => {
        if (!(canvas instanceof HTMLCanvasElement)) {
          console.error('El argumento proporcionado no es un elemento HTMLCanvasElement válido.');
          return;
        }

        function preventDefaults(e) {
          e.preventDefault();
          e.stopPropagation();
        }

        function highlight() {
          canvas.classList.add('highlight');
        }

        function unhighlight() {
          canvas.classList.remove('highlight');
        }

        async function handleDrop(e) {
          const dt = e.dataTransfer;
          const files = dt.files;

          if (files.length > 0) {
            const file = files[0];
            try {
              await loadImageToCanvas(canvas, file);

            } catch (error) {
              console.error('Error al cargar la imagen desde Drag & Drop:', error);
            }
          } else {
            console.warn('Ningún archivo fue soltado en el canvas.');
          }
        }

        const listeners = {
          dragenter: [preventDefaults, highlight],
          dragover: [preventDefaults, highlight],
          dragleave: [preventDefaults, unhighlight],
          drop: [preventDefaults, unhighlight, handleDrop]
        };

        for (const eventName in listeners) {
          listeners[eventName].forEach(listener => {
            canvas.addEventListener(eventName, listener, false);
            if (eventName === 'dragenter' || eventName === 'dragover' || eventName === 'dragleave' || eventName === 'drop') {
              document.body.addEventListener(eventName, preventDefaults, false);
            }
          });
        }

        canvas._dragDropListeners = listeners;

        console.log(`Drag & Drop configurado para el canvas: ${canvas.id || 'sin-id'}`);
      }

      removeCanvasDragAndDrop = (canvas) => {
        if (!(canvas instanceof HTMLCanvasElement)) {
          console.error('El argumento proporcionado no es un elemento HTMLCanvasElement válido.');
          return;
        }

        const listeners = canvas._dragDropListeners;

        if (listeners) {
          for (const eventName in listeners) {
            listeners[eventName].forEach(listener => {
              canvas.removeEventListener(eventName, listener, false);
              if (eventName === 'dragenter' || eventName === 'dragover' || eventName === 'dragleave' || eventName === 'drop') {
                document.body.removeEventListener(eventName, listeners.dragenter[0], false); // removeDefaults
              }
            });
          }
          delete canvas._dragDropListeners;
          console.log(`Drag & Drop deshabilitado para el canvas: ${canvas.id || 'sin-id'}`);
        } else {
          console.warn(`No se encontraron listeners de Drag & Drop para el canvas: ${canvas.id || 'sin-id'}`);
        }
      }

      divideColor = (color1) => {
        const maxx0 = Math.max(color1.r, Math.max(color1.g, color1.b)) + 0.00000000001;
        const minx = Math.min(color1.r, Math.min(color1.g, color1.b)).toFixed(4);
        return minx / maxx0;
      };

      getMaxPx = (rgba) => {
        return Math.max(rgba.r, rgba.g, rgba.b);
      };

      getMinPx = (rgba) => {
        return Math.min(rgba.r, rgba.g, rgba.b);
      };

      calculateLineValue = (x1, y1, x2, y2, val) => {
        const dx = x2 - x1 + 0.00000000001;

        const dy = y2 - y1;
        const m = (dy.toFixed(4)) / dx;
        const b = y2 - m * x2;
        return m * val + b;
      };
      clampValue = (v, min = 0, b = max) => {
        if (v < min) return 0.0;
        if (v > max) return 1.0;
        return v;
      };

      applyMathOperation = (rgba, val, operation) => {
        const clampColorValue = (v) => {
          if (v < 0) return 0;
          if (v > 1) return 1;
          return v;
        };

        if (operation === "multiplicar" || operation === "*") {
          rgba.r *= val;
          rgba.r = clampColorValue(rgba.r);
          rgba.g *= val;
          rgba.g = clampColorValue(rgba.g);
          rgba.b *= val;
          rgba.b = clampColorValue(rgba.b);
          return rgba;
        }
        if (operation === "+") {
          rgba.r += val;
          rgba.r = clampColorValue(rgba.r);
          rgba.g += val;
          rgba.g = clampColorValue(rgba.g);
          rgba.b += val;
          rgba.b = clampColorValue(rgba.b);
          return rgba;
        }
        if (operation === "potencia" || operation === "pow") {
          rgba.r = Math.pow(rgba.r, val);
          rgba.r = clampColorValue(rgba.r);
          rgba.g = Math.pow(rgba.g, val);
          rgba.g = clampColorValue(rgba.g);
          rgba.b = Math.pow(rgba.b, val);
          rgba.b = clampColorValue(rgba.b);
          return rgba;
        }
        if (operation === "asigna" || operation === "=") {
          rgba.r = val.r;
          rgba.r = clampColorValue(rgba.r);
          rgba.g = val.g;
          rgba.g = clampColorValue(rgba.g);
          rgba.b = val.b;
          rgba.b = clampColorValue(rgba.b);
          return rgba;
        }
        return rgba;
      };

      saturateColor = (tex_color, ec5) => {
        const maxx = Math.max(tex_color.r, Math.max(tex_color.g, tex_color.b));
        const adjust = ec5;

        if (tex_color.r !== maxx) {
          tex_color.r += (maxx - tex_color.r) * adjust;
        }
        if (tex_color.g !== maxx) {
          tex_color.g += (maxx - tex_color.g) * adjust;
        }
        if (tex_color.b !== maxx) {
          tex_color.b += (maxx - tex_color.b) * adjust;
        }
        return tex_color;
      };

      createColor = () => {
        return {
          r: 0,
          g: 0,
          b: 0,
        };
      };

      drawImageAsLayer = (ctx, image, x, y, width, height) => {
        ctx.save();
        if (width && height) {
          ctx.drawImage(image, x, y, width, height);
        } else {
          ctx.drawImage(image, x, y);
        }
        ctx.restore();
      };

      drawGridLayer = (ctx, columns = 7, rows = 7, color = 'rgba(0, 0, 0, 0.2)') => {
        ctx.save();
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        const cellWidth = canvasWidth / columns;
        const cellHeight = canvasHeight / rows;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        for (let i = 0; i <= columns; i++) {
          const x = i * cellWidth;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvasHeight);
          ctx.stroke();
        }
        for (let i = 0; i <= rows; i++) {
          const y = i * cellHeight;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvasWidth, y);
          ctx.stroke();
        }
        ctx.restore();
      }
      applyCharcoalFilter = (canvas) => {
        let ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        const width = canvas.width;
        const height = canvas.height;
        const output = new Uint8ClampedArray(pixels.length);

        const grayPixels = new Uint8ClampedArray(pixels.length);
        for (let i = 0; i < pixels.length; i += 4) {
          const gray = pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114;
          grayPixels[i] = grayPixels[i + 1] = grayPixels[i + 2] = gray;
          grayPixels[i + 3] = 255;
        }

        const gradients = new Float32Array(width * height);
        const directions = new Float32Array(width * height);

        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;
            const i = idx * 4;

            const gx = (
              -grayPixels[((y - 1) * width + (x - 1)) * 4] - 2 * grayPixels[((y - 1) * width + x) * 4] - grayPixels[((y - 1) * width + (x + 1)) * 4] +
              grayPixels[((y + 1) * width + (x - 1)) * 4] + 2 * grayPixels[((y + 1) * width + x) * 4] + grayPixels[((y + 1) * width + (x + 1)) * 4]
            ) / 8;

            const gy = (
              -grayPixels[((y - 1) * width + (x - 1)) * 4] - 2 * grayPixels[(y * width + (x - 1)) * 4] - grayPixels[((y + 1) * width + (x - 1)) * 4] +
              grayPixels[((y - 1) * width + (x + 1)) * 4] + 2 * grayPixels[(y * width + (x + 1)) * 4] + grayPixels[((y + 1) * width + (x + 1)) * 4]
            ) / 8;

            gradients[idx] = Math.sqrt(gx * gx + gy * gy);
            directions[idx] = Math.atan2(gy, gx);
          }
        }

        let maxGrad = 0;
        for (let i = 0; i < gradients.length; i++) {
          if (gradients[i] > maxGrad) maxGrad = gradients[i];
        }

        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;
            const i = idx * 4;

            const edgeStrength = (gradients[idx] / maxGrad) * 255;
            const brightness = grayPixels[i] / 255;
            const angle = directions[idx];
            const lightDir = Math.PI * 0.75;
            const lightIntensity = (Math.cos(angle - lightDir) + 1) / 2;

            let value;
            if (edgeStrength > 30) {
              value = Math.max(0, 255 - edgeStrength * 1.5);
              value *= (0.3 + brightness * 0.4);
            } else {
              value = 255 - (1 - brightness) * 180;
              value *= (0.85 + lightIntensity * 0.15);
            }

            const noise = (Math.random() - 0.5) * 8;
            value = Math.max(0, Math.min(255, value + noise));

            output[i] = output[i + 1] = output[i + 2] = value;
            output[i + 3] = 255;
          }
        }

        ctx.putImageData(new ImageData(output, width, height), 0, 0);
      }

      getImageData = (canvas, x = 0, y = 0, w, h) => {
        let w1 = w ? w : canvas.width;
        let h1 = h ? h : canvas.height;
        let ctx = canvas.getContext("2d");
        return ctx.getImageData(x, y, w1, h1);
      }
    }



    class CenterImage {
      constructor(htmlParent, idPrefix) {
        this.originImage = null;
      }

      setCanvas(canvas) {
        this.canvas = canvas;
      }

      setOriginImage = (resourceImage) => {
        this.originImage = resourceImage;
      };

      drawCenteredImageWithMargin = (canvas, resolution, imageSource, minMargin = 50) => {
        if (!canvas) {
          return Promise.reject('Canvas not provided');
        }

        if (!imageSource) {
          return Promise.reject('Image source not provided');
        }

        canvas.width = resolution;
        canvas.height = resolution;
        canvas.style.width = '500px';
        canvas.style.height = '500px';

        const ctx = canvas.getContext('2d');

        const drawImage = (imageElement, isImageData = false) => {
          let imgWidth, imgHeight;

          if (isImageData) {
            imgWidth = imageElement.width;
            imgHeight = imageElement.height;
          } else {
            imgWidth = imageElement.naturalWidth || imageElement.videoWidth ||
              imageElement.width || imageElement.offsetWidth;
            imgHeight = imageElement.naturalHeight || imageElement.videoHeight ||
              imageElement.height || imageElement.offsetHeight;
          }

          if (imgWidth <= 0 || imgHeight <= 0) {
            throw new Error(`Invalid image dimensions: ${imgWidth}x${imgHeight}`);
          }

          const availableArea = Math.max(0, resolution - (minMargin * 2));

          if (minMargin * 2 > resolution) {
            minMargin = Math.floor(resolution * 0.1);
          }

          const scaleWidth = availableArea / imgWidth;
          const scaleHeight = availableArea / imgHeight;
          let scale = Math.min(scaleWidth, scaleHeight);

          if (!isFinite(scale) || scale <= 0) {
            scale = 1;
          }

          const scaledImgWidth = imgWidth * scale;
          const scaledImgHeight = imgHeight * scale;

          const posX = (resolution - scaledImgWidth) / 2;
          const posY = (resolution - scaledImgHeight) / 2;

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, resolution, resolution);

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          if (isImageData) {
            const canvasTemp = document.createElement('canvas');
            canvasTemp.width = imgWidth;
            canvasTemp.height = imgHeight;
            const ctxTemp = canvasTemp.getContext('2d');

            ctxTemp.putImageData(imageElement, 0, 0);

            ctx.drawImage(
              canvasTemp,
              0, 0, imgWidth, imgHeight,
              posX, posY, scaledImgWidth, scaledImgHeight
            );
          } else {
            ctx.drawImage(
              imageElement,
              0, 0, imgWidth, imgHeight,
              posX, posY, scaledImgWidth, scaledImgHeight
            );
          }

          return {
            posX,
            posY,
            scaledWidth: scaledImgWidth,
            scaledHeight: scaledImgHeight,
            scale,
            realMargin: {
              left: posX,
              right: posX,
              top: posY,
              bottom: posY
            },
            originalDimensions: {
              width: imgWidth,
              height: imgHeight
            }
          };
        };

        try {
          if (imageSource instanceof ImageData) {
            const result = drawImage(imageSource, true);
            return Promise.resolve(result);

          } else if (imageSource instanceof HTMLImageElement) {
            if (imageSource.complete && imageSource.naturalWidth !== 0) {
              const result = drawImage(imageSource, false);
              return Promise.resolve(result);
            } else {
              return new Promise((resolve, reject) => {
                imageSource.onload = () => {
                  try {
                    const result = drawImage(imageSource, false);
                    resolve(result);
                  } catch (error) {
                    reject(`Error drawing HTMLImageElement: ${error}`);
                  }
                };

                imageSource.onerror = () => {
                  reject('Error loading HTMLImageElement');
                };
              });
            }

          } else if (imageSource instanceof HTMLCanvasElement) {
            const result = drawImage(imageSource, false);
            return Promise.resolve(result);

          } else if (imageSource instanceof HTMLVideoElement) {
            const result = drawImage(imageSource, false);
            return Promise.resolve(result);

          } else if (imageSource instanceof ImageBitmap) {
            const result = drawImage(imageSource, false);
            return Promise.resolve(result);

          } else if (typeof imageSource === 'string') {
            return new Promise((resolve, reject) => {
              const image = new Image();
              image.crossOrigin = 'anonymous';

              image.onload = () => {
                try {
                  const result = drawImage(image, false);
                  resolve(result);
                } catch (error) {
                  reject(`Error drawing image from URL: ${error}`);
                }
              };

              image.onerror = (err) => {
                reject(`Error loading image from: ${imageSource}`);
              };

              image.src = imageSource;
            });

          } else if (imageSource instanceof Blob || imageSource instanceof File) {
            return new Promise((resolve, reject) => {
              const url = URL.createObjectURL(imageSource);
              const image = new Image();

              image.onload = () => {
                try {
                  const result = drawImage(image, false);
                  URL.revokeObjectURL(url);
                  resolve(result);
                } catch (error) {
                  URL.revokeObjectURL(url);
                  reject(`Error drawing Blob/File: ${error}`);
                }
              };

              image.onerror = () => {
                URL.revokeObjectURL(url);
                reject('Error loading Blob/File');
              };

              image.src = url;
            });

          } else {
            return Promise.reject(`Unsupported image source type: ${typeof imageSource}`);
          }
        } catch (error) {
          return Promise.reject(`Error in drawCenteredImageWithMargin: ${error.message}`);
        }
      };

      getImageDataFromSource = (source) => {
        return new Promise((resolve, reject) => {
          if (source instanceof ImageData) {
            resolve(source);
            return;
          }

          this.drawCenteredImageWithMargin(
            document.createElement('canvas'),
            1024,
            source
          ).then((result) => {
            const canvasTemp = document.createElement('canvas');
            canvasTemp.width = result.scaledWidth;
            canvasTemp.height = result.scaledHeight;
            const ctx = canvasTemp.getContext('2d');
            if (source instanceof HTMLImageElement ||
              source instanceof HTMLCanvasElement ||
              source instanceof HTMLVideoElement) {
              ctx.drawImage(source, 0, 0, result.scaledWidth, result.scaledHeight);
            }

            const imageData = ctx.getImageData(0, 0, result.scaledWidth, result.scaledHeight);
            resolve(imageData);
          }).catch(reject);
        });
      };
    }
