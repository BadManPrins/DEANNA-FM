const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const defsRegex = /<defs>[\s\S]*?<\/defs>/;
const newDefs = `<defs>
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
                    <linearGradient id="stripe-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stop-color="#8a1135" />
                        <stop offset="50%" stop-color="#cc3163" />
                        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                    </linearGradient>

                    <g id="petal-out">
                        <path d="M100 120 C70 80, 80 20, 100 5 C120 20, 130 80, 100 120 Z" fill="url(#petal-grad-dark)" />
                        <path d="M100 120 C85 95, 92 40, 100 15 C108 40, 115 95, 100 120 Z" fill="url(#stripe-grad)" />
                        <circle cx="100" cy="90" r="1.5" fill="#4a081b" />
                        <circle cx="95" cy="80" r="1.2" fill="#4a081b" />
                        <circle cx="105" cy="85" r="1" fill="#4a081b" />
                        <circle cx="92" cy="100" r="1.5" fill="#4a081b" />
                        <circle cx="108" cy="100" r="1.5" fill="#4a081b" />
                        <circle cx="97" cy="65" r="1" fill="#4a081b" />
                        <circle cx="103" cy="70" r="1.2" fill="#4a081b" />
                    </g>
                    <g id="petal-in">
                        <path d="M100 120 C75 85, 85 30, 100 10 C115 30, 125 85, 100 120 Z" fill="url(#petal-grad)" />
                        <path d="M100 120 C87 95, 93 45, 100 20 C107 45, 113 95, 100 120 Z" fill="url(#stripe-grad)" />
                        <circle cx="100" cy="90" r="1.5" fill="#4a081b" />
                        <circle cx="95" cy="80" r="1.2" fill="#4a081b" />
                        <circle cx="105" cy="85" r="1" fill="#4a081b" />
                        <circle cx="92" cy="100" r="1.5" fill="#4a081b" />
                        <circle cx="108" cy="100" r="1.5" fill="#4a081b" />
                        <circle cx="97" cy="65" r="1" fill="#4a081b" />
                        <circle cx="103" cy="70" r="1.2" fill="#4a081b" />
                    </g>
                    <g id="stamen">
                        <path d="M100 120 Q 100 80 100 45" stroke="#90b874" stroke-width="1.5" fill="none"/>
                        <circle cx="100" cy="45" r="3" fill="#361510" />
                    </g>
                </defs>`;

html = html.replace(defsRegex, newDefs);
fs.writeFileSync('index.html', html);
console.log('Fixed petal colors');
