const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace('#intro-section {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    background: radial-gradient(circle at center, #0a1f18 0%, var(--bg-dark) 100%);\r\n    z-index: 100;\r\n}', '#intro-section {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    background: radial-gradient(circle at center, #0a1f18 0%, var(--bg-dark) 100%);\r\n    z-index: 100;\r\n    height: 100vh;\r\n    overflow: hidden;\r\n    position: fixed;\r\n}');
css = css.replace('#intro-section {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: radial-gradient(circle at center, #0a1f18 0%, var(--bg-dark) 100%);\n    z-index: 100;\n}', '#intro-section {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: radial-gradient(circle at center, #0a1f18 0%, var(--bg-dark) 100%);\n    z-index: 100;\n    height: 100vh;\n    overflow: hidden;\n    position: fixed;\n}');
fs.writeFileSync('style.css', css);
console.log('Fixed intro section CSS');
