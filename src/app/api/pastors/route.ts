import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Pastor } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const pastors = await Pastor.find().sort({ createdAt: -1 });
    return NextResponse.json(pastors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pastors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const pastor = await Pastor.create(data);
    return NextResponse.json(pastor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create pastor' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { _id, ...data } = await request.json();
    const pastor = await Pastor.findByIdAndUpdate(_id, data, { new: true });
    return NextResponse.json(pastor);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pastor' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Pastor.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete pastor' }, { status: 500 });
  }
}