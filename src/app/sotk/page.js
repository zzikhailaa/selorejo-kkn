'use client'; // Pastikan ada ini jika kamu menggunakan Next.js App Router

import Link from 'next/link';
import { Users, Layers, FileText, BookOpen, MapPin, Newspaper, Image as ImageIcon, ShoppingBag, Camera } from 'lucide-react';

// 1. Siapkan data gambar dan teks slider di sini
const slides = [
  {
    image: "/images-hero1.jpg", // Foto desa atau kegiatan warga
    title: "Selamat Datang di Website Resmi Desa Selorejo",
    desc: "Sumber informasi terbaru tentang pemerintahan di Desa Selorejo."
  },
  {
    image: "/images-hero2.jpg", // Foto alam desa atau kegiatan warga
    title: "Pesona Wisata Alam Selorejo",
    desc: "Menikmati keindahan alam yang asri dan potensi wisata lokal yang menawan."
  },
  {
    image: "/images-hero3.jpg", // Foto kegiatan warga atau event desa
    title: "Transformasi Menuju Desa Digital",
    desc: "Melayani masyarakat dengan sistem tata kelola yang transparan, cepat, dan berintegritas."
  },
  {
    image: "/images-umkm-background.jpg", // Foto produk UMKM atau kerajinan warga
    title: "UMKM Unggulan Desa Selorejo",
    desc: "Temukan produk kreatif, kuliner khas, dan kerajinan tangan terbaik hasil karya warga kami.",
    buttonText: "Lihat Produk UMKM",
    link: "/umkm"
  }
];

export default function Home() {
  const adminStats = [
    { value: ' ', label: 'Penduduk' },
    { value: ' ', label: 'Laki-Laki' },
    { value: ' ', label: 'Perempuan' },
    { value: ' ', label: 'Kepala Keluarga' },
  ];

  return (
    <div className="flex flex-col items-center w-full bg-slate-50">
      
      {/* Hero Section - Slider horizontal */}
      <section className="hero-carousel relative -mt-20 h-screen w-full overflow-hidden bg-slate-900 text-white">
        {slides.map((slide, index) => (
          <input
            key={slide.title}
            className="hero-radio"
            type="radio"
            name="hero-carousel"
            id={`hero-slide-${index}`}
            defaultChecked={index === 0}
            aria-label={`Pilih slide ${index + 1}`}
          />
        ))}

        <div className="hero-viewport absolute inset-0">
          {slides.map((slide, index) => {
            const prevIndex = index === 0 ? slides.length - 1 : index - 1;
            const nextIndex = index === slides.length - 1 ? 0 : index + 1;

            return (
              <div key={slide.title} className={`hero-slide hero-slide-${index}`}>
                <img src={slide.image} alt={slide.title} className="hero-image" />
                <div className="absolute inset-0 bg-black/35" />

                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center z-20">
                  <h1 className="text-4xl font-extrabold leading-tight text-white md:max-w-4xl md:text-6xl [-webkit-text-stroke:1px_black]">
                    {slide.title}
                  </h1>
                  <p className="mx-auto mt-6 max-w-2xl text-lg font-bold text-white md:text-xl [-webkit-text-stroke:0.5px_black]">
                    {slide.desc}
                  </p>
                </div>

                <label
                  htmlFor={`hero-slide-${prevIndex}`}
                  className="hero-arrow hero-arrow-left"
                  aria-label="Slide sebelumnya"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </label>

                <label
                  htmlFor={`hero-slide-${nextIndex}`}
                  className="hero-arrow hero-arrow-right"
                  aria-label="Slide berikutnya"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </label>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <label
              key={slide.title}
              htmlFor={`hero-slide-${index}`}
              className="hero-dot"
              aria-label={`Buka slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* === Section: Jelajahi Desa (link to profile + quick cards) === */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 items-center">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-emerald-700">
              Jelajahi Desa
            </div>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">Temukan semua layanan penting Desa Selorejo.</h2>
            <p className="mt-6 text-slate-600 leading-relaxed">Di sini kamu bisa langsung mengakses halaman Profil Desa, Produk UMKM, Wisata Desa, dan Berita Desa. Kartu dibuat khusus agar ikon dan label sesuai menu navbar, sehingga tampilan lebih rapih dan mudah dipakai.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link href="/profile" className="group flex flex-col items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="mt-6 text-lg font-semibold uppercase tracking-[0.08em] text-slate-900">Profil Desa</h3>
            </Link>
            <Link href="/produk" className="group flex flex-col items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="mt-6 text-lg font-semibold uppercase tracking-[0.08em] text-slate-900">Produk Desa</h3>
            </Link>
            <Link href="/wisata" className="group flex flex-col items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="mt-6 text-lg font-semibold uppercase tracking-[0.08em] text-slate-900">Wisata Desa</h3>
            </Link>
            <Link href="/berita" className="group flex flex-col items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-100">
                <Newspaper className="w-8 h-8" />
              </div>
              <h3 className="mt-6 text-lg font-semibold uppercase tracking-[0.08em] text-slate-900">Berita Desa</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* === Sambutan Kepala Desa === */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 items-center">
          <div className="flex flex-col items-center">
            <div className="relative h-64 w-64 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-lg"></div>
              <img src="/images-kepala-desa.jpg" alt="Kepala Desa" className="relative h-56 w-56 rounded-full object-cover border-4 border-white shadow-xl" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-700 leading-tight">Sambutan Kepala Desa Selorejo</h2>
            <p className="mt-4 text-lg font-semibold text-slate-900">Nama Kepala Desa</p>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-600 mt-1">Kepala Desa</p>
            <p className="mt-8 text-slate-700 leading-relaxed text-justify">Selamat datang di website resmi Desa Selorejo. Kami berkomitmen melayani masyarakat dengan transparan dan profesional. Melalui portal ini warga dapat mengakses informasi pelayanan, administrasi, serta kegiatan desa. Website ini dirancang untuk memudahkan komunikasi antara pemerintah desa dan masyarakat dalam membangun desa yang lebih baik.</p>
          </div>
        </div>
      </section>

      {/* === Peta Desa + Administrasi Penduduk (side-by-side) === */}
      <section className="w-full max-w-[92rem] mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Map column */}
          <div className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-200 h-full flex flex-col">
            <h3 className="text-3xl font-bold text-emerald-700">Peta Desa</h3>
            <p className="text-base text-slate-600 mt-3">Lokasi Balai Desa dan sekitarnya.</p>
            <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 flex-1 min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14273.205627280391!2d112.29728603076224!3d-7.60470217813801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e786bdd18241f6b%3A0x9614e662e38916dd!2sSelorejo%2C%20Mojowarno%2C%20Jombang%20Regency%2C%20East%20Java!5e1!3m2!1sen!2sid!4v1783164324341!5m2!1sen!2sid"
                width="100%"
                height="100%"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Administrasi column */}
          <div className="rounded-[2rem] bg-white p-8 shadow-xl border border-slate-200 h-full flex flex-col">
            <h3 className="text-3xl font-bold text-emerald-700">Administrasi Penduduk</h3>
            <p className="text-base text-slate-600 mt-3">Ringkasan data kependudukan warga Selorejo.</p>
            <div className="mt-8 grid grid-cols-1 gap-4 flex-1">
              {adminStats.map((item, index) => {
                const isValueOnLeft = index % 2 === 0;

                return (
                  <div
                    key={item.label}
                    className={`grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${
                      isValueOnLeft ? 'grid-cols-[12rem_1fr]' : 'grid-cols-[1fr_12rem]'
                    }`}
                  >
                    {isValueOnLeft ? (
                      <>
                        <div className="flex items-center justify-center bg-gradient-to-br from-emerald-700 via-emerald-500 to-emerald-300 px-4 py-5 text-white">
                          <div className="text-3xl font-extrabold leading-none text-center">{item.value}</div>
                        </div>
                        <div className="flex items-center justify-center px-6 py-5 text-center">
                          <div className="text-xl font-semibold text-slate-600">{item.label}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-center px-6 py-5 text-center">
                          <div className="text-xl font-semibold text-slate-600">{item.label}</div>
                        </div>
                        <div className="flex items-center justify-center bg-gradient-to-br from-emerald-700 via-emerald-500 to-emerald-300 px-4 py-5 text-white">
                          <div className="text-3xl font-extrabold leading-none text-center">{item.value}</div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* === SOTK (card placeholders) === */}
      <section className="w-full max-w-[92rem] mx-auto py-8 px-6">
        <div className="pl-2 md:pl-6">
          <h3 className="text-4xl font-bold text-emerald-700">SOTK</h3>
          <p className="mt-2 text-slate-600">Struktur Organisasi dan Tata Kerja desa.</p>
          
          {/* Mengubah menjadi 4 kolom dengan 'lg:grid-cols-4' */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm transform transition hover:shadow-lg hover:-translate-y-1">
                <div className="h-40 bg-slate-200 flex items-center justify-center text-emerald-600">
                  <Users className="w-12 h-12" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-slate-900">Bagian {i}</h4>
                  <p className="text-sm text-slate-500 mt-2">Jabatan</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Lihat Selengkapnya */}
          <div className="mt-4 flex justify-end">
            <button className="flex items-center gap-2 text-slate-900 font-semibold hover:text-slate-700 transition">
              <FileText className="w-5 h-5" />
              Lihat SOTK Lebih Lengkap
            </button>
          </div>
        </div>
      </section>

      {/* === Berita Desa (placeholder cards) === */}
      <section className="w-full max-w-[92rem] mx-auto py-12 px-6">
        <div className="pl-2 md:pl-6">
          <h3 className="text-3xl font-bold text-emerald-700">Berita Desa</h3>
          <p className="text-slate-600 mt-2">Berita, pengumuman, dan kegiatan terbaru.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm transform transition hover:shadow-lg hover:-translate-y-1">
              <div className="h-40 bg-slate-200 flex items-center justify-center text-emerald-600">
                <Newspaper className="w-12 h-12" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-slate-900">Judul Berita {i}</h4>
                <p className="text-sm text-slate-500 mt-2">Ringkasan singkat berita dan kegiatan desa.</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Selengkapnya */}
          <div className="mt-4 flex justify-end">
            <button className="flex items-center gap-2 text-slate-900 font-semibold hover:text-slate-700 transition">
              <FileText className="w-5 h-5" />
              Lihat Berita Lebih Lengkap
            </button>
          </div>
      </section>

      {/* === Wisata Desa (preview) === */}
      <section className="w-full max-w-[92rem] mx-auto py-12 px-6">
        <div className="pl-2 md:pl-6">
          <h3 className="text-3xl font-bold text-emerald-700">Wisata Desa</h3>
          <p className="text-slate-600 mt-2">Tempat wisata dan atraksi lokal di Selorejo.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-2xl overflow-hidden border bg-white shadow-sm transform transition hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 bg-slate-200 flex items-center justify-center text-emerald-600">
                <MapPin className="w-12 h-12" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">Wisata {i}</h4>
                <p className="text-sm text-slate-500 mt-2">Deskripsi singkat objek wisata.</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Selengkapnya */}
        <div className="mt-4 flex justify-end">
          <Link 
            href="/wisata" 
            className="flex items-center gap-2 text-slate-900 font-semibold hover:text-slate-700 transition"
          >
            <FileText className="w-5 h-5" />
            Lihat Wisata Lebih Lengkap
          </Link>
        </div>
      </section>

      {/* === UMKM / Produk === */}
      <section className="w-full max-w-[92rem] mx-auto py-12 px-6">
        <div className="pl-2 md:pl-6">
          <h3 className="text-3xl font-bold text-emerald-700">UMKM & Produk Desa</h3>
          <p className="text-slate-600 mt-2">Produk khas dan layanan UMKM warga Selorejo.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden border bg-white shadow-sm transform transition hover:shadow-lg hover:-translate-y-1">
            <div className="h-48 bg-slate-200 flex items-center justify-center text-emerald-600">
              <ShoppingBag className="w-12 h-12" />
            </div>
            <div className="p-4">
              <h4 className="font-semibold">Produk Unggulan</h4>
              <p className="text-sm text-slate-500 mt-2">Harga dan deskripsi singkat.</p>
            </div>
          </div>
        </div>

        {/* Tombol Lihat Selengkapnya */}
          <div className="mt-4 flex justify-end">
            <button className="flex items-center gap-2 text-slate-900 font-semibold hover:text-slate-700 transition">
              <FileText className="w-5 h-5" />
              Lihat Produk Lebih Lengkap
            </button>
          </div>
      </section>

      {/* === Galeri Desa (grid placeholders) === */}
      <section className="w-full max-w-[92rem] mx-auto py-12 px-6">
        <div className="pl-2 md:pl-6">
          <h3 className="text-4xl font-bold text-emerald-700">Galeri Desa</h3>
          <p className="mt-2 text-slate-600">Kumpulan foto kegiatan dan potensi desa. Klik gambar untuk memperbesar.</p>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="rounded-xl overflow-hidden border border-slate-100 bg-white shadow-sm transform transition hover:shadow-lg hover:-translate-y-1">
              <div className="h-36 bg-slate-200 flex items-center justify-center text-emerald-600">
                <Camera className="w-10 h-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Selengkapnya */}
          <div className="mt-4 flex justify-end">
            <button className="flex items-center gap-2 text-slate-900 font-semibold hover:text-slate-700 transition">
              <FileText className="w-5 h-5" />
              Lihat Galeri Lebih Lengkap
            </button>
          </div>
      </section>

      <style jsx global>{`
        .hero-carousel .hero-radio {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .hero-carousel .hero-viewport {
          position: absolute;
          inset: 0;
        }

        .hero-carousel .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 700ms ease;
        }

        .hero-carousel .hero-image {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        .hero-carousel .hero-arrow {
          position: absolute;
          top: 50%;
          z-index: 30;
          display: flex;
          height: 3rem;
          width: 3rem;
          transform: translateY(-50%);
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: background-color 200ms ease;
        }

        .hero-carousel .hero-arrow:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .hero-carousel .hero-arrow-left {
          left: 1rem;
        }

        .hero-carousel .hero-arrow-right {
          right: 1rem;
        }

        .hero-carousel .hero-dot {
          display: block;
          height: 0.625rem;
          width: 0.625rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: width 300ms ease, background-color 300ms ease;
        }

        .hero-carousel .hero-dot:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        #hero-slide-0:checked ~ .hero-viewport .hero-slide-0,
        #hero-slide-1:checked ~ .hero-viewport .hero-slide-1,
        #hero-slide-2:checked ~ .hero-viewport .hero-slide-2,
        #hero-slide-3:checked ~ .hero-viewport .hero-slide-3 {
          opacity: 1;
          pointer-events: auto;
        }

        #hero-slide-0:checked ~ .absolute.bottom-6 .hero-dot:nth-child(1),
        #hero-slide-1:checked ~ .absolute.bottom-6 .hero-dot:nth-child(2),
        #hero-slide-2:checked ~ .absolute.bottom-6 .hero-dot:nth-child(3),
        #hero-slide-3:checked ~ .absolute.bottom-6 .hero-dot:nth-child(4) {
          width: 2rem;
          background: #fff;
        }
      `}</style>
    </div>
  );
}