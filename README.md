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

### 📐 Scaling Strategy (Fixed Baseline)

To ensure maximum compatibility with legacy TV hardware, the application avoids dynamic JavaScript scaling:

- **Reference Resolution**: Strictly authored for a fixed **1280x720** grid.
- **Hardware Upscaling**: We rely on the TV hardware's graphics compositor to upscale the 720p layer to 1080p or 4K, ensuring crystal-clear text and zero CPU overhead for scaling.
- **Legacy Layout**: Uses absolute positioning and `inline-block` systems for total stability on IE9 and ancient WebKit engines.

### 🕹️ Unified Navigation Bridge (`useNavigation.js`)

Designed as a performance-first event bridge:

- **Global Throttle**: Enforces a 120ms lock on all inputs to protect slow TV processors from input-racing.
- **Standard Mapping**: Includes native support for HbbTV, Tizen, and webOS hardware backkeys and color keys.

### 🍱 Component Logic

- **Main Screen**: Implements a horizontal shelf layout within the 1280px world resolution, using legacy-stable `inline-block` positioning instead of modern Flexbox/Grid modules.
- **Video Player**: Features a centered Play/Pause CTA for intuitive remote-based playback control, with built-in hardware buffering feedback (`isLoading`).

## Implementation Decisions

Comprehensive technical justifications, including our rationale for **using a fixed 720p baseline**, **handling OIPF KeySets**, and **omitting unnecessary memoization**, can be found in **[DECISIONS.md](./DECISIONS.md)**.

## AI Usage Disclosure

This project was developed with the assistance of an AI coding agent IDE (**Antigravity**) to ensure the architecture meets senior level standards for legacy hardware and 10-foot UI design.

### How AI was utilized:

- **Architectural Auditing**: AI was used to conduct "nomenclature audits," identifying and replacing modern syntax (ES2020+) and layout modules (Flex/Grid) with IE10-safe alternatives.
- **HbbTV Hardening**: AI assisted in implementing the HbbTV 1.5 compliance layer, including XHTML structure and OIPF Keyset registration.
- **Defensive Engineering**: AI assisted in implementing the global input throttle (120ms) and the defensive `.play()` promise handling for legacy browsers.
- **Simplification**: Iteratively simplified the UI architecture to prioritize hardware stability over modern browser browser features.
- **Documentation**: AI helped generate the `DECISIONS.md` and `README.md` to clearly articulate the technical rationale.

### Sample Prompts Used:

- _"Simplify the application architecture to use a fixed 1280x720 baseline. Remove all dynamic scaling hooks and CSS transforms to avoid GPU jitter on legacy TV hardware. Ensure the layout remains 16:9 compliant."_
- _"Implement HbbTV 1.5 hardware compliance. Add the mandatory OIPF objects to index.html and use the app.privateData.keyset.setValue(0x1F) method to request remote control access. Structure the HTML as a well-formed XHTML document."_
- _"Perform a technical audit of the source code to identify and remove all ES2020+ syntax (like nullish coalescing and optional chaining). Replace them with ES5-compatible nomenclature to ensure native safety on older TV browsers."_
- _"Design a specialized React hook for HbbTV remote navigation. It needs to include a global action throttle to prevent hardware crashes on low-end devices."_

### Professional Oversight:

Every line of code and architectural decision was manually directed, reviewed, and tested. The AI functioned as a pair-programmer to ensure the project stayed within the strict time-frame and technical constraints of the HbbTV ecosystem.

## License

MIT
