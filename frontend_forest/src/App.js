import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DetailForm from './detail_form';
import AnusuchiForm from './anusuchi_form';
import RegisterForm from './register'; 
import LoginForm from './login';
import Navbar from './navbar';
import Dashboard from './dashboard';
const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
        window.location.href = '/api/login';
    };

    return (
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/api/detail_form" element={isLoggedIn ? <DetailForm /> : <Navigate to="/api/login" />} />
                <Route path="/api/anusuchi_form" element={isLoggedIn ? <AnusuchiForm /> : <Navigate to="/api/login" />} />
                <Route path="/api/register" element={<RegisterForm />} />
                <Route path="/api/login" element={ isLoggedIn ? <Navigate to="/api/dashboard" /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="api/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/api/login" />} /> 
                <Route path="/" element={isLoggedIn ? <Navigate to="api/dashboard" /> : <Navigate to="/api/login" />} /> 
            </Routes>
        </BrowserRouter>
    );
};

export default App;
