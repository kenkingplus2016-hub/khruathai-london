const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'classic_menu.json');
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

data.forEach(item => {
    if (item.name.en.includes('Lunch Box Set A') || item.name.en.includes('Lunch Box Set B') || item.name.en.includes('Lunch Box Set C') || item.name.en.includes('Lunch Box Set D')) {
        console.log(`--- ${item.name.th} ---`);
        console.log(`Has Recipe: ${item.recipe ? 'Yes' : 'No'}`);
        if (item.recipe) {
            console.log(item.recipe.th.slice(0, 3)); // preview
        }
    }
});
