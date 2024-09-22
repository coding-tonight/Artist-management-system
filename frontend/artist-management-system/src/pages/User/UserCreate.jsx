import React, { useState } from "react"

import { toast } from 'sonner'

import { UserEndpoints } from "@/config/endpoints"
import UserForm from "./Form/UserForm"

const UserCreate = () => {
     const [loading, setLoading] = useState(false)

     const onSubmit = async (data, reset) => {
          try {
            setLoading(true)
            const res = await UserEndpoints.createUser(data)
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
     return (
        <section className="container mx-auto w-[80%] mt-5">
          <UserForm onSubmit={onSubmit} loading={loading} />
        </section>
     )
}

export default UserCreate