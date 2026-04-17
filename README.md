# HbbTV React Coding Challenge

## Key Features

- **Pixel-Perfect Scaling**: Authored for a **1280x720 (720p)** reference resolution. Uses a uniform transformation to fit any viewport while maintaining design proportions.
- **Senior Navigation Hook**: A specialized `useNavigation` bridge that maps hardware IR remote signals to component handlers with built-in global input throttling (120ms).
- **Premium Video Player**: A custom **941x530px** interface featuring manual Play/Pause controls and a defensive promise-handling system for legacy playback engines.
- **Legacy Hardened**: Formatted with absolute positioning and manual ES2020 syntax auditing to ensure compatibility with IE9 and older HbbTV WebKit engines.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation & Running

1. **Install dependencies**:
   ```sh
   npm install
   ```
2. **Start Development Server**:
   ```sh
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

## Technical Architecture

### 📐 Scaling Strategy (`useViewportScale.js`)

To avoid complex CSS calculations or media queries, the application uses a **Virtual Canvas** approach:

- Everything is calculated against a fixed **1280x720** grid (centralized in `constants.js`).
- A React hook calculates the `scale` based on the browser's viewport.
- `App.jsx` applies both `transform` AND `-ms-transform` to ensure IE9 centering and scaling work perfectly.

### 🕹️ Unified Navigation Bridge (`useNavigation.js`)

Designed as a performance-first event bridge:

- **Global Throttle**: Enforces a 120ms lock on all inputs to protect slow TV processors from input-racing.
- **Ref-Based handlers**: Ensures zero "input drops" during component re-renders.
- **Cross-Platform Mapping**: Standardizes keycodes for HbbTV, Tizen, and webOS hardware.

### 🍱 Component Logic

- **Main Screen**: Implements a horizontal shelf layout within the 1280px world resolution, using legacy-stable `inline-block` positioning.
- **Video Player**: Features a centered Play/Pause CTA for intuitive remote-based playback control and state synchronization.

## Implementation Decisions

Comprehensive technical justifications, including our rationale for **omitting unnecessary memoization** and **handling legacy Promise results**, can be found in **[DECISIONS.md](./DECISIONS.md)**.

## AI Usage Disclosure

This project was developed with the assistance of an AI coding agent IDE (**Antigravity**) to ensure the architecture meets senior level standards for legacy hardware and 10-foot UI design.

### How AI was utilized:

- **Architectural Auditing**: AI was used to conduct "nomenclature audits," identifying and replacing modern syntax (ES2020+) and layout modules (Flex/Grid) with IE9-safe alternatives.
- **Defensive Engineering**: AI assisted in implementing the global input throttle (120ms) and the defensive `.play()` promise handling for legacy browsers.
- **Design Synchronization**: Assisted in the mathematical mapping of Figma designs into the 1280x720 virtual canvas scaling strategy.
- **Documentation**: AI helped generate the `DECISIONS.md` and `README.md` to clearly articulate the technical rationale.

### Sample Prompts Used:

- _"Enhance the CSS for the MainScreen and VideoPlayer to follow an IE9 safe layout strategy. Avoid all Flexbox and Grid modules. Use absolute positioning and fixed dimensions calculated for a 1280x720 reference resolution to ensure total layout stability."_
- _"Perform a technical audit of the source code to identify and remove all ES2020+ syntax (like nullish coalescing and optional chaining). Replace them with ES5-compatible nomenclature to ensure native safety on older TV browsers without over-relying on heavy transpilation polyfills."_
- _"Design a specialized React hook for HbbTV remote navigation. It needs to include a global action throttle to prevent hardware crashes, as we are meant to render on low end devices, and use a Ref- pattern to ensure the event listener remains stable and never drops input during rapid state updates."_
- _"Generate a professional README.md that focuses on technical specifications, navigation architecture, and senior level engineering decisions rather than just basic setup instructions."_

### Professional Oversight:

Every line of code and architectural decision was manually directed, reviewed, and tested. The AI functioned as a pair-programmer to ensure the project stayed within the strict time-frame and technical constraints of the HbbTV ecosystem.

## License

MIT
