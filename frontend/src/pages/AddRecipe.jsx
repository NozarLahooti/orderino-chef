// import { useState } from 'react';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// export default function AddRecipe() {
//   const [title, setTitle] = useState('');           // State for recipe title
//   const [ingredients, setIngredients] = useState(''); // State for ingredients
//   const [instructions, setInstructions] = useState(''); // State for instructions
//   const [imageURL, setImageURL] = useState('');     // State for image URL

//   // Initialize navigation
//   const navigate = useNavigate()

//   // Handle form submit

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     await axios.post('http://localhost:8080/api/recipes', {
//         title,
//         ingredients: ingredients.split(',').map(item => item.trim()), // Convert to array
//         instructions,
//         imageURL
//   });
//     navigate('/')
//   } catch (error) {
//     console.error('Error adding recipe:', error)
//   }
// };
  
//   return (
//     <div>
//       <h1>Add New Recipe</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
//         <input type="text" placeholder="Ingredients (comma separated)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
//         <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)}></textarea>
//         <input type="text" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
//         <button type="submit">Add Recipe</button>
//       </form>
//     </div>
//   );
// }
