import type { Metadata } from "next";
// นำเข้าฟอนต์ Prompt และ Itim
import { Prompt, Itim } from "next/font/google";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import WelcomePopup from "../components/WelcomePopup";
import ScrollToTop from "../components/ScrollToTop";
import '../globals.css';
import { Toaster } from 'react-hot-toast';

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
        className={`${promptFont.className} ${itimFont.variable} antialiased bg-fixed min-h-screen`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <WelcomePopup />
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '14px',
              padding: '14px 18px',
              fontSize: '14px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            },
          }}
        />
            <Navigation />
            {children}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}