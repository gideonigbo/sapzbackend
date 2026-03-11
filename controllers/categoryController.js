const Category = require("../schema/categorySchema");


//Create Category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if(!name) return res.status(400).json({mess: "name cannot be empty!"})
    const category = await Category.findOne({name});
    if (category) return res.status(400).json({mess:"The category is already in DB"});

    const newCategory = new Category({name})
    await newCategory.save()
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ mess: error.message });
  }
};

//Get all Categroies
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    if(categories.length === 0) return res.status(400).json({mess: "No category in DB, Request the super admin add categories"})
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ mess: error.message });
  }
};


module.exports = {
  createCategory,
  getAllCategories
};
