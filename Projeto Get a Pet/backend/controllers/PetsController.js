const Pet = require('../models/Pet');

module.exports = class PetsController {

    static async create(req,res){
        
        const {
            name,
            age,
            wight,
            color
        }=req.body;

        const images = req.files;

        const available = true;

        //Validations
        if(!name){
            res.status(422).json({message:"Name is required!"});
            return;
        }
        if(!age){
            res.status(422).json({message:"Age is required!"});
            return;
        }
        if(!wight){
            res.status(422).json({message:"Wight is required!"});
            return;
        }
        if(!color){
            res.status(422).json({message:"Color is required!"});
            return;
        }
        if(images.length === 0){
            res.status(422).json({message:"Image is required!"});
            return;
        }

        //get pet owner
        const user = req.user;

        const pet = new Pet({
            name,
            age,
            wight,
            color,
            images:[],
            available,
            user:{
                _id:user._id,
                name:user.name,
                image:user.image,
                phone:user.phone
            }
        })

        images.map((image)=>{
            pet.images.push(image.filename);
        })

        try {
            
            const newPet = await pet.save();
            res.status(201).json({
                message:"Pet been created!",
                newPet
            })

        } catch (error) {
            res.status(501).json({message:error});
        }

    }
}