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

            // Add light-theme.css right after responsive.css
            if (!content.includes('light-theme.css')) {
                if (content.includes('<link rel="stylesheet" href="responsive.css">')) {
                    content = content.replace('<link rel="stylesheet" href="responsive.css">', '<link rel="stylesheet" href="responsive.css">\n    <link rel="stylesheet" href="light-theme.css">');
                } else {
                    content = content.replace('</head>', '    <link rel="stylesheet" href="light-theme.css">\n</head>');
                }
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated ${file} with light theme`);
            }
        }
    });
});
