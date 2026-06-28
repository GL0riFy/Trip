"use client";

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
    Star, MapPin, Clock, Phone, ChevronLeft, 
    UtensilsCrossed, X, ChevronRight, MessageSquare
} from 'lucide-react';
import { IRestaurant } from '@/models/Restaurant';

type Locale = 'th' | 'en' | 'zh';

interface IReviewItem {
    _id: string;
    username: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface ClientProps {
    restaurant: IRestaurant;
    initialReviews: IReviewItem[]; // 👈 เปิดรับลิสต์รีวิวที่ส่งมาจากหลังบ้าน
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

const MapComponent = dynamic(() => import('./MapComponent'), { 
    ssr: false,
    loading: () => <div className="h-[450px] w-full bg-slate-100 animate-pulse rounded-[2.5rem]" />
});

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function RestaurantDetailClient({ restaurant, initialReviews, locale }: ClientProps) {
    const data = restaurant.locales[locale] || restaurant.locales.th;
    const position = restaurant.coords;

    // ระบบจัดเก็บสถานะรีวิวภายในหน้าบ้าน
    const [reviews, setReviews] = useState<IReviewItem[]>(initialReviews);
    const [username, setUsername] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 💡 ตั้งสเตตโดยดึงพึ่งพา averageRating เท่านั้นตามที่คุณลบไป หากยังไม่มีให้ตั้งไว้ที่ 0 หรือ 5 ดาวชั่วคราว
    const [displayRating, setDisplayRating] = useState<number>(
        restaurant.averageRating !== undefined && restaurant.averageRating > 0 
            ? restaurant.averageRating 
            : 0 
    );

    const uiMap = {
        th: { label: "Recommended", open: "เวลาเปิดทำการ", tel: "เบอร์โทรศัพท์", menu: "เมนูแนะนำ", gallery: "แกลเลอรี่", reviewTitle: "รีวิวจากผู้ใช้งาน", writeReview: "เขียนรีวิวของคุณ", namePlaceholder: "ชื่อของคุณ", commentPlaceholder: "แชร์ประสบการณ์ความประทับใจของคุณที่นี่...", submitReview: "ส่งรีวิว", reviewCountUnit: "รีวิว" },
        en: { label: "Recommended", open: "Opening Hours", tel: "Contact", menu: "Signature Dishes", gallery: "Gallery", reviewTitle: "Customer Reviews", writeReview: "Write a Review", namePlaceholder: "Your Name", commentPlaceholder: "Share your experience here...", submitReview: "Submit Review", reviewCountUnit: "Reviews" },
        zh: { label: "推荐餐厅", open: "营业时间", tel: "电话", menu: "推荐菜品", gallery: "图库", reviewTitle: "用户評價", writeReview: "撰写评论", namePlaceholder: "您的名字", commentPlaceholder: "在这里分享您的体验...", submitReview: "提交评论", reviewCountUnit: "条评论" }
    };
    const ui = uiMap[locale] || uiMap.th;

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !comment.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    targetId: restaurant.id,
                    targetType: "restaurant",
                    username,
                    rating,
                    comment
                })
            });

            if (res.ok) {
                const json = await res.json();
                
                // อัปเดต UI ทันทีหลังเพิ่มรีวิวผ่าน
                const updatedReviews = [json.data, ...reviews];
                setReviews(updatedReviews);

                const totalRating = updatedReviews.reduce((sum, item) => sum + item.rating, 0);
                const avg = totalRating / updatedReviews.length;
                setDisplayRating(Math.round(avg * 10) / 10);

                setUsername("");
                setComment("");
                setRating(5);
            }
        } catch (error) {
            console.error("Failed to submit review:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

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

            {/* 2. MAIN CONTENT AREA */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="relative -mt-24 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 z-10 border border-white mb-12"
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
                                    {/* 💡 แสดงดาวเฉลี่ยจาก State ล่าสุด */}
                                    <span className="font-bold">{displayRating}</span>
                                </div>
                                <span className="text-sm font-medium text-slate-400">
                                    ({reviews.length} {ui.reviewCountUnit})
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mb-10">
                        {data.desc}
                    </p>

                    {/* GALLERY MOSAIC */}
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

                    {/* Info bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-slate-50 rounded-[2rem] border border-slate-100 mb-12">
                        <InfoItem icon={<MapPin className="w-6 h-6" />} label="Location" value={data.location} color="text-blue-500" />
                        <InfoItem icon={<Clock className="w-6 h-6" />} label={ui.open} value={restaurant.openHours} color="text-emerald-500" />
                        <InfoItem icon={<Phone className="w-6 h-6" />} label={ui.tel} value={restaurant.tel} color="text-indigo-500" />
                    </div>

                    {/* Recommended dishes */}
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

                {/* 3. MAP SECTION */}
                {position && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12 space-y-6"
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

                {/* 4. REVIEWS SECTION */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-12 border border-white space-y-10"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500 rounded-lg text-white">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{ui.reviewTitle}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                        {/* ฟอร์มกรอกรีวิว */}
                        <form onSubmit={handleSubmitReview} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                            <h4 className="font-bold text-slate-800 text-lg">{ui.writeReview}</h4>
                            
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Rating</label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(null)}
                                            className="transition-transform active:scale-95"
                                        >
                                            <Star 
                                                className={`w-7 h-7 ${
                                                    star <= (hoverRating !== null ? hoverRating : rating)
                                                        ? "fill-yellow-400 stroke-yellow-400"
                                                        : "text-slate-300 stroke-slate-300"
                                                }`} 
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <input 
                                    type="text" 
                                    placeholder={ui.namePlaceholder}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-orange-400 font-semibold text-sm transition-colors"
                                />
                            </div>

                            <div>
                                <textarea 
                                    rows={4}
                                    placeholder={ui.commentPlaceholder}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-orange-400 font-medium text-sm transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-slate-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 text-sm"
                            >
                                {isSubmitting ? "..." : ui.submitReview}
                            </button>
                        </form>

                        {/* รายการข้อความรีวิว */}
                        <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                            <AnimatePresence initial={false}>
                                {reviews.length === 0 ? (
                                    <p className="text-slate-400 font-medium text-center py-10 text-sm">ยังไม่มีรีวิวสำหรับร้านนี้ มารีวิวคนแรกกันเลย!</p>
                                ) : (
                                    reviews.map((rev) => (
                                        <motion.div
                                            key={rev._id}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2"
                                        >
                                            <div className="flex items-center justify-between">
                                                <h5 className="font-bold text-slate-800 text-sm">{rev.username}</h5>
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(rev.rating)].map((_, i) => (
                                                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 stroke-yellow-400" />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-sm leading-relaxed font-medium">{rev.comment}</p>
                                            <p className="text-[10px] text-slate-400 font-semibold">
                                                {new Date(rev.createdAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-US' : 'th-TH', {
                                                    year: 'numeric', month: 'short', day: 'numeric'
                                                })}
                                            </p>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

// ─── Component ย่อย GalleryMosaic ───
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