import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { LenisProvider } from "@/providers/LenisProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-writing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Moveo — Book Flight, Bus & Train Tickets Online",
    template: "%s | Moveo",
  },
  description:
    "Your all-in-one ticket booking platform. Book flight tickets, bus tickets, and train tickets with AI-powered recommendations, real-time seat selection, and the best deals.",
  keywords: [
    "flight tickets",
    "bus booking",
    "train booking",
    "ticket booking",
    "Moveo",
    "online booking",
    "seat selection",
    "entertainment",
    "travel",
  ],
  authors: [{ name: "Moveo Team" }],
  creator: "Moveo",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Moveo",
    title: "Moveo — Book Flight, Bus & Train Tickets Online",
    description:
      "Your all-in-one ticket booking platform. Book flight tickets, bus tickets, and train tickets.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moveo — Book Flight, Bus & Train Tickets Online",
    description:
      "Your all-in-one ticket booking platform for flights, buses, and trains.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`}
    >
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground font-body antialiased overflow-x-hidden flex flex-col cursor-none">
        <ThemeProvider>
          <ReduxProvider>
            <LenisProvider>
              <CustomCursor />
              <Preloader />
              <Navbar />
              <main className="flex-grow pt-16">
                {children}
              </main>
              <Footer />
            </LenisProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
