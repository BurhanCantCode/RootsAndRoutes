import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default-jwt-secret")

export async function middleware(request: NextRequest) {
    // Only checking /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {

        // Allow public access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next()
        }

        // Check for cookie
        const token = request.cookies.get('admin-token')?.value

        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        try {
            await jwtVerify(token, JWT_SECRET)
            return NextResponse.next()
        } catch (error) {
            // Drop invalid token
            const response = NextResponse.redirect(new URL('/admin/login', request.url))
            response.cookies.delete('admin-token')
            return response
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
