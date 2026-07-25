'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getStatistikPenduduk } from '@/lib/api';
import Link from 'next/link';

export default function DetailWisataPage() {
  const params = useParams();
  const id = params?.id;

  const [wisataDetail, setWisataDetail] = useState(null);
  const [wisataLainnya, setWisataLainnya] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetailData() {
      if (!id) return;
      try {
        const data = await getStatistikPenduduk();
        if (data && data.wisata && Array.isArray(data.wisata)) {
          // Cari wisata yang ID-nya cocok dengan URL
          const currentWisata = data.wisata.find((item) => String(item.id) === String(id));
          setWisataDetail(currentWisata || null);

          // Ambil wisata lainnya untuk sidebar (filter keluar ID yang sedang aktif)
          const otherWisata = data.wisata.filter((item) => String(item.id) !== String(id));
          setWisataLainnya(otherWisata);
        }
      } catch (error) {
        console.error("Gagal mengambil detail wisata:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDetailData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400">
        Memuat detail wisata...
      </div>
    );
  }

  if (!wisataDetail) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-600 px-6">
        <h2 className="text-2xl font-bold mb-2">Wisata Tidak Ditemukan</h2>
        <p className="text-sm text-slate-400 mb-6">Maaf, data wisata yang Anda cari tidak tersedia di Google Sheets.</p>
        <Link href="/wisata" className="px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition">
          Kembali ke Daftar Wisata
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* KOLOM KIRI (Konten Utama) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
          <p className="text-xs text-slate-400 mb-2">
            <Link href="/" className="hover:underline">🏠</Link> / <Link href="/wisata" className="hover:underline">Wisata Desa</Link> / <span className="text-slate-600 font-medium">{wisataDetail.nama}</span>
          </p>
          
          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight uppercase mb-4">
            {wisataDetail.nama}
          </h1>
          
          <p className="text-sm text-slate-400 mb-6 font-medium">
            📅 Desa Selorejo | 👤 Administrator
          </p>
          
          {wisataDetail.foto_url && (
            <img 
              src={wisataDetail.foto_url} 
              alt={wisataDetail.nama} 
              className="w-full h-80 object-cover rounded-[1.5rem] mb-6" 
            />
          )}
          
          <p className="text-slate-600 leading-8 whitespace-pre-line">
            {wisataDetail.deskripsi}
          </p>
          
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-900">Bagikan informasi ini:</p>
            <Link href="/wisata" className="text-sm font-semibold text-emerald-600 hover:underline">
              &larr; Kembali ke Daftar Wisata
            </Link>
          </div>
        </div>

        {/* KOLOM KANAN (Sidebar Wisata Lainnya) */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 sticky top-28">
          <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">Wisata Lainnya</h3>
          <div className="space-y-4">
            {wisataLainnya.length > 0 ? (
              wisataLainnya.map((item) => (
                <Link key={item.id} href={`/wisata/${item.id}`} className="flex gap-3 hover:opacity-75 transition group">
                  {item.foto_url ? (
                    <img src={item.foto_url} alt={item.nama} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-slate-200 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase line-clamp-2 group-hover:text-emerald-600 transition">
                      {item.nama}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">Desa Selorejo</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-xs text-slate-400">Tidak ada wisata lainnya.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}