const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');

const user = {
    name:"jaiton",
    surname:"rei delas"
}

const auth = false;

app.get("/dashboard",(req, res)=>{
    res.render('dashboard');
})

app.get("/", (req, res) => {

    res.render('home',{user,auth});

})

app.listen(3000, ()=>{
    console.log("app running port 3000...");
})