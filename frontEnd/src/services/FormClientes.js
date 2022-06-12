import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import update from 'react-addons-update';

class FormClientes extends React.Component {
    constructor(props) {
        super(props);
        this.state =    {
                            cliente:   {
                                        "id" : '',
                                        "nombre" : '',
                                        "apellidos" : '',
                                        "direccion" : '',
                                        "poblacion" : '',
                                        "pais" : '',
                                        "codZip" : '',
                                        "telefono" : '',
                                        "movil" : '',
                                        "email" : '',
                                        "comentarios" : ''
                                        }

                        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
                        console.log(this.state.cliente);

                        this.setState(update(this.state, {
                            cliente:   {
                                [event.target.name]: {
                                    $set: event.target.value
                                }
                            }
                            }));
                        console.log(this.state.cliente);

    }
    handleSubmit(event) {
                            axios({
                                method: (this.props.id) ? 'put' : 'post',
                                url: 'http://localhost:8080/clientes/rest' + (this.props.id ? '/update/' + this.props.id : '/new'),
                                data: this.state.cliente
                            }).then(res => {
                                this.props.refresh();
                                this.props.Cerrar();
                                event.preventDefault();
                            });

    }

    componentDidMount() {
        if(this.props.id){
            axios.get(`http://localhost:8080/clientes/rest/`+ this.props.id)
                .then(res => {
                    const cliente = res.data;
                    this.setState({ cliente });
                    console.log('Cliente: ' + this.state.cliente);
                    console.log('id: ' + this.props.id);

                })
        }

    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" placeholder={this.state.cliente.nombre} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control type="text" name="apellidos" placeholder={this.state.cliente.apellidos} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control type="text" name="direccion" placeholder={this.state.cliente.direccion} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Poblacion</Form.Label>
                    <Form.Control type="text" name="poblacion" placeholder={this.state.cliente.poblacion} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Pais</Form.Label>
                    <Form.Control type="text" name="pais" placeholder={this.state.cliente.pais} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Codigo Postal</Form.Label>
                    <Form.Control type="number" name="codZip" placeholder={this.state.cliente.codZip} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type="number" name="telefono" placeholder={this.state.cliente.telefono} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Movil</Form.Label>
                    <Form.Control type="number" name="movil" placeholder={this.state.cliente.movil} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder={this.state.cliente.email}  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Comentarios</Form.Label>
                    <Form.Control type="text" name="comentarios" placeholder={this.state.cliente.comentarios} onChange={this.handleChange}/>
                </Form.Group>


                <Button variant="primary" type="submit">Enviar</Button>

            </form>
        );
    }
}export default FormClientes;