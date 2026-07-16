"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const getScrollTop = () => {
      if (typeof window === "undefined") return 0;
      return Math.max(
        window.scrollY || 0,
        window.pageYOffset || 0,
        document.documentElement?.scrollTop || 0,
        document.body?.scrollTop || 0
      );
    };

    const onScroll = () => {
      setScrolled(getScrollTop() > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const intervalId = window.setInterval(onScroll, 120);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearInterval(intervalId);
    };
  }, []);

  // Daftar menu untuk mempermudah mapping dan pengecekan aktif
  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/profile" },
    { name: "Produk", href: "/produk" },
    { name: "Berita", href: "/berita" },
    { name: "Infografis", href: "/infografis" },
  ];

  const showSolidBar = true;

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full border-b border-emerald-900/20 shadow-xl transition-all duration-300"
      style={{
        backgroundColor: showSolidBar ? "rgba(6, 95, 70, 0.96)" : "transparent",
        backdropFilter: "saturate(180%) blur(12px)",
        WebkitBackdropFilter: "saturate(180%) blur(12px)",
      }}
    >

      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-6 text-white">
        <div className="flex items-center gap-3">
          <img
            src="images-logo-jombang.png"
            alt="Logo Kabupaten Jombang"
            className="h-11 w-11 object-contain"
          />
          <div>
            <h1 className="text-lg font-bold leading-tight drop-shadow-md md:text-xl">Desa Selorejo</h1>
            <p className="text-xs font-semibold opacity-90 drop-shadow md:text-sm">Kabupaten Jombang</p>
          </div>
        </div>

        <div className="flex gap-5 md:gap-8">
          {menuItems.map((item) => {
            // Cek apakah link ini sedang aktif
            const isActive = pathname === item.href;

            return (
              <a
                key={item.name}
                href={item.href}
                className={`font-bold transition-all duration-200 ${
                  isActive
                    ? "border-b-2 border-white pb-1"
                    : "hover:opacity-85"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 

