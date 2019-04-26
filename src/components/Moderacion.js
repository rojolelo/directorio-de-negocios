import React, { Component } from 'react';
import ObjetoListaMod from './Listado/ObjetoListaMod';
import firebase from "firebase";



class Moderacion extends Component {
    state = {
        clave: "",
        lista : []        
    }

    componentWillMount() {
        firebase.database().ref("moderacion").on("value", x => {
            this.setState({
                lista : x.val()
            })
        })
    }

    listaPorModerar = () => {
        let preLista = [];
        let keysLista = [];
        let lista = [];

        if ((Boolean(this.state.lista))) {
            preLista = this.state.lista;        
            
            if (typeof(preLista) === "object") {
                keysLista = Object.keys(preLista);                
            }

            for (let i = 0; i < keysLista.length; i++) {
                lista.push(preLista[keysLista[i]])
            }
    }

        if (lista.length === 0) {
            return (
                <React.Fragment>
                    <tr>
                        <td>
                            No hay nada para moderar
                        </td>
                    </tr>
                </React.Fragment>
            )
        };



        return (
            <React.Fragment>
                {
                    lista.map((objeto, i) => {
                        return (
                            <ObjetoListaMod objeto={objeto} key={i} borrar={this.props.borrar} aceptar={this.props.aceptar} />
                        )
                    })
                }
            </React.Fragment>
        )

    }

    render() {

        if (this.state.clave !== "1234") return (
            <React.Fragment>
                <h2>Inserte Clave</h2>
                <input type="text" placeholder="password" onChange={e => {
                    this.setState({
                        clave: e.target.value
                    })
                }} />
            </React.Fragment>)

        return (
            <React.Fragment>
                <h2 className="titulo-moderacion">Moderacion</h2>


                <table className="table table-bordered table-striped">
                    <tbody>
                        {this.listaPorModerar()}
                    </tbody>
                </table>
            </React.Fragment >
        );
    }
}

export default Moderacion;