import React, { useState } from "react"
import { Link , useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"

import { AuthEndpoints } from "@/config/endpoints"
import { encodeBase64 } from "@/lib/utils"

const Login = () => {
    const { register, handleSubmit , setError, formState: { errors }, } = useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()

     const onSubmit = async (data) => {
        try {
            setLoading(true)
            const res = await AuthEndpoints.signIn(data)
            if(res.status == 200) {
                const { token, email, role } = res.data.data
                localStorage.setItem('_token', encodeBase64(token))
                localStorage.setItem('_info', encodeBase64(JSON.stringify({ email, role })))

                navigate('/', { replace: true , state: {  toastMessage: res.data.message } })
            }
        } catch(error) {
             const { status, data } = error.response

             if(status == 400) {
                 const { email, password, non_field_errors } = data.errors

                 if(email) {
                    setError('email', { type: 'manual', message: email[0] ?? 'Invalid Email'})
                 }

                 if(password) {
                    setError('password', { type: 'manual', message: password[0] ?? 'Email or Password is Invalid'})
                 }

                 if(non_field_errors) {
                    toast({ variant: "destructive" , title: non_field_errors[0] })
                 }
             }
            throw new Error(error)
        } finally {
           setLoading(false)
        }
     }

    return (
          <Card className="w-[350px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle className="text-center">Artist Management System</CardTitle>
                    <CardDescription className="text-center">Manage your Artist and Song.</CardDescription>
                </CardHeader>
                <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Email" {...register("email")} />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Password" {...register("password")} />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                        </div>
                </CardContent>
                <CardFooter className="flex justify-between flex-col gap-2">
                    {/* <Button variant="outline">Cancel</Button> */}
                    <Button size="lg" className="w-[100%]" disable={loading ? 'true': 'false'}>{loading ? 'loading...': 'Sign In'}</Button>

                    <div className="flex justify-end">
                        <Link className="text-sm underline" to='/register'>Don&#39;t have an account ? sign up</Link>
                    </div>
                </CardFooter>
                    </form>
            </Card>
    )
}

export default Login