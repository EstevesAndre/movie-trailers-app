const express = require('express')
const config = require('./config/index.js')
const expressLoader = require('./express')

var app = express()

async function startServer() {
  const app = express()

  await expressLoader({ app: app })

  app.listen(config.port, () => {
    console.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `)
  }).on('error', err => {
    console.error(err)
    process.exit(1)
  })

}

startServer()