import jimp from 'jimp'

export function getJimpBuffer(img) {
  return new Promise((resolve, reject) => {
    img.getBuffer(jimp.AUTO, (error, buffer) => {
      if (error) return reject(error)
      resolve(buffer)
    })
  })
}
