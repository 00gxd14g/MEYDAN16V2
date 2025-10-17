import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data: any = {};

    if (contentType.includes('application/json')) {
      data = await request.json();
    } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    }

    const required = ['name','email','phone','mainCategory','subCategory','corporate','businessType','message'];
    const missing = required.some((k) => !data[k] || String(data[k]).trim().length === 0);
    if (missing) {
      return NextResponse.json({ ok: false, error: 'Eksik alanlar var.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(data.email))) {
      return NextResponse.json({ ok: false, error: 'Geçersiz e‑posta.' }, { status: 400 });
    }

    // Here you could persist to DB or send email.
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Beklenmeyen hata.' }, { status: 500 });
  }
}

