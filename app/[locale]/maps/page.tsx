"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';
import { useTranslations, useLocale } from 'next-intl';
import * as turf from '@turf/turf';
import { AnimatePresence, motion } from 'framer-motion';
import {
    MapPin, Utensils, Hotel, X, Map, Star, Clock, Phone,
    ChevronRight, Waves, Coffee, ShoppingBag, TreePine,
    Mountain, Church, Music, Fish, Soup, Cake, Landmark,
    Wine, Dumbbell, Camera, Ticket, Sun, Zap, UsersRound,
} from 'lucide-react';
import { renderToString } from 'react-dom/server';

// ── Correct import paths ──────────────────────────────────────────────
import { HotelData }       from '@/src/data/hotels';
import { restaurantData }  from '@/src/data/restaurants/food_data';
import { ChiangMaiData }   from '@/src/data/chiangmai';
import type { Hotel as HotelType } from '@/src/data/hotels/type';
import type { Restaurant }          from '@/src/data/restaurants/type';

// ─────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────
type PlaceCategory = 'hotel' | 'restaurant' | 'tourist';
type Lang = 'th' | 'en' | 'zh';
type LucideIcon = React.ComponentType<{ size?: number; className?: string }>;

type PlaceFeature = {
    id: string;
    category: PlaceCategory;
    name: string;
    desc: string;
    location: string;
    image: string;
    gallery: string[];
    mapLink: string;
    tags: string[];
    lat: number;
    lng: number;
    // restaurant
    rating?: number;
    openHours?: string;
    tel?: string;
    recommended?: string[];
    // hotel
    priceRange?: string;
    starRating?: number;
    checkIn?: string;
    checkOut?: string;
    // tourist
    price?: string;
    hours?: string;
};

// ─────────────────────────────────────────────────────────────────────
// Tag → Lucide icon map (case-insensitive matching)
// ─────────────────────────────────────────────────────────────────────
const TAG_ICON_MAP: Record<string, LucideIcon> = {
    // restaurant & food tags
    'อาหารเหนือ': Soup,       'northern thai': Soup,       '泰北菜': Soup,
    'ข้าวซอย': Soup,           'khao soi': Soup,
    'อาหารไทย': Utensils,      'thai': Utensils,
    'อาหารนานาชาติ': Zap,      'international': Zap,
    'ซีฟู้ด': Fish,            'seafood': Fish,             '海鲜': Fish,
    'กาแฟ': Coffee,            'coffee': Coffee,            '咖啡': Coffee,
    'คาเฟ่': Coffee,           'cafe': Coffee,
    'ของหวาน': Cake,           'dessert': Cake,             '甜品': Cake,
    'เบเกอรี่': Cake,          'bakery': Cake,
    'บาร์': Wine,              'bar': Wine,                 '酒吧': Wine,
    'ดนตรีสด': Music,          'live music': Music,         '现场音乐': Music,
    'สตรีทฟู้ด': ShoppingBag,  'street food': ShoppingBag,
    'ตลาด': ShoppingBag,       'market': ShoppingBag,       '市场': ShoppingBag,
    'ริมน้ำ': Waves,           'riverside': Waves,          '河畔': Waves,
    // tourist attractions
    'วัด': Church,           'temple': Church,          '寺庙': Church,
    'เดินป่า': Mountain,       'hiking': Mountain,          '登山': Mountain,
    'ภูเขา': Mountain,         'mountain': Mountain,        '山': Mountain,
    'ปะหาร': Mountain,         
    'สวนดอกไม้': TreePine,     'flower garden': TreePine,   '花海': TreePine,
    'ธรรมชาติ': TreePine,      'nature': TreePine,          '自然': TreePine,
    'จุดชมวิว': Camera,        'viewpoint': Camera,         '观景点': Camera,
    'วัฒนธรรม': Camera,        'culture': Camera,           '文化': Camera,
    'ประวัติศาสตร์': Landmark, 'historic': Landmark,        '历史': Landmark,
    'ผจญภัย': Zap,             'adventure': Zap,            '冒险': Zap,
    'กีฬา': Dumbbell,          'sports': Dumbbell,          '运动': Dumbbell,
    'สปา': Dumbbell,           'spa': Dumbbell,             '水疗': Dumbbell,
    'ครอบครัว': Sun,           'family': Sun,               '家庭': Sun,
    // additional attractions
    'สัตว์': Mountain,         'animal': Mountain,          '动物': Mountain,
    'กิจกรรม': Ticket,         'activity': Ticket,          '活动': Ticket,
    'สวน': TreePine,           'garden': TreePine,          '花园': TreePine,
    'ฟาร์ม': TreePine,         'farm': TreePine,            '农场': TreePine,
    'สถาปัตยกรรม': Landmark,  'architecture': Landmark,    '建筑': Landmark,
};

function getTagIcon(tags: string[]): LucideIcon {
    for (const tag of tags) {
        const lowerTag = tag.toLowerCase();
        for (const [key, icon] of Object.entries(TAG_ICON_MAP)) {
            if (key.toLowerCase() === lowerTag) return icon;
        }
    }
    return MapPin;
}

// ─────────────────────────────────────────────────────────────────────
// Pin colours per category
// ─────────────────────────────────────────────────────────────────────
const PIN_COLORS: Record<PlaceCategory, { bg: string; ring: string }> = {
    hotel:      { bg: '#1E3A5F', ring: '#5B9BD5' },
    restaurant: { bg: '#7C2D12', ring: '#FB923C' },
    tourist:    { bg: '#5B21B6', ring: '#A78BFA' },
};

// Inline SVG for pin body icon (avoids ReactDOM in DOM context)
function getPinBodySVG(category: PlaceCategory, tags: string[], size: number): string {
    // กำหนดค่าเริ่มต้นเป็น MapPin ในกรณีที่ไม่เข้าเงื่อนไขใด ๆ เลย
    let IconComponent: LucideIcon = MapPin;
    
    if (category === 'hotel') {
        IconComponent = Hotel;
    } 
    else if (category === 'restaurant') {
        IconComponent = Utensils;
    } 
    else if (category === 'tourist') {
        if (tags.length > 0) {
            const tag = tags[0].toLowerCase();
            
            // วัด / Temple
            if (tag.includes('วัด') || tag === 'temple' || tag === '寺庙') {
                IconComponent = Church;
            }
            // ธรรมชาติ / Nature / สวน / Farm / ฟาร์ม
            else if (
                tag.includes('ธรรมชาติ') || tag === 'nature' || tag === '自然' || 
                tag.includes('สวน') || tag === 'garden' || tag === '花园' ||
                tag.includes('ฟาร์ม') || tag === 'farm' || tag === '农场'
            ) {
                IconComponent = TreePine;
            }
            // เดินป่า / Hiking / ภูเขา / Mountain
            else if (
                tag.includes('เดินป่า') || tag === 'hiking' || tag === '登山' ||
                tag.includes('ภูเขา') || tag === 'mountain' || tag === '山'
            ) {
                IconComponent = Mountain;
            }
            // สัตว์ / Animal
            else if (tag.includes('สัตว์') || tag === 'animal' || tag === '动物') {
                IconComponent = Mountain; // อ้างอิงตาม TAG_ICON_MAP เดิมของคุณที่ใช้ Mountain
            }
            // กิจกรรม / Activity
            else if (tag.includes('กิจกรรม') || tag === 'activity' || tag === '活动') {
                IconComponent = Ticket;
            }
            // สถาปัตยกรรม / Architecture
            else if (tag.includes('สถาปัตยกรรม') || tag === 'architecture' || tag === '建筑') {
                IconComponent = Landmark;
            }
            else if (tag.includes('ชุมชน') || tag.includes('community') || tag.includes('社区')) {
                IconComponent = UsersRound;
            }
            // Default สำหรับสถานที่ท่องเที่ยวอื่น ๆ (ใช้ไอคอน Clock ตามโครงสร้าง SVG เดิมของคุณ)
            else {
                IconComponent = Clock;
            }
        } else {
            IconComponent = Clock;
        }
    }

    // แปลง Lucide Component ให้กลายเป็น SVG String เพื่อส่งไปใช้งานกับ innerHTML
    return renderToString(<IconComponent size={size} className='text-white' />);
}

function createMarkerEl(category: PlaceCategory, tags: string[], selected: boolean): HTMLElement {
    const { bg, ring } = PIN_COLORS[category];
    const circleSize  = selected ? 44 : 36;
    const iconSize    = selected ? 20 : 16;
    const borderWidth = selected ? '3px' : '2px';
    const shadow      = selected ? '0 6px 18px rgba(0,0,0,0.45)' : '0 3px 8px rgba(0,0,0,0.30)';
    const tailH       = selected ? 10 : 8;
    const tailW       = selected ? 7  : 5;

    // 1. กล่องนอกสุด (ให้ MapLibre คุม Translate ห้ามใส่ Transition ตรงนี้)
    const wrap = document.createElement('div');
    wrap.style.cssText = `cursor:pointer;`; 

    // 2. กล่องด้านใน (ให้เราคุม Scale และ Transition)
    const inner = document.createElement('div');
    inner.style.cssText = `display:flex;flex-direction:column;align-items:center;
        transition:transform .15s ease;transform-origin:bottom center;`;

    const circle = document.createElement('div');
    circle.style.cssText = `width:${circleSize}px;height:${circleSize}px;border-radius:50%;
        background:${bg};border:${borderWidth} solid ${ring};
        display:flex;align-items:center;justify-content:center;box-shadow:${shadow};`;
    circle.innerHTML = getPinBodySVG(category, tags, iconSize);

    const tail = document.createElement('div');
    tail.style.cssText = `width:0;height:0;margin-top:-1px;
        border-left:${tailW}px solid transparent;border-right:${tailW}px solid transparent;
        border-top:${tailH}px solid ${bg};`;

    // ประกอบร่าง
    inner.appendChild(circle);
    inner.appendChild(tail);
    wrap.appendChild(inner);

    // ทำ Event Listener โดยสั่ง Scale ไปที่กล่อง "inner" แทน
    if (!selected) {
        wrap.addEventListener('mouseenter', () => { inner.style.transform = 'scale(1.18)'; });
        wrap.addEventListener('mouseleave', () => { inner.style.transform = 'scale(1)'; });
    } else {
        inner.style.transform = 'scale(1.12)';
    }
    
    return wrap;
}

// ─────────────────────────────────────────────────────────────────────
// Build PlaceFeature[] from raw data
// ─────────────────────────────────────────────────────────────────────
function buildPlaces(lang: Lang): PlaceFeature[] {
    const places: PlaceFeature[] = [];

    for (const h of HotelData as HotelType[]) {
        const loc = h.locales[lang] ?? h.locales['th'];
        places.push({
            id: `hotel_${h.id}`, category: 'hotel',
            name: loc.name, desc: loc.desc, location: loc.location,
            image: h.image, gallery: h.gallery ?? [], mapLink: h.mapLink,
            tags: loc.tags ?? [], lat: h.coords.lat, lng: h.coords.lng,
            priceRange: h.priceRange, starRating: h.starRating,
            checkIn: h.checkIn, checkOut: h.checkOut,
        });
    }

    for (const r of restaurantData as Restaurant[]) {
        const loc = r.locales[lang];
        places.push({
            id: `restaurant_${r.id}`, category: 'restaurant',
            name: loc.name, desc: loc.desc, location: loc.location,
            image: r.image, gallery: r.gallery ?? [], mapLink: r.mapLink,
            tags: loc.tags ?? [], lat: r.coords.lat, lng: r.coords.lng,
            rating: r.rating, openHours: r.openHours,
            tel: r.tel, recommended: loc.recommended,
        });
    }

    // Add tourist attractions from ChiangMai data
    for (const trip of ChiangMaiData) {
        const titleData = trip.title as Record<'en' | 'th' | 'zh', string>;
        const detailData = trip.detail as Record<'en' | 'th' | 'zh', string>;
        const priceData = trip.price as Record<'en' | 'th' | 'zh', string>;
        const hoursData = trip.hours as Record<'en' | 'th' | 'zh', string>;
        const tagData = trip.tag as Record<'en' | 'th' | 'zh', string>;

        // ดึง tag ที่เหมาะสม
        const tagValue = tagData[lang] ?? tagData['th'];
        const tags = tagValue ? [tagValue] : [];

        places.push({
            id: `tourist_${trip.id}`, category: 'tourist',
            name: titleData[lang] ?? titleData['th'],
            desc: detailData[lang] ?? detailData['th'],
            location: trip.detail_more.location,
            image: trip.detail_more.img,
            gallery: trip.detail_more.gallery ?? [],
            mapLink: `https://maps.google.com/?q=${trip.detail_more.lat},${trip.detail_more.lng}`,
            tags: tags,
            lat: trip.detail_more.lat,
            lng: trip.detail_more.lng,
            price: priceData[lang] ?? priceData['th'],
            hours: hoursData[lang] ?? hoursData['th'],
        });
    }

    return places;
}

// ─────────────────────────────────────────────────────────────────────
// Map decorations
// ─────────────────────────────────────────────────────────────────────
const DECORATIONS = [
    { id: 'light1', url: '/Maps/light1-2.svg', lng: 96.70, lat: 19.90, size: 280, iconSize: 1.0 },
    { id: 'light2', url: '/Maps/light2-2.svg', lng: 100.60, lat: 19.95, size: 280, iconSize: 1.0 },
    { id: 'light3', url: '/Maps/light3-1.svg', lng: 97.20, lat: 19.95, size: 250, iconSize: 0.85 },
    { id: 'light4', url: '/Maps/light4-1.svg', lng: 100.00, lat: 19.95, size: 250, iconSize: 0.85 },
    { id: 'tempel', url: '/Maps/tempel.svg',   lng: 97.02, lat: 17.50, size: 330, iconSize: 1.1 },
    { id: 'JD',     url: '/Maps/JD.svg',       lng: 100.60, lat: 17.70, size: 300, iconSize: 1.1 },
];

function loadSvgImage(map: maplibregl.Map, id: string, url: string, size: number): Promise<void> {
    return new Promise((resolve, reject) => {
        const dpi = window.devicePixelRatio || 1;
        const img = new Image(size * dpi, size * dpi);
        img.onload = () => { if (!map.hasImage(id)) map.addImage(id, img, { pixelRatio: dpi }); resolve(); };
        img.onerror = reject;
        img.src = url;
    });
}

const nameToSlug = (name: string): string => {
    const m: Record<string, string> = {
        'เมืองเชียงใหม่':'mueang-chiang-mai','จอมทอง':'chom-thong','แม่แจ่ม':'mae-chaem',
        'เชียงดาว':'chiang-dao','ดอยสะเก็ด':'doi-saket','แม่แตง':'mae-taeng',
        'แม่ริม':'mae-rim','สะเมิง':'samoeng','ฝาง':'fang','แม่อาย':'mae-ai',
        'พร้าว':'phrao','สันป่าตอง':'san-pa-tong','สันกำแพง':'san-kamphaeng',
        'สันทราย':'san-sai','หางดง':'hang-dong','ฮอด':'hot','ดอยเต่า':'doi-tao',
        'อมก๋อย':'omkoi','สารภี':'saraphi','เวียงแหง':'wiang-haeng',
        'ไชยปราการ':'chai-prakan','แม่วาง':'mae-wang','แม่ออน':'mae-on',
        'ดอยหล่อ':'doi-lo','กัลยาณิวัฒนา':'kanlayaniwatthana',
    };
    return m[name] || name;
};

// ─────────────────────────────────────────────────────────────────────
// Label constants
// ─────────────────────────────────────────────────────────────────────
const CAT_LABEL: Record<PlaceCategory, Record<Lang, string>> = {
    hotel:      { th:'โรงแรม',        en:'Hotel',         zh:'酒店' },
    restaurant: { th:'ร้านอาหาร',     en:'Restaurant',    zh:'餐厅' },
    tourist:    { th:'ที่ท่องเที่ยว',  en:'Attraction',    zh:'景点' },
};
const L = {
    nearby:    { th:'ใกล้เคียง',         en:'Nearby',          zh:'附近' },
    openMaps:  { th:'เปิดใน Google Maps', en:'Open in Maps',    zh:'在地图中打开' },
    recommend: { th:'เมนูแนะนำ',          en:'Recommended',     zh:'推荐菜品' },
} as const;

// ─────────────────────────────────────────────────────────────────────
// Stars component
// ─────────────────────────────────────────────────────────────────────
function Stars({ n }: { n: number }) {
    return (
        <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12}
                    className={i < Math.round(n) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} />
            ))}
        </span>
    );
}

// ─────────────────────────────────────────────────────────────────────
// PlacePanel – shared content for both desktop + mobile
// ─────────────────────────────────────────────────────────────────────
type PanelProps = {
    place: PlaceFeature;
    nearby: PlaceFeature[];
    lang: Lang;
    onClose: () => void;
    onSelect: (p: PlaceFeature) => void;
    isMobile: boolean;
};

function PlacePanel({ place, nearby, lang, onClose, onSelect, isMobile }: PanelProps) {
    const [imgIdx, setImgIdx] = useState(0);
    const images = place.gallery.length ? place.gallery : [place.image];

    useEffect(() => setImgIdx(0), [place.id]);

    const catRing = place.category === 'hotel'
        ? 'bg-[#1E3A5F]/80 border-[#5B9BD5]/50'
        : 'bg-[#7C2D12]/80 border-[#FB923C]/50';

    const TagIcon = getTagIcon(place.tags);

    return (
        <div className="flex flex-col h-full overflow-hidden font-kanit">

            {/* ── Hero image ── */}
            <div className="relative flex-shrink-0" style={{ height: isMobile ? '185px' : '215px' }}>
                <AnimatePresence mode="wait">
                    <motion.img key={imgIdx} src={images[imgIdx]} alt={place.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.28 }} />
                </AnimatePresence>

                {/* gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                {/* dots */}
                {images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                        {images.map((_, i) => (
                            <button key={i} onClick={() => setImgIdx(i)}
                                className={`rounded-full transition-all duration-200 ${i === imgIdx ? 'w-4 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`} />
                        ))}
                    </div>
                )}

                {/* category badge */}
                <div className={`absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm border ${catRing}`}>
                    <TagIcon size={11} />
                    {CAT_LABEL[place.category][lang]}
                </div>

                {/* close */}
                <button onClick={onClose}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition">
                    <X size={15} />
                </button>
            </div>

            {/* ── Body ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3.5">

                {/* name + location */}
                <div>
                    <h2 className="text-[17px] font-bold text-slate-800 leading-tight">{place.name}</h2>
                    <p className="mt-0.5 text-sm text-slate-400 flex items-center gap-1">
                        <MapPin size={12} className="flex-shrink-0" />{place.location}
                    </p>
                </div>

                {/* tags */}
                {place.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {place.tags.map(tag => {
                            // ค้นหา icon ที่เหมาะสมจาก TAG_ICON_MAP (case-insensitive)
                            let TI: LucideIcon | undefined;
                            const lowerTag = tag.toLowerCase();
                            for (const [key, icon] of Object.entries(TAG_ICON_MAP)) {
                                if (key.toLowerCase() === lowerTag) {
                                    TI = icon;
                                    break;
                                }
                            }
                            return (
                                <span key={tag}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600 border border-slate-200">
                                    {TI && <TI size={10} />}{tag}
                                </span>
                            );
                        })}
                    </div>
                )}

                {/* desc */}
                <p className="text-sm text-slate-600 leading-relaxed">{place.desc}</p>

                {/* meta */}
                <div className="space-y-1.5 text-sm text-slate-500">
                    {place.hours && (
                        <div className="flex items-center gap-2">
                            {(() => {
                                // ใช้ icon ที่เหมาะสมกับประเภท แทน generic Clock icon
                                const TagIcon = getTagIcon(place.tags);
                                return <TagIcon size={14} className="text-slate-400 flex-shrink-0" />;
                            })()}
                            {place.hours}
                        </div>
                    )}
                    {place.price && place.category === 'tourist' && (
                        <div className="flex items-center gap-2">
                            {(() => {
                                const TagIcon = getTagIcon(place.tags);
                                return <TagIcon size={14} className="text-slate-400 flex-shrink-0" />;
                            })()}
                            {place.price}
                        </div>
                    )}
                    {place.openHours && (
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-slate-400 flex-shrink-0" />{place.openHours}
                        </div>
                    )}
                    {place.tel && (
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-slate-400 flex-shrink-0" />
                            <a href={`tel:${place.tel}`} className="hover:text-blue-600 transition">{place.tel}</a>
                        </div>
                    )}
                    {place.checkIn && (
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-slate-400 flex-shrink-0" />
                            <span>Check-in {place.checkIn} · Check-out {place.checkOut}</span>
                        </div>
                    )}
                    {place.priceRange && (
                        <div className="flex items-center gap-2">
                            <Ticket size={14} className="text-slate-400 flex-shrink-0" />{place.priceRange}
                        </div>
                    )}
                </div>

                {/* recommended dishes */}
                {place.recommended && place.recommended.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            {L.recommend[lang]}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {place.recommended.map(item => (
                                <span key={item}
                                    className="px-2.5 py-1 rounded-lg text-xs bg-orange-50 text-orange-700 border border-orange-100">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* open maps CTA */}
                <a href={place.mapLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white
                        bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 transition shadow-sm">
                    <Map size={15} />{L.openMaps[lang]}
                </a>
                <div className="h-4" />
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────
export default function MapsPage() {
    const t = useTranslations('District');
    const locale = useLocale();
    const lang = (['th','en','zh'].includes(locale) ? locale : 'th') as Lang;

    const mapContainer  = useRef<HTMLDivElement>(null);
    const map           = useRef<maplibregl.Map | null>(null);
    const markersRef    = useRef<maplibregl.Marker[]>([]);
    const placesRef     = useRef<PlaceFeature[]>([]);

    const [hoveredDistrict, setHoveredDistrict] = useState<{ id: string; x: number; y: number } | null>(null);
    const [selectedPlace,   setSelectedPlace]   = useState<PlaceFeature | null>(null);
    const [nearby,          setNearby]          = useState<PlaceFeature[]>([]);
    const [filter,          setFilter]          = useState<Record<PlaceCategory, boolean>>({ hotel: true, restaurant: true, tourist: true });
    const [mapReady,        setMapReady]        = useState(false);

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    // build places on lang change
    useEffect(() => { placesRef.current = buildPlaces(lang); }, [lang]);

    // open place modal + fly to
    const openPlace = useCallback((place: PlaceFeature) => {
        setSelectedPlace(place);
        const nb = placesRef.current
            .filter(p => p.id !== place.id && p.category === place.category &&
                Math.hypot(p.lat - place.lat, p.lng - place.lng) < 0.04)
            .slice(0, 5);
        setNearby(nb);
        map.current?.flyTo({
            center: [place.lng, place.lat], zoom: 14, duration: 800,
            offset: isMobile ? [0, -100] : [-160, 0],
        });
    }, [isMobile]);

    // re-render all markers
    const refreshMarkers = useCallback(() => {
        if (!map.current) return;
        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];

        placesRef.current.forEach(place => {
            if (!filter[place.category]) return;
            const isSelected = selectedPlace?.id === place.id;
            const el = createMarkerEl(place.category, place.tags, isSelected);
            el.addEventListener('click', e => { e.stopPropagation(); openPlace(place); });

            const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
                .setLngLat([place.lng, place.lat])
                .addTo(map.current!);
            markersRef.current.push(marker);
        });
    }, [filter, selectedPlace, openPlace]);

    // init map (runs once)
    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            bounds: [[95.2, 16.2], [102.1, 21.1]],
            fitBoundsOptions: { padding: isMobile
                ? { top:100, bottom:40, left:15, right:15 }
                : { top:120, bottom:120, left:120, right:120 } },
            dragRotate: false,
            maxBounds: [[94.5, 15.0], [103.0, 22.5]],
        });
        map.current.touchZoomRotate.disableRotation();

        map.current.on('load', async () => {
            if (!map.current) return;
            map.current.setMinZoom(map.current.getZoom());

            // districts
            map.current.addSource('chiangmai-districts', {
                type: 'geojson', data: '/Maps/Chiang_mai_Geo.geojson', generateId: true,
            });
            const fillColor: ExpressionSpecification = [
                'match', ['get', 'adm2_name1'],
                'เมืองเชียงใหม่','#81B29A','จอมทอง','#F2CC8F','แม่แจ่ม','#E07A5F',
                'เชียงดาว','#3D405B','ดอยสะเก็ด','#F4F1DE','แม่แตง','#A8DADC',
                'แม่ริม','#457B9D','สะเมิง','#F28482','ฝาง','#84A59D',
                'แม่อาย','#F6BD60','พร้าว','#90DBF4','สันป่าตอง','#B5838D',
                'สันกำแพง','#6D597A','สันทราย','#355070','หางดง','#E5989B',
                'ฮอด','#B56576','ดอยเต่า','#6C757D','อมก๋อย','#2A9D8F',
                'สารภี','#E9C46A','เวียงแหง','#264653','ไชยปราการ','#FFB703',
                'แม่วาง','#8ECAE6','แม่ออน','#219EBC','ดอยหล่อ','#023047',
                'กัลยาณิวัฒนา','#BC4749', '#E5E5E5',
            ];
            map.current.addLayer({
                id: 'districts-fill', type: 'fill', source: 'chiangmai-districts',
                paint: { 'fill-color': fillColor, 'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.9, 0.7] },
            });
            map.current.addLayer({
                id: 'districts-borders', type: 'line', source: 'chiangmai-districts',
                paint: { 'line-color': '#FFFFFF', 'line-width': 1.5 },
            });

            // decorations
            await Promise.all(DECORATIONS.map(d => loadSvgImage(map.current!, d.id, d.url, d.size)));
            map.current.addSource('decorations', {
                type: 'geojson',
                data: { type: 'FeatureCollection', features: DECORATIONS.map(d => ({
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: [d.lng, d.lat] },
                    properties: { icon: d.id, iconSize: d.iconSize },
                })) },
            });
            map.current.addLayer({
                id: 'decorations-layer', type: 'symbol', source: 'decorations',
                layout: {
                    'icon-image': ['get', 'icon'],
                    'icon-size': ['*', ['get', 'iconSize'], isMobile ? 0.5 : 1.0],
                    'icon-allow-overlap': true, 'icon-ignore-placement': true,
                },
            });

            // district hover
            let hId: string | number | null = null;
            map.current.on('mousemove', 'districts-fill', e => {
                const f = e.features?.[0] as maplibregl.MapGeoJSONFeature | undefined;
                if (!f) return;
                setHoveredDistrict({ id: nameToSlug(f.properties.adm2_name1), x: e.point.x, y: e.point.y });
                if (hId !== null) map.current?.setFeatureState({ source:'chiangmai-districts', id:hId }, { hover:false });
                hId = f.id ?? null;
                if (hId !== null) map.current?.setFeatureState({ source:'chiangmai-districts', id:hId }, { hover:true });
                map.current!.getCanvas().style.cursor = 'pointer';
            });
            map.current.on('mouseleave', 'districts-fill', () => {
                setHoveredDistrict(null);
                if (hId !== null) map.current?.setFeatureState({ source:'chiangmai-districts', id:hId }, { hover:false });
                map.current!.getCanvas().style.cursor = '';
            });
            map.current.on('click', 'districts-fill', e => {
                const f = e.features?.[0] as maplibregl.MapGeoJSONFeature | undefined;
                if (!f) return;
                setSelectedPlace(null);
                const [a, b, c, d] = turf.bbox(f) as [number,number,number,number];
                map.current?.fitBounds([[a,b],[c,d]], { padding: isMobile ? 40 : 80, duration: 1000 });
            });

            setMapReady(true);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // re-draw markers whenever filter / selection / map readiness changes
    useEffect(() => { if (mapReady) refreshMarkers(); }, [mapReady, filter, selectedPlace, refreshMarkers]);

    // ── filter bar items ──────────────────────────────────────────────
    const FILTER_ITEMS: { key: PlaceCategory; labelTh: string; labelEn: string; labelZh: string; Icon: LucideIcon }[] = [
        { key: 'hotel',      labelTh:'โรงแรม', labelEn:'Hotels',     labelZh:'酒店', Icon: Hotel },
        { key: 'restaurant', labelTh:'อาหาร',  labelEn:'Restaurants', labelZh:'餐厅', Icon: Utensils },
        { key: 'tourist',    labelTh:'ที่ท่องเที่ยว', labelEn:'Attractions', labelZh:'景点', Icon: Camera },
    ];
    const getLabel = (item: typeof FILTER_ITEMS[0]) =>
        lang === 'th' ? item.labelTh : lang === 'zh' ? item.labelZh : item.labelEn;

    // ── render ────────────────────────────────────────────────────────
    return (
        <div className="relative w-full h-[calc(100vh-80px)] font-kanit overflow-hidden bg-slate-50">
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

            {/* District tooltip */}
            <AnimatePresence>
                {hoveredDistrict && !selectedPlace && (
                    <motion.div key="tt"
                        initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                        transition={{ duration:0.12 }}
                        className="absolute z-10 bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm pointer-events-none border border-white/20 shadow-xl"
                        style={{ left: hoveredDistrict.x, top: hoveredDistrict.y - 50, transform:'translateX(-50%)' }}>
                        {t(hoveredDistrict.id)}
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Desktop – side panel */}
            {!isMobile && (
                <AnimatePresence>
                    {selectedPlace && (
                        <div className="absolute inset-0 z-30 pl-10 flex items-center pointer-events-none">
                            <motion.div 
                                key="side"
                                /* 2. ปรับ Animation ให้เหมาะกับการอยู่ตรงกลาง (ขยายขึ้น + จางเข้า) */
                                initial={{ scale: 0.92, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }} 
                                exit={{ scale: 0.92, opacity: 0 }}
                                transition={{ type: 'spring', damping: 26, stiffness: 290 }}
                                /* 3. ปรับ Class ของตัวการ์ด: เอา left, top, bottom ออก แล้วเติม pointer-events-auto */
                                className="pointer-events-auto w-[320px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
                            >
                                <PlacePanel 
                                    place={selectedPlace} 
                                    nearby={nearby} 
                                    lang={lang}
                                    onClose={() => setSelectedPlace(null)} 
                                    onSelect={openPlace} 
                                    isMobile={false} 
                                />
                            </motion.div>

                        </div>
                    )}
                </AnimatePresence>
            )}

            {/* Mobile – bottom sheet */}
            {isMobile && (
                <AnimatePresence>
                    {selectedPlace && (
                        <motion.div key="sheet"
                            initial={{ y:'100%' }} animate={{ y:0 }} exit={{ y:'100%' }}
                            transition={{ type:'spring', damping:32, stiffness:300 }}
                            className="absolute left-0 right-0 bottom-0 z-30 bg-white rounded-t-3xl shadow-2xl overflow-hidden"
                            style={{ maxHeight:'72vh' }}>
                            <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
                                <div className="w-10 h-1 rounded-full bg-slate-200" />
                            </div>
                            <PlacePanel place={selectedPlace} nearby={nearby} lang={lang}
                                onClose={() => setSelectedPlace(null)} onSelect={openPlace} isMobile={true} />
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
}