"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ChefHat, Lightbulb, Star } from 'lucide-react'; // 👈 เพิ่ม Star มาใช้แสดงผลดาว
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { IRestaurant } from '@/models/Restaurant';
import { ITip } from '@/models/Tip';

type Locale = 'th' | 'en' | 'zh';

// --- Framer Motion Variants (คงเดิมตามระบบของคุณ) ---
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};
const heroImageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.15 },
    visible: { opacity: 0.8, scale: 1, transition: { duration: 1.8, ease: "easeOut" } }
};
const heroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.3 } }
};
const heroTextVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
const mainContentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.5 } }
};
const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function ChiangMaiTravelGuide() {
    const params = useParams();
    const locale = (params.locale as Locale) || 'en';

    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [tips, setTips] = useState<ITip[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [showAllRestaurants, setShowAllRestaurants] = useState(false);
    const [activeSection, setActiveSection] = useState('restaurant-section');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [resRestaurants, resTips] = await Promise.all([
                    fetch('/api/restaurants'),
                    fetch('/api/tips')
                ]);

                if (resRestaurants.ok && resTips.ok) {
                    let restaurantsData: IRestaurant[] = await resRestaurants.json();
                    const tipsData = await resTips.json();
                    
                    // 💡 โลจิกจัดเรียง: เอาร้านที่มีดาวเฉลี่ย (averageRating) สูงสุดขึ้นก่อน 
                    // ถ้าดาวเท่ากัน ให้เอาร้านที่มีจำนวนรีวิว (reviewCount) มากกว่าขึ้นก่อนเพื่อความน่าเชื่อถือ
                    restaurantsData.sort((a, b) => {
                        const rateA = a.averageRating ?? 0;
                        const rateB = b.averageRating ?? 0;
                        if (rateB !== rateA) {
                            return rateB - rateA; // เรียงจากมากไปน้อย
                        }
                        return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
                    });

                    setRestaurants(restaurantsData);
                    setTips(tipsData);
                } else {
                    console.error("Failed to load API data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const tipsSection = document.getElementById('tips-section');
            if (tipsSection) {
                const tipsTop = tipsSection.getBoundingClientRect().top;
                if (tipsTop < 300) {
                    setActiveSection('tips-section');
                } else {
                    setActiveSection('restaurant-section');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const uiMap = {
        th: {
            heroSub: "ปักหมุดความอร่อย", heroTitle: "ร้านอาหารที่ต้องไป", heroCity: "เมื่อมาเชียงใหม่",
            heroDesc: "เปิดวาร์ปพิกัดความอร่อยฉบับคนเมืองแท้ๆ รวบรวมเมนูอาหารเหนือสูตรดั้งเดิมและร้านเด็ดที่สายกินห้ามพลาด",
            catTitle: "หมวดหมู่", catRest: "ร้านอาหารแนะนำ", catTips: "เคล็ดลับ",
            sec01: "01 - ร้านอาหารแนะนำ", sec01Title: "ร้านอาหารยอดนิยม รสชาติเด็ด", sec01Desc: "พิกัดร้านดังเรียงตามรีวิวและคะแนนความอร่อยจากผู้ใช้งานจริง",
            sec02: "02- เคล็ดลับ", sec02Title: "รู้ก่อนไป เชียงใหม่", sec02Desc: "ทริคเล็กๆ น้อยๆ ที่จะทำให้การตระเวนกินสนุกยิ่งขึ้น",
            showMore: (n: number) => `ดูทั้งหมด (${n})`, hide: "ซ่อน",
            reviewUnit: "รีวิว"
        },
        en: {
            heroSub: "Delicious Landmarks", heroTitle: "Must-Visit Eateries", heroCity: "In Chiang Mai",
            heroDesc: "Discover authentic local flavors, traditional Northern Thai recipes, and top-rated restaurants you can't miss.",
            catTitle: "Categories", catRest: "Recommended Restaurants", catTips: "Travel Tips",
            sec01: "01 - Recommended", sec01Title: "Top-Rated Restaurants", sec01Desc: "Famous spots sorted by real user ratings and review activities.",
            sec02: "02 - Tips", sec02Title: "Know Before You Go", sec02Desc: "Small tricks to make your food tour smoother.",
            showMore: (n: number) => `Show All (${n})`, hide: "Hide",
            reviewUnit: "Reviews"
        },
        zh: {
            heroSub: "美食打卡地", heroTitle: "必吃餐厅指南", heroCity: "在清迈",
            heroDesc: "探索最地道的清迈美味，汇集传统泰北菜肴และ吃货必去的名店。",
            catTitle: "类别", catRest: "推荐餐厅", catTips: "旅游小贴士",
            sec01: "01 - 推荐", sec01Title: "清迈最高評價餐馆", sec01Desc: "按照真实食客的评分与热度为您精选出来的必吃名店。",
            sec02: "02 - 小贴士", sec02Title: "出发前必看", sec02Desc: "让您的美食之旅更加顺畅的小技巧。",
            showMore: (n: number) => `查看全部 (${n})`, hide: "隐藏",
            reviewUnit: "条评论"
        }
    };

    const ui = uiMap[locale] || uiMap.th;
    const displayedRestaurants = showAllRestaurants ? restaurants : restaurants.slice(0, 9);

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 40;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const handleToggleShowAll = () => {
        if (showAllRestaurants) {
            const element = document.getElementById('restaurant-section');
            if (element) {
                const y = element.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
            setTimeout(() => {
                setShowAllRestaurants(false);
            }, 250);
        } else {
            setShowAllRestaurants(true);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#fbfbfb] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <motion.div initial="hidden" animate="visible" className="font-sans text-gray-800 bg-[#fbfbfb] min-h-screen">
            
            {/* HERO CONTAINER */}
            <div className="relative h-screen w-full bg-black overflow-hidden">
                <motion.img variants={heroImageVariants} src="/Food/Hero2.png" alt="Northern Thai Food" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <motion.div variants={heroContainerVariants} className="absolute top-1/2 left-[10%] md:left-[15%] transform -translate-y-1/2 border-l-4 border-yellow-500 pl-6 md:pl-8 max-w-2xl z-10" >
                    <motion.h1 variants={heroTextVariants} className="text-white leading-tight">
                        <span className="block text-2xl md:text-3xl font-medium mb-1 tracking-wide text-gray-200">{ui.heroSub}</span>
                        <span className="block text-5xl md:text-7xl font-extrabold text-yellow-400 mb-2 mt-2">{ui.heroTitle}</span>
                        <span className="block text-3xl md:text-5xl font-bold">{ui.heroCity}</span>
                    </motion.h1>
                    <motion.p variants={heroTextVariants} className="mt-6 text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed font-light max-w-xl">{ui.heroDesc}</motion.p>
                </motion.div>
            </div>

            <motion.div variants={mainContentVariants} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-12 relative" >
                
                {/* SIDEBAR */}
                <motion.div variants={fadeUpVariants} className="w-full md:w-1/4">
                    <div className="sticky top-20 self-start">
                        <h3 className="text-xl font-bold mb-6 text-gray-700 px-4">{ui.catTitle}</h3>
                        <ul className="space-y-2 font-medium">
                            <li
                                onClick={() => scrollToSection('restaurant-section')}
                                className={`flex justify-between items-center px-4 py-3.5 rounded-xl cursor-pointer transition-all ${activeSection === 'restaurant-section' ? 'bg-[#f0fdf4] text-[#16a34a] font-semibold' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                <span className="flex items-center gap-4 text-[15px]">
                                    <span className="text-xl"><ChefHat /></span>
                                    {ui.catRest}
                                </span>
                                <span className={`text-sm font-bold ${activeSection === 'restaurant-section' ? 'text-[#16a34a]' : ''}`}>
                                    {restaurants.length}
                                </span>
                            </li>
                            <li
                                onClick={() => scrollToSection('tips-section')}
                                className={`flex justify-between items-center px-4 py-3.5 rounded-xl cursor-pointer transition-all ${activeSection === 'tips-section' ? 'bg-yellow-50 text-yellow-600 font-semibold' : 'text-gray-500 hover:bg-gray-100'}`}
                            >
                                <span className="flex items-center gap-4 text-[15px]">
                                    <span className="text-xl"><Lightbulb /></span>
                                    {ui.catTips}
                                </span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* MAIN CONTENT */}
                <motion.div variants={fadeUpVariants} className="w-full md:w-3/4">

                    {/* Section 1: Restaurants */}
                    <div id="restaurant-section" className="mb-24 pt-8">
                        <motion.div layout className="mb-8">
                            <span className="text-green-600 font-semibold text-sm">{ui.sec01}</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-1 mb-3 text-gray-800">{ui.sec01Title}</h2>
                            <p className="text-gray-500 text-sm">{ui.sec01Desc}</p>
                        </motion.div>

                        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence mode='popLayout'>
                                {displayedRestaurants.map((rest, index) => (
                                    <motion.div
                                        key={rest.id}
                                        layout
                                        variants={cardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-50px" }}
                                        exit="exit"
                                        transition={{ delay: index > 8 ? (index - 9) * 0.05 : 0 }}
                                    >
                                        <Link
                                            href={`/${locale}/restaurants/${rest.slug}`}
                                            className="bg-white h-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                                        >
                                            <div className="w-full h-44 relative overflow-hidden shrink-0">
                                                <img src={rest.image} alt={rest.locales[locale]?.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                
                                                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-xl shadow-md flex items-center gap-1 border border-slate-100">
                                                    <Star className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400" />
                                                    <span className="text-xs font-black text-slate-800">
                                                        {rest.averageRating !== undefined && rest.averageRating > 0 ? rest.averageRating : "0"}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="w-full p-5 flex flex-col justify-between flex-grow">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{rest.locales[locale]?.name}</h3>
                                                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{rest.locales[locale]?.desc}</p>
                                                </div>
                                                <div className="mt-5 flex items-center justify-between gap-2">
                                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 max-w-[65%]">
                                                        <span className="text-red-500 text-xs shrink-0"><MapPin /></span>
                                                        <span className="truncate font-medium">{rest.locales[locale]?.location}</span>
                                                    </div>
                                                    
                                                    {/* แสดงจำนวนการเขียนรีวิวกำกับไว้ด้านท้าย */}
                                                    <span className="text-xs font-bold text-gray-400 shrink-0">
                                                        {rest.reviewCount || 0} {ui.reviewUnit}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Button Toggle Show All */}
                        {restaurants.length > 9 && (
                            <motion.div layout className="mt-14 flex justify-center border-t border-gray-200 relative">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleToggleShowAll}
                                    className="absolute -top-5 bg-white border border-gray-200 text-gray-600 px-8 py-2.5 rounded-full font-bold shadow-md hover:text-green-600 hover:border-green-600 transition-colors z-20"
                                >
                                    {showAllRestaurants ? ui.hide : ui.showMore(restaurants.length)}
                                </motion.button>
                            </motion.div>
                        )}
                    </div>

                    {/* Section 2: Tips */}
                    <div id="tips-section" className="mb-20 pt-8">
                        <div className="mb-10">
                            <span className="text-yellow-600 font-semibold text-sm">{ui.sec02}</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 text-gray-800 tracking-tight leading-tight">{ui.sec02Title}</h2>
                            <p className="text-gray-500 text-sm md:text-base max-w-lg">{ui.sec02Desc}</p>
                        </div>

                        <div className="relative pl-6 md:pl-10 ml-2 md:ml-4 border-l border-gray-300 space-y-12">
                            {tips.map((tip) => (
                                <motion.div
                                    key={tip.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="relative flex flex-col md:flex-row items-start md:items-center"
                                >
                                    <div className="absolute -left-[30px] md:-left-[46px] top-1/2 transform -translate-y-1/2 flex items-center justify-center w-5 h-5 bg-white border-4 border-gray-400 rounded-full shadow-sm z-10">
                                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-5xl md:text-6xl font-extrabold text-gray-700 mr-6 w-12 text-center">{tip.id}</span>
                                        <div>
                                            <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{tip.locales[locale]?.title}</h4>
                                            <p className="text-sm text-gray-500">{tip.locales[locale]?.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        </motion.div>
    );
}