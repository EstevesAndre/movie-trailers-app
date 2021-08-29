const express = require('express')
const config = require('./config/index.js')
const expressLoader = require('./express')

// Accessing the path module
const path = require("path")

async function startServer() {
  const app = express()

  await expressLoader({ app: app })

  // Step 1:
  app.use(express.static(path.resolve(__dirname, "./client/build")))
  // Step 2:
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
  })

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