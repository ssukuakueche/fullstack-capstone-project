import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

    const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();
    const navigate = useNavigate();
    useEffect(() => {
        const authTokenFromSession = sessionStorage.getItem('auth-token');
        const nameFromSession = sessionStorage.getItem('name');
        if (authTokenFromSession) {
            if (isLoggedIn && nameFromSession) {
                setUserName(nameFromSession);
            } else {
                sessionStorage.removeItem('auth-token');
                sessionStorage.removeItem('name');
                sessionStorage.removeItem('email');
                setIsLoggedIn(false);
            }
        }
    }, [isLoggedIn, setIsLoggedIn, setUserName])
    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        setIsLoggedIn(false);
        navigate(`/app`);
    }
    const profileSecton = () => {
        navigate(`/app/profile`);
    }
    return (
        <nav className="container navbar">
            <a className='logo' href="/app">
                Gift<span>Link</span>
            </a>
            <ul className="navbar-items">
                <a href='/home.html'>Home</a>
                <a href='/app'>Gifts</a>
                <a href='/app/search'>Search</a>
            </ul>
            <ul className="navbar-nv">
                {isLoggedIn ? (
                    <>
                        <li className="nav-item"> <span className="nav-link" style={{ color: "black", cursor: "pointer" }} onClick={profileSecton}>Welcome, {userName}</span> </li>
                        <li className="nav-item"><button className="nav-link login-btn" onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link login-btn" to="/app/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link register-btn" to="/app/register">Register</Link>
                        </li>
                    </>
                )
                }
            </ul>
        </nav>
    );
}
