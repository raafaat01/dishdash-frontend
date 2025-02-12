import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../services/authService';

const NavBar = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <style>{`
        /* Navbar container styling */
        .navbar {
          background-color: #007bff;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }
        /* Left section: Logo and brand name */
        .navbar-left {
          display: flex;
          align-items: center;
        }
        .navbar-left img {
          height: 40px;
          margin-right: 0.5rem;
        }
        .brand-name {
          color: #ffffff;
          font-size: 1.5rem;
          font-weight: bold;
          text-decoration: none;
        }
        /* Center section: Message */
        .navbar-center {
          flex: 1;
          text-align: center;
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: bold;
        }
        /* Right section: Navigation links */
        .navbar-right ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .navbar-right li {
          margin-left: 1rem;
        }
        .navbar-right a {
          color: #ffffff;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s ease;
        }
        .navbar-right a:hover {
          color: #e2e2e2;
        }
        .navbar-right button {
          background: transparent;
          border: none;
          color: #ffffff;
          font-weight: bold;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .navbar-right button:hover {
          color: #e2e2e2;
        }
      `}</style>

            <nav className="navbar">
                {/* Left side: Logo and Brand */}
                <div className="navbar-left">
                    <Link to="/" className="brand-name">
                        <img src="/logo2.png" alt="DishDash Logo" />
                        DishDash
                    </Link>
                </div>

                {/* Right side: Navigation links */}
                <div className="navbar-right">
                    <ul>
                        {user ? (
                            <>
                                {user.role === 'Admin' ? (
                                    <>
                                        <li>
                                            <Link to="/recipes">Recipes</Link>
                                        </li>
                                        <li>
                                            <Link to="/create-recipe">Create Recipe</Link>
                                        </li>
                                        <li>
                                            <Link to="/pending-admins">Admin Approve</Link>
                                        </li>
                                        <li>
                                            <Link to="/profile">Profile</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/recipes">Recipes</Link>
                                        </li>
                                        <li>
                                            <Link to="/favorites">Favorites</Link>
                                        </li>
                                        <li>
                                            <Link to="/profile">Profile</Link>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/recipes">Recipes</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                                <li>
                                    <Link to="/register/admin">Register as Admin</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
