import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  // Holds all recipes fetched from API
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes from API when component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/recipes');
        setRecipes(response.data); // Store recipes in state
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes(); // Call fetch function
  }, []);

  return (
    <div>
      <h1>All Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        // Render list of recipe titles
        <ul>
          {recipes.map(recipe => (
            <li key={recipe._id}>
              <strong>{recipe.title}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
