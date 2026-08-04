export default function Logo({
  className = "h-8",
  variant = "light-bg",
}: {
  className?: string;
  /** light-bg: dark wordmark for light backgrounds; dark-bg: white wordmark for navy/dark surfaces */
  variant?: "light-bg" | "dark-bg";
}) {
  return (
    <span className={`inline-flex items-center gap-[10px] ${className}`}>
      <img src="/logo.svg" alt="AGGROW Global" className="h-full w-auto" />
      <span className="font-display text-[1.1rem] font-extrabold leading-none tracking-[1px]">
        <span className={variant === "dark-bg" ? "text-white" : "text-[#1A1A1A]"}>AGGROW</span>
        <span className="ml-[2px] align-baseline text-[0.7em] font-normal tracking-[2px] text-gold">
          GLOBAL
        </span>
      </span>
    </span>
  );
}
