import React from 'react';
import mongoose from 'mongoose';
import HotelModel from '@/models/Hotels'; // ตรวจสอบ Path ให้ตรงกับที่คุณเซฟไฟล์ในขั้นตอนที่ 1
import HotelDetailClient from './HotelDetailClient';

type Locale = 'th' | 'en' | 'zh';

interface Props {
  params: {
    locale: Locale;
    slug: string;
  };
}

async function connectDB() {
  // หากเชื่อมต่ออยู่แล้ว ให้ผ่านไปได้เลย
  if (mongoose.connection.readyState >= 1) return;
  
  // ตรวจสอบตัวแปร Environment และใส่ fallback เป็น URI ของคุณ
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ชื่อเดตาเบสของคุณ";
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected Successfully for Slug Page");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}

export default async function HotelDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  // 1. รอการเชื่อมต่อฐานข้อมูลให้เสร็จสิ้น
  await connectDB();
  
  // 2. ค้นหาโรงแรมด้วย slug พร้อมใช้ .lean() เพื่อแปลงเป็น Plain JSON Object ทันที
  const hotel = await HotelModel.findOne({ slug }).lean();

  // 3. หากคิวรีแล้วไม่เจอข้อมูล ให้แสดงหน้า 404 ป้องกันหน้าขาว
  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-8xl font-black text-gray-200 mb-4">404</h1>
          <p className="text-2xl text-gray-500 font-medium">
            {locale === 'th' ? 'ไม่พบข้อมูลที่พักที่คุณต้องการในระบบ' : 'Property not found'}
          </p>
          <p className="text-sm text-gray-400 mt-2">Slug: {slug}</p>
        </div>
      </div>
    );
  }

  // 4. ดึงข้อมูลภาษาปัจจุบัน (Fallback ไปที่ th หากไม่มีภาษาที่เลือก)
  const currentLocaleData = hotel.locales?.[locale] || hotel.locales?.['th'];

  if (!currentLocaleData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-red-500 font-medium">Data Localization Error</p>
        </div>
      </div>
    );
  }

  // 5. จัดรูปแบบก้อน Data ให้เข้ากับโครงสร้างที่หน้า UI รอรับไป Render
  const uiData = {
    id: hotel.id,
    _id: String(hotel._id),
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
    bookingPlatforms: hotel.booking || [],
    coords: hotel.coords || { lat: 0, lng: 0 },
    mapLink: hotel.mapLink,
  };

  return <HotelDetailClient data={uiData} locale={locale} />;
}