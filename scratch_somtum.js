const fs = require('fs');
let data = fs.readFileSync('c:/Users/KENDEE/Desktop/เว็บ/data/classic_menu.json', 'utf8');

data = data.replace(/"th": "ส้มตำปูปลาร้า",/g, '"th": "ส้มตำปูปลาร้า (มะละกอดิบ ถั่วฝักยาว มะเขือเทศ แครอท พริกขี้หนู กระเทียม น้ำปลา น้ำมะนาว น้ำตาลปี๊บ ปูนาดอง ปลาร้าต้มสุก)",');
data = data.replace(/"en": "Som Tum Pu Pla Ra"(?! with)/g, '"en": "Som Tum Pu Pla Ra (Green Papaya, Long Beans, Tomatoes, Carrots, Chili, Garlic, Fish Sauce, Lime, Palm Sugar, Pickled Crab, Boiled Fermented Fish)"');

fs.writeFileSync('c:/Users/KENDEE/Desktop/เว็บ/data/classic_menu.json', data);
console.log('done');
