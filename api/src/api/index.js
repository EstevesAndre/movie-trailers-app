const Router = require('express').Router
const imdb = require('./routes/imdb.js')

// guaranteed to get dependencies
module.exports = () => {
  const app = Router()
  imdb(app)

  return app
}