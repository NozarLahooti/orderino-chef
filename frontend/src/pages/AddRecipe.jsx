import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddRecipe.css'; // you’ll define styles here

export default function AddRecipe() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingrArray = ingredients.split(',').map(i => i.trim());
      await axios.post(
        'http://localhost:8080/api/recipes',
        { title, ingredients: ingrArray, instructions }
      );
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error adding recipe');
    }
  };

  return (
    <div className="add-recipe-container">
      <h2 className="add-recipe-title">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="add-recipe-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients (comma‑separated):</label>
          <input
            id="ingredients"
            className="form-control"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            className="form-control"
            value={instructions}
            onChange={e => setInstructions(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Add Recipe
        </button>
      </form>
    </div>
);
}
