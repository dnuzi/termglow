const glow = require('../index.js');

console.log('🧪 Testing Termglow...');

// Test log
glow.log('success', 'Log test passed!');

// Test box
glow.box('Test Box');

// Test table
glow.table([['Test', 'Pass']]);

// Test theme
glow.theme('dark');
glow.log('info', 'Theme switched!');

console.log('✅ All tests complete (manual check outputs).');
##### `tests/basic.test.js` (New: Simple Tests)
```javascript
const glow = require('../index.js');

console.log('🧪 Testing Termglow...');

// Test log
glow.log('success', 'Log test passed!');

// Test box
glow.box('Test Box');

// Test table
glow.table([['Test', 'Pass']]);

// Test theme
glow.theme('dark');
glow.log('info', 'Theme switched!');

console.log('✅ All tests complete (manual check outputs).');
