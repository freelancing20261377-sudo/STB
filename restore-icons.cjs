const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });
  return arrayOfFiles;
}

const allFiles = getAllFiles(srcDir);

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  
  // Replace hidden back to material-symbols-outlined if it wraps a material icon text
  content = content.replace(/className="hidden([^"]*)"([^>]*)>([a-z_]+)<\/span>/g, 'className="material-symbols-outlined$1"$2>$3</span>');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});
console.log('Restored material icons.');
