import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import update from 'react-addons-update';

class FormProveedores extends React.Component {
    constructor(props) {
        super(props);
        this.state =    {
                            proveedor:   {
                                        "id" : '',
                                        "codProveedor" : '',
                                        "nombre" : '',
                                        "direccion" : '',
                                        "pais" : '',
                                        "nifCif" : '',
                                        "contacto" : '',
                                        "email" : '',
                                        "comentarios" : ''
                                        }

                        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
                        console.log(this.state.proveedor);

                        this.setState(update(this.state, {
                            proveedor:   {
                                [event.target.name]: {
                                    $set: event.target.value
                                }
                            }
                            }));
                        console.log(this.state.proveedor);

    }
    handleSubmit(event) {
                            axios({
                                method: (this.props.id) ? 'put' : 'post',
                                url: 'http://localhost:8080/proveedores/rest' + (this.props.id ? '/update/' + this.props.id : '/new'),
                                data: this.state.proveedor
                            }).then(res => {
                                this.props.refresh();
                                this.props.Cerrar();
                                event.preventDefault();
                            });

    }

    componentDidMount() {
        if(this.props.id){
            axios.get(`http://localhost:8080/proveedores/rest/`+ this.props.id)
                .then(res => {
                    const proveedor = res.data;
                    this.setState({ proveedor });
                    console.log('Cliente: ' + this.state.proveedor);
                    console.log('id: ' + this.props.id);

                })
        }

    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Codigo Proveedor</Form.Label>
                    <Form.Control type="number" name="codProveedor" placeholder={this.state.proveedor.codProveedor} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" placeholder={this.state.proveedor.nombre} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control type="text" name="direccion" placeholder={this.state.proveedor.direccion} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Pais</Form.Label>
                    <Form.Control type="text" name="pais" placeholder={this.state.proveedor.pais} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Codigo Postal</Form.Label>
                    <Form.Control type="number" name="nifCif" placeholder={this.state.proveedor.nifCif} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type="number" name="contacto" placeholder={this.state.proveedor.contacto} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder={this.state.proveedor.email}  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Comentarios</Form.Label>
                    <Form.Control type="text" name="comentarios" placeholder={this.state.proveedor.comentarios} onChange={this.handleChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">Enviar</Button>

            </form>
        );
    }
}export default FormProveedores;