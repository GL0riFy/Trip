"use client";

import React, { useState } from "react";

import { reviewsData, Review } from "@/src/data/reviews";

export default function ReviewPage() {
    // State สำหรับจัดการการเปิด/ปิด Popup
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    // ฟังก์ชันวาดดาว
    const renderStars = (count: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className={`w-5 h-5 ${i < count ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* แทรก CSS สำหรับแอนิเมชันลอยขึ้นลง และ Modal transition */}
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
        /* CSS เพิ่มเติมสำหรับการตกแต่งทั่วไป */
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
                        สิ่งที่<span className="text-red-500">หัวใจชอบ</span> บอกต่อ<span className="md:hidden"> ไม่ได้อยู่เฉย</span>
                    </h1>
                    <h2 className="hidden md:block text-5xl font-extrabold drop-shadow-lg">ไม่ได้อยู่เฉย</h2>
                    <p className="hidden md:block text-white/90 text-xl mt-6">รีวิวจากคุณลูกค้าจริง ที่ประทับใจผลิตภัณฑ์ของเรา</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12">
                {/* Gallery Section */}
                <div className="mb-20">
                    <div className="flex items-center gap-3 mb-3 border-b-4 border-orange-500 pb-3 inline-flex">
                        <h2 className="text-4xl font-bold text-gray-800">แกลลอรี่รีวิว</h2>
                        <span className="text-4xl">📸</span>
                    </div>
                    <p className="text-gray-500 mb-8 text-sm pl-1">คลิกที่รูปภาพเพื่อดูข้อมูลเพิ่มเติม</p>

                    {/* Masonry Layout สำหรับรูปภาพ (ดีไซน์แบบ Masonry คล้ายๆ กันด้วยการใช้ grid และ custom spans) */}
                    {/* เราจะใช้ CSS columns เพื่อสร้าง Masonry Layout ที่สวยงามและตอบสนองได้ดี */}
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
                        {reviewsData.map((review) => ( // แสดงผล 12 ภาพ
                            <div
                                key={review.id}
                                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all-300"
                                onClick={() => setSelectedReview(review)}
                            >
                                <img
                                    src={review.image}
                                    alt={`Review by ${review.name}`}
                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-15 transition-opacity duration-300"></div>
                                {/* ไอคอนหัวใจลอยได้ */}
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
                        <h2 className="text-4xl font-bold text-gray-800">เสียงรีวิวจากลูกค้า</h2>
                        <span className="text-4xl text-gray-300">💬</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {reviewsData.map((review) => (
                            <div key={review.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-all-300">
                                <div className="flex items-center gap-3.5 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold overflow-hidden shadow-inner">
                                        <img src={review.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800 text-base">{review.name}</h4>
                                        <p className="text-xs text-gray-400">{review.date}</p>
                                    </div>
                                    <div className="flex shrink-0">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                                <p className="text-gray-700 text-[15px] leading-relaxed flex-grow line-clamp-4">
                                    "{review.text}"
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2.5 pt-4 border-t border-gray-100">
                                    {review.tags.map((tag, idx) => (
                                        <span key={idx} className="px-4 py-1.5 bg-red-50 text-red-500 text-xs font-medium rounded-full border border-red-100 shadow-inner">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal / Popup Component */}
            {selectedReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-5 sm:p-8">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedReview(null)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl max-h-[90vh] modal-enter border border-gray-100">
                        {/* ปุ่มปิด */}
                        <button
                            className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors transition-all-300"
                            onClick={() => setSelectedReview(null)}
                        >
                            ✕
                        </button>

                        {/* รูปภาพฝั่งซ้าย */}
                        <div className="md:w-1/2 bg-gray-100 h-80 md:h-auto">
                            <img
                                src={selectedReview.image}
                                alt={selectedReview.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* ข้อมูลฝั่งขวา */}
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                            <div className="flex mb-6 shrink-0">
                                {renderStars(selectedReview.rating)}
                            </div>

                            <h3 className="text-3xl font-extrabold text-gray-800 mb-2 flex items-center gap-2.5">
                                {selectedReview.name} 🌸
                            </h3>
                            <p className="text-base text-gray-500 mb-8 pl-1">{selectedReview.date}</p>

                            <div className="bg-gray-50 p-7 rounded-2xl border border-gray-100 relative shadow-inner">
                                {/* เครื่องหมายคำพูดตกแต่ง */}
                                <span className="absolute top-2 left-2 text-5xl text-gray-200">"</span>
                                <p className="text-gray-700 leading-relaxed relative z-10 text-lg">
                                    {selectedReview.text}
                                </p>
                            </div>

                            <div className="mt-10 flex gap-2.5 flex-wrap pt-6 border-t border-gray-100">
                                {selectedReview.tags.map((tag, idx) => (
                                    <span key={idx} className="px-5 py-2.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full shadow-inner border border-green-200 transition-all-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}