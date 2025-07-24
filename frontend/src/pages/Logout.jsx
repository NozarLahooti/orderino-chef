// frontend/src/pages/Logout.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear users info
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    
    // Redirect to login
    navigate('/login');
  }, [navigate]);
}

