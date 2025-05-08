import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function Header({ logoutUser, user }) {
    const location = useLocation();

    return (
        <header className="header">
            <h1>Market Mate</h1>
            <nav className="nav-bar">
                <ul className="nav-links">
                    <li><NavLink to="/" className="nav-link" end>Home</NavLink></li>

                    {user && (
                        <>
                            <li><NavLink to="/groceries" className="nav-link">Groceries</NavLink></li>
                            <li><NavLink to="/deli" className="nav-link">Deli</NavLink></li>
                            <li><NavLink to="/itemscart" className="nav-link">Your Cart</NavLink></li>
                        </>
                    )}

                    {!user ? (
                        <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
                    ) : (
                        <li>
                            <button onClick={logoutUser} className="nav-logout-button">Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
