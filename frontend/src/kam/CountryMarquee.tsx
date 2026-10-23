import { homePage } from "./home-content";
import styles from "./kam.module.css";

/**
 * Flags are official SVGs from flag-icons (MIT), served as files rather than
 * inlined: the marquee renders the list twice, and several flags carry
 * internal `clipPath` ids that would collide in a single document.
 */
function Flag({ code }: { code: string }) {
  return (
    <img
      className={styles.hpFlag}
      src={`/images/flags/${code}.svg`}
      alt=""
      width={36}
      height={27}
      loading="lazy"
      decoding="async"
    />
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
