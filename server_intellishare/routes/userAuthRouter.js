const userRouter = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const {userRegisterValidation, userLoginValidation} = require('../model/validation');


userRouter.post('/register', async (req, res) => {
    //lets validate data before we create a user
        const {error} = userRegisterValidation(req.body);
        if(error){
            return res.status(400).send(error.details[0].message)
        };
    //check if user is in database
        const emailExists = await User.findOne({email: req.body.email});
        if(emailExists){
            return res.status(400).send("Email already exists! Use another email")
        };
     //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //add new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            postcode: req.body.postcode
        });
        try{
        const savedUser = await user.save();
            res.send({
                userId: user._id, 
                name: user.name,
                email: user.email
            });
        }catch(err){
            res.status(400).send(err)
        }
});

userRouter.post('/login', async (req, res) => {
    //validate data before loging in a user
    const {error} = userLoginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    //check database if user email exists
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send('Email does not exist')
    }
    //check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(400).send('Invalid password')
    };
    //Create and asign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token)
});

userRouter.patch("/:userId", async (req, res) => {
    try{
    const updatedUser = await User.updateOne(
        {_id: req.params.userId}, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                postcode: req.body.postcode 
            }
        }
    )
    res.send(updatedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

userRouter.delete("/:userId", async (req, res) => {
    try{
        const deletedUser = await User.deleteOne({_id: req.params.userId});
        res.send('Account deletion successful')
    }catch(err){
        res.status(400).send(err)
    }
})

userRouter.get("/", async (req, res) => {
    try{
        const users = await User.find();
        res.send(users);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = userRouter;