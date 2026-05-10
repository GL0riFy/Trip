"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from "react-dom/server";
import { Hotel } from "lucide-react";
import { useMemo } from "react";

interface MapProps {
  lat: number;
  lng: number;
  name: string;
  mapLink: string;
}

export default function MapComponent({
  lat,
  lng,
  name,
  mapLink,
}: MapProps) {

  // กัน render icon ใหม่ทุกครั้ง
  const customLucideIcon = useMemo(() => {

    const iconMarkup = renderToStaticMarkup(
      <div className="relative flex items-center justify-center w-12 h-12">
        
        {/* Glow */}
        <div className="absolute w-10 h-10 bg-orange-500 rounded-full shadow-2xl border-4 border-white" />

        {/* Tail */}
        <div className="absolute bottom-1 w-3 h-3 bg-orange-500 rotate-45" />

        {/* Icon */}
        <Hotel className="relative z-10 w-5 h-5 text-white" />
      </div>
    );

    return L.divIcon({
      html: iconMarkup,
      className: "", // สำคัญ ลบ default style ของ leaflet
      iconSize: [48, 48],
      iconAnchor: [24, 44],
      popupAnchor: [0, -40],
    });

  }, []);

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