import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
  const userId = request.cookies.get('user_id')?.value

  const response = NextResponse.next()

  if (!userId) {
    const newUserId = crypto.randomUUID()
    response.cookies.set('user_id', newUserId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 365,
    })
  }
  return response
}

export const config = {
  matcher : ['/','/api/:path*'],
}