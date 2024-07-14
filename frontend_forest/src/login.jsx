import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ setIsLoggedIn }) => {
    const [formData, setformData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const { username, password } = formData;
        const user = { username, password };

        try {
            const { data } = await axios.post('http://127.0.0.1:8000/api/token/', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            localStorage.clear();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

            setIsLoggedIn(true);
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">Login Form</div>
                        <div className="card-body">
                            <form className="form form-group" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input
                                        id="username"
                                        type="text"
                                        className="form-control"
                                        value={formData.username}
                                        name="username"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={formData.password}
                                        name="password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <div className="align-items-end">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
