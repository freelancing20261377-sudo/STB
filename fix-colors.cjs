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

const replacements = [
  { from: /bg-blue-600-fixed/g, to: 'bg-blue-50' },
  { from: /bg-secondary-fixed-dim/g, to: 'bg-blue-200' },
  { from: /bg-secondary-fixed/g, to: 'bg-blue-100' },
  { from: /text-on-secondary-fixed/g, to: 'text-blue-900' },
];

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  
  replacements.forEach(({from, to}) => {
    content = content.replace(from, to);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }
});
console.log('Fixed broken bg colors.');
