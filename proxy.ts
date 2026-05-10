// proxy.ts
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['en', 'zh', 'th'],
  defaultLocale: 'en'
})

export function proxy(request: any) {
  return intlMiddleware(request)
}

// 3. config matcher ยังคงเหมือนเดิม
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}