import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppDragAndDrop = Loadable(lazy(() => import("./AppDragAndDrop")));

const dragAndDropRoute = [
    {
        path: '/others/drag-and-drop',
        element: <AppDragAndDrop />,
    },
]

export default dragAndDropRoute
