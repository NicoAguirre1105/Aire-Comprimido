"use client"

import { useAuth } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from 'react'

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) return (
    <p>Cargando aplicación...</p>
  )

  if (!user) return null;

  return (
    <div className="p-10">
      <h1>Panel de Control</h1>
      <p>Bienvenido, **{user.user}**</p>
      <button 
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar Sesión
      </button>
    </div>
  )
}