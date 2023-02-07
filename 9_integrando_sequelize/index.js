const express = require('express')
const engine = require('express-handlebars')

const conn = require('./db/conf');

const User = require('./models/User');

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

app.get("/users/create", (req, res)=>{

    res.render("adduser");
})

app.post("/users/create", async (req, res)=>{

    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

   newsletter = newsletter ? true : false;

   await User.create({name,newsletter,occupation});

   res.redirect("/");

})

app.get("/", async (req, res)=>{

    const users = await User.findAll({raw:true});

    res.render('home',{users});
})


conn.sync().then(()=>{

    app.listen(3000)

}).catch((err)=>{
    console.log(err);
})

