import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditRecipe() {
  const { id } = useParams(); // Get recipe ID from URL
  const navigate = useNavigate();

  // State to hold recipe details
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageURL, setImageURL] = useState('');

  // Fetch recipe data when component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/recipes/${id}`);
        const recipe = response.data;
        setTitle(recipe.title);
        setIngredients(recipe.ingredients.join(', '));
        setInstructions(recipe.instructions);
        setImageURL(recipe.imageURL || '');
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);

  // Handle update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/recipes/${id}`, {
        title,
        ingredients: ingredients.split(',').map(item => item.trim()),
        instructions,
        imageURL
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleUpdate}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients (comma separated)" />
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions"></textarea>
        <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} placeholder="Image URL" />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}
