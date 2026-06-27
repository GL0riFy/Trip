import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// 1. ดึง Connection String จาก .env (ตรวจสอบชื่อตัวแปรใน .env ของน้าด้วยนะว่าใช้ชื่ออะไร)
const client = new MongoClient(process.env.DATABASE_URL || '');
const COUNTER_ID = '6a3d267a6451c0615ad78ea8';

async function getCollection() {
  await client.connect();
  // ชื่อ Database: TripChiangMai, ชื่อ Collection: VisitorCounter ตามรูปใน Compass
  const db = client.db('TripChiangMai'); 
  return db.collection('VisitorCounter');
}

// 🔹 GET: ดึงยอดจากหน้า Footer
export async function GET() {
  try {
    const collection = await getCollection();
    const visitor = await collection.findOne({ _id: new ObjectId(COUNTER_ID) });
    
    return NextResponse.json({ count: visitor?.count || 0 });
  } catch (error) {
    console.error('MongoDB GET Error:', error);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

// 🔹 POST: กดบวกยอดเพิ่มทีละ 1 จากหน้า Home
export async function POST() {
  try {
    const collection = await getCollection();
    
    // สั่ง $inc เพื่อเพิ่มค่า count ขึ้น 1 ทันทีแบบไม่ต้องผ่าน Model
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(COUNTER_ID) },
      { $inc: { count: 1 } },
      { returnDocument: 'after' } // เอาข้อมูลล่าสุดหลังจากอัปเดตแล้วส่งกลับไป
    );

    return NextResponse.json({ success: true, count: result?.count || 0 });
  } catch (error) {
    console.error('MongoDB POST Error:', error);
    return NextResponse.json({ error: 'Write error' }, { status: 500 });
  }
}