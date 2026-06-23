const fs = require('fs');
let data = fs.readFileSync('c:/Users/KENDEE/Desktop/เว็บ/data/classic_menu.json', 'utf8');

data = data.replace(/"th": "ส้มตำไทย",/g, '"th": "ส้มตำไทย (มะละกอดิบ ถั่วฝักยาว มะเขือเทศ พริกขี้หนู กระเทียม น้ำปลา น้ำมะนาว น้ำตาลปี๊บ กุ้งแห้ง ถั่วลิสง)",');
data = data.replace(/"en": "Som Tum Thai"(?! with)/g, '"en": "Som Tum Thai (Green Papaya, Long Beans, Tomatoes, Chili, Garlic, Fish Sauce, Lime, Palm Sugar, Dried Shrimp, Peanuts)"');

fs.writeFileSync('c:/Users/KENDEE/Desktop/เว็บ/data/classic_menu.json', data);
console.log('done');
