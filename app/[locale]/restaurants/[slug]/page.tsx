import React from 'react';
import { notFound } from 'next/navigation';
import { connectDB } from "@/src/lib/mongodb";
import RestaurantModel from "@/models/Restaurant"; 
import ReviewModel from "@/models/Review"; // 👈 นำเข้า Review Model เพื่อไปควานหารีวิว
import RestaurantDetailClient from './RestaurantDetailClient';

type Locale = 'th' | 'en' | 'zh';

interface PageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export default async function RestaurantPage({ params }: PageProps) {
    const resolvedParams = await params;
    const locale = (resolvedParams.locale as Locale) || 'th';
    const slug = resolvedParams.slug;

    await connectDB();
    
    const restaurantData = await RestaurantModel.findOne({ slug }).lean();

    if (!restaurantData) {
        notFound();
    }

    // 👈 ดึงประวัติรีวิวที่มีอยู่ทั้งหมดของร้านนี้มาจัดเตรียมไว้ส่งต่อ
    const reviewDataList = await ReviewModel.find({ 
        targetId: restaurantData.id, 
        targetType: "restaurant" 
    })
    .sort({ createdAt: -1 })
    .lean();

    const restaurant = JSON.parse(JSON.stringify(restaurantData));
    const initialReviews = JSON.parse(JSON.stringify(reviewDataList)); // แปลงให้อยู่ในรูป Object ทั่วไป

    // 👈 แนบ initialReviews ส่งตามไปด้วยแล้ว
    return (
        <RestaurantDetailClient 
            restaurant={restaurant} 
            initialReviews={initialReviews} 
            locale={locale} 
        />
    );
}