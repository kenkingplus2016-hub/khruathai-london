const fs = require('fs');

const eventCatering = fs.readFileSync('public/event-catering.html', 'utf8');

// Extract the grid section
const gridRegex = /<section style="padding: 40px 20px 80px 20px; background-color: var\(--color-black\);">[\s\S]*?<\/section>/;
const gridMatch = eventCatering.match(gridRegex);

if (!gridMatch) {
    console.error("Grid not found in event-catering.html");
    process.exit(1);
}

const gridSection = gridMatch[0];

// Define replacement for meeting-meals.html
let meetingMeals = fs.readFileSync('public/meeting-meals.html', 'utf8');
const meetingHeroRegex = /<section style="padding: 120px 20px 60px 20px; background-color: var\(--color-black\); min-height: 60vh; text-align: center;">[\s\S]*?<\/section>/;

const meetingHeroReplacement = `<section style="padding: 120px 20px 60px 20px; background-color: var(--color-black); min-height: 40vh; text-align: center;">
        <div class="container" style="max-width: 800px; margin: 0 auto; background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 4rem 2rem; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05);">
            <img src="images/main_meeting_meals.jpg" alt="Meeting Meals" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">
            <h2 style="color: var(--color-gold); font-size: 2.5rem; margin-bottom: 1rem;">Meeting Meals</h2>
            <p style="color: #ccc; font-size: 1.2rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 20px;">Premium Selection<br/><span style="color: var(--color-gold); font-size: 1rem;">From 20 Guests</span></p>
            <div style="text-align: center; margin-top: 20px; padding: 20px;">
                <p style="color: #ddd; font-size: 1.1rem; line-height: 1.6; margin: 0;">Elevate your boardroom meetings and team lunches with our premium Thai catering selection.</p>
            </div>
        </div>
    </section>
    
    ${gridSection}`;

meetingMeals = meetingMeals.replace(meetingHeroRegex, meetingHeroReplacement);
fs.writeFileSync('public/meeting-meals.html', meetingMeals);

// Define replacement for coffee-break.html
let coffeeBreak = fs.readFileSync('public/coffee-break.html', 'utf8');
const coffeeHeroRegex = /<section style="padding: 120px 20px 60px 20px; background-color: var\(--color-black\); min-height: 60vh; text-align: center;">[\s\S]*?<\/section>/;

const coffeeHeroReplacement = `<section style="padding: 120px 20px 60px 20px; background-color: var(--color-black); min-height: 40vh; text-align: center;">
        <div class="container" style="max-width: 800px; margin: 0 auto; background-color: rgba(20, 20, 20, 0.8); border: 1px solid var(--color-gold); border-radius: 8px; padding: 4rem 2rem; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.05);">
            <img src="images/main_coffee_break.jpg" alt="Coffee Break" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;">
            <h2 style="color: var(--color-gold); font-size: 2.5rem; margin-bottom: 1rem;">Coffee Break</h2>
            <p style="color: #ccc; font-size: 1.2rem; margin-top: 12px; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 20px;">Premium Selection<br/><span style="color: var(--color-gold); font-size: 1rem;">From 20 Guests</span></p>
            <div style="text-align: center; margin-top: 20px; padding: 20px;">
                <p style="color: #ddd; font-size: 1.1rem; line-height: 1.6; margin: 0;">Perfect for morning or afternoon corporate breaks. Includes authentic Thai treats.</p>
            </div>
        </div>
    </section>
    
    ${gridSection}`;

coffeeBreak = coffeeBreak.replace(coffeeHeroRegex, coffeeHeroReplacement);
fs.writeFileSync('public/coffee-break.html', coffeeBreak);

console.log("Updated meeting-meals.html and coffee-break.html");
