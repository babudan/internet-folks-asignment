const express = require('express')

const {createrole ,getallrole} = require("../controller/rolecontroller")

const {registeruser ,loginuser ,getcurrenstuser} = require("../controller/usercontroller")

const {userauth} = require("../auth/userauth");
const router = express.Router()


router.post( "/v1/role",createrole);

router.get("/v1/role" ,getallrole);

router.post("/v1/auth/signup" ,registeruser);

router.post("/v1/auth/signin" ,loginuser);

router.get("/v1/auth/me" ,userauth ,getcurrenstuser);

module.exports = router
