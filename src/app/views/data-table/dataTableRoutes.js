import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const SimpleMuiTable = Loadable(lazy(() => import("./SimpleMuiTable")));
const ExpandableMuiDataTable = Loadable(lazy(() => import("./ExpandableMuiDataTable")));

const dataTableRoutes = [
    {
        path: '/data-table/simple-mui-table',
        element: <SimpleMuiTable />,
    },
    {
        path: '/data-table/expandable-mui-table',
        element: <ExpandableMuiDataTable />,
    },
]

export default dataTableRoutes
