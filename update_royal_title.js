const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'royal.html');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/ค็อกเทลและคานาเป้สไตล์ชาววัง/g, 'ค็อกเทลและคานาเป้');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated title in royal.html");
