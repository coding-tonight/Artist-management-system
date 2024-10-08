import React, { useState } from "react"

import SongForm from "./Form/SongForm"

import { toast } from 'sonner'

import { SongEndpoints } from "@/config/endpoints"


const SongCreate = () => {
  const [loading, setLoading] = useState(false)
  const onSubmit = async (data, reset) => {
    console.log(data)
    try {
      setLoading(true)
      const res = await SongEndpoints.createSong(data)
      toast.success(res.data.message)
      reset({
        title: '',
        artist: '',
        album_name: '',
        genre: '',
      })
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

     return (
        <section className="container mx-auto w-[80%] mt-5">
          <SongForm onSubmit={onSubmit} loading={loading} />
        </section>
     )
}

export default SongCreate