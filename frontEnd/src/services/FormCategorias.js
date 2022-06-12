import React, { Component } from "react";
import {Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import update from 'react-addons-update';

class FormCategorias extends React.Component {
    constructor(props) {
        super(props);
        this.state =    {
                            categoria:   {
                                        "id" : '',
                                        "nombre" : '',
                                        "descripcion" : ''
                                        }

                        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
                        console.log(this.state.categoria);

                        this.setState(update(this.state, {
                            categoria:   {
                                [event.target.name]: {
                                    $set: event.target.value
                                }
                            }
                            }));
                        console.log(this.state.categoria);

    }
    handleSubmit(event) {
                            axios({
                                method: (this.props.id) ? 'put' : 'post',
                                url: 'http://localhost:8080/categorias/rest' + (this.props.id ? '/update/' + this.props.id : '/new'),
                                data: this.state.categoria
                            }).then(res => {
                                this.props.refresh();
                                this.props.Cerrar();
                                event.preventDefault();
                            });

    }

    componentDidMount() {
        if(this.props.id){
            axios.get(`http://localhost:8080/categorias/rest/`+ this.props.id)
                .then(res => {
                    const categoria = res.data;
                    this.setState({ categoria });
                    console.log('Categoria: ' + this.state.categoria);
                    console.log('id: ' + this.props.id);

                })
        }

    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" placeholder={this.state.categoria.nombre} onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" name="descripcion" placeholder={this.state.categoria.descripcion} onChange={this.handleChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">Enviar</Button>

            </form>
        );
    }
}export default FormCategorias;