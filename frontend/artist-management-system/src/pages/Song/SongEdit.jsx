import React, { useState } from "react"

import { useNavigate, useParams } from "react-router-dom"


import { toast } from 'sonner'
import { Skeleton } from "@/components/ui/skeleton"

import SongForm from "./Form/SongForm"
import { SongEndpoints } from "@/config/endpoints"
import { useFetch } from "@/hooks/useFetch"


const SongEdit = () => {
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const { data, isSuccess, loading: preLoading } = useFetch(SongEndpoints.getSongWithId, id, null)

  const onSubmit = async (data, reset) => {
    console.log(data)
    try {
      setLoading(true)
      const res = await SongEndpoints.updateSong(data, id)
      toast.success(res.data.message)
      navigate('/')
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
          <SongForm onSubmit={onSubmit} loading={loading} formData={ isSuccess ? data.data: {}} />
        </section>
     )
}

export default SongEdit