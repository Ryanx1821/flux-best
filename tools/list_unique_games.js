const fs = require('fs');
const html = fs.readFileSync('visuals_home.html', 'utf8');

const regex = /<figure[^>]*>([\s\S]*?)<\/figure>/g;
let m;
const uniqueGames = new Map();
while ((m = regex.exec(html)) !== null) {
  const fig = m[1];
  const nameMatch = fig.match(/<figcaption[^>]*>(.*?)<\/figcaption>/);
  const name = nameMatch ? nameMatch[1] : '';
  
  // Look for all img src
  const imgs = Array.from(fig.matchAll(/src="([^"]+)"/g)).map(x => x[1]);
  if (name && !uniqueGames.has(name)) {
    uniqueGames.set(name, imgs);
  }
}

for (const [name, imgs] of uniqueGames.entries()) {
  console.log(name, imgs);
}
