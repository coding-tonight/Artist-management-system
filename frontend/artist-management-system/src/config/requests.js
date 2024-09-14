const handlePost = async (handleRequest, data, callback) => {
    try {
        callback()
        const res = await handleRequest(data)
        return res
    } catch (error){
       throw new Error(error)
    } finally {
        callback()
    }
}

export { handlePost }