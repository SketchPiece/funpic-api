var express = require('express')

var app = express()
var jimp = require('jimp')
var fs = require('fs')

const Buffer = require('buffer').Buffer

const port = process.env.PORT || 3000

function kitcut(text, limit) {
  text = text.trim()
  if (text.length <= limit) return text

  text = text.slice(0, limit)

  return text.trim() + '...'
}

function sendImg(req, res, image) {
  try {
    image.getBuffer(jimp.AUTO, (error, buffer) => {
      res.header('Content-Type', 'image/png')
      return res.status(200).send(new Buffer(buffer, 'base64'))
    })
  } catch (err) {
    res.send('Произошла какая то ошибочка')
    console.log(err)
  }
}

app.get('/', function (req, res) {
  res.send(
    'Добро пожаловать в Sketch-Api!\n/api/quote (принимает аргументы url,username,text)\n/api/trumpet (принимает аргументы urlfirst,urlsecond)\n/api/agree (принимает аргумент url)\n/api/enrages (принимает аргумент url)'
  )
})

app.get('/api', (req, res) => {})

app.get('/api/text', (req, res) => {})

app.get('/api/quote', (req, res) => {
  if (req.query && req.query.url && req.query.username && req.query.text) {
    // Returns the value of 'first' in the console.
    //console.log(req.query.url);
    var url = req.query.url
    var username = req.query.username
    var text = req.query.text
    //console.log(text);

    jimp.read(url).then(image1 => {
      jimp.read('includes/quote.png').then(image2 => {
        image1.resize(210, 210)
        image2.blit(image1, 380, 80)
        jimp.read('includes/quote.png').then(image3 => {
          image2.blit(image3, 0, 0)
          jimp.loadFont('includes/quoteAuthor.fnt').then(font => {
            image2.print(font, 0, 300, { text: '© ' + username })
            jimp.loadFont('includes/quote.fnt').then(font => {
              image2.print(
                font,
                0,
                130,
                {
                  text: text,
                  alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                  alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
                },
                380,
                100
              )
              sendImg(req, res, image2)
            })
          })
        })
      })
    })
  } else {
    // Returns a status 400 if the query parameter 'first' isn't specified.
    res
      .status(400)
      .json({ message: 'Ошибка! Вы не вписали все аргументы!', status: 400 })
  }
})

app.get('/api/trumpet', function (req, res) {
  if (req.query && req.query.urlfirst && req.query.urlsecond) {
    // Returns the value of 'first' in the console.
    //console.log(req.query.url);
    var url1 = req.query.urlfirst
    var url2 = req.query.urlsecond
    jimp.read(url1).then(imageurl1 => {
      jimp.read(url2).then(imageurl2 => {
        jimp.read('includes/trumpet.png').then(trumpImg1 => {
          imageurl1.resize(95, 95)
          imageurl2.resize(95, 95)
          trumpImg1.blit(imageurl1, 390, 95)
          trumpImg1.blit(imageurl2, 80, 95)
          jimp.read('includes/trumpet.png').then(trumpImg2 => {
            trumpImg1.blit(trumpImg2, 0, 0)
            sendImg(req, res, trumpImg1)
          })
        })
      })
    })
  } else {
    // Returns a status 400 if the query parameter 'first' isn't specified.
    res
      .status(400)
      .json({ message: 'Ошибка! Вы не вписали все аргументы!', status: 400 })
  }
})

app.get('/api/agree', function (req, res) {
  if (req.query && req.query.url) {
    // Returns the value of 'first' in the console.
    //console.log(req.query.url);
    var url = req.query.url

    jimp.read(url).then(imageurl => {
      jimp.read('includes/agree.png').then(Img1 => {
        imageurl.resize(650, 650)

        Img1.blit(imageurl, 55, -50)
        jimp.read('includes/agree.png').then(Img2 => {
          Img1.blit(Img2, 0, 0)
          sendImg(req, res, Img1)
        })
      })
    })
  } else {
    // Returns a status 400 if the query parameter 'first' isn't specified.
    res
      .status(400)
      .json({ message: 'Ошибка! Вы не вписали все аргументы!', status: 400 })
  }
})

app.get('/api/enrages', function (req, res) {
  if (req.query && req.query.url) {
    // Returns the value of 'first' in the console.
    //console.log(req.query.url);
    var url = req.query.url

    jimp.read(url).then(imageurl => {
      jimp.read('includes/enrages.png').then(Img1 => {
        imageurl.resize(350, 350)

        Img1.blit(imageurl, 0, 0)
        jimp.read('includes/enrages.png').then(Img2 => {
          Img1.blit(Img2, 0, 0)
          sendImg(req, res, Img1)
        })
      })
    })
  } else {
    // Returns a status 400 if the query parameter 'first' isn't specified.
    res
      .status(400)
      .json({ message: 'Ошибка! Вы не вписали все аргументы!', status: 400 })
  }
})

app.get('/api/rozum-api', function (req, res) {
  if (req.query && req.query.word && req.query.translation) {
    // Returns the value of 'first' in the console.
    //console.log(req.query.url);
    var word = req.query.word
    var translation = req.query.translation

    jimp.read('includes/rozum-api/RozumCard.png').then(image => {
      jimp.loadFont('includes/rozum-api/rozumFontNew.fnt').then(font => {
        image.print(
          font,
          0,
          75,
          {
            text: word,
            alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
          },
          530,
          100
        )
        image.print(
          font,
          0,
          380,
          {
            text: translation,
            alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
          },
          530,
          100
        )
        sendImg(req, res, image)
      })
    })
  } else {
    // Returns a status 400 if the query parameter 'first' isn't specified.
    res
      .status(400)
      .json({ message: 'Ошибка! Вы не вписали все аргументы!', status: 400 })
  }
})

app.get('/api/flashbacks', function (req, res) {
  if (req.query && req.query.url) {
    // Returns the value of 'first' in the console.
    //console.log(req.query.url);
    var url = req.query.url

    jimp.read(url).then(imageUrl => {
      jimp.read('includes/flash.jpg').then(imageFlash => {
        imageUrl.resize(1024, 1024)

        imageFlash.resize(1024, 1024)

        imageUrl.opacity(0.6)
        imageFlash.blit(imageUrl, 0, 0)
        imageFlash.greyscale()

        sendImg(req, res, imageFlash)
      })
    })
  } else {
    // Returns a status 400 if the query parameter 'first' isn't specified.
    res
      .status(400)
      .json({ message: 'Ошибка! Вы не вписали все аргументы!', status: 400 })
  }
})
//flashbacks

app.get('/api/news', (req, res) => {
  if (req.query && req.query.url && req.query.text) {
    // Returns the value of 'first' in the console.
    //console.log(req.query.url);
    var url = req.query.url
    var text = req.query.text //66
    //console.log(text);
    var text = kitcut(text, 63)

    jimp.read(url).then(imageUrl => {
      jimp.read('includes/newsImg.png').then(imageNews => {
        imageUrl.resize(540, 540)
        imageNews.blit(imageUrl, 0, 0)
        jimp.read('includes/newsImg.png').then(imageNews2 => {
          imageNews.blit(imageNews2, 0, 0)
          jimp.loadFont('includes/newsFontFix2.fnt').then(font => {
            imageNews.print(
              font,
              20,
              390,
              {
                text: text,
                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
              },
              500,
              80
            )
            jimp.loadFont('includes/timeFontFix.fnt').then(fontTime => {
              var date = new Date()
              var hours, minutes
              if (date.getHours().length == 1) {
                hours = '0' + date.getHours()
              } else {
                hours = date.getHours()
              }
              if (date.getMinutes().length == 1) {
                minutes = '0' + date.getMinutes()
              } else {
                minutes = date.getMinutes()
              }
              imageNews.print(fontTime, 15, 472, hours + ':' + minutes)

              //console.log(date.getHours()+":"+date.getMinutes());
              sendImg(req, res, imageNews)
            })
          })
        })
      })
    })
  } else {
    // Returns a status 400 if the query parameter 'first' isn't specified.
    res
      .status(400)
      .json({ message: 'Ошибка! Вы не вписали все аргументы!', status: 400 })
  }
})

app.get('/api/error', function (req, res) {
  if (req.query && req.query.url) {
    // Returns the value of 'first' in the console.
    //console.log(req.query.url);
    var url = req.query.url

    jimp.read(url).then(imageUrl => {
      jimp.read('includes/error.png').then(imageErr => {
        imageUrl.resize(1024, 1024)

        imageErr.resize(1024, 1024)

        imageUrl.opacity(0.3)
        imageErr.blit(imageUrl, 0, 0)

        sendImg(req, res, imageErr)
      })
    })
  } else {
    // Returns a status 400 if the query parameter 'first' isn't specified.
    res
      .status(400)
      .json({ message: 'Ошибка! Вы не вписали все аргументы!', status: 400 })
  }
})

app.listen(port, function () {
  console.log('Api app started')
})
