import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Activity,
  BarChart2,
  Check,
  Copy,
  DollarSign,
  Droplets,
  ExternalLink,
  Eye,
  Heart,
  HelpCircle,
  Home,
  Menu,
  Repeat2,
  ShoppingCart,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SiTelegram } from "react-icons/si";
import { SiX } from "react-icons/si";
import { toast } from "sonner";

const CA = "CpP36fvZmbcDUH9tQihQZTcvH2ApwRzHh2pPojyWpump";
const TG_URL = "https://t.me/DaPangOfficialCTO";
const X_URL = "https://twitter.com/i/communities/2037870613331575266";
const JUPITER_URL = `https://jup.ag/swap/SOL-${CA}`;
const DEXSCREENER_API = `https://api.dexscreener.com/latest/dex/tokens/${CA}`;

interface TokenStats {
  price: string;
  marketCap: string;
  volume24h: string;
  liquidity: string;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

function formatPrice(n: number): string {
  if (n < 0.000001) return `$${n.toExponential(3)}`;
  if (n < 0.01) return `$${n.toFixed(8)}`;
  return `$${n.toFixed(6)}`;
}

function useTokenStats() {
  const [stats, setStats] = useState<TokenStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetch_ = useCallback(async () => {
    try {
      const res = await fetch(DEXSCREENER_API);
      const data = await res.json();
      const pair = data?.pairs?.[0];
      if (!pair) throw new Error("No pair");
      setStats({
        price: formatPrice(Number.parseFloat(pair.priceUsd || "0")),
        marketCap: formatNumber(pair.marketCap || 0),
        volume24h: formatNumber(pair.volume?.h24 || 0),
        liquidity: formatNumber(pair.liquidity?.usd || 0),
      });
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch_();
    const interval = setInterval(fetch_, 30000);
    return () => clearInterval(interval);
  }, [fetch_]);

  return { stats, loading, error };
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "#home" },
    { label: "Tokenomics", href: "#tokenomics" },
    { label: "Chart", href: "#chart" },
    { label: "Buy", href: "#buy" },
    { label: "Community", href: "#community" },
    { label: "FAQ", href: "#faq" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="font-display font-800 text-xl tracking-tight"
        >
          <span className="gradient-text">DA PANG</span> 🐕
        </a>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-ocid={`nav.${l.label.toLowerCase()}.link`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SiTelegram size={20} />
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <SiX size={18} />
          </a>
          <Button asChild className="btn-golden rounded-full px-5 h-9 text-sm">
            <a
              href={JUPITER_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.buy.button"
            >
              Buy $PANG
            </a>
          </Button>
        </div>
        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="btn-golden w-full mt-3 rounded-full">
            <a href={JUPITER_URL} target="_blank" rel="noopener noreferrer">
              Buy $PANG
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}

function MobileBottomNav() {
  const items = [
    { icon: <Home size={20} />, label: "Home", href: "#home" },
    { icon: <BarChart2 size={20} />, label: "Chart", href: "#chart" },
    { icon: <ShoppingCart size={20} />, label: "Buy", href: "#buy" },
    { icon: <Users size={20} />, label: "Community", href: "#community" },
    { icon: <HelpCircle size={20} />, label: "FAQ", href: "#faq" },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border mobile-nav-safe">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            data-ocid={`mobile-nav.${item.label.toLowerCase()}.link`}
            className="flex flex-col items-center gap-0.5 px-3 py-1 text-muted-foreground hover:text-primary transition-colors"
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function Marquee({ flip = false }: { flip?: boolean }) {
  const text =
    "🐕 DA PANG 🚀 CpP36fvZmbcDUH9tQihQZTcvH2ApwRzHh2pPojyWpump 🔥 26M VIEWS 💎 THE LEGEND LIVES 🌟 DA PANG 🐕";
  const repeated = `${text}    ${text}    `;
  return (
    <div
      className="overflow-hidden py-3 border-y border-border bg-card"
      style={{ direction: flip ? "rtl" : "ltr" }}
    >
      <div
        className="marquee-track"
        style={flip ? { animationDirection: "reverse" } : {}}
      >
        <span className="gradient-text font-display font-700 text-sm tracking-wide whitespace-nowrap px-8">
          {repeated}
        </span>
        <span className="gradient-text font-display font-700 text-sm tracking-wide whitespace-nowrap px-8">
          {repeated}
        </span>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("CA copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={copy}
      data-ocid="hero.ca.button"
      className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-xs font-mono text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all group"
    >
      <span className="max-w-[160px] sm:max-w-[280px] truncate">{text}</span>
      {copied ? (
        <Check size={14} className="text-chart-2 shrink-0" />
      ) : (
        <Copy
          size={14}
          className="shrink-0 group-hover:text-primary transition-colors"
        />
      )}
    </button>
  );
}

function HeroSection() {
  return (
    <section
      id="home"
      className="hero-bg min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-32 md:pb-16 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.75 0.15 55 / 0.06) 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Corgi image */}
        <div className="fade-up mb-6">
          <img
            src="/assets/uploads/img_4070-019d3752-2414-772e-8036-b0c254de95d4-1.jpeg"
            alt="Dà Pàng - The Heroic Chubby Corgi"
            className="corgi-glow w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-primary/40"
          />
        </div>
        <div className="fade-up fade-up-delay-1">
          <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4">
            <span className="badge-green w-2 h-2 rounded-full bg-current inline-block animate-pulse" />
            Live on Solana
          </div>
        </div>
        <h1 className="fade-up fade-up-delay-1 font-display font-extrabold text-5xl md:text-7xl lg:text-8xl mb-4 leading-none">
          <span className="gradient-text">Dà Pàng</span>
        </h1>
        <p className="fade-up fade-up-delay-2 text-xl md:text-2xl text-muted-foreground font-medium mb-2">
          The Legendary Chubby Corgi 🐕‍🦺
        </p>
        <p className="fade-up fade-up-delay-2 text-base text-muted-foreground mb-6 max-w-xl">
          26M+ viral views. The heroic dog who led a stolen pack 17km back to
          freedom. <br className="hidden sm:block" />
          Now immortalized on Solana.
        </p>
        <div className="fade-up fade-up-delay-3 mb-8">
          <CopyButton text={CA} />
        </div>
        <div className="fade-up fade-up-delay-4 flex flex-col sm:flex-row items-center gap-3 mb-8">
          <Button
            asChild
            className="btn-golden rounded-full h-12 px-8 text-base"
          >
            <a
              href={JUPITER_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.buy.button"
            >
              🪐 Buy on Jupiter
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-full h-12 px-8 text-base border-border hover:border-primary/50"
          >
            <a href="#chart" data-ocid="hero.chart.button">
              <BarChart2 size={16} className="mr-2" /> View Chart
            </a>
          </Button>
        </div>
        <div className="fade-up fade-up-delay-4 flex items-center gap-4">
          <a
            href={TG_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.tg.link"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <SiTelegram size={18} /> Telegram
          </a>
          <span className="text-border">·</span>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.x.link"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <SiX size={16} /> Community
          </a>
        </div>
      </div>
    </section>
  );
}

function TokenomicsSection() {
  const { stats, loading } = useTokenStats();

  const cards = [
    {
      label: "Price",
      value: stats?.price,
      icon: <DollarSign size={20} />,
      suffix: "",
    },
    {
      label: "Market Cap",
      value: stats?.marketCap,
      icon: <TrendingUp size={20} />,
      suffix: "",
    },
    {
      label: "24h Volume",
      value: stats?.volume24h,
      icon: <Activity size={20} />,
      suffix: "",
    },
    {
      label: "Liquidity",
      value: stats?.liquidity,
      icon: <Droplets size={20} />,
      suffix: "",
    },
  ];

  return (
    <section id="tokenomics" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
            <span className="gradient-text">Tokenomics</span>
          </h2>
          <p className="text-muted-foreground">
            Live data from DexScreener — refreshes every 30 seconds
          </p>
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          data-ocid="tokenomics.section"
        >
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="stat-card bg-card border border-border rounded-2xl p-5 text-center"
              data-ocid={`tokenomics.card.${i + 1}`}
            >
              <div className="flex justify-center mb-3 text-primary">
                {card.icon}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                {card.label}
              </div>
              {loading ? (
                <div
                  className="h-7 w-24 mx-auto bg-muted rounded animate-pulse"
                  data-ocid="tokenomics.loading_state"
                />
              ) : (
                <div className="font-display font-extrabold text-2xl text-foreground">
                  {card.value ?? "—"}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Tokenomics details */}
        <div className="mt-12 grid md:grid-cols-3 gap-4 text-center">
          {[
            { label: "Tax", value: "0%", desc: "Buy & Sell" },
            { label: "Network", value: "Solana", desc: "Fast & cheap" },
            { label: "Supply", value: "1B", desc: "$PANG tokens" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="bg-card border border-border rounded-2xl p-5"
              data-ocid={`tokenomics.detail.${i + 1}`}
            >
              <div className="font-display font-extrabold text-3xl gradient-text mb-1">
                {item.value}
              </div>
              <div className="font-semibold text-foreground text-sm">
                {item.label}
              </div>
              <div className="text-muted-foreground text-xs mt-1">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoreSection() {
  return (
    <section id="lore" className="py-20 px-4 bg-card border-y border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 badge-green border rounded-full px-3 py-1 text-xs font-semibold mb-4">
              🔥 26M+ Tweet Views
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 leading-tight">
              The Legend of <span className="gradient-text">Dà Pàng</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                In a world full of ordinary stories, Dà Pàng — meaning{" "}
                <strong className="text-foreground">"Big Fat"</strong> in
                Chinese — proved that true heroes come in the chubbiest
                packages.
              </p>
              <p>
                When dog thieves struck and stole an entire pack of dogs, Dà
                Pàng didn't sit still. This brave, round-bellied corgi somehow
                broke free from the captors and did the unthinkable:
              </p>
              <ul className="space-y-2">
                {[
                  "🐕 Led the stolen pack on a 17km journey back to freedom",
                  "📍 Navigated through unfamiliar terrain with zero GPS",
                  "💪 Kept every dog safe on the long march home",
                  "🌏 Went viral with 26M+ tweet views worldwide",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                The internet exploded. 26 million views. Millions of shares. A
                chubby corgi became a global hero — and the most bullish
                narrative for a memecoin the crypto world has ever seen.
              </p>
            </div>
            <div className="mt-8 flex gap-3">
              <Button asChild className="btn-golden rounded-full">
                <a
                  href={JUPITER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="lore.buy.button"
                >
                  Buy $PANG 🚀
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border hover:border-primary/50"
              >
                <a
                  href={X_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="lore.community.button"
                >
                  Read the Story
                </a>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.75 0.15 55 / 0.2) 0%, transparent 70%)",
                }}
              />
              <img
                src="/assets/uploads/img_4070-019d3752-2414-772e-8036-b0c254de95d4-1.jpeg"
                alt="Dà Pàng the heroic corgi"
                className="corgi-glow relative z-10 w-full max-w-sm rounded-3xl border border-primary/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChartSection() {
  return (
    <section id="chart" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
            <span className="gradient-text">Live Chart</span>
          </h2>
          <p className="text-muted-foreground">
            Real-time $PANG price action on DexScreener
          </p>
        </div>
        <div
          className="rounded-2xl overflow-hidden border border-border"
          data-ocid="chart.panel"
        >
          <iframe
            src={`https://dexscreener.com/solana/${CA}?embed=1&theme=dark&trades=1&info=0`}
            className="w-full"
            style={{ height: "600px", minHeight: "450px", border: "none" }}
            title="Da Pang Live Chart"
            allow="clipboard-write"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <a
            href={`https://dexscreener.com/solana/${CA}`}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="chart.dexscreener.link"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink size={14} /> View on DexScreener
          </a>
        </div>
      </div>
    </section>
  );
}

function BuySection() {
  const steps = [
    {
      icon: "🦊",
      title: "Get a Solana Wallet",
      desc: "Download Phantom or Solflare — the best Solana wallets, free and easy to set up.",
      link: "https://phantom.app",
      linkText: "Get Phantom",
    },
    {
      icon: "☀️",
      title: "Buy SOL",
      desc: "Purchase SOL on any major exchange (Coinbase, Binance, Kraken) and send to your wallet.",
      link: null,
      linkText: null,
    },
    {
      icon: "🪐",
      title: "Go to Jupiter",
      desc: "Visit jup.ag — the best Solana DEX aggregator for the cheapest swaps.",
      link: "https://jup.ag",
      linkText: "Open Jupiter",
    },
    {
      icon: "🐕",
      title: "Swap SOL for $PANG",
      desc: "Search for the CA below, set your slippage to 5-10% and swap!",
      link: JUPITER_URL,
      linkText: "Buy $PANG",
    },
  ];
  return (
    <section id="buy" className="py-20 px-4 bg-card border-y border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
            How to Buy <span className="gradient-text">$PANG</span>
          </h2>
          <p className="text-muted-foreground">
            Get your $PANG in 4 simple steps
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="stat-card bg-background border border-border rounded-2xl p-5"
              data-ocid={`buy.step.${i + 1}`}
            >
              <div className="text-3xl mb-3">{step.icon}</div>
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                Step {i + 1}
              </div>
              <h3 className="font-display font-bold text-base mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{step.desc}</p>
              {step.link && (
                <a
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  {step.linkText} <ExternalLink size={11} />
                </a>
              )}
            </div>
          ))}
        </div>
        {/* Jupiter embed */}
        <div
          className="rounded-2xl overflow-hidden border border-border"
          data-ocid="buy.panel"
        >
          <div className="bg-background px-5 py-4 border-b border-border flex items-center justify-between">
            <span className="font-display font-bold">🪐 Jupiter Swap</span>
            <a
              href={JUPITER_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="buy.jupiter.button"
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Open in Jupiter <ExternalLink size={12} />
            </a>
          </div>
          <iframe
            src={`https://jup.ag/swap/SOL-${CA}`}
            className="w-full"
            style={{ height: "600px", border: "none" }}
            title="Jupiter Swap"
            allow="clipboard-write"
          />
        </div>
        <div className="mt-6 p-4 bg-background rounded-xl border border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-xs text-muted-foreground mb-1">
              Contract Address (CA)
            </div>
            <div className="font-mono text-xs text-foreground break-all">
              {CA}
            </div>
          </div>
          <CopyButton text={CA} />
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  const tweets = [
    {
      avatar: "🐕",
      name: "Crypto Herald",
      handle: "@cryptoherald",
      content:
        "This chubby corgi just escaped dog thieves AND led the entire pack 17km back home! HERO DOG 🐕 The story that launched a thousand memecoins. #DaPang #Solana",
      views: "26.4M",
      likes: "892K",
      retweets: "340K",
      time: "2h ago",
    },
    {
      avatar: "🚀",
      name: "DeFi Degen",
      handle: "@defidegen",
      content:
        "The story of Dà Pàng is the most wholesome and badass thing I've read all week. Big Fat Corgi = Big Fat Gains 🚀 Already in. CT please don't sleep on this.",
      views: "4.1M",
      likes: "1.2M",
      retweets: "215K",
      time: "5h ago",
    },
    {
      avatar: "🌟",
      name: "Solana News",
      handle: "@solanews",
      content:
        "17 KILOMETERS. This corgi walked 17km to bring stolen dogs home. If this isn't the most bullish narrative you've seen all year, idk what is 🔥 #DaPang $PANG",
      views: "8.9M",
      likes: "620K",
      retweets: "890K",
      time: "8h ago",
    },
  ];
  return (
    <section id="community" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 badge-green border rounded-full px-3 py-1 text-xs font-semibold mb-4">
            🔥 The Viral Story
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
            <span className="gradient-text">26M Views</span> — The World Watched
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The internet went wild for Dà Pàng. Here's what they said.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {tweets.map((tweet, i) => (
            <div
              key={tweet.handle}
              className="tweet-card"
              data-ocid={`community.tweet.${i + 1}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-xl">
                  {tweet.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    {tweet.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tweet.handle}
                  </div>
                </div>
                <div className="ml-auto">
                  <SiX size={14} className="text-muted-foreground" />
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">
                {tweet.content}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                <span className="flex items-center gap-1">
                  <Eye size={12} /> {tweet.views}
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={12} /> {tweet.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Repeat2 size={12} /> {tweet.retweets}
                </span>
                <span className="ml-auto">{tweet.time}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Community CTA */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <h3 className="font-display font-bold text-2xl mb-2">
            Join the Pack 🐕
          </h3>
          <p className="text-muted-foreground mb-6">
            Thousands of degens already running with Dà Pàng. Don't get left
            behind.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild className="btn-golden rounded-full h-11 px-8">
              <a
                href={TG_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="community.tg.button"
              >
                <SiTelegram className="mr-2" size={16} /> Join Telegram
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full h-11 px-8 border-border hover:border-primary/50"
            >
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="community.x.button"
              >
                <SiX className="mr-2" size={14} /> Join X Community
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {
      q: "What is Da Pang ($PANG)?",
      a: "Da Pang is a Solana memecoin inspired by the viral story of Dà Pàng — the heroic chubby corgi who led an entire pack of stolen dogs 17km back to freedom, racking up 26M+ tweet views. It's community-driven, zero-tax, and pure legend fuel.",
    },
    {
      q: "What blockchain is $PANG on?",
      a: "$PANG is deployed on Solana — the fastest, cheapest blockchain for memecoins. Low fees, fast transactions, and the most degen-friendly ecosystem in crypto.",
    },
    {
      q: "How do I buy $PANG?",
      a: `1. Get a Solana wallet (Phantom or Solflare). 2. Buy SOL on any exchange. 3. Go to Jupiter (jup.ag). 4. Paste the CA: ${CA} and swap SOL for $PANG. Set slippage to 5-10%.`,
    },
    {
      q: "What is the Contract Address (CA)?",
      a: `${CA}. Always verify you're using the correct CA before buying. Never buy from unofficial sources.`,
    },
    {
      q: "Is there a team/dev tax?",
      a: "Zero. Absolutely 0% buy and sell tax. This is a fully community-driven memecoin. No team wallet draining, no hidden fees — just pure community vibes.",
    },
    {
      q: "Where can I follow updates?",
      a: "Join our Telegram at t.me/DaPangOfficialCTO for real-time updates, or follow our X community for the latest news and viral content.",
    },
  ];
  return (
    <section id="faq" className="py-20 px-4 bg-card border-t border-border">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
            <span className="gradient-text">FAQ</span>
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about $PANG
          </p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="space-y-3"
          data-ocid="faq.section"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`item-${i}`}
              className="bg-background border border-border rounded-xl px-5 data-[state=open]:border-primary/40 transition-all"
              data-ocid={`faq.item.${i + 1}`}
            >
              <AccordionTrigger className="font-semibold text-left hover:no-underline py-5 text-sm md:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-background border-t border-border py-10 px-4 pb-20 md:pb-10">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display font-bold text-xl mb-1">
              <span className="gradient-text">DA PANG</span> 🐕
            </div>
            <div className="text-xs text-muted-foreground font-mono">{CA}</div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={TG_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.tg.link"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiTelegram size={16} /> Telegram
            </a>
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.x.link"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiX size={14} /> Community
            </a>
            <a
              href={JUPITER_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="footer.buy.link"
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-semibold"
            >
              Buy $PANG 🚀
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            © {year}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </span>
          <span className="text-center">
            $PANG is a memecoin with no intrinsic value. Not financial advice.
            DYOR.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <Navbar />
      <main className="pb-16 md:pb-0">
        <HeroSection />
        <Marquee />
        <TokenomicsSection />
        <LoreSection />
        <Marquee flip />
        <ChartSection />
        <BuySection />
        <CommunitySection />
        <FaqSection />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
