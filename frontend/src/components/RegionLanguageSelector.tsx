"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, MapPin, ChevronDown, Check } from "lucide-react";
import styles from "./RegionLanguageSelector.module.css";

const regions = [
  { id: "kuwait", name: "Kuwait City", country: "Kuwait", flag: "🇰🇼" },
  { id: "bangalore", name: "Bangalore", country: "India", flag: "🇮🇳" },
  { id: "mumbai", name: "Mumbai", country: "India", flag: "🇮🇳" },
  { id: "dubai", name: "Dubai", country: "UAE", flag: "🇦🇪" },
  { id: "london", name: "London", country: "UK", flag: "🇬🇧" },
  { id: "newyork", name: "New York", country: "USA", flag: "🇺🇸" },
];

const languages = [
  { id: "en", name: "English", native: "English" },
  { id: "ar", name: "Arabic", native: "العربية" },
];

type RegionLanguageSelectorProps = {
  variant?: "full" | "location" | "language";
  theme?: "light" | "dark";
  compact?: boolean;
};

export default function RegionLanguageSelector({
  variant = "full",
  theme = "light",
  compact = false,
}: RegionLanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedRegion = localStorage.getItem("kiccpa_region");
    const savedLang = localStorage.getItem("kiccpa_lang");
    if (savedRegion) {
      const found = regions.find((r) => r.id === savedRegion);
      if (found) setSelectedRegion(found);
    }
    if (savedLang) {
      const found = languages.find((l) => l.id === savedLang);
      if (found) setSelectedLang(found);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectRegion = (region: (typeof regions)[0]) => {
    setSelectedRegion(region);
    localStorage.setItem("kiccpa_region", region.id);
  };

  const handleSelectLang = (lang: (typeof languages)[0]) => {
    setSelectedLang(lang);
    localStorage.setItem("kiccpa_lang", lang.id);
  };

  const showRegion = variant === "full" || variant === "location";
  const showLanguage = variant === "full" || variant === "language";
  const isLangOnly = variant === "language";

  return (
    <div
      className={`${styles.wrapper} ${theme === "dark" ? styles.wrapperDark : ""} ${isLangOnly ? styles.wrapperLangOnly : ""} ${compact ? styles.wrapperCompact : ""}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerActive : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className={styles.triggerContent}>
          {isLangOnly ? (
            <>
              <Globe size={14} className={styles.langGlobe} aria-hidden />
              <span className={styles.langCompact}>{selectedLang.id.toUpperCase()}</span>
            </>
          ) : (
            <>
              <div className={styles.iconBox}>
                <MapPin size={14} className={styles.pinIcon} />
              </div>
              <div className={styles.labelGroup}>
                {!compact && <span className={styles.eyebrow}>MY LOCATION</span>}
                <span className={styles.value}>{selectedRegion.name}</span>
              </div>
            </>
          )}
          <ChevronDown size={14} className={`${styles.chevron} ${isOpen ? styles.chevronUp : ""}`} />
        </div>
      </button>

      {isOpen && (
        <div className={`${styles.dropdown} ${isLangOnly ? styles.dropdownLang : ""}`}>
          <div className={styles.dropdownInner}>
            {showRegion && (
              <div className={styles.section}>
                <p className={styles.sectionTitle}>Select Region</p>
                <div className={styles.regionGrid}>
                  {regions.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className={`${styles.option} ${selectedRegion.id === r.id ? styles.optionActive : ""}`}
                      onClick={() => handleSelectRegion(r)}
                    >
                      <span className={styles.flag}>{r.flag}</span>
                      <div className={styles.optionInfo}>
                        <span className={styles.optionName}>{r.name}</span>
                        <span className={styles.optionCountry}>{r.country}</span>
                      </div>
                      {selectedRegion.id === r.id && <Check size={14} className={styles.check} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showRegion && showLanguage && <div className={styles.divider} />}

            {showLanguage && (
              <div className={styles.section}>
                <p className={styles.sectionTitle}>Language</p>
                <div className={styles.langList}>
                  {languages.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      className={`${styles.langOption} ${selectedLang.id === l.id ? styles.langActive : ""}`}
                      onClick={() => handleSelectLang(l)}
                    >
                      <span className={styles.langName}>{l.name}</span>
                      <span className={styles.langNative}>{l.native}</span>
                      {selectedLang.id === l.id && <Check size={14} className={styles.check} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
