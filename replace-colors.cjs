const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src/partner/pages'),
  path.join(__dirname, 'src/admin/pages')
];

const replacements = [
  { from: /bg-surface-container-lowest/g, to: 'bg-white' },
  { from: /bg-surface-container-low/g, to: 'bg-gray-50' },
  { from: /bg-surface-container/g, to: 'bg-gray-100' },
  { from: /bg-surface-dim/g, to: 'bg-gray-50' },
  { from: /text-on-surface-variant/g, to: 'text-gray-500' },
  { from: /text-on-surface/g, to: 'text-gray-900' },
  { from: /border-outline-variant\/30/g, to: 'border-gray-100' },
  { from: /border-outline-variant\/50/g, to: 'border-gray-200' },
  { from: /border-outline-variant\/10/g, to: 'border-gray-50' },
  { from: /border-outline-variant/g, to: 'border-gray-200' },
  { from: /border-outline/g, to: 'border-gray-300' },
  { from: /bg-surface/g, to: 'bg-slate-50' },
  { from: /bg-primary-container/g, to: 'bg-blue-50' },
  { from: /text-on-primary-container/g, to: 'text-blue-700' },
  { from: /bg-primary/g, to: 'bg-blue-600' },
  { from: /text-on-primary/g, to: 'text-white' },
  { from: /text-primary/g, to: 'text-blue-600' },
  { from: /material-symbols-outlined/g, to: 'hidden' }
];

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
    files.forEach(file => {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf-8');
      replacements.forEach(({from, to}) => {
        content = content.replace(from, to);
      });
      fs.writeFileSync(filePath, content, 'utf-8');
    });
  }
});
console.log('Replaced colors in partner and admin pages');
