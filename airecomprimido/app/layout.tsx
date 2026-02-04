import type { Metadata } from "next";
import Header from "./_components/header";
import Footer from "./_components/footer";
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
      <body>
        <Header />
        {children}
        <ContactUs />
        <Footer />
      </body>
    </html>
  );
}
