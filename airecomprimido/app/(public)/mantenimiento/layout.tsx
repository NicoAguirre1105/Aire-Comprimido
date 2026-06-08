import type { Metadata } from "next";
import Mantenimiento from "./page";

export const metadata: Metadata = {
  title: 'Servicio de Mantenimiento Industrial para Compresores',
  description: 'Mantenimiento preventivo y correctivo para compresores de aire multimarca en Ecuador. Técnicos especializados en Atlas Copco, Kaeser, Ingersoll Rand, Quincy y Airhorse.',
  alternates: {
    canonical: 'https://airecomprimidoec.com/mantenimiento',
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

export default function MantenimientoPage() {
  return (
    <Mantenimiento />
  );
}