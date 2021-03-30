import express from 'express'
import consola from 'consola'
import apiRoutes from './routes/api.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use('/api', apiRoutes)

// TODO: add docs
app.get('/', function (req, res) {
  res.send(
    'Добро пожаловать в Sketch-Api!\n/api/quote (принимает аргументы url,username,text)\n/api/trumpet (принимает аргументы urlfirst,urlsecond)\n/api/agree (принимает аргумент url)\n/api/enrages (принимает аргумент url)'
  )
})

app.listen(PORT, () => {
  consola.success(`Funpic Api started on port ${PORT}`)
})
