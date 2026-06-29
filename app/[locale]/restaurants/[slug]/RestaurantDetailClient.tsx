// app/[locale]/restaurants/[slug]/RestaurantDetailClient.tsx
"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MapPin, Clock, Phone, Star, UtensilsCrossed,
  Share, Heart, X, ChevronLeft, ChevronRight, MessageSquare
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
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
  initialReviews: IReviewItem[];
  locale: Locale;
}

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center text-gray-400 text-sm">
      Loading map...
    </div>
  ),
});

const translations = {
  th: {
    recommended: "แนะนำ",
    aboutRestaurant: "เกี่ยวกับร้านอาหาร",
    signatureDishes: "เมนูแนะนำ",
    openingHours: "เวลาเปิดทำการ",
    contact: "ติดต่อร้านโดยตรง",
    reviews: "รีวิวจากผู้ใช้งาน",
    writeReview: "เขียนรีวิว",
    yourName: "ชื่อของคุณ",
    yourRating: "คะแนนของคุณ",
    yourComment: "ความคิดเห็นของคุณ",
    submitReview: "ส่งรีวิว",
    submitting: "กำลังส่ง...",
    reviewSuccess: "ขอบคุณสำหรับรีวิวของคุณ! 🎉",
    reviewError: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
    noReviews: "ยังไม่มีรีวิว มาเป็นคนแรกที่รีวิวร้านนี้กันเลย!",
    basedOn: "จาก",
    ratingsTotal: "รีวิว",
    namePlaceholder: "กรอกชื่อของคุณ",
    commentPlaceholder: "แชร์ประสบการณ์ของคุณที่ร้านนี้...",
    cancel: "ยกเลิก",
    location: "ที่ตั้ง",
    viewAllPhotos: "ดูรูปทั้งหมด",
  },
  en: {
    recommended: "Recommended",
    aboutRestaurant: "About the restaurant",
    signatureDishes: "Signature Dishes",
    openingHours: "Opening Hours",
    contact: "Contact directly",
    reviews: "Customer Reviews",
    writeReview: "Write a Review",
    yourName: "Your Name",
    yourRating: "Your Rating",
    yourComment: "Your Comment",
    submitReview: "Submit Review",
    submitting: "Submitting...",
    reviewSuccess: "Thank you for your review! 🎉",
    reviewError: "Something went wrong. Please try again.",
    noReviews: "No reviews yet. Be the first to review this restaurant!",
    basedOn: "Based on",
    ratingsTotal: "reviews",
    namePlaceholder: "Enter your name",
    commentPlaceholder: "Share your experience here...",
    cancel: "Cancel",
    location: "Location",
    viewAllPhotos: "View all photos",
  },
  zh: {
    recommended: "推荐餐厅",
    aboutRestaurant: "关于餐厅",
    signatureDishes: "推荐菜品",
    openingHours: "营业时间",
    contact: "直接联系餐厅",
    reviews: "用户评价",
    writeReview: "撰写评价",
    yourName: "您的姓名",
    yourRating: "您的评分",
    yourComment: "您的评论",
    submitReview: "提交评价",
    submitting: "提交中...",
    reviewSuccess: "感谢您的评价！🎉",
    reviewError: "出现错误，请重试。",
    noReviews: "暂无评价，成为第一个评价此餐厅的人！",
    basedOn: "基于",
    ratingsTotal: "条评价",
    namePlaceholder: "请输入您的姓名",
    commentPlaceholder: "在这里分享您的用餐体验...",
    cancel: "取消",
    location: "位置",
    viewAllPhotos: "查看全部照片",
  },
};

// ---- Review Modal ----
function ReviewModal({
  open,
  onClose,
  onSubmit,
  t,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, rating: number, comment: string) => Promise<void>;
  t: typeof translations['en'];
  isLoading: boolean;
}) {
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async () => {
    if (!formName.trim() || !formComment.trim()) return;
    await onSubmit(formName.trim(), formRating, formComment.trim());
    setFormName('');
    setFormComment('');
    setFormRating(5);
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open) return null;

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      style={{ animation: 'fadeIn 0.2s ease' }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 z-10"
        style={{ animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <h3 className="text-2xl font-extrabold text-gray-900">{t.writeReview}</h3>
          <p className="text-sm text-gray-400 mt-1">{t.yourRating}</p>
        </div>

        {/* Star picker */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => setFormRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-125 active:scale-110"
            >
              <Star
                size={36}
                className={`transition-colors duration-150 ${star <= (hoverRating || formRating) ? 'text-yellow-400' : 'text-gray-200'}`}
                fill={star <= (hoverRating || formRating) ? 'currentColor' : 'none'}
              />
            </button>
          ))}
          <span className="ml-2 self-center text-sm font-semibold text-gray-500">
            {(hoverRating || formRating)}/5
          </span>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.yourName}</label>
          <input
            type="text"
            value={formName}
            onChange={e => setFormName(e.target.value)}
            placeholder={t.namePlaceholder}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50 transition"
          />
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.yourComment}</label>
          <textarea
            value={formComment}
            onChange={e => setFormComment(e.target.value)}
            placeholder={t.commentPlaceholder}
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-50 resize-none transition"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-2xl hover:bg-gray-200 transition"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !formName.trim() || !formComment.trim()}
            className="flex-1 py-3 text-sm font-semibold text-white bg-gray-900 rounded-2xl hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                {t.submitting}
              </>
            ) : (
              <>{t.submitReview}</>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

// ---- Bento Grid Gallery ----
function BentoGallery({ images, name }: { images: string[]; name: string }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = (idx = 0) => {
    setLightboxIdx(idx);
    setIsGalleryOpen(true);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="relative mb-10">
        {images.length === 1 && (
          <div className="h-[500px] rounded-3xl overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
            <img src={images[0]} alt={name} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
          </div>
        )}
        {images.length === 2 && (
          <div className="grid md:grid-cols-2 gap-3 h-[500px] rounded-3xl overflow-hidden">
            {images.map((img, idx) => (
              <div key={idx} className="overflow-hidden cursor-pointer" onClick={() => openLightbox(idx)}>
                <img src={img} alt={`${name} ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
              </div>
            ))}
          </div>
        )}
        {images.length === 3 && (
          <div className="grid md:grid-cols-3 gap-3 h-[500px] rounded-3xl overflow-hidden">
            <div className="md:col-span-2 overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
              <img src={images[0]} alt={`${name} 1`} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
            </div>
            <div className="grid grid-rows-2 gap-3">
              {images.slice(1).map((img, idx) => (
                <div key={idx} className="overflow-hidden cursor-pointer" onClick={() => openLightbox(idx + 1)}>
                  <img src={img} alt={`${name} ${idx + 2}`} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                </div>
              ))}
            </div>
          </div>
        )}
        {images.length >= 4 && (
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[500px] rounded-3xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2 overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
              <img src={images[0]} alt={`${name} 1`} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
            </div>
            {images.slice(1, 5).map((img, idx) => {
              const isLast = idx === 3;
              const hasMore = images.length > 5;
              return (
                <div key={idx} className="relative overflow-hidden cursor-pointer" onClick={() => openLightbox(idx + 1)}>
                  <img src={img} alt={`${name} ${idx + 2}`} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                  {isLast && hasMore && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold">
                      +{images.length - 5}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Full Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsGalleryOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={images[lightboxIdx]}
                alt={`${name} ${lightboxIdx + 1}`}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <p className="text-center text-white/50 text-sm mt-3">
                {lightboxIdx + 1} / {images.length}
              </p>
            </motion.div>
            <button
              onClick={e => { e.stopPropagation(); setIsGalleryOpen(false); }}
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i - 1 + images.length) % images.length); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setLightboxIdx(i => (i + 1) % images.length); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ---- Main Component ----
export default function RestaurantDetailClient({ restaurant, initialReviews, locale }: ClientProps) {
  const t = translations[locale] || translations['en'];
  const data = restaurant.locales[locale] || restaurant.locales.th;
  const position = restaurant.coords;

  const [reviews, setReviews] = useState<IReviewItem[]>(initialReviews);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // displayRating เริ่มต้นเป็น 0 เสมอ — จะถูก set จริงหลัง fetch รีวิวจาก DB
  const [displayRating, setDisplayRating] = useState<number>(0);

  // Fetch reviews จาก API ทุกครั้งที่ mount เพื่อให้ข้อมูล sync กับ DB เสมอ
  // (แก้ปัญหา: รีวิวหายเมื่อกลับมา, รีวิวค้างหลังลบใน DB, ดาวไม่อัปเดต)
  React.useEffect(() => {
    const restaurantId = restaurant.id || String((restaurant as any)._id);
    if (!restaurantId) return;

    fetch(`/api/reviews?targetId=${restaurantId}&targetType=restaurant`)
      .then(res => res.json())
      .then(json => {
        const fetched: IReviewItem[] = json.data || [];
        setReviews(fetched);
        // คำนวณดาวเฉลี่ยจาก reviews จริงใน DB ถ้าไม่มีให้เป็น 0
        if (fetched.length > 0) {
          const avg = fetched.reduce((s, r) => s + Number(r.rating), 0) / fetched.length;
          setDisplayRating(Math.round(avg * 10) / 10);
        } else {
          setDisplayRating(0);
        }
        setReviewsLoaded(true);
      })
      .catch(() => setReviewsLoaded(true));
  }, [restaurant.id]);

  // Gallery: ใช้ restaurant.gallery ถ้ามี ไม่งั้น fallback เป็น image เดียว
  const galleryImages: string[] = restaurant.gallery && restaurant.gallery.length > 0
    ? restaurant.gallery
    : restaurant.image ? [restaurant.image] : [];

  const handleSubmitReview = async (name: string, rating: number, comment: string) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetId: restaurant.id,
          targetType: 'restaurant',
          username: name,
          rating,
          comment,
        }),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();

      const updatedReviews = [json.data, ...reviews];
      setReviews(updatedReviews);

      const avg = updatedReviews.reduce((s, r) => s + Number(r.rating), 0) / updatedReviews.length;
      setDisplayRating(Math.round(avg * 10) / 10);

      setShowModal(false);
      toast.success(t.reviewSuccess, {
        duration: 4000,
        style: { borderRadius: '16px', fontWeight: '600', fontSize: '14px' },
      });
    } catch {
      toast.error(t.reviewError, {
        duration: 4000,
        style: { borderRadius: '16px', fontWeight: '600', fontSize: '14px' },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <Toaster position="top-center" />

      <ReviewModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitReview}
        t={t}
        isLoading={isSubmitting}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest">
                {t.recommended}
              </span>
              <div className="flex items-center gap-1.5 bg-yellow-400/10 text-yellow-700 px-3 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                <span className="font-bold text-sm">{displayRating > 0 ? displayRating : '—'}</span>
              </div>
              <span className="text-sm text-gray-400 font-medium">
                ({reviews.length} {t.ratingsTotal})
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
              {data.name}
            </h1>
            <div className="flex items-center text-gray-500 font-medium">
              <MapPin size={18} className="mr-1.5 text-gray-400 shrink-0" />
              <span>{data.location}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:text-rose-500 transition shadow-sm">
              <Heart size={20} />
            </button>
            <button className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:text-blue-500 transition shadow-sm">
              <Share size={20} />
            </button>
          </div>
        </div>

        {/* Bento Grid Gallery */}
        <BentoGallery images={galleryImages} name={data.name} />

        {/* Content & Sidebar */}
        {/*
          Desktop (lg+): 2-col grid — content ซ้าย | sidebar ขวา
          Mobile: stack ตามลำดับ DOM:
            1. About + Dishes  (col-span-2 content)
            2. Sidebar (Map + Contact)   ← lg:order-last แต่ mobile ขึ้นก่อน Reviews
            3. Reviews (full-width ด้านล่างสุด)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: About + Dishes */}
          <div className="lg:col-span-2 space-y-10">

            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.aboutRestaurant}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">{data.desc}</p>
            </section>
            <hr />

            {/* Signature Dishes */}
            {data.recommended && data.recommended.length > 0 && (
              <>
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <UtensilsCrossed className="w-5 h-5 text-white" />
                    </div>
                    {t.signatureDishes}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.recommended.map((dish: string, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-md transition-all"
                      >
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-orange-500" />
                        <span className="font-semibold text-gray-700">{dish}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* Right: Sidebar — บนมือถือจะอยู่หลัง About/Dishes แต่ก่อน Reviews */}
          <aside className="relative">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">

                {/* Map */}
                {position && (
                  <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">{t.location}</h3>
                    <div className="overflow-hidden rounded-2xl border border-gray-100 h-48">
                      <MapComponent
                        lat={position.lat}
                        lng={position.lng}
                        name={data.name}
                        mapLink={restaurant.mapLink}
                      />
                    </div>
                  </div>
                )}

                <hr className="mb-6" />

                {/* Contact */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-4">{t.contact}</h3>
                  <div className="space-y-4">
                    {restaurant.tel && (
                      <a
                        href={`tel:${restaurant.tel}`}
                        className="flex items-center text-gray-600 hover:text-emerald-600 transition group"
                      >
                        <div className="bg-gray-50 group-hover:bg-emerald-50 p-2 rounded-lg mr-3 transition">
                          <Phone size={18} />
                        </div>
                        <span className="font-medium">{restaurant.tel}</span>
                      </a>
                    )}
                    {restaurant.openHours && (
                      <div className="flex items-center text-gray-600">
                        <div className="bg-gray-50 p-2 rounded-lg mr-3">
                          <Clock size={18} />
                        </div>
                        <span className="font-medium">{restaurant.openHours}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Map link */}
                {restaurant.mapLink && (
                  <a
                    href={restaurant.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold px-5 py-3 rounded-2xl text-sm transition active:scale-95"
                  >
                    <MapPin size={16} />
                    {locale === 'th' ? 'เปิดใน Google Maps' : locale === 'zh' ? '在 Google Maps 中打开' : 'Open in Google Maps'}
                  </a>
                )}
              </div>
            </div>
          </aside>

          {/* Reviews — full width, อยู่ล่างสุดทั้ง mobile และ desktop */}
          <section className="lg:col-span-3">
            <hr className="mb-10" />
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg text-white">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  {t.reviews}
                </h2>
                <p className="text-sm text-gray-500 mt-2 ml-12">
                  {t.basedOn} {reviews.length} {t.ratingsTotal}
                  {reviews.length > 0 && (
                    <>
                      {' · '}
                      <span className="font-semibold text-yellow-500">
                        {displayRating} ★
                      </span>
                    </>
                  )}
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold px-5 py-2.5 rounded-2xl text-sm transition active:scale-95"
              >
                <Star size={16} fill="currentColor" />
                {t.writeReview}
              </button>
            </div>

            {/* Review list */}
            {!reviewsLoaded ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse bg-gray-100 rounded-3xl h-28" />
                ))}
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-gray-400 text-center py-10">{t.noReviews}</p>
            ) : (
              <AnimatePresence initial={false}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reviews.map((review) => (
                    <motion.div
                      key={review._id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                            {review.username?.[0]?.toUpperCase() || '?'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{review.username}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString(
                                locale === 'th' ? 'th-TH' : locale === 'zh' ? 'zh-CN' : 'en-US',
                                { year: 'numeric', month: 'long', day: 'numeric' }
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-xl">
                          <Star size={14} fill="currentColor" className="text-yellow-400" />
                          <span className="text-sm font-bold text-yellow-600">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}