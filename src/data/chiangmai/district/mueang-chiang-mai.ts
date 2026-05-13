import { tag } from "@turf/turf";
import { t } from "../../essentials";

export const MueangChiangMaiTrips = [
  {
    id: "Wat-Phra-That-Doi-Suthep",
    title: {
      en: "Wat Phra That Doi Suthep",
      zh: "素贴山双龙寺 (Wat Phra That Doi Suthep)",
      th: "วัดพระธาตุดอยสุเทพ"
    },
    price: {
      en: "Temple entry free. Foreigner fee for upper temple area may apply.",
      zh: "寺庙免费进入，外国游客进入主塔区域可能需购票。",
      th: "คนไทยเข้าฟรี ค่าเข้าชมสำหรับชาวต่างชาติ 30 บาท"
    },
    hours: {
      en: "Daily 06:00 - 20:00",
      zh: "每天 06:00 - 20:00",
      th: "เปิดทุกวัน 06:00 - 20:00 น."
    },
    detail: {
      en: "The most iconic temple in Chiang Mai, located on Doi Suthep mountain with panoramic city views. A must-visit for first-time travelers.",
      zh: "清迈最具代表性的寺庙，位于素贴山上，可俯瞰清迈全景，是首次到访清迈的必去景点。",
      th: "วัดที่เป็นเอกลักษณ์ที่สุดในเชียงใหม่ ตั้งอยู่บนดอยสุเทพพร้อมจุดชมวิวเมืองแบบพาโนรามา สถานที่ที่นักท่องเที่ยวที่มาเยือนเชียงใหม่ครั้งแรกไม่ควรพลาด"
    },
    tag: {
      th: "วัด",
      en: "temple",
      zh: "寺庙"
    },
    detail_more: {
      location: "ตำบลสุเทพ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200",
      lat: 18.804853662014455, 
      lng: 98.92143680296009,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Wat-Chedi-Luang",
    title: {
      en: "Wat Chedi Luang",
      zh: "契迪龙寺 (Wat Chedi Luang)",
      th: "วัดเจดีย์หลวงสังกัด"
    },
    price: {
      en: "Foreigner: around 50 THB",
      zh: "外国游客约 50 泰铢",
      th: "ชาวต่างชาติ: ประมาณ 50 บาท (ชาวไทยเข้าฟรี)"
    },
    hours: {
      en: "Daily 06:00 - 18:00",
      zh: "每天 06:00 - 18:00",
      th: "เปิดทุกวัน 06:00 - 18:00 น."
    },
    detail: {
      en: "A historic temple in the old city, famous for its massive ancient chedi and Lanna architecture.",
      zh: "位于古城内的历史名寺，以巨大的古塔和兰纳建筑风格闻名。",
      th: "วัดเก่าแก่ในเขตเมืองเก่า มีชื่อเสียงจากองค์เจดีย์โบราณขนาดใหญ่และสถาปัตยกรรมล้านนา"
    },
    tag: {
      th: "วัด",
      en: "temple",
      zh: "寺庙"
    },
    detail_more: {
      location: "QXPP+QCQ 103 ถ. พระปกเกล้า ตำบลศรีภูมิ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200",
      lat: 18.786983036298537, 
      lng: 98.98745453580554,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Wat-Phra-Singh",
    title: {
      en: "Wat Phra Singh",
      zh: "帕辛寺 (Wat Phra Singh)",
      th: "วัดพระสิงห์วรมหาวิหาร"
    },
    price: {
      en: "Temple grounds free. Museum/building tickets may apply.",
      zh: "寺庙区域免费，部分殿堂或博物馆可能需购票。",
      th: "เดินชมรอบวัดฟรี ค่าเข้าชมส่วนพิพิธภัณฑ์หรือวิหารอาจมีค่าบริการสำหรับชาวต่างชาติ"
    },
    hours: {
      en: "Daily 06:00 - 20:00",
      zh: "每天 06:00 - 20:00",
      th: "เปิดทุกวัน 06:00 - 20:00 น."
    },
    detail: {
      en: "One of Chiang Mai's most important temples, known for classic Lanna art and peaceful atmosphere.",
      zh: "清迈最重要的寺庙之一，以传统兰纳艺术和宁静氛围著称。",
      th: "หนึ่งในวัดที่สำคัญที่สุดของเชียงใหม่ โดดเด่นด้วยศิลปะล้านนาที่งดงามคลาสสิกและบรรยากาศเงียบสงบ"
    },
    tag: {
      th: "วัด",
      en: "temple",
      zh: "寺庙"
    },
    detail_more: {
      location: "2 ถนน สามล้าน ตำบลศรีภูมิ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200",
      lat: 18.78852212145972, 
      lng: 98.98221548603019,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Tha-Phae-Gate",
    title: {
      en: "Tha Phae Gate",
      zh: "塔佩门 (Tha Phae Gate)",
      th: "ประตูท่าแพ"
    },
    price: {
      en: "Free Admission",
      zh: "免费入场",
      th: "เข้าชมฟรี"
    },
    hours: {
      en: "Open all day",
      zh: "全天开放",
      th: "เปิดตลอดวัน"
    },
    detail: {
      en: "A landmark gate of Chiang Mai Old City, popular for city walks, local events, and photography.",
      zh: "清迈古城地标城门，适合步行游览、参加活动和拍照打卡。",
      th: "ประตูเมืองประวัติศาสตร์ของเมืองคูเมืองเชียงใหม่ จุดเด่นสำหรับนักท่องเที่ยวที่มาเดินเล่น ถ่ายรูปกับนกพิราบ และร่วมกิจกรรมในท้องถิ่น"
    },
    tag: {
      th: "สถาปัตยกรรม",
      en: "architecture",
      zh: "建筑"
    },
    detail_more: {
      location: "ถ. ท่าแพ ตำบลช้างคลาน อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200",
      lat: 18.787723059580635, 
      lng: 98.9934398090893,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Chiang-Mai-Night-Bazaar",
    title: {
      en: "Chiang Mai Night Bazaar",
      zh: "清迈夜市 (Night Bazaar)",
      th: "เชียงใหม่ไนท์บาซ่าร์"
    },
    price: {
      en: "Free entry (Pay for food, shopping, and activities)",
      zh: "免费进入（餐饮、购物和活动另计）",
      th: "เข้าฟรี (จ่ายเฉพาะค่าอาหาร เดินช้อปปิ้ง และกิจกรรม)"
    },
    hours: {
      en: "Daily 17:00 - 23:00",
      zh: "每天 17:00 - 23:00",
      th: "เปิดทุกวัน 17:00 - 23:00 น."
    },
    detail: {
      en: "A famous evening market with street food, souvenirs, handicrafts, and live entertainment.",
      zh: "清迈知名夜间市场，汇集街头美食、纪念品、手工艺品和现场表演。",
      th: "ตลาดกลางคืนที่มีชื่อเสียง เพียบพร้อมไปด้วยสตรีทฟู้ด ของที่ระลึก งานฝีมือ และการแสดงสดต่างๆ มากมาย"
    },
    tag: {
      th: "ตลาด",
      en: "market",
      zh: "市场"
    },
    detail_more: {
      location: "ถ. ช้างคลาน ตำบล ช้างม่อย อำเภอเมืองเชียงใหม่ เชียงใหม่ 50100",
      lat: 18.785197080467, 
      lng: 99.00038438802805,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Three-Kings-Monument",
    title: {
      en: "Three Kings Monument",
      zh: "三王纪念碑 (Three Kings Monument)",
      th: "อนุสาวรีย์สามกษัตริย์"
    },
    price: {
      en: "Free Admission",
      zh: "免费入场",
      th: "เข้าชมฟรี"
    },
    hours: {
      en: "Open 24 hours",
      zh: "24小时开放",
      th: "เปิดตลอด 24 ชั่วโมง"
    },
    detail: {
      en: "A bronze monument dedicated to King Mengrai, King Ramkhamhaeng, and King Ngam Muang, the founding fathers of Chiang Mai. The monument is situated in a spacious square, often used for cultural festivals, and is surrounded by historical buildings and museums.",
      zh: "这座铜像纪念了共同建立清迈的三位国王：孟莱王、兰甘亨大帝和南蒙王。纪念碑位于一个宽敞的广场上，经常举办文化节日活动，周围环绕着历史建筑和博物馆。",
      th: "อนุสาวรีย์ทองสัมฤทธิ์ที่สร้างขึ้นเพื่อรำลึกถึงพญามังราย พญาร่วง และพญางำเมือง ผู้ร่วมก่อตั้งเมืองเชียงใหม่ ตั้งอยู่ในลานกว้าง มักใช้เป็นสถานที่จัดงานวัฒนธรรมและเทศกาลต่างๆ รายล้อมไปด้วยอาคารประวัติศาสตร์และพิพิธภัณฑ์ร่วมสมัย"
    },
    tag: {
      th: "สถาปัตยกรรม",
      en: "architecture",
      zh: "建筑"
    },
    detail_more: {
      location: "QXRP+3WX ถ. พระปกเกล้า ตำบลศรีภูมิ อำเภอเมืองเชียงใหม่ เชียงใหม่ 50200",
      lat: 18.79023847080222, 
      lng: 98.98750143372312,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  }
];