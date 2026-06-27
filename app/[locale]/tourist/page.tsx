"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  Search,
  X,
  Mountain,
  Leaf,
  ChevronDown,
} from "lucide-react";

// ---- Types ----------------------------------------------------------------

interface PlaceCard {
  id: string;
  slug: string; // เปลี่ยนมาเน้นใช้ slug สำหรับทำ Routing
  name: string;
  desc: string;
  location: string;
  lat: number;
  lng: number;
  tag: string;
  image: string;
  gallery: string[];
  price: string;
  hours: string;
}

// ---- i18n -----------------------------------------------------------------

const UI_TEXT = {
  th: {
    region: "เชียงใหม่ ประเทศไทย",
    titlePrefix: "สถานที่",
    titleHighlight: "เที่ยวเชียงใหม่",
    subtitle: "สำรวจสถานที่ท่องเที่ยว วัด และธรรมชาติในเชียงใหม่ ครบทุกอำเภอ",
    searchPlaceholder: "ค้นหาสถานที่, พื้นที่...",
    showing: "แสดง",
    of: "จาก",
    places: "สถานที่",
    matchingQuery: (q: string) => `ตรงกับ "${q}"`,
    noResults: "ไม่พบสถานที่ที่ค้นหา",
    clearSearch: "ล้างการค้นหา",
    loadMore: (n: number) => `ดูเพิ่มเติม (${n} สถานที่)`,
  },
  en: {
    region: "Chiang Mai, Thailand",
    titlePrefix: "Explore",
    titleHighlight: "Chiang Mai",
    subtitle: "Discover temples, nature, and attractions across every district of Chiang Mai.",
    searchPlaceholder: "Search places, areas...",
    showing: "Showing",
    of: "of",
    places: "places",
    matchingQuery: (q: string) => `matching "${q}"`,
    noResults: "No places found",
    clearSearch: "Clear search",
    loadMore: (n: number) => `Load more (${n} places)`,
  },
  zh: {
    region: "清迈，泰国",
    titlePrefix: "探索",
    titleHighlight: "清迈",
    subtitle: "发现清迈各区的寺庙、自然风光和旅游景点。",
    searchPlaceholder: "搜索地点、区域...",
    showing: "显示",
    of: "共",
    places: "个地点",
    matchingQuery: (q: string) => `匹配 "${q}"`,
    noResults: "未找到相关地点",
    clearSearch: "清除搜索",
    loadMore: (n: number) => `加载更多（${n} 个地点）`,
  },
} as const;

type SupportedLocale = keyof typeof UI_TEXT;

function getT(locale: string) {
  const key = (locale as SupportedLocale) in UI_TEXT ? (locale as SupportedLocale) : "en";
  return UI_TEXT[key];
}

// ---- Card Item -------------------------------------------------------------

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
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <Mountain className="w-14 h-14" strokeWidth={1} />
          </div>
        )}
        {place.tag && (
          <div className="absolute top-2.5 left-2.5">
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              {place.tag}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        {place.location && (
          <p className="text-[11px] text-stone-400 mb-1.5 flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 shrink-0" />
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
            <Clock className="w-3 h-3 shrink-0" />
            {place.hours}
          </div>
        )}
      </div>
    </article>
  );
}

// ---- Main Page -------------------------------------------------------------

export default function TouristAttractions() {
  const { locale } = useParams();
  const router = useRouter();
  const LOCALE = (locale as string) ?? "en";
  const t = getT(locale as string);

  const [allPlaces, setAllPlaces] = useState<PlaceCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  // ดึงข้อมูลสถานที่ท่องเที่ยวจาก API บน MongoDB
  useEffect(() => {
    async function fetchTourists() {
      try {
        const res = await fetch("/api/tourists");
        const json = await res.json();
        
        if (json.success && json.data) {
          // แปลงโครงสร้างข้อมูลจาก MongoDB เข้าสู่ตัวแปรที่ใช้เรนเดอร์ UI
          const formatted: PlaceCard[] = json.data.map((t: any) => {
            const loc = t.locales?.[LOCALE] || t.locales?.['en'] || {};
            return {
              id: t.id,
              slug: t.slug, // แมปค่า slug
              name: loc.name || t.id,
              desc: loc.desc || "",
              tag: loc.tag || "",
              location: loc.location || "",
              lat: t.coords?.lat || 0,
              lng: t.coords?.lng || 0,
              image: t.image || "",
              gallery: t.gallery || [],
              price: loc.price || "-",
              hours: loc.hours || "-",
            };
          });
          setAllPlaces(formatted);
        }
      } catch (error) {
        console.error("Failed to load tourist attractions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTourists();
  }, [LOCALE]);

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
    <main className="min-h-screen pt-20">
      {/* ── Hero ── */}
      <header className="bg-white border-b border-stone-200/80 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] tracking-widest text-stone-400 uppercase mb-1.5 flex items-center gap-1.5">
            <Leaf className="w-3 h-3 text-emerald-500" />
            {t.region}
          </p>
          <h1 className="text-3xl font-bold text-stone-800 mb-1.5 leading-tight">
            {t.titlePrefix}
            <span className="text-emerald-700">{t.titleHighlight}</span>
          </h1>
          <p className="text-sm text-stone-500 max-w-xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </header>

      {/* ── Search (sticky) ── */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-stone-200/70 px-6 py-3">
        <div className="max-w-5xl mx-auto">
          <div className="relative max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search className="w-4 h-4 text-stone-400" />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setVisibleCount(12);
              }}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 text-sm border border-stone-200 rounded-xl bg-stone-50 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-colors"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setVisibleCount(12);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Grid Content ── */}
      <section className="max-w-5xl mx-auto px-6 py-6">
        {loading ? (
          <div className="text-center py-20 text-stone-400 text-sm">
            กำลังโหลดข้อมูลสถานที่ท่องเที่ยว...
          </div>
        ) : (
          <>
            <p className="text-sm text-stone-500 mb-4">
              {t.showing}{" "}
              <span className="font-semibold text-stone-700">{visible.length}</span>{" "}
              {t.of} {filtered.length} {t.places}
              {search && (
                <span className="ml-1.5 text-emerald-600">
                  {t.matchingQuery(search)}
                </span>
              )}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-stone-400">
                <Search className="w-12 h-12 mx-auto mb-3 text-stone-300" strokeWidth={1} />
                <p className="text-base">{t.noResults}</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setVisibleCount(12);
                  }}
                  className="mt-3 text-sm text-emerald-600 hover:underline"
                >
                  {t.clearSearch}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visible.map((place) => (
                    <PlaceCardItem
                      key={place.id}
                      place={place}
                      // 🚀 แก้ไขตรงนี้: เปลี่ยนไปส่งเส้นทางโดยใช้ p.slug แทน p.id
                      onClick={(p) => router.push(`/${locale}/tourist/${p.slug}`)}
                    />
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setVisibleCount((c) => c + 12)}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                      {t.loadMore(filtered.length - visibleCount)}
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}