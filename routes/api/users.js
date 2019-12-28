const express = require('express');
const router = express.Router();
const users = require('../../models/users');
const user_role = require('../../models/user_role');

//@route POST api/users
//@desc  Register users profile
//@access Public
router.post('/',async (req,res,next)=>{
    const user= req.body
    if(!user){
        res.status(400).json({"msg":"required field missing"});
    }
    try {
         const user = await users.findOne({role:req.body.role}, function(err, result) {
            if (err) throw err;
            console.log(result)
            if(result==null || result.role!="admin"){
                var userDetails = new users(req.body);
                userDetails.save()
                .then(item => {
                res.status(200).json({data:userDetails});
                })
                .catch(err => {
                res.status(400).send("unable to save to database");
                });
                var userRole = new user_role({
                    username:req.body.username,
                    role:req.body.role
                })
                userRole.save()
                .then(item => {
                res.status(200).json({data:userRole});
                })
                .catch(err => {
                res.status(400).send("unable to save to database");
                });
            }else{
                 if(result.role=="admin"){
                    res.json({msg:"role can not be admin. Give other role"})
                }
            }
          });

    } catch (error) {
        res.json({msg:error.message})
    }
})


module.exports = router;