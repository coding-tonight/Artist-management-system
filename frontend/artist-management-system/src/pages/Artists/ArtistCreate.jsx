import React, { useState } from "react"

import { toast } from 'sonner'

import ArtistForm from "./Form/ArtistForm"
import { ArtistEndpoints } from "@/config/endpoints"

const ArtistCreate = () => {
     const [loading, setLoading] = useState(false)

     const onSubmit = async (data, reset) => {
          try {
            setLoading(true)
            const res = await ArtistEndpoints.createArtist(data)
            toast.success('success')
            reset({
              name: '',
              gender: '',
              dob: '',
              address: '',
              no_of_albums_released: '',
              first_release_year: ''
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
          <ArtistForm onSubmit={onSubmit} loading={loading} />
        </section>
     )
}

export  default ArtistCreate