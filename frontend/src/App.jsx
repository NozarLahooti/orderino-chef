import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';       // New Page
import RecipeDetails from './pages/RecipeDetails';
import Login from './pages/Login';
import EditRecipe from './pages/EditRecipe';
import Register from './pages/Register';
import './styles/App.css';

function App() {
  return (
    <Router>
      <nav className="main-nav">
        <Link to="/"      className="nav-link">Home</Link>
        <Link to="/add"   className="nav-link">Add Recipe</Link>
        <Link to="/login" className="nav-link">Log In</Link>
        <Link to="/register" className="nav_link">Register</Link>
      </nav>

      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/add"        element={<AddRecipe />} />      
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/edit/:id"   element={<EditRecipe />} />
        <Route path="/login"      element={<Login />} />
        <Route path="/register"      element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
