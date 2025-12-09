
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
