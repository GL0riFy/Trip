import { restaurantData } from "@/src/data/restaurants/food_data";
import { HotelData } from "@/src/data/hotels";
import { ChiangMaiData } from "@/src/data/chiangmai";
import { products } from "@/src/data/products";

export interface SmartContext {
  contextText: string;
  hasData: boolean;
  matchedTypes: string[];
}

export function buildSmartContext(message: string): SmartContext {
  const keyword = message.toLowerCase();

  // Places
  const matchedPlaces = ChiangMaiData.filter((item) => {
    return (
      item.title?.th?.toLowerCase().includes(keyword) ||
      item.detail?.th?.toLowerCase().includes(keyword) ||
      item.tag?.th?.toLowerCase().includes(keyword)
    );
  }).slice(0, 5);

  // Restaurants
  const matchedRestaurants = restaurantData.filter((item) => {
    return (
      item.locales.th.name.toLowerCase().includes(keyword) ||
      item.locales.th.desc.toLowerCase().includes(keyword) ||
      item.locales.th.tags.join(" ").toLowerCase().includes(keyword)
    );
  }).slice(0, 5);

  // Hotels
  const matchedHotels = HotelData.filter((item) => {
    return (
      item.locales.th.name.toLowerCase().includes(keyword) ||
      item.locales.th.desc.toLowerCase().includes(keyword) ||
      item.locales.th.tags?.join(" ").toLowerCase().includes(keyword)
    );
  }).slice(0, 5);

  // Products
  const matchedProducts = products.filter((item) => {
    return (
      item.nameTH.toLowerCase().includes(keyword) ||
      item.descriptionTH.toLowerCase().includes(keyword)
    );
  }).slice(0, 5);

  // Track what matched
  const matchedTypes: string[] = [];
  if (matchedPlaces.length > 0) matchedTypes.push("places");
  if (matchedRestaurants.length > 0) matchedTypes.push("restaurants");
  if (matchedHotels.length > 0) matchedTypes.push("hotels");
  if (matchedProducts.length > 0) matchedTypes.push("products");

  const hasData = matchedTypes.length > 0;

  // Build Text — include slug/id for internal links
  const placeText = matchedPlaces
    .map(
      (item) => `
[Place]
Name: ${item.title?.th}
Description: ${item.detail?.th}
Location: ${item.detail_more?.location ?? ""}
InternalLink: /places/${item.id}
`
    )
    .join("\n");

  const restaurantText = matchedRestaurants
    .map(
      (item) => `
[Restaurant]
Name: ${item.locales.th.name}
Description: ${item.locales.th.desc}
Location: ${item.locales.th.location ?? ""}
InternalLink: /restaurants/${item.slug ?? item.id}
`
    )
    .join("\n");

  const hotelText = matchedHotels
    .map(
      (item) => `
[Hotel]
Name: ${item.locales.th.name}
Description: ${item.locales.th.desc}
Location: ${item.locales.th.location ?? ""}
InternalLink: /hotels/${item.slug ?? item.id}
`
    )
    .join("\n");

  const productText = matchedProducts
    .map(
      (item) => `
[Product]
Name: ${item.nameTH}
Description: ${item.descriptionTH}
InternalLink: /products/${item.id}
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
}