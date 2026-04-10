const fs = require('fs');

const files = [
  'src/pages/form/SOlForm.js',
  'src/pages/form/SITForm.js',
  'src/pages/form/PARM1102.js',
  'src/pages/form/OPCForm.js',
  'src/pages/form/epicRun.js',
  'src/pages/form/epicCont.js',
  'src/pages/form/epicAllForm.js',
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/description=\{descriptions\[([a-zA-Z0-9_]+)\]\}/g, 'fieldKey={$1}');
    content = content.replace(/description=\{headers\.EPICRUN\.descriptions\[([a-zA-Z0-9_]+)\]\}/g, 'fieldKey={$1}');
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  } else {
    console.log('Not found:', file);
  }
});
