import React from 'react';
import DetailForm from './detail_form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <div>
            <Router>
                <Routes path = 'api/detail_form' element = {<DetailForm/>}/>
            </Router>
        </div>
    );
};

export default App;
