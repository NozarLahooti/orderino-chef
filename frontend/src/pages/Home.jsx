import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Added navigate for Edit functionality

export default function Home() {
  // Holds all recipes fetched from API
  const [recipes, setRecipes] = useState([]);

  // Initialize navigation
  const navigate = useNavigate();

  // Fetch recipes from API when component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecipes(response.data.meals || []); // Store recipes in state
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes(); // Call fetch function
  }, []);

  // Navigate to edit page
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Delete a recipe (API call + UI update)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe.idMeal !== id)); // Update UI after delete
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div>
      <h1>All Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {recipes.map(recipe => (
            <li key={recipe.idMeal}>
              {/* Make recipe title clickable for details */}
              <Link to={`/recipe/${recipe.idMeal}`}>
                <strong>{recipe.strMeal}</strong>
              </Link>

              {/* Recipe thumbnail */}
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                style={{ width: '150px', display: 'block', marginBottom: '10px' }}
              />

              {/* Edit and Delete buttons */}
              <div>
                <button onClick={() => handleEdit(recipe.idMeal)}>Edit</button>
                <button onClick={() => handleDelete(recipe.idMeal)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
