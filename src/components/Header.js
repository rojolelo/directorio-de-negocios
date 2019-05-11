import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <h1 className="header text-center nav-link">
            <Link to={"/"}>
                <span>Business Directory</span>
            </Link>
        </h1>
    );
};

export default Header;
