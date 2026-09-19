const fs = require('fs');

// 1. UPDATE SVG IN HTML
let html = fs.readFileSync('index.html', 'utf8');

const oldSvgRegex = /<svg viewBox="0 0 200 200" id="lily-svg"[\s\S]*?<\/svg>/;

const newSvg = `<svg viewBox="0 0 200 200" id="lily-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="petal-grad" cx="50%" cy="100%" r="100%">
                        <stop offset="0%" stop-color="#fdfcf0" />
                        <stop offset="60%" stop-color="#ffffff" />
                        <stop offset="100%" stop-color="#f5e6e6" />
                    </radialGradient>
                    <radialGradient id="petal-grad-dark" cx="50%" cy="100%" r="100%">
                        <stop offset="0%" stop-color="#e8e8e0" />
                        <stop offset="60%" stop-color="#fdfcf0" />
                        <stop offset="100%" stop-color="#e6d5d5" />
                    </radialGradient>
                </defs>
                
                <!-- Stem -->
                <path d="M100 120 Q 90 160 95 200" stroke="#4a6353" stroke-width="4" fill="none"/>
                
                <!-- Leaves -->
                <path d="M98 160 Q 60 150 40 120 Q 70 140 95 170 Z" fill="#4a6353"/>
                <path d="M97 180 Q 140 170 160 140 Q 130 160 96 190 Z" fill="#4a6353"/>

                <!-- Petal template with speckles -->
                <defs>
                    <g id="petal-out">
                        <path d="M100 120 C70 80, 80 20, 100 5 C120 20, 130 80, 100 120 Z" fill="url(#petal-grad-dark)" />
                        <circle cx="100" cy="90" r="1.5" fill="#d4af37" />
                        <circle cx="95" cy="80" r="1.2" fill="#d4af37" />
                        <circle cx="105" cy="85" r="1" fill="#d4af37" />
                        <circle cx="92" cy="100" r="1.5" fill="#d4af37" />
                        <circle cx="108" cy="100" r="1.5" fill="#d4af37" />
                    </g>
                    <g id="petal-in">
                        <path d="M100 120 C75 85, 85 30, 100 10 C115 30, 125 85, 100 120 Z" fill="url(#petal-grad)" />
                        <circle cx="100" cy="90" r="1.5" fill="#d4af37" />
                        <circle cx="95" cy="80" r="1.2" fill="#d4af37" />
                        <circle cx="105" cy="85" r="1" fill="#d4af37" />
                        <circle cx="92" cy="100" r="1.5" fill="#d4af37" />
                        <circle cx="108" cy="100" r="1.5" fill="#d4af37" />
                    </g>
                    <g id="stamen">
                        <path d="M100 120 Q 110 80 100 50" stroke="#d4af37" stroke-width="1.5" fill="none"/>
                        <ellipse cx="100" cy="50" rx="2" ry="5" fill="#b8962a" transform="rotate(45, 100, 50)"/>
                    </g>
                </defs>

                <!-- Outer Petals -->
                <use href="#petal-out" class="petal petal-out-1" />
                <use href="#petal-out" class="petal petal-out-2" />
                <use href="#petal-out" class="petal petal-out-3" />

                <!-- Inner Petals -->
                <use href="#petal-in" class="petal petal-in-1" />
                <use href="#petal-in" class="petal petal-in-2" />
                <use href="#petal-in" class="petal petal-in-3" />

                <!-- Stamens -->
                <g class="stamens">
                    <use href="#stamen" class="stamen stamen-1" />
                    <use href="#stamen" class="stamen stamen-2" />
                    <use href="#stamen" class="stamen stamen-3" />
                    <use href="#stamen" class="stamen stamen-4" />
                    <use href="#stamen" class="stamen stamen-5" />
                    <use href="#stamen" class="stamen stamen-6" />
                </g>
                
                <circle cx="100" cy="120" r="4" fill="#a4b595"/>
            </svg>`;

html = html.replace(oldSvgRegex, newSvg);
fs.writeFileSync('index.html', html);


// 2. UPDATE CSS
let css = fs.readFileSync('style.css', 'utf8');

const oldCssRegex = /\.petal \{[\s\S]*?\.lily-container:hover \.petal-c \{ transform: scale\(1\.1\); \}/;

const newCss = `.petal, .stamen {
    transform-origin: 100px 120px;
    transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Base petal positions (Closed/Bud shape) */
.petal-out-1 { transform: rotate(-120deg) scale(0.4); }
.petal-out-2 { transform: rotate(120deg) scale(0.4); }
.petal-out-3 { transform: rotate(180deg) scale(0.4); }

.petal-in-1 { transform: rotate(-60deg) scale(0.4); }
.petal-in-2 { transform: rotate(60deg) scale(0.4); }
.petal-in-3 { transform: rotate(0deg) scale(0.4); }

/* Base stamen positions */
.stamen-1 { transform: rotate(15deg) scale(0.2); }
.stamen-2 { transform: rotate(75deg) scale(0.2); }
.stamen-3 { transform: rotate(135deg) scale(0.2); }
.stamen-4 { transform: rotate(195deg) scale(0.2); }
.stamen-5 { transform: rotate(255deg) scale(0.2); }
.stamen-6 { transform: rotate(315deg) scale(0.2); }

/* Hover blossoming */
.lily-container:hover .petal-out-1 { transform: rotate(-120deg) scale(1.1); }
.lily-container:hover .petal-out-2 { transform: rotate(120deg) scale(1.1); }
.lily-container:hover .petal-out-3 { transform: rotate(180deg) scale(1.1); }

.lily-container:hover .petal-in-1 { transform: rotate(-60deg) scale(1.05); }
.lily-container:hover .petal-in-2 { transform: rotate(60deg) scale(1.05); }
.lily-container:hover .petal-in-3 { transform: rotate(0deg) scale(1.05); }

.lily-container:hover .stamen-1 { transform: rotate(15deg) scale(1); }
.lily-container:hover .stamen-2 { transform: rotate(75deg) scale(1); }
.lily-container:hover .stamen-3 { transform: rotate(135deg) scale(1); }
.lily-container:hover .stamen-4 { transform: rotate(195deg) scale(1); }
.lily-container:hover .stamen-5 { transform: rotate(255deg) scale(1); }
.lily-container:hover .stamen-6 { transform: rotate(315deg) scale(1); }`;

css = css.replace(oldCssRegex, newCss);
fs.writeFileSync('style.css', css);

console.log('Fixed lily design');
