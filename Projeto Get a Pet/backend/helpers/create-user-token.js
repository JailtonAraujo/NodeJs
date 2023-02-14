const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET

const createUserToken = async (req,res,user) =>{

    //create token
    const token = jwt.sign({
        name:user.name,
        id:user._id
    },jwtSecret,{expiresIn:'1d'});


    res.status(200).json({
        token:token,
        userId:user._id,
        message:"User been autenticate!"
    });

}

module.exports = createUserToken;