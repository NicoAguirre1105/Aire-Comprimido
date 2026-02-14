import { AuthProvider } from '../_context/AuthContext';
import ProtectedLayout from './ProtectedLayout';

export default function Layout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ProtectedLayout>
        {children}
      </ProtectedLayout>
    </AuthProvider>
  );
}