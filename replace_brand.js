const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const dirFile = path.join(dir, file);
        try {
            filelist = fs.statSync(dirFile).isDirectory() ? walkSync(dirFile, filelist) : filelist.concat(dirFile);
        } catch (err) {}
    });
    return filelist;
};

const files = walkSync(path.join(__dirname, 'public')).filter(f => f.endsWith('.html'));

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // Replace the specific span content in the brand name
    content = content.replace(/<span style="font-size:0.6rem; letter-spacing:1px; font-weight:400; color:white;">CELEBRATIONS<\/span>/g, '<span style="font-size:0.6rem; letter-spacing:1px; font-weight:400; color:white;">Celebrations & Private Dining</span>');

    if (content !== original) {
        fs.writeFileSync(f, content, 'utf8');
        console.log('Updated', f);
    }
});
