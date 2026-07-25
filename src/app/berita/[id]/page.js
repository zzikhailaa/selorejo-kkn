import { Clock3, User } from 'lucide-react';

async function getBerita() {
  const res = await fetch('https://script.google.com/macros/s/AKfycbyHWyDemUVLgkDExoA3__K8bJLTop3fyL85xt9GABcFZGLZWG-u59reO5tiqvA0V886/exec', { 
    cache: 'no-store' 
  });
  return res.json();
}

export default async function DetailBerita({ params }) {
  const { id } = await params;
  const data = await getBerita();
  
  if (!data || !data.berita) {
    return <div className="p-12 text-center text-slate-500">Gagal memuat data berita.</div>;
  }

  const berita = data.berita.find(n => n.id.toString() === id);

  if (!berita) return <div className="p-12 text-center text-slate-500">Berita tidak ditemukan</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* Kolom Kiri: Konten Berita */}
      <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-4xl font-bold text-slate-900">{berita.judul}</h1>
        <div className="flex gap-4 text-slate-500 my-4 text-sm">
          <span className="flex items-center gap-1"><Clock3 className="w-4 h-4"/> {berita.tanggal ? new Date(berita.tanggal).toLocaleDateString() : '-'}</span>
          <span className="flex items-center gap-1"><User className="w-4 h-4"/> Administrator</span>
        </div>
        
        {berita.foto_url ? (
          <img src={berita.foto_url} className="w-full rounded-2xl mb-6 object-cover h-96" alt={berita.judul} />
        ) : (
          <div className="w-full h-96 rounded-2xl mb-6 bg-slate-100 flex items-center justify-center text-slate-400">
            Tidak ada foto
          </div>
        )}

        {/* Render Paragraf Berita secara Rapi */}
        <div className="space-y-6 text-slate-700 leading-relaxed text-base">
          {berita.ringkasan ? (
            berita.ringkasan
              .replace(/\[cite:\s*\d+\]/g, '') // Membersihkan format sitasi otomatis[cite: 1]
              .split('|||')
              .map((paragraf, index) => (
                <p key={index}>{paragraf.trim()}</p>
              ))
          ) : null}
        </div>
      </div>

      {/* Kolom Kanan: Sidebar Berita Terbaru */}
      <aside className="lg:col-span-1">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-6 text-slate-900">Berita Terbaru</h3>
          <div className="space-y-6">
            {data.berita.slice(0, 3).map((item) => (
              <a href={`/berita/${item.id}`} key={item.id} className="flex gap-4 hover:opacity-80 transition">
                <div className="w-24 h-20 bg-slate-200 rounded-xl overflow-hidden flex-shrink-0">
                  {item.foto_url ? (
                    <img src={item.foto_url} className="w-full h-full object-cover" alt={item.judul} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No Image</div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug">{item.judul}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.tanggal ? new Date(item.tanggal).toLocaleDateString() : '-'}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </aside>
      
    </div>
  );
}