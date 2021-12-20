import AuthGuard from "app/auth/AuthGuard";
import NotFound from "app/views/sessions/NotFound";
import chartsRoute from "app/views/charts/ChartsRoute";
import chatRoutes from "app/views/chat-box/ChatRoutes";
import crudRoute from "app/views/CRUD/CrudRoutes";
import formsRoutes from "app/views/forms/FormsRoutes";
import ListRoute from "app/views/list/ListRoute";
import mapRoutes from "app/views/map/MapRoutes";
import pagesRoutes from "app/views/pages/pagesRoutes";
import todoRoutes from "app/views/todo/TodoRoutes";
import inboxRoute from "app/views/inbox/InboxRoutes";
import pricingRoutes from "app/views/pricing/PricingRoutes";
import invoiceRoutes from "app/views/invoice/InvoioceRoutes";
import calendarRoutes from "app/views/calendar/CalendarRoutes";
import ecommerceRoutes from "app/views/ecommerce/EcommerceRoutes";
import dataTableRoutes from "app/views/data-table/dataTableRoutes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
import dragAndDropRoute from "app/views/Drag&Drop/DragAndDropRoute";
import scrumBoardRoutes from "app/views/scrum-board/ScrumBoardRoutes";
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
        ...calendarRoutes,
        ...chartsRoute,
        ...chatRoutes,
        ...crudRoute,
        ...dataTableRoutes,
        ...dragAndDropRoute,
        ...ecommerceRoutes,
        ...formsRoutes,
        ...invoiceRoutes,
        ...ListRoute,
        ...mapRoutes,
        ...materialRoutes,
        ...inboxRoute,
        ...pageLayoutRoutes,
        ...pagesRoutes,
        ...pricingRoutes,
        ...scrumBoardRoutes,
        ...todoRoutes,
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