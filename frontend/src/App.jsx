import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
// import AddRecipe from './pages/AddRecipe';
import RecipeDetails from './pages/RecipeDetails';
import EditRecipe from './pages/EditRecipe';
import './styles/App.css'


function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#f4f4f4'}}>
        <a href='/' style={{ marginRight: '15px'}}>Home</a>
        <a href='/add' style={{ marginRight: '15px'}}>Add Recipe</a>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/add" element={<AddRecipe />} /> */}
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/edit/:id" element={<EditRecipe />} />

      </Routes>
    </Router>
  );
}

export default App;
