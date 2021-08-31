require('dotenv').config() // To run locally

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 5000,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',

    imdbRapidApiHost: process.env.IMDB_RAPID_API_HOST,

    imdbRapidApiKey: process.env.IMDB_RAPID_API_KEY,

    imdbApiKey: process.env.IMDB_API_KEY,

    youTubeDataApi_v3: process.env.YOUTUBE_API_KEY
  }
}