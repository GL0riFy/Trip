import { Hotel } from '../type';

export const cityHotels: Hotel[] = [
    {
        id: "01",
        slug: "u-nimman-chiang-mai",
        type: "city",
        starRating: 5,
        image: "https://image-tc.galaxy.tf/wijpeg-3itm36ph5rgmm3iksspmyzetu/u-nimman-chiang-mai-overall.jpg?width=1920",
        gallery: [
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/90382000.jpg?k=c3a6b71a7c5b9e3ce12b56c0dc87477df6f781636cf4c4ae7938609873d5f66a&o=",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/0c/3c/bf/deluxe-corner.jpg?w=900&h=500&s=1",
            "https://image-tc.galaxy.tf/wijpeg-7r6ru5netzf9lazz7vvu98q8h/at-rincome.jpg?width=1920"
        ],
        coords: { 
            lat: 18.800731560198415, 
            lng: 98.96796525658219 
        },
        mapLink: 'https://www.google.com/maps/place/โรงแรมยูนิมมาน+เชียงใหม่/@18.8006605,98.9654386,17z/data=!4m9!3m8!1s0x30da3a61e38bb403:0xa65d64cd80125922!5m2!4m1!1i2!8m2!3d18.8006605!4d98.9680189!16s%2Fg%2F11cs1t5qd2?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D',
        priceRange: "2,500 - 5,000+",
        minPrice: 2500,
        isFeatured: true,
        
        contact: {
            phone: "+66 52 005 111",
            email: "reserve@unimmanchiangmai.com",
            lineId: "@unimman"
        },

        booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/u-nimman-chiang-mai/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/u-nimman-chiang-mai.html"
            },
            {
                platform: "Trip",
                link: "https://www.trip.com/w/k5CzZqJEeU2"
            }
        ],

        checkIn: "14:00",
        checkOut: "12:00",

        locales: {
            th: {
                name: "โรงแรมยูนิมมาน เชียงใหม่",
                location: "แยกรินคำ ถนนนิมมานฯ",
                address: "1 ถนนนิมมานเหมินท์ ตำบลสุเทพ อำเภอเมือง เชียงใหม่ 50200",
                desc: "ตกแต่งสไตล์ร่วมสมัยผสมผสานล้านนาประยุกต์ ตั้งอยู่ทำเลทองใจกลางนิมมานฯ รายล้อมด้วยแหล่งช้อปปิ้งและร้านอาหารชื่อดัง",
                roomStyle: "สไตล์ร่วมสมัยผสมล้านนาประยุกต์ ไฮไลต์คือสระว่ายน้ำบนดาดฟ้าวิวดอยสุเทพที่สวยที่สุดแห่งหนึ่งในเมือง",
                service: "นโยบาย Check-in เวลาไหน Check-out เวลานั้น (พักได้เต็ม 24 ชม.) พร้อมอาหารเช้าที่ทานได้ทุกที่ทุกเวลา",
                policies: [
                    "เช็คอินและเช็คเอาท์ตามเวลาที่เข้าพักจริง (24 ชั่วโมง)",
                    "เลือกหมอน กลิ่นสบู่ และชนิดชาได้ล่วงหน้า",
                    "เด็กอายุต่ำกว่า 12 ปีพักรวมกับผู้ปกครองฟรี",
                    "ห้ามสูบบุหรี่ภายในห้องพัก"
                ],
                amenities: ["สระว่ายน้ำบนดาดฟ้า", "ฟิตเนส", "จักรยานให้ใช้ฟรี", "ห้องสมุด", "ซาวน่า", "โปรแกรม U Choose", "Wi-Fi ฟรี"],
                tags: ["หรูหรา", "ใจกลางเมือง", "นิมมาน", "สระว่ายน้ำดาดฟ้า", "พัก 24 ชั่วโมง"]
            },
            en: {
                name: "U Nimman Chiang Mai",
                location: "Nimman Road",
                address: "1 Nimmanhaemin Road, Suthep, Muang, Chiang Mai 50200, Thailand",
                desc: "A sophisticated contemporary hotel with a touch of Lanna heritage, perfectly situated at the iconic Nimman Corner.",
                roomStyle: "Modern Lanna fusion design featuring a stunning rooftop infinity pool with panoramic Doi Suthep views.",
                service: "Unique 24-hour room use policy and 'Whenever Wherever' breakfast available until 10 PM.",
                policies: [
                    "24-hour use of room: check-out at the same time as check-in",
                    "U Choose program for personalized amenities",
                    "Complimentary bicycle rental"
                ],
                amenities: ["Rooftop Pool", "Gym", "Free Bikes", "Library", "Sauna", "U Choose Programme", "Free Wi-Fi"],
                tags: ["Luxury", "City Center", "Nimman", "Rooftop Pool", "24-hour Stay"]
                
            },
            zh: {
                name: "清迈宁曼U酒店",
                location: "宁曼路",
                address: "1 Nimmanhaemin Road, Suthep, Muang, Chiang Mai 50200, 泰国",
                desc: "融合现代与兰纳元素的精品酒店，坐落于宁曼路核心商圈，地理位置极佳，出行便捷。",
                roomStyle: "现代兰纳融合风格，亮点是俯瞰素贴山的屋顶无边泳池，景色迷人。",
                service: "独有的24小时住满政策（无论何时入住，均可住满24小时再退房）以及随时随地早餐服务。",
                policies: [
                    "24小时客房使用权",
                    "U Choose 个性化服务计划",
                    "免费租借自行车"
                ],
                amenities: ["屋顶泳池", "健身房", "免费自行车", "图书馆", "桑拿", "U Choose 个性化服务计划", "免费Wi-Fi"],
                tags: ["豪华", "市中心", "宁曼路", "屋顶泳池", "24小时入住"]
            }
        }
    },
    {
        id: "02",
        slug: "the-inside-house",
        type: "city",
        starRating: 5,
        image: "https://www.the-insidehouse.com/wp-content/uploads/2022/10/%E0%B8%94%E0%B8%B5%E0%B9%84%E0%B8%8B%E0%B8%99%E0%B9%8C%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A1%E0%B8%B5%E0%B8%8A%E0%B8%B7%E0%B9%88%E0%B8%AD-5-3.png",
        gallery: [
            "https://www.the-insidehouse.com/wp-content/uploads/2022/01/CAN02240-HDR-1536x1024.jpg",
            "https://www.the-insidehouse.com/wp-content/uploads/2021/12/CAN00687-HDR-scaled.jpg",
            "https://www.the-insidehouse.com/wp-content/uploads/2020/06/dining-3.jpg"
        ],
        coords: { lat: 18.784363895221293, lng: 98.98174348705396 },
        mapLink: 'https://www.google.com/maps/place/ดิ+อินไซด์+เฮ้าส์/@18.7842674,98.981832,18z/data=!4m10!3m9!1s0x30da3a9ce2f00c03:0x211b2acefae6b6f!5m3!1s2026-05-20!4m1!1i2!8m2!3d18.784284!4d98.9816988!16s%2Fg%2F11bzywcw11?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D',
        priceRange: "5,000 - 15,000+",
        minPrice: 5000,
        isFeatured: true,
        contact: {
            phone: "+66 53 904 699",
            email: "info@the-insidehouse.com",
            lineId: "@theinsidehouse"
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/the-inside-house/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/di-inaichd-ehaath.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/E7P4NsGFeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "ดิ อินไซด์ เฮ้าส์",
                location: "เขตคูเมืองเชียงใหม่",
                address: "56 ถนนสามล้าน ตำบลพระสิงห์ อำเภอเมือง เชียงใหม่ 50200",
                desc: "บูติกโฮเทลสีขาวล้วนสไตล์โคโลเนียลล้านนา สวยงามและมีความเป็นส่วนตัวสูง ทุกรายละเอียดถูกออกแบบมาอย่างประณีต",
                roomStyle: "สไตล์โคโลเนียลล้านนาที่เน้นความโปร่งโล่งและโทนสีขาว ไฮไลต์คือห้องพักที่มีสระว่ายน้ำกระจกใสส่วนตัว (Glass Pool) บนชั้นลอย",
                service: "บริการแบบส่วนตัวที่น่าประทับใจ พนักงานจำชื่อแขกได้ มีชุดชายามบ่าย (Afternoon Tea) ให้บริการฟรีสำหรับผู้เข้าพัก",
                policies: ["ห้ามสูบบุหรี่ในห้องพัก", "ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก"],
                amenities: ["สระกระจกส่วนตัว", "สระว่ายน้ำกลางแจ้ง", "ชายามบ่ายฟรี", "ห้องสมุด", "สปา", "ฟรี Wi-Fi"],
                tags: ["บูติก", "ถ่ายรูปสวย", "สระว่ายน้ำส่วนตัว", "คูเมือง", "หรูหรา"]
            },
            en: {
                name: "The Inside House",
                location: "Old City Chiang Mai",
                address: "56 Samlan Rd, Phra Sing, Mueang Chiang Mai District, Chiang Mai 50200",
                desc: "A pure white Colonial Lanna boutique hotel offering a serene sanctuary in the heart of the old city.",
                roomStyle: "Colonial Lanna elegance. Many suites feature the iconic private 'Glass Pool', a transparent pool built into the architecture.",
                service: "Exceptional personalized service including a signature complimentary Afternoon Tea set for every guest.",
                policies: ["Non-smoking rooms", "No pets allowed"],
                amenities: ["Private Glass Pool", "Outdoor Swimming Pool", "Free Afternoon Tea", "Library", "Spa", "Free Wi-Fi"],
                tags: ["Boutique", "Instagrammable", "Private Pool", "Old City", "Luxury"]
            },
            zh: {
                name: "因赛德之家酒店",
                location: "清迈古城内",
                address: "56 Samlan Rd, Phra Sing, Mueang Chiang Mai District, Chiang Mai 50200",
                desc: "纯白色调的兰纳殖民时期风格精品酒店，精致且极具隐私感，是享受宁静时光的绝佳选择。",
                roomStyle: "兰纳殖民风，部分客房拥有独特的私人玻璃透明泳池（Glass Pool），拍照非常出片。",
                service: "贴心的管家式服务，每天为客人提供精心准备的免费下午茶。",
                policies: ["全面禁烟", "禁止携带宠物"],
                amenities: ["私人玻璃泳池", "室外游泳池", "免费下午茶", "图书馆", "水疗中心", "免费Wi-Fi"],
                tags: ["精品酒店", "网红打卡", "私人泳池", "古城内", "奢华"]
            }
        }
    },
    {
        id: "03",
        slug: "tamarind-village",
        type: "city",
        starRating: 4,
        image: "https://hotelandresortthailand.com/read/wp-content/uploads/2021/11/%E0%B8%9B%E0%B8%81-%E0%B9%81%E0%B8%97%E0%B8%A1%E0%B8%A1%E0%B8%B2%E0%B8%A3%E0%B8%B5%E0%B8%99.jpg",
        gallery: [
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/dd/35/c6/tamarind-village-courtyard.jpg?w=900&h=500&s=1",
            "https://cdn.adventure-life.com/58/95/25/f6/1300x820.webp",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/61182948.jpg?k=8cb8629dedf29474d2ca7fcb9b77530d6c4294a4f12ce0b7edc2abe2b7e42aa9&o="
        ],
        coords: { lat: 18.788637387850127, lng: 98.98975113087427 },
        mapLink: 'https://www.google.com/maps/place/แทมมาริน+วิลเลจ/@18.7888349,98.9896421,19.5z/data=!4m10!3m9!1s0x30da3a9897ea9749:0x3b159ee5967c4098!5m3!1s2026-05-20!4m1!1i2!8m2!3d18.7885472!4d98.9897558!16s%2Fg%2F11tcx440x?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D',
        priceRange: "4,000 - 8,000+",
        minPrice: 4000,
        isFeatured: false,
        contact: {
            phone: "+66 53 418 896",
            email: "reservation@tamarindvillage.com",
            lineId: "@tamarindvillage"
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/tamarind-village-hotel/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/tamarind-village.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/brOZ0TOFeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "แทมมาริน วิลเลจ",
                location: "ในคูเมืองเชียงใหม่",
                address: "50/1 ถนนราชดำเนิน ตำบลศรีภูมิ อำเภอเมือง เชียงใหม่ 50200",
                desc: "ซ่อนตัวอยู่ในคูเมือง ทางเข้าเป็นอุโมงค์ต้นไผ่ที่เป็นเอกลักษณ์ บรรยากาศร่มรื่นและเงียบสงบเหมือนย้อนเวลากลับไปสู่อดีต",
                roomStyle: "สไตล์ล้านนาชนบทที่ดูหรูหรา ตกแต่งด้วยงานไม้และผ้าทอมือพื้นเมือง สะท้อนถึงวัฒนธรรมทางเหนือ",
                service: "การต้อนรับที่อบอุ่นเหมือนพักบ้านญาติผู้ใหญ่ มีกิจกรรมทางวัฒนธรรมเช่นการทำตุง และอาหารเช้าพื้นเมืองที่คัดสรรมาอย่างดี",
                policies: ["ห้ามนำทุเรียนเข้าโรงแรม", "ห้ามสูบบุหรี่ในพื้นที่ส่วนกลางบางจุด"],
                amenities: ["สระว่ายน้ำ", "สปา", "กิจกรรมทางวัฒนธรรม", "ร้านค้าขายของดี", "ร้านอาหาร", "ฟรี Wi-Fi"],
                tags: ["วัฒนธรรม", "ร่มรื่น", "ใจกลางเมือง", "ล้านนา", "เงียบสงบ"]
            },
            en: {
                name: "Tamarind Village",
                location: "Old City Chiang Mai",
                address: "50/1 Rajdamnoen Rd, Sri Phum, Mueang Chiang Mai District, Chiang Mai 50200",
                desc: "A secret sanctuary in the heart of the old city, named after the 200-year-old tamarind tree on its grounds.",
                roomStyle: "Elegant rustic Lanna style featuring dark wood, lime-washed walls, and local hand-woven ethnic fabrics.",
                service: "Genuine northern hospitality with complimentary cultural activities like umbrella painting and flower weaving.",
                policies: ["Durian not allowed", "No smoking in rooms"],
                amenities: ["Swimming Pool", "Spa", "Cultural Activities", "Boutique Shop", "Restaurant", "Free Wi-Fi"],
                tags: ["Culture", "Greenery", "Heritage", "Lanna", "Peaceful"]
            },
            zh: {
                name: "塔玛琳村酒店",
                location: "清迈古城内",
                address: "50/1 Rajdamnoen Rd, Sri Phum, Mueang Chiang Mai District, Chiang Mai 50200",
                desc: "隐藏在古城中的宁静绿洲，以院内一棵200年历史的酸角树命名，入口处的竹林隧道是必打卡点。",
                roomStyle: "雅致的兰纳乡村风格，大量使用木材和当地少数民族手工织物装饰。",
                service: "给人宾至如归的温馨感，提供兰纳手工艺体验课程，当地风味的早餐非常地道。",
                policies: ["禁止携带榴莲入内", "室内禁烟"],
                amenities: ["游泳池", "水疗中心", "文化活动", "精品店", "餐厅", "免费Wi-Fi"],
                tags: ["兰纳文化", "宁静", "古城核心", "传统风格", "园林酒店"]
            }
        }
    },
    {
        id: "04",
        slug: "melia-chiang-mai",
        type: "city",
        starRating: 5,
        image: "https://www.bradtguides.com/wp-content/uploads/2023/11/Melia-Chiang-Mai_Entrance_Night_1-scaled.jpg",
        gallery: [
            "https://www.bradtguides.com/wp-content/uploads/2023/11/Melia-Chiang-Mai_Entrance_Night_1-scaled.jpg",
            "https://ak-d.tripcdn.com/images/1mc1w12000as8c46nE27A_W_960_540_R5.webp",
            "https://www.gourmetandcuisine.com/Images/editor_upload/_editor20220325103548_original.jpg"
        ],
        coords: { lat: 18.785524203907773, lng: 99.00283954707602 },
        mapLink: 'https://www.google.com/maps/place/โรงแรมมีเลีย+เชียงใหม่/@18.7853109,99.0029522,17z/data=!4m10!3m9!1s0x30da3bae54e74dd3:0x4db450713b90aedf!5m3!1s2026-05-20!4m1!1i2!8m2!3d18.7852997!4d99.0027877!16s%2Fg%2F11j5j5h4lc?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D',
        priceRange: "4,000 - 7,000+",
        minPrice: 4000,
        isFeatured: true,
        contact: {
            phone: "+66 52 090 699",
            email: "melia.chiangmai@melia.com",
            lineId: "@meliachiangmai"
        },
        booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/melia-chiang-mai_4/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/melia-chiangmai.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/Jv3oFLeFeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "โรงแรมมีเลีย เชียงใหม่",
                location: "ใกล้แม่น้ำปิง/ไนท์บาซาร์",
                address: "46, 48 ถนนเจริญประเทศ ตำบลช้างคลาน อำเภอเมือง เชียงใหม่ 50100",
                desc: "โรงแรมตึกสูงตกแต่งโมเดิร์นเรียบหรู ตั้งอยู่ใกล้ไนท์บาซาร์และแม่น้ำปิง เป็นจุดชมวิวเมืองที่สวยที่สุดแห่งหนึ่ง",
                roomStyle: "โมเดิร์นเรียบหรู ห้องกว้างขวางพร้อมสิ่งอำนวยความสะดวกครบครัน ไฮไลต์คือ Mai The Sky Bar รูฟท็อปที่สูงสุดในเมือง",
                service: "มาตรฐานโรงแรมระดับโลกจากสเปน พนักงานมีความเป็นมืออาชีพสูง พร้อมคลับเลานจ์ 'The Level' สำหรับแขกคนพิเศษ",
                policies: ["เด็กอายุต่ำกว่า 12 ปีพักฟรีเมื่อใช้เตียงที่มีอยู่", "ไม่อนุญาตให้นำสัตว์เลี้ยงเข้าพัก"],
                amenities: ["บาร์บนดาดฟ้า", "สปา YHI", "Kids Club", "สระว่ายน้ำกลางแจ้ง", "ฟิตเนสเซ็นเตอร์", "เลานจ์สำหรับผู้บริหาร"],
                tags: ["รูฟท็อปบาร์", "ทันสมัย", "หรูหรา", "ไนท์บาซาร์", "วิวเมือง"]
            },
            en: {
                name: "Melia Chiang Mai",
                location: "Near Ping River / Night Bazaar",
                address: "46, 48 Charoen Prathet Rd, Chang Khlan, Mueang Chiang Mai District, Chiang Mai 50100",
                desc: "A modern luxury high-rise hotel located near the vibrant Night Bazaar and Ping River, offering a blend of Spanish roots and local soul.",
                roomStyle: "Sleek, spacious modern rooms with premium amenities. Guests can enjoy 'Mai The Sky Bar', the city's highest rooftop bar.",
                service: "International five-star service standards from Spain, featuring the exclusive 'The Level' service for a personalized experience.",
                policies: ["Children under 12 stay free with existing bedding", "No pets allowed"],
                amenities: ["Rooftop Bar", "YHI Spa", "Kids Club", "Outdoor Pool", "Fitness Center", "Executive Lounge"],
                tags: ["Rooftop Bar", "Modern", "Luxury", "Night Bazaar", "City View"]
            },
            zh: {
                name: "清迈美利亚酒店",
                location: "近萍河/夜市",
                address: "46, 48 Charoen Prathet Rd, Chang Khlan, Mueang Chiang Mai District, Chiang Mai 50100",
                desc: "现代简约豪华的高层酒店，地理位置优越，邻近著名的清迈夜市和萍河。",
                roomStyle: "现代奢华风格，客房开阔明亮，设有Mai The Sky Bar，是清迈海拔最高的露天酒吧。",
                service: "源自西班牙的世界级酒店标准，服务极具专业水准，提供特有的'The Level'行政待遇。",
                policies: ["12岁以下儿童不占床免费", "禁止携带宠物入内"],
                amenities: ["屋顶酒吧", "YHI水疗中心", "儿童俱乐部", "室外游泳池", "健身中心", "行政酒廊"],
                tags: ["屋顶酒吧", "现代奢华", "近夜市", "景观房", "高端服务"]
            }
        }
    }
];