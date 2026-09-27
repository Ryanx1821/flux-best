const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public', 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Fix Spelling Errors
content = content.replace(
  '<meta name="description" content="Bring your experiance from a 0 to a 10 with our premium cheats, designed to find your max patential while domenating every game." />',
  '<meta name="description" content="Bring your experience from a 0 to a 10 with our premium cheats, designed to find your max potential while dominating every game." />'
);

content = content.replace(
  'Unlock Your Full Patential<br />',
  'Unlock Your Full Potential<br />'
);

content = content.replace(
  'Bring your experiance from a 0 to a 10 with our premium cheats, designed to find your max patential while domenating every game.',
  'Bring your experience from a 0 to a 10 with our premium cheats, designed to find your max potential while dominating every game.'
);

// 2. Fix Title
content = content.replace(
  '<title>Flux — High Velocity Infrastructure & Tools | visuals.gg</title>',
  '<title>Flux — High Velocity Infrastructure & Tools | fluxcheats.vip</title>'
);

// 3. Clean Prompt-like Comments & Leftovers
content = content.replace(
  '/* Animated Blurred Angled White Lines (Hero Banner Only - visuals.gg style) */',
  '/* Animated Blurred Angled White Lines (Hero Banner Only) */'
);

content = content.replace(
  '<!-- Animated Blurred Angled White Lines (Hero Banner Only - visuals.gg style) -->',
  '<!-- Animated Blurred Angled White Lines (Hero Banner Only) -->'
);

content = content.replace(
  '<!-- Breadcrumbs & Category Bar matching visuals.gg -->',
  '<!-- Breadcrumbs & Category Bar -->'
);

content = content.replace(
  '<!-- Controls: Category Dropdown & Search matching visuals.gg -->',
  '<!-- Controls: Category Dropdown & Search -->'
);

content = content.replace(
  '<!-- ==================== VIEW 5: DEDICATED PRODUCT DETAIL PAGE (VISUALS.GG STYLE) ==================== -->',
  '<!-- ==================== VIEW 5: DEDICATED PRODUCT DETAIL PAGE ==================== -->'
);

content = content.replace(
  '<!-- Ambient Background Glows matching visuals.gg -->',
  '<!-- Ambient Background Glows -->'
);

content = content.replace(
  '<!-- Breadcrumbs matching visuals.gg: icon / product / <name> -->',
  '<!-- Breadcrumbs: icon / product / <name> -->'
);

content = content.replace(
  '<!-- Right: Variants & Action Buttons matching visuals.gg -->',
  '<!-- Right: Variants & Action Buttons -->'
);

content = content.replace(
  '<!-- Requirements Section matching visuals.gg exactly -->',
  '<!-- Requirements Section -->'
);

content = content.replace(
  '<!-- Features Section matching visuals.gg exactly -->',
  '<!-- Features Section -->'
);

content = content.replace(
  '<!-- ==================== PORTAL AUTHENTICATION CARD (visuals.gg/dashboard design) ==================== -->',
  '<!-- ==================== PORTAL AUTHENTICATION CARD ==================== -->'
);

content = content.replace(
  '<!-- Website Logo inside circular border (exact visuals.gg) -->',
  '<!-- Website Logo inside circular border -->'
);

content = content.replace(
  '<!-- Step 1: Email Form (visuals.gg form) -->',
  '<!-- Step 1: Email Form -->'
);

content = content.replace(
  '<!-- Step 2: OTP Form (visuals.gg input-otp style) -->',
  '<!-- Step 2: OTP Form -->'
);

// 4. Marquee hover pause
if (!content.includes('.marquee-track:hover')) {
  content = content.replace(
    '.marquee-track {',
    '.marquee-track:hover {\n      animation-play-state: paused !important;\n      -webkit-animation-play-state: paused !important;\n    }\n    .marquee-track {'
  );
}

// 5. Replace Hero trust badge
content = content.replace(
  '<span class="tracking-wide">Thousands Of Satisfied Customers</span>',
  '<span class="tracking-wide">Trusted by 10,000+ Active Players</span>'
);

// 6. Replace Best Sellers Subtitle
content = content.replace(
  '<p class="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-2">Products that are loved by our customers</p>',
  '<p class="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mt-2">Top-rated undetected solutions engineered for competitive performance.</p>'
);

// 7. Replace Best Sellers 3-card section
const oldCardsPattern = /<div class="relative mx-auto mt-10 grid w-full grid-flow-row gap-4 sm:grid-cols-2 lg:grid-cols-3">[\s\S]*?<\/div>\s*<\/div>\s*<div class="home-enter delay-800 mt-12 text-center">/;

const newCardsHtml = `<div class="relative mx-auto mt-10 grid w-full grid-flow-row gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <!-- Card 1: Temp Spoofer (#1 Best Seller) -->
          <div class="home-enter delay-500 group relative z-40 w-full rounded-3xl border border-white/[0.08] bg-white bg-opacity-[0.04] p-2 shadow-lg backdrop-blur-sm hover:border-red-500/40 transition-all duration-300">
            <div onclick="openProductPurchase('Temp Spoofer')" class="relative h-[200px] cursor-pointer overflow-hidden rounded-3xl bg-zinc-950">
              <img src="/1055195.webp" alt="Temp Spoofer" class="h-full w-full rounded-3xl object-cover duration-200 group-hover:scale-105" />
              <div class="absolute top-3 left-3 z-20">
                <div class="flame-badge-container">
                  <div class="flame-particle flame-1"></div>
                  <div class="flame-particle flame-2"></div>
                  <div class="flame-particle flame-3"></div>
                  <div class="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(225,29,72,0.8)] border border-red-400/40">
                    <i data-lucide="flame" class="w-3 h-3 fill-white text-yellow-200"></i>
                    <span>#1 BEST SELLER</span>
                  </div>
                </div>
              </div>
              <div class="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono font-semibold shadow-md text-emerald-400 border border-emerald-500/30">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Undetected</span>
              </div>
            </div>
            <div class="flex flex-1 flex-col gap-2 p-2">
              <h3 class="flex flex-wrap items-center gap-1.5 text-xl font-semibold text-white tracking-tight">
                Temp Spoofer
                <span class="ml-1 rounded-md border border-white/[0.08] bg-white/[0.06] px-2 py-0.5 text-xs text-zinc-300 shadow-md font-mono">HWID</span>
              </h3>
              <div class="mt-2 flex w-full flex-row items-end gap-4">
                <button onclick="openProductPurchase('Temp Spoofer')" class="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors hover:bg-[#34373e] px-4 py-2 h-12 w-full rounded-full border border-white/[0.1] bg-[#2A2C32] text-white shadow-lg drop-shadow-lg cursor-pointer">
                  <i data-lucide="shopping-cart" class="w-4 h-4 text-white"></i>
                  <span>Buy Now</span>
                </button>
                <div class="outfit flex flex-col shrink-0">
                  <span class="text-end text-xs text-zinc-400">Starting at</span>
                  <span class="text-3xl font-bold text-red-500"><span class="mr-0.5 text-xl">$</span>4.99</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2: Skyra Rust (Top Rated) -->
          <div class="home-enter delay-600 group relative z-40 w-full rounded-3xl border border-white/[0.08] bg-white bg-opacity-[0.04] p-2 shadow-lg backdrop-blur-sm hover:border-emerald-500/40 transition-all duration-300">
            <div onclick="openProductPurchase('Skyra Rust')" class="relative h-[200px] cursor-pointer overflow-hidden rounded-3xl bg-zinc-950">
              <img src="/1058939.webp" alt="Skyra Rust" class="h-full w-full rounded-3xl object-cover duration-200 group-hover:scale-105" />
              <div class="absolute top-3 left-3 z-20">
                <div class="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-400/40">
                  <i data-lucide="zap" class="w-3 h-3 fill-white text-emerald-200"></i>
                  <span>TOP RATED</span>
                </div>
              </div>
              <div class="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono font-semibold shadow-md text-emerald-400 border border-emerald-500/30">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Undetected</span>
              </div>
            </div>
            <div class="flex flex-1 flex-col gap-2 p-2">
              <h3 class="flex flex-wrap items-center gap-1.5 text-xl font-semibold text-white tracking-tight">
                Skyra Rust
                <span class="ml-1 rounded-md border border-white/[0.08] bg-white/[0.06] px-2 py-0.5 text-xs text-zinc-300 shadow-md font-mono">RUST</span>
              </h3>
              <div class="mt-2 flex w-full flex-row items-end gap-4">
                <button onclick="openProductPurchase('Skyra Rust')" class="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors hover:bg-[#34373e] px-4 py-2 h-12 w-full rounded-full border border-white/[0.1] bg-[#2A2C32] text-white shadow-lg drop-shadow-lg cursor-pointer">
                  <i data-lucide="shopping-cart" class="w-4 h-4 text-white"></i>
                  <span>Buy Now</span>
                </button>
                <div class="outfit flex flex-col shrink-0">
                  <span class="text-end text-xs text-zinc-400">Starting at</span>
                  <span class="text-3xl font-bold text-red-500"><span class="mr-0.5 text-xl">$</span>6.99</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 3: Vega Rainbow 6 Siege (Featured) -->
          <div class="home-enter delay-700 group relative z-40 w-full rounded-3xl border border-white/[0.08] bg-white bg-opacity-[0.04] p-2 shadow-lg backdrop-blur-sm hover:border-amber-500/40 transition-all duration-300">
            <div onclick="openProductPurchase('Vega Rainbow 6 Siege')" class="relative h-[200px] cursor-pointer overflow-hidden rounded-3xl bg-zinc-950">
              <img src="/1058932.webp" alt="Vega Rainbow 6 Siege" class="h-full w-full rounded-3xl object-cover duration-200 group-hover:scale-105" />
              <div class="absolute top-3 left-3 z-20">
                <div class="relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-400/40">
                  <i data-lucide="star" class="w-3 h-3 fill-white text-yellow-200"></i>
                  <span>FEATURED</span>
                </div>
              </div>
              <div class="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono font-semibold shadow-md text-emerald-400 border border-emerald-500/30">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Undetected</span>
              </div>
            </div>
            <div class="flex flex-1 flex-col gap-2 p-2">
              <h3 class="flex flex-wrap items-center gap-1.5 text-xl font-semibold text-white tracking-tight">
                Vega Rainbow 6 Siege
                <span class="ml-1 rounded-md border border-white/[0.08] bg-white/[0.06] px-2 py-0.5 text-xs text-zinc-300 shadow-md font-mono">R6 SIEGE</span>
              </h3>
              <div class="mt-2 flex w-full flex-row items-end gap-4">
                <button onclick="openProductPurchase('Vega Rainbow 6 Siege')" class="duration-200 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors hover:bg-[#34373e] px-4 py-2 h-12 w-full rounded-full border border-white/[0.1] bg-[#2A2C32] text-white shadow-lg drop-shadow-lg cursor-pointer">
                  <i data-lucide="shopping-cart" class="w-4 h-4 text-white"></i>
                  <span>Buy Now</span>
                </button>
                <div class="outfit flex flex-col shrink-0">
                  <span class="text-end text-xs text-zinc-400">Starting at</span>
                  <span class="text-3xl font-bold text-red-500"><span class="mr-0.5 text-xl">$</span>7.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="home-enter delay-800 mt-12 text-center">`;

content = content.replace(oldCardsPattern, newCardsHtml);

// 8. Update BEST_SELLER_NAMES constant in script
content = content.replace(
  "const BEST_SELLER_NAMES = ['Temp Spoofer', 'Skyra Rust', 'Arcane Rust'];",
  "const BEST_SELLER_NAMES = ['Temp Spoofer', 'Skyra Rust', 'Vega Rainbow 6 Siege'];"
);

// 9. Build the 10 game banner cards for the marquee
function buildGameCard(game, title, wallpaper, logo) {
  let logoImg = logo ? `<img src="${logo}" alt="${title} Logo" class="max-h-12 max-w-[160px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] mb-2 group-hover:scale-105 transition-transform duration-300" />` : '';
  return `          <!-- ${title} -->
          <div onclick="filterStoreByGame('${game}')" class="group relative flex flex-col justify-end h-80 w-64 cursor-pointer rounded-2xl border border-white/[0.08] hover:border-red-500/50 bg-[#0d0d12] overflow-hidden duration-300 hover:scale-[1.03] shrink-0 shadow-xl shadow-black/60">
            <img src="${wallpaper}" alt="${title}" class="absolute inset-0 h-full w-full object-cover duration-300 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/60 to-transparent"></div>
            <div class="relative z-10 flex flex-col items-center justify-end p-5 text-center">
              ${logoImg}
              <span class="text-xs sm:text-sm font-bold text-white tracking-wider group-hover:text-red-400 transition-colors uppercase font-mono">${title}</span>
            </div>
          </div>`;
}

const gamesList = [
  { game: 'Rust', title: 'Rust', wallpaper: '/images/rust-wallpaper.jpg', logo: '/images/rust-steam-logo.png' },
  { game: 'Fortnite', title: 'Fortnite', wallpaper: '/images/fortnite-wallpaper.png', logo: '/images/fortnite-clean.svg' },
  { game: 'Rainbow Six Siege', title: 'Rainbow 6 Siege', wallpaper: '/images/rs6-wallpaper.png', logo: '/images/rs6-logo.png' },
  { game: 'Valorant', title: 'Valorant', wallpaper: '/images/valorant-wallpaper.webp', logo: '/images/valorant-clean.svg' },
  { game: 'Arc Raiders', title: 'Arc Raiders', wallpaper: '/images/arc-raiders-wallpaper.jpg', logo: '/images/arc-raiders-logo.png' },
  { game: 'Apex Legends', title: 'Apex Legends', wallpaper: '/images/apex-wallpaper.png', logo: '/images/apex-legends-logo.png' },
  { game: 'Counter Strike', title: 'Counter-Strike', wallpaper: '/images/cs-wallpaper.png', logo: '/images/cs-go-logo.png' },
  { game: 'Escape From Tarkov', title: 'Escape From Tarkov', wallpaper: '/images/eft-wallpaper.png', logo: '/images/eft-logo.png' },
  { game: 'Grand Theft Auto', title: 'Grand Theft Auto', wallpaper: '/images/gta6-wallpaper.png', logo: '/images/gta-logo.png' },
  { game: 'HWID Spoofer', title: 'HWID Spoofer', wallpaper: '/1055195.webp', logo: '' }
];

const firstHalfCards = gamesList.map(g => buildGameCard(g.game, g.title, g.wallpaper, g.logo)).join('\n');
const secondHalfCards = gamesList.map(g => buildGameCard(g.game, g.title, g.wallpaper, g.logo)).join('\n');

const newMarqueeTrackHtml = `<div class="marquee-track">
          <!-- FIRST HALF (10 GAME BANNER CARDS) -->
${firstHalfCards}
          <!-- SECOND HALF (DUPLICATE FOR SEAMLESS INFINITE LOOP) -->
${secondHalfCards}
        </div>`;

const marqueePattern = /<div class="marquee-track">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
content = content.replace(marqueePattern, `${newMarqueeTrackHtml}\n      </div>\n    </section>`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated public/index.html with all fixes!');
