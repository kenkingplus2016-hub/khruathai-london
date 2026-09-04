import json
import os

data = [
    {
        "title": "Option A: THAI CLASSIC",
        "price_from": 16,
        "items": [
            ("STARTER", "Chicken Satay"),
            ("SALAD", "Crispy Sea Bass Mango Salad"),
            ("CURRY", "Thai Green Curry Chicken"),
            ("RICE", "Thai Jasmine Rice"),
            ("NOODLES", "Pad Thai Chicken / Prawn"),
            ("DESSERT", "Mango Sticky Rice")
        ],
        "pricing": {"20-29": 22, "30-49": 20, "50-79": 18, "80-99": 17, "100+": 16},
        "allergens": [
            ("PEANUTS; SOYA (recipe dependent).", "Peanut-free sauce may be possible; confirm final marinade and sauce."),
            ("FISH; possible GLUTEN/SOYA depending on coating and dressing.", "Use gluten-free coating/seasoning where suitable; confirm dressing."),
            ("FISH; possible CRUSTACEANS/PEANUTS depending on curry paste.", "Use an agreed vegetarian/allergen-adjusted curry paste where appropriate."),
            ("Usually none of the UK 14 in plain rice.", "Prepare separately and verify seasoning/additions."),
            ("EGG; PEANUTS; FISH; SOYA; CRUSTACEANS if prawn.", "Adjust protein and garnish; verify sauce ingredients."),
            ("Possible MILK depending on coconut/dairy products used.", "Use verified dairy-free coconut products where required.")
        ]
    },
    {
        "title": "Option A1.1: THAI CLASSIC",
        "price_from": 17,
        "items": [
            ("STARTER", "Moo Ping - Thai Grilled Pork Skewers"),
            ("SALAD", "Som Tam Thai"),
            ("CURRY", "Massaman Beef"),
            ("RICE", "Thai Jasmine Rice"),
            ("NOODLES", "Pad See Ew Chicken"),
            ("DESSERT", "Mango Sticky Rice")
        ],
        "pricing": {"20-29": 23, "30-49": 21, "50-79": 19, "80-99": 18, "100+": 17},
        "allergens": [
            ("SOYA; possible GLUTEN depending on marinade.", "Use gluten-free tamari/alternative marinade if suitable."),
            ("PEANUTS; FISH; possible CRUSTACEANS if dried shrimp used.", "Prepare without peanuts, fish sauce or dried shrimp as agreed."),
            ("PEANUTS; possible FISH/CRUSTACEANS depending on curry paste.", "Use agreed peanut-free/allergen-adjusted paste where appropriate."),
            ("Usually none of the UK 14 in plain rice.", "Prepare separately and verify seasoning/additions."),
            ("SOYA; GLUTEN commonly present in sauces.", "Use verified gluten-free sauces/noodles where suitable."),
            ("Possible MILK depending on coconut/dairy products used.", "Use verified dairy-free coconut products where required.")
        ]
    },
    {
        "title": "Option B: THAI FAVOURITES",
        "price_from": 19,
        "items": [
            ("STARTER", "Moo Ping - Thai Grilled Pork Skewers"),
            ("SALAD", "Spicy Salmon Salad"),
            ("CURRY", "Panang Chicken"),
            ("RICE", "Thai Jasmine Rice"),
            ("MAIN", "Crispy Sea Bass with Chilli Sauce"),
            ("DESSERT", "Mango Sticky Rice")
        ],
        "pricing": {"20-29": 25, "30-49": 23, "50-79": 21, "80-99": 20, "100+": 19},
        "allergens": [
            ("SOYA; possible GLUTEN depending on marinade.", "Use gluten-free tamari/alternative marinade if suitable."),
            ("FISH; possible FISH in dressing.", "Use alternative protein and adjusted dressing if required."),
            ("Possible PEANUTS; FISH; CRUSTACEANS depending on curry paste.", "Use agreed allergen-adjusted curry paste where appropriate."),
            ("Usually none of the UK 14 in plain rice.", "Prepare separately and verify seasoning/additions."),
            ("FISH; possible GLUTEN/SOYA.", "Use gluten-free coating/sauce where suitable."),
            ("Possible MILK depending on coconut/dairy products used.", "Use verified dairy-free coconut products where required.")
        ]
    },
    {
        "title": "Option B1.1: THAI FAVOURITES",
        "price_from": 21,
        "items": [
            ("STARTER", "Chicken Satay"),
            ("SALAD", "Som Tam Thai"),
            ("CURRY", "Massaman Lamb"),
            ("RICE", "Thai Jasmine Rice"),
            ("MAIN", "Grilled Beef 'Crying Tiger' (Suea Rong Hai)"),
            ("DESSERT", "Mango Sticky Rice")
        ],
        "pricing": {"20-29": 27, "30-49": 25, "50-79": 23, "80-99": 22, "100+": 21},
        "allergens": [
            ("PEANUTS; SOYA (recipe dependent).", "Peanut-free sauce may be possible; confirm final marinade and sauce."),
            ("PEANUTS; FISH; possible CRUSTACEANS if dried shrimp used.", "Prepare without peanuts, fish sauce or dried shrimp as agreed."),
            ("PEANUTS; possible FISH/CRUSTACEANS depending on curry paste.", "Use agreed peanut-free/allergen-adjusted paste where appropriate."),
            ("Usually none of the UK 14 in plain rice.", "Prepare separately and verify seasoning/additions."),
            ("Possible SOYA/FISH in marinade or dipping sauce.", "Prepare with adjusted marinade/dipping sauce as agreed."),
            ("Possible MILK depending on coconut/dairy products used.", "Use verified dairy-free coconut products where required.")
        ]
    },
    {
        "title": "Option C: PREMIUM THAI",
        "price_from": 23,
        "items": [
            ("STARTER", "Chicken Satay"),
            ("SALAD", "Pla Lui Suan - Crispy Sea Bass with Thai Herbs"),
            ("CURRY", "Roasted Duck Red Curry"),
            ("RICE", "Thai Jasmine Rice"),
            ("STIR-FRY", "Stir-Fried Beef with Chilli & Thai Basil"),
            ("DESSERT", "Mango Sticky Rice")
        ],
        "pricing": {"20-29": 29, "30-49": 27, "50-79": 25, "80-99": 24, "100+": 23},
        "allergens": [
            ("PEANUTS; SOYA (recipe dependent).", "Peanut-free sauce may be possible; confirm final marinade and sauce."),
            ("FISH; possible GLUTEN/SOYA/FISH in dressing.", "Use non-battered fish and adjusted dressing where suitable."),
            ("Possible FISH/CRUSTACEANS depending on curry paste.", "Use agreed allergen-adjusted curry paste where appropriate."),
            ("Usually none of the UK 14 in plain rice.", "Prepare separately and verify seasoning/additions."),
            ("SOYA; possible GLUTEN/MOLLUSCS depending on sauces.", "Use verified alternative sauces where suitable."),
            ("Possible MILK depending on coconut/dairy products used.", "Use verified dairy-free coconut products where required.")
        ]
    },
    {
        "title": "Option C1.1: PREMIUM THAI",
        "price_from": 24,
        "items": [
            ("STARTER", "Grilled Pork Neck (Kor Moo Yang)"),
            ("SALAD", "Spicy Salmon Salad"),
            ("CURRY", "Massaman Beef"),
            ("RICE", "Thai Jasmine Rice"),
            ("NOODLES", "Pad See Ew King Prawn"),
            ("VEGETABLE", "Stir-Fried Seasonal Vegetables with Garlic"),
            ("DESSERT", "Mango Sticky Rice")
        ],
        "pricing": {"20-29": 30, "30-49": 28, "50-79": 26, "80-99": 25, "100+": 24},
        "allergens": [
            ("Possible SOYA/GLUTEN/FISH depending on marinade/dip.", "Use adjusted marinade/dipping sauce as agreed."),
            ("FISH; possible FISH in dressing.", "Use alternative protein and adjusted dressing if required."),
            ("PEANUTS; possible FISH/CRUSTACEANS depending on curry paste.", "Use agreed peanut-free/allergen-adjusted paste where appropriate."),
            ("Usually none of the UK 14 in plain rice.", "Prepare separately and verify seasoning/additions."),
            ("CRUSTACEANS; SOYA; GLUTEN commonly present in sauces.", "Swap protein and use verified gluten-free sauces where suitable."),
            ("Possible SOYA/GLUTEN/MOLLUSCS depending on sauces.", "Prepare with garlic, vegetable oil and salt if required."),
            ("Possible MILK depending on coconut/dairy products used.", "Use verified dairy-free coconut products where required.")
        ]
    },
    {
        "title": "Option D: ZAB SIAM SIGNATURE",
        "price_from": 26,
        "items": [
            ("STARTER", "Moo Ping - Thai Grilled Pork Skewers"),
            ("SALAD", "Spicy Zabb Chicken Salad - with Pistachio Nut Kernels"),
            ("CURRY", "Panang Beef"),
            ("RICE", "Thai Jasmine Rice"),
            ("MAIN", "Crispy Sea Bass with Chilli Sauce"),
            ("NOODLES", "Pad Thai King Prawn"),
            ("DESSERT", "Mango Sticky Rice")
        ],
        "pricing": {"20-29": 32, "30-49": 30, "50-79": 28, "80-99": 27, "100+": 26},
        "allergens": [
            ("SOYA; possible GLUTEN depending on marinade.", "Use gluten-free tamari/alternative marinade if suitable."),
            ("NUTS (PISTACHIO); possible SOYA/GLUTEN depending on seasoning.", "Omit pistachio and adjust seasoning only after confirming requirements."),
            ("Possible PEANUTS; FISH; CRUSTACEANS depending on curry paste.", "Use agreed allergen-adjusted curry paste where appropriate."),
            ("Usually none of the UK 14 in plain rice.", "Prepare separately and verify seasoning/additions."),
            ("FISH; possible GLUTEN/SOYA.", "Use gluten-free coating/sauce where suitable."),
            ("CRUSTACEANS; EGG; PEANUTS; FISH; SOYA.", "Adjust protein/garnish and verify sauce ingredients."),
            ("Possible MILK depending on coconut/dairy products used.", "Use verified dairy-free coconut products where required.")
        ]
    },
    {
        "title": "Option D1.1: ZAB SIAM SIGNATURE",
        "price_from": 28,
        "items": [
            ("STARTER", "Grilled Pork Neck (Kor Moo Yang)"),
            ("SALAD", "Som Tam Thai"),
            ("CURRY", "Massaman Lamb"),
            ("RICE", "Thai Jasmine Rice"),
            ("MAIN", "Grilled Beef 'Crying Tiger' (Suea Rong Hai)"),
            ("VEGETABLE", "Stir-Fried Mixed Vegetables with Garlic & Soy"),
            ("NOODLES", "Pad See Ew Chicken / Beef"),
            ("DESSERT", "Mango Sticky Rice")
        ],
        "pricing": {"20-29": 34, "30-49": 32, "50-79": 30, "80-99": 29, "100+": 28},
        "allergens": [
            ("Possible SOYA/GLUTEN/FISH depending on marinade/dip.", "Use adjusted marinade/dipping sauce as agreed."),
            ("PEANUTS; FISH; possible CRUSTACEANS if dried shrimp used.", "Prepare without peanuts, fish sauce or dried shrimp as agreed."),
            ("PEANUTS; possible FISH/CRUSTACEANS depending on curry paste.", "Use agreed peanut-free/allergen-adjusted paste where appropriate."),
            ("Usually none of the UK 14 in plain rice.", "Prepare separately and verify seasoning/additions."),
            ("Possible SOYA/FISH in marinade or dipping sauce.", "Prepare with adjusted marinade/dipping sauce as agreed."),
            ("SOYA; possible GLUTEN.", "Use gluten-free tamari or prepare with garlic, oil and salt."),
            ("SOYA; GLUTEN commonly present in sauces.", "Use verified gluten-free sauces/noodles where suitable."),
            ("Possible MILK depending on coconut/dairy products used.", "Use verified dairy-free coconut products where required.")
        ]
    }
]

html_cards = []

for idx, opt in enumerate(data):
    card = f'''
    <!-- Option {idx} -->
    <div class="event-card" style="background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 2rem 1.5rem; text-align: left; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05); transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column;">
        <h3 style="color: var(--color-white); font-size: 1.3rem; line-height: 1.4; text-align: center;">{opt['title']}</h3>
        <p style="color: var(--color-gold); font-size: 1.2rem; font-weight: bold; text-align: center; margin-top: 10px;">From &pound;{opt['price_from']} per Guest</p>
        
        <div style="margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px; flex-grow: 1;">
            <p style="color: var(--color-gold); font-size: 0.9rem; margin-bottom: 8px; font-weight: bold;">Set Menu:</p>
            <ul style="color: #ddd; font-size: 0.85rem; line-height: 1.6; margin: 0; padding-left: 20px;">
'''
    for cat, item in opt['items']:
        card += f'                <li><strong>{cat}:</strong> {item}</li>\n'
    
    card += f'''            </ul>
        </div>
        
        <div style="margin-top: 15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 5px;">
            <p style="color: var(--color-gold); font-size: 0.9rem; margin-bottom: 8px; font-weight: bold;">Pricing (Per Person):</p>
            <table style="width: 100%; color: #ccc; font-size: 0.85rem; text-align: left; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.3);"><th style="padding: 4px;">Guests</th><th style="padding: 4px;">Price</th></tr>
'''
    for k, v in opt['pricing'].items():
        card += f'                <tr style="border-bottom: 1px solid rgba(255, 215, 0, 0.1);"><td style="padding: 4px;">{k}</td><td style="padding: 4px;">&pound;{v}</td></tr>\n'
        
    card += f'''            </table>
        </div>
        
        <div style="margin-top: 15px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 15px; text-align: center;">
            <div style="display: flex; gap: 10px; flex-direction: column;">
                <button onclick="document.getElementById('allergen-modal-{idx}').style.display='block'" class="add-to-cart-btn" style="text-align: center; padding: 10px; font-size: 0.9rem; background-color: transparent; border: 1px solid var(--color-gold); color: var(--color-gold); font-weight: bold; border-radius: 4px; cursor: pointer;">View Allergens & Subs</button>
                <a href="mailto:info@zabsiam.co.uk?subject=Booking%20Inquiry:%20{opt['title'].replace(' ', '%20')}" class="add-to-cart-btn" style="text-align: center; padding: 10px; font-size: 0.9rem; background-color: var(--color-gold); color: var(--color-black); font-weight: bold; text-decoration: none; border-radius: 4px;">Enquire / Book</a>
            </div>
        </div>
    </div>
    
    <!-- Allergen Modal for Option {idx} -->
    <div id="allergen-modal-{idx}" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; overflow-y: auto;">
        <div style="position: relative; background: #111; max-width: 800px; margin: 50px auto; padding: 20px; border: 1px solid var(--color-gold); border-radius: 8px;">
            <button onclick="document.getElementById('allergen-modal-{idx}').style.display='none'" style="position: absolute; right: 20px; top: 20px; background: transparent; border: none; color: var(--color-gold); font-size: 1.5rem; cursor: pointer;">&times;</button>
            <h3 style="color: var(--color-gold); font-size: 1.5rem; margin-bottom: 20px; padding-right: 30px;">{opt['title']} - Allergens & Substitutions</h3>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; color: #ddd; font-size: 0.9rem;">
                    <thead>
                        <tr style="background: rgba(255, 215, 0, 0.1); border-bottom: 2px solid var(--color-gold);">
                            <th style="padding: 10px; text-align: left;">#</th>
                            <th style="padding: 10px; text-align: left;">Possible Allergens</th>
                            <th style="padding: 10px; text-align: left;">Possible Substitution</th>
                        </tr>
                    </thead>
                    <tbody>
'''
    for i, (allergen, sub) in enumerate(opt['allergens']):
        card += f'''                        <tr style="border-bottom: 1px solid rgba(255,215,0,0.2);">
                            <td style="padding: 10px; vertical-align: top;">0{i+1}</td>
                            <td style="padding: 10px; vertical-align: top;">{allergen}</td>
                            <td style="padding: 10px; vertical-align: top;">{sub}</td>
                        </tr>
'''
    card += f'''                    </tbody>
                </table>
            </div>
            <p style="color: #888; font-size: 0.8rem; margin-top: 15px;">UK 14 allergens: celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, nuts, peanuts, sesame, soya and sulphur dioxide/sulphites. This is a planning sheet only; final allergen information must be verified from the actual recipe, supplier labels and kitchen controls before service.</p>
        </div>
    </div>
'''
    html_cards.append(card)

full_html = "\\n".join(html_cards)

# Read the original file and replace the section
file_path = "public/event-catering.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

import re
# Regex to find the Events We Cater grid
pattern = re.compile(r'<div class="event-card-grid" style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(280px, 1fr\)\); gap: 2rem;">.*?</section>', re.DOTALL)

replacement = f'<div class="event-card-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">\n{full_html}\n            </div>\n        </div>\n    </section>'

new_content = pattern.sub(replacement, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Updated event-catering.html")
