const fs = require('fs');

const data = [
    {
        title: "Option A: THAI CLASSIC",
        price: 18,
        items: [
            {cat: "STARTER", item: "Chicken Satay"},
            {cat: "SALAD", item: "Crispy Sea Bass Mango Salad"},
            {cat: "CURRY", item: "Thai Green Curry Chicken"},
            {cat: "RICE", item: "Thai Jasmine Rice"},
            {cat: "NOODLES", item: "Pad Thai Chicken / Prawn"},
            {cat: "DESSERT", item: "Mango Sticky Rice"},
            {cat: "BEVERAGE", item: "Premium Coffee & Tea"}
        ],
        pricing: {"20-29": 24, "30-49": 22, "50-79": 20, "80-99": 19, "100+": 18},
        allergens: [
            {a: "PEANUTS; SOYA (recipe dependent).", s: "Peanut-free sauce may be possible; confirm final marinade and sauce."},
            {a: "FISH; possible GLUTEN/SOYA depending on coating and dressing.", s: "Use gluten-free coating/seasoning where suitable; confirm dressing."},
            {a: "FISH; possible CRUSTACEANS/PEANUTS depending on curry paste.", s: "Use an agreed vegetarian/allergen-adjusted curry paste where appropriate."},
            {a: "Usually none of the UK 14 in plain rice.", s: "Prepare separately and verify seasoning/additions."},
            {a: "EGG; PEANUTS; FISH; SOYA; CRUSTACEANS if prawn.", s: "Adjust protein and garnish; verify sauce ingredients."},
            {a: "Possible MILK depending on coconut/dairy products used.", s: "Use verified dairy-free coconut products where required."}
        ]
    },
    {
        title: "Option A1.1: THAI CLASSIC",
        price: 19,
        items: [
            {cat: "STARTER", item: "Moo Ping - Thai Grilled Pork Skewers"},
            {cat: "SALAD", item: "Som Tam Thai"},
            {cat: "CURRY", item: "Massaman Beef"},
            {cat: "RICE", item: "Thai Jasmine Rice"},
            {cat: "NOODLES", item: "Pad See Ew Chicken"},
            {cat: "DESSERT", item: "Mango Sticky Rice"},
            {cat: "BEVERAGE", item: "Premium Coffee & Tea"}
        ],
        pricing: {"20-29": 25, "30-49": 23, "50-79": 21, "80-99": 20, "100+": 19},
        allergens: [
            {a: "SOYA; possible GLUTEN depending on marinade.", s: "Use gluten-free tamari/alternative marinade if suitable."},
            {a: "PEANUTS; FISH; possible CRUSTACEANS if dried shrimp used.", s: "Prepare without peanuts, fish sauce or dried shrimp as agreed."},
            {a: "PEANUTS; possible FISH/CRUSTACEANS depending on curry paste.", s: "Use agreed peanut-free/allergen-adjusted paste where appropriate."},
            {a: "Usually none of the UK 14 in plain rice.", s: "Prepare separately and verify seasoning/additions."},
            {a: "SOYA; GLUTEN commonly present in sauces.", s: "Use verified gluten-free sauces/noodles where suitable."},
            {a: "Possible MILK depending on coconut/dairy products used.", s: "Use verified dairy-free coconut products where required."}
        ]
    },
    {
        title: "Option B: THAI FAVOURITES",
        price: 21,
        items: [
            {cat: "STARTER", item: "Moo Ping - Thai Grilled Pork Skewers"},
            {cat: "SALAD", item: "Spicy Salmon Salad"},
            {cat: "CURRY", item: "Panang Chicken"},
            {cat: "RICE", item: "Thai Jasmine Rice"},
            {cat: "MAIN", item: "Crispy Sea Bass with Chilli Sauce"},
            {cat: "DESSERT", item: "Mango Sticky Rice"},
            {cat: "BEVERAGE", item: "Premium Coffee & Tea"}
        ],
        pricing: {"20-29": 27, "30-49": 25, "50-79": 23, "80-99": 22, "100+": 21},
        allergens: [
            {a: "SOYA; possible GLUTEN depending on marinade.", s: "Use gluten-free tamari/alternative marinade if suitable."},
            {a: "FISH; possible FISH in dressing.", s: "Use alternative protein and adjusted dressing if required."},
            {a: "Possible PEANUTS; FISH; CRUSTACEANS depending on curry paste.", s: "Use agreed allergen-adjusted curry paste where appropriate."},
            {a: "Usually none of the UK 14 in plain rice.", s: "Prepare separately and verify seasoning/additions."},
            {a: "FISH; possible GLUTEN/SOYA.", s: "Use gluten-free coating/sauce where suitable."},
            {a: "Possible MILK depending on coconut/dairy products used.", s: "Use verified dairy-free coconut products where required."}
        ]
    },
    {
        title: "Option B1.1: THAI FAVOURITES",
        price: 23,
        items: [
            {cat: "STARTER", item: "Chicken Satay"},
            {cat: "SALAD", item: "Som Tam Thai"},
            {cat: "CURRY", item: "Massaman Lamb"},
            {cat: "RICE", item: "Thai Jasmine Rice"},
            {cat: "MAIN", item: "Grilled Beef 'Crying Tiger' (Suea Rong Hai)"},
            {cat: "DESSERT", item: "Mango Sticky Rice"},
            {cat: "BEVERAGE", item: "Premium Coffee & Tea"}
        ],
        pricing: {"20-29": 29, "30-49": 27, "50-79": 25, "80-99": 24, "100+": 23},
        allergens: [
            {a: "PEANUTS; SOYA (recipe dependent).", s: "Peanut-free sauce may be possible; confirm final marinade and sauce."},
            {a: "PEANUTS; FISH; possible CRUSTACEANS if dried shrimp used.", s: "Prepare without peanuts, fish sauce or dried shrimp as agreed."},
            {a: "PEANUTS; possible FISH/CRUSTACEANS depending on curry paste.", s: "Use agreed peanut-free/allergen-adjusted paste where appropriate."},
            {a: "Usually none of the UK 14 in plain rice.", s: "Prepare separately and verify seasoning/additions."},
            {a: "Possible SOYA/FISH in marinade or dipping sauce.", s: "Prepare with adjusted marinade/dipping sauce as agreed."},
            {a: "Possible MILK depending on coconut/dairy products used.", s: "Use verified dairy-free coconut products where required."}
        ]
    },
    {
        title: "Option C: PREMIUM THAI",
        price: 25,
        items: [
            {cat: "STARTER", item: "Chicken Satay"},
            {cat: "SALAD", item: "Pla Lui Suan - Crispy Sea Bass with Thai Herbs"},
            {cat: "CURRY", item: "Roasted Duck Red Curry"},
            {cat: "RICE", item: "Thai Jasmine Rice"},
            {cat: "STIR-FRY", item: "Stir-Fried Beef with Chilli & Thai Basil"},
            {cat: "DESSERT", item: "Mango Sticky Rice"},
            {cat: "BEVERAGE", item: "Premium Coffee & Tea"}
        ],
        pricing: {"20-29": 31, "30-49": 29, "50-79": 27, "80-99": 26, "100+": 25},
        allergens: [
            {a: "PEANUTS; SOYA (recipe dependent).", s: "Peanut-free sauce may be possible; confirm final marinade and sauce."},
            {a: "FISH; possible GLUTEN/SOYA/FISH in dressing.", s: "Use non-battered fish and adjusted dressing where suitable."},
            {a: "Possible FISH/CRUSTACEANS depending on curry paste.", s: "Use agreed allergen-adjusted curry paste where appropriate."},
            {a: "Usually none of the UK 14 in plain rice.", s: "Prepare separately and verify seasoning/additions."},
            {a: "SOYA; possible GLUTEN/MOLLUSCS depending on sauces.", s: "Use verified alternative sauces where suitable."},
            {a: "Possible MILK depending on coconut/dairy products used.", s: "Use verified dairy-free coconut products where required."}
        ]
    },
    {
        title: "Option C1.1: PREMIUM THAI",
        price: 26,
        items: [
            {cat: "STARTER", item: "Grilled Pork Neck (Kor Moo Yang)"},
            {cat: "SALAD", item: "Spicy Salmon Salad"},
            {cat: "CURRY", item: "Massaman Beef"},
            {cat: "RICE", item: "Thai Jasmine Rice"},
            {cat: "NOODLES", item: "Pad See Ew King Prawn"},
            {cat: "VEGETABLE", item: "Stir-Fried Seasonal Vegetables with Garlic"},
            {cat: "DESSERT", item: "Mango Sticky Rice"},
            {cat: "BEVERAGE", item: "Premium Coffee & Tea"}
        ],
        pricing: {"20-29": 32, "30-49": 30, "50-79": 28, "80-99": 27, "100+": 26},
        allergens: [
            {a: "Possible SOYA/GLUTEN/FISH depending on marinade/dip.", s: "Use adjusted marinade/dipping sauce as agreed."},
            {a: "FISH; possible FISH in dressing.", s: "Use alternative protein and adjusted dressing if required."},
            {a: "PEANUTS; possible FISH/CRUSTACEANS depending on curry paste.", s: "Use agreed peanut-free/allergen-adjusted paste where appropriate."},
            {a: "Usually none of the UK 14 in plain rice.", s: "Prepare separately and verify seasoning/additions."},
            {a: "CRUSTACEANS; SOYA; GLUTEN commonly present in sauces.", s: "Swap protein and use verified gluten-free sauces where suitable."},
            {a: "Possible SOYA/GLUTEN/MOLLUSCS depending on sauces.", s: "Prepare with garlic, vegetable oil and salt if required."},
            {a: "Possible MILK depending on coconut/dairy products used.", s: "Use verified dairy-free coconut products where required."}
        ]
    },
    {
        title: "Option D: ZAB SIAM SIGNATURE",
        price: 28,
        items: [
            {cat: "STARTER", item: "Moo Ping - Thai Grilled Pork Skewers"},
            {cat: "SALAD", item: "Spicy Zabb Chicken Salad - with Pistachio Nut Kernels"},
            {cat: "CURRY", item: "Panang Beef"},
            {cat: "RICE", item: "Thai Jasmine Rice"},
            {cat: "MAIN", item: "Crispy Sea Bass with Chilli Sauce"},
            {cat: "NOODLES", item: "Pad Thai King Prawn"},
            {cat: "DESSERT", item: "Mango Sticky Rice"},
            {cat: "BEVERAGE", item: "Premium Coffee & Tea"}
        ],
        pricing: {"20-29": 34, "30-49": 32, "50-79": 30, "80-99": 29, "100+": 28},
        allergens: [
            {a: "SOYA; possible GLUTEN depending on marinade.", s: "Use gluten-free tamari/alternative marinade if suitable."},
            {a: "NUTS (PISTACHIO); possible SOYA/GLUTEN depending on seasoning.", s: "Omit pistachio and adjust seasoning only after confirming requirements."},
            {a: "Possible PEANUTS; FISH; CRUSTACEANS depending on curry paste.", s: "Use agreed allergen-adjusted curry paste where appropriate."},
            {a: "Usually none of the UK 14 in plain rice.", s: "Prepare separately and verify seasoning/additions."},
            {a: "FISH; possible GLUTEN/SOYA.", s: "Use gluten-free coating/sauce where suitable."},
            {a: "CRUSTACEANS; EGG; PEANUTS; FISH; SOYA.", s: "Adjust protein/garnish and verify sauce ingredients."},
            {a: "Possible MILK depending on coconut/dairy products used.", s: "Use verified dairy-free coconut products where required."}
        ]
    },
    {
        title: "Option D1.1: ZAB SIAM SIGNATURE",
        price: 30,
        items: [
            {cat: "STARTER", item: "Grilled Pork Neck (Kor Moo Yang)"},
            {cat: "SALAD", item: "Som Tam Thai"},
            {cat: "CURRY", item: "Massaman Lamb"},
            {cat: "RICE", item: "Thai Jasmine Rice"},
            {cat: "MAIN", item: "Grilled Beef 'Crying Tiger' (Suea Rong Hai)"},
            {cat: "VEGETABLE", item: "Stir-Fried Mixed Vegetables with Garlic & Soy"},
            {cat: "NOODLES", item: "Pad See Ew Chicken / Beef"},
            {cat: "DESSERT", item: "Mango Sticky Rice"},
            {cat: "BEVERAGE", item: "Premium Coffee & Tea"}
        ],
        pricing: {"20-29": 36, "30-49": 34, "50-79": 32, "80-99": 31, "100+": 30},
        allergens: [
            {a: "Possible SOYA/GLUTEN/FISH depending on marinade/dip.", s: "Use adjusted marinade/dipping sauce as agreed."},
            {a: "PEANUTS; FISH; possible CRUSTACEANS if dried shrimp used.", s: "Prepare without peanuts, fish sauce or dried shrimp as agreed."},
            {a: "PEANUTS; possible FISH/CRUSTACEANS depending on curry paste.", s: "Use agreed peanut-free/allergen-adjusted paste where appropriate."},
            {a: "Usually none of the UK 14 in plain rice.", s: "Prepare separately and verify seasoning/additions."},
            {a: "Possible SOYA/FISH in marinade or dipping sauce.", s: "Prepare with adjusted marinade/dipping sauce as agreed."},
            {a: "SOYA; possible GLUTEN.", s: "Use gluten-free tamari or prepare with garlic, oil and salt."},
            {a: "SOYA; GLUTEN commonly present in sauces.", s: "Use verified gluten-free sauces/noodles where suitable."},
            {a: "Possible MILK depending on coconut/dairy products used.", s: "Use verified dairy-free coconut products where required."}
        ]
    }
];

let html_cards = '';

data.forEach((opt, idx) => {
    html_cards += `
    <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: left; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column;">
        <h3 style="color: var(--color-white); font-size: 1.3rem; line-height: 1.4; text-align: center;">${opt.title}</h3>
        <p style="color: var(--color-gold); font-size: 1.2rem; font-weight: bold; text-align: center; margin-top: 10px;">From &pound;${opt.price} per Guest</p>
        
        <div style="margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; flex-grow: 1;">
            <p style="color: var(--color-gold); font-size: 0.9rem; margin-bottom: 8px; font-weight: bold;">Set Menu:</p>
            <ul style="color: #ddd; font-size: 0.85rem; line-height: 1.6; margin: 0; padding-left: 20px;">
`;
    opt.items.forEach(item => {
        html_cards += `                <li><strong>${item.cat}:</strong> ${item.item}</li>\n`;
    });
    
    html_cards += `            </ul>
        </div>
        
        <div style="margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px;">
            <p style="color: var(--color-gold); font-size: 0.9rem; margin-bottom: 8px; font-weight: bold;">Pricing (Per Person):</p>
            <table style="width: 100%; color: #ccc; font-size: 0.85rem; text-align: left; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.3);"><th style="padding: 4px;">Guests</th><th style="padding: 4px; text-align: right;">Price</th></tr>
`;
    for(let k in opt.pricing) {
        html_cards += `                <tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1);"><td style="padding: 4px;">${k}</td><td style="padding: 4px; text-align: right;">&pound;${opt.pricing[k]}</td></tr>\n`;
    }
        
    html_cards += `            </table>
        </div>
        
        <div style="margin-top: 15px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 15px; text-align: center;">
            <div style="display: flex; gap: 10px; flex-direction: column;">
                <button onclick="document.getElementById('allergen-modal-${idx}').style.display='flex'" class="add-to-cart-btn" style="text-align: center; padding: 10px; font-size: 0.9rem; background-color: transparent; border: 1px solid var(--color-gold); color: var(--color-gold); font-weight: bold; border-radius: 4px; cursor: pointer;">View Allergens</button>
                <a href="mailto:info@zabsiam.co.uk?subject=Booking%20Inquiry:%20${encodeURIComponent(opt.title)}" class="add-to-cart-btn" style="text-align: center; padding: 10px; font-size: 0.9rem; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire / Book</a>
            </div>
        </div>
    </div>
    
    <!-- Allergen Modal for Option ${idx} -->
    <div id="allergen-modal-${idx}" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; justify-content: center; align-items: center;">
        <div style="position: relative; background: #111; max-width: 800px; width: 90%; max-height: 90vh; overflow-y: auto; padding: 30px; border: 1px solid var(--color-gold); border-radius: 8px;">
            <button onclick="document.getElementById('allergen-modal-${idx}').style.display='none'" style="position: absolute; right: 15px; top: 15px; background: transparent; border: none; color: var(--color-gold); font-size: 2rem; cursor: pointer;">&times;</button>
            <h3 style="color: var(--color-gold); font-size: 1.5rem; margin-bottom: 20px; padding-right: 30px;">${opt.title}<br/><span style="font-size:1rem; color:#fff;">Allergens & Substitutions</span></h3>
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
`;
    opt.allergens.forEach((a, i) => {
        html_cards += `                        <tr style="border-bottom: 1px solid rgba(255,215,0,0.2);">
                            <td style="padding: 10px; vertical-align: top;">0${i+1}</td>
                            <td style="padding: 10px; vertical-align: top;">${a.a}</td>
                            <td style="padding: 10px; vertical-align: top;">${a.s}</td>
                        </tr>\n`;
    });
    html_cards += `                    </tbody>
                </table>
            </div>
            <p style="color: #888; font-size: 0.8rem; margin-top: 15px;">UK 14 allergens: celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, nuts, peanuts, sesame, soya and sulphur dioxide/sulphites. This is a planning sheet only; final allergen information must be verified from the actual recipe, supplier labels and kitchen controls before service.</p>
        </div>
    </div>\n`;
});

let content = fs.readFileSync('public/meeting-meals.html', 'utf8');

const regex = /<div class="event-card-grid"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

const replacement = `<div class="event-card-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
${html_cards}
            </div>
        </div>
    </section>`;

content = content.replace(regex, replacement);

fs.writeFileSync('public/meeting-meals.html', content);
console.log('Update completed');
