export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
        crawlDelay: 2,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/_next/"],
        crawlDelay: 3,
      },
    ],
    sitemap: "https://prayer-sync.vercel.app/sitemap.xml",
    host: "https://prayer-sync.vercel.app",
  };
}
