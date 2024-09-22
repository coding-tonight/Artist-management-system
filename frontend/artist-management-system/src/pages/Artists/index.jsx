import React, { useState  } from "react"

import { Link } from "react-router-dom"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

import { ArtistEndpoints } from "@/config/endpoints"
import { useFetch } from "@/hooks/useFetch"
import { artistColumns as columns } from "@/lib/tableHeader"
import { DataTable } from "@/components/custom"

import { Edit, LucideEye } from "lucide-react"
import { ConfirmModal } from "@/components/custom/ConfirmModal"
import { handleDelete } from "@/config/request"

import ExcelExport from "@/components/custom/ExportToExcel"
import { usePermission } from "@/hooks"
import { ARTIST_MANAGER } from "@/constants/permission"

const Artist = () => {
   const [pagination, setPagination] = useState({
      pageIndex: 0, //initial page index
      pageSize: 10, //default page size
     });

   const { data, loading, isSuccess , shouldRefresh } = useFetch(ArtistEndpoints.getArtists, null , pagination.pageIndex + 1 <= 0? 1: pagination.pageIndex + 1)

   const { role } = usePermission()

   console.log(role)

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
         <div className="my-3 flex items-center gap-3">
            <Button>
               <Link to={'/artist/create'}>
                  Create
               </Link>
            </Button>
            
             {role !== ARTIST_MANAGER ? '': (
               <ExcelExport data={isSuccess ? data.data: []} fileName={'artist list'} />
             )}
         </div>

           <DataTable 
             columns={[...columns,  { 
               accessorKey: "action",
               header: "Action",
               cell: ({ row }) => {
                 return (
                   <>
                    <div className="flex">
                     <Link to={`/song/${row.original.id}`}>
                       <LucideEye className="h-[20px] cursor-pointer" />
                     </Link>
                     <Link to={`/artist/edit/${row.original.id}`}>
                       <Edit className="h-[20px] text-blue-400 cursor-pointer" />
                     </Link>
                     <ConfirmModal onConfirm={() => handleDelete(ArtistEndpoints.delete, row.original.id, () => {}, shouldRefresh)} />
                    </div>
                   </>
                 )
               },
             },]}  
             setPagination={setPagination}
             pagination={pagination}
             totalPage={isSuccess ? data.total_page: 0}
             data={isSuccess ? data.data.map((artist) => {
               return {
                  id: artist.id,
                  index: artist.row_number,
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