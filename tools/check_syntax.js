const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.resolve(__dirname, '..');
const publicIndexPath = path.join(rootDir, 'public', 'index.html');
const rootIndexPath = path.join(rootDir, 'index.html');
const targetPath = fs.existsSync(publicIndexPath) ? publicIndexPath : rootIndexPath;

const html = fs.readFileSync(targetPath, 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Total script tags found:', scripts.length);

let failed = false;
scripts.forEach((s, idx) => {
  if (s[1] && s[1].trim()) {
    try {
      new vm.Script(s[1], { filename: `script_${idx}.js` });
      console.log(`Script ${idx}: Syntax VALID`);
    } catch (err) {
      failed = true;
      console.error(`Script ${idx} SYNTAX ERROR:`, err.message);
    }
  }
});

if (failed) {
  process.exit(1);
} else {
  console.log('OVERALL SCRIPT SYNTAX: 100% VALID');
}
