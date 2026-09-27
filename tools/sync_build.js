const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const publicIndexPath = path.join(rootDir, 'public', 'index.html');
const rootIndexPath = path.join(rootDir, 'index.html');
const buildPath = path.join(rootDir, 'tools', 'build.js');

const targetPath = fs.existsSync(publicIndexPath) ? publicIndexPath : rootIndexPath;
const content = fs.readFileSync(targetPath, 'utf8');

const code = 'const fs = require(\'fs\');\nconst path = require(\'path\');\n\nconst rootDir = path.resolve(__dirname, \'..\');\nconst htmlContent = ' + JSON.stringify(content) + ';\n\nconst pPath = path.join(rootDir, \'public\', \'index.html\');\nif (fs.existsSync(path.dirname(pPath))) fs.writeFileSync(pPath, htmlContent, \'utf8\');\nfs.writeFileSync(path.join(rootDir, \'index.html\'), htmlContent, \'utf8\');\nconsole.log(\'Build completed successfully!\');\n';

fs.writeFileSync(buildPath, code, 'utf8');
console.log('tools/build.js has been successfully regenerated and synchronized!');
