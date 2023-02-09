const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtControler {

    static async showToughts (req, res){ res.render('toughts/home');}

    static async dashboard(req, res){
        
        const userId = req.session.userid;

        const user = await User.findOne(
            {where:{id:userId},
            include: Tought,
            plain:true
        });

        //check if user exists
        if(!user){
            res.redirect('/login');
        }

        const toughts = user.Toughts.map((result)=>result.dataValues);

        res.render('toughts/dashboard',{toughts});

    }

    static createToughts(req, res){ res.render('toughts/create') }

    static async createToughtsSave(req, res){

        const tought ={
            title: req.body.title,
            userId: req.session.userid
        }

       try{

        await Tought.create(tought);

        req.flash('message','Pensando publicado com sucesso!');

        req.session.save(()=>{
            res.redirect('/toughts/dashboard')
        })

       }catch(err){
        console.log(err);
       }

    }


    static async removeToughts(req, res) {

        const id = req.body.id;
        const userId = req.session.userid;

        try {
            
            await Tought.destroy({where:{id:id,userId:userId}});

            req.flash('message','Pensando removido com sucesso!');

            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })

        } catch (error) {
             console.log(error);
             res.redirect('/auth/dashboard');   
        }
    }

    static async editToughts(req, res) {

        const id = req.params.id;

        const userId = req.session.userid;

        console.log(id);

        try {
            
            const tought = await Tought.findOne({raw:true,where:{id:id,userId:userId}});

            res.render('toughts/editTought',{tought});

        } catch (error) {
            console.log(error);
            res.render('toughts/editTought');

        }

    }


    static async updateTought (req, res){

        const  id = req.body.id;

        const userId = req.session.id

        const tought = {
            title:req.body.title
        }


        try {
            
            await Tought.update(tought,{where:{id:id}});

           
            req.flash('message','Pensamento atualizado com sucesso!');

            req.session.save(()=>{
                res.redirect('/toughts/dashboard');
            })

        } catch (error) {
            req.flash('message','Erro ao atualilar publicação, tente mais tarde!');

            res.redirect('/toughts/dashboard');
            console.log(error);
        }


    }

}