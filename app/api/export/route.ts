import { redis } from '@/src/lib/redis';

export async function GET() {
  const raw = await redis.get('visitor-data');
  const data = JSON.stringify(JSON.parse(raw ?? '{}'), null, 2);
  
  return new Response(data, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="visitor-data.json"',
    },
  });
}