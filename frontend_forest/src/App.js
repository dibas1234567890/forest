import React from 'react';
import DetailForm from './detail_form';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AnusuchiForm from './anusuchi_form';
import RegisterForm from './register'
const App = () => {
    return (
        <BrowserRouter>
       
        <Routes>
        <Route path="/api/detail_form" element={<DetailForm/>}/>
        <Route path="/api/anusuchi_form" element={<AnusuchiForm/>}/>
        <Route path="/api/register" element={<RegisterForm/>}/>
        
        </Routes>
      </BrowserRouter>
    );
};

export default App;
