import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError]     = useState('');

  useEffect(() => {
    async function fetchRecipes() {
      try {
        // Fetch from Edamam endpoint
        const res = await axios.get(
          'http://localhost:8080/api/recipes/edamam?q=pasta'
        );
        // Map Edamam hits into simple objects
        const hits = res.data.hits.map(hit => ({
          id:       hit.recipe.uri.split('#recipe_')[1],
          title:    hit.recipe.label,
          imageURL: hit.recipe.image
        }));
        setRecipes(hits);
      } catch (err) {
        setError('Failed to load recipes');
      }
    }
    fetchRecipes();
  }, []);

  if (error) return <div className="home__error">{error}</div>;

  return (
    <div className="home">
      <h1 className="home__title">All Recipes</h1>
      <ul className="home__grid">
        {recipes.map(recipe => (
          <li key={recipe.id} className="home__card">
            <Link to={`/recipe/${recipe.id}`} className="home__link">
              <h2 className="home__card-title">{recipe.title}</h2>
              <img
                src={recipe.imageURL}
                alt={recipe.title}
                className="home__card-image"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
