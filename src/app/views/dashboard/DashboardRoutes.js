import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Analytics = Loadable(lazy(() => import("./Analytics")));
const Analytics2 = Loadable(lazy(() => import("./Analytics2")));
const Analytics3 = Loadable(lazy(() => import("./Analytics3")));
const Console = Loadable(lazy(() => import("./Console")));
const Users = Loadable(lazy(() => import("./Users")));
const Affiliates = Loadable(lazy(() => import("./Affiliates")));
const Affiliate = Loadable(lazy(() => import("./Affiliate")));
const InventoryManagement = Loadable(lazy(() => import("./InventoryManagement")));

export const dashboardRoutes = [
    {
        path: '/dashboard/console',
        element: <Console />,
    },
    {
        path: '/dashboard/users',
        element: <Users />,
    },
    {
        path: '/dashboard/affiliates',
        element: <Affiliates />,
    },
    {
        path: '/dashboard/affiliate',
        element: <Affiliate />,
    },
    {
        path: '/dashboard/default',
        element: <Analytics2 />,
    },
    {
        path: '/dashboard/analytics',
        element: <Analytics3 />,
    },
    {
        path: '/dashboard/alternative',
        element: <Analytics />,
    },
    {
        path: '/dashboard/inventory-management',
        element: <InventoryManagement />,
    },
]
