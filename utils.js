import consola from 'consola'
import jimp from 'jimp'

function getJimpBuffer(img) {
  return new Promise((resolve, reject) => {
    img.getBuffer(jimp.AUTO, (error, buffer) => {
      if (error) return reject(error)
      resolve(buffer)
    })
  })
}

export function kitcut(text, limit) {
  text = text.trim()
  if (text.length <= limit) return text
  text = text.slice(0, limit)
  return text.trim() + '...'
}

export async function sendImg(res, image) {
  try {
    const buffer = await getJimpBuffer(image)
    res.header('Content-Type', 'image/png')
    return res.status(200).send(Buffer.from(buffer, 'base64'))
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
    consola.error(err)
  }
}

export function sendGif(res, image) {
  try {
    const buffer = getJimpBuffer(image)
    res.header('Content-Type', 'image/gif')
    return res.status(200).send(Buffer.from(buffer, 'base64'))
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
    consola.error(err)
  }
}
