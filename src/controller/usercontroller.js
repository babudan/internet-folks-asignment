const usermodel = require("../model/usermodel");
const {isValid ,isEmpty ,isValidName ,isValidPassword ,isValidEmail } = require("../validator/validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registeruser = async (req ,res) => {
    try {
        let data = req.body;
        let {name ,email ,password} = data;

        if(!isEmpty(data)) return res.status(400).send({status : false ,message : "plss fill some data"});

        if(!isValid(name) || !isValidName(name)) return res.status(400).send({status : false ,message : "plss put a name or put a valid name with atleast 2 chracter"});

        if(!isValid(email) || !isValidEmail(email)) return res.status(400).send({status : false ,message : "plss put a email or put a valid email"});

        const newemail = await usermodel.findOne({ email });
        if (newemail) return res.status(400).send({ status: false, message: "Email is already present" })

        if(!isValid(password) || !isValidPassword(password)) return res.status(400).send({status : false ,message : "plss put a password or Password must be contain of 6 to 15 character with special charcter and one lowercase ,one uppercase and numbers"});

        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(password, salt);

        const usercreate = await usermodel.create(data);
        return res.status(201).send({ status: true, message: "user create succesfully",  content : {data: usercreate } })


    }catch(err){
        return res.status(500).send({status : false ,message : err.message});
    }
}


const loginuser = async (req ,res) => {
    try {
           let data = req.body;
        let {email ,password} = data;

        if(!isEmpty(data)) return res.status(400).send({status : false ,message : "plss fill some data"});
         
        if(!isValid(email) || !isValidEmail(email)) return res.status(400).send({status : false ,message : "plss put a email or put a valid email"});

        const newemail = await usermodel.findOne({ email });
        if (!newemail) return res.status(400).send({ status: false, message: "Email is not registered" })

        if(!isValid(password) || !isValidPassword(password)) return res.status(400).send({status : false ,message : "plss put a password or Password must be contain of 6 to 15 character with special charcter and one lowercase ,one uppercase and numbers"});
        
        let encryptPwd = newemail.password;

        await bcrypt.compare(password, encryptPwd, function (err, result) {
          if (result) {
            let token = jwt.sign(
              { _id: newemail._id.toString() , iat: Math.floor(Date.now() / 1000) - 30 },
              process.env.SECRET_TOKEN,
              {
                expiresIn: "24hr",
              }
            );
            res.cookie("newuserjwt" ,token ,{
                httponly : true,
                // secure : true
              })
    
            return res.status(200).send({status: true, message: "User login successfull", content : {data: newemail } ,meta : token });
          } 
          else return res.status(401).send({ status: false, message: "Invalid password!" });
        });

    }catch(err){
        return res.status(500).send({status : false ,message : err.message});
    }
}


const getcurrenstuser = async (req ,res) => {
    try {
            let id = req.decodedtoken._id;
            console.log(id)
        let finduser = await usermodel.findById( id );

        if(!finduser) return res.status(400).send({status : false ,message : "user is not present in db"});

        return res.status(200).send({status : true ,content : {data : finduser}});

    }catch(err){
        return res.status(500).send({status : false ,message : err.message});
    }
}

module.exports = {registeruser ,loginuser ,getcurrenstuser}











