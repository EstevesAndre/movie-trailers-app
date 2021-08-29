const route = require('express').Router()
const axios = require('axios').default
const apiKey = require('../../config/index.js').api.imdbApiKey

const getRequestImdbApiOptions = (imdb_id) => {
  return {
    method: 'GET',
    url: `https://imdb-api.com/en/API/Title/${apiKey}/${imdb_id}/FullActor,Posters,Images,Trailer,Ratings,`,
    headers: {
      'x-rapidapi-host': 'imdb-api1.p.rapidapi.com',
      'x-rapidapi-key': 'dc6f2d8942mshff880fc80e812acp13a7b6jsn2f82bdb98723'
    }
  }
}

module.exports = (app) => {
  app.use('/imdb-api', route)

  route.get('/movie-information', (req, res) => {
    const imdb_id = req.query?.imdb_id || ''

    if (imdb_id === '') return res.json({ message: "No ID given" }).status(400)

    axios.request(getRequestImdbApiOptions(imdb_id))
      .then((response) => {
        const data = response.data

        if (data?.title === null) throw new Error(data?.errorMessage)

        const filteredData = {
          title: data?.title,
          year: data?.year,
          runtimeStr: data?.runtimeStr,
          releaseDate: data?.releaseDate,
          plot: data?.plot,
          awards: data?.awards,
          directors: data?.directors,
          writers: data?.writers,
          actorList: data?.actorList?.slice(0, 6),
          genres: data?.genreList?.map(v => v.value),
          imDbRating: data?.imDbRating,
          backdrop: data?.posters?.backdrops[0].link || null,
          images: data?.images?.items?.slice(0, 6),
          similars: data?.similars?.slice(0, 6)
        }

        return res.json({ info: filteredData }).status(200)
      }).catch(err => {
        console.error(err)
        res.status(404).send({ error: `Couldn't retrieve data. ${err}` })
      })
  })
}