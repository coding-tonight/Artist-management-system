import React from 'react'

import { TriangleAlert } from 'lucide-react'

const NoPermission = () => {
     return (
        <>
        <section className="container mx-auto w-[80%] mt-5">
          <div className='shadow p-4'>
            <h1 className='text-xl flex items-center gap-2'>
                <TriangleAlert className='text-red-500' />
                Ops, You have permission to perform this action!
            </h1>
          </div>
        </section>
        </>
     )
}

export default NoPermission