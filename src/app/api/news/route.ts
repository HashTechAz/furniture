import { NextResponse } from 'next/server';
import newsData from '../../../mock/newsData.json';

export async function GET() {
  try {
    return NextResponse.json(newsData);
  } catch (error) {
    console.error('Failed to fetch news data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}