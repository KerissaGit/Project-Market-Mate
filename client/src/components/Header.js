import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <h1>Market Mate</h1>
            <nav className="nav-bar">
                <ul className="nav-links">
                    <li>
                        <NavLink to="/" className="nav-link" end>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/users" className="nav-link">Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/groceries" className="nav-link">Groceries</NavLink>
                    </li>
                    <li>
                        <NavLink to="/deli" className="nav-link">Deli</NavLink>
                    </li>
                    <li>
                        <NavLink to="/itemscart" className="nav-link">Your Cart</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
