"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { 
    Star, MapPin, Clock, Phone, ChevronLeft, 
    UtensilsCrossed, ExternalLink, DollarSign
} from 'lucide-react';
import { restaurantData, Restaurant } from '@/src/data/popular/food_data';

type Locale = 'th' | 'en' | 'zh';

// Helper Component — must be defined BEFORE it's used
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

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const MapComponent = dynamic(() => import('./MapComponent'), { 
    ssr: false,
    loading: () => <div className="h-[450px] w-full bg-slate-100 animate-pulse rounded-[2.5rem]" />
});

export default function RestaurantDetail() {
    const params = useParams();
    const router = useRouter();
    const locale = (params.locale as Locale) || 'th';
    const slug = params.slug as string;

    const restaurant = restaurantData.find((r: Restaurant) => r.slug === slug);

    const uiMap = {
        th: { label: "Recommended", open: "เวลาเปิดทำการ", tel: "เบอร์โทรศัพท์", menu: "เมนูแนะนำ" },
        en: { label: "Recommended", open: "Opening Hours", tel: "Contact", menu: "Signature Dishes" },
        zh: { label: "推荐餐厅", open: "营业时间", tel: "电话", menu: "推荐菜品" }
    };
    const ui = uiMap[locale];

    if (!restaurant) {
        return <div className="h-screen flex items-center justify-center font-sans text-gray-400 italic">Restaurant not found...</div>;
    }

    const data = restaurant.locales[locale];
    const position = restaurant.coords;

    return (
        <div className="bg-[#fafafa] min-h-screen font-sans pb-20 text-slate-900">

            {/* 1. HERO */}
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

            {/* 2. MAIN CONTENT */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative -mt-24 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 z-10 border border-white"
                >
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
                                <div className="flex items-center gap-0.5 font-medium">
                                    {[...Array(3)].map((_, i) => (
                                        <DollarSign key={i} className={`w-4 h-4 ${i < (restaurant.priceLevel?.length || 0) ? 'text-slate-900' : 'text-slate-300'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mb-12">
                        {data.desc}
                    </p>

                    {/* ✅ InfoItem is now defined above and works correctly */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 mb-12">
                        <InfoItem icon={<MapPin className="w-6 h-6" />} label="Location" value={data.location} color="text-blue-500" />
                        <InfoItem icon={<Clock className="w-6 h-6" />} label={ui.open} value={restaurant.openHours} color="text-emerald-500" />
                        <InfoItem icon={<Phone className="w-6 h-6" />} label={ui.tel} value={restaurant.tel} color="text-indigo-500" />
                    </div>

                    {data.recommended && (
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
                                        className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-orange-200 hover:shadow-md transition-all"
                                    >
                                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-500" />
                                        <span className="font-semibold text-slate-700">{dish}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* 3. MAP — ✅ only one copy, uses position variable */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
            </div>
        </div>
    );
}