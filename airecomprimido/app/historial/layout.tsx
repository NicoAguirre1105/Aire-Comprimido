'use client'

import Header from '@/app/(public)/_components/header'
import Footer from '@/app/(public)/_components/footer'
import BgLogo from '@/app/_components/bgLogo'
import { ContactVisibilityProvider } from '@/app/_context/ContactVisibilityContext'

export default function HistorialLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContactVisibilityProvider>
      <BgLogo />
      <Header />
      {children}
      <Footer />
    </ContactVisibilityProvider>
  )
}
