const Pet = require('../models/Pet');
const ObjectId = require('mongoose').Types.ObjectId;

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

    static async getAll(req,res){   

        const pets = await Pet.find().sort('-createdAt');

        res.status(200).json(pets);

    }


    static async getAllUserPets(req,res){

        const user = req.user;

        const pets = await Pet.find({'user._id':user._id}).sort('-createdAt');

        res.status(200).json(pets);

    }

    static async getAllUserAdoptions(req,res){

        const user = req.user;

        const pets = await Pet.find({'adopter._id':user._id}).sort('-createdAt');

        res.status(200).json(pets);

    }

    static async getPetById(req,res){

        const id = req.params.id;

        //Validate ObjectId
        if(!ObjectId.isValid(id)){
            res.status(422).json({message:"Id is not valid!"});
            return;
        }

        const pet = await Pet.findById(id);

        if(!pet){
            res.status(404).json({message:"Pet not found!"});
            return;
        }

        res.status(200).json(pet);
    }

    //Delete a Pet
    static async delete (req,res){

        const petId = req.params.id;

        const user = req.user;

        //verify pet id
        if(!ObjectId.isValid(petId)){
            res.status(422).json({message:"Id is not valid!"});
            return;
        }


        //verify id exists a pet
        const pet = await Pet.findById(petId);
        if(!pet){
            res.status(404).json({message:"Pet not found!"});
            return;
        }

        //verify id pet belong user
        if(user._id.toString() !== pet.user._id.toString()){
            res.status(404).json({message:"Impossible process action, try again later!"});
            return;
        }

        await Pet.findByIdAndRemove(petId);

        res.status(200).json({message:"Pet been removed!"});

    }

    static async updatePet (req, res){

        const id = req.params.id;

        const {
            name,
            age,
            wight,
            color,
            available
        }=req.body;

        const user = req.user;

        const images = req.files;

        const updateDate = {};
        
        //verify id exists a pet
        const pet = await Pet.findById(id);
        if(!pet){
            res.status(404).json({message:"Pet not found!"});
            return;
        }

         //verify id pet belong user
         if(user._id.toString() !== pet.user._id.toString()){
            res.status(404).json({message:"Impossible process action, try again later!"});
            return;
        }


        //Validations
        if(!name){
            res.status(422).json({message:"Name is required!"});
            return;
        }else{
            updateDate.name = name;
        }

        if(!age){
            res.status(422).json({message:"Age is required!"});
            return;
        }else{
            updateDate.age = age;
        }

        if(!wight){
            res.status(422).json({message:"Wight is required!"});
            return;
        }else{
            updateDate.wight = wight;
        }

        if(!color){
            res.status(422).json({message:"Color is required!"});
            return;
        }else{
            updateDate.color = color;
        }

        if(images.length === 0){
            res.status(422).json({message:"Image is required!"});
            return;
        }else{
            updateDate.images = [];
            images.map((image)=>{
                updateDate.images.push(image.filename);
            })
        }


        await Pet.findByIdAndUpdate(id,updateDate);

        res.status(200).json({message:"Pet been update."})

    }

    static async schedulePet(req,res){

        const id = req.params.id;

        const user = req.user;

        //verify id exists a pet
        const pet = await Pet.findById(id);
        if(!pet){
            res.status(404).json({message:"Pet not found!"});
            return;
        }

          //verify id pet belong user
          if(user._id.equals(pet.user._id)){
            res.status(404).json({message:"Impossible process action, try again later!"});
            return;
        }

        if(pet.adopter){
            res.status(404).json({message:"Impossible process action, try again later!"});
            return;
        }

        pet.adopter ={
            _id:user._id,
            name:user.name,
            image:user.image
        }

        await Pet.findByIdAndUpdate(id,pet);
        res.status(201).json({message:"Visita agendadad com sucesso!"});
    }


    static async conclude(req, res){

        const id = req.params.id;
        const user = req.user;

         //verify id exists a pet
         const pet = await Pet.findById(id);
         if(!pet){
             res.status(404).json({message:"Pet not found!"});
             return;
         }

         //verify id pet belong user
         if(user._id.toString() !== pet.user._id.toString()){
            res.status(404).json({message:"Impossible process action, try again later!"});
            return;
        }

        pet.available = false;

        await Pet.findByIdAndUpdate(id,pet);

        res.status(200).json({message:"Pet been adopter"});

    }

}