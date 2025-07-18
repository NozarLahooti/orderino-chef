import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function RecipeDetails() {
  const { id } = useParams(); // Get recipe ID 
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
);
        setRecipe(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      {recipe.strMealThumb && (
      <img 
       src={recipe.strMealThumb}
       alt={recipe.strMeal}
       style={{ maxWidth: '300px' }}
        />
    )}
      <h3>Ingredients:</h3>
      <ul>

         {Array.from({ length: 20 }, (_, i) => i + 1)
            .map(i => recipe[`strIngredient${i}`])
            .filter(ingredient => ingredient)
            .map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
            ))}
     
      </ul>
      <h3>Instructions:</h3>
      <p>{recipes.strInstructions}</p>
    </div>
  );
}
