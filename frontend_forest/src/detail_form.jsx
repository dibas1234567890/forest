import React, { useState, useEffect } from "react";
import axios from "axios";

const DetailForm = () => {
    const [formData, setformData] = useState({
        wood_species: '',
        quantity: '',
        dimension: '',
        total_amount: '',
        stamp_टाँचा_description: '',
        seal_description: '',
        remarks: '',
        anusuchi_cha_no: ''
    });
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getCsrfToken = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/csrf_token', {
                withCredentials: true
            });
            return response.data.csrfToken;
        } catch (error) {
            console.error('There was an error fetching the CSRF token!', error);
            setError('There was an error fetching the CSRF token!');
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                setLoading(false);
                return;
            }

            axios.get('http://127.0.0.1:8000/api/detail_form', {
                headers: {
                    'X-CSRFToken': csrfToken
                },
                withCredentials: true
            })
            .then(response => {
                if (Array.isArray(response.data)) {
                    setOptions(response.data);
                    console.log(response.data);
                } else {
                    console.error('API response is not an array:', response.data);
                    setError('Failed to load options.');
                }
            })
            .catch(error => {
                console.error('There was an error fetching the options!', error);
                setError('There was an error fetching the options!');
            })
            .finally(() => {
                setLoading(false);
            });
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/detail_form', formData)
            .then(response => {
                console.log(response.data);
                setformData({   wood_species: '',
                    quantity: '',
                    dimension: '',
                    total_amount: '',
                    stamp_टाँचा_description: '',
                    seal_description: '',
                    remarks: '',
                    anusuchi_cha_no: ''});
            })
            .catch(error => {
                console.error('There was an error!', error);
                setError('There was an error submitting the form!');
            });
    };

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    return (
        
        <div className="container">
            <p className="h1">Detail Form</p>
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        Please Fill The Form Below
                    </div>
                    <div className="card-body">
                        <form className="form form-group" onSubmit={handleSubmit}>
                            <div>
                                <label className="form-label">Wood Species:</label>
                                <input className="form-control" 
                                    type="text"
                                    name="wood_species"
                                    value={formData.wood_species}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Quantity:</label>
                                <input className="form-control"
                                    type="text"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Dimension:</label>
                                <input className="form-control"
                                    type="text"
                                    name="dimension"
                                    value={formData.dimension}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Total Amount:</label>
                                <input className="form-control"
                                    type="number"
                                    name="total_amount"
                                    value={formData.total_amount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Stamp Description:</label>
                                <input className="form-control"
                                    type="text"
                                    name="stamp_टाँचा_description"
                                    value={formData.stamp_टाँचा_description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Seal Description:</label>
                                <input className="form-control"
                                    type="text"
                                    name="seal_description"
                                    value={formData.seal_description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Remarks:</label>
                                <input className="form-control"
                                    type="text"
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Anusuchi Form ID:</label>
                                <select className="form-select"
                                    name="anusuchi_cha_no"
                                    value={formData.anusuchi_cha_no}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select an option</option>
                                    {options.map(option => (
                                        <option key={option.id} value={option.id}>
                                            {option.anusuchi_cha_no}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="div mt-2">
                            <button type="submit" className="btn btn-primary">Submit</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
    
}

export default DetailForm;
