import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import AdminRegister from './components/AdminRegister';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import EditRecipe from './components/EditRecipe';
import CreateRecipe from './components/CreateRecipe';
import PendingAdmins from './components/PendingAdmins';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import PrivateRoute from './PrivateRoute';

const App = () => {
    return (
        <Router>
            <NavBar />
            <div className="container" style={{ padding: '1rem' }}>
                <Routes>
                    {/* Home now shows the RecipeList */}
                    <Route path="/" element={<RecipeList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register/admin" element={<AdminRegister />} />
                    <Route path="/recipes" element={<RecipeList />} />
                    <Route path="/recipes/:id" element={<RecipeDetail />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route
                        path="/edit-recipe/:id"
                        element={
                            <PrivateRoute roles={['Admin']}>
                                <EditRecipe />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/create-recipe"
                        element={
                            <PrivateRoute roles={['Admin']}>
                                <CreateRecipe />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/pending-admins"
                        element={
                            <PrivateRoute roles={['Admin']}>
                                <PendingAdmins />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
