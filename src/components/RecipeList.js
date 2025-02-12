import React, { useEffect, useState } from 'react';
import { getRecipes } from '../services/recipeService';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getRecipes();
                setRecipes(data);
            } catch (err) {
                setError('Failed to load recipes');
            }
        };

        fetchRecipes();
    }, []);

    return (
        <div>
            <style>{`
        .recipe-list-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: Arial, sans-serif;
        }
        .recipe-list-title {
          text-align: center;
          color: #333;
          margin-bottom: 1.5rem;
        }
        .error-message {
          text-align: center;
          color: red;
          margin-bottom: 1.5rem;
        }
        .recipe-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .recipe-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
          transition: box-shadow 0.3s ease;
        }
        .recipe-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .recipe-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 1rem;
        }
        .recipe-card a {
          color: #007bff;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: bold;
          display: block;
          margin-top: 0.5rem;
        }
        .recipe-card a:hover {
          text-decoration: underline;
        }
      `}</style>

            <div className="recipe-list-container">
                <h2 className="recipe-list-title">Recipes</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="recipe-grid">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card">
                            {recipe.imageUrl && (
                                <img
                                    src={recipe.imageUrl}
                                    alt={recipe.name}
                                    className="recipe-image"
                                />
                            )}
                            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecipeList;
