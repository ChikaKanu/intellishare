const userRouter = require('express').Router();
const User = require('../model/User');

//Validation
const Joi = require("@hapi/joi");

const schema = Joi.object({
    name: Joi.string()
        .min(4)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(8)
        .required(),
    address: Joi.string()
        .min(8)
        .required(),
    postcode: Joi.string()
        .min(7)
        .max(7)
        .required()
});

userRouter.post('/register', async (req, res) => {
    //lets validate data before we create a user
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).send(error.details[0].message)
        }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            postcode: req.body.postcode
        });
        try{
        const savedUser = await user.save();
            res.send(savedUser);
        }catch(err){
            res.status(400).send(err)
        }
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

// userRouter.post('/user/login', async (req, res) => {
//     const user = await User.
// });

module.exports = userRouter;