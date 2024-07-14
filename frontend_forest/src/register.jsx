import React, { useState, useEffect } from "react";
import axios from "axios";


const RegisterForm = () => {
    const [error, setError] = useState('');
    const [formData,setformData] = useState({
         username:'',
         email:'', 
         password:''
    })

    const [searchString, setSearchString] = useState();


    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log(formData)

        const response = await axios.post('http://127.0.0.1:8000/api/register', formData)
        .then(response => {
            console.log(response.data) 
                setformData({
                    username:'',
                    email:'', 
                    password:'',
                })
       
            
        })

    }


return(
    <div className="container">
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        Registration Form
                    </div>
                    <div className="card-body">
                        <form action="" className="form form-group" onSubmit={handleSubmit}>
                        <div>
                                <label htmlFor="username">Username</label>
                                <input id="username" type="text" className="form-control" value={formData.username} name="username" onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control"   value={formData.email} name="email" onChange={handleChange}/>
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" className="form-control"  value={formData.password} name="password" onChange={handleChange}/>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
)


}

export default RegisterForm;