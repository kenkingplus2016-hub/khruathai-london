const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'classic_menu.json');
let rawData = fs.readFileSync(filePath, 'utf8');
let classicMenu = JSON.parse(rawData);

let updated = false;
classicMenu.forEach(set => {
    if (set.name && set.name.en === "Special Box Set A") {
        set.price = "25";
        updated = true;
    }
});

if (updated) {
    fs.writeFileSync(filePath, JSON.stringify(classicMenu, null, 4), 'utf8');
    console.log("Updated Special Box Set A price to 25£.");
} else {
    console.log("No changes made.");
}
