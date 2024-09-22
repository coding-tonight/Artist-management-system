import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { toast } from 'sonner'
import { Skeleton } from "@/components/ui/skeleton"


import { UserEndpoints } from "@/config/endpoints"
import { useFetch } from "@/hooks/useFetch"
import UserForm from "./Form/UserForm"

const UserEdit = () => {
     const [loading, setLoading] = useState(false)
     const { id } = useParams()
     const navigate = useNavigate()

     const { data, isSuccess, loading: preLoading } = useFetch(UserEndpoints.getUserWithId, id, null)

     const onSubmit = async (data, reset) => {
          try {
            setLoading(true)
            const res = await UserEndpoints.updateUser(data, id)
            toast.success(res.data.message)
            reset({
              email: '',
              first_name: '',
              last_name: '',
              address: '',
              phone: '',
              gender: '',
              role: '',
              password: '',
              confirm_password: ''
            })
          } catch (error) {

            if(error.response.status == 400) {
              if(error?.response.data.data) {
                toast.error(error.response.data.data.non_field_errors[0] ?? error?.response.data.message)
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
          <UserForm onSubmit={onSubmit} loading={loading} formData={isSuccess ? data.data : {}} />
        </section>
     )
}

export default UserEdit