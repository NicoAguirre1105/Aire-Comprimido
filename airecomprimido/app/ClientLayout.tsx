'use client';

import Image from "next/image";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { ContactVisibilityProvider } from "./_context/ContactVisibilityContext";
import { ViewportProvider } from "./_context/ViewportContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContactVisibilityProvider>
      <ViewportProvider>
        <Image
          src="/logos/logo_black.png"
          alt="AIRECOMPRIMIDO EC logo"
          width={150}
          height={150}
          className="fixed -z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-7 w-80"
        />
        <Header />
        {children}
        <Footer />
      </ViewportProvider>
    </ContactVisibilityProvider>
  );
}