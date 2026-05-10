import { Hotel } from '../type';

export const hotelHotels: Hotel[] = [
    {
        id: "06",
        slug: "137-pillars-house",
        type: "hotel",
        starRating: 5,
        image: "https://137pillarshotels.com/cms/resources/defaultfbimage-w1200.jpg",
        gallery: [
            "https://137pillarshotels.com/cms/resources/defaultfbimage-w1200.jpg",
            "https://res.cloudinary.com/pillarshotels/image/upload/f_auto,q_auto/web/cms/resources/gallery/image-w2000h2000.jpeg",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/87758503.jpg?k=97f0febb0f80ef5788e194c662b0ad3120f0b23f5ef77dd2af67d375f463e6f8&o="
        ],
        coords: { lat: 18.792055801537597, lng: 99.00410323376165 },
        mapLink: 'https://www.google.com/maps/place/137+Pillars+House+Chiang+Mai/@18.7921269,99.0041837,17z/data=!4m10!3m9!1s0x30da3ab029df1c7d:0x8e31e674b1e14cfc!5m3!1s2026-05-20!4m1!1i2!8m2!3d18.7919289!4d99.0041676!16s%2Fg%2F11c3pcs95y?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D',
        priceRange: "15,000 - 30,000+",
        minPrice: 15000,
        isFeatured: true,
        contact: {
            phone: "+66 53 247 788",
            email: "info@137pillarshotels.com",
            lineId: "@137pillarshotels"
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/137-pillars-house/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/one-three-seven-pillars-house.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/xZThpPmFeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "137 Pillars House Chiang Mai",
                location: "ย่านวัดเกต",
                address: "2 ซอย 1 ถนนหน้าวัดเกต ตำบลวัดเกต อำเภอเมือง เชียงใหม่ 50000",
                desc: "บ้านพักไม้สักโบราณอายุกว่าร้อยปีที่เคยเป็นสำนักงานของบริษัทบอร์เนียว รีโนเวทเป็นวิลล่าหรูระดับ Ultra-Luxury ท่ามกลางสวนเขียวขจี",
                roomStyle: "ห้องพักแบบสวีทกว้างขวางมาก ตกแต่งแบบคลาสสิกวิกตอเรียนผสมล้านนา มีอ่างอาบน้ำสไตล์วิกตอเรียนและระเบียงส่วนตัวกว้างขวาง",
                service: "บริการเหนือระดับด้วยบัตเลอร์ส่วนตัวคอยดูแลตลอด 24 ชั่วโมง ตั้งแต่จัดเตรียมของว่างไปจนถึงวางแผนการเดินทาง",
                policies: ["ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก", "เช็คอินต้องใช้บัตรประชาชนหรือพาสปอร์ตตัวจริง"],
                amenities: ["บัตเลอร์ส่วนตัว", "สระว่ายน้ำนอกอาคาร", "สปาเนียตรา เซรีนิตี้", "ห้องฟิตเนส", "ห้องสมุด", "แจ็ค เบนส์ บาร์", "WiFi ฟรี"],
                tags: ["Ultra-Luxury", "ประวัติศาสตร์", "บ้านไม้สัก", "ส่วนตัวมาก", "ริมน้ำ"]
            },
            en: {
                name: "137 Pillars House Chiang Mai",
                location: "Wat Ket District",
                address: "2 Soi 1, Nawatgate Road, Wat Ket, Mueang Chiang Mai District, Chiang Mai 50000",
                desc: "A stunning 19th-century teak wood mansion, formerly the headquarters of the Borneo Company, meticulously restored into an award-winning luxury hotel.",
                roomStyle: "Expansive suites featuring high ceilings, Victorian-style baths, and spacious outdoor living balconies.",
                service: "Exceptional 24-hour private butler service, ensuring every detail of your stay is flawlessly executed.",
                policies: ["No pets allowed", "Government-issued photo ID required at check-in"],
                amenities: ["Personal Butler", "Outdoor Lap Pool", "Nitra Serenity Spa", "Gym", "Library", "Jack Bain's Bar", "Free Wi-Fi"],
                tags: ["Ultra-Luxury", "Heritage", "Teak House", "Exclusive", "Wat Ket"]
            },
            zh: {
                name: "清迈137柱府酒店",
                location: "瓦凯区 (Wat Ket)",
                address: "2 Soi 1, Nawatgate Road, Wat Ket, Mueang Chiang Mai District, Chiang Mai 50000",
                desc: "拥有百年历史的古老柚木建筑，曾是英国婆罗洲公司的总部，现已翻修为备受赞誉的顶级奢华精品酒店。",
                roomStyle: "客房极其宽敞，配备经典的维多利亚风格浴缸和超大私人阳台，尽显古典优雅。",
                service: "24小时私人管家服务，在每一个细节上都追求极致，提供无微不至的关怀。",
                policies: ["禁止携带宠物", "办理入住时需出示有效身份证件"],
                amenities: ["私人管家", "户外泳池", "尼特拉宁静水疗中心", "健身房", "图书馆", "杰克贝恩酒吧", "免费WiFi"],
                tags: ["顶级奢华", "历史建筑", "柚木豪宅", "极致私密", "精品酒店"]
            }
        }
    },
    {
        id: "08",
        slug: "sireeampan-boutique",
        type: "hotel",
        starRating: 5,
        image: "https://images.trvl-media.com/lodging/9000000/8170000/8165400/8165385/0234e7a6.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
        gallery: [
            "https://images.trvl-media.com/lodging/9000000/8170000/8165400/8165385/3be426a0.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/839226877.jpg?k=fc7355bebd15e12bee5e8c4ef249205ed458ab36f0ff04a3fc168ec8bf157b83&o=",
            "https://sireeampan.com/images/1868.jpg"
        ],
        coords: { lat: 18.81241860840476, lng: 98.9603802779323 },
        mapLink: 'https://www.google.com/maps/place/สิรีอำพัน+บูติค/@18.8123854,98.9598077,18.75z/data=!4m10!3m9!1s0x30da3a5b77816d67:0xdd3a10959787577a!5m3!1s2026-05-20!4m1!1i2!8m2!3d18.8123612!4d98.9603771!16s%2Fg%2F1ptzxg_j8?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D',
        priceRange: "6,000 - 12,000+",
        minPrice: 6000,
        isFeatured: false,
        contact: {
            phone: "+66 53 327 777",
            email: "info@sireeampan.com",
            lineId: "@sireeampan"
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/sireeampan-boutique-resort-and-spa/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/sireeampan-boutique-resort-and-spa.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/GHbg1otFeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "สิรีอำพัน บูติค รีสอร์ท แอนด์ สปา",
                location: "ใกล้ศูนย์ประชุมนานาชาติ",
                address: "88/1 หมู่ 1 ตำบลช้างเผือก อำเภอเมือง เชียงใหม่ 50300",
                desc: "บูติกรีสอร์ตสุดหรูที่จำลองคฤหาสน์ไทยสมัยศตวรรษที่ 18 มาไว้ในบรรยากาศที่เงียบสงบและเป็นส่วนตัวขั้นสุด",
                roomStyle: "คฤหาสน์ไทยหรูที่มีเพียง 11 ห้องพัก แต่ละห้องมีชื่อตามอัญมณีไทย ให้ความรู้สึกอบอุ่นเหมือนบ้านพักส่วนตัวชั้นเลิศ",
                service: "บริการอันเป็นเอกลักษณ์ 'Anytime Anywhere Breakfast' เสิร์ฟอาหารเช้าคุณภาพเยี่ยมให้คุณทุกที่และทุกเวลาที่คุณต้องการ",
                policies: ["เด็กอายุต่ำกว่า 12 ปีพักฟรี (ไม่มีเตียงเสริม)", "มีบริการรถรับส่งสนามบินฟรี"],
                amenities: ["สระว่ายน้ำ", "อาหารเช้าทุกเวลา", "สวนส่วนตัว", "ศูนย์ฟิตเนส", "สปาและสุขภาพ", "บริการส่งตัวสนามบินฟรี"],
                tags: ["คฤหาสน์ไทย", "อาหารเช้าทุกเวลา", "ส่วนตัว", "ช้างเผือก", "รีสอร์ต"]
            },
            en: {
                name: "Sireeampan Boutique Resort & Spa",
                location: "Near International Convention Centre",
                address: "88/1 Moo 1, Tambon Chang Phueak, Mueang Chiang Mai District, Chiang Mai 50300",
                desc: "A hidden gem that recreates the grandeur of an 18th-century Thai manor, offering an intimate and secluded escape.",
                roomStyle: "Exclusive Lanna manor with only 11 suites, each uniquely named after Thai gemstones, combining traditional charm with modern luxury.",
                service: "Signature 'Anytime Anywhere' breakfast policy – wake up whenever you want and have your gourmet breakfast served anywhere in the resort.",
                policies: ["Children under 12 stay free using existing beds", "Complimentary airport round-trip transfer"],
                amenities: ["Swimming Pool", "Anytime Anywhere Breakfast", "Private Garden", "Fitness Center", "Spa & Wellness", "Free Airport Transfer"],
                tags: ["Thai Manor", "Anytime Breakfast", "Secluded", "Luxury Boutique", "Garden Resort"]
            },
            zh: {
                name: "希里安潘精品度假酒店",
                location: "近国际会展中心",
                address: "88/1 Moo 1, Tambon Chang Phueak, Mueang Chiang Mai District, Chiang Mai 50300",
                desc: "模仿18世纪泰国豪宅设计的精品度假村，环境幽静，为宾客提供极致的隐私和宁静感。",
                roomStyle: "奢华泰式宅邸，全酒店仅设有11间客房，均以泰国宝石命名，营造出一种高尚私人住宅的氛围。",
                service: "特色“随时随地”早餐服务，不受时间限制，可在度假村内的任何角落享用顶级早餐。",
                policies: ["12岁以下儿童免费入住（不占床）", "提供免费机场往返接送服务"],
                amenities: ["游泳池", "随时随地早餐", "私家花园", "健身中心", "水疗和健康中心", "免费机场接送"],
                tags: ["泰式豪宅", "随时早餐", "隐私度高", "精品度假村", "园林景观"]
            }
        }
    }
];