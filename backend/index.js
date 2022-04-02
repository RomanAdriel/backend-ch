import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import productsRouter from './routes/products.js'
import cartRouter from './routes/cart.js'

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartRouter)

app.all('*', (req, res) => {
  res.status(501).json({ error: -2, descripcion: `Not implemented: Route ${req.originalUrl}, method ${req.method}` })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
