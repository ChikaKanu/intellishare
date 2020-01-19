const userRouter = require('express').Router();
const User = require('../model/User');

userRouter.post('/register', (req, res) => {
    res.json('Register');
    // const user = new User({
    // });
    // try{
    //     const savedUser = user.save();
    //     res.json(savedUser);

    // }catch(err){

    // }
});

userRouter.post('/login');

module.exports = userRouter;