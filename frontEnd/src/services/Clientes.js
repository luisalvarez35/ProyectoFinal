import React, {Component, useState} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import {Button, Modal} from "react-bootstrap";
import MyModalComponent from "./MyModalComponent";
import FormClientes from "./FormClientes";

class Clientes extends Component {

    state = {
        show: false,
        title: '',
        body: '',
        footer:'',
        clientes: []


    }
    //Peticiones al servidor antes de render
    componentDidMount() {
        this.refresh();
    }

    deleteModal = (row) => {
        this.setState({
            show: true,
            title: 'Eliminar Cliente',
            body:  'Desea eliminar el cliente?',
            footer: <div>
                        <Button variant="danger" onClick={() => this.delete(row)} >Eliminar</Button>
                        <Button variant="primary" onClick={() => this.handleClose()} >Cerrar</Button>
                    </div>
        });
    };
    editModal = (row) => {
        this.setState({
            show: true,
            title: 'Editar Cliente',
            body:   <FormClientes
                    id={row.id}
                    Cerrar={this.handleClose}
                    refresh={this.refresh()}
                    />,
        });
    };
    newModal = () => {
        this.setState({
            show: true,
            title: 'Nuevo Cliente',
            body:   <FormClientes
                    Cerrar={this.handleClose}
                    refresh={this.refresh()}
                    />,
        });
    };

    handleClose = () => {
        this.setState({
            show: false,
            footer:''
        });

    };

    refresh = () =>{
        axios.get(`http://localhost:8080/clientes/rest`)
            .then(res => {
                const clientes = res.data;
                this.setState({ clientes });
                console.log(this.state.clientes);
            })
    };

    delete = (row) => {
            axios({
                method: 'delete',
                url: `http://localhost:8080/clientes/rest/delete/`+ row.id,
            }).then(res => {
                this.refresh();
                this.handleClose();
            });

    };


    
    render() {

                const columns = [
                    {
                        name: 'Id',
                        selector: row => row.id,
                    },
                    {
                        name: 'Nombre',
                        selector: row => row.nombre,
                    },
                    {
                        name: 'Apellidos',
                        selector: row => row.apellidos,
                    },
                    {
                        name: 'Direccion',
                        selector: row => row.direccion,
                    },
                    {
                        name: 'Poblacion',
                        selector: row => row.poblacion,
                    },
                    {
                        name: 'Pais',
                        selector: row => row.pais,
                    },
                    {
                        name: 'Codigo Postal',
                        selector: row => row.codZip,
                    },
                    {
                        name: 'Telefono',
                        selector: row => row.telefono,
                    },
                    {
                        name: 'Movil',
                        selector: row => row.movil,
                    },
                    {
                        name: 'Email',
                        selector: row => row.email,
                    },
                    {
                        name: 'Comentarios',
                        selector: row => row.comentarios,
                    },
                    {   name: 'Editar',
                        cell: (row) => <div>

                                        <Button className="btn btn-info" title="Editar"  onClick={() => this.editModal(row)}>Editar</Button>
                                        </div>,
                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                    },
                    {   name: 'Borrar',
                        cell: (row) => <div>
                            <Button className="btn btn-danger" title="Borrar" onClick={() => this.deleteModal(row)}>Borrar</Button>

                        </div>,
                        ignoreRowClick: true,
                        allowOverflow: true,
                        button: true,
                    },
                ];

                const data = this.state.clientes;

        return (
            <div>
                <Button variant="primary" onClick={this.newModal}>Nuevo</Button>
                <MyModalComponent
                    show={this.state.show}
                    title={this.state.title}
                    body={this.state.body}
                    footer={this.state.footer}
                    onClick={this.handleClose}
                    onHide={this.handleClose}
                    centered
                />
                <DataTable
                    columns={columns}
                    data={data}
                    striped
                    pagination
                />
            </div>
        )
    }
}

export default Clientes;