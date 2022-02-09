import AuthGuard from "app/auth/AuthGuard";
import NotFound from "app/views/sessions/NotFound";
import chartsRoute from "app/views/charts/ChartsRoute";
import ListRoute from "app/views/list/ListRoute";
import dataTableRoutes from "app/views/data-table/dataTableRoutes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
import dragAndDropRoute from "app/views/Drag&Drop/DragAndDropRoute";
import pageLayoutRoutes from "app/views/page-layouts/PageLayoutRoutees";
import { dashboardRoutes } from "app/views/dashboard/DashboardRoutes";
import sessionRoutes from "app/views/sessions/SessionRoutes";
import MatxLayout from '../components/MatxLayout/MatxLayout'

export const AllPages = () => {
  const all_routes = [
    {
      path: "/",
      element: (
        <AuthGuard>
          <MatxLayout />
        </AuthGuard>
      ),
      children: [
        ...dashboardRoutes,
        ...chartsRoute,
        ...dataTableRoutes,
        ...dragAndDropRoute,
        ...ListRoute,
        ...materialRoutes,
        ...pageLayoutRoutes,
      ],
    },
    ...sessionRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  return all_routes;
}
