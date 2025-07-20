import express from 'express';
import axios from 'axios';
import Recipe from '../models/orderino.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

// Protect all routes below with JWT auth
router.use(authenticateToken);


// — Proxy Edamam recipe search —
// GET /api/recipes/edamam?q=term
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
    res.json(response.data);
  } catch {
    res.status(500).json({ message: 'Failed to fetch recipes' });
  }
});

// — Proxy single Edamam recipe by ID —
// GET /api/recipes/edamam/:id
router.get('/edamam/:id', async (req, res) => {
  const { id }    = req.params;
  const appId     = process.env.EDAMAM_APP_ID;
  const appKey    = process.env.EDAMAM_APP_KEY;
  const userId    = process.env.EDAMAM_USER;
  const detailUrl = `https://api.edamam.com/api/recipes/v2/${id}`;

  try {
    const response = await axios.get(detailUrl, {
      params: {
        type:    'public',
        app_id:  appId,
        app_key: appKey
      },
      headers: {
        'Edamam-Account-User': userId
      }
    });
    res.json(response.data.recipe);
  } catch {
    res.status(500).json({ message: 'Failed to fetch recipe detail' });
  }
});

// — Get all recipes from MongoDB —
// GET /api/recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
});

// — Get a single recipe from MongoDB —
// GET /api/recipes/:id
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch {
    res.status(500).json({ message: 'Server Error' });
  }
});

// — Create a new recipe in MongoDB —
// POST /api/recipes
router.post('/', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const saved     = await newRecipe.save();
    res.status(201).json(saved);
  } catch {
    res.status(400).json({ message: 'Invalid Data' });
  }
});

// — Update a recipe in MongoDB —
// PUT /api/recipes/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Recipe not found' });
    res.json(updated);
  } catch {
    res.status(400).json({ message: 'Update Failed' });
  }
});

// — Delete a recipe in MongoDB —
// DELETE /api/recipes/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
  } catch {
    res.status(500).json({ message: 'Delete Failed' });
  }
});

export default router;
