import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import update from 'react-addons-update';

class FormEmpleados extends React.Component {
    constructor(props) {
        super(props);
        this.state =    {
                            empleado:   {
                                        "id" : '',
                                        "nombre" : '',
                                        "apellidos" : '',
                                        "direccion" : '',
                                        "poblacion" : '',
                                        "codZip" : '',
                                        "telefono" : '',
                                        "movil" : '',
                                        "email" : '',
                                        "comentarios" : '',
                                        "password" : ''
                                        }

                        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
                        console.log(this.state.empleado);

                        this.setState(update(this.state, {
                            empleado:   {
                                [event.target.name]: {
                                    $set: event.target.value
                                }
                            }
                            }));
                        console.log(this.state.empleado);

    }
    handleSubmit(event) {
                            axios({
                                method: (this.props.id) ? 'put' : 'post',
                                url: 'http://localhost:8080/empleados/rest' + (this.props.id ? '/update/' + this.props.id : '/new'),
                                data: this.state.empleado
                            }).then(res => {
                                this.props.refresh();
                                this.props.Cerrar();
                                console.log(res);
                                event.preventDefault();
                            });

    }

    componentDidMount() {
        if(this.props.id){
            axios.get(`http://localhost:8080/empleados/rest/`+ this.props.id)
                .then(res => {
                    const empleado = res.data;
                    this.setState({ empleado });
                    console.log('Empleado: ' + this.state.empleado);
                    console.log('id: ' + this.props.id);

                })
        }

    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" placeholder={this.state.empleado.nombre} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control type="text" name="apellidos" placeholder={this.state.empleado.apellidos} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Direccion</Form.Label>
                    <Form.Control type="text" name="direccion" placeholder={this.state.empleado.direccion} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Poblacion</Form.Label>
                    <Form.Control type="text" name="poblacion" placeholder={this.state.empleado.poblacion} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Codigo Postal</Form.Label>
                    <Form.Control type="number" name="codZip" placeholder={this.state.empleado.codZip} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type="number" name="telefono" placeholder={this.state.empleado.telefono} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Movil</Form.Label>
                    <Form.Control type="number" name="movil" placeholder={this.state.empleado.movil} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder={this.state.empleado.email}  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Comentarios</Form.Label>
                    <Form.Control type="text" name="comentarios" placeholder={this.state.empleado.comentarios} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder={this.state.empleado.password} onChange={this.handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">Enviar</Button>

            </form>
        );
    }
}export default FormEmpleados;