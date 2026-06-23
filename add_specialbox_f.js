const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'classic_menu.json');
let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const newBox = {
    "id": 19,
    "name": {
        "th": "Special Box Set F — วันพุธ - ศุกร์",
        "en": "Special Box Set F — Wednesday - Friday"
    },
    "price": "25",
    "unit": {
        "th": "1 ท่าน",
        "en": "1 Person"
    },
    "desc": {
        "th": "ย่างเสือร้องไห้ ข้าวเหนียว ส้มตำปลาร้า และผักเคียง — จัดส่งวันพุธ - ศุกร์ (เวลาส่ง 12.00 - 13.00 น. / 18.00 - 20.00 น.) | ปิดรับออเดอร์ 15.00 น. ของวันก่อนหน้า (Pre-order) | รัศมีส่งไม่เกิน 5 ไมล์",
        "en": "Grilled Weeping Tiger Beef, Sticky Rice, Papaya Salad with Fermented Fish, Side Vegetables — Delivered Wednesday - Friday (12:00 PM - 1:00 PM / 6:00 PM - 8:00 PM) | Cut-off 3:00 PM day before (Pre-order) | Radius Within 5 miles"
    },
    "img": "logo.png",
    "items": {
        "th": {
            "starters": [
                "ผักเคียง",
                "ส้มตำปลาร้า"
            ],
            "mains": [
                "ย่างเสือร้องไห้",
                "ข้าวเหนียว"
            ],
            "desserts": []
        },
        "en": {
            "starters": [
                "Side Vegetables",
                "Papaya Salad with Fermented Fish"
            ],
            "mains": [
                "Grilled Weeping Tiger Beef",
                "Sticky Rice"
            ],
            "desserts": []
        }
    }
};

data.push(newBox);
fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
console.log('Added Special Box Set F successfully!');
