const https = require('https');

const API_KEY = process.env.SELLAUTH_API_KEY || '6160494|Y9IKUAA61gVnz5GbE0ZNYYfkS6bPDga0qOmHqYF82a497888';
const SHOP_ID = process.env.SELLAUTH_SHOP_ID || '250037';

function getParsedBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  if (typeof req.body === 'string') {
    try { return Promise.resolve(JSON.parse(req.body)); } catch (e) { return Promise.resolve({}); }
  }
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (e) { resolve({}); }
    });
    req.on('error', () => resolve({}));
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
  }

  try {
    const data = await getParsedBody(req);
    const email = (data.email || '').trim();
    const cartItems = Array.isArray(data.cart) ? data.cart : [];
    const coupon = (data.coupon || '').trim();

    if (!email || !email.includes('@')) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, error: 'Valid delivery email address is required.' }));
    }

    if (cartItems.length === 0) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, error: 'Cart is empty. Please select a product.' }));
    }

    const sellauthCart = cartItems.map(item => ({
      productId: parseInt(item.productId || item.product_id, 10),
      variantId: parseInt(item.variantId || item.variant_id, 10),
      quantity: Math.max(1, parseInt(item.quantity, 10) || 1)
    }));

    const sellauthPayload = {
      shopId: parseInt(SHOP_ID, 10),
      email: email,
      cart: sellauthCart
    };

    if (coupon) {
      sellauthPayload.coupon = coupon;
    }

    const postBody = JSON.stringify(sellauthPayload);

    const options = {
      hostname: 'api.sellauth.com',
      path: `/v1/shops/${SHOP_ID}/checkout`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(postBody),
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
          try {
            const parsed = JSON.parse(body);
            res.end(JSON.stringify(parsed));
          } catch (e) {
            res.end(body);
          }
          resolve();
        });
      });

      apiReq.on('error', (err) => {
        res.statusCode = 502;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'SellAuth checkout gateway error: ' + err.message }));
        resolve();
      });

      apiReq.write(postBody);
      apiReq.end();
    });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
};
