import { Newspaper, Clock3, ChevronRight } from 'lucide-react';

// Fungsi fetch langsung (Server Component)
async function getBerita() {
  const res = await fetch('https://script.google.com/macros/s/AKfycbyHWyDemUVLgkDExoA3__K8bJLTop3fyL85xt9GABcFZGLZWG-u59reO5tiqvA0V886/exec', { 
    cache: 'no-store' 
  });
  return res.json();
}

export default async function BeritaPage() {
  const data = await getBerita(); // Mengambil data langsung di server

  return (
    <div className="w-full bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-[2rem] bg-gradient-to-br from-emerald-600 to-emerald-700 p-10 text-white shadow-xl">
          <h1 className="mt-6 text-4xl font-bold">Berita Terbaru Desa Selorejo</h1>
        </div>

        <section className="mt-12">
          {data.berita && data.berita.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {data.berita.map((item) => (
                <article key={item.id} className="bg-white rounded-[1.75rem] border shadow-sm overflow-hidden flex flex-col justify-between">
                  <div>
                    {/* Kotak Foto Berita */}
                    <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                      {item.foto_url ? (
                        <img 
                          src={item.foto_url} 
                          alt={item.judul} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                          Tidak ada foto
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-slate-900">{item.judul}</h3>
                      <p className="mt-3 text-slate-600 line-clamp-2">{item.ringkasan}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-4 flex justify-between items-center text-sm">
                    <span className="flex items-center gap-2 text-slate-500">
                      <Clock3 className="w-4 h-4" /> {new Date(item.tanggal).toLocaleDateString()}
                    </span>
                    <a href={`/berita/${item.id}`} className="text-emerald-700 font-semibold hover:underline">
                      Baca Selengkapnya &rarr;
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">Data berita belum tersedia.</p>
          )}
        </section>
      </div>
    </div>
  );
}