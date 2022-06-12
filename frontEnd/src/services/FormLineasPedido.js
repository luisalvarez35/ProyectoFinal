import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import update from 'react-addons-update';


class FormPedidosClientes extends React.Component {
    constructor(props) {
        super(props);
        this.state =    {
                            lineaPedido:   {
                                        "id" : '',
                                        "cantidad" : '',
                                        "descripcion" : '',
                                        "productos" : [],
                                        "pedidosClientes" : []
                                        },
                            productos:[],
                            pedidosClientes:[]

                        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeProductos = this.handleChangeProductos.bind(this);
        this.setPedidosClientes = this.setPedidosClientes.bind(this);

    }

    componentDidMount() {
        if(this.props.id){
            axios.get(`http://localhost:8080/lineasPedido/rest/`+ this.props.id)
                .then(res => {
                    const lineaPedido = res.data;
                    this.setState({ lineaPedido });
                    console.log('LineasPedido: ' + this.state.lineaPedido);
                    console.log('id: ' + this.props.id);

                })
        }
        //Pedir todas los productos
        axios.get(`http://localhost:8080/productos/rest`)
            .then(res => {
                const productos = res.data;
                this.setState({ productos });
                console.log(this.state.productos);
            })
        //Pedir todos los pedidosClientes
        axios.get(`http://localhost:8080/pedidosClientes/rest`)
            .then(res => {
                const pedidosClientes = res.data;
                this.setState({ pedidosClientes });
                console.log(this.state.pedidosClientes);
            })


    }


    handleChange(event) {
                        const index = this.state.pedidosClientes.findIndex(obj => obj.id == this.props.idPedido);

                        this.setState(update(this.state, {
                            lineaPedido:   {
                                [event.target.name]: {
                                    $set: event.target.value
                                },
                                ['pedidosClientes']: {
                                    $set: this.state.pedidosClientes[index]
                                }
                            }
                            }));
                        console.log(this.state.lineaPedido);

    }

    handleChangeProductos(event) {
        this.setState(update(this.state, {
            lineaPedido:   {
                ['productos']: {
                    $set: this.state.productos[event.target.value]
                }
            }
        }));

        console.log(this.state.lineaPedido);
        console.log(this.state.productos);

    }
    //Actualizar con array con index idPedido
    setPedidosClientes() {

    const index = this.state.pedidosClientes.findIndex(obj => obj.id == this.props.idPedido);
    this.setState(update(this.state, {
        lineaPedido:   {
            ['pedidosClientes']: {
                $set: this.state.pedidosClientes[index]
                }
            }
        }));
    }


    handleSubmit(event) {
                            axios({
                                method: (this.props.id) ? 'put' : 'post',
                                url: 'http://localhost:8080/lineasPedido/rest' + (this.props.id ? '/update/' + this.props.id : '/new'),
                                data: this.state.lineaPedido
                            }).then(res => {
                                this.props.refresh();
                                this.props.Cerrar();
                                event.preventDefault();
                            });

    }



    render() {


        return (
            <form onSubmit={this.handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control type="number" name="cantidad" placeholder={this.state.lineaPedido.cantidad} onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Select as="select" name="productos" onChange={this.handleChangeProductos}>
                        <option>------</option>
                        {this.state.productos.map((element,index) => (
                            <option key={index} value={index}>{element.nombre}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" name="descripcion" placeholder={this.state.lineaPedido.descripcion} onChange={this.handleChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">Enviar</Button>

            </form>
        );
    }
}export default FormPedidosClientes;