const express = require("express");
const router = new express.Router();
const middleware=require("../middle")
const model=require("../model")

router.get("/", (req, res) => {
  res.send("this is node");
});


router.post("/registration", async(req, res) => {
  const { name, user } = req.body;
  console.log(name,user)
  if (!name || !user) {
      return res.status(422).json("invalid data");
  }

  try {

      const user_data = new model({ name, user });

      ////generate token this toke will fail after 144 hour
      if (user_data) {

          const tokendata = await user_data.generatetoken();
          console.log("this is token", tokendata);

          res.cookie("jwt", tokendata, {
              ////valid jsonwebtoken 144 hours
              expires: new Date(Date.now() + 518400000),
              httpOnly: true
          });


          await user_data.save();
          res.status(201).send({data:"resgistraion success",token:tokendata});

      }
  } catch (e) {
      res.send(e);
      console.log("register problem", e);
  }
})

// tableSeatFind[0].train["A1"]


router.get("/getdata",middleware,async(req,res)=>{
  try{
res.status(200).send("user is authorizied")
  }
  catch(e){
    res.status(400).send(e);

  }
})






module.exports = router