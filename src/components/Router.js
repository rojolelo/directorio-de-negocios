import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Listado from "./Listado";
import Add from "./Add";
import BotonAdd from './BotonAdd';
import Moderacion from "./Moderacion";
import Navegacion from "./Navegacion";

class Router extends Component {
    state = {
        lista: [],
        listaPorModerar: [],
        listaSeparada: [],
    }

    //PENDIENTE SEPARACION POR PAGINAS

    separacionPorPaginas = (datos) => {
        let prevState = [...datos]

        let separacion = [];
        let subSeparacion = [];

        while (prevState.length >= 1) {
            subSeparacion = prevState.splice(0, 5)
            separacion.push(subSeparacion);

        }
        if (separacion.length !== 0) {
            this.setState({
                listaSeparada: separacion
            })
        };

    }

    paginas = (lista) => {

        if (!Boolean(lista)) return null;
        const paginas = [...lista];

        return (
            <React.Fragment>
                {
                    paginas.map((pagina, i) => {

                        if (i === 0) {
                            i = ""
                        } else {
                            i += 1;
                        };
                        return (
                            <Route exact path={`/${i}`} render={() => {
                                return (
                                    <React.Fragment>
                                        <BotonAdd />
                                        <Listado lista={pagina} />
                                        <Navegacion paginaActual={i} paginaFinal={paginas.length} />
                                    </React.Fragment>
                                )
                            }} />
                        )
                    })
                }
            </React.Fragment>
        )
    }

    componentDidUpdate() {
        localStorage.setItem("datos",
            JSON.stringify(this.state.lista));
        localStorage.setItem("datosPorModerar",
            JSON.stringify(this.state.listaPorModerar));
    }

    componentDidMount() {
        const listaLocal = localStorage.getItem("datos");
        if (listaLocal) {
            //ACTUALIZA STATE Y SE LANZA ACTUALIZACIONPORPAGINAS()
            this.setState((prevState, props) => ({
                lista: JSON.parse(listaLocal)
            }), this.separacionPorPaginas(JSON.parse(listaLocal)))
        };
        const listaPorModerarLocal = localStorage.getItem("datosPorModerar");
        if (listaPorModerarLocal) {
            this.setState((prevState, props) => ({
                listaPorModerar: JSON.parse(listaPorModerarLocal)
            }))
        };


    }

    aceptar = (datos) => {
        const { nombre, estado, ciudad, paginaweb, telefono1, telefono2, correo, descripcion, direccion } = datos;
        const listaPorModerarNew = this.state.listaPorModerar.filter(objeto => {
            return (
                !(objeto.nombre === nombre
                    && objeto.estado === estado
                    && objeto.ciudad === ciudad
                    && objeto.descripcion === descripcion
                    && objeto.direccion === direccion)
            )
        })

        this.setState((prevState, props) => ({
            listaPorModerar: listaPorModerarNew,
            lista: [...prevState.lista, datos]
        }))
    }

    borrar = (datos) => {
        const { nombre, estado, ciudad, paginaweb, telefono1, telefono2, correo, descripcion, direccion } = datos;
        const listaPorModerarNew = this.state.listaPorModerar.filter(objeto => {
            return (
                !(objeto.nombre === nombre
                    && objeto.estado === estado
                    && objeto.ciudad === ciudad
                    && objeto.descripcion === descripcion
                    && objeto.direccion === direccion)
            )
        })
        this.setState((prevState, props) => ({ listaPorModerar: listaPorModerarNew }))
    }

    add = (datos) => {
        console.log("Add ejecutado")
        this.setState((prevState, props) => ({
            listaPorModerar: [...prevState.listaPorModerar, datos]
        }))
    }


    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />


                    <Switch>

                        {this.paginas(this.state.listaSeparada)}

                        <Route exact path={"/add"} render={() => {
                            //AÑADIR POST
                            return (
                                <Add add={this.add} />
                            )
                        }} />

                        <Route exact path={"/listadomoderacion"} render={() => {
                            //MODERACION
                            return (
                                <Moderacion objeto={this.state.listaPorModerar} aceptar={this.aceptar} borrar={this.borrar} />
                            )
                        }} />



                    </Switch>

                    <Footer />

                </div>
            </BrowserRouter>
        );
    }
}

export default Router;