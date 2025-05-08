import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Header() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        fetch('/me', { credentials: 'include' })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(user => setLoggedInUser(user))
        .catch(() => setLoggedInUser(null));
    }, []);

    function logoutUser() {
        fetch('/logout', { method: 'DELETE', credentials: 'include' })
        .then(() => setLoggedInUser(null));
    }

    const isRoot = location.pathname === "/";


    return (
        <>
            <header className="header">
                <h1>Market Mate</h1>
                <nav className="nav-bar">
                    <ul className="nav-links">
                        <li><NavLink to="/" className="nav-link" end>Home</NavLink></li>
                        <li><NavLink to="/groceries" className="nav-link">Groceries</NavLink></li>
                        <li><NavLink to="/deli" className="nav-link">Deli</NavLink></li>
                        <li><NavLink to="/itemscart" className="nav-link">Your Cart</NavLink></li>
                        {!loggedInUser && (
                            <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
                        )}
                        {loggedInUser && (
                            <>
                            <li>
                                {/* <NavLink to="/users" className="nav-link">User</NavLink> */}
                                <button onClick={logoutUser} className="nav-logout-button">Logout</button>
                            </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;
