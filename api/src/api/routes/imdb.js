const route = require('express').Router()
const axios = require('axios').default

const getDefaultDataImdbOptions = (url) => {
  return {
    method: 'GET',
    url,
    headers: {
      'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
      'x-rapidapi-key': 'dc6f2d8942mshff880fc80e812acp13a7b6jsn2f82bdb98723'
    }
  }
}

const getUrl = (baseUrl, imdb_id) => {
  return baseUrl + imdb_id + "/"
}

const requestDefaultInformation = (res, url, key, offset, orderByReleaseDate = false, pageSize = 5) => {
  axios.request(getDefaultDataImdbOptions(url))
    .then((response) => {
      var data = response.data[key]

      if (orderByReleaseDate)
        data.sort((a, b) => {
          const da = new Date(a.release), db = new Date(b.release)
          if (da > db) return 1
          if (da < db) return -1
          return 0
        })

      const baseUrl = "https://data-imdb1.p.rapidapi.com/movie/id/"

      const movieRequests = []

      for (let i = offset; i < pageSize + offset && i < data.length; i++) {
        movieRequests.push(axios.request(getDefaultDataImdbOptions(getUrl(baseUrl, data[i]["imdb_id"]))))
      }

      axios.all(movieRequests)
        .then(axios.spread((...responses) => {
          return res.json({
            movies: responses.map(res => {
              const item = res.data[Object.keys(res.data)[0]]

              return {
                imdb_id: item.imdb_id,
                title: item.title,
                year: item.year,
                image_url: item.image_url,
                release: item.release,
                banner: item.banner,
                gen: item.gen,
                rating: item.rating
              }
            })
          }).status(200)
        }))
        .catch(errors => {
          console.error(errors)
          return res.json({ message: "Couldn't retrieve data" }).status(404)
        })
    }).catch(err => {
      console.error(err)
      return res.json({ message: "Couldn't retrieve data" }).status(404)
    })
}

module.exports = (app) => {
  app.use('/imdb', route)

  route.get('/', (req, res) => {
    return res.json({ user: "Ola" }).status(200)
  })

  route.get('/popular-movies', (req, res) => {
    requestDefaultInformation(
      res,
      'https://data-imdb1.p.rapidapi.com/movie/order/byPopularity/',
      "Movie Order By Popularity",
      parseInt(req.query?.offset) || 0
    )
  })

  route.get('/upcoming-movies', (req, res) => {
    requestDefaultInformation(
      res,
      'https://data-imdb1.p.rapidapi.com/movie/order/upcoming/',
      "Movies Upcoming",
      parseInt(req.query?.offset) || 0,
      true
    )
  })

  route.get('/top-rated-movies', (req, res) => {
    requestDefaultInformation(
      res,
      'https://data-imdb1.p.rapidapi.com/movie/order/byRating/',
      "Movie Order By Rating",
      parseInt(req.query?.offset) || 0,
      false,
      8
    )
  })


  route.get('/search-by-title', (req, res) => {
    const search = req.query?.search || ''

    if (search === '') return res.json({ message: "No Search label given" }).status(400)

    requestDefaultInformation(
      res,
      `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${encodeURIComponent(search)}/`,
      "Result",
      parseInt(req.query?.offset) || 0,
      false,
      6
    )
  })


}