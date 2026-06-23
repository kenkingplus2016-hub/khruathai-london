const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'classic_menu.json');
let rawData = fs.readFileSync(filePath, 'utf8');
let classicMenu = JSON.parse(rawData);

// Check if Special Box Set B already exists
let exists = false;
classicMenu.forEach(set => {
    if (set.name && set.name.en === "Special Box Set B") {
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
            th: "Special Box Set B",
            en: "Special Box Set B"
        },
        price: "25",
        unit: {
            th: "1 ท่าน",
            en: "1 Person"
        },
        desc: {
            th: "คอหมูย่าง ข้าวเหนียว ส้มตำไทย น้ำจิ้มซีฟู้ด และผักเคียง",
            en: "Grilled Pork Neck, Sticky Rice, Papaya Salad, Seafood Dipping Sauce, Side Vegetables"
        },
        img: "Special Box Set B.jpg",
        items: {
            th: {
                starters: [
                    "ผักเคียง",
                    "น้ำจิ้มซีฟู้ด",
                    "ส้มตำไทย"
                ],
                mains: [
                    "คอหมูย่าง",
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
                    "Grilled Pork Neck",
                    "Sticky Rice"
                ],
                desserts: []
            }
        }
    };

    classicMenu.push(newSet);
    fs.writeFileSync(filePath, JSON.stringify(classicMenu, null, 4), 'utf8');
    console.log("Added Special Box Set B.");
} else {
    console.log("Special Box Set B already exists.");
}
