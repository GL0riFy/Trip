"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  MapPin, Clock, Info, Share, Heart, X 
} from 'lucide-react';
import { ChiangMaiData } from '@/src/data/chiangmai';
import MapComponent from './MapComponent';

// --- Interfaces ---
export interface ChiangMaiUIData {
  name: string;
  address: string;
  images: string[];
  description: string;
  amenities: string[];
  starRating: number;
  priceRange: string;
  contact: {
    phone: string;
    email: string;
  };
  hours: string;
  tags: string[];
  coords: {
    lat: number;
    lng: number;
  };
  mapLink?: string;
}

type Locale = 'th' | 'en' | 'zh';

const translations = {
  th: {
    viewAllPhotos: "ดูรูปทั้งหมด",
    aboutProperty: "เกี่ยวกับสถานที่ท่องเที่ยว",
    popularAmenities: "ไฮไลท์และสิ่งอำนวยความสะดวก",
    goodToKnow: "ข้อมูลที่ควรทราบก่อนเดินทาง",
    openingHours: "เวลาเปิดทำการ",
    startingPrice: "อัตราค่าบริการ / ค่าเข้าชม",
    contactDirectly: "ติดต่อสถานที่โดยตรง",
    notFoundTitle: "404",
    notFoundDesc: "ไม่พบข้อมูลสถานที่ท่องเที่ยวเชียงใหม่ที่คุณต้องการ",
  },
  en: {
    viewAllPhotos: "View all photos",
    aboutProperty: "About this attraction",
    popularAmenities: "Highlights & Amenities",
    goodToKnow: "Good to know before you go",
    openingHours: "Opening Hours",
    startingPrice: "Entrance Fee / Price",
    contactDirectly: "Contact directly",
    notFoundTitle: "404",
    notFoundDesc: "Chiang Mai attraction not found",
  },
  zh: {
    viewAllPhotos: "查看全部照片",
    aboutProperty: "关于该景点",
    popularAmenities: "景点亮点与设施",
    goodToKnow: "行前需知信息",
    openingHours: "开放时间",
    startingPrice: "门票价格 / 费用",
    contactDirectly: "直接联系目的地",
    notFoundTitle: "404",
    notFoundDesc: "未找到您需要的清迈景点信息",
  }
};

// --- Component ย่อยสำหรับแสดงผล ---
const ChiangMaiDetailContent: React.FC<{ data: ChiangMaiUIData, locale: Locale }> = ({ data, locale }) => {
  const t = translations[locale] || translations['en'];
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {data.tags && data.tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
              {data.name}
            </h1>
            <div className="flex items-center text-gray-500 font-medium">
              <MapPin size={18} className="mr-1.5 text-gray-400 shrink-0" />
              <span>{data.address}</span>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end gap-3">
            <div className="flex gap-2">
              <button className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:text-rose-500 transition shadow-sm">
                <Heart size={20} />
              </button>
              <button className="p-2.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 hover:text-blue-500 transition shadow-sm">
                <Share size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Bento Grid Gallery */}
        <div className="relative mb-10">
          {data.images.length === 1 && (
            <div className="h-[500px] rounded-3xl overflow-hidden shadow-md cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
              <img src={data.images[0]} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {data.images.length === 2 && (
            <div className="grid md:grid-cols-2 gap-3 h-[500px] rounded-3xl overflow-hidden shadow-md">
              {data.images.map((img, idx) => (
                <div key={idx} className="overflow-hidden cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                  <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                </div>
              ))}
            </div>
          )}

          {data.images.length === 3 && (
            <div className="grid md:grid-cols-3 gap-3 h-[500px] rounded-3xl overflow-hidden shadow-md">
              <div className="md:col-span-2 overflow-hidden cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                <img src={data.images[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
              </div>
              <div className="grid grid-rows-2 gap-3">
                {data.images.slice(1).map((img, idx) => (
                  <div key={idx} className="overflow-hidden cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.images.length >= 4 && (
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[500px] rounded-3xl overflow-hidden shadow-md">
              <div className="md:col-span-2 md:row-span-2 overflow-hidden cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                <img src={data.images[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
              </div>
              {data.images.slice(1, 5).map((img, idx) => {
                const isLast = idx === 3;
                const hasMore = data.images.length > 5;
                return (
                  <div key={idx} className="relative overflow-hidden cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                    <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                    {isLast && hasMore && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl font-bold">
                        +{data.images.length - 5}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {isGalleryOpen && (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 py-4 flex justify-between items-center border-b">
              <h3 className="font-bold text-xl">{data.name}</h3>
              <button onClick={() => setIsGalleryOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                <X size={24} />
              </button>
            </div>
            <div className="max-w-3xl mx-auto p-4 space-y-4">
              {data.images.map((img, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden bg-gray-100">
                  <img src={img} alt={`Full Gallery ${idx}`} className="w-full h-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.aboutProperty}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">{data.description}</p>
            </section>

            <hr className="border-gray-200" />

            {/* Info Box (Opening Hours) */}
            <section className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="mr-3 text-rose-500" /> {t.goodToKnow}
              </h2>
              <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center border border-rose-50">
                <div className="bg-rose-100 p-3 rounded-xl mr-4">
                  <Clock size={24} className="text-rose-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.openingHours}</p>
                  <p className="font-bold text-xl text-gray-900">{data.hours}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar (Map & Price) */}
          <aside className="relative">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-8">
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">{locale === 'th' ? 'ตำแหน่งที่ตั้ง' : 'Location'}</h3>
                  <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <MapComponent
                      lat={data.coords.lat}
                      lng={data.coords.lng}
                      name={data.name} 
                      mapLink={data.mapLink || ""} 
                      category="tourist" 
                      tags={data.tags}   
                    />                  
                  </div>
                </div>

                <hr className="border-gray-100 mb-6" />

                <div className="mb-6">
                  <p className="text-gray-500 font-medium mb-2">{t.startingPrice}</p>
                  <div className="text-gray-900 whitespace-pre-line leading-relaxed font-semibold text-base">
                    {data.priceRange}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function ChiangMaiDetailPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const id = params.id as string;

  const t = translations[locale] || translations['en'];
  
  // จุดแก้ไขที่ 1: ใส่เงื่อนไขหาคู่เช็ค id กับ slug จาก URL ให้ถูกต้อง
  const chiangMaiItem = ChiangMaiData.find((h) => h.id === id);

  if (!chiangMaiItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-8xl font-black text-gray-200 mb-4">{t.notFoundTitle}</h1>
          <p className="text-2xl text-gray-500 font-medium">{t.notFoundDesc}</p>
        </div>
      </div>
    );
  }

  const allImages = chiangMaiItem.detail_more?.img 
    ? [chiangMaiItem.detail_more.img, ...(chiangMaiItem.detail_more.gallery || [])]
    : (chiangMaiItem.detail_more?.gallery || []);

  const uiData: ChiangMaiUIData = {
    name: chiangMaiItem.title?.[locale] || chiangMaiItem.title?.['th'] || "",
    address: chiangMaiItem.detail_more?.location || "",
    images: allImages,
    description: chiangMaiItem.detail?.[locale] || chiangMaiItem.detail?.['th'] || "",
    starRating: 0,
    priceRange: chiangMaiItem.price?.[locale] || chiangMaiItem.price?.['th'] || "N/A",
    contact: { phone: '-', email: '-' },
    hours: chiangMaiItem.hours?.[locale] || chiangMaiItem.hours?.['th'] || "",
    tags: chiangMaiItem.tag?.[locale] ? [chiangMaiItem.tag[locale]] : [],
    amenities: [],
    coords: { 
      lat: chiangMaiItem.detail_more?.lat || 0, 
      lng: chiangMaiItem.detail_more?.lng || 0 
    },
    // รองรับ fallback เผื่อพิมพ์พิมพ์เล็ก-ใหญ่ผิดใน mock data (maplink / mapLink)
    mapLink: chiangMaiItem.detail_more?.maplink || "",
  };

  return <ChiangMaiDetailContent data={uiData} locale={locale} />;
}