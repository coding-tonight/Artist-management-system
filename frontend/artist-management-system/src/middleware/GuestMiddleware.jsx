import React from "react"
import { useToken } from "@/hooks"
import { Outlet , Navigate } from "react-router-dom"

/**
 * GuestMiddleware
 * @if user is authenticated then redirect to dashboard
 * @else to login page
 * @returns 
 */

const GuestMiddleware = () => {
   const token = useToken()

   if(!token) return <Outlet />
   return <Navigate to="/"  replace />
}

export default GuestMiddleware