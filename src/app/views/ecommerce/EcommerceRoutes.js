import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Shop = Loadable(lazy(() => import("./Shop")));
const Cart = Loadable(lazy(() => import("./Cart")));
const Checkout = Loadable(lazy(() => import("./Checkout")));

const ecommerceRoutes = [
    {
        path: '/ecommerce/shop',
        element: <Shop />,
    },
    {
        path: '/ecommerce/cart',
        element: <Cart />,
    },
    {
        path: '/ecommerce/checkout',
        element: <Checkout />,
    },
]

export default ecommerceRoutes
