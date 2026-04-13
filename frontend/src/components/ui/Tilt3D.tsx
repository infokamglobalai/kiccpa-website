"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import styles from "./Tilt3D.module.css";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export default function Tilt3D({
  children,
  className = "",
  intensity = 10,
}: Tilt3DProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const el = rootRef.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const rx = (-y * intensity).toFixed(2);
      const ry = (x * intensity).toFixed(2);
      setTransform(
        `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.01,1.01,1.01)`
      );
    },
    [intensity]
  );

  const onPointerLeave = useCallback(() => {
    setTransform(
      "perspective(1400px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    );
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className={styles.inner} style={{ transform }}>
        {children}
      </div>
    </div>
  );
}
