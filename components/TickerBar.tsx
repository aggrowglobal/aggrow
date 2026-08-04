import { memo } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type Tick = { name: string; price: string; delta: number };

const COMMODITIES: Tick[] = [
  { name: "Soybeans Non-GMO", price: "$482.50", delta: 2.4 },
  { name: "Corn Yellow #2", price: "$215.40", delta: -0.6 },
  { name: "Raw Sugar ICUMSA 45", price: "$423.80", delta: 1.8 },
  { name: "Coffee Arabica 17/18", price: "$4,250.00", delta: 5.2 },
  { name: "Beef Frozen 90VL", price: "$5,850.00", delta: 3.1 },
  { name: "Chicken Whole Frozen", price: "$1,850.00", delta: 1.2 },
  { name: "Wheat Hard Red", price: "$298.50", delta: -1.2 },
  { name: "Soybean Meal 48%", price: "$385.20", delta: 0.8 },
  { name: "Ethanol Anhydrous", price: "$620.00", delta: 2.1 },
  { name: "Cotton Lint 28mm", price: "$1,850.00", delta: -0.4 },
];

const FX_CRYPTO: Tick[] = [
  { name: "USD/BRL", price: "5.08", delta: 0.3 },
  { name: "USD/EUR", price: "0.92", delta: -0.2 },
  { name: "USD/CNY", price: "7.24", delta: 0.1 },
  { name: "USD/JPY", price: "156.40", delta: 0.5 },
  { name: "USD/AED", price: "3.67", delta: 0.0 },
  { name: "USD/GBP", price: "0.79", delta: -0.3 },
  { name: "USD/INR", price: "83.50", delta: 0.2 },
  { name: "USD/KRW", price: "1,350.00", delta: 0.4 },
  { name: "USD/SAR", price: "3.75", delta: 0.0 },
  { name: "USD/TRY", price: "32.10", delta: 1.2 },
  { name: "BTC", price: "$67,540", delta: 2.8 },
  { name: "ETH", price: "$3,520", delta: 1.5 },
  { name: "USDT", price: "$1.00", delta: 0.01 },
  { name: "SOL", price: "$148.50", delta: 4.2 },
];

function TickItem({ t }: { t: Tick }) {
  const up = t.delta > 0;
  const flat = t.delta === 0;
  const Icon = flat ? Minus : up ? TrendingUp : TrendingDown;
  return (
    <span className="mx-5 inline-flex items-center gap-2 whitespace-nowrap font-mono text-[0.85rem]">
      <span className="text-ink-dim">{t.name}</span>
      <span className="text-ink">{t.price}</span>
      <span
        className={
          flat ? "inline-flex items-center gap-1 text-ink-faint" : up ? "inline-flex items-center gap-1 text-harvest" : "inline-flex items-center gap-1 text-alert"
        }
      >
        <Icon className="h-3 w-3" />
        {up ? "+" : ""}
        {t.delta.toFixed(2).replace(/\.?0+$/, (m) => (m.includes(".") ? m : ""))}%
      </span>
      <span className="text-hairline">·</span>
    </span>
  );
}

const MarqueeRow = memo(function MarqueeRow({ items, reverse }: { items: Tick[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="ticker-pause overflow-hidden">
      <div className={`ticker-row ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((t, i) => (
          <TickItem key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
});

export default function TickerBar() {
  return (
    <div className="border-b border-hairline bg-panel/80 py-1.5">
      <MarqueeRow items={COMMODITIES} />
      <div className="my-1 h-px bg-hairline/60" />
      <MarqueeRow items={FX_CRYPTO} reverse />
    </div>
  );
}
