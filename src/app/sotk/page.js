'use client';

import { Users, Mail, Phone, MapPin } from 'lucide-react';

export default function SOTKPage() {
  const staff = [
    { nama: "Nama Kepala Desa", jabatan: "Kepala Desa", foto: "/images-kepala-desa.jpg" },
    { nama: "Nama Sekretaris", jabatan: "Sekretaris Desa", foto: "" },
    { nama: "Nama Kaur Keuangan", jabatan: "Kaur Keuangan", foto: "" },
    { nama: "Nama Kaur Umum", jabatan: "Kaur Umum", foto: "" },
    { nama: "Nama Kasi Pemerintahan", jabatan: "Kasi Pemerintahan", foto: "" },
    { nama: "Nama Kasi Kesejahteraan", jabatan: "Kasi Kesejahteraan", foto: "" },
  ];

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
            src="/images-bagan-sotk.jpg" // Pastikan file gambar bagan ada di folder public
            alt="Bagan Struktur Organisasi SOTK Desa Selorejo" 
            className="w-full h-auto rounded-xl"
            />
        </div>
        </div>

        {/* Grid Staff */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {staff.map((person, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition hover:shadow-xl hover:-translate-y-2">
              <div className="h-40 w-40 mx-auto rounded-full bg-slate-200 overflow-hidden mb-6 border-4 border-emerald-50">
                {person.foto ? (
                  <img src={person.foto} alt={person.nama} className="h-full w-full object-cover" />
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
          ))}
        </div>
      </div>
    </main>
  );
}