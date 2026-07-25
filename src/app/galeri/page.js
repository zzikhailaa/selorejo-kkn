'use client';

import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

export default function GaleriPage() {
  const [galeriList, setGaleriList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGaleri() {
      try {
        // Ganti URL fetch ini sesuai endpoint API Google Apps Script kamu
        const res = await fetch('https://script.google.com/macros/s/AKfycbyHWyDemUVLgkDExoA3__K8bJLTop3fyL85xt9GABcFZGLZWG-u59reO5tiqvA0V886/exec');
        const data = await res.json();
        if (data && data.galeri) {
          setGaleriList(data.galeri);
        }
      } catch (error) {
        console.error("Gagal memuat galeri:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGaleri();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900">Galeri Desa Selorejo</h1>
          <p className="mt-4 text-slate-600">Dokumentasi kegiatan, suasana, dan potensi Desa Selorejo.</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Memuat foto galeri...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galeriList.length > 0 ? (
              galeriList.map((item, index) => (
                <div key={item.id || index} className="group relative rounded-2xl overflow-hidden border bg-white shadow-sm transition hover:shadow-xl">
                  <div className="h-64 bg-slate-200 relative flex items-center justify-center overflow-hidden">
                    {item.foto_url ? (
                      <img 
                        src={item.foto_url} 
                        alt={item.judul || "Galeri Desa"} 
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="flex flex-col items-center text-emerald-600">
                        <Camera className="w-12 h-12 opacity-50" />
                        <span className="text-xs mt-2 text-slate-400">Tidak ada gambar</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-slate-500">
                Belum ada foto galeri yang diunggah.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}