import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | الصفحة غير موجودة",
  description: "The page you are looking for does not exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0d1411",
      color: "#e2ede8",
      fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
      padding: "2rem",
      textAlign: "center"
    }}>
      <div style={{
        maxWidth: "580px",
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(149, 211, 186, 0.2)",
        borderRadius: "16px",
        padding: "3rem 2rem",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)"
      }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🧭</div>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#95d3ba",
          marginBottom: "0.5rem"
        }}>
          404 - Page Not Found
        </h1>
        <h2 style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#ffe088",
          marginBottom: "1.25rem"
        }}>
          عذراً، الصفحة المطلوبة غير متوفرة
        </h2>
        <p style={{
          fontSize: "0.95rem",
          lineHeight: "1.6",
          color: "#9eb6ad",
          marginBottom: "1rem"
        }}>
          The page you requested could not be found or has been moved. Use the quick navigation below to return to PrayerSync services.
        </p>
        <p style={{
          fontSize: "0.95rem",
          lineHeight: "1.6",
          color: "#9eb6ad",
          marginBottom: "2rem",
          direction: "rtl"
        }}>
          الصفحة التي تحاول الوصول إليها قد تكون نُقلت أو حُذفت. يمكنك العودة للصفحة الرئيسية أو تصفح مواقيت الصلاة والأدلة.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              background: "#95d3ba",
              color: "#081410",
              fontWeight: "600",
              padding: "12px 22px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              transition: "opacity 0.2s ease",
            }}
          >
            ← الرئيسية (Homepage)
          </Link>
          <Link
            href="/PTime"
            style={{
              display: "inline-block",
              background: "rgba(149, 211, 186, 0.15)",
              border: "1px solid #95d3ba",
              color: "#95d3ba",
              fontWeight: "600",
              padding: "12px 22px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            مواقيت الصلاة (Schedule)
          </Link>
          <Link
            href="/guides"
            style={{
              display: "inline-block",
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#e2ede8",
              fontWeight: "600",
              padding: "12px 22px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            الأدلة (Guides)
          </Link>
        </div>
      </div>
    </div>
  );
}
