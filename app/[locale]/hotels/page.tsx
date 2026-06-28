"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  MapPin,
  Loader2,
  Star
} from 'lucide-react';
import { IHotel } from '@/models/Hotels';

type Locale = 'th' | 'en' | 'zh';
type Category = 'all' | 'city' | 'hotel' | 'nature' | 'riverside';

export default function HotelGuide() {
    const params = useParams();
    const locale = (params.locale as Locale) || 'en';
    const [activeTab, setActiveTab] = useState<Category>('all');
    
    const [hotels, setHotels] = useState<IHotel[]>([]); 
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/hotels');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHotels();
    }, []);

    interface UITranslation {
        heroTitle: string;
        heroCity: string;
        heroDesc: string;
        secTitle: string;
        secDesc: string;
        tabs: Record<Category, string>;
        reviewsCount: string;
    }

    const uiMap: Record<Locale, UITranslation> = {
        th: {
            heroTitle: "แนะนำที่พัก", 
            heroCity: "เมื่อมาเที่ยวเชียงใหม่",
            heroDesc: "รวมที่พัก ทั้งในตัวเมืองเชียงใหม่และรอบเมืองเชียงใหม่",
            secTitle: "แนะนำที่พักยอดฮิตในเชียงใหม่",
            secDesc: "รวบรวมข้อมูลและพิกัดที่พักในโซนต่างๆ ของเชียงใหม่ พร้อมรายละเอียดการเดินทางเบื้องต้น เพื่อเป็นตัวช่วยในการวางแผนทริปของคุณ",
            tabs: { all: "ทั้งหมด", city: "ในตัวเมือง", hotel: "บ้านพัก/คฤหาสน์", nature: "ธรรมชาติ", riverside: "ริมแม่น้ำ" },
            reviewsCount: "รีวิว"
        },
        en: {
            heroTitle: "Recommended Stays",
            heroCity: "In Chiang Mai",
            heroDesc: "Best accommodations in the city and surrounding areas.",
            secTitle: "Popular Stays in Chiang Mai",
            secDesc: "Discover handpicked accommodations across various zones to help you plan your perfect trip.",
            tabs: { all: "All", city: "City Center", hotel: "Houses/Manors", nature: "Nature", riverside: "Riverside" },
            reviewsCount: "reviews"
        },
        zh: {
            heroTitle: "推荐住宿",
            heroCity: "在清迈",
            heroDesc: "城市及周边地区最佳住宿选择。",
            secTitle: "清迈热门住宿",
            secDesc: "发现精心挑选的住宿地点，遍布各个区域，帮助您规划完美的行程。",
            tabs: { all: "全部", city: "市中心", hotel: "别墅/庄园", nature: "自然", riverside: "河岸" },
            reviewsCount: "条评价"
        }
    };

    const ui = uiMap[locale] || uiMap.en;

    // 🔥 Fix: เรียงตามคะแนนดาวจากเยอะสุดไปน้อยสุด (Descending) ดึงค่าตามจริงใน DB 
    const filteredHotels = [...hotels]
        .filter(h => activeTab === 'all' || h.type === activeTab)
        .sort((a, b) => {
            const ratingA = a.starRating ?? 0;
            const ratingB = b.starRating ?? 0;
            return ratingB - ratingA;
        });

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

                    {/* --- CATEGORY TABS --- */}
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

                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-20 w-full gap-4">
                            <Loader2 className="animate-spin text-blue-900 w-12 h-12" />
                            <p className="text-gray-500 font-medium">Loading accommodations...</p>
                        </div>
                    )}

                    {isError && !isLoading && (
                        <div className="text-center py-20 w-full">
                            <p className="text-red-500 font-bold text-lg">Error loading data. Please try again later.</p>
                        </div>
                    )}

                    {!isLoading && !isError && filteredHotels.length === 0 && (
                        <div className="text-center py-20 w-full">
                            <p className="text-gray-400 text-lg">No accommodations found in this category.</p>
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-6 gap-6 items-stretch">
                            <AnimatePresence mode='popLayout'>
                                {filteredHotels.map((hotel, index) => {
                                    const isLarge = activeTab === 'all' && index < 2;
                                    
                                    // 1. ล็อกรีวิวเริ่มต้นเป็น 0 ตามต้องการ
                                    const reviewCount = 0; 
                                    // 2. ดึงดาวจริงจาก DB (ถ้าไม่มีให้ขึ้น 0.0) ไม่บังคับ 5 ดาวแล้ว
                                    const currentRating = hotel.starRating ?? 0;

                                    return (
                                        <motion.div
                                            key={hotel.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            className={`flex ${isLarge ? 'md:col-span-3' : 'md:col-span-3 lg:col-span-2'}`} 
                                        >
                                            <Link 
                                                href={`/${locale}/hotels/${hotel.slug}`} 
                                                className="group flex flex-col w-full h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
                                            >
                                                {/* 🔥 Fix: ย้ายกล่องดาวเข้ามาอยู่ใน Container 'relative' ชั้นเดียวกับรูปภาพ เพื่อป้องกันการจมหาย */}
                                                <div className={`relative w-full shrink-0 overflow-hidden ${isLarge ? 'h-[360px]' : 'h-[240px]'}`}>
                                                    <img 
                                                        src={hotel.image} 
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                        alt={hotel.locales[locale]?.name || hotel.locales['th'].name} 
                                                    />
                                                    
                                                    {/* 🌟 กล่องคะแนนดาวลอยเด่นอยู่มุมขวาบนของตัวรูปภาพอย่างสมบูรณ์ */}
                                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2 border border-gray-100 z-10">
                                                        <div className="flex items-center gap-0.5 text-yellow-500 font-bold text-xs">
                                                            <Star size={14} fill="currentColor" />
                                                            <span>{currentRating.toFixed(1)}</span>
                                                        </div>
                                                        <span className="w-px h-3 bg-gray-200" />
                                                        <span className="text-[11px] text-gray-500 font-medium">
                                                            {reviewCount} {ui.reviewsCount}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-6 flex flex-col flex-grow">
                                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors line-clamp-1">
                                                        {hotel.locales[locale]?.name || hotel.locales['th'].name}
                                                    </h3>
                                                    
                                                    <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                                                        {hotel.locales[locale]?.desc || hotel.locales['th'].desc}
                                                    </p>

                                                    <div className="mt-auto pt-5 flex justify-between items-center text-xs font-medium text-gray-400">
                                                        <span className="truncate mr-2 flex items-center gap-1">
                                                            <span className="text-pink-500 text-base flex items-center"><MapPin className="w-4 h-4" /></span> 
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
                    )}
                </div>
            </div>
        </motion.div>
    );
}