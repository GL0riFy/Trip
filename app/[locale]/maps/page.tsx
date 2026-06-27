"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { ExpressionSpecification } from '@maplibre/maplibre-gl-style-spec';
import { useTranslations, useLocale } from 'next-intl';
import * as turf from '@turf/turf';
import { AnimatePresence, motion } from 'framer-motion';
// เปลี่ยนชื่อ Map เป็น MapIcon เพื่อไม่ให้ชนกับ JavaScript Map Object
import {
    type LucideIcon,
    MapPin, Utensils, Hotel, X, Map as MapIcon, Star, Clock, Phone,
    TreePine, Mountain, Church, Ticket, Landmark, UsersRound,
} from 'lucide-react';
import { renderToString } from 'react-dom/server';

// ─────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────
type PlaceCategory = 'hotel' | 'restaurant' | 'tourist';
type Lang = 'th' | 'en' | 'zh';

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
    // โรงแรม
    'โรงแรม': Hotel,           'hotel': Hotel,          '酒店': Hotel,
    
    // ร้านอาหาร
    'ร้านอาหาร': Utensils,      'restaurant': Utensils,  '餐厅': Utensils,
    
    // สถานที่ท่องเที่ยว แยกกลุ่มไอคอนชัดเจน
    'วัด': Church,             'temple': Church,          '寺庙': Church,
    'ธรรมชาติ': TreePine,      'nature': TreePine,        '自然': TreePine,
    'ภูเขา': Mountain,         'mountain': Mountain,      '山': Mountain,
    'กิจกรรม': Ticket,         'activity': Ticket,        '活动': Ticket,
    'สถาปัตยกรรม': Landmark,    'architecture': Landmark,  '建筑': Landmark,
    'ชุมชน': UsersRound,       'community': UsersRound,   '社区': UsersRound,
};

// ฟังก์ชันช่วยกรองจับคู่ประเภทสถานที่ท่องเที่ยวย่อยๆ จาก Tags
function getTouristType(tags: string[]): string {
    if (!tags || tags.length === 0) return 'default';
    const tag = tags[0].toLowerCase();
    if (tag.includes('วัด') || tag === 'temple' || tag === '寺庙') return 'temple';
    if (tag.includes('ธรรมชาติ') || tag === 'nature' || tag === '自然' || 
        tag.includes('สวน') || tag === 'garden' || tag === '花园' ||
        tag.includes('ฟาร์ม') || tag === 'farm' || tag === '农场') return 'nature';
    if (tag.includes('เดินป่า') || tag === 'hiking' || tag === '登山' ||
        tag.includes('ภูเขา') || tag === 'mountain' || tag === '山' ||
        tag.includes('สัตว์') || tag === 'animal' || tag === '动物') return 'mountain';
    if (tag.includes('กิจกรรม') || tag === 'activity' || tag === 'activity' || tag === '活动') return 'activity';
    if (tag.includes('สถาปัตยกรรม') || tag === 'architecture' || tag === '建筑') return 'architecture';
    if (tag.includes('ชุมชน') || tag.includes('community') || tag.includes('社区')) return 'community';
    return 'default';
}

// ชุดสีพาเลทแยกตามพฤติกรรมหมวดหมู่ย่อย (แก้โจทย์สีสถานที่ท่องเที่ยวไม่ให้ซ้ำกัน)
const TOURIST_COLORS: Record<string, { bg: string; ring: string }> = {
    temple:       { bg: '#B91C1C', ring: '#FCA5A5' }, // สีแดงคริมสัน สำหรับวัด/ศาสนสถาน
    nature:       { bg: '#047857', ring: '#6EE7B7' }, // สีเขียวป่าไม้ สำหรับธรรมชาติ/สวน
    mountain:     { bg: '#0369A1', ring: '#7DD3FC' }, // สีฟ้าเข้ม สำหรับดอย/ภูเขา/จุดชมวิว
    activity:     { bg: '#BE185D', ring: '#F472B6' }, // สีชมพูเข้ม สำหรับกิจกรรมสันทนาการ/ความบันเทิง
    architecture: { bg: '#D97706', ring: '#FCD34D' }, // สีส้มอิฐ/ทอง สำหรับแลนด์มาร์ค/สถาปัตยกรรม
    community:    { bg: '#4D7C0F', ring: '#A3E635' }, // สีเขียวมะนาว สำหรับแหล่งชุมชน/หมู่บ้านท่องเที่ยว
    default:      { bg: '#5B21B6', ring: '#A78BFA' }, // สีม่วงเดิม สำหรับหมวดหมู่ทั่วไป
};

// ฟังก์ชันดึงสีพินแบบไดนามิก รองรับทั้งโรงแรม ร้านอาหาร และท่องเที่ยวหลากสี
function getPlaceColors(category: PlaceCategory, tags: string[]): { bg: string; ring: string } {
    if (category === 'hotel') return { bg: '#1E3A5F', ring: '#5B9BD5' };
    if (category === 'restaurant') return { bg: '#7C2D12', ring: '#FB923C' };
    const type = getTouristType(tags);
    return TOURIST_COLORS[type] || TOURIST_COLORS['default'];
}

// ฟังก์ชันรวมศูนย์สำหรับระบุคลาส Icon Component ของ Lucide ให้แม่นยำตรงกันทุกจุด
function getPlaceIconComponent(category: PlaceCategory, tags: string[]): LucideIcon {
    if (category === 'hotel') return Hotel;
    if (category === 'restaurant') return Utensils;
    
    const type = getTouristType(tags);
    if (type === 'temple') return Church;
    if (type === 'nature') return TreePine;
    if (type === 'mountain') return Mountain;
    if (type === 'activity') return Ticket;
    if (type === 'architecture') return Landmark;
    if (type === 'community') return UsersRound;
    return Clock;
}

const RESTAURANT_ICONS = new Set<LucideIcon>([Utensils]);

function getTagIcon(tags: string[]): LucideIcon {
    for (const tag of tags) {
        const lowerTag = tag.toLowerCase();
        for (const [key, icon] of Object.entries(TAG_ICON_MAP)) {
            if (key.toLowerCase() === lowerTag) return icon;
        }
    }
    return MapPin;
}

function getPinBodySVG(category: PlaceCategory, tags: string[], size: number): string {
    const IconComponent = getPlaceIconComponent(category, tags);
    return renderToString(<IconComponent size={size} className='text-white' />);
}

function createMarkerEl(category: PlaceCategory, tags: string[], selected: boolean): HTMLElement {
    const { bg, ring } = getPlaceColors(category, tags);
    const circleSize  = selected ? 44 : 36;
    const iconSize    = selected ? 20 : 16;
    const borderWidth = selected ? '3px' : '2px';
    const shadow      = selected ? '0 6px 18px rgba(0,0,0,0.45)' : '0 3px 8px rgba(0,0,0,0.30)';
    const tailH       = selected ? 10 : 8;
    const tailW       = selected ? 7  : 5;

    const wrap = document.createElement('div');
    wrap.style.cssText = `cursor:pointer;`; 

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

    inner.appendChild(circle);
    inner.appendChild(tail);
    wrap.appendChild(inner);

    if (!selected) {
        wrap.addEventListener('mouseenter', () => { inner.style.transform = 'scale(1.18)'; });
        wrap.addEventListener('mouseleave', () => { inner.style.transform = 'scale(1)'; });
    } else {
        inner.style.transform = 'scale(1.12)';
    }
    
    return wrap;
}

// ─────────────────────────────────────────────────────────────────────
// แปลงโครงสร้าง Raw Data จาก API มาเป็นรูปแบบ PlaceFeature[] ที่ระบบต้องการ
// ─────────────────────────────────────────────────────────────────────
function transformRawDataToPlaces(rawData: any, lang: Lang): PlaceFeature[] {
    if (!rawData) return [];
    const places: PlaceFeature[] = [];

    // เพิ่ม Fallback ป้องกันกรณีค่าที่ส่งมาจาก API เป็น null / undefined ให้กลายเป็น Array ว่างแทน
    const hotels = Array.isArray(rawData.hotels) ? rawData.hotels : (rawData.hotels?.hotels || rawData.hotels?.data || []);
    const restaurants = Array.isArray(rawData.restaurants) ? rawData.restaurants : (rawData.restaurants?.restaurants || rawData.restaurants?.data || []);
    
    // ดักจับรูปแบบโครงสร้างของ attractions / tourists ให้ยืดหยุ่น ป้องกัน Error is not iterable
    let attractions = [];
    if (rawData.attractions) {
        if (Array.isArray(rawData.attractions)) {
            attractions = rawData.attractions;
        } else if (Array.isArray(rawData.attractions.attractions)) {
            attractions = rawData.attractions.attractions;
        } else if (Array.isArray(rawData.attractions.data)) {
            attractions = rawData.attractions.data;
        }
    }

    // 1. จัดการข้อมูลโรงแรม
    for (const h of hotels) {
        if (!h) continue;
        const loc = h.locales?.[lang] ?? h.locales?.['th'] ?? {};
        places.push({
            id: `hotel_${h.id || h._id}`,
            category: 'hotel',
            name: loc.name || '', desc: loc.desc || '', location: loc.location || '',
            image: h.image || '', gallery: h.gallery ?? [], mapLink: h.mapLink || '',
            tags: loc.tags ?? [], lat: h.coords?.lat ?? 0, lng: h.coords?.lng ?? 0,
            priceRange: h.priceRange, starRating: h.starRating,
            checkIn: h.checkIn, checkOut: h.checkOut,
        });
    }

    // 2. จัดการข้อมูลร้านอาหาร
    for (const r of restaurants) {
        if (!r) continue;
        const loc = r.locales?.[lang] ?? r.locales?.['th'] ?? {};
        places.push({
            id: `restaurant_${r.id || r._id}`,
            category: 'restaurant',
            name: loc.name || '', desc: loc.desc || '', location: loc.location || '',
            image: r.image || '', gallery: r.gallery ?? [], mapLink: r.mapLink || '',
            tags: loc.tags ?? [], lat: r.coords?.lat ?? 0, lng: r.coords?.lng ?? 0,
            rating: r.rating, openHours: r.openHours,
            tel: r.tel, recommended: loc.recommended,
        });
    }

    // 3. จัดการสถานที่ท่องเที่ยว (มีความปลอดภัยสูง ไม่พังแน่นอน)
    for (const trip of attractions) {
        if (!trip) continue;

        // ── ตรวจว่าเป็นโครงสร้างใหม่ (MongoDB แบบ locales + coords) หรือแบบเก่า ──
        const isNewSchema = !!(trip.locales || trip.coords);

        let name = '', desc = '', location = '', image = '', tags: string[] = [];
        let lat = 0, lng = 0, gallery: string[] = [], mapLink = '', price = '', hours = '';

        if (isNewSchema) {
            // ── โครงสร้างใหม่ (เหมือน hotel/restaurant) ──
            const loc = trip.locales?.[lang] ?? trip.locales?.['th'] ?? {};
            name     = loc.name     || trip.name || '';
            desc     = loc.desc     || trip.desc || '';
            location = loc.location || trip.district || '';
            const tagVal = loc.tag ?? loc.tags?.[0] ?? '';
            tags = tagVal ? [tagVal] : [];
            lat      = trip.coords?.lat ?? 0;
            lng      = trip.coords?.lng ?? 0;
            image    = trip.image   || '';
            gallery  = trip.gallery ?? [];
            mapLink  = trip.mapLink || '';
            price    = loc.price    || '';
            hours    = loc.hours    || '';
        } else {
            // ── โครงสร้างเก่า (detail_more nested) ──
            const titleData = (trip.title  || {}) as Record<string, string>;
            const detailData= (trip.detail || {}) as Record<string, string>;
            const priceData = (trip.price  || {}) as Record<string, string>;
            const hoursData = (trip.hours  || {}) as Record<string, string>;
            const tagData   = (trip.tag    || {}) as Record<string, string>;
            const tagValue  = tagData[lang] ?? tagData['th'];

            name     = (titleData[lang]  ?? titleData['th'])  || '';
            desc     = (detailData[lang] ?? detailData['th']) || '';
            location = trip.detail_more?.location || '';
            image    = trip.detail_more?.img      || '';
            gallery  = trip.detail_more?.gallery  ?? [];
            mapLink  = trip.detail_more?.mapLink  || '';
            tags     = tagValue ? [tagValue] : [];
            lat      = trip.detail_more?.lat ?? 0;
            lng      = trip.detail_more?.lng ?? 0;
            price    = (priceData[lang] ?? priceData['th']) || '';
            hours    = (hoursData[lang] ?? hoursData['th']) || '';
        }

        // กรอง record ที่ไม่มี coords (จะไม่ขึ้นหมุด)
        if (!lat || !lng) continue;

        places.push({
            id: `tourist_${trip.id || trip._id}`,
            category: 'tourist',
            name, desc, location, image, gallery, mapLink, tags, lat, lng, price, hours,
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

    const colors = getPlaceColors(place.category, place.tags);
    const catRing = `backdrop-blur-sm border` ;

    const TagIcon = getTagIcon(place.tags);

    return (
        <div className="flex flex-col h-full overflow-hidden font-kanit">
            <div className="relative flex-shrink-0" style={{ height: isMobile ? '185px' : '215px' }}>
                <AnimatePresence mode="wait">
                    <motion.img key={imgIdx} src={images[imgIdx]} alt={place.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.28 }} />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                {images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                        {images.map((_, i) => (
                            <button key={i} onClick={() => setImgIdx(i)}
                                className={`rounded-full transition-all duration-200 ${i === imgIdx ? 'w-4 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`} />
                        ))}
                    </div>
                )}

                <div 
                    className={`absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${catRing}`}
                    style={{ backgroundColor: `${colors.bg}CC`, borderColor: `${colors.ring}80` }}
                >
                    <TagIcon size={11} />
                    {CAT_LABEL[place.category][lang]}
                </div>

                <button onClick={onClose}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition">
                    <X size={15} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3.5">
                <div>
                    <h2 className="text-[17px] font-bold text-slate-800 leading-tight">{place.name}</h2>
                    <p className="mt-0.5 text-sm text-slate-400 flex items-center gap-1">
                        <MapPin size={12} className="flex-shrink-0" />{place.location}
                    </p>
                </div>

                {place.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {place.tags.map(tag => {
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

                <p className="text-sm text-slate-600 leading-relaxed">{place.desc}</p>

                <div className="space-y-1.5 text-sm text-slate-500">
                    {place.hours && (
                        <div className="flex items-center gap-2">
                            {(() => {
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

                <a href={place.mapLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white
                        bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 transition shadow-sm">
                    <MapIcon size={15} />{L.openMaps[lang]}
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
    const lang = (['th','en','zh'].includes(locale) ? locale : 'en') as Lang;

    const translations = {
        th: { Symbol: "สัญลักษณ์", SymbolDes: "คำอธิบายสัญลักษณ์" },
        en: { Symbol: "Symbol",    SymbolDes: "Symbol description"  },
        zh: { Symbol: "象征",       SymbolDes: "符号说明"            }
    } as const;
    const tMap = translations[lang];

    const mapContainer  = useRef<HTMLDivElement>(null);
    const map           = useRef<maplibregl.Map | null>(null);
    const markersRef    = useRef<maplibregl.Marker[]>([]);

    // เปลี่ยนแปลง State: ใช้เป็น useState แทน placesRef.current เพื่อให้หน้าแผนที่อัปเดตอัตโนมัติเมื่อดึงข้อมูลเสร็จ
    const [places,          setPlaces]          = useState<PlaceFeature[]>([]);
    const [hoveredDistrict, setHoveredDistrict] = useState<{ id: string; x: number; y: number } | null>(null);
    const [selectedPlace,   setSelectedPlace]   = useState<PlaceFeature | null>(null);
    const [nearby,          setNearby]          = useState<PlaceFeature[]>([]);
    
    // จัดการ Filter สถานะการคลิกเลือกในแถบอธิบายสัญลักษณ์
    const [activeIconFilter, setActiveIconFilter] = useState<string | null>(null);
    
    const [mapReady,        setMapReady]        = useState(false);
    const [isMobileLegendOpen, setIsMobileLegendOpen] = useState(false);

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

    // ประมวลผลไอคอนเพื่อแสดงผลในส่วนสัญลักษณ์แผนที่
    const legendItems = useMemo(() => {
        type LegendData = { label: string; Icon: LucideIcon; bg: string; ring: string };
        const uniqueIcons = new Map<LucideIcon, LegendData>();

        Object.entries(TAG_ICON_MAP).forEach(([label, Icon]) => {
            if (lang === 'th' && !/[ก-๙]/.test(label)) return;
            if (lang === 'zh' && !/[\u4E00-\u9FFF]/.test(label)) return;
            if (lang === 'en' && !/^[a-zA-Z\s]+$/.test(label)) return;

            let category: PlaceCategory = 'tourist';
            if (Icon === Hotel) category = 'hotel';
            else if (RESTAURANT_ICONS.has(Icon)) category = 'restaurant';

            const { bg, ring } = getPlaceColors(category, [label]);

            if (!uniqueIcons.has(Icon)) {
                uniqueIcons.set(Icon, { label, Icon, bg, ring });
            }
        });

        return Array.from(uniqueIcons.values());
    }, [lang]);

    // ── ดึงข้อมูลผ่าน API รายหมวดหมู่พร้อมกันเมื่อเริ่มต้นทำงาน ────────────────────────────
    useEffect(() => {
        async function fetchPlaces() {
            try {
                const [hotelsRes, restaurantsRes, touristsRes] = await Promise.all([
                    fetch('/api/hotels'),
                    fetch('/api/restaurants'),
                    fetch('/api/tourists')
                ]);

                if (!hotelsRes.ok || !restaurantsRes.ok || !touristsRes.ok) {
                    throw new Error('Some API requests failed');
                }

                const hotelsData = await hotelsRes.json();
                const restaurantsData = await restaurantsRes.json();
                const touristsData = await touristsRes.json();

                // มัดรวมให้เข้าฟังก์ชันแปลงค่า
                const rawData = {
                    hotels: hotelsData,
                    restaurants: restaurantsData,
                    attractions: touristsData 
                };

                const transformed = transformRawDataToPlaces(rawData, lang);
                setPlaces(transformed); // บันทึกลงสถานะของ Component
            } catch (error) {
                console.error("Error loading elements from individual APIs:", error);
            }
        }
        fetchPlaces();
    }, [lang]);

    const openPlace = useCallback((place: PlaceFeature) => {
        setSelectedPlace(place);
        const nb = places
            .filter(p => p.id !== place.id && p.category === place.category &&
                Math.hypot(p.lat - place.lat, p.lng - place.lng) < 0.04)
            .slice(0, 5);
        setNearby(nb);
        map.current?.flyTo({
            center: [place.lng, place.lat], zoom: 14, duration: 800,
            offset: isMobile ? [0, -100] : [-160, 0],
        });
    }, [isMobile, places]);

    // ฟังก์ชันอัปเดตหมุดบนแผนที่ตามข้อมูลและฟิลเตอร์ที่เลือก
    const refreshMarkers = useCallback(() => {
        if (!map.current) return;
        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];

        places.forEach(place => {
            if (activeIconFilter) {
                const activeItem = legendItems.find(item => item.label === activeIconFilter);
                if (activeItem) {
                    const placeIcon = getPlaceIconComponent(place.category, place.tags);
                    if (placeIcon !== activeItem.Icon) return;
                }
            }

            const isSelected = selectedPlace?.id === place.id;
            const el = createMarkerEl(place.category, place.tags, isSelected);
            el.addEventListener('click', e => { e.stopPropagation(); openPlace(place); });

            const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
                .setLngLat([place.lng, place.lat])
                .addTo(map.current!);
            markersRef.current.push(marker);
        });
    }, [activeIconFilter, selectedPlace, openPlace, legendItems, places]);

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

    useEffect(() => { if (mapReady) refreshMarkers(); }, [mapReady, activeIconFilter, selectedPlace, refreshMarkers, places]);

    return (
        <div className="relative w-full h-[calc(100vh-80px)] font-kanit overflow-hidden bg-slate-50">
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

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

            {!isMobile && (
                <AnimatePresence>
                    {selectedPlace && (
                        <div className="absolute inset-0 z-30 pl-10 flex items-center pointer-events-none">
                            <motion.div 
                                key="side"
                                initial={{ scale: 0.92, opacity: 0 }} 
                                animate={{ scale: 1, opacity: 1 }} 
                                exit={{ scale: 0.92, opacity: 0 }}
                                transition={{ type: 'spring', damping: 26, stiffness: 290 }}
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

            {/* ── Legend UI Logic ── */}
            {isMobile ? (
                <AnimatePresence>
                    {!selectedPlace && (
                        <>
                            {!isMobileLegendOpen ? (
                                <motion.button
                                    key="legend-trigger-btn"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    onClick={() => setIsMobileLegendOpen(true)}
                                    className="absolute bottom-6 left-4 z-20 bg-white/95 backdrop-blur-xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.12)] px-4 py-2.5 rounded-2xl flex items-center gap-2 text-[12px] font-semibold text-slate-700 active:scale-95 transition-transform"
                                >
                                    <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center">
                                        <MapIcon size={11} className="text-indigo-500" />
                                    </div>
                                    <span>{activeIconFilter ? `กำลังแสดง: ${activeIconFilter}` : 'คำอธิบายสัญลักษณ์'}</span>
                                </motion.button>
                            ) : (
                                <motion.div
                                    key="mobile-legend-sheet"
                                    initial={{ y: '100%', opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: '100%', opacity: 0 }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                                    className="absolute bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl rounded-t-3xl shadow-[0_-8px_40px_rgba(0,0,0,0.10)] border-t border-slate-100 p-5 max-h-[45vh] overflow-y-auto"
                                >
                                    <div className="flex justify-center mb-4">
                                        <div className="w-9 h-1 rounded-full bg-slate-200" />
                                    </div>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-xl bg-indigo-50 flex items-center justify-center">
                                                <MapIcon size={14} className="text-indigo-500" />
                                            </div>
                                            <span className="text-[13px] font-bold text-slate-800 tracking-tight">{tMap.SymbolDes}</span>
                                        </div>
                                        <button 
                                            onClick={() => setIsMobileLegendOpen(false)}
                                            className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 transition"
                                        >
                                            <X size={13} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-3 gap-y-3">
                                        {legendItems.map(({ label, Icon, bg, ring }) => {
                                            const isSelected = activeIconFilter === label;
                                            const isAnySelected = activeIconFilter !== null;
                                            const opacityStyle = isAnySelected ? (isSelected ? 'opacity-100 ring-2 ring-indigo-500/30' : 'opacity-30 grayscale-[30%]') : 'opacity-100';

                                            return (
                                                <button 
                                                    key={label}
                                                    onClick={() => setActiveIconFilter(prev => prev === label ? null : label)}
                                                    className={`flex items-center gap-2.5 min-w-0 bg-slate-50/80 rounded-xl px-2.5 py-2 border border-slate-100 text-left transition-all duration-200 ${opacityStyle}`}
                                                >
                                                    <div
                                                        className="flex items-center justify-center rounded-full shadow-sm flex-shrink-0"
                                                        style={{ width: 28, height: 28, backgroundColor: bg, outline: `2px solid ${ring}`, outlineOffset: 1 }}
                                                    >
                                                        <Icon size={12} className="text-white" />
                                                    </div>
                                                    <span className={`font-semibold text-[11.5px] truncate capitalize leading-tight ${isSelected ? 'text-indigo-600 font-bold' : 'text-slate-700'}`}>
                                                        {label}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </>
                    )}
                </AnimatePresence>
            ) : (
                /* Desktop Layer คำอธิบายสัญลักษณ์ */
                <div className="absolute z-20 bottom-6 left-4 max-h-[420px] w-[220px] px-3.5 py-3.5 bg-white/95 backdrop-blur-xl border border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.10)] rounded-2xl overflow-y-auto">
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <MapIcon size={13} className="text-indigo-500" />
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{tMap.Symbol}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        {legendItems.map(({ label, Icon, bg, ring }) => {
                            const isSelected = activeIconFilter === label;
                            const isAnySelected = activeIconFilter !== null;
                            const opacityStyle = isAnySelected ? (isSelected ? 'opacity-100 translate-x-1' : 'opacity-30 grayscale-[30%]') : 'opacity-100';

                            return (
                                <button 
                                    key={label}
                                    onClick={() => setActiveIconFilter(prev => prev === label ? null : label)}
                                    className={`flex items-center gap-3 group text-left w-full transition-all duration-200 hover:translate-x-0.5 ${opacityStyle}`}
                                >
                                    <div
                                        className="flex items-center justify-center rounded-full flex-shrink-0 shadow-sm ring-2 ring-offset-1 transition-transform group-hover:scale-110"
                                        style={{ 
                                            width: 32, 
                                            height: 32, 
                                            backgroundColor: bg, 
                                            outline: `2px solid ${ring}`, 
                                            outlineOffset: '1px',
                                            boxShadow: isSelected ? `0 0 12px ${ring}` : 'none'
                                        }}
                                    >
                                        <Icon size={14} className="text-white" />
                                    </div>
                                    <span className={`font-medium text-[12.5px] capitalize leading-none ${isSelected ? 'text-indigo-600 font-bold' : 'text-slate-600'}`}>
                                        {label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}