const fs = require('fs');
const path = require('path');

const scriptCode = `
<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/6a3fb7427e16581d479c0473/1js4e7nkp';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
</body>`;

const files = ["index.html", "menu.html", "delivery.html", "booking.html", "royal.html"];
const repoPath = "C:\\Users\\KENDEE\\Documents\\GitHub\\khruathai-london\\public";
const deskPath = "C:\\Users\\KENDEE\\Desktop\\เว็บ\\public";

[repoPath, deskPath].forEach(dir => {
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.existsSync(filePath)) {
            let content = fs.readFileSync(filePath, 'utf8');
            // Remove previous Tawk.to if exists just in case
            if (content.includes('Tawk.to Script')) {
                const regex = /<!--Start of Tawk\.to Script-->[\s\S]*<!--End of Tawk\.to Script-->/g;
                content = content.replace(regex, '');
            }
            content = content.replace('</body>', scriptCode);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log("Injected Tawk.to into " + filePath);
        }
    });
});
