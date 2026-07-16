'use client';

import { Newspaper, Clock3, ChevronRight } from 'lucide-react';
// Impor data dari file terpisah
import { newsItems } from '@/data/beritaData'; 

export default function BeritaPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-[2rem] bg-gradient-to-br from-emerald-600 to-emerald-700 p-10 text-white shadow-xl overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100 shadow-sm">
              <Newspaper className="w-4 h-4" />
              Halaman Berita
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">Berita Terbaru Desa Selorejo</h1>
            <p className="mt-4 text-slate-100 text-lg md:text-xl max-w-2xl">Halaman ini berisi informasi resmi dan update penting dari Desa Selorejo.</p>
          </div>
        </div>

        <section className="mt-12">
          <div className="grid gap-6 md:grid-cols-2">
            {newsItems.map((item) => (
              <article key={item.id} className="group rounded-[1.75rem] bg-white border border-slate-200 shadow-sm overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                {/* Bagian Gambar */}
                <div className="h-56 w-full bg-slate-200 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-emerald-700">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">{item.id}</span>
                    {item.category}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-900 line-clamp-1">{item.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed line-clamp-2">{item.excerpt}</p>
                </div>
                
                <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="w-4 h-4" />
                    {item.date}
                  </span>
                  <a href={`/berita/${item.id}`} className="inline-flex items-center gap-2 text-emerald-700 font-semibold transition group-hover:text-emerald-900">
                    Baca Selengkapnya
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}