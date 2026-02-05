'use client';

import Image from "next/image";
import Header from "./_components/header";
import ContactUs from "./_components/contactUs";
import Footer from "./_components/footer";
import { ContactVisibilityProvider, useContactVisibility } from "./_context/ContactVisibilityContext";

function ClientLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isVisible, toggleContact } = useContactVisibility();

  return (
    <>
      <Image
        src="/logos/logo_black.png"
        alt="AIRECOMPRIMIDO EC logo"
        width={150}
        height={150}
        className="fixed -z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-7 w-80"
      />
      <Header state={isVisible} handler={toggleContact} />
      {children}
      <ContactUs handler={toggleContact} />
      <Footer />
    </>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContactVisibilityProvider>
      <ClientLayoutInner>
        {children}
      </ClientLayoutInner>
    </ContactVisibilityProvider>
  );
}