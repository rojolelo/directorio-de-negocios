import React, { Component } from 'react';
import { Link } from "react-router-dom";

class BotonAdd extends Component {



    render() {
        return (
            <div className="botonAdd text-center alert alert-warning">
                <p className="texto-botonAdd">¿No encuentras tu empresa en la lista?</p>
                <Link to={"/add"}>
                    <button className="add-button">Añadir </button>
                </Link>

            </div>
        );
    }
}

export default BotonAdd;

