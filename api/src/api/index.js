const Router = require('express').Router
const imdb = require('./routes/imdb.js')
const imdbApi = require('./routes/imdbApi.js')
const youtubeApi = require('./routes/youtubeApi.js')

// guaranteed to get dependencies
module.exports = () => {
  const app = Router()
  imdb(app)
  imdbApi(app)
  youtubeApi(app)

  return app
}