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
  { from: /bg-surface-container-lowest/g, to: 'bg-white' },
  { from: /bg-surface-container-low/g, to: 'bg-gray-50' },
  { from: /bg-surface-container-high/g, to: 'bg-gray-200' },
  { from: /bg-surface-container/g, to: 'bg-gray-100' },
  { from: /bg-surface-dim/g, to: 'bg-gray-50' },
  { from: /bg-surface-variant/g, to: 'bg-gray-100' },
  { from: /bg-surface/g, to: 'bg-slate-50' },
  
  { from: /text-on-surface-variant/g, to: 'text-gray-500' },
  { from: /text-on-surface/g, to: 'text-gray-900' },
  
  { from: /border-outline-variant\/[0-9]+/g, to: 'border-gray-200' },
  { from: /border-outline-variant/g, to: 'border-gray-200' },
  { from: /border-outline/g, to: 'border-gray-300' },
  
  { from: /bg-primary-container/g, to: 'bg-blue-50' },
  { from: /text-on-primary-container/g, to: 'text-blue-700' },
  { from: /bg-primary/g, to: 'bg-blue-600' },
  { from: /text-on-primary/g, to: 'text-white' },
  { from: /text-primary/g, to: 'text-blue-600' },
  { from: /bg-inverse-surface/g, to: 'bg-gray-900' },
  
  { from: /material-symbols-outlined/g, to: 'hidden' }
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
console.log('Done replacing tokens globally.');
