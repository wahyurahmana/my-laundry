require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const errHandler = require('./helpers/errHandler.js')
const routes = require('./routes/index.js')

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(routes)
app.use(errHandler)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})