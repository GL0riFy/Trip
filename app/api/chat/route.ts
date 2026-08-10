// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { OpenAI } from "openai"; // ยังใช้ Library ตัวเดิมได้เลยครับ
import { chatbotTools } from "@/src/config/chatbotTools";
import { dbRegistry } from "@/src/services/databaseTools";
import { connectDB } from "@/src/lib/mongodb"; 

// 1. เปลี่ยนมาเชื่อมต่อที่ Endpoint ของ Groq แทน
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // ใช้ Key ของ Groq
  baseURL: "https://api.groq.com/openai/v1", // URL สำหรับ Groq API
});

// 2. กำหนดโมเดลของ Groq (แนะนำ llama-3.3-70b-versatile ฉลาด เรื่องภาษาไทยและ Toolดีมาก)
const GROQ_MODEL = "llama-3.3-70b-versatile";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { messages } = await req.json();

    const systemPrompt = {
      role: "system",
      content: `คุณคือ AI ไกด์ผู้เชี่ยวชาญการท่องเที่ยวเชียงใหม่ 

    กฎเหล็กสำคัญที่สุด (Strict Rules):
    1. คุณต้องใช้ข้อมูลสถานที่, ร้านอาหาร, โรงแรม และสินค้า OTOP จากเครื่องมือ (Tools) ที่ระบบส่งให้มา "เท่านั้น" ห้ามคิด ห้ามมโน หรือนำชื่อสถานที่/ร้านอาหาร/โรงแรม/สินค้าที่คุณรู้จากภายนอกมาตอบเด็ดขาด!
    2. ทุกครั้งที่ผู้ใช้ถามหรือพูดถึงสินค้า OTOP, ร้านอาหาร, ที่เที่ยว, หรือโรงแรม/ที่พัก ไม่ว่าจะถามตรงๆ หรือพูดอ้อมๆ (เช่น "อยากได้ของฝาก", "หิวข้าว", "อยากพักที่ไหนดี") คุณต้อง "เรียกใช้ tool ที่เกี่ยวข้องก่อนตอบทุกครั้งโดยไม่มีข้อยกเว้น" แม้ว่าคุณจะคิดว่ารู้คำตอบอยู่แล้วก็ตาม ห้ามตอบจากความจำของคุณเองเด็ดขาด ถ้ายังไม่ได้เรียก tool ห้ามตอบเนื้อหาใดๆ เกี่ยวกับสินค้า/ร้าน/ที่พักนั้น
    3. เมื่อระบบส่งข้อมูลดิบที่เป็น JSON มาให้คุณ คุณต้องอ่านฟิลด์ "coords" (lat, lng) ของแต่ละไอเทม เพื่อตรวจสอบด้วยตัวเองว่าไอเทมไหนอยู่ใกล้พิกัดหรือโซนพื้นที่ที่ผู้ใช้ถามถึงจริงๆ (เช่น ถ้าถามคูเมือง ให้ดูว่าพิกัดนั้นอยู่ภายในกรอบสี่เหลี่ยมรอบคูเมืองไหม)
    4. หากในข้อมูล JSON ที่ระบบส่งมาให้ "ไม่มีรายการใดที่ตรงกับสิ่งที่ผู้ใช้ถามเลย" (ไม่ว่าจะเป็นโซนพิกัด หรือคำค้นหาที่ไม่พบผลลัพธ์) ให้ปฏิเสธอย่างสุภาพว่า "ขออภัยด้วยครับ ตอนนี้ในฐานข้อมูลระบบยังไม่มีร้านอาหาร/ที่เที่ยว/โรงแรม/สินค้านี้ลงทะเบียนไว้" ห้ามแต่งชื่อหรือลิงก์อื่นขึ้นมาเองเด็ดขาด
    5. ห้ามแนะนำ วัดพระธาตุดอยสุเทพ, วัดพระธาตุดอยคำ หรือร้านอาหาร/โรงแรม/สินค้าอื่นๆ ที่ไม่มีอยู่จริงในก้อนข้อมูล JSON ที่ได้รับ
    6. เมื่อผู้ใช้ถามหาโรงแรมหรือที่พัก ให้ใช้ tool "searchHotels" ได้แม้ผู้ใช้จะไม่ได้ระบุโซนพื้นที่ (ไม่ต้องจำกัดว่าต้องเป็นคูเมือง/นิมมาน/ท่าแพ/สันติธรรมเท่านั้น ค้นหาได้ทุกพื้นที่ในเชียงใหม่) เมื่อตอบกลับ ให้บอกเฉพาะราคาที่จำเป็น (เช่น ราคาเริ่มต้นต่อคืน จากฟิลด์ minPrice) เท่านั้น ห้ามแจกแจงราคาทุกประเภทห้องหรือทุกโปรโมชั่น ให้สรุปสั้นกระชับพอผู้ใช้ตัดสินใจได้
    7. ทุกครั้งที่แนะนำโรงแรม ร้านอาหาร ที่เที่ยว หรือสินค้า OTOP ให้แนบลิงก์จากฟิลด์ "websiteUrl" ต่อท้ายชื่อรายการนั้นเสมอ เพื่อให้ผู้ใช้กดเข้าไปดูรายละเอียดเต็มบนเว็บไซต์ของเราได้ ห้ามสร้างลิงก์ขึ้นมาเองถ้าไม่มีในข้อมูล JSON ที่ได้รับ ห้ามใส่ลิงก์อื่นนอกจาก websiteUrl (ไม่ต้องแนบลิงก์ Google Maps หรือลิงก์อื่นใด) และ "ห้ามแก้ไข ดัดแปลง แปล หรือแต่งเติมค่าของ websiteUrl เด็ดขาด" ต้องคัดลอกค่าที่ได้รับมาแบบตรงตัวทุกตัวอักษร (ห้ามแทนที่ท้าย URL ด้วยชื่อสินค้า/สถานที่ภาษาไทยหรือค่าอื่นใดที่ไม่ตรงกับที่ได้รับมาจาก tool) ถ้าไอเทมไหนไม่มีฟิลด์ websiteUrl หรือมีค่าเป็น null ให้ข้ามไปไม่ต้องใส่ลิงก์สำหรับไอเทมนั้น
    8. กฎการจัดรูปแบบลิงก์ (สำคัญมาก): ห้ามใส่เครื่องหมาย < หรือ > ครอบลิงก์เด็ดขาด และห้ามใส่ลิงก์ปนอยู่กลางประโยค ให้ขึ้นบรรทัดใหม่แล้วพิมพ์ลิงก์เปล่าๆ ต่อท้ายคำว่า "ดูรายละเอียดเพิ่มเติม:" เท่านั้น เช่น:
ดูรายละเอียดเพิ่มเติม: https://trip-eta-nine.vercel.app/en/hotels/ตัวอย่าง-slug
    9. รูปแบบการตอบเมื่อแนะนำหลายรายการ (โรงแรม/ร้านอาหาร/ที่เที่ยว/สินค้า OTOP): ให้จัดเป็นข้อๆ แยกกันชัดเจน แต่ละรายการมีโครงสร้างดังนี้ และเว้นบรรทัดว่าง 1 บรรทัดคั่นระหว่างแต่ละรายการเสมอ (เลือกอิโมจิให้เหมาะกับประเภท เช่น 🏨 โรงแรม, 🍽️ ร้านอาหาร, 🗺️ ที่เที่ยว, 🛍️ สินค้า OTOP):
🏨 ชื่อสถานที่
คำอธิบายสั้นๆ ไม่เกิน 1-2 บรรทัด (ไม่ต้องยกมาทั้งหมด สรุปเอง)
ราคาเริ่มต้น: X บาท/คืน (ถ้ามี)
ดูรายละเอียดเพิ่มเติม: [websiteUrl]
    10. ตอบกลับเป็นภาษาไทยที่เป็นธรรมชาติ น่าเที่ยว จัดแบ่งบรรทัดให้สวยงาม อ่านง่าย และห้ามโชว์โค้ดหรือรูปแบบ JSON ดิบให้ผู้ใช้เห็น

    11. เมื่อผู้ใช้ขอให้ "จัดทริป", "วางแผนเที่ยว", "แพลนทริป", "โปรแกรมเที่ยว" หรือความหมายใกล้เคียง (ไม่ใช่แค่ถามหาสถานที่เดี่ยวๆ) ให้ทำตามขั้นตอนนี้:
       a. ถ้าผู้ใช้ยังไม่ได้ระบุ "โซนพื้นที่" (เช่น คูเมือง, นิมมาน, ท่าแพ, สันติธรรม ฯลฯ) และ "จำนวนวัน" ให้ถามกลับก่อน 1 ครั้งแบบสั้นๆ สุภาพ (เช่น "อยากเที่ยวกี่วันดีครับ และสนใจโซนไหนเป็นพิเศษไหม เช่น คูเมือง หรือ นิมมาน") ห้ามเดาโซนเอง และห้ามเรียก tool จนกว่าจะพอจะกำหนดโซนได้ (ถ้าผู้ใช้บอกแค่ "เชียงใหม่" กว้างๆ ไม่ระบุโซน ให้ถามย้ำเพื่อเลือกโซนที่ชัดเจน ไม่ใช้คำว่า "เชียงใหม่" เป็น locationKeyword เพราะจะได้ผลลัพธ์กระจัดกระจายทั่วจังหวัด)
       b. เมื่อทราบโซนแล้ว ให้เรียก tool "searchTouristPlaces" และ "searchRestaurants" ด้วย locationKeyword โซนเดียวกันเสมอ (เรียกทั้งสอง tool พร้อมกันในรอบเดียว) และถ้าทริปมีการค้างคืน ให้เรียก "searchHotels" ในโซนนั้นเพิ่มด้วย
       c. เมื่อได้ข้อมูลกลับมา ให้จัดสถานที่เที่ยวและร้านอาหารที่ "อยู่ในก้อนข้อมูลจริงเท่านั้น" มาเรียงเป็นตารางทริปตามจำนวนวันที่ผู้ใช้ระบุ แบ่งเป็นช่วงเวลา เช่น เช้า / เที่ยง (มื้ออาหาร) / บ่าย / เย็น (มื้ออาหาร) ต่อวัน โดยแต่ละรายการยังต้องมีคำอธิบายสั้นๆ และแนบ websiteUrl ตามกฎข้อ 7-8 เสมอ ห้ามใส่สถานที่ที่ไม่ได้มาจากผลลัพธ์ tool ในตารางทริปเด็ดขาด
       d. ถ้าข้อมูลในโซนนั้นมีไม่พอสำหรับทุกวัน (เช่น ที่เที่ยวน้อยกว่าจำนวนวัน) ให้บอกผู้ใช้ตรงๆ ว่าข้อมูลในระบบยังมีจำกัด แล้วเสนอเท่าที่มีจริง ห้ามแต่งสถานที่เพิ่มเอง`
    };

    const updatedMessages = [systemPrompt, ...messages];

    // ยิงไปหา Groq รอบที่ 1
    let response;
    try {
      response = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: updatedMessages,
        tools: chatbotTools as any,
      });
    } catch (toolErr: any) {
      // Groq บางครั้งจะโยน 400 "tool_use_failed" เวลาโมเดลพยายามเรียกฟังก์ชัน
      // ที่ไม่ตรงกับ schema หรือไม่มีอยู่จริง (เช่น ถามเรื่องที่ยังไม่มี tool รองรับ)
      // จุดนี้กันไม่ให้แอปล่มทั้งหมด โดย retry แบบไม่บังคับใช้ tools แทน
      if (toolErr?.code === "tool_use_failed" || toolErr?.status === 400) {
        console.warn("Tool call ล้มเหลว กำลังลองใหม่แบบไม่ใช้ tools:", toolErr?.message);
        response = await groq.chat.completions.create({
          model: GROQ_MODEL,
          messages: [
            ...updatedMessages,
            {
              role: "system",
              content:
                "หมายเหตุ: ระบบเรียกใช้เครื่องมือค้นหาข้อมูลไม่สำเร็จในรอบนี้ ให้ตอบผู้ใช้อย่างสุภาพว่าขณะนี้ยังไม่สามารถค้นหาข้อมูลนี้ได้ และห้ามมั่วหรือแต่งข้อมูลขึ้นมาเองเด็ดขาด",
            },
          ],
        });
      } else {
        throw toolErr;
      }
    }

    let responseMessage = response.choices[0].message;

    // 🛟 Safety net: บางครั้งโมเดลเลี่ยงไม่เรียก tool ทั้งที่ควรเรียก (แล้วมโนคำตอบ/ลิงก์ขึ้นมาเอง)
    // ถ้าข้อความล่าสุดของผู้ใช้มีคีย์เวิร์ดที่เกี่ยวกับสินค้า/ร้านอาหาร/ที่เที่ยว/โรงแรม แต่โมเดลไม่เรียก tool เลย
    // ให้บังคับยิงซ้ำแบบ tool_choice: "required" เพื่อบังคับให้เรียก tool จริงๆ ก่อนตอบ
    const NEEDS_TOOL_KEYWORDS =
      /(สินค้า|ของฝาก|otop|โอทอป|น้ำผึ้ง|ผ้าฝ้าย|แคบหมู|ร้านอาหาร|ร้านกาแฟ|คาเฟ่|กิน|ของกิน|ข้าวซอย|ที่เที่ยว|เที่ยว|วัด|น้ำตก|โรงแรม|ที่พัก|รีสอร์ท|เกสต์เฮาส์|hotel|resort|ทริป|จัดทริป|แพลน|วางแผน|โปรแกรมเที่ยว|itinerary)/i;
    const lastUserMessage =
      [...messages].reverse().find((m: any) => m.role === "user")?.content || "";

    if ((!responseMessage.tool_calls || responseMessage.tool_calls.length === 0) && NEEDS_TOOL_KEYWORDS.test(lastUserMessage)) {
      try {
        console.warn("โมเดลไม่ได้เรียก tool ทั้งที่ควรเรียก กำลังบังคับเรียกซ้ำ...");
        const forcedResponse = await groq.chat.completions.create({
          model: GROQ_MODEL,
          messages: updatedMessages,
          tools: chatbotTools as any,
          tool_choice: "required",
        });
        const forcedMessage = forcedResponse.choices[0].message;
        if (forcedMessage.tool_calls && forcedMessage.tool_calls.length > 0) {
          response = forcedResponse;
          responseMessage = forcedMessage;
        }
      } catch (forceErr) {
        // ถ้าบังคับไม่สำเร็จ ก็ปล่อยให้ใช้คำตอบเดิม (ยังมีกฎใน system prompt ช่วยกันมโนอยู่)
        console.warn("บังคับเรียก tool ไม่สำเร็จ:", forceErr);
      }
    }

    if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
      const toolMessages: any[] = [];

      for (const toolCall of responseMessage.tool_calls) {
        if (toolCall.type === "function") {
          const functionName = toolCall.function.name;
          const functionArgs = JSON.parse(toolCall.function.arguments);

          const executeFunction = dbRegistry[functionName];
          if (!executeFunction) continue;

          try {
            const dbResult = await executeFunction(functionArgs);

            toolMessages.push({
              role: "tool",
              tool_call_id: toolCall.id,
              name: functionName,
              content: dbResult,
            });
          } catch (dbError) {
            console.error(`Database error on ${functionName}:`, dbError);
            toolMessages.push({
              role: "tool",
              tool_call_id: toolCall.id,
              name: functionName,
              content: "[]",
            });
          }
        }
      }

      if (toolMessages.length > 0) {
        // ส่งผลลัพธ์กลับไปให้ Groq สรุปรอบสุดท้าย
        const finalResponse = await groq.chat.completions.create({
          model: GROQ_MODEL, // <-- เปลี่ยนตรงนี้
          messages: [
            ...updatedMessages,
            responseMessage,
            ...toolMessages
          ],
        });

        return NextResponse.json({ message: finalResponse.choices[0].message.content });
      }
    }

    return NextResponse.json({ message: responseMessage.content });

  } catch (error: any) {
    console.error("--- CHATBOT ROUTE ERROR ---", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}