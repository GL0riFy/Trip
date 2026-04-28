import type { Metadata } from "next";
// นำเข้าฟอนต์ Prompt และ Itim
import { Prompt, Itim } from "next/font/google";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { VisitorTracker } from "../components/VisitorTracker";
import '../globals.css';

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }, { locale: "th" }];
}

// ตั้งค่าฟอนต์ Prompt (เป็นฟอนต์หลัก)
const promptFont = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

// ตั้งค่าฟอนต์ Itim (ฟอนต์ Itim มีแค่น้ำหนัก 400)
const itimFont = Itim({
  variable: "--font-itim-next",
  subsets: ["latin", "thai"],
  weight: "400", 
});

export const metadata: Metadata = {
  title: "Trip Chiang Mai",
  description: "Explore the beauty of Chiang Mai",
  icons: {
    icon: '/logo/logo.png',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} className="h-full text-black-900">
      {/* 1. promptFont.className จะทำให้ Prompt เป็นฟอนต์เริ่มต้นของทั้งเว็บ
        2. itimFont.variable จะฝังตัวแปร CSS ของฟอนต์ Itim ไว้ให้ Tailwind เรียกใช้ 
      */}
      <body
        className={`${promptFont.className} ${itimFont.variable} antialiased bg-linear-to-t from-blue-400 to-orange-400 bg-fixed min-h-screen`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <VisitorTracker />
          <div className="min-h-screen flex flex-col">
            <Navigation />
              {children}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}