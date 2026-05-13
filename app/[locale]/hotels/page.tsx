"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  MapPin
} from 'lucide-react';
import { HotelData } from '@/src/data/hotels';
import ChiangMaiPreloader from '@/app/perloding/ChiangMaiPreloader';

type Locale = 'th' | 'en' | 'zh';
type Category = 'all' | 'city' | 'hotel' | 'nature' | 'riverside';

export default function HotelGuide() {
    const params = useParams();
    const locale = (params.locale as Locale) || 'en';
    const [activeTab, setActiveTab] = useState<Category>('all');
    const [isReady, setIsReady] = useState(false);
    
    const [hotels, setHotels] = useState(HotelData); // ถ้าเป็น static data แบบนี้
    const [dataPromise] = useState<Promise<void>>(
        () => Promise.resolve().then(() => setHotels(HotelData))
    );

    if (!isReady) {
        return (
            <ChiangMaiPreloader
                onComplete={() => setIsReady(true)}
                dataPromise={dataPromise}
            />
        );
    }

    interface UITranslation {
        heroTitle: string;
        heroCity: string;
        heroDesc: string;
        secTitle: string;
        secDesc: string;
        tabs: Record<Category, string>;
    }

    const uiMap: Record<Locale, UITranslation> = {
        th: {
            heroTitle: "แนะนำที่พัก", 
            heroCity: "เมื่อมาเที่ยวเชียงใหม่",
            heroDesc: "รวมที่พัก ทั้งในตัวเมืองเชียงใหม่และรอบเมืองเชียงใหม่",
            secTitle: "แนะนำที่พักยอดฮิตในเชียงใหม่",
            secDesc: "รวบรวมข้อมูลและพิกัดที่พักในโซนต่างๆ ของเชียงใหม่ พร้อมรายละเอียดการเดินทางเบื้องต้น เพื่อเป็นตัวช่วยในการวางแผนทริปของคุณ",
            tabs: { all: "ทั้งหมด", city: "ในตัวเมือง", hotel: "บ้านพัก/คฤหาสน์", nature: "ธรรมชาติ", riverside: "ริมแม่น้ำ" }
        },
        en: {
            heroTitle: "Recommended Stays",
            heroCity: "In Chiang Mai",
            heroDesc: "Best accommodations in the city and surrounding areas.",
            secTitle: "Popular Stays in Chiang Mai",
            secDesc: "Discover handpicked accommodations across various zones to help you plan your perfect trip.",
            tabs: { all: "All", city: "City Center", hotel: "Houses/Manors", nature: "Nature", riverside: "Riverside" }
        },
        zh: {
            heroTitle: "推荐住宿",
            heroCity: "在清迈",
            heroDesc: "城市及周边地区最佳住宿选择。",
            secTitle: "清迈热门住宿",
            secDesc: "发现精心挑选的住宿地点，遍布各个区域，帮助您规划完美的行程。",
            tabs: { all: "全部", city: "市中心", hotel: "别墅/庄园", nature: "自然", riverside: "河岸" }
        }
    };

    // ดึงข้อมูลตาม locale ถ้าไม่มีให้ใช้ภาษาไทยเป็นหลัก
    const ui = uiMap[locale] || uiMap.en;

    const filteredHotels = activeTab === 'all'
        ? hotels
        : hotels.filter(h => h.type === activeTab);

    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="bg-[#fcfcfc] min-h-screen font-sans">
            <div className="relative h-[65vh] w-full overflow-hidden bg-black">
                <img 
                    src="https://scontent.fcnx3-1.fna.fbcdn.net/v/t39.30808-6/688427252_1439644208202909_6026667520375930850_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=1PEZSdNs3eMQ7kNvwE-GN5T&_nc_oc=AdoiaKCHe7bR4fLlk2XgUtf0r3DlPAZgrqEMkcEipB3hjVaenjlkns1Fs2azQS91wOFr5zfNdldRcJZh99iStTOk&_nc_zt=23&_nc_ht=scontent.fcnx3-1.fna&_nc_gid=6qYPVTjHmqJS4NtS_sqcGA&_nc_ss=7b2a8&oh=00_Af4RC9cQovJAMW0Fw8ex8SoOTahXf18DQ_kVycOPhl_tCw&oe=6A06055C" 
                    className="w-full h-full object-cover opacity-70"
                    alt="Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-1/2 left-[10%] -translate-y-1/2 text-white z-10">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-bold leading-tight">
                        {ui.heroTitle} <br/> <span className="text-yellow-400">{ui.heroCity}</span>
                    </motion.h1>
                    <p className="mt-4 text-lg text-gray-200 max-w-xl">{ui.heroDesc}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-20 pb-20">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
                    
                    <div className="border-l-[6px] border-yellow-500 pl-6 mb-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">{ui.secTitle}</h2>
                        <p className="text-gray-500 max-w-2xl">{ui.secDesc}</p>
                    </div>

                    {/* --- CATEGORY TABS (Error ตรงนี้จะหายไป) --- */}
                    <div className="flex gap-6 overflow-x-auto pb-4 mb-10 scrollbar-hide border-b border-gray-100">
                        {(Object.keys(ui.tabs) as Array<Category>).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative pb-3 text-lg font-bold transition-all whitespace-nowrap ${
                                    activeTab === tab ? 'text-gray-900' : 'text-gray-400'
                                }`}
                            >
                                {ui.tabs[tab]}
                                {activeTab === tab && (
                                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#1a2b4b] rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    <motion.div layout className="grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch">
                        <AnimatePresence mode='popLayout'>
                            {filteredHotels.map((hotel, index) => {
                                // ถัาอยู่หน้า 'ทั้งหมด' 2 อันแรกจะกินพื้นที่ครึ่งจอ (3/6 คอลัมน์) อันที่เหลือกิน 1/3 จอ (2/6 คอลัมน์)
                                const isLarge = activeTab === 'all' && index < 2;
                                
                                return (
                                    <motion.div
                                        key={hotel.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        // จัดการขนาด Responsive: มือถือ = เต็มจอ, Tablet = ครึ่งจอ, PC = ตามเงื่อนไข isLarge
                                        className={`flex ${isLarge ? 'md:col-span-3' : 'md:col-span-3 lg:col-span-2'}`} 
                                    >
                                        <Link 
                                            href={`/${locale}/hotels/${hotel.slug}`} 
                                            className="group flex flex-col w-full h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
                                        >
                                            {/* 1. FIX ความสูงรูปภาพตรงนี้เลยครับ */}
                                            <div className={`relative w-full shrink-0 overflow-hidden ${isLarge ? 'h-[360px]' : 'h-[240px]'}`}>
                                                <img 
                                                    src={hotel.image} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                    alt={hotel.locales[locale]?.name || hotel.locales['th'].name} 
                                                />
                                            </div>

                                            {/* 2. ดันเนื้อหาให้เต็มพื้นที่การ์ด */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-1">
                                                    {hotel.locales[locale]?.name || hotel.locales['th'].name}
                                                </h3>
                                                
                                                <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                                                    {hotel.locales[locale]?.desc || hotel.locales['th'].desc}
                                                </p>

                                                {/* 3. mt-auto จะดันหมุดหมายและราคาไปติดขอบล่างสุดเสมอ */}
                                                <div className="mt-auto pt-5 flex justify-between items-center text-xs font-medium text-gray-400">
                                                    <span className="truncate mr-2 flex items-center gap-1">
                                                        <span className="text-pink-500 text-base"><MapPin /></span> 
                                                        {hotel.locales[locale]?.location || hotel.locales['th'].location}
                                                    </span>
                                                    <span className="text-blue-600 font-bold shrink-0 text-sm">
                                                        {hotel.priceRange} ฿
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}