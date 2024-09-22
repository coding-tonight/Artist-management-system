import React, { useState } from "react"

import { useParams, useNavigate } from "react-router-dom"

import { toast } from 'sonner'

import { Skeleton } from "@/components/ui/skeleton"

import ArtistForm from "./Form/ArtistForm"
import { ArtistEndpoints } from "@/config/endpoints"
import { useFetch } from "@/hooks/useFetch"

const ArtistCreate = () => {
     const [loading, setLoading] = useState(false)
     const { id } = useParams()
     const navigate = useNavigate()

     const { data, isSuccess, loading: preLoading } = useFetch(ArtistEndpoints.getArtistWithId, id, null)

     const onSubmit = async (data, _) => {
          try {
            setLoading(true)
            const res = await ArtistEndpoints.updateArtist(data, id)
            toast.success(res.data.message ?? 'success')
            navigate('/artists/', { replace: true  })
          } catch (error) {

            if(error.response.status == 400) {
              if(error?.response.data.data) {
                toast.error(error.response.data.data.non_field_errors[0] ?? 'Validation Error')
              } else {
                 toast.error('Ops something went wrong')
              }
            } else {
              toast.error('Ops something went wrong')
            }

              throw new Error(error)
          } finally {
            setLoading(false)
          }
     }

     if(preLoading) {
        return (
          <section className="container mx-auto w-[80%] mt-5">
              <Skeleton className="w-[400px] h-[200px]">
                <Skeleton className="h-10 w-[100%]" />
             </Skeleton>
           </section>
        )
       }
    
     return (
        <section className="container mx-auto w-[80%] mt-5">
          <ArtistForm onSubmit={onSubmit} loading={loading}  formData={isSuccess ? data.data: {}} />
        </section>
     )
}

export  default ArtistCreate