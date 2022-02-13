import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';
const Console = Loadable(lazy(() => import("./Console")));
const Users = Loadable(lazy(() => import("./Users")));
const Affiliates = Loadable(lazy(() => import("./Affiliates")));
const Affiliate = Loadable(lazy(() => import("./Affiliate")));
const Links = Loadable(lazy(() => import("./Links")));
const Charts = Loadable(lazy(() => import("./Charts")));
const Settings = Loadable(lazy(() => import("./Settings")));


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
        path: '/dashboard/links',
        element: <Links />,
    },
    {
        path: '/dashboard/charts',
        element: <Charts />,
    },
    {
        path: '/dashboard/settings',
        element: <Settings />,
    },
]
