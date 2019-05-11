import React, { Component } from "react";
import { Link } from "react-router-dom";

class BotonAdd extends Component {
    render() {
        return (
            <div className="botonAdd text-center alert alert-warning">
                <p className="texto-botonAdd">
                    Can't find your business in the list?
                </p>
                <Link to={"/add"}>
                    <button className="add-button">Add </button>
                </Link>
            </div>
        );
    }
}

export default BotonAdd;
