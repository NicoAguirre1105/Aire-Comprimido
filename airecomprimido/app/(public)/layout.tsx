'use client';

import { ContactVisibilityProvider } from "../_context/ContactVisibilityContext";
import Header from "./_components/header";
import Footer from "./_components/footer";
import BgLogo from "../_components/bgLogo";
import { ContactOverlay } from "./_components/ContactOverlay";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContactVisibilityProvider>
      <BgLogo />
      <Header />
      <ContactOverlay />
      {children}
      <Footer />
    </ContactVisibilityProvider>
  );
}
