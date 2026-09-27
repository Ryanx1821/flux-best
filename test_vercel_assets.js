const fs = require('fs');

const backupFiles = fs.readdirSync('../flux_backup_unused/archive');
const matches = [];
backupFiles.forEach(bf => {
  try {
    const content = fs.readFileSync('../flux_backup_unused/archive/' + bf, 'utf8');
    if (content.includes('cat_')) matches.push(bf);
  } catch (e) {}
});
console.log('cat_ found in archive files:', matches);
