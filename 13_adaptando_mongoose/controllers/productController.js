const Product = require('../models/Product');
const productDB = require('../models/Product');


module.exports = class productController{


    static async deleteProductById(req, res){

        const id = req.body.id;

        await productDB.deleteProductById(id);

        res.redirect('/products');

    }

    static async getProduct(req, res){

        const id = req.params.id;


        const product = await productDB.getProductById(id);

        res.render('products/product',{product});

    }

    static async createProductSave(req, res){

        const {name, image, price, description} = req.body;

        const productToSave = new Product(name,image,price,description);

       await productToSave.save();

        res.redirect('/products');

    }

    static async createProduct (req, res){

        res.render('products/create');

    }
    
    static async showProducts(req, res){

        const products = await productDB.getProduct();

        res.render('products/all',{products});
    }
    
    static async editProduct (req, res) {

        const id = req.params.id;

        const product = await productDB.getProductById(id);

        res.render('products/edit',{product});

    }

    static async editProductSave (req, res) {

        const {name, price, image, description, id} = req.body;

        const productToUpdate = new Product(name,image,price,description);

        await productToUpdate.update(id);

        res.redirect('/products');

    }

}