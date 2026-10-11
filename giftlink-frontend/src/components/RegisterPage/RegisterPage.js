import React, { useState } from 'react';

import './RegisterPage.css';

function RegisterPage() {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    function handleRegister() {
        console.log(user);
    }

    return (
        <div className="mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className=" p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        <input placeholder='First name' className='form-input' type='text' onChange={(ev)=>{setUser({...user, firstName: ev.target.value})}} />
                        <input placeholder='Last name'  className='form-input' type='text' onChange={(ev)=>{setUser({...user, lastName: ev.target.value})}} />
                        <input placeholder='Email' className='form-input' type='email' onChange={(ev)=>{setUser({...user, email: ev.target.value})}} />
                        <input placeholder='Password' className='form-input' type='password' onChange={(ev)=>{setUser({...user, password: ev.target.value})}} />

                        <button className='form-button' onClick={handleRegister}>Register</button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login">Login</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>

    )//end of return
}

export default RegisterPage;