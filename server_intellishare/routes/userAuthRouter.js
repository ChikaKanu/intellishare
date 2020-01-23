const userRouter = require('express').Router();
const User = require('../model/User');

userRouter.post('/register', async (req, res) => {
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