# FactoryVis - Side Project TODO List

**Purpose:** Granular task breakdown with checkboxes. Tesla Gigafactory-inspired modular house factory visualization.

**Design Direction:** 
- Tesla Gigafactory aesthetic (clean, minimalist, industrial)
- Realistic physics-based animations
- Mechanical assembly processes (robotic arms, cranes, AGVs)
- Future: Penguin workers (realistic style)

**Timeline:** 
- Week 1 (Complete): Core foundation, assembly system, basic UI
- Current: Realistic assembly animations & logistics
- Future: Penguin workers

---

## Completed Phases ✅

<details>
<summary>Phase 1 - Foundation (Click to expand)</summary>

### Setup
- [x] Project scaffolding (index.html, src/, ThreeJS CDN)
- [x] Basic ThreeJS scene (camera, lights, renderer)
- [x] OrbitControls + WASD camera controls
- [x] Factory floor with grid

### Core Elements
- [x] House shell model (frame, walls, roof)
- [x] Conveyor belt with station markers
- [x] Basic movement along conveyor
- [x] Auto-reset loop

</details>

<details>
<summary>Phase 2 - Assembly System (Click to expand)</summary>

- [x] 3 Assembly stations with visual markers
- [x] Station detection system
- [x] Assembly trigger (stage 0→1→2→3)
- [x] Shadows and lighting

</details>

<details>
<summary>Phase 3 - UI & Controls (Click to expand)</summary>

- [x] dat.GUI integration
- [x] FPS counter and frame time tracking
- [x] Pause/Resume/Reset controls
- [x] Speed controls

</details>

---

## Phase 4 - Realistic Assembly Animations 🔄 CURRENT

### 4A: Station Pause & Timing
**Goal:** House pauses at each station for assembly

- [ ] Add `isPaused` state to house when at station
- [ ] Configurable `dwellTime` per station (e.g., 3 seconds)
- [ ] Smooth deceleration when approaching station
- [ ] Smooth acceleration when leaving station
- [ ] Visual indicator (pulsing glow or progress bar)
- [ ] Test: House stops, assembles, continues

### 4B: Component Animations  
**Goal:** Parts animate into place realistically

#### Frame Assembly (Station 1)
- [ ] Frame starts below floor or off to side
- [ ] Animate frame rising/sliding into position
- [ ] Add easing (ease-out for realistic deceleration)
- [ ] Duration: ~1.5 seconds

#### Wall Assembly (Station 2)
- [ ] Walls start off to sides (perpendicular to conveyor)
- [ ] Animate walls sliding inward simultaneously
- [ ] Walls "click" into place (small bounce or settle)
- [ ] Duration: ~2 seconds

#### Roof Assembly (Station 3)
- [ ] Roof starts above (held by crane/gantry)
- [ ] Animate roof lowering onto house
- [ ] Slight settle animation at end
- [ ] Duration: ~2 seconds

#### Animation Utilities
- [ ] Create `src/animation.js` utility module
- [ ] Implement easing functions (easeInOut, easeOut, etc.)
- [ ] Create `AnimatedComponent` class for reusable animations
- [ ] Queue system for sequential animations

### 4C: Assembly Machinery
**Goal:** Visual machinery performing the assembly

#### Robotic Arms (Stations 1 & 2)
- [ ] Create `RoboticArm` class in `src/machinery.js`
- [ ] Simple geometry: base cylinder, 2-3 arm segments, gripper
- [ ] Hierarchical structure (parent-child for articulation)
- [ ] Arm positions: rest, reach, grab, place, retract
- [ ] Animate arm during assembly sequence

#### Overhead Crane (Station 3)
- [ ] Create `OverheadCrane` class
- [ ] Gantry structure spanning assembly line
- [ ] Trolley that moves along gantry
- [ ] Hoist/cable that lowers roof
- [ ] Animate: trolley positions, hoist lowers/raises

#### Clamps & Fixtures
- [ ] Simple clamp geometry at each station
- [ ] Animate clamps engaging when house arrives
- [ ] Clamps release when assembly complete

---

## Phase 5 - Logistics System

### 5A: Factory Layout Expansion
**Goal:** Gigafactory-style layout with visible parts flow

- [ ] Expand factory floor dimensions
- [ ] Add parts storage zone (side of main line)
- [ ] Add staging area between storage and line
- [ ] Floor markings (colored zones, safety lines)
- [ ] Update camera bounds for larger area

### 5B: Parts Storage & Staging
- [ ] Wall panel racks (vertical storage)
- [ ] Roof section staging (overhead or ground level)
- [ ] Frame staging area
- [ ] Visual inventory indicators

### 5C: Parts Transport
- [ ] AGV (Automated Guided Vehicle) model
- [ ] AGV path from storage to staging
- [ ] AGV picks up parts, delivers to line
- [ ] Alternative: perpendicular conveyor feeds

### 5D: Multi-Line Scaling (Stretch)
- [ ] Second parallel assembly line
- [ ] Shared logistics feeding both lines
- [ ] Throughput comparison visualization

---

## Phase 6 - Penguin Workers 🐧 FUTURE

### 6A: Penguin Model
**Goal:** Realistic (not cartoonish) penguin characters

- [ ] Research emperor penguin proportions
- [ ] Body: elongated oval/capsule
- [ ] Head: smaller oval with beak
- [ ] Flippers: flat paddle shapes
- [ ] Feet: orange webbed feet
- [ ] Eyes: small black with white ring
- [ ] Materials: black back, white front, orange accents

### 6B: Penguin Rig & Poses
- [ ] Standing pose (default)
- [ ] Walking pose (for animation)
- [ ] Operating pose (flippers on controls)
- [ ] Pointing/directing pose
- [ ] Simple skeleton for pose interpolation

### 6C: Penguin Roles & Placement
- [ ] Station operators (1 per station, watching assembly)
- [ ] Forklift/AGV drivers
- [ ] Quality inspector (end of line)
- [ ] Supervisor with clipboard
- [ ] Walking penguins (background activity)

### 6D: Penguin Animation
- [ ] Idle: subtle weight shift, head turn
- [ ] Walk cycle: waddle animation
- [ ] Operating: flipper movements
- [ ] Reactive: turn to watch house pass

---

## Phase 7 - Polish & Advanced (Backlog)

### Visual Polish
- [ ] Better materials (metallic, matte finishes)
- [ ] Environment lighting improvements
- [ ] Ambient occlusion (baked or SSAO)
- [ ] Anti-aliasing tuning

### Camera Enhancements
- [ ] Preset camera positions (overview, station closeups)
- [ ] Smooth camera transitions
- [ ] Follow camera mode (tracks a house)
- [ ] Cinematic auto-tour mode

### Audio (Optional)
- [ ] Ambient factory hum
- [ ] Assembly sounds (clicks, whirs)
- [ ] Conveyor movement sound

### Data & Analytics
- [ ] Historical throughput chart
- [ ] Export production data
- [ ] Simulation scenarios

### Deployment
- [ ] Optimize for production
- [ ] Deploy to GitHub Pages
- [ ] Create shareable demo link
- [ ] README with screenshots/GIFs

---

## Quick Reference

### File Structure
```
src/
├── main.js        # Scene, camera, render loop
├── factory.js     # Floor, conveyor, stations
├── house.js       # House model, assembly states
├── ui.js          # dat.GUI, stats
├── animation.js   # Easing, AnimatedComponent (NEW)
├── machinery.js   # RoboticArm, Crane, Clamps (NEW)
├── logistics.js   # Storage, AGVs, transport (FUTURE)
└── penguin.js     # Penguin model, animation (FUTURE)
```

### Current Priority
1. **4A: Station Pause** - Make houses stop at stations
2. **4B: Component Animations** - Parts animate into place
3. **4C: Machinery** - Robotic arms and crane visuals

### Commands
```bash
# Start dev server
npx http-server -p 8080

# Open in browser
open http://localhost:8080
```
