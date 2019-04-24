import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Footer extends Component {
    state = {}
    render() {
        return (
            <div className="footer text-right">
                <Link to={"/listadomoderacion"}>
                    <button type="button" className="btn btn-primary">Moderar</button>
                </Link>
            </div>
        );
    }
}

export default Footer;