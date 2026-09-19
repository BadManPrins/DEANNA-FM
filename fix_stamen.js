const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldStamen = `<g id="stamen">
                        <path d="M100 120 Q 110 80 100 50" stroke="#d4af37" stroke-width="1.5" fill="none"/>
                        <ellipse cx="100" cy="50" rx="2" ry="5" fill="#b8962a" transform="rotate(45, 100, 50)"/>
                    </g>`;

const newStamen = `<g id="stamen">
                        <path d="M100 120 Q 100 80 100 45" stroke="#d4af37" stroke-width="1.5" fill="none"/>
                        <circle cx="100" cy="45" r="3" fill="#b8962a" />
                    </g>`;

html = html.replace(oldStamen, newStamen);
fs.writeFileSync('index.html', html);
console.log('Fixed stamens');
