import React from "react"

import { Link } from "react-router-dom"

import { LayoutDashboard , User , User2 , Music } from "lucide-react"

const Sidebar = () => {
    return (
       <aside>
          <section className="w-[200px] border h-[100dvh] fixed">
            <h1 className="my-5 text-center">Talent Manager</h1>
            <div className="mx-auto w-[100%] text-center">
              <ul className="flex flex-col justify-center ms-3 gap-4">
                <li>
                    <Link className="sidebar-icon text-sm">
                      <LayoutDashboard className="h-[20px]" /> Dashboard  
                    </Link>
                </li>

                <li>
                    <Link className="sidebar-icon text-sm" to='/users'>
                      <User2 className="h-[20px]" /> Users
                    </Link>
                </li>

                <li>
                    <Link className="sidebar-icon text-sm" to='/artists'>
                      <User className="h-[20px]" /> Artists
                    </Link>
                </li>

                <li>
                    <Link className="sidebar-icon text-sm" to='/song'>
                      <Music className="h-[20px]" /> Songs
                    </Link>
                </li>
              </ul>
            </div>
          </section>
       </aside>
    )
}

export default Sidebar