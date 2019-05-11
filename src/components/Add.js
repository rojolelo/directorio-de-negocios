import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class Add extends Component {
    nombreRef = React.createRef();
    estadoRef = React.createRef();
    ciudadRef = React.createRef();
    categoriaRef = React.createRef();
    telefono1Ref = React.createRef();
    telefono2Ref = React.createRef();
    correoRef = React.createRef();
    paginawebRef = React.createRef();
    descripcionRef = React.createRef();
    direccionRef = React.createRef();

    enviarInformacion = e => {
        e.preventDefault();

        const nombre = this.nombreRef.current.value;
        const estado = this.estadoRef.current.value;
        const ciudad = this.ciudadRef.current.value;
        const categoria = this.categoriaRef.value;
        const telefono1 = this.telefono1Ref.current.value;
        const telefono2 = this.telefono2Ref.current.value;
        const correo = this.correoRef.current.value;
        const paginaweb = this.paginawebRef.current.value;
        const descripcion = this.descripcionRef.current.value;
        const direccion = this.direccionRef.current.value;

        const datos = {
            nombre,
            estado,
            ciudad,
            categoria: "",
            telefono1,
            telefono2,
            correo,
            paginaweb,
            descripcion,
            direccion
        };

        if (
            nombre === "" ||
            estado === "" ||
            ciudad === "" ||
            categoria === "" ||
            direccion === "" ||
            descripcion === ""
        ) {
            Swal.fire({
                type: "error",
                title: "Oops...",
                text: "Please fill the needed fields."
            });
            return null;
        }

        Swal.fire(
            "Done!",
            "The information, will be soon be checked.",
            "success"
        );

        this.props.add(datos);

        e.currentTarget.reset();
    };

    render() {
        return (
            <div
                className="col justify-content-center alert alert-light"
                id="container"
            >
                <form
                    onSubmit={this.enviarInformacion}
                    className="form-horizontal"
                >
                    <div className="formulario form-group row ">
                        <label className="control-label col-sm-2">
                            Business Name:{" "}
                        </label>
                        <div className="col">
                            <input
                                autoFocus
                                maxlength="35"
                                className="form-control col-sm-10 form-control-lg"
                                ref={this.nombreRef}
                                type="text"
                                placeholder="What's the name of your business?"
                            />
                        </div>
                    </div>
                    <div className="formulario form-group row ">
                        <label className="control-label col-sm-2">State:</label>
                        <div className="col-sm-4">
                            <select
                                ref={this.estadoRef}
                                className="form-control"
                            >
                                <option value="amazonas">Amazonas</option>
                                <option value="anzoategui">Anzoategui</option>
                                <option value="apure">Apure</option>
                                <option value="aragua">Aragua</option>
                                <option value="barinas">Barinas</option>
                                <option value="bolivar">Bolivar</option>
                                <option value="carabobo">Carabobo</option>
                                <option value="cojedes">Cojedes</option>
                                <option value="delta_amacuro">
                                    Delta Amacuro
                                </option>
                                <option value="distrito_capital">
                                    Distrito Capital
                                </option>
                                <option value="falcon">Falcon</option>
                                <option value="guarico">Guarico</option>
                                <option value="lara">Lara</option>
                                <option value="merida">Merida</option>
                                <option value="miranda">Miranda</option>
                                <option value="monagas">Monagas</option>
                                <option value="nueva_esparta">
                                    Nueva Esparta
                                </option>
                                <option value="portuguesa">Portuguesa</option>
                                <option value="sucre">Sucre</option>
                                <option value="tachira">Tachira</option>
                                <option value="trujillo">Trujillo</option>
                                <option value="vargas">Vargas</option>
                                <option value="yaracuy">Yaracuy</option>
                                <option value="zulia">Zulia</option>
                            </select>
                        </div>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">City: </label>
                        <div className="col-sm-6">
                            <input
                                maxlength="15"
                                className="form-control"
                                ref={this.ciudadRef}
                                type="text"
                                placeholder="Example: Caracas"
                            />
                        </div>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">
                            Address:{" "}
                        </label>
                        <div className="col-sm-6">
                            <input
                                maxlength="135"
                                className="form-control"
                                type="text"
                                ref={this.direccionRef}
                                placeholder="Business Address"
                            />
                        </div>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">
                            Description:{" "}
                        </label>
                        <div className="col-sm-6">
                            <input
                                maxlength="135"
                                className="form-control"
                                ref={this.descripcionRef}
                                type="text"
                                placeholder="Example: Fast Food"
                            />
                        </div>
                    </div>
                    <div className="formulario form-group row d-none">
                        <label className="control-label col-sm-2">
                            Category:{" "}
                        </label>
                        <div className="col-sm-6">
                            <input
                                className="form-control"
                                ref={this.categoriaRef}
                                type="text"
                                placeholder="Electronicos/Comida"
                            />
                        </div>
                    </div>
                    <div className="texto-add">
                        <h4>Next fields are optional</h4>
                        <h6>
                            We encourage you to fill these field, so will be
                            easier for the client to reach you out.
                        </h6>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">
                            Phone Number 1:{" "}
                        </label>
                        <div className="col-sm-6">
                            <input
                                maxlength="20"
                                className="form-control"
                                ref={this.telefono1Ref}
                                type="text"
                                placeholder="Main Phone Number"
                            />
                        </div>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">
                            Phone Number 2:{" "}
                        </label>
                        <div className="col-sm-6">
                            <input
                                maxlength="20"
                                className="form-control"
                                ref={this.telefono2Ref}
                                type="text"
                                placeholder="Secondary Phone Number"
                            />
                        </div>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">Email</label>
                        <div className="col-sm-6">
                            <input
                                maxlength="35"
                                className="form-control"
                                ref={this.correoRef}
                                type="email"
                                placeholder="Business Email"
                            />
                        </div>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">Web:</label>
                        <div className="col-sm-6">
                            <input
                                maxlength="65"
                                className="form-control"
                                ref={this.paginawebRef}
                                type="text"
                                placeholder="Web URL"
                            />
                        </div>
                    </div>
                    <div className="col justify-content-center">
                        <button
                            className="btn btn-primary btn-block"
                            type="submit "
                        >
                            Send
                        </button>
                    </div>
                    <Link to={"/"}>
                        <div className="col">
                            <button className="btn btn-primary btn-block">
                                Go back Home{" "}
                            </button>
                        </div>
                    </Link>
                    <div className="alert alert-warning" id="texto-add-final">
                        <p>
                            The information will be checked by a moderator, it
                            should be shown in the main webpage in a few days.
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

export default Add;
