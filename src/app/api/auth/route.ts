import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Admin } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { username, password } = await request.json();
    console.log('Login attempt:', username);
    
    const admin = await Admin.findOne({ username });
    console.log('Found admin:', admin ? admin.username : 'none');
    
    if (!admin) {
      console.log('Admin not found for username:', username);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      console.log('Password invalid for username:', username);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    return NextResponse.json({ message: 'Login successful', username: admin.username });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}