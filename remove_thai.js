const fs = require('fs');
const path = require('path');

const publicDir = 'public';

// Recursive function to get all HTML files
function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (filePath.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const htmlFiles = getHtmlFiles(publicDir);

for (const file of htmlFiles) {
    let html = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Fix the specific sandwich text first in meeting-meals.html
    const oldSandwichStr = 'Assorted Sandwiches or Thai Sangkhaya Bread (แซนด์วิชทูนา หรือ ขนมปังสังขยาใบเตย)';
    if (html.includes(oldSandwichStr)) {
        html = html.split(oldSandwichStr).join('Tuna Sandwiches or Pandan Custard Bread');
        changed = true;
    }
    
    // Also check for the previous iteration just in case
    const oldSandwichStr2 = 'Assorted Sandwiches or Thai Sangkhaya Bread (แซนด์วิช หรือ ขนมปังสังขยา)';
    if (html.includes(oldSandwichStr2)) {
        html = html.split(oldSandwichStr2).join('Tuna Sandwiches or Pandan Custard Bread');
        changed = true;
    }

    // 2. Remove Thai text blocks and fix up brackets
    // Regex to find Thai characters
    const thaiRegex = /[\u0E00-\u0E7F]+/g;
    
    if (thaiRegex.test(html)) {
        // First, handle specific known cases of full Thai inside brackets
        // e.g. <small>(สอบถาม/ปรับเปลี่ยนเมนู)</small> -> remove entirely
        html = html.replace(/<small[^>]*>\s*\([\u0E00-\u0E7F\s\/]+\)\s*<\/small>/g, '');
        
        // Remove Thai text inside parentheses that also has English (e.g., "(Tangmo Pla Haeng แตงโมปลาแห้ง)")
        // We'll strip the Thai characters and trailing spaces
        html = html.replace(/([A-Za-z\s-]+)\s+[\u0E00-\u0E7F\s\/]+/g, '$1');
        
        // Remove standalone Thai words with optional leading/trailing spaces
        html = html.replace(/\s*[\u0E00-\u0E7F]+\s*/g, ' ');
        
        // Clean up empty parentheses that might be left behind: "()" or "( )"
        html = html.replace(/\(\s*\)/g, '');
        
        // Clean up formatting where Thai was removed right before a closing bracket: "(Tangmo Pla Haeng )"
        html = html.replace(/\s+\)/g, ')');
        
        // Clean up double spaces caused by replacements
        html = html.replace(/  +/g, ' ');

        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, html, 'utf8');
        console.log(`Removed Thai text from ${file}`);
    }
}
