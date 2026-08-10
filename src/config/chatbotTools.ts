// src/config/chatbotTools.ts
export const chatbotTools = [
  {
    type: "function",
    function: {
      name: "searchProducts",
      description: "ใช้สำหรับค้นหาสินค้า OTOP ของฝาก หรือของที่ระลึกในเชียงใหม่ เมื่อผู้ใช้ถามถึงสินค้าประเภทต่างๆ หรือต้องการหาซื้อของฝาก",
      parameters: {
        type: "object",
        properties: {
          keyword: { type: "string", description: "คำค้นหาหลักเกี่ยวกับสินค้า เช่น น้ำผึ้ง, ผ้าฝ้าย, แคบหมู" }
        },
        required: ["keyword"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "searchTouristPlaces",
      description: "ใช้สำหรับค้นหาสถานที่ท่องเที่ยวในเชียงใหม่ โดยระบุชื่อโซนหรือคีย์เวิร์ดพื้นที่เพื่อค้นหาในรัศมีรอบๆ",
      parameters: {
        type: "object",
        properties: {
          locationKeyword: { type: "string", description: "คำระบุพิกัดหรือโซนพื้นที่ เช่น คูเมือง, นิมมาน, ท่าแพ, แม่ริม" },
          tag: { type: "string", description: "แท็กประเภทการท่องเที่ยว เช่น วัด, ธรรมชาติ" }
        },
        required: ["locationKeyword"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "searchRestaurants",
      description: "ใช้สำหรับค้นหาร้านอาหาร ร้านกาแฟ หรือคาเฟ่ในเชียงใหม่ตามโซนพื้นที่เพื่อแนะนำที่กิน",
      parameters: {
        type: "object",
        properties: {
          locationKeyword: { type: "string", description: "คำระบุพื้นที่ เช่น คูเมือง, นิมมาน, ช้างม่อย, สันติธรรม" },
          foodTag: { type: "string", description: "ประเภทอาหารหรือแท็กแนะนำ เช่น ข้าวซอย, อาหารเมือง, คาเฟ่" }
        },
        required: ["locationKeyword"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "searchHotels",
      description: "ใช้สำหรับค้นหาโรงแรม ที่พัก เกสต์เฮาส์ หรือรีสอร์ทในเชียงใหม่ เมื่อผู้ใช้ถามหาที่พักหรือโรงแรม ไม่จำเป็นต้องระบุพื้นที่เสมอไป รองรับการค้นหาทั้งแบบระบุโซน ระบุอำเภอ/ทำเลอื่นๆ หรือถามกว้างๆ แบบไม่ระบุโซนก็ได้ (จะดึงที่พักแนะนำ/คะแนนดีมาให้)",
      parameters: {
        type: "object",
        properties: {
          locationKeyword: { type: "string", description: "คำระบุพื้นที่หรือทำเล เช่น คูเมือง, นิมมาน, ท่าแพ, สันติธรรม, แม่ริม, สันกำแพง หรือชื่อพื้นที่อื่นๆ ไม่จำกัดเฉพาะโซนยอดฮิตในเมือง ถ้าผู้ใช้ไม่ได้ระบุพื้นที่ให้เว้นว่างไว้" },
          type: { type: "string", description: "ประเภทที่พัก ถ้าผู้ใช้ระบุ เช่น city (โรงแรมในเมือง), nature (รีสอร์ทธรรมชาติ), riverside (ริมน้ำ), hotel (โรงแรมทั่วไป)" }
        },
        required: []
      }
    }
  }
];