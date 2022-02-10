import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const NotFound = Loadable(lazy(() => import("./NotFound")));
const ForgotPassword = Loadable(lazy(() => import("./ForgotPassword")));
const FirebaseLogin = Loadable(lazy(() => import("./FirebaseLogin")));
const FirebaseRegister = Loadable(lazy(() => import("./FirebaseRegister")));

const sessionRoutes = [
    {
        path: '/session/signup',
        element: <FirebaseRegister />,
    },
    {
        path: '/session/signin',
        element: <FirebaseLogin />,
    },
    {
        path: '/session/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/session/404',
        element: <NotFound />,
    },
]

export default sessionRoutes
