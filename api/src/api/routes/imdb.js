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

module.exports = (app) => {
  app.use('/imdb', route)

  route.get('/', (req, res) => {
    return res.json({ user: "Ola" }).status(200)
  })

  route.get('/upcoming', (req, res) => {
    const url = 'https://data-imdb1.p.rapidapi.com/movie/order/upcoming/'

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
        const one = getDefaultDataImdbOptions(baseUrl + data[0]["imdb_id"] + "/")
        const two = getDefaultDataImdbOptions(baseUrl + data[1]["imdb_id"] + "/")
        const three = getDefaultDataImdbOptions(baseUrl + data[2]["imdb_id"] + "/")

        axios.request(one)
          .then((response) => {
            const data2 = response.data
            // const responseOne = responses[0]
            // const responseTwo = responses[1]
            // const responseThree = responses[2]

            // console.log(responseOne, responseTwo, responseThree)
            return res.json({ data2, data }).status(200)
          })
          .catch(errors => {
            console.error(errors)
          })
      }).catch(err => {
        console.error(err)
      })
  })
}