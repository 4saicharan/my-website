import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET - Fetch all guestbook entries
export async function GET() {
  try {
    const entries = await prisma.guestbookEntry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error reading guestbook:', error);
    return NextResponse.json(
      { error: 'Failed to read guestbook entries' },
      { status: 500 }
    );
  }
}

// POST - Add a new guestbook entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body;

    // Validate input
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    if (name.length > 100 || message.length > 500) {
      return NextResponse.json(
        { error: 'Name or message is too long' },
        { status: 400 }
      );
    }

    // Create new entry
    const newEntry = await prisma.guestbookEntry.create({
      data: {
        name: name.trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error('Error writing guestbook entry:', error);
    return NextResponse.json(
      { error: 'Failed to save guestbook entry' },
      { status: 500 }
    );
  }
}

