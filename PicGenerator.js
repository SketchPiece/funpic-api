import jimp from 'jimp'
import { GifUtil, GifFrame, GifCodec } from 'gifwrap'

jimp.prototype.imposition = function (src, x = 0, y = 0) {
  const clone = this.clone()
  this.blit(src, x, y)
  this.blit(clone, 0, 0)
  return this
}

const gifCodec = new GifCodec()

export default class PicGenerator {
  static async quote(url, username, text) {
    const avatar = await jimp.read(url)
    const quoteFrame = await jimp.read('assets/images/quote.png')
    const quoteAuthorFont = await jimp.loadFont(
      'assets/fonts/quoteAuthor/quoteAuthor.fnt'
    )
    const quoteFont = await jimp.loadFont('assets/fonts/quote/quote.fnt')

    avatar.resize(210, 210)
    quoteFrame
      .imposition(avatar, 375, 80)
      .print(quoteAuthorFont, 0, 300, { text: `© ${username}` })
      .print(
        quoteFont,
        0,
        130,
        {
          text,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        },
        380,
        100
      )
    return quoteFrame
  }

  static async trumpet(urlFirst, urlSecond) {
    const avatarFirst = await jimp.read(urlFirst)
    const avatarSecond = await jimp.read(urlSecond)
    const trumpet = await jimp.read('assets/images/trumpet.png')
    avatarFirst.resize(95, 95)
    avatarSecond.resize(95, 95)
    trumpet.imposition(avatarFirst, 390, 95).imposition(avatarSecond, 80, 95)
    return trumpet
  }

  static async agree(url) {
    const avatar = await jimp.read(url)
    const agreeFrame = await jimp.read('assets/images/agree.png')
    avatar.resize(650, 650)
    agreeFrame.imposition(avatar, 55, -50)
    return agreeFrame
  }

  static async enrages(url) {
    const avatar = await jimp.read(url)
    const enragesFrame = await jimp.read('assets/images/enrages.png')
    avatar.resize(350, 350)
    enragesFrame.imposition(avatar)
    return enragesFrame
  }

  static async flashbacks(url) {
    const avatar = await jimp.read(url)
    const flashback = await jimp.read('assets/images/flash.jpg')
    avatar.resize(1024, 1024)
    flashback.resize(1024, 1024)
    avatar.opacity(0.8)
    flashback.blit(avatar, 0, 0)
    flashback.greyscale()
    return flashback
  }

  static async error(url) {
    const avatar = await jimp.read(url)
    const errorImg = await jimp.read('assets/images/error.png')
    avatar.resize(1024, 1024)
    errorImg.resize(1024, 1024)
    avatar.opacity(0.3)
    errorImg.blit(avatar, 0, 0)
    return errorImg
  }

  static async demotivator(url, args) {
    const avatar = await jimp.read(url)
    const demotivatorFrame = await jimp.read('assets/images/demotivator.png')
    const demotivatorWmFrame = await jimp.read(
      'assets/images/demotivator-wm.png'
    )
    const demotivatorFont = await jimp.loadFont(
      'assets/fonts/demotivator/demotivator.fnt'
    )
    const demotivatorSmallFont = await jimp.loadFont(
      'assets/fonts/demotivatorSmall/demotivator-small.fnt'
    )
    avatar.resize(460, 480)
    const dfClone = demotivatorFrame.clone()

    let result = dfClone.imposition(avatar, 20, 20).clone()

    for (const [i, text] of Object.entries(args)) {
      const demotivatorFrameClone = demotivatorFrame.clone()
      const isBig = text.length >= 14

      const textArgs = [
        isBig ? demotivatorSmallFont : demotivatorFont,
        0,
        470,
        {
          text,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        },
        isBig ? 500 - text.length * 2 : 510 - text.length * 5,
        120
      ]

      if (i <= 0) {
        demotivatorFrameClone.imposition(avatar, 20, 20).print(...textArgs)
        result = demotivatorFrameClone.clone()
        continue
      }
      result.resize(460, 480)

      demotivatorFrameClone.imposition(result, 20, 20).print(...textArgs)
      result = demotivatorFrameClone.clone()
    }

    return result
  }

  static async rickroll(url, frame) {
    const gif = await GifUtil.read('assets/images/rickroll.gif')
    const avatar = await jimp.read(url)
    const mask = await jimp.read('assets/images/circle-mask.png')
    avatar.resize(256, 256)
    mask.resize(256, 256)
    avatar.mask(mask, 0, 0)
    avatar.resize(80, 80)

    const editedFrames = gif.frames.reduce((acc, frame, i) => {
      const edit = GifUtil.shareAsJimp(jimp, frame)
      const pos = rickrollAvatarCoords[i]
      const x = pos?.[0] || 0
      const y = pos?.[1] || 0

      edit.blit(avatar, x, y).greyscale()
      acc.push(new GifFrame(edit.bitmap))
      return acc
    }, [])

    if (frame) {
      if (editedFrames.length <= frame || frame < 0) return null
      const copy = GifUtil.copyAsJimp(jimp, editedFrames[frame])
      return copy
    }
    const editedGif = await gifCodec.encodeGif(editedFrames)
    return editedGif.buffer
  }
}

const rickrollAvatarCoords = [
  [195, 80],
  [210, 70],
  [225, 45],
  [225, 40],
  [225, 40],
  [225, 40],
  [215, 50],
  [215, 50],
  [200, 60],
  [193, 60],
  [193, 60],
  [180, 75],
  [180, 75],
  [180, 85],
  [175, 85],
  [175, 85],
  [175, 85],
  [170, 60],
  [170, 60],
  [170, 50],
  [170, 50],
  [170, 50],
  [170, 50],
  [170, 50],
  [170, 50],
  [160, 55],
  [160, 65],
  [160, 70],
  [166, 80],
  [166, 85],
  [180, 90],
  [190, 85]
]
