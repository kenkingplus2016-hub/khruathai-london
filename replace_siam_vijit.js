const fs = require('fs');
const path = require('path');

const royalPath = path.join(__dirname, 'public', 'royal.html');
let content = fs.readFileSync(royalPath, 'utf8');

content = content.replace(/สยามวิจิตรชาววัง \(เซต 32 ชิ้น\)/g, 'สยามวิจิตร (เซต 32 ชิ้น)');

fs.writeFileSync(royalPath, content, 'utf8');
console.log('Replaced successfully');
