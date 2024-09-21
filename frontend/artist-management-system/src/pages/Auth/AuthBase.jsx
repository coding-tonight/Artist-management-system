import React from 'react'

import { useLocation } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'

import Login from "./Login"
import Register from './Register'


const AuthBase = () => {
    const location = useLocation()
    
    const switchAuthComponent = () => {
        switch(location.pathname) {
            case '/login':
                return <Login />

            case '/register':
                return <Register />

            default:
               return <Login />
        }
    }
    return (
        <section className="h-[100vh] flex justify-center items-center">
            <Toaster />
           {switchAuthComponent()}
        </section>
    )
}

export default AuthBase