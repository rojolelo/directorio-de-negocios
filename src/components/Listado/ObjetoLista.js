import React, { Component } from "react";

class ObjetoLista extends Component {
    state = {
        mostrarInfo: false
    };

    mostrarInfo = () => {
        this.setState((prevState, props) => ({
            mostrarInfo: !prevState.mostrarInfo
        }));
    };

    infoExtra = () => {
        //DATOS SE OBTIENEN DE UN PROPS.OBJETO
        const {
            nombre,
            paginaweb,
            telefono1,
            telefono2,
            correo,
            descripcion,
            direccion
        } = this.props.objeto;

        if (!this.state.mostrarInfo) return null;

        return (
            <tr>
                <td className="info1" colSpan="1">
                    <div className="info-div-1">
                        <h3>{nombre}</h3>
                        <p>{paginaweb}</p>
                    </div>
                </td>
                <td className="info2" colSpan="2">
                    <div className="info-div-2">
                        <p>Phone Number 1: {telefono1} </p>
                        <p>Phone Number 2: {telefono2}</p>
                        <p>Email: {correo}</p>
                    </div>
                </td>
                <td className="info3" colSpan="2">
                    <div className="info-div-3">
                        <p>Description: </p>
                        <p>{descripcion} </p>
                        <p>Address: </p>
                        <p>{direccion} </p>
                    </div>
                </td>
            </tr>
        );
    };

    render() {
        const { nombre, ciudad, categoria } = this.props.objeto;
        let { estado } = this.props.objeto;
        let estadoUpper = estado.slice(0, 1).toUpperCase() + estado.slice(1);
        return (
            <React.Fragment>
                <tr className="objeto">
                    <td className="objeto-nombre">{nombre} </td>
                    <td className="objeto-estado">{estadoUpper}</td>
                    <td className="objeto-ciudad">{ciudad}</td>
                    <td className="objeto-categoria">{categoria}</td>
                    <td className="objeto-informacion">
                        <button
                            className="objeto-button"
                            onClick={this.mostrarInfo}
                        >
                            Info
                        </button>
                    </td>
                </tr>
                {this.infoExtra()}
            </React.Fragment>
        );
    }
}

export default ObjetoLista;
