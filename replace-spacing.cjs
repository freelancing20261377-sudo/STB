const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'admin', 'pages');

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('pt-24 ')) {
    content = content.replace(/pt-24 /g, '');
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});
console.log('Removed pt-24 from admin pages.');
