import { Navigate, Outlet } from 'react-router-dom';
import { ROLE } from '../constants';
import { useAuthStore } from '../store/auth';

export function RoleGuard() {
  const role = useAuthStore((state) => state.role);

  if (role !== ROLE.admin) {
    return <Navigate to="/resource-list" replace />;
  }

  return <Outlet />;
}
