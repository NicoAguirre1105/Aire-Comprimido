'use client'

import { useContactVisibility } from '@/app/_context/ContactVisibilityContext'

export default function ContactButton({ className }: { className?: string }) {
  const { toggleContact } = useContactVisibility()

  return (
    <button
      onClick={toggleContact}
      className={className}
    >
      Solicita una Cotización
    </button>
  )
}
