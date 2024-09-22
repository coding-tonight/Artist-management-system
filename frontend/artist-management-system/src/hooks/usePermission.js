const usePermission = () => {
    try {
        const data = localStorage.getItem('_info')
        
        if (!data) return null
        const decodeData = atob(data)
        return JSON.parse(decodeData)
    } catch {
       return {
         email: null,
         role: null,
       }
    }
}

export default usePermission