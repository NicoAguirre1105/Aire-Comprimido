import type { Metadata } from "next";

import "./globals.css";
import { ViewportProvider } from "./_context/ViewportContext";


export const metadata: Metadata = {
  metadataBase: new URL('https://airecomprimidoec.com'),
  title: {
    default: 'AIRECOMPRIMIDO EC S.A.S | Mantenimiento Industrial',
    template: '%s | AIRECOMPRIMIDO EC S.A.S',
  },
  description: 'Comercializamos compresores de aire, repuestos originales y ofrecemos mantenimiento industrial multimarca en Ecuador. Marcas Atlas Copco, Kaeser, Ingersoll Rand, Quincy y más.',
  alternates: {
    canonical: 'https://airecomprimidoec.com',
  },
  openGraph: {
    title: 'AIRECOMPRIMIDO EC S.A.S | Mantenimiento Industrial',
    description: 'Comercializamos compresores de aire, repuestos originales y ofrecemos mantenimiento industrial multimarca en Ecuador. Marcas Atlas Copco, Kaeser, Ingersoll Rand, Quincy y más.',
    url: 'https://airecomprimidoec.com',
    siteName: 'AIRECOMPRIMIDO EC S.A.S',
    images: [
      {
        url: 'https://airecomprimidoec.com/og-image.png',
        width: 630,
        height: 630,
        alt: 'Logo AIRECOMPRIMIDO EC S.A.S',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIRECOMPRIMIDO EC S.A.S | Mantenimiento Industrial',
    description: 'Comercializamos compresores de aire, repuestos originales y ofrecemos mantenimiento industrial multimarca en Ecuador.',
    images: ['https://airecomprimidoec.com/og-image.png'],
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
