import React from 'react';
import AnusuchiForm from './anusuchi_form';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route,  Routes } from 'react-router-dom';
import DetailForm from './detail_form';

export default function Test(){
  return (
    <React.StrictMode>
    <App />
  </React.StrictMode> )
}
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Test />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
