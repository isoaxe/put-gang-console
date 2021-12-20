import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const CrudTable = Loadable(lazy(() => import("./CrudTable")));

const crudRoute = [
    {
        path: '/crud-table',
        element: <CrudTable />,
    },
]

export default crudRoute
