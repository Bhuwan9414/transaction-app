const express = require("express");
const router = express.Router();
const zod = require("zod")
const {User, Account} = require("../db")
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const signupschema = zod.object({
    username : zod.string().email(),
    firstname : zod.string(),
    lastname : zod.string(),
    password : zod.string()
})

router.post("/signup", async function(req, res){

    const {success} = signupschema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg : "incorrect inputs"
        })
    }

    // checking if already there a user exists of the same name
    const existinguser = await User.findOne({
        firstname : req.body.firstname
    })

    if(existinguser){
        return res.status(411).json({
            msg : "user already exists"
        })
    }

    const {username, firstname, lastname, password} = req.body;
    const newUser = await User.create({
        username,
        firstname,
        lastname,
        password
    })

    const userId = newUser._id;

    await Account.create({
        userId,
        balance : parseInt(Math.random()*10000)
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.status(200).json({
        msg : "user created successfully",
        token : token,
    })

})

const signinschema = zod.object({

    username : zod.string().email(),
    password : zod.string()

})

router.post("/signin", async function(req, res){

    const {success} = signinschema.safeParse(req.body);
    if(!success){
        return res.status(404).json({
            msg : "invalid inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    if(!user){
        return res.status(404).json({
            msg : "user not found"
        })
    }


    if(user){
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET)   

        res.status(200).json({
            token : token,
            msg : "signin successfull"
        })
    }

})

router.get("/bulk", async function(req, res){

    const filter = req.query.filter || "";

    const users = await User.find({
        $or : [
            {firstname : { "$regex" : filter} },
            {lastname : { "$regex" : filter}}
        ]
    })


    res.json({
        users : users.map(user => ({
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            _id : user._id
        }))
    })
})

module.exports = router;


// router.post("/signup", async function(req, res){
//     const {success} = signupschema.safeParse(req.body)
//     if(!success){
//         return res.json({
//             msg : "invalid inputs"
//         })
//     }

//     const user = user.findone({
//         firstname : body.firstname
//     })

//     if(user._id) {
//         return res.json({
//             msg : "email already taken"
//         })
//     }

//     const dbuser = await user.create(body);
    
//     const token = jwt.sign({
//         userId : dbuser._id
//     },JWT_SECRET)
//     res.json({
//         msg : "user created successfully",
//         token : token
//     })
// })
