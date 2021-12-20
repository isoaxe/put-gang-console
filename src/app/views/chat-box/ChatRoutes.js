import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppChat = Loadable(lazy(() => import("./AppChat")));

const chatRoutes = [
    {
        path: '/chat',
        element: <AppChat />,
    },
]

export default chatRoutes
