const express = require('express')
const engine = require('express-handlebars')

const mysql = require('mysql')

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

    const sql = `UPDATE books SET title='${title}', pageqty='${pageqty}' WHERE id = ${id};`

    conn.query(sql, function(err){

        if(err){
            console.log(err);
            conn.rollback();
        }

        conn.commit();

        res.redirect('/books');

    })

})


app.get("/books", (req, res)=>{

    const sql = "SELECT * FROM books;";

    conn.query(sql, function(err, data){

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

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}','${pageqty}');`;

    conn.query(sql, function (err){
        if(err){
            console.log(err);
            conn.rollback();
        }

        conn.commit();

        res.redirect("/books");
    });

})


app.get("/",(req, res)=>{

    res.render('home');
})

app.get("/book/delete/:id",(req, res)=>{

    const id = req.params.id;

    const sql = `DELETE FROM books WHERE id = ${id};`;

    conn.query(sql, function(err){

        if(err){
            console.log(err);
            conn.rollback();
        }

        conn.commit();
        res.redirect("/books");

    })

})

app.get("/book/edit/:id", (req, res )=>{

    const id = req.params.id;

    const sql = `SELECT * FROM books where  id = ${id}`;

    conn.query(sql, function(err,data){

        if(err){
            console.log(err);
        }
 
        const book = data[0];

        res.render("editbook", {book});

    })
})


app.get("/book/:id", (req, res)=>{

    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE id= ${id}`;

    conn.query(sql, function(err, data){

        if(err){
            console.log(err);
            return;
        }

        const book = data[0];

        res.render("book",{book});

    })

})

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "jailton123",
    database: "nodemysql",
});


conn.connect(function(err){

    if(err){
        console.log(err)
    }

    console.log('connected to database!');
    
    app.listen(3000, ()=>{
        console.log('Application running in port 3000');        
    })

})

