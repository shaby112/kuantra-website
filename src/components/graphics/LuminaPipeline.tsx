export function LuminaPipeline() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-indigo-200/40 bg-[#050A1C] p-4 shadow-[0_30px_80px_-40px_rgba(53,103,255,0.7)]">
      <svg viewBox="0 0 1200 460" className="w-full h-auto" role="img" aria-label="InsightOps data pipeline">
        <defs>
          <linearGradient id="flowLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7CA4FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#64E1FF" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="flowRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8D8CFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#8CE7FF" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="prismA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6A9DFF" />
            <stop offset="100%" stopColor="#7F5DFF" />
          </linearGradient>
          <linearGradient id="prismB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86D7FF" />
            <stop offset="100%" stopColor="#526BFF" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width="1200" height="460" fill="#050A1C" />
        <ellipse cx="600" cy="225" rx="300" ry="150" fill="#4B5FFF" opacity="0.14" />

        {[75, 140, 205, 270, 335].map((y) => (
          <g key={`left-${y}`} opacity="0.95">
            <rect x="80" y={y - 14} width="44" height="28" rx="8" fill="#1D253D" stroke="#43558D" />
            <circle cx="102" cy={y} r="4" fill="#8BE1FF" />
            <path d={`M125 ${y} C 260 ${y}, 360 ${y}, 520 225`} stroke="url(#flowLeft)" strokeWidth="2.8" fill="none" />
          </g>
        ))}

        <polygon points="600,90 660,255 540,255" fill="url(#prismA)" filter="url(#softGlow)" />
        <polygon points="600,90 720,255 660,255" fill="url(#prismB)" opacity="0.9" />
        <polygon points="540,255 660,255 600,360" fill="#6A64FF" opacity="0.95" />

        {[95, 160, 225, 290, 355].map((y) => (
          <g key={`right-${y}`} opacity="0.95">
            <path d={`M680 225 C 810 ${y}, 880 ${y}, 1010 ${y}`} stroke="url(#flowRight)" strokeWidth="2.8" fill="none" />
            <rect x="1012" y={y - 20} width="108" height="40" rx="10" fill="#11182C" stroke="#4B5B88" />
            <rect x="1028" y={y - 6} width="22" height="12" rx="3" fill="#78D3FF" opacity="0.8" />
            <rect x="1055" y={y - 6} width="18" height="12" rx="3" fill="#7368FF" opacity="0.75" />
            <rect x="1077" y={y - 6} width="26" height="12" rx="3" fill="#8CE7FF" opacity="0.75" />
          </g>
        ))}
      </svg>
    </div>
  );
}
