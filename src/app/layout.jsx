import "./globals.css";
import ClientShell from "@/components/ClientShell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prakash Mani | Full-Stack Developer",
    template: "%s | Prakash Mani",
  },
  description:
    "Portfolio of Prakash Mani, a full-stack developer building polished web and mobile products with Next.js, React, Node.js, and the MERN stack.",
  keywords: [
    "Prakash Mani",
    "full-stack developer",
    "Next.js developer",
    "MERN developer",
    "React developer",
  ],
  authors: [{ name: "Prakash Mani" }],
  creator: "Prakash Mani",
  icons: {
    icon: "/m.svg",
  },
  openGraph: {
    type: "website",
    title: "Prakash Mani | Full-Stack Developer",
    description:
      "Full-stack developer crafting scalable web and mobile experiences with modern JavaScript technologies.",
    siteName: "Prakash Mani Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Prakash Mani — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prakash Mani | Full-Stack Developer",
    description:
      "Full-stack developer crafting scalable web and mobile experiences with modern JavaScript technologies.",
    images: ["/og.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070711",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
