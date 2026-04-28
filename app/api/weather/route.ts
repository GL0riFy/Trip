import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.WEATHER_API_KEY;
  // ดึงข้อมูลอากาศของเชียงใหม่
  const city = 'Chiang Mai'; 
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    // ดึงข้อมูลและจำไว้ 1 ชั่วโมง (3600 วินาที) เพื่อประหยัดโควตา
    const res = await fetch(url, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather' }, { status: 500 });
  }
}