import React, { useState } from "react"

import SongForm from "./Form/SongForm"


const SongCreate = () => {
     return (
        <section className="container mx-auto w-[80%] mt-5">
          <SongForm onSubmit={() => {}} />
        </section>
     )
}

export  default SongCreate