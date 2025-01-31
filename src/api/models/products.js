const mongoose = require('mongoose')
const { type } = require('os')
const productSchema = new mongoose.Schema(
  {
    img: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: false, trim: true }
  },
  {
    timestamps: true,
    collection: 'products'
  }
)

const Product = mongoose.model('products', productSchema, 'products')
module.exports = Product
