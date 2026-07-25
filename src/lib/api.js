// lib/api.js
export async function getStatistikPenduduk() {
  const url = "https://script.google.com/macros/s/AKfycbyHWyDemUVLgkDExoA3__K8bJLTop3fyL85xt9GABcFZGLZWG-u59reO5tiqvA0V886/exec"; 
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error('Gagal mengambil data');
  }
  return res.json();
}