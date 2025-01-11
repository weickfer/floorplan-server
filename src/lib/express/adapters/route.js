export function adaptRoute(useCase) {
  return async (req, res, next) => {
    try {
      const request = {
        ...req.body,
        ...req.params,
        ...req.query,
        userId: req.userId,
        projectId: req.projectId,
        roles: req.roles,
      }

      const httpResponse = await useCase.execute(request);

      return res.status(httpResponse.statusCode).json({
        status: 'success',
        data: httpResponse.body,
      });
    } catch (error) {
      next(error)
    }
  }
}