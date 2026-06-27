"use client";

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
    Star, MapPin, Clock, Phone, ChevronLeft, 
    UtensilsCrossed, X, ChevronRight
} from 'lucide-react';
import { IRestaurant } from '@/models/Restaurant';

type Locale = 'th' | 'en' | 'zh';

interface ClientProps {
    restaurant: IRestaurant;
    locale: Locale;
}

function InfoItem({ icon, label, value, color }: { 
    icon: React.ReactNode; label: string; value: string; color: string 
}) {
    return (
        <div className="flex flex-col gap-3">
            <div className={`${color} p-3 bg-white w-fit rounded-xl shadow-sm border border-slate-50`}>
                {icon}
            </div>
            <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
                <p className="text-slate-800 font-semibold leading-snug">{value}</p>
            </div>
        </div>
    );
}

// โหลด MapComponent แบบไม่ใช้ SSR (ทำได้สมบูรณ์เพราะถูกเรียกอยู่ภายใต้ขอบเขต "use client")
const MapComponent = dynamic(() => import('./MapComponent'), { 
    ssr: false,
    loading: () => <div className="h-[450px] w-full bg-slate-100 animate-pulse rounded-[2.5rem]" />
});

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function RestaurantDetailClient({ restaurant, locale }: ClientProps) {
    const data = restaurant.locales[locale] || restaurant.locales.th;
    const position = restaurant.coords;

    const uiMap = {
        th: { label: "Recommended", open: "เวลาเปิดทำการ", tel: "เบอร์โทรศัพท์", menu: "เมนูแนะนำ", gallery: "แกลเลอรี่" },
        en: { label: "Recommended", open: "Opening Hours", tel: "Contact", menu: "Signature Dishes", gallery: "Gallery" },
        zh: { label: "推荐餐厅", open: "营业时间", tel: "电话", menu: "推荐菜品", gallery: "图库" }
    };
    const ui = uiMap[locale] || uiMap.th;

    return (
        <div className="bg-[#fafafa] min-h-screen font-sans pb-20 text-slate-900">

            {/* 1. HERO พร้อมเอฟเฟกต์ซูมออกแบบสมูทตอนเปิดหน้าเว็บ */}
            <div className="relative h-[45vh] md:h-[60vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    src={restaurant.image}
                    alt={data.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            </div>

            {/* 2. MAIN CONTENT บล็อกข้อมูลเลื่อนสไลด์ขึ้นด้านบน */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative -mt-24 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 z-10 border border-white"
                >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div className="space-y-3">
                            <motion.span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest">
                                {ui.label}
                            </motion.span>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
                                {data.name}
                            </h1>
                            <div className="flex items-center gap-4 text-slate-500">
                                <div className="flex items-center gap-1.5 bg-yellow-400/10 text-yellow-700 px-3 py-1 rounded-lg">
                                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                                    <span className="font-bold">{restaurant.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mb-10">
                        {data.desc}
                    </p>

                    {/* ── GALLERY MOSAIC (เรียกใช้แบบ Dynamic Grid ด้านล่างไฟล์) ── */}
                    {restaurant.gallery && restaurant.gallery.length > 0 && (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="mb-10"
                        >
                            <GalleryMosaic images={restaurant.gallery} name={data.name} />
                        </motion.div>
                    )}

                    {/* Info bar ข้อมูลร้าน */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 mb-12">
                        <InfoItem icon={<MapPin className="w-6 h-6" />} label="Location" value={data.location} color="text-blue-500" />
                        <InfoItem icon={<Clock className="w-6 h-6" />} label={ui.open} value={restaurant.openHours} color="text-emerald-500" />
                        <InfoItem icon={<Phone className="w-6 h-6" />} label={ui.tel} value={restaurant.tel} color="text-indigo-500" />
                    </div>

                    {/* Recommended dishes เมนูแนะนำ */}
                    {data.recommended && data.recommended.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-500 rounded-lg">
                                    <UtensilsCrossed className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">{ui.menu}</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.recommended.map((dish, idx) => (
                                    <motion.div 
                                        key={idx}
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-orange-200 hover:shadow-md transition-all cursor-pointer"
                                    >
                                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-500" />
                                        <span className="font-semibold text-slate-700">{dish}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* 3. MAP SECTION แผนที่ท้ายหน้า */}
                {position && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 space-y-6"
                    >
                        <div className="h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white relative z-0">
                            <MapComponent 
                                lat={position.lat} 
                                lng={position.lng} 
                                name={data.name}
                                mapLink={restaurant.mapLink}
                            />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

// ─── โค้ดคอมโพเนนต์ย่อยสำหรับคัดกรองรูปภาพและคุมสถานะ Lightbox สไตล์เดิมของคุณ ───
function GalleryMosaic({ images, name }: { images: string[]; name: string }) {
    const [lightbox, setLightbox] = useState<number | null>(null);

    const prev = () => setLightbox(i => (i! - 1 + images.length) % images.length);
    const next = () => setLightbox(i => (i! + 1) % images.length);
    const count = images.length;

    if (count === 1) {
        return (
            <div className="w-full h-[260px] md:h-[340px] relative cursor-pointer group overflow-hidden rounded-[1.5rem]" onClick={() => setLightbox(0)}>
                <img src={images[0]} alt={`${name} 1`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
        );
    }

    if (count === 2) {
        return (
            <div className="grid grid-cols-2 gap-2 h-[260px] md:h-[340px] rounded-[1.5rem] overflow-hidden">
                {images.map((src, idx) => (
                    <div key={idx} className="relative cursor-pointer group overflow-hidden" onClick={() => setLightbox(idx)}>
                        <img src={src} alt={`${name} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                ))}
            </div>
        );
    }

    const remaining = images.length - 3;
    return (
        <>
            <div className="grid grid-cols-3 gap-2 h-[260px] md:h-[340px] rounded-[1.5rem] overflow-hidden">
                <div className="col-span-2 relative cursor-pointer group overflow-hidden" onClick={() => setLightbox(0)}>
                    <img src={images[0]} alt={`${name} 1`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <div className="col-span-1 flex flex-col gap-2">
                    {[1, 2].map((idx) => (
                        <div key={idx} className="flex-1 relative cursor-pointer group overflow-hidden" onClick={() => setLightbox(idx)}>
                            <img src={images[idx]} alt={`${name} ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            {idx === 2 && remaining > 0 ? (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white text-xl font-black">+{remaining}</span>
                                </div>
                            ) : (
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25 }} className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                            <img src={images[lightbox]} alt={`${name} ${lightbox + 1}`} className="w-full max-h-[80vh] object-contain rounded-2xl" />
                            <p className="text-center text-white/50 text-sm mt-3">{lightbox + 1} / {images.length}</p>
                        </motion.div>
                        <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                        {images.length > 1 && (
                            <>
                                <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"><ChevronLeft className="w-6 h-6" /></button>
                                <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"><ChevronRight className="w-6 h-6" /></button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}