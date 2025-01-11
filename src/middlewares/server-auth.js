import { UnauthorizedError } from '../infra/errors/4xx.js'
import { safeVerify } from '../lib/jwt.js'

export class ServerAuthMiddleware {
  async execute(headers) {
    const accessToken = headers['x-platform-token']

    if (!accessToken) {
      throw new UnauthorizedError('Token não enviado no cabeçalho')
    }

    const decoded = safeVerify(accessToken)

    if (decoded === false) {
      throw new UnauthorizedError('Token invalido')
    }

    if(!decoded.roles.includes('service')) {
      throw new UnauthorizedError('Acesso negado')
    }

    return true
  }
}