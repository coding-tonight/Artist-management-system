import { useState, useEffect } from "react"

const handleFetch = (handleRequest, id = null, page = 1) => {
   const [data, setData] = useState({})
   const [loading, setLoading] = useState(false)
   const [errors, setError] = useState(null)
   const [refresh, setRefresh] = useState({})
   const [isSuccess, setSuccess] = useState(false)

   const shouldRefresh = () => setRefresh({})

   useEffect(() => {

    (async () => {
        try {
            setLoading(true)
           const res = await handleRequest(page, id)
            setSuccess(true)
            setData(res.data)
        } catch(error) {
            setError(error)
            throw new Error(error)
        } finally {
           setLoading(false)
        }
    })()

   }, [page, refresh])

   return { data, isSuccess, loading, errors, shouldRefresh }
}

export const useFetch = (handleRequest , id, page) => {
   const { data, isSuccess,  loading , errors, shouldRefresh } = handleFetch(handleRequest, id, page)
   return { data, isSuccess,  loading, errors, shouldRefresh }
}