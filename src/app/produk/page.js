'use client';

import React from 'react';
import { ShoppingBag, Phone, ExternalLink } from 'lucide-react';

const sampleProducts = [
  {
    id: 1,
    name: 'Keripik Singkong Renyah',
    desc: 'Keripik singkong asli hasil olahan ibu-ibu PKK Selorejo, renyah dan berempah.',
    wa: 'https://wa.me/6281234567890',
  },
  {
    id: 2,
    name: 'Kopi Arabika Selorejo',
    desc: 'Biji kopi pilihan dari lereng perbukitan Selorejo, aroma khas dan rasa otentik.',
    wa: 'https://wa.me/6281987654321',
  },
];

export default function ProdukPage() {
  const formUrl = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK'; // ganti dengan link Form nyata

  return (
    <div className="w-full bg-slate-50 flex flex-col items-center py-12">
      <div className="max-w-6xl w-full px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-700">Produk UMKM Selorejo</h1>
            <p className="text-slate-600 mt-2">Kumpulan produk unggulan hasil karya warga Selorejo.</p>
          </div>
          <div>
        </div>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleProducts.slice(0,4).map(product => (
            <article key={product.id} className="bg-white rounded-2xl overflow-hidden border-0 shadow-none ring-0 outline-none transform transition hover:shadow-none hover:-translate-y-1">
              <div className="h-40 bg-slate-200 flex items-center justify-center text-emerald-600">
                <ShoppingBag className="w-12 h-12" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{product.name}</h3>
                <div className="text-sm text-emerald-600 font-semibold mt-2">{product.price}</div>
                <p className="text-sm text-slate-500 mt-3">{product.desc}</p>

                <div className="mt-4 flex gap-2">
                  <a 
                    href={`/produk/${product.id}`} 
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm bg-white text-slate-700 hover:bg-slate-50 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Detail
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Data produk saat ini disimpan di Google Sheets — warga dapat menambahkan produk melalui Form setelah diverifikasi oleh pengembang.</p>
        </div>
      </div>
    </div>
  );
}
