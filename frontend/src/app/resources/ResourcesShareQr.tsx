"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Copy, Check, QrCode } from "lucide-react";
import styles from "./ResourcesShareQr.module.css";
import { getResourcesPagePublicUrl } from "./resourcesPublicUrl";

export default function ResourcesShareQr() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(getResourcesPagePublicUrl());
  }, []);

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  if (!url) {
    return null;
  }

  return (
    <section id="share" className={styles.shareSection} aria-labelledby="share-heading">
      <div className={styles.shareInner}>
        <div className={styles.shareText}>
          <p className={styles.shareEyebrow}>
            <QrCode size={16} aria-hidden />
            Share
          </p>
          <h2 id="share-heading" className={styles.shareTitle}>
            Resource Center <em>QR</em>
          </h2>
          <p className={styles.shareDesc}>
            Scan to open this page on a phone — brochures, videos, and the school survey. Print for events or WhatsApp
            the link below.
          </p>
          <div className={styles.urlRow}>
            <code className={styles.urlCode}>{url}</code>
            <button type="button" className={styles.copyBtn} onClick={copy} aria-label="Copy link">
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className={styles.shareHint}>
            The QR encodes a shareable link to this page. On <strong>localhost</strong>, the code uses this browser’s
            origin (not your production domain) so scans do not open an empty or outdated live site. For production,
            open your deployed URL or set <code>NEXT_PUBLIC_SITE_URL</code>. To test on a phone over Wi‑Fi, open this site
            using your PC’s LAN address (e.g. <code>http://192.168.x.x:3001</code>) or set{" "}
            <code>NEXT_PUBLIC_RESOURCES_PUBLIC_URL</code> to that full <code>/resources</code> URL.
          </p>
        </div>
        <div className={styles.qrBox}>
          <div className={styles.qrFrame}>
            <QRCode
              value={url}
              size={200}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              viewBox="0 0 256 256"
              fgColor="#0f2942"
              bgColor="#ffffff"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
