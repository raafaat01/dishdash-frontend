import axios from 'axios';

// Base URL for the API endpoints
const API_URL = 'https://localhost:7167/api/recipe';

// Helper function to get the authorization header
const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

// Get all recipes
export const getRecipes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Get a single recipe by its ID
export const getRecipeById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Create a new recipe (Admin only)
export const createRecipe = async (recipe) => {
    const headers = getAuthHeader();
    const response = await axios.post(API_URL, recipe, { headers });
    return response.data;
};

// Update an existing recipe (Admin only)
export const updateRecipe = async (id, recipe) => {
    const headers = getAuthHeader();
    const response = await axios.put(`${API_URL}/${id}`, recipe, { headers });
    return response.data;
};

// Delete a recipe (Admin only)
export const deleteRecipe = async (id) => {
    const headers = getAuthHeader();
    const response = await axios.delete(`${API_URL}/${id}`, { headers });
    return response.data;
};

// Add a recipe to the user's favorites (User only)
export const addFavorite = async (id) => {
    const headers = getAuthHeader();
    const response = await axios.post(`${API_URL}/${id}/favorite`, {}, { headers });
    return response.data;
};

// Remove a recipe from the user's favorites (User only)
export const removeFavorite = async (id) => {
    const headers = getAuthHeader();
    const response = await axios.delete(`${API_URL}/${id}/favorite`, { headers });
    return response.data;
};

// Get the user's favorite recipes (User only)
export const getFavoriteRecipes = async () => {
    const headers = getAuthHeader();
    const response = await axios.get(`${API_URL}/favorites`, { headers });
    return response.data;
};
