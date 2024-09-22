import React, { useState } from "react"

import { Link } from "react-router-dom"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"


import { UserEndpoints } from "@/config/endpoints"
import { useFetch } from "@/hooks/useFetch"
import { userColumns as columns } from "@/lib/tableHeader"
import { DataTable } from "@/components/custom"

const Users = () => {
   const [pagination, setPagination] = useState({
      pageIndex: 0, //initial page index
      pageSize: 10, //default page size
     });

   const { data, loading, isSuccess } = useFetch(UserEndpoints.getUser, null , pagination.pageIndex + 1 <= 0? 1: pagination.pageIndex + 1)

   if(loading) {
    return (
      <section className="container mx-auto w-[80%] mt-5">
          <Skeleton className="w-[100%] h-[200px]">
            <Skeleton className="h-10 w-[100%]" />
         </Skeleton>
       </section>
    )
   }

     return (
        <section className="container mx-auto w-[80%] mt-5">
         <div className="my-3">
            <Button>
               <Link to={'/user/create'}>
                  Create
               </Link>
            </Button>
         </div>

           <DataTable 
             columns={columns}  
             setPagination={setPagination}
             pagination={pagination}
             totalPage={isSuccess ? data.total_page: 0}
             data={isSuccess ? data.data.map((user, index) => {
               return {
                  id: user.id,
                  index: index + 1,
                  name: user.name,
                  email: user.email,
                  dob: user.dob,
                  gender: user.gender,
                  address: user.address,
                  role: user.role,
                  phone: user.phone 
               }
           }): []} />
        </section>
     )
}

export  default Users