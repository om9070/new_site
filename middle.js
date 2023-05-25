const jwt = require("jsonwebtoken");
const models = require("./model");


const auth = async(req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader.split(' ')[1]// you can take from headers
    
       //if you put token here it will work fine i can put the token here
        const verifyuser = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZmNDdhOTEwZWQ3ZTFlMTFhM2E2YWUiLCJpYXQiOjE2ODUwMTQ0NDF9.tyLXWUHoGbURqKvC_5zafJWQb8Am1IoRKg3yIXs5o5U", "thisissecretkey"); ///this is check toke is valid or not
        console.log(token,"dataxxxyyyyyy",verifyuser)

        const user = await models.findOne({ _id: verifyuser._id }); //check id from database
        console.log("datazzzzzzzzzzzzzzzz",user)

        req.token = token; ///if got some datat then return
        req.user = user; ///if got some datat then return
        next(); ///it call to next performance  if not use next then you code is break here
    } catch (e) {
        res.status(401).json("jsonwebtokem fails", e);

    }
}

module.exports = auth;