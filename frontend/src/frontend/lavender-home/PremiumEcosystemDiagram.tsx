"use client";

import styles from "./PremiumPackageSection.module.css";

const MODULES = [
  { id: "student", label: "Student mgmt", short: "St", color: "#1B4370" },
  { id: "fee", label: "Fee mgmt", short: "Fe", color: "#4A7FB9" },
  { id: "results", label: "Academic results", short: "Ac", color: "#1B4370" },
  { id: "transport", label: "Transport", short: "Tr", color: "#FF823F" },
  { id: "canteen", label: "Canteen", short: "Ca", color: "#4A7FB9" },
  { id: "comm", label: "Communication", short: "Co", color: "#E66A2B" },
] as const;

const CX = 200;
const CY = 200;
const R_NODES = 130;
const R_RING_OUT = 156;
const R_RING_IN = 106;

function pt(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export default function PremiumEcosystemDiagram() {
  const n = MODULES.length;
  const seg = 360 / n;
  const midR = (R_RING_OUT + R_RING_IN) / 2;
  const thick = R_RING_OUT - R_RING_IN;
  const circ = 2 * Math.PI * midR;
  const dash = circ / n;

  const ringFill = (i: number) =>
    i % 3 === 0 ? "rgba(27, 67, 112, 0.28)" : i % 3 === 1 ? "rgba(255, 130, 63, 0.22)" : "rgba(74, 127, 185, 0.26)";

  return (
    <div className={styles.diagramWrap}>
      <div className={styles.diagramFrame}>
        <svg
          className={styles.ecoSvg}
          viewBox="0 0 400 400"
          role="img"
          aria-label="LMS Premium: six school modules unified in one circular platform"
        >
          <title>LMS Premium ecosystem — six modules on one ring</title>
          <defs>
            <linearGradient id="premiumHubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B4370" />
              <stop offset="100%" stopColor="#0E2A4D" />
            </linearGradient>
            <radialGradient id="premiumGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4A7FB9" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#1B4370" stopOpacity="0" />
            </radialGradient>
            <filter id="premiumSoftShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#1B4370" floodOpacity="0.2" />
            </filter>
          </defs>

          <circle cx={CX} cy={CY} r={192} fill="url(#premiumGlow)" />

          {/* Exact circle graph: 6 equal donut segments */}
          <g>
            {MODULES.map((_, i) => (
              <circle
                key={`ring-${i}`}
                cx={CX}
                cy={CY}
                r={midR}
                fill="none"
                stroke={ringFill(i)}
                strokeWidth={thick}
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeLinecap="butt"
                transform={`rotate(${-120 + i * seg} ${CX} ${CY})`}
              />
            ))}
            {MODULES.map((_, i) => {
              const a = -120 + i * seg;
              const o = pt(a, R_RING_OUT);
              const inn = pt(a, R_RING_IN);
              return (
                <line
                  key={`sep-${i}`}
                  x1={inn.x}
                  y1={inn.y}
                  x2={o.x}
                  y2={o.y}
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth={1.5}
                />
              );
            })}
          </g>

          {MODULES.map((m, i) => {
            const mid = -90 + i * seg;
            const outer = pt(mid, R_NODES);
            return (
              <line
                key={`spoke-${m.id}`}
                x1={CX}
                y1={CY}
                x2={outer.x}
                y2={outer.y}
                stroke="rgba(27, 67, 112, 0.2)"
                strokeWidth={2}
                strokeLinecap="round"
              />
            );
          })}

          {MODULES.map((m, i) => {
            const mid = -90 + i * seg;
            const p = pt(mid, R_NODES);
            return (
              <g key={m.id}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={23}
                  fill="#fff"
                  stroke={m.color}
                  strokeWidth={2.5}
                  filter="url(#premiumSoftShadow)"
                />
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={styles.ecoNodeText}
                  fill="#1B4370"
                >
                  {m.short}
                </text>
              </g>
            );
          })}

          <circle cx={CX} cy={CY} r={76} fill="url(#premiumHubGrad)" filter="url(#premiumSoftShadow)" />
          <circle cx={CX} cy={CY} r={68} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={2} />
          <text x={CX} y={CY - 8} textAnchor="middle" className={styles.ecoCenterKicker} fill="rgba(255,255,255,0.9)">
            LMS
          </text>
          <text x={CX} y={CY + 20} textAnchor="middle" className={styles.ecoCenterTitle} fill="#fff">
            Premium
          </text>
        </svg>
      </div>
      <ul className={styles.diagramLegend}>
        {MODULES.map((m) => (
          <li key={m.id}>
            <span className={styles.legendDot} style={{ background: m.color }} />
            {m.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
