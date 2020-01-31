const express = require('express');
const inventoryRouter = express.Router();
const Meal = require('../model/inventory');
const verify = require('./verifyTokens');

inventoryRouter.get('/', verify, async (req, res) => {
    try{
        const meals = await Meal.find();
        res.json(meals);
    } catch (err) {
        res.json({message: err});
    }
});

inventoryRouter.get('/:mealId', verify, async (req, res) => {
    try{
        const findMeal = await Meal.findById(req.params.mealId);
        res.json(findMeal);
    } catch (err) {
        res.json({message: err});
    }
});

inventoryRouter.patch('/:mealId', verify, async (req, res) => {
    try{
        const updatedMeal = await Meal.updateOne(
           {_id: req.params.mealId}, {
               $set: {
                    name: req.body.name,
                    description: req.body.description,
                    provider: req.body.provider,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    reserveStatus: req.body.reserveStatus
                }
            }
        )
        res.json(updatedMeal);
        res.send(req.user)
    } catch(err){
        res.json({message: err})
    }  
})

inventoryRouter.delete('/:mealId', verify, async (req, res) => {
    try{
        const removedMeal = await Meal.deleteOne({_id: req.params.mealId});
        res.json(removedMeal)
    } catch (err) {
        res.json({message: err});
    };
});

inventoryRouter.post('/', verify, async (req, res) => {
    const meal = new Meal({
        name: req.body.name,
        description: req.body.description,
        provider: req.body.provider,
        quantity: req.body.quantity,
        price: req.body.price
    });
    try{
        const savedMeal = await meal.save();
        res.json(savedMeal);
    } catch (err) {
        res.json({message: err})

    }
});

module.exports = inventoryRouter;