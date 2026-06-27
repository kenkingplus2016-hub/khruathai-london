const fs = require('fs');
const path = require('path');

const fbAndLineCode = `
<!-- Messenger and LINE Floating Buttons -->
<div style="position: fixed; bottom: 25px; left: 25px; display: flex; flex-direction: column; gap: 15px; z-index: 9999;">
    <!-- Facebook Messenger -->
    <a href="https://m.me/61589177574118" target="_blank" class="chat-float fb-float">
        <i class="fab fa-facebook-messenger"></i>
    </a>
    <!-- LINE -->
    <a href="https://line.me/ti/p/y_Whr-5wc3" target="_blank" class="chat-float line-float">
        <i class="fab fa-line"></i>
    </a>
</div>
<style>
.chat-float {
    color: #FFF;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
    text-decoration: none;
}
.fb-float {
    background-color: #0084FF;
}
.fb-float:hover {
    background-color: #0073E6;
    transform: scale(1.1);
    color: white;
}
.line-float {
    background-color: #00C300;
}
.line-float:hover {
    background-color: #00A000;
    transform: scale(1.1);
    color: white;
}
@media (max-width: 768px) {
    .chat-float {
        width: 55px;
        height: 55px;
        font-size: 30px;
    }
}
</style>
</body>`;

const files = ["index.html", "menu.html", "delivery.html", "booking.html", "royal.html"];
const repoPath = "C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public";
const deskPath = "C:\\Users\\KENDEE\\Desktop\\เว็บ\\public";

[repoPath, deskPath].forEach(dir => {
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Remove old fb button
            if (content.includes('messenger-float')) {
                const fbRegex = /<!-- Messenger Floating Button -->[\s\S]*<\/style>/g;
                content = content.replace(fbRegex, '');
            }
            // Remove old line/fb buttons if already run
            if (content.includes('fb-float')) {
                const bothRegex = /<!-- Messenger and LINE Floating Buttons -->[\s\S]*<\/style>/g;
                content = content.replace(bothRegex, '');
            }
            
            content = content.replace('</body>', fbAndLineCode);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log("Injected FB and LINE into " + filePath);
        }
    });
});
