const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 4173;
const dir = __dirname;
const publicDir = path.join(dir, 'public');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json'
};

// Route mapping to serverless functions in api/
const apiRoutes = {
  '/api/products': require('./api/products'),
  '/api/categories': require('./api/categories'),
  '/api/checkout': require('./api/checkout'),
  '/api/portal/send-otp': require('./api/portal/send-otp'),
  '/api/portal/verify-otp': require('./api/portal/verify-otp'),
  '/api/portal/data': require('./api/portal/data')
};

function resolveStaticPath(pathname) {
  let reqPath = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  
  // Try public folder first
  let publicPath = path.join(publicDir, reqPath);
  if (fs.existsSync(publicPath) && !fs.statSync(publicPath).isDirectory()) {
    return publicPath;
  }

  // Try root folder fallback
  let rootPath = path.join(dir, reqPath);
  if (fs.existsSync(rootPath) && !fs.statSync(rootPath).isDirectory()) {
    return rootPath;
  }

  // Fallback to index.html for SPA
  if (fs.existsSync(path.join(publicDir, 'index.html'))) {
    return path.join(publicDir, 'index.html');
  }
  return path.join(dir, 'index.html');
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  // Check if request matches an API route
  if (apiRoutes[pathname]) {
    try {
      await apiRoutes[pathname](req, res);
    } catch (err) {
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
    }
    return;
  }

  // Handle SPA product routes: /product/:slug -> index.html
  if (pathname.startsWith('/product/')) {
    const indexPath = fs.existsSync(path.join(publicDir, 'index.html'))
      ? path.join(publicDir, 'index.html')
      : path.join(dir, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(indexPath).pipe(res);
    return;
  }

  // Serve static file
  const fullPath = resolveStaticPath(pathname);
  const ext = path.extname(fullPath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      // If a numeric .webp image was requested from SellAuth (e.g. /1152335.webp), stream and cache from SellAuth
      const imgMatch = pathname.match(/^\/(\d+)\.webp$/);
      if (imgMatch) {
        const imgId = imgMatch[1];
        const remoteUrl = `https://api.sellauth.com/storage/images/${imgId}.webp`;
        const https = require('https');
        https.get(remoteUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (upstreamRes) => {
          if (upstreamRes.statusCode === 200) {
            res.writeHead(200, { 'Content-Type': 'image/webp' });
            const chunks = [];
            upstreamRes.on('data', chunk => {
              chunks.push(chunk);
              res.write(chunk);
            });
            upstreamRes.on('end', () => {
              res.end();
              try {
                fs.writeFileSync(path.join(publicDir, `${imgId}.webp`), Buffer.concat(chunks));
              } catch (_) {}
            });
            return;
          }
          res.writeHead(404);
          res.end('Image not found');
        }).on('error', () => {
          res.writeHead(404);
          res.end('Image error');
        });
        return;
      }

      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`SELLAUTH_FLUX_SERVER_ACTIVE http://127.0.0.1:${PORT}`);
});
