import React from 'react';
import { notFound } from 'next/navigation';
import { connectDB } from "@/src/lib/mongodb";
import RestaurantModel from "@/models/Restaurant"; // ปรับ Path ให้ชี้มาที่ src ชัดเจนป้องกัน Path เพี้ยน
import RestaurantDetailClient from './RestaurantDetailClient';

type Locale = 'th' | 'en' | 'zh';

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export default async function RestaurantPage({ params }: PageProps) {
    // 1. ใน Next.js เวอร์ชันปัจจุบัน params จะเป็น Promise ต้องใช้ await ในการแกะค่าออกมาก่อน
    const resolvedParams = await params;
    const locale = (resolvedParams.locale as Locale) || 'th';
    const slug = resolvedParams.slug;

    // 2. เชื่อมต่อฐานข้อมูล MongoDB
    await connectDB();
    
    // 3. ค้นหาข้อมูลร้านด้วย slug ที่แกะค่าออกมาได้อย่างถูกต้อง
    const restaurantData = await RestaurantModel.findOne({ slug }).lean();

    // 4. ถ้าไม่พบข้อมูลใน Database เลย ให้ดีดไปหน้า 404
    if (!restaurantData) {
        notFound();
    }

    // 5. แปลง BSON Object ให้กลายเป็น Plain Object ที่ปลอดภัยต่อการส่งไปหน้าบ้าน
    const restaurant = JSON.parse(JSON.stringify(restaurantData));

    // 6. ส่งข้อมูลที่ดึงได้สดๆ ไปเรนเดอร์บน Client Component ชุดเดิมของคุณ
    return <RestaurantDetailClient restaurant={restaurant} locale={locale} />;
}