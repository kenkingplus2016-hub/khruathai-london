const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'classic_menu.json');
let rawData = fs.readFileSync(filePath, 'utf8');
let classicMenu = JSON.parse(rawData);

let updated = false;
classicMenu.forEach(set => {
    if (set.name && set.name.en && set.name.en.includes("Lunch Box")) {
        set.price = 45;
        updated = true;
    }
});

if (updated) {
    fs.writeFileSync(filePath, JSON.stringify(classicMenu, null, 4), 'utf8');
    console.log("Updated Lunch Box prices to 45£.");
} else {
    console.log("No Lunch Box entries found or updated.");
}
