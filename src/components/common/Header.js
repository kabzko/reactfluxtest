import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <nav>
            <NavLink to="/" activeclassname="active">Home</NavLink> |  
            <NavLink to="/courses" activeclassname="active">Course</NavLink> |
            <NavLink to="/about" activeclassname="active">About</NavLink>
        </nav>
    )
}

export default Header;