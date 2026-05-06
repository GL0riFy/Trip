"use client";

import React, { useState, useEffect } from 'react';

// --- Interfaces ---
interface FoodItem {
    id: string;
    name: string;
    image: string;
    shortDesc: string;
    history: string;
    taste: string;
}

interface Accommodation {
    id: string;
    name: string;
    image: string;
    location: string;
    price: string;
}

// --- Mock Data: อาหารเหนือ 15 เมนู ---
const foodData: FoodItem[] = [
    {
        id: 'f1', name: 'ข้าวซอย', image: 'https://images.unsplash.com/photo-1626804475297-41609ea004eb?auto=format&fit=crop&w=500&q=80',
        shortDesc: 'บะหมี่แกงกะทิรสชาติเข้มข้น',
        history: 'ได้รับอิทธิพลมาจากชาวจีนฮ่อ (มุสลิม) ที่อพยพมาทางตอนเหนือของไทยในอดีต เดิมเรียกว่า "ก๋วยเตี๋ยวฮ่อ" ก่อนจะปรับเปลี่ยนสูตรให้เข้ากับลิ้นคนไทยโดยใส่กะทิและพริกแกง',
        taste: 'น้ำแกงเข้มข้น หอมกลิ่นเครื่องเทศกะทิ รสชาติกลมกล่อม หวาน มัน เผ็ดเล็กน้อย ทานคู่กับเส้นหมี่กรอบและเครื่องเคียงอย่างหอมแดง ผักกาดดอง ตัดเลี่ยนได้ดีเยี่ยม'
    },
    {
        id: 'f2', name: 'น้ำพริกหนุ่ม', image: 'https://images.unsplash.com/photo-1596649281358-86877e6e5dd2?auto=format&fit=crop&w=500&q=80',
        shortDesc: 'น้ำพริกยอดฮิตทำจากพริกหนุ่มย่าง',
        history: 'เมนูคู่บ้านของชาวล้านนาแต่โบราณ เกิดจากภูมิปัญญาการถนอมอาหารและการนำพริกหนุ่ม (พริกสดที่ยังไม่แก่จัด) มาย่างไฟให้หอมเพื่อทำน้ำพริกรับประทานกับผักพื้นบ้าน',
        taste: 'เผ็ดปานกลาง หอมกลิ่นพริก กระเทียม และหอมแดงย่างไฟ รสชาติเค็มนำนิดๆ กลมกล่อม นิยมทานคู่กับแคบหมูและข้าวเหนียวร้อนๆ'
    },
    {
        id: 'f3', name: 'น้ำพริกอ่อง', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=500&q=80',
        shortDesc: 'น้ำพริกหมูสับมะเขือเทศสีแดงสด',
        history: 'เป็นน้ำพริกที่สะท้อนความอุดมสมบูรณ์ของมะเขือเทศในภาคเหนือ (มะเขือส้ม) สีแดงมาจากมะเขือเทศ ไม่ใช่ความเผ็ด ถือเป็นเมนูต้อนรับแขกบ้านแขกเมือง',
        taste: 'รสชาติคล้ายซอสสปาเก็ตตี้แต่มีความเป็นไทย เปรี้ยวอมหวานจากมะเขือเทศ เค็มกลมกล่อมจากกะปิและหมูสับ เผ็ดน้อยมาก ทานง่าย เหมาะสำหรับเด็กและคนไม่ทานเผ็ด'
    },
    {
        id: 'f4', name: 'ไข่ป่าม', image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=500&q=80',
        shortDesc: 'ไข่ย่างในกระทงใบตอง',
        history: 'คำว่า "ป่าม" แปลว่าการทำให้สุกโดยใช้ความร้อนต่ำๆ บนใบตอง เป็นวิถีชีวิตชาวเหนือแต่โบราณที่ใช้วัสดุธรรมชาติในการปรุงอาหาร ทำให้ได้กลิ่นหอมเฉพาะตัว',
        taste: 'เนื้อสัมผัสคล้ายไข่ตุ๋นผสมไข่เจียว รสชาติเค็มอ่อนๆ กลมกล่อม จุดเด่นคือความหอมของใบตองย่างไฟที่ซึมเข้าไปในเนื้อไข่'
    },
    {
        id: 'f5', name: 'ไส้อั่ว', image: 'https://images.unsplash.com/photo-1615486171448-4af62ab0b1c2?auto=format&fit=crop&w=500&q=80',
        shortDesc: 'ไส้กรอกสมุนไพรภาคเหนือ',
        history: 'การถนอมอาหารของชาวล้านนา ("อั่ว" แปลว่า แทรก หรือ ยัดไว้ตรงกลาง) เป็นการนำเนื้อหมูมาผสมสมุนไพรและพริกแกง ยัดใส่ไส้แล้วนำไปย่างเพื่อให้เก็บไว้กินได้นาน',
        taste: 'รสชาติจัดจ้าน เผ็ดร้อน หอมกลิ่นสมุนไพรเน้นๆ ทั้งตะไคร้ ใบมะกรูด ขมิ้น เนื้อหมูมีความฉ่ำและมันเล็กน้อย กินเพลินมาก'
    },
    {
        id: 'f6', name: 'ขนมจีนน้ำเงี้ยว', image: 'https://images.unsplash.com/photo-1550305080-6060c2104595?auto=format&fit=crop&w=500&q=80',
        shortDesc: 'ขนมจีนซุปกระดูกหมูใส่ดอกงิ้ว',
        history: 'พัฒนามาจากอาหารของชาวไทใหญ่ (เงี้ยว เป็นคำที่คนไทยในอดีตใช้เรียกชาวไทใหญ่) เอกลักษณ์คือการใส่ "ดอกงิ้ว" ตากแห้ง ซึ่งเป็นพืชท้องถิ่น',
        taste: 'น้ำซุปสีแดงจัดจ้านแต่ไม่ได้เผ็ดจัด รสชาติเปรี้ยวจากมะเขือเทศ เค็มนำ กลมกล่อม มีเท็กซ์เจอร์หนึบๆ ของดอกงิ้วและเลือดหมู ทานกับผักกาดดองเข้ากันสุดๆ'
    },
    { id: 'f7', name: 'แกงฮังเล', image: 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?auto=format&fit=crop&w=500&q=80', shortDesc: 'แกงเนื้อสัตว์รสเข้มข้น ไม่มีกะทิ', history: 'ได้รับอิทธิพลจากพม่า', taste: 'รสชาติเปรี้ยวอมหวาน หอมกลิ่นผงฮังเลและขิงซอย' },
    { id: 'f8', name: 'ลาบคั่ว', image: 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?auto=format&fit=crop&w=500&q=80', shortDesc: 'ลาบเนื้อสัตว์คั่วสุก หอมกลิ่นมะแขว่น', history: 'ใส่เครื่องเทศหลากหลายชนิด โดยเฉพาะมะแขว่น', taste: 'หอมเครื่องเทศจัดจ้าน รสชาติเค็ม เผ็ด ขมลึกๆ' },
    { id: 'f9', name: 'ข้าวกันจิ๊น', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80', shortDesc: 'ข้าวคลุกเลือดหมูห่อใบตองนึ่ง', history: 'อาหารชาวเงี้ยว (ไทใหญ่)', taste: 'หอมกลิ่นกระเทียมเจียวและใบตอง รสชาติเค็มมันนัวๆ' },
    { id: 'f10', name: 'จิ๊นส้มหมกไข่', image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=500&q=80', shortDesc: 'แหนมเหนือย่างหมกไข่', history: 'จิ๊นส้มคือแหนม นำมาห่อใบตองหมกไฟให้สุกพร้อมไข่', taste: 'เปรี้ยวนำจากตัวแหนม มีความมันและนุ่มจากไข่' },
    { id: 'f11', name: 'แกงโฮะ', image: 'https://images.unsplash.com/photo-1627308595229-7830f5c9100f?auto=format&fit=crop&w=500&q=80', shortDesc: 'แกงรวมมิตรใส่วุ้นเส้นและหน่อไม้', history: 'เกิดจากวัฒนธรรมการนำอาหารเหลือจากงานบุญมาคั่วรวมกัน', taste: 'รสชาติเข้มข้น นัวๆ มีความเปรี้ยวจากหน่อไม้ดอง' },
    { id: 'f12', name: 'ผักเชียงดาผัดไข่', image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=500&q=80', shortDesc: 'เมนูผัดผักพื้นบ้านเพื่อสุขภาพ', history: 'ผักเชียงดาเป็นพืชสมุนไพรพื้นถิ่นภาคเหนือ', taste: 'รสชาติเค็มมัน ผักเชียงดามีรสขมปลายลิ้นนิดๆ' },
    { id: 'f13', name: 'ตำขนุน (ตำบ่าหนุน)', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80', shortDesc: 'ยำขนุนอ่อนต้มสุก', history: 'นิยมกินในวันปากปี (หลังวันสงกรานต์)', taste: 'เผ็ด เค็ม นัว หอมกลิ่นกระเทียมเจียว' },
    { id: 'f14', name: 'แกงแค', image: 'https://images.unsplash.com/photo-1605650893323-eb14e138a0f0?auto=format&fit=crop&w=500&q=80', shortDesc: 'แกงผักรวมพื้นบ้าน ไม่ใส่กะทิ', history: 'แกงที่ใช้ผักหลากหลายชนิดตามฤดูกาล', taste: 'หอมกลิ่นผักสมุนไพรหลากหลาย รสชาติเผ็ดร้อน' },
    { id: 'f15', name: 'แอ็บหมู', image: 'https://images.unsplash.com/photo-1544025162-811c7df0e457?auto=format&fit=crop&w=500&q=80', shortDesc: 'หมูสับคลุกพริกแกงย่างใบตอง', history: 'การนำเนื้อสัตว์มาคลุกเครื่องแกง ห่อใบตองย่างไฟ', taste: 'เผ็ด หอมกลิ่นเครื่องแกงล้านนาเต็มๆ คำ' },
];

// --- Mock Data: ที่พัก 20 แห่ง ---
const accommodationData: Accommodation[] = Array.from({ length: 20 }, (_, i) => ({
    id: `acc${i + 1}`,
    name: `Chiang Mai Boutique Hotel ${i + 1}`,
    image: `https://images.unsplash.com/photo-[INSERT_ID]?auto=format&fit=crop&w=500&q=80`.replace('[INSERT_ID]', ['1566073771259-6a8506099945', '1522708323590-d24dbb6b0267', '1582719508461-89140b5451bf', '1590523277543-a9b6cb65d513'][i % 4]),
    location: ['นิมมานเหมินท์', 'เมืองเก่า (คูเมือง)', 'ริมแม่น้ำปิง', 'แม่ริม', 'หางดง'][i % 5],
    price: `฿${(Math.floor(Math.random() * 20) + 10) * 100} - ฿${(Math.floor(Math.random() * 30) + 30) * 100}`
}));

// --- Mock Data: Tips รู้ก่อนไปเชียงใหม่ ---
const tipsData = [
    { id: 1, title: 'เวลาที่ดีที่สุด', desc: 'มื้อเช้า 7-9 น. และมื้อเที่ยง 11-13 น. อาหารสดใหม่และแน่นถนัด' },
    { id: 2, title: 'ระดับความเผ็ด', desc: 'อาหารเหนือมักเผ็ดน้อยกว่าภาคอีสาน แต่น้ำพริกหนุ่มเผ็ดมาก' },
    { id: 3, title: 'งบประมาณ', desc: 'ตลาดท้องถิ่น 40-80 บาท ร้านนั่งสบาย 80-200 บาท ต่อจาน' },
    { id: 4, title: 'โซนกินอาหาร', desc: 'ถนนนิมมานเหมินท์ ย่านเมืองเก่า และตลาดวโรรส' },
    { id: 5, title: 'การเดินทาง', desc: 'เช่าจักรยานหรือสกู๊ตเตอร์ เหมาะที่สุดสำหรับตะลอนกินในเมือง' },
    { id: 6, title: 'วัตถุดิบท้องถิ่น', desc: 'มะเขือเปราะ ใบชะพลู แมงดา และสมุนไพรพื้นเมืองหาได้ที่ตลาด' },
];


export default function ChiangMaiTravelGuide() {
    const [showAllFood, setShowAllFood] = useState(false);
    const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
    const [activeSection, setActiveSection] = useState('menu-section'); // State สำหรับจัดการ Sidebar Menu

    const displayedFood = showAllFood ? foodData : foodData.slice(0, 6);

    // ฟังก์ชันสำหรับ Scroll ไปยัง Section ต่างๆ
    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            // ใช้ค่า offset เพื่อไม่ให้เมนูด้านบนบัง (ถ้ามี Header)
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

                {/* ไล่สีพื้นหลังฝั่งซ้ายให้มืดลงนิดนึง เพื่อให้ตัวหนังสือโดดเด่น อ่านง่าย */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

                {/* ขยับให้ห่างจากซ้ายเข้ามาอีกนิดด้วย left-[10%] หรือ md:left-[15%] */}
                <div className="absolute top-1/2 left-[10%] md:left-[15%] transform -translate-y-1/2 border-l-4 border-yellow-500 pl-6 md:pl-8 max-w-2xl z-10">
                    <h1 className="text-white leading-tight drop-shadow-lg">
                        <span className="block text-2xl md:text-3xl font-medium mb-1 tracking-wide text-gray-200">ปักหมุดความอร่อย</span>
                        <span className="block text-5xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-md mb-2 mt-2">ร้านอาหารที่ต้องไป</span>
                        <span className="block text-3xl md:text-5xl font-bold">เมื่อมาเชียงใหม่</span>
                    </h1>

                    {/* ส่วนคำบรรยายหน้าเว็บ (เปลี่ยนข้อความได้ตามใจชอบ) */}
                    <p className="mt-6 text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed font-light drop-shadow-md max-w-xl">
                        เปิดวาร์ปพิกัดความอร่อยฉบับคนเมืองแท้ๆ รวบรวมเมนูอาหารเหนือสูตรดั้งเดิมและร้านเด็ดที่สายกินห้ามพลาด พร้อมให้คุณได้สัมผัสรสชาติแห่งล้านนาในทุกคำที่ลิ้มลอง
                    </p>

                    {/* ปุ่มสำหรับคลิกเลื่อนลงไปดูเนื้อหา */}
                    <button
                        onClick={() => scrollToSection('menu-section')}
                        className="mt-8 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-full transition-transform hover:scale-105 shadow-xl flex items-center gap-2"
                    >
                        ดูเมนูแนะนำ <span>👇</span>
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-12 relative">

                {/* --- SIDEBAR (Sticky) --- */}
                <div className="w-full md:w-1/4">
                    <div className="sticky top-12 self-start">
                        <h3 className="text-xl font-bold mb-6 text-gray-700">หมวดหมู่</h3>
                        <ul className="space-y-3 font-medium">
                            <li
                                onClick={() => scrollToSection('menu-section')}
                                className={`flex justify-between items-center px-4 py-3 rounded-md cursor-pointer transition ${activeSection === 'menu-section'
                                    ? 'bg-orange-50 text-orange-600'
                                    : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${activeSection === 'menu-section' ? 'bg-orange-500' : 'bg-gray-300'}`}></span>
                                    15 เมนูเด็ด
                                </span>
                                <span className="text-sm">15</span>
                            </li>

                            <li
                                onClick={() => scrollToSection('hotel-section')}
                                className={`flex justify-between items-center px-4 py-3 rounded-md cursor-pointer transition ${activeSection === 'hotel-section'
                                    ? 'bg-green-50 text-green-600'
                                    : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${activeSection === 'hotel-section' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    ที่พักยอดฮิต
                                </span>
                                <span className="text-sm">20</span>
                            </li>

                            <li
                                onClick={() => scrollToSection('tips-section')}
                                className={`flex justify-between items-center px-4 py-3 rounded-md cursor-pointer transition ${activeSection === 'tips-section'
                                    ? 'bg-yellow-50 text-yellow-600'
                                    : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${activeSection === 'tips-section' ? 'bg-yellow-500' : 'bg-gray-300'}`}></span>
                                    เคล็ดลับ
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
                            <span className="text-yellow-600 font-semibold text-sm">01 - เมนูแนะนำ</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-1 mb-3 text-gray-800">15 เมนูอาหารเหนือ ที่ต้องลอง</h2>
                            <p className="text-gray-500 text-sm">รวบรวมเมนูอาหารเหนือแท้ ที่หาทานได้ในเชียงใหม่ รสชาติดั้งเดิม สืบทอดจากบรรพบุรุษ</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedFood.map((food, index) => (
                                <div
                                    key={food.id}
                                    onClick={() => setSelectedFood(food)}
                                    className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                                >
                                    <div className="overflow-hidden h-48">
                                        <img
                                            src={food.image}
                                            alt={food.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <span className="text-xs text-yellow-600 font-semibold mb-1 block">เมนูที่ {String(index + 1).padStart(2, '0')}</span>
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">{food.name}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2">{food.shortDesc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center border-t border-gray-200 relative">
                            <button
                                onClick={() => setShowAllFood(!showAllFood)}
                                className="absolute -top-5 bg-white border border-gray-200 text-gray-600 px-6 py-2 rounded-full font-medium shadow-sm hover:text-yellow-600 hover:border-yellow-600 transition-colors"
                            >
                                {showAllFood ? 'ซ่อนเมนู' : 'ดูเมนูทั้งหมด (15)'}
                            </button>
                        </div>
                    </div>

                    {/* Section 2: Accommodations */}
                    <div id="hotel-section" className="mb-24 pt-8">
                        <div className="mb-8">
                            <span className="text-yellow-600 font-semibold text-sm">02 - ที่พักแนะนำ</span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-1 mb-3 text-gray-800">20 ที่พักเชียงใหม่ บรรยากาศดี</h2>
                            <p className="text-gray-500 text-sm">คัดสรรที่พักหลากสไตล์ ตั้งแต่บูทีคโฮเทลไปจนถึงรีสอร์ทกลางธรรมชาติ</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {accommodationData.map((acc) => (
                                <a
                                    key={acc.id}
                                    href={`/accommodation/${acc.id}`}
                                    className="flex bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
                                >
                                    <div className="w-1/3 overflow-hidden">
                                        <img
                                            src={acc.image}
                                            alt={acc.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="w-2/3 p-4 flex flex-col justify-center relative">
                                        <h3 className="text-md font-bold text-gray-800 mb-1">{acc.name}</h3>
                                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">📍 {acc.location}</p>
                                        <p className="text-sm font-semibold text-yellow-600">{acc.price}</p>
                                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 group-hover:text-yellow-500 transition-colors">
                                            ➔
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Tips (รู้ก่อนไปเชียงใหม่) */}
                    <div id="tips-section" className="mb-20 pt-8">
                        <div className="mb-10">
                            <span className="text-yellow-600 font-semibold text-sm">03 - เคล็ดลับ</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold mt-1 mb-4 text-gray-800 tracking-tight leading-tight">
                                รู้ก่อนไป <br />เชียงใหม่
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base max-w-lg">
                                รวบรวมเมนูอาหารเหนือแท้ ที่หาทานได้ในเชียงใหม่ รสชาติดั้งเดิม สืบทอดจากบรรพบุรุษ
                            </p>
                        </div>

                        {/* Timeline Container */}
                        <div className="relative pl-6 md:pl-10 ml-2 md:ml-4 border-l-[1px] border-gray-300 space-y-12">
                            {tipsData.map((tip) => (
                                <div key={tip.id} className="relative flex flex-col md:flex-row items-start md:items-center">

                                    {/* วงกลมบนเส้น Timeline */}
                                    <div className="absolute -left-[30px] md:-left-[46px] top-1/2 transform -translate-y-1/2 flex items-center justify-center w-5 h-5 bg-white border-[4px] border-gray-400 rounded-full shadow-sm z-10">
                                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                    </div>

                                    <div className="flex items-center">
                                        {/* ตัวเลขขนาดใหญ่ */}
                                        <span className="text-5xl md:text-6xl font-extrabold text-gray-700 mr-6 w-12 text-center">
                                            {tip.id}
                                        </span>

                                        {/* ข้อมูล */}
                                        <div>
                                            <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{tip.title}</h4>
                                            <p className="text-sm text-gray-500">{tip.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* --- MODAL (POPUP) --- */}
            {selectedFood && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
                    <div
                        className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative h-64 w-full">
                            <img src={selectedFood.image} alt={selectedFood.name} className="w-full h-full object-cover" />
                            <button
                                onClick={() => setSelectedFood(null)}
                                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-80 transition"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full mb-3">
                                เมนูแนะนำ
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedFood.name}</h2>
                            <p className="text-gray-500 font-medium mb-6">{selectedFood.shortDesc}</p>

                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-yellow-500">
                                    <h4 className="font-bold text-gray-700 mb-1 flex items-center gap-2">📜 ประวัติความเป็นมา</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{selectedFood.history}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-500">
                                    <h4 className="font-bold text-gray-700 mb-1 flex items-center gap-2">👅 รสชาติสัมผัส</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">{selectedFood.taste}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedFood(null)}></div>
                </div>
            )}

        </div>
    );
}