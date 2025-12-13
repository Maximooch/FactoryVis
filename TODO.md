# FactoryVis - Side Project TODO List

**Purpose:** Granular task breakdown with checkboxes. Originally a weekend project, now a long-term side project for continued learning and polish.

**Timeline:** 
- Week 1 (Complete): Core foundation, assembly system, basic UI
- Ongoing: Enhancements, polish, and experimental features as time permits

**Approach:** Work on this when you have spare time. No pressure, no deadlines. Focus on learning and having fun with ThreeJS.

---

## Setup (Before Starting)

- [x] Read through PLAN.md completely
- [x] Install Node.js/npm (if not already installed)
- [x] Create basic project structure
- [x] Initialize git repo (already done ✓)
- [x] Set up local dev server (npx http-server on port 8080)

---

## DAY 1 - Foundation (Saturday) ✅ COMPLETE!
**Goal:** See a 3D scene with something moving by end of day

### Morning Session (2-3 hours) ✅

#### Task 1.1: Project Scaffolding (30 min) ✅
- [x] Create `index.html` with basic structure
- [x] Add ThreeJS via CDN (importmap)
- [x] Create `src/` directory
- [x] Create empty files:
  - [x] `src/main.js`
  - [x] `src/factory.js`
  - [x] `src/house.js`
  - [x] `src/ui.js`
- [x] Link main.js in index.html as module
- [x] Test: Open in browser, check console for errors

#### Task 1.2: Basic ThreeJS Scene (45 min) ✅
**File:** `src/main.js`
- [x] Import ThreeJS
- [x] Create scene, camera, renderer
- [x] Set up canvas and viewport sizing
- [x] Add ambient light + directional light
- [x] Create simple cube to verify rendering
- [x] Add render loop (requestAnimationFrame)
- [x] Test: See a rotating cube on screen

#### Task 1.3: Camera Controls (30 min) ✅
**File:** `src/main.js`
- [x] Import OrbitControls from ThreeJS examples
- [x] Attach controls to camera
- [x] Set camera initial position (elevated, angled)
- [x] Configure controls (damping, limits)
- [x] Test: Click-drag to rotate view, scroll to zoom
- [x] **BONUS:** Added WASD keyboard controls for free-roam camera

#### Task 1.4: Factory Floor (45 min) ✅
**File:** `src/factory.js`
- [x] Create `FactoryFloor` class
- [x] Add large plane geometry for ground
- [x] Apply basic material (gray concrete color)
- [x] Add grid helper for reference
- [x] Add axis helper (optional, for debugging)
- [x] Export and add to main scene
- [x] Test: See factory floor from above

### Afternoon Session (2-3 hours) ✅

#### Task 1.5: Simple House Model (1 hour) ✅
**File:** `src/house.js`
- [x] Create `HouseShell` class
- [x] Define basic dimensions (width: 10, height: 8, depth: 12)
- [x] Create frame (BoxGeometry with wireframe material)
- [x] Create walls (BoxGeometry with solid material)
- [x] Create roof (BoxGeometry, positioned on top)
- [x] Method: `assemble(stage)` - shows components based on stage 0-3
- [x] Initially render just frame (stage 0)
- [x] Test: See house frame on factory floor

#### Task 1.6: Conveyor Belt Basics (1 hour) ✅
**File:** `src/factory.js`
- [x] Create `ConveyorBelt` class
- [x] Add long box geometry for belt surface
- [x] Position along Z-axis (0 to -100)
- [x] Add simple material (dark gray/black)
- [x] **BONUS:** Added edge guide rails
- [x] Create 3 station markers (colored boxes at positions)
  - [x] Station 1 (Z: -20): Frame assembly (Red)
  - [x] Station 2 (Z: -50): Walls assembly (Yellow/Orange)
  - [x] Station 3 (Z: -80): Roof assembly (Green)
- [x] Test: See conveyor with 3 station markers

#### Task 1.7: Basic Movement (45 min) ✅
**File:** `src/factory.js`
- [x] Add `update(deltaTime)` method to HouseShell
- [x] Move house along Z-axis (position.z -= speed * deltaTime)
- [x] Place house at start of conveyor
- [x] In main.js render loop, call house.update()
- [x] **BONUS:** Added automatic station detection
- [x] **BONUS:** Added auto-reset loop when house completes
- [x] Test: Watch house move along conveyor

### Evening Wrap-up (30 min) ✅
- [x] Clean up console.log statements
- [x] Adjust camera position for best view
- [x] Verify all files are saved and committed
- [x] Test full scene: floor, conveyor, moving house
- [x] Screenshot for progress

**Day 1 Success Criteria:** ✅ ALL COMPLETE
✅ 3D scene renders smoothly
✅ Can orbit camera around scene
✅ House moves along conveyor belt
✅ 3 assembly stations visible
✅ **BONUS:** WASD camera controls
✅ **BONUS:** Automatic assembly at stations
✅ **BONUS:** Looping production system

---

## PHASE 2 - Assembly Magic ✅ CORE COMPLETE
**Goal:** Progressive assembly animation at each station (core done, animations are stretch goals)

**STATUS:** Day 1 completed all core functionality! Assembly already working.
The following tasks can be enhanced with smoother animations.

### Morning Session (2-3 hours)

#### Task 2.1: Station Detection (45 min) ✅ DONE EARLY
**File:** `src/factory.js`
- [x] Create `AssemblyStation` class (integrated into ConveyorBelt)
- [x] Add property: `position` (Z coordinate)
- [x] Add property: `assemblyStage` (0-3)
- [x] Add method: `isHouseAtStation(house)` - check if house Z matches
- [x] Create array of 3 stations in FactoryFloor
- [x] Test: Log when house reaches each station

#### Task 2.2: Assembly Trigger System (1 hour) ⚠️ BASIC VERSION DONE
**File:** `src/house.js`
- [x] Add `currentStage` property (starts at 0)
- [x] Add `targetStage` property
- [x] Method: `setTargetStage(stage)` - triggers assembly
- [ ] Method: `updateAssembly()` - progressively shows components
- [x] Visibility toggles:
  - [x] Stage 0: Frame visible
  - [x] Stage 1: Frame + Walls visible
  - [x] Stage 2: Frame + Walls + Roof visible
- [x] Test: Manually call setTargetStage(1), verify walls appear

**NOTE:** Currently instant visibility toggle. Can enhance with smooth animations.

#### Task 2.3: Assembly Animation (1 hour) 🔄 ENHANCEMENT OPPORTUNITY
**File:** `src/house.js`
- [ ] Add components with initial scale/position offsets
- [ ] Animate walls sliding in from sides (scale Y from 0 to 1)
- [ ] Animate roof dropping from above (position Y from +10 to 0)
- [ ] Use lerp or ThreeJS Tween for smooth animation
- [ ] Add small delay between components (0.5s)
- [ ] Test: Watch components smoothly appear

**CURRENT:** Instant pop-in. **ENHANCEMENT:** Smooth animations.

### Afternoon Session (2-3 hours)

#### Task 2.4: Integrate Stations + Assembly (1.5 hours) ✅ DONE EARLY
**File:** `src/factory.js`
- [x] In conveyor update loop, check house position vs stations
- [x] When house reaches station:
  - [x] Pause house movement (can add if desired)
  - [x] Trigger house.setTargetStage(station.assemblyStage)
  - [ ] Wait for assembly animation to complete
  - [x] Resume house movement
- [ ] Add `isPaused` flag to house (exists but not used for station stops)
- [x] Test: House stops at Station 1, frame appears, continues

**NOTE:** House currently doesn't pause at stations, just assembles while moving.

#### Task 2.5: Multi-Station Flow (1 hour) ✅ DONE EARLY
**File:** `src/factory.js`
- [x] Ensure house visits all 3 stations in sequence
- [x] Station 1: Add frame (stage 0→1)
- [x] Station 2: Add walls (stage 1→2)
- [x] Station 3: Add roof (stage 2→3)
- [x] Add exit point (Z: -100) where house despawns
- [x] Test: Watch complete assembly process start to finish

#### Task 2.6: Lighting & Shadows (30 min) ✅ DONE EARLY
**File:** `src/main.js`
- [x] Enable shadow rendering on renderer
- [x] Configure directional light to cast shadows
- [x] Enable shadows on house components
- [x] Enable shadows on factory floor (receive)
- [x] Adjust shadow camera (size, near, far)
- [x] Test: See realistic shadows under house

### Evening Wrap-up (30 min)
- [ ] Adjust animation timing (too fast/slow?)
- [x] Fine-tune camera angle for best drama
- [ ] Add station labels (optional TextGeometry or HTML overlays)
- [x] Commit progress
- [ ] Screenshot/video of assembly process

**Day 2 Success Criteria:**
✅ House stops at each station (can enhance with pause)
✅ Components appear progressively (instant, can animate)
⚠️ Smooth animations (enhancement opportunity)
✅ Shadows add depth

---

## PHASE 3 - UI & Polish ✅ CORE COMPLETE

### Completed Tasks

#### Task 3.1: Performance Monitoring System ✅ COMPLETE
**Files:** `src/ui.js`, `src/main.js`
- [x] Add FPS counter (updates every second)
- [x] Add frame time tracking (rolling 60-frame average)
- [x] Create Performance Stats folder in dat.GUI
- [x] Display real-time performance metrics
- [x] Distinguish between actual lag and intentional pauses

#### Task 3.2: Production Controls ✅ COMPLETE
**Files:** `src/ui.js`, `src/factory.js`
- [x] Add Pause/Resume button
- [x] Implement pause state in ProductionLine
- [x] Add Reset Production button
- [x] Implement reset() method to clear and restart
- [x] Test pause functionality (freezes all updates)
- [x] Test reset functionality (clears houses, resets stats)

**SUCCESS CRITERIA:** ✅ ALL COMPLETE
✅ FPS counter shows real-time performance
✅ Frame time tracking identifies actual lag vs intentional pauses
✅ Pause button freezes entire production line
✅ Resume button continues from paused state
✅ Reset button clears everything and restarts fresh

**IMPACT:**
- Users can now distinguish between performance issues and intentional assembly pauses
- Full control over production flow (pause, resume, reset)
- Real-time performance monitoring for debugging

---

## PHASE 4 - Polish & Enhancements (Ongoing)

### Visual Assembly Feedback
- [ ] Add progress bars above houses during assembly
- [ ] Sound effects for assembly events

### Smooth Assembly Animations (from Phase 2)
- [ ] Add components with initial scale/position offsets
- [ ] Animate walls sliding in from sides (scale Y from 0 to 1)
- [ ] Animate roof dropping from above (position Y from +10 to 0)
- [ ] Use lerp or ThreeJS Tween for smooth animation
- [ ] Add small delay between components (0.5s)

### Station Pause Behavior
- [ ] House pauses at each station during assembly
- [ ] Visual indicator when paused (pulsing glow?)
- [ ] Configurable dwell time per station

### Advanced Camera Controls
- [ ] Smooth camera transitions between presets
- [ ] Follow camera mode (tracks a specific house)
- [ ] Cinematic camera paths
- [ ] First-person walkthrough mode

### Performance Optimizations (If Needed)
- [ ] Geometry instancing for repeated elements
- [ ] LOD (Level of Detail) system
- [ ] Shadow map optimization
- [ ] Object pooling for houses

---

## PHASE 5 - Future Ideas (Backlog)

### Factory Realism
- [ ] Robotic arm animations at stations
- [ ] Worker NPCs (simple animated figures)
- [ ] Forklift/material handling vehicles
- [ ] Warehouse/storage area

### Multiple House Types
- [ ] Different house sizes (small, medium, large)
- [ ] Color/material variations
- [ ] Custom house designer UI

### Data & Analytics
- [ ] Historical throughput charts
- [ ] Export production data (CSV/JSON)
- [ ] Simulation scenarios (what-if analysis)

### Deployment
- [ ] Deploy to GitHub Pages or Vercel
- [ ] Add README with live demo link
- [ ] Create shareable screenshots/GIFs

