# 🏭 FactoryVis

**Interactive 3D visualization of a modular house manufacturing factory**

A weekend project demonstrating automated house shell production using ThreeJS. Watch houses move through assembly stations, get progressively built, and track real-time production statistics.

![FactoryVis Demo](https://img.shields.io/badge/Status-Weekend%20MVP-success)
![Built with ThreeJS](https://img.shields.io/badge/Built%20with-ThreeJS-blue)
![Time to Build](https://img.shields.io/badge/Built%20in-90%20minutes-orange)

---

## ✨ Features

### 🏗️ Production System
- **3 concurrent houses** in the assembly pipeline
- **Progressive assembly** at color-coded stations:
  - 🔴 **Station 1**: Frame assembly (structural wireframe)
  - 🟡 **Station 2**: Wall installation (solid beige panels)
  - 🟢 **Station 3**: Roof placement (metallic cap)
- **Automatic spawning** - new houses spawn when previous clears Station 1
- **Continuous production** - completed houses exit, new ones enter

### 📊 Real-Time Statistics
- Houses completed counter
- Houses in progress (current pipeline)
- Production rate (per hour)
- Projected daily output
- Elapsed time tracker
- Production speed control (0.5x to 5.0x)

### 🎮 Interactive Controls

**Mouse:**
- Left-click drag: Rotate camera
- Scroll: Zoom in/out

**Keyboard (WASD):**
- `W/A/S/D`: Move camera horizontally
- `Shift`: Move camera up
- `Space`: Move camera down

**Camera Presets:**
- Overview (bird's eye view)
- Station 1/2/3 close-ups

### 🎨 Visual Design
- Futuristic/clean aesthetic
- Atmospheric fog for depth
- Multi-light setup (sun, rim, fill, accent)
- Polished metallic materials
- Color-coded station markers with glow
- High-resolution shadows (2048x2048)

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for ES6 modules)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Maximooch/FactoryVis.git
   cd FactoryVis
   ```

2. **Start a local server:**

   **Option A: Using npx (Node.js):**
   ```bash
   npx http-server -p 8080
   ```

   **Option B: Using Python:**
   ```bash
   python3 -m http.server 8080
   ```

   **Option C: Using VS Code Live Server extension**

3. **Open in browser:**
   ```
   http://localhost:8080
   ```

---

## 📁 Project Structure

```
FactoryVis/
├── index.html              # Main HTML entry point
├── src/
│   ├── main.js            # Scene setup, lighting, animation loop
│   ├── factory.js         # FactoryFloor, ConveyorBelt, ProductionLine classes
│   ├── house.js           # HouseShell model with assembly stages
│   └── ui.js              # Dashboard (dat.GUI integration)
├── PLAN.md                # High-level project overview
├── TODO.md                # Detailed task breakdown with progress
└── README.md              # This file
```

---

## 🛠️ Technical Details

### Built With
- **ThreeJS** (r160) - 3D rendering engine
- **dat.GUI** - Real-time controls and stats
- **Vanilla JavaScript** - No framework overhead

### Architecture

**FactoryFloor:**
- 150x150 unit plane with grid helper
- Matte concrete material

**ConveyorBelt:**
- 100-unit long belt (Z: 0 to -100)
- Polished metallic surface
- Shiny metal edge guides
- 3 assembly stations with colored markers

**HouseShell:**
- Modular design (10x8x12 units)
- 3 components: frame (wireframe), walls (solid), roof (cap)
- Progressive visibility based on assembly stage

**ProductionLine:**
- Manages up to 3 concurrent houses
- Spacing-based spawn logic
- Real-time statistics calculation
- Speed multiplier support

### Performance
- Optimized shadow maps (2048x2048)
- Efficient object lifecycle (spawn/remove)
- Smooth 60 FPS on modern hardware

---

## 🎯 Usage Examples

### Adjust Production Speed
1. Open the **⚙️ Controls** panel (top-right)
2. Drag the **Production Speed** slider
3. Watch throughput numbers change in real-time

### Explore Different Views
1. Click **📷 Camera Presets**
2. Select a station (e.g., "Station 2 (Walls)")
3. Camera instantly jumps to close-up view
4. Use WASD to fine-tune position

### Monitor Production
- **Houses Completed**: Total finished units
- **In Progress**: Current pipeline count (max 3)
- **Per Hour**: Actual completion rate
- **Per Day**: Projected 24-hour output

---

## 🧪 Development Timeline

**Total Time: ~90 minutes** (Weekend MVP)

- **Day 1 (60 min)**: Foundation
  - ThreeJS scene setup
  - Factory floor and conveyor
  - House model with assembly stages
  - Basic movement system
  - WASD camera controls

- **Day 3 (30 min)**: Scale & Polish
  - Multiple houses (ProductionLine class)
  - Real-time statistics
  - dat.GUI dashboard
  - Visual polish (lighting, materials, fog)

---

## 🔮 Future Enhancements

**Planned:**
- [ ] Animated conveyor texture (UV scrolling)
- [ ] Houses pause at stations during assembly
- [ ] Smooth assembly animations (walls slide in, roof drops)
- [ ] Screenshot export button
- [ ] Increase max houses (3 → 5)

**Ideas:**
- [ ] Multiple building types (single-story, two-story)
- [ ] More detailed house models (glTF imports)
- [ ] VR mode (WebXR)
- [ ] Sound effects (conveyor hum, assembly clunks)
- [ ] Deploy to GitHub Pages

---

## 📝 License

MIT License - feel free to use this project for learning or inspiration!

---

## 🙏 Acknowledgments

- **ThreeJS** - Amazing 3D library
- **dat.GUI** - Quick and elegant UI controls
- **Penguin AI Agent** - Pair programming partner for rapid development

---

## 📸 Screenshots

*(Add screenshots here after capturing)*

**Overview:**
![Factory Overview](screenshots/overview.png)

**Station Close-up:**
![Station 2 Assembly](screenshots/station2.png)

**Dashboard:**
![Production Stats](screenshots/dashboard.png)

---

**Built with ❤️ in a weekend** | [View on GitHub](https://github.com/Maximooch/FactoryVis)