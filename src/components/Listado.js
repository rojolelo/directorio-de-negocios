import React, { Component } from "react";
import ObjetoLista from "./Listado/ObjetoLista";

class Listado extends Component {
    laLista = () => {
        const listaDeObjetos = this.props.lista;

        if (!Boolean(listaDeObjetos)) return null;

        if (listaDeObjetos.length === 0) return null;
        return (
            <React.Fragment>
                {listaDeObjetos.map((objeto, i) => {
                    return <ObjetoLista objeto={objeto} key={i} />;
                })}
            </React.Fragment>
        );
    };
    render() {
        return (
            <table className="table table-bordered table-striped">
                <thead className="thead-light">
                    <tr>
                        <th>Name</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Category</th>
                        <th>Information</th>
                    </tr>
                </thead>
                <tbody>{this.laLista()}</tbody>
            </table>
        );
    }
}

export default Listado;
