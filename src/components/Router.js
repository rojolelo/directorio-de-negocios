import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Listado from "./Listado";
import Add from "./Add";
import BotonAdd from './BotonAdd';
import Moderacion from "./Moderacion";
import Navegacion from "./Navegacion";
import firebase from "firebase";

//FIREBASE INIT----------------
var config = {
    //PROTECTED INFORMATION
    // FOR YOU PROJECT USE HERE YOUR OWN FIREBASE DATABASE
};

firebase.initializeApp(config);

const db = firebase.database().ref("directorio")
const dbMod = firebase.database().ref("moderacion")



//-------------------------------



class Router extends Component {
    state = {
        lista: [],
        listaPorModerar: [],
        loading: true,
    }


    fromDBtoState = () => {
        //EVERYTIME THERE A UPDATE IT SETS LOADING TO TRUE
        // ITS ON ANOTHER FUNCTION IN ORDER TO AVOID 
        // this.setState NOT WORKING PROPERLY
        this.loading()
        db.on("value", x => {
            const directorio = x.val();
            const ids = Object.keys(directorio);
            let newState = [];
            for (let i = 0; i < ids.length; i++) {
                newState.push(directorio[ids[i]])
            }
            this.setState({
                lista: newState,
                loading: false
            })
        })
    }

    loading = () => {
        this.setState({
            loading: true
        })
    }

    separacionPorPaginas = (datos) => {
        let prevState = [...datos];

        let separacion = [];
        let subSeparacion = [];

        const objetosPorPagina = 10;

        while (prevState.length >= 1) {
            subSeparacion = prevState.splice(0, objetosPorPagina)
            separacion.push(subSeparacion);
        }

        if (separacion.length !== 0) {
            return separacion
        } else {
            return []
        }

    }

    listado = (separacion) => {

        if (Boolean(separacion)) {
            if (this.state.loading) {
                return (
                    <React.Fragment>
                        <h3 className="text-center">Cargando...</h3>
                    </React.Fragment>
                )
            } else if (this.state.lista.length === 0) {
                console.log("state.length = 0")
                return (
                    <React.Fragment>
                        <BotonAdd />
                        <h3>No hay negocios para mostrar</h3>
                    </React.Fragment>)
            } else {
                return (
                    this.paginas(separacion)
                )
            }
        }
    }

    paginas = (lista) => {
        //LISTA es el State separado (separacion).

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
                            <Route key={i} exact path={`/${i}`} render={() => {
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

    componentWillMount() {
        this.fromDBtoState()
    }

    // BOTONES -------------------
    aceptar = (datos) => {
        // SE AÑADEN A LA BASE DE DATOS
        // ADDED TO DATABASE

        db.push(datos, this.fromDBtoState());

        this.borrar(datos);
    }

    borrar = (datos) => {
        // REMOVED FROM DATABASE
        dbMod.child(datos.key).remove()
    }

    add = (datos) => {
        // ADDED TO DATABASE MODERATION LIST
        const keyValue = dbMod.push().key
        datos["key"] = keyValue;
        dbMod.child(keyValue).update(datos);
    }
    // ------------------ BOTONES

    render() {

        let separacion = [];

        if (Boolean(this.state.lista)) {
            separacion = this.separacionPorPaginas(this.state.lista)
        }



        return (
            <BrowserRouter basename={process.env.PUBLIC_URL} >
                <div className="container">
                    <Header />

                    <Switch>

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

                        {this.listado(separacion)}

                    </Switch>

                    <Footer />

                </div>
            </BrowserRouter>
        );
    }
}

export default Router;