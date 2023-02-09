const express = require('express');
const engine = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn');

//imports routs
const thoughtsRouter = require('./routes/toughtRoutes');
const authRoutes = require('./routes/authRoutes');

//imports controllers
const ToughtControler = require('./controllers/ToughtController');

//models
const User = require('./models/User');
const Tought = require('./models/Tought');

// Converter todas os dadaos da requisição em json
app.use(
    express.urlencoded({
        extended:true
    }),
)
app.use(express.json());

//Configuração do tamplate engine
app.engine('handlebars',engine.engine());
app.set('view engine','handlebars');

//session middlware
app.use(session({
    name:'session',
    secret:'my_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function(){},
        path: require('path').join(require('os').tmpdir(),'sessions'),
    }),
    cookie:{
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now()+3600000),
        httpOnly: true
    }
}))

//flash message
app.use(flash());

//set sesion to res
app.use((req, res, next)=>{

    if(req.session.userid){
        res.locals.session = req.session;
    }

    next();

})

//Configuração padrão dos arquivos statics
app.use(express.static('public'));

//routes
app.use('/toughts', thoughtsRouter);
app.use('/', authRoutes);
app.get('/', ToughtControler.showToughts);

//Iniciando conexão
conn
.sync()
// .sync({force:true})
.then(()=>{
    app.listen(3000);
    console.log('app running in port 3000');
}).catch((err)=>{
    console.log(err);
})
