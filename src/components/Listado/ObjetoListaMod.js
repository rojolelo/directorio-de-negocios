import React, { Component } from 'react';

class ObjetoListaMod extends Component {
    state = {
        mostrarInfo: true
    }

    mostrarInfo = () => {
        this.setState((prevState, props) => ({
            mostrarInfo: !prevState.mostrarInfo
        }))
    }

    aceptar = () => {
        const { nombre, estado, ciudad, categoria, paginaweb, telefono1, telefono2, correo, descripcion, direccion, key } = this.props.objeto;
        const datos = {
            nombre,
            estado,
            ciudad,
            categoria,
            telefono1,
            telefono2,
            correo,
            paginaweb,
            descripcion,
            direccion,
            key            
        }

        

        this.props.aceptar(datos);
    }

    borrar = () => {
        const { nombre, estado, ciudad, categoria, paginaweb, telefono1, telefono2, correo, descripcion, direccion, key } = this.props.objeto;
        const datos = {
            nombre,
            estado,
            ciudad,
            categoria,
            telefono1,
            telefono2,
            correo,
            paginaweb,
            descripcion,
            direccion,
            key
        }

        this.props.borrar(datos);
    }

    infoExtra = () => {

        //DATOS SE OBTIENEN DE UN PROPS.OBJETO
        const { nombre, paginaweb, telefono1, telefono2, correo, descripcion, direccion } = this.props.objeto;

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
                        <p>Telefono 1: {telefono1} </p>
                        <p>Telefono 2: {telefono2}</p>
                        <p>Correo: {correo}</p>
                    </div>
                </td>
                <td className="info3" colSpan="2">
                    <div className="info-div-3">
                        <p>Descripcion: </p>
                        <p>{descripcion} </p>
                        <p>Direccion: </p>
                        <p>{direccion} </p>
                    </div>
                </td>
            </tr>
        )
    }

    render() {
        const { nombre, estado, ciudad, categoria } = this.props.objeto;
        return (
            <React.Fragment>
                <tr className="objeto">
                    <td className="objeto-nombre">{nombre} </td>
                    <td className="objeto-estado">{estado}</td>
                    <td className="objeto-ciudad">{ciudad}</td>
                    <td className="objeto-categoria">{categoria}</td>
                    <td className="objeto-informacion">
                        <button className="objeto-button" onClick={this.mostrarInfo}>Info</button>
                        <button className="objeto-button" onClick={this.aceptar}>Aceptar</button>
                        <button className="objeto-button" onClick={this.borrar}>Borrar</button>
                    </td>

                </tr>
                {this.infoExtra()}
            </React.Fragment>
        );
    }
}


export default ObjetoListaMod;