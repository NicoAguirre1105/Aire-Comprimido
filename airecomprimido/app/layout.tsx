import type { Metadata } from "next";

import ClientLayout from "@/app/ClientLayout";
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
      <body className="bg-white" cz-shortcut-listen="true">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
