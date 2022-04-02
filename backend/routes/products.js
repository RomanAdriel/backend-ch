import express from 'express'
import { productController } from '../controllers/classController.js'

const router = express.Router()

export const ADMIN = true

router.get('/:id?', async (req, res) => {
  const { id } = req.params

  if (typeof id === 'undefined') {
    const fileContent = await productController.getAll()
    return res.json(fileContent)
  }
  

  const fileContent = await productController.getById(Number(id))
  return res.json(fileContent)
})

router.post('/', async (req, res) => {
  if (!ADMIN)
    return res
      .status(401)
      .json({
        error: -1,
        description: `Unauthorized: Route ${req.originalUrl} and method ${req.method}`,
      })
      .end()

  const { body } = req
  const newProduct = await productController.saveProduct(body)

  res.json({ status: 'Product added', newProduct })
})

router.delete('/:id', async (req, res) => {
  if (!ADMIN)
    return res
      .status(401)
      .json({
        error: -1,
        description: `Unauthorized: Route ${req.originalUrl} and method ${req.method}`,
      })
      .end()

  const { id } = req.params
  await productController.removeById(Number(id))

  res.json({ status: 'Product deleted' })
})

router.put('/:id', async (req, res) => {
  if (!ADMIN)
    return res
      .status(401)
      .json({
        error: -1,
        description: `Unauthorized: Route ${req.originalUrl} and method ${req.method}`,
      })
      .end()

  const { id } = req.params
  const { body } = req

  await productController.updateById(Number(id), body)
  res.json({ status: 'Product updated' })
})

export default router
