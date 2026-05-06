"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation'; // ดึงค่าจาก URL
import { foodData, restaurantData, tipsData, type FoodItem, type Restaurant } from '@/src/data/food_data';

type Locale = 'th' | 'en' | 'zh';

export default function ChiangMaiTravelGuide() {
    // ดึงค่า locale จาก URL เช่น /en/food -> locale = 'en'
    const params = useParams();
    const locale = (params.locale as Locale) || 'th'; 

    const [showAllFood, setShowAllFood] = useState(false);
    const [showAllRestaurants, setShowAllRestaurants] = useState(false);
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const [activeSection, setActiveSection] = useState('menu-section');

    // คำแปล UI ส่วนกลาง (อิงตาม locale จาก URL)
    const uiMap = {
        th: {
            heroSub: "ปักหมุดความอร่อย",
            heroTitle: "ร้านอาหารที่ต้องไป",
            heroCity: "เมื่อมาเชียงใหม่",
            heroDesc: "เปิดวาร์ปพิกัดความอร่อยฉบับคนเมืองแท้ๆ รวบรวมเมนูอาหารเหนือสูตรดั้งเดิมและร้านเด็ดที่สายกินห้ามพลาด",
            btnMenu: "ดูเมนูแนะนำ",
            catTitle: "หมวดหมู่",
            catFood: "เมนูเด็ด",
            catRest: "ร้านอาหารแนะนำ",
            catTips: "เคล็ดลับ",
            sec01: "01 - เมนูแนะนำ",
            sec01Title: "15 เมนูอาหารเหนือ ที่ต้องลอง",
            sec01Desc: "รวบรวมเมนูอาหารเหนือแท้ ที่หาทานได้ในเชียงใหม่",
            sec02: "02 - ร้านอาหารแนะนำ",
            sec02Title: "20 ร้านอาหารเชียงใหม่ รสชาติเด็ด",
            sec02Desc: "พิกัดร้านดังและร้านลับที่คนท้องถิ่นแนะนำ",
            sec03: "03 - เคล็ดลับ",
            sec03Title: "รู้ก่อนไป เชียงใหม่",
            sec03Desc: "ทริคเล็กๆ น้อยๆ ที่จะทำให้การตระเวนกินสนุกยิ่งขึ้น",
            showMore: (n: number) => `ดูทั้งหมด (${n})`,
            hide: "ซ่อน",
            history: "📜 ประวัติความเป็นมา",
            taste: "👅 รสชาติสัมผัส",
            openMap: "🗺️ เปิดดูใน Google Maps",
            badgeFood: "เมนูแนะนำ",
            badgeRest: "ร้านอาหารแนะนำ"
        },
        en: {
            heroSub: "Delicious Landmarks",
            heroTitle: "Must-Visit Eateries",
            heroCity: "In Chiang Mai",
            heroDesc: "Discover authentic local flavors, traditional Northern Thai recipes, and top-rated restaurants you can't miss.",
            btnMenu: "View Recommended Menu",
            catTitle: "Categories",
            catFood: "Top Dishes",
            catRest: "Recommended Restaurants",
            catTips: "Travel Tips",
            sec01: "01 - Must Try",
            sec01Title: "15 Northern Thai Dishes",
            sec01Desc: "Authentic Northern Thai cuisine found in Chiang Mai.",
            sec02: "02 - Recommended",
            sec02Title: "20 Best Restaurants",
            sec02Desc: "Famous spots and hidden gems recommended by locals.",
            sec03: "03 - Tips",
            sec03Title: "Know Before You Go",
            sec03Desc: "Small tricks to make your food tour smoother.",
            showMore: (n: number) => `Show All (${n})`,
            hide: "Hide",
            history: "📜 History",
            taste: "👅 Taste & Texture",
            openMap: "🗺️ Open in Google Maps",
            badgeFood: "Recommended",
            badgeRest: "Must Visit"
        },
        zh: {
            heroSub: "美食打卡地",
            heroTitle: "必吃餐厅指南",
            heroCity: "在清迈",
            heroDesc: "探索最地道的清迈美味，汇集传统泰北菜肴和吃货必去的名店。",
            btnMenu: "查看推荐菜谱",
            catTitle: "类别",
            catFood: "必吃美食",
            catRest: "推荐餐厅",
            catTips: "旅游小贴士",
            sec01: "01 - 特色菜",
            sec01Title: "15 道必尝泰北菜",
            sec01Desc: "在清迈可以找到的正宗泰北风味。",
            sec02: "02 - 名店推荐",
            sec02Title: "20 家清迈地道餐馆",
            sec02Desc: "当地人推荐的知名餐厅和私藏小店。",
            sec03: "03 - 小贴士",
            sec03Title: "出发前必看",
            sec03Desc: "让您的美食之旅更加顺畅的小技巧。",
            showMore: (n: number) => `查看全部 (${n})`,
            hide: "隐藏",
            history: "📜 历史渊源",
            taste: "👅 口感风味",
            openMap: "🗺️ 在谷歌地图查看",
            badgeFood: "特色菜",
            badgeRest: "推荐商户"
        }
    };

    const ui = uiMap[locale] || uiMap.th;
    const displayedFood = showAllFood ? foodData : foodData.slice(0, 6);
    const displayedRestaurants = showAllRestaurants ? restaurantData : restaurantData.slice(0, 6);

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 40;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="font-sans text-gray-800 bg-[#fbfbfb] min-h-screen">
            
            {/* --- HERO SECTION --- */}
            <div className="relative h-screen w-full bg-black overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1920&q=80"
                    alt="Northern Thai Food"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute top-1/2 left-[10%] md:left-[15%] transform -translate-y-1/2 border-l-4 border-yellow-500 pl-6 md:pl-8 max-w-2xl z-10">
                    <h1 className="text-white leading-tight drop-shadow-lg">
                        <span className="block text-2xl md:text-3xl font-medium mb-1 tracking-wide text-gray-200">{ui.heroSub}</span>
                        <span className="block text-5xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-md mb-2 mt-2">{ui.heroTitle}</span>
                        <span className="block text-3xl md:text-5xl font-bold">{ui.heroCity}</span>
                    </h1>
                    <p className="mt-6 text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed font-light drop-shadow-md max-w-xl">
                        {ui.heroDesc}
                    </p>
                    <button
                        onClick={() => scrollToSection('menu-section')}
                        className="mt-8 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-full transition-transform hover:scale-105 shadow-xl flex items-center gap-2"
                    >
                        {ui.btnMenu} <span>👇</span>
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-12 relative">

                {/* --- SIDEBAR --- */}
                <div className="w-full md:w-1/4">
                    <div className="sticky top-12 self-start">
                        <h3 className="text-xl font-bold mb-6 text-gray-700">{ui.catTitle}</h3>
                        <ul className="space-y-3 font-medium">
                            <li onClick={() => scrollToSection('menu-section')} className={`flex justify-between items-center px-4 py-3 rounded-md cursor-pointer transition ${activeSection === 'menu-section' ? 'bg-orange-50 text-orange-600' : 'text-gray-500 hover:bg-gray-100'}`}>
                                <span className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${activeSection === 'menu-section' ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
                                    {ui.catFood}
                                </span>
                                <span className="text-sm">{foodData.length}</span>
                            </li>
                            <li onClick={() => scrollToSection('restaurant-section')} className={`flex justify-between items-center px-4 py-3 rounded-md cursor-pointer transition ${activeSection === 'restaurant-section' ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:bg-gray-100'}`}>
                                <span className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${activeSection === 'restaurant-section' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    {ui.catRest}
                                </span>
                                <span className="text-sm">{restaurantData.length}</span>
                            </li>
                            <li onClick={() => scrollToSection('tips-section')} className={`flex justify-between items-center px-4 py-3 rounded-md cursor-pointer transition ${activeSection === 'tips-section' ? 'bg-yellow-50 text-yellow-600' : 'text-gray-500 hover:bg-gray-100'}`}>
                                <span className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${activeSection === 'tips-section' ? 'bg-yellow-500' : 'bg-gray-300'}`}></span>
                                    {ui.catTips}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* --- MAIN CONTENT --- */}
                <div className="w-full md:w-3/4">

                    {/* Section 1: Food */}
                    <div id="menu-section" className="mb-24 pt-8">
                        <div className="mb-8">
                            <span className="text-yellow-600 font-semibold text-sm">{ui.sec01}</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-1 mb-3 text-gray-800">{ui.sec01Title}</h2>
                            <p className="text-gray-500 text-sm">{ui.sec01Desc}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedFood.map((food, index) => (
                                <div key={food.id} onClick={() => setSelectedFood(food)} className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                                    <div className="overflow-hidden h-48">
                                        <img src={food.image} alt={food.locales[locale].name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="p-5">
                                        <span className="text-xs text-yellow-600 font-semibold mb-1 block">#{index + 1}</span>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{food.locales[locale].name}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2">{food.locales[locale].shortDesc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center border-t border-gray-200 relative">
                            <button onClick={() => setShowAllFood(!showAllFood)} className="absolute -top-5 bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded-full font-medium shadow-sm hover:text-yellow-600 hover:border-yellow-600 transition-colors">
                                {showAllFood ? ui.hide : ui.showMore(foodData.length)}
                            </button>
                        </div>
                    </div>

                    {/* Section 2: Restaurants */}
                    <div id="restaurant-section" className="mb-24 pt-8">
                        <div className="mb-8">
                            <span className="text-green-600 font-semibold text-sm">{ui.sec02}</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-1 mb-3 text-gray-800">{ui.sec02Title}</h2>
                            <p className="text-gray-500 text-sm">{ui.sec02Desc}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {displayedRestaurants.map((rest) => (
                                <div key={rest.id} onClick={() => setSelectedRestaurant(rest)} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row group cursor-pointer">
                                    <div className="w-full sm:w-2/5 h-48 relative overflow-hidden shrink-0">
                                        <img src={rest.image} alt={rest.locales[locale].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="w-full sm:w-3/5 p-4 sm:p-5 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">{rest.locales[locale].name}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2">{rest.locales[locale].desc}</p>
                                        </div>
                                        <div className="mt-4">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 max-w-full">
                                                <span className="text-red-500 text-xs">📍</span>
                                                <span className="truncate">{rest.locales[locale].location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center border-t border-gray-200 relative">
                            <button onClick={() => setShowAllRestaurants(!showAllRestaurants)} className="absolute -top-5 bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded-full font-medium shadow-sm hover:text-green-600 hover:border-green-600 transition-colors">
                                {showAllRestaurants ? ui.hide : ui.showMore(restaurantData.length)}
                            </button>
                        </div>
                    </div>

                    {/* Section 3: Tips */}
                    <div id="tips-section" className="mb-20 pt-8">
                        <div className="mb-10">
                            <span className="text-yellow-600 font-semibold text-sm">{ui.sec03}</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 text-gray-800 tracking-tight leading-tight">
                                {ui.sec03Title}
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base max-w-lg">{ui.sec03Desc}</p>
                        </div>

                        <div className="relative pl-6 md:pl-10 ml-2 md:ml-4 border-l border-gray-300 space-y-12">
                            {tipsData.map((tip) => (
                                <div key={tip.id} className="relative flex flex-col md:flex-row items-start md:items-center">
                                    <div className="absolute -left-[30px] md:-left-[46px] top-1/2 transform -translate-y-1/2 flex items-center justify-center w-5 h-5 bg-white border-4 border-gray-400 rounded-full shadow-sm z-10">
                                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-5xl md:text-6xl font-extrabold text-gray-700 mr-6 w-12 text-center">{tip.id}</span>
                                        <div>
                                            <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{tip.locales[locale].title}</h4>
                                            <p className="text-sm text-gray-500">{tip.locales[locale].desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* --- MODALS (เหมือนเดิม) --- */}
            {selectedFood && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedFood(null)}>
                    <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="relative h-64 w-full shrink-0">
                            <img src={selectedFood.image} alt={selectedFood.locales[locale].name} className="w-full h-full object-cover" />
                            <button onClick={() => setSelectedFood(null)} className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80 transition">✕</button>
                        </div>
                        <div className="p-6 md:p-8 overflow-y-auto">
                            <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full mb-3">{ui.badgeFood}</div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedFood.locales[locale].name}</h2>
                            <p className="text-gray-500 font-medium mb-6">{selectedFood.locales[locale].shortDesc}</p>
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
                                    <h4 className="font-bold text-gray-700 mb-1">{ui.history}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{selectedFood.locales[locale].history}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-500">
                                    <h4 className="font-bold text-gray-700 mb-1">{ui.taste}</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{selectedFood.locales[locale].taste}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- MODAL RESTAURANT (เหมือนเดิม) --- */}
            {selectedRestaurant && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedRestaurant(null)}>
                    <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <div className="relative h-56 w-full shrink-0">
                            <img src={selectedRestaurant.image} alt={selectedRestaurant.locales[locale].name} className="w-full h-full object-cover" />
                            <button onClick={() => setSelectedRestaurant(null)} className="absolute top-3 right-3 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80 transition">✕</button>
                        </div>
                        <div className="p-6 overflow-y-auto flex flex-col gap-4">
                            <div>
                                <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-3">{ui.badgeRest}</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedRestaurant.locales[locale].name}</h2>
                                <p className="text-gray-600 text-sm leading-relaxed">{selectedRestaurant.locales[locale].desc}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <p className="text-sm text-gray-700 flex items-start gap-2">
                                    <span className="text-red-500 mt-0.5">📍</span>
                                    <span>{selectedRestaurant.locales[locale].location}</span>
                                </p>
                            </div>
                            <a href={selectedRestaurant.mapLink} target="_blank" className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md">
                                {ui.openMap}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}