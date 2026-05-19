"use client";

import React, { useEffect, useState } from "react";
import ChiangMaiPreloader from '@/app/perloding/ChiangMaiPreloader';
import { useParams } from 'next/navigation';
import { reviewsData } from "@/src/data/reviews";
import toast from 'react-hot-toast';

type Locale = 'th' | 'en' | 'zh';

interface UserReview {
    id: string | number;
    name: string;
    rating: number;
    comment?: string;
    createdAt?: string;
    tags: string[];
    image?: string;
}

export default function ReviewPage() {
    const params = useParams();
    const locale = (params.locale as Locale) || 'en';
    const [reviews, setReviews] = useState<UserReview[]>([]);
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [tags, setTags] = useState<string[]>(["ลูกค้าจริง", "ประทับใจ"]);
    const [isAddCommentOpen, setIsAddCommentOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<UserReview | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [dataPromise, setDataPromise] = useState<Promise<void> | null>(null);
    const Tratranslate = {
        th: {
            alertSuccess: "เพิ่มรีวิวสำเร็จ",
            alertError: "เพิ่มรีวิวไม่สำเร็จ",
            alertError2: "เกิดข้อผิดพลาด",
            review: "เสียงรีวิวจากลูกค้า",
            gallery: "แกลลอรี่รีวิว",
            addReview: "เพิ่มคอมเมนต์ใหม่",
            heroTitle1: "สิ่งที่",
            heroTitle2: "หัวใจชอบ",
            heroTitle3: "บอกต่อ",
            heroTitle4: "ไม่ได้อยู่เฉย",
            heroSubtitle: "รีวิวจากคุณลูกค้าจริง ที่ประทับใจผลิตภัณฑ์ของเรา",
            gallerySubtitle: "รูปภาพรีวิวความประทับใจจากลูกค้าของเรา",
            addCommentTitle: "เพิ่มคอมเมนต์ของคุณ",
            addCommentDesc: "แบ่งปันประสบการณ์ของคุณกับเรา",
            recentReview: "รีวิวเมื่อเร็วๆ นี้",
            nickname: "ชื่อเล่นของคุณ",
            nicknamePlaceholder: "พิมพ์ชื่อของคุณที่นี่...",
            ratingLabel: "ให้คะแนนประสบการณ์",
            commentLabel: "ความคิดเห็น",
            commentPlaceholder: "เล่าประสบการณ์ของคุณให้เราฟัง...",
            cancel: "ยกเลิก",
            submit: "เพิ่มคอมเมนต์",
        },
        en: {
            alertSuccess: "Review added successfully",
            alertError: "Failed to add review",
            alertError2: "An error occurred",
            review: "Customer Reviews",
            gallery: "Review Gallery",
            addReview: "Add New Comment",
            heroTitle1: "What your",
            heroTitle2: "heart loves",
            heroTitle3: "gets shared",
            heroTitle4: "it never stays quiet",
            heroSubtitle: "Real reviews from real customers who love our products",
            gallerySubtitle: "Photos and impressions from our customers",
            addCommentTitle: "Add Your Comment",
            addCommentDesc: "Share your experience with us",
            recentReview: "Reviewed recently",
            nickname: "Your Nickname",
            nicknamePlaceholder: "Type your name here...",
            ratingLabel: "Rate Your Experience",
            commentLabel: "Comment",
            commentPlaceholder: "Tell us about your experience...",
            cancel: "Cancel",
            submit: "Submit Comment",
        },
        zh: {
            alertSuccess: "评论添加成功",
            alertError: "评论添加失败",
            alertError2: "发生错误",
            review: "顾客评价",
            gallery: "评价相册",
            addReview: "添加新评论",
            heroTitle1: "内心",
            heroTitle2: "喜欢的",
            heroTitle3: "值得分享",
            heroTitle4: "好口碑自然传",
            heroSubtitle: "来自真实顾客的真实评价",
            gallerySubtitle: "顾客的照片与感想",
            addCommentTitle: "添加您的评论",
            addCommentDesc: "与我们分享您的体验",
            recentReview: "最近评价",
            nickname: "您的昵称",
            nicknamePlaceholder: "在此输入您的名字...",
            ratingLabel: "为您的体验评分",
            commentLabel: "评论内容",
            commentPlaceholder: "请告诉我们您的体验...",
            cancel: "取消",
            submit: "提交评论",
        },
    };

    const t = Tratranslate[locale] || Tratranslate.th;

    useEffect(() => {
        const promise = fetch('/api/review')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setReviews(data);
                }
            })
            .catch((err) => console.error("Fetch error:", err));

        setDataPromise(promise);
    }, []);

    const renderStars = (count: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <svg 
                key={i} 
                className={`w-5 h-5 ${i < count ? "text-yellow-400" : "text-gray-300"}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    if (!isReady) {
        return dataPromise ? (
            <ChiangMaiPreloader
                onComplete={() => setIsReady(true)}
                dataPromise={dataPromise}
            />
        ) : null; // หรือใส่ Loading เล็กๆ ไว้ก็ได้ครับ
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, rating, comment, tags }),
            });

            const data = await res.json();

            if (data.success) {
                const newReview: UserReview = {
                    id: data.insertedId || String(Date.now()),
                    name,
                    rating,
                    comment,
                    tags,
                    createdAt: new Date().toISOString(),
                };

                setReviews((prev) => [newReview, ...prev]);

                setName('');
                setRating(5);
                setComment('');
                setIsAddCommentOpen(false);

                toast.success(t.alertSuccess);
            } else {
                toast.error(t.alertError);
            }
        } catch (error) {
            toast.error(t.alertError2);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 2.5s ease-in-out infinite;
        }
        .modal-enter {
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .shadow-soft { box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .transition-all-300 { transition: all 300ms ease; }
      `}} />

            {/* Hero Section */}
            <div
                className="relative h-72 md:h-[400px] bg-cover bg-center flex items-center justify-center mb-16 shadow-soft"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-5 drop-shadow-lg leading-tight">
                        {t.heroTitle1}<span className="text-red-500">{t.heroTitle2}</span> {t.heroTitle3}
                    </h1>
                    <h2 className="hidden md:block text-5xl font-extrabold drop-shadow-lg">{t.heroTitle4}</h2>
                    <p className="hidden md:block text-white/90 text-xl mt-6">{t.heroSubtitle}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12">
                {/* Gallery Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-3 border-b-4 border-orange-500 pb-3 inline-flex">
                        <h2 className="text-4xl font-bold text-gray-800">{t.gallery}</h2>
                        <span className="text-4xl">📸</span>
                    </div>
                    <p className="text-gray-500 mb-8 text-sm pl-1">{t.gallerySubtitle}</p>

                    <div className="columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
                        {reviewsData.map((review) => (
                            <div
                                key={review.id}
                                className="break-inside-avoid relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all-300"
                            >
                                <img
                                    src={review.image}
                                    alt="Customer Review Gallery" 
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                                <div className="absolute top-4 right-4 animate-float drop-shadow-md">
                                    <span className="text-3xl opacity-90">💖</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Text Review Section */}
                <div>
                    <div className="flex items-center gap-3 mb-10 border-b-4 border-orange-500 pb-3 inline-flex">
                        <h2 className="text-4xl font-bold text-gray-800">{t.review}</h2>
                        <span className="text-4xl text-gray-300">💬</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* ปุ่มเพิ่มคอมเมนต์ */}
                        <div
                            className="bg-white p-6 rounded-3xl shadow-sm border-2 border-dashed border-orange-300 flex flex-col h-full hover:shadow-md transition-all-300 cursor-pointer justify-center items-center group"
                            onClick={() => setIsAddCommentOpen(true)}
                        >
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">➕</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">{t.addCommentTitle}</h3>
                            <p className="text-sm text-gray-500 mt-2 text-center">{t.addCommentDesc}</p>
                        </div>

                        {/* แสดงผลรีวิวข้อความจาก Redis */}
                        {reviews.map((review: any, index) => {
                            let parsedReview = review;
                            if (typeof review === 'string') {
                                try {
                                    parsedReview = JSON.parse(review);
                                } catch (e) {
                                    console.error('Parse error:', e, review);
                                    return null; // ข้ามรีวิวที่ parse ไม่ได้
                                }
                            }
                            const faceIcons = ["🐷", "🐟", "🐔", "🦆", "🐰", "🐶", "🐱", "🐼", "🐨", "🐸", "🐧", "🦉"];
                            const faceIcon = faceIcons[index % faceIcons.length];

                            const reviewName = review.name || "ผู้ใช้ทั่วไป";
                            const reviewRating = Number(review.rating) || 5;
                            const reviewComment = review.comment || review.text || ""; 
                            const reviewTags = review.tags || ["ลูกค้าจริง", "ประทับใจ"]; 

                            let reviewDate = "รีวิวเมื่อเร็วๆ นี้";
                            if (review.createdAt) {
                                try {
                                    reviewDate = new Date(review.createdAt).toLocaleDateString('th-TH', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    });
                                } catch (e) {
                                    console.error(e);
                                }
                            } else if (review.date) {
                                reviewDate = review.date;
                            }

                            return (
                                <div key={`redis-review-${index}`} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-all-300">
                                    <div className="flex items-center gap-3.5 mb-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl overflow-hidden shadow-inner">
                                            {faceIcon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800 text-base">{reviewName}</h4>
                                            <p className="text-xs text-gray-400">{reviewDate}</p>
                                        </div>
                                        <div className="flex shrink-0">
                                            {renderStars(reviewRating)}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-[15px] leading-relaxed flex-grow line-clamp-4">
                                        "{reviewComment}"
                                    </p>
                                    <div className="mt-5 flex flex-wrap gap-2.5 pt-4 border-t border-gray-100">
                                        {reviewTags.map((tag: string, idx: number) => (
                                            <span key={idx} className="px-4 py-1.5 bg-red-50 text-red-500 text-xs font-medium rounded-full border border-red-100 shadow-inner">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modal / Popup Component */}
            {selectedReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-8">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={() => setSelectedReview(null)}></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl max-h-[90vh] modal-enter border border-gray-100">
                        <button
                            className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors transition-all-300"
                            onClick={() => setSelectedReview(null)}
                        >
                            ✕
                        </button>

                        <div className="md:w-1/2 bg-gray-100 h-80 md:h-auto">
                            <img src={selectedReview.image} alt={selectedReview.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                            <div className="flex mb-6 shrink-0">
                                {renderStars(selectedReview.rating)}
                            </div>

                            <h3 className="text-3xl font-extrabold text-gray-800 mb-2 flex items-center gap-2.5">
                                {selectedReview.name} 🌸
                            </h3>
                            <p className="text-base text-gray-500 mb-8 pl-1">{selectedReview.createdAt}</p>

                            <div className="bg-gray-50 p-7 rounded-2xl border border-gray-100 relative shadow-inner">
                                <span className="absolute top-2 left-2 text-5xl text-gray-200">"</span>
                                <p className="text-gray-700 leading-relaxed relative z-10 text-lg">
                                    {selectedReview.comment}
                                </p>
                            </div>

                            <div className="mt-10 flex gap-2.5 flex-wrap pt-6 border-t border-gray-100">
                                {selectedReview.tags && selectedReview.tags.map((tag, idx) => (
                                    <span key={idx} className="px-5 py-2.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full shadow-inner border border-green-200 transition-all-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal เพิ่มคอมเมนต์ */}
            {isAddCommentOpen && (
                <form onSubmit={handleSubmit} className="fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-8">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={() => setIsAddCommentOpen(false)}></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col w-full max-w-lg modal-enter border border-gray-100 p-8">
                        <button
                            type="button"
                            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors transition-all-300"
                            onClick={() => setIsAddCommentOpen(false)}
                        >
                            ✕
                        </button>

                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="text-3xl">✍️</span> {t.addReview}
                        </h3>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.nickname}</label>
                                <input
                                    type="text"
                                    placeholder={t.nicknamePlaceholder}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow text-gray-800"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.ratingLabel}</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`text-3xl transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.commentLabel}</label>
                                <textarea
                                    rows={4}
                                    placeholder={t.commentPlaceholder}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow resize-none text-gray-800"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 mt-2 border-t border-gray-100">
                                <button
                                    type="button"
                                    className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsAddCommentOpen(false)}
                                >
                                    {t.cancel}
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 shadow-md hover:shadow-lg transition-all"
                                >
                                    {t.submit}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}