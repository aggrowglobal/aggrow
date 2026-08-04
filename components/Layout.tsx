import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Lenis from "lenis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TickerBar from "./TickerBar";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-[100dvh] bg-abyss text-ink">
      <Navbar />
      {/* Offset matching the fixed 72px navbar; ticker bars render globally below the navbar and above the footer */}
      <main className="pt-[72px]">
        <TickerBar />
        <Outlet />
      </main>
      <TickerBar />
      <Footer />
    </div>
  );
}
