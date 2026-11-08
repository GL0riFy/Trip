// proxy.ts
import { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['en', 'zh', 'th'],
  defaultLocale: 'en'
})

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV === 'development'

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' blob: data: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://open.er-api.com https://basemaps.cartocdn.com https://*.basemaps.cartocdn.com https://fonts.openmaptiles.org",
    "worker-src 'self' blob:",
    "frame-src 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    ...(isDev ? [] : ['upgrade-insecure-requests']),
  ].join('; ')

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('Content-Security-Policy', csp)

  // next-intl forwards request headers to the localized page response.
  const requestWithNonce = new NextRequest(request, { headers: requestHeaders })
  const response = intlMiddleware(requestWithNonce)
  response.headers.set('Content-Security-Policy', csp)

  return response
}

// 3. config matcher ยังคงเหมือนเดิม
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
