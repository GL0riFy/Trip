import Redis from 'ioredis';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const redis = new Redis(process.env.REDIS_URL!);

async function migrate() {
  const filePath = path.join(process.cwd(), 'src', 'visitor-data', 'visitor-data.json');

  if (!fs.existsSync(filePath)) {
    console.log('No JSON file found, skipping migration');
    process.exit(0);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);

  await redis.set('visitor-data', JSON.stringify(data));
  console.log('✅ migrate success');
  process.exit(0);
}

migrate().catch(console.error);