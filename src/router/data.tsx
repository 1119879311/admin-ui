import BasicLayout from "@/layout"
import NotFount from "@/pages/NotFount"
import Login from "@/pages/Login"
import Manager from "../pages/Manager"
import PageIndex from "../pages/Index"

import { Navigate } from "react-router-dom"

export const initRoutes= (addRoutes:any[]=[])=> [
    {
        path: "/",
        element: <Navigate to="/admin" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/404",
        element: <NotFount />,
      },
      {
        path: "/admin",
        element:  <BasicLayout />,
        children: [
           ...addRoutes,
          {
            path: "*",
            element: <NotFount />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFount />,
      },
]

export const dynamicsRoutes = [
  {
    path:"/admin",
    element:<PageIndex/>
  },
  {
    path:"/admin/manager",
    element:<Manager/>
  }
]

