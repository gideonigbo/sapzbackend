const express = require('express')
const { createCategory, getAllCategories } = require('../controllers/categoryController')
const adminMiddleware = require('../middlewares/adminmiddleware')

const categoryRouter = express.Router()


categoryRouter

//create a product
  .post('/product/category', adminMiddleware, createCategory)

//get all categories
  .get('/categories', adminMiddleware, getAllCategories)


module.exports = categoryRouter
