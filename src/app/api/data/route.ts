import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

export async function GET() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    fs.writeFileSync(DATA_FILE, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
