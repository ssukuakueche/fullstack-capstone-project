import React, { useState } from 'react';

import './RegisterPage.css';
import axios from 'axios';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    const {setIsLoggedIn, setUserName } = useAppContext();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const [showerr, setShowerr] = useState('');

    async function handleRegister() {
        try{
            const response = await axios.post(`${urlConfig.backendUrl}/api/auth/register`, user);
            const data = response.data;

            sessionStorage.setItem('auth-token', data.accessToken);
            sessionStorage.setItem('name', data.user.name);
            sessionStorage.setItem('email', data.user.email);
            setUserName(data.user.name);
            setIsLoggedIn(true);
            navigate('/app');
            
        }
        catch(e)
        {
            setShowerr(e.response.data.message ?? 'Try again')
            console.log(e);
        }
    }

    return (
        <div className="mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className=" p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        <input placeholder='First name' name='first-name' className='form-input' type='text' onChange={(ev)=>{setUser({...user, firstName: ev.target.value})}} />
                        <input placeholder='Last name'  name='last-name' className='form-input' type='text' onChange={(ev)=>{setUser({...user, lastName: ev.target.value})}} />
                        <input placeholder='Email' name='email' className='form-input' type='email' onChange={(ev)=>{setUser({...user, email: ev.target.value})}} />
                        <input placeholder='Password' name='password' className='form-input' type='password' onChange={(ev)=>{setUser({...user, password: ev.target.value})}} />

                        <button className='form-button' onClick={handleRegister}>Register</button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login">Login</a>
                        </p>

                        <div className="text-danger text-center">{showerr}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterPage;