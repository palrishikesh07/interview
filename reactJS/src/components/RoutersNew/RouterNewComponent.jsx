import React from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import DashboardPage from './DashboardPage';
import NavBarPage from './NavBarPage';
import ParamsComponent from './ParamsComponent';
import Courese from './Courese';
import MockTest from './MockTest';
import Report from './Report';
import NotFound from './NotFound';
const router = createBrowserRouter([
    { path: "/", element:<> <NavBarPage/><HomePage /></>  },
    { path: "/about", element: <> <NavBarPage/><AboutPage /></> },
    { path: "/dashboard", element: <> <NavBarPage/><DashboardPage /> </>,
        children:[
            {path: 'course', element: <Courese />},
            {path: 'mocktest', element: <MockTest />},
            {path: 'report', element: <Report />},
        ]
     },
    { path: "/student/:id", element: <> <NavBarPage/><ParamsComponent /> </> },
    {path:"*",element: <> <NavBarPage/><NotFound /> </>}
])

const RouterNewComponent = () => {
    return (
        <div>
           
            <h1>RouterNewComponent</h1>
            <RouterProvider router={router} />
        </div>
    )
}

export default RouterNewComponent