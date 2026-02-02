// Admin panel create/update/delete sonrası cache təmizləmək üçün.
// tag=products → məhsul siyahısı/detal təzələnir.
// path=/ və ya path=/product → səhifə cache-i təmizlənir (saytda dərhal görünür).

import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const tag = params.get('tag');
    const paths = params.getAll('path');
    if (tag) revalidateTag(tag);
    paths.forEach((p) => revalidatePath(p));
    if (!tag && paths.length === 0) {
      return NextResponse.json(
        { error: 'tag və ya path göndərin (məs: ?tag=products və ya ?path=/)' },
        { status: 400 }
      );
    }
    return NextResponse.json({ revalidated: true, tag, paths });
  } catch (err) {
    console.error('Revalidate error:', err);
    return NextResponse.json({ error: 'Revalidate failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({})) as { tag?: string; path?: string; paths?: string[] };
    const params = request.nextUrl.searchParams;
    const tag = body.tag ?? params.get('tag');
    const pathSingle = body.path ?? params.get('path');
    const paths = body.paths ?? (pathSingle ? [pathSingle] : params.getAll('path'));

    if (tag) revalidateTag(tag);
    paths.forEach((p) => revalidatePath(p));

    if (!tag && paths.length === 0) {
      return NextResponse.json(
        { error: 'tag və ya path göndərin (məs: ?tag=products və ya ?path=/)' },
        { status: 400 }
      );
    }
    return NextResponse.json({ revalidated: true, tag, paths });
  } catch (err) {
    console.error('Revalidate error:', err);
    return NextResponse.json({ error: 'Revalidate failed' }, { status: 500 });
  }
}
