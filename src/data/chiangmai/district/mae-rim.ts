import { tag } from "@turf/turf";
import { th } from "framer-motion/client";

export const MaeRimTrips = [
  {
    id: "Mae-Sa-Waterfall",
    title: {
      en: "Mae Sa Waterfall",
      zh: "湄沙瀑布 (Mae Sa Waterfall)",
      th: "น้ำตกแม่สา"
    },
    price: {
      en: "Foreigner: Adults 100 THB, Children 50 THB",
      zh: "外国人：成人 100 泰铢，儿童 50 泰铢",
      th: "ชาวต่างชาติ: ผู้ใหญ่ 100 บาท, เด็ก 50 บาท (ชาวไทย: ผู้ใหญ่ 20 บาท, เด็ก 10 บาท)"
    },
    hours: {
      en: "Daily 08:00 - 16:30",
      zh: "每天 08:00 - 16:30",
      th: "เปิดทุกวัน 08:00 - 16:30 น."
    },
    detail: {
      en: "Mae Sa Waterfall is a famous 10-tiered waterfall in Chiang Mai. With water flowing all year round, it is a perfect spot for swimming, cooling off, and picnicking amidst nature.",
      zh: "湄沙瀑布是清迈著名的瀑布，共有10层。这里终年流水不断，景色优美，非常适合游泳、避暑以及在自然中野餐。",
      th: "น้ำตกแม่สาเป็นน้ำตก 10 ชั้นที่มีชื่อเสียงในเชียงใหม่ มีน้ำไหลตลอดทั้งปี เหมาะสำหรับการเล่นน้ำ คลายร้อน และปิกนิกท่ามกลางธรรมชาติ"
    },
    tag: {
      th: "ธรรมชาติ",
      en: "nature",
      zh: "自然"
    },
    detail_more: {
      location: "WV4X+H63 ซอย น้ำตกแม่สา 4 ตำบล แม่แรม อำเภอแม่ริม เชียงใหม่ 50180",
      lat: 18.9061569, 
      lng: 98.8960827,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Mae-Sa-Elephant-Camp",
    title: {
      en: "Mae Sa Elephant Camp",
      zh: "湄沙大象营 (Mae Sa Elephant Camp)",
      th: "ปางช้างแม่สา"
    },
    price: {
      en: "Starting from 300 THB",
      zh: "起价 300 泰铢",
      th: "ราคาเริ่มต้นที่ 300 บาท"
    },
    hours: {
      en: "Daily 09:30 - 15:30",
      zh: "每天 09:30 - 15:30",
      th: "เปิดทุกวัน 09:30 - 15:30 น."
    },
    detail: {
      en: "One of the largest elephant camps in Northern Thailand. Visitors can experience the cuteness of elephants through activities like bathing, feeding, watching painting demonstrations, and learning about the life of a mahout.",
      zh: "泰北最大的大象营之一。游客可以通过给大象洗澡、喂食、观看大象绘画表演以及体验象夫生活等活动，近距离接触可爱的大象。",
      th: "ปางช้างที่ใหญ่ที่สุดแห่งหนึ่งในภาคเหนือของไทย นักท่องเที่ยวสามารถสัมผัสความน่ารักของช้างผ่านกิจกรรมต่างๆ เช่น อาบน้ำให้ช้าง ป้อนอาหาร ชมการสาธิตการวาดภาพ และเรียนรู้วิถีชีวิตของควาญช้าง"
    },
    tag: {
      th: "สัตว์",
      en: "animal",
      zh: "动物"
    },
    detail_more: {
      location: "101 ตำบล แม่แรม อำเภอแม่ริม เชียงใหม่ 50230",
      lat: 18.8998083, 
      lng: 98.8754329,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Pongyang-Jungle-Coaster-Zipline-Camp-&Resort",
    title: {
      en: "Pongyang Jungle Coaster & Zipline",
      zh: "博岩丛林过山车与滑索 (Pongyang Jungle Coaster)",
      th: "โป่งแยง จังเกิ้ล โคสเตอร์ แอนด์ ซิปไลน์"
    },
    price: {
      en: "Starting from 350 THB (depending on package)",
      zh: "起价 350 泰铢（视套餐而定）",
      th: "เริ่มต้นที่ 350 บาท (ขึ้นอยู่กับแพ็กเกจกิจกรรม)"
    },
    hours: {
      en: "Daily 08:00 - 20:00",
      zh: "每天 08:00 - 20:00",
      th: "เปิดทุกวัน 08:00 - 20:00 น."
    },
    detail: {
      en: "Home to the famous 'Jungle Coaster', a thrilling wooden rail coaster that speeds through the forest. Other activities include ziplining, giant swings, and the 'Quick Jump' (similar to bungee jumping from 14 meters).",
      zh: "这里拥有著名的“丛林过山车”，让您在森林中体验过山车的刺激快感。此外还有丛林滑索、巨型秋千以及类似蹦极的“Quick Jump”（14米高空跳跃）等挑战项目。",
      th: "สถานที่ตั้งของ 'Jungle Coaster' เครื่องเล่นรถไฟเหาะรางไม้สุดมันส์ที่แล่นผ่านป่า กิจกรรมอื่นๆ ได้แก่ ซิปไลน์ ชิงช้ายักษ์ และ 'Quick Jump' (คล้ายบันจี้จัมพ์จากความสูง 14 เมตร)"
    },
    tag: {
      th: "กิจกรรม",
      en: "activity",
      zh: "活动"
    },
    detail_more: {
      location: "99 9 ตำบล โป่งแยง อำเภอแม่ริม เชียงใหม่ 50180",
      lat: 18.9167205, 
      lng: 98.8216974,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Tiger-Kingdom-Mae-Rim",
    title: {
      en: "Tiger Kingdom Mae Rim",
      zh: "老虎王国 (Tiger Kingdom)",
      th: "คุ้มเสือ แม่ริม"
    },
    price: {
      en: "Starting from 1,300 THB (depending on tiger size)",
      zh: "起价 1,300 泰铢（视老虎体型而定）",
      th: "เริ่มต้นที่ 1,300 บาท (ขึ้นอยู่กับขนาดของเสือ)"
    },
    hours: {
      en: "Daily 09:00 - 17:00",
      zh: "每天 09:00 - 17:00",
      th: "เปิดทุกวัน 09:00 - 17:00 น."
    },
    detail: {
      en: "Get up close with tigers of various sizes, from cubs to full-grown adults. The tigers here are not chained but kept in enclosures where visitors can enter to take photos under staff supervision.",
      zh: "动物爱好者可以在这里与真老虎近距离接触。这里有从幼崽到成年大虎等不同体型的老虎。老虎并未被铁链锁住，游客可以在工作人员陪同下进入笼内拍照互动。",
      th: "สัมผัสเสืออย่างใกล้ชิดในขนาดต่างๆ ตั้งแต่ลูกเสือไปจนถึงเสือโตเต็มวัย เสือที่นี่ไม่ได้ถูกล่ามโซ่ แต่จะอยู่ในกรงล้อม นักท่องเที่ยวสามารถเข้าไปถ่ายรูปได้ภายใต้การดูแลของเจ้าหน้าที่"
    },
    tag: {
      th: "สัตว์",
      en: "animal",
      zh: "动物"
    },
    detail_more: {
      location: "51/1 หมู่ที่ 7 ถนน แม่ริม - สะเมิง ตำบล ริมใต้ อำเภอแม่ริม เชียงใหม่ 50180",
      lat: 18.9249445, 
      lng: 98.9318453,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Wat-Pa-Dara-Phirom",
    title: {
      en: "Wat Pa Dara Phirom",
      zh: "帕达拉披龙寺 (Wat Pa Dara Phirom)",
      th: "วัดป่าดาราภิรมย์"
    },
    price: {
      en: "Free Admission",
      zh: "免费入场",
      th: "เข้าชมฟรี"
    },
    hours: {
      en: "Daily 08:00 - 18:00",
      zh: "每天 08:00 - 18:00",
      th: "เปิดทุกวัน 08:00 - 18:00 น."
    },
    detail: {
      en: "A Royal Monastery of significant beauty. Originally an abandoned cemetery near Princess Dara Rasmi's palace, it was transformed into a magnificent temple featuring exquisite Lanna architecture.",
      zh: "这是一座皇家寺庙，原为达拉·拉萨米王妃宫殿附近的墓地。寺庙建筑精美，充满了兰纳艺术风格，是清迈非常值得参拜的寺庙之一。",
      th: "พระอารามหลวงที่มีความงดงามยิ่ง เดิมเป็นสุสานร้างใกล้กับพระตำหนักดาราภิรมย์ของเจ้าดารารัศมี พระราชชายา ได้รับการปรับปรุงจนกลายเป็นวัดที่โดดเด่นด้วยสถาปัตยกรรมล้านนาที่วิจิตรงดงาม"
    },
    tag: {
      th: "วัด",
      en: "temple",
      zh: "寺庙"
    },
    detail_more: {
      location: "WW6R+7GJ ตำบล ริมใต้ อำเภอแม่ริม เชียงใหม่ 50180",
      lat: 18.911194, 
      lng: 98.941194,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Huay-Thung-Thao",
    title: {
      en: "Huay Tung Tao Reservoir",
      zh: "惠登陶水库 (Huay Tung Tao)",
      th: "อ่างเก็บน้ำห้วยตึงเฒ่า"
    },
    price: {
      en: "50 THB/person",
      zh: "50 泰铢/人",
      th: "50 บาท/ท่าน"
    },
    hours: {
      en: "Daily 08:00 - 18:30",
      zh: "每天 08:00 - 18:30",
      th: "เปิดทุกวัน 08:00 - 18:30 น."
    },
    detail: {
      en: "A scenic reservoir perfect for relaxation. Highlights include giant King Kong straw sculptures for photos, waterfront bamboo huts for dining, and pedal boats for leisure on the lake.",
      zh: "一个风景优美的大型水库。这里的亮点是巨大的金刚稻草雕塑，非常适合拍照。游客可以在水边的竹屋用餐，或者租脚踏船在湖上游玩。",
      th: "อ่างเก็บน้ำที่มีทัศนียภาพอันงดงาม เหมาะสำหรับการพักผ่อน ไฮไลท์รวมถึงหุ่นฟางคิงคองยักษ์สำหรับถ่ายรูป ซุ้มไม้ไผ่ริมน้ำสำหรับรับประทานอาหาร และจักรยานน้ำให้เช่าปั่นบนทะเลสาบ"
    },
    tag: {
      th: "ธรรมชาติ",
      en: "nature",
      zh: "自然"
    },
    detail_more: {
      location: "ตำบล ดอนแก้ว อำเภอแม่ริม เชียงใหม่ 50180",
      lat: 18.8675364, 
      lng: 98.9387502,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Princess-Sirindhorn-AstroPark",
    title: {
      en: "Princess Sirindhorn AstroPark",
      zh: "诗琳通天文公园 (AstroPark)",
      th: "อุทยานดาราศาสตร์สิรินธร"
    },
    price: {
      en: "Free Admission (Planetarium show fee applies)",
      zh: "免费入场（天文馆观影需付费）",
      th: "เข้าชมฟรี (มีค่าเข้าชมท้องฟ้าจำลอง)"
    },
    hours: {
      en: "Tue-Fri 09:00-16:00, Sat-Sun 10:00-17:00 (Closed Mondays)",
      zh: "周二至周五 09:00-16:00，周末 10:00-17:00（周一闭馆）",
      th: "อังคาร-ศุกร์ 09:00-16:00 น., เสาร์-อาทิตย์ 10:00-17:00 น. (ปิดวันจันทร์)"
    },
    detail: {
      en: "Headquarters of the National Astronomical Research Institute of Thailand (NARIT). It features astronomy exhibitions, a digital planetarium, and an observatory. A great educational spot for families and science lovers.",
      zh: "泰国国家天文研究所（NARIT）总部所在地。园内设有天文展览、数字天文馆以及天文台。这是一个适合家庭和科学爱好者学习天文知识的好地方。",
      th: "สำนักงานใหญ่สถาบันวิจัยดาราศาสตร์แห่งชาติ (NARIT) นำเสนอนิทรรศการดาราศาสตร์ ท้องฟ้าจำลองดิจิทัล และหอดูดาว เป็นสถานที่เรียนรู้ที่ยอดเยี่ยมสำหรับครอบครัวและผู้ที่รักวิทยาศาสตร์"
    },
    tag: {
      th: "กิจกรรม",
      en: "activity",
      zh: "活动"
    },
    detail_more: {
      location: "260 อำเภอแ ม่ริม ตำบล ดอนแก้ว อำเภอแม่ริม เชียงใหม่ 50180",
      lat: 18.8527479, 
      lng: 98.9572773,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  }
];