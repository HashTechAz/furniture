import { NextResponse } from 'next/server';
import sliderData from '../../../mock/productSliderData.json';

export async function GET() {
  try {
    return NextResponse.json(sliderData);
  } catch (error) {
    console.error('Failed to fetch product slider data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}