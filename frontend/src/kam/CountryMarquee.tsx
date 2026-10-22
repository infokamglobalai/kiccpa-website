import { homePage } from "./home-content";
import styles from "./kam.module.css";

function star(cx: number, cy: number, r: number) {
  const points: string[] = [];
  for (let i = 0; i < 5; i += 1) {
    const outer = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    const inner = outer + Math.PI / 5;
    points.push(`${cx + Math.cos(outer) * r},${cy + Math.sin(outer) * r}`);
    points.push(`${cx + Math.cos(inner) * r * 0.38},${cy + Math.sin(inner) * r * 0.38}`);
  }
  return points.join(" ");
}

function Flag({ code }: { code: string }) {
  if (code === "kw") {
    return (
      <svg className={styles.hpFlag} viewBox="0 0 30 20" aria-hidden="true">
        <rect width="30" height="6.67" fill="#007a3d" />
        <rect y="6.67" width="30" height="6.66" fill="#fff" />
        <rect y="13.33" width="30" height="6.67" fill="#ce1126" />
        <polygon points="0,0 9,6.67 9,13.33 0,20" fill="#000" />
      </svg>
    );
  }
  if (code === "in") {
    const spokes = Array.from({ length: 24 }, (_, index) => {
      const angle = (index * Math.PI) / 12;
      return `M15,10 L${15 + Math.cos(angle) * 2.35},${10 + Math.sin(angle) * 2.35}`;
    }).join(" ");
    return (
      <svg className={styles.hpFlag} viewBox="0 0 30 20" aria-hidden="true">
        <rect width="30" height="6.67" fill="#ff9933" />
        <rect y="6.67" width="30" height="6.66" fill="#fff" />
        <rect y="13.33" width="30" height="6.67" fill="#138808" />
        <circle cx="15" cy="10" r="2.55" fill="none" stroke="#000080" strokeWidth="0.28" />
        <circle cx="15" cy="10" r="0.35" fill="#000080" />
        <path d={spokes} stroke="#000080" strokeWidth="0.16" />
      </svg>
    );
  }
  if (code === "ph") {
    return (
      <svg className={styles.hpFlag} viewBox="0 0 30 20" aria-hidden="true">
        <rect width="30" height="10" fill="#0038a8" />
        <rect y="10" width="30" height="10" fill="#ce1126" />
        <polygon points="0,0 14,10 0,20" fill="#fff" />
        <circle cx="5.2" cy="10" r="1.15" fill="#fcd116" />
        {Array.from({ length: 8 }, (_, index) => {
          const angle = (index * Math.PI) / 4;
          const x = 5.2 + Math.cos(angle) * 2.15;
          const y = 10 + Math.sin(angle) * 2.15;
          return <polygon key={index} points={`${x},${y} ${5.2 + Math.cos(angle + 0.22) * 0.7},${10 + Math.sin(angle + 0.22) * 0.7} ${5.2 + Math.cos(angle - 0.22) * 0.7},${10 + Math.sin(angle - 0.22) * 0.7}`} fill="#fcd116" />;
        })}
        <polygon points={star(3.1, 4.2, 0.85)} fill="#fcd116" />
        <polygon points={star(7.6, 7.2, 0.7)} fill="#fcd116" />
        <polygon points={star(3.1, 15.8, 0.85)} fill="#fcd116" />
      </svg>
    );
  }
  if (code === "sa") {
    return (
      <svg className={styles.hpFlag} viewBox="0 0 30 20" aria-hidden="true">
        <rect width="30" height="20" fill="#006c35" />
        <text x="15" y="8.6" textAnchor="middle" fill="#fff" fontSize="2.15" fontFamily="Tahoma, Arial, sans-serif">لا إله إلا الله محمد رسول الله</text>
        <path d="M7.2 12.6h14.2c.7 0 1.1.5.8 1-.4.6-1.3.5-2.2.2H8.4c-.8 0-1.5.2-1.9-.3-.3-.4 0-.9.7-.9z" fill="#fff" />
        <path d="M6.2 11.8v2.4M7.4 11.5v3" stroke="#fff" strokeWidth="0.35" />
      </svg>
    );
  }
  if (code === "ke") {
    return (
      <svg className={styles.hpFlag} viewBox="0 0 30 20" aria-hidden="true">
        <rect width="30" height="5.2" fill="#000" />
        <rect y="5.2" width="30" height="1.2" fill="#fff" />
        <rect y="6.4" width="30" height="7.2" fill="#bb0000" />
        <rect y="13.6" width="30" height="1.2" fill="#fff" />
        <rect y="14.8" width="30" height="5.2" fill="#006600" />
        <ellipse cx="15" cy="10" rx="3.1" ry="4.3" fill="#bb0000" stroke="#000" strokeWidth="0.35" />
        <ellipse cx="15" cy="10" rx="1.7" ry="3.2" fill="#000" />
        <path d="M15 5.6v8.8M12.8 6.4l2.2 7.2 2.2-7.2" fill="none" stroke="#fff" strokeWidth="0.35" />
      </svg>
    );
  }
  return (
    <svg className={styles.hpFlag} viewBox="0 0 30 20" aria-hidden="true">
      <rect width="30" height="20" fill="#e70013" />
      <circle cx="15" cy="10" r="4.6" fill="#fff" />
      <circle cx="16.1" cy="10" r="3.5" fill="#e70013" />
      <polygon points={star(16.7, 10, 1.7)} fill="#e70013" />
    </svg>
  );
}

function PlaceList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {homePage.places.map((place) => (
        <li key={`${hidden ? "b" : "a"}-${place.code}`}>
          <Flag code={place.code} />
          <span>{place.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CountryMarquee() {
  const names = homePage.places.map((place) => place.name).join(", ");
  return (
    <section className={styles.hpMarquee} aria-label={`Countries: ${names}`}>
      <div className={styles.hpMarqueeTrack}>
        <PlaceList />
        <PlaceList hidden />
      </div>
    </section>
  );
}
