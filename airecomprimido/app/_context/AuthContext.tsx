"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
});

export const AuthProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const verifySession = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verifySession.php`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Debug 0')
      console.log(res)
      if (res.ok) {
        console.log('Debug 1')
        const data = await res.json();
        console.log('Debug 2')
        setUser(data.user);
        console.log('Debug 3')
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error verificando sesión:", error);
      setUser(null);
    } finally {
      setLoading(false);
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

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);