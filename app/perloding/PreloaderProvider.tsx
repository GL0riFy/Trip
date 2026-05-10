// "use client";

// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import ChiangMaiPreloader from "./page";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface PreloaderContextValue {
//   /**
//    * Call this when navigating to a new page that needs preloading.
//    * Pass an array of Promises (image loads, fetches, etc.)
//    * The preloader will show until all resolve + minDuration passes.
//    */
//   navigateWithPreloader: (
//     href: string,
//     tasks: Promise<unknown>[],
//     minDuration?: number
//   ) => void;
// }

// // ─── Context ──────────────────────────────────────────────────────────────────

// const PreloaderContext = createContext<PreloaderContextValue>({
//   navigateWithPreloader: () => {},
// });

// export function usePreloaderNav() {
//   return useContext(PreloaderContext);
// }

// // ─── Provider ─────────────────────────────────────────────────────────────────

// export function PreloaderProvider({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [visible, setVisible] = useState(false);
//   const [fadeOut, setFadeOut] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const progressRef = useRef(0);
//   const tickerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // Fake-progress ticker while tasks run
//   function startTicker() {
//     progressRef.current = 0;
//     setProgress(0);

//     function tick() {
//       // Slow down as it approaches 90 — never reaches 100 on its own
//       const remaining = 90 - progressRef.current;
//       if (remaining <= 0) return;
//       const step = Math.random() * (remaining * 0.15) + 0.5;
//       progressRef.current = Math.min(90, progressRef.current + step);
//       setProgress(progressRef.current);
//       tickerRef.current = setTimeout(tick, 80 + Math.random() * 80);
//     }
//     tick();
//   }

//   function stopTicker() {
//     if (tickerRef.current) clearTimeout(tickerRef.current);
//   }

//   function finishProgress(onDone: () => void) {
//     stopTicker();
//     // Snap to 100
//     progressRef.current = 100;
//     setProgress(100);
//     // Fade out after a beat
//     setTimeout(() => {
//       setFadeOut(true);
//       setTimeout(() => {
//         setVisible(false);
//         setFadeOut(false);
//         setProgress(0);
//         onDone();
//       }, 600);
//     }, 300);
//   }

//   // Hide preloader when route actually changes (safety net)
//   const prevPathname = useRef(pathname);
//   useEffect(() => {
//     if (pathname !== prevPathname.current) {
//       prevPathname.current = pathname;
//     }
//   }, [pathname]);

//   const navigateWithPreloader = useCallback(
//     (href: string, tasks: Promise<unknown>[], minDuration = 1200) => {
//       setVisible(true);
//       setFadeOut(false);
//       startTicker();

//       const start = Date.now();

//       Promise.allSettled(tasks).then(() => {
//         const elapsed = Date.now() - start;
//         const wait = Math.max(0, minDuration - elapsed);
//         setTimeout(() => {
//           finishProgress(() => router.push(href));
//         }, wait);
//       });
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [router]
//   );

//   return (
//     <PreloaderContext.Provider value={{ navigateWithPreloader }}>
//       {children}

//       {/* Overlay preloader — sits above everything */}
//       {visible && (
//         <div
//           className="fixed inset-0 z-[9999] transition-opacity duration-600"
//           style={{ opacity: fadeOut ? 0 : 1, pointerEvents: fadeOut ? "none" : "auto" }}
//         >
//           <ChiangMaiPreloader progress={progress} />
//         </div>
//       )}
//     </PreloaderContext.Provider>
//   );
// }