'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ContactVisibilityContextType = {
  isVisible: boolean;
  toggleContact: () => void;
};

const ContactVisibilityContext = createContext<ContactVisibilityContextType | null>(null);

export function ContactVisibilityProvider({ 
  children 
}: { 
  children: ReactNode 
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleContact = useCallback(() => setIsVisible((prev) => !prev), []);

  return (
    <ContactVisibilityContext.Provider
      value={{ isVisible, toggleContact }}
    >
      {children}
    </ContactVisibilityContext.Provider>
  );
}

export function useContactVisibility() {
  const ctx = useContext(ContactVisibilityContext);
  if (!ctx) {
    throw new Error('useContactVisibility must be used within ContactVisibilityProvider');
  }
  return ctx;
}
