const fs = require('fs');
if (fs.existsSync('rawg_valorant.html')) {
  const s = fs.readFileSync('rawg_valorant.html', 'utf8');
  const m = s.match(/https:\/\/media\.rawg\.io\/media\/[a-zA-Z0-9_\-\.\/]+/g) || [];
  console.log(Array.from(new Set(m)).slice(0, 10));
} else {
  console.log('Not found');
}
