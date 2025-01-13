const express = require('express');
const { storeCategoryController,getAllCategory,updateCategory,deleteCategory } = require('../controllers/categoryController');

const route = express.Router();

route.post('/stote-category',storeCategoryController);
route.get('/get-all-category',getAllCategory);
route.put('/update-category/:id',updateCategory);
route.delete('/delete-category/:id',deleteCategory);




module.exports = route;