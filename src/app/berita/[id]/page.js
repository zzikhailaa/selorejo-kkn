'use client';

import React, { use } from 'react';
import { Clock3, User } from 'lucide-react';
import { newsItems } from '@/data/beritaData';

export default function DetailBerita({ params }) {
  const { id } = use(params);
  const berita = newsItems.find(n => n.id === parseInt(id));

  if (!berita) return <div>Berita tidak ditemukan</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Kolom Kiri: Konten Berita */}
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-bold text-slate-900">{berita.title}</h1>
        <div className="flex gap-4 text-slate-500 my-4 text-sm">
          <span className="flex items-center gap-1"><Clock3 className="w-4 h-4"/> {berita.date}</span>
          <span className="flex items-center gap-1"><User className="w-4 h-4"/> Administrator</span>
        </div>
        <img src={berita.image} className="w-full rounded-2xl mb-6" alt={berita.title} />
        <p className="text-slate-700 leading-relaxed">{berita.content}</p>
      </div>

      {/* Kolom Kanan: Sidebar Berita Terbaru */}
      <aside className="lg:col-span-1">
        <h3 className="font-bold text-lg mb-4">Berita Terbaru</h3>
        <div className="space-y-4">
          {newsItems.map((item) => (
            <a href={`/berita/${item.id}`} key={item.id} className="flex gap-3 hover:bg-slate-50 p-2 rounded-lg transition">
              <div className="w-20 h-16 bg-slate-200 rounded-md overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 line-clamp-2">{item.title}</p>
                <p className="text-xs text-slate-500">{item.date}</p>
              </div>
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}