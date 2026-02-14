'use client';

import ContactUs from "../_components/contactUs";
import { ContactVisibilityProvider } from "../_context/ContactVisibilityContext";
import Header from "../_components/header";
import Footer from "../_components/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ContactVisibilityProvider>
      <Header />
      {children}
      <ContactUs />
      <Footer />
    </ContactVisibilityProvider>
  );
}