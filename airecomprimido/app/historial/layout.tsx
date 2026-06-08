import type { Metadata } from 'next'
import HistorialShell from './_components/HistorialShell'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
}

export default function HistorialLayout({ children }: { children: React.ReactNode }) {
  return <HistorialShell>{children}</HistorialShell>
}
