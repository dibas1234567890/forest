import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const token = localStorage.getItem('access_token');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const getCsrfToken = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/csrf_token', {
                withCredentials: true
            });
            return response.data.csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            setError('Error fetching CSRF token');
            return null;
        }
    };

    useEffect(() => {
        

        if(token === null){                   
            window.location.href = '/api/login'
            
        } 
        else{ 
        const fetchData = async () => {
            const csrfToken = await getCsrfToken()
            try {
                

                
                const response = await axios.get('http://127.0.0.1:8000/api/dashboard', {
                    headers: {
                        'X-CSRFToken': csrfToken,

                        'Authorization': `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }}, [token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name} - {item.value}</li> 
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
