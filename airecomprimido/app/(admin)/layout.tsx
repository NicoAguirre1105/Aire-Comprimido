import { AuthProvider } from '../_context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
    </AuthProvider>
  );
}