const fs = require('fs');

function combineCurryAndRice(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Regex to match CURRY and RICE lines
    // <li><strong>CURRY:</strong> Some Curry Name</li>
    // <li><strong>RICE:</strong> Thai Jasmine Rice</li>
    const regex = /<li><strong>CURRY:<\/strong>\s*(.*?)<\/li>[\s\n\r]*<li><strong>RICE:<\/strong>\s*(.*?)<\/li>/g;
    
    html = html.replace(regex, (match, curry, rice) => {
        return `<li><strong>CURRY &amp; RICE:</strong> ${curry} with ${rice}</li>`;
    });
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated ${filePath}`);
}

combineCurryAndRice('public/event-catering.html');
combineCurryAndRice('public/meeting-meals.html');
