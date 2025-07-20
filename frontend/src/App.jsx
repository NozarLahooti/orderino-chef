import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';       // New Page
import RecipeDetails from './pages/RecipeDetails';
import EditRecipe from './pages/EditRecipe';
import './styles/App.css';

function App() {
  return (
    <Router>
      <nav className="main-nav">
        <Link to="/"      className="nav-link">Home</Link>
        <Link to="/add"   className="nav-link">Add Recipe</Link>
      </nav>

      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/add"        element={<AddRecipe />} />      
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/edit/:id"   element={<EditRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
