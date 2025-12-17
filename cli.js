#!/usr/bin/env node
'use strict';

const { argv } = require('process');
const glow = require('./index.js');

// CLI parser (simple: termglow <command> [args])
const command = argv[2];
const args = argv.slice(3).join(' ');

switch (command) {
  case 'box':
    glow.box(args || 'Default box content');
    break;
  case 'table':
    // Example data; in real use, parse JSON input
    glow.table([
      ['Header1', 'Header2'],
      ['Row1 Col1', 'Row1 Col2'],
      [42, 'Answer']
    ]);
    break;
  case 'loading':
    glow.loading('CLI Loading Demo', ['Fetching', 'Building', 'Deploying'], 5000);
    break;
  case 'progress':
    for (let i = 0; i <= 100; i += 20) {
      glow.progress(i, 100, { message: 'CLI Progress', signal: '🔄' });
    }
    break;
  case 'glow':
    glow.glowText(args || 'CLI Glow Text', glow.colors.fg.magenta);
    break;
  case 'theme':
    glow.theme(args || 'neon');
    console.log('Theme applied: ' + args);
    break;
  case 'image':
    glow.image(args);
    break;
  case 'stats':
    glow.fileStats(args);
    break;
  case 'help':
  case '--help':
  default:
    console.log(`
Termglow CLI - Glow up your terminal!

Usage: termglow <command> [text/path]

Commands:
  box [text]          - Draw a styled box
  table               - Render example table (extend with JSON input)
  loading [phases]    - Run animated loading
  progress            - Show progress bar
  glow [text]         - Glow text animation
  theme [name]        - Switch theme (default/neon/dark)
  image [path]        - Preview image procedurally
  stats [path]        - Show file stats table
  help                - This help

Examples:
  termglow box "Hello World!"
  termglow image ./photo.jpg
  termglow theme neon
    `);
}

process.exit(0);
