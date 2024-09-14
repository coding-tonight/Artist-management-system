import {
    createBrowserRouter,
  } from "react-router-dom";

import { DashboardLayout } from "@/layouts";
import { AuthMiddleware } from "@/middleware";

import Dashboard from "@/pages/Dashboard";
import AuthBase from "@/pages/Auth/AuthBase";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
                  <AuthMiddleware>
                    <DashboardLayout />
                  </AuthMiddleware>
                ),
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
        ]
    },
    {
        path: "/login",
        element: <AuthBase />,
    },
  ])