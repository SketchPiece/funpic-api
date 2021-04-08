import express from 'express'
import consola from 'consola'
import path from 'path'
import apiRoutes from './routes/api.routes.js'
import { imgMiddleware } from './middlewares/img.middleware.js'

const app = express()
const PORT = process.env.PORT || 3000
const LINK = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:'

app.use(imgMiddleware)
app.use('/api', apiRoutes)

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

app.listen(PORT, () => {
  consola.success(`Funpic Api started on port ${LINK}${PORT}`)
})
