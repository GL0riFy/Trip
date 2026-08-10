// src/services/databaseTools.ts
import ProductModel from "@/models/Products";
import TouristModel from "@/models/Tourist";
import RestaurantModel from "@/models/Restaurant";
import HotelModel from "@/models/Hotels";

// 🔗 Base URL ของเว็บไซต์ (สำหรับสร้างลิงก์ไปหน้ารายละเอียดจริงบนเว็บ ไม่ใช่ Google Maps)
const SITE_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://trip-eta-nine.vercel.app";

function buildWebsiteUrl(section: string, slug?: string, locale: string = "en") {
  if (!slug) return null;
  return `${SITE_BASE_URL}/${locale}/${section}/${slug}`;
}

// สินค้า OTOP ไม่มีหน้าแยกของตัวเอง แต่เปิดเป็น Modal บนหน้า /products
// พร้อม query param ?item=slug ที่ page.tsx อ่านค่าแล้วเปิด Modal ให้อัตโนมัติ
function buildProductWebsiteUrl(slug?: string, locale: string = "en") {
  if (!slug) return null;
  return `${SITE_BASE_URL}/${locale}/products?item=${slug}`;
}

// 📍 1. ฟังก์ชันช่วยจับคู่คีย์เวิร์ดเป็นพิกัดโซนยอดฮิต
function getCoordinatesFromKeyword(keyword: string): { lat: number; lng: number; radius: number } | null {
  if (!keyword) return null;
  const kw = keyword.trim();
  if (kw.includes("คูเมือง") || kw.includes("เมืองเก่า") || kw.includes("ในเมือง")) {
    return { lat: 18.7883, lng: 98.9853, radius: 1.5 }; // ขยายรัศมีเป็น 1.5 กม. เพื่อความชัวร์ให้คลุมร้านเฮือนเพ็ญรอบทิศ
  }
  if (kw.includes("นิมมาน")) {
    return { lat: 18.7996, lng: 98.9680, radius: 1.0 };
  }
  if (kw.includes("ท่าแพ")) {
    return { lat: 18.7878, lng: 99.0003, radius: 1.0 };
  }
  if (kw.includes("สันติธรรม")) {
    return { lat: 18.8021, lng: 98.9784, radius: 1.0 };
  }
  return null;
}

// 🧮 2. สูตร Haversine คำนวณรัศมีระยะทาง
function filterByRadius(dataList: any[], centerLat: number, centerLng: number, maxRadiusKm: number) {
  return dataList.filter((item) => {
    if (!item.coords || typeof item.coords.lat !== "number" || typeof item.coords.lng !== "number") {
      return false;
    }
    const R = 6371;
    const dLat = ((item.coords.lat - centerLat) * Math.PI) / 180;
    const dLng = ((item.coords.lng - centerLng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((centerLat * Math.PI) / 180) *
        Math.cos((item.coords.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c <= maxRadiusKm;
  });
}

// 🛍️ ค้นหาสินค้า
export async function searchProducts(args: { keyword: string }) {
  const searchWord = args?.keyword || "";
  const data = await ProductModel.find({
    $or: [
      { "locales.th.name": { $regex: searchWord, $options: "i" } },
      { "locales.th.description": { $regex: searchWord, $options: "i" } }
    ]
  }).select("locales.th.name price locales.th.description locales.th.shopName slug").limit(3).lean();

  const withLinks = data.map((item: any) => ({
    ...item,
    websiteUrl: buildProductWebsiteUrl(item.slug),
  }));
  return JSON.stringify(withLinks);
}

// 🗺️ ค้นหาที่เที่ยว (รองรับทั้งโซนพิกัด และ เสิร์ชข้อความอำเภอรอบนอกแบบปลอดภัย)
export async function searchTouristPlaces(args: { locationKeyword: string; tag?: string }) {
  const searchWord = args?.locationKeyword || "";
  const zone = getCoordinatesFromKeyword(searchWord);

  let query: any = {};
  if (args?.tag) query["locales.th.tag"] = { $regex: args.tag, $options: "i" };

  const attachWebsiteUrl = (items: any[]) =>
    items.map((item) => ({ ...item, websiteUrl: buildWebsiteUrl("tourist", item.slug) }));

  if (zone) {
    // โซนยอดฮิตในเมือง (คูเมือง/นิมมาน) ใช้พิกัดในการสแกน
    const rawData = await TouristModel.find(query)
      .select("locales.th.name locales.th.desc locales.th.location locales.th.hours coords slug")
      .lean();
    const filtered = filterByRadius(rawData, zone.lat, zone.lng, zone.radius);
    return JSON.stringify(attachWebsiteUrl(filtered.slice(0, 4)));
  } else {
    // อำเภอรอบนอก (ดอยสะเก็ด/แม่ริม) ค้นหาด้วยชื่ออำเภอผ่านตัวหนังสือ ปลอดภัย ไม่ล่มชัวร์
    query["$or"] = [
      { "locales.th.location": { $regex: searchWord, $options: "i" } },
      { "locales.th.name": { $regex: searchWord, $options: "i" } },
      { "locales.th.desc": { $regex: searchWord, $options: "i" } }
    ];
    const data = await TouristModel.find(query)
      .select("locales.th.name locales.th.desc locales.th.location locales.th.hours coords slug")
      .limit(4)
      .lean();
    return JSON.stringify(attachWebsiteUrl(data));
  }
}

// 🍽️ ค้นหาร้านอาหาร (แก้ปัญหาแท็กหลุด + เพิ่มความปลอดภัยให้คำค้นหาทั่วไป)
export async function searchRestaurants(args: { locationKeyword: string; foodTag?: string }) {
  const searchWord = args?.locationKeyword || "";
  const zone = getCoordinatesFromKeyword(searchWord);

  let query: any = {};
  // เอาเงื่อนไขดักบีบแท็กออกชั่วคราว เพื่อป้องกันกรณีข้อมูลไม่มีแท็กแล้วเสิร์ชไม่เจอร้านอาหาร
  // แต่ถ้าต้องการใช้ ให้สแกนแบบกว้างๆ แทนครับ

  const attachWebsiteUrl = (items: any[]) =>
    items.map((item) => ({ ...item, websiteUrl: buildWebsiteUrl("restaurants", item.slug) }));

  if (zone) {
    // โซนคูเมือง/นิมมาน: กวาดร้านอาหารมาคำนวณรัศมี (เฮือนเพ็ญจะผ่านตรงนี้ฉลุย)
    const rawData = await RestaurantModel.find(query)
      .select("locales.th.name locales.th.desc locales.th.location openHours coords slug")
      .lean();
    const filtered = filterByRadius(rawData, zone.lat, zone.lng, zone.radius);
    return JSON.stringify(attachWebsiteUrl(filtered.slice(0, 4)));
  } else {
    // อำเภอรอบนอก: ค้นหาข้อความแบบยืดหยุ่น ป้องกันแอปค้าง
    query["$or"] = [
      { "locales.th.location": { $regex: searchWord, $options: "i" } },
      { "locales.th.name": { $regex: searchWord, $options: "i" } }
    ];
    const data = await RestaurantModel.find(query)
      .select("locales.th.name locales.th.desc locales.th.location openHours coords slug")
      .limit(4)
      .lean();
    return JSON.stringify(attachWebsiteUrl(data));
  }
}

// 🏨 ค้นหาโรงแรม/ที่พัก
// หมายเหตุ: ไม่บังคับให้ต้องอยู่ในโซนยอดฮิต (คูเมือง/นิมมาน/ท่าแพ/สันติธรรม) เท่านั้น
// - ถ้าคำค้นหาตรงกับโซนที่รู้จัก -> ใช้พิกัด + รัศมีกรองแบบเดิม
// - ถ้าคำค้นหาไม่ตรงกับโซนที่รู้จัก -> ค้นหาแบบข้อความกว้างๆ ในชื่อ/ทำเล/แท็ก (ครอบคลุมทุกอำเภอ)
// - ถ้าไม่มีคำค้นหาเลย (ผู้ใช้ถามกว้างๆ ว่ามีโรงแรมอะไรแนะนำบ้าง) -> ดึงโรงแรมเรตติ้งดี/แนะนำมาก่อน
// เลือกเฉพาะฟิลด์ราคาที่ "จำเป็น" (minPrice = ราคาเริ่มต้นต่อคืน) ไม่ดึงราคาทุกประเภทห้องมา
// เพื่อให้ AI ตอบแบบสรุปสั้นๆ ตามที่ระบุใน system prompt (route.ts)
const HOTEL_SELECT_FIELDS =
  "locales.th.name locales.th.desc locales.th.location minPrice priceRange starRating averageRating type coords slug";

export async function searchHotels(args: { locationKeyword?: string; type?: string }) {
  const searchWord = args?.locationKeyword?.trim() || "";
  const zone = searchWord ? getCoordinatesFromKeyword(searchWord) : null;

  let query: any = {};
  // type: 'city' | 'hotel' | 'nature' | 'riverside' — ให้ผู้ใช้กรองประเภทที่พักได้ด้วย ถ้าโมเดลส่งมา
  if (args?.type) {
    query.type = args.type;
  }

  // ใส่ลิงก์ไปหน้ารายละเอียดโรงแรมบนเว็บเรา (จาก slug) ให้ทุกรายการ
  const attachWebsiteUrl = (items: any[]) =>
    items.map((item) => ({
      ...item,
      websiteUrl: buildWebsiteUrl("hotels", item.slug),
    }));

  if (zone) {
    // โซนยอดฮิตที่รู้จักพิกัดแน่นอน -> กรองด้วยรัศมี
    const rawData = await HotelModel.find(query).select(HOTEL_SELECT_FIELDS).lean();
    const filtered = filterByRadius(rawData, zone.lat, zone.lng, zone.radius);
    return JSON.stringify(attachWebsiteUrl(filtered.slice(0, 4)));
  }

  if (searchWord) {
    // โซน/พื้นที่อื่นๆ ที่ไม่ได้ล็อกไว้ล่วงหน้า -> ค้นหาแบบข้อความทั่วไป ไม่จำกัดว่าต้องอยู่ในโซนยอดฮิตเท่านั้น
    query["$or"] = [
      { "locales.th.location": { $regex: searchWord, $options: "i" } },
      { "locales.th.name": { $regex: searchWord, $options: "i" } },
      { "locales.th.tags": { $regex: searchWord, $options: "i" } }
    ];
  }

  // ไม่มีคำค้นหา หรือค้นหาแบบข้อความทั่วไป -> เรียงตามคะแนนรีวิว/แนะนำก่อน
  const data = await HotelModel.find(query)
    .sort({ isFeatured: -1, averageRating: -1 })
    .select(HOTEL_SELECT_FIELDS)
    .limit(4)
    .lean();
  return JSON.stringify(attachWebsiteUrl(data));
}

export const dbRegistry: Record<string, Function> = {
  searchProducts,
  searchTouristPlaces,
  searchRestaurants,
  searchHotels,
};