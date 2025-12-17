#!/usr/bin/env node
const glow = require('../index.js');

glow.theme('dark');
console.log('Table Demo');

const data = [
  ['Library', 'Deps', 'Features'],
  ['Termglow', '0', 'Glows, Tables, CLI'],
  ['Chalk', 'Self', 'Basic Colors'],
  ['Consola', '5+', 'Logs Only']
];

glow.table(data, { border: 'double', color: glow.colors.fg.yellow });
