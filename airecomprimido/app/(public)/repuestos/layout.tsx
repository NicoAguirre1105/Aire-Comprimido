import type { Metadata } from "next";
import Repuestos from "./page";

export const metadata: Metadata = {
  title: 'Catálogo de Repuestos para Compresores de Aire',
  description: 'Repuestos originales y de alta compatibilidad para compresores de aire Atlas Copco, Kaeser, Ingersoll Rand, Quincy y más. Stock disponible e importación directa a Ecuador.',
  alternates: {
    canonical: 'https://airecomprimidoec.com/repuestos',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RespuetosPage() {
  return (
    <Repuestos />
  );
}