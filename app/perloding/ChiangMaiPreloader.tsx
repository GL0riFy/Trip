"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Lantern {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: [string, string];
}

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  animDelay: number;
  animDuration: number;
  opacity: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LANTERN_COLORS: [string, string][] = [
  ["#f5c842", "#e8852a"],
  ["#ff9a4a", "#e05a10"],
  ["#fde080", "#f5a020"],
  ["#ffb347", "#cc6600"],
];

const LOADING_PHRASES = [
  "Loading…",
  "Opening the city gates…",
  "Lighting the sky lanterns…",
  "Brewing doi coffee…",
  "Ready to explore ✦",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: rand(0, 100),
    top: rand(0, 100),
    size: rand(0.5, 3),
    animDelay: rand(0, 4),
    animDuration: rand(2, 5),
    opacity: rand(0.3, 1),
  }));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarField({ stars }: { stars: Star[] }) {
  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: "55%" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.animDelay}s`,
            animationDuration: `${s.animDuration}s`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}

function TempleScene() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full"
      style={{ height: "65%" }}
      viewBox="0 0 1200 520"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Far mountains */}
      <path
        d="M0,520 L0,280 Q80,220 150,190 Q230,155 290,175 Q350,195 400,170 Q480,140 540,120 Q620,95 680,100 Q760,105 820,125 Q880,145 940,135 Q1010,122 1080,145 Q1140,165 1200,155 L1200,520 Z"
        fill="#3a1a50"
        opacity={0.6}
      />
      {/* Mid mountains */}
      <path
        d="M0,520 L0,320 Q60,270 120,255 Q180,240 240,260 Q290,278 330,255 Q380,228 430,215 Q500,198 570,205 Q640,212 690,190 Q750,165 820,160 Q890,155 950,175 Q1010,195 1060,185 Q1120,172 1200,190 L1200,520 Z"
        fill="#2a1040"
        opacity={0.8}
      />
      {/* Near mountains */}
      <path
        d="M0,520 L0,370 Q50,335 100,320 Q160,302 200,315 Q250,330 290,308 Q340,282 390,275 Q450,266 510,280 Q555,292 600,270 Q650,245 720,240 Q800,234 860,255 Q920,275 970,260 Q1040,240 1120,260 Q1160,272 1200,265 L1200,520 Z"
        fill="#1a0830"
        opacity={0.9}
      />
      {/* Mist */}
      <ellipse cx={600} cy={350} rx={700} ry={35} fill="rgba(255,200,120,0.08)" />
      <ellipse cx={600} cy={365} rx={600} ry={20} fill="rgba(255,220,160,0.06)" />
      {/* Ground */}
      <rect x={0} y={420} width={1200} height={100} fill="#0e0818" />
      <path d="M0,420 Q300,405 600,415 Q900,425 1200,410 L1200,440 L0,440 Z" fill="#160c28" />
      {/* Temple base platforms */}
      <rect x={536} y={360} width={128} height={12} rx={1} fill="#1a0c24" />
      <rect x={548} y={350} width={104} height={12} rx={1} fill="#1e0f2c" />
      {/* Chedi tiers */}
      <rect x={560} y={332} width={80} height={20} rx={1} fill="#221236" />
      <rect x={568} y={316} width={64} height={18} rx={1} fill="#261540" />
      <rect x={576} y={302} width={48} height={16} rx={1} fill="#2a1848" />
      <rect x={582} y={290} width={36} height={14} rx={1} fill="#2e1b50" />
      {/* Spire rings */}
      <rect x={587} y={282} width={26} height={10} rx={1} fill="#321e58" />
      <rect x={590} y={274} width={20} height={10} rx={2} fill="#361f5c" />
      <rect x={593} y={267} width={14} height={9} rx={2} fill="#3a2260" />
      <rect x={595} y={261} width={10} height={8} rx={2} fill="#3e2464" />
      {/* Golden spire tip */}
      <polygon points="600,235 594,262 606,262" fill="#c8902a" />
      <polygon points="600,240 596,261 604,261" fill="#f0c050" />
      {/* Glow at top */}
      <ellipse cx={600} cy={248} rx={6} ry={6} fill="rgba(245,200,66,0.3)" />
      <ellipse cx={600} cy={248} rx={3} ry={3} fill="rgba(245,200,66,0.6)" />
      {/* Flanking prangs */}
      <polygon points="548,310 544,344 552,344" fill="#1e0f2c" />
      <polygon points="652,310 648,344 656,344" fill="#1e0f2c" />
    </svg>
  );
}

function LanternFloat({ lantern }: { lantern: Lantern }) {
  const [c1, c2] = lantern.color;
  return (
    <div
      className="absolute rounded-t-full"
      style={{
        left: `${lantern.left}%`,
        bottom: "28%",
        width: `${lantern.size}px`,
        height: `${lantern.size * 1.3}px`,
        background: `radial-gradient(ellipse at 40% 35%, ${c1}, ${c2})`,
        boxShadow: `0 0 ${lantern.size * 0.8}px ${c1}88`,
        animation: `floatUp ${lantern.duration}s ${lantern.delay}s ease-in forwards`,
        opacity: 0,
      }}
    />
  );
}

function ProgressBar({ progress }: { progress: number }) {
  const phraseIndex = Math.min(Math.floor(progress / 25), LOADING_PHRASES.length - 1);
  const phrase = LOADING_PHRASES[phraseIndex];

  return (
    <div className="mt-7 flex w-44 flex-col items-center gap-2">
      {/* Track */}
      <div className="relative h-px w-full overflow-visible" style={{ background: "rgba(255,255,255,0.15)" }}>
        <div
          className="absolute left-0 top-0 h-full transition-all duration-150 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #f5c842, #e8852a)",
          }}
        />
        {/* Dot */}
        <div
          className="absolute -top-[3px] h-[7px] w-[7px] rounded-full transition-all duration-150 ease-out"
          style={{
            right: `${100 - progress}%`,
            transform: "translateX(50%)",
            background: "#f5c842",
            boxShadow: "0 0 8px #f5c842",
          }}
        />
      </div>

      {/* Percentage */}
      <span
        className="text-[10px] font-light tracking-widest"
        style={{ color: "rgba(255,220,130,0.6)" }}
      >
        {Math.round(progress)}%
      </span>

      {/* Phrase */}
      <span
        className="h-[14px] text-[10px] tracking-wider transition-opacity duration-400"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {phrase}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface PreloaderProps {
  onComplete: () => void;
}

export default function ChiangMaiPreloader({ onComplete }: PreloaderProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);
  const [lanterns, setLanterns] = useState<Lantern[]>([]);
  const [progress, setProgress] = useState(0);
  const lanternIdRef = useRef(0);
  const progressRef = useRef(0);

  useEffect(() => {
    setStars(generateStars(70));
    setMounted(true);
  }, []);

  // Spawn lanterns
  useEffect(() => {
    function spawnLantern() {
      const id = lanternIdRef.current++;
      const color = LANTERN_COLORS[Math.floor(Math.random() * LANTERN_COLORS.length)];
      const size = rand(12, 26);
      const duration = rand(10, 18);
      const delay = rand(0, 2);

      const newLantern: Lantern = {
        id,
        left: rand(20, 80),
        size,
        duration,
        delay,
        color,
      };

      setLanterns((prev) => [...prev, newLantern]);

      // Remove after animation ends
      setTimeout(() => {
        setLanterns((prev) => prev.filter((l) => l.id !== id));
      }, (duration + delay + 1) * 1000);
    }

    spawnLantern();
    const interval = setInterval(spawnLantern, 1800);
    return () => clearInterval(interval);
  }, []);

  // Progress animation
useEffect(() => {
    function tick() {
      const step = rand(2, 6); // ปรับให้เร็วขึ้นนิดนึง
      progressRef.current = Math.min(100, progressRef.current + step);
      setProgress(progressRef.current);

      if (progressRef.current < 100) {
        setTimeout(tick, rand(50, 120));
      } else {
        // --- ส่วนสุดท้าย: เมื่อโหลดเสร็จ ---
        setTimeout(() => {
          onComplete(); // สั่งให้หน้าหลักเริ่มแสดงผล
        }, 800); 
      }
    }
    const timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, [onComplete]);

  if (!mounted) return <div className="min-h-screen bg-[#1a1008]" />;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
    <>
      {/* Global keyframes injected once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Kanit:wght@300;400&display=swap');

        @keyframes twinkle {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50%       { opacity: 0.2; transform: scale(0.6); }
        }
        @keyframes floatUp {
          0%   { transform: translateY(0) rotate(-3deg); opacity: 0; }
          10%  { opacity: 0.85; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(-120vh) rotate(5deg); opacity: 0; }
        }
        @keyframes mistDrift {
          from { transform: translateX(0) scaleY(1); opacity: 0.7; }
          to   { transform: translateX(30px) scaleY(1.4); opacity: 1; }
        }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-mist     { animation: mistDrift 8s ease-in-out infinite alternate; }
        .animate-mist2    { animation: mistDrift 8s ease-in-out infinite alternate; animation-delay: -3s; }
        .font-playfair    { font-family: 'Playfair Display', serif; }
        .font-kanit       { font-family: 'Kanit', sans-serif; }
      `}</style>

      {/* Scene wrapper */}
      <div
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
        style={{ background: "#1a1008" }}
      >
        {/* Sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0d0820 0%, #1a1240 20%, #2d1b5e 38%, #7a2e2e 55%, #c4551a 68%, #e8852a 78%, #f5c842 88%, #fde9a2 100%)",
          }}
        />

        {/* Stars */}
        <StarField stars={stars} />

        {/* Temple + Mountains SVG */}
        <TempleScene />

        {/* Mist layers */}
        <div
          className="animate-mist pointer-events-none absolute left-[-10%] w-[120%] rounded-[50%]"
          style={{
            bottom: "28%",
            height: "80px",
            background: "rgba(255,230,180,0.18)",
            filter: "blur(18px)",
          }}
        />
        <div
          className="animate-mist2 pointer-events-none absolute left-[-5%] w-[120%] rounded-[50%]"
          style={{
            bottom: "32%",
            height: "50px",
            background: "rgba(255,255,255,0.08)",
            filter: "blur(18px)",
          }}
        />

        {/* Lanterns */}
        <div className="pointer-events-none absolute inset-0">
          {lanterns.map((l) => (
            <LanternFloat key={l.id} lantern={l} />
          ))}
        </div>

        {/* Central content */}
        <div
          className="relative z-10 flex flex-col items-center gap-1.5 text-center"
          style={{ marginTop: "-60px" }}
        >
          {/* Label */}
          <p
            className="font-kanit text-[11px] font-light uppercase tracking-[0.35em]"
            style={{ color: "rgba(255,220,130,0.8)" }}
          >
            Welcome to
          </p>

          {/* Divider */}
          <div className="my-1.5 flex items-center gap-2.5">
            <div className="h-px w-10" style={{ background: "rgba(255,200,80,0.4)" }} />
            <div
              className="h-1.5 w-1.5 rotate-45"
              style={{ background: "rgba(255,200,80,0.7)" }}
            />
            <div className="h-px w-10" style={{ background: "rgba(255,200,80,0.4)" }} />
          </div>

          {/* City name */}
          <h1
            className="font-playfair text-[clamp(42px,8vw,80px)] font-bold leading-none tracking-wide text-white"
            style={{
              textShadow:
                "0 0 60px rgba(255,180,50,0.4), 0 2px 4px rgba(0,0,0,0.6)",
            }}
          >
            Chiang Mai
          </h1>

          {/* Subtitle */}
          <p
            className="font-kanit mt-1 text-[clamp(14px,2.5vw,18px)] font-light uppercase tracking-[0.25em]"
            style={{ color: "rgba(255,220,130,0.9)" }}
          >
            Rose of the North
          </p>

          {/* Tagline */}
          <p
            className="font-playfair mt-2.5 text-[clamp(11px,2vw,14px)] italic tracking-wider"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Ancient temples · Mountain mist · Lanna heritage
          </p>

          {/* Progress */}
          <ProgressBar progress={progress} />
        </div>
      </div>
    </>
    </div>
  );
}