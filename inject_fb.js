const fs = require('fs');
const path = require('path');

const fbButtonCode = `
<!-- Messenger Floating Button -->
<a href="https://m.me/61589177574118" target="_blank" class="messenger-float">
    <i class="fab fa-facebook-messenger"></i>
</a>
<style>
.messenger-float {
    position: fixed;
    bottom: 25px;
    right: 25px;
    background-color: #0084FF;
    color: #FFF;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    z-index: 9999;
    transition: all 0.3s ease;
    text-decoration: none;
}
.messenger-float:hover {
    transform: scale(1.1);
    background-color: #0073E6;
    color: white;
}
@media (max-width: 768px) {
    .messenger-float {
        width: 55px;
        height: 55px;
        font-size: 30px;
        bottom: 20px;
        right: 20px;
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
            
            // Remove Tawk.to
            if (content.includes('Tawk.to Script')) {
                const regex = /<!--Start of Tawk\.to Script-->[\s\S]*<!--End of Tawk\.to Script-->/g;
                content = content.replace(regex, '');
            }
            
            // Remove old fb button if exists (for safety)
            if (content.includes('messenger-float')) {
                const fbRegex = /<!-- Messenger Floating Button -->[\s\S]*<\/style>/g;
                content = content.replace(fbRegex, '');
            }
            
            content = content.replace('</body>', fbButtonCode);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log("Injected FB Messenger into " + filePath);
        }
    });
});
