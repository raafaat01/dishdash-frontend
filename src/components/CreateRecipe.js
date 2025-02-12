import React, { useState } from 'react';
import { createRecipe } from '../services/recipeService';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
    const [recipe, setRecipe] = useState({
        category: '',
        name: '',
        ingredient: '',
        instruction: '',
        imageUrl: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRecipe(recipe);
            navigate('/recipes');
        } catch (err) {
            setError(err.response?.data || 'Failed to create recipe');
        }
    };

    return (
        <div>
            {/* Inline CSS in the same file */}
            <style>{`
        .create-recipe-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .create-recipe-container h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333333;
        }
        .error-message {
          color: #e74c3c;
          text-align: center;
          margin-bottom: 1rem;
        }
        .create-recipe-form .form-group {
          margin-bottom: 1.25rem;
        }
        .create-recipe-form label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
          color: #555555;
        }
        .create-recipe-form input,
        .create-recipe-form textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #cccccc;
          border-radius: 4px;
          font-size: 1rem;
          box-sizing: border-box;
          transition: border-color 0.3s ease;
        }
        .create-recipe-form input:focus,
        .create-recipe-form textarea:focus {
          border-color: #007bff;
          outline: none;
        }
        .create-recipe-form button {
          width: 100%;
          padding: 0.75rem;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: bold;
          color: #ffffff;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .create-recipe-form button:hover {
          background-color: #0056b3;
        }
      `}</style>

            <div className="create-recipe-container">
                <h2>Create Recipe</h2>
                {error && <p className="error-message">{error}</p>}
                <form className="create-recipe-form" onSubmit={handleSubmit}>
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
                    <button type="submit">Create Recipe</button>
                </form>
            </div>
        </div>
    );
};

export default CreateRecipe;
