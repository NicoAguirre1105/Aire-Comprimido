import type { Metadata } from "next";
import Mantenimiento from "./page";

export const metadata: Metadata = {
  title: 'SERVICIO DE MANTENIMIENTO',
  description: 'Realizamos mantenimiento preventivo y correctivo para compresores y equipos.',
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