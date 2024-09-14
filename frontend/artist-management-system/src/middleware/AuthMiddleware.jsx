import { Outlet , Navigate } from "react-router-dom"

/**
 *  AuthMiddleware 
 * @if  user is authenticated then redirect to protected routes 
 * @else redirect to login page
 * @returns {JSX.Element} 
 */

const AuthMiddleware = () => {
    const status = true

   if(status) return <Navigate to="/login"  replace />

   return <Outlet />
}

export default AuthMiddleware