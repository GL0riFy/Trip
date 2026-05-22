"use client";
import React, { useState } from 'react';
import HeroSec from "./../components/HeroNavigator";
import Season from "./../components/Season";
import Popular from "./../components/Popular";
import Map from "./../components/map";
import Event from "./../components/event";

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  // dataPromise สำหรับหน้า Home — ถ้าไม่มี async data จริงๆ ใส่ Promise.resolve() ได้เลย
  const [dataPromise] = useState<Promise<void>>(() => Promise.resolve());

  return (
    <div className="relative min-h-screen text-white">
      <main className="relative z-10 flex flex-col">
        <HeroSec />
        <Popular />
        <Event />
        <Season />
        <Map />
      </main>
    </div>
  );
}