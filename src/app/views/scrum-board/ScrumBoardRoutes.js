import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Board = Loadable(lazy(() => import("./Board")));
const AppScrumBoard = Loadable(lazy(() => import("./AppScrumBoard")));

const scrumBoardRoutes = [
    {
        path: '/scrum-board/:id',
        element: <Board />,
    },
    {
        path: '/scrum-board',
        element: <AppScrumBoard />,
    },
]

export default scrumBoardRoutes
