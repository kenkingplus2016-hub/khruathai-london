const fs = require('fs');
const path = require('path');

// --- 1. Modify royal.html ---
const royalPath = path.join(__dirname, 'public', 'royal.html');
let royalHtml = fs.readFileSync(royalPath, 'utf8');

// Remove tab button
royalHtml = royalHtml.replace(/<button class="tab-btn" id="tab-banquet-btn"[\s\S]*?<\/button>/, '');

// Remove banquet content div
// We will find the index of <div id="tab-banquet-content" and slice until its matching closing tag
// Luckily, it has an ID, so regex can work if we are careful, or we just remove the known block.
royalHtml = royalHtml.replace(/<!-- ================= BANQUET TAB SECTION ================= -->[\s\S]*?<!-- Banquet CTA -->[\s\S]*?<\/div>[\s\S]*?<\/div>/, '');

// Remove JS logic
royalHtml = royalHtml.replace(/const banquetBtn = document\.getElementById\('tab-banquet-btn'\);/g, '');
royalHtml = royalHtml.replace(/const banquetContent = document\.getElementById\('tab-banquet-content'\);/g, '');
royalHtml = royalHtml.replace(/banquetBtn\.classList\.remove\('active'\);/g, '');
royalHtml = royalHtml.replace(/banquetContent\.classList\.add\('hidden'\);/g, '');

const jsSwitchTabBlock = `        } else {
            banquetBtn.classList.add('active');
            banquetContent.classList.remove('hidden');
            document.getElementById('sticky-cart-bar').classList.add('translate-y-full'); // Hide cart in banquet
        }`;
royalHtml = royalHtml.replace(jsSwitchTabBlock, '');
royalHtml = royalHtml.replace(/&& activeTab !== 'banquet'/g, '');

// Replace the translation string references
royalHtml = royalHtml.replace(/lbl_tab_banquet: ".*?",\n/g, '');
royalHtml = royalHtml.replace(/banquet_title: ".*?",\n/g, '');
royalHtml = royalHtml.replace(/banquet_desc: ".*?",\n/g, '');

fs.writeFileSync(royalPath, royalHtml, 'utf8');
console.log('royal.html updated.');


// --- 2. Modify booking.html ---
const bookingPath = path.join(__dirname, 'public', 'booking.html');
let bookingHtml = fs.readFileSync(bookingPath, 'utf8');

bookingHtml = bookingHtml.replace(/const optBanquet = document\.createElement\('option'\);\s*optBanquet\.value = 'royal-banquet';\s*optBanquet\.textContent = .*?;\s*grp3\.appendChild\(optBanquet\);/, '');

const setObjRegex = /{\s*key:\s*'royal-banquet',[\s\S]*?category:\s*'RoyalBanquet'[^}]*},?/;
bookingHtml = bookingHtml.replace(setObjRegex, '');

fs.writeFileSync(bookingPath, bookingHtml, 'utf8');
console.log('booking.html updated.');
