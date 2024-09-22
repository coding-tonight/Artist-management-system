import React from "react";

import {
    createBrowserRouter,
  } from "react-router-dom";

import { AuthMiddleware, GuestMiddleware } from "@/middleware";

import Dashboard from "@/pages/Dashboard";
import AuthBase from "@/pages/Auth/AuthBase";
import { DashboardLayout } from "@/layouts";

import SongCreate from "@/pages/Song/SongCreate";
import Song from "@/pages/Song/Song";
import Artist from "@/pages/Artists";
import ArtistCreate from "@/pages/Artists/ArtistCreate";
import ArtistEdit from "@/pages/Artists/ArtistEdit";
import Users from "@/pages/User";
import UserCreate from "@/pages/User/UserCreate";
import UserEdit from "@/pages/User/UserEdit";

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
                  },
                  {
                    path: 'users/' ,
                    element: <Users />
                  },
                  {
                    path: 'user/create' ,
                    element: <UserCreate />
                  },
                  {
                    path: 'user/edit/:id' ,
                    element: <UserEdit />
                  },
                  {
                    path: 'artists/' ,
                    element: <Artist />
                  },
                  {
                    path: 'artist/create' ,
                    element: <ArtistCreate />
                  },
                  {
                    path: 'artist/edit/:id' ,
                    element: <ArtistEdit />
                  },
                  {
                    path: 'Song/' ,
                    element: <Song />
                  },
                  {
                    path: 'song/create' ,
                    element: <SongCreate />
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
        {
          path: 'register',
          element: <AuthBase />,
        }, 
      ]
    },
  ])