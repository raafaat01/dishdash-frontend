// src/components/AdminRegister.js
import React, { useState } from 'react';
import { registerAdmin } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerAdmin(username, email, password);
            // The API response might say: "Admin registered successfully. Awaiting verification."
            setMessage(res);
            // Optionally, you can redirect to login or show a success message.
            // navigate('/login');
        } catch (err) {
            setError(err.response?.data || 'Registration failed');
        }
    };

    return (
        <div>
            <style>{`
        .admin-register-container {
          max-width: 400px;
          margin: 3rem auto;
          padding: 2rem;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }
        .admin-register-container h2 {
          text-align: center;
          color: #333333;
          margin-bottom: 1.5rem;
        }
        .admin-register-form .form-group {
          margin-bottom: 1rem;
        }
        .admin-register-form label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #555555;
        }
        .admin-register-form input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #cccccc;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        .admin-register-form input:focus {
          border-color: #007bff;
          outline: none;
        }
        .admin-register-form button {
          width: 100%;
          padding: 0.75rem;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 1rem;
        }
        .admin-register-form button:hover {
          background-color: #0056b3;
        }
        .error-message {
          color: #e74c3c;
          text-align: center;
          margin-bottom: 1rem;
        }
        .success-message {
          color: #28a745;
          text-align: center;
          margin-bottom: 1rem;
        }
      `}</style>

            <div className="admin-register-container">
                <h2>Register as Admin</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <form className="admin-register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="admin-username">Username:</label>
                        <input
                            type="text"
                            id="admin-username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="admin-email">Email:</label>
                        <input
                            type="email"
                            id="admin-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="admin-password">Password:</label>
                        <input
                            type="password"
                            id="admin-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register as Admin</button>
                </form>
            </div>
        </div>
    );
};

export default AdminRegister;
