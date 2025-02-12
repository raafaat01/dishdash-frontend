import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data || 'Login failed');
        }
    };

    return (
        <div>
            <style>{`
        .login-container {
          max-width: 400px;
          margin: 3rem auto;
          padding: 2rem;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }
        .login-container h2 {
          text-align: center;
          color: #333333;
          margin-bottom: 1.5rem;
        }
        .login-form .form-group {
          margin-bottom: 1rem;
        }
        .login-form label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #555555;
        }
        .login-form input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #cccccc;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }
        .login-form input:focus {
          outline: none;
          border-color: #007bff;
        }
        .login-form button {
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
        .login-form button:hover {
          background-color: #0056b3;
        }
        .error-message {
          color: #e74c3c;
          text-align: center;
          margin-bottom: 1rem;
        }
      `}</style>

            <div className="login-container">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
