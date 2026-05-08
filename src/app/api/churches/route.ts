import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Church } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const churches = await Church.find().sort({ createdAt: -1 });
    return NextResponse.json(churches);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch churches' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const church = await Church.create(data);
    return NextResponse.json(church, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create church' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { _id, ...data } = await request.json();
    const church = await Church.findByIdAndUpdate(_id, data, { new: true });
    return NextResponse.json(church);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update church' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Church.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete church' }, { status: 500 });
  }
}