import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { urlConfig } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';

function LoginPage() {

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  const { setUserName, setIsLoggedIn} = useAppContext();
  const [showErr, setShowErr] = useState('');

  async function handleLogin() {
    try {
      const response = await axios.post(`${urlConfig.backendUrl}/api/auth/login`, user);
      const data = await response.data;


      sessionStorage.setItem('auth-token', data.accessToken);
      sessionStorage.setItem('name', data.user.firstName);
      sessionStorage.setItem('email', data.user.email);
      setUserName(user.firstName + ' ' + user.lastName);
      setIsLoggedIn(true);
      navigate('/app');
    }
    catch (e) {
      setUser({
        ...user,
        password: ''
      })
      setShowErr(e.response.data.message ?? 'Try again');
      console.log(e);
    }
  }

  return (
    <div className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="p-4 border rounded">
            <h2 className="text-center mb-4 font-weight-bold">Login</h2>

            <input value={user.email} name='email'  placeholder='Email' className='form-input' type='text' onChange={(ev) => { setUser({ ...user, email: ev.target.value }) }} />
            <input value={user.password} name='password' placeholder='Password' className='form-input' type='password' onChange={(ev) => { setUser({ ...user, password: ev.target.value }) }} />

            <button className='form-button' onClick={handleLogin}>Login</button>

            <p className="mt-4 text-center">
              New here? <a href="/app/register">Register Here</a>
            </p>

                <div className="text-danger text-center">{showErr}</div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;