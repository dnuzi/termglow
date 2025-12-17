// Exportable themes - users can require and customize
module.exports = {
  default: {
    primary: '\x1b[36m', // Cyan
    accent: '\x1b[35m'    // Magenta
  },
  neon: {
    primary: '\x1b[96m', // Bright cyan
    accent: '\x1b[95m'   // Bright magenta
  },
  dark: {
    primary: '\x1b[90m', // Gray
    accent: '\x1b[37m'   // White
  }
};

// To use in index.js: const themes = require('./themes.js'); colors.fg.primary = themes.neon.primary;
