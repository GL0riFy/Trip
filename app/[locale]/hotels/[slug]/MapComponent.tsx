"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Hotel } from "lucide-react";
import { useState, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";

interface MapProps {
  lat: number;
  lng: number;
  name: string;
  mapLink: string;
}

export default function MapComponent({ lat, lng, name, mapLink }: MapProps) {
  const [icon, setIcon] = useState<L.DivIcon | null>(null);
  const [isMounted, setIsMounted] = useState(false); // เพิ่ม state เช็คการ mount

  useEffect(() => {
    setIsMounted(true); // ปรับเป็น true เมื่อ Component โหลดบน Browser แล้ว

    // สร้าง icon หลังจาก mount (DOM พร้อมแล้ว)
    const iconMarkup = renderToStaticMarkup(
      <div className="relative flex items-center justify-center w-12 h-12">
        <div className="absolute w-10 h-10 bg-orange-500 rounded-full shadow-2xl border-4 border-white" />
        <div className="absolute bottom-1 w-3 h-3 bg-orange-500 rotate-45" />
        <Hotel className="relative z-10 w-5 h-5 text-white" />
      </div>
    );

    setIcon(L.divIcon({
      html: iconMarkup,
      className: "",
      iconSize: [48, 48],
      iconAnchor: [24, 44],
      popupAnchor: [0, -40],
    }));
  }, []);

  // ถ้ายังไม่เดอร์บน Client (ยังเป็น SSR อยู่) ให้คืนค่าว่างเปล่า (หรือ Loading) กลับไปก่อน
  if (!isMounted) {
    return (
      <div className="h-[260px] w-full rounded-2xl bg-gray-100 animate-pulse flex items-center justify-center text-gray-400 text-sm">
        Loading map...
      </div>
    );
  }

  return (
    <div className="h-[260px] w-full rounded-2xl overflow-hidden">
      <MapContainer
        center={[lat, lng]}
        zoom={17}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {/* แสดง Marker เฉพาะเมื่อ icon พร้อมแล้ว */}
        {icon && (
          <Marker
            position={[lat, lng]}
            icon={icon}
            eventHandlers={{
              click: () => window.open(mapLink, "_blank"),
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}