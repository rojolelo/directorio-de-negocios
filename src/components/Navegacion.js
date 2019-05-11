import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navegacion extends Component {
    navegacion = () => {
        // RECIBIR PAGINA ACTUAL, Y ULTIMA PAGINA

        let paginaActual = this.props.paginaActual;
        const paginaFinal = this.props.paginaFinal;

        if (paginaActual === "") paginaActual = 1;

        if (!Boolean(paginaActual)) return null;
        if (!Boolean(paginaFinal)) return null;

        let paginaAnterior;
        let paginaSiguiente;

        if (paginaActual <= 2) {
            paginaAnterior = "";
            paginaSiguiente = paginaActual + 1;
        } else {
            paginaAnterior = paginaActual - 1;
            paginaSiguiente = paginaActual + 1;
        }

        if (paginaActual === paginaFinal) paginaSiguiente = paginaActual;

        if (paginaActual === paginaFinal && paginaFinal === 1)
            paginaSiguiente = "";

        return (
            <ul className="nav nav-pills justify-content-center">
                <li className="nav-item">
                    <Link to={`/${paginaAnterior}`} className="nav-link">
                        Previous
                    </Link>
                </li>
                <li className="nav-item">
                    <span className="nav-link">{paginaActual}</span>
                </li>
                <li className="nav-item">
                    <Link to={`/${paginaSiguiente}`} className="nav-link">
                        Next
                    </Link>
                </li>
            </ul>
        );
    };

    render() {
        return <React.Fragment>{this.navegacion()}</React.Fragment>;
    }
}

export default Navegacion;
