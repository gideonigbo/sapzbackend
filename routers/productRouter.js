const express = require('express')
const { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct } = require('../controllers/productController')
const authMiddleware = require('../middlewares/authmiddleware')

const productRouter = express.Router()


productRouter

//create a product
  .post('/product', authMiddleware, createProduct)

//get all prodcucts
  .get('/allProducts', getAllProducts)

//get a single products
  .get('/product/:id', getProductById)

//update a product
  .put('/product/:id', authMiddleware, updateProduct)

//delete a product
  .delete('/product/:id', authMiddleware, deleteProduct)




module.exports = productRouter
