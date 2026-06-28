// app/[locale]/hotels/[slug]/HotelDetailClient.tsx
"use client";

import React, { useState } from 'react';
import { 
  MapPin, Clock, Star, Phone, Mail, MessageCircle, 
  Info, CheckCircle, Share, Heart, X, ChevronRight 
} from 'lucide-react';
import dynamic from 'next/dynamic';
import toast, { Toaster } from 'react-hot-toast';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center text-gray-400 text-sm">
      Loading map...
    </div>
  ),
});

type Locale = 'th' | 'en' | 'zh';

const translations = {
  th: {
    viewAllPhotos: "ดูรูปทั้งหมด",
    aboutProperty: "เกี่ยวกับที่พัก",
    popularAmenities: "สิ่งอำนวยความสะดวกยอดนิยม",
    goodToKnow: "ข้อมูลที่ควรทราบ",
    checkInFrom: "เช็คอินตั้งแต่",
    checkOutUntil: "เช็คเอาต์จนถึง",
    startingPrice: "ราคาเริ่มต้น",
    perNight: "/ คืน",
    contactDirectly: "ติดต่อที่พักโดยตรง",
    reviews: "รีวิวจากผู้เข้าพัก",
    writeReview: "เขียนรีวิว",
    yourName: "ชื่อของคุณ",
    yourRating: "คะแนนของคุณ",
    yourComment: "ความคิดเห็นของคุณ",
    submitReview: "ส่งรีวิว",
    submitting: "กำลังส่ง...",
    reviewSuccess: "ขอบคุณสำหรับรีวิวของคุณ! 🎉",
    reviewError: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
    noReviews: "ยังไม่มีรีวิว เป็นคนแรกที่รีวิวที่พักนี้!",
    basedOn: "จาก",
    ratingsTotal: "รีวิว",
    namePlaceholder: "กรอกชื่อของคุณ",
    commentPlaceholder: "บอกเล่าประสบการณ์การเข้าพักของคุณ...",
    cancel: "ยกเลิก",
  },
  en: {
    viewAllPhotos: "View all photos",
    aboutProperty: "About the property",
    popularAmenities: "Popular amenities",
    goodToKnow: "Good to know",
    checkInFrom: "Check-in from",
    checkOutUntil: "Check-out until",
    startingPrice: "Starting from",
    perNight: "/ night",
    contactDirectly: "Contact property directly",
    reviews: "Guest Reviews",
    writeReview: "Write a Review",
    yourName: "Your Name",
    yourRating: "Your Rating",
    yourComment: "Your Comment",
    submitReview: "Submit Review",
    submitting: "Submitting...",
    reviewSuccess: "Thank you for your review! 🎉",
    reviewError: "Something went wrong. Please try again.",
    noReviews: "No reviews yet. Be the first to review this property!",
    basedOn: "Based on",
    ratingsTotal: "reviews",
    namePlaceholder: "Enter your name",
    commentPlaceholder: "Tell us about your stay...",
    cancel: "Cancel",
  },
  zh: {
    viewAllPhotos: "查看全部照片",
    aboutProperty: "关于住宿",
    popularAmenities: "热门设施",
    goodToKnow: "需知信息",
    checkInFrom: "办理入住时间",
    checkOutUntil: "退房时间",
    startingPrice: "起价",
    perNight: "/ 晚",
    contactDirectly: "直接联系住宿",
    reviews: "住客评价",
    writeReview: "撰写评价",
    yourName: "您的姓名",
    yourRating: "您的评分",
    yourComment: "您的评论",
    submitReview: "提交评价",
    submitting: "提交中...",
    reviewSuccess: "感谢您的评价！🎉",
    reviewError: "出现错误，请重试。",
    noReviews: "暂无评价，成为第一个评价此住宿的人！",
    basedOn: "基于",
    ratingsTotal: "条评价",
    namePlaceholder: "请输入您的姓名",
    commentPlaceholder: "分享您的入住体验...",
    cancel: "取消",
  }
};

const getBookingPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "agoda":
      return <img src="https://cdn.brandfetch.io/idrJbkwvG0/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1724730098837" alt="Agoda" className="w-6 h-6 rounded-md object-cover" />;
    case "booking":
      return <img src="https://cdn.brandfetch.io/id9mEmLNcV/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1725855381233" alt="Booking.com" className="w-6 h-6 rounded-md object-cover" />;
    case "trip":
    case "trip.com":
      return <img src="https://cdn.brandfetch.io/id84Kz4mXP/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667617798753" alt="Trip.com" className="w-6 h-6 rounded-md object-cover" />;
    default:
      return null;
  }
};

const getBookingPlatformStyle = (platform: string) => {
  const platformLower = platform.toLowerCase();
  if (platformLower.includes('agoda')) return { bgHover: 'hover:bg-emerald-50', border: 'hover:border-emerald-200', text: 'group-hover:text-emerald-700' };
  if (platformLower.includes('booking')) return { bgHover: 'hover:bg-blue-50', border: 'hover:border-blue-200', text: 'group-hover:text-blue-700' };
  if (platformLower.includes('trip')) return { bgHover: 'hover:bg-orange-50', border: 'hover:border-orange-200', text: 'group-hover:text-orange-700' };
  return { bgHover: 'hover:bg-gray-100', border: 'hover:border-gray-300', text: 'group-hover:text-gray-700' };
};

// ---- Review Modal Component ----
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

  // Close on backdrop click
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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 z-10"
        style={{ animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>

        {/* Title */}
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
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
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

// ---- Main Component ----
export default function HotelDetailClient({ data, locale }: { data: any, locale: Locale }) {
  const t = translations[locale] || translations['en'];
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // --- Review State ---
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    const hotelId = data.id || String(data._id);
    if (!hotelId) return;

    fetch(`/api/reviews?targetId=${hotelId}&targetType=hotel`)
      .then(res => res.json())
      .then(json => {
        setReviews(json.data || []);
        setReviewsLoaded(true);
      })
      .catch(() => setReviewsLoaded(true));
  }, [data.id, data._id]);

  const handleSubmitReview = async (name: string, rating: number, comment: string) => {
    const hotelId = data.id || String(data._id);
    if (!hotelId) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetId: hotelId, targetType: 'hotel', username: name, rating, comment }),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setReviews(prev => [json.data, ...prev]);
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
      {/* React Hot Toast */}
      <Toaster position="top-center" />

      {/* Review Modal */}
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
              <div className="flex items-center text-yellow-400 bg-yellow-50 px-2 py-1 rounded-lg">
                {[...Array(data.starRating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              {data.tags && data.tags.slice(0, 2).map((tag: string, idx: number) => (
                <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">{data.name}</h1>
            <div className="flex items-center text-gray-500 font-medium">
              <MapPin size={18} className="mr-1.5 text-gray-400 shrink-0" />
              <span>{data.address}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:text-rose-500 transition shadow-sm"><Heart size={20} /></button>
            <button className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:text-blue-500 transition shadow-sm"><Share size={20} /></button>
          </div>
        </div>

        {/* Bento Grid Gallery */}
        <div className="relative mb-10">
          {data.images.length === 1 && (
            <div className="h-[500px] rounded-3xl overflow-hidden" onClick={() => setIsGalleryOpen(true)}>
              <img src={data.images[0]} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          {data.images.length === 2 && (
            <div className="grid md:grid-cols-2 gap-3 h-[500px] rounded-3xl overflow-hidden">
              {data.images.map((img: string, idx: number) => (
                <div key={idx} className="overflow-hidden cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                </div>
              ))}
            </div>
          )}
          {data.images.length === 3 && (
            <div className="grid md:grid-cols-3 gap-3 h-[500px] rounded-3xl overflow-hidden">
              <div className="md:col-span-2 overflow-hidden cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                <img src={data.images[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
              </div>
              <div className="grid grid-rows-2 gap-3">
                {data.images.slice(1).map((img: string, idx: number) => (
                  <div key={idx} className="overflow-hidden cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.images.length >= 4 && (
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[500px] rounded-3xl overflow-hidden">
              <div className="md:col-span-2 md:row-span-2 overflow-hidden cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                <img src={data.images[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
              </div>
              {data.images.slice(1, 5).map((img: string, idx: number) => {
                const isLast = idx === 3;
                const hasMore = data.images.length > 5;
                return (
                  <div key={idx} className="relative overflow-hidden cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                    {isLast && hasMore && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold">+{data.images.length - 5}</div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Gallery Modal */}
        {isGalleryOpen && (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-4 flex justify-between items-center border-b">
              <h3 className="font-bold text-xl">{data.name}</h3>
              <button onClick={() => setIsGalleryOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><X size={24} /></button>
            </div>
            <div className="max-w-3xl mx-auto p-4 space-y-4">
              {data.images.map((img: string, idx: number) => (
                <div key={idx} className="rounded-2xl overflow-hidden bg-gray-100">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.aboutProperty}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">{data.description}</p>
            </section>
            <hr />
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.popularAmenities}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                {data.amenities.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center text-gray-700">
                    <CheckCircle size={20} className="text-emerald-500 mr-3 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>
            <hr />
            <section className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center"><Info className="mr-3 text-rose-500" /> {t.goodToKnow}</h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center border border-rose-50">
                  <div className="bg-rose-100 p-3 rounded-xl mr-4"><Clock size={24} className="text-rose-600" /></div>
                  <div><p className="text-sm text-gray-500 mb-1">{t.checkInFrom}</p><p className="font-bold text-xl text-gray-900">{data.checkIn}</p></div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center border border-rose-50">
                  <div className="bg-rose-100 p-3 rounded-xl mr-4"><Clock size={24} className="text-rose-600" /></div>
                  <div><p className="text-sm text-gray-500 mb-1">{t.checkOutUntil}</p><p className="font-bold text-xl text-gray-900">{data.checkOut}</p></div>
                </div>
              </div>
              {data.policies && data.policies.length > 0 && (
                <ul className="space-y-3">
                  {data.policies.map((policy: string, idx: number) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 mr-3 shrink-0"></div>
                      <span className="leading-relaxed">{policy}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <hr />

            {/* Review Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{t.reviews}</h2>
                  {reviews.length > 0 ? (
                    <p className="text-sm text-gray-500 mt-1">
                      {t.basedOn} {reviews.length} {t.ratingsTotal}
                      {' · '}
                      <span className="font-semibold text-yellow-500">
                        {/* ดักจับกรณีไม่มีรีวิว หรือป้องการหารด้วย 0 ป้องกันปัญหา NaN บนหน้าเว็บ */}
                        {(reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) / reviews.length || 0).toFixed(1)} ★
                      </span>
                    </p>
                  ) : (
                    /* แสดงจำนวน 0 รีวิว เป็นค่าพื้นฐานอย่างปลอดภัยตามรูปภาพ image_327ee8.png */
                    <p className="text-sm text-gray-500 mt-1">
                      0 {t.ratingsTotal} · <span className="font-semibold text-yellow-500">0.0 ★</span>
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold px-5 py-2.5 rounded-2xl text-sm transition active:scale-95"
                >
                  <Star size={16} fill="currentColor" />
                  {t.writeReview}
                </button>
              </div>

              {/* Review List */}
              {!reviewsLoaded ? (
                <div className="space-y-4">
                  {[1, 2].map(i => (
                    <div key={i} className="animate-pulse bg-gray-100 rounded-3xl h-28" />
                  ))}
                </div>
              ) : reviews.length === 0 ? (
                <p className="text-gray-400 text-center py-10">{t.noReviews}</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review: any) => (
                    <div key={review._id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
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
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="relative">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">{locale === 'th' ? 'ตำแหน่งที่ตั้ง' : 'Location'}</h3>
                  <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <MapComponent lat={data.coords.lat} lng={data.coords.lng} name={data.name} mapLink={data.mapLink || ''} />
                  </div>
                </div>
                <hr className="mb-6" />
                <div className="mb-6">
                  <p className="text-gray-500 font-medium mb-2">{t.startingPrice}</p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-4xl font-extrabold text-gray-900">{data.priceRange}</h2>
                    <span className="text-gray-500">{t.perNight}</span>
                  </div>
                </div>
                <hr className="mb-6" />
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">{t.contactDirectly}</h3>
                  <div className="space-y-4">
                    <a href={`tel:${data.contact.phone}`} className="flex items-center text-gray-600 hover:text-emerald-600 transition group">
                      <div className="bg-gray-50 group-hover:bg-emerald-50 p-2 rounded-lg mr-3 transition"><Phone size={18} /></div>
                      <span className="font-medium">{data.contact.phone}</span>
                    </a>
                    <a href={`mailto:${data.contact.email}`} className="flex items-center text-gray-600 hover:text-emerald-600 transition group">
                      <div className="bg-gray-50 group-hover:bg-emerald-50 p-2 rounded-lg mr-3 transition"><Mail size={18} /></div>
                      <span className="font-medium">{data.contact.email}</span>
                    </a>
                    {data.contact.lineId && (
                      <div className="flex items-center text-gray-600 hover:text-[#00B900] transition group">
                        <div className="bg-gray-50 group-hover:bg-[#00B900]/10 p-2 rounded-lg mr-3 transition"><MessageCircle size={18} /></div>
                        <span className="font-medium">LINE: {data.contact.lineId}</span>
                      </div>
                    )}
                  </div>
                </div>

                {data.bookingPlatforms && data.bookingPlatforms.length > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">{locale === 'th' ? 'จองผ่านแพลตฟอร์ม' : 'Booking Platforms'}</h3>
                    <div className="space-y-3">
                      {data.bookingPlatforms.map((booking: any, idx: number) => {
                        const style = getBookingPlatformStyle(booking.platform);
                        return (
                          <a key={idx} href={booking.link} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between bg-gray-50 ${style.bgHover} border border-gray-100 ${style.border} rounded-2xl px-4 py-3 transition group`}>
                            <div className="flex items-center gap-3">
                              <div className={`${style.text}`}>{getBookingPlatformIcon(booking.platform)}</div>
                              <span className={`font-semibold text-gray-800 ${style.text}`}>{booking.platform}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}