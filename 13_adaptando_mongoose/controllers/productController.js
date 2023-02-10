const Product = require ('../models/Product');


module.exports = class productController{


    static async deleteProductById(req, res){

        const id = req.body.id;

        await Product.deleteOne({_id:id});

        res.redirect('/products');

    }

    static async getProduct(req, res){

        const id = req.params.id;


        const product = await Product.findById(id).lean();

        res.render('products/product',{product});

    }

    static async createProductSave(req, res){

        const {name, price, description, image} = req.body;

        const product = new Product({name,price,description,image});

       await product.save();

        res.redirect('/products');

    }

    static async createProduct (req, res){

        res.render('products/create');

    }
    
    static async showProducts(req, res){

        const products = await Product.find().lean();

        res.render('products/all',{products});
    }
    
    static async editProduct (req, res) {

        const id = req.params.id;

        const product = await Product.findById(id).lean();

        res.render('products/edit',{product});

    }

    static async editProductSave (req, res) {

        const {name, price, image, description, id} = req.body;

        const product = {name,image,price,description};

        await Product.updateOne({_id:id},product);

        res.redirect('/products');

    }

}