import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make recipe title clickable

export default function Home() {
  // Holds all recipes fetched from API
  const [recipes, setRecipes] = useState([]);

  // Fetch recipes from API when component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=pasta');
        setRecipes(response.data.meals); // Store recipes in state
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
            <li key={recipe.idMeal}> 
              <Link to={`/recipe/${recipe.idMeal}`}> {/* Make it clickable */}
                <strong>{recipe.strMeal}</strong>
              </Link>
              {recipe.strMealThumb && (
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    style={{ width: '150px', display: 'block', marginTop: '10px' }}
                />
              )}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
