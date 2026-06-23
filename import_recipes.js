const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'data', 'recipes.csv');
const menuPath = path.join(__dirname, 'data', 'menu.json');

const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n');

const recipesMap = {};

function parseCSVLine(line) {
    let result = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
        let char = line[i];
        if (char === '"') {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            result.push(cur.trim());
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur.trim());
    return result;
}

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const matches = parseCSVLine(line);
    if (!matches || matches.length < 4) continue;
    
    let menuName = matches[0];
    let category = matches[1];
    let ingredient = matches[2];
    let amount = matches[3];
    
    if (!recipesMap[menuName]) {
        recipesMap[menuName] = [];
    }
    
    // Add category header if it's a new category
    if (!recipesMap[menuName]._lastCategory || recipesMap[menuName]._lastCategory !== category) {
        recipesMap[menuName].push('--- ' + category + ' ---');
        recipesMap[menuName]._lastCategory = category;
    }
    
    let text = ingredient;
    if (amount && amount !== '-' && amount !== '') {
        text += ' ' + amount;
    }
    recipesMap[menuName].push(text);
}

// Clean up _lastCategory
for (let key in recipesMap) {
    delete recipesMap[key]._lastCategory;
}

const allMenuPaths = [
    path.join(__dirname, 'data', 'menu.json'),
    path.join(__dirname, 'data', 'royal_menu.json'),
    path.join(__dirname, 'data', 'classic_menu.json'),
    path.join(__dirname, 'data', 'curry_menu.json')
];

let globalUpdatedCount = 0;

function updateItems(items) {
    if (!items || !Array.isArray(items)) return;
    for (let item of items) {
        let matchName = item.th || item.name?.th;
        if (matchName && recipesMap[matchName]) {
            if (!item.ingredients) item.ingredients = {};
            item.ingredients.th = recipesMap[matchName];
            if (!item.ingredients.en || item.ingredients.en.length === 0) {
                item.ingredients.en = recipesMap[matchName].map(t => "(TH) " + t);
            }
            globalUpdatedCount++;
            console.log("Matched:", matchName);
        }
        
        // Sometimes item has main_ingredients instead of ingredients
        if (matchName && recipesMap[matchName] && item.main_ingredients) {
             item.main_ingredients.th = recipesMap[matchName];
        }

        if (item.items) updateItems(item.items);
        if (item.desserts) updateItems(item.desserts); // some custom structures
    }
}

for (let mp of allMenuPaths) {
    if (fs.existsSync(mp)) {
        let data = JSON.parse(fs.readFileSync(mp, 'utf8'));
        updateItems(data);
        fs.writeFileSync(mp, JSON.stringify(data, null, 4), 'utf8');
        console.log('Saved', path.basename(mp));
    }
}
console.log('Total Matched:', globalUpdatedCount);
