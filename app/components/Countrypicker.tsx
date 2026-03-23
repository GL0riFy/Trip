'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: 'TH', name: 'Thailand', flag: 'th' },
  { code: 'US', name: 'United States', flag: 'us' },
  { code: 'JP', name: 'Japan', flag: 'jp' },
  { code: 'GB', name: 'United Kingdom', flag: 'gb' },
  { code: 'DE', name: 'Germany', flag: 'de' },
  { code: 'KR', name: 'South Korea', flag: 'kr' },
  { code: 'SG', name: 'Singapore', flag: 'sg' },
  { code: 'CN', name: 'China', flag: 'cn' },
  { code: 'FR', name: 'France', flag: 'fr' },
  { code: 'AU', name: 'Australia', flag: 'au' },
  { code: 'IN', name: 'India', flag: 'in' },
  { code: 'BR', name: 'Brazil', flag: 'br' },
  { code: 'CA', name: 'Canada', flag: 'ca' },
  { code: 'IT', name: 'Italy', flag: 'it' },
  { code: 'NL', name: 'Netherlands', flag: 'nl' },
  { code: 'RU', name: 'Russia', flag: 'ru' },
  { code: 'ES', name: 'Spain', flag: 'es' },
  { code: 'MX', name: 'Mexico', flag: 'mx' },
  { code: 'ID', name: 'Indonesia', flag: 'id' },
  { code: 'MY', name: 'Malaysia', flag: 'my' },
  { code: 'PH', name: 'Philippines', flag: 'ph' },
  { code: 'VN', name: 'Vietnam', flag: 'vn' },
  { code: 'TW', name: 'Taiwan', flag: 'tw' },
  { code: 'HK', name: 'Hong Kong', flag: 'hk' },
  { code: 'SA', name: 'Saudi Arabia', flag: 'sa' },
  { code: 'AE', name: 'UAE', flag: 'ae' },
  { code: 'ZA', name: 'South Africa', flag: 'za' },
  { code: 'NG', name: 'Nigeria', flag: 'ng' },
  { code: 'EG', name: 'Egypt', flag: 'eg' },
  { code: 'AR', name: 'Argentina', flag: 'ar' },
  { code: 'PL', name: 'Poland', flag: 'pl' },
  { code: 'SE', name: 'Sweden', flag: 'se' },
  { code: 'CH', name: 'Switzerland', flag: 'ch' },
  { code: 'NO', name: 'Norway', flag: 'no' },
  { code: 'DK', name: 'Denmark', flag: 'dk' },
  { code: 'FI', name: 'Finland', flag: 'fi' },
  { code: 'PT', name: 'Portugal', flag: 'pt' },
  { code: 'NZ', name: 'New Zealand', flag: 'nz' },
  { code: 'PK', name: 'Pakistan', flag: 'pk' },
  { code: 'BD', name: 'Bangladesh', flag: 'bd' },
  { code: 'XX', name: 'Unknown', flag: 'xx' },
];

function FlagImg({ code }: { code: string }) {
  if (code === 'XX') {
    return (
      <span style={{
        width: 36, height: 36, borderRadius: 8, background: '#e8e8e8',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, flexShrink: 0,
      }}>🌐</span>
    );
  }
  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      alt={code}
      width={36}
      height={24}
      style={{
        borderRadius: 6, objectFit: 'cover',
        width: 36, height: 24, flexShrink: 0,
        border: '0.5px solid rgba(0,0,0,0.08)',
      }}
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
}

interface CountryPickerProps {
  onSelect: (code: string) => void;
}

export function CountryPicker({ onSelect }: CountryPickerProps) {
  const [search, setSearch] = useState('');
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
          fontFamily: 'var(--font-sora), sans-serif',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: 20,
            padding: '28px 24px 20px',
            width: 400,
            maxWidth: '92vw',
            boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ marginBottom: 20 }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>👋</div>
            <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 4px', color: '#1a1a1a' }}>
              Hi there!
            </h2>
            <p style={{ fontSize: 13, color: '#888', margin: 0 }}>
              Where are you visiting from?
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ position: 'relative', marginBottom: 12 }}
          >
            <span style={{
              position: 'absolute', left: 12, top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 14, color: '#bbb', pointerEvents: 'none',
            }}>🔍</span>
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px 10px 36px',
                fontSize: 13, border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: 10, outline: 'none',
                boxSizing: 'border-box',
                background: '#f5f5f5', color: '#1a1a1a',
                fontFamily: 'inherit',
              }}
              autoFocus
            />
          </motion.div>

          {/* List */}
          <div style={{
            maxHeight: 320, overflowY: 'auto',
            display: 'flex', flexDirection: 'column', gap: 2,
          }}>
            {filtered.map((c, i) => (
              <motion.button
                key={c.code}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + i * 0.018, duration: 0.25 }}
                onClick={() => onSelect(c.code)}
                onMouseEnter={() => setHoveredCode(c.code)}
                onMouseLeave={() => setHoveredCode(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '9px 12px',
                  border: 'none',
                  background: hoveredCode === c.code ? '#f0f0f0' : 'transparent',
                  borderRadius: 10, cursor: 'pointer',
                  textAlign: 'left', width: '100%',
                  fontFamily: 'inherit',
                  transition: 'background .12s',
                }}
              >
                <FlagImg code={c.code} />
                <span style={{ flex: 1, fontSize: 14, color: '#1a1a1a', fontWeight: 400 }}>
                  {c.name}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: '#aaa',
                  background: '#f0f0f0', padding: '2px 7px',
                  borderRadius: 6, letterSpacing: '.04em',
                }}>
                  {c.code}
                </span>
              </motion.button>
            ))}
            {filtered.length === 0 && (
              <p style={{ fontSize: 13, color: '#aaa', textAlign: 'center', padding: '20px 0' }}>
                No results for &ldquo;{search}&rdquo;
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}