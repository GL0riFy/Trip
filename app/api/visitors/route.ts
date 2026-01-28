import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. ระบุตำแหน่งที่ต้องการ (src/visitor-data อยู่ที่ Root ของโปรเจกต์)
    const dirPath = path.join(process.cwd(), 'src', 'visitor-data');
    const filePath = path.join(dirPath, 'visitor-data.json');

    // 2. ตรวจสอบและสร้างโฟลเดอร์อัตโนมัติ (ถ้ายังไม่มี)
    if (!fs.existsSync(dirPath)) {
      console.log("Creating directory:", dirPath);
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let data = { count: 0 };

    // 3. ตรวจสอบว่ามีไฟล์เดิมไหม ถ้ามีให้โหลดมา
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      if (fileContent.trim()) {
        try {
          data = JSON.parse(fileContent);
        } catch (e) {
          console.error("JSON Parse Error, resetting count.");
          data = { count: 0 };
        }
      }
    }

    // 4. เพิ่มยอดผู้เข้าชม
    data.count += 1;

    // 5. เขียนลงไฟล์
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json(data);
  } catch (error: any) {
    // พิมพ์ Error ออกมาดูที่ Terminal ของ VS Code ว่าทำไมถึงเขียนไม่ได้
    console.error("❌ FULL ERROR:", error.message);
    return NextResponse.json({ count: 0, error: "Storage error", detail: error.message }, { status: 500 });
  }
}