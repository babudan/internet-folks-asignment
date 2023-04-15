const jwt = require("jsonwebtoken");

const usermodel = require("../model/usermodel");


const userauth = async function(req ,res, next){
    try{
         
        const token = req.cookies.newuserjwt;
        if(!token) return res.status(400).send({status : false ,message : "token must be present"})

       const verifyuser = await  jwt.verify(token, process.env.SECRET_TOKEN )

         if(!verifyuser) return res.status({status : false ,message : "token is invalid"})

             const user = await usermodel.findOne({_id : verifyuser._id })

             if(!user) return res.status(400).send({status : false ,message : "user is not authorised"})

            req["decodedtoken"] = user;
            next()


    }catch(err){
        return res.status(500).send({status : false ,message : err.message});
    }
}


module.exports = {userauth}