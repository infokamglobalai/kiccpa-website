import Link from "next/link";

export default function SolutionNotFound() {
  return (
    <div style={{ padding: "160px 5% 80px", textAlign: "center", maxWidth: 560, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: 12 }}>Solution not found</h1>
      <p style={{ color: "#64748b", marginBottom: 24 }}>
        This offering page does not exist. Choose a solution from Our Offerings in the menu.
      </p>
      <Link href="/" style={{ color: "var(--P)", fontWeight: 700 }}>
        Back to home
      </Link>
    </div>
  );
}
