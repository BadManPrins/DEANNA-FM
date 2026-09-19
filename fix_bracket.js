const fs = require('fs');
let s = fs.readFileSync('script.js', 'utf8');
s = s.replace('}}', '}');
fs.writeFileSync('script.js', s);
