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

app.listen(PORT, () => {
  consola.success(`Funpic Api started on port ${PORT}`)
})
