import fs from 'fs-extra'

class ProductController {
  constructor(file) {
    this.file = file
  }

  async saveProduct(data) {
    const content = await fs.readJSON(this.file)
    const ids = content.map((p) => p.id)
    const newId = Math.max(...ids) + 1
    const timestamp = Date.now()
    const newProduct = { id: newId, timestamp, ...data }
    content.push(newProduct)

    await fs.writeJSON(this.file, content)
    return newProduct
  }

  async getAll() {
    try {
      const content = await fs.readJSON(this.file)
      return content
    } catch (error) {
      console.log(error)
    }
  }

  async getById(id) {
    const content = await fs.readJSON(this.file)
    const product = await content.find((p) => p.id === id)
    if (typeof product === 'undefined') return null

    return product
  }

  async updateById(id, data) {
    const fileContent = await fs.readJSON(this.file)
    const product = fileContent.map((p) => (p.id === id ? { id: p.id, ...data } : p))

    await fs.writeJSON(this.file, product)
  }

  async removeById(id) {
    const content = await fs.readJSON(this.file)
    const newContent = content.filter((p) => p.id !== id)

    await fs.writeJSON(this.file, newContent)
  }
}

class CartController {
  constructor(file) {
    this.file = file
  }

  async saveCart() {
    const content = await fs.readJSON(this.file)
    const ids = content.map((p) => p.id)
    const newId = Math.max(...ids) + 1
    const cart_timestamp = Date.now()

    const newCart = { id: newId, cart_timestamp, products: [] }
    content.push(newCart)

    await fs.writeJSON(this.file, content)

    return newId
  }

  async getCart(id) {
    const content = await fs.readJSON(this.file)
    const cart = content.find((c) => c.id === id)
    if (!cart) return null

    return cart.products
  }

  async removeCart(id) {
    const content = await fs.readJSON(this.file)
    const newContent = content.filter((c) => c.id !== id)

    await fs.writeJSON(this.file, newContent)
  }

  async saveProdInCart(id, data) {
    const content = await fs.readJSON(this.file)

    const cart = content.find((c) => c.id === id)
    cart.products.push(data)

    const contentFiltered = content.filter((c) => c.id !== id)
    contentFiltered.push(cart)

    await fs.writeJSON(this.file, contentFiltered)
  }

  async removeProdInCart(id, id_prod) {
    const content = await fs.readJSON(this.file)
    const cart = content.find((c) => c.id === id)
    if (!cart) return null

    const newProducts = cart.products.filter((p) => p.id !== id_prod)
    cart.products = newProducts

    const contentFiltered = content.filter((c) => c.id !== id)
    contentFiltered.push(cart)

    await fs.writeJSON(this.file, contentFiltered)

    return true
  }
}

export const productController = new ProductController('./model/products.json')
export const cartController = new CartController('./model/cart.json')
