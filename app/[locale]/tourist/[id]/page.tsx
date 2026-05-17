"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  MapPin, Clock, Star, Phone, Mail, MessageCircle, 
  Info, CheckCircle, Share, Heart, X, ChevronRight
} from 'lucide-react';
import { HotelData } from '@/src/data/hotels'; // ปรับพาธให้ตรงกับโปรเจกต์ของคุณ
import MapComponent from './MapComponent';

// --- Interfaces ---
export interface RoomType {
  name: string;
  size: string;
  view: string;
  description: string;
  maxGuests: number;
}

export interface HotelUIData {
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
    lineId?: string;
  };
  checkIn: string;
  checkOut: string;
  policies: string[];
  tags: string[];
  bookingLinks?: {
    agoda?: string;
    booking?: string;
    trip?: string;
  };
  bookingPlatforms?: Array<{
    platform: string;
    link: string;
  }>;
  coords: {
    lat: number;
    lng: number;
  };
  mapLink?: string;
}

type Locale = 'th' | 'en' | 'zh';

// --- Translations Dictionary ---
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
    notFoundTitle: "404",
    notFoundDesc: "ไม่พบข้อมูลที่พักที่คุณต้องการ",
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
    notFoundTitle: "404",
    notFoundDesc: "Property not found",
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
    notFoundTitle: "404",
    notFoundDesc: "未找到您需要的住宿信息",
  }
};

const getBookingPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "agoda":
      return (
        <img
          src="https://cdn.brandfetch.io/idrJbkwvG0/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1724730098837"
          alt="Agoda"
          className="w-6 h-6 rounded-md object-cover"
        />
      );

    case "booking":
      return (
        <img
          src="https://cdn.brandfetch.io/id9mEmLNcV/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1725855381233"
          alt="Booking.com"
          className="w-6 h-6 rounded-md object-cover"
        />
      );

    case "trip":
    case "trip.com":
      return (
        <img
          src="https://cdn.brandfetch.io/id84Kz4mXP/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1667617798753"
          alt="Trip.com"
          className="w-6 h-6 rounded-md object-cover"
        />
      );

    default:
      return null;
  }
};

// --- Component ย่อยสำหรับแสดงผล ---
const getBookingPlatformStyle = (platform: string) => {
  const platformLower = platform.toLowerCase();
  
  if (platformLower.includes('agoda')) {
    return { bgHover: 'hover:bg-emerald-50', border: 'hover:border-emerald-200', text: 'group-hover:text-emerald-700', accent: 'text-emerald-600' };
  } else if (platformLower.includes('booking')) {
    return { bgHover: 'hover:bg-blue-50', border: 'hover:border-blue-200', text: 'group-hover:text-blue-700', accent: 'text-blue-600' };
  } else if (platformLower.includes('trip')) {
    return { bgHover: 'hover:bg-orange-50', border: 'hover:border-orange-200', text: 'group-hover:text-orange-700', accent: 'text-orange-600' };
  }
  return { bgHover: 'hover:bg-gray-100', border: 'hover:border-gray-300', text: 'group-hover:text-gray-700', accent: 'text-gray-600' };
};

const HotelDetailContent: React.FC<{ data: HotelUIData, locale: Locale }> = ({ data, locale }) => {
  // ดึงข้อความตามภาษาที่เลือก (ถ้าไม่มีให้ใช้ th เป็นค่าเริ่มต้น)
  const t = translations[locale] || translations['en'];

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // สร้าง Array รูปภาพให้ครบ 5 รูปสำหรับ Bento Grid
  const displayImages = data.images.length >= 5 
    ? data.images.slice(0, 5) 
    : [...data.images, ...Array(5 - data.images.length).fill(data.images[0])];

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* 1. Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center text-yellow-400 bg-yellow-50 px-2 py-1 rounded-lg">
                {[...Array(data.starRating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              {data.tags && data.tags.slice(0, 2).map((tag, idx) => (
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

          {/* 1 IMAGE */}
          {data.images.length === 1 && (
            <div
              className="h-[500px] rounded-3xl overflow-hidden"
              onClick={() => setIsGalleryOpen(true)}
            >
              <img
                src={data.images[0]}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* 2 IMAGES */}
          {data.images.length === 2 && (
            <div className="grid md:grid-cols-2 gap-3 h-[500px] rounded-3xl overflow-hidden">
              {data.images.map((img, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden cursor-pointer"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition duration-700"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 3 IMAGES */}
          {data.images.length === 3 && (
            <div className="grid md:grid-cols-3 gap-3 h-[500px] rounded-3xl overflow-hidden">

              {/* Left Large */}
              <div
                className="md:col-span-2 overflow-hidden cursor-pointer"
                onClick={() => setIsGalleryOpen(true)}
              >
                <img
                  src={data.images[0]}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>

              {/* Right Stack */}
              <div className="grid grid-rows-2 gap-3">
                {data.images.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden cursor-pointer"
                    onClick={() => setIsGalleryOpen(true)}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4+ IMAGES */}
          {data.images.length >= 4 && (
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[500px] rounded-3xl overflow-hidden">

              {/* Main */}
              <div
                className="md:col-span-2 md:row-span-2 overflow-hidden cursor-pointer"
                onClick={() => setIsGalleryOpen(true)}
              >
                <img
                  src={data.images[0]}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>

              {/* Others */}
              {data.images.slice(1, 5).map((img, idx) => {
                const isLast = idx === 3;
                const hasMore = data.images.length > 5;

                return (
                  <div
                    key={idx}
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => setIsGalleryOpen(true)}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 transition duration-700"
                    />

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
              <button 
                onClick={() => setIsGalleryOpen(false)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="max-w-3xl mx-auto p-4 space-y-4">
              {data.images.map((img, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden bg-gray-100">
                  <img 
                    src={img} 
                    alt={`Full Gallery ${idx}`} 
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.aboutProperty}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                {data.description}
              </p>
            </section>

            <hr className="border-gray-200" />

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.popularAmenities}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                {data.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center text-gray-700">
                    <CheckCircle size={20} className="text-emerald-500 mr-3 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* Policies */}
            <section className="bg-rose-50/50 border border-rose-100 rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Info className="mr-3 text-rose-500" /> {t.goodToKnow}
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center border border-rose-50">
                  <div className="bg-rose-100 p-3 rounded-xl mr-4">
                    <Clock size={24} className="text-rose-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.checkInFrom}</p>
                    <p className="font-bold text-xl text-gray-900">{data.checkIn}</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center border border-rose-50">
                  <div className="bg-rose-100 p-3 rounded-xl mr-4">
                    <Clock size={24} className="text-rose-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.checkOutUntil}</p>
                    <p className="font-bold text-xl text-gray-900">{data.checkOut}</p>
                  </div>
                </div>
              </div>

              {data.policies && data.policies.length > 0 && (
                <ul className="space-y-3">
                  {data.policies.map((policy, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 mr-3 shrink-0"></div>
                      <span className="leading-relaxed">{policy}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* 3. Sticky Sidebar */}
          <aside className="relative">
            <div className="sticky top-8 space-y-6">
              
              {/* Booking Card */}
              <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-8">
              {/* Map */}
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">
                    {locale === 'th' ? 'ตำแหน่งที่ตั้ง' : 'Location'}
                  </h3>

                  <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <MapComponent
                      lat={data.coords.lat}
                      lng={data.coords.lng}
                      name={data.name}
                      mapLink={data.mapLink || ''}
                    />
                  </div>
                </div>

                <hr className="border-gray-100 mb-6" />

                <div className="mb-6">
                  <p className="text-gray-500 font-medium mb-2">{t.startingPrice}</p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-4xl font-extrabold text-gray-900">{data.priceRange}</h2>
                    <span className="text-gray-500">{t.perNight}</span>
                  </div>
                </div>

                <hr className="border-gray-100 mb-6" />

                {/* Contact Info */}
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">{t.contactDirectly}</h3>

                  <div className="space-y-4">
                    <a
                      href={`tel:${data.contact.phone}`}
                      className="flex items-center text-gray-600 hover:text-emerald-600 transition group"
                    >
                      <div className="bg-gray-50 group-hover:bg-emerald-50 p-2 rounded-lg mr-3 transition">
                        <Phone size={18} />
                      </div>
                      <span className="font-medium">{data.contact.phone}</span>
                    </a>

                    <a
                      href={`mailto:${data.contact.email}`}
                      className="flex items-center text-gray-600 hover:text-emerald-600 transition group"
                    >
                      <div className="bg-gray-50 group-hover:bg-emerald-50 p-2 rounded-lg mr-3 transition">
                        <Mail size={18} />
                      </div>
                      <span className="font-medium">{data.contact.email}</span>
                    </a>

                    {data.contact.lineId && (
                      <div className="flex items-center text-gray-600 hover:text-[#00B900] transition group cursor-pointer">
                        <div className="bg-gray-50 group-hover:bg-[#00B900]/10 p-2 rounded-lg mr-3 transition">
                          <MessageCircle size={18} />
                        </div>
                        <span className="font-medium">
                          LINE: {data.contact.lineId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Platforms */}
                {data.bookingPlatforms && data.bookingPlatforms.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-bold text-gray-900 mb-4">
                      {locale === 'th' ? 'จองผ่านแพลตฟอร์ม' : 'Booking Platforms'}
                    </h3>

                    <div className="space-y-3">
                      {data.bookingPlatforms.map((booking, idx) => {
                        const style = getBookingPlatformStyle(booking.platform);

                        return (
                          <a
                            key={idx}
                            href={booking.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-between bg-gray-50 ${style.bgHover} border border-gray-100 ${style.border} rounded-2xl px-4 py-3 transition group`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`${style.text}`}>
                                {getBookingPlatformIcon(booking.platform)}
                              </div>

                              <span className={`font-semibold text-gray-800 ${style.text}`}>
                                {booking.platform}
                              </span>
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
};

// --- Main Page Component ---
export default function HotelDetailPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'th';
  const slug = params.slug;

  const t = translations[locale] || translations['th'];
  const hotel = HotelData.find((h) => h.slug === slug);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-8xl font-black text-gray-200 mb-4">{t.notFoundTitle}</h1>
          <p className="text-2xl text-gray-500 font-medium">{t.notFoundDesc}</p>
        </div>
      </div>
    );
  }

  const currentLocaleData = hotel.locales[locale] || hotel.locales['th'];

  const uiData: HotelUIData = {
    name: currentLocaleData.name,
    address: currentLocaleData.address || currentLocaleData.location,
    images: hotel.gallery && hotel.gallery.length > 0 ? hotel.gallery : [hotel.image],
    description: currentLocaleData.desc,
    starRating: hotel.starRating || 0,
    priceRange: hotel.priceRange || "N/A",
    contact: hotel.contact || { phone: '-', email: '-' },
    checkIn: hotel.checkIn || "14:00",
    checkOut: hotel.checkOut || "12:00",
    policies: currentLocaleData.policies || [],
    tags: currentLocaleData.tags || [],
    amenities: [...(currentLocaleData.amenities || []), currentLocaleData.service].filter(Boolean),
    bookingLinks: hotel.booking ? {
      agoda: hotel.booking.find(b => b.platform.toLowerCase().includes('agoda'))?.link,
      booking: hotel.booking.find(b => b.platform.toLowerCase().includes('booking'))?.link,
      trip: hotel.booking.find(b => b.platform.toLowerCase().includes('trip'))?.link,
    } : undefined,
    bookingPlatforms: hotel.booking || [],
    coords: hotel.coords || { lat: 0, lng: 0 },
    mapLink: hotel.mapLink,
  };

  return <HotelDetailContent data={uiData} locale={locale} />;
}