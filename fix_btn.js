const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace('    border-radius: 30px;\n    color: var(--bg-dark);\n    transform: scale(0.95);', '    border-radius: 30px;\n    transform: scale(0.95);');
css = css.replace('    border-radius: 30px;\r\n    color: var(--bg-dark);\r\n    transform: scale(0.95);', '    border-radius: 30px;\r\n    transform: scale(0.95);');
fs.writeFileSync('style.css', css);
console.log('Fixed button color');
