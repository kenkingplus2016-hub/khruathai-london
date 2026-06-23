const fs = require('fs');

// ข้อมูลสำหรับเชื่อมต่อ Facebook
const PAGE_ID = '61589177574118'; // ได้มาจากลิงก์ที่คุณส่งมา
const ACCESS_TOKEN = 'EAAShwTLsJdIBRm9Ei1ptYrdz3VX2aWXqdKy2SByuwme9xgdy6j1vPvslNKOt5kRDLhA87ypV5SmRmR2cPCZAhhKvibCDLVZBgXnJ9ZCyW9ubT0UqBP6vQtAyNiHJJr0oDK1JYv6SwoitL0lNRgMYudz0DgRQzdPzqmqakuPsBTM4VtuW0RUIdzidp0geW6USdN7xDQWZBKCpCbAz8KAZC56OnH34m2IeCq6e31V4R9lkO6aP1AlE0Km7NFRDhno1o0YzDKETvZAgzcaQPzm6mZBOPuFExfZBgTygZBmDRzYvJMZBxPmDaOVwfVpLYGdIXme6Ttlvzm8Ejc9tXt5f6zf1x3Xx4ZD'; // Page Access Token ของคุณ

/**
 * ฟังก์ชันสำหรับโพสต์รูปลง Facebook Page
 * @param {string} message ข้อความแคปชัน
 * @param {string} imageUrl ลิงก์รูปภาพ (ต้องเป็น URL ที่เข้าถึงได้จากอินเทอร์เน็ต)
 */
async function postToFacebook(message, imageUrl) {
    const url = `https://graph.facebook.com/v25.0/${PAGE_ID}/photos`;
    
    try {
        console.log('กำลังส่งโพสต์ไปที่ Facebook...');
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: imageUrl,
                message: message,
                access_token: ACCESS_TOKEN
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error('❌ เกิดข้อผิดพลาดในการโพสต์:', data.error.message);
        } else {
            console.log('✅ โพสต์สำเร็จ! รหัสโพสต์ (Post ID):', data.post_id);
        }
    } catch (error) {
        console.error('❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ Facebook ได้:', error);
    }
}

// ==========================================
// ส่วนทดสอบการทำงาน
// ==========================================

const caption = `🔥 เมนูคานาเป้สุดพิเศษจาก Khrua Thai London 🔥\nคอหมูย่างนมสด นุ่มละมุนลิ้น พร้อมเสิร์ฟแล้ววันนี้!\nสั่งเลยผ่านเว็บไซต์ของเรา!`;
const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/800px-Eq_it-na_pizza-margherita_sep2005_sml.jpg'; // เปลี่ยนเป็นรูปคอหมูย่างได้ครับ

// ลบเครื่องหมาย // เพื่อสั่งทำงาน
postToFacebook(caption, imageUrl);
