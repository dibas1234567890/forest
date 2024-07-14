import React, { useState, useEffect } from "react";
import axios from "./axios_auth";

const AnusuchiForm = () => {
    const token = localStorage.getItem('access_token');
   
    const [formData, setFormData] = useState({
                    
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
        
        const fetchDetails = async () => {
            setLoading(true);
            const csrfToken = await getCsrfToken();
            if (!csrfToken) return;

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/detail_form', {
                    headers: {
                        'X-CSRFToken': csrfToken,
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setOptions(response.data);  
            } catch (error) {
                console.error('Error fetching details:', error);
                setError('Error fetching details');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
 } }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = await getCsrfToken(); 

        if (!csrfToken) return;

        try {
            const postResponse = await axios.post('http://127.0.0.1:8000/api/detail_form', formData, {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Authorization': `Token ${token}`,
                },
                withCredentials: true,
            });

            console.log(postResponse.data);
            setFormData({
                    minstry_name: '',
                    division_forest_office: '',  
                    division_forest_office_location: '',
                    cha_no: '',
                    date: '',
                    applicant_name: '',
                    sub_division_department: '',
                    ghatgaddhi_place_name: '',
                    lot_number: '',
                    fiscal_year: '',  
                    notice_published_date: '',
                    decision_date: '',
                    bid_price: '',  
                    last_date_to_receive: '',
                    measured_date: '',
                    forest_department: '',
                    truck_number: '',
                    seal_number: '',
                    days_to_pick_up: '',  
                    last_date_to_pick_up: '',
                    cc_division_forest_office: '',
                    cc_sub_division_forest_office: '',
                    cc_finance_dept_division_forest_office: '',
                    DFO_officer_signature: '',  
            });

        } catch (error) {
            console.error('Error submitting the form:', error);
            setError('There was an error submitting the form!');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header text-center">
                            Form
                        </div>
                        <div className="card-body">
                            <script src="/static/js/jSignature.min.js"></script>
                            <script src="/static/js/django_jsignature.js"></script>

                            <form action="" method="post" id="details_form">
                                <input type="hidden" name="csrfmiddlewaretoken" value="jTCoGog0XF938HdI0g5Xo6grdiqBg6HvhAs1PGH94Zy0gOpPhrr01GAsY0J3as10" />

                                <table>
                                    <tbody>
                                        <tr>
                                            <th><label htmlFor="id_division_forest_office">Division forest office:</label></th>
                                            <td>
                                                <select name="division_forest_office" required id="id_division_forest_office">
                                                    <option value="" selected>---------</option>
                                                    <option value="1">Bhojpur</option>
                                                    <option value="2">Dhankuta</option>
                                                    <option value="3">Ilam</option>
                                                    {/* Add other options here */}
                                                    <option value="77">Kanchanpur</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_division_forest_office_location">Division forest office location:</label></th>
                                            <td>
                                                <input type="text" name="division_forest_office_location" required id="id_division_forest_office_location" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_cha_no">Cha no:</label></th>
                                            <td>
                                                <input type="text" name="cha_no"required id="id_cha_no" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_date">Date:</label></th>
                                            <td>
                                                <input type="date" name="date" id="id_date" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_applicant_name">Applicant name:</label></th>
                                            <td>
                                                <input type="text" name="applicant_name"  required id="id_applicant_name" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_sub_division_department">Sub division department:</label></th>
                                            <td>
                                                <input type="text" name="sub_division_department"  required id="id_sub_division_department" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_ghatgaddhi_place_name">Ghatgaddhi place name:</label></th>
                                            <td>
                                                <input type="text" name="ghatgaddhi_place_name"  required id="id_ghatgaddhi_place_name" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_lot_number">Lot number:</label></th>
                                            <td>
                                                <input type="text" name="lot_number"  required id="id_lot_number" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_fiscal_year">Fiscal year:</label></th>
                                            <td>
                                                <select name="fiscal_year" required id="id_fiscal_year">
                                                    <option value="" selected>---------</option>
                                                    <option value="70/71">70/71</option>
                                                    <option value="71/72">71/72</option>
                                                    {/* Add other options here */}
                                                    <option value="90/91">90/91</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_notice_published_date">Notice published date:</label></th>
                                            <td>
                                                <input type="date" name="notice_published_date" id="id_notice_published_date" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_decision_date">Decision date:</label></th>
                                            <td>
                                                <input type="date" name="decision_date" id="id_decision_date" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_bid_price">Bid price:</label></th>
                                            <td>
                                                <input type="number" name="bid_price" step="any" required id="id_bid_price" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_last_date_to_receive">Last date to receive:</label></th>
                                            <td>
                                                <input type="date" name="last_date_to_receive" id="id_last_date_to_receive" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_measured_date">Measured date:</label></th>
                                            <td>
                                                <input type="date" name="measured_date" id="id_measured_date" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_forest_department">Forest department:</label></th>
                                            <td>
                                                <input type="text" name="forest_department"  required id="id_forest_department" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_truck_number">Truck number:</label></th>
                                            <td>
                                                <input type="text" name="truck_number"  required id="id_truck_number" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_seal_number">Seal number:</label></th>
                                            <td>
                                                <input type="text" name="seal_number" required id="id_seal_number" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_days_to_pick_up">Days to pick up:</label></th>
                                            <td>
                                                <input type="number" name="days_to_pick_up" required id="id_days_to_pick_up" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_last_date_to_pick_up">Last date to pick up:</label></th>
                                            <td>
                                                <input type="date" name="last_date_to_pick_up" id="id_last_date_to_pick_up" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_cc_division_forest_office">Cc division forest office:</label></th>
                                            <td>
                                                <input type="text" name="cc_division_forest_office"  required id="id_cc_division_forest_office" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_cc_sub_division_forest_office">Cc sub division forest office:</label></th>
                                            <td>
                                                <input type="text" name="cc_sub_division_forest_office"  required id="id_cc_sub_division_forest_office" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_cc_finance_dept_division_forest_office">Cc finance dept division forest office:</label></th>
                                            <td>
                                                <input type="text" name="cc_finance_dept_division_forest_office"  required id="id_cc_finance_dept_division_forest_office" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="id_DFO_officer_signature">Dfo officer signature:</label></th>
                                            <td>
                                                <div className='jsign-wrapper'>
                                                    <input type="hidden" name="DFO_officer_signature" value="[]" required id="id_DFO_officer_signature" />
                                                    <div id='jsign_DFO_officer_signature'
                                                        data-config='{"width": "ratio", "height": "ratio", "color": "#000", "background-color": "#FFF", "decor-color": "#DDD", "lineWidth": 0, "UndoButton": false, "ResetButton": true}'
                                                        data-initial-value='[]'
                                                        className='jsign-container'></div>
                                                    <input type='button' value='Reset' className="btn" />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <button type="submit">Submit Form</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default AnusuchiForm;
