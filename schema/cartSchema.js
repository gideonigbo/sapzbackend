const mongoose = require('mongoose')

//Setting uo the cart item schema
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity:  Number,
  price: {
    type: Number
  },
  totalItemPrice: {
    type: Number
  }

});


//Setting up the Cart schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    ref: "user"
  },
  products: [
    cartItemSchema
  ],
  totalCartItemPrice: {
    type: Number
  }

}, {timestamp: true})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = {
  Cart
}
