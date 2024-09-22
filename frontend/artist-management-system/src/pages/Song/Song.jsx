import React, { useState } from "react"

import { Link } from "react-router-dom"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"


import { SongEndpoints } from "@/config/endpoints"
import { useFetch } from "@/hooks/useFetch"
import { recordColumns as columns } from "@/lib/tableHeader"
import { DataTable } from "@/components/custom"

import { Edit } from "lucide-react"
import { ConfirmModal } from "@/components/custom/ConfirmModal"
import { handleDelete } from "@/config/request"

const Song = () => {
   const [pagination, setPagination] = useState({
      pageIndex: 0, //initial page index
      pageSize: 10, //default page size
     });

   const { data, loading, isSuccess , shouldRefresh } = useFetch(SongEndpoints.getSongs, null, pagination.pageIndex + 1 <= 0? 1: pagination.pageIndex + 1)

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
               <Link to={'/song/create'}>
                  Create
               </Link>
            </Button>
         </div>

           <DataTable 
             columns={[...columns,
               {
                  accessorKey: "artist",
                  header: "Artist",
               }, 
              { 
               accessorKey: "action",
               header: "Action",
               cell: ({ row }) => {
            
                 return (
                   <>
                    <div className="flex">
                    <Link to={`/song/edit/${row.original.id}`}>
                       <Edit className="h-[20px] text-blue-400 cursor-pointer" />
                     </Link>
                     <ConfirmModal onConfirm={() => handleDelete(SongEndpoints.delete, row.original.id, () => {}, shouldRefresh)} />
                    </div>
                   </>
                 )
               },
             },]}  
             setPagination={setPagination}
             pagination={pagination}
             totalPage={isSuccess ? data.total_page: 0}
             data={isSuccess ? data.data.map((song) => {
               return {
                  id: song.id,
                  index: song.row_number,
                  record: song.title,
                  album: song.album_name,
                  artist: song.artist,
               }
           }): []} />
        </section>
     )
}

export  default Song