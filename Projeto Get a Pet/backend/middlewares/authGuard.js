const jwtSecret = process.env.JWT_SECRET
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authGuard = async (req,res,next) => {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    //check if header has token
    if(!token) return res.status(401).json({message:"Acesso negado!"})

    try {
        
        const verified = jwt.verify(token,jwtSecret);
        req.user = await User.findById(verified.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({message:"Token invalido!"});
    }

}

module.exports = authGuard;