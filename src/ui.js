/**
 * UI Dashboard using dat.GUI
 * Displays production stats and controls
 */

export class Dashboard {
    constructor(productionLine, camera, controls) {
        this.productionLine = productionLine;
        this.camera = camera;
        this.controls = controls;
        
        // Stats object for dat.GUI (needs to be mutable)
        this.stats = {
            housesCompleted: 0,
            housesInProgress: 0,
            housesPerHour: '0.0',
            housesPerDay: '0',
            elapsedTime: '0s',
            productionSpeed: 1.0
        };
        
        // Camera presets
        this.cameraPresets = {
            overview: { x: 30, y: 20, z: 30, targetZ: -30 },
            station1: { x: -10, y: 10, z: -20, targetZ: -20 },
            station2: { x: -10, y: 10, z: -50, targetZ: -50 },
            station3: { x: -10, y: 10, z: -80, targetZ: -80 }
        };
        
        this.createGUI();
    }

    createGUI() {
        this.gui = new dat.GUI({ width: 300 });
        
        // Production Stats folder
        const statsFolder = this.gui.addFolder('📊 Production Stats');
        statsFolder.add(this.stats, 'housesCompleted').name('Houses Completed').listen();
        statsFolder.add(this.stats, 'housesInProgress').name('In Progress').listen();
        statsFolder.add(this.stats, 'housesPerHour').name('Per Hour').listen();
        statsFolder.add(this.stats, 'housesPerDay').name('Per Day (projected)').listen();
        statsFolder.add(this.stats, 'elapsedTime').name('Elapsed Time').listen();
        statsFolder.open();
        
        // Production Controls folder
        const controlsFolder = this.gui.addFolder('⚙️ Controls');
        controlsFolder.add(this.stats, 'productionSpeed', 0.5, 5.0, 0.1)
            .name('Production Speed')
            .onChange((value) => {
                this.productionLine.setSpeed(value);
            });
        controlsFolder.open();
        
        // Camera Presets folder
        const cameraFolder = this.gui.addFolder('📷 Camera Presets');
        cameraFolder.add(this, 'setCameraOverview').name('Overview');
        cameraFolder.add(this, 'setCameraStation1').name('Station 1 (Frame)');
        cameraFolder.add(this, 'setCameraStation2').name('Station 2 (Walls)');
        cameraFolder.add(this, 'setCameraStation3').name('Station 3 (Roof)');
        cameraFolder.open();
    }

    update() {
        // Update stats from production line
        const prodStats = this.productionLine.getStats();
        this.stats.housesCompleted = prodStats.housesCompleted;
        this.stats.housesInProgress = prodStats.housesInProgress;
        this.stats.housesPerHour = prodStats.housesPerHour;
        this.stats.housesPerDay = prodStats.housesPerDay;
        this.stats.elapsedTime = prodStats.elapsedTime;
        this.stats.productionSpeed = prodStats.productionSpeed;
    }

    // Camera preset methods
    setCameraOverview() {
        this.setCameraPosition(this.cameraPresets.overview);
    }

    setCameraStation1() {
        this.setCameraPosition(this.cameraPresets.station1);
    }

    setCameraStation2() {
        this.setCameraPosition(this.cameraPresets.station2);
    }

    setCameraStation3() {
        this.setCameraPosition(this.cameraPresets.station3);
    }

    setCameraPosition(preset) {
        this.camera.position.set(preset.x, preset.y, preset.z);
        this.controls.target.set(0, 0, preset.targetZ);
        this.controls.update();
    }
}

console.log('ui.js loaded ✓');