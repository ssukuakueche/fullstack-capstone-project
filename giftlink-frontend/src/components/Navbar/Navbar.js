import React from 'react';

export default function Navbar() {
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
        </nav>
    );
}
