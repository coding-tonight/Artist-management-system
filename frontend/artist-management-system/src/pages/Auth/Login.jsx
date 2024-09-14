import { useState } from "react"
import { Link } from "react-router-dom"

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

import { AuthEndpoints } from "@/config/endpoints"

const Login = () => {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)

     const onSubmit = async (data) => {
        try {
            setLoading(true)
            const res = await AuthEndpoints.signIn(data)
            console.log(res)
        } catch(error) {
            throw new Error(error)
        } finally {
           setLoading(false)
        }
     }

    return (
        <> 
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
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Password" {...register("password")} />
                            </div>
                             <Link className="text-sm underline">sign up</Link>
                        </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {/* <Button variant="outline">Cancel</Button> */}
                    <Button size="lg" htmlType="submit" className="w-[100%]" disable={loading}>{loading ? 'loading...': 'Login'}</Button>
                </CardFooter>
                    </form>
            </Card>
        </>
    )
}

export default Login