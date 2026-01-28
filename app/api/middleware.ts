export const config = {
    // เพิ่ม (?!api) เข้าไปในลิสต์ที่ไม่ต้องผ่าน middleware
    matcher: [
      // ตรวจสอบว่ามี /api อยู่ใน list นี้ เพื่อข้ามการจัดการภาษา
      '/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|.*\\.svg).*)'
    ]
  };