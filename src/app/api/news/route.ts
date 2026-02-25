import { NextResponse } from 'next/server';

// News list now comes from collections API; this route returns empty for backwards compatibility.
export async function GET() {
  try {
    return NextResponse.json([]);
  } catch (error) {
    console.error('Failed to fetch news data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}