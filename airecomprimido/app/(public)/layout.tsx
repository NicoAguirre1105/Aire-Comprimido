'use client';

import ContactUs from "../_components/contactUs";
import { ContactVisibilityProvider } from "../_context/ContactVisibilityContext";
import Header from "../_components/header";
import Footer from "../_components/footer";
import BgLogo from "../_components/bgLogo";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ContactVisibilityProvider>
      <BgLogo />
      <Header />
      {children}
      <ContactUs />
      <Footer />
    </ContactVisibilityProvider>
  );
}