const express = require('express');
const router = express.Router();

const productController = require("./../controllers/product.controller")

router.post("/products",productController.createProduct);

router.get('/products',productController.getProducts);

router.get('/search',productController.searchProducts);

router.put('/products/:id',productController.updateProduct);

router.delete('/products/:id',productController.deleteProduct);

module.exports = router;