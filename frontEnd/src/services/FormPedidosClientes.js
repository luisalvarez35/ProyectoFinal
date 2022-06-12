import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import update from 'react-addons-update';

class FormPedidosClientes extends React.Component {
    constructor(props) {
        super(props);
        this.state =    {
                            pedidoCliente:   {
                                        "id" : '',
                                        /*"fecha" : '',*/
                                        "descripcion" : '',
                                        /*"baseImponible" : '',*/
                                        "iva" : '',
                                        /*"total" : '',*/
                                        "empleados" : [],
                                        "clientes" : []
                                        },
                            empleados:[],
                            clientes:[]

                        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEmpleados = this.handleChangeEmpleados.bind(this);
        this.handleChangeClientes = this.handleChangeClientes.bind(this);
    }

    handleChange(event) {
                        this.setState(update(this.state, {
                            pedidoCliente:   {
                                [event.target.name]: {
                                    $set: event.target.value
                                }
                            }
                            }));
                        console.log(this.state.pedidoCliente);

    }

    handleChangeEmpleados(event) {
        this.setState(update(this.state, {
            pedidoCliente:   {
                ['empleados']: {
                    $set: this.state.empleados[event.target.value]
                }
            }
        }));
        console.log(this.state.pedidoCliente);
    }

    handleChangeClientes(event) {
        this.setState(update(this.state, {
            pedidoCliente:   {
                ['clientes']: {
                    $set: this.state.clientes[event.target.value]
                }
            }
        }));
        console.log(this.state.pedidoCliente);
    }

    handleSubmit(event) {
                            axios({
                                method: (this.props.id) ? 'put' : 'post',
                                url: 'http://localhost:8080/pedidosClientes/rest' + (this.props.id ? '/update/' + this.props.id : '/new'),
                                data: this.state.pedidoCliente
                            }).then(res => {
                                this.props.refresh();
                                this.props.Cerrar();
                                event.preventDefault();
                            });

    }

    componentDidMount() {
        if(this.props.id){
            axios.get(`http://localhost:8080/pedidosClientes/rest/`+ this.props.id)
                .then(res => {
                    const pedidoCliente = res.data;
                    this.setState({ pedidoCliente });
                    console.log('PedidoCliente: ' + this.state.pedidoCliente);
                    console.log('id: ' + this.props.id);

                })
        }
        //Pedir todas las empleados
        axios.get(`http://localhost:8080/empleados/rest`)
            .then(res => {
                const empleados = res.data;
                this.setState({ empleados });
                console.log(this.state.empleados);
            })
        //Pedir todos los clientes
        axios.get(`http://localhost:8080/clientes/rest`)
            .then(res => {
                const clientes = res.data;
                this.setState({ clientes });
                console.log(this.state.clientes);
            })

    }

    render() {


        return (
            <form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" name="descripcion" placeholder={this.state.pedidoCliente.descripcion} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>IVA</Form.Label>
                    <Form.Control type="number" name="iva" placeholder={this.state.pedidoCliente.iva} onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Select as="select" name="empleados" onChange={this.handleChangeEmpleados}>
                        <option>------</option>
                        {this.state.empleados.map((element,index) => (
                            <option key={index} value={index}>{element.nombre}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Select as="select" name="clientes" onChange={this.handleChangeClientes}>
                        <option>------</option>
                        {this.state.clientes.map((opt, index) => (
                            <option key={index} value={index} >{opt.nombre}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">Enviar</Button>

            </form>
        );
    }
}export default FormPedidosClientes;