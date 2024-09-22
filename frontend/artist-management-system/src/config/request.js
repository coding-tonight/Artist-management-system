
import { toast } from 'sonner'

export const handleDelete = async (handleRequest, id, setLoading, refresh) => {
    try {
        setLoading(true)
        const res = await handleRequest(id)
        toast.success(res.data.message ?? 'success')
        refresh()
    } catch(error) {
        toast.success('Ops something went wrong')
        throw new Error(error)
    } finally {
        setLoading(false)
    }
}