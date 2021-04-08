import consola from 'consola'
import { getJimpBuffer } from '../utils.js'

export function imgMiddleware(_, res, next) {
  res.sendJimpImage = sendJimpImage.bind(res)
  res.sendGif = sendGif.bind(res)
  next()
}

async function sendJimpImage(image) {
  try {
    const buffer = await getJimpBuffer(image)
    this.header('Content-Type', 'image/png')
    return this.status(200).send(Buffer.from(buffer, 'base64'))
  } catch (err) {
    this.status(500).json({ message: 'Server error' })
    consola.error(err)
  }
}

function sendGif(buffer) {
  try {
    this.header('Content-Type', 'image/gif')
    return res.status(200).send(Buffer.from(buffer, 'base64'))
  } catch (err) {
    this.status(500).json({ message: 'Server error' })
    consola.error(err)
  }
}
