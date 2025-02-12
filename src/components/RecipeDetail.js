import React, { useEffect, useState } from 'react';
import { getRecipeById, addFavorite, removeFavorite, deleteRecipe } from '../services/recipeService';
import { getCurrentUser } from '../services/authService';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const user = getCurrentUser();

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

    const handleAddFavorite = async () => {
        // Redirect guest to login if no user is signed in
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const res = await addFavorite(id);
            setMessage(res);
            setError('');
        } catch (err) {
            setError(err.response?.data || 'Failed to add favorite');
            setMessage('');
        }
    };

    const handleRemoveFavorite = async () => {
        // Redirect guest to login if no user is signed in
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const res = await removeFavorite(id);
            setMessage(res);
            setError('');
        } catch (err) {
            setError(err.response?.data || 'Failed to remove favorite');
            setMessage('');
        }
    };

    const handleEditRecipe = () => {
        // Navigate to the edit page (assuming you have an EditRecipe component)
        navigate(`/edit-recipe/${id}`);
    };

    const handleDeleteRecipe = async () => {
        try {
            await deleteRecipe(id);
            setMessage("Recipe deleted successfully");
            // Navigate back to the recipes list after deletion
            navigate("/recipes");
        } catch (err) {
            setError(err.response?.data || 'Failed to delete recipe');
            setMessage('');
        }
    };

    if (!recipe) return <p>Loading...</p>;

    return (
        <div>
            <style>{`
        .recipe-detail-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }
        .recipe-title {
          text-align: center;
          color: #333333;
          margin-bottom: 1rem;
        }
        .recipe-image {
          display: block;
          margin: 0 auto 1.5rem;
          max-width: 100%;
          border-radius: 8px;
        }
        .recipe-info {
          margin-bottom: 1.5rem;
          line-height: 1.6;
          color: #555555;
        }
        .recipe-info p {
          margin: 0.5rem 0;
        }
        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .action-buttons button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        /* Regular user buttons */
        .add-btn {
          background-color: #28a745;
          color: #ffffff;
        }
        .add-btn:hover {
          background-color: #218838;
        }
        .remove-btn {
          background-color: #dc3545;
          color: #ffffff;
        }
        .remove-btn:hover {
          background-color: #c82333;
        }
        /* Admin buttons */
        .edit-btn {
          background-color: #ffc107;
          color: #ffffff;
        }
        .edit-btn:hover {
          background-color: #e0a800;
        }
        .delete-btn {
          background-color: #dc3545;
          color: #ffffff;
        }
        .delete-btn:hover {
          background-color: #c82333;
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

            <div className="recipe-detail-container">
                <h2 className="recipe-title">{recipe.name}</h2>
                {recipe.imageUrl && (
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        className="recipe-image"
                        width="300"
                    />
                )}
                <div className="recipe-info">
                    <p><strong>Category:</strong> {recipe.category}</p>
                    <p><strong>Ingredients:</strong> {recipe.ingredient}</p>
                    <p><strong>Instructions:</strong> {recipe.instruction}</p>
                </div>
                <div className="action-buttons">
                    {user && user.role === 'Admin' ? (
                        <>
                            <button className="edit-btn" onClick={handleEditRecipe}>Edit Recipe</button>
                            <button className="delete-btn" onClick={handleDeleteRecipe}>Delete Recipe</button>
                        </>
                    ) : (
                        <>
                            <button className="add-btn" onClick={handleAddFavorite}>Add to Favorites</button>
                            <button className="remove-btn" onClick={handleRemoveFavorite}>Remove from Favorites</button>
                        </>
                    )}
                </div>
                {message && <p className="message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default RecipeDetail;
