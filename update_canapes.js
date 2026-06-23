const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'royal_menu.json');
let content = fs.readFileSync(filePath, 'utf8');

// Replace 12 pieces with 35 pieces
content = content.replace(/12 ชิ้น \/ 12 Pcs/g, '35 ชิ้น / 35 Pcs');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated all 12 pieces to 35 pieces in royal_menu.json.");
