 class EditorImgz {
    constructor( id=null) {
     
         
        this.container =null;// document.querySelector(containerSelector);
        
this.container=document.getElementById(id);
        
        this.editor = null;
        this.upscaler = null;
        this.backgroundRemoval = null;
        this.editorid='editorimgz-main';

      

 
        this.inyectarEstilosCSS(  'mis-estilos-glfx');
        this.init();
    }
      changeImgUrl(imgurl){
        document.getElementById("editorimgz-image").src=imgurl;
      }

      inyectarEstilosCSS=(  idDeLaHoja) =>{
            let hojaDeEstilos = document.getElementById(idDeLaHoja);
            if (!hojaDeEstilos) {
                hojaDeEstilos = document.createElement('style');
                hojaDeEstilos.id = idDeLaHoja;
                hojaDeEstilos.type = 'text/css';
                document.head.appendChild(hojaDeEstilos);
            }
             var reglasCSS = `
            .glfx-canvas {
                width: 400px;
                height: 400px;
                max-width: 100%;
              
                background-color: #eee;
            }
            #contenedor-principal {
                padding: 20px;
                background-color: #f0f0f0;
                border: 1px solid #ccc;
            }
        `;
            hojaDeEstilos.innerHTML = reglasCSS;
        }

     

    init() {
        this.injectStyles();
        this.createDOMStructure();
        this.loadResources().then(() => {
            this.setupEventHandlers();
            this.initializeCore();
        });
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `.editorimgz-container{font-family:sans-serif;background:#f0f0f0;color:#333;margin:0;padding:20px}.editorimgz-title{text-align:center;color:#111;margin-bottom:20px}.editorimgz-main{ overflow-y: scroll; max-width:1400px;margin:0 auto;display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start;background:white;padding:20px;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.1);border:2px dashed transparent;transition:border-color 0.3s}.editorimgz-main.drag-over{border-color:#007bff}.editorimgz-canvas-wrapper{flex-grow:1;min-width:400px;position:relative}.editorimgz-loader{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.8);z-index:10;display:none;justify-content:center;align-items:center;font-size:1.5em;color:#333;font-weight:bold;border-radius:4px}.editorimgz-canvas{max-width:100%;height:auto;border:1px solid #ddd;border-radius:4px;display:block}.editorimgz-controls{display:flex;flex-direction:column;gap:15px;min-width:320px;flex-basis:320px}.editorimgz-section{background:#f9f9f9;padding:15px;border-radius:4px;border:1px solid #eee}.editorimgz-section h3{margin-top:0;text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;margin-bottom:15px}.editorimgz-section p{font-size:0.9em;text-align:center;color:#555;margin-top:0}.editorimgz-btn{display:block;width:100%;box-sizing:border-box;background-color:#007bff;color:white;padding:10px 15px;border-radius:4px;text-align:center;cursor:pointer;transition:background-color 0.2s;border:none;font-size:1em;margin-bottom:10px}.editorimgz-btn:hover{background-color:#0056b3}.editorimgz-btn-secondary{background-color:#6c757d}.editorimgz-btn-secondary:hover{background-color:#5a6268}.editorimgz-btn-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.editorimgz-file-input{display:none}.editorimgz-filters{width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;background:#fff}.editorimgz-filter-controls{margin-top:10px}.editorimgz-filter{margin-bottom:10px;border-left:3px solid #007bff;padding-left:10px}.editorimgz-filter label{display:block;margin-bottom:5px;font-weight:bold;font-size:0.9em}.editorimgz-filter input[type="range"]{width:100%}`;
        document.head.appendChild(style);
    }

    crearuicongioUI=()=>{

         
          var mainContainerUIGio = document.createElement('div');
          let parent=document.getElementById(this.editorid );
        parent.appendChild(mainContainerUIGio);
        mainContainerUIGio.className = 'clgiobasica';

 

        var botonscalar2x= new GioUI.Button(mainContainerUIGio, { text: 'SC', variant: 'default' },()=>{
            if(confirm("scale img AI")){
            let sx=parseInt(prompt("up scale 2 or 4",2));  if(sx>4){sx=4; alert("change value to 4 "); }     if(sx<2){  sx=2;     alert("change value to 2 ");  }   if(sx==3){   sx=4;    alert("change valu to 4");    }   this.processUpscale(sx)

            }
         });
        var butodremovebg= new GioUI.Button(mainContainerUIGio, { text: 'BG', variant: 'default' },()=>{ this.removeBackground( )});
      

    }

    createDOMStructure() {
        this.container.className = 'editorimgz-container';
        //this.container.innerHTML = '';
        
        const title = document.createElement('h1');
        title.className = 'editorimgz-title';
        title.textContent = 'Editor de Imágenes Pro';
        this.container.appendChild(title);

        const mainContainer = document.createElement('div');
        mainContainer.className =this.editorid;
        mainContainer.id = this.editorid;
        this.container.appendChild(mainContainer);

        const canvasWrapper = document.createElement('div');
        canvasWrapper.className = 'editorimgz-canvas-wrapper';
        mainContainer.appendChild(canvasWrapper);

        const loader = document.createElement('div');
        loader.className = 'editorimgz-loader';
        loader.id = 'editorimgz-loader';
        loader.textContent = 'Procesando...';
        canvasWrapper.appendChild(loader);

        const canvas = document.createElement('canvas');
        canvas.className = 'editorimgz-canvas';
        canvas.id = 'editorimgz-canvas';
        canvas.width = 800;
        canvas.height = 600;
        canvas.style.width = '450px';
        canvas.style.height = '450px';
        canvasWrapper.appendChild(canvas);

        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'editorimgz-controls';
        controlsContainer.id = 'editorimgz-controls';
        mainContainer.appendChild(controlsContainer);

        const hiddenImage = document.createElement('img');
        hiddenImage.crossOrigin = "Anonymous";
        hiddenImage.id = 'editorimgz-image';
        hiddenImage.src = 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/9e/00/b2.jpg';
        hiddenImage.style.display = 'none';
        hiddenImage.crossOrigin = 'anonymous';
        controlsContainer.appendChild(hiddenImage);

        this.createControlSection(controlsContainer, 'Cargar Imagen', 'Sube, arrastra o pega una imagen.', [
            {type: 'file', id: 'editorimgz-file-input', label: 'Seleccionar Archivo'}
        ]);

        this.createControlSection(controlsContainer, 'Operaciones Avanzadas', '', [
            {type: 'button-grid', buttons: [
                {id: 'editorimgz-upscale-2x', text: 'Upscale 2x'},
                {id: 'editorimgz-upscale-4x', text: 'Upscale 4x'}
            ]},
            {type: 'button', id: 'editorimgz-remove-bg', text: 'Eliminar Fondo'}
        ]);

        this.createControlSection(controlsContainer, 'Transformaciones', '', [
            {type: 'button', id: 'editorimgz-invert', text: 'Invertir Colores', secondary: true},
            {type: 'button-grid', buttons: [
                {id: 'editorimgz-flip-x', text: 'Voltear H', secondary: true},
                {id: 'editorimgz-flip-y', text: 'Voltear V', secondary: true}
            ]},
            {type: 'button', id: 'editorimgz-quad', text: 'Cuadruplicar Espejo', secondary: true}
        ]);

        this.createFilterSection(controlsContainer);


        this.crearuicongioUI();
    }

    createControlSection(container, title, description, elements) {
        const section = document.createElement('div');
        section.className = 'editorimgz-section';
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        section.appendChild(titleElement);
        
        if (description) {
            const descElement = document.createElement('p');
            descElement.textContent = description;
            section.appendChild(descElement);
        }

        elements.forEach(element => {
            if (element.type === 'button') {
                const button = document.createElement('button');
                button.id = element.id;
                button.className = element.secondary ? 'editorimgz-btn editorimgz-btn-secondary' : 'editorimgz-btn';
                button.textContent = element.text;
                section.appendChild(button);
            } 
            else if (element.type === 'button-grid') {
                const grid = document.createElement('div');
                grid.className = 'editorimgz-btn-grid';
                element.buttons.forEach(btn => {
                    const button = document.createElement('button');
                    button.id = btn.id;
                    button.className = btn.secondary ? 'editorimgz-btn editorimgz-btn-secondary' : 'editorimgz-btn';
                    button.textContent = btn.text;
                    grid.appendChild(button);
                });
                section.appendChild(grid);
            }
            else if (element.type === 'file') {
                const label = document.createElement('label');
                label.htmlFor = element.id;
                label.className = 'editorimgz-btn file-input-label';
                label.textContent = element.label;
                section.appendChild(label);
                
                const input = document.createElement('input');
                input.type = 'file';
                input.id = element.id;
                input.className = 'editorimgz-file-input';
                input.accept = 'image/*';
                section.appendChild(input);
            }
        });

        container.appendChild(section);
    }

    createFilterSection(container) {
        const section = document.createElement('div');
        section.className = 'editorimgz-section';
        
        const title = document.createElement('h3');
        title.textContent = 'Filtros GLFX';
        section.appendChild(title);
        
        const select = document.createElement('select');
        select.id = 'editorimgz-filters';
        select.className = 'editorimgz-filters';
        section.appendChild(select);
        
        const filterOptions = [
            {value: '', text: '---- Elige un Filtro -----', disabled: true},
            {value: 'original', text: 'Imagen Original'},
            {value: '', text: '---- Ajustes -----', disabled: true},
            {value: 'Brightness / Contrast', text: 'Brightness / Contrast'},
            {value: 'Hue / Saturation', text: 'Hue / Saturation'},
            {value: 'Vibrance', text: 'Vibrance'},
            {value: 'Denoise', text: 'Denoise'},
            {value: 'Unsharp Mask', text: 'Unsharp Mask'},
            {value: 'Noise', text: 'Noise'},
            {value: 'Sepia', text: 'Sepia'},
            {value: 'Vignette', text: 'Vignette'},
            {value: '', text: '---- Desenfoques -----', disabled: true},
            {value: 'Zoom Blur', text: 'Zoom Blur'},
            {value: 'Triangle Blur', text: 'Triangle Blur'},
            {value: 'Tilt Shift', text: 'Tilt Shift'},
            {value: 'Lens Blur', text: 'Lens Blur'},
            {value: '', text: '---- Deformaciones -----', disabled: true},
            {value: 'Swirl', text: 'Swirl'},
            {value: 'Bulge / Pinch', text: 'Bulge / Pinch'},
            {value: 'Perspective', text: 'Perspective'},
            {value: '', text: '---- Diversión -----', disabled: true},
            {value: 'Ink', text: 'Ink'},
            {value: 'Edge Work', text: 'Edge Work'},
            {value: 'Hexagonal Pixelate', text: 'Hexagonal Pixelate'},
            {value: 'Dot Screen', text: 'Dot Screen'},
            {value: 'Color Halftone', text: 'Color Halftone'}
        ];
        
        filterOptions.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.value;
            optElement.textContent = option.text;
            if (option.disabled) {
                optElement.disabled = true;
                if (!option.value) optElement.selected = true;
            }
            select.appendChild(optElement);
        });
        
        const filterControls = document.createElement('div');
        filterControls.id = 'editorimgz-filter-controls';
        filterControls.className = 'editorimgz-filter-controls';
        section.appendChild(filterControls);
        
        container.appendChild(section);
    }

    async loadResources() {
        await this.loadScript('https://evanw.github.io/glfx.js/glfx.js');
        const { removeBackground } = await import('https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.6.0/+esm');
        const Upscaler = await import('https://cdn.jsdelivr.net/npm/upscaler@1.0.0-beta.19/+esm');
        
        this.backgroundRemoval = removeBackground;
        this.upscaler = new Upscaler.default();
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    setupEventHandlers() {
        const mainContainer = document.getElementById('editorimgz-main');
        const fileInput = document.getElementById('editorimgz-file-input');
        const imageElement = document.getElementById('editorimgz-image');
        
        fileInput.addEventListener('change', (e) => {
            if (e.target.files?.[0]) {
                this.loadImageFromFile(e.target.files[0]);
            }
        });

        document.addEventListener('paste', (e) => {
            const items = (e.clipboardData || e.originalEvent.clipboardData).items;
            for (let index in items) {
                const item = items[index];
                if (item.kind === 'file' && item.type.startsWith('image/')) {
                    e.preventDefault();
                    this.loadImageFromFile(item.getAsFile());
                    break;
                }
            }
        });

        mainContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mainContainer.classList.add('drag-over');
        });

        mainContainer.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mainContainer.classList.remove('drag-over');
        });

        mainContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mainContainer.classList.remove('drag-over');
            if (e.dataTransfer.files?.[0]) {
                this.loadImageFromFile(e.dataTransfer.files[0]);
            }
        });

        document.getElementById('editorimgz-upscale-2x').addEventListener('click', () => this.processUpscale(2));
        document.getElementById('editorimgz-upscale-4x').addEventListener('click', () => this.processUpscale(4));
        document.getElementById('editorimgz-remove-bg').addEventListener('click', () => this.removeBackground());
        document.getElementById('editorimgz-invert').addEventListener('click', () => this.editor?.invertColors());
        document.getElementById('editorimgz-flip-x').addEventListener('click', () => this.editor?.flip('x'));
        document.getElementById('editorimgz-flip-y').addEventListener('click', () => this.editor?.flip('y'));
        document.getElementById('editorimgz-quad').addEventListener('click', () => this.quadrupleImage());

        imageElement.onload = () => this.initializeEditor();
    }

    initializeCore() {
        const image = document.getElementById('editorimgz-image');
        if (image.complete && image.naturalHeight !== 0) {
            this.initializeEditor();
        }
    }

    initializeEditor() {
        
var image = document.getElementById('editorimgz-image');
        const canvas = document.getElementById('editorimgz-canvas');
   /*      canvas.style.width="500px";
        canvas.style.height="500px";
        
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight; */

        if(!this.editor ){

            
     /*   let canvasglfx = document.getElementById('editorimgz-canvasglfx');
       if(canvasglfx){canvasglfx.remove()} */
       if(document.getElementById("editorimgz-canvasglfx")){  document.getElementById("editorimgz-canvasglfx").style.width="500px";
         document.getElementById("editorimgz-canvasglfx").style.height="500px";}
       
        try {
            this.editor = new this.GLFXEditor(
                'editorimgz-canvas', 
                'editorimgz-filter-controls', 
                'editorimgz-image', 
                'editorimgz-filters'
            );
            this.editor.applyFilters();  
        } catch (e) {
            console.error('Error initializing editor:', e);
            alert('Tu navegador no soporta WebGL.');
        }
        } 
        else{
            this.editor . updateImage(image);
        }
        
         
    }

    

    GLFXEditor = class {
    constructor(canvasId, controlsId, imageId, filterSelectId) {
        this.canvas = fx.canvas();
        this.originalCanvas = document.getElementById(canvasId);
        this.controlsContainer = document.getElementById(controlsId);
        this.imageElement = document.getElementById(imageId);
        this.filterSelect = document.getElementById(filterSelectId);

        const existingCanvas = this.originalCanvas.parentNode.querySelector('.glfx-canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }

        this.originalCanvas.parentNode.insertBefore(this.canvas, this.originalCanvas);
        this.originalCanvas.style.display = 'none';
        this.canvas.id = this.originalCanvas.id + "glfx";
        this.canvas.width = this.originalCanvas.width;
        this.canvas.height = this.originalCanvas.height;
        this.canvas.style.width="500px";
        this.canvas.style.height="500px";

        this.texture = this.canvas.texture(this.imageElement);
        this.canvas.draw(this.texture).update();

        this.filters = {
            'Brightness / Contrast': [{name: 'Brillo', prop: 'brightness', min: -1, max: 1, value: 0, step: 0.01}, {name: 'Contraste', prop: 'contrast', min: -1, max: 1, value: 0, step: 0.01}],
            'Hue / Saturation': [{name: 'Tono', prop: 'hue', min: -1, max: 1, value: 0, step: 0.01}, {name: 'Saturación', prop: 'saturation', min: -1, max: 1, value: 0, step: 0.01}],
            'Vibrance': [{name: 'Cantidad', prop: 'amount', min: -1, max: 1, value: 0, step: 0.01}],
            'Denoise': [{name: 'Exponente', prop: 'exponent', min: 0, max: 50, value: 20, step: 1}],
            'Unsharp Mask': [{name: 'Radio', prop: 'radius', min: 0, max: 200, value: 20, step: 1}, {name: 'Fuerza', prop: 'strength', min: 0, max: 5, value: 2, step: 0.01}],
            'Noise': [{name: 'Cantidad', prop: 'amount', min: 0, max: 1, value: 0.5, step: 0.01}],
            'Sepia': [{name: 'Cantidad', prop: 'amount', min: 0, max: 1, value: 0.5, step: 0.01}],
            'Vignette': [{name: 'Tamaño', prop: 'size', min: 0, max: 1, value: 0.25, step: 0.01}, {name: 'Cantidad', prop: 'amount', min: 0, max: 1, value: 0.5, step: 0.01}],
            'Zoom Blur': [{name: 'Fuerza', prop: 'strength', min: 0, max: 1, value: 0.3, step: 0.01}],
            'Triangle Blur': [{name: 'Radio', prop: 'radius', min: 0, max: 200, value: 25, step: 1}],
            'Tilt Shift': [{name: 'Radio Desenfoque', prop: 'blurRadius', min: 0, max: 50, value: 15, step: 1}, {name: 'Radio Gradiente', prop: 'gradientRadius', min: 0, max: 400, value: 200, step: 1}],
            'Lens Blur': [{name: 'Radio', prop: 'radius', min: 0, max: 50, value: 4, step: 1}, {name: 'Brillo', prop: 'brightness', min: -1, max: 1, value: 0, step: 0.01}, {name: 'Ángulo', prop: 'angle', min: -Math.PI, max: Math.PI, value: 0, step: 0.01}],
            'Swirl': [{name: 'Radio', prop: 'radius', min: 0, max: 600, value: 200, step: 1}, {name: 'Ángulo', prop: 'angle', min: -10, max: 10, value: 3, step: 0.1}],
            'Bulge / Pinch': [{name: 'Fuerza', prop: 'strength', min: -1, max: 1, value: 0.5, step: 0.01}, {name: 'Radio', prop: 'radius', min: 0, max: 600, value: 200, step: 1}],
            'Perspective': [{name: 'x1', prop: 'x1', min: 0, max: 800, value: 175, step: 1}, {name: 'y1', prop: 'y1', min: 0, max: 600, value: 20, step: 1}, {name: 'x2', prop: 'x2', min: 0, max: 800, value: 625, step: 1}, {name: 'y2', prop: 'y2', min: 0, max: 600, value: 50, step: 1}, {name: 'x3', prop: 'x3', min: 0, max: 800, value: 175, step: 1}, {name: 'y3', prop: 'y3', min: 0, max: 600, value: 580, step: 1}, {name: 'x4', prop: 'x4', min: 0, max: 800, value: 625, step: 1}, {name: 'y4', prop: 'y4', min: 0, max: 600, value: 550, step: 1}],
            'Ink': [{name: 'Fuerza', prop: 'strength', min: 0, max: 1, value: 0.25, step: 0.01}],
            'Edge Work': [{name: 'Radio', prop: 'radius', min: 0, max: 200, value: 1, step: 0.1}],
            'Hexagonal Pixelate': [{name: 'Escala', prop: 'scale', min: 1, max: 100, value: 20, step: 1}],
            'Dot Screen': [{name: 'Tamaño', prop: 'size', min: 0, max: 20, value: 3, step: 0.1}, {name: 'Ángulo', prop: 'angle', min: 0, max: Math.PI / 2, value: 1.1, step: 0.01}],
            'Color Halftone': [{name: 'Tamaño', prop: 'size', min: 1, max: 20, value: 4, step: 0.1}, {name: 'Ángulo', prop: 'angle', min: 0, max: Math.PI, value: 0.25, step: 0.01}]
        };

        this.currentFilterValues = {};
        this.selectedFilter = this.filterSelect.value;

        this.handleFilterChange = this.handleFilterChange.bind(this);

        this.setupEvents();
        this.updateControls();
    }

     updateImage(newImageElement) {
    if (!newImageElement || !this.canvas) {
        return;
    }

   
    if (this.texture && typeof this.texture.destroy === 'function') {
        this.texture.destroy();
    }

    this.imageElement = newImageElement;
    
 
    const parentNode = this.canvas.parentNode;
    const nextSibling = this.canvas.nextSibling;
    
 
    this.canvas.remove();
    
    
    this.canvas = fx.canvas();
    this.canvas.width = this.imageElement.width;
    this.canvas.height = this.imageElement.height;
    this.canvas.id = this.originalCanvas.id + "glfx";
    this.canvas.className = 'glfx-canvas';
    
 
    if (nextSibling) {
        parentNode.insertBefore(this.canvas, nextSibling);
    } else {
        parentNode.appendChild(this.canvas);
    }
    
  
    this.texture = this.canvas.texture(this.imageElement);
    this.canvas.draw(this.texture).update();
    
 
    this.applyFilters();
}

    destroy() {
        if (this.filterSelect) {
            this.filterSelect.removeEventListener('change', this.handleFilterChange);
        }

        if (this.texture && typeof this.texture.destroy === 'function') {
            this.texture.destroy();
        }

        if (this.canvas && this.canvas.parentNode) {
            this.canvas.remove();
        }

        if (this.controlsContainer) {
            this.controlsContainer.innerHTML = '';
        }

        if (this.originalCanvas) {
            this.originalCanvas.style.display = '';
        }

        this.canvas = null;
        this.originalCanvas = null;
        this.controlsContainer = null;
        this.imageElement = null;
        this.filterSelect = null;
        this.texture = null;
        this.filters = null;
        this.currentFilterValues = null;
    }

    handleFilterChange(e) {
        this.selectedFilter = e.target.value;
        this.updateControls();
        this.applyFilters();
    }

    setupEvents() {
        this.filterSelect.addEventListener('change', this.handleFilterChange);
    }

    updateControls() {
        if (!this.controlsContainer) return;
        this.controlsContainer.innerHTML = '';
        const controls = this.filters[this.selectedFilter] || [];
        this.currentFilterValues = {};

        controls.forEach(control => {
            this.currentFilterValues[control.prop] = control.value;
            const div = document.createElement('div');
            div.className = 'editorimgz-filter';
            const label = document.createElement('label');
            const valueSpan = document.createElement('span');
            valueSpan.textContent = control.value;
            label.textContent = `${control.name}: `;
            label.appendChild(valueSpan);
            const input = document.createElement('input');
            input.type = 'range';
            input.min = control.min;
            input.max = control.max;
            input.value = control.value;
            input.step = control.step;
            input.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                this.currentFilterValues[control.prop] = value;
                valueSpan.textContent = value.toFixed(2);
                this.applyFilters();
            });
            div.appendChild(label);
            div.appendChild(input);
            this.controlsContainer.appendChild(div);
        });
    }

    applyFilters() {
        if (!this.canvas) return;
        this.canvas.draw(this.texture);
        if (this.selectedFilter === 'original') {
            this.canvas.update();
            return;
        }
        const v = this.currentFilterValues;
        const w = this.canvas.width;
        const h = this.canvas.height;
        switch (this.selectedFilter) {
            case 'Brightness / Contrast': this.canvas.brightnessContrast(v.brightness, v.contrast); break;
            case 'Hue / Saturation': this.canvas.hueSaturation(v.hue, v.saturation); break;
            case 'Vibrance': this.canvas.vibrance(v.amount); break;
            case 'Denoise': this.canvas.denoise(v.exponent); break;
            case 'Unsharp Mask': this.canvas.unsharpMask(v.radius, v.strength); break;
            case 'Noise': this.canvas.noise(v.amount); break;
            case 'Sepia': this.canvas.sepia(v.amount); break;
            case 'Vignette': this.canvas.vignette(v.size, v.amount); break;
            case 'Zoom Blur': this.canvas.zoomBlur(w / 2, h / 2, v.strength); break;
            case 'Triangle Blur': this.canvas.triangleBlur(v.radius); break;
            case 'Tilt Shift': this.canvas.tiltShift(w / 2, h, w / 2, h / 2, v.blurRadius, v.gradientRadius); break;
            case 'Lens Blur': this.canvas.lensBlur(v.radius, v.brightness, v.angle); break;
            case 'Swirl': this.canvas.swirl(w / 2, h / 2, v.radius, v.angle); break;
            case 'Bulge / Pinch': this.canvas.bulgePinch(w / 2, h / 2, v.radius, v.strength); break;
            case 'Perspective': this.canvas.perspective([v.x1, v.y1, v.x2, v.y2, v.x3, v.y3, v.x4, v.y4], [0, 0, w, 0, 0, h, w, h]); break;
            case 'Ink': this.canvas.ink(v.strength); break;
            case 'Edge Work': this.canvas.edgeWork(v.radius); break;
            case 'Hexagonal Pixelate': this.canvas.hexagonalPixelate(w / 2, h / 2, v.scale); break;
            case 'Dot Screen': this.canvas.dotScreen(w / 2, h / 2, v.angle, v.size); break;
            case 'Color Halftone': this.canvas.colorHalftone(w / 2, h / 2, v.angle, v.size); break;
        }
        this.canvas.update();
    }

    invertColors() {
        this.canvas.draw(this.texture)
            .curves([0, 1], [1, 0], [0, 1], [1, 0], [0, 1], [1, 0])
            .update();
        this.resetFilterSelect();
    }

    flip(axis) {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const before = [0, 0, w, 0, 0, h, w, h];
        let after;
        if (axis === 'x') {
            after = [w, 0, 0, 0, w, h, 0, h];
        } else {
            after = [0, h, w, h, 0, 0, w, 0];
        }
        this.canvas.draw(this.texture)
            .perspective(before, after)
            .update();
        this.resetFilterSelect();
    }

    resetFilterSelect() {
        this.filterSelect.selectedIndex = 0;
        this.selectedFilter = '';
        this.updateControls();
    }
}



    showLoader(text = 'Procesando...') {
        const loader = document.getElementById('editorimgz-loader');
        loader.textContent = text;
        loader.style.display = 'flex';
    }

    hideLoader() {
        document.getElementById('editorimgz-loader').style.display = 'none';
    }

    loadImageFromFile(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const image = document.getElementById('editorimgz-image');
            image.src = e.target.result;
            console.log('image loadImageFromFile ');//gio
             };
        reader.readAsDataURL(file);
    }

    async processUpscale(scale) {
        this.showLoader(`Mejorando escala ${scale}x...`);
        try {
            const image = document.getElementById('editorimgz-image');
            const result = await this.upscaler.upscale(image, { scale });
            image.src = result;
        } catch (err) {
            console.error('Error during upscale:', err);
        } finally {
            this.hideLoader();
        }
    }

    async removeBackground() {
        this.showLoader('Eliminando fondo...');
        try {
            const image = document.getElementById('editorimgz-image');
            const blob = await this.backgroundRemoval(image.src);
            this.loadImageFromFile(blob);
        } catch (err) {
            console.error('Error removing background:', err);
        } finally {
            this.hideLoader();
        }
    }

    async quadrupleImage() {
        this.showLoader('Cuadruplicando imagen...');
        await new Promise(resolve => setTimeout(resolve, 10));
        
        const img = document.getElementById('editorimgz-image');
        const tempCanvas = document.createElement('canvas');
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        
        tempCanvas.width = w * 2;
        tempCanvas.height = h * 2;
        const ctx = tempCanvas.getContext('2d');
        
        ctx.drawImage(img, 0, 0);
        
        ctx.save();
        ctx.translate(w * 2, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0);
        ctx.restore();
        
        ctx.save();
        ctx.translate(0, h * 2);
        ctx.scale(1, -1);
        ctx.drawImage(img, 0, 0);
        ctx.restore();
        
        ctx.save();
        ctx.translate(w * 2, h * 2);
        ctx.scale(-1, -1);
        ctx.drawImage(img, 0, 0);
        ctx.restore();
        
        img.src = tempCanvas.toDataURL();
        this.hideLoader();
    }
}