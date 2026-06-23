const fs = require('fs');
const path = require('path');

const gaCode = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-B32XK3RT5X"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-B32XK3RT5X');
    </script>
`;

const dir = path.join(__dirname, 'public');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it already has the tag
    if (!content.includes('G-B32XK3RT5X')) {
        content = content.replace('</head>', gaCode + '</head>');
        fs.writeFileSync(filePath, content);
        console.log('Added to ' + file);
    }
});
