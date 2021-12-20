import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppInbox = Loadable(lazy(() => import("./AppInbox")));

const inboxRoute = [
    {
        path: '/inbox',
        element: <AppInbox />,
    },
]

export default inboxRoute
