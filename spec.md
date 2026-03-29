# Da Pang Memecoin Website

## Current State
New project, no existing application files.

## Requested Changes (Diff)

### Add
- Full memecoin landing page for Da Pang ($PANG) on Solana
- Hero section: corgi mascot image, glowing animated title, CA display with copy button
- Scrolling marquee: "da pang" repeated
- Live token stats via DexScreener public REST API (market cap, liquidity, volume, holders)
- DexScreener embedded live chart (full width iframe)
- Jupiter Terminal swap widget embed
- How to Buy step-by-step section
- Community/social proof section with Twitter/X tweet embeds showing viral 26M view story
- FAQ section with accordion
- Footer with TG, X, CA links
- Mobile-responsive layout
- Mobile bottom navigation bar
- Sticky desktop navbar

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Hero: full-screen, corgi image `/assets/uploads/img_4070-019d3752-2414-772e-8036-b0c254de95d4-1.jpeg`, golden glow, animated text
2. Marquee component scrolling "da pang"
3. Stats bar: fetch from `https://api.dexscreener.com/latest/dex/tokens/CpP36fvZmbcDUH9tQihQZTcvH2ApwRzHh2pPojyWpump` and display price, mcap, volume, liquidity
4. DexScreener chart iframe embed: `https://dexscreener.com/solana/CpP36fvZmbcDUH9tQihQZTcvH2ApwRzHh2pPojyWpump?embed=1&theme=dark`
5. Jupiter Terminal: load script `https://terminal.jup.ag/main-v2.js` and init with inputMint SOL, outputMint CA
6. How to Buy: 4 steps (Get Solana wallet, Buy SOL, Go to Jupiter, Swap for $PANG)
7. Community section: embed 2-3 Twitter tweets via blockquote Twitter embed
8. FAQ accordion
9. Footer + social links
10. Mobile nav bar fixed at bottom with Home/Buy/Chart/Community icons
