"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // 1. นำเข้า Next.js Image Component

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInBackdrop {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-backdrop { animation: fadeInBackdrop 0.4s ease-out forwards; }

        @keyframes popupEnter {
          0% { opacity: 0; transform: scale(0.8) translateY(30px); }
          60% { opacity: 1; transform: scale(1.02) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-popup { animation: popupEnter 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }
        .animate-float-1 { animation: float 4s ease-in-out infinite; }
        .animate-float-2 { animation: float 4s ease-in-out infinite 0.8s; }
        .animate-float-3 { animation: float 4s ease-in-out infinite 1.6s; }
      `}} />

      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-backdrop">
        <div className="bg-white rounded-[32px] p-8 max-w-4xl w-full shadow-2xl relative max-h-[95vh] overflow-y-auto animate-popup">

          {/* ปุ่มไอคอนปิด */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 transition-colors z-10"
            aria-label="Close popup"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          {/* เนื้อหาใน Popup */}
          <div className="text-center pt-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">มาท่องเที่ยวเชียงใหม่</h2>
            <p className="text-lg sm:text-xl font-medium text-gray-600 mb-8">
              ดื่มด่ำกับซอฟต์พาวเวอร์อันล้ำค่า
            </p>

            {/* รูปภาพ 3 รูปเรียงกัน */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center justify-center pb-4">

              {/* รูปที่ 1 */}
              <Link
                href="/"
                onClick={handleClose}
                className="flex justify-center animate-float-1 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="w-full aspect-square relative max-w-[180px] md:max-w-[250px] overflow-hidden rounded-2xl drop-shadow-md">
                  {/* 2. เปลี่ยนมาใช้ Image component พร้อมใส่ priority สำหรับ Preload */}
                  <Image
                    src="/Products/11.png"
                    alt="ร่มเชียงใหม่"
                    fill
                    sizes="(max-width: 768px) 180px, 250px"
                    priority
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* รูปที่ 2 */}
              <Link
                href="/"
                onClick={handleClose}
                className="flex justify-center animate-float-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="w-full aspect-square relative max-w-[180px] md:max-w-[250px] overflow-hidden rounded-2xl drop-shadow-md">
                  <Image
                    src="/Products/2.png"
                    alt="เที่ยวเชียงใหม่ 2"
                    fill
                    sizes="(max-width: 768px) 180px, 250px"
                    priority
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* รูปที่ 3 */}
              <Link
                href="/"
                onClick={handleClose}
                className="flex justify-center animate-float-3 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="w-full aspect-square relative max-w-[180px] md:max-w-[250px] overflow-hidden rounded-2xl drop-shadow-md">
                  <Image
                    src="/Products/3.png"
                    alt="เที่ยวเชียงใหม่ 3"
                    fill
                    sizes="(max-width: 768px) 180px, 250px"
                    priority
                    className="object-cover"
                  />
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}