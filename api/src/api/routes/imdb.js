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

module.exports = (app) => {
  app.use('/imdb', route)

  route.get('/', (req, res) => {
    return res.json({ user: "Ola" }).status(200)
  })

  route.get('/popular-movies', (req, res) => {
    const url = 'https://data-imdb1.p.rapidapi.com/movie/order/byPopularity/'

    const offset = parseInt(req.query?.offset) || 0
    const pageSize = 5

    axios.request(getDefaultDataImdbOptions(url))
      .then((response) => {
        const data = response.data["Movie Order By Popularity"]
        const baseUrl = "https://data-imdb1.p.rapidapi.com/movie/id/"

        const movieRequests = []

        for (let i = offset; i < pageSize + offset && i < data.length; i++) {
          movieRequests.push(axios.request(getDefaultDataImdbOptions(getUrl(baseUrl, data[i]["imdb_id"]))))
        }

        axios.all(movieRequests)
          .then(axios.spread((...responses) => {
            return res.json({ movies: responses.map((res => res.data[Object.keys(res.data)[0]])) }).status(200)
          }))
          .catch(errors => {
            console.error(errors)
            return res.json({ message: "Couldn't retrieve data" }).status(404)
          })
      }).catch(err => {
        console.error(err)
        return res.json({ message: "Couldn't retrieve data" }).status(404)
      })
  })

  route.get('/upcoming-movies', (req, res) => {
    const url = 'https://data-imdb1.p.rapidapi.com/movie/order/upcoming/'

    const offset = parseInt(req.query?.offset) || 0
    const pageSize = 5

    axios.request(getDefaultDataImdbOptions(url))
      .then((response) => {
        const data = response.data["Movies Upcoming"]
          .sort((a, b) => {
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
            return res.json({ movies: responses.map((res => res.data[Object.keys(res.data)[0]])) }).status(200)
          }))
          .catch(errors => {
            console.error(errors)
            return res.json({ message: "Couldn't retrieve data" }).status(404)
          })
      }).catch(err => {
        console.error(err)
        return res.json({ message: "Couldn't retrieve data" }).status(404)
      })
  })
}