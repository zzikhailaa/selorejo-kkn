"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from 'next/link';    

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // Efek untuk mendeteksi scroll (jika ada)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/profile" },
    { name: "Produk", href: "/produk" },
    { name: "Berita", href: "/berita" },
    { name: "Infografis", href: "/infografis" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-emerald-900/20 shadow-xl transition-all duration-300 bg-[rgba(6,95,70,0.96)] backdrop-blur-[12px]">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-6 text-white">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <img src="/images-logo-jombang.png" alt="Logo" className="h-10 w-10 object-contain" />
          <div>
            <h1 className="text-lg font-bold leading-tight">Desa Selorejo</h1>
            <p className="hidden text-xs opacity-90 md:block">Kabupaten Jombang</p>
          </div>
        </Link>

        {/* TOMBOL HAMBURGER (Hanya muncul di HP) */}
        <button className="lg:hidden p-2 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* MENU (Tampil berjejer rapi di Desktop & Dropdown di HP) */}
        <div className={`${isMenuOpen ? "flex" : "hidden"} lg:flex absolute lg:static top-[78px] left-0 w-full lg:w-auto bg-emerald-900 lg:bg-transparent p-6 lg:p-0 flex-col lg:flex-row gap-5 lg:gap-8 shadow-lg lg:shadow-none border-b border-emerald-800 lg:border-none`}>
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMenuOpen(false)}
              className={`font-bold transition pb-1 ${pathname === item.href ? "border-b-2 border-white" : "hover:text-emerald-200"}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

      </div>
    </nav>
  );
}