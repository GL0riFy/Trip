"use client";

import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import * as turf from '@turf/turf';
import { AnimatePresence, motion } from 'framer-motion';

// ฟังก์ชันสำหรับโหลด SVG
function loadSvgImage(map: maplibregl.Map, id: string, url: string, size: number): Promise<void> {
    return new Promise((resolve, reject) => {
        const dpi = window.devicePixelRatio || 1;
        const img = new Image(size * dpi, size * dpi);
        img.onload = () => {
            if (!map.hasImage(id)) {
                map.addImage(id, img, { pixelRatio: dpi });
            }
            resolve();
        };
        img.onerror = reject;
        img.src = url;
    });
}

const DECORATIONS = [
    { id: 'light1', url: '/Maps/light1-2.svg', lng: 96.70, lat: 19.90, size: 280, iconSize: 1.0 },
    { id: 'light2', url: '/Maps/light2-2.svg', lng: 100.60, lat: 19.95, size: 280, iconSize: 1.0 },
    { id: 'light3', url: '/Maps/light3-1.svg', lng: 97.20, lat: 19.95, size: 250, iconSize: 0.85 },
    { id: 'light4', url: '/Maps/light4-1.svg', lng: 100.00, lat: 19.95, size: 250, iconSize: 0.85 },
    { id: 'tempel', url: '/Maps/tempel.svg',   lng: 97.02, lat: 17.50, size: 330, iconSize: 1.1 },
    { id: 'JD',     url: '/Maps/JD.svg',       lng: 100.60, lat: 17.70, size: 300, iconSize: 1.1 },
];

export default function MapsPage() {
    const t = useTranslations('District');
    const locale = useLocale();
    const router = useRouter();
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);

    const [hoveredInfo, setHoveredInfo] = useState<{ id: string; x: number; y: number } | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<{ id: string; name: string; slug: string } | null>(null);

    const nameToSlug = (name: string) => {
        const mapping: { [key: string]: string } = {
            'เมืองเชียงใหม่': 'mueang-chiang-mai', 'จอมทอง': 'chom-thong', 'แม่แจ่ม': 'mae-chaem',
            'เชียงดาว': 'chiang-dao', 'ดอยสะเก็ด': 'doi-saket', 'แม่แตง': 'mae-taeng',
            'แม่ริม': 'mae-rim', 'สะเมิง': 'samoeng', 'ฝาง': 'fang', 'แม่อาย': 'mae-ai',
            'พร้าว': 'phrao', 'สันป่าตอง': 'san-pa-tong', 'สันกำแพง': 'san-kamphaeng',
            'สันทราย': 'san-sai', 'หางดง': 'hang-dong', 'ฮอด': 'hot', 'ดอยเต่า': 'doi-tao',
            'อมก๋อย': 'omkoi', 'สารภี': 'saraphi', 'เวียงแหง': 'wiang-haeng',
            'ไชยปราการ': 'chai-prakan', 'แม่วาง': 'mae-wang', 'แม่ออน': 'mae-on',
            'ดอยหล่อ': 'doi-lo', 'กัลยาณิวัฒนา': 'kanlayaniwatthana'
        };
        return mapping[name] || name;
    };

    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            bounds: [[97.8, 17.2], [99.6, 20.2]], // ขอบเขตเชียงใหม่
            fitBoundsOptions: { padding: 40 },
            dragRotate: false,        // ห้ามหมุนแผนที่ด้วยเมาส์ขวา
            touchZoomRotate: false,   // ห้ามหมุนแผนที่ด้วยนิ้ว
            maxBounds: [[96.0, 16.0], [101.5, 21.5]], // ห้ามเลื่อนออกนอกภาคเหนือ
        });

        map.current.on('load', async () => {
            if (!map.current) return;

            // --- ล็อกการซูมออก (Min Zoom) ให้เท่ากับค่าเริ่มต้น ---
            const initialZoom = map.current.getZoom();
            map.current.setMinZoom(initialZoom);

            // 1. Source เชียงใหม่
            map.current.addSource('chiangmai-districts', {
                type: 'geojson',
                data: '/Maps/Chiang_mai_Geo.geojson',
                generateId: true 
            });

            // 2. Layer สี
            map.current.addLayer({
                id: 'districts-fill',
                type: 'fill',
                source: 'chiangmai-districts',
                paint: {
                    'fill-color': [
                        'match', ['get', 'adm2_name1'],
                        'เมืองเชียงใหม่', '#81B29A', 'จอมทอง', '#F2CC8F', 'แม่แจ่ม', '#E07A5F',
                        'เชียงดาว', '#3D405B', 'ดอยสะเก็ด', '#F4F1DE', 'แม่แตง', '#A8DADC',
                        'แม่ริม', '#457B9D', 'สะเมิง', '#F28482', 'ฝาง', '#84A59D',
                        'แม่อาย', '#F6BD60', 'พร้าว', '#90DBF4', 'สันป่าตอง', '#B5838D',
                        'สันกำแพง', '#6D597A', 'สันทราย', '#355070', 'หางดง', '#E5989B',
                        'ฮอด', '#B56576', 'ดอยเต่า', '#6C757D', 'อมก๋อย', '#2A9D8F',
                        'สารภี', '#E9C46A', 'เวียงแหง', '#264653', 'ไชยปราการ', '#FFB703',
                        'แม่วาง', '#8ECAE6', 'แม่ออน', '#219EBC', 'ดอยหล่อ', '#023047',
                        'กัลยาณิวัฒนา', '#BC4749', '#E5E5E5'
                    ] as any,
                    'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.9, 0.7]
                }
            });

            // 3. เส้นขอบ
            map.current.addLayer({
                id: 'districts-borders',
                type: 'line',
                source: 'chiangmai-districts',
                paint: { 'line-color': '#FFFFFF', 'line-width': 1.5 }
            });

            // 4. SVG Decorations
            await Promise.all(DECORATIONS.map(d => loadSvgImage(map.current!, d.id, d.url, d.size)));
            map.current.addSource('decorations', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: DECORATIONS.map(d => ({
                        type: 'Feature',
                        geometry: { type: 'Point', coordinates: [d.lng, d.lat] },
                        properties: { icon: d.id, iconSize: d.iconSize },
                    })),
                },
            });
            map.current.addLayer({
                id: 'decorations-layer',
                type: 'symbol',
                source: 'decorations',
                layout: {
                    'icon-image': ['get', 'icon'],
                    'icon-size': ['get', 'iconSize'],
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true,
                },
            });

            // 5. Events
            let hoveredId: any = null;
            map.current.on('mousemove', 'districts-fill', (e: any) => {
                if (e.features.length > 0) {
                    const feature = e.features[0];
                    const slug = nameToSlug(feature.properties.adm2_name1);
                    setHoveredInfo({ id: slug, x: e.point.x, y: e.point.y });
                    if (hoveredId !== null) map.current?.setFeatureState({ source: 'chiangmai-districts', id: hoveredId }, { hover: false });
                    hoveredId = feature.id;
                    map.current?.setFeatureState({ source: 'chiangmai-districts', id: hoveredId }, { hover: true });
                    map.current!.getCanvas().style.cursor = 'pointer';
                }
            });

            map.current.on('mouseleave', 'districts-fill', () => {
                setHoveredInfo(null);
                if (hoveredId !== null) map.current?.setFeatureState({ source: 'chiangmai-districts', id: hoveredId }, { hover: false });
                map.current!.getCanvas().style.cursor = '';
            });

            map.current.on('click', 'districts-fill', (e: any) => {
                const feature = e.features[0];
                const slug = nameToSlug(feature.properties.adm2_name1);
                const bbox = turf.bbox(feature);
                map.current?.fitBounds(bbox as any, { padding: 80, duration: 1000 });
                setSelectedDistrict({ id: slug, name: feature.properties.adm2_name1, slug: slug });
            });
        });
    }, []);

    return (
        <div className="relative w-full h-[calc(100vh-80px)] mt-20 flex justify-center p-5 font-kanit">
            <div className="relative w-full max-w-6xl h-full rounded-[40px] overflow-hidden shadow-2xl border border-white/20 bg-white/50">
                <div ref={mapContainer} className="w-full h-full" />

                {/* Tooltip */}
                {hoveredInfo && !selectedDistrict && (
                    <div 
                        className="absolute z-10 bg-black/80 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm pointer-events-none border border-white/20 shadow-2xl"
                        style={{ left: hoveredInfo.x, top: hoveredInfo.y - 50, transform: 'translateX(-50%)' }}
                    >
                        {t(hoveredInfo.id)}
                    </div>
                )}

                {/* District Modal */}
                <AnimatePresence>
                    {selectedDistrict && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="pointer-events-auto bg-white/95 backdrop-blur-3xl p-8 rounded-[40px] shadow-2xl border border-white flex flex-col items-center gap-6 max-w-xs w-full">
                                <div className="text-center">
                                    <span className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold">{locale === 'th' ? 'ข้อมูลพื้นที่' : 'District Info'}</span>
                                    <h2 className="text-3xl font-bold text-black mt-1">{t(selectedDistrict.id)}</h2>
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <button
                                        onClick={() => router.push(`/${locale}/travel/${selectedDistrict.slug}`)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 group"
                                    >
                                        {locale === 'th' ? 'เข้าชมสถานที่' : locale === 'zh' ? '进入区域' : 'Visit'}
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </button>
                                    <button onClick={() => setSelectedDistrict(null)} className="w-full text-zinc-400 py-2 text-sm hover:text-zinc-600 transition-colors font-medium">
                                        {locale === 'th' ? 'ยกเลิก' : 'Cancel'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}