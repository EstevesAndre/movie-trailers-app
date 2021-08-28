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

const checkIncludes = (arr1 = [], arr2 = []) => {
  if (arr2 === '') return true

  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      return true
    }
  }

  return false
}

const checkInterval = (value, arrIntervals) => {
  if (arrIntervals === '') return true

  for (let i = 0; i < arrIntervals.length; i++) {
    if (value >= arrIntervals[i][0] && value <= arrIntervals[i][1])
      return true
  }

  return false
}

const checkFilters = (item, filters) => {
  // Check genres
  if (!checkIncludes(item.gen.map(v => v.genre), filters.genres)) return false

  // check content ratings
  if (item.content_rating != "Unrated" && !checkIncludes(item.content_rating, filters.contentRatings)) return false

  // check ratings
  if (item.rating < filters.ratings) return false

  // check years
  if (!checkInterval(item.year, filters.years)) return false

  console.log("Valid")
  return true
}

const requestDefaultInformation = async (res, url, key, offset, orderByReleaseDate = false, pageSize = 5, filters = { ratings: '', genres: '', contentRatings: '', years: '' }) => {

  const response = await axios.request(getDefaultDataImdbOptions(url))

  var data = response.data[key]

  if (orderByReleaseDate)
    data.sort((a, b) => {
      const da = new Date(a.release), db = new Date(b.release)
      if (da > db) return 1
      if (da < db) return -1
      return 0
    })

  const baseUrl = "https://data-imdb1.p.rapidapi.com/movie/id/"
  console.log("Results", data.length)
  var currentValidResults = 0
  var requestIndex = 0
  const resultData = []

  do {
    const movieRequests = []

    for (let i = offset + requestIndex; i < pageSize + offset + requestIndex && i < data.length; i++) {
      movieRequests.push(axios.request(getDefaultDataImdbOptions(getUrl(baseUrl, data[i]["imdb_id"]))))
    }

    const responses = await axios.all(movieRequests)

    responses.forEach(res => {
      if (currentValidResults < pageSize) {
        const item = res.data[Object.keys(res.data)[0]]

        const valid = checkFilters(item, filters)

        if (valid && currentValidResults < pageSize) {
          currentValidResults += 1

          resultData.push({
            imdb_id: item.imdb_id,
            title: item.title,
            year: item.year,
            image_url: item.image_url,
            content_rating: item.content_rating,
            release: item.release,
            banner: item.banner,
            gen: item.gen,
            rating: item.rating
          })
        }
      }
    })

    requestIndex += pageSize
    console.log(requestIndex, data.length, currentValidResults, pageSize)

  } while (requestIndex < data.length && currentValidResults < pageSize)

  return res.json({ movies: resultData }).status(200)
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


  route.get('/search-by-title', async (req, res) => {
    const search = req.query?.search || ''
    const ratings = req.query?.ratings ? JSON.parse(req.query?.ratings) : ''
    const genres = req.query?.ratings ? JSON.parse(req.query?.genres) : ''
    const years = req.query?.ratings ? JSON.parse(req.query?.years) : ''
    const contentRatings = req.query?.ratings ? JSON.parse(req.query?.contentRatings) : ''

    if (search === '') return res.json({ message: "No Search label given" }).status(400)

    await requestDefaultInformation(
      res,
      `https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/${encodeURIComponent(search)}/`,
      "Result",
      parseInt(req.query?.offset) || 0,
      false,
      8,
      { ratings, genres, years, contentRatings }
    )
  })
}