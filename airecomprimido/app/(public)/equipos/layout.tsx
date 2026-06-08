import type { Metadata } from "next";
import Equipos from "./page";

export const metadata: Metadata = {
  title: 'Catálogo de Equipos y Compresores de Aire',
  description: 'Catálogo de compresores de aire industriales multimarca: Atlas Copco, Kaeser, Ingersoll Rand, Quincy, Airhorse y Hertz. Equipos para toda aplicación industrial en Ecuador.',
  alternates: {
    canonical: 'https://airecomprimidoec.com/equipos',
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

export default function EquiposPage() {
  return (
    <Equipos />
  );
}