import { Outlet , Navigate } from "react-router-dom"

import { useToken } from "@/hooks"

/**
 *  AuthMiddleware 
 * @if  user is authenticated then redirect to protected routes 
 * @else redirect to login page
 * @returns {JSX.Element} 
 */

const AuthMiddleware = () => {
    const token = useToken()

   if(!token) return <Navigate to="/login"  replace />

   return <Outlet />
}

export default AuthMiddleware