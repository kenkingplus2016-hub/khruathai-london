const fs = require('fs');

let html = fs.readFileSync('public/banquets.html', 'utf8');

// We will find all Enquire buttons and insert the View Allergens button + modal before it.
// We need an index to uniquely ID the modals.
let i = 0;

html = html.replace(/(<a href="mailto:info@zabsiam\.co\.uk\?subject=Customize:[^>]*>Enquire to Customize Menu<br><\/a>)/g, (match) => {
    i++;
    const btn = `<button onclick="document.getElementById('allergen-modal-banq${i}').style.display='flex'" class="add-to-cart-btn" style="text-align: center; display: block; margin-top: 10px; margin-bottom: 10px; line-height: 1.4; background-color: transparent; border: 1px solid var(--color-gold); color: var(--color-gold);">View Allergens</button>`;
    
    const modal = `
<div id="allergen-modal-banq${i}" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; justify-content: center; align-items: center; text-align: left;">
    <div style="position: relative; background: #111; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 30px; border: 1px solid var(--color-gold); border-radius: 8px;">
        <button onclick="document.getElementById('allergen-modal-banq${i}').style.display='none'" style="position: absolute; right: 15px; top: 15px; background: transparent; border: none; color: var(--color-gold); font-size: 2rem; cursor: pointer;">&times;</button>
        <h3 style="color: var(--color-gold); font-size: 1.5rem; margin-bottom: 20px; padding-right: 30px;">Signature Thai Banquets<br/><span style="font-size:1rem; color:#fff;">Allergens & Substitutions</span></h3>
        <p style="color: #ddd; font-size: 0.95rem; line-height: 1.6;">As our banquets are highly customizable, allergen information is finalized upon confirming your menu selections.</p>
        <p style="color: #ddd; font-size: 0.95rem; line-height: 1.6;"><strong>Common Allergens in this menu typically include:</strong> Peanuts, Fish, Crustaceans, Soya, and Gluten.</p>
        <p style="color: #888; font-size: 0.8rem; margin-top: 15px;">UK 14 allergens: celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, nuts, peanuts, sesame, soya and sulphur dioxide/sulphites. Please advise us in advance of any dietary requirements.</p>
    </div>
</div>`;

    return btn + '\n' + modal + '\n' + match;
});

fs.writeFileSync('public/banquets.html', html, 'utf8');
console.log(`Updated ${i} banquet entries with View Allergens.`);
