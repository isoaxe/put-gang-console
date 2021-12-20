import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppEchart = Loadable(lazy(() => import("./echarts/AppEchart")));
const AppRechart = Loadable(lazy(() => import("./recharts/AppRechart")));
const ApexCharts = Loadable(lazy(() => import("./apex-charts/ApexCharts")));

const chartsRoute = [
    {
        path: '/charts/echarts',
        element: <AppEchart />,
    },
    {
        path: '/charts/recharts',
        element: <AppRechart />,
    },
    {
        path: '/charts/apex-charts',
        element: <ApexCharts />,
    },
]

export default chartsRoute
