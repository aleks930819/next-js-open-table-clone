import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get('authorization')?.split(' ')[1];

  if (!bearerToken) {
    return new NextRequest(
      JSON.stringify({
        errors: [{ errorMessage: 'Unauthorized' }],
        status: 401,
      })
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(bearerToken, secret);
  } catch (err) {
    return new NextRequest(
      JSON.stringify({
        errors: [{ errorMessage: 'Unauthorized' }],
        status: 401,
      })
    );
  }
}

export const config = {
  matcher: ['/api/auth/me'],
};
