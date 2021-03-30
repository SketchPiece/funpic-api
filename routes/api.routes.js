import { Router } from 'express'
import { sendImg, sendGif } from '../utils.js'
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
  const result = await PicGenerator.quote(url, username, text)
  sendImg(res, result)
})

router.get('/trumpet', async (req, res) => {
  const urlFirst = req.query?.urlfirst
  const urlSecond = req.query?.urlsecond
  if (!urlFirst || !urlSecond)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })

  const result = await PicGenerator.trumpet(urlFirst, urlSecond)
  sendImg(res, result)
})

router.get('/agree', async (req, res) => {
  const url = req.query?.url
  if (!url)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })
  const result = await PicGenerator.agree(url)
  sendImg(res, result)
})

router.get('/enrages', async (req, res) => {
  const url = req.query?.url
  if (!url)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })
  const result = await PicGenerator.enrages(url)
  sendImg(res, result)
})

router.get('/flashbacks', async (req, res) => {
  const url = req.query?.url
  if (!url)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })
  const result = await PicGenerator.flashbacks(url)
  sendImg(res, result)
})

router.get('/error', async (req, res) => {
  const url = req.query?.url
  if (!url)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })
  const result = await PicGenerator.error(url)
  sendImg(res, result)
})

router.get('/rickroll', async (req, res) => {
  const url = req.query?.url
  const frame = req.query?.frame
  if (!url)
    return res
      .status(400)
      .json({ message: 'Not all required arguments received' })
  const result = await PicGenerator.rickroll(url, frame)
  if (!result) res.status(400).json({ message: 'Frames count error!' })
  if (frame) return sendImg(res, result)
  sendGif(res, result)
})

export default router
