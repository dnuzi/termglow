#!/usr/bin/env node
const glow = require('../index.js');

// New theme demo
glow.theme('neon');
console.log('Using termglow 1.1.0 with Neon theme');

glow.log('info', 'Building project...');
setTimeout(() => {
  glow.log('warning', 'Update available: 1.1.1');
  glow.log('success', 'Built!');
  glow.log('error', 'Example error - all good!');

  glow.box('Enhanced box with padding', { padding: 2 });

  // Multi-phase loading
  glow.loading('Full build', ['Compiling', 'Linking', 'Optimizing'], 4000);

  // Table example (like comparisons)
  glow.table([
    ['Step', 'Status', 'Time'],
    ['Compile', '✅', '2s'],
    ['Link', '🔄', '1s'],
    ['Done', '📊', '0.5s']
  ], { headers: true });

  // Progress with new signals
  glow.progress(25, 100, { signal: '🔄', message: 'In progress' });
  glow.progress(100, 100, { signal: '✅', message: 'Complete' });

  glow.prompt('Deploy?').then(yes => {
    if (yes) {
      glow.fileStats('./example.js'); // Bonus file stats
      glow.image('./terminal-image.png'); // Your image
    }
    process.exit(0);
  });

}, 500);
