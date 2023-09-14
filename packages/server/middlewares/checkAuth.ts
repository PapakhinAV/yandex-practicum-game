import type { RequestHandler } from 'express'
import fetch from 'cross-fetch'


export const checkAuth: RequestHandler = async (req, res, next) => {
  if (req.headers.cookie) {
    fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      headers: {
        Cookie: req.headers.cookie,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.statusText)
      })
      .then(user => {
        res.locals.user = user
        next()
      })
      .catch(next)
  } else {
    next()
  }
}
