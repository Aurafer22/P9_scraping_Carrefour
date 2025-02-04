const {
  insertProducts,
  getListProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/products')

const productsRoute = require('express').Router()

productsRoute.post('/insert_products', insertProducts)
productsRoute.get('/', getListProducts)
productsRoute.put('/:id', updateProduct)
productsRoute.delete('/:id', deleteProduct)

module.exports = productsRoute
