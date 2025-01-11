export const adaptMiddleware = (middleware) => {
  return async (req, response, next) => {
    try {
      const httpResponse = await middleware.execute(req.headers ?? {}, req.body)

      if(httpResponse === true) {
        return next()
      }
      
      Object.assign(req, httpResponse)
     
      return next()
    } catch (error) {
      next(error)
    }
  }
}