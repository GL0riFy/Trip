"use client";

import { useState, useMemo } from "react";
import { ChiangMaiData } from "@/src/data/chiangmai";

// ---- Types ----------------------------------------------------------------


interface PlaceCard {
  id: string;
  name: string;
  desc: string;
  location: string;
  image: string;
  price: string;
  hours: string;
}

// ---- Helper ----------------------------------------------------------------

const LOCALE = "th";

function tripsToCards(trips: any[]): PlaceCard[] {
  return trips.map((t) => ({
    id: t.id,
    name: t.title?.[LOCALE] ?? t.id,
    desc: t.detail?.[LOCALE] ?? "",
    location: t.detail_more?.location ?? "",
    image: t.detail_more?.img ?? "",
    price: t.price?.[LOCALE] ?? "",
    hours: t.hours?.[LOCALE] ?? "",
  }));
}

// ---- Icons -----------------------------------------------------------------

function PinIcon() {
  return (
    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

// ---- Card ------------------------------------------------------------------

function PlaceCardItem({
  place,
  onClick,
}: {
  place: PlaceCard;
  onClick: (p: PlaceCard) => void;
}) {
  const [imgErr, setImgErr] = useState(false);

  return (
    <article
      onClick={() => onClick(place)}
      className="group bg-white border border-stone-200/80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-sm"
    >
      <div className="relative h-44 bg-stone-100 overflow-hidden">
        {place.image && !imgErr ? (
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl select-none">
            🏔️
          </div>
        )}
        {place.price && (
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              {place.price}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {place.location && (
          <p className="text-[11px] text-stone-400 mb-1.5 flex items-center gap-1 truncate">
            <PinIcon />
            {place.location}
          </p>
        )}
        <h3 className="font-semibold text-[15px] text-stone-800 mb-1.5 leading-snug line-clamp-2">
          {place.name}
        </h3>
        {place.desc && (
          <p className="text-[12px] text-stone-500 leading-relaxed line-clamp-2 mb-3">
            {place.desc}
          </p>
        )}
        {place.hours && (
          <div className="flex items-center gap-1 text-[11px] text-stone-400">
            <ClockIcon />
            {place.hours}
          </div>
        )}
      </div>
    </article>
  );
}

// ---- Stat Card -------------------------------------------------------------

function StatCard({ num, label }: { num: number; label: string }) {
  return (
    <div className="bg-stone-50 rounded-xl px-4 py-3 flex-1 min-w-[90px]">
      <div className="text-2xl font-semibold text-stone-800">{num}</div>
      <div className="text-[11px] text-stone-500 mt-0.5">{label}</div>
    </div>
  );
}

// ---- Main Page -------------------------------------------------------------

export default function TouristAttractions() {
  const allPlaces = useMemo<PlaceCard[]>(
    () => tripsToCards(ChiangMaiData),
    []
  );

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allPlaces;
    return allPlaces.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
    );
  }, [allPlaces, search]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* ── Hero ── */}
      <header className="bg-white border-b border-stone-200/80 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-widest text-stone-400 uppercase mb-1.5">
            🌿 เชียงใหม่ ประเทศไทย
          </p>
          <h1 className="text-3xl font-bold text-stone-800 mb-1.5 leading-tight">
            สถานที่<span className="text-emerald-700">เที่ยวเชียงใหม่</span>
          </h1>
          <p className="text-sm text-stone-500 max-w-xl leading-relaxed">
            สำรวจสถานที่ท่องเที่ยว วัด และธรรมชาติในเชียงใหม่ ครบทุกอำเภอ
          </p>
          <div className="flex gap-3 mt-5 flex-wrap">
            <StatCard num={allPlaces.length} label="สถานที่ทั้งหมด" />
          </div>
        </div>
      </header>

      {/* ── Search (sticky) ── */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-stone-200/70 px-6 py-3">
        <div className="max-w-5xl mx-auto">
          <div className="relative max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(12); }}
              placeholder="ค้นหาสถานที่, พื้นที่..."
              className="w-full pl-9 pr-8 py-2 text-sm border border-stone-200 rounded-xl bg-stone-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-colors"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setVisibleCount(12); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        <p className="text-sm text-stone-500 mb-4">
          แสดง{" "}
          <span className="font-semibold text-stone-700">{visible.length}</span>{" "}
          จาก {filtered.length} สถานที่
          {search && (
            <span className="ml-1.5 text-emerald-600">
              ตรงกับ &ldquo;{search}&rdquo;
            </span>
          )}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-base">ไม่พบสถานที่ที่ค้นหา</p>
            <button
              onClick={() => { setSearch(""); setVisibleCount(12); }}
              className="mt-3 text-sm text-emerald-600 hover:underline"
            >
              ล้างการค้นหา
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visible.map((place) => (
                <PlaceCardItem
                  key={place.id}
                  place={place}
                  onClick={(p) => console.log("Selected:", p)}
                />
              ))}
            </div>
            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisibleCount((c) => c + 12)}
                  className="px-6 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-colors"
                >
                  ดูเพิ่มเติม ({filtered.length - visibleCount} สถานที่)
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}