import React, { useEffect, useState } from 'react';
import { getFavoriteRecipes } from '../services/recipeService';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const data = await getFavoriteRecipes();
                setFavorites(data);
            } catch (err) {
                setError(err.response?.data || 'Failed to load favorite recipes');
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    return (
        <div>
            <style>{`
        .favorites-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: Arial, sans-serif;
        }
        .favorites-title {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }
        .favorites-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .favorite-card {
          background-color: #fff;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
          transition: box-shadow 0.3s ease;
        }
        .favorite-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .favorite-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 4px;
        }
        .favorite-name {
          text-decoration: none;
          color: #007bff;
          font-weight: bold;
          font-size: 1.1rem;
          display: block;
          margin: 0.5rem 0;
        }
        .favorite-category {
          font-size: 0.9rem;
          color: #555;
        }
      `}</style>

            <div className="favorites-container">
                <h2 className="favorites-title">My Favorite Recipes</h2>
                {loading ? (
                    <p style={{ textAlign: 'center' }}>Loading...</p>
                ) : error ? (
                    <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
                ) : favorites.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>You have no favorite recipes.</p>
                ) : (
                    <div className="favorites-list">
                        {favorites.map(recipe => (
                            <div key={recipe.id} className="favorite-card">
                                {recipe.imageUrl && (
                                    <img
                                        src={recipe.imageUrl}
                                        alt={recipe.name}
                                        className="favorite-image"
                                    />
                                )}
                                <Link to={`/recipes/${recipe.id}`} className="favorite-name">
                                    {recipe.name}
                                </Link>
                                <p className="favorite-category">
                                    <strong>Category:</strong> {recipe.category}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Favorites;
