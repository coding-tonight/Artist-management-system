import React from 'react'
import { usePermission } from '@/hooks'


const Dashboard = () => {
     const { email } = usePermission()
     return (
        <>
        <section className="container mx-auto w-[80%] mt-5">
          <div className='shadow p-4'>
            <h1 className='text-xl'>Welcome, {email} !</h1>
          </div>
        </section>
        </>
     )
}

export default Dashboard