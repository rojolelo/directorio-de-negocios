import React, { Component } from "react";
import ObjetoListaMod from "./Listado/ObjetoListaMod";
import firebase from "firebase";
import Swal from "sweetalert2";

class Moderacion extends Component {
    state = {
        clave: "",
        lista: [],
        email: ""
    };

    emailRef = React.createRef();
    passwordRef = React.createRef();

    componentWillMount() {
        firebase
            .database()
            .ref("moderacion")
            .on("value", x => {
                this.setState({
                    lista: x.val()
                });
            });
    }

    iniciarSesion = e => {
        e.preventDefault();
        const email = this.emailRef.current.value;
        const password = this.passwordRef.current.value;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === "auth/wrong-password") {
                    Swal.fire({
                        type: "error",
                        title: "Oops...",
                        text: "Wrong Password"
                    });
                } else if (errorCode === "auth/user-not-found") {
                    Swal.fire({
                        type: "error",
                        title: "Oops...",
                        text: "Are you sure you're and admin? :)"
                    });
                } else {
                    Swal.fire({
                        type: "error",
                        title: "Oops...",
                        text: errorMessage
                    });
                    console.log(error);
                }
            })
            .then(result => {
                if (result) {
                    this.setState({
                        email: result.user.email
                    });
                }
            });
    };

    logout = () => {
        const mainAddress = window.location.href.replace(
            "/listadomoderacion",
            ""
        );
        firebase.auth().signOut();
        document.location.assign(mainAddress);
    };

    listaPorModerar = () => {
        let preLista = [];
        let keysLista = [];
        let lista = [];

        if (Boolean(this.state.lista)) {
            preLista = this.state.lista;

            if (typeof preLista === "object") {
                keysLista = Object.keys(preLista);
            }

            for (let i = 0; i < keysLista.length; i++) {
                lista.push(preLista[keysLista[i]]);
            }
        }

        if (lista.length === 0) {
            return (
                <React.Fragment>
                    <tr>
                        <td>No hay nada para moderar</td>
                    </tr>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                {lista.map((objeto, i) => {
                    return (
                        <ObjetoListaMod
                            objeto={objeto}
                            key={i}
                            borrar={this.props.borrar}
                            aceptar={this.props.aceptar}
                        />
                    );
                })}
            </React.Fragment>
        );
    };

    render() {
        const logged = Boolean(firebase.auth().currentUser);
        console.log("Logged", logged);
        if (logged === false) {
            return (
                <React.Fragment>
                    <div>
                        <h2>Insert your Email and Password</h2>
                    </div>
                    <div>
                        <h4>You need log in in order to moderate</h4>
                    </div>
                    <form onSubmit={this.iniciarSesion}>
                        <div>
                            <label>Email</label>
                            <input
                                className="form-control"
                                type="text"
                                ref={this.emailRef}
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                className="form-control"
                                type="text"
                                ref={this.passwordRef}
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <button className="btn btn-primary" type="submit">
                                Iniciar Sesion
                            </button>
                        </div>
                    </form>
                </React.Fragment>
            );
        }

        // if ((this.state.clave !== "1234")) {
        //     return (
        //         <React.Fragment>
        //             <div><h2>Insert MPass </h2></div>
        //             <label>Mpassword</label>
        //             <div>
        //                 <input type="text" placeholder="password" onChange={e => {
        //                     this.setState({
        //                         clave: e.target.value
        //                     })
        //                 }} />
        //             </div>
        //             <div>
        //                 <button type="button" className="btn btn-warning" onClick={this.logout}>Logout</button>
        //             </div>
        //         </React.Fragment>)
        // }

        return (
            <React.Fragment>
                <h2 className="titulo-moderacion">Moderacion</h2>

                <table className="table table-bordered table-striped">
                    <tbody>{this.listaPorModerar()}</tbody>
                </table>
                <button type="button" onClick={this.logout}>
                    Logout
                </button>
            </React.Fragment>
        );
    }
}

export default Moderacion;
