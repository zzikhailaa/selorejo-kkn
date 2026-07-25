'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { getStatistikPenduduk } from '@/lib/api'; // Sesuaikan path import API kamu jika berbeda

export default function SOTKPage() {
  const [sotkList, setSotkList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSotkData() {
      try {
        const data = await getStatistikPenduduk();
        if (data && data.sotk && Array.isArray(data.sotk)) {
          setSotkList(data.sotk);
        }
      } catch (error) {
        console.error("Gagal mengambil data SOTK:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSotkData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700 mb-4">
            Struktur Organisasi
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">SOTK Desa Selorejo</h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto mb-10">
            Struktur Organisasi dan Tata Kerja Pemerintah Desa Selorejo yang berdedikasi melayani masyarakat dengan transparan dan profesional.
          </p>

          {/* BAGAN SOTK */}
          <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-xl">
            <img 
              src="/images-bagan-sotk.jpg" 
              alt="Bagan Struktur Organisasi SOTK Desa Selorejo" 
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>

        {/* Grid Staff Berdasarkan Google Sheets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12 text-slate-400">
              Memuat data SOTK...
            </div>
          ) : sotkList.length > 0 ? (
            sotkList.map((person) => (
              <div key={person.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition hover:shadow-xl hover:-translate-y-2 flex flex-col justify-between">
                <div className="h-40 w-40 mx-auto rounded-full bg-slate-200 overflow-hidden mb-6 border-4 border-emerald-50">
                  {person.foto_url ? (
                    <img src={person.foto_url} alt={person.nama} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-emerald-600">
                      <Users className="w-16 h-16" />
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900">{person.nama}</h3>
                  <p className="text-emerald-700 font-medium text-sm mt-1">{person.jabatan}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-400">
              Belum ada data SOTK yang dimasukkan di Google Sheets.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}