"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  loading: boolean;
  logout: () => void;
  verifySession: (options?: { silent?: boolean }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  verifySession: async () => {},
});

export const AuthProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const verifySession = async (options?: { silent?: boolean }) => {
    const isSilent = options?.silent ?? false;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verifySession.php`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error verificando sesión:", error);
      setUser(null);
    } finally {
      if (!isSilent) setLoading(false);
    }
  };

  const logout = () => {
    // Aquí llamarías a un endpoint de PHP que borre la cookie
    setUser(null);
    router.push('/login');
  };

  useEffect(() => {
    verifySession();
  }, []);

  useEffect(() => {
    const INTERVAL_MS = 5 * 60 * 1000; // 5 minutos
    const intervalId = setInterval(() => {
      verifySession({ silent: true });
    }, INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, verifySession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);