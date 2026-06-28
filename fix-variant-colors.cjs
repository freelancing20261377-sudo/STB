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
  { from: /border-surface-variant/g, to: 'border-gray-200' },
  { from: /bg-outline-variant/g, to: 'bg-gray-200' },
  { from: /text-outline-variant/g, to: 'text-gray-400' },
  { from: /border-outline-variant/g, to: 'border-gray-200' },
  { from: /bg-surface-variant/g, to: 'bg-gray-100' },
  { from: /text-surface-variant/g, to: 'text-gray-500' },
  // check for on-surface-variant
  { from: /text-on-surface-variant/g, to: 'text-gray-600' }
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
console.log('Fixed variant colors.');
