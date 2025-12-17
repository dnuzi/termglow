# Termglow 🚀

[![MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE) [![Node.js >=14](https://img.shields.io/badge/node-%3E=14-blue.svg)](https://nodejs.org) [![npm version](https://img.shields.io/npm/v/termglow.svg)](https://www.npmjs.com/package/termglow) [![Zero Dependencies](https://img.shields.io/badge/dependencies-0-lightgrey.svg)](package.json)

**Termglow** is a zero-dependency terminal and console styler for Node.js developers. Glow up your CLI outputs with stunning ANSI effects, Unicode boxes, animated spinners, progress bars, interactive prompts, procedural image previews, and more. Inspired by modern dev tools like Consola and your favorite terminal screenshots—build polished, professional interfaces without bloat. Perfect for NPM packages, scripts, or full CLIs!

Created by **DanuZz** – Making terminals shine! 🌟

## ✨ Features

- **Styled Logs** 💬: Success, error, warning, info with icons and auto-glow.
- **Unicode Boxes** 📦: Single/double borders, padding—wrap text beautifully.
- **Animated Loadings** ⏳: Spinners with multi-phases (e.g., "Fetching > Building > Done").
- **Progress Bars** 📊: Custom signals (▶, ⏸, ⭐, 🔄, ⏹, ✅) + percentages.
- **Interactive Prompts** ❓: Yes/no questions for user input.
- **Glow Text** ✨: Pulsing animations for emphasis.
- **Procedural Image Previews** 🖼️: Hash-based ASCII art (unique per file—no libs needed!).
- **File Stats** 📈: Quick tables for size, hash, modified date.
- **Data Tables** 🗂️: Aligned Unicode grids for comparisons/logs.
- **Themes** 🎨: Switch between 'default', 'neon', 'dark'—adapts to terminal size.
- **CLI Mode** 🔧: Instant commands like `npx termglow box "Hello!"`.
- **Zero Deps** ⚡: Pure Node.js—runs anywhere, tiny installs.

## 🚀 Installation

```bash
# As library
npm install termglow

# Global CLI
npm install -g termglow

# Or use without install
npx termglow help
```

## 🎯 Quick Start

Import and glow:

```javascript
const glow = require('termglow');

// Switch theme for neon vibes
glow.theme('neon');

// Log with auto-glow
glow.log('success', 'Project built! 🚀');

// Boxed message
glow.box('I am a glowing box\nWith multi-line support!', { padding: 2, border: 'single' });

// Animated loading
glow.loading('Building...', ['Compiling', 'Linking', 'Done'], 3000);
```

Run the demo: `npm run demo` (after cloning).

## 🛠️ CLI Usage

Termglow doubles as a zero-install CLI. No setup—just `npx termglow`!

```bash
# Help
npx termglow help

# Box
npx termglow box "Your styled message"

# Table (renders example data)
npx termglow table

# Loading spinner
npx termglow loading

# Progress animation
npx termglow progress

# Glow text
npx termglow glow "Pulsing demo"

# Theme switch
npx termglow theme neon

# Image preview (procedural ASCII)
npx termglow image ./path/to/image.png

# File stats table
npx termglow stats ./yourfile.js
```

**Pro Tip**: Pipe data to CLI for dynamic use (extend with JSON parsing in future).

## 📖 All Usages & Examples

Here's every feature in action. Copy-paste into your scripts!

### 1. Styled Logs
```javascript
glow.log('success', 'All tests passed! ✅');
glow.log('error', 'Build failed—check logs. ❌');
glow.log('warning', 'Deprecated feature used. ⚠️');
glow.log('info', 'Fetching data... ℹ️');
```

**Output**: Colored icons + glowing text pulses.

### 2. Boxes
```javascript
glow.box('Simple single-line box.', { border: 'single', padding: 1 });
glow.box('Multi-line\ncontent with\ndouble borders!', { border: 'double', padding: 2 });
```

**Output**: 
```
┌──────────────┐
│              │
│ Multi-line   │
│ content with │
│ double       │
│ borders!     │
│              │
└──────────────┘
```

### 3. Tables
```javascript
const data = [
  ['Library', 'Deps', 'Features'],
  ['Termglow', '0', 'Glows, Tables, CLI 🚀'],
  ['Other Tool', '5+', 'Basic Logs']
];
glow.table(data, { headers: true, border: 'double', color: glow.colors.fg.yellow });
```

**Output**: Aligned Unicode grid (headers separated).

### 4. Loadings & Spinners
```javascript
// Basic
glow.loading('Installing deps...', 2000);

// Multi-phase
glow.loading('Full Workflow', ['Downloading', 'Installing', 'Configuring'], 5000);
```

**Output**: Spinning dots + phase updates, ends with success log.

### 5. Progress Bars
```javascript
// With custom signal
glow.progress(75, 100, { message: 'Uploading', signal: '🔄' });
glow.progress(100, 100, { message: 'Complete!', signal: '✅' });

// Loop for animation
for (let i = 0; i <= 100; i += 10) {
  glow.progress(i, 100, { signal: '▶' });
}
```

**Output**:
```
🔄 [██████████████░░░░░░░░] 75.0% Uploading
```

### 6. Interactive Prompts
```javascript
// Yes/No
const shouldDeploy = await glow.prompt('Deploy to prod?', { yesNo: true });
if (shouldDeploy) {
  glow.log('success', 'Deploying...');
}

// Free text
const name = await glow.prompt('Enter your name:');
glow.log('info', `Hello, ${name}!`);
```

**Output**: Green prompt arrow, handles input gracefully.

### 7. Glow Text
```javascript
// One-shot glow
glow.glowText('This pulses once! ✨');

// Continuous (stop manually)
const interval = glow.glowText('Live glow...', glow.colors.fg.magenta, true);
setTimeout(() => clearInterval(interval), 5000);
```

**Output**: Text cycles brightness/dimness for neon effect.

### 8. Image Preview
```javascript
glow.image('./your-image.png', { width: 30, height: 15 });
```

**Output**:
```
🖼️ Previewing: ./your-image.png | Size: 42.5 KB | Hash: a1b2c3d4...
▓▓▒░░█▒▓▓░░  (procedural ASCII art)
░░█▓▒░░▓░░█  Unique per file—fun & dep-free!
```

### 9. File Stats
```javascript
glow.fileStats('./index.js');
```

**Output**: Table with size, modified date, MD5 hash.

### 10. Themes
```javascript
glow.theme('default');  // Reset
glow.theme('neon');     // Bright colors
glow.theme('dark');     // Muted tones
```

**Output**: Applies globally—e.g., neon brightens cyan/magenta.

### Full Demo Script
See `examples/demo.js` for a build/deploy flow mimicking terminal screenshots (logs, errors, boxes, prompts).

## 🔧 Development

- **Run Demos**: `npm run demo` or `npm run table-demo`.
- **Tests**: `npm test` (basic output checks).
- **Lint**: `npx eslint .` (uses `.eslintrc.js`).
- **Publish**: `npm publish` (`.npmignore` keeps it slim).
- **TypeScript Ready**: `tsconfig.json` for checks (no build needed).

**Infra Files**:
- `.npmignore`: Excludes tests/examples from NPM.
- `tsconfig.json`: JS + TS intellisense.
- `CHANGELOG.md`: Release notes.
- `.editorconfig`: 2-space indents everywhere.
- `.eslintrc.js`: Enforces clean code.

## 📝 License

MIT License. See [LICENSE](LICENSE).

---

⭐ **Star on GitHub** if Termglow lights up your terminal! Created by **DanuZz** – Questions? Open an issue.
