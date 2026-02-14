"use client"

import { useAuth } from "@/app/_context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from 'react'
import Loader from "@/app/_components/loader";

export default function ProtectedLayout({
  children
}: {
  children:React.ReactNode
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) return (
    <Loader />
  )

  if (!user) return null;

  return (
    <>
    {children}
    </>
  )
}