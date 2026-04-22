import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthGuard } from '../components/AuthGuard';
import { RoleGuard } from '../components/RoleGuard';
import AppLayout from '../layouts/AppLayout';
import LoginPage from '../pages/Login';
import ResourceListPage from '../pages/ResourceList';
import MonitorDetailPage from '../pages/MonitorDetail';
import ReservePage from '../pages/Reserve';
import OpenManagePage from '../pages/OpenManage';
import OrderUpdatePage from '../pages/OrderUpdate';
import OpsToolsPage from '../pages/OpsTools';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <AuthGuard />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: '/', element: <Navigate to="/resource-list" replace /> },
          { path: '/resource-list', element: <ResourceListPage /> },
          { path: '/monitor/:hostId', element: <MonitorDetailPage /> },
          { path: '/reserve', element: <ReservePage /> },
          { path: '/open-manage', element: <OpenManagePage /> },
          { path: '/order-update', element: <OrderUpdatePage /> },
          {
            element: <RoleGuard />,
            children: [{ path: '/ops-tools', element: <OpsToolsPage /> }],
          },
        ],
      },
    ],
  },
]);
