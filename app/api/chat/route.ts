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
    1. คุณต้องใช้ข้อมูลสถานที่และร้านอาหารจากเครื่องมือ (Tools) ที่ระบบส่งให้มา "เท่านั้น" ห้ามคิด ห้ามมโน หรือนำชื่อสถานที่/ร้านอาหารที่คุณรู้จากภายนอกมาตอบเด็ดขาด!
    2. เมื่อระบบส่งข้อมูลดิบที่เป็น JSON มาให้คุณ คุณต้องอ่านฟิลด์ "coords" (lat, lng) ของแต่ละไอเทม เพื่อตรวจสอบด้วยตัวเองว่าไอเทมไหนอยู่ใกล้พิกัดหรือโซนพื้นที่ที่ผู้ใช้ถามถึงจริงๆ (เช่น ถ้าถามคูเมือง ให้ดูว่าพิกัดนั้นอยู่ภายในกรอบสี่เหลี่ยมรอบคูเมืองไหม)
    3. หากในข้อมูล JSON ที่ระบบส่งมาให้ "ไม่มีสถานที่ใดที่ตรงกับโซนพิกัดที่ผู้ใช้ถามเลย" ให้ปฏิเสธอย่างสุภาพว่า "ขออภัยด้วยครับ ตอนนี้ในฐานข้อมูลระบบยังไม่มีร้านอาหาร/ที่เที่ยวในโซนนี้ลงทะเบียนไว้" ห้ามแต่งชื่อสถานที่อื่นขึ้นมาเองเด็ดขาด
    4. ห้ามแนะนำ วัดพระธาตุดอยสุเทพ, วัดพระธาตุดอยคำ หรือร้านอาหารอื่นๆ ที่ไม่มีอยู่จริงในก้อนข้อมูล JSON ที่ได้รับ
    5. ตอบกลับเป็นภาษาไทยที่เป็นธรรมชาติ น่าเที่ยว จัดแบ่งบรรทัดให้สวยงาม และห้ามโชว์โค้ดหรือรูปแบบ JSON ดิบให้ผู้ใช้เห็น`
    };

    const updatedMessages = [systemPrompt, ...messages];

    // ยิงไปหา Groq รอบที่ 1
    const response = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: updatedMessages,
      tools: chatbotTools as any, // ปิดท้ายด้วย comma ตามปกติ ไม่มีวงเล็บปีกกาเปิดค้างไว้
    });

    const responseMessage = response.choices[0].message;

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