import { NextResponse } from 'next/server';
import paletteData from '../../../mock/paletteData.json';

export async function GET() {
  try {
    return NextResponse.json(paletteData);
  } catch (error) {
    console.error('Failed to fetch palette data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}