const User = require('../models/User');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token');



module.exports = class UserController {

    //Register a new User
    static async register(req, res) {

        const {
            name,
            email,
            phone,
            password,
            confirmepassword,
        } = req.body;


        //Valid User
        if (!name) {
            res.status(422).json({ message: "Name is not optinal!" });
            return;
        }
        if (!email) {
            res.status(422).json({ message: "E-mail is not optinal!" });
            return;
        }
        if (!phone) {
            res.status(422).json({ message: "Phone is not optinal!" });
            return;
        }
        if (!password) {
            res.status(422).json({ message: "Password is not optinal!" });
            return;
        }
        if (password !== confirmepassword) {
            res.status(422).json({ message: "The passwords is not equals!" });
            return;
        }

        //Check if user already exists
        const userValid = await User.findOne({ email: email });
        if (userValid) {
            res.status(422).json({ message: "E-mail already exists!" });
            return;
        }

        //crete a password
        const salt = bcrypt.genSaltSync(12);
        const passwordHash = bcrypt.hashSync(password, salt);

        //create user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })

        //Save User
        try {
            const newUser = await user.save();
            await createUserToken(req, res, newUser);
        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }

    }

    //Authentic User
    static async login (req, res){

        const {email, password} = req.body;

        //Valid User
        if(!email){
            res.status(422).json({message:"E-mail is required!"});
            return;
        }
        if(!password){
            res.status(422).json({message:"Password is required!"});
            return;
        }

        //Check if user already exists
        const userValid = await User.findOne({ email: email });
        if (!userValid) {
            res.status(403).json({ message: "Email or Password not exists!" });
            return;
        }

        //check user password
        const checkPassword = bcrypt.compareSync(password,userValid.password);
        if(!checkPassword){
            res.status(403).json({ message: "Email or Password not exists!" });
            return;
        }

        await createUserToken(req,res,userValid);

    }


    //Get current User
    static async checkUser(req, res){

        const currentUser = await User.findById(req.user._id).select('-password');
        res.status(200).json(currentUser);
        return;

    }

    //Edite a User
    static async updateUser(req, res){

        const currentUser = req.user;

        const {
            name,
            email,
            phone,
            password,
            confirmepassword,
        } = req.body;

        
        let image = "";

        if(req.file){
            image = req.file.filename;
        }

        //Valid User
        if (!name) {
            res.status(422).json({ message: "Name is not optinal!" });
            return;
        }
        if (!email) {
            res.status(422).json({ message: "E-mail is not optinal!" });
            return;
        }
        if (!phone) {
            res.status(422).json({ message: "Phone is not optinal!" });
            return;
        }
        if (!password) {
            res.status(422).json({ message: "Password is not optinal!" });
            return;
        }
        if (password !== confirmepassword) {
            res.status(422).json({ message: "The passwords is not equals!" });
            return;
        }

        //Check if email already exits
        const userToValid = await User.findOne({email:email});
        if(userToValid){
            res.status(422).json({message:'Email already exists.'});
            return;
        }

        const salt = bcrypt.genSaltSync(12);
        const passwordHash = bcrypt.hashSync(password, salt);

        const user = {
            name,
            email,
            phone,
            password:passwordHash,
            image:image
    };

       try {
        
        await User.findOneAndUpdate(
            {_id:currentUser._id},
            {$set:user},
            {new:true}
        )

        res.status(200).json({message:"Atualizado com sucesso!"});

       } catch (error) {
            res.status(500).json({message:error});
            return;
       }

    }


}

//Validate user dates
// const validationUser = (user, res) => {

//     if (!user.name) {
//         res.status(422).json({ message: "Name is not optinal!" });
//         return;
//     }
//     if (!user.email) {
//         res.status(422).json({ message: "E-mail is not optinal!" });
//         return;
//     }
//     if (!user.phone) {
//         res.status(422).json({ message: "Phone is not optinal!" });
//         return;
//     }
//     if (!user.password) {
//         res.status(422).json({ message: "Password is not optinal!" });
//         return;
//     }
//     if (user.password !== user.confirmepassword) {
//         res.status(422).json({ message: "The passwords is not equals!" });
//         return;
//     }

// }