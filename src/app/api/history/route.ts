import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { History } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();
    const history = await History.find().sort({ year: 1 });
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const history = await History.create(data);
    return NextResponse.json(history, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create history' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const { _id, ...data } = await request.json();
    const history = await History.findByIdAndUpdate(_id, data, { new: true });
    return NextResponse.json(history);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update history' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await History.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete history' }, { status: 500 });
  }
}