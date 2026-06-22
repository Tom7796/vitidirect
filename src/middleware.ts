import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // Skip middleware for booking routes (they use JWT instead)
    if (request.nextUrl.pathname.startsWith('/booking') || request.nextUrl.pathname.startsWith('/api/booking')) {
        return NextResponse.next()
    }

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Only create Supabase client if env vars exist
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        return response
    }

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError) {
        console.error('Middleware getUser error:', userError)
    }

    // Protected Routes Check
    const isDashboardRoute = request.nextUrl.pathname.startsWith('/farmer') ||
        request.nextUrl.pathname.startsWith('/middleman') ||
        request.nextUrl.pathname.startsWith('/buyer') ||
        request.nextUrl.pathname.startsWith('/orders') ||
        request.nextUrl.pathname.startsWith('/messages');

    if (isDashboardRoute && !user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Role-based protection for dashboard routes
    if (user) {
        const role = user.user_metadata?.role;

        if (request.nextUrl.pathname.startsWith('/farmer') && role !== 'farmer') {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }

        if (request.nextUrl.pathname.startsWith('/middleman') && role !== 'middleman') {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }

        if (request.nextUrl.pathname.startsWith('/buyer') && role !== 'buyer') {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }

        // Redirect logged in users away from auth pages
        if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
            if (role === 'farmer') {
                return NextResponse.redirect(new URL('/farmer/dashboard', request.url))
            } else if (role === 'middleman') {
                return NextResponse.redirect(new URL('/middleman/dashboard', request.url))
            } else if (role === 'buyer') {
                return NextResponse.redirect(new URL('/buyer/dashboard', request.url))
            } else {
                return NextResponse.redirect(new URL('/marketplace', request.url))
            }
        }
    }

    return response
}


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - /booking (booking system routes)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|booking|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
