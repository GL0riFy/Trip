import { NextResponse } from 'next/server';
import { connectDB } from "@/src/lib/mongodb";
import WebsiteReviewModel from '@/models/WebsiteReview';

export async function GET() {
  try {
    await connectDB();
    const reviews = await WebsiteReviewModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('MongoDB GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, comment, tags } = body;

    await connectDB();
    const newReview = await WebsiteReviewModel.create({
      name,
      rating,
      comment,
      tags: tags || [],
    });

    return NextResponse.json({ success: true, id: newReview._id });
  } catch (error) {
    console.error('MongoDB POST Error:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}