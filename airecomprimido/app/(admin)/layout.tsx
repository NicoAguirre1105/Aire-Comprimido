"use client";

import { AuthProvider } from '../_context/AuthContext';
export default function ProtectedLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}