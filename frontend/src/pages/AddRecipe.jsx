import { useState } from 'react';

export default function AddRecipe() {
  const [title, setTitle] = useState('');           // State for recipe title
  const [ingredients, setIngredients] = useState(''); // State for ingredients
  const [instructions, setInstructions] = useState(''); // State for instructions
  const [imageURL, setImageURL] = useState('');     // State for image URL

  // Handle form submit

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log({
    title,
    ingredients: ingredients.split(',').map(item => item.trim()), // Convert to array
    instructions,
    imageURL
  });
};
  
  return (
    <div>
      <h1>Add New Recipe</h1>
      <form>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Ingredients (comma separated)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)}></textarea>
        <input type="text" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

