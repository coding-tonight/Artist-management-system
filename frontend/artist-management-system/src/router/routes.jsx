import React from "react";

import {
    createBrowserRouter,
  } from "react-router-dom";

import { AuthMiddleware, GuestMiddleware } from "@/middleware";

import Dashboard from "@/pages/Dashboard";
import AuthBase from "@/pages/Auth/AuthBase";
import { DashboardLayout } from "@/layouts";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthMiddleware />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                  {
                    index: true ,
                    element: <Dashboard />
                  }
                ]
            },
        ]
    },
    {
        path: "/",
        element: <GuestMiddleware />,
        children: [
        {
          path: 'login',
          element: <AuthBase />,
        }, 
      ]
    },
  ])