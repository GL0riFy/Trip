"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import { useMemo } from "react";
import { 
  MapPin, 
  Hotel, 
  Utensils, 
  Church, 
  TreePine, 
  Mountain, 
  Ticket, 
  Landmark, 
  UsersRound, 
  Clock 
} from "lucide-react";

// กำหนด Type ของหมวดหมู่สถานที่ตามลอจิกของคุณ
type PlaceCategory = 'hotel' | 'restaurant' | 'tourist' | string;

interface MapProps {
  lat: number;
  lng: number;
  name: string;
  mapLink: string;
  category: PlaceCategory;
  tags: string[];
}

export default function MapComponent({
  lat,
  lng,
  name,
  mapLink,
  category,
  tags = [],
}: MapProps) {

  // ดึง Tag แรกออกมาใช้ในการเช็คและเป็น Dependency เพื่อป้องกันปัญหาเรื่อง Object Reference ของ Array
  const firstTag = tags[0];

  // กัน render icon ใหม่ทุกครั้ง ยกเว้นเมื่อ category หรือ tag เปลี่ยน
  const customLucideIcon = useMemo(() => {
    
    // 1. เลือก IconComponent ตามเงื่อนไข category และ tags
    let IconComponent = MapPin; // Default icon
    
    if (category === 'hotel') {
      IconComponent = Hotel;
    } 
    else if (category === 'restaurant') {
      IconComponent = Utensils;
    } 
    else if (category === 'tourist') {
      if (firstTag) {
        const tag = firstTag.toLowerCase();
        
        // วัด / Temple
        if (tag.includes('วัด') || tag === 'temple' || tag === '寺庙') {
          IconComponent = Church;
        }
        // ธรรมชาติ / Nature / สวน / Farm / ฟาร์ม
        else if (
          tag.includes('ธรรมชาติ') || tag === 'nature' || tag === '自然' || 
          tag.includes('สวน') || tag === 'garden' || tag === '花园' ||
          tag.includes('ฟาร์ม') || tag === 'farm' || tag === '农场'
        ) {
          IconComponent = TreePine;
        }
        // เดินป่า / Hiking / ภูเขา / Mountain
        else if (
          tag.includes('เดินป่า') || tag === 'hiking' || tag === '登山' ||
          tag.includes('ภูเขา') || tag === 'mountain' || tag === '山'
        ) {
          IconComponent = Mountain;
        }
        // สัตว์ / Animal
        else if (tag.includes('สัตว์') || tag === 'animal' || tag === '动物') {
          IconComponent = Mountain; // อ้างอิงตามโค้ดเดิมของคุณ
        }
        // กิจกรรม / Activity
        else if (tag.includes('กิจกรรม') || tag === 'activity' || tag === '活动') {
          IconComponent = Ticket;
        }
        // สถาปัตยกรรม / Architecture
        else if (tag.includes('สถาปัตยกรรม') || tag === 'architecture' || tag === '建筑') {
          IconComponent = Landmark;
        }
        else if (tag.includes('ชุมชน') || tag.includes('community') || tag.includes('社区')) {
          IconComponent = UsersRound;
        }
        // Default สำหรับสถานที่ท่องเที่ยวอื่น ๆ
        else {
          IconComponent = Clock;
        }
      } else {
        IconComponent = Clock;
      }
    }

    // 2. แปลง JSX เป็น HTML String สำหรับ Leaflet
    const iconMarkup = renderToStaticMarkup(
      <div className="relative flex items-center justify-center w-12 h-12">
        {/* Glow */}
        <div className="absolute w-10 h-10 bg-orange-500 rounded-full shadow-2xl border-4 border-white" />

        {/* Tail */}
        <div className="absolute bottom-1 w-3 h-3 bg-orange-500 rotate-45" />

        {/* Dynamic Icon */}
        <IconComponent className="relative z-10 w-5 h-5 text-white" />
      </div>
    );

    return L.divIcon({
      html: iconMarkup,
      className: "", // ลบ default style ของ leaflet
      iconSize: [48, 48],
      iconAnchor: [24, 44],
      popupAnchor: [0, -40],
    });

  }, [category, firstTag]); // ทำงานใหม่เฉพาะเมื่อ category หรือ tag แรกเปลี่ยนไป

  return (
    <div className="h-[260px] w-full rounded-2xl overflow-hidden">
      <MapContainer
        center={[lat, lng]}
        zoom={17}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        {/* CARTO Voyager */}
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <Marker
          position={[lat, lng]}
          icon={customLucideIcon}
          eventHandlers={{
            click: () => {
              window.open(mapLink, "_blank");
            },
          }}
        />
      </MapContainer>
    </div>
  );
}