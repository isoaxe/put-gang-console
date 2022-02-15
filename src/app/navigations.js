import { authRoles } from './auth/authRoles'

export const navigations = [
    {
        name: 'Console',
        path: '/dashboard/console',
        icon: 'dashboard',
    },
    {
        name: 'Users',
        path: '/dashboard/users',
        icon: 'people',
    },
    {
        name: 'Affiliates',
        path: '/dashboard/affiliates',
        icon: 'people_alt',
    },
    {
        name: 'Links',
        path: '/dashboard/links',
        icon: 'link',
    },
    {
        name: 'Charts',
        path: '/dashboard/charts',
        icon: 'trending_up',
    },
    {
        label: 'Temporary Items',
        type: 'label',
    },
    {
        name: 'Chart Templates',
        icon: 'trending_up',

        children: [
            {
                name: 'Echarts',
                path: '/charts/echarts',
                iconText: 'E',
            },
            {
                name: 'Recharts',
                path: '/charts/recharts',
                iconText: 'R',
            },
            {
                name: 'Apex Charts',
                path: '/charts/apex-charts',
                iconText: 'A',
            },
        ],
    },
    {
        name: 'Documentation',
        icon: 'launch',
        type: 'extLink',
        path: 'http://demos.ui-lib.com/matx-react-doc/',
    },
]
