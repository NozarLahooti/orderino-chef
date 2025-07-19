// backend/routes/recipeRoutes.js

import express from 'express';
import axios from 'axios';
import Recipe from '../models/orderino.js';

const router = express.Router();

// Proxy Edamam API
// GET /api/recipes/edamam?q=...
router.get('/edamam', async (req, res) => {
  const query   = req.query.q    || 'chicken';
  const appId   = process.env.EDAMAM_APP_ID;
  const appKey  = process.env.EDAMAM_APP_KEY;
  const userId  = process.env.EDAMAM_USER;
  const baseUrl = 'https://api.edamam.com/api/recipes/v2';

  try {
    const response = await axios.get(baseUrl, {
      params: {
        type:    'public',
        q:       query,
        app_id:  appId,
        app_key: appKey
      },
      headers: {
        'Edamam-Account-User': userId
      }
    });
    return res.json(response.data);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch recipes' });
  }
});

// Get all recipes
// GET /api/recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single recipe by ID
// GET /api/recipes/:id
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new recipe
// POST /api/recipes
router.post('/', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ message: 'Invalid Data' });
  }
});

// Update a recipe
// PUT /api/recipes/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: 'Update Failed' });
  }
});

// Delete a recipe
// DELETE /api/recipes/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete Failed' });
  }
});

export default router;
