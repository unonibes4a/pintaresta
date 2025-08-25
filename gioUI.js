


function loadjsexer() {
  const flatpickr_css = document.createElement('link');
  flatpickr_css.rel = 'stylesheet';
  flatpickr_css.href = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css';
  document.head.appendChild(flatpickr_css);

  const flatpickr_js = document.createElement('script');
  flatpickr_js.src = 'https://cdn.jsdelivr.net/npm/flatpickr';
  document.head.appendChild(flatpickr_js);

  flatpickr_js.onload = function() {
 
  };
}

loadjsexer();


  var GioUI = {};





 const estilosCSS = `

      :root {
            --base-bg: rgba(45, 45, 45, 0.8);
            --hover-bg: rgba(65, 65, 65, 1);
            --container-bg: rgba(30, 30, 30, 0.8);
            --icon-color: rgb(220, 220, 220);
            --accent-color: rgb(87, 170, 218);
            --track-bg: rgba(10, 10, 10, 0.4);
            --text-color: rgb(210, 210, 210);
            --border-radius: 8px;
            --success-color: #4ade80;
            --warning-color: #facc15;
            --error-color: #ef4444;
            --info-color: #3b82f6;
        }
 #ui-container {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 30px;
            width: 100%; max-width: 1200px;
        }

        .demo-section {
            background-color: var(--container-bg); border: 1px solid var(--hover-bg); backdrop-filter: blur(10px);
            padding: 25px; border-radius: var(--border-radius); box-shadow: 0 4px 30px rgba(0,0,0,0.4);
        }

        .demo-title {
            font-size: 18px; font-weight: bold; margin-bottom: 20px; color: var(--accent-color);
            border-bottom: 1px solid var(--hover-bg); padding-bottom: 10px;
        }

        .component-group {
            display: flex; flex-direction: column; gap: 20px;
        }

        .ui-component { display: flex; flex-direction: column; align-items: flex-start; width: 100%; }
        .ui-label { margin-bottom: 12px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; width: 100%; text-align: left; }

        .ui-button {
            display: inline-flex; align-items: center; justify-content: center; border: none; background-color: var(--base-bg);
            color: var(--icon-color); font-weight: bold; font-size: 14px; cursor: pointer; transition: all 0.2s ease;
            width: auto; height: 48px; min-width: 48px; padding: 0 20px; border-radius: 24px; box-sizing: border-box;
        }
        .ui-button:hover { color: var(--accent-color); background-color: var(--hover-bg); }
        .ui-button:active { transform: scale(0.95); }
        .ui-button.primary { background-color: var(--accent-color); color: white; }
        .ui-button.success { background-color: var(--success-color); color: white; }
        .ui-button.warning { background-color: var(--warning-color); color: black; }
        .ui-button.error { background-color: var(--error-color); color: white; }

        .ui-checkbox { 
            display: flex; align-items: center; cursor: pointer; user-select: none; width: 100%; flex-direction: row;
        } 
        .ui-checkbox input { display: none; } 
        .ui-checkbox .checkmark { 
            width: 22px; height: 22px; background-color: var(--base-bg); border: 2px solid var(--icon-color); 
            border-radius: 50%; position: relative; margin-right: 12px; transition: all 0.3s; flex-shrink: 0;
        } 
        .ui-checkbox:hover .checkmark { border-color: var(--accent-color); } 
        .ui-checkbox input:checked + .checkmark { background-color: var(--accent-color); border-color: var(--accent-color); } 
        .ui-checkbox input:checked + .checkmark::after { content: ""; position: absolute; left: 7px; top: 3px; width: 5px; height: 10px; border: solid white; border-width: 0 3px 3px 0; transform: rotate(45deg); } 
        .ui-checkbox .label-text { font-weight: 500; flex: 1; }

        .ui-textinput { 
            background-color: var(--base-bg); border: 1px solid var(--icon-color); color: var(--text-color); 
            padding: 12px 15px; border-radius: var(--border-radius); width: 100%; box-sizing: border-box; 
            font-size: 14px; outline: none; transition: border-color 0.2s ease;
        }
        .ui-textinput:focus { border-color: var(--accent-color); }
        .ui-textinput::placeholder { color: rgba(210, 210, 210, 0.5); }

        .ui-textarea { 
            background-color: var(--base-bg); border: 1px solid var(--icon-color); color: var(--text-color); 
            padding: 12px 15px; border-radius: var(--border-radius); width: 100%; box-sizing: border-box; 
            font-size: 14px; outline: none; transition: border-color 0.2s ease; resize: vertical; min-height: 80px;
            font-family: inherit;
        }
        .ui-textarea:focus { border-color: var(--accent-color); }

        .ui-modal-overlay { 
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background-color: rgba(0, 0, 0, 0.8); z-index: 1000; 
            display: flex; align-items: center; justify-content: center; 
            opacity: 0; visibility: hidden; transition: all 0.3s ease;
        }
        .ui-modal-overlay.open { opacity: 1; visibility: visible; }
        .ui-modal { 
            background-color: var(--container-bg); border-radius: var(--border-radius); 
            max-width: 90%; max-height: 90%; overflow: auto; border: 1px solid var(--hover-bg);
            transform: scale(0.7); transition: transform 0.3s ease;
        }
        .ui-modal-overlay.open .ui-modal { transform: scale(1); }
        .ui-modal-header { 
            padding: 20px 25px; border-bottom: 1px solid var(--hover-bg); 
            display: flex; justify-content: space-between; align-items: center;
        }
        .ui-modal-title { font-size: 18px; font-weight: bold; }
        .ui-modal-close { 
            background: none; border: none; color: var(--icon-color); font-size: 24px; 
            cursor: pointer; padding: 0; width: 30px; height: 30px; display: flex; 
            align-items: center; justify-content: center; border-radius: 50%;
        }
        .ui-modal-close:hover { background-color: var(--hover-bg); }
        .ui-modal-body { padding: 25px; }
        .ui-modal-footer { padding: 20px 25px; border-top: 1px solid var(--hover-bg); display: flex; gap: 10px; justify-content: flex-end; }

        .ui-alert { 
            padding: 15px 20px; border-radius: var(--border-radius); border-left: 4px solid; 
            margin-bottom: 15px; display: flex; align-items: center; gap: 10px;
        }
        .ui-alert.info { background-color: rgba(59, 130, 246, 0.1); border-color: var(--info-color); color: var(--info-color); }
        .ui-alert.success { background-color: rgba(74, 222, 128, 0.1); border-color: var(--success-color); color: var(--success-color); }
        .ui-alert.warning { background-color: rgba(250, 204, 21, 0.1); border-color: var(--warning-color); color: var(--warning-color); }
        .ui-alert.error { background-color: rgba(239, 68, 68, 0.1); border-color: var(--error-color); color: var(--error-color); }
        .ui-alert-close { 
            margin-left: auto; background: none; border: none; color: currentColor; 
            cursor: pointer; font-size: 18px; padding: 0;
        }

        .ui-tabs { width: 100%; }
        .ui-tabs-nav { display: flex; border-bottom: 1px solid var(--hover-bg); margin-bottom: 20px; }
        .ui-tab-button { 
            background: none; border: none; color: var(--text-color); padding: 12px 20px; 
            cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s ease;
            font-size: 14px; font-weight: 500;
        }
        .ui-tab-button:hover { background-color: var(--base-bg); }
        .ui-tab-button.active { color: var(--accent-color); border-bottom-color: var(--accent-color); }
        .ui-tab-content { display: none; }
        .ui-tab-content.active { display: block; }

        .ui-card { 
            background-color: var(--base-bg); border-radius: var(--border-radius); 
            border: 1px solid var(--hover-bg); overflow: hidden; transition: transform 0.2s ease;
        }
        .ui-card:hover { transform: translateY(-2px); }
        .ui-card-header { padding: 20px; border-bottom: 1px solid var(--hover-bg); }
        .ui-card-title { font-size: 16px; font-weight: bold; margin: 0; }
        .ui-card-body { padding: 20px; }
        .ui-card-footer { padding: 20px; border-top: 1px solid var(--hover-bg); background-color: rgba(0,0,0,0.2); }

        .ui-progress { 
            width: 100%; height: 8px; background-color: var(--track-bg); 
            border-radius: 4px; overflow: hidden;
        }
        .ui-progress-bar { 
            height: 100%; background-color: var(--accent-color); 
            transition: width 0.3s ease; border-radius: 4px;
        }
        .ui-progress-text { 
            font-size: 12px; margin-top: 5px; text-align: center; 
            font-weight: 500; color: var(--accent-color);
        }

        .ui-toggle { 
            display: flex; align-items: center; cursor: pointer; user-select: none; 
            width: 100%; gap: 12px;
        }
        .ui-toggle input { display: none; }
        .ui-toggle-switch { 
            width: 50px; height: 24px; background-color: var(--track-bg); 
            border-radius: 12px; position: relative; transition: background-color 0.3s ease;
        }
        .ui-toggle-switch::after { 
            content: ''; position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; 
            background-color: white; border-radius: 50%; transition: transform 0.3s ease;
        }
        .ui-toggle input:checked + .ui-toggle-switch { background-color: var(--accent-color); }
        .ui-toggle input:checked + .ui-toggle-switch::after { transform: translateX(26px); }
        .ui-toggle-label { font-weight: 500; }

        .ui-badge { 
            display: inline-flex; align-items: center; justify-content: center; 
            padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; 
            background-color: var(--accent-color); color: white;
        }
        .ui-badge.success { background-color: var(--success-color); }
        .ui-badge.warning { background-color: var(--warning-color); color: black; }
        .ui-badge.error { background-color: var(--error-color); }

        .ui-slider-container { --rotation: 0deg; transform: rotate(var(--rotation)); text-align: center; }
        .ui-slider-container .ui-label { text-align: center; margin-bottom: 15px; }
        .ui-slider-container output { font-weight: bold; color: var(--accent-color); display: block; margin-top: 10px; }
        .ui-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; background: var(--track-bg);
            border-radius: 2px; outline: none; cursor: pointer; }
        .ui-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px;
            background: var(--icon-color); border-radius: 50%; border: 4px solid var(--base-bg); transition: background-color 0.2s; }
        .ui-slider::-webkit-slider-thumb:hover { background: var(--accent-color); }

        .ui-datepicker { background-color: var(--base-bg); border: 1px solid var(--icon-color); color: var(--text-color); padding: 10px; border-radius: 5px; width: 100%; box-sizing: border-box; text-align: center; cursor: pointer; }
        .flatpickr-calendar { background: var(--container-bg); border: 1px solid var(--hover-bg); color: var(--text-color); }
        .flatpickr-day { color: var(--text-color); }
        .flatpickr-day.selected, .flatpickr-day.selected:hover { background: var(--accent-color); border-color: var(--accent-color); color: #fff;}
        .flatpickr-day:hover { background: var(--hover-bg); }
        .flatpickr-months .flatpickr-month, .flatpickr-current-month, .flatpickr-weekday, .numInput, .numInputWrapper { color: var(--text-color) !important; }

        .ui-accordion { background: var(--base-bg); border-radius: var(--border-radius); width: 100%; transition: background-color 0.2s ease; } 
        .ui-accordion:hover { background: var(--hover-bg); } 
        .ui-accordion summary { list-style: none; cursor: pointer; padding: 12px 15px; font-weight: bold; position: relative; } 
        .ui-accordion summary::-webkit-details-marker { display: none; } 
        .ui-accordion summary::after { content: '›'; position: absolute; right: 15px; top: 50%; font-size: 28px; transform: translateY(-50%) rotate(90deg); transition: transform 0.2s ease-in-out; } 
        .ui-accordion[open] > summary::after { transform: translateY(-50%) rotate(-90deg); } 
        .ui-accordion .content { padding: 0px 15px 15px 15px; font-size: 14px; line-height: 1.5; border-top: 1px solid var(--hover-bg); }

        .ui-select { position: relative; width: 100%; } 
        .ui-select .select-selected { background-color: var(--base-bg); border-radius: var(--border-radius); padding: 12px 15px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background-color 0.2s ease; } 
        .ui-select .select-selected:hover { background-color: var(--hover-bg); } 
        .ui-select .select-selected::after { content: ''; border: solid var(--icon-color); border-width: 0 2px 2px 0; display: inline-block; padding: 3px; transform: rotate(45deg); transition: transform 0.3s ease; } 
        .ui-select.open .select-selected::after { transform: rotate(-135deg); } 
        .ui-select .select-options { position: absolute; top: calc(100% + 5px); left: 0; right: 0; background-color: var(--container-bg); border: 1px solid var(--hover-bg); border-radius: var(--border-radius); z-index: 100; max-height: 200px; overflow-y: auto; display: none; } 
        .ui-select.open .select-options { display: block; } 
        .ui-select .select-search { width: 100%; background: var(--base-bg); border: none; color: var(--text-color); padding: 10px; border-bottom: 1px solid var(--hover-bg); box-sizing: border-box; outline: none; } 
        .ui-select .select-options ul { list-style: none; padding: 0; margin: 0; } 
        .ui-select .select-options li { padding: 12px 15px; cursor: pointer; } 
        .ui-select .select-options li:hover, .ui-select .select-options li.selected { background-color: var(--accent-color); color: white; } 
        .ui-select .select-options li.hidden { display: none; }

        .toast-container { 
            position: fixed; top: 20px; right: 20px; z-index: 1100; 
            display: flex; flex-direction: column; gap: 10px; max-width: 400px;
        }
        .ui-toast { 
            padding: 15px 20px; border-radius: var(--border-radius); 
            background-color: var(--container-bg); border: 1px solid var(--hover-bg);
            transform: translateX(100%); transition: transform 0.3s ease;
            display: flex; align-items: center; gap: 10px;
        }
        .ui-toast.show { transform: translateX(0); }


            
            `;
            
           const styleElement = document.createElement('style');
            styleElement.textContent = estilosCSS;
               document.head.appendChild(styleElement); 

            





/*  */


    class UIComponent { 
        constructor(parent, type = 'div') { 
            if (!parent) throw new Error("Parent required."); 
            this.parent = parent; 
            this.element = document.createElement(type); 
            this.element.className = 'ui-component'; 
        } 
        mount() { 
            this.parent.appendChild(this.element); 
        }
        destroy() {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
    }

    GioUI.Button = class extends UIComponent {
        constructor(parent, options = {},callBack=null) {
            super(parent);
            const defaults = { text: 'Button', variant: 'default', onClick: () => {} };
            this.options = { ...defaults, ...options };
            this.button = document.createElement('button');
            this.button.className = `ui-button ${this.options.variant}`;
            this.button.textContent = this.options.text;
            this.button.addEventListener('click', this.options.onClick);
            this.element.appendChild(this.button);
            this.mount();
            if(callBack){   this.button.onclick=callBack;}
          
        }
        setText(newText) { this.button.textContent = newText; }
        setVariant(variant) { 
            this.button.className = `ui-button ${variant}`;
            this.options.variant = variant;
        }
         
    };

    GioUI.TextInput = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent);
            const defaults = { label: '', placeholder: '', type: 'text', value: '', onChange: () => {} };
            this.options = { ...defaults, ...options };
            this._render();
            this.mount();
        }
        _render() {
            if (this.options.label) {
                const label = document.createElement('div');
                label.className = 'ui-label';
                label.textContent = this.options.label;
                this.element.appendChild(label);
            }
            this.input = document.createElement('input');
            this.input.type = this.options.type;
            this.input.className = 'ui-textinput';
            this.input.placeholder = this.options.placeholder;
            this.input.value = this.options.value;
            this.input.addEventListener('input', (e) => this.options.onChange(e.target.value));
            this.element.appendChild(this.input);
        }
        getValue() { return this.input.value; }
        setValue(value) { this.input.value = value; }
    };

    GioUI.TextArea = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent);
            const defaults = { label: '', placeholder: '', rows: 4, value: '', onChange: () => {} };
            this.options = { ...defaults, ...options };
            this._render();
            this.mount();
        }
        _render() {
            if (this.options.label) {
                const label = document.createElement('div');
                label.className = 'ui-label';
                label.textContent = this.options.label;
                this.element.appendChild(label);
            }
            this.textarea = document.createElement('textarea');
            this.textarea.className = 'ui-textarea';
            this.textarea.placeholder = this.options.placeholder;
            this.textarea.rows = this.options.rows;
            this.textarea.value = this.options.value;
            this.textarea.addEventListener('input', (e) => this.options.onChange(e.target.value));
            this.element.appendChild(this.textarea);
        }
        getValue() { return this.textarea.value; }
        setValue(value) { this.textarea.value = value; }
    };

    GioUI.Checkbox = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent, 'label');
            const defaults = { labelTrue: 'True', labelFalse: 'False', initialState: false, onChange: () => {} };
            this.options = { ...defaults, ...options };
            this._checked = this.options.initialState;
            this._render();
            this.mount();
        }
        _render() {
            this.element.className = 'ui-checkbox ui-component';
            this.input = document.createElement('input');
            this.input.type = 'checkbox';
            this.input.checked = this._checked;
            this.checkmark = document.createElement('span');
            this.checkmark.className = 'checkmark';
            this.labelText = document.createElement('span');
            this.labelText.className = 'label-text';
            this._updateLabel();
            this.element.append(this.input, this.checkmark, this.labelText);
            this.element.addEventListener('click', (e) => {
                e.preventDefault();
                this.setChecked(!this._checked);
                this.options.onChange(this._checked);
            });
        }
        _updateLabel() { this.labelText.textContent = this._checked ? this.options.labelTrue : this.options.labelFalse; }
        setChecked(state) { this._checked = state; this.input.checked = this._checked; this._updateLabel(); }
        getValue() { return this._checked; }
    };

    GioUI.Toggle = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent, 'label');
            const defaults = { label: 'Toggle', initialState: false, onChange: () => {} };
            this.options = { ...defaults, ...options };
            this._checked = this.options.initialState;
            this._render();
            this.mount();
        }
        _render() {
            this.element.className = 'ui-toggle ui-component';
            this.input = document.createElement('input');
            this.input.type = 'checkbox';
            this.input.checked = this._checked;
            this.switch = document.createElement('span');
            this.switch.className = 'ui-toggle-switch';
            this.labelText = document.createElement('span');
            this.labelText.className = 'ui-toggle-label';
            this.labelText.textContent = this.options.label;
            this.element.append(this.input, this.switch, this.labelText);
            this.element.addEventListener('click', (e) => {
                e.preventDefault();
                this.setChecked(!this._checked);
                this.options.onChange(this._checked);
            });
        }
        setChecked(state) { this._checked = state; this.input.checked = this._checked; }
        getValue() { return this._checked; }
    };

    GioUI.Modal = class {
        constructor(options = {}) {
            const defaults = { title: 'Modal', content: '', showClose: true, onClose: () => {} };
            this.options = { ...defaults, ...options };
            this._render();
        }
        _render() {
            this.overlay = document.createElement('div');
            this.overlay.className = 'ui-modal-overlay';
            
            this.modal = document.createElement('div');
            this.modal.className = 'ui-modal';
            
            const header = document.createElement('div');
            header.className = 'ui-modal-header';
            
            const title = document.createElement('h3');
            title.className = 'ui-modal-title';
            title.textContent = this.options.title;
            
            header.appendChild(title);
            
            if (this.options.showClose) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'ui-modal-close';
                closeBtn.innerHTML = '×';
                closeBtn.addEventListener('click', () => this.close());
                header.appendChild(closeBtn);
            }
            
            this.body = document.createElement('div');
            this.body.className = 'ui-modal-body';
            this.body.innerHTML = this.options.content;
            
            this.footer = document.createElement('div');
            this.footer.className = 'ui-modal-footer';
            
            this.modal.append(header, this.body, this.footer);
            this.overlay.appendChild(this.modal);
            
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) this.close();
            });
        }
        
        setContent(content) { this.body.innerHTML = content; }
        
        addFooterButton(text, onClick, variant = 'default') {
            const btn = document.createElement('button');
            btn.className = `ui-button ${variant}`;
            btn.textContent = text;
            btn.addEventListener('click', onClick);
            this.footer.appendChild(btn);
        }
        
        open() {
            document.body.appendChild(this.overlay);
            setTimeout(() => this.overlay.classList.add('open'), 10);
        }
        
        close() {
            this.overlay.classList.remove('open');
            setTimeout(() => {
                if (this.overlay.parentNode) {
                    this.overlay.parentNode.removeChild(this.overlay);
                }
                this.options.onClose();
            }, 300);
        }
    };

    GioUI.Alert = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent);
            const defaults = { message: 'Alert message', type: 'info', closable: true, onClose: () => {} };
            this.options = { ...defaults, ...options };
            this._render();
            this.mount();
        }
        _render() {
            this.element.className = `ui-alert ${this.options.type} ui-component`;
            
            const messageSpan = document.createElement('span');
            messageSpan.textContent = this.options.message;
            this.element.appendChild(messageSpan);
            
            if (this.options.closable) {
                const closeBtn = document.createElement('button');
                closeBtn.className = 'ui-alert-close';
                closeBtn.innerHTML = '×';
                closeBtn.addEventListener('click', () => {
                    this.close();
                    this.options.onClose();
                });
                this.element.appendChild(closeBtn);
            }
        }
        close() {
            this.element.style.opacity = '0';
            setTimeout(() => this.destroy(), 300);
        }
        setMessage(message) {
            const messageSpan = this.element.querySelector('span');
            messageSpan.textContent = message;
        }
    };

    GioUI.Toast = class {
        constructor(options = {}) {
            const defaults = { message: 'Toast message', type: 'info', duration: 3000, onClose: () => {} };
            this.options = { ...defaults, ...options };
            this._render();
            this.show();
        }
        _render() {
            this.element = document.createElement('div');
            this.element.className = `ui-toast ${this.options.type}`;
            
            const messageSpan = document.createElement('span');
            messageSpan.textContent = this.options.message;
            this.element.appendChild(messageSpan);
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'ui-alert-close';
            closeBtn.innerHTML = '×';
            closeBtn.addEventListener('click', () => this.close());
            this.element.appendChild(closeBtn);
        }
        show() {
            const container = document.getElementById('toast-container');
            container.appendChild(this.element);
            setTimeout(() => this.element.classList.add('show'), 10);
            
            if (this.options.duration > 0) {
                setTimeout(() => this.close(), this.options.duration);
            }
        }
        close() {
            this.element.classList.remove('show');
            setTimeout(() => {
                if (this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
                this.options.onClose();
            }, 300);
        }
    };

    GioUI.Tabs = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent);
            const defaults = { tabs: [], activeTab: 0, onChange: () => {} };
            this.options = { ...defaults, ...options };
            this.activeTab = this.options.activeTab;
            this._render();
            this.mount();
        }
        _render() {
            this.element.className = 'ui-tabs ui-component';
            
            this.nav = document.createElement('div');
            this.nav.className = 'ui-tabs-nav';
            
            this.contentContainer = document.createElement('div');
            this.contentContainer.className = 'ui-tabs-content-container';
            
            this.options.tabs.forEach((tab, index) => {
                const button = document.createElement('button');
                button.className = `ui-tab-button ${index === this.activeTab ? 'active' : ''}`;
                button.textContent = tab.label;
                button.addEventListener('click', () => this.setActiveTab(index));
                this.nav.appendChild(button);
                
                const content = document.createElement('div');
                content.className = `ui-tab-content ${index === this.activeTab ? 'active' : ''}`;
                content.innerHTML = tab.content;
                this.contentContainer.appendChild(content);
            });
            
            this.element.append(this.nav, this.contentContainer);
        }
        setActiveTab(index) {
            if (index < 0 || index >= this.options.tabs.length) return;
            
            this.nav.querySelectorAll('.ui-tab-button').forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
            
            this.contentContainer.querySelectorAll('.ui-tab-content').forEach((content, i) => {
                content.classList.toggle('active', i === index);
            });
            
            this.activeTab = index;
            this.options.onChange(index);
        }
        addTab(tab) {
            this.options.tabs.push(tab);
        }
    };

    GioUI.Card = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent);
            const defaults = { title: '', body: '', footer: '', showHeader: true, showFooter: true };
            this.options = { ...defaults, ...options };
            this._render();
            this.mount();
        }
        _render() {
            this.element.className = 'ui-card ui-component';
            
            if (this.options.showHeader && this.options.title) {
                this.header = document.createElement('div');
                this.header.className = 'ui-card-header';
                
                this.titleElement = document.createElement('h3');
                this.titleElement.className = 'ui-card-title';
                this.titleElement.textContent = this.options.title;
                this.header.appendChild(this.titleElement);
                
                this.element.appendChild(this.header);
            }
            
            this.body = document.createElement('div');
            this.body.className = 'ui-card-body';
            this.body.innerHTML = this.options.body;
            this.element.appendChild(this.body);
            
            if (this.options.showFooter && this.options.footer) {
                this.footer = document.createElement('div');
                this.footer.className = 'ui-card-footer';
                this.footer.innerHTML = this.options.footer;
                this.element.appendChild(this.footer);
            }
        }
        setTitle(title) {
            if (this.titleElement) {
                this.titleElement.textContent = title;
            }
        }
        setBody(content) {
            this.body.innerHTML = content;
        }
        setFooter(content) {
            if (this.footer) {
                this.footer.innerHTML = content;
            }
        }
    };

    GioUI.ProgressBar = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent);
            const defaults = { label: 'Progress', value: 0, max: 100, showText: true };
            this.options = { ...defaults, ...options };
            this._render();
            this.mount();
        }
        _render() {
            if (this.options.label) {
                const label = document.createElement('div');
                label.className = 'ui-label';
                label.textContent = this.options.label;
                this.element.appendChild(label);
            }
            
            this.progressContainer = document.createElement('div');
            this.progressContainer.className = 'ui-progress';
            
            this.progressBar = document.createElement('div');
            this.progressBar.className = 'ui-progress-bar';
            this.updateProgress();
            
            this.progressContainer.appendChild(this.progressBar);
            this.element.appendChild(this.progressContainer);
            
            if (this.options.showText) {
                this.progressText = document.createElement('div');
                this.progressText.className = 'ui-progress-text';
                this.updateText();
                this.element.appendChild(this.progressText);
            }
        }
        updateProgress() {
            const percentage = (this.options.value / this.options.max) * 100;
            this.progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
        }
        updateText() {
            if (this.progressText) {
                const percentage = Math.round((this.options.value / this.options.max) * 100);
                this.progressText.textContent = `${percentage}%`;
            }
        }
        setValue(value) {
            this.options.value = value;
            this.updateProgress();
            this.updateText();
        }
        getValue() {
            return this.options.value;
        }
    };

    GioUI.Badge = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent, 'span');
            const defaults = { text: 'Badge', variant: 'default' };
            this.options = { ...defaults, ...options };
            this._render();
            this.mount();
        }
        _render() {
            this.element.className = `ui-badge ${this.options.variant}`;
            this.element.textContent = this.options.text;
        }
        setText(text) {
            this.element.textContent = text;
        }
        setVariant(variant) {
            this.element.className = `ui-badge ${variant}`;
        }
    };

    GioUI.Slider = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent);
            const defaults = { label: 'Slider', min: 0, max: 100, initialValue: 50, orientation: 'horizontal', rotation: 0, onChange: () => {} };
            this.options = { ...defaults, ...options };
            this._render();
            this.mount();
        }
        _render() {
            this.element.className = 'ui-slider-container ui-component';
            this.element.style.setProperty('--rotation', `${this.options.rotation}deg`);
            const label = document.createElement('div');
            label.className = 'ui-label';
            label.textContent = this.options.label;
            this.slider = document.createElement('input');
            this.slider.type = 'range';
            this.slider.min = this.options.min;
            this.slider.max = this.options.max;
            this.slider.value = this.options.initialValue;
            this.slider.className = 'ui-slider';
            this.output = document.createElement('output');
            this.output.textContent = this.slider.value;
            this.slider.addEventListener('input', () => {
                this.output.textContent = this.slider.value;
                this.options.onChange(Number(this.slider.value));
            });
            this.element.append(label, this.slider, this.output);
        }
        setValue(value) { this.slider.value = value; this.output.textContent = value; }
        getValue() { return Number(this.slider.value); }
    };
    
    GioUI.DatePicker = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent);
            const defaults = { label: 'Fecha', placeholder: 'Seleccionar...', initialDate: new Date(), onChange: () => {} };
            this.options = { ...defaults, ...options };
            this._render();
            this.mount();
        }
        _render() {
            const label = document.createElement('div');
            label.className = 'ui-label';
            label.textContent = this.options.label;
            this.input = document.createElement('input');
            this.input.type = 'text';
            this.input.placeholder = this.options.placeholder;
            this.input.className = 'ui-datepicker';
            this.element.append(label, this.input);
            this.picker = flatpickr(this.input, { defaultDate: this.options.initialDate, dateFormat: "d/m/Y", onChange: (dates, str) => { this.options.onChange(dates[0], str); } });
        }
        getDate() { return this.picker.selectedDates[0]; }
        setDate(newDate) { this.picker.setDate(newDate); }
    };
    
    GioUI.Accordion = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent, 'details');
            const defaults = { title: 'Información', content: '<p>Contenido.</p>', startOpen: false, onToggle: () => {} };
            this.options = { ...defaults, ...options };
            this._render();
            this.mount();
        }
        _render() {
            this.element.className = 'ui-accordion ui-component';
            this.element.open = this.options.startOpen;
            this.summary = document.createElement('summary');
            this.summary.textContent = this.options.title;
            this.content = document.createElement('div');
            this.content.className = 'content';
            this.content.innerHTML = this.options.content;
            this.element.append(this.summary, this.content);
            this.element.addEventListener('toggle', () => this.options.onToggle(this.isOpen()));
        }
        isOpen() { return this.element.open; }
        open() { this.element.open = true; }
        close() { this.element.open = false; }
        toggle() { this.element.open = !this.element.open; }
    };
    
    GioUI.Select = class extends UIComponent {
        constructor(parent, options = {}) {
            super(parent);
            const defaults = { label: 'Selector', options: [], initialValue: null, enableSearch: true, onChange: () => {} };
            this.options = { ...defaults, ...options };
            this._value = this.options.initialValue;
            this._normalizedOptions = this.options.options.map(opt => typeof opt === 'object' ? opt : { label: opt, value: opt });
            this._render();
            this.mount();
        }
        _render() {
            this.element.className = 'ui-select ui-component';
            if (this.options.label) {
                const label = document.createElement('div');
                label.className = 'ui-label';
                label.textContent = this.options.label;
                this.element.appendChild(label);
            }
            this.selected = document.createElement('div');
            this.selected.className = 'select-selected';
            this.selectedText = document.createElement('span');
            this.updateSelectedText();
            this.optionsContainer = document.createElement('div');
            this.optionsContainer.className = 'select-options';
            if (this.options.enableSearch) {
                this.searchInput = document.createElement('input');
                this.searchInput.type = 'text';
                this.searchInput.className = 'select-search';
                this.searchInput.placeholder = 'Buscar...';
                this.searchInput.addEventListener('click', e => e.stopPropagation());
                this.searchInput.addEventListener('input', () => this._filterOptions());
                this.optionsContainer.appendChild(this.searchInput);
            }
            this.optionsList = document.createElement('ul');
            this._normalizedOptions.forEach(opt => {
                const li = document.createElement('li');
                li.textContent = opt.label;
                li.dataset.value = opt.value;
                if (opt.value == this._value) li.classList.add('selected');
                li.addEventListener('click', () => { this.setValue(opt.value); this.close(); });
                this.optionsList.appendChild(li);
            });
            this.optionsContainer.appendChild(this.optionsList);
            this.selected.appendChild(this.selectedText);
            this.element.append(this.selected, this.optionsContainer);
            this._boundClickHandler = this._handleClickOutside.bind(this);
            this.selected.addEventListener('click', (e) => { e.stopPropagation(); this.toggle(); });
        }
        _filterOptions() {
            const filter = this.searchInput.value.toLowerCase();
            this.optionsList.querySelectorAll('li').forEach(li => {
                const text = li.textContent.toLowerCase();
                li.classList.toggle('hidden', !text.includes(filter));
            });
        }
        _handleClickOutside(event) { if (!this.element.contains(event.target)) this.close(); }
        updateSelectedText() {
            const selectedOption = this._normalizedOptions.find(o => o.value == this._value);
            this.selectedText.textContent = selectedOption ? selectedOption.label : 'Seleccione una opción';
        }
        setValue(value) {
            this._value = value;
            this.updateSelectedText();
            this.optionsList.querySelectorAll('li').forEach(li => li.classList.toggle('selected', li.dataset.value == this._value));
            this.options.onChange(this._value, this._normalizedOptions.find(o => o.value == this._value)?.label);
        }
        getValue() { return this._value; }
        open() { this.element.classList.add('open'); document.addEventListener('click', this._boundClickHandler); if (this.searchInput) setTimeout(() => this.searchInput.focus(), 0); }
        close() { this.element.classList.remove('open'); document.removeEventListener('click', this._boundClickHandler); }
        toggle() { this.element.classList.contains('open') ? this.close() : this.open(); }
    };

    GioUI.createToast = function(message, type = 'info', duration = 3000) {
        return new GioUI.Toast({ message, type, duration });
    };

    GioUI.createModal = function(title, content, options = {}) {
        const modal = new GioUI.Modal({ title, content, ...options });
        return modal;
    };





    

    
/*  */ 


GioUI.DataTable = class extends UIComponent {
    constructor(parent, options = {}) {
        super(parent);
        const defaults = {
            data: [],
            columns: [],
            autoColumns: true,
            showId: false,
            itemsPerPage: 15,
            pagination: true,
            searchable: true,
            sortable: true,
            editable: false,
            actions: [],
            responsive: true,
            onCellClick: () => {},
            onRowClick: () => {},
            onEdit: () => {},
            onAction: () => {}
        };
        this.options = { ...defaults, ...options };
        this.currentPage = 1;
        this.sortColumn = null;
        this.sortDirection = 'asc';
        this.searchTerm = '';
        this.filteredData = [];
        this._processData();
        this._render();
        this.mount();
    }

    _processData() {
        if (this.options.autoColumns && this.options.data.length > 0) {
            const firstItem = this.options.data[0];
            this.columns = Object.keys(firstItem)
                .filter(key => this.options.showId || key.toLowerCase() !== 'id')
                .map(key => ({
                    key,
                    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
                    sortable: true,
                    editable: this.options.editable
                }));
        } else {
            this.columns = this.options.columns;
        }
        this._updateFilteredData();
    }

    _updateFilteredData() {
        let data = [...this.options.data];
        
        if (this.searchTerm) {
            data = data.filter(row => 
                Object.values(row).some(value => 
                    String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
                )
            );
        }

        if (this.sortColumn) {
            data.sort((a, b) => {
                const aVal = a[this.sortColumn];
                const bVal = b[this.sortColumn];
                const modifier = this.sortDirection === 'asc' ? 1 : -1;
                
                if (typeof aVal === 'number' && typeof bVal === 'number') {
                    return (aVal - bVal) * modifier;
                }
                return String(aVal).localeCompare(String(bVal)) * modifier;
            });
        }

        this.filteredData = data;
        this.totalPages = Math.ceil(this.filteredData.length / this.options.itemsPerPage);
        if (this.currentPage > this.totalPages) this.currentPage = 1;
    }

    _render() {
        this.element.className = 'ui-datatable ui-component';
        this.element.innerHTML = `
            <style>
                .ui-datatable {
                    background: var(--container-bg);
                    border-radius: var(--border-radius);
                    border: 1px solid var(--hover-bg);
                    overflow: hidden;
                    width: 100%;
                    max-width: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .datatable-header {
                    padding: 20px;
                    border-bottom: 1px solid var(--hover-bg);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 15px;
                }
                .datatable-search {
                    background: var(--base-bg);
                    border: 1px solid var(--icon-color);
                    color: var(--text-color);
                    padding: 8px 12px;
                    border-radius: var(--border-radius);
                    font-size: 14px;
                    outline: none;
                    min-width: 250px;
                }
                .datatable-search:focus { border-color: var(--accent-color); }
                .datatable-info {
                    font-size: 14px;
                    color: var(--text-color);
                    opacity: 0.8;
                }
                .datatable-container {
                    overflow-x: auto;
                    overflow-y: auto;
                    max-height: 600px;
                    -webkit-overflow-scrolling: touch;
                    width: 100%;
                    flex: 1;
                }
                .datatable-table {
                    width: auto;
                    min-width: 100%;
                    border-collapse: collapse;
                    font-size: 14px;
                    table-layout: fixed;
                }
                .datatable-table th {
                    background: var(--base-bg);
                    color: var(--text-color);
                    padding: 12px 15px;
                    text-align: left;
                    font-weight: 600;
                    border-bottom: 1px solid var(--hover-bg);
                    position: sticky;
                    top: 0;
                    cursor: pointer;
                    user-select: none;
                    white-space: nowrap;
                    min-width: 120px;
                }
                .datatable-table th:hover {
                    background: var(--hover-bg);
                }
                .datatable-table th.sortable::after {
                    content: '↕';
                    margin-left: 8px;
                    opacity: 0.5;
                }
                .datatable-table th.sorted-asc::after {
                    content: '↑';
                    opacity: 1;
                    color: var(--accent-color);
                }
                .datatable-table th.sorted-desc::after {
                    content: '↓';
                    opacity: 1;
                    color: var(--accent-color);
                }
                .datatable-table td {
                    padding: 12px 15px;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    white-space: nowrap;
                    min-width: 120px;
                    max-width: 300px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .datatable-table tr:hover {
                    background: var(--base-bg);
                }
                .datatable-table tr {
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                .datatable-cell-editable {
                    position: relative;
                }
                .datatable-cell-editable:hover {
                    background: var(--hover-bg);
                }
                .datatable-cell-editable::after {
                    content: '✎';
                    position: absolute;
                    right: 5px;
                    top: 50%;
                    transform: translateY(-50%);
                    opacity: 0.5;
                    font-size: 12px;
                }
                .datatable-actions {
                    display: flex;
                    gap: 5px;
                    justify-content: center;
                    align-items: center;
                }
                .datatable-action-btn {
                    background: var(--base-bg);
                    border: 1px solid var(--icon-color);
                    color: var(--icon-color);
                    padding: 4px 8px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.2s;
                }
                .datatable-action-btn:hover {
                    background: var(--accent-color);
                    color: white;
                    border-color: var(--accent-color);
                }
                .datatable-pagination {
                    padding: 15px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-top: 1px solid var(--hover-bg);
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .datatable-page-controls {
                    display: flex;
                    gap: 5px;
                    align-items: center;
                }
                .datatable-page-btn {
                    background: var(--base-bg);
                    border: 1px solid var(--icon-color);
                    color: var(--icon-color);
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.2s;
                    min-width: 35px;
                    text-align: center;
                }
                .datatable-page-btn:hover {
                    background: var(--hover-bg);
                }
                .datatable-page-btn.active {
                    background: var(--accent-color);
                    color: white;
                    border-color: var(--accent-color);
                }
                .datatable-page-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                @media (max-width: 768px) {
                    .datatable-header {
                        flex-direction: column;
                        align-items: stretch;
                        padding: 15px;
                    }
                    .datatable-search {
                        min-width: auto;
                        width: 100%;
                    }
                    .datatable-table {
                        min-width: 700px;
                        font-size: 13px;
                    }
                    .datatable-table th,
                    .datatable-table td {
                        padding: 10px 12px;
                        min-width: 100px;
                    }
                    .datatable-pagination {
                        flex-direction: column;
                        gap: 15px;
                        padding: 12px 15px;
                    }
                    .datatable-page-controls {
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                }
                @media (max-width: 480px) {
                    .datatable-header {
                        padding: 12px;
                    }
                    .datatable-table {
                        min-width: 600px;
                        font-size: 12px;
                    }
                    .datatable-table th,
                    .datatable-table td {
                        padding: 8px 10px;
                        min-width: 90px;
                        font-size: 12px;
                    }
                    .datatable-actions {
                        flex-direction: column;
                        gap: 2px;
                    }
                    .datatable-action-btn {
                        font-size: 10px;
                        padding: 2px 6px;
                    }
                    .datatable-pagination {
                        padding: 10px 12px;
                    }
                    .datatable-page-btn {
                        padding: 4px 8px;
                        min-width: 30px;
                        font-size: 11px;
                    }
                }
            </style>
        `;

        this._renderHeader();
        this._renderTable();
        if (this.options.pagination) this._renderPagination();
    }

    _renderHeader() {
        const header = document.createElement('div');
        header.className = 'datatable-header';

        if (this.options.searchable) {
            this.searchInput = document.createElement('input');
            this.searchInput.type = 'text';
            this.searchInput.className = 'datatable-search';
            this.searchInput.placeholder = 'Buscar en la tabla...';
            this.searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this._updateFilteredData();
                this.currentPage = 1;
                this._updateTable();
                this._updatePagination();
            });
            header.appendChild(this.searchInput);
        }

        this.infoDiv = document.createElement('div');
        this.infoDiv.className = 'datatable-info';
        this._updateInfo();
        header.appendChild(this.infoDiv);

        this.element.appendChild(header);
    }

    _renderTable() {
        this.tableContainer = document.createElement('div');
        this.tableContainer.className = 'datatable-container';

        this.table = document.createElement('table');
        this.table.className = 'datatable-table';

        this._renderTableHeader();
        this._renderTableBody();

        this.tableContainer.appendChild(this.table);
        this.element.appendChild(this.tableContainer);
    }

    _renderTableHeader() {
        if (this.table.querySelector('thead')) {
            this.table.querySelector('thead').remove();
        }
        
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        this.columns.forEach(column => {
            const th = document.createElement('th');
            th.textContent = column.label;
            
            if (column.sortable && this.options.sortable) {
                th.className = 'sortable';
                if (this.sortColumn === column.key) {
                    th.classList.add(`sorted-${this.sortDirection}`);
                }
                th.addEventListener('click', () => this._handleSort(column.key));
            }

            tr.appendChild(th);
        });

        if (this.options.actions && this.options.actions.length > 0) {
            const actionTh = document.createElement('th');
            actionTh.textContent = 'Acciones';
            actionTh.style.textAlign = 'center';
            tr.appendChild(actionTh);
        }

        thead.appendChild(tr);
        this.table.appendChild(thead);
    }

    _renderTableBody() {
        if (this.tbody) this.tbody.remove();
        this.tbody = document.createElement('tbody');
        this._updateTable();
        this.table.appendChild(this.tbody);
    }

    _updateTable() {
        this.tbody.innerHTML = '';
        const startIndex = (this.currentPage - 1) * this.options.itemsPerPage;
        const endIndex = startIndex + this.options.itemsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);

        pageData.forEach((row, rowIndex) => {
            const tr = document.createElement('tr');
            const actualIndex = startIndex + rowIndex;

            tr.addEventListener('click', (e) => {
                if (!e.target.closest('.datatable-actions') && !e.target.closest('.datatable-cell-editable')) {
                    this.options.onRowClick(row, actualIndex, e);
                }
            });

            this.columns.forEach(column => {
                const td = document.createElement('td');
                const cellValue = row[column.key];
                td.textContent = cellValue !== undefined ? cellValue : '';
                td.title = td.textContent;

                if (column.editable) {
                    td.className = 'datatable-cell-editable';
                    td.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this._handleCellEdit(row, column.key, td, actualIndex);
                    });
                }

                td.addEventListener('click', (e) => {
                    if (!column.editable) {
                        this.options.onCellClick(cellValue, row, column.key, e);
                    }
                });

                tr.appendChild(td);
            });

            if (this.options.actions && this.options.actions.length > 0) {
                const actionTd = document.createElement('td');
                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'datatable-actions';

                this.options.actions.forEach(action => {
                    const btn = document.createElement('button');
                    btn.className = 'datatable-action-btn';
                    btn.textContent = action.label;
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.options.onAction(action.name, row, actualIndex, e);
                    });
                    actionsDiv.appendChild(btn);
                });

                actionTd.appendChild(actionsDiv);
                tr.appendChild(actionTd);
            }

            this.tbody.appendChild(tr);
        });

        this._updateInfo();
    }

    _handleSort(columnKey) {
        if (this.sortColumn === columnKey) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = columnKey;
            this.sortDirection = 'asc';
        }
        
        this._updateFilteredData();
        this._updateSortIndicators();
        this._updateTable();
    }

    _updateSortIndicators() {
        const headers = this.table.querySelectorAll('thead th.sortable');
        headers.forEach(th => {
            th.classList.remove('sorted-asc', 'sorted-desc');
            
            const columnIndex = Array.from(th.parentNode.children).indexOf(th);
            const column = this.columns[columnIndex];
            
            if (column && this.sortColumn === column.key) {
                th.classList.add(`sorted-${this.sortDirection}`);
            }
        });
    }

    _handleCellEdit(row, columnKey, cell, rowIndex) {
        const currentValue = row[columnKey];
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.style.cssText = `
            width: 100%;
            background: var(--base-bg);
            border: 1px solid var(--accent-color);
            color: var(--text-color);
            padding: 4px;
            border-radius: 4px;
            outline: none;
        `;

        cell.innerHTML = '';
        cell.appendChild(input);
        input.focus();
        input.select();

        const saveEdit = () => {
            const newValue = input.value;
            if (newValue !== currentValue) {
                const modal = GioUI.createModal(
                    'Confirmar Cambio',
                    `<p>¿Deseas cambiar el valor de "<strong>${currentValue}</strong>" a "<strong>${newValue}</strong>"?</p>`
                );
                modal.addFooterButton('Cancelar', () => {
                    cell.textContent = currentValue;
                    modal.close();
                }, 'default');
                modal.addFooterButton('Guardar', () => {
                    row[columnKey] = newValue;
                    cell.textContent = newValue;
                    cell.title = newValue;
                    this.options.onEdit(row, columnKey, newValue, currentValue, rowIndex);
                    modal.close();
                }, 'primary');
                modal.open();
            } else {
                cell.textContent = currentValue;
            }
        };

        const cancelEdit = () => {
            cell.textContent = currentValue;
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveEdit();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                cancelEdit();
            }
        });
    }

    _renderPagination() {
        this.paginationDiv = document.createElement('div');
        this.paginationDiv.className = 'datatable-pagination';
        this._updatePagination();
        this.element.appendChild(this.paginationDiv);
    }

    _updatePagination() {
        if (!this.paginationDiv) return;
        this.paginationDiv.innerHTML = '';

        const pageInfo = document.createElement('div');
        pageInfo.textContent = `Página ${this.currentPage} de ${this.totalPages}`;
        this.paginationDiv.appendChild(pageInfo);

        const controls = document.createElement('div');
        controls.className = 'datatable-page-controls';

        const firstBtn = this._createPageButton('≪', 1, this.currentPage === 1);
        const prevBtn = this._createPageButton('‹', this.currentPage - 1, this.currentPage === 1);
        controls.append(firstBtn, prevBtn);

        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(this.totalPages, this.currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = this._createPageButton(i, i, false, i === this.currentPage);
            controls.appendChild(pageBtn);
        }

        const nextBtn = this._createPageButton('›', this.currentPage + 1, this.currentPage === this.totalPages);
        const lastBtn = this._createPageButton('≫', this.totalPages, this.currentPage === this.totalPages);
        controls.append(nextBtn, lastBtn);

        this.paginationDiv.appendChild(controls);
    }

    _createPageButton(text, page, disabled = false, active = false) {
        const btn = document.createElement('button');
        btn.className = 'datatable-page-btn';
        btn.textContent = text;
        btn.disabled = disabled;
        if (active) btn.classList.add('active');
        
        if (!disabled) {
            btn.addEventListener('click', () => {
                this.currentPage = page;
                this._updateTable();
                this._updatePagination();
            });
        }
        
        return btn;
    }

    _updateInfo() {
        if (!this.infoDiv) return;
        const start = ((this.currentPage - 1) * this.options.itemsPerPage) + 1;
        const end = Math.min(this.currentPage * this.options.itemsPerPage, this.filteredData.length);
        this.infoDiv.textContent = `Mostrando ${start}-${end} de ${this.filteredData.length} registros`;
    }

    setData(newData) {
        this.options.data = newData;
        this._processData();
        this.currentPage = 1;
        this._updateTable();
        if (this.options.pagination) this._updatePagination();
    }

    getData() {
        return this.options.data;
    }

    getFilteredData() {
        return this.filteredData;
    }

    addRow(rowData) {
        this.options.data.push(rowData);
        this._updateFilteredData();
        this._updateTable();
        if (this.options.pagination) this._updatePagination();
    }

    removeRow(index) {
        if (index >= 0 && index < this.options.data.length) {
            this.options.data.splice(index, 1);
            this._updateFilteredData();
            this._updateTable();
            if (this.options.pagination) this._updatePagination();
        }
    }

    updateRow(index, newData) {
        if (index >= 0 && index < this.options.data.length) {
            this.options.data[index] = { ...this.options.data[index], ...newData };
            this._updateFilteredData();
            this._updateTable();
        }
    }

    search(term) {
        this.searchTerm = term;
        if (this.searchInput) this.searchInput.value = term;
        this._updateFilteredData();
        this.currentPage = 1;
        this._updateTable();
        if (this.options.pagination) this._updatePagination();
    }

    clearSearch() {
        this.search('');
    }

    goToPage(page) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this._updateTable();
            if (this.options.pagination) this._updatePagination();
        }
    }

    refresh() {
        this._updateFilteredData();
        this._updateTable();
        if (this.options.pagination) this._updatePagination();
    }
};











/*  */


/* 
example table 


*/





// Datos locales simulados para el CRUD
let userData = [];
let nextId = 1;

// Función para simular fetch de datos
async function fetchUserData() {
    try {
        // Simular datos de API
        var mockData = [      ];
        
        // Simular delay de red
        //await new Promise(resolve => setTimeout(resolve, 500));
      var respuesta=   await fetch('https://raw.githubusercontent.com/prust/wikipedia-movie-data/refs/heads/master/movies-2000s.json');
        if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    // Usamos "await" nuevamente para esperar la conversión de la respuesta a JSON
    mockData= await respuesta.json();

        userData = mockData;
        nextId = Math.max(...mockData.map(u => u.id)) + 1;
        
        return mockData;
    } catch (error) {
        logEvent(`Error al cargar datos: ${error.message}`, 'error');
        return [];
    }
}

// Función para logging de eventos
function logEvent(message, type = 'info') {
    const eventsContainer = document.getElementById('events-log');
    if (!eventsContainer) return;
    
    const eventItem = document.createElement('div');
    eventItem.className = `event-item ${type}`;
    eventItem.innerHTML = `<strong>[${new Date().toLocaleTimeString()}]</strong> ${message}`;
    
    eventsContainer.insertBefore(eventItem, eventsContainer.firstChild);
    
    // Mantener solo los últimos 50 eventos
    while (eventsContainer.children.length > 50) {
        eventsContainer.removeChild(eventsContainer.lastChild);
    }
}

// Modal simple para formularios
function createModal(title, content) {
    return {
        element: null,
        open() {
            this.element = document.createElement('div');
            this.element.className = 'ui-modal-overlay';
            this.element.innerHTML = `
                <div class="ui-modal">
                    <div class="ui-modal-header">
                        <h3 class="ui-modal-title">${title}</h3>
                        <button class="ui-modal-close">×</button>
                    </div>
                    <div class="ui-modal-body">${content}</div>
                    <div class="ui-modal-footer"></div>
                </div>
            `;
            
            const closeBtn = this.element.querySelector('.ui-modal-close');
            closeBtn.addEventListener('click', () => this.close());
            
            this.element.addEventListener('click', (e) => {
                if (e.target === this.element) this.close();
            });
            
            document.body.appendChild(this.element);
            setTimeout(() => this.element.classList.add('open'), 10);
            
            return this;
        },
        close() {
            if (this.element) {
                this.element.classList.remove('open');
                setTimeout(() => {
                    if (this.element && this.element.parentNode) {
                        this.element.parentNode.removeChild(this.element);
                    }
                }, 300);
            }
        },
        addButton(text, onClick, variant = 'default') {
            const footer = this.element.querySelector('.ui-modal-footer');
            const btn = document.createElement('button');
            btn.className = `ui-button ${variant}`;
            btn.textContent = text;
            btn.addEventListener('click', onClick);
            footer.appendChild(btn);
            return this;
        }
    };
}

// CRUD Operations
const userCRUD = {
    create(userData) {
        const newUser = { ...userData, id: nextId++ };
        userData.push(newUser);
        logEvent(`Usuario creado: ${newUser.name}`, 'success');
        return newUser;
    },
    
    update(id, updatedData) {
        const index = userData.findIndex(user => user.id === id);
        if (index !== -1) {
            userData[index] = { ...userData[index], ...updatedData };
            logEvent(`Usuario actualizado: ${userData[index].name}`, 'info');
            return userData[index];
        }
        return null;
    },
    
    delete(id) {
        const index = userData.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedUser = userData.splice(index, 1)[0];
            logEvent(`Usuario eliminado: ${deletedUser.name}`, 'warning');
            return deletedUser;
        }
        return null;
    },
    
    get(id) {
        return userData.find(user => user.id === id);
    },
    
    getAll() {
        return userData;
    }
};

// Crear formulario para nuevo usuario
function showCreateUserModal(onSave) {
    const formHTML = `
        <div style="display: grid; gap: 15px;">
            <div>
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Nombre:</label>
                <input type="text" id="userName" style="width: 100%; padding: 8px; background: var(--base-bg); border: 1px solid var(--icon-color); color: var(--text-color); border-radius: 4px;">
            </div>
            <div>
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Email:</label>
                <input type="email" id="userEmail" style="width: 100%; padding: 8px; background: var(--base-bg); border: 1px solid var(--icon-color); color: var(--text-color); border-radius: 4px;">
            </div>
            <div>
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Edad:</label>
                <input type="number" id="userAge" style="width: 100%; padding: 8px; background: var(--base-bg); border: 1px solid var(--icon-color); color: var(--text-color); border-radius: 4px;">
            </div>
            <div>
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Rol:</label>
                <select id="userRole" style="width: 100%; padding: 8px; background: var(--base-bg); border: 1px solid var(--icon-color); color: var(--text-color); border-radius: 4px;">
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                    <option value="Analyst">Analyst</option>
                </select>
            </div>
        </div>
    `;
    
    const modal = createModal('Crear Nuevo Usuario', formHTML).open();
    
    modal.addButton('Cancelar', () => modal.close(), 'default')
         .addButton('Guardar', () => {
             const name = document.getElementById('userName').value.trim();
             const email = document.getElementById('userEmail').value.trim();
             const age = parseInt(document.getElementById('userAge').value);
             const role = document.getElementById('userRole').value;
             
             if (!name || !email || !age) {
                 alert('Por favor completa todos los campos');
                 return;
             }
             
             const newUser = userCRUD.create({ name, email, age, role });
             onSave(newUser);
             modal.close();
         }, 'primary');
}

// Inicializar DataTable
async function initializeDataTable(parentId) {
    const parent = document.getElementById(parentId);
    if (!parent) {
        console.error(`Elemento con ID '${parentId}' no encontrado`);
        return;
    }
    
    logEvent('Iniciando carga de datos...', 'info');
    
    // Cargar datos
    const data = await fetchUserData();
    logEvent(`Datos cargados: ${data.length} usuarios`, 'success');
    
    // Crear instancia de DataTable
    const dataTable = new GioUI.DataTable(parent, {
        data: data,
        autoColumns: true,
        showId: true,
        itemsPerPage: 10,
        pagination: true,
        searchable: true,
        sortable: true,
        editable: true,
        actions: [
            { name: 'edit', label: 'Editar' },
            { name: 'delete', label: 'Eliminar' },
            { name: 'view', label: 'Ver' }
        ],
        
        // Event Handlers
        onRowClick: (row, index, event) => {
            logEvent(`Click en fila: ${row.name} (índice: ${index})`, 'info');
        },
        
        onCellClick: (value, row, columnKey, event) => {
            logEvent(`Click en celda: ${columnKey} = "${value}" del usuario ${row.name}`, 'info');
        },
        
        onEdit: (row, columnKey, newValue, oldValue, index) => {
            logEvent(`Editado: ${row.name}.${columnKey} cambió de "${oldValue}" a "${newValue}"`, 'info');
            userCRUD.update(row.id, { [columnKey]: newValue });
        },
        
        onAction: (actionName, row, index, event) => {
            logEvent(`Acción "${actionName}" en usuario: ${row.name}`, 'info');
            
            switch (actionName) {
                case 'edit':
                    editUser(row, () => dataTable.refresh());
                    break;
                case 'delete':
                    deleteUser(row, () => {
                        userCRUD.delete(row.id);
                        dataTable.setData(userCRUD.getAll());
                    });
                    break;
                case 'view':
                    viewUser(row);
                    break;
            }
        }
    });
    
    // Agregar controles
    addTableControls(parent, dataTable);
    
    return dataTable;
}

// Controles adicionales
function addTableControls(parent, dataTable) {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'table-controls';
    controlsDiv.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        padding: 15px;
        background: var(--container-bg);
        border-radius: var(--border-radius);
        flex-wrap: wrap;
    `;
    
    
    const createBtn = document.createElement('button');
    createBtn.className = 'ui-button primary';
    createBtn.textContent = '+ Crear Usuario';
    createBtn.addEventListener('click', () => {
        showCreateUserModal((newUser) => {
            dataTable.setData(userCRUD.getAll());
        });
    });
    
 
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'ui-button';
    refreshBtn.textContent = '🔄 Refrescar';
    refreshBtn.addEventListener('click', async () => {
        logEvent('Refrescando datos...', 'info');
        const data = await fetchUserData();
        dataTable.setData(data);
        logEvent('Datos refrescados', 'success');
    });
    
  
    const clearSearchBtn = document.createElement('button');
    clearSearchBtn.className = 'ui-button';
    clearSearchBtn.textContent = '🗑️ Limpiar Búsqueda';
    clearSearchBtn.addEventListener('click', () => {
        dataTable.clearSearch();
        logEvent('Búsqueda limpiada', 'info');
    });
    
    controlsDiv.append(createBtn, refreshBtn, clearSearchBtn);
    parent.parentNode.insertBefore(controlsDiv, parent);
}

// Función para editar usuario
function editUser(user, onSave) {
    const formHTML = `
        <div style="display: grid; gap: 15px;">
            <div>
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Nombre:</label>
                <input type="text" id="editUserName" value="${user.name}" style="width: 100%; padding: 8px; background: var(--base-bg); border: 1px solid var(--icon-color); color: var(--text-color); border-radius: 4px;">
            </div>
            <div>
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Email:</label>
                <input type="email" id="editUserEmail" value="${user.email}" style="width: 100%; padding: 8px; background: var(--base-bg); border: 1px solid var(--icon-color); color: var(--text-color); border-radius: 4px;">
            </div>
            <div>
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Edad:</label>
                <input type="number" id="editUserAge" value="${user.age}" style="width: 100%; padding: 8px; background: var(--base-bg); border: 1px solid var(--icon-color); color: var(--text-color); border-radius: 4px;">
            </div>
            <div>
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Rol:</label>
                <select id="editUserRole" style="width: 100%; padding: 8px; background: var(--base-bg); border: 1px solid var(--icon-color); color: var(--text-color); border-radius: 4px;">
                    <option value="Developer" ${user.role === 'Developer' ? 'selected' : ''}>Developer</option>
                    <option value="Designer" ${user.role === 'Designer' ? 'selected' : ''}>Designer</option>
                    <option value="Manager" ${user.role === 'Manager' ? 'selected' : ''}>Manager</option>
                    <option value="Analyst" ${user.role === 'Analyst' ? 'selected' : ''}>Analyst</option>
                </select>
            </div>
        </div>
    `;
    
    const modal = createModal(`Editar Usuario: ${user.name}`, formHTML).open();
    
    modal.addButton('Cancelar', () => modal.close(), 'default')
         .addButton('Guardar Cambios', () => {
             const name = document.getElementById('editUserName').value.trim();
             const email = document.getElementById('editUserEmail').value.trim();
             const age = parseInt(document.getElementById('editUserAge').value);
             const role = document.getElementById('editUserRole').value;
             
             if (!name || !email || !age) {
                 alert('Por favor completa todos los campos');
                 return;
             }
             
             userCRUD.update(user.id, { name, email, age, role });
             onSave();
             modal.close();
         }, 'primary');
}

 
function deleteUser(user, onDelete) {
    const modal = createModal('Confirmar Eliminación', 
        `<p>¿Estás seguro de que deseas eliminar al usuario <strong>${user.name}</strong>?</p>
         <p style="color: var(--error-color); font-size: 14px;">Esta acción no se puede deshacer.</p>`
    ).open();
    
    modal.addButton('Cancelar', () => modal.close(), 'default')
         .addButton('Eliminar', () => {
             onDelete();
             modal.close();
         }, 'error');
}

 
function viewUser(user) {
    const detailsHTML = `
        <div style="display: grid; gap: 10px;">
            <div><strong>ID:</strong> ${user.id}</div>
            <div><strong>Nombre:</strong> ${user.name}</div>
            <div><strong>Email:</strong> ${user.email}</div>
            <div><strong>Edad:</strong> ${user.age} años</div>
            <div><strong>Rol:</strong> ${user.role}</div>
        </div>
    `;
    
    const modal = createModal(`Detalles de ${user.name}`, detailsHTML).open();
    modal.addButton('Cerrar', () => modal.close(), 'primary');
}

 
function initializeCRUDTable(parentId) {
   
    if (!document.getElementById('events-log')) {
        const eventsContainer = document.createElement('div');
        eventsContainer.id = 'events-log';
        eventsContainer.innerHTML = '<h3>Log de Eventos:</h3>';
        eventsContainer.style.cssText = `
            background: var(--container-bg);
            padding: 20px;
            border-radius: var(--border-radius);
            margin-top: 20px;
            max-height: 300px;
            overflow-y: auto;
        `;
        document.body.appendChild(eventsContainer);
    }
    
 
    return initializeDataTable(parentId);
}

 
 var table ;
async function   initablegio(){
   table = await initializeCRUDTable('idtablediv');
}
 
async function fetchRealData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        return data.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            phone: user.phone,
            website: user.website
        }));
    } catch (error) {
        logEvent(`Error al cargar datos: ${error.message}`, 'error');
        return [];
    }
}
 

