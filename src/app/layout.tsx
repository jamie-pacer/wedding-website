import type { Metadata } from "next";
import { Playfair_Display, Lato, Great_Vibes, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const orangeSquash = localFont({
  src: "../../public/Orange-Squash-Demo-BF6483cfe8b2bfc.otf",
  variable: "--font-script",
  display: "swap",
  fallback: ["Great Vibes", "cursive"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script-fallback",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Natalie & James | Wedding",
  description: "Join us in celebrating the wedding of Natalie Lacey and James \"Jamie\" Shuttleworth on 24 October 2026 at Die Woud, Caledon.",
  keywords: ["wedding", "Natalie Lacey", "James Shuttleworth", "Die Woud", "Caledon"],
  icons: {
    icon: "/site-favicon.png",
    apple: "/site-favicon.png",
  },
  openGraph: {
    title: "Natalie & James | Wedding",
    description: "Join us in celebrating the wedding of Natalie Lacey and James \"Jamie\" Shuttleworth on 24 October 2026 at Die Woud, Caledon.",
    url: "https://nataliejames.wedding",
    siteName: "Natalie & James Wedding",
    images: [
      {
        url: "https://nataliejames.wedding/social-preview.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orangeSquash.variable} ${playfair.variable} ${lato.variable} ${inter.variable} ${greatVibes.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
