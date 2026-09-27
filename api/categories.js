const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.SELLAUTH_API_KEY || '6160494|Y9IKUAA61gVnz5GbE0ZNYYfkS6bPDga0qOmHqYF82a497888';
const SHOP_ID = process.env.SELLAUTH_SHOP_ID || '250037';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  const options = {
    hostname: 'api.sellauth.com',
    path: `/v1/shops/${SHOP_ID}/categories`,
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (FluxStorefront/1.0)'
    }
  };

  return new Promise((resolve) => {
    const apiReq = https.request(options, (apiRes) => {
      let body = '';
      apiRes.on('data', chunk => body += chunk);
      apiRes.on('end', () => {
        res.statusCode = apiRes.statusCode || 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(body);
        resolve();
      });
    });

    apiReq.on('error', () => {
      try {
        const fallbackPath = path.join(process.cwd(), 'categories.json');
        if (fs.existsSync(fallbackPath)) {
          const fallbackData = fs.readFileSync(fallbackPath, 'utf8');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(fallbackData);
        } else {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Failed to fetch categories from upstream' }));
        }
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
      resolve();
    });

    apiReq.end();
  });
};
