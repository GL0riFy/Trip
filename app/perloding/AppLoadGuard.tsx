"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const PRELOAD_PATH = "/perloding"; // ← เปลี่ยนถ้า path ต่างกัน

export default function AppLoadGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // ถ้าอยู่หน้า preloader อยู่แล้ว → ไม่ต้อง redirect ซ้ำ
    if (pathname.includes(PRELOAD_PATH)) {
      setReady(true);
      return;
    }

    const hasLoaded = sessionStorage.getItem("app_loaded");

    if (!hasLoaded) {
      // เก็บ path ปัจจุบันไว้ เพื่อ redirect กลับหลัง preload เสร็จ (optional)
      sessionStorage.setItem("app_redirect_to", pathname);
      router.replace(PRELOAD_PATH);
    } else {
      setReady(true);
    }
  }, [pathname, router]);

  if (!ready) {
    // ระหว่างที่ตรวจ session — แสดงหน้าว่างกันกระพริบ
    return <div style={{ background: "#1a1008", minHeight: "100vh" }} />;
  }

  return <>{children}</>;
}