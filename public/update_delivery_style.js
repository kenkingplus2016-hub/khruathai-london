const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'delivery.html');
let content = fs.readFileSync(filePath, 'utf8');

// Main container background and text color
content = content.replace(/background:linear-gradient\(135deg, var\(--dark-green\), #2a4a35\);/g, 'background:#FFFFFF;');
content = content.replace(/color:white;/g, 'color:#000000;');

// Inner boxes background
content = content.replace(/background:rgba\(255,255,255,0\.08\);/g, 'background:#F9F9F9; color:#000000;');

// Bottom note text color (from transparent white to dark gray)
content = content.replace(/color:rgba\(255,255,255,0\.7\);/g, 'color:#555555;');

// Also remove the dark green tailwind hero background just in case it's in delivery.html too!
content = content.replace(/bg-\[linear-gradient\(rgba\(13,31,20,0\.85\),rgba\(13,31,20,0\.85\)\),url\('images\/cover\.jpg'\)\]/g, 'bg-white');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated delivery conditions styling to white.");
