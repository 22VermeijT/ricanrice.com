// All custom SVG illustrations and decorative elements for the site

export function PrStar({
  size = 100,
  color = "white",
  opacity = 1,
  className = "",
}: {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
}) {
  const c = size / 2;
  const r1 = c;
  const r2 = c * 0.382;
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (i * Math.PI * 2) / 10 - Math.PI / 2;
    const r = i % 2 === 0 ? r1 : r2;
    return `${c + Math.cos(a) * r},${c + Math.sin(a) * r}`;
  }).join(" ");
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ opacity }}
    >
      <polygon points={pts} fill={color} />
    </svg>
  );
}

export function FoodPlate({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Drop shadow */}
      <ellipse cx="200" cy="375" rx="145" ry="18" fill="black" opacity="0.18" />

      {/* Plate rim */}
      <circle cx="200" cy="195" r="178" fill="white" />
      <circle cx="200" cy="195" r="168" fill="#FFF7EE" />

      {/* === Food sections === */}
      {/* Arroz con gandules — golden amber */}
      <path d="M 200 195 L 32 195 A 168 168 0 0 1 116 55 Z" fill="#D4891A" />
      {/* Pernil — deep mahogany */}
      <path d="M 200 195 L 116 55 A 168 168 0 0 1 284 55 Z" fill="#6B220A" />
      {/* Habichuelas — brick red */}
      <path d="M 200 195 L 284 55 A 168 168 0 0 1 368 195 Z" fill="#A82520" />
      {/* Tostones — warm yellow */}
      <path d="M 200 195 L 368 195 A 168 168 0 0 1 200 363 Z" fill="#E8B832" />

      {/* Food texture dots on arroz */}
      {[
        [90, 140], [75, 165], [95, 175], [115, 150], [105, 130], [80, 185], [130, 160],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#B87510" opacity="0.6" />
      ))}
      {/* Gan dots */}
      {[[90, 145], [110, 160], [75, 175]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#5A8A2A" opacity="0.7" />
      ))}

      {/* Food texture on pernil */}
      <path d="M 165 100 Q 180 85 200 95 Q 215 105 205 120 Q 195 135 175 130 Q 155 125 165 100 Z"
        fill="#8B3510" />
      <path d="M 190 90 Q 205 78 215 88 Q 222 100 210 110 Q 198 120 188 108 Q 180 96 190 90 Z"
        fill="#7A2808" />

      {/* Tostones pieces */}
      {[
        [245, 280, 25, 14],
        [290, 295, 22, 13],
        [260, 320, 28, 13],
        [215, 310, 20, 12],
      ].map(([x, y, rx, ry], i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="#C89520" />
      ))}

      {/* White divider lines */}
      {[
        [200, 195, 32, 195],
        [200, 195, 116, 55],
        [200, 195, 284, 55],
        [200, 195, 368, 195],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="3" opacity="0.7" />
      ))}

      {/* Center medallion */}
      <circle cx="200" cy="195" r="32" fill="white" />
      <circle cx="200" cy="195" r="26" fill="#FFF0E0" />

      {/* PR star in center */}
      <polygon
        points="200,179 204.5,192 218,192 207,200 211,213 200,205 189,213 193,200 182,192 195.5,192"
        fill="#E8192C"
      />

      {/* Food section labels */}
      <text x="102" y="182" fill="white" fontSize="10" fontWeight="700" textAnchor="middle"
        fontFamily="Georgia, serif" opacity="0.95">Arroz</text>
      <text x="200" y="105" fill="white" fontSize="10" fontWeight="700" textAnchor="middle"
        fontFamily="Georgia, serif" opacity="0.95">Pernil</text>
      <text x="302" y="160" fill="white" fontSize="9" fontWeight="700" textAnchor="middle"
        fontFamily="Georgia, serif" opacity="0.95">Habichuelas</text>
      <text x="258" y="288" fill="#5A3800" fontSize="10" fontWeight="700" textAnchor="middle"
        fontFamily="Georgia, serif" opacity="0.9">Tostones</text>

      {/* Steam */}
      <path d="M 160 20 Q 154 5 160 -6" fill="none" stroke="white" strokeWidth="2.5"
        strokeLinecap="round" opacity="0.65" />
      <path d="M 200 12 Q 194 -3 200 -14" fill="none" stroke="white" strokeWidth="2.5"
        strokeLinecap="round" opacity="0.65" />
      <path d="M 240 20 Q 234 5 240 -6" fill="none" stroke="white" strokeWidth="2.5"
        strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}

export function PlantainBunch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 110" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Back plantains */}
      <path d="M 75 95 Q 50 65 65 30 Q 78 0 95 10 Q 112 20 105 55 Q 98 85 75 95 Z"
        fill="#D4A820" />
      <path d="M 95 92 Q 70 62 85 27 Q 98 -3 115 7 Q 132 17 125 52 Q 118 82 95 92 Z"
        fill="#C8951A" />
      {/* Front plantains */}
      <path d="M 15 98 Q -5 68 15 33 Q 30 3 48 15 Q 65 27 55 62 Q 45 92 15 98 Z"
        fill="#F0C832" />
      <path d="M 45 102 Q 22 72 40 37 Q 55 7 73 19 Q 90 31 80 66 Q 70 96 45 102 Z"
        fill="#E8B825" />
      {/* Center */}
      <path d="M 30 105 Q 8 75 28 40 Q 43 10 61 22 Q 78 34 68 69 Q 58 99 30 105 Z"
        fill="#F4D035" />
      {/* Crown */}
      <path d="M 45 12 Q 50 0 55 5 Q 60 10 58 20 L 45 12 Z" fill="#4A3520" />
      <path d="M 70 18 Q 78 6 83 12 Q 87 18 82 26 L 70 18 Z" fill="#4A3520" />
      <path d="M 93 22 Q 102 12 106 18 Q 110 25 103 31 L 93 22 Z" fill="#4A3520" />
      {/* Highlight */}
      <path d="M 32 90 Q 12 68 22 42 Q 28 30 34 36 Q 28 52 30 75 Z" fill="white" opacity="0.2" />
    </svg>
  );
}

export function TropicalLeaf({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 160" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 150 Q 10 100 15 50 Q 20 10 60 5 Q 100 10 105 50 Q 110 100 60 150 Z"
        fill="#1A7A2A" />
      <path d="M 60 150 Q 60 80 60 5" stroke="#0F4A18" strokeWidth="2.5" fill="none" />
      {/* Leaf veins */}
      {[40, 60, 80, 100, 120].map((y, i) => (
        <g key={i}>
          <path d={`M 60 ${y} Q 35 ${y - 8} 22 ${y + 5}`} stroke="#0F4A18" strokeWidth="1" fill="none" opacity="0.5" />
          <path d={`M 60 ${y} Q 85 ${y - 8} 98 ${y + 5}`} stroke="#0F4A18" strokeWidth="1" fill="none" opacity="0.5" />
        </g>
      ))}
      {/* Shine */}
      <path d="M 55 20 Q 40 60 45 100" stroke="white" strokeWidth="3" fill="none" opacity="0.15" strokeLinecap="round" />
    </svg>
  );
}

export function HibiscusFlower({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      {/* Petals */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 50 + Math.cos(rad) * 22;
        const cy = 50 + Math.sin(rad) * 22;
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="16"
            ry="26"
            fill={i % 2 === 0 ? "#E8192C" : "#FF4060"}
            opacity="0.9"
            transform={`rotate(${angle + 90}, ${cx}, ${cy})`}
          />
        );
      })}
      {/* Center */}
      <circle cx="50" cy="50" r="12" fill="#C8952C" />
      <circle cx="50" cy="50" r="7" fill="#E8A020" />
      {/* Stamen */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return (
          <circle key={i} cx={50 + Math.cos(r) * 9} cy={50 + Math.sin(r) * 9} r="2" fill="#5A0A0A" />
        );
      })}
    </svg>
  );
}


export function RiceSteamBowl({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 130" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Steam lines */}
      <path d="M 55 30 Q 48 15 55 5" fill="none" stroke="#C8952C" strokeWidth="3"
        strokeLinecap="round" opacity="0.8" />
      <path d="M 80 22 Q 73 7 80 -3" fill="none" stroke="#C8952C" strokeWidth="3"
        strokeLinecap="round" opacity="0.8" />
      <path d="M 105 30 Q 98 15 105 5" fill="none" stroke="#C8952C" strokeWidth="3"
        strokeLinecap="round" opacity="0.8" />
      {/* Bowl body */}
      <path d="M 15 70 Q 15 115 80 115 Q 145 115 145 70 Z" fill="#E8192C" />
      {/* Bowl rim */}
      <ellipse cx="80" cy="70" rx="65" ry="18" fill="#FF3050" />
      {/* Rice surface */}
      <ellipse cx="80" cy="65" rx="55" ry="15" fill="#FFF5E0" />
      {/* Rice texture */}
      {[60, 72, 84, 96, 108].map((x, i) => (
        <ellipse key={i} cx={x} cy={65} rx="4" ry="2" fill="#E8D0A0" opacity="0.7" />
      ))}
      {[66, 78, 90, 102].map((x, i) => (
        <ellipse key={i} cx={x} cy={69} rx="3.5" ry="2" fill="#D4B880" opacity="0.5" />
      ))}
      {/* Gandules dots */}
      {[[65, 63], [85, 60], [100, 65], [75, 68]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#3A7A10" opacity="0.8" />
      ))}
      {/* Bottom shadow */}
      <ellipse cx="80" cy="115" rx="65" ry="10" fill="black" opacity="0.12" />
      {/* Shine on bowl */}
      <path d="M 25 75 Q 30 95 40 105" stroke="white" strokeWidth="4" fill="none"
        opacity="0.15" strokeLinecap="round" />
    </svg>
  );
}

export function FlagTriangleSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 260" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Triangle */}
      <polygon points="0,0 300,130 0,260" fill="#E8192C" />
      {/* Star */}
      <polygon
        points="82,130 90,107 68,92 93,92 100,70 107,92 132,92 110,107 118,130 100,115"
        fill="white"
      />
    </svg>
  );
}

export function WaveDivider({
  topColor = "#ffffff",
  bottomColor = "#f9f6f0",
  className = "",
}: {
  topColor?: string;
  bottomColor?: string;
  className?: string;
}) {
  return (
    <div className={`relative h-16 overflow-hidden ${className}`} style={{ backgroundColor: topColor }}>
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
      >
        <path
          d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
