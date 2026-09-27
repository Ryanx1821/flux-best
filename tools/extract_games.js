const fs = require('fs');
const html = fs.readFileSync('visuals_home.html', 'utf8');

const regex = /<figure[^>]*>([\s\S]*?)<\/figure>/g;
let m;
const games = [];
while ((m = regex.exec(html)) !== null) {
  const fig = m[1];
  const wpMatch = fig.match(/src="([^"]+wallpaper[^"]*|[^"]+backgound[^"]*|[^"]+background[^"]*|[^"]+images%2F[^"]+)"/i) || fig.match(/srcSet="([^",\s]+)/i);
  const logoMatch = fig.match(/src="([^"]+logo[^"]*)"/i) || fig.match(/srcSet="([^"]+logo[^"]*)/i);
  const nameMatch = fig.match(/<figcaption[^>]*>(.*?)<\/figcaption>/);
  games.push({
    name: nameMatch ? nameMatch[1] : '',
    wallpaper: wpMatch ? decodeURIComponent(wpMatch[1]) : '',
    logo: logoMatch ? decodeURIComponent(logoMatch[1]) : '',
    raw: fig
  });
}
console.log(JSON.stringify(games, null, 2));
