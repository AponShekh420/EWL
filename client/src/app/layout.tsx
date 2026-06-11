import Footer from "@/components/common/Footer";
import Wrapper from "@/components/common/wrapper";
import ReduxStoreProvider from "@/context-provider/ReduxStoreProvider";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import {
  Inter,
  Playfair_Display,
  Cormorant_Garamond,
  Montserrat,
  Merriweather,
  Source_Serif_4,
  Roboto_Slab,
  Roboto,
} from "next/font/google";

import { GoogleAnalytics } from '@next/third-parties/google'



export const metadata: Metadata = {
  title: 'Ohel Miriam',
  description: `Ohel Miriam strengthens couples in building marriages grounded in kedusha, shalom, and simcha. Through this journey, you'll gain four essential gifts for deeper`,
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}


import Header from "@/components/common/Header";
import "swiper/css";
import "./globals.css";
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
export const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
});
export const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto-slab",
});
export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

export const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.className}
          ${playfair.variable}
          ${cormorant.variable}
          ${montserrat.variable}
          ${merriweather.variable}
          ${sourceSerif.variable}
          antialiased
        `}
        suppressHydrationWarning
      >
        <Toaster />
        <ReduxStoreProvider>
          <Wrapper>
            <Header />
            {children}
            <Footer />
          </Wrapper>
        </ReduxStoreProvider>
      </body>
      <GoogleAnalytics gaId="G-XJ7PVJWJYL" />
    </html>
  );
}
