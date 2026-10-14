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
      backgroundColor: "#0b0f19",
      color: "#ccd6e6",
      fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
      padding: "2rem",
      textAlign: "center"
    }}>
      <div style={{
        maxWidth: "580px",
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid #1c273e",
        borderRadius: "16px",
        padding: "3rem 2rem",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)"
      }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🧭</div>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#f3ba42",
          marginBottom: "0.5rem"
        }}>
          404 - Page Not Found
        </h1>
        <h2 style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#ffffff",
          marginBottom: "1.25rem"
        }}>
          عذراً، الصفحة المطلوبة غير متوفرة
        </h2>
        <p style={{
          fontSize: "0.95rem",
          lineHeight: "1.6",
          color: "#8b9cb5",
          marginBottom: "1rem"
        }}>
          The page you requested could not be found or has been moved. Use the quick navigation below to return to PrayerConnect services.
        </p>
        <p style={{
          fontSize: "0.95rem",
          lineHeight: "1.6",
          color: "#8b9cb5",
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
              background: "#f3ba42",
              color: "#0b0f19",
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
              background: "rgba(243, 186, 66, 0.12)",
              border: "1px solid #f3ba42",
              color: "#f3ba42",
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
              border: "1px solid #1c273e",
              color: "#ccd6e6",
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
