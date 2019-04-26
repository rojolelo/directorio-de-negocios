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
    // PROTECTED INFORMATION
    // MAKE SURE YOU ADD HERE YOUR FIREBASE CONFIG
  };

  firebase.initializeApp(config);

const db = firebase.database().ref("directorio")
const dbMod = firebase.database().ref("moderacion")


//-------------------------------



class Router extends Component {
    state = {
        lista: [],
        listaPorModerar: [],
    }

    
    fromDBtoState = () => {
        db.on("value", x => {
            const directorio = x.val();
            const ids = Object.keys(directorio);
            let newState = [];
            for (let i = 0; i< ids.length; i++) {
                newState.push(directorio[ids[i]])
            }
            this.setState({
                lista : newState
            })  
        });
        
        
    }

    separacionPorPaginas = (datos) => {
        let prevState = [...datos]


        let separacion = [];
        let subSeparacion = [];


        const objetosPorPagina = 10;

        while (prevState.length >= 1) {
            subSeparacion = prevState.splice(0, objetosPorPagina)
            separacion.push(subSeparacion);

        }


        if (separacion.length !== 0) {
            return separacion
        };

    }

    paginas = (lista) => {
        //LISTA es el State separado.

        if (!Boolean(lista)) return null;
        const paginas = [...lista];

        if (paginas.length === 0) return (

            <Route exact path={"/"} render={() => {
                return (<BotonAdd />)
            }} />

        );

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

    

    componentDidMount() {
        this.fromDBtoState();
    }

    aceptar = (datos) => {
        // SE AÑADEN A LA BASE DE DATOS
        
        db.push(datos, this.fromDBtoState());
        
        this.borrar(datos);
    }

    borrar = (datos) => {        
        dbMod.child(datos.key).remove()        
    }

    add = (datos) => {
        const keyValue = dbMod.push().key
        datos["key"] = keyValue;
        dbMod.child(keyValue).update(datos);
    }


    render() {

        const separacion = this.separacionPorPaginas(this.state.lista)




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

                        {
                            (separacion) ? (separacion.length === 0 ? <BotonAdd /> : this.paginas(separacion)) : <BotonAdd />
                        }



                    </Switch>

                    <Footer />

                </div>
            </BrowserRouter>
        );
    }
}



export default Router;