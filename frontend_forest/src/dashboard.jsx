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

    const downloadFile = async () => {
        const csrfToken = await getCsrfToken();
        fetch('http://127.0.0.1:8000/api/pdf', {
            method: 'GET',
            headers: {
                'X-CSRFToken': csrfToken,
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); 
        })
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf'); 
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link); 
        })
        .catch(error => console.error('There was an error!', error));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setError('User is not logged in');
                return;
            }
            const csrfToken = await getCsrfToken();
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
    }, [token]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1 className='h1'>Dashboard</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Wood Species</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Dimension</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.wood_species || 'No wood species'}</td>  
                                    <td>{item.quantity || 'No quantity'}</td>
                                    <td>{item.dimension || 'No dimension'}</td>
                                    <td>{item.total_amount || 'No total amount'}</td>
                                    <td>
                                        <button className='btn btn-success' onClick={downloadFile}>
                                            PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
