// src/services/authService.js

import axios from 'axios';

// Base URL for the API endpoints
const API_URL = 'https://localhost:7167/api/login';

/**
 * Login a user and store the returned JWT token and user info in localStorage.
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} The response data including token, username, and role.
 */
export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
        // Save user data (with token) to localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

/**
 * Logout the current user by removing the user data from localStorage.
 */
export const logout = () => {
    localStorage.removeItem('user');
};

/**
 * Register a new regular user.
 *
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} The response data.
 */
export const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
    });
    return response.data;
};

/**
 * Register a new admin user. (Note: Admin accounts will require verification.)
 *
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} The response data.
 */
export const registerAdmin = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/register/admin`, {
        username,
        email,
        password,
    });
    return response.data;
};

/**
 * Retrieve the currently logged-in user's data from localStorage.
 *
 * @returns {Object|null} The user data or null if not logged in.
 */
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
