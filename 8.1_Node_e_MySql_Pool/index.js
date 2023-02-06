const express = require('express')
const engine = require('express-handlebars')

const pool = require('./db/conf');

const app = express();

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json());



app.engine('handlebars', engine.engine());
app.set('view engine','handlebars');

app.use(express.static('public'));


app.post("/book/edit",(req,res)=>{

    const id = req.body.id;
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?;`
    const dataQuery = ['title',title, 'pageqty',pageqty, 'id',id];

    pool.query(sql,dataQuery, function(err){

        if(err){
            console.log(err);
        }

        res.redirect('/books');

    })

})


app.get("/books", (req, res)=>{

    const sql = "SELECT * FROM books;";

    pool.query(sql, function(err, data){

        if(err){
            console.log(err);
            return;
        }

        const books = data;

        res.render("books",{books});

    })

})

app.post("/books/insertbook", (req, res)=>{

    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?);`;
    const data = ['title','pageqty',title, pageqty];

    pool.query(sql, data, function (err){
        if(err){
            console.log(err);
            
        }
        res.redirect("/books");
    });

})


app.get("/",(req, res)=>{

    res.render('home');
})

app.get("/book/delete/:id",(req, res)=>{

    const id = req.params.id;

    const sql = `DELETE FROM books WHERE ?? = ?;`;
    const dataQuery = ['id',id]

    pool.query(sql,dataQuery, function(err){

        if(err){
            console.log(err);
        }

        res.redirect("/books");

    })

})

app.get("/book/edit/:id", (req, res )=>{

    const id = req.params.id;

    const sql = `SELECT * FROM books where ?? = ?`;
    const dataQuery = ['id', id];

    pool.query(sql, dataQuery, function(err,data){

        if(err){
            console.log(err);
        }
 
        const book = data[0];

        res.render("editbook", {book});

    })
})


app.get("/book/:id", (req, res)=>{

    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE ?? = ?`;
    const dataQuery = ['id',id];

    pool.query(sql,dataQuery , function(err, data){

        if(err){
            console.log(err);
            return;
        }

        const book = data[0];

        res.render("book",{book});

    })

})
    
    app.listen(3000, ()=>{
        console.log('Application running in port 3000');        

})

