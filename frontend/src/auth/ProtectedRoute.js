import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  if (roles && !roles.some(r => user.roles.includes(r))) {
    return <h3>Access Denied</h3>;
  }

  return children;
}
