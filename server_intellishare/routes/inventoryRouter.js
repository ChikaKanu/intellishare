const express = require('express');
const inventoryRouter = express.Router();
const Meal = require('../modules/inventory');

inventoryRouter.get('/', async (req, res) => {
    try{
        const meals = await Meal.find();
        res.json(meals);
    } catch (err) {
        res.json({message: err});
    }
});

inventoryRouter.get('/:mealId', async (req, res) => {
    try{
        const findMeal = await Meal.findById(req.params.mealId);
        res.json(findMeal);
    } catch (err) {
        res.json({message: err});
    }
});

inventoryRouter.patch('/:mealId', async (req, res) => {
    
})

inventoryRouter.delete('/:mealId', async (req, res) => {
    try{
        const removedMeal = await Meal.remove({_id: req.params.mealId});
        res.json(removedMeal)
    } catch (err) {
        res.json({message: err});
    };
});

inventoryRouter.post('/', async (req, res) => {
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