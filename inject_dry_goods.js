const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'data', 'inventory.json');
let inv = [];
try {
    inv = JSON.parse(fs.readFileSync(p, 'utf8'));
} catch(e) {}

const newItems = [
    { name: "น้ำปลา (Fish Sauce)", category: "ของแห้ง (Dry)", unit: "bottle", min_threshold: 3 },
    { name: "ซีอิ๊วขาว (Light Soy Sauce)", category: "ของแห้ง (Dry)", unit: "bottle", min_threshold: 2 },
    { name: "ซีอิ๊วดำ/ซีอิ๊วหวาน (Dark Soy Sauce)", category: "ของแห้ง (Dry)", unit: "bottle", min_threshold: 1 },
    { name: "ซอสหอยนางรม (Oyster Sauce)", category: "ของแห้ง (Dry)", unit: "bottle", min_threshold: 2 },
    { name: "เต้าเจี้ยว (Fermented Soybean Paste)", category: "ของแห้ง (Dry)", unit: "bottle", min_threshold: 1 },
    { name: "น้ำจิ้มไก่ (Sweet Chili Sauce)", category: "ของแห้ง (Dry)", unit: "bottle", min_threshold: 2 },
    { name: "ซอสพริกศรีราชา (Sriracha Sauce)", category: "ของแห้ง (Dry)", unit: "bottle", min_threshold: 1 },
    { name: "ผงปรุงรสไก่/หมู (Bouillon Powder)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 1 },
    { name: "น้ำตาลทราย (White Sugar)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 2 },
    { name: "น้ำตาลปี๊บ (Palm Sugar)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 2 },
    { name: "เกลือ (Salt)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 1 },
    { name: "พริกไทยป่น (Ground White Pepper)", category: "ของแห้ง (Dry)", unit: "g", min_threshold: 500 },
    { name: "พริกแกงแดง (Red Curry Paste)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 1 },
    { name: "พริกแกงเขียวหวาน (Green Curry Paste)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 1 },
    { name: "พริกแกงพะแนง (Panang Curry Paste)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 1 },
    { name: "พริกแกงมัสมั่น (Massaman Curry Paste)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 1 },
    { name: "พริกป่น (Chili Flakes)", category: "ของแห้ง (Dry)", unit: "g", min_threshold: 500 },
    { name: "พริกแห้ง (Dried Chilies)", category: "ของแห้ง (Dry)", unit: "g", min_threshold: 500 },
    { name: "ข้าวเหนียว (Sticky Rice)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 5 },
    { name: "เส้นผัดไทย (Pad Thai Noodles)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 2 },
    { name: "วุ้นเส้น (Glass Noodles)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 1 },
    { name: "กะทิ (Coconut Milk)", category: "ของแห้ง (Dry)", unit: "box/can", min_threshold: 10 },
    { name: "ถั่วลิสงคั่วบด (Crushed Peanuts)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 1 },
    { name: "น้ำมะขามเปียก (Tamarind Paste)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 1 },
    { name: "กระเทียมเจียว (Fried Garlic)", category: "ของแห้ง (Dry)", unit: "g", min_threshold: 500 },
    { name: "หอมเจียว (Fried Shallots)", category: "ของแห้ง (Dry)", unit: "g", min_threshold: 500 },
    { name: "แป้งมัน/ข้าวโพด (Tapioca/Corn Starch)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 1 },
    { name: "แป้งทอดกรอบ (Tempura Batter Mix)", category: "ของแห้ง (Dry)", unit: "kg", min_threshold: 1 }
];

let added = 0;
newItems.forEach((item, index) => {
    // Avoid duplicates by checking if the Thai name already exists
    if (!inv.find(i => i.name.includes(item.name.split(' (')[0]))) {
        inv.push({
            id: 'inv_auto_' + Date.now() + '_' + index,
            name: item.name,
            category: item.category,
            quantity: 0, // Set initial stock to 0
            unit: item.unit,
            min_threshold: item.min_threshold,
            last_updated: new Date().toISOString()
        });
        added++;
    }
});
fs.writeFileSync(p, JSON.stringify(inv, null, 4));
console.log(`Successfully added ${added} items to inventory.json`);
