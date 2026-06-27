import Redis from 'ioredis';
import * as fs from 'fs';
import * as path from 'path';

// 1. ใส่ URL หรือข้อมูลเชื่อมต่อ Redis ของคุณ
const redis = new Redis('redis://default:ahT11EiDSHAgIMRnD6pdGaxfuaIhE6Yy@redis-13062.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:13062'); 

async function exportRedisData() {
  console.log('🔄 กำลังเชื่อมต่อและตรวจสอบประเภทข้อมูลทั้งหมดใน Redis...');
  
  const keys = await redis.keys('*');
  if (keys.length === 0) {
    console.log('❌ 不พบข้อมูลใดๆ ใน Redis');
    await redis.quit();
    return;
  }

  const allData: Record<string, any> = {};

  for (const key of keys) {
    // 🌟 เช็กประเภทของคีย์ก่อนดึงข้อมูล
    const keyType = await redis.type(key);

    try {
      if (keyType === 'string') {
        const value = await redis.get(key);
        if (value) {
          try { allData[key] = JSON.parse(value); } catch { allData[key] = value; }
        }
      } 
      else if (keyType === 'hash') {
        // ดึงข้อมูลประเภท Hash ทั้งหมดออกมาเป็น Object
        allData[key] = await redis.hgetall(key);
      } 
      else if (keyType === 'list') {
        // ดึงข้อมูลประเภท List ตั้งแต่ตัวแรกถึงตัวสุดท้ายออกมาเป็น Array
        allData[key] = await redis.lrange(key, 0, -1);
      } 
      else if (keyType === 'set') {
        // ดึงข้อมูลประเภท Set ออกมาเป็น Array
        allData[key] = await redis.smembers(key);
      } 
      else if (keyType === 'zset') {
        // ดึงข้อมูลประเภท Sorted Set ออกมาพร้อมคะแนน
        allData[key] = await redis.zrange(key, 0, -1, 'WITHSCORES');
      }
      
      console.log(`📥 ดึงข้อมูลคีย์ [${key}] ประเภท [${keyType}] สำเร็จ`);
    } catch (err) {
      console.error(`⚠️ เกิดข้อผิดพลาดในการดึงคีย์ ${key}:`, err);
    }
  }

  // บันทึกข้อมูลออกมาเป็นไฟล์
  const outputPath = path.join(process.cwd(), 'redis-backup.json');
  fs.writeFileSync(outputPath, JSON.stringify(allData, null, 2), 'utf-8');

  console.log(`\n🎉 โหลดข้อมูลสำเร็จแบบไร้รอยต่อ!`);
  console.log(`💾 ไฟล์ถูกบันทึกไว้ที่: ${outputPath}`);
  console.log(`📦 รวมทั้งหมด ${keys.length} คีย์`);
  
  await redis.quit();
}

exportRedisData().catch(console.error);