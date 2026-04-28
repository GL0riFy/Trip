"use client";
import Image from "next/image";
import HeroSec from "./../components/HeroNavigator";
import Season from "./../components/Season";
import Popular from "./../components/Popular";
import Map from "./../components/map";
import Event from "./../components/event";

export default function Home() {
  return (
    <div className="relative min-h-screen text-white">
      
      {/* 🔹 Background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* 🔹 Content */}
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
