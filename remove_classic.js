const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(publicDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Split into lines and remove the one containing href="classic.html"
    const lines = content.split('\n');
    const newLines = lines.filter(line => !line.includes('href="classic.html"'));
    
    // Also remove the translation setting for nav_classic if it exists
    const finalLines = newLines.filter(line => !line.includes("nav_classic:"));
    const finalLines2 = finalLines.filter(line => !line.includes("document.getElementById('nav-classic')"));

    fs.writeFileSync(filePath, finalLines2.join('\n'), 'utf8');
    console.log(`Removed classic.html links from ${file}`);
});

// Optionally delete classic.html since it's no longer used
const classicFilePath = path.join(publicDir, 'classic.html');
if (fs.existsSync(classicFilePath)) {
    fs.unlinkSync(classicFilePath);
    console.log('Deleted classic.html');
}
