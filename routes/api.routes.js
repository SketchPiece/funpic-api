import { Router } from 'express'
import { sendImg } from '../utils.js'
import PicGenerator from '../PicGenerator.js'
const router = Router()

router.get('/quote', async (req, res) => {
  const url = req.query?.url
  const username = req.query?.username
  const text = req.query?.text
  if (!url || !username || !text)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })
  const result = PicGenerator.quote(url, username, text)
  sendImg(res, result)
})

router.get('/trumpet', async (req, res) => {
  const urlFirst = req.query?.urlfirst
  const urlSecond = req.query?.urlsecond
  if (!urlFirst || !urlSecond)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })

  const result = PicGenerator.trumpet(urlFirst, urlSecond)
  sendImg(res, result)
})

router.get('/agree', async (req, res) => {
  const url = req.query?.url
  if (!url)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })
  const result = PicGenerator.agree(url)
  sendImg(res, result)
})

router.get('/enrages', async (req, res) => {
  const url = req.query?.url
  if (!url)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })
  const result = PicGenerator.enrages(url)
  sendImg(res, result)
})

router.get('/flashbacks', async (req, res) => {
  const url = req.query?.url
  if (!url)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })
  const result = PicGenerator.flashbacks(url)
  sendImg(res, result)
})

router.get('/error', async (req, res) => {
  const url = req.query?.url
  if (!url)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })
  const result = PicGenerator.error(url)
  sendImg(res, result)
})

export default router
