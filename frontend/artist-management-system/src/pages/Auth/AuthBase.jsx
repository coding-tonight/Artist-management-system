import { useLocation } from "react-router-dom"

import Login from "./Login"

const AuthBase = () => {
    const location = useLocation()
    console.log(location.pathname)

    const switchAuthComponent = () => {
        switch(location.pathname) {
            case '/login':
                return <Login />

            case '/register':
                return <Login />

            default:
               return <Login />
        }
    }
    return (
        <section className="h-[100vh] flex justify-center items-center">
           {switchAuthComponent()}
        </section>
    )
}

export default AuthBase