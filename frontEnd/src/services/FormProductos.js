import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import update from 'react-addons-update';
import proveedores from "./Proveedores";
import categorias from "./Categorias";

class FormProductos extends React.Component {
    constructor(props) {
        super(props);
        this.state =    {
                            producto:   {
                                        "id" : '',
                                        "nombre" : '',
                                        "descripcion" : '',
                                        "precioCompra" : '',
                                        "precioVenta" : '',
                                        "stock" : '',
                                        "proveedores" : [],
                                        "categorias" : []
                                        },
                            categorias:[],
                            proveedores:[]

                        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCategorias = this.handleChangeCategorias.bind(this);
        this.handleChangeProveedores = this.handleChangeProveedores.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
                        this.setState(update(this.state, {
                            producto:   {
                                [event.target.name]: {
                                    $set: event.target.value
                                }
                            }
                            }));
                        console.log(this.state.producto);

    }

    handleChangeCategorias(event) {
        this.setState(update(this.state, {
            producto:   {
                ['categorias']: {
                    $set: this.state.categorias[event.target.value]
                }
            }
        }));
        console.log(this.state.producto);
    }

    handleChangeProveedores(event) {
        this.setState(update(this.state, {
            producto:   {
                ['proveedores']: {
                    $set: this.state.proveedores[event.target.value]
                }
            }
        }));
        console.log(this.state.producto);
    }

    handleSubmit(event) {
                            axios({
                                method: (this.props.id) ? 'put' : 'post',
                                url: 'http://localhost:8080/productos/rest' + (this.props.id ? '/update/' + this.props.id : '/new'),
                                data: this.state.producto
                            }).then(res => {
                                this.props.refresh();
                                this.props.Cerrar();
                                event.preventDefault();
                            });

    }

    componentDidMount() {
        if(this.props.id){
            axios.get(`http://localhost:8080/productos/rest/`+ this.props.id)
                .then(res => {
                    const producto = res.data;
                    this.setState({ producto });
                    console.log('Producto: ' + this.state.producto);
                    console.log('id: ' + this.props.id);

                })
        }
        //Pedir todas las categorias
        axios.get(`http://localhost:8080/categorias/rest`)
            .then(res => {
                const categorias = res.data;
                this.setState({ categorias });
                console.log(this.state.categorias);
            })
        //Pedir todos los proveedores
        axios.get(`http://localhost:8080/proveedores/rest`)
            .then(res => {
                const proveedores = res.data;
                this.setState({ proveedores });
                console.log(this.state.proveedores);
            })

    }

    render() {


        return (
            <form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" placeholder={this.state.producto.nombre} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" name="descripcion" placeholder={this.state.producto.descripcion} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>PrecioCompra</Form.Label>
                    <Form.Control type="number" name="precioCompra" placeholder={this.state.producto.precioCompra} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>PrecioVenta</Form.Label>
                    <Form.Control type="number" name="precioVenta" placeholder={this.state.producto.precioVenta} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" name="stock" placeholder={this.state.producto.stock} onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Select as="select" name="categorias" onChange={this.handleChangeCategorias}>
                        <option>------</option>
                        {this.state.categorias.map((element,index) => (
                            <option key={index} value={index}>{element.nombre}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Select as="select" name="proveedores" onChange={this.handleChangeProveedores}>
                        <option>------</option>
                        {this.state.proveedores.map((opt, index) => (
                            <option key={index} value={index} >{opt.nombre}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">Enviar</Button>

            </form>
        );
    }
}export default FormProductos;