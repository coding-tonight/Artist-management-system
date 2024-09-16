import  { decodeBase64  } from '@/lib/utils'

const useToken = () => {
    const token = localStorage.getItem('_token')
    
    if(!token) return null

    return decodeBase64(token)
}

export default useToken