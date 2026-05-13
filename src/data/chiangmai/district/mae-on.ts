import { tag } from "@turf/turf";

export const MaeOnTrips = [
  {
    id: "Mae-Kampong-Village",
    title: {
      en: "Mae Kampong Village",
      zh: "美康蓬村 (Mae Kampong Village)",
      th: "หมู่บ้านแม่กำปอง"
    },
    price: {
      en: "Free to enter village (homestay/activity costs vary)",
      zh: "村庄免费进入（民宿与活动费用另计）",
      th: "เข้าหมู่บ้านฟรี (ค่าโฮมสเตย์/กิจกรรม คิดแยกต่างหาก)"
    },
    hours: {
      en: "Open all day",
      zh: "全天开放",
      th: "เปิดตลอดวัน"
    },
    detail: {
      en: "A charming mountain village known for cool weather, local cafes, and traditional homestay experiences.",
      zh: "山间小村，气候凉爽，以在地咖啡馆和传统民宿体验闻名。",
      th: "หมู่บ้านบนเขาทีมีสเน่ห์ โดดเด่นด้วยอากาศที่เย็นสบาย คาเฟ่ท้องถิ่นชิคๆ และสัมผัสประสบการณ์โฮมสเตย์แบบดั้งเดิม"
    },
    tag: {
      th: "ชุมชน",
      en: "community",
      zh: "社区"
    },
    detail_more: {
      location: "V982+695 ตำบล ห้วยแก้ว อำเภอ แม่ออน เชียงใหม่ 50130",
      lat: 18.8653706, 
      lng: 99.3512625,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "San-Kamphaeng-Hot-Springs",
    title: {
      en: "San Kamphaeng Hot Springs",
      zh: "山甘烹温泉 (San Kamphaeng Hot Springs)",
      th: "น้ำพุร้อนสันกำแพง"
    },
    price: {
      en: "Park entry and bath services have separate fees",
      zh: "园区门票与泡汤服务分开计费",
      th: "ค่าบัตรกิจกรรมแช่น้ำแร่คิดแยกต่างหาก"
    },
    hours: {
      en: "Daily 07:00 - 18:00",
      zh: "每天 07:00 - 18:00",
      th: "เปิดทุกวัน 07:00 - 18:00 น."
    },
    detail: {
      en: "A relaxing geothermal park where visitors can soak feet, boil eggs in hot spring pools, and enjoy nature.",
      zh: "适合放松的地热公园，可泡脚、煮温泉蛋，并享受自然环境。",
      th: "สวนความร้อนใต้พิภพที่ให้คุณได้ผ่อนคลาย สามารถแช่เท้า ต้มไข่ประชดความร้อน และดื่มด่ำกับธรรมชาติ"
    },
    tag: {
      th: "ธรรมชาติ",
      en: "nature",
      zh: "自然"
    },
    detail_more: {
      location: "1 ตำบล บ้านสหกรณ์ อำเภอ แม่ออน เชียงใหม่ 50130",
      lat: 18.8145004, 
      lng: 99.2294265,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Kew-Fin-Viewpoint",
    title: {
      en: "Kew Fin Viewpoint",
      zh: "Kew Fin 观景点",
      th: "จุดชมวิวกิ่วฝิ่น"
    },
    price: {
      en: "Free Admission",
      zh: "免费入场",
      th: "เข้าชมฟรี"
    },
    hours: {
      en: "Best at sunrise (access depends on local transport)",
      zh: "建议日出时前往（交通依当地安排）",
      th: "ดีที่สุดตอนพระอาทิตย์ขึ้น (การเดินทางขึ้นอยู่กับบริการในพื้นที่)"
    },
    detail: {
      en: "A popular viewpoint near Mae Kampong, known for sea-of-mist mornings and mountain panoramas.",
      zh: "靠近美康蓬的人气观景点，以清晨云海和山景全景闻名。",
      th: "จุดชมวิวยอดนิยมใกล้แม่กำปอง มีชื่อเสียงเรื่องทะเลหมอกยามเช้าและวิวภูเขาแบบพาโนรามา"
    },
    tag: {
      th: "ธรรมชาติ",
      en: "nature",
      zh: "自然"
    },
    detail_more: {
      location: "อุทยานแห่งชาติแจ้ซ้อน ตำบล แจ้ซ้อน อำเภอ เมืองปาน เชียงใหม่ 52240",
      lat: 18.8545595, 
      lng: 99.3685236,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Teen-Tok-Royal-Project-Development-Center",
    title: {
      en: "Teen Tok Royal Project Development Center",
      zh: "Teen Tok 皇家发展中心",
      th: "ศูนย์พัฒนาโครงการหลวงตีนตก"
    },
    price: {
      en: "Free Admission",
      zh: "免费入场",
      th: "เข้าชมฟรี"
    },
    hours: {
      en: "Daily (check local notice for detailed timing)",
      zh: "每日开放（详细时间请参考现场公告）",
      th: "ตรวจสอบป้ายประกาศท้องถิ่นสำหรับรายละเอียดเวลา"
    },
    detail: {
      en: "A Royal Project area focused on local agriculture, community products, and sustainable mountain tourism.",
      zh: "皇家项目示范区域，结合高地农业、社区产品与可持续旅游。",
      th: "พื้นที่โครงการหลวงซึ่งมุ่งเน้นการเกษตรดั้งเดิม ผลิตภัณฑ์ชุมชน และการท่องเที่ยวบนภูเขาอย่างยั่งยืน"
    },
    tag: {
      th: "ชุมชน",
      en: "community",
      zh: "社区"
    },
    detail_more: {
      location: "99/5 หมู่ที่8 ถนน ห้วยแก้ว ตำบล ห้วยแก้ว อำเภอ แม่ออน เชียงใหม่ 50130",
      lat: 18.8669089, 
      lng: 99.3225066,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  },
  {
    id: "Muang-On-Cave",
    title: {
      en: "Muang On Cave",
      zh: "孟安洞 (Muang On Cave)",
      th: "ถ้ำเมืองออน"
    },
    price: {
      en: "Please check at entrance",
      zh: "请在入口处确认门票",
      th: "กรุณาสอบถามที่จุดจำหน่ายตั๋ว"
    },
    hours: {
      en: "Daily 08:00 – 17:00",
      zh: "每天 08:00 – 17:00",
      th: "เปิดทุกวัน 08:00 – 17:00 น."
    },
    detail: {
      en: "Tham Muang On is not far from San Kamphaeng Hot Springs. It is a cave under a limestone mountain with stalactites and stalagmites that have naturally emerged. It is also home to Phra That Nom Pha, a stalagmite containing the hair of the Lord Buddha, which is very uniquely beautiful because it is not a pagoda created by human hands, but rather by natural phenomena.",
      zh: "孟安洞距离山甘烹温泉不远。这是一座位于石灰岩山下的洞穴，拥有自然形成的钟乳石和石笋。这里还供奉着包含佛陀头发的石笋“Phra That Nom Pha”，它非常独特美丽，因为它不是人类建造的佛塔，而是自然现象的杰作。",
      th: "ถ้ำเมืองออนอยู่ไม่ไกลจากน้ำพุร้อนสันกำแพง เป็นถ้ำที่อยู่ภายใต้ภูเขาหินปูน มีหินงอกหินย้อยที่เกิดขึ้นเองตามธรรมชาติ และยังเป็นที่ประดิษฐาน พระธาตุนมผา ซึ่งเป็นหินย้อยที่บรรจุพระเกศาของพระพุทธเจ้า มีความสวยงามแปลกตามาก เนื่องจากไม่ได้เกิดจากมนุษย์ แต่เกิดจากธรรมชาติ"
    },
    tag: {
      th: "ธรรมชาติ",
      en: "nature",
      zh: "自然"
    },
    detail_more: {
      location: "Q6PQ+G6P ตำบล บ้านสหกรณ์ อำเภอ แม่ออน เชียงใหม่ 50130", 
      lat: 18.7863323, 
      lng: 99.2354941,
      img: "",
      gallery: [
      ],
      video: "",
      credit: ""
    }
  }
];