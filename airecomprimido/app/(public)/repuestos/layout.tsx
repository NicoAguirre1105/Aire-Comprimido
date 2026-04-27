import type { Metadata } from "next";
import Repuestos from "./page";

export const metadata: Metadata = {
  title: 'CATÁLOGO DE REPUESTOS',
  description: 'Revisa nuestro catálogo de respuestos originales para compresores de aire.',
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