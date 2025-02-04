const listProducts = require('../../../data.json')
const Product = require('../models/products')

const insertProducts = async (req, res) => {
  try {
    await Product.collection.drop()
    await Product.insertMany(listProducts)
    return res.status(200).json('¡Products insertados en la BBDD!')
  } catch (error) {
    console.log(`Error al hacer el scraping: ${error}`)
    return res.status(400).json('Error al coger los datos de la web')
  }
}
const getListProducts = async (req, res) => {
  try {
    const allProducts = await Product.find()
    return res.status(200).json(allProducts)
  } catch (error) {
    console.log(`Error al localizar el listado de productos: ${error}`)
    return res.status(404).json('No se han encontrado productos')
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { price } = req.body
    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json('Producto NO encontrado')
    }
    const newProduct = await Product.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    )
    return res.status(200).json(newProduct)
  } catch (error) {
    console.log(`Error al actualizar el producto: ${error}`)
    return res.status(400).json('Error al actualizar el producto')
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    return res.status(200).json('Producto eliminado correctamente')
  } catch (error) {
    console.log(`Error al eliminar el producto: ${error}`)

    return res.status(400).json('Error al eliminar el producto')
  }
}

module.exports = {
  insertProducts,
  getListProducts,
  updateProduct,
  deleteProduct
}
