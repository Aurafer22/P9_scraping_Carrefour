require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const productsRoute = require('./src/api/routes/products')
const app = express()

connectDB()
app.use(express.json())
app.use('/api/v1/products', productsRoute)
app.use('*', () => {
  console.log('Route not found')
})

app.listen(3000, (req, res) => {
  console.log('Conectado al servidor http://localhost:3000')
})
