'use client';

import { useEffect, useRef, useState } from 'react';
import { COUNTRIES } from '../../components/Countrypicker';

interface VisitorData {
  count: number;
  byCountry: Record<string, number>;
  daily: Record<string, number>;
  bySource: Record<string, number>;
  byDevice: Record<string, number>;
}

const COUNTRY_MAP = Object.fromEntries(COUNTRIES.map((c) => [c.code, c]));

const BAR_COLORS = [
  '#378ADD', '#1D9E75', '#EF9F27', '#D4537E',
  '#534AB7', '#0F6E56', '#D85A30', '#888780',
  '#3B6D11', '#BA7517', '#185FA5', '#993556',
];

const SOURCE_COLORS: Record<string, string> = {
  organic: '#378ADD', direct: '#1D9E75', social: '#EF9F27', referral: '#D4537E', other: '#888780',
};
const DEVICE_COLORS: Record<string, string> = {
  mobile: '#378ADD', desktop: '#1D9E75', tablet: '#EF9F27',
};

function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}
function getLast7Days(): string[] { return getLast30Days().slice(-7); }
function getLast90Days(): string[] {
  const days: string[] = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}
function formatDayLabel(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

export default function DashboardPage() {
  const [data, setData] = useState<VisitorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const donutChartRef = useRef<HTMLCanvasElement>(null);
  const deviceChartRef = useRef<HTMLCanvasElement>(null);
  const sourceDonutRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lineInstance = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const donutInstance = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deviceInstance = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sourceDonutInstance = useRef<any>(null);

  useEffect(() => {
    fetch('/api/redis')
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || `HTTP ${r.status}`);
        return d as VisitorData;
      })
      .then((d) => {
        setData({
          count: d.count ?? 0,
          byCountry: d.byCountry ?? {},
          daily: d.daily ?? {},
          bySource: d.bySource ?? {},
          byDevice: d.byDevice ?? {},
        });
        setLoading(false);
      })
      .catch((e: Error) => { setError(e.message); setLoading(false); });
  }, []);

  useEffect(() => {
    if (!data) return;

    const loadCharts = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(window as any).Chart) {
        await new Promise<void>((resolve) => {
          const s = document.createElement('script');
          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
          s.onload = () => resolve();
          document.head.appendChild(s);
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Chart = (window as any).Chart;
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
      const textColor = isDark ? '#9c9a92' : '#73726c';

      const days = period === '7d' ? getLast7Days() : period === '90d' ? getLast90Days() : getLast30Days();
      const dayValues = days.map((d) => data.daily[d] ?? 0);
      const dayLabels = days.map(formatDayLabel);

      if (lineChartRef.current) {
        if (lineInstance.current) lineInstance.current.destroy();
        lineInstance.current = new Chart(lineChartRef.current, {
          type: 'line',
          data: {
            labels: dayLabels,
            datasets: [{ label: 'Total Visits', data: dayValues, borderColor: '#378ADD', backgroundColor: 'rgba(55,138,221,0.08)', fill: true, tension: 0.4, pointRadius: 0, borderWidth: 2 }],
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor, maxTicksLimit: 8, font: { size: 11 } } },
              y: { grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 }, callback: (v: number) => v >= 1000 ? Math.round(v / 1000) + 'k' : v } },
            },
          },
        });
      }

      const sourceEntries = Object.entries(data.bySource);
      const sourceTotal = sourceEntries.reduce((s, [, v]) => s + v, 0) || 1;
      if (sourceDonutRef.current) {
        if (sourceDonutInstance.current) sourceDonutInstance.current.destroy();
        sourceDonutInstance.current = new Chart(sourceDonutRef.current, {
          type: 'doughnut',
          data: {
            labels: sourceEntries.map(([k]) => k),
            datasets: [{ data: sourceEntries.map(([, v]) => v), backgroundColor: sourceEntries.map(([k]) => SOURCE_COLORS[k] ?? '#888780'), borderWidth: 0, hoverOffset: 4 }],
          },
          options: { responsive: false, cutout: '72%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: { raw: number; label: string }) => ` ${ctx.label}: ${Math.round((ctx.raw / sourceTotal) * 100)}%` } } } },
        });
      }

      const sorted2 = Object.entries(data.byCountry).sort((a, b) => b[1] - a[1]).slice(0, 10);
      const total2 = sorted2.reduce((s, [, v]) => s + v, 0) || 1;
      if (donutChartRef.current) {
        if (donutInstance.current) donutInstance.current.destroy();
        donutInstance.current = new Chart(donutChartRef.current, {
          type: 'doughnut',
          data: {
            labels: sorted2.map(([code]) => COUNTRY_MAP[code]?.name ?? code),
            datasets: [{ data: sorted2.map(([, v]) => v), backgroundColor: BAR_COLORS.slice(0, sorted2.length), borderWidth: 0, hoverOffset: 6 }],
          },
          options: { responsive: false, cutout: '70%', plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx: { raw: number; label: string }) => ` ${ctx.label}: ${Math.round((ctx.raw / total2) * 100)}%` } } } },
        });
      }

      const dev = data.byDevice;
      if (deviceChartRef.current) {
        if (deviceInstance.current) deviceInstance.current.destroy();
        const devTotal = (dev.mobile ?? 0) + (dev.desktop ?? 0) + (dev.tablet ?? 0) || 1;
        deviceInstance.current = new Chart(deviceChartRef.current, {
          type: 'bar',
          data: {
            labels: [''],
            datasets: [
              { label: 'Mobile', data: [Math.round(((dev.mobile ?? 0) / devTotal) * 100)], backgroundColor: DEVICE_COLORS.mobile, borderRadius: { topLeft: 4, bottomLeft: 4, topRight: 0, bottomRight: 0 } },
              { label: 'Desktop', data: [Math.round(((dev.desktop ?? 0) / devTotal) * 100)], backgroundColor: DEVICE_COLORS.desktop, borderRadius: 0 },
              { label: 'Tablet', data: [Math.round(((dev.tablet ?? 0) / devTotal) * 100)], backgroundColor: DEVICE_COLORS.tablet, borderRadius: { topLeft: 0, bottomLeft: 0, topRight: 4, bottomRight: 4 } },
            ],
          },
          options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true, display: false, max: 100 }, y: { stacked: true, display: false } }, plugins: { legend: { display: false }, tooltip: { enabled: false } } },
        });
      }
    };

    loadCharts();
    return () => {
      lineInstance.current?.destroy();
      donutInstance.current?.destroy();
      deviceInstance.current?.destroy();
      sourceDonutInstance.current?.destroy();
    };
  }, [data, period]);

  const sorted = data ? Object.entries(data.byCountry).sort((a, b) => b[1] - a[1]).slice(0, 10) : [];
  const total = sorted.reduce((s, [, v]) => s + v, 0) || 1;
  const top = sorted[0];
  const periodLabel = { '7d': '7D', '30d': '30D', '90d': '90D' };
  const sourceEntries = data ? Object.entries(data.bySource) : [];
  const sourceTotal = sourceEntries.reduce((s, [, v]) => s + v, 0) || 1;
  const dev = data?.byDevice ?? {};
  const devTotal = (dev.mobile ?? 0) + (dev.desktop ?? 0) + (dev.tablet ?? 0) || 1;

  const card = { background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '0.5px solid rgba(255,255,255,0.6)', borderRadius: 12, padding: 20 } as const;
  const sectionTitle = { fontSize: 11, fontWeight: 500 as const, color: 'rgba(30,30,30,0.5)', textTransform: 'uppercase' as const, letterSpacing: '.06em', marginBottom: 14 };

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .dash-metrics { grid-template-columns: 1fr 1fr !important; }
          .dash-bottom { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ fontFamily: 'var(--font-sora), sans-serif', padding: '16px', maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Traffic Dashboard</h1>
            <p style={{ fontSize: 13, color: 'rgba(30,30,30,0.55)', marginTop: 4 }}>สถิติการเข้าชมเว็บไซต์แบบ Real-time</p>
          </div>
          <span style={{ fontSize: 11, background: 'rgba(29,158,117,0.15)', color: '#0F6E56', padding: '4px 12px', borderRadius: 20, fontWeight: 500, whiteSpace: 'nowrap' }}>● Live</span>
        </div>

        {loading && <p style={{ color: 'rgba(30,30,30,0.5)', fontSize: 14 }}>Loading...</p>}
        {error && <p style={{ color: '#A32D2D', fontSize: 14 }}>{error}</p>}

        {data && (
          <>
            {/* Metric Cards */}
            <div className="dash-metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Total Visits', value: data.count.toLocaleString(), sub: '' },
                { label: 'Countries', value: Object.keys(data.byCountry).length.toString(), sub: '' },
                top ? { label: '#1 Country', value: `${COUNTRY_MAP[top[0]]?.flag ?? '🌐'} ${COUNTRY_MAP[top[0]]?.name ?? top[0]}`, sub: `${top[1].toLocaleString()} visits (${Math.round((top[1] / total) * 100)}%)` } : null,
                sorted.length > 1 ? { label: 'Others', value: `${100 - Math.round(((top?.[1] ?? 0) / total) * 100)}%`, sub: '' } : null,
              ].filter(Boolean).map((m, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '0.5px solid rgba(255,255,255,0.5)', borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ fontSize: 11, color: 'rgba(30,30,30,0.5)', marginBottom: 6, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.05em' }}>{m!.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{m!.value}</div>
                  {m!.sub && <div style={{ fontSize: 11, marginTop: 3, color: '#0F6E56' }}>{m!.sub}</div>}
                </div>
              ))}
            </div>

            {/* Line Chart */}
            <div style={{ ...card, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <div style={sectionTitle}>Daily Visits</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(['7d', '30d', '90d'] as const).map((p) => (
                    <button key={p} onClick={() => setPeriod(p)} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 20, cursor: 'pointer', border: period === p ? 'none' : '0.5px solid rgba(0,0,0,0.15)', background: period === p ? 'rgba(55,138,221,0.15)' : 'rgba(255,255,255,0.5)', color: period === p ? '#185FA5' : 'rgba(30,30,30,0.6)', fontFamily: 'inherit' }}>
                      {periodLabel[p]}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ position: 'relative', width: '100%', height: 200 }}>
                <canvas ref={lineChartRef} />
              </div>
            </div>

            {/* Bottom grid — stacks on mobile */}
            <div className="dash-bottom" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {/* Country list */}
              <div style={card}>
                <div style={sectionTitle}>Visits by Country</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {sorted.map(([code, count], i) => {
                    const pct = Math.round((count / total) * 100);
                    const c = COUNTRY_MAP[code];
                    const isTop = i === 0;
                    return (
                      <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12, color: isTop ? '#185FA5' : 'rgba(30,30,30,0.35)', minWidth: 14, fontWeight: isTop ? 600 : 400 }}>{i + 1}</span>
                        <span style={{ fontSize: 15, width: 22, textAlign: 'center', flexShrink: 0 }}>{c?.flag ?? '🌐'}</span>
                        <span style={{ fontSize: 11, width: 26, color: 'rgba(30,30,30,0.4)', fontWeight: 600, flexShrink: 0 }}>{c?.code ?? code}</span>
                        <span style={{ fontSize: 13, flex: 1, fontWeight: isTop ? 500 : 400, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c?.name ?? code}</span>
                        <div style={{ width: 60, height: 5, background: 'rgba(0,0,0,0.08)', borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: BAR_COLORS[i % BAR_COLORS.length], borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, color: 'rgba(30,30,30,0.5)', minWidth: 30, textAlign: 'right', flexShrink: 0 }}>{pct}%</span>
                        <span style={{ fontSize: 12, color: isTop ? '#185FA5' : 'rgba(30,30,30,0.45)', minWidth: 48, textAlign: 'right', fontWeight: isTop ? 600 : 400, flexShrink: 0 }}>{count.toLocaleString()} visits</span>
                      </div>
                    );
                  })}
                  {sorted.length === 0 && <p style={{ fontSize: 13, color: 'rgba(30,30,30,0.4)' }}>No data yet</p>}
                </div>
              </div>

              {/* Source + Device + Donut stacked */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ ...card, flex: 1 }}>
                  <div style={sectionTitle}>Traffic Source</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
                      <canvas ref={sourceDonutRef} width={100} height={100} />
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>100%</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {sourceEntries.length === 0
                        ? <span style={{ fontSize: 12, color: 'rgba(30,30,30,0.4)' }}>No data yet</span>
                        : sourceEntries.map(([key, val]) => (
                          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(30,30,30,0.6)' }}>
                            <span style={{ width: 10, height: 10, borderRadius: 2, background: SOURCE_COLORS[key] ?? '#888780', flexShrink: 0 }} />
                            <span style={{ flex: 1, textTransform: 'capitalize' }}>{key}</span>
                            <span>{Math.round((val / sourceTotal) * 100)}%</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <div style={{ ...card, flex: 1 }}>
                  <div style={sectionTitle}>Device</div>
                  <div style={{ position: 'relative', width: '100%', height: 36 }}>
                    <canvas ref={deviceChartRef} />
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                    {[{ key: 'mobile', label: 'Mobile', icon: '📱' }, { key: 'desktop', label: 'Desktop', icon: '💻' }, { key: 'tablet', label: 'Tablet', icon: '📟' }].map(({ key, label, icon }) => (
                      <div key={key} style={{ flex: 1, textAlign: 'center' }}>
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                        <div style={{ fontSize: 15, fontWeight: 600 }}>{Math.round(((dev[key] ?? 0) / devTotal) * 100)}%</div>
                        <div style={{ fontSize: 11, color: 'rgba(30,30,30,0.5)' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share donut */}
                <div style={{ ...card, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ ...sectionTitle, alignSelf: 'flex-start' }}>Share</div>
                  <div style={{ position: 'relative', width: 140, height: 140 }}>
                    <canvas ref={donutChartRef} width={140} height={140} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{Object.keys(data.byCountry).length}</span>
                      <span style={{ fontSize: 10, color: 'rgba(30,30,30,0.5)' }}>countries</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14, alignSelf: 'flex-start', width: '100%' }}>
                    {sorted.slice(0, 5).map(([code, count], i) => (
                      <div key={code} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(30,30,30,0.6)' }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: BAR_COLORS[i], flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>{COUNTRY_MAP[code]?.name ?? code}</span>
                        <span style={{ fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#185FA5' : 'rgba(30,30,30,0.6)' }}>{Math.round((count / total) * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}