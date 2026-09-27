const url = require('url');

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
    return res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
  }

  const parsedUrl = url.parse(req.url, true);
  const email = (parsedUrl.query && parsedUrl.query.email ? parsedUrl.query.email : '').trim().toLowerCase();

  const orders = [
    {
      id: 'ba114f45-200b-40de-bc3d-29f873d5f002',
      product: 'Stealth',
      category: 'RXST',
      variant: '1 Day',
      status: 'Undetected',
      statusColor: '#2ecc71',
      key: 'ZCOUIAKH3D6ON9VO',
      date: '12/09/2026 - 04:05 PM',
      image: '/1058939.webp',
      loaderUrl: 'https://discord.gg/invite/fluxcheatsvip',
      instructionsUrl: 'https://discord.gg/invite/fluxcheatsvip',
      tutorialUrl: 'https://discord.gg/invite/fluxcheatsvip',
      price: '$6.99'
    },
    {
      id: '9c43d812-71fa-40ea-9ef3-51b8c199042a',
      product: 'Temp Spoofer',
      category: 'HWID',
      variant: 'Month',
      status: 'Undetected',
      statusColor: '#2ecc71',
      key: 'FLUX-SPOOF-88921-XKQ',
      date: '11/28/2026 - 08:30 PM',
      image: '/1055195.webp',
      loaderUrl: 'https://discord.gg/invite/fluxcheatsvip',
      instructionsUrl: 'https://discord.gg/invite/fluxcheatsvip',
      tutorialUrl: 'https://discord.gg/invite/fluxcheatsvip',
      price: '$32.00'
    }
  ];

  const invoices = [
    {
      id: 'INV-ba114f45',
      orderId: 'ba114f45-200b-40de-bc3d-29f873d5f002',
      description: 'Stealth (RXST 1 Day License)',
      amount: '$6.99',
      status: 'Paid',
      statusColor: '#2ecc71',
      date: '12/09/2026 - 04:05 PM',
      method: 'Credit Card / Crypto'
    },
    {
      id: 'INV-9c43d812',
      orderId: '9c43d812-71fa-40ea-9ef3-51b8c199042a',
      description: 'Temp Spoofer (HWID Month Key)',
      amount: '$32.00',
      status: 'Paid',
      statusColor: '#2ecc71',
      date: '11/28/2026 - 08:30 PM',
      method: 'SellAuth Checkout'
    }
  ];

  const dashboard = {
    invoicesCount: invoices.length,
    paidInvoicesCount: invoices.filter(i => i.status === 'Paid').length,
    totalSpent: '$38.99',
    balance: '$0.00'
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    success: true,
    email: email || 'customer@flux.gg',
    dashboard,
    orders,
    invoices
  }));
};
