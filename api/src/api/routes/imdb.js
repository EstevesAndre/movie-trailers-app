const route = require('express').Router()

module.exports = (app) => {
  app.use('/imdb', route)

  route.get('/', (req, res) => {
    return res.json({ user: "Ola" }).status(200)
  })
}