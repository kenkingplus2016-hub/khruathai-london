const fs = require('fs');

function moveModalsToBody(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');

    // Extract all modals using a regex that captures the entire modal div
    // The modals all start with <div id="allergen-modal-idx101" (or banq1) and end with the matching </div>
    // Since we know they end with </div>\n</div> for the modal structure we generated...
    // Let's be precise. Our modal structure:
    // <div id="allergen-modal-..." style="display: none; position: fixed; ...">
    //     <div style="position: relative; ...">
    //         ...
    //         </table></div><p>...</p>
    //     </div>
    // </div>
    // We can use a regex that matches from `<div id="allergen-modal-` to the specific closing structure.
    // Or, a simpler way: just split by `<div id="allergen-modal-`
    
    let modals = [];
    
    // Regex to grab the entire modal block.
    // It starts with <div id="allergen-modal- and ends with the first </div>\s*</div> that closes it.
    // Since we know exactly what's inside, we can match up to the planning sheet text and the two closing divs.
    const modalRegex = /<div id="allergen-modal-[a-z0-9]+" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba\(0,0,0,0\.8\); z-index: 9999; justify-content: center; align-items: center; text-align: left;">[\s\S]*?This is a planning sheet only[^<]*<\/p>\s*<\/div>\s*<\/div>/g;
    
    // Also the Meeting meals modals have a slightly different wrapper:
    const modalRegex2 = /<div id="allergen-modal-[0-9]+" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba\(0,0,0,0\.8\); z-index: 9999; justify-content: center; align-items: center;">[\s\S]*?This is a planning sheet only[^<]*<\/p>\s*<\/div>\s*<\/div>/g;
    
    // We will extract all modals matching either pattern.
    html = html.replace(modalRegex, (match) => {
        modals.push(match);
        return ''; // remove from original location
    });
    
    html = html.replace(modalRegex2, (match) => {
        modals.push(match);
        return ''; // remove from original location
    });

    // If we found modals, append them right before </body>
    if (modals.length > 0) {
        // Find </body>
        const bodyEndIndex = html.lastIndexOf('</body>');
        if (bodyEndIndex !== -1) {
            const modalsHtml = '\n<!-- Extracted Modals for safe fixed positioning -->\n' + modals.join('\n\n') + '\n';
            html = html.substring(0, bodyEndIndex) + modalsHtml + html.substring(bodyEndIndex);
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Moved ${modals.length} modals to end of body in ${filePath}`);
        } else {
            console.log(`Could not find </body> in ${filePath}`);
        }
    } else {
        console.log(`No modals found to move in ${filePath}`);
    }
}

const files = [
    'public/index.html',
    'public/banquets.html',
    'public/event-catering.html',
    'public/meeting-meals.html'
];

files.forEach(moveModalsToBody);
