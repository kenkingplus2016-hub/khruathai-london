const fs = require('fs');

const tableHtml = `
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; color: #ddd; font-size: 0.9rem; text-align: left;">
                    <thead>
                        <tr style="background: rgba(255, 215, 0, 0.1); border-bottom: 2px solid var(--color-gold);">
                            <th style="padding: 10px;">#</th>
                            <th style="padding: 10px;">POSSIBLE ALLERGENS</th>
                            <th style="padding: 10px;">POSSIBLE SUBSTITUTION</th>
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
                    </tbody>
                </table>
            </div>
            <p style="color: #888; font-size: 0.8rem; margin-top: 15px;">UK 14 allergens: celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, nuts, peanuts, sesame, soya and sulphur dioxide/sulphites. This is a planning sheet only; final allergen information must be verified from the actual recipe, supplier labels and kitchen controls before service.</p>
`;

function replaceModalTextWithTable(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // We want to replace the two <p> lines in the modals that start with "As our banquets are highly customizable"
    // and "Common Allergens in this menu typically include" with the tableHtml.
    // Also remove the old <p> about UK 14 allergens since it's included in tableHtml.
    
    const regex = /<p style="color: #ddd; font-size: 0\.95rem; line-height: 1\.6;">As our banquets are highly customizable[^<]*<\/p>\s*<p style="color: #ddd; font-size: 0\.95rem; line-height: 1\.6;"><strong>Common Allergens in this menu typically include:[^<]*<\/p>\s*<p style="color: #888; font-size: 0\.8rem; margin-top: 15px;">UK 14 allergens:[^<]*<\/p>/g;

    html = html.replace(regex, tableHtml.trim());
    
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated modals in ${filePath}`);
}

replaceModalTextWithTable('public/banquets.html');
replaceModalTextWithTable('public/index.html');
