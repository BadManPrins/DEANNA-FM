const fs = require('fs');
let script = fs.readFileSync('script.js', 'utf8');

// Regex to match the Tyler, The Creator line
const tylerRegex = /[\s]*\{ id: 'user7', title: 'Tyler, The Creator - SWEET \/ I THOUGHT\.\.\.', vocal: 'audio\/user-track-7\.mp3', inst: null, bpm: 83, color: '#ffcc33' \},/;

script = script.replace(tylerRegex, '');
fs.writeFileSync('script.js', script);
console.log('Removed Tyler, The Creator from library');
