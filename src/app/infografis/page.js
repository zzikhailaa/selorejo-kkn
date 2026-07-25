"use client";
import {useState, useEffect} from "react";

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyHWyDemUVLgkDExoA3__K8bJLTop3fyL85xt9GABcFZGLZWG-u59reO5tiqvA0V886/exec'; 

// Warna per dusun
const DUSUN_COLORS = ['#5470c6', '#91cc75', '#fac858', '#ee6666'];

// Warna per status perkawinan
const KAWIN_COLORS = ['#10b981', '#84cc16', '#86efac', '#bbf7d0', '#6ee7b7'];
const KAWIN_ACCENT = ['bg-emerald-500', 'bg-lime-400', 'bg-green-300', 'bg-green-200', 'bg-emerald-300'];

// Warna per agama
const AGAMA_COLORS = ['#10b981', '#84cc16', '#86efac', '#5eead4', '#bbf7d0', '#a7f3d0'];
const AGAMA_ACCENT = ['bg-emerald-500', 'bg-lime-400', 'bg-green-300', 'bg-teal-300', 'bg-green-200', 'bg-emerald-200'];

function formatPercent(value, total) {
  if (!total || total === 0) return '0.00';
  return ((value / total) * 100).toFixed(2);
}

function getArcPath(cx, cy, outerRadius, innerRadius, startAngle, endAngle) {
  const startRadians = ((startAngle - 90) * Math.PI) / 180;
  const endRadians = ((endAngle - 90) * Math.PI) / 180;

  const outerStartX = cx + outerRadius * Math.cos(startRadians);
  const outerStartY = cy + outerRadius * Math.sin(startRadians);
  const outerEndX = cx + outerRadius * Math.cos(endRadians);
  const outerEndY = cy + outerRadius * Math.sin(endRadians);
  const innerStartX = cx + innerRadius * Math.cos(endRadians);
  const innerStartY = cy + innerRadius * Math.sin(endRadians);
  const innerEndX = cx + innerRadius * Math.cos(startRadians);
  const innerEndY = cy + innerRadius * Math.sin(startRadians);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    'M', outerStartX, outerStartY,
    'A', outerRadius, outerRadius, 0, largeArcFlag, 1, outerEndX, outerEndY,
    'L', innerStartX, innerStartY,
    'A', innerRadius, innerRadius, 0, largeArcFlag, 0, innerEndX, innerEndY,
    'Z',
  ].join(' ');
}

function StatCard({ label, value, unit }) {
  const numericValue = Number(String(value).replace(/\./g, ''));
  const tone = numericValue === 0 ? 'text-slate-400' : 'text-emerald-500';

  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_1px_4px_rgba(15,23,42,0.08)]">
      <div className="text-sm uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`mt-2 text-3xl font-medium ${tone}`}>
        {value.toLocaleString('id-ID')} <span className="text-lg text-slate-600">{unit}</span>
      </div>
    </div>
  );
}

function SectionTitle({ title }) {
  return <h2 className="text-3xl font-extrabold text-emerald-500">{title}</h2>;
}

function ProgressRow({ label, value, accent, maxValue }) {
  const widthPercent = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0;
  const valueTone = value === 0 ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="grid grid-cols-[180px_1fr_70px] items-center gap-4">
      <div className="text-sm font-medium text-slate-700">{label}</div>
      <div className="h-4 rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full ${accent}`} style={{ width: `${widthPercent}%` }} />
      </div>
      <div className={`text-sm text-right ${valueTone}`}>{value.toLocaleString('id-ID')}</div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-20 rounded-xl bg-slate-200" />
      ))}
    </div>
  );
}

export default function InfografisPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDusun, setActiveDusun] = useState(null);

 useEffect(() => {
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('https://script.google.com/macros/s/AKfycbyHWyDemUVLgkDExoA3__K8bJLTop3fyL85xt9GABcFZGLZWG-u59reO5tiqvA0V886/exec', { signal: controller.signal, cache: 'no-store' });
      
      // Ambil teks mentah dulu untuk memastikan ini benar-benar JSON
      const text = await res.text();
      console.log("Respon Mentah dari Server:", text); 
      
      const json = JSON.parse(text);
      setData(json);
      setLoading(false);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Fetch error:', err);
        setError(err.message);
      }
      setLoading(false);
    }
  };

  fetchData();
  return () => controller.abort();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 pb-16 pt-28">
        <div className="mx-auto max-w-7xl">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 pb-16 pt-28">
        <div className="mx-auto max-w-7xl rounded-xl bg-red-50 p-8 text-center text-red-600">
          <p className="text-lg font-semibold">Gagal memuat data</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // ── Statistik Umum ──────────────────────────────────────────────
  const statUmum = data?.statistik_umum || {};

  // Sesuaikan key ini dengan nama baris di kolom D sheet STATISTIK_UMUM kamu
  const populationStats = [
  { 
    label: 'Total Penduduk',  
    value: Number(statUmum['Jumlah Penduduk'] || 0) 
  },
  { 
    label: 'Kepala Keluarga', 
    value: Number(statUmum['Jumlah Kepala Keluarga'] || statUmum['Kepala Keluarga'] || 0) 
  },
  { 
    label: 'Perempuan',       
    // Menambahkan penanganan untuk kemungkinan ada spasi tambahan di JSON
    value: Number(statUmum['Perempuan'] || statUmum['Perempuan '] || 0) 
  },
  { 
    label: 'Laki-Laki',       
    // Menambahkan penanganan untuk 'Laki - Laki' dengan spasi yang benar
    value: Number(statUmum['Laki - Laki'] || statUmum['Laki - Laki '] || statUmum['Laki-Laki'] || 0) 
  },
];

  console.log("Daftar Key di statistik_umum:", Object.keys(statUmum));

  // ── Dusun ────────────────────────────────────────────────────────
  const rawDusun = data?.statistik_dusun || [];
  const dusunData = rawDusun.map((item, i) => ({
    name: item.nama,
    value: Number(item.jumlah || 0),
    color: DUSUN_COLORS[i % DUSUN_COLORS.length],
  }));
  const totalDusun = dusunData.reduce((sum, d) => sum + d.value, 0);

  // Pie chart segments
  const svgSize = 280;
  const center = svgSize / 2;
  const outerRadius = 100;
  const innerRadius = 58;
  let currentAngle = 0;
  const interactiveDusun = dusunData.map((item) => {
    const angleSpan = totalDusun > 0 ? (item.value / totalDusun) * 360 : 0;
    const segment = {
      ...item,
      startAngle: currentAngle,
      endAngle: currentAngle + angleSpan,
      percent: formatPercent(item.value, totalDusun),
    };
    currentAngle += angleSpan;
    return segment;
  });

  // ── Perkawinan ───────────────────────────────────────────────────
  const rawDetail = data?.statistik_detail || [];
  const kawinData = rawDetail
    .filter((d) => d.jenis === 'Perkawinan')
    .map((d, i) => ({
      label: d.nama_detail,
      value: Number(d.jumlah || 0),
      accent: KAWIN_ACCENT[i % KAWIN_ACCENT.length],
    }));
  const totalKawin = kawinData.reduce((sum, d) => sum + d.value, 0);
  const maxKawin = Math.max(...kawinData.map((d) => d.value), 1);

  // ── Agama ────────────────────────────────────────────────────────
  const agamaData = rawDetail
    .filter((d) => d.jenis === 'Agama')
    .map((d, i) => ({
      label: d.nama_detail,
      value: Number(d.jumlah || 0),
      accent: AGAMA_ACCENT[i % AGAMA_ACCENT.length],
    }));
  const totalAgama = agamaData.reduce((sum, d) => sum + d.value, 0);
  const maxAgama = Math.max(...agamaData.map((d) => d.value), 1);

  return (
    <div className="min-h-screen bg-slate-50 px-6 pb-16 pt-28 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-12">

        {/* ── Header ── */}
        <header className="text-center sm:text-left">
          <div className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Infografis Desa
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-emerald-700 sm:text-5xl">
            Data Kependudukan Selorejo
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Halaman ini berisi data infografis real-time yang diambil langsung dari database desa: ringkasan penduduk, sebaran dusun, status perkawinan, dan agama.
          </p>
        </header>

        {/* ── Jumlah Penduduk ── */}
        <section>
          <SectionTitle title="Jumlah Penduduk dan Kepala Keluarga" />
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {populationStats.map((item) => (
              <StatCard key={item.label} label={item.label} value={item.value} unit="Jiwa" />
            ))}
          </div>
        </section>

        {/* ── Berdasarkan Dusun ── */}
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.75rem] bg-white p-8 shadow-[0_1px_6px_rgba(15,23,42,0.08)]">
            <SectionTitle title="Berdasarkan Dusun" />
            <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_auto] xl:items-center">

              {/* Keterangan */}
              <div className="space-y-3 text-slate-900">
                <div className="mb-6 text-lg font-semibold text-slate-900">Keterangan:</div>
                {dusunData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-sm">
                    <span className="inline-block h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold uppercase text-slate-800">{item.name}</span>
                    <span className="text-slate-700">: {item.value.toLocaleString('id-ID')} Jiwa</span>
                  </div>
                ))}
              </div>

              {/* Pie Chart */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative h-[280px] w-[280px] cursor-pointer select-none">
                  <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="h-full w-full drop-shadow-[0_12px_20px_rgba(15,23,42,0.16)]">
                    {totalDusun > 0 ? (
                      interactiveDusun.map((segment) => (
                        <path
                          key={segment.name}
                          d={getArcPath(center, center, outerRadius, innerRadius, segment.startAngle, segment.endAngle)}
                          fill={segment.color}
                          opacity={activeDusun?.name === segment.name ? 1 : 0.9}
                          className="transition duration-150"
                          tabIndex={0}
                          role="button"
                          aria-label={`${segment.name} ${segment.value} jiwa`}
                          onMouseEnter={() => setActiveDusun(segment)}
                          onMouseLeave={() => setActiveDusun(null)}
                          onFocus={() => setActiveDusun(segment)}
                          onBlur={() => setActiveDusun(null)}
                        />
                      ))
                    ) : (
                      <circle cx={center} cy={center} r={outerRadius} fill="#e2e8f0" />
                    )}
                    <circle cx={center} cy={center} r={innerRadius} fill="#ffffff" />
                  </svg>

                  {activeDusun && (
                    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-xl text-center">
                      <div className="text-sm font-semibold text-slate-700">{activeDusun.name}</div>
                      <div className="mt-1 text-sm font-bold text-emerald-600">
                        {activeDusun.value.toLocaleString('id-ID')} Jiwa ({activeDusun.percent}%)
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  {interactiveDusun.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span className="inline-block h-3 w-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span>
                        {item.name} : {item.value.toLocaleString('id-ID')} Jiwa ({item.percent}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Berdasarkan Perkawinan ── */}
        <section className="rounded-[1.75rem] bg-white p-8 shadow-[0_1px_6px_rgba(15,23,42,0.08)]">
          <SectionTitle title="Berdasarkan Perkawinan" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">

            {/* Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {kawinData.map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-5 text-left shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:bg-slate-100">
                  <div className="text-xl font-medium text-slate-600">{item.label}</div>
                  <div className={`mt-3 text-3xl font-light ${item.value === 0 ? 'text-slate-400' : 'text-emerald-500'}`}>
                    {item.value.toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div className="space-y-4">
              <div className="text-lg font-semibold text-slate-900">Grafik Perkawinan</div>
              {kawinData.map((item) => (
                <div key={item.label} className="group relative w-full rounded-2xl bg-transparent text-left transition hover:bg-slate-50">
                  <ProgressRow label={item.label} value={item.value} accent={item.accent} maxValue={maxKawin} />
                  <div className="pointer-events-none absolute left-full top-1/2 z-20 ml-4 w-64 -translate-y-1/2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-2xl opacity-0 transition duration-200 group-hover:opacity-100">
                    <div className="text-sm font-semibold text-slate-700">Status Perkawinan</div>
                    <div className="mt-2 text-sm text-emerald-600">
                      {item.label}: {item.value.toLocaleString('id-ID')} jiwa
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {formatPercent(item.value, totalKawin)}% dari total
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-sm text-slate-500">Total data: {totalKawin.toLocaleString('id-ID')} jiwa</div>
            </div>

          </div>
        </section>

        {/* ── Berdasarkan Agama ── */}
        <section className="rounded-[1.75rem] bg-white p-8 shadow-[0_1px_6px_rgba(15,23,42,0.08)]">
          <SectionTitle title="Berdasarkan Agama" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

            {/* Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {agamaData.map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-5 text-left shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:bg-slate-100">
                  <div className="text-xl font-medium text-slate-600">{item.label}</div>
                  <div className={`mt-3 text-3xl font-light ${item.value === 0 ? 'text-slate-400' : 'text-emerald-500'}`}>
                    {item.value.toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div className="space-y-4">
              <div className="text-lg font-semibold text-slate-900">Diagram Agama</div>
              {agamaData.map((item) => (
                <div key={item.label} className="group relative w-full rounded-2xl bg-transparent text-left transition hover:bg-slate-50">
                  <ProgressRow label={item.label} value={item.value} accent={item.accent} maxValue={maxAgama} />
                  <div className="pointer-events-none absolute left-full top-1/2 z-20 ml-4 w-64 -translate-y-1/2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-2xl opacity-0 transition duration-200 group-hover:opacity-100">
                    <div className="text-sm font-semibold text-slate-700">Agama</div>
                    <div className="mt-2 text-sm text-emerald-600">
                      {item.label}: {item.value.toLocaleString('id-ID')} jiwa
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      {formatPercent(item.value, totalAgama)}% dari total
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-sm text-slate-500">Total data: {totalAgama.toLocaleString('id-ID')} jiwa</div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}