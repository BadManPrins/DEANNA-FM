const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace('section.active {\n    opacity: 1;\n    visibility: visible;\n    pointer-events: auto;\n}', 'section.active {\n    opacity: 1;\n    visibility: visible;\n    pointer-events: auto;\n    position: relative;\n}');
css = css.replace('section.active {\r\n    opacity: 1;\r\n    visibility: visible;\r\n    pointer-events: auto;\r\n}', 'section.active {\r\n    opacity: 1;\r\n    visibility: visible;\r\n    pointer-events: auto;\r\n    position: relative;\r\n}');

fs.writeFileSync('style.css', css);
console.log('Fixed section CSS');
