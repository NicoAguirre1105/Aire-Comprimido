// "use client"

// import { useAuth } from "@/app/_context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from 'react'
// import Loader from "@/app/_components/loader";

// export default function ProtectedLayout({
//   children
// }: {
//   children:React.ReactNode
// }) {
//   const { user, loading, logout } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/login');
//     }
//   }, [loading, user, router]);

//   if (loading) return (
//     <Loader />
//   )

//   if (!user) return null;

//   return (
//     <>
//     {children}
//     </>
//   )
// }

'use client'

import { useAuth } from '../_context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Loader from '../_components/loader'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth() // Asumiendo que agregaste un estado 'loading' a tu context
  const router = useRouter()

  useEffect(() => {
    // Si ya terminó de cargar y no hay sesión, redirigir
    if (!loading && !session) {
      router.push('/login')
    }
  }, [session, loading, router])

  // Mientras verifica la sesión, puedes mostrar un spinner o nada
  if (loading || !session) {
    return <Loader />
  }

  return (
    <>{children}</>
  )
}