import { Hotel } from '../type';

export const natureHotels: Hotel[] = [
    {
        id: "10",
        slug: "kao-mai-lanna",
        type: "nature",
        starRating: 3,
        image: "https://lh3.googleusercontent.com/RJliCOHqVLZcis0eSKCpYiaMdWs8a023tkSazp76h4624SbcZQwePT5UlwCQgwOpc3MAEGSU52dtWhP5VhUTZ0fk=w1205-h656-l80-e31",
        gallery: [
            "https://lh3.googleusercontent.com/RJliCOHqVLZcis0eSKCpYiaMdWs8a023tkSazp76h4624SbcZQwePT5UlwCQgwOpc3MAEGSU52dtWhP5VhUTZ0fk=w1205-h656-l80-e31",
            "https://q-xx.bstatic.com/xdata/images/hotel/max500/598280779.jpg?k=b4daa6eb5c045914a7d4351bdf47d61839e549f1a7bcf709a94415b5a40cd414&o=",
            "https://q-xx.bstatic.com/xdata/images/hotel/max500/275788598.jpg?k=5408b579110b4362553ae81b3a57946107df0e574b5c37c877b42ef510d1b2ec&o="
        ],
        coords: { lat: 18.570201806732875, lng: 98.87924493278834 },
        mapLink: 'https://www.google.com/maps/place/เก๊าไม้ล้านนา+รีสอร์ท/@18.5700798,98.8765788,17z',
        priceRange: "1,500 - 3,000+",
        minPrice: 1500,
        isFeatured: false,
        contact: {
            phone: "053-266-550",
            email: "info@kaomailanna.com",
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/kao-mai-lanna-resort/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/kaomai-lanna-resort.en-gb.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/r54k6yLGeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "เก๊าไม้ล้านนา รีสอร์ท",
                location: "สันป่าตอง",
                address: "1 หมู่ 6 ถนนเชียงใหม่-ฮอด ต.บ้านกลาง อ.สันป่าตอง จ.เชียงใหม่ 50120",
                desc: "ดัดแปลงโรงบ่มยาสูบเก่าให้กลายเป็นห้องพัก มีไม้เลื้อยปกคลุมทั่วอาคาร",
                roomStyle: "ฟีลบ้านสวนคลาสสิก โรงบ่มยาสูบเก่าที่รีโนเวทได้อย่างสวยงาม",
                service: "อบอุ่น เป็นกันเอง มีพื้นที่สีเขียวขนาดใหญ่ให้เดินเล่น",
                policies: ["เช็คอิน 14:00 - 18:00 น.", "เช็คเอาท์ 12:00 น.", "อนุญาตให้นำสัตว์เลี้ยงเข้าพักได้"],
                amenities: ["สระว่ายน้ำ", "Wi-Fi ฟรี", "ที่จอดรถฟรี", "ร้านอาหาร", "สปา", "บริการซักรีด", "รับส่งสนามบิน", "Pet Friendly", "อาหารเช้า"],
                tags: ["โรงบ่มยาสูบ", "บูติค", "สวน", "สันป่าตอง", "อินทนนท์", "ธรรมชาติ", "ครอบครัว"],
            },
            en: {
                name: "Kao Mai Lanna Resort",
                location: "San Pa Tong",
                address: "1 Moo 6, Chiang Mai-Hot Road, Ban Klang, San Pa Tong, Chiang Mai 50120",
                desc: "Converted historic tobacco curing barns covered in lush creeping vines.",
                roomStyle: "Classic garden feel; beautifully renovated tobacco barns.",
                service: "Warm and friendly atmosphere with vast green spaces to explore.",
                policies: ["Check-in 14:00 - 18:00", "Check-out by 12:00", "Pets allowed"],
                amenities: ["Swimming Pool", "Free Wi-Fi", "Free Parking", "Restaurant", "Spa", "Laundry Service", "Airport Transfer", "Pet Friendly", "Breakfast"],
                tags: ["tobacco barn", "boutique", "garden", "eco", "nature", "family"],
            },
            zh: {
                name: "考迈兰纳度假村",
                location: "杭东-三巴东",
                address: "三巴东县班格朗，1 号 6 村，清迈-霍德路，清迈 50120",
                desc: "由旧烟草烘干厂改建而成，建筑全身覆盖着绿色的爬墙虎。",
                roomStyle: "经典的古典花园感，烘干厂旧址翻修得非常有特色。",
                service: "温馨友好，拥有大片绿地供住客漫步放松。",
                policies: ["入住时间 14:00 - 18:00", "退房时间 12:00", "允许携带宠物"],
                amenities: ["游泳池", "免费WiFi", "免费停车", "餐厅", "水疗中心", "洗衣服务", "机场接送", "宠物友好", "早餐"],
                tags: ["烟草烘干厂", "精品酒店", "花园", "自然", "家庭"],
            }
        }
    },

    {
        id: "11",
        slug: "four-seasons-resort-chiang-mai",
        type: "nature",
        starRating: 5,
        image: "https://files.gqthailand.com/uploads/20230402222935.jpg",
        gallery: [
            "https://files.gqthailand.com/uploads/20230402222935.jpg",
            "https://www.kant.co.th/wp-content/uploads/2022/11/Four-Seasons-Resort-Chiang-Mai-22.jpg",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/54927335.jpg?k=16a31f024728307c898b92929c6211826700ecedffde8bb14b3974d95a39da7b&o="
        ],
        coords: { lat: 18.916360953721004, lng: 98.93162626048364 },
        mapLink: 'https://www.google.com/maps/place/โฟร์ซีซั่นส์+รีสอร์ท+เชียงใหม่/@18.9161783,98.9290245,17z',
        priceRange: "20,000 - 50,000+",
        minPrice: 20000,
        isFeatured: true,
        contact: {
            phone: "+66 53 298 181",
            email: "chiangmai.reservations@fourseasons.com",
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/four-seasons-resort-chiang-mai/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/four-seasons-resort-chiang-mai.th.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/3uU7UEUGeU2"
            }
        ],
        checkIn: "15:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "โฟร์ซีซั่นส์ รีสอร์ท เชียงใหม่",
                location: "แม่ริม",
                address: "502 หมู่ 1 ถ.แม่ริม-สะเมิงเก่า อ.แม่ริม จ.เชียงใหม่ 50180",
                desc: "รีสอร์ตสุดหรูท่ามกลางทุ่งนาขั้นบันไดและขุนเขา บรรยากาศเงียบสงบและสง่างาม",
                roomStyle: "ศาลาไทยสไตล์ล้านนาหรูหรา ตั้งอยู่ท่ามกลางแลนด์สเคปทุ่งนาและทะเลสาบ",
                service: "บริการระดับโลก พร้อมกิจกรรมอย่างโยคะริมนา ดำนา หรืออาบน้ำควาย",
                policies: ["เช็คอิน 15:00 น.", "เช็คเอาท์ 12:00 น.", "ห้ามสูบบุหรี่ในห้องพัก", "ผู้เข้าพักอายุต่ำกว่า 18 ปีต้องมีผู้ปกครองดูแล"],
                amenities: ["สระว่ายน้ำ 2 แห่ง", "สปา", "ฟิตเนส", "Wi-Fi ฟรี", "ที่จอดรถฟรี", "ร้านอาหาร 2 แห่ง", "บาร์", "คอร์สเทนนิส", "โยคะ", "คลาสทำอาหาร", "เช่าจักรยานฟรี", "บริการสนามบิน", "Kids Club", "บริการห้องพัก 24 ชม.", "Babysitting"],
                tags: ["ลักชัวรี", "ทุ่งนา", "สปา", "แม่ริม", "Five Star", "ฮันนีมูน", "โยคะ"],
            },
            en: {
                name: "Four Seasons Resort Chiang Mai",
                location: "Mae Rim",
                address: "502 Moo 1, Mae Rim-Samoeng Old Road, Mae Rim, Chiang Mai 50180",
                desc: "Luxury resort set among terraced rice fields and mountains, offering peace and elegance.",
                roomStyle: "Luxurious Lanna-style pavilions overlooking rice paddies and a lake.",
                service: "World-class service with unique activities like rice planting and buffalo bathing.",
                policies: ["Check-in from 15:00", "Check-out by 12:00", "No smoking in rooms", "Guests under 18 must be accompanied by parent or guardian"],
                amenities: ["2 Swimming Pools", "Spa", "Fitness Center", "Free Wi-Fi", "Free Parking", "2 Restaurants", "Bar", "Tennis Court", "Yoga", "Cooking Class", "Free Bike Rental", "Airport Transfer", "Kids Club", "24-Hour Room Service", "Babysitting"],
                tags: ["luxury", "rice fields", "spa", "five star", "honeymoon", "yoga", "Mae Rim"],
            },
            zh: {
                name: "清迈四季酒店",
                location: "湄林",
                address: "清迈湄林区美林-沙蒙旧路1村502号，邮编50180",
                desc: "坐落在梯田与山脉间的顶级度假村，环境静谧优雅。",
                roomStyle: "奢华的兰纳风情阁楼，置身于稻田与湖泊美景中。",
                service: "世界级水准服务，提供稻田瑜伽、插秧及给水牛洗澡等体验。",
                policies: ["入住时间 15:00 起", "退房时间 12:00 前", "房内禁止吸烟"],
                amenities: ["2 个游泳池", "水疗中心", "健身中心", "免费WiFi", "免费停车", "2 家餐厅", "酒吧", "网球场", "瑜伽", "烹饪课程", "免费自行车租赁", "机场接送", "儿童俱乐部", "24小时客房服务", "婴儿看护"],
                tags: ["豪华", "梯田", "水疗", "五星级", "蜜月", "瑜伽"],
            }
        }
    },

    {
        id: "12",
        slug: "veranda-high-resort-chiang-mai",
        type: "nature",
        starRating: 5,
        image: "https://www.verandaresort.com/chiang-mai/wp-content/uploads/2023/04/Lobby-3-1920x1249.jpg",
        gallery: [
            "https://www.verandaresort.com/chiang-mai/wp-content/uploads/2023/04/Lobby-3-1920x1249.jpg",
            "https://www.verandaresort.com/chiang-mai/wp-content/uploads/2023/04/DJI_0815-1024x576.jpg",
            "https://www.ahstatic.com/photos/8154_ho_01_p_1024x768.jpg"
        ],
        coords: { lat: 18.754416456576216, lng: 98.88883753031243 },
        mapLink: 'https://www.google.com/maps/place/โรงแรมวีรันดา+ไฮ+รีสอร์ท+เชียงใหม่/@18.7543149,98.8862465,17z',
        priceRange: "4,000 - 10,000+",
        minPrice: 4000,
        isFeatured: true,
        contact: {
            phone: "+66 62 398 6899",
            email: "H8154@accor.com",
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/veranda-high-resort-mgallery/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/veranda-chiangmai.th.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/x8M5pxbGeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "11:30",
        locales: {
            th: {
                name: "โรงแรมวีรันดา ไฮ รีสอร์ท เชียงใหม่",
                location: "หางดง - สะเมิง",
                address: "192 หมู่ 2 บ้านปง หางดง เชียงใหม่ 50230",
                desc: "รีสอร์ตดีไซน์ทันสมัยที่ผสมผสานกับธรรมชาติได้อย่างลงตัว โดดเด่นด้วยวิวสระว่ายน้ำ",
                roomStyle: "สไตล์โมเดิร์นร่วมสมัย ห้องกว้างขวาง เน้นเปิดรับวิวภูเขาและ Infinity Pool",
                service: "มาตรฐานระดับ MGallery พนักงานดูแลดีเยี่ยม เหมาะสำหรับคู่รักฮันนีมูน",
                policies: ["เช็คอิน 14:00 น.", "เช็คเอาท์ 11:30 น.", "มัดจำ 1,000 บาท ณ วันเช็คอิน", "รับบัตรเครดิตและบัตรประชาชน"],
                amenities: ["Infinity Pool", "สปา", "ฟิตเนส", "Wi-Fi ฟรี", "ที่จอดรถฟรี", "ร้านอาหาร 2 แห่ง", "บาร์", "Kids Club", "สระว่ายน้ำสำหรับเด็ก", "โยคะ", "บริการสนามบิน", "บริการห้องพัก 24 ชม.", "ร้านค้า"],
                tags: ["MGallery", "Infinity Pool", "ฮันนีมูน", "วิวภูเขา", "หางดง", "สะเมิง", "โมเดิร์น"],
            },
            en: {
                name: "Veranda High Resort Chiang Mai",
                location: "Hang Dong - Samoeng",
                address: "192 Moo 2 Banpong, Hangdong, Chiang Mai 50230",
                desc: "Modern design meets nature, featuring an iconic rooftop infinity pool.",
                roomStyle: "Contemporary style with spacious rooms and panoramic mountain views.",
                service: "Accor MGallery standards, exceptional care, perfect for honeymoons.",
                policies: ["Check-in from 14:00", "Check-out by 11:30", "THB 1,000 damage deposit on arrival", "Photo ID and credit card required"],
                amenities: ["Infinity Pool", "Spa", "Fitness Center", "Free Wi-Fi", "Free Parking", "2 Restaurants", "Bar", "Kids Club", "Kids Swimming Pool", "Yoga", "Airport Transfer", "24-Hour Room Service", "Shop"],
                tags: ["MGallery", "infinity pool", "honeymoon", "mountain view", "modern"],
            },
            zh: {
                name: "清迈维兰达高地度假酒店",
                location: "杭东-萨蒙路",
                address: "清迈杭东班庞2号村192号，邮编50230",
                desc: "现代设计与大自然的完美结合，以无边际泳池景观闻名。",
                roomStyle: "现代风格客房，宽敞明亮，享有山峦全景。",
                service: "雅高美憬阁（MGallery）标准，非常适合蜜月旅行。",
                amenities: ["无边泳池", "水疗中心", "健身中心", "免费无线网络", "免费停车", "2 间餐厅", "酒吧", "儿童俱乐部", "儿童游泳池", "瑜伽", "机场接送", "24 小时客房服务", "商店"],
                tags: ["美憬阁", "无边际泳池", "蜜月", "山景", "现代"],
            }
        }
    },

    {
        id: "13",
        slug: "panviman-chiang-mai-spa-resort",
        type: "nature",
        starRating: 5,
        image: "https://www.panvimanresortchiangmai.com/wp-content/uploads/2024/05/chiang-mai-activities-day-trip-mae-rim-1.jpg",
        gallery: [
            "https://www.panvimanresortchiangmai.com/wp-content/uploads/2024/05/chiang-mai-activities-day-trip-mae-rim-1.jpg",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/32/b5/d7/caption.jpg?w=900&h=500&s=1",
            "https://www.panvimanresortchiangmai.com/wp-content/uploads/2025/10/family-pool-villa-chiang-mai--1536x1024.webp"
        ],
        coords: { lat: 18.879522089917895, lng: 98.81407150458864 },
        mapLink: 'https://www.google.com/maps/place/ปานวิมาน+เชียงใหม่+สปา+รีสอร์ท/@18.8793597,98.8114161,17z',
        priceRange: "3,000 - 8,000+",
        minPrice: 3000,
        isFeatured: true,
        contact: {
            phone: "+66 53 879 540",
            email: "reservations@panviman.com",
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/panviman-chiangmai-spa-resort/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/panviman-chiang-mai-spa-resort.th.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/oLFIYahGeU2"
            }
        ],
        checkIn: "15:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "ปานวิมาน เชียงใหม่ สปา รีสอร์ท",
                location: "แม่ริม",
                address: "71/6 หมู่ 6 ต.แม่แรม อ.แม่ริม จ.เชียงใหม่ 50180",
                desc: "รีสอร์ตบนยอดเขาสูง วิวสวยอลังการเหมือนอยู่บนวิมานตามชื่อ",
                roomStyle: "พูลวิลล่าตามแนวเขา ตกแต่งสไตล์ไทยหรู ไฮไลต์คือสปาในถ้ำที่โดดเด่น",
                service: "บริการด้วยใจ มีรถกอล์ฟรับส่งอำนวยความสะดวกทั่วรีสอร์ตตลอด 24 ชม.",
                policies: ["เช็คอิน 15:00 น.", "เช็คเอาท์ 12:00 น.", "อาหารเช้าบุฟเฟ่ต์ราคา 550 บาท/ท่าน", "เด็กอายุต่ำกว่า 3 ปี พักฟรี"],
                amenities: ["Infinity Pool", "Pool Bar", "สปา (ถ้ำ)", "ฟิตเนส", "Wi-Fi ฟรี", "ที่จอดรถฟรี", "ร้านอาหาร Panorama", "บาร์", "โยคะ", "มินิกอล์ฟ", "เส้นทางจ็อกกิ้ง", "รถกอล์ฟ 24 ชม.", "บริการสนามบิน", "ฮอตทับ"],
                tags: ["สปาถ้ำ", "พูลวิลล่า", "แม่ริม", "วิวภูเขา", "ฮันนีมูน", "ไทยหรู"],
            },
            en: {
                name: "Panviman Chiang Mai Spa Resort",
                location: "Mae Rim",
                address: "71/6 Moo 6 T. Mae Ram, Mae Rim, Chiang Mai 50180",
                desc: "High-altitude resort offering 'heavenly' panoramic views of the valley.",
                roomStyle: "Pool villas built along the hillside and a famous cave spa.",
                service: "Attentive service with 24-hour golf cart shuttle around the resort.",
                policies: ["Check-in from 15:00", "Check-out by 12:00", "Breakfast buffet THB 550/person", "Children under 3 stay free"],
                amenities: ["Infinity Pool", "Pool Bar", "Cave Spa", "Fitness Center", "Free Wi-Fi", "Free Parking", "Panorama Restaurant", "Bar", "Yoga", "Mini Golf", "Jogging Trail", "24-Hour Golf Cart", "Airport Transfer", "Hot Tub"],
                tags: ["cave spa", "pool villa", "Mae Rim", "mountain view", "honeymoon"],
            },
            zh: {
                name: "清迈盼维曼水疗度假酒店",
                location: "湄林",
                address: "清迈湄林区美兰村71/6号，邮编50180",
                desc: "位于山顶的度假村，景观壮丽，仿佛置身于人间天堂。",
                roomStyle: "依山而建的泳池别墅，泰式华丽装修，亮点是独特的洞穴水疗。",
                service: "贴心服务，提供24小时接驳高尔夫球车穿梭度假村内。",
                policies: ["入住时间 15:00 起", "退房时间 12:00 前", "早餐自助餐每位550泰铢"],
                amenities: ["无边泳池", "池畔酒吧", "洞穴水疗中心", "健身中心", "免费无线网络", "免费停车", "全景餐厅", "酒吧", "瑜伽", "迷你高尔夫", "慢跑道", "24小时高尔夫球车", "机场接送", "热水浴缸"],
                tags: ["洞穴水疗", "泳池别墅", "山景", "蜜月"],
            }
        }
    },

    {
        id: "14",
        slug: "flora-creek-chiang-mai",
        type: "nature",
        starRating: 5,
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/0e/bc/b4/flora-creek.jpg?w=900&h=500&s=1",
        gallery: [
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/0e/bc/b4/flora-creek.jpg?w=900&h=500&s=1",
            "https://y.cdrst.com/foto/hotel-sf/1254574c/granderesp/foto-hotel-12544ca2.jpg",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/861461755.jpg?k=e5f821d002964d61b149c8d66649d3bf72beb0af0545f481d74de67880512620&o="
        ],
        coords: { lat: 18.77281817701422, lng: 98.86192210424804 },
        mapLink: 'https://www.google.com/maps/place/โรงแรมฟลอร่า+ครีก+เชียงใหม่/@18.772676,98.8592667,17z',
        priceRange: "2,500 - 6,000+",
        minPrice: 2500,
        isFeatured: false,
        contact: {
            phone: "+66 52 001 400",
            email: "info@floracreekchiangmai.com",
            lineId: "floracreek",
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/flora-creek/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/flora-creek-chiang-mai.th.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/OM1MwCnGeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "โรงแรมฟลอร่า ครีก เชียงใหม่",
                location: "หางดง (กฤษดาดอยเก่า)",
                address: "90 หมู่ 4 ต.บ้านปง อ.หางดง จ.เชียงใหม่ 50230",
                desc: "บรรยากาศสวนดอกไม้เมืองหนาว และสถาปัตยกรรมสไตล์ยุโรป",
                roomStyle: "สไตล์โรงนาอังกฤษ (Barn House) ที่ดูอบอุ่นท่ามกลางสวนสวยและลำธาร",
                service: "พนักงานเป็นมิตร พื้นที่กว้างขวางเหมาะสำหรับการพักผ่อนแบบครอบครัว",
                policies: ["เช็คอิน 14:00 น.", "เช็คเอาท์ 12:00 น.", "ห้ามนำสัตว์เลี้ยงเข้าพัก", "เด็กอายุ 12 ปีขึ้นไปคิดราคาผู้ใหญ่"],
                amenities: ["สระว่ายน้ำ", "Pool Bar", "สปา Green House", "ฟิตเนส", "Wi-Fi ฟรี", "ที่จอดรถฟรี", "ร้านอาหาร 2 แห่ง", "สวนดอกไม้ 15 ไร่", "เช่าจักรยาน", "บริการสนามบิน", "บริการห้องพัก"],
                tags: ["Barn House", "สวนดอกไม้", "หางดง", "ยุโรป", "ครอบครัว", "กฤษดาดอย"],
            },
            en: {
                name: "Flora Creek Chiang Mai",
                location: "Hang Dong",
                address: "90 Moo 4, T. Banpong, Hang Dong, Chiang Mai 50230",
                desc: "Winter flower garden atmosphere with European-style architecture.",
                roomStyle: "Barn House style units set within beautifully landscaped gardens.",
                service: "Family-friendly with vast walking areas and helpful staff.",
                policies: ["Check-in from 14:00", "Check-out by 12:00", "No pets allowed", "Children 12+ charged as adults"],
                amenities: ["Swimming Pool", "Pool Bar", "Green House Spa", "Fitness Center", "Free Wi-Fi", "Free Parking", "2 Restaurants", "15-Rai Flower Garden", "Bike Rental", "Airport Transfer", "Room Service"],
                tags: ["barn house", "flower garden", "European style", "family", "Hang Dong"],
            },
            zh: {
                name: "清迈花溪酒店",
                location: "杭东",
                address: "清迈杭东班庞90号4村，邮编50230",
                desc: "置身于冬季花园的氛围中，建筑充满欧洲小镇风情。",
                roomStyle: "英式谷仓（Barn House）风格，在溪流与花园间显得格外温馨。",
                service: "员工非常友好，宽敞的空间非常适合家庭出游度假。",
                policies: ["入住时间 14:00", "退房时间 12:00", "不允许携带宠物", "12岁以上儿童按成人收费"],
                amenities: ["游泳池", "池畔酒吧", "温室水疗中心", "健身中心", "免费WiFi", "免费停车", "2 间餐厅", "15 莱花园", "自行车租赁", "机场接送", "客房服务"],
                tags: ["谷仓风格", "花卉园林", "欧式", "家庭", "杭东"],
            }
        }
    },

    {
        id: "15",
        slug: "proud-phu-fah-chiang-mai",
        type: "nature",
        starRating: 5,
        image: "https://i0.wp.com/gogogeng.com/wp-content/uploads/2024/05/DJI_0373-copy.webp?fit=1024%2C576&ssl=1",
        gallery: [
            "https://i0.wp.com/gogogeng.com/wp-content/uploads/2024/05/DJI_0373-copy.webp?fit=1024%2C576&ssl=1",
            "https://www.proudphufah.com/images/3657",
            "https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/20067839-9a7bd70d5d260ddc6a93abcdd3a7aded.jpeg?_src=imagekit&tr=c-at_max,h-720,q-40,w-1280"
        ],
        coords: { lat: 18.818656239261443, lng: 98.95162020206867 },
        mapLink: 'https://www.google.com/maps/place/พราวภูฟ้า+เมือง+เชียงใหม่/@18.8185141,98.9490399,17z',
        priceRange: "3,000 - 6,000+",
        minPrice: 3000,
        isFeatured: false,
        contact: {
            phone: "052-000-289",
            email: "reservation@proudphufah.com",
            lineId: "@proudphufah"
        },
        booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/proud-phu-fah-hotel/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/proud-phu-fah-muang-chiang-mai.th.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/rBlxy4qGeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "พราวภูฟ้า เมือง เชียงใหม่",
                location: "แม่ริม",
                address: "97/5 หมู่ 1 ถ.แม่ริม-สะเมิง ต.พงษ์แย้ง อ.แม่ริม จ.เชียงใหม่ 50180",
                desc: "รีสอร์ตแนว Hip & Green ที่เน้นความใกล้ชิดธรรมชาติและเสียงน้ำไหล",
                roomStyle: "ดีไซน์ปูนเปลือยผสมงานไม้ มีลำธารไหลผ่านห้องพัก ให้ความรู้สึกผ่อนคลาย",
                service: "การดูแลที่เป็นกันเองและอบอุ่น อาหารพื้นเมืองรสชาติดีเยี่ยม",
                policies: ["เช็คอิน 14:00 น.", "เช็คเอาท์ 12:00 น.", "อาหารเช้าฟรี", "บริการสนามบินล่วงหน้า 48 ชม."],
                amenities: ["สระว่ายน้ำ", "สระเด็ก", "สปา", "Wi-Fi ฟรี", "ที่จอดรถฟรี", "ร้านอาหาร", "เช่าจักรยาน", "นวดไทย", "คอร์สทำอาหาร", "บริการสนามบิน", "บริการห้องพัก", "ดาดฟ้าระเบียง"],
                tags: ["Hip & Green", "ลำธาร", "แม่ริม", "ปูนเปลือย", "ธรรมชาติ", "ผ่อนคลาย"],
            },
            en: {
                name: "Proud Phu Fah Chiang Mai",
                location: "Mae Rim",
                address: "97/5 Moo 1, Mae Rim-Samoeng Rd, T. Pong Yaeng, Mae Rim, Chiang Mai 50180",
                desc: "A 'Hip & Green' resort focused on nature and the soothing sounds of the stream.",
                roomStyle: "Raw concrete and wood design with a stream running through the property.",
                service: "Intimate and friendly service with delicious local cuisine.",
                policies: ["Check-in from 14:00", "Check-out by 12:00", "Free breakfast included", "Airport transfer requires 48 hours advance booking"],
                amenities: ["Swimming Pool", "Kids Pool", "Spa", "Free Wi-Fi", "Free Parking", "Restaurant", "Bike Rental", "Thai Massage", "Cooking Class", "Airport Transfer", "Room Service", "Rooftop Terrace"],
                tags: ["hip & green", "stream", "Mae Rim", "raw concrete", "nature"],
            },
            zh: {
                name: "普劳普法度假酒店",
                location: "湄林",
                address: "清迈湄林区蓬延村97/5号1村，清迈-沙蒙路，邮编50180",
                desc: "推崇时尚与绿色理念的度假村，强调亲近自然与溪水声。",
                roomStyle: "清水混凝土与木材的结合设计，客房旁有小溪流过，十分惬意。",
                service: "亲切温馨的服务，当地特色菜肴的味道非常棒。",
                policies: ["入住时间 14:00", "退房时间 12:00", "含免费早餐"],
                amenities: ["游泳池", "儿童游泳池", "水疗中心", "免费WiFi", "免费停车", "餐厅", "自行车租赁", "泰式按摩", "烹饪课程", "机场接送", "客房服务", "屋顶露台"],
                tags: ["时尚绿色", "溪流", "湄林", "清水混凝土", "自然"],
            }
        }
    },

    {
        id: "16",
        slug: "lannawild",
        type: "nature",
        starRating: 5,
        image: "https://f.ptcdn.info/432/066/000/pzg01c3d7dFX4K9uqk7-o.jpg",
        gallery: [
            "https://f.ptcdn.info/432/066/000/pzg01c3d7dFX4K9uqk7-o.jpg",
            "https://content.skyscnr.com/available/2294781858/2294781858_WxH.jpg",
            "https://q-xx.bstatic.com/xdata/images/hotel/max500/475157669.jpg?k=b0426252306f1eea0c549ef37ac9b1a5015b99d23d16dc9cb53d22e195f8b2e6&o="
        ],
        coords: { lat: 18.893170525501734, lng: 99.34997676219506 },
        mapLink: 'https://www.google.com/maps/place/Lannawild/@18.8930183,99.3472999,17z',
        priceRange: "4,000 - 8,000+",
        minPrice: 4000,
        isFeatured: false,
        contact: {
            phone: "+66 89 999 XXXX",
            email: "lannawild@gmail.com",
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/lannawild/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/lannawild.th.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/PWjYbm0HeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "ลานนาไวลด์",
                location: "แม่ออน",
                address: "2/2 หมู่ 1 ต.ห้วยแก้ว อ.แม่ออน จ.เชียงใหม่ 50130",
                desc: "ที่พักสไตล์แคมป์ปิ้งสุดหรู ซ่อนตัวอยู่ในป่าลึกใกล้แม่กำปอง",
                roomStyle: "Glamping ใช้วัสดุธรรมชาติ มีอ่างแช่น้ำร้อน Onsen ส่วนตัวชมวิวป่า",
                service: "เน้นความเป็นส่วนตัว มีบริการพนักงานช่วยขนสัมภาระเนื่องจากทางเข้าลาดชัน",
                policies: ["เช็คอิน 14:00 น.", "เช็คเอาท์ 12:00 น.", "รับเฉพาะเงินสด", "ห้ามนำสัตว์เลี้ยงเข้าพัก"],
                amenities: ["Onsen ส่วนตัว", "ร้านอาหาร", "Wi-Fi ฟรี", "ที่จอดรถฟรี", "บริการพนักงานขนสัมภาระ", "อาหารเช้า", "วิวภูเขา", "ระเบียงส่วนตัว", "มินิบาร์"],
                tags: ["Glamping", "Onsen", "แม่ออน", "แม่กำปอง", "ป่าลึก", "หรู", "ส่วนตัว"],
            },
            en: {
                name: "Lannawild",
                location: "Mae On",
                address: "2/2 Moo 1 T. Huai-Kaew, Mae On, Chiang Mai 50130",
                desc: "Luxury camping hideaway tucked deep in the forest near Mae Kampong.",
                roomStyle: "Eco-friendly glamping with private hot spring tubs and forest views.",
                service: "High privacy; staff assistance available for luggage and transport.",
                policies: ["Check-in from 14:00", "Check-out by 12:00", "Cash payment only", "No pets allowed"],
                amenities: ["Private Onsen", "Restaurant", "Free Wi-Fi", "Free Parking", "Luggage Assistance", "Breakfast", "Mountain View", "Private Terrace", "Mini Bar"],
                tags: ["glamping", "onsen", "Mae On", "Mae Kampong", "forest", "luxury", "private"],
            },
            zh: {
                name: "兰纳野奢酒店 (Lannawild)",
                location: "美安 (Mae On)",
                address: "清迈美安县怀开村2/2号1村，邮编50130",
                desc: "隐匿在美甘榜附近森林深处的豪华露营地。",
                roomStyle: "野奢风格，采用天然材料，房内配有私人森林景观温泉池。",
                service: "高度隐私，由于地势较陡，提供专业的行李搬运服务。",
                policies: ["入住时间 14:00", "退房时间 12:00", "仅接受现金支付", "不允许携带宠物"],
                amenities: ["私人温泉", "餐厅", "免费WiFi", "免费停车", "行李搬运", "早餐", "山景", "私人露台", "迷你吧"],
                tags: ["野奢", "温泉", "美安", "美甘榜", "森林", "豪华"],
            }
        }
    },

    {
        id: "17",
        slug: "the-chai-lai-orchid",
        type: "nature",
        starRating: 5,
        image: "https://lh3.googleusercontent.com/p/AF1QipNQkz1afYYlJSwq3_cFEfZGy0J7clO0zMXGcS0f=s680-w680-h510-rw",
        gallery: [
            "https://lh3.googleusercontent.com/p/AF1QipNQkz1afYYlJSwq3_cFEfZGy0J7clO0zMXGcS0f=s680-w680-h510-rw",
            "https://chailaiorchid.com/wp-content/uploads/2021/08/DSC0354.jpg",
            "https://chailaiorchid.com/wp-content/uploads/2023/12/Screenshot-2023-12-22-132358.png"
        ],
        coords: { lat: 18.658411973140215, lng: 98.63384946200773 },
        mapLink: 'https://www.google.com/maps/place/ไฉไล+ออ+คิด/@18.6582697,98.6311726,17z',
        priceRange: "2,000 - 4,000+",
        minPrice: 2000,
        isFeatured: false,
        contact: {
            phone: "082-660-2213",
            email: "explore@chailaiorchid.com",
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/chai-lai-orchid-mountain-h13427768/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/chai-lai-orchid.th.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/Dq8XxT7HeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "11:00",
        locales: {
            th: {
                name: "ไฉไล ออ คิด",
                location: "แม่วาง",
                address: "172 หมู่ 5 ต.แม่สาบ อ.แม่วาง จ.เชียงใหม่ 50360",
                desc: "ที่พักเชิงอนุรักษ์ที่ให้คุณได้ใกล้ชิดกับช้างในบรรยากาศป่าเขา",
                roomStyle: "Eco-lodge สไตล์พื้นเมือง เรียบง่ายแต่มีเสน่ห์ ไฮไลต์คือช้างมาปลุกถึงหน้าห้อง",
                service: "พนักงานท้องถิ่นอัธยาศัยดี รายได้สนับสนุนการดูแลช้างและชุมชน",
                policies: ["เช็คอิน 14:00 - 21:00 น.", "เช็คเอาท์ 11:00 น.", "ไม่มีสระว่ายน้ำ", "ไม่รวมอาหารเช้า"],
                amenities: ["Wi-Fi ฟรี", "ร้านอาหาร", "บริการรถรับส่ง", "กิจกรรมกับช้าง", "ลานบาร์บีคิว", "สวน", "ระเบียง"],
                tags: ["ช้าง", "อนุรักษ์", "Eco-lodge", "แม่วาง", "ธรรมชาติ", "ท่องเที่ยวรับผิดชอบ"],
            },
            en: {
                name: "The Chai Lai Orchid",
                location: "Mae Wang",
                address: "172 Moo 5 Mae Sapok, Mae Wang, Chiang Mai 50360",
                desc: "Eco-lodge offering an immersive experience with rescued elephants.",
                roomStyle: "Rustic eco-lodge where elephants can visit you for breakfast.",
                service: "Local staff with great hospitality; supports elephant conservation.",
                policies: ["Check-in 14:00 - 21:00", "Check-out by 11:00", "No pool on site", "Breakfast not included"],
                amenities: ["Free Wi-Fi", "Restaurant", "Shuttle Service", "Elephant Activities", "BBQ Area", "Garden", "Terrace"],
                tags: ["elephant", "conservation", "eco-lodge", "Mae Wang", "responsible travel"],
            },
            zh: {
                name: "柴来兰花 (The Chai Lai Orchid)",
                location: "美旺 (Mae Wang)",
                address: "清迈美旺区美沙博172号5村，邮编50360",
                desc: "生态保护型旅店，让住客在森林中与大象近距离接触。",
                roomStyle: "原生态木屋，简单却富有魅力，亮点是大象会来房间门口叫你起床。",
                service: "当地员工非常热情，部分收入用于大象保护和社区建设。",
                policies: ["入住时间 14:00 - 21:00", "退房时间 11:00", "无游泳池", "不含早餐"],
                amenities: ["免费WiFi", "餐厅", "班车服务", "大象活动", "烧烤区", "花园", "露台"],
                tags: ["大象", "保护", "生态旅馆", "美旺", "负责任旅游"],
            }
        }
    },

    {
        id: "18",
        slug: "mon-ing-dao-chiang-mai",
        type: "nature",
        starRating: 5,
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/6b/98/08/photo2jpg.jpg?w=900&h=500&s=1",
        gallery: [
            "https://moningdao.com/images/pic01.jpg",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/8f/a7/be/caption.jpg?w=900&h=500&s=1",
            "https://images.trvl-media.com/lodging/24000000/23960000/23954900/23954858/be98a19b.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
        ],
        coords: { lat: 18.935931977764238, lng: 98.81570371652519 },
        mapLink: 'https://www.google.com/maps/place/ม่อนอิงดาว/@18.9357189,98.8131556,17z',
        priceRange: "1,000 - 3,000+",
        minPrice: 1000,
        isFeatured: false,
        contact: {
            phone: "089-999-XXXX",
            email: "moningdao@gmail.com",
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/mon-ing-dao-h10752551/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/m-nduudaaw-mon-doo-dao.th.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/SSv3njEHeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "ม่อนอิงดาว",
                location: "ม่อนแจ่ม",
                address: "ม่อนแจ่ม อ.แม่ริม จ.เชียงใหม่ 50180",
                desc: "ที่พักรับลมหนาวบนดอยม่อนแจ่ม บรรยากาศเป็นกันเอง",
                roomStyle: "มีทั้งเต็นท์โดมใสและบ้านพักรับรอง ไฮไลต์คือการกินหมูกระทะดูดาว",
                service: "บริการแบบพื้นบ้าน เรียบง่าย สะดวกสบายตามสไตล์ที่พักบนดอย",
                policies: ["เช็คอิน 14:00 น.", "เช็คเอาท์ 12:00 น.", "อากาศหนาวเย็น แนะนำนำเสื้อกันหนาว"],
                amenities: ["Wi-Fi ฟรี", "ที่จอดรถ", "ร้านอาหาร", "โดมใสดูดาว", "หมูกระทะ", "วิวภูเขา"],
                tags: ["โดมดูดาว", "ม่อนแจ่ม", "หมูกระทะ", "ดอย", "อากาศหนาว", "บัดเจ็ท"],
            },
            en: {
                name: "Mon Ing Dao Chiang Mai",
                location: "Mon Jam",
                address: "Mon Jam, Mae Rim, Chiang Mai 50180",
                desc: "Chilly mountain-top stay at Mon Jam with a friendly atmosphere.",
                roomStyle: "Features dome tents and cottages; perfect for stargazing and Mookata.",
                service: "Simple, local-style service with essential amenities.",
                policies: ["Check-in from 14:00", "Check-out by 12:00", "Cool weather; bring warm clothes"],
                amenities: ["Free Wi-Fi", "Parking", "Restaurant", "Stargazing Dome", "Mookata Grill", "Mountain View"],
                tags: ["star dome", "Mon Jam", "Mookata", "mountain", "cool weather", "budget"],
            },
            zh: {
                name: "蒙音道酒店 (Mon Ing Dao)",
                location: "梦境山 (Mon Jam)",
                address: "梦境山，清迈湄林，邮编50180",
                desc: "梦境山上的高山避暑胜地，气氛轻松亲切。",
                roomStyle: "提供透明星空泡泡房和普通客房，亮点是看星空吃泰式火锅。",
                service: "提供简单的乡间风格服务，设施齐全且居住舒适。",
                policies: ["入住时间 14:00", "退房时间 12:00", "天气凉冷，请携带保暖衣物"],
                amenities: ["免费WiFi", "停车场", "餐厅", "观星穹顶", "泰式烧烤", "山景"],
                tags: ["星空泡泡房", "梦境山", "泰式火锅", "山地", "凉爽"],
            }
        }
    },

    {
        id: "19",
        slug: "rabeang-pasak-treehouse-resort",
        type: "nature",
        starRating: 3,
        image: "https://chiangmaipao.info/taxonline/images_files/1907%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%AA%E0%B8%B1%E0%B8%81.jpg",
        gallery: [
            "https://chiangmaipao.info/taxonline/images_files/1907%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%AA%E0%B8%B1%E0%B8%81.jpg",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/8d/54/4c/rabeang-house.jpg?w=900&h=500&s=1",
            "https://i0.wp.com/thailandtidbits.com/wp-content/uploads/2021/03/fb_img_1615717426919.jpg?resize=960%2C720&ssl=1"
        ],
        coords: { lat: 18.98405420716015, lng: 99.12396274618055 },
        mapLink: 'https://www.google.com/maps/place/Rabeang+Pasak+Treehouse+Resort/@18.9839325,99.1213288,17z',
        priceRange: "1,500 - 3,000+",
        minPrice: 1500,
        isFeatured: false,
        contact: {
            phone: "+66 93 040 6494",
            email: "ChiangmaiTreehouseResort@gmail.com",
            lineId: "ChiangmaiTreehouse",
        },
                booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/rabeang-pasak-tree-house-resort/hotel/chiang-mai-th.html"
            },
        ],
        checkIn: "16:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "บ้านต้นไม้ ระเบียงป่าสัก",
                location: "ดอยสะเก็ด",
                address: "บ้านป่าสักงาม ต.ลวงเหนือ อ.ดอยสะเก็ด จ.เชียงใหม่ 50220",
                desc: "บ้านต้นไม้ในฝันของคนรักธรรมชาติ ท่ามกลางป่าสักที่เงียบสงบ",
                roomStyle: "บ้านไม้บนต้นไม้จริงๆ มีหลายสไตล์และหลายความสูงให้เลือก",
                service: "ดูแลโดยเจ้าของที่เป็นสถาปนิก อบอุ่นเหมือนพักบ้านเพื่อน",
                policies: ["เช็คอิน 16:00 น. (ก่อนหน้าต้องแจ้งล่วงหน้า)", "เช็คเอาท์ 12:00 น.", "รับเฉพาะเงินสด", "ไม่มีสระว่ายน้ำ"],
                amenities: ["Wi-Fi ฟรี", "ที่จอดรถฟรี", "ร้านอาหาร", "บาร์", "เช่าจักรยานฟรี", "บริการสนามบิน", "สวน", "ระเบียง", "ซักรีด"],
                tags: ["บ้านต้นไม้", "ป่าสัก", "ดอยสะเก็ด", "สถาปนิก", "ธรรมชาติ", "ครอบครัว"],
            },
            en: {
                name: "Rabeang Pasak Treehouse Resort",
                location: "Doi Saket",
                address: "Pasak Ngam Village, Luang Neua, Doi Saket, Chiang Mai 50220",
                desc: "A dream destination for nature lovers set in a quiet teak forest.",
                roomStyle: "Authentic treehouses with various heights and unique designs.",
                service: "Family-run by architects, providing a warm, home-like feel.",
                policies: ["Check-in from 16:00 (late check-in by prior arrangement)", "Check-out by 12:00", "Cash payment only", "No pool on site"],
                amenities: ["Free Wi-Fi", "Free Parking", "Restaurant", "Bar", "Free Bike Rental", "Airport Transfer", "Garden", "Terrace", "Laundry Service"],
                tags: ["treehouse", "teak forest", "Doi Saket", "architect", "nature", "family"],
            },
            zh: {
                name: "拉宾帕萨树屋度假村",
                location: "堆沙革 (Doi Saket)",
                address: "清迈堆沙革区北隆村帕萨旮村，邮编50220",
                desc: "大自然爱好者的梦幻树屋，坐落在宁静的柚木森林中。",
                roomStyle: "真正的树顶木屋，有多种高度和风格各异的设计可供选择。",
                service: "由建筑师庄主亲自打理，像住在老朋友家一样温馨。",
                policies: ["入住时间 16:00 起", "退房时间 12:00 前", "仅接受现金支付", "无游泳池"],
                amenities: ["免费WiFi", "免费停车", "餐厅", "酒吧", "免费自行车租赁", "机场接送", "花园", "露台", "洗衣服务"],
                tags: ["树屋", "柚木森林", "堆沙革", "建筑师", "自然", "家庭"],
            }
        }
    },

    {
        id: "20",
        slug: "onsen-at-moncham",
        type: "nature",
        starRating: 5,
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/40/60/8c/caption.jpg?w=900&h=500&s=1",
        gallery: [
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/40/60/8c/caption.jpg?w=900&h=500&s=1",
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/fb/7e/13/onsen-at-moncham.jpg?w=700&h=-1&s=1",
            "https://images.trvl-media.com/lodging/24000000/23320000/23315600/23315532/cfa8720e.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
        ],
        coords: { lat: 18.92539975967112, lng: 98.82277902938038 },
        mapLink: 'https://www.google.com/maps/place/ONSEN+AT+MONCHAM+ออนเซ็นแอทม่อนแจ่ม/@18.9253592,98.820188,17z/data=!4m10!3m9!1s0x30da4088d94e332f:0x43667a73d39ba7d6!5m3!1s2026-05-20!4m1!1i2!8m2!3d18.9253592!4d98.8227683!16s%2Fg%2F11f3xnj6jw?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D',
        priceRange: "8,000 - 20,000+",
        minPrice: 8000,
        isFeatured: true,
        contact: {
            phone: "+66 53 111 606",
            email: "reservations@onsenmoncham.com",
        },
        booking: [
            {
                platform: "Agoda",
                link: "https://www.agoda.com/onsen-moncham/hotel/chiang-mai-th.html"
            },
            {
                platform: "Booking",
                link: "https://www.booking.com/hotel/th/onsen-moncham.en-gb.html"
            },
            {
                platform: "Trip.com",
                link: "https://www.trip.com/w/gz8t0xOHeU2"
            }
        ],
        checkIn: "14:00",
        checkOut: "12:00",
        locales: {
            th: {
                name: "ออนเซ็นแอทม่อนแจ่ม",
                location: "ม่อนแจ่ม",
                address: "293 หมู่ 2 ต.พงษ์แย้ง อ.แม่ริม จ.เชียงใหม่ 50180",
                desc: "สัมผัสประสบการณ์เรียวกังญี่ปุ่นแท้ๆ ท่ามกลางอากาศหนาวของม่อนแจ่ม",
                roomStyle: "สไตล์ญี่ปุ่น (Ryokan) มีเสื่อทัตตามิและบ่อออนเซ็นส่วนตัวในห้องพัก",
                service: "บริการนอบน้อมระดับพรีเมียม สวมชุดยูกาตะและลิ้มรสอาหารญี่ปุ่นเกรดเอ",
                policies: ["เช็คอิน 14:00 - 23:30 น.", "เช็คเอาท์ 12:00 น.", "Onsen เปิด 07:00 - 21:45 น.", "บัตรเครดิตและบัตรประชาชนที่เช็คอิน"],
                amenities: ["Onsen ส่วนตัวในห้อง", "Onsen สาธารณะ 3 แห่ง", "สปา", "ฟิตเนส", "Wi-Fi ฟรี", "ที่จอดรถฟรี", "ร้านอาหารญี่ปุ่น Mi Zu", "บาร์ Sake", "Izakaya", "บริการสนามบิน", "บริการห้องพัก", "Karesansui Garden", "ยูกาตะ"],
                tags: ["Ryokan", "Onsen", "ญี่ปุ่น", "ม่อนแจ่ม", "แม่ริม", "ลักชัวรี", "ฮันนีมูน", "ทัตตามิ"],
            },
            en: {
                name: "ONSEN AT MONCHAM",
                location: "Mon Jam",
                address: "293 Moo 2, Tambon Pong Yaeng, Amphoe Mae Rim, Chiang Mai 50180",
                desc: "Authentic Japanese Ryokan experience in the cool mountains of Mon Jam.",
                roomStyle: "Ryokan style with tatami mats and private mineral water onsens.",
                service: "Premium hospitality; yukatas provided and top-tier Japanese cuisine.",
                policies: ["Check-in 14:00 - 23:30", "Check-out by 12:00", "Onsen open 07:00 - 21:45", "Photo ID and credit card required"],
                amenities: ["Private In-Room Onsen", "3 Public Onsens", "Spa", "Fitness Center", "Free Wi-Fi", "Free Parking", "Japanese Restaurant Mi Zu", "Sake Bar", "Izakaya", "Airport Transfer", "Room Service", "Karesansui Garden", "Yukata Robes"],
                tags: ["ryokan", "onsen", "Japanese", "Mon Jam", "luxury", "honeymoon", "tatami"],
            },
            zh: {
                name: "梦境山温泉酒店",
                location: "梦境山 (Mon Jam)",
                address: "清迈湄林区蓬延村293号2村，邮编50180",
                desc: "在梦境山的凉爽气候中体验正宗的日式旅馆温泉服务。",
                roomStyle: "日式风格，房内铺有榻榻米，并配有私人矿物温泉池。",
                service: "高端日式礼遇，可穿着浴衣并享用顶级日式料理。",
                policies: ["入住时间 14:00 - 23:30", "退房时间 12:00", "温泉开放时间 07:00 - 21:45"],
                amenities: ["私人温泉", "公共温泉 3 个", "水疗", "健身中心", "免费WiFi", "免费停车", "日式餐厅 Mi Zu", "清酒吧", "居酒屋", "机场接送", "客房服务", "枯山水花园", "浴衣"],
                tags: ["旅馆", "温泉", "日式", "梦境山", "豪华", "蜜月", "榻榻米"],
            }
        }
    },
];