import express from 'express';
import Recipe from '../models/orderino.js';

const router = express.Router();

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Recipes API is working' });
});

export default router;
