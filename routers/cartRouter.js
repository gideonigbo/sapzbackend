const  express = require('express')
const authMiddleware = require('../middlewares/authmiddleware')
const { createCart, deleteCartItem, getCart, deleteAllCartItems, editCartItem } = require('../controllers/cartController')



const cartRouter = express.Router()

cartRouter

//Create a cart
  .post('/createCart/:productId', authMiddleware, createCart)

//Get Cart
  .get('/cart', authMiddleware, getCart)
  
// //Edit Cart
  .put('/cartItem/:productId', authMiddleware, editCartItem)

//Delete a cartItem
  .delete('/cartItem/:productId', authMiddleware, deleteCartItem)

//Delete all cartIte
  .delete('/cartItem', authMiddleware, deleteAllCartItems)

module.exports = cartRouter
