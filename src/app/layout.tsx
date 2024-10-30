import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import { Exo_2, Nunito_Sans } from 'next/font/google'
import { Footer, Header } from "@/components";


export const metadata: Metadata = {
  // metadataBase: new URL(defaultUrl),
  title: "Register4SIFA :: Home",
  description: "Register4SIFA is an initiative intended to empower youths with skills and life long learning",
  icons: {
    icon: [{ url: "/ileap-logo.png", sizes: "any", type: "/image/x-icon" }],
    apple: [{ url: "/ileap-logo.png" }]
  },
};

const exo = Exo_2({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800", "900"], variable: "--exo" })
const nunitoSans = Nunito_Sans({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800", "900"], variable: "--nunito" })


export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
  initialScale: 1,
  viewportFit: "auto",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${exo.variable} ${nunitoSans.variable} antialiased min-h-screen bg-backdrop font-nunito`}
      >
        <Header />
        <Toaster />
        <div className="min-h-[80vh]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
