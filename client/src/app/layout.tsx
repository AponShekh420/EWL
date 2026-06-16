import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Wrapper from "@/components/common/wrapper";
import ReduxStoreProvider from "@/context-provider/ReduxStoreProvider";
import type { Metadata } from "next";
import {
  Inter,
  Lexend_Deca,
  Lora,
  Montserrat,
  Playfair_Display,
  Roboto,
  Roboto_Slab,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lexend_deca.variable} ${lora.variable}  ${montserrat.variable} ${roboto.variable} ${robotoSlab.variable} ${playfair_display.variable}`}
      suppressHydrationWarning
    >
      <body className={` antialiased`} suppressHydrationWarning>
        <Toaster />
        <ReduxStoreProvider>
          <Wrapper>
            <Header />
            {children}
            <Footer />
          </Wrapper>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
