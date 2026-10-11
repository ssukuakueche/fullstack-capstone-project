import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    // insert code here to create handleLogin function and include console.log
    function handleLogin()
    {
        console.log(user);
    }

        return (
      <div className="mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="p-4 border rounded">
              <h2 className="text-center mb-4 font-weight-bold">Login</h2>

          {/* insert code here to create input elements for the variables email and  password */}
          <input placeholder='Email' className='form-input' type='text' onChange={(ev)=>{setUser({...user, email: ev.target.value})}} />
          <input placeholder='Password' className='form-input' type='password' onChange={(ev)=>{setUser({...user, password: ev.target.value})}} />
 
            <button className='form-button' onClick={handleLogin}>Login</button>
                <p className="mt-4 text-center">
                    New here? <a href="/app/register">Register Here</a>
                </p>

            </div>
          </div>
        </div>
      </div>
    )
}

export default LoginPage;