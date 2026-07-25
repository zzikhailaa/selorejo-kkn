"use client";

export default function TimKKNPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header Halaman */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-800">Tentang Pengembang Website</h1>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto text-sm md:text-base">
          Website resmi Desa Selorejo ini pertama kali dirintis dan dikembangkan secara kolaboratif oleh Mahasiswa Kuliah Kerja Nyata Universitas Pembangunan Nasional "Veteran" Jawa Timur Kelompok 16.
        </p>
      </div>

      {/* Kartu Utama Pengembang */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-slate-100 flex flex-col md:flex-row items-center gap-8">
        
        {/* Tempat Dua Logo (Logo UPN & Logo Kelompok 16) */}
        <div className="flex items-center justify-center gap-4 flex-shrink-0">
          {/* Logo UPN */}
          <div className="w-24 h-24 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center p-2 shadow-inner">
            <img 
              src="/logo-upn.png" 
              alt="Logo UPN Veteran Jawa Timur" 
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
            <span className="text-xs text-emerald-700 font-semibold text-center hidden">Logo UPN</span>
          </div>

          {/* Logo Kelompok 16 */}
          <div className="w-24 h-24 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center p-2 shadow-inner">
            <img 
              src="/logo-kkn16.png" 
              alt="Logo Kelompok 16" 
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
            />
            <span className="text-xs text-emerald-700 font-semibold text-center hidden">Logo Kel 16</span>
          </div>
        </div>
        
        {/* Deskripsi & Apresiasi */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-slate-800">Kuliah Kerja Nyata Universitas Pembangunan Nasional "Veteran" Jawa Timur Kelompok 16</h2>
          <p className="text-sm text-emerald-600 font-semibold mb-3">Periode Semester Genap 2025/2026</p>
          <p className="text-slate-600 leading-relaxed text-sm mb-4">
            Website ini dibangun sebagai wujud nyata pengabdian kepada masyarakat Desa Selorejo, Kecamatan Mojowarno, Kabupaten Jombang, guna mendigitalisasi informasi desa, pusat potensi UMKM, galeri kegiatan, hingga transparansi publik.
          </p>
          
          {/* Kotak Apresiasi untuk Desa Selorejo */}
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-4 text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-emerald-800">Catatan & Apresiasi: </span>
            Kami mengucapkan terima kasih yang sebesar-besarnya kepada Bapak Kepala Desa, seluruh perangkat desa, serta warga Desa Selorejo yang telah menerima, menyambut, dan membimbing kelompok kami dengan sangat baik selama kegiatan Kuliah Kerja Nyata berlangsung. Semoga website ini dapat bermanfaat bagi kemajuan desa kedepannya.
          </div>
        </div>
      </div>

      {/* Footer Kecil */}
      <div className="text-center mt-8 text-xs text-slate-400">
        <p>Desa Selorejo, Kecamatan Mojowarno, Kabupaten Jombang — 2026</p>
      </div>
    </div>
  );
}