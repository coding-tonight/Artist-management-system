import React, { useEffect } from 'react'

import  { useLocation , Outlet } from 'react-router-dom'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Navbar, Sidebar } from '@/components/custom'


const DashboardLayout = () => {
    const location = useLocation()

    useEffect(() => {
        if(location.state) {
          const { toastMessage } = location.state 
          if(toastMessage) {
            toast.success(toastMessage, { duration: 800 })
            window.history.replaceState('', {})
          }
        }
    }, [location.state])

    return (
        <>
         <Toaster />
         <Sidebar  />
         <section className="ms-[200px] w-auto">
          <header>
            <Navbar />
          </header>
            <main>
              <div className="h-[80dvh]">
                  <Outlet />
              </div>
            </main>
            <footer className="h-auto p-6 shadow" >
                ...
            </footer>
         </section>
        </>
    )
}

export default DashboardLayout