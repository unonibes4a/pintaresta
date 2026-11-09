<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giovanni CAD Engine</title>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/TransformControls.js"></script>
    <script src="giovanniUI.js"></script>

    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            user-select: none;
            -webkit-user-select: none;
        }

        body, html {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #16171a;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #8c8e8f;
        }

        #viewport-container {
            width: 100vw;
            height: 100vh;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
        

        #cad-inspector-dock {
            position: fixed;
            top: 15px;
            right: 15px;
            width: 330px;
            max-height: calc(100vh - 30px);
     
       
            z-index: 20;
            pointer-events: auto;
            overflow-y: auto;
            overflow-x: hidden;

       
        }

        #cad-hud {
            position: fixed;
            bottom: 18px;
            left: 18px;
            background: rgba(35, 35, 38, 0.88);
            backdrop-filter: blur(8px);
            border: 1px solid #3d3d42;
            border-radius: 6px;
            padding: 6px 14px;
            font-size: 11px;
            font-family: monospace;
            color: #4daafc;
            z-index: 15;
            pointer-events: none;
            display: flex;
            gap: 15px;
        }

        .hud-highlight {
            color: #ffffff;
            font-weight: 700;
           
        }
    </style>
</head>
<body>

    <div id="viewport-container"></div>

    <div id="cad-hud">
        <span>CÁMARA: <span id="hud-cam" class="hud-highlight">ORBIT</span></span>
        <span>MODO: <span id="hud-gizmo" class="hud-highlight">TRANSLATE (W)</span></span>
        <span>ESPACIO: <span id="hud-space" class="hud-highlight">WORLD</span></span>
        <span>DIST. PLANO: <span id="hud-depth" class="hud-highlight">10.0m</span></span>
        <span>SELECCIÓN: <span id="hud-selection" class="hud-highlight">NINGUNA</span></span>
    </div>

    <aside id="cad-inspector-dock" class="clbg classflexColum300px"></aside>

    <script>
    class BlenderNavigationGizmo {
        constructor(mainCamera, controls, domContainer = document.body, size = 128) {
            this.mainCamera = mainCamera;
            this.controls = controls;
            this.size = size;

            this.domElement = document.createElement('canvas');
            this.domElement.width = this.size;
            this.domElement.height = this.size;
            this.domElement.style.cssText = `
                position: absolute;
                top: 20px;
                right: 360px;
                width: ${this.size}px;
                height: ${this.size}px;
                z-index: 1000;
                cursor: pointer;
                user-select: none;
                -webkit-user-select: none;
            `;
            domContainer.appendChild(this.domElement);

            this.renderer = new THREE.WebGLRenderer({
                canvas: this.domElement,
                alpha: true,
                antialias: true
            });
            this.renderer.setSize(this.size, this.size);
            this.renderer.setPixelRatio(window.devicePixelRatio || 1);

            this.scene = new THREE.Scene();
            this.camera = new THREE.OrthographicCamera(-1.8, 1.8, 1.8, -1.8, 0.1, 50);
            this.camera.position.set(0, 0, 5);

            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();

            this.axes = [
                { name: 'X', dir: new THREE.Vector3(1, 0, 0), color: '#ff3b5c', negativeColor: '#8a2336', isNegative: false },
                { name: '-X', dir: new THREE.Vector3(-1, 0, 0), color: '#8a2336', negativeColor: '#8a2336', isNegative: true },
                { name: 'Y', dir: new THREE.Vector3(0, 1, 0), color: '#8cdb00', negativeColor: '#4d7504', isNegative: false },
                { name: '-Y', dir: new THREE.Vector3(0, -1, 0), color: '#4d7504', negativeColor: '#4d7504', isNegative: true },
                { name: 'Z', dir: new THREE.Vector3(0, 0, 1), color: '#2e8cff', negativeColor: '#174782', isNegative: false },
                { name: '-Z', dir: new THREE.Vector3(0, 0, -1), color: '#174782', negativeColor: '#174782', isNegative: true }
            ];

            this.axisMeshes = [];
            this.lineMeshes = [];
            this.isAnimating = false;

            this.buildGizmo();
            this.bindEvents();
        }

        makeTextTexture(text, bgColor, isNegative = false) {
            const canvas = document.createElement('canvas');
            canvas.width = 128;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.arc(64, 64, 56, 0, Math.PI * 2);
            ctx.fillStyle = bgColor;
            ctx.fill();

            if (isNegative) {
                ctx.lineWidth = 8;
                ctx.strokeStyle = '#ffffff';
                ctx.stroke();
            } else {
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(text, 64, 66);
            }

            return new THREE.CanvasTexture(canvas);
        }

        buildGizmo() {
            const sphereGeo = new THREE.SphereGeometry(0.24, 24, 24);

            this.axes.forEach(axis => {
                const texture = this.makeTextTexture(axis.name, axis.color, axis.isNegative);
                const mat = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    depthTest: false,
                    depthWrite: false
                });

                const mesh = new THREE.Mesh(sphereGeo, mat);
                mesh.userData = { axis: axis };
                mesh.renderOrder = 2;
                this.scene.add(mesh);
                this.axisMeshes.push(mesh);

                if (!axis.isNegative) {
                    const lineGeo = new THREE.BufferGeometry().setFromPoints([
                        new THREE.Vector3(0, 0, 0),
                        axis.dir.clone().multiplyScalar(1.15)
                    ]);
                    const lineMat = new THREE.LineBasicMaterial({
                        color: new THREE.Color(axis.color),
                        linewidth: 3,
                        depthTest: false,
                        depthWrite: false
                    });
                    const line = new THREE.Line(lineGeo, lineMat);
                    line.renderOrder = 1;
                    this.scene.add(line);
                    this.lineMeshes.push(line);
                }
            });
        }

        bindEvents() {
            this.domElement.addEventListener('pointerdown', (e) => this.onPointerDown(e));
        }

        onPointerDown(e) {
            if (this.isAnimating) return;

            const rect = this.domElement.getBoundingClientRect();
            this.mouse.x = ((e.clientX - rect.left) / this.size) * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top) / this.size) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const hits = this.raycaster.intersectObjects(this.axisMeshes);

            if (hits.length > 0) {
                hits.sort((a, b) => b.object.position.z - a.object.position.z);
                const selectedAxis = hits[0].object.userData.axis;
                this.switchView(selectedAxis.dir);
            }
        }

        switchView(targetDir) {
            this.isAnimating = true;

            const target = this.controls.target ? this.controls.target.clone() : new THREE.Vector3();
            const dist = this.mainCamera.position.distanceTo(target);

            const targetPos = target.clone().add(targetDir.clone().multiplyScalar(dist));
            const startPos = this.mainCamera.position.clone();

            const startQuat = this.mainCamera.quaternion.clone();
            const dummyCam = this.mainCamera.clone();
            dummyCam.position.copy(targetPos);
            dummyCam.lookAt(target);

            if (Math.abs(targetDir.y) === 1) {
                dummyCam.up.set(0, 0, targetDir.y > 0 ? -1 : 1);
                dummyCam.lookAt(target);
            } else {
                dummyCam.up.set(0, 1, 0);
                dummyCam.lookAt(target);
            }

            const endQuat = dummyCam.quaternion.clone();

            const duration = 350;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);

                this.mainCamera.position.lerpVectors(startPos, targetPos, ease);
                this.mainCamera.quaternion.slerpQuaternions(startQuat, endQuat, ease);

                if (this.controls && this.controls.update) {
                    this.controls.update();
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    this.mainCamera.position.copy(targetPos);
                    this.mainCamera.quaternion.copy(endQuat);
                    if (this.controls && this.controls.update) {
                        this.controls.update();
                    }
                    this.isAnimating = false;
                }
            };

            requestAnimationFrame(animate);
        }

        update() {
            const rotMat = new THREE.Matrix4();
            rotMat.extractRotation(this.mainCamera.matrixWorldInverse);

            this.axisMeshes.forEach(mesh => {
                const axis = mesh.userData.axis;
                const v = axis.dir.clone().multiplyScalar(1.15).applyMatrix4(rotMat);
                mesh.position.copy(v);
                mesh.quaternion.identity();
                mesh.renderOrder = v.z > 0 ? 3 : 1;
            });

            this.lineMeshes.forEach((line, idx) => {
                const positiveAxes = this.axes.filter(a => !a.isNegative);
                const axis = positiveAxes[idx];
                const v = axis.dir.clone().multiplyScalar(1.15).applyMatrix4(rotMat);
                const posAttr = line.geometry.attributes.position;
                posAttr.setXYZ(1, v.x, v.y, v.z);
                posAttr.needsUpdate = true;
            });

            this.renderer.render(this.scene, this.camera);
        }

        destroy() {
            this.domElement.remove();
            this.renderer.dispose();
        }
    }

    class GodotFlyControls {
        constructor(camera, domElement) {
            this.camera = camera;
            this.domElement = domElement;
            this.enabled = false;

            this.speed = 10.0;
            this.minSpeed = 0.5;
            this.maxSpeed = 100.0;
            this.speedStep = 1.25;
            this.sensitivity = 0.0025;

            this.moveState = {
                forward: 0,
                backward: 0,
                left: 0,
                right: 0,
                up: 0,
                down: 0
            };

            this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
            this.isLocked = false;
            this.direction = new THREE.Vector3();

            this._onMouseMove = this.onMouseMove.bind(this);
            this._onMouseDown = this.onMouseDown.bind(this);
            this._onMouseUp = this.onMouseUp.bind(this);
            this._onKeyDown = this.onKeyDown.bind(this);
            this._onKeyUp = this.onKeyUp.bind(this);
            this._onWheel = this.onWheel.bind(this);
            this._onContextMenu = (e) => { if (this.enabled) e.preventDefault(); };

            this.attach();
        }

        attach() {
            this.domElement.addEventListener('contextmenu', this._onContextMenu);
            this.domElement.addEventListener('mousedown', this._onMouseDown);
            window.addEventListener('mouseup', this._onMouseUp);
            window.addEventListener('mousemove', this._onMouseMove);
            window.addEventListener('keydown', this._onKeyDown);
            window.addEventListener('keyup', this._onKeyUp);
            this.domElement.addEventListener('wheel', this._onWheel, { passive: false });
        }

        detach() {
            this.domElement.removeEventListener('contextmenu', this._onContextMenu);
            this.domElement.removeEventListener('mousedown', this._onMouseDown);
            window.removeEventListener('mouseup', this._onMouseUp);
            window.removeEventListener('mousemove', this._onMouseMove);
            window.removeEventListener('keydown', this._onKeyDown);
            window.removeEventListener('keyup', this._onKeyUp);
            this.domElement.removeEventListener('wheel', this._onWheel);
            this.resetState();
        }

        resetState() {
            this.isLocked = false;
            this.moveState.forward = 0;
            this.moveState.backward = 0;
            this.moveState.left = 0;
            this.moveState.right = 0;
            this.moveState.up = 0;
            this.moveState.down = 0;
        }

        onMouseDown(e) {
            if (!this.enabled) return;
            if (e.button === 2) {
                this.isLocked = true;
                this.euler.setFromQuaternion(this.camera.quaternion);
            }
        }

        onMouseUp(e) {
            if (!this.enabled) return;
            if (e.button === 2) {
                this.isLocked = false;
                this.moveState.forward = 0;
                this.moveState.backward = 0;
                this.moveState.left = 0;
                this.moveState.right = 0;
                this.moveState.up = 0;
                this.moveState.down = 0;
            }
        }

        onMouseMove(e) {
            if (!this.enabled || !this.isLocked) return;
            const mx = e.movementX || 0;
            const my = e.movementY || 0;

            this.euler.setFromQuaternion(this.camera.quaternion);
            this.euler.y -= mx * this.sensitivity;
            this.euler.x -= my * this.sensitivity;
            this.euler.x = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, this.euler.x));

            this.camera.quaternion.setFromEuler(this.euler);
        }

        onWheel(e) {
            if (!this.enabled) return;
            e.preventDefault();
            if (e.deltaY < 0) {
                this.speed = Math.min(this.maxSpeed, this.speed * this.speedStep);
            } else {
                this.speed = Math.max(this.minSpeed, this.speed / this.speedStep);
            }
        }

        onKeyDown(e) {
            if (!this.enabled || !this.isLocked) return;
            switch (e.code) {
                case 'KeyW': this.moveState.forward = 1; break;
                case 'KeyS': this.moveState.backward = 1; break;
                case 'KeyA': this.moveState.left = 1; break;
                case 'KeyD': this.moveState.right = 1; break;
                case 'KeyE': this.moveState.down = 1; break;
                case 'KeyQ': this.moveState.up = 1; break;
            }
        }

        onKeyUp(e) {
            if (!this.enabled) return;
            switch (e.code) {
                case 'KeyW': this.moveState.forward = 0; break;
                case 'KeyS': this.moveState.backward = 0; break;
                case 'KeyA': this.moveState.left = 0; break;
                case 'KeyD': this.moveState.right = 0; break;
                case 'KeyE': this.moveState.down = 0; break;
                case 'KeyQ': this.moveState.up = 0; break;
            }
        }

        update(delta) {
            if (!this.enabled || !this.isLocked) return;

            this.direction.z = Number(this.moveState.forward) - Number(this.moveState.backward);
            this.direction.x = Number(this.moveState.right) - Number(this.moveState.left);
            this.direction.y = Number(this.moveState.up) - Number(this.moveState.down);
            this.direction.normalize();

            const actualSpeed = this.speed * delta;

            if (this.moveState.forward || this.moveState.backward) {
                this.camera.translateZ(-this.direction.z * actualSpeed);
            }
            if (this.moveState.left || this.moveState.right) {
                this.camera.translateX(this.direction.x * actualSpeed);
            }
            if (this.moveState.up || this.moveState.down) {
                this.camera.position.y += this.direction.y * actualSpeed;
            }
        }

        destroy() {
            this.detach();
        }
    }

    class CadModel {
        constructor() {
            this.entities = new Map();
            this.selectedId = null;
            this.gizmoMode = 'translate';
            this.gizmoSpace = 'world';
            this.snapEnabled = false;
            this.gridVisible = true;
            this.cameraMode = 'orbit';
            this.planeSpawnDepth = 10.0;
        }

        createEntity(type = 'box', name = null, customProps = {}) {
            const id = 'cad_' + Math.random().toString(36).substr(2, 7);
            const index = this.entities.size + 1;
            const entityName = name || `${type.toUpperCase()}_${index}`;

            const entity = {
                id,
                name: entityName,
                type,
                position: customProps.position ? { ...customProps.position } : { x: 0, y: 0.6, z: 0 },
                rotation: customProps.rotation ? { ...customProps.rotation } : { x: 0, y: 0, z: 0 },
                scale: customProps.scale ? { ...customProps.scale } : { x: 1, y: 1, z: 1 },
                color: customProps.color || '#4daafc',
                roughness: 0.35,
                metalness: 0.15,
                wireframe: false,
                opacity: 1.0,
                visible: true,
                width: customProps.width || 4.0,
                height: customProps.height || 4.0
            };

            this.entities.set(id, entity);
            this.selectedId = id;
            return entity;
        }

        deleteEntity(id) {
            if (!this.entities.has(id)) return false;
            this.entities.delete(id);
            if (this.selectedId === id) this.selectedId = null;
            return true;
        }

        getEntity(id) { return this.entities.get(id); }
        getSelected() { return this.entities.get(this.selectedId); }
        setSelected(id) {
            this.selectedId = this.entities.has(id) ? id : null;
            return this.getSelected();
        }

        getTreeData() {
            return Array.from(this.entities.values()).map(e => ({
                id: e.id,
                name: e.name,
                icon: e.type === 'box' ? 'cube' : e.type === 'sphere' ? 'sphere' : e.type === 'plane' ? 'square' : 'drop',
                visible: e.visible,
                open: true
            }));
        }
    }

    class CadThreeEngine {
        constructor(viewportElement) {
            this.viewport = viewportElement;
            this.meshMap = new Map();

            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color('#16171a');

            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
            this.camera.position.set(8, 7, 10);

            this.renderer = new THREE.WebGLRenderer({ antialias: true });
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.viewport.appendChild(this.renderer.domElement);

            this.orbitControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.orbitControls.enableDamping = true;
            this.orbitControls.dampingFactor = 0.05;

            this.flyControls = new GodotFlyControls(this.camera, this.renderer.domElement);
            this.navGizmo = new BlenderNavigationGizmo(this.camera, this.orbitControls, document.body, 128);

            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();

            this._initLights();
            this._initGridAndAxes();
            this._initGizmo();
            this._initRayPointer();

            window.addEventListener('resize', () => {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }

        _initLights() {
            const amb = new THREE.AmbientLight(0xffffff, 0.65);
            this.scene.add(amb);

            const dir = new THREE.DirectionalLight(0xffffff, 0.85);
            dir.position.set(12, 20, 15);
            dir.castShadow = true;
            dir.shadow.mapSize.width = 2048;
            dir.shadow.mapSize.height = 2048;
            this.scene.add(dir);

            const fill = new THREE.DirectionalLight(0x4daafc, 0.3);
            fill.position.set(-12, -6, -10);
            this.scene.add(fill);
        }

        _initGridAndAxes() {
            this.grid = new THREE.GridHelper(40, 40, 0x4daafc, 0x333b45);
            this.scene.add(this.grid);

            this.axes = new THREE.AxesHelper(2.5);
            this.scene.add(this.axes);
        }

        _initGizmo() {
            this.gizmo = new THREE.TransformControls(this.camera, this.renderer.domElement);
            this.gizmo.setSize(0.75);
            this.gizmo.addEventListener('dragging-changed', (e) => {
                this.orbitControls.enabled = !e.value && !this.flyControls.enabled;
            });
            this.scene.add(this.gizmo);
        }

        _initRayPointer(colorHex = '#00ff66', opacity = 0.45, dashSize = 0.3, gapSize = 0.15) {
            const geo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, -1)
            ]);
            const mat = new THREE.LineDashedMaterial({
                color: new THREE.Color(colorHex),
                transparent: true,
                opacity: opacity,
                dashSize: dashSize,
                gapSize: gapSize,
                depthWrite: false
            });
            this.pointerLine = new THREE.Line(geo, mat);
            this.pointerLine.computeLineDistances();
            this.pointerLine.frustumCulled = false;
            this.pointerLine.visible = false;
            this.scene.add(this.pointerLine);
        }

        setRaycastColor(hexStr, opacity = null) {
            if (this.pointerLine && this.pointerLine.material) {
                this.pointerLine.material.color.set(hexStr);
                if (opacity !== null) {
                    this.pointerLine.material.opacity = Math.max(0, Math.min(1, opacity));
                }
            }
        }

        setCameraMode(mode) {
            if (mode === 'fly') {
                this.orbitControls.enabled = false;
                this.flyControls.enabled = true;
                this.pointerLine.visible = true;
            } else {
                this.flyControls.enabled = false;
                this.flyControls.resetState();
                this.orbitControls.enabled = true;
                this.pointerLine.visible = false;
                const dir = new THREE.Vector3();
                this.camera.getWorldDirection(dir);
                this.orbitControls.target.copy(this.camera.position).addScaledVector(dir, 5);
            }
        }

        updateRayDepthVisual(depth) {
            const camPos = this.camera.position;
            const dir = new THREE.Vector3();
            this.camera.getWorldDirection(dir);
            const targetPos = new THREE.Vector3().copy(camPos).addScaledVector(dir, depth);

            const posAttr = this.pointerLine.geometry.attributes.position;
            posAttr.setXYZ(0, camPos.x, camPos.y, camPos.z);
            posAttr.setXYZ(1, targetPos.x, targetPos.y, targetPos.z);
            posAttr.needsUpdate = true;

            this.pointerLine.computeLineDistances();
        }

        createMesh(entity) {
            let geom;
            switch(entity.type) {
                case 'sphere':   geom = new THREE.SphereGeometry(0.75, 32, 24); break;
                case 'cylinder': geom = new THREE.CylinderGeometry(0.6, 0.6, 1.4, 32); break;
                case 'torus':    geom = new THREE.TorusGeometry(0.7, 0.25, 24, 48); break;
                case 'cone':     geom = new THREE.ConeGeometry(0.75, 1.5, 32); break;
                case 'plane':    geom = new THREE.PlaneGeometry(entity.width || 4, entity.height || 4); break;
                case 'box':
                default:         geom = new THREE.BoxGeometry(1.2, 1.2, 1.2); break;
            }

            const mat = new THREE.MeshStandardMaterial({
                color: entity.color,
                roughness: entity.roughness,
                metalness: entity.metalness,
                wireframe: entity.wireframe,
                side: entity.type === 'plane' ? THREE.DoubleSide : THREE.FrontSide
            });

            const mesh = new THREE.Mesh(geom, mat);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { id: entity.id };

            mesh.position.set(entity.position.x, entity.position.y, entity.position.z);
            mesh.rotation.set(entity.rotation.x, entity.rotation.y, entity.rotation.z);
            mesh.scale.set(entity.scale.x, entity.scale.y, entity.scale.z);

            this.scene.add(mesh);
            this.meshMap.set(entity.id, mesh);
            return mesh;
        }

        removeMesh(id) {
            const mesh = this.meshMap.get(id);
            if (!mesh) return;
            if (this.gizmo.object === mesh) this.gizmo.detach();
            this.scene.remove(mesh);
            mesh.geometry.dispose();
            mesh.material.dispose();
            this.meshMap.delete(id);
        }

        attachGizmo(id) {
            const mesh = this.meshMap.get(id);
            if (mesh) this.gizmo.attach(mesh);
            else this.gizmo.detach();
        }

        detachGizmo() {
            this.gizmo.detach();
        }

        setGizmoMode(mode) {
            if (['translate', 'rotate', 'scale'].includes(mode)) {
                this.gizmo.setMode(mode);
            }
        }

        setGizmoSpace(space) {
            this.gizmo.setSpace(space);
        }

        setGizmoSnap(enabled) {
            if (enabled) {
                this.gizmo.setTranslationSnap(0.5);
                this.gizmo.setRotationSnap(THREE.MathUtils.degToRad(15));
                this.gizmo.setScaleSnap(0.25);
            } else {
                this.gizmo.setTranslationSnap(null);
                this.gizmo.setRotationSnap(null);
                this.gizmo.setScaleSnap(null);
            }
        }

        updateMeshTransform(id, t) {
            const mesh = this.meshMap.get(id);
            if (!mesh) return;
            if (t.position) mesh.position.set(t.position.x, t.position.y, t.position.z);
            if (t.rotation) mesh.rotation.set(t.rotation.x, t.rotation.y, t.rotation.z);
            if (t.scale) mesh.scale.set(t.scale.x, t.scale.y, t.scale.z);
        }

        updateMeshMaterial(id, m) {
            const mesh = this.meshMap.get(id);
            if (!mesh) return;
            if (m.color !== undefined) mesh.material.color.set(m.color);
            if (m.roughness !== undefined) mesh.material.roughness = m.roughness;
            if (m.metalness !== undefined) mesh.material.metalness = m.metalness;
            if (m.wireframe !== undefined) mesh.material.wireframe = m.wireframe;
        }

        render(delta, currentDepth) {
            if (this.flyControls.enabled) {
                this.flyControls.update(delta);
                this.updateRayDepthVisual(currentDepth);
            } else {
                this.orbitControls.update();
            }

            this.navGizmo.update();
            this.renderer.render(this.scene, this.camera);
        }
    }

    class CadDOMAdapter {
        constructor() {
            this.viewportEl = document.getElementById('viewport-container');
            this.dockEl = document.getElementById('cad-inspector-dock');
            this.hudCam = document.getElementById('hud-cam');
            this.hudGizmo = document.getElementById('hud-gizmo');
            this.hudSpace = document.getElementById('hud-space');
            this.hudDepth = document.getElementById('hud-depth');
            this.hudSelection = document.getElementById('hud-selection');
        }

        setHudCamera(mode) {
            if (this.hudCam) this.hudCam.textContent = mode.toUpperCase();
        }

        setHudGizmo(mode) {
            if (this.hudGizmo) {
                this.hudGizmo.textContent = `${mode.toUpperCase()} (${mode === 'translate' ? 'W' : mode === 'rotate' ? 'E' : 'R'})`;
            }
        }

        setHudSpace(space) {
            if (this.hudSpace) this.hudSpace.textContent = space.toUpperCase();
        }

        setHudDepth(val) {
            if (this.hudDepth) this.hudDepth.textContent = `${Number(val).toFixed(1)}m`;
        }

        setHudSelection(name) {
            if (this.hudSelection) this.hudSelection.textContent = name || 'NINGUNA';
        }
    }

    class CadUI {
        constructor(dockElement) {
            this.gio = new Giovanni();
            this.dock = dockElement;

            this.topMenu = null;
            this.sideMenu = null;
            this.outlinerAcc = null;
            this.treeContainer = null;
            this.depthSliderAcc = null;
            this.depthSlider = null;

            this.inspectorAcc = null;
            this.inspectorBody = null;
            this.inspectorInputs = {};

            this._initStaticMenus();
            this._initOutlinerContainer();
            this._initDepthContainer();
            this._initInspectorContainer();
        }

        _initStaticMenus() {
            this.topMenu = this.gio.createTopMenu({
                buttons: [
                    { bId: 'top-cam', icon: 'camera', tooltip: 'Alternar Cámara Orbit/Fly (C)' },
                    { bId: 'top-trans', icon: 'move', tooltip: 'Trasladar (W)' },
                    { bId: 'top-rot', icon: 'rotate', tooltip: 'Rotar (E)' },
                    { bId: 'top-scale', icon: 'scale', tooltip: 'Escalar (R)' },
                    { bId: 'top-snap', icon: 'grid', tooltip: 'Alternar Snap (X)' },
                    { bId: 'top-space', icon: 'layers', tooltip: 'Alternar Espacio World/Local' },
                    { bId: 'top-del', icon: 'trash', tooltip: 'Eliminar (Supr)' }
                ]
            });

            this.sideMenu = this.gio.createUniversalMenu({
                position: 'left',
                buttons: [
                    { bId: 'side-box', icon: 'cube', tooltip: 'Crear Caja' },
                    { bId: 'side-sphere', icon: 'sphere', tooltip: 'Crear Esfera' },
                    { bId: 'side-cylinder', icon: 'cylinder', tooltip: 'Crear Cilindro' },
                    { bId: 'side-torus', icon: 'drop', tooltip: 'Crear Toroide' },
                    { separator: true },
                    { bId: 'side-plane', icon: 'square', tooltip: 'Crear Plano a Distancia (P)' }
                ]
            });
        }

        _initOutlinerContainer() {
            this.outlinerAcc = new GiovanniToggleAcordion('Árbol de Escena (Outliner)', this.dock, null, 280);
            this.treeContainer = document.createElement('div');
            this.treeContainer.style.width = '100%';
            this.outlinerAcc.addChild(this.treeContainer);
        }

        _initDepthContainer() {
            this.depthSliderAcc = new GiovanniToggleAcordion('Profundidad Raycast Plano', this.dock, null, 150);
            this.depthBox = document.createElement('div');
            this.depthBox.style.width = '100%';
            this.depthSliderAcc.addChild(this.depthBox);
        }

        _initInspectorContainer() {
            this.inspectorAcc = new GiovanniToggleAcordion('Babylon Inspector', this.dock, null, 680);
            this.inspectorBody = this.inspectorAcc.body;
        }

        renderOutlinerTree(treeData, onSelect, onVisibilityChange) {
            this.treeContainer.innerHTML = '';
            const treeField = this.gio.createNodeTree({
                label: 'Nodos en Escena',
                data: treeData,
                onSelect: onSelect,
                onVisibilityChange: onVisibilityChange
            });
            this.treeContainer.appendChild(treeField);
        }

        renderDepthSlider(value, onChange) {
            this.depthBox.innerHTML = '';
            this.depthSlider = this.gio.createSlider({
                label: 'Distancia Raycast (Metros)',
                min: 0.5,
                max: 100,
                step: 0.5,
                value: value,
                onChange: onChange
            });
            this.depthBox.appendChild(this.depthSlider);
        }

        renderInspector(entity, handlers) {
            this.inspectorBody.innerHTML = '';
            this.inspectorInputs = {};

            if (!entity) {
                const empty = document.createElement('div');
                empty.style.cssText = 'color:#666; font-size:12px; text-align:center; padding:30px 10px; border:1px dashed #3a3a40; border-radius:6px;';
                empty.textContent = 'Seleccione una malla para inspeccionar';
                this.inspectorBody.appendChild(empty);
                return;
            }

            const headerBox = document.createElement('div');
            headerBox.style.cssText = 'display:flex; flex-direction:column; gap:8px; width:100%;';

         const nameInput = document.createElement('input'); nameInput.type = 'text'; 
         nameInput.value = entity.name; nameInput.className = 'gio-inline-input'; 
         nameInput.style.cssText = ` width: 100%; height: 28px; background: var(--backg0, #222); border: 1px solid var(--borde, #444); border-radius: var(--radius, 6px); padding: 0 8px; color: var(--textoActivo, #e3e3e3); font-family: inherit; font-size: 12px; font-weight: 600; letter-spacing: 0.2px; outline: none; box-sizing: border-box; transition: border-color .18s ease, box-shadow .18s ease, background .18s ease; `; nameInput.addEventListener('change', () => handlers.onRename(entity.id, nameInput.value.trim()));

            const toolRow = document.createElement('div');
            toolRow.style.cssText = 'display:flex; gap:6px; width:100%;';

            const btnDup = this.gio.createButtonSimple({
                text: 'Duplicar',
                fullWidth: true,
                onClick: () => handlers.onDuplicate(entity.id)
            });

            const btnDel = this.gio.createButtonSimple({
                text: 'Eliminar',
                fullWidth: true,
                onClick: () => handlers.onDelete(entity.id)
            });
 

            toolRow.appendChild(btnDup);
            toolRow.appendChild(btnDel);
            headerBox.appendChild(nameInput);
            headerBox.appendChild(toolRow);
            this.inspectorBody.appendChild(this.gio._wrapWithLabel('Entidad & Acciones', headerBox));

            const posBox = document.createElement('div');
            posBox.style.cssText = 'display:flex; flex-direction:column; gap:6px; width:100%;';
            ['x', 'y', 'z'].forEach(axis => {
                posBox.appendChild(this.gio.createSlider({
                    label: `Posición ${axis.toUpperCase()}`,
                    min: -50, max: 50, step: 0.05, value: entity.position[axis],
                    onChange: (val) => {
                        entity.position[axis] = val;
                        handlers.onTransformChange(entity.id, { position: entity.position });
                    }
                }));
            });
            this.inspectorBody.appendChild(this.gio._wrapWithLabel('Transform: Posición', posBox));

            const rotBox = document.createElement('div');
            rotBox.style.cssText = 'display:flex; flex-direction:column; gap:6px; width:100%;';
            ['x', 'y', 'z'].forEach(axis => {
                const degVal = Math.round(THREE.MathUtils.radToDeg(entity.rotation[axis]));
                rotBox.appendChild(this.gio.createSlider({
                    label: `Rotación ${axis.toUpperCase()} (°)`,
                    min: -180, max: 180, step: 1, value: degVal,
                    onChange: (deg) => {
                        entity.rotation[axis] = THREE.MathUtils.degToRad(deg);
                        handlers.onTransformChange(entity.id, { rotation: entity.rotation });
                    }
                }));
            });
            this.inspectorBody.appendChild(this.gio._wrapWithLabel('Transform: Rotación', rotBox));

            const scaleBox = document.createElement('div');
            scaleBox.style.cssText = 'display:flex; flex-direction:column; gap:6px; width:100%;';
            ['x', 'y', 'z'].forEach(axis => {
                scaleBox.appendChild(this.gio.createSlider({
                    label: `Escala ${axis.toUpperCase()}`,
                    min: 0.05, max: 15, step: 0.05, value: entity.scale[axis],
                    onChange: (val) => {
                        entity.scale[axis] = val;
                        handlers.onTransformChange(entity.id, { scale: entity.scale });
                    }
                }));
            });
            this.inspectorBody.appendChild(this.gio._wrapWithLabel('Transform: Escala', scaleBox));

            const matBox = document.createElement('div');
            matBox.style.cssText = 'display:flex; flex-direction:column; gap:8px; width:100%;';

            matBox.appendChild(this.gio.createToggle('Estructura Alámbrica (Wireframe)', entity.wireframe, (v) => {
                entity.wireframe = v;
                handlers.onMaterialChange(entity.id, { wireframe: v });
            }));

            matBox.appendChild(this.gio.createSlider({
                label: 'Rugosidad (Roughness)',
                min: 0, max: 1, step: 0.02, value: entity.roughness,
                onChange: (v) => {
                    entity.roughness = v;
                    handlers.onMaterialChange(entity.id, { roughness: v });
                }
            }));

            matBox.appendChild(this.gio.createSlider({
                label: 'Metalicidad (Metalness)',
                min: 0, max: 1, step: 0.02, value: entity.metalness,
                onChange: (v) => {
                    entity.metalness = v;
                    handlers.onMaterialChange(entity.id, { metalness: v });
                }
            }));

            const colorWrap = document.createElement('div');
            colorWrap.style.width = '100%';
            const c = new THREE.Color(entity.color);
            const colorPicker = new GiovanniColorPicker({
                title: 'Color del Material',
                canvasHeight: 120,
                isTriangle: false,
                initialColor: { r: c.r, g: c.g, b: c.b, a: 1.0 },
                onChange: (normRGB, rgb255, hexStr) => {
                    entity.color = hexStr;
                    handlers.onMaterialChange(entity.id, { color: hexStr });
                }
            });
            colorWrap.appendChild(colorPicker.element);
            matBox.appendChild(colorWrap);

            this.inspectorBody.appendChild(this.gio._wrapWithLabel('Material Inspector', matBox));
        }
    }

    class CadUIEventos {
        constructor() {
            this.insModel = new CadModel();
            this.insAdapter = new CadDOMAdapter();
            this.insThree = new CadThreeEngine(this.insAdapter.viewportEl);
            this.insUI = new CadUI(this.insAdapter.dockEl);

            this.clock = new THREE.Clock();

            this.bindTopMenu();
            this.bindSideMenu();
            this.bindDepthControl();
            this.bindGizmoEvents();
            this.bindViewportPointer();
            this.bindKeyboardShortcuts();

            this.refreshSceneOutliner();
            this.createEntity('box');
            this.startLoop();
        }

        bindTopMenu() {
            const menu = this.insUI.topMenu;
            menu.getButton('top-cam')?.el.addEventListener('click', () => this.toggleCameraMode());
            menu.getButton('top-trans')?.el.addEventListener('click', () => this.setGizmoMode('translate'));
            menu.getButton('top-rot')?.el.addEventListener('click', () => this.setGizmoMode('rotate'));
            menu.getButton('top-scale')?.el.addEventListener('click', () => this.setGizmoMode('scale'));
            menu.getButton('top-snap')?.el.addEventListener('click', () => this.toggleSnap());
            menu.getButton('top-space')?.el.addEventListener('click', () => this.toggleSpace());
            menu.getButton('top-del')?.el.addEventListener('click', () => this.deleteSelected());
        }

        bindSideMenu() {
            const menu = this.insUI.sideMenu;
            menu.getButton('side-box')?.el.addEventListener('click', () => this.createEntity('box'));
            menu.getButton('side-sphere')?.el.addEventListener('click', () => this.createEntity('sphere'));
            menu.getButton('side-cylinder')?.el.addEventListener('click', () => this.createEntity('cylinder'));
            menu.getButton('side-torus')?.el.addEventListener('click', () => this.createEntity('torus'));
            menu.getButton('side-plane')?.el.addEventListener('click', () => this.createPlaneAtDepth());
        }

        bindDepthControl() {
            this.insUI.renderDepthSlider(this.insModel.planeSpawnDepth, (v) => {
                this.insModel.planeSpawnDepth = v;
                this.insAdapter.setHudDepth(v);
            });
        }

        bindGizmoEvents() {
            this.insThree.gizmo.addEventListener('change', () => {
                const target = this.insThree.gizmo.object;
                const active = this.insModel.getSelected();
                if (!target || !active) return;

                active.position.x = Number(target.position.x.toFixed(3));
                active.position.y = Number(target.position.y.toFixed(3));
                active.position.z = Number(target.position.z.toFixed(3));

                active.rotation.x = Number(target.rotation.x.toFixed(3));
                active.rotation.y = Number(target.rotation.y.toFixed(3));
                active.rotation.z = Number(target.rotation.z.toFixed(3));

                active.scale.x = Number(target.scale.x.toFixed(3));
                active.scale.y = Number(target.scale.y.toFixed(3));
                active.scale.z = Number(target.scale.z.toFixed(3));
            });

            this.insThree.gizmo.addEventListener('dragging-changed', (e) => {
                if (!e.value) {
                    this.updateInspectorView();
                }
            });
        }

        bindViewportPointer() {
            this.insThree.renderer.domElement.addEventListener('pointerdown', (e) => {
                if (e.button !== 0 || this.insThree.gizmo.dragging || this.insThree.flyControls.isLocked) return;

                const r = this.insThree.renderer.domElement.getBoundingClientRect();
                this.insThree.mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
                this.insThree.mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;

                this.insThree.raycaster.setFromCamera(this.insThree.mouse, this.insThree.camera);
                const meshes = Array.from(this.insThree.meshMap.values());
                const hits = this.insThree.raycaster.intersectObjects(meshes, false);

                if (hits.length > 0) {
                    this.selectEntity(hits[0].object.userData.id);
                }
            });
        }

        bindKeyboardShortcuts() {
            window.addEventListener('keydown', (e) => {
                if (e.target.closest('input, textarea')) return;

                if (e.code === 'KeyC') {
                    this.toggleCameraMode();
                    return;
                }

                if (this.insModel.cameraMode === 'fly' && this.insThree.flyControls.isLocked) {
                    return;
                }

                switch(e.code) {
                    case 'KeyW': this.setGizmoMode('translate'); break;
                    case 'KeyE': this.setGizmoMode('rotate'); break;
                    case 'KeyR': this.setGizmoMode('scale'); break;
                    case 'KeyX': this.toggleSnap(); break;
                    case 'KeyP': this.createPlaneAtDepth(); break;
                    case 'Delete':
                    case 'Backspace':
                        this.deleteSelected();
                        break;
                }
            });
        }

        toggleCameraMode() {
            this.insModel.cameraMode = this.insModel.cameraMode === 'orbit' ? 'fly' : 'orbit';
            this.insThree.setCameraMode(this.insModel.cameraMode);
            this.insAdapter.setHudCamera(this.insModel.cameraMode);
        }

        setGizmoMode(mode) {
            this.insModel.gizmoMode = mode;
            this.insThree.setGizmoMode(mode);
            this.insAdapter.setHudGizmo(mode);
        }

        toggleSpace() {
            this.insModel.gizmoSpace = this.insModel.gizmoSpace === 'world' ? 'local' : 'world';
            this.insThree.setGizmoSpace(this.insModel.gizmoSpace);
            this.insAdapter.setHudSpace(this.insModel.gizmoSpace);
        }

        toggleSnap() {
            this.insModel.snapEnabled = !this.insModel.snapEnabled;
            this.insThree.setGizmoSnap(this.insModel.snapEnabled);
        }

        createEntity(type) {
            const ent = this.insModel.createEntity(type);
            this.insThree.createMesh(ent);
            this.selectEntity(ent.id);
            this.refreshSceneOutliner();
        }

        createPlaneAtDepth() {
            const cam = this.insThree.camera;
            const dir = new THREE.Vector3();
            cam.getWorldDirection(dir);
            const pos = new THREE.Vector3().copy(cam.position).addScaledVector(dir, this.insModel.planeSpawnDepth);
            const rotEuler = new THREE.Euler().setFromQuaternion(cam.quaternion, 'XYZ');

            const ent = this.insModel.createEntity('plane', null, {
                position: { x: pos.x, y: pos.y, z: pos.z },
                rotation: { x: rotEuler.x, y: rotEuler.y, z: rotEuler.z },
                width: 4.0,
                height: 4.0
            });

            this.insThree.createMesh(ent);
            this.selectEntity(ent.id);
            this.refreshSceneOutliner();
        }

        selectEntity(id) {
            const ent = this.insModel.setSelected(id);
            if (ent) {
                this.insThree.attachGizmo(ent.id);
                this.insAdapter.setHudSelection(ent.name);
            } else {
                this.insThree.detachGizmo();
                this.insAdapter.setHudSelection('NINGUNA');
            }
            this.updateInspectorView();
        }

        deleteEntity(id) {
            this.insThree.removeMesh(id);
            this.insModel.deleteEntity(id);
            this.selectEntity(null);
            this.refreshSceneOutliner();
        }

        deleteSelected() {
            if (this.insModel.selectedId) {
                this.deleteEntity(this.insModel.selectedId);
            }
        }

        duplicateEntity(id) {
            const src = this.insModel.getEntity(id);
            if (!src) return;

            const cloned = this.insModel.createEntity(src.type, `${src.name}_Copia`);
            cloned.position = { x: src.position.x + 1.2, y: src.position.y, z: src.position.z };
            cloned.rotation = { ...src.rotation };
            cloned.scale = { ...src.scale };
            cloned.color = src.color;
            cloned.roughness = src.roughness;
            cloned.metalness = src.metalness;
            cloned.width = src.width;
            cloned.height = src.height;

            this.insThree.createMesh(cloned);
            this.selectEntity(cloned.id);
            this.refreshSceneOutliner();
        }

        refreshSceneOutliner() {
            this.insUI.renderOutlinerTree(
                this.insModel.getTreeData(),
                (item) => this.selectEntity(item.id),
                (item, visible) => {
                    const ent = this.insModel.getEntity(item.id);
                    if (ent) {
                        ent.visible = visible;
                        const m = this.insThree.meshMap.get(item.id);
                        if (m) m.visible = visible;
                    }
                }
            );
        }

        updateInspectorView() {
            const ent = this.insModel.getSelected();
            this.insUI.renderInspector(ent, {
                onRename: (id, newName) => {
                    const e = this.insModel.getEntity(id);
                    if (e) {
                        e.name = newName;
                        this.insAdapter.setHudSelection(e.name);
                        this.refreshSceneOutliner();
                    }
                },
                onDuplicate: (id) => this.duplicateEntity(id),
                onDelete: (id) => this.deleteEntity(id),
                onTransformChange: (id, t) => {
                    const e = this.insModel.getEntity(id);
                    if (!e) return;
                    if (t.position) e.position = { ...t.position };
                    if (t.rotation) e.rotation = { ...t.rotation };
                    if (t.scale) e.scale = { ...t.scale };
                    this.insThree.updateMeshTransform(id, t);
                },
                onMaterialChange: (id, m) => {
                    const e = this.insModel.getEntity(id);
                    if (!e) return;
                    Object.assign(e, m);
                    this.insThree.updateMeshMaterial(id, m);
                }
            });
        }

        startLoop() {
            const loop = () => {
                requestAnimationFrame(loop);
                const delta = this.clock.getDelta();
                this.insThree.render(delta, this.insModel.planeSpawnDepth);
            };
            loop();
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        window.CAD_APP = new CadUIEventos();
    });
    </script>
</body>
</html>
