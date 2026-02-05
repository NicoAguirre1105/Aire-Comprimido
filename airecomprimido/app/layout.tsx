import type { Metadata } from "next";
import Header from "./_components/header";
import Footer from "./_components/footer";
import Image from "next/image";
import ContactUs from "./_components/contactUs";
import "./globals.css";


export const metadata: Metadata = {
  title: "AIRECOMPRIMIDO EC S.A.S | Mantenimiento Industrial",
  description: "Comercializamos compresores de aire, repuestos originales y ofrecemos mantenimiento industrial a los diferentes equipos multimarca"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white">
        <Image 
          src="/logos/logo_black.png"
          alt="AIRECOMPRIMIDO EC logo"
          width={150}
          height={150}
          className="fixed -z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-7 w-80"
        />
        <Header />
        {children}
        <ContactUs />
        <Footer />
      </body>
    </html>
  );
}
