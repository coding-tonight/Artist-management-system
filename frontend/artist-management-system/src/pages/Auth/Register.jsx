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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm , Controller } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"

import { AuthEndpoints } from "@/config/endpoints"
import { registerSchema } from '@/lib/validations'

const Register = () => {
    const { register, handleSubmit , setError, control, formState: { errors }, } = useForm({
        resolver: zodResolver(registerSchema),
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { toast } = useToast()

     const onSubmit = async (data) => {
        try {
            setLoading(true)
            const res = await AuthEndpoints.signUP(data)

            if(res.status == 200) {
                toast(res.data.message)
                navigate('/login', { replace: true}) 
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
          <Card className="w-[400px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader>
                    <CardTitle className="text-center">Artist Management System</CardTitle>
                    <CardDescription className="text-center">Register.</CardDescription>
                </CardHeader>
                <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5 col-12">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Email" {...register("email")} />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">First Name</Label>
                                    <Input id="first_name" placeholder="John" {...register("first_name")} />
                                    {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message}</p>}
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Last Name</Label>
                                    <Input id="email" placeholder="Doe" {...register("last_name")} />
                                    {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Phone</Label>
                                    <Input id="email" type="tel" max="10" placeholder="98XXXXXXXX" {...register("phone")} />
                                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Date of Birth</Label>
                                    <Input id="dob" type="date"  placeholder="DOB" {...register("dob")} />
                                    {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="gender">Gender</Label>
                                <Controller
                                    name="gender"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: "Gender is required" }}
                                    render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectItem value="M">Male</SelectItem>
                                        <SelectItem value="F">Female</SelectItem>
                                        <SelectItem value="O">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    )}
                                />
                                {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Address</Label>
                                <Input id="address" type="address" placeholder="Address" {...register("address")} />
                                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Password" {...register("password")} />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Confirm Password</Label>
                                <Input id="confirm_password" type="password" placeholder="Confirm Password" {...register("confirm_password")} />
                                {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
                            </div>
                        </div>
                </CardContent>
                <CardFooter className="flex justify-between flex-col gap-2">
                    {/* <Button variant="outline">Cancel</Button> */}
                    <Button size="lg" className="w-[100%]" disable={loading ? 'true': 'false'}>{loading ? 'loading...': 'Sign In'}</Button>

                    <div className="flex justify-end">
                        <Link className="text-sm underline">Don&#39;t have an account ? sign up</Link>
                    </div>
                </CardFooter>
                    </form>
            </Card>
    )
}

export default Register