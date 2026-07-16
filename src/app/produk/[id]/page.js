'use client';

import React, { use } from 'react';
import { Phone, MessageCircle } from 'lucide-react'; // Import ikon

const sampleProducts = [
  { id: 1, name: 'Keripik Singkong Renyah', price: 'Rp 15.000', category: 'Makanan', desc: 'Keripik singkong asli hasil olahan ibu-ibu PKK Selorejo.', wa: 'https://wa.me/6281234567890', image: 'https://via.placeholder.com/400' },
  { id: 2, name: 'Kopi Arabika Selorejo', price: 'Rp 25.000', category: 'Minuman', desc: 'Biji kopi pilihan dari lereng perbukitan Selorejo.', wa: 'https://wa.me/6281987654321', image: 'https://via.placeholder.com/400' },
];

export default function DetailProduk({ params }) {
  const { id } = use(params);
  const product = sampleProducts.find(p => p.id === parseInt(id));

  if (!product) return <div className="p-12">Produk tidak ditemukan.</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Layout Grid 2 Kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Kolom Kiri: Gambar */}
        <div>
          <div className="w-full h-96 bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
             <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
          </div>
        </div>

        {/* Kolom Kanan: Detail */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{product.name}</h1>
          <p className="text-emerald-600 font-semibold mt-1 text-sm">{product.category}</p>
          <p className="text-2xl font-bold mt-4 text-slate-900">{product.price}</p>
          
          <p className="mt-6 text-slate-600 leading-relaxed">{product.desc}</p>

          {/* Tombol Hubungi Penjual (Kecil dengan ikon WA) */}
          <a 
            href={product.wa} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-6 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Hubungi Penjual
          </a>
        </div>
      </div>

      {/* Bagian Ulasan Pembeli */}
      <div className="mt-16 border-t pt-8">
        <h2 className="text-xl font-bold text-slate-900">ULASAN PEMBELI</h2>
        
        {/* Tombol Tulis Ulasan */}
        <div className="mt-4 mb-6">
          <a href="LINK_GOOGLE_FORM_ULASAN_ANDA" target="_blank" className="text-emerald-700 font-semibold hover:underline">
            + Tulis ulasan Anda untuk produk ini
          </a>
        </div>

        <div className="p-8 border border-slate-200 rounded-lg text-center text-slate-400 bg-slate-50">
          Belum ada ulasan untuk saat ini.
        </div>
      </div>
    </div>
  );
}