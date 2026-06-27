import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

import { connectDB } from "@/src/lib/mongodb";

async function getCollection() {
  const client = await connectDB();
  const db = client.db('TripChiangMai');
  return db.collection('WebsiteReview');
}

// GET: ดึงรีวิวทั้งหมด
export async function GET() {
  try {
    const collection = await getCollection();
    const reviews = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('MongoDB GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

// POST: เพิ่มรีวิวใหม่
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, comment, tags } = body;

    const collection = await getCollection();
    const result = await collection.insertOne({
      name,
      rating,
      comment,
      tags: tags || [],
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error('MongoDB POST Error:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}