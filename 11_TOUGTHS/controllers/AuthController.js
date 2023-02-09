const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController{

    static async login (req, res) { res.render('auth/login') }



    static async loginPost(req, res){

        const {email, password} = req.body;

        try{

            //find user
            const user = await User.findOne({raw:true,where:{email}});

        //Virify if exists user
        if(!user){

            req.flash('message','Informações inválidas!');
            res.render('auth/login');
            return;
        }

        //check password match//
        const passwordMatch = bcrypt.compareSync(password,user.password);

        if(!passwordMatch){
            req.flash('message','Email ou senha incorretos!');
            res.render('auth/login');
            return;
        }
            //Set user in session
            req.session.userid = user.id;
            req.flash('message',`Bem vindo ${user.name.split(" ")[0]}!`);
            req.session.save(()=>{
                res.redirect('/')
                return;
            })

        }catch(err){
            console.log(err);
            req.flash('message','Um error inespeardo aconteceu, tente mais tarde!');
            res.render('auth/login');
        }
    }

    static register(req, res){

        res.render('auth/register');
    }

    static async registerPost(req, res){

        const {name, email, password, confirmePassword} = req.body;

        //password match validation
        if(password != confirmePassword){

            //message
            req.flash('message','As senha são diferentes.');
            res.render('auth/register');

            return;
        }

        //virify if user exists
        const checkIfUserExists = await User.findOne({where:{email: email}});
        if( checkIfUserExists){

             //message
             req.flash('message','Email já existente.');
             res.render('auth/register');
 
             return;
        }

        //create a password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt);

        const user ={
            name,
            email,
            password: hashedPassword
        }

        try{

            const createdUser = await User.create(user);

            //Initializing session
            req.session.userid = createdUser.id;

            req.flash('message','cadastro relizado com sucesso!');

            req.session.save(()=>{
                console.log(req.session.userid);
                res.redirect('/');
            })

        }catch(err){
            console.log(err);
            req.flash('message','Um error inespeardo aconteceu, tente mais tarde!');
            res.render('auth/register');
        }

    }

    static logout(req, res){
        req.session.destroy();
        res.redirect('/login')
    }


}
