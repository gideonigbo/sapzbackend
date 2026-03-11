const Category = require("../schema/categorySchema");
const Product = require("../schema/productSchema");

//Get allProducts and Query
const getAllProducts = async (req, res) => {
  try {
    //Incase it comes as a query
    const { size, color, name, category } = req.query;

    //Initiaizing filter field
    const filter = {}

    if (category) {
      //If there is a query lang.
      const foundCategory = await Category.findOne({name: category}).populate("userId", "usernam")
      if (!foundCategory) return res.status(200).json({mess: "category not in db"})

      filter.category = foundCategory._id
    }
    if (size) filter.size = size
    if (color) filter.size = color
    if (name) filter.size = name
    
    const products = await Product.find(filter).populate("category")
    if (!products) {
      const products = await Product.find().populate("category")
      return res.status(200).json(products)
    }

    if (products.length === 0)
      return res.status(200).json({ message: "No product added yet" });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ mess: error.message });
  }
};




//Get Products by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(500)
        .json(`The product with ID: ${id} can not be found`);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ mess: error.message });
  }
};



//Deelete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { tokenID } = req.verifiedUser.id
    const product = await Product.findByIdAndDelete(id);
    if((tokenID !== product.userId) || !product){
      return res
        .status(500)
        .json(`The product with ID: ${id} has been deleted/ cannot be found.`);
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ mess: error.message });
  }
};



//CREATE a product

const createProduct = async (req, res) => {
  //desctructuring the data to be entered from the client to our db
  const { name, price, color, size, category } = req.body;

  //Checking user Auth
  //We added the auth middleware to the product router
  const id = req.verifiedUser._id
  try {
  //checking if all fields are entered without having the required key 
    if (!name || !price || !color || !size || !category) {
      return res.status(400).json({ mess: "All fields are required!" });
    } else {
      const foundCategory = await Category.findById({_id: category})

      if (!foundCategory) return res.status(400).json({mess: `Inform the admin to add category ${category} to Db`})

      const product = new Product({...req.body, userId: id });
      await product.save();
      res.status(200).json({ mess: "New product created successfully!" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



//Update A  product
const updateProduct = async (req, res) => {
  try {
    const { name, price, color, size } = req.body;
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, color, size },
      { new: true },
    );
    if (!product)
      return res
        .status(500)
        .json(`The product with ID: ${id} has been cannot be found.`);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
};
