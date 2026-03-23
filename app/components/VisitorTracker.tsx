'use client';

import { useEffect, useState } from 'react';
import { CountryPicker } from './Countrypicker';

const VISITED_KEY = 'visitor_country_recorded';

function detectSource(): string {
  if (typeof window === 'undefined') return 'direct';
  const ref = document.referrer;
  if (!ref) return 'direct';
  if (/google|bing|yahoo|duckduckgo|baidu/i.test(ref)) return 'organic';
  if (/facebook|twitter|instagram|tiktok|line|youtube/i.test(ref)) return 'social';
  return 'referral';
}

function detectDevice(): string {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return 'mobile';
  return 'desktop';
}

export function VisitorTracker() {
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(VISITED_KEY)) {
      setShowPicker(true);
    }
  }, []);

  const handleSelect = async (code: string) => {
    setShowPicker(false);
    localStorage.setItem(VISITED_KEY, '1');
    try {
      await fetch('/api/visitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: code,
          source: detectSource(),
          device: detectDevice(),
        }),
      });
    } catch { /* silent */ }
  };

  if (!showPicker) return null;
  return <CountryPicker onSelect={handleSelect} />;
}