import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';

const Profile = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <style>{`
        .profile-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          text-align: center;
        }
        .profile-container h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }
        .profile-details {
          margin-bottom: 2rem;
        }
        .profile-details p {
          margin: 0.5rem 0;
          font-size: 1rem;
          color: #555;
        }
        .logout-btn {
          padding: 0.75rem 1.5rem;
          background-color: #dc3545;
          color: #ffffff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .logout-btn:hover {
          background-color: #c82333;
        }
      `}</style>

            <div className="profile-container">
                <h2>Profile</h2>
                {user ? (
                    <div className="profile-details">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                ) : (
                    <p>No user data available.</p>
                )}
                <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
            </div>
        </div>
    );
};

export default Profile;
