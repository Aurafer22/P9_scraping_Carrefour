const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
  {
    img: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true }
  },
  {
    timestamps: true,
    collection: 'products'
  }
)

const Product = mongoose.model('products', productSchema, 'products')
module.exports = Product
