import React, { useState } from "react"

import { Link } from "react-router-dom"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"


import { ArtistEndpoints } from "@/config/endpoints"
import { useFetch } from "@/hooks/useFetch"
import { artistColumns as columns } from "@/lib/tableHeader"
import { DataTable } from "@/components/custom"

const Artist = () => {
   const [pagination, setPagination] = useState({
      pageIndex: 0, //initial page index
      pageSize: 10, //default page size
     });

   const { data, loading, isSuccess } = useFetch(ArtistEndpoints.getArtists, null , pagination.pageIndex + 1 <= 0? 1: pagination.pageIndex + 1)

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
               <Link to={'/artist/create'}>
                  Create
               </Link>
            </Button>
         </div>

           <DataTable 
             columns={columns}  
             setPagination={setPagination}
             pagination={pagination}
             totalPage={isSuccess ? data.total_page: 0}
             data={isSuccess ? data.data.map((artist, index) => {
               return {
                  id: artist.id,
                  index: index + 1,
                  name: artist.name,
                  dob: artist.dob,
                  gender: artist.gender,
                  address: artist.address,
                  first_release_year: artist.first_release_year,
                  no_of_albums_released: artist.no_of_albums_released 
               }
           }): []} />
        </section>
     )
}

export  default Artist