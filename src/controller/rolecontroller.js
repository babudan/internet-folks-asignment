var rolemodel = require("../model/rolemodel");

var {isVlaidCommunity ,isEmpty ,isValid} = require("../validator/validator")

const createrole = async (req,res) => {
    try {
               let data = req.body;
               let {name} = data;
               
               if(!isEmpty(data))  return res.status(400).send({status : false ,message : "plss fill some data"});
               
                if(!isValid(name))  return res.status(400).send({status : false ,message : "plss put a valid name"}) 
               

               if(!isVlaidCommunity(name)) return res.status(400).send({status : false ,message : "role must be Community Admin ,Community Moderator or Community Member"});

               const oldrole = await rolemodel.create(data);
              
               return res.status(201).send({status : true, data : oldrole})
     } catch(err){
        return res.status(500).send({status : false ,message : err.message});
     }          
                
}


const getallrole = async (req ,res) => {

    try {
           

        
        
        let pageSize = 10;
        let currentpage =  parseInt(req.query.page) || 1;
        let skip = (currentpage - 1) * pageSize;
        let noofdocument = await rolemodel.countDocuments();
        let totalPages = Math.ceil(noofdocument / pageSize);
        
        let findrole = await rolemodel.find().skip(skip).limit(pageSize);

        let newobj = {
            meta : {
                total : noofdocument,
                pages : totalPages,
                page : currentpage
            }
        }

        return res.status(200).send({status : true ,content : newobj, data : findrole});

    }catch(err){
        return res.status(500).send({status : false ,message : err.message});
    }
            
}


module.exports = {createrole ,getallrole}