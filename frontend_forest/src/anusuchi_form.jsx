import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SignaturePad from './SignaturePad'



const AnusuchiForm = () => {
    const [formData, setFormData] = useState({
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
        DFO_officer_signature: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [signatureData, setSignatureData] = useState(null);
    const [isSignatureCaptured, setIsSignatureCaptured] = useState(false);
    const hiddenInputRef = useRef(null);  


    const handleSignatureSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post("/api/signatures/", {
            DFO_officer_signature: signatureData,
          });
    
          if (response.status === 201) { 
            console.log("Signature saved successfully!");
            
          } else {
            console.error("Failed to save signature:", response.data);
          }
        } catch (error) {
          console.error("Error saving signature:", error);
        }
      };

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

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/anusuchi_form', {
                    headers: {
                        'X-CSRFToken': csrfToken
                    },
                    withCredentials: true
                });
                // Handle the response data if needed
            } catch (error) {
                console.error('There was an error fetching the data!', error);
                setError('There was an error fetching the data!');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = await getCsrfToken();
            if (!csrfToken) {
                return;
            }

            const updatedFormData = { ...formData, DFO_officer_signature: JSON.stringify(signatureData) };


         


            await axios.post('http://127.0.0.1:8000/api/anusuchi_form',   updatedFormData, {
                headers: {
                    'X-CSRFToken': csrfToken
                },
                withCredentials: true, 
            });

            console.log('Form submitted successfully');
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
            console.error('There was an error submitting the form!', error);
            setError('There was an error submitting the form!');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
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
                            <form onSubmit={handleSubmit}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th><label htmlFor="division_forest_office">Division forest office:</label></th>
                                            <td>
                                                <select name="division_forest_office" required id="division_forest_office" value={formData.division_forest_office} onChange={handleInputChange}>
                                                    <option value="" disabled>---------</option>
                                                    <option value="1">Bhojpur</option>
                                                    <option value="Dhankuta">Dhankuta</option>
                                                    <option value="Ilam">Ilam</option>
                                                    <option value="Jhapa">Jhapa</option>
                                                    <option value="Khotang">Khotang</option>
                                                    <option value="Morang">Morang</option>
                                                    <option value="Okhaldhunga">Okhaldhunga</option>
                                                    <option value="Panchthar">Panchthar</option>
                                                    <option value="Sankhuwasabha">Sankhuwasabha</option>
                                                    <option value="Solukhumbu">Solukhumbu</option>
                                                    <option value="Sunsari">Sunsari</option>
                                                    <option value="Taplejung">Taplejung</option>
                                                    <option value="Terhathum">Terhathum</option>
                                                    <option value="Udayapur">Udayapur</option>
                                                    <option value="Bara">Bara</option>
                                                    <option value="Dhanusa">Dhanusa</option>
                                                    <option value="Mahottari">Mahottari</option>
                                                    <option value="Parsa">Parsa</option>
                                                    <option value="Rautahat">Rautahat</option>
                                                    <option value="Saptari">Saptari</option>
                                                    <option value="Sarlahi">Sarlahi</option>
                                                    <option value="Siraha">Siraha</option>
                                                    <option value="Bhaktapur">Bhaktapur</option>
                                                    <option value="Chitwan">Chitwan</option>
                                                    <option value="Dhading">Dhading</option>
                                                    <option value="Dolakha">Dolakha</option>
                                                    <option value="Kathmandu">Kathmandu</option>
                                                    <option value="Kavrepalanchok">Kavrepalanchok</option>
                                                    <option value="Lalitpur">Lalitpur</option>
                                                    <option value="Makawanpur">Makawanpur</option>
                                                    <option value="Nuwakot">Nuwakot</option>
                                                    <option value="Ramechhap">Ramechhap</option>
                                                    <option value="Rasuwa">Rasuwa</option>
                                                    <option value="Sindhuli">Sindhuli</option>
                                                    <option value="Sindhupalchok">Sindhupalchok</option>
                                                    <option value="Baglung">Baglung</option>
                                                    <option value="Gorkha">Gorkha</option>
                                                    <option value="Kaski">Kaski</option>
                                                    <option value="Lamjung">Lamjung</option>
                                                    <option value="Manang">Manang</option>
                                                    <option value="Mustang">Mustang</option>
                                                    <option value="Myagdi">Myagdi</option>
                                                    <option value="Nawalparasi East">Nawalparasi East</option>
                                                    <option value="Parbat">Parbat</option>
                                                    <option value="Syangja">Syangja</option>
                                                    <option value="Tanahu District">Tanahu District</option>
                                                    <option value="Arghakhanchi">Arghakhanchi</option>
                                                    <option value="Banke">Banke</option>
                                                    <option value="Bardiya">Bardiya</option>
                                                    <option value="Dang">Dang</option>
                                                    <option value="Gulmi">Gulmi</option>
                                                    <option value="Kapilvastu">Kapilvastu</option>
                                                    <option value="Nawalparasi West">Nawalparasi West</option>
                                                    <option value="Palpa">Palpa</option>
                                                    <option value="Pyuthan">Pyuthan</option>
                                                    <option value="Rolpa">Rolpa</option>
                                                    <option value="Rukum East">Rukum East</option>
                                                    <option value="Rupandehi">Rupandehi</option>
                                                    <option value="Dailekh">Dailekh</option>
                                                    <option value="Dolpa">Dolpa</option>
                                                    <option value="Humla">Humla</option>
                                                    <option value="Jajarkot">Jajarkot</option>
                                                    <option value="Jumla">Jumla</option>
                                                    <option value="Kalikot">Kalikot</option>
                                                    <option value="Mugu">Mugu</option>
                                                    <option value="Rukum West">Rukum West</option>
                                                    <option value="Salyan">Salyan</option>
                                                    <option value="Surkhet">Surkhet</option>
                                                    <option value="Achham">Achham</option>
                                                    <option value="Baitadi">Baitadi</option>
                                                    <option value="Bajhang">Bajhang</option>
                                                    <option value="Bajura">Bajura</option>
                                                    <option value="Dadeldhura">Dadeldhura</option>
                                                    <option value="Darchula">Darchula</option>
                                                    <option value="Doti">Doti</option>
                                                    <option value="Kailali">Kailali</option>
                                                    <option value="Kanchanpur">Kanchanpur</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="division_forest_office_location">Division forest office location:</label></th>
                                            <td><input type="text" name="division_forest_office_location" id="division_forest_office_location" value={formData.division_forest_office_location} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="cha_no">Cha no:</label></th>
                                            <td><input type="text" name="cha_no" id="cha_no" value={formData.cha_no} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="date">Date:</label></th>
                                            <td><input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="applicant_name">Applicant name:</label></th>
                                            <td><input type="text" name="applicant_name" id="applicant_name" value={formData.applicant_name} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="sub_division_department">Sub division department:</label></th>
                                            <td><input type="text" name="sub_division_department" id="sub_division_department" value={formData.sub_division_department} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="ghatgaddhi_place_name">Ghatgaddhi place name:</label></th>
                                            <td><input type="text" name="ghatgaddhi_place_name" id="ghatgaddhi_place_name" value={formData.ghatgaddhi_place_name} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="lot_number">Lot number:</label></th>
                                            <td><input type="text" name="lot_number" id="lot_number" value={formData.lot_number} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="fiscal_year">Fiscal year:</label></th>
                                            <td>
                                                <select name="fiscal_year" required id="fiscal_year" value={formData.fiscal_year} onChange={handleInputChange}><option value="" selected>---------</option>

<option value="70/71">70/71</option>

<option value="71/72">71/72</option>

<option value="72/73">72/73</option>

<option value="73/74">73/74</option>

<option value="74/75">74/75</option>

<option value="75/76">75/76</option>

<option value="76/77">76/77</option>

<option value="77/78">77/78</option>

<option value="78/79">78/79</option>

<option value="79/80">79/80</option>

<option value="80/81">80/81</option>

<option value="81/82">81/82</option>

<option value="82/83">82/83</option>

<option value="83/84">83/84</option>

<option value="84/85">84/85</option>

<option value="85/86">85/86</option>

<option value="86/87">86/87</option>

<option value="87/88">87/88</option>

<option value="88/89">88/89</option>

<option value="89/90">89/90</option>

<option value="90/91">90/91</option></select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="notice_published_date">Notice published date:</label></th>
                                            <td><input type="date" name="notice_published_date" id="notice_published_date" value={formData.notice_published_date} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="decision_date">Decision date:</label></th>
                                            <td><input type="date" name="decision_date" id="decision_date" value={formData.decision_date} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="bid_price">Bid price:</label></th>
                                            <td><input type="number" name="bid_price" id="bid_price" value={formData.bid_price} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="last_date_to_receive">Last date to receive:</label></th>
                                            <td><input type="date" name="last_date_to_receive" id="last_date_to_receive" value={formData.last_date_to_receive} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="measured_date">Measured date:</label></th>
                                            <td><input type="date" name="measured_date" id="measured_date" value={formData.measured_date} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="forest_department">Forest department:</label></th>
                                            <td><input type="text" name="forest_department" id="forest_department" value={formData.forest_department} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="truck_number">Truck number:</label></th>
                                            <td><input type="text" name="truck_number" id="truck_number" value={formData.truck_number} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="seal_number">Seal number:</label></th>
                                            <td><input type="text" name="seal_number" id="seal_number" value={formData.seal_number} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="days_to_pick_up">Days to pick up:</label></th>
                                            <td><input type="number" name="days_to_pick_up" id="days_to_pick_up" value={formData.days_to_pick_up} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="last_date_to_pick_up">Last date to pick up:</label></th>
                                            <td><input type="date" name="last_date_to_pick_up" id="last_date_to_pick_up" value={formData.last_date_to_pick_up} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="cc_division_forest_office">CC Division forest office:</label></th>
                                            <td><input type="text" name="cc_division_forest_office" id="cc_division_forest_office" value={formData.cc_division_forest_office} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="cc_sub_division_forest_office">CC Sub division forest office:</label></th>
                                            <td><input type="text" name="cc_sub_division_forest_office" id="cc_sub_division_forest_office" value={formData.cc_sub_division_forest_office} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="cc_finance_dept_division_forest_office">CC Finance dept division forest office:</label></th>
                                            <td><input type="text" name="cc_finance_dept_division_forest_office" id="cc_finance_dept_division_forest_office" value={formData.cc_finance_dept_division_forest_office} onChange={handleInputChange} /></td>
                                        </tr>
                                        <tr>
                                            <th><label htmlFor="DFO_officer_signature">DFO officer signature:</label></th>
                                            <td> <input type="hidden" id="id_DFO_officer_signature" name="DFO_officer_signature" ref={hiddenInputRef}/>
                                            <SignaturePad  hiddenInputRef={hiddenInputRef} setSignatureData = {setSignatureData} onSignatureCapture={ (e)=> handleSignatureSubmit(e)}  /> </td>
                                        </tr> 
                                    </tbody>
                                </table>
                                <button type="submit" disabled={!signatureData} className="btn btn-primary">Submit</button>
                            </form>
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnusuchiForm;
