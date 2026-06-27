export interface SmartContext {
  contextText: string;
  hasData: boolean;
  matchedTypes: string[];
}

// 1. เปลี่ยนฟังก์ชันเป็น async เนื่องจากต้องรอข้อมูลจาก API (MongoDB)
export async function buildSmartContext(message: string): Promise<SmartContext> {
  const keyword = encodeURIComponent(message.trim());
  
  // กำหนด Base URL ของ API (ปรับให้ตรงกับ Environment ของคุณ)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  try {
    // 2. ยิง API พร้อมกันทุก Endpoint เพื่อความรวดเร็วด้วย Promise.all
    const [placesRes, restaurantsRes, hotelsRes, productsRes] = await Promise.all([
      fetch(`${baseUrl}/api/tourists?keyword=${keyword}`).then((res) => res.json()).catch(() => []),
      fetch(`${baseUrl}/api/restaurants?keyword=${keyword}`).then((res) => res.json()).catch(() => []),
      fetch(`${baseUrl}/api/hotels?keyword=${keyword}`).then((res) => res.json()).catch(() => []),
      fetch(`${baseUrl}/api/products?keyword=${keyword}`).then((res) => res.json()).catch(() => []),
    ]);

    // หมายเหตุ: ปรับ slice(0, 5) ที่ฝั่ง MongoDB Backend จะดีที่สุดเพื่อลดขนาด Data
    const matchedPlaces = placesRes.slice(0, 5);
    const matchedRestaurants = restaurantsRes.slice(0, 5);
    const matchedHotels = hotelsRes.slice(0, 5);
    const matchedProducts = productsRes.slice(0, 5);

    // 3. ติดตามประเภทที่แมตช์ข้อมูลเจอ
    const matchedTypes: string[] = [];
    if (matchedPlaces.length > 0) matchedTypes.push("places");
    if (matchedRestaurants.length > 0) matchedTypes.push("restaurants");
    if (matchedHotels.length > 0) matchedTypes.push("hotels");
    if (matchedProducts.length > 0) matchedTypes.push("products");

    const hasData = matchedTypes.length > 0;

    // 4. สร้าง Context Text ในรูปแบบเดิม
    const placeText = matchedPlaces
      .map(
        (item: any) => `
[Place]
Name: ${item.title?.th}
Description: ${item.detail?.th}
Location: ${item.detail_more?.location ?? ""}
InternalLink: /places/${item.id ?? item._id}
`
      )
      .join("\n");

    const restaurantText = matchedRestaurants
      .map(
        (item: any) => `
[Restaurant]
Name: ${item.locales?.th?.name ?? item.name}
Description: ${item.locales?.th?.desc ?? item.desc}
Location: ${item.locales?.th?.location ?? item.location ?? ""}
InternalLink: /restaurants/${item.slug ?? item.id ?? item._id}
`
      )
      .join("\n");

    const hotelText = matchedHotels
      .map(
        (item: any) => `
[Hotel]
Name: ${item.locales?.th?.name ?? item.name}
Description: ${item.locales?.th?.desc ?? item.desc}
Location: ${item.locales?.th?.location ?? item.location ?? ""}
InternalLink: /hotels/${item.slug ?? item.id ?? item._id}
`
      )
      .join("\n");

    const productText = matchedProducts
      .map(
        (item: any) => `
[Product]
Name: ${item.nameTH ?? item.name}
Description: ${item.descriptionTH ?? item.description}
InternalLink: /products/${item.id ?? item._id}
`
      )
      .join("\n");

    const contextText = `
${placeText}
${restaurantText}
${hotelText}
${productText}
`.trim();

    return { contextText, hasData, matchedTypes };

  } catch (error) {
    console.error("Error building smart context from MongoDB API:", error);
    return { contextText: "", hasData: false, matchedTypes: [] };
  }
}