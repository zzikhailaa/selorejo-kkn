// src/app/wisata/page.js

export default function WisataPage() {
  // Data Dummy agar halaman bisa langsung tampil
  const daftarWisata = [
    {
      id: 1,
      nama: "Wisata Alam Bukit Bongku",
      deskripsi: "Negeri di atas awan, sebuah warna baru destinasi wisata yang berada di Sekadau, Kalimantan Barat. Kamu dapat menikmati keindahan alam dari ketinggian.",
      gambar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      nama: "Siling Kanu",
      deskripsi: "Siling Kanu adalah salah satu tempat wisata alam yang terletak di Dusun Lubang Landak. Menawarkan pemandangan air terjun yang masih sangat asri.",
      gambar: "https://images.unsplash.com/photo-1437422061949-fd65b8979313?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      nama: "Wisata Embung Selorejo",
      deskripsi: "Tempat bersantai yang dikelilingi oleh area pertanian warga dengan udara yang sejuk dan pemandangan matahari terbenam yang memukau.",
      gambar: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"
    }
  ];

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
          {daftarWisata.map((wisata) => (
            <div 
              key={wisata.id} 
              className="bg-white rounded-[2rem] overflow-hidden flex flex-col border-0 shadow-none ring-0 outline-none transition duration-300 hover:shadow-none"
            >
              <div className="h-60 w-full overflow-hidden bg-slate-100">
                <img src={wisata.gambar} alt={wisata.nama} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase">{wisata.nama}</h3>
                <p className="text-slate-600 text-sm leading-relaxed flex-grow">{wisata.deskripsi}</p>
                <div className="mt-6">
                  <a 
                    href={`/wisata/${wisata.id}`} 
                    className="block w-full py-3 text-center bg-emerald-500 text-white font-bold text-sm rounded-2xl hover:bg-emerald-600 transition"
                  >
                    Selengkapnya
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}