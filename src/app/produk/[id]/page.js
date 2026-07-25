import React from 'react';
import { MessageCircle } from 'lucide-react';

async function getProdukDetail(id) {
  const res = await fetch('https://script.google.com/macros/s/AKfycbyHWyDemUVLgkDExoA3__K8bJLTop3fyL85xt9GABcFZGLZWG-u59reO5tiqvA0V886/exec', { 
    cache: 'no-store' 
  });
  const data = await res.json();
  // Cari produk berdasarkan ID yang dikirim dari URL
  return data.umkm.find(p => p.id == id);
}

export default async function DetailProdukPage({ params }) {
  // Await params karena di Next.js 15+ params bersifat promise
  const { id } = await params;
  const product = await getProdukDetail(id);

  if (!product) return <div className="p-12 text-center">Produk tidak ditemukan.</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="w-full h-96 bg-slate-200 rounded-2xl flex items-center justify-center overflow-hidden">
            <img 
              src={product.foto_url || 'https://via.placeholder.com/400'} 
              alt={product.nama_produk} 
              className="object-cover w-full h-full" 
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">{product.nama_produk}</h1>
          <p className="text-2xl font-bold mt-4 text-emerald-600">{product.harga}</p>
          <p className="mt-6 text-slate-600 leading-relaxed">{product.deskripsi}</p>

          <a 
            href={`https://wa.me/${product.wa_link}?text=${encodeURIComponent(
              `Halo, saya tertarik dengan produk *${product.nama_produk}*. Apakah masih tersedia?`
            )}`} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-6 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Hubungi Penjual
          </a>
        </div>
      </div>
    </div>
  );
}