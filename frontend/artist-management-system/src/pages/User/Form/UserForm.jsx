import React from "react"

import PropTypes from 'prop-types'

import { Button } from "@/components/ui/button"

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
import { zodResolver } from "@hookform/resolvers/zod"

import {  userSchema, userEditSchema } from '@/lib/validations'

const UserForm = ({ onSubmit , loading , formData = {}}) => {
    const { register ,handleSubmit ,control , reset, formState: { errors }, } = useForm({
        resolver: zodResolver(Object.values(formData).length ? userEditSchema: userSchema),
        defaultValues: formData,
    })

    return (
    <form onSubmit={handleSubmit((data) => onSubmit(data, reset))} className="w-[600px]">
            <div className="grid w-full items-center gap-4">

              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col space-y-1.5 col-12">
                    <Label htmlFor="email">Email</Label>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Email is required" }}
                        render={({ field }) => (
                            <Input id="email" placeholder="Email" {...field}  />
                        )}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">First Name</Label>
                    <Controller
                        name="first_name"
                        control={control}
                        defaultValue=""
                        rules={{ required: "First Name is required" }}
                        render={({ field }) => (
                            <Input id="first_name" placeholder="First Name" {...field} />
                        )}
                    />
                    {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message}</p>}
                </div>

                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Last Name</Label>
                    <Controller
                        name="last_name"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Last Name is required" }}
                        render={({ field }) => (
                            <Input id="last_name" placeholder="Last Name" {...field} />
                        )}
                    />
                    {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name.message}</p>}
                </div>
              </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="phone">Phone</Label>
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Phone is required" }}
                            render={({ field }) => (
                                <Input id="phone" type="tel" max="10" placeholder="98XXXXXXXX" {...field} />
                            )}
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Controller
                            name="dob"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Phone is required" }}
                            render={({ field }) => (
                                <Input id="dob" type="date"  placeholder="DOB" {...field} />
                            )}
                        />
                        {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
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
                </div>


                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="gender">Role</Label>
                    <Controller
                        name="role"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Role is required" }}
                        render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="super_admin">SUPER ADMIN</SelectItem>
                            <SelectItem value="artist_manager">ARTIST MANAGER</SelectItem>
                            <SelectItem value="artist">ARTIST</SelectItem>
                            </SelectContent>
                        </Select>
                        )}
                    />
                    {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
                </div>


                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Address</Label>
                    <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            rules={{ required: "Address is required" }}
                            render={({ field }) => (
                                <Input id="address" placeholder="Address" {...field} />
                            )}
                        />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                {Object.values(formData).length ? (
                   ''
                ): (
                    <>                    
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
                    </>
                )}

            </div>

            <div className="my-2 flex gap-2">
              {Object.values(formData).length ? (
                <Button  disable={loading ? 'true': 'false'}>
                    {loading ? 'loading...': 'Update'}
                </Button>
              
              ): (
              <Button  disable={loading ? 'true': 'false'}>
                {loading ? 'loading...': 'Create'}
              </Button>
              )}
              <Button variant="secondary" type="button">Back</Button>
            </div>
    </form>
    )
}

UserForm.propTypes = {
    onSubmit: PropTypes.func,
    loading: PropTypes.bool, 
    formData: PropTypes.object
}

export default UserForm