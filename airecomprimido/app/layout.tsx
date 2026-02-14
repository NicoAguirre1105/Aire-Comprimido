import type { Metadata } from "next";

import "./globals.css";
import Image from "next/image";
import { ViewportProvider } from "./_context/ViewportContext";


export const metadata: Metadata = {
  title: "AIRECOMPRIMIDO EC S.A.S | Mantenimiento Industrial",
  description: "Comercializamos compresores de aire, repuestos originales y ofrecemos mantenimiento industrial a los diferentes equipos multimarca",

  openGraph: {
    title: 'AIRECOMPRIMIDO EC S.A.S | Mantenimiento Industrial',
    description: 'Comercializamos compresores de aire, repuestos originales y ofrecemos mantenimiento industrial a los diferentes equipos multimarca',
    url: 'https://airecomprimidoec.com',
    siteName: 'AIRECOMPRIMIDO EC S.A.S',
    images: [
      {
        url: 'https://airecomprimido.com/og-image.png',
        width: 630,
        height: 630,
        alt: 'Logo AIRECOMPRIMIDO EC',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="es">
      <body className="bg-white min-h-screen flex flex-col" cz-shortcut-listen="true">
        <ViewportProvider>
          {children}
        </ViewportProvider>
      </body>
    </html>
  );
}
