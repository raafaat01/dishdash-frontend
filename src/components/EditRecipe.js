import React, { useEffect, useState } from 'react';
import { getRecipeById, updateRecipe } from '../services/recipeService';
import { useParams, useNavigate } from 'react-router-dom';

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        category: '',
        name: '',
        ingredient: '',
        instruction: '',
        imageUrl: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Load the recipe details when the component mounts
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await getRecipeById(id);
                setRecipe(data);
            } catch (err) {
                setError('Failed to load recipe');
            }
        };

        fetchRecipe();
    }, [id]);

    // Update the recipe state when inputs change
    const handleChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

    // Handle form submission to update the recipe
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateRecipe(id, recipe);
            setMessage('Recipe updated successfully');
            setError('');
            // Optionally, navigate back to the recipe details page
            navigate(`/recipes/${id}`);
        } catch (err) {
            setError(err.response?.data || 'Failed to update recipe');
            setMessage('');
        }
    };

    return (
        <div>
            <style>{`
        .edit-recipe-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }
        .edit-recipe-container h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333333;
        }
        .edit-recipe-form .form-group {
          margin-bottom: 1rem;
        }
        .edit-recipe-form label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #555555;
        }
        .edit-recipe-form input,
        .edit-recipe-form textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #cccccc;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        .edit-recipe-form input:focus,
        .edit-recipe-form textarea:focus {
          border-color: #007bff;
          outline: none;
        }
        .edit-recipe-form button {
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
        .edit-recipe-form button:hover {
          background-color: #0056b3;
        }
        .message {
          text-align: center;
          color: #28a745;
          margin-top: 1rem;
        }
        .error-message {
          text-align: center;
          color: #e74c3c;
          margin-top: 1rem;
        }
      `}</style>

            <div className="edit-recipe-container">
                <h2>Edit Recipe</h2>
                {message && <p className="message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <form className="edit-recipe-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={recipe.category}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={recipe.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredient">Ingredient:</label>
                        <textarea
                            id="ingredient"
                            name="ingredient"
                            value={recipe.ingredient}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="instruction">Instruction:</label>
                        <textarea
                            id="instruction"
                            name="instruction"
                            value={recipe.instruction}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={recipe.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Update Recipe</button>
                </form>
            </div>
        </div>
    );
};

export default EditRecipe;
