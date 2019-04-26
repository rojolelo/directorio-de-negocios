import React, { Component } from 'react';
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

    enviarInformacion = (e) => {

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
            direccion,
        }

        if (nombre === ""
            || estado === ""
            || ciudad === ""
            || categoria === ""
            || direccion === ""
            || descripcion === "") {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Por favor llena todas las casillas necesarias',

            });
            return null
        }

        Swal.fire(
            'Listo!',
            'La información ha sido enviada para su evaluación, pronto será publicada en nuestro directorio.',
            'success'
        )

        this.props.add(datos);

        e.currentTarget.reset()
    }

    render() {
        return (
            <div className="col justify-content-center alert alert-light" id="container">
                <form onSubmit={this.enviarInformacion} className="form-horizontal">

                    <div className="formulario form-group row ">
                        <label className="control-label col-sm-2">Nombre de la empresa: </label>
                        <div className="col">
                            <input autoFocus className="form-control col-sm-10 form-control-lg" ref={this.nombreRef} type="text" placeholder="¿Como se llama tu empresa?" />
                        </div>
                    </div>
                    <div className="formulario form-group row ">
                        <label className="control-label col-sm-2">Estado:</label>
                        <div className="col-sm-4">
                            <select ref={this.estadoRef} className="form-control">
                                <option value="amazonas">Amazonas</option>
                                <option value="anzoategui">Anzoategui</option>
                                <option value="apure">Apure</option>
                                <option value="aragua">Aragua</option>
                                <option value="barinas">Barinas</option>
                                <option value="bolivar">Bolivar</option>
                                <option value="carabobo">Carabobo</option>
                                <option value="cojedes">Cojedes</option>
                                <option value="delta_amacuro">Delta Amacuro</option>
                                <option value="distrito_capital">Distrito Capital</option>
                                <option value="falcon">Falcon</option>
                                <option value="guarico">Guarico</option>
                                <option value="lara">Lara</option>
                                <option value="merida">Merida</option>
                                <option value="miranda">Miranda</option>
                                <option value="monagas">Monagas</option>
                                <option value="nueva_esparta">Nueva Esparta</option>
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
                        <label className="control-label col-sm-2">Ciudad: </label>
                        <div className="col-sm-6">
                            <input className="form-control" ref={this.ciudadRef} type="text" placeholder="Ej: Caracas" />
                        </div>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">Direccion: </label>
                        <div className="col-sm-6">
                            <input className="form-control" type="text" ref={this.direccionRef} placeholder="Direccion de la empresa" />
                        </div>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">Descripcion: </label>
                        <div className="col-sm-6">
                            <input className="form-control" ref={this.descripcionRef} type="text" placeholder="Ej: Venta de comida rápida" />
                        </div>
                    </div>
                    <div className="formulario form-group row d-none">
                        <label className="control-label col-sm-2">Categoria: </label>
                        <div className="col-sm-6">
                            <input className="form-control" ref={this.categoriaRef} type="text" placeholder="Electronicos/Comida" />
                        </div>
                    </div>
                    <div className="texto-add">
                        <h4>A partir de aqui, los campos a rellenar son opcionales</h4>
                        <h6>Le recomendamos hacer uso de ellos, pues pueden mejorar la posibilidad de que el cliente haga contacto con su empresa.</h6>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">Telefono 1: </label>
                        <div className="col-sm-6">
                            <input className="form-control" ref={this.telefono1Ref} type="text" placeholder="Telefono Principal" />
                        </div>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">Telefono 2: </label>
                        <div className="col-sm-6">
                            <input className="form-control" ref={this.telefono2Ref} type="text" placeholder="Telefono Secundario" />
                        </div>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">Correo</label>
                        <div className="col-sm-6">
                            <input className="form-control" ref={this.correoRef} type="email" placeholder="Correo de la empresa" />
                        </div>
                    </div>
                    <div className="formulario form-group row">
                        <label className="control-label col-sm-2">Pagina web:</label>
                        <div className="col-sm-6">
                            <input className="form-control" ref={this.paginawebRef} type="text" placeholder="Web de la empresa" />
                        </div>
                    </div>
                    <div className="col justify-content-center">

                        <button className="btn btn-primary btn-block" type="submit ">Enviar</button>

                    </div>
                    <Link to={"/"}>
                        <div className="col">
                            <button className="btn btn-primary btn-block">Volver al inicio </button>
                        </div>
                    </Link>
                    <div className="alert alert-warning" id="texto-add-final">
                        <p>La información será revisada por un moderador y será aceptada/rechazada en un lapso menor a una semana.</p>
                    </div>
                </form>
            </div>
        );
    }
}

export default Add;