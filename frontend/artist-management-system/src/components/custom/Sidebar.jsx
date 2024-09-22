import React from "react"

import { Link } from "react-router-dom"

import { Music4, LayoutDashboard , User , User2 } from "lucide-react"

const Sidebar = () => {
    return (
       <aside>
          <section className="w-[200px] border h-[100dvh] fixed">
            <h1 className="my-3 text-center">Logo</h1>
            <div className="mx-auto w-[100%] text-center">
              <ul className="flex flex-col justify-center ms-3 gap-2">
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
                    <Link className="sidebar-icon text-sm" to="/song">
                       <Music4 className="h-[20px]" /> Songs
                    </Link>
                </li>
              </ul>
            </div>
          </section>
       </aside>
    )
}

export default Sidebar