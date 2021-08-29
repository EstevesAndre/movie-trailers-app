const route = require('express').Router()
const axios = require('axios').default
const apiKey = require('../../config/index.js').api.youTubeDataApi_v3

const { google } = require('googleapis')

const youtube = google.youtube({
  version: 'v3',
  auth: apiKey
})

module.exports = (app) => {
  app.use('/youtube', route)

  route.get('/movie-trailers', async (req, res) => {
    const movie = req.query?.movie || ''

    if (movie === '') return res.json({ message: "No Movie label given" }).status(400)

    youtube.search
      .list({
        part: 'id,snippet',
        q: `${movie} Trailers`,
        maxResults: 4,
      }).then((response) => {
        const data = response.data

        const filteredData = data.items.map(item => {
          return {
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.high.url,
            title: item.snippet.title
          }
        })

        return res.json({ urls: filteredData }).status(200)
      }).catch(err => {
        console.error(err)
        return res.json({ message: "Couldn't retrieve data" }).status(404)
      })
  })
}