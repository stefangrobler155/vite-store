// src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../utils/api';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}