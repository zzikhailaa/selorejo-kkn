'use client';

import { useState, useEffect } from 'react';
import { getStatistikPenduduk } from '@/lib/api';

export default function WisataPage() {
  const [daftarWisata, setDaftarWisata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWisata() {
      try {
        const data = await getStatistikPenduduk();
        if (data && data.wisata && Array.isArray(data.wisata)) {
          setDaftarWisata(data.wisata);
        }
      } catch (error) {
        console.error("Gagal mengambil data wisata:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWisata();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-emerald-600 tracking-wide uppercase">
            WISATA DESA
          </h1>
          <p className="mt-2 text-lg text-slate-700 font-medium">
            Segala hal mengenai wisata Desa Selorejo
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12 text-slate-400">
              Memuat data wisata...
            </div>
          ) : daftarWisata.length > 0 ? (
            daftarWisata.map((wisata) => (
              <div 
                key={wisata.id} 
                className="bg-white rounded-[2rem] overflow-hidden flex flex-col border shadow-sm transition duration-300 hover:shadow-lg"
              >
                <div className="h-60 w-full overflow-hidden bg-slate-100">
                  <img src={wisata.foto_url} alt={wisata.nama} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase">{wisata.nama}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed flex-grow">{wisata.deskripsi}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-400">
              Belum ada data wisata di Google Sheets.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}