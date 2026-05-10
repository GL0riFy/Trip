"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server"; // ต้องใช้ตัวนี้ช่วย
import { Store } from "lucide-react"; // เลือก Icon ที่ต้องการ

interface MapProps {
    lat: number;
    lng: number;
    name: string;
    mapLink: string;
}

export default function MapComponent({ lat, lng, name, mapLink }: MapProps) {
    
    // --- สร้าง Custom Icon จาก Lucide ---
    const iconMarkup = renderToStaticMarkup(
        <div className="relative flex items-center justify-center">
            {/* วงกลมพื้นหลังหรือเงา (ถ้าต้องการ) */}
            <div className="absolute w-10 h-10 bg-orange-500 rounded-full shadow-lg border-2 border-white" />
            {/* ตัว Icon จริง */}
            <Store className="relative w-6 h-6 text-white" />
            {/* หางหมุด (Tail) */}
            <div className="absolute -bottom-1 w-2 h-2 bg-orange-500 rotate-45" />
        </div>
    );

    const customLucideIcon = L.divIcon({
        html: iconMarkup,
        className: "custom-lucide-icon", // ลบคลาส default ของ Leaflet ออก
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });

    return (
        <MapContainer 
            center={[lat, lng]} 
            zoom={17} 
            className="h-full w-full"
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; CARTO'
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
    );
}