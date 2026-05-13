"use client";
import React, { useState, useEffect } from 'react'; // เพิ่ม useEffect
import Image from "next/image";
import HeroSec from "./../components/HeroNavigator";
import Season from "./../components/Season";
import Popular from "./../components/Popular";
import Map from "./../components/map";
import Event from "./../components/event";
import ChiangMaiPreloader from '@/app/perloding/ChiangMaiPreloader';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  
  if (!isReady) {
    return <ChiangMaiPreloader onComplete={() => setIsReady(true)} />;
  }

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