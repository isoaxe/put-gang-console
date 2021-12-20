import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppTodo = Loadable(lazy(() => import("./AppTodo")));

const todoRoutes = [
    {
        path: '/todo/list',
        element: <AppTodo />,
    },
]

export default todoRoutes
