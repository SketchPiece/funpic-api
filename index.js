import express from 'express'
import consola from 'consola'
import path from 'path'
import apiRoutes from './routes/api.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'production') {
  consola.info('Connecting Docs')
  app.use(express.static(path.resolve('docs', 'src', '.vuepress', 'dist')))

  app.get('*', (_, res) => {
    res.sendFile(
      path.resolve(
        path.resolve('docs', 'src', '.vuepress', 'dist', 'index.html')
      )
    )
  })
}

app.use('/api', apiRoutes)

// TODO: add docs
// app.get('/', function (req, res) {
//   res.send(
//     'Добро пожаловать в Sketch-Api!\n/api/quote (принимает аргументы url,username,text)\n/api/trumpet (принимает аргументы urlfirst,urlsecond)\n/api/agree (принимает аргумент url)\n/api/enrages (принимает аргумент url)'
//   )
// })

app.listen(PORT, () => {
  consola.success(`Funpic Api started on port ${PORT}`)
})
