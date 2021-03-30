import jimp from 'jimp'

jimp.prototype.imposition = function (src, x = 0, y = 0) {
  const clone = this.clone()
  this.blit(src, x, y)
  this.blit(clone, 0, 0)
  return this
}

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
  }

  static async enrages(url) {
    const avatar = await jimp.read(url)
    const agreeFrame = await jimp.read('assets/images/enrages.png')
    avatar.resize(350, 350)
    agreeFrame.imposition(avatar)
    return agreeFrame
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
}
