import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    };

    return (
        <BrowserRouter>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
                <Route path="/api/detail_form" element={isLoggedIn ? <DetailForm /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/api/anusuchi_form" element={isLoggedIn ? <AnusuchiForm /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/api/register" element={<RegisterForm />} />
                <Route path="/api/login" element={isLoggedIn ? <Dashboard /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/api/dashboard" element={isLoggedIn ? <Dashboard /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} /> 
                <Route path="/" element={isLoggedIn ? <Dashboard /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />} /> 
            </Routes>
        </BrowserRouter>
    );
};

export default App;
