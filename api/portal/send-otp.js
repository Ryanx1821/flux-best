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

// Global OTP store for serverless instance lifetime
global.__fluxOtpStore = global.__fluxOtpStore || new Map();

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
    const email = (data.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ success: false, error: 'Please enter a valid email address.' }));
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    global.__fluxOtpStore.set(email, {
      otp,
      expiresAt: Date.now() + 15 * 60 * 1000
    });

    console.log(`[CUSTOMER PORTAL] OTP generated for ${email}: ${otp}`);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      message: 'A 6-digit verification code has been sent to your email.',
      email,
      otp // Provided for instant demo verification
    }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: err.message }));
  }
};
