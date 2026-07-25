import React from 'react';
import { ShoppingBag } from 'lucide-react';

async function getProduk() {
  const res = await fetch('https://script.google.com/macros/s/AKfycbyHWyDemUVLgkDExoA3__K8bJLTop3fyL85xt9GABcFZGLZWG-u59reO5tiqvA0V886/exec', { 
    cache: 'no-store' 
  });
  return res.json();
}

export default async function ProdukPage() {
  const data = await getProduk();

  return (
    <div className="w-full bg-slate-50 flex flex-col items-center py-12">
      <div className="max-w-6xl w-full px-6">
        <h1 className="text-3xl font-bold text-emerald-700">Produk UMKM Selorejo</h1>
        
        {data.umkm && data.umkm.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {data.umkm.map((product, index) => (
              <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border flex flex-col justify-between">
                <div>
                  {/* Kotak Foto Produk UMKM */}
                  <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                    {product.foto_url ? (
                      <img 
                        src={product.foto_url} 
                        alt={product.nama_produk} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center text-emerald-600">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900">{product.nama_produk}</h3>
                    <div className="text-sm text-emerald-600 font-semibold mt-2">Rp {product.harga}</div>
                    <p className="text-sm text-slate-500 mt-3 line-clamp-2">{product.deskripsi}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <a href={`/produk/${product.id}`} className="inline-block text-emerald-700 font-bold hover:underline">
                    Detail &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-slate-500">Data produk belum tersedia.</p>
        )}
      </div>
    </div>
  );
}