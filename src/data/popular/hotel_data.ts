export type Hotel = {
    id: string;
    slug: string;
    type: 'city' | 'hotel' | 'nature' | 'riverside';
    image: string;
    rating: number;
    priceRange: string;
    locales: {
        [key: string]: {
            name: string;
            location: string;
            desc: string;
            roomStyle: string;
            service: string;
        }
    }
};

export const hotelData: Hotel[] = [
    {
        id: "01",
        slug: "u-nimman-chiang-mai",
        type: "city",
        image: "",
        rating: 4.8,
        priceRange: "2,500 - 5,000+",
        locales: {
            th: {
                name: "โรงแรมยูนิมมาน เชียงใหม่",
                location: "แยกรินคำ ถนนนิมมานฯ",
                desc: "ตกแต่งสไตล์ร่วมสมัยผสมผสานล้านนาประยุกต์ ตั้งอยู่ทำเลทองใจกลางนิมมานฯ",
                roomStyle: "สไตล์ร่วมสมัยผสมล้านนาประยุกต์ ไฮไลต์คือสระว่ายน้ำบนดาดฟ้าวิวดอยสุเทพ",
                service: "นโยบาย Check-in เวลาไหน Check-out เวลานั้น (พักได้เต็ม 24 ชม.)"
            },
            en: {
                name: "U Nimman Chiang Mai",
                location: "Nimman Road",
                desc: "Contemporary Lanna style hotel located in the heart of Nimman.",
                roomStyle: "Modern Lanna fusion with a rooftop pool overlooking Doi Suthep.",
                service: "24-hour use of room policy (Check-out at the same time as Check-in)."
            },
            zh: {
                name: "清迈宁曼U酒店",
                location: "宁曼路",
                desc: "融合现代与兰纳元素的精品酒店，坐落于宁曼路核心商圈。",
                roomStyle: "现代兰纳融合风格，亮点是俯瞰素贴山的屋顶无边泳池。",
                service: "24小时客房使用政策（无论何时入住，均可住满24小时再退房）。"
            }
        }
    },
    {
        id: "02",
        slug: "the-inside-house",
        type: "city",
        image: "",
        rating: 4.9,
        priceRange: "5,000 - 15,000+",
        locales: {
            th: {
                name: "ดิ อินไซด์ เฮ้าส์",
                location: "เขตคูเมืองเชียงใหม่",
                desc: "บูติกโฮเทลสีขาวล้วนสไตล์โคโลเนียลล้านนา สวยงามและมีความเป็นส่วนตัวสูง",
                roomStyle: "สไตล์โคโลเนียลล้านนา บางห้องมีสระว่ายน้ำกระจกใสส่วนตัว (Glass Pool)",
                service: "บริการแบบส่วนตัว พนักงานจำชื่อแขกได้ มี Afternoon tea ให้บริการ"
            },
            en: {
                name: "The Inside House",
                location: "Old City Chiang Mai",
                desc: "Pure white Colonial Lanna boutique hotel with high privacy.",
                roomStyle: "Colonial Lanna style, some rooms feature a private Glass Pool.",
                service: "Highly personalized service with complimentary Afternoon Tea."
            },
            zh: {
                name: "因赛德之家酒店",
                location: "清迈古城内",
                desc: "纯白色调的兰纳殖民时期风格精品酒店，精致且极具隐私感。",
                roomStyle: "兰纳殖民风，部分客房拥有独特的私人玻璃透明泳池。",
                service: "贴心的管家式服务，提供精致的下午茶服务。"
            }
        }
    },
    {
        id: "03",
        slug: "tamarind-village",
        type: "city",
        image: "",
        rating: 4.7,
        priceRange: "4,000 - 8,000+",
        locales: {
            th: {
                name: "แทมมาริน วิลเลจ",
                location: "ในคูเมืองเชียงใหม่",
                desc: "ซ่อนตัวอยู่ในคูเมือง ทางเข้าเป็นอุโมงค์ต้นไผ่ ร่มรื่นและเงียบสงบ",
                roomStyle: "สไตล์ล้านนาชนบทที่ดูหรูหรา มีความเป็นไม้และผ้าทอมือพื้นเมือง",
                service: "ให้ความรู้สึกเหมือนพักบ้านญาติผู้ใหญ่ อาหารเช้าแบบพื้นเมืองอร่อยมาก"
            },
            en: {
                name: "Tamarind Village",
                location: "Old City Chiang Mai",
                desc: "A secret sanctuary in the heart of the old city with a bamboo tunnel entrance.",
                roomStyle: "Elegant rustic Lanna style featuring wood and local hand-woven fabrics.",
                service: "Feels like staying with family; exceptional local-style breakfast."
            },
            zh: {
                name: "塔玛琳村酒店",
                location: "清迈古城内",
                desc: "隐藏在古城中的宁静绿洲，入口处有著名的竹林隧道。",
                roomStyle: "雅致的兰纳乡村风格，大量使用木材和当地手工织物。",
                service: "给人宾至如归的温馨感，当地风味的早餐非常美味。"
            }
        }
    },
    {
        id: "04",
        slug: "melia-chiang-mai",
        type: "city",
        image: "",
        rating: 4.6,
        priceRange: "4,000 - 7,000+",
        locales: {
            th: {
                name: "โรงแรมมีเลีย เชียงใหม่",
                location: "ใกล้แม่น้ำปิง/ไนท์บาซาร์",
                desc: "โรงแรมตึกสูงตกแต่งโมเดิร์นเรียบหรู พร้อมรูฟท็อปบาร์ชมวิวเมือง 360 องศา",
                roomStyle: "โมเดิร์นเรียบหรู ห้องกว้างขวาง มี Mai The Sky Bar ชมวิวเมือง",
                service: "มาตรฐานโรงแรมระดับโลกจากสเปน มีความเป็นมืออาชีพสูง"
            },
            en: {
                name: "Melia Chiang Mai",
                location: "Near Ping River / Night Bazaar",
                desc: "Modern luxury high-rise hotel featuring a 360-degree rooftop city view bar.",
                roomStyle: "Sleek and spacious modern rooms with access to 'Mai The Sky Bar'.",
                service: "International standards from Spain with high professionalism."
            },
            zh: {
                name: "清迈美利亚酒店",
                location: "近萍河/夜市",
                desc: "现代简约豪华的高层酒店，拥有可360度俯瞰全城的屋顶酒吧。",
                roomStyle: "现代奢华风格，客房宽敞，设有Mai The Sky Bar景观台。",
                service: "源自西班牙的世界级酒店标准，服务极具专业水准。"
            }
        }
    },
    {
        id: "05",
        slug: "anantara-chiang-mai",
        type: "riverside",
        image: "",
        rating: 4.9,
        priceRange: "8,000 - 20,000+",
        locales: {
            th: {
                name: "อนันตรา เชียงใหม่ รีสอร์ท",
                location: "ริมแม่น้ำปิง",
                desc: "รีสอร์ตหรูตัวอาคารหลักเคยเป็นสถานกงสุลอังกฤษเก่า คลาสสิกและอบอุ่น",
                roomStyle: "ดีไซน์ผสมผสานไม้และกระจกดูอบอุ่น สระว่ายน้ำริมน้ำที่สวยงาม",
                service: "หรูหรา ไร้ที่ติ มีสปาระดับพรีเมียมและบัตเลอร์ดูแลริมสระ"
            },
            en: {
                name: "Anantara Chiang Mai Resort",
                location: "Riverside",
                desc: "Luxury resort where the main building was once the British Consulate.",
                roomStyle: "Warm wood and glass design with a stunning riverside infinity pool.",
                service: "Flawless luxury service with a premium spa and poolside butlers."
            },
            zh: {
                name: "清迈安纳塔拉度假酒店",
                location: "萍河畔",
                desc: "奢华度假村，主楼曾是英国领事馆，具有古典而温馨的氛围。",
                roomStyle: "木材与玻璃结合的温馨设计，拥有绝美的河畔泳池。",
                service: "无可挑剔的奢华服务，提供顶级SPA和池畔管家服务。"
            }
        }
    },
    {
        id: "06",
        slug: "137-pillars-house",
        type: "hotel",
        image: "",
        rating: 5.0,
        priceRange: "15,000 - 30,000+",
        locales: {
            th: {
                name: "137 Pillars House Chiang Mai",
                location: "ย่านวัดเกต",
                desc: "บ้านพักไม้สักโบราณอายุกว่าร้อยปี รีโนเวทเป็นวิลล่าหรูระดับ Ultra-Luxury",
                roomStyle: "ห้องพักกว้างมาก มีอ่างอาบน้ำสไตล์วิกตอเรียนและระเบียงกว้าง",
                service: "มีบัตเลอร์ส่วนตัวคอยดูแล 24 ชั่วโมง บริการเหนือระดับทุกรายละเอียด"
            },
            en: {
                name: "137 Pillars House Chiang Mai",
                location: "Wat Ket District",
                desc: "A century-old teak wood house renovated into an ultra-luxury boutique villa.",
                roomStyle: "Extremely spacious suites with Victorian baths and wide terraces.",
                service: "24-hour private butler service providing top-tier attention to detail."
            },
            zh: {
                name: "清迈137柱府酒店",
                location: "瓦凯区 (Wat Ket)",
                desc: "拥有百年历史的古老柚木建筑，现已翻修为顶级奢华别墅。",
                roomStyle: "客房极其宽敞，配备维多利亚风格浴缸和宽大阳台。",
                service: "24小时私人管家服务，在每一个细节上都追求极致。"
            }
        }
    },
    {
        id: "07",
        slug: "cross-chiang-mai-riverside",
        type: "riverside",
        image: "",
        rating: 4.7,
        priceRange: "4,000 - 10,000+",
        locales: {
            th: {
                name: "ครอสเชียงใหม่ริเวอร์ไซด์",
                location: "ริมแม่น้ำปิง",
                desc: "ดีไซน์อิฐมอญสีแดงตัดกับความโมเดิร์น โดดเด่นริมฝั่งน้ำ",
                roomStyle: "มีห้องพักแบบ Pool Suite พร้อมสระว่ายน้ำส่วนตัวในห้อง",
                service: "อาหารเช้าเสิร์ฟแชมเปญแบบไม่อั้น บริการทันสมัยและเป็นกันเอง"
            },
            en: {
                name: "Cross Chiang Mai Riverside",
                location: "Riverside",
                desc: "Modern design using red brick contrast, standing out on the riverbank.",
                roomStyle: "Features Pool Suites with private indoor plunge pools.",
                service: "Sparkling wine breakfast and modern, friendly hospitality."
            },
            zh: {
                name: "清迈河畔克罗斯酒店",
                location: "萍河畔",
                desc: "红砖设计与现代风格完美碰撞，坐落在迷人的河岸边。",
                roomStyle: "提供泳池套房，房内设有私人私人泳池。",
                service: "提供无限量香槟早餐，服务风格现代化且充满活力。"
            }
        }
    },
    {
        id: "08",
        slug: "sireeampan-boutique",
        type: "hotel",
        image: "",
        rating: 4.8,
        priceRange: "6,000 - 12,000+",
        locales: {
            th: {
                name: "สิรีอำพัน บูติค",
                location: "ใกล้ศูนย์ประชุมนานาชาติ",
                desc: "บูติกรีสอร์ตที่จำลองคฤหาสน์ไทยสมัยศตวรรษที่ 18 เป็นส่วนตัวขั้นสุด",
                roomStyle: "คฤหาสน์ไทยหรู มีเพียง 11 ห้อง ให้ความรู้สึกเหมือนบ้านพักส่วนตัว",
                service: "เสิร์ฟอาหารเช้าแบบ Anytime Anywhere ทานที่ไหนเมื่อไหร่ก็ได้"
            },
            en: {
                name: "Sireeampan Boutique Resort & Spa",
                location: "Near International Convention Centre",
                desc: "A luxury boutique resort recreating an 18th-century Thai manor for ultimate privacy.",
                roomStyle: "Exclusive Lanna manor with only 11 rooms, giving a private home feel.",
                service: "Signature 'Anytime Anywhere' breakfast served whenever and wherever you like."
            },
            zh: {
                name: "希里安潘精品度假酒店",
                location: "近国际会展中心",
                desc: "模仿18世纪泰国豪宅设计的精品度假村，极具隐私感。",
                roomStyle: "奢华泰式宅邸，仅有11间客房，营造私人住宅般的氛围。",
                service: "特色“随时随地”早餐服务，可在任何时间地点享用。"
            }
        }
    },
    {
        id: "09",
        slug: "raya-heritage",
        type: "riverside",
        image: "",
        rating: 4.9,
        priceRange: "8,000 - 15,000+",
        locales: {
            th: {
                name: "รายา เฮอริเทจ",
                location: "ริมแม่น้ำปิง (โซนแม่ริม)",
                desc: "คอนเซปต์งานคราฟต์และการพักผ่อนที่แท้จริง เน้นโทนสีธรรมชาติ",
                roomStyle: "เน้นงานฝีมือ Earth tone ห้องหันหน้าออกแม่น้ำปิงทุกห้อง",
                service: "เน้นความเงียบสงบ บริการนุ่มนวลตามสไตล์ชาวเหนือ"
            },
            en: {
                name: "Raya Heritage",
                location: "Riverside (Mae Rim Zone)",
                desc: "A craft-inspired concept focusing on true relaxation and natural tones.",
                roomStyle: "Artisan-focused earth tone design; all rooms are river-facing.",
                service: "Emphasizes tranquility with gentle, northern-style hospitality."
            },
            zh: {
                name: "拉雅传承酒店",
                location: "萍河畔 (湄林区)",
                desc: "以手工艺为核心概念，强调真正的放松，采用大地色调设计。",
                roomStyle: "注重手工艺细节，全客房均面向萍河。",
                service: "环境极其幽静，提供泰北式的温柔贴心服务。"
            }
        }
    },
    {
        id: "10",
        slug: "kao-mai-lanna",
        type: "nature",
        image: "",
        rating: 4.5,
        priceRange: "1,500 - 3,000+",
        locales: {
            th: {
                name: "เก๊าไม้ล้านนา รีสอร์ท",
                location: "สันป่าตอง",
                desc: "ดัดแปลงโรงบ่มยาสูบเก่าให้กลายเป็นห้องพัก มีไม้เลื้อยปกคลุมทั่วอาคาร",
                roomStyle: "ฟีลบ้านสวนคลาสสิก โรงบ่มยาสูบเก่าที่รีโนเวทได้อย่างสวยงาม",
                service: "อบอุ่น เป็นกันเอง มีพื้นที่สีเขียวขนาดใหญ่ให้เดินเล่น"
            },
            en: {
                name: "Kao Mai Lanna Resort",
                location: "San Pa Tong",
                desc: "Converted historic tobacco curing barns covered in lush creeping vines.",
                roomStyle: "Classic garden feel; beautifully renovated tobacco barns.",
                service: "Warm and friendly atmosphere with vast green spaces to explore."
            },
            zh: {
                name: "考迈兰纳度假村",
                location: "杭东-三巴东",
                desc: "由旧烟草烘干厂改建而成，建筑全身覆盖着绿色的爬墙虎。",
                roomStyle: "经典的古典花园感，烘干厂旧址翻修得非常有特色。",
                service: "温馨友好，拥有大片绿地供住客漫步放松。"
            }
        }
    },
    {
        id: "11",
        slug: "four-seasons-resort-chiang-mai",
        type: "nature",
        image: "",
        rating: 5.0,
        priceRange: "20,000 - 50,000+",
        locales: {
            th: {
                name: "โฟร์ซีซั่นส์ รีสอร์ท เชียงใหม่",
                location: "แม่ริม",
                desc: "รีสอร์ตสุดหรูท่ามกลางทุ่งนาขั้นบันไดและขุนเขา บรรยากาศเงียบสงบและสง่างาม",
                roomStyle: "ศาลาไทยสไตล์ล้านนาหรูหรา ตั้งอยู่ท่ามกลางแลนด์สเคปทุ่งนาและทะเลสาบ",
                service: "บริการระดับโลก พร้อมกิจกรรมอย่างโยคะริมนา ดำนา หรืออาบน้ำควาย"
            },
            en: {
                name: "Four Seasons Resort Chiang Mai",
                location: "Mae Rim",
                desc: "Luxury resort set among terraced rice fields and mountains, offering peace and elegance.",
                roomStyle: "Luxurious Lanna-style pavilions overlooking rice paddies and a lake.",
                service: "World-class service with unique activities like rice planting and buffalo bathing."
            },
            zh: {
                name: "清迈四季酒店",
                location: "湄林",
                desc: "坐落在梯田与山脉间的顶级度假村，环境静谧优雅。",
                roomStyle: "奢华的兰纳风情阁楼，置身于稻田与湖泊美景中。",
                service: "世界级水准服务，提供稻田瑜伽、插秧及给水牛洗澡等体验。"
            }
        }
    },
    {
        id: "12",
        slug: "veranda-high-resort-chiang-mai",
        type: "nature",
        image: "",
        rating: 4.8,
        priceRange: "4,000 - 10,000+",
        locales: {
            th: {
                name: "โรงแรมวีรันดา ไฮ รีสอร์ท เชียงใหม่",
                location: "หางดง - สะเมิง",
                desc: "รีสอร์ตดีไซน์ทันสมัยที่ผสมผสานกับธรรมชาติได้อย่างลงตัว โดดเด่นด้วยวิวสระว่ายน้ำ",
                roomStyle: "สไตล์โมเดิร์นร่วมสมัย ห้องกว้างขวาง เน้นเปิดรับวิวภูเขาและ Infinity Pool",
                service: "มาตรฐานระดับ MGallery พนักงานดูแลดีเยี่ยม เหมาะสำหรับคู่รักฮันนีมูน"
            },
            en: {
                name: "Veranda High Resort Chiang Mai - MGallery",
                location: "Hang Dong - Samoeng",
                desc: "Modern design meets nature, featuring an iconic rooftop infinity pool.",
                roomStyle: "Contemporary style with spacious rooms and panoramic mountain views.",
                service: "Accor MGallery standards, exceptional care, perfect for honeymoons."
            },
            zh: {
                name: "清迈维兰达高地度假酒店",
                location: "杭东-萨蒙路",
                desc: "现代设计与大自然的完美结合，以无边际泳池景观闻名。",
                roomStyle: "现代风格客房，宽敞明亮，享有山峦全景。",
                service: "雅高美憬阁（MGallery）标准，非常适合蜜月旅行。"
            }
        }
    },
    {
        id: "13",
        slug: "panviman-chiang-mai-spa-resort",
        type: "nature",
        image: "",
        rating: 4.7,
        priceRange: "3,000 - 8,000+",
        locales: {
            th: {
                name: "ปานวิมาน เชียงใหม่ สปา รีสอร์ท",
                location: "แม่ริม",
                desc: "รีสอร์ตบนยอดเขาสูง วิวสวยอลังการเหมือนอยู่บนวิมานตามชื่อ",
                roomStyle: "พูลวิลล่าตามแนวเขา ตกแต่งสไตล์ไทยหรู ไฮไลต์คือสปาในถ้ำที่โดดเด่น",
                service: "บริการด้วยใจ มีรถกอล์ฟรับส่งอำนวยความสะดวกทั่วรีสอร์ตตลอด 24 ชม."
            },
            en: {
                name: "Panviman Chiang Mai Spa Resort",
                location: "Mae Rim",
                desc: "High-altitude resort offering 'heavenly' panoramic views of the valley.",
                roomStyle: "Pool villas built along the hillside and a famous cave spa.",
                service: "Attentive service with 24-hour golf cart shuttle around the resort."
            },
            zh: {
                name: "清迈盼维曼水疗度假酒店",
                location: "湄林",
                desc: "位于山顶的度假村，景观壮丽，仿佛置身于人间天堂。",
                roomStyle: "依山而建的泳池别墅，泰式华丽装修，亮点是独特的洞穴水疗。",
                service: "贴心服务，提供24小时接驳高尔夫球车穿梭度假村内。"
            }
        }
    },
    {
        id: "14",
        slug: "flora-creek-chiang-mai",
        type: "nature",
        image: "",
        rating: 4.6,
        priceRange: "2,500 - 6,000+",
        locales: {
            th: {
                name: "โรงแรมฟลอร่า ครีก เชียงใหม่",
                location: "หางดง (กฤษดาดอยเก่า)",
                desc: "บรรยากาศสวนดอกไม้เมืองหนาว และสถาปัตยกรรมสไตล์ยุโรป",
                roomStyle: "สไตล์โรงนาอังกฤษ (Barn House) ที่ดูอบอุ่นท่ามกลางสวนสวยและลำธาร",
                service: "พนักงานเป็นมิตร พื้นที่กว้างขวางเหมาะสำหรับการพักผ่อนแบบครอบครัว"
            },
            en: {
                name: "Flora Creek Chiang Mai",
                location: "Hang Dong",
                desc: "Winter flower garden atmosphere with European-style architecture.",
                roomStyle: "Barn House style units set within beautifully landscaped gardens.",
                service: "Family-friendly with vast walking areas and helpful staff."
            },
            zh: {
                name: "清迈花溪酒店",
                location: "杭东",
                desc: "置身于冬季花园的氛围中，建筑充满欧洲小镇风情。",
                roomStyle: "英式谷仓（Barn House）风格，在溪流与花园间显得格外温馨。",
                service: "员工非常友好，宽敞的空间非常适合家庭出游度假。"
            }
        }
    },
    {
        id: "15",
        slug: "proud-phu-fah-chiang-mai",
        type: "nature",
        image: "",
        rating: 4.7,
        priceRange: "3,000 - 6,000+",
        locales: {
            th: {
                name: "พราวภูฟ้า เมือง เชียงใหม่",
                location: "แม่ริม",
                desc: "รีสอร์ตแนว Hip & Green ที่เน้นความใกล้ชิดธรรมชาติและเสียงน้ำไหล",
                roomStyle: "ดีไซน์ปูนเปลือยผสมงานไม้ มีลำธารไหลผ่านห้องพัก ให้ความรู้สึกผ่อนคลาย",
                service: "การดูแลที่เป็นกันเองและอบอุ่น อาหารพื้นเมืองรสชาติดีเยี่ยม"
            },
            en: {
                name: "Proud Phu Fah Chiang Mai",
                location: "Mae Rim",
                desc: "A 'Hip & Green' resort focused on nature and the soothing sounds of the stream.",
                roomStyle: "Raw concrete and wood design with a stream running through the property.",
                service: "Intimate and friendly service with delicious local cuisine."
            },
            zh: {
                name: "普劳普法度假酒店",
                location: "湄林",
                desc: "推崇“时尚与绿色”理念的度假村，强调亲近自然与溪水声。",
                roomStyle: "清水混凝土与木材的结合设计，客房旁有小溪流过，十分惬意。",
                service: "亲切温馨的服务，当地特色菜肴的味道非常棒。"
            }
        }
    },
    {
        id: "16",
        slug: "lannawild",
        type: "nature",
        image: "",
        rating: 4.8,
        priceRange: "4,000 - 8,000+",
        locales: {
            th: {
                name: "ลานนาไวลด์",
                location: "แม่ออน",
                desc: "ที่พักสไตล์แคมป์ปิ้งสุดหรู ซ่อนตัวอยู่ในป่าลึกใกล้แม่กำปอง",
                roomStyle: "Glamping ใช้วัสดุธรรมชาติ มีอ่างแช่น้ำร้อน Onsen ส่วนตัวชมวิวป่า",
                service: "เน้นความเป็นส่วนตัว มีบริการพนักงานช่วยขนสัมภาระเนื่องจากทางเข้าลาดชัน"
            },
            en: {
                name: "Lannawild",
                location: "Mae On",
                desc: "Luxury camping hideaway tucked deep in the forest near Mae Kampong.",
                roomStyle: "Eco-friendly glamping with private hot spring tubs and forest views.",
                service: "High privacy; staff assistance available for luggage and transport."
            },
            zh: {
                name: "兰纳野奢酒店 (Lannawild)",
                location: "美安 (Mae On)",
                desc: "隐匿在美甘榜附近森林深处的豪华露营地。",
                roomStyle: "野奢风格，采用天然材料，房内配有私人森林景观温泉池。",
                service: "高度隐私，由于地势较陡，提供专业的行李搬运服务。"
            }
        }
    },
    {
        id: "17",
        slug: "the-chai-lai-orchid",
        type: "nature",
        image: "",
        rating: 4.7,
        priceRange: "2,000 - 4,000+",
        locales: {
            th: {
                name: "ไฉไล ออ คิด",
                location: "แม่วาง",
                desc: "ที่พักเชิงอนุรักษ์ที่ให้คุณได้ใกล้ชิดกับช้างในบรรยากาศป่าเขา",
                roomStyle: "Eco-lodge สไตล์พื้นเมือง เรียบง่ายแต่มีเสน่ห์ ไฮไลต์คือช้างมาปลุกถึงหน้าห้อง",
                service: "พนักงานท้องถิ่นอัธยาศัยดี รายได้สนับสนุนการดูแลช้างและชุมชน"
            },
            en: {
                name: "The Chai Lai Orchid",
                location: "Mae Wang",
                desc: "Eco-lodge offering an immersive experience with rescued elephants.",
                roomStyle: "Rustic eco-lodge where elephants can visit you for breakfast.",
                service: "Local staff with great hospitality; supports elephant conservation."
            },
            zh: {
                name: "ไฉไล兰花酒店 (The Chai Lai Orchid)",
                location: "美旺 (Mae Wang)",
                desc: "生态保护型旅店，让住客在森林中与大象近距离接触。",
                roomStyle: "原生态木屋，简单却富有魅力，亮点是大象会来房间门口叫你起床。",
                service: "当地员工非常热情，部分收入用于大象保护和社区建设。"
            }
        }
    },
    {
        id: "18",
        slug: "mon-ing-dao-chiang-mai",
        type: "nature",
        image: "",
        rating: 4.5,
        priceRange: "1,000 - 3,000+",
        locales: {
            th: {
                name: "ม่อนอิงดาว",
                location: "ม่อนแจ่ม",
                desc: "ที่พักรับลมหนาวบนดอยม่อนแจ่ม บรรยากาศเป็นกันเอง",
                roomStyle: "มีทั้งเต็นท์โดมใสและบ้านพักรับรอง ไฮไลต์คือการกินหมูกระทะดูดาว",
                service: "บริการแบบพื้นบ้าน เรียบง่าย สะดวกสบายตามสไตล์ที่พักบนดอย"
            },
            en: {
                name: "Mon Ing Dao Chiang Mai",
                location: "Mon Jam",
                desc: "Chilly mountain-top stay at Mon Jam with a friendly atmosphere.",
                roomStyle: "Features dome tents and cottages; perfect for stargazing and Mookata.",
                service: "Simple, local-style service with essential amenities."
            },
            zh: {
                name: "蒙音道酒店 (Mon Ing Dao)",
                location: "梦境山 (Mon Jam)",
                desc: "梦境山上的高山避暑胜地，气氛轻松亲切。",
                roomStyle: "提供透明星空泡泡房和普通客房，亮点是看星空吃泰式火锅。",
                service: "提供简单的乡间风格服务，设施齐全且居住舒适。"
            }
        }
    },
    {
        id: "19",
        slug: "rabeang-pasak-treehouse-resort",
        type: "nature",
        image: "",
        rating: 4.6,
        priceRange: "1,500 - 3,000+",
        locales: {
            th: {
                name: "บ้านต้นไม้ ระเบียงป่าสัก",
                location: "ดอยสะเก็ด",
                desc: "บ้านต้นไม้ในฝันของคนรักธรรมชาติ ท่ามกลางป่าสักที่เงียบสงบ",
                roomStyle: "บ้านไม้บนต้นไม้จริงๆ มีหลายสไตล์และหลายความสูงให้เลือก",
                service: "ดูแลโดยเจ้าของที่เป็นสถาอัปนิก อบอุ่นเหมือนพักบ้านเพื่อน"
            },
            en: {
                name: "Rabeang Pasak Treehouse Resort",
                location: "Doi Saket",
                desc: "A dream destination for nature lovers set in a quiet teak forest.",
                roomStyle: "Authentic treehouses with various heights and unique designs.",
                service: "Family-run by architects, providing a warm, home-like feel."
            },
            zh: {
                name: "拉宾帕萨树屋度假村",
                location: "堆沙革 (Doi Saket)",
                desc: "大自然爱好者的梦幻树屋，坐落在宁静的柚木森林中。",
                roomStyle: "真正的树顶木屋，有多种高度和风格各异的设计可供选择。",
                service: "由建筑师庄主亲自打理，像住在老朋友家一样温馨。"
            }
        }
    },
    {
        id: "20",
        slug: "onsen-at-moncham",
        type: "nature",
        image: "",
        rating: 4.9,
        priceRange: "8,000 - 20,000+",
        locales: {
            th: {
                name: "ออนเซ็นแอทม่อนแจ่ม",
                location: "ม่อนแจ่ม",
                desc: "สัมผัสประสบการณ์เรียวกังญี่ปุ่นแท้ๆ ท่ามกลางอากาศหนาวของม่อนแจ่ม",
                roomStyle: "สไตล์ญี่ปุ่น (Ryokan) มีเสื่อทัตตามิและบ่อออนเซ็นส่วนตัวในห้องพัก",
                service: "บริการนอบน้อมระดับพรีเมียม สวมชุดยูกาตะและลิ้มรสอาหารญี่ปุ่นเกรดเอ"
            },
            en: {
                name: "ONSEN AT MONCHAM",
                location: "Mon Jam",
                desc: "Authentic Japanese Ryokan experience in the cool mountains of Mon Jam.",
                roomStyle: "Ryokan style with tatami mats and private mineral water onsens.",
                service: "Premium hospitality; yukatas provided and top-tier Japanese cuisine."
            },
            zh: {
                name: "梦境山温泉酒店",
                location: "梦境山 (Mon Jam)",
                desc: "在梦境山的凉爽气候中体验正宗的日式旅馆温泉服务。",
                roomStyle: "日式风格，房内铺有榻榻米，并配有私人矿物温泉池。",
                service: "高端日式礼遇，可穿着浴衣并享用顶级日式料理。"
            }
        }
    }
];