"use client";
import Image from "next/image";
import HeroSec from "./../components/HeroNavigator";
import F_prducts from "./../components/FeaturedProducts";
import Popular from "./../components/Popular";
import Map from "./../components/map";

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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* 🔹 Content */}
      <main className="relative z-10 flex flex-col">
        <HeroSec />
        <Popular />
        <Map />
      </main>

    </div>
  );
}
