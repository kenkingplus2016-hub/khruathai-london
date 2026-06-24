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

            // 1. Add responsive.css
            if (!content.includes('responsive.css')) {
                content = content.replace('</head>', '    <link rel="stylesheet" href="responsive.css">\n</head>');
                modified = true;
            }

            // 2. Add mobile-menu-btn inside header, just before <nav>
            if (!content.includes('mobile-menu-btn')) {
                // Find <nav> inside <header>
                content = content.replace(/<nav>/, '<div class="mobile-menu-btn"><i class="fas fa-bars"></i></div>\n        <nav>');
                modified = true;
            }

            // 3. Add mobile-menu.js
            if (!content.includes('mobile-menu.js')) {
                content = content.replace('</body>', '    <script src="mobile-menu.js"></script>\n</body>');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated ${file}`);
            }
        }
    });
});
