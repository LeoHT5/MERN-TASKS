import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export function createAccesToken (payload) {
  // resolve, si todo va bien
  // reject, si ocurre algun error
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: '1d'
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}
