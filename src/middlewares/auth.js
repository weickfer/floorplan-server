import { ConflictError, UnauthorizedError } from '../infra/errors/4xx.js'
import { safeVerify } from '../lib/jwt.js'

export class AuthMiddleware {
  constructor(projectsRepo) {
    this.projectsRepo = projectsRepo
  }

  async execute(headers) {
    const accessToken = headers['x-access-token']
    
    if (!accessToken) {
      throw new UnauthorizedError('Token não enviado no cabeçalho')
    }

    const decoded = safeVerify(accessToken)

    if (decoded === false || !decoded.projectId) {
      throw new UnauthorizedError('Token invalido')
    }

    const project = await this.projectsRepo.findByExternalId(decoded.projectId)

    if(!project) {
      throw new ConflictError('Não existe nenhum projeto relacionado a esse token')
    }

    return { 
      userId: decoded.sub ?? decoded.userId,
      projectId: project.id,
      roles: decoded.roles,
    }
  }
}