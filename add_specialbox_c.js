const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'classic_menu.json');
let rawData = fs.readFileSync(filePath, 'utf8');
let classicMenu = JSON.parse(rawData);

// Check if Special Box Set C already exists
let exists = false;
classicMenu.forEach(set => {
    if (set.name && set.name.en === "Special Box Set C") {
        exists = true;
    }
});

if (!exists) {
    let maxId = 0;
    classicMenu.forEach(set => {
        if (set.id > maxId) maxId = set.id;
    });

    const newSet = {
        id: maxId + 1,
        name: {
            th: "Special Box Set C",
            en: "Special Box Set C"
        },
        price: "25",
        unit: {
            th: "1 ท่าน",
            en: "1 Person"
        },
        desc: {
            th: "เสือร้องไห้ ข้าวเหนียว ส้มตำไทย น้ำจิ้มซีฟู้ด และผักเคียง",
            en: "Weeping Tiger (Grilled Beef), Sticky Rice, Papaya Salad, Seafood Dipping Sauce, Side Vegetables"
        },
        img: "Special Box Set C.jpg",
        items: {
            th: {
                starters: [
                    "ผักเคียง",
                    "น้ำจิ้มซีฟู้ด",
                    "ส้มตำไทย"
                ],
                mains: [
                    "เสือร้องไห้",
                    "ข้าวเหนียว"
                ],
                desserts: []
            },
            en: {
                starters: [
                    "Side Vegetables",
                    "Seafood Dipping Sauce",
                    "Papaya Salad"
                ],
                mains: [
                    "Weeping Tiger (Grilled Beef)",
                    "Sticky Rice"
                ],
                desserts: []
            }
        }
    };

    classicMenu.push(newSet);
    fs.writeFileSync(filePath, JSON.stringify(classicMenu, null, 4), 'utf8');
    console.log("Added Special Box Set C.");
} else {
    console.log("Special Box Set C already exists.");
}
