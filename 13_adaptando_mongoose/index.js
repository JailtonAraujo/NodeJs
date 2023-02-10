const express = require('express');
const engine = require('express-handlebars');

const app = express();

const conn = require('./db/conn');

app.engine('handlebars',engine.engine());
app.set('view engine','handlebars');

//Ready body
app.use(
    express.urlencoded({
        extended:true
    }),
)
app.use(express.json());

app.use(express.static('public'));


//Controllers
const productController = require('./controllers/productController');

//Routes imports
const productRouter = require('./routes/productsRouter');

//Routes
app.use('/products',productRouter);
app.get('/', productController.showProducts);

app.listen(3000,()=>{
    console.log('app running in port 3000');
})