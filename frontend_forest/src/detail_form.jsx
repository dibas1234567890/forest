import React, { useState, useEffect } from "react";
import axios from "axios";

const DetailForm = () => {
    const [formData, setFormData] = useState({
        wood_species: '',
        anusuchi_cha_no: ''
    });
    const [options, setOptions] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/detail_form')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setOptions(response.data);
                    console.log(response.data)
                } else {
                    console.error('API response is not an array:', response.data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the options!', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/detail_form', formData)
            .then(response => {
                console.log(response.data);
                setFormData({ wood_species: '', anusuchi_cha_no: '' });
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Wood Species:</label>
                <input
                    type="text"
                    name="wood_species"
                    value={formData.wood_species}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Anusuchi Cha No.:</label>
                <select
                    name="anusuchi_cha_no"
                    value={formData.anusuchi_cha_no}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select an option</option>
                    {options.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.option_name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default DetailForm;
