"use client";

import { useState } from 'react';

const populationStats = [
  { label: 'Total Penduduk', value: '1.890', unit: 'Jiwa', tone: 'text-emerald-500' },
  { label: 'Kepala Keluarga', value: '436', unit: 'Jiwa', tone: 'text-emerald-500' },
  { label: 'Perempuan', value: '960', unit: 'Jiwa', tone: 'text-emerald-500' },
  { label: 'Laki-Laki', value: '930', unit: 'Jiwa', tone: 'text-emerald-500' },
];

const dusunData = [
  { name: 'Tamang', value: 395, color: '#5470c6' },
  { name: 'Lubang Landak', value: 548, color: '#91cc75' },
  { name: 'Sengkabang', value: 477, color: '#fac858' },
  { name: 'BAA', value: 283, color: '#ee6666' },
];

const marriageData = [
  { label: 'Belum Kawin', value: 976 },
  { label: 'Kawin', value: 874 },
  { label: 'Cerai Mati', value: 36 },
  { label: 'Cerai Hidup', value: 0 },
  { label: 'Kawin Tercatat', value: 0 },
  { label: 'Kawin Tidak Tercatat', value: 0 },
];

const religionData = [
  { label: 'Islam', value: 988 },
  { label: 'Katolik', value: 890 },
  { label: 'Kristen', value: 7 },
  { label: 'Kepercayaan lainnya', value: 1 },
  { label: 'Buddha', value: 0 },
  { label: 'Konghucu', value: 0 },
  { label: 'Hindu', value: 0 },
];

const marriageBars = [
  { label: 'Belum Kawin', value: 976, accent: 'bg-emerald-500', color: '#10b981' },
  { label: 'Kawin', value: 874, accent: 'bg-lime-400', color: '#84cc16' },
  { label: 'Cerai Mati', value: 36, accent: 'bg-green-300', color: '#86efac' },
  { label: 'Cerai Hidup', value: 0, accent: 'bg-green-200', color: '#bbf7d0' },
  { label: 'Kawin Tercatat', value: 0, accent: 'bg-emerald-300', color: '#6ee7b7' },
  { label: 'Kawin Tidak Tercatat', value: 0, accent: 'bg-teal-300', color: '#5eead4' },
];

const religionBars = [
  { label: 'Islam', value: 988, accent: 'bg-emerald-500', color: '#10b981' },
  { label: 'Katolik', value: 890, accent: 'bg-lime-400', color: '#84cc16' },
  { label: 'Kristen', value: 7, accent: 'bg-green-300', color: '#86efac' },
  { label: 'Kepercayaan lainnya', value: 1, accent: 'bg-emerald-300', color: '#6ee7b7' },
  { label: 'Buddha', value: 0, accent: 'bg-teal-300', color: '#5eead4' },
  { label: 'Konghucu', value: 0, accent: 'bg-green-200', color: '#bbf7d0' },
  { label: 'Hindu', value: 0, accent: 'bg-emerald-200', color: '#a7f3d0' },
];

const pieSegments = [
  { start: 0, end: 83.19, color: '#91cc75' },
  { start: 83.19, end: 155.81, color: '#fac858' },
  { start: 155.81, end: 219, color: '#ee6666' },
  { start: 219, end: 360, color: '#5470c6' },
];

function formatPercent(value, total) {
  return ((value / total) * 100).toFixed(2);
}

function getValueTone(value) {
  return value === 0 ? 'text-slate-400' : 'text-emerald-500';
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

  return (
    <div className="rounded-xl bg-white p-4 shadow-[0_1px_4px_rgba(15,23,42,0.08)]">
      <div className="text-sm uppercase tracking-wide text-slate-500">{label}</div>
      <div className={`mt-2 text-3xl font-medium ${getValueTone(numericValue)}`}>
        {value} <span className="text-lg text-slate-600">{unit}</span>
      </div>
    </div>
  );
}

function SectionTitle({ title }) {
  return <h2 className="text-3xl font-extrabold text-emerald-500">{title}</h2>;
}

function ProgressRow({ label, value, accent }) {
  const width = Math.max(value, 2);
  const valueTone = value === 0 ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="grid grid-cols-[180px_1fr_70px] items-center gap-4">
      <div className="text-sm font-medium text-slate-700">{label}</div>
      <div className="h-4 rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full ${accent}`} style={{ width: `${width === 0 ? 0 : Math.min(width / 10, 100)}%` }} />
      </div>
      <div className={`text-sm text-right ${valueTone}`}>{value}</div>
    </div>
  );
}

function HoverTip({ title, lines, align = 'left' }) {
  return (
    <div className={`pointer-events-none absolute top-0 z-20 w-72 -translate-y-3 rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white shadow-2xl opacity-0 transition duration-200 group-hover:opacity-100 ${align === 'right' ? 'right-0 translate-x-6' : 'left-0 -translate-x-6'}`}>
      <div className="text-sm font-semibold text-emerald-300">{title}</div>
      <div className="mt-2 space-y-1 text-slate-100">
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
    </div>
  );
}

export default function InfografisPage() {
  const totalDusun = dusunData.reduce((sum, item) => sum + item.value, 0);
  const totalMarriage = marriageData.reduce((sum, item) => sum + item.value, 0);
  const totalReligion = religionData.reduce((sum, item) => sum + item.value, 0);
  const [activeDusun, setActiveDusun] = useState(null);

  const svgSize = 280;
  const center = svgSize / 2;
  const outerRadius = 100;
  const innerRadius = 58;

  let currentAngle = -90;
  const interactiveDusun = dusunData.map((item, index) => {
    const angleSpan = (item.value / totalDusun) * 360;
    const segment = {
      ...item,
      index,
      startAngle: currentAngle,
      endAngle: currentAngle + angleSpan,
      percent: formatPercent(item.value, totalDusun),
    };
    currentAngle += angleSpan;
    return segment;
  });

  const hoveredDusun = activeDusun;

  return (
    <div className="min-h-screen bg-slate-50 px-6 pb-16 pt-28 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-12">
        <header className="text-center sm:text-left">
          <div className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
            Infografis Desa
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-emerald-700 sm:text-5xl">
            Data Kependudukan Selorejo
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Halaman ini berisi data dummy infografis yang mengikuti susunan gambar: ringkasan penduduk, sebaran dusun, status perkawinan, dan agama.
          </p>
        </header>

        <section>
          <SectionTitle title="Jumlah Penduduk dan Kepala Keluarga" />
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {populationStats.map((item) => (
              <StatCard key={item.label} label={item.label} value={item.value} unit={item.unit} tone={item.tone} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.75rem] bg-white p-8 shadow-[0_1px_6px_rgba(15,23,42,0.08)]">
            <SectionTitle title="Berdasarkan Dusun" />
            <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_auto] xl:items-center">
              <div className="space-y-3 text-slate-900">
                <div className="mb-6 text-lg font-semibold text-slate-900">Keterangan:</div>
                {dusunData.map((item) => (
                  <div key={item.name} className="text-sm">
                    <span className="font-semibold uppercase text-slate-800">{item.name}</span>
                    <span className="ml-2 text-slate-700">: {item.value} Jiwa</span>
                  </div>
                ))}
              </div>

              <div className="group relative flex flex-col items-center justify-center gap-4">
                <div className="relative h-[280px] w-[280px] cursor-pointer select-none">
                  <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="h-full w-full drop-shadow-[0_12px_20px_rgba(15,23,42,0.16)]">
                    {interactiveDusun.map((segment) => (
                      <path
                        key={segment.name}
                        d={getArcPath(center, center, outerRadius, innerRadius, segment.startAngle, segment.endAngle)}
                        fill={segment.color}
                        opacity={hoveredDusun?.name === segment.name ? 1 : 0.95}
                        className="transition duration-150 hover:opacity-100 focus:opacity-100"
                        tabIndex={0}
                        role="button"
                        aria-label={`${segment.name} ${segment.value} jiwa`}
                        onMouseEnter={() => setActiveDusun(segment)}
                        onMouseLeave={() => setActiveDusun(null)}
                        onFocus={() => setActiveDusun(segment)}
                        onBlur={() => setActiveDusun(null)}
                      />
                    ))}
                    <circle cx={center} cy={center} r={innerRadius} fill="#ffffff" />
                  </svg>

                  {hoveredDusun && (
                    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-xl">
                      <div className="text-sm font-semibold text-slate-700">{hoveredDusun.name}</div>
                      <div className="mt-1 text-sm font-bold text-emerald-600">
                        {hoveredDusun.value} Jiwa ({hoveredDusun.percent}%)
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  {interactiveDusun.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>
                        {item.name} : {item.value} Jiwa ({item.percent}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] bg-white p-8 shadow-[0_1px_6px_rgba(15,23,42,0.08)]">
            <SectionTitle title="Ringkasan Dusun" />
            <div className="mt-8 space-y-5">
              {dusunData.map((item) => (
                <div key={item.name} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                    <span>{item.name}</span>
                    <span>{formatPercent(item.value, totalDusun)}%</span>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(item.value / totalDusun) * 100}%`, backgroundColor: item.color }} />
                  </div>
                  <div className="mt-2 text-sm text-slate-500">{item.value} jiwa</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] bg-white p-8 shadow-[0_1px_6px_rgba(15,23,42,0.08)]">
          <SectionTitle title="Berdasarkan Perkawinan" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {marriageData.map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-5 text-left shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:bg-slate-100">
                  <div className="text-xl font-medium text-slate-600">{item.label}</div>
                  <div className={`mt-3 text-3xl font-light ${item.value === 0 ? 'text-slate-400' : 'text-emerald-500'}`}>{item.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="text-lg font-semibold text-slate-900">Grafik Dummy</div>
              {marriageBars.map((item) => (
                <div key={item.label} className="group relative w-full rounded-2xl bg-transparent text-left transition hover:bg-slate-50">
                  <ProgressRow label={item.label} value={item.value} accent={item.accent} />
                  <div className="pointer-events-none absolute left-full top-1/2 z-20 ml-4 w-72 -translate-y-1/2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-2xl opacity-0 transition duration-200 group-hover:opacity-100">
                    <div className="text-sm font-semibold text-slate-700">Grafik Perkawinan</div>
                    <div className="mt-2 text-sm text-emerald-600">
                      {item.label}: {item.value} jiwa
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-sm text-slate-500">Total data: {totalMarriage} jiwa</div>
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] bg-white p-8 shadow-[0_1px_6px_rgba(15,23,42,0.08)]">
          <SectionTitle title="Berdasarkan Agama" />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {religionData.map((item) => (
                <div key={item.label} className="rounded-2xl bg-slate-50 p-5 text-left shadow-[0_1px_3px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:bg-slate-100">
                  <div className="text-xl font-medium text-slate-600">{item.label}</div>
                  <div className={`mt-3 text-3xl font-light ${item.value === 0 ? 'text-slate-400' : 'text-emerald-500'}`}>{item.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="text-lg font-semibold text-slate-900">Diagram Dummy</div>
              {religionBars.map((item) => (
                <div key={item.label} className="group relative w-full rounded-2xl bg-transparent text-left transition hover:bg-slate-50">
                  <ProgressRow label={item.label} value={item.value} accent={item.accent} />
                  <div className="pointer-events-none absolute left-full top-1/2 z-20 ml-4 w-72 -translate-y-1/2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-2xl opacity-0 transition duration-200 group-hover:opacity-100">
                    <div className="text-sm font-semibold text-slate-700">Grafik Agama</div>
                    <div className="mt-2 text-sm text-emerald-600">
                      {item.label}: {item.value} jiwa
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-sm text-slate-500">Total data: {totalReligion} jiwa</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}