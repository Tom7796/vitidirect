import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
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
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
