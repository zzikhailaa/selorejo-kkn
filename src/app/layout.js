import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Website Desa Selorejo",
  description: "Portal Resmi Desa Selorejo",
};

// 1. Pindahkan fungsi di luar RootLayout
async function getKontak() {
  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbyHWyDemUVLgkDExoA3__K8bJLTop3fyL85xt9GABcFZGLZWG-u59reO5tiqvA0V886/exec', { cache: 'no-store' });
    if (!res.ok) throw new Error("Gagal ambil data");
    const data = await res.json();
    return data.kontak;
  } catch (error) {
    console.error("Error fetching:", error);
    return { email: "Error", hp: "Error" };
  }
}

export default async function RootLayout({ children }) {
  const kontak = await getKontak();
  console.log("Data Kontak yang diterima:", kontak);
  
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer kontak={kontak} /> 
      </body>
    </html>
  );
}