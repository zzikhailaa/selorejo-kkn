// src/app/wisata/[id]/page.js

export default async function DetailWisataPage({ params }) {
  const { id } = await params;

  // Ini data dummy untuk contoh, nanti bisa kamu ganti dengan fetch dari Google Sheets
  const wisataDetail = {
    nama: "WISATA ALAM BUKIT BONGKU DESA TAMANG, KEC NANGA MAHAP, KAB SEKADAU",
    tanggal: "8 Juli 2025",
    gambar: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    deskripsi: "Negeri di atas awan, sebuah warna baru destinasi wisata yang berada di Sekadau, Kalimantan Barat. Kamu dapat menikmati negeri di atas awan dan keindahan alam yang menakjubkan dari Bukit Bongku.\n\nBukit Bongku berada di Desa Tamang, Kecamatan Nanga Mahap, Kabupaten Sekadau, Kalimantan Barat. Untuk menuju puncak Bukit Bongku, kita bisa menggunakan transportasi sepeda motor ataupun mobil."
  };

  const wisataLainnya = [
    { id: 2, nama: "Siling Kanu", gambar: "https://images.unsplash.com/photo-1437422061949-fd65b8979313?auto=format&fit=crop&w=200&q=80" }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* KOLOM KIRI (Konten Utama) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200">
          <p className="text-xs text-slate-400 mb-2">🏠 / Wisata Desa Tamang</p>
          <h1 className="text-2xl font-extrabold text-slate-900 leading-tight uppercase mb-4">{wisataDetail.nama}</h1>
          <p className="text-sm text-slate-400 mb-6 font-medium">📅 {wisataDetail.tanggal} | 👤 Administrator</p>
          
          <img src={wisataDetail.gambar} alt="Wisata" className="w-full h-80 object-cover rounded-[1.5rem] mb-6" />
          
          <p className="text-slate-600 leading-8 whitespace-pre-line">{wisataDetail.deskripsi}</p>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-sm font-bold text-slate-900">Bagikan:</p>
            {/* Tambahkan ikon share di sini */}
          </div>
        </div>

        {/* KOLOM KANAN (Sidebar Wisata Lainnya) */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 sticky top-28">
          <h3 className="font-bold text-slate-900 mb-4 border-b pb-2">Wisata Lainnya</h3>
          <div className="space-y-4">
            {wisataLainnya.map((item) => (
              <a key={item.id} href={`/wisata/${item.id}`} className="flex gap-3 hover:opacity-75 transition">
                <img src={item.gambar} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase line-clamp-2">{item.nama}</h4>
                  <p className="text-[10px] text-slate-400 mt-1">11 Januari 2025</p>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}