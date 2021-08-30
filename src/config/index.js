// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 8000,

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

    imdbApiKey: process.env.IMDB_API_KEY,

    youTubeDataApi_v3: process.env.YOUTUBE_API_KEY
  }
}