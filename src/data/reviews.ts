export interface Review {
    id: number;
    image: string;
}

// 1. ข้อมูล Mock Data จำลองที่ละเอียดขึ้นและเพิ่มรูปภาพ (ปรับความสูงจำลองเพื่อให้เห็นเอฟเฟกต์ Masonry ชัดเจนขึ้น)
export const reviewsData: Review[] = [
    {
        id: 1,
        image: "/review/1.jpg", // ภาพจริงคนถือแผ่นทอง
    },
    {
        id: 2,
        image: "/review/2.jpg", // ภาพจำลอง 2 คนถือซอง
    },
    {
        id: 3,
        image: "/review/3.jpg", // ภาพจำลอง 2 คนถือกระดาษ
    },
    {
        id: 4,
        image: "/review/4.jpg", // ภาพจำลอง การจัดแสดง
    },
    {
        id: 5,
        image: "/review/5.jpg", // ภาพจำลอง 3 คนถือซอง
    },
    {
        id: 6,
        image: "/review/6.jpg", // ภาพจำลอง การจัดแสดง
    },
    {
        id: 7,
        image: "/review/7.jpg", // ภาพจำลอง หมีพูห์
    },
    {
        id: 8,
        image: "/review/8.jpg", // ภาพจำลอง การจัดแสดง
    },
    // เพิ่มรูปภาพอีก 4 รายการ (9-12) เพื่อเติมเต็มช่อง Masonry
    {
        id: 9,
        image: "/review/9.jpg", // ภาพจำลองUnsplash
    },
    {
        id: 10,
        image: "/review/10.jpg", // ภาพจำลองUnsplash
    },
    {
        id: 11,
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200&q=80", // ภาพจำลองUnsplash
    },
    {
        id: 12,
        image: "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1100&q=80", // ภาพจำลองUnsplash
    }
];
