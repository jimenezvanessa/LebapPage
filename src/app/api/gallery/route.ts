import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Gallery } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const gallery = await Gallery.create(data);
    return NextResponse.json(gallery, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create gallery' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { _id, ...data } = await request.json();
    const gallery = await Gallery.findByIdAndUpdate(_id, data, { new: true });
    return NextResponse.json(gallery);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update gallery' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Gallery.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete gallery' }, { status: 500 });
  }
}