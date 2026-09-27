# FLUX Storefront & Customer Portal

Modern, dark glassmorphic digital storefront and customer portal powered by **SellAuth**. Built for high conversion, zero external redirect disruption, and instantaneous digital product delivery.

---

## 🚀 Features

- **Live SellAuth Integration**:
  - Live product & variant catalog sync (`/api/products`)
  - Live category filtering (`/api/categories`)
  - Seamless in-app express checkout creating real SellAuth invoices (`/api/checkout`)
  - Live telemetry & detection status monitoring
- **Customer Portal**:
  - Email-based OTP authentication (`/api/portal/send-otp` & `/api/portal/verify-otp`)
  - Active license key vault with 1-click copy
  - Invoice history & loader tutorial links
- **Modern Performance & Design**:
  - Pure zero-framework frontend (Tailwind CDN, Lucide icons)
  - Ultra-fast serverless API endpoints ready for Vercel
  - Responsive across all mobile, tablet, and desktop viewports

---

## 📁 Project Structure

```
flux/
├── api/                             # Vercel Serverless Functions
│   ├── products.js                  # GET /api/products (SellAuth proxy + cache)
│   ├── categories.js                # GET /api/categories (SellAuth proxy + cache)
│   ├── checkout.js                  # POST /api/checkout (SellAuth invoice creator)
│   └── portal/                      # Customer Portal API
│       ├── send-otp.js              # POST /api/portal/send-otp
│       ├── verify-otp.js            # POST /api/portal/verify-otp
│       └── data.js                  # GET /api/portal/data
├── public/                          # Static CDN Assets (Served automatically at /)
│   ├── index.html                   # Storefront SPA
│   ├── styles.css                   # Glassmorphic style overrides
│   ├── *.webp, *.png, *.svg         # High-resolution product cards & banners
│   └── images/                      # Brand logos & game artwork
├── products.json                    # Offline fallback catalog
├── categories.json                  # Category mappings
├── server.js                        # Local development server (port 4173)
├── vercel.json                      # Vercel routing & caching rules
├── package.json                     # Scripts & metadata
├── tools/                           # Build & verification utilities
└── .gitignore                       # Git ignore configuration
```

---

## 💻 Local Development

Run the storefront locally with zero external npm dependencies:

```bash
# Start local server on http://127.0.0.1:4173
npm start
```

Or directly via Node:
```bash
node server.js
```

Then open `http://127.0.0.1:4173` in your browser.

---

## ☁️ Deploy to Vercel

1. Push this repository to **GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: FLUX Storefront"
   git branch -M main
   git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.
3. In **Project Settings**:
   - **Framework Preset**: *Other*
   - **Root Directory**: `./`
   - **Build Command**: Leave empty (none required)
   - **Output Directory**: Leave empty
4. *(Optional)* Add Environment Variables in the Vercel dashboard:
   - `SELLAUTH_API_KEY`: Your SellAuth Bearer API Key
   - `SELLAUTH_SHOP_ID`: Your SellAuth Shop ID (default: `250037`)
5. Click **Deploy**. Vercel will deploy the static site and all serverless functions in `api/` automatically!

---

## 🛠️ Maintenance & Verification Tools

- **Verify script syntax**:
  ```bash
  npm test
  ```
- **Synchronize build file**:
  ```bash
  npm run sync
  ```
