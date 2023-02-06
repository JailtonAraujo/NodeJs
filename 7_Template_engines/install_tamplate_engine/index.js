const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const hbs = exphbs.create({
    partialsDir:['views/partials'],
})

app.use(express.static('public'));

app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars');

const user = {
    name:"jaiton",
    surname:"rei delas"
}

const auth = true;

app.get('/blog',(req,res)=>{

    const posts = [
        {
            title:"Alguma coisa por aqui",
            category:"Aprendendo",
            comments: 4
        },
        {
            title:"Outra coisa aqui",
            category:"Estuadando",
            comments: 5
        },
        {
            title:"Alguma coisa por acola",
            category:"Praticando",
            comments: 8
        }
    ]


    res.render('blog',{posts})
})

app.get('/post',(req, res)=>{

    const post ={
        title:"Final de semana curtindo adoidado!",
        body:"Falando de alguma coisa",
        category:"Fim de semana bo parque",
        comments:"Um monte de comentarios aqui"

    }

    res.render('blogpost',{post});

})

app.get("/dashboard",(req, res)=>{

    const itens = [
        {id:1, item:"item a"},
        {id:2, item:"item b"}, 
        {id:3, item:"item c"}];

    res.render('dashboard',{aproved:false, itens});
})

app.get("/", (req, res) => {

    res.render('home',{user,auth});

})

app.listen(3000, ()=>{
    console.log("app running port 3000...");
})