class EditorCurvas {

  /* ─────────────── CONSTRUCTOR ─────────────── */
  constructor() {
    this._canvas    = null;
    this._ctx       = null;
    this._img       = null;
    this._channel   = 'all';
    this._dragging  = null;
    this._hitRadius = 9;
    this._W = 272;
    this._H = 272;

    this._curves = {
      all: [{ x:0,y:0 },{ x:255,y:255 }],
      r:   [{ x:0,y:0 },{ x:255,y:255 }],
      g:   [{ x:0,y:0 },{ x:255,y:255 }],
      b:   [{ x:0,y:0 },{ x:255,y:255 }],
    };
    this._luts = { all:null, r:null, g:null, b:null };

    /* ID único para no colisionar si hay múltiples instancias */
    this._id = 'ec_' + Math.random().toString(36).slice(2,8);

    this._injectCSS();
    this._buildPanel();
    this._bindPanelEvents();
    this._buildLuts();
    this._drawCurve();
  }

  /* ─────────────── API PÚBLICA ─────────────── */

  setCanvas(htmlCanvas) {
    this._canvas = htmlCanvas;
    this._ctx    = htmlCanvas.getContext('2d');
    /* guarda snapshot actual como imagen de referencia */
    const tmp = new Image();
    tmp.onload = () => { this._img = tmp; };
    tmp.src = htmlCanvas.toDataURL();
  }

  show()   { this._panel.classList.add('ec-visible'); }
  hide()   { this._panel.classList.remove('ec-visible'); }
  toggle() { this._panel.classList.toggle('ec-visible'); }

  resetPoints() {
    this._curves[this._channel] = [{ x:0,y:0 },{ x:255,y:255 }];
    this._buildLuts();
    this._drawCurve();
  }

  apply() {
    if (!this._canvas || !this._img) return;
    this._canvas.width  = this._img.naturalWidth  || this._img.width;
    this._canvas.height = this._img.naturalHeight || this._img.height;
    this._ctx.drawImage(this._img, 0, 0);

    const id = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
    const d  = id.data;
    const la = this._luts.all, lr = this._luts.r, lg = this._luts.g, lb = this._luts.b;

    for (let i = 0; i < d.length; i += 4) {
      const applyAll = (v) => la ? la[v] : v;
      d[i]   = lr ? lr[applyAll(d[i])]   : applyAll(d[i]);
      d[i+1] = lg ? lg[applyAll(d[i+1])] : applyAll(d[i+1]);
      d[i+2] = lb ? lb[applyAll(d[i+2])] : applyAll(d[i+2]);
    }
    this._ctx.putImageData(id, 0, 0);

    /* actualiza snapshot de referencia */
    const snap = new Image();
    snap.onload = () => { this._img = snap; };
    snap.src = this._canvas.toDataURL();
  }

  destroy() {
    this._panel.remove();
    this._styleEl.remove();
    this._curveCanvas.removeEventListener('mousedown', this._onMD);
    window.removeEventListener('mousemove', this._onMM);
    window.removeEventListener('mouseup',   this._onMU);
  }

  /* ─────────────── CSS INYECTADO ─────────────── */

  _injectCSS() {
    const css = `
      .ec-panel {
        position: fixed; top: 60px; right: 24px;
        width: 300px;
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 4px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.7);
        display: none;
        flex-direction: column;
        z-index: 9999999999999999999;
        user-select: none;
        font-family: 'SF Mono','Fira Code',monospace;
        font-size: 13px;
        color: #ccc;
      }
      .ec-panel.ec-visible { display: flex; }

      .ec-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 8px 12px;
        border-bottom: 1px solid #2a2a2a;
        cursor: move;
      }
      .ec-title { font-size: 11px; letter-spacing: 0.08em; color: #888; text-transform: uppercase; }
      .ec-close {
        width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;
        border-radius: 3px; border: none; background: transparent;
        color: #555; cursor: pointer; font-size: 16px; padding: 0; line-height: 1;
        font-family: inherit;
      }
      .ec-close:hover { background: #2a2a2a; color: #ccc; }

      .ec-channels {
        display: flex; align-items: center; gap: 6px;
        padding: 8px 12px; border-bottom: 1px solid #2a2a2a; flex-wrap: wrap;
      }
      .ec-ch-label { color: #555; font-size: 11px; margin-right: 2px; }
      .ec-ch {
        display: flex; align-items: center; gap: 4px;
        font-size: 12px; cursor: pointer;
        padding: 3px 8px; border-radius: 3px; border: 1px solid #333;
        transition: background 0.1s, border-color 0.1s;
        color: #aaa;
      }
      .ec-ch input { display: none; }
      .ec-ch.ec-active-all,
      .ec-ch.ec-active-r,
      .ec-ch.ec-active-g,
      .ec-ch.ec-active-b  { border-color: #aaa; background: #2a2a2a; color: #fff; }

      .ec-curve-wrap { padding: 10px 12px; }
      .ec-curve-canvas {
        display: block; width: 272px; height: 272px;
        border-radius: 3px; cursor: crosshair;
        border: 1px solid #2a2a2a;
      }

      .ec-hint {
        font-size: 11px; color: #444;
        text-align: center; padding: 0 12px 4px;
      }

      .ec-actions {
        display: flex; gap: 8px; padding: 8px 12px 10px; justify-content: flex-end;
      }
      .ec-btn {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 5px 12px; background: #222;
        border: 1px solid #333; border-radius: 3px;
        cursor: pointer; color: #aaa;
        font-family: inherit; font-size: 12px;
        transition: background 0.1s, border-color 0.1s;
      }
      .ec-btn:hover { background: #2a2a2a; border-color: #666; color: #fff; }
      .ec-btn-apply { border-color: #666; color: #ddd; }
      .ec-btn-apply:hover { background: #2a2a2a; border-color: #999; }
    `;
    this._styleEl = document.createElement('style');
    this._styleEl.textContent = css;
    document.head.appendChild(this._styleEl);
  }

  /* ─────────────── CONSTRUCCIÓN DEL PANEL ─────────────── */

  _buildPanel() {
    const panel = document.createElement('div');
    panel.className = 'ec-panel';
    panel.id = this._id;

    panel.innerHTML = `
      <div class="ec-header">
        <span class="ec-title">Curvas</span>
        <button class="ec-close">×</button>
      </div>
      <div class="ec-channels">
        <span class="ec-ch-label">Canal:</span>
        <label class="ec-ch ec-active-all" data-ch="all"><input type="checkbox" checked>ALL</label>
        <label class="ec-ch" data-ch="r"><input type="checkbox">R</label>
        <label class="ec-ch" data-ch="g"><input type="checkbox">G</label>
        <label class="ec-ch" data-ch="b"><input type="checkbox">B</label>
      </div>
      <div class="ec-curve-wrap">
        <canvas class="ec-curve-canvas"></canvas>
      </div>
      <p class="ec-hint">clic = agregar punto · arrastrar = mover</p>
      <div class="ec-actions">
        <button class="ec-btn ec-btn-reset">↺ Reset</button>
        <button class="ec-btn ec-btn-apply">✓ Aplicar</button>
      </div>
    `;

    document.body.appendChild(panel);
    this._panel = panel;

    /* referencias internas */
    this._curveCanvas = panel.querySelector('.ec-curve-canvas');
    this._curveCanvas.width  = this._W;
    this._curveCanvas.height = this._H;
    this._cCtx = this._curveCanvas.getContext('2d');
  }

  /* ─────────────── EVENTOS DEL PANEL ─────────────── */

  _bindPanelEvents() {
    /* cerrar */
    this._panel.querySelector('.ec-close').addEventListener('click', () => this.hide());

    /* botones reset / apply */
    this._panel.querySelector('.ec-btn-reset').addEventListener('click', () => this.resetPoints());
    this._panel.querySelector('.ec-btn-apply').addEventListener('click', () => this.apply());

    /* canales */
    this._panel.querySelectorAll('.ec-ch').forEach(label => {
      label.addEventListener('click', () => {
        this._panel.querySelectorAll('.ec-ch').forEach(l => {
          l.classList.remove('ec-active-all','ec-active-r','ec-active-g','ec-active-b');
          l.querySelector('input').checked = false;
        });
        const ch = label.dataset.ch;
        label.classList.add('ec-active-' + ch);
        label.querySelector('input').checked = true;
        this._channel = ch;
        this._drawCurve();
      });
    });

    /* drag del panel */
    let dragStart = null, panelStart = null;
    this._panel.querySelector('.ec-header').addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('ec-close')) return;
      const r = this._panel.getBoundingClientRect();
      dragStart  = { x: e.clientX, y: e.clientY };
      panelStart = { x: r.left, y: r.top };
      e.preventDefault();
    });
    const mmDrag = (e) => {
      if (!dragStart) return;
      this._panel.style.right = 'auto';
      this._panel.style.left  = (panelStart.x + e.clientX - dragStart.x) + 'px';
      this._panel.style.top   = (panelStart.y + e.clientY - dragStart.y) + 'px';
    };
    const muDrag = () => { dragStart = null; };
    window.addEventListener('mousemove', mmDrag);
    window.addEventListener('mouseup',   muDrag);

    /* curva — interacción */
    this._onMD = this._onMouseDown.bind(this);
    this._onMM = this._onMouseMove.bind(this);
    this._onMU = this._onMouseUp.bind(this);
    this._curveCanvas.addEventListener('mousedown', this._onMD);
    window.addEventListener('mousemove', this._onMM);
    window.addEventListener('mouseup',   this._onMU);
  }

  /* ─────────────── LUT / SPLINE ─────────────── */

  _buildLuts() {
    for (const ch of ['all','r','g','b']) {
      const pts = this._curves[ch];
      const linear = pts.length === 2
        && pts[0].x === 0 && pts[0].y === 0
        && pts[1].x === 255 && pts[1].y === 255;
      this._luts[ch] = linear ? null : this._makeLut(pts);
    }
  }

  _makeLut(points) {
    const sorted = [...points].sort((a,b) => a.x - b.x);
    const lut    = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      lut[i] = Math.min(255, Math.max(0, Math.round(this._splineAt(sorted, i))));
    }
    return lut;
  }

  _splineAt(pts, x) {
    if (pts.length === 1) return pts[0].y;
    if (x <= pts[0].x) return pts[0].y;
    if (x >= pts[pts.length-1].x) return pts[pts.length-1].y;
    for (let i = 0; i < pts.length - 1; i++) {
      if (x >= pts[i].x && x <= pts[i+1].x) {
        if (pts.length === 2) {
          const t = (x - pts[i].x) / (pts[i+1].x - pts[i].x);
          return pts[i].y + t * (pts[i+1].y - pts[i].y);
        }
        return this._catmull(pts, i, x);
      }
    }
    return x;
  }

  _catmull(pts, i, x) {
    const p0 = pts[Math.max(0, i-1)];
    const p1 = pts[i];
    const p2 = pts[i+1];
    const p3 = pts[Math.min(pts.length-1, i+2)];
    const t  = (x - p1.x) / (p2.x - p1.x);
    const t2 = t*t, t3 = t2*t;
    return 0.5 * (
      (2*p1.y) +
      (-p0.y + p2.y) * t +
      (2*p0.y - 5*p1.y + 4*p2.y - p3.y) * t2 +
      (-p0.y + 3*p1.y - 3*p2.y + p3.y) * t3
    );
  }

  /* ─────────────── DIBUJO DE CURVA ─────────────── */

  _ptToC(pt) {
    return {
      cx: (pt.x / 255) * (this._W - 1),
      cy: (this._H - 1) - (pt.y / 255) * (this._H - 1),
    };
  }

  _cToPt(cx, cy) {
    return {
      x: Math.min(255, Math.max(0, Math.round((cx / (this._W-1)) * 255))),
      y: Math.min(255, Math.max(0, Math.round(((this._H-1-cy) / (this._H-1)) * 255))),
    };
  }

  _chColor(ch) {
    return '#fff';
  }

  _drawCurve() {
    const W = this._W, H = this._H, ctx = this._cCtx, ch = this._channel;
    ctx.clearRect(0, 0, W, H);

    /* fondo */
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    /* grilla */
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo((W/4)*i, 0); ctx.lineTo((W/4)*i, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, (H/4)*i); ctx.lineTo(W, (H/4)*i); ctx.stroke();
    }

    /* diagonal neutra */
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.setLineDash([3,3]);
    ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(W, 0); ctx.stroke();
    ctx.setLineDash([]);

    /* curvas de los otros canales (guía tenue) */
    for (const och of ['all','r','g','b']) {
      if (och === ch) continue;
      const opts = [...this._curves[och]].sort((a,b) => a.x - b.x);
      const isLinear = opts.length === 2 && opts[0].x===0 && opts[0].y===0 && opts[1].x===255 && opts[1].y===255;
      if (isLinear) continue;
      ctx.strokeStyle = this._chColor(och) + '33';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let s = 0; s <= W; s++) {
        const vx = (s/W)*255, vy = this._splineAt(opts, vx);
        const cx = (vx/255)*(W-1), cy = (H-1)-(vy/255)*(H-1);
        s===0 ? ctx.moveTo(cx,cy) : ctx.lineTo(cx,cy);
      }
      ctx.stroke();
    }

    /* curva activa */
    const pts   = [...this._curves[ch]].sort((a,b) => a.x - b.x);
    const color = this._chColor(ch);
    ctx.strokeStyle = color;
    ctx.lineWidth   = 2;
    ctx.beginPath();
    for (let s = 0; s <= W; s++) {
      const vx = (s/W)*255, vy = this._splineAt(pts, vx);
      const cx = (vx/255)*(W-1), cy = (H-1)-(vy/255)*(H-1);
      s===0 ? ctx.moveTo(cx,cy) : ctx.lineTo(cx,cy);
    }
    ctx.stroke();

    /* puntos de control */
    for (const pt of this._curves[ch]) {
      const { cx, cy } = this._ptToC(pt);
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI*2);
      ctx.fillStyle = '#000'; ctx.fill();
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
    }
  }

  /* ─────────────── INTERACCIÓN CON LA CURVA ─────────────── */

  _relPos(e) {
    const r = this._curveCanvas.getBoundingClientRect();
    /* escala CSS vs resolución real */
    const scaleX = this._W / r.width;
    const scaleY = this._H / r.height;
    return {
      x: (e.clientX - r.left) * scaleX,
      y: (e.clientY - r.top)  * scaleY,
    };
  }

  _hitTest(cx, cy) {
    for (let i = 0; i < this._curves[this._channel].length; i++) {
      const { cx:px, cy:py } = this._ptToC(this._curves[this._channel][i]);
      if (Math.hypot(cx-px, cy-py) < this._hitRadius) return i;
    }
    return -1;
  }

  _onMouseDown(e) {
    e.preventDefault();
    const { x, y } = this._relPos(e);
    const hit = this._hitTest(x, y);
    if (hit >= 0) { this._dragging = hit; return; }

    const pt = this._cToPt(x, y);
    this._curves[this._channel].push(pt);
    this._curves[this._channel].sort((a,b) => a.x - b.x);
    this._dragging = this._curves[this._channel].findIndex(p => p === pt);
    this._buildLuts();
    this._drawCurve();
  }

  _onMouseMove(e) {
    if (this._dragging === null) return;
    const { x, y } = this._relPos(e);
    const pts = this._curves[this._channel];
    const idx = this._dragging;
    const pt  = this._cToPt(x, y);

    /* extremos solo mueven Y */
    if (idx === 0) pt.x = 0;
    else if (idx === pts.length - 1) pt.x = 255;

    const ref = pts[idx];
    ref.x = pt.x;
    ref.y = pt.y;

    pts.sort((a,b) => a.x - b.x);
    this._dragging = pts.indexOf(ref);
    this._buildLuts();
    this._drawCurve();
  }

  _onMouseUp() { this._dragging = null; }
}