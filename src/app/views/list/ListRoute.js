import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppList = Loadable(lazy(() => import("./AppList")));

const ListRoute = [
    {
        path: '/matx-list',
        element: <AppList />,
    },
]

export default ListRoute
