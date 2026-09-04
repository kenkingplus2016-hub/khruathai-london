const fs = require('fs');

// 1. Fix Banquets & Index (Add Row 06)
const tableHtml = `
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; color: #ddd; font-size: 0.9rem; text-align: left;">
                    <thead>
                        <tr style="background: rgba(255, 215, 0, 0.1); border-bottom: 2px solid var(--color-gold);">
                            <th style="padding: 10px;">#</th>
                            <th style="padding: 10px;">Possible Allergens</th>
                            <th style="padding: 10px;">Possible Substitution</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid rgba(255,215,0,0.2);">
                            <td style="padding: 10px; vertical-align: top;">01</td>
                            <td style="padding: 10px; vertical-align: top;">PEANUTS; SOYA (recipe dependent).</td>
                            <td style="padding: 10px; vertical-align: top;">Peanut-free sauce may be possible; confirm final marinade and sauce.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,215,0,0.2);">
                            <td style="padding: 10px; vertical-align: top;">02</td>
                            <td style="padding: 10px; vertical-align: top;">FISH; possible GLUTEN/SOYA depending on coating and dressing.</td>
                            <td style="padding: 10px; vertical-align: top;">Use gluten-free coating/seasoning where suitable; confirm dressing.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,215,0,0.2);">
                            <td style="padding: 10px; vertical-align: top;">03</td>
                            <td style="padding: 10px; vertical-align: top;">FISH; possible CRUSTACEANS/PEANUTS depending on curry paste.</td>
                            <td style="padding: 10px; vertical-align: top;">Use an agreed vegetarian/allergen-adjusted curry paste where appropriate.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,215,0,0.2);">
                            <td style="padding: 10px; vertical-align: top;">04</td>
                            <td style="padding: 10px; vertical-align: top;">Usually none of the UK 14 in plain rice.</td>
                            <td style="padding: 10px; vertical-align: top;">Prepare separately and verify seasoning/additions.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,215,0,0.2);">
                            <td style="padding: 10px; vertical-align: top;">05</td>
                            <td style="padding: 10px; vertical-align: top;">EGG; PEANUTS; FISH; SOYA; CRUSTACEANS if prawn.</td>
                            <td style="padding: 10px; vertical-align: top;">Adjust protein and garnish; verify sauce ingredients.</td>
                        </tr>
                        <tr style="border-bottom: 1px solid rgba(255,215,0,0.2);">
                            <td style="padding: 10px; vertical-align: top;">06</td>
                            <td style="padding: 10px; vertical-align: top;">SESAME (roasted sesame garnish on dessert); possible MILK depending on coconut/dairy products used.</td>
                            <td style="padding: 10px; vertical-align: top;">Omit sesame garnish; use verified dairy-free coconut products where required.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p style="color: #888; font-size: 0.8rem; margin-top: 15px;">UK 14 allergens: celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, nuts, peanuts, sesame, soya and sulphur dioxide/sulphites. This is a planning sheet only; final allergen information must be verified from the actual recipe, supplier labels and kitchen controls before service.</p>
`;

function replaceModalTextWithTable(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // For banquets/index, I previously replaced it with a 5-row table.
    // I need to replace that 5-row table with the 6-row table.
    // The easiest way is to match from `<div style="overflow-x: auto;">` to the end of the planning sheet `<p>`
    
    const regex = /<div style="overflow-x: auto;">[\s\S]*?This is a planning sheet only; final allergen information must be verified from the actual recipe, supplier labels and kitchen controls before service\.<\/p>/g;

    html = html.replace(regex, tableHtml.trim());
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated tables in ${filePath}`);
}

replaceModalTextWithTable('public/banquets.html');
replaceModalTextWithTable('public/index.html');

// 2. Fix Event Catering & Meeting Meals (Update existing Row 06)
const filesToUpdate = [
    'public/event-catering.html',
    'public/meeting-meals.html'
];

filesToUpdate.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    
    const targetSearch = /<td[^>]*>Possible MILK depending on coconut\/dairy products used\.<\/td>\s*<td[^>]*>Use verified dairy-free coconut products where required\.<\/td>/g;
    
    const replacement = `<td style="padding: 10px; vertical-align: top;">SESAME (roasted sesame garnish on dessert); possible MILK depending on coconut/dairy products used.</td>
                            <td style="padding: 10px; vertical-align: top;">Omit sesame garnish; use verified dairy-free coconut products where required.</td>`;
    
    if (targetSearch.test(html)) {
        html = html.replace(targetSearch, replacement);
        fs.writeFileSync(file, html, 'utf8');
        console.log(`Added SESAME to ${file}`);
    } else {
        console.log(`Could not find MILK target in ${file}`);
    }
});
