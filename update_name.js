const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        if (file.endsWith('.html')) {
            let filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');

            let modified = false;

            // Update header brand name
            if (content.includes('KHRUA THAI<br>')) {
                content = content.replace(/KHRUA THAI<br>/g, 'KHRUA THAI LONDON<br>');
                modified = true;
            }

            // Update main title
            if (content.includes('<h1 class="main-title">KHRUA THAI</h1>')) {
                content = content.replace(/<h1 class="main-title">KHRUA THAI<\/h1>/g, '<h1 class="main-title">KHRUA THAI LONDON</h1>');
                modified = true;
            }
            
            // Update page title
            if (content.includes('<title>KHRUA THAI -')) {
                content = content.replace(/<title>KHRUA THAI -/g, '<title>KHRUA THAI LONDON -');
                modified = true;
            }

            // Update footer
            if (content.includes('© 2026 Khrua Thai London')) {
                content = content.replace(/© 2026 Khrua Thai London/g, '© 2026 KHRUA THAI LONDON');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated name in ${file}`);
            }
        }
    });
});
