import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { geistMono, inter, spaceGrotesk } from "./fonts";
import "./globals.css";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const metadata: Metadata = {
  metadataBase: vercelHost ? new URL(`https://${vercelHost}`) : undefined,
  title: "Or Damari — Frontend / Full Stack Engineer",
  description: profile.heroSub,
  openGraph: {
    title: "Or Damari",
    description: profile.heroSub,
    images: [{ url: "/hero/hero-desktop-poster.webp", width: 1280, height: 720, alt: "Or Damari" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
