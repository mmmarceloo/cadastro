const express = require ('express')
const rotas = require('./rotas')
const cors = require('cors')

const app = express()
const corsOpts = {
    origin: '*'
}

app.use(cors(corsOpts))
app.use(express.json())


app.use(rotas)

app.listen(3030)