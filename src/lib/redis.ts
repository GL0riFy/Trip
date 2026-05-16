// src/lib/redis.ts
import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL // ตอนนี้จะอ่านค่าได้ถูกต้องแล้วถ้าเรียงลำดับด่านบนถูก
});

client.on('error', (err) => console.error('Redis Client Error', err));

let isConnected = false;

export async function getRedisClient() {
  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
      console.log("🚀 Redis Connected");
    } catch (err) {
      console.error("❌ Redis Connection Failed", err);
      throw err; // 👈 พ่น Error ออกไปเพื่อให้สคริปต์หยุดทำงานทันที ไม่ฝืนทำต่อ
    }
  }
  return client;
}