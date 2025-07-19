import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const appId = import.meta.env.VITE_EDAMAM_APP_ID;
        const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;
        const baseUrl = import.meta.env.VITE_EDAMAM_BASE_URL;

        // Edamam API endpoint
        const url = `${baseUrl}?q=pasta&app_id=${appId}&app_key=${appKey}`;

        const response = await axios.get('http://localhost:8080/api/recipes/edamam?q=pasta');
        console.log(response.data); // Check what API returns
        setRecipes(response.data.hits || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>All Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {recipes.map((item, index) => {
            const recipe = item.recipe; // Edamam data structure
            return (
              <li key={index}>
                <strong>{recipe.label}</strong>
                <img
                  src={recipe.image}
                  alt={recipe.label}
                  style={{ width: '150px', display: 'block', marginBottom: '10px' }}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
