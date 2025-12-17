'use strict';

const fs = require('fs');
const { createInterface } = require('readline');
const { stdout, stderr } = require('process');
const crypto = require('crypto');

// Base colors (unchanged)
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  fg: {
    black: '\x1b[30m', red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m',
    blue: '\x1b[34m', magenta: '\x1b[35m', cyan: '\x1b[36m', white: '\x1b[37m',
    gray: '\x1b[90m'
  },
  bg: {
    black: '\x1b[40m', red: '\x1b[41m', green: '\x1b[42m', yellow: '\x1b[43m',
    blue: '\x1b[44m', magenta: '\x1b[45m', cyan: '\x1b[46m', white: '\x1b[47m',
    gray: '\x1b[100m'
  }
};

// Themes (procedural: adapts to terminal width)
let currentTheme = 'default';
function applyTheme(themeName = 'default') {
  currentTheme = themeName;
  // Load from themes.js or inline; for now, simple switch
  if (themeName === 'neon') {
    colors.fg.magenta = '\x1b[95m'; // Brighter magenta
    colors.fg.cyan = '\x1b[96m';
  } else if (themeName === 'dark') {
    colors.fg.white = colors.fg.gray;
    colors.bg.black = colors.bg.gray;
  }
  // Procedural: Add width-based padding if wide term
  if (stdout.columns > 120) {
    // Future: Auto-scale boxes/tables
  }
}

// Import themes (require('./themes.js') if separate)
applyTheme(); // Init

// Styled logging (enhanced with theme)
function log(type, message) {
  let prefix = '';
  let color = colors.fg.white;
  switch (type) {
    case 'success':
      prefix = `${colors.fg.green}✓${colors.reset} `;
      color = colors.fg.green;
      break;
    case 'error':
      prefix = `${colors.fg.red}✗${colors.reset} `;
      color = colors.fg.red;
      break;
    case 'warning':
      prefix = `${colors.fg.yellow}⚠${colors.reset} `;
      color = colors.fg.yellow;
      break;
    case 'info':
      prefix = `${colors.fg.blue}ℹ${colors.reset} `;
      color = colors.fg.blue;
      break;
    default:
      prefix = '';
  }
  glowText(prefix + message, color, true);
}

// Box (unchanged, but theme-aware)
function box(text, options = {}) {
  const { padding = 1, border = 'double', color = colors.fg[currentTheme === 'neon' ? 'cyan' : 'cyan'] } = options;
  const lines = text.split('\n');
  const maxLen = Math.max(...lines.map(l => l.length)) + 2 * padding;
  const width = Math.max(maxLen, 10);

  let top, middle, bottom, side;
  if (border === 'double') {
    top = '╔' + '═'.repeat(width - 2) + '╗';
    bottom = '╚' + '═'.repeat(width - 2) + '╝';
    middle = '║' + ' '.repeat(width - 2) + '║';
    side = '║';
  } else {
    top = '┌' + '─'.repeat(width - 2) + '┐';
    bottom = '└' + '─'.repeat(width - 2) + '┘';
    middle = '│' + ' '.repeat(width - 2) + '│';
    side = '│';
  }

  let output = `${color}${top}${colors.reset}\n`;
  for (let i = 0; i < padding; i++) output += `${color}${middle}${colors.reset}\n`;
  for (const line of lines) {
    const padded = line.padEnd(width - 2 - 2 * padding, ' ');
    const content = ' '.repeat(padding) + padded + ' '.repeat(padding);
    output += `${color}${side}${content}${side}${colors.reset}\n`;
  }
  for (let i = 0; i < padding; i++) output += `${color}${middle}${colors.reset}\n`;
  output += `${color}${bottom}${colors.reset}\n`;
  console.log(output);
}

// NEW: Table renderer (ASCII/Unicode, aligned columns)
function table(rows, options = {}) {
  const { headers = true, border = 'single', color = colors.fg.cyan } = options;
  if (!rows.length) return log('warning', 'No data for table');

  // Calculate column widths
  const cols = rows[0].length;
  const widths = new Array(cols).fill(0);
  rows.forEach(row => row.forEach((cell, i) => widths[i] = Math.max(widths[i], cell.toString().length)));

  let output = '';
  const pad = (str, len) => str.padEnd(len, ' ');

  // Header separator
  const sep = border === 'double' ? '═' : '─';
  const headerSep = Array.from({length: cols}, (_, i) => sep.repeat(widths[i] + 2)).join('┼');

  if (headers && rows[0][0] !== undefined) {
    const headerRow = rows.shift();
    output += `${color}┌${Array.from({length: cols}, (_, i) => sep.repeat(widths[i] + 2)).join('┬')}┐${colors.reset}\n`;
    output += `${color}│${headerRow.map((h, i) => ` ${pad(h, widths[i])} │`).join('')}│${colors.reset}\n`;
    output += `${color}├${headerSep}┤${colors.reset}\n`;
  }

  rows.forEach(row => {
    output += `${color}│${row.map((cell, i) => ` ${pad(cell.toString(), widths[i])} │`).join('')}│${colors.reset}\n`;
  });

  output += `${color}└${Array.from({length: cols}, (_, i) => sep.repeat(widths[i] + 2)).join('┴')}┘${colors.reset}\n`;
  console.log(output);
}

// Enhanced loading (multi-phase)
function loading(message, phases = ['Loading', 'Processing', 'Done'], duration = 3000) {
  const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let phaseIdx = 0;
  let i = 0;
  const phaseTime = duration / phases.length;
  const interval = setInterval(() => {
    const currentMsg = phases[phaseIdx] || message;
    stdout.write(`\r${colors.fg.cyan}${spinner[i % spinner.length]} ${currentMsg}...${colors.reset}`);
    i++;
    if (i * 100 % phaseTime === 0) phaseIdx++;
  }, 100);
  setTimeout(() => {
    clearInterval(interval);
    stdout.write('\r' + ' '.repeat(50) + '\n');
    log('success', 'Loading complete!');
  }, duration);
}

// Progress (added more signals: ⏹, 🔄, 📊)
function progress(current, total, options = {}) {
  const { message = '', signal = '▶' } = options; // Now supports '⏹', '🔄', '📊', '⭐', '✅'
  const percent = (current / total) * 100;
  const barLen = 20;
  const filled = Math.round(barLen * percent / 100);
  const bar = `${colors.fg.green}█${colors.reset}`.repeat(filled) + `${colors.fg.gray}░${colors.reset}`.repeat(barLen - filled);
  console.log(`${colors.fg[signal === '📊' ? 'yellow' : 'cyan']}${signal} [${bar}] ${percent.toFixed(1)}% ${message}${colors.reset}`);
}

// Prompt (unchanged)
function prompt(question, options = { yesNo: true }) {
  const rl = createInterface({ input: process.stdin, output: stdout });
  return new Promise(resolve => {
    rl.question(`${colors.fg.green}▶ ${question} ${options.yesNo ? '[Y/n]' : ''} `, answer => {
      rl.close();
      resolve(options.yesNo ? answer.toLowerCase() !== 'n' : answer);
    });
  });
}

// Glow text (unchanged)
function glowText(text, baseColor = colors.fg.magenta, log = false) {
  const shades = [baseColor, colors.bright + baseColor, colors.dim + baseColor];
  let i = 0;
  const glowInterval = setInterval(() => {
    const shaded = shades[i % shades.length] + text + colors.reset;
    if (log) {
      stdout.write('\r' + shaded);
    } else {
      console.log(shaded);
      clearInterval(glowInterval);
      return;
    }
    i++;
  }, 500);
  if (!log) glowInterval;
  return glowInterval;
}

// Enhanced image preview (added file stats)
function imagePreview(path, options = { width: 40, height: 20 }) {
  try {
    const buffer = fs.readFileSync(path);
    const size = buffer.length;
    const hash = crypto.createHash('md5').update(buffer).digest('hex');
    const stats = `Size: ${(size / 1024).toFixed(2)} KB | Hash: ${hash.slice(0, 8)}...`;
    log('info', `🖼️ Previewing: ${path} | ${stats}`);

    const chars = ['█', '▓', '▒', '░', ' '];
    const colorsMap = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];

    let art = '';
    for (let y = 0; y < options.height; y++) {
      let row = '';
      for (let x = 0; x < options.width; x++) {
        const idx = (parseInt(hash[(y * options.width + x) % hash.length], 16) % chars.length);
        const charColor = colors.fg[colorsMap[parseInt(hash[(y * options.width + x + 1) % hash.length], 16) % colorsMap.length]];
        row += charColor + chars[idx] + colors.reset;
      }
      art += row + '\n';
    }
    console.log(art);
    log('info', '(Procedural ASCII art - unique per file)');
  } catch (err) {
    log('error', `Preview failed: ${err.message}`);
  }
}

// NEW: Quick file stats (bonus util)
function fileStats(path) {
  try {
    const stats = fs.statSync(path);
    const buffer = fs.readFileSync(path);
    const hash = crypto.createHash('md5').update(buffer).digest('hex').slice(0, 8);
    table([
      ['Property', 'Value'],
      ['Size', `${(stats.size / 1024).toFixed(2)} KB`],
      ['Modified', stats.mtime.toISOString().split('T')[0]],
      ['Hash', hash]
    ], { headers: true, border: 'double' });
  } catch (err) {
    log('error', `Stats failed: ${err.message}`);
  }
}

module.exports = {
  log,
  box,
  table,
  loading,
  progress,
  prompt,
  glowText,
  image: imagePreview,
  fileStats,
  theme: applyTheme,
  colors
};
