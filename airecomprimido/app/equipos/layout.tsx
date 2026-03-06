import type { Metadata } from "next";
import Equipos from "./page";

export const metadata: Metadata = {
  title: 'CATÁLOGO DE EQUIPOS',
  description: 'Visita nuestro catálogo de equipos originales en distintas marcas.',
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