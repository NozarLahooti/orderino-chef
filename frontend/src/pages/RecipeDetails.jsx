import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './RecipeDetails.css';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    async function fetchRecipe() {
      try {
        // 1) Hit Edamam detail 
        const res = await axios.get(
          `http://localhost:8080/api/recipes/edamam/${id}`
        );
        // 2) The proxy returns the Edamam recipe object directly
        setRecipe(res.data);
      } catch (err) {
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) return <div className="loading">Loading…</div>;
  if (error)   return <div className="error">{error}</div>;

  // Destructure the fields you need from the Edamam recipe
  const {
    label,
    image,
    ingredientLines = [],
    url
  } = recipe;

  return (
    <div className="recipe-details-container">
      <h2 className="recipe-title">{label}</h2>

      {image && (
        <img
          src={image}
          alt={label}
          className="recipe-image"
        />
      )}

      <section className="recipe-section">
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          {ingredientLines.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </section>

      <section className="recipe-section">
        <h3>Instructions</h3>
        {url ? (
          <p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View full instructions
            </a>
          </p>
        ) : (
          <p>No instructions available.</p>
        )}
      </section>

      <Link to={`/edit/${id}`} className="btn-edit">
        Edit Recipe
      </Link>
    </div>
  );
}
