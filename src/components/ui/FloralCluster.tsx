"use client";

import { motion } from "framer-motion";
import { HibiscusFlower, TropicalLeaf } from "./Illustrations";

type FloralItem = {
  type: "hibiscus" | "leaf";
  size: number;       // px, controls width; leaf height = size * 1.35
  top: number;        // px offset within cluster container
  left: number;
  rotate: number;     // initial rotation degrees
  delay: number;      // animation delay seconds
  dur: number;        // float cycle seconds
  amp: number;        // vertical float amplitude px
  opacity: number;
};

// Five distinct cluster compositions
const CLUSTERS: Record<string, { w: number; h: number; items: FloralItem[] }> = {
  // 3 items — hibiscus-dominant, tight
  A: {
    w: 120, h: 110,
    items: [
      { type: "hibiscus", size: 58, top: 28,  left: 0,  rotate: -8,  delay: 0,   dur: 4.6, amp: 10, opacity: 0.92 },
      { type: "leaf",     size: 36, top: 50,  left: 60, rotate: 35,  delay: 0.6, dur: 3.8, amp: 8,  opacity: 0.70 },
      { type: "hibiscus", size: 28, top: 0,   left: 52, rotate: 18,  delay: 1.1, dur: 5.1, amp: 12, opacity: 0.62 },
    ],
  },
  // 3 items — leaf-dominant, spread
  B: {
    w: 130, h: 120,
    items: [
      { type: "leaf",     size: 64, top: 20,  left: 10, rotate: 12,  delay: 0,   dur: 5.2, amp: 9,  opacity: 0.75 },
      { type: "hibiscus", size: 40, top: 60,  left: 0,  rotate: -14, delay: 0.8, dur: 4.1, amp: 11, opacity: 0.88 },
      { type: "leaf",     size: 26, top: 5,   left: 72, rotate: -32, delay: 1.4, dur: 3.6, amp: 7,  opacity: 0.55 },
    ],
  },
  // 2 items — two hibiscus, simple
  C: {
    w: 100, h: 90,
    items: [
      { type: "hibiscus", size: 52, top: 20,  left: 0,  rotate: -12, delay: 0.2, dur: 4.8, amp: 10, opacity: 0.90 },
      { type: "hibiscus", size: 30, top: 0,   left: 44, rotate: 22,  delay: 1.0, dur: 3.9, amp: 13, opacity: 0.60 },
    ],
  },
  // 3 items — balanced mix
  D: {
    w: 115, h: 115,
    items: [
      { type: "leaf",     size: 54, top: 30,  left: 5,  rotate: -18, delay: 0,   dur: 5.5, amp: 8,  opacity: 0.68 },
      { type: "hibiscus", size: 38, top: 55,  left: 52, rotate: 8,   delay: 0.7, dur: 4.3, amp: 11, opacity: 0.85 },
      { type: "hibiscus", size: 22, top: 5,   left: 50, rotate: -5,  delay: 1.3, dur: 3.5, amp: 14, opacity: 0.50 },
    ],
  },
  // 3 items — large leaf anchor + two small hibiscus
  E: {
    w: 125, h: 130,
    items: [
      { type: "leaf",     size: 70, top: 10,  left: 20, rotate: 8,   delay: 0,   dur: 6.0, amp: 7,  opacity: 0.65 },
      { type: "hibiscus", size: 34, top: 70,  left: 0,  rotate: -20, delay: 0.5, dur: 4.4, amp: 10, opacity: 0.82 },
      { type: "hibiscus", size: 24, top: 0,   left: 72, rotate: 30,  delay: 1.2, dur: 3.7, amp: 12, opacity: 0.55 },
    ],
  },
};

interface Props {
  variant?: keyof typeof CLUSTERS;
  className?: string;
  style?: React.CSSProperties;
  /** Glow color fed into each flower's drop-shadow */
  glowColor?: string;
  /** Mirror the whole cluster horizontally */
  flip?: boolean;
}

export default function FloralCluster({
  variant = "A",
  className = "",
  style,
  glowColor = "rgba(232,25,44,0.45)",
  flip = false,
}: Props) {
  const cluster = CLUSTERS[variant];

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: cluster.w,
        height: cluster.h,
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
    >
      {cluster.items.map((item, i) => {
        const leafH = Math.round(item.size * 1.35);
        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              top: item.top,
              left: item.left,
              opacity: item.opacity,
              rotate: item.rotate,
            }}
            animate={{
              y: [0, -item.amp, 0],
              rotate: [item.rotate - 4, item.rotate + 4, item.rotate - 4],
            }}
            transition={{
              duration: item.dur,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.type === "hibiscus" ? (
              <HibiscusFlower
                style={{
                  width: item.size,
                  height: item.size,
                  filter: `drop-shadow(0 4px ${Math.round(item.size / 3)}px ${glowColor})`,
                }}
              />
            ) : (
              <TropicalLeaf
                style={{
                  width: item.size,
                  height: leafH,
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.18))",
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
