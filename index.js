require('dotenv').config()

const express = require('express')

const cors = require('cors')
const route = require('./Routing/route')

const PFServer = express()
require('./DB/DBConnect')

PFServer.use(cors())
PFServer.use(express.json())
PFServer.use(route)
PFServer.use('/upload',express.static('./uploads'))
const PORT = 3000

PFServer.listen(PORT, () => {
    console.log(`server started at ${PORT}`)
})
PFServer.get('/', (req, res) => {
    res.status(200).send('<h1>hi</h1>')
})