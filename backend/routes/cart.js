import express from 'express'
import { cartController } from '../controllers/classController.js'

const router = express.Router()

router.get('/:id/productos', async (req, res) => {
  const { id } = req.params
  const products = await cartController.getCart(Number(id))
  products ? res.json({ products }) : res.status(404).json({ status: 'Cart not found' })
})


router.post('/', async (req, res) => {
  const result = await cartController.saveCart()
  res.json({ id_cart: result })
})

router.post('/:id/productos', async (req, res) => {
  const { id } = req.params
  const { body } = req
  await cartController.saveProdInCart(Number(id), body)
  res.json({ status: 'Product added to the cart' })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await cartController.removeCart(Number(id))
  res.json({ status: 'Cart deleted' })
})

router.delete('/:id/productos/:id_prod', async (req, res) => {
  const { id, id_prod } = req.params
  const result = await cartController.removeProdInCart(Number(id), Number(id_prod))

  if (!result) return res.status(404).json({ status: 'Product id not found' })

  res.json({ status: 'Product removed from cart' })
})

export default router
