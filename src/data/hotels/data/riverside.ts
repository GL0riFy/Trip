import { Hotel } from '../type';

export const riversideHotels: Hotel[] = [
    {
        id: "05",
        slug: "anantara-chiang-mai",
        type: "riverside",
        starRating: 5,
        image: "https://assets.anantara.com/image/upload/q_auto,f_auto/media/minor/anantara/images/anantara-chiang-mai-resort/the-resort/teaser-960x519.jpg",
        gallery: [
            "https://assets.anantara.com/image/upload/q_auto,f_auto/media/minor/anantara/images/anantara-chiang-mai-resort/the-resort/teaser-960x519.jpg",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/d1/b9/24/deluxe-garden-view-room.jpg?w=900&h=500&s=1",
            "https://q-xx.bstatic.com/xdata/images/hotel/max500/109715933.jpg?k=66f5891e9789835b35403dcf0d91603bf1ffcbe10fb86f55f3e16e22860e98ef&o="
        ],
        coords: { lat: 18.781612355032507, lng: 99.00368680599078 },
        mapLink: 'https://www.google.com/maps/place/อนันตรา+เชียงใหม่+รีสอร์ท/@18.7815954,99.003714,19.5z',
        priceRange: "8,000 - 20,000+",
        minPrice: 8000,
        isFeatured: true,
        contact: {
            phone: "053-123-333",
            email: "chiangmai@anantara.com",
            lineId: "@anantarachiangmai"
        },
        booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/anantara-chiang-mai-resort/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/anantara-chiang-mai-resort-and-spa.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/91rpabwFeU2"
            }
        ],
        checkIn: "15:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "อนันตรา เชียงใหม่ รีสอร์ท",
                location: "ริมแม่น้ำปิง",
                address: "123 ถ.เจริญประเทศ ต.ช้างคลาน อ.เมือง จ.เชียงใหม่ 50100",
                desc: "รีสอร์ตหรูตัวอาคารหลักเคยเป็นสถานกงสุลอังกฤษเก่า คลาสสิกและอบอุ่น",
                roomStyle: "ดีไซน์ผสมผสานไม้และกระจกดูอบอุ่น สระว่ายน้ำริมน้ำที่สวยงาม",
                service: "หรูหรา ไร้ที่ติ มีสปาระดับพรีเมียมและบัตเลอร์ดูแลริมสระ",
                policies: ["ห้ามนำสัตว์เลี้ยงเข้าพัก", "เช็คอินต้องใช้บัตรประชาชนตัวจริง"],
                amenities: ["สระว่ายน้ำริมน้ำ", "สปาอนันตรา", "ศูนย์ฟิตเนส", "บาร์เซอร์วิส 1921", "ห้องประชุม", "บริการจอดรถสำหรับผู้ใหญ่"],
                tags: ["ริมน้ำ", "หรูหรา", "ประวัติศาสตร์", "ช้างคลาน"]
            },
            en: {
                name: "Anantara Chiang Mai Resort",
                location: "Riverside",
                address: "123 Charoen Prathet Road, Chang Khlan, Mueang, Chiang Mai 50100",
                desc: "Luxury resort where the main building was once the British Consulate.",
                roomStyle: "Warm wood and glass design with a stunning riverside infinity pool.",
                service: "Flawless luxury service with a premium spa and poolside butlers.",
                policies: ["No pets allowed", "Physical ID required for check-in"],
                amenities: ["Riverside Pool", "Anantara Spa", "Fitness Center", "The Service 1921 Bar", "Meeting Rooms", "Valet Parking"],
                tags: ["Riverside", "Luxury", "Heritage", "Fine Dining"]
            },
            zh: {
                name: "清迈安纳塔拉度假酒店",
                location: "萍河畔",
                address: "123 Charoen Prathet Rd, 清迈 50100",
                desc: "奢华度假村，主楼曾是英国领事馆，具有古典而温馨的氛围。",
                roomStyle: "木材与玻璃结合的温馨设计，拥有绝美的河畔泳池。",
                service: "无可挑剔的奢华服务，提供顶级SPA和池畔管家服务。",
                policies: ["禁止携带宠物", "入住需出示有效身份证件"],
                amenities: ["河景泳池", "安纳塔拉水疗中心", "健身中心", "1921服务酒吧", "会议室", "代客泊车"],
                tags: ["河景", "奢华酒店", "历史建筑", "顶级水疗"]
            }
        }
    },
    {
        id: "07",
        slug: "cross-chiang-mai-riverside",
        type: "riverside",
        starRating: 5,
        image: "https://ak-d.tripcdn.com/images/1mi1k224x8uyidi6qA716.jpg?proc=source/trip",
        gallery: [
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/319972309.jpg?k=33718f2e14e53789a48322926c5d24abb60a7d0d8e15bcee3a91e026c6f4d80c&o=",
            "https://media-cdn.tripadvisor.com/media/photo-s/11/18/15/92/oxygen-dining-room.jpg"
        ],
        coords: { lat: 18.80186363472165, lng: 99.0051603183984 },
        mapLink: 'https://www.google.com/maps/place/ครอสเชียงใหม่ริเวอร์ไซด์/@18.8016707,99.0051174,17z',
        priceRange: "4,000 - 10,000+",
        minPrice: 4000,
        isFeatured: true,
        contact: {
            phone: "053-931-999",
            email: "stay@crosschiangmairiverside.com",
            lineId: "@crossriverside"
        },
        booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/cross-chiang-mai-riverside-formerly-x2-chiang-mai-riverside_2/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/x2-chiangmai-riverside-resort.en-gb.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/KSNj4O5GeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "ครอสเชียงใหม่ริเวอร์ไซด์",
                location: "ริมแม่น้ำปิง",
                address: "369/1 ถ.เจริญราษฎร์ ต.วัดเกต อ.เมือง จ.เชียงใหม่ 50000",
                desc: "ดีไซน์อิฐมอญสีแดงตัดกับความโมเดิร์น โดดเด่นริมฝั่งน้ำ",
                roomStyle: "มีห้องพักแบบ Pool Suite พร้อมสระว่ายน้ำส่วนตัวในห้อง",
                service: "อาหารเช้าเสิร์ฟแชมเปญแบบไม่อั้น บริการทันสมัยและเป็นกันเอง",
                policies: ["เด็กอายุต่ำกว่า 12 ปีพักฟรี (ใช้เตียงร่วม)", "ยกเลิกฟรี 48 ชม. ก่อนเข้าพัก"],
                amenities: ["สระว่ายน้ำบนหลังคา", "ห้องอาหารออกซิเจน", "ห้องออกกำลังกาย", "ระเบียงส่วนตัว", "ห้องสมุด", "บริการรถส่งฟรี"],
                tags: ["อิฐแดง", "ดีไซน์", "อาหารเช้าแชมเปญ", "โมเดิร์น"]
            },
            en: {
                name: "Cross Chiang Mai Riverside",
                location: "Riverside",
                address: "369/1 Charoen Rat Road, Wat Ket, Mueang, Chiang Mai 50000",
                desc: "Modern design using red brick contrast, standing out on the riverbank.",
                roomStyle: "Features Pool Suites with private indoor plunge pools.",
                service: "Sparkling wine breakfast and modern, friendly hospitality.",
                policies: ["Children under 12 stay free (existing bedding)", "Free cancellation 48h before arrival"],
                amenities: ["Rooftop Pool", "Oxygen Dining Room", "Gym", "Private Balcony", "Library", "Free Shuttle"],
                tags: ["Boutique", "Modern Design", "Champagne Breakfast", "Wat Ket"]
            },
            zh: {
                name: "清迈河畔克罗斯酒店",
                location: "萍河畔",
                address: "369/1 Charoen Rat Rd, Wat Ket, 清迈 50000",
                desc: "红砖设计与现代风格完美碰撞，坐落在迷人的河岸边。",
                roomStyle: "提供泳池套房，房内设有私人私人泳池。",
                service: "提供无限量香槟早餐，服务风格现代化且充满活力。",
                policies: ["12岁以下儿童免费入住", "入住前48小时可免费取消"],
                amenities: ["屋顶泳池", "氧气餐厅", "健身房", "私人阳台", "图书馆", "免费班车"],
                tags: ["设计感", "红砖建筑", "香槟早餐", "网红打卡"]
            }
        }
    },
    {
        id: "09",
        slug: "raya-heritage",
        type: "riverside",
        starRating: 5,
        image: "https://image.makewebeasy.net/makeweb/r_1920x1920/xTg0v4JIs/RAYA/ddeb79c523f0809919630bed3c060c0e.jpg?v=202405291424",
        gallery: [
            "https://lh3.googleusercontent.com/pw/AP1GczMRoRQNGfW6DRJ-6rJfqUaEMS1riQfdLoftJhn1VOPzUs0lmSuOkSWtQ4kTtbGviKO76xpGrztxkgWRMansJVDChUUmfeQkcpqnzsAb0YIGMCSqldsD=w1200",
            "https://images.adsttc.com/media/images/5e1f/9966/3312/fd05/e600/02a5/newsletter/BD-RayaHeritage-056.jpg?1579129174",
            "https://www.rayaheritage.com/en/images/home-culinary.jpg"
        ],
        coords: { lat: 18.84863824192959, lng: 98.98523325217889 },
        mapLink: 'https://www.google.com/maps/place/รายา+เฮอริเทจ/@18.8486074,98.9852577,19.75z',
        priceRange: "8,000 - 15,000+",
        minPrice: 8000,
        isFeatured: true,
        contact: {
            phone: "053-111-670",
            email: "reservation@rayaheritage.com",
            lineId: "@rayaheritage"
        },
        booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/raya-heritage/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/raya-heritage.en-gb.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/EYAeUJFGeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "รายา เฮอริเทจ",
                location: "ริมแม่น้ำปิง (โซนแม่ริม)",
                address: "157 ม.6 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่ 50180",
                desc: "คอนเซปต์งานคราฟต์และการพักผ่อนที่แท้จริง เน้นโทนสีธรรมชาติ",
                roomStyle: "เน้นงานฝีมือ Earth tone ห้องหันหน้าออกแม่น้ำปิงทุกห้อง",
                service: "เน้นความเงียบสงบ บริการนุ่มนวลตามสไตล์ชาวเหนือ",
                policies: ["เน้นความสงบ งดใช้เสียงดัง", "เหมาะสำหรับคู่รักและการพักผ่อน"],
                amenities: ["สระว่ายน้ำกลางแจ้ง", "สปาไอ วาน", "ร้านอาหารคุณข้าว", "ร้านงานหัตถศิลป์", "WiFi ฟรี", "ห้องนั่งเล่นส่วนตัว"],
                tags: ["มินิมอล", "งานคราฟต์", "เงียบสงบ", "แม่ริม"]
            },
            en: {
                name: "Raya Heritage",
                location: "Riverside (Mae Rim Zone)",
                address: "157 Moo 6, Donkaew, Mae Rim, Chiang Mai 50180",
                desc: "A craft-inspired concept focusing on true relaxation and natural tones.",
                roomStyle: "Artisan-focused earth tone design; all rooms are river-facing.",
                service: "Emphasizes tranquility with gentle, northern-style hospitality.",
                policies: ["Tranquil environment policy", "Recommended for couples and relaxation"],
                amenities: ["Outdoor Pool", "Ai Waan Spa", "Khu Khao Restaurant", "Craft Shop", "Free WiFi", "Private Lounge"],
                tags: ["Minimalist", "Artisan", "Tranquil", "Mae Rim"]
            },
            zh: {
                name: "拉雅传承酒店",
                location: "萍河畔 (湄林区)",
                address: "157 Moo 6, Donkaew, Mae Rim, 清迈 50180",
                desc: "以手工艺为核心概念，强调真正的放松，采用大地色调设计。",
                roomStyle: "注重手工艺细节，全客房均面向萍河。",
                service: "环境极其幽静，提供泰北式的温柔贴心服务。",
                policies: ["保持安静政策", "适合情侣和深度放松"],
                amenities: ["户外泳池", "艾瓦恩水疗中心", "库卡餐厅", "工艺品店", "免费WiFi", "私人休息室"],
                tags: ["极简风", "工艺设计", "安宁", "湄林区"]
            }
        }
    }
];