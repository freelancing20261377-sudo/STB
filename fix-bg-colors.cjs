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
  { from: /bg-secondary-container/g, to: 'bg-blue-100' },
  { from: /bg-secondary/g, to: 'bg-blue-600' },
  { from: /bg-error-container/g, to: 'bg-red-100' },
  { from: /bg-error/g, to: 'bg-red-600' },
  { from: /text-secondary/g, to: 'text-blue-600' },
  { from: /text-error/g, to: 'text-red-600' },
  { from: /border-secondary/g, to: 'border-blue-600' },
  { from: /border-error/g, to: 'border-red-600' },
  { from: /ring-secondary/g, to: 'ring-blue-600' },
  { from: /ring-error/g, to: 'ring-red-600' },
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
console.log('Fixed bg-error/bg-secondary colors.');
