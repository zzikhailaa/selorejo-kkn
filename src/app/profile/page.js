import { Users, Ruler } from 'lucide-react';

async function getProfile() {
  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbyHWyDemUVLgkDExoA3__K8bJLTop3fyL85xt9GABcFZGLZWG-u59reO5tiqvA0V886/exec', { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal mengambil data');
    return res.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
      <Icon size={22} strokeWidth={1.5} />
    </div>
    <p className="text-sm font-medium text-slate-500">{label}</p>
    <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
  </div>
);

export default async function ProfilePage() {
  const data = await getProfile();
  const profile = data?.profile;

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-14">
        <div className="rounded-[2rem] bg-white p-10 shadow-xl">
          <p className="text-lg font-semibold text-slate-700 animate-pulse">Memuat data profil...</p>
        </div>
      </div>
    );
  }

  const batasDesa = [
    { arah: 'Utara', desa: 'Menganto' },
    { arah: 'Selatan', desa: 'Karanglo' },
    { arah: 'Timur', desa: 'Mojojejer' },
    { arah: 'Barat', desa: 'Mojowangi' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-10 sm:px-8 lg:px-10">
        <header className="text-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Profil Desa
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Cerita dan <span className="text-emerald-700">Statistik</span> {profile.nama_desa}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Menyajikan informasi lengkap desa dengan tata letak rapi, tipografi bersih, dan struktur yang mudah dibaca.
          </p>
        </header>

        <section className="mt-12 space-y-8 w-full max-w-2xl mx-auto px-4">
        {/* Card Visi */}
        <div className="rounded-2xl bg-white p-8 shadow-md border border-slate-200">
          <h2 className="text-3xl font-bold text-emerald-700 text-center mb-6">Visi</h2>
          <p className="text-slate-800 leading-relaxed text-center font-medium text-xl">
            {profile.visi}
          </p>
        </div>

        {/* Card Misi */}
        {/* Menggunakan bg-white dengan shadow-md agar lebih menonjol dari latar belakang */}
        <div className="rounded-2xl bg-white p-8 shadow-md border border-slate-200">
          <h3 className="text-3xl font-bold text-emerald-700 text-center mb-6">Misi</h3>
          <div className="space-y-4">
            {profile.misi.split('\n').filter(item => item.trim() !== '').map((misi, index) => (
              <p key={index} className="text-slate-800 leading-relaxed text-lg font-medium">
                {index + 1}. {misi.trim()}
              </p>
            ))}
          </div>
        </div>
      </section>

          <section className="mt-12 space-y-12 max-w-7xl mx-auto px-6">
          <div className="rounded-[2rem] bg-white p-10 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Bagan Desa</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">Struktur Organisasi Desa</h2>
              </div>
              <div className="rounded-3xl bg-emerald-50 px-4 py-2 text-emerald-700 shadow-sm">Segera Hadir</div>
            </div>
            <div className="mt-8 rounded-[2rem] bg-slate-50 p-8 border border-slate-200 h-[360px] flex items-center justify-center">
              <p className="text-slate-500 font-medium text-center">Coming Soon: Bagan Struktur Pemerintahan Desa</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-10 shadow-xl border border-slate-200">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Sejarah Desa</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 mb-8">Perjalanan Desa</h2>
          
          {/* Gunakan items-center untuk membuat konten kiri dan kanan sejajar di tengah secara vertikal */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            
            {/* Kolom Kiri: Foto Desa */}
            <div className="overflow-hidden rounded-[2rem] shadow-lg">
              <img 
                src="/path-ke-foto-desa.png" 
                alt="Foto Desa" 
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>

            {/* Kolom Kanan: Teks Sejarah */}
            <div className="space-y-6 text-slate-700">
              {typeof profile.sejarah === 'string' ? (
                profile.sejarah.split('|||').map((bagian, index) => {
                  const [judul, ...isi] = bagian.split('###');
                  return (
                    <div key={index}>
                      {judul && <h3 className="text-xl font-semibold text-emerald-700 mb-2">{judul.trim()}</h3>}
                      <p className="whitespace-pre-line text-base leading-8 text-slate-600">
                        {isi.join('###').trim()}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-500">Data sejarah belum tersedia.</p>
              )}
            </div>
          </div>
        </div>

          {/* BUNGKUS DENGAN PARENT GRID INI AGAR BISA BERDAMPINGAN */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Bagian Batas Desa & Info (Kiri) */}
            <div className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-200 flex flex-col">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Batas Desa</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">Batas Wilayah</h2>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {batasDesa.map((item) => (
                  <div key={item.arah} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{item.arah}</p>
                    <p className="mt-1 text-md font-semibold text-slate-900">{item.desa}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 grid gap-4">
                <InfoCard icon={Users} label="Total Penduduk" value="5.395 Jiwa" />
                <InfoCard icon={Ruler} label="Luas Wilayah" value="2,09 km² (209 Ha)" />
              </div>
            </div>

            {/* Bagian Peta (Kanan) */}
            <div className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-200 flex flex-col">
              <div className="flex items-center gap-4 mb-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 text-lg font-semibold">P</span>
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Peta Lokasi</p>
                  <h2 className="text-3xl font-bold text-slate-900">Balai Desa</h2>
                </div>
              </div>
              
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-inner flex-grow h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3517.029535244355!2d112.30535069641847!3d-7.60463650132647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e786b53a82fa885%3A0xfeacbb557bcc6f7e!2sKantor%20Kepala%20Desa%20Selorejo!5e1!3m2!1sen!2sid!4v1783160886144!5m2!1sen!2sid" 
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
