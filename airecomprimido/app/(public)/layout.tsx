'use client';

import ContactUs from "../_components/contactUs";
import { useContactVisibility } from "../_context/ContactVisibilityContext"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isVisible, toggleContact } = useContactVisibility();

  return (
    <>
      {children}
      <ContactUs handler={toggleContact} />
    </>
  );
}