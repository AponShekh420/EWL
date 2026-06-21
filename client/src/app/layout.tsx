import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Wrapper from "@/components/common/wrapper";
import ReduxStoreProvider from "@/context-provider/ReduxStoreProvider";
import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Lexend_Deca,
  Lora,
  Merriweather,
  Montserrat,
  Playfair_Display,
  Roboto,
  Roboto_Slab,
  Source_Serif_4,
} from "next/font/google";
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


import { GoogleAnalytics } from "@next/third-parties/google";

import "swiper/css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ohel Miriam",
  description: `Ohel Miriam strengthens couples in building marriages grounded in kedusha, shalom, and simcha. Through this journey, you'll gain four essential gifts for deeper`,
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const lexend_deca = Lexend_Deca({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lexend-deca",
});
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
export const playfair_display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
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
export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});
export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});
export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
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
    <html
      lang="en"
      className={`${inter.variable} ${lexend_deca.variable} ${lora.variable}  ${montserrat.variable} ${roboto.variable} ${robotoSlab.variable} ${inter.className}
          ${playfair.variable}
          ${cormorant.variable}
          ${merriweather.variable}
          ${sourceSerif.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`
          
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
