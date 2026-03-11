const { Cart } = require("../schema/cartSchema");
const Product = require("../schema/productSchema");
const User = require("../schema/userSchema");


//Create Cart
const createCart = async (req, res) => {
  const productId = req.params.productId
  const verifiedUser = req.verifiedUser._id

  try {
    const product = await Product.findById(productId)
    if(!product) return res.status(400).json({mess: "No product found in DB, Please create a new product"})
    
    let usersCart = await Cart.findOne({userId: verifiedUser})
    if(!usersCart) {
      usersCart = new Cart({
        userId: verifiedUser._id,
        products: [
          {
            productId,
            quantity: 1,
            price: product.price
          },
        ],
      });

    } else {
      const itemInCart = usersCart.products.find(item => item.productId.toString() === productId)
      if (itemInCart) {
        itemInCart.quantity += 1
      } else {
        usersCart.products.push({
          productId,
          quantity: 1,
          price: product.price,
        });
      }
    }

  //Updating the totalItemPrice
    usersCart.products.forEach(item => {
      item.totalItemPrice = item.price * item.quantity
    })

  //Update the Cart total
    let totalCartItemPrice = usersCart.products.reduce((accumulator, currentValue) => accumulator + currentValue.totalItemPrice, 0)
    usersCart.totalCartItemPrice = totalCartItemPrice

  //Save cart
    await usersCart.save()
    res.status(200).json({mess: "Products added successfully"})

  } catch (err) {
    res.status(500).json({mess: err.message})
  }
} 


//Delete CartItem
const deleteCartItem = async (req, res) => {
  const productId = req.params.productId
  const verifiedUser = req.verifiedUser._id

  try {
    const cart = await Cart.findOne({userId: verifiedUser})
    if(!cart) return res.status(400).json({mess: 'Your cart is empty! Browse our categories and explore wide varities of items'})
      //New product array without the product to be removed
    cart.products = cart.products.filter(item => item.productId.toString() !== productId)

    //Recalculate the totalCartItemPrice
    cart.totalCartItemPrice = cart.products.reduce((accumulator, currentValue) => accumulator + currentValue.totalItemPrice, 0)
    await cart.save()
    return res.status(200).json({mess: "Product deleted successfully"})
  } catch (error) {
    console.log(error)
  }
}

//Delete All CartItems
const deleteAllCartItems = async (req, res) => {
  const verifiedUser = req.verifiedUser._id

  try {
    const cart = await Cart.findOne({userId: verifiedUser})
    if(!cart) return res.status(400).json({mess: 'Your cart is empty! Browse our categories and explore wide varities of items'})

    let productsDeleted = cart.products = []
    cart.totalCartItemPrice = 0

    if(productsDeleted) {
      await cart.save()
    }

    res.status(200).json({mess: "Your cart is deleted! Browse our categories and explore wide varities of items"})
  } catch (error) {
    console.log(error)
  }
}


//Get Cart
const getCart = async (req, res) => {
  const verifiedUser = req.verifiedUser._id

  try {
    const cart = await Cart.findOne({userId: verifiedUser}).populate('products.productId', '-userId', '-color', '-size')
    if(!cart) return res.status(400).json({mess: 'Your cart is empty! Browse our categories and explore wide varities of items'})

    res.status(200).json(cart)
  } catch (error) {
    console.log(error)
  }
}

//Update Cart
const editCartItem = async (req, res) => {
  const { productId, type } = req.body
  const verifiedUser = req.verifiedUser._id

  if(!productId || !type) return res.status(400).json({mess: "Please provide all fields"})
  try {
    const cart = await Cart.findOne({ userId: verifiedUser });
    if (!cart) return res.status(400).json({mess: "Your cart is empty! Browse our categories and explore wide varities of items"});

    const itemInCart = cart.products.find(
      (item) => item.productId.toString() === productId,
    );
    if (type === "increase") {
      itemInCart.quantity += 1;
    } else if (type === "decrease" && itemInCart.quantity > 1) {
      itemInCart.quantity -= 1;
    } else {
      res.status(400).json({ mess: "Type can only be increase or decrease" });
    }

    //Updating the totalItemPrice
    cart.products.forEach((item) => {
      item.totalItemPrice = item.price * item.quantity;
    });

    //Update the Cart total
    let totalCartItemPrice = cart.products.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalItemPrice,
      0,
    );
    cart.totalCartItemPrice = totalCartItemPrice;

    //Save cart
    await cart.save();
    res.status(200).json({ mess: "Products Updated successfully" });

  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  createCart,
  deleteCartItem,
  deleteAllCartItems,
  getCart,
  editCartItem
}
