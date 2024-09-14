import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
    return (
        <>
        <aside>
             this sidebar
        </aside>
         <Outlet />
        </>
    )
}

export default DashboardLayout