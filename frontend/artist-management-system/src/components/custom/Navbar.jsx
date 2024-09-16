import React from "react"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu"


import { Settings, LogOut } from "lucide-react"
  
const Navbar = () => {
    const signOut = () => {
         localStorage.clear()
         window.location.reload()
    }
    return (
        <>
         <section className="w-[100%] shadow p-5 flex justify-end">
            <nav>
                <NavigationMenu>
                    <NavigationMenuList className="gap-3">
                        <NavigationMenuItem>
                            <NavigationMenuLink><Settings className="h-[20px]" /></NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink><LogOut onClick={signOut} className="cursor-pointer h-[20px]" /></NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </nav>
         </section>
        </>
    )
}

export default Navbar