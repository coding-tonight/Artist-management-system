import { Outlet , Navigate } from "react-router-dom"

const AuthMiddleware = () => {
    const status = true

   if(status) return <Navigate to="/login"  replace />

   return <Outlet />
}

export default AuthMiddleware