import React from "react"

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

const  SongForm = (onSubmit) => {    
    const { control, handleSubmit } = useForm()
    
    const { data: artists, isSuccess } = useFetch(ArtistEndpoints.getArtistsListWithoutPagination, null, null)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-[400px]">
            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">Artist</Label>
                   <Controller
                    name="artist"
                    control={control}
                    defaultValue=""
                    rules={{ required: "genre is required" }}
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
                            {field.value 
                                ? artists?.data.find(
                                    (artist) => artist.id === field.value
                                )?.name ?? field.value
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
                                    onSelect={field.onChange}
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
            </div>

            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">Title</Label>
                <Controller
                name="title"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Title" />}
                />
            </div>

            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">Album</Label>
                <Controller
                name="album_name"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Album Name" />}
                />
            </div>

            <div className="flex flex-col space-y-1.5 my-2">
                <Label htmlFor="email">Album</Label>
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

        <Button>Create</Button>
      </form>
    )
}

export default SongForm