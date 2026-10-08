import type { CSSProperties, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Peak vertical offset in px (negative floats up) */
  y?: number;
  /** Rotation range in degrees: [start, peak] */
  rotate?: [number, number];
  /** Scale range: [start, peak] */
  scale?: [number, number];
  /** Opacity range: [start, peak]; switches to a twinkle instead of a float */
  opacity?: [number, number];
  duration?: number;
  delay?: number;
}

export default function Float({
  children,
  className = "",
  style,
  y = 0,
  rotate = [0, 0],
  scale = [1, 1],
  opacity,
  duration = 6,
  delay = 0,
}: Props) {
  const vars = {
    "--y": `${y}px`,
    "--r0": `${rotate[0]}deg`,
    "--r1": `${rotate[1]}deg`,
    "--s0": scale[0],
    "--s1": scale[1],
    "--o0": opacity?.[0],
    "--o1": opacity?.[1],
    "--dur": `${duration}s`,
    "--delay": `${delay}s`,
  } as CSSProperties;

  return (
    <div className={`${opacity ? "rr-twinkle" : "rr-float"} ${className}`} style={{ ...vars, ...style }}>
      {children}
    </div>
  );
}
