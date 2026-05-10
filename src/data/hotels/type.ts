export type Hotel = {
    id: string;
    slug: string;
    type: 'city' | 'hotel' | 'nature' | 'riverside';
    starRating: number; // เพิ่มระดับดาว
    image: string;
    gallery: string[]; // เพิ่มรูปภาพประกอบ
    coords: {
        lat: number;
        lng: number;
    };
    mapLink: string;
    priceRange: string; 
    minPrice: number;
    isFeatured: boolean;
    
    // ข้อมูลติดต่อ
    contact: {
        phone: string;
        email: string;
        lineId?: string;
    };

    booking?: {
        platform: string;
        link: string;
    }[];

    // ข้อมูลเวลา
    checkIn: string;
    checkOut: string;

    locales: {
        [key: string]: {
            name: string;
            location: string;
            address: string; // เพิ่มที่อยู่เต็ม
            desc: string;
            roomStyle: string;
            service: string;
            amenities: string[];
            policies?: string[]; // เพิ่มนโยบาย
            tags?: string[]; // เพิ่ม Tag สำหรับ Search
        }
    }
};