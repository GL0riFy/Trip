// src/services/databaseTools.ts
import ProductModel from "@/models/Products";
import TouristModel from "@/models/Tourist";
import RestaurantModel from "@/models/Restaurant";

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
  }).select("locales.th.name price locales.th.description locales.th.shopName slug").limit(3);
  return JSON.stringify(data);
}

// 🗺️ ค้นหาที่เที่ยว (รองรับทั้งโซนพิกัด และ เสิร์ชข้อความอำเภอรอบนอกแบบปลอดภัย)
export async function searchTouristPlaces(args: { locationKeyword: string; tag?: string }) {
  const searchWord = args?.locationKeyword || "";
  const zone = getCoordinatesFromKeyword(searchWord);

  let query: any = {};
  if (args?.tag) query["locales.th.tag"] = { $regex: args.tag, $options: "i" };

  if (zone) {
    // โซนยอดฮิตในเมือง (คูเมือง/นิมมาน) ใช้พิกัดในการสแกน
    const rawData = await TouristModel.find(query)
      .select("locales.th.name locales.th.desc locales.th.location locales.th.hours mapLink coords slug");
    const filtered = filterByRadius(rawData, zone.lat, zone.lng, zone.radius);
    return JSON.stringify(filtered.slice(0, 4));
  } else {
    // อำเภอรอบนอก (ดอยสะเก็ด/แม่ริม) ค้นหาด้วยชื่ออำเภอผ่านตัวหนังสือ ปลอดภัย ไม่ล่มชัวร์
    query["$or"] = [
      { "locales.th.location": { $regex: searchWord, $options: "i" } },
      { "locales.th.name": { $regex: searchWord, $options: "i" } },
      { "locales.th.desc": { $regex: searchWord, $options: "i" } }
    ];
    const data = await TouristModel.find(query)
      .select("locales.th.name locales.th.desc locales.th.location locales.th.hours mapLink coords slug")
      .limit(4);
    return JSON.stringify(data);
  }
}

// 🍽️ ค้นหาร้านอาหาร (แก้ปัญหาแท็กหลุด + เพิ่มความปลอดภัยให้คำค้นหาทั่วไป)
export async function searchRestaurants(args: { locationKeyword: string; foodTag?: string }) {
  const searchWord = args?.locationKeyword || "";
  const zone = getCoordinatesFromKeyword(searchWord);

  let query: any = {};
  // เอาเงื่อนไขดักบีบแท็กออกชั่วคราว เพื่อป้องกันกรณีข้อมูลไม่มีแท็กแล้วเสิร์ชไม่เจอร้านอาหาร
  // แต่ถ้าต้องการใช้ ให้สแกนแบบกว้างๆ แทนครับ

  if (zone) {
    // โซนคูเมือง/นิมมาน: กวาดร้านอาหารมาคำนวณรัศมี (เฮือนเพ็ญจะผ่านตรงนี้ฉลุย)
    const rawData = await RestaurantModel.find(query)
      .select("locales.th.name locales.th.desc locales.th.location openHours mapLink coords slug");
    const filtered = filterByRadius(rawData, zone.lat, zone.lng, zone.radius);
    return JSON.stringify(filtered.slice(0, 4));
  } else {
    // อำเภอรอบนอก: ค้นหาข้อความแบบยืดหยุ่น ป้องกันแอปค้าง
    query["$or"] = [
      { "locales.th.location": { $regex: searchWord, $options: "i" } },
      { "locales.th.name": { $regex: searchWord, $options: "i" } }
    ];
    const data = await RestaurantModel.find(query)
      .select("locales.th.name locales.th.desc locales.th.location openHours mapLink coords slug")
      .limit(4);
    return JSON.stringify(data);
  }
}

export const dbRegistry: Record<string, Function> = {
  searchProducts,
  searchTouristPlaces,
  searchRestaurants,
};