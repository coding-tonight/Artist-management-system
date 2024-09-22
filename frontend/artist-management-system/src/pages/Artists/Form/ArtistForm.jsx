import React from "react"

import PropTypes from 'prop-types'

import { useForm, Controller } from "react-hook-form"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { zodResolver } from "@hookform/resolvers/zod"
import { artistSchema } from '@/lib/validations'



const ArtistForm = ({ onSubmit, loading, formData }) => {    
    const { control, handleSubmit, reset,  formState: { errors }, } = useForm({
        resolver: zodResolver(artistSchema),
        defaultValues: formData
    })
    
    return (
        <form onSubmit={handleSubmit((data) =>  onSubmit(data, reset))} className="w-[400px]">
            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">Name</Label>
                <Controller
                defaultValue=''
                name="name"
                control={control}
                render={({ field }) => <Input {...field} placeholder="name" />}
                />
               {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">DOB</Label>
                <Controller
                name="dob"
                defaultValue=""
                control={control}
                render={({ field }) => <Input type="date" {...field} placeholder="address" />}
                />
               {errors.dob && <p className="text-red-500 text-xs">{errors.dob.message}</p>}
            </div>

            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">Address</Label>
                <Controller
                name="address"
                defaultValue=""
                control={control}
                render={({ field }) => <Input {...field} placeholder="Album Name" />}
                />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>

            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">Gender</Label>
                <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: "genre is required" }}
                render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                    <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="M">MALE</SelectItem>
                    <SelectItem value="F">FEMALE</SelectItem>
                    <SelectItem value="O">OTHER</SelectItem>
                    </SelectContent>
                </Select>
                )}
            />
            {errors.gender && <p className="text-red-500 text-xs">{errors.gender.message}</p>}
            </div>

            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">First Year Released</Label>
                <Controller
                name="first_release_year"
                defaultValue=""
                control={control}
                render={({ field }) => <Input type="date" {...field}  />}
                />
                {errors.first_release_year && <p className="text-red-500 text-xs">{errors.first_release_year.message}</p>}
            </div>

            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">Number of albums released</Label>
                <Controller
                name="no_of_albums_released"
                control={control}
                defaultValue=""
                render={({ field }) => <Input type="number" {...field} placeholder="number" />}
                />
                {errors.no_of_albums_released && <p className="text-red-500 text-xs">{errors.no_of_albums_released.message}</p>}
            </div>
           
           <div className="flex gap-2">
            {Object.values(formData).length ? (
              <Button>{loading ? 'loading': 'Update'}</Button>
            ): (
              <Button>{loading ? 'loading': 'Create'}</Button>
            )}
            <Button variant="secondary" type="button">Back</Button>
           </div>
      </form>
    )
}

ArtistForm.propTypes = {
    onSubmit: PropTypes.func,
    loading: PropTypes.bool,
    formData: PropTypes.object
}

export default ArtistForm