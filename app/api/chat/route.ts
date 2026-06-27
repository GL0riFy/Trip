import { groq } from "@/src/lib/groq";
import { NextResponse } from "next/server";
import { buildSmartContext } from "@/src/lib/search-context";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yoursite.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contextText, hasData } = await buildSmartContext(body.message);
    // ---- Case 1: มีข้อมูลในระบบ ----------------------------------------
    if (hasData) {
      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `
คุณคือ AI ผู้ช่วยด้านการท่องเที่ยวเชียงใหม่ของเว็บไซต์ ${BASE_URL}

ข้อมูลจากระบบ:
${contextText}

กฎ:
- ตอบโดยอิงจากข้อมูลที่ได้รับเท่านั้น
- ทุกครั้งที่กล่าวถึงสถานที่/โรงแรม/ร้านอาหาร/สินค้า ให้แนบลิงก์ InternalLink ในรูปแบบ Markdown เช่น [ชื่อ](${BASE_URL}/hotels/slug)
- ถ้าถามภาษาไทยให้ตอบภาษาไทย ถ้าถามภาษาอังกฤษให้ตอบภาษาอังกฤษ รองรับภาษาจีนด้วย
- ห้ามแต่งข้อมูลที่ไม่มีในระบบ
`,
          },
          {
            role: "user",
            content: body.message,
          },
        ],
      });

      return NextResponse.json({
        reply: completion.choices[0].message.content,
        source: "internal",
      });
    }

    // ---- Case 2: ไม่มีข้อมูลในระบบ → ค้นหาจากเว็บโดยตรง ------------------
    // เรียก Serper ก่อนเลย ไม่ใช้ tool_calls (Groq llama ไม่ stable)
    const searchResults = await fetchWebSearch(body.message);

    const externalCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
คุณคือ AI ผู้ช่วยด้านการท่องเที่ยวเชียงใหม่ของเว็บไซต์ ${BASE_URL}

ผลการค้นหาจากอินเทอร์เน็ต:
${searchResults}

กฎ:
- สรุปข้อมูลจากผลการค้นหาให้ชัดเจน กระชับ ไม่เกิน 5 ข้อ
- ถ้ามีชื่อโรงแรม/ร้านอาหาร/สถานที่ ให้ลิงก์ค้นหาในเว็บเราด้วย เช่น [ดูในเว็บเรา](${BASE_URL}/search?q=ชื่อ)
- ตอบด้วยภาษาเดียวกับที่ผู้ใช้ถาม (ไทย/อังกฤษ/จีน)
- ห้ามแต่งข้อมูลที่ไม่มีในผลการค้นหา
`,
        },
        {
          role: "user",
          content: body.message,
        },
      ],
    });

    return NextResponse.json({
      reply: externalCompletion.choices[0].message.content,
      source: "external",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Web Search helper — ใช้ Serper.dev (เปลี่ยนเป็น API ที่คุณใช้ได้เลย)
// ---------------------------------------------------------------------------
async function fetchWebSearch(query: string): Promise<string> {
  try {
    const res = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.SERPER_API_KEY ?? "",
      },
      body: JSON.stringify({ q: `${query} เชียงใหม่`, gl: "th", hl: "th", num: 5 }),
    });

    if (!res.ok) throw new Error("Search API error");

    const data = await res.json();

    // แปลงผลลัพธ์เป็น text สำหรับส่งให้ LLM
    const results = (data.organic ?? [])
      .slice(0, 5)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((r: any, i: number) => `[${i + 1}] ${r.title}\n${r.snippet}\nURL: ${r.link}`)
      .join("\n\n");

    return results || "ไม่พบผลการค้นหา";
  } catch {
    return "ไม่สามารถค้นหาข้อมูลจากอินเทอร์เน็ตได้ในขณะนี้";
  }
}