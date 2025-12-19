import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <Link to="/">Store</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && user.roles?.includes('Admin') && (
        <>
          <Link to="/admin/products">Admin Products</Link>
          <Link to="/admin/import">Bulk Import</Link>
        </>
      )}

      {user && (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
}
