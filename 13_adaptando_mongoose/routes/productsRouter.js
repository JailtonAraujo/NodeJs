const express = require('express')
const router = express.Router();


const productController = require('../controllers/productController');

router.get('/',productController.showProducts);
router.get('/create', productController.createProduct);
router.post('/delete', productController.deleteProductById);
router.get('/edit/:id',productController.editProduct);
router.post('/edit',productController.editProductSave);
router.get('/get/:id', productController.getProduct);
router.post('/create', productController.createProductSave);

module.exports = router;