'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../utils/supabaseClient'

// Definimos el tipo para el contexto
type AuthContextType = {
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ 
  session: null, 
  loading: true 
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1. Obtener la sesión inicial de forma asíncrona
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false) // Terminamos la carga inicial
    }

    initializeAuth()

    // 2. Escuchar cambios en tiempo real (login, logout, token refrescado)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// export const AuthProvider = ({ 
//   children 
// }: { 
//   children: React.ReactNode 
// }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const verifySession = async (options?: { silent?: boolean }) => {
//     const isSilent = options?.silent ?? false;
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verifySession.php`, {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setUser(data.user);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error("Error verificando sesión:", error);
//       setUser(null);
//     } finally {
//       if (!isSilent) setLoading(false);
//     }
//   };

//   const logout = () => {
//     // Aquí llamarías a un endpoint de PHP que borre la cookie
//     setUser(null);
//     router.push('/login');
//   };

//   useEffect(() => {
//     verifySession();
//   }, []);

//   useEffect(() => {
//     const INTERVAL_MS = 5 * 60 * 1000; // 5 minutos
//     const intervalId = setInterval(() => {
//       verifySession({ silent: true });
//     }, INTERVAL_MS);
//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, logout, verifySession }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);