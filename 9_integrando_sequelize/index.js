const express = require('express')
const engine = require('express-handlebars')

const conn = require('./db/conf');

const User = require('./models/User');
const Address = require('./models/Address');

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

app.post("/addess/insert", async (req,res)=>{

    const UserId = req.body.UserId;
    const street = req.body.street;
    const city = req.body.city;
    const number = req.body.number;

    const addressData = {
        UserId,
        street,
        city,
        number
    }

    await Address.create(addressData);

    res.redirect(`/user/update/${UserId}`);

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

app.post("/users/update", async(req, res)=>{

    const name = req.body.name;
    const occupation = req.body.occupation;
    const id = req.body.id;
    let newsletter = req.body.newsletter;

    newsletter = newsletter ? true : false;

    const userData ={
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData,{where:{id}});

    res.redirect("/");

})

app.post("/address/delete/:id", async (req, res)=>{

    const id = req.params.id;

    const UserId = req.body.UserId;

    console.log(UserId)

    await Address.destroy({where:{id}});

    res.redirect("/user/update/"+UserId);

})

app.post("/users/delete/:id", async (req, res)=>{

    const id = req.params.id;

    await User.destroy({where:{id:id}});

    res.redirect("/")

})

app.get("/user/update/:id", async (req, res)=>{

    const id = req.params.id;


    const user = await User.findOne({include:Address, where:{id}});

    console.log(user.get({plain:true}));

    res.render('useredit',{user : user.get({plain:true})});

})

app.get("/users/:id", async (req, res)=>{

    const id = req.params.id;

    const user = await User.findOne({raw:true ,where:{id:id}});

    res.render("userview",{user});

})

conn
// .sync({force:true})
.sync()
.then(()=>{

    app.listen(3000)

}).catch((err)=>{
    console.log(err);
})

