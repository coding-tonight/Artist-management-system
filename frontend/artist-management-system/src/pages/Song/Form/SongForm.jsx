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


  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { cn } from "@/lib/utils"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useFetch } from "@/hooks/useFetch"
import { ArtistEndpoints } from "@/config/endpoints"
import { zodResolver } from "@hookform/resolvers/zod"
import { songSchema } from '@/lib/validations'

const  SongForm = ({ onSubmit, loading, formData = {}}) => {    
    const { control, handleSubmit, reset,  formState: { errors }, } = useForm({
        resolver: zodResolver(songSchema),
        defaultValues: formData 
    })
    
    const { data: artists, isSuccess } = useFetch(ArtistEndpoints.getArtistsListWithoutPagination, null, null)

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data, reset))} className="w-[400px]">
            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="artist">Artist</Label>
                   <Controller
                    name="artist"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Artist is required" }}
                    render={({ field }) => (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {isSuccess && field.value 
                                ? artists?.data.find(
                                    (artist) => artist.id === field.value
                                )?.name
                                : "Select artist"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                        <Command>
                            <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No Artist found.</CommandEmpty>
                            <CommandGroup>
                                {isSuccess ? artists?.data.map((artist) => (
                                <CommandItem
                                    value={artist.id}
                                    key={artist.id}
                                    onSelect={() => field.onChange(artist.id)}
                                >
                                    {artist.name}
                                    <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        artist.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                    />
                                </CommandItem>
                                )): ''}
                            </CommandGroup>
                            </CommandList>
                        </Command>
                        </PopoverContent>
                    </Popover>
                )}
                />
                {errors.artist && <p className="text-red-500 text-xs">{errors.artist.message}</p>}
            </div>

            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">Title</Label>
                <Controller
                name="title"
                defaultValue=""
                control={control}
                render={({ field }) => <Input {...field} placeholder="Title" />}
                />
                {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
            </div>

            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">Album</Label>
                <Controller
                name="album_name"
                defaultValue=""
                control={control}
                render={({ field }) => <Input {...field} placeholder="Album Name" />}
                />
                {errors.album_name && <p className="text-red-500 text-xs">{errors.album_name.message}</p>}
            </div>

            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">Genre</Label>
                <Controller
                name="genre"
                control={control}
                defaultValue=""
                rules={{ required: "genre is required" }}
                render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                    <SelectValue placeholder="Select Genre" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="rnb">RNB</SelectItem>
                    <SelectItem value="country">COUNTRY</SelectItem>
                    <SelectItem value="classic">CLASSIC</SelectItem>
                    <SelectItem value="rock">ROCK</SelectItem>
                    <SelectItem value="jazz">JAZZ</SelectItem>
                    <SelectItem value="RAP">RAP</SelectItem>
                    </SelectContent>
                </Select>
                )}
            />
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

SongForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  formData: PropTypes.object
}

export default SongForm