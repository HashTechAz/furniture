import { NextResponse } from 'next/server';
import productNewsData from '../../../mock/productNewsData.json';

export async function GET() {
  try {
    return NextResponse.json(productNewsData);
  } catch (error) {
    console.error('Failed to fetch product news data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}