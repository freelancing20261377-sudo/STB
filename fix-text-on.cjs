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
  { from: /text-on-secondary-container/g, to: 'text-blue-700' },
  { from: /text-on-secondary/g, to: 'text-white' },
  { from: /text-on-error-container/g, to: 'text-red-700' },
  { from: /text-on-error/g, to: 'text-white' },
  { from: /text-on-surface-variant/g, to: 'text-gray-700' },
  { from: /text-on-surface/g, to: 'text-gray-900' },
  { from: /text-on-background/g, to: 'text-gray-900' },
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
console.log('Fixed text-on colors.');
