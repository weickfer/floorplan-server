import jwt from 'jsonwebtoken'
import { readFileSync } from 'node:fs'

const user = {
  sub: 'weickfer',
  projectId: '457823',
  roles: []
}

const admin = {
  sub: 'admin',
  projectId: '457823',
  roles: ['admin']
}

const server = {
  sub: 'server',
  roles: ['service']
}

const cintia = {
  sub: 'cintia',
  projectId: '457823',
  roles: []
}

const privateKey = readFileSync('./private.key')
// const publicKey = readFileSync('./public.key')

function createToken(data) {
  return jwt.sign(data, privateKey, { algorithm: 'RS256', expiresIn: '1d' })
}

[user, admin, server, cintia].map(data => ({
  token: createToken(data),
  sub: data.sub,
})).forEach(data => {
  console.log(data.sub, data.token)
  console.log()
})
