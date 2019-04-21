import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (

        <h1 className="header text-center nav-link"><Link to={"/"}><span>Listado de Negocios y Empresas</span></Link></h1>

    );
}

export default Header;
