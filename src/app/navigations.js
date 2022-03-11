// TODO: Implement authRoles to conditionally render Charts for admin user only.
/* eslint-disable-next-line */
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
    /*
    {
        name: 'Charts',
        path: '/dashboard/charts',
        icon: 'trending_up',
    },
    */
]
